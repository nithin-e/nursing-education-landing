import { ArrowRight } from 'lucide-react'

import { ABOUT_PILLARS } from '@/data/nursingData'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'

export default function About() {
  return (
    <Section id="about" tone="light">
      <SectionBody>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal className="min-w-0">
            <SectionHeading
              align="left"
              eyebrow="About us"
              title="Supporting the future of nursing"
              description="Explore a platform dedicated to nursing education, professional development, clinical excellence and advancing quality patient care."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#resources">
                Explore Resources
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <figure>
              <div className="media-frame border border-charcoal/10">
                <SmartImage
                  src="/images/nurse-about-ward.jpg"
                  srcSet="/images/nurse-about-ward-sm.jpg 600w, /images/nurse-about-ward.jpg 1200w"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  alt="A group of nurses in scrubs talking together on a hospital ward"
                  className="aspect-4/3 w-full"
                  width={1200}
                  height={900}
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-charcoal/55">
                Nursing is a team practice — every shift depends on colleagues who share the load.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {ABOUT_PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <li key={pillar.title}>
                <article className="flex h-full flex-col gap-3 rounded-lg border border-charcoal/10 bg-paper p-5 transition-colors duration-200 hover:border-charcoal/30 sm:p-6">
                  <span className="grid size-10 place-items-center rounded-lg bg-mist text-gold-dark">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg text-charcoal">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{pillar.description}</p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-md bg-mist px-2 py-0.5 text-xs font-medium text-charcoal/65"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            )
          })}
        </ul>
      </SectionBody>
    </Section>
  )
}