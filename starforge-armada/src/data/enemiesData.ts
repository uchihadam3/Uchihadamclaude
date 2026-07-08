// Banco de 70+ inimigos, agrupados nos 12 setores da campanha. Cada inimigo
// tem arquétipo visual, paleta do setor, comportamento (IA de movimento) e
// padrão de projétil, além de vida/velocidade/dano/pontuação.
import type { Palette } from '../render/shipGen';

export type Archetype =
  | 'drone' | 'fighter' | 'turret' | 'mine' | 'elite' | 'kamikaze' | 'sniper'
  | 'shield' | 'healer' | 'carrier' | 'orb' | 'wasp' | 'larva' | 'sentinel'
  | 'bomber' | 'ray' | 'crystal' | 'phase' | 'reflector' | 'spikeball';

export type Behavior = 'dive' | 'strafe' | 'hover' | 'kamikaze' | 'turret' | 'orbit' | 'zigzag' | 'drift' | 'serpentine' | 'descend';
export type Pattern = 'none' | 'aim' | 'fan' | 'ring' | 'spiral' | 'wave' | 'wall' | 'rain' | 'sweep' | 'aimBurst' | 'cross' | 'arc' | 'homingSlow' | 'split' | 'pulseRing' | 'spread';

export interface EnemyDef {
  id: string; name: string; sector: number; arch: Archetype; pal: Palette;
  size: number; hp: number; speed: number; dmg: number; score: number;
  behavior: Behavior; pattern: Pattern; cadence: number; bspeed: number; count: number;
  contact?: boolean; elite?: boolean;
}

export const ENEMY_PAL: Record<string, Palette> = {
  rust: { base: '#7a5a3a', light: '#c0975a', dark: '#3a2a18', accent: '#ff6a2a', accent2: '#c04010' },
  ice: { base: '#3a6a9a', light: '#9fd0ff', dark: '#1a3350', accent: '#5ad0ff', accent2: '#2a80d0' },
  steel: { base: '#5a6270', light: '#c2cad6', dark: '#2a303a', accent: '#9fd6ff', accent2: '#4a7aa8' },
  brown: { base: '#6a5236', light: '#b09060', dark: '#332818', accent: '#ffab3a', accent2: '#c07020' },
  flesh: { base: '#8a2a3a', light: '#ff8a7a', dark: '#3a1018', accent: '#ff4a5a', accent2: '#c02030' },
  neon: { base: '#3a2a5a', light: '#c07aff', dark: '#1a1030', accent: '#ff40d0', accent2: '#a020c0' },
  violet: { base: '#4a3a7a', light: '#b0a0ff', dark: '#1a1440', accent: '#c090ff', accent2: '#7040d0' },
  gold: { base: '#9a7a30', light: '#ffe0a0', dark: '#4a3410', accent: '#ffd24a', accent2: '#ff8020' },
  clean: { base: '#6a7280', light: '#c8d2de', dark: '#333a44', accent: '#7ff0ff', accent2: '#3a90c0' },
  abyss: { base: '#2a2a3a', light: '#7a7a9a', dark: '#12121a', accent: '#a060ff', accent2: '#5020a0' },
  imperial: { base: '#6a5a3a', light: '#d8c090', dark: '#33281a', accent: '#ff9a3a', accent2: '#c06020' },
  surreal: { base: '#5a3a7a', light: '#e0a0ff', dark: '#241040', accent: '#7fffd0', accent2: '#c060ff' },
};

// setores: nome + paleta
export const SECTORS: { name: string; pal: string }[] = [
  { name: 'Cinturão de Sucata', pal: 'rust' },
  { name: 'Nebulosa Azul', pal: 'ice' },
  { name: 'Colônia Perdida', pal: 'steel' },
  { name: 'Mar de Asteroides', pal: 'brown' },
  { name: 'Zona Carmesim', pal: 'flesh' },
  { name: 'Fronteira Pirata', pal: 'neon' },
  { name: 'Campo de Distorção', pal: 'violet' },
  { name: 'Sol Partido', pal: 'gold' },
  { name: 'Império Mecânico', pal: 'clean' },
  { name: 'Abismo Negro', pal: 'abyss' },
  { name: 'Trono das Máquinas', pal: 'imperial' },
  { name: 'Além da Última Estrela', pal: 'surreal' },
];

let uid = 0;
function E(sector: number, name: string, arch: Archetype, behavior: Behavior, pattern: Pattern, o: Partial<EnemyDef> = {}): EnemyDef {
  const palKey = SECTORS[sector].pal;
  return {
    id: `e${uid++}`, name, sector, arch, pal: ENEMY_PAL[palKey],
    size: o.size ?? 16, hp: o.hp ?? 4, speed: o.speed ?? 60, dmg: o.dmg ?? 14, score: o.score ?? 120,
    behavior, pattern, cadence: o.cadence ?? 1.6, bspeed: o.bspeed ?? 360, count: o.count ?? 1,
    contact: o.contact, elite: o.elite,
  };
}

export const ENEMIES: EnemyDef[] = [
  // ---- Setor 1: Cinturão de Sucata ----
  E(0, 'Drone Enferrujado', 'drone', 'strafe', 'none', { hp: 3, size: 15, score: 100 }),
  E(0, 'Caça Pirata Leve', 'fighter', 'dive', 'aim', { hp: 4, size: 17, score: 150, cadence: 1.5 }),
  E(0, 'Mina Flutuante', 'mine', 'drift', 'none', { hp: 2, size: 14, score: 120, contact: true }),
  E(0, 'Torre de Sucata', 'turret', 'turret', 'fan', { hp: 7, size: 20, score: 220, cadence: 2, count: 5 }),
  E(0, 'Cargueiro Quebrado', 'carrier', 'descend', 'spread', { hp: 12, size: 26, score: 320, cadence: 2.2, count: 3, speed: 40 }),
  E(0, 'Ferro-Velho Menor', 'elite', 'hover', 'aimBurst', { hp: 34, size: 30, score: 700, cadence: 1.1, count: 3, elite: true }),

  // ---- Setor 2: Nebulosa Azul ----
  E(1, 'Peixe-Drone', 'wasp', 'serpentine', 'none', { hp: 3, size: 15, score: 110 }),
  E(1, 'Caça Azul', 'fighter', 'strafe', 'arc', { hp: 5, size: 17, score: 160, cadence: 1.6, bspeed: 300 }),
  E(1, 'Orbe Elétrico', 'orb', 'orbit', 'ring', { hp: 6, size: 16, score: 200, cadence: 2.4, count: 8 }),
  E(1, 'Serpente Curta', 'phase', 'serpentine', 'wave', { hp: 8, size: 18, score: 240, cadence: 1.4 }),
  E(1, 'Emissor de Energia', 'turret', 'turret', 'spiral', { hp: 9, size: 20, score: 260, cadence: 0.5, count: 2 }),
  E(1, 'Guardião de Plasma', 'elite', 'hover', 'spiral', { hp: 40, size: 32, score: 800, cadence: 0.4, count: 3, elite: true }),

  // ---- Setor 3: Colônia Perdida ----
  E(2, 'Drone de Segurança', 'drone', 'zigzag', 'aim', { hp: 4, size: 15, score: 130, cadence: 1.8 }),
  E(2, 'Torre Laser', 'turret', 'turret', 'sweep', { hp: 8, size: 20, score: 240, cadence: 1.8, count: 3 }),
  E(2, 'Robô Reparador', 'healer', 'drift', 'none', { hp: 10, size: 18, score: 280 }),
  E(2, 'Sentinela de Corredor', 'sentinel', 'hover', 'cross', { hp: 9, size: 19, score: 260, cadence: 1.6, count: 4 }),
  E(2, 'Nave Patrulha', 'fighter', 'dive', 'aimBurst', { hp: 6, size: 17, score: 190, cadence: 1.4, count: 3 }),
  E(2, 'Diretora Sentinel', 'elite', 'hover', 'wall', { hp: 44, size: 32, score: 850, cadence: 1.8, count: 9, elite: true }),

  // ---- Setor 4: Mar de Asteroides ----
  E(3, 'Minerador Hostil', 'bomber', 'descend', 'aim', { hp: 6, size: 19, score: 170 }),
  E(3, 'Drone Broca', 'kamikaze', 'kamikaze', 'none', { hp: 3, size: 16, score: 150, contact: true, speed: 120 }),
  E(3, 'Asteroide Explosivo', 'spikeball', 'drift', 'none', { hp: 5, size: 20, score: 160, contact: true }),
  E(3, 'Cargueiro Armado', 'carrier', 'descend', 'fan', { hp: 14, size: 27, score: 340, cadence: 2, count: 6 }),
  E(3, 'Canhão Orbital', 'sniper', 'turret', 'aim', { hp: 9, size: 21, score: 280, cadence: 2.2, bspeed: 520 }),
  E(3, 'Broca Titã', 'elite', 'hover', 'rain', { hp: 46, size: 34, score: 880, cadence: 1.2, count: 5, elite: true }),

  // ---- Setor 5: Zona Carmesim ----
  E(4, 'Larva Espacial', 'larva', 'drift', 'none', { hp: 4, size: 16, score: 120 }),
  E(4, 'Vespa Orgânica', 'wasp', 'kamikaze', 'aim', { hp: 4, size: 15, score: 150, speed: 110 }),
  E(4, 'Bolsa Explosiva', 'spikeball', 'drift', 'split', { hp: 5, size: 18, score: 170, contact: true, cadence: 2 }),
  E(4, 'Tentáculo Flutuante', 'phase', 'serpentine', 'wave', { hp: 8, size: 18, score: 220, cadence: 1.3 }),
  E(4, 'Nave Viva', 'larva', 'strafe', 'spread', { hp: 10, size: 20, score: 260, cadence: 1.6, count: 5 }),
  E(4, 'Coração Vermelho', 'elite', 'hover', 'pulseRing', { hp: 48, size: 36, score: 900, cadence: 1.4, count: 14, elite: true }),

  // ---- Setor 6: Fronteira Pirata ----
  E(5, 'Caça Pirata', 'fighter', 'strafe', 'aim', { hp: 5, size: 17, score: 160 }),
  E(5, 'Sniper Pirata', 'sniper', 'hover', 'aim', { hp: 7, size: 19, score: 230, cadence: 2, bspeed: 560 }),
  E(5, 'Drone Saqueador', 'drone', 'zigzag', 'none', { hp: 4, size: 15, score: 130 }),
  E(5, 'Bombardeiro', 'bomber', 'descend', 'rain', { hp: 11, size: 22, score: 300, cadence: 1.6, count: 4 }),
  E(5, 'Capitão Menor', 'reflector', 'hover', 'cross', { hp: 16, size: 24, score: 360, cadence: 1.4, count: 6, elite: false }),
  E(5, 'Capitã Vexa', 'elite', 'strafe', 'aimBurst', { hp: 52, size: 30, score: 1000, cadence: 0.9, count: 4, elite: true, speed: 90 }),

  // ---- Setor 7: Campo de Distorção ----
  E(6, 'Nave Teleportadora', 'phase', 'zigzag', 'aim', { hp: 6, size: 17, score: 190 }),
  E(6, 'Orbe de Gravidade', 'orb', 'orbit', 'pulseRing', { hp: 8, size: 18, score: 250, cadence: 2, count: 12 }),
  E(6, 'Drone de Fase', 'phase', 'strafe', 'none', { hp: 4, size: 15, score: 140 }),
  E(6, 'Caçador Dimensional', 'reflector', 'kamikaze', 'aimBurst', { hp: 9, size: 20, score: 280, speed: 100, cadence: 1.4, count: 3 }),
  E(6, 'Torre Instável', 'turret', 'turret', 'spiral', { hp: 10, size: 21, score: 290, cadence: 0.5, count: 2 }),
  E(6, 'O Cubo de Fase', 'crystal', 'hover', 'ring', { hp: 50, size: 34, score: 920, cadence: 1.2, count: 16, elite: true }),

  // ---- Setor 8: Sol Partido ----
  E(7, 'Drone Solar', 'orb', 'strafe', 'none', { hp: 5, size: 16, score: 150 }),
  E(7, 'Asa de Fogo', 'wasp', 'dive', 'arc', { hp: 6, size: 18, score: 190, cadence: 1.4 }),
  E(7, 'Emissor de Raio', 'turret', 'turret', 'sweep', { hp: 10, size: 21, score: 280, cadence: 1.6, count: 3 }),
  E(7, 'Nave Fotônica', 'fighter', 'hover', 'cross', { hp: 8, size: 19, score: 250, cadence: 1.5, count: 4 }),
  E(7, 'Fragmento Solar', 'crystal', 'drift', 'ring', { hp: 7, size: 18, score: 220, cadence: 2, count: 8 }),
  E(7, 'Helios Rex', 'elite', 'hover', 'spiral', { hp: 54, size: 38, score: 950, cadence: 0.35, count: 3, elite: true }),

  // ---- Setor 9: Império Mecânico ----
  E(8, 'Caça Imperial', 'fighter', 'strafe', 'aimBurst', { hp: 6, size: 17, score: 180, cadence: 1.4, count: 3 }),
  E(8, 'Drone Escudo', 'shield', 'hover', 'none', { hp: 12, size: 19, score: 260 }),
  E(8, 'Nave Sniper', 'sniper', 'hover', 'aim', { hp: 8, size: 20, score: 250, cadence: 1.8, bspeed: 560 }),
  E(8, 'Lançador de Mísseis', 'bomber', 'descend', 'homingSlow', { hp: 11, size: 22, score: 300, cadence: 2, count: 2 }),
  E(8, 'Curador Mecânico', 'healer', 'drift', 'none', { hp: 14, size: 20, score: 320 }),
  E(8, 'General Axiom', 'elite', 'hover', 'wall', { hp: 60, size: 36, score: 1000, cadence: 1.6, count: 11, elite: true }),

  // ---- Setor 10: Abismo Negro ----
  E(9, 'Sombra de Nave', 'phase', 'strafe', 'aim', { hp: 6, size: 17, score: 190 }),
  E(9, 'Espectro Gravitacional', 'orb', 'orbit', 'pulseRing', { hp: 8, size: 18, score: 250, cadence: 2, count: 12 }),
  E(9, 'Mina Negra', 'mine', 'drift', 'none', { hp: 3, size: 15, score: 150, contact: true }),
  E(9, 'Drone Invisível', 'phase', 'zigzag', 'none', { hp: 5, size: 15, score: 160 }),
  E(9, 'Caçador de Luz', 'reflector', 'kamikaze', 'cross', { hp: 10, size: 20, score: 300, speed: 100, cadence: 1.4, count: 4 }),
  E(9, 'O Devorador de Luz', 'elite', 'hover', 'ring', { hp: 62, size: 38, score: 1050, cadence: 1, count: 18, elite: true }),

  // ---- Setor 11: Trono das Máquinas ----
  E(10, 'Guarda Imperial', 'shield', 'hover', 'aim', { hp: 13, size: 20, score: 280, cadence: 1.6 }),
  E(10, 'Drone Supremo', 'drone', 'strafe', 'aimBurst', { hp: 7, size: 16, score: 210, cadence: 1.3, count: 3 }),
  E(10, 'Canhão de Trilho', 'sniper', 'turret', 'aim', { hp: 11, size: 22, score: 320, cadence: 2.2, bspeed: 640 }),
  E(10, 'Nave Escudo Avançada', 'shield', 'descend', 'fan', { hp: 16, size: 23, score: 360, cadence: 1.8, count: 7 }),
  E(10, 'Executor Mecânico', 'reflector', 'hover', 'cross', { hp: 18, size: 25, score: 400, cadence: 1.4, count: 8 }),
  E(10, 'Núcleo Imperial', 'elite', 'hover', 'spiral', { hp: 70, size: 42, score: 1200, cadence: 0.35, count: 4, elite: true }),

  // ---- Setor 12: Além da Última Estrela ----
  E(11, 'Eco Invertido', 'phase', 'serpentine', 'aim', { hp: 8, size: 17, score: 220 }),
  E(11, 'Nave Invertida', 'crystal', 'zigzag', 'wave', { hp: 9, size: 19, score: 250, cadence: 1.4 }),
  E(11, 'Sombra de Boss', 'reflector', 'hover', 'wall', { hp: 20, size: 26, score: 420, cadence: 1.6, count: 9 }),
  E(11, 'Fragmento de Singularidade', 'crystal', 'orbit', 'pulseRing', { hp: 10, size: 20, score: 300, cadence: 1.8, count: 14 }),
  E(11, 'Anomalia Viva', 'larva', 'serpentine', 'spiral', { hp: 12, size: 21, score: 320, cadence: 0.5, count: 2 }),
  E(11, 'A Singularidade Viva', 'elite', 'hover', 'pulseRing', { hp: 80, size: 46, score: 1500, cadence: 1, count: 20, elite: true }),
];

export const ENEMIES_BY_SECTOR: EnemyDef[][] = Array.from({ length: 12 }, (_, s) => ENEMIES.filter((e) => e.sector === s));

// Cor dos projéteis por setor — sempre quente/rosa para contrastar com o
// ciano do jogador e ficar legível sobre o fundo daquele setor.
export const SECTOR_BULLET: string[] = [
  '#ff6a2a', '#ff5a9a', '#ffab3a', '#ffd24a', '#ff4a5a', '#ff40d0',
  '#ffab3a', '#ff7a2a', '#ff7a5a', '#ff5adf', '#ff9a3a', '#ff6adf',
];
