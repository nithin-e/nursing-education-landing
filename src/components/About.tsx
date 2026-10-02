import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

import { ABOUT_PILLARS } from '@/data/nursingData'
import { useRevealChildren } from '@/lib/useReveal'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'
import EcgPulse from './ui/EcgPulse'
import { ContactTrigger } from './ui/ContactModal'

export default function About() {
  const pillarsRef = useRef<HTMLDivElement>(null)
  useRevealChildren(pillarsRef)

  return (
    <Section id="about" tone="black">
      <SectionBody>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal className="min-w-0">
            <SectionHeading
              align="left"
              eyebrow="About us"
              title="Supporting the future of nursing"
              emphasis={['nursing']}
              description="Explore a platform dedicated to nursing education, professional development, clinical excellence and advancing quality patient care."
              className="lg:pr-8"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#resources">
                Explore Resources
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <ContactTrigger className="inline-flex min-h-14 items-center justify-center rounded-pill border border-line-strong px-8 py-4 font-semibold text-white transition-colors duration-200 hover:border-amber hover:text-amber">
                Contact Us
              </ContactTrigger>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-w-0 lg:-mr-16">
            <figure className="relative">
              {/* Tilted amber outline shape — desktop only, it costs width on phones. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 hidden rotate-6 border-2 border-amber/40 sm:block sm:-inset-10"
              />

              {/* Mobile: a compact 200px banner with the pulse line behind it. */}
              <div className="relative mb-5 block h-[200px] w-full overflow-hidden rounded-media border border-white/10 bg-navy sm:hidden">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 opacity-30"
                >
                  <EcgPulse animate={false} className="h-full w-full" />
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,193,7,0.28),transparent_70%)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 z-[1] grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] border-amber/50"
                >
                  <span aria-hidden="true" className="absolute h-[3px] w-10 rounded-full bg-amber" />
                  <span aria-hidden="true" className="absolute h-10 w-[3px] rounded-full bg-amber" />
                </span>
              </div>

              <div className="media-frame relative hidden overflow-hidden border border-white/10 sm:block">
                <span aria-hidden className="absolute left-4 top-4 z-[1] h-6 w-6 border-l-2 border-t-2 border-amber/70" />
                <span aria-hidden className="absolute bottom-4 right-4 z-[1] h-6 w-6 border-r-2 border-b-2 border-amber/70" />
                <SmartImage
                  src="/images/nurse-about-ward.jpg"
                  srcSet="/images/nurse-about-ward-sm.jpg 600w, /images/nurse-about-ward.jpg 1200w"
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  alt="A group of nurses in scrubs talking together on a hospital ward"
                  className="aspect-4/3 w-full [filter:saturate(0.9)_contrast(1.05)]"
                  width={1200}
                  height={900}
                />
              </div>

              <blockquote className="mt-0 border-l-2 border-amber pl-4 sm:hidden">
                <p className="text-[16px] leading-[1.55] text-white/85">
                  Nursing is a team practice — every shift depends on colleagues who share the load.
                </p>
              </blockquote>

              <figcaption className="mt-5 hidden max-w-[46ch] text-sm leading-relaxed text-muted sm:block">
                Nursing is a team practice — every shift depends on colleagues who share the load.
              </figcaption>
            </figure>
            {/* Heading overlapping image on desktop */}
            <h2
              className="absolute -bottom-16 -left-4 hidden font-display text-white lg:block"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05 }}
            >
              Supporting the <span className="font-extrabold text-amber">future</span> of nursing
            </h2>
          </Reveal>
        </div>

        <div
          ref={pillarsRef}
          data-reveal-group=""
          data-reveal-stagger=""
          className="mt-8 flex flex-col lg:mt-16"
        >
          {ABOUT_PILLARS.map((pillar, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            return (
              <div
                key={pillar.title}
                data-reveal=""
                className="group border-t border-line first:border-t-0"
              >
                <div className="grid items-start gap-5 py-6 lg:grid-cols-[160px_1fr] lg:items-center lg:gap-12 lg:py-10">
                  {/* Mobile: small mono number in amber. Desktop: the huge ghost numeral. */}
                  <div className="relative flex items-center justify-start">
                    <span className="hidden font-display text-9xl font-extrabold tracking-tight text-white/5 lg:block">
                      {num}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-amber lg:absolute lg:left-2 lg:top-1/2 lg:-translate-y-1/2 lg:text-xs lg:tracking-[0.2em] lg:text-white/40">
                      {num}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-[22px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                      {pillar.title}
                    </h3>
                    <p className="max-w-[70ch] text-[15px] leading-[1.55] text-white/80 sm:text-base sm:leading-relaxed">
                      {pillar.description}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {pillar.points.map((point) => (
                        <li key={point} className="chip">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="h-px w-full bg-line" />
              </div>
            )
          })}
        </div>
      </SectionBody>
    </Section>
  )
}
