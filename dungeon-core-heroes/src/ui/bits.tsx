import { useEffect, useRef, useSyncExternalStore } from 'react';
import type { JSX } from 'react';
import type { HeroId, Unit } from '../types';
import { subscribe, getSnapshot } from '../game/store';
import { heroFrame, FRAMES, type Anim } from '../render/heroSprites';
import { enemyFrame, ENEMY_FRAMES } from '../render/enemySprites';
import { blit } from '../render/pixel';
import { HERO_BY_ID } from '../data/heroesData';

export function useStore(): number { return useSyncExternalStore(subscribe, getSnapshot, getSnapshot); }

// ============ GLYPHS PROCEDURAIS (SVG, sem emojis) ============
// mapeia um id de ícone a um emblema desenhado com paths
function glyphKind(icon: string): string {
  const s = icon;
  const map: [string, string][] = [
    ['power', 'sword'], ['cd', 'clock'], ['area', 'burst'], ['crit', 'star'], ['dot', 'drop'],
    ['bounce', 'arrows'], ['double', 'arrows'], ['reap', 'sword'], ['reset', 'clock'], ['spread', 'burst'],
    ['boom', 'burst'], ['pierce', 'arrow'], ['giant', 'skull'], ['vulture', 'skull'], ['aegis', 'shield'],
    ['haste', 'bolt'], ['chain', 'bolt'], ['bond', 'wolf'], ['charge', 'wolf'], ['burn', 'flame'],
    ['bleed', 'drop'], ['poison', 'flask'], ['shock', 'bolt'], ['slow', 'clock'], ['stun', 'star'],
    ['weaken', 'skull'], ['mark', 'target'], ['break', 'shard'], ['expose', 'target'], ['mutation', 'dna'],
    ['evolution', 'dna'], ['hp', 'heart'], ['def', 'shield'], ['mdef', 'shield'], ['spell', 'orb'],
    ['speed', 'bolt'], ['critdmg', 'star'], ['dodge', 'wind'], ['move', 'wind'], ['leech', 'drop'],
    ['heal', 'cross'], ['shield', 'shield'], ['block', 'shield'], ['regen', 'leaf'], ['potion', 'flask'],
    ['summon', 'wolf'], ['elite', 'skull'], ['boss', 'crown'], ['nova', 'burst'], ['counter', 'sword'],
    ['react', 'shield'], ['start', 'shield'], ['ghost', 'wind'], ['refill', 'flask'], ['cleanse', 'cross'],
    ['bone', 'skull'], ['orb', 'orb'],
  ];
  for (const [k, v] of map) if (s.includes(k)) return v;
  return 'rune';
}

export function Glyph({ icon, size = 30, color = '#e8c040' }: { icon: string; size?: number; color?: string }): JSX.Element {
  const k = glyphKind(icon);
  const p = paths[k] ?? paths.rune;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {p}
    </svg>
  );
}

const paths: Record<string, JSX.Element> = {
  sword: <><path d="M14 3l7 7-2 2-7-7 2-2z" fill="currentColor" stroke="none" opacity=".9" /><path d="M12 5L5 12l-2 5 5-2 7-7" /><path d="M6 15l3 3" /></>,
  shield: <><path d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" fill="currentColor" opacity=".18" /><path d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" /></>,
  flame: <path d="M12 3c1 3 4 4 4 8a4 4 0 01-8 0c0-2 1-3 2-4 0 1 1 2 2 2 0-2 0-4-0-6z" fill="currentColor" opacity=".85" stroke="currentColor" />,
  drop: <path d="M12 3c3 5 5 7 5 10a5 5 0 01-10 0c0-3 2-5 5-10z" fill="currentColor" opacity=".7" />,
  star: <path d="M12 3l2.4 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.5L12 3z" fill="currentColor" opacity=".85" />,
  bolt: <path d="M13 2L5 13h5l-2 9 8-12h-5l2-8z" fill="currentColor" opacity=".9" stroke="none" />,
  burst: <><circle cx="12" cy="12" r="3.5" fill="currentColor" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  heart: <path d="M12 21C7 17 4 14 4 10a4 4 0 018-1 4 4 0 018 1c0 4-3 7-8 11z" fill="currentColor" opacity=".8" />,
  cross: <><path d="M12 4v16M4 12h16" strokeWidth="3" /></>,
  leaf: <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM7 17c3-3 6-6 9-8" fill="currentColor" opacity=".3" />,
  flask: <><path d="M9 3h6M10 3v6l-4 8a2 2 0 002 3h8a2 2 0 002-3l-4-8V3" fill="currentColor" opacity=".2" /><path d="M7 15h10" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
  arrow: <path d="M4 12h14M13 6l6 6-6 6" />,
  arrows: <><path d="M3 8h12M11 4l4 4-4 4" /><path d="M21 16H9M13 12l-4 4 4 4" /></>,
  skull: <><path d="M12 3a7 7 0 00-7 7c0 3 2 4 2 6h10c0-2 2-3 2-6a7 7 0 00-7-7z" fill="currentColor" opacity=".2" /><circle cx="9" cy="10" r="1.5" fill="currentColor" /><circle cx="15" cy="10" r="1.5" fill="currentColor" /><path d="M9 19v2M12 18v3M15 19v2" /></>,
  crown: <path d="M4 8l3 4 5-6 5 6 3-4v10H4V8z" fill="currentColor" opacity=".4" stroke="currentColor" />,
  wolf: <><path d="M4 8l3-3 2 3h6l2-3 3 3-1 6-4 4H9l-4-4-1-6z" fill="currentColor" opacity=".25" /><circle cx="9.5" cy="11" r="1" fill="currentColor" /><circle cx="14.5" cy="11" r="1" fill="currentColor" /></>,
  orb: <><circle cx="12" cy="12" r="7" fill="currentColor" opacity=".25" /><circle cx="12" cy="12" r="7" /><path d="M9 9a5 5 0 016 6" opacity=".6" /></>,
  wind: <path d="M3 8h11a3 3 0 100-6M3 12h16a3 3 0 110 6M3 16h9" />,
  shard: <path d="M12 2l4 7-4 13-4-13 4-7z" fill="currentColor" opacity=".5" />,
  dna: <><path d="M8 3c0 6 8 6 8 12s-8 6-8 12" opacity=".7" /><path d="M16 3c0 6-8 6-8 12s8 6 8 12" opacity=".7" /><path d="M9 8h6M9 16h6" /></>,
  rune: <><rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor" opacity=".15" /><path d="M12 8v8M9 11l3-3 3 3" /></>,
};

// ============ RETRATO DE HERÓI (pixel art animado) ============
// cicla idle → walk → attack → cast para mostrar as animações
const PREVIEW: Anim[] = ['idle', 'idle', 'walk', 'walk', 'attack', 'cast', 'victory'];
export function HeroPortrait({ heroId, size = 120, demo = true }: { heroId: HeroId; size?: number; demo?: boolean }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = size * dpr; cv.height = size * dpr;
    const ctx = cv.getContext('2d')!;
    let raf = 0; const t0 = performance.now();
    const scale = Math.max(2, Math.floor((size * 0.9) / 44));
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      const anim: Anim = demo ? PREVIEW[Math.floor(t / 0.9) % PREVIEW.length] : 'idle';
      const fps = anim === 'walk' ? 10 : anim === 'attack' || anim === 'cast' ? 9 : 3;
      const f = Math.floor(t * fps) % FRAMES[anim];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const pal = HERO_BY_ID[heroId].palette;
      const g = ctx.createRadialGradient(size / 2, size * 0.5, 4, size / 2, size * 0.5, size * 0.62);
      g.addColorStop(0, pal.glow + '26'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
      blit(ctx, heroFrame(heroId, anim, f), size / 2, size * 0.92, scale, 1);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [heroId, size, demo]);
  return <canvas ref={ref} style={{ width: size, height: size, imageRendering: 'pixelated' }} />;
}

// ============ MINIATURA DE INIMIGO (pixel art animado) ============
export function EnemyThumb({ enemyId, w = 160, h = 90 }: { enemyId: string; w?: number; h?: number }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = w * dpr; cv.height = h * dpr;
    const ctx = cv.getContext('2d')!;
    let raf = 0; const t0 = performance.now();
    const scale = Math.max(2, Math.floor((h * 0.82) / 40));
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      const anim = Math.floor(t / 1.2) % 2 === 0 ? 'idle' : 'walk';
      const f = Math.floor(t * 6) % ENEMY_FRAMES[anim];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      blit(ctx, enemyFrame(enemyId, anim, f), w / 2, h * 0.94, scale, -1);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [enemyId, w, h]);
  return <canvas ref={ref} style={{ width: w, height: h, imageRendering: 'pixelated' }} />;
}

export function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
export function CoreLogo({ size = 120 }: { size?: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="cg" cx="50%" cy="45%"><stop offset="0%" stopColor="#f0d070" /><stop offset="60%" stopColor="#e8c040" /><stop offset="100%" stopColor="#a87818" /></radialGradient>
      </defs>
      <path d="M60 8l44 26v52L60 112 16 86V34z" fill="#1b1626" stroke="#7a4ae8" strokeWidth="3" />
      <path d="M60 20l34 20v40L60 100 26 80V40z" fill="#241b30" stroke="#a878f0" strokeWidth="1.5" opacity=".7" />
      <circle cx="60" cy="58" r="18" fill="url(#cg)">
        <animate attributeName="r" values="17;20;17" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="58" r="26" fill="none" stroke="#e8c040" strokeWidth="1" opacity=".4" />
    </svg>
  );
}
