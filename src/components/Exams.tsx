import { useState } from 'react'
import { ArrowRight, Sparkle } from 'lucide-react'

import { EXAM_DISCLAIMER, EXAM_GLASS_TEXT, EXAM_ITEMS } from '@/data/nursingData'
import type { ListItem } from '@/data/nursingData'
import { openDetail } from './DetailProvider'
import Photo from './ui/Photo'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'

/** Detail ids keyed on row title, so reordering the array cannot mispair them. */
const EXAM_IDS: Record<string, string> = {
  'Nursing Entrance Exams': 'nursing-entrance-exams',
  'Licensing Examinations': 'licensing-examinations',
  'Professional Certifications': 'professional-certifications',
}

/**
 * The three exam rows, each one a button.
 *
 * The whole row is the control rather than a link inside it: one focus stop, one
 * 44px-tall tap target, and no nested interactive elements. The yellow "Learn more"
 * and arrow are part of the button's own content, so the affordance is visible
 * without becoming a separate target.
 */
function ExamRow({ item }: { item: ListItem }) {
  return (
    <li className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={(event) => openDetail(EXAM_IDS[item.title] ?? '', event.currentTarget)}
        className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
      >
        <Sparkle className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" strokeWidth={2} />

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.summary}</p>

          <span className="mt-2.5 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-amber transition-colors duration-200 group-hover:text-white">
            Learn more
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </button>
    </li>
  )
}

/**
 * Left column is a star list, right column is a two-photo collage. The collage
 * and the glass card that sits beside the small photo are one unit, so if the
 * collage's main photo is missing both disappear together rather than leaving a
 * card stranded next to nothing.
 */
/**
 * Left column is a star list, right column is a two-photo collage. The collage
 * and the glass card that sits beside the small photo are one unit, so if the
 * collage's main photo is missing both disappear together rather than leaving a
 * card stranded next to nothing.
 */
export default function Exams() {
  const [collageFailed, setCollageFailed] = useState(false)

  return (
    <Section id="exams" tone="navy">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-fade="" className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            label="Exams &amp; certifications"
            title="Everything you need for exams &amp; certifications"
            emphasis={['exams', 'certifications']}
            description="From nursing entrance tests to licensing and specialisation certificates, understand what each assessment covers before you sit it."
          />

          <ul className="mt-8 border-t border-line">
            {EXAM_ITEMS.map((item) => (
              <ExamRow key={item.title} item={item} />
            ))}
          </ul>

          <div className="mt-8">
            {/* The section's main button opens the first exam's detail view, which
                is where a general "Learn more" question belongs. */}
            <Button
              variant="primary"
              onClick={(event) =>
                openDetail(EXAM_IDS[EXAM_ITEMS[0].title] ?? '', event.currentTarget)
              }
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Learn More
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-8 text-[13px] leading-relaxed text-muted">{EXAM_DISCLAIMER}</p>
        </div>

        <div className="order-1 lg:order-2" data-fade="">
          {collageFailed ? null : (
            <div>
              <Photo
                slot="examsMain"
                alt="Nursing team in a clinical setting"
                className="!rounded-[24px] !border-[rgb(255_255_255/0.08)] min-[769px]:!rounded-[28px]"
                onFail={() => setCollageFailed(true)}
              />

              {/* Small photo and glass card form one centred pair, so the card
                  sits beside the photo instead of over the main image and can
                  never cover a face. Side by side from `lg`, which is where the
                  two-column grid begins. Percentages rather than a fixed 360px:
                  the right column is 448px wide at 1024px but 536px from 1200px,
                  and 45%/67% lands on ~360px on desktop while never overflowing
                  the narrower band. */}
              <div className="mt-8 flex flex-col items-center gap-3 min-[1024px]:flex-row min-[1024px]:gap-5">
                <Photo
                  slot="examsSecondary"
                  alt="Dr Expert Edulinks event with students"
                  className="w-full !border-[rgb(255_255_255/0.08)] min-[1024px]:w-[45%] min-[1200px]:w-[67%]"
                />

                <div className="w-full min-w-0 rounded-[18px] border border-white/15 bg-black/45 p-[14px_18px] backdrop-blur-md min-[1024px]:flex-1">
                  <p className="text-[15px] leading-relaxed text-white">{EXAM_GLASS_TEXT}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
