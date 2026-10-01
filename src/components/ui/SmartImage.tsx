import { useState } from 'react'

export type SmartImageProps = {
  src: string
  alt: string
  /** Optional `srcSet` list so phones download a smaller file than desktops. */
  srcSet?: string
  sizes?: string
  fallbackSrc?: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
  eager?: boolean
}

/**
 * Image with a two-stage graceful fallback: the primary asset is attempted
 * first, then a locally hosted placeholder, then a neutral text tile. This
 * keeps layouts intact when an external image host is unreachable.
 */
export default function SmartImage({
  src,
  alt,
  srcSet,
  sizes,
  fallbackSrc = '/images/fallback.svg',
  className = '',
  wrapperClassName = '',
  width,
  height,
  eager = false,
}: SmartImageProps) {
  const [stage, setStage] = useState<0 | 1 | 2>(0)

  if (stage === 2) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-charcoal-soft p-6 text-center text-sm text-grey ${wrapperClassName} ${className}`}
      >
        {alt}
      </div>
    )
  }

  const isPrimary = stage === 0

  return (
    <img
      src={isPrimary ? src : fallbackSrc}
      srcSet={isPrimary ? srcSet : undefined}
      sizes={isPrimary ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setStage((s) => (s === 0 ? 1 : 2) as 0 | 1 | 2)}
      className={`${className} ${wrapperClassName}`}
    />
  )
}