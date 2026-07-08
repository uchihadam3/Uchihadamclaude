// 12 chefes principais + 5 secretos. Cada um tem forma visual própria, várias
// fases (com conjuntos de ataque diferentes), partes destrutíveis e um ataque
// desesperado na última fase.
import type { Palette } from '../render/shipGen';
import type { Pattern } from './enemiesData';
import { ENEMY_PAL } from './enemiesData';

export type BossForm = 'scrap' | 'serpent' | 'sentinel' | 'drill' | 'heart' | 'ace' | 'cube' | 'sun' | 'general' | 'devourer' | 'core' | 'singularity';

export interface BossAttack { pattern: Pattern; cadence: number; count: number; bspeed: number; }
export interface BossPhase { at: number; move: 'sweep' | 'hover' | 'chase'; attacks: BossAttack[]; }
export interface BossPart { x: number; y: number; hp: number; pattern?: Pattern; cadence?: number; count?: number; bspeed?: number; }
export interface BossDef {
  id: string; name: string; title: string; sector: number; secret?: boolean;
  form: BossForm; pal: Palette; size: number; hp: number;
  parts: BossPart[]; phases: BossPhase[];
}

const A = (pattern: Pattern, cadence: number, count: number, bspeed = 320): BossAttack => ({ pattern, cadence, count, bspeed });

export const BOSSES: BossDef[] = [
  {
    id: 'ferro', name: 'O Ferro-Velho Vivo', title: 'Cinturão de Sucata', sector: 0, form: 'scrap', pal: ENEMY_PAL.rust, size: 62, hp: 900,
    parts: [{ x: -0.7, y: 0.2, hp: 120, pattern: 'aim', cadence: 1.4, count: 1, bspeed: 340 }, { x: 0.7, y: 0.2, hp: 120, pattern: 'fan', cadence: 1.8, count: 4, bspeed: 300 }],
    phases: [
      { at: 1, move: 'sweep', attacks: [A('fan', 1.6, 6, 300), A('aim', 1.2, 2, 360)] },
      { at: 0.6, move: 'sweep', attacks: [A('spread', 1.2, 4, 320), A('rain', 1.4, 6, 300)] },
      { at: 0.25, move: 'chase', attacks: [A('ring', 1.0, 16, 300), A('aimBurst', 0.9, 3, 380)] },
    ],
  },
  {
    id: 'serpente', name: 'Serpente de Plasma', title: 'Nebulosa Azul', sector: 1, form: 'serpent', pal: ENEMY_PAL.ice, size: 54, hp: 950,
    parts: [],
    phases: [
      { at: 1, move: 'sweep', attacks: [A('wave', 0.9, 5, 300), A('aim', 1.4, 1, 340)] },
      { at: 0.55, move: 'sweep', attacks: [A('spiral', 0.4, 2, 300), A('arc', 1.4, 5, 300)] },
      { at: 0.25, move: 'chase', attacks: [A('spiral', 0.28, 3, 320), A('ring', 1.2, 14, 280)] },
    ],
  },
  {
    id: 'sentinel', name: 'Diretora Sentinel', title: 'Colônia Perdida', sector: 2, form: 'sentinel', pal: ENEMY_PAL.steel, size: 60, hp: 1000,
    parts: [{ x: -0.9, y: -0.1, hp: 140, pattern: 'aim', cadence: 1.2, count: 1, bspeed: 420 }, { x: 0.9, y: -0.1, hp: 140, pattern: 'aim', cadence: 1.2, count: 1, bspeed: 420 }],
    phases: [
      { at: 1, move: 'hover', attacks: [A('wall', 2.0, 11, 260), A('aim', 1.4, 2, 400)] },
      { at: 0.6, move: 'hover', attacks: [A('cross', 1.0, 4, 340), A('wall', 1.8, 11, 280)] },
      { at: 0.25, move: 'sweep', attacks: [A('sweep', 0.8, 4, 360), A('ring', 1.4, 16, 280)] },
    ],
  },
  {
    id: 'broca', name: 'Broca Titã', title: 'Mar de Asteroides', sector: 3, form: 'drill', pal: ENEMY_PAL.brown, size: 66, hp: 1100,
    parts: [{ x: 0, y: 0.9, hp: 200, pattern: 'aim', cadence: 0.8, count: 2, bspeed: 460 }],
    phases: [
      { at: 1, move: 'sweep', attacks: [A('rain', 1.0, 8, 320), A('aim', 1.2, 2, 380)] },
      { at: 0.55, move: 'chase', attacks: [A('spread', 1.0, 5, 340), A('fan', 1.2, 8, 300)] },
      { at: 0.25, move: 'chase', attacks: [A('ring', 0.9, 18, 300), A('rain', 0.8, 10, 340)] },
    ],
  },
  {
    id: 'coracao', name: 'Coração Vermelho', title: 'Zona Carmesim', sector: 4, form: 'heart', pal: ENEMY_PAL.flesh, size: 64, hp: 1050,
    parts: [{ x: -0.8, y: 0.3, hp: 130, pattern: 'split', cadence: 1.6, count: 1, bspeed: 300 }, { x: 0.8, y: 0.3, hp: 130, pattern: 'split', cadence: 1.6, count: 1, bspeed: 300 }],
    phases: [
      { at: 1, move: 'hover', attacks: [A('pulseRing', 1.4, 14, 260), A('aim', 1.4, 2, 340)] },
      { at: 0.6, move: 'sweep', attacks: [A('spiral', 0.5, 2, 280), A('spread', 1.2, 5, 320)] },
      { at: 0.25, move: 'chase', attacks: [A('pulseRing', 0.8, 20, 280), A('split', 1.0, 1, 320)] },
    ],
  },
  {
    id: 'vexa', name: 'Capitã Vexa', title: 'Fronteira Pirata', sector: 5, form: 'ace', pal: ENEMY_PAL.neon, size: 46, hp: 1000,
    parts: [],
    phases: [
      { at: 1, move: 'chase', attacks: [A('aimBurst', 0.9, 3, 420), A('spread', 1.2, 3, 360)] },
      { at: 0.6, move: 'chase', attacks: [A('aim', 0.6, 2, 460), A('fan', 1.2, 6, 320)] },
      { at: 0.25, move: 'chase', attacks: [A('aimBurst', 0.5, 4, 520), A('cross', 1.0, 4, 360)] },
    ],
  },
  {
    id: 'cubo', name: 'O Cubo de Fase', title: 'Campo de Distorção', sector: 6, form: 'cube', pal: ENEMY_PAL.violet, size: 58, hp: 1100,
    parts: [],
    phases: [
      { at: 1, move: 'hover', attacks: [A('ring', 1.4, 16, 260), A('spiral', 0.5, 2, 280)] },
      { at: 0.6, move: 'sweep', attacks: [A('cross', 0.8, 4, 340), A('pulseRing', 1.2, 16, 260)] },
      { at: 0.25, move: 'chase', attacks: [A('spiral', 0.3, 3, 300), A('ring', 1.0, 20, 300)] },
    ],
  },
  {
    id: 'helios', name: 'Helios Rex', title: 'Sol Partido', sector: 7, form: 'sun', pal: ENEMY_PAL.gold, size: 66, hp: 1200,
    parts: [{ x: -0.85, y: 0, hp: 150, pattern: 'sweep', cadence: 1.0, count: 3, bspeed: 340 }, { x: 0.85, y: 0, hp: 150, pattern: 'sweep', cadence: 1.0, count: 3, bspeed: 340 }],
    phases: [
      { at: 1, move: 'hover', attacks: [A('spiral', 0.4, 3, 280), A('aim', 1.2, 2, 400)] },
      { at: 0.6, move: 'sweep', attacks: [A('ring', 1.0, 20, 280), A('sweep', 0.9, 4, 360)] },
      { at: 0.25, move: 'chase', attacks: [A('spiral', 0.24, 4, 300), A('pulseRing', 0.9, 24, 300)] },
    ],
  },
  {
    id: 'axiom', name: 'General Axiom', title: 'Império Mecânico', sector: 8, form: 'general', pal: ENEMY_PAL.clean, size: 64, hp: 1250,
    parts: [{ x: -0.95, y: -0.2, hp: 160, pattern: 'homingSlow', cadence: 2.2, count: 2, bspeed: 220 }, { x: 0.95, y: -0.2, hp: 160, pattern: 'aim', cadence: 1.0, count: 1, bspeed: 480 }],
    phases: [
      { at: 1, move: 'hover', attacks: [A('wall', 1.8, 11, 280), A('homingSlow', 2.4, 2, 220)] },
      { at: 0.6, move: 'hover', attacks: [A('cross', 0.9, 4, 360), A('fan', 1.2, 8, 320)] },
      { at: 0.25, move: 'sweep', attacks: [A('wall', 1.4, 13, 300), A('aimBurst', 0.7, 4, 460)] },
    ],
  },
  {
    id: 'devorador', name: 'O Devorador de Luz', title: 'Abismo Negro', sector: 9, form: 'devourer', pal: ENEMY_PAL.abyss, size: 68, hp: 1300,
    parts: [],
    phases: [
      { at: 1, move: 'sweep', attacks: [A('ring', 1.2, 18, 240), A('spiral', 0.5, 2, 260)] },
      { at: 0.6, move: 'chase', attacks: [A('pulseRing', 1.0, 20, 260), A('aim', 1.0, 3, 380)] },
      { at: 0.25, move: 'chase', attacks: [A('spiral', 0.26, 4, 280), A('ring', 0.9, 24, 280)] },
    ],
  },
  {
    id: 'nucleo', name: 'Núcleo Imperial', title: 'Trono das Máquinas', sector: 10, form: 'core', pal: ENEMY_PAL.imperial, size: 72, hp: 1500,
    parts: [{ x: -1.0, y: 0, hp: 180, pattern: 'sweep', cadence: 0.9, count: 3, bspeed: 360 }, { x: 1.0, y: 0, hp: 180, pattern: 'sweep', cadence: 0.9, count: 3, bspeed: 360 }, { x: 0, y: -0.9, hp: 200, pattern: 'aim', cadence: 0.8, count: 2, bspeed: 520 }],
    phases: [
      { at: 1, move: 'hover', attacks: [A('cross', 0.8, 4, 360), A('wall', 1.6, 13, 300)] },
      { at: 0.6, move: 'hover', attacks: [A('spiral', 0.4, 3, 300), A('ring', 1.2, 20, 300)] },
      { at: 0.25, move: 'sweep', attacks: [A('spiral', 0.24, 5, 320), A('sweep', 0.7, 5, 400)] },
    ],
  },
  {
    id: 'singularidade', name: 'A Singularidade Viva', title: 'Além da Última Estrela', sector: 11, form: 'singularity', pal: ENEMY_PAL.surreal, size: 74, hp: 1800,
    parts: [],
    phases: [
      { at: 1, move: 'hover', attacks: [A('spiral', 0.4, 3, 280), A('ring', 1.2, 22, 260)] },
      { at: 0.66, move: 'sweep', attacks: [A('pulseRing', 0.9, 24, 280), A('cross', 0.8, 4, 360)] },
      { at: 0.4, move: 'chase', attacks: [A('spiral', 0.24, 5, 300), A('aimBurst', 0.7, 4, 440)] },
      { at: 0.18, move: 'chase', attacks: [A('spiral', 0.18, 6, 320), A('ring', 0.7, 28, 300)] },
    ],
  },

  // ---------------- CHEFES SECRETOS ----------------
  {
    id: 'cometa', name: 'O Cometa Adormecido', title: 'Segredo · Nebulosa Azul', sector: 1, secret: true, form: 'sun', pal: ENEMY_PAL.ice, size: 60, hp: 1100,
    parts: [],
    phases: [
      { at: 1, move: 'chase', attacks: [A('aim', 0.8, 3, 460), A('rain', 1.0, 8, 340)] },
      { at: 0.5, move: 'chase', attacks: [A('spiral', 0.3, 3, 320), A('ring', 1.0, 20, 300)] },
    ],
  },
  {
    id: 'rainha', name: 'A Rainha Pirata', title: 'Segredo · Fronteira Pirata', sector: 5, secret: true, form: 'ace', pal: ENEMY_PAL.neon, size: 52, hp: 1300,
    parts: [],
    phases: [
      { at: 1, move: 'chase', attacks: [A('aimBurst', 0.7, 4, 480), A('cross', 0.9, 4, 360)] },
      { at: 0.5, move: 'chase', attacks: [A('aim', 0.4, 3, 520), A('spiral', 0.4, 2, 320)] },
    ],
  },
  {
    id: 'motor', name: 'O Motor Antigo', title: 'Segredo · Mar de Asteroides', sector: 3, secret: true, form: 'core', pal: ENEMY_PAL.brown, size: 68, hp: 1400,
    parts: [{ x: -1.0, y: 0, hp: 200, pattern: 'sweep', cadence: 1.0, count: 3, bspeed: 340 }, { x: 1.0, y: 0, hp: 200, pattern: 'sweep', cadence: 1.0, count: 3, bspeed: 340 }],
    phases: [
      { at: 1, move: 'hover', attacks: [A('ring', 1.2, 18, 280), A('rain', 1.0, 8, 340)] },
      { at: 0.5, move: 'sweep', attacks: [A('spiral', 0.3, 3, 300), A('cross', 0.8, 4, 360)] },
    ],
  },
  {
    id: 'semnome', name: 'A Nave Sem Nome', title: 'Segredo · Campo de Distorção', sector: 6, secret: true, form: 'ace', pal: ENEMY_PAL.abyss, size: 50, hp: 1250,
    parts: [],
    phases: [
      { at: 1, move: 'chase', attacks: [A('aim', 0.6, 2, 500), A('pulseRing', 1.2, 16, 280)] },
      { at: 0.5, move: 'chase', attacks: [A('spiral', 0.3, 3, 320), A('aimBurst', 0.6, 4, 480)] },
    ],
  },
  {
    id: 'buracobranco', name: 'O Buraco Branco', title: 'Segredo Final', sector: 11, secret: true, form: 'singularity', pal: { base: '#c8c8e0', light: '#ffffff', dark: '#8888a8', accent: '#ffffff', accent2: '#a0e0ff' }, size: 78, hp: 2200,
    parts: [],
    phases: [
      { at: 1, move: 'hover', attacks: [A('ring', 1.0, 26, 280), A('spiral', 0.34, 4, 300)] },
      { at: 0.66, move: 'sweep', attacks: [A('pulseRing', 0.8, 26, 300), A('cross', 0.7, 4, 380)] },
      { at: 0.33, move: 'chase', attacks: [A('spiral', 0.18, 6, 320), A('ring', 0.6, 30, 320)] },
    ],
  },
];

export const BOSS_BY_ID: Record<string, BossDef> = {};
for (const b of BOSSES) BOSS_BY_ID[b.id] = b;
export const MAIN_BOSSES = BOSSES.filter((b) => !b.secret);
export const SECRET_BOSSES = BOSSES.filter((b) => b.secret);
