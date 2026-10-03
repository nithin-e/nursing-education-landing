import { Sparkle } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Splits a plain-string title so the words named in `emphasis` render heavy while
 * the rest stay light. No text changes — only the weight does, which is what
 * gives each headline two weights in one line.
 */
function withEmphasis(title: ReactNode, emphasis: string[] = []): ReactNode {
  if (typeof title !== 'string' || emphasis.length === 0) return title

  const pattern = new RegExp(`(${emphasis.map(escapeRegExp).join('|')})`, 'gi')

  return title.split(pattern).map((part, index) =>
    emphasis.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
      <span key={`${part}-${index}`} className="font-extrabold">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

/** Small yellow uppercase label, introduced by a 4-point star. */
export function SectionLabel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] text-amber uppercase',
        className,
      )}
    >
      <Sparkle className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={2} />
      {children}
    </p>
  )
}

export type SectionHeadingProps = {
  label?: string
  title: ReactNode
  description?: ReactNode
  /** Words inside `title` that jump to weight 800. */
  emphasis?: string[]
  align?: 'left' | 'center'
  className?: string
}

/**
 * Label + heading + one short line. Most sections centre this block; Exams
 * left-aligns it because its column is half-width.
 */
export default function SectionHeading({
  label,
  title,
  description,
  emphasis = [],
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      data-fade=""
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        centered ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {label ? <SectionLabel>{label}</SectionLabel> : null}

      <h2 className="text-[clamp(1.875rem,4.5vw,2.75rem)] leading-[1.15] font-light text-white">
        {withEmphasis(title, emphasis)}
      </h2>

      {description ? (
        <p className="text-[15px] leading-relaxed text-muted md:text-base">{description}</p>
      ) : null}
    </div>
  )
}
