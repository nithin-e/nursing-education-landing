import { EMAIL, PHONE_DISPLAY } from '@/data/contact'

export const SITE = {
  name: 'Dr Expert Edulinks',
  email: EMAIL,
  phone: PHONE_DISPLAY,
  logo: '/images/dr-expert/logo.webp',
  heroImage: '/images/dr-expert/hero-banner.webp',
} as const

/**
 * Amber pill above the hero headline, and the string the old `SITE.tagline`
 * used to hold.
 *
 * This is the one line of brand copy a visitor reads before anything else, so it
 * is held here rather than typed into the hero. It states who the site is for -
 * nurses - instead of the previous line, which described doctors.
 */
export const TAGLINE = 'Supporting nurses at every stage'

/**
 * Page and social title. A pipe rather than a dash, so it reads cleanly in a
 * browser tab, in a search result and in a WhatsApp link preview alike.
 *
 * `index.html` cannot import this, so the same string is written out there. Keep
 * the two in step.
 */
export const SITE_TITLE = 'Dr Expert Edulinks | Nursing Education & Career Guidance'

/**
 * Production origin, used for absolute URLs. Open Graph requires them: a
 * relative `og:image` is ignored by every scraper.
 *
 * Update when the final domain is live.
 */
export const SITE_URL = 'https://nursing-education-landing.vercel.app'

/**
 * Shown under the submit button on both lead forms.
 *
 * It says who will contact the visitor and that the details are only used to
 * reply. It is deliberately not a link: there is no privacy page to point at,
 * and a link to a page that does not exist would be worse than plain text.
 */
export const CONSENT_TEXT =
  'By submitting this form you agree to be contacted by Dr Expert Edulinks about your enquiry. We use your details only to respond to you.'

export type NavItem = {
  label: string
  href: string
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Nursing Resources', href: '#resources' },
  { label: 'Exams & Certifications', href: '#exams' },
  { label: 'Careers', href: '#careers' },
  { label: 'Research', href: '#research' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export type SocialIcon = 'facebook' | 'instagram' | 'youtube' | 'linkedin'

/** Opens in a new tab from the footer, so each href is absolute and real. */
export const SOCIAL_LINKS: { label: string; href: string; icon: SocialIcon }[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/drexpertedulinks',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dr.expert_edulinks/',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Dr.ExpertEdulinks',
    icon: 'youtube',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/dr-expert-edulinks',
    icon: 'linkedin',
  },
]