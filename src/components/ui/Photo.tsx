import { useState } from 'react'
import type { CSSProperties } from 'react'

import { getImage, getImageFallbacks, type ImageSlot } from '@/data/images'
import { cn } from '@/lib/cn'

export type PhotoProps = {
  slot: ImageSlot
  /** Defaults to the source's own alt text. */
  alt?: string
  /**
   * Wrapper box. When `useRatio` is on (the default) the slot's aspect ratio
   * from the image map owns the box and `className` should only carry width.
   */
  className?: string
  /** Set false where the layout already pins an explicit responsive height. */
  useRatio?: boolean
  priority?: boolean
  /** Fires only once every candidate has failed and the wrapper is gone. */
  onFail?: () => void
}

/**
 * A photograph that can never leave an empty frame behind it.
 *
 * On `onError` it swaps to the next photo in the image map rather than showing
 * a broken image, and once every candidate has failed it unmounts entirely, so
 * there is never an empty box, a grey gap or dead space where a photo belongs.
 *
 * The `<img>` is absolutely positioned so the intrinsic `width`/`height`
 * attributes stay semantically correct without fighting the wrapper's crop
 * ratio — `object-fit: cover` plus the slot's `object-position` and zoom do all
 * the cropping. The uniform treatment (card radius, hairline border, faint
 * overlay) lives here so every photo on the page looks identical.
 */
export default function Photo({
  slot,
  alt,
  className = '',
  useRatio = true,
  priority = false,
  onFail,
}: PhotoProps) {
  const primary = getImage(slot)
  const [step, setStep] = useState(0)
  const [dead, setDead] = useState(false)

  // Hooks above the early return, so the order never changes between renders.
  if (!primary || dead) return null

  const chain = [primary, ...getImageFallbacks(primary.source.src)]
  const current = chain[Math.min(step, chain.length - 1)]

  return (
    <div
      className={cn('relative overflow-hidden rounded-card border border-line', className)}
      style={useRatio ? ({ aspectRatio: current.crop.aspect } as CSSProperties) : undefined}
    >
      <img
        src={current.source.src}
        alt={alt ?? current.source.alt}
        width={current.source.width}
        height={current.source.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => {
          if (step < chain.length - 1) setStep((previous) => previous + 1)
          else {
            setDead(true)
            onFail?.()
          }
        }}
        className="absolute inset-0 size-full object-cover"
        style={{
          objectPosition: current.crop.position,
          transform: `scale(${current.crop.zoom}${
            current.crop.flip ? ' scaleX(-1)' : ''
          })`,
        }}
      />

      <span aria-hidden="true" className="absolute inset-0 bg-black/8" />
    </div>
  )
}
