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
          mengembangkan minat, bakat, potensi diri, serta jiwa kepemimpinan — menjadi
          jembatan aspirasi antara mahasiswa dengan birokrasi kampus.
        </p>
      </div>

      <!-- Quote -->
      <div class="quote-block">
        <span class="quote-mark">"</span>
        <p class="quote-text">
          Bersinergi, berkolaborasi, dan berinovasi untuk mewujudkan iklim kemahasiswaan
          UT Surabaya yang prestatif, inklusif, dan berdampak nyata bagi masyarakat.
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
          <p class="card-desc">Menampung kritik, masukan, dan solusi atas kendala akademik maupun fasilitas mahasiswa.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🎓</div>
          <h4 class="card-title">Pengembangan Soft Skills</h4>
          <p class="card-desc">Menyelenggarakan LDKM, seminar kepemimpinan, workshop, dan pelatihan organisasi.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🤝</div>
          <h4 class="card-title">Aksi Sosial Kemasyarakatan</h4>
          <p class="card-desc">Tanggap bencana, bakti sosial desa binaan, dan program pemberdayaan masyarakat.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">✨</div>
          <h4 class="card-title">Sinergi Kreativitas</h4>
          <p class="card-desc">Mendukung perlombaan minat bakat, bazar kewirausahaan (Market), dan kompetisi olahraga.</p>
        </div>
      </div>

      <!-- Footer stamp -->
      <div class="page-footer">
        <span>Terakhir diperbarui: Juni 2026</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Tentang Ormawa',
  ogTitle: 'Tentang Organisasi Mahasiswa UT Surabaya',
  description: 'Mengenal peranan, fungsi, struktur, dan komitmen Organisasi Kemahasiswaan (Ormawa) Universitas Terbuka Surabaya dalam memfasilitasi minat, bakat, dan prestasi.',
  ogDescription: 'Mengenal peranan, fungsi, struktur, dan komitmen Organisasi Kemahasiswaan (Ormawa) Universitas Terbuka Surabaya dalam memfasilitasi minat, bakat, dan prestasi.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>

<style scoped>
.hero-banner {
  position: relative;
  /* Full-bleed: keluar dari semua container hingga ke tepi viewport */
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  height: 70vh;
  min-height: 420px;
  max-height: 600px;
  margin-bottom: 0;
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
  background-position: center 30%;
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
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-shadow: 0 3px 24px rgba(0, 0, 0, 0.7);
  line-height: 1.1;
  animation: fadeUp 0.8s ease both;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4rem;
  }
}

.hero-subtitle {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.55);
  animation: fadeUp 0.8s 0.18s ease both;
}

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

<style scoped>
/* ── Content Section ─────────────────────────────── */
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

/* ── Intro Block ─────────────────────────────── */
.intro-block {
  margin-bottom: 2.5rem;
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.85;
  color: #475569;
  font-weight: 400;
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
  font-size: 0.72rem;
  color: #cbd5e1;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

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
