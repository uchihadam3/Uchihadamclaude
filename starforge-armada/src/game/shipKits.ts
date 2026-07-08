// Kits de combate por nave: tiro primário, habilidade ativa, ultimate e passiva.
// Cada nave mapeia para arquétipos de comportamento que o motor interpreta,
// com parâmetros e cores próprios — fazendo as 30 jogarem de formas distintas.
import { SHIP_BY_ID } from '../data/shipsData';

export type FirePattern = 'straight' | 'spread' | 'aimed' | 'wave' | 'beam' | 'lob' | 'homing';
export interface FireSpec {
  cadence: number; count: number; spread: number; speed: number; size: number; dmg: number;
  color: string; pattern: FirePattern;
  pierce?: boolean; dot?: number; slow?: number; explode?: boolean; curve?: number; chain?: number;
}
export type AbilityType = 'missiles' | 'dash' | 'shieldwall' | 'drone' | 'flamedash' | 'charge' | 'mark' | 'chain' | 'mines' | 'blackhole' | 'cloak' | 'blink' | 'swap';
export interface AbilitySpec { type: AbilityType; cd: number; color: string; name: string; count?: number; power?: number; }
export type UltType = 'barrage' | 'blades' | 'shockwave' | 'swarm' | 'beamSweep' | 'pierceLine' | 'omni' | 'storm' | 'minefield' | 'missileRain' | 'collapse' | 'supernova' | 'inferno' | 'blizzard';
export interface UltSpec { type: UltType; color: string; name: string; }
export type PassiveType = 'nodmgDamage' | 'dodgeCharge' | 'armor' | 'moveDamage' | 'critCombo' | 'lowlifeDamage' | 'regen' | 'tiny' | 'none';
export interface Kit { primary: FireSpec; ability: AbilitySpec; ultimate: UltSpec; passive: PassiveType; }

const acc = (id: string): string => SHIP_BY_ID[id]?.design.palette.accent ?? '#7ff0ff';
const acc2 = (id: string): string => SHIP_BY_ID[id]?.design.palette.accent2 ?? '#2a6cff';

// helper builder
function K(id: string, primary: Partial<FireSpec>, ability: AbilitySpec, ultimate: UltSpec, passive: PassiveType): [string, Kit] {
  const base: FireSpec = { cadence: 0.12, count: 2, spread: 0, speed: 900, size: 3.4, dmg: 2.4, color: acc(id), pattern: 'straight' };
  return [id, { primary: { ...base, ...primary }, ability, ultimate, passive }];
}

export const KITS: Record<string, Kit> = Object.fromEntries([
  K('falcon', { count: 2, dmg: 2.4 },
    { type: 'missiles', cd: 3.2, color: acc('falcon'), name: 'Míssil', count: 3 },
    { type: 'barrage', color: acc('falcon'), name: 'Barragem' }, 'nodmgDamage'),

  K('vesper', { count: 3, spread: 0.05, cadence: 0.08, speed: 1050, size: 2.6, dmg: 1.5 },
    { type: 'dash', cd: 2.2, color: acc('vesper'), name: 'Dash' },
    { type: 'blades', color: acc('vesper'), name: 'Lâminas' }, 'dodgeCharge'),

  K('bulwark', { count: 1, cadence: 0.32, speed: 760, size: 7, dmg: 8 },
    { type: 'shieldwall', cd: 4, color: acc('bulwark'), name: 'Escudo' },
    { type: 'shockwave', color: acc('bulwark'), name: 'Onda' }, 'armor'),

  K('lotus', { count: 1, cadence: 0.14, size: 3, dmg: 2, color: acc('lotus') },
    { type: 'drone', cd: 3, color: acc('lotus'), name: 'Drone', count: 1 },
    { type: 'swarm', color: acc('lotus'), name: 'Enxame' }, 'none'),

  K('comet', { count: 2, cadence: 0.09, speed: 1000, size: 3, dmg: 2 },
    { type: 'flamedash', cd: 2.6, color: acc('comet'), name: 'Avanço' },
    { type: 'inferno', color: acc('comet'), name: 'Cometas' }, 'moveDamage'),

  K('raven', { count: 1, cadence: 0.13, size: 4.5, dmg: 4.2, pierce: true, pattern: 'aimed' },
    { type: 'mark', cd: 4, color: acc('raven'), name: 'Marca' },
    { type: 'pierceLine', color: acc('raven'), name: 'Voo' }, 'critCombo'),

  K('orion', { pattern: 'beam', dmg: 22, size: 8, color: acc('orion') },
    { type: 'charge', cd: 4.5, color: acc('orion'), name: 'Foco' },
    { type: 'beamSweep', color: acc('orion'), name: 'Feixe' }, 'none'),

  K('hydra', { count: 5, spread: 0.7, cadence: 0.16, dmg: 2, size: 3 },
    { type: 'missiles', cd: 3.4, color: acc('hydra'), name: 'Cabeças', count: 5 },
    { type: 'omni', color: acc('hydra'), name: 'Dilúvio' }, 'regen'),

  K('mirage', { count: 2, spread: 0.12, cadence: 0.1, size: 3, dmg: 2.4 },
    { type: 'dash', cd: 2.4, color: acc('mirage'), name: 'Miragem' },
    { type: 'swarm', color: acc('mirage'), name: 'Legião' }, 'dodgeCharge'),

  K('basilisk', { count: 2, cadence: 0.14, dmg: 1.6, dot: 6, size: 3.6 },
    { type: 'mark', cd: 3.5, color: acc('basilisk'), name: 'Corrosão' },
    { type: 'omni', color: acc('basilisk'), name: 'Maré' }, 'none'),

  K('aegis', { count: 2, cadence: 0.15, dmg: 2.4, size: 4 },
    { type: 'shieldwall', cd: 3.5, color: acc('aegis'), name: 'Barreira', power: 1 },
    { type: 'shockwave', color: acc('aegis'), name: 'Égide' }, 'armor'),

  K('tempest', { count: 1, cadence: 0.13, pattern: 'aimed', dmg: 3, chain: 3, color: acc('tempest') },
    { type: 'chain', cd: 3, color: acc('tempest'), name: 'Corrente' },
    { type: 'storm', color: acc('tempest'), name: 'Tempestade' }, 'none'),

  K('warden', { count: 4, spread: 0.5, cadence: 0.2, dmg: 2.2, size: 3.4 },
    { type: 'mines', cd: 2.6, color: acc('warden'), name: 'Minas', count: 3 },
    { type: 'minefield', color: acc('warden'), name: 'Campo' }, 'none'),

  K('phantom', { count: 2, spread: 0.04, cadence: 0.1, pierce: true, dmg: 3.6, size: 3.4 },
    { type: 'cloak', cd: 4, color: acc('phantom'), name: 'Manto' },
    { type: 'barrage', color: acc('phantom'), name: 'Execução' }, 'none'),

  K('nova', { count: 1, cadence: 0.26, speed: 720, size: 6, dmg: 3, explode: true, pattern: 'lob' },
    { type: 'mines', cd: 3.2, color: acc('nova'), name: 'Detonar', count: 2 },
    { type: 'supernova', color: acc('nova'), name: 'Supernova' }, 'none'),

  K('needle', { count: 1, cadence: 0.16, pattern: 'aimed', pierce: true, dmg: 7, size: 3.2, speed: 1150 },
    { type: 'charge', cd: 3.5, color: acc('needle'), name: 'Travar' },
    { type: 'pierceLine', color: acc('needle'), name: 'Estilhaço' }, 'none'),

  K('mantis', { count: 3, spread: 0.5, cadence: 0.11, dmg: 3, size: 3.6, speed: 820 },
    { type: 'flamedash', cd: 2.4, color: acc('mantis'), name: 'Corte' },
    { type: 'blades', color: acc('mantis'), name: 'Frenesi' }, 'none'),

  K('solaris', { count: 3, spread: 0.16, cadence: 0.14, dmg: 3, size: 4, color: acc('solaris') },
    { type: 'charge', cd: 4, color: acc('solaris'), name: 'Carga' },
    { type: 'beamSweep', color: acc('solaris'), name: 'Aurora' }, 'none'),

  K('umbra', { count: 2, cadence: 0.11, dmg: 4, size: 4, color: acc('umbra') },
    { type: 'dash', cd: 2.2, color: acc('umbra'), name: 'Pacto' },
    { type: 'supernova', color: acc('umbra'), name: 'Eclipse' }, 'lowlifeDamage'),

  K('glacier', { count: 3, spread: 0.3, cadence: 0.18, dmg: 2.4, slow: 1.4, size: 4, speed: 780 },
    { type: 'chain', cd: 3, color: acc('glacier'), name: 'Nevasca' },
    { type: 'blizzard', color: acc('glacier'), name: 'Era Glacial' }, 'none'),

  K('valkyrie', { count: 2, cadence: 0.22, pattern: 'homing', dmg: 3, size: 4 },
    { type: 'missiles', cd: 2.8, color: acc('valkyrie'), name: 'Travar', count: 6 },
    { type: 'missileRain', color: acc('valkyrie'), name: 'Chuva' }, 'none'),

  K('scarab', { count: 1, cadence: 0.16, dmg: 3, size: 5 },
    { type: 'drone', cd: 3, color: acc('scarab'), name: 'Casulo', count: 2 },
    { type: 'swarm', color: acc('scarab'), name: 'Carapaça' }, 'armor'),

  K('pulse', { count: 2, cadence: 0.1, dmg: 2.6, size: 3.6, color: acc('pulse') },
    { type: 'charge', cd: 3, color: acc('pulse'), name: 'Batida' },
    { type: 'barrage', color: acc('pulse'), name: 'Crescendo' }, 'none'),

  K('spectra', { count: 2, cadence: 0.12, dmg: 2.6, size: 3.6 },
    { type: 'swap', cd: 1.2, color: acc('spectra'), name: 'Espectro' },
    { type: 'omni', color: acc('spectra'), name: 'Arco-íris' }, 'none'),

  K('leviathan', { count: 2, spread: 0.3, cadence: 0.2, dmg: 6, size: 6, speed: 800 },
    { type: 'missiles', cd: 3, color: acc('leviathan'), name: 'Broadside', count: 4 },
    { type: 'omni', color: acc('leviathan'), name: 'Bombardeio' }, 'armor'),

  K('pixie', { count: 1, cadence: 0.08, dmg: 1.6, size: 2.4, speed: 1100 },
    { type: 'blink', cd: 1.6, color: acc('pixie'), name: 'Piscar' },
    { type: 'shockwave', color: acc('pixie'), name: 'Poeira' }, 'tiny'),

  K('railgun', { pattern: 'beam', dmg: 30, size: 10, pierce: true, color: acc('railgun') },
    { type: 'charge', cd: 4.5, color: acc('railgun'), name: 'Sobrecarga' },
    { type: 'beamSweep', color: acc('railgun'), name: 'Íons' }, 'none'),

  K('swarm', { count: 6, spread: 0.6, cadence: 0.13, dmg: 1.4, size: 2.6 },
    { type: 'drone', cd: 2.6, color: acc('swarm'), name: 'Desmembrar', count: 3 },
    { type: 'swarm', color: acc('swarm'), name: 'Colmeia' }, 'none'),

  K('eclipse', { count: 2, cadence: 0.11, dmg: 3, size: 3.8, color: acc('eclipse') },
    { type: 'swap', cd: 1.4, color: acc('eclipse'), name: 'Virada' },
    { type: 'omni', color: acc('eclipse'), name: 'Eclipse' }, 'none'),

  K('singularity', { count: 2, cadence: 0.12, dmg: 3.4, size: 4, curve: 1, color: acc('singularity') },
    { type: 'blackhole', cd: 5, color: acc('singularity'), name: 'Colapso' },
    { type: 'collapse', color: acc('singularity'), name: 'Horizonte' }, 'none'),
]);

export function kitFor(id: string): Kit { return KITS[id] ?? KITS['falcon']; }
