import { RESEARCH_CARDS, RESEARCH_METHODS } from '@/data/nursingData'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Research() {
  return (
    <Section id="research" tone="custom" className="section--light bg-[#F5F5F0]">
      <SectionBody className="border-t border-black/10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <SectionHeading
            align="left"
            eyebrow="Research & innovation"
            title="Advancing nursing through research"
            emphasis={['research']}
            description="Learn about evidence-based nursing practice, healthcare innovation and research that supports better patient outcomes."
          />
          <Button href="#news" variant="ghost" className="shrink-0 border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors">
            Read Nursing Insights
          </Button>
        </div>

        <div className="mt-12 flex flex-col divide-y divide-line lg:mt-16">
          {RESEARCH_CARDS.map((item, idx) => (
            <a
              key={item.title}
              href="#news"
              className="group flex items-center justify-between gap-6 py-10"
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-sm text-amber/70 mt-1">0{idx + 1}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-3xl sm:text-4xl">{item.title}</h3>
                  <p className="max-w-[64ch] text-base">{item.description}</p>
                </div>
              </div>
                <span className="text-[var(--accent-on-light)] text-xl transition-transform group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>

        {/* Method strip */}
        <Reveal className="mt-8" delay={0.08}>
          <div className="rounded-card border border-line bg-navy-2 p-6 sm:p-10">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              How research reaches the bedside
            </h3>
            <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-body">
              Good evidence only matters when it can be understood and applied. These are the core
              steps we document for practising nurses.
            </p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {RESEARCH_METHODS.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.label} className="flex gap-4">
                    <Icon
                      className="size-9 shrink-0 text-amber"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        <span className="mr-1.5 font-mono text-amber">0{index + 1}</span>
                        {step.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-body">{step.text}</p>
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
