/*
 * A publicação.
 *
 * O repositório é servido pelo GitHub Pages a partir da branch `gh-pages`, e
 * este jogo mora numa subpasta dela. Então o que este script faz é: carimbar
 * a versão no service worker, limpar a pasta publicada e copiar o build para
 * lá. Nada de `git` — quem comita é quem chamou, de propósito: publicar e
 * comitar são decisões diferentes e misturar as duas esconde o que foi para o
 * ar.
 *
 * A versão carimbada é o que faz o worker antigo perceber que existe uma
 * versão nova. Sem ela, o arquivo `sw.js` seria byte a byte idêntico entre
 * dois deploys e o navegador nunca dispararia `updatefound`.
 */

import { execSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const PROJETO = resolve(AQUI, '..');
const DIST = resolve(PROJETO, 'dist');
const DESTINO = resolve(PROJETO, '../../arcane-duel');

if (!existsSync(DIST)) {
  console.error('não há build em dist/. rode `npm run build` antes.');
  process.exit(1);
}

/* A versão: o commit atual mais o instante do build. */
let commit = 'local';
try {
  commit = execSync('git rev-parse --short HEAD', { cwd: PROJETO }).toString().trim();
} catch {
  /* Fora de um repositório o carimbo de tempo já basta. */
}
const versao = `${commit}-${new Date().toISOString().replace(/[:.]/g, '').slice(0, 15)}`;

const sw = resolve(DIST, 'sw.js');
writeFileSync(sw, readFileSync(sw, 'utf8').replace('__VERSAO__', versao));

rmSync(DESTINO, { recursive: true, force: true });
cpSync(DIST, DESTINO, { recursive: true });

console.log('publicado em', DESTINO);
console.log('versão      ', versao);
