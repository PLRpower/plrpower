import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  // Prevent browser from restoring previous scroll position on reload
  if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const lenis = new Lenis({
    lerp: 0.2, // Faster, less pronounced smooth scroll
    smoothWheel: true,
  })

  // Ensure page starts at top on initial load if no hash
  if (typeof window !== 'undefined' && !window.location.hash) {
    window.scrollTo(0, 0)
    lenis.scrollTo(0, { immediate: true })
  }

  // Synchronize Lenis scroll with GSAP's ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable GSAP's lag smoothing to prevent issues with Lenis
  gsap.ticker.lagSmoothing(0)

  nuxtApp.hook('page:finish', () => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0)
      lenis.scrollTo(0, { immediate: true })
    }
  })

  return {
    provide: {
      lenis
    }
  }
})

