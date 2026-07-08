// GameManager — orquestra estados, fases (Planejamento/Execução), vitória e
// falha. Mantém o Grid, o Boat e o ToolSystem; roda a simulação com passo fixo.
import { Grid } from '../sim/grid';
import { stepWater, totalWater, DEFAULT_WATER, WaterParams } from '../sim/water';
import { Boat } from './boat';
import { ToolSystem } from './tools';
import { LEVELS, LevelDef } from './levels';
import { bowl } from './terrainOps';
import { N } from '../sim/grid';
import { record } from './save';

export type GState = 'planning' | 'running' | 'victory' | 'failure' | 'paused';
export type FailReason = 'destroyed' | 'stuck' | 'dry';

export class GameManager {
  grid = new Grid();
  boat = new Boat();
  tools = new ToolSystem();
  state: GState = 'planning';
  levelIndex = 0;
  level!: LevelDef;
  goal: [number, number] = [0, 0]; goalR = 1.5;
  private startBoat: [number, number] = [0, 0];
  timeSec = 0; stars = 0; failReason: FailReason = 'stuck';
  private params: WaterParams = { ...DEFAULT_WATER };
  private acc = 0;
  onChange: () => void = () => {};

  loadLevel(id: number): void {
    this.levelIndex = id; this.level = LEVELS[id];
    const g = this.grid;
    g.terrain.fill(0); g.water.fill(0); g.waterBuf.fill(0);
    g.flowX.fill(0); g.flowZ.fill(0); g.shaded.fill(0); g.evap.fill(0);
    g.solid.fill(0); g.source.fill(0); g.drain.fill(0); g.dirty = true;
    const gl = this.level.build(g);
    // bacias suaves na nascente e no destino → poças bonitas de partida/chegada
    let sx = 0, sz = 0, sn = 0;
    for (let k = 0; k < N * N; k++) if (g.source[k]) { const i = k % N, j = (k / N) | 0; const [wx, wz] = g.cellToWorld(i, j); sx += wx; sz += wz; sn++; }
    if (sn) { bowl(g, sx / sn, sz / sn, 2.2, 0.5); }
    bowl(g, gl.goal[0], gl.goal[1], 2.6, 0.55);
    // escoadouro no coração da chegada: puxa a correnteza para o destino
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const [wx, wz] = g.cellToWorld(i, j);
      if (Math.hypot(wx - gl.goal[0], wz - gl.goal[1]) <= 1.5) g.drain[g.idx(i, j)] = 1;
    }
    this.startBoat = gl.boat; this.goal = gl.goal; this.goalR = gl.goalR;
    this.tools.setBudget(this.level.tools);
    this.tools.active = 'coco'; this.tools.cocoMode = 'lower';
    this.boat.spawn(gl.boat[0], gl.boat[1], gl.goal, gl.goalR);
    this.timeSec = 0; this.state = 'planning';
    this.onChange();
  }

  startRun(): void {
    if (this.state !== 'planning') return;
    this.grid.reset();
    this.boat.spawn(this.startBoat[0], this.startBoat[1], this.goal, this.goalR);
    this.timeSec = 0; this.acc = 0; this.state = 'running';
    this.onChange();
  }

  backToPlanning(): void {           // tentar de novo mantendo o terreno
    this.grid.reset();
    this.boat.spawn(this.startBoat[0], this.startBoat[1], this.goal, this.goalR);
    this.state = 'planning'; this.onChange();
  }
  restartLevel(): void { this.loadLevel(this.levelIndex); }
  nextLevel(): boolean { if (this.levelIndex + 1 < LEVELS.length) { this.loadLevel(this.levelIndex + 1); return true; } return false; }

  pause(): void { if (this.state === 'running') { this.state = 'paused'; this.onChange(); } }
  resume(): void { if (this.state === 'paused') { this.state = 'running'; this.onChange(); } }

  update(dt: number): void {
    if (this.state !== 'running') return;
    this.timeSec += dt;
    // simulação de água com passo fixo (estabilidade)
    this.acc += dt; const FIXED = 1 / 60; let steps = 0;
    while (this.acc >= FIXED && steps < 4) { stepWater(this.grid, this.params, FIXED); this.acc -= FIXED; steps++; }
    if (steps === 0) { stepWater(this.grid, this.params, dt); this.acc = 0; }

    const r = this.boat.update(this.grid, dt);
    if (r.state === 'arrived') return this.win();
    if (r.state === 'destroyed') return this.fail('destroyed');
    if (r.state === 'stuck') {
      // se ainda há água significativa, considera "preso"; se secou, "seca"
      this.fail(totalWater(this.grid) < 0.4 ? 'dry' : 'stuck');
    }
  }

  private win(): void {
    const h = this.boat.health, t = this.timeSec, par = this.level.parSec;
    let s = 1;
    if (h > 40 || t < par * 1.4) s = 2;
    if (h > 75 && t < par) s = 3;
    this.stars = s;
    record(this.levelIndex, s, t);
    this.state = 'victory'; this.onChange();
  }
  private fail(reason: FailReason): void { this.failReason = reason; this.state = 'failure'; this.onChange(); }
}
