import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Info, Mail, MapPin, Phone, Send } from 'lucide-react'

import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

type FormFields = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const EMPTY: FormFields = { name: '', email: '', subject: '', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

const CONTACT_DETAILS = [
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^+\d]/g, '')}` },
  { icon: MapPin, label: 'Location', value: SITE.location, href: undefined },
]

/** Pure validation helper — kept outside the component so it stays easy to test. */
function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}

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

const fieldBase =
  'w-full rounded-xl border bg-paper px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors duration-200 focus:outline-none'

export default function Contact() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState(false)
  const [success, setSuccess] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleChange =
    (field: keyof FormFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((previous) => ({ ...previous, [field]: event.target.value }))
      setErrors((previous) => ({ ...previous, [field]: undefined }))
      setSuccess(false)
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    setTouched(true)
    if (Object.keys(nextErrors).length === 0) {
      setFields(EMPTY)
      setSuccess(true)
    }
  }

  const reset = () => {
    setFields(EMPTY)
    setErrors({})
    setTouched(false)
    setSuccess(false)
  }

  return (
    <Section id="contact" tone="dark" className="py-20 sm:py-28">
      <SectionBody>
        <SectionHeading
          tone="dark"
          eyebrow="Contact"
          title="Get in Touch"
          description="Questions about nursing resources, careers or collaboration? Send us a note and our team will get back to you."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Details */}
          <Reveal>
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-charcoal-soft/70 p-7">
              <ul className="grid gap-5">
                {CONTACT_DETAILS.map((detail) => {
                  const Icon = detail.icon
                  const content = (
                    <>
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold text-ink">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold tracking-[0.16em] text-grey uppercase">
                          {detail.label}
                        </span>
                        <span className="mt-1 block text-sm text-paper">{detail.value}</span>
                      </span>
                    </>
                  )
                  return (
                    <li key={detail.label}>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="flex items-center gap-4 rounded-xl transition-colors hover:text-gold focus-visible:text-gold"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">{content}</div>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="mt-auto rounded-xl border border-white/10 bg-ink/60 p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  Response time
                </p>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  Demo content only — placeholder contact details. Typical enquiry replies are sent
                  within two working days once a support system is connected.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-white/10 bg-charcoal-soft/70 p-7 sm:p-9"
            >
              <h3 className="text-xl text-paper">Send an enquiry</h3>
              <p className="mt-2 text-sm text-grey">
                Fields marked with <span aria-hidden="true">*</span> are required.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field
                  id="contact-name"
                  label="Full name"
                  required
                  value={fields.name}
                  error={touched ? errors.name : undefined}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                />
                <Field
                  id="contact-email"
                  label="Email address"
                  type="email"
                  required
                  value={fields.email}
                  error={touched ? errors.email : undefined}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                />
              </div>

              <div className="mt-5">
                <Field
                  id="contact-subject"
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
                  id="contact-message"
                  label="Message"
                  required
                  multiline
                  rows={6}
                  value={fields.message}
                  error={touched ? errors.message : undefined}
                  onChange={handleChange('message')}
                  placeholder="Tell us a little more about what you need help with."
                />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-dark sm:text-base"
                >
                  Send Message
                  <Send className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full px-4 py-2 text-sm font-medium text-grey transition-colors hover:text-gold"
                >
                  Clear form
                </button>
              </div>

              <AnimatePresence initial={false}>
                {success ? (
                  <motion.div
                    key="success"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    role="status"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-gold" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-paper">
                      <span className="font-semibold">Form validated successfully.</span> This is a
                      static demo — no message was sent or stored. Connect a backend to deliver it.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {touched && !success && Object.keys(errors).some((key) => errors[key as keyof FormErrors]) ? (
                <p
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
                >
                  <Info className="size-5 shrink-0" aria-hidden="true" />
                  Please correct the highlighted fields and try again.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  )
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
}: FieldProps) {
  const errorId = `${id}-error`
  const classes = cn(
    fieldBase,
    error ? 'border-red-500' : 'border-charcoal/15 focus:border-gold',
  )

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 text-sm font-medium text-paper/85">
        {label}
        {required ? (
          <span className="ml-1 text-gold" aria-hidden="true">
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
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(classes, 'resize-y')}
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
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={classes}
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