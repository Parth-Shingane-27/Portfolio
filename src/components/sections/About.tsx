import { highlights } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="01" eyebrow="About">
          Engineering with a focus on usefulness.
        </SectionHeading>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                <span className="text-ink">I study Computer Science and Engineering at MIT Academy of Engineering, Pune.</span> Alongside coursework I build full-stack products that pair a React front end with Python and FastAPI services, MongoDB storage, and machine-learning models.
              </p>
              <p>
                My projects start from a concrete problem: keeping sanitation workers safe, predicting traffic demand, or making weather data usable. I work across the stack, from sensor data and APIs to dashboards, and care that the result is usable and deployed.
              </p>
              <p>I’m looking to join a team building products with real impact, and to keep learning from the people on it.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-line border-y border-line">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{h.label}</dt>
                  <dd className="text-right text-sm">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
