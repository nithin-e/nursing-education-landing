import { useEffect } from 'react'

import About from '@/components/About'
import Careers from '@/components/Careers'
import Contact from '@/components/Contact'
import { DetailProvider } from '@/components/DetailProvider'
import DetailPanel from '@/components/DetailPanel'
import { EnquiryModalProvider } from '@/components/EnquiryModalProvider'
import Exams from '@/components/Exams'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import GuidanceSteps from '@/components/GuidanceSteps'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import JoinCommunity from '@/components/JoinCommunity'
import People from '@/components/People'
import Research from '@/components/Research'
import Resources from '@/components/Resources'
import Ticker from '@/components/Ticker'
import { SHOW_TEAM } from '@/data/team'
import Visionaries from '@/components/Visionaries'
import useReveal from '@/lib/useReveal'

export default function App() {
  useEffect(() => useReveal(), [])

  /* Two providers wrap the page: the enquiry dialog and the detail panel are each
     shared by every section that opens them, rather than each card mounting its
     own copy. `DetailProvider` sits inside the enquiry provider because the panel
     hands over to the sign-up form. */
  return (
    <EnquiryModalProvider>
      <DetailProvider>
        <div className="flex min-h-screen flex-col bg-ink">
        <a
          href="#main"
          className="sr-only rounded-pill bg-amber px-6 py-3 font-semibold text-black focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main" className="flex-1">
          <Hero />
          <Resources />
          <Ticker />
          <Exams />
          <Careers />
          <Research />
          <About />
          {/* The team section is only mounted once real, approved nursing
              leadership bios replace the current MBBS ones. Guidance takes the
              same slot until then. */}
          {SHOW_TEAM ? <Visionaries /> : <GuidanceSteps />}
          <People />
          <JoinCommunity />
          <Contact />
          <Faq />
        </main>

        <Footer />
        </div>

        {/* One panel for the whole page. Always mounted; it renders nothing until
            a card opens it. Below the sign-up modal in the stacking order
            (z-100 against z-200), so that form always wins. */}
        <DetailPanel />
      </DetailProvider>
    </EnquiryModalProvider>
  )
}
