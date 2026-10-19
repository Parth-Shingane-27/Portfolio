import { ArrowUpRight, ExternalLink, Globe, MonitorPlay, Shapes } from 'lucide-react'
import { useState } from 'react'
import type { FeaturedProject } from '../../data/portfolio'
import { Badge } from '../ui/Badge'
import { Github } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { ProjectVisual } from './ProjectVisuals'

/** A real embedded view of the deployed site (never a mockup). Only mounted after the visitor opts in. */
function LivePreview({ url, title }: { url: string; title: string }) {
  return (
    <div className="panel relative aspect-[16/10] w-full overflow-hidden">
      <div className="flex h-9 items-center gap-2 border-b border-line bg-surface-2 px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="mx-2 min-w-0 flex-1 truncate rounded-full bg-bg px-3 py-1 font-mono text-[10px] text-muted">{url.replace('https://', '')}</span>
        <a href={url} target="_blank" rel="noreferrer" aria-label={`Open ${title} live demo in a new tab`} className="text-muted transition hover:text-ink">
          <ExternalLink size={14} />
        </a>
      </div>
      <iframe
        src={url}
        title={`${title} live demo`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="h-[calc(100%-2.25rem)] w-full bg-white"
      />
    </div>
  )
}

function ModeTabs({ mode, setMode }: { mode: 'art' | 'live'; setMode: (m: 'art' | 'live') => void }) {
  const tab = (m: 'art' | 'live', label: string, Icon: typeof Shapes) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === m}
      onClick={() => setMode(m)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${mode === m ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}
    >
      <Icon size={13} /> {label}
    </button>
  )
  return (
    <div role="tablist" aria-label="Project view" className="mb-4 inline-flex rounded-full border border-line p-1">
      {tab('art', 'Illustration', Shapes)}
      {tab('live', 'Live preview', MonitorPlay)}
    </div>
  )
}

/** One project. Every project shares this exact layout: visual left, details right, nothing layered on top of anything. */
function ProjectBlock({ project, onOpen }: { project: FeaturedProject; onOpen: (p: FeaturedProject) => void }) {
  const [mode, setMode] = useState<'art' | 'live'>('art')

  return (
    <article id={`project-${project.id}`} data-project={project.id} className="grid items-start gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <Reveal>
          {project.preview && <ModeTabs mode={mode} setMode={setMode} />}
          {mode === 'live' && project.preview ? (
            <LivePreview url={project.preview} title={project.name} />
          ) : (
            <figure>
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`Open the ${project.name} case study`}
                className="panel block aspect-[16/10] w-full overflow-hidden text-left transition-colors duration-300 hover:border-line-strong"
              >
                <ProjectVisual id={project.id} />
              </button>
              <figcaption className="mt-3 font-mono text-[11px] text-muted">Illustration of the idea, not a screenshot.</figcaption>
            </figure>
          )}
        </Reveal>
      </div>

      <div className="lg:col-span-5">
        <Reveal delay={0.06}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{project.category}</p>
          <h3 className="display mt-3 text-[clamp(2rem,3.6vw,3.2rem)]">{project.name}</h3>
          <p className="mt-3 text-sm font-medium text-ink/85">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

          {project.results.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.stack.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>

          {project.note && <p className="mt-4 border-l-2 border-line-strong pl-4 text-xs leading-relaxed text-muted">{project.note}</p>}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition hover:bg-ink"
            >
              View Case Study <ArrowUpRight size={14} />
            </button>
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm transition hover:border-accent hover:text-accent"
              >
                {l.kind === 'repo' ? <Github size={14} /> : <Globe size={14} />}
                {l.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export function ProjectList({ projects, onOpen }: { projects: FeaturedProject[]; onOpen: (p: FeaturedProject) => void }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {projects.map((p) => (
        <ProjectBlock key={p.id} project={p} onOpen={onOpen} />
      ))}
    </div>
  )
}
