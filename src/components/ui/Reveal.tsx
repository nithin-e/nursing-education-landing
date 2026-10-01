import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export type RevealProps = {
  children: ReactNode
  /** Stagger in seconds, applied as delay. */
  delay?: number
  y?: number
  className?: string
}

/**
 * Single subtle entrance animation, applied once per section block rather than to
 * every tile. Fully disabled when the visitor prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '' }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}