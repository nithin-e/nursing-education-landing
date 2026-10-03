export const SITE = {
  name: 'Dr Expert Edulinks',
  tagline: 'Be a doctor by doctors',
  description:
    'Nursing education and professional development platform offering learning resources, clinical guidance, exam and certification information, career pathways and research.',
  email: 'hello@drexpert.example',
  phone: '+91 96563 49000',
  logo: '/images/dr-expert/logo.webp',
  heroImage: '/images/dr-expert/hero-banner.webp',
} as const

/** `tel:` target built from the display number so the two can never drift apart. */
export const TEL_HREF = 'tel:+919656349000'

export type NavItem = {
  label: string
  href: string
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Nursing Resources', href: '#resources' },
  { label: 'Exams & Certifications', href: '#exams' },
  { label: 'Careers', href: '#careers' },
  { label: 'About Us', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

export const POLICY_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms & Conditions', href: '#terms' },
]

export const SOCIAL_LINKS: NavItem[] = [
  { label: 'Facebook', href: '#contact' },
  { label: 'X (Twitter)', href: '#contact' },
  { label: 'LinkedIn', href: '#contact' },
  { label: 'YouTube', href: '#contact' },
]
