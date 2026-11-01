<template>
  <header 
    class="sticky top-0 z-50 transition-transform duration-300 ease-in-out"
    :class="isScrolled ? '-translate-y-12 md:-translate-y-14' : 'translate-y-0'"
  >
    <!-- Top Yellow Bar -->
    <div class="h-12 md:h-14 w-full bg-[#FFD700]"></div>
    
    <nav class="bg-white border-b border-slate-200/80 shadow-sm transition-all">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div class="flex items-center justify-between md:justify-start md:gap-6 lg:gap-8 h-20 md:h-24 py-2">
        
        <!-- Logo Brand -->
        <NuxtLink to="/beranda" class="flex items-center gap-3 cursor-pointer">
          <img src="/img/Logo-ormawa-navbar.png" alt="Logo Ormawa" class="h-16 md:h-20 w-auto object-contain mix-blend-multiply brightness-[1.08] contrast-[1.15]" />
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-4 lg:gap-6">
          <!-- Beranda -->
          <NuxtLink 
            to="/beranda" 
            @click="handleBerandaClick"
            :class="[
              'flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200',
              isActiveLink('/beranda') 
                ? 'text-slate-900 bg-transparent hover:bg-slate-100' 
                : 'text-slate-900 hover:bg-slate-100 hover:text-slate-900'
            ]"
          >
            <!-- Home Icon -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Beranda
          </NuxtLink>

          <!-- Profil (Dropdown) -->
          <div class="relative group py-2">
            <button 
              type="button"
              :class="[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer focus:outline-none',
                isActiveLink('/profil') 
                  ? 'text-slate-900 bg-transparent group-hover:bg-slate-100' 
                  : 'text-slate-900 group-hover:bg-slate-100 group-hover:text-slate-900'
              ]"
            >
              <!-- User Icon -->
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Profil
              <!-- Chevron Down -->
              <svg class="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
              <NuxtLink to="/profil/tentang-ut" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Tentang UT Surabaya
              </NuxtLink>
              <NuxtLink to="/profil/tentang-ormawa" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Tentang Ormawa
              </NuxtLink>
              <NuxtLink to="/profil/visi-misi" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Visi & Misi
              </NuxtLink>
              <NuxtLink to="/profil/struktur-pengurus" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Struktur Pengurus
              </NuxtLink>
            </div>
          </div>

          <!-- Zona Kampus -->
          <div class="relative group py-2">
            <button 
              type="button"
              :class="[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer focus:outline-none',
                isActiveLink('/zona-kampus') 
                  ? 'text-slate-900 bg-transparent group-hover:bg-slate-100' 
                  : 'text-slate-900 group-hover:bg-slate-100 group-hover:text-slate-900'
              ]"
            >
              <!-- Graduation Cap Icon -->
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"></path>
              </svg>
              Zona Kampus
              <!-- Chevron Down -->
              <svg class="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu Zona Kampus -->
            <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
              <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Kegiatan
              </div>
              <NuxtLink to="/zona-kampus/akademik" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium pl-6">
                Akademik
              </NuxtLink>
              <NuxtLink to="/zona-kampus/non-akademik" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium pl-6 border-b border-slate-50">
                Non Akademik
              </NuxtLink>
              <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 mt-1">
                Pendaftaran
              </div>
              <NuxtLink to="/zona-kampus/ukm" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium pl-6">
                Unit Kreatifitas Mahasiswa (UKM)
              </NuxtLink>
              <NuxtLink to="/zona-kampus/imf" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium pl-6 border-b border-slate-50">
                Iam Fakultas (IMF/Hima)
              </NuxtLink>
            </div>
          </div>

          <!-- Media -->
          <div class="relative group py-2">
            <button 
              type="button"
              :class="[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer focus:outline-none',
                isActiveLink('/media') 
                  ? 'text-slate-900 bg-transparent group-hover:bg-slate-100' 
                  : 'text-slate-900 group-hover:bg-slate-100 group-hover:text-slate-900'
              ]"
            >
              <!-- Newspaper Icon -->
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              Media
              <!-- Chevron Down -->
              <svg class="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu Media -->
            <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
              <NuxtLink to="/media/artikel" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Artikel dan Berita
              </NuxtLink>
              <NuxtLink to="/media/perlombaan" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium border-b border-slate-50">
                Informasi perlombaan
              </NuxtLink>
              <NuxtLink to="/media/laporan" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium border-b border-slate-50">
                Laporan kegiatan
              </NuxtLink>
              <NuxtLink to="/media/social-media" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Social Media Ormawa
              </NuxtLink>
            </div>
          </div>

          <!-- Kontak -->
          <div class="relative group py-2">
            <button 
              type="button"
              class="px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 bg-red-500 hover:bg-red-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 border border-red-600 cursor-pointer focus:outline-none"
            >
              <!-- Headset Icon -->
              <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1c-4.97 0-9 4.03-9 9v7a3 3 0 003 3h1a2 2 0 002-2v-3a2 2 0 00-2-2H5v-3c0-3.87 3.13-7 7-7s7 3.13 7 7v3h-1a2 2 0 00-2 2v3a2 2 0 002 2h1a3 3 0 003-3v-7c0-4.97-4.03-9-9-9z"></path>
              </svg>
              Kontak
              <!-- Chevron Down -->
              <svg class="w-3 h-3 text-slate-900 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu Kontak -->
            <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
              <NuxtLink to="/kontak/aspirasi" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium border-b border-slate-50">
                Aspirasi
              </NuxtLink>
              <NuxtLink to="/kontak/pelaporan" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium border-b border-slate-50">
                Pelaporan
              </NuxtLink>
              <NuxtLink to="/kontak/wa_prodi_2026_2" class="block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                WA Prodi 2026
              </NuxtLink>
            </div>
          </div>

          <!-- Masuk Link -->
          <NuxtLink 
            to="/login/admin"
            class="px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 bg-lemon hover:bg-lemon-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 border border-lemon-dark ml-2"
          >
            <!-- Login Icon -->
            <svg class="w-3.5 h-3.5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            Masuk
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-slate-900 hover:text-slate-900 focus:outline-none p-1">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-slate-100 bg-white shadow-inner transition-all py-2 max-h-[85vh] overflow-y-auto">
      <div class="space-y-1 px-4">
        <!-- Beranda -->
        <NuxtLink 
          to="/beranda" 
          @click="() => { isMobileMenuOpen = false; handleBerandaClick(); }" 
          :class="[
            'flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all',
            isActiveLink('/beranda') 
              ? 'bg-slate-100 text-slate-900' 
              : 'text-slate-900 hover:bg-slate-50'
          ]"
        >
          Beranda
        </NuxtLink>

        <!-- Profil Expandable Section -->
        <div>
          <button 
            @click="toggleMobileProfil" 
            :class="[
              'flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left',
              isActiveLink('/profil') 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-900 hover:bg-slate-50'
            ]"
          >
            <span>Profil</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="isMobileProfilOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Submenu -->
          <div v-show="isMobileProfilOpen" class="pl-6 mt-1 space-y-1 border-l border-slate-100 ml-4">
            <NuxtLink 
              to="/profil/tentang-ut" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Tentang UT
            </NuxtLink>
            <NuxtLink 
              to="/profil/tentang-ormawa" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Tentang Ormawa
            </NuxtLink>
            <NuxtLink 
              to="/profil/visi-misi" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Visi & Misi
            </NuxtLink>
            <NuxtLink 
              to="/profil/struktur-pengurus" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Struktur Pengurus
            </NuxtLink>
          </div>
        </div>

        <!-- Zona Kampus Expandable Section -->
        <div>
          <button 
            @click="toggleMobileZonaKampus" 
            :class="[
              'flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left',
              isActiveLink('/zona-kampus') 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-900 hover:bg-slate-50'
            ]"
          >
            <span>Zona Kampus</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="isMobileZonaKampusOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Submenu -->
          <div v-show="isMobileZonaKampusOpen" class="pl-6 mt-1 space-y-1 border-l border-slate-100 ml-4">
            <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Kegiatan
            </div>
            <NuxtLink 
              to="/zona-kampus/akademik" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50 ml-2"
            >
              Akademik
            </NuxtLink>
            <NuxtLink 
              to="/zona-kampus/non-akademik" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50 ml-2 mb-2"
            >
              Non Akademik
            </NuxtLink>
            <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">
              Pendaftaran
            </div>
            <NuxtLink 
              to="/zona-kampus/ukm" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50 ml-2"
            >
              Unit Kreatifitas Mahasiswa (UKM)
            </NuxtLink>
            <NuxtLink 
              to="/zona-kampus/imf" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50 ml-2 mb-2"
            >
              Iam Fakultas (IMF/Hima)
            </NuxtLink>
          </div>
        </div>

        <!-- Media Expandable Section -->
        <div>
          <button 
            @click="toggleMobileMedia" 
            :class="[
              'flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left',
              isActiveLink('/media') 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-900 hover:bg-slate-50'
            ]"
          >
            <span>Media</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="isMobileMediaOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Submenu -->
          <div v-show="isMobileMediaOpen" class="pl-6 mt-1 space-y-1 border-l border-slate-100 ml-4">
            <NuxtLink 
              to="/media/artikel" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Artikel dan Berita
            </NuxtLink>
            <NuxtLink 
              to="/media/perlombaan" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Informasi perlombaan
            </NuxtLink>
            <NuxtLink 
              to="/media/laporan" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Laporan kegiatan
            </NuxtLink>
            <NuxtLink 
              to="/media/social-media" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Social Media Ormawa
            </NuxtLink>
          </div>
        </div>

        <!-- Kontak Expandable Section -->
        <div>
          <button 
            @click="toggleMobileKontak" 
            class="flex items-center justify-between w-full px-5 py-3 text-sm font-bold rounded-full bg-red-500 text-slate-900 hover:bg-red-600 transition-all text-left shadow-md border border-red-600 my-2"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1c-4.97 0-9 4.03-9 9v7a3 3 0 003 3h1a2 2 0 002-2v-3a2 2 0 00-2-2H5v-3c0-3.87 3.13-7 7-7s7 3.13 7 7v3h-1a2 2 0 00-2 2v3a2 2 0 002 2h1a3 3 0 003-3v-7c0-4.97-4.03-9-9-9z"></path>
              </svg>
              Kontak
            </span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="isMobileKontakOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Submenu -->
          <div v-show="isMobileKontakOpen" class="pl-6 mt-1 space-y-1 border-l border-slate-100 ml-4">
            <NuxtLink 
              to="/kontak/aspirasi" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Aspirasi
            </NuxtLink>
            <NuxtLink 
              to="/kontak/pelaporan" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              Pelaporan
            </NuxtLink>
            <NuxtLink 
              to="/kontak/wa_prodi_2026_2" 
              @click="isMobileMenuOpen = false" 
              class="block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              WA Prodi 2026
            </NuxtLink>
          </div>
        </div>

        <!-- Market -->
        <NuxtLink 
          to="/market" 
          @click="isMobileMenuOpen = false" 
          :class="[
            'flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all',
            isActiveLink('/market') 
              ? 'bg-slate-100 text-slate-900' 
              : 'text-slate-900 hover:bg-slate-50'
          ]"
        >
          Market
        </NuxtLink>
      </div>

      <!-- Action Buttons in Mobile Menu -->
      <div class="px-6 py-4 mt-2 border-t border-slate-100 flex flex-col gap-3">

        <!-- Masuk Link (Mobile) -->
        <NuxtLink 
          to="/login/admin"
          @click="isMobileMenuOpen = false" 
          class="flex justify-center items-center w-full py-3 px-4 rounded-xl bg-lemon text-sm font-bold text-slate-900 hover:bg-lemon-dark shadow border border-lemon-dark gap-2"
        >
          <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          Masuk
        </NuxtLink>
      </div>
    </div>
  </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isMobileMenuOpen = ref(false)
const isMobileProfilOpen = ref(false)
const isMobileMasukOpen = ref(false)
const isMobileZonaKampusOpen = ref(false)
const isMobileMediaOpen = ref(false)
const isMobileKontakOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleMobileProfil = () => {
  isMobileProfilOpen.value = !isMobileProfilOpen.value
}

const toggleMobileMasuk = () => {
  isMobileMasukOpen.value = !isMobileMasukOpen.value
}

const toggleMobileZonaKampus = () => {
  isMobileZonaKampusOpen.value = !isMobileZonaKampusOpen.value
}

const toggleMobileMedia = () => {
  isMobileMediaOpen.value = !isMobileMediaOpen.value
}

const toggleMobileKontak = () => {
  isMobileKontakOpen.value = !isMobileKontakOpen.value
}

const handleBerandaClick = () => {
  if (route.path === '/beranda') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const isActiveLink = (link: string) => {
  if (link === '/profil') {
    return route.path.startsWith('/profil') || route.path.startsWith('/profile')
  }
  if (link === '/zona-kampus') {
    return route.path.startsWith('/zona-kampus')
  }
  if (link === '/media') {
    return route.path.startsWith('/media')
  }
  if (link === '/kontak') {
    return route.path.startsWith('/kontak')
  }
  return route.path === link
}
</script>

<style scoped>
/* Transisi untuk kehalusan dropdown */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
