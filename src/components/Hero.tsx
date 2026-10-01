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
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden bg-ink text-paper">
      {/* Ambient decorative layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[32rem] rounded-full bg-gold/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-40 size-[26rem] rounded-full bg-gold/8 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
          {/* Copy */}
          <div className="flex flex-col items-start gap-7">
            <motion.span
              {...rise(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
              Empowering Nursing Professionals
            </motion.span>

            <motion.h1
              {...rise(0.12)}
              className="text-4xl leading-[1.08] font-bold text-paper sm:text-5xl lg:text-6xl"
            >
              Empowering Nurses.
              <br />
              <span className="text-gradient-gold">Advancing Healthcare.</span>
            </motion.h1>

            <motion.p
              {...rise(0.2)}
              className="max-w-xl text-base leading-relaxed text-grey sm:text-lg"
            >
              Discover nursing education, clinical resources, career opportunities and the knowledge
              you need to make a difference in healthcare.
            </motion.p>

            <motion.div {...rise(0.28)} className="flex flex-wrap items-center gap-3">
              <Button href="#resources" size="lg">
                Explore Nursing
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#about" size="lg" variant="outlineDark">
                <PlayCircle className="size-4" aria-hidden="true" />
                Learn More
              </Button>
            </motion.div>

            {/* Topic marquee */}
            <motion.div {...rise(0.36)} className="w-full">
              <h2 className="text-[0.65rem] font-semibold tracking-[0.22em] text-grey/70 uppercase">
                Popular learning areas
              </h2>
              <div className="relative mt-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <ul className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-3 hover:[animation-play-state:paused]">
                  {[...HERO_TOPICS, ...HERO_TOPICS].map((topic, index) => (
                    <li
                      key={`${topic}-${index}`}
                      className="rounded-full border border-white/12 bg-white/4 px-4 py-1.5 text-xs font-medium whitespace-nowrap text-paper/75"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Image panel */}
          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.95, x: 24 },
                  animate: { opacity: 1, scale: 1, x: 0 },
                  transition: { duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] as const },
                })}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.5rem] border border-gold/25 lg:-inset-8"
            />
            <div
              aria-hidden="true"
              className="absolute -top-8 -right-4 size-28 rounded-full bg-gold/90 lg:-right-10"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-charcoal">
              <SmartImage
                src="/images/hero-team.svg"
                alt="Illustration of a nursing team in clinical settings"
                className="aspect-4/5 w-full object-cover"
                width={800}
                height={1000}
                eager
              />
            </div>

            {/* Floating credential card */}
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-charcoal/95 px-4 py-3 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur sm:left-8">
              <span className="grid size-10 place-items-center rounded-xl bg-gold font-display text-sm font-bold text-ink">
                RN
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-paper">Nursing Insights</p>
                <p className="text-xs text-grey">Learning · Practice · Growth</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-white/10">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="px-1 py-7 sm:px-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-gold sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-grey sm:text-sm">
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