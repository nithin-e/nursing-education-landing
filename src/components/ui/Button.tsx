import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'outlineDark' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-ink hover:bg-gold-dark',
  outline: 'border border-charcoal/25 bg-paper text-charcoal hover:border-charcoal/60',
  outlineDark: 'border border-white/30 text-paper hover:border-gold hover:text-gold',
  ghost: 'text-charcoal/70 hover:text-gold-dark',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base',
  lg: 'px-6 py-3 text-[0.95rem] sm:px-7 sm:py-3.5 sm:text-base',
}

export type ButtonProps = {
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>

export default function Button({
  variant = 'primary',
  size = 'md',
  href = '#',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}