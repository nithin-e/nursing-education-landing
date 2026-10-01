import type { ReactNode } from 'react'

type Tone = 'light' | 'dark' | 'mist'

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
 * the `scroll-mt` offset required by smooth anchor navigation.
 */
export default function Section({
  id,
  tone = 'light',
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${SECTION_TONES[tone].root} ${className}`}>
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
  return <div className={`container-page ${className}`}>{children}</div>
}