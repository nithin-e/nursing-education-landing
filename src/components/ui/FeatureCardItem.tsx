import { ArrowRight } from 'lucide-react'

import type { FeatureCard as FeatureCardData } from '@/data/nursingData'
import { cn } from '@/lib/cn'

export type FeatureCardItemProps = {
  card: FeatureCardData
  tone: 'light' | 'dark'
  linkHref: string
  linkLabel: string
}

const palettes = {
  light: {
    surface:
      'border-charcoal/10 bg-paper hover:border-gold/70 hover:shadow-[0_26px_60px_-36px_rgba(17,18,26,0.5)]',
    icon: 'bg-charcoal text-gold group-hover:bg-gold group-hover:text-ink',
    title: 'text-charcoal',
    body: 'text-charcoal/70',
    chip: 'bg-mist text-charcoal/70',
    link: 'text-charcoal group-hover:text-gold-dark',
    divider: 'border-charcoal/10',
  },
  dark: {
    surface:
      'border-white/10 bg-charcoal-soft/80 hover:border-gold/70 hover:bg-charcoal-soft hover:shadow-[0_26px_60px_-30px_rgba(0,0,0,0.9)]',
    icon: 'bg-gold text-ink group-hover:bg-paper group-hover:text-gold',
    title: 'text-paper',
    body: 'text-grey',
    chip: 'bg-white/8 text-paper/75',
    link: 'text-paper group-hover:text-gold',
    divider: 'border-white/10',
  },
} as const

export default function FeatureCardItem({
  card,
  tone,
  linkHref,
  linkLabel,
}: FeatureCardItemProps) {
  const Icon = card.icon
  const p = palettes[tone]

  return (
    <article
      className={cn(
        'group flex h-full flex-col gap-5 rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5',
        p.surface,
      )}
    >
      <span className={cn('grid size-13 place-items-center rounded-xl transition-colors duration-300', p.icon)}>
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <h3 className={cn('text-xl', p.title)}>{card.title}</h3>
      <p className={cn('text-sm leading-relaxed', p.body)}>{card.description}</p>

      <ul className="flex flex-wrap gap-2">
        {card.points.map((point) => (
          <li key={point} className={cn('rounded-full px-3 py-1 text-xs font-medium', p.chip)}>
            {point}
          </li>
        ))}
      </ul>

      <a
        href={linkHref}
        className={cn(
          'mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold transition-colors',
          p.link,
        )}
      >
        {linkLabel}
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </article>
  )
}