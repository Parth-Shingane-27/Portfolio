import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-muted">
      {children}
    </span>
  )
}
