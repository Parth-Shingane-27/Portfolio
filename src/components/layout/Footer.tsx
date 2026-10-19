import { Mail } from 'lucide-react'
import { Github, Instagram, Linkedin } from '../ui/BrandIcons'
import { navLinks, profile } from '../../data/portfolio'

const year = new Date().getFullYear()

const socials = [
  { href: profile.github, label: 'GitHub', Icon: Github },
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: profile.instagram, label: 'Instagram', Icon: Instagram },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
]

export function Footer() {
  return (
    <footer className="surface-dark border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <a href="#top" className="font-display text-4xl font-semibold">
            PS<span className="text-accent">.</span>
          </a>
          <p className="mt-3 max-w-sm text-sm text-muted">Practical software for real problems. Thanks for stopping by.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <p className="border-t border-line px-5 py-5 text-center font-mono text-xs text-muted">
        © {year} Parth Shingane
      </p>
    </footer>
  )
}
