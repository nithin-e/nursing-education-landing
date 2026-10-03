/**
 * Enquiry submission for the people-card connect modal.
 *
 * TODO: connect this to the real backend. Replace the `console.log` with a
 * `fetch`/EmailJS/Formspree call once the endpoint and credentials exist — no
 * endpoint is invented here.
 */

export type EnquiryPayload = {
  /** The card the enquiry came from. Carried in a hidden form field. */
  contactPerson: string
  name: string
  email: string
  /** Dialling code including the plus, e.g. `+91`. */
  countryCode: string
  /** Local number, digits only. */
  mobile: string
  education: string
  place: string
}

export default function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryPayload> {
  console.log('[enquiry] submitEnquiry', payload)

  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 600)
  })
}