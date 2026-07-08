// Deformação de terreno e "pintura" de sólidos no grid. Tudo opera nos dados
// (Grid), com brush circular de queda suave. A malha é remesh-ada pelo render
// quando g.dirty fica verdadeiro.
import { Grid, N, CELL, SOLID_SAND, SOLID_STONE, SOLID_BAMBOO } from '../sim/grid';

const MIN_H = 0.2, MAX_H = 4.0;

// brush circular: eleva (dir>0) ou rebaixa (dir<0) o terreno
export function brush(g: Grid, x: number, z: number, radius: number, strength: number, dir: number): void {
  const [ci, cj] = g.worldToCell(x, z);
  const cr = Math.ceil(radius / CELL) + 1;
  for (let dj = -cr; dj <= cr; dj++) for (let di = -cr; di <= cr; di++) {
    const i = ci + di, j = cj + dj; if (!g.inb(i, j)) continue;
    const [wx, wz] = g.cellToWorld(i, j);
    const d = Math.hypot(wx - x, wz - z); if (d > radius) continue;
    const fall = 0.5 + 0.5 * Math.cos((d / radius) * Math.PI); // 1 no centro → 0 na borda
    const k = g.idx(i, j);
    if (g.solid[k] === SOLID_STONE) continue;                  // pedra não deforma
    g.terrain[k] = Math.max(MIN_H, Math.min(MAX_H, g.terrain[k] + dir * strength * fall));
  }
  // cavar suaviza de leve: o vale escavado se funde com o canal em vez de virar
  // um poço de paredes íngremes (onde a água ficaria presa). Também deixa o
  // relevo mais orgânico e agradável de esculpir.
  if (dir < 0) smooth(g, x, z, radius + CELL, 0.22);
  g.dirty = true;
}

// suavização leve (blur) numa área — ajuda o fluxo a ficar natural
export function smooth(g: Grid, x: number, z: number, radius: number, amount = 0.5): void {
  const [ci, cj] = g.worldToCell(x, z);
  const cr = Math.ceil(radius / CELL) + 1;
  const src = g.terrain.slice();
  for (let dj = -cr; dj <= cr; dj++) for (let di = -cr; di <= cr; di++) {
    const i = ci + di, j = cj + dj; if (!g.inb(i, j)) continue;
    const [wx, wz] = g.cellToWorld(i, j);
    if (Math.hypot(wx - x, wz - z) > radius) continue;
    let sum = 0, n = 0;
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
      const ii = i + a, jj = j + b; if (!g.inb(ii, jj)) continue; sum += src[g.idx(ii, jj)]; n++;
    }
    const k = g.idx(i, j);
    g.terrain[k] = src[k] * (1 - amount) + (sum / n) * amount;
  }
  g.dirty = true;
}

// escava uma bacia suave (nascente / destino) para a água formar poça
export function bowl(g: Grid, x: number, z: number, radius: number, depth: number): void {
  const [ci, cj] = g.worldToCell(x, z); const cr = Math.ceil(radius / CELL) + 1;
  for (let dj = -cr; dj <= cr; dj++) for (let di = -cr; di <= cr; di++) {
    const i = ci + di, j = cj + dj; if (!g.inb(i, j)) continue;
    const [wx, wz] = g.cellToWorld(i, j); const d = Math.hypot(wx - x, wz - z); if (d > radius) continue;
    const fall = 0.5 + 0.5 * Math.cos((d / radius) * Math.PI);
    const k = g.idx(i, j); g.terrain[k] = Math.max(MIN_H, g.terrain[k] - depth * fall);
  }
  g.dirty = true;
}

// pinta uma célula de bambu (canaleta: rebaixa levemente + conduz + não evapora)
export function paintBamboo(g: Grid, x: number, z: number): boolean {
  const [i, j] = g.worldToCell(x, z); if (!g.inb(i, j)) return false;
  const k = g.idx(i, j); if (g.solid[k] === SOLID_BAMBOO) return false;
  // corta FUNDO ao atravessar rocha (abre a represa); em areia, rebaixa de leve.
  const cut = g.solid[k] === SOLID_STONE ? 1.0 : 0.3;
  g.solid[k] = SOLID_BAMBOO; g.shaded[k] = 1;
  g.terrain[k] = Math.max(MIN_H, g.terrain[k] - cut);    // calha: rebaixa + conduz
  g.dirty = true; return true;
}

// pinta uma pedra (obstáculo que freia o fluxo e amortece o barco)
export function paintStone(g: Grid, x: number, z: number): boolean {
  const [i, j] = g.worldToCell(x, z); if (!g.inb(i, j)) return false;
  const k = g.idx(i, j); if (g.solid[k] === SOLID_STONE) return false;
  g.solid[k] = SOLID_STONE;
  g.terrain[k] = Math.min(MAX_H, g.terrain[k] + 0.18);
  g.dirty = true; return true;
}

// pinta sombra (folha de palmeira) numa área pequena → sem evaporação
export function paintShade(g: Grid, x: number, z: number, radius = 1.6): number {
  const [ci, cj] = g.worldToCell(x, z);
  const cr = Math.ceil(radius / CELL) + 1; let added = 0;
  for (let dj = -cr; dj <= cr; dj++) for (let di = -cr; di <= cr; di++) {
    const i = ci + di, j = cj + dj; if (!g.inb(i, j)) continue;
    const [wx, wz] = g.cellToWorld(i, j);
    if (Math.hypot(wx - x, wz - z) > radius) continue;
    const k = g.idx(i, j); if (!g.shaded[k]) { g.shaded[k] = 1; added++; }
  }
  return added;
}
