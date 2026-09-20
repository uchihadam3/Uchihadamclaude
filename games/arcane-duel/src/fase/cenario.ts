import type { PaletaDeArea } from '../dados/tipos.js';

import type { Tela } from './pixel.js';
import { ajustar, contornar, criarTela, granular, misturar } from './pixel.js';

/*
 * O cenário de cada área.
 *
 * Três camadas de parallax mais o chão. A regra que vale para todas: **quanto
 * mais longe, menos contraste e mais névoa**. É a perspectiva aérea, e é
 * sozinha responsável por o fundo parecer fundo — sem ela, três camadas
 * desenhadas com a mesma saturação leem como três adesivos no mesmo plano.
 *
 * O desenho de cada camada muda por área, e não só a cor: ruína tem arco
 * quebrado, catacumba tem nicho, profundeza tem estalactite, fortaleza tem
 * ameia, trono tem pilar. Trocar só a paleta faria as cinco áreas parecerem a
 * mesma sala com outro filtro — que é exatamente o que a direção proibiu.
 */

export interface Cenario {
  readonly distante: Tela;
  readonly medio: Tela;
  readonly proximo: Tela;
  readonly chao: Tela;
  readonly largura: number;
  readonly altura: number;
}

/** Largura do azulejo de parallax. Ele se repete no eixo X. */
const LARGURA = 160;
const ALTURA = 90;

/** Lê um pixel já desenhado. Atalho nomeado, para o código do archote caber. */
const pincelLer = (
  p: ReturnType<typeof criarTela>['pincel'],
  x: number,
  y: number,
): string | null => p.ler(x, y);

const aleatorio = (semente: number): (() => number) => {
  let estado = semente >>> 0;
  return () => {
    estado = (Math.imul(estado ^ (estado >>> 15), 0x2545f491) + 0x9e3779b9) >>> 0;
    return estado / 4294967296;
  };
};

/** O céu, em faixas: um degradê chapado lê como plástico. */
const desenharCeu = (paleta: PaletaDeArea): Tela => {
  const { tela, pincel } = criarTela(LARGURA, ALTURA);
  const [alto, baixo] = paleta.ceu;
  const faixas = 10;
  for (let f = 0; f < faixas; f += 1) {
    const t = f / (faixas - 1);
    const cor = misturar(alto, baixo, t);
    pincel.retangulo(0, Math.round((f * ALTURA) / faixas), LARGURA, Math.ceil(ALTURA / faixas) + 1, cor);
  }
  /*
   * A luz vem **de cima da moldura**, e não de um disco no meio do céu.
   *
   * A primeira versão desenhava uma elipse acesa no ar, e ela lia como um
   * objeto — um disco voador pairando sobre a ruína. Uma fonte de luz não é
   * um objeto na cena: ela é a razão de o topo ser mais claro que a base, e
   * de haver um facho descendo. É isso que justifica a sombra dos atores sem
   * pedir atenção para si.
   */
  const fonteX = Math.round(LARGURA * 0.64);
  for (let y = 0; y < ALTURA; y += 1) {
    const queda = 1 - y / (ALTURA * 0.92);
    if (queda <= 0) continue;
    const meio = Math.round(6 + y * 0.42);
    for (let x = fonteX - meio; x <= fonteX + meio; x += 1) {
      const lateral = 1 - Math.abs(x - fonteX) / Math.max(1, meio);
      const forca = queda * lateral * lateral * 0.3;
      if (forca < 0.03) continue;
      const atual = pincel.ler(x, y);
      if (atual !== null) pincel.pixel(x, y, misturar(atual, paleta.luz, forca));
    }
  }
  granular(pincel, 7, 0.06);
  return tela;
};

type Desenhador = (
  p: ReturnType<typeof criarTela>['pincel'],
  paleta: PaletaDeArea,
  cor: string,
  rnd: () => number,
  topo: number,
) => void;

/**
 * Área 1: colunatas partidas de uma ruína a céu aberto.
 *
 * A primeira versão desenhava blocos baixos e largos, e o resultado lia como
 * um cemitério de lápides. Uma ruína se reconhece pela **proporção**: colunas
 * altas e estreitas, algumas ainda ligadas por um arco, e o topo quebrado em
 * alturas diferentes. É a verticalidade que diz "isto já foi um edifício".
 */
const ruinas: Desenhador = (p, _paleta, cor, rnd, topo) => {
  const colunas: { x: number; largura: number; altura: number }[] = [];
  for (let x = 2; x < LARGURA; x += 19 + Math.round(rnd() * 8)) {
    const largura = 5 + Math.round(rnd() * 3);
    const altura = Math.round(topo * (0.42 + rnd() * 0.45));
    colunas.push({ x, largura, altura });
    p.retangulo(x, topo - altura, largura, altura, cor);
    /* Aresta de luz à esquerda e sombra à direita: a coluna ganha cilindro. */
    p.retangulo(x, topo - altura, 1, altura, ajustar(cor, 0.2));
    p.retangulo(x + largura - 1, topo - altura, 1, altura, ajustar(cor, -0.22));
    /* A base alargada, que toda coluna tem. */
    p.retangulo(x - 1, topo - 3, largura + 2, 3, ajustar(cor, -0.1));
    /* O topo partido, em degraus irregulares. */
    for (let d = 0; d < 2 + Math.round(rnd() * 2); d += 1) {
      p.retangulo(x + Math.round(rnd() * (largura - 1)), topo - altura - d, 1, 1, ajustar(cor, -0.18));
    }
  }
  /* Um arco sobrevivente entre duas colunas vizinhas: a prova do edifício. */
  for (let i = 0; i + 1 < colunas.length; i += 1) {
    const a = colunas[i];
    const b = colunas[i + 1];
    if (a === undefined || b === undefined) continue;
    if (rnd() > 0.42) continue;
    const alturaDoArco = Math.min(a.altura, b.altura);
    const de = a.x + a.largura - 1;
    const ate = b.x;
    const vao = ate - de;
    if (vao < 4 || vao > 18) continue;
    for (let x = de; x <= ate; x += 1) {
      const t = (x - de) / vao;
      const curva = Math.sin(t * Math.PI) * (vao * 0.28);
      p.retangulo(x, topo - alturaDoArco - Math.round(curva), 1, 3, cor);
    }
  }
};

/** Área 2: parede de nichos, onde as catacumbas guardam os seus. */
const catacumbas: Desenhador = (p, _paleta, cor, rnd, topo) => {
  p.retangulo(0, topo - 40, LARGURA, 40, cor);
  for (let x = 4; x < LARGURA - 8; x += 16) {
    for (let y = topo - 36; y < topo - 6; y += 12) {
      p.retangulo(x, y, 10, 8, ajustar(cor, -0.35));
      p.retangulo(x + 1, y + 1, 8, 6, ajustar(cor, -0.55));
      if (rnd() < 0.4) p.retangulo(x + 3, y + 4, 4, 2, ajustar(cor, 0.25));
    }
  }
};

/** Área 3: estalactites descendo, e colunas subindo do escuro. */
const profundezas: Desenhador = (p, paleta, cor, rnd, topo) => {
  for (let x = 0; x < LARGURA; x += 9) {
    const comprimento = 6 + Math.round(rnd() * 16);
    for (let y = 0; y < comprimento; y += 1) {
      const meio = Math.max(0, Math.round((comprimento - y) / 3));
      p.retangulo(x - meio, y, meio * 2 + 1, 1, cor);
    }
  }
  for (let x = 6; x < LARGURA; x += 31) {
    const altura = 18 + Math.round(rnd() * 12);
    for (let y = 0; y < altura; y += 1) {
      const meio = Math.max(1, Math.round(y / 4));
      p.retangulo(x - meio, topo - y, meio * 2 + 1, 1, cor);
    }
    p.pixel(x, topo - altura, paleta.particula);
  }
};

/** Área 4: muralha com ameias e frestas acesas. */
const fortaleza: Desenhador = (p, paleta, cor, rnd, topo) => {
  p.retangulo(0, topo - 44, LARGURA, 44, cor);
  for (let x = 0; x < LARGURA; x += 12) {
    p.retangulo(x, topo - 50, 7, 7, cor);
  }
  /* A fiada de blocos, com junta clara: dá escala à muralha. */
  for (let y = topo - 38; y < topo; y += 7) {
    p.retangulo(0, y, LARGURA, 1, ajustar(cor, -0.28));
  }
  for (let x = 8; x < LARGURA; x += 24) {
    if (rnd() < 0.7) {
      p.retangulo(x, topo - 30, 3, 9, ajustar(paleta.luz, -0.25));
      p.retangulo(x, topo - 30, 3, 3, paleta.luz);
    }
  }
};

/** Área 5: pilares altíssimos que somem no alto, e um trono ao longe. */
const trono: Desenhador = (p, paleta, cor, rnd, topo) => {
  for (let x = 10; x < LARGURA; x += 34) {
    const largura = 9;
    p.retangulo(x, 0, largura, topo, cor);
    p.retangulo(x + largura - 2, 0, 2, topo, ajustar(cor, -0.3));
    p.retangulo(x, 0, 2, topo, ajustar(cor, 0.22));
    for (let y = 6; y < topo; y += 11) p.retangulo(x, y, largura, 1, ajustar(cor, -0.35));
    /*
     * O archote fica **preso** ao pilar, e derrama luz nele.
     *
     * Solto no ar ele lia como um adesivo quadrado flutuando na frente do
     * cenário. Encostado, com o halo caindo sobre a pedra ao lado, ele vira
     * a razão de aquele trecho de pilar estar mais claro.
     */
    if (rnd() < 0.55) {
      const fogoY = 16 + Math.round(rnd() * 26);
      p.retangulo(x + largura, fogoY, 1, 2, ajustar(cor, -0.4));
      p.retangulo(x + largura + 1, fogoY - 1, 1, 2, paleta.particula);
      for (let dy = -4; dy <= 5; dy += 1) {
        const queda = 1 - Math.abs(dy) / 6;
        for (let dx = -2; dx <= 3; dx += 1) {
          const alvo = pincelLer(p, x + largura + dx, fogoY + dy);
          if (alvo === null) continue;
          p.pixel(x + largura + dx, fogoY + dy, misturar(alvo, paleta.luz, queda * 0.3));
        }
      }
    }
  }
  /* A silhueta do trono, bem ao fundo e sem detalhe: promessa, não objeto. */
  const cx = Math.round(LARGURA * 0.5);
  p.retangulo(cx - 12, topo - 30, 24, 30, ajustar(cor, -0.25));
  p.retangulo(cx - 16, topo - 46, 32, 18, ajustar(cor, -0.35));
  p.retangulo(cx - 2, topo - 52, 4, 8, paleta.luz);
};

const POR_AREA: readonly Desenhador[] = [ruinas, catacumbas, profundezas, fortaleza, trono];

/** Uma camada de parallax, já empurrada para longe pela névoa. */
const camada = (
  paleta: PaletaDeArea,
  area: number,
  corBase: string,
  distancia: number,
  semente: number,
  /**
   * Onde o chão desta camada fica.
   *
   * É o que separa uma camada da outra. Na primeira versão as duas usavam a
   * mesma linha de base e o mesmo tamanho, então elas se sobrepunham
   * exatamente e liam como uma camada só. A camada distante apoia **mais
   * alto** e desenha menor: é assim que a distância aparece.
   */
  linhaDoChao: number,
): Tela => {
  const { tela, pincel } = criarTela(LARGURA, ALTURA);
  const rnd = aleatorio(semente);
  const desenhar = POR_AREA[area - 1] ?? ruinas;
  /*
   * A névoa entra **na cor**, antes do desenho, e não como um véu por cima.
   * Véu por cima apaga o contorno junto e a camada perde forma; misturado na
   * cor, o objeto continua legível, só que distante.
   */
  const cor = misturar(corBase, paleta.neblina, distancia * 0.55);
  desenhar(pincel, paleta, cor, rnd, linhaDoChao);
  granular(pincel, semente, 0.09);
  if (distancia < 0.5) contornar(pincel, 0.3);
  return tela;
};

/** O chão: uma faixa com pedras, rachaduras e uma aresta de luz no topo. */
const desenharChao = (paleta: PaletaDeArea, semente: number): Tela => {
  const altura = 26;
  const { tela, pincel } = criarTela(LARGURA, altura);
  const rnd = aleatorio(semente);
  pincel.retangulo(0, 0, LARGURA, altura, paleta.chao);
  /* A aresta de luz no topo: é ela que separa o chão do fundo. */
  pincel.retangulo(0, 0, LARGURA, 1, ajustar(paleta.chaoDetalhe, 0.3));
  pincel.retangulo(0, 1, LARGURA, 1, paleta.chaoDetalhe);
  for (let i = 0; i < 90; i += 1) {
    const x = Math.round(rnd() * LARGURA);
    const y = 3 + Math.round(rnd() * (altura - 4));
    const comprimento = 1 + Math.round(rnd() * 3);
    const claro = rnd() < 0.45;
    pincel.retangulo(x, y, comprimento, 1, ajustar(paleta.chao, claro ? 0.16 : -0.22));
  }
  /* Rachaduras: linhas curtas e quebradas, nunca retas. */
  for (let i = 0; i < 7; i += 1) {
    let x = Math.round(rnd() * LARGURA);
    let y = 4 + Math.round(rnd() * 6);
    for (let passo = 0; passo < 8; passo += 1) {
      pincel.pixel(x, y, ajustar(paleta.chao, -0.45));
      x += rnd() < 0.5 ? 1 : 0;
      y += rnd() < 0.35 ? 1 : 0;
    }
  }
  granular(pincel, semente + 5, 0.12);
  return tela;
};

export const gerarCenario = (paleta: PaletaDeArea, area: number): Cenario => ({
  distante: desenharCeu(paleta),
  /* A camada de trás apoia bem mais alto: é o horizonte, não a parede ao lado. */
  medio: camada(paleta, area, paleta.fundoDistante, 0.78, area * 31 + 3, Math.round(ALTURA * 0.6)),
  proximo: camada(paleta, area, paleta.fundoMedio, 0.26, area * 57 + 11, ALTURA - 6),
  chao: desenharChao(paleta, area * 97 + 7),
  largura: LARGURA,
  altura: ALTURA,
});

export const LARGURA_DO_AZULEJO = LARGURA;
export const ALTURA_DO_AZULEJO = ALTURA;
