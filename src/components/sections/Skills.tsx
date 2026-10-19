import { skillGroups } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="surface-dark py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="03" eyebrow="Technical skills">
          The toolkit, grouped by what it’s for.
        </SectionHeading>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.05} className="bg-bg">
              <div className="h-full p-6 md:p-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{g.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s.name}>
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          title={`${s.name} documentation`}
                          className="inline-flex rounded-full border border-line px-3 py-1.5 text-sm transition hover:border-accent hover:text-accent"
                        >
                          {s.name}
                        </a>
                      ) : (
                        <span className="inline-flex rounded-full border border-line px-3 py-1.5 text-sm text-muted">{s.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">Linked names open each technology’s official documentation.</p>
      </div>
    </section>
  )
}
