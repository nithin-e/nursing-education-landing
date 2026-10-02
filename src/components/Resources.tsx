import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { RESOURCE_CARDS } from '@/data/nursingData'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'

export default function Resources() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const dots = Array.from(el.querySelectorAll('[data-dot]'))
    const slides = Array.from(el.querySelectorAll('[data-carousel] > a'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = slides.indexOf(entry.target as HTMLElement)
          if (idx >= 0 && entry.isIntersecting) {
            dots.forEach((d, di) => d.classList.toggle('bg-amber', di === idx))
            dots.forEach((d, di) => d.classList.toggle('bg-white/20', di !== idx))
          }
        })
      },
      { root: el.querySelector('[data-carousel]'), threshold: 0.6 }
    )
    slides.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <Section id="resources" tone="soft">
      <SectionBody>
        <div className="relative z-[2] items-start lg:sticky lg:top-24 lg:mb-6 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal className="min-w-0">
            <SectionHeading
              align="left"
              eyebrow="Featured resources"
              title="Explore nursing resources"
              emphasis={['resources']}
              description="Curated learning material organised around the four pillars of everyday nursing — study, clinical practice, safety and professional growth."
            />
            <div className="mt-8">
              <Button href="#contact" variant="outline">
                Browse the full library
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            {/* One figure at every width. The photo itself is cropped by
                `.section-photo`; the caption stays outside it so the fixed
                height never clips the text. */}
            <figure className="mt-8">
              <div className="section-photo media-frame relative overflow-hidden border border-white/10">
                <SmartImage
                  src="/images/nurse-training.jpg"
                  srcSet="/images/nurse-training-sm.jpg 600w, /images/nurse-training.jpg 1200w"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  alt="A nursing student practising on a patient manikin in a clinical simulation lab"
                  className="w-full [filter:saturate(0.9)_contrast(1.05)] md:aspect-3/2"
                  width={1200}
                  height={768}
                />
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-muted">
                Simulation labs let students rehearse clinical procedures before they reach the ward.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Desktop: full-width rows; Mobile: horizontal scroll-snap with peek and progress */}
        <div className="mt-12 lg:mt-0 lg:col-start-2 lg:row-start-1">
          {/* Rows carry their own stacking context (`fx-row`) so the amber fill
              is clipped to the row and can never wash over the "Browse the full
              library" button in the sticky column to the left. */}
          <div className="hidden flex-col divide-y divide-line lg:flex">
            {RESOURCE_CARDS.map((item) => (
              <a
                key={item.title}
                href="#contact"
                data-fx="row"
                className="fx-row group flex items-center justify-between py-10 px-2 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="fx-row-fill pointer-events-none absolute inset-y-0 left-0 w-0 bg-amber transition-all duration-300 group-hover:w-full"
                />
                <div className="relative flex flex-col gap-3">
                  <h3 className="fx-row-title font-display text-4xl leading-tight text-white transition-colors group-hover:text-ink">
                    {item.title}
                  </h3>
                  <p className="fx-row-copy max-w-[56ch] text-base text-white/70 transition-colors group-hover:text-ink/80">
                    {item.description}
                  </p>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="fx-row-arrow relative size-6 shrink-0 text-white transition-colors group-hover:text-ink"
                />
              </a>
            ))}
          </div>
          {/* On a phone the rows above do not render, so the snap carousel is
              where the Nursing Resources effect has to land. */}
          <div className="lg:hidden" ref={carouselRef}>
            <div className="relative">
              <div className="snap-row -mx-5 px-5" data-carousel>
                {RESOURCE_CARDS.map((item) => (
                  <a
                    key={item.title}
                    href="#contact"
                    data-fx="row"
                    className="fx-row group block w-[82%] shrink-0 snap-start rounded-card border border-line bg-navy/80 p-5"
                    style={{ maxHeight: '260px' }}
                  >
                    {/* The fill sits behind the text, which is why every child
                        below is `relative` — a static block would paint under an
                        absolutely positioned sibling. */}
                    <span
                      aria-hidden="true"
                      className="fx-row-fill pointer-events-none absolute inset-0 bg-amber"
                    />
                    <h3 className="fx-row-title relative font-display text-xl leading-tight text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="fx-row-copy relative mt-2 line-clamp-3 text-[15px] leading-[1.55] text-white/80 transition-colors">
                      {item.description}
                    </p>
                    <div className="fx-row-arrow relative mt-4 flex items-center gap-2 text-amber transition-colors">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                {RESOURCE_CARDS.map((_, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full bg-white/20 transition-colors"
                    data-dot
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  )
}
