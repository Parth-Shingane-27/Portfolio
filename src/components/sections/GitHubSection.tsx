import { AlertCircle, ArrowUpRight, Globe, Loader2, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { profile, repos, type RepoKind } from '../../data/portfolio'
import { useGithubMeta } from '../../hooks/useGithubMeta'
import { repoKey, type GithubStatus } from '../../lib/github'
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
  'rate-limited': 'GitHub’s public API rate limit was reached, so live language and activity data is hidden. Details below come from each README.',
  partial: 'Some repositories could not be reached on GitHub. Live data is shown where available.',
  error: 'GitHub’s API is unreachable right now. Details below come from each README.',
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })

export function GitHubSection() {
  const [filter, setFilter] = useState<Filter>('all')
  const { meta, status } = useGithubMeta()
  const visible = useMemo(() => repos.filter((r) => filter === 'all' || r.kind === filter), [filter])

  // Language mix is computed only from repositories GitHub actually returned; nothing is simulated.
  const languages = useMemo(() => {
    const count = new Map<string, number>()
    for (const r of repos) {
      const l = meta[repoKey(r)]?.language
      if (l) count.set(l, (count.get(l) ?? 0) + 1)
    }
    const total = [...count.values()].reduce((a, b) => a + b, 0)
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([name, n]) => ({ name, n, pct: (n / total) * 100 }))
  }, [meta])
  const palette = ['#c6ff3a', '#e4e4e7', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a']

  return (
    <section id="github" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <SectionHeading eyebrow="GitHub" title="Code in the *open.*" />

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="panel">
              <div className="p-5 font-mono text-[13px] leading-7 text-muted">
                <div className="mb-3 flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                </div>
                <p><span className="text-ink">const</span> developer = {'{'}</p>
                <p className="pl-4">github: <span className="text-accent">'{profile.githubUser}'</span>,</p>
                <p className="pl-4">repos: <span className="text-accent">{repos.length}</span>,</p>
                <p className="pl-4">focus: [<span className="text-accent">'full-stack'</span>, <span className="text-accent">'ai/ml'</span>, <span className="text-accent">'iot'</span>],</p>
                <p className="pl-4">city: <span className="text-accent">'{profile.location}'</span></p>
                <p>{'}'}</p>
              </div>
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-accent-ink transition hover:bg-ink"
            >
              <Github size={18} /> github.com/{profile.githubUser} <ArrowUpRight size={14} />
            </a>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Languages across these repositories</p>
              {languages.length > 0 ? (
                <>
                  <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-line" role="img" aria-label={languages.map((l) => `${l.name} ${l.pct.toFixed(0)}%`).join(', ')}>
                    {languages.map((l, i) => (
                      <span key={l.name} style={{ width: `${l.pct}%`, background: palette[i % palette.length] }} />
                    ))}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    {languages.map((l, i) => (
                      <li key={l.name} className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: palette[i % palette.length] }} />
                        {l.name} · {l.n}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-3 text-sm text-muted">{status === 'loading' ? 'Loading from GitHub…' : 'Unavailable right now — see the profile for live data.'}</p>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-md text-sm text-muted">
                {repos.length} public repositories where GitHub shows commits by me, including teammates’ repositories. Language and activity are fetched live from the GitHub API.
              </p>
              <div role="group" aria-label="Filter repositories" className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={filter === f.id}
                    className={`rounded-full border px-4 py-2 text-sm transition ${filter === f.id ? 'border-accent bg-accent text-accent-ink' : 'border-line-strong text-muted hover:border-ink hover:text-ink'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div aria-live="polite" className="mt-4 min-h-6 text-sm text-muted">
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

            <ul className="mt-4 divide-y divide-line border-y border-line">
              {visible.map((r) => {
                const m = meta[repoKey(r)]
                const url = `https://github.com/${r.owner}/${r.name}`
                const lang = m?.language ?? r.fallbackLanguage
                return (
                  <li key={url} className="group py-5 transition-colors hover:bg-surface">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-lg font-bold">
                        <a href={url} target="_blank" rel="noreferrer" className="hover:text-accent">
                          {r.title}
                        </a>
                      </h3>
                      <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted">
                        {r.kind === 'team' ? <Users size={12} /> : <Github size={12} />}
                        {r.kind === 'team' ? `Contributor · ${r.owner}` : 'Owner'}
                        {m && <span> · {formatDate(m.pushedAt)}</span>}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{r.blurb}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {lang && !r.stack.includes(lang) && <Badge>{lang}</Badge>}
                      {r.stack.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                      {r.demo && (
                        <a href={r.demo} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-sm hover:text-accent">
                          <Globe size={14} /> Live <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>

            <p className="mt-6 text-sm text-muted">Private repositories and contributions not attributed to my account do not appear here.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
