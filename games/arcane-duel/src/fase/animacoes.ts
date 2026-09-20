import type { Classe, SilhuetaDoInimigo } from '../dados/tipos.js';

import * as guerreiro from './arte/guerreiro.js';
import * as saqueador from './arte/saqueador.js';
import { gerarInimigo } from './atores.js';

/*
 * O elenco da cena.
 *
 * Este módulo é a fronteira entre "quem é este ator" e "que quadros a cena
 * desenha". A cena não sabe se o Guerreiro tem nove animações e o Lobo tem
 * três; ela pede `ataque` e recebe quadros. É o que permite trocar um
 * placeholder por arte final sem tocar em uma linha de Phaser.
 *
 * Nem todo ator tem todas as animações, e isso é deliberado: pedir nove
 * animações de cada inimigo antes de saber se a direção de arte está certa é
 * como fazer quarenta sprites ruins. Quem não tem uma animação cai na mais
 * próxima, declarada aqui em um lugar só.
 */

export type NomeDeAnimacao =
  | 'repouso'
  | 'andar'
  | 'ataque'
  | 'habilidade'
  | 'apanhar'
  | 'pocao'
  | 'subir-de-nivel'
  | 'morrer'
  | 'vitoria';

export interface Animacao {
  readonly quadros: readonly HTMLCanvasElement[];
  readonly fps: number;
  /** Uma animação que repete toca para sempre; a outra segura o último quadro. */
  readonly repete: boolean;
}

export interface Elenco {
  readonly largura: number;
  readonly altura: number;
  /** A linha do pé dentro do quadro: é por ela que o ator encosta no chão. */
  readonly chao: number;
  /**
   * Quantas vezes ampliar.
   *
   * A arte nova já nasce no tamanho certo da cena e vale 1. Os placeholders
   * foram desenhados numa grade muito menor e precisam ser ampliados para
   * ficarem ao lado do Guerreiro sem parecerem miniaturas — o que é feio, mas
   * é honesto: ampliar um placeholder deixa óbvio que ele é um placeholder.
   */
  readonly escala: number;
  readonly animacoes: Readonly<Partial<Record<NomeDeAnimacao, Animacao>>>;
  /** Para onde cai quem não tem a animação pedida. */
  readonly substituta: Readonly<Record<NomeDeAnimacao, NomeDeAnimacao>>;
}

const CICLICAS: ReadonlySet<NomeDeAnimacao> = new Set<NomeDeAnimacao>(['repouso', 'andar']);

/** A altura que um ator normal ocupa na cena, em pixels de arte. */
const ALTURA_ALVO = 56;

const SUBSTITUTA: Readonly<Record<NomeDeAnimacao, NomeDeAnimacao>> = {
  repouso: 'repouso',
  andar: 'repouso',
  ataque: 'repouso',
  habilidade: 'ataque',
  apanhar: 'repouso',
  pocao: 'repouso',
  'subir-de-nivel': 'repouso',
  morrer: 'apanhar',
  vitoria: 'repouso',
};

/**
 * O Guerreiro.
 *
 * Nove animações, todas geradas a partir do mesmo boneco articulado: o que
 * muda entre elas é a pose de cada peça, quadro a quadro. A Forma Dourada não
 * é um segundo sprite, é a mesma geometria com a rampa de aço trocada pela de
 * ouro — e é por isso que ela nunca sai de registro com a normal.
 */
const elencoDoGuerreiro = (dourado: boolean): Elenco => {
  const opcoes = { dourado };
  const animacoes: Partial<Record<NomeDeAnimacao, Animacao>> = {};
  const nomes: readonly guerreiro.NomeDaAnimacao[] = [
    'repouso',
    'andar',
    'ataque',
    'habilidade',
    'apanhar',
    'pocao',
    'subir-de-nivel',
    'morrer',
    'vitoria',
  ];
  for (const nome of nomes) {
    animacoes[nome] = {
      quadros: guerreiro.gerarAnimacao(nome, opcoes),
      fps: guerreiro.RITMO[nome],
      repete: CICLICAS.has(nome),
    };
  }
  return {
    largura: guerreiro.LARGURA,
    altura: guerreiro.ALTURA,
    chao: guerreiro.CHAO,
    escala: 1,
    animacoes,
    substituta: SUBSTITUTA,
  };
};

/** O Saqueador: quatro animações, silhueta curvada, adaga. */
const elencoDoSaqueador = (): Elenco => {
  const animacoes: Partial<Record<NomeDeAnimacao, Animacao>> = {};
  for (const nome of ['repouso', 'ataque', 'apanhar', 'morrer'] as const) {
    animacoes[nome] = {
      quadros: saqueador.gerarAnimacao(nome),
      fps: saqueador.RITMO[nome],
      repete: CICLICAS.has(nome),
    };
  }
  return {
    largura: saqueador.LARGURA,
    altura: saqueador.ALTURA,
    chao: saqueador.CHAO,
    escala: 1,
    animacoes,
    substituta: SUBSTITUTA,
  };
};

/**
 * O elenco provisório.
 *
 * Os inimigos que ainda não ganharam arte própria continuam saindo do
 * gerador de silhuetas: três poses, contorno, granulado. Eles são
 * **placeholder declarado**, e o lugar onde isso está escrito é aqui — não
 * espalhado pela cena.
 */
const elencoProvisorio = (silhueta: SilhuetaDoInimigo, id: string): Elenco => {
  const ator = gerarInimigo(silhueta, id);
  const [repouso, respiro, golpe] = ator.quadros;
  if (repouso === undefined || respiro === undefined || golpe === undefined) {
    throw new Error('ator sem quadros');
  }
  return {
    largura: ator.largura,
    altura: ator.altura,
    chao: ator.altura,
    /*
     * A escala vem da **altura alvo**, não de um número fixo.
     *
     * Os placeholders foram desenhados em grades muito diferentes entre si —
     * de 22 a 44 pixels de altura. Ampliar todos pelo mesmo fator fazia um
     * lobo caber na mão do Guerreiro e uma aberração encher a tela inteira.
     * Aqui todos chegam perto da altura de um ator da cena.
     */
    escala: Math.max(1, Math.min(2.6, ALTURA_ALVO / ator.altura)),
    animacoes: {
      repouso: { quadros: [repouso, respiro], fps: 2.4, repete: true },
      ataque: { quadros: [golpe, golpe, repouso], fps: 10, repete: false },
      apanhar: { quadros: [repouso], fps: 8, repete: false },
      morrer: { quadros: [repouso], fps: 8, repete: false },
    },
    substituta: SUBSTITUTA,
  };
};

export const elencoDoHeroi = (classe: Classe, dourado: boolean): Elenco =>
  classe.id === 'guerreiro'
    ? elencoDoGuerreiro(dourado)
    : elencoProvisorio(
        {
          forma: 'humanoide',
          corpo: dourado ? '#8a6b22' : classe.corSecundaria,
          detalhe: dourado ? '#d9ad48' : classe.corPrimaria,
          brilho: dourado ? '#ffe9a8' : classe.corPrimaria,
          largura: 20,
          altura: 30,
        },
        `heroi:${classe.id}:${String(dourado)}`,
      );

export const elencoDoInimigo = (silhueta: SilhuetaDoInimigo, id: string): Elenco =>
  id === 'i-saqueador' ? elencoDoSaqueador() : elencoProvisorio(silhueta, id);

/** Resolve o pedido da cena até uma animação que existe de verdade. */
export const animacaoDe = (elenco: Elenco, nome: NomeDeAnimacao): Animacao => {
  let atual = nome;
  for (let i = 0; i < 4; i += 1) {
    const achada = elenco.animacoes[atual];
    if (achada !== undefined) return achada;
    atual = elenco.substituta[atual];
  }
  const repouso = elenco.animacoes.repouso;
  if (repouso === undefined) throw new Error('elenco sem repouso');
  return repouso;
};
