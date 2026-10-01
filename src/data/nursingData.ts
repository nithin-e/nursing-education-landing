import type { ComponentType } from 'react'
import {
  Activity,
  Award,
  BookOpen,
  Building2,
  ClipboardCheck,
  Compass,
  FileBadge,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Lightbulb,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

/** Shape shared by every icon-bearing content block on the page. */
export type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>

export type FeatureCard = {
  icon: IconComponent
  title: string
  description: string
  points: string[]
}

export type NewsItem = {
  category: string
  date: string
  readTime: string
  title: string
  description: string
  image: string
  imageAlt: string
}

/* ---------------------------------------------------------------------------
   Hero / trust strip
--------------------------------------------------------------------------- */
export const HERO_STATS: { value: string; label: string }[] = [
  { value: '40+', label: 'Guided learning paths' },
  { value: '120+', label: 'Clinical topic guides' },
  { value: '18', label: 'Career specialisations' },
  { value: '24/7', label: 'Open resource access' },
]

export const HERO_TOPICS: string[] = [
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
export const ABOUT_PILLARS: FeatureCard[] = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'Make high-quality nursing knowledge approachable for every student, nurse and educator who wants to keep learning.',
    points: ['Open educational content', 'Practical clinical guidance', 'Career-aligned learning'],
  },
  {
    icon: Compass,
    title: 'Our Vision',
    description:
      'A future where nursing practice is evidence-led, continuously improving and centred on every patient.',
    points: ['Evidence-led practice', 'Continuous improvement', 'Patient-centred care'],
  },
  {
    icon: HandHeart,
    title: 'Our Commitment',
    description:
      'Support nurses at every stage of their career with clear, trustworthy and responsibly reviewed information.',
    points: ['Clear explanations', 'Responsible sourcing', 'Respectful community'],
  },
]

/* ---------------------------------------------------------------------------
   Featured resources
--------------------------------------------------------------------------- */
export const RESOURCE_CARDS: FeatureCard[] = [
  {
    icon: GraduationCap,
    title: 'Nursing Education',
    description:
      'Learning materials, nursing fundamentals and study resources designed to build a strong clinical foundation.',
    points: ['Anatomy & physiology', 'Nursing fundamentals', 'Study guides'],
  },
  {
    icon: Stethoscope,
    title: 'Clinical Practice',
    description:
      'Practical nursing knowledge covering patient assessment, care delivery and day-to-day clinical guidance.',
    points: ['Patient assessment', 'Care planning', 'Clinical procedures'],
  },
  {
    icon: ShieldCheck,
    title: 'Patient Safety',
    description:
      'Infection prevention, patient safety practices and the standards that protect quality healthcare for everyone.',
    points: ['Infection control', 'Safety protocols', 'Quality improvement'],
  },
  {
    icon: TrendingUp,
    title: 'Professional Development',
    description:
      'Continuous learning, skills development and career growth pathways for practising nursing professionals.',
    points: ['Specialist skills', 'Leadership', 'Career progression'],
  },
]

/* ---------------------------------------------------------------------------
   Exams & certifications
--------------------------------------------------------------------------- */
export const EXAM_CARDS: FeatureCard[] = [
  {
    icon: BookOpen,
    title: 'Nursing Entrance Exams',
    description:
      'Overview of common entrance assessments used by nursing programmes, with preparation strategies and revision planning tips.',
    points: ['Exam formats', 'Preparation roadmap', 'Time management tips'],
  },
  {
    icon: ClipboardCheck,
    title: 'Licensing Examinations',
    description:
      'General information about nursing licensing examinations, application steps and what to expect after registration.',
    points: ['Application stages', 'Test structure', 'Renewal reminders'],
  },
  {
    icon: Award,
    title: 'Professional Certifications',
    description:
      'Explore widely recognised nursing specialisation certificates and the skills each credential reflects in practice.',
    points: ['Speciality credentials', 'Eligibility overview', 'Continuing education'],
  },
]

export const EXAM_DISCLAIMER =
  'Independent educational platform. We are not a licensing authority and do not administer, endorse or guarantee any examination or certification. Always confirm official requirements with your regulatory body.'

/* ---------------------------------------------------------------------------
   Careers
--------------------------------------------------------------------------- */
export const CAREER_TRACKS: FeatureCard[] = [
  {
    icon: HeartPulse,
    title: 'Nursing Specializations',
    description:
      'Compare specialities such as critical care, emergency, theatre, paediatric, community and mental health nursing.',
    points: ['Role descriptions', 'Daily responsibilities', 'Entry focus areas'],
  },
  {
    icon: TrendingUp,
    title: 'Career Development',
   description:
      'Follow progression from student nurse to advanced practice, nurse educator, management and research roles.',
    points: ['Progression ladder', 'Leadership skills', 'Education pathways'],
  },
  {
    icon: Globe2,
    title: 'International Opportunities',
    description:
      'Understand licensing portability, language requirements and cultural competency for nursing practice abroad.',
    points: ['Registration basics', 'Language readiness', 'Cultural competency'],
  },
]

/* ---------------------------------------------------------------------------
   Research & innovation
--------------------------------------------------------------------------- */
export const RESEARCH_CARDS: FeatureCard[] = [
  {
    icon: Microscope,
    title: 'Nursing Research',
    description:
      'How nursing research is designed, conducted and translated into better everyday patient care.',
    points: ['Study design basics', 'Research ethics', 'Publishing guidance'],
  },
  {
    icon: Activity,
    title: 'Evidence-Based Practice',
    description:
      'Practical methods for finding, appraising and applying the best available evidence at the bedside.',
    points: ['Critical appraisal', 'Care protocols', 'Outcome measurement'],
  },
  {
    icon: Lightbulb,
    title: 'Healthcare Innovation',
    description:
      'Explore digital health, simulation, tele-nursing and redesigned models of care that shape future nursing.',
    points: ['Digital health tools', 'Simulation training', 'Care model design'],
  },
]

export const RESEARCH_METHODS: { icon: IconComponent; label: string; text: string }[] = [
  {
    icon: ClipboardCheck,
    label: 'Study design basics',
    text: 'How research questions become well-structured clinical studies.',
  },
  {
    icon: ShieldCheck,
    label: 'Ethical conduct',
    text: 'Informed consent, confidentiality and research integrity explained.',
  },
  {
    icon: Users,
    label: 'Patient partnership',
    text: 'Including patients and families as active partners in healthcare research.',
  },
]

/* ---------------------------------------------------------------------------
   News — illustrative sample content only
--------------------------------------------------------------------------- */
export const NEWS_ITEMS: NewsItem[] = [
  {
    category: 'Nursing Education',
    date: 'Sample article · 12 Mar 2025',
    readTime: '4 min read',
    title: 'Nursing Education Updates',
    description:
      'An illustrative overview of how nursing curricula are shifting toward simulation, competency-based assessment and interprofessional learning.',
    image: '/images/news-education.svg',
    imageAlt: 'Abstract illustration representing nursing education materials',
  },
  {
    category: 'Patient Care',
    date: 'Sample article · 04 Mar 2025',
    readTime: '5 min read',
    title: 'Advances in Patient Care',
    description:
      'Sample content exploring bedside monitoring, care coordination and the measurement tools teams use to track recovery quality.',
    image: '/images/news-patient-care.svg',
    imageAlt: 'Abstract illustration of a heart and care-quality trend line',
  },
  {
    category: 'Events',
    date: 'Sample article · 26 Feb 2025',
    readTime: '3 min read',
    title: 'Nursing Events & Conferences',
    description:
      'A sample guide to the kinds of conferences, workshops and continuing-education events nurses can look for locally.',
    image: '/images/news-events.svg',
    imageAlt: 'Abstract illustration representing a nursing conference calendar',
  },
]

export const NEWS_NOTE =
  'The articles below are placeholder content written to demonstrate layout. They are not real news reports and should be replaced with verified, sourced material before publishing.'

/* ---------------------------------------------------------------------------
   Misc icons reused in several sections
--------------------------------------------------------------------------- */
export const SECTION_ICONS = {
  mission: Sparkles,
  licensing: FileBadge,
  certification: FileBadge,
  hospital: Building2,
  education: GraduationCap,
  research: Microscope,
} as const