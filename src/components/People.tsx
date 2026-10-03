import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, MapPin, MessageCircle } from 'lucide-react'

import { getImageFallbacks, resolvePhoto } from '@/data/images'
import { PEOPLE, SHOW_PHOTOS } from '@/data/people'
import type { Person } from '@/data/people'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import DefaultAvatar from './ui/DefaultAvatar'
import { useEnquiryModal } from './EnquiryModalProvider'
import ErrorBoundary from './ui/ErrorBoundary'

const INTERVAL = 3500
const RESUME_DELAY = 2000

/** Rendered 180px on desktop and 140px on mobile; the attributes reserve it. */
const AVATAR_SIZE = 180

type CardProps = {
  person: Person
  onMessage: (person: Person, trigger: HTMLButtonElement | null) => void
}

/**
 * One card per person.
 *
 * The avatar is the neutral `DefaultAvatar` silhouette while `SHOW_PHOTOS` is
 * false. The photograph path is kept intact behind that flag — original source
 * first, then the shared fallback pool on `onError` — so switching the flag back
 * on needs no edit here. The per-card `object-position` list went away with the
 * photos: it only existed to keep a face inside the crop, and a placeholder has
 * no face to place.
 */
function PersonCard({ person, onMessage }: CardProps) {
  const [step, setStep] = useState(0)
  /* Set once the fallback chain runs out, so a photo that cannot be loaded
     settles on the silhouette instead of a broken frame. */
  const [failed, setFailed] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const chain = useMemo(
    () => (person.photo ? [person.photo, ...getImageFallbacks(person.photo)] : []),
    [person.photo],
  )

  /* Chain mixes the card's own path with bare pooled fallbacks, so normalise it
     before reading anything off it. Empty chain or an exhausted chain both mean
     "no photo", which is the same state the placeholder covers. */
  const photo =
    SHOW_PHOTOS && !failed && chain.length > 0
      ? resolvePhoto(chain[Math.min(step, chain.length - 1)]).source
      : null

  const advance = () => {
    if (step < chain.length - 1) setStep((current) => current + 1)
    else setFailed(true)
  }

  return (
    // Three-up starts at lg, not md: at 768px the container leaves only 173px
    // inside a card, which is narrower than the button.
    <li
      data-fade=""
      className="w-[84%] shrink-0 snap-start rounded-[32px] bg-slate-deep px-8 pt-9 pb-8 text-center lg:w-auto lg:basis-[calc((100%_-_64px)/3)]"
    >
      {/* The circle and its responsive sizes stay with the card, so swapping a
          photo for the placeholder cannot shift the layout. */}
      <div className="mx-auto size-[140px] overflow-hidden rounded-full bg-slate-deep lg:size-[180px]">
        {photo ? (
          <img
            src={photo.src}
            alt="Nursing professional"
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            loading="lazy"
            decoding="async"
            onError={advance}
            className="size-full object-cover object-center"
          />
        ) : (
          <DefaultAvatar size={AVATAR_SIZE} />
        )}
      </div>

      <h3 className="mt-6 line-clamp-2 font-display text-[24px] font-bold text-white lg:line-clamp-1 lg:text-[28px]">
        {person.name}
      </h3>

      {person.role ? (
        <p className="mt-2.5 line-clamp-2 text-[18px] leading-[1.6] text-[#D1D5DB]">
          {person.role}
        </p>
      ) : null}

      {person.tag ? (
        <p className="mt-1.5 text-[16px] text-muted uppercase">{person.tag}</p>
      ) : null}

      {person.location ? (
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[16px] text-muted">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {person.location}
        </p>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => onMessage(person, triggerRef.current)}
        className="mt-7 inline-flex min-h-[56px] w-full items-center justify-start gap-2 rounded-pill bg-amber px-6 text-[18px] font-semibold text-black transition-colors duration-200 hover:bg-white"
      >
        <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
        Message
      </button>
    </li>
  )
}

export default function People() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  const { openPersonMessage, isOpen: enquiryOpen } = useEnquiryModal()

  const [activeIndex, setActiveIndex] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  /* Auto-scroll stops while any one of these is true. */
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  const paused = reduced || !inView || hovering || interacting || !tabVisible || enquiryOpen

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

    /* Read the live gap rather than a constant: it is 20px on the mobile swipe
       row and 32px across the three-up grid, and the scroll maths has to match
       whichever one is showing. */
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap)

    return card.getBoundingClientRect().width + (Number.isNaN(gap) ? 0 : gap)
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

  const openMessage = useCallback(
    (person: Person, trigger: HTMLButtonElement | null) => {
      openPersonMessage(person.name, trigger)
    },
    [openPersonMessage],
  )

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

          {/* Arrows straddle the track rather than sitting under the heading, so
              they line up with the cards' vertical centre. -12px keeps them
              inside the container's own padding, so they can never overlap a
              card's text. */}
          <div className="relative mt-8">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll to the previous person"
              className="absolute -left-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border-2 border-amber bg-transparent text-amber transition-colors duration-200 hover:bg-amber hover:text-black lg:grid"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>

            <ul
              ref={trackRef}
              onKeyDown={onKeyDown}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onTouchStart={() => setInteracting(true)}
              onPointerDown={() => setInteracting(true)}
              tabIndex={0}
              aria-label="Nursing professionals"
              className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 lg:gap-8"
            >
              {PEOPLE.map((person) => (
                <PersonCard key={person.id} person={person} onMessage={openMessage} />
              ))}
            </ul>

            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll to the next person"
              className="absolute -right-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border-2 border-amber bg-transparent text-amber transition-colors duration-200 hover:bg-amber hover:text-black lg:grid"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>

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
    </ErrorBoundary>
  )
}