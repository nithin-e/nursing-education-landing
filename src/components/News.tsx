import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { NEWS_ITEMS, NEWS_NOTE } from '@/data/nursingData'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import NewsCardCinematic from './ui/NewsCardCinematic'

export default function News() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Arrows, counter and progress bar all read from the real scroll position.
  const syncScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
    setProgress(ratio)
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(track.scrollLeft >= maxScroll - 4)

    const slides = Array.from(track.children) as HTMLElement[]
    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let best = Number.POSITIVE_INFINITY
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const distance = Math.abs(center - slideCenter)
      if (distance < best) {
        best = distance
        closest = index
      }
    })
    setActiveIndex(closest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncScroll()
    track.addEventListener('scroll', syncScroll, { passive: true })
    window.addEventListener('resize', syncScroll)
    return () => {
      track.removeEventListener('scroll', syncScroll)
      window.removeEventListener('resize', syncScroll)
    }
  }, [syncScroll])

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.firstElementChild as HTMLElement | null
    const step = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  // Left/right arrows scroll the track when it (or a card inside) has focus.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollBy(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollBy(-1)
    }
  }

  // Drag-to-scroll with the mouse. Native touch swipe is left to the browser.
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    drag.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft }
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    track.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX)
  }
  const onPointerUp = () => {
    drag.current.active = false
  }

  return (
    <Section id="news" tone="custom" className="relative overflow-hidden bg-black">
      <span aria-hidden className="absolute inset-0 z-0 ecg-grid opacity-[0.03]" />
      <span
        aria-hidden
        className="absolute top-0 right-0 z-0 h-[60%] w-[40%] bg-[radial-gradient(ellipse_at_top_right,rgba(255,193,7,0.15),transparent_70%)]"
      />
      <SectionBody className="relative z-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <SectionHeading
            align="left"
            eyebrow="News & updates"
            title="Latest nursing news & insights"
            emphasis={['insights']}
            description="A look at the themes shaping nursing education, patient care and professional events — written for our community."
          />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 font-mono text-sm text-white/70 tabular-nums">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(NEWS_ITEMS.length).padStart(2, '0')}</span>
            </div>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous articles"
              className="grid size-11 place-items-center rounded-full border border-amber/40 text-amber transition-colors duration-200 hover:bg-amber hover:text-black disabled:pointer-events-none disabled:opacity-35 sm:size-12"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next articles"
              className="grid size-11 place-items-center rounded-full border border-amber/40 text-amber transition-colors duration-200 hover:bg-amber hover:text-black disabled:pointer-events-none disabled:opacity-35 sm:size-12"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scroll-snap carousel on every width: the third card deliberately peeks
            on desktop so the arrows always have somewhere to scroll to. */}
        <div
          ref={trackRef}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          tabIndex={0}
          role="region"
          aria-label="Nursing news carousel"
          className="relative z-10 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-16"
          style={{ cursor: 'grab' }}
        >
          {NEWS_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="h-[clamp(360px,50vh,440px)] w-[88%] shrink-0 snap-start sm:w-[78%] md:h-[clamp(420px,60vh,560px)]"
            >
              <NewsCardCinematic
                item={item}
                index={index + 1}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </div>

        <div
          role="progressbar"
          aria-label="Carousel progress"
          aria-valuemin={1}
          aria-valuemax={NEWS_ITEMS.length}
          aria-valuenow={activeIndex + 1}
          className="relative z-10 mt-4 h-[2px] w-full rounded-full bg-white/15"
        >
          <div
            className="h-full rounded-full bg-amber transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <p className="relative z-10 mt-10 flex flex-col gap-3 rounded-card border border-white/10 bg-navy p-5 text-sm leading-relaxed text-[#9CA3AF] sm:flex-row sm:items-start sm:gap-3.5 sm:p-6">
          <Info className="size-5 shrink-0 text-amber" aria-hidden="true" />
          <span>{NEWS_NOTE}</span>
        </p>
      </SectionBody>
    </Section>
  )
}
