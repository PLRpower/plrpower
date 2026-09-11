// https://nuxt.com/docs/api/configuration/nuxt-config


// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  features: {
    inlineStyles: false
  },
  modules: [
    '@vercel/analytics/nuxt',
    '@vercel/speed-insights/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss'
  ],
  ogImage: {
    enabled: false
  },
  image: {
    format: ['webp'],
    quality: 80,
  },
  fonts: {
    defaults: {
      preload: true,
      subsets: ['latin']
    },
    families: [
      { name: 'Geist', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', weights: [400, 500] },
      { name: 'Space Grotesk', weights: [500, 600, 700] },
      { name: 'Caveat', weights: [400] }
    ]
  },
  site: {
    url: 'https://paul-thomas.vercel.app',
    name: 'Paul Thomas — AI & Embedded Systems Engineer',
    description: 'CS engineering student & apprentice researcher at LINEACT Laboratory in AI, Embedded Systems and Federated Learning. Seeking an international internship for 2027.'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        class: 'bg-[#0a0a0a] text-[#e2e2e2]'
      },
      bodyAttrs: {
        class: 'bg-[#0a0a0a] text-[#e2e2e2]'
      },
      style: [
        { innerHTML: 'html, body { background-color: #0a0a0a !important; color: #e2e2e2; }' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger'
      ]
    }
  }
})