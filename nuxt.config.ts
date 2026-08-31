// https://nuxt.com/docs/api/configuration/nuxt-config


// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss'
  ],
  fonts: {
    families: [
      { name: 'Geist', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', weights: [400, 500] },
      { name: 'Space Grotesk', weights: [500, 600, 700] },
      { name: 'Caveat', weights: [400] }
    ]
  },
  site: {
    url: 'https://paul-thomas.vercel.app',
    name: 'Paul Thomas — Portfolio',
    description: 'Computer Science student specializing in AI & Machine Learning, Embedded Systems, and Application Development.'
  },
  app: {
    head: {
      link: []
    }
  },
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
        'gsap',
        'gsap/ScrollTrigger'
      ]
    }
  }
})