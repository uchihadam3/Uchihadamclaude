import { SKINS } from '../src/game/skins';
import { drawCap, RARITY_COLOR, RARITY_ORDER } from '../src/render/capart';

const sorted = [...SKINS].sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity));
const cols = 8, size = 168, pad = 16, labelH = 34;
const rows = Math.ceil(sorted.length / cols);
const W = cols * (size + pad) + pad, H = rows * (size + labelH) + pad + 10;
const cv = document.createElement('canvas'); cv.width = W; cv.height = H; cv.id = 'g'; document.body.appendChild(cv);
const c = cv.getContext('2d')!; c.fillStyle = '#241812'; c.fillRect(0, 0, W, H);
sorted.forEach((s, i) => {
  const cxi = i % cols, cyi = Math.floor(i / cols);
  const x = pad + cxi * (size + pad), y = pad + cyi * (size + labelH);
  c.save(); c.shadowColor = 'rgba(0,0,0,0.5)'; c.shadowBlur = 10; c.shadowOffsetY = 4;
  c.drawImage(drawCap(s.art, 320), x, y, size, size); c.restore();
  c.fillStyle = RARITY_COLOR[s.rarity]; c.beginPath(); c.arc(x + size - 12, y + 12, 7, 0, 7); c.fill();
  c.fillStyle = '#fff'; c.font = 'bold 14px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(s.name, x + size / 2, y + size + 15);
});
(window as any).__ready = true;
