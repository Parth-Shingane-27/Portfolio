import { ArrowDown, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../../data/portfolio'
import { ButtonLink } from '../ui/Button'

const nodes = [
  { x: 60, y: 70, r: 6, label: 'sensor' },
  { x: 60, y: 190, r: 6, label: 'api' },
  { x: 60, y: 310, r: 6, label: 'data' },
  { x: 200, y: 130, r: 9, label: 'service' },
  { x: 200, y: 250, r: 9, label: 'model' },
  { x: 340, y: 190, r: 14, label: 'product' },
]
const edges: [number, number][] = [
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 5],
  [4, 5],
]

function SystemVisual() {
  return (
    <svg viewBox="0 0 400 380" role="img" aria-label="Abstract diagram of data flowing from sensors, APIs and datasets through services and a model into a product" className="w-full max-w-md text-ink">
      <title>Abstract system diagram</title>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="flow"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r={n.r + 8} fill="none" stroke="var(--line)" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={i === 5 ? 'var(--accent)' : 'var(--ink)'} className={i === 5 ? 'pulse' : undefined} />
          <text x={n.x} y={n.y + n.r + 26} textAnchor="middle" className="fill-muted font-mono" fontSize="10" letterSpacing="1.5">
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const fade = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Computer Science Engineer · Builder · Problem Solver
          </motion.p>
          <motion.h1 {...fade(1)} className="mt-6 font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98] tracking-tight">
            I build software that solves <em className="text-accent not-italic">real-world</em> problems.
          </motion.h1>
          <motion.p {...fade(2)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I’m Parth Shingane, a Computer Science and Engineering student exploring the intersection of full-stack development, AI/ML, and intelligent systems. I turn complex problems into practical, thoughtfully engineered products.
          </motion.p>
          <motion.div {...fade(3)} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects">
              Explore My Work <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink variant="ghost" href={profile.resume} download="Parth_Shingane_Resume.pdf">
              Download Resume
            </ButtonLink>
            <a href="#contact" className="px-3 py-3 text-sm font-medium underline decoration-accent decoration-2 underline-offset-8">
              Let’s Connect
            </a>
          </motion.div>
        </div>
        <motion.div {...fade(2)} className="flex flex-col items-center lg:items-end">
          <SystemVisual />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">Illustration: sensors → services → models → product</p>
        </motion.div>
      </div>
      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted md:flex">
        Scroll <ArrowDown size={14} className="pulse" />
      </a>
    </section>
  )
}
