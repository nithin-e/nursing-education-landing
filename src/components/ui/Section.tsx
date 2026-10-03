import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type Tone = 'black' | 'navy'

/** Alternating band backgrounds: black, then near-black navy, then black. */
const TONES: Record<Tone, string> = {
  black: 'bg-ink',
  navy: 'bg-navy-deep',
}

export type SectionProps = {
  id: string
  tone?: Tone
  className?: string
  children: ReactNode
}

/**
 * Every band on the page. One wrapper guarantees the background, the 56/96px
 * vertical rhythm, the 1200px measure and the `scroll-mt` offset that smooth
 * anchor navigation needs to clear the sticky header.
 */
export default function Section({ id, tone = 'black', className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        /* Header is 84px on a phone and 104px from lg; add 12px so an anchored
           section clears it. */
        'section-pad scroll-mt-[96px] text-white lg:scroll-mt-[116px]',
        TONES[tone],
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}
