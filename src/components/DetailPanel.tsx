import { useCallback, useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, Sparkle, X } from 'lucide-react'

import { whatsappLink } from '@/data/contact'
import { DETAILS, SECTION_BY_GROUP, idsInGroup } from '@/data/details'
import { EXAM_DISCLAIMER } from '@/data/nursingData'
import { cn } from '@/lib/cn'
import { closeDetail, closeDetailAndRestoreFocus, openDetail, useActiveDetail } from './DetailProvider'
import { useEnquiryModal } from './EnquiryModalProvider'
import Button from './ui/Button'

/** Matches the sign-up modal's selector, so both dialogs trap focus identically. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

/** WhatsApp message for the secondary action. */
function whatsappMessage(title: string) {
  return `I'd like to know more about ${title}`
}

/**
 * First word at weight 300, the rest at 800.
 *
 * Split on the first space only: "Nursing Education" should read as one light word
 * followed by one heavy phrase, not as a single heavy block.
 */
function splitTitle(title: string) {
  const index = title.indexOf(' ')

  if (index === -1) return { lead: title, rest: '' }

  return { lead: title.slice(0, index), rest: title.slice(index + 1) }
}

/**
 * The detail view for one card.
 *
 * Right-hand drawer from 769px, full-screen sheet below that, mirroring the
 * sign-up modal's breakpoint so the two never disagree about what "desktop"
 * means.
 *
 * Mounted once in `App`. Which item is open is read from the shared store, not
 * from props, so a card button anywhere on the page can open it without threading
 * state through the tree.
 */
export default function DetailPanel() {
  const detail = useActiveDetail()
  const { openAdmission } = useEnquiryModal()

  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  /* Focus the close button on open, not on every item change: re-focusing while
     someone is using the "Next" link would yank focus out from under them. */
  useEffect(() => {
    if (detail && !wasOpenRef.current) closeRef.current?.focus()

    wasOpenRef.current = detail !== null
  }, [detail])

  /* Back to the top whenever the item changes, including when "Next" swaps it.
     Without this the visitor stays scrolled halfway down the new item. */
  useEffect(() => {
    if (!detail) return

    panelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [detail])

  /* Lock page scroll while open, and put it back exactly as it was. */
  useEffect(() => {
    if (!detail) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [detail])

  /* Escape closes; Tab is trapped inside the panel. */
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      closeDetailAndRestoreFocus()
      return
    }

    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return

    /* Filtered by rendered size, so a hidden control inside a collapsed part of
       the panel cannot swallow focus. */
    const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => element.offsetWidth > 0 || element.offsetHeight > 0,
    )

    if (items.length === 0) return

    const first = items[0]
    const last = items[items.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }, [])

  if (!detail) return null

  const { lead, rest } = splitTitle(detail.title)

  /* "Next" walks the same group, wrapping at the end. */
  const siblings = idsInGroup(detail.group)
  const nextId = siblings[(siblings.indexOf(detail.id) + 1) % siblings.length]
  const nextDetail = nextId ? DETAILS[nextId] : null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end min-[769px]:items-stretch"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={closeDetailAndRestoreFocus}
        className="detail-backdrop absolute inset-0 cursor-default bg-black/65 backdrop-blur-[4px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-panel-title"
        className={cn(
          /* `min(560px, 92vw)`: never wider than 560px, never wider than the
             viewport minus a visible margin. */
          'detail-panel relative flex w-full flex-col overflow-y-auto border border-white/[0.08]',
          'h-[100dvh] rounded-t-[24px] bg-[#0F172A]',
          'min-[769px]:h-auto min-[769px]:w-[min(560px,92vw)] min-[769px]:max-w-none',
          'min-[769px]:rounded-none min-[769px]:border-y-0 min-[769px]:border-r-0',
        )}
      >
        <div className="px-[22px] pt-[22px] pb-[calc(22px+env(safe-area-inset-bottom))] min-[769px]:px-8 min-[769px]:pt-8 min-[769px]:pb-8">
          {/* Close, top-right. 44px so it is a comfortable tap target. */}
          <button
            ref={closeRef}
            type="button"
            onClick={closeDetailAndRestoreFocus}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber min-[769px]:top-5 min-[769px]:right-5"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <p className="flex items-center gap-2 pr-12 text-[13px] font-semibold tracking-[0.18em] text-amber uppercase">
            <Sparkle className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={2} />
            {detail.group}
          </p>

          <h2
            id="detail-panel-title"
            className="font-display mt-4 text-[clamp(28px,4vw,40px)] leading-[1.15] font-light text-white"
          >
            {lead} {rest ? <span className="font-extrabold">{rest}</span> : null}
          </h2>

          <p className="mt-4 text-[17px] leading-[1.7] text-[#D1D5DB]">{detail.overview}</p>

          <h3 className="font-display mt-8 text-[20px] font-bold text-white">
            What you will explore
          </h3>

          {/* Divided rows rather than bullets: the star sits in the first line of
              each row and the sentences stay full width, which a hanging bullet
              would narrow. */}
          <ul className="mt-3 border-t border-white/10">
            {detail.topics.map((topic) => (
              <li
                key={topic.title}
                className="flex gap-3 border-b border-white/10 py-4 last:border-b-0"
              >
                <Sparkle
                  className="mt-1 size-4 shrink-0 text-amber"
                  aria-hidden="true"
                  strokeWidth={2}
                />

                <div className="min-w-0">
                  <p className="text-[17px] font-semibold text-white">{topic.title}</p>
                  <p className="mt-1 text-[15px] leading-[1.6] text-muted">{topic.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="font-display mt-8 text-[20px] font-bold text-white">Who it helps</h3>

          <p className="mt-2 text-[15px] leading-[1.7] text-muted">{detail.audience}</p>

          {detail.showDisclaimer ? (
            <p className="mt-6 rounded-[16px] border border-white/15 p-4 text-[14px] leading-[1.6] text-muted">
              {EXAM_DISCLAIMER}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 min-[481px]:flex-row">
            <Button
              variant="primary"
              className="w-full min-[481px]:w-auto"
              /* Closing first keeps the sign-up modal stacked above this panel rather than the
                 two fighting over focus. Focus is deliberately *not* returned to
                 the card button here: the sign-up modal focuses its own first
                 field on open, and a restored focus would race it and win. */
              onClick={() => {
                closeDetail()
                openAdmission(null, detail.title)
              }}
            >
              Talk to our team
            </Button>

            <Button
              href={whatsappLink(whatsappMessage(detail.title))}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="w-full min-[481px]:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>

          {/* Navigation between related items and back to the section. Drawn as
              links because they navigate; both are 44px tall. */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5">
            {nextDetail ? (
              <button
                type="button"
                onClick={(event) => openDetail(nextDetail.id, event.currentTarget, true)}
                className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-amber transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
                Next: {nextDetail.title}
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={() => {
                const section = document.getElementById(SECTION_BY_GROUP[detail.group])
                closeDetailAndRestoreFocus()

                if (!section) return

                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                window.requestAnimationFrame(() =>
                  section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }),
                )
              }}
              className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-amber transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              Back to {detail.group}
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}