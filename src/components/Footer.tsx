import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { NAV_LINKS, POLICY_LINKS, RESOURCE_LINKS, SITE, SOCIAL_LINKS } from '@/data/site'
import { BRAND_ICONS } from './ui/BrandIcons'
import Logo from './ui/Logo'

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
    <footer className="border-t border-charcoal-line bg-charcoal text-paper">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="flex min-w-0 flex-col gap-4">
            <Logo tone="dark" />
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-grey">{SITE.description}</p>
            <ul className="flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = BRAND_ICONS[social.label as keyof typeof BRAND_ICONS]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-md border border-white/12 text-paper/75 transition-colors hover:border-gold hover:text-gold"
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
            <h2 id="footer-nav" className="text-sm font-semibold text-paper">Quick Navigation</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-grey transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-labelledby="footer-resources">
            <h2 id="footer-resources" className="text-sm font-semibold text-paper">Nursing Resources</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-grey transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-paper">Get in Touch</h2>
            <ul className="mt-4 flex flex-col gap-3.5">
              <li className="flex items-start gap-3 text-sm text-grey">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="break-words transition-colors hover:text-gold">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-grey">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-gold">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-grey">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{SITE.location}</span>
              </li>
            </ul>

            <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-dark">
              Send us a message
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2">
          {POLICY_LINKS.map((link) => {
            const copy = LEGAL_COPY[link.href]
            return (
              <section key={link.href} id={link.href.replace('#', '')} className="scroll-mt-24">
                <h2 className="text-sm font-semibold text-gold">{copy.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-grey/85">{copy.body}</p>
              </section>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-grey/80">
            &copy; {year} {SITE.name}. All rights reserved. Educational content only — not medical advice.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs text-grey/80 transition-colors hover:text-gold">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}