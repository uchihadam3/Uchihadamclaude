// GameManager — a partida por turnos. Cuida da ordem dos jogadores, dos 3
// petelecos por turno, das regras (fora/buraco/bomba/+3/10/chegada), do ranking
// e da vitória. Roda a simulação até tudo parar entre um peteléco e outro.
import { Cap, V, makeCap, vec, norm, mul, MAX_POWER, GUM_LAUNCH, DEFAULT_STATS } from '../engine/core';
import { TrackModel, TrackDef } from '../engine/track';
import { stepWorld, anyMoving, SimEvent } from '../engine/physics';
import { aiFlick } from './ai';
import { skinById } from './skins';
import { ITEMS, pickItem, MAX_ITEMS } from './chaos';

export type Phase = 'aim' | 'resolve' | 'over';
export interface PlayerDef { name: string; isAI: boolean; ai?: string; skin: string; team?: number; stats?: Partial<import('../engine/core').CapStats>; }

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
  // efeito visual do PODER usado: origem (x,y), alvo (tx,ty) e pontos extras
  onItemFx: (id: string, d: { x: number; y: number; tx?: number; ty?: number; pts?: { x: number; y: number }[] }) => void = () => {};

  setup(def: TrackDef, players: PlayerDef[]): void {
    // cópia POR CORRIDA: bexiga estourada (popped) e a poça que ela deixa mudam
    // a pista durante a corrida — nunca podem vazar pro cache compartilhado
    const d2: TrackDef = { ...def, obstacles: def.obstacles.map(o => ({ ...o })), patches: def.patches.slice() };
    this.track = new TrackModel(d2);
    this.caps = players.map((pl, i) => {
      const sk = skinById(pl.skin);
      // pl.stats sobrepõe (campanha: starter + upgrades da Oficina)
      const c = makeCap(i, pl.name, pl.skin, { ...DEFAULT_STATS, ...sk.stats, ...(pl.stats || {}) }, pl.isAI, pl.ai);
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
    // BRINQUEDOS VIVOS: o catavento gira a cada turno, ALTERNANDO o sentido —
    // fecha o caminho de um jeito diferente cada vez (determinístico por turno;
    // replays e online continuam batendo)
    if (!first) for (const o of this.track.def.obstacles) {
      if (o.type === 'mill') { o.ph = (o.ph || 0) + 1; o.dir = (o.dir || 0) + (o.ph % 2 ? 0.9 : -0.9); }
    }
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
    // detector de PRESO: sem avançar desde o turno passado → IA liga o modo destravar
    if (c.progress < c.lastTurnProg + 0.8) c.stuckTurns++; else c.stuckTurns = 0;
    c.lastTurnProg = c.progress;
    // RESGATE (guincho 🛟): encaixada num canto de muro há 4 turnos — volta pro
    // MEIO da pista um tiquinho ATRÁS (não ganha nada com isso). Garante que
    // nenhuma pista gerada consegue travar uma corrida pra sempre.
    if (c.stuckTurns >= 4) {
      // reincidência: se desde o ÚLTIMO resgate ela não andou de verdade (a
      // armadilha puxou de volta), cada novo resgate vai MAIS pra trás e fora
      // da linha central — muda a linha de aproximação e quebra ciclos infinitos
      if (c.rescues > 0 && c.progress > c.rescueProg + 6) c.rescues = 0;
      let back = 2 + c.rescues * 8;
      const calc = (b: number) => {
        const at = this.track.atArc(Math.max(0, c.progress - b));
        const off = c.rescues > 0 ? (c.rescues % 2 ? 1 : -1) * this.track.nearest(at.p).half * 0.4 : 0;
        return vec(at.p.x - at.tan.y * off, at.p.y + at.tan.x * off);
      };
      let spot = calc(back);
      for (let t = 0; t < 6; t++) {
        const busy = this.caps.some(o => o.id !== c.id && !o.finished && Math.hypot(o.pos.x - spot.x, o.pos.y - spot.y) < c.radius * 2.4);
        if (!busy) break;
        back += 2.5; spot = calc(back);
      }
      c.pos = vec(spot.x, spot.y); c.vel = vec(); c.z = 0; c.vz = 0; c.airborne = false;
      c.progress = this.track.progressOf(c.pos);
      c.stuckTurns = 0; c.lastTurnProg = c.progress;
      c.rescues++; c.rescueProg = c.progress;
      this.onToast(`🛟 ${c.name} foi resgatada pra pista!`, 'bad');
    }
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
    if (c.items.length >= MAX_ITEMS) return false;   // bolsos cheios: use um antes de pegar outro
    const { r, leader } = this.rank01(c);
    const it = pickItem(r, leader);
    c.items.push(it); c.itemFlash = 1;
    if (!c.isAI) this.onToast(`${ITEMS[it].ico} ${ITEMS[it].name}! toque no botão pra usar`, 'good');
    this.onItem(c, it, false);
    return true;
  }
  // rivais vivos, mais à frente primeiro
  private rivalsAhead(c: Cap): Cap[] {
    return this.caps.filter(x => !x.finished && x.id !== c.id && x.progress > c.progress).sort((a, b) => b.progress - a.progress);
  }
  // derruba uma tampinha N unidades PRA TRÁS na pista (teleporte pro centro do arco)
  private knockBack(t: Cap, dist: number): void {
    const na = Math.max(0.6, t.progress - dist);
    const p = this.track.atArc(na).p;
    t.pos = vec(p.x, p.y); t.progress = na; t.vel = vec(); t.z = 0; t.vz = 0; t.airborne = false; t.itemFlash = 1; t.hitFlash = 1;
  }
  // usa o item do bolso `slot` (jogador aperta o botão; a IA usa sozinha antes de jogar)
  useItem(slot = 0, c = this.activeCap()): void {
    const id = c.items[slot]; if (!id) return;
    c.items.splice(slot, 1); c.itemFlash = 1;
    const def = ITEMS[id];
    switch (id) {
      case 'foguete': c.boostNext = 1.7; break;                 // muito mais alcance
      case 'turbo':   c.boostNext = 1.28; break;               // empurrãozinho
      case 'extra':   c.flicksLeft += 1; break;
      case 'escudo':  c.shield = true; break;
      case 'pancada': c.smashNext = true; break;               // próximo peteléco esmaga
      case 'fantasma': c.ghostNext = true; break;              // próximo peteléco atravessa
      case 'salto': {                                          // pula ~15u pra frente na pista
        const from = vec(c.pos.x, c.pos.y);
        const na = Math.min(this.track.total - 1, c.progress + 15);
        const p = this.track.atArc(na).p; c.pos = vec(p.x, p.y); c.progress = na; this.updateCheckpoint(c);
        this.onItemFx('salto', { x: from.x, y: from.y, tx: p.x, ty: p.y }); break;
      }
      case 'ima': {                                            // cola no centro + empurrãozinho
        const from = vec(c.pos.x, c.pos.y);
        const p = this.track.atArc(c.progress).p; c.pos = vec(p.x, p.y); c.boostNext = 1.18;
        this.onItemFx('ima', { x: from.x, y: from.y, tx: p.x, ty: p.y }); break;
      }
      case 'raio': {                                           // manda o líder pro checkpoint dele
        const leader = this.rivalsAhead(c)[0] || this.caps.filter(x => !x.finished && x.id !== c.id).sort((a, b) => b.progress - a.progress)[0];
        if (leader) {
          const at = vec(leader.pos.x, leader.pos.y);
          leader.pos = vec(leader.cpPos.x, leader.cpPos.y); leader.progress = this.track.progressOf(leader.cpPos); leader.vel = vec(); leader.itemFlash = 1;
          this.onToast(`⚡ ${leader.name} levou um raio!`, 'bad');
          this.onItemFx('raio', { x: at.x, y: at.y, tx: leader.pos.x, ty: leader.pos.y });
        }
        break;
      }
      case 'gude': {                                           // acerta o rival mais próximo à frente
        const ahead = this.rivalsAhead(c);
        const t = ahead.length ? ahead[ahead.length - 1] : null;   // o MAIS PERTO de você
        if (t) {
          const hit = vec(t.pos.x, t.pos.y);
          this.knockBack(t, 9); this.onToast(`🔮 ${t.name} levou uma bolada!`, 'bad');
          this.onItemFx('gude', { x: c.pos.x, y: c.pos.y, tx: hit.x, ty: hit.y, pts: [{ x: t.pos.x, y: t.pos.y }] });
        }
        break;
      }
      case 'troca': {                                          // troca de lugar com quem está logo à frente
        const ahead = this.rivalsAhead(c);
        const t = ahead.length ? ahead[ahead.length - 1] : null;
        if (t) {
          const mp = vec(c.pos.x, c.pos.y), mg = c.progress;
          c.pos = vec(t.pos.x, t.pos.y); c.progress = t.progress;
          t.pos = mp; t.progress = mg; t.vel = vec(); c.vel = vec(); t.itemFlash = 1;
          this.updateCheckpoint(c);
          this.onToast(`🔁 trocou de lugar com ${t.name}!`, 'good');
          this.onItemFx('troca', { x: t.pos.x, y: t.pos.y, tx: c.pos.x, ty: c.pos.y });
        }
        break;
      }
      case 'furacao': {                                        // sopra TODOS os rivais pra trás
        const antes: { x: number; y: number }[] = [];
        for (const t of this.caps) if (!t.finished && t.id !== c.id) { antes.push({ x: t.pos.x, y: t.pos.y }); this.knockBack(t, 6); antes.push({ x: t.pos.x, y: t.pos.y }); }
        this.onToast('🌪️ o furacão varreu a pista!', 'good');
        this.onItemFx('furacao', { x: c.pos.x, y: c.pos.y, pts: antes });
        break;
      }
      case 'chuva': {                                          // poça d'água no caminho do líder
        const leader = this.rivalsAhead(c)[0];
        if (leader) {
          const na = Math.min(this.track.total - 1, leader.progress + 3.2);
          const p = this.track.atArc(na).p;
          this.track.def.patches.push({ surface: 'water', x: p.x, y: p.y, r: 2.0 });
          this.onToast(`🌧️ choveu na frente de ${leader.name}!`, 'good');
          this.onItemFx('chuva', { x: p.x, y: p.y });
          this.onEvent({ type: 'balloon', capId: c.id, x: p.x, y: p.y, power: -2 } as any);   // FX de poça no 3D
        }
        break;
      }
      case 'ancora': {                                         // o líder joga fraquinho
        const leader = this.rivalsAhead(c)[0];
        if (leader) { leader.anchored = true; leader.itemFlash = 1; this.onToast(`⚓ ${leader.name} tá com a âncora!`, 'bad'); this.onItemFx('ancora', { x: leader.pos.x, y: leader.pos.y }); }
        break;
      }
      case 'cola': {                                           // chiclete 2.5u ATRÁS de você
        const na = Math.max(0.6, c.progress - 2.5);
        const p = this.track.atArc(na).p;
        this.track.def.patches.push({ surface: 'gum', x: p.x, y: p.y, r: 1.5 });
        this.onToast('🫠 chiclete no chão — quem pisar, gruda!', 'good');
        this.onItemFx('cola', { x: p.x, y: p.y });
        break;
      }
    }
    if (['foguete', 'turbo', 'extra', 'escudo', 'pancada', 'fantasma'].includes(id)) this.onItemFx(id, { x: c.pos.x, y: c.pos.y });
    if (!c.isAI && def.needsAhead !== true) this.onToast(`${def.ico} ${def.name}!`, 'good');
    this.onItem(c, id, true);
    this.onChange();
  }

  canFlick(): boolean { return this.phase === 'aim' && this.activeCap().flicksLeft > 0; }

  // dispara um peteléco (dir normalizado, força 0..1)
  flick(dir: V, power: number): void {
    if (!this.canFlick()) return;
    const c = this.activeCap();
    // CAOS: foguete/turbinho dão mais alcance neste peteléco (consome o boost);
    // âncora derruba a força; pancada/fantasma ARMAM e valem até a tampinha parar
    const boost = c.boostNext; c.boostNext = 1;
    const anchor = c.anchored ? 0.55 : 1; c.anchored = false;
    c.smash = c.smashNext; c.smashNext = false;
    c.ghost = c.ghostNext; c.ghostNext = false;
    // CHICLETE: peteleco saindo de cima do chiclete sai FRACO (a tampinha tá grudada)
    const gum = this.track.surfaceAt(c.pos) === 'gum' ? GUM_LAUNCH : 1;
    const d = norm(dir); const sp = Math.max(0.06, Math.min(1, power)) * MAX_POWER * boost * anchor * gum;
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
        // IA usa o item na hora certa: escudo só se tem perigo à frente; itens de
        // ataque só se existe alguém NA FRENTE; os outros valem sempre.
        if (this.chaos && c.items.length && this.aiTimer > 0.4 && this.aiTimer < 0.45) {
          const idx = c.items.findIndex(id =>
            id === 'escudo' ? this.hazardAhead(c) :
            ITEMS[id].needsAhead ? this.rivalsAhead(c).length > 0 : true);
          if (idx >= 0) this.useItem(idx, c);
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
      case 'top': if (c.id === this.current) this.onToast('🪀 o pião rebateu!', 'bad'); break;
      case 'band': if (c.id === this.current) this.onToast('🪃 estilingue!', 'good'); break;
      case 'car': {
        // CARRINHO DE FRICÇÃO: o toque solta a mola — ele DISPARA reto na direção
        // que aponta, atropela tampinhas no caminho e estaciona onde parar
        if (e.obsIdx != null) {
          const o = this.track.def.obstacles[e.obsIdx];
          if (o && o.type === 'car') {
            const dir = o.dir || 0; const dx = Math.cos(dir), dy = Math.sin(dir);
            const maxD = 10 + (e.power || 0) * 0.4;
            let x = o.x, y = o.y, d = 0;
            while (d < maxD) {
              const nx = x + dx * 0.5, ny = y + dy * 0.5;
              if (this.track.surfaceAt(vec(nx, ny)) === 'out') break;   // freia na beirada
              x = nx; y = ny; d += 0.5;
              for (const cc of this.caps) {                             // atropela quem tá no caminho
                if (cc.finished) continue;
                const ddx = cc.pos.x - x, ddy = cc.pos.y - y; const dd = Math.hypot(ddx, ddy);
                if (dd < 1.6) {
                  const rl = Math.max(0.001, dd);
                  cc.vel.x += dx * 9 + (ddx / rl) * 4; cc.vel.y += dy * 9 + (ddy / rl) * 4;
                  cc.moving = true; cc.itemFlash = 1;
                }
              }
            }
            o.x = x; o.y = y;                                           // estaciona no lugar novo
            this.onToast('🚗 o carrinho disparou!', 'bad');
          }
        }
        break;
      }
      case 'balloon': {
        // estourou: marca na CÓPIA da pista e deixa uma poça d'água permanente
        if (e.obsIdx != null) {
          const o = this.track.def.obstacles[e.obsIdx];
          if (o && !o.popped) {
            o.popped = true;
            this.track.def.patches.push({ surface: 'water', x: o.x, y: o.y, r: 1.7 });
            this.onToast('💦 SPLASH! A bexiga estourou!', 'bad');
          }
        }
        break;
      }
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
    c.smash = false; c.ghost = false;                            // pancada/fantasma valem só o peteléco
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
