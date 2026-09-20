import type { Equipamento } from './tipos.js';

/*
 * Os equipamentos, em três slots.
 *
 * Cada slot tem opções para as quatro identidades — Ruptura, Momentum, Defesa
 * e Combo — mais uma neutra. Isso importa: o draft de equipamento acontece
 * depois do de ativas e passivas, então é a última chance de a build se
 * fechar. Se um slot só tivesse peças de um caminho, quem tivesse ido por
 * outro caminho seria punido pelo sorteio em vez de pela escolha.
 *
 * Os relíquias são de propósito os mais estranhos: é deles que sai a virada
 * de uma run, e é neles que o jogador aprende a ler combinação em vez de
 * número.
 */

export const EQUIPAMENTOS: readonly Equipamento[] = [
  /* ---- Armas ------------------------------------------------------------ */
  {
    id: 'e-machado-rachador',
    classe: 'universal',
    slot: 'arma',
    nome: 'Machado Rachador',
    descricao: '+4 Dano. Quebra 6 de Armadura a mais.',
    tags: ['ruptura'],
    modificadores: { danoPlano: 4, rupturaExtra: 6 },
  },
  {
    id: 'e-martelo-do-juizo',
    classe: 'universal',
    slot: 'arma',
    nome: 'Martelo do Juízo',
    descricao: '+18% Dano. +7 Dano contra alvo sem Armadura.',
    tags: ['ruptura', 'execucao'],
    modificadores: { danoPercentual: 0.18, danoContraSemArmadura: 7 },
  },
  {
    id: 'e-espada-do-impeto',
    classe: 'universal',
    slot: 'arma',
    nome: 'Espada do Ímpeto',
    descricao: '+1,5 Dano por ponto de Momentum.',
    tags: ['momentum'],
    modificadores: { danoPorMomentum: 1.5 },
  },
  {
    id: 'e-laminas-gemeas',
    classe: 'universal',
    slot: 'arma',
    nome: 'Lâminas Gêmeas',
    descricao: 'Cooldowns 10% mais rápidos. +8% de Crítico.',
    tags: ['combo', 'critico'],
    modificadores: { reducaoDeCooldown: 0.1, chanceDeCritico: 0.08 },
  },
  {
    id: 'e-alabarda-vigilante',
    classe: 'universal',
    slot: 'arma',
    nome: 'Alabarda Vigilante',
    descricao: '+3 Dano. +20 Armadura máxima.',
    tags: ['defesa'],
    modificadores: { danoPlano: 3, armaduraMaxima: 20 },
  },
  {
    id: 'e-facao-serrilhado',
    classe: 'universal',
    slot: 'arma',
    nome: 'Facão Serrilhado',
    descricao: '+12% Dano. Recupera 8% do Dano como Vida.',
    tags: ['sangramento', 'cura'],
    modificadores: { danoPercentual: 0.12, roubodeVida: 0.08 },
  },

  /* ---- Armaduras -------------------------------------------------------- */
  {
    id: 'e-couraca-do-cerco',
    classe: 'universal',
    slot: 'armadura',
    nome: 'Couraça do Cerco',
    descricao: '+45 Armadura máxima. Recupera 2 de Armadura por segundo.',
    tags: ['defesa'],
    modificadores: { armaduraMaxima: 45, regeneracaoDeArmadura: 2 },
  },
  {
    id: 'e-malha-do-veterano',
    classe: 'universal',
    slot: 'armadura',
    nome: 'Malha do Veterano',
    descricao: '+40 Vida máxima. Recebe 8% menos Dano.',
    tags: ['defesa'],
    modificadores: { vidaMaxima: 40, reducaoDeDano: 0.08 },
  },
  {
    id: 'e-peitoral-da-investida',
    classe: 'universal',
    slot: 'armadura',
    nome: 'Peitoral da Investida',
    descricao: '+25 Vida máxima. +1 Momentum sempre que ganhar Momentum.',
    tags: ['momentum'],
    modificadores: { vidaMaxima: 25, momentumExtra: 1 },
  },
  {
    id: 'e-gibao-leve',
    classe: 'universal',
    slot: 'armadura',
    nome: 'Gibão Leve',
    descricao: 'Cooldowns 14% mais rápidos. +15 Vida máxima.',
    tags: ['combo'],
    modificadores: { reducaoDeCooldown: 0.14, vidaMaxima: 15 },
  },
  {
    id: 'e-placas-rachadas',
    classe: 'universal',
    slot: 'armadura',
    nome: 'Placas Rachadas',
    descricao: '+30 Armadura máxima. Quebra 5 de Armadura a mais.',
    tags: ['defesa', 'ruptura'],
    modificadores: { armaduraMaxima: 30, rupturaExtra: 5 },
  },

  /* ---- Relíquias -------------------------------------------------------- */
  {
    id: 'e-estandarte-quebrado',
    classe: 'universal',
    slot: 'reliquia',
    nome: 'Estandarte Quebrado',
    descricao: '+11 Dano contra alvo sem Armadura.',
    tags: ['ruptura', 'execucao'],
    modificadores: { danoContraSemArmadura: 11 },
  },
  {
    id: 'e-tambor-de-guerra',
    classe: 'universal',
    slot: 'reliquia',
    nome: 'Tambor de Guerra',
    descricao: '+2,5 Dano por ponto de Momentum.',
    tags: ['momentum'],
    modificadores: { danoPorMomentum: 2.5 },
  },
  {
    id: 'e-elmo-do-sentinela',
    classe: 'universal',
    slot: 'reliquia',
    nome: 'Elmo do Sentinela',
    descricao: 'Recebe 12% menos Dano. +20 Armadura máxima.',
    tags: ['defesa'],
    modificadores: { reducaoDeDano: 0.12, armaduraMaxima: 20 },
  },
  {
    id: 'e-metronomo-de-ferro',
    classe: 'universal',
    slot: 'reliquia',
    nome: 'Metrônomo de Ferro',
    descricao: 'Cooldowns 16% mais rápidos.',
    tags: ['combo'],
    modificadores: { reducaoDeCooldown: 0.16 },
  },
  {
    id: 'e-frasco-do-medico',
    classe: 'universal',
    slot: 'reliquia',
    nome: 'Frasco do Médico',
    descricao: 'Poções curam +25%. Uma poção a mais por área.',
    tags: ['cura'],
    modificadores: { potenciaDePocao: 0.25, pocoesExtras: 1 },
  },
  {
    id: 'e-anel-do-duelista',
    classe: 'universal',
    slot: 'reliquia',
    nome: 'Anel do Duelista',
    descricao: '+15% de Crítico. Críticos causam +45%.',
    tags: ['critico'],
    modificadores: { chanceDeCritico: 0.15, multiplicadorDeCritico: 0.45 },
  },
];

export const equipamentosDoSlot = (slot: Equipamento['slot']): readonly Equipamento[] =>
  EQUIPAMENTOS.filter((equipamento) => equipamento.slot === slot);
