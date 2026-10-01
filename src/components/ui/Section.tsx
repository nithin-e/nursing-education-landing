import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'light' | 'dark' | 'mist'

/**
 * Vertical rhythm for the whole page. Mobile sits between 48px and 64px so
 * consecutive sections read as one continuous document instead of separate
 * slabs of empty space; desktop opens up to 96px for a calmer rhythm.
 */
const SECTION_PADDING = 'py-12 sm:py-16 lg:py-24'

export const SECTION_TONES: Record<Tone, { root: string; heading: string; body: string }> = {
  light: { root: 'bg-paper text-charcoal', heading: 'text-charcoal', body: 'text-charcoal/70' },
  dark: { root: 'bg-ink text-paper', heading: 'text-paper', body: 'text-grey' },
  mist: { root: 'bg-mist text-charcoal', heading: 'text-charcoal', body: 'text-charcoal/70' },
}

export type SectionProps = {
  id: string
  tone?: Tone
  className?: string
  children: ReactNode
}

/**
 * Single wrapper that guarantees consistent vertical rhythm, background tone and
 * the `scroll-mt` offset required by smooth anchor navigation. Sections opt into
 * a different cadence through `className` instead of repeating padding classes.
 */
export default function Section({
  id,
  tone = 'light',
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-20', SECTION_PADDING, SECTION_TONES[tone].root, className)}>
      {children}
    </section>
  )
}

export function SectionBody({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('container-page', className)}>{children}</div>
}