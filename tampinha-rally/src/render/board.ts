// Monta a maquete 3D de uma pista: chão texturizado + base (mesa), bordas
// levantadas que quicam, obstáculos (pedra/buraco/bomba/+3/10), decoração
// temática e bandeirinhas na chegada. Devolve o grupo e os itens que pulsam.
import * as THREE from 'three';
import { TrackDef, bugPos, segsOf } from '../engine/track';
import { makeBoardTexture, lighten } from './textures';

export interface BoardBuild { group: THREE.Group; pulses: { mesh: THREE.Mesh; kind: string; base: number }[]; spinners: THREE.Object3D[]; billboards: THREE.Object3D[]; dynamics: { update: (dt: number) => void }[]; }

function markerTex(kind: string, n = 1): THREE.CanvasTexture {
  const S = 128; const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!;
  const cx = S / 2, cy = S / 2;
  if (kind === 'jumparrow') { c.clearRect(0, 0, S, S); c.strokeStyle = 'rgba(90,255,140,0.95)'; c.lineWidth = 16; c.lineCap = 'round'; c.lineJoin = 'round'; for (let i = -1; i <= 1; i++) { const y = cy + i * 34; c.beginPath(); c.moveTo(cx - 34, y + 16); c.lineTo(cx, y - 16); c.lineTo(cx + 34, y + 16); c.stroke(); } }
  else if (kind === 'bomb') { c.fillStyle = '#c0392b'; c.beginPath(); c.arc(cx, cy, S * 0.44, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 28, cy - 28); c.lineTo(cx + 28, cy + 28); c.moveTo(cx + 28, cy - 28); c.lineTo(cx - 28, cy + 28); c.stroke(); }
  else if (kind === 'itembox') { const g = c.createLinearGradient(0, 0, S, S); g.addColorStop(0, '#a86bff'); g.addColorStop(1, '#6a3ce0'); c.fillStyle = g; c.fillRect(0, 0, S, S); c.strokeStyle = '#fff'; c.lineWidth = 8; c.strokeRect(8, 8, S - 16, S - 16); c.fillStyle = '#fff'; c.font = '900 84px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', cx, cy + 6); }
  else if (kind === 'cp') { c.clearRect(0, 0, S, S); c.fillStyle = '#1f9ad0'; c.strokeStyle = '#eafcff'; c.lineWidth = 8; c.beginPath(); c.arc(cx, cy, S * 0.42, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#dff6ff'; c.font = '800 22px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('CHECK', cx, cy - 24); c.fillStyle = '#fff'; c.font = '900 62px sans-serif'; c.fillText(String(n), cx, cy + 18); }
  else { const col = n >= 3 ? '#e0a020' : n === 2 ? '#2e9fa4' : '#2ea44f'; c.fillStyle = col; c.beginPath(); c.arc(cx, cy, S * 0.44, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = 'bold 58px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('+' + n, cx, cy + 4); }
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
    case 'ball8': { const b = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 12), M('#141414', 0.35)); b.position.y = 0.62; b.castShadow = true; g.add(b); const c8 = cyl(0.24, 0.24, 0.05, '#f2f2f2'); c8.position.set(0.28, 1.05, 0.28); c8.lookAt(2, 3, 2); g.add(c8); break; }
    case 'icecube': { const b = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), new THREE.MeshStandardMaterial({ color: '#cfeaf6', roughness: 0.15, transparent: true, opacity: 0.7 })); b.position.y = 0.55; b.rotation.y = Math.random() * 1.5; b.castShadow = true; g.add(b); break; }
    case 'bolt': { const head = cyl(0.42, 0.42, 0.3, '#8a949c'); (head.geometry as THREE.CylinderGeometry).dispose(); head.geometry = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 6); head.position.y = 0.15; g.add(head); const shaft = cyl(0.16, 0.16, 1.4, '#a8b2ba'); shaft.rotation.z = 1.57; shaft.position.set(0.8, 0.16, 0); g.add(shaft); break; }
    case 'remote': { const b = box(0.9, 0.22, 2.2, '#2a2a30'); b.position.y = 0.11; b.castShadow = true; g.add(b); for (let i = 0; i < 6; i++) { const k = cyl(0.09, 0.09, 0.08, i === 0 ? '#e05a5a' : '#b8c0c8'); k.position.set(((i % 2) - 0.5) * 0.36, 0.24, -0.7 + Math.floor(i / 2) * 0.42); g.add(k); } break; }

    // ---------- OBJETOS DE VERDADE (heróis do cenário — escala de mesa real) ----------
    case 'saltshaker': {   // saleiro de vidro com tampinha de metal furada
      const glass = new THREE.MeshPhysicalMaterial({ color: '#eef2f4', roughness: 0.08, transmission: 0.55, thickness: 0.6 } as any);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.15, 3.0, 18), glass); body.position.y = 1.5; body.castShadow = true; g.add(body);
      const salt = cyl(0.82, 1.0, 2.0, '#ffffff'); salt.position.y = 1.1; g.add(salt);
      const cap2 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.95, 0.75, 18), M('#c8ced4', 0.35)); cap2.position.y = 3.35; cap2.castShadow = true; g.add(cap2);
      for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283; const hole = cyl(0.09, 0.09, 0.06, '#4a5056'); hole.position.set(Math.cos(a) * 0.4, 3.74, Math.sin(a) * 0.4); g.add(hole); }
      break;
    }
    case 'plate': {        // prato de louça com friso azul e migalhas
      const pts: THREE.Vector2[] = [new THREE.Vector2(0, 0.12), new THREE.Vector2(2.6, 0.12), new THREE.Vector2(3.4, 0.3), new THREE.Vector2(4.1, 0.75), new THREE.Vector2(4.25, 0.8)];
      const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 36), M('#f2ede2', 0.35)); m.castShadow = true; m.receiveShadow = true; g.add(m);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.07, 8, 40), M('#4a7ab0', 0.5)); rim.rotation.x = 1.57; rim.position.y = 0.62; g.add(rim);
      for (let i = 0; i < 8; i++) { const cr = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14), M('#c9a35f')); cr.position.set((Math.random() - 0.5) * 3.4, 0.22, (Math.random() - 0.5) * 3.4); g.add(cr); }
      break;
    }
    case 'mugcoffee': {    // caneca com café e alça
      const bd = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.5, 3.9, 22, 1, true), new THREE.MeshStandardMaterial({ color: col || '#d05a4a', roughness: 0.4, side: THREE.DoubleSide })); bd.position.y = 1.95; bd.castShadow = true; g.add(bd);
      const bot = cyl(1.5, 1.5, 0.16, col || '#d05a4a'); bot.position.y = 0.08; g.add(bot);
      const cafe = cyl(1.55, 1.55, 0.08, '#3a2414'); cafe.position.y = 3.55; g.add(cafe);
      const alca = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.26, 10, 20, Math.PI * 1.5), M(col || '#d05a4a', 0.4)); alca.position.set(1.95, 2.1, 0); alca.rotation.z = -0.5; alca.castShadow = true; g.add(alca);
      break;
    }
    case 'napkinfold': { const n1 = box(3.4, 0.1, 3.4, '#f6f2ea'); n1.position.y = 0.05; g.add(n1); const n2 = box(2.4, 0.1, 2.4, '#efe9dd'); n2.position.y = 0.15; n2.rotation.y = 0.4; g.add(n2); break; }
    case 'apple': {
      const a = new THREE.Mesh(new THREE.SphereGeometry(1.7, 18, 14), M(col || '#c8382e', 0.35)); a.position.y = 1.55; a.scale.y = 0.92; a.castShadow = true; g.add(a);
      const st = cyl(0.09, 0.12, 0.9, '#5a3a1a'); st.position.y = 3.3; st.rotation.z = 0.25; g.add(st);
      const lf = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), M('#4f7d30')); lf.scale.set(1, 0.25, 0.5); lf.position.set(0.45, 3.35, 0); g.add(lf);
      break;
    }
    case 'cuttingboard': { const b = box(7, 0.5, 4.4, '#b98a52'); b.position.y = 0.25; b.castShadow = true; g.add(b); const h = cyl(0.55, 0.55, 0.5, '#b98a52'); h.position.set(4.1, 0.25, 0); g.add(h); const hole = cyl(0.28, 0.28, 0.54, '#6f5334'); hole.position.set(4.1, 0.26, 0); g.add(hole); break; }
    case 'bucketzinc': {   // balde de zinco com alça caída
      const bd = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.5, 3.2, 20, 1, true), new THREE.MeshStandardMaterial({ color: '#aab4bc', roughness: 0.35, metalness: 0.55, side: THREE.DoubleSide })); bd.position.y = 1.6; bd.castShadow = true; g.add(bd);
      const bot = cyl(1.5, 1.5, 0.14, '#98a2aa'); bot.position.y = 0.07; g.add(bot);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.09, 8, 24), M('#8e989e', 0.3)); rim.rotation.x = 1.57; rim.position.y = 3.2; g.add(rim);
      const al = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.08, 8, 24, Math.PI), M('#78828a', 0.3)); al.position.y = 3.2; al.rotation.x = 0.5; g.add(al);
      break;
    }
    case 'bone': { for (const dx of [-1.5, 1.5]) for (const dz of [-0.4, 0.4]) { const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), M('#e8e0d0', 0.6)); s2.position.set(dx, 0.5, dz); s2.castShadow = true; g.add(s2); } const mid = cyl(0.4, 0.4, 3.0, '#e8e0d0'); mid.rotation.z = 1.57; mid.position.y = 0.5; mid.castShadow = true; g.add(mid); break; }
    case 'fencebit': {     // pedacinho de cerca de madeira
      for (const dx of [-2.4, 0, 2.4]) { const post = box(0.5, 3.4, 0.5, '#7a5a34'); post.position.set(dx, 1.7, 0); post.castShadow = true; g.add(post); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.6, 4), M('#6b4e2e')); tip.position.set(dx, 3.7, 0); tip.rotation.y = 0.78; g.add(tip); }
      for (const y of [1.1, 2.3]) { const rail = box(6.4, 0.4, 0.24, '#8a6a3e'); rail.position.y = y; rail.castShadow = true; g.add(rail); }
      break;
    }
    case 'beachumbrella': {   // guarda-sol listrado inclinado
      const pole = cyl(0.14, 0.14, 8.5, '#e8e4dc'); pole.position.y = 4.0; pole.rotation.z = 0.22; pole.castShadow = true; g.add(pole);
      const top = new THREE.Group();
      for (let i = 0; i < 10; i++) { const seg = new THREE.Mesh(new THREE.ConeGeometry(4.6, 1.9, 10, 1, true, i / 10 * 6.283, 0.629), M(i % 2 ? '#e5484d' : '#f6f0e2', 0.7)); (seg.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide; seg.castShadow = true; top.add(seg); }
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.7, 8), M('#c9a35f')); tip.position.y = 1.25; top.add(tip);
      top.position.set(1.85, 7.6, 0); top.rotation.z = 0.22; g.add(top);
      break;
    }
    case 'beachball': {
      const b = new THREE.Mesh(new THREE.SphereGeometry(1.75, 20, 16), M('#f6f0e2', 0.45)); b.position.y = 1.75; b.castShadow = true; g.add(b);
      const cols2 = ['#e5484d', '#3b82f6', '#f2b100'];
      for (let i = 0; i < 3; i++) { const gore = new THREE.Mesh(new THREE.SphereGeometry(1.76, 20, 16, i * 2.09, 0.9), M(cols2[i], 0.45)); gore.position.y = 1.75; g.add(gore); }
      break;
    }
    case 'flipflop': {
      const sole = new THREE.Mesh(new THREE.CapsuleGeometry(1.05, 2.3, 6, 12), M(col || '#3fae6a', 0.7)); sole.scale.y = 0.16; sole.rotation.x = 1.57; sole.position.y = 0.22; sole.castShadow = true; g.add(sole);
      for (const sgn of [-1, 1]) { const strap = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.13, 8, 14, 2.4), M('#f6f0e2', 0.6)); strap.position.set(sgn * 0.35, 0.3, -0.65); strap.rotation.set(0, sgn * -0.5, sgn * -1.2); g.add(strap); }
      break;
    }
    case 'sunscreen': { const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.85, 1.8, 6, 14), M('#f2b100', 0.4)); b.scale.z = 0.55; b.position.y = 1.75; b.castShadow = true; g.add(b); const cp = cyl(0.5, 0.55, 0.7, '#f6f0e2'); cp.position.y = 3.15; g.add(cp); const lb = box(1.35, 1.1, 1.0, '#f6f0e2'); lb.position.y = 1.7; g.add(lb); break; }
    case 'toycar': {       // carrinho de brinquedo
      const bd = box(1.9, 0.85, 3.6, col || '#3b82f6'); bd.position.y = 0.95; bd.castShadow = true; g.add(bd);
      const cab = box(1.7, 0.8, 1.8, '#cfe4ee'); cab.position.set(0, 1.7, -0.2); cab.castShadow = true; g.add(cab);
      for (const dz of [-1.2, 1.2]) for (const dx of [-1.0, 1.0]) { const wh = cyl(0.55, 0.55, 0.35, '#22262a'); wh.rotation.z = 1.57; wh.position.set(dx, 0.55, dz); g.add(wh); const hub = cyl(0.22, 0.22, 0.38, '#c8ced4'); hub.rotation.z = 1.57; hub.position.set(dx, 0.55, dz); g.add(hub); }
      break;
    }
    case 'chalkset': { const cols3 = ['#ff8fb0', '#8fd0ff', '#ffe38f', '#a0ffb0']; cols3.forEach((cc, i) => { const ck = cyl(0.28, 0.28, 2.2, cc); ck.rotation.z = 1.57; ck.rotation.y = (Math.random() - 0.5) * 1.2; ck.position.set((i - 1.5) * 0.75, 0.28, (Math.random() - 0.5) * 1.2); ck.castShadow = true; g.add(ck); }); break; }
    case 'paintcan': {
      const bd = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 3.4, 20), new THREE.MeshStandardMaterial({ color: '#c8ced4', roughness: 0.3, metalness: 0.5 })); bd.position.y = 1.7; bd.castShadow = true; g.add(bd);
      const label = cyl(1.58, 1.58, 1.7, col || '#3b82f6'); label.position.y = 1.7; g.add(label);
      const tinta = cyl(1.4, 1.4, 0.1, col || '#3b82f6'); tinta.position.y = 3.46; g.add(tinta);
      const drip = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), M(col || '#3b82f6', 0.3)); drip.scale.set(1, 0.25, 1.6); drip.position.set(1.5, 3.35, 0.4); g.add(drip);
      break;
    }
    case 'wrench': {       // chave de boca
      const bar = box(3.2, 0.3, 0.75, '#b8c2ca'); bar.position.y = 0.16; bar.castShadow = true; g.add(bar);
      for (const sgn of [-1, 1]) { const head = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.3, 8, 18, 4.4), new THREE.MeshStandardMaterial({ color: '#b8c2ca', roughness: 0.3, metalness: 0.6 })); head.rotation.x = 1.57; head.rotation.z = sgn > 0 ? 0.8 : 0.8 + 3.14; head.position.set(sgn * 2.0, 0.16, 0); head.castShadow = true; g.add(head); }
      break;
    }
    case 'tirestack': { for (let i = 0; i < 2; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.8, 12, 24), M('#26282c', 0.85)); t.rotation.x = 1.57; t.position.y = 0.8 + i * 1.5; t.castShadow = true; g.add(t); } break; }
    case 'oldtire': { const t = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.8, 12, 24), M('#26282c', 0.85)); t.rotation.x = 1.57; t.position.y = 0.8; t.castShadow = true; g.add(t); break; }
    case 'toyshovel': { const stick = cyl(0.16, 0.16, 3.6, col || '#e5484d'); stick.rotation.z = 1.35; stick.position.y = 0.5; g.add(stick); const scoop = box(1.5, 0.16, 1.9, col || '#e5484d'); scoop.position.set(2.1, 0.2, 0); scoop.rotation.z = -0.12; scoop.castShadow = true; g.add(scoop); const grip = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.14, 8, 14), M(col || '#e5484d', 0.5)); grip.position.set(-1.95, 1.15, 0); grip.rotation.y = 1.57; g.add(grip); break; }
    case 'wateringcan': {  // regador com bico e crivo
      const bd = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.9, 3.2, 20), M(col || '#3fae6a', 0.45)); bd.position.y = 1.6; bd.castShadow = true; g.add(bd);
      const spout = cyl(0.22, 0.34, 3.4, col || '#3fae6a'); spout.rotation.z = 0.9; spout.position.set(2.35, 2.35, 0); spout.castShadow = true; g.add(spout);
      const crivo = cyl(0.62, 0.62, 0.3, '#2e8a50'); crivo.rotation.z = 0.9; crivo.position.set(3.65, 3.35, 0); g.add(crivo);
      const alca = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.16, 8, 20, Math.PI), M(col || '#3fae6a', 0.45)); alca.position.set(-1.2, 3.0, 0); alca.rotation.z = 0.5; g.add(alca);
      break;
    }
    case 'flowerpot': {    // vaso de barro com flor
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.05, 2.4, 18), M('#b06a40', 0.7)); pot.position.y = 1.2; pot.castShadow = true; g.add(pot);
      const rim = cyl(1.65, 1.65, 0.5, '#a05a34'); rim.position.y = 2.45; g.add(rim);
      const terra = cyl(1.35, 1.35, 0.12, '#4a3418'); terra.position.y = 2.72; g.add(terra);
      const stem = cyl(0.09, 0.11, 2.6, '#4f7d30'); stem.position.y = 4.0; g.add(stem);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; const pet = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), M(col || '#f2b100', 0.5)); pet.scale.set(1, 0.35, 0.6); pet.position.set(Math.cos(a) * 0.62, 5.35, Math.sin(a) * 0.62); pet.rotation.y = -a; g.add(pet); }
      const miolo = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 8), M('#a4581e')); miolo.position.y = 5.4; g.add(miolo);
      const lf2 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 6), M('#4f7d30')); lf2.scale.set(1, 0.22, 0.5); lf2.position.set(0.5, 3.6, 0.2); g.add(lf2);
      break;
    }
    case 'mushroom': { const st2 = cyl(0.42, 0.55, 1.1, '#efe9dd'); st2.position.y = 0.55; g.add(st2); const cap3 = new THREE.Mesh(new THREE.SphereGeometry(1.0, 14, 10, 0, 6.3, 0, 1.35), M(col || '#d05a4a', 0.55)); cap3.position.y = 0.95; cap3.castShadow = true; g.add(cap3); for (let i = 0; i < 5; i++) { const a = i * 1.9; const dot = cyl(0.14, 0.14, 0.06, '#f6f0e2'); dot.position.set(Math.cos(a) * 0.55, 1.45 + Math.sin(i) * 0.1, Math.sin(a) * 0.55); dot.rotation.set(Math.cos(a) * 0.5, 0, Math.sin(a) * -0.5); g.add(dot); } break; }
    case 'cactus': {       // cacto de duas orelhas com florzinha
      const main = new THREE.Mesh(new THREE.CapsuleGeometry(0.95, 3.4, 6, 14), M('#3e7d3e', 0.7)); main.position.y = 2.6; main.castShadow = true; g.add(main);
      for (const sgn of [-1, 1]) { const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.4, 6, 12), M('#469046', 0.7)); arm.position.set(sgn * 1.35, 2.6 + (sgn > 0 ? 0.7 : 0.1), 0); arm.rotation.z = sgn * -0.5; arm.castShadow = true; g.add(arm); }
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), M('#ff8fb0', 0.5)); fl.position.y = 4.75; g.add(fl);
      for (let i = 0; i < 22; i++) { const a = Math.random() * 6.283, yy = 1 + Math.random() * 3.2; const sp = cyl(0.02, 0.05, 0.4, '#e8e0c0'); sp.position.set(Math.cos(a) * 0.98, yy, Math.sin(a) * 0.98); sp.rotation.set(Math.sin(a) * 1.57, 0, Math.cos(a) * -1.57); g.add(sp); }
      break;
    }
    case 'drybush': { for (let i = 0; i < 9; i++) { const tw = cyl(0.05, 0.09, 1.8 + Math.random(), '#9a7a4a'); tw.position.y = 0.8; tw.rotation.set((Math.random() - 0.5) * 1.6, Math.random() * 6.283, (Math.random() - 0.5) * 1.6); tw.castShadow = true; g.add(tw); } break; }
    case 'brickpile': { const bc = '#c05a3a'; const b1 = box(2.6, 1.1, 1.25, bc); b1.position.y = 0.55; b1.castShadow = true; g.add(b1); const b2 = box(2.6, 1.1, 1.25, '#b0522e'); b2.position.set(0.4, 1.65, 0.15); b2.rotation.y = 0.22; b2.castShadow = true; g.add(b2); const b3 = box(2.6, 1.1, 1.25, '#c86040'); b3.position.set(-1.4, 0.55, 1.6); b3.rotation.y = -0.5; b3.castShadow = true; g.add(b3); break; }
    case 'helmet': { const h = new THREE.Mesh(new THREE.SphereGeometry(1.7, 18, 12, 0, 6.3, 0, 1.62), M('#f2b100', 0.4)); h.position.y = 0.25; h.castShadow = true; g.add(h); const brim = cyl(2.1, 2.2, 0.18, '#e0a400'); brim.position.y = 0.3; g.add(brim); const crest = box(0.5, 0.3, 2.9, '#e0a400'); crest.position.y = 1.85; g.add(crest); break; }
    case 'watertank': {    // caixa d'água azul da laje
      const bd = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 2.9, 4.2, 24), M('#2e6fb0', 0.5)); bd.position.y = 2.1; bd.castShadow = true; g.add(bd);
      const lid = new THREE.Mesh(new THREE.SphereGeometry(3.35, 24, 10, 0, 6.3, 0, 0.9), M('#3b82c8', 0.5)); lid.position.y = 3.15; lid.scale.y = 0.75; lid.castShadow = true; g.add(lid);
      const stripe = cyl(3.36, 3.36, 0.5, '#245a94'); stripe.position.y = 2.0; g.add(stripe);
      break;
    }
    case 'clothesline': {  // varal com roupinhas quicando no vento
      for (const dx of [-4.4, 4.4]) { const pole = cyl(0.14, 0.16, 5.2, '#8a8f94'); pole.position.set(dx, 2.6, 0); pole.castShadow = true; g.add(pole); }
      const line = cyl(0.035, 0.035, 8.8, '#e8e4dc'); line.rotation.z = 1.57; line.position.y = 4.9; g.add(line);
      const cs = ['#e5484d', '#3b82f6', '#3fae6a', '#f2b100'];
      for (let i = 0; i < 4; i++) { const cl = box(1.25, 1.7, 0.09, cs[i]); cl.position.set(-3.1 + i * 2.05, 4.05, 0); cl.rotation.x = 0.12; cl.castShadow = true; g.add(cl); }
      break;
    }
    case 'floatring': { const t = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.85, 14, 28), M('#ff7ea8', 0.45)); t.rotation.x = 1.57; t.position.y = 0.85; t.castShadow = true; g.add(t); for (let i = 0; i < 4; i++) { const seg = new THREE.Mesh(new THREE.TorusGeometry(2.11, 0.86, 14, 28, 0.7), M('#f6f0e2', 0.45)); seg.rotation.x = 1.57; seg.rotation.z = i * 1.57 + 0.4; seg.position.y = 0.85; g.add(seg); } break; }
    case 'fruitcrate': {   // caixote de feira com laranjas
      const bc2 = '#b98a52';
      for (const [w2, h2, d2, x2, y2, z2] of [[4.4, 0.3, 3.0, 0, 0.15, 0], [4.4, 1.4, 0.25, 0, 0.85, 1.4], [4.4, 1.4, 0.25, 0, 0.85, -1.4], [0.25, 1.4, 3.0, 2.1, 0.85, 0], [0.25, 1.4, 3.0, -2.1, 0.85, 0]] as number[][]) { const pl = box(w2, h2, d2, bc2); pl.position.set(x2, y2, z2); pl.castShadow = true; g.add(pl); }
      for (let i = 0; i < 7; i++) { const or = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 10), M('#f28a1e', 0.5)); or.position.set((Math.random() - 0.5) * 2.8, 0.85 + (i > 4 ? 0.8 : 0), (Math.random() - 0.5) * 1.7); or.castShadow = true; g.add(or); }
      break;
    }
    case 'roadsign': { const pole = cyl(0.13, 0.15, 5.6, '#8a8f94'); pole.position.y = 2.8; pole.castShadow = true; g.add(pole); const sign = box(2.6, 2.6, 0.16, '#f2b100'); sign.position.y = 5.1; sign.rotation.z = 0.785; sign.castShadow = true; g.add(sign); const dot = box(0.8, 0.8, 0.06, '#22262a'); dot.position.set(0, 5.1, 0.1); dot.rotation.z = 0.785; g.add(dot); break; }
    case 'cuestick': { const stick = cyl(0.13, 0.3, 11, '#b98a52'); stick.rotation.z = 1.545; stick.position.y = 0.32; stick.castShadow = true; g.add(stick); const tip = cyl(0.13, 0.13, 0.25, '#3b82f6'); tip.rotation.z = 1.545; tip.position.set(-5.55, 0.4, 0); g.add(tip); const base = cyl(0.31, 0.31, 0.3, '#26282c'); base.rotation.z = 1.545; base.position.set(5.6, 0.24, 0); g.add(base); break; }
    case 'poolballs': { const cs2 = [['#f2b100', 1], ['#e5484d', 3], ['#3b82f6', 2]] as [string, number][]; cs2.forEach(([cc], i) => { const a = i * 2.09; const b = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 12), M(cc, 0.25)); b.position.set(Math.cos(a) * 0.75, 0.62, Math.sin(a) * 0.75); b.castShadow = true; g.add(b); const w3 = cyl(0.24, 0.24, 0.05, '#f6f0e2'); w3.position.set(Math.cos(a) * 0.75, 1.22, Math.sin(a) * 0.75); g.add(w3); }); break; }
    case 'bluechalk': { const c2 = box(1.05, 0.8, 1.05, '#3b82f6'); c2.position.y = 0.4; c2.castShadow = true; g.add(c2); const dip = cyl(0.4, 0.4, 0.12, '#2a62b8'); dip.position.y = 0.82; g.add(dip); break; }
    case 'sodacup': {      // copo de refrigerante com tampa e canudo
      const glass2 = new THREE.MeshPhysicalMaterial({ color: '#e8f0f4', roughness: 0.1, transmission: 0.5, thickness: 0.5 } as any);
      const bd = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 0.95, 3.6, 18), glass2); bd.position.y = 1.8; bd.castShadow = true; g.add(bd);
      const soda = cyl(1.05, 0.9, 2.7, '#7a3c14'); soda.position.y = 1.5; g.add(soda);
      const lid = cyl(1.35, 1.3, 0.35, '#e5484d'); lid.position.y = 3.75; g.add(lid);
      const straw = cyl(0.12, 0.12, 3.2, '#f6f0e2'); straw.rotation.z = 0.3; straw.position.set(-0.45, 5.0, 0); g.add(straw);
      break;
    }
    case 'popsicle': { const stick = cyl(0.18, 0.18, 1.6, '#d8b888'); stick.rotation.x = 1.57; stick.position.set(0, 0.2, 2.2); g.add(stick); const body = new THREE.Mesh(new THREE.CapsuleGeometry(1.0, 2.6, 6, 14), M(col || '#ff7ea8', 0.35)); body.scale.z = 0.45; body.rotation.x = 1.57; body.position.y = 0.5; body.castShadow = true; g.add(body); const bite = new THREE.Mesh(new THREE.SphereGeometry(0.65, 10, 8), M('#a8c8d4', 0.4)); bite.position.set(0.7, 0.75, -1.7); g.add(bite); break; }
    case 'icecreamtub': { const bd = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 1.7, 2.3, 20), M('#efe6d4', 0.5)); bd.position.y = 1.15; bd.castShadow = true; g.add(bd); const band = cyl(2.02, 2.02, 0.8, col || '#c86a94'); band.position.y = 1.3; g.add(band); const lidr = cyl(2.1, 2.1, 0.3, '#e0d6c4'); lidr.position.y = 2.45; g.add(lidr); const scoop = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 10), M(col || '#c86a94', 0.5)); scoop.position.set(0.4, 2.85, -0.2); scoop.castShadow = true; g.add(scoop); break; }
    case 'icetray': { const tray = box(3.4, 0.55, 2.3, '#8fc2e8'); tray.position.y = 0.28; tray.castShadow = true; g.add(tray); for (let ix = 0; ix < 4; ix++) for (let iz = 0; iz < 3; iz++) { const cube = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.3, 0.55), new THREE.MeshStandardMaterial({ color: '#dff2fc', roughness: 0.15, transparent: true, opacity: 0.85 })); cube.position.set(-1.2 + ix * 0.8, 0.6, -0.72 + iz * 0.72); g.add(cube); } break; }
    case 'hammer': { const handle = cyl(0.22, 0.26, 4.4, '#b98a52'); handle.rotation.z = 1.57; handle.position.y = 0.26; handle.castShadow = true; g.add(handle); const head = box(1.1, 0.85, 0.85, '#78828a'); head.position.set(2.1, 0.45, 0); head.castShadow = true; g.add(head); const claw = box(0.85, 0.5, 0.5, '#8a949c'); claw.position.set(2.1, 0.45, 0.65); claw.rotation.x = 0.4; g.add(claw); break; }
    case 'screwdriver': { const handle = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.4, 6, 12), M(col || '#e5484d', 0.35)); handle.rotation.z = 1.57; handle.position.set(-1.2, 0.42, 0); handle.castShadow = true; g.add(handle); const shaft = cyl(0.11, 0.11, 2.6, '#c8ced4'); shaft.rotation.z = 1.57; shaft.position.set(1.0, 0.42, 0); g.add(shaft); break; }
    case 'pillow': { const p2 = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.4, 4.4, 4, 2, 4), M(col || '#3b82f6', 0.75)); const pos = p2.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i); const f = 1 - (Math.abs(x) / 2.2) * (Math.abs(z) / 2.2) * 0.55; pos.setY(i, y * f); } p2.geometry.computeVertexNormals(); p2.position.y = 0.7; p2.rotation.y = 0.3; p2.castShadow = true; g.add(p2); const btn = cyl(0.2, 0.2, 0.14, '#2a62b8'); btn.position.y = 1.42; g.add(btn); break; }
    case 'bookpile': { const cs3 = ['#c05a5a', '#3fae6a', '#3b82f6']; cs3.forEach((cc, i) => { const bk = box(3.2 - i * 0.3, 0.55, 4.3 - i * 0.4, cc); bk.position.y = 0.28 + i * 0.56; bk.rotation.y = (i - 1) * 0.25; bk.castShadow = true; g.add(bk); const pages = box(2.9 - i * 0.3, 0.4, 4.0 - i * 0.4, '#f2ede2'); pages.position.y = 0.28 + i * 0.56; pages.rotation.y = (i - 1) * 0.25; g.add(pages); }); break; }
    case 'sock': { const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.8, 6, 12), M(col || '#e5484d', 0.85)); leg.rotation.z = 1.2; leg.position.set(-0.6, 0.55, 0); leg.castShadow = true; g.add(leg); const foot = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.2, 6, 12), M(col || '#e5484d', 0.85)); foot.rotation.set(0, 0, 0.15); foot.rotation.y = 0.9; foot.position.set(1.0, 0.55, 0.4); foot.castShadow = true; g.add(foot); const stripe2 = cyl(0.57, 0.57, 0.35, '#f6f0e2'); stripe2.rotation.z = 1.2; stripe2.position.set(-1.35, 0.85, 0); g.add(stripe2); break; }
  }
  g.traverse(o => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

export function buildBoard(def: TrackDef): BoardBuild {
  const group = new THREE.Group();
  const pulses: BoardBuild['pulses'] = [];
  const spinners: THREE.Object3D[] = [];
  const dynamics: { update: (dt: number) => void }[] = [];
  const billboards: THREE.Object3D[] = [];

  // base / mesa
  const base = new THREE.Mesh(new THREE.BoxGeometry(def.w + 5, 1.4, def.h + 5), new THREE.MeshStandardMaterial({ color: def.bg, roughness: 0.95 }));
  base.position.set(def.w / 2, -0.72, def.h / 2); base.receiveShadow = true; group.add(base);

  // chão texturizado
  const tex = makeBoardTexture(def); tex.flipY = false;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(def.w, def.h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.98 }));
  ground.rotation.x = -Math.PI / 2; ground.position.set(def.w / 2, 0, def.h / 2); ground.receiveShadow = true; group.add(ground);

  // bordas
  const wcol = def.wallCol || '#6b4e2e';
  const wallMat = new THREE.MeshStandardMaterial({ color: wcol, roughness: 0.85 });
  for (const w of def.walls) {
    const dx = w.b.x - w.a.x, dy = w.b.y - w.a.y; const len = Math.hypot(dx, dy); if (len < 0.05) continue;
    const m = new THREE.Mesh(new THREE.BoxGeometry(len + 0.5, 0.9, 0.6), wallMat);
    m.position.set((w.a.x + w.b.x) / 2, 0.42, (w.a.y + w.b.y) / 2);
    m.rotation.y = -Math.atan2(dy, dx); m.castShadow = true; m.receiveShadow = true; group.add(m);
  }

  // obstáculos
  const woodMat = new THREE.MeshStandardMaterial({ color: '#8a5a2e', roughness: 0.82 });
  for (const o of def.obstacles) {
    if (o.type === 'stone') {
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(o.r, 0), new THREE.MeshStandardMaterial({ color: '#9a948a', roughness: 0.9, flatShading: true }));
      m.position.set(o.x, o.r * 0.55, o.y); m.scale.y = 0.8; m.rotation.set(Math.random(), Math.random(), Math.random()); m.castShadow = true; m.receiveShadow = true; group.add(m);
    } else if (o.type === 'hole') {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(o.r, 28), new THREE.MeshBasicMaterial({ color: 0x120c06 }));
      disc.rotation.x = -Math.PI / 2; disc.position.set(o.x, 0.015, o.y); group.add(disc);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(o.r, 0.15, 8, 28), new THREE.MeshStandardMaterial({ color: '#3a2c1a', roughness: 1 }));
      rim.rotation.x = -Math.PI / 2; rim.position.set(o.x, 0.03, o.y); rim.castShadow = true; group.add(rim);
    } else if (o.type === 'jump') {
      // RAMPA DE SALTO: cunha de madeira inclinada no sentido da pista + setas
      const jg = new THREE.Group();
      const wedge = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.34, 3.4), woodMat);
      wedge.rotation.x = -0.52; wedge.position.set(0, 0.55, 0.2); wedge.castShadow = true; wedge.receiveShadow = true; jg.add(wedge);
      const lip = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.5, 0.32), new THREE.MeshStandardMaterial({ color: '#c9902e', roughness: 0.7 }));
      lip.position.set(0, 1.0, 1.5); jg.add(lip);
      const arw = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.0), new THREE.MeshBasicMaterial({ map: markerTex('jumparrow'), transparent: true, depthWrite: false }));
      // seta apontando pro SENTIDO do salto (pra frente da rampa), não ao contrário
      arw.rotation.x = -Math.PI / 2 - 0.52; arw.rotation.z = Math.PI; arw.position.set(0, 0.8, 0.4); jg.add(arw);
      jg.position.set(o.x, 0, o.y); jg.rotation.y = Math.PI / 2 - (o.dir ?? 0);
      group.add(jg);
    } else if (o.type === 'top') {
      // PIÃO: corpo cônico listrado girando rápido + coroa e cabinho
      const tg = new THREE.Group();
      const body = new THREE.Mesh(new THREE.ConeGeometry(o.r, 1.15, 16), new THREE.MeshStandardMaterial({ color: '#d84a8a', roughness: 0.35 }));
      body.rotation.x = Math.PI; body.position.y = 0.62; body.castShadow = true; tg.add(body);
      const stripe = new THREE.Mesh(new THREE.CylinderGeometry(o.r * 0.82, o.r * 0.62, 0.3, 16), new THREE.MeshStandardMaterial({ color: '#ffd24a', roughness: 0.35 }));
      stripe.position.y = 0.92; tg.add(stripe);
      const crown = new THREE.Mesh(new THREE.SphereGeometry(o.r * 0.55, 12, 8, 0, 6.3, 0, 1.6), new THREE.MeshStandardMaterial({ color: '#4a90d8', roughness: 0.3 }));
      crown.position.y = 1.2; tg.add(crown);
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 8), new THREE.MeshStandardMaterial({ color: '#e8e4dc' }));
      pin.position.y = 1.6; tg.add(pin);
      tg.position.set(o.x, 0, o.y); group.add(tg);
      dynamics.push({ update: dt => { tg.rotation.y += dt * 9; tg.rotation.z = Math.sin(tg.rotation.y * 0.7) * 0.06; } });   // gira ligeiro e bamboleia
      const ring = new THREE.Mesh(new THREE.CircleGeometry(o.r * 1.5, 24), new THREE.MeshBasicMaterial({ color: '#ff7ab0', transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2; ring.position.set(o.x, 0.025, o.y); group.add(ring); pulses.push({ mesh: ring, kind: 'top', base: o.r * 1.5 });
    } else if (o.type === 'bug') {
      // JOANINHA: meia-esfera vermelha com pintas, cabecinha e anteninhas — ANDA por turno
      const bgp = new THREE.Group();
      const shell = new THREE.Mesh(new THREE.SphereGeometry(o.r, 16, 12, 0, 6.3, 0, 1.62), new THREE.MeshStandardMaterial({ color: '#d8362e', roughness: 0.35 }));
      shell.castShadow = true; bgp.add(shell);
      const linha = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, o.r * 1.9), new THREE.MeshStandardMaterial({ color: '#221408' }));
      linha.position.y = o.r * 0.62; bgp.add(linha);
      for (const [px2, pz] of [[-0.4, -0.3], [0.4, -0.25], [-0.32, 0.3], [0.38, 0.32]]) {
        const dot = new THREE.Mesh(new THREE.CircleGeometry(0.14, 8), new THREE.MeshBasicMaterial({ color: '#221408' }));
        dot.position.set(px2 * o.r, o.r * 0.86, pz * o.r); dot.rotation.x = -Math.PI / 2; bgp.add(dot);
      }
      const head = new THREE.Mesh(new THREE.SphereGeometry(o.r * 0.45, 12, 8), new THREE.MeshStandardMaterial({ color: '#221408', roughness: 0.4 }));
      head.position.set(0, o.r * 0.3, o.r * 0.85); bgp.add(head);
      for (const sgn of [-1, 1]) { const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6), new THREE.MeshStandardMaterial({ color: '#221408' })); ant.position.set(sgn * 0.18, o.r * 0.75, o.r * 1.1); ant.rotation.x = 0.6; ant.rotation.z = sgn * -0.35; bgp.add(ant); }
      group.add(bgp);
      dynamics.push({ update: dt => {                      // desliza suave até a posição do turno
        const bp2 = bugPos(o);
        bgp.position.x += (bp2.x - bgp.position.x) * Math.min(1, dt * 3.2);
        bgp.position.z += (bp2.y - bgp.position.z) * Math.min(1, dt * 3.2);
        const mdx = bp2.x - bgp.position.x, mdz = bp2.y - bgp.position.z;
        if (Math.hypot(mdx, mdz) > 0.05) bgp.rotation.y = Math.atan2(mdx, mdz);
        bgp.position.y = Math.abs(Math.sin(performance.now() * 0.008)) * 0.05;   // patinhas trotando
      } });
      const bp0 = bugPos(o); bgp.position.set(bp0.x, 0, bp0.y);
    } else if (o.type === 'band') {
      // ELÁSTICO: dois palitos de madeira + liguinha vermelha esticada
      const [sg] = segsOf(o);
      for (const end of [sg.a, sg.b]) {
        const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.5, 10), woodMat);
        peg.position.set(end.x, 0.75, end.y); peg.castShadow = true; group.add(peg);
        const tip = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshStandardMaterial({ color: '#e5484d', roughness: 0.5 }));
        tip.position.set(end.x, 1.55, end.y); group.add(tip);
      }
      const dx = sg.b.x - sg.a.x, dy = sg.b.y - sg.a.y; const L = Math.hypot(dx, dy);
      const elast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, L, 8), new THREE.MeshStandardMaterial({ color: '#e5484d', roughness: 0.45 }));
      elast.position.set((sg.a.x + sg.b.x) / 2, 0.62, (sg.a.y + sg.b.y) / 2);
      elast.rotation.z = Math.PI / 2; elast.rotation.y = -Math.atan2(dy, dx);
      elast.castShadow = true; group.add(elast);
      dynamics.push({ update: () => { const w2 = 1 + Math.sin(performance.now() * 0.004) * 0.03; elast.scale.set(w2, 1, w2); } });   // tremidinha elástica
    } else if (o.type === 'mill') {
      // CATAVENTO: pino central + pás coloridas — gira um TANTO a cada peteleco
      const mg = new THREE.Group();
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.4, 10), woodMat);
      pin.position.y = 0.7; pin.castShadow = true; mg.add(pin);
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), new THREE.MeshStandardMaterial({ color: '#ffd24a', roughness: 0.4 }));
      hub.position.y = 1.0; mg.add(hub);
      const arms = new THREE.Group(); arms.position.y = 0.62;
      const nSeg = o.n === 4 ? 2 : 1;
      const cols = ['#4a90d8', '#3fae6a'];
      for (let k = 0; k < nSeg; k++) {
        const pa = new THREE.Mesh(new THREE.BoxGeometry(o.r * 2, 0.85, 0.18), new THREE.MeshStandardMaterial({ color: cols[k % 2], roughness: 0.55 }));
        pa.rotation.y = k * Math.PI / 2; pa.castShadow = true; arms.add(pa);
        for (const sgn of [-1, 1]) { const tip2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.22), new THREE.MeshStandardMaterial({ color: '#e5484d', roughness: 0.5 })); tip2.position.set(sgn * (o.r - 0.2), 0, 0); tip2.rotation.y = k * Math.PI / 2; if (k === 1) tip2.position.set(0, 0, sgn * (o.r - 0.2)); arms.add(tip2); }
      }
      mg.add(arms);
      mg.position.set(o.x, 0, o.y); group.add(mg);
      dynamics.push({ update: dt => {                        // gira SUAVE até o ângulo do turno
        const alvo = -(o.dir || 0);
        let d2 = alvo - arms.rotation.y;
        while (d2 > Math.PI) d2 -= Math.PI * 2; while (d2 < -Math.PI) d2 += Math.PI * 2;
        arms.rotation.y += d2 * Math.min(1, dt * 4);
      } });
      arms.rotation.y = -(o.dir || 0);
    } else if (o.type === 'balloon') {
      // BEXIGA D'ÁGUA: gordinha, brilhosa, com nozinho — some quando estoura
      const blg = new THREE.Group();
      const bal = new THREE.Mesh(new THREE.SphereGeometry(o.r, 18, 14), new THREE.MeshPhysicalMaterial({ color: '#3f9ae0', roughness: 0.15, clearcoat: 0.8, transparent: true, opacity: 0.92 } as any));
      bal.scale.y = 1.12; bal.position.y = o.r * 1.05; bal.castShadow = true; blg.add(bal);
      const shine = new THREE.Mesh(new THREE.SphereGeometry(o.r * 0.26, 8, 6), new THREE.MeshBasicMaterial({ color: '#dff2ff' }));
      shine.position.set(-o.r * 0.4, o.r * 1.5, o.r * 0.3); blg.add(shine);
      const knot = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 8), new THREE.MeshStandardMaterial({ color: '#2a72b0' }));
      knot.position.y = 0.12; knot.rotation.x = Math.PI; blg.add(knot);
      blg.position.set(o.x, 0, o.y); group.add(blg);
      dynamics.push({ update: dt => {
        blg.visible = !o.popped;
        if (!o.popped) { const sq = 1 + Math.sin(performance.now() * 0.005) * 0.035; bal.scale.set(sq, 1.12 / sq, sq); }   // balança gordinha
      } });
    } else if (o.type === 'bomb') {
      const bg = new THREE.Group();
      const ball = new THREE.Mesh(new THREE.SphereGeometry(o.r * 0.95, 18, 14), new THREE.MeshStandardMaterial({ color: '#191919', roughness: 0.35, metalness: 0.4 }));
      ball.position.y = o.r * 0.95; ball.castShadow = true; bg.add(ball);
      const cap2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.28, 10), new THREE.MeshStandardMaterial({ color: '#4a4a4a', metalness: 0.6, roughness: 0.4 }));
      cap2.position.y = o.r * 1.75; bg.add(cap2);
      const fuse = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 6), new THREE.MeshStandardMaterial({ color: '#6a4a2a' }));
      fuse.position.set(0.1, o.r * 2.05, 0); fuse.rotation.z = 0.4; bg.add(fuse);
      const spark = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffd24a' }));
      spark.position.set(0.24, o.r * 2.28, 0); bg.add(spark); spinners.push(spark);
      bg.position.set(o.x, 0, o.y); group.add(bg);
      const ring = new THREE.Mesh(new THREE.CircleGeometry(o.r * 1.6, 24), new THREE.MeshBasicMaterial({ color: '#e5484d', transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2; ring.position.set(o.x, 0.025, o.y); group.add(ring); pulses.push({ mesh: ring, kind: 'bomb', base: o.r * 1.6 });
    } else if (o.type === 'item') {   // CAOS: caixa "?" flutuante girando + brilho
      const boxg = new THREE.Group();
      const cube = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.25, 1.25), new THREE.MeshStandardMaterial({ map: markerTex('itembox'), roughness: 0.3, metalness: 0.2, emissive: '#8a5cff', emissiveIntensity: 0.25 }));
      cube.position.y = 1.35; cube.castShadow = true; boxg.add(cube); spinners.push(cube);
      boxg.position.set(o.x, 0, o.y); group.add(boxg);
      const glow = new THREE.Mesh(new THREE.CircleGeometry(o.r * 1.7, 24), new THREE.MeshBasicMaterial({ color: '#b98cff', transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.rotation.x = -Math.PI / 2; glow.position.set(o.x, 0.025, o.y); group.add(glow); pulses.push({ mesh: glow, kind: 'item', base: o.r * 1.7 });
    } else {   // bônus: gema girando embaixo + PLACA com o número virada pra câmera (sempre legível)
      const n = o.n || 1; const col = n >= 3 ? '#f2c200' : n === 2 ? '#2e9fa4' : '#2ea44f';
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(o.r * 0.5, 0), new THREE.MeshStandardMaterial({ color: col, roughness: 0.15, metalness: 0.55, emissive: col, emissiveIntensity: 0.35, flatShading: true }));
      gem.position.set(o.x, o.r * 0.75, o.y); gem.castShadow = true; group.add(gem); spinners.push(gem);
      const lbl = new THREE.Mesh(new THREE.CircleGeometry(o.r * 0.7, 20), new THREE.MeshBasicMaterial({ map: markerTex('bonus', n), transparent: true, depthWrite: false }));
      lbl.rotation.x = -Math.PI / 2; lbl.position.set(o.x, 0.04, o.y); group.add(lbl);
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), new THREE.MeshBasicMaterial({ map: markerTex('bonus', n), transparent: true, depthWrite: false }));
      plate.position.set(o.x, o.r * 2.3, o.y); group.add(plate); billboards.push(plate);
      const glow = new THREE.Mesh(new THREE.CircleGeometry(o.r * 1.6, 24), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.rotation.x = -Math.PI / 2; glow.position.set(o.x, 0.025, o.y); group.add(glow); pulses.push({ mesh: glow, kind: 'bonus', base: o.r * 1.6 });
    }
  }

  // CHECKPOINTS — portais luminosos (2 postes + faixa no chão + placa com número)
  def.checkpoints.forEach((cp, i) => {
    if (i === 0) return;
    let bi = 0, bd = 1e9; for (let k = 0; k < def.path.length; k++) { const dx = def.path[k].x - cp.x, dy = def.path[k].y - cp.y, d = dx * dx + dy * dy; if (d < bd) { bd = d; bi = k; } }
    const a = def.path[Math.max(0, bi - 1)], b = def.path[Math.min(def.path.length - 1, bi + 1)];
    let nx = -(b.y - a.y), ny = (b.x - a.x); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
    const tx = (b.x - a.x) / l, ty = (b.y - a.y) / l; const hw = def.half[bi]; const col = '#28c0e0';
    for (const sgn of [1, -1]) {
      const pxp = cp.x + nx * hw * sgn, pyp = cp.y + ny * hw * sgn;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 2.3, 10), new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.55, roughness: 0.4 }));
      post.position.set(pxp, 1.15, pyp); post.castShadow = true; group.add(post);
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), new THREE.MeshStandardMaterial({ color: '#eaffff', emissive: col, emissiveIntensity: 0.9 }));
      knob.position.set(pxp, 2.42, pyp); group.add(knob); spinners.push(knob);
    }
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(hw * 2, 0.9), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
    strip.rotation.x = -Math.PI / 2; strip.rotation.z = -Math.atan2(ty, tx); strip.position.set(cp.x, 0.03, cp.y); group.add(strip);
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), new THREE.MeshBasicMaterial({ map: markerTex('cp', i), transparent: true, depthWrite: false }));
    plate.position.set(cp.x, 3.0, cp.y); group.add(plate); billboards.push(plate);
  });

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

  return { group, pulses, spinners, billboards, dynamics };
}
