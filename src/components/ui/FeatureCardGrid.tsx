import type { FeatureCard as FeatureCardData } from '@/data/nursingData'
import FeatureCardItem from './FeatureCardItem'

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

/**
 * Cards are revealed once as a single block by the parent section rather than
 * staggering individually — animating every tile is both noisy and slower to paint.
 */
export default function FeatureCardGrid({
  items,
  tone = 'light',
  linkHref = '#contact',
  linkLabel = 'Explore More',
  columns = 3,
}: FeatureCardGridProps) {
  return (
    <ul className={`grid gap-4 sm:gap-5 ${columnClasses[columns]}`}>
      {items.map((card) => (
        <li key={card.title}>
          <FeatureCardItem card={card} tone={tone} linkHref={linkHref} linkLabel={linkLabel} />
        </li>
      ))}
    </ul>
  )
}