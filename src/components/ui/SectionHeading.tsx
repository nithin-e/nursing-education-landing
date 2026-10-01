import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type EyebrowProps = {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * Small section label. Deliberately sentence-case with a short gold rule instead
 * of a letter-spaced uppercase pill, which reads far more like an institutional
 * site and avoids shouting in every section at once.
 */
export function Eyebrow({ children, tone = 'light', className = '' }: EyebrowProps) {
  const tones = {
    dark: 'text-gold',
    light: 'text-gold-dark',
  }

  return (
    <p className={cn('flex items-center gap-2.5 text-[0.8rem] font-semibold', tones[tone], className)}>
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-current opacity-70" />
      {children}
    </p>
  )
}

export type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}

/**
 * Consistent heading → description pair. The description is capped at a readable
 * measure and the gaps stay in the 12–20px range so a heading never drifts away
 * from the paragraph it introduces.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const palettes = {
    dark: { title: 'text-paper', body: 'text-grey' },
    light: { title: 'text-charcoal', body: 'text-charcoal/70' },
  }
  const p = palettes[tone]
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={cn('flex max-w-2xl flex-col gap-3 sm:gap-4', alignment, className)}>
      {eyebrow ? <Eyebrow tone={tone === 'dark' ? 'dark' : 'light'}>{eyebrow}</Eyebrow> : null}
      <h2 className={cn('text-[1.65rem] leading-[1.2] sm:text-[2.1rem] lg:text-[2.35rem]', p.title)}>
        {title}
      </h2>
      {description ? (
        <p className={cn('max-w-[62ch] text-[0.95rem] leading-relaxed sm:text-base', p.body)}>
          {description}
        </p>
      ) : null}
    </div>
  )
}