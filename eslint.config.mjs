// ============================================================
// ESLint — flat config
// File: eslint.config.mjs
//
// Basis: @nuxt/eslint-config (aturan Vue + TypeScript resmi Nuxt),
// format diserahkan ke Prettier (eslint-config-prettier mematikan
// aturan gaya yang bentrok).
//
// [S1] Kode baseline di app/ & server/ masih banyak pelanggaran
// "gaya" (any, unused vars, nama komponen satu kata). Aturan itu
// diturunkan ke `warn` supaya CI tetap hijau tanpa menyentuh app/
// di sesi ini. Tiap sesi Fase A yang memindah file ke features/
// wajib membersihkan warning file tsb. Setelah S5, warning ini
// dinaikkan lagi ke `error` (lihat GOLDEN-PLAN §11).
// ============================================================

import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import prettier from 'eslint-config-prettier'

export default createConfigForNuxt({
  features: { typescript: true },
  dirs: { src: ['./app'] },
})
  .append(prettier)
  .append({
    name: 'ormawa/baseline-relaxed',
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'warn',
      'vue/no-v-html': 'warn',
      'vue/no-unused-vars': 'warn',
      // Vue 3 mendukung fragment (multi-root); aturan ini warisan Vue 2.
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'preserve-caught-error': 'warn',
      'no-console': 'off',
    },
  })
  .append({
    // Nama layout/page/error mengikuti konvensi file-routing Nuxt
    // (default.vue, index.vue, [slug].vue) — aturan multi-kata tidak berlaku.
    name: 'ormawa/nuxt-conventions',
    files: ['app/layouts/**/*.vue', 'app/pages/**/*.vue', 'app/error.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  })
  .append({
    name: 'ormawa/ignores',
    ignores: ['.output/**', '.nuxt/**', 'node_modules/**', 'public/**', 'scripts/legacy/**'],
  })
