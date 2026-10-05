/**
 * Scrolls to a section by id, for the CTAs that read as navigation but were
 * built as buttons.
 *
 * Shared because three call sites need identical behaviour and, more importantly,
 * identical handling of the OS motion setting: a visitor who has asked for
 * reduced motion should not be animated across the page.
 *
 * `scrollIntoView` is used rather than setting `scrollTop` so the target's own
 * `scroll-margin-top` is honoured. That margin is what keeps the section heading
 * clear of the sticky header - without it the heading lands underneath it.
 *
 * `hash` is optional: pass one to make the jump linkable and to let the target
 * section open a specific item, e.g. `#faq-exams`.
 */
export default function scrollToSection(id: string, hash?: string) {
  const target = document.getElementById(id)
  if (!target) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* `replaceState`, not `location.hash = ...`: assigning the hash would push a
     new history entry for every click and let the browser do its own jump
     alongside ours. `replaceState` does neither, but it also fires no event, so
     the `hashchange` listener below is raised by hand - that is how a target
     section such as the FAQ learns to open a specific row. */
  if (hash) {
    window.history.replaceState(null, '', `#${hash}`)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}