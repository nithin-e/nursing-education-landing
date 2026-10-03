import { COMMUNITY_TEXT, COMMUNITY_TITLE } from '@/data/nursingData'
import { useEnquiryModal } from './EnquiryModalProvider'
import Button from './ui/Button'

/**
 * The one deliberate exception to the alternating black/navy rhythm: a
 * full-bleed yellow conversion band that interrupts the page just before the
 * contact section.
 */
export default function JoinCommunity() {
  const { openAdmission } = useEnquiryModal()

  return (
    <section className="section-pad bg-amber text-black">
      <div
        className="container-page flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between"
        data-fade=""
      >
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.875rem,4.5vw,2.75rem)] leading-[1.15] font-extrabold text-black">
            {COMMUNITY_TITLE}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-black/80 md:text-base">
            {COMMUNITY_TEXT}
          </p>
        </div>

        <Button
          variant="inverse"
          className="shrink-0"
          onClick={(event) => openAdmission(event.currentTarget)}
        >
          Contact Us
        </Button>
      </div>
    </section>
  )
}
