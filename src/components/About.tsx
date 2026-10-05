import { useState } from 'react'

import { ABOUT_ROWS, ABOUT_TEXT, STATS } from '@/data/nursingData'
import { cn } from '@/lib/cn'
import scrollToSection from '@/lib/scrollToSection'
import Photo from './ui/Photo'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import StarList from './ui/StarList'
import Button from './ui/Button'

/**
 * Photo left, content right. If the photo is missing the two-column split
 * collapses to one centred column instead of leaving the content stranded
 * beside a 50%-wide gap.
 */
export default function About() {
  const [photoMissing, setPhotoMissing] = useState(false)

  return (
    <Section id="about">
      <div
        className={cn(
          'flex flex-col gap-10',
          !photoMissing && 'lg:flex-row lg:items-center lg:gap-16',
        )}
      >
{photoMissing ? null : (
            <div className="lg:w-1/2 lg:shrink-0" data-fade="">
              <Photo
                slot="aboutMain"
                alt="Dr Expert Edulinks events and students"
                className="w-full max-w-[560px] !rounded-[24px] !border-[rgb(255_255_255/0.08)] min-[769px]:!rounded-[28px]"
                onFail={() => setPhotoMissing(true)}
              />
            </div>
          )}

        <div
          className={cn(!photoMissing && 'lg:w-1/2', photoMissing && 'mx-auto w-full max-w-2xl')}
          data-fade=""
        >
          <SectionHeading
            align="left"
            label="About us"
            title="Supporting the future of nursing"
            emphasis={['future of nursing']}
            description={ABOUT_TEXT}
          />

          <div className="mt-8">
            <StarList items={ABOUT_ROWS} />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-extrabold text-amber">{stat.value}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            {/* Goes to the contact section, which is the thing the label
                promises. It used to open the sign-up dialog, so a visitor
                looking for contact details got a marketing form instead. */}
            <Button variant="primary" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
