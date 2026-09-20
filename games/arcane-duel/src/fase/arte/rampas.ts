/*
 * As rampas de material.
 *
 * Esta é a diferença entre pixel art e boneco colorido, e ela é inteiramente
 * técnica: um material não é **uma** cor, é uma escada de cinco tons que o
 * olho lê como superfície. Aço tem sombra azulada e um brilho quase branco
 * muito estreito; tecido tem sombra quente e nenhum brilho; ouro velho tem
 * meio-tom saturado e um brilho amarelo sujo.
 *
 * Trocar a cor do aço por laranja não faz um guerreiro laranja: faz um
 * guerreiro de cobre. O que faz um "boneco laranja" é usar um tom só com
 * clareamento automático — que foi exatamente o erro da primeira versão.
 *
 * A paleta inteira é fria nas sombras e quente nas luzes. É a escolha que dá
 * a sensação de metal sob céu aberto, e é o que amarra personagem e cenário.
 */

/** Cinco degraus: sombra profunda, sombra, base, luz, brilho. */
export type Rampa = readonly [string, string, string, string, string];

export const RAMPAS = {
  /** Aço claro azulado. O material dominante do Guerreiro. */
  aco: ['#1b2230', '#33405a', '#5d7191', '#9aaec9', '#e8f1fb'],
  /** Aço escurecido das juntas e do interior das placas. */
  acoEscuro: ['#12161f', '#212a3b', '#3a4860', '#61748f', '#9fb0c6'],
  /** Vermelho profundo da capa e do tecido. Sem brilho: pano não espelha. */
  pano: ['#2a0a10', '#4d1119', '#7a1d26', '#a83039', '#cc5a5f'],
  /** Ouro velho, dos ornamentos. Saturado no meio, sujo no alto. */
  ouro: ['#33230c', '#5e4415', '#916b22', '#c9a049', '#f0dc9a'],
  /** Bronze das fivelas e do cabo da arma. */
  bronze: ['#2b1c0c', '#4d3413', '#75501f', '#a2763a', '#c99f63'],
  /** Couro das correias e das botas. */
  couro: ['#1d1108', '#38220f', '#57371b', '#7a5230', '#9c7249'],
  /** Pele, do pouco que aparece sob o elmo. */
  pele: ['#2b160f', '#4f2b1d', '#7d4b33', '#a87051', '#c9926d'],
  /** Osso, para inimigos esqueléticos. */
  osso: ['#26231d', '#474034', '#6f6657', '#9e9585', '#d8d2c2'],
  /** Pano sujo do saqueador: terroso, sem nobreza nenhuma. */
  panoSujo: ['#1e1a13', '#36301f', '#524a31', '#756a48', '#968965'],
  /** Verde doentio, para a pele de criaturas. */
  carne: ['#1b2416', '#2f4226', '#48633a', '#6b8a55', '#94b077'],
  /** Ferro cru, enferrujado, das armas de inimigo. */
  ferro: ['#1a1715', '#2f2a26', '#4a433c', '#6d635a', '#8f847a'],
} as const satisfies Record<string, Rampa>;

export type NomeDeMaterial = keyof typeof RAMPAS;

/**
 * O modelo de luz, em uma linha.
 *
 * A fonte está em cima e à esquerda — a mesma do cenário, e isso não é
 * coincidência: personagem e fundo iluminados de direções diferentes é o
 * defeito que mais rápido denuncia arte montada às pressas.
 */
export const LUZ = { x: -0.55, y: -0.82 } as const;
