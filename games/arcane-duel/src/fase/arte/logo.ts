import { TelaDeArte } from './tela.js';

/*
 * O logo.
 *
 * Um `<h1>` com fonte bonita não é logo de jogo: é título de página. O que
 * transforma texto em marca é o **tratamento** — letra desenhada com volume,
 * moldura que a contém, um símbolo próprio, e um brilho que atravessa devagar.
 *
 * As letras são desenhadas aqui em pixel, num alfabeto pequeno e próprio, e
 * não tiradas de uma fonte. É mais trabalho e é o ponto: uma fonte de sistema
 * ampliada denuncia na hora que o logo é provisório, e a primeira impressão
 * não tem segunda chance.
 */

/*
 * O alfabeto, 5 de largura por 7 de altura.
 *
 * Só as letras de ARCANE DUEL existem — desenhar as vinte e seis seria
 * trabalho jogado fora enquanto o nome for este.
 */
const GLIFOS: Readonly<Record<string, readonly string[]>> = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  R: ['####.', '#...#', '#...#', '####.', '#..#.', '#...#', '#...#'],
  C: ['.####', '#....', '#....', '#....', '#....', '#....', '.####'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
};

const LARGURA_DO_GLIFO = 5;
const ALTURA_DO_GLIFO = 7;
/** Cada pixel do glifo vira um bloco, para a letra ter corpo. */
const BLOCO = 3;
const ESPACO = 2;

const larguraDaPalavra = (texto: string): number =>
  texto.length * (LARGURA_DO_GLIFO * BLOCO + ESPACO) - ESPACO;

/**
 * Uma palavra, com volume.
 *
 * Cada bloco é desenhado três vezes: a sombra deslocada para baixo-direita, o
 * corpo, e a aresta de luz em cima-esquerda. É o mesmo modelo de luz do resto
 * do jogo, e é por isso que o logo pertence à mesma peça que a arena.
 */
const palavra = (t: TelaDeArte, texto: string, x0: number, y0: number): void => {
  let x = x0;
  for (const letra of texto) {
    const glifo = GLIFOS[letra];
    if (glifo === undefined) {
      x += LARGURA_DO_GLIFO * BLOCO + ESPACO;
      continue;
    }
    for (let gy = 0; gy < ALTURA_DO_GLIFO; gy += 1) {
      const linha = glifo[gy] ?? '';
      for (let gx = 0; gx < LARGURA_DO_GLIFO; gx += 1) {
        if (linha[gx] !== '#') continue;
        const px = x + gx * BLOCO;
        const py = y0 + gy * BLOCO;
        /* Sombra projetada, que descola a letra do fundo. */
        t.retangulo(px + 2, py + 2, BLOCO, BLOCO, 'ouro', 0);
        /* Corpo. */
        t.retangulo(px, py, BLOCO, BLOCO, 'ouro', 3);
        /* Aresta de luz. */
        t.retangulo(px, py, BLOCO, 1, 'ouro', 4);
        t.retangulo(px, py, 1, BLOCO, 'ouro', 4);
        /* Sombra interna na base do bloco. */
        t.retangulo(px + 1, py + BLOCO - 1, BLOCO - 1, 1, 'ouro', 2);
      }
    }
    x += LARGURA_DO_GLIFO * BLOCO + ESPACO;
  }
};

/**
 * O símbolo: dois gumes cruzados dentro de um losango arcano.
 *
 * É o que dá identidade ao logo além do nome. Duas lâminas em X dizem
 * "duelo"; o losango e os riscos em volta dizem "arcano". Juntos dizem o
 * nome do jogo sem escrever o nome do jogo.
 */
const simbolo = (t: TelaDeArte, cx: number, cy: number, raio: number): void => {
  /* O losango externo. */
  for (let i = 0; i <= raio; i += 1) {
    const meio = raio - i;
    t.pixel(cx - meio, cy - i, 'ouro', 3);
    t.pixel(cx + meio, cy - i, 'ouro', 2);
    t.pixel(cx - meio, cy + i, 'ouro', 2);
    t.pixel(cx + meio, cy + i, 'ouro', 1);
  }
  /* As duas lâminas cruzadas, uma clara e uma escura, para ler o cruzamento. */
  for (let i = -raio + 3; i <= raio - 3; i += 1) {
    t.pixel(cx + i, cy + i, 'aco', 4);
    t.pixel(cx + i, cy + i + 1, 'aco', 2);
    t.pixel(cx + i, cy - i, 'aco', 3);
    t.pixel(cx + i, cy - i + 1, 'aco', 1);
  }
  /* A gema no centro. */
  t.elipse(cx, cy, 2.4, 2.4, 'pano', 3);
  t.pixel(cx - 1, cy - 1, 'pano', 4);
  /* Quatro riscos arcanos, nas diagonais. */
  for (const [dx, dy] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ] as const) {
    for (let i = raio + 2; i < raio + 5; i += 1) {
      t.pixel(cx + dx * i, cy + dy * i, 'ouro', 2);
    }
  }
};

export interface Logo {
  readonly tela: HTMLCanvasElement;
  readonly largura: number;
  readonly altura: number;
}

/** O logo inteiro: moldura, símbolo, as duas palavras e a divisa. */
export const gerarLogo = (): Logo => {
  const larguraDoTexto = Math.max(larguraDaPalavra('ARCANE'), larguraDaPalavra('DUEL'));
  const margem = 14;
  const largura = larguraDoTexto + margem * 2;
  const altura = ALTURA_DO_GLIFO * BLOCO * 2 + 40 + margem;
  const t = new TelaDeArte(largura, altura);

  const cx = Math.round(largura / 2);

  simbolo(t, cx, 20, 11);

  const yArcane = 38;
  const yDuel = yArcane + ALTURA_DO_GLIFO * BLOCO + 8;
  palavra(t, 'ARCANE', Math.round(cx - larguraDaPalavra('ARCANE') / 2), yArcane);
  palavra(t, 'DUEL', Math.round(cx - larguraDaPalavra('DUEL') / 2), yDuel);

  /*
   * A divisa entre as duas palavras.
   *
   * Uma linha fina que afina nas pontas, com dois pontos. É o detalhe que
   * amarra as duas linhas de texto numa marca só em vez de duas palavras
   * empilhadas.
   */
  const yDivisa = yArcane + ALTURA_DO_GLIFO * BLOCO + 3;
  for (let i = -larguraDoTexto / 2 + 6; i <= larguraDoTexto / 2 - 6; i += 1) {
    const f = Math.abs(i) / (larguraDoTexto / 2);
    t.pixel(cx + i, yDivisa, 'ouro', f > 0.82 ? 1 : f > 0.6 ? 2 : 3);
  }
  t.pixel(cx - larguraDoTexto / 2 + 4, yDivisa, 'ouro', 4);
  t.pixel(cx + larguraDoTexto / 2 - 4, yDivisa, 'ouro', 4);

  t.contornar();
  return { tela: t.resolver(), largura, altura };
};
