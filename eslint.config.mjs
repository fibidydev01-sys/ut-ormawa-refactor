// ============================================================
// ESLint — flat config
// File: eslint.config.mjs
//
// Basis: @nuxt/eslint-config (aturan Vue + TypeScript resmi Nuxt),
// format diserahkan ke Prettier (eslint-config-prettier mematikan
// aturan gaya yang bentrok).
//
// [S1] Aturan gaya sempat diturunkan ke `warn` untuk kode baseline.
// [S5] app/ sudah bersih → kembali `error`; sisa pelonggaran hanya
// server/ & plugin analytics (lihat blok ormawa/baseline-relaxed).
// ============================================================

import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import prettier from 'eslint-config-prettier'

export default createConfigForNuxt({
  features: { typescript: true },
  dirs: { src: ['./app'] },
})
  .append(prettier)
  .append({
    // [S5] Fase A selesai: app/ kembali ke aturan penuh (error).
    // Pelonggaran tersisa HANYA untuk file yang belum direfactor:
    // server/ (dikerjakan bersama session cookie & requireRole di S7)
    // dan plugin analytics (dikerjakan bersama cookie consent di S8).
    name: 'ormawa/baseline-relaxed',
    files: ['server/**', 'app/plugins/analytics.client.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  })
  .append({
    name: 'ormawa/project',
    rules: {
      'no-console': 'off',
      // Vue 3 mendukung fragment (multi-root & <slot> di root); aturan ini warisan Vue 2.
      'vue/no-multiple-template-root': 'off',
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
