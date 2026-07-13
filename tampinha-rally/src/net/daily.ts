// DESAFIO DIÁRIO MUNDIAL — todo mundo joga a MESMA pista do dia (a semente é a
// data) e o resultado vai pro ranking GLOBAL por MENOS petelecos, na mesma rede
// do ranking (Nostr, sem servidor). Um evento SUBSTITUÍVEL por pessoa por dia
// (d = tmprally-daily-<dia>): melhorou o recorde, o evento novo substitui o
// antigo — impossível aparecer duas vezes. Guarda também o dia de ONTEM, pra
// mostrar "você ficou em 12º ontem".
import { NEvent, RelayPool, relayUrls, signEvent, verifyEvent, genSk, pkOf } from './nostr';

const TAG = 'tmprally-daily-v1';
const KIND = 30078;

export interface DailyRow { pub: string; name: string; flicks: number; cap: string; ts: number; }

export function dayKeyOf(d: Date): string { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
export function yesterdayKey(): string { const d = new Date(); d.setDate(d.getDate() - 1); return dayKeyOf(d); }

export class DailyNet {
  onChange: () => void = () => {};
  status: 'off' | 'connecting' | 'online' = 'off';
  private pool: RelayPool | null = null;
  private sk: string;
  private days = new Map<string, Map<string, DailyRow>>();   // dia → pubkey → linha

  constructor() {
    let k = localStorage.getItem('tmprally_nsec');
    if (!k) { k = genSk(); localStorage.setItem('tmprally_nsec', k); }
    this.sk = k;
  }
  myPub(): string { return pkOf(this.sk); }

  start(): void {
    if (this.pool) { this.pool.refresh(); return; }
    this.status = 'connecting'; this.onChange();
    this.pool = new RelayPool(relayUrls(), { kinds: [KIND], '#t': [TAG], limit: 500 });
    this.pool.onEvent = (ev) => this.absorb(ev);
    this.pool.onStatus = (open) => { const st = open > 0 ? 'online' : 'connecting'; if (st !== this.status) { this.status = st; this.onChange(); } };
    this.pool.start();
  }
  stop(): void { this.pool?.stop(); this.pool = null; this.status = 'off'; this.onChange(); }

  private absorb(ev: NEvent): void {
    if (ev.kind !== KIND || !verifyEvent(ev)) return;
    const d = ev.tags.find(t => t[0] === 'd')?.[1] || '';
    if (!d.startsWith('tmprally-daily-')) return;
    const day = d.slice('tmprally-daily-'.length);
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(day)) return;
    try {
      const c = JSON.parse(ev.content);
      const flicks = Math.round(Number(c.flicks));
      if (!Number.isFinite(flicks) || flicks < 1 || flicks > 99) return;
      const rows = this.days.get(day) || new Map<string, DailyRow>();
      const cur = rows.get(ev.pubkey);
      if (cur && cur.ts >= ev.created_at) return;                // substituível: mais novo vale
      rows.set(ev.pubkey, { pub: ev.pubkey, name: String(c.name || '').slice(0, 14) || '???', flicks, cap: String(c.cap || 'coca').slice(0, 24), ts: ev.created_at });
      this.days.set(day, rows);
      this.onChange();
    } catch {}
  }

  // manda o SEU resultado do dia (chama sempre com o MELHOR — substitui o anterior)
  submit(day: string, flicks: number, cap: string, name: string): void {
    const ev = signEvent(this.sk, KIND, [['d', 'tmprally-daily-' + day], ['t', TAG]],
      JSON.stringify({ v: 1, flicks: Math.round(flicks), cap, name: String(name || '').slice(0, 14) }));
    this.absorb(ev); this.pool?.publish(ev);
  }

  standings(day: string): DailyRow[] {
    const rows = [...(this.days.get(day)?.values() || [])];
    rows.sort((a, b) => (a.flicks - b.flicks) || (a.ts - b.ts));   // menos petelecos; empate: quem fez antes
    return rows;
  }
  myPlace(day: string): { place: number; total: number; flicks: number } | null {
    const rows = this.standings(day); const me = this.myPub();
    const i = rows.findIndex(r => r.pub === me);
    return i < 0 ? null : { place: i + 1, total: rows.length, flicks: rows[i].flicks };
  }
}
