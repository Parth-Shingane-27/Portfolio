import { ArrowRight, ArrowUpRight, Globe, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { FeaturedProject } from '../../data/portfolio'
import { scroller } from '../../lib/scroller'
import { Github } from '../ui/BrandIcons'
import { ProjectVisual } from './ProjectVisuals'

function Block({ title, items }: { title: string; items: string[] | string }) {
  const list = Array.isArray(items) ? items : [items]
  return (
    <section>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
        {title}
      </h4>
      <ul className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
        {list.map((t) => (
          <li key={t} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Detailed project presentation in a native modal <dialog>: focus trap, Esc to close and focus restore come built in. */
export function CaseStudy({
  project,
  projects,
  onSelect,
  onClose,
}: {
  project: FeaturedProject | null
  projects: FeaturedProject[]
  onSelect: (p: FeaturedProject) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  const isOpen = !!project

  // Open/close the native dialog only when visibility changes (not when switching between projects).
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (isOpen && !d.open) d.showModal()
    if (!isOpen && d.open) d.close()
  }, [isOpen])

  // Page scrolling is locked for exactly as long as the dialog is open, including across "Next project" switches.
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    scroller.lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      scroller.lenis?.start()
    }
  }, [isOpen])

  const cs = project?.caseStudy
  const next = project ? projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length] : undefined

  return (
    <dialog
      ref={ref}
      aria-labelledby="case-title"
      data-lenis-prevent
      onClose={() => {
        document.body.style.overflow = ''
        scroller.lenis?.start()
        onClose()
      }}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="case-study m-auto max-h-[92vh] w-[min(1040px,94vw)] overflow-y-auto overscroll-contain rounded-3xl border border-line-strong bg-surface p-0 text-ink shadow-2xl"
    >
      {project && cs && (
        <div>
          <div className="relative flex justify-center overflow-hidden border-b border-line bg-bg">
            <div className="aspect-[16/10] h-[min(38vh,340px)]">
              <ProjectVisual id={project.id} />
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => ref.current?.close()}
              aria-label="Close case study"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-bg/70 backdrop-blur transition hover:border-ink"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
              Case study · {project.category}
            </p>
            <h3 id="case-title" className="display mt-3 text-[clamp(2rem,5vw,4rem)]">
              {project.name}
            </h3>
            <p className="mt-2 text-muted">{project.tagline}</p>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <Block title="The problem" items={cs.problem} />
              <Block title="My contribution" items={cs.contribution} />
              <Block title="Technical approach" items={cs.approach} />
              <Block title="Key engineering decisions" items={cs.decisions} />
              <Block title="Results" items={cs.results} />
              <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                  Stack
                </h4>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.stack.join(' · ')}</p>
              </section>
            </div>

            {project.note && <p className="mt-10 border-l-2 border-line-strong pl-4 text-sm text-muted">{project.note}</p>}

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm transition hover:border-ink"
                  >
                    {l.kind === 'repo' ? <Github size={14} /> : <Globe size={14} />}
                    {l.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            )}

            {next && next.id !== project.id && (
              <button
                type="button"
                onClick={() => {
                  onSelect(next)
                  ref.current?.scrollTo({ top: 0 })
                }}
                className="group mt-12 flex w-full items-center justify-between gap-4 border-t border-line pt-8 text-left"
              >
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Next project</span>
                  <span className="display mt-2 block text-[clamp(1.6rem,4vw,3rem)] transition-transform duration-500 group-hover:translate-x-2">{next.name}</span>
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong transition group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                  <ArrowRight size={18} />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
