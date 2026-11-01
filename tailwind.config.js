/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Biru Admiral (Navy Gelap Elegan)
        admiral: {
          light: '#2A4365', 
          DEFAULT: '#1B365D', 
          dark: '#112240', 
        },
        // Kuning Lemon (Cerah & Enerjik)
        lemon: {
          light: '#FEF08A', 
          DEFAULT: '#FDE047', 
          dark: '#EAB308', 
        },
        // Admin & Gamification Theme Colors
        admin: {
          bg: '#f8fafc',        // slate-50 (Latar belakang utama)
          card: '#ffffff',      // Putih (Latar kartu)
          cardHover: '#f1f5f9', // slate-100 (Hover efek)
          accent: '#4f46e5',    // indigo-600 (Warna utama biru/ungu)
          accentLight: '#6366f1', // indigo-500
          text: '#334155',      // slate-700 (Teks utama)
          textMuted: '#94a3b8'  // slate-400 (Teks sekunder)
        }
      }
    },
  },
  plugins: [],
}
 
