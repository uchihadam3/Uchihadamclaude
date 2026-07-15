import * as THREE from "three";

// Texturas geradas por código, com filtragem suave (sem look pixelado).
// Renderizamos as texturas com super-amostragem (SS) p/ ficarem nítidas.
const SS = 4; // fator de super-amostragem das texturas procedurais
function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w * SS;
  c.height = h * SS;
  const ctx = c.getContext("2d")!;
  ctx.scale(SS, SS); // desenha em coords lógicas, renderiza em alta resolução
  return { c, ctx };
}

function toTex(c: HTMLCanvasElement, repeatX = 1, repeatY = 1): THREE.Texture {
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = 8;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// textura para placas/sprites: sem repetição, preserva transparência
function toSprite(c: HTMLCanvasElement): THREE.Texture {
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = 8;
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const rnd = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// -------- madeira (tábuas verticais) --------
export function woodPlanks(seed = 1): THREE.Texture {
  const W = 64;
  const H = 64;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  const planks = 5;
  const pw = W / planks;
  for (let p = 0; p < planks; p++) {
    const base = 92 + Math.floor(r() * 30);
    const x0 = Math.round(p * pw);
    const x1 = Math.round((p + 1) * pw);
    for (let x = x0; x < x1; x++) {
      for (let y = 0; y < H; y++) {
        // grão: variação por linha + ruído
        const grain = Math.sin(y * 0.4 + p) * 6 + (r() - 0.5) * 14;
        const rr = base + grain;
        ctx.fillStyle = `rgb(${rr | 0},${(rr * 0.62) | 0},${(rr * 0.34) | 0})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    // fresta entre tábuas (sombra)
    ctx.fillStyle = "rgba(30,16,6,0.8)";
    ctx.fillRect(x0, 0, 1, H);
    ctx.fillStyle = "rgba(255,220,170,0.10)";
    ctx.fillRect(x0 + 1, 0, 1, H);
    // alguns nós na madeira
    if (r() < 0.5) {
      const ny = Math.floor(r() * H);
      ctx.fillStyle = "rgba(40,22,10,0.7)";
      ctx.beginPath();
      ctx.arc(x0 + pw / 2, ny, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toTex(c);
}

// -------- pedra da rua (paralelepípedos) --------
export function cobblestone(seed = 7): THREE.Texture {
  const W = 96;
  const H = 96;
  const { c, ctx } = makeCanvas(W, H);
  ctx.fillStyle = "#2a2620";
  ctx.fillRect(0, 0, W, H);
  const r = rnd(seed);
  const cell = 12;
  for (let gy = 0; gy < H / cell + 1; gy++) {
    for (let gx = 0; gx < W / cell + 1; gx++) {
      const ox = gx * cell + (r() - 0.5) * 4 + (gy % 2 ? cell / 2 : 0);
      const oy = gy * cell + (r() - 0.5) * 4;
      const rad = cell * 0.42 + r() * 2.5;
      const g = 90 + Math.floor(r() * 70);
      const tone = r();
      const col =
        tone < 0.4
          ? `rgb(${g},${(g * 0.9) | 0},${(g * 0.78) | 0})`
          : `rgb(${(g * 0.8) | 0},${(g * 0.74) | 0},${(g * 0.62) | 0})`;
      ctx.fillStyle = col;
      ctx.beginPath();
      const sides = 5 + Math.floor(r() * 3);
      for (let s = 0; s <= sides; s++) {
        const a = (s / sides) * Math.PI * 2;
        const rr = rad * (0.8 + r() * 0.3);
        const px = ox + Math.cos(a) * rr;
        const py = oy + Math.sin(a) * rr * 0.8;
        s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      // brilho no topo da pedra
      ctx.fillStyle = "rgba(255,250,235,0.10)";
      ctx.beginPath();
      ctx.ellipse(ox, oy - rad * 0.3, rad * 0.5, rad * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toTex(c);
}

// -------- palha / colmo do telhado --------
export function thatch(seed = 3): THREE.Texture {
  const W = 64;
  const H = 64;
  const { c, ctx } = makeCanvas(W, H);
  ctx.fillStyle = "#6e5320";
  ctx.fillRect(0, 0, W, H);
  const r = rnd(seed);
  for (let i = 0; i < 900; i++) {
    const x = Math.floor(r() * W);
    const y = Math.floor(r() * H);
    const len = 3 + Math.floor(r() * 6);
    const sh = 120 + Math.floor(r() * 90);
    ctx.strokeStyle = `rgb(${sh},${(sh * 0.78) | 0},${(sh * 0.4) | 0})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (r() - 0.5) * 2, y + len);
    ctx.stroke();
  }
  // faixas horizontais (camadas do colmo)
  ctx.fillStyle = "rgba(30,20,6,0.35)";
  for (let y = 0; y < H; y += 14) ctx.fillRect(0, y, W, 2);
  return toTex(c);
}

// -------- porta de madeira --------
export function door(seed = 11): THREE.Texture {
  const W = 48;
  const H = 64;
  const { c, ctx } = makeCanvas(W, H);
  // moldura de pedra clara ao redor
  ctx.fillStyle = "#5a4a38";
  ctx.fillRect(0, 0, W, H);
  // porta
  ctx.fillStyle = "#4a2f16";
  ctx.fillRect(6, 6, W - 12, H - 6);
  // tábuas verticais
  for (let x = 6; x < W - 6; x += 8) {
    ctx.fillStyle = "rgba(20,10,4,0.7)";
    ctx.fillRect(x, 6, 1, H - 6);
    ctx.fillStyle = "rgba(120,80,40,0.25)";
    ctx.fillRect(x + 1, 6, 1, H - 6);
  }
  // ferragens
  ctx.fillStyle = "#20242a";
  ctx.fillRect(8, 14, W - 16, 3);
  ctx.fillRect(8, H - 18, W - 16, 3);
  // maçaneta
  ctx.fillStyle = "#c9a227";
  ctx.fillRect(W - 14, H / 2, 3, 3);
  return toTex(c);
}

// -------- janela de madeira --------
export function window_(seed = 13): THREE.Texture {
  const W = 40;
  const H = 40;
  const { c, ctx } = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  // moldura
  ctx.fillStyle = "#3a2512";
  ctx.fillRect(4, 4, W - 8, H - 8);
  // vidro escuro
  ctx.fillStyle = "#10161c";
  ctx.fillRect(8, 8, W - 16, H - 16);
  // reflexo
  ctx.fillStyle = "rgba(120,150,170,0.25)";
  ctx.fillRect(9, 9, 6, H - 18);
  // travessas (cruz)
  ctx.fillStyle = "#2a1a0c";
  ctx.fillRect(W / 2 - 1, 4, 2, H - 8);
  ctx.fillRect(4, H / 2 - 1, W - 8, 2);
  return toTex(c);
}

// -------- barril --------
export function barrel(seed = 17): THREE.Texture {
  const W = 48;
  const H = 32;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  for (let x = 0; x < W; x++) {
    const shade = 96 + Math.sin((x / W) * Math.PI) * 46 + (r() - 0.5) * 10;
    ctx.fillStyle = `rgb(${shade | 0},${(shade * 0.6) | 0},${(shade * 0.32) | 0})`;
    ctx.fillRect(x, 0, 1, H);
    if (x % 6 === 0) {
      ctx.fillStyle = "rgba(20,10,4,0.6)";
      ctx.fillRect(x, 0, 1, H);
    }
  }
  // aros de metal
  ctx.fillStyle = "#3a3f47";
  ctx.fillRect(0, 3, W, 3);
  ctx.fillRect(0, H - 6, W, 3);
  ctx.fillStyle = "rgba(200,210,220,0.3)";
  ctx.fillRect(0, 3, W, 1);
  return toTex(c);
}

// -------- terra / chão sob as casas --------
export function dirt(seed = 23): THREE.Texture {
  const W = 48;
  const H = 48;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const g = 60 + Math.floor(r() * 26);
      ctx.fillStyle = `rgb(${g},${(g * 0.78) | 0},${(g * 0.5) | 0})`;
      ctx.fillRect(x, y, 1, 1);
    }
  return toTex(c);
}

// -------- pedra de cantaria (poço, arco da masmorra) --------
export function stone(seed = 31): THREE.Texture {
  const W = 96;
  const H = 96;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  ctx.fillStyle = "#3b3a38";
  ctx.fillRect(0, 0, W, H);
  const bh = 16;
  for (let gy = 0, row = 0; gy < H; gy += bh, row++) {
    const off = row % 2 ? 16 : 0;
    for (let gx = -16; gx < W; gx += 32) {
      const x = gx + off;
      const g = 96 + Math.floor(r() * 40);
      ctx.fillStyle = `rgb(${g},${(g * 0.98) | 0},${(g * 0.92) | 0})`;
      ctx.fillRect(x + 1, gy + 1, 30, bh - 2);
      // sombreado e brilho nas bordas do bloco
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.fillRect(x + 1, gy + bh - 3, 30, 2);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(x + 1, gy + 1, 30, 1);
      // manchas
      if (r() < 0.4) {
        ctx.fillStyle = `rgba(40,50,40,${0.1 + r() * 0.15})`;
        ctx.beginPath();
        ctx.ellipse(x + 8 + r() * 14, gy + 6 + r() * 6, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  return toTex(c);
}

// -------- placa de estabelecimento (taverna / loja) --------
export function sign(kind: "tavern" | "shop"): THREE.Texture {
  const W = 96;
  const H = 72;
  const { c, ctx } = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  // tábua de madeira com moldura
  ctx.fillStyle = "#3a2614";
  roundRect(ctx, 6, 4, W - 12, H - 8, 6);
  ctx.fill();
  ctx.fillStyle = "#5a3d21";
  roundRect(ctx, 9, 7, W - 18, H - 14, 5);
  ctx.fill();
  // grão
  ctx.strokeStyle = "rgba(30,18,8,0.4)";
  ctx.lineWidth = 1;
  for (let y = 12; y < H - 10; y += 6) {
    ctx.beginPath();
    ctx.moveTo(12, y);
    ctx.lineTo(W - 12, y + 1);
    ctx.stroke();
  }
  // ícone
  const cx = W / 2;
  const cy = H / 2 + 2;
  if (kind === "tavern") {
    // caneca de cerveja
    ctx.fillStyle = "#d9b24a";
    roundRect(ctx, cx - 16, cy - 14, 24, 28, 3);
    ctx.fill();
    ctx.fillStyle = "#f6ecd0"; // espuma
    roundRect(ctx, cx - 16, cy - 18, 24, 8, 3);
    ctx.fill();
    ctx.strokeStyle = "#7a5a20"; // alça
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx + 12, cy, 9, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(120,80,20,0.35)";
    ctx.fillRect(cx - 16, cy + 2, 24, 3);
  } else {
    // bolsa de moedas
    ctx.fillStyle = "#8a6b3a";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, 16, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6f5228";
    ctx.fillRect(cx - 8, cy - 12, 16, 8); // gargalo
    ctx.strokeStyle = "#3a2c14";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - 6);
    ctx.lineTo(cx + 8, cy - 6);
    ctx.stroke();
    ctx.fillStyle = "#e8c34a"; // moeda
    ctx.beginPath();
    ctx.arc(cx + 6, cy + 8, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  return toSprite(c);
}

// -------- NPC estilo Dragon Quest (cabelo espetado, cores vivas, classes) --------
// 5 arquétipos: herói, guerreiro, mago, aventureiro, curandeira.
export function villager(seed = 1): THREE.Texture {
  const W = 76;
  const H = 128;
  const { c, ctx } = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const r = rnd(seed);
  const OUT = "#241812";
  const cx = W / 2;
  const hy = 29; // centro da cabeça
  const hr = 13;
  const shade = (hex: string, f: number) => {
    const n = parseInt(hex.slice(1), 16);
    let R = (n >> 16) & 255;
    let G = (n >> 8) & 255;
    let B = n & 255;
    if (f < 0) {
      const m = 1 + f;
      R *= m;
      G *= m;
      B *= m;
    } else {
      R += (255 - R) * f;
      G += (255 - G) * f;
      B += (255 - B) * f;
    }
    return `rgb(${R | 0},${G | 0},${B | 0})`;
  };
  const path = (pts: number[][], color: string, ol = 2.2) => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    if (ol) {
      ctx.strokeStyle = OUT;
      ctx.lineWidth = ol;
      ctx.stroke();
    }
  };
  const disc = (x: number, y: number, rad: number, color: string, ol = 2) => {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (ol) {
      ctx.strokeStyle = OUT;
      ctx.lineWidth = ol;
      ctx.stroke();
    }
  };
  const rrect = (
    x: number,
    y: number,
    w: number,
    h: number,
    rad: number,
    color: string,
    ol = 2,
  ) => {
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, rad);
    ctx.fillStyle = color;
    ctx.fill();
    if (ol) {
      ctx.strokeStyle = OUT;
      ctx.lineWidth = ol;
      ctx.stroke();
    }
  };
  const clipFill = (pts: number[][], style: string) => {
    ctx.save();
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = style;
    ctx.fillRect(cx + 2, 40, 44, 90);
    ctx.restore();
  };

  const skins = ["#f4cc9c", "#eab488", "#d89a68"];
  const skin = skins[Math.floor(r() * skins.length)];
  const skinSh = shade(skin, -0.16);
  const type = Math.floor(r() * 5); // 0 herói 1 guerreiro 2 mago 3 aventureiro 4 curandeira

  // ---- sombra ----
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(cx, H - 5, 15, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // ---- rosto (pescoço + cabeça + olhos altos estilo Toriyama) ----
  const drawFace = () => {
    ctx.fillStyle = skinSh;
    ctx.fillRect(cx - 4, 36, 8, 12);
    disc(cx, hy, hr, skin);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, hy, hr, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    ctx.fillRect(cx + 3, hy - hr, hr, 2 * hr);
    ctx.restore();
    for (const s of [-1, 1]) {
      const ex = cx + s * 4.6;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(ex, hy - 0.3, 2.3, 3.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#241812";
      ctx.beginPath();
      ctx.ellipse(ex + s * 0.3, hy, 1.6, 3.1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(ex - 0.7, hy - 1.8, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = OUT;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx - 8, hy - 5.5);
    ctx.lineTo(cx - 2.5, hy - 6);
    ctx.moveTo(cx + 2.5, hy - 6);
    ctx.lineTo(cx + 8, hy - 5.5);
    ctx.stroke();
    ctx.fillStyle = skinSh;
    ctx.fillRect(cx - 0.6, hy + 3, 1.3, 2.4);
    ctx.strokeStyle = "#9c4a38";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, hy + 6, 2.2, 0.18 * Math.PI, 0.82 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "rgba(232,120,110,0.28)";
    ctx.beginPath();
    ctx.arc(cx - 7.5, hy + 4, 2, 0, Math.PI * 2);
    ctx.arc(cx + 7.5, hy + 4, 2, 0, Math.PI * 2);
    ctx.fill();
  };

  // ---- cabelo espetado ----
  const spikyHair = (color: string) => {
    ctx.beginPath();
    ctx.arc(cx, hy - 1, hr + 1, Math.PI * 0.98, Math.PI * 2.02);
    ctx.lineTo(cx + hr, hy + 2);
    ctx.lineTo(cx + 8, hy - 3);
    ctx.lineTo(cx + 5, hy - 1);
    ctx.lineTo(cx + 2, hy - 4);
    ctx.lineTo(cx - 1, hy - 1);
    ctx.lineTo(cx - 4, hy - 4);
    ctx.lineTo(cx - 7, hy - 1);
    ctx.lineTo(cx - hr, hy + 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = OUT;
    ctx.lineWidth = 2;
    ctx.stroke();
    const dxs = [-11, -7, -3, 1, 5, 9, 12];
    for (const dx of dxs) {
      const bx = cx + dx * 0.9;
      const on = Math.max(0, hr * hr - dx * dx);
      const by = hy - Math.sqrt(on) + 3;
      const tx = cx + dx * 1.7 + (dx > 0 ? 2 : -2);
      const ty = by - 10 - (12 - Math.abs(dx)) * 0.5;
      path([[bx - 3.4, by], [tx, ty], [bx + 3.4, by]], color, 1.8);
    }
    ctx.strokeStyle = shade(color, 0.35);
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(cx - 4, hy - 6);
    ctx.lineTo(cx - 2, hy - hr + 1);
    ctx.moveTo(cx + 3, hy - 6);
    ctx.lineTo(cx + 5, hy - hr + 2);
    ctx.stroke();
  };

  // ---- membros ----
  const armSleeve = (color: string, glove: string) => {
    path([[cx - 12, 48], [cx - 20, 52], [cx - 18, 74], [cx - 11, 70]], color, 2);
    path([[cx + 12, 48], [cx + 20, 52], [cx + 18, 74], [cx + 11, 70]], color, 2);
    disc(cx - 18, 76, 3.6, glove, 1.8);
    disc(cx + 18, 76, 3.6, glove, 1.8);
  };
  const legs = (pants: string, boots: string) => {
    path([[cx - 9, 82], [cx - 1, 82], [cx - 2, 112], [cx - 9, 112]], pants, 2);
    path([[cx + 1, 82], [cx + 9, 82], [cx + 9, 112], [cx + 2, 112]], pants, 2);
    rrect(cx - 11, 110, 10, 11, 3, boots, 2);
    rrect(cx + 1, 110, 10, 11, 3, boots, 2);
  };
  const celBody = (pts: number[][], color: string) => {
    path(pts, color, 2.2);
    clipFill(pts, "rgba(0,0,0,0.16)");
  };

  if (type === 0) {
    // HERÓI — túnica verde, cinto, boné pontudo, cabelo loiro
    legs("#2f6f9a", "#6a4526");
    celBody([[cx - 12, 46], [cx + 12, 46], [cx + 14, 84], [cx - 14, 84]], "#37a34a");
    path([[cx - 14, 80], [cx + 14, 80], [cx + 14, 84], [cx - 14, 84]], "#e8e0b0", 1.4);
    armSleeve("#2f8f40", "#e0b070");
    rrect(cx - 14, 79, 28, 5, 2, "#5a3a1e", 1.8);
    rrect(cx - 3, 78, 6, 7, 1.5, "#e6c040", 1.4);
    drawFace();
    spikyHair("#f0d24a");
    path(
      [[cx - hr, hy - 6], [cx + hr, hy - 6], [cx + 5, hy - hr - 13], [cx - 2, hy - hr - 7]],
      "#2f8f3f",
      2,
    );
    disc(cx + 4, hy - hr - 12, 2.4, "#e6c040", 1.4);
  } else if (type === 1) {
    // GUERREIRO — armadura de couro, ombreiras, bandana verde, cabelo laranja
    legs("#33507e", "#3a4656");
    celBody([[cx - 13, 46], [cx + 13, 46], [cx + 14, 82], [cx - 14, 82]], "#8a5a2e");
    path([[cx - 8, 50], [cx + 8, 50], [cx + 9, 74], [cx - 9, 74]], "#6f4522", 1.8);
    ctx.strokeStyle = "#e6c040";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx - 7, 56);
    ctx.lineTo(cx + 7, 60);
    ctx.stroke();
    armSleeve("#7a4d26", "#3a4656");
    disc(cx - 15, 49, 5.5, "#9a6a38", 2);
    disc(cx + 15, 49, 5.5, "#9a6a38", 2);
    rrect(cx - 14, 78, 28, 5, 2, "#4a2f18", 1.8);
    drawFace();
    spikyHair("#e07028");
    rrect(cx - hr - 1, hy - 8, 2 * hr + 2, 4.5, 1.5, "#2f8f3f", 1.8);
    path([[cx + hr - 1, hy - 7], [cx + hr + 6, hy - 2], [cx + hr + 4, hy - 9]], "#2f8f3f", 1.4);
  } else if (type === 2) {
    // MAGO — manto azul longo com faixa dourada, cajado, cabelo azul
    const robe = [[cx - 11, 46], [cx + 11, 46], [cx + 20, 116], [cx - 20, 116]];
    path(robe, "#2a52b0", 2.2);
    clipFill(robe, "rgba(0,0,0,0.16)");
    path([[cx - 4, 52], [cx + 4, 52], [cx + 6, 116], [cx - 6, 116]], "#e6b83a", 1.6);
    rrect(cx - 20, 112, 40, 5, 2, "#e6b83a", 1.6);
    path([[cx - 11, 48], [cx - 21, 58], [cx - 17, 84], [cx - 9, 74]], "#2a52b0", 2);
    path([[cx + 11, 48], [cx + 21, 58], [cx + 17, 84], [cx + 9, 74]], "#2a52b0", 2);
    disc(cx - 17, 86, 3.4, skin, 1.6);
    disc(cx + 17, 86, 3.4, skin, 1.6);
    drawFace();
    spikyHair("#4aa8d8");
    ctx.strokeStyle = "#8a5a2e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx + 19, 40);
    ctx.lineTo(cx + 19, 118);
    ctx.stroke();
    disc(cx + 19, 33, 5, "#e6c040", 2);
    disc(cx + 19, 33, 2.2, "#fff6c0", 0);
  } else if (type === 3) {
    // AVENTUREIRO — capa vermelha, túnica azul, cabelo laranja
    const cape = [[cx - 13, 46], [cx + 13, 46], [cx + 22, 100], [cx - 22, 100]];
    path(cape, "#c0432a", 2.2);
    clipFill(cape, "rgba(0,0,0,0.18)");
    legs("#2a2f45", "#5a3a22");
    celBody([[cx - 11, 48], [cx + 11, 48], [cx + 13, 82], [cx - 13, 82]], "#356ab8");
    armSleeve("#2f5aa0", "#d8a070");
    rrect(cx - 13, 78, 26, 5, 2, "#4a3018", 1.8);
    path([[cx - 12, 46], [cx - 4, 44], [cx - 6, 52]], "#c0432a", 1.6);
    path([[cx + 12, 46], [cx + 4, 44], [cx + 6, 52]], "#c0432a", 1.6);
    drawFace();
    spikyHair("#e8802a");
  } else {
    // CURANDEIRA — manto claro com sobrepeliz, cabelo comprido
    const robe = [[cx - 11, 46], [cx + 11, 46], [cx + 18, 116], [cx - 18, 116]];
    path(robe, "#dcd6c6", 2.2);
    clipFill(robe, "rgba(0,0,0,0.12)");
    rrect(cx - 18, 112, 36, 5, 2, "#c05a86", 1.6);
    path([[cx - 5, 46], [cx + 5, 46], [cx + 3, 74], [cx - 3, 74]], "#c05a86", 1.4);
    path([[cx - 11, 48], [cx - 19, 58], [cx - 15, 82], [cx - 9, 74]], "#dcd6c6", 2);
    path([[cx + 11, 48], [cx + 19, 58], [cx + 15, 82], [cx + 9, 74]], "#dcd6c6", 2);
    disc(cx - 15, 84, 3.4, skin, 1.6);
    disc(cx + 15, 84, 3.4, skin, 1.6);
    drawFace();
    const hc = "#7a4a2a";
    path([[cx - hr - 2, hy - 4], [cx - hr - 3, hy + 26], [cx - 5, hy + 20], [cx - 4, hy]], hc, 2);
    path([[cx + hr + 2, hy - 4], [cx + hr + 3, hy + 26], [cx + 5, hy + 20], [cx + 4, hy]], hc, 2);
    ctx.beginPath();
    ctx.arc(cx, hy - 1, hr + 1, Math.PI * 0.92, Math.PI * 2.08);
    ctx.lineTo(cx + hr - 1, hy + 1);
    ctx.lineTo(cx + 7, hy - 2);
    ctx.lineTo(cx + 4, hy + 1);
    ctx.lineTo(cx + 1, hy - 3);
    ctx.lineTo(cx - 2, hy + 1);
    ctx.lineTo(cx - 5, hy - 2);
    ctx.lineTo(cx - hr + 1, hy + 1);
    ctx.closePath();
    ctx.fillStyle = hc;
    ctx.fill();
    ctx.strokeStyle = OUT;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  return toSprite(c);
}

// -------- porta/arco da masmorra (pedra com vão escuro) --------
export function dungeonArch(): THREE.Texture {
  const W = 96;
  const H = 128;
  const { c, ctx } = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  // moldura de pedra
  ctx.fillStyle = "#6a6660";
  roundRect(ctx, 4, 6, W - 8, H - 6, 4);
  ctx.fill();
  // blocos da moldura
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 1.5;
  for (let y = 14; y < H; y += 16) {
    ctx.beginPath();
    ctx.moveTo(6, y);
    ctx.lineTo(20, y);
    ctx.moveTo(W - 20, y);
    ctx.lineTo(W - 6, y);
    ctx.stroke();
  }
  // vão em arco escuro
  const ax = W / 2;
  const openW = 30;
  ctx.fillStyle = "#080607";
  ctx.beginPath();
  ctx.moveTo(ax - openW, H);
  ctx.lineTo(ax - openW, 46);
  ctx.arc(ax, 46, openW, Math.PI, 0);
  ctx.lineTo(ax + openW, H);
  ctx.closePath();
  ctx.fill();
  // degraus descendo (sugestão)
  ctx.fillStyle = "rgba(60,58,54,0.5)";
  for (let i = 0; i < 4; i++)
    ctx.fillRect(ax - openW + 4 + i * 3, H - 8 - i * 5, (openW - 4 - i * 3) * 2, 3);
  // pedra-chave no topo do arco
  ctx.fillStyle = "#7c7870";
  roundRect(ctx, ax - 7, 30, 14, 16, 2);
  ctx.fill();
  return toSprite(c);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// -------- placa com o NOME do estabelecimento (texto) --------
export function signText(name: string): THREE.Texture {
  const W = 160;
  const H = 56;
  const { c, ctx } = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  // tábua de madeira
  ctx.fillStyle = "#33220f";
  roundRect(ctx, 2, 2, W - 4, H - 4, 6);
  ctx.fill();
  ctx.fillStyle = "#59401f";
  roundRect(ctx, 6, 6, W - 12, H - 12, 5);
  ctx.fill();
  // grão
  ctx.strokeStyle = "rgba(30,18,8,0.35)";
  ctx.lineWidth = 1;
  for (let y = 12; y < H - 8; y += 6) {
    ctx.beginPath();
    ctx.moveTo(10, y);
    ctx.lineTo(W - 10, y + 1);
    ctx.stroke();
  }
  // parafusos nos cantos
  ctx.fillStyle = "#2a1a0a";
  for (const [px, py] of [
    [12, 12],
    [W - 12, 12],
    [12, H - 12],
    [W - 12, H - 12],
  ]) {
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  // texto (ajusta o tamanho p/ caber)
  let fs = 26;
  ctx.fillStyle = "#f2dda0";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${fs}px Georgia, "Times New Roman", serif`;
  while (ctx.measureText(name).width > W - 22 && fs > 10) {
    fs -= 1;
    ctx.font = `bold ${fs}px Georgia, "Times New Roman", serif`;
  }
  ctx.strokeStyle = "rgba(0,0,0,0.55)";
  ctx.lineWidth = 3;
  ctx.strokeText(name, W / 2, H / 2 + 1);
  ctx.fillText(name, W / 2, H / 2 + 1);
  return toSprite(c);
}

// -------- rocha da montanha (áspera, cinza-marrom) --------
export function rock(seed = 41): THREE.Texture {
  const W = 96;
  const H = 96;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  // base ruidosa
  for (let y = 0; y < H; y += 2)
    for (let x = 0; x < W; x += 2) {
      const g = 78 + Math.floor(r() * 34);
      ctx.fillStyle = `rgb(${g},${(g * 0.94) | 0},${(g * 0.84) | 0})`;
      ctx.fillRect(x, y, 2, 2);
    }
  // facetas de rocha (polígonos com sombra)
  for (let i = 0; i < 26; i++) {
    const ox = r() * W;
    const oy = r() * H;
    const rad = 10 + r() * 16;
    const sh = r() < 0.5 ? 0.22 : -0.18;
    ctx.fillStyle = sh > 0 ? `rgba(0,0,0,${sh})` : `rgba(255,250,240,${-sh})`;
    ctx.beginPath();
    const n = 4 + ((r() * 3) | 0);
    for (let s = 0; s <= n; s++) {
      const a = (s / n) * Math.PI * 2 + r() * 0.3;
      const rr = rad * (0.7 + r() * 0.4);
      const px = ox + Math.cos(a) * rr;
      const py = oy + Math.sin(a) * rr * 0.8;
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }
  // fissuras
  ctx.strokeStyle = "rgba(20,16,12,0.5)";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    let x = r() * W;
    let y = r() * H;
    ctx.moveTo(x, y);
    for (let s = 0; s < 5; s++) {
      x += (r() - 0.5) * 26;
      y += (r() - 0.5) * 26;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return toTex(c);
}

// -------- chão de masmorra (lajes escuras) --------
export function dungeonFloor(seed = 43): THREE.Texture {
  const W = 96;
  const H = 96;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  ctx.fillStyle = "#161514";
  ctx.fillRect(0, 0, W, H);
  const t = 32;
  for (let gy = 0; gy < H; gy += t)
    for (let gx = 0; gx < W; gx += t) {
      const g = 40 + Math.floor(r() * 20);
      ctx.fillStyle = `rgb(${g},${(g * 0.98) | 0},${(g * 0.94) | 0})`;
      ctx.fillRect(gx + 2, gy + 2, t - 4, t - 4);
      ctx.fillStyle = "rgba(0,0,0,0.4)"; // rejunte/sombra
      ctx.fillRect(gx + 2, gy + t - 4, t - 4, 2);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(gx + 2, gy + 2, t - 4, 1);
      // rachaduras ocasionais
      if (r() < 0.3) {
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gx + 6 + r() * 10, gy + 6);
        ctx.lineTo(gx + 8 + r() * 12, gy + t - 6);
        ctx.stroke();
      }
    }
  return toTex(c);
}

// -------- parede/teto de masmorra (blocos escuros com musgo) --------
export function dungeonWall(seed = 47): THREE.Texture {
  const W = 96;
  const H = 96;
  const { c, ctx } = makeCanvas(W, H);
  const r = rnd(seed);
  ctx.fillStyle = "#0f0e0d";
  ctx.fillRect(0, 0, W, H);
  const bh = 18;
  for (let gy = 0, row = 0; gy < H; gy += bh, row++) {
    const off = row % 2 ? 18 : 0;
    for (let gx = -18; gx < W; gx += 36) {
      const x = gx + off;
      const g = 44 + Math.floor(r() * 20);
      ctx.fillStyle = `rgb(${(g * 0.9) | 0},${g},${(g * 0.86) | 0})`;
      ctx.fillRect(x + 1, gy + 1, 34, bh - 2);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(x + 1, gy + bh - 3, 34, 2);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(x + 1, gy + 1, 34, 1);
      // musgo
      if (r() < 0.35) {
        ctx.fillStyle = `rgba(70,90,50,${0.18 + r() * 0.2})`;
        ctx.beginPath();
        ctx.ellipse(x + 6 + r() * 20, gy + 4 + r() * 8, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  return toTex(c);
}
