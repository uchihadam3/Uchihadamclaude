import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/*
 * O jogo é publicado dentro de um subdiretório do GitHub Pages, ao lado de
 * outros jogos. `base` relativo faz o bundle funcionar em qualquer caminho —
 * no `vite dev`, no `preview` e em `/Uchihadamclaude/arcane-duel/` — sem uma
 * variável de ambiente para esquecer de passar.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    // Pixel art não deve virar data-URI: o navegador perde o cache por arquivo.
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: { phaser: ['phaser'] },
      },
    },
  },
});
