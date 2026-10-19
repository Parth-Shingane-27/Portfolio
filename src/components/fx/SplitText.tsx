import { motion } from 'motion/react'
import { useReducedMotionPref } from '../../hooks/useCapabilities'

const ease = [0.22, 1, 0.36, 1] as const

interface Token {
  word: string
  em: boolean
}

/** Turns "Build *the code.*" into words, with the starred span flagged for the italic-serif accent. */
function tokenize(text: string): Token[] {
  const out: Token[] = []
  let em = false
  for (const raw of text.split(' ')) {
    let w = raw
    if (w.startsWith('*')) {
      em = true
      w = w.slice(1)
    }
    const end = w.endsWith('*')
    if (end) w = w.slice(0, -1)
    out.push({ word: w, em })
    if (end) em = false
  }
  return out
}

/**
 * Reveals text one character at a time, each rising out of a mask. Words stay unbroken.
 * Starred words switch to the italic serif accent. The wrapper carries an aria-label so
 * screen readers read the phrase once, not letter by letter.
 */
export function SplitChars({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  inView = false,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** Trigger on scroll instead of on mount. */
  inView?: boolean
}) {
  const reduce = useReducedMotionPref()
  const plain = text.replace(/\*/g, '')
  const tokens = tokenize(text)

  if (reduce)
    return (
      <span className={className}>
        {tokens.map((t, i) => (
          <span key={i} className={t.em ? 'em-accent' : undefined}>
            {t.word}
            {i < tokens.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    )

  let n = 0
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, margin: '-10%' } } : { animate: 'show' }

  return (
    <motion.span className={className} initial="hide" {...trigger} style={{ display: 'inline' }}>
      <span className="sr-only">{plain}</span>
      {tokens.map((t, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {[...t.word].map((ch, ci) => {
            const i = n++
            return (
              <span key={ci} className="-mx-[0.03em] -mb-[0.14em] inline-block overflow-hidden px-[0.03em] pb-[0.14em] align-bottom">
                <motion.span
                  className={`inline-block ${t.em ? 'em-accent' : ''}`}
                  variants={{ hide: { y: '115%', rotate: 7 }, show: { y: 0, rotate: 0 } }}
                  transition={{ duration: 0.85, delay: delay + i * stagger, ease }}
                >
                  {ch}
                </motion.span>
              </span>
            )
          })}
          {wi < tokens.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
