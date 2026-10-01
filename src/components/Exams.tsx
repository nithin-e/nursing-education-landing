import { Info } from 'lucide-react'

import { EXAM_CARDS, EXAM_DISCLAIMER } from '@/data/nursingData'
import FeatureCardGrid from './ui/FeatureCardGrid'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Exams() {
  return (
    <Section id="exams" tone="dark">
      <SectionBody>
        <SectionHeading
          tone="dark"
          align="left"
          eyebrow="Exams & certifications"
          title="Nursing exams & certifications"
          description="Discover information about nursing examinations, licensing pathways and professional certifications."
        />

        <Reveal className="mt-8 sm:mt-10">
          <FeatureCardGrid items={EXAM_CARDS} tone="dark" columns={3} linkLabel="Learn More" />
        </Reveal>

        <Reveal className="mt-8" delay={0.08}>
          <p className="flex flex-col gap-2.5 rounded-lg border border-white/10 bg-charcoal-soft/60 p-4 text-sm leading-relaxed text-grey sm:flex-row sm:items-start sm:gap-3.5 sm:p-5">
            <Info className="size-5 shrink-0 text-gold" aria-hidden="true" />
            <span>{EXAM_DISCLAIMER}</span>
          </p>
        </Reveal>
      </SectionBody>
    </Section>
  )
}