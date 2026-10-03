import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'inverse'

export type ButtonProps = {
  variant?: Variant
  className?: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>

/**
 * Pill buttons. Primary is a solid yellow pill with black text; secondary is an
 * outlined pill; inverse is the black pill used on the yellow community band.
 * The only interaction is a plain colour change on hover.
 * `min-h-12` keeps every button at a 48px tap target.
 */
const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-7 font-semibold whitespace-nowrap transition-colors duration-200'

const variants: Record<Variant, string> = {
  primary: 'bg-amber text-black hover:bg-white',
  outline: 'border border-white/25 text-white hover:border-amber hover:text-amber',
  inverse: 'bg-black text-white hover:bg-white hover:text-black',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  )
}
