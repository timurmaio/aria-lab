import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE === '1' && visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'aria-lab': ['aria-lab'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5174,
  },
})
