import type { Repo } from '../data/portfolio'

export interface RepoMeta {
  language: string | null
  stars: number
  pushedAt: string
}

export type RepoMetaMap = Record<string, RepoMeta>
export type GithubStatus = 'loading' | 'ready' | 'partial' | 'rate-limited' | 'error'

interface Cached {
  at: number
  data: RepoMetaMap
  status: GithubStatus
}

const CACHE_KEY = 'gh-meta-v2'
const OK_TTL = 6 * 60 * 60 * 1000
// Failures are cached briefly so reloads don't burn the 60 requests/hour unauthenticated limit.
const FAIL_TTL = 15 * 60 * 1000

export const repoKey = (r: Pick<Repo, 'owner' | 'name'>) => `${r.owner}/${r.name}`

function readCache(): Cached | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Cached
    const ttl = c.status === 'ready' ? OK_TTL : FAIL_TTL
    return Date.now() - c.at < ttl ? c : null
  } catch {
    return null
  }
}

function writeCache(c: Cached) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(c))
  } catch {
    /* storage unavailable: skip caching */
  }
}

interface ApiRepo {
  name: string
  owner: { login: string }
  language: string | null
  stargazers_count: number
  pushed_at: string
}

/** One request per owner (not per repo) keeps usage to a handful of calls. Never throws. */
export async function fetchRepoMeta(
  repos: Repo[],
  signal: AbortSignal,
): Promise<{ data: RepoMetaMap; status: GithubStatus }> {
  const cached = readCache()
  if (cached) return { data: cached.data, status: cached.status }

  const owners = [...new Set(repos.map((r) => r.owner))]
  const data: RepoMetaMap = {}
  let limited = false

  await Promise.all(
    owners.map(async (owner) => {
      try {
        const res = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100`, {
          signal,
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (res.status === 403 || res.status === 429) {
          limited = true
          return
        }
        if (!res.ok) return
        for (const j of (await res.json()) as ApiRepo[]) {
          data[`${j.owner.login}/${j.name}`] = { language: j.language, stars: j.stargazers_count, pushedAt: j.pushed_at }
        }
      } catch {
        /* network failure: handled by the status below */
      }
    }),
  )

  if (signal.aborted) return { data, status: 'error' }

  const found = repos.filter((r) => data[repoKey(r)]).length
  const status: GithubStatus = found === repos.length ? 'ready' : limited ? 'rate-limited' : found > 0 ? 'partial' : 'error'
  writeCache({ at: Date.now(), data, status })
  return { data, status }
}
