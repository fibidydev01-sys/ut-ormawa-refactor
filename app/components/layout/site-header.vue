<!--
  SITE HEADER — navbar situs publik (pengganti components/Navbar.vue)
  File: app/components/layout/site-header.vue

  Tersusun dari:
    - site-nav-dropdown.vue  grup menu desktop (hover)
    - site-mobile-nav.vue    panel menu mobile
    - auth-action.vue        tombol Masuk
  Isi menu dari constants/nav.ts.
-->
<script setup lang="ts">
import { SITE_NAV } from '~/constants/nav'

const { isActive, scrollTopIfCurrent } = useSiteNav()
const desktopEntries = SITE_NAV.filter((entry) => entry.type === 'group' || !entry.mobileOnly)

// Bar kuning di atas navbar disembunyikan begitu halaman digulir.
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-transform duration-300 ease-in-out"
    :class="isScrolled ? '-translate-y-12 md:-translate-y-14' : 'translate-y-0'"
  >
    <!-- Bar kuning -->
    <div class="h-12 md:h-14 w-full bg-[#FFD700]"></div>

    <nav class="bg-white border-b border-slate-200/80 shadow-sm transition-all">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          class="flex items-center justify-between md:justify-start md:gap-6 lg:gap-8 h-20 md:h-24 py-2"
        >
          <NuxtLink to="/beranda" class="flex items-center gap-3 cursor-pointer">
            <img
              src="/img/Logo-ormawa-navbar.png"
              alt="Logo Ormawa"
              class="h-16 md:h-20 w-auto object-contain mix-blend-multiply brightness-[1.08] contrast-[1.15]"
            />
          </NuxtLink>

          <!-- Navigasi desktop -->
          <div class="hidden md:flex items-center gap-4 lg:gap-6">
            <template v-for="entry in desktopEntries" :key="entry.label">
              <NuxtLink
                v-if="entry.type === 'link'"
                :to="entry.to"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200',
                  isActive(entry)
                    ? 'text-slate-900 bg-transparent hover:bg-slate-100'
                    : 'text-slate-900 hover:bg-slate-100 hover:text-slate-900',
                ]"
                @click="entry.scrollTopIfCurrent && scrollTopIfCurrent(entry.to)"
              >
                <NavIcon
                  v-if="entry.icon"
                  :name="entry.icon"
                  :stroke-width="entry.iconStrokeWidth"
                  class="w-4 h-4"
                />
                {{ entry.label }}
              </NuxtLink>
              <SiteNavDropdown v-else :group="entry" />
            </template>

            <AuthAction variant="desktop" />
          </div>

          <!-- Tombol menu mobile -->
          <button
            class="md:hidden text-slate-900 hover:text-slate-900 focus:outline-none p-1"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <NavIcon :name="isMobileMenuOpen ? 'close' : 'menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <SiteMobileNav :open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
    </nav>
  </header>
</template>
