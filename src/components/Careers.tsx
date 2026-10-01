import { ArrowRight } from 'lucide-react'

import { CAREER_TRACKS } from '@/data/nursingData'
import Button from './ui/Button'
import FeatureCardItem from './ui/FeatureCardItem'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'

export default function Careers() {
  return (
    <Section id="careers" tone="light">
      <SectionBody>
        <SectionHeading
          align="left"
          eyebrow="Nursing careers"
          title="Build your nursing career"
          description="Explore nursing specializations, professional growth pathways and opportunities across the healthcare industry."
        />

        <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-[0.72fr_1.28fr] sm:gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Photography + pull quote */}
          <Reveal className="min-w-0 self-start">
            <figure>
              <div className="media-frame border border-charcoal/10">
                <SmartImage
                  src="/images/nurse-careers.jpg"
                  srcSet="/images/nurse-careers-sm.jpg 400w, /images/nurse-careers.jpg 800w"
                  sizes="(min-width: 1024px) 26rem, 60vw"
                  alt="A smiling nurse in blue scrubs standing in a hospital ward"
                  className="aspect-2/3 w-full"
                  width={800}
                  height={1200}
                />
              </div>
            </figure>
            <blockquote className="mt-5 border-l-2 border-gold pl-4">
              <p className="text-sm leading-relaxed text-charcoal/75">
                Nursing is not just a profession — it is a continual commitment to learning, to
                teamwork and to the people in our care.
              </p>
              <footer className="mt-2 text-xs font-semibold text-charcoal/50">Our philosophy</footer>
            </blockquote>
          </Reveal>

          {/* Career tracks */}
          <div className="min-w-0">
            <ul className="grid gap-4 sm:gap-5">
              {CAREER_TRACKS.map((track) => (
                <li key={track.title}>
                  <FeatureCardItem card={track} tone="light" linkHref="#contact" linkLabel="View Pathway" />
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#contact">
                Start Your Journey
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#exams" variant="outline">
                Explore Certifications
              </Button>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  )
}