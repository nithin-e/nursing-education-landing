import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'outlineDark' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

/**
 * Pill buttons throughout the site. Primary is a solid amber pill with a soft
 * amber glow on hover; outline variants are transparent with a 20% white hairline.
 *
 * `:active` carries the tap feedback for touch, where `:hover` never fires. It is
 * a press state rather than a hover state, so it applies on a mouse press too.
 */
const base =
  'group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-250 ease-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px active:scale-[0.97]'

const variants: Record<Variant, string> = {
  primary:
    'bg-amber text-ink hover:bg-amber-deep hover:shadow-[0_0_0_4px_rgb(255_193_7/0.18),0_12px_32px_-12px_rgb(255_193_7/0.55)] active:shadow-[0_0_0_4px_rgb(255_193_7/0.28)]',
  outline: 'border border-white/20 text-white hover:border-amber hover:text-amber',
  outlineDark: 'border border-white/20 text-white hover:border-amber hover:text-amber',
  ghost: 'text-body hover:text-amber',
}

const sizes: Record<Size, string> = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-4 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
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
