import { ArrowRight, Quote } from 'lucide-react'

import { CAREER_TRACKS } from '@/data/nursingData'
import Button from './ui/Button'
import FeatureCardItem from './ui/FeatureCardItem'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'

export default function Careers() {
  return (
    <Section id="careers" tone="light" className="py-20 sm:py-28">
      <SectionBody>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image side */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gold/20 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-charcoal/10">
                <SmartImage
                  src="/images/careers-nurse.svg"
                  alt="Illustration of a nurse walking through a hospital corridor"
                  className="aspect-9/7 w-full object-cover"
                  width={900}
                  height={700}
                />
              </div>
              <figure className="relative mt-6 rounded-2xl border border-charcoal/10 bg-mist p-6">
                <Quote className="size-6 text-gold" aria-hidden="true" />
                <blockquote className="mt-3 text-sm leading-relaxed text-charcoal/80">
                  Nursing is not just a profession — it is a continual commitment to learning,
                  to teamwork and to the people in our care.
                </blockquote>
                <figcaption className="mt-3 text-xs font-semibold tracking-[0.16em] text-charcoal/50 uppercase">
                  Our philosophy
                </figcaption>
              </figure>
            </div>
          </Reveal>

          {/* Copy side */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Nursing Careers"
              title="Build Your Nursing Career"
              description="Explore nursing specializations, professional growth pathways and opportunities across the healthcare industry."
            />

            <ul className="mt-10 grid gap-5">
              {CAREER_TRACKS.map((track, index) => (
                <Reveal as="li" key={track.title} delay={index * 0.08}>
                  <FeatureCardItem
                    card={track}
                    tone="light"
                    linkHref="#contact"
                    linkLabel="View Pathway"
                  />
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.28} className="mt-9 flex flex-wrap gap-3">
              <Button href="#contact">
                Start Your Journey
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#exams" variant="outline">
                Explore Certifications
              </Button>
            </Reveal>
          </div>
        </div>
      </SectionBody>
    </Section>
  )
}