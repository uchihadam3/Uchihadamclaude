// Controlador de MULTIPLAYER ONLINE — sala por código, lobby (até 6, misturando
// humanos e IA) e a corrida em LOCKSTEP determinístico: cada peteléco (humano ou
// da IA) vira uma mensagem minúscula (capId, direção, força); todos aplicam a
// mesma jogada e simulam a MESMA física. O anfitrião ainda manda um "sync" do
// estado em repouso a cada lance, garantindo que ninguém saia do lugar (sem lag,
// todos se veem igualzinho). A IA só é calculada pelo anfitrião e transmitida.
import { Net } from './peer';
import { PlayerDef, GameManager } from '../game/manager';
import { aiFlick, AIKind, AI_KINDS, AI_LABEL } from '../game/ai';
import { SKINS } from '../game/skins';
import { V } from '../engine/core';

export type OPick = 'specific' | 'randlevel' | 'randany';
export interface Seat { name: string; skin: string; kind: 'human' | 'ai'; ai?: AIKind; owner: string; off?: boolean; }

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
  cfg = { level: 0, trackIdx: 0, pick: 'specific' as OPick };
  mgr: GameManager | null = null;

  // eventos p/ a UI
  onRoster: () => void = () => {};
  onError: (m: string) => void = () => {};
  onCode: (code: string) => void = () => {};
  onStartMatch: (players: PlayerDef[], level: number, trackIdx: number) => void = () => {};
  onToLobby: () => void = () => {};
  onClosed: () => void = () => {};

  // lockstep
  private lastTok = ''; private decided = false; private aiWait = 0;
  private applied = new Set<string>();
  private pendingFlick: any = null; private pendingSync: any = null;

  private reset(): void {
    this.net.destroy(); this.net = new Net();
    this.active = false; this.inRoom = false; this.isHost = false; this.code = '';
    this.myId = 'host'; this.humans = []; this.seats = []; this.total = 4; this.mgr = null;
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
    if (this.total < this.humans.length) this.total = this.humans.length;
    if (this.total > 6) this.total = 6; if (this.total < 2) this.total = 2;
    const seats: Seat[] = this.humans.map(h => ({ name: h.name, skin: h.skin, kind: 'human' as const, owner: h.owner, off: h.off }));
    let ai = 0;
    while (seats.length < this.total) { const k = ai++; seats.push({ name: AI_NAMES[k % AI_NAMES.length], skin: SKINS[Math.floor(Math.random() * SKINS.length)].id, kind: 'ai', ai: AI_KINDS[k % AI_KINDS.length], owner: 'host' }); }
    this.seats = seats;
    this.broadcastRoster();
    this.onRoster();
  }
  private broadcastRoster(): void { this.net.broadcast({ t: 'roster', seats: this.seats, total: this.total, cfg: this.cfg }); }

  setTotal(n: number): void { if (!this.isHost) return; this.total = Math.max(this.humans.length, Math.min(6, n)); this.rebuild(); }
  setCfg(level: number, trackIdx: number, pick: OPick): void { if (!this.isHost) return; this.cfg = { level, trackIdx, pick }; this.rebuild(); }
  setMyCap(skin: string): void {
    this.mySkin = skin;
    if (this.isHost) { const h = this.humans.find(x => x.owner === 'host'); if (h) h.skin = skin; this.rebuild(); }
    else this.net.send('host', { t: 'setcap', skin });
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
    else if (msg.t === 'tolobby') { this.active = false; this.onToLobby(); }
    else if (msg.t === 'full') { this.onError('A sala está cheia'); this.onClosed(); }
    else if (msg.t === 'bye') { this.onError('O anfitrião encerrou a sala'); this.onClosed(); }
  }

  // ---------------- INÍCIO DA PARTIDA ----------------
  startMatch(): void {
    if (!this.isHost) return;
    let level = this.cfg.level, idx = this.cfg.trackIdx;
    if (this.cfg.pick === 'randlevel') idx = Math.floor(Math.random() * 10);
    else if (this.cfg.pick === 'randany') { level = Math.floor(Math.random() * 5); idx = Math.floor(Math.random() * 10); }
    this.rebuild();
    const seats = this.seats.map(s => ({ ...s }));
    this.net.broadcast({ t: 'start', level, trackIdx: idx, seats });
    this.beginMatch(level, idx, seats);
  }
  private beginMatch(level: number, trackIdx: number, seats: Seat[]): void {
    this.seats = seats; this.active = true;
    this.lastTok = ''; this.decided = false; this.aiWait = 0; this.applied.clear(); this.pendingFlick = null; this.pendingSync = null;
    const players: PlayerDef[] = seats.map(s => ({ name: s.name + (s.off ? '' : ''), isAI: s.kind === 'ai', ai: s.ai, skin: s.skin }));
    this.onStartMatch(players, level, trackIdx);
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
