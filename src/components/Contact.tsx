import { Mail, MapPin, Phone } from 'lucide-react'

import { SITE } from '@/data/site'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import ContactForm from './ui/ContactForm'
import EcgPulse from './ui/EcgPulse'

const CONTACT_DETAILS = [
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^+\d]/g, '')}` },
  { icon: MapPin, label: 'Location', value: SITE.location, href: undefined },
]

export default function Contact() {
  return (
    <Section id="contact" tone="black">
      <SectionBody>
        <SectionHeading
          align="left"
          eyebrow="Contact"
          title="Get in touch"
          emphasis={['touch']}
          description="Questions about nursing resources, careers or collaboration? Send us a note and our team will get back to you."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Details */}
          <Reveal className="min-w-0 order-2 lg:order-1">
            {/* `lg:h-full` + `mt-auto` stretched this column to match the form
                on desktop; stacked on a phone that only produced dead space. */}
            <div className="flex flex-col gap-10 lg:h-full">
              <ul className="grid gap-8">
                {CONTACT_DETAILS.map((detail) => {
                  const Icon = detail.icon
                  const content = (
                    <>
                      <Icon className="size-6 shrink-0 text-amber" aria-hidden="true" />
                      <span>
                        <span className="block font-mono text-xs tracking-[0.15em] text-muted uppercase">
                          {detail.label}
                        </span>
                        <span className="mt-2 block text-xl break-words text-white sm:text-2xl">
                          {detail.value}
                        </span>
                      </span>
                    </>
                  )
                  return (
                    <li key={detail.label}>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="flex min-h-14 items-start gap-5 py-1 underline-offset-8 hover:underline transition-colors duration-200 hover:text-amber"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-5 py-1">{content}</div>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="mt-10 rounded-field border border-line bg-ink/60 p-5 lg:mt-auto">
                <p className="font-mono text-xs font-medium tracking-[0.15em] text-amber uppercase">
                  Response time
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Demo content only — placeholder contact details. Typical enquiry replies are sent
                  within two working days once a support system is connected.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="relative z-[1]">
              <EcgPulse animate className="relative z-0 mb-6 h-20 w-full opacity-20" />
              <h3 className="font-display text-2xl font-bold text-white">Send an enquiry</h3>
              <p className="mt-2 text-sm text-body">
                Fields marked with <span aria-hidden="true">*</span> are required.
              </p>

              <div className="mt-7">
                <ContactForm idPrefix="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  )
}
