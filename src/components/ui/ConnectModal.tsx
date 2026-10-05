import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent, ReactNode } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

import { EMAIL_PATTERN } from './ContactForm'
import { CONSENT_TEXT } from '@/data/site'
import submitEnquiry from '@/lib/submitEnquiry'
import type { EnquiryPayload } from '@/lib/submitEnquiry'

/** Dialling codes offered next to the number field. Codes only, no flags. */
const COUNTRY_CODES = ['+91', '+1', '+44', '+971', '+966', '+974', '+61', '+65', '+81']

const EDUCATION_OPTIONS = [
  'Choose...',
  '12th Standard',
  'Nursing Student',
  'GNM',
  'B.Sc Nursing',
  'Registered Nurse',
  'Other',
]

/** Lead source recorded when the form is opened by a "Get Admission" button. */
const ADMISSION_SOURCE = 'get-admission'

/**
 * Lead source recorded when the detail panel's "Talk to our team" opens the form.
 *
 * The four card groups now open a detail view first, so this is no longer tagged
 * by which card was read - `source` says the visitor came through the detail
 * panel, and `interest` carries the specific item's title.
 */
export const DETAIL_SOURCE = 'detail'

/** Short agreement line beside the checkbox. The longer explanation sits under
 * the submit button, so the tick target stays a single short row.
 */
const CONSENT_LABEL = 'I agree to be contacted about my enquiry.'
const CONSENT_ERROR = 'Please tick the box to continue.'

type Fields = {
  name: string
  email: string
  countryCode: string
  mobile: string
  education: string
  place: string
  /** Boolean, not a string: the payload records permission, not checkbox state. */
  consent: boolean
}

type FieldKey = keyof Fields

type Errors = Partial<Record<FieldKey, string>>

const EMPTY: Fields = {
  name: '',
  email: '',
  countryCode: '+91',
  mobile: '',
  education: '',
  place: '',
  consent: false,
}

/** 10 digits for India; looser elsewhere because codes differ in length. */
function validate(fields: Fields): Errors {
  const errors: Errors = {}
  const digits = fields.mobile.replace(/\D/g, '')

  if (!fields.name.trim()) errors.name = 'Please enter your name.'
  else if (fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!fields.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'Enter a valid email address.'

  if (!digits) errors.mobile = 'Please enter your mobile number.'
  else if (fields.countryCode === '+91' && digits.length !== 10)
    errors.mobile = 'Enter a 10-digit mobile number.'
  else if (digits.length < 6 || digits.length > 15) errors.mobile = 'Enter a valid mobile number.'

  if (!fields.place.trim()) errors.place = 'Please enter your place.'

  /* Checked alongside the text fields, not on blur: it is the one control with no
     typing to trigger a change, so it has to be validated on submit. */
  if (!fields.consent) errors.consent = CONSENT_ERROR

  return errors
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {children}
    </label>
  )
}

/**
 * Which copy the dialog shows.
 *
 * - `person`    — opened from a person card, addressed to that person.
 * - `admission` — opened by any "Get Admission"/"Contact Us" button, so it is a
 *   sign-up form with no addressee.
 */
export type ConnectModalMode = 'person' | 'admission'

export type ConnectModalProps = {
  mode: ConnectModalMode
  /** Whether the dialog is showing. */
  open: boolean
  /** Card the visitor clicked. `null` in `admission` mode. */
  personName: string | null
  /**
   * Title of the detail item the visitor was reading, e.g. `Nursing Education`.
   * Recorded so the backend knows what they were looking at, without changing
   * the heading.
   */
  interest?: string | null
  /**
   * Lead source for `admission` entries. Defaults to the header/CTA value; the
   * detail panel passes `DETAIL_SOURCE`.
   */
  source?: string
  /**
   * The button that opened this dialog. Focus returns here on close.
   * Falls back to whatever had focus, so the dialog still restores sensibly if
   * a caller forgets it.
   */
  trigger?: HTMLButtonElement | null
  onClose: () => void
}

/**
 * The one enquiry dialog for the site, shared by the people carousel and every
 * "Get Admission" button. `mode` decides the heading and the hidden lead-source
 * field; the form itself is identical either way. Validates in the browser and
 * hands the payload to `submitEnquiry`, which is still a stub.
 */
export default function ConnectModal({
  mode,
  open,
  personName,
  interest = null,
  source,
  trigger,
  onClose,
}: ConnectModalProps) {
  const isAdmission = mode === 'admission'
  const leadSource = source ?? ADMISSION_SOURCE

  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
const consentRef = useRef<HTMLInputElement>(null)

  /* Fresh form each time it opens. */
  useEffect(() => {
    if (!open) return
    setFields(EMPTY)
    setErrors({})
    setTouched(false)
    setSubmitting(false)
    setSent(false)
  }, [open, personName, mode])

  /* Move focus to Name on open, and hand it back to the trigger on close. */
  useEffect(() => {
    if (!open) return

    /* Captured now: at cleanup time activeElement is inside the dialog, which
       is about to be removed. */
    const restore = trigger ?? (document.activeElement as HTMLElement | null)
    const timer = window.setTimeout(() => nameRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(timer)
      restore?.focus?.()
    }
  }, [open, trigger])

  /* Lock page scroll for as long as the dialog is up. */
  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  /* Escape closes; Tab is trapped inside the panel. */
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetWidth > 0 || element.offsetHeight > 0,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  /* Checkbox needs its own handler: its value is a boolean, where the text fields
     all carry strings. */
  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields((previous) => ({ ...previous, consent: event.target.checked }))
    setErrors((previous) => ({ ...previous, consent: undefined }))
    setSent(false)
  }

  const handleChange =
    (field: Exclude<FieldKey, 'consent'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFields((previous) => ({ ...previous, [field]: event.target.value }))
      setErrors((previous) => ({ ...previous, [field]: undefined }))
      setSent(false)
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(fields)
    setErrors(nextErrors)
    setTouched(true)

    if (Object.keys(nextErrors).length > 0) {
      /* Consent is last in this list, so focus only lands on it when nothing
         above is wrong - the visitor is walked through the form in order rather
         than bounced to the bottom. */
      const firstBad = (['name', 'email', 'mobile', 'place', 'consent'] as FieldKey[]).find(
        (key) => nextErrors[key],
      )
      if (firstBad) panelRef.current?.querySelector<HTMLElement>(`#enquiry-${firstBad}`)?.focus()
      return
    }

    setSubmitting(true)

    const payload: EnquiryPayload = {
      /* Admission leads have no addressee; they are tagged by source and, when a
         card prompted them, by interest, so the backend can tell the entry
         points apart. */
      contactPerson: isAdmission ? '' : (personName ?? ''),
      ...(isAdmission ? { source: leadSource, ...(interest ? { interest } : {}) } : {}),
      name: fields.name.trim(),
      email: fields.email.trim(),
      countryCode: fields.countryCode,
      mobile: fields.mobile.replace(/\D/g, ''),
      education: fields.education,
      place: fields.place.trim(),
      consent: fields.consent,
    }

    try {
      await submitEnquiry(payload)
      setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  const headingId = 'connect-modal-heading'
  const errorFor = (key: FieldKey) => (touched ? errors[key] : undefined)

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center min-[769px]:items-center"
      onKeyDown={onKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {/* Decorative dimmer. The click-to-close test lives on the container. */}
      <div className="connect-backdrop pointer-events-none absolute inset-0 bg-black/70 backdrop-blur-[4px]" aria-hidden="true" />

<div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        /* Desktop is a centred dialog capped at 560px; a phone gets a full-width
           bottom sheet that keeps clear of the home indicator. Scrollbar
           geometry and overscroll containment live in `.connect-panel`. */
        className="connect-panel relative flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-t-[22px] bg-[#0F172A] px-5 pt-[22px] pb-[calc(22px+env(safe-area-inset-bottom))] min-[769px]:w-[92vw] min-[769px]:max-w-[560px] min-[769px]:rounded-[24px] min-[769px]:px-8 min-[769px]:py-7"
      >
        {/* Bottom-sheet affordance on phones only; a centred dialog has no edge
            to grab, so it would be meaningless on desktop. */}
        <span
          aria-hidden="true"
          className="mx-auto mb-4 block h-1 w-11 shrink-0 rounded-full bg-white/30 min-[769px]:hidden"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-10 shrink-0 place-items-center rounded-full text-white transition-colors duration-200 hover:text-amber min-[769px]:top-5 min-[769px]:right-5"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-amber/15 text-amber">
              <Check className="size-8" aria-hidden="true" strokeWidth={2.5} />
            </span>

            <h2 id={headingId} className="mt-6 font-display text-[26px] font-bold text-white">
              Thank you. We will contact you soon.
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex min-h-14 items-center justify-center rounded-pill bg-amber px-8 font-semibold text-black transition-colors duration-200 hover:bg-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2
              id={headingId}
              className="font-display pr-12 text-[24px] font-bold text-white min-[769px]:text-[28px]"
            >
              {isAdmission ? 'Sign up to continue' : `Connect with ${personName}`}
            </h2>
            {!isAdmission ? (
              <p className="mt-1 text-[14px] text-muted">
                Please fill the form to connect with {personName}
              </p>
            ) : null}

            {/* `mt-4` is the heading's 16px bottom margin in admission mode; in
                person mode the subtext sits in between at 4px. */}
            <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-3 min-[769px]:gap-3.5">
              {isAdmission ? (
                <>
                  <input type="hidden" name="source" value={leadSource} />
                  {interest ? <input type="hidden" name="interest" value={interest} /> : null}
                </>
              ) : (
                <input type="hidden" name="contactPerson" value={personName ?? ''} />
              )}

              <div>
                <Label htmlFor="enquiry-name">Name</Label>
                <input
                  ref={nameRef}
                  id="enquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="What's your name?"
                  value={fields.name}
                  onChange={handleChange('name')}
                  aria-invalid={errorFor('name') ? true : undefined}
                  aria-describedby={errorFor('name') ? 'enquiry-name-error' : undefined}
                  className="field field-light"
                />
                {errorFor('name') ? (
                  <p id="enquiry-name-error" className="mt-2 text-[13px] text-red-400">
                    {errorFor('name')}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="enquiry-email">Email</Label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="What's your email address?"
                  value={fields.email}
                  onChange={handleChange('email')}
                  aria-invalid={errorFor('email') ? true : undefined}
                  aria-describedby={errorFor('email') ? 'enquiry-email-error' : undefined}
                  className="field field-light"
                />
                {errorFor('email') ? (
                  <p id="enquiry-email-error" className="mt-2 text-[13px] text-red-400">
                    {errorFor('email')}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="enquiry-mobile">Mobile</Label>
                <div className="flex gap-2.5">
                  <div className="relative w-[28%] shrink-0">
                    <select
                      id="enquiry-country"
                      name="countryCode"
                      value={fields.countryCode}
                      onChange={handleChange('countryCode')}
                      className="field field-light cursor-pointer pr-8 pl-3"
                    >
                      {COUNTRY_CODES.map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6B7280]"
                      aria-hidden="true"
                    />
                  </div>

                  <input
                    id="enquiry-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Contact Number"
                    value={fields.mobile}
                    onChange={handleChange('mobile')}
                    aria-invalid={errorFor('mobile') ? true : undefined}
                    aria-describedby={errorFor('mobile') ? 'enquiry-mobile-error' : undefined}
                    className="field field-light min-w-0 flex-1"
                  />
                </div>
                {errorFor('mobile') ? (
                  <p id="enquiry-mobile-error" className="mt-2 text-[13px] text-red-400">
                    {errorFor('mobile')}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="enquiry-education">Education</Label>
                <div className="relative">
                  <select
                    id="enquiry-education"
                    name="education"
                    value={fields.education}
                    onChange={handleChange('education')}
                    className="field field-light cursor-pointer pr-8 pl-3"
                  >
                    {EDUCATION_OPTIONS.map((option) => (
                      <option key={option} value={option === 'Choose...' ? '' : option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="enquiry-place">Place</Label>
                <input
                  id="enquiry-place"
                  name="place"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Your Place"
                  value={fields.place}
                  onChange={handleChange('place')}
                  aria-invalid={errorFor('place') ? true : undefined}
                  aria-describedby={errorFor('place') ? 'enquiry-place-error' : undefined}
                  className="field field-light"
                />
                {errorFor('place') ? (
                  <p id="enquiry-place-error" className="mt-2 text-[13px] text-red-400">
                    {errorFor('place')}
                  </p>
                ) : null}
              </div>

              {/* Consent sits directly above the submit button, so the box and
                  the action it gates read as one pair. The 44px `py-3.5` lane is
                  the tap target; the visible box stays 20px. */}
              <div className="mt-1">
                <div className="flex items-start gap-3">
                  <input
                    ref={consentRef}
                    id="enquiry-consent"
                    name="consent"
                    type="checkbox"
                    checked={fields.consent}
                    onChange={handleConsentChange}
                    aria-invalid={errorFor('consent') ? true : undefined}
                    aria-describedby={
                      errorFor('consent')
                        ? 'enquiry-consent-error'
                        : 'enquiry-consent-note'
                    }
                    className="mt-0.5 size-5 shrink-0 accent-amber"
                  />

                  <label
                    htmlFor="enquiry-consent"
                    className="-my-1 flex-1 cursor-pointer py-3.5 text-[14px] leading-snug text-white/90"
                  >
                    {CONSENT_LABEL}
                  </label>
                </div>

                {errorFor('consent') ? (
                  <p id="enquiry-consent-error" className="mt-1 text-[13px] text-red-400">
                    {errorFor('consent')}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-pill bg-amber px-8 text-[17px] font-semibold text-black transition-colors duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 min-[769px]:min-h-[50px]"
              >
                {submitting ? 'Submitting...' : isAdmission ? 'Sign up' : 'Submit'}
              </button>

              {/* Below the action, so it reads as a condition of submitting rather
                  than as a field to fill in. Left-aligned on desktop, centred on
                  a phone where the panel is a narrow single column. */}
              <p
                id="enquiry-consent-note"
                className="mt-3 text-center text-[13px] leading-[1.5] text-muted min-[769px]:text-left"
              >
                {CONSENT_TEXT}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}