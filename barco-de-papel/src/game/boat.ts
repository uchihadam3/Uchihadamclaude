// Controlador do barco de papel: física simplificada guiada pelo flow map da
// água. Frágil — colisões fortes contra margens danificam. Precisa de água para
// flutuar; se encalhar por muito tempo, falha. Chega ao destino → vitória.
import { Grid } from '../sim/grid';
import { SOLID_STONE } from '../sim/grid';

export interface BoatResult { state: 'floating' | 'stuck' | 'destroyed' | 'arrived'; }

export class Boat {
  x = 0; z = 0; vx = 0; vz = 0;
  heading = 0; health = 100; readonly maxHealth = 100;
  bob = 0; stuckT = 0; collideFlash = 0; splash = 0;
  private goal: [number, number] = [0, 0]; private goalR = 1.5;

  // parâmetros
  private floatMin = 0.045;      // água mínima p/ flutuar
  private flowStrength = 9;      // força da correnteza (flow map)
  private gravity = 26;          // deslizamento pela inclinação da água
  private drag = 0.93;
  private maxSpeed = 8.5;
  private stuckLimit = 8.0;      // s sem progresso → falha
  private impactThreshold = 1.6; // acima disso, dano

  spawn(x: number, z: number, goal: [number, number], goalR: number): void {
    this.x = x; this.z = z; this.vx = this.vz = 0; this.heading = 0;
    this.health = 100; this.stuckT = 0; this.collideFlash = 0; this.splash = 0;
    this.goal = goal; this.goalR = goalR;
  }

  update(g: Grid, dt: number): BoatResult {
    this.bob += dt;
    this.collideFlash = Math.max(0, this.collideFlash - dt * 3);
    this.splash = Math.max(0, this.splash - dt * 2);

    const depth = g.waterAt(this.x, this.z);
    if (depth > this.floatMin) {
      // 1) corrente (flow map do autômato) — dá a direção do canal
      const [fx, fz] = g.flowAt(this.x, this.z);
      const push = Math.min(depth, 0.6) * this.flowStrength;
      this.vx += fx * push * dt * 40;
      this.vz += fz * push * dt * 40;
      // 2) gravidade: desliza pela inclinação da SUPERFÍCIE da água (robusto)
      const e = 0.6;
      const surf = (x: number, z: number) => g.terrainAt(x, z) + Math.max(0, g.waterAt(x, z));
      const gx = (surf(this.x + e, this.z) - surf(this.x - e, this.z)) / (2 * e);
      const gz = (surf(this.x, this.z + e) - surf(this.x, this.z - e)) / (2 * e);
      this.vx += -gx * this.gravity * dt;
      this.vz += -gz * this.gravity * dt;
    } else {
      this.vx *= 0.86; this.vz *= 0.86;   // encalhado: arrasto forte
    }
    // temporizador de "sem progresso": encalhado OU parado na água (becalmado)
    if (Math.hypot(this.vx, this.vz) < 0.22) this.stuckT += dt; else this.stuckT = 0;
    this.vx *= this.drag; this.vz *= this.drag;
    const sp = Math.hypot(this.vx, this.vz);
    if (sp > this.maxSpeed) { this.vx *= this.maxSpeed / sp; this.vz *= this.maxSpeed / sp; }

    // colisão com margens: gradiente do terreno acima da lâmina d'água
    const nx = this.x + this.vx * dt, nz = this.z + this.vz * dt;
    const surface = g.terrainAt(this.x, this.z) + Math.max(depth, 0);
    const ahead = g.terrainAt(nx, nz);
    if (ahead > surface + 0.14 && sp > 0.15) {
      // normal da parede (sobe) via gradiente
      const e = 0.4;
      const gx = g.terrainAt(this.x + e, this.z) - g.terrainAt(this.x - e, this.z);
      const gz = g.terrainAt(this.x, this.z + e) - g.terrainAt(this.x, this.z - e);
      let nlen = Math.hypot(gx, gz) || 1; const wnx = -gx / nlen, wnz = -gz / nlen;
      const into = -(this.vx * wnx + this.vz * wnz);           // quanto avança contra a parede
      const [ci, cj] = g.worldToCell(nx, nz);
      const stone = g.inb(ci, cj) && g.solid[g.idx(ci, cj)] === SOLID_STONE;
      if (into > this.impactThreshold) {
        const dmg = (into - this.impactThreshold) * (stone ? 4 : 14);
        this.health -= dmg; this.collideFlash = 1; this.splash = 1;
      }
      // reflete a velocidade na parede (amortecida; pedra amortece mais)
      const bounce = stone ? 0.25 : 0.45;
      const dot = this.vx * wnx + this.vz * wnz;
      this.vx = (this.vx - 2 * dot * wnx) * bounce;
      this.vz = (this.vz - 2 * dot * wnz) * bounce;
    } else {
      this.x = nx; this.z = nz;
    }

    // orientação segue o movimento
    if (sp > 0.05) { const target = Math.atan2(this.vx, this.vz); this.heading += this.angLerp(this.heading, target, Math.min(1, dt * 4)); }

    if (this.health <= 0) { this.health = 0; return { state: 'destroyed' }; }
    if (Math.hypot(this.x - this.goal[0], this.z - this.goal[1]) < this.goalR) return { state: 'arrived' };
    if (this.stuckT > this.stuckLimit) return { state: 'stuck' };
    return { state: 'floating' };
  }

  private angLerp(a: number, b: number, t: number): number {
    let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d * t;
  }
  speed(): number { return Math.hypot(this.vx, this.vz); }
}
