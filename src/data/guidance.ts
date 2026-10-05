/**
 * Copy for the guidance section that stands in for the team section while
 * `SHOW_TEAM` is false.
 *
 * UK spelling throughout, to match the Exams, Careers and ticker copy. No claims,
 * no numbers, no named regulators: this section describes how the site helps, not
 * what it guarantees.
 */

export type GuidanceStep = {
  /** Two-digit ordinal, shown as the card's large numeral. */
  number: string
  title: string
  text: string
}

export const GUIDANCE_LABEL = 'How we guide you'

/** Split so `nursing journey` can carry the heavier weight. */
export const GUIDANCE_HEADING_LEAD = 'Support for every stage of your'
export const GUIDANCE_HEADING_EMPHASIS = 'nursing journey'

export const GUIDANCE_TEXT =
  'Clear, responsibly reviewed information, from your first lesson to your next career move.'

export const GUIDANCE_STEPS: GuidanceStep[] = [
  {
    number: '01',
    title: 'Learn',
    text: 'Build a strong foundation with nursing fundamentals and study guides.',
  },
  {
    number: '02',
    title: 'Practise',
    text: 'Understand clinical practice, patient assessment and care planning.',
  },
  {
    number: '03',
    title: 'Prepare',
    text: 'Get a clear picture of exams, licensing steps and certifications.',
  },
  {
    number: '04',
    title: 'Grow',
    text: 'Explore specialisations, leadership and career pathways.',
  },
]