import type { Slot, Tag } from '../../dados/tipos.js';

/*
 * Os emblemas das cartas.
 *
 * Uma carta de oferta com nome, texto e etiquetas é uma linha de tabela com
 * borda. O que a transforma em carta é ter uma **imagem** — e num jogo de
 * pixel art essa imagem precisa ser pixel art, desenhada no mesmo mundo do
 * resto, não um ícone de biblioteca.
 *
 * Cada emblema é um desenho de 16x16 escrito como texto, o que é de longe a
 * forma mais legível de manter arte pequena dentro do código: dá para ver o
 * desenho lendo o arquivo. Cada caractere é um índice de cor dentro da paleta
 * da categoria, e é a paleta que muda entre Ativa, Passiva e Equipamento —
 * então o mesmo emblema serve aos três sem virar três desenhos.
 *
 *   '.' vazio   '1' sombra   '2' corpo   '3' luz   '4' brilho
 */

const L = 16;

type Desenho = readonly string[];

/** Quebra uma guarda: escudo rachado ao meio. */
const RUPTURA: Desenho = [
  '................',
  '...2222222222...',
  '..233333.33332..',
  '..23444...43332.',
  '..234444.443332.',
  '..2344.....4332.',
  '..2344..4..4332.',
  '..23444..444332.',
  '..233344..43332.',
  '...23334..3332..',
  '...2333.4.3332..',
  '....2333.4332...',
  '.....23334332...',
  '......233332....',
  '.......2332.....',
  '........22......',
];

/** Momentum: três galões subindo. */
const MOMENTUM: Desenho = [
  '................',
  '.......44.......',
  '......4334......',
  '.....433334.....',
  '....43222234....',
  '...4321..1234...',
  '..432......234..',
  '................',
  '.......33.......',
  '......3223......',
  '.....322223.....',
  '....32111123....',
  '...321......123.',
  '..21..........12',
  '................',
  '................',
];

/** Defesa: escudo inteiro, com reforço central. */
const DEFESA: Desenho = [
  '................',
  '..222222222222..',
  '..233333333333 2',
  '..2344444444432.',
  '..2344333334432.',
  '..2344344434432.',
  '..2344344434432.',
  '..2344333334432.',
  '..2344444444432.',
  '...234444444432.',
  '...23444444432..',
  '....234444432...',
  '.....23444432...',
  '......234432....',
  '.......2332.....',
  '........22......',
];

/** Combo: dois elos de corrente presos. */
const COMBO: Desenho = [
  '................',
  '................',
  '................',
  '..222222........',
  '.22422442.......',
  '.242..242.......',
  '.23....222222...',
  '.23....2244442..',
  '.232..2242..242.',
  '..2333322....42.',
  '...222222....32.',
  '.......232..232.',
  '.......23322322.',
  '........222222..',
  '................',
  '................',
];

/** Execução: machado curto. */
const EXECUCAO: Desenho = [
  '........2.......',
  '........222.....',
  '.....2232242....',
  '......23..442...',
  '......23..2442..',
  '......23..2442..',
  '......23..2442..',
  '......23..2332..',
  '......23..2332..',
  '......23..2332..',
  '......23..2332..',
  '......23..332...',
  '......23.232....',
  '......23222.....',
  '......232.......',
  '......22........',
];

/** Cura: frasco com cruz. */
const CURA: Desenho = [
  '................',
  '......2222......',
  '.....233332.....',
  '.....234432.....',
  '..2222344322222.',
  '.233333443333332',
  '.234444444444442',
  '.234444444444442',
  '.233333443333332',
  '..2222344322222.',
  '.....234432.....',
  '.....234432.....',
  '.....233332.....',
  '......2222......',
  '................',
  '................',
];

/** Crítico: estrela de impacto. */
const CRITICO: Desenho = [
  '................',
  '.......22.......',
  '.......33.......',
  '...2...44...2...',
  '....2..44..2....',
  '.....3.44.3.....',
  '......34430.....',
  '..2233444443322.',
  '..2233444443322.',
  '......34430.....',
  '.....3.44.3.....',
  '....2..44..2....',
  '...2...44...2...',
  '.......33.......',
  '.......22.......',
  '................',
];

/** Sangramento: gota. */
const SANGRAMENTO: Desenho = [
  '................',
  '.......22.......',
  '......2332......',
  '......2332......',
  '.....233332.....',
  '....23344332....',
  '...2334444332...',
  '...2344444432...',
  '..233444444332..',
  '..234444444432..',
  '..234441444432..',
  '..233444444332..',
  '...2334444333 2.',
  '....23333332....',
  '.....222222.....',
  '................',
];

const POR_TAG: Readonly<Record<Tag, Desenho>> = {
  ruptura: RUPTURA,
  momentum: MOMENTUM,
  defesa: DEFESA,
  combo: COMBO,
  execucao: EXECUCAO,
  cura: CURA,
  critico: CRITICO,
  sangramento: SANGRAMENTO,
};

/** Uma espada, para a arma. */
const ARMA: Desenho = [
  '................',
  '.............344',
  '............3442',
  '...........34432',
  '..........344321',
  '.........344321.',
  '........344321..',
  '.......344321...',
  '..2...344321....',
  '..12.344321.....',
  '...1234321......',
  '..2222221.......',
  '.234.2..........',
  '.234..2.........',
  '..23...2........',
  '...2............',
];

/** Um peitoral, para a armadura. */
const ARMADURA: Desenho = [
  '................',
  '..222......222..',
  '.23332....23332.',
  '.234443222344432',
  '.234444444444432',
  '.234443333444432',
  '..23443113344432',
  '..23443113344432',
  '..23443333344432',
  '..2344444444432.',
  '...234444444432.',
  '...23444444432..',
  '....2344444432..',
  '.....23444432...',
  '......233332....',
  '.......2222.....',
];

/** Um amuleto, para a relíquia. */
const RELIQUIA: Desenho = [
  '................',
  '....22222222....',
  '...2.......2....',
  '...2.......2....',
  '....2.....2.....',
  '.....2222.......',
  '.....23332......',
  '....2344432.....',
  '...234444432....',
  '...234441432....',
  '...234444432....',
  '....2344432.....',
  '.....23332......',
  '......222.......',
  '................',
  '................',
];

const POR_SLOT: Readonly<Record<Slot, Desenho>> = {
  arma: ARMA,
  armadura: ARMADURA,
  reliquia: RELIQUIA,
};

/**
 * As paletas.
 *
 * Uma por categoria de oferta. A cor é o que diz, antes de qualquer texto,
 * se aquilo é uma habilidade, uma passiva ou um equipamento — e ela é a
 * mesma cor que a moldura da carta usa, então o cartão inteiro lê como uma
 * peça só.
 */
export type Familia = 'ativa' | 'passiva' | 'equipamento';

const PALETAS: Readonly<Record<Familia, readonly [string, string, string, string]>> = {
  ativa: ['#6b3308', '#b5641c', '#e8873a', '#ffcf94'],
  passiva: ['#3a2a6b', '#6b52b5', '#9b7fe4', '#d9ccff'],
  equipamento: ['#123f5c', '#2f79a8', '#5aa9d8', '#b7e2ff'],
};

/** Desenha o emblema numa tela, já ampliado. */
const pintar = (desenho: Desenho, familia: Familia, escala: number): HTMLCanvasElement => {
  const tela = document.createElement('canvas');
  tela.width = L * escala;
  tela.height = L * escala;
  const ctx = tela.getContext('2d');
  if (ctx === null) return tela;
  ctx.imageSmoothingEnabled = false;
  const paleta = PALETAS[familia];

  for (let y = 0; y < L; y += 1) {
    const linha = desenho[y] ?? '';
    for (let x = 0; x < L; x += 1) {
      const c = linha[x] ?? '.';
      if (c === '.' || c === ' ') continue;
      const i = Math.min(3, Math.max(0, Number.parseInt(c, 10) - 1));
      ctx.fillStyle = paleta[i] ?? paleta[1];
      ctx.fillRect(x * escala, y * escala, escala, escala);
    }
  }
  return tela;
};

/*
 * O cache.
 *
 * Os mesmos poucos emblemas aparecem em toda oferta, em todo checkpoint e no
 * resumo da build. Redesenhá-los a cada render é desperdício silencioso — e
 * num telefone o desperdício silencioso aparece como engasgo na animação de
 * entrada das cartas.
 */
const cache = new Map<string, string>();

const comoDado = (desenho: Desenho, familia: Familia, chave: string): string => {
  const guardado = cache.get(chave);
  if (guardado !== undefined) return guardado;
  const url = pintar(desenho, familia, 4).toDataURL();
  cache.set(chave, url);
  return url;
};

/** O emblema de uma tag. */
export const emblemaDaTag = (tag: Tag, familia: Familia): string =>
  comoDado(POR_TAG[tag], familia, `t:${tag}:${familia}`);

/** O emblema de um slot de equipamento. */
export const emblemaDoSlot = (slot: Slot, familia: Familia): string =>
  comoDado(POR_SLOT[slot], familia, `s:${slot}:${familia}`);

/** A cor viva da família, para moldura e destaque. */
export const corDaFamilia = (familia: Familia): string => PALETAS[familia][2];
