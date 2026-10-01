import { ArrowRight, CalendarDays, Clock } from 'lucide-react'

import type { NewsItem } from '@/data/nursingData'
import { cn } from '@/lib/cn'
import SmartImage from './SmartImage'

export type NewsCardItemProps = {
  item: NewsItem
  tone?: 'light' | 'dark'
  linkHref?: string
}

export default function NewsCardItem({
  item,
  tone = 'light',
  linkHref = '#contact',
}: NewsCardItemProps) {
  const palettes = {
    light: {
      surface:
        'border-charcoal/10 bg-paper hover:border-gold/70 hover:shadow-[0_28px_60px_-38px_rgba(17,18,26,0.55)]',
      title: 'text-charcoal group-hover:text-gold-dark',
      body: 'text-charcoal/70',
      meta: 'text-charcoal/55',
      badge: 'bg-gold/12 text-gold-dark',
      link: 'text-charcoal group-hover:text-gold-dark',
    },
    dark: {
      surface:
        'border-white/10 bg-charcoal-soft/70 hover:border-gold/70 hover:bg-charcoal-soft hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)]',
      title: 'text-paper group-hover:text-gold',
      body: 'text-grey',
      meta: 'text-grey/80',
      badge: 'bg-gold/15 text-gold',
      link: 'text-paper group-hover:text-gold',
    },
  } as const

  const p = palettes[tone]

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1.5',
        p.surface,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-charcoal">
        <SmartImage
          src={item.image}
          alt={item.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          width={640}
          height={420}
        />
        <span
          className={cn(
            'absolute top-4 left-4 rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] uppercase',
            p.badge,
          )}
        >
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className={cn('flex flex-wrap items-center gap-x-4 gap-y-1 text-xs', p.meta)}>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <time>{item.date}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {item.readTime}
          </span>
        </p>

        <h3 className={cn('text-lg transition-colors duration-300', p.title)}>{item.title}</h3>
        <p className={cn('text-sm leading-relaxed', p.body)}>{item.description}</p>

        <a
          href={linkHref}
          className={cn(
            'mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold transition-colors',
            p.link,
          )}
        >
          Read More
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  )
}