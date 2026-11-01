<!--
  PROFIL TENTANG UT — banner foto + profil Universitas Terbuka Surabaya
  File: app/features/profil/profil-tentang-ut.vue
-->

<template>
  <div>
    <!-- Hero Banner: Full-bleed background photo -->
    <div class="hero-banner">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">TENTANG UT SURABAYA</h1>
        <p class="hero-subtitle">
          Mengenal Universitas Terbuka — Pelopor Pendidikan Jarak Jauh Indonesia
        </p>
      </div>
    </div>

    <!-- Page Content -->
    <div class="content-section">
      <!-- Intro -->
      <div class="intro-block">
        <p class="intro-text">
          <span class="intro-highlight">Universitas Terbuka Surabaya (UT Surabaya)</span>
          adalah Perguruan Tinggi Negeri ke-45 di Indonesia yang menerapkan sistem pendidikan
          terbuka dan jarak jauh (PTJJ) — terbukti efektif meningkatkan pemerataan kesempatan
          pendidikan berkualitas bagi seluruh warga Indonesia.
        </p>
      </div>

      <!-- Quote -->
      <div class="quote-block">
        <span class="quote-mark">"</span>
        <p class="quote-text">
          Pendidikan tinggi berkualitas yang dapat diakses oleh siapa saja, di mana saja, dan kapan
          saja — tanpa batas usia, jarak, maupun waktu.
        </p>
      </div>

      <!-- Divider -->
      <div class="section-divider">
        <span class="divider-label">Keunggulan Sistem UT</span>
      </div>

      <!-- Feature Cards -->
      <div class="cards-grid">
        <div class="feature-card">
          <div class="card-icon">🎓</div>
          <h4 class="card-title">Pendidikan Terbuka</h4>
          <p class="card-desc">
            Masuk tanpa batasan tahun kelulusan, usia, maupun jangka waktu penyelesaian studi.
          </p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🌐</div>
          <h4 class="card-title">Pembelajaran Jarak Jauh</h4>
          <p class="card-desc">
            Didukung Tutorial Online (Tuton) dan Tutorial Tatap Muka (TTM) yang fleksibel.
          </p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🏆</div>
          <h4 class="card-title">Akreditasi Nasional</h4>
          <p class="card-desc">
            Program studi terakreditasi BAN-PT dengan standar kualitas pendidikan tinggi terjamin.
          </p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🤝</div>
          <h4 class="card-title">Pelayanan Prima</h4>
          <p class="card-desc">
            Komitmen UPBJJ Surabaya memberikan layanan terbaik bagi mahasiswa di seluruh wilayah
            Jawa Timur.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="page-footer">
        <div class="footer-inner">
          <span>Terakhir diperbarui: Juni 2026</span>
          <a
            href="https://surabaya.ut.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="site-link"
          >
            Kunjungi Website Resmi UT Surabaya
            <svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./profil-tentang-ut.css"></style>
