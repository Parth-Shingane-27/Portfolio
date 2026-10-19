import { ArrowUpRight, Loader2, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import { CONTACT_ENDPOINT, sendContact } from '../../lib/contact'
import { SplitChars } from '../fx/SplitText'
import { Github, Instagram, Linkedin } from '../ui/BrandIcons'
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
  'mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-base outline-none transition placeholder:text-muted/60 focus:border-accent'

const links = [
  { href: profile.github, label: 'Parth-Shingane-27', Icon: Github },
  { href: profile.linkedin, label: 'Parth Shingane', Icon: Linkedin },
  { href: profile.instagram, label: '@parth_ns21', Icon: Instagram },
]

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
    <section id="contact" className="relative border-t border-line py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
          Contact
        </p>
        <h2 className="display mt-5 text-[clamp(2.6rem,8vw,7.5rem)]">
          <SplitChars text="Have a good idea?" inView stagger={0.02} />
          <br />
          <SplitChars text="*Let’s build it.*" inView delay={0.4} stagger={0.025} />
        </h2>

        <Reveal className="mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex flex-wrap items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-ink transition-colors hover:bg-ink md:px-9 md:py-5 md:text-xl"
          >
            <Mail size={20} />
            {profile.email}
            <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <Reveal>
            <ul>
              {links.map(({ href, label, Icon }) => (
                <li key={href} className="border-b border-line first:border-t">
                  <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent">
                    <span className="inline-flex items-center gap-4 font-display text-2xl font-semibold md:text-3xl">
                      <Icon size={24} /> {label}
                    </span>
                    <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            {state.kind === 'sent' ? (
              <div role="status" className="panel border-accent p-8">
                <h3 className="display text-3xl">Message sent.</h3>
                <p className="mt-3 text-muted">Thank you. I’ll reply to the email address you provided.</p>
                <button onClick={() => setState({ kind: 'idle' })} className="mt-6 text-sm underline decoration-accent underline-offset-4">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="panel space-y-6 p-6 md:p-8">
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
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition hover:bg-ink disabled:opacity-60"
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
      </div>
    </section>
  )
}
