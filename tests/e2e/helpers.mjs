// ============================================================
// Helper E2E — seed data & aksi umum
// File: tests/e2e/helpers.mjs
// ============================================================

export const PASSWORD = 'rahasia-123'

/** Buat akun di Auth Emulator + dokumen users/{uid}. */
export async function seedUser(admin, { email, role, fullName, accessModules = [], extra = {} }) {
  const user = await admin.auth.createUser({ email, password: PASSWORD, displayName: fullName })
  if (role) {
    await admin.db.doc(`users/${user.uid}`).set({
      id: user.uid,
      email,
      full_name: fullName,
      role,
      organization_id: null,
      access_modules: accessModules,
      ...extra,
    })
  }
  return user.uid
}

export async function seedOrganization(admin, id, data) {
  await admin.db.doc(`organizations/${id}`).set({ id, description: '', logo_url: '', ...data })
}

/** Login lewat form /login/admin (email + password). */
export async function loginAdmin(page, BASE_URL, email) {
  await page.goto(`${BASE_URL}/login/admin`, { waitUntil: 'load' })
  await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__)
  await page.fill('input[type="email"]', email)
  await page
    .locator('form')
    .first()
    .locator('input[type="password"], input[type="text"]')
    .last()
    .fill(PASSWORD)
  await page.locator('form').first().locator('button[type="submit"]').click()
}

/** Tunggu sampai kondisi async terpenuhi (polling). */
export async function eventually(fn, message, timeoutMs = 10_000) {
  const start = Date.now()
  let last
  while (Date.now() - start < timeoutMs) {
    try {
      const v = await fn()
      if (v) return v
    } catch (e) {
      last = e
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`${message}${last ? ` (${last.message})` : ''}`)
}

export function assert(cond, message) {
  if (!cond) throw new Error(message)
}
