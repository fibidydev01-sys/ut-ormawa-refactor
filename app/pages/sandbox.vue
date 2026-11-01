<template>
  <div class="h-screen flex flex-col font-sans bg-white overflow-hidden text-slate-700">
    <!-- Top Navigation Bar -->
    <header class="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20">
      <div class="flex items-center">
        <!-- Logo -->
        <div class="w-60 flex items-center">
          <span class="text-2xl font-bold text-emerald-600 tracking-tight">MCLIS</span>
        </div>
        
        <!-- Horizontal Menu -->
        <nav class="hidden md:flex space-x-1 text-sm font-medium">
          <button 
            v-for="tab in tabs" :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-4 py-5 transition border-b-2',
              activeTab === tab 
                ? 'text-emerald-600 border-emerald-500' 
                : 'text-slate-500 hover:text-slate-800 border-transparent'
            ]"
          >
            {{ tab }}
          </button>
        </nav>
      </div>

      <!-- User Profile -->
      <div class="relative">
        <button @click="profileOpen = !profileOpen" class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition">
          <div class="text-right hidden sm:block">
            <div class="text-sm font-bold text-slate-800">Zainur Roziqin</div>
            <div class="text-xs text-emerald-600 font-semibold uppercase tracking-wider">IT</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ZR
          </div>
        </button>

        <!-- Profile Dropdown -->
        <div v-if="profileOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
          <a href="#" class="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Profil Saya</a>
          <a href="#" class="block px-4 py-2 text-sm text-emerald-600 bg-emerald-50/50">Pengaturan</a>
          <div class="border-t border-slate-100 my-1"></div>
          <a href="#" class="block px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50">Logout</a>
        </div>
      </div>
    </header>

    <!-- Main Content Area with Sidebar -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar -->
      <aside class="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto hidden md:flex custom-scrollbar relative z-10">
        <div class="p-4">
          <!-- Active Menu -->
          <a href="#" @click.prevent="activeTab = 'Beranda'" :class="[
            'flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium mb-6 transition',
            activeTab === 'Beranda' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
          ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Beranda
          </a>

          <!-- Main Nav Section -->
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Menu Utama</div>
          <nav class="space-y-1 flex flex-col">
            <a href="#" @click.prevent="activeTab = 'Profil'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Profil' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Profil
            </a>
            <a href="#" @click.prevent="activeTab = 'Zona Kampus'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Zona Kampus' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"></path>
              </svg>
              Zona Kampus
            </a>
            <a href="#" @click.prevent="activeTab = 'Media'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Media' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              Media
            </a>
            <a href="#" @click.prevent="activeTab = 'Kontak'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Kontak' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1c-4.97 0-9 4.03-9 9v7a3 3 0 003 3h1a2 2 0 002-2v-3a2 2 0 00-2-2H5v-3c0-3.87 3.13-7 7-7s7 3.13 7 7v3h-1a2 2 0 00-2 2v3a2 2 0 002 2h1a3 3 0 003-3v-7c0-4.97-4.03-9-9-9z"></path></svg>
              Kontak
            </a>
          </nav>
        </div>
        
        <div class="mt-auto p-4 border-t border-slate-100 flex flex-col gap-1">
          <NuxtLink to="/" class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg w-full px-2 py-2 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Ke Halaman Utama Web
          </NuxtLink>
          <button @click="logout" class="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg w-full px-2 py-2 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Keluar
          </button>
        </div>
      </aside>

      <!-- Dashboard Main -->
      <main class="flex-1 bg-[#FAFBFC] p-6 lg:p-10 overflow-y-auto relative">
        <div class="max-w-5xl mx-auto pt-4">
          
          <!-- Default Dashboard Content -->
          <div v-if="activeTab === 'Beranda'">
            <!-- Greeting -->
            <div class="mb-10">
              <h1 class="text-[32px] md:text-[40px] font-semibold text-indigo-500/80 mb-2 font-sans tracking-tight">Halo Zainur</h1>
              <p class="text-slate-500 text-lg">Apa yang bisa saya bantu hari ini?</p>
            </div>

          <!-- Search Input -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 mb-10 flex flex-col relative group transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <textarea 
              class="w-full bg-transparent resize-none border-none focus:ring-0 text-slate-700 text-lg py-3 px-2 placeholder:text-slate-300 min-h-[80px]" 
              placeholder="Ketik instruksi atau cari data pasien..."
            ></textarea>
            <div class="flex items-center justify-between mt-2 px-2">
              <div class="flex gap-4 text-slate-400">
                <button class="hover:text-slate-600 transition">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </button>
                <button class="hover:text-slate-600 transition">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                </button>
              </div>
              <button class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform hover:scale-105">
                <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Daftarkan Pasien Baru</span>
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </a>
            
            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Statistik Pemeriksaan</span>
              <div class="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              </div>
            </a>

            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Register TBC</span>
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
            </a>

            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Cek Koneksi Simrs</span>
              <div class="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
              </div>
            </a>

            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Pemeriksaan</span>
              <div class="w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
            </a>

            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Log Proses</span>
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
              </div>
            </a>

            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Peta Bakteri</span>
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
            </a>

            <a href="#" class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]">
              <span class="font-medium text-slate-700 w-3/4 leading-snug">Peta Antibiotik</span>
              <div class="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
            </a>
            
          </div>
          </div>

          <!-- Profil Page (Superadmin) -->
          <div v-else-if="activeTab === 'Profil'" class="space-y-6">
            <div class="mb-8">
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">Manajemen Profil</h1>
              <p class="text-slate-500 mt-1">Kelola konten profil organisasi yang tampil di halaman utama pengunjung.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Sidebar Navigation inside Profil -->
              <div class="lg:col-span-1">
                <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                  <nav class="flex flex-col space-y-1">
                    <button v-for="(item, idx) in [
                      { id: 'Tentang UT', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                      { id: 'Tentang Ormawa', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                      { id: 'Visi & Misi', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { id: 'Struktur Pengurus', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' }
                    ]" :key="idx" @click="activeSubTab['Profil'] = item.id" :class="[
                      'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
                      activeSubTab['Profil'] === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                    ]">
                      <div class="flex items-center gap-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path></svg>
                        {{ item.id }}
                      </div>
                      <svg v-if="activeSubTab['Profil'] === item.id" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </nav>
                </div>
              </div>

              <!-- Main Form Area -->
              <div class="lg:col-span-2">
                <div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                  <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-400"></div>
                  
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-2">
                    <div>
                      <h2 class="text-xl font-bold text-slate-800">Edit {{ activeSubTab['Profil'] }}</h2>
                      <p class="text-sm text-slate-500">Ubah informasi teks dan gambar pada halaman {{ activeSubTab['Profil'] }}.</p>
                    </div>
                    <button class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow hover:shadow-md flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      Simpan Perubahan
                    </button>
                  </div>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-semibold text-slate-700 mb-2">Judul Halaman</label>
                      <input type="text" value="Universitas Terbuka Surabaya" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-slate-700" />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Utama</label>
                      <div class="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition">
                        <!-- Toolbar Mockup -->
                        <div class="flex items-center gap-1 bg-slate-50 border-b border-slate-200 p-2 text-slate-500">
                          <button class="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold">B</button>
                          <button class="p-1.5 hover:bg-slate-200 rounded text-slate-700 italic">I</button>
                          <button class="p-1.5 hover:bg-slate-200 rounded text-slate-700 underline">U</button>
                          <div class="w-px h-5 bg-slate-300 mx-1"></div>
                          <button class="p-1.5 hover:bg-slate-200 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                          </button>
                          <button class="p-1.5 hover:bg-slate-200 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                          </button>
                        </div>
                        <textarea rows="6" class="w-full px-4 py-3 bg-white focus:outline-none text-slate-600 leading-relaxed">Universitas Terbuka (UT) adalah Perguruan Tinggi Negeri ke-45 di Indonesia yang diresmikan pada tanggal 4 September 1984, berdasarkan Keputusan Presiden RI Nomor 41 Tahun 1984. UT menerapkan sistem belajar terbuka dan jarak jauh. Sistem belajar ini terbukti efektif untuk meningkatkan daya jangkau dan pemerataan kesempatan pendidikan tinggi yang berkualitas bagi semua warga negara Indonesia.</textarea>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-semibold text-slate-700 mb-2">Banner / Gambar Utama</label>
                      <div class="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-indigo-300 transition cursor-pointer group">
                        <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition">
                          <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        </div>
                        <span class="text-sm font-medium text-slate-700">Klik untuk upload atau drag & drop gambar</span>
                        <span class="text-xs text-slate-400 mt-1">Format PNG, JPG, Max 5MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Zona Kampus Page (Superadmin) -->
          <div v-else-if="activeTab === 'Zona Kampus'" class="space-y-6">
            <div class="mb-8">
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">Manajemen Zona Kampus</h1>
              <p class="text-slate-500 mt-1">Kelola data akademik, kegiatan mahasiswa, dan komunitas kampus.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <!-- Sidebar Navigation inside Zona Kampus -->
              <div class="lg:col-span-1">
                <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                  <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kegiatan</div>
                  <nav class="flex flex-col space-y-1 mb-4">
                    <button v-for="item in ['Akademik', 'Non Akademik']" :key="item" @click="activeSubTab['Zona Kampus'] = item" :class="[
                      'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
                      activeSubTab['Zona Kampus'] === item ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                    ]">
                      {{ item }}
                      <svg v-if="activeSubTab['Zona Kampus'] === item" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </nav>
                  
                  <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pendaftaran</div>
                  <nav class="flex flex-col space-y-1 mb-4">
                    <button v-for="item in ['UKM', 'IMF / Hima']" :key="item" @click="activeSubTab['Zona Kampus'] = item" :class="[
                      'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
                      activeSubTab['Zona Kampus'] === item ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                    ]">
                      {{ item }}
                      <svg v-if="activeSubTab['Zona Kampus'] === item" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </nav>
                  

                </div>
              </div>

              <!-- Main Table Area -->
              <div class="lg:col-span-3">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                  <div class="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 class="text-xl font-bold text-slate-800">Manajemen {{ activeSubTab['Zona Kampus'] }}</h2>
                      <p class="text-sm text-slate-500">Pengaturan untuk data dan konfigurasi halaman {{ activeSubTab['Zona Kampus'] }}.</p>
                    </div>
                    <button class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                      Tambah Kegiatan Baru
                    </button>
                  </div>
                  
                  <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-slate-600">
                      <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                        <tr>
                          <th class="px-6 py-4">Nama Kegiatan</th>
                          <th class="px-6 py-4">Tanggal</th>
                          <th class="px-6 py-4">Status</th>
                          <th class="px-6 py-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50 transition">
                          <td class="px-6 py-4 font-medium text-slate-800">Seminar Nasional AI</td>
                          <td class="px-6 py-4">12 Nov 2026</td>
                          <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-700">Dibuka</span></td>
                          <td class="px-6 py-4 text-right">
                            <button class="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                          </td>
                        </tr>
                        <tr class="hover:bg-slate-50 transition">
                          <td class="px-6 py-4 font-medium text-slate-800">Workshop Web Dev</td>
                          <td class="px-6 py-4">05 Okt 2026</td>
                          <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600">Selesai</span></td>
                          <td class="px-6 py-4 text-right">
                            <button class="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Media Page (Superadmin) -->
          <div v-else-if="activeTab === 'Media'" class="space-y-6">
            <div class="mb-8">
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">Manajemen Media</h1>
              <p class="text-slate-500 mt-1">Publikasi artikel, berita, dan laporan kegiatan ormawa.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div class="lg:col-span-1">
                <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                  <nav class="flex flex-col space-y-1">
                    <button v-for="item in ['Artikel & Berita', 'Info Perlombaan', 'Laporan Kegiatan', 'Social Media']" :key="item" @click="activeSubTab['Media'] = item" :class="[
                      'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
                      activeSubTab['Media'] === item ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                    ]">
                      {{ item }}
                      <svg v-if="activeSubTab['Media'] === item" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </nav>
                </div>
              </div>

              <!-- Media Grid Area -->
              <div class="lg:col-span-3">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <h2 class="text-xl font-bold text-slate-800">{{ activeSubTab['Media'] }} Terbaru</h2>
                  <button class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Tulis Artikel
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Article Card Mock -->
                  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
                    <div class="h-40 bg-slate-200 relative">
                      <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"></div>
                      <div class="absolute top-3 right-3 flex gap-2">
                        <button class="w-8 h-8 rounded-lg bg-white/90 text-slate-700 flex items-center justify-center hover:bg-white shadow backdrop-blur transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                        <button class="w-8 h-8 rounded-lg bg-white/90 text-red-600 flex items-center justify-center hover:bg-white shadow backdrop-blur transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                      </div>
                    </div>
                    <div class="p-5">
                      <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">Berita</span>
                      <h3 class="font-bold text-slate-800 text-lg mb-2 line-clamp-2">Perayaan Dies Natalis UT Surabaya ke-40 Meriah</h3>
                      <p class="text-sm text-slate-500 mb-4">Dipublikasikan pada 04 Sep 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Kontak Page (Superadmin) -->
          <div v-else-if="activeTab === 'Kontak'" class="space-y-6">
            <div class="mb-8">
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">Manajemen Kontak & Layanan</h1>
              <p class="text-slate-500 mt-1">Tanggapi aspirasi, pertanyaan, dan pelaporan dari mahasiswa.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div class="lg:col-span-1">
                <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                  <nav class="flex flex-col space-y-1">
                    <button v-for="(item, idx) in [{ id: 'Inbox Aspirasi', badge: 5, color: 'indigo' }, { id: 'Pelaporan Masalah', badge: 1, color: 'slate' }]" :key="item.id" @click="activeSubTab['Kontak'] = item.id" :class="[
                      'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
                      activeSubTab['Kontak'] === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                    ]">
                      <div class="flex items-center gap-2">
                        {{ item.id }}
                        <svg v-if="activeSubTab['Kontak'] === item.id" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                      <span :class="['px-2 py-0.5 rounded-full text-xs font-semibold', item.color === 'indigo' ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-200 text-slate-600']">{{ item.badge }}</span>
                    </button>
                  </nav>
                </div>
              </div>

              <!-- Inbox Area -->
              <div class="lg:col-span-3">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
                    <h2 class="font-bold text-slate-800">{{ activeSubTab['Kontak'] }}</h2>
                    <div class="flex gap-2">
                      <button class="p-2 text-slate-400 hover:text-slate-600 transition bg-white border border-slate-200 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg></button>
                    </div>
                  </div>
                  <div class="divide-y divide-slate-100">
                    <div class="p-5 hover:bg-slate-50 transition cursor-pointer flex gap-4">
                      <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">MH</div>
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                          <h3 class="font-bold text-slate-800">Muhammad Hidayat</h3>
                          <span class="text-xs text-slate-400">10:30 AM</span>
                        </div>
                        <h4 class="text-sm font-semibold text-slate-700 mb-1">Fasilitas Wi-Fi Kampus</h4>
                        <p class="text-sm text-slate-500 line-clamp-1">Mohon untuk peningkatan sinyal wi-fi di area ruang baca gedung B karena sering terputus.</p>
                      </div>
                    </div>
                    <div class="p-5 hover:bg-slate-50 transition cursor-pointer flex gap-4 opacity-70">
                      <div class="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0">SA</div>
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                          <h3 class="font-bold text-slate-800">Siti Aisyah</h3>
                          <span class="text-xs text-slate-400">Kemarin</span>
                        </div>
                        <h4 class="text-sm font-semibold text-slate-700 mb-1">Jadwal Tutorial Tatap Muka</h4>
                        <p class="text-sm text-slate-500 line-clamp-1">Apakah ada perubahan jadwal untuk TTM mata kuliah Statistika?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dummy Content for Unknown Tabs -->
          <div v-else class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center">
            <div class="text-center">
              <h2 class="text-xl font-bold text-slate-800 mb-2">Halaman {{ activeTab }}</h2>
              <p class="text-slate-500">Desain halaman ini belum dibuat.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const profileOpen = ref(false)
const activeTab = ref('Beranda')
const tabs = ['Beranda', 'Profil', 'Zona Kampus', 'Media', 'Kontak']

const activeSubTab = ref<Record<string, string>>({
  'Profil': 'Tentang UT',
  'Zona Kampus': 'Akademik',
  'Media': 'Artikel & Berita',
  'Kontak': 'Inbox Aspirasi'
})

const logout = async () => {
  const { $auth } = useNuxtApp()
  if ($auth) {
    const { signOut } = await import('firebase/auth')
    await signOut($auth)
    navigateTo('/login/admin')
  }
}

// Set page meta
definePageMeta({
  layout: false // disable default layout to match the screenshot exactly
})

useHead({
  title: 'MCLIS - Dashboard',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
