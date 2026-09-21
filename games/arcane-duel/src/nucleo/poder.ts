import { BALANCEAMENTO, faixaDePoder } from '../dados/balanceamento.js';
import { classePorId } from '../dados/classes.js';
import type { Tag } from '../dados/tipos.js';

import type { BuildParcial, TagDaBuild } from './build.js';
import { atributosDaBuild, buildVazia, contarTags, tagsPrincipais } from './build.js';

/*
 * Poder Estimado e Sinergia.
 *
 * Duas leituras, e elas medem coisas diferentes de propósito.
 *
 * **Poder** olha os números: quanto a build bate, quanto aguenta, quanto se
 * repõe. É uma estimativa honesta do bruto.
 *
 * **Sinergia** olha as combinações: quantas peças falam a mesma língua.
 *
 * O ponto que a direção do jogo cobrou é que o Poder **não pode prever** a
 * vitória. E ele não prevê, por construção: a sinergia entra no Poder com
 * peso pequeno, mas no combate ela vale muito mais — três peças de Momentum
 * se multiplicam na luta de um jeito que nenhuma soma de atributos captura.
 * Por isso uma build de Poder 62 com Sinergia 5 costuma bater uma de Poder 74
 * com Sinergia 1, e é exatamente essa descoberta que faz o jogador aprender.
 */

export interface Avaliacao {
  /** 0 a 100. */
  readonly poder: number;
  readonly faixa: string;
  /** 1 a 5. */
  readonly sinergia: number;
  readonly tags: readonly TagDaBuild[];
  /** Quantas peças da última escolha conversaram com o que já existia. */
  readonly completa: boolean;
}

/** Uma curva que satura: cresce rápido no começo e desacelera perto do teto. */
const saturar = (valor: number, meio: number): number => valor / (valor + meio);

/**
 * A sinergia, de 1 a 5.
 *
 * A conta soma os **excedentes**: uma tag que aparece uma vez não é sinergia,
 * é só uma peça. A partir da segunda, cada repetição conta. É por isso que
 * espalhar dez peças por oito tags dá sinergia 1, e concentrar em duas dá 4
 * ou 5 — e é a lição que o jogo quer ensinar sem escrever em lugar nenhum.
 */
export const calcularSinergia = (parcial: BuildParcial): number => {
  let excedente = 0;
  for (const [, quantidade] of contarTags(parcial)) {
    if (quantidade >= 2) excedente += quantidade - 1;
  }
  const { degraus, maximo } = BALANCEAMENTO.sinergia;
  let nivel = 1;
  for (let i = 0; i < degraus.length; i += 1) {
    if (excedente >= (degraus[i] ?? 0)) nivel = i + 1;
  }
  return Math.min(maximo, Math.max(1, nivel));
};

/** As tags que a classe favorece contam um pouco mais no Poder. */
const bonusDeAfinidade = (parcial: BuildParcial, afinidades: readonly Tag[]): number => {
  const contagem = contarTags(parcial);
  let total = 0;
  for (const tag of afinidades) total += contagem.get(tag) ?? 0;
  return saturar(total, 6);
};

/**
 * O bruto: a soma ponderada, antes da escala.
 *
 * Separada de `avaliarBuild` porque a âncora precisa rodar a mesma conta sobre
 * uma build vazia da mesma classe.
 */
const brutoDaBuild = (parcial: BuildParcial): number => {
  const classe = classePorId(parcial.classe);
  const { poder: pesos } = BALANCEAMENTO;

  /*
   * O nível de referência.
   *
   * O Poder é medido no meio da run, e não no nível 1: é lá que a build
   * mostra o que é. Medir no nível 1 faria toda build parecer igual, porque
   * no começo os atributos base da classe dominam a soma.
   */
  const atributos = atributosDaBuild(parcial, 12);

  /* Ofensivo: dano por segundo aproximado das ativas escolhidas. */
  let danoPorSegundo = 0;
  for (const ativa of parcial.ativas) {
    let danoDaAtiva = 0;
    for (const efeito of ativa.efeitos) {
      if (efeito.tipo === 'dano' || efeito.tipo === 'dano-perfurante') danoDaAtiva += efeito.valor;
    }
    const cooldown = Math.max(0.5, ativa.cooldownS * (1 - atributos.reducaoDeCooldown));
    danoPorSegundo += danoDaAtiva / cooldown;
  }
  danoPorSegundo += atributos.dano * 0.35;
  danoPorSegundo *= 1 + atributos.chanceDeCritico * (atributos.multiplicadorDeCritico - 1);
  const ofensivo = saturar(danoPorSegundo, 26);

  /* Defensivo: o que a build aguenta, não só a Vida que ela tem. */
  const efetiva =
    (atributos.vidaMaxima + atributos.armaduraMaxima * 0.8) / (1 - atributos.reducaoDeDano);
  const defensivo = saturar(efetiva / 10, 34);

  /* Utilidade: o que mantém a build de pé entre uma luta e a seguinte. */
  const utilidade = saturar(
    atributos.roubodeVida * 40 +
      atributos.regeneracaoDeArmadura * 2 +
      atributos.potenciaDePocao * 18 +
      atributos.pocoesExtras * 6 +
      bonusDeAfinidade(parcial, classe.afinidades) * 8,
    16,
  );

  const sinergia = calcularSinergia(parcial);
  const sinergiaNormalizada = (sinergia - 1) / (BALANCEAMENTO.sinergia.maximo - 1);

  return (
    ofensivo * pesos.pesoOfensivo +
    defensivo * pesos.pesoDefensivo +
    utilidade * pesos.pesoDeUtilidade +
    sinergiaNormalizada * pesos.pesoDeSinergia
  );
};

/*
 * A âncora de cada classe: o bruto de uma build sem nenhuma escolha.
 *
 * Memorizada porque `avaliarBuild` roda a cada quadro da tela de draft.
 */
const ancoras = new Map<string, number>();
const ancoraDaClasse = (classe: BuildParcial['classe']): number => {
  const guardada = ancoras.get(classe);
  if (guardada !== undefined) return guardada;
  const valor = brutoDaBuild(buildVazia(classe, false));
  ancoras.set(classe, valor);
  return valor;
};

export const avaliarBuild = (parcial: BuildParcial): Avaliacao => {
  const { poder: pesos, draft } = BALANCEAMENTO;

  const acrescentado = brutoDaBuild(parcial) - ancoraDaClasse(parcial.classe);
  const poder = Math.max(0, Math.min(100, Math.round(acrescentado * pesos.escala)));
  const sinergia = calcularSinergia(parcial);

  const preenchidas =
    parcial.ativas.length + parcial.passivas.length + parcial.equipamentos.length;
  const total = draft.ativas + draft.passivas + draft.equipamentos;

  return {
    poder,
    faixa: faixaDePoder(poder),
    sinergia,
    tags: tagsPrincipais(parcial),
    completa: preenchidas === total,
  };
};

/**
 * Quantas peças da build conversam com uma candidata.
 *
 * É o que a oferta mostra discretamente — "2 sinergias com sua build". Não diz
 * qual é a melhor escolha; diz o que o jogador já teria visto sozinho se
 * tivesse decorado as dez peças que pegou.
 */
export const sinergiasCom = (parcial: BuildParcial, tags: readonly Tag[]): number => {
  const contagem = contarTags(parcial);
  let total = 0;
  for (const tag of tags) total += contagem.get(tag) ?? 0;
  return total;
};
