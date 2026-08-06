// ============================================================================
// ÍCONES DA INTERFACE — o fim dos emoji.
//
// Até aqui os símbolos pequenos da tela eram EMOJI ou caractere solto: ⚑ para a
// Companhia, ⚙ para as opções, ⚔ para Força. Funcionava, mas quem desenhava era
// a fonte do aparelho — o mesmo ⚑ sai diferente no Android, no iPhone e no
// Windows, e nenhum deles combina com a arte pintada do resto do jogo.
//
// Agora são duas folhas de arte (PROMPTS.md §31), fatiadas pelo
// scripts/slice_icons.py em PNGs com nome. Este módulo é só a ponte entre o nome
// e o arquivo.
//
// POR QUE `import.meta.glob` E NÃO 42 IMPORTS. Eram 42 linhas de import que
// precisariam ser mantidas em sincronia com o mapa de nomes do fatiador — e o
// jeito de descobrir que uma faltou seria um botão vazio no jogo. Com o glob, a
// pasta é a lista: fatiou, existe.
//
// O QUE SOBRA DE EMOJI, de propósito: os ícones de capítulo da missão principal e
// os dos contratos da taverna (🧭 🏘 🔑 🐀 …). Aqueles são um por conteúdo e
// mudam a cada capítulo novo; virariam uma folha de arte que envelhece a cada
// missão escrita. Estes aqui são a MOLDURA do jogo, que é fixa.
// ============================================================================

// eager + ?url: o Vite resolve tudo no build e devolve o caminho final com hash
const ARQUIVOS = import.meta.glob("../assets/ui/icons/ico_*.png", {
  eager: true, query: "?url", import: "default",
}) as Record<string, string>;

/** nome ("companhia") → URL da arte. Vazio se a peça ainda não foi fatiada. */
export const ICO: Record<string, string> = Object.fromEntries(
  Object.entries(ARQUIVOS).map(([caminho, url]) => [
    caminho.replace(/^.*\/ico_(.+)\.png$/, "$1"), url,
  ]),
);

/**
 * A tag `<img>` de um ícone, pronta p/ entrar no meio de um texto.
 *
 * Devolve "" se o nome não existir — assim uma peça que ainda não veio some da
 * tela em vez de virar um quadrado quebrado. Quem chama pode encadear um `||`
 * com o glifo antigo quando quiser manter uma reserva.
 */
export function ico(nome: string, cls = "", titulo = ""): string {
  const url = ICO[nome];
  if (!url) return "";
  return `<img class="gh-ico${cls ? " " + cls : ""}" src="${url}" alt=""${
    titulo ? ` title="${titulo}"` : ""} draggable="false"/>`;
}

/** Existe arte para este nome? (p/ decidir entre a imagem e o glifo antigo) */
export function temIcone(nome: string): boolean { return !!ICO[nome]; }

/**
 * CSS base dos ícones — INJETADO POR ESTE MÓDULO, e não pela tela do jogo.
 *
 * Ele morava dentro do setupControls, que só roda depois que a partida começa.
 * Resultado: nas telas de abertura (título, escolha de personagem, prólogo) a
 * regra não existia e os `<img>` saíam no TAMANHO NATURAL — 200px. A seta do
 * "Voltar" virou um triângulo do tamanho do botão inteiro.
 *
 * O estilo pertence a quem gera a marcação. Injetar aqui, uma vez, garante que
 * qualquer tela que chame `ico()` receba o tamanho certo — inclusive as que
 * ainda não existem.
 *
 * `em` e não pixel: o ícone entra onde antes havia uma letra, então acompanha o
 * corpo do texto do lugar. 0,9em porque um glifo não preenche a própria caixa —
 * a 1em o desenho fica visivelmente maior que o caractere que ele substituiu.
 * E um TETO em pixels, porque "acompanhar o texto" deixa de fazer sentido num
 * título de 60px: ali o ícone viraria um cartaz.
 */
export const ICON_CSS = `
  .gh-ico{width:0.9em;height:0.9em;
    max-width:calc(26px * var(--gh-ui,1));max-height:calc(26px * var(--gh-ui,1));
    object-fit:contain;vertical-align:-0.1em;
    flex:none;pointer-events:none;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.55));}
  /* nos botões redondos do HUD o ícone ocupa o disco quase todo */
  .gh-ico-btn{width:60%;height:60%;max-width:none;max-height:none;vertical-align:0;}
  /* dentro de um botão pequeno (▲ ▼ ✕ da Companhia, + do painel social) */
  .gh-ico-sm{width:calc(15px * var(--gh-ui,1));height:calc(15px * var(--gh-ui,1));vertical-align:-0.22em;}
  /* lugares que QUEREM o ícone grande dizem isso explicitamente */
  .gh-ico-lg{width:1.1em;height:1.1em;
    max-width:calc(52px * var(--gh-ui,1));max-height:calc(52px * var(--gh-ui,1));}
`;

/** Põe a folha no documento uma única vez (o módulo é carregado uma vez só). */
function instalarCss(): void {
  if (typeof document === "undefined" || document.getElementById("gh-icons-css")) return;
  const el = document.createElement("style");
  el.id = "gh-icons-css";
  el.textContent = ICON_CSS;
  (document.head ?? document.documentElement).appendChild(el);
}
instalarCss();
