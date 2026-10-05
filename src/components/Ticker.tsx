import { TICKER_ITEMS } from '@/data/nursingData'
import { cn } from '@/lib/cn'

export type TickerProps = {
  /** Extra classes on the outer strip, e.g. the margin that sits above it. */
  className?: string
  /** Adds the scroll-reveal marker that `useReveal` watches for. */
  fade?: boolean
}

/**
 * One group of phrases: each phrase carries its own trailing spacing, so the
 * group always ends with "dot + gap".
 *
 * That trailing gap on the *last* item is the whole trick. Spacing used to come
 * from the parent's `gap`, which adds nothing after the final item, so a group
 * ended on a bare dot. Two identical groups side by side therefore met as
 * "dot + gap" inside the group but "dot + phrase" at the loop point. Giving
 * every item a `padding-right` equal to its gap makes both identical.
 *
 * `shrink-0` and `nowrap` keep every phrase whole and uncrushed, which is what
 * makes the two groups the same width and the -50% translate land exactly on
 * the seam.
 */
function Group({
  hidden = false,
  duplicate = false,
}: {
  hidden?: boolean
  duplicate?: boolean
}) {
  return (
    <div
      className={cn('flex shrink-0', duplicate && 'ticker-group-duplicate')}
      {...(hidden ? { 'aria-hidden': true } : {})}
    >
      {TICKER_ITEMS.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-7 pr-7 text-[13px] whitespace-nowrap tracking-[0.12em] text-muted uppercase min-[769px]:gap-10 min-[769px]:pr-10 min-[769px]:text-[15px]"
        >
          {item}
          <span className="size-2 shrink-0 rounded-full bg-amber" aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

/**
 * Slim one-row strip of course phrases, separated by yellow dots.
 *
 * Rendered as two identical groups inside a track translated -50%, which makes
 * the loop seamless. The duplicate is `aria-hidden` so screen readers hear each
 * phrase once. Pauses on hover, keeps running under touch, and under
 * `prefers-reduced-motion` becomes a static centred wrapped row.
 */
export default function Ticker({ className = '', fade = false }: TickerProps) {
  return (
    <div
      className={cn('ticker overflow-hidden border-y border-line bg-ink py-5 min-[769px]:py-7', className)}
      {...(fade ? { 'data-fade': '' } : {})}
    >
      <div className="ticker-track">
        <Group />
        <Group hidden duplicate />
      </div>
    </div>
  )
}