// ---------------------------------------------------------------------------
// BONEQUINHOS — peg dolls (bonequinhos de pino) procedurais, um por classe e
// facção. O rig expõe pivôs (corpo, cabeça, braços, chapéu, chavinha…) que o
// anim.ts usa pra dar vida: pulinho de marcha, balanço, golpe com wind-up,
// tombo na morte. Nada de assets: madeira pintada, lata e plástico no canvas.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { blobShadow, plastic, woodMat } from './board';

export type UnitKind = 'espada' | 'arco' | 'tanque' | 'veloz';
export type Faction = 'madeira' | 'pirata' | 'robo';

export interface ToyRig {
  group: THREE.Group;          // raiz nos pés; +x = frente (vira com rotation.y)
  body: THREE.Group;           // squash & stretch (scale)
  head: THREE.Group;
  armF: THREE.Group;           // braço da arma (pivô no ombro)
  armB: THREE.Group;
  key?: THREE.Group;           // chavinha de corda (robôs)
  blob: THREE.Mesh;
  hp: { root: THREE.Group; fill: THREE.Mesh };
  mats: THREE.MeshStandardMaterial[];   // p/ flash de dano
  h: number;                   // altura de referência
}

// rostinho pintado (olhos + bochechas + boca) — varia por classe
function faceTex(kind: UnitKind, foe: boolean): THREE.CanvasTexture {
  const cv = document.createElement('canvas'); cv.width = cv.height = 128;
  const c = cv.getContext('2d')!;
  c.clearRect(0, 0, 128, 128);
  c.fillStyle = '#2c2118';
  const ey = 56, ex = 22;
  if (kind === 'veloz') {       // óculos de aviador
    c.strokeStyle = '#2c2118'; c.lineWidth = 5;
    c.beginPath(); c.arc(64 - ex, ey, 13, 0, 7); c.stroke();
    c.beginPath(); c.arc(64 + ex, ey, 13, 0, 7); c.stroke();
    c.beginPath(); c.moveTo(64 - 9, ey); c.lineTo(64 + 9, ey); c.stroke();
    c.fillStyle = 'rgba(150,220,255,.7)';
    c.beginPath(); c.arc(64 - ex, ey, 10, 0, 7); c.fill();
    c.beginPath(); c.arc(64 + ex, ey, 10, 0, 7); c.fill();
  } else {
    c.beginPath(); c.arc(64 - ex, ey, kind === 'tanque' ? 7 : 6, 0, 7); c.fill();
    c.beginPath(); c.arc(64 + ex, ey, kind === 'tanque' ? 7 : 6, 0, 7); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(64 - ex + 2, ey - 2, 2, 0, 7); c.arc(64 + ex + 2, ey - 2, 2, 0, 7); c.fill();
  }
  if (kind === 'tanque') {       // bigodão + sobrancelha braba
    c.strokeStyle = '#2c2118'; c.lineWidth = 6;
    c.beginPath(); c.moveTo(64 - ex - 9, ey - 14); c.lineTo(64 - ex + 8, ey - 9); c.stroke();
    c.beginPath(); c.moveTo(64 + ex + 9, ey - 14); c.lineTo(64 + ex - 8, ey - 9); c.stroke();
    c.fillStyle = '#4a3categoria'.slice(0, 7) as string;
    c.fillStyle = '#4a3424';
    c.beginPath(); c.ellipse(64, 84, 22, 8, 0, 0, 7); c.fill();
    c.clearRect(56, 74, 16, 8);
  } else {
    c.strokeStyle = '#2c2118'; c.lineWidth = 4; c.lineCap = 'round';
    c.beginPath(); c.arc(64, 74, 10, 0.35, Math.PI - 0.35); c.stroke();
  }
  c.fillStyle = foe ? 'rgba(240,120,90,.5)' : 'rgba(240,140,150,.5)';     // bochechas
  c.beginPath(); c.arc(64 - 38, 74, 8, 0, 7); c.arc(64 + 38, 74, 8, 0, 7); c.fill();
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// perfil "peg doll": corpo torneado (lathe) com cabeça integrada
function pegGeo(r: number, h: number, headR: number): THREE.LatheGeometry {
  const pts: THREE.Vector2[] = [];
  const neckY = h * 0.58;
  pts.push(new THREE.Vector2(0.01, 0));
  pts.push(new THREE.Vector2(r * 0.94, 0));
  pts.push(new THREE.Vector2(r, h * 0.16));
  pts.push(new THREE.Vector2(r * 0.92, h * 0.4));
  pts.push(new THREE.Vector2(r * 0.72, neckY));
  // pescoço + cabeça redonda
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI / 2 + (i / 10) * Math.PI;
    pts.push(new THREE.Vector2(Math.cos(a) * headR + 0.001, neckY + headR * 0.86 + Math.sin(a) * headR));
  }
  return new THREE.LatheGeometry(pts, 26);
}

const PAL: Record<Faction, { mine: string; foe: string; trim: string; skin: string }> = {
  madeira: { mine: '#5a9ae8', foe: '#e8645a', trim: '#f5ecd8', skin: '#f2cf9a' },
  pirata: { mine: '#3f7dd0', foe: '#d04838', trim: '#2c2c34', skin: '#f2cf9a' },
  robo: { mine: '#7ab8d8', foe: '#e89058', trim: '#c8ccd4', skin: '#dfe4ea' },
};

export function buildToy(kind: UnitKind, faction: Faction, foe: boolean): ToyRig {
  const g = new THREE.Group();
  const P = PAL[faction];
  const teamCol = foe ? P.foe : P.mine;
  const mats: THREE.MeshStandardMaterial[] = [];
  const M = (col: string | number, rough = 0.42) => { const m = plastic(col, rough); mats.push(m); return m; };

  const big = kind === 'tanque', fast = kind === 'veloz';
  const scale = (big ? 1.45 : fast ? 0.82 : 1) * 1.24;   // gordinhos e visíveis
  const R = 10 * scale, H = 30 * scale, HEAD = 8.4 * scale;

  // plaquinha de soldadinho (base oval)
  const baseR = fast ? 10.5 : 14;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(baseR * scale, (baseR + 1) * scale, 3.4, 20), M(foe ? '#c86a58' : '#7aa8d8', .5));
  base.scale.z = 0.72; base.position.y = 1.7;
  g.add(base);

  // corpo peg doll
  const body = new THREE.Group(); body.position.y = 3.4; g.add(body);
  const skinMat = faction === 'robo' ? M(P.skin, .35) : new THREE.MeshStandardMaterial({ color: P.skin, roughness: .55 });
  if (faction !== 'robo') mats.push(skinMat as THREE.MeshStandardMaterial);

  let bodyMesh: THREE.Mesh;
  if (faction === 'robo') {
    bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(R * 1.7, H * 0.62, R * 1.5), M(teamCol, .3));
    bodyMesh.position.y = H * 0.31;
  } else {
    bodyMesh = new THREE.Mesh(pegGeo(R, H, HEAD), skinMat);
  }
  body.add(bodyMesh);

  // "roupinha" pintada: faixa no torso
  const shirt = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.02, R * 1.06, H * 0.34, 24, 1, true), M(teamCol, .38));
  shirt.position.y = H * 0.24;
  if (faction !== 'robo') body.add(shirt);
  const belt = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.04, R * 1.04, H * 0.07, 24, 1, true), M(P.trim, .4));
  belt.position.y = H * 0.44;
  if (faction !== 'robo') body.add(belt);

  // cabeça (grupo próprio pra animar) — no robô é uma cabecinha de lata separada
  const head = new THREE.Group();
  const headY = faction === 'robo' ? H * 0.62 + HEAD * 0.8 : H * 0.58 + HEAD * 0.86;
  head.position.y = headY;
  body.add(head);
  if (faction === 'robo') {
    const hm = new THREE.Mesh(new THREE.BoxGeometry(HEAD * 1.9, HEAD * 1.7, HEAD * 1.8), M(P.skin, .3));
    head.add(hm);
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 8, 6), M(P.trim, .35));
    ant.position.y = HEAD * 1.3; head.add(ant);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(2.4, 10, 8), M(foe ? '#ffb84a' : '#8af0a0', .25));
    bulb.position.y = HEAD * 1.3 + 5; head.add(bulb);
  }
  // rosto (decalque) — levemente virado pra CÂMERA, senão só se vê o perfil
  const facePivot = new THREE.Group();
  const bias = faction === 'robo' ? 0.34 : 0.6;        // caixa do robô engole ângulos grandes
  facePivot.rotation.y = foe ? bias : -bias;           // compensa o giro de 180° do inimigo
  const face = new THREE.Mesh(new THREE.PlaneGeometry(HEAD * 2.1, HEAD * 2.1),
    new THREE.MeshBasicMaterial({ map: faceTex(kind, foe), transparent: true, polygonOffset: true, polygonOffsetFactor: -4, depthWrite: false }));
  face.position.set(HEAD * (faction === 'robo' ? 1.24 : 1.02), faction === 'robo' ? 0 : 0.5, 0);
  face.rotation.y = Math.PI / 2;
  face.renderOrder = 3;
  facePivot.add(face);
  head.add(facePivot);

  // chapéus por classe/facção
  if (faction === 'madeira') {
    if (kind === 'espada') { const h2 = new THREE.Mesh(new THREE.SphereGeometry(HEAD * 1.06, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), M(teamCol, .35)); h2.position.y = HEAD * 0.34; head.add(h2); }
    if (kind === 'arco') { const h2 = new THREE.Mesh(new THREE.ConeGeometry(HEAD * 1.05, HEAD * 1.7, 16), M('#5c8a44', .45)); h2.position.y = HEAD * 0.9; h2.rotation.z = -0.14; head.add(h2); }
    if (kind === 'tanque') { const h2 = new THREE.Mesh(new THREE.CylinderGeometry(HEAD * 0.92, HEAD * 1.05, HEAD * 0.9, 16), M('#8a8478', .3));
      h2.position.y = HEAD * 0.62; head.add(h2);
      const rim2 = new THREE.Mesh(new THREE.TorusGeometry(HEAD * 1.02, HEAD * 0.16, 8, 18), M('#8a8478', .3));
      rim2.rotation.x = Math.PI / 2; rim2.position.y = HEAD * 0.3; head.add(rim2); }
    if (kind === 'veloz') { const h2 = new THREE.Mesh(new THREE.SphereGeometry(HEAD * 1.04, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), M('#8a5c30', .45)); h2.position.y = HEAD * 0.4; head.add(h2); }
  } else if (faction === 'pirata') {
    const bandana = new THREE.Mesh(new THREE.SphereGeometry(HEAD * 1.05, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), M(foe ? '#d04838' : '#3f7dd0', .45));
    bandana.position.y = HEAD * 0.4; head.add(bandana);
    if (kind === 'tanque') { const tri = new THREE.Mesh(new THREE.ConeGeometry(HEAD * 1.3, HEAD * 0.9, 4), M('#2c2c34', .4)); tri.position.y = HEAD * 0.8; tri.rotation.y = Math.PI / 4; head.add(tri); }
  } else {                      // robô: parafusinho no topo
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 3, 8), M('#8a8f98', .3));
    bolt.position.y = HEAD * 0.95; head.add(bolt);
  }

  // braços (pivô no ombro) com manguinha da cor do time — visíveis de perfil
  const shY = H * 0.5;
  const armF = new THREE.Group(); armF.position.set(0, shY, R * 1.02); body.add(armF);
  const armB = new THREE.Group(); armB.position.set(0, shY, -R * 1.02); body.add(armB);
  for (const [arm, mirror] of [[armF, 1], [armB, -1]] as const) {
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(3.6 * scale, 6 * scale, 6, 10), M(teamCol, .38));
    sleeve.position.set(0, -4 * scale, mirror * 1.6 * scale);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(3.1 * scale, 10, 8), faction === 'robo' ? M(P.skin, .3) : (skinMat as THREE.MeshStandardMaterial));
    hand.position.set(0, -9.5 * scale, mirror * 1.6 * scale);
    arm.add(sleeve, hand);
  }
  const HAND_Y = -9.5 * scale;                          // onde a arma "pega"

  // armas na mão do braço da frente (lâminas apontam pra FRENTE-CIMA em descanso)
  if (kind === 'espada') {
    const sw = new THREE.Group(); sw.position.set(0, HAND_Y, 1.6 * scale);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(2.2, 15 * scale, 4.2), M('#e0dacb', .28));
    blade.position.y = 10.5 * scale;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(2.2, 4.4, 4), M('#e0dacb', .28));
    tip.position.y = 18 * scale + 2; tip.rotation.y = Math.PI / 4;
    const guard = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.8, 7.4), M('#c8a84a', .4));
    guard.position.y = 3 * scale;
    sw.add(blade, tip, guard);
    sw.rotation.z = -0.95;                              // inclinada pra frente
    armF.add(sw);
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(6 * scale, 6 * scale, 2, 16), M(teamCol, .4));
    shield.rotation.x = Math.PI / 2; shield.position.set(0, HAND_Y + 2 * scale, -3.4 * scale);
    const boss = new THREE.Mesh(new THREE.SphereGeometry(2 * scale, 10, 8), M(P.trim, .35));
    boss.position.set(0, HAND_Y + 2 * scale, -4.6 * scale);
    armB.add(shield, boss);
  }
  if (kind === 'arco') {
    const bow = new THREE.Group(); bow.position.set(1.5 * scale, HAND_Y, 1.2 * scale);
    const arcM = new THREE.Mesh(new THREE.TorusGeometry(8.5 * scale, 1.2, 8, 22, Math.PI * 1.3), M('#8a5c30', .5));
    arcM.rotation.z = Math.PI * 0.36;                   // abertura pra frente (+x)
    const str = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 15.6 * scale, 4), M('#f5ecd8', .6));
    str.position.x = -2.2 * scale;
    bow.add(arcM, str);
    armF.add(bow);
  }
  if (kind === 'tanque') {
    const mal = new THREE.Group(); mal.position.set(0, HAND_Y, 1.6 * scale);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.9, 20 * scale, 8), woodMat(0x9a6a3e));
    stick.position.y = 8 * scale;
    const headM = new THREE.Mesh(new THREE.CylinderGeometry(5.6 * scale, 5.6 * scale, 10 * scale, 14), M('#9a958a', .35));
    headM.rotation.x = Math.PI / 2; headM.position.y = 17 * scale;
    mal.add(stick, headM);
    mal.rotation.z = -0.8;
    armF.add(mal);
    mats.push(stick.material as THREE.MeshStandardMaterial);
  }
  if (kind === 'veloz') {
    const lance = new THREE.Group(); lance.position.set(0, HAND_Y, 1.4 * scale);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 19 * scale, 8), woodMat(0x9a6a3e));
    shaft.position.y = 6 * scale;
    const flagTip = new THREE.Mesh(new THREE.ConeGeometry(1.8, 5, 6), M(P.trim, .4));
    flagTip.position.y = 16 * scale;
    lance.add(shaft, flagTip);
    lance.rotation.z = -1.25;                           // lança em riste
    armF.add(lance);
    // carrinho: rodinhas aparecendo fora da plaquinha
    for (const [dx, dz] of [[-11, 11], [11, 11], [-11, -11], [11, -11]] as const) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(3.6 * scale, 3.6 * scale, 2.4, 12), M('#3a3630', .35));
      w.rotation.x = Math.PI / 2; w.position.set(dx * scale, 3.4, dz * scale);
      w.name = 'wheel';
      g.add(w);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 2.8, 8), M(P.trim, .35));
      hub.rotation.x = Math.PI / 2; hub.position.copy(w.position);
      g.add(hub);
    }
  }

  // chavinha de corda nas costas (robôs) — gira quando anda!
  let key: THREE.Group | undefined;
  if (faction === 'robo') {
    key = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 7, 8), M('#c8a84a', .3));
    stem.rotation.x = Math.PI / 2; stem.position.x = -R * 1.1;
    const wing = new THREE.Mesh(new THREE.TorusGeometry(5.5, 1.8, 8, 16), M('#e8c86a', .3));
    wing.position.x = -R * 1.1 - 4.4;
    key.add(stem, wing);
    key.position.y = H * 0.38;
    body.add(key);
  }

  // barra de vida (billboard simples)
  const hpRoot = new THREE.Group();
  const hpBg = new THREE.Mesh(new THREE.PlaneGeometry(26 * scale, 4.6), new THREE.MeshBasicMaterial({ color: 0x22301c, transparent: true, opacity: .78, depthWrite: false }));
  const hpFill = new THREE.Mesh(new THREE.PlaneGeometry(24 * scale, 2.8), new THREE.MeshBasicMaterial({ color: foe ? 0xf25a4a : 0x7ed85a, depthWrite: false }));
  hpFill.position.z = 0.15;
  hpRoot.add(hpBg, hpFill);
  hpRoot.position.y = (faction === 'robo' ? headY + HEAD * 2.1 : headY + HEAD * 2.2);
  hpRoot.renderOrder = 5;
  hpRoot.visible = false;                              // só aparece quando machuca
  g.add(hpRoot);

  const blob = blobShadow(13 * scale, 10 * scale, .34);
  g.add(blob);

  g.traverse(o => { if ((o as THREE.Mesh).isMesh && o !== blob && !(o.parent === hpRoot)) { o.castShadow = true; o.receiveShadow = true; } });
  if (foe) g.rotation.y = Math.PI;                     // inimigo anda pra -x

  return { group: g, body, head, armF, armB, key, blob, hp: { root: hpRoot, fill: hpFill }, mats, h: H + HEAD * 2 };
}
