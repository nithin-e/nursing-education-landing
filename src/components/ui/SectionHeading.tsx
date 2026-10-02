import type { CSSProperties, ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/cn'

export type EyebrowProps = {
  children: ReactNode
  className?: string
  /** Escape hatch for entrance-animation timing in the hero. */
  style?: CSSProperties
}

/**
 * Small section label: uppercase monospace, wide tracking, amber, introduced by a
 * sparkle instead of the thin rule used by more generic templates. The wording is
 * supplied by each section and is never changed here.
 */
export function Eyebrow({ children, className = '', style }: EyebrowProps) {
  return (
    <p
      style={style}
      className={cn(
        'flex items-center gap-2 font-mono text-xs font-medium tracking-[0.15em] text-amber uppercase',
        className,
      )}
    >
      <Sparkles className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={1.75} />
      {children}
    </p>
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Splits a plain-string title so the words named in `emphasis` render at weight
 * 800 while the rest stay at 300. Text content is untouched — only the weight
 * changes, which is what gives each headline two weights in one line.
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

export type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Words inside `title` that jump to weight 800. */
  emphasis?: string[]
  align?: 'left' | 'center'
  className?: string
}

/**
 * Consistent eyebrow + heading + description group. The heading is capped at
 * clamp(32px, 4.5vw, 52px) with a 1.1 line height, and the description stays on a
 * readable measure so a heading never drifts from the paragraph it introduces.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  emphasis = [],
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={cn('flex max-w-3xl flex-col gap-4 sm:gap-5', alignment, className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] font-light text-white">
        {withEmphasis(title, emphasis)}
      </h2>
      {description ? (
        <p className="max-w-[62ch] text-base leading-relaxed text-body">{description}</p>
      ) : null}
    </div>
  )
}
