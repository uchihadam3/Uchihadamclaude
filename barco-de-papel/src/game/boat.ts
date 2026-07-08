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
  private bestDist = Infinity;   // menor distância à chegada já alcançada
  private noImproveT = 0;        // tempo sem se aproximar da chegada (teto duro)
  private sampleT = 0; private sampledDepth = 0; private rising = false;  // poça enchendo?

  // parâmetros
  private floatMin = 0.04;       // água mínima p/ flutuar
  private flowStrength = 9;      // força da correnteza (flow map)
  private gravity = 26;          // deslizamento pela inclinação da água
  private drag = 0.93;
  private maxSpeed = 8.5;
  private seek = 4.8;            // atração ao escoadouro: cavalga a água que avança
  private stuckLimit = 14.0;     // s sem progresso → falha (travessia longa)
  private impactThreshold = 1.6; // acima disso, dano

  spawn(x: number, z: number, goal: [number, number], goalR: number): void {
    this.x = x; this.z = z; this.vx = this.vz = 0; this.heading = 0;
    this.health = 100; this.stuckT = 0; this.collideFlash = 0; this.splash = 0;
    this.goal = goal; this.goalR = goalR;
    this.bestDist = Math.hypot(x - goal[0], z - goal[1]);
    this.noImproveT = 0; this.sampleT = 0; this.sampledDepth = 0; this.rising = false;
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
      // 3) atração suave rumo ao escoadouro (chegada): mantém o barco seguindo
      // a saída mesmo em água parada (poça/lago), sem sobrepor a correnteza.
      // Se rumo à chegada houver MARGEM SECA (terra acima da lâmina), desliza por
      // ela seguindo o canal molhado; calhas SUBMERSAS o barco cruza normalmente.
      // Precisa de água p/ agir → evaporação ainda barra o caminho.
      let sx = this.goal[0] - this.x, sz = this.goal[1] - this.z;
      const sl = Math.hypot(sx, sz) || 1; sx /= sl; sz /= sl;
      const surfHere = g.terrainAt(this.x, this.z) + depth;
      if (g.terrainAt(this.x + sx, this.z + sz) > surfHere + 0.05) {  // margem seca à frente
        const te = 0.5;
        const tgx = g.terrainAt(this.x + te, this.z) - g.terrainAt(this.x - te, this.z);
        const tgz = g.terrainAt(this.x, this.z + te) - g.terrainAt(this.x, this.z - te);
        const tl = Math.hypot(tgx, tgz);
        if (tl > 1e-4) {
          const ux = tgx / tl, uz = tgz / tl;      // normal do terreno (aponta p/ cima)
          const into = sx * ux + sz * uz;
          if (into > 0) { sx -= into * ux; sz -= into * uz; }   // desliza pela margem seca
        }
      }
      this.vx += sx * this.seek * dt;
      this.vz += sz * this.seek * dt;
    } else {
      this.vx *= 0.86; this.vz *= 0.86;   // encalhado: arrasto forte
    }
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
    const dGoal = Math.hypot(this.x - this.goal[0], this.z - this.goal[1]);
    if (dGoal < this.goalR) return { state: 'arrived' };
    // "sem progresso": só conta quando o barco não se aproxima da chegada E a
    // poça sob ele não está enchendo. Com a atração ao escoadouro o barco segue
    // qualquer caminho molhado; enquanto espera na frente d'água que sobe (poça
    // enchendo, prestes a transbordar) não falha; só falha quando barra de vez —
    // terra seca à frente e sem água nova chegando (evaporou/secou).
    const depthNow = g.waterAt(this.x, this.z);
    this.sampleT += dt;
    if (this.sampleT >= 0.5) { this.rising = depthNow > this.sampledDepth + 0.012; this.sampledDepth = depthNow; this.sampleT = 0; }
    const improving = dGoal < this.bestDist - 0.05;
    if (improving) { this.bestDist = dGoal; this.noImproveT = 0; } else this.noImproveT += dt;
    if (improving || this.rising) this.stuckT = 0; else this.stuckT += dt;
    // falha por becalmo curto (sem água à frente) OU teto duro sem se aproximar
    // (barrado de vez: mesmo com a poça subindo, se não avança há muito, desiste).
    if (this.stuckT > this.stuckLimit || this.noImproveT > 26) return { state: 'stuck' };
    return { state: 'floating' };
  }

  private angLerp(a: number, b: number, t: number): number {
    let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d * t;
  }
  speed(): number { return Math.hypot(this.vx, this.vz); }
}
