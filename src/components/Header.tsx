import { Menu, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { NAV_LINKS, SITE, TEL_HREF } from '@/data/site'
import { cn } from '@/lib/cn'
import Button from './ui/Button'
import Logo from './ui/Logo'

/** Yellow circle phone icon + the number, used in the bar and in the menu. */
function PhoneLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={TEL_HREF}
      className={cn(
        'flex min-h-12 items-center gap-3 text-white transition-colors duration-200 hover:text-amber',
        className,
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-amber text-black">
        <Phone className="size-4" aria-hidden="true" />
      </span>
      <span className="font-semibold whitespace-nowrap">{SITE.phone}</span>
    </a>
  )
}

/**
 * Sticky header: logo on the left, phone and a yellow "Get Admission" pill on
 * the right, and a hamburger that opens a plain full-screen black menu.
 *
 * The header background is solid black on purpose — `backdrop-filter` would
 * create a containing block for the `position: fixed` menu panel below and
 * clip it to the header's own box.
 *
 * The brand tagline lives in the hero pill, so it is deliberately not repeated
 * under the logo here.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="container-page relative z-10 flex min-h-[84px] items-center justify-between gap-3 py-3 min-[769px]:min-h-[92px] lg:min-h-[104px]">
        <a
          href="#home"
          aria-label={`${SITE.name} — home`}
          className="flex min-w-0 items-center"
        >
          <Logo />
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* The phone number lives in the header bar from large screens up; on
              a phone it sits at the bottom of the menu instead. */}
          <PhoneLink className="hidden lg:flex" />

          <Button href="#contact" className="px-5 text-sm sm:px-7 sm:text-base">
            Get Admission
          </Button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-amber hover:text-amber"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-20 flex flex-col bg-black"
        >
          <div className="container-page flex min-h-[84px] shrink-0 items-center justify-between py-3 min-[769px]:min-h-[92px] lg:min-h-[104px]">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={() => close()}
              aria-label="Close menu"
              className="grid size-12 place-items-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-amber hover:text-amber"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Main" className="container-page flex flex-1 flex-col justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => close(false)}
                className="border-b border-line py-4 font-display text-[clamp(1.75rem,7vw,2.5rem)] font-light text-white transition-colors duration-200 hover:text-amber"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="container-page shrink-0 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            <Button href="#contact" onClick={() => close(false)} className="w-full">
              Get Admission
            </Button>
            <PhoneLink className="mt-4 justify-center" />
          </div>
        </div>
      ) : null}
    </header>
  )
}
