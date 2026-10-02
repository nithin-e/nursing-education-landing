import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'black' | 'soft' | 'navy' | 'custom'

/**
 * Vertical rhythm for the whole page: 56px top and bottom on mobile, opening up
 * to 96px on desktop so the generous spacing reads as deliberate rather than
 * empty. Bands alternate black, near-black and navy to separate sections without
 * ever leaving the dark palette.
 */
export const SECTION_TONES: Record<Tone, string> = {
  black: 'bg-ink text-white',
  soft: 'bg-ink-soft text-white',
  navy: 'bg-navy text-white',
  custom: '',
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
  tone = 'black',
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-pad relative scroll-mt-[calc(4rem+12px+env(safe-area-inset-top))] md:scroll-mt-24',
        SECTION_TONES[tone],
        className,
      )}
    >
      {(tone === 'black' || tone === 'navy') && (
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none ecg-grid opacity-[0.035] before:absolute before:inset-0 before:pointer-events-none before:[mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)] before:content-['']"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
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
