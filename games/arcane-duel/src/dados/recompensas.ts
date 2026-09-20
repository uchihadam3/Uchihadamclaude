import type { Modificadores, Tag } from './tipos.js';

/*
 * As recompensas de checkpoint.
 *
 * Três opções depois dos bosses 10, 20, 30 e 40, e o jogador escolhe uma. A
 * regra de composição da oferta está em `nucleo/checkpoint.ts`, porque
 * depende da build; aqui estão só as peças.
 *
 * O que **não** existe aqui é troca livre de habilidade. Poder trocar uma
 * ativa a cada checkpoint apagaria o draft inicial: bastaria pegar qualquer
 * coisa no começo e consertar depois. Existe uma entrada preparada para isso
 * — `NOVA_ESTRATEGIA` — e ela nasce desligada, como uma raridade futura.
 */

export type Recompensa =
  /** Melhora uma habilidade que a build já tem. */
  | {
      readonly tipo: 'evolucao';
      readonly id: string;
      readonly nome: string;
      readonly descricao: string;
      /** Dano somado a cada efeito de dano da habilidade. */
      readonly danoExtra: number;
      /** Fração retirada do cooldown, de 0 a 1. */
      readonly cortaCooldown: number;
      readonly tags: readonly Tag[];
    }
  /** Um buff simples que vale para a run inteira. */
  | {
      readonly tipo: 'bencao';
      readonly id: string;
      readonly nome: string;
      readonly descricao: string;
      readonly modificadores: Modificadores;
      readonly tags: readonly Tag[];
    }
  /** Uma peça melhor para um slot que a build já ocupa. */
  | {
      readonly tipo: 'equipamento';
      readonly id: string;
      readonly nome: string;
      readonly descricao: string;
      readonly modificadores: Modificadores;
      readonly tags: readonly Tag[];
    };

/*
 * As bênçãos.
 *
 * São de propósito legíveis numa olhada, e nenhuma depende de outra. As duas
 * primeiras existem em toda oferta possível como rede de segurança: uma run
 * que foi mal no draft precisa de uma saída **parcial**, nunca de um conserto
 * completo — consertar tudo tiraria o peso da escolha inicial.
 */
export const BENCAOS: readonly Recompensa[] = [
  {
    tipo: 'bencao',
    id: 'r-vigor',
    nome: 'Vigor',
    descricao: '+20% de Vida máxima.',
    modificadores: { vidaMaxima: 70 },
    tags: ['defesa'],
  },
  {
    tipo: 'bencao',
    id: 'r-forca-bruta',
    nome: 'Força Bruta',
    descricao: '+15% de Dano.',
    modificadores: { danoPercentual: 0.15 },
    tags: [],
  },
  {
    tipo: 'bencao',
    id: 'r-frascos-fundos',
    nome: 'Frascos Fundos',
    descricao: 'Poções curam +15%.',
    modificadores: { potenciaDePocao: 0.15 },
    tags: ['cura'],
  },
  {
    tipo: 'bencao',
    id: 'r-segundo-sopro',
    nome: 'Segundo Sopro',
    descricao: 'Uma poção a mais por área.',
    modificadores: { pocoesExtras: 1 },
    tags: ['cura'],
  },
  {
    tipo: 'bencao',
    id: 'r-placas-extras',
    nome: 'Placas Extras',
    descricao: '+50 de Armadura máxima.',
    modificadores: { armaduraMaxima: 50 },
    tags: ['defesa'],
  },
  {
    tipo: 'bencao',
    id: 'r-passo-rapido',
    nome: 'Passo Rápido',
    descricao: 'Cooldowns 10% mais rápidos.',
    modificadores: { reducaoDeCooldown: 0.1 },
    tags: ['combo'],
  },
  {
    tipo: 'bencao',
    id: 'r-sede',
    nome: 'Sede',
    descricao: 'Recupera 7% do Dano causado como Vida.',
    modificadores: { roubodeVida: 0.07 },
    tags: ['cura'],
  },
  {
    tipo: 'bencao',
    id: 'r-fio-afiado',
    nome: 'Fio Afiado',
    descricao: '+10% de Crítico.',
    modificadores: { chanceDeCritico: 0.1 },
    tags: ['critico'],
  },
  {
    tipo: 'bencao',
    id: 'r-marreta',
    nome: 'Marreta',
    descricao: 'Quebra 10 de Armadura a mais por golpe.',
    modificadores: { rupturaExtra: 10 },
    tags: ['ruptura'],
  },
  {
    tipo: 'bencao',
    id: 'r-impeto',
    nome: 'Ímpeto',
    descricao: '+1,5 Dano por ponto de Momentum.',
    modificadores: { danoPorMomentum: 1.5 },
    tags: ['momentum'],
  },
  {
    tipo: 'bencao',
    id: 'r-casca-grossa',
    nome: 'Casca Grossa',
    descricao: 'Recebe 10% menos Dano.',
    modificadores: { reducaoDeDano: 0.1 },
    tags: ['defesa'],
  },
  {
    tipo: 'bencao',
    id: 'r-caçador-de-brechas',
    nome: 'Caçador de Brechas',
    descricao: '+10 Dano contra alvo sem Armadura.',
    modificadores: { danoContraSemArmadura: 10 },
    tags: ['execucao', 'ruptura'],
  },
];

/** As peças de equipamento que só aparecem como recompensa. */
export const EQUIPAMENTOS_DE_CHECKPOINT: readonly Recompensa[] = [
  {
    tipo: 'equipamento',
    id: 'r-eq-lamina-do-cerco',
    nome: 'Lâmina do Cerco',
    descricao: '+7 Dano. Quebra 10 de Armadura a mais.',
    modificadores: { danoPlano: 7, rupturaExtra: 10 },
    tags: ['ruptura'],
  },
  {
    tipo: 'equipamento',
    id: 'r-eq-couraca-rúnica',
    nome: 'Couraça Rúnica',
    descricao: '+60 Armadura máxima. Recebe 6% menos Dano.',
    modificadores: { armaduraMaxima: 60, reducaoDeDano: 0.06 },
    tags: ['defesa'],
  },
  {
    tipo: 'equipamento',
    id: 'r-eq-bandeira-de-ferro',
    nome: 'Bandeira de Ferro',
    descricao: '+2 Dano por Momentum. +1 Momentum ao ganhar Momentum.',
    modificadores: { danoPorMomentum: 2, momentumExtra: 1 },
    tags: ['momentum'],
  },
  {
    tipo: 'equipamento',
    id: 'r-eq-luvas-do-ritmo',
    nome: 'Luvas do Ritmo',
    descricao: 'Cooldowns 12% mais rápidos. +8% de Crítico.',
    modificadores: { reducaoDeCooldown: 0.12, chanceDeCritico: 0.08 },
    tags: ['combo', 'critico'],
  },
  {
    tipo: 'equipamento',
    id: 'r-eq-talisma-do-medico',
    nome: 'Talismã do Médico',
    descricao: 'Poções curam +30%. +40 de Vida máxima.',
    modificadores: { potenciaDePocao: 0.3, vidaMaxima: 40 },
    tags: ['cura'],
  },
];

/**
 * A troca de habilidade, preparada e desligada.
 *
 * Ela existe aqui para o dia em que virar uma raridade — e nasce desligada
 * porque, oferecida a cada checkpoint, ela apagaria o draft inicial.
 */
export const NOVA_ESTRATEGIA = { ativada: false } as const;
