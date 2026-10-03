import { useId } from 'react'

export type DefaultAvatarProps = {
  /**
   * Intrinsic pixel size, matching the circle's rendered width/height on
   * desktop. The parent normally stretches the SVG with `size-full`, so this
   * mainly sets the fallback geometry and keeps the element from reserving an
   * unexpected intrinsic box.
   */
  size?: number
}

/** Every geometric value below is a percentage of the 180-unit viewBox. */
const VIEW_BOX = 180
const CENTRE = VIEW_BOX / 2
/** Head diameter is 32% of the circle, centred at 40% of its height. */
const HEAD_RADIUS = VIEW_BOX * 0.16
const HEAD_CENTRE_Y = VIEW_BOX * 0.4
/** Shoulders span 70% of the circle; the rest is hidden below the frame. */
const SHOULDER_RADIUS_X = VIEW_BOX * 0.35
const SHOULDER_RADIUS_Y = VIEW_BOX * 0.366

/**
 * Neutral stand-in for a missing profile photo: a flat silhouette drawn inline,
 * so it needs no image file and no network request. Used by the people cards
 * while the real portraits are outstanding.
 *
 * The silhouette is clipped to the circle here rather than relying on the
 * caller's `overflow-hidden`, so the component stays correct if it is reused
 * somewhere without a circular frame.
 */
export default function DefaultAvatar({ size = VIEW_BOX }: DefaultAvatarProps) {
  /* Cards render several of these at once, so the clip path needs an id that
     cannot collide. */
  const clipId = useId()

  return (
    <svg
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      width={size}
      height={size}
      role="img"
      aria-label="Profile photo placeholder"
      className="block size-full"
    >
      <clipPath id={clipId}>
        <circle cx={CENTRE} cy={CENTRE} r={CENTRE} />
      </clipPath>

      <g clipPath={`url(#${clipId})`}>
        <rect width={VIEW_BOX} height={VIEW_BOX} fill="#EEECE8" />

        <g fill="#C9C6C0">
          <circle cx={CENTRE} cy={HEAD_CENTRE_Y} r={HEAD_RADIUS} />
          <ellipse cx={CENTRE} cy={VIEW_BOX} rx={SHOULDER_RADIUS_X} ry={SHOULDER_RADIUS_Y} />
        </g>
      </g>
    </svg>
  )
}