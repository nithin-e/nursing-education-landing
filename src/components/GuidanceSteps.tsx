import {
  GUIDANCE_HEADING_EMPHASIS,
  GUIDANCE_HEADING_LEAD,
  GUIDANCE_LABEL,
  GUIDANCE_STEPS,
  GUIDANCE_TEXT,
} from '@/data/guidance'
import Section from './ui/Section'
import { SectionLabel } from './ui/SectionHeading'

/**
 * How the site helps, in four steps.
 *
 * Stands in for the team section while `SHOW_TEAM` is false, and occupies the
 * same place in the page order with the same black background and vertical
 * rhythm, so nothing shifts when real bios arrive. It carries no people and no
 * photographs of people.
 *
 * An ordered list, because the steps are a sequence. The only motion is the
 * shared `data-fade` reveal every other block uses.
 */
export default function GuidanceSteps() {
  return (
    <Section id="guidance">
      <div className="mx-auto max-w-2xl text-center" data-fade="">
        <div className="flex justify-center">
          <SectionLabel>{GUIDANCE_LABEL}</SectionLabel>
        </div>

        <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] leading-[1.15] font-light text-white">
          {GUIDANCE_HEADING_LEAD}{' '}
          <span className="font-extrabold">{GUIDANCE_HEADING_EMPHASIS}</span>
        </h2>

        <p className="mt-3 text-[15px] leading-relaxed text-[#D1D5DB]">{GUIDANCE_TEXT}</p>
      </div>

      {/* One column on phones; four from 769px, the breakpoint the rest of the
          page uses for desktop. */}
      <ol className="mt-12 grid gap-3.5 min-[769px]:grid-cols-4 min-[769px]:gap-6">
        {GUIDANCE_STEPS.map((step) => (
          <li
            key={step.number}
            data-fade=""
            className="rounded-card bg-slate-deep p-[22px] min-[769px]:p-8"
          >
            <span className="font-display block text-[48px] leading-none font-bold text-amber">
              {step.number}
            </span>

            <h3 className="mt-4 font-display text-[22px] font-bold text-white">{step.title}</h3>

            <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}