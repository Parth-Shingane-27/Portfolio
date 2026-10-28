import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { csFundamentals, skillCategories, skills, type Skill } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const W = 1200
const H = 760
const CX = W / 2
const CY = H / 2 + 20

const pillW = (label: string) => label.length * 7.6 + 30

interface Placed {
  skill: Skill
  x: number
  y: number
  anchor: 'start' | 'end' | 'middle'
}

/** Deterministic layout: five category hubs on an ellipse, technologies orbiting each hub. */
function layout() {
  const hubs = skillCategories.map((c, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180)
    return { cat: c, x: CX + 405 * Math.cos(a), y: CY + 270 * Math.sin(a), a, w: pillW(c) }
  })
  const nodes: Placed[] = []
  hubs.forEach((h) => {
    const items = skills.filter((s) => s.category === h.cat)
    const rx = h.w / 2 + 40
    const ry = items.length > 5 ? 96 : 80
    items.forEach((s, i) => {
      const a = h.a + Math.PI + ((i + 0.5) / items.length) * Math.PI * 2
      const x = h.x + rx * Math.cos(a)
      const y = h.y + ry * Math.sin(a)
      const c = Math.cos(a)
      nodes.push({ skill: s, x, y, anchor: Math.abs(c) < 0.3 ? 'middle' : c > 0 ? 'start' : 'end' })
    })
  })
  return { hubs, nodes }
}

export function Skills() {
  const { hubs, nodes } = useMemo(() => layout(), [])
  const [active, setActive] = useState<string | null>(null)
  const byId = useMemo(() => new Map(nodes.map((n) => [n.skill.id, n])), [nodes])
  const current = active ? skills.find((s) => s.id === active) : undefined
  const related = new Set(current ? [current.id, ...current.related, ...skills.filter((s) => s.related.includes(current.id)).map((s) => s.id)] : [])
  const dim = (id: string) => (current && !related.has(id) ? 0.18 : 1)

  const edges = useMemo(() => {
    const seen = new Set<string>()
    const out: { a: Placed; b: Placed; key: string }[] = []
    for (const s of skills)
      for (const r of s.related) {
        const key = [s.id, r].sort().join('|')
        const a = byId.get(s.id)
        const b = byId.get(r)
        if (seen.has(key) || !a || !b) continue
        seen.add(key)
        out.push({ a, b, key })
      }
    return out
  }, [byId])

  const pick = (id: string | null) => setActive(id)

  return (
    <section id="skills" className="relative py-28 md:py-36">
            <div className="relative mx-auto max-w-[1600px] px-5 md:px-8">
        <SectionHeading eyebrow="Skills" title="My tools of *creation.*" />

        {/* Orbital constellation (desktop) */}
        <div className="hidden lg:block">
          <div className="relative panel p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="group" aria-label="Interactive map of technologies grouped by category">
              {hubs.map((h) => (
                <line key={h.cat} x1={CX} y1={CY} x2={h.x} y2={h.y} stroke="var(--line-strong)" strokeDasharray="2 6" />
              ))}
              <circle cx={CX} cy={CY} r="34" fill="none" stroke="var(--line-strong)" />
              <circle cx={CX} cy={CY} r="5" fill="var(--ink)" className="pulse" />
              <text x={CX} y={CY + 56} textAnchor="middle" className="fill-muted font-mono" fontSize="10" letterSpacing="3">PARTH SHINGANE</text>

              {edges.map(({ a, b, key }) => {
                const on = !!current && related.has(a.skill.id) && related.has(b.skill.id) && (a.skill.id === current.id || b.skill.id === current.id)
                const mx = (a.x + b.x) / 2 + (CX - (a.x + b.x) / 2) * 0.25
                const my = (a.y + b.y) / 2 + (CY - (a.y + b.y) / 2) * 0.25
                return (
                  <path
                    key={key}
                    d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`}
                    fill="none"
                    stroke={on ? 'var(--accent)' : 'rgba(245,245,250,.5)'}
                    strokeWidth={on ? 1.8 : 1}
                    strokeOpacity={on ? 0.95 : current ? 0.03 : 0.07}
                    className={on ? 'flow' : undefined}
                    style={{ transition: 'stroke-opacity .3s' }}
                  />
                )
              })}

              {hubs.map((h) => (
                <g key={h.cat} opacity={current && current.category !== h.cat ? 0.35 : 1} style={{ transition: 'opacity .3s' }}>
                  <rect x={h.x - h.w / 2} y={h.y - 15} width={h.w} height="30" rx="15" fill="var(--bg)" stroke="var(--line-strong)" />
                  <text x={h.x} y={h.y + 4} textAnchor="middle" className="fill-ink font-mono" fontSize="11" letterSpacing="1.6">
                    {h.cat.toUpperCase()}
                  </text>
                </g>
              ))}

              {nodes.map((n) => {
                const hub = hubs.find((h) => h.cat === n.skill.category)!
                const isActive = active === n.skill.id
                return (
                  <g key={n.skill.id} opacity={dim(n.skill.id)} style={{ transition: 'opacity .3s' }}>
                    <line x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="var(--line-strong)" />
                    <g
                      tabIndex={0}
                      role="button"
                      aria-label={`${n.skill.name}: ${n.skill.blurb}`}
                      aria-pressed={isActive}
                      onPointerEnter={() => pick(n.skill.id)}
                      onPointerLeave={() => pick(null)}
                      onFocus={() => pick(n.skill.id)}
                      onBlur={() => pick(null)}
                      onClick={() => pick(isActive ? null : n.skill.id)}
                      className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-white"
                    >
                      <circle cx={n.x} cy={n.y} r={isActive ? 12 : 8} fill="var(--bg)" stroke={isActive ? 'var(--accent)' : 'var(--muted)'} strokeWidth="1.6" style={{ transition: 'r .25s' }} />
                      <circle cx={n.x} cy={n.y} r={isActive ? 5 : 3} fill={isActive ? 'var(--accent)' : 'var(--muted)'} style={{ transition: 'r .25s' }} />
                      <text
                        x={n.x + (n.anchor === 'start' ? 16 : n.anchor === 'end' ? -16 : 0)}
                        y={n.y + (n.anchor === 'middle' ? (n.y > hub.y ? 26 : -18) : 4)}
                        textAnchor={n.anchor}
                        className={isActive ? 'fill-accent font-sans' : 'fill-ink font-sans'}
                        fontSize="14"
                        fontWeight={isActive ? 700 : 500}
                      >
                        {n.skill.name}
                      </text>
                      <circle cx={n.x} cy={n.y} r="22" fill="transparent" />
                    </g>
                  </g>
                )
              })}
            </svg>

            <div aria-live="polite" className="min-h-[104px] border-t border-line p-5">
              <Info skill={current} />
            </div>
          </div>
        </div>

        {/* Touch / small-screen version: same data, no hover required */}
        <div className="lg:hidden">
          {skillCategories.map((c) => (
            <Reveal key={c} className="mb-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {c}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === c)
                  .map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => pick(active === s.id ? null : s.id)}
                        aria-pressed={active === s.id}
                        className={`rounded-full border px-4 py-2 text-sm transition ${active === s.id ? 'border-accent bg-accent text-accent-ink' : 'border-line-strong text-ink'}`}
                      >
                        {s.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
          <div aria-live="polite" className="min-h-[96px] rounded-2xl border border-line bg-surface p-4">
            <Info skill={current} />
          </div>
        </div>

        <Reveal className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Computer science fundamentals</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {csFundamentals.map((f) => (
              <li key={f} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Info({ skill }: { skill?: Skill }) {
  if (!skill)
    return <p className="text-sm text-muted">Hover, focus or tap a technology to see what I use it for and what it connects to.</p>
  const rel = skills.filter((s) => s.id !== skill.id && (skill.related.includes(s.id) || s.related.includes(skill.id)))
  return (
    <motion.div key={skill.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="">
      <p className="font-display text-lg font-semibold text-accent">
        {skill.name}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{skill.blurb}</p>
      {rel.length > 0 && <p className="mt-2 font-mono text-[11px] text-ink">Works with: {rel.map((r) => r.name).join(' · ')}</p>}
    </motion.div>
  )
}
