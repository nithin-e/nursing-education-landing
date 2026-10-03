/**
 * Every string below is text that already existed on the site, recovered from
 * the pre-rebrand content. Nothing is invented: no statistics, testimonials,
 * ratings, student names or university names.
 */

export type ListItem = {
  title: string
  summary: string
}

/* ---------------------------------------------------------------------------
   Home
   --------------------------------------------------------------------------- */
export const HERO_LABEL = 'Empowering nursing professionals'

export const HERO_HEADLINE = ['Empowering ', 'Nurses.']

export const HERO_HEADLINE_2 = ['Advancing ', 'Healthcare.']

export const HERO_TEXT =
  'Discover nursing education, clinical resources, career opportunities and the knowledge you need to make a difference in healthcare.'

/* ---------------------------------------------------------------------------
   Ticker — the former "Popular learning areas" phrases, now a slim strip.
   --------------------------------------------------------------------------- */
export const TICKER_ITEMS: string[] = [
  'Nursing Fundamentals',
  'Patient Safety',
  'Clinical Skills',
  'Care Planning',
  'Evidence-Based Practice',
  'Licensing Preparation',
  'Leadership',
  'Patient Education',
]

/* ---------------------------------------------------------------------------
   About
   --------------------------------------------------------------------------- */
export const ABOUT_TEXT =
  'Explore a platform dedicated to nursing education, professional development, clinical excellence and advancing quality patient care.'

export const ABOUT_ROWS: ListItem[] = [
  {
    title: 'Our Mission',
    summary:
      'Make high-quality nursing knowledge approachable for every student, nurse and educator who wants to keep learning.',
  },
  {
    title: 'Our Vision',
    summary:
      'A future where nursing practice is evidence-led, continuously improving and centred on every patient.',
  },
  {
    title: 'Our Commitment',
    summary:
      'Support nurses at every stage of their career with clear, trustworthy and responsibly reviewed information.',
  },
]

/** The only figures anywhere on the site. Nothing new was invented. */
export const STATS: { value: string; label: string }[] = [
  { value: '40+', label: 'Guided learning paths' },
  { value: '120+', label: 'Clinical topic guides' },
  { value: '18', label: 'Career specialisations' },
  { value: '24/7', label: 'Open resource access' },
]

/* ---------------------------------------------------------------------------
   Community banner
   --------------------------------------------------------------------------- */
export const COMMUNITY_TITLE = 'Be part of the nursing community'

export const COMMUNITY_TEXT =
  'Connect with learning resources, discover opportunities and stay informed about developments in nursing.'

/* ---------------------------------------------------------------------------
   Nursing resources
   --------------------------------------------------------------------------- */
export const RESOURCE_ITEMS: ListItem[] = [
  {
    title: 'Nursing Education',
    summary: 'Learning materials and study resources designed to build a strong clinical foundation.',
  },
  {
    title: 'Clinical Practice',
    summary: 'Practical knowledge covering patient assessment, care delivery and day-to-day guidance.',
  },
  {
    title: 'Patient Safety',
    summary: 'Infection prevention, safety practices and the standards that protect quality healthcare.',
  },
  {
    title: 'Professional Development',
    summary: 'Continuous learning, skills development and career growth pathways.',
  },
]

/* ---------------------------------------------------------------------------
   Exams & certifications
   --------------------------------------------------------------------------- */
export const EXAM_ITEMS: ListItem[] = [
  {
    title: 'Nursing Entrance Exams',
    summary: 'Common entrance assessments used by nursing programmes, with preparation strategies.',
  },
  {
    title: 'Licensing Examinations',
    summary: 'Information about nursing licensing examinations, application steps and registration.',
  },
  {
    title: 'Professional Certifications',
    summary: 'Widely recognised nursing specialisation certificates and the skills each one reflects.',
  },
]

export const EXAM_DISCLAIMER =
  'Independent educational platform. We are not a licensing authority and do not administer, endorse or guarantee any examination or certification. Always confirm official requirements with your regulatory body.'

/** Sits on the glass card over the Exams collage. */
export const EXAM_GLASS_TEXT = 'Exam formats, application stages and renewal reminders.'

/* ---------------------------------------------------------------------------
   Careers
   --------------------------------------------------------------------------- */
export const CAREER_ITEMS: ListItem[] = [
  {
    title: 'Nursing Specializations',
    summary: 'Critical care, emergency, theatre, paediatric, community and mental health nursing.',
  },
  {
    title: 'Career Development',
    summary: 'Progression from student nurse to advanced practice, education, management and research.',
  },
  {
    title: 'International Opportunities',
    summary: 'Licensing portability, language requirements and cultural competency for practice abroad.',
  },
]

/* ---------------------------------------------------------------------------
   Research
   --------------------------------------------------------------------------- */
export const RESEARCH_ITEMS: ListItem[] = [
  {
    title: 'Nursing Research',
    summary: 'How research is designed, conducted and translated into better everyday patient care.',
  },
  {
    title: 'Evidence-Based Practice',
    summary: 'Finding, appraising and applying the best available evidence at the bedside.',
  },
  {
    title: 'Healthcare Innovation',
    summary: 'Digital health, simulation, tele-nursing and redesigned models of care.',
  },
]
