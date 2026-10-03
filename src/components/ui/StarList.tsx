import { Sparkle } from 'lucide-react'

import type { ListItem } from '@/data/nursingData'

/**
 * Plain divider-separated rows, each led by a small yellow star. Shared by the
 * Exams list and the Mission / Vision / Commitment rows in About, which are the
 * same pattern. No icons boxes, no tag chips.
 */
export default function StarList({ items }: { items: ListItem[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((item) => (
        <li key={item.title} className="flex gap-4 border-b border-line py-5">
          <Sparkle className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" strokeWidth={2} />
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
