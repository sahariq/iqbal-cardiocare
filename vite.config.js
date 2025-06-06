import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5432,
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL || 'http://localhost:8765',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    port: 5432
  }
}) 