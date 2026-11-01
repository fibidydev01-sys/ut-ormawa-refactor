<!--
  KONTAK ASPIRASI CONTACT — kontak & media sosial humas + info penanganan
  File: app/features/kontak/kontak-aspirasi-contact.vue
-->

<template>
  <section class="grid md:grid-cols-2 gap-8 mb-16">
    <!-- Hubungi Kami -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">HUBUNGI KAMI</h3>
      <div class="space-y-4">
        <a
          href="https://wa.me/628138907664"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
        >
          <div class="text-2xl">💬</div>
          <div>
            <p class="font-semibold text-gray-800">Chat WhatsApp</p>
            <p class="text-green-600">+62 813-8907-664</p>
          </div>
        </a>
        <a
          href="mailto:ormawautsurabaya@gmail.com"
          class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
        >
          <div class="text-2xl">✉️</div>
          <div>
            <p class="font-semibold text-gray-800">Email Resmi</p>
            <p class="text-blue-600">ormawautsurabaya@gmail.com</p>
          </div>
        </a>
      </div>
    </div>

    <!-- Ikuti Kami -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">IKUTI KAMI</h3>
      <div class="flex flex-col gap-4">
        <a
          href="https://www.instagram.com/ormawa.utsurabaya/?hl=id"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:from-pink-100 hover:to-purple-100 transition"
        >
          <div class="text-2xl">📷</div>
          <div>
            <p class="font-semibold text-gray-800">Instagram</p>
            <p class="text-purple-600 text-sm">@ormawa.utsurabaya</p>
          </div>
        </a>
        <a
          href="https://ormawa-utsurabaya.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
        >
          <div class="text-2xl">🌐</div>
          <div>
            <p class="font-semibold text-gray-800">Website Resmi</p>
            <p class="text-indigo-600 text-sm">ormawa-utsurabaya.web.app</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Info Section -->
  <section class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
    <h3 class="text-2xl font-bold text-gray-800 mb-3">Ormawa UT Surabaya</h3>
    <p class="text-gray-600 text-lg mb-4">
      Wadah resmi aspirasi, kreasi, dan kolaborasi mahasiswa Universitas Terbuka Surabaya.
    </p>
    <p class="text-blue-600 font-semibold">Bersinergi membangun prestasi.</p>
  </section>
</template>
