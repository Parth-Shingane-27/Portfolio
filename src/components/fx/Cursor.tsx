
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, useReducedMotionPref } from '../../hooks/useCapabilities'

const INTERACTIVE = 'a[href], button:not([disabled]), summary, [role="tab"]'

/**
 * Animated cursor follower without a background circle.
 * Keeps the smooth pointer trail and hover animation.
 * Native cursor remains visible.
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

    const over = (e: PointerEvent) => {
      setHover(
        !!(e.target as Element | null)?.closest?.(INTERACTIVE)
      )
    }

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
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8"
      style={{
        x: reduce ? x : rx,
        y: reduce ? y : ry,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: hover ? 1.6 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
      }}
    />
  )
}
