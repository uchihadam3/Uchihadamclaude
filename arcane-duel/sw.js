/*
 * O service worker.
 *
 * Duas decisões importam aqui.
 *
 * A primeira é a estratégia. Os arquivos que o Vite gera levam hash no nome,
 * então são imutáveis: para eles, cache primeiro, sem rede nenhuma. O HTML e
 * o manifesto **não** levam hash, então para eles é rede primeiro, com o
 * cache só como rede de segurança offline. É isso que impede o erro clássico
 * de PWA: um index.html velho em cache apontando para um bundle que já não
 * existe, e o jogo abrindo em branco para sempre.
 *
 * A segunda é a atualização. Este worker **não** chama `skipWaiting` sozinho.
 * Ele espera, o jogo percebe que há uma versão nova, avisa o jogador, e só
 * troca quando ele toca em ATUALIZAR. Trocar sozinho no meio de uma run é
 * perder a run.
 */

const VERSAO = '2ab85e1-2026-09-20T1458';
const CACHE = `arcane-duel-${VERSAO}`;

/* O casco: o que precisa existir para a primeira tela aparecer offline. */
const CASCO = ['./', './index.html', './manifest.webmanifest', './icones/icone-192.png'];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CASCO).catch(() => undefined)),
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    (async () => {
      const nomes = await caches.keys();
      await Promise.all(
        nomes.filter((n) => n.startsWith('arcane-duel-') && n !== CACHE).map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (evento) => {
  if (evento.data === 'assumir') void self.skipWaiting();
});

const ehDocumento = (pedido) =>
  pedido.mode === 'navigate' ||
  pedido.destination === 'document' ||
  pedido.destination === 'manifest';

self.addEventListener('fetch', (evento) => {
  const pedido = evento.request;
  if (pedido.method !== 'GET') return;
  const url = new URL(pedido.url);
  if (url.origin !== self.location.origin) return;

  if (ehDocumento(pedido)) {
    evento.respondWith(
      (async () => {
        try {
          const resposta = await fetch(pedido);
          const cache = await caches.open(CACHE);
          void cache.put(pedido, resposta.clone());
          return resposta;
        } catch {
          const guardado = await caches.match(pedido);
          return guardado ?? (await caches.match('./index.html')) ?? Response.error();
        }
      })(),
    );
    return;
  }

  evento.respondWith(
    (async () => {
      const guardado = await caches.match(pedido);
      if (guardado !== undefined) return guardado;
      const resposta = await fetch(pedido);
      if (resposta.ok && resposta.type === 'basic') {
        const cache = await caches.open(CACHE);
        void cache.put(pedido, resposta.clone());
      }
      return resposta;
    })(),
  );
});
