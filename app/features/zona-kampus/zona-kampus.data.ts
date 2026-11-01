// ============================================================
// Konten statis fitur zona-kampus
// File: app/features/zona-kampus/zona-kampus.data.ts
// Disalin apa adanya dari halaman lama (S4).
// ============================================================

export const AKADEMIK_LIST = [
  {
    id: 1,
    title: 'Seminar Nasional: Membangun Pola Pikir Kritis di Era AI',
    description:
      'Pelajari bagaimana mengasah kemampuan analisis dan berpikir kritis di tengah gempuran informasi dan kecerdasan buatan.',
    type: 'Seminar',
    date: '12 Juli 2026, 09:00 WIB',
    location: 'Aula Utama & Zoom Meeting',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Workshop Penulisan Karya Tulis Ilmiah Tembus Jurnal Terindeks',
    description:
      'Pelatihan intensif 2 hari untuk mahasiswa akhir yang sedang menyusun skripsi atau artikel publikasi ilmiah.',
    type: 'Workshop',
    date: '20-21 Agustus 2026',
    location: 'Lab Komputer Lt. 3',
    image:
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Kuliah Tamu Pakar Hukum Tata Negara dari Universitas Ternama',
    description:
      'Diskusi interaktif mengupas tuntas amandemen konstitusi bersama narasumber ahli tingkat nasional.',
    type: 'Kuliah Tamu',
    date: '05 September 2026',
    location: 'Teater Ruang 201',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
]

export const NON_AKADEMIK_LIST = [
  {
    id: 1,
    title: 'Liga Futsal Rektor Cup 2026',
    description:
      'Ajang pertandingan futsal antar jurusan terbesar tahun ini. Segera daftarkan tim kebanggaanmu!',
    type: 'Olahraga',
    date: 'Bulan Agustus',
    image:
      'https://images.unsplash.com/photo-1518605368461-1ee7a300d810?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Pentas Seni "Harmoni Budaya Nusantara"',
    description:
      'Malam keakraban dengan pertunjukan tari tradisional, musik indie, dan teater dari mahasiswa untuk mahasiswa.',
    type: 'Kesenian',
    date: 'Akhir Oktober',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Bakti Sosial & Penghijauan Gunung Penanggungan',
    description:
      'Kegiatan mendaki gunung sekaligus penanaman bibit pohon bersama organisasi pencinta alam.',
    type: 'Sosial & Alam',
    date: 'Pertengahan November',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Turnamen E-Sports Mobile Legends Campus Championship',
    description: 'Buktikan ketangkasan strategimu di turnamen E-Sports yang sangat dinantikan.',
    type: 'E-Sports',
    date: 'Minggu Pertama Desember',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
]

export const UKM_LIST = [
  { id: 'olahraga', nama: 'UKM Olahraga', kategori: 'Futsal, Basket, Voli', icon: '⚽' },
  { id: 'seni', nama: 'UKM Seni & Budaya', kategori: 'Tari, Paduan Suara, Teater', icon: '🎭' },
  {
    id: 'jurnalistik',
    nama: 'LPM (Pers Mahasiswa)',
    kategori: 'Jurnalistik, Fotografi',
    icon: '📸',
  },
  { id: 'kerohanian', nama: 'UKM Kerohanian', kategori: 'Kajian, Sosial', icon: '🕌' },
  { id: 'mapala', nama: 'Mahasiswa Pecinta Alam', kategori: 'Ekspedisi, Konservasi', icon: '🏕️' },
  { id: 'penalaran', nama: 'UKM Penalaran & Riset', kategori: 'Debat, Karya Tulis', icon: '💡' },
]

export const HIMA_LIST = [
  { id: 'hima-manajemen', nama: 'HIMA Manajemen' },
  { id: 'hima-akuntansi', nama: 'HIMA Akuntansi' },
  { id: 'hima-sistem-informasi', nama: 'HIMA Sistem Informasi' },
  { id: 'hima-ilmu-hukum', nama: 'HIMA Ilmu Hukum' },
  { id: 'hima-ilmu-komunikasi', nama: 'HIMA Ilmu Komunikasi' },
]

// Mock Data: Papan Kolaborasi
export const CARI_TEMAN_FEED = [
  {
    id: 1,
    nama: 'Diana Putri',
    jurusan: 'Sistem Informasi',
    waktuLalu: '2 jam yang lalu',
    kategori: 'Tim Lomba',
    pesan:
      'Halo teman-teman! Saya (UI/UX) lagi cari 2 orang Programmer (Frontend & Backend) untuk ikut lomba Gemastik bulan depan. Kalau ada yang minat dan serius pengen juara, DM ya! Nanti kita ngopi sambil bahas ide aplikasinya.',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    nama: 'Rina Wijaya',
    jurusan: 'Akuntansi',
    waktuLalu: '5 jam yang lalu',
    kategori: 'Teman Belajar',
    pesan:
      'Ada anak Maba Akuntansi yang domisili Surabaya Pusat/Barat? Mau bikin grup belajar bareng buat persiapan UTS Pengantar Akuntansi. Lebih enak belajar offline sih di cafe biar nyambung.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    nama: 'Andi Pratama',
    jurusan: 'Ilmu Hukum',
    waktuLalu: 'Kemarin',
    kategori: 'Proyek Kelompok',
    pesan:
      'Butuh 1 orang lagi untuk kelompok tugas Hukum Tata Negara kelas B. Topik kita tentang Otonomi Daerah. Syaratnya: no free rider ya, harus mau bagi tugas dan diskusi aktif.',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export interface MahasiswaProfile {
  id: number
  nama: string
  jurusan: string
  semester: number
  isMaba: boolean
  bio: string
  hobi: string[]
  avatar: string
}

/** Profil contoh di tab Jejaring (Cari Teman). */
export const MAHASISWA_PROFILES: MahasiswaProfile[] = [
  {
    id: 1,
    nama: 'Budi Santoso',
    jurusan: 'Sistem Informasi',
    semester: 1,
    isMaba: true,
    bio: 'Haloo! Maba baru di SI nih. Kalau ada tugas ngoding bareng boleh banget ajak-ajak ya!',
    hobi: ['💻 Coding', '🎮 Valorant', '☕ Kopi'],
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    nama: 'Siti Rahmawati',
    jurusan: 'Manajemen',
    semester: 1,
    isMaba: true,
    bio: "Suka baca buku bisnis dan diskusi tentang marketing. Let's connect!",
    hobi: ['📚 Membaca', '💡 Bisnis', '📸 Fotografi'],
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    nama: 'Andi Pratama',
    jurusan: 'Ilmu Hukum',
    semester: 3,
    isMaba: false,
    bio: 'Ketua UKM Debat. Suka diskusi isu terkini. Feel free untuk tanya-tanya seputar kampus.',
    hobi: ['⚖️ Debat', '⚽ Futsal', '📰 Berita'],
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    nama: 'Rina Wijaya',
    jurusan: 'Akuntansi',
    semester: 1,
    isMaba: true,
    bio: 'Cari teman belajar Pengantar Akuntansi. Jujur masih sering bingung sama jurnal haha.',
    hobi: ['🎵 Musik', '🎬 Nonton Film', '🍲 Kuliner'],
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    nama: 'Kevin Anugrah',
    jurusan: 'Ilmu Komunikasi',
    semester: 5,
    isMaba: false,
    bio: 'Freelance Videographer. Open kolaborasi buat bikin konten atau film pendek.',
    hobi: ['🎥 Videografi', '✈️ Traveling', '🎸 Gitar'],
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    nama: 'Diana Putri',
    jurusan: 'Sistem Informasi',
    semester: 1,
    isMaba: true,
    bio: 'UI/UX Enthusiast! Pengen ikut lomba desain aplikasi, yang jago ngoding ayo bikin tim.',
    hobi: ['🎨 Desain', '📱 UI/UX', '🏸 Badminton'],
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
