import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' para o jogo funcionar servido de qualquer subpasta (githack, file://, etc.)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 8192,
    chunkSizeWarningLimit: 4000,
  },
});
