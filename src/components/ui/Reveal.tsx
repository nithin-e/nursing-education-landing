import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export type RevealProps = {
  children: ReactNode
  /** Stagger in seconds, applied as delay. */
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'article' | 'section'
}

/**
 * Single subtle entrance animation used across the page. Fully disabled when the
 * visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
  as = 'div',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}