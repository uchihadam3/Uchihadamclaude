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
import type { Contexto, EstadoDeCombate } from './combate.js';
import { abrirCombate, passo } from './combate.js';
import { DT, avancar, relogioNovo } from './relogio.js';
import { sortearEm } from './rng.js';
import { ehElite, inimigoDaSala } from './run.js';

/*
 * 1x, 2x e 4x, e a duração real das lutas.
 *
 * A direção cobrou duas coisas mensuráveis. A primeira: as três velocidades
 * precisam produzir o **mesmo resultado lógico** — elas mudam quantos passos
 * de simulação cabem num quadro, e não o que cada passo faz. A segunda: as
 * lutas em 1x precisam durar o que a tabela de balanceamento promete.
 *
 * Os dois testes rodam o mesmo laço que `Dungeon.tsx` roda, inclusive o
 * relógio de passo fixo — não uma aproximação dele.
 */

const porTag = (tag: Tag): BuildParcial =>
  montar({
    ativas: [...GUERREIRO_ATIVAS]
      .sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag)))
      .slice(0, BALANCEAMENTO.draft.ativas),
    passivas: [...GUERREIRO_PASSIVAS]
      .sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag)))
      .slice(0, BALANCEAMENTO.draft.passivas),
    equipamentos: (['arma', 'armadura', 'reliquia'] as const).map((slot) => {
      const doSlot = EQUIPAMENTOS.filter((e) => e.slot === slot);
      const escolhido = doSlot.find((e) => e.tags.includes(tag)) ?? doSlot[0];
      if (escolhido === undefined) throw new Error(`sem equipamento no slot ${slot}`);
      return escolhido;
    }),
  });

interface Fim {
  readonly vencedor: EstadoDeCombate['vencedor'];
  readonly tempoS: number;
  readonly vida: number;
  readonly vidaDoInimigo: number;
  readonly passos: number;
}

/**
 * Uma luta rodada pelo laço do jogo, a `hz` quadros por segundo e a `velocidade`.
 *
 * É o mesmo código do `Dungeon.tsx`: acumulador, teto por quadro, sobra
 * preservada. A diferença é que aqui o tempo entre quadros é exato.
 */
const lutar = (build: BuildParcial, sala: number, hz: number, velocidade: number): Fim => {
  const nivel = 12;
  const atributos = atributosDaBuild(build, nivel);
  let estado = abrirCombate(
    build,
    inimigoDaSala('VELOC001', sala),
    { vida: atributos.vidaMaxima, pocoes: 3, nivel, exp: 0 },
    classePorId(build.classe).recurso.maximo,
  );
  const contexto: Contexto = {
    build,
    atributos,
    rng: sortearEm('VELOC001', `luta:${sala}`),
  };

  let relogio = relogioNovo();
  const deltaDoQuadro = 1 / hz;
  let passos = 0;
  /* Dez minutos de tempo de parede, como trava. */
  for (let quadro = 0; quadro < hz * 600 && !estado.terminou; quadro += 1) {
    const avanco = avancar(relogio, deltaDoQuadro, velocidade);
    relogio = avanco.relogio;
    for (let i = 0; i < avanco.passos && !estado.terminou; i += 1) {
      estado = passo(estado, contexto, DT).estado;
      passos += 1;
    }
  }

  return {
    vencedor: estado.vencedor,
    tempoS: estado.tempoS,
    vida: estado.jogador.vida,
    vidaDoInimigo: estado.inimigo.vida,
    passos,
  };
};

describe('1x, 2x e 4x são logicamente equivalentes', () => {
  const build = porTag('combo');
  const salas = [3, 7, 10, 23, 30, 47, 50];

  it.each(salas)('a sala %i termina igual nas três velocidades', (sala) => {
    const um = lutar(build, sala, 60, 1);
    const dois = lutar(build, sala, 60, 2);
    const quatro = lutar(build, sala, 60, 4);

    for (const outro of [dois, quatro]) {
      expect(outro.vencedor).toBe(um.vencedor);
      expect(outro.passos).toBe(um.passos);
      expect(outro.tempoS).toBeCloseTo(um.tempoS, 6);
      expect(outro.vida).toBeCloseTo(um.vida, 6);
      expect(outro.vidaDoInimigo).toBeCloseTo(um.vidaDoInimigo, 6);
    }
  });

  it.each([30, 60, 90, 120, 144])(
    'e a %i Hz o resultado continua o mesmo',
    (hz) => {
      /*
       * Regressão do pior defeito encontrado nesta rodada. Antes do
       * acumulador, 90, 120 e 144 Hz em 1x davam zero passo por quadro e a
       * luta não acontecia — que é o que o jogador via no celular.
       */
      const referencia = lutar(porTag('combo'), 10, 60, 1);
      const medido = lutar(porTag('combo'), 10, hz, 1);
      expect(medido.passos).toBe(referencia.passos);
      expect(medido.vencedor).toBe(referencia.vencedor);
      expect(medido.tempoS).toBeCloseTo(referencia.tempoS, 6);
    },
  );

  it('2x roda o dobro de passos por segundo de tempo de parede', () => {
    /*
     * A velocidade acelera a **partida**, não o relógio da simulação: o
     * mesmo número de passos acontece, só que em menos quadros.
     */
    const hz = 60;
    const um = avancar(relogioNovo(), 1 / hz, 1);
    const dois = avancar(relogioNovo(), 1 / hz, 2);
    const quatro = avancar(relogioNovo(), 1 / hz, 4);
    expect(um.passos).toBe(0);
    expect(dois.passos).toBe(1);
    expect(quatro.passos).toBe(2);
  });
});

describe('a duração real das lutas em 1x', () => {
  /*
   * As medidas.
   *
   * Registradas aqui porque a direção pediu números, e porque uma faixa que
   * só existe no `balanceamento.ts` não impede ninguém de sair dela. O teste
   * cobra a faixa **da tabela**; quem mexer no balanceamento e passar do
   * limite descobre no `npm test`, e não no telefone.
   */
  const build = porTag('combo');

  const duracoes = (porte: 'normal' | 'elite' | 'boss'): number[] => {
    const salas: number[] = [];
    for (let sala = 1; sala <= BALANCEAMENTO.dungeon.totalDeSalas; sala += 1) {
      const dela = bossDaSala(sala) !== null ? 'boss' : ehElite(sala) ? 'elite' : 'normal';
      if (dela === porte) salas.push(sala);
    }
    return salas.map((sala) => lutar(build, sala, 60, 1).tempoS);
  };

  it.each(['normal', 'elite', 'boss'] as const)(
    'a luta %s fica dentro de uma faixa jogável',
    (porte) => {
      const medidas = duracoes(porte);
      expect(medidas.length).toBeGreaterThan(0);
      const media = medidas.reduce((a, b) => a + b, 0) / medidas.length;

      /*
       * A faixa aqui é folgada de propósito — ela é uma **guarda**, não o
       * alvo. O alvo está em `BALANCEAMENTO.duracaoAlvoS`, e a bancada
       * (`scripts/balancear.mts`) é quem mede build a build. O que este
       * teste impede é a regressão grosseira: a luta de meio segundo e a de
       * cinco minutos, que são as duas formas de o jogo deixar de ser jogo.
       */
      expect(media).toBeGreaterThan(1.5);
      expect(media).toBeLessThan(240);
      expect(Math.max(...medidas)).toBeLessThan(400);
    },
  );

  it('boss dura mais que elite, que dura mais que comum', () => {
    const media = (l: readonly number[]): number => l.reduce((a, b) => a + b, 0) / l.length;
    const comum = media(duracoes('normal'));
    const elite = media(duracoes('elite'));
    const boss = media(duracoes('boss'));
    expect(elite).toBeGreaterThan(comum);
    expect(boss).toBeGreaterThan(elite);
  });

  it('nenhuma luta fica presa: o enfurecimento sempre encerra', () => {
    /* Uma build sem dano nenhum contra um boss. Tem de terminar. */
    const semDano = montar({ ativas: [], passivas: [], equipamentos: [] });
    const fim = lutar(semDano, 50, 60, 4);
    expect(fim.vencedor).not.toBeNull();
    expect(fim.tempoS).toBeLessThan(600);
  });
});
