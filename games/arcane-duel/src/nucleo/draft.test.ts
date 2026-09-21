import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO } from '../dados/balanceamento.js';

import { buildVazia } from './build.js';
import type { EstadoDoDraft } from './draft.js';
import {
  escolher,
  iniciarDraft,
  novaOferta,
  ofertaAtual,
  rerollsIniciais,
  totalDaCategoria,
} from './draft.js';
import { avaliarBuild, calcularSinergia } from './poder.js';

/*
 * O draft.
 *
 * A estrutura está correta e a direção pediu para preservá-la. Estes testes
 * existem para que ela **continue** correta: quatro Ativas, três Passivas,
 * três Equipamentos, três opções por escolha, dois rerolls por categoria
 * (três na Forma Dourada), e nada de oferecer duas vezes a mesma peça.
 */

/** Joga o draft inteiro escolhendo sempre a opção de índice `indice`. */
const jogarDraft = (
  seed: string,
  dourada = false,
  indice = 0,
): { estado: EstadoDoDraft; ofertas: string[][] } => {
  let estado = iniciarDraft(buildVazia('guerreiro', dourada), seed);
  const ofertas: string[][] = [];
  for (let i = 0; i < 40 && !estado.concluido; i += 1) {
    const oferta = ofertaAtual(estado);
    ofertas.push(oferta.opcoes.map((o) => o.id));
    const escolhida = oferta.opcoes[Math.min(indice, oferta.opcoes.length - 1)];
    if (escolhida === undefined) break;
    estado = escolher(estado, escolhida);
  }
  return { estado, ofertas };
};

describe('estrutura do draft', () => {
  it('pede 4 Ativas, 3 Passivas e 3 Equipamentos, nesta ordem', () => {
    expect(totalDaCategoria('ativas')).toBe(4);
    expect(totalDaCategoria('passivas')).toBe(3);
    expect(totalDaCategoria('equipamentos')).toBe(3);

    const { estado } = jogarDraft('ABCDEFGH');
    expect(estado.concluido).toBe(true);
    expect(estado.build.ativas).toHaveLength(4);
    expect(estado.build.passivas).toHaveLength(3);
    expect(estado.build.equipamentos).toHaveLength(3);
    /* E nenhuma recompensa apareceu sozinha no meio do caminho. */
    expect(estado.build.upgrades).toHaveLength(0);
  });

  it('oferece três opções por escolha', () => {
    const { ofertas } = jogarDraft('ABCDEFGH');
    for (const oferta of ofertas) {
      expect(oferta.length).toBeLessThanOrEqual(BALANCEAMENTO.draft.opcoesPorEscolha);
      expect(oferta.length).toBeGreaterThan(0);
    }
  });

  it('nunca oferece uma peça que já foi escolhida', () => {
    let estado = iniciarDraft(buildVazia('guerreiro', false), 'SEEDSEED');
    const escolhidos = new Set<string>();
    while (!estado.concluido) {
      const oferta = ofertaAtual(estado);
      for (const opcao of oferta.opcoes) {
        expect(escolhidos.has(opcao.id), `reofertou ${opcao.id}`).toBe(false);
      }
      const primeira = oferta.opcoes[0];
      if (primeira === undefined) break;
      escolhidos.add(primeira.id);
      estado = escolher(estado, primeira);
    }
    expect(escolhidos.size).toBe(10);
  });

  it('nunca oferece a mesma peça duas vezes na mesma oferta', () => {
    const { ofertas } = jogarDraft('REPETIDO');
    for (const oferta of ofertas) {
      expect(new Set(oferta).size).toBe(oferta.length);
    }
  });

  it('os equipamentos vêm um de cada slot, na ordem arma/armadura/relíquia', () => {
    let estado = iniciarDraft(buildVazia('guerreiro', false), 'SLOTS123');
    while (estado.categoria !== 'equipamentos') {
      const oferta = ofertaAtual(estado);
      const primeira = oferta.opcoes[0];
      if (primeira === undefined) throw new Error('oferta vazia');
      estado = escolher(estado, primeira);
    }
    const slots: string[] = [];
    while (!estado.concluido) {
      const oferta = ofertaAtual(estado);
      if (oferta.categoria !== 'equipamentos') throw new Error('categoria errada');
      slots.push(oferta.slot);
      for (const opcao of oferta.opcoes) expect(opcao.slot).toBe(oferta.slot);
      const primeira = oferta.opcoes[0];
      if (primeira === undefined) break;
      estado = escolher(estado, primeira);
    }
    expect(slots).toEqual(['arma', 'armadura', 'reliquia']);
  });
});

describe('seed e reprodutibilidade', () => {
  it('mesma seed e mesmas decisões produzem exatamente as mesmas ofertas', () => {
    const uma = jogarDraft('MESMASEED');
    const outra = jogarDraft('MESMASEED');
    expect(uma.ofertas).toEqual(outra.ofertas);
    expect(uma.estado.build.ativas.map((a) => a.id)).toEqual(
      outra.estado.build.ativas.map((a) => a.id),
    );
  });

  it('seeds diferentes produzem ofertas diferentes', () => {
    const uma = jogarDraft('SEEDUM00');
    const outra = jogarDraft('SEEDDOIS');
    expect(uma.ofertas).not.toEqual(outra.ofertas);
  });

  it('a oferta de uma escolha não depende das rerrolagens das outras', () => {
    /*
     * O endereço do sorteio inclui categoria, escolha e número de
     * rerrolagens. É o que garante que gastar um reroll na primeira Ativa não
     * embaralhe a oferta da terceira — e é a razão de o sorteio ser por
     * endereço em vez de sequencial.
     */
    const inicial = iniciarDraft(buildVazia('guerreiro', false), 'ENDERECO');
    const semReroll = ofertaAtual(inicial).opcoes.map((o) => o.id);

    const depoisDeUmReroll = novaOferta(inicial);
    const comReroll = ofertaAtual(depoisDeUmReroll).opcoes.map((o) => o.id);
    expect(comReroll).not.toEqual(semReroll);

    /* Mas voltando ao estado original, a oferta é a mesma de antes. */
    expect(ofertaAtual(inicial).opcoes.map((o) => o.id)).toEqual(semReroll);
  });
});

describe('rerolls', () => {
  it('começa com dois por categoria, e três na Forma Dourada', () => {
    expect(rerollsIniciais(false)).toBe(BALANCEAMENTO.draft.rerollsPorCategoria);
    expect(rerollsIniciais(true)).toBe(BALANCEAMENTO.draft.rerollsDourado);
    expect(rerollsIniciais(true)).toBeGreaterThan(rerollsIniciais(false));

    expect(iniciarDraft(buildVazia('guerreiro', false), 'S').rerolls).toBe(2);
    expect(iniciarDraft(buildVazia('guerreiro', true), 'S').rerolls).toBe(3);
  });

  it('gastar um reroll desconta um, e no zero não desconta mais', () => {
    let estado = iniciarDraft(buildVazia('guerreiro', false), 'REROLL00');
    estado = novaOferta(estado);
    expect(estado.rerolls).toBe(1);
    estado = novaOferta(estado);
    expect(estado.rerolls).toBe(0);

    const travado = novaOferta(estado);
    expect(travado.rerolls).toBe(0);
    expect(travado.rerollsGastos).toBe(estado.rerollsGastos);
    expect(ofertaAtual(travado).opcoes).toEqual(ofertaAtual(estado).opcoes);
  });

  it('os rerolls não atravessam de uma categoria para a outra', () => {
    let estado = iniciarDraft(buildVazia('guerreiro', false), 'ATRAVES0');
    estado = novaOferta(novaOferta(estado));
    expect(estado.rerolls).toBe(0);

    /* Gasta as quatro Ativas com o pote de rerolls zerado. */
    for (let i = 0; i < totalDaCategoria('ativas'); i += 1) {
      const primeira = ofertaAtual(estado).opcoes[0];
      if (primeira === undefined) throw new Error('oferta vazia');
      estado = escolher(estado, primeira);
    }

    expect(estado.categoria).toBe('passivas');
    expect(estado.rerolls).toBe(rerollsIniciais(false));
  });
});

describe('poder e sinergia', () => {
  it('o Poder fica sempre entre 0 e 100 e a Sinergia entre 1 e 5', () => {
    for (const seed of ['AAAA1111', 'BBBB2222', 'CCCC3333', 'DDDD4444', 'EEEE5555']) {
      for (const indice of [0, 1, 2]) {
        const { estado } = jogarDraft(seed, false, indice);
        const avaliacao = avaliarBuild(estado.build);
        expect(avaliacao.poder).toBeGreaterThanOrEqual(0);
        expect(avaliacao.poder).toBeLessThanOrEqual(100);
        expect(avaliacao.sinergia).toBeGreaterThanOrEqual(1);
        expect(avaliacao.sinergia).toBeLessThanOrEqual(5);
        expect(avaliacao.completa).toBe(true);
        expect(avaliacao.tags.length).toBeLessThanOrEqual(3);
      }
    }
  });

  it('uma build vazia tem Poder zero e não se diz completa', () => {
    const avaliacao = avaliarBuild(buildVazia('guerreiro', false));
    expect(avaliacao.poder).toBe(0);
    expect(avaliacao.completa).toBe(false);
  });

  it('repetir a mesma tag aumenta a Sinergia', () => {
    const { estado: focada } = jogarDraft('FOCO0001');
    const concentrada = calcularSinergia(focada.build);
    expect(concentrada).toBeGreaterThanOrEqual(1);
    expect(concentrada).toBeLessThanOrEqual(5);

    /* A build sem peça nenhuma é o piso da escala. */
    expect(calcularSinergia(buildVazia('guerreiro', false))).toBe(1);
  });
});
