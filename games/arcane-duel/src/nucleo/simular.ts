import { BALANCEAMENTO } from '../dados/balanceamento.js';

import type { BuildParcial } from './build.js';
import { atributosDaBuild } from './build.js';
import { aplicarRecompensa, escolhaAutomatica, ofertaDeCheckpoint } from './checkpoint.js';
import type { Contexto, EstadoDeCombate } from './combate.js';
import { abrirCombate, passo } from './combate.js';
import type { Aleatorio } from './rng.js';
import { sortearEm } from './rng.js';
import type { EstadoDaRun } from './run.js';
import { inimigoDaSala, perderRun, soberanoEscalado, vencerSala } from './run.js';

/*
 * A run rodada até o fim, sem tela.
 *
 * É a mesma simulação que o jogo usa — não uma aproximação — e é o que
 * permite conferir duração de luta, curva de nível e taxa de vitória sem
 * abrir navegador. Se este arquivo diz que a luta média leva quatro segundos,
 * o jogo também levaria; o balanceamento é conferível antes de ser jogado.
 */

const MAXIMO_DE_PASSOS = 60 * 60 * 30; // uma hora de simulação, como trava.

export interface ResultadoDaLuta {
  readonly vencedor: EstadoDeCombate['vencedor'];
  readonly duracaoS: number;
  readonly vidaRestante: number;
  readonly pocoesRestantes: number;
}

export const lutarAteOFim = (
  build: BuildParcial,
  run: EstadoDaRun,
  contextoRng: Aleatorio,
  soberano = false,
): ResultadoDaLuta => {
  const classeMomentum = 10;
  const inimigo = soberano ? soberanoEscalado() : inimigoDaSala(run.seed, run.sala);
  let estado = abrirCombate(
    build,
    inimigo,
    { vida: run.vida, pocoes: run.pocoes, nivel: run.nivel, exp: run.exp },
    classeMomentum,
  );
  const contexto: Contexto = {
    build,
    atributos: atributosDaBuild(build, run.nivel),
    rng: contextoRng,
  };
  const dt = BALANCEAMENTO.passoDaSimulacaoS;

  for (let i = 0; i < MAXIMO_DE_PASSOS && !estado.terminou; i += 1) {
    estado = passo(estado, contexto, dt).estado;
  }

  return {
    vencedor: estado.vencedor,
    duracaoS: estado.tempoS,
    vidaRestante: estado.jogador.vida,
    pocoesRestantes: estado.jogador.pocoes,
  };
};

export interface RelatorioDaRun {
  readonly salaAlcancada: number;
  readonly venceu: boolean;
  readonly nivelFinal: number;
  readonly duracoes: { readonly normal: number[]; readonly elite: number[]; readonly boss: number[] };
  readonly tempoTotalS: number;
}

/** Roda uma run inteira e devolve o que interessa ao balanceamento. */
export const simularRun = (build: BuildParcial, seed: string): RelatorioDaRun => {
  let run: EstadoDaRun = {
    seed,
    build,
    sala: 1,
    vida: atributosDaBuild(build, 1).vidaMaxima,
    pocoes: BALANCEAMENTO.pocoes.porArea + atributosDaBuild(build, 1).pocoesExtras,
    nivel: 1,
    exp: 0,
    bossesDerrotados: 0,
    tempoS: 0,
    tempoDoBossFinalS: 0,
    modo: 'automatico',
    viva: true,
    venceu: false,
    despertou: false,
    derrotouSoberano: false,
  };

  const duracoes = { normal: [] as number[], elite: [] as number[], boss: [] as number[] };

  /*
   * A build muda durante a run.
   *
   * O simulador aplica as recompensas de checkpoint pela mesma heurística do
   * modo automático. Sem isso a bancada media uma run que o jogo não joga —
   * quatro melhorias ao longo de cinquenta salas mudam bastante o resultado,
   * e ignorá-las faria o jogo parecer mais duro do que é.
   */
  let buildAtual = build;
  let checkpoints = 0;

  while (run.viva && !run.venceu && run.sala <= BALANCEAMENTO.dungeon.totalDeSalas) {
    const inimigo = inimigoDaSala(seed, run.sala);
    const rng = sortearEm(seed, `luta:${run.sala}`);
    const luta = lutarAteOFim(buildAtual, { ...run, build: buildAtual }, rng);
    duracoes[inimigo.porte].push(luta.duracaoS);

    if (luta.vencedor !== 'jogador') {
      run = perderRun(run, luta.duracaoS);
      break;
    }
    const resultado = vencerSala(
      { ...run, build: buildAtual },
      luta.vidaRestante,
      luta.pocoesRestantes,
      inimigo.exp,
      luta.duracaoS,
    );
    run = resultado.run;
    if (resultado.checkpoint) {
      checkpoints += 1;
      const oferta = ofertaDeCheckpoint(buildAtual, seed, checkpoints);
      const escolhida = escolhaAutomatica(
        buildAtual,
        oferta,
        run.vida / atributosDaBuild(buildAtual, run.nivel).vidaMaxima,
      );
      buildAtual = aplicarRecompensa(buildAtual, escolhida);
      run = { ...run, build: buildAtual };
    }
  }

  return {
    salaAlcancada: Math.min(BALANCEAMENTO.dungeon.totalDeSalas, run.sala - (run.viva ? 1 : 0)),
    venceu: run.venceu,
    nivelFinal: run.nivel,
    duracoes,
    tempoTotalS: run.tempoS,
  };
};
