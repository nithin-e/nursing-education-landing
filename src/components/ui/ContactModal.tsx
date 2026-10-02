import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Mail, Phone, X } from 'lucide-react'

import { SITE } from '@/data/site'
import ContactForm from './ContactForm'
import EcgPulse from './EcgPulse'

const MOBILE_MAX_WIDTH = 768

type ContactModalContextValue = {
  open: boolean
  openModal: (trigger: HTMLElement | null) => void
  closeModal: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (!context) throw new Error('useContactModal must be used inside ContactModalProvider')
  return context
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

/**
 * Single shared contact modal + provider. Mounted once at the app root so any
 * "Contact Us" button on the page can open it without duplicating state.
 * It only ever opens on viewports of 768px or narrower.
 */
export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const isMobile = () => window.innerWidth <= MOBILE_MAX_WIDTH

  const openModal = useCallback((trigger: HTMLElement | null) => {
    if (!isMobile()) return
    triggerRef.current = trigger
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => setOpen(false), [])

  // Desktop safety: close automatically if the viewport grows past 768px.
  useEffect(() => {
    if (!open) return
    const onResize = () => {
      if (!isMobile()) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  // Body scroll lock while open, restored on close.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [open])

  // Focus the first field on open, restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return
    const firstField = sheetRef.current?.querySelector<HTMLElement>('input')
    firstField?.focus()

    return () => {
      triggerRef.current?.focus?.()
    }
  }, [open])

  // Escape closes; Tab is trapped inside the sheet.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const sheet = sheetRef.current
      if (!sheet) return
      const nodes = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null || node === document.activeElement,
      )
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  )

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal sheetRef={sheetRef} open={open} onClose={closeModal} reduced={Boolean(prefersReducedMotion)} />
    </ContactModalContext.Provider>
  )
}

type ModalProps = {
  open: boolean
  onClose: () => void
  sheetRef: React.RefObject<HTMLDivElement | null>
  reduced: boolean
}

function ContactModal({ open, onClose, sheetRef, reduced }: ModalProps) {
  const [submitted, setSubmitted] = useState(false)

  // Every close path (backdrop, X, Escape, auto-close) resets the success view.
  const close = useCallback(() => {
    setSubmitted(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open || !submitted) return
    const timer = window.setTimeout(close, 3000)
    return () => window.clearTimeout(timer)
  }, [open, submitted, close])

  return (
    <AnimatePresence>
      {open ? (
        // z 1100 keeps this above the mobile menu panel (1000) and the raised
        // header (1001), so "Contact Us" hands off cleanly from the menu instead
        // of the sheet appearing behind the fading panel.
        <div className="fixed inset-0 z-[1100] md:hidden">
          <motion.button
            type="button"
            aria-label="Close contact form"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.3 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-[6px]"
          />

          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-heading"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: reduced ? 0.15 : 0.3, ease: 'easeOut' }}
            className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-navy"
            style={{ boxShadow: '0 -20px 60px -20px rgb(0 0 0 / 0.8)' }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
            >
              <EcgPulse animate={!reduced} className="h-12 w-full opacity-30" />
            </span>

            <div className="relative z-[1] flex shrink-0 items-center justify-center pt-3">
              <span aria-hidden="true" className="h-1 w-10 rounded-full bg-white/25" />
            </div>

            <div className="relative z-[1] flex shrink-0 items-start justify-between gap-4 px-5 pt-4">
              <div className="flex min-w-0 flex-col gap-1">
                <h2
                  id="contact-modal-heading"
                  className="font-display text-2xl font-bold text-white"
                >
                  Send an enquiry
                </h2>
                <p className="text-sm text-[#9CA3AF]">
                  Fields marked with <span aria-hidden="true">*</span> are required.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close contact form"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-amber hover:text-amber"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative z-[1] flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6">
              {submitted ? (
                <div className="flex flex-col items-start gap-4">
                  <p className="flex items-start gap-3 rounded-field border border-amber/40 bg-amber/10 p-4 text-sm leading-relaxed text-white">
                    <CheckCircle2 className="size-5 shrink-0 text-amber" aria-hidden="true" />
                    <span>
                      <span className="font-semibold">Thank you.</span> Form validated successfully.
                      This is a static demo — no message was sent or stored.
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-pill bg-amber px-8 font-semibold text-ink transition-[background-color,box-shadow,transform] duration-200 hover:bg-amber-deep active:scale-[0.97] active:shadow-[0_0_0_4px_rgb(255_193_7/0.28)]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex gap-3">
                    <a
                      href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-pill border border-amber/40 text-sm font-medium text-amber transition-colors duration-200"
                    >
                      <Phone className="size-4" aria-hidden="true" />
                      Call
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-pill border border-amber/40 text-sm font-medium text-amber transition-colors duration-200"
                    >
                      <Mail className="size-4" aria-hidden="true" />
                      Email
                    </a>
                  </div>

                  <ContactForm idPrefix="modal-contact" onSuccess={() => setSubmitted(true)} />
                </>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Wraps a trigger so it opens the modal on mobile and keeps the existing
 * scroll-to-#contact behaviour on desktop.
 */
export function ContactTrigger({
  children,
  className,
  href = '#contact',
}: {
  children: ReactNode
  className?: string
  href?: string
}) {
  const { openModal } = useContactModal()

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_MAX_WIDTH) {
          event.preventDefault()
          openModal(event.currentTarget)
        }
      }}
    >
      {children}
    </a>
  )
}
