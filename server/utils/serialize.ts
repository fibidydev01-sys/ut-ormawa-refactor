// ============================================================
// Serialisasi data Firestore untuk respons JSON (SSR payload)
// File: server/utils/serialize.ts
// ============================================================

/** Timestamp Firestore / Date / string → ISO string (atau null). */
export function toIsoString(value: unknown): string | null {
  if (!value) return null
  const maybeTimestamp = value as { toDate?: () => Date }
  if (typeof maybeTimestamp.toDate === 'function') return maybeTimestamp.toDate().toISOString()
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string') return value
  return null
}
