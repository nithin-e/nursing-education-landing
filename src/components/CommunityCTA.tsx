import { ArrowRight, Mail } from 'lucide-react'

import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'

const COMMUNITY_POINTS = [
  'Weekly nursing learning digests',
  'Free clinical checklists and templates',
  'Career and certification guidance',
]

export default function CommunityCTA() {
  return (
    <Section id="community" tone="dark" className="border-y border-charcoal-line bg-charcoal">
      <SectionBody>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2.5 text-[0.8rem] font-semibold text-gold">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-current opacity-70" />
            Join our nursing community
          </p>

          <h2 className="text-[1.6rem] leading-tight sm:text-[2rem] lg:text-[2.35rem]">
            Be part of the nursing community
          </h2>

          <p className="max-w-[58ch] text-[0.95rem] leading-relaxed text-grey sm:text-base">
            Connect with learning resources, discover opportunities and stay informed about
            developments in nursing.
          </p>

          <ul className="flex flex-col gap-1.5 text-sm text-paper/80 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
            {COMMUNITY_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button href="#resources">
              Explore Resources
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="outlineDark">
              <Mail className="size-4" aria-hidden="true" />
              Contact Us
            </Button>
          </div>
        </Reveal>
      </SectionBody>
    </Section>
  )
}