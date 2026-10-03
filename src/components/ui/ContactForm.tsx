import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

export type ContactFormFields = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormFields, string>>

const EMPTY: ContactFormFields = { name: '', email: '', subject: '', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export { EMAIL_PATTERN }

/** Validation is unchanged from the previous build. */
export function validateContact(fields: ContactFormFields): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!fields.name.trim()) errors.name = 'Please enter your name.'
  else if (fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!fields.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'Enter a valid email address.'

  if (!fields.subject.trim()) errors.subject = 'Please add a subject.'

  if (!fields.message.trim()) errors.message = 'Please enter a message.'
  else if (fields.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.'

  return errors
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  type?: string
  placeholder?: string
  multiline?: boolean
  autoComplete?: string
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  multiline,
  autoComplete,
}: FieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name: id,
    value,
    onChange,
    placeholder,
    required: true,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: 'field',
  }

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input {...shared} type={type} />
      )}

      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * The site's single lead form. Same four fields and the same validation as
 * before, restyled for the flat dark card. Errors appear under each field and
 * the form is never submitted to a backend from this component.
 */
export default function ContactForm() {
  const [fields, setFields] = useState<ContactFormFields>(EMPTY)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange =
    (field: keyof ContactFormFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((previous) => ({ ...previous, [field]: event.target.value }))
      setErrors((previous) => ({ ...previous, [field]: undefined }))
      setSent(false)
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateContact(fields)
    setErrors(nextErrors)
    setTouched(true)

    if (Object.keys(nextErrors).length === 0) {
      setFields(EMPTY)
      setSent(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          autoComplete="name"
          value={fields.name}
          error={touched ? errors.name : undefined}
          onChange={handleChange('name')}
          placeholder="Your name"
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={fields.email}
          error={touched ? errors.email : undefined}
          onChange={handleChange('email')}
          placeholder="you@example.com"
        />
      </div>

      <Field
        id="subject"
        label="Subject"
        value={fields.subject}
        error={touched ? errors.subject : undefined}
        onChange={handleChange('subject')}
        placeholder="What is your enquiry about?"
      />

      <Field
        id="message"
        label="Message"
        multiline
        value={fields.message}
        error={touched ? errors.message : undefined}
        onChange={handleChange('message')}
        placeholder="Tell us a little more about what you need help with."
      />

      <button
        type="submit"
        className="mt-1 inline-flex min-h-14 w-full items-center justify-center rounded-pill bg-amber px-8 font-semibold text-black transition-colors duration-200 hover:bg-white"
      >
        Send message
      </button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-amber">
        {sent ? 'Thank you. Your message has been received.' : ''}
      </p>
    </form>
  )
}
