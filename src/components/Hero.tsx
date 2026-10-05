import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Phone, Sparkle } from 'lucide-react'

import { HERO_HEADLINE, HERO_HEADLINE_2, HERO_LABEL, HERO_TEXT } from '@/data/nursingData'
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/data/contact'
import { getImage, resolvePhoto, type ImageSlot } from '@/data/images'
import { SITE } from '@/data/site'
import Button from './ui/Button'

/** Opening line carried into the WhatsApp chat. */
const WHATSAPP_MESSAGE = "I'm interested in nursing"

/**
 * WhatsApp's mark. It is a brand logo rather than a UI symbol, so lucide has no
 * equivalent and it is inlined here; `currentColor` lets it match the button's
 * black text.
 */
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

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

        {/* Stacked full-width on phones, centred row from tablet up. The
            switch sits at 769px to match the rest of the page's breakpoints. */}
        <div className="flex flex-col items-stretch gap-3 min-[769px]:flex-row min-[769px]:flex-wrap min-[769px]:justify-center">
          {/* New tab, so WhatsApp's web app cannot reach back into this page. */}
          <Button
            href={whatsappLink(WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="h-[52px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[769px]:h-14"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            Whatsapp Us
          </Button>
          <Button
            href={`tel:${PHONE_TEL}`}
            variant="outline"
            aria-label={`Call us at ${PHONE_DISPLAY}`}
            className="h-[52px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber min-[769px]:h-14"
          >
            <Phone className="size-4 shrink-0" />
            Call now
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