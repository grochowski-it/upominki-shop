import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/seo',
    'nuxt-llms',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'pl', language: 'pl-PL', file: 'pl.json' },
      { code: 'en', language: 'en-US', file: 'en.json' }
    ],
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: '../locales'
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
    resolve: {
      alias: {
        'tailwindcss/lib/index.js': 'tailwindcss/dist/lib.js'
      }
    }
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'grochowski-it',
      repo: 'upominki-shop-sklep',
      branch: 'main'
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ]
    }
  }
})
