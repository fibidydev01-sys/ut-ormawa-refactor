export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const gaId = config.public.googleAnalyticsId

  // Hanya jalankan jika Google Analytics ID telah dikonfigurasi (misal G-XXXXXXXXXX)
  if (!gaId || typeof gaId !== 'string' || !gaId.trim()) {
    return
  }

  // Cegah injeksi ganda
  if (typeof window !== 'undefined' && !(window as any).dataLayer) {
    (window as any).dataLayer = (window as any).dataLayer || []
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args)
    }
    ;(window as any).gtag = gtag

    gtag('js', new Date())
    gtag('config', gaId.trim(), {
      page_path: window.location.pathname,
    })

    // Masukkan script gtag.js secara asinkron
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId.trim())}`
    document.head.appendChild(script)

    // Lacak perpindahan rute halaman Nuxt (SPA navigation)
    nuxtApp.hook('page:finish', () => {
      gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
      })
    })
  }
})
