<template>
  <div class="h-screen flex flex-col font-sans bg-white overflow-hidden text-slate-700">

    <!-- ===== TOP HEADER BAR (like sandbox) ===== -->
    <header class="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20">
      <div class="flex items-center">
        <!-- Logo -->
        <div class="w-60 flex items-center gap-3">
          <img src="/img/Favicon_bulat_transparan.png" alt="Logo" class="h-9 w-auto drop-shadow-sm" />
          <div>
            <span class="text-lg font-bold text-emerald-600 tracking-tight">ORMAWA</span>
            <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">Admin Panel</p>
          </div>
        </div>

        <!-- Horizontal Tab Navigation (like sandbox) -->
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

      <!-- User Profile Dropdown (like sandbox) -->
      <div class="relative">
        <button @click="profileOpen = !profileOpen" class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition">
          <div class="text-right hidden sm:block">
            <div class="text-sm font-bold text-slate-800">{{ userName }}</div>
            <div class="text-xs text-emerald-600 font-semibold uppercase tracking-wider">{{ roleLabel }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {{ initials }}
          </div>
        </button>
        <!-- Dropdown -->
        <div v-if="profileOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
          <NuxtLink to="/dashboard" class="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Beranda Publik</NuxtLink>
          <div class="border-t border-slate-100 my-1"></div>
          <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50">Logout</button>
        </div>
      </div>
    </header>

    <!-- ===== MAIN AREA: Sidebar + Content ===== -->
    <div class="flex flex-1 overflow-hidden relative">

      <!-- ===== SIDEBAR (like sandbox) ===== -->
      <aside class="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto hidden md:flex custom-scrollbar relative z-10">
        <div class="p-4">

          <!-- Dashboard link (active item style) -->
          <a href="#" @click.prevent="activeTab = 'Dashboard'" :class="[
            'flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium mb-6 transition',
            activeTab === 'Dashboard' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
          ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </a>

          <!-- Section: Menu Utama -->
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Menu Utama</div>
          <nav class="space-y-1 flex flex-col">
            <a href="#" @click.prevent="activeTab = 'Konten'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Konten' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              Manajemen Konten
            </a>
            <a href="#" v-if="userRole === 'super_admin'" @click.prevent="activeTab = 'Pengguna'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Pengguna' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Akses & Pengguna
            </a>
            <a href="#" @click.prevent="activeTab = 'Proposal'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Proposal' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Arsip E-Proposal
            </a>
            <a href="#" @click.prevent="activeTab = 'Pengaturan'" :class="['flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group', activeTab === 'Pengaturan' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-slate-600 hover:bg-slate-50']">
              <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Pengaturan Sistem
            </a>
          </nav>

        </div>

      </aside>

      <!-- ===== MAIN CONTENT ===== -->
      <main class="flex-1 bg-[#FAFBFC] p-6 lg:p-8 overflow-y-auto relative custom-scrollbar">
        <div class="max-w-6xl mx-auto">

          <!-- === TAB: Dashboard (Command Center) === -->
          <div v-if="activeTab === 'Dashboard'">
            <!-- Header -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-1">Command Center 🚀</h1>
                <p class="text-slate-500 font-medium">Selamat datang, {{ userName }}. Berikut adalah ringkasan aktivitas hari ini.</p>
              </div>
              <div class="flex items-center gap-3 w-full md:w-auto">
                <button class="flex-1 md:flex-none bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-semibold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  Tulis Berita
                </button>
                <button class="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Buat Pengumuman
                </button>
              </div>
            </div>

            <!-- Metric Cards (4 cards) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <div class="relative z-10 flex justify-between items-start">
                  <div>
                    <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Tiket Aspirasi</p>
                    <h4 class="text-4xl font-black text-slate-800">12</h4>
                    <p class="text-xs font-semibold text-orange-500 mt-2 flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> 5 Belum Dibaca
                    </p>
                  </div>
                  <div class="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <div class="relative z-10 flex justify-between items-start">
                  <div>
                    <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Proposal Masuk</p>
                    <h4 class="text-4xl font-black text-slate-800">4</h4>
                    <p class="text-xs font-semibold text-blue-500 mt-2">Butuh Review BEM</p>
                  </div>
                  <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <div class="relative z-10 flex justify-between items-start">
                  <div>
                    <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Civitas</p>
                    <h4 class="text-4xl font-black text-slate-800">1,204</h4>
                    <p class="text-xs font-semibold text-emerald-500 mt-2 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                      +12 Minggu Ini
                    </p>
                  </div>
                  <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <div class="relative z-10 flex justify-between items-start">
                  <div>
                    <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Kunjungan</p>
                    <h4 class="text-4xl font-black text-slate-800">842</h4>
                    <p class="text-xs font-semibold text-purple-500 mt-2 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                      Trafik stabil
                    </p>
                  </div>
                  <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main 2-column layout -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

              <!-- Modul Utama (1/4) -->
              <div class="lg:col-span-1 flex flex-col gap-4">
                <h3 class="text-lg font-bold text-slate-800 px-1">Modul Utama</h3>

                <NuxtLink to="/dashboard/admin-area/berita" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors text-sm">Manajemen Konten</h4>
                  <p class="text-xs text-slate-500">Edit Berita, Banner, Agenda</p>
                </NuxtLink>

                <NuxtLink v-if="userRole === 'super_admin'" to="/dashboard/admin-area/kelola-user" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors text-sm">Akses & Pengguna</h4>
                  <p class="text-xs text-slate-500">Khusus Super Admin</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/admin-area/proposal" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                  <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors text-sm">Arsip E-Proposal</h4>
                  <p class="text-xs text-slate-500">Review & Gudang LPJ</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/admin-area/pengaturan" class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors text-sm">Pengaturan Sistem</h4>
                  <p class="text-xs text-slate-500">Konfigurasi Website</p>
                </NuxtLink>

                <!-- Notepad -->
                <div class="bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-sm flex flex-col h-52">
                  <div class="flex items-center gap-2 mb-3">
                    <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    <h3 class="font-bold text-amber-800 text-sm">Catatan Pribadi</h3>
                    <span v-if="isSavingNote" class="text-xs text-amber-600 ml-auto animate-pulse">Menyimpan...</span>
                    <span v-else-if="noteSaved" class="text-xs text-green-600 ml-auto">Tersimpan ✓</span>
                  </div>
                  <textarea
                    v-model="adminNote"
                    @input="debouncedSaveNote"
                    class="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 text-sm text-slate-700 placeholder-amber-300 p-0 outline-none"
                    placeholder="Ketik catatan di sini... (otomatis tersimpan)"
                  ></textarea>
                </div>

                <!-- Keamanan Biometrik -->
                <div class="bg-indigo-50 rounded-2xl p-5 border border-indigo-200 shadow-sm flex flex-col items-center text-center">
                  <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                  </div>
                  <h4 class="font-bold text-indigo-800 mb-1">Keamanan Biometrik</h4>
                  <p class="text-xs text-indigo-600 mb-3">Login instan dengan sidik jari/Face ID.</p>
                  <button @click="registerPasskey" :disabled="isRegisteringPasskey" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all text-sm disabled:opacity-70">
                    <span v-if="isRegisteringPasskey">Mendaftarkan...</span>
                    <span v-else>Daftarkan Perangkat Ini</span>
                  </button>
                  <p v-if="passkeyMessage" class="text-xs mt-2 font-semibold" :class="passkeyError ? 'text-red-600' : 'text-green-600'">{{ passkeyMessage }}</p>
                </div>
              </div>

              <!-- Aktivitas & Inbox (3/4) -->
              <div class="lg:col-span-3 grid grid-cols-1 xl:grid-cols-5 gap-8">

                <!-- Log Aktivitas Terbaru -->
                <div class="xl:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800">Log Aktivitas Terbaru</h3>
                    <button class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">Lihat Semua</button>
                  </div>
                  <div class="space-y-6">
                    <div v-if="globalLogs.length === 0" class="text-slate-500 text-sm">Belum ada aktivitas terekam.</div>
                    <div v-for="log in globalLogs" :key="log.id" class="flex gap-4">
                      <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div class="flex-1 pb-4 border-b border-slate-100">
                        <p class="text-sm text-slate-800"><span class="font-bold text-blue-600">{{ log.aktorName }}</span> {{ log.aksi }} <span v-if="log.target">"{{ log.target }}"</span>.</p>
                        <p class="text-xs text-slate-500 mt-1">{{ formatTime(log.timestamp) }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Inbox Aspirasi -->
                <div class="xl:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                      Inbox Aspirasi <span class="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">5 Baru</span>
                    </h3>
                  </div>
                  <div class="flex-1 space-y-4">
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer group">
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">Anonim</h4>
                        <span class="text-[10px] font-semibold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">10:05</span>
                      </div>
                      <p class="text-xs text-slate-600 line-clamp-2 mb-3">Mohon perbaiki lampu di area parkir motor B, sangat gelap saat malam hari.</p>
                      <button class="text-xs font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors w-full">Balas / Proses</button>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer group">
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">Ahmad Ridwan</h4>
                        <span class="text-[10px] font-semibold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">Kemarin</span>
                      </div>
                      <p class="text-xs text-slate-600 line-clamp-2 mb-3">Saran untuk menambahkan WiFi di area kantin baru karena susah sinyal.</p>
                      <button class="text-xs font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-lg transition-colors w-full">Lihat Detail</button>
                    </div>
                  </div>
                  <button class="mt-6 text-sm font-bold text-slate-500 hover:text-blue-600 text-center w-full transition-colors">
                    Buka Pusat Aspirasi &rarr;
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- === TAB: Pengguna === -->
          <div v-else-if="activeTab === 'Pengguna'">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">Kelola Pengguna & Role</h1>
                <p class="text-slate-500 mt-1">Buat akun akses untuk Admin dan Pengurus Organisasi.</p>
              </div>
              <button @click="isModalOpen = true" class="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Pengurus
              </button>
            </div>

            <!-- Tabel Pengguna -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table class="min-w-full divide-y divide-slate-100">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Pengguna</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Organisasi</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Password</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-100">
                  <tr v-if="users.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 text-sm">Belum ada data pengguna.</td>
                  </tr>
                  <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 transition">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-3">
                        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                          {{ user.name.substring(0, 2).toUpperCase() }}
                        </div>
                        <div>
                          <div class="text-sm font-semibold text-slate-900">{{ user.name }}</div>
                          <div class="text-xs text-slate-500">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : user.role === 'Super_admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'">
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ user.organisasi }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div class="flex items-center gap-2">
                        <span v-if="user.password === 'Login via Google'" class="inline-block bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-500 w-40 text-sm">Login via Google</span>
                        <span v-else class="inline-block font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-700 w-40 overflow-hidden text-ellipsis align-middle">
                          {{ user.showPassword ? user.password : '••••••••••••' }}
                        </span>
                        <button v-if="user.password !== 'Login via Google'" @click="togglePassword(user)" class="text-slate-400 hover:text-indigo-600 transition">
                          <svg v-if="!user.showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="openEditModal(user)" class="text-indigo-600 hover:text-indigo-800 font-semibold mr-4 transition">Edit</button>
                      <button @click="deleteUser(user)" class="text-red-500 hover:text-red-700 font-semibold transition">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- === TAB: Lainnya (placeholder) === -->
          <div v-else class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center">
            <div class="text-center">
              <div class="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h2 class="text-xl font-bold text-slate-800 mb-2">{{ activeTab }}</h2>
              <p class="text-slate-500">Halaman ini akan segera tersedia.</p>
            </div>
          </div>

          <!-- === MODAL Tambah / Edit Pengguna === -->
          <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
              <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 class="text-lg font-bold text-slate-800">{{ isEditMode ? 'Edit Pengguna' : 'Tambah Akun Pengurus' }}</h3>
                <button @click="closeModal" class="text-slate-400 hover:text-slate-600 transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <form @submit.prevent="createUser" class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input v-model="newUser.name" type="text" required class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white bg-slate-50 transition text-sm" placeholder="Contoh: Ketua IMF FEB">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1">Email (Kode Pengguna)</label>
                  <input v-model="newUser.email" type="email" required class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white bg-slate-50 transition text-sm" placeholder="imffeb@ormawautsby.com">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1">Password Awal</label>
                  <div class="relative">
                    <input v-model="newUser.password" :type="showModalPassword ? 'text' : 'password'" required class="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white bg-slate-50 transition text-sm" placeholder="Ketik password di sini">
                    <button type="button" @click="showModalPassword = !showModalPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition">
                      <svg v-if="!showModalPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                    </button>
                  </div>
                  <p class="text-xs text-slate-400 mt-1">Berikan password ini kepada pengurus untuk login pertama kali.</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1">Role & Akses</label>
                  <select v-model="newUser.role" required class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition text-sm">
                    <option value="" disabled>Pilih Role...</option>
                    <option value="admin">Admin (BPH Utama)</option>
                    <option value="pengurus">Pengurus (Ketua IMF/UKM)</option>
                    <option value="mahasiswa">Mahasiswa</option>
                  </select>
                </div>
                <div class="pt-2 flex gap-3">
                  <button type="button" @click="closeModal" class="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition">Batal</button>
                  <button type="submit" class="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">{{ isEditMode ? 'Simpan' : 'Buat Akun' }}</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { startRegistration } from '@simplewebauthn/browser'


// Disable default layout — halaman ini self-contained seperti sandbox
definePageMeta({
  layout: false,
  middleware: ['auth']
})

// ==========================================
// KELOLA PENGGUNA (dari kelola-user.vue)
// ==========================================
const isModalOpen = ref(false)
const showModalPassword = ref(false)
const isEditMode = ref(false)
const editingUserId = ref<string | null>(null)
const users = ref<any[]>([])

const { logActivity } = useActivityLog()

const newUser = ref({ name: '', email: '', password: '', role: '' })

const fetchUsers = async () => {
  try {
    const { $db } = useNuxtApp()
    if (!$db) return
    const { collection, getDocs } = await import('firebase/firestore')
    const usersSnap = await getDocs(collection($db, 'users'))
    users.value = usersSnap.docs.map(doc => {
      const data = doc.data()
      let organisasi = data.prodi || 'Pusat (BPH)'
      if (data.role === 'mahasiswa' && data.prodi) organisasi = data.prodi
      else if (data.role === 'mahasiswa' && !data.prodi) organisasi = 'Mahasiswa'
      return {
        id: doc.id,
        name: data.nama || 'Tanpa Nama',
        email: data.email || '-',
        role: data.role ? (data.role.charAt(0).toUpperCase() + data.role.slice(1)) : 'Mahasiswa',
        organisasi,
        password: data.password || 'Login via Google',
        showPassword: false
      }
    })
  } catch (error) { console.error('Error fetching users:', error) }
}

const togglePassword = (user: any) => {
  if (user.password !== 'Login via Google') user.showPassword = !user.showPassword
}

const createUser = async () => {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.password || !newUser.value.role) {
    alert('Harap isi semua kolom')
    return
  }
  let organisasi = 'Unit Kegiatan'
  if (newUser.value.role === 'admin') organisasi = 'Pusat (BPH)'
  else if (newUser.value.role === 'mahasiswa') organisasi = 'Mahasiswa'
  try {
    const { $db } = useNuxtApp()
    if ($db) {
      const { doc, setDoc, updateDoc } = await import('firebase/firestore')
      if (isEditMode.value && editingUserId.value) {
        await updateDoc(doc($db, 'users', editingUserId.value), {
          nama: newUser.value.name, email: newUser.value.email,
          password: newUser.value.password, role: newUser.value.role,
          prodi: organisasi, updatedAt: new Date().toISOString()
        })
        await logActivity(firebaseUser.value?.displayName || 'Admin', firebaseUser.value?.uid || '', 'mengedit profil pengguna', newUser.value.name)
        alert('Pengguna berhasil diperbarui!')
      } else {
        const config = useRuntimeConfig().public
        const firebaseConfig = {
          apiKey: config.firebaseApiKey, authDomain: config.firebaseAuthDomain,
          projectId: config.firebaseProjectId, storageBucket: config.firebaseStorageBucket,
          messagingSenderId: config.firebaseMessagingSenderId, appId: config.firebaseAppId
        }
        const { initializeApp } = await import('firebase/app')
        const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth')
        const secondaryApp = initializeApp(firebaseConfig, `SecondaryApp_${Date.now()}`)
        const secondaryAuth = getAuth(secondaryApp)
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newUser.value.email, newUser.value.password)
        const newId = userCredential.user.uid
        await secondaryAuth.signOut()
        await setDoc(doc($db, 'users', newId), {
          nama: newUser.value.name, email: newUser.value.email,
          password: newUser.value.password, role: newUser.value.role,
          prodi: organisasi, createdAt: new Date().toISOString()
        })
        await logActivity(firebaseUser.value?.displayName || 'Admin', firebaseUser.value?.uid || '', 'menambahkan pengguna baru', newUser.value.name)
        alert('Akun berhasil dibuat dan siap untuk login!')
      }
      fetchUsers()
    }
  } catch (error) { console.error('Error saving user:', error); alert('Terjadi kesalahan.') }
  closeModal()
}

const openEditModal = (user: any) => {
  isEditMode.value = true
  editingUserId.value = user.id
  newUser.value = { name: user.name, email: user.email, password: user.password, role: user.role.toLowerCase() }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  editingUserId.value = null
  newUser.value = { name: '', email: '', password: '', role: '' }
  showModalPassword.value = false
}

const deleteUser = async (user: any) => {
  if (confirm(`Apakah Anda yakin ingin menghapus akun ${user.name}?`)) {
    try {
      const { $db } = useNuxtApp()
      if ($db) {
        const { doc, deleteDoc } = await import('firebase/firestore')
        await deleteDoc(doc($db, 'users', user.id))
        users.value = users.value.filter(u => u.id !== user.id)
        await logActivity(firebaseUser.value?.displayName || 'Admin', firebaseUser.value?.uid || '', 'menghapus pengguna', user.name)
        alert('Pengguna berhasil dihapus.')
      }
    } catch (error) { console.error('Error deleting user:', error); alert('Gagal menghapus pengguna.') }
  }
}

// ==========================================
// STATE
// ==========================================
const profileOpen = ref(false)
const activeTab = ref('Dashboard')
const tabs = ['Dashboard', 'Konten', 'Pengguna', 'Proposal', 'Pengaturan']

const userRole = useState('userRole')
const firebaseUser = useState<any>('firebaseUser')

const userName = computed(() =>
  firebaseUser.value?.displayName || firebaseUser.value?.email?.split('@')[0] || 'Admin'
)

const initials = computed(() => {
  const name = userName.value as string
  return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
})

const roleLabel = computed(() => {
  const role = userRole.value
  if (role === 'super_admin') return 'Super Admin'
  if (role === 'admin') return 'Admin'
  return 'Pengurus'
})

// ==========================================
// WebAuthn Passkey Registration Logic
// ==========================================
const isRegisteringPasskey = ref(false)
const passkeyMessage = ref('')
const passkeyError = ref(false)

const registerPasskey = async () => {
  if (!firebaseUser.value?.uid || !firebaseUser.value?.email) {
    passkeyError.value = true
    passkeyMessage.value = 'Data user tidak lengkap.'
    return
  }
  isRegisteringPasskey.value = true
  passkeyMessage.value = ''
  passkeyError.value = false
  try {
    const response = await fetch('/api/webauthn/generate-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: firebaseUser.value.email, uid: firebaseUser.value.uid })
    })
    if (!response.ok) throw new Error('Gagal mendapatkan konfigurasi sidik jari dari server.')
    const options = await response.json()
    let attResp;
    try {
      attResp = await startRegistration(options)
    } catch (error: any) {
      if (error.name === 'NotAllowedError') throw new Error('Proses dibatalkan atau sensor sidik jari belum diatur.')
      throw error
    }
    const verificationResp = await fetch('/api/webauthn/verify-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: firebaseUser.value.uid, registrationResponse: attResp })
    })
    if (!verificationResp.ok) {
      const err = await verificationResp.json()
      throw new Error(err.message || 'Verifikasi server gagal.')
    }
    const verification = await verificationResp.json()
    if (verification.verified) {
      passkeyMessage.value = 'Hore! Perangkat ini berhasil didaftarkan.'
    } else {
      throw new Error('Server menolak pendaftaran.')
    }
  } catch (error: any) {
    console.error('Error registering passkey:', error)
    passkeyError.value = true
    passkeyMessage.value = error.message || 'Gagal mendaftarkan sidik jari.'
  } finally {
    isRegisteringPasskey.value = false
  }
}

// ==========================================
// Notepad Logic
// ==========================================
const adminNote = ref('')
const isSavingNote = ref(false)
const noteSaved = ref(false)
let saveTimeout: any = null

const fetchNote = async () => {
  try {
    const { $db } = useNuxtApp()
    if (!$db || !firebaseUser.value?.uid) return
    const { doc, getDoc } = await import('firebase/firestore')
    const docRef = doc($db, 'users', firebaseUser.value.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists() && docSnap.data().personalNote) {
      adminNote.value = docSnap.data().personalNote
    }
  } catch (e) { console.error('Error fetching note', e) }
}

const saveNoteToDb = async () => {
  if (!firebaseUser.value?.uid) return
  isSavingNote.value = true
  noteSaved.value = false
  try {
    const { $db } = useNuxtApp()
    const { doc, setDoc } = await import('firebase/firestore')
    const docRef = doc($db, 'users', firebaseUser.value.uid)
    await setDoc(docRef, { personalNote: adminNote.value }, { merge: true })
    noteSaved.value = true
    setTimeout(() => { noteSaved.value = false }, 2000)
  } catch (e) { console.error('Error saving note', e) }
  finally { isSavingNote.value = false }
}

const debouncedSaveNote = () => {
  if (saveTimeout) clearTimeout(saveTimeout)
  noteSaved.value = false
  saveTimeout = setTimeout(() => { saveNoteToDb() }, 1000)
}

// ==========================================
// Activity Logs
// ==========================================
const globalLogs = ref<any[]>([])

const formatTime = (isoString: string) => {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WIB'
}

const fetchLogs = async () => {
  try {
    const { $db } = useNuxtApp()
    if (!$db) return
    const { collection, getDocs } = await import('firebase/firestore')
    const snap = await getDocs(collection($db, 'activityLogs'))
    const allLogs = snap.docs.map(d => ({ id: d.id, ...d.data() as any }))
    allLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    globalLogs.value = allLogs.slice(0, 5)
  } catch (error) { console.error('Failed to fetch global logs', error) }
}

onMounted(() => {
  fetchNote()
  fetchLogs()
  if (userRole.value === 'super_admin') fetchUsers()
})

// ==========================================
// Logout
// ==========================================
const logout = async () => {
  try {
    const { $auth } = useNuxtApp()
    if ($auth) {
      const { signOut } = await import('firebase/auth')
      await signOut($auth)
    }
    navigateTo('/')
  } catch (error) { console.error('Logout error:', error) }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
</style>
