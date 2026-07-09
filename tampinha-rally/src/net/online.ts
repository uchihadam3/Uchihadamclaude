// Controlador de MULTIPLAYER ONLINE — sala por código, lobby (até 6, misturando
// humanos e IA) e a corrida em LOCKSTEP determinístico: cada peteléco (humano ou
// da IA) vira uma mensagem minúscula (capId, direção, força); todos aplicam a
// mesma jogada e simulam a MESMA física. O anfitrião ainda manda um "sync" do
// estado em repouso a cada lance, garantindo que ninguém saia do lugar (sem lag,
// todos se veem igualzinho). A IA só é calculada pelo anfitrião e transmitida.
import { Net } from './peer';
import { PlayerDef, GameManager } from '../game/manager';
import { aiFlick, AIKind, AI_KINDS, AI_LABEL } from '../game/ai';
import { SKINS, skinById } from '../game/skins';
import { V } from '../engine/core';

export type OPick = 'specific' | 'randlevel' | 'randany';
export type ORoomMode = 'normal' | 'dupla' | 'champ';
export interface Seat { name: string; skin: string; kind: 'human' | 'ai'; ai?: AIKind; owner: string; off?: boolean; team?: number; }

const AI_NAMES = ['Bolha', 'Zé', 'Nina', 'Tato', 'Duda', 'Chico'];

export class Online {
  net = new Net();
  active = false;          // dentro de uma corrida online
  inRoom = false;
  isHost = false;
  code = '';
  myId = 'host';           // 'host' ou o próprio peerId
  myName = 'Você';
  mySkin = 'coca';
  humans: { owner: string; name: string; skin: string; off?: boolean }[] = [];
  seats: Seat[] = [];
  total = 4;               // total de corredores (2..6)
  cfg = { level: 0, trackIdx: 0, pick: 'specific' as OPick, roomMode: 'normal' as ORoomMode, teamSize: 2, champRaces: 3 };
  mgr: GameManager | null = null;
  champ: { race: number; total: number; pts: Map<number, number>; seq: { level: number; idx: number }[] } | null = null;

  // eventos p/ a UI
  onRoster: () => void = () => {};
  onError: (m: string) => void = () => {};
  onCode: (code: string) => void = () => {};
  onStartMatch: (players: PlayerDef[], level: number, trackIdx: number) => void = () => {};
  onToLobby: () => void = () => {};
  onClosed: () => void = () => {};
  onChampStanding: (rows: { seat: number; name: string; skin: string; pts: number; you: boolean }[], race: number, total: number, last: boolean) => void = () => {};
  onChampEnd: (winner: { name: string; skin: string; you: boolean }) => void = () => {};

  // lockstep
  private lastTok = ''; private decided = false; private aiWait = 0;
  private applied = new Set<string>();
  private pendingFlick: any = null; private pendingSync: any = null;

  private reset(): void {
    this.net.destroy(); this.net = new Net();
    this.active = false; this.inRoom = false; this.isHost = false; this.code = '';
    this.myId = 'host'; this.humans = []; this.seats = []; this.total = 4; this.mgr = null;
    this.cfg = { level: 0, trackIdx: 0, pick: 'specific', roomMode: 'normal', teamSize: 2, champRaces: 3 }; this.champ = null;
    this.lastTok = ''; this.decided = false; this.aiWait = 0; this.applied.clear(); this.pendingFlick = null; this.pendingSync = null;
  }

  // ---------------- LOBBY ----------------
  createRoom(name: string, skin: string): void {
    this.reset(); this.isHost = true; this.myId = 'host'; this.myName = name; this.mySkin = skin;
    this.humans = [{ owner: 'host', name, skin }]; this.total = 4; this.inRoom = true;
    this.net.onOpen = (code) => { this.code = code; this.onCode(code); this.rebuild(); };
    this.net.onData = (from, msg) => this.hostData(from, msg);
    this.net.onLeave = (pid) => this.hostLeave(pid);
    this.net.onError = (e) => this.onError(this.friendly(e));
    this.net.host();
  }
  joinRoom(code: string, name: string, skin: string): void {
    this.reset(); this.isHost = false; this.myName = name; this.mySkin = skin;
    this.net.onOpen = () => { this.myId = this.net.peer!.id; this.inRoom = true; this.code = code.toUpperCase(); this.net.send('host', { t: 'hello', name, skin }); this.onCode(this.code); };
    this.net.onData = (_from, msg) => this.clientData(msg);
    this.net.onLeave = () => { if (this.inRoom) { this.onError('Conexão com o anfitrião caiu'); this.onClosed(); } };
    this.net.onError = (e) => this.onError(this.friendly(e));
    this.net.join(code);
  }
  private friendly(e: string): string {
    if (e === 'peer-unavailable') return 'Sala não encontrada — confira o código';
    if (e === 'network' || e === 'server-error' || e === 'socket-error') return 'Sem conexão com o servidor de salas';
    if (e === 'browser-incompatible') return 'Navegador sem suporte a P2P';
    return 'Falha de conexão (' + e + ')';
  }

  leave(): void { try { this.net.broadcast({ t: 'bye' }); } catch {} this.reset(); }

  // host: reconstrói os assentos (humanos + IA pra encher até `total`) e transmite
  private rebuild(): void {
    if (!this.isHost) return;
    if (this.humans.length > 6) this.humans = this.humans.slice(0, 6);
    if (this.cfg.roomMode === 'dupla') this.total = this.cfg.teamSize * 2;   // total fixo nos times
    if (this.total < this.humans.length) this.total = this.humans.length;
    if (this.total > 6) this.total = 6; if (this.total < 2) this.total = 2;
    const seats: Seat[] = this.humans.map(h => ({ name: h.name, skin: h.skin, kind: 'human' as const, owner: h.owner, off: h.off }));
    // IA pega tampinhas da mesma RARIDADE do anfitrião (diferentes das humanas e entre si)
    const humanSkins = this.humans.map(h => h.skin);
    const hostSkin = (this.humans.find(h => h.owner === 'host') || this.humans[0])?.skin || 'coca';
    const aiPool = SKINS.filter(s => s.rarity === skinById(hostSkin).rarity && !humanSkins.includes(s.id)).map(s => s.id);
    for (let i = aiPool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [aiPool[i], aiPool[j]] = [aiPool[j], aiPool[i]]; }
    let ai = 0;
    while (seats.length < this.total) { const k = ai++; const skin = aiPool.length ? aiPool[(k) % aiPool.length] : SKINS[Math.floor(Math.random() * SKINS.length)].id; seats.push({ name: AI_NAMES[k % AI_NAMES.length], skin, kind: 'ai', ai: AI_KINDS[k % AI_KINDS.length], owner: 'host' }); }
    if (this.cfg.roomMode === 'dupla') seats.forEach((s, i) => s.team = this.seatTeam(i));
    else seats.forEach(s => s.team = undefined);
    this.seats = seats;
    this.broadcastRoster();
    this.onRoster();
  }
  private broadcastRoster(): void { this.net.broadcast({ t: 'roster', seats: this.seats, total: this.total, cfg: this.cfg }); }

  setTotal(n: number): void { if (!this.isHost || this.cfg.roomMode === 'dupla') return; this.total = Math.max(this.humans.length, Math.min(6, n)); this.rebuild(); }
  setCfg(level: number, trackIdx: number, pick: OPick): void { if (!this.isHost) return; this.cfg.level = level; this.cfg.trackIdx = trackIdx; this.cfg.pick = pick; this.rebuild(); }
  // modo da sala: normal / dupla (2×2 ou 3×3) / campeonato
  setRoom(roomMode: ORoomMode, teamSize = this.cfg.teamSize, champRaces = this.cfg.champRaces): void {
    if (!this.isHost) return;
    this.cfg.roomMode = roomMode; this.cfg.teamSize = teamSize; this.cfg.champRaces = champRaces;
    if (roomMode === 'dupla') this.total = teamSize * 2;      // 2×2=4 · 3×3=6 corredores exatos
    this.rebuild();
  }
  private seatTeam(i: number): number { return i % 2; }      // alterna: 2 (ou 3) por time
  setMyCap(skin: string): void {
    this.mySkin = skin;
    if (this.isHost) { const h = this.humans.find(x => x.owner === 'host'); if (h) h.skin = skin; this.rebuild(); }
    else this.net.send('host', { t: 'setcap', skin });
  }
  setMyName(name: string): void {
    const n = (name || 'Você').slice(0, 12); this.myName = n;
    if (this.isHost) { const h = this.humans.find(x => x.owner === 'host'); if (h) h.name = n; this.rebuild(); }
    else this.net.send('host', { t: 'setname', name: n });
  }

  private hostData(from: string, msg: any): void {
    if (!this.isHost) return;
    if (msg.t === 'hello') {
      if (this.active) return;                        // já começou: não entra
      if (this.humans.some(h => h.owner === from)) return;
      if (this.humans.length >= 6) { this.net.send(from, { t: 'full' }); return; }
      this.humans.push({ owner: from, name: (msg.name || 'Jogador').slice(0, 12), skin: msg.skin || 'coca' });
      if (this.total < this.humans.length) this.total = this.humans.length;
      this.rebuild();
    } else if (msg.t === 'setcap') {
      const h = this.humans.find(x => x.owner === from); if (h) { h.skin = msg.skin; this.rebuild(); }
    } else if (msg.t === 'setname') {
      const h = this.humans.find(x => x.owner === from); if (h) { h.name = (msg.name || 'Jogador').slice(0, 12); this.rebuild(); }
    } else if (msg.t === 'flick') {                    // jogada de um cliente: repassa e aplica
      this.net.relay(from, msg); this.pendingFlick = msg;
    } else if (msg.t === 'bye') {
      this.hostLeave(from);
    }
  }
  private hostLeave(pid: string): void {
    if (!this.isHost) return;
    if (this.active) {
      // no meio da corrida: o anfitrião assume o assento (passa a jogar como IA)
      for (const s of this.seats) if (s.owner === pid) { s.off = true; if (!s.ai) s.ai = AI_KINDS[Math.floor(Math.random() * AI_KINDS.length)]; }
      const h = this.humans.find(x => x.owner === pid); if (h) h.off = true;
    } else {
      this.humans = this.humans.filter(h => h.owner !== pid); this.rebuild();
    }
  }

  private clientData(msg: any): void {
    if (msg.t === 'roster') { this.seats = msg.seats; this.total = msg.total; this.cfg = msg.cfg; this.onRoster(); }
    else if (msg.t === 'start') { this.beginMatch(msg.level, msg.trackIdx, msg.seats); }
    else if (msg.t === 'flick') { this.pendingFlick = msg; }
    else if (msg.t === 'sync') { this.pendingSync = msg.s; }
    else if (msg.t === 'champres') {
      const my = this.mySeatIndex(); const pmap = new Map<number, number>(msg.pts);
      const rows = this.seats.map((s, i) => ({ seat: i, name: s.name, skin: s.skin, pts: pmap.get(i) || 0, you: i === my })).sort((a, b) => b.pts - a.pts);
      this.onChampStanding(rows, msg.race, msg.total, msg.last);
    }
    else if (msg.t === 'champend') { const s = this.seats[msg.seat]; this.active = false; this.onChampEnd({ name: s?.name || '', skin: s?.skin || 'coca', you: msg.seat === this.mySeatIndex() }); }
    else if (msg.t === 'tolobby') { this.active = false; this.onToLobby(); }
    else if (msg.t === 'full') { this.onError('A sala está cheia'); this.onClosed(); }
    else if (msg.t === 'bye') { this.onError('O anfitrião encerrou a sala'); this.onClosed(); }
  }

  // ---------------- INÍCIO DA PARTIDA ----------------
  startMatch(): void {
    if (!this.isHost) return;
    this.rebuild();
    let level = this.cfg.level, idx = this.cfg.trackIdx;
    if (this.cfg.pick === 'randlevel') idx = Math.floor(Math.random() * 10);
    else if (this.cfg.pick === 'randany') { level = Math.floor(Math.random() * 5); idx = Math.floor(Math.random() * 10); }
    // CAMPEONATO ONLINE: monta a sequência de corridas (do nível escolhido)
    if (this.cfg.roomMode === 'champ') {
      const n = Math.max(2, Math.min(9, this.cfg.champRaces));
      const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      const seq = pool.slice(0, n).map(t => ({ level, idx: t }));
      this.champ = { race: 0, total: n, pts: new Map(), seq };
      level = seq[0].level; idx = seq[0].idx;
    } else this.champ = null;
    const seats = this.seats.map(s => ({ ...s }));
    this.net.broadcast({ t: 'start', level, trackIdx: idx, seats });
    this.beginMatch(level, idx, seats);
  }
  private beginMatch(level: number, trackIdx: number, seats: Seat[]): void {
    this.seats = seats; this.active = true;
    this.lastTok = ''; this.decided = false; this.aiWait = 0; this.applied.clear(); this.pendingFlick = null; this.pendingSync = null;
    const players: PlayerDef[] = seats.map(s => ({ name: s.name, isAI: s.kind === 'ai', ai: s.ai, skin: s.skin, team: s.team }));
    this.onStartMatch(players, level, trackIdx);
  }

  // ---------------- CAMPEONATO ONLINE (orquestrado pelo anfitrião) ----------------
  isChamp(): boolean { return !!this.champ; }
  private champRows(): { seat: number; name: string; skin: string; pts: number; you: boolean }[] {
    const my = this.mySeatIndex();
    return this.seats.map((s, i) => ({ seat: i, name: s.name, skin: s.skin, pts: this.champ!.pts.get(i) || 0, you: i === my }))
      .sort((a, b) => b.pts - a.pts);
  }
  // host: fecha a corrida, soma pontos e transmite a classificação
  hostFinishRace(mgr: GameManager): void {
    if (!this.isHost || !this.champ) return;
    const table = [12, 9, 7, 5, 3, 1];
    mgr.standings().forEach((c, i) => this.champ!.pts.set(c.id, (this.champ!.pts.get(c.id) || 0) + (table[i] || 0)));
    const last = this.champ.race + 1 >= this.champ.total;
    const rows = this.champRows();
    this.net.broadcast({ t: 'champres', pts: [...this.champ.pts.entries()], race: this.champ.race + 1, total: this.champ.total, last });
    this.onChampStanding(rows, this.champ.race + 1, this.champ.total, last);
  }
  // host: avança pra próxima corrida ou encerra com o campeão
  hostNextChamp(): void {
    if (!this.isHost || !this.champ) return;
    this.champ.race++;
    if (this.champ.race >= this.champ.total) {
      const win = this.champRows()[0];
      this.net.broadcast({ t: 'champend', seat: win.seat });
      this.onChampEnd({ name: win.name, skin: win.skin, you: win.you });
      this.champ = null; this.active = false; return;
    }
    const { level, idx } = this.champ.seq[this.champ.race];
    const seats = this.seats.map(s => ({ ...s }));
    this.net.broadcast({ t: 'start', level, trackIdx: idx, seats });
    this.beginMatch(level, idx, seats);
  }
  bind(mgr: GameManager): void { this.mgr = mgr; }

  backToLobby(): void { if (!this.isHost) return; this.active = false; this.net.broadcast({ t: 'tolobby' }); this.humans = this.humans.filter(h => !h.off); this.rebuild(); this.onToLobby(); }

  // ---------------- LOCKSTEP (chamado a cada frame na corrida) ----------------
  mySeatIndex(): number { return this.seats.findIndex(s => s.kind === 'human' && s.owner === this.myId); }
  controlsActiveSeat(): boolean { const m = this.mgr; if (!m) return false; const s = this.seats[m.current]; return !!s && s.kind === 'human' && !s.off && s.owner === this.myId; }
  // token = nº do próximo peteléco (monotônico e único, mesmo com bônus que devolve peteléco)
  private tok(m: GameManager): string { return String(m.flickCount); }

  private emitFlick(m: GameManager, dir: V, power: number, tok: string): void {
    this.applied.add(tok); this.decided = true;
    const msg = { t: 'flick', tok, dir, power };
    if (this.isHost) this.net.broadcast(msg); else this.net.send('host', msg);
    m.flick(dir, power);
  }
  // chamado pelo input local quando é a vez do jogador deste aparelho
  localFlick(dir: V, power: number): void { const m = this.mgr; if (!m || m.phase !== 'aim' || !this.controlsActiveSeat()) return; this.emitFlick(m, dir, power, this.tok(m)); }
  // Caos é modo offline — online não usa itens (no-op seguro)
  localUseItem(): void {}

  tick(dt: number): void {
    const m = this.mgr; if (!m || !this.active || m.phase !== 'aim') return;
    if (this.pendingSync) { m.applySnapshot(this.pendingSync); this.pendingSync = null; }
    const tok = this.tok(m);
    if (tok !== this.lastTok) { this.lastTok = tok; this.decided = false; this.aiWait = 0; if (this.isHost) this.net.broadcast({ t: 'sync', s: m.snapshot() }); }
    if (this.pendingFlick && this.pendingFlick.tok === tok && !this.applied.has(tok)) { const f = this.pendingFlick; this.pendingFlick = null; this.applied.add(tok); this.decided = true; m.flick(f.dir, f.power); return; }
    if (this.decided) return;
    const seat = this.seats[m.current];
    const aiTurn = this.isHost && seat && (seat.kind === 'ai' || seat.off);
    if (aiTurn) { this.aiWait += dt; if (this.aiWait > 0.7) { const cap = m.caps[m.current]; const f = aiFlick(cap, m.caps, m.track); this.emitFlick(m, f.dir, f.power, tok); } }
  }

  aiLabel(k?: AIKind): string { return k ? AI_LABEL[k] : 'IA'; }
}
