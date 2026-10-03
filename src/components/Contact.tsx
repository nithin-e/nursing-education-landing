import { MAILTO_HREF, TEL_HREF } from '@/data/contact'
import { SITE } from '@/data/site'
import ContactForm from './ui/ContactForm'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

/**
 * One big #2A2A2A card holds both halves: the pitch on the left, the form on
 * the right. Phone and email are plain text lines rather than icon rows, and
 * both still link to the real `tel:` and `mailto:` targets.
 */
export default function Contact() {
  return (
    <Section id="contact">
      <div className="rounded-[32px] bg-card-grey p-8 md:p-12" data-fade="">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              label="Contact"
              title="Talk to a real person"
              emphasis={['person']}
              description="Questions about nursing resources, careers or collaboration? Send us a note and our team will get back to you."
            />

            <dl className="mt-8 flex flex-col gap-4">
              <div>
                <dt className="text-sm text-muted">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={TEL_HREF}
                    className="font-semibold break-words text-white transition-colors duration-200 hover:text-amber"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd className="mt-1">
                  <a
                    href={MAILTO_HREF}
                    className="font-semibold break-words text-white transition-colors duration-200 hover:text-amber"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
