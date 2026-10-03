/**
 * The site's only scroll behaviour: a 300ms opacity fade on `[data-fade]`
 * elements. No transforms, no stagger, no pinning.
 *
 * Blocks are hidden only while `<html>` carries the `js` class, so the page is
 * fully visible when JavaScript is off. A single timer is the backstop for the
 * case where JS runs but the observer never fires, which would otherwise strand
 * a block at `opacity: 0`.
 *
 * Returns a cleanup function so React Strict Mode's double-mount in development
 * tears the observer and timer down instead of leaking both.
 */
export default function useReveal(): () => void {
  if (typeof window === 'undefined') return () => {}

  const show = (el: Element) => el.classList.add('is-fade-in')

  const blocks = document.querySelectorAll('[data-fade]')

  const timer = window.setTimeout(() => {
    blocks.forEach(show)
  }, 1500)

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        show(entry.target)
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )

  blocks.forEach((el) => observer.observe(el))

  // Skip the animation entirely for people who asked for less motion.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    blocks.forEach(show)
  }

  return () => {
    window.clearTimeout(timer)
    observer.disconnect()
  }
}
