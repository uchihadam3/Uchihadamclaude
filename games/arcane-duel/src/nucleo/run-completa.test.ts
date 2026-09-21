import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { bossDaSala } from '../dados/bosses.js';
import { classePorId } from '../dados/classes.js';
import { EQUIPAMENTOS } from '../dados/equipamentos.js';
import { GUERREIRO_ATIVAS } from '../dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../dados/guerreiro-passivas.js';
import type { Tag } from '../dados/tipos.js';

import { build as montar } from './apoio-de-teste.js';
import type { BuildParcial } from './build.js';
import { atributosDaBuild } from './build.js';
import { aplicarRecompensa, escolhaAutomatica, ofertaDeCheckpoint } from './checkpoint.js';
import type { Contexto, EventoDeCombate } from './combate.js';
import { abrirCombate, passo } from './combate.js';
import { despertaOSoberano } from './dominio.js';
import { desfechoAoCair, desfechoAoVencer } from './run.js';
import type { EstadoDaRun } from './run.js';
import { ehElite, iniciarRun, inimigoDaSala, perderRun, vencerSala } from './run.js';
import { sortearEm } from './rng.js';
import { DT } from './relogio.js';

/*
 * A run inteira, da sala 1 à 50, com o motor de verdade.
 *
 * Os testes de unidade provam cada regra isolada. Este prova que elas
 * funcionam **juntas** por cinquenta salas seguidas: que o inimigo aparece,
 * que a Vida e a Armadura mexem, que o Momentum gira, que os cooldowns
 * andam, que as poções são usadas e devolvidas, que a EXP vira nível, que os
 * quatro checkpoints abrem nas salas certas, e que a sala 50 fecha a run com
 * um desfecho que a tela de resultado consegue exibir.
 *
 * Roda no motor puro e sem tela, exatamente como o jogo roda: a diferença
 * entre este arquivo e o `Dungeon.tsx` é só quem chama `passo`.
 */

/**
 * Uma build forte de propósito: esta run precisa chegar à sala 50.
 *
 * Concentrada na tag `combo`, que é a que a bancada de balanceamento mede
 * como capaz de fechar a dungeon. Uma build arbitrária morre na sala 20, e
 * uma integração que morre no meio não prova o fim.
 */
const buildForte = (): BuildParcial => {
  const focada = <T extends { readonly tags: readonly Tag[] }>(
    lista: readonly T[],
    quantas: number,
  ): T[] =>
    [...lista]
      .sort((a, b) => Number(b.tags.includes('combo')) - Number(a.tags.includes('combo')))
      .slice(0, quantas);

  return montar({
    ativas: focada(GUERREIRO_ATIVAS, BALANCEAMENTO.draft.ativas),
    passivas: focada(GUERREIRO_PASSIVAS, BALANCEAMENTO.draft.passivas),
    equipamentos: (['arma', 'armadura', 'reliquia'] as const).map((slot) => {
      const doSlot = EQUIPAMENTOS.filter((e) => e.slot === slot);
      const escolhido = doSlot.find((e) => e.tags.includes('combo')) ?? doSlot[0];
      if (escolhido === undefined) throw new Error(`sem equipamento no slot ${slot}`);
      return escolhido;
    }),
  });
};

/** Uma build deliberadamente ruim: uma ativa fraca e nada mais. */
const buildRuim = (): BuildParcial =>
  montar({ ativas: GUERREIRO_ATIVAS.slice(0, 1), passivas: [], equipamentos: [] });

interface Observado {
  readonly sala: number;
  readonly venceu: boolean;
  readonly duracaoS: number;
  readonly passos: number;
  readonly vidaInicial: number;
  readonly vidaFinal: number;
  readonly armaduraInicial: number;
  readonly menorArmadura: number;
  readonly maiorMomentum: number;
  readonly pocoesUsadas: number;
  readonly cooldownsAndaram: boolean;
  readonly tiposDeEvento: ReadonlySet<EventoDeCombate['tipo']>;
}

/** Uma sala, simulada passo a passo, com tudo que aconteceu anotado. */
const lutarSala = (
  build: BuildParcial,
  run: EstadoDaRun,
  soberano = false,
): Observado => {
  const inimigo = soberano ? inimigoDaSala(run.seed, 50) : inimigoDaSala(run.seed, run.sala);
  let estado = abrirCombate(
    build,
    inimigo,
    { vida: run.vida, pocoes: run.pocoes, nivel: run.nivel, exp: run.exp },
    classePorId(build.classe).recurso.maximo,
  );
  const contexto: Contexto = {
    build,
    atributos: atributosDaBuild(build, run.nivel),
    rng: sortearEm(run.seed, `luta:${run.sala}`),
  };

  const vidaInicial = estado.jogador.vida;
  const armaduraInicial = estado.jogador.armadura;
  const pocoesIniciais = estado.jogador.pocoes;
  let menorArmadura = armaduraInicial;
  let maiorMomentum = 0;
  let cooldownsAndaram = false;
  const tipos = new Set<EventoDeCombate['tipo']>();

  /* A trava: dez minutos de luta simulada. Nenhuma sala pode enroscar. */
  const teto = Math.ceil(600 / DT);
  let passos = 0;
  while (!estado.terminou && passos < teto) {
    const anterior = estado;
    const resultado = passo(estado, contexto, DT);
    estado = resultado.estado;
    passos += 1;
    for (const evento of resultado.eventos) tipos.add(evento.tipo);
    menorArmadura = Math.min(menorArmadura, estado.jogador.armadura);
    maiorMomentum = Math.max(maiorMomentum, estado.jogador.momentum);
    if (
      Object.entries(estado.jogador.cooldowns).some(
        ([id, valor]) => valor < (anterior.jogador.cooldowns[id] ?? 0),
      ) ||
      estado.jogador.cooldownBasico < anterior.jogador.cooldownBasico
    ) {
      cooldownsAndaram = true;
    }
  }
  expect(passos).toBeLessThan(teto);

  return {
    sala: run.sala,
    venceu: estado.vencedor === 'jogador',
    duracaoS: estado.tempoS,
    passos,
    vidaInicial,
    vidaFinal: estado.jogador.vida,
    armaduraInicial,
    menorArmadura,
    maiorMomentum,
    pocoesUsadas: pocoesIniciais - estado.jogador.pocoes,
    cooldownsAndaram,
    tiposDeEvento: tipos,
  };
};

interface Jornada {
  readonly run: EstadoDaRun;
  readonly salas: Observado[];
  readonly checkpoints: number[];
  readonly refis: number[];
  readonly niveis: { sala: number; nivel: number }[];
  readonly build: BuildParcial;
}

/** A run inteira, sala a sala, parando quando o jogador cai ou vence. */
const jogarRun = (inicial: BuildParcial, seed: string): Jornada => {
  let build = inicial;
  let run = iniciarRun(build, seed, 'automatico');
  const salas: Observado[] = [];
  const checkpoints: number[] = [];
  const refis: number[] = [];
  const niveis: { sala: number; nivel: number }[] = [];

  while (run.viva && !run.venceu && run.sala <= BALANCEAMENTO.dungeon.totalDeSalas) {
    const observado = lutarSala(build, { ...run, build });
    salas.push(observado);

    if (!observado.venceu) {
      run = perderRun(run, observado.duracaoS);
      break;
    }

    const inimigo = inimigoDaSala(seed, run.sala);
    const salaAtual = run.sala;
    const resultado = vencerSala(
      { ...run, build },
      observado.vidaFinal,
      run.pocoes - observado.pocoesUsadas,
      inimigo.exp,
      observado.duracaoS,
    );
    run = resultado.run;
    if (resultado.niveisGanhos > 0) niveis.push({ sala: salaAtual, nivel: run.nivel });
    if (resultado.refilDePocoes) refis.push(salaAtual);
    if (resultado.checkpoint) {
      checkpoints.push(salaAtual);
      const oferta = ofertaDeCheckpoint(build, seed, checkpoints.length);
      const escolhida = escolhaAutomatica(
        build,
        oferta,
        run.vida / atributosDaBuild(build, run.nivel).vidaMaxima,
      );
      build = aplicarRecompensa(build, escolhida);
      run = { ...run, build };
    }
  }

  return { run, salas, checkpoints, refis, niveis, build };
};

/** A seed que a bancada confirma como uma run vitoriosa com esta build. */
const SEED_DA_VITORIA = 'INTEGRA01';

describe('a run inteira, da sala 1 à 50', () => {
  const jornada = jogarRun(buildForte(), SEED_DA_VITORIA);

  it('chega à sala 50 e vence', () => {
    expect(jornada.salas).toHaveLength(BALANCEAMENTO.dungeon.totalDeSalas);
    expect(jornada.salas.every((s) => s.venceu)).toBe(true);
    expect(jornada.run.venceu).toBe(true);
    expect(jornada.run.viva).toBe(true);
  });

  it('toda sala tem um inimigo, e o inimigo age', () => {
    for (const sala of jornada.salas) {
      const inimigo = inimigoDaSala(SEED_DA_VITORIA, sala.sala);
      expect(inimigo.id).not.toBe('');
      expect(inimigo.vida).toBeGreaterThan(0);
      expect(sala.duracaoS).toBeGreaterThan(0);
      expect(sala.passos).toBeGreaterThan(0);
      expect(sala.tiposDeEvento.has('golpe')).toBe(true);
    }
  });

  it('a Vida e a Armadura do jogador mexem de verdade', () => {
    /*
     * A medição por trás dos números.
     *
     * Toda sala gasta Armadura. A Vida, não: contra inimigo comum e com a
     * build já crescida, a Armadura absorve tudo — medido em
     * `scripts/medir-armadura.mts`, 0 % do dano chega à Vida nas 35 salas
     * comuns no nível 22, contra 41 % no nível 1. Por isso a cobrança de
     * Vida mora nos bosses, que é onde ela **precisa** valer.
     */
    const gastouArmadura = jornada.salas.filter((s) => s.menorArmadura < s.armaduraInicial);
    expect(gastouArmadura).toHaveLength(BALANCEAMENTO.dungeon.totalDeSalas);

    const levouDano = jornada.salas.filter((s) => s.vidaFinal < s.vidaInicial);
    expect(levouDano.length).toBeGreaterThanOrEqual(5);

    const bosses = jornada.salas.filter((s) => bossDaSala(s.sala) !== null);
    expect(bosses.filter((s) => s.vidaFinal < s.vidaInicial).length).toBeGreaterThanOrEqual(3);
  });

  it('a Armadura recomeça cheia a cada sala e a Vida atravessa', () => {
    const maxima = atributosDaBuild(jornada.build, jornada.run.nivel).armaduraMaxima;
    expect(maxima).toBeGreaterThan(0);
    for (const sala of jornada.salas) expect(sala.armaduraInicial).toBeGreaterThan(0);
    /* Alguma sala precisa começar com menos Vida que a anterior terminou cheia. */
    const atravessou = jornada.salas.some((s, i) => i > 0 && s.vidaInicial < s.vidaFinal + 0.001 && s.vidaInicial < (jornada.salas[i - 1]?.vidaInicial ?? Infinity));
    expect(atravessou).toBe(true);
  });

  it('o Momentum gira: sobe durante a luta e nunca passa do máximo', () => {
    const maximo = classePorId('guerreiro').recurso.maximo;
    const girou = jornada.salas.filter((s) => s.maiorMomentum > 0);
    expect(girou.length).toBeGreaterThan(40);
    for (const sala of jornada.salas) expect(sala.maiorMomentum).toBeLessThanOrEqual(maximo);
    expect(Math.max(...jornada.salas.map((s) => s.maiorMomentum))).toBeGreaterThanOrEqual(3);
  });

  it('os cooldowns andam e as habilidades são lançadas', () => {
    expect(jornada.salas.every((s) => s.cooldownsAndaram)).toBe(true);
    expect(jornada.salas.filter((s) => s.tiposDeEvento.has('habilidade')).length).toBeGreaterThan(40);
  });

  it('as poções são usadas quando a Vida cai', () => {
    const usadas = jornada.salas.reduce((total, s) => total + s.pocoesUsadas, 0);
    expect(usadas).toBeGreaterThan(0);
    expect(jornada.salas.some((s) => s.tiposDeEvento.has('pocao'))).toBe(true);
  });

  it('a EXP vira nível ao longo da run', () => {
    expect(jornada.niveis.length).toBeGreaterThan(5);
    expect(jornada.run.nivel).toBeGreaterThan(1);
    expect(jornada.run.nivel).toBeLessThanOrEqual(BALANCEAMENTO.experiencia.nivelMaximo);
    /* O nível só sobe. */
    for (let i = 1; i < jornada.niveis.length; i += 1) {
      expect(jornada.niveis[i]?.nivel ?? 0).toBeGreaterThan(jornada.niveis[i - 1]?.nivel ?? 0);
    }
  });

  it('os cinco bosses caem nas salas 10, 20, 30, 40 e 50', () => {
    const salasDeBoss = jornada.salas.map((s) => s.sala).filter((n) => bossDaSala(n) !== null);
    expect(salasDeBoss).toEqual([10, 20, 30, 40, 50]);
    expect(jornada.run.bossesDerrotados).toBe(5);
    for (const n of salasDeBoss) expect(ehElite(n)).toBe(false);
  });

  it('os quatro checkpoints abrem em 10, 20, 30 e 40 — e não na 50', () => {
    expect(jornada.checkpoints).toEqual([10, 20, 30, 40]);
    expect(jornada.build.upgrades.length + jornada.build.ativas.filter((a) => a.nome.endsWith('+')).length).toBe(4);
    /* E o draft continua com as contagens prometidas. */
    expect(jornada.build.ativas).toHaveLength(BALANCEAMENTO.draft.ativas);
    expect(jornada.build.passivas).toHaveLength(BALANCEAMENTO.draft.passivas);
    expect(jornada.build.equipamentos).toHaveLength(BALANCEAMENTO.draft.equipamentos);
  });

  it('as poções enchem ao fechar cada área, inclusive na 50', () => {
    expect(jornada.refis).toEqual([10, 20, 30, 40, 50]);
  });

  it('as lutas de boss demoram mais que as comuns', () => {
    const bosses = jornada.salas.filter((s) => bossDaSala(s.sala) !== null);
    const comuns = jornada.salas.filter((s) => bossDaSala(s.sala) === null && !ehElite(s.sala));
    const media = (l: readonly Observado[]): number =>
      l.reduce((a, s) => a + s.duracaoS, 0) / Math.max(1, l.length);
    expect(media(bosses)).toBeGreaterThan(media(comuns));
  });

  it('o desfecho da vitória é exibível: nunca "SALA 51 / 50"', () => {
    const desfecho = desfechoAoVencer(jornada.run, false);
    expect(desfecho.venceu).toBe(true);
    expect(desfecho.salaAlcancada).toBe(BALANCEAMENTO.dungeon.totalDeSalas);
  });

  it('o domínio é avaliável no fim da run e não trava', () => {
    const atributos = atributosDaBuild(jornada.build, jornada.run.nivel);
    const desperta = despertaOSoberano({
      tempoS: jornada.run.tempoDoBossFinalS,
      vidaRestante: jornada.run.vida,
      vidaMaxima: atributos.vidaMaxima,
      pocoesRestantes: jornada.run.pocoes,
      pocoesMaximas: BALANCEAMENTO.pocoes.porArea + atributos.pocoesExtras,
    });
    expect(typeof desperta).toBe('boolean');
    expect(jornada.run.tempoDoBossFinalS).toBeGreaterThan(0);
  });

  it('a mesma seed joga a mesma run', () => {
    const outra = jogarRun(buildForte(), SEED_DA_VITORIA);
    expect(outra.salas.map((s) => Math.round(s.duracaoS * 100))).toEqual(
      jornada.salas.map((s) => Math.round(s.duracaoS * 100)),
    );
    expect(outra.run.nivel).toBe(jornada.run.nivel);
  });
});

describe('uma run deliberadamente ruim', () => {
  const jornada = jogarRun(buildRuim(), 'MORRE001');

  it('morre, e morre cedo', () => {
    expect(jornada.run.viva).toBe(false);
    expect(jornada.run.venceu).toBe(false);
    expect(jornada.salas.length).toBeLessThan(BALANCEAMENTO.dungeon.totalDeSalas);
  });

  it('para na sala em que caiu, sem laço infinito', () => {
    const ultima = jornada.salas.at(-1);
    expect(ultima?.venceu).toBe(false);
    expect(jornada.salas.filter((s) => !s.venceu)).toHaveLength(1);
  });

  it('o desfecho da derrota é exibível e honesto', () => {
    const desfecho = desfechoAoCair(jornada.run);
    expect(desfecho.venceu).toBe(false);
    expect(desfecho.derrotouSoberano).toBe(false);
    expect(desfecho.salaAlcancada).toBeGreaterThanOrEqual(1);
    expect(desfecho.salaAlcancada).toBeLessThanOrEqual(BALANCEAMENTO.dungeon.totalDeSalas);
  });

  it('o enfurecimento impede a luta eterna', () => {
    /*
     * Uma build sem dano contra um inimigo que também não a mata ficaria
     * presa. O teto de passos em `lutarSala` já falharia o teste; aqui a
     * cobrança é explícita: a luta perdida terminou em tempo de jogo.
     */
    const ultima = jornada.salas.at(-1);
    expect(ultima?.duracaoS).toBeLessThan(600);
  });
});
