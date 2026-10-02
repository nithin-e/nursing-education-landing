import { useEffect, useRef, useState } from 'react'

/** Milestones reuse wording already present in the Careers copy and data file. */
const MILESTONES = [
  { x: 40, y: 150, label: ['STUDENT', 'NURSE'], labelY: 118 },
  { x: 106, y: 130, label: ['REGISTERED', 'NURSE'], labelY: 98 },
  { x: 172, y: 112, label: ['SPECIALIST'], labelY: 80 },
  { x: 238, y: 94, label: ['ADVANCED', 'PRACTICE'], labelY: 62 },
  { x: 304, y: 78, label: ['EDUCATOR'], labelY: 46 },
] as const

/** Flat start on the left, then a rise in steps with a heartbeat spike between each. */
const PATH =
  'M 18 150 L 40 150 L 62 150 L 67 150 L 71 138 L 75 158 L 79 144 L 83 150 L 98 150 ' +
  'L 106 130 L 128 130 L 133 130 L 137 118 L 141 138 L 145 124 L 149 130 L 164 130 ' +
  'L 172 112 L 194 112 L 199 112 L 203 100 L 207 120 L 211 106 L 215 112 L 230 112 ' +
  'L 238 94 L 260 94 L 265 94 L 269 82 L 273 102 L 277 88 L 281 94 L 296 94 ' +
  'L 304 78 L 322 78'

/** Specialities are lifted verbatim from the Nursing Specializations copy. */
const SPECIALITIES = [
  'critical care',
  'emergency',
  'theatre',
  'paediatric',
  'community',
  'mental health',
]

function MarqueeStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="relative z-[1] mt-6 overflow-hidden"
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        className="career-marquee-track flex w-max items-center whitespace-nowrap font-mono text-[14px] text-muted"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-6 pr-6"
            aria-hidden={copy === 1}
          >
            {SPECIALITIES.map((item) => (
              <span key={item} className="flex shrink-0 items-center gap-6">
                {item}
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-amber" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Compact 180px career-path visual for phones. Replaces the tall photo card on
 * mobile: the growth line draws in once, milestones pop in on a 120ms stagger
 * and the final dot keeps a soft vital-green glow.
 */
export default function CareerPathMobile() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDrawn(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="relative z-[1] mt-6 lg:hidden">
      <div
        className="relative h-[180px] w-full overflow-hidden rounded-media border border-white/8"
        style={{ backgroundImage: 'linear-gradient(180deg, #0B1220, #05080F)' }}
      >
        {/* Decorative grid + glow layers. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 28px)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            backgroundImage:
              'radial-gradient(120% 80% at 100% 100%, rgba(52,211,153,0.16), transparent 70%)',
          }}
        />

        <svg
          viewBox="0 0 340 180"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden="true"
        >
          <defs>
            <filter id="career-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={PATH}
            fill="none"
            stroke="#FFBF00"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            filter="url(#career-glow)"
            className="career-path-line"
            style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1 }}
          />

          {MILESTONES.map((m, i) => (
            <g key={m.label.join('-')}>
              <circle
                cx={m.x}
                cy={m.y}
                r={3.5}
                fill="#FFBF00"
                className="career-path-dot"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  transform: drawn ? 'scale(1)' : 'scale(0)',
                  transitionDelay: `${400 + i * 120}ms`,
                }}
              />
              {i === MILESTONES.length - 1 && (
                <>
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={9}
                    fill="var(--vital)"
                    className="career-path-final-glow"
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  <circle cx={m.x} cy={m.y} r={4.5} fill="#FFBF00" />
                </>
              )}
            </g>
          ))}

          {MILESTONES.map((m, i) => (
            <text
              key={`label-${i}`}
              x={m.x}
              y={m.labelY}
              textAnchor="middle"
              fill="rgba(255,255,255,0.62)"
              fontSize={10}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
              className="career-path-dot"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                opacity: drawn ? 1 : 0,
                transform: drawn ? 'scale(1)' : 'scale(0.9)',
                transitionDelay: `${400 + i * 120}ms`,
              }}
            >
              {m.label.map((line, lineIdx) => (
                <tspan key={lineIdx} x={m.x} dy={lineIdx === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
          ))}
        </svg>
      </div>

      <MarqueeStrip />
    </div>
  )
}