import type { ReactNode } from 'react'

export type EyebrowProps = {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

export function Eyebrow({ children, tone = 'light', className = '' }: EyebrowProps) {
  const tones = {
    dark: 'border-white/20 text-gold',
    light: 'border-charcoal/15 text-gold-dark',
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const palettes = {
    dark: { title: 'text-paper', body: 'text-grey' },
    light: { title: 'text-charcoal', body: 'text-charcoal/70' },
  }
  const p = palettes[tone]
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow ? <Eyebrow tone={tone === 'dark' ? 'dark' : 'light'}>{eyebrow}</Eyebrow> : null}
      <h2 className={`text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${p.title}`}>{title}</h2>
      {description ? <p className={`text-base leading-relaxed sm:text-lg ${p.body}`}>{description}</p> : null}
    </div>
  )
}