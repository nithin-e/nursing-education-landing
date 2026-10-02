import { ArrowRight } from 'lucide-react'

import type { FeatureCard as FeatureCardData } from '@/data/nursingData'
import { cn } from '@/lib/cn'

export type FeatureCardItemProps = {
  card: FeatureCardData
  /** `navy` sits on black bands, `raised` sits on the lighter navy band. */
  surface?: 'navy' | 'raised'
  /** `grid` is the four-up tile, `stacked` is the wide career row with an accent bar. */
  layout?: 'grid' | 'stacked'
  /** Decorative depth treatment. `corner` renders an aria-hidden numeral. */
  accent?: 'none' | 'top' | 'corner'
  /** 1-based position, used only by the decorative corner numeral. */
  index?: number
  /** Larger 32px radius and deeper padding for the full-width exam cards. */
  roomy?: boolean
  linkHref: string
  linkLabel: string
}

export default function FeatureCardItem({
  card,
  surface = 'navy',
  layout = 'grid',
  accent = 'none',
  index,
  roomy = false,
  linkHref,
  linkLabel,
}: FeatureCardItemProps) {
  const Icon = card.icon
  const stacked = layout === 'stacked'

  return (
    <article
      className={cn(
        'group/card relative flex h-full flex-col overflow-hidden',
        roomy
          ? 'rounded-[32px] border border-line'
          : surface === 'navy'
            ? 'card-navy'
            : 'rounded-card border border-line bg-navy-2',
        stacked
          ? 'border-l-2 border-l-amber/70 p-6 transition-[transform,border-color,box-shadow] duration-250 ease-brand hover:translate-x-2 hover:border-l-amber sm:p-8'
          : cn(
              'card-lift',
              roomy ? 'bg-navy p-8 sm:p-10 lg:p-12' : 'p-6 sm:p-7',
            ),
      )}
    >
      {/* Thin amber top edge that fades in on hover (Resources tiles). */}
      {accent === 'top' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        />
      ) : null}

      {/* Decorative amber bloom + numeral in the corner (Exams cards). */}
      {accent === 'corner' ? (
        <>
          <span aria-hidden="true" className="glow-amber pointer-events-none absolute -top-24 -right-24 size-64" />
          {index ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-6 right-7 font-display text-7xl leading-none font-extrabold text-white/[0.04] select-none"
            >
              {String(index).padStart(2, '0')}
            </span>
          ) : null}
        </>
      ) : null}

      {/* Icon only — no box behind it, amber, larger than the old 20px glyph. */}
      <Icon
        className={cn('relative size-9 shrink-0 text-amber', stacked && 'size-10', roomy && 'size-11')}
        strokeWidth={1.4}
        aria-hidden="true"
      />

      <h3
        className={cn(
          'relative mt-5 font-display leading-tight font-bold text-white',
          stacked ? 'text-2xl sm:text-3xl' : roomy ? 'text-3xl' : 'text-xl',
        )}
      >
        {card.title}
      </h3>

      <p
        className={cn(
          'relative mt-3 leading-relaxed text-body',
          stacked ? 'max-w-[52ch] text-base' : 'text-[0.95rem]',
        )}
      >
        {card.description}
      </p>

      <ul className={cn('relative mt-5 flex flex-wrap gap-2', stacked && 'mt-6')}>
        {card.points.map((point) => (
          <li key={point} className="chip">
            {point}
          </li>
        ))}
      </ul>

      <a
        href={linkHref}
        className={cn('link-arrow relative mt-auto pt-6 text-sm', stacked && 'text-base')}
      >
        {linkLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  )
}
