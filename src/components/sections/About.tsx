import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { education, highlights } from '../../data/portfolio'
import { useReducedMotionPref } from '../../hooks/useCapabilities'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const statement =
  'I’m a Computer Engineering student who builds software for problems that actually exist — from sewer-worker safety to farmers’ prices — and I care that it ships, works and is used.'

const statementClass = 'font-display text-[clamp(1.55rem,3vw,2.6rem)] font-semibold leading-[1.18] tracking-tight'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.5, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

/** Words brighten one by one as the paragraph scrolls through the viewport. */
function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotionPref()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = text.split(' ')
  if (reduce) return <p className={statementClass}>{text}</p>
  return (
    <p ref={ref} className={statementClass}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  )
}

const journey = [
  { when: '2024', what: `Started B.Tech in Computer Science and Engineering at ${education.school}.` },
  { when: 'On campus', what: 'Joined the Girl Script Club (MITAOE) as a tech member and got into team competitions.' },
  { when: 'Hackathons', what: 'Advanced to the semi-finals of national-level hackathons and reached the SAMVED national finals with SafeDrain.' },
  { when: 'Now', what: 'Building products that connect full-stack engineering, ML and IoT — and looking for a team building things with real impact.' },
]

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="About" title="The mind behind the *code.*" />

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ScrollWords text={statement} />

            <div className="mt-10 grid gap-6 text-muted md:grid-cols-2">
              <Reveal>
                <p className="leading-relaxed">
                  My focus is the space where full-stack development meets AI/ML and intelligent systems. I like projects that connect a dashboard to a model to a real-world signal, whether that’s gas readings from a sensor or years of mandi prices.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="leading-relaxed">
                  I work in English, Marathi and Hindi, play state-level handball and kabaddi, and practise algorithms on LeetCode and CodeChef to keep the fundamentals sharp.
                </p>
              </Reveal>
            </div>

            <dl className="panel mt-12 grid grid-cols-2 gap-px overflow-hidden bg-line">
              {highlights.map((h) => (
                <div key={h.label} className="bg-surface p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{h.label}</dt>
                  <dd className="mt-2 font-display text-lg font-semibold leading-tight">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">The journey so far</p>
            <ol className="relative mt-6 space-y-9 border-l border-line pl-8">
              {journey.map((j, i) => (
                <li key={j.when} className="relative">
                  <Reveal delay={i * 0.05}>
                    <span aria-hidden="true" className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{j.when}</p>
                    <p className="mt-1.5 leading-relaxed text-muted">{j.what}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
