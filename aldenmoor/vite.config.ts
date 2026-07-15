import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // caminho relativo para funcionar hospedado em subpasta (GitHub Pages) e em dev
  base: command === "build" ? "./" : "/",
  server: { port: 3100, host: "127.0.0.1" },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    target: "es2020",
  },
}));
