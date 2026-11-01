<template>
  <div>
    <!-- Hero Banner: Full-bleed background photo -->
    <div class="hero-banner">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">TENTANG UT SURABAYA</h1>
        <p class="hero-subtitle">Mengenal Universitas Terbuka — Pelopor Pendidikan Jarak Jauh Indonesia</p>
      </div>
    </div>

    <!-- Page Content -->
    <div class="content-section">

      <!-- Intro -->
      <div class="intro-block">
        <p class="intro-text">
          <span class="intro-highlight">Universitas Terbuka Surabaya (UT Surabaya)</span>
          adalah Perguruan Tinggi Negeri ke-45 di Indonesia yang menerapkan sistem pendidikan
          terbuka dan jarak jauh (PTJJ) — terbukti efektif meningkatkan pemerataan
          kesempatan pendidikan berkualitas bagi seluruh warga Indonesia.
        </p>
      </div>

      <!-- Quote -->
      <div class="quote-block">
        <span class="quote-mark">"</span>
        <p class="quote-text">
          Pendidikan tinggi berkualitas yang dapat diakses oleh siapa saja, di mana saja,
          dan kapan saja — tanpa batas usia, jarak, maupun waktu.
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
          <p class="card-desc">Masuk tanpa batasan tahun kelulusan, usia, maupun jangka waktu penyelesaian studi.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🌐</div>
          <h4 class="card-title">Pembelajaran Jarak Jauh</h4>
          <p class="card-desc">Didukung Tutorial Online (Tuton) dan Tutorial Tatap Muka (TTM) yang fleksibel.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🏆</div>
          <h4 class="card-title">Akreditasi Nasional</h4>
          <p class="card-desc">Program studi terakreditasi BAN-PT dengan standar kualitas pendidikan tinggi terjamin.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🤝</div>
          <h4 class="card-title">Pelayanan Prima</h4>
          <p class="card-desc">Komitmen UPBJJ Surabaya memberikan layanan terbaik bagi mahasiswa di seluruh wilayah Jawa Timur.</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="page-footer">
        <div class="footer-inner">
          <span>Terakhir diperbarui: Juni 2026</span>
          <a href="https://surabaya.ut.ac.id/" target="_blank" rel="noopener noreferrer" class="site-link">
            Kunjungi Website Resmi UT Surabaya
            <svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Tentang UT Surabaya',
  ogTitle: 'Tentang Universitas Terbuka Surabaya',
  description: 'Mengenal Universitas Terbuka Surabaya (UT Surabaya), pelopor sistem pendidikan tinggi terbuka dan jarak jauh (PTJJ) berkualitas di Indonesia.',
  ogDescription: 'Mengenal Universitas Terbuka Surabaya (UT Surabaya), pelopor sistem pendidikan tinggi terbuka dan jarak jauh (PTJJ) berkualitas di Indonesia.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>

<style scoped>
/* ── Hero Banner ─────────────────────────────── */
.hero-banner {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  height: 70vh;
  min-height: 420px;
  max-height: 600px;
  margin-top: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/img/background-landingpage.png');
  background-size: cover;
  background-position: center 40%;
  transform: scale(1.04);
  transition: transform 10s ease;
}

.hero-banner:hover .hero-bg {
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.50) 50%,
    rgba(0, 0, 0, 0.72) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  padding: 0 2rem;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-shadow: 0 3px 24px rgba(0, 0, 0, 0.7);
  line-height: 1.1;
  animation: fadeUp 0.8s ease both;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

.hero-subtitle {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.55);
  animation: fadeUp 0.8s 0.18s ease both;
}

/* ── Content Section ─────────────────────────── */
.content-section {
  padding: 3rem 3rem 3.5rem;
  max-width: 860px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content-section {
    padding: 2rem 1.5rem 2.5rem;
  }
}

/* ── Intro ───────────────────────────────────── */
.intro-block {
  margin-bottom: 2.5rem;
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.85;
  color: #475569;
}

.intro-highlight {
  font-weight: 700;
  color: #1e293b;
}

/* ── Quote ───────────────────────────────────── */
.quote-block {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  padding: 2rem 2.5rem 2rem 3.5rem;
  margin-bottom: 3rem;
  border: 1px solid #e2e8f0;
}

.quote-mark {
  position: absolute;
  top: 0.25rem;
  left: 1.25rem;
  font-size: 4rem;
  line-height: 1;
  color: #cbd5e1;
  font-family: Georgia, serif;
  font-weight: 900;
  pointer-events: none;
  user-select: none;
}

.quote-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #334155;
  font-style: italic;
  font-weight: 500;
  margin: 0;
}

/* ── Section Divider ─────────────────────────── */
.section-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.divider-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #94a3b8;
  white-space: nowrap;
}

/* ── Feature Cards ───────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 0.875rem;
  padding: 1.5rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.feature-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
  transform: translateY(-2px);
  border-color: #e2e8f0;
}

.card-icon {
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
  display: block;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.4rem;
}

.card-desc {
  font-size: 0.82rem;
  line-height: 1.65;
  color: #94a3b8;
  margin: 0;
}

/* ── Page Footer ─────────────────────────────── */
.page-footer {
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.footer-inner > span {
  font-size: 0.72rem;
  color: #cbd5e1;
  font-weight: 500;
}

.site-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #1e40af;
  text-decoration: none;
  transition: color 0.2s;
}

.site-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.link-icon {
  width: 0.9rem;
  height: 0.9rem;
}

/* ── Animation ───────────────────────────────── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
