// GameManager — a partida por turnos. Cuida da ordem dos jogadores, dos 3
// petelecos por turno, das regras (fora/buraco/bomba/+3/10/chegada), do ranking
// e da vitória. Roda a simulação até tudo parar entre um peteléco e outro.
import { Cap, V, makeCap, vec, norm, mul, MAX_POWER, DEFAULT_STATS } from '../engine/core';
import { TrackModel, TrackDef } from '../engine/track';
import { stepWorld, anyMoving, SimEvent } from '../engine/physics';
import { aiFlick } from './ai';
import { skinById } from './skins';

export type Phase = 'aim' | 'resolve' | 'over';
export interface PlayerDef { name: string; isAI: boolean; ai?: string; skin: string; }

export class GameManager {
  caps: Cap[] = [];
  track!: TrackModel;
  current = 0;               // índice do cap ativo
  phase: Phase = 'aim';
  finishOrder: Cap[] = [];
  turnNo = 0;
  onEvent: (e: SimEvent) => void = () => {};
  onChange: () => void = () => {};
  onToast: (msg: string, kind?: string) => void = () => {};
  onFlick: (cap: Cap, power: number) => void = () => {};
  private acc = 0;
  private aiTimer = 0; private aiFired = false;
  lastFlickOut = false;

  setup(def: TrackDef, players: PlayerDef[]): void {
    this.track = new TrackModel(def);
    this.caps = players.map((pl, i) => {
      const sk = skinById(pl.skin);
      const c = makeCap(i, pl.name, pl.skin, { ...DEFAULT_STATS, ...sk.stats }, pl.isAI, pl.ai);
      return c;
    });
    // larga TODO MUNDO na MESMA linha de largada (lado a lado), sem ninguém atrás:
    // sem desvantagem de posição. Espaça na largura do corredor (largo na largada).
    const s = def.start; const ang = def.startAngle;
    const fwd = { x: Math.cos(ang), y: Math.sin(ang) };        // direção da pista
    const side = { x: -Math.sin(ang), y: Math.cos(ang) };      // perpendicular
    const half0 = def.half[0];
    const n = this.caps.length;
    const spacing = n > 1 ? Math.min(1.95, (2 * (half0 - 1.0)) / (n - 1)) : 0;
    this.caps.forEach((c, i) => {
      const across = (i - (n - 1) / 2) * spacing;             // centralizado na linha
      const along = 1.2;                                       // todos à mesma distância da linha
      c.pos = vec(s.x + fwd.x * along + side.x * across, s.y + fwd.y * along + side.y * across);
      c.cpPos = vec(c.pos.x, c.pos.y); c.turnStart = vec(c.pos.x, c.pos.y);
      c.progress = this.track.progressOf(c.pos); c.checkpoint = 0;
    });
    this.finishOrder = []; this.current = 0; this.turnNo = 1; this.phase = 'aim';
    this.beginTurn(true);
    this.onChange();
  }

  activeCap(): Cap { return this.caps[this.current]; }

  private beginTurn(first = false): void {
    // pula quem terminou ou está de castigo
    let guard = 0;
    while (guard++ < this.caps.length + 2) {
      const c = this.caps[this.current];
      if (!c) break;
      if (c.finished) { this.advanceIndex(); continue; }
      if (c.skipTurns > 0) { c.skipTurns--; this.onToast(`${c.name} perdeu o turno`, 'bad'); this.advanceIndex(); continue; }
      break;
    }
    const c = this.caps[this.current];
    if (!c) return;
    c.flicksLeft = 3; c.bonusFlicks = 0; c.special10 = false; c.consumed.clear();
    c.turnStart = vec(c.pos.x, c.pos.y);
    this.phase = 'aim'; this.aiTimer = 0; this.aiFired = false;
    if (!first) this.turnNo++;
    if (!c.isAI) this.onToast('Sua vez, ' + c.name, 'turn');
    this.onChange();
  }

  private advanceIndex(): void { this.current = (this.current + 1) % this.caps.length; }

  canFlick(): boolean { return this.phase === 'aim' && this.activeCap().flicksLeft > 0; }

  // dispara um peteléco (dir normalizado, força 0..1)
  flick(dir: V, power: number): void {
    if (!this.canFlick()) return;
    const c = this.activeCap();
    const d = norm(dir); const sp = Math.max(0.06, Math.min(1, power)) * MAX_POWER;
    // p/ onde cada cap volta se sair da pista neste peteléco
    for (const o of this.caps) o.resetTo = vec(o.pos.x, o.pos.y);
    c.resetTo = vec(c.turnStart.x, c.turnStart.y);
    c.preFlick = vec(c.pos.x, c.pos.y);
    c.vel = mul(d, sp); c.moving = true;
    this.lastFlickOut = false;
    this.phase = 'resolve'; this.acc = 0;
    this.onFlick(c, power);
    this.onChange();
  }

  update(dt: number): void {
    if (this.phase === 'over') return;
    if (this.phase === 'aim') {
      const c = this.activeCap();
      if (c.isAI) {
        this.aiTimer += dt;
        if (!this.aiFired && this.aiTimer > 0.85) {
          this.aiFired = true;
          const f = aiFlick(c, this.caps, this.track);
          this.flick(f.dir, f.power);
        }
      }
      return;
    }
    // resolve: passos fixos até tudo parar
    this.acc += dt; const FIXED = 1 / 120; let steps = 0;
    while (this.acc >= FIXED && steps < 12) {
      const evs = stepWorld(this.caps, this.track, FIXED);
      for (const e of evs) this.handleEvent(e);
      this.acc -= FIXED; steps++;
      if (this.phase === 'over') return;
    }
    if (!anyMoving(this.caps)) this.endFlick();
  }

  private handleEvent(e: SimEvent): void {
    const c = this.caps[e.capId];
    switch (e.type) {
      case 'bonus': c.bonusFlicks += (e.n || 1); this.onToast(`+${e.n} peteléco${(e.n || 1) > 1 ? 's' : ''}!`, 'good'); break;
      case 'hole': c.holed = true; this.onToast(`${c.name} caiu no buraco — checkpoint`, 'bad'); break;
      case 'bomb': c.bombed = true; this.onToast(`${c.name} pisou no X — perdeu a vez`, 'bad'); break;
      case 'out': if (c.id === this.current) this.lastFlickOut = true; this.onToast(`${c.name} saiu da pista!`, 'bad'); break;
      case 'finish': this.onFinish(c); break;
    }
    // checkpoints: avança o checkpoint se cruzou um (proximidade)
    this.updateCheckpoint(c);
    this.onEvent(e);
  }

  private updateCheckpoint(c: Cap): void {
    const cps = this.track.def.checkpoints;
    for (let i = c.checkpoint + 1; i < cps.length; i++) {
      if (Math.hypot(c.pos.x - cps[i].x, c.pos.y - cps[i].y) < 4.2) { c.checkpoint = i; c.cpPos = vec(cps[i].x, cps[i].y); }
    }
  }

  private onFinish(c: Cap): void {
    if (this.finishOrder.includes(c)) return;
    c.finished = true; this.finishOrder.push(c); c.place = this.finishOrder.length;
    // corrida decidida no primeiro a cruzar
    if (this.finishOrder.length === 1) { this.finishRace(); }
  }

  private finishRace(): void {
    // classifica: terminados por ordem, resto por progresso
    const rest = this.caps.filter(c => !c.finished).sort((a, b) => b.progress - a.progress);
    let place = this.finishOrder.length;
    for (const c of rest) { c.place = ++place; }
    this.phase = 'over';
    this.onChange();
  }

  private endFlick(): void {
    const c = this.activeCap();
    c.flicksLeft -= 1;
    if (c.holed) { c.holed = false; c.flicksLeft -= 1; }         // buraco custa 1 peteléco a mais
    if (c.bombed) { c.bombed = false; c.flicksLeft = 0; }        // bomba: perde o resto do turno
    if (c.bonusFlicks > 0) { c.flicksLeft += c.bonusFlicks; c.bonusFlicks = 0; }
    c.flicksLeft = Math.max(0, Math.min(c.flicksLeft, 9));
    if (c.flicksLeft > 1) c.turnStart = vec(c.pos.x, c.pos.y);   // último peteléco define novo "seguro"
    if (c.flicksLeft <= 0) { this.advanceIndex(); this.beginTurn(); }
    else { this.phase = 'aim'; this.aiTimer = 0; this.aiFired = false; this.onChange(); }
  }

  // ranking atual (para HUD)
  standings(): Cap[] {
    return [...this.caps].sort((a, b) => {
      const pa = a.finished ? a.place : 999 - a.progress / 1000;
      const pb = b.finished ? b.place : 999 - b.progress / 1000;
      if (a.finished && b.finished) return a.place - b.place;
      if (a.finished) return -1; if (b.finished) return 1;
      return b.progress - a.progress;
    });
  }
  winner(): Cap | null { return this.finishOrder[0] || null; }
}
