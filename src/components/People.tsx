import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, MapPin, MessageCircle } from 'lucide-react'

import { getImageFallbacks, resolvePhoto } from '@/data/images'
import { PEOPLE } from '@/data/people'
import type { Person } from '@/data/people'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import ConnectModal from './ui/ConnectModal'
import ErrorBoundary from './ui/ErrorBoundary'

const GAP = 20
const INTERVAL = 3500
const RESUME_DELAY = 2000

/**
 * One crop per card. Two cards share a photograph, so identical positions would
 * make the pair look like a duplicated image.
 */
const OBJECT_POSITIONS = ['30% 25%', '60% 30%', '50% 45%', '40% 60%', '70% 35%', '25% 55%']

type CardProps = {
  person: Person
  index: number
  onMessage: (person: Person, trigger: HTMLButtonElement | null) => void
}

function PersonCard({ person, index, onMessage }: CardProps) {
  const [step, setStep] = useState(0)
  const [exhausted, setExhausted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const chain = useMemo(
    () => (person.photo ? [person.photo, ...getImageFallbacks(person.photo)] : []),
    [person.photo],
  )

  if (exhausted || chain.length === 0) return null

  /* Chain mixes the card's own path with bare pooled fallbacks, so normalise it
     before reading anything off it. */
  const source = resolvePhoto(chain[Math.min(step, chain.length - 1)]).source
  if (!source) return null

  const advance = () => {
    if (step < chain.length - 1) setStep((current) => current + 1)
    else setExhausted(true)
  }

  return (
    // Three-up starts at lg, not md: at 768px the container leaves only 173px
    // inside a card, which is narrower than the button.
    <li
      data-fade=""
      style={{ '--card-rest-border': 'rgb(255 255 255 / 0.08)' } as CSSProperties}
      className="card-hover w-[82%] shrink-0 snap-start overflow-hidden rounded-card bg-slate-deep lg:w-auto lg:basis-[calc((100%_-_40px)/3)]"
    >
      <div className="relative">
        <img
          src={source.src}
          alt="Nursing professional"
          width={source.width}
          height={source.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: OBJECT_POSITIONS[index % OBJECT_POSITIONS.length] }}
          onError={advance}
          className="aspect-[4/4.4] w-full object-cover"
        />
        {person.tag ? (
          <span className="absolute -bottom-3 left-5 z-10 rounded-pill bg-amber px-3 py-1.5 text-[12px] font-semibold tracking-[0.06em] text-black uppercase">
            {person.tag}
          </span>
        ) : null}
      </div>

      <div className="p-6">
        {person.name ? (
          <h3 className="font-display text-[22px] font-bold text-white">{person.name}</h3>
        ) : null}
        {person.role ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted">{person.role}</p>
        ) : null}
        {person.location ? (
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {person.location}
          </p>
        ) : null}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => onMessage(person, triggerRef.current)}
          className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-pill bg-amber px-4 text-sm font-semibold whitespace-nowrap text-black transition-colors duration-200 hover:bg-white"
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
          Message
        </button>
      </div>
    </li>
  )
}

export default function People() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  /** The Message button that opened the dialog, so focus can go back to it. */
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [modalName, setModalName] = useState<string | null>(null)

  /* Auto-scroll stops while any one of these is true. */
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  const paused = reduced || !inView || hovering || interacting || !tabVisible || modalName !== null

  /* Advance only while the band is actually on screen. */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    })
    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  /* Honour the OS motion setting, live. */
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)

    return () => query.removeEventListener('change', sync)
  }, [])

  /* Stop advancing in a background tab. */
  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === 'visible')
    sync()
    document.addEventListener('visibilitychange', sync)

    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  /** Width of one card plus the gap. Never uses scrollIntoView. */
  const stride = useCallback(() => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!track || !(card instanceof HTMLElement)) return 0

    return card.getBoundingClientRect().width + GAP
  }, [])

  const maxScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0

    return Math.max(0, track.scrollWidth - track.clientWidth)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      const step = stride()
      if (!track || step === 0) return

      track.scrollTo({ left: Math.min(index * step, maxScroll()), behavior: 'smooth' })
    },
    [stride, maxScroll],
  )

  const stepBy = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current
      const step = stride()
      if (!track || step === 0) return

      track.scrollTo({
        left: Math.max(0, Math.min(track.scrollLeft + direction * step, maxScroll())),
        behavior: 'smooth',
      })
    },
    [stride, maxScroll],
  )

  /* The interval. Re-arms whenever the pause state or the page count changes. */
  useEffect(() => {
    if (paused || PEOPLE.length < 2) return

    const timer = window.setInterval(() => {
      const track = trackRef.current
      const step = stride()
      if (!track || step === 0) return

      const atEnd = track.scrollLeft >= maxScroll() - 2

      goTo(atEnd ? 0 : Math.round(track.scrollLeft / step) + 1)
    }, INTERVAL)

    return () => window.clearInterval(timer)
  }, [paused, goTo, stride, maxScroll])

  /* Resume two seconds after the last drag or keypress. */
  useEffect(() => {
    if (!interacting) return

    const timer = window.setTimeout(() => setInteracting(false), RESUME_DELAY)
    return () => window.clearTimeout(timer)
  }, [interacting])

  /* Dots follow scrollLeft, so swipes and arrows keep them in step. */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0

    const sync = () => {
      frame = 0

      const step = stride()
      if (step === 0) return

      /* Positions are whole strides with the last one clamped to the end, so the
         page count is the rounded ratio plus one — `ceil` would add a dead dot
         whenever the ratio lands a hair above an integer. */
      const pages = Math.max(1, Math.round(maxScroll() / step) + 1)

      setPageCount(pages)
      setActiveIndex((previous) => {
        const next = Math.min(Math.round(track.scrollLeft / step), pages - 1)
        return previous === next ? previous : next
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(sync)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    /* The dot count depends on the measured card width, so measure once now. */
    onScroll()

    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [stride, maxScroll])

  const openMessage = useCallback((person: Person, trigger: HTMLButtonElement | null) => {
    lastTriggerRef.current = trigger
    setModalName(person.name)
  }, [])

  const nudge = (direction: -1 | 1) => {
    setInteracting(true)
    stepBy(direction)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nudge(1)
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      nudge(-1)
    }
  }

  return (
    <ErrorBoundary name="people">
      {/* Wrapper only exists so the band can be observed; `Section` owns the
          background, padding and measure. */}
      <div ref={sectionRef} onFocusCapture={() => setInteracting(true)}>
        <Section id="people" tone="navy">
          <SectionHeading
            align="center"
            label="Career Development"
            title="Nursing Specializations"
            emphasis={['Specializations']}
            description="Critical care, emergency, theatre, paediatric, community and mental health nursing."
          />

          <div className="mt-8 hidden justify-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll to the previous person"
              className="grid size-12 place-items-center rounded-full border border-amber text-amber transition-colors duration-200 hover:bg-amber hover:text-black"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll to the next person"
              className="grid size-12 place-items-center rounded-full border border-amber text-amber transition-colors duration-200 hover:bg-amber hover:text-black"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul
            ref={trackRef}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onTouchStart={() => setInteracting(true)}
            onPointerDown={() => setInteracting(true)}
            tabIndex={0}
            aria-label="Nursing professionals"
            className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0"
          >
            {PEOPLE.map((person, index) => (
              <PersonCard key={person.id} person={person} index={index} onMessage={openMessage} />
            ))}
          </ul>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setInteracting(true)
                  goTo(index)
                }}
                aria-label={`Go to position ${index + 1} of ${pageCount}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="grid size-12 place-items-center"
              >
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full transition-colors duration-200 ${
                    index === activeIndex ? 'bg-amber' : 'bg-white/25'
                  }`}
                />
              </button>
            ))}
          </div>
        </Section>
      </div>

      <ConnectModal
        personName={modalName}
        trigger={lastTriggerRef.current}
        onClose={() => setModalName(null)}
      />
    </ErrorBoundary>
  )
}