import { useCallback, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { CAREER_ITEMS } from '@/data/nursingData'
import { useEnquiryModal } from './EnquiryModalProvider'
import Ticker from './Ticker'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

/**
 * Mobile is a scroll-snap carousel driven by two arrows; from `lg` up it
 * becomes a plain grid with no arrows, because there is nothing to scroll.
 *
 * The grid is `lg:grid-cols-3` rather than four columns on purpose: the site
 * has exactly three career items, and four empty slots would look like missing
 * content. Add a fourth `CAREER_ITEMS` entry and widen the grid if more land.
 */
export default function Careers() {
  const trackRef = useRef<HTMLUListElement>(null)
  const { openAdmission } = useEnquiryModal()

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }, [])

  return (
    /* Both this section and Research are black, so their `.section-pad` bottom
       and top used to stack into 192px of featureless void under the ticker.
       Overriding one side of each halves that: 32 + 64 = 96px. The utilities
       layer beats `.section-pad` in `@layer components`. */
    <Section id="careers" className="pb-6 md:pb-8">
      <SectionHeading
        label="Nursing careers"
        title="Build your nursing career"
        emphasis={['career']}
        description="Every pathway starts with the same foundations: evidence-based practice, patient-centred care and a commitment to continuous learning."
      />

      <div className="mt-10 flex items-center justify-between gap-4 md:hidden">
        <p className="text-[13px] text-muted">Swipe to explore</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous career cards"
            className="grid size-12 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-amber hover:text-amber"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next career cards"
            className="grid size-12 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-amber hover:text-amber"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
      >
        {CAREER_ITEMS.map((item) => (
          <li
            key={item.title}
            data-fade=""
            className="card-hover w-[78%] shrink-0 snap-start rounded-card bg-slate p-7 md:w-auto md:shrink"
          >
            <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.summary}</p>
            <button
              type="button"
              onClick={(event) => openAdmission(event.currentTarget, item.title)}
              aria-label={`View ${item.title} pathway`}
              className="mt-5 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-amber transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              View Pathway
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      {/* The photo that used to sit here is gone; the strip carries the section
          footer instead. */}
      <Ticker className="mt-7 md:mt-10" fade />
    </Section>
  )
}
