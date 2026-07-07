import type { GrowthStageId, LeafShape, PlantInstance, PlantVisual } from '../types';
import { PLANT_BY_ID } from '../data/plants';
import { hsl } from './palette';
import { isDead } from '../game/gameState';

// ============================================================
// PINTORES PROCEDURAIS DE PLANTAS
// Cada planta é desenhada com silhueta botânica própria a partir
// do descritor visual + fase + saúde + semente de variação.
// ============================================================

type Ctx = CanvasRenderingContext2D;

function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PaintParams {
  stage: GrowthStageId;
  stageProgress: number;
  health: number;      // 0-100
  quality: number;
  bloom: number;       // 0-1 dentro da floração
  dead: boolean;
  dormant: boolean;
  stress: string[];
  seed: number;
  wind: number;        // 0-1 balanço
  time: number;        // segundos p/ animação
}

export function paintParamsFor(p: PlantInstance, time: number, wind: number): PaintParams {
  return {
    stage: p.stage, stageProgress: p.stageProgress, health: p.health, quality: p.quality,
    bloom: p.bloomProgress, dead: isDead(p), dormant: p.isDormant, stress: p.stress,
    seed: p.variantSeed, wind, time,
  };
}

// escala 0-1 do tamanho por fase
function stageScale(st: GrowthStageId, prog: number): number {
  const base: Record<GrowthStageId, [number, number]> = {
    seed: [0, 0], sprout: [0.08, 0.18], seedling: [0.2, 0.34], 'young-seedling': [0.36, 0.5],
    juvenile: [0.52, 0.75], mature: [0.78, 1], budding: [1, 1], flowering: [1, 1],
    seeding: [1, 1], dormant: [0.9, 0.9],
  };
  const [a, b] = base[st];
  return a + (b - a) * Math.min(1, prog);
}

// cor da folhagem ajustada por saúde/estresse
function leafColor(v: PlantVisual, pp: PaintParams, dLight = 0): { h: number; s: number; l: number } {
  let h = v.leafHue, s = v.leafSat, l = v.leafLight + dLight;
  if (pp.dead) return { h: 35, s: 22, l: 32 };
  if (pp.dormant) return { h: 30, s: 25, l: 38 };
  const sick = 1 - pp.health / 100;
  if (pp.stress.includes('underwatering')) { h -= 25 * sick; s -= 18 * sick; l += 4 * sick; }
  if (pp.stress.includes('overwatering')) { h -= 35 * sick; s -= 10 * sick; l += 8 * sick; }
  if (pp.stress.includes('sunburn')) { h -= 45 * sick; s -= 5; }
  if (pp.stress.includes('etiolation')) { s -= 22 * sick; l += 10 * sick; }
  if (pp.stress.includes('nutrient-deficiency')) { h -= 18 * sick; l += 8 * sick; }
  h -= sick * 12;
  return { h, s: Math.max(8, s), l: Math.max(15, Math.min(72, l)) };
}

// murcha: quanto as folhas caem
function droop(pp: PaintParams): number {
  if (pp.dead) return 0.9;
  let d = 0;
  if (pp.stress.includes('underwatering')) d += 0.5;
  if (pp.stress.includes('overwatering')) d += 0.35;
  d += Math.max(0, (55 - pp.health) / 100);
  return Math.min(0.95, d);
}

// ---------- primitivas ----------
function leafPath(ctx: Ctx, shape: LeafShape, len: number, w: number): void {
  ctx.beginPath();
  switch (shape) {
    case 'heart':
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-w, -len * 0.1, -w * 0.9, -len * 0.75, 0, -len);
      ctx.bezierCurveTo(w * 0.9, -len * 0.75, w, -len * 0.1, 0, 0);
      // reentrância na base
      ctx.moveTo(0, -len * 0.04);
      break;
    case 'round':
      ctx.ellipse(0, -len * 0.55, w * 0.95, len * 0.5, 0, 0, Math.PI * 2);
      break;
    case 'oval':
      ctx.ellipse(0, -len * 0.55, w * 0.62, len * 0.5, 0, 0, Math.PI * 2);
      break;
    case 'lance':
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-w * 0.55, -len * 0.4, 0, -len);
      ctx.quadraticCurveTo(w * 0.55, -len * 0.4, 0, 0);
      break;
    case 'linear': case 'strap': case 'sword':
      ctx.moveTo(-w * (shape === 'sword' ? 0.32 : 0.18), 0);
      ctx.quadraticCurveTo(-w * 0.2, -len * 0.6, 0, -len);
      ctx.quadraticCurveTo(w * 0.2, -len * 0.6, w * (shape === 'sword' ? 0.32 : 0.18), 0);
      break;
    case 'needle':
      ctx.moveTo(0, 0); ctx.lineTo(-w * 0.1, -len * 0.5); ctx.lineTo(0, -len); ctx.lineTo(w * 0.1, -len * 0.5);
      ctx.closePath();
      break;
    case 'palmate': {
      // 5 lóbulos de mão aberta
      for (let i = -2; i <= 2; i++) {
        const a = i * 0.5;
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(Math.sin(a) * w - w * 0.15, -len * 0.5, Math.sin(a) * len * 0.55, -Math.cos(a) * len);
        ctx.quadraticCurveTo(Math.sin(a) * w + w * 0.15, -len * 0.5, 0, 0);
      }
      break;
    }
    case 'pinnate': case 'frond': {
      // haste central com folíolos
      const pairs = shape === 'frond' ? 7 : 5;
      ctx.moveTo(0, 0); ctx.lineTo(0, -len);
      for (let i = 1; i <= pairs; i++) {
        const y = -len * (i / (pairs + 0.5));
        const ll = w * (1.15 - (i / pairs) * 0.55);
        ctx.moveTo(0, y); ctx.quadraticCurveTo(-ll * 0.7, y - ll * 0.34, -ll, y - ll * 0.12);
        ctx.quadraticCurveTo(-ll * 0.55, y + ll * 0.1, 0, y);
        ctx.moveTo(0, y); ctx.quadraticCurveTo(ll * 0.7, y - ll * 0.34, ll, y - ll * 0.12);
        ctx.quadraticCurveTo(ll * 0.55, y + ll * 0.1, 0, y);
      }
      break;
    }
    case 'lobed': {
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-w, -len * 0.15, -w * 0.35, -len * 0.4, -w * 0.85, -len * 0.55);
      ctx.bezierCurveTo(-w * 0.3, -len * 0.7, -w * 0.45, -len * 0.9, 0, -len);
      ctx.bezierCurveTo(w * 0.45, -len * 0.9, w * 0.3, -len * 0.7, w * 0.85, -len * 0.55);
      ctx.bezierCurveTo(w * 0.35, -len * 0.4, w, -len * 0.15, 0, 0);
      break;
    }
    case 'split': {
      // monstera: oval com fendas
      ctx.ellipse(0, -len * 0.55, w * 0.85, len * 0.5, 0, 0, Math.PI * 2);
      break;
    }
    case 'succulent-pad':
      ctx.ellipse(0, -len * 0.5, w * 0.72, len * 0.5, 0, 0, Math.PI * 2);
      break;
    case 'succulent-rosette':
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-w * 0.8, -len * 0.55, 0, -len);
      ctx.quadraticCurveTo(w * 0.8, -len * 0.55, 0, 0);
      break;
    case 'tiny':
      ctx.ellipse(0, -len * 0.5, w * 0.5, len * 0.45, 0, 0, Math.PI * 2);
      break;
    case 'spines':
      ctx.moveTo(0, 0); ctx.lineTo(0, -len);
      break;
    case 'trap-jaw': {
      ctx.ellipse(-w * 0.28, -len * 0.6, w * 0.32, len * 0.4, -0.3, 0, Math.PI * 2);
      ctx.moveTo(w * 0.6, -len * 0.6);
      ctx.ellipse(w * 0.28, -len * 0.6, w * 0.32, len * 0.4, 0.3, 0, Math.PI * 2);
      break;
    }
    case 'pitcher': {
      ctx.moveTo(-w * 0.3, 0);
      ctx.bezierCurveTo(-w * 0.65, -len * 0.35, -w * 0.6, -len * 0.8, -w * 0.25, -len * 0.95);
      ctx.quadraticCurveTo(0, -len * 1.05, w * 0.25, -len * 0.95);
      ctx.bezierCurveTo(w * 0.6, -len * 0.8, w * 0.65, -len * 0.35, w * 0.3, 0);
      ctx.closePath();
      break;
    }
    case 'pad-floating':
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, len, 0.35, Math.PI * 2 + 0.05);
      ctx.closePath();
      break;
  }
}

function drawLeaf(ctx: Ctx, x: number, y: number, angle: number, len: number, w: number, shape: LeafShape, fill: string, stroke?: string): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  leafPath(ctx, shape, len, w);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = Math.max(0.5, len * 0.03); ctx.stroke(); }
  ctx.restore();
}

// variegação sobre a última folha desenhada (chamar dentro do save da folha)
function drawVariegation(ctx: Ctx, v: PlantVisual, len: number, w: number, c: { h: number; s: number; l: number }): void {
  if (!v.leafVariegation) return;
  ctx.save();
  switch (v.leafVariegation) {
    case 'stripe':
      ctx.strokeStyle = hsl(c.h, Math.max(5, c.s - 20), Math.min(85, c.l + 30), 0.8);
      ctx.lineWidth = w * 0.16;
      ctx.beginPath(); ctx.moveTo(0, -len * 0.1); ctx.lineTo(0, -len * 0.9); ctx.stroke();
      break;
    case 'edge':
      ctx.strokeStyle = hsl(c.h + 15, c.s - 10, Math.min(80, c.l + 26), 0.7);
      ctx.lineWidth = w * 0.12;
      leafPath(ctx, 'oval', len, w * 0.9);
      ctx.stroke();
      break;
    case 'spots':
      ctx.fillStyle = hsl(c.h, c.s - 15, Math.min(88, c.l + 34), 0.8);
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc((i % 2 ? 1 : -1) * w * 0.25, -len * (0.3 + i * 0.16), w * 0.11, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'silver-vein':
      ctx.strokeStyle = hsl(c.h, 8, 82, 0.85);
      ctx.lineWidth = Math.max(0.6, w * 0.07);
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, -len * 0.95);
      for (let i = 1; i <= 3; i++) {
        const y = -len * (i / 4);
        ctx.moveTo(0, y); ctx.lineTo(-w * 0.5, y - len * 0.1);
        ctx.moveTo(0, y); ctx.lineTo(w * 0.5, y - len * 0.1);
      }
      ctx.stroke();
      break;
    case 'pink':
      ctx.fillStyle = 'rgba(240,150,190,0.45)';
      ctx.beginPath(); ctx.ellipse(0, -len * 0.55, w * 0.4, len * 0.32, 0, 0, Math.PI * 2); ctx.fill();
      break;
    case 'red-under':
      ctx.strokeStyle = 'rgba(160,40,60,0.55)';
      ctx.lineWidth = w * 0.1;
      ctx.beginPath(); ctx.moveTo(-w * 0.4, -len * 0.15); ctx.quadraticCurveTo(0, 0, w * 0.4, -len * 0.15); ctx.stroke();
      break;
  }
  ctx.restore();
}

// ---------- flores ----------
export function drawFlowerHead(ctx: Ctx, x: number, y: number, size: number, shape: string, colors: string[], seed: number, openness = 1): void {
  const r = mulberry(seed);
  const color = colors[Math.floor(r() * colors.length)] || '#e878a8';
  ctx.save();
  ctx.translate(x, y);
  const s = size * (0.4 + openness * 0.6);
  switch (shape) {
    case 'daisy': case 'disc-large': {
      const petals = shape === 'disc-large' ? 18 : 10;
      ctx.fillStyle = color;
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2 + r() * 0.1;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * s * 0.5, Math.sin(a) * s * 0.5, s * 0.42, s * 0.16, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = shape === 'disc-large' ? '#5a3a1a' : '#e8b830';
      ctx.beginPath(); ctx.arc(0, 0, s * 0.32, 0, Math.PI * 2); ctx.fill();
      if (shape === 'disc-large') {
        ctx.fillStyle = 'rgba(120,80,30,0.6)';
        for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc((r() - 0.5) * s * 0.4, (r() - 0.5) * s * 0.4, s * 0.03, 0, Math.PI * 2); ctx.fill(); }
      }
      break;
    }
    case 'rose-double': {
      for (let ring = 4; ring >= 0; ring--) {
        const rr = s * (0.18 + ring * 0.16);
        const petals = 5 + ring * 2;
        ctx.fillStyle = ring % 2 ? color : shadeHex(color, 0.16);
        for (let i = 0; i < petals; i++) {
          const a = (i / petals) * Math.PI * 2 + ring * 0.4;
          ctx.beginPath();
          ctx.ellipse(Math.cos(a) * rr * 0.55, Math.sin(a) * rr * 0.55, rr * 0.5, rr * 0.34, a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }
    case 'trumpet': {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(0, 0, s * 0.55, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = shadeHex(color, 0.28);
      ctx.beginPath(); ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,240,0.7)';
      ctx.beginPath(); ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'bell': {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-s * 0.4, -s * 0.2);
      ctx.quadraticCurveTo(-s * 0.5, s * 0.45, -s * 0.28, s * 0.5);
      ctx.lineTo(s * 0.28, s * 0.5);
      ctx.quadraticCurveTo(s * 0.5, s * 0.45, s * 0.4, -s * 0.2);
      ctx.quadraticCurveTo(0, -s * 0.5, -s * 0.4, -s * 0.2);
      ctx.fill();
      break;
    }
    case 'spike': case 'plume': {
      // pontinhas empilhadas (desenhado como cabeça única compacta)
      ctx.fillStyle = color;
      const n = shape === 'plume' ? 12 : 9;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.arc((r() - 0.5) * s * (shape === 'plume' ? 0.75 : 0.4), -i * s * 0.14, s * (0.16 - i * 0.006), 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'umbel': case 'cluster': {
      const n = 8;
      for (let i = 0; i < n; i++) {
        const a = r() * Math.PI * 2, rr = r() * s * 0.5;
        ctx.fillStyle = colors[Math.floor(r() * colors.length)] || color;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr * 0.7, s * 0.17, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'pom': {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(0, 0, s * 0.55, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = shadeHex(color, 0.2);
      for (let i = 0; i < 10; i++) {
        const a = r() * Math.PI * 2, rr = r() * s * 0.42;
        ctx.beginPath(); ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr, s * 0.1, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'star': {
      ctx.fillStyle = color;
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * s * 0.35, Math.sin(a) * s * 0.35, s * 0.34, s * 0.15, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#f4e060';
      ctx.beginPath(); ctx.arc(0, 0, s * 0.14, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'cup': {
      ctx.fillStyle = color;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * s * 0.3, Math.sin(a) * s * 0.3, s * 0.36, s * 0.24, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = shadeHex(color, -0.25);
      ctx.beginPath(); ctx.arc(0, 0, s * 0.16, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'orchid-moth': {
      // sépalas
      ctx.fillStyle = shadeHex(color, 0.1);
      for (const a of [-Math.PI / 2, Math.PI / 6 - Math.PI / 2, -Math.PI / 6 - Math.PI / 2, Math.PI * 0.7, Math.PI * 0.3]) {
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * s * 0.34, Math.sin(a) * s * 0.34, s * 0.3, s * 0.16, a, 0, Math.PI * 2);
        ctx.fill();
      }
      // pétalas laterais grandes
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.ellipse(-s * 0.32, 0, s * 0.38, s * 0.28, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(s * 0.32, 0, s * 0.38, s * 0.28, 0.3, 0, Math.PI * 2); ctx.fill();
      // labelo
      ctx.fillStyle = shadeHex(color, -0.3);
      ctx.beginPath(); ctx.ellipse(0, s * 0.22, s * 0.16, s * 0.2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f4d060';
      ctx.beginPath(); ctx.arc(0, s * 0.05, s * 0.07, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'lily': {
      ctx.fillStyle = color;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * s * 0.42, Math.sin(a) * s * 0.42, s * 0.42, s * 0.14, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#d8a020';
      ctx.lineWidth = Math.max(0.7, s * 0.05);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * s * 0.3, Math.sin(a) * s * 0.3); ctx.stroke();
      }
      break;
    }
    case 'iris': {
      ctx.fillStyle = color;
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.ellipse(Math.cos(a) * s * 0.3, Math.sin(a) * s * 0.3, s * 0.34, s * 0.18, a, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = shadeHex(color, -0.28);
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
        ctx.beginPath(); ctx.ellipse(Math.cos(a) * s * 0.36, Math.sin(a) * s * 0.36 + s * 0.1, s * 0.3, s * 0.16, a, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#f4d060';
      ctx.beginPath(); ctx.arc(0, 0, s * 0.09, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'pea': {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.ellipse(0, -s * 0.15, s * 0.42, s * 0.3, 0, Math.PI, Math.PI * 2); ctx.fill();
      ctx.fillStyle = shadeHex(color, 0.25);
      ctx.beginPath(); ctx.ellipse(0, s * 0.1, s * 0.26, s * 0.2, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'button': {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = shadeHex(color, 0.3);
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * s * 0.2, Math.sin(a) * s * 0.2);
        ctx.lineTo(Math.cos(a) * s * 0.4, Math.sin(a) * s * 0.4); ctx.stroke();
      }
      break;
    }
    case 'tube': {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-s * 0.14, s * 0.5);
      ctx.lineTo(s * 0.14, s * 0.5);
      ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, s * 0.24, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'waterlily': {
      for (let ring = 2; ring >= 0; ring--) {
        const petals = 8 + ring * 4;
        const rr = s * (0.35 + ring * 0.25);
        ctx.fillStyle = ring === 0 ? shadeHex(color, 0.3) : color;
        for (let i = 0; i < petals; i++) {
          const a = (i / petals) * Math.PI * 2 + ring * 0.3;
          ctx.beginPath();
          ctx.ellipse(Math.cos(a) * rr * 0.5, Math.sin(a) * rr * 0.5, rr * 0.45, rr * 0.15, a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = '#f4d060';
      ctx.beginPath(); ctx.arc(0, 0, s * 0.14, 0, Math.PI * 2); ctx.fill();
      break;
    }
    default: break;
  }
  ctx.restore();
}

function shadeHex(hex: string, amt: number): string {
  if (!hex.startsWith('#')) return hex;
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt >= 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
  else { r *= 1 + amt; g *= 1 + amt; b *= 1 + amt; }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

// ============================================================
// PINTOR PRINCIPAL: desenha a planta inteira em (0,0) = base
// h = altura máxima em px
// ============================================================
export function drawPlant(ctx: Ctx, plantId: string, pp: PaintParams, h: number): void {
  const def = PLANT_BY_ID[plantId];
  if (!def) return;
  const v = def.visual;
  const r = mulberry(pp.seed);
  const scale = stageScale(pp.stage, pp.stageProgress);

  // fase semente: montinho de terra
  if (pp.stage === 'seed') {
    ctx.fillStyle = '#4a3826';
    ctx.beginPath(); ctx.ellipse(0, -1, h * 0.1, h * 0.045, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6a5438';
    ctx.beginPath(); ctx.ellipse(0, -2, h * 0.05, h * 0.02, 0, 0, Math.PI * 2); ctx.fill();
    return;
  }

  const H = h * v.sizeScale * scale;
  const dr = droop(pp);
  const sway = Math.sin(pp.time * 1.4 + pp.seed) * pp.wind * 0.05 * (1 - dr);
  const c = leafColor(v, pp);
  const cDark = hsl(c.h, c.s, Math.max(10, c.l - 12));
  const cLight = hsl(c.h, c.s, Math.min(78, c.l + 8));
  const stem = pp.dead ? '#6a5438' : (v.stemColor ?? hsl(c.h - 8, c.s - 8, c.l - 6));

  // broto universal
  if (pp.stage === 'sprout') {
    ctx.strokeStyle = stem;
    ctx.lineWidth = Math.max(1, H * 0.08);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(sway * 20, -H * 0.5, sway * 30, -H); ctx.stroke();
    drawLeaf(ctx, sway * 25, -H * 0.85, -0.7 + dr * 0.5, H * 0.5, H * 0.22, 'oval', hsl(c.h, c.s, c.l));
    drawLeaf(ctx, sway * 25, -H * 0.85, 0.7 + dr * 0.5, H * 0.5, H * 0.22, 'oval', cLight);
    return;
  }

  ctx.save();
  ctx.rotate(sway);
  const showFlowers = pp.stage === 'flowering' && !pp.dead;
  const showBuds = pp.stage === 'budding' && !pp.dead;
  const showSeedheads = pp.stage === 'seeding' && !pp.dead;
  const fSize = H * 0.28 * v.flowerSize;
  const openness = showFlowers ? 0.5 + pp.bloom * 0.5 : 0.3;

  switch (v.habit) {
    // ------------------------------------------------ caule único
    case 'upright-single': {
      ctx.strokeStyle = stem;
      ctx.lineWidth = Math.max(1.5, H * 0.05);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(H * 0.03, -H * 0.55, dr * H * 0.22, -H * (1 - dr * 0.25)); ctx.stroke();
      const leaves = 5 + Math.floor(r() * 3);
      for (let i = 0; i < leaves; i++) {
        const t = 0.18 + (i / leaves) * 0.62;
        const side = i % 2 ? 1 : -1;
        drawLeaf(ctx, dr * H * 0.15 * t, -H * t, side * (1.15 + dr * 0.5), H * 0.3 * (1 - t * 0.4), H * 0.13, v.leafShape, i % 2 ? cDark : hsl(c.h, c.s, c.l));
      }
      const headY = -H * (1 - dr * 0.25);
      if (v.special === 'sunflower') {
        if (showFlowers) drawFlowerHead(ctx, dr * H * 0.22, headY, fSize * 1.2, 'disc-large', v.flowerColors, pp.seed, openness);
        else if (showBuds) { ctx.fillStyle = '#4a6a2a'; ctx.beginPath(); ctx.arc(dr * H * 0.2, headY, fSize * 0.3, 0, Math.PI * 2); ctx.fill(); }
        else if (showSeedheads) { drawFlowerHead(ctx, dr * H * 0.25, headY + H * 0.06, fSize * 1.1, 'disc-large', ['#8a6828'], pp.seed, 0.8); }
      } else {
        if (showFlowers) drawFlowerHead(ctx, dr * H * 0.22, headY, fSize, v.flowerShape, v.flowerColors, pp.seed, openness);
        else if (showBuds) { ctx.fillStyle = cDark; ctx.beginPath(); ctx.arc(dr * H * 0.22, headY, fSize * 0.22, 0, Math.PI * 2); ctx.fill(); }
        else if (showSeedheads) drawFlowerHead(ctx, dr * H * 0.22, headY, fSize * 0.7, 'button', ['#a08a58'], pp.seed, 0.7);
      }
      break;
    }
    // ------------------------------------------------ touceira vertical
    case 'upright-clump': case 'bulb-spring': {
      const stems = v.habit === 'bulb-spring' ? 1 + Math.floor(r() * 2) : 3 + Math.floor(r() * 3);
      for (let sIdx = 0; sIdx < stems; sIdx++) {
        const off = (sIdx - (stems - 1) / 2) * H * 0.12;
        const hh = H * (0.75 + r() * 0.25);
        ctx.strokeStyle = stem;
        ctx.lineWidth = Math.max(1, H * 0.035);
        ctx.beginPath(); ctx.moveTo(off, 0); ctx.quadraticCurveTo(off + dr * H * 0.1, -hh * 0.6, off + dr * hh * 0.3, -hh * (1 - dr * 0.3)); ctx.stroke();
        const leaves = 3;
        for (let i = 0; i < leaves; i++) {
          const t = 0.2 + (i / leaves) * 0.5;
          drawLeaf(ctx, off + dr * H * 0.1 * t, -hh * t, (i % 2 ? 1 : -1) * (1.1 + dr * 0.6), hh * 0.32, H * 0.1, v.leafShape, i % 2 ? cDark : hsl(c.h, c.s, c.l));
        }
        const hy = -hh * (1 - dr * 0.3);
        if (showFlowers) drawFlowerHead(ctx, off + dr * hh * 0.3, hy, fSize * (0.8 + r() * 0.3), v.flowerShape, v.flowerColors, pp.seed + sIdx, openness);
        else if (showBuds) { ctx.fillStyle = cDark; ctx.beginPath(); ctx.arc(off + dr * hh * 0.3, hy, fSize * 0.18, 0, Math.PI * 2); ctx.fill(); }
        else if (showSeedheads && sIdx % 2 === 0) drawFlowerHead(ctx, off + dr * hh * 0.3, hy, fSize * 0.6, 'button', ['#a08a58'], pp.seed + sIdx, 0.7);
      }
      break;
    }
    // ------------------------------------------------ arbusto
    case 'bushy': case 'mound': {
      const isMound = v.habit === 'mound';
      const W = H * (isMound ? 1.15 : 0.85);
      const hh = H * (isMound ? 0.55 : 1);
      // massa de folhagem em camadas
      for (let layer = 2; layer >= 0; layer--) {
        const ll = hsl(c.h, c.s, Math.max(12, c.l - layer * 7));
        ctx.fillStyle = ll;
        const n = 6 + layer * 2;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI - Math.PI;
          const px = Math.cos(a) * W * 0.5 * (0.5 + layer * 0.24) + (r() - 0.5) * W * 0.1;
          const py = -hh * (0.32 + layer * 0.22) + Math.sin(a + Math.PI) * hh * 0.15 + dr * hh * 0.18;
          drawLeaf(ctx, px, py, (r() - 0.5) * 1.6 + dr * 0.6, hh * 0.34, W * 0.12, v.leafShape, i % 3 ? ll : cLight);
        }
      }
      if (v.special === 'lavender' && (showFlowers || showBuds)) {
        // hastes finas com espigas roxas acima da folhagem
        const spikes = 7;
        for (let i = 0; i < spikes; i++) {
          const px = (i - spikes / 2) * W * 0.13 + (r() - 0.5) * 4;
          ctx.strokeStyle = hsl(100, 20, 45);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(px, -hh * 0.5); ctx.lineTo(px + sway * 30, -hh * 1.25); ctx.stroke();
          if (showFlowers) {
            ctx.fillStyle = v.flowerColors[0];
            for (let jj = 0; jj < 4; jj++) {
              ctx.beginPath(); ctx.ellipse(px + sway * 30, -hh * (1.25 + jj * 0.06), 2.2, 3, 0, 0, Math.PI * 2); ctx.fill();
            }
          }
        }
      } else if (showFlowers) {
        const nf = 4 + Math.floor(r() * 4);
        for (let i = 0; i < nf; i++) {
          drawFlowerHead(ctx, (r() - 0.5) * W * 0.85, -hh * (0.55 + r() * 0.5), fSize * (0.7 + r() * 0.4), v.flowerShape, v.flowerColors, pp.seed + i, openness);
        }
      } else if (showBuds) {
        ctx.fillStyle = cDark;
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc((r() - 0.5) * W * 0.7, -hh * (0.6 + r() * 0.4), fSize * 0.14, 0, Math.PI * 2); ctx.fill(); }
      }
      break;
    }
    // ------------------------------------------------ roseta
    case 'rosette': {
      const isSuc = v.leafShape === 'succulent-rosette' || v.leafShape === 'spines';
      const rings = isSuc ? 3 : 2;
      for (let ring = rings; ring >= 1; ring--) {
        const n = isSuc ? 5 + ring * 3 : 5 + ring * 2;
        const len = H * (0.3 + ring * 0.22);
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + ring * 0.35;
          const tilt = isSuc ? a : a; // rosetas: folhas radiais
          const lc = ring % 2 ? hsl(c.h, c.s, c.l) : cLight;
          ctx.save();
          ctx.translate(0, -H * 0.08);
          ctx.rotate(tilt);
          ctx.scale(1, 0.55 + dr * 0.2); // perspectiva
          drawLeaf(ctx, 0, 0, 0, len, len * (isSuc ? 0.3 : 0.42), v.leafShape, lc, isSuc ? cDark : undefined);
          if (v.leafVariegation) { ctx.save(); ctx.rotate(0); drawVariegation(ctx, v, len, len * 0.4, c); ctx.restore(); }
          ctx.restore();
        }
      }
      if (showFlowers) {
        // haste floral saindo do centro
        ctx.strokeStyle = stem; ctx.lineWidth = Math.max(1, H * 0.04);
        ctx.beginPath(); ctx.moveTo(0, -H * 0.1); ctx.quadraticCurveTo(H * 0.15, -H * 0.6, H * 0.2, -H * 0.95); ctx.stroke();
        drawFlowerHead(ctx, H * 0.2, -H * 0.95, fSize, v.flowerShape, v.flowerColors, pp.seed, openness);
      }
      break;
    }
    // ------------------------------------------------ samambaia
    case 'fern-clump': {
      const fronds = 6 + Math.floor(r() * 4);
      for (let i = 0; i < fronds; i++) {
        const a = -Math.PI / 2 + (i - fronds / 2) * 0.32 + (r() - 0.5) * 0.15;
        const len = H * (0.7 + r() * 0.35);
        const lc = i % 2 ? hsl(c.h, c.s, c.l) : cDark;
        ctx.save();
        ctx.rotate(a + Math.PI / 2 + dr * 0.4 * Math.sign(Math.cos(a)));
        drawLeaf(ctx, 0, 0, 0, len, len * 0.2, 'frond', lc);
        ctx.restore();
      }
      break;
    }
    // ------------------------------------------------ trepadeira
    case 'vine-climbing': {
      // suporte
      ctx.strokeStyle = '#7a5a38';
      ctx.lineWidth = Math.max(1.5, H * 0.04);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-H * 0.2, -H * 0.65); ctx.lineTo(H * 0.2, -H * 0.65); ctx.stroke();
      // caule serpenteando
      ctx.strokeStyle = stem;
      ctx.lineWidth = Math.max(1, H * 0.03);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let i = 1; i <= 6; i++) {
        ctx.quadraticCurveTo(Math.sin(i * 1.8) * H * 0.14, -H * (i - 0.5) / 6, Math.sin(i * 2.3) * H * 0.1, -H * i / 6);
      }
      ctx.stroke();
      const leaves = 8 + Math.floor(r() * 4);
      for (let i = 0; i < leaves; i++) {
        const t = 0.12 + (i / leaves) * 0.85;
        const px = Math.sin(t * 13 + pp.seed) * H * 0.18;
        drawLeaf(ctx, px, -H * t, (i % 2 ? 1 : -1) * 1.2 + dr * 0.5, H * 0.16, H * 0.08, v.leafShape, i % 2 ? cDark : hsl(c.h, c.s, c.l));
      }
      if (showFlowers) {
        const nf = 5;
        for (let i = 0; i < nf; i++) {
          drawFlowerHead(ctx, Math.sin((0.3 + i * 0.16) * 13 + pp.seed) * H * 0.2, -H * (0.3 + i * 0.16), fSize * 0.7, v.flowerShape, v.flowerColors, pp.seed + i, openness);
        }
      }
      break;
    }
    // ------------------------------------------------ pendente
    case 'vine-trailing': {
      // tufo no topo + fios caindo
      const strands = 5 + Math.floor(r() * 3);
      for (let sI = 0; sI < strands; sI++) {
        const a = (sI / strands) * Math.PI + Math.PI; // caindo
        const len = H * (0.5 + r() * 0.5);
        const ex = Math.cos(a) * H * 0.4;
        ctx.strokeStyle = stem;
        ctx.lineWidth = Math.max(0.8, H * 0.02);
        ctx.beginPath();
        ctx.moveTo(0, -H * 0.55);
        ctx.quadraticCurveTo(ex * 0.7, -H * 0.5 + len * 0.4, ex, -H * 0.55 + len);
        ctx.stroke();
        const nl = 5;
        for (let i = 1; i <= nl; i++) {
          const t = i / nl;
          const px = ex * (0.4 + t * 0.6) * t;
          const py = -H * 0.55 + len * t;
          drawLeaf(ctx, px, py, (i % 2 ? 1.3 : -1.3), H * 0.14, H * 0.075, v.leafShape, i % 2 ? cDark : hsl(c.h, c.s, c.l));
        }
      }
      // coroa
      for (let i = 0; i < 6; i++) {
        drawLeaf(ctx, (r() - 0.5) * H * 0.4, -H * (0.5 + r() * 0.2), (r() - 0.5) * 2, H * 0.2, H * 0.1, v.leafShape, i % 2 ? cLight : hsl(c.h, c.s, c.l));
      }
      if (showFlowers) {
        for (let i = 0; i < 4; i++) drawFlowerHead(ctx, (r() - 0.5) * H * 0.6, -H * 0.45 + r() * H * 0.4, fSize * 0.7, v.flowerShape, v.flowerColors, pp.seed + i, openness);
      }
      break;
    }
    // ------------------------------------------------ capim
    case 'grass-clump': {
      const blades = 10 + Math.floor(r() * 6);
      for (let i = 0; i < blades; i++) {
        const a = (i - blades / 2) * 0.14 + (r() - 0.5) * 0.1;
        const len = H * (0.6 + r() * 0.4);
        ctx.strokeStyle = i % 3 ? hsl(c.h, c.s, c.l) : cDark;
        ctx.lineWidth = Math.max(1, H * 0.028);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(Math.sin(a) * len * 0.5, -len * 0.6, Math.sin(a) * len * (0.9 + dr * 0.4), -len * (1 - dr * 0.3));
        ctx.stroke();
      }
      if (showFlowers) {
        const nf = 2 + Math.floor(r() * 2);
        for (let i = 0; i < nf; i++) {
          const px = (r() - 0.5) * H * 0.3;
          ctx.strokeStyle = stem; ctx.lineWidth = Math.max(1, H * 0.03);
          ctx.beginPath(); ctx.moveTo(px * 0.3, 0); ctx.lineTo(px, -H * 1.05); ctx.stroke();
          drawFlowerHead(ctx, px, -H * 1.05, fSize, v.flowerShape, v.flowerColors, pp.seed + i, openness);
        }
      }
      break;
    }
    // ------------------------------------------------ arvoreta
    case 'tree-small': {
      // tronco
      ctx.strokeStyle = pp.dead ? '#6a5438' : '#7a5a3a';
      ctx.lineWidth = Math.max(2, H * 0.09);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(H * 0.04, -H * 0.3, Math.sin(pp.seed) * H * 0.08, -H * 0.5);
      ctx.stroke();
      // galhos
      ctx.lineWidth = Math.max(1.2, H * 0.045);
      const bx = Math.sin(pp.seed) * H * 0.08;
      ctx.beginPath(); ctx.moveTo(bx, -H * 0.48); ctx.quadraticCurveTo(bx - H * 0.18, -H * 0.6, bx - H * 0.26, -H * 0.68); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, -H * 0.48); ctx.quadraticCurveTo(bx + H * 0.16, -H * 0.62, bx + H * 0.24, -H * 0.72); ctx.stroke();
      // copa (a menos que dormente/morta)
      if (!pp.dead && !pp.dormant) {
        const canopies = [
          { x: bx, y: -H * 0.72, rr: H * 0.3 },
          { x: bx - H * 0.24, y: -H * 0.66, rr: H * 0.22 },
          { x: bx + H * 0.24, y: -H * 0.68, rr: H * 0.23 },
        ];
        for (const cn of canopies) {
          if (v.leafShape === 'needle') {
            // conífera: triângulos
            ctx.fillStyle = hsl(c.h, c.s, c.l);
            ctx.beginPath();
            ctx.moveTo(cn.x, cn.y - cn.rr);
            ctx.lineTo(cn.x - cn.rr * 0.9, cn.y + cn.rr * 0.55);
            ctx.lineTo(cn.x + cn.rr * 0.9, cn.y + cn.rr * 0.55);
            ctx.closePath(); ctx.fill();
          } else {
            const grad = ctx.createRadialGradient(cn.x - cn.rr * 0.3, cn.y - cn.rr * 0.35, cn.rr * 0.2, cn.x, cn.y, cn.rr);
            grad.addColorStop(0, cLight);
            grad.addColorStop(1, cDark);
            ctx.fillStyle = grad;
            ctx.beginPath();
            // copa orgânica com lóbulos
            for (let i = 0; i < 8; i++) {
              const a = (i / 8) * Math.PI * 2;
              const rr2 = cn.rr * (0.85 + Math.sin(a * 3 + pp.seed) * 0.15);
              const px = cn.x + Math.cos(a) * rr2, py = cn.y + Math.sin(a) * rr2 * 0.85;
              if (i === 0) ctx.moveTo(px, py); else ctx.quadraticCurveTo(cn.x + Math.cos(a - 0.4) * rr2 * 1.12, cn.y + Math.sin(a - 0.4) * rr2, px, py);
            }
            ctx.closePath(); ctx.fill();
          }
        }
        if (showFlowers) {
          for (let i = 0; i < 7; i++) {
            const cn = canopies[i % canopies.length];
            drawFlowerHead(ctx, cn.x + (r() - 0.5) * cn.rr * 1.4, cn.y + (r() - 0.5) * cn.rr, fSize * 0.55, v.flowerShape, v.flowerColors, pp.seed + i, openness);
          }
        }
        // frutas cítricas
        if (v.special?.startsWith('citrus') && (pp.stage === 'seeding' || pp.stage === 'mature') && pp.quality > 55) {
          ctx.fillStyle = v.special === 'citrus-lemon' ? '#f4d430' : '#f09030';
          for (let i = 0; i < 4; i++) {
            const cn = canopies[i % canopies.length];
            ctx.beginPath(); ctx.arc(cn.x + (r() - 0.5) * cn.rr, cn.y + (r() - 0.3) * cn.rr, H * 0.05, 0, Math.PI * 2); ctx.fill();
          }
        }
      } else if (pp.dormant || pp.dead) {
        // galhos nus extras
        ctx.lineWidth = Math.max(0.8, H * 0.02);
        for (let i = 0; i < 6; i++) {
          const a = -Math.PI / 2 + (i - 3) * 0.35;
          ctx.beginPath();
          ctx.moveTo(bx, -H * 0.5);
          ctx.lineTo(bx + Math.cos(a) * H * 0.32, -H * 0.5 + Math.sin(a) * H * 0.32);
          ctx.stroke();
        }
      }
      break;
    }
    // ------------------------------------------------ cactos
    case 'cactus-globe': {
      const R = H * 0.42;
      const grad = ctx.createRadialGradient(-R * 0.3, -R * 1.05, R * 0.2, 0, -R * 0.9, R);
      grad.addColorStop(0, cLight); grad.addColorStop(1, cDark);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.ellipse(0, -R * 0.9, R, R * 0.95, 0, 0, Math.PI * 2); ctx.fill();
      // costelas
      ctx.strokeStyle = hsl(c.h, c.s, Math.max(8, c.l - 16), 0.5);
      ctx.lineWidth = Math.max(0.8, R * 0.05);
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -R * 0.9, Math.abs(i) * R * 0.3 + R * 0.08, R * 0.92, 0, -Math.PI / 2 - 0.7, -Math.PI / 2 + 0.7);
        ctx.stroke();
      }
      // espinhos
      ctx.strokeStyle = '#f0e0a0';
      ctx.lineWidth = Math.max(0.5, R * 0.03);
      for (let i = 0; i < 14; i++) {
        const a = r() * Math.PI * 2;
        const px = Math.cos(a) * R * 0.8, py = -R * 0.9 + Math.sin(a) * R * 0.8;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px * 1.16, -R * 0.9 + (py + R * 0.9) * 1.16); ctx.stroke();
      }
      if (showFlowers) drawFlowerHead(ctx, 0, -R * 1.9, fSize * 0.8, 'cup', v.flowerColors, pp.seed, openness);
      break;
    }
    case 'cactus-column': {
      const isOpuntia = v.special === 'opuntia';
      if (isOpuntia) {
        // raquetes
        ctx.fillStyle = hsl(c.h, c.s, c.l);
        ctx.beginPath(); ctx.ellipse(0, -H * 0.3, H * 0.26, H * 0.32, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = cLight;
        ctx.beginPath(); ctx.ellipse(-H * 0.2, -H * 0.68, H * 0.18, H * 0.24, -0.4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(H * 0.2, -H * 0.72, H * 0.19, H * 0.25, 0.35, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f0e0a0';
        for (let i = 0; i < 16; i++) {
          ctx.beginPath();
          ctx.arc((r() - 0.5) * H * 0.5, -H * (0.2 + r() * 0.6), H * 0.014, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const cols = 3;
        for (let i = 0; i < cols; i++) {
          const px = (i - 1) * H * 0.18;
          const hh = H * (i === 1 ? 1 : 0.6 + r() * 0.2);
          ctx.fillStyle = i === 1 ? hsl(c.h, c.s, c.l) : cDark;
          ctx.beginPath();
          ctx.moveTo(px - H * 0.08, 0);
          ctx.lineTo(px - H * 0.08, -hh + H * 0.08);
          ctx.arc(px, -hh + H * 0.08, H * 0.08, Math.PI, 0);
          ctx.lineTo(px + H * 0.08, 0);
          ctx.closePath(); ctx.fill();
        }
      }
      if (showFlowers) drawFlowerHead(ctx, 0, -H * 1.02, fSize * 0.7, 'cup', v.flowerColors, pp.seed, openness);
      break;
    }
    // ------------------------------------------------ folhas grandes
    case 'broadleaf-single': {
      const leaves = 4 + Math.floor(r() * 3);
      for (let i = 0; i < leaves; i++) {
        const a = -Math.PI / 2 + (i - leaves / 2) * 0.5 + (r() - 0.5) * 0.2;
        const len = H * (0.65 + r() * 0.35);
        // pecíolo
        ctx.strokeStyle = stem;
        ctx.lineWidth = Math.max(1.2, H * 0.035);
        const ex = Math.cos(a) * len * 0.5, ey = Math.sin(a) * len * 0.55 - dr * len * 0.2;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(ex * 0.4, ey * 0.6, ex, ey); ctx.stroke();
        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(a + Math.PI / 2 + dr * 0.4);
        const lc = i % 2 ? hsl(c.h, c.s, c.l) : cDark;
        leafPath(ctx, v.leafShape, len * 0.62, len * 0.3);
        ctx.fillStyle = lc; ctx.fill();
        if (v.special === 'monstera') {
          // fendas
          ctx.strokeStyle = 'rgba(20,30,15,0.9)';
          ctx.lineWidth = len * 0.035;
          for (let f = 0; f < 3; f++) {
            const fy = -len * 0.62 * (0.3 + f * 0.2);
            ctx.beginPath(); ctx.moveTo(-len * 0.28, fy); ctx.lineTo(-len * 0.06, fy + len * 0.02); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(len * 0.28, fy - len * 0.05); ctx.lineTo(len * 0.06, fy - len * 0.02); ctx.stroke();
          }
        }
        drawVariegation(ctx, v, len * 0.62, len * 0.3, c);
        ctx.restore();
      }
      break;
    }
    // ------------------------------------------------ orquídea
    case 'orchid-spike': {
      // folhas basais
      for (let i = 0; i < 4; i++) {
        const side = i % 2 ? 1 : -1;
        drawLeaf(ctx, 0, -H * 0.04, side * (1.15 + i * 0.12) + dr * 0.3, H * 0.4, H * 0.14, 'strap', i % 2 ? cDark : hsl(c.h, c.s, c.l));
      }
      // haste floral arqueada
      if (['mature', 'budding', 'flowering', 'seeding'].includes(pp.stage)) {
        ctx.strokeStyle = hsl(100, 25, 40);
        ctx.lineWidth = Math.max(1, H * 0.025);
        ctx.beginPath();
        ctx.moveTo(0, -H * 0.1);
        ctx.quadraticCurveTo(H * 0.25, -H * 0.75, H * 0.48, -H * 0.85);
        ctx.stroke();
        if (showFlowers) {
          const nf = 4 + Math.floor(r() * 3);
          for (let i = 0; i < nf; i++) {
            const t = 0.45 + (i / nf) * 0.55;
            const px = H * 0.25 * (t * 1.6) * 0.9;
            const py = -H * (0.35 + t * 0.5);
            drawFlowerHead(ctx, px, py, fSize * 0.75, v.flowerShape, v.flowerColors, pp.seed + i, openness);
          }
        } else if (showBuds) {
          ctx.fillStyle = hsl(100, 30, 50);
          for (let i = 0; i < 4; i++) {
            const t = 0.5 + i * 0.13;
            ctx.beginPath(); ctx.arc(H * 0.25 * t * 1.5, -H * (0.35 + t * 0.5), H * 0.035, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      break;
    }
    // ------------------------------------------------ aquática flutuante
    case 'aquatic-float': {
      // folhas-boia
      const pads = 3 + Math.floor(r() * 3);
      for (let i = 0; i < pads; i++) {
        const px = (r() - 0.5) * H * 1.2, py = -(r()) * H * 0.15;
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, 0.5);
        const lc = i % 2 ? hsl(c.h, c.s, c.l) : cDark;
        leafPath(ctx, 'pad-floating', H * 0.3, H * 0.3);
        ctx.fillStyle = lc; ctx.fill();
        ctx.restore();
      }
      if (showFlowers) {
        const lift = v.special === 'lotus' ? -H * 0.5 : -H * 0.12;
        if (v.special === 'lotus') {
          ctx.strokeStyle = hsl(100, 25, 40); ctx.lineWidth = Math.max(1, H * 0.03);
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, lift); ctx.stroke();
        }
        ctx.save(); ctx.translate(0, lift); ctx.scale(1, 0.7);
        drawFlowerHead(ctx, 0, 0, fSize, 'waterlily', v.flowerColors, pp.seed, openness);
        ctx.restore();
      }
      break;
    }
    // ------------------------------------------------ margem
    case 'aquatic-margin': {
      const blades = 7 + Math.floor(r() * 5);
      for (let i = 0; i < blades; i++) {
        const a = (i - blades / 2) * 0.12;
        const len = H * (0.7 + r() * 0.35);
        ctx.strokeStyle = i % 3 ? hsl(c.h, c.s, c.l) : cDark;
        ctx.lineWidth = Math.max(1, H * 0.035);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(Math.sin(a) * len * 0.4, -len * 0.6, Math.sin(a) * len * 0.8 + sway * 40, -len);
        ctx.stroke();
      }
      if (v.special === 'papyrus') {
        // pompons no topo
        for (let i = 0; i < 3; i++) {
          const px = (i - 1) * H * 0.2 + sway * 40;
          ctx.strokeStyle = hsl(c.h, c.s - 10, c.l + 12, 0.9);
          ctx.lineWidth = 0.8;
          for (let s2 = 0; s2 < 14; s2++) {
            const a = (s2 / 14) * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(px, -H);
            ctx.lineTo(px + Math.cos(a) * H * 0.14, -H + Math.sin(a) * H * 0.14);
            ctx.stroke();
          }
        }
      } else if (v.special === 'cattail' && (showFlowers || pp.stage === 'mature')) {
        ctx.fillStyle = '#7a4a28';
        ctx.beginPath();
        const px = sway * 40;
        ctx.roundRect(px - H * 0.035, -H * 0.95, H * 0.07, H * 0.25, H * 0.035);
        ctx.fill();
      } else if (showFlowers) {
        drawFlowerHead(ctx, sway * 40, -H * 1.02, fSize, v.flowerShape, v.flowerColors, pp.seed, openness);
      }
      break;
    }
    // ------------------------------------------------ carnívora
    case 'trap-plant': {
      if (v.special === 'flytrap') {
        const traps = 4 + Math.floor(r() * 2);
        for (let i = 0; i < traps; i++) {
          const a = (i / traps) * Math.PI * 2;
          const px = Math.cos(a) * H * 0.3, py = -H * 0.12 + Math.sin(a) * H * 0.14;
          ctx.strokeStyle = hsl(c.h, c.s, c.l);
          ctx.lineWidth = Math.max(1, H * 0.05);
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(px, py); ctx.stroke();
          // mandíbula
          ctx.fillStyle = '#d84858';
          ctx.beginPath(); ctx.ellipse(px, py - H * 0.06, H * 0.1, H * 0.13, a, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#e8f0c0';
          ctx.lineWidth = 0.8;
          for (let t2 = 0; t2 < 5; t2++) {
            const ta = a - 0.6 + t2 * 0.3;
            ctx.beginPath();
            ctx.moveTo(px + Math.cos(ta) * H * 0.1, py - H * 0.06 + Math.sin(ta) * H * 0.12);
            ctx.lineTo(px + Math.cos(ta) * H * 0.14, py - H * 0.06 + Math.sin(ta) * H * 0.17);
            ctx.stroke();
          }
        }
      } else if (v.leafShape === 'pitcher') {
        const isNep = v.special === 'nepenthes';
        const pitchers = 3 + Math.floor(r() * 2);
        for (let i = 0; i < pitchers; i++) {
          const px = (i - pitchers / 2) * H * 0.3;
          const hh = H * (0.55 + r() * 0.4);
          ctx.save();
          ctx.translate(px, isNep ? -H * 0.15 : 0);
          const base = v.special === 'sarracenia' ? '#a83848' : hsl(c.h, c.s, c.l);
          leafPath(ctx, 'pitcher', hh, hh * 0.32);
          ctx.fillStyle = base; ctx.fill();
          // tampa
          ctx.fillStyle = shadeHex(v.special === 'sarracenia' ? '#a83848' : '#88a848', 0.15);
          ctx.beginPath(); ctx.ellipse(hh * 0.05, -hh * 1.02, hh * 0.16, hh * 0.08, -0.3, 0, Math.PI * 2); ctx.fill();
          // veias
          ctx.strokeStyle = 'rgba(120,20,40,0.4)';
          ctx.lineWidth = 0.8;
          for (let vI = 0; vI < 3; vI++) {
            ctx.beginPath(); ctx.moveTo(-hh * 0.1 + vI * hh * 0.1, 0); ctx.lineTo(-hh * 0.12 + vI * hh * 0.12, -hh * 0.9); ctx.stroke();
          }
          ctx.restore();
        }
      } else if (v.special === 'sundew') {
        for (let i = 0; i < 7; i++) {
          const a = (i / 7) * Math.PI * 2;
          const px = Math.cos(a) * H * 0.3, py = -H * 0.1 + Math.sin(a) * H * 0.12;
          ctx.strokeStyle = '#a8c850';
          ctx.lineWidth = Math.max(1, H * 0.04);
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(px * 0.6, py - H * 0.1, px, py - H * 0.2); ctx.stroke();
          // gotas grudentas
          ctx.fillStyle = 'rgba(240,120,140,0.8)';
          for (let d2 = 0; d2 < 4; d2++) {
            ctx.beginPath(); ctx.arc(px * (0.6 + d2 * 0.13), (py - H * 0.1) * (0.6 + d2 * 0.13), H * 0.02, 0, Math.PI * 2); ctx.fill();
          }
        }
      } else {
        // pinguicula/utricularia: roseta pegajosa + florzinha
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.save(); ctx.translate(0, -H * 0.05); ctx.rotate(a); ctx.scale(1, 0.5);
          leafPath(ctx, 'succulent-rosette', H * 0.35, H * 0.16);
          ctx.fillStyle = i % 2 ? '#a8c860' : '#b8d870'; ctx.fill();
          ctx.restore();
        }
        if (showFlowers) {
          ctx.strokeStyle = '#88a850'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(0, -H * 0.1); ctx.lineTo(H * 0.1, -H * 0.75); ctx.stroke();
          drawFlowerHead(ctx, H * 0.1, -H * 0.78, fSize * 0.7, 'trumpet', v.flowerColors, pp.seed, openness);
        }
      }
      break;
    }
  }

  // pragas visíveis: pontinhos
  if (pp.stress.length === 0 && !pp.dead) { /* saudável */ }
  ctx.restore();
}

// sombra suave no chão
export function drawPlantShadow(ctx: Ctx, plantId: string, pp: PaintParams, h: number, sunX: number): void {
  const def = PLANT_BY_ID[plantId];
  if (!def || pp.stage === 'seed') return;
  const scale = stageScale(pp.stage, pp.stageProgress);
  const H = h * def.visual.sizeScale * scale;
  ctx.save();
  ctx.fillStyle = 'rgba(20,25,15,0.22)';
  ctx.beginPath();
  ctx.ellipse(sunX * H * 0.2, 0, H * 0.32, H * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
