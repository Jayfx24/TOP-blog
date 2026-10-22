import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    lightningcss: {
      cssModules: true,
    },
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "studio"),
      },
       "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      
      },
    },
  },
});
