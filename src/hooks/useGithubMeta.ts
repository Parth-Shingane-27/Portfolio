import { useEffect, useState } from 'react'
import { repos } from '../data/portfolio'
import { fetchRepoMeta, type GithubStatus, type RepoMetaMap } from '../lib/github'

export function useGithubMeta() {
  const [meta, setMeta] = useState<RepoMetaMap>({})
  const [status, setStatus] = useState<GithubStatus>('loading')

  useEffect(() => {
    const ctrl = new AbortController()
    fetchRepoMeta(repos, ctrl.signal).then((r) => {
      if (ctrl.signal.aborted) return
      setMeta(r.data)
      setStatus(r.status)
    })
    return () => ctrl.abort()
  }, [])

  return { meta, status }
}
