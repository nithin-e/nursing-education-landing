import { cn } from '@/lib/cn'
import { SITE } from '@/data/site'

export type LogoProps = {
  tone?: 'dark' | 'light'
  className?: string
}

/** Original text-based wordmark placeholder — no third-party branding. */
export default function Logo({ tone = 'light', className = '' }: LogoProps) {
  const wordmarkTone = tone === 'light' ? 'text-charcoal' : 'text-paper'
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-charcoal"
      >
        <span className="absolute h-4 w-1 rounded-full bg-gold" />
        <span className="absolute h-1 w-4 rounded-full bg-gold" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-base font-bold tracking-tight sm:text-lg', wordmarkTone)}>
          {SITE.name}
        </span>
        <span className="mt-0.5 text-[0.6rem] font-medium tracking-[0.22em] text-grey uppercase">
          Nursing Platform
        </span>
      </span>
    </span>
  )
}