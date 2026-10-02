import { ArrowRight, ChevronDown, PlayCircle } from 'lucide-react'
import type { CSSProperties } from 'react'

import { HERO_STATS, HERO_TOPICS } from '@/data/nursingData'
import Button from './ui/Button'
import { Eyebrow } from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'
import EcgPulse from './ui/EcgPulse'
import { ContactTrigger } from './ui/ContactModal'

/** Entrance stagger, in milliseconds, for the fade-up on load. */
const rise = (delay: number): CSSProperties => ({
  animationDelay: `${delay}ms`,
})

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex flex-col overflow-hidden bg-ink text-white md:min-h-[calc(100svh-3.5rem)] md:scroll-mt-24 lg:min-h-[100svh]"
    >
      {/* Full-bleed patient-care photograph. Kept as an <img> rather than a CSS
          background so phones download a smaller file via srcSet/sizes and
          SmartImage can fall back gracefully if the asset is unavailable. */}
      <SmartImage
        src="/images/hero-patient-care.jpg"
        srcSet="/images/hero-patient-care-sm.jpg 828w, /images/hero-patient-care-md.jpg 1280w, /images/hero-patient-care.jpg 1920w"
        sizes="100vw"
        alt="Nurses and healthcare colleagues caring for patients in a hospital"
        className="absolute inset-0 -z-30 size-full object-cover object-[56%_35%]"
        width={1920}
        height={1280}
        eager
      />

      {/* Black on the left fading to transparent on the right, so the headline
          stays razor sharp while the photograph is still visible. */}
       <div
         aria-hidden="true"
         className="absolute inset-0 -z-20 bg-gradient-to-r from-black via-black/95 to-transparent"
       />
       <div
         aria-hidden="true"
         className="absolute inset-0 -z-30 ecg-grid opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]"
       />
       <EcgPulse animate data-hero-ecg="" className="absolute top-1/4 left-0 right-0 h-24 -z-0 opacity-20" />
       {/* Vertical wash keeps the copy legible on narrow screens and settles the
           stats strip into the bottom edge. */}
       <div
         aria-hidden="true"
         className="absolute inset-0 -z-20 bg-gradient-to-t from-black via-black/50 to-black/70"
       />
       {/* Amber bloom sitting behind the headline. */}
       <div
         aria-hidden="true"
         className="glow-amber pointer-events-none absolute -top-1/4 left-[-10%] -z-10 h-[80vh] w-[70vw] translate-y-[-20%] opacity-80"
       />
        {/* Readout chip — top-right, clear of the eyebrow label on small screens. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-12 z-0 flex items-center gap-1.5 rounded-pill border border-white/10 bg-black/50 px-2 py-0.5 backdrop-blur sm:right-8 sm:top-20 sm:gap-2 sm:px-3 sm:py-1"
        >
          <span className="size-1.5 rounded-full bg-[var(--vital)] pulse-dot sm:size-2" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/70 sm:text-[10px]">HR</span>
          <span className="font-mono text-[11px] tabular-nums bpm-count text-white/90 sm:text-xs" />
          <span className="font-mono text-[9px] text-white/60 sm:text-[10px]">bpm</span>
        </div>
        {/* Thin amber scroll indicator — desktop only, phones use the in-flow hint. */}
        <div
          aria-hidden="true"
          data-hero-scroll-hint=""
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-amber to-transparent animate-[fadeDown_1.8s_ease-in-out_infinite]" />
        </div>

      <div
        data-hero-content=""
        className="container-page relative z-[1] flex flex-1 flex-col justify-center pt-[calc(4rem+12px+env(safe-area-inset-top))] pb-3 md:py-12 lg:py-24"
      >
        <div className="flex max-w-[46rem] flex-col items-start gap-2.5 md:gap-6">
          <Eyebrow className="animate-fade-up" style={rise(60)}>
            Empowering nursing professionals
          </Eyebrow>

      <h1
        className="animate-fade-up font-light text-white [font-size:clamp(30px,8.5vw,44px)] md:[font-size:clamp(48px,9vw,120px)]"
        style={{ ...rise(140), lineHeight: 1.05 }}
      >
        <span className="block">
          Empowering <span className="font-extrabold">Nurses.</span>
        </span>
        <span className="block">
          Advancing <span className="font-extrabold text-amber">Healthcare.</span>
        </span>
      </h1>

          <p
            className="animate-fade-up max-w-[54ch] text-[14px] leading-[1.5] text-white/80 md:text-lg md:leading-relaxed"
            style={rise(220)}
          >
            Discover nursing education, clinical resources, career opportunities and the knowledge
            you need to make a difference in healthcare.
          </p>

           <div
             className="animate-fade-up flex w-full flex-col gap-2 md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-3"
             style={rise(300)}
           >
             <Button
               href="#resources"
               size="lg"
               className="h-12 w-full md:h-auto md:w-auto"
             >
               Explore Nursing
               <ArrowRight className="size-4" aria-hidden="true" />
             </Button>
             <Button
               href="#about"
               size="lg"
               variant="outlineDark"
               className="h-12 w-full md:h-auto md:w-auto"
             >
               <PlayCircle className="size-4" aria-hidden="true" />
               Learn More
             </Button>
             <ContactTrigger className="inline-flex h-12 w-full items-center justify-center rounded-pill border-[1.5px] border-white/30 bg-transparent px-8 font-semibold text-white transition-colors duration-200 hover:border-amber hover:text-amber md:hidden">
               Contact Us
             </ContactTrigger>
           </div>

          {/* Learning areas — a horizontal row of low-contrast pills rather than a
              dot-separated sentence, so the list scans instead of reading. */}
           <div className="animate-fade-up mt-0.5 w-full md:mt-4" style={rise(380)}>
             <h2 className="font-mono text-[10px] font-medium tracking-[0.15em] text-white/50 uppercase md:text-xs">
               Popular learning areas
             </h2>
             <div className="mt-2 overflow-hidden md:mt-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
               <div
                 data-hero-marquee=""
                 className="flex gap-2.5 whitespace-nowrap animate-[marquee_20s_linear_infinite] will-change-transform"
               >
                 {HERO_TOPICS.concat(HERO_TOPICS).map((topic, idx) => (
                   <span
                     key={`${topic}-${idx}`}
                     className="glass-pill shrink-0 px-4 py-1.5 text-[13px] text-white/75 md:py-2 md:text-sm"
                   >
                     {topic}
                   </span>
                 ))}
               </div>
             </div>
           </div>

          {/* Mobile scroll hint — the desktop indicator is absolutely positioned
              and would not fit above the stats strip on a short screen. */}
          <div
            aria-hidden="true"
            data-hero-scroll-hint=""
            className="mt-1 flex items-center gap-1.5 md:hidden"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/60">
              Scroll
            </span>
            <ChevronDown className="hero-chevron size-4 text-amber" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Trust strip — same photograph, anchored to the bottom edge of the hero. */}
      <div className="relative z-[1] shrink-0 border-t border-line bg-black/40 backdrop-blur-[6px]">
        <div className="container-page">
          <dl className="grid grid-cols-4 gap-x-2 gap-y-3 py-3 md:grid-cols-4 md:gap-y-6 md:py-10">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl font-extrabold text-amber md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[10px] leading-[1.3] text-white/70 md:mt-1.5 md:text-sm md:leading-snug">
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
