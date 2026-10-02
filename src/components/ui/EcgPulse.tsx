import type { SVGProps } from 'react'

export interface EcgPulseProps extends SVGProps<SVGSVGElement> {
  animate?: boolean
  speedMs?: number
  opacity?: number
}

export default function EcgPulse({
  animate = true,
  speedMs = 3000,
  opacity = 0.25,
  className,
  ...rest
}: EcgPulseProps) {
  const pathId = `ecg-path-${Math.random().toString(36).slice(2)}`
  const style = {
    '--ecg-speed': `${speedMs}ms`,
  } as React.CSSProperties

  return (
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className={className}
      style={style}
      {...rest}
    >
      <defs>
        <filter id={`${pathId}-glow`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 0 50 L 200 50 L 220 20 L 240 50 L 260 80 L 280 50 L 320 50 L 360 50 L 380 30 L 400 50 L 420 70 L 440 50 L 480 50 L 520 50 L 540 40 L 560 50 L 580 60 L 600 50 L 640 50 L 680 50 L 700 35 L 720 50 L 740 65 L 760 50 L 800 50 L 840 50 L 860 45 L 880 50 L 900 55 L 920 50 L 960 50 L 1000 50"
        fill="none"
        stroke="var(--vital)"
        strokeWidth={1.5}
        pathLength={1}
        opacity={opacity}
        filter={`url(#${pathId}-glow)`}
        style={{
          strokeDasharray: animate ? 1 : 'none',
          strokeDashoffset: animate ? 1 : 0,
          animation: animate ? 'ecg-draw var(--ecg-speed) linear infinite' : undefined,
          transformOrigin: 'center',
        }}
      />
    </svg>
  )
}
