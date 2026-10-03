import { Play } from 'lucide-react'

import { RESEARCH_ITEMS } from '@/data/nursingData'
import type { ImageSlot } from '@/data/images'
import Photo from './ui/Photo'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

/** Three different photos, so nothing repeats across the row. */
const CARD_SLOTS: ImageSlot[] = ['researchCard1', 'researchCard2', 'researchCard3']

export default function Research() {
  return (
    <Section id="research">
      <SectionHeading
        label="Research &amp; evidence"
        title="Turn evidence into better care"
        emphasis={['evidence']}
        description="How research is designed, appraised and applied where it matters most - at the bedside."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {RESEARCH_ITEMS.map((item, index) => (
          <li key={item.title} data-fade="" className="card-hover rounded-card bg-slate">
            {/* Top corners only, so the photo sits flush against the card's own
                28px radius instead of floating inside it. */}
            <Photo slot={CARD_SLOTS[index]} className="w-full !rounded-[28px_28px_0_0]" />

            <div className="p-6">
              <div className="flex items-center gap-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-deep">
                  <Play className="size-4 text-amber" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
              </div>

              <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.summary}</p>

              <a
                href="#contact"
                className="mt-5 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-amber transition-colors duration-200 hover:text-white"
              >
                Explore More
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
