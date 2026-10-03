import { TICKER_ITEMS } from '@/data/nursingData'

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      className="flex shrink-0 items-center gap-6"
      {...(hidden ? { 'aria-hidden': true } : {})}
    >
      {TICKER_ITEMS.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-6 text-[13px] tracking-[0.15em] whitespace-nowrap text-muted uppercase"
        >
          {item}
          <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
        </span>
      ))}
    </span>
  )
}

/**
 * Slim one-row strip between Resources and Exams.
 *
 * The phrase list is rendered twice inside a `w-max` track and the track is
 * translated -50%, which makes the loop seamless. The duplicate copy is hidden
 * from assistive tech so the phrases are not announced twice. Pauses on hover,
 * and under `prefers-reduced-motion` the animation is dropped and the strip
 * simply becomes scrollable rather than clipped.
 */
export default function Ticker() {
  return (
    <div className="ticker border-y border-line bg-ink py-5">
      <div className="ticker-track flex w-max items-center">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
