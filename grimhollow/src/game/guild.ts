// ============================================================================
// COMPANHIA (guilda) — o vínculo que dura mais que uma sessão.
//
// "Guilda" é palavra de fora. Em Grimhollow os fundadores chamavam de COMPANHIA
// as turmas que desciam por nível — a Terceira Companhia era quem trabalhava no
// terceiro. O nome ficou, e é o que os jogadores usam p/ se juntar.
//
// ONDE ISTO SE ENCAIXA. O social do jogo tem três prazos, e cada um pede um
// desenho diferente:
//
//   • ZONA (net.ts) — quem está por perto AGORA. Efêmero, derivado, sem estado.
//   • GRUPO (party.ts) — dura enquanto vocês estiverem juntos. Efêmero também.
//   • AMIGOS (friends.ts) — sobrevive à sessão, mas é PRIVADO: a minha lista só
//     eu escrevo e só eu leio.
//
// A Companhia é a primeira coisa COLETIVA e PERSISTENTE: existe fora de mim,
// outras pessoas entram e saem dela, e continua lá quando eu fecho o jogo. Por
// isso ela é a primeira que precisa de uma tabela lida por gente que não é o
// dono da linha — e é por isso que a RLS aqui é diferente da dos amigos.
//
// ELA NÃO MEXE EM NADA DE VALOR. De propósito: enquanto ouro e itens moram
// dentro do blob do save, o servidor não sabe conferir nada, e uma feature que
// move riqueza com a chave anon pública seria um cofre com a porta encostada.
// Companhia é identidade e conversa — o banco da companhia espera o ouro sair do
// blob.
//
// COMO SE MANTÉM VIVA. Igual aos amigos: um canal por companhia
// (`gh-guilda:<id>`) onde cada um bate o ponto de 4 em 4 segundos dizendo quem
// é, que nível tem e em que área está. Quem parou de bater há 12s conta como
// fora. Sem estado central: cada um monta a própria lista do que chega. A tabela
// diz QUEM É MEMBRO; o canal diz QUEM ESTÁ ONLINE. São perguntas diferentes e
// não devem ser respondidas pela mesma coisa — o banco não é lugar de "está
// online agora", e o canal não lembra de nada.
//
// PRECISA DE CONTA. Sem login não há Companhia — e não há queda p/ o navegador,
// como acontece com os amigos. Uma companhia guardada só no meu navegador seria
// uma companhia de um membro que ninguém mais enxerga: pior que não ter.
//
//   ---- SQL p/ criar as tabelas no Supabase (SQL Editor) --------------------
//   create table if not exists public.guilds (
//     id         uuid        primary key default gen_random_uuid(),
//     nome       text        not null unique,
//     tag        text        not null,          -- 2 a 4 letras, sobre a cabeça
//     lema       text        not null default '',
//     dono_uid   text        not null,          -- heroId do fundador
//     dono_conta uuid        not null references auth.users (id) on delete cascade,
//     criada_em  timestamptz not null default now()
//   );
//   create table if not exists public.guild_members (
//     guild_id  uuid        not null references public.guilds (id) on delete cascade,
//     hero_uid  text        not null,
//     user_id   uuid        not null references auth.users (id) on delete cascade,
//     nome      text        not null,
//     class_id  text        not null default '',
//     nivel     integer     not null default 1,
//     posto     text        not null default 'membro',   -- mestre|oficial|membro
//     entrou_em timestamptz not null default now(),
//     constraint guild_members_pkey primary key (guild_id, hero_uid)
//   );
//   create index if not exists guild_members_conta on public.guild_members (user_id);
//   -- UMA COMPANHIA POR PERSONAGEM. O jogo já recusa entrar numa segunda, mas
//   -- isso é regra de cliente e a chave anon é pública: sem o índice, dois
//   -- convites aceitos em abas diferentes deixariam o herói em dois quadros, e a
//   -- leitura do "meu quadro" (que espera uma linha só) passaria a falhar.
//   create unique index if not exists guild_members_um_por_heroi
//     on public.guild_members (hero_uid);
//
//   alter table public.guilds        enable row level security;
//   alter table public.guild_members enable row level security;
//
//   -- LER é público: p/ pedir entrada numa companhia é preciso poder vê-la.
//   drop policy if exists "ler_guildas" on public.guilds;
//   create policy "ler_guildas" on public.guilds for select using (true);
//   drop policy if exists "ler_membros" on public.guild_members;
//   create policy "ler_membros" on public.guild_members for select using (true);
//
//   -- FUNDAR: só em nome próprio. ADMINISTRAR: só o dono.
//   drop policy if exists "fundar" on public.guilds;
//   create policy "fundar" on public.guilds for insert to authenticated
//     with check (auth.uid() = dono_conta);
//   drop policy if exists "administrar" on public.guilds;
//   create policy "administrar" on public.guilds for update to authenticated
//     using (auth.uid() = dono_conta) with check (auth.uid() = dono_conta);
//   drop policy if exists "dissolver" on public.guilds;
//   create policy "dissolver" on public.guilds for delete to authenticated
//     using (auth.uid() = dono_conta);
//
//   -- ENTRAR/SAIR: cada um por si (não dá p/ inscrever os outros).
//   drop policy if exists "entrar" on public.guild_members;
//   create policy "entrar" on public.guild_members for insert to authenticated
//     with check (auth.uid() = user_id);
//   drop policy if exists "sair" on public.guild_members;
//   create policy "sair" on public.guild_members for delete to authenticated
//     using (auth.uid() = user_id
//       or exists (select 1 from public.guilds g
//                  where g.id = guild_id and g.dono_conta = auth.uid()));
//   -- MUDAR DE POSTO: só o mestre. Sem isto qualquer membro se promove sozinho —
//   -- e como a chave anon é pública, "sozinho" quer dizer pelo console do
//   -- navegador. É a única regra aqui que existe contra trapaça, e não contra
//   -- engano.
//   drop policy if exists "promover" on public.guild_members;
//   create policy "promover" on public.guild_members for update to authenticated
//     using (exists (select 1 from public.guilds g
//                    where g.id = guild_id and g.dono_conta = auth.uid()));
//   -------------------------------------------------------------------------
// ============================================================================
import { isSupabaseConfigured } from "./supabaseConfig";

/** Postos dentro da Companhia, do maior p/ o menor. */
export type Posto = "mestre" | "oficial" | "membro";
export const POSTOS: Posto[] = ["mestre", "oficial", "membro"];
/** Como cada posto se chama na tela (plural, p/ os cabeçalhos da lista). */
export const POSTO_TITULO: Record<Posto, string> = {
  mestre: "Mestre", oficial: "Oficiais", membro: "Companheiros",
};

/** A companhia em si (o que está guardado). */
export interface Companhia {
  id: string;
  nome: string;
  tag: string;      // 2..4 letras, é o que aparece sobre a cabeça
  lema: string;
  donoUid: string;
  criadaEm: number;
}
/** Um membro como está guardado na tabela. */
export interface Membro {
  uid: string;      // heroId — identidade estável do personagem
  nome: string;
  classId: string;
  nivel: number;
  posto: Posto;
  entrouEm: number;
}
/** Um membro com o que se sabe dele AGORA (o que vem do canal). */
export interface MembroVivo extends Membro {
  online: boolean;
  onde: string;     // área legível (vazio se offline)
}
/** Como eu apareço p/ a companhia no canal. */
export interface EuNaCompanhia {
  uid: string; nome: string; classId: string; nivel: number; zona: string;
}
/** Convite p/ entrar numa companhia, recebido pelo canal global dos amigos. */
export interface ConviteCompanhia {
  guildId: string; nome: string; tag: string; de: string; para: string;
}

type ListaCb = (l: MembroVivo[]) => void;
type InfoCb = (c: Companhia | null) => void;
type FalaCb = (de: string, texto: string, meu: boolean) => void;

interface RTChannel {
  on(type: string, filter: unknown, cb: (p: unknown) => void): RTChannel;
  subscribe(cb?: (status: string) => void): RTChannel;
  send(msg: { type: string; event: string; payload: unknown }): Promise<unknown>;
  untrack(): Promise<unknown>;
}
interface Consulta {
  select(c: string): Consulta;
  eq(a: string, b: unknown): Consulta;
  order(c: string, o?: { ascending: boolean }): Consulta;
  limit(n: number): Consulta;
  maybeSingle(): Promise<{ data: unknown; error: unknown }>;
  then<R>(f: (r: { data: unknown[] | null; error: unknown }) => R): Promise<R>;
}
interface RTClient {
  channel(name: string, opts?: unknown): RTChannel;
  removeChannel(ch: RTChannel): void;
  auth: { getUser(): Promise<{ data: { user: { id: string } | null } }> };
  from(t: string): {
    select(c: string): Consulta;
    insert(r: Record<string, unknown>): Consulta;
    update(r: Record<string, unknown>): Consulta;
    delete(): Consulta;
  };
}

const BATIMENTO_MS = 4000;
const LIMITE_MS = 12000;
/** Onde a companhia do personagem fica anotada p/ a janela abrir já preenchida. */
const CHAVE_LOCAL = "gh-companhia";

/** Limites de fundação — valem na tela E aqui, p/ não depender só do formulário. */
export const NOME_MIN = 3, NOME_MAX = 24;
export const TAG_MIN = 2, TAG_MAX = 4;
export const LEMA_MAX = 60;

/**
 * Confere um nome/tag de companhia. Devolve o erro em português ou "" se passar.
 * Fica aqui, e não na tela, porque a mesma regra vale p/ o convite e p/ o
 * formulário — e regra repetida em dois lugares vira duas regras diferentes.
 */
export function validarFundacao(nome: string, tag: string): string {
  const n = nome.trim(), t = tag.trim();
  if (n.length < NOME_MIN) return `O nome precisa de ao menos ${NOME_MIN} letras.`;
  if (n.length > NOME_MAX) return `O nome passa de ${NOME_MAX} letras.`;
  if (t.length < TAG_MIN || t.length > TAG_MAX)
    return `A tag tem de ${TAG_MIN} a ${TAG_MAX} letras.`;
  if (!/^[\p{L}\p{N} '’\-]+$/u.test(n)) return "O nome tem sinais que não valem.";
  if (!/^[\p{L}\p{N}]+$/u.test(t)) return "A tag é só letras e números.";
  return "";
}

/**
 * O QUE DEU ERRADO, dito em português — e sem esconder o resto.
 *
 * Todas as falhas de banco caíam num "não deu agora" só, que é o bastante para o
 * jogador e é NADA para quem precisa consertar: recusa da RLS, tabela que não
 * existe e rede caída viram a mesma frase. Aqui os casos que dá para explicar
 * ganham nome, e o que sobra leva o texto cru do Postgres junto — feio, mas é
 * exatamente o que se precisa ler quando a Companhia não sai do lugar.
 */
function porQue(e: unknown, oQue: string): string {
  const err = e as { message?: string; code?: string } | null | undefined;
  const msg = String(err?.message ?? e ?? "");
  const cod = String(err?.code ?? "");
  if (/duplicate key|already exists|unique/i.test(msg) && /guilds_nome/.test(msg))
    return "Já existe uma Companhia com esse nome.";
  if (/duplicate key|unique/i.test(msg))
    return "Este personagem já pertence a uma Companhia.";
  if (/row-level security|violates row-level/i.test(msg) || cod === "42501")
    return "O banco recusou: você não tem permissão para isso.";
  if (/does not exist|relation .* does not exist/i.test(msg) || cod === "42P01")
    return "As tabelas da Companhia ainda não existem no Supabase (§30 dos prompts).";
  if (/JWT|not authenticated|invalid token/i.test(msg))
    return "Sua sessão expirou — entre com a conta de novo.";
  if (/fetch|network|Failed to fetch/i.test(msg)) return "Sem conexão com o servidor.";
  return msg ? `${oQue}: ${msg.slice(0, 120)}` : oQue;
}

async function getClient(): Promise<RTClient | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { getSupabaseClient } = await import("./cloud");
    return (await getSupabaseClient()) as RTClient;
  } catch {
    return null;
  }
}

class GuildSession {
  private ch: RTChannel | null = null;
  private eu: EuNaCompanhia | null = null;
  private info: Companhia | null = null;
  private guardados: Membro[] = [];
  private vistos = new Map<string, { e: EuNaCompanhia; t: number }>();
  private beat: ReturnType<typeof setInterval> | null = null;
  private cbLista: ListaCb | null = null;
  private cbInfo: InfoCb | null = null;
  private cbFala: FalaCb | null = null;
  private userId = "";

  onLista(cb: ListaCb | null): void { this.cbLista = cb; }
  onInfo(cb: InfoCb | null): void { this.cbInfo = cb; }
  onFala(cb: FalaCb | null): void { this.cbFala = cb; }

  companhia(): Companhia | null { return this.info; }
  naCompanhia(): boolean { return !!this.info; }
  /** A tag entre chevrons, pronta p/ a plaquinha sobre a cabeça ("" se não há). */
  etiqueta(): string { return this.info ? `«${this.info.tag}»` : ""; }
  meuPosto(): Posto | null {
    return this.guardados.find((m) => m.uid === this.eu?.uid)?.posto ?? null;
  }
  souMestre(): boolean { return this.meuPosto() === "mestre"; }
  /** Mestre e oficiais chamam gente nova; membro raso, não. */
  possoConvidar(): boolean {
    const p = this.meuPosto();
    return p === "mestre" || p === "oficial";
  }

  /**
   * A lista pronta p/ a tela: membro guardado + o que se sabe dele agora.
   *
   * A ordem é POSTO primeiro e, dentro do posto, quem está online antes — é uma
   * lista p/ achar com quem jogar, e um mestre offline no topo não ajuda ninguém
   * a decidir nada. O nome desempata.
   */
  lista(): MembroVivo[] {
    const agora = Date.now() - LIMITE_MS;
    return this.guardados
      .map((m) => {
        const v = this.vistos.get(m.uid);
        const online = !!v && v.t >= agora;
        return {
          ...m,
          nome: online ? v!.e.nome : m.nome,     // trocou de nome? mostra o de agora
          nivel: online ? v!.e.nivel : m.nivel,
          online,
          onde: online ? v!.e.zona : "",
        };
      })
      .sort((a, b) =>
        POSTOS.indexOf(a.posto) - POSTOS.indexOf(b.posto)
        || Number(b.online) - Number(a.online)
        || a.nome.localeCompare(b.nome));
  }
  /** Os membros de um posto (a janela desenha um bloco por posto). */
  porPosto(p: Posto): MembroVivo[] { return this.lista().filter((m) => m.posto === p); }
  online(): number { return this.lista().filter((m) => m.online).length; }
  tamanho(): number { return this.guardados.length; }

  // ------------------------------------------------------------------ entrar
  /** Carrega a companhia do personagem (se houver) e entra no canal dela. */
  async entrar(eu: EuNaCompanhia): Promise<void> {
    this.eu = eu;
    const achou = await this.carregar(eu.uid);
    this.cbInfo?.(this.info);
    this.emitir();
    if (achou) await this.abrirCanal();
  }

  /** Atualiza o que publico de mim (nível, área) — vai no próximo batimento. */
  meuEstado(e: Partial<EuNaCompanhia>): void {
    if (this.eu) Object.assign(this.eu, e);
  }

  /** Fala no canal DA COMPANHIA (chega em todos os membros, onde quer que estejam). */
  async falar(texto: string): Promise<boolean> {
    const t = texto.trim().slice(0, 140);
    if (!t || !this.ch || !this.eu) return false;
    this.cbFala?.(this.eu.nome, t, true);
    await this.env("fala", { uid: this.eu.uid, de: this.eu.nome, texto: t });
    return true;
  }

  // ----------------------------------------------------------------- fundar
  /**
   * Funda uma Companhia comigo como mestre. Devolve o erro em português, ou ""
   * se deu certo. As duas escritas (companhia + primeiro membro) não são uma
   * transação: se a segunda falhar, desfaço a primeira à mão, senão sobraria uma
   * companhia sem ninguém e com o nome ocupado p/ sempre.
   */
  async fundar(nome: string, tag: string, lema: string): Promise<string> {
    const erro = validarFundacao(nome, tag);
    if (erro) return erro;
    if (this.info) return "Você já pertence a uma Companhia.";
    const cli = await getClient();
    if (!cli || !this.eu) return "Companhia precisa de conta — entre com a sua para fundar.";
    const conta = await this.conta(cli);
    if (!conta) return "Companhia precisa de conta — entre com a sua para fundar.";
    const id = novoId();
    const linha = {
      id, nome: nome.trim(), tag: tag.trim().toUpperCase(),
      lema: lema.trim().slice(0, LEMA_MAX),
      dono_uid: this.eu.uid, dono_conta: conta,
    };
    try {
      const { error } = await cli.from("guilds").insert(linha) as unknown as { error: unknown };
      if (error) return porQue(error, "Não deu para fundar");
    } catch (e) { return porQue(e, "Não deu para fundar"); }
    const eu: Membro = {
      uid: this.eu.uid, nome: this.eu.nome, classId: this.eu.classId,
      nivel: this.eu.nivel, posto: "mestre", entrouEm: Date.now(),
    };
    const falha = await this.inserirMembro(cli, conta, id, eu);
    if (falha) {
      // a companhia nasceu mas eu fiquei de fora: desfaço, senão sobra uma
      // companhia sem ninguém e com o nome ocupado p/ sempre
      try { await cli.from("guilds").delete().eq("id", id); } catch { /* melhor esforço */ }
      return falha;
    }
    this.info = {
      id, nome: linha.nome, tag: linha.tag, lema: linha.lema,
      donoUid: this.eu.uid, criadaEm: Date.now(),
    };
    this.guardados = [eu];
    this.anotarLocal();
    this.cbInfo?.(this.info);
    this.emitir();
    await this.abrirCanal();
    return "";
  }

  /** Aceita um convite: entra como membro raso na companhia de quem chamou. */
  async aceitar(c: ConviteCompanhia): Promise<string> {
    if (this.info) return "Você já pertence a uma Companhia.";
    const cli = await getClient();
    if (!cli || !this.eu) return "Sem conexão.";
    const conta = await this.conta(cli);
    if (!conta) return "Companhia precisa de conta — entre com a sua.";
    const eu: Membro = {
      uid: this.eu.uid, nome: this.eu.nome, classId: this.eu.classId,
      nivel: this.eu.nivel, posto: "membro", entrouEm: Date.now(),
    };
    const erro = await this.inserirMembro(cli, conta, c.guildId, eu);
    if (erro) return erro;
    await this.carregar(this.eu.uid);
    this.anotarLocal();
    this.cbInfo?.(this.info);
    this.emitir();
    await this.abrirCanal();
    return "";
  }

  /** Sai da Companhia (o mestre não sai: ele dissolve ou passa o bastão). */
  async sair(): Promise<string> {
    if (!this.info || !this.eu) return "";
    if (this.souMestre() && this.guardados.length > 1)
      return "O Mestre não abandona a Companhia: passe o bastão ou dissolva.";
    const cli = await getClient();
    try {
      if (this.souMestre()) await cli?.from("guilds").delete().eq("id", this.info.id);
      else await cli?.from("guild_members").delete()
        .eq("guild_id", this.info.id).eq("hero_uid", this.eu.uid);
    } catch (e) { return porQue(e, "Não deu para sair"); }
    await this.fecharCanal();
    this.info = null; this.guardados = []; this.vistos.clear();
    this.anotarLocal();
    this.cbInfo?.(null);
    this.emitir();
    return "";
  }

  /** Muda o posto de um membro (só o mestre; a RLS repete a regra no banco). */
  async definirPosto(uid: string, posto: Posto): Promise<string> {
    if (!this.info || !this.souMestre()) return "Só o Mestre muda os postos.";
    if (uid === this.eu?.uid) return "";
    const cli = await getClient();
    if (!cli) return "Sem conexão.";
    if (posto === "mestre") return this.passarOBastao(cli, uid);
    try {
      await cli.from("guild_members").update({ posto })
        .eq("guild_id", this.info.id).eq("hero_uid", uid);
    } catch (e) { return porQue(e, "Não deu para mudar o posto"); }
    if (this.eu) await this.carregar(this.eu.uid);
    this.cbInfo?.(this.info);
    this.emitir();
    return "";
  }

  /**
   * PASSAR O BASTÃO — o caso que quase saiu errado e por isso ganhou método
   * próprio.
   *
   * Quem manda tem DUAS marcas, e elas moram em lugares diferentes: a tela lê o
   * `posto` do quadro, mas a RLS lê o `dono_conta` da companhia. Trocar só o
   * posto (e o `dono_uid`, que é só o herói) deixava o novo Mestre com todos os
   * botões na tela e nenhum poder no banco — cada comando dele seria recusado —,
   * enquanto o antigo, já rebaixado a Oficial, continuaria mandando de verdade.
   *
   * Daí também a ORDEM: a troca de `dono_conta` é a ÚLTIMA escrita, porque no
   * instante em que ela vale eu deixo de poder escrever. Promover o outro e me
   * rebaixar têm de acontecer enquanto a companhia ainda é minha.
   */
  private async passarOBastao(cli: RTClient, uid: string): Promise<string> {
    if (!this.info || !this.eu) return "Sem conexão.";
    const gid = this.info.id, meu = this.eu.uid;
    try {
      // a CONTA do sucessor: é o que a RLS compara com auth.uid(). Ler é público,
      // então dá p/ pegar daqui mesmo.
      const { data } = await cli.from("guild_members")
        .select("user_id").eq("guild_id", gid).eq("hero_uid", uid).maybeSingle();
      const conta = (data as { user_id?: string } | null)?.user_id;
      if (!conta) return "Não achei a conta de quem receberia o bastão.";
      await cli.from("guild_members").update({ posto: "mestre" })
        .eq("guild_id", gid).eq("hero_uid", uid);
      await cli.from("guild_members").update({ posto: "oficial" })
        .eq("guild_id", gid).eq("hero_uid", meu);
      // por último: a partir daqui a companhia é dele, e eu não escrevo mais
      await cli.from("guilds").update({ dono_uid: uid, dono_conta: conta }).eq("id", gid);
    } catch (e) { return porQue(e, "Não deu para passar o bastão"); }
    await this.carregar(meu);
    this.cbInfo?.(this.info);
    this.emitir();
    return "";
  }

  /** Expulsa alguém (mestre). */
  async expulsar(uid: string): Promise<string> {
    if (!this.info || !this.souMestre()) return "Só o Mestre expulsa.";
    if (uid === this.eu?.uid) return "";
    const cli = await getClient();
    try {
      await cli?.from("guild_members").delete().eq("guild_id", this.info.id).eq("hero_uid", uid);
    } catch (e) { return porQue(e, "Não deu para expulsar"); }
    this.guardados = this.guardados.filter((m) => m.uid !== uid);
    this.emitir();
    return "";
  }

  // -------------------------------------------------------------- interno
  private async abrirCanal(): Promise<void> {
    if (this.ch || !this.info) return;
    const cli = await getClient();
    if (!cli) return;
    const ch = cli.channel(`gh-guilda:${this.info.id}`, { config: { broadcast: { self: false } } });
    this.ch = ch;
    ch.on("broadcast", { event: "oi" }, (msg: unknown) => {
      const p = (msg as { payload?: EuNaCompanhia })?.payload;
      if (!p?.uid || p.uid === this.eu?.uid) return;
      this.vistos.set(p.uid, { e: p, t: Date.now() });
      this.emitir();
    });
    ch.on("broadcast", { event: "quem" }, () => { void this.pulsar(); });
    ch.on("broadcast", { event: "tchau" }, (msg: unknown) => {
      const p = (msg as { payload?: { uid?: string } })?.payload;
      if (p?.uid && this.vistos.delete(p.uid)) this.emitir();
    });
    // MUDOU O QUADRO (entrou, saiu, mudou de posto): quem mudou avisa, e cada um
    // relê a tabela. Mandar o quadro inteiro pelo canal duplicaria a verdade —
    // a tabela já é a fonte, o aviso só diz "vai lá ver de novo".
    ch.on("broadcast", { event: "quadro" }, () => { void this.recarregar(); });
    ch.on("broadcast", { event: "fala" }, (msg: unknown) => {
      const p = (msg as { payload?: { uid?: string; de?: string; texto?: string } })?.payload;
      if (!p?.texto || p.uid === this.eu?.uid) return;
      this.cbFala?.(p.de || "Companheiro", p.texto, false);
    });
    ch.subscribe((st: string) => {
      if (st !== "SUBSCRIBED") return;
      void this.pulsar();
      void this.env("quem", { uid: this.eu?.uid });
      if (this.beat) clearInterval(this.beat);
      this.beat = setInterval(() => { void this.pulsar(); this.podar(); }, BATIMENTO_MS);
    });
  }
  private async fecharCanal(): Promise<void> {
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
    for (const [uid, v] of this.vistos) if (v.t < lim) { this.vistos.delete(uid); mudou = true; }
    if (mudou) this.emitir();
  }
  private emitir(): void { this.cbLista?.(this.lista()); }
  private async recarregar(): Promise<void> {
    if (!this.eu) return;
    await this.carregar(this.eu.uid);
    this.cbInfo?.(this.info);
    this.emitir();
  }
  private async conta(cli: RTClient): Promise<string> {
    if (this.userId) return this.userId;
    try {
      const { data } = await cli.auth.getUser();
      this.userId = data.user?.id ?? "";
    } catch { this.userId = ""; }
    return this.userId;
  }
  /** Põe alguém no quadro. Devolve "" se deu certo, ou o motivo em português. */
  private async inserirMembro(cli: RTClient, conta: string, guildId: string, m: Membro): Promise<string> {
    try {
      const { error } = await cli.from("guild_members").insert({
        guild_id: guildId, hero_uid: m.uid, user_id: conta, nome: m.nome,
        class_id: m.classId, nivel: m.nivel, posto: m.posto,
      }) as unknown as { error: unknown };
      if (error) return porQue(error, "Não deu para entrar");
    } catch (e) { return porQue(e, "Não deu para entrar"); }
    return "";
  }

  /**
   * Lê do banco a companhia deste personagem e o quadro dela. Devolve se achou.
   *
   * Duas consultas em vez de um join: o SDK do Supabase faz join por relação
   * declarada, e depender disso amarraria o jogo a um detalhe do esquema que
   * pode mudar. Duas leituras curtas custam menos que essa amarra.
   */
  private async carregar(meuUid: string): Promise<boolean> {
    const cli = await getClient();
    if (!cli) { this.info = null; this.guardados = []; return false; }
    try {
      const { data: meu } = await cli.from("guild_members")
        .select("guild_id").eq("hero_uid", meuUid).maybeSingle();
      const gid = (meu as { guild_id?: string } | null)?.guild_id;
      if (!gid) { this.info = null; this.guardados = []; return false; }
      const { data: g } = await cli.from("guilds")
        .select("id,nome,tag,lema,dono_uid,criada_em").eq("id", gid).maybeSingle();
      const row = g as {
        id: string; nome: string; tag: string; lema: string;
        dono_uid: string; criada_em: string;
      } | null;
      if (!row) { this.info = null; this.guardados = []; return false; }
      this.info = {
        id: row.id, nome: row.nome, tag: row.tag, lema: row.lema || "",
        donoUid: row.dono_uid, criadaEm: Date.parse(row.criada_em) || Date.now(),
      };
      const { data: ms } = await cli.from("guild_members")
        .select("hero_uid,nome,class_id,nivel,posto,entrou_em").eq("guild_id", gid)
        .then((r) => r);
      this.guardados = (ms ?? []).map((x) => {
        const m = x as {
          hero_uid: string; nome: string; class_id: string; nivel: number;
          posto: string; entrou_em: string;
        };
        return {
          uid: m.hero_uid, nome: m.nome, classId: m.class_id || "",
          nivel: m.nivel || 1,
          posto: (POSTOS.includes(m.posto as Posto) ? m.posto : "membro") as Posto,
          entrouEm: Date.parse(m.entrou_em) || 0,
        };
      });
      return true;
    } catch {
      // tabela ainda não criada, ou sem rede: o jogo segue sem Companhia
      this.info = null; this.guardados = [];
      return false;
    }
  }

  /** Anota no navegador em que companhia estou — só p/ a janela abrir preenchida
   *  antes de o banco responder. Nunca é a fonte da verdade. */
  private anotarLocal(): void {
    try {
      if (this.info) localStorage.setItem(CHAVE_LOCAL, JSON.stringify(this.info));
      else localStorage.removeItem(CHAVE_LOCAL);
    } catch { /* sem armazenamento */ }
  }

  /** Avisa o quadro que algo mudou (quem chamou já escreveu na tabela). */
  async avisarQuadro(): Promise<void> { await this.env("quadro", {}); }
}

function novoId(): string {
  const c = globalThis.crypto as { randomUUID?: () => string } | undefined;
  if (c?.randomUUID) return c.randomUUID();
  // navegador antigo: uuid v4 à mão (só precisa ser único, não criptográfico)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    return (ch === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const guild = new GuildSession();
