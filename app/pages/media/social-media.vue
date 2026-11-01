<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 flex justify-center items-center gap-3">
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Social Media Ormawa
      </h1>
      <p class="text-slate-600 max-w-2xl mx-auto font-medium">Ikuti dan terhubung dengan kami di berbagai platform media sosial untuk mendapatkan informasi terbaru dan kegiatan Ormawa UT Surabaya.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" 
         class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all group overflow-hidden relative">
        <div class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" :style="{ backgroundColor: social.bgColor }"></div>
        <div class="h-20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl" v-html="social.iconSvg"></div>
        <h3 class="font-extrabold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">{{ social.name }}</h3>
        <span class="text-xs text-slate-500 mt-2 flex items-center gap-1 font-semibold">
          Kunjungi <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Social Media Resmi',
  ogTitle: 'Social Media Resmi Ormawa UT Surabaya',
  description: 'Daftar kanal dan platform media sosial resmi Organisasi Mahasiswa Universitas Terbuka Surabaya.',
  ogDescription: 'Daftar kanal dan platform media sosial resmi Organisasi Mahasiswa Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

const socialLinks = [
  { 
    name: 'Instagram', 
    url: 'https://instagram.com', 
    bgColor: '#E1306C', 
    iconSvg: `<svg class="w-16 h-16" viewBox="0 0 24 24"><defs><linearGradient id="ig-grad2" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse"><stop stop-color="#FEC564"/><stop offset="0.32" stop-color="#E1306C"/><stop offset="0.68" stop-color="#C13584"/><stop offset="1" stop-color="#405DE6"/></linearGradient></defs><path fill="url(#ig-grad2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>` 
  },
  { 
    name: 'Facebook', 
    url: 'https://facebook.com', 
    bgColor: '#1877F2', 
    iconSvg: `<svg class="w-16 h-16" viewBox="0 0 24 24" fill="#1877F2"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.125 0-1.72.361-1.95.836-.183.376-.275.986-.275 1.828v1.316h3.111l-.427 3.667h-2.684v7.98A11.956 11.956 0 0 0 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.877 4.227 10.768 9.101 11.691z"/></svg>` 
  },
  { 
    name: 'Twitter (X)', 
    url: 'https://twitter.com', 
    bgColor: '#000000', 
    iconSvg: `<svg class="w-14 h-14" viewBox="0 0 24 24" fill="#000000"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>` 
  },
  { 
    name: 'Discord', 
    url: 'https://discord.com', 
    bgColor: '#5865F2', 
    iconSvg: `<svg class="w-16 h-16" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1569 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z"/></svg>` 
  },
  { 
    name: 'YouTube', 
    url: 'https://youtube.com', 
    bgColor: '#FF0000', 
    iconSvg: `<svg class="w-16 h-16" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>` 
  },
  { 
    name: 'TikTok', 
    url: 'https://tiktok.com', 
    bgColor: '#000000', 
    iconSvg: `<svg class="w-14 h-14" viewBox="0 0 24 24" fill="#000000"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.65-.58 3.3-1.65 4.54-1.06 1.25-2.55 2.05-4.16 2.3-1.61.26-3.29-.02-4.72-.82-1.42-.79-2.58-2-3.26-3.46-.68-1.46-.86-3.13-.53-4.71.33-1.58 1.18-3.02 2.4-4.08 1.22-1.06 2.8-1.63 4.41-1.64.14 0 .28.01.42.02v4.06c-.84-.04-1.68.2-2.38.64-.7.44-1.25 1.09-1.52 1.86-.27.77-.24 1.62.08 2.37.32.75.9 1.36 1.63 1.7.73.34 1.56.39 2.32.14.76-.25 1.4-.77 1.8-1.46.39-.69.58-1.49.53-2.29V.02z"/></svg>` 
  },
  { 
    name: 'Telegram', 
    url: 'https://telegram.org', 
    bgColor: '#0088cc', 
    iconSvg: `<svg class="w-16 h-16" viewBox="0 0 24 24" fill="#26A5E4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>` 
  }
]
</script>
