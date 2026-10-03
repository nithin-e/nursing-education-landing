import type { SVGProps } from 'react'

/**
 * Minimal brand glyphs. Lucide dropped third-party brand icons, so the four
 * social marks in the footer are inlined here as original paths.
 *
 * Sized entirely by the caller's `className` — the wrapper owns the 44px tap
 * target, so no intrinsic `width`/`height` is set here.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true as const,
  focusable: 'false' as const,
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.45-.13-2.4 0-4.05 1.5-4.05 4.2V9.9H7.5V13h2.7v8z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 5.18a4.66 4.66 0 100 9.32 4.66 4.66 0 000-9.32zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm5.72-7.6a1.09 1.09 0 100 2.18 1.09 1.09 0 000-2.18z" />
    </svg>
  )
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21.6 7.6a2.5 2.5 0 00-1.75-1.77C18.3 5.4 12 5.4 12 5.4s-6.3 0-7.85.43A2.5 2.5 0 002.4 7.6C2 9.16 2 12 2 12s0 2.84.4 4.4a2.5 2.5 0 001.75 1.77C5.7 18.6 12 18.6 12 18.6s6.3 0 7.85-.43a2.5 2.5 0 001.75-1.77c.4-1.56.4-4.4.4-4.4s0-2.84-.4-4.4zM10 15V9l5.2 3z" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.9 21H3.5V9.4h3.4zM5.2 8a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM21 13.5v7.5h-3.4v-7c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8v7.3h-3.4V9.4H14v1.6h.05c.4-.8 1.4-1.7 3-1.7 2.2 0 4 1.4 4 4z" />
    </svg>
  )
}

export const BRAND_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
} as const