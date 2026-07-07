// ============ PINTORES DE ITENS (ferramentas, solos, consumíveis) ============
// base (0,0) no centro; s = tamanho de referência. Estilo alinhado às plantas:
// formas suaves, leve contorno, paleta quente.
type Ctx = CanvasRenderingContext2D;

function rr(ctx: Ctx, x: number, y: number, w: number, h: number, col: string, r = 3): void {
  ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
}
function ol(ctx: Ctx, x: number, y: number, w: number, h: number, col: string, r = 3, lw = 1.4): void {
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.stroke();
}
function circ(ctx: Ctx, x: number, y: number, r: number, col: string): void {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function line(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, col: string, w: number): void {
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
}
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16); let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt >= 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; } else { r *= 1 + amt; g *= 1 + amt; b *= 1 + amt; }
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${((c(r) << 16) | (c(g) << 8) | c(b)).toString(16).padStart(6, '0')}`;
}
const OUT = '#5a4a30';

// ---------- REGADOR ----------
function wateringCan(ctx: Ctx, s: number, body: string, spoutLong: boolean): void {
  const d = shade(body, -0.28), l = shade(body, 0.25);
  // corpo
  ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, s * 0.05, s * 0.24, s * 0.2, 0, 0, Math.PI * 2); ctx.fill();
  rr(ctx, -s * 0.24, -s * 0.12, s * 0.48, s * 0.3, body, 6);
  ctx.fillStyle = l; ctx.beginPath(); ctx.ellipse(-s * 0.06, -s * 0.04, s * 0.1, s * 0.13, 0, 0, Math.PI * 2); ctx.fill();
  // alça superior
  ctx.strokeStyle = d; ctx.lineWidth = s * 0.05; ctx.beginPath(); ctx.arc(0, -s * 0.14, s * 0.16, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
  // bico
  const sx = s * 0.22, sy = -s * 0.02;
  line(ctx, sx, sy, sx + (spoutLong ? s * 0.3 : s * 0.18), sy - (spoutLong ? s * 0.22 : s * 0.14), d, s * 0.07);
  const ex = sx + (spoutLong ? s * 0.3 : s * 0.18), ey = sy - (spoutLong ? s * 0.22 : s * 0.14);
  ctx.fillStyle = shade(body, 0.1); ctx.beginPath(); ctx.moveTo(ex - s * 0.02, ey - s * 0.05); ctx.lineTo(ex + s * 0.08, ey - s * 0.02); ctx.lineTo(ex + s * 0.02, ey + s * 0.05); ctx.closePath(); ctx.fill();
  ol(ctx, -s * 0.24, -s * 0.12, s * 0.48, s * 0.3, OUT, 6, 1.2);
}

// ---------- MEDIDOR (mostrador + sonda) ----------
function meter(ctx: Ctx, s: number, dial: string, letter: string): void {
  // sonda
  line(ctx, 0, s * 0.3, 0, s * 0.02, '#9aa0a4', s * 0.05);
  circ(ctx, 0, s * 0.3, s * 0.03, '#7a8084');
  // corpo
  rr(ctx, -s * 0.17, -s * 0.28, s * 0.34, s * 0.32, '#e8e4d8', 5);
  ol(ctx, -s * 0.17, -s * 0.28, s * 0.34, s * 0.32, OUT, 5, 1.2);
  // mostrador
  circ(ctx, 0, -s * 0.12, s * 0.12, dial);
  circ(ctx, 0, -s * 0.12, s * 0.1, '#fff');
  line(ctx, 0, -s * 0.12, s * 0.06, -s * 0.18, shade(dial, -0.3), s * 0.02); // ponteiro
  ctx.fillStyle = shade(dial, -0.4); ctx.font = `bold ${s * 0.12}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(letter, 0, s * 0.005 + s * 0.02);
}

export function drawTool(ctx: Ctx, id: string, s: number): void {
  ctx.save();
  ctx.lineJoin = 'round';
  switch (id) {
    case 'regador-velho': wateringCan(ctx, s, '#b08a5c', false); break;
    case 'regador-medio': wateringCan(ctx, s, '#5f9e6a', false); break;
    case 'regador-preciso': wateringCan(ctx, s, '#5a86c8', true); break;
    case 'borrifador': {
      rr(ctx, -s * 0.1, -s * 0.05, s * 0.2, s * 0.32, '#7fb3d8', 4); // frasco
      ol(ctx, -s * 0.1, -s * 0.05, s * 0.2, s * 0.32, OUT, 4, 1.2);
      rr(ctx, -s * 0.06, -s * 0.2, s * 0.12, s * 0.16, '#4a5560', 3); // gatilho
      line(ctx, -s * 0.06, -s * 0.16, -s * 0.2, -s * 0.2, '#4a5560', s * 0.05);
      line(ctx, s * 0.02, -s * 0.2, s * 0.14, -s * 0.28, '#8a9098', s * 0.04); // bico
      for (let i = 0; i < 4; i++) circ(ctx, s * 0.16 + i * s * 0.03, -s * 0.3 - i * s * 0.02, s * 0.012, '#a8d8f0'); // névoa
      break;
    }
    case 'pa-pequena': case 'pa-jardim': {
      const big = id === 'pa-jardim';
      line(ctx, s * 0.14, s * 0.3, -s * 0.06, -s * 0.08, '#9a6a3a', s * 0.06); // cabo
      rr(ctx, s * 0.1, s * 0.24, s * 0.08, s * 0.1, '#7a4a28', 3);
      ctx.fillStyle = big ? '#b8bcc0' : '#c8ccd0'; ctx.beginPath();
      ctx.moveTo(-s * 0.06, -s * 0.08); ctx.lineTo(-s * 0.22, -s * 0.02); ctx.lineTo(-s * 0.18, s * 0.22); ctx.lineTo(-s * 0.02, s * 0.14); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = OUT; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = '#e0e4e8'; ctx.beginPath(); ctx.moveTo(-s * 0.09, -s * 0.04); ctx.lineTo(-s * 0.17, -s * 0.01); ctx.lineTo(-s * 0.15, s * 0.08); ctx.closePath(); ctx.fill();
      break;
    }
    case 'ancinho': {
      line(ctx, s * 0.16, -s * 0.3, -s * 0.14, s * 0.18, '#9a6a3a', s * 0.06); // cabo
      const bx = -s * 0.14, by = s * 0.18;
      line(ctx, bx - s * 0.18, by, bx + s * 0.14, by - s * 0.02, '#8a8e92', s * 0.04); // barra
      for (let i = -2; i <= 2; i++) line(ctx, bx + i * s * 0.08, by + s * 0.02, bx + i * s * 0.08 - s * 0.02, by + s * 0.16, '#8a8e92', s * 0.035); // dentes
      break;
    }
    case 'tesoura-poda': case 'tesoura-bonsai': {
      const c1 = '#c8ccd0', c2 = '#a8acb0', h = id === 'tesoura-bonsai' ? '#3a5a8a' : '#c84a3a';
      ctx.save(); ctx.rotate(-0.2);
      line(ctx, 0, 0, -s * 0.02, -s * 0.28, c1, s * 0.05); // lâmina 1
      line(ctx, 0, 0, s * 0.06, -s * 0.26, c2, s * 0.05); // lâmina 2
      line(ctx, 0, 0, -s * 0.12, s * 0.24, h, s * 0.06); // cabo 1
      line(ctx, 0, 0, s * 0.14, s * 0.22, h, s * 0.06); // cabo 2
      circ(ctx, 0, 0, s * 0.04, '#6a6e72'); circ(ctx, 0, 0, s * 0.018, '#3a3e42'); // pivô
      ctx.restore();
      break;
    }
    case 'medidor-umidade': meter(ctx, s, '#4aa8d8', '%'); break;
    case 'medidor-ph': meter(ctx, s, '#c86ad0', 'pH'); break;
    case 'medidor-luz': meter(ctx, s, '#f0c040', '☀'); break;
    case 'medidor-nutrientes': meter(ctx, s, '#6ac86a', 'N'); break;
    case 'termometro': {
      rr(ctx, -s * 0.04, -s * 0.3, s * 0.08, s * 0.4, '#e8e4d8', 4); // tubo
      ol(ctx, -s * 0.04, -s * 0.3, s * 0.08, s * 0.4, OUT, 4, 1);
      circ(ctx, 0, s * 0.16, s * 0.08, '#d84040'); // bulbo
      rr(ctx, -s * 0.02, -s * 0.05, s * 0.04, s * 0.2, '#d84040', 2); // coluna
      for (let i = 0; i < 4; i++) line(ctx, s * 0.04, -s * 0.24 + i * s * 0.08, s * 0.08, -s * 0.24 + i * s * 0.08, '#8a8478', 1); // marcas
      break;
    }
    case 'lupa-pragas': {
      ctx.strokeStyle = '#8a6a40'; ctx.lineWidth = s * 0.05; ctx.beginPath(); ctx.arc(-s * 0.04, -s * 0.06, s * 0.16, 0, Math.PI * 2); ctx.stroke();
      circ(ctx, -s * 0.04, -s * 0.06, s * 0.13, 'rgba(180,210,235,0.55)');
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.arc(-s * 0.09, -s * 0.11, s * 0.05, 0, Math.PI * 2); ctx.fill();
      line(ctx, s * 0.08, s * 0.06, s * 0.22, s * 0.24, '#9a6a3a', s * 0.06); // cabo
      circ(ctx, s * 0.02, -s * 0.03, s * 0.02, '#7a4a3a'); circ(ctx, -s * 0.1, -s * 0.1, s * 0.015, '#7a4a3a'); // "praga"
      break;
    }
    case 'luvas': {
      const c = '#e0a878', cf = '#c8905e';
      for (const dx of [-s * 0.12, s * 0.12]) {
        ctx.save(); ctx.translate(dx, 0); if (dx > 0) ctx.scale(-1, 1);
        rr(ctx, -s * 0.1, -s * 0.02, s * 0.16, s * 0.24, c, 5); // palma
        for (let i = 0; i < 3; i++) rr(ctx, -s * 0.09 + i * s * 0.06, -s * 0.16, s * 0.045, s * 0.16, c, 3); // dedos
        rr(ctx, s * 0.04, -s * 0.06, s * 0.06, s * 0.14, c, 3); // polegar
        rr(ctx, -s * 0.1, s * 0.16, s * 0.16, s * 0.06, cf, 2); // punho
        ctx.restore();
      }
      break;
    }
    case 'carrinho': {
      rr(ctx, -s * 0.22, -s * 0.16, s * 0.36, s * 0.18, '#5f9e6a', 4); // caçamba
      ctx.fillStyle = '#4a7a52'; ctx.beginPath(); ctx.moveTo(s * 0.14, -s * 0.16); ctx.lineTo(s * 0.26, -s * 0.05); ctx.lineTo(s * 0.14, s * 0.02); ctx.closePath(); ctx.fill();
      line(ctx, -s * 0.22, s * 0.02, -s * 0.3, s * 0.18, '#7a5a3a', s * 0.04); // perna
      line(ctx, s * 0.14, s * 0.02, s * 0.24, s * 0.02, '#7a5a3a', s * 0.04); // cabo
      circ(ctx, s * 0.06, s * 0.16, s * 0.09, '#3a3e42'); circ(ctx, s * 0.06, s * 0.16, s * 0.04, '#8a8e92'); // roda
      break;
    }
    case 'composteira': {
      rr(ctx, -s * 0.2, -s * 0.14, s * 0.4, s * 0.36, '#4a6a3a', 5); ol(ctx, -s * 0.2, -s * 0.14, s * 0.4, s * 0.36, OUT, 5, 1.2);
      rr(ctx, -s * 0.23, -s * 0.22, s * 0.46, s * 0.1, '#3a5230', 4); // tampa
      for (let i = -1; i <= 1; i++) line(ctx, i * s * 0.1, -s * 0.1, i * s * 0.1, s * 0.18, '#3a5230', s * 0.02); // ripas
      circ(ctx, -s * 0.08, s * 0.02, s * 0.03, '#8a6a3a'); circ(ctx, s * 0.06, s * 0.08, s * 0.025, '#7a5a2a'); // composto
      break;
    }
    case 'coletor-chuva': {
      rr(ctx, -s * 0.18, -s * 0.16, s * 0.36, s * 0.38, '#4a6e8a', 6); ol(ctx, -s * 0.18, -s * 0.16, s * 0.36, s * 0.38, OUT, 6, 1.2);
      ctx.fillStyle = '#5a86a8'; ctx.beginPath(); ctx.ellipse(0, -s * 0.16, s * 0.18, s * 0.05, 0, 0, Math.PI * 2); ctx.fill();
      for (const y of [-s * 0.04, s * 0.1]) line(ctx, -s * 0.18, y, s * 0.18, y, '#3a5670', s * 0.02); // aros
      circ(ctx, s * 0.02, -s * 0.16, s * 0.03, '#a8d0f0'); // gota
      break;
    }
    case 'gotejamento': {
      line(ctx, -s * 0.26, -s * 0.1, s * 0.26, -s * 0.1, '#4a5a4a', s * 0.05); // mangueira
      for (let i = -2; i <= 2; i++) { line(ctx, i * s * 0.11, -s * 0.08, i * s * 0.11, s * 0.02, '#3a4a3a', s * 0.02); circ(ctx, i * s * 0.11, s * 0.1, s * 0.025, '#6ab0e0'); }
      break;
    }
    case 'lampada-crescimento': {
      rr(ctx, -s * 0.2, -s * 0.24, s * 0.4, s * 0.1, '#3a3e46', 3); // luminária
      for (let i = -2; i <= 2; i++) { rr(ctx, i * s * 0.08 - s * 0.02, -s * 0.14, s * 0.04, s * 0.06, '#c86ad0', 2); ctx.fillStyle = 'rgba(200,106,208,0.25)'; ctx.beginPath(); ctx.moveTo(i * s * 0.08, -s * 0.08); ctx.lineTo(i * s * 0.08 - s * 0.06, s * 0.22); ctx.lineTo(i * s * 0.08 + s * 0.06, s * 0.22); ctx.closePath(); ctx.fill(); }
      break;
    }
    case 'ventilador-estufa': {
      ctx.strokeStyle = '#8a8e92'; ctx.lineWidth = s * 0.03; ctx.beginPath(); ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#b8bcc0'; for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.beginPath(); ctx.ellipse(s * 0.08, 0, s * 0.11, s * 0.05, 0.6, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      circ(ctx, 0, 0, s * 0.04, '#6a6e72');
      break;
    }
    case 'umidificador': {
      rr(ctx, -s * 0.14, -s * 0.06, s * 0.28, s * 0.28, '#d8e0e4', 6); ol(ctx, -s * 0.14, -s * 0.06, s * 0.28, s * 0.28, OUT, 6, 1.2);
      circ(ctx, 0, -s * 0.06, s * 0.06, '#a8c8d8');
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = 'rgba(150,200,220,0.6)'; ctx.lineWidth = s * 0.02; ctx.beginPath(); ctx.arc(0, -s * 0.14 - i * s * 0.06, s * 0.05 + i * s * 0.02, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
      break;
    }
    case 'aquecedor-estufa': {
      rr(ctx, -s * 0.16, -s * 0.16, s * 0.32, s * 0.34, '#c8683a', 5); ol(ctx, -s * 0.16, -s * 0.16, s * 0.32, s * 0.34, OUT, 5, 1.2);
      for (let i = -1; i <= 1; i++) line(ctx, i * s * 0.09, -s * 0.1, i * s * 0.09, s * 0.1, '#f0a860', s * 0.03); // grade quente
      circ(ctx, 0, s * 0.02, s * 0.02, '#ffd070');
      break;
    }
    case 'bandeja-propagacao': {
      rr(ctx, -s * 0.24, -s * 0.06, s * 0.48, s * 0.22, '#6a4a2a', 4); ol(ctx, -s * 0.24, -s * 0.06, s * 0.48, s * 0.22, OUT, 4, 1.2);
      for (let i = -2; i <= 2; i++) { circ(ctx, i * s * 0.09, s * 0.02, s * 0.035, '#4a3220'); circ(ctx, i * s * 0.09, -s * 0.01, s * 0.02, '#6aae5a'); } // células com brotos
      break;
    }
    case 'bancada-plantio': {
      rr(ctx, -s * 0.24, -s * 0.08, s * 0.48, s * 0.08, '#9a6a3a', 3); // tampo
      line(ctx, -s * 0.18, 0, -s * 0.18, s * 0.2, '#7a4a28', s * 0.04); line(ctx, s * 0.18, 0, s * 0.18, s * 0.2, '#7a4a28', s * 0.04);
      rr(ctx, -s * 0.2, -s * 0.2, s * 0.16, s * 0.12, '#c8905e', 3); // vaso na bancada
      circ(ctx, -s * 0.06, -s * 0.14, s * 0.04, '#6aae5a');
      break;
    }
    case 'etiquetas': {
      for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-s * 0.12 + i * s * 0.12, i % 2 * s * 0.04); ctx.rotate(-0.1 + i * 0.1);
        rr(ctx, -s * 0.05, -s * 0.2, s * 0.1, s * 0.22, '#e8e4d0', 2); ol(ctx, -s * 0.05, -s * 0.2, s * 0.1, s * 0.22, OUT, 2, 1);
        line(ctx, -s * 0.02, -s * 0.14, s * 0.02, -s * 0.14, '#7a8a4a', s * 0.015); line(ctx, -s * 0.02, -s * 0.1, s * 0.02, -s * 0.1, '#7a8a4a', s * 0.015);
        ctx.fillStyle = '#c8ccd0'; ctx.beginPath(); ctx.moveTo(-s * 0.05, s * 0.02); ctx.lineTo(0, s * 0.08); ctx.lineTo(s * 0.05, s * 0.02); ctx.closePath(); ctx.fill(); ctx.restore(); }
      break;
    }
    case 'oleo-neem': drawConsumable(ctx, 'neem-item', s); break;
    default: { // ferramenta genérica agradável (chave + folha) só como último recurso
      line(ctx, -s * 0.14, s * 0.16, s * 0.12, -s * 0.14, '#8a8e92', s * 0.07);
      circ(ctx, s * 0.14, -s * 0.16, s * 0.06, '#8a8e92'); circ(ctx, s * 0.14, -s * 0.16, s * 0.028, '#3a3e42');
    }
  }
  ctx.restore();
}

// ---------- SOLOS (montinhos com textura característica) ----------
interface SoilLook { base: string; grain: string; extra?: 'pellet' | 'chip' | 'ball' | 'stone' | 'fiber' | 'worm' | 'powder' | 'flake' | 'moss'; ecol?: string; }
const SOIL: Record<string, SoilLook> = {
  'terra-comum': { base: '#6a4a30', grain: '#4a3220' },
  composto: { base: '#4a3420', grain: '#2e2012', extra: 'chip', ecol: '#6a5030' },
  humus: { base: '#3a2a1e', grain: '#241810', extra: 'worm', ecol: '#c88a8a' },
  'areia-grossa': { base: '#d8c090', grain: '#b89860', extra: 'powder' },
  perlita: { base: '#e8e8ea', grain: '#c8c8cc', extra: 'pellet', ecol: '#ffffff' },
  vermiculita: { base: '#b89050', grain: '#8a6a38', extra: 'flake', ecol: '#d8b070' },
  'fibra-coco-solo': { base: '#a87848', grain: '#8a5e34', extra: 'fiber', ecol: '#c89860' },
  turfa: { base: '#5a3826', grain: '#3a2416', extra: 'chip', ecol: '#734830' },
  'casca-pinus': { base: '#a86838', grain: '#7a4820', extra: 'chip', ecol: '#c88850' },
  carvao: { base: '#2a2a2e', grain: '#161618', extra: 'chip', ecol: '#4a4a50' },
  'argila-expandida': { base: '#c86838', grain: '#a04a20', extra: 'ball', ecol: '#e08858' },
  cascalho: { base: '#9a9a96', grain: '#76766e', extra: 'stone', ecol: '#b8b8b2' },
  sphagnum: { base: '#9aae7a', grain: '#78905a', extra: 'moss', ecol: '#b8cc94' },
  calcario: { base: '#e4e2da', grain: '#c4c2b8', extra: 'powder' },
  enxofre: { base: '#e8d048', grain: '#c8ac28', extra: 'powder' },
  'farinha-osso': { base: '#e0dcc8', grain: '#c0bca8', extra: 'powder' },
  bokashi: { base: '#8a6838', grain: '#6a4a24', extra: 'flake', ecol: '#a88850' },
  'sub-orquideas': { base: '#a86838', grain: '#7a4820', extra: 'chip', ecol: '#5a4a3a' },
  'sub-cactos': { base: '#c8a870', grain: '#a08048', extra: 'stone', ecol: '#9a9a96' },
  'sub-mudas': { base: '#5a4230', grain: '#3a2a1c', extra: 'fiber', ecol: '#7a5a3a' },
  'sub-tropical': { base: '#4a3624', grain: '#2e2014', extra: 'chip', ecol: '#6a8a4a' },
  'solo-acido': { base: '#4a3a2e', grain: '#2e2418', extra: 'moss', ecol: '#7a6a4a' },
  'cobertura-morta': { base: '#c8a060', grain: '#a88040', extra: 'fiber', ecol: '#d8b878' },
  'farinha-osso2': { base: '#e0dcc8', grain: '#c0bca8', extra: 'powder' },
};

export function drawSoil(ctx: Ctx, id: string, s: number): void {
  const look = SOIL[id] ?? { base: '#6a4a30', grain: '#4a3220' as string };
  ctx.save();
  // montinho
  ctx.fillStyle = look.base;
  ctx.beginPath();
  ctx.moveTo(-s * 0.3, s * 0.18);
  ctx.bezierCurveTo(-s * 0.28, -s * 0.1, s * 0.28, -s * 0.1, s * 0.3, s * 0.18);
  ctx.closePath(); ctx.fill();
  // base sombreada
  ctx.fillStyle = shade(look.base, -0.2); ctx.beginPath(); ctx.ellipse(0, s * 0.18, s * 0.3, s * 0.06, 0, 0, Math.PI * 2); ctx.fill();
  // topo iluminado
  ctx.fillStyle = shade(look.base, 0.14); ctx.beginPath(); ctx.ellipse(-s * 0.05, -s * 0.02, s * 0.16, s * 0.07, 0.2, 0, Math.PI * 2); ctx.fill();
  // grãos
  let seed = 0; for (const ch of id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const ec = look.ecol ?? look.grain;
  for (let i = 0; i < 16; i++) {
    const x = (rnd() - 0.5) * s * 0.5, y = -s * 0.04 + rnd() * s * 0.2;
    ctx.fillStyle = rnd() > 0.5 ? look.grain : ec;
    const e = look.extra;
    if (e === 'pellet' || e === 'ball') { circ(ctx, x, y, s * (e === 'ball' ? 0.035 : 0.022), ctx.fillStyle as string); }
    else if (e === 'stone') { ctx.beginPath(); ctx.ellipse(x, y, s * 0.04, s * 0.028, rnd(), 0, Math.PI * 2); ctx.fill(); }
    else if (e === 'chip') { ctx.save(); ctx.translate(x, y); ctx.rotate(rnd() * 3); ctx.fillRect(-s * 0.035, -s * 0.015, s * 0.07, s * 0.03); ctx.restore(); }
    else if (e === 'flake') { ctx.save(); ctx.translate(x, y); ctx.rotate(rnd() * 3); ctx.fillRect(-s * 0.03, -s * 0.01, s * 0.06, s * 0.018); ctx.restore(); }
    else if (e === 'fiber') { line(ctx, x - s * 0.04, y, x + s * 0.04, y + (rnd() - 0.5) * s * 0.05, ctx.fillStyle as string, s * 0.014); }
    else if (e === 'moss') { circ(ctx, x, y, s * 0.03, ctx.fillStyle as string); }
    else { circ(ctx, x, y, s * 0.012, ctx.fillStyle as string); } // powder / default
  }
  // detalhe especial: minhoca no húmus
  if (look.extra === 'worm') { ctx.strokeStyle = look.ecol!; ctx.lineWidth = s * 0.04; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s * 0.08, s * 0.06); ctx.quadraticCurveTo(0, -s * 0.02, s * 0.08, s * 0.08); ctx.stroke(); }
  ctx.restore();
}

// ---------- CONSUMÍVEIS (frascos/caixas de fertilizante e tratamento) ----------
const CONS: Record<string, { body: string; cap: string; kind: 'bottle' | 'box' | 'spray' | 'block' | 'scoop'; label?: string }> = {
  'fert-liquido': { body: '#4a86c8', cap: '#2e5a90', kind: 'bottle', label: 'NPK' },
  'fert-lento': { body: '#8a6a3a', cap: '#5a4424', kind: 'box' },
  'fert-floracao': { body: '#d86a9a', cap: '#a03a6a', kind: 'box', label: 'P' },
  'fert-folhagem': { body: '#5aa85a', cap: '#38783a', kind: 'box', label: 'N' },
  'fert-orquideas': { body: '#c86ad0', cap: '#9a3aa0', kind: 'bottle' },
  'fert-cactos': { body: '#d8a848', cap: '#a87820', kind: 'bottle', label: 'K' },
  'composto-item': { body: '#5a3a22', cap: '#3a2414', kind: 'scoop' },
  'torta-mamona': { body: '#a8825a', cap: '#7a5a34', kind: 'block' },
  'neem-item': { body: '#c89840', cap: '#3a6a3a', kind: 'bottle' },
  'oleo-neem': { body: '#c89840', cap: '#3a6a3a', kind: 'bottle' },
  'sabao-inseticida': { body: '#8ad0c8', cap: '#4a9a90', kind: 'spray' },
};

export function drawConsumable(ctx: Ctx, id: string, s: number): void {
  const c = CONS[id] ?? { body: '#7a9a5a', cap: '#4a6a34', kind: 'bottle' as const };
  ctx.save();
  const label = (col: string) => { if (!c.label) return; ctx.fillStyle = col; ctx.font = `bold ${s * 0.12}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(c.label, 0, s * 0.04); };
  if (c.kind === 'bottle') {
    rr(ctx, -s * 0.12, -s * 0.16, s * 0.24, s * 0.36, c.body, 6); ol(ctx, -s * 0.12, -s * 0.16, s * 0.24, s * 0.36, OUT, 6, 1.2);
    rr(ctx, -s * 0.05, -s * 0.26, s * 0.1, s * 0.12, c.cap, 3); // tampa
    rr(ctx, -s * 0.09, -s * 0.02, s * 0.18, s * 0.14, '#f4efe2', 2); // rótulo
    if (id.startsWith('neem') || id.startsWith('oleo')) { ctx.fillStyle = '#4a8a3a'; ctx.beginPath(); ctx.ellipse(0, s * 0.05, s * 0.05, s * 0.03, -0.5, 0, Math.PI * 2); ctx.fill(); } else label(shade(c.body, -0.3));
  } else if (c.kind === 'box') {
    rr(ctx, -s * 0.16, -s * 0.16, s * 0.32, s * 0.34, c.body, 4); ol(ctx, -s * 0.16, -s * 0.16, s * 0.32, s * 0.34, OUT, 4, 1.2);
    rr(ctx, -s * 0.16, -s * 0.16, s * 0.32, s * 0.1, c.cap, 4); // topo
    rr(ctx, -s * 0.1, -s * 0.02, s * 0.2, s * 0.16, '#f4efe2', 2); label(shade(c.body, -0.3));
  } else if (c.kind === 'spray') {
    rr(ctx, -s * 0.1, -s * 0.04, s * 0.2, s * 0.3, c.body, 5); ol(ctx, -s * 0.1, -s * 0.04, s * 0.2, s * 0.3, OUT, 5, 1.2);
    rr(ctx, -s * 0.08, -s * 0.2, s * 0.14, s * 0.16, '#4a5560', 3); line(ctx, -s * 0.08, -s * 0.16, -s * 0.2, -s * 0.2, '#4a5560', s * 0.05);
    for (let i = 0; i < 4; i++) circ(ctx, s * 0.16 + i * s * 0.03, -s * 0.28 - i * s * 0.02, s * 0.012, '#bfeee6');
  } else if (c.kind === 'block') {
    rr(ctx, -s * 0.18, -s * 0.1, s * 0.36, s * 0.26, c.body, 4); ol(ctx, -s * 0.18, -s * 0.1, s * 0.36, s * 0.26, OUT, 4, 1.2);
    ctx.fillStyle = c.cap; for (let i = 0; i < 5; i++) circ(ctx, (Math.random() - 0.5) * s * 0.28, (Math.random() - 0.3) * s * 0.18, s * 0.02, c.cap);
    ctx.strokeStyle = shade(c.body, -0.2); ctx.lineWidth = 1; line(ctx, -s * 0.18, s * 0.02, s * 0.18, s * 0.02, shade(c.body, -0.2), 1);
  } else { // scoop bag
    ctx.fillStyle = c.body; ctx.beginPath(); ctx.moveTo(-s * 0.18, s * 0.2); ctx.lineTo(-s * 0.14, -s * 0.12); ctx.lineTo(s * 0.14, -s * 0.12); ctx.lineTo(s * 0.18, s * 0.2); ctx.closePath(); ctx.fill();
    ol(ctx, -s * 0.16, -s * 0.12, s * 0.32, s * 0.32, OUT, 4, 1.2);
    ctx.fillStyle = c.cap; for (let i = 0; i < 6; i++) circ(ctx, (i / 6 - 0.4) * s * 0.24, -s * 0.13 + Math.sin(i) * s * 0.02, s * 0.02, c.cap); // grumos no topo
  }
  ctx.restore();
}
