import { RESOURCE_CARDS } from '@/data/nursingData'
import FeatureCardGrid from './ui/FeatureCardGrid'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Resources() {
  return (
    <Section id="resources" tone="mist" className="py-20 sm:py-28">
      <SectionBody>
        <SectionHeading
          eyebrow="Featured Resources"
          title="Explore Nursing Resources"
          description="Curated learning material organised around the four pillars of everyday nursing — study, clinical practice, safety and professional growth."
        />

        <Reveal className="mt-12">
          <FeatureCardGrid
            items={RESOURCE_CARDS}
            tone="light"
            columns={4}
            linkHref="#contact"
            linkLabel="Explore More"
          />
        </Reveal>
      </SectionBody>
    </Section>
  )
}