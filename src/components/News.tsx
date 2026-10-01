import { Info } from 'lucide-react'

import { NEWS_ITEMS, NEWS_NOTE } from '@/data/nursingData'
import NewsCardItem from './ui/NewsCardItem'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function News() {
  return (
    <Section id="news" tone="light">
      <SectionBody>
        <SectionHeading
          align="left"
          eyebrow="News & updates"
          title="Latest nursing news & insights"
          description="A look at the themes shaping nursing education, patient care and professional events — written for our community."
        />

        <ul className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <li key={item.title}>
              <NewsCardItem item={item} tone="light" />
            </li>
          ))}
        </ul>

        <Reveal className="mt-8" delay={0.08}>
          <p className="flex flex-col gap-2.5 rounded-lg border border-charcoal/10 bg-mist p-4 text-sm leading-relaxed text-charcoal/70 sm:flex-row sm:items-start sm:gap-3.5 sm:p-5">
            <Info className="size-5 shrink-0 text-gold-dark" aria-hidden="true" />
            <span>{NEWS_NOTE}</span>
          </p>
        </Reveal>
      </SectionBody>
    </Section>
  )
}