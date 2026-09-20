import type { Habilidade } from './tipos.js';

/*
 * As doze ativas do Guerreiro.
 *
 * A regra de escrita é a da direção do jogo: **nome, uma frase, poucos
 * números**. Se a descrição precisar de "e se você tiver pelo menos duas
 * cargas", a habilidade está errada — não o texto.
 *
 * As quatro identidades que precisam emergir estão semeadas aqui sem nunca
 * serem anunciadas: Ruptura, Momentum, Defesa e Combo. Nenhuma habilidade diz
 * a que caminho pertence; quem diz é a tag, e quem descobre é o jogador
 * vendo o medidor de Sinergia reagir.
 */

export const GUERREIRO_ATIVAS: readonly Habilidade[] = [
  /* ---- Ruptura ---------------------------------------------------------- */
  {
    id: 'g-quebra-escudo',
    classe: 'guerreiro',
    nome: 'Quebra-Escudo',
    descricao: '12 Dano. Quebra 15 de Armadura.',
    cooldownS: 5,
    efeitos: [
      { tipo: 'dano', valor: 12 },
      { tipo: 'quebrar-armadura', valor: 15 },
    ],
    tags: ['ruptura'],
    porte: 'skill',
  },
  {
    id: 'g-golpe-de-cerco',
    classe: 'guerreiro',
    nome: 'Golpe de Cerco',
    descricao: '20 Dano. +20 se o alvo estiver sem Armadura.',
    cooldownS: 7,
    efeitos: [{ tipo: 'dano', valor: 20 }],
    condicionais: [{ se: { tipo: 'alvo-sem-armadura' }, entao: [{ tipo: 'dano', valor: 20 }] }],
    tags: ['ruptura', 'execucao'],
    porte: 'skill',
  },
  {
    id: 'g-machado-partidor',
    classe: 'guerreiro',
    nome: 'Machado Partidor',
    descricao: '9 Dano. Quebra 22 de Armadura. Ganha 1 Momentum.',
    cooldownS: 6,
    efeitos: [
      { tipo: 'dano', valor: 9 },
      { tipo: 'quebrar-armadura', valor: 22 },
      { tipo: 'ganhar-momentum', valor: 1 },
    ],
    tags: ['ruptura', 'momentum'],
    porte: 'skill',
  },

  /* ---- Momentum --------------------------------------------------------- */
  {
    id: 'g-disciplina-de-aco',
    classe: 'guerreiro',
    nome: 'Disciplina de Aço',
    descricao: 'Ganha 3 Momentum. Ganha 18 de Armadura.',
    cooldownS: 9,
    efeitos: [
      { tipo: 'ganhar-momentum', valor: 3 },
      { tipo: 'ganhar-armadura', valor: 18 },
    ],
    tags: ['momentum', 'defesa'],
    porte: 'skill',
  },
  {
    id: 'g-golpe-do-carrasco',
    classe: 'guerreiro',
    nome: 'Golpe do Carrasco',
    descricao: 'Gasta todo o Momentum. 8 Dano, +6 por Momentum gasto.',
    cooldownS: 11,
    efeitos: [{ tipo: 'dano', valor: 8 }],
    tags: ['momentum', 'execucao'],
    porte: 'ultimate',
    custoDeMomentum: 3,
  },
  {
    id: 'g-furia-crescente',
    classe: 'guerreiro',
    nome: 'Fúria Crescente',
    descricao: '10 Dano. Ganha 2 Momentum. +10 Dano com 5 Momentum.',
    cooldownS: 6,
    efeitos: [
      { tipo: 'dano', valor: 10 },
      { tipo: 'ganhar-momentum', valor: 2 },
    ],
    condicionais: [
      { se: { tipo: 'momentum-minimo', valor: 5 }, entao: [{ tipo: 'dano', valor: 10 }] },
    ],
    tags: ['momentum'],
    porte: 'skill',
  },

  /* ---- Defesa ----------------------------------------------------------- */
  {
    id: 'g-postura-da-fortaleza',
    classe: 'guerreiro',
    nome: 'Postura da Fortaleza',
    descricao: 'Ganha 30 de Armadura. Recebe 35% menos Dano por 5s.',
    cooldownS: 14,
    efeitos: [
      { tipo: 'ganhar-armadura', valor: 30 },
      { tipo: 'proteger', valor: 0.35, duracaoS: 5 },
    ],
    tags: ['defesa'],
    porte: 'skill',
  },
  {
    id: 'g-segundo-folego',
    classe: 'guerreiro',
    nome: 'Segundo Fôlego',
    descricao: 'Cura 18% da Vida. +12% se estiver abaixo de metade.',
    cooldownS: 16,
    efeitos: [{ tipo: 'curar-fracao', valor: 0.18 }],
    condicionais: [
      { se: { tipo: 'eu-abaixo-de', fracao: 0.5 }, entao: [{ tipo: 'curar-fracao', valor: 0.12 }] },
    ],
    tags: ['defesa', 'cura'],
    porte: 'skill',
  },
  {
    id: 'g-interposicao',
    classe: 'guerreiro',
    nome: 'Interposição',
    descricao: '8 Dano. Ganha 20 de Armadura e 1 Momentum.',
    cooldownS: 7,
    efeitos: [
      { tipo: 'dano', valor: 8 },
      { tipo: 'ganhar-armadura', valor: 20 },
      { tipo: 'ganhar-momentum', valor: 1 },
    ],
    tags: ['defesa', 'momentum'],
    porte: 'basico',
  },

  /* ---- Combo ------------------------------------------------------------ */
  {
    id: 'g-corte-encadeado',
    classe: 'guerreiro',
    nome: 'Corte Encadeado',
    descricao: '7 Dano. Acelera seus cooldowns em 30% por 4s.',
    cooldownS: 4,
    efeitos: [
      { tipo: 'dano', valor: 7 },
      { tipo: 'acelerar', valor: 0.3, duracaoS: 4 },
    ],
    tags: ['combo'],
    porte: 'basico',
  },
  {
    id: 'g-sequencia-brutal',
    classe: 'guerreiro',
    nome: 'Sequência Brutal',
    descricao: '6 Dano três vezes. Ganha 1 Momentum.',
    cooldownS: 5,
    efeitos: [
      { tipo: 'dano', valor: 6 },
      { tipo: 'dano', valor: 6 },
      { tipo: 'dano', valor: 6 },
      { tipo: 'ganhar-momentum', valor: 1 },
    ],
    tags: ['combo', 'momentum'],
    porte: 'skill',
  },
  {
    id: 'g-finta-cortante',
    classe: 'guerreiro',
    nome: 'Finta Cortante',
    descricao: '5 Dano que ignora Armadura. Causa Sangramento 4 por 6s.',
    cooldownS: 4,
    efeitos: [
      { tipo: 'dano-perfurante', valor: 5 },
      { tipo: 'sangrar', valor: 4, duracaoS: 6 },
    ],
    tags: ['combo', 'sangramento'],
    porte: 'basico',
  },
];
