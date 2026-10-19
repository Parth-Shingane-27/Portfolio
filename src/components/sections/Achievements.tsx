import { achievements, education } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="04" eyebrow="Achievements & problem solving">
          Competitions, practice and teamwork.
        </SectionHeading>

        <ol className="divide-y divide-line border-y border-line">
          {achievements.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={i * 0.04}>
                <div className="grid gap-2 py-6 md:grid-cols-[4rem_1fr_1.2fr_9rem] md:items-baseline md:gap-8">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{a.detail}</p>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted md:text-right">{a.tag}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-20">
          <div id="education" className="grid gap-6 rounded-2xl border border-line bg-card p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">05 — Education</p>
              <h3 className="mt-3 font-display text-3xl">{education.school}</h3>
              <p className="mt-1 text-muted">{education.degree}</p>
            </div>
            <p className="font-display text-4xl text-muted">{education.years}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
