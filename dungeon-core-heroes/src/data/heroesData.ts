import type { HeroId, Stats } from '../types';

// ============ OS 10 HERÓIS ============

export interface HeroDef {
  id: HeroId;
  nome: string;
  titulo: string;
  funcao: string;
  estilo: string;
  descricao: string;
  base: Stats;
  // IA
  ai: {
    keepDistance: number;      // distância preferida do inimigo mais próximo (0 = corpo a corpo)
    retreatHp: number;         // recua abaixo desta % (se tiver mobilidade)
    potionAt: number;          // usa poção abaixo desta %
    holdBigFor: 'group' | 'elite' | 'never';  // guarda skill de maior impacto
    groupSize: number;         // nº de inimigos que caracteriza "grupo"
  };
  palette: { main: string; secondary: string; accent: string; glow: string; skin: string; hair: string };
  painter: string;             // id do pintor procedural
  walkRegen: number;           // % vida/s recuperada andando entre salas
}

const S = (o: Partial<Stats>): Stats => ({
  hp: 400, power: 26, spellPower: 100, defense: 18, magicDefense: 14,
  attackInterval: 1.6, critChance: 0.05, critMult: 1.6, dodge: 0.04,
  speed: 2.6, range: 1.3, lifesteal: 0, cdr: 0, areaBonus: 1, healBonus: 1,
  eliteDamage: 1, bossDamage: 1, dotDamage: 1, summonPower: 1, shieldPower: 1,
  blockChance: 0, regenPerSec: 0, moveDamage: 0, potionPower: 1,
  ...o,
});

export const HEROES: HeroDef[] = [
  {
    id: 'guerreiro', nome: 'Baldur', titulo: 'Guerreiro da Muralha',
    funcao: 'Tanque · Bloqueio · Desgaste',
    estilo: 'Lento e inabalável: aguenta o que ninguém aguenta e vence pelo cansaço do inimigo.',
    descricao: 'Última sentinela da Muralha de Ferro. Cada cicatriz do escudo tem nome, e ele lembra de todas.',
    base: S({ hp: 560, power: 24, defense: 34, magicDefense: 22, attackInterval: 1.9, speed: 2.2, blockChance: 0.16, critChance: 0.03 }),
    ai: { keepDistance: 0, retreatHp: 0, potionAt: 0.35, holdBigFor: 'group', groupSize: 3 },
    palette: { main: '#5a6a80', secondary: '#2e3a4e', accent: '#c8a040', glow: '#7a9ac8', skin: '#d8a882', hair: '#7a5a38' },
    painter: 'guerreiro', walkRegen: 4.2,
  },
  {
    id: 'arqueira', nome: 'Lyra', titulo: 'Arqueira das Sombras',
    funcao: 'Dano à distância · Crítico · Mobilidade',
    estilo: 'Mata o perigo antes que ele chegue perto. Se chegarem perto, ela já não está mais lá.',
    descricao: 'Caçadora do bosque sem lua. Dizem que a flecha dela acerta primeiro e assobia depois.',
    base: S({ hp: 340, power: 30, defense: 12, attackInterval: 1.25, critChance: 0.14, critMult: 1.8, dodge: 0.1, speed: 3.1, range: 6.5 }),
    ai: { keepDistance: 5.5, retreatHp: 0.6, potionAt: 0.35, holdBigFor: 'elite', groupSize: 3 },
    palette: { main: '#2e4a38', secondary: '#16241c', accent: '#b8c8c0', glow: '#7ae8a8', skin: '#e0b090', hair: '#2a2018' },
    painter: 'arqueira', walkRegen: 4.6,
  },
  {
    id: 'mago', nome: 'Ashkar', titulo: 'Mago de Cinzas',
    funcao: 'Dano mágico em área · Fogo · Explosão',
    estilo: 'Frágil como papel, letal como um incêndio. Grupos inteiros somem num clarão.',
    descricao: 'Sobreviveu à própria pira. Agora carrega a fogueira dentro dos olhos.',
    base: S({ hp: 300, power: 34, spellPower: 118, defense: 8, magicDefense: 24, attackInterval: 1.7, speed: 2.5, range: 6, areaBonus: 1.15 }),
    ai: { keepDistance: 5, retreatHp: 0.55, potionAt: 0.4, holdBigFor: 'group', groupSize: 3 },
    palette: { main: '#6a2e2e', secondary: '#38161a', accent: '#f08030', glow: '#ffb050', skin: '#d8a078', hair: '#c8c0b8' },
    painter: 'mago', walkRegen: 4.6,
  },
  {
    id: 'ladino', nome: 'Vesk', titulo: 'Ladino Carmesim',
    funcao: 'Crítico · Sangramento · Execução',
    estilo: 'Elites morrem antes de entender. Vive no fio entre a esquiva perfeita e o desastre.',
    descricao: 'As vielas cobram pedágio, e o Vesk é o cobrador. Duas adagas, zero perguntas.',
    base: S({ hp: 350, power: 27, defense: 12, attackInterval: 1.05, critChance: 0.18, critMult: 1.9, dodge: 0.14, speed: 3.3, range: 1.2 }),
    ai: { keepDistance: 0, retreatHp: 0.3, potionAt: 0.32, holdBigFor: 'elite', groupSize: 4 },
    palette: { main: '#7a2030', secondary: '#38101a', accent: '#d84858', glow: '#ff6878', skin: '#c89878', hair: '#1a1416' },
    painter: 'ladino', walkRegen: 4.4,
  },
  {
    id: 'clériga', nome: 'Seren', titulo: 'Clériga Solar',
    funcao: 'Cura · Sustain · Dano sagrado',
    estilo: 'Não corre, não teme. Vence porque simplesmente se recusa a cair.',
    descricao: 'Guardiã do último amanhecer. A luz dela não é metáfora: os mortos-vivos aprenderam do jeito difícil.',
    base: S({ hp: 460, power: 22, spellPower: 108, defense: 24, magicDefense: 28, attackInterval: 1.8, speed: 2.4, range: 4.5, healBonus: 1.2 }),
    ai: { keepDistance: 3.5, retreatHp: 0, potionAt: 0.3, holdBigFor: 'elite', groupSize: 3 },
    palette: { main: '#e8dcc0', secondary: '#b09860', accent: '#f4c430', glow: '#ffe890', skin: '#e8c0a0', hair: '#e8d8a8' },
    painter: 'clériga', walkRegen: 5.0,
  },
  {
    id: 'druida', nome: 'Thornwood', titulo: 'Druida das Raízes',
    funcao: 'Controle · Veneno natural · Invocação',
    estilo: 'Prende, envenena, regenera e deixa a floresta terminar o serviço.',
    descricao: 'Metade homem, metade carvalho antigo. O lobo que o acompanha não é um animal: é uma lembrança.',
    base: S({ hp: 420, power: 24, spellPower: 106, defense: 18, magicDefense: 20, attackInterval: 1.7, speed: 2.4, range: 4.5, dotDamage: 1.15, summonPower: 1.1 }),
    ai: { keepDistance: 3.5, retreatHp: 0.45, potionAt: 0.33, holdBigFor: 'elite', groupSize: 3 },
    palette: { main: '#4a5e30', secondary: '#2a3618', accent: '#a8c060', glow: '#c0e878', skin: '#c8a078', hair: '#5a7040' },
    painter: 'druida', walkRegen: 4.8,
  },
  {
    id: 'monge', nome: 'Kaelin', titulo: 'Monge do Trovão',
    funcao: 'Velocidade · Combo · Evasão',
    estilo: 'Cada golpe acelera o próximo. Parar é a única forma de perder.',
    descricao: 'Treinou contando relâmpagos. Hoje os relâmpagos contam com ele.',
    base: S({ hp: 380, power: 22, defense: 14, attackInterval: 0.85, critChance: 0.08, dodge: 0.16, speed: 3.5, range: 1.2, moveDamage: 0.1 }),
    ai: { keepDistance: 0, retreatHp: 0.28, potionAt: 0.3, holdBigFor: 'group', groupSize: 3 },
    palette: { main: '#3a5a7a', secondary: '#1e3048', accent: '#f4d848', glow: '#88d8ff', skin: '#d8a878', hair: '#16120e' },
    painter: 'monge', walkRegen: 4.6,
  },
  {
    id: 'engenheira', nome: 'Runa', titulo: 'Engenheira de Runas',
    funcao: 'Torres · Bombas · Dispositivos',
    estilo: 'Ela não luta com os inimigos: apresenta os inimigos às máquinas dela.',
    descricao: 'Expulsa da academia por "excesso de entusiasmo explosivo". As torres concordam que valeu a pena.',
    base: S({ hp: 380, power: 24, spellPower: 104, defense: 16, magicDefense: 16, attackInterval: 1.5, speed: 2.6, range: 5, summonPower: 1.15 }),
    ai: { keepDistance: 4.5, retreatHp: 0.5, potionAt: 0.35, holdBigFor: 'group', groupSize: 3 },
    palette: { main: '#8a5a30', secondary: '#4a3018', accent: '#68b8d8', glow: '#a878e8', skin: '#e0b088', hair: '#b8502a' },
    painter: 'engenheira', walkRegen: 4.4,
  },
  {
    id: 'necromante', nome: 'Morvane', titulo: 'Necromante Pálido',
    funcao: 'Invocação · Roubo de vida · Sacrifício',
    estilo: 'Começa fraco e termina exército. Cada osso no chão é um aliado em potencial.',
    descricao: 'Pálido como quem nunca viu o sol — porque o sol é para quem tem pressa.',
    base: S({ hp: 340, power: 24, spellPower: 110, defense: 10, magicDefense: 24, attackInterval: 1.7, speed: 2.4, range: 5, lifesteal: 0.06, summonPower: 1.2 }),
    ai: { keepDistance: 4.5, retreatHp: 0.5, potionAt: 0.33, holdBigFor: 'group', groupSize: 3 },
    palette: { main: '#3a3448', secondary: '#1e1a2a', accent: '#a8e8b8', glow: '#b8ffc8', skin: '#e8e0d8', hair: '#f0f0e8' },
    painter: 'necromante', walkRegen: 4.4,
  },
  {
    id: 'alquimista', nome: 'Fiora', titulo: 'Alquimista Errante',
    funcao: 'Veneno · Ácido · Reações em cadeia',
    estilo: 'Espalha frascos, espera a química agir e detona tudo de uma vez.',
    descricao: 'Cada bolso do casaco é um experimento. Alguns explodem. Os melhores explodem duas vezes.',
    base: S({ hp: 370, power: 25, spellPower: 106, defense: 14, magicDefense: 18, attackInterval: 1.5, speed: 2.7, range: 5, dotDamage: 1.2 }),
    ai: { keepDistance: 4.5, retreatHp: 0.5, potionAt: 0.35, holdBigFor: 'group', groupSize: 3 },
    palette: { main: '#4a6a3a', secondary: '#2a3a20', accent: '#c8b838', glow: '#d8f048', skin: '#d8ac88', hair: '#8a4a28' },
    painter: 'alquimista', walkRegen: 4.5,
  },
];

export const HERO_BY_ID: Record<string, HeroDef> = {};
for (const h of HEROES) HERO_BY_ID[h.id] = h;

// tempos-alvo da Dungeon 1 (segundos, velocidade 1x) — usados no balanceador
export const D1_TARGETS: Record<HeroId, number> = {
  guerreiro: 640, arqueira: 585, mago: 570, ladino: 610, 'clériga': 655,
  druida: 620, monge: 590, engenheira: 615, necromante: 630, alquimista: 605,
};
