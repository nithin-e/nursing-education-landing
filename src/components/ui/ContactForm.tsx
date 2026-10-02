import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Info, Send } from 'lucide-react'

import { cn } from '@/lib/cn'

export type ContactFormFields = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormFields, string>>

const EMPTY: ContactFormFields = { name: '', email: '', subject: '', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

const fieldBase =
  'w-full border-0 border-b border-white/20 bg-transparent px-1 py-3 text-base text-white transition-[border-color] duration-200 placeholder:text-[#9CA3AF] focus:border-amber focus:outline-none'

/** Pure validation helper — shared by the Contact section and the contact modal. */
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
  required?: boolean
  multiline?: boolean
  rows?: number
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
  required,
  multiline,
  rows = 5,
  autoComplete,
}: FieldProps) {
  const errorId = `${id}-error`
  const classes = cn(
    fieldBase,
    error ? 'border-red-400' : 'border-white/20 focus:border-amber',
  )

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-white/85">
        {label}
        {required ? (
          <span className="ml-1 text-amber" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(classes, 'min-h-[120px] resize-y text-[16px]')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(classes, 'h-12 text-[16px]')}
        />
      )}

      {error ? (
        <p id={errorId} className="mt-2 text-xs font-medium text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type ContactFormProps = {
  idPrefix?: string
  onSuccess?: () => void
}

/**
 * The one contact form used by both the Contact section and the contact modal.
 * Same fields, labels, placeholders, required markers and validation.
 */
export default function ContactForm({ idPrefix = 'contact', onSuccess }: ContactFormProps) {
  const [fields, setFields] = useState<ContactFormFields>(EMPTY)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [touched, setTouched] = useState(false)
  const [success, setSuccess] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleChange =
    (field: keyof ContactFormFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((previous) => ({ ...previous, [field]: event.target.value }))
      setErrors((previous) => ({ ...previous, [field]: undefined }))
      setSuccess(false)
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateContact(fields)
    setErrors(nextErrors)
    setTouched(true)
    if (Object.keys(nextErrors).length === 0) {
      setFields(EMPTY)
      setSuccess(true)
      onSuccess?.()
    }
  }

  const reset = () => {
    setFields(EMPTY)
    setErrors({})
    setTouched(false)
    setSuccess(false)
  }

  const hasErrors = touched && Object.keys(errors).some((key) => errors[key as keyof ContactFormErrors])

  return (
    <form onSubmit={handleSubmit} noValidate className="relative z-[1] flex flex-col">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${idPrefix}-name`}
          label="Full name"
          required
          autoComplete="name"
          value={fields.name}
          error={touched ? errors.name : undefined}
          onChange={handleChange('name')}
          placeholder="Your name"
        />
        <Field
          id={`${idPrefix}-email`}
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={fields.email}
          error={touched ? errors.email : undefined}
          onChange={handleChange('email')}
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${idPrefix}-subject`}
          label="Subject"
          required
          value={fields.subject}
          error={touched ? errors.subject : undefined}
          onChange={handleChange('subject')}
          placeholder="What is your enquiry about?"
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${idPrefix}-message`}
          label="Message"
          required
          multiline
          rows={5}
          value={fields.message}
          error={touched ? errors.message : undefined}
          onChange={handleChange('message')}
          placeholder="Tell us a little more about what you need help with."
        />
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-pill bg-amber px-8 py-4 font-semibold text-ink transition-colors duration-200 hover:bg-amber-deep"
      >
        Send Message
        <Send className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={reset}
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-pill px-6 py-2 text-sm font-medium text-[#9CA3AF] transition-colors duration-200 hover:text-amber"
      >
        Clear form
      </button>

      <AnimatePresence initial={false}>
        {success ? (
          <motion.div
            key="success"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="status"
            className="mt-5 flex items-start gap-3 rounded-field border border-amber/40 bg-amber/10 p-4"
          >
            <CheckCircle2 className="size-5 shrink-0 text-amber" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-white">
              <span className="font-semibold">Form validated successfully.</span> This is a static
              demo — no message was sent or stored. Connect a backend to deliver it.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {hasErrors ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-field border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <Info className="size-5 shrink-0" aria-hidden="true" />
          Please correct the highlighted fields and try again.
        </p>
      ) : null}
    </form>
  )
}
