import { Phone } from 'lucide-react'

import { PHONE_DISPLAY, PHONE_TEL } from '@/data/contact'
import { SITE } from '@/data/site'
import { cn } from '@/lib/cn'
import { useEnquiryModal } from './EnquiryModalProvider'
import Button from './ui/Button'
import Logo from './ui/Logo'

/**
 * Yellow circle phone icon plus the number.
 *
 * The number is about 130px wide, which does not fit beside the logo and the
 * "Get Admission" button at 360px, so below `lg` the circle stands alone as a
 * 44px `tel:` target and the digits appear from `lg` up. The `aria-label` keeps
 * the icon-only state announced.
 *
 * The digits come from `PHONE_DISPLAY` and the dial target from `PHONE_TEL`, so
 * the printed number and the dialled one cannot drift apart.
 */
function PhoneLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={PHONE_TEL}
      aria-label={`Call ${PHONE_DISPLAY}`}
      className={cn(
        'flex min-h-11 shrink-0 items-center gap-3 text-white transition-colors duration-200 hover:text-amber',
        className,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-amber text-black lg:size-10">
        <Phone className="size-4" aria-hidden="true" />
      </span>
      <span className="hidden font-semibold whitespace-nowrap lg:inline">{PHONE_DISPLAY}</span>
    </a>
  )
}

/**
 * Sticky header: logo on the left, phone and a yellow "Get Admission" pill on
 * the right. There is no menu — the phone stays reachable as an icon-only `tel:`
 * link on narrow screens, and the pill opens the sign-up dialog at every width.
 *
 * The brand tagline lives in the hero pill, so it is deliberately not repeated
 * under the logo here.
 */
export default function Header() {
  const { openAdmission } = useEnquiryModal()

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="container-page flex min-h-[84px] items-center justify-between gap-3 py-3 min-[769px]:min-h-[92px] lg:min-h-[104px]">
        <a
          href="#home"
          aria-label={`${SITE.name} — home`}
          className="flex min-w-0 items-center"
        >
          <Logo />
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <PhoneLink />

          <Button
            onClick={(event) => openAdmission(event.currentTarget)}
            className="px-5 text-sm sm:px-7 sm:text-base"
          >
            Get Admission
          </Button>
        </div>
      </div>
    </header>
  )
}