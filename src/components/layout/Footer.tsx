import { Mail } from 'lucide-react'
import { Github, Instagram, Linkedin, X } from '../ui/BrandIcons'
import { profile } from '../../data/portfolio'

const year = new Date().getFullYear()

const socials = [
  { href: profile.github, label: 'GitHub', Icon: Github },
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: profile.instagram, label: 'Instagram', Icon: Instagram },
  { href: profile.x, label: 'X', Icon: X },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-5 py-8 md:flex-row md:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Parth Shingane
        </a>
        <ul className="flex gap-3">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent"
              >
                <Icon size={16} />
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-muted">© {year} Parth Shingane. All rights reserved.</p>
      </div>
    </footer>
  )
}
