<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const config = useRuntimeConfig()
const route = useRoute()

const siteUrl = (config.public.siteUrl as string) || 'https://ormawa-utsurabaya.web.app'
const canonicalUrl = computed(() => {
  const cleanPath = route.path === '/' ? '' : route.path
  return `${siteUrl}${cleanPath}`
})

// Metadata SEO global dan Open Graph default
useSeoMeta({
  title: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  description: 'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, aspirasi, informasi kegiatan, Himpunan Mahasiswa (IMF), UKM, dan prestasi mahasiswa.',
  keywords: 'ormawa ut surabaya, universitas terbuka surabaya, ukm ut surabaya, himpunan mahasiswa ut, kkb ut surabaya, mahasiswa ut, kegiatan kampus ut surabaya',
  ogTitle: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  ogDescription: 'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, aspirasi, informasi kegiatan, Himpunan Mahasiswa (IMF), UKM, dan prestasi mahasiswa.',
  ogImage: `${siteUrl}/img/Background%20ormawa.png`,
  ogUrl: canonicalUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  twitterDescription: 'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Kreasi, Kolaborasi, Berprestasi.',
  twitterImage: `${siteUrl}/img/Background%20ormawa.png`,
})

useHead({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) return 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi'
    // Bersihkan duplikasi jika halaman lokal sudah menyertakan branding
    const cleaned = titleChunk
      .replace(/\s*[|—–-]\s*Ormawa UT Surabaya/gi, '')
      .trim()
    return cleaned ? `${cleaned} | Ormawa UT Surabaya` : 'Ormawa UT Surabaya'
  },
  link: [
    { rel: 'icon', type: 'image/png', href: '/img/Favicon_bulat_transparan.png' },
    { rel: 'apple-touch-icon', href: '/img/Favicon_bulat_transparan.png' },
    { rel: 'canonical', href: canonicalUrl },
  ],
  meta: [
    ...(config.public.googleSiteVerification
      ? [{ name: 'google-site-verification', content: config.public.googleSiteVerification as string }]
      : []),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Ormawa UT Surabaya',
            description: 'Portal Resmi Organisasi Mahasiswa Universitas Terbuka Surabaya',
            publisher: {
              '@id': `${siteUrl}/#organization`,
            },
            inLanguage: 'id-ID',
          },
          {
            '@type': 'EducationalOrganization',
            '@id': `${siteUrl}/#organization`,
            name: 'Ormawa UT Surabaya',
            alternateName: ['Organisasi Kemahasiswaan Universitas Terbuka Surabaya', 'Ormawa UT'],
            url: siteUrl,
            logo: `${siteUrl}/img/Favicon_bulat_transparan.png`,
            image: `${siteUrl}/img/Background%20ormawa.png`,
            sameAs: [
              'https://instagram.com',
            ],
          },
        ],
      }),
    },
  ],
})
</script>
