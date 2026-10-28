import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { featuredProjects, profile } from '../../data/portfolio'
import { useReducedMotionPref } from '../../hooks/useCapabilities'
import { gsap } from '../../lib/gsap'
import { DotField } from '../fx/DotField'
import { RollText } from '../fx/RollText'
import { SplitChars } from '../fx/SplitText'
import { ButtonLink } from '../ui/Button'

const ribbon = ['Full-Stack', 'AI / ML', 'IoT', 'FastAPI', 'React', 'Machine Learning', 'Python', 'MongoDB', 'Problem Solving']

const rise = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionPref()

  // The hero content eases up and fades as you scroll away (scroll-scrubbed, no pinning).
  useEffect(() => {
    if (reduce || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to(content.current, {
        yPercent: -8,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <DotField className="[mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000,transparent)]" />

<div
  ref={content}
  className="relative z-10 mx-auto grid w-full max-w-[1600px] flex-1 content-center gap-14 px-5 pb-32 pt-28 sm:px-8 lg:px-12 lg:grid-cols-12"
>
        <div className="lg:col-span-8">
          <motion.p {...rise(0.05)} className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Portfolio · {profile.location}
          </motion.p>

          <h1 className="display mt-6 text-[clamp(3.2rem,14vw,5rem)] md:text-[clamp(4.5rem,10.5vw,10rem)]" aria-label={profile.name}>
            <span className="block">
              <SplitChars text="Parth" delay={0.15} stagger={0.05} />
            </span>
            <span className="em-accent block">
              <SplitChars text="Shingane" delay={0.4} stagger={0.045} />
            </span>
          </h1>

          <p className="display mt-8 max-w-2xl text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-[1.15]">
            <SplitChars text="I build digital experiences that *matter.*" delay={0.9} stagger={0.016} />
          </p>
          <motion.p {...rise(1.15)} className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Computer Engineering Student · Full-Stack Developer · AI/ML Enthusiast
          </motion.p>
          <motion.p {...rise(1.25)} className="mt-6 max-w-xl leading-relaxed text-muted">
            I turn real-world problems into working software, with a soft spot for worker safety and accessibility. I’d rather ship something people can actually use than polish something nobody opens.
          </motion.p>

          <motion.div {...rise(1.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="#projects">
              <RollText>Explore My Work</RollText> <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink variant="ghost" href="#contact">
              <RollText>Let’s Connect</RollText>
            </ButtonLink>
            <a href={profile.resume} download="Parth_Shingane_Resume.pdf" className="roll-host px-2 py-3 text-sm text-muted underline decoration-accent/60 decoration-2 underline-offset-8 transition hover:text-ink">
              <RollText>Download Resume</RollText>
            </a>
          </motion.div>
        </div>

        {/* Quick index of the featured work: real links, not decoration */}
        <motion.aside {...rise(1.5)} aria-label="Featured work" className="hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Featured work</p>
          <ul className="mt-4 border-t border-line">
            {featuredProjects.map((p) => (
              <li key={p.id} className="border-b border-line">
                <a href={`#project-${p.id}`} className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent">
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight">{p.name}</span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-widest text-muted">{p.category.split(' · ')[0]}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-24 left-5 z-10 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:left-8 md:flex"
      >
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-accent" animate={{ y: [-16, 40] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
        Scroll <ArrowDown size={12} />
      </motion.a>

      {/* Straight, solid, readable skills ribbon */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-line bg-bg py-4" aria-label="Skills ribbon" role="group">
        <div className="marquee" aria-hidden="true">
          {[0, 1].map((n) => (
            <ul key={n} className="flex shrink-0 items-center">
              {ribbon.map((t) => (
                <li key={t} className="flex items-center gap-8 pr-8 font-mono text-sm uppercase tracking-[0.2em] text-ink/80">
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
