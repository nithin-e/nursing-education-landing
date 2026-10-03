import { getImage } from './images'
import type { ImageSlot } from './images'

/**
 * People cards content.
 *
 * Replace these placeholders with real profiles (name, photo, location) when
 * available.
 *
 * There is no real person in this file. `name` is a role label assembled only
 * from words that already appear in the Careers copy, `tag` is one of the six
 * specialities that Careers already lists, and `role` is a verbatim line from
 * `CAREER_ITEMS`. There are no ratings, no testimonials and no locations —
 * `location` is empty on every entry, and the card renders nothing for it.
 *
 * `photo` resolves through the central image map, which points at the four
 * photographs that actually exist in `public/images/`. The brief's
 * `nursing-1.jpg` … `nursing-6.jpg` files were never supplied, and the logo and
 * hero assets are deliberately excluded.
 */

export type Person = {
  id: string
  photo: string
  name: string
  role: string
  location: string
  tag: string
  whatsapp: string
  messageText: string
}

/** `Careers` → `Nursing Specializations`, unchanged. */
const ROLE_SPECIALISATIONS =
  'Critical care, emergency, theatre, paediatric, community and mental health nursing.'

/** `Careers` → `Career Development`, unchanged. */
const ROLE_PROGRESSION =
  'Progression from student nurse to advanced practice, education, management and research.'

/** `Careers` → `International Opportunities`, unchanged. */
const ROLE_INTERNATIONAL =
  'Licensing portability, language requirements and cultural competency for practice abroad.'

const WHATSAPP = '919656349000'

const MESSAGE =
  'Hello, I would like to know more about nursing specializations and career pathways.'

/** Slot order chosen so repeated files are never adjacent. */
const PHOTO_SLOTS: ImageSlot[] = [
  'researchCard1',
  'researchCard2',
  'researchCard3',
  'aboutMain',
  'resourcesBanner',
  'examsMain',
]

function photoFor(index: number): string {
  return getImage(PHOTO_SLOTS[index % PHOTO_SLOTS.length])?.source.src ?? ''
}

export const PEOPLE: Person[] = [
  {
    id: 'critical-care',
    photo: photoFor(0),
    name: 'Critical Care Nurse',
    role: ROLE_SPECIALISATIONS,
    location: '',
    tag: 'Critical care',
    whatsapp: WHATSAPP,
    messageText: MESSAGE,
  },
  {
    id: 'emergency',
    photo: photoFor(1),
    name: 'Emergency Nurse',
    role: ROLE_SPECIALISATIONS,
    location: '',
    tag: 'Emergency',
    whatsapp: WHATSAPP,
    messageText: MESSAGE,
  },
  {
    id: 'theatre',
    photo: photoFor(2),
    name: 'Theatre Nurse',
    role: ROLE_PROGRESSION,
    location: '',
    tag: 'Theatre',
    whatsapp: WHATSAPP,
    messageText: MESSAGE,
  },
  {
    id: 'paediatric',
    photo: photoFor(3),
    name: 'Paediatric Nurse',
    role: ROLE_PROGRESSION,
    location: '',
    tag: 'Paediatric',
    whatsapp: WHATSAPP,
    messageText: MESSAGE,
  },
  {
    id: 'community',
    photo: photoFor(4),
    name: 'Community Nurse',
    role: ROLE_INTERNATIONAL,
    location: '',
    tag: 'Community',
    whatsapp: WHATSAPP,
    messageText: MESSAGE,
  },
  {
    id: 'mental-health',
    photo: photoFor(5),
    name: 'Mental Health Nurse',
    role: ROLE_INTERNATIONAL,
    location: '',
    tag: 'Mental health',
    whatsapp: WHATSAPP,
    messageText: MESSAGE,
  },
]