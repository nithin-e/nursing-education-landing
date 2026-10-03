import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { EXAM_DISCLAIMER, EXAM_GLASS_TEXT, EXAM_ITEMS } from '@/data/nursingData'
import Photo from './ui/Photo'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import StarList from './ui/StarList'
import Button from './ui/Button'

/**
 * Left column is a star list, right column is a two-photo collage. The collage
 * and the glass card that sits over it are one unit, so if the collage's main
 * photo is missing both disappear together rather than leaving an absolute
 * overlay floating over nothing.
 */
export default function Exams() {
  const [collageFailed, setCollageFailed] = useState(false)

  return (
    <Section id="exams" tone="navy">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-fade="" className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            label="Exams &amp; certifications"
            title="Everything you need for exams &amp; certifications"
            emphasis={['exams', 'certifications']}
            description="From nursing entrance tests to licensing and specialisation certificates, understand what each assessment covers before you sit it."
          />

          <div className="mt-8">
            <StarList items={EXAM_ITEMS} />
          </div>

          <div className="mt-8">
            <Button href="#contact" variant="primary">
              Learn More
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-8 text-[13px] leading-relaxed text-muted">{EXAM_DISCLAIMER}</p>
        </div>

        <div className="order-1 lg:order-2" data-fade="">
          {collageFailed ? null : (
            <div className="relative">
              <Photo
                slot="examsMain"
                alt="Nursing team in a clinical setting"
                className="h-[400px] lg:h-[520px]"
                useRatio={false}
                onFail={() => setCollageFailed(true)}
              />

              <Photo
                slot="examsSecondary"
                alt="Nursing students in a training session"
                className="absolute -bottom-8 -left-8 hidden h-44 w-56 ring-8 ring-navy-deep sm:block"
                useRatio={false}
              />

              <div className="absolute right-4 top-4 max-w-[15rem] rounded-[20px] border border-white/15 bg-black/45 p-5 backdrop-blur-md">
                <p className="text-[14px] leading-relaxed text-white">{EXAM_GLASS_TEXT}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
