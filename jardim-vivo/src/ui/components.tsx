import type { JSX } from 'react';
import { useEffect, useRef, ReactNode } from 'react';
import type { NpcData, PlantData } from '../types';
import { drawPlant } from '../rendering/plantPainters';
import { drawPot } from '../rendering/gardenRenderer';
import { POT_BY_ID } from '../data/potsData';
import { sfx, startAudio } from '../audio/audioEngine';

// ---------- botão ----------
export function Btn(props: { onClick?: () => void; children: ReactNode; kind?: 'primary' | 'ghost' | 'danger' | 'gold'; disabled?: boolean; small?: boolean; title?: string }): JSX.Element {
  return (
    <button
      className={`btn ${props.kind ?? 'primary'} ${props.small ? 'small' : ''}`}
      disabled={props.disabled}
      title={props.title}
      onClick={() => { startAudio(); sfx('click'); props.onClick?.(); }}
    >
      {props.children}
    </button>
  );
}

// ---------- painel ----------
export function Panel(props: { title?: string; children: ReactNode; className?: string; onClose?: () => void }): JSX.Element {
  return (
    <div className={`panel ${props.className ?? ''}`}>
      {(props.title || props.onClose) && (
        <div className="panel-head">
          <span className="panel-title">{props.title}</span>
          {props.onClose && <button className="x-btn" onClick={() => { sfx('click'); props.onClose?.(); }}>✕</button>}
        </div>
      )}
      <div className="panel-body">{props.children}</div>
    </div>
  );
}

// ---------- barra de progresso ----------
export function Bar(props: { value: number; max: number; color: string; label?: string; icon?: ReactNode }): JSX.Element {
  const pct = Math.max(0, Math.min(100, (props.value / props.max) * 100));
  return (
    <div className="bar-row">
      {props.icon && <span className="bar-icon">{props.icon}</span>}
      {props.label && <span className="bar-label">{props.label}</span>}
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: props.color }} />
      </div>
      <span className="bar-num">{Math.round(props.value)}</span>
    </div>
  );
}

// ---------- retrato de planta (canvas) ----------
export function PlantSprite(props: { plantId: string; size?: number; stage?: 'mature' | 'flowering'; seed?: number }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const size = props.size ?? 72;
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = size * dpr; cv.height = size * dpr;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size * 0.92);
    const def = { stage: props.stage ?? 'flowering', stageProgress: 1, health: 100, quality: 100, bloom: 1, dead: false, dormant: false, stress: [], seed: props.seed ?? 7, wind: 0, time: 1 } as const;
    drawPlant(ctx, props.plantId, { ...def, stress: [] }, size * 0.62);
    ctx.restore();
  }, [props.plantId, size, props.stage, props.seed]);
  return <canvas ref={ref} style={{ width: size, height: size }} />;
}

// ---------- retrato de vaso ----------
export function PotSprite(props: { potId: string; size?: number }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const size = props.size ?? 56;
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = size * dpr; cv.height = size * dpr;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);
    const pot = POT_BY_ID[props.potId];
    if (!pot) return;
    ctx.save();
    ctx.translate(size / 2, size * 0.88);
    drawPot(ctx, pot, size * 1.05);
    ctx.restore();
  }, [props.potId, size]);
  return <canvas ref={ref} style={{ width: size, height: size }} />;
}

// ---------- retrato de NPC (canvas procedural) ----------
export function NpcPortrait(props: { npc: NpcData; size?: number }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  const size = props.size ?? 64;
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = size * dpr; cv.height = size * dpr;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const p = props.npc.portrait;
    const s = size;
    ctx.clearRect(0, 0, s, s);
    // fundo
    ctx.fillStyle = p.accent;
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s * 0.48, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath(); ctx.arc(s / 2, s * 0.3, s * 0.35, 0, Math.PI * 2); ctx.fill();
    // ombros
    ctx.fillStyle = p.shirt;
    ctx.beginPath(); ctx.ellipse(s / 2, s * 0.92, s * 0.33, s * 0.25, 0, Math.PI, 0); ctx.fill();
    // pescoço + cabeça
    ctx.fillStyle = p.skin;
    ctx.fillRect(s * 0.44, s * 0.6, s * 0.12, s * 0.12);
    ctx.beginPath(); ctx.ellipse(s / 2, s * 0.46, s * 0.2, s * 0.23, 0, 0, Math.PI * 2); ctx.fill();
    // cabelo
    ctx.fillStyle = p.hair;
    switch (p.hairStyle) {
      case 'short':
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.36, s * 0.21, s * 0.15, 0, Math.PI, 0); ctx.fill();
        break;
      case 'long':
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.36, s * 0.22, s * 0.16, 0, Math.PI, 0); ctx.fill();
        ctx.fillRect(s * 0.28, s * 0.36, s * 0.09, s * 0.34);
        ctx.fillRect(s * 0.63, s * 0.36, s * 0.09, s * 0.34);
        break;
      case 'bun':
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.37, s * 0.21, s * 0.14, 0, Math.PI, 0); ctx.fill();
        ctx.beginPath(); ctx.arc(s / 2, s * 0.22, s * 0.09, 0, Math.PI * 2); ctx.fill();
        break;
      case 'hat':
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.32, s * 0.3, s * 0.07, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.26, s * 0.15, s * 0.1, 0, Math.PI, 0); ctx.fill();
        break;
      case 'bald':
        ctx.beginPath(); ctx.ellipse(s * 0.35, s * 0.42, s * 0.05, s * 0.08, 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s * 0.65, s * 0.42, s * 0.05, s * 0.08, -0.4, 0, Math.PI * 2); ctx.fill();
        break;
      case 'ponytail':
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.36, s * 0.21, s * 0.14, 0, Math.PI, 0); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s * 0.72, s * 0.5, s * 0.06, s * 0.16, 0.3, 0, Math.PI * 2); ctx.fill();
        break;
      case 'curly':
        for (let i = 0; i < 7; i++) {
          const a = Math.PI + (i / 6) * Math.PI;
          ctx.beginPath();
          ctx.arc(s / 2 + Math.cos(a) * s * 0.19, s * 0.4 + Math.sin(a) * s * 0.16, s * 0.08, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      case 'braid':
        ctx.beginPath(); ctx.ellipse(s / 2, s * 0.36, s * 0.21, s * 0.14, 0, Math.PI, 0); ctx.fill();
        for (let i = 0; i < 3; i++) {
          ctx.beginPath(); ctx.arc(s * 0.3, s * (0.5 + i * 0.1), s * 0.05, 0, Math.PI * 2); ctx.fill();
        }
        break;
    }
    // olhos + boca
    ctx.fillStyle = '#2a2018';
    ctx.beginPath(); ctx.arc(s * 0.43, s * 0.47, s * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(s * 0.57, s * 0.47, s * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#8a5a4a';
    ctx.lineWidth = Math.max(1, s * 0.02);
    ctx.beginPath(); ctx.arc(s / 2, s * 0.53, s * 0.06, 0.3, Math.PI - 0.3); ctx.stroke();
    // rugas para idosos
    if (p.age === 'elder') {
      ctx.strokeStyle = 'rgba(120,80,60,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(s * 0.38, s * 0.42); ctx.lineTo(s * 0.42, s * 0.43); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(s * 0.62, s * 0.42); ctx.lineTo(s * 0.58, s * 0.43); ctx.stroke();
    }
    // borda
    ctx.strokeStyle = 'rgba(60,50,35,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s * 0.47, 0, Math.PI * 2); ctx.stroke();
  }, [props.npc, size]);
  return <canvas ref={ref} style={{ width: size, height: size, borderRadius: '50%' }} />;
}

// ---------- ícones SVG cozy (sem emoji) ----------
export function Icon(props: { name: string; size?: number; color?: string }): JSX.Element {
  const s = props.size ?? 16;
  const c = props.color ?? 'currentColor';
  const paths: Record<string, ReactNode> = {
    coin: <><circle cx="12" cy="12" r="9" fill="#e8c040" stroke="#a8842a" strokeWidth="2" /><circle cx="12" cy="12" r="5" fill="none" stroke="#a8842a" strokeWidth="1.6" /></>,
    star: <path d="M12 2l2.6 6.6L21 9.4l-5 4.6 1.5 6.8L12 17l-5.5 3.8L8 14 3 9.4l6.4-.8z" fill="#c8a040" />,
    drop: <path d="M12 3c3 5 6 8 6 11.5a6 6 0 01-12 0C6 11 9 8 12 3z" fill="#5aa8d8" />,
    sun: <><circle cx="12" cy="12" r="5" fill="#e8c040" /><g stroke="#e8c040" strokeWidth="2">{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1={12 + Math.cos(a / 57.3) * 8} y1={12 + Math.sin(a / 57.3) * 8} x2={12 + Math.cos(a / 57.3) * 10.5} y2={12 + Math.sin(a / 57.3) * 10.5} />)}</g></>,
    cloud: <path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.5-1A4.5 4.5 0 0117 16z" fill="#b8c4d0" />,
    rain: <><path d="M6 13a4 4 0 010-8 5.5 5.5 0 0110.5-1A4.5 4.5 0 0117 13z" fill="#98a8b8" /><g stroke="#5aa8d8" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="16" x2="7" y2="20" /><line x1="13" y1="16" x2="12" y2="20" /><line x1="18" y1="16" x2="17" y2="20" /></g></>,
    leaf: <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16zM4 20C8 14 12 10 18 6" fill="#68a858" stroke="#3a6a34" strokeWidth="1" />,
    flower: <><circle cx="12" cy="7" r="3.4" fill={c} /><circle cx="17" cy="11" r="3.4" fill={c} /><circle cx="15" cy="17" r="3.4" fill={c} /><circle cx="9" cy="17" r="3.4" fill={c} /><circle cx="7" cy="11" r="3.4" fill={c} /><circle cx="12" cy="12" r="3" fill="#e8c040" /></>,
    heart: <path d="M12 20S4 14.5 4 9a4.2 4.2 0 018-1.8A4.2 4.2 0 0120 9c0 5.5-8 11-8 11z" fill="#d86878" />,
    trophy: <path d="M7 3h10v4a5 5 0 01-10 0zM7 5H4a3 3 0 003 4M17 5h3a3 3 0 01-3 4M10 12h4l1 6H9zM7 20h10" fill="none" stroke="#c8a040" strokeWidth="2" strokeLinejoin="round" />,
    book: <path d="M4 4h7v16H4zM13 4h7v16h-7zM11 4c-2 1-5 1-7 0M20 4c-2 1-5 1-7 0" fill="#b89058" stroke="#7a5a34" strokeWidth="1.4" />,
    clock: <><circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="2" /><path d="M12 7v5l3.5 2" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" /></>,
    shop: <path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M10 20v-6h4v6" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" />,
    hammer: <path d="M13 6l5 5-9 9-5-5zM13 6l3-3 5 5-3 3" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" />,
    gear: <><circle cx="12" cy="12" r="3.4" fill="none" stroke={c} strokeWidth="2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke={c} strokeWidth="2" strokeLinecap="round" /></>,
    people: <><circle cx="9" cy="8" r="3.4" fill={c} /><path d="M3.5 20a5.5 5.5 0 0111 0z" fill={c} /><circle cx="16.5" cy="9" r="2.8" fill={c} opacity="0.7" /><path d="M13.5 20a5 5 0 017 0z" fill={c} opacity="0.7" /></>,
    scroll: <path d="M6 3h12a2 2 0 012 2v0a2 2 0 01-2 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM8 9h7M8 13h7M8 17h4" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" />,
    seedbag: <path d="M8 4h8l-1.5 3h-5zM6.5 7h11c1 4 1.5 8 0 11a3 3 0 01-3 2h-5a3 3 0 01-3-2c-1.5-3-1-7 0-11z" fill="#c0a068" stroke="#7a5a34" strokeWidth="1.4" />,
    grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke={c} strokeWidth="1.8" />,
    scissors: <><circle cx="7" cy="7" r="2.6" fill="none" stroke={c} strokeWidth="1.8" /><circle cx="7" cy="17" r="2.6" fill="none" stroke={c} strokeWidth="1.8" /><path d="M9 8.5L20 17M9 15.5L20 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></>,
    bee: <><ellipse cx="12" cy="13" rx="6" ry="4.6" fill="#e8c040" /><path d="M9 9v8.5M12.5 8.6v9M16 9.6v7.5" stroke="#3a2a18" strokeWidth="1.8" /><ellipse cx="8" cy="6.5" rx="4" ry="2.2" fill="#c8dce8" opacity="0.85" transform="rotate(-25 8 6.5)" /></>,
    butterfly: <><ellipse cx="7.5" cy="9" rx="4.5" ry="5.5" fill="#c878b8" transform="rotate(15 7.5 9)" /><ellipse cx="16.5" cy="9" rx="4.5" ry="5.5" fill="#c878b8" transform="rotate(-15 16.5 9)" /><ellipse cx="8.5" cy="16" rx="3" ry="3.8" fill="#a858a0" transform="rotate(20 8.5 16)" /><ellipse cx="15.5" cy="16" rx="3" ry="3.8" fill="#a858a0" transform="rotate(-20 15.5 16)" /><rect x="11.2" y="6" width="1.6" height="12" rx="0.8" fill="#3a2a28" /></>,
    warn: <path d="M12 3L2 20h20zM12 9v5M12 17v1.5" fill="none" stroke="#d8a038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    skull: <path d="M12 3a7 7 0 00-7 7c0 3 1.5 5 3 6v3h8v-3c1.5-1 3-3 3-6a7 7 0 00-7-7zM9 11.5a1.4 1.4 0 100-.1M15 11.5a1.4 1.4 0 100-.1" fill="#a8a49a" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
    pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill={c} />,
    play1: <path d="M7 5l12 7-12 7z" fill={c} />,
    play2: <path d="M4 5l9 7-9 7zM12 5l9 7-9 7z" fill={c} />,
    moon: <path d="M20 14.5A8.5 8.5 0 0110 3a8.5 8.5 0 1010 11.5z" fill="#d8d4c0" />,
    sparkle: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" fill="#e8d888" />,
    camera: <path d="M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />,
    home: <path d="M3 11l9-8 9 8M6 10v10h12V10M10 20v-6h4v6" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" />,
    bird: <path d="M4 14c4 0 6-2 7-5a4.5 4.5 0 018.5 2c0 5-4 8-9.5 8C7 19 5 17 4 14zM17 8.5a1 1 0 100-.1M19.5 11l3 .8-3 1" fill="#7898b8" />,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" style={{ flexShrink: 0, verticalAlign: 'middle' }}>{paths[props.name] ?? <circle cx="12" cy="12" r="8" fill={c} />}</svg>;
}

// ---------- chip de dificuldade/raridade ----------
export function Stars(props: { n: number; max?: number }): JSX.Element {
  const max = props.max ?? 5;
  return (
    <span className="stars">
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24">
          <path d="M12 2l2.6 6.6L21 9.4l-5 4.6 1.5 6.8L12 17l-5.5 3.8L8 14 3 9.4l6.4-.8z" fill={i < props.n ? '#c8a040' : 'rgba(120,110,90,0.35)'} />
        </svg>
      ))}
    </span>
  );
}

export const RARITY_COLORS: Record<string, string> = {
  common: '#8aa87a', uncommon: '#68a8c8', rare: '#a878d8', 'very-rare': '#d878a8', legendary: '#e8b040',
};

export const RARITY_LABEL: Record<string, { pt: string; en: string }> = {
  common: { pt: 'Comum', en: 'Common' }, uncommon: { pt: 'Incomum', en: 'Uncommon' },
  rare: { pt: 'Rara', en: 'Rare' }, 'very-rare': { pt: 'Muito rara', en: 'Very rare' },
  legendary: { pt: 'Lendária', en: 'Legendary' },
};

export const LIGHT_LABEL: Record<string, { pt: string; en: string }> = {
  'full-sun': { pt: 'Sol pleno', en: 'Full sun' },
  'morning-sun': { pt: 'Sol da manhã', en: 'Morning sun' },
  'afternoon-sun': { pt: 'Sol da tarde', en: 'Afternoon sun' },
  'part-shade': { pt: 'Meia-sombra', en: 'Part shade' },
  'light-shade': { pt: 'Sombra clara', en: 'Light shade' },
  'deep-shade': { pt: 'Sombra profunda', en: 'Deep shade' },
  'bright-indirect': { pt: 'Luz indireta forte', en: 'Bright indirect' },
  'medium-indirect': { pt: 'Luz indireta média', en: 'Medium indirect' },
  'grow-light': { pt: 'Luz artificial', en: 'Grow light' },
};

export const WATER_LABEL: Record<string, { pt: string; en: string }> = {
  'very-low': { pt: 'Muito pouca', en: 'Very low' }, low: { pt: 'Pouca', en: 'Low' },
  moderate: { pt: 'Moderada', en: 'Moderate' }, high: { pt: 'Alta', en: 'High' },
  'very-high': { pt: 'Muito alta', en: 'Very high' }, aquatic: { pt: 'Aquática', en: 'Aquatic' },
};

export const STAGE_LABEL: Record<string, { pt: string; en: string }> = {
  seed: { pt: 'Semente', en: 'Seed' }, sprout: { pt: 'Broto', en: 'Sprout' },
  seedling: { pt: 'Muda pequena', en: 'Seedling' }, 'young-seedling': { pt: 'Muda desenvolvida', en: 'Young seedling' },
  juvenile: { pt: 'Planta jovem', en: 'Juvenile' }, mature: { pt: 'Adulta', en: 'Mature' },
  budding: { pt: 'Em botão', en: 'Budding' }, flowering: { pt: 'Florida', en: 'Flowering' },
  seeding: { pt: 'Com sementes', en: 'Seeding' }, dormant: { pt: 'Dormente', en: 'Dormant' },
};

export function categoryLabel(cat: PlantData['category']): { pt: string; en: string } {
  const M: Record<string, { pt: string; en: string }> = {
    annual: { pt: 'Anual', en: 'Annual' }, perennial: { pt: 'Perene', en: 'Perennial' },
    bulb: { pt: 'Bulbo', en: 'Bulb' }, 'rose-shrub': { pt: 'Arbusto florido', en: 'Flowering shrub' },
    tropical: { pt: 'Tropical', en: 'Tropical' }, orchid: { pt: 'Orquídea', en: 'Orchid' },
    succulent: { pt: 'Suculenta', en: 'Succulent' }, herb: { pt: 'Erva', en: 'Herb' },
    climber: { pt: 'Trepadeira', en: 'Climber' }, aquatic: { pt: 'Aquática', en: 'Aquatic' },
    'bonsai-tree': { pt: 'Bonsai/Árvore', en: 'Bonsai/Tree' }, carnivorous: { pt: 'Carnívora', en: 'Carnivorous' },
    wildflower: { pt: 'Silvestre', en: 'Wildflower' },
  };
  return M[cat];
}
