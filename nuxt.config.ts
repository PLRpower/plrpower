// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image', '@nuxtjs/seo'],
  site: {
    url: 'https://paul-thomas.vercel.app',
    name: 'Paul Thomas — Portfolio',
    description: 'Computer Science student specializing in AI, Embedded Systems, and Application Development.'
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400..700&family=Space+Grotesk:wght@300..700&display=swap' }
      ]
    }
  },
  css: ['@/assets/css/main.css']
})