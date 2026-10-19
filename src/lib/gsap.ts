import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registered once. GSAP + ScrollTrigger drive scroll-scrubbed timelines (parallax, path drawing);
// Motion handles component transitions and pointer interaction. Each system owns separate elements.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
