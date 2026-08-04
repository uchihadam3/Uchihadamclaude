// ============================================================================
// LISTA DE AMIGOS — a única coisa do social que precisa SOBREVIVER à sessão.
//
// Tudo o mais no co-op é efêmero de propósito: a zona te mostra quem está por
// perto AGORA, o grupo dura enquanto vocês estiverem juntos. Amigo é o
// contrário: você fecha o jogo, volta amanhã e ele continua lá — e é justamente
// por isso que essa é a peça que faz o jogo parecer povoado em vez de um mundo
// onde as pessoas aparecem e somem.
//
// Duas partes, independentes:
//
//  1. GUARDAR. Quem tem conta guarda no Supabase (tabela `friends`, uma linha
//     por amizade), então a lista acompanha a conta em qualquer aparelho. O
//     Convidado guarda no próprio navegador. A mesma API para os dois — quem
//     chama não sabe (nem precisa saber) qual dos dois está valendo. Se a
//     tabela ainda não existir no projeto, cai no navegador em silêncio: um
//     erro de SQL não pode derrubar o jogo.
//
//  2. SABER QUEM ESTÁ ONLINE. Um canal global (`gh-amigos`) onde todo mundo
//     bate o ponto de 4 em 4 segundos dizendo quem é e em que área está. Quem
//     parou de bater há mais de 12s conta como fora. É o mesmo desenho do resto
//     do co-op — sem estado central, cada um monta a própria lista. (Um canal
//     único p/ o servidor inteiro só serve enquanto o jogo for pequeno; com
//     muita gente isso vira um canal por região, mas aí já é outro problema.)
//
// A IDENTIDADE do amigo é o `uid` do PERSONAGEM (heroId), não a sessão nem o
// nome: sessão muda a cada aba aberta e nome não é único.
//
//   ---- SQL p/ criar a tabela no Supabase (SQL Editor) ----------------------
//   create table if not exists public.friends (
//     user_id     uuid        not null references auth.users (id) on delete cascade,
//     friend_uid  text        not null,
//     friend_name text        not null,
//     class_id    text        not null default '',
//     added_at    timestamptz not null default now(),
//     constraint friends_pkey primary key (user_id, friend_uid)
//   );
//   alter table public.friends enable row level security;
//   drop policy if exists "own_friends" on public.friends;
//   create policy "own_friends" on public.friends
//     for all to authenticated
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
//   -------------------------------------------------------------------------
// ============================================================================
import { isSupabaseConfigured } from "./supabaseConfig";

/** Um amigo guardado (o que persiste). */
export interface Amigo {
  uid: string;       // identidade ESTÁVEL do personagem (heroId)
  name: string;
  classId: string;
}
/** Um amigo com o que se sabe dele AGORA (o que vem do canal). */
export interface AmigoVivo extends Amigo {
  online: boolean;
  level: number;
  zone: string;      // em que área ele está (vazio se offline)
}
/** Como eu apareço p/ os outros no canal global. */
export interface EuAmigo {
  uid: string; name: string; classId: string; level: number; zone: string;
}
/** Convite de grupo que chegou por um amigo (fora da zona). */
export interface ConviteAmigo { party: string; de: string; deId: string; para: string }

type ListaCb = (l: AmigoVivo[]) => void;
type ConviteCb = (c: ConviteAmigo) => void;

interface RTChannel {
  on(type: string, filter: unknown, cb: (p: unknown) => void): RTChannel;
  subscribe(cb?: (status: string) => void): RTChannel;
  send(msg: { type: string; event: string; payload: unknown }): Promise<unknown>;
  untrack(): Promise<unknown>;
}
interface RTClient {
  channel(name: string, opts?: unknown): RTChannel;
  removeChannel(ch: RTChannel): void;
  auth: { getUser(): Promise<{ data: { user: { id: string } | null } }> };
  from(t: string): {
    select(c: string): { eq(a: string, b: unknown): Promise<{ data: unknown[] | null; error: unknown }> };
    upsert(r: Record<string, unknown>, o?: unknown): Promise<{ error: unknown }>;
    delete(): { eq(a: string, b: unknown): { eq(a: string, b: unknown): Promise<{ error: unknown }> } };
  };
}

const BATIMENTO_MS = 4000;
const LIMITE_MS = 12000;
const CANAL = "gh-amigos";
const CHAVE_LOCAL = "gh-amigos";

async function getClient(): Promise<RTClient | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { getSupabaseClient } = await import("./cloud");
    return (await getSupabaseClient()) as RTClient;
  } catch {
    return null;
  }
}

/**
 * IDENTIDADE ESTÁVEL do personagem, criada uma vez e guardada no navegador. É ela
 * que vai na lista do amigo: o id de sessão muda a cada aba aberta e o nome não é
 * único, então nenhum dos dois serve p/ reencontrar alguém amanhã.
 */
export function heroId(slot: number): string {
  const k = `gh-hero-uid:${slot}`;
  try {
    const v = localStorage.getItem(k);
    if (v) return v;
    const novo = `h${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
    localStorage.setItem(k, novo);
    return novo;
  } catch {
    // navegador sem armazenamento: dá p/ jogar, só não dá p/ guardar amizade
    return `h${Math.random().toString(36).slice(2, 10)}`;
  }
}

// ------------------------------- guardar ------------------------------------
function lerLocal(): Amigo[] {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE_LOCAL) || "[]") as Amigo[];
    return Array.isArray(v) ? v.filter((a) => a && a.uid) : [];
  } catch { return []; }
}
function gravarLocal(l: Amigo[]): void {
  try { localStorage.setItem(CHAVE_LOCAL, JSON.stringify(l)); } catch { /* sem espaço */ }
}

class FriendsSession {
  private ch: RTChannel | null = null;
  private eu: EuAmigo | null = null;
  private guardados: Amigo[] = [];
  private vistos = new Map<string, { e: EuAmigo; t: number }>();
  private beat: ReturnType<typeof setInterval> | null = null;
  private cbLista: ListaCb | null = null;
  private cbConvite: ConviteCb | null = null;
  private userId = "";            // conta na nuvem (vazio = Convidado → navegador)

  onLista(cb: ListaCb | null): void { this.cbLista = cb; }
  onConvite(cb: ConviteCb | null): void { this.cbConvite = cb; }

  /** A lista pronta p/ a tela: amigo guardado + o que se sabe dele agora. */
  lista(): AmigoVivo[] {
    const agora = Date.now() - LIMITE_MS;
    return this.guardados
      .map((a) => {
        const v = this.vistos.get(a.uid);
        const online = !!v && v.t >= agora;
        return {
          ...a,
          name: online ? v!.e.name : a.name,   // trocou de nome? mostra o de agora
          online,
          level: online ? v!.e.level : 0,
          zone: online ? v!.e.zone : "",
        };
      })
      // online primeiro, depois em ordem alfabética — a lista é p/ achar gente
      .sort((x, y) => (Number(y.online) - Number(x.online)) || x.name.localeCompare(y.name));
  }

  /** Está online AGORA? (o painel usa p/ decidir se dá p/ convidar) */
  online(uid: string): boolean {
    const v = this.vistos.get(uid);
    return !!v && v.t >= Date.now() - LIMITE_MS;
  }
  ehAmigo(uid: string): boolean { return this.guardados.some((a) => a.uid === uid); }

  /** Entra no canal global e carrega a lista guardada. */
  async entrar(eu: EuAmigo): Promise<void> {
    this.eu = eu;
    this.guardados = await this.carregar();
    this.emitir();
    const cli = await getClient();
    if (!cli || this.ch) return;
    const ch = cli.channel(CANAL, { config: { broadcast: { self: false } } });
    this.ch = ch;
    ch.on("broadcast", { event: "oi" }, (msg: unknown) => {
      const p = (msg as { payload?: EuAmigo })?.payload;
      if (!p?.uid || p.uid === this.eu?.uid) return;
      this.vistos.set(p.uid, { e: p, t: Date.now() });
      // só repinta se for alguém da MINHA lista (o canal é do servidor inteiro)
      if (this.ehAmigo(p.uid)) this.emitir();
    });
    // alguém acabou de chegar e perguntou quem está aí → responde na hora, senão
    // ele ficaria até 4s achando que os amigos estão todos offline
    ch.on("broadcast", { event: "quem" }, () => { void this.pulsar(); });
    ch.on("broadcast", { event: "tchau" }, (msg: unknown) => {
      const p = (msg as { payload?: { uid?: string } })?.payload;
      if (p?.uid && this.vistos.delete(p.uid) && this.ehAmigo(p.uid)) this.emitir();
    });
    // CONVITE DE GRUPO por fora da zona: é o que o amigo tem de diferente do
    // vizinho — dá p/ chamar quem já está lá embaixo na masmorra.
    ch.on("broadcast", { event: "convite" }, (msg: unknown) => {
      const p = (msg as { payload?: ConviteAmigo })?.payload;
      if (!p?.para || p.para !== this.eu?.uid) return;
      this.cbConvite?.(p);
    });
    ch.subscribe((st: string) => {
      if (st !== "SUBSCRIBED") return;
      void this.pulsar();
      void this.env("quem", { uid: eu.uid });
      if (this.beat) clearInterval(this.beat);
      this.beat = setInterval(() => { void this.pulsar(); this.podar(); }, BATIMENTO_MS);
    });
  }

  /** Atualiza o que publico de mim (nível, área). */
  meuEstado(e: Partial<EuAmigo>): void {
    if (this.eu) Object.assign(this.eu, e);
  }

  async adicionar(a: Amigo): Promise<boolean> {
    if (!a.uid || a.uid === this.eu?.uid || this.ehAmigo(a.uid)) return false;
    this.guardados = [...this.guardados, a];
    this.emitir();
    await this.gravar(a, false);
    return true;
  }
  async remover(uid: string): Promise<void> {
    const a = this.guardados.find((x) => x.uid === uid);
    this.guardados = this.guardados.filter((x) => x.uid !== uid);
    this.emitir();
    if (a) await this.gravar(a, true);
  }

  /** Convida um amigo p/ o grupo, esteja ele em que área estiver. */
  async convidar(uid: string, partyId: string, meuNome: string, meuIdDeGrupo: string): Promise<void> {
    await this.env("convite", { party: partyId, de: meuNome, deId: meuIdDeGrupo, para: uid });
  }

  async sair(): Promise<void> {
    if (this.ch && this.eu) await this.env("tchau", { uid: this.eu.uid });
    if (this.beat) { clearInterval(this.beat); this.beat = null; }
    const ch = this.ch;
    this.ch = null;
    if (ch) {
      try { await ch.untrack(); } catch { /* já caiu */ }
      const c = await getClient();
      try { c?.removeChannel(ch); } catch { /* ignora */ }
    }
  }

  // -------------------------------- interno ---------------------------------
  private async pulsar(): Promise<void> {
    if (this.eu) await this.env("oi", { ...this.eu });
  }
  private async env(event: string, payload: unknown): Promise<void> {
    if (!this.ch) return;
    try { await this.ch.send({ type: "broadcast", event, payload }); } catch { /* rede */ }
  }
  private podar(): void {
    const lim = Date.now() - LIMITE_MS;
    let mudou = false;
    for (const [uid, v] of this.vistos)
      if (v.t < lim) { this.vistos.delete(uid); mudou = mudou || this.ehAmigo(uid); }
    if (mudou) this.emitir();
  }
  private emitir(): void { this.cbLista?.(this.lista()); }

  /** Lê a lista: nuvem se houver conta, navegador se não (ou se a tabela falhar). */
  private async carregar(): Promise<Amigo[]> {
    const cli = await getClient();
    if (cli) {
      try {
        const { data: u } = await cli.auth.getUser();
        if (u.user) {
          this.userId = u.user.id;
          const { data, error } = await cli.from("friends")
            .select("friend_uid,friend_name,class_id").eq("user_id", u.user.id);
          if (!error && data) {
            return data.map((r) => {
              const x = r as { friend_uid: string; friend_name: string; class_id: string };
              return { uid: x.friend_uid, name: x.friend_name, classId: x.class_id || "" };
            });
          }
        }
      } catch { /* tabela ainda não criada, ou sem rede → navegador */ }
    }
    return lerLocal();
  }
  /** Grava UMA mudança. Sem conta (ou se a nuvem recusar), fica no navegador. */
  private async gravar(a: Amigo, apagar: boolean): Promise<void> {
    if (this.userId) {
      const cli = await getClient();
      try {
        if (cli && apagar) {
          await cli.from("friends").delete().eq("user_id", this.userId).eq("friend_uid", a.uid);
          return;
        }
        if (cli) {
          const { error } = await cli.from("friends").upsert(
            { user_id: this.userId, friend_uid: a.uid, friend_name: a.name, class_id: a.classId },
            { onConflict: "user_id,friend_uid" },
          );
          if (!error) return;
        }
      } catch { /* cai no navegador */ }
    }
    gravarLocal(this.guardados);
  }
}

export const friends = new FriendsSession();
