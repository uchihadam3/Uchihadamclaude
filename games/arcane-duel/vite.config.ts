import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

/*
 * O carimbo de versão do service worker.
 *
 * O `sw.js` nomeia o cache com `arcane-duel-${VERSAO}`, e o `activate` apaga
 * todo cache cujo nome não seja o atual. Só que `VERSAO` era o literal
 * `'__VERSAO__'`, e ninguém o substituía: o nome do cache era o **mesmo** em
 * todo deploy, o `activate` não tinha o que apagar, e o HTML velho continuava
 * servido do cache. Era um jogo publicado que não chegava a quem já tinha
 * aberto o anterior.
 *
 * O carimbo é o conteúdo do próprio worker mais a hora do build: muda a cada
 * publicação, e não muda entre dois builds do mesmo código.
 */
const carimbarServiceWorker = (): Plugin => {
  let saida = 'dist';
  return {
    name: 'carimbar-service-worker',
    apply: 'build',
    configResolved(config) {
      saida = config.build.outDir;
    },
    /*
     * O carimbo acontece **depois** do build, e não em `generateBundle`.
     *
     * O `sw.js` mora em `public/`, e o Vite copia essa pasta sem passar pelo
     * empacotador — dentro de `generateBundle` o arquivo simplesmente não
     * existe. Foi assim que a substituição passou despercebida.
     */
    closeBundle() {
      const caminho = resolve(saida, 'sw.js');
      if (!existsSync(caminho)) return;
      const original = readFileSync(caminho, 'utf8');
      if (!original.includes('__VERSAO__')) return;
      const assinatura = `${String(Date.now())}-${String(original.length)}`;
      writeFileSync(caminho, original.replace('__VERSAO__', assinatura), 'utf8');
    },
  };
};

/*
 * O jogo é publicado dentro de um subdiretório do GitHub Pages, ao lado de
 * outros jogos. `base` relativo faz o bundle funcionar em qualquer caminho —
 * no `vite dev`, no `preview` e em `/Uchihadamclaude/arcane-duel/` — sem uma
 * variável de ambiente para esquecer de passar.
 */
export default defineConfig({
  base: './',
  plugins: [react(), carimbarServiceWorker()],
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
