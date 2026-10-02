import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Scroll-reveal engine. One IntersectionObserver is shared per root element, so
 * a page with dozens of cards still costs a single observer and no scroll
 * listeners.
 *
 * Elements start hidden through CSS (`[data-reveal]`); this module only ever
 * adds the `is-visible` class. That keeps the hidden state declarative and means
 * the `prefers-reduced-motion` override in index.css can win outright.
 */

type RevealCallback = () => void

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  // threshold 0 means "as soon as any part is visible". A higher threshold can
  // never be reached by an element taller than the viewport, which would leave
  // it stuck at opacity 0 forever.
  rootMargin: '0px 0px -8% 0px',
  threshold: 0,
}

let rootObserver: IntersectionObserver | null = null
const rootObservers = new WeakMap<Element, IntersectionObserver>()
const callbacks = new WeakMap<Element, RevealCallback>()
const assigned = new WeakMap<Element, IntersectionObserver>()

function handleEntries(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue
    callbacks.get(entry.target)?.()
    assigned.get(entry.target)?.unobserve(entry.target)
  }
}

function getObserver(root?: Element | null): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null

  if (!root) {
    if (!rootObserver) rootObserver = new IntersectionObserver(handleEntries, OBSERVER_OPTIONS)
    return rootObserver
  }

  let observer = rootObservers.get(root)
  if (!observer) {
    observer = new IntersectionObserver(handleEntries, { ...OBSERVER_OPTIONS, root })
    rootObservers.set(root, observer)
  }
  return observer
}

/**
 * Observes a single element. When IntersectionObserver is unavailable the
 * callback runs immediately so content is never left invisible.
 */
export function registerReveal(element: Element, callback: RevealCallback, root?: Element | null) {
  const observer = getObserver(root)
  if (!observer) {
    callback()
    return () => {}
  }

  callbacks.set(element, callback)
  assigned.set(element, observer)
  observer.observe(element)

  return () => {
    callbacks.delete(element)
    assigned.delete(element)
    observer.unobserve(element)
  }
}

/**
 * Reveals the direct children of a container one by one. Staggering is handled
 * in CSS by `data-reveal-stagger` nth-child rules, so this only flips the class
 * on each child as it scrolls into view.
 *
 * Pass `rootRef` for a carousel: the track becomes the intersection root, so
 * every slide animates in together once the track itself is on screen instead of
 * leaving off-screen slides stuck at opacity 0 until the user swipes.
 */
export function useRevealChildren<T extends HTMLElement>(
  ref: RefObject<T | null>,
  rootRef?: RefObject<Element | null>,
) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const root = rootRef?.current ?? null
    const children = Array.from(container.children)
    const cleanups = children.map((child) =>
      registerReveal(
        child,
        () => child.classList.add('is-visible'),
        root,
      ),
    )

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [ref, rootRef])
}
