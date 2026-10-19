import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { navLinks, profile } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'

const ids = navLinks.map((l) => l.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const { dark, toggle } = useTheme()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" aria-label="Parth Shingane, home" className="font-display text-2xl font-semibold tracking-tight">
          PS<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`text-sm transition-colors hover:text-ink ${active === l.id ? 'text-ink underline decoration-accent decoration-2 underline-offset-8' : 'text-muted'}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-ink"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent hover:text-accent-ink sm:inline-flex"
          >
            <Download size={14} /> View Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-2xl">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="block py-4 font-display text-2xl text-accent">
                View Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
