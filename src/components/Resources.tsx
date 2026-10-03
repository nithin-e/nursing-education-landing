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

      <ul className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {RESOURCE_ITEMS.map((item, index) => (
          <li
            key={item.title}
            data-fade=""
            className="card-hover flex min-h-[220px] flex-col items-center justify-between gap-4 rounded-card bg-slate p-5 text-center"
          >
            <span className="grid size-[72px] shrink-0 place-items-center rounded-full bg-navy-deep">
              <span className="font-display text-2xl font-extrabold text-amber">
                {String(index + 1).padStart(2, '0')}
              </span>
            </span>

            <div>
              <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">
                {item.summary}
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-amber transition-colors duration-200 hover:text-white"
              >
                Explore More
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8" data-fade="">
        <Photo
          slot="resourcesBanner"
          alt="Nurses at work on a hospital ward"
          className="h-[220px] md:h-[360px]"
          useRatio={false}
        />
      </div>
    </Section>
  )
}
