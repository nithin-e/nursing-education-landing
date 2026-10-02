import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js')
  const timeout = window.setTimeout(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
  }, 1500)
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.clearTimeout(timeout)
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
  }
}
