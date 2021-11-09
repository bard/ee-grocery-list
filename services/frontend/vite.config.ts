import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
    hmr: {
      // explicit hmr port when running behind reverse proxy
      port: process.env.HMR_PORT ? parseInt(process.env.HMR_PORT) : undefined,
    },

    proxy: process.env.API_HOST
      ? { '/api': { target: process.env.API_HOST } }
      : undefined,
  },
})
