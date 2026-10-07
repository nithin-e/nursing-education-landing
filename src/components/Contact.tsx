import { MAILTO_HREF, PHONE_TEL } from '@/data/contact'
import { SITE } from '@/data/site'
import ContactForm from './ui/ContactForm'
import LocationCard from './ui/LocationCard'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

/**
 * One big #2A2A2A card holds both halves: the pitch on the left, the form on
 * the right. Phone and email are plain text lines rather than icon rows, and
 * both still link to the real `tel:` and `mailto:` targets.
 *
 * The address and map sit below the phone and email rather than beside them, so
 * the frame gets the full column width. It is the tallest thing in this card, and
 * a half-width map at `16 / 9` would be too short to pan usefully.
 *
 * Stacks as heading -> contact details -> form -> location on a phone, so the
 * form stays above the map frame and the map never competes with it for height.
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
                    href={`tel:${PHONE_TEL}`}
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

            {/* Full width, below both columns: a half-width map at 16/9 is too
                short to pan, and this keeps it clear of the form. */}
            <div className="mt-10">
              <LocationCard />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
