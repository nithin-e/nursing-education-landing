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
        <div className="lg:sticky lg:top-24 lg:self-start lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 items-start">
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
            <figure className="mt-8 hidden lg:block">
              <div className="media-frame border border-white/10 relative">
                <span aria-hidden className="absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-amber/70" />
                <span aria-hidden className="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-amber/70" />
                <SmartImage
                  src="/images/nurse-training.jpg"
                  srcSet="/images/nurse-training-sm.jpg 600w, /images/nurse-training.jpg 1200w"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  alt="A nursing student practising on a patient manikin in a clinical simulation lab"
                  className="aspect-3/2 w-full [filter:saturate(0.9)_contrast(1.05)]"
                  width={1200}
                  height={768}
                />
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-muted">
                Simulation labs let students rehearse clinical procedures before they reach the ward.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:hidden">
            <figure>
              <div className="media-frame border border-line">
                <SmartImage
                  src="/images/nurse-training.jpg"
                  srcSet="/images/nurse-training-sm.jpg 600w, /images/nurse-training.jpg 1200w"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  alt="A nursing student practising on a patient manikin in a clinical simulation lab"
                  className="aspect-3/2 w-full"
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
          <div className="hidden lg:flex flex-col divide-y divide-line">
            {RESOURCE_CARDS.map((item) => (
              <a
                key={item.title}
                href="#contact"
                className="group relative flex items-center justify-between py-10 px-2 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0 bg-amber transition-all duration-300 group-hover:w-full"
                />
                <div className="relative flex flex-col gap-3">
                  <h3 className="font-display text-4xl leading-tight text-white group-hover:text-ink transition-colors">
                    {item.title}
                  </h3>
                  <p className="max-w-[56ch] text-base text-white/70 group-hover:text-ink/80 transition-colors">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="relative size-6 text-white group-hover:text-ink transition-colors" />
              </a>
            ))}
          </div>
          <div className="lg:hidden" ref={carouselRef}>
            <div className="relative">
              <div className="snap-row -mx-5 px-5" data-carousel>
                {RESOURCE_CARDS.map((item) => (
                  <a
                    key={item.title}
                    href="#contact"
                    className="group block w-[82%] shrink-0 snap-start rounded-card border border-line bg-navy/80 p-5"
                    style={{ maxHeight: '260px' }}
                  >
                    <h3 className="font-display text-xl leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[15px] leading-[1.55] text-white/80">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-amber">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="size-4" />
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
