import { Loader2, Mail } from 'lucide-react'
import { Github, Instagram, Linkedin } from '../ui/BrandIcons'
import { useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import { CONTACT_ENDPOINT, sendContact } from '../../lib/contact'
import { Reveal } from '../ui/Reveal'

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v: { name: string; email: string; message: string }): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) e.message = 'Please write at least 10 characters.'
  return e
}

const field =
  'mt-2 w-full rounded-lg border border-line bg-transparent px-4 py-3 text-base outline-none transition placeholder:text-muted/60 focus:border-accent'

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<State>({ kind: 'idle' })
  const configured = CONTACT_ENDPOINT !== ''

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    if (!configured) {
      // No delivery service configured: hand the message to the visitor's email app instead of pretending to send it.
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`)
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }
    setState({ kind: 'sending' })
    const res = await sendContact({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() })
    if (res.ok) {
      setState({ kind: 'sent' })
      setValues({ name: '', email: '', message: '' })
    } else {
      setState({
        kind: 'error',
        message: res.error === 'not-configured' ? `The form isn’t connected to a delivery service yet. Please email ${profile.email} directly.` : res.error,
      })
    }
  }

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }))

  return (
    <section id="contact" className="surface-dark py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">06 — Contact</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Have a meaningful problem to solve? <span className="text-accent">Let’s build something.</span>
          </h2>
          <ul className="mt-10 space-y-4">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-lg hover:text-accent">
                <Mail size={18} /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-lg hover:text-accent">
                <Github size={18} /> Parth-Shingane-27
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-lg hover:text-accent">
                <Linkedin size={18} /> Parth Shingane
              </a>
            </li>
            <li>
              <a href={profile.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-lg hover:text-accent">
                <Instagram size={18} /> @parth_ns21
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          {state.kind === 'sent' ? (
            <div role="status" className="rounded-2xl border border-accent p-8">
              <h3 className="font-display text-3xl">Message sent.</h3>
              <p className="mt-3 text-muted">Thank you. I’ll reply to the email address you provided.</p>
              <button onClick={() => setState({ kind: 'idle' })} className="mt-6 text-sm underline decoration-accent underline-offset-4">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-2xl border border-line p-6 md:p-8">
              <div>
                <label htmlFor="c-name" className="text-sm">Name</label>
                <input id="c-name" name="name" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} className={field} />
                {errors.name && <p id="c-name-err" className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm">Email</label>
                <input id="c-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} className={field} />
                {errors.email && <p id="c-email-err" className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="c-msg" className="text-sm">Message</label>
                <textarea id="c-msg" name="message" rows={5} value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-msg-err' : undefined} className={field} />
                {errors.message && <p id="c-msg-err" className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={state.kind === 'sending'}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition hover:brightness-110 disabled:opacity-60"
              >
                {state.kind === 'sending' && <Loader2 size={14} className="animate-spin" />}
                {state.kind === 'sending' ? 'Sending…' : configured ? 'Send message' : 'Open in email app'}
              </button>
              {!configured && state.kind === 'idle' && (
                <p className="text-xs text-muted">Your email app will open with this message filled in; nothing is sent until you press send there.</p>
              )}
              {state.kind === 'error' && (
                <p role="alert" className="text-sm text-red-400">
                  {state.message}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
