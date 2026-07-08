// 15 modos de jogo, cada um com regras realmente diferentes: orientação
// (vertical / horizontal / arena 360°), modificadores, vidas, boss rush e
// relíquias. Cada modo tem ranking e recompensa próprios (Parte 8).
import type { Orient, Modifiers } from '../game/engine';

export interface ModeDef {
  id: string; name: string; desc: string; orient: Orient;
  mod: Partial<Modifiers>; lives: number; bossRush?: boolean; relics?: boolean;
  color: string; icon: string; theme: string;
}

export const MODES: ModeDef[] = [
  { id: 'arcade', name: 'Arcade Clássico', desc: 'Ondas em sequência, 3 vidas, foco em pontuação. A experiência pura.',
    orient: 'vertical', mod: {}, lives: 3, color: '#7ff0ff', icon: '▲', theme: 'empire' },

  { id: 'survival', name: 'Sobrevivência Infinita', desc: 'Ondas infinitas, dificuldade crescente. Quanto mais tempo, maior o placar.',
    orient: 'vertical', mod: { ultRate: 1.2 }, lives: 3, color: '#5affa0', icon: '∞', theme: 'bluenebula' },

  { id: 'arena', name: 'Arena 360°', desc: 'Arena aberta: você voa para todos os lados e mira sozinho enquanto inimigos vêm de TODAS as bordas.',
    orient: 'arena', mod: {}, lives: 3, color: '#ffd24a', icon: '◎', theme: 'distortion' },

  { id: 'lateral', name: 'Investida Lateral', desc: 'Rotação horizontal: sua nave atira da esquerda para a direita e os inimigos avançam da direita para a esquerda.',
    orient: 'horizontal', mod: {}, lives: 3, color: '#ff7ad8', icon: '▶', theme: 'pirate' },

  { id: 'bossrush', name: 'Boss Rush', desc: 'Só chefes, um atrás do outro. Ranking por tempo e dano recebido.',
    orient: 'vertical', mod: {}, lives: 3, bossRush: true, color: '#ff5a7a', icon: '☠', theme: 'crimson' },

  { id: 'chaos', name: 'Caos de Projéteis', desc: 'Bullet hell puro: muito mais tiros e maiores. Uma vida. Foco total em desvio.',
    orient: 'vertical', mod: { projScale: 1.35, enemyHp: 0.8, eliteFreq: 1.4 }, lives: 1, color: '#c090ff', icon: '✳', theme: 'abyss' },

  { id: 'combo', name: 'Caça ao Combo', desc: 'Placar dobra o valor do combo. Mate sem parar para não perder a corrente.',
    orient: 'vertical', mod: { scoreMult: 1.4 }, lives: 3, color: '#ffab3a', icon: '✦', theme: 'brokensun' },

  { id: 'asteroids', name: 'Campo de Asteroides', desc: 'Inimigos mais rápidos e agressivos, muitas colisões. Reflexo acima de tudo.',
    orient: 'vertical', mod: { enemySpeed: 1.2 }, lives: 3, color: '#c0975a', icon: '◆', theme: 'asteroids' },

  { id: 'rivals', name: 'Arena dos Rivais', desc: 'Arena 360° com inimigos de elite reforçados — quase mini-chefes por todo lado.',
    orient: 'arena', mod: { enemyHp: 1.5, eliteFreq: 2 }, lives: 3, color: '#ff8a3a', icon: '⬟', theme: 'inferno' },

  { id: 'rogue', name: 'Rogue Sector', desc: 'Run com relíquias que mudam sua build. Duas vidas, risco alto, recompensa alta.',
    orient: 'vertical', mod: { scoreMult: 1.2 }, lives: 2, relics: true, color: '#a060ff', icon: '❖', theme: 'surreal' },

  { id: 'relic', name: 'Modo Relíquia', desc: 'Escolha relíquias antes de começar e monte uma build temporária poderosa.',
    orient: 'vertical', mod: {}, lives: 3, relics: true, color: '#7fffd0', icon: '◈', theme: 'throne' },

  { id: 'daily', name: 'Desafio Diário', desc: 'Modificadores fixos do dia, uma vida. Ranking diário zera à meia-noite.',
    orient: 'vertical', mod: { scoreMult: 1.3, enemySpeed: 1.1 }, lives: 1, color: '#5ad0ff', icon: '☼', theme: 'frost' },

  { id: 'weekly', name: 'Desafio Semanal', desc: 'Mais longo e difícil, com recompensas raras. Uma vida.',
    orient: 'vertical', mod: { enemySpeed: 1.2, projScale: 1.15, scoreMult: 1.5 }, lives: 1, color: '#9fe6ff', icon: '✧', theme: 'colony' },

  { id: 'precision', name: 'Modo Precisão', desc: 'Poucos tiros, dano alto. Hitbox visível e controle fino contam mais.',
    orient: 'vertical', mod: { projScale: 0.85 }, lives: 3, color: '#eafcff', icon: '✚', theme: 'emerald' },

  { id: 'storm', name: 'Modo Tempestade', desc: 'TUDO mais rápido — inimigos, tiros e música. Partidas curtas e intensas, uma vida.',
    orient: 'vertical', mod: { timeScale: 1.4, scoreMult: 1.5, enemySpeed: 1.1 }, lives: 1, color: '#ff40d0', icon: '⚡', theme: 'junkbelt' },
];

export const MODE_BY_ID: Record<string, ModeDef> = {};
for (const m of MODES) MODE_BY_ID[m.id] = m;

// ---- relíquias (Rogue Sector / Modo Relíquia) ----
export interface RelicDef { id: string; name: string; desc: string; }
export const RELICS: RelicDef[] = [
  { id: 'core', name: 'Núcleo Instável', desc: '+30% de dano, mas −20% de casco.' },
  { id: 'glass', name: 'Escudo de Vidro', desc: '+30 de escudo máximo.' },
  { id: 'phase', name: 'Motor de Fase', desc: 'Habilidade recarrega 30% mais rápido.' },
  { id: 'axiom', name: 'Olho de Axiom', desc: '+15% de dano em tudo.' },
  { id: 'solar', name: 'Fragmento Solar', desc: 'Seus tiros queimam (dano ao longo do tempo).' },
  { id: 'pirate', name: 'Coração Pirata', desc: '+30% de pontos, mas inimigos mais rápidos.' },
  { id: 'lens', name: 'Lente Gravitacional', desc: 'Seus projéteis curvam levemente rumo aos alvos.' },
  { id: 'motor', name: 'Motor Ancestral', desc: '+18% de velocidade da nave.' },
  { id: 'eclipse', name: 'Contrato Eclipse', desc: '+50% de pontos, mas apenas UMA vida.' },
];
