import { ArrowRight } from 'lucide-react'

import { RESOURCE_CARDS } from '@/data/nursingData'
import Button from './ui/Button'
import FeatureCardGrid from './ui/FeatureCardGrid'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'

export default function Resources() {
  return (
    <Section id="resources" tone="mist">
      <SectionBody>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal className="min-w-0">
            <SectionHeading
              align="left"
              eyebrow="Featured resources"
              title="Explore nursing resources"
              description="Curated learning material organised around the four pillars of everyday nursing — study, clinical practice, safety and professional growth."
            />
            <div className="mt-6">
              <Button href="#contact" variant="outline">
                Browse the full library
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <figure>
              <div className="media-frame border border-charcoal/10">
                <SmartImage
                  src="/images/nurse-training.jpg"
                  srcSet="/images/nurse-training-sm.jpg 600w, /images/nurse-training.jpg 1200w"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  alt="A nursing student practising on a patient manikin in a clinical simulation lab"
                  className="aspect-3/2 w-full"
                  width={1200}
                  height={768}
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-charcoal/55">
                Simulation labs let students rehearse clinical procedures before they reach the ward.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-10 sm:mt-12">
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