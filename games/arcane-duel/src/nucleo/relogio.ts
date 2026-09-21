import { BALANCEAMENTO } from '../dados/balanceamento.js';

/*
 * O relógio da simulação.
 *
 * Este módulo existe por causa de um defeito real e grave: o laço da batalha
 * calculava quantos passos rodar com
 *
 *     Math.round((delta * velocidade) / dt)
 *
 * e jogava fora o resto. Como `dt` é 1/30 e um quadro a 120 Hz dura 1/120, a
 * conta dava 0,25 — que arredonda para **zero**. Em 1x, num telefone de 90,
 * 120 ou 144 Hz, a simulação simplesmente **não andava**. Em 60 Hz a conta
 * dava exatamente 0,5, que arredonda para 1, e aí 1x rodava ao dobro da
 * velocidade. Cada aparelho jogava um jogo diferente.
 *
 * A correção é a de sempre: **acumulador**. O tempo real entra inteiro, os
 * passos saem em tamanho fixo, e a sobra fica guardada para o próximo quadro
 * em vez de ser descartada. Assim 1x é 1x em qualquer tela, e a mesma seed
 * produz a mesma luta em 60, 90 ou 144 Hz.
 *
 * O teto de passos por quadro existe para a aba que volta do segundo plano:
 * sem ele, meia hora minimizada viraria cinquenta mil passos de uma vez — a
 * "espiral da morte" clássica, em que cada quadro fica mais lento e acumula
 * ainda mais tempo. Quando o teto corta, o tempo excedente é **descartado de
 * propósito** e o acumulador é zerado: o jogo perde tempo de simulação, que é
 * muito melhor do que travar ou matar o jogador sem ele ver nada.
 */

/** O tamanho do passo. Uma constante do jogo, não do aparelho. */
export const DT = BALANCEAMENTO.passoDaSimulacaoS;

/** Quantos passos no máximo por quadro. Acima disso, o excesso é descartado. */
export const MAXIMO_DE_PASSOS_POR_QUADRO = 12;

/** O maior salto de tempo real que um quadro pode trazer. */
export const MAIOR_DELTA_S = 0.25;

export interface Relogio {
  /** Tempo real acumulado que ainda não virou passo. */
  readonly sobra: number;
}

export const relogioNovo = (): Relogio => ({ sobra: 0 });

export interface Avanco {
  readonly relogio: Relogio;
  /** Quantos passos de tamanho `DT` rodar agora. */
  readonly passos: number;
  /** O teto cortou passos neste quadro? Só para diagnóstico. */
  readonly cortou: boolean;
}

/**
 * Quantos passos este quadro merece.
 *
 * `deltaS` é tempo **real**; `velocidade` é o multiplicador escolhido pelo
 * jogador. A velocidade multiplica o tempo que entra, e não o tamanho do
 * passo — é isso que mantém a física idêntica entre 1x e 4x, mudando só
 * quantas vezes ela é avaliada por segundo de relógio de parede.
 */
export const avancar = (relogio: Relogio, deltaS: number, velocidade: number): Avanco => {
  const real = Math.min(MAIOR_DELTA_S, Math.max(0, deltaS));
  const acumulado = relogio.sobra + real * velocidade;

  const inteiros = Math.floor(acumulado / DT);
  if (inteiros <= MAXIMO_DE_PASSOS_POR_QUADRO) {
    return { relogio: { sobra: acumulado - inteiros * DT }, passos: inteiros, cortou: false };
  }

  /*
   * O teto cortou.
   *
   * A sobra é **zerada**, e não guardada: guardá-la faria o quadro seguinte
   * nascer já estourado de novo, e o jogo entraria na espiral em vez de sair
   * dela.
   */
  return { relogio: { sobra: 0 }, passos: MAXIMO_DE_PASSOS_POR_QUADRO, cortou: true };
};
