import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'

import { NAV_LINKS } from '@/data/site'
import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'
import useScrollSpy from '@/lib/useScrollSpy'
import Button from './ui/Button'
import Logo from './ui/Logo'
import { useContactModal } from './ui/ContactModal'

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''))
const MOBILE_BREAKPOINT = 768

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const activeId = useScrollSpy(SECTION_IDS)
  const { openModal } = useContactModal()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the menu is open: lock scroll on both roots, park the hero loops and
  // the bottom bar, and tag <html> so the header can rise above the panel.
  useEffect(() => {
    if (!menuOpen) return

    const root = document.documentElement
    root.classList.add('menu-open')

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      root.classList.remove('menu-open')
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen, closeMenu])

  // Move focus to the panel's own close button when the menu opens. The header's
  // toggle is hidden while open (`html.menu-open`), so it cannot take focus back.
  useEffect(() => {
    if (!menuOpen) return
    closeRef.current?.focus({ preventScroll: true })
  }, [menuOpen])

  // ...and hand it back to the hamburger on close, so focus is never dropped on
  // <body>. Skipped when the menu closed because the viewport grew past the
  // breakpoint, since the toggle is hidden there.
  useEffect(() => {
    if (menuOpen) return
    if (window.innerWidth > MOBILE_BREAKPOINT) return
    if (document.activeElement === document.body) {
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'site-header sticky top-0 z-50 border-b backdrop-blur-[12px] transition-all duration-300',
          scrolled ? 'border-line-strong bg-black/85' : 'border-line bg-black/70',
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              'flex items-center justify-between gap-4 transition-all duration-300',
              scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20',
            )}
          >
            <a
              href="#home"
              aria-label={`${SITE.name} — home`}
              className="flex min-h-11 min-w-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
              onClick={closeMenu}
            >
              <span className="size-2 shrink-0 rounded-full bg-[var(--vital)] pulse-dot" />
              <Logo tone="dark" hideWordmarkOnMobile />
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
                          'relative flex min-h-11 items-center rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                          isActive ? 'text-amber' : 'text-white/70 hover:text-amber',
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-amber"
                          />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Search nursing resources"
                className="hidden size-11 place-items-center rounded-pill border border-white/10 text-white/70 transition-colors duration-200 hover:border-amber/40 hover:text-amber md:grid"
              >
                <Search className="size-5" aria-hidden="true" />
              </button>

              <span className="hidden md:block">
                <Button href="#resources" size="sm">
                  Explore Resources
                </Button>
              </span>

              {/* Hidden by `html.menu-open`: the panel supplies the only close
                  button, and this row sits behind the opaque panel anyway. */}
              <button
                type="button"
                ref={toggleRef}
                className="header-menu-toggle grid size-11 shrink-0 place-items-center rounded-pill border border-white/15 bg-black text-white transition-colors duration-200 hover:border-amber hover:text-amber xl:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label="Open navigation menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/*
        Portalled to <body> on purpose. Inside the header the panel would inherit
        its `backdrop-filter` containing block and its `overflow`, so a fixed,
        full-viewport layer would not actually cover the viewport.
      */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-navigation"
                key="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mobile-menu-panel xl:hidden"
              >
                {/* Top row: the panel is opaque and covers the header, so the
                    logo and the only close button live here. Absolute, so it
                    adds no layout height to the link list below. */}
                <div className="mobile-menu-topbar">
                  <a
                    href="#home"
                    aria-label={`${SITE.name} — home`}
                    onClick={closeMenu}
                    className="flex min-h-11 min-w-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                  >
                    <Logo tone="dark" />
                  </a>

                  <button
                    type="button"
                    ref={closeRef}
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] border-amber bg-transparent text-amber transition-colors duration-200 hover:bg-amber hover:text-black active:scale-95"
                  >
                    {/* Rotates in from 90° on open; transform only. */}
                    <motion.span
                      initial={prefersReducedMotion ? false : { rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="grid place-items-center"
                    >
                      <X className="size-5" strokeWidth={2} aria-hidden="true" />
                    </motion.span>
                  </button>
                </div>

                <nav aria-label="Mobile" className="flex flex-1 flex-col">
                  <ul className="flex flex-col">
                    {NAV_LINKS.map((link, index) => {
                      const isActive = activeId === link.href.replace('#', '')
                      const num = String(index + 1).padStart(2, '0')
                      return (
                        <motion.li
                          key={link.label}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                            delay: prefersReducedMotion ? 0 : 0.06 + index * 0.04,
                          }}
                        >
                          <a
                            href={link.href}
                            aria-current={isActive ? 'true' : undefined}
                            onClick={closeMenu}
                            className={cn(
                              'flex min-h-12 items-center gap-4 border-b border-white/[0.08] py-3.5 text-[28px] leading-tight transition-colors duration-200',
                              isActive ? 'text-amber' : 'text-white hover:text-amber',
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                'w-6 shrink-0 font-mono text-xs tabular-nums',
                                isActive ? 'text-amber' : 'text-amber/70',
                              )}
                            >
                              {num}
                            </span>
                            {link.label}
                          </a>
                        </motion.li>
                      )
                    })}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-8">
                    <Button
                      href="#resources"
                      size="lg"
                      className="min-h-[52px] w-full py-[14px]"
                      onClick={closeMenu}
                    >
                      Explore Resources
                    </Button>
                    <a
                      href="#contact"
                      onClick={(event) => {
                        closeMenu()
                        // Phones open the modal rather than jumping, matching
                        // the rest of the mobile CTA treatment.
                        if (window.innerWidth <= MOBILE_BREAKPOINT) {
                          event.preventDefault()
                          openModal(event.currentTarget)
                        }
                      }}
                      className="flex min-h-[52px] w-full items-center justify-center rounded-pill border-[1.5px] border-white/40 bg-transparent px-8 font-semibold text-white"
                    >
                      Contact Us
                    </a>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
