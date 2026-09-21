import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { GUERREIRO_ATIVAS } from '../dados/guerreiro-ativas.js';
import { classePorId } from '../dados/classes.js';

import { atributosDaBuild } from './build.js';
import type { Contexto, EstadoDeCombate } from './combate.js';
import { abrirCombate, passo } from './combate.js';
import { DT } from './relogio.js';
import { build, inimigo, semCritico } from './apoio-de-teste.js';

/*
 * O Momentum, medido com as habilidades **reais** do Guerreiro.
 *
 * Os testes de Vida e Armadura usam peças sintéticas de propósito, para
 * isolar a regra. Aqui é o contrário: o que se quer provar é que o Machado
 * Partidor de verdade dá 1 de Momentum de verdade. Se alguém editar o número
 * na tabela, este teste é para quebrar.
 */

const ativa = (nome: string) => {
  const achada = GUERREIRO_ATIVAS.find((a) => a.nome === nome);
  if (achada === undefined) throw new Error(`ativa não encontrada: ${nome}`);
  return achada;
};

const MOMENTUM_MAXIMO = classePorId('guerreiro').recurso.maximo;

/** Abre uma luta com uma única ativa, contra um saco de pancadas inofensivo. */
const comAtiva = (
  nome: string,
  momentumInicial = 0,
): { estado: EstadoDeCombate; contexto: Contexto } => {
  const corpo = build({ ativas: [ativa(nome)] });
  const atributos = atributosDaBuild(corpo, 1);
  const alvo = inimigo({ id: 'i-saco', vida: 100_000, armadura: 100_000, dano: 0 });
  const aberto = abrirCombate(corpo, alvo, { vida: 999, pocoes: 0, nivel: 1, exp: 0 }, MOMENTUM_MAXIMO);
  return {
    estado: { ...aberto, jogador: { ...aberto.jogador, momentum: momentumInicial } },
    contexto: { build: corpo, atributos, rng: semCritico() },
  };
};

describe('momentum', () => {
  it('começa em zero a cada luta nova', () => {
    const corpo = build({ ativas: [ativa('Machado Partidor')] });
    const aberto = abrirCombate(
      corpo,
      inimigo({ id: 'i' }),
      { vida: 50, pocoes: 1, nivel: 3, exp: 0 },
      MOMENTUM_MAXIMO,
    );
    expect(aberto.jogador.momentum).toBe(0);
  });

  it.each([
    ['Machado Partidor', 1],
    ['Disciplina de Aço', 3],
    ['Fúria Crescente', 2],
    ['Interposição', 1],
    ['Sequência Brutal', 1],
  ])('%s gera %i de Momentum', (nome, esperado) => {
    const { estado, contexto } = comAtiva(nome);
    const { estado: depois, eventos } = passo(estado, contexto, DT);

    expect(depois.jogador.momentum).toBe(esperado);
    const ganho = eventos.find((e) => e.tipo === 'momentum');
    expect(ganho?.tipo === 'momentum' && ganho.valor).toBe(esperado);
  });

  it('nunca passa do máximo da classe', () => {
    const { estado, contexto } = comAtiva('Disciplina de Aço', MOMENTUM_MAXIMO - 1);
    const depois = passo(estado, contexto, DT).estado;
    expect(depois.jogador.momentum).toBe(MOMENTUM_MAXIMO);
  });

  it('o Golpe do Carrasco não sai abaixo do requisito', () => {
    const { estado, contexto } = comAtiva('Golpe do Carrasco', 2);
    const { estado: depois, eventos } = passo(estado, contexto, DT);

    expect(eventos.some((e) => e.tipo === 'habilidade')).toBe(false);
    expect(depois.jogador.momentum).toBe(2);
  });

  it('o Golpe do Carrasco sai com o requisito, escala com o Momentum e zera o recurso', () => {
    const fraco = comAtiva('Golpe do Carrasco', 3);
    const antesFraco = fraco.estado.inimigo.vida;
    const depoisFraco = passo(fraco.estado, fraco.contexto, DT);

    const forte = comAtiva('Golpe do Carrasco', MOMENTUM_MAXIMO);
    const antesForte = forte.estado.inimigo.vida;
    const depoisForte = passo(forte.estado, forte.contexto, DT);

    expect(depoisFraco.eventos.some((e) => e.tipo === 'habilidade')).toBe(true);
    expect(depoisForte.eventos.some((e) => e.tipo === 'habilidade')).toBe(true);

    /* Com mais Momentum, o golpe dói mais. */
    const danoFraco = antesFraco - depoisFraco.estado.inimigo.vida + (100_000 - depoisFraco.estado.inimigo.armadura);
    const danoForte = antesForte - depoisForte.estado.inimigo.vida + (100_000 - depoisForte.estado.inimigo.armadura);
    expect(danoForte).toBeGreaterThan(danoFraco);

    /* E consome tudo, nos dois casos. */
    expect(depoisFraco.estado.jogador.momentum).toBe(0);
    expect(depoisForte.estado.jogador.momentum).toBe(0);
  });

  it('a Fúria Crescente ganha o bônus condicional a partir de 5 de Momentum', () => {
    const semBonus = comAtiva('Fúria Crescente', 0);
    const comBonus = comAtiva('Fúria Crescente', 5);
    const danoDe = (c: { estado: EstadoDeCombate; contexto: Contexto }): number => {
      const antes = c.estado.inimigo.armadura;
      const depois = passo(c.estado, c.contexto, DT).estado;
      return antes - depois.inimigo.armadura;
    };
    expect(danoDe(comBonus)).toBeGreaterThan(danoDe(semBonus));
  });

  it('o evento de momentum chega para a apresentação em todo ganho', () => {
    const { estado, contexto } = comAtiva('Machado Partidor');
    let atual = estado;
    let eventosDeMomentum = 0;
    for (let t = 0; t < 20; t += DT) {
      const r = passo(atual, contexto, DT);
      atual = r.estado;
      eventosDeMomentum += r.eventos.filter((e) => e.tipo === 'momentum').length;
    }
    /* Cooldown de 6 s em 20 s: pelo menos três usos, logo três eventos. */
    expect(eventosDeMomentum).toBeGreaterThanOrEqual(3);
    expect(atual.jogador.momentum).toBe(eventosDeMomentum);
  });
});

describe('poções', () => {
  const cfg = BALANCEAMENTO.pocoes;

  /** Um jogador ferido, com poções, contra um inimigo que não bate. */
  const ferido = (vida: number, pocoes: number): { estado: EstadoDeCombate; contexto: Contexto } => {
    const corpo = build();
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({ id: 'i', vida: 100_000, armadura: 100_000, dano: 0 });
    const aberto = abrirCombate(corpo, alvo, { vida, pocoes, nivel: 1, exp: 0 }, 10);
    return { estado: aberto, contexto: { build: corpo, atributos, rng: semCritico() } };
  };

  it('usa uma poção abaixo do gatilho, cura a fração certa e desconta uma', () => {
    const corpo = build();
    const atributos = atributosDaBuild(corpo, 1);
    const vidaMaxima = atributos.vidaMaxima;
    const vidaInicial = vidaMaxima * (cfg.gatilhoDeVida - 0.05);

    const { estado, contexto } = ferido(vidaInicial, 3);
    const { estado: depois, eventos } = passo(estado, contexto, DT);

    expect(depois.jogador.pocoes).toBe(2);
    expect(depois.jogador.vida).toBeCloseTo(
      vidaInicial + vidaMaxima * atributos.potenciaDePocao,
      4,
    );
    expect(eventos.some((e) => e.tipo === 'pocao')).toBe(true);
  });

  it('não usa poção acima do gatilho', () => {
    const corpo = build();
    const vidaMaxima = atributosDaBuild(corpo, 1).vidaMaxima;
    const { estado, contexto } = ferido(vidaMaxima * (cfg.gatilhoDeVida + 0.05), 3);
    const depois = passo(estado, contexto, DT).estado;
    expect(depois.jogador.pocoes).toBe(3);
  });

  it('não gasta duas poções no mesmo instante: a recarga segura a segunda', () => {
    const corpo = build();
    const vidaMaxima = atributosDaBuild(corpo, 1).vidaMaxima;
    const { estado, contexto } = ferido(vidaMaxima * 0.05, 3);

    let atual = estado;
    for (let t = 0; t < cfg.recargaS - DT * 2; t += DT) {
      atual = passo(atual, contexto, DT).estado;
    }
    expect(atual.jogador.pocoes).toBe(2);
  });

  it('não usa poção sem poção', () => {
    const corpo = build();
    const vidaMaxima = atributosDaBuild(corpo, 1).vidaMaxima;
    const { estado, contexto } = ferido(vidaMaxima * 0.05, 0);
    const depois = passo(estado, contexto, DT).estado;
    expect(depois.jogador.pocoes).toBe(0);
    expect(depois.jogador.vida).toBeCloseTo(vidaMaxima * 0.05, 4);
  });

  it('não usa poção com a Vida já em zero', () => {
    const { estado, contexto } = ferido(0, 3);
    const depois = passo(estado, contexto, DT).estado;
    expect(depois.jogador.pocoes).toBe(3);
  });
});
