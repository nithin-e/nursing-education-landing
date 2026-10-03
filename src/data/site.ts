import { EMAIL, PHONE_DISPLAY } from '@/data/contact'

export const SITE = {
  name: 'Dr Expert Edulinks',
  tagline: 'Be a doctor by doctors',
  email: EMAIL,
  phone: PHONE_DISPLAY,
  logo: '/images/dr-expert/logo.webp',
  heroImage: '/images/dr-expert/hero-banner.webp',
} as const

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