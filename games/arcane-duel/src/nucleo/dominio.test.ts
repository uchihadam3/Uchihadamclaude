import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO } from '../dados/balanceamento.js';

import type { DesempenhoNoBossFinal } from './dominio.js';
import { despertaOSoberano, notaDeDominio } from './dominio.js';

/*
 * O domínio secreto.
 *
 * O contrato é o da direção: o corte é alto, não exige um estilo, e não
 * aparece na interface. Estes testes prendem as três coisas — que a nota anda
 * nos três eixos, que despertar é raro, e que um desempenho perfeito desperta.
 */

const desempenho = (parcial: Partial<DesempenhoNoBossFinal> = {}): DesempenhoNoBossFinal => ({
  tempoS: 80,
  vidaRestante: 200,
  vidaMaxima: 400,
  pocoesRestantes: 1,
  pocoesMaximas: 3,
  ...parcial,
});

describe('a nota de domínio', () => {
  it('fica entre 0 e 1 em qualquer desempenho, inclusive absurdo', () => {
    const casos: DesempenhoNoBossFinal[] = [
      desempenho(),
      desempenho({ tempoS: 0, vidaRestante: 400, pocoesRestantes: 3 }),
      desempenho({ tempoS: 9999, vidaRestante: 1, pocoesRestantes: 0 }),
      desempenho({ vidaMaxima: 0, pocoesMaximas: 0 }),
      desempenho({ tempoS: -5, vidaRestante: 900, pocoesRestantes: 99 }),
    ];
    for (const caso of casos) {
      const nota = notaDeDominio(caso);
      expect(nota).toBeGreaterThanOrEqual(0);
      expect(nota).toBeLessThanOrEqual(1);
      expect(Number.isFinite(nota)).toBe(true);
    }
  });

  it('matar mais rápido nunca vale menos', () => {
    const rapido = notaDeDominio(desempenho({ tempoS: 40 }));
    const medio = notaDeDominio(desempenho({ tempoS: 80 }));
    const lento = notaDeDominio(desempenho({ tempoS: 140 }));
    expect(rapido).toBeGreaterThan(medio);
    expect(medio).toBeGreaterThan(lento);
  });

  it('terminar com mais Vida nunca vale menos', () => {
    expect(notaDeDominio(desempenho({ vidaRestante: 320 }))).toBeGreaterThan(
      notaDeDominio(desempenho({ vidaRestante: 120 })),
    );
  });

  it('gastar menos poções nunca vale menos', () => {
    expect(notaDeDominio(desempenho({ pocoesRestantes: 3 }))).toBeGreaterThan(
      notaDeDominio(desempenho({ pocoesRestantes: 0 })),
    );
  });

  it('os três pesos somam 1 — a nota é uma média, não uma soma solta', () => {
    const { pesoDeTempo, pesoDeVida, pesoDePocoes } = BALANCEAMENTO.dominio;
    expect(pesoDeTempo + pesoDeVida + pesoDePocoes).toBeCloseTo(1, 6);
  });
});

describe('despertar o Soberano', () => {
  it('um desempenho perfeito desperta', () => {
    expect(
      despertaOSoberano(
        desempenho({
          tempoS: BALANCEAMENTO.dominio.tempoExcelenteS - 10,
          vidaRestante: 400,
          vidaMaxima: 400,
          pocoesRestantes: 3,
          pocoesMaximas: 3,
        }),
      ),
    ).toBe(true);
  });

  it('uma vitória apertada não desperta', () => {
    expect(
      despertaOSoberano(
        desempenho({ tempoS: 150, vidaRestante: 30, vidaMaxima: 400, pocoesRestantes: 0 }),
      ),
    ).toBe(false);
  });

  it('uma vitória comum e boa não desperta — o segredo precisa ser raro', () => {
    expect(despertaOSoberano(desempenho({ tempoS: 70, vidaRestante: 240, pocoesRestantes: 1 }))).toBe(
      false,
    );
  });

  it('não exige um estilo: dá para despertar sendo rápido ou sendo intocado', () => {
    /*
     * Dois caminhos diferentes cruzam o corte. Se só um cruzasse, o domínio
     * estaria exigindo uma build, que é justamente o que a direção proibiu.
     */
    const veloz = desempenho({
      tempoS: 38,
      vidaRestante: 240,
      vidaMaxima: 400,
      pocoesRestantes: 2,
      pocoesMaximas: 3,
    });
    const intocado = desempenho({
      tempoS: 88,
      vidaRestante: 396,
      vidaMaxima: 400,
      pocoesRestantes: 3,
      pocoesMaximas: 3,
    });
    expect(notaDeDominio(veloz)).toBeGreaterThan(0.6);
    expect(notaDeDominio(intocado)).toBeGreaterThan(0.6);
    expect(despertaOSoberano(veloz) || despertaOSoberano(intocado)).toBe(true);
  });

  it('o corte é alto de propósito', () => {
    expect(BALANCEAMENTO.dominio.corte).toBeGreaterThanOrEqual(0.7);
  });

  it('a nota exatamente no corte desperta, e um fio abaixo não', () => {
    /*
     * Busca binária pelo tempo que põe a nota no corte: prende a comparação
     * `>=` contra alguém trocar por `>` sem querer.
     */
    const com = (tempoS: number): number =>
      notaDeDominio(desempenho({ tempoS, vidaRestante: 400, vidaMaxima: 400, pocoesRestantes: 3 }));
    let baixo = 0;
    let alto = 200;
    for (let i = 0; i < 60; i += 1) {
      const meio = (baixo + alto) / 2;
      if (com(meio) >= BALANCEAMENTO.dominio.corte) baixo = meio;
      else alto = meio;
    }
    expect(despertaOSoberano(desempenho({ tempoS: baixo, vidaRestante: 400, vidaMaxima: 400, pocoesRestantes: 3 }))).toBe(true);
    expect(despertaOSoberano(desempenho({ tempoS: alto + 1, vidaRestante: 400, vidaMaxima: 400, pocoesRestantes: 3 }))).toBe(false);
  });
});
