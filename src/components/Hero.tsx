import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, Sparkle } from 'lucide-react'

import { HERO_HEADLINE, HERO_HEADLINE_2, HERO_LABEL, HERO_TEXT } from '@/data/nursingData'
import { getImage, resolvePhoto, type ImageSlot } from '@/data/images'
import { SITE } from '@/data/site'
import Button from './ui/Button'

/**
 * The three-photo band under the hero. Columns are 1fr / 1.4fr / 1fr on desktop
 * and the centre photo rides 24px higher than the outer two for a gentle wave.
 * On mobile the same three photos become one scroll-snap row with the offsets
 * removed.
 *
 * Each photo resolves through the central image map and carries its own
 * `object-position`, so the same file never looks like the same shot twice.
 *
 * The three frames point at the dedicated event photographs in `DEDICATED_SOURCES`
 * (`/images/1.webp`, `2.webp`, `3.webp`); `SLOTS` is the only place those
 * filenames appear.
 */
const BAND: {
  slot: ImageSlot
  /** Desktop grid track. */
  track: string
  /** Only applied from `md` up. */
  lift: string
}[] = [
  { slot: 'heroBandLeft', track: '1fr', lift: 'md:translate-y-3' },
  { slot: 'heroBandCenter', track: '1fr', lift: 'md:-translate-y-5' },
  { slot: 'heroBandRight', track: '1fr', lift: 'md:translate-y-3' },
]

/**
 * What the band collapses to when one or more photos fail to load — three equal
 * columns, so a survivor expands rather than leaving a hole.
 */
const FALLBACK_TRACKS = ['1fr', '1fr 1fr', '1fr 1fr 1fr']

export default function Hero() {
  const [hidden, setHidden] = useState<number[]>([])

  /* Normalised once here, so the JSX below never asserts. `getImage` returns a
     slot result, which `resolvePhoto` unwraps into a plain `source` + `crop`. */
  const photos = BAND.flatMap((item, index) => {
    if (hidden.includes(index)) return []

    const { source, crop } = resolvePhoto(getImage(item.slot))
    if (!source || !crop) return []

    return [{ ...item, index, source, crop }]
  })

  const markHidden = (index: number) =>
    setHidden((previous) => (previous.includes(index) ? previous : [...previous, index]))

  /*
   * The header is `sticky top-0`, which keeps it in normal flow — at rest the
   * hero starts directly beneath it, so padding-top is the visible gap itself:
   * 24px on a phone, 40px from tablet. Only once the page is scrolled does the
   * header overlay, and `scroll-mt` (header + 12px) is what stops it covering
   * the pill on a Home jump or a reload mid-scroll.
   *
   * Nothing else contributes to this gap: the pill carries `mx-auto` and no
   * `mt`, there is no spacer, and no height is added for the header.
   *
   * The band is never touched. `scroll-mt` values are unchanged.
   */
  return (
    <section
      id="home"
      className="scroll-mt-[96px] min-[769px]:scroll-mt-[104px] lg:scroll-mt-[116px] h-auto min-h-0 bg-ink pt-[24px] pb-[40px] text-center min-[769px]:pt-[40px] min-[769px]:pb-[64px]"
    >
      <div className="container-page hero-intro">
        <p className="mx-auto inline-flex items-center gap-2 rounded-pill border border-amber/50 px-4 py-2 text-[13px] font-semibold tracking-[0.12em] text-amber uppercase">
          <Sparkle className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={2} />
          {SITE.tagline}
        </p>

        <h1 className="mt-8 text-[clamp(34px,9.5vw,44px)] leading-[1.05] font-light text-white md:text-[clamp(40px,6vw,84px)]">
          <span className="block">
            {HERO_HEADLINE[0]}
            <span className="font-extrabold">{HERO_HEADLINE[1]}</span>
          </span>
          <span className="block">
            {HERO_HEADLINE_2[0]}
            <span className="font-extrabold text-amber">{HERO_HEADLINE_2[1]}</span>
          </span>
        </h1>

        <p className="mt-4 text-sm text-muted md:text-base">{HERO_LABEL}</p>

        <p className="mx-auto mt-6 mb-8 max-w-[640px] text-[15px] leading-relaxed text-muted md:text-[18px]">
          {HERO_TEXT}
        </p>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button href="#resources" className="h-[52px] md:h-14">
            Explore Nursing
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button href="#about" variant="outline" className="h-[52px] md:h-14">
            Learn More
          </Button>
        </div>

        {photos.length > 0 ? (
          <div
            className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:overflow-visible md:px-0 md:gap-5 md:[grid-template-columns:var(--band-tracks)]"
            style={{ '--band-tracks': FALLBACK_TRACKS[photos.length - 1] } as CSSProperties}
          >
            {photos.map((photo, position) => (
              <img
                key={photo.slot}
                src={photo.source.src}
                alt={photo.source.alt}
                width={photo.source.width}
                height={photo.source.height}
                loading={position === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={() => markHidden(photo.index)}
                style={{ objectPosition: photo.crop.position }}
                className={`aspect-[4/3] h-auto w-[86%] shrink-0 snap-start rounded-[24px] object-cover md:w-full md:rounded-[28px] ${photo.lift}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}