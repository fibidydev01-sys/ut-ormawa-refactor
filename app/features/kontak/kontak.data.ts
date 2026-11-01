// ============================================================
// Konten statis fitur kontak
// File: app/features/kontak/kontak.data.ts
// Disalin apa adanya dari halaman lama (S4).
// ============================================================

export const PRODI_WA_LIST = [
  {
    nama: 'FST',
    fakultas: 'Fakultas Sains dan Teknologi',
    icon: '📊',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/DHnkxi3iMmBCzstMq3htTW',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  {
    nama: 'FHISIP',
    fakultas: 'Fakultas Hukum, Ilmu Sosial dan Ilmu Politik',
    icon: '🧾',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/LjOHwEzX4HjIkMCMvvo5j4',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  {
    nama: 'SVOKASI',
    fakultas: 'Sekolah Vokasi',
    icon: '⚖️',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/D6DT0bdfWIn1tcJgalfCqV',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  {
    nama: 'FEB',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    icon: '📡',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/IVDnibO4Pjs0htkBjY82Qz',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  {
    nama: 'FKIP',
    fakultas: 'Fakultas Keguruan dan Ilmu Pendidikan',
    icon: '🏛️',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/GRmXMS28vtL17NkyaoBWTX',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
]

export const ASPIRASI_KATEGORI = [
  { value: 'aspirasi', label: 'Aspirasi', icon: '📢' },
  { value: 'kritik-saran', label: 'Kritik Saran', icon: '💡' },
  { value: 'laporan', label: 'Laporan', icon: '⚠️' },
  { value: 'pertanyaan', label: 'Pertanyaan', icon: '❓' },
]

export const PELAPORAN_KATEGORI = [
  { value: 'pelanggaran', label: 'Pelanggaran Etika', icon: '🚨' },
  { value: 'fasilitas', label: 'Masalah Fasilitas', icon: '🏢' },
  { value: 'kegiatan', label: 'Kendala Kegiatan', icon: '📅' },
  { value: 'bullying', label: 'Perundungan/Bullying', icon: '🛑' },
  { value: 'lainnya', label: 'Lain-lain', icon: '📝' },
]
