import { useEffect, useState } from 'react'
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const activeId = useScrollSpy(SECTION_IDS)
  const { openModal } = useContactModal()

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
         'sticky top-0 z-50 border-b backdrop-blur-[12px] transition-all duration-300',
         scrolled ? 'border-line-strong bg-black/85 h-14 lg:h-16' : 'border-line bg-black/70 h-16 lg:h-20',
       )}
     >
      <div className="container-page">
         <div className={cn(
           'flex items-center justify-between gap-4 transition-all duration-300',
           scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'
         )}>
           <a
             href="#home"
             aria-label={`${SITE.name} — home`}
             className="flex min-h-11 min-w-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
             onClick={() => setMenuOpen(false)}
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

             <button
               type="button"
               onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid size-11 shrink-0 place-items-center rounded-pill border border-white/15 text-white transition-colors duration-200 hover:border-amber hover:text-amber xl:hidden"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-height dark drawer. Anchored to the header rather than the viewport
          because the header's backdrop-filter would otherwise become the
          containing block for a fixed panel. */}
       <AnimatePresence initial={false}>
         {menuOpen ? (
           <motion.div
             id="mobile-navigation"
             key="mobile-nav"
             initial={prefersReducedMotion ? false : { opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
             className="fixed inset-0 top-0 z-40 flex flex-col bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90 xl:hidden"
           >
             <div className={cn(
               'container-page flex items-center justify-between border-b border-line',
               scrolled ? 'h-14' : 'h-16'
             )}>
               <a
                 href="#home"
                 aria-label={`${SITE.name} — home`}
                 className="flex min-h-11 items-center"
                 onClick={() => setMenuOpen(false)}
               >
                 <Logo tone="dark" hideWordmarkOnMobile />
               </a>
               <button
                 type="button"
                 onClick={() => setMenuOpen(false)}
                 aria-label="Close navigation menu"
                 className="grid size-11 place-items-center rounded-pill border border-white/15 text-white"
               >
                 <X className="size-5" aria-hidden="true" />
               </button>
             </div>
             <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-between py-8">
               <ul className="flex flex-col gap-3">
                 {NAV_LINKS.map((link) => {
                   const isActive = activeId === link.href.replace('#', '')
                   return (
                     <li key={link.label}>
                       <a
                         href={link.href}
                         aria-current={isActive ? 'true' : undefined}
                         onClick={() => setMenuOpen(false)}
                         className={cn(
                           'flex min-h-12 items-center px-2 py-2 text-3xl font-medium transition-colors duration-200 sm:text-4xl',
                           isActive ? 'text-amber' : 'text-white hover:text-amber',
                         )}
                       >
                         {link.label}
                       </a>
                     </li>
                   )
                 })}
               </ul>
               <div className="mt-8 pt-6">
                 <Button href="#resources" size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
                   Explore Resources
                 </Button>
                 <a
                   href="#contact"
                   onClick={(event) => {
                     setMenuOpen(false)
                     if (window.innerWidth <= 768) {
                       event.preventDefault()
                       openModal(event.currentTarget)
                     }
                   }}
                   className="mt-3 inline-flex min-h-14 w-full items-center justify-center rounded-pill border-[1.5px] border-white/40 bg-transparent px-8 font-semibold text-white"
                 >
                   Contact Us
                 </a>
               </div>
             </nav>
           </motion.div>
         ) : null}
       </AnimatePresence>
    </header>
  )
}
