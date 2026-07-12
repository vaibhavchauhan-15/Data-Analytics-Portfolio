import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/shared/CursorGlow'
import { SmoothCursor } from '@/components/magicui/smooth-cursor'
import { FloatingDock } from '@/components/layout/FloatingDock'
import { Footer } from '@/components/layout/Footer'

import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { DashboardShowcase } from '@/components/sections/DashboardShowcase'
import { Certifications } from '@/components/sections/Certifications'
import { Education } from '@/components/sections/Education'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CursorGlow />
      <SmoothCursor />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <DashboardShowcase />
        <Certifications />
        <Education />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <FloatingDock />
    </SmoothScroll>
  )
}
