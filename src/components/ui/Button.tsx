import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'inverse'

type SharedProps = {
  variant?: Variant
  className?: string
  children: ReactNode
}

/**
 * Pill buttons. Primary is a solid yellow pill with black text; secondary is an
 * outlined pill; inverse is the black pill used on the yellow community band.
 * The only interaction is a plain colour change on hover.
 * `min-h-12` keeps every button at a 48px tap target.
 */
export type ButtonProps = SharedProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>)
    | (Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: never })
  )

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-7 font-semibold whitespace-nowrap transition-colors duration-200'

const variants: Record<Variant, string> = {
  primary: 'bg-amber text-black hover:bg-white',
  outline: 'border border-white/25 text-white hover:border-amber hover:text-amber',
  inverse: 'bg-black text-white hover:bg-white hover:text-black',
}

/**
 * Renders an `<a>` when given an `href`, and a `<button>` otherwise. Buttons
 * that open the enquiry dialog must be real buttons: an anchor would need a
 * `href` to be keyboard reachable, and pointing one at `#` would also add a
 * history entry and scroll the page to the top.
 */
export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props
  const classes = cn(base, variants[variant], className)

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
