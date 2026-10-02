import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

import { CAREER_TRACKS } from '@/data/nursingData'
import { useRevealChildren } from '@/lib/useReveal'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'
import EcgPulse from './ui/EcgPulse'
import CareerPathMobile from './ui/CareerPathMobile'

export default function Careers() {
  const tracksRef = useRef<HTMLUListElement>(null)
  useRevealChildren(tracksRef)

  return (
    <Section id="careers" tone="soft">
      <SectionBody>
        <SectionHeading
          align="left"
          eyebrow="Nursing careers"
          title="Build your nursing career"
          emphasis={['career']}
          description="Explore nursing specializations, professional growth pathways and opportunities across the healthcare industry."
        />

        <div className="mt-6 grid gap-6 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal className="min-w-0 self-start lg:sticky lg:top-24">
            {/* One figure at every width: `.section-photo` turns it into a
                220px banner on phones, and from md up `media-frame` plus the
                2:3 ratio restores the tall card. The corner ticks come from
                the `.section-photo` pseudo-elements, so none are added here. */}
            <figure className="section-photo media-frame relative overflow-hidden border border-white/10">
              <SmartImage
                src="/images/nurse-careers.jpg"
                sizes="(min-width: 1024px) 26rem, 100vw"
                alt="A smiling nurse in blue scrubs standing in a hospital ward"
                className="w-full [filter:saturate(0.9)_contrast(1.05)] md:aspect-2/3"
                width={800}
                height={1200}
              />
            </figure>
            <CareerPathMobile />
            <blockquote className="mt-6 border-l-2 border-amber pl-5">
              <p className="text-base leading-relaxed text-white/80">
                Nursing is not just a profession — it is a continual commitment to learning, to
                teamwork and to the people in our care.
              </p>
              <footer className="mt-3 font-mono text-xs tracking-[0.15em] text-amber uppercase">
                Our philosophy
              </footer>
            </blockquote>
          </Reveal>

          <div className="min-w-0 relative">
            <div className="absolute left-3 top-0 bottom-0 w-px hidden sm:block lg:block overflow-hidden">
              <EcgPulse animate className="absolute inset-0 h-full opacity-30" />
            </div>
            {/* Mobile: solid amber rail along the left edge. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-4 w-px bg-gradient-to-b from-amber via-amber/60 to-amber/10 sm:hidden"
            />
            <ul ref={tracksRef} data-reveal-group="" data-reveal-stagger="" className="grid gap-6 sm:gap-10">
              {CAREER_TRACKS.map((track) => (
                <li key={track.title} data-fx="timeline" data-reveal="" className="fx-timeline relative pl-9 sm:pl-10">
                  <span
                    aria-hidden="true"
                    className="fx-dot pulse-dot absolute left-4 top-1.5 size-3 rounded-full bg-[var(--vital)] ring-4 ring-ink sm:left-0"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="fx-timeline-title font-display text-2xl leading-tight text-white sm:text-3xl">
                      {track.title}
                    </h3>
                    <p className="max-w-[60ch] text-base text-white/80">{track.description}</p>
                    {track.points && track.points.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {track.points.map((point) => (
                          <li key={point} className="chip">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    <a href="#contact" className="mt-2 inline-flex items-center gap-2 text-amber">
                      View Pathway <ArrowRight className="size-4" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 pl-9 sm:pl-10">
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
