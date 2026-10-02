import { ArrowRight, Mail } from 'lucide-react'

import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import EcgPulse from './ui/EcgPulse'
import { ContactTrigger } from './ui/ContactModal'

const COMMUNITY_POINTS = [
  'Weekly nursing learning digests',
  'Free clinical checklists and templates',
  'Career and certification guidance',
]

export default function CommunityCTA() {
  return (
    <Section id="community" tone="custom" className="relative isolate overflow-hidden bg-[#FFC107] text-black">
      {/* Large amber bloom behind the heading. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#FFC107]"
      />
      <EcgPulse animate className="absolute inset-x-0 top-0 h-32 -z-0 opacity-40 text-black" />

      <SectionBody>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="Join our nursing community"
            title="Be part of the nursing community"
            emphasis={['community']}
            description="Connect with learning resources, discover opportunities and stay informed about developments in nursing."
            className="text-black [&>h2]:text-black [&>p]:text-black/70 [&>span]:text-black/60"
          />

          <ul className="mt-6 flex flex-col items-center divide-y divide-black/20 sm:flex-row sm:divide-x sm:divide-y-0 sm:gap-0">
            {COMMUNITY_POINTS.map((point) => (
              <li key={point} className="px-6 py-3 text-base text-black sm:py-0">
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="#resources" className="bg-black text-white hover:bg-black/90">
              Explore Resources
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <ContactTrigger className="inline-flex min-h-14 items-center justify-center gap-2 rounded-pill border-[1.5px] border-black bg-transparent px-8 py-4 font-semibold text-black transition-colors duration-200 hover:bg-black/5">
              <Mail className="size-4" aria-hidden="true" />
              Contact Us
            </ContactTrigger>
          </div>
        </Reveal>
      </SectionBody>
    </Section>
  )
}
