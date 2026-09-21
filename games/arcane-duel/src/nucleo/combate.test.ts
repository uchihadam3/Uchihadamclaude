import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO } from '../dados/balanceamento.js';

import { atributosDaBuild } from './build.js';
import type { Contexto, EstadoDeCombate } from './combate.js';
import { abrirCombate, passo } from './combate.js';
import { DT } from './relogio.js';
import { build, habilidade, inimigo, passiva, rngFixo, semCritico } from './apoio-de-teste.js';

/*
 * O motor, sob teste.
 *
 * Estes testes não abrem navegador e não tocam em componente nenhum. Eles
 * existem porque "tem código para isso" não é a mesma coisa que "isso
 * funciona", e a diferença entre as duas só aparece quando alguém mede.
 *
 * A montagem é sempre a mesma: uma build mínima e controlada, um inimigo
 * mínimo e controlado, e um gerador que não crita. Assim, quando um número
 * sai errado, ele sai errado por um motivo só.
 */

/** Um cenário cru: o jogador com exatamente esta Vida e esta Armadura. */
const cenario = (opcoes: {
  vida?: number;
  vidaMaxima?: number;
  armadura?: number;
  danoDoInimigo?: number;
  intervaloS?: number;
  regeneracaoDeArmadura?: number;
  reducaoDeDano?: number;
}): { estado: EstadoDeCombate; contexto: Contexto } => {
  const vidaMaxima = opcoes.vidaMaxima ?? 100;
  const armadura = opcoes.armadura ?? 0;
  /*
   * A Vida e a Armadura vêm dos modificadores, e não de um nível alto: assim
   * o teste declara o número que quer em vez de descobrir qual nível produz
   * aquele número.
   */
  const base = atributosDaBuild(build(), 1);
  const corpo = build({
    passivas: [
      passiva({
        id: 'p-corpo',
        modificadores: {
          vidaMaxima: vidaMaxima - base.vidaMaxima,
          armaduraMaxima: armadura - base.armaduraMaxima,
          regeneracaoDeArmadura:
            (opcoes.regeneracaoDeArmadura ?? 0) - BALANCEAMENTO.jogador.regeneracaoDeArmaduraPorS,
          reducaoDeDano: opcoes.reducaoDeDano ?? 0,
        },
      }),
    ],
  });

  const alvo = inimigo({
    id: 'i-teste',
    vida: 10_000,
    armadura: 0,
    dano: opcoes.danoDoInimigo ?? 0,
    intervaloS: opcoes.intervaloS ?? 1,
  });

  const atributos = atributosDaBuild(corpo, 1);
  const estado = abrirCombate(
    corpo,
    alvo,
    { vida: opcoes.vida ?? vidaMaxima, pocoes: 0, nivel: 1, exp: 0 },
    10,
  );
  return { estado, contexto: { build: corpo, atributos, rng: semCritico() } };
};

/** Roda até o inimigo bater `quantos` vezes, e devolve o estado final. */
const ate = (
  inicio: EstadoDeCombate,
  contexto: Contexto,
  segundos: number,
): EstadoDeCombate => {
  let estado = inicio;
  for (let t = 0; t < segundos; t += DT) {
    if (estado.terminou) break;
    estado = passo(estado, contexto, DT).estado;
  }
  return estado;
};

describe('vida e armadura do jogador', () => {
  it('CASO A · sem Armadura, o dano entra inteiro na Vida', () => {
    const { estado, contexto } = cenario({ vida: 100, armadura: 0, danoDoInimigo: 10 });
    expect(estado.jogador.armadura).toBe(0);
    /* O primeiro golpe sai em 60 % do intervalo; um segundo basta. */
    const depois = ate(estado, contexto, 1);
    expect(depois.jogador.vida).toBeCloseTo(90, 5);
  });

  it('CASO B · com Armadura de sobra, só a Armadura cai', () => {
    const { estado, contexto } = cenario({ vida: 100, armadura: 20, danoDoInimigo: 10 });
    const depois = ate(estado, contexto, 0.8);
    expect(depois.jogador.armadura).toBeCloseTo(10, 5);
    expect(depois.jogador.vida).toBeCloseTo(100, 5);
  });

  it('CASO C · Armadura insuficiente absorve o que dá, o resto vai para a Vida', () => {
    const { estado, contexto } = cenario({ vida: 100, armadura: 5, danoDoInimigo: 10 });
    const depois = ate(estado, contexto, 0.8);
    expect(depois.jogador.armadura).toBeCloseTo(0, 5);
    expect(depois.jogador.vida).toBeCloseTo(95, 5);
  });

  it('CASO F · Vida em zero encerra a luta com o inimigo como vencedor', () => {
    const { estado, contexto } = cenario({ vida: 12, armadura: 0, danoDoInimigo: 10 });
    const depois = ate(estado, contexto, 6);
    expect(depois.jogador.vida).toBe(0);
    expect(depois.terminou).toBe(true);
    expect(depois.vencedor).toBe('inimigo');
  });

  it('a Armadura regenera durante a luta, até o máximo e não além', () => {
    const { estado, contexto } = cenario({
      vida: 100,
      armadura: 20,
      danoDoInimigo: 0,
      regeneracaoDeArmadura: 2,
    });
    const meio = ate({ ...estado, jogador: { ...estado.jogador, armadura: 0 } }, contexto, 5);
    /* Dois por segundo durante cinco segundos, a menos de um passo de folga. */
    expect(meio.jogador.armadura).toBeGreaterThan(9.9);
    expect(meio.jogador.armadura).toBeLessThan(10.2);
    const cheio = ate(meio, contexto, 20);
    expect(cheio.jogador.armadura).toBeCloseTo(20, 5);
  });

  it('a Armadura começa cheia a cada luta, mas a Vida é a que sobrou', () => {
    const corpo = build();
    const atributos = atributosDaBuild(corpo, 1);
    const estado = abrirCombate(
      corpo,
      inimigo({ id: 'i' }),
      { vida: 37, pocoes: 1, nivel: 1, exp: 0 },
      10,
    );
    expect(estado.jogador.vida).toBe(37);
    expect(estado.jogador.armadura).toBe(atributos.armaduraMaxima);
    expect(estado.jogador.momentum).toBe(0);
  });
});

describe('dano do jogador contra o inimigo', () => {
  it('a Armadura do inimigo absorve antes da Vida dele', () => {
    const corpo = build({
      ativas: [habilidade({ id: 'a-bate', cooldownS: 999, efeitos: [{ tipo: 'dano', valor: 30 }] })],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({ id: 'i', vida: 200, armadura: 20, dano: 0 });
    const estado = abrirCombate(corpo, alvo, { vida: 100, pocoes: 0, nivel: 1, exp: 0 }, 10);
    const { estado: depois, eventos } = passo(estado, { build: corpo, atributos, rng: semCritico() }, DT);

    expect(depois.inimigo.armadura).toBe(0);
    expect(depois.inimigo.vida).toBeLessThan(200);
    expect(eventos.some((e) => e.tipo === 'armadura-quebrada')).toBe(true);
  });

  it('dano perfurante ignora a Armadura do inimigo', () => {
    const corpo = build({
      ativas: [
        habilidade({
          id: 'a-perfura',
          cooldownS: 999,
          efeitos: [{ tipo: 'dano-perfurante', valor: 10 }],
        }),
      ],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({ id: 'i', vida: 200, armadura: 500, dano: 0 });
    const estado = abrirCombate(corpo, alvo, { vida: 100, pocoes: 0, nivel: 1, exp: 0 }, 10);
    const depois = passo(estado, { build: corpo, atributos, rng: semCritico() }, DT).estado;

    expect(depois.inimigo.armadura).toBe(500);
    expect(depois.inimigo.vida).toBeLessThan(200);
  });

  it('o crítico multiplica, e o gerador decide quando', () => {
    const corpo = build({
      ativas: [habilidade({ id: 'a', cooldownS: 999, efeitos: [{ tipo: 'dano', valor: 20 }] })],
      passivas: [passiva({ id: 'p', modificadores: { chanceDeCritico: 1 } })],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({ id: 'i', vida: 500, armadura: 0, dano: 0 });
    const estado = abrirCombate(corpo, alvo, { vida: 100, pocoes: 0, nivel: 1, exp: 0 }, 10);

    const comCritico = passo(estado, { build: corpo, atributos, rng: rngFixo([0]) }, DT);
    const golpe = comCritico.eventos.find((e) => e.tipo === 'golpe');
    expect(golpe?.tipo === 'golpe' && golpe.critico).toBe(true);
    expect(500 - comCritico.estado.inimigo.vida).toBeCloseTo(
      (20 + atributos.dano * 0.35) * atributos.multiplicadorDeCritico,
      4,
    );
  });

  it('o sangramento tira Vida ao longo do tempo e depois acaba', () => {
    const corpo = build({
      ativas: [
        habilidade({
          id: 'a-sangra',
          cooldownS: 999,
          efeitos: [{ tipo: 'sangrar', valor: 10, duracaoS: 2 }],
        }),
      ],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({ id: 'i', vida: 1000, armadura: 0, dano: 0 });
    let estado = abrirCombate(corpo, alvo, { vida: 100, pocoes: 0, nivel: 1, exp: 0 }, 10);
    const ctx = { build: corpo, atributos, rng: semCritico() };

    estado = passo(estado, ctx, DT).estado;
    const vidaComSangramento = estado.inimigo.vida;
    for (let t = 0; t < 2; t += DT) estado = passo(estado, ctx, DT).estado;

    /* Dez por segundo durante dois segundos, mais o golpe básico pelo caminho. */
    expect(vidaComSangramento - estado.inimigo.vida).toBeGreaterThan(19);
    expect(estado.inimigo.sangramentos).toHaveLength(0);
  });

  it('o roubo de vida cura na proporção do que entrou na Vida do alvo', () => {
    const corpo = build({
      ativas: [habilidade({ id: 'a', cooldownS: 999, efeitos: [{ tipo: 'dano', valor: 40 }] })],
      passivas: [passiva({ id: 'p', modificadores: { roubodeVida: 0.5 } })],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({ id: 'i', vida: 500, armadura: 0, dano: 0 });
    const estado = abrirCombate(corpo, alvo, { vida: 10, pocoes: 0, nivel: 1, exp: 0 }, 10);
    const depois = passo(estado, { build: corpo, atributos, rng: semCritico() }, DT).estado;

    /*
     * O teto do roubo de vida é 0,35, e o teste confere contra o atributo
     * **já somado e cortado** — e não contra o 0,5 escrito na peça. Testar
     * contra o número da peça esconderia o teto em vez de provar que ele
     * existe.
     */
    expect(atributos.roubodeVida).toBe(0.35);
    const entrou = 500 - depois.inimigo.vida;
    expect(depois.jogador.vida).toBeCloseTo(10 + entrou * atributos.roubodeVida, 4);
  });

  it('a redução de dano diminui pela metade o que o inimigo entrega', () => {
    /*
     * Os dois lados do comparativo usam o **mesmo** cenário, com regeneração
     * de Armadura zerada. A primeira versão deste teste montou o lado com
     * redução à mão e esqueceu da regeneração: em 0,6 s ela devolvia 0,72 de
     * Armadura, que absorvia parte do golpe e fazia a conta fechar em 9,24 em
     * vez de 10. O motor estava certo; o teste é que media duas coisas.
     */
    const sem = cenario({ vida: 100, armadura: 0, danoDoInimigo: 20 });
    const perdidoSem = 100 - ate(sem.estado, sem.contexto, 0.8).jogador.vida;

    const com = cenario({ vida: 100, armadura: 0, danoDoInimigo: 20, reducaoDeDano: 0.5 });
    const perdidoCom = 100 - ate(com.estado, com.contexto, 0.8).jogador.vida;

    expect(perdidoSem).toBeCloseTo(20, 5);
    expect(perdidoCom).toBeCloseTo(10, 5);
  });
});
