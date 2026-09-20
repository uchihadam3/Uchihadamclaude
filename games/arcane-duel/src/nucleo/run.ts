import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { AREAS, areaDaSala } from '../dados/areas.js';
import { BOSSES, SOBERANO_OCULTO, bossDaSala } from '../dados/bosses.js';
import { inimigosDaArea } from '../dados/inimigos.js';
import type { Inimigo } from '../dados/tipos.js';

import type { BuildParcial } from './build.js';
import { atributosDaBuild } from './build.js';
import { sortearEm } from './rng.js';

/*
 * A run: cinquenta salas, cinco áreas, e o que sobra entre uma luta e a
 * seguinte.
 *
 * A escalada de dificuldade mora aqui, e é derivada — o inimigo de dados traz
 * a base da área dele, e esta função aplica a curva por sala e por área. Isso
 * importa: para deixar o jogo mais duro ou mais fácil não se edita quinze
 * inimigos, se edita quatro números em `balanceamento.ts`.
 */

export interface EstadoDaRun {
  readonly seed: string;
  readonly build: BuildParcial;
  readonly sala: number;
  readonly vida: number;
  readonly pocoes: number;
  readonly nivel: number;
  readonly exp: number;
  readonly bossesDerrotados: number;
  readonly tempoS: number;
  /** Quanto tempo a luta do boss final levou. Alimenta o domínio secreto. */
  readonly tempoDoBossFinalS: number;
  readonly modo: 'manual' | 'automatico';
  readonly viva: boolean;
  readonly venceu: boolean;
  /** O Soberano foi despertado? */
  readonly despertou: boolean;
  readonly derrotouSoberano: boolean;
}

export const expParaSubir = (nivel: number): number =>
  BALANCEAMENTO.experiencia.base + BALANCEAMENTO.experiencia.porNivel * nivel;

export const iniciarRun = (
  build: BuildParcial,
  seed: string,
  modo: EstadoDaRun['modo'],
): EstadoDaRun => {
  const atributos = atributosDaBuild(build, 1);
  return {
    seed,
    build,
    sala: 1,
    vida: atributos.vidaMaxima,
    pocoes: BALANCEAMENTO.pocoes.porArea + atributos.pocoesExtras,
    nivel: 1,
    exp: 0,
    bossesDerrotados: 0,
    tempoS: 0,
    tempoDoBossFinalS: 0,
    modo,
    viva: true,
    venceu: false,
    despertou: false,
    derrotouSoberano: false,
  };
};

/** Uma sala de elite? Duas por bloco de dez, nas posições fixadas. */
export const ehElite = (sala: number): boolean => {
  if (bossDaSala(sala) !== null) return false;
  const posicao = ((sala - 1) % BALANCEAMENTO.dungeon.salasPorArea) + 1;
  return BALANCEAMENTO.inimigos.salasDeElite.includes(posicao as never);
};

/**
 * O inimigo de uma sala, já escalado.
 *
 * A escala cresce por sala **dentro** da área e dá um degrau a cada área
 * nova. Os dois juntos produzem a sensação certa: a sala 19 é mais dura que a
 * 11, e a 21 é notavelmente mais dura que a 19 — que é o que faz a troca de
 * região significar alguma coisa além da cor do fundo.
 */
export const inimigoDaSala = (seed: string, sala: number): Inimigo => {
  const boss = bossDaSala(sala);
  const area = areaDaSala(sala);
  const cfg = BALANCEAMENTO.inimigos;

  if (boss !== null) {
    return { ...boss, vida: Math.round(boss.vida * cfg.multiplicadorDeVidaBoss) };
  }

  const candidatos = inimigosDaArea(area.numero);
  const rng = sortearEm(seed, `sala:${sala}`);
  const base = candidatos.length > 0 ? rng.escolher(candidatos) : inimigosDaArea(1)[0];
  if (base === undefined) throw new Error(`sem inimigo para a sala ${sala}`);

  const dentroDaArea = sala - area.salaInicial;
  const passosDeArea = area.numero - 1;
  const escalaDeVida = 1 + dentroDaArea * cfg.vidaPorSala + passosDeArea * cfg.vidaPorArea;
  const escalaDeDano = 1 + dentroDaArea * cfg.danoPorSala + passosDeArea * cfg.danoPorArea;
  const elite = ehElite(sala);

  return {
    ...base,
    nome: elite ? `${base.nome} Veterano` : base.nome,
    porte: elite ? 'elite' : 'normal',
    vida: Math.round(
      base.vida *
        cfg.multiplicadorDeVidaNormal *
        escalaDeVida *
        (elite ? cfg.multiplicadorDeElite.vida : 1),
    ),
    armadura: Math.round(base.armadura * escalaDeVida),
    dano: base.dano * escalaDeDano * (elite ? cfg.multiplicadorDeElite.dano : 1),
    exp: Math.round(base.exp * (elite ? cfg.multiplicadorDeElite.exp : 1)),
    /*
     * O golpe especial escala junto.
     *
     * Ele estava ficando de fora, e por isso o golpe pesado da área 5 batia
     * com o número cru escrito na tabela — virava um cutucão justamente onde
     * deveria ser a ameaça que obriga a build a ter resposta.
     */
    ...(base.especial === undefined
      ? {}
      : {
          especial: {
            ...base.especial,
            dano: base.especial.dano * escalaDeDano,
            ...(base.especial.quebraArmadura === undefined
              ? {}
              : { quebraArmadura: base.especial.quebraArmadura * escalaDeDano }),
          },
        }),
  };
};

/** O Soberano, com os multiplicadores que o tornam o que ele é. */
export const soberanoEscalado = (): Inimigo => ({
  ...SOBERANO_OCULTO,
  vida: Math.round(
    SOBERANO_OCULTO.vida *
      BALANCEAMENTO.inimigos.multiplicadorDeVidaBoss *
      BALANCEAMENTO.bossSecreto.multiplicadorDeVida,
  ),
  dano: SOBERANO_OCULTO.dano * BALANCEAMENTO.bossSecreto.multiplicadorDeDano,
});

export interface ResultadoDaSala {
  readonly run: EstadoDaRun;
  /** Subiu de nível neste avanço? Quantos? */
  readonly niveisGanhos: number;
  /** Encheu as poções por ter fechado uma área? */
  readonly refilDePocoes: boolean;
  /** Abriu um checkpoint de recompensa? */
  readonly checkpoint: boolean;
}

/**
 * O que acontece depois de vencer a sala.
 *
 * EXP, nível, refil de poções e checkpoint — nesta ordem, porque o nível novo
 * aumenta a Vida máxima e a poção cheia deve valer sobre o total novo.
 */
export const vencerSala = (
  run: EstadoDaRun,
  vidaRestante: number,
  pocoesRestantes: number,
  expGanha: number,
  tempoDaLutaS: number,
): ResultadoDaSala => {
  let nivel = run.nivel;
  let exp = run.exp + expGanha;
  let niveisGanhos = 0;
  while (nivel < BALANCEAMENTO.experiencia.nivelMaximo && exp >= expParaSubir(nivel)) {
    exp -= expParaSubir(nivel);
    nivel += 1;
    niveisGanhos += 1;
  }

  const atributos = atributosDaBuild(run.build, nivel);
  const fechouArea = bossDaSala(run.sala) !== null;
  const ehBossFinal = run.sala === BALANCEAMENTO.dungeon.totalDeSalas;
  const checkpoint = fechouArea && !ehBossFinal;

  /*
   * O nível novo dá Vida máxima, e essa Vida nova entra cheia.
   *
   * Sem isso, subir de nível na prática não curaria nada — a barra só ficaria
   * mais comprida com o mesmo tanto dentro, o que lê como punição.
   */
  const vida = Math.min(
    atributos.vidaMaxima,
    vidaRestante + niveisGanhos * BALANCEAMENTO.jogador.vidaPorNivel,
  );

  const pocoes = fechouArea
    ? BALANCEAMENTO.pocoes.porArea + atributos.pocoesExtras
    : pocoesRestantes;

  return {
    run: {
      ...run,
      sala: run.sala + 1,
      vida,
      pocoes,
      nivel,
      exp,
      bossesDerrotados: run.bossesDerrotados + (fechouArea ? 1 : 0),
      tempoS: run.tempoS + tempoDaLutaS,
      tempoDoBossFinalS: ehBossFinal ? tempoDaLutaS : run.tempoDoBossFinalS,
      venceu: ehBossFinal ? true : run.venceu,
    },
    niveisGanhos,
    refilDePocoes: fechouArea,
    checkpoint,
  };
};

export const perderRun = (run: EstadoDaRun, tempoDaLutaS: number): EstadoDaRun => ({
  ...run,
  viva: false,
  tempoS: run.tempoS + tempoDaLutaS,
});

export const nomeDaArea = (sala: number): string => areaDaSala(sala).nome;

/** O total de bosses da dungeon, para a tela de resultado. */
export const TOTAL_DE_BOSSES = BOSSES.length;

export const TOTAL_DE_AREAS = AREAS.length;
