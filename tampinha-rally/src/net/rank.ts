// RANKING MUNDIAL da Ranqueada — sem servidor próprio: os jogadores formam a
// nuvem. Existe um "HUB" com id fixo no broker P2P: o primeiro jogador que abre
// o ranking VIRA o hub; os demais conectam nele. Todo mundo troca o quadro
// completo (gossip) e cada aparelho guarda uma cópia em localStorage — quando o
// hub sai, o próximo que chegar assume e re-semeia com a cópia dele. O quadro é
// um CRDT simples: linhas por nome com carimbo de tempo + lápides de exclusão,
// então qualquer ordem de fusão converge pro mesmo resultado.
//
// NOME ÚNICO: reivindicar = publicar a linha com claimTs. Se dois reivindicarem
// o mesmo nome sem se ver, na fusão ganha o claimTs MAIS ANTIGO (desempate pelo
// id do aparelho) — o outro é avisado e escolhe outro nome. Excluir a conta
// publica uma lápide, e o nome fica livre pra quem reivindicar DEPOIS dela.
import { peerOpts } from './peer';

async function loadPeer(): Promise<any> { const m: any = await import('peerjs'); return m.Peer || m.default || m; }

export interface RankRow {
  name: string; dev: string; score: number; tier: number; golds: number; cap: string;
  claimTs: number; ts: number; del?: number;   // del = lápide (conta excluída)
}
export type Board = Record<string, RankRow>;   // chave = nome normalizado

// cada CIRCUITO da ranqueada é um mundo próprio: hub, quadro e nomes separados
// (dá pra ser "Diego" na clássica e "Diego" na Caos — não se enxergam)
export const HUB_ID = 'tmprally-RANKHUB-V1';
export const HUB_ID_CAOS = 'tmprally-RANKHUB-CAOS-V1';
const LS_KEY = 'tmprally_rankboard';
const LS_KEY_CAOS = 'tmprally_rankboard_caos';

// nome → chave única (minúsculo, sem acento, espaços colapsados)
export function nameKey(name: string): string {
  return name.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');
}
export function validName(name: string): string | null {
  const n = name.trim().replace(/\s+/g, ' ');
  if (n.length < 2) return 'Muito curto (mínimo 2 letras)';
  if (n.length > 12) return 'Muito longo (máximo 12)';
  if (!/^[\p{L}\p{N} _.-]+$/u.test(n)) return 'Só letras, números, espaço e _ . -';
  return null;
}

// fusão de DUAS linhas do mesmo nome — determinística (qualquer ordem converge)
export function mergeRow(a: RankRow | undefined, b: RankRow | undefined): RankRow | undefined {
  if (!a) return b; if (!b) return a;
  if (a.dev === b.dev) return a.ts >= b.ts ? a : b;              // mesmo dono: mais recente
  const aDel = !!a.del, bDel = !!b.del;
  if (aDel && bDel) return a.ts >= b.ts ? a : b;                  // duas lápides: tanto faz
  if (aDel !== bDel) {                                            // lápide × viva:
    const dead = aDel ? a : b, alive = aDel ? b : a;
    return alive.claimTs > (dead.del || 0) ? alive : dead;        // viva só se reivindicou DEPOIS da exclusão
  }
  // duas vivas de donos diferentes: o claim mais ANTIGO fica com o nome
  if (a.claimTs !== b.claimTs) return a.claimTs < b.claimTs ? a : b;
  return a.dev < b.dev ? a : b;                                   // desempate estável
}
export function mergeBoards(into: Board, from: Board): boolean {
  let changed = false;
  for (const k of Object.keys(from)) {
    const m = mergeRow(into[k], from[k]);
    if (m && m !== into[k]) { into[k] = m; changed = true; }
  }
  return changed;
}
// o nome está livre pra ESTE aparelho?
export function nameFree(board: Board, name: string, dev: string): boolean {
  const r = board[nameKey(name)];
  return !r || !!r.del || r.dev === dev;
}
// classificação (vivas, maior pontuação primeiro)
export function standings(board: Board): RankRow[] {
  return Object.values(board).filter(r => !r.del).sort((x, y) => y.score - x.score || x.claimTs - y.claimTs);
}

export type RankStatus = 'off' | 'connecting' | 'online' | 'hub';

export class RankNet {
  board: Board = {};
  status: RankStatus = 'off';
  onChange: () => void = () => {};                 // quadro OU status mudou
  onNameLost: (name: string) => void = () => {};   // perdeu a disputa do nome
  private hubId: string; private lsKey: string;
  private peer: any = null;
  private conns = new Map<string, any>();          // hub: peerId→conn · cliente: {'hub'}
  private myName: string | null = null; private myDev = '';
  private stopped = true; private attempt = 0;

  constructor(circ: 'normal' | 'caos' = 'normal') {
    this.hubId = circ === 'caos' ? HUB_ID_CAOS : HUB_ID;
    this.lsKey = circ === 'caos' ? LS_KEY_CAOS : LS_KEY;
    this.loadLocal();
  }
  private loadLocal(): void { try { this.board = JSON.parse(localStorage.getItem(this.lsKey) || '{}') || {}; } catch { this.board = {}; } }
  private persist(): void { try { localStorage.setItem(this.lsKey, JSON.stringify(this.board)); } catch {} }

  // publica/atualiza a MINHA linha (e propaga se estiver online)
  submit(row: RankRow): void {
    this.myName = row.del ? null : row.name; this.myDev = row.dev;
    const changed = mergeBoards(this.board, { [nameKey(row.name)]: row });
    if (changed) this.persist();
    const msg = { t: 'up', row };
    if (this.status === 'hub') this.broadcast(msg);
    else if (this.status === 'online') this.send(msg);
    this.onChange();
  }
  watch(myName: string | null, myDev: string): void { this.myName = myName; this.myDev = myDev; }

  private setStatus(s: RankStatus): void { if (this.status !== s) { this.status = s; this.onChange(); } }
  private absorb(from: Board): void {
    const changed = mergeBoards(this.board, from);
    if (changed) {
      this.persist();
      // alguém ficou com o MEU nome? (claim mais antigo que o meu venceu a fusão)
      if (this.myName) { const r = this.board[nameKey(this.myName)]; if (r && !r.del && r.dev !== this.myDev) { const n = this.myName; this.myName = null; this.onNameLost(n); } }
      this.onChange();
    }
  }

  start(): void {
    if (!this.stopped) return;
    this.stopped = false; this.attempt = 0;
    this.setStatus('connecting');
    this.tryJoin();
  }
  stop(): void { this.stopped = true; this.destroyPeer(); this.setStatus('off'); }
  private destroyPeer(): void { try { this.peer?.destroy(); } catch {} this.peer = null; this.conns.clear(); }
  private later(fn: () => void, ms: number): void { setTimeout(() => { if (!this.stopped) fn(); }, ms); }
  private fail(): void {
    // sem conexão: fica offline (quadro local continua valendo) e re-tenta devagar
    this.destroyPeer(); this.setStatus('off');
    this.later(() => { this.setStatus('connecting'); this.attempt = 0; this.tryJoin(); }, 45000);
  }

  // 1) tenta entrar no hub existente; se não houver, 2) tenta VIRAR o hub
  private tryJoin(): void {
    if (this.stopped) return;
    this.destroyPeer();
    loadPeer().then((PeerLib) => {
      if (this.stopped) return;
      const peer = new PeerLib(peerOpts()); this.peer = peer;
      let done = false;
      const giveup = (toHost: boolean) => { if (done || this.stopped) return; done = true; this.destroyPeer(); if (toHost) this.tryHost(); else this.retry(); };
      peer.on('open', () => {
        if (this.stopped) return;
        const conn = peer.connect(this.hubId, { reliable: true });
        conn.on('open', () => {
          if (this.stopped) return;
          done = true; this.conns.set('hub', conn);
          conn.send({ t: 'hi', board: this.board });
          this.setStatus('online');
        });
        conn.on('data', (d: any) => this.clientData(d));
        conn.on('close', () => { this.conns.delete('hub'); if (!this.stopped && this.status === 'online') { this.setStatus('connecting'); this.attempt = 0; this.later(() => this.tryJoin(), 800); } });
        conn.on('error', () => giveup(true));
        setTimeout(() => { if (!done) giveup(true); }, 12000);
      });
      peer.on('error', (e: any) => {
        const t = (e && e.type) || String(e);
        if (t === 'peer-unavailable') giveup(true);            // hub vazio → eu assumo
        else giveup(false);
      });
      setTimeout(() => { if (!done) giveup(false); }, 15000);
    }).catch(() => this.fail());
  }
  private tryHost(): void {
    if (this.stopped) return;
    loadPeer().then((PeerLib) => {
      if (this.stopped) return;
      const peer = new PeerLib(this.hubId, peerOpts()); this.peer = peer;
      let done = false;
      peer.on('open', () => { if (this.stopped) return; done = true; this.setStatus('hub'); });
      peer.on('connection', (conn: any) => {
        conn.on('open', () => this.conns.set(conn.peer, conn));
        conn.on('data', (d: any) => this.hubData(conn, d));
        conn.on('close', () => this.conns.delete(conn.peer));
        conn.on('error', () => this.conns.delete(conn.peer));
      });
      peer.on('error', (e: any) => {
        const t = (e && e.type) || String(e);
        if (done && (t === 'network' || t === 'disconnected')) return;   // broker piscou; peerjs re-conecta
        if (done) return;
        done = true; this.destroyPeer();
        if (t === 'unavailable-id') { this.later(() => this.tryJoin(), 400); }   // outro virou hub primeiro
        else this.retry();
      });
      setTimeout(() => { if (!done && !this.stopped) { this.destroyPeer(); this.retry(); } }, 15000);
    }).catch(() => this.fail());
  }
  private retry(): void {
    this.attempt++;
    if (this.attempt >= 3) { this.fail(); return; }
    this.later(() => this.tryJoin(), 900 * this.attempt);
  }

  // ---- hub: funde e re-espalha ----
  private hubData(conn: any, d: any): void {
    if (d.t === 'hi' && d.board) { this.absorb(d.board); try { conn.send({ t: 'board', board: this.board }); } catch {} }
    else if (d.t === 'up' && d.row) { this.absorb({ [nameKey(d.row.name)]: d.row }); this.broadcast({ t: 'board', board: this.board }, conn.peer); try { conn.send({ t: 'board', board: this.board }); } catch {} }
    else if (d.t === 'pull') { try { conn.send({ t: 'board', board: this.board }); } catch {} }
  }
  private clientData(d: any): void { if (d.t === 'board' && d.board) this.absorb(d.board); }
  private broadcast(msg: any, except?: string): void { for (const [id, c] of this.conns) if (id !== except && c.open) try { c.send(msg); } catch {} }
  private send(msg: any): void { const c = this.conns.get('hub'); if (c && c.open) try { c.send(msg); } catch {} }
  refresh(): void { if (this.status === 'online') this.send({ t: 'pull' }); }
}
