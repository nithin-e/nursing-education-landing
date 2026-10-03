import { ArrowRight } from 'lucide-react'

import { RESOURCE_ITEMS } from '@/data/nursingData'
import Photo from './ui/Photo'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

/** Tile grid plus one wide photo banner. */
export default function Resources() {
  return (
    <Section id="resources">
      <SectionHeading
        label="Featured resources"
        title="Explore nursing resources"
        emphasis={['resources']}
        description="Curated learning material organised around the four pillars of everyday nursing - study, clinical practice, safety and professional growth."
      />

      {/*
         Four columns from 1100px, two from 481px, and a single column of
         horizontal rows on phones — where a 2-up grid left each card ~156px
         wide, titles wrapped and the clamped summary cut off mid-word.

         `align-items: stretch` is the grid default, so cards in a row share the
         tallest height instead of one short card sitting next to a tall one.
         Nothing clamps text at any width, so summaries always run to the end.
         The circle carries `shrink-0` and a square `size-*`, so it stays round
         rather than being squeezed into an oval by a long title.
         */}
      <ul className="mt-12 grid grid-cols-1 items-stretch gap-3.5 min-[481px]:grid-cols-2 min-[481px]:gap-4 min-[769px]:gap-6 min-[1100px]:grid-cols-4 min-[1100px]:gap-5">
        {RESOURCE_ITEMS.map((item, index) => (
          <li
            key={item.title}
            data-fade=""
            className="card-hover relative flex min-h-[88px] min-w-0 flex-row items-start gap-4 rounded-[24px] bg-slate p-5 text-left max-[320px]:p-4 min-[481px]:min-h-[220px] min-[481px]:flex-col min-[481px]:items-center min-[481px]:justify-between min-[481px]:gap-4 min-[481px]:rounded-card min-[481px]:p-6 min-[481px]:text-center min-[769px]:p-5"
          >
            <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-navy-deep max-[320px]:size-[44px] min-[481px]:size-[56px] min-[769px]:size-[72px]">
              <span className="font-display text-[20px] font-extrabold text-amber min-[769px]:text-2xl">
                {String(index + 1).padStart(2, '0')}
              </span>
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[20px] font-bold text-white [overflow-wrap:anywhere] max-[320px]:text-[18px] min-[769px]:text-[18px]">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-muted min-[769px]:text-[14px] min-[769px]:leading-relaxed">
                {item.summary}
              </p>
              {/* Stretched pseudo-element makes the whole phone-row card tappable
                  from the one real link, so there is still only one focusable
                  stop and no click handler needed. */}
              <a
                href="#contact"
                className="mt-2.5 inline-flex min-h-11 items-center gap-1 text-[16px] font-semibold text-amber transition-colors duration-200 hover:text-white min-[769px]:mt-3 min-[769px]:text-[14px] max-[480px]:after:absolute max-[480px]:after:inset-0 max-[480px]:after:content-['']"
              >
                Explore More
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8" data-fade="">
        {/* 1.webp is 1080x720 and the frame is 3:2, so `cover` crops nothing.
            The `!` classes override Photo's own radius and border defaults. */}
        <Photo
          slot="resourcesBanner"
          alt="Dr Expert Edulinks students in white coats"
          className="mx-auto w-full max-w-[960px] !rounded-[24px] !border-[rgb(255_255_255/0.08)] min-[769px]:!rounded-[28px]"
        />
      </div>
    </Section>
  )
}
