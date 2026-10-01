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
    surface: 'border-charcoal/10 bg-paper hover:border-charcoal/30',
    icon: 'bg-mist text-gold-dark',
    title: 'text-charcoal',
    body: 'text-charcoal/70',
    chip: 'bg-mist text-charcoal/65',
    link: 'text-charcoal hover:text-gold-dark',
    divider: 'border-charcoal/10',
  },
  dark: {
    surface: 'border-white/12 bg-charcoal-soft/80 hover:border-white/25',
    icon: 'bg-white/10 text-gold',
    title: 'text-paper',
    body: 'text-grey',
    chip: 'bg-white/8 text-paper/75',
    link: 'text-paper hover:text-gold',
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
        'flex h-full flex-col gap-3 rounded-lg border p-5 transition-colors duration-200 sm:p-6',
        p.surface,
      )}
    >
      <span className={cn('grid size-10 place-items-center rounded-lg', p.icon)}>
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <h3 className={cn('text-lg', p.title)}>{card.title}</h3>
      <p className={cn('text-sm leading-relaxed', p.body)}>{card.description}</p>

      <ul className="flex flex-wrap gap-1.5">
        {card.points.map((point) => (
          <li key={point} className={cn('rounded-md px-2 py-0.5 text-xs font-medium', p.chip)}>
            {point}
          </li>
        ))}
      </ul>

      <a
        href={linkHref}
        className={cn(
          'mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold transition-colors',
          p.link,
        )}
      >
        {linkLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  )
}