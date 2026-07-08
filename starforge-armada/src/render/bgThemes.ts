// Temas de cenário — cada setor da campanha e cada modo ganha um fundo único:
// paleta de nebulosa própria, cor das estrelas, um elemento cênico (planeta,
// sol, buraco negro, estação, fenda, cristais) e partículas de ambiente.

export interface NebulaBlob { color: string; x: number; y: number; r: number; }

export type SetPiece =
  | { kind: 'planet'; x: number; y: number; r: number; colors: [string, string, string, string]; glow: string; ring?: string; bands?: boolean }
  | { kind: 'sun'; x: number; y: number; r: number; core: string; corona: string }
  | { kind: 'blackhole'; x: number; y: number; r: number; disk: string; glow: string }
  | { kind: 'station'; x: number; y: number; r: number; tint: string; light: string }
  | { kind: 'rift'; x: number; y: number; r: number; color: string }
  | { kind: 'crystal'; x: number; y: number; r: number; color: string }
  | { kind: 'none' };

export interface BgTheme {
  id: string;
  base: [string, string, string];
  nebula: NebulaBlob[];
  stars: string[];
  set: SetPiece;
  ambient: 'embers' | 'snow' | 'sparks' | 'none';
  debris: number;
  vignette?: string;
}

const N = (color: string, x: number, y: number, r: number): NebulaBlob => ({ color, x, y, r });

export const THEMES: Record<string, BgTheme> = {
  // ---------- 12 setores da campanha ----------
  junkbelt: { // Cinturão de Sucata
    id: 'junkbelt', base: ['#120c08', '#0e0a0c', '#06060c'],
    nebula: [N('#b5651d', 0.25, 0.3, 0.55), N('#d98a2b', 0.8, 0.22, 0.5), N('#7a3b12', 0.6, 0.7, 0.6), N('#3a2a4a', 0.1, 0.8, 0.44)],
    stars: ['#ffe6c4', '#ffd9a8', '#dfe9ff'],
    set: { kind: 'station', x: 0.8, y: 0.2, r: 0.34, tint: '#6a5a48', light: '#ffb347' },
    ambient: 'embers', debris: 14, vignette: '#1a0e04',
  },
  bluenebula: { // Nebulosa Azul
    id: 'bluenebula', base: ['#060c1c', '#070a1a', '#05060f'],
    nebula: [N('#1f6fe0', 0.28, 0.28, 0.6), N('#12b6c9', 0.75, 0.25, 0.56), N('#4a7bff', 0.6, 0.68, 0.62), N('#2a4bd8', 0.12, 0.78, 0.5)],
    stars: ['#dfe9ff', '#9fc4ff', '#bfe0ff'],
    set: { kind: 'planet', x: 0.8, y: 0.18, r: 0.34, colors: ['#7fd0ff', '#3a7ec8', '#1e3a72', '#0a1230'], glow: '#3a9fff', bands: true },
    ambient: 'none', debris: 5, vignette: '#04101c',
  },
  colony: { // Colônia Perdida
    id: 'colony', base: ['#0a0c12', '#08090f', '#05060c'],
    nebula: [N('#3a4a66', 0.25, 0.3, 0.5), N('#556b8a', 0.78, 0.24, 0.48), N('#2a3550', 0.55, 0.7, 0.56), N('#6a4a7a', 0.15, 0.8, 0.4)],
    stars: ['#e6eefc', '#c8d6ea', '#a8c0e0'],
    set: { kind: 'station', x: 0.74, y: 0.22, r: 0.4, tint: '#8fa2bc', light: '#7ff0ff' },
    ambient: 'sparks', debris: 10, vignette: '#0a0e16',
  },
  asteroids: { // Mar de Asteroides
    id: 'asteroids', base: ['#100c08', '#0c0a0a', '#06060c'],
    nebula: [N('#8a6a3a', 0.25, 0.3, 0.5), N('#a07a45', 0.78, 0.26, 0.48), N('#5a4a30', 0.6, 0.7, 0.6), N('#3a3050', 0.12, 0.8, 0.42)],
    stars: ['#ffe6c4', '#e6d6b8', '#dfe9ff'],
    set: { kind: 'planet', x: 0.82, y: 0.2, r: 0.3, colors: ['#c9a87a', '#8a6a45', '#4a3520', '#1a1208'], glow: '#c98a4a', bands: false },
    ambient: 'none', debris: 22, vignette: '#100a04',
  },
  crimson: { // Zona Carmesim
    id: 'crimson', base: ['#160608', '#12060a', '#08040a'],
    nebula: [N('#d81a3a', 0.28, 0.28, 0.58), N('#ff3a5a', 0.76, 0.24, 0.5), N('#8a1030', 0.6, 0.7, 0.62), N('#5a0a3a', 0.12, 0.8, 0.48)],
    stars: ['#ffd9d9', '#ff9fb0', '#ffe6c4'],
    set: { kind: 'planet', x: 0.8, y: 0.18, r: 0.32, colors: ['#ff8a7a', '#c83a4a', '#7a1a2a', '#2a0810'], glow: '#ff3a4a', bands: true },
    ambient: 'embers', debris: 9, vignette: '#1a0408',
  },
  pirate: { // Fronteira Pirata
    id: 'pirate', base: ['#0c0616', '#0a0714', '#06060f'],
    nebula: [N('#d83a8e', 0.26, 0.3, 0.56), N('#2fd88a', 0.78, 0.24, 0.5), N('#a02fd8', 0.58, 0.7, 0.6), N('#2a8ad8', 0.12, 0.82, 0.46)],
    stars: ['#ffd9f0', '#a8ffd0', '#dfe9ff'],
    set: { kind: 'station', x: 0.78, y: 0.2, r: 0.36, tint: '#5a4a6a', light: '#2fd88a' },
    ambient: 'sparks', debris: 12, vignette: '#0c0618',
  },
  distortion: { // Campo de Distorção
    id: 'distortion', base: ['#0e0620', '#0a0518', '#06040f'],
    nebula: [N('#7b2ff7', 0.28, 0.3, 0.6), N('#b83aff', 0.76, 0.22, 0.54), N('#4a2fd8', 0.6, 0.7, 0.64), N('#d83aae', 0.14, 0.8, 0.5)],
    stars: ['#e6d9ff', '#c8a8ff', '#dfe9ff'],
    set: { kind: 'rift', x: 0.72, y: 0.3, r: 0.4, color: '#c08aff' },
    ambient: 'sparks', debris: 6, vignette: '#0e0620',
  },
  brokensun: { // Sol Partido
    id: 'brokensun', base: ['#1a0e04', '#140a06', '#08050a'],
    nebula: [N('#ff9a2a', 0.3, 0.3, 0.56), N('#ffcf3a', 0.74, 0.26, 0.5), N('#d8461a', 0.6, 0.7, 0.6), N('#7a2a10', 0.14, 0.8, 0.48)],
    stars: ['#fff0c4', '#ffd9a8', '#ffb87a'],
    set: { kind: 'sun', x: 0.76, y: 0.22, r: 0.3, core: '#fff3c0', corona: '#ff8a2a' },
    ambient: 'embers', debris: 7, vignette: '#180a02',
  },
  empire: { // Império Mecânico
    id: 'empire', base: ['#06101a', '#060c16', '#05070f'],
    nebula: [N('#2a9fd8', 0.26, 0.3, 0.5), N('#5ad0ff', 0.78, 0.24, 0.48), N('#2a6ad8', 0.6, 0.7, 0.56), N('#4a5a8a', 0.14, 0.8, 0.44)],
    stars: ['#eafcff', '#bfe0ff', '#dfe9ff'],
    set: { kind: 'station', x: 0.76, y: 0.2, r: 0.42, tint: '#9fb4cc', light: '#7ff0ff' },
    ambient: 'none', debris: 8, vignette: '#06101a',
  },
  abyss: { // Abismo Negro
    id: 'abyss', base: ['#04040a', '#050308', '#020206'],
    nebula: [N('#3a1a6a', 0.28, 0.3, 0.5), N('#5a2a8a', 0.76, 0.24, 0.46), N('#2a1050', 0.6, 0.7, 0.56), N('#6a2a5a', 0.12, 0.82, 0.42)],
    stars: ['#c8b8ff', '#9f8ad8', '#dfe9ff'],
    set: { kind: 'blackhole', x: 0.72, y: 0.26, r: 0.24, disk: '#b06aff', glow: '#7a3ad8' },
    ambient: 'sparks', debris: 5, vignette: '#04040a',
  },
  throne: { // Trono das Máquinas
    id: 'throne', base: ['#140a06', '#100810', '#08040a'],
    nebula: [N('#d8a83a', 0.28, 0.3, 0.54), N('#ff6a3a', 0.76, 0.24, 0.5), N('#a03a2a', 0.6, 0.7, 0.6), N('#5a2a6a', 0.14, 0.8, 0.48)],
    stars: ['#ffe6b8', '#ffc49f', '#dfe9ff'],
    set: { kind: 'planet', x: 0.78, y: 0.18, r: 0.36, colors: ['#ffd07a', '#c8863a', '#7a4a20', '#2a1810'], glow: '#ffab3a', ring: '#ffd9a8', bands: true },
    ambient: 'embers', debris: 10, vignette: '#140804',
  },
  surreal: { // Além da Última Estrela
    id: 'surreal', base: ['#0a0818', '#0a0714', '#06060f'],
    nebula: [N('#2fd8c0', 0.26, 0.28, 0.58), N('#d83aae', 0.76, 0.24, 0.54), N('#7b6aff', 0.58, 0.68, 0.62), N('#3aff9a', 0.14, 0.82, 0.48)],
    stars: ['#eafcff', '#d9c8ff', '#a8ffe0'],
    set: { kind: 'crystal', x: 0.74, y: 0.26, r: 0.32, color: '#8affd0' },
    ambient: 'sparks', debris: 6, vignette: '#0a0818',
  },
  // ---------- temas extras (modos) ----------
  emerald: { id: 'emerald', base: ['#04120c', '#04100a', '#040a08'],
    nebula: [N('#2fd86a', 0.28, 0.3, 0.56), N('#8aff3a', 0.76, 0.24, 0.5), N('#1a8a4a', 0.6, 0.7, 0.6), N('#2a6a5a', 0.14, 0.8, 0.46)],
    stars: ['#d9ffd9', '#a8ffb0', '#dfe9ff'],
    set: { kind: 'planet', x: 0.8, y: 0.2, r: 0.3, colors: ['#8aff9a', '#3ac86a', '#1a7a3a', '#082010'], glow: '#3aff7a', bands: true },
    ambient: 'sparks', debris: 8, vignette: '#04120c' },
  frost: { id: 'frost', base: ['#081420', '#06101c', '#050a12'],
    nebula: [N('#5ad0ff', 0.28, 0.3, 0.54), N('#a8e6ff', 0.76, 0.24, 0.5), N('#3a8ad8', 0.6, 0.7, 0.6), N('#7a9fd8', 0.14, 0.8, 0.46)],
    stars: ['#eafcff', '#bfe6ff', '#dfe9ff'],
    set: { kind: 'planet', x: 0.8, y: 0.18, r: 0.34, colors: ['#eafcff', '#9fd0ee', '#5a86b8', '#1a2a4a'], glow: '#8ad0ff', bands: false },
    ambient: 'snow', debris: 6, vignette: '#081420' },
  inferno: { id: 'inferno', base: ['#180604', '#140406', '#0a0208'],
    nebula: [N('#ff4a1a', 0.28, 0.3, 0.56), N('#ff8a2a', 0.76, 0.24, 0.5), N('#d81a3a', 0.6, 0.7, 0.62), N('#7a0a2a', 0.14, 0.8, 0.5)],
    stars: ['#ffe0c4', '#ffb09f', '#ffd9a8'],
    set: { kind: 'sun', x: 0.24, y: 0.2, r: 0.24, core: '#fff0d0', corona: '#ff5a2a' },
    ambient: 'embers', debris: 9, vignette: '#180402' },
  // ---------- menu (assinatura) ----------
  menu: { id: 'menu', base: ['#070a1a', '#0a0714', '#05060f'],
    nebula: [N('#7b2ff7', 0.22, 0.3, 0.6), N('#12b6c9', 0.78, 0.2, 0.55), N('#d83a8e', 0.6, 0.62, 0.65), N('#2a4bd8', 0.12, 0.78, 0.5)],
    stars: ['#dfe9ff', '#9fc4ff', '#ffd9a8', '#ff9fd0'],
    set: { kind: 'planet', x: 0.8, y: 0.16, r: 0.36, colors: ['#6f86c8', '#3a4e86', '#20264a', '#0a0c1c'], glow: '#3a6fff', bands: true },
    ambient: 'none', debris: 7 },
};

// ordem dos 12 setores da campanha
export const SECTOR_THEMES = ['junkbelt', 'bluenebula', 'colony', 'asteroids', 'crimson', 'pirate', 'distortion', 'brokensun', 'empire', 'abyss', 'throne', 'surreal'];

export function themeForSector(i: number): BgTheme { return THEMES[SECTOR_THEMES[i]] ?? THEMES.bluenebula; }
export function themeById(id?: string): BgTheme | null { return (id && THEMES[id]) ? THEMES[id] : null; }
