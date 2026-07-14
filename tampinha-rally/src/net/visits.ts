// CONTADOR DE VISITAS — quantos aparelhos abriram o jogo por dia, sem servidor.
// Cada aparelho manda UM ping anônimo por dia (evento substituível na mesma
// rede do ranking): sem nome, sem tampinha, sem nada — só "alguém abriu hoje".
// A chave do ping é separada da conta do jogador, então nem o ranking liga
// uma coisa na outra. O PAINEL DO DONO fica trancado por um código secreto:
// aqui no jogo só existe o SHA-256 dele — sem o código, o painel não abre.
import { NEvent, RelayPool, relayUrls, signEvent, verifyEvent, genSk } from './nostr';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

const TAG = 'tmprally-visits-v1';
const KIND = 30078;
const D_PRE = 'tmprally-visit-';
// hash do código do dono (o código NÃO está em lugar nenhum do jogo)
const OWNER_HASH = '5a1bc47997e957f4fc376c4bdbac03135d45882b7fe7cea78df8f9b77d743c4e';

const ALIVE_D = 'tmprally-alive';
const ALIVE_FRESH = 150;   // s — batida mais velha que isso = saiu do jogo

export function visitDayKey(d = new Date()): string { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }

// estado do dia deste aparelho: minutos ativos, corridas e se é a 1ª vez na vida
interface DaySt { d: string; m: number; r: number; n?: number }
function dayState(): DaySt {
  const day = visitDayKey();
  try { const s = JSON.parse(localStorage.getItem('tmprally_vmin') || 'null'); if (s && s.d === day) return s; } catch {}
  return { d: day, m: 0, r: 0 };
}
function saveDay(s: DaySt): void { try { localStorage.setItem('tmprally_vmin', JSON.stringify(s)); } catch {} }

// o jogo avisa quando uma corrida termina (vira o "🏁 corridas de hoje")
export function addRace(): void { try { const s = dayState(); s.r++; saveDay(s); } catch {} }

// BATIDA anônima: ao abrir, e a cada 60s enquanto o jogo está aberto, o aparelho
// atualiza DOIS eventos substituíveis (nada acumula nos relays):
//   • visita do dia: { new, min (minutos com a tela aberta), races }
//   • "tô aqui": evento vazio — quem bateu há <150s conta como ONLINE AGORA
let beatT: ReturnType<typeof setInterval> | null = null;
let beatPool: RelayPool | null = null;
let vk = '';
let lastPub = 0;
function pub(d: string, content: any): void {
  const ts = Math.max(Math.floor(Date.now() / 1000), lastPub + 1); lastPub = ts;   // carimbo sempre crescente
  beatPool?.publish(signEvent(vk, KIND, [['d', d], ['t', TAG]], JSON.stringify(content), ts));
}
export function startVisitBeat(): void {
  try {
    if (beatT) return;
    vk = localStorage.getItem('tmprally_vk') || genSk(); localStorage.setItem('tmprally_vk', vk);
    const first = localStorage.getItem('tmprally_seen') ? 0 : 1;   // 1ª vez no jogo?
    localStorage.setItem('tmprally_seen', '1');
    if (first) { const s = dayState(); s.n = 1; saveDay(s); }
    beatPool = new RelayPool(relayUrls(), { kinds: [KIND], '#t': [TAG], limit: 1 });
    beatPool.start();
    const send = () => { const s = dayState(); pub(D_PRE + s.d, { new: s.n ? 1 : 0, min: s.m, races: s.r }); pub(ALIVE_D, {}); };
    send();
    beatT = setInterval(() => {
      const s = dayState();
      if (!document.hidden) { s.m++; saveDay(s); }   // minuto com a tela aberta
      send();
    }, 60_000);
  } catch {}
}

// ---------- portão do dono ----------
export function checkOwnerCode(code: string): boolean {
  try { return bytesToHex(sha256(new TextEncoder().encode(code.trim().toUpperCase()))) === OWNER_HASH; } catch { return false; }
}
export function ownerUnlocked(): boolean { return checkOwnerCode(localStorage.getItem('tmprally_owner') || ''); }
export function unlockOwner(code: string): boolean {
  if (!checkOwnerCode(code)) return false;
  localStorage.setItem('tmprally_owner', code.trim().toUpperCase()); return true;
}

// ---------- livro de visitas (só o painel do dono usa) ----------
interface Rec { ts: number; neu: number; min: number; races: number }
export interface VisitDay { day: string; label: string; total: number; novos: number; min: number; races: number; avg: number; }
export class VisitLog {
  onChange: () => void = () => {};
  status: 'connecting' | 'online' = 'connecting';
  private pool: RelayPool | null = null;
  private byDay = new Map<string, Map<string, Rec>>();   // dia → aparelho → última batida
  private alive = new Map<string, number>();             // aparelho → último "tô aqui"

  start(): void {
    if (this.pool) { this.pool.refresh(); return; }
    this.pool = new RelayPool(relayUrls(), { kinds: [KIND], '#t': [TAG], limit: 3000 });
    this.pool.onEvent = (ev) => this.absorb(ev);
    this.pool.onStatus = (open) => { const st = open > 0 ? 'online' : 'connecting'; if (st !== this.status) { this.status = st; this.onChange(); } };
    this.pool.start();
  }
  stop(): void { this.pool?.stop(); this.pool = null; }

  private absorb(ev: NEvent): void {
    if (ev.kind !== KIND || !verifyEvent(ev)) return;
    const d = ev.tags.find(t => t[0] === 'd')?.[1] || '';
    if (d === ALIVE_D) {                                 // batida de "online agora"
      const cur = this.alive.get(ev.pubkey);
      if (!cur || cur < ev.created_at) { this.alive.set(ev.pubkey, ev.created_at); this.onChange(); }
      return;
    }
    if (!d.startsWith(D_PRE)) return;
    const day = d.slice(D_PRE.length);
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(day)) return;
    let neu = 0, min = 0, races = 0;
    try { const c = JSON.parse(ev.content); neu = c.new ? 1 : 0; min = Math.max(0, Math.min(1440, +c.min || 0)); races = Math.max(0, Math.min(999, +c.races || 0)); } catch {}
    let m = this.byDay.get(day); if (!m) { m = new Map(); this.byDay.set(day, m); }
    const cur = m.get(ev.pubkey);
    if (cur && cur.ts >= ev.created_at) return;          // batida velha não volta no tempo
    m.set(ev.pubkey, { ts: ev.created_at, neu, min, races });
    this.onChange();
  }

  // quantos aparelhos bateram "tô aqui" nos últimos 150s
  onlineNow(now = Math.floor(Date.now() / 1000)): number {
    let n = 0; this.alive.forEach(ts => { if (now - ts < ALIVE_FRESH) n++; }); return n;
  }

  // últimos `n` dias com visita (mais recente primeiro)
  list(n = 30): VisitDay[] {
    const parse = (k: string) => { const [y, mo, dd] = k.split('-').map(Number); return new Date(y, mo - 1, dd).getTime(); };
    return [...this.byDay.entries()]
      .map(([day, m]) => {
        const [y, mo, dd] = day.split('-').map(Number);
        let novos = 0, min = 0, races = 0;
        m.forEach(v => { novos += v.neu; min += v.min; races += v.races; });
        return { day, label: `${String(dd).padStart(2, '0')}/${String(mo).padStart(2, '0')}/${y}`, total: m.size, novos, min, races, avg: m.size ? Math.round(min / m.size) : 0 };
      })
      .sort((a, b) => parse(b.day) - parse(a.day))
      .slice(0, n);
  }
  today(): VisitDay | null { return this.list(60).find(v => v.day === visitDayKey()) || null; }
  totalDevices(): number { const s = new Set<string>(); this.byDay.forEach(m => m.forEach((_, pub) => s.add(pub))); return s.size; }
}
