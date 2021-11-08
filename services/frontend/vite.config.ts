import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    hmr: {
      port: process.env.PROXIED_PORT
        ? parseInt(process.env.PROXIED_PORT)
        : undefined,
    },
  },
})
