import { AlertCircle, ArrowUpRight, Globe, Loader2, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { featuredProjects, profile, repos, resumeOnlyProjects, type RepoKind } from '../../data/portfolio'
import { useGithubMeta } from '../../hooks/useGithubMeta'
import { repoKey, type GithubStatus } from '../../lib/github'
import { ProjectCard } from '../projects/ProjectCard'
import { Badge } from '../ui/Badge'
import { Github } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Filter = 'all' | RepoKind

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'own', label: 'My repositories' },
  { id: 'team', label: 'Team repositories' },
]

const statusMessage: Record<Exclude<GithubStatus, 'ready' | 'loading'>, string> = {
  'rate-limited': 'GitHub’s public API rate limit was reached, so live language and activity data is hidden. Repository details below are from the READMEs.',
  partial: 'Some repositories could not be reached on GitHub. Live data is shown where available.',
  error: 'GitHub’s API is unreachable right now. Repository details below are from the READMEs.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const { meta, status } = useGithubMeta()
  const visible = useMemo(() => repos.filter((r) => filter === 'all' || r.kind === filter), [filter])

  return (
    <section id="projects" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" eyebrow="Selected work">
          Products built around real problems.
        </SectionHeading>

        <div className="space-y-8">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="mt-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Every repository I’ve contributed to</p>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">The wider body of work.</h3>
              <p className="mt-3 max-w-xl text-sm text-muted">
                {repos.length} public repositories where GitHub shows commits by me — my own and teammates’. Language and activity come live from the{' '}
                <a className="underline decoration-accent underline-offset-4" href="https://docs.github.com/rest" target="_blank" rel="noreferrer">
                  GitHub API
                </a>
                .
              </p>
            </div>
            <div role="group" aria-label="Filter repositories" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`rounded-full border px-4 py-2 text-sm transition ${filter === f.id ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-ink hover:text-ink'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div aria-live="polite" className="mt-6 min-h-6 text-sm text-muted">
            {status === 'loading' && (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Loading live data from GitHub…
              </span>
            )}
            {status !== 'loading' && status !== 'ready' && (
              <span className="inline-flex items-start gap-2">
                <AlertCircle size={14} className="mt-0.5 shrink-0" /> {statusMessage[status]}
              </span>
            )}
          </div>

          {visible.length === 0 ? (
            <p className="mt-10 text-muted">No repositories match this filter.</p>
          ) : (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((r, i) => {
                const m = meta[repoKey(r)]
                const url = `https://github.com/${r.owner}/${r.name}`
                const lang = m?.language ?? r.fallbackLanguage
                return (
                  <li key={url}>
                    <Reveal delay={(i % 3) * 0.06} className="h-full">
                      <article className="flex h-full flex-col rounded-xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:border-ink/40">
                        <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                          <span className="inline-flex items-center gap-1.5">
                            {r.kind === 'team' ? <Users size={12} /> : <Github size={12} />}
                            {r.kind === 'team' ? `Contributor · ${r.owner}` : 'Owner'}
                          </span>
                          {m && <span>{formatDate(m.pushedAt)}</span>}
                        </div>
                        <h4 className="mt-4 font-display text-xl leading-snug">{r.title}</h4>
                        <p className="mt-1 break-all font-mono text-[11px] text-muted">{r.name}</p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.blurb}</p>
                        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                          {lang && !r.stack.includes(lang) && (
                            <li>
                              <Badge>{lang}</Badge>
                            </li>
                          )}
                          {r.stack.map((s) => (
                            <li key={s}>
                              <Badge>{s}</Badge>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex items-center gap-4 text-sm">
                          <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                            <Github size={14} /> Repository <ArrowUpRight size={12} />
                          </a>
                          {r.demo && (
                            <a href={r.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                              <Globe size={14} /> Live <ArrowUpRight size={12} />
                            </a>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          )}

          {filter !== 'team' && (
            <div className="mt-12 rounded-xl border border-dashed border-line p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">From my resume — no public repository</p>
              <ul className="mt-4 grid gap-6 md:grid-cols-2">
                {resumeOnlyProjects.map((p) => (
                  <li key={p.name}>
                    <h4 className="font-display text-lg">{p.name}</h4>
                    <p className="text-xs text-muted">{p.title}</p>
                    <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                    <p className="mt-2 font-mono text-[11px] text-muted">{p.stack.join(' · ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-8 text-sm text-muted">
            Not every contribution appears here, such as private repositories.{' '}
            <a className="underline decoration-accent underline-offset-4" href={profile.github} target="_blank" rel="noreferrer">
              See the full GitHub profile
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
