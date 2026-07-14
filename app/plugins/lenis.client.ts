import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((_nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    lerp: 0.2, // Faster, less pronounced smooth scroll
    smoothWheel: true,
  })

  // Synchronize Lenis scroll with GSAP's ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable GSAP's lag smoothing to prevent issues with Lenis
  gsap.ticker.lagSmoothing(0)

  return {
    provide: {
      lenis
    }
  }
})
