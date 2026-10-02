import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'

export type LogoProps = {
  tone?: 'dark' | 'light'
  className?: string
  /**
   * Header only: on the narrowest phones the mark alone fills the row. The link
   * still carries the full name via its aria-label.
   */
  hideWordmarkOnMobile?: boolean
}

/**
 * Original text-based wordmark placeholder — no third-party branding. The mark is
 * a rounded amber tile so it holds up against the black header without needing a
 * heavy background.
 */
export default function Logo({
  tone = 'dark',
  className = '',
  hideWordmarkOnMobile = false,
}: LogoProps) {
  const wordmarkTone = tone === 'light' ? 'text-ink' : 'text-white'

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className="relative grid size-10 shrink-0 place-items-center rounded-[14px] bg-amber"
      >
        <span className="absolute h-[18px] w-[3px] rounded-full bg-ink" />
        <span className="absolute h-[3px] w-[18px] rounded-full bg-ink" />
      </span>
      <span
        className={cn(
          'flex flex-col leading-none',
          // Fits at 390px once the header button is gone; only the very smallest
          // phones drop to the mark alone.
          hideWordmarkOnMobile && 'max-[359px]:hidden',
        )}
      >
        <span
          className={cn(
            'font-display text-[1.15rem] font-extrabold tracking-tight',
            wordmarkTone,
          )}
        >
          {SITE.name}
        </span>
        <span className="mt-1.5 font-mono text-[0.6rem] tracking-[0.12em] text-muted uppercase">
          Nursing education platform
        </span>
      </span>
    </span>
  )
}
