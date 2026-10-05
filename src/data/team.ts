/**
 * Bios are shortened; confirm wording and facts with Dr Expert before publishing.
 */

/**
 * Set to true only after real, approved nursing leadership bios are added.
 *
 * While this is false the section that would mount `TEAM` renders
 * `GuidanceSteps` instead, so no MBBS or doctor biography reaches the page.
 */
export const SHOW_TEAM = false

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  facebook?: string
  instagram?: string
}

export const TEAM: TeamMember[] = [
  {
    id: 'mohammed-huzair',
    name: 'Dr Mohammed Huzair',
    role: 'Founder & Managing Director',
    bio: 'A decade of leadership guiding students worldwide toward medical education, backed by a 100% commitment to educational excellence.',
    photo: '/images/huzair.webp',
    facebook: 'https://www.facebook.com/Dr.mohammedhuzair/',
    instagram: 'https://www.instagram.com/dr.huzair/',
  },
  {
    id: 'razeen-arayilakath',
    name: 'Dr Razeen Arayilakath',
    role: 'Director',
    bio: 'An MBBS and MBA in hospital management who blends medical and managerial skills to lead the team.',
    photo: '/images/razneen.webp',
    facebook: 'https://www.facebook.com/razeen.arayilakath/',
    instagram: 'https://www.instagram.com/_r__z__a__/',
  },
  {
    id: 'christel-bridget-maria',
    name: 'Dr Christel Bridget Maria',
    role: 'Associate Director',
    bio: 'An MBBS graduate who channels her passion for education and medical expertise to empower students.',
    photo: '/images/director.webp',
  },
]