import { useState } from 'react'
import { featuredProjects, repos, type FeaturedProject } from '../../data/portfolio'
import { CaseStudy } from '../projects/CaseStudy'
import { ProjectList } from '../projects/ProjectCard'
import { WorkIndex } from '../projects/WorkIndex'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

// Other verified builds from public repositories (descriptions come from each README).
const moreBuilds = ['Kurukshetra_Eklavya', 'SmartLearning', 'GRIDLOCK2.0_Prototype', 'nova9_CyberForge', 'SmartHome_Automation_Dashboard']
const more = moreBuilds.map((n) => repos.find((r) => r.name === n)).filter((r): r is NonNullable<typeof r> => !!r)

export function Projects() {
  const [open, setOpen] = useState<FeaturedProject | null>(null)

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Projects" title="Selected work. *Real impact.*" className="mb-6 md:mb-8" />

        <ProjectList projects={featuredProjects} onOpen={setOpen} />

        <div className="mt-28 md:mt-40">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">More builds</p>
            <h3 className="display mt-4 text-[clamp(1.8rem,4vw,3.2rem)]">The rest of the <span className="em-accent">workshop.</span></h3>
            <p className="mt-3 max-w-xl text-sm text-muted">Hackathon and course projects from my GitHub. Open a row for the details; the full list with live data is in the GitHub section.</p>
          </Reveal>
          <div className="mt-10">
            <WorkIndex items={more} />
          </div>
        </div>
      </div>

      <CaseStudy project={open} projects={featuredProjects} onSelect={setOpen} onClose={() => setOpen(null)} />
    </section>
  )
}
