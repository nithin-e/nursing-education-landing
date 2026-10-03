import { Fragment } from 'react'

import {
  ADDRESS,
  EMAIL,
  MAILTO_HREF,
  PHONE_ALT_DISPLAY,
  PHONE_DISPLAY,
  TEL_ALT_HREF,
  TEL_HREF,
} from '@/data/contact'
import { NAV_LINKS, SOCIAL_LINKS } from '@/data/site'
import { BRAND_ICONS } from './ui/BrandIcons'

/** Shared by both columns: Exo 2, 28px bold white, then the dotted rule. */
function ColumnHeading({ children }: { children: string }) {
  return (
    <div>
      <h2 className="font-display text-[28px] leading-none font-bold text-white">{children}</h2>
      <span
        aria-hidden="true"
        className="mt-4 mb-4 block w-full border-b border-dotted border-[rgb(255_255_255/0.25)]"
      />
    </div>
  )
}

/**
 * Footer: a black field with an inset slate panel that rounds only at the
 * bottom, carrying a two-column Pages / Contact Info block and a social row.
 *
 * `min-[769px]` rather than `md` for the same reason the header and hero use it:
 * the brief calls 768px mobile, and `md` is a min-width query that would flip the
 * columns to two at exactly 768px.
 *
 * The panel colour is the existing `--color-surface` (#0f172a) and the outer
 * field is `--color-ink` (#000), so no new design tokens were needed.
 */
export default function Footer() {
  return (
    <footer className="bg-ink p-4">
      <div className="max-w-full rounded-b-[48px] bg-surface px-6 pt-8 pb-6 min-[769px]:px-24 min-[769px]:pt-12 min-[769px]:pb-8">
        <div className="grid gap-10 min-[769px]:grid-cols-2 min-[769px]:gap-24">
          <nav aria-label="Footer pages">
            <ColumnHeading>Pages</ColumnHeading>

            {/* No list gap: each link's own height *is* the row pitch, so the
                list can never drift out of step with the min tap height. */}
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-12 items-center py-3 text-[17px] leading-[1.3] text-white transition-colors duration-200 hover:text-amber scroll-mt-[96px] min-[769px]:min-h-[46px] min-[769px]:py-2.5 min-[769px]:text-[18px] min-[769px]:scroll-mt-[104px] lg:scroll-mt-[116px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact Info</ColumnHeading>

            <div className="flex flex-col gap-[18px] text-[18px] leading-[1.6]">
              <div>
                <p className="font-bold text-white">Address</p>
                <p className="text-muted">{ADDRESS}</p>
              </div>

              <div>
                <p className="font-bold text-white">Email</p>
                <a
                  href={MAILTO_HREF}
                  className="block text-muted transition-colors duration-200 hover:text-amber"
                >
                  {EMAIL}
                </a>
              </div>

              <div>
                <p className="font-bold text-white">Phone</p>
                <a
                  href={TEL_HREF}
                  className="block text-muted transition-colors duration-200 hover:text-amber"
                >
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={TEL_ALT_HREF}
                  className="block text-muted transition-colors duration-200 hover:text-amber"
                >
                  {PHONE_ALT_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-6 min-[769px]:mt-12 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <span className="mr-2 text-[20px] font-semibold text-white">Follow Us:</span>

            {SOCIAL_LINKS.map((social, index) => {
              const Icon = BRAND_ICONS[social.icon]

              return (
                <Fragment key={social.label}>
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="mx-2 h-[18px] w-px bg-[rgb(255_255_255/0.25)]"
                    />
                  ) : null}

                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-11 place-items-center text-white transition-colors duration-200 hover:text-amber"
                  >
                    <Icon className="size-5" />
                  </a>
                </Fragment>
              )
            })}
          </div>

          <p className="text-[15px] text-white min-[769px]:text-[20px]">
            &copy;2026 Dr. Expert Edulinks. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}