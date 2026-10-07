import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'

import { ADDRESS, MAPS_URL, MAP_EMBED_URL, PHONE_TEL } from '@/data/contact'
import { SectionLabel } from './SectionHeading'
import Button from './Button'

/**
 * Address, map and the two ways to get there.
 *
 * Styled like the section's other cards: small yellow label, white body copy, a
 * flat dark map frame with a hairline border.
 *
 * The map is deferred until the card is within 300px of the viewport. That keeps
 * the third-party frame off the critical path, and means a visitor who never
 * scrolls this far never pays for it. The address and the "Get directions"
 * button are rendered *outside* the frame and unconditionally, so nothing the
 * visitor came for disappears if the embed fails or is blocked.
 */
export default function LocationCard() {
  const [shouldLoad, setShouldLoad] = useState(false)

  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame || shouldLoad) return

    /* No observer support: load it anyway. A blank slot is worse than an eager
       third-party frame. */
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '300px' },
    )

    observer.observe(frame)

    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div data-fade="">
      <SectionLabel>Visit us</SectionLabel>

      {/* Pin is `shrink-0` and the text wraps beside it, so a long address never
          pushes the icon off the edge or overlaps it. */}
      <p className="mt-3 flex items-start gap-2.5 text-[17px] leading-relaxed text-white">
        <MapPin className="mt-1 size-5 shrink-0 text-amber" aria-hidden="true" />
        {ADDRESS}
      </p>

      {/*
        The ratio lives on the frame, not the iframe, so the box holds its space
        before the embed exists and the layout cannot jump when the map arrives.
        `4 / 3` on a phone, where a 16 / 9 frame would be too short to pan;
        `16 / 9` from 769px. `max-h-[340px]` applies at every width, so the 4 / 3
        phone frame is capped too - a 4 / 3 frame in a 320px-wide column would
        otherwise be 427px tall and push the buttons off screen. `bg-slate-deep`
        covers the gap while the tile images stream in.

        The iframe is absolutely positioned to fill the frame, which keeps the
        embed from deciding its own height.
      */}
      <div
        ref={frameRef}
        className="relative mt-5 aspect-[4/3] max-h-[340px] overflow-hidden rounded-[24px] border border-[rgb(255_255_255/0.08)] bg-slate-deep min-[769px]:aspect-[16/9]"
      >
        {shouldLoad ? (
          <iframe
            src={MAP_EMBED_URL}
            title="Dr Expert Edulinks office location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : null}
      </div>

      {/* Stacked and full width on a phone; a row once there is room. Both keep a
          52px height, so the map card's controls match the rest of the page. */}
      <div className="mt-5 flex flex-col gap-3 min-[481px]:flex-row">
        <Button
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="h-[52px] w-full min-[481px]:w-auto"
        >
          <Navigation className="size-4 shrink-0" aria-hidden="true" />
          Get directions
        </Button>

        <Button
          href={`tel:${PHONE_TEL}`}
          variant="outline"
          className="h-[52px] w-full min-[481px]:w-auto"
        >
          Call us
        </Button>
      </div>
    </div>
  )
}