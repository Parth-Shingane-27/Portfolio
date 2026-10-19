import Lenis from 'lenis'
import { useEffect } from 'react'
import { useFinePointer, useReducedMotionPref } from '../../hooks/useCapabilities'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { scroller } from '../../lib/scroller'

/**
 * Inertial scrolling for mouse devices, driven by GSAP's ticker so ScrollTrigger stays in lockstep.
 * Touch devices and reduced-motion users keep native scrolling (best mobile performance, no hijacking).
 * In-page anchor links are routed through Lenis so navigation glides instead of jumping.
 */
export function SmoothScroll() {
  const fine = useFinePointer()
  const reduce = useReducedMotionPref()

  useEffect(() => {
    if (!fine || reduce) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    scroller.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const hash = a.getAttribute('href') ?? ''
      const target = hash === '#top' ? 0 : document.getElementById(hash.slice(1))
      if (target === null) return
      e.preventDefault()
      // Landing position comes from CSS (html scroll-padding-top), the same rule native anchor jumps use on touch devices.
      lenis.scrollTo(target, { duration: 1.5 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
      scroller.lenis = null
    }
  }, [fine, reduce])

  return null
}
