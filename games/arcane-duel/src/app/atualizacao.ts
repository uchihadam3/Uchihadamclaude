/*
 * O registro do service worker e o aviso de versão nova.
 *
 * A regra é que o jogo nunca troca de versão sozinho. Um PWA que se atualiza
 * no meio de uma sala mata a run, e o jogador não entende o que aconteceu —
 * para ele o jogo simplesmente fechou. Então o worker novo fica esperando, o
 * jogo mostra "NOVA VERSÃO DISPONÍVEL", e a troca acontece no toque.
 *
 * O `controllerchange` recarrega a página **uma vez só**: sem a trava, o
 * navegador pode disparar o evento mais de uma vez e o jogo entra num laço de
 * recarregamento que parece travamento.
 */

const CAMINHO = new URL('sw.js', document.baseURI).href;

let recarregando = false;

export type AoTerVersaoNova = () => void;

let registro: ServiceWorkerRegistration | null = null;

/** Registra o worker. Devolve uma função para cancelar a escuta. */
export const registrarAtualizacoes = (aoTerVersaoNova: AoTerVersaoNova): (() => void) => {
  if (!('serviceWorker' in navigator)) return () => undefined;

  const emEspera = (r: ServiceWorkerRegistration): void => {
    if (r.waiting !== null && navigator.serviceWorker.controller !== null) aoTerVersaoNova();
  };

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (recarregando) return;
    recarregando = true;
    globalThis.location.reload();
  });

  void navigator.serviceWorker
    .register(CAMINHO, { scope: './' })
    .then((r) => {
      registro = r;
      emEspera(r);
      r.addEventListener('updatefound', () => {
        const novo = r.installing;
        if (novo === null) return;
        novo.addEventListener('statechange', () => {
          if (novo.state === 'installed') emEspera(r);
        });
      });
      /* Uma verificação por hora cobre a sessão que fica aberta o dia inteiro. */
      globalThis.setInterval(() => void r.update(), 60 * 60 * 1000);
    })
    .catch(() => undefined);

  return () => undefined;
};

/** O jogador tocou em ATUALIZAR. */
export const aplicarAtualizacao = (): void => {
  const esperando = registro?.waiting ?? null;
  if (esperando === null) {
    globalThis.location.reload();
    return;
  }
  esperando.postMessage('assumir');
};
