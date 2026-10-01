import { Info } from 'lucide-react'

import { EXAM_CARDS, EXAM_DISCLAIMER } from '@/data/nursingData'
import FeatureCardGrid from './ui/FeatureCardGrid'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Exams() {
  return (
    <Section id="exams" tone="dark" className="py-20 sm:py-28">
      <SectionBody>
        <SectionHeading
          tone="dark"
          eyebrow="Exams & Certifications"
          title="Nursing Exams & Certifications"
          description="Discover information about nursing examinations, licensing pathways and professional certifications."
        />

        <Reveal className="mt-12">
          <FeatureCardGrid items={EXAM_CARDS} tone="dark" columns={3} linkLabel="Learn More" />
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <p className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-charcoal-soft/60 p-5 text-sm leading-relaxed text-grey sm:flex-row sm:items-start sm:gap-4">
            <Info className="size-5 shrink-0 text-gold" aria-hidden="true" />
            <span>{EXAM_DISCLAIMER}</span>
          </p>
        </Reveal>
      </SectionBody>
    </Section>
  )
}