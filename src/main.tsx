import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/**
 * Safety net for the scroll reveal.
 *
 * The reveal itself is owned by `useReveal`, which observes each `[data-reveal]`
 * block as it mounts. This is only the backstop: `[data-reveal]` is hidden
 * *solely* while `html` carries the `js` class, so with JavaScript disabled the
 * page renders fully visible. This timer covers the remaining failure mode where
 * JS runs but an observer never fires, which would otherwise strand a block at
 * `opacity: 0`.
 *
 * The query is deferred by a frame because at module scope React has not
 * committed the tree yet and would match nothing — which is exactly why the
 * previous version of this block never did anything.
 */
window.requestAnimationFrame(() => {
  const revealAll = () => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealAll()
    return
  }

  const timeout = window.setTimeout(revealAll, 1500)
  window.addEventListener('pagehide', () => window.clearTimeout(timeout), { once: true })
})
