import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'

export type LogoProps = {
  className?: string
  /** Footer renders it larger than the header. */
  size?: 'sm' | 'lg'
}

/**
 * The Dr Expert logo as supplied — the image file itself, never redrawn or
 * recreated. `object-contain` plus an explicit height means whatever aspect
 * ratio the asset has, it scales without cropping or distortion.
 *
 * Header heights step 56 / 68 / 80px. `min-[769px]` rather than `md` because the
 * brief calls 768px mobile, and `md` is a min-width query that would flip at
 * exactly 768px. The footer keeps its own larger sizes.
 */
export default function Logo({ className = '', size = 'sm' }: LogoProps) {
  return (
    <img
      src={SITE.logo}
      alt={`${SITE.name} logo`}
      width={256}
      height={181}
      className={cn(
        'w-auto max-w-none max-h-none object-contain object-left',
        size === 'lg' ? 'h-20 sm:h-24' : 'h-14 min-[769px]:h-[68px] lg:h-20',
        className,
      )}
    />
  )
}
