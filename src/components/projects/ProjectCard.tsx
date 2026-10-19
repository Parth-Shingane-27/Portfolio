import { ArrowUpRight, ChevronDown, Globe } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import type { FeaturedProject } from '../../data/portfolio'
import { Badge } from '../ui/Badge'
import { Github } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { ProjectVisual } from './ProjectVisuals'

function Block({ title, items }: { title: string; items: string[] | string }) {
  const list = Array.isArray(items) ? items : [items]
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        {list.map((t) => (
          <li key={t} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const reduce = useReducedMotion()
  const flip = index % 2 === 1
  const cs = project.caseStudy

  return (
    <Reveal>
      <article className="group overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-ink/40">
        <div className={`grid lg:grid-cols-2 ${flip ? 'lg:[&>div:first-child]:order-2' : ''}`}>
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line lg:aspect-auto lg:border-b-0 lg:border-r">
            <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
              <ProjectVisual id={project.id} />
            </div>
            <span className="absolute bottom-3 left-3 rounded bg-bg/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur">
              Illustrative graphic · not a screenshot
            </span>
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, '0')} · {project.category}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{project.name}</h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
            <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

            {project.results.length > 0 && (
              <ul className="mt-5 space-y-1.5 text-sm">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>

            {project.note && <p className="mt-5 border-l-2 border-line pl-4 text-xs leading-relaxed text-muted">{project.note}</p>}

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                >
                  {l.kind === 'repo' ? <Github size={14} /> : <Globe size={14} />}
                  {l.label}
                  <ArrowUpRight size={12} />
                </a>
              ))}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={panelId}
                className="ml-auto inline-flex items-center gap-2 text-sm font-medium"
              >
                Case study
                <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line"
            >
              <div className="grid gap-10 p-6 md:grid-cols-2 md:p-10 lg:grid-cols-3">
                <Block title="Problem" items={cs.problem} />
                <Block title="My contribution" items={cs.contribution} />
                <Block title="Technical approach" items={cs.approach} />
                <Block title="Key engineering decisions" items={cs.decisions} />
                <Block title="Results" items={cs.results} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  )
}
