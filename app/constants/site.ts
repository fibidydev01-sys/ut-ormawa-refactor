// ============================================================
// INFO SITUS (footer & kontak umum)
// File: app/constants/site.ts
//
// Disalin apa adanya dari Footer.vue lama — termasuk tautan footer
// yang semuanya masih mengarah ke "/" dan ikon sosial ber-href "#".
// ============================================================

export const SITE_ADDRESS_LINES = [
  'Jalan Dr. Ir. H. Soekarno No. 567 (MERR), Rungkut',
  'Surabaya, Jawa Timur',
  'Telp : 031-35929999',
]

export const SITE_HALLO_UT = {
  phone: 'Hallo-UT 1500024',
  web: 'hallo-ut.ut.ac.id',
  whatsappUrl: 'https://wa.me/1500024',
}

/** Kolom tautan di footer (kiri → kanan). */
export const FOOTER_LINK_COLUMNS: { label: string; to: string }[][] = [
  [
    { label: 'STAFF', to: '/' },
    { label: 'WEBMAIL', to: '/' },
    { label: 'PD-DIKTI', to: '/' },
  ],
  [
    { label: 'DIKTI', to: '/' },
    { label: 'KEMDIKTISAINTEK', to: '/' },
    { label: 'KOMDIGI', to: '/' },
  ],
  [
    { label: 'AAOU', to: '/' },
    { label: 'ICDE', to: '/' },
    { label: 'OEC', to: '/' },
  ],
]
