<!--
  PROFIL TENTANG ORMAWA
  File: app/features/profil/profil-tentang-ormawa.vue
-->

<template>
  <div>
    <!-- Hero Banner: Break out of parent card with negative margins -->
    <div class="hero-banner">
      <!-- Background Image -->
      <div class="hero-bg"></div>
      <!-- Dark Overlay -->
      <div class="hero-overlay"></div>
      <!-- Content -->
      <div class="hero-content">
        <h1 class="hero-title">TENTANG ORMAWA</h1>
        <p class="hero-subtitle">Mengenal Lebih Dekat Organisasi Mahasiswa UT Surabaya</p>
      </div>
    </div>

    <!-- Page Content -->
    <div class="content-section">
      <!-- Intro -->
      <div class="intro-block">
        <p class="intro-text">
          <span class="intro-highlight">Organisasi Kemahasiswaan (Ormawa) UT Surabaya</span>
          merupakan wadah resmi bagi seluruh mahasiswa Universitas Terbuka Surabaya untuk
          mengembangkan minat, bakat, potensi diri, serta jiwa kepemimpinan — menjadi jembatan
          aspirasi antara mahasiswa dengan birokrasi kampus.
        </p>
      </div>

      <!-- Quote -->
      <div class="quote-block">
        <span class="quote-mark">"</span>
        <p class="quote-text">
          Bersinergi, berkolaborasi, dan berinovasi untuk mewujudkan iklim kemahasiswaan UT Surabaya
          yang prestatif, inklusif, dan berdampak nyata bagi masyarakat.
        </p>
      </div>

      <!-- Divider -->
      <div class="section-divider">
        <span class="divider-label">Fungsi & Peran Utama</span>
      </div>

      <!-- Feature Cards -->
      <div class="cards-grid">
        <div class="feature-card">
          <div class="card-icon">📢</div>
          <h4 class="card-title">Penyalur Aspirasi</h4>
          <p class="card-desc">
            Menampung kritik, masukan, dan solusi atas kendala akademik maupun fasilitas mahasiswa.
          </p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🎓</div>
          <h4 class="card-title">Pengembangan Soft Skills</h4>
          <p class="card-desc">
            Menyelenggarakan LDKM, seminar kepemimpinan, workshop, dan pelatihan organisasi.
          </p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🤝</div>
          <h4 class="card-title">Aksi Sosial Kemasyarakatan</h4>
          <p class="card-desc">
            Tanggap bencana, bakti sosial desa binaan, dan program pemberdayaan masyarakat.
          </p>
        </div>
        <div class="feature-card">
          <div class="card-icon">✨</div>
          <h4 class="card-title">Sinergi Kreativitas</h4>
          <p class="card-desc">
            Mendukung perlombaan minat bakat, bazar kewirausahaan (Market), dan kompetisi olahraga.
          </p>
        </div>
      </div>

      <!-- Footer stamp -->
      <div class="page-footer">
        <span>Terakhir diperbarui: Juni 2026</span>
      </div>
    </div>
  </div>
</template>

<style scoped src="./profil-tentang-ormawa.css"></style>
