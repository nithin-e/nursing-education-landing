import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the header can highlight the
 * matching navigation item. Uses IntersectionObserver — no scroll listeners.
 */
export default function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0.05, 0.25, 0.5],
      },
    )

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}