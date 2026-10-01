import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'

import { HERO_STATS, HERO_TOPICS } from '@/data/nursingData'
import Button from './ui/Button'
import SmartImage from './ui/SmartImage'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="home" className="relative isolate scroll-mt-20 overflow-hidden bg-ink text-paper">
      {/* Full-bleed patient-care photograph. Kept as an <img> rather than a CSS
          background so phones download a smaller file via srcSet/sizes and
          SmartImage can fall back gracefully if the asset is unavailable.
          `object-cover` + `object-position` are the modern equivalent of
          background-size: cover / background-position. On phones the horizontal
          axis is the one that crops, so 56% keeps the nurse and patients framed;
          on desktop the full width shows and only the vertical 35% matters. */}
      <SmartImage
        src="/images/hero-patient-care.jpg"
        srcSet="/images/hero-patient-care-sm.jpg 828w, /images/hero-patient-care-md.jpg 1280w, /images/hero-patient-care.jpg 1920w"
        sizes="100vw"
        alt="Nurses and healthcare colleagues caring for patients in a hospital"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[56%_35%]"
        width={1920}
        height={1280}
        eager
      />

      {/* Flat black scrim at 70%. Measured against this photograph's highlights
          (p99 = 232, peak = 255) so every region keeps body and small text at or
          above WCAG AA contrast while the picture stays readable. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />

      {/* Copy — left aligned over the photograph and capped to a readable measure so
          the right-hand side of the image is never covered by text. */}
      <div className="container-page relative">
        <div className="flex max-w-[44rem] flex-col items-start gap-4 py-10 sm:gap-5 sm:py-16 lg:py-24">
          <motion.p
            {...rise(0.05)}
            className="flex items-center gap-2.5 text-[0.8rem] font-semibold text-gold"
          >
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-current opacity-70" />
            Empowering nursing professionals
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="text-[1.6rem] leading-[1.18] font-bold text-paper sm:text-[2.4rem] lg:text-[3rem]"
          >
            <span className="block">Empowering Nurses.</span>
            <span className="block text-gold">Advancing Healthcare.</span>
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="max-w-[54ch] text-[0.95rem] leading-relaxed text-paper/80 sm:text-base"
          >
            Discover nursing education, clinical resources, career opportunities and the knowledge
            you need to make a difference in healthcare.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-1 flex flex-wrap items-center gap-3">
            <Button href="#resources" size="lg">
              Explore Nursing
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="#about" size="lg" variant="outlineDark">
              <PlayCircle className="size-4" aria-hidden="true" />
              Learn More
            </Button>
          </motion.div>

          {/* Learning areas — compact inline list rather than a ticker competing with
              the headline for attention. */}
          <motion.div {...rise(0.34)} className="mt-2 w-full">
            <h2 className="text-[0.8rem] font-medium text-paper/75">Popular learning areas</h2>
            <p className="mt-1.5 max-w-[58ch] text-sm leading-relaxed text-paper/75">
              {HERO_TOPICS.join(' · ')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Trust strip — sits on the same photograph so the hero reads as one full-bleed
          band rather than an image with a detached caption block. */}
      <div className="relative border-t border-white/15">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:grid-cols-4 sm:py-7">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl font-bold text-gold sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-paper/80 sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
