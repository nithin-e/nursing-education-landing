import type { FeatureCard as FeatureCardData } from '@/data/nursingData'
import FeatureCardItem from './FeatureCardItem'
import Reveal from './Reveal'

export type FeatureCardGridProps = {
  items: FeatureCardData[]
  tone?: 'light' | 'dark'
  linkHref?: string
  linkLabel?: string
  columns?: 2 | 3 | 4
}

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 xl:grid-cols-4',
}

export default function FeatureCardGrid({
  items,
  tone = 'light',
  linkHref = '#contact',
  linkLabel = 'Explore More',
  columns = 3,
}: FeatureCardGridProps) {
  return (
    <ul className={`grid gap-6 ${columnClasses[columns]}`}>
      {items.map((card, index) => (
        <Reveal as="li" key={card.title} delay={index * 0.07}>
          <FeatureCardItem card={card} tone={tone} linkHref={linkHref} linkLabel={linkLabel} />
        </Reveal>
      ))}
    </ul>
  )
}