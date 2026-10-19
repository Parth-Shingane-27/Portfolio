import type { ReactNode } from 'react'

export function SectionHeading({ index, eyebrow, children }: { index: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {index} — {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">{children}</h2>
    </div>
  )
}
