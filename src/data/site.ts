export const SITE = {
  name: 'Nursing Insights',
  tagline: 'Empowering Nurses. Advancing Healthcare.',
  description:
    'A nursing education and professional development platform for learning resources, clinical guidance, exam information, careers, research and community.',
  email: 'hello@nursinginsights.example',
  phone: '+1 (000) 000-0000',
  location: 'Healthcare Education Hub, Your City',
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

export const RESOURCE_LINKS: NavItem[] = [
  { label: 'Nursing Education', href: '#resources' },
  { label: 'Clinical Practice', href: '#resources' },
  { label: 'Patient Safety', href: '#resources' },
  { label: 'Professional Development', href: '#resources' },
  { label: 'Research & Innovation', href: '#research' },
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