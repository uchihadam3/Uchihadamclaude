/*
 * A saída da tela de carregamento.
 *
 * A tela em si está no `index.html`, para pintar no primeiro frame. O que
 * mora aqui é só a decisão de **quando** ela sai: não é quando o React monta
 * (nesse instante a cena ainda é um canvas em branco), e sim quando a
 * primeira imagem do título já foi desenhada. Sair antes disso troca uma tela
 * de carregamento por um flash preto, que é pior que não ter nenhuma.
 *
 * Há um piso de tempo porque uma tela de carregamento que aparece e some em
 * 80 ms lê como falha de renderização, não como carregamento.
 */

const PISO_MS = 700;
const SAIDA_MS = 420;

const inicio = performance.now();
let saiu = false;

export const jogoPronto = (): void => {
  if (saiu) return;
  saiu = true;
  const espera = Math.max(0, PISO_MS - (performance.now() - inicio));
  globalThis.setTimeout(() => {
    const veu = document.querySelector('#carregando');
    if (veu === null) return;
    veu.classList.add('saindo');
    globalThis.setTimeout(() => {
      veu.remove();
    }, SAIDA_MS);
  }, espera);
};
