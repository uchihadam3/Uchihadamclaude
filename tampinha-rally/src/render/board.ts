// Monta a maquete 3D de uma pista: chão texturizado + base (mesa), bordas
// levantadas que quicam, obstáculos (pedra/buraco/bomba/+3/10), decoração
// temática e bandeirinhas na chegada. Devolve o grupo e os itens que pulsam.
import * as THREE from 'three';
import { TrackDef } from '../engine/track';
import { makeBoardTexture, lighten } from './textures';

export interface BoardBuild { group: THREE.Group; pulses: { mesh: THREE.Mesh; kind: string; base: number }[]; }

const WALL_COL: Record<string, string> = {
  quintal: '#6b4e2e', praia: '#c9a35f', calcada: '#8f8879', garagem: '#a9773f', parquinho: '#5c4a2c', cozinha: '#c05a5a',
};

function markerTex(kind: string): THREE.CanvasTexture {
  const S = 128; const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!;
  const cx = S / 2, cy = S / 2;
  if (kind === 'bomb') { c.fillStyle = '#c0392b'; c.beginPath(); c.arc(cx, cy, S * 0.44, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 28, cy - 28); c.lineTo(cx + 28, cy + 28); c.moveTo(cx + 28, cy - 28); c.lineTo(cx - 28, cy + 28); c.stroke(); }
  else if (kind === 'plus3') { c.fillStyle = '#2ea44f'; c.beginPath(); c.arc(cx, cy, S * 0.44, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = 'bold 58px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('+3', cx, cy + 4); }
  else if (kind === 'ten') { c.fillStyle = '#e0a020'; c.beginPath(); c.arc(cx, cy, S * 0.44, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = 'bold 60px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('10', cx, cy + 4); }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

function decorProp(kind: string, col?: string): THREE.Object3D {
  const g = new THREE.Group(); const M = (c: string, rough = 0.9) => new THREE.MeshStandardMaterial({ color: c, roughness: rough });
  const cyl = (r1: number, r2: number, h: number, c: string) => new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 12), M(c));
  const box = (w: number, hh: number, d: number, c: string) => new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), M(c));
  switch (kind) {
    case 'twig': { const m = cyl(0.09, 0.12, 2.2, '#5a3f22'); m.rotation.z = 1.57; m.position.y = 0.12; g.add(m); break; }
    case 'leaf': { const m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), M(col || '#7a9b3a')); m.scale.set(1, 0.14, 0.7); m.position.y = 0.07; g.add(m); break; }
    case 'pebble': { const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42), M('#b8ae98')); m.scale.y = 0.6; m.position.y = 0.2; g.add(m); break; }
    case 'grass': { for (let i = 0; i < 5; i++) { const b = cyl(0.02, 0.05, 1.1, '#5f8a36'); b.position.set((Math.random() - 0.5) * 0.5, 0.55, (Math.random() - 0.5) * 0.5); b.rotation.z = (Math.random() - 0.5) * 0.5; g.add(b); } break; }
    case 'shell': { const m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8, 0, 6.3, 0, 1.6), M(col || '#f0dcc6')); m.position.y = 0.1; g.add(m); break; }
    case 'starfish': { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.12, 5), M(col || '#e08a4a')); s.position.y = 0.1; g.add(s); break; }
    case 'castle': { const b = box(2.4, 1.4, 2.4, '#d8b878'); b.position.y = 0.7; g.add(b); for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const t = cyl(0.35, 0.4, 1.9, '#d8b878'); t.position.set(dx, 0.95, dz); g.add(t); } break; }
    case 'chalk': { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.7), new THREE.MeshStandardMaterial({ color: col || '#e8607a', roughness: 1, transparent: true, opacity: 0.85 })); m.rotation.x = -1.57; m.position.y = 0.03; g.add(m); break; }
    case 'toy': { const b = box(1.1, 0.7, 1.1, col || '#e0c040'); b.position.y = 0.35; g.add(b); const t = cyl(0.28, 0.28, 0.5, lighten(col || '#e0c040', 20)); t.position.y = 0.9; g.add(t); break; }
    case 'box': { const b = box(2.4, 1.6, 2.0, '#c39a63'); b.position.y = 0.8; b.castShadow = true; g.add(b); const lid = box(2.5, 0.14, 2.1, '#a97f48'); lid.position.y = 1.6; g.add(lid); break; }
    case 'tape': { const m = box(2.2, 0.06, 0.6, '#d9d2c2'); m.position.y = 0.05; g.add(m); break; }
    case 'pencil': { const m = cyl(0.13, 0.13, 3.2, col || '#e0b030'); m.rotation.z = 1.57; m.position.y = 0.16; g.add(m); const tip = cyl(0, 0.13, 0.4, '#333'); tip.rotation.z = 1.57; tip.position.set(1.7, 0.16, 0); g.add(tip); break; }
    case 'cup': { const m = cyl(0.85, 0.65, 1.8, '#e8e4dc'); m.position.y = 0.9; m.castShadow = true; g.add(m); const inner = cyl(0.7, 0.55, 1.6, '#b8b0a2'); inner.position.y = 1.05; g.add(inner); break; }
    case 'coin': { const m = cyl(0.55, 0.55, 0.12, col || '#e0c050'); m.position.y = 0.06; g.add(m); break; }
    case 'eraser': { const b = box(1.0, 0.5, 0.6, col || '#e06a8a'); b.position.y = 0.25; g.add(b); break; }
    case 'straw': { const m = cyl(0.1, 0.1, 3.0, col || '#e05a5a'); m.rotation.z = 1.4; m.position.y = 0.14; g.add(m); break; }
  }
  g.traverse(o => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

export function buildBoard(def: TrackDef): BoardBuild {
  const group = new THREE.Group();
  const pulses: BoardBuild['pulses'] = [];

  // base / mesa
  const base = new THREE.Mesh(new THREE.BoxGeometry(def.w + 5, 1.4, def.h + 5), new THREE.MeshStandardMaterial({ color: def.bg, roughness: 0.95 }));
  base.position.set(def.w / 2, -0.72, def.h / 2); base.receiveShadow = true; group.add(base);

  // chão texturizado
  const tex = makeBoardTexture(def); tex.flipY = false;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(def.w, def.h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.98 }));
  ground.rotation.x = -Math.PI / 2; ground.position.set(def.w / 2, 0, def.h / 2); ground.receiveShadow = true; group.add(ground);

  // bordas
  const wcol = WALL_COL[def.theme] || '#6b4e2e';
  const wallMat = new THREE.MeshStandardMaterial({ color: wcol, roughness: 0.85 });
  for (const w of def.walls) {
    const dx = w.b.x - w.a.x, dy = w.b.y - w.a.y; const len = Math.hypot(dx, dy); if (len < 0.05) continue;
    const m = new THREE.Mesh(new THREE.BoxGeometry(len + 0.5, 0.9, 0.6), wallMat);
    m.position.set((w.a.x + w.b.x) / 2, 0.42, (w.a.y + w.b.y) / 2);
    m.rotation.y = -Math.atan2(dy, dx); m.castShadow = true; m.receiveShadow = true; group.add(m);
  }

  // obstáculos
  for (const o of def.obstacles) {
    if (o.type === 'stone') {
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(o.r, 0), new THREE.MeshStandardMaterial({ color: '#9a948a', roughness: 0.9, flatShading: true }));
      m.position.set(o.x, o.r * 0.55, o.y); m.scale.y = 0.8; m.rotation.set(Math.random(), Math.random(), Math.random()); m.castShadow = true; m.receiveShadow = true; group.add(m);
    } else if (o.type === 'hole') {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(o.r, 24), new THREE.MeshBasicMaterial({ color: 0x1a140c }));
      disc.rotation.x = -Math.PI / 2; disc.position.set(o.x, 0.015, o.y); group.add(disc);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(o.r, 0.13, 8, 24), new THREE.MeshStandardMaterial({ color: '#3a2c1a', roughness: 1 }));
      rim.rotation.x = -Math.PI / 2; rim.position.set(o.x, 0.02, o.y); group.add(rim);
    } else {
      const col = o.type === 'bomb' ? '#c0392b' : o.type === 'plus3' ? '#2ea44f' : '#e0a020';
      const pad = new THREE.Mesh(new THREE.CircleGeometry(o.r, 24), new THREE.MeshBasicMaterial({ map: markerTex(o.type), transparent: true }));
      pad.rotation.x = -Math.PI / 2; pad.position.set(o.x, 0.03, o.y); group.add(pad);
      const glow = new THREE.Mesh(new THREE.CircleGeometry(o.r * 1.5, 24), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.rotation.x = -Math.PI / 2; glow.position.set(o.x, 0.025, o.y); group.add(glow);
      pulses.push({ mesh: glow, kind: o.type, base: o.r * 1.5 });
    }
  }

  // decoração
  for (const d of def.decor) {
    const p = decorProp(d.kind, d.c); p.position.set(d.x, 0, d.y);
    if (d.s) p.scale.multiplyScalar(d.s); if (d.rot) p.rotation.y = d.rot; group.add(p);
  }

  // bandeirinhas na chegada
  for (const end of def.finish) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 8), new THREE.MeshStandardMaterial({ color: '#eee' }));
    pole.position.set(end.x, 1.2, end.y); pole.castShadow = true; group.add(pole);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7), new THREE.MeshStandardMaterial({ color: '#e5484d', side: THREE.DoubleSide }));
    flag.position.set(end.x + 0.6, 2.0, end.y); group.add(flag);
  }

  return { group, pulses };
}
