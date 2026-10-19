import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, useReducedMotionPref } from '../../hooks/useCapabilities'

const INTERACTIVE = 'a[href], button:not([disabled]), summary, [role="tab"]'

/**
 * A single thin ring that trails the pointer and grows slightly over clickable things.
 * The native cursor is left untouched (it stays visible and accurate), and this never renders on touch devices.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotionPref()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 })
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => setHover(!!(e.target as Element | null)?.closest?.(INTERACTIVE))
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent/70"
      style={{ x: reduce ? x : rx, y: reduce ? y : ry }}
      animate={{ scale: hover ? 1.6 : 1, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    />
  )
}
