// ============================================================
// Warna aksen bidang di bagan struktur pengurus
// File: app/features/pengurus/pengurus-colors.ts
//
// `bidang.color` disimpan sebagai kelas Tailwind (mis. 'bg-blue-400');
// fungsi di sini memetakannya ke garis, cincin foto, dan teks aksen.
// ============================================================

const colorLineMap: Record<string, string> = {
  'bg-blue-400': 'bg-gradient-to-r from-transparent via-blue-300 to-transparent',
  'bg-purple-400': 'bg-gradient-to-r from-transparent via-purple-300 to-transparent',
  'bg-emerald-400': 'bg-gradient-to-r from-transparent via-emerald-300 to-transparent',
  'bg-amber-400': 'bg-gradient-to-r from-transparent via-amber-300 to-transparent',
  'bg-rose-400': 'bg-gradient-to-r from-transparent via-rose-300 to-transparent',
  'bg-cyan-400': 'bg-gradient-to-r from-transparent via-cyan-300 to-transparent',
}
const colorRingMap: Record<string, string> = {
  'bg-blue-400': 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  'bg-purple-400': 'linear-gradient(135deg, #a855f7, #c084fc)',
  'bg-emerald-400': 'linear-gradient(135deg, #10b981, #34d399)',
  'bg-amber-400': 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  'bg-rose-400': 'linear-gradient(135deg, #f43f5e, #fb7185)',
  'bg-cyan-400': 'linear-gradient(135deg, #06b6d4, #22d3ee)',
}
const colorTextMap: Record<string, string> = {
  'bg-blue-400': 'text-blue-500',
  'bg-purple-400': 'text-purple-500',
  'bg-emerald-400': 'text-emerald-500',
  'bg-amber-400': 'text-amber-500',
  'bg-rose-400': 'text-rose-500',
  'bg-cyan-400': 'text-cyan-500',
}
export const getLineClass = (color: string) =>
  colorLineMap[color] || 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'
export const getRingStyle = (color: string) => ({
  background: colorRingMap[color] || 'linear-gradient(135deg, #3b82f6, #60a5fa)',
})
export const getAccentTextClass = (color: string) => colorTextMap[color] || 'text-blue-500'
