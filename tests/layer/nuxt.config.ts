// ============================================================
// TEST LAYER — hanya aktif saat ORMAWA_TEST=1 (`npm run build:test`)
// File: tests/layer/nuxt.config.ts
//
// Di-extend oleh nuxt.config.ts root bila env ORMAWA_TEST=1.
// Build produksi (`npm run build`) TIDAK memuat layer ini.
// ============================================================
export default defineNuxtConfig({})
