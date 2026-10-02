import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

import { ABOUT_PILLARS } from '@/data/nursingData'
import { useRevealChildren } from '@/lib/useReveal'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'
import EcgPulse from './ui/EcgPulse'
import { ContactTrigger } from './ui/ContactModal'

/**
 * Mobile-only closing banner for the About band.
 *
 * Reuses the same asset as the desktop figure rather than shipping a second
 * image, and deliberately does not use `SmartImage`: that component falls back
 * to a placeholder and then to a text tile, both of which would leave a filled
 * box behind. Here a failed load unmounts the wrapper entirely, so the section
 * simply ends on its ECG line and padding instead of on an empty frame.
 */
function AboutBanner() {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <div className="section-photo about-banner md:hidden">
      <img
        src="/images/nurse-about-ward.jpg"
        srcSet="/images/nurse-about-ward-sm.jpg 600w, /images/nurse-about-ward.jpg 1200w"
        sizes="100vw"
        alt="A group of nurses in scrubs talking together on a hospital ward"
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export default function About() {
  const pillarsRef = useRef<HTMLDivElement>(null)
  useRevealChildren(pillarsRef)

  return (
    <Section id="about" tone="black">
      <SectionBody>
        {/* Amber bloom behind the heading, mobile only — the desktop layout gets
            its warmth from the photograph instead. Absolutely positioned, so it
            never adds height to the band. */}
        <span aria-hidden="true" className="section-heading-glow md:hidden" />

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
              {/* The photo is wrapped so the tilted amber outline hugs the image
                  itself instead of the whole figure — anchored to the figure it
                  reached down across the caption. Stacking is explicit and
                  layered: outline 0, photo 1, caption 2. Desktop only, the
                  outline costs width on phones. */}
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 z-0 hidden rotate-6 border-2 border-amber/40 md:block md:-inset-10"
                />

                <div className="media-frame relative z-[1] hidden overflow-hidden border border-white/10 md:block">
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
              </div>

              {/* Mobile gets its photograph as a banner at the very end of the
                  section instead — see `AboutBanner` below. Putting it here,
                  under the heading, left the tail of the band after "Our
                  Commitment" holding nothing but the ECG hairline and padding,
                  which read as ~120px of dead black. */}

              <blockquote className="mt-0 border-l-2 border-amber pl-4 md:hidden">
                <p className="text-[16px] leading-[1.55] text-white/85">
                  Nursing is a team practice — every shift depends on colleagues who share the load.
                </p>
              </blockquote>

              {/* Caption sits in normal flow directly under the photo — no text
                  is placed over the image any more. z-2 keeps it above the
                  tilted outline; mb-16 clears the outline's rotated bottom
                  corners before the Mission row starts. */}
              <figcaption className="relative z-[2] mt-4 mb-16 hidden max-w-full text-[14px] leading-relaxed text-muted md:block">
                Nursing is a team practice — every shift depends on colleagues who share the load.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* `lg:mt-0` because the caption now carries the 64px of clearance via
            `mb-16`; stacking both would open a 128px hole above Mission. Mobile
            keeps its original `mt-8`. */}
        <div
          ref={pillarsRef}
          data-reveal-group=""
          data-reveal-stagger=""
          className="mt-8 flex flex-col lg:mt-0"
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
                  {/* Mobile: small mono number in amber. Desktop: the huge ghost numeral.
                      Ghost sits at z-0 and the readable number at z-1, so the
                      numeral is always the one behind the text. */}
                  <div className="relative flex items-center justify-start">
                    <span className="relative z-0 hidden font-display text-9xl font-extrabold tracking-tight text-white/5 lg:block">
                      {num}
                    </span>
                    <span className="z-1 font-mono text-sm tabular-nums text-amber lg:absolute lg:left-2 lg:top-1/2 lg:-translate-y-1/2 lg:text-xs lg:tracking-[0.2em] lg:text-white/40">
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

        {/* Pulse line closing the band, so the section ends on content rather
            than on empty space. */}
        <EcgPulse animate={false} className="section-ecg mt-4 md:hidden" />

        {/* Photograph closes the band below the ECG line: 220px tall, full
            width, 24px above and nothing below, so the section then ends on
            its own 56px bottom padding. */}
        <Reveal y={16}>
          <AboutBanner />
        </Reveal>
      </SectionBody>
    </Section>
  )
}
