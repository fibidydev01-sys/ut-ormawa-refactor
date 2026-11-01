<template>
  <footer class="relative bg-[#2264D1] text-white overflow-hidden">
    <!-- Top Yellow Border -->
    <div class="h-1.5 w-full bg-[#FFD700]"></div>
    
    <!-- Optional: Subtle Network Background Pattern -->
    <div class="absolute inset-0 pointer-events-none opacity-10" style="background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px); background-size: 40px 40px;"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-start">
        
        <!-- Column 1: Logo & Address -->
        <div class="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
          <img src="/img/Favicon_bulat_transparan.png" alt="Logo UT" class="w-24 h-auto object-contain drop-shadow-sm" loading="lazy" />
          <div class="text-sm leading-relaxed text-blue-50">
            <p>Jalan Dr. Ir. H. Soekarno No. 567 (MERR), Rungkut</p>
            <p>Surabaya, Jawa Timur</p>
            <p>Telp : 031-35929999</p>
          </div>
        </div>

        <!-- Column 2: Contact & Socials -->
        <div class="lg:col-span-3 flex flex-col items-center sm:items-start gap-4 text-sm text-blue-50">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4.5c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.9 0 7.1 3.2 7.1 7.1zM15 12h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/></svg>
            <span>Hallo-UT 1500024</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span>hallo-ut.ut.ac.id</span>
          </div>
          
          <!-- Social Icons -->
          <div class="flex flex-wrap gap-2 mt-1">
            <!-- Facebook -->
            <a href="#" class="w-7 h-7 rounded-full bg-[#0D2E68] flex items-center justify-center hover:bg-slate-900 transition"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <!-- Instagram -->
            <a href="#" class="w-7 h-7 rounded-full bg-[#0D2E68] flex items-center justify-center hover:bg-slate-900 transition"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
            <!-- Youtube -->
            <a href="#" class="w-7 h-7 rounded-full bg-[#0D2E68] flex items-center justify-center hover:bg-slate-900 transition"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            <!-- LinkedIn -->
            <a href="#" class="w-7 h-7 rounded-full bg-[#0D2E68] flex items-center justify-center hover:bg-slate-900 transition"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <!-- X -->
            <a href="#" class="w-7 h-7 rounded-full bg-[#0D2E68] flex items-center justify-center hover:bg-slate-900 transition"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z"/></svg></a>
            <!-- TikTok -->
            <a href="#" class="w-7 h-7 rounded-full bg-[#0D2E68] flex items-center justify-center hover:bg-slate-900 transition"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.22-2.39.84-4.78 2.75-6.18 1.34-.99 2.98-1.41 4.62-1.3l.03 4.17c-1.35-.12-2.73.41-3.51 1.48-.68.96-.86 2.27-.42 3.39.46 1.15 1.57 2.01 2.8 2.12 1.18.1 2.41-.33 3.2-1.2.73-.83 1.05-1.93 1.07-3.03.05-4.46.02-8.93.02-13.39h.03z"/></svg></a>
          </div>
        </div>

        <!-- Column 3: Links Grid -->
        <div class="lg:col-span-4 mt-4 lg:mt-0">
          <div class="grid grid-cols-3 gap-x-2 gap-y-4 text-[13px] font-semibold text-blue-100 uppercase tracking-wide">
            <div class="flex flex-col gap-3">
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">STAFF</NuxtLink>
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">WEBMAIL</NuxtLink>
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">PD-DIKTI</NuxtLink>
            </div>
            <div class="flex flex-col gap-3">
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">DIKTI</NuxtLink>
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">KEMDIKTISAINTEK</NuxtLink>
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">KOMDIGI</NuxtLink>
            </div>
            <div class="flex flex-col gap-3">
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">AAOU</NuxtLink>
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">ICDE</NuxtLink>
              <NuxtLink to="/" class="hover:text-yellow-400 transition-colors">OEC</NuxtLink>
            </div>
          </div>
        </div>

      </div>

      <!-- Divider & Copyright -->
      <div class="border-t border-blue-400/30 mt-12 pt-6 text-center text-xs font-medium text-blue-200">
        &copy; Universitas Terbuka 1984 - 2026
      </div>
    </div>

    <!-- Floating Action Button -->
    <a href="https://wa.me/1500024" target="_blank" class="fixed bottom-6 right-6 bg-[#0E3577] text-white px-5 py-3 rounded-full shadow-2xl hover:bg-slate-900 transition-all flex items-center gap-2 font-bold border border-white/10 z-50 group hover:scale-105 duration-300">
      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0">
        <svg class="w-4 h-4 text-[#0E3577]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
      </div>
      Tanya Kami
    </a>
  </footer>
</template>

<script setup lang="ts">
// Footer Component
</script>
