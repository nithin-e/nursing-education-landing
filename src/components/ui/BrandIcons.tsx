import type { SVGProps } from 'react'

/**
 * Minimal brand glyphs. Lucide dropped third-party brand icons, so the four
 * social marks used in the footer are inlined here as original paths.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  width: 18,
  height: 18,
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

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17.2 3h3.3l-7.2 8.3L21.8 21h-6.4l-5-6.5L4.6 21H1.3l7.7-8.8L1.9 3h6.6l4.6 5.9zm-1.2 16h1.8L7.9 4.8H6z" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.9 21H3.5V9.4h3.4zM5.2 8a2 2 0 110-4 2 2 0 010 4zm15.8 13h-3.4v-5.6c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V21H10.7V9.4H14v1.6h.05c.4-.8 1.4-1.7 3-1.7 2.2 0 4 1.4 4 4.5z" />
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

export const BRAND_ICONS = {
  Facebook: FacebookIcon,
  'X (Twitter)': XIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
} as const