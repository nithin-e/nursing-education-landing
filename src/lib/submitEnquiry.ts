/**
 * Enquiry submission for the people-card connect modal and the Get Admission
 * sign-up form.
 *
 * TODO: connect this to the real backend. Replace the `console.log` with a
 * `fetch`/EmailJS/Formspree call once the endpoint and credentials exist — no
 * endpoint is invented here.
 */

export type EnquiryPayload = {
  /** The card the enquiry came from. Carried in a hidden form field. */
  contactPerson: string
  /**
   * Where the enquiry was raised, when it did not come from a person card —
   * `get-admission` for the sign-up form. Carried in a hidden form field so the
   * lead source reaches the backend.
   */
  source?: string
  /**
   * Which card or topic prompted the enquiry, e.g. `Nursing Education`. Empty
   * for entry points that are not tied to a specific card.
   */
  interest?: string
  name: string
  email: string
  /** Dialling code including the plus, e.g. `+91`. */
  countryCode: string
  /** Local number, digits only. */
  mobile: string
  education: string
  place: string
  /**
   * The visitor ticked the agreement to be contacted.
   *
   * Recorded rather than merely displayed, because a contact-permission flag is
   * the one part of a lead record a backend needs in order to be defensible.
   * Required by both lead forms, so it is non-optional here.
   */
  consent: boolean
}

export default function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryPayload> {
  console.log('[enquiry] submitEnquiry', payload)

  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 600)
  })
}