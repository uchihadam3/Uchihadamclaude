import { describe, expect, it } from 'vitest';

import { DT, MAXIMO_DE_PASSOS_POR_QUADRO, avancar, relogioNovo } from './relogio.js';

/*
 * O teste de regressão do defeito mais grave que o jogo teve.
 *
 * O laço antigo fazia `Math.round((delta * velocidade) / dt)` e descartava o
 * resto. Num telefone de 120 Hz em 1x a conta dava 0,25, que arredonda para
 * zero: a simulação ficava **parada**. Em 60 Hz dava exatamente 0,5, que
 * arredonda para 1, e 1x rodava ao dobro.
 *
 * Estes testes fixam o contrato: o tempo simulado por segundo real depende da
 * velocidade escolhida, e de mais nada.
 */

/** Roda um segundo de relógio de parede a uma dada taxa e soma o tempo simulado. */
const segundoSimulado = (hz: number, velocidade: number): number => {
  let relogio = relogioNovo();
  let passos = 0;
  for (let i = 0; i < hz; i += 1) {
    const avanco = avancar(relogio, 1 / hz, velocidade);
    relogio = avanco.relogio;
    passos += avanco.passos;
  }
  return passos * DT;
};

describe('relógio da simulação', () => {
  it('nunca fica parado, em nenhuma taxa de atualização', () => {
    for (const hz of [30, 60, 90, 120, 144, 165]) {
      for (const velocidade of [1, 2, 4]) {
        expect(segundoSimulado(hz, velocidade), `${String(hz)}Hz ${String(velocidade)}x`).toBeGreaterThan(0);
      }
    }
  });

  it('simula um segundo por segundo em 1x, qualquer que seja a taxa', () => {
    for (const hz of [30, 60, 90, 120, 144, 165]) {
      expect(segundoSimulado(hz, 1), `${String(hz)}Hz`).toBeCloseTo(1, 1);
    }
  });

  it('2x simula o dobro e 4x o quádruplo, em qualquer taxa', () => {
    for (const hz of [60, 90, 120, 144]) {
      expect(segundoSimulado(hz, 2), `${String(hz)}Hz 2x`).toBeCloseTo(2, 1);
      expect(segundoSimulado(hz, 4), `${String(hz)}Hz 4x`).toBeCloseTo(4, 1);
    }
  });

  it('não descarta a sobra: dez quadros curtos valem o mesmo que um longo', () => {
    let fino = relogioNovo();
    let passosFinos = 0;
    for (let i = 0; i < 10; i += 1) {
      const a = avancar(fino, 0.01, 1);
      fino = a.relogio;
      passosFinos += a.passos;
    }
    const grosso = avancar(relogioNovo(), 0.1, 1);
    expect(passosFinos).toBe(grosso.passos);
  });

  it('corta o salto de uma aba que voltou do segundo plano', () => {
    const avanco = avancar(relogioNovo(), 600, 4);
    expect(avanco.passos).toBe(MAXIMO_DE_PASSOS_POR_QUADRO);
    expect(avanco.cortou).toBe(true);
    /* E zera a sobra, para o quadro seguinte não nascer estourado de novo. */
    expect(avanco.relogio.sobra).toBe(0);
  });

  it('ignora delta negativo ou zero sem quebrar', () => {
    expect(avancar(relogioNovo(), -1, 1).passos).toBe(0);
    expect(avancar(relogioNovo(), 0, 1).passos).toBe(0);
  });
});
