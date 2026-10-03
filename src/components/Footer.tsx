import { RESOURCE_ITEMS } from '@/data/nursingData'
import { NAV_LINKS, POLICY_LINKS, SITE, SOCIAL_LINKS, TEL_HREF } from '@/data/site'
import { BRAND_ICONS } from './ui/BrandIcons'
import Logo from './ui/Logo'

/** Short, plain statements — no demo or placeholder wording anywhere. */
const LEGAL_COPY: Record<string, { title: string; body: string }> = {
  '#privacy': {
    title: 'Privacy Policy',
    body: 'We respect your privacy. Information you send through the form above is used only to reply to your enquiry.',
  },
  '#terms': {
    title: 'Terms & Conditions',
    body: 'Content on this site is for general educational purposes only and does not constitute medical, legal or professional advice.',
  },
}

/** Reuses the resource copy rather than restating it in the footer. */
const RESOURCE_LINKS = RESOURCE_ITEMS.map((item) => ({
  label: item.title,
  href: '#resources',
}))

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="text-[13px] font-semibold tracking-[0.18em] text-amber uppercase">
      {children}
    </h2>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-deep pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <div className="container-page pt-14 md:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-5">
            <Logo size="lg" />
            <p className="font-display text-xl font-light text-white">{SITE.tagline}</p>
            <ul className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = BRAND_ICONS[social.label as keyof typeof BRAND_ICONS]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-12 place-items-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-amber hover:text-amber"
                    >
                      <Icon />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-5 flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-[15px] text-muted transition-colors duration-200 hover:text-amber"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nursing resources">
            <ColumnHeading>Nursing Resources</ColumnHeading>
            <ul className="mt-5 flex flex-col">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-[15px] text-muted transition-colors duration-200 hover:text-amber"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact Info</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-2">
              <li>
                <a
                  href={TEL_HREF}
                  className="flex min-h-11 items-center text-[15px] break-words text-white transition-colors duration-200 hover:text-amber"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex min-h-11 items-center text-[15px] break-words text-white transition-colors duration-200 hover:text-amber"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{SITE.description}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          {POLICY_LINKS.map((link) => {
            const copy = LEGAL_COPY[link.href]
            return (
              <section key={link.href} id={link.href.replace('#', '')} className="scroll-mt-[96px] lg:scroll-mt-[116px]">
                <h2 className="text-sm font-semibold tracking-[0.18em] text-amber uppercase">
                  {copy.title}
                </h2>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted">
                  {copy.body}
                </p>
              </section>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {year} {SITE.name}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-amber"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
