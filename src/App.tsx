import { Cursor } from './components/fx/Cursor'
import { ScrollProgress } from './components/fx/ScrollProgress'
import { SmoothScroll } from './components/fx/SmoothScroll'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Achievements } from './components/sections/Achievements'
import { Contact } from './components/sections/Contact'
import { GitHubSection } from './components/sections/GitHubSection'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
