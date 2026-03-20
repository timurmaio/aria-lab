import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE === "1" && visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        // Vite 8 / Rolldown: manualChunks must be a function (object form removed).
        manualChunks(id: string) {
          if (/[/\\]node_modules[/\\](react[/\\]|react-dom[/\\]|react-router-dom[/\\])/.test(id)) {
            return "react-vendor";
          }
          if (/[/\\]node_modules[/\\](\.pnpm[/\\][^/\\]+[/\\])?aria-lab[/\\]/.test(id)) {
            return "aria-lab";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5174,
  },
});
