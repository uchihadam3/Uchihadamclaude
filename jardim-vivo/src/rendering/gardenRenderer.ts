import { AREA_BY_ID, tileLight } from '../data/areasData';
import { POT_BY_ID } from '../data/potsData';
import { DECOR_BY_ID } from '../data/decorData';
import { PLANT_BY_ID } from '../data/plants';
import type { PotData } from '../types';
import { G, plantsInArea, isDead } from '../game/gameState';
import { sunAmount, dayPhase } from '../game/gameTime';
import { debrisAt } from '../game/actions';
import { activeVisitors, critters } from '../game/visitorSystem';
import { drawPlant, drawPlantShadow, paintParamsFor } from './plantPainters';
import { drawDecor } from './decorPainters';
import { skyColors, ambientTint, hsl, seasonGroundMod } from './palette';

type Ctx = CanvasRenderingContext2D;

export interface Camera { x: number; y: number; zoom: number }

export interface RenderOpts {
  cam: Camera;
  hover: { x: number; y: number } | null;
  selected: { x: number; y: number } | null;
  mode: 'view' | 'build' | 'plant' | 'water';
  showGrid: boolean;
  time: number;
}

export const TILE_W = 76;
export const TILE_H = 54;

export function tileToScreen(tx: number, ty: number, cam: Camera, w: number, h: number, areaCols: number, areaRows: number): { x: number; y: number } {
  const totalW = areaCols * TILE_W, totalH = areaRows * TILE_H;
  const ox = w / 2 - (totalW / 2 - cam.x) * cam.zoom;
  const oy = h * 0.55 - (totalH / 2 - cam.y) * cam.zoom;
  return { x: ox + tx * TILE_W * cam.zoom, y: oy + ty * TILE_H * cam.zoom };
}

export function screenToTile(sx: number, sy: number, cam: Camera, w: number, h: number, areaCols: number, areaRows: number): { x: number; y: number } {
  const totalW = areaCols * TILE_W, totalH = areaRows * TILE_H;
  const ox = w / 2 - (totalW / 2 - cam.x) * cam.zoom;
  const oy = h * 0.55 - (totalH / 2 - cam.y) * cam.zoom;
  return { x: Math.floor((sx - ox) / (TILE_W * cam.zoom)), y: Math.floor((sy - oy) / (TILE_H * cam.zoom)) };
}

const LIGHT_GROUND: Record<string, [number, number, number]> = {
  // h, s, l base do solo por tipo de luz
  'full-sun': [80, 32, 44], 'morning-sun': [82, 30, 41], 'afternoon-sun': [75, 32, 42],
  'part-shade': [95, 26, 34], 'light-shade': [105, 24, 30], 'deep-shade': [115, 22, 24],
  'bright-indirect': [40, 22, 46], 'medium-indirect': [38, 20, 40], 'grow-light': [300, 12, 42],
};

export function renderGarden(ctx: Ctx, w: number, h: number, areaId: string, opts: RenderOpts): void {
  const area = AREA_BY_ID[areaId];
  if (!area || !G) return;
  const { cam, time } = opts;
  const sun = sunAmount(G.calendar);
  const wtr = G.weather;
  const sky = skyColors(sun, G.calendar.season, wtr.raining);
  const phase = dayPhase(G.calendar);

  // ---------- céu / fundo ----------
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  if (area.indoor) {
    grad.addColorStop(0, area.ambientPalette.sky);
    grad.addColorStop(1, shadeStr(area.ambientPalette.sky, -0.25));
  } else {
    grad.addColorStop(0, sky.top);
    grad.addColorStop(0.5, sky.bottom);
    grad.addColorStop(1, shadeStr(sky.bottom, -0.15));
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // sol/lua
  if (!area.indoor) {
    const dayT = G.calendar.minute / 1440;
    const sunX = w * (0.12 + dayT * 0.76);
    const sunY = h * 0.3 - Math.sin(Math.max(0, sun) * Math.PI / 2) * h * 0.22;
    if (sun > 0.03) {
      const sg = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 60);
      sg.addColorStop(0, wtr.cloudy ? 'rgba(255,245,220,0.45)' : 'rgba(255,240,200,0.95)');
      sg.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(sunX, sunY, 60, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = wtr.cloudy ? 'rgba(255,248,230,0.55)' : '#fff4d8';
      ctx.beginPath(); ctx.arc(sunX, sunY, 16, 0, Math.PI * 2); ctx.fill();
    } else if (phase === 'night') {
      ctx.fillStyle = '#e8e4d8';
      ctx.beginPath(); ctx.arc(w * 0.75, h * 0.14, 13, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = sky.top;
      ctx.beginPath(); ctx.arc(w * 0.75 + 6, h * 0.14 - 3, 11, 0, Math.PI * 2); ctx.fill();
      // estrelas
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 127) % 100) / 100 * w, sy2 = ((i * 83) % 45) / 100 * h;
        ctx.fillStyle = `rgba(255,255,240,${0.3 + Math.sin(time * 2 + i) * 0.25})`;
        ctx.fillRect(sx, sy2, 1.6, 1.6);
      }
    }
    // nuvens
    if (wtr.cloudy || wtr.raining) {
      ctx.fillStyle = wtr.raining ? 'rgba(120,130,145,0.8)' : 'rgba(240,244,248,0.75)';
      for (let i = 0; i < 4; i++) {
        const cx = ((time * 6 + i * 260) % (w + 300)) - 150;
        const cy = h * (0.08 + (i % 3) * 0.06);
        drawCloud(ctx, cx, cy, 55 + i * 14);
      }
    } else if (sun > 0.2) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 2; i++) {
        const cx = ((time * 3.5 + i * 420) % (w + 300)) - 150;
        drawCloud(ctx, cx, h * (0.07 + i * 0.07), 40 + i * 15);
      }
    }
    // colinas de fundo
    ctx.fillStyle = shadeStr(area.ambientPalette.accent, -0.28 + sky.light * 0.15 - 0.15);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.42);
    for (let x = 0; x <= w; x += 40) ctx.lineTo(x, h * 0.42 - Math.sin(x * 0.008 + 1) * h * 0.05);
    ctx.lineTo(w, h * 0.55); ctx.lineTo(0, h * 0.55);
    ctx.fill();
    ctx.fillStyle = shadeStr(area.ambientPalette.accent, -0.1 + sky.light * 0.12 - 0.12);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    for (let x = 0; x <= w; x += 40) ctx.lineTo(x, h * 0.5 - Math.sin(x * 0.011 + 4) * h * 0.04);
    ctx.lineTo(w, h * 0.62); ctx.lineTo(0, h * 0.62);
    ctx.fill();
  } else {
    // parede interna com janela
    ctx.fillStyle = shadeStr(area.ambientPalette.sky, -0.12);
    ctx.fillRect(0, 0, w, h * 0.42);
    ctx.fillStyle = 'rgba(255,250,230,0.25)';
    ctx.fillRect(w * 0.12, h * 0.06, w * 0.18, h * 0.28);
    ctx.strokeStyle = shadeStr(area.ambientPalette.sky, -0.4);
    ctx.lineWidth = 5;
    ctx.strokeRect(w * 0.12, h * 0.06, w * 0.18, h * 0.28);
    ctx.beginPath(); ctx.moveTo(w * 0.21, h * 0.06); ctx.lineTo(w * 0.21, h * 0.34); ctx.stroke();
    const winLight = ctx.createLinearGradient(w * 0.12, h * 0.06, w * 0.4, h * 0.6);
    winLight.addColorStop(0, `rgba(255,250,220,${0.12 * sky.light})`);
    winLight.addColorStop(1, 'rgba(255,250,220,0)');
    ctx.fillStyle = winLight;
    ctx.fillRect(0, 0, w, h);
  }

  // ---------- chão base ----------
  const base = tileToScreen(0, 0, cam, w, h, area.cols, area.rows);
  const end = tileToScreen(area.cols, area.rows, cam, w, h, area.cols, area.rows);
  const groundMod = area.indoor ? 0 : seasonGroundMod(G.calendar.season);
  ctx.fillStyle = shadeStr(area.ambientPalette.ground, groundMod - (1 - sky.light) * 0.3);
  ctx.beginPath();
  ctx.roundRect(base.x - 22, base.y - 16, end.x - base.x + 44, end.y - base.y + 34, 18);
  ctx.fill();
  // borda do terreno
  ctx.strokeStyle = shadeStr(area.ambientPalette.ground, -0.35);
  ctx.lineWidth = 4;
  ctx.stroke();

  // ---------- tiles ----------
  const ts = TILE_W * cam.zoom;
  const tsh = TILE_H * cam.zoom;
  for (let ty = 0; ty < area.rows; ty++) {
    for (let tx = 0; tx < area.cols; tx++) {
      const scr = tileToScreen(tx, ty, cam, w, h, area.cols, area.rows);
      const lt = tileLight(area, tx, ty);
      if (lt === 'water') {
        drawWaterTile(ctx, scr.x, scr.y, ts, tsh, time, sky.light);
        continue;
      }
      if (lt === 'blocked') continue;
      if (lt === 'bench') {
        drawBenchTile(ctx, scr.x, scr.y, ts, tsh);
        continue;
      }
      const [gh, gs, gl] = LIGHT_GROUND[lt] ?? [80, 30, 40];
      const lightF = sky.light;
      const jitter = ((tx * 7 + ty * 13) % 5) - 2;
      ctx.fillStyle = hsl(gh + jitter, gs, (gl + jitter + groundMod * 60) * (0.55 + lightF * 0.45));
      ctx.beginPath();
      ctx.roundRect(scr.x + 1.5, scr.y + 1.5, ts - 3, tsh - 3, 5);
      ctx.fill();
      // textura: pontinhos de grama/terra
      ctx.fillStyle = hsl(gh + 8, gs + 6, (gl + 8) * (0.55 + lightF * 0.45), 0.5);
      for (let i = 0; i < 4; i++) {
        const px = scr.x + (((tx * 31 + ty * 17 + i * 23) % 80) / 80) * ts;
        const py = scr.y + (((tx * 13 + ty * 41 + i * 37) % 80) / 80) * tsh;
        ctx.fillRect(px, py, 2.5 * cam.zoom, 1.6 * cam.zoom);
      }
      // sombra pontilhada em tiles de sombra
      if (lt === 'part-shade' || lt === 'light-shade' || lt === 'deep-shade') {
        ctx.fillStyle = `rgba(15,25,10,${lt === 'deep-shade' ? 0.28 : lt === 'light-shade' ? 0.18 : 0.1})`;
        ctx.beginPath();
        ctx.ellipse(scr.x + ts * 0.5, scr.y + tsh * 0.45, ts * 0.42, tsh * 0.4, 0.3, 0, Math.PI * 2);
        ctx.fill();
        // furos de luz (dappled)
        ctx.fillStyle = hsl(gh, gs, gl + 18, 0.35 * lightF);
        for (let i = 0; i < 3; i++) {
          const px = scr.x + (((tx * 53 + i * 29) % 70) / 70) * ts;
          const py = scr.y + (((ty * 43 + i * 61) % 70) / 70) * tsh;
          ctx.beginPath(); ctx.ellipse(px, py, 4 * cam.zoom, 2.5 * cam.zoom, 0.5, 0, Math.PI * 2); ctx.fill();
        }
      }
      // grid
      if (opts.showGrid || opts.mode !== 'view') {
        ctx.strokeStyle = 'rgba(255,255,255,0.14)';
        ctx.lineWidth = 1;
        ctx.strokeRect(scr.x + 1.5, scr.y + 1.5, ts - 3, tsh - 3);
      }
    }
  }

  // hover/seleção
  if (opts.hover && opts.hover.x >= 0 && opts.hover.x < area.cols && opts.hover.y >= 0 && opts.hover.y < area.rows) {
    const scr = tileToScreen(opts.hover.x, opts.hover.y, cam, w, h, area.cols, area.rows);
    ctx.strokeStyle = 'rgba(255,240,180,0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(scr.x + 2, scr.y + 2, ts - 4, tsh - 4, 6); ctx.stroke();
  }
  if (opts.selected) {
    const scr = tileToScreen(opts.selected.x, opts.selected.y, cam, w, h, area.cols, area.rows);
    const pulse = 0.6 + Math.sin(time * 5) * 0.3;
    ctx.strokeStyle = `rgba(120,230,150,${pulse})`;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(scr.x + 2, scr.y + 2, ts - 4, tsh - 4, 6); ctx.stroke();
  }

  // ---------- entidades ordenadas por profundidade ----------
  interface Entity { y: number; draw: () => void }
  const entities: Entity[] = [];

  // entulho
  if (areaId === 'quintal') {
    for (let ty = 0; ty < area.rows; ty++) {
      for (let tx = 0; tx < area.cols; tx++) {
        if (debrisAt(areaId, tx, ty) >= 0) {
          const scr = tileToScreen(tx, ty, cam, w, h, area.cols, area.rows);
          entities.push({
            y: scr.y + tsh, draw: () => drawDebris(ctx, scr.x + ts / 2, scr.y + tsh * 0.72, ts, tx * 7 + ty),
          });
        }
      }
    }
  }

  // decorações
  for (const d of G.decors.filter((dd) => dd.areaId === areaId)) {
    const def = DECOR_BY_ID[d.decorId];
    const scr = tileToScreen(d.tileX, d.tileY, cam, w, h, area.cols, area.rows);
    const isPath = def.category === 'path';
    entities.push({
      y: isPath ? -9999 : scr.y + tsh,
      draw: () => {
        ctx.save();
        ctx.translate(scr.x + ts / 2, scr.y + tsh * 0.72);
        ctx.scale(cam.zoom, cam.zoom);
        drawDecor(ctx, def.visual, TILE_W, time);
        ctx.restore();
      },
    });
  }

  // plantas
  const windAmt = Math.min(1, wtr.wind / 10) * (area.indoor ? 0.15 : 1);
  for (const p of plantsInArea(areaId)) {
    const scr = tileToScreen(p.tileX, p.tileY, cam, w, h, area.cols, area.rows);
    const cx = scr.x + ts / 2;
    const cy = scr.y + tsh * 0.78;
    const pp = paintParamsFor(p, time, windAmt);
    const pot = p.potId ? POT_BY_ID[p.potId] : null;
    entities.push({
      y: scr.y + tsh,
      draw: () => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(cam.zoom, cam.zoom);
        const sunDir = (G.calendar.minute / 1440 - 0.5) * 2;
        drawPlantShadow(ctx, p.plantId, pp, TILE_H * 1.35, sunDir);
        let potLift = 0;
        if (pot) {
          potLift = drawPot(ctx, pot, TILE_W);
        }
        ctx.translate(0, -potLift);
        drawPlant(ctx, p.plantId, pp, TILE_H * 1.35);
        // indicadores de estado (pequenos, visuais)
        drawStatusPips(ctx, p, TILE_W, time);
        ctx.restore();
      },
    });
  }

  // visitantes
  for (const v of activeVisitors.filter((vv) => vv.areaId === areaId)) {
    const scr = tileToScreen(v.x, v.y, cam, w, h, area.cols, area.rows);
    entities.push({
      y: scr.y + tsh,
      draw: () => {
        ctx.save();
        ctx.translate(scr.x + ts / 2, scr.y + tsh * 0.75);
        ctx.scale(cam.zoom, cam.zoom);
        drawPerson(ctx, v.palette, time + v.id, TILE_H);
        ctx.restore();
      },
    });
  }

  entities.sort((a, b) => a.y - b.y);
  for (const e of entities) e.draw();

  // ---------- criaturas ----------
  for (const cr of critters) {
    const scr = tileToScreen(cr.x, cr.y, cam, w, h, area.cols, area.rows);
    drawCritter(ctx, cr.kind, scr.x, scr.y - 30 * cam.zoom, cam.zoom, time, cr.hue);
    // movimento suave
    cr.x += Math.cos(cr.angle) * cr.speed * 0.008;
    cr.y += Math.sin(cr.angle) * cr.speed * 0.005;
    cr.angle += (Math.random() - 0.5) * 0.15;
    if (cr.x < 0 || cr.x > area.cols) cr.angle = Math.PI - cr.angle;
    if (cr.y < 0 || cr.y > area.rows) cr.angle = -cr.angle;
  }

  // ---------- clima em primeiro plano ----------
  if (wtr.raining && !area.indoor) {
    ctx.strokeStyle = 'rgba(180,210,235,0.4)';
    ctx.lineWidth = 1.2;
    const n = wtr.rainAmount * 14;
    for (let i = 0; i < n; i++) {
      const rx = ((i * 97 + time * 500) % (w + 60)) - 30;
      const ry = ((i * 61 + time * 900) % (h + 40)) - 20;
      ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 3, ry + 12); ctx.stroke();
    }
  }
  // vagalumes nas noites quentes
  if (phase === 'night' && !area.indoor && (G.calendar.season === 'summer' || G.calendar.season === 'spring')) {
    for (let i = 0; i < 8; i++) {
      const fx = w * ((i * 137 % 100) / 100) + Math.sin(time * 0.8 + i * 2) * 30;
      const fy = h * (0.55 + (i * 53 % 35) / 100) + Math.cos(time * 0.6 + i) * 18;
      const glow = Math.max(0, Math.sin(time * 1.5 + i * 2.7));
      ctx.fillStyle = `rgba(220,255,140,${glow * 0.8})`;
      ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI * 2); ctx.fill();
    }
  }

  // tinta ambiente (noite/entardecer/chuva)
  const tint = ambientTint(area.indoor ? Math.max(sun, 0.35) : sun, wtr.raining && !area.indoor);
  if (tint) {
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, w, h);
  }
  // vinheta suave
  const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.45, w / 2, h / 2, Math.max(w, h) * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(10,15,10,0.28)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
}

// ---------- sub-pintores ----------
function shadeStr(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt >= 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
  else { r *= 1 + amt; g *= 1 + amt; b *= 1 + amt; }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

function drawCloud(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.45, 0, Math.PI * 2);
  ctx.arc(x + s * 0.4, y - s * 0.12, s * 0.36, 0, Math.PI * 2);
  ctx.arc(x + s * 0.8, y, s * 0.4, 0, Math.PI * 2);
  ctx.arc(x + s * 0.4, y + s * 0.15, s * 0.42, 0, Math.PI * 2);
  ctx.fill();
}

function drawWaterTile(ctx: Ctx, x: number, y: number, ts: number, tsh: number, time: number, light: number): void {
  const g = ctx.createLinearGradient(x, y, x, y + tsh);
  g.addColorStop(0, hsl(200, 55, 42 * (0.5 + light * 0.5)));
  g.addColorStop(1, hsl(210, 60, 30 * (0.5 + light * 0.5)));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.roundRect(x + 1, y + 1, ts - 2, tsh - 2, 4); ctx.fill();
  // ondulações
  ctx.strokeStyle = `rgba(220,240,250,${0.25 + light * 0.15})`;
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 2; i++) {
    const wy = y + tsh * (0.3 + i * 0.35) + Math.sin(time * 1.8 + x * 0.05 + i * 2) * 3;
    ctx.beginPath();
    ctx.moveTo(x + ts * 0.15, wy);
    ctx.quadraticCurveTo(x + ts * 0.5, wy + 3, x + ts * 0.85, wy);
    ctx.stroke();
  }
  // brilho especular
  ctx.fillStyle = `rgba(255,255,255,${0.12 * light})`;
  ctx.beginPath();
  ctx.ellipse(x + ts * 0.5 + Math.sin(time) * 5, y + tsh * 0.4, ts * 0.2, tsh * 0.12, 0.3, 0, Math.PI * 2);
  ctx.fill();
}

function drawBenchTile(ctx: Ctx, x: number, y: number, ts: number, tsh: number): void {
  ctx.fillStyle = '#8a6a48';
  ctx.beginPath(); ctx.roundRect(x + 2, y + 2, ts - 4, tsh - 4, 4); ctx.fill();
  ctx.fillStyle = '#9a7a54';
  ctx.fillRect(x + 4, y + 4, ts - 8, 3);
  ctx.fillStyle = '#7a5a3c';
  for (let i = 0; i < 3; i++) ctx.fillRect(x + 6 + i * (ts / 3), y + tsh * 0.3, 2, tsh * 0.5);
}

function drawDebris(ctx: Ctx, cx: number, cy: number, ts: number, seed: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  // monte de galhos + mato + pedra
  ctx.strokeStyle = '#6a5438';
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    const a = ((seed * 13 + i * 47) % 100) / 100 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(-Math.cos(a) * ts * 0.2, -Math.sin(a) * ts * 0.06);
    ctx.lineTo(Math.cos(a) * ts * 0.22, -ts * 0.1 - Math.sin(a) * ts * 0.1);
    ctx.stroke();
  }
  ctx.fillStyle = '#8a8878';
  ctx.beginPath(); ctx.ellipse(ts * 0.1, 0, ts * 0.1, ts * 0.06, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#7a8a4a';
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 6; i++) {
    const px = (((seed * 7 + i * 31) % 100) / 100 - 0.5) * ts * 0.5;
    ctx.beginPath();
    ctx.moveTo(px, 2);
    ctx.quadraticCurveTo(px + 3, -ts * 0.12, px + ((i % 2) * 2 - 1) * 6, -ts * 0.2);
    ctx.stroke();
  }
  ctx.restore();
}

/** desenha o vaso e retorna o "lift" (altura do topo do vaso) */
export function drawPot(ctx: Ctx, pot: PotData, ts: number): number {
  const w = ts * ({ tiny: 0.3, small: 0.38, medium: 0.48, large: 0.6, huge: 0.72, ground: 0.6 }[pot.size]);
  const hh = w * ({ round: 0.7, square: 0.65, bowl: 0.4, tall: 1.15, hanging: 0.55, 'window-box': 0.45, trough: 0.5, basket: 0.5, tray: 0.22, glass: 0.75, barrel: 0.8, wall: 0.5, 'aquatic-tub': 0.45, 'bonsai-tray': 0.25 }[pot.shape]);
  const col = pot.color;
  const dark = shadeStr(col, -0.25);
  const lite = shadeStr(col, 0.18);
  ctx.save();
  if (pot.isHanging) {
    // correntes
    ctx.strokeStyle = '#8a8070';
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-w * 0.4, -hh); ctx.lineTo(0, -hh - ts * 0.5); ctx.lineTo(w * 0.4, -hh); ctx.stroke();
  }
  switch (pot.shape) {
    case 'bowl': case 'tray': case 'bonsai-tray': case 'aquatic-tub': {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -hh);
      ctx.quadraticCurveTo(-w * 0.45, 0, -w * 0.3, 0);
      ctx.lineTo(w * 0.3, 0);
      ctx.quadraticCurveTo(w * 0.45, 0, w * 0.5, -hh);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = dark;
      ctx.beginPath(); ctx.ellipse(0, -hh, w * 0.5, w * 0.12, 0, 0, Math.PI * 2); ctx.fill();
      if (pot.shape === 'aquatic-tub') {
        ctx.fillStyle = '#5898b8';
        ctx.beginPath(); ctx.ellipse(0, -hh, w * 0.44, w * 0.1, 0, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = '#4a3826';
        ctx.beginPath(); ctx.ellipse(0, -hh, w * 0.42, w * 0.1, 0, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'glass': {
      ctx.fillStyle = 'rgba(200,230,240,0.4)';
      ctx.strokeStyle = 'rgba(230,245,250,0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, -hh * 0.6, w * 0.5, 0.3, Math.PI - 0.3, false);
      ctx.arc(0, -hh * 0.6, w * 0.5, Math.PI - 0.3, 0.3, false);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#4a3826';
      ctx.beginPath(); ctx.ellipse(0, -hh * 0.45, w * 0.36, w * 0.1, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'basket': {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -hh); ctx.lineTo(-w * 0.34, 0); ctx.lineTo(w * 0.34, 0); ctx.lineTo(w * 0.5, -hh);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = dark; ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(-w * (0.48 - i * 0.05), -hh + (i + 1) * hh * 0.25); ctx.lineTo(w * (0.48 - i * 0.05), -hh + (i + 1) * hh * 0.25); ctx.stroke();
      }
      break;
    }
    case 'barrel': {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(-w * 0.45, -hh);
      ctx.quadraticCurveTo(-w * 0.58, -hh * 0.5, -w * 0.45, 0);
      ctx.lineTo(w * 0.45, 0);
      ctx.quadraticCurveTo(w * 0.58, -hh * 0.5, w * 0.45, -hh);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#4a4a48'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(-w * 0.52, -hh * 0.7); ctx.lineTo(w * 0.52, -hh * 0.7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-w * 0.53, -hh * 0.3); ctx.lineTo(w * 0.53, -hh * 0.3); ctx.stroke();
      ctx.fillStyle = '#4a3826';
      ctx.beginPath(); ctx.ellipse(0, -hh, w * 0.4, w * 0.1, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    default: {
      // vaso padrão afunilado
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -hh);
      ctx.lineTo(-w * 0.36, 0);
      ctx.lineTo(w * 0.36, 0);
      ctx.lineTo(w * 0.5, -hh);
      ctx.closePath(); ctx.fill();
      // brilho lateral
      ctx.fillStyle = lite;
      ctx.beginPath();
      ctx.moveTo(-w * 0.42, -hh * 0.92);
      ctx.lineTo(-w * 0.32, -hh * 0.08);
      ctx.lineTo(-w * 0.22, -hh * 0.08);
      ctx.lineTo(-w * 0.3, -hh * 0.92);
      ctx.closePath(); ctx.fill();
      // aro
      ctx.fillStyle = pot.accentColor ?? dark;
      ctx.fillRect(-w * 0.52, -hh - w * 0.09, w * 1.04, w * 0.12);
      // terra
      ctx.fillStyle = '#4a3826';
      ctx.beginPath(); ctx.ellipse(0, -hh, w * 0.4, w * 0.09, 0, 0, Math.PI * 2); ctx.fill();
      if (pot.ventilated) {
        ctx.fillStyle = dark;
        for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.arc(i * w * 0.2, -hh * 0.45, w * 0.045, 0, Math.PI * 2); ctx.fill(); }
      }
      if (pot.selfWatering) {
        ctx.fillStyle = 'rgba(90,150,190,0.9)';
        ctx.fillRect(-w * 0.36, -hh * 0.25, w * 0.72, hh * 0.18);
      }
      break;
    }
  }
  ctx.restore();
  return hh;
}

// pips de estado sobre a planta (gotinha, praga, doença, sementes)
function drawStatusPips(ctx: Ctx, p: import('../types').PlantInstance, ts: number, time: number): void {
  if (isDead(p)) return;
  const def = PLANT_BY_ID[p.plantId];
  const pips: { icon: 'water' | 'pest' | 'sick' | 'seeds' | 'sparkle'; color: string }[] = [];
  const band = def.waterNeed;
  const dryish = p.moisture < ({ 'very-low': 8, low: 15, moderate: 30, high: 45, 'very-high': 55, aquatic: 0 }[band] ?? 25);
  if (dryish && band !== 'aquatic') pips.push({ icon: 'water', color: '#68b8e8' });
  if (p.pests.length) pips.push({ icon: 'pest', color: '#d86838' });
  if (p.disease) pips.push({ icon: 'sick', color: '#b868d8' });
  if (p.seedsReady) pips.push({ icon: 'seeds', color: '#e8c850' });
  if (p.quality >= 90 && p.health >= 90) pips.push({ icon: 'sparkle', color: '#f8e8a0' });
  if (!pips.length) return;
  const bob = Math.sin(time * 3) * 2;
  pips.forEach((pip, i) => {
    const px = (i - (pips.length - 1) / 2) * 15;
    const py = -ts * 1.15 + bob;
    ctx.save();
    ctx.translate(px, py);
    ctx.fillStyle = 'rgba(20,25,20,0.55)';
    ctx.beginPath(); ctx.arc(0, 0, 7.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pip.color;
    switch (pip.icon) {
      case 'water':
        ctx.beginPath();
        ctx.moveTo(0, -4); ctx.quadraticCurveTo(4.5, 1, 0, 4.5); ctx.quadraticCurveTo(-4.5, 1, 0, -4);
        ctx.fill();
        break;
      case 'pest':
        ctx.beginPath(); ctx.ellipse(0, 0, 3, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = pip.color; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(-4, -3); ctx.lineTo(-2, -1); ctx.moveTo(4, -3); ctx.lineTo(2, -1); ctx.stroke();
        break;
      case 'sick':
        ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(20,25,20,0.8)';
        ctx.beginPath(); ctx.arc(-1.4, -1, 1, 0, Math.PI * 2); ctx.arc(1.6, 0.5, 1.2, 0, Math.PI * 2); ctx.fill();
        break;
      case 'seeds':
        for (let s2 = 0; s2 < 3; s2++) { ctx.beginPath(); ctx.ellipse(-2.5 + s2 * 2.5, s2 % 2 ? 1.5 : -1, 1.4, 2, 0.4, 0, Math.PI * 2); ctx.fill(); }
        break;
      case 'sparkle':
        ctx.beginPath();
        ctx.moveTo(0, -4.5); ctx.lineTo(1.2, -1.2); ctx.lineTo(4.5, 0); ctx.lineTo(1.2, 1.2);
        ctx.lineTo(0, 4.5); ctx.lineTo(-1.2, 1.2); ctx.lineTo(-4.5, 0); ctx.lineTo(-1.2, -1.2);
        ctx.closePath(); ctx.fill();
        break;
    }
    ctx.restore();
  });
}

function drawPerson(ctx: Ctx, pal: { skin: string; shirt: string; hair: string }, t: number, hh: number): void {
  const bob = Math.abs(Math.sin(t * 5)) * 2;
  ctx.save();
  ctx.translate(0, -bob);
  // sombra
  ctx.fillStyle = 'rgba(20,25,15,0.25)';
  ctx.beginPath(); ctx.ellipse(0, bob, hh * 0.18, hh * 0.06, 0, 0, Math.PI * 2); ctx.fill();
  // pernas
  ctx.strokeStyle = '#3a3a48'; ctx.lineWidth = hh * 0.07;
  ctx.beginPath(); ctx.moveTo(-hh * 0.05, -hh * 0.25); ctx.lineTo(-hh * 0.06 - Math.sin(t * 5) * hh * 0.04, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hh * 0.05, -hh * 0.25); ctx.lineTo(hh * 0.06 + Math.sin(t * 5) * hh * 0.04, 0); ctx.stroke();
  // corpo
  ctx.fillStyle = pal.shirt;
  ctx.beginPath(); ctx.roundRect(-hh * 0.12, -hh * 0.52, hh * 0.24, hh * 0.3, hh * 0.06); ctx.fill();
  // cabeça
  ctx.fillStyle = pal.skin;
  ctx.beginPath(); ctx.arc(0, -hh * 0.62, hh * 0.1, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = pal.hair;
  ctx.beginPath(); ctx.arc(0, -hh * 0.66, hh * 0.09, Math.PI, 0); ctx.fill();
  ctx.restore();
}

function drawCritter(ctx: Ctx, kind: string, x: number, y: number, zoom: number, time: number, hue: number): void {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 4 + x) * 4 * zoom);
  ctx.scale(zoom, zoom);
  switch (kind) {
    case 'bee': {
      ctx.fillStyle = '#e8c030';
      ctx.beginPath(); ctx.ellipse(0, 0, 4, 2.8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#3a2a18';
      ctx.fillRect(-1.5, -2.6, 1.2, 5.2); ctx.fillRect(1, -2.4, 1.2, 4.8);
      const wingF = Math.sin(time * 40) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(230,240,250,${0.5 + wingF * 0.3})`;
      ctx.beginPath(); ctx.ellipse(-1, -3.5 - wingF, 2.5, 1.4, -0.4, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'butterfly': {
      const flap = Math.sin(time * 12) * 0.8;
      ctx.fillStyle = hsl(hue, 70, 55);
      ctx.save(); ctx.scale(Math.abs(Math.cos(flap)) * 0.7 + 0.3, 1);
      ctx.beginPath(); ctx.ellipse(-3, -1, 3.2, 4, 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(3, -1, 3.2, 4, -0.4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = hsl(hue + 20, 65, 40);
      ctx.beginPath(); ctx.ellipse(-2.4, 2.4, 2.2, 2.8, 0.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(2.4, 2.4, 2.2, 2.8, -0.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.fillStyle = '#2a2418';
      ctx.fillRect(-0.6, -3, 1.2, 6.5);
      break;
    }
    case 'ladybug': {
      ctx.fillStyle = '#d02818';
      ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1a1410';
      ctx.beginPath(); ctx.arc(0, -2.2, 1.6, 0, Math.PI * 2); ctx.fill();
      for (const [dx, dy] of [[-1.4, 0.2], [1.4, 0.4], [0, 1.6]] as const) {
        ctx.beginPath(); ctx.arc(dx, dy, 0.7, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 'hummingbird': {
      ctx.fillStyle = hsl(hue, 55, 45);
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 3, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = hsl(hue + 40, 60, 35);
      ctx.beginPath(); ctx.arc(4, -2, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#2a2418'; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(6, -2.4); ctx.lineTo(10, -3); ctx.stroke();
      const wingF = Math.sin(time * 50);
      ctx.fillStyle = `rgba(150,190,170,0.7)`;
      ctx.beginPath(); ctx.ellipse(-1, -3 - wingF * 2.5, 3.5, 1.6, -0.5 + wingF * 0.3, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'bird': {
      ctx.fillStyle = hsl(hue, 35, 45);
      ctx.beginPath(); ctx.ellipse(0, 0, 4.5, 3.2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = hsl(hue, 35, 35);
      ctx.beginPath(); ctx.arc(3.4, -2.2, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e8a030';
      ctx.beginPath(); ctx.moveTo(5.4, -2.4); ctx.lineTo(7.4, -1.9); ctx.lineTo(5.4, -1.4); ctx.fill();
      const wingF = Math.sin(time * 16);
      ctx.fillStyle = hsl(hue, 35, 30);
      ctx.beginPath(); ctx.ellipse(-0.5, -1 - Math.max(0, wingF) * 3, 3, 1.8, -0.4, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'dragonfly': {
      ctx.strokeStyle = hsl(hue, 60, 55);
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(4, 0); ctx.stroke();
      ctx.fillStyle = hsl(hue, 60, 50);
      ctx.beginPath(); ctx.arc(4, 0, 1.8, 0, Math.PI * 2); ctx.fill();
      const wf = Math.sin(time * 30) * 0.4;
      ctx.fillStyle = 'rgba(220,235,245,0.55)';
      ctx.beginPath(); ctx.ellipse(0, -2 - wf, 5, 1.2, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-1, 2 + wf, 5, 1.2, 0.15, 0, Math.PI * 2); ctx.fill();
      break;
    }
  }
  ctx.restore();
}
