import { RESEARCH_CARDS, RESEARCH_METHODS } from '@/data/nursingData'
import Button from './ui/Button'
import FeatureCardGrid from './ui/FeatureCardGrid'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Research() {
  return (
    <Section id="research" tone="mist">
      <SectionBody>
        <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <SectionHeading
            align="left"
            eyebrow="Research & innovation"
            title="Advancing nursing through research"
            description="Learn about evidence-based nursing practice, healthcare innovation and research that supports better patient outcomes."
          />
          <Button href="#news" variant="outline" className="shrink-0">
            Read Nursing Insights
          </Button>
        </div>

        <Reveal className="mt-8 sm:mt-10">
          <FeatureCardGrid
            items={RESEARCH_CARDS}
            tone="light"
            columns={3}
            linkHref="#news"
            linkLabel="Learn More"
          />
        </Reveal>

        {/* Method strip */}
        <Reveal className="mt-8 sm:mt-10" delay={0.08}>
          <div className="rounded-lg border border-charcoal/10 bg-paper p-5 sm:p-8">
            <h3 className="text-lg text-charcoal">How research reaches the bedside</h3>
            <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-charcoal/70">
              Good evidence only matters when it can be understood and applied. These are the core
              steps we document for practising nurses.
            </p>
            <ol className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {RESEARCH_METHODS.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.label} className="flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-mist text-gold-dark">
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