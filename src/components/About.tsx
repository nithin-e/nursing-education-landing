import { ArrowRight } from 'lucide-react'

import { ABOUT_PILLARS } from '@/data/nursingData'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  return (
    <Section id="about" tone="light" className="py-20 sm:py-28">
      <SectionBody>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="About Us"
              title="Supporting the Future of Nursing"
              description="Explore a platform dedicated to nursing education, professional development, clinical excellence and advancing quality patient care."
              align="left"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#resources">
                Explore Resources
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2">
            {ABOUT_PILLARS.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Reveal
                  as="li"
                  key={pillar.title}
                  delay={index * 0.08}
                  className={index === 0 ? 'sm:col-span-2' : ''}
                >
                  <article className="group flex h-full flex-col gap-4 rounded-2xl border border-charcoal/10 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_60px_-34px_rgba(17,18,26,0.55)]">
                    <span className="grid size-13 place-items-center rounded-xl bg-charcoal text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl text-charcoal">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-charcoal/70">{pillar.description}</p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-charcoal/70"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </SectionBody>
    </Section>
  )
}