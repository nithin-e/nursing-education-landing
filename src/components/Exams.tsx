import { Info } from 'lucide-react'
import { useState } from 'react'

import { EXAM_CARDS, EXAM_DISCLAIMER } from '@/data/nursingData'
import Reveal from './ui/Reveal'
import Section, { SectionBody } from './ui/Section'
import SectionHeading from './ui/SectionHeading'

export default function Exams() {
  const [active, setActive] = useState(0)
  return (
    <Section id="exams" tone="black">
      <SectionBody>
        <SectionHeading
          align="left"
          eyebrow="Exams & certifications"
          title="Nursing exams & certifications"
          emphasis={['certifications']}
          description="Discover information about nursing examinations, licensing pathways and professional certifications."
        />

        <div className="mt-12 hidden lg:flex" style={{ height: 'clamp(420px,55vh,520px)', gap: '12px' }}>
          {EXAM_CARDS.map((card, idx) => {
            const isActive = active === idx
            const num = String(idx + 1).padStart(2, '0')
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => setActive(idx)}
                className={`relative group flex flex-col justify-between rounded-card border border-white/10 transition-all duration-500 ease-out overflow-hidden ${isActive ? 'flex-[2]' : 'flex-[1]'}`}
                style={{
                  background: 'radial-gradient(120% 120% at 100% 0%, rgba(255,193,7,0.08) 0%, rgba(11,18,32,1) 60%, rgba(5,8,15,1) 100%)',
                }}
              >
                <span aria-hidden className="absolute inset-0 pointer-events-none ecg-grid opacity-[0.03]" />
                <span
                  aria-hidden
                  className="absolute bottom-0 right-0 pointer-events-none font-display font-extrabold text-transparent tabular-nums leading-none"
                  style={{
                    fontSize: '220px',
                    WebkitTextStroke: '1px rgba(255,193,7,0.25)',
                  }}
                >
                  {num}
                </span>
                <div className="relative z-10 flex items-start justify-between p-6">
                  <span className="font-mono text-xs text-amber tabular-nums">{num}</span>
                  <svg width="48" height="48" viewBox="0 0 24 24" className="stroke-amber" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect width="6" height="4" x="9" y="3" rx="2" />
                    <path d="M9 12h6" />
                    <path d="M9 16h6" />
                  </svg>
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-between p-6">
                  {isActive ? (
                    <div className="flex flex-col gap-4 transition-opacity duration-300">
                      {Array.isArray((card as any).points) && (card as any).points.length > 0 ? (
                        <ul className="flex flex-col divide-y divide-white/10">
                          {(card as any).points.map((point: string) => (
                            <li key={point} className="flex items-start gap-3 py-3">
                              <span className="mt-2 h-px w-3 bg-amber" />
                              <span className="text-sm text-white/90">{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <p className="text-base text-muted max-w-[48ch]">{card.description}</p>
                    </div>
                  ) : (
                    <div className="flex h-full items-end">
                      <h3 className="font-display text-2xl text-white text-left [writing-mode:vertical-lr] rotate-180 origin-bottom-left ml-2">
                        {card.title}
                      </h3>
                    </div>
                  )}
                  <div className="mt-6 flex items-end justify-between">
                    {isActive && (
                      <a href="#contact" className="link-arrow group">
                        Learn More <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    )}
                    <h3 className={`font-display text-white ${isActive ? 'text-2xl sm:text-[32px]' : 'sr-only'}`}>{card.title}</h3>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col divide-y divide-line border-t border-line lg:hidden">
          {EXAM_CARDS.map((card, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            return (
              <details key={card.title} className="group" open={idx === 0}>
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-3 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-sm tabular-nums text-amber">{num}</span>
                    <h3 className="truncate font-display text-lg text-white sm:text-2xl">
                      {card.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center text-amber transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-5 pl-9">
                  {Array.isArray((card as any).points) && (card as any).points.length > 0 ? (
                    <ul className="mb-4 flex flex-col divide-y divide-white/10">
                      {(card as any).points.map((point: string) => (
                        <li key={point} className="flex items-start gap-3 py-2.5">
                          <span aria-hidden="true" className="mt-2 h-px w-3 bg-amber" />
                          <span className="text-[15px] text-white/90">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="text-[15px] leading-[1.55] text-muted">{card.description}</p>
                  <a
                    href="#contact"
                    className="link-arrow mt-4 inline-flex min-h-12 items-center gap-2 text-amber"
                  >
                    Learn More →
                  </a>
                </div>
              </details>
            )
          })}
        </div>

        <Reveal className="mt-8" delay={0.08}>
          <p className="flex flex-col gap-3 rounded-card border border-line bg-navy p-5 text-sm leading-relaxed text-body sm:flex-row sm:items-start sm:gap-3.5 sm:p-6">
            <Info className="size-5 shrink-0 text-amber" aria-hidden="true" />
            <span>{EXAM_DISCLAIMER}</span>
          </p>
        </Reveal>
      </SectionBody>
    </Section>
  )
}
