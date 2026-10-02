import { useEffect } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Hero-behind-the-sheet scroll fade (mobile only).
 *
 * The hero is pinned as a full screen while the sheet slides up over it, so it
 * recedes as the visitor scrolls. Progress is written once per frame to
 * `--stage-p` on the stage and consumed by CSS for scale, opacity and
 * brightness; the hero's marquee and ECG animations are parked once the hero is
 * essentially out of view.
 *
 * Nothing is styled by default, so a JS failure simply leaves the hero fully
 * visible and static.
 */
export function useStageReveal() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.stage')
    if (!stage) return

    const mobile = window.matchMedia(MOBILE_QUERY)
    const reduced = window.matchMedia(REDUCED_QUERY)

    let frame = 0
    let active = false

    const paint = () => {
      frame = 0
      if (!active) return
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
      stage.style.setProperty('--stage-p', progress.toFixed(4))
      stage.setAttribute('data-scrolled', progress > 0.95 ? 'past' : 'active')
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(paint)
    }

    const start = () => {
      if (active) return
      active = true
      stage.setAttribute('data-stage', 'ready')
      paint()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }

    const stop = () => {
      if (!active) return
      active = false
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      stage.removeAttribute('data-stage')
      stage.removeAttribute('data-scrolled')
      stage.style.removeProperty('--stage-p')
    }

    const sync = () => {
      if (mobile.matches && !reduced.matches) start()
      else stop()
    }

    sync()
    mobile.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      mobile.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      stop()
    }
  }, [])
}
