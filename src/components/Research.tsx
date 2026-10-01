import { RESEARCH_CARDS, RESEARCH_METHODS } from '@/data/nursingData'
import Button from './ui/Button'
import FeatureCardGrid from './ui/FeatureCardGrid'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Research() {
  return (
    <Section id="research" tone="mist" className="py-20 sm:py-28">
      <SectionBody>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Research & Innovation"
            title="Advancing Nursing Through Research"
            description="Learn about evidence-based nursing practice, healthcare innovation and research that supports better patient outcomes."
          />
          <Reveal delay={0.1} className="lg:justify-self-end">
            <Button href="#news" variant="outline">
              Read Nursing Insights
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <FeatureCardGrid
            items={RESEARCH_CARDS}
            tone="light"
            columns={3}
            linkHref="#news"
            linkLabel="Learn More"
          />
        </Reveal>

        {/* Method strip */}
        <Reveal delay={0.12} className="mt-12">
          <div className="rounded-2xl border border-charcoal/10 bg-paper p-7 sm:p-9">
            <h3 className="text-lg text-charcoal">How research reaches the bedside</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal/70">
              Good evidence only matters when it can be understood and applied. These are the core
              steps we document for practising nurses.
            </p>
            <ol className="mt-7 grid gap-6 sm:grid-cols-3">
              {RESEARCH_METHODS.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.label} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-charcoal text-gold">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">
                        <span className="mr-1.5 font-display text-gold-dark">0{index + 1}</span>
                        {step.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{step.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </Reveal>
      </SectionBody>
    </Section>
  )
}