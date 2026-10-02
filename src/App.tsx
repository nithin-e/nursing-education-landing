import About from '@/components/About'
import Careers from '@/components/Careers'
import CommunityCTA from '@/components/CommunityCTA'
import Contact from '@/components/Contact'
import Exams from '@/components/Exams'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MobileActionBar from '@/components/ui/MobileActionBar'
import News from '@/components/News'
import Research from '@/components/Research'
import Resources from '@/components/Resources'
import { ContactModalProvider } from '@/components/ui/ContactModal'
import { useStageReveal } from '@/lib/useStageReveal'
import useTouchFx from '@/lib/useTouchFx'

export default function App() {
  useStageReveal()
  useTouchFx()

  return (
    <ContactModalProvider>
      <div className="flex min-h-screen flex-col bg-ink">
        <a
          href="#main"
          className="sr-only rounded-pill bg-amber px-6 py-3 font-semibold text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to main content
        </a>

        <Header />

        {/* Mobile: the hero is pinned as a full screen and the sheet below
            slides up over it. Both wrappers are inert above 768px. */}
        <div className="stage">
          <Hero />
        </div>

        <main id="main" className="sheet flex-1">
          <About />
          <Resources />
          <Exams />
          <Careers />
          <Research />
          <News />
          <CommunityCTA />
          <Contact />
          <Footer />
        </main>

        <MobileActionBar />
      </div>
    </ContactModalProvider>
  )
}
