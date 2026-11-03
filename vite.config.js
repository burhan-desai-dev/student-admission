import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// plugins ki list mein tailwindcss() zaroor ho, warna styles nahi aayengi
export default defineConfig({
  plugins: [react(), tailwindcss()],
})