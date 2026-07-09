// ---------------------------------------------------------------------------
// TABULEIRO — a mesa de madeira, o tapete de brincar com 3 faixas, as duas
// bases-castelinho de blocos, e os enfeites do quarto (lápis, cubos de letra,
// livros, arvorezinhas de brinquedo). Tudo geometria procedural + texturas
// desenhadas em canvas.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { WORLD } from './scene';

const { laneZ, xHalf, baseX, matHalfW, matHalfL } = WORLD;

// ---------- texturas de canvas ----------
function canvasTex(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  draw(cv.getContext('2d')!);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function woodTex(): THREE.CanvasTexture {
  return canvasTex(1024, 1024, (c) => {
    c.fillStyle = '#8a5a34'; c.fillRect(0, 0, 1024, 1024);
    for (let p = 0; p < 8; p++) {                       // tábuas
      const y = p * 128;
      const g = c.createLinearGradient(0, y, 0, y + 128);
      g.addColorStop(0, p % 2 ? '#96683c' : '#8a5c34'); g.addColorStop(.5, p % 2 ? '#8a5c34' : '#946438'); g.addColorStop(1, p % 2 ? '#7e5230' : '#835830');
      c.fillStyle = g; c.fillRect(0, y, 1024, 126);
      c.fillStyle = 'rgba(50,30,14,.5)'; c.fillRect(0, y + 126, 1024, 3);
    }
    for (let i = 0; i < 90; i++) {                      // veios
      const x = Math.random() * 1024, y = Math.random() * 1024, l = 80 + Math.random() * 300;
      c.strokeStyle = `rgba(60,36,16,${.06 + Math.random() * .12})`; c.lineWidth = 1 + Math.random() * 2;
      c.beginPath(); c.moveTo(x, y);
      c.bezierCurveTo(x + l * .3, y + (Math.random() - .5) * 14, x + l * .7, y + (Math.random() - .5) * 14, x + l, y + (Math.random() - .5) * 8);
      c.stroke();
    }
    for (let i = 0; i < 10; i++) {                      // nós da madeira
      const x = Math.random() * 1024, y = Math.random() * 1024;
      const g = c.createRadialGradient(x, y, 1, x, y, 14);
      g.addColorStop(0, 'rgba(60,36,16,.55)'); g.addColorStop(1, 'rgba(60,36,16,0)');
      c.fillStyle = g; c.beginPath(); c.arc(x, y, 14, 0, 7); c.fill();
    }
  });
}
function matTex(): THREE.CanvasTexture {
  // tapete de brincar: feltro verde com 3 faixas de "estradinha" costuradas
  const W = 2048, H = 1024;
  return canvasTex(W, H, (c) => {
    c.fillStyle = '#79b25b'; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 5200; i++) {                    // fiapos do feltro
      c.fillStyle = `rgba(${Math.random() < .5 ? '255,255,255' : '40,80,30'},${.03 + Math.random() * .05})`;
      c.fillRect(Math.random() * W, Math.random() * H, 2.2, 2.2);
    }
    const zToV = (z: number) => (z / matHalfW * .5 + .5) * H;
    const laneH = 34 / matHalfW * .5 * H * 2;
    for (const z of laneZ) {                            // faixas de estrada
      const y = zToV(z);
      c.fillStyle = '#5c8a44'; c.fillRect(0, y - laneH / 2 - 7, W, laneH + 14);
      const g = c.createLinearGradient(0, y - laneH / 2, 0, y + laneH / 2);
      g.addColorStop(0, '#e8cf9a'); g.addColorStop(.5, '#f2dfae'); g.addColorStop(1, '#e0c48c');
      c.fillStyle = g; c.fillRect(0, y - laneH / 2, W, laneH);
      c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 7; c.setLineDash([46, 34]);   // tracejado central
      c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); c.setLineDash([]);
      c.strokeStyle = 'rgba(120,90,40,.4)'; c.lineWidth = 5;                               // costura das bordas
      c.setLineDash([16, 12]);
      c.beginPath(); c.moveTo(0, y - laneH / 2 + 6); c.lineTo(W, y - laneH / 2 + 6); c.stroke();
      c.beginPath(); c.moveTo(0, y + laneH / 2 - 6); c.lineTo(W, y + laneH / 2 - 6); c.stroke();
      c.setLineDash([]);
      for (let i = 0; i < 130; i++) c.fillStyle = `rgba(160,120,60,${.06 + Math.random() * .1})`,
        c.fillRect(Math.random() * W, y - laneH / 2 + 8 + Math.random() * (laneH - 16), 3, 3);
    }
    // florzinhas costuradas no feltro
    for (let i = 0; i < 46; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const nearLane = laneZ.some(z => Math.abs(zToV(z) - y) < laneH * .72);
      if (nearLane) continue;
      c.fillStyle = ['#f2e2a0', '#e88fb0', '#9adcff'][i % 3];
      for (let p = 0; p < 5; p++) { const a = p / 5 * Math.PI * 2; c.beginPath(); c.arc(x + Math.cos(a) * 6, y + Math.sin(a) * 6, 4, 0, 7); c.fill(); }
      c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, 3.4, 0, 7); c.fill();
    }
    // borda costurada do tapete
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 8; c.setLineDash([26, 18]);
    c.strokeRect(16, 16, W - 32, H - 32); c.setLineDash([]);
  });
}
function letterTex(ch: string, bg: string): THREE.CanvasTexture {
  return canvasTex(256, 256, (c) => {
    c.fillStyle = bg; c.fillRect(0, 0, 256, 256);
    c.fillStyle = 'rgba(255,255,255,.24)'; c.fillRect(0, 0, 256, 34);
    c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 10; c.strokeRect(18, 18, 220, 220);
    c.fillStyle = '#fff8ea'; c.font = 'bold 150px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(ch, 128, 138);
  });
}

// sombra de contato (blob): elipse suave sob cada objeto — o "peso" do diorama
// funciona em qualquer GPU (as sombras reais somam por cima quando suportadas)
let blobTex: THREE.CanvasTexture | null = null;
export function blobShadow(rx: number, rz: number, opacity = 0.34): THREE.Mesh {
  if (!blobTex) blobTex = canvasTex(128, 128, (c) => {
    const g = c.createRadialGradient(64, 64, 6, 64, 64, 62);
    g.addColorStop(0, 'rgba(20,14,8,1)'); g.addColorStop(.6, 'rgba(20,14,8,.6)'); g.addColorStop(1, 'rgba(20,14,8,0)');
    c.fillStyle = g; c.fillRect(0, 0, 128, 128);
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(rx * 2, rz * 2),
    new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, opacity, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.7;
  m.renderOrder = 1;
  return m;
}

// ---------- materiais ----------
export const plastic = (color: number | string, rough = 0.32): THREE.MeshPhysicalMaterial =>
  new THREE.MeshPhysicalMaterial({ color, roughness: rough, clearcoat: 0.65, clearcoatRoughness: 0.35 });
export const woodMat = (color: number | string, rough = 0.62): THREE.MeshStandardMaterial =>
  new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });

function slab(w: number, d: number, h: number, r: number, mat: THREE.Material): THREE.Mesh {
  // placa com cantos arredondados (extrusão com bevel)
  const s = new THREE.Shape();
  const hw = w / 2 - r, hd = d / 2 - r;
  s.moveTo(-hw, -hd - r); s.lineTo(hw, -hd - r); s.absarc(hw, -hd, r, -Math.PI / 2, 0, false);
  s.lineTo(hw + r, hd); s.absarc(hw, hd, r, 0, Math.PI / 2, false);
  s.lineTo(-hw, hd + r); s.absarc(-hw, hd, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hw - r, -hd); s.absarc(-hw, -hd, r, Math.PI, Math.PI * 1.5, false);
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelThickness: 3, bevelSize: 3, bevelSegments: 3, curveSegments: 10 });
  g.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

// ---------- montagem do mundo ----------
export interface BoardRefs {
  group: THREE.Group;
  slotPos: { mine: THREE.Vector3[]; foe: THREE.Vector3[] };   // onde os módulos encaixam
  baseMeshes: { mine: THREE.Group; foe: THREE.Group };
}

export function buildBoard(scene: THREE.Scene): BoardRefs {
  const g = new THREE.Group();

  // mesa
  const table = new THREE.Mesh(new THREE.BoxGeometry(1700, 34, 1050), new THREE.MeshStandardMaterial({ map: woodTex(), roughness: 0.55 }));
  table.position.y = -31; table.receiveShadow = true; table.castShadow = false;
  g.add(table);

  // tapete de brincar (as 3 faixas estão pintadas na textura). A extrusão usa
  // as coordenadas do shape como UV — o repeat/offset traduz pra 0..1.
  const mTex = matTex();
  mTex.repeat.set(1 / (matHalfL * 2), 1 / (matHalfW * 2));
  mTex.offset.set(0.5, 0.5);
  const mat = slab(matHalfL * 2, matHalfW * 2, 12, 26, new THREE.MeshStandardMaterial({ map: mTex, roughness: 0.9 }));
  mat.position.y = -13;
  g.add(mat);

  // bases
  const mine = buildCastle(1); mine.position.set(-baseX, 0, 0); g.add(mine);
  const foe = buildCastle(-1); foe.position.set(baseX, 0, 0); g.add(foe);
  for (const bx of [-baseX, baseX]) { const s = blobShadow(108, 98, .3); s.position.set(bx, 0.6, 0); g.add(s); }

  // slots de construção (tachões na frente da base, um por faixa)
  const slotPos = { mine: [] as THREE.Vector3[], foe: [] as THREE.Vector3[] };
  for (const side of [1, -1] as const) {
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Vector3(side > 0 ? -baseX + 78 : baseX - 78, 0, laneZ[i]);
      (side > 0 ? slotPos.mine : slotPos.foe).push(p);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(15, 2.4, 10, 28), plastic(side > 0 ? 0x9adcff : 0xf2a68a, .45));
      ring.rotation.x = Math.PI / 2; ring.position.copy(p).setY(1.4);
      ring.castShadow = true; ring.receiveShadow = true;
      ring.name = `slot-${side > 0 ? 'mine' : 'foe'}-${i}`;
      g.add(ring);
    }
  }

  // ---- enfeites do quarto ----
  // lápis encostado na borda de trás
  const pencil = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 260, 6), plastic(0xf2b13d, .5));
  shaft.rotation.z = Math.PI / 2; pencil.add(shaft);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(7, 26, 6), woodMat(0xe8cf9a));
  tip.rotation.z = -Math.PI / 2; tip.position.x = 143; pencil.add(tip);
  const lead = new THREE.Mesh(new THREE.ConeGeometry(2.6, 9, 6), plastic(0x2c2c34, .4));
  lead.rotation.z = -Math.PI / 2; lead.position.x = 152; pencil.add(lead);
  const rubber = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 14, 12), plastic(0xe88fb0, .5));
  rubber.rotation.z = Math.PI / 2; rubber.position.x = -136; pencil.add(rubber);
  pencil.traverse(o => { o.castShadow = true; o.receiveShadow = true; });
  pencil.position.set(-120, 7 - 14, -matHalfW - 64); pencil.rotation.y = 0.06;
  g.add(pencil);
  const psh = blobShadow(150, 14, .3); psh.position.set(-120, -13.4, -matHalfW - 60); g.add(psh);

  // cubos de letra
  const letters: [string, string, number, number, number][] = [
    ['B', '#e8645a', -matHalfL + 40, -matHalfW - 70, .3], ['D', '#5a9ae8', -matHalfL + 96, -matHalfW - 58, -.2],
    ['B', '#6ab04c', matHalfL - 70, -matHalfW - 66, .5],
  ];
  for (const [ch, col, x, z, rot] of letters) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(46, 46, 46), new THREE.MeshStandardMaterial({ map: letterTex(ch, col), roughness: .5 }));
    cube.position.set(x, 23 - 14, z); cube.rotation.y = rot;
    cube.castShadow = cube.receiveShadow = true;
    g.add(cube);
    const csh = blobShadow(34, 32, .32); csh.position.set(x, -13.3, z); g.add(csh);
  }

  // livros empilhados no fundo (cenário)
  const bookCols = [0x8a5cd0, 0xe8944a, 0x4a9ae8];
  for (let i = 0; i < 3; i++) {
    const book = new THREE.Group();
    const cover = new THREE.Mesh(new THREE.BoxGeometry(210 - i * 22, 24, 150 - i * 14), plastic(bookCols[i], .55));
    const pages = new THREE.Mesh(new THREE.BoxGeometry(196 - i * 22, 18, 138 - i * 14), new THREE.MeshStandardMaterial({ color: 0xf5ecd8, roughness: .9 }));
    pages.position.x = 6;
    book.add(cover, pages);
    book.position.set(190 + i * 8, -14 + 12 + i * 24, -matHalfW - 150);
    book.rotation.y = (i - 1) * 0.14;
    book.traverse(o => { o.castShadow = true; o.receiveShadow = true; });
    g.add(book);
  }
  const bsh = blobShadow(130, 90, .32); bsh.position.set(196, -13.3, -matHalfW - 148); g.add(bsh);

  // arvorezinhas de brinquedo nos cantos do tapete (fora das faixas)
  const treeSpots: [number, number, number][] = [[-210, matHalfW - 22, 1], [150, matHalfW - 18, .8], [40, -matHalfW + 24, .9], [-40, matHalfW - 20, .7], [255, -matHalfW + 26, .75]];
  for (const [x, z, s] of treeSpots) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(4.6 * s, 5.4 * s, 18 * s, 10), woodMat(0x9a6a3e));
    trunk.position.y = 9 * s;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(17 * s, 20, 16), plastic(0x6ab04c, .45));
    ball.position.y = 30 * s; ball.scale.y = 0.92;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(9 * s, 10 * s, 4, 14), plastic(0xf5ecd8, .5));
    base.position.y = 2;
    tree.add(trunk, ball, base, blobShadow(19 * s, 15 * s, .3));
    tree.traverse(o => { o.castShadow = true; o.receiveShadow = true; });
    tree.position.set(x, 0, z);
    g.add(tree);
  }

  scene.add(g);
  return { group: g, slotPos, baseMeshes: { mine, foe } };
}

// castelinho de blocos de brinquedo — side 1 = jogador (azuis), -1 = inimigo (vermelhos)
function buildCastle(side: 1 | -1): THREE.Group {
  const g = new THREE.Group();
  const main = side > 0 ? 0x66a8e8 : 0xe87058;          // cor principal
  const roof = side > 0 ? 0x3f7dd0 : 0xd04838;          // telhados
  const trim = 0xf5ecd8;                                 // creme

  // plataforma de encaixe
  const plate = slab(176, 166, 8, 20, plastic(trim, .5));
  plate.position.y = 0; g.add(plate);

  // FORTE de brinquedo: torreão quadrado + 4 torres de canto + portão em arco.
  // Silhueta limpa que lê "castelo" de cima.
  const keep = new THREE.Mesh(new THREE.BoxGeometry(84, 62, 96), plastic(main));
  keep.position.set(side * -8, 8 + 31, 0); g.add(keep);
  const keepTop = slab(96, 108, 8, 8, plastic(trim, .45));
  keepTop.position.set(side * -8, 8 + 62, 0); g.add(keepTop);
  // ameias em volta do topo do torreão
  for (let i = -2; i <= 2; i++) {
    for (const dz of [-48, 48]) { const m = new THREE.Mesh(new THREE.BoxGeometry(12, 10, 9), plastic(main));
      m.position.set(side * -8 + i * 19, 8 + 70 + 5, dz); g.add(m); }
    for (const dx of [-42, 42]) { const m = new THREE.Mesh(new THREE.BoxGeometry(9, 10, 12), plastic(main));
      m.position.set(side * -8 + dx, 8 + 70 + 5, i * 19); g.add(m); }
  }
  // 4 torres de canto com telhado cone
  for (const [dx, dz] of [[-44, -44], [-44, 44], [30, -44], [30, 44]] as const) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(15, 17, 78, 18), plastic(main));
    t.position.set(side * -8 + dx * (side > 0 ? 1 : -1), 8 + 39, dz); g.add(t);
    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(16.5, 16.5, 7, 18), plastic(trim, .45));
    b2.position.set(t.position.x, 8 + 66, dz); g.add(b2);
    const c2 = new THREE.Mesh(new THREE.ConeGeometry(21, 30, 18), plastic(roof, .38));
    c2.position.set(t.position.x, 8 + 78 + 15, dz); g.add(c2);
  }
  // torre central mais alta atrás, com a bandeira
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(19, 22, 104, 20), plastic(main));
  spire.position.set(side * -34, 8 + 52, 0); g.add(spire);
  const spBand = new THREE.Mesh(new THREE.CylinderGeometry(21, 21, 8, 20), plastic(trim, .45));
  spBand.position.set(side * -34, 8 + 88, 0); g.add(spBand);
  const spCone = new THREE.Mesh(new THREE.ConeGeometry(26, 34, 20), plastic(roof, .38));
  spCone.position.set(side * -34, 8 + 104 + 17, 0); g.add(spCone);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 26, 8), woodMat(0x9a6a3e));
  pole.position.set(side * -34, 8 + 104 + 34 + 12, 0); g.add(pole);
  const flagT = canvasTex(64, 44, (c) => { c.fillStyle = side > 0 ? '#ffd76a' : '#ffb84a'; c.beginPath(); c.moveTo(0, 0); c.lineTo(64, 12); c.lineTo(0, 30); c.fill(); });
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(24, 15), new THREE.MeshBasicMaterial({ map: flagT, side: THREE.DoubleSide, transparent: true }));
  flag.position.set(side * -34 + 13, 8 + 104 + 34 + 20, 0); flag.name = 'flag';
  g.add(flag);

  // portão em arco na face que olha pro CAMPO (decalque na parede do torreão)
  const archT = canvasTex(128, 128, (c) => {
    c.fillStyle = '#4a2e16'; c.beginPath(); c.moveTo(22, 128); c.lineTo(22, 58);
    c.quadraticCurveTo(64, 6, 106, 58); c.lineTo(106, 128); c.fill();
    c.fillStyle = '#2c1a0c'; c.beginPath(); c.moveTo(34, 128); c.lineTo(34, 64);
    c.quadraticCurveTo(64, 26, 94, 64); c.lineTo(94, 128); c.fill();
    c.strokeStyle = 'rgba(255,240,200,.35)'; c.lineWidth = 4;
    for (const x of [50, 64, 78]) { c.beginPath(); c.moveTo(x, 44 + Math.abs(x - 64) * .5); c.lineTo(x, 128); c.stroke(); }
    c.fillStyle = 'rgba(255,240,200,.4)';
    c.beginPath(); c.arc(64, 60, 4, 0, 7); c.fill();
  });
  const arch = new THREE.Mesh(new THREE.PlaneGeometry(42, 46), new THREE.MeshBasicMaterial({ map: archT, transparent: true, polygonOffset: true, polygonOffsetFactor: -2 }));
  arch.position.set(side * -8 + side * 42.4, 8 + 23, 0); arch.rotation.y = side * Math.PI / 2;
  g.add(arch);

  g.traverse(o => { o.castShadow = true; o.receiveShadow = true; });
  return g;
}
