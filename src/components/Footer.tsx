import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { NAV_LINKS, POLICY_LINKS, RESOURCE_LINKS, SITE, SOCIAL_LINKS } from '@/data/site'
import { BRAND_ICONS } from './ui/BrandIcons'
import Logo from './ui/Logo'
import EcgPulse from './ui/EcgPulse'

/** Short placeholder policy copy so the footer links resolve to real content. */
const LEGAL_COPY: Record<string, { title: string; body: string }> = {
  '#privacy': {
    title: 'Privacy Policy',
    body: 'Placeholder policy. This static demo does not collect, store or transmit personal data. No analytics, cookies or third-party trackers are used, and the contact form validates entirely in your browser. Add your full privacy notice before publishing.',
  },
  '#terms': {
    title: 'Terms & Conditions',
    body: 'Placeholder terms. All content on this demo site is provided for general educational purposes only and does not constitute medical, legal or professional advice. Nursing requirements vary by country and regulator — always confirm official information with the relevant authority before acting on anything you read here.',
  },
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line-strong bg-ink text-body pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center pointer-events-none z-0">
        <EcgPulse animate className="h-20 w-full opacity-15" />
        <h2
          aria-hidden
          className="font-display font-extrabold uppercase tracking-tighter leading-none text-transparent [text-stroke:1px_rgba(255,255,255,0.08)] [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] text-[clamp(80px,18vw,240px)] whitespace-nowrap -translate-y-2"
        >
          {SITE.name}
        </h2>
      </div>
      <div className="container-page py-14 lg:py-20 relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="flex min-w-0 flex-col gap-5">
            <Logo tone="dark" />
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-body">
              {SITE.description}
            </p>
            <ul className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = BRAND_ICONS[social.label as keyof typeof BRAND_ICONS]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-11 place-items-center rounded-pill border border-white/15 text-white/70 transition-colors duration-200 hover:border-amber hover:text-amber"
                    >
                      <Icon />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-nav">
            <h2
              id="footer-nav"
              className="font-mono text-xs font-medium tracking-[0.15em] text-white uppercase"
            >
              Quick Navigation
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-body transition-colors duration-200 hover:text-amber"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-labelledby="footer-resources">
            <h2
              id="footer-resources"
              className="font-mono text-xs font-medium tracking-[0.15em] text-white uppercase"
            >
              Nursing Resources
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-body transition-colors duration-200 hover:text-amber"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-xs font-medium tracking-[0.15em] text-white uppercase">
              Get in Touch
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              <li className="flex items-start gap-3 text-sm text-body">
                <Mail className="mt-3.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center break-words transition-colors duration-200 hover:text-amber"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-body">
                <Phone className="mt-3.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                <a
                  href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
                  className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-amber"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-body">
                <MapPin className="mt-3.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                <span className="inline-flex min-h-11 items-center">{SITE.location}</span>
              </li>
            </ul>

            <a href="#contact" className="link-arrow mt-4 min-h-11 items-center text-sm">
              Send us a message
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
          {POLICY_LINKS.map((link) => {
            const copy = LEGAL_COPY[link.href]
            return (
              <section key={link.href} id={link.href.replace('#', '')} className="scroll-mt-24">
                <h2 className="font-mono text-xs font-medium tracking-[0.15em] text-amber uppercase">
                  {copy.title}
                </h2>
                <p className="mt-3 max-w-[60ch] text-xs leading-relaxed text-muted">
                  {copy.body}
                </p>
              </section>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {year} {SITE.name}. All rights reserved. Educational content only — not medical
            advice.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-xs text-muted transition-colors duration-200 hover:text-amber"
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
