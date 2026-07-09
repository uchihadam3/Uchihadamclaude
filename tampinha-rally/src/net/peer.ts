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

// STUN + TURN (relay grátis Open Relay): ESSENCIAL no 4G/5G, onde a maioria das
// operadoras usa NAT que bloqueia P2P direto — sem TURN a conexão não fecha.
const ICE = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
  { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
  { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
];
const POPTS = { debug: 0, config: { iceServers: ICE } };
const RETRY = new Set(['unavailable-id', 'network', 'server-error', 'socket-error', 'socket-closed', 'disconnected']);

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
      const code = attempt > 0 && this.code ? this.code : randCode();   // mantém o código nas retentativas de rede
      const peer: Peer = new PeerLib(NS + code, POPTS);
      this.peer = peer; this.code = code;
      let opened = false;
      peer.on('open', () => { opened = true; this.onOpen(code); });
      peer.on('connection', (conn) => this.accept(conn));
      peer.on('error', (e: any) => {
        const t = (e && e.type) || String(e);
        if (t === 'unavailable-id') this.code = '';                     // troca de código nessa falha
        if (RETRY.has(t) && attempt < 8) { try { peer.destroy(); } catch {} setTimeout(() => tryOpen(attempt + 1), 700 + attempt * 400); }
        else if (t !== 'peer-unavailable') this.onError(t);
      });
      // se em 14s não abriu, tenta de novo (broker lento/instável)
      setTimeout(() => { if (!opened && attempt < 8) { try { peer.destroy(); } catch {} tryOpen(attempt + 1); } }, 14000);
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
    let connected = false;
    const tryJoin = (attempt: number) => {
      const again = (delay = 700) => { if (!connected && attempt < 7) setTimeout(() => tryJoin(attempt + 1), delay + attempt * 300); else if (!connected) this.onError('peer-unavailable'); };
      loadPeer().then((PeerLib) => {
        const peer: Peer = new PeerLib(POPTS); this.peer = peer;
        let opened = false;
        peer.on('open', () => {
          opened = true;
          const conn = peer.connect(NS + this.code, { reliable: true });
          conn.on('open', () => { connected = true; this.conns.set('host', conn); this.onOpen(this.code); });
          conn.on('data', (d: any) => this.onData('host', d));
          conn.on('close', () => this.onLeave('host'));
          conn.on('error', () => { try { peer.destroy(); } catch {} again(); });
          setTimeout(() => { if (!connected) { try { peer.destroy(); } catch {} again(); } }, 16000);   // WebRTC via TURN demora
        });
        peer.on('error', (e: any) => {
          const t = (e && e.type) || String(e);
          try { peer.destroy(); } catch {}
          if (t === 'peer-unavailable') { if (!connected) again(1200); }   // sala pode não ter registrado ainda: tenta mais um pouco
          else if (RETRY.has(t)) again();
          else if (!connected) this.onError(t);
        });
        setTimeout(() => { if (!opened && !connected) { try { peer.destroy(); } catch {} again(); } }, 12000);
      }).catch(() => this.onError('load'));
    };
    tryJoin(0);
  }

  send(to: string, msg: NetMsg): void { const c = this.conns.get(to); if (c && c.open) try { c.send(msg); } catch {} }
  broadcast(msg: NetMsg): void { for (const c of this.conns.values()) if (c.open) try { c.send(msg); } catch {} }
  relay(origin: string, msg: NetMsg): void { for (const [id, c] of this.conns) if (id !== origin && c.open) try { c.send(msg); } catch {} }
  count(): number { return this.conns.size; }
  destroy(): void { try { this.peer?.destroy(); } catch {} this.conns.clear(); this.peer = null; }
}
