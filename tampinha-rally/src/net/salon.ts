// SALÃO ONLINE — quem está online AGORA e as salas abertas, na mesma rede sem
// servidor do ranking (Nostr). Cada jogador no salão publica PRESENÇA (evento
// substituível com carimbo de tempo — some sozinho quando fecha o jogo); quem
// abre sala publica a SALA (código, modo, vagas, cadeado). Convite é endereçado
// (content.to = pubkey do convidado) e aparece como chamado na tela dele.
// A conexão do JOGO continua 100% P2P — o salão é só o mural de encontros.
import { NEvent, RelayPool, relayUrls, signEvent, verifyEvent, genSk, pkOf } from './nostr';

const TAG = 'tmprally-salon-v1';
const KIND = 30078;
const FRESH = 75;          // s — presença/sala mais velha que isso morreu
const BEAT = 25_000;       // ms — batida do coração

export interface SalonUser { pub: string; name: string; ts: number; }
export interface SalonRoom { pub: string; host: string; code: string; mode: string; taken: number; slots: number; lock: boolean; ts: number; }

export class Salon {
  onChange: () => void = () => {};
  onInvite: (from: string, code: string) => void = () => {};
  status: 'off' | 'connecting' | 'online' = 'off';
  myName = '';
  private pool: RelayPool | null = null;
  private sk: string;
  private hb: ReturnType<typeof setInterval> | null = null;
  private users = new Map<string, SalonUser>();
  private rooms = new Map<string, SalonRoom & { closed?: boolean }>();
  private myRoom: { code: string; mode: string; taken: number; slots: number; lock: boolean } | null = null;
  private inviteSeen = Math.floor(Date.now() / 1000);   // só convites NOVOS contam

  constructor() {
    let k = localStorage.getItem('tmprally_nsec');
    if (!k) { k = genSk(); localStorage.setItem('tmprally_nsec', k); }
    this.sk = k;
  }
  myPub(): string { return pkOf(this.sk); }

  start(name: string): void {
    this.myName = (name || 'Jogador').slice(0, 12);
    if (this.pool) { this.pool.refresh(); this.beat(); return; }
    this.status = 'connecting'; this.onChange();
    this.pool = new RelayPool(relayUrls(), { kinds: [KIND], '#t': [TAG], limit: 300 });
    this.pool.onEvent = (ev) => this.absorb(ev);
    this.pool.onStatus = (open) => { const st = open > 0 ? 'online' : 'connecting'; if (st !== this.status) { this.status = st; this.onChange(); } };
    this.pool.start();
    this.beat();
    this.hb = setInterval(() => this.beat(), BEAT);
  }
  stop(): void {
    if (this.hb) { clearInterval(this.hb); this.hb = null; }
    if (this.myRoom) this.closeRoom();
    this.pool?.stop(); this.pool = null;
    this.status = 'off'; this.onChange();
  }

  // batida: presença (e a sala, se eu tiver uma) sempre fresquinhas
  private beat(): void {
    this.publish('tmprally-presence', { name: this.myName });
    if (this.myRoom) this.publish('tmprally-room', { ...this.myRoom, host: this.myName });
  }
  // carimbo SEMPRE crescente: duas mudanças no mesmo segundo (entrou gente,
  // fechou a sala…) não podem se atropelar no dedup dos outros aparelhos
  private lastPub = 0;
  private publish(d: string, content: any): void {
    const ts = Math.max(Math.floor(Date.now() / 1000), this.lastPub + 1); this.lastPub = ts;
    const ev = signEvent(this.sk, KIND, [['d', d], ['t', TAG]], JSON.stringify(content), ts);
    this.absorb(ev); this.pool?.publish(ev);
  }

  // sala aberta ↔ atualizada ↔ fechada (o anfitrião chama a cada mudança)
  publishRoom(info: { code: string; mode: string; taken: number; slots: number; lock: boolean }): void {
    this.myRoom = info;
    this.publish('tmprally-room', { ...info, host: this.myName });
  }
  closeRoom(): void {
    if (!this.myRoom) return;
    this.myRoom = null;
    this.publish('tmprally-room', { closed: 1 });
  }
  // chamar alguém pra minha sala
  invite(targetPub: string, code: string): void {
    this.publish('tmprally-inv', { to: targetPub, code, from: this.myName });
  }

  private absorb(ev: NEvent): void {
    if (ev.kind !== KIND || !verifyEvent(ev)) return;
    const d = ev.tags.find(t => t[0] === 'd')?.[1] || '';
    try {
      if (d === 'tmprally-presence') {
        const c = JSON.parse(ev.content);
        const cur = this.users.get(ev.pubkey);
        if (cur && cur.ts >= ev.created_at) return;
        this.users.set(ev.pubkey, { pub: ev.pubkey, name: String(c.name || '???').slice(0, 12), ts: ev.created_at });
        this.onChange();
      } else if (d === 'tmprally-room') {
        const c = JSON.parse(ev.content);
        const cur = this.rooms.get(ev.pubkey);
        if (cur && cur.ts >= ev.created_at) return;
        if (c.closed) { this.rooms.delete(ev.pubkey); this.onChange(); return; }
        if (typeof c.code !== 'string' || !/^[A-Z0-9]{4,6}$/.test(c.code)) return;
        this.rooms.set(ev.pubkey, {
          pub: ev.pubkey, host: String(c.host || '???').slice(0, 12), code: c.code,
          mode: String(c.mode || 'normal'), taken: Math.max(1, Math.min(6, +c.taken || 1)),
          slots: Math.max(2, Math.min(6, +c.slots || 4)), lock: !!c.lock, ts: ev.created_at,
        });
        this.onChange();
      } else if (d === 'tmprally-inv') {
        const c = JSON.parse(ev.content);
        if (c.to !== this.myPub() || ev.pubkey === this.myPub()) return;
        if (ev.created_at <= this.inviteSeen) return;              // convite velho
        this.inviteSeen = ev.created_at;
        if (typeof c.code === 'string' && /^[A-Z0-9]{4,6}$/.test(c.code)) this.onInvite(String(c.from || '???').slice(0, 12), c.code);
      }
    } catch {}
  }

  private fresh(ts: number): boolean { return Math.floor(Date.now() / 1000) - ts < FRESH; }
  usersOnline(): SalonUser[] {
    return [...this.users.values()].filter(u => this.fresh(u.ts)).sort((a, b) => b.ts - a.ts).slice(0, 40);
  }
  roomsOpen(): SalonRoom[] {
    return [...this.rooms.values()].filter(r => this.fresh(r.ts) && !r.closed && r.taken < r.slots).sort((a, b) => b.ts - a.ts).slice(0, 30);
  }
}
