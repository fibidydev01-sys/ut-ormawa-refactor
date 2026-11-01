// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Aktifkan SSR agar rute API server bisa berjalan
  ssr: true,

  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2,
      nodeVersion: '22'
    },
    externals: {
      external: [
        'sharp'
      ]
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        'firebase/app',
        'firebase/auth',
        'firebase/firestore'
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://ormawa-utsurabaya.web.app',
    name: 'Ormawa UT Surabaya'
  },

  sitemap: {
    exclude: [
      '/dashboard/**',
      '/login/**',
      '/sandbox'
    ],
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Ormawa UT Surabaya' },
        { name: 'theme-color', content: '#0f172a' },
        { property: 'og:site_name', content: 'Ormawa UT Surabaya' },
        { property: 'og:locale', content: 'id_ID' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/img/Favicon_bulat_transparan.png' },
        { rel: 'apple-touch-icon', href: '/img/Favicon_bulat_transparan.png' }
      ]
    }
  },

  // Runtime Config for Firebase and SEO
  runtimeConfig: {
    firebaseAdminKey: process.env.FIREBASE_ADMIN_KEY,
    public: {
      siteUrl: 'https://ormawa-utsurabaya.web.app',
      siteName: 'Ormawa UT Surabaya',
      googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID
    }
  }
})