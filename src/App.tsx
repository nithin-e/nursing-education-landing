import { useEffect } from 'react'

import About from '@/components/About'
import Careers from '@/components/Careers'
import Contact from '@/components/Contact'
import { EnquiryModalProvider } from '@/components/EnquiryModalProvider'
import Exams from '@/components/Exams'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import JoinCommunity from '@/components/JoinCommunity'
import People from '@/components/People'
import Research from '@/components/Research'
import Resources from '@/components/Resources'
import Ticker from '@/components/Ticker'
import Visionaries from '@/components/Visionaries'
import useReveal from '@/lib/useReveal'

export default function App() {
  useEffect(() => useReveal(), [])

  /* Wraps every section so the header, people carousel and conversion bands all
     share one enquiry dialog rather than each mounting their own. */
  return (
    <EnquiryModalProvider>
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
          <Visionaries />
          <People />
          <JoinCommunity />
          <Contact />
        </main>

        <Footer />
      </div>
    </EnquiryModalProvider>
  )
}
