import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import { registerReveal, useRevealChildren } from '@/lib/useReveal'

export type RevealProps = {
  children: ReactNode
  /** Stagger in seconds, applied as a transition delay. */
  delay?: number
  /** Distance in pixels the block travels up into place. */
  y?: number
  className?: string
}

/**
 * Fades a block up into place the first time it scrolls into view. No animation
 * library involved — the transition itself lives in index.css and this component
 * only toggles a class via IntersectionObserver.
 */
export default function Reveal({ children, delay = 0, y = 24, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(
    () =>
      registerReveal(ref.current!, () => {
        ref.current?.classList.add('is-visible')
      }),
    [],
  )

  const style: CSSProperties | undefined =
    delay || y !== 24
      ? ({
          ...(delay ? { transitionDelay: `${delay * 1000}ms` } : {}),
          '--reveal-y': `${y}px`,
        } as CSSProperties)
      : undefined

  return (
    <div ref={ref} data-reveal="" style={style} className={className}>
      {children}
    </div>
  )
}

export type RevealGroupProps = {
  children: ReactNode
  className?: string
}

/**
 * Reveal variant for lists and grids: every direct child fades up on its own and
 * the 80ms stagger comes from `data-reveal-stagger` in index.css.
 */
export function RevealGroup({ children, className = '' }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  useRevealChildren(ref)
  return (
    <div ref={ref} data-reveal-group="" data-reveal-stagger="" className={className}>
      {children}
    </div>
  )
}
