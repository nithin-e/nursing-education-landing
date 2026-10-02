import { ArrowRight, CalendarDays, Clock } from 'lucide-react'

import type { NewsItem } from '@/data/nursingData'
import SmartImage from './SmartImage'

export type NewsCardItemProps = {
  item: NewsItem
  /** Index used only for the decorative numeral in the top-right corner. */
  index?: number
  linkHref?: string
}

/**
 * Article card: 28px radii throughout, image on top, category as a small amber
 * pill and a "Read More" link whose arrow slides on hover.
 */
export default function NewsCardItem({ item, index, linkHref = '#contact' }: NewsCardItemProps) {
  return (
    <article className="card-navy card-lift group/news flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <SmartImage
          src={item.image}
          alt={item.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover/news:scale-105"
          width={640}
          height={420}
        />
        <span className="absolute top-4 left-4 rounded-pill bg-amber px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] text-ink uppercase">
          {item.category}
        </span>
        {index ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-5 font-display text-5xl leading-none font-extrabold text-white/10 select-none"
          >
            {String(index).padStart(2, '0')}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <time>{item.date}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {item.readTime}
          </span>
        </p>

        <h3 className="mt-4 font-display text-2xl leading-tight font-bold text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{item.description}</p>

        <a href={linkHref} className="link-arrow mt-auto pt-6 text-sm">
          Read More
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
