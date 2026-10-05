/**
 * General guidance only. Confirm every answer with Dr Expert before publishing.
 * Do not add fees, pass rates or guarantees without approval.
 */

export type FaqItem = {
  /** Slug, used to build the `id`, `aria-controls` and `aria-labelledby` pairs. */
  id: string
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-we-do',
    question: 'How does Dr Expert Edulinks help nursing students and nurses?',
    answer:
      'We guide you through your options step by step, from choosing a nursing course or pathway to understanding exams, registration and career routes, with advice from experienced professionals.',
  },
  {
    id: 'exams-and-certifications',
    question: 'Which nursing exams and certifications can I get guidance on?',
    answer:
      'We share general information on nursing entrance exams, licensing examinations and professional certifications, including formats, application stages and preparation tips.',
  },
  {
    id: 'careers-and-specializations',
    question: 'Can I get guidance on nursing careers and specializations?',
    answer:
      'Yes. We explain roles such as critical care, emergency, theatre, paediatric, community and mental health nursing, and how a nursing career can progress over time.',
  },
  {
    id: 'nursing-jobs-abroad',
    question: 'Do you offer guidance for nursing jobs abroad?',
    answer:
      'We provide general information on international opportunities, including licensing portability and language requirements. Rules differ by country, so always confirm the official requirements with the relevant regulator.',
  },
  {
    id: 'official-body',
    question: 'Is this website an official licensing or examination body?',
    answer:
      'No. We are an independent educational platform. We do not administer, endorse or guarantee any examination or certification.',
  },
  {
    id: 'talk-to-us',
    question: 'How can I talk to someone from the team?',
    answer:
      'Use the Get Admission button to leave your details, or call or message us on WhatsApp using the buttons on this page. Our team will get back to you.',
  },
]