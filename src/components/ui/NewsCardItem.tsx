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
      surface: 'border-charcoal/10 bg-paper hover:border-charcoal/30',
      title: 'text-charcoal hover:text-gold-dark',
      body: 'text-charcoal/70',
      meta: 'text-charcoal/55',
      badge: 'bg-mist text-gold-dark',
      link: 'text-charcoal hover:text-gold-dark',
    },
    dark: {
      surface: 'border-white/10 bg-charcoal-soft/70 hover:border-white/25',
      title: 'text-paper hover:text-gold',
      body: 'text-grey',
      meta: 'text-grey/80',
      badge: 'bg-white/10 text-gold',
      link: 'text-paper hover:text-gold',
    },
  } as const

  const p = palettes[tone]

  return (
    <article className={cn('flex h-full flex-col overflow-hidden rounded-lg border transition-colors duration-200', p.surface)}>
      <div className="relative aspect-video overflow-hidden bg-charcoal">
        <SmartImage
          src={item.image}
          alt={item.imageAlt}
          className="h-full w-full object-cover"
          width={640}
          height={420}
        />
        <span
          className={cn(
            'absolute top-3 left-3 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] uppercase',
            p.badge,
          )}
        >
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <p className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-xs', p.meta)}>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <time>{item.date}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {item.readTime}
          </span>
        </p>

        <h3 className={cn('text-lg transition-colors duration-200', p.title)}>{item.title}</h3>
        <p className={cn('text-sm leading-relaxed', p.body)}>{item.description}</p>

        <a
          href={linkHref}
          className={cn('mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold transition-colors', p.link)}
        >
          Read More
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}