import { ArrowRight, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useContactModal } from './ContactModal'

/**
 * Mobile-only fixed action bar. Hidden while the hero or the contact section is
 * in view, and while the contact modal is open, so it never covers content or
 * duplicates the hero CTAs.
 */
export default function MobileActionBar() {
  const { open, openModal } = useContactModal()
  const [pastHero, setPastHero] = useState(false)
  const [atContact, setAtContact] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    const contact = document.getElementById('contact')
    if (!hero || !contact) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    )
    const contactObserver = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { threshold: 0.15 },
    )

    heroObserver.observe(hero)
    contactObserver.observe(contact)
    return () => {
      heroObserver.disconnect()
      contactObserver.disconnect()
    }
  }, [])

  const visible = pastHero && !atContact && !open

  return (
    <div
      aria-hidden={!visible}
      className={cnBar(visible)}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <div className="flex h-16 items-center gap-3 px-4">
        <a
          href="#resources"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill bg-amber px-3 text-sm font-semibold text-black"
        >
          Explore Resources
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </a>
        <a
          href="#contact"
          tabIndex={visible ? undefined : -1}
          onClick={(event) => {
            if (window.innerWidth <= 768) {
              event.preventDefault()
              openModal(event.currentTarget)
            }
          }}
          className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill border-[1.5px] border-amber bg-transparent px-3 text-sm font-semibold text-amber"
        >
          <Mail className="size-4 shrink-0" aria-hidden="true" />
          Contact Us
        </a>
      </div>
    </div>
  )
}

function cnBar(visible: boolean) {
  return [
    'fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/85 backdrop-blur-md',
    'transition-transform duration-300 ease-out md:hidden',
    visible ? 'pointer-events-auto' : 'pointer-events-none',
  ].join(' ')
}


