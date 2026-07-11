// Transporte NOSTR minimalista (NIP-01) — a espinha do ranking GLOBAL.
// Relays públicos são servidores abertos, gratuitos e PERSISTENTES: publicamos
// a linha de cada jogador como evento SUBSTITUÍVEL (kind 30078, NIP-78) e
// qualquer aparelho, a qualquer hora, baixa o quadro inteiro — não precisa
// ninguém estar online junto, nem servidor nosso. Escrevemos em VÁRIOS relays
// (redundância) e lemos de todos, fundindo com o CRDT do ranking.
import { schnorr } from '@noble/curves/secp256k1.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';

export interface NEvent { id: string; pubkey: string; created_at: number; kind: number; tags: string[][]; content: string; sig: string }

export function genSk(): string { return bytesToHex(schnorr.utils.randomSecretKey()); }
export function pkOf(sk: string): string { return bytesToHex(schnorr.getPublicKey(hexToBytes(sk))); }

// monta e ASSINA um evento (id = sha256 da serialização canônica do NIP-01)
export function signEvent(sk: string, kind: number, tags: string[][], content: string, created_at = Math.floor(Date.now() / 1000)): NEvent {
  const pubkey = pkOf(sk);
  const ser = JSON.stringify([0, pubkey, created_at, kind, tags, content]);
  const id = bytesToHex(sha256(new TextEncoder().encode(ser)));
  const sig = bytesToHex(schnorr.sign(hexToBytes(id), hexToBytes(sk)));
  return { id, pubkey, created_at, kind, tags, content, sig };
}
export function verifyEvent(ev: NEvent): boolean {
  try {
    const ser = JSON.stringify([0, ev.pubkey, ev.created_at, ev.kind, ev.tags, ev.content]);
    const id = bytesToHex(sha256(new TextEncoder().encode(ser)));
    if (id !== ev.id) return false;
    return schnorr.verify(hexToBytes(ev.sig), hexToBytes(ev.id), hexToBytes(ev.pubkey));
  } catch { return false; }
}

// relays públicos estáveis (escreve em todos, lê de todos). Pode trocar em
// localStorage.tmprally_relays = '["wss://…"]' (é assim que o teste local roda).
export const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band',
  'wss://relay.primal.net',
  'wss://nostr.mom',
];
export function relayUrls(): string[] {
  try { const r = JSON.parse(localStorage.getItem('tmprally_relays') || 'null'); if (Array.isArray(r) && r.length) return r; } catch {}
  return DEFAULT_RELAYS;
}

// piscina de relays: conecta, assina (REQ) o filtro do quadro e fica ouvindo;
// publica eventos em todos os que estiverem abertos; reconecta com calma
export class RelayPool {
  onEvent: (ev: NEvent) => void = () => {};
  onStatus: (connected: number, synced: number) => void = () => {};
  private socks: (WebSocket | null)[] = [];
  private open: boolean[] = []; private eosed: boolean[] = [];
  private stopped = true;
  private pend: NEvent[] = [];                       // eventos esperando conexão

  constructor(private urls: string[], private filter: any) {}

  start(): void {
    if (!this.stopped) return;
    this.stopped = false;
    this.urls.forEach((_, i) => this.dial(i, 0));
  }
  stop(): void { this.stopped = true; for (const s of this.socks) try { s?.close(); } catch {} this.socks = []; this.open = []; this.eosed = []; }

  private dial(i: number, attempt: number): void {
    if (this.stopped) return;
    let ws: WebSocket;
    try { ws = new WebSocket(this.urls[i]); } catch { this.redial(i, attempt); return; }
    this.socks[i] = ws;
    const to = setTimeout(() => { if (!this.open[i]) try { ws.close(); } catch {} }, 12000);
    ws.onopen = () => {
      clearTimeout(to);
      if (this.stopped) { try { ws.close(); } catch {} return; }
      this.open[i] = true; this.eosed[i] = false;
      try { ws.send(JSON.stringify(['REQ', 'rk', this.filter])); } catch {}
      for (const ev of this.pend) try { ws.send(JSON.stringify(['EVENT', ev])); } catch {}
      this.emitStatus();
    };
    ws.onmessage = (m) => {
      try {
        const d = JSON.parse(String(m.data));
        if (d[0] === 'EVENT' && d[2]) this.onEvent(d[2] as NEvent);
        else if (d[0] === 'EOSE') { this.eosed[i] = true; this.emitStatus(); }
      } catch {}
    };
    const drop = () => {
      if (this.socks[i] !== ws) return;
      this.open[i] = false; this.eosed[i] = false; this.socks[i] = null;
      this.emitStatus();
      this.redial(i, attempt + 1);
    };
    ws.onclose = drop; ws.onerror = () => { try { ws.close(); } catch {} };
  }
  private redial(i: number, attempt: number): void {
    if (this.stopped) return;
    setTimeout(() => this.dial(i, attempt), Math.min(60000, 2000 * Math.pow(2, Math.min(5, attempt))));
  }
  private emitStatus(): void { this.onStatus(this.open.filter(Boolean).length, this.eosed.filter(Boolean).length); }

  publish(ev: NEvent): void {
    this.pend.push(ev); if (this.pend.length > 8) this.pend.shift();   // re-manda nas reconexões
    for (let i = 0; i < this.socks.length; i++) if (this.open[i]) try { this.socks[i]!.send(JSON.stringify(['EVENT', ev])); } catch {}
  }
  refresh(): void {
    for (let i = 0; i < this.socks.length; i++) if (this.open[i]) try { this.socks[i]!.send(JSON.stringify(['REQ', 'rk', this.filter])); } catch {}
  }
  connected(): number { return this.open.filter(Boolean).length; }
}
