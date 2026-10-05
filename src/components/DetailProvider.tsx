import { useEffect, useMemo, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'

import { DETAILS, hasDetail } from '@/data/details'
import type { Detail } from '@/data/details'

/**
 * Hash prefix, so a detail link is recognisable and cannot collide with the FAQ's
 * own `#faq-*` hashes.
 */
const HASH_PREFIX = 'detail-'

/**
 * One detail panel for the whole page, with the URL as the source of truth.
 *
 * A tiny external store rather than context: nothing here renders, so there is no
 * reason for all thirteen cards to re-render when the panel opens. Cards import
 * `openDetail` directly; only `DetailPanel` subscribes.
 */

/** The open detail id, or `null` when the panel is closed. */
let activeId: string | null = null

/** Subscribers, i.e. the one panel. */
const listeners = new Set<() => void>()

/**
 * The button that opened the panel, so focus can be handed back on close.
 *
 * Module scope rather than a ref in the panel: it has to survive the panel
 * unmounting, which happens before focus is restored.
 */
let lastTrigger: HTMLElement | null = null

/** Whether this session pushed a hash entry, which decides how closing works. */
let pushedHash = false

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): string | null {
  return activeId
}

/** The id a hash points at, or `null` for anything that is not a known detail. */
function idFromHash(hash: string): string | null {
  if (!hash.startsWith(`#${HASH_PREFIX}`)) return null

  const id = hash.slice(HASH_PREFIX.length + 1)
  return hasDetail(id) ? id : null
}

/**
 * Opens the detail view for `id`.
 *
 * `trigger` is the button that was clicked. Optional, so the call works from
 * anywhere, but all four card groups pass it: focus returns there on close, and
 * without it the visitor is dropped at the top of the document.
 *
 * An id with no entry in `DETAILS` is ignored, without logging.
 */
export function openDetail(
  id: string,
  trigger?: HTMLElement | null,
  /** Swap the hash in place instead of pushing. Used by "Next", which should not
   * leave a history entry per item - Back has to mean "close the panel", not
   * "step back through everything I read". */
  replace = false,
) {
  if (!hasDetail(id)) return

  lastTrigger = trigger ?? null
  activeId = id
  emit()

  const hash = `#${HASH_PREFIX}${id}`
  if (window.location.hash === hash) return

  if (replace) {
    window.history.replaceState(null, '', hash)
    return
  }

  /* Assigning the hash rather than `pushState`: it is what makes the Back button
     close the panel, because going back removes the hash and the listener below
     then closes the panel. */
  pushedHash = true
  window.location.hash = `${HASH_PREFIX}${id}`
}

/** Clears the hash without adding a history entry. */
export function closeDetail() {
  lastTrigger = null
  activeId = null
  emit()

  if (pushedHash) {
    /* Unwind the entry we pushed, so closing does not leave a stale history step
       for Back to travel through twice. */
    pushedHash = false
    window.history.back()
    return
  }

  if (window.location.hash.startsWith(`#${HASH_PREFIX}`)) {
    /* Not pushed by us - the page was loaded straight into a detail link. Replace
       rather than push, so closing does not bury the referring page. */
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

/** Closes the panel, then hands focus back to the button that opened it. */
export function closeDetailAndRestoreFocus() {
  const restore = lastTrigger
  closeDetail()

  /* After the close, so the browser has finished taking the panel out of the
     accessibility tree. Otherwise focus falls back to the body. */
  window.requestAnimationFrame(() => restore?.focus?.())
}

/** The open detail, or `null`. Only `DetailPanel` calls this. */
export function useActiveDetail(): Detail | null {
  const id = useSyncExternalStore(subscribe, getSnapshot)

  return useMemo(() => (id ? (DETAILS[id] ?? null) : null), [id])
}

/**
 * Keeps the store in step with the URL.
 *
 * A single `hashchange` listener is the only place state is derived from the
 * hash, which is what makes the three entry points behave identically: opening
 * from a card, arriving on a shared link, and pressing Back.
 */
function useHashSync() {
  useEffect(() => {
    const onHashChange = () => {
      /* Any hash that is not a known detail id closes the panel - including the
         FAQ's own `#faq-*` hash, which must not leave a panel stranded open. */
      activeId = idFromHash(window.location.hash)
      emit()
    }

    /* A page loaded straight into `#detail-...` opens that panel. */
    onHashChange()

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
}

/**
 * Mounted in `App` beside the enquiry modal provider. Its only job is to start
 * URL synchronisation once for the life of the app; it renders no UI.
 */
export function DetailProvider({ children }: { children: ReactNode }) {
  useHashSync()
  return <>{children}</>
}