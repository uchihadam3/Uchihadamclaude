import type { Passiva } from './tipos.js';

/*
 * As oito passivas do Guerreiro.
 *
 * Uma passiva nunca tem lógica própria: ela é um punhado de modificadores com
 * um nome. Quem soma, quem aplica e quem decide a ordem é o motor — e é por
 * isso que acrescentar a nona passiva, ou a primeira do Mago, não encosta em
 * código de combate.
 *
 * Duas passivas com a mesma tag é o sinal que o medidor de Sinergia lê. Elas
 * estão distribuídas de propósito: nenhuma build consegue ser forte em tudo.
 */

export const GUERREIRO_PASSIVAS: readonly Passiva[] = [
  {
    id: 'p-predador-de-ruptura',
    classe: 'guerreiro',
    nome: 'Predador de Ruptura',
    descricao: '+9 Dano contra alvo sem Armadura.',
    tags: ['ruptura', 'execucao'],
    modificadores: { danoContraSemArmadura: 9 },
  },
  {
    id: 'p-mao-pesada',
    classe: 'guerreiro',
    nome: 'Mão Pesada',
    descricao: 'Quebra 8 de Armadura a mais por golpe.',
    tags: ['ruptura'],
    modificadores: { rupturaExtra: 8 },
  },
  {
    id: 'p-sangue-aceso',
    classe: 'guerreiro',
    nome: 'Sangue Aceso',
    descricao: '+2 Dano por ponto de Momentum.',
    tags: ['momentum'],
    modificadores: { danoPorMomentum: 2 },
  },
  {
    id: 'p-dor-em-forca',
    classe: 'guerreiro',
    nome: 'Dor em Força',
    descricao: '+1 Momentum sempre que ganhar Momentum.',
    tags: ['momentum'],
    modificadores: { momentumExtra: 1 },
  },
  {
    id: 'p-guarda-de-veterano',
    classe: 'guerreiro',
    nome: 'Guarda de Veterano',
    descricao: '+35 Armadura máxima. Recupera 1,5 de Armadura por segundo.',
    tags: ['defesa'],
    modificadores: { armaduraMaxima: 35, regeneracaoDeArmadura: 1.5 },
  },
  {
    id: 'p-instinto-de-ferro',
    classe: 'guerreiro',
    nome: 'Instinto de Ferro',
    descricao: '+30 Vida máxima. Recebe 10% menos Dano.',
    tags: ['defesa'],
    modificadores: { vidaMaxima: 30, reducaoDeDano: 0.1 },
  },
  {
    id: 'p-leitura-de-combate',
    classe: 'guerreiro',
    nome: 'Leitura de Combate',
    descricao: 'Cooldowns 12% mais rápidos.',
    tags: ['combo'],
    modificadores: { reducaoDeCooldown: 0.12 },
  },
  {
    id: 'p-olho-na-abertura',
    classe: 'guerreiro',
    nome: 'Olho na Abertura',
    descricao: '+12% de chance de Crítico. Críticos causam +30%.',
    tags: ['combo', 'critico'],
    modificadores: { chanceDeCritico: 0.12, multiplicadorDeCritico: 0.3 },
  },
];
