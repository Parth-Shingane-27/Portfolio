import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotionPref } from '../../hooks/useCapabilities'

const GAP = 30
const RADIUS = 150

/**
 * A calm dot grid. It is static until the pointer comes near, then nearby dots brighten and grow.
 * Redraws only while the pointer moves (no idle animation loop), and stays a single still frame on touch or reduced motion.
 */
export function DotField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const fine = useFinePointer()
  const reduce = useReducedMotionPref()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c6ff3a'
    let w = 0
    let h = 0
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const draw = () => {
      raf = 0
      ctx.clearRect(0, 0, w, h)
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const d = Math.hypot(x - mouse.x, y - mouse.y)
          const t = d < RADIUS ? 1 - d / RADIUS : 0
          ctx.fillStyle = t > 0 ? accent : 'rgba(255,255,255,0.16)'
          ctx.globalAlpha = t > 0 ? 0.25 + t * 0.75 : 1
          ctx.beginPath()
          ctx.arc(x, y, 1 + t * 1.8, 0, 6.283)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      schedule()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      schedule()
    }
    if (fine && !reduce) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [fine, reduce])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
