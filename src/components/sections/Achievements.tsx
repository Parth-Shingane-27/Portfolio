import { ChevronDown } from 'lucide-react'
import { animate, AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { education, repos } from '../../data/portfolio'
import { useReducedMotionPref } from '../../hooks/useCapabilities'
import { gsap } from '../../lib/gsap'
import { SectionHeading } from '../ui/SectionHeading'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, to])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

// Every figure below comes from the résumé or the repository list in data/portfolio.ts.
const stats = [
  { to: 100, suffix: '+', label: 'LeetCode problems solved' },
  { to: repos.length, suffix: '', label: 'GitHub repositories contributed to' },
  { to: 3, suffix: '', label: 'Languages spoken' },
]

const milestones = [
  {
    tag: 'Education',
    title: `${education.degree}`,
    summary: `${education.school} · ${education.years}`,
    detail: 'Computer Science and Engineering at MIT Academy of Engineering, Pune, with coursework in data structures, algorithms, OS, DBMS and networks.',
  },
  {
    tag: 'Community',
    title: 'Tech member, Girl Script Club',
    summary: 'MIT Academy of Engineering',
    detail: 'Part of the college tech community, taking part in technical projects and team-based competitions.',
  },
  {
    tag: 'Problem solving',
    title: '100+ LeetCode problems · CodeChef 1-Star',
    summary: 'Arrays, graphs, trees, recursion and more',
    detail: 'Arrays, strings, linked lists, stacks, queues, trees, graphs, searching, sorting and recursion. Practising algorithmic challenges through competitive programming on CodeChef.',
  },
  {
    tag: 'Hackathons',
    title: 'National-level hackathon semi-finalist',
    summary: 'Technology-driven solutions to real-world problems',
    detail: 'Advanced to the semi-finals of national-level hackathons, building technology-driven solutions to real-world problems.',
  },
  {
    tag: 'Hackathons',
    title: 'SAMVED national finalist',
    summary: 'SafeDrain · sanitation worker safety',
    detail: 'The team reached the finals of the national-level SAMVED hackathon with SafeDrain, a safety platform for sanitation workers.',
  },
  {
    tag: 'Sports',
    title: 'State-level handball & kabaddi player',
    summary: 'Team sports at state level',
    detail: 'Competing in team sports at state level alongside engineering studies.',
  },
]

function Milestone({ m, i }: { m: (typeof milestones)[number]; i: number }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const reduce = useReducedMotion()
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 md:pl-16"
    >
      <span data-dot={i} aria-hidden="true" className="absolute left-0 top-7 h-3 w-3 -translate-x-[5.5px] rounded-full border-2 border-accent bg-bg  md:-translate-x-[5.5px]" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group block w-full panel block w-full p-5 text-left transition-colors hover:border-line-strong md:p-7"
      >
        <span className="flex items-start justify-between gap-4">
          <span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{m.tag}</span>
            <span className="mt-2 block font-display text-xl font-bold leading-snug md:text-2xl">{m.title}</span>
            <span className="mt-1 block text-sm text-muted">{m.summary}</span>
          </span>
          <ChevronDown size={18} className={`mt-1 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
        <AnimatePresence initial={false}>
          {open && (
            <motion.span
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span className="block pt-4 text-sm leading-relaxed text-muted">{m.detail}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.li>
  )
}

export function Achievements() {
  const list = useRef<HTMLOListElement>(null)
  const line = useRef<SVGLineElement>(null)
  const reduce = useReducedMotionPref()

  // The glowing path draws itself as the timeline scrolls through the viewport.
  useEffect(() => {
    if (reduce || !list.current || !line.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { attr: { 'stroke-dashoffset': 1 } },
        { attr: { 'stroke-dashoffset': 0 }, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 60%', scrub: true } },
      )
    }, list)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="achievements" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Achievements" title="Built through *curiosity.*" />

        <dl className="mb-20 grid gap-px overflow-hidden panel bg-line sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col bg-surface p-6 md:p-8">
              <dt className="order-2 mt-2 text-sm text-muted">{s.label}</dt>
              <dd className="display order-1 text-6xl text-accent md:text-7xl">
                <Counter to={s.to} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <ol ref={list} className="relative ml-1.5 space-y-5 md:ml-4">
          <svg aria-hidden="true" className="absolute left-0 top-0 h-full w-px overflow-visible" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--line)" />
            <line ref={line} x1="0" y1="0" x2="0" y2="100%" stroke="var(--accent)" strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset={reduce ? 0 : 1} />
          </svg>
          {milestones.map((m, i) => (
            <Milestone key={m.title} m={m} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
