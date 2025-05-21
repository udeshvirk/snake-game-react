import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

const base = "/snake-game-react/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Snake Game",
        short_name: "Snake",
        start_url: base,
        scope: base,
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#8B5CF6",
        icons: [
          {
            src: `${base}icon-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${base}icon-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: base, // For GitHub Pages
});
