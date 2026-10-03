import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'

/**
 * The Dr Expert logo as supplied — the image file itself, never redrawn or
 * recreated. `object-contain` plus an explicit height means whatever aspect
 * ratio the asset has, it scales without cropping or distortion.
 *
 * The header is the only consumer, so the height steps with it: 56px, then 68px
 * once the brief's 768px mobile cut-off is passed, then 80px at `lg`.
 * `min-[769px]` rather than `md` because `md` is a min-width query that would
 * flip at exactly 768px.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <img
      src={SITE.logo}
      alt={`${SITE.name} logo`}
      width={256}
      height={181}
      className={cn(
        'h-14 w-auto max-w-none max-h-none object-contain object-left min-[769px]:h-[68px] lg:h-20',
        className,
      )}
    />
  )
}