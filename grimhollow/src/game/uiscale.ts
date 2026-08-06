// ============================================================================
// A ESCALA DA INTERFACE — por que o jogo ficava minúsculo no PC.
//
// Toda a interface foi escrita medindo em `min(Npx, Mvw)`: no celular manda o
// `vw` (a peça acompanha a tela), e o `Npx` é só um TETO p/ ela não virar um
// cartaz. O problema é que esse teto foi calibrado olhando p/ um celular. Num
// monitor de 3440×1440 o `vw` é enorme, o teto ganha sempre, e a placa de vida
// que ocupa 40% da largura de um celular passa a ocupar 6,7% — o mesmo desenho,
// numa tela cinco vezes maior, lido de uma distância quatro vezes maior.
//
// A correção não é subir os tetos: um teto maior estoura o celular. É fazer o
// TETO CRESCER COM A TELA. É isso que esta variável faz — `--gh-ui` é um
// multiplicador que vale 1 no celular e em telas pequenas de PC, e sobe até
// ~1,95 num monitor grande. Cada teto vira `calc(Npx * var(--gh-ui))`, e uma
// única linha de CSS passa a servir os dois mundos.
//
// POR QUE A ALTURA MANDA, E NÃO A LARGURA. Um ultrawide 21:9 tem largura de
// sobra e altura de monitor comum. Se a escala saísse da largura, a interface
// de um 3440×1440 cresceria 2,7× enquanto a área útil vertical continuaria a
// mesma — o HUD comeria a tela e a barra de habilidades encostaria no chão. A
// menor das duas razões é o que mantém a interface proporcional à ALTURA, que é
// a dimensão que o jogador realmente tem.
//
// A base é 1280×720: abaixo disso a escala é 1 e nada muda (é onde o celular e
// o notebook pequeno vivem). O teto de 1,95 existe porque acima disso a arte
// dos quadros 9-slice começa a mostrar o próprio pixel.
// ============================================================================

/** Base de referência: nesta janela a escala é exatamente 1. */
const BASE_W = 1280;
const BASE_H = 720;
/** Acima disto a arte da moldura começa a borrar; não adianta crescer mais. */
const TETO = 1.95;

export function escalaUi(
  w: number = typeof window === "undefined" ? BASE_W : window.innerWidth,
  h: number = typeof window === "undefined" ? BASE_H : window.innerHeight,
): number {
  const s = Math.min(w / BASE_W, h / BASE_H);
  return Math.max(1, Math.min(TETO, s));
}

/**
 * Grava `--gh-ui` no <html> e mantém a variável em dia quando a janela muda.
 *
 * O CSS também declara `:root{--gh-ui:1}` como valor de partida — assim a folha
 * funciona sozinha se este módulo nunca rodar (e a interface fica exatamente
 * como era antes desta mudança, que é o comportamento certo p/ um erro).
 */
export function instalarEscalaUi(): void {
  if (typeof document === "undefined") return;
  const aplicar = (): void => {
    const s = escalaUi();
    const raiz = document.documentElement.style;
    raiz.setProperty("--gh-ui", s.toFixed(3));
    // a MESMA escala em forma de unidade, p/ escrever calc(52 * var(--gh-u))
    // onde antes havia um 52px cravado. Gravada em pixel direto, e não como
    // calc(1px * --gh-ui), p/ não empilhar um calc dentro de cada uso.
    raiz.setProperty("--gh-u", `${s.toFixed(4)}px`);
  };
  aplicar();
  window.addEventListener("resize", aplicar);
  window.addEventListener("orientationchange", aplicar);
}

// Instala ao ser carregado, como o icons.ts faz com a folha dele. A escala tem
// de existir ANTES da primeira tela desenhar — se ela chegasse só quando a
// partida começa, o menu e a criação de personagem sairiam em miniatura e
// corrigiriam de tamanho na frente do jogador.
instalarEscalaUi();
