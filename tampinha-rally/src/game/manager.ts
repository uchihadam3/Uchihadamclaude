// GameManager — a partida por turnos. Cuida da ordem dos jogadores, dos 3
// petelecos por turno, das regras (fora/buraco/bomba/+3/10/chegada), do ranking
// e da vitória. Roda a simulação até tudo parar entre um peteléco e outro.
import { Cap, V, makeCap, vec, norm, mul, MAX_POWER, DEFAULT_STATS } from '../engine/core';
import { TrackModel, TrackDef } from '../engine/track';
import { stepWorld, anyMoving, SimEvent } from '../engine/physics';
import { aiFlick } from './ai';
import { skinById } from './skins';
import { ITEMS, pickItem } from './chaos';

export type Phase = 'aim' | 'resolve' | 'over';
export interface PlayerDef { name: string; isAI: boolean; ai?: string; skin: string; team?: number; }

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
  onCheckpoint: (cap: Cap, n: number) => void = () => {};
  private acc = 0;
  private aiTimer = 0; private aiFired = false;
  lastFlickOut = false;
  manualControl = false;         // online: os petelecos vêm de fora (nada de IA automática)
  cpArcs: number[] = [];         // posição (arco) de cada checkpoint — registro confiável
  flickCount = 0;                // nº monotônico de petelecos (token do lockstep online)
  chaos = false;                 // MODO CAOS: caixas de power-up ligadas
  teams = 0;                     // DUPLA: nº de times (0 = sem times)
  onItem: (cap: Cap, item: string, used: boolean) => void = () => {};

  setup(def: TrackDef, players: PlayerDef[]): void {
    this.track = new TrackModel(def);
    this.caps = players.map((pl, i) => {
      const sk = skinById(pl.skin);
      const c = makeCap(i, pl.name, pl.skin, { ...DEFAULT_STATS, ...sk.stats }, pl.isAI, pl.ai);
      c.team = pl.team ?? -1;
      return c;
    });
    this.teams = players.some(p => (p.team ?? -1) >= 0) ? new Set(players.map(p => p.team ?? -1)).size : 0;
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
    // arco de cada checkpoint (registro por PROGRESSO, não por proximidade — funciona
    // mesmo com o corredor largo, quando a tampinha cruza longe do centro do checkpoint)
    this.cpArcs = this.track.def.checkpoints.map(cp => this.track.progressOf(vec(cp.x, cp.y)));
    this.finishOrder = []; this.current = 0; this.turnNo = 1; this.phase = 'aim'; this.flickCount = 0;
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
    if (!c.isAI && !this.manualControl) this.onToast('Sua vez, ' + c.name, 'turn');
    this.onChange();
  }

  private advanceIndex(): void { this.current = (this.current + 1) % this.caps.length; }

  // ---------------------------- MODO CAOS: itens ----------------------------
  // posição na corrida (0 = na frente … 1 = na lanterna) entre quem ainda corre
  private rank01(c: Cap): { r: number; leader: boolean } {
    const alive = this.caps.filter(x => !x.finished);
    const sorted = [...alive].sort((a, b) => b.progress - a.progress);
    const idx = sorted.indexOf(c); const n = Math.max(1, sorted.length - 1);
    return { r: idx < 0 ? 0.5 : idx / n, leader: idx === 0 };
  }
  // tem buraco/bomba logo à frente na pista? (a IA guarda o escudo pra essas horas)
  private hazardAhead(c: Cap): boolean {
    for (const o of this.track.def.obstacles) {
      if (o.type !== 'hole' && o.type !== 'bomb') continue;
      const op = this.track.progressOf(vec(o.x, o.y));
      if (op > c.progress + 1 && op < c.progress + 24) return true;
    }
    return false;
  }
  private grantItem(c: Cap): boolean {
    if (c.item) return false;                     // slot cheio: use o que tem antes de pegar outro
    const { r, leader } = this.rank01(c);
    const it = pickItem(r, leader);
    c.item = it; c.itemFlash = 1;
    if (!c.isAI) this.onToast(`${ITEMS[it].ico} ${ITEMS[it].name}! toque pra usar`, 'good');
    this.onItem(c, it, false);
    return true;
  }
  // usa o item guardado (jogador aperta o botão; a IA usa sozinha antes de jogar)
  useItem(c = this.activeCap()): void {
    const id = c.item; if (!id) return;
    c.item = null; c.itemFlash = 1;
    const def = ITEMS[id];
    switch (id) {
      case 'foguete': c.boostNext = 1.7; break;                 // muito mais alcance
      case 'turbo':   c.boostNext = 1.28; break;               // empurrãozinho
      case 'extra':   c.flicksLeft += 1; c.bonusFlicks += 0; break;
      case 'escudo':  c.shield = true; break;
      case 'salto': {                                          // pula ~15u pra frente na pista
        const na = Math.min(this.track.total - 1, c.progress + 15);
        const p = this.track.atArc(na).p; c.pos = vec(p.x, p.y); c.progress = na; this.updateCheckpoint(c); break;
      }
      case 'ima': {                                            // cola no centro + empurrãozinho
        const p = this.track.atArc(c.progress).p; c.pos = vec(p.x, p.y); c.boostNext = 1.18; break;
      }
      case 'raio': {                                           // manda o líder pro checkpoint dele
        const alive = this.caps.filter(x => !x.finished && x.id !== c.id);
        const leader = alive.sort((a, b) => b.progress - a.progress)[0];
        if (leader) { leader.pos = vec(leader.cpPos.x, leader.cpPos.y); leader.progress = this.track.progressOf(leader.cpPos); leader.itemFlash = 1; this.onToast(`⚡ ${leader.name} levou um raio!`, 'bad'); }
        break;
      }
    }
    if (!c.isAI && id !== 'raio') this.onToast(`${def.ico} ${def.name}!`, 'good');
    this.onItem(c, id, true);
    this.onChange();
  }

  canFlick(): boolean { return this.phase === 'aim' && this.activeCap().flicksLeft > 0; }

  // dispara um peteléco (dir normalizado, força 0..1)
  flick(dir: V, power: number): void {
    if (!this.canFlick()) return;
    const c = this.activeCap();
    // CAOS: foguete/turbinho dão mais alcance neste peteléco (consome o boost)
    const boost = c.boostNext; c.boostNext = 1;
    const d = norm(dir); const sp = Math.max(0.06, Math.min(1, power)) * MAX_POWER * boost;
    // p/ onde cada cap volta se sair da pista neste peteléco:
    //  - VOCÊ (quem jogou) sai por conta própria → volta pro ponto de onde jogou;
    //  - se OUTRO te empurra pra fora → volta um pouco ATRÁS na pista (punição).
    c.preFlick = vec(c.pos.x, c.pos.y);
    for (const o of this.caps) {
      if (o.id === c.id) { o.resetTo = vec(c.preFlick.x, c.preFlick.y); continue; }
      // se OUTRO te empurra pra fora → punição MAIOR: volta bem mais atrás na pista
      const behind = Math.max(0.6, o.progress - 16);
      const bp = this.track.atArc(behind).p;
      o.resetTo = vec(bp.x, bp.y);
    }
    c.z = 0; c.vz = 0; c.airborne = false;
    c.vel = mul(d, sp); c.moving = true;
    this.lastFlickOut = false;
    this.flickCount++;              // conta o peteléco (token único p/ o online)
    this.phase = 'resolve'; this.acc = 0;
    this.onFlick(c, power);
    this.onChange();
  }

  update(dt: number): void {
    if (this.phase === 'over') return;
    if (this.phase === 'aim') {
      if (this.manualControl) return;   // online: quem controla dispara de fora
      const c = this.activeCap();
      if (c.isAI) {
        this.aiTimer += dt;
        // IA usa o item na hora certa: escudo só se tem perigo à frente; os
        // outros (que ajudam a avançar/atacar) valem sempre antes de jogar.
        if (this.chaos && c.item && this.aiTimer > 0.4 && this.aiTimer < 0.45) {
          const useNow = c.item === 'escudo' ? this.hazardAhead(c) : true;
          if (useNow) this.useItem(c);
        }
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
      if ((this.phase as string) === 'over') return;   // handleEvent pode ter encerrado a corrida
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
      case 'ramp': if (c.id === this.current) this.onToast('Voou! 🚀', 'good'); break;
      case 'item':
        if (e.power === -1) { c.itemFlash = 1; this.onToast(`🛡️ ${c.name} — escudo salvou!`, 'good'); }   // escudo consumido
        // com o slot cheio a caixa NÃO é gasta: continua lá pra pegar depois de usar
        else if (!this.grantItem(c) && e.obsIdx != null) c.consumed.delete(e.obsIdx);
        break;
      case 'finish': this.onFinish(c); break;
    }
    // checkpoints: avança o checkpoint se cruzou um (proximidade)
    this.updateCheckpoint(c);
    this.onEvent(e);
  }

  private updateCheckpoint(c: Cap): void {
    const arcs = this.cpArcs; let advanced = -1;
    for (let i = c.checkpoint + 1; i < arcs.length; i++) {
      if (c.progress + 0.3 >= arcs[i]) {                 // cruzou a linha do checkpoint (por arco)
        c.checkpoint = i; const pt = this.track.atArc(arcs[i]).p;
        c.cpPos = vec(pt.x, pt.y); advanced = i;         // fica SALVO ali: buraco volta pra cá
      } else break;
    }
    if (advanced > 0) { this.onCheckpoint(c, advanced); if (!c.isAI) this.onToast('Checkpoint ' + advanced + ' ✓', 'turn'); }
  }

  private onFinish(c: Cap): void {
    if (this.finishOrder.includes(c)) return;
    c.finished = true; c.airborne = false; c.z = 0; this.finishOrder.push(c); c.place = this.finishOrder.length;
    this.onToast(`${c.name} chegou em ${c.place}º! 🏁`, c.place === 1 ? 'good' : 'turn');
    // a corrida só acaba quando o PENÚLTIMO chega — aí o que falta é o último
    if (this.finishOrder.length >= Math.max(1, this.caps.length - 1)) this.finishRace();
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
    if (c.finished) { this.advanceIndex(); this.beginTurn(); return; }   // chegou: a vez acaba, não gasta petelecos à toa
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

  // -------- ONLINE: estado autoritativo do anfitrião (enviado em repouso) --------
  snapshot(): any {
    return {
      cur: this.current, tn: this.turnNo, ph: this.phase, fc: this.flickCount, fin: this.finishOrder.map(c => c.id),
      caps: this.caps.map(c => ({ i: c.id, x: c.pos.x, y: c.pos.y, pr: c.progress, cp: c.checkpoint, cx: c.cpPos.x, cy: c.cpPos.y, tx: c.turnStart.x, ty: c.turnStart.y, fl: c.flicksLeft, bf: c.bonusFlicks, sk: c.skipTurns, fn: c.finished, pl: c.place, ai: c.isAI })),
    };
  }
  applySnapshot(s: any): void {
    if (!s || !s.caps) return;
    this.current = s.cur; this.turnNo = s.tn; this.phase = s.ph; if (typeof s.fc === 'number') this.flickCount = s.fc;
    for (const cs of s.caps) {
      const c = this.caps[cs.i]; if (!c) continue;
      c.pos.x = cs.x; c.pos.y = cs.y; c.vel.x = 0; c.vel.y = 0; c.z = 0; c.vz = 0; c.airborne = false; c.moving = false;
      c.progress = cs.pr; c.checkpoint = cs.cp; c.cpPos = vec(cs.cx, cs.cy); c.turnStart = vec(cs.tx, cs.ty);
      c.flicksLeft = cs.fl; c.bonusFlicks = cs.bf; c.skipTurns = cs.sk; c.finished = cs.fn; c.place = cs.pl; c.isAI = cs.ai;
    }
    this.finishOrder = (s.fin || []).map((id: number) => this.caps[id]).filter(Boolean);
    if (this.phase === 'over') { /* deixa o main mostrar resultados */ }
    this.onChange();
  }
}
