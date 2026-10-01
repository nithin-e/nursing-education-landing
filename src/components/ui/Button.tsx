import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'outlineDark' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold text-ink shadow-[0_10px_30px_-12px_rgba(255,191,0,0.85)] hover:bg-gold-dark hover:shadow-[0_14px_36px_-12px_rgba(255,191,0,0.95)]',
  outline:
    'border border-charcoal/25 bg-transparent text-charcoal hover:border-gold hover:text-gold-dark',
  outlineDark: 'border border-white/30 text-paper hover:border-gold hover:text-gold',
  ghost: 'text-charcoal/70 hover:text-gold-dark',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-7 py-3.5 text-base sm:text-lg',
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
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}