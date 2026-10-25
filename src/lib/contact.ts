// The contact form posts JSON to a delivery service you configure (Formspree, Web3Forms, etc.).
// The endpoint URL is public by design; never put a private API key in VITE_* variables.
export const CONTACT_ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export type SendResult = { ok: true } | { ok: false; error: string }

export async function sendContact(p: ContactPayload): Promise<SendResult> {
  if (!CONTACT_ENDPOINT) return { ok: false, error: 'not-configured' }
  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: p.name,
        email: p.email,
        message: p.message,
        _replyto: p.email,
        _subject: `New Portfolio Message from ${p.name}`,
      }),
    })
    if (!res.ok) return { ok: false, error: `The service answered with status ${res.status}.` }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Check your connection and try again.' }
  }
}
