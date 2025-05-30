// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // Resolves "@" to the ./src folder
    }
  },
  build: {
    outDir: "dist", // Default build output directory
    chunkSizeWarningLimit: 1000 // Optional: Adjusts warning threshold
  },
  server: {
    port: 3000, // Optional: change the dev server port
    open: true // Optional: opens browser on dev server start
  }
});
