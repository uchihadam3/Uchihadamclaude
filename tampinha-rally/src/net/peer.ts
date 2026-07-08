// Transporte P2P sobre WebRTC (PeerJS, broker público — sem servidor nosso).
// Topologia em ESTRELA: o anfitrião abre um id curto (o "código da sala"); os
// outros conectam nesse id. O anfitrião repassa (relay) mensagens de um cliente
// para os demais. Mensagens são minúsculas (só o peteléco/estado por lance), então
// não há lag — o jogo é por turnos e só sincroniza a jogada.
import type { Peer, DataConnection } from 'peerjs';
// carrega o PeerJS só quando alguém vai de fato pra rede (import dinâmico: não pesa
// no boot e não quebra ambientes sem DOM). Aceita export nomeado OU default.
async function loadPeer(): Promise<any> { const m: any = await import('peerjs'); return m.Peer || m.default || m; }

export type NetMsg = any;

const NS = 'tmprally-';   // prefixo no broker público (evita colisão de código)
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';   // sem 0/O/1/I (fácil de ditar)
export function randCode(n = 5): string { let s = ''; for (let i = 0; i < n; i++) s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]; return s; }

export class Net {
  peer: Peer | null = null;
  isHost = false;
  code = '';
  conns = new Map<string, DataConnection>();   // host: peerId→conn · cliente: 'host'→conn
  onData: (from: string, msg: NetMsg) => void = () => {};
  onOpen: (code: string) => void = () => {};
  onJoin: (peerId: string) => void = () => {};
  onLeave: (peerId: string) => void = () => {};
  onError: (msg: string) => void = () => {};

  host(): void {
    this.isHost = true;
    const tryOpen = async (attempt: number) => {
      const PeerLib = await loadPeer();
      const code = randCode();
      const peer: Peer = new PeerLib(NS + code, { debug: 0 });
      this.peer = peer; this.code = code;
      peer.on('open', () => this.onOpen(code));
      peer.on('connection', (conn) => this.accept(conn));
      peer.on('error', (e: any) => {
        const t = (e && e.type) || String(e);
        if (t === 'unavailable-id' && attempt < 6) { try { peer.destroy(); } catch {} tryOpen(attempt + 1); }
        else if (t !== 'peer-unavailable') this.onError(t);
      });
    };
    tryOpen(0).catch(() => this.onError('load'));
  }

  private accept(conn: DataConnection): void {
    conn.on('open', () => { this.conns.set(conn.peer, conn); this.onJoin(conn.peer); });
    conn.on('data', (d: any) => this.onData(conn.peer, d));
    conn.on('close', () => { if (this.conns.delete(conn.peer)) this.onLeave(conn.peer); });
    conn.on('error', () => { if (this.conns.delete(conn.peer)) this.onLeave(conn.peer); });
  }

  join(code: string): void {
    this.isHost = false; this.code = code.toUpperCase();
    loadPeer().then((PeerLib) => {
    const peer: Peer = new PeerLib({ debug: 0 }); this.peer = peer;
    peer.on('open', () => {
      const conn = peer.connect(NS + this.code, { reliable: true });
      let opened = false;
      conn.on('open', () => { opened = true; this.conns.set('host', conn); this.onOpen(this.code); });
      conn.on('data', (d: any) => this.onData('host', d));
      conn.on('close', () => this.onLeave('host'));
      conn.on('error', () => this.onError('conn'));
      setTimeout(() => { if (!opened) this.onError('peer-unavailable'); }, 12000);
    });
    peer.on('error', (e: any) => this.onError((e && e.type) || String(e)));
    }).catch(() => this.onError('load'));
  }

  send(to: string, msg: NetMsg): void { const c = this.conns.get(to); if (c && c.open) try { c.send(msg); } catch {} }
  broadcast(msg: NetMsg): void { for (const c of this.conns.values()) if (c.open) try { c.send(msg); } catch {} }
  relay(origin: string, msg: NetMsg): void { for (const [id, c] of this.conns) if (id !== origin && c.open) try { c.send(msg); } catch {} }
  count(): number { return this.conns.size; }
  destroy(): void { try { this.peer?.destroy(); } catch {} this.conns.clear(); this.peer = null; }
}
