import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { PHONE_TEL, whatsappLink } from '@/data/contact'
import { FAQ_ITEMS } from '@/data/faq'
import { cn } from '@/lib/cn'
import Section from './ui/Section'

const WHATSAPP_MESSAGE = 'I have a question about nursing guidance'

/**
 * FAQPage structured data, built from the same `FAQ_ITEMS` array the accordion
 * renders, so the markup and the search snippet can never drift apart.
 *
 * Serialised through `dangerouslySetInnerHTML` because that is how a JSON-LD
 * block is meant to reach the DOM - React would otherwise escape the quotes.
 * Safe here: the input is this project's own static strings, never user data.
 */
function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

/** One bordered row: a question button, and the answer that unfolds beneath it
 * inside the same box.
 *
 * The height animation is the `grid-template-rows: 0fr -> 1fr` technique rather
 * than measuring `scrollHeight` in JS: the browser interpolates between the two
 * track sizes, so no reflow measurement, no resize listener and no magic pixel
 * heights. The inner `overflow-hidden` wrapper is what actually clips the text.
 */
function FaqRow({ item, isOpen, onToggle }: { item: (typeof FAQ_ITEMS)[number]; isOpen: boolean; onToggle: () => void }) {
  const buttonId = `faq-question-${item.id}`
  const panelId = `faq-answer-${item.id}`

  return (
    <li className="mb-4 rounded-[14px] border border-white/70 p-[18px] last:mb-0 min-[769px]:p-6">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          /* `pr-9` reserves the 36px lane the absolutely-positioned chevron
             occupies, so a long question can never run underneath it. */
          className="relative flex min-h-12 w-full items-center bg-transparent pr-9 text-left text-[16px] font-semibold text-white transition-colors duration-200 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber min-[769px]:text-[17px] motion-reduce:transition-none"
        >
          {item.question}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'absolute right-3 top-1/2 size-4 -translate-y-1/2 text-amber transition-transform duration-[250ms] motion-reduce:transition-none',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h3>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-[250ms] ease-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="mt-4 text-[15px] leading-[1.7] text-[#D1D5DB] min-[769px]:text-[16px]"
          >
            {item.answer}
          </div>
        </div>
      </div>
    </li>
  )
}

/**
 * Q&A accordion, the last band on the page.
 *
 * One answer is open at a time and the first starts open, so the panel never
 * presents as an empty wall of borders. Holding a single `openId` rather than a
 * set is what enforces that: opening a row replaces the previous id.
 *
 * The heading is built here instead of through `SectionHeading` because this one
 * needs its own clamp - 30px to 48px against that component's 44px ceiling - and
 * its muted line carries two live links, which `SectionHeading`'s `gap-4` would
 * space differently.
 */
export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null)

  /* A `#faq-<id>` link, from the Exams button or from a shared URL, opens that
     row. The handler is read on mount and on every hashchange, which covers both
     a fresh page load and the same page.

     `scrollToSection` sets the hash with `replaceState`, which does not fire
     `hashchange`, so the Exams button relies on the second `openFromHash` call
     below rather than on this listener alone. */
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (!hash.startsWith('faq-')) return

      /* Matches the item's own slug first, then any shorter alias, so both
         `#faq-exams-and-certifications` and `#faq-exams` open this row. */
      const match = FAQ_ITEMS.find((item) => `faq-${item.id}` === hash || item.hash === hash)
      if (match) setOpenId(match.id)
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)

    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  return (
    <Section id="faq" tone="navy">
      <div className="mx-auto max-w-2xl text-center" data-fade="">
        <h2 className="font-display text-[clamp(30px,4vw,48px)] leading-[1.15] font-light text-white">
          Have <span className="font-extrabold">questions</span> about nursing guidance?
        </h2>

        <p className="mt-3 text-base text-[#D1D5DB]">
          {/* New tab for WhatsApp, so its web app cannot reach back into the page. */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="text-amber underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            Call us
          </a>{' '}
          or{' '}
          <a
            href={whatsappLink(WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            message us on WhatsApp
          </a>{' '}
          for more information.
        </p>
      </div>

      <div
        className="mx-auto mt-8 max-w-[1080px] rounded-[24px] bg-surface px-4 py-6 min-[769px]:rounded-[32px] min-[769px]:p-12"
        data-fade=""
      >
        <p className="mb-6 text-lg font-bold text-white">Q&amp;A</p>

        <ul>
          {FAQ_ITEMS.map((item) => (
            <FaqRow
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
            />
          ))}
        </ul>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }} />
    </Section>
  )
}