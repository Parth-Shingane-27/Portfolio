import { useEffect, useState } from 'react'

function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(() => (typeof matchMedia === 'undefined' ? initial : matchMedia(query).matches))
  useEffect(() => {
    const mq = matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** True for mouse/trackpad devices that can hover. Touch devices keep native interactions. */
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')

export const useReducedMotionPref = () => useMedia('(prefers-reduced-motion: reduce)')

export const useDesktop = () => useMedia('(min-width: 768px)')
