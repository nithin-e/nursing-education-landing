import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'

import { NAV_LINKS } from '@/data/site'
import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'
import useScrollSpy from '@/lib/useScrollSpy'
import Button from './ui/Button'
import Logo from './ui/Logo'

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''))

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const activeId = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on Escape and lock body scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled ? 'border-charcoal-line/60 bg-charcoal/95 backdrop-blur-sm' : 'border-transparent bg-charcoal',
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 py-2">
          <a
            href="#home"
            aria-label={`${SITE.name} — home`}
            className="min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            onClick={() => setMenuOpen(false)}
          >
            <Logo tone="dark" />
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-md px-2.5 py-2 text-[0.82rem] font-medium transition-colors',
                        isActive ? 'text-gold' : 'text-paper/80 hover:text-gold',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search nursing resources"
              className="hidden size-9 place-items-center rounded-full text-paper/80 transition-colors hover:text-gold md:grid"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>

            <Button href="#resources" size="sm" className="max-md:hidden">
              Explore Resources
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid size-9 place-items-center rounded-md border border-white/15 text-paper transition-colors hover:border-gold hover:text-gold xl:hidden"
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            key="mobile-nav"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal-line bg-charcoal xl:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-4">
              <ul className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-md px-3 py-2.5 text-[0.95rem] font-medium text-paper/85 transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-3 border-t border-charcoal-line pt-4">
                <Button href="#resources" size="md" className="flex-1" onClick={() => setMenuOpen(false)}>
                  Explore Resources
                </Button>
                <button
                  type="button"
                  aria-label="Search nursing resources"
                  className="grid size-11 place-items-center rounded-md border border-white/20 text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  <Search className="size-5" aria-hidden="true" />
                </button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}