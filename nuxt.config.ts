// nuxt.config.ts

/** Header cache CDN untuk halaman "ISR": segar `seconds` detik, lalu basi-tapi-dipakai sehari. */
function isrHeaders(seconds: number) {
  return { 'cache-control': `public, max-age=0, s-maxage=${seconds}, stale-while-revalidate=86400` }
}
const NO_INDEX = { 'x-robots-tag': 'noindex, nofollow' }

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // Test layer (sesi palsu untuk screenshot dashboard) — HANYA untuk
  // `npm run build:test`. Lihat tests/layer/nuxt.config.ts.
  extends: process.env.ORMAWA_TEST === '1' ? ['./tests/layer'] : [],
  devtools: { enabled: true },

  // Aktifkan SSR agar rute API server bisa berjalan
  ssr: true,

  // ── Mode render per rute (GOLDEN-PLAN §5, sesi S6) ───────────────────
  // SSG  = HTML dibuat saat build (konten statis).
  // ISR  = SSR + Cache-Control s-maxage → disimpan CDN Firebase Hosting,
  //        diperbarui di belakang layar (stale-while-revalidate).
  // SPA  = dashboard: data privat, dirender di browser (sekaligus
  //        menghapus tunggu 5 detik di SSR — temuan T16).
  routeRules: {
    '/': { redirect: { to: '/beranda', statusCode: 301 } },
    '/profil': { redirect: { to: '/profil/tentang-ut', statusCode: 301 } },

    // SSG
    '/profil/tentang-ut': { prerender: true },
    '/profil/tentang-ormawa': { prerender: true },
    '/profil/visi-misi': { prerender: true },
    '/zona-kampus/**': { prerender: true },
    '/media/perlombaan': { prerender: true },
    '/media/laporan': { prerender: true },
    '/media/social-media': { prerender: true },
    '/kontak/**': { prerender: true },

    // ISR (CDN)
    '/beranda': { headers: isrHeaders(600) },
    '/media/artikel': { headers: isrHeaders(600) },
    '/berita/**': { headers: isrHeaders(3600) },
    '/profil/struktur-pengurus': { headers: isrHeaders(3600) },
    '/api/public/**': { headers: isrHeaders(600) },
    '/api/auth/**': { headers: { 'cache-control': 'no-store' } },
    '/api/__sitemap__/**': { headers: isrHeaders(3600) },

    // Privat / tidak diindeks
    '/login/**': { headers: NO_INDEX },
    '/dashboard/**': { ssr: false, headers: { ...NO_INDEX, 'cache-control': 'no-store' } },
    '/sandbox': { ssr: false, headers: NO_INDEX },
  },

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
    },
    // Hanya rute ber-`prerender: true` di routeRules yang dibuat statis;
    // jangan ikut merayapi tautan ke halaman ISR/dashboard.
    prerender: {
      crawlLinks: false,
    },
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

  // Auto-import komponen tanpa prefix folder: components/layout/site-header.vue
  // → <SiteHeader />. Nama file komponen harus unik (GOLDEN-PLAN §4.2).
  components: [
    { path: '~/components', pathPrefix: false },
    // Komponen fitur: features/landing/landing-hero.vue → <LandingHero />
    { path: '~/features', pathPrefix: false, extensions: ['.vue'] },
  ],

  // Composable fitur (features/<domain>/use-*.ts) ikut di-auto-import seperti
  // composables/. Service (*.service.ts) sengaja TIDAK — import eksplisit (R8).
  imports: { dirs: ['features/*/use-*.ts'] },

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