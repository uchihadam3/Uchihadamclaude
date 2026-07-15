import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "./" : "/",
  server: { port: 3200, host: "127.0.0.1" },
  build: { outDir: "dist", target: "es2020", chunkSizeWarningLimit: 2000 },
}));
