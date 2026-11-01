<!--
  LANDING WELCOME — sambutan Direktur UT Surabaya
  File: app/features/landing/landing-welcome.vue
-->

<template>
  <section class="max-w-5xl mx-auto px-6 md:px-12 py-16 mb-8">
    <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
      <!-- Photo Column -->
      <div class="flex-shrink-0 relative group">
        <!-- Yellow Glow / Drop Shadow -->
        <div
          class="absolute -inset-2 bg-lemon opacity-40 blur-xl rounded-3xl transition-opacity group-hover:opacity-60"
        ></div>
        <div
          class="relative w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200"
        >
          <!-- Replace this src with the actual image of the director -->
          <img
            :src="'/img/direktur.png'"
            alt="Prof. Dr. Suparti, M.Pd"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Text Column -->
      <div class="flex-1 space-y-6">
        <div>
          <h4 class="text-admiral font-bold tracking-widest text-xs lg:text-sm uppercase mb-2">
            Sambutan Ibu Direktur
          </h4>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Bersama Membangun Kualitas Mahasiswa
          </h2>
        </div>

        <div class="border-l-4 border-lemon pl-6 py-2 my-8">
          <p class="text-slate-600 text-lg md:text-xl italic leading-relaxed">
            "Universitas Terbuka Surabaya mendukung penuh keberadaan Ormawa sebagai sarana
            pengembangan kreativitas dan kepemimpinan. Organisasi ini dibentuk dari mahasiswa, oleh
            mahasiswa, dan untuk mahasiswa. Teruslah berkarya untuk almamater dan bangsa."
          </p>
        </div>

        <div>
          <p class="text-admiral font-bold text-lg">Prof. Dr. Suparti, M.Pd</p>
          <p class="text-slate-500 text-sm">Direktur Universitas Terbuka Surabaya</p>
        </div>
      </div>
    </div>
  </section>
</template>
