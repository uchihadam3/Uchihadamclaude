import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO, faixaDePoder } from '../dados/balanceamento.js';
import { GUERREIRO_ATIVAS } from '../dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../dados/guerreiro-passivas.js';

import { build as montar, equipamento, passiva } from './apoio-de-teste.js';
import { buildVazia } from './build.js';
import { escolher, iniciarDraft, ofertaAtual } from './draft.js';
import { avaliarBuild, calcularSinergia, sinergiasCom } from './poder.js';
import { sortearEm } from './rng.js';

/*
 * Poder Estimado (0 a 100) e Sinergia (1 a 5).
 *
 * A direção pediu para **preservar** as duas leituras. Estes testes prendem o
 * contrato delas: os limites, a monotonia, e — o que motivou a correção — a
 * âncora. O medidor abria em 43 com zero escolhas porque somava os atributos
 * base da classe; a conta agora mede o que o draft acrescentou sobre essa
 * base, e o teste abaixo é o que impede a regressão.
 */

/** Joga o draft inteiro com um sorteio determinístico e devolve a curva. */
const curvaDoDraft = (seed: string): { poderes: number[]; build: ReturnType<typeof buildVazia> } => {
  let estado = iniciarDraft(buildVazia('guerreiro', false), seed);
  const rng = sortearEm(seed, 'curva');
  const poderes = [avaliarBuild(estado.build).poder];
  for (let i = 0; i < 40 && !estado.concluido; i += 1) {
    const oferta = ofertaAtual(estado);
    if (oferta.opcoes.length === 0) break;
    estado = escolher(estado, rng.escolher([...oferta.opcoes]));
    poderes.push(avaliarBuild(estado.build).poder);
  }
  return { poderes, build: estado.build };
};

describe('Poder Estimado', () => {
  it('uma build sem nenhuma escolha vale zero — o medidor não abre mentindo', () => {
    /*
     * Regressão. Antes da âncora isto devolvia 43: o jogador entrava no draft
     * e já lia "43 · Regular" sem ter escolhido nada, e as faixas "Fraca" e
     * "Regular" eram inalcançáveis por uma build de verdade.
     */
    const avaliacao = avaliarBuild(buildVazia('guerreiro', false));
    expect(avaliacao.poder).toBe(0);
    expect(avaliacao.faixa).toBe('Fraca');
    expect(avaliacao.completa).toBe(false);
  });

  it('fica dentro de 0 e 100 em toda build completa sorteada', () => {
    for (let s = 0; s < 60; s += 1) {
      const { build } = curvaDoDraft(`poder-${s}`);
      const avaliacao = avaliarBuild(build);
      expect(avaliacao.poder).toBeGreaterThanOrEqual(0);
      expect(avaliacao.poder).toBeLessThanOrEqual(100);
      expect(Number.isInteger(avaliacao.poder)).toBe(true);
    }
  });

  it('o medidor usa a faixa larga: builds completas espalham por dezenas de pontos', () => {
    /*
     * A medida que justificou a correção. Com a escala antiga as sessenta
     * builds caíam entre 61 e 79 — dezoito pontos de curso útil. O teste
     * exige curso largo e um piso acima do mínimo, para que o número
     * signifique alguma coisa quando muda.
     */
    const finais: number[] = [];
    for (let s = 0; s < 60; s += 1) finais.push(avaliarBuild(curvaDoDraft(`espalha-${s}`).build).poder);
    const menor = Math.min(...finais);
    const maior = Math.max(...finais);
    expect(maior - menor).toBeGreaterThan(25);
    expect(menor).toBeGreaterThan(20);
  });

  it('cada escolha do draft mexe no número', () => {
    const { poderes } = curvaDoDraft('curva-0007');
    expect(poderes[0]).toBe(0);
    const ultimo = poderes[poderes.length - 1] ?? 0;
    expect(ultimo).toBeGreaterThan(30);
    /* Nunca desce: uma peça a mais nunca é uma build pior no bruto. */
    for (let i = 1; i < poderes.length; i += 1) {
      expect(poderes[i] ?? 0).toBeGreaterThanOrEqual(poderes[i - 1] ?? 0);
    }
  });

  it('mais dano é mais Poder, mantido o resto', () => {
    const magra = montar({ equipamentos: [equipamento({ id: 'e-magra', modificadores: { danoPlano: 4 } })] });
    const forte = montar({ equipamentos: [equipamento({ id: 'e-forte', modificadores: { danoPlano: 40 } })] });
    expect(avaliarBuild(forte).poder).toBeGreaterThan(avaliarBuild(magra).poder);
  });

  it('mais Vida é mais Poder, mantido o resto', () => {
    const frágil = montar({ passivas: [passiva({ id: 'p-f', modificadores: { vidaMaxima: 5 } })] });
    const robusta = montar({ passivas: [passiva({ id: 'p-r', modificadores: { vidaMaxima: 250 } })] });
    expect(avaliarBuild(robusta).poder).toBeGreaterThan(avaliarBuild(frágil).poder);
  });

  it('as faixas cobrem a escala inteira, em ordem', () => {
    const faixas = BALANCEAMENTO.poder.faixas;
    expect(faixas[0].minimo).toBe(0);
    for (let i = 1; i < faixas.length; i += 1) {
      expect(faixas[i]?.minimo ?? 0).toBeGreaterThan(faixas[i - 1]?.minimo ?? 0);
    }
    expect(faixaDePoder(0)).toBe('Fraca');
    expect(faixaDePoder(100)).toBe('Excelente');
  });

  it('o Poder não prevê a vitória: sinergia pesa pouco aqui e muito na luta', () => {
    /*
     * Não é um teste de balanceamento, é o contrato de direção: a sinergia
     * entra no Poder com peso pequeno de propósito. Se alguém subir este peso
     * para "melhorar" o medidor, o jogo perde a descoberta.
     */
    expect(BALANCEAMENTO.poder.pesoDeSinergia).toBeLessThanOrEqual(0.2);
  });
});

describe('Sinergia', () => {
  it('fica entre 1 e 5 em qualquer build', () => {
    expect(calcularSinergia(buildVazia('guerreiro', false))).toBe(1);
    for (let s = 0; s < 40; s += 1) {
      const sinergia = calcularSinergia(curvaDoDraft(`sin-${s}`).build);
      expect(sinergia).toBeGreaterThanOrEqual(1);
      expect(sinergia).toBeLessThanOrEqual(BALANCEAMENTO.sinergia.maximo);
    }
  });

  it('uma tag que aparece uma só vez não é sinergia', () => {
    const espalhada = montar({
      passivas: [
        passiva({ id: 'a', tags: ['momentum'] }),
        passiva({ id: 'b', tags: ['defesa'] }),
        passiva({ id: 'c', tags: ['cura'] }),
      ],
    });
    expect(calcularSinergia(espalhada)).toBe(1);
  });

  it('concentrar na mesma tag sobe a Sinergia', () => {
    const concentrada = montar({
      passivas: [
        passiva({ id: 'a', tags: ['momentum'] }),
        passiva({ id: 'b', tags: ['momentum'] }),
        passiva({ id: 'c', tags: ['momentum'] }),
        passiva({ id: 'd', tags: ['momentum'] }),
      ],
    });
    expect(calcularSinergia(concentrada)).toBeGreaterThanOrEqual(2);

    const dobrada = montar({
      passivas: [
        ...concentrada.passivas,
        passiva({ id: 'e', tags: ['momentum'] }),
        passiva({ id: 'f', tags: ['momentum'] }),
      ],
    });
    expect(calcularSinergia(dobrada)).toBeGreaterThan(calcularSinergia(concentrada));
  });

  it('as peças reais do Guerreiro chegam à Sinergia máxima quando concentradas', () => {
    const doMomentum = GUERREIRO_ATIVAS.filter((a) => a.tags.includes('momentum'));
    const passivasDoMomentum = GUERREIRO_PASSIVAS.filter((p) => p.tags.includes('momentum'));
    const build = montar({ ativas: doMomentum, passivas: passivasDoMomentum });
    expect(calcularSinergia(build)).toBeGreaterThanOrEqual(3);
  });

  it('os upgrades de checkpoint contam na Sinergia', () => {
    const antes = montar({ passivas: [passiva({ id: 'a', tags: ['defesa'] })] });
    const depois = montar({
      passivas: antes.passivas,
      upgrades: [
        passiva({ id: 'u1', tags: ['defesa'] }),
        passiva({ id: 'u2', tags: ['defesa'] }),
        passiva({ id: 'u3', tags: ['defesa'] }),
        passiva({ id: 'u4', tags: ['defesa'] }),
      ],
    });
    expect(calcularSinergia(depois)).toBeGreaterThan(calcularSinergia(antes));
  });

  it('sinergiasCom conta as peças que já falam a mesma língua', () => {
    const build = montar({
      passivas: [passiva({ id: 'a', tags: ['momentum'] }), passiva({ id: 'b', tags: ['momentum'] })],
    });
    expect(sinergiasCom(build, ['momentum'])).toBe(2);
    expect(sinergiasCom(build, ['cura'])).toBe(0);
  });

  it('a lista de tags principais tem no máximo três', () => {
    const { build } = curvaDoDraft('tags-001');
    expect(avaliarBuild(build).tags.length).toBeLessThanOrEqual(3);
  });
});
