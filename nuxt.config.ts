// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  fonts: {
    families: [
      { name: 'Montserrat', weights: [400, 600] },
      { name: 'JetBrains Mono', weights: [400] },
      { name: 'Caveat', weights: [400] },
      { name: 'Space Grotesk', weights: [600] },
      { name: 'Syne', weights: [400, 600, 700, 800] }
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
  css: ['@/assets/css/main.css'],
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