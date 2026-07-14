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

export function visitDayKey(d = new Date()): string { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }

// ping anônimo: 1 por aparelho por dia, alguns segundos depois do jogo abrir
export function pingVisit(): void {
  try {
    const day = visitDayKey();
    if (localStorage.getItem('tmprally_lastvisit') === day) return;   // hoje já contou
    let k = localStorage.getItem('tmprally_vk');                      // chave SÓ do contador
    if (!k) { k = genSk(); localStorage.setItem('tmprally_vk', k); }
    const first = localStorage.getItem('tmprally_seen') ? 0 : 1;      // 1ª vez no jogo?
    localStorage.setItem('tmprally_seen', '1');
    const ev = signEvent(k, KIND, [['d', D_PRE + day], ['t', TAG]], JSON.stringify({ new: first }));
    const pool = new RelayPool(relayUrls(), { kinds: [KIND], '#t': [TAG], limit: 1 });
    pool.start(); pool.publish(ev);
    localStorage.setItem('tmprally_lastvisit', day);
    setTimeout(() => pool.stop(), 15000);                             // manda e fecha
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
export interface VisitDay { day: string; label: string; total: number; novos: number; }
export class VisitLog {
  onChange: () => void = () => {};
  status: 'connecting' | 'online' = 'connecting';
  private pool: RelayPool | null = null;
  private byDay = new Map<string, Map<string, number>>();   // dia → aparelho → novo?

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
    if (!d.startsWith(D_PRE)) return;
    const day = d.slice(D_PRE.length);
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(day)) return;
    let neu = 0; try { neu = JSON.parse(ev.content).new ? 1 : 0; } catch {}
    let m = this.byDay.get(day); if (!m) { m = new Map(); this.byDay.set(day, m); }
    if (!m.has(ev.pubkey)) { m.set(ev.pubkey, neu); this.onChange(); }
  }

  // últimos `n` dias com visita (mais recente primeiro)
  list(n = 30): VisitDay[] {
    const parse = (k: string) => { const [y, mo, dd] = k.split('-').map(Number); return new Date(y, mo - 1, dd).getTime(); };
    return [...this.byDay.entries()]
      .map(([day, m]) => {
        const [y, mo, dd] = day.split('-').map(Number);
        let novos = 0; m.forEach(v => { novos += v; });
        return { day, label: `${String(dd).padStart(2, '0')}/${String(mo).padStart(2, '0')}/${y}`, total: m.size, novos };
      })
      .sort((a, b) => parse(b.day) - parse(a.day))
      .slice(0, n);
  }
  today(): VisitDay | null { return this.list(60).find(v => v.day === visitDayKey()) || null; }
  totalDevices(): number { const s = new Set<string>(); this.byDay.forEach(m => m.forEach((_, pub) => s.add(pub))); return s.size; }
}
