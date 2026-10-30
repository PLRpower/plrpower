// https://nuxt.com/docs/api/configuration/nuxt-config


// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
    payloadExtraction: false
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/', '/legal', '/mentions-legales']
    },
    devStorage: {
      'cache:nuxt:payload': { driver: 'memory' }
    }
  },
  routeRules: {
    '/': { headers: { 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' } },
    '/legal': { headers: { 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' } },
    '/mentions-legales': { headers: { 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' } },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },
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
      preload: false,
      subsets: ['latin']
    },
    families: [
      { name: 'Geist', weights: [400], preload: true },
      { name: 'Geist', weights: [500, 600, 700], preload: false },
      { name: 'Geist Mono', weights: [400, 500], preload: false },
      { name: 'Caveat', weights: [400], preload: true },
      { name: 'Space Grotesk', weights: [500, 600, 700], preload: false }
    ]
  },
  site: {
    url: 'https://pthomas.fr',
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
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'alternate', type: 'text/markdown', href: '/llms.txt', title: 'LLM Context' }
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
        'gsap/ScrollTrigger',
        '@unhead/schema-org/vue'
      ]
    }
  }
})
