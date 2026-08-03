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
export type ChatCb = (name: string, text: string, mine: boolean) => void;

// intervalo mínimo entre publicações (o passo dura ~250ms; isso evita rajadas
// quando o jogador segura o botão de andar)
const PUBLISH_MS = 120;
// numa constante: assim o TS não tenta resolver a URL como módulo no build
const ESM_SUPABASE = "https://esm.sh/@supabase/supabase-js@2";

// Identidade da SESSÃO (não do personagem). Antes a chave era "slot:nome" — então
// a MESMA conta aberta em duas abas colidia no presence e, pior, cada uma filtrava
// a outra como "eu mesmo". Com um sufixo aleatório por carregamento, duas abas se
// enxergam normalmente (útil justamente p/ testar sozinho).
export const SESSION_TAG = Math.random().toString(36).slice(2, 8);

interface RTChannel {
  on(type: string, filter: unknown, cb: (p: unknown) => void): RTChannel;
  subscribe(cb?: (status: string) => void): RTChannel;
  send(msg: { type: string; event: string; payload: unknown }): Promise<unknown>;
  track(state: unknown): Promise<unknown>;
  untrack(): Promise<unknown>;
  presenceState(): Record<string, unknown[]>;
}
interface RTClient {
  channel(name: string, opts?: unknown): RTChannel;
  removeChannel(ch: RTChannel): void;
}

// diagnóstico: dá p/ ler no console (window.__coop) quando algo não conecta
export const diag = {
  enabled: false, zone: "", status: "parado", peers: 0, erro: "",
  // decisivos p/ achar a falha: se enviadas>0 e recebidas=0 dos DOIS lados, o
  // broadcast não está sendo entregue; se enviadas=0, o envio é que falha.
  enviadas: 0, recebidas: 0, canal: "",
};
const log = (...a: unknown[]) => console.info("[co-op]", ...a);

// usa o MESMO cliente do login (cloud.ts) — assim o Realtime herda a sessão e
// não abrimos uma segunda conexão.
async function getClient(): Promise<RTClient | null> {
  if (!isSupabaseConfigured()) { diag.erro = "Supabase não configurado"; return null; }
  try {
    const { getSupabaseClient } = await import("./cloud");
    return (await getSupabaseClient()) as RTClient;
  } catch (e) {
    diag.erro = `falha ao carregar o SDK: ${(e as Error).message}`;
    log("erro ao obter o cliente:", e);
    return null;
  }
}

class NetSession {
  private channel: RTChannel | null = null;
  private zone = "";
  private self: PeerState | null = null;
  private cb: PeersCb | null = null;
  private chatCb: ChatCb | null = null;
  private lastPublish = 0;
  private pending: ReturnType<typeof setTimeout> | null = null;
  private enabled = false;
  private decidido = false; // setCoop() já foi chamado? (antes disso, fica quieto)
  private vistos = new Map<string, { st: PeerState; t: number }>(); // vizinhos + quando falaram
  private beat: ReturnType<typeof setInterval> | null = null;       // heartbeat

  /** Liga o co-op. Sem isso (ex.: Convidado) nada é publicado nem recebido. */
  enable(on: boolean): void {
    this.enabled = on;
    this.decidido = true;
    if (!on) void this.leave();
  }
  isEnabled(): boolean { return this.enabled && isSupabaseConfigured(); }

  /** Callback chamado sempre que a lista de jogadores da zona muda. */
  onPeers(cb: PeersCb | null): void { this.cb = cb; }
  /** Callback das mensagens de bate-papo (as suas incluídas, com mine=true). */
  onChat(cb: ChatCb | null): void { this.chatCb = cb; }

  /** Manda uma mensagem no bate-papo da zona. */
  async chat(text: string): Promise<void> {
    const t = text.trim().slice(0, 140);
    if (!t || !this.self) return;
    this.chatCb?.(this.self.name, t, true);      // aparece na hora p/ quem escreveu
    if (!this.isEnabled() || !this.channel) return;
    await this.send("chat", { id: this.self.id, name: this.self.name, text: t });
  }

  /** Entra no canal da zona (sai do anterior). `self` é o nosso estado inicial. */
  async join(zone: string, self: PeerState): Promise<void> {
    this.self = { ...self };
    diag.enabled = this.isEnabled();
    if (!this.isEnabled()) {
      // antes de setCoop() decidir, a 1ª entrada de zona acontece na construção do
      // jogo — não é "recusa", então não polui o console.
      if (this.decidido) {
        diag.status = isSupabaseConfigured() ? "desligado (entrou como Convidado?)" : "sem Supabase";
        log("não vai conectar:", diag.status);
      }
      return;
    }
    if (this.zone === zone && this.channel) { void this.publish(true); return; }
    await this.leave();
    const c = await getClient();
    if (!c) { diag.status = "sem cliente"; log("sem cliente:", diag.erro); return; }
    this.zone = zone; diag.zone = zone; diag.status = "conectando";
    diag.canal = `gh-zone:${zone}`; diag.enviadas = 0; diag.recebidas = 0;
    log(`entrando na zona "${zone}" como ${self.name} (id ${self.id})`);
    const ch = c.channel(`gh-zone:${zone}`, {
      config: { presence: { key: self.id }, broadcast: { self: false } },
    });
    this.channel = ch; // ANTES do subscribe: o callback de SUBSCRIBED já usa isto

    // ---- BROADCAST é o transporte principal ----
    // O presence dependia de o projeto tê-lo funcionando; o canal conectava
    // (SUBSCRIBED) mas os vizinhos nunca chegavam. O broadcast é o mecanismo mais
    // básico do Realtime, então a posição vai por ele e cada um mantém sua própria
    // lista com HEARTBEAT + tempo-limite (some sozinho quem parou de falar).
    ch.on("broadcast", { event: "pos" }, (msg: unknown) => {
      diag.recebidas++;
      const p = (msg as { payload?: Partial<PeerState> })?.payload;
      if (!p || !p.id || p.id === this.self?.id) return;
      this.vistos.set(p.id, {
        st: {
          id: p.id, name: p.name ?? "Viajante", classId: p.classId ?? "guerreiro",
          level: p.level ?? 1, col: p.col ?? 0, row: p.row ?? 0, facing: p.facing ?? 0,
        },
        t: Date.now(),
      });
      this.emitPeers();
    });
    // alguém acabou de chegar e pediu "quem está aí?" → respondemos na hora, p/ o
    // recém-chegado não ficar até o próximo heartbeat sem ver ninguém.
    ch.on("broadcast", { event: "oi" }, () => { void this.publish(true); });
    // BATE-PAPO da zona (também serve de teste: se a mensagem chega, o transporte
    // está bom e um eventual problema de avatares é da minha lógica, não da rede).
    ch.on("broadcast", { event: "chat" }, (msg: unknown) => {
      diag.recebidas++;
      const p = (msg as { payload?: { id?: string; name?: string; text?: string } })?.payload;
      if (!p?.text || p.id === this.self?.id) return;
      this.chatCb?.(p.name || "Viajante", p.text, false);
    });

    // ---- PRESENCE fica como reforço: serve p/ sumir na hora quem fecha a aba ----
    ch.on("presence", { event: "leave" }, (e: unknown) => {
      const k = (e as { key?: string })?.key;
      if (k && this.vistos.delete(k)) this.emitPeers();
    });

    ch.subscribe((status: string) => {
      diag.status = status;
      log("canal:", status);
      if (status === "SUBSCRIBED") {
        void this.publish(true);
        void this.send("oi", { id: self.id });     // avisa que chegou
        try { void ch.track({ id: self.id }); } catch { /* presence é opcional */ }
        // heartbeat: republica de tempos em tempos p/ quem entrar depois nos ver
        if (this.beat) clearInterval(this.beat);
        this.beat = setInterval(() => { void this.publish(true); this.podar(); }, 2000);
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        diag.erro = `canal falhou: ${status}`;
      }
    });
  }

  /** Remove quem não fala há um tempo (fechou o jogo, caiu a rede). */
  private podar(): void {
    const lim = Date.now() - 7000;
    let mudou = false;
    for (const [id, v] of this.vistos) if (v.t < lim) { this.vistos.delete(id); mudou = true; }
    if (mudou) this.emitPeers();
  }
  private emitPeers(): void {
    const out = [...this.vistos.values()].map((v) => v.st);
    diag.peers = out.length;
    this.cb?.(out);
  }
  /** Envia um evento de broadcast, registrando o resultado no diagnóstico. */
  private async send(event: string, payload: unknown): Promise<void> {
    if (!this.channel) return;
    try {
      const r = await this.channel.send({ type: "broadcast", event, payload });
      if (r === "ok") diag.enviadas++;
      else { diag.erro = `envio "${event}": ${String(r)}`; log("envio devolveu", r); }
    } catch (e) {
      diag.erro = `envio "${event}" falhou: ${(e as Error).message}`;
      log("falha ao enviar", event, e);
    }
  }

  /** Sai do canal atual e limpa a lista. */
  async leave(): Promise<void> {
    if (this.pending) { clearTimeout(this.pending); this.pending = null; }
    if (this.beat) { clearInterval(this.beat); this.beat = null; }
    this.vistos.clear();
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
    await this.send("pos", { ...this.self });
  }
}

export const net = new NetSession();

// atalho de diagnóstico: abra o console e digite  __coop()
declare global { interface Window { __coop?: () => typeof diag } }
if (typeof window !== "undefined") window.__coop = () => diag;
