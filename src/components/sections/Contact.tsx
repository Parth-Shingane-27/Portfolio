
import { ArrowUpRight, Loader2, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import { CONTACT_ENDPOINT, sendContact } from '../../lib/contact'
import { SplitChars } from '../fx/SplitText'
import { Reveal } from '../ui/Reveal'

type State =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string }

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field =
  'mt-2 w-full rounded-lg border border-line-strong bg-bg px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-1 focus:ring-accent/20'

export function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<State>({ kind: 'idle' })

  const configured = CONTACT_ENDPOINT !== ''

  function validate(): Errors {
    const e: Errors = {}

    if (values.name.trim().length < 2) {
      e.name = 'Please enter your name.'
    }

    if (!emailRe.test(values.email.trim())) {
      e.email = 'Please enter a valid email address.'
    }

    if (values.message.trim().length < 10) {
      e.message = 'Please write at least 10 characters.'
    }

    return e
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const found = validate()
    setErrors(found)

    if (Object.keys(found).length > 0) return

    if (!configured) {
      const subject = encodeURIComponent(
        `Portfolio enquiry from ${values.name.trim()}`
      )

      const body = encodeURIComponent(
        `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
      )

      window.location.href =
        `mailto:${profile.email}?subject=${subject}&body=${body}`

      return
    }

    setState({ kind: 'sending' })

    try {
      const res = await sendContact({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })

      if (res.ok) {
        setState({ kind: 'sent' })
        setValues({ name: '', email: '', message: '' })
        setErrors({})
      } else {
        setState({
          kind: 'error',
          message:
            res.error === 'not-configured'
              ? `The form isn't connected to a delivery service yet. Please email ${profile.email} directly.`
              : res.error,
        })
      }
    } catch {
      setState({
        kind: 'error',
        message: `Something went wrong. Please try again or email ${profile.email} directly.`,
      })
    }
  }

  const set =
    (key: keyof typeof values) =>
    (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }))
      }
    }

  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center border-t border-line py-16 md:min-h-[calc(100svh-4rem)] md:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

          {/* Left: Heading and email button */}
          <div className="min-w-0 lg:pt-2">
            <p className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-accent md:text-xs">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent/70"
              />
              Contact
            </p>

            <h2 className="display mt-5 text-[clamp(2.5rem,5.2vw,4.8rem)] leading-[0.98] tracking-tight">
              <span className="block">
                <SplitChars
                  text="Have a good idea?"
                  inView
                  stagger={0.02}
                />
              </span>

              <span className="em-accent mt-1 block">
                <SplitChars
                  text="Let’s build it."
                  inView
                  delay={0.4}
                  stagger={0.025}
                />
              </span>
            </h2>

            <Reveal className="mt-7 md:mt-8">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex max-w-full items-center gap-2.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-ink sm:px-6"
              >
                <Mail size={16} className="shrink-0" />

                <span className="break-all">{profile.email}</span>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>

          {/* Right: Contact form */}
          <Reveal delay={0.08} className="min-w-0">
            {state.kind === 'sent' ? (
              <div
                role="status"
                className="panel rounded-2xl p-6 md:p-7"
              >
                <h3 className="display text-2xl">
                  Message sent.
                </h3>

                <p className="mt-3 text-sm text-muted">
                  Thank you. I’ll reply to the email address you provided.
                </p>

                <button
                  type="button"
                  onClick={() => setState({ kind: 'idle' })}
                  className="mt-6 text-sm underline decoration-accent underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="panel space-y-5 rounded-2xl p-5 md:space-y-5 md:p-7"
              >
                <div>
                  <label
                    htmlFor="c-name"
                    className="text-xs font-medium text-ink"
                  >
                    Name
                  </label>

                  <input
                    id="c-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={set('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? 'c-name-err' : undefined
                    }
                    className={field}
                  />

                  {errors.name && (
                    <p
                      id="c-name-err"
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="c-email"
                    className="text-xs font-medium text-ink"
                  >
                    Email
                  </label>

                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? 'c-email-err' : undefined
                    }
                    className={field}
                  />

                  {errors.email && (
                    <p
                      id="c-email-err"
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="c-msg"
                    className="text-xs font-medium text-ink"
                  >
                    Message
                  </label>

                  <textarea
                    id="c-msg"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={set('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? 'c-msg-err' : undefined
                    }
                    className={field}
                  />

                  {errors.message && (
                    <p
                      id="c-msg-err"
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state.kind === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-accent-ink transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state.kind === 'sending' && (
                    <Loader2 size={14} className="animate-spin" />
                  )}

                  {state.kind === 'sending'
                    ? 'Sending…'
                    : configured
                      ? 'Send message'
                      : 'Open in email app'}
                </button>

                {!configured && state.kind === 'idle' && (
                  <p className="text-xs text-muted">
                    Your email app will open with your message filled in.
                    You must send it from your email app.
                  </p>
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
