// RANKING MUNDIAL da Ranqueada — ONLINE DE VERDADE, sem servidor nosso: cada
// jogador publica a própria linha (assinada) em RELAYS PÚBLICOS Nostr, que são
// servidores abertos, gratuitos e PERSISTENTES. Qualquer aparelho, a qualquer
// hora, baixa o quadro inteiro de vários relays — não precisa ninguém estar
// online junto. A linha é um evento SUBSTITUÍVEL (uma por jogador, sempre a
// mais nova), e o quadro é um CRDT: fusão por carimbo de tempo + lápides de
// exclusão, então qualquer ordem de chegada converge pro mesmo resultado.
//
// NOME ÚNICO por circuito: reivindicar = publicar a linha com claimTs. Se dois
// reivindicarem o mesmo nome sem se ver, ganha o claimTs MAIS ANTIGO — o outro
// é avisado e escolhe outro nome. Excluir a conta publica uma lápide, e o nome
// fica livre pra quem reivindicar DEPOIS dela.
import { NEvent, RelayPool, genSk, pkOf, signEvent, verifyEvent, relayUrls } from './nostr';

export interface RankRow {
  name: string; dev: string; score: number; tier: number; golds: number; cap: string;
  claimTs: number; ts: number; del?: number;   // del = lápide (conta excluída)
}
export type Board = Record<string, RankRow>;   // chave = nome normalizado

// cada CIRCUITO da ranqueada é um mundo próprio: etiqueta, quadro e nomes
// separados (dá pra ser "Diego" na clássica e "Diego" na Caos)
const APP_KIND = 30078;                              // evento de dados de app (substituível por jogador)
const TAG = 'tmprally-rank-v2';
const TAG_CAOS = 'tmprally-rank-caos-v2';
const LS_KEY = 'tmprally_rankboard';
const LS_KEY_CAOS = 'tmprally_rankboard_caos';
// chave deste aparelho (assina as publicações; criada uma vez, fica no aparelho)
function deviceSk(): string {
  try {
    let k = localStorage.getItem('tmprally_nsec');
    if (!k) { k = genSk(); localStorage.setItem('tmprally_nsec', k); }
    return k;
  } catch { return genSk(); }
}

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
  private tag: string; private lsKey: string;
  private pool: RelayPool | null = null;
  private myName: string | null = null; private myDev = '';
  private started = false; private everSynced = false;

  constructor(circ: 'normal' | 'caos' = 'normal') {
    this.tag = circ === 'caos' ? TAG_CAOS : TAG;
    this.lsKey = circ === 'caos' ? LS_KEY_CAOS : LS_KEY;
    this.loadLocal();
  }
  private loadLocal(): void { try { this.board = JSON.parse(localStorage.getItem(this.lsKey) || '{}') || {}; } catch { this.board = {}; } }
  private persist(): void { try { localStorage.setItem(this.lsKey, JSON.stringify(this.board)); } catch {} }

  // publica/atualiza a MINHA linha: funde local e manda pros relays (assinada).
  // O evento é substituível: cada aparelho tem UMA linha viva por circuito.
  submit(row: RankRow): void {
    this.myName = row.del ? null : row.name; this.myDev = row.dev;
    const changed = mergeBoards(this.board, { [nameKey(row.name)]: row });
    if (changed) this.persist();
    if (this.pool) {
      const ev = signEvent(deviceSk(), APP_KIND, [['d', this.tag], ['t', this.tag]], JSON.stringify(row));
      this.pool.publish(ev);
    }
    this.onChange();
  }
  watch(myName: string | null, myDev: string): void { this.myName = myName; this.myDev = myDev; }

  private setStatus(st: RankStatus): void { if (this.status !== st) { this.status = st; this.onChange(); } }
  private absorb(from: Board): void {
    const changed = mergeBoards(this.board, from);
    if (changed) {
      this.persist();
      // alguém ficou com o MEU nome? (claim mais antigo que o meu venceu a fusão)
      if (this.myName) { const r = this.board[nameKey(this.myName)]; if (r && !r.del && r.dev !== this.myDev) { const n = this.myName; this.myName = null; this.onNameLost(n); } }
      this.onChange();
    }
  }
  // evento do relay → linha do quadro (valida assinatura, forma e limites)
  private absorbEvent(ev: NEvent): void {
    if (!ev || ev.kind !== APP_KIND || !verifyEvent(ev)) return;
    let row: any; try { row = JSON.parse(ev.content); } catch { return; }
    if (!row || typeof row.name !== 'string' || typeof row.dev !== 'string') return;
    if (validName(row.name)) return;
    row.score = Math.max(0, Math.min(99999, +row.score || 0));
    row.tier = Math.max(0, Math.min(4, +row.tier || 0));
    row.golds = Math.max(0, Math.min(40, +row.golds || 0));
    row.claimTs = +row.claimTs || 0; row.ts = +row.ts || 0;
    if (typeof row.cap !== 'string') row.cap = 'coca';
    this.absorb({ [nameKey(row.name)]: row });
  }

  start(): void {
    if (this.started) return;
    this.started = true;
    this.setStatus('connecting');
    this.pool = new RelayPool(relayUrls(), { kinds: [APP_KIND], '#t': [this.tag], limit: 1000 });
    this.pool.onEvent = (ev) => this.absorbEvent(ev);
    this.pool.onStatus = (conn, synced) => {
      if (synced > 0) this.everSynced = true;
      this.setStatus(conn > 0 ? (this.everSynced ? 'online' : 'connecting') : 'connecting');
    };
    this.pool.start();
    // sem relay algum depois de um tempão → offline (cópia local segue valendo)
    setTimeout(() => { if (this.pool && this.pool.connected() === 0) this.setStatus('off'); }, 20000);
  }
  stop(): void { this.started = false; this.pool?.stop(); this.pool = null; this.setStatus('off'); }
  refresh(): void { this.pool?.refresh(); }
}
