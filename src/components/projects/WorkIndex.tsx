import { ArrowUpRight, Globe, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import type { Repo } from '../../data/portfolio'
import { Badge } from '../ui/Badge'
import { Github } from '../ui/BrandIcons'

function Row({ r, open, dim, onToggle }: { r: Repo; open: boolean; dim: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li className={`border-b border-line transition-opacity duration-300 ${dim ? 'opacity-40' : 'opacity-100'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-9"
      >
        <span className={`display block text-[clamp(1.7rem,4.4vw,3.8rem)] transition-all duration-500 group-hover:translate-x-3 ${open ? 'em-accent' : ''}`}>{r.title}</span>
        <span className="flex shrink-0 items-center gap-6">
          <span className="hidden font-mono text-xs text-muted lg:block">{r.stack.slice(0, 3).join(' · ')}</span>
          <span className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-accent bg-accent text-bg' : 'border-line-strong group-hover:border-ink'}`}>
            <Plus size={18} />
          </span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-9 md:grid-cols-[1.4fr_1fr]">
              <p className="max-w-xl leading-relaxed text-muted">{r.blurb}</p>
              <div>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {r.stack.map((s) => (
                    <li key={s}>
                      <Badge>{s}</Badge>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                  <a href={`https://github.com/${r.owner}/${r.name}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                    <Github size={14} /> Repository <ArrowUpRight size={12} />
                  </a>
                  {r.demo && (
                    <a href={r.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                      <Globe size={14} /> Live <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/** Accordion index of secondary builds: one open at a time, the open title flips to the serif accent. Works by mouse, keyboard and touch. */
export function WorkIndex({ items }: { items: Repo[] }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <ul className="border-t border-line">
      {items.map((r) => (
        <Row key={r.name} r={r} open={open === r.name} dim={open !== null && open !== r.name} onToggle={() => setOpen((o) => (o === r.name ? null : r.name))} />
      ))}
    </ul>
  )
}
