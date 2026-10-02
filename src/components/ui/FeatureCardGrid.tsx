import { useRef } from 'react'

import type { FeatureCard as FeatureCardData } from '@/data/nursingData'
import { cn } from '@/lib/cn'
import { useRevealChildren } from '@/lib/useReveal'
import FeatureCardItem from './FeatureCardItem'
import type { FeatureCardItemProps } from './FeatureCardItem'

export type FeatureCardGridProps = {
  items: FeatureCardData[]
  surface?: FeatureCardItemProps['surface']
  layout?: FeatureCardItemProps['layout']
  accent?: FeatureCardItemProps['accent']
  roomy?: boolean
  linkHref?: string
  linkLabel?: string
  columns?: 2 | 3 | 4
  /** Turns the grid into a scroll-snap carousel on phones. */
  snap?: boolean
  className?: string
}

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 xl:grid-cols-4',
}

/**
 * Card grid with per-card scroll reveal. Each tile fades up on its own with an
 * 80ms stagger; the container stays a plain grid (or a snap track on mobile) so
 * layout is never animated.
 */
export default function FeatureCardGrid({
  items,
  surface = 'navy',
  layout = 'grid',
  accent = 'none',
  roomy = false,
  linkHref = '#contact',
  linkLabel = 'Explore More',
  columns = 3,
  snap = false,
  className = '',
}: FeatureCardGridProps) {
  const gridRef = useRef<HTMLUListElement>(null)
  // On mobile the grid is a carousel, so the track itself is the intersection
  // root: slides animate in together instead of waiting for a horizontal swipe.
  useRevealChildren(gridRef, snap ? gridRef : undefined)

  return (
    <ul
      ref={gridRef}
      data-reveal-group=""
      data-reveal-stagger=""
      className={cn(
        snap
          ? 'snap-row sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4'
          : `grid gap-5 sm:gap-6 ${columnClasses[columns]}`,
        className,
      )}
    >
      {items.map((card, index) => (
        <li
          key={card.title}
          data-reveal=""
          className={cn(snap && 'snap-item sm:w-auto sm:min-w-0')}
        >
          <FeatureCardItem
            card={card}
            surface={surface}
            layout={layout}
            accent={accent}
            index={index + 1}
            roomy={roomy}
            linkHref={linkHref}
            linkLabel={linkLabel}
          />
        </li>
      ))}
    </ul>
  )
}
