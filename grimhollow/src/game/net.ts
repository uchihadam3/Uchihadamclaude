// ============================================================================
// CO-OP · FASE 1 — "ver os amigos".
//
// Camada de rede MÍNIMA sobre o Realtime do Supabase: cada ZONA (vilarejo,
// floresta, um andar da masmorra) é um canal. Entramos no canal da zona em que
// estamos e publicamos a nossa célula/direção; em troca recebemos a de todo
// mundo que está na mesma zona.
//
// Usa PRESENCE (e não broadcast) de propósito: o presence já carrega o estado
// de cada um E resolve entrada/saída sozinho — quem fecha a aba some da lista
// sem precisar de "heartbeat" nem de mensagem de despedida.
//
// A grade ajuda muito aqui: o herói anda de célula em célula (~250ms), então
// uma atualização é só {c, r, facing} — mensagens minúsculas e raras. Nada de
// física contínua, previsão ou rollback.
//
// TUDO É OPCIONAL: sem Supabase configurado, jogando como Convidado ou se a
// conexão falhar, todas as funções viram no-op e o jogo roda exatamente como
// antes (só sozinho).
// ============================================================================
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./supabaseConfig";

// estado que cada jogador publica sobre si
export interface PeerState {
  id: string;        // id do jogador (uid da conta + slot do personagem)
  name: string;      // nome do personagem
  classId: string;   // classe (define a arte do avatar)
  level: number;
  col: number;
  row: number;
  facing: number;    // 0=N 1=L 2=S 3=O
}

type PeersCb = (peers: PeerState[]) => void;

// intervalo mínimo entre publicações (o passo dura ~250ms; isso evita rajadas
// quando o jogador segura o botão de andar)
const PUBLISH_MS = 120;
// numa constante: assim o TS não tenta resolver a URL como módulo no build
const ESM_SUPABASE = "https://esm.sh/@supabase/supabase-js@2";

interface RTChannel {
  on(type: string, filter: unknown, cb: (p: unknown) => void): RTChannel;
  subscribe(cb?: (status: string) => void): RTChannel;
  track(state: unknown): Promise<unknown>;
  untrack(): Promise<unknown>;
  presenceState(): Record<string, unknown[]>;
}
interface RTClient {
  channel(name: string, opts?: unknown): RTChannel;
  removeChannel(ch: RTChannel): void;
}

let client: RTClient | null = null;
let clientLoading: Promise<RTClient | null> | null = null;

// carrega o SDK do Supabase sob demanda (mesmo CDN do login)
async function getClient(): Promise<RTClient | null> {
  if (client) return client;
  if (!isSupabaseConfigured()) return null;
  if (!clientLoading) {
    clientLoading = (async () => {
      try {
        const mod = await import(/* @vite-ignore */ ESM_SUPABASE);
        const create = (mod as { createClient: (u: string, k: string, o?: unknown) => RTClient }).createClient;
        client = create(SUPABASE_URL, SUPABASE_ANON_KEY, {
          realtime: { params: { eventsPerSecond: 12 } },
        });
        return client;
      } catch { return null; }
    })();
  }
  return clientLoading;
}

class NetSession {
  private channel: RTChannel | null = null;
  private zone = "";
  private self: PeerState | null = null;
  private cb: PeersCb | null = null;
  private lastPublish = 0;
  private pending: ReturnType<typeof setTimeout> | null = null;
  private enabled = false;

  /** Liga o co-op. Sem isso (ex.: Convidado) nada é publicado nem recebido. */
  enable(on: boolean): void {
    this.enabled = on;
    if (!on) void this.leave();
  }
  isEnabled(): boolean { return this.enabled && isSupabaseConfigured(); }

  /** Callback chamado sempre que a lista de jogadores da zona muda. */
  onPeers(cb: PeersCb | null): void { this.cb = cb; }

  /** Entra no canal da zona (sai do anterior). `self` é o nosso estado inicial. */
  async join(zone: string, self: PeerState): Promise<void> {
    this.self = { ...self };
    if (!this.isEnabled()) return;
    if (this.zone === zone && this.channel) { void this.publish(true); return; }
    await this.leave();
    const c = await getClient();
    if (!c) return;
    this.zone = zone;
    const ch = c.channel(`gh-zone:${zone}`, { config: { presence: { key: self.id } } });
    // presence sync/join/leave → recalcula a lista de vizinhos
    const emit = () => {
      if (!this.cb || !this.channel) return;
      const raw = this.channel.presenceState();
      const out: PeerState[] = [];
      for (const key of Object.keys(raw)) {
        const metas = raw[key];
        const m = metas && metas.length ? metas[metas.length - 1] : null; // o mais recente
        if (!m) continue;
        const s = m as Partial<PeerState>;
        if (!s.id || s.id === this.self?.id) continue; // nós mesmos não contamos
        out.push({
          id: s.id, name: s.name ?? "Viajante", classId: s.classId ?? "guerreiro",
          level: s.level ?? 1, col: s.col ?? 0, row: s.row ?? 0, facing: s.facing ?? 0,
        });
      }
      this.cb(out);
    };
    ch.on("presence", { event: "sync" }, emit);
    ch.on("presence", { event: "join" }, emit);
    ch.on("presence", { event: "leave" }, emit);
    ch.subscribe((status: string) => {
      if (status === "SUBSCRIBED") void this.publish(true);
    });
    this.channel = ch;
  }

  /** Sai do canal atual e limpa a lista. */
  async leave(): Promise<void> {
    if (this.pending) { clearTimeout(this.pending); this.pending = null; }
    const ch = this.channel;
    this.channel = null; this.zone = "";
    if (ch) {
      try { await ch.untrack(); } catch { /* já caiu */ }
      const c = await getClient();
      try { c?.removeChannel(ch); } catch { /* ignora */ }
    }
    this.cb?.([]);
  }

  /** Atualiza a nossa célula/direção (chamado a cada passo/giro). */
  move(col: number, row: number, facing: number): void {
    if (!this.self) return;
    if (this.self.col === col && this.self.row === row && this.self.facing === facing) return;
    this.self.col = col; this.self.row = row; this.self.facing = facing;
    void this.publish(false);
  }

  /** Publica o nosso estado, respeitando o intervalo mínimo. */
  private async publish(now: boolean): Promise<void> {
    if (!this.channel || !this.self || !this.isEnabled()) return;
    const t = Date.now();
    const wait = now ? 0 : Math.max(0, PUBLISH_MS - (t - this.lastPublish));
    if (wait > 0) {
      if (this.pending) return;            // já há um envio agendado
      this.pending = setTimeout(() => { this.pending = null; void this.publish(true); }, wait);
      return;
    }
    this.lastPublish = t;
    try { await this.channel.track({ ...this.self }); } catch { /* offline: ignora */ }
  }
}

export const net = new NetSession();
