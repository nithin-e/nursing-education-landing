import { Info } from 'lucide-react'

import { NEWS_ITEMS, NEWS_NOTE } from '@/data/nursingData'
import NewsCardItem from './ui/NewsCardItem'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function News() {
  return (
    <Section id="news" tone="light" className="py-20 sm:py-28">
      <SectionBody>
        <SectionHeading
          eyebrow="News & Updates"
          title="Latest Nursing News & Insights"
          description="A look at the themes shaping nursing education, patient care and professional events — written for our community."
        />

        <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_ITEMS.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.08}>
              <NewsCardItem item={item} tone="light" />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-10">
          <p className="flex flex-col gap-3 rounded-2xl border border-charcoal/10 bg-mist p-5 text-sm leading-relaxed text-charcoal/70 sm:flex-row sm:items-start sm:gap-4">
            <Info className="size-5 shrink-0 text-gold-dark" aria-hidden="true" />
            <span>{NEWS_NOTE}</span>
          </p>
        </Reveal>
      </SectionBody>
    </Section>
  )
}