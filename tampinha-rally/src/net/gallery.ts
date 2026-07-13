// GALERIA DE PISTAS DA COMUNIDADE — mesmas fundações do ranking global (Nostr):
// · PUBLICAR pista = evento SUBSTITUÍVEL (kind 30078) com d único da pista —
//   republicar a mesma pista atualiza em vez de duplicar;
// · CURTIR = 1 evento substituível POR PESSOA com a LISTA do que ela curtiu
//   (impossível "farmar" curtida: cada chave conta 1 voto por pista).
// Tudo assinado e verificado; qualquer aparelho baixa a galeria a qualquer hora.
import { NEvent, RelayPool, relayUrls, signEvent, verifyEvent, genSk, pkOf } from './nostr';

const TAG = 'tmprally-gallery-v1';
const KIND = 30078;

export interface GalleryTrack {
  key: string;              // pub:trackId — identidade global da pista
  name: string; author: string; data: any;
  ts: number; pub: string; likes: number; mine: boolean; liked: boolean;
}

export class Gallery {
  onChange: () => void = () => {};
  onStatus: (s: 'off' | 'connecting' | 'online') => void = () => {};
  status: 'off' | 'connecting' | 'online' = 'off';
  private pool: RelayPool | null = null;
  private sk: string;
  private tracks = new Map<string, { name: string; author: string; data: any; ts: number; pub: string }>();
  private likeLists = new Map<string, { ts: number; keys: Set<string> }>();   // por pubkey
  private evTs = new Map<string, number>();   // pub:d → created_at (substituível: só o mais novo vale)

  constructor() {
    let k = localStorage.getItem('tmprally_nsec');
    if (!k) { k = genSk(); localStorage.setItem('tmprally_nsec', k); }
    this.sk = k;
  }
  myPub(): string { return pkOf(this.sk); }

  start(): void {
    if (this.pool) { this.pool.refresh(); return; }
    this.status = 'connecting'; this.onStatus(this.status);
    this.pool = new RelayPool(relayUrls(), { kinds: [KIND], '#t': [TAG], limit: 500 });
    this.pool.onEvent = (ev) => this.absorb(ev);
    this.pool.onStatus = (open) => { const st = open > 0 ? 'online' : 'connecting'; if (st !== this.status) { this.status = st; this.onStatus(st); } };
    this.pool.start();
  }
  stop(): void { this.pool?.stop(); this.pool = null; this.status = 'off'; this.onStatus('off'); }

  private absorb(ev: NEvent): void {
    if (ev.kind !== KIND || !verifyEvent(ev)) return;
    const d = ev.tags.find(t => t[0] === 'd')?.[1] || '';
    const ek = ev.pubkey + ':' + d;
    if ((this.evTs.get(ek) || 0) >= ev.created_at) return;   // substituível: mais novo vence
    this.evTs.set(ek, ev.created_at);
    try {
      if (d.startsWith('tmprally-track-')) {
        const c = JSON.parse(ev.content);
        if (!c || typeof c.name !== 'string' || !c.data || typeof c.data !== 'object') return;
        if (c.del) { this.tracks.delete(ek); this.onChange(); return; }   // lápide: autor tirou do ar
        this.tracks.set(ek, {
          name: String(c.name).slice(0, 26), author: String(c.author || '').slice(0, 14) || '???',
          data: c.data, ts: ev.created_at, pub: ev.pubkey,
        });
        this.onChange();
      } else if (d === 'tmprally-likes') {
        const arr = JSON.parse(ev.content);
        if (!Array.isArray(arr)) return;
        this.likeLists.set(ev.pubkey, { ts: ev.created_at, keys: new Set(arr.filter(x => typeof x === 'string').slice(0, 500)) });
        this.onChange();
      }
    } catch {}
  }

  // publica (ou atualiza) uma pista do editor na galeria mundial
  publish(data: any, author: string): void {
    const d = 'tmprally-track-' + String(data.id || 'x').replace(/[^a-z0-9]/gi, '').slice(0, 24);
    const ev = signEvent(this.sk, KIND, [['d', d], ['t', TAG]], JSON.stringify({ v: 1, name: String(data.name || 'Pista').slice(0, 26), author: String(author || '').slice(0, 14), data }));
    this.absorb(ev); this.pool?.publish(ev);
  }
  unpublish(key: string): void {
    const d = key.split(':')[1]; if (!d || key.split(':')[0] !== this.myPub()) return;
    const ev = signEvent(this.sk, KIND, [['d', d], ['t', TAG]], JSON.stringify({ v: 1, name: '-', data: {}, del: 1 }));
    this.absorb(ev); this.pool?.publish(ev);
  }
  myLikes(): Set<string> { return this.likeLists.get(this.myPub())?.keys || new Set(); }
  toggleLike(key: string): void {
    const cur = new Set(this.myLikes());
    if (cur.has(key)) cur.delete(key); else cur.add(key);
    const ev = signEvent(this.sk, KIND, [['d', 'tmprally-likes'], ['t', TAG]], JSON.stringify([...cur]));
    this.absorb(ev); this.pool?.publish(ev);
  }

  list(sort: 'top' | 'new' = 'top'): GalleryTrack[] {
    const likeCount = new Map<string, number>();
    for (const [, l] of this.likeLists) for (const k of l.keys) likeCount.set(k, (likeCount.get(k) || 0) + 1);
    const me = this.myPub(); const mine = this.myLikes();
    const out: GalleryTrack[] = [];
    for (const [key, t] of this.tracks) out.push({ key, ...t, likes: likeCount.get(key) || 0, mine: t.pub === me, liked: mine.has(key) });
    out.sort(sort === 'top' ? (a, b) => (b.likes - a.likes) || (b.ts - a.ts) : (a, b) => b.ts - a.ts);
    return out;
  }
}
