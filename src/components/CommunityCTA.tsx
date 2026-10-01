import { ArrowRight, Mail } from 'lucide-react'

import Button from './ui/Button'
import Reveal from './ui/Reveal'

const COMMUNITY_POINTS = [
  'Weekly nursing learning digests',
  'Free clinical checklists and templates',
  'Career and certification guidance',
]

export default function CommunityCTA() {
  return (
    <section id="community" className="relative scroll-mt-24 overflow-hidden bg-charcoal text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-gold/14 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1px)] [background-size:26px_26px]"
      />

      <div className="container-page relative py-20 sm:py-24">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            Join Our Nursing Community
          </span>

          <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Be Part of the <span className="text-gradient-gold">Nursing Community</span>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-grey sm:text-lg">
            Connect with learning resources, discover opportunities and stay informed about
            developments in nursing.
          </p>

          <ul className="mt-1 flex flex-col gap-2.5 text-sm text-paper/80 sm:flex-row sm:gap-6">
            {COMMUNITY_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button href="#resources" size="lg">
              Explore Resources
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="#contact" size="lg" variant="outlineDark">
              <Mail className="size-4" aria-hidden="true" />
              Contact Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}