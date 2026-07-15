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

// -------- aldeão (sprite billboard, fundo transparente) --------
export function villager(seed = 1): THREE.Texture {
  const W = 64;
  const H = 112;
  const { c, ctx } = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  const r = rnd(seed);
  const robes = ["#6b5030", "#4a5a68", "#5a4448", "#3f5540", "#6a4d5a"];
  const robe = robes[Math.floor(r() * robes.length)];
  const cx = W / 2;
  // sombra no chão
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(cx, H - 5, 16, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  // manto (corpo trapezoidal)
  ctx.fillStyle = robe;
  ctx.beginPath();
  ctx.moveTo(cx - 9, 44);
  ctx.lineTo(cx + 9, 44);
  ctx.lineTo(cx + 20, H - 8);
  ctx.lineTo(cx - 20, H - 8);
  ctx.closePath();
  ctx.fill();
  // sombra lateral do manto (volume)
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.moveTo(cx, 44);
  ctx.lineTo(cx + 9, 44);
  ctx.lineTo(cx + 20, H - 8);
  ctx.lineTo(cx, H - 8);
  ctx.closePath();
  ctx.fill();
  // cinto
  ctx.fillStyle = "rgba(40,26,12,0.8)";
  ctx.fillRect(cx - 12, 70, 24, 5);
  // capuz / ombros
  ctx.fillStyle = robe;
  ctx.beginPath();
  ctx.moveTo(cx - 15, 52);
  ctx.quadraticCurveTo(cx, 24, cx + 15, 52);
  ctx.closePath();
  ctx.fill();
  // cabeça
  ctx.fillStyle = "#caa17a";
  ctx.beginPath();
  ctx.arc(cx, 34, 10, 0, Math.PI * 2);
  ctx.fill();
  // sombra do capuz sobre o rosto
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.arc(cx, 30, 10, Math.PI, Math.PI * 2);
  ctx.fill();
  // cabelo/capuz topo
  ctx.fillStyle = robe;
  ctx.beginPath();
  ctx.arc(cx, 30, 11, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fill();
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
