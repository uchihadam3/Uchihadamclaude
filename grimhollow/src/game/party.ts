// ============================================================================
// GRUPO (party) — a camada de rede do "jogar junto de verdade".
//
// O co-op da Fase 1/2 é por ZONA: quem está no mesmo andar se vê e luta contra
// os mesmos bichos. Isso não basta p/ ter cara de MMO — num MMO o grupo SOBREVIVE
// à troca de zona: você desce a escada e continua vendo a vida dos seus, e o
// abate de um conta p/ a missão de todos.
//
// Por isso o grupo tem CANAL PRÓPRIO (`gh-party:<id>`), separado do canal da
// zona. O convite viaja pelo canal da ZONA (é preciso estar perto p/ convidar);
// daí em diante tudo corre pelo canal do grupo, e ele não se desfaz quando
// alguém muda de lugar.
//
// LÍDER: quem criou. Não há eleição — se o líder some, o grupo simplesmente
// esvazia por tempo-limite, como acontece quando alguém fecha o jogo.
//
// Como no resto do co-op, cada um mantém a própria lista a partir dos
// BATIMENTOS que chegam (2s) e poda quem parou de falar (8s). Sem estado
// central, sem nada p/ sincronizar.
// ============================================================================
import { isSupabaseConfigured } from "./supabaseConfig";

/** O que cada membro publica sobre si, ~2x/s. */
export interface Membro {
  id: string;
  name: string;
  classId: string;
  level: number;
  hp: number;
  maxHp: number;
  zone: string;      // em que zona ele está (p/ o HUD dizer "noutro lugar")
  lider: boolean;
  caido?: boolean;   // tombou e espera alguém levantar (só acontece em grupo)
}
/** Convite recebido de alguém da mesma zona. */
export interface Convite {
  party: string;     // id do grupo
  de: string;        // nome de quem convidou
  deId: string;
}

/**
 * EFEITO DE UM JOGADOR NOUTRO — cura, bênção, escudo, ressurreição.
 *
 * Quem lança calcula o VALOR (é ele quem tem os atributos e o rank) e manda; quem
 * recebe é que aplica na própria vida. Ninguém escreve na vida alheia: cada
 * máquina continua dona do seu herói, que é o mesmo princípio do resto do co-op.
 */
export type TipoEfeito = "cura" | "bencao" | "escudo" | "reviver";
export interface Efeito {
  para: string;      // id de quem recebe (só ele reage)
  deId: string;
  de: string;        // nome de quem lançou (p/ o aviso na tela)
  tipo: TipoEfeito;
  valor: number;     // cura/vida devolvida
  dur?: number;      // buffs: duração (ms)
  atkMul?: number;
  defReduc?: number;
  skill?: string;    // id da habilidade (p/ o nome no aviso)
}

type MembrosCb = (m: Membro[]) => void;
type ConviteCb = (c: Convite) => void;
type AbateCb = (typeId: string) => void;
type AvisoCb = (texto: string) => void;
type EfeitoCb = (e: Efeito) => void;
/** Fala no bate-papo DO GRUPO. `meu` = eco local de quem escreveu. */
type FalaCb = (de: string, texto: string, meu: boolean) => void;

interface RTChannel {
  on(type: string, filter: unknown, cb: (p: unknown) => void): RTChannel;
  subscribe(cb?: (status: string) => void): RTChannel;
  send(msg: { type: string; event: string; payload: unknown }): Promise<unknown>;
  untrack(): Promise<unknown>;
}
interface RTClient {
  channel(name: string, opts?: unknown): RTChannel;
  removeChannel(ch: RTChannel): void;
}

const BATIMENTO_MS = 2000;
const LIMITE_MS = 8000;

async function getClient(): Promise<RTClient | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { getSupabaseClient } = await import("./cloud");
    return (await getSupabaseClient()) as RTClient;
  } catch {
    return null;
  }
}

class PartySession {
  private ch: RTChannel | null = null;
  private id = "";                   // id do grupo (vazio = sem grupo)
  private eu: Membro | null = null;
  private vistos = new Map<string, { m: Membro; t: number }>();
  private beat: ReturnType<typeof setInterval> | null = null;
  private cbMembros: MembrosCb | null = null;
  private cbConvite: ConviteCb | null = null;
  private cbAbate: AbateCb | null = null;
  private cbAviso: AvisoCb | null = null;
  private cbEfeito: EfeitoCb | null = null;
  private cbFala: FalaCb | null = null;

  onMembros(cb: MembrosCb | null): void { this.cbMembros = cb; }
  onConvite(cb: ConviteCb | null): void { this.cbConvite = cb; }
  onAbate(cb: AbateCb | null): void { this.cbAbate = cb; }
  onAviso(cb: AvisoCb | null): void { this.cbAviso = cb; }
  onEfeito(cb: EfeitoCb | null): void { this.cbEfeito = cb; }
  onFala(cb: FalaCb | null): void { this.cbFala = cb; }

  /** Um membro pelo id (o HUD usa p/ saber se o alvo escolhido ainda existe). */
  membro(id: string): Membro | undefined {
    return this.membros().find((m) => m.id === id);
  }
  /** Meu id dentro do grupo (vazio se estou sozinho). */
  meuId(): string { return this.eu?.id ?? ""; }

  emGrupo(): boolean { return !!this.id; }
  partyId(): string { return this.id; }
  souLider(): boolean { return !!this.eu?.lider; }
  /** Quantos SOMOS (eu + os outros) — usado p/ escalar os inimigos. */
  tamanho(): number { return this.id ? this.vistos.size + 1 : 1; }
  membros(): Membro[] {
    if (!this.id || !this.eu) return [];
    return [this.eu, ...[...this.vistos.values()].map((v) => v.m)];
  }

  /** Atualiza o meu estado (vida, zona, nível) — vai no próximo batimento. */
  meuEstado(e: Partial<Membro>): void {
    if (this.eu) Object.assign(this.eu, e);
  }

  /**
   * CONVITE. Vai pelo canal da ZONA (quem convida tem de estar por perto), e
   * carrega o id do grupo: se eu ainda não tenho grupo, crio um agora com o meu
   * id — assim convidar é um gesto só, sem "criar grupo" antes.
   */
  async convidar(
    zoneCh: { send(m: { type: string; event: string; payload: unknown }): Promise<unknown> } | null,
    alvoId: string, eu: Omit<Membro, "lider">,
  ): Promise<void> {
    if (!zoneCh) return;
    if (!this.id) await this.criar(eu);
    await zoneCh.send({
      type: "broadcast", event: "convite",
      payload: { party: this.id, de: eu.name, deId: eu.id, para: alvoId },
    });
  }

  /** Cria um grupo comigo como líder (chamado sozinho pelo convidar). */
  async criar(eu: Omit<Membro, "lider">): Promise<void> {
    await this.entrar(eu.id, { ...eu, lider: true });
  }
  /** Aceita um convite: entra no canal do grupo de quem chamou. */
  async aceitar(c: Convite, eu: Omit<Membro, "lider">): Promise<void> {
    await this.entrar(c.party, { ...eu, lider: false });
  }

  private async entrar(partyId: string, eu: Membro): Promise<void> {
    await this.sair(false);
    const cli = await getClient();
    if (!cli) return;
    this.id = partyId;
    this.eu = eu;
    const ch = cli.channel(`gh-party:${partyId}`, { config: { broadcast: { self: false } } });
    this.ch = ch;
    ch.on("broadcast", { event: "membro" }, (msg: unknown) => {
      const m = (msg as { payload?: Membro })?.payload;
      if (!m?.id || m.id === this.eu?.id) return;
      this.vistos.set(m.id, { m, t: Date.now() });
      this.emitir();
    });
    // alguém chegou e perguntou quem está aqui → responde na hora
    ch.on("broadcast", { event: "oi" }, () => { void this.pulsar(); });
    ch.on("broadcast", { event: "saiu" }, (msg: unknown) => {
      const p = (msg as { payload?: { id?: string; nome?: string } })?.payload;
      if (p?.id && this.vistos.delete(p.id)) {
        this.cbAviso?.(`${p.nome ?? "Alguém"} saiu do grupo.`);
        this.emitir();
      }
    });
    // ABATE de um membro: conta p/ a missão de todo mundo do grupo
    ch.on("broadcast", { event: "abate" }, (msg: unknown) => {
      const p = (msg as { payload?: { typeId?: string; id?: string } })?.payload;
      if (p?.typeId && p.id !== this.eu?.id) this.cbAbate?.(p.typeId);
    });
    // EFEITO nominal (cura/bênção/escudo/ressurreição): igual ao convite, só o
    // destinatário reage — o canal é de todos, mas a mensagem tem dono.
    ch.on("broadcast", { event: "efeito" }, (msg: unknown) => {
      const p = (msg as { payload?: Efeito })?.payload;
      if (!p?.para || p.para !== this.eu?.id) return;
      this.cbEfeito?.(p);
    });
    // BATE-PAPO DO GRUPO: chega em todo mundo do canal, e só neles — é o que o
    // separa do bate-papo da zona, que qualquer um por perto lê.
    ch.on("broadcast", { event: "fala" }, (msg: unknown) => {
      const p = (msg as { payload?: { de?: string; texto?: string; id?: string } })?.payload;
      if (!p?.texto || p.id === this.eu?.id) return;
      this.cbFala?.(p.de || "Viajante", p.texto, false);
    });
    ch.subscribe((st: string) => {
      if (st !== "SUBSCRIBED") return;
      void this.pulsar();
      void this.env("oi", { id: eu.id });
      if (this.beat) clearInterval(this.beat);
      this.beat = setInterval(() => { void this.pulsar(); this.podar(); }, BATIMENTO_MS);
    });
    this.emitir();
  }

  /** Sai do grupo (avisando os outros, salvo quando é troca interna). */
  async sair(avisar = true): Promise<void> {
    if (avisar && this.ch && this.eu)
      await this.env("saiu", { id: this.eu.id, nome: this.eu.name });
    if (this.beat) { clearInterval(this.beat); this.beat = null; }
    this.vistos.clear();
    const ch = this.ch;
    this.ch = null; this.id = ""; this.eu = null;
    if (ch) {
      try { await ch.untrack(); } catch { /* já caiu */ }
      const c = await getClient();
      try { c?.removeChannel(ch); } catch { /* ignora */ }
    }
    this.emitir();
  }

  /** Avisa o grupo de um abate (para o progresso de missão conjunto). */
  async abateu(typeId: string): Promise<void> {
    if (!this.id || !this.eu) return;
    await this.env("abate", { typeId, id: this.eu.id });
  }

  /** Fala no canal do grupo (aparece na hora p/ quem escreveu, como no da zona). */
  async falar(texto: string): Promise<boolean> {
    const t = texto.trim().slice(0, 140);
    if (!t || !this.id || !this.eu) return false;
    this.cbFala?.(this.eu.name, t, true);
    await this.env("fala", { id: this.eu.id, de: this.eu.name, texto: t });
    return true;
  }

  /** Lança um efeito de apoio num companheiro (ele é quem aplica em si). */
  async mandarEfeito(e: Omit<Efeito, "de" | "deId">): Promise<void> {
    if (!this.id || !this.eu) return;
    await this.env("efeito", { ...e, de: this.eu.name, deId: this.eu.id });
  }

  private async pulsar(): Promise<void> {
    if (this.eu) await this.env("membro", { ...this.eu });
  }
  private async env(event: string, payload: unknown): Promise<void> {
    if (!this.ch) return;
    try { await this.ch.send({ type: "broadcast", event, payload }); } catch { /* rede */ }
  }
  private podar(): void {
    const lim = Date.now() - LIMITE_MS;
    let mudou = false;
    for (const [id, v] of this.vistos) if (v.t < lim) { this.vistos.delete(id); mudou = true; }
    if (mudou) this.emitir();
  }
  private emitir(): void { this.cbMembros?.(this.membros()); }
}

export const party = new PartySession();
