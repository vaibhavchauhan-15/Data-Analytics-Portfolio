import { getGitHubRepos } from '@/lib/github'
import { SITE_CONFIG } from '@/lib/config'

import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/shared/CursorGlow'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { KPIStats } from '@/components/sections/KPIStats'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { Certifications } from '@/components/sections/Certifications'
import { Projects } from '@/components/sections/Projects'
import { DashboardShowcase } from '@/components/sections/DashboardShowcase'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { DataStorytelling } from '@/components/sections/DataStorytelling'
import { GitHubSection } from '@/components/sections/GitHub'
import { TechStack } from '@/components/sections/TechStack'
import { Achievements } from '@/components/sections/Achievements'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

export default async function Home() {
  const repos = await getGitHubRepos()

  return (
    <SmoothScroll>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />
        <About />
        <KPIStats />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <DashboardShowcase />
        <CaseStudies />
        {SITE_CONFIG.showDataStorytelling && <DataStorytelling />}
        <GitHubSection repos={repos} />
        <TechStack />
        <Achievements />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
