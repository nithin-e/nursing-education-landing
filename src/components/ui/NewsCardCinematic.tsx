import { ArrowRight, Clock } from 'lucide-react'

import { cn } from '@/lib/cn'
import EcgPulse from './EcgPulse'
import type { NewsItem } from '@/data/nursingData'

type Props = {
  item: NewsItem
  index: number
  isActive: boolean
}

export default function NewsCardCinematic({ item, index, isActive }: Props) {
  const num = String(index).padStart(2, '0')
  return (
    <article
      tabIndex={0}
      aria-label={item.title}
      data-fx="card"
      className={cn(
        'fx-card group relative flex h-full flex-col justify-end overflow-hidden rounded-[32px] border transition-all duration-400',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber',
        isActive
          ? 'border-white/10 opacity-100 scale-100 hover:border-amber/40'
          : 'border-white/10 opacity-55 scale-[0.96]',
      )}
    >
      <span aria-hidden className="absolute inset-0 z-0">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover object-right transition-transform duration-600 ease-out group-hover:scale-105"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-black from-90% to-transparent"
      />
      <span aria-hidden className="absolute inset-0 z-0 ecg-grid opacity-[0.03]" />
      <span
        aria-hidden="true"
        className="absolute top-2 right-4 z-0 pointer-events-none font-display font-extrabold text-transparent tabular-nums leading-none"
        style={{ fontSize: '160px', WebkitTextStroke: '1px rgba(255,193,7,0.25)' }}
      >
        {num}
      </span>
      <EcgPulse animate className="absolute bottom-0 left-0 right-0 z-0 h-16 opacity-20" />
      <div className="relative z-10 flex max-w-[520px] flex-col gap-3 p-6 sm:p-8">
        <span className="inline-flex w-fit items-center rounded-pill bg-amber px-3 py-1 font-mono text-xs uppercase tracking-widest text-black">
          {item.category}
        </span>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60 tabular-nums">
          <span>{item.date}</span>
          <span aria-hidden="true">·</span>
          <Clock className="size-3" aria-hidden="true" />
          <span>{item.readTime}</span>
        </div>
        <h3
          className="font-display text-white"
          style={{ fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.05 }}
        >
          {item.title}
        </h3>
        <p className="line-clamp-3 text-[#9CA3AF] max-w-[48ch]">{item.description}</p>
        <a
          href="#news"
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-pill bg-amber px-4 py-2 text-sm font-medium text-black transition-colors"
        >
          Read More
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  )
}
