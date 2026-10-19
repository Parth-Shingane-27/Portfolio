import type Lenis from 'lenis'

/** Shared handle to the Lenis instance (null on touch devices and with reduced motion, where native scrolling is used). */
export const scroller: { lenis: Lenis | null } = { lenis: null }
