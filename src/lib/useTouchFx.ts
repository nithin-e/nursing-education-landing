import { useEffect } from 'react'

/**
 * Touch interaction effects.
 *
 * Most of the page's interaction polish — the amber fill sliding across the
 * Nursing Resources rows, card lift, border glow, image zoom, arrow slide — is
 * written as `:hover`. Touch screens have no hover state, so on a phone none of
 * it ever ran, and on a hybrid device a tap could leave a row stuck in its
 * hover styling. Tailwind v4 already gates `hover:` utilities behind
 * `@media (hover: hover)`, so the utilities are safe; this module supplies the
 * missing touch equivalent.
 *
 * One shared IntersectionObserver watches every `[data-fx]` element. The observer
 * is only a cheap *trigger*: each callback re-reads `getBoundingClientRect` and
 * decides for itself, because a fixed threshold cannot describe "nearest to the
 * centre of the screen" and would silently never fire for elements taller than
 * the (already inset) root band.
 *
 * Only `is-active` is ever added, and every rule that reads it is additive, so
 * if this module never runs — no JS, no IntersectionObserver, a crash — the page
 * renders in its normal resting state with all content visible.
 */

const TOUCH_QUERY = '(hover: none), (max-width: 768px)'

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  // 0 as well as 0.6: the observer exists to tell us "something moved", the
  // geometry pass decides the winner. A 0.6-only threshold would never fire for
  // an element taller than 60% of the inset root band.
  threshold: [0, 0.6],
  rootMargin: '-20% 0px -20% 0px',
}

export default function useTouchFx() {
  useEffect(() => {
    const query = window.matchMedia(TOUCH_QUERY)
    let observer: IntersectionObserver | null = null
    let elements: HTMLElement[] = []
    let timers: number[] = []
    let running = false
    /** Set by a tap, so the row the reader chose wins over the centred one. */
    let pinned: HTMLElement | null = null

    /**
     * Groups elements by their shared parent so only one member of each list can
     * hold `is-active` at a time — the one whose centre sits closest to the
     * middle of the viewport.
     */
    const sync = () => {
      const groups = new Map<Element, HTMLElement[]>()
      for (const el of elements) {
        const key = el.parentElement ?? el
        const group = groups.get(key)
        if (group) group.push(el)
        else groups.set(key, [el])
      }

      const mid = window.innerHeight / 2
      for (const group of groups.values()) {
        let best: HTMLElement | null = null
        let bestDistance = Number.POSITIVE_INFINITY

        for (const el of group) {
          const rect = el.getBoundingClientRect()
          // Ignore anything scrolled out of sight, otherwise the "closest" row
          // is often one the reader has already passed.
          if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue
          const distance = Math.abs(rect.top + rect.height / 2 - mid)
          if (distance < bestDistance) {
            bestDistance = distance
            best = el
          }
        }

        // A tap beats the geometry until that row leaves the screen. Without
        // this, opening an accordion away from dead centre would snap the
        // highlight to a different row than the one just opened.
        if (pinned && group.includes(pinned)) {
          const rect = pinned.getBoundingClientRect()
          if (rect.bottom > 0 && rect.top < window.innerHeight) best = pinned
        }

        for (const el of group) el.classList.toggle('is-active', el === best)
      }
    }

    const collect = () => {
      observer?.disconnect()
      elements = Array.from(document.querySelectorAll<HTMLElement>('[data-fx]'))

      if (elements.length && typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(sync, OBSERVER_OPTIONS)
        for (const el of elements) observer.observe(el)
      }

      sync()
    }

    /**
     * Tap sets the state immediately so the press feels acknowledged, then the
     * geometry pass reasserts itself once the navigation settles. The default is
     * never prevented, so links keep working.
     */
    const onActivate = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-fx]')
      if (!target) return

      pinned = target
      target.classList.add('is-active')
      const timer = window.setTimeout(sync, 400)
      timers.push(timer)
    }

    const start = () => {
      if (running) return
      running = true
      collect()
      document.addEventListener('click', onActivate)
      document.addEventListener('touchstart', onActivate, { passive: true })
    }

    const stop = () => {
      if (!running) return
      running = false
      observer?.disconnect()
      observer = null
      document.removeEventListener('click', onActivate)
      document.removeEventListener('touchstart', onActivate)
      timers.forEach((timer) => window.clearTimeout(timer))
      timers = []
      pinned = null
      // Strip the state so a desktop mouse never inherits a phone tap's styling.
      for (const el of elements) el.classList.remove('is-active')
      elements = []
    }

    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) start()
      else stop()
    }

    if (query.matches) start()
    query.addEventListener('change', onChange)

    return () => {
      query.removeEventListener('change', onChange)
      stop()
    }
  }, [])
}
