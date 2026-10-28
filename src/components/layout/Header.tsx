import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { navLinks } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { RollText } from '../fx/RollText'

const ids = navLinks.map((l) => l.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-lg' : 'border-b border-transparent bg-transparent'}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="relative z-10 mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-8">
        <a href="#top" aria-label="Parth Shingane, home" className="font-display text-lg font-extrabold uppercase tracking-tight">
          Parth Shingane
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`roll-host relative px-4 py-2 text-sm transition-colors hover:text-ink ${active === l.id ? 'text-ink' : 'text-muted'}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <RollText>{l.label}</RollText>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-10 w-10 place-items-center rounded-full border border-line-strong md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
    </header>

    {/* Sibling of the header: a backdrop-filter on the header would otherwise become the containing block for this fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-16 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center px-5 pb-24">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className="display block border-b border-line py-4 text-4xl">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
