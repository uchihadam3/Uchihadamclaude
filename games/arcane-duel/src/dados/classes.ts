import type { Classe, IdDeClasse } from './tipos.js';

/*
 * As doze classes.
 *
 * Só o Guerreiro é jogável nesta fatia. As outras onze existem aqui, com
 * cores e lema, porque a tela de seleção precisa mostrá-las como "Em breve" —
 * e porque o dia em que uma delas ficar pronta, o que muda é `jogavel: true`
 * e um arquivo de conteúdo. Nenhum sistema.
 */

export const CLASSES: readonly Classe[] = [
  {
    id: 'guerreiro',
    nome: 'Guerreiro',
    lema: 'Quebra a guarda, e o resto vem junto.',
    jogavel: true,
    corPrimaria: '#e8873a',
    corSecundaria: '#8c3f1d',
    recurso: { nome: 'Momentum', maximo: 10 },
    baseVida: 120,
    baseArmadura: 40,
    baseDano: 11,
    afinidades: ['ruptura', 'momentum', 'defesa', 'combo'],
  },
  {
    id: 'mago',
    nome: 'Mago',
    lema: 'O tempo de conjurar é o preço do poder.',
    jogavel: false,
    corPrimaria: '#7a6bff',
    corSecundaria: '#342a7a',
    recurso: { nome: 'Mana', maximo: 10 },
    baseVida: 88,
    baseArmadura: 20,
    baseDano: 16,
    afinidades: ['critico', 'execucao'],
  },
  {
    id: 'clerigo',
    nome: 'Clérigo',
    lema: 'Ninguém cai enquanto a luz durar.',
    jogavel: false,
    corPrimaria: '#f0d98a',
    corSecundaria: '#8a7333',
    recurso: { nome: 'Fé', maximo: 10 },
    baseVida: 110,
    baseArmadura: 34,
    baseDano: 10,
    afinidades: ['cura', 'defesa'],
  },
  {
    id: 'necromante',
    nome: 'Necromante',
    lema: 'O que morre ainda serve.',
    jogavel: false,
    corPrimaria: '#6fd3a0',
    corSecundaria: '#245140',
    recurso: { nome: 'Almas', maximo: 10 },
    baseVida: 94,
    baseArmadura: 22,
    baseDano: 14,
    afinidades: ['sangramento', 'execucao'],
  },
  {
    id: 'paladino',
    nome: 'Paladino',
    lema: 'O escudo é a arma.',
    jogavel: false,
    corPrimaria: '#e6e2d3',
    corSecundaria: '#7b7563',
    recurso: { nome: 'Juramento', maximo: 10 },
    baseVida: 132,
    baseArmadura: 52,
    baseDano: 9,
    afinidades: ['defesa', 'cura'],
  },
  {
    id: 'ladino',
    nome: 'Ladino',
    lema: 'Três golpes antes do primeiro aviso.',
    jogavel: false,
    corPrimaria: '#8ad6ff',
    corSecundaria: '#2a5a7a',
    recurso: { nome: 'Cargas', maximo: 10 },
    baseVida: 92,
    baseArmadura: 24,
    baseDano: 13,
    afinidades: ['combo', 'critico', 'sangramento'],
  },
  {
    id: 'bardo',
    nome: 'Bardo',
    lema: 'A luta tem ritmo, e ele é meu.',
    jogavel: false,
    corPrimaria: '#ff9ed2',
    corSecundaria: '#8a3d68',
    recurso: { nome: 'Compasso', maximo: 10 },
    baseVida: 100,
    baseArmadura: 26,
    baseDano: 11,
    afinidades: ['combo', 'cura'],
  },
  {
    id: 'monge',
    nome: 'Monge',
    lema: 'Cada golpe prepara o próximo.',
    jogavel: false,
    corPrimaria: '#ffd08a',
    corSecundaria: '#8a5f2a',
    recurso: { nome: 'Kata', maximo: 10 },
    baseVida: 104,
    baseArmadura: 28,
    baseDano: 12,
    afinidades: ['combo', 'momentum'],
  },
  {
    id: 'cacador',
    nome: 'Caçador',
    lema: 'A distância certa vale por uma armadura.',
    jogavel: false,
    corPrimaria: '#a8d86a',
    corSecundaria: '#3f6322',
    recurso: { nome: 'Marca', maximo: 10 },
    baseVida: 98,
    baseArmadura: 24,
    baseDano: 14,
    afinidades: ['critico', 'sangramento', 'execucao'],
  },
  {
    id: 'barbaro',
    nome: 'Bárbaro',
    lema: 'Dói menos quando já está doendo.',
    jogavel: false,
    corPrimaria: '#ff6b5a',
    corSecundaria: '#7a2418',
    recurso: { nome: 'Fúria', maximo: 10 },
    baseVida: 138,
    baseArmadura: 18,
    baseDano: 15,
    afinidades: ['execucao', 'momentum'],
  },
  {
    id: 'druida',
    nome: 'Druida',
    lema: 'O que cresce devagar não para.',
    jogavel: false,
    corPrimaria: '#7fc98a',
    corSecundaria: '#2c5c36',
    recurso: { nome: 'Seiva', maximo: 10 },
    baseVida: 116,
    baseArmadura: 30,
    baseDano: 11,
    afinidades: ['cura', 'sangramento'],
  },
  {
    id: 'bruxo',
    nome: 'Bruxo',
    lema: 'Todo poder foi emprestado de alguém.',
    jogavel: false,
    corPrimaria: '#c77dff',
    corSecundaria: '#4a2a6b',
    recurso: { nome: 'Pacto', maximo: 10 },
    baseVida: 96,
    baseArmadura: 22,
    baseDano: 15,
    afinidades: ['sangramento', 'execucao', 'critico'],
  },
];

const PORID = new Map<IdDeClasse, Classe>(CLASSES.map((classe) => [classe.id, classe]));

export const classePorId = (id: IdDeClasse): Classe => {
  const classe = PORID.get(id);
  if (classe === undefined) throw new Error(`classe desconhecida: ${id}`);
  return classe;
};

export const CLASSES_JOGAVEIS = CLASSES.filter((classe) => classe.jogavel);
