/**
 * DRAFT copy. A practising nurse or the Dr Expert team must review every
 * sentence before launch.
 *
 * The only place detail-view copy lives. Components read ids from here and never
 * inline the text, so a wording change is one edit and the id-to-card mapping
 * cannot drift.
 *
 * House rules for every field below, applied deliberately:
 * - UK spelling, general educational wording.
 * - No statistics, pass rates, fees, dates, durations, rankings, guarantees or
 *   "best"/"leading" claims.
 * - No exam, regulator, country, hospital or university is named.
 * - No clinical instructions, dosages or procedures.
 * - Every topic is one plain sentence of at most 25 words.
 *
 * `title` is kept verbatim from the card it belongs to. That is the one place
 * US spelling survives ("Nursing Specializations"), because these strings are
 * identifiers for the backend lead record and the "Next:" links, not prose - and
 * a card whose label disagreed with its detail panel would read as a bug.
 */

export type DetailGroup = 'Nursing Resources' | 'Exams & Certifications' | 'Careers' | 'Research'

export type Detail = {
  /** Matches the `key` in `DETAILS` and the card's button. */
  id: string
  group: DetailGroup
  title: string
  overview: string
  topics: { title: string; text: string }[]
  /** One sentence on who this helps. */
  audience: string
  /**
   * Shows the site's existing `EXAM_DISCLAIMER` above the buttons.
   *
   * True for the three exam items and International Opportunities: anything
   * touching an assessment or working abroad carries an explicit
   * confirm-with-the-official-body caveat.
   */
  showDisclaimer: boolean
}

/** Which section each group belongs to, for the panel's "Back to {group}" link. */
export const SECTION_BY_GROUP: Record<DetailGroup, string> = {
  'Nursing Resources': 'resources',
  'Exams & Certifications': 'exams',
  Careers: 'careers',
  Research: 'research',
}

export const DETAILS: Record<string, Detail> = {
  /* -----------------------------------------------------------------------
     Nursing Resources
     ----------------------------------------------------------------------- */
  'nursing-education': {
    id: 'nursing-education',
    group: 'Nursing Resources',
    title: 'Nursing Education',
    overview: 'Learning materials and study resources designed to build a strong clinical foundation.',
    topics: [
      {
        title: 'Anatomy & physiology',
        text: 'Build a working understanding of how the body systems function and how structures relate to normal health.',
      },
      {
        title: 'Nursing fundamentals',
        text: 'Understand the core principles that underpin everyday nursing care and how they are applied.',
      },
      {
        title: 'Study guides',
        text: 'Find organised revision material that helps you plan study time and check your understanding.',
      },
    ],
    audience: 'Nursing students at the start of their programme, and newly qualified nurses building confidence.',
    showDisclaimer: false,
  },

  'clinical-practice': {
    id: 'clinical-practice',
    group: 'Nursing Resources',
    title: 'Clinical Practice',
    overview: 'Practical knowledge covering patient assessment, care delivery and day-to-day guidance.',
    topics: [
      {
        title: 'Patient assessment',
        text: 'Learn how a structured assessment gathers the information that shapes an individual plan of care.',
      },
      {
        title: 'Care planning',
        text: 'See how goals, interventions and reviews come together into a plan focused on the individual.',
      },
      {
        title: 'Clinical procedures',
        text: 'Understand why standard procedures exist, what they are for and how they are documented.',
      },
    ],
    audience: 'Nurses working in any setting who want to strengthen their everyday clinical reasoning.',
    showDisclaimer: false,
  },

  'patient-safety': {
    id: 'patient-safety',
    group: 'Nursing Resources',
    title: 'Patient Safety',
    overview: 'Infection prevention, safety practices and the standards that protect quality healthcare.',
    topics: [
      {
        title: 'Infection control',
        text: 'Understand the principles behind preventing infection and the practices that support them.',
      },
      {
        title: 'Safety protocols',
        text: 'Learn how written protocols reduce risk and why following them consistently matters.',
      },
      {
        title: 'Quality improvement',
        text: 'Explore how care is measured, reviewed and adjusted to improve outcomes over time.',
      },
    ],
    audience: 'Nurses, students and healthcare teams with a shared interest in safer care.',
    showDisclaimer: false,
  },

  'professional-development': {
    id: 'professional-development',
    group: 'Nursing Resources',
    title: 'Professional Development',
    overview: 'Continuous learning, skills development and career growth pathways.',
    topics: [
      {
        title: 'Specialist skills',
        text: 'Identify the skills that develop as your practice widens and plan how to build them.',
      },
      {
        title: 'Leadership',
        text: 'Consider the skills that support leadership, from clear communication to supporting colleagues.',
      },
      {
        title: 'Career progression',
        text: 'Map possible routes through your career and the evidence each step usually asks for.',
      },
    ],
    audience: 'Experienced nurses thinking about their next step or a change of direction.',
    showDisclaimer: false,
  },

  /* -----------------------------------------------------------------------
     Exams & Certifications
     ----------------------------------------------------------------------- */
  'nursing-entrance-exams': {
    id: 'nursing-entrance-exams',
    group: 'Exams & Certifications',
    title: 'Nursing Entrance Exams',
    overview: 'Common entrance assessments used by nursing programmes, with preparation strategies.',
    topics: [
      {
        title: 'Exam formats',
        text: 'Understand the general format of entrance assessments and how questions are usually structured.',
      },
      {
        title: 'Preparation roadmap',
        text: 'Lay out a realistic study sequence so you can see what to cover and in what order.',
      },
      {
        title: 'Time management tips',
        text: 'Practise allocating time across sections so you approach the paper calmly and steadily.',
      },
    ],
    audience: 'Applicants preparing to enter a nursing programme.',
    showDisclaimer: true,
  },

  'licensing-examinations': {
    id: 'licensing-examinations',
    group: 'Exams & Certifications',
    title: 'Licensing Examinations',
    overview: 'Information about nursing licensing examinations, application steps and registration.',
    topics: [
      {
        title: 'Application stages',
        text: 'Follow the usual stages of an application so you know what to prepare at each step.',
      },
      {
        title: 'Test structure',
        text: 'See how a licensing assessment is generally organised and what it aims to cover.',
      },
      {
        title: 'Renewal reminders',
        text: 'Understand why registration is renewed periodically and how to keep track of the process.',
      },
    ],
    audience: 'Nursing students and recently registered nurses approaching registration.',
    showDisclaimer: true,
  },

  'professional-certifications': {
    id: 'professional-certifications',
    group: 'Exams & Certifications',
    title: 'Professional Certifications',
    overview: 'Widely recognised nursing specialisation certificates and the skills each one reflects.',
    topics: [
      {
        title: 'Speciality credentials',
        text: 'Compare how specialist certificates are structured and what each one signals about practice.',
      },
      {
        title: 'Eligibility overview',
        text: 'Understand the general entry expectations that commonly apply to specialist certificates.',
      },
      {
        title: 'Continuing education',
        text: 'Learn how ongoing study is planned and recorded as part of keeping your knowledge current.',
      },
    ],
    audience: 'Registered nurses considering a specialist area of practice.',
    showDisclaimer: true,
  },

  /* -----------------------------------------------------------------------
     Careers
     ----------------------------------------------------------------------- */
  'nursing-specializations': {
    id: 'nursing-specializations',
    group: 'Careers',
    title: 'Nursing Specializations',
    overview: 'Critical care, emergency, theatre, paediatric, community and mental health nursing.',
    topics: [
      {
        title: 'Role descriptions',
        text: 'See how nursing roles differ in focus, setting and the work that dominates each day.',
      },
      {
        title: 'Daily responsibilities',
        text: 'Understand what a typical shift involves and how responsibilities are shared within a team.',
      },
      {
        title: 'Entry focus areas',
        text: 'Explore the areas of practice that each specialism tends to emphasise and why.',
      },
    ],
    audience: 'Nursing students and early-career nurses choosing an area of focus.',
    showDisclaimer: false,
  },

  'career-development': {
    id: 'career-development',
    group: 'Careers',
    title: 'Career Development',
    overview: 'Progression from student nurse to advanced practice, education, management and research.',
    topics: [
      {
        title: 'Progression ladder',
        text: 'Understand the usual stages of a nursing career and what each stage involves.',
      },
      {
        title: 'Leadership skills',
        text: 'Explore the communication and decision-making skills that nursing leadership asks for.',
      },
      {
        title: 'Education pathways',
        text: 'Look at the study routes that can open roles in education, practice development or research.',
      },
    ],
    audience: 'Nurses considering advanced practice, education, management or research roles.',
    showDisclaimer: false,
  },

  'international-opportunities': {
    id: 'international-opportunities',
    group: 'Careers',
    title: 'International Opportunities',
    overview: 'Licensing portability, language requirements and cultural competency for practice abroad.',
    topics: [
      {
        title: 'Licensing portability',
        text: 'Understand what portability can mean generally and why requirements differ between places.',
      },
      {
        title: 'Language requirements',
        text: 'Consider how language needs are generally assessed and how to prepare for them.',
      },
      {
        title: 'Cultural competency',
        text: 'Learn why cultural understanding matters when you move into a new community.',
      },
    ],
    audience: 'Nurses and nursing students considering working in another country.',
    showDisclaimer: true,
  },

  /* -----------------------------------------------------------------------
     Research
     ----------------------------------------------------------------------- */
  'nursing-research': {
    id: 'nursing-research',
    group: 'Research',
    title: 'Nursing Research',
    overview: 'How research is designed, conducted and translated into better everyday patient care.',
    topics: [
      {
        title: 'Study design basics',
        text: 'Understand how a study question shapes the design chosen to answer it.',
      },
      {
        title: 'Research ethics',
        text: 'Explore the ethical considerations that apply before research involving people begins.',
      },
      {
        title: 'Publishing guidance',
        text: 'Learn how findings are prepared and shared so other nurses can use them.',
      },
    ],
    audience: 'Nurses interested in research and in reading evidence critically.',
    showDisclaimer: false,
  },

  'evidence-based-practice': {
    id: 'evidence-based-practice',
    group: 'Research',
    title: 'Evidence-Based Practice',
    overview: 'Finding, appraising and applying the best available evidence at the bedside.',
    topics: [
      {
        title: 'Critical appraisal',
        text: 'Learn how to judge whether a study is well designed and worth trusting.',
      },
      {
        title: 'Care protocols',
        text: 'Understand how guidance is turned into written protocols teams can follow.',
      },
      {
        title: 'Outcome measurement',
        text: 'See how chosen measures show whether care is making a difference.',
      },
    ],
    audience: 'Nurses who want to bring research evidence into everyday decisions.',
    showDisclaimer: false,
  },

  'healthcare-innovation': {
    id: 'healthcare-innovation',
    group: 'Research',
    title: 'Healthcare Innovation',
    overview: 'Digital health, simulation, tele-nursing and redesigned models of care.',
    topics: [
      {
        title: 'Digital health tools',
        text: 'Explore how digital tools are used in care and what to consider when using them.',
      },
      {
        title: 'Simulation training',
        text: 'Understand how simulated practice helps build confidence before joining a clinical team.',
      },
      {
        title: 'Care model design',
        text: 'Consider how care is organised differently to meet changing needs.',
      },
    ],
    audience: 'Nurses, educators and teams thinking about improving how care is delivered.',
    showDisclaimer: false,
  },
}

/** Ids in `DETAILS`, in display order. Powers the "Next:" link. */
export const DETAIL_IDS = Object.keys(DETAILS)

/**
 * Ids belonging to one group, in display order.
 *
 * Order follows `DETAIL_IDS`, so "Next" walks the group in the same order the
 * cards appear on the page.
 */
export function idsInGroup(group: DetailGroup): string[] {
  return DETAIL_IDS.filter((id) => DETAILS[id].group === group)
}

/** True only for an id that has an entry. Unknown ids are ignored, silently. */
export function hasDetail(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(DETAILS, id)
}