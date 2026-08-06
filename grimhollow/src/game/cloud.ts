// ============================================================================
// NUVEM (Supabase) — login social (Google/Discord) + save na nuvem por conta.
//   • O SDK do Supabase é carregado SOB DEMANDA (só quando há config + login),
//     via CDN — o Convidado (save local) nunca paga esse custo.
//   • SupabaseBackend implementa a MESMA interface SaveBackend (save.ts), então o
//     resto do jogo não muda: é só trocar o backend ativo ao logar.
//
//   ---- SQL p/ criar a tabela no Supabase (SQL Editor) ----------------------
//   create table if not exists public.characters (
//     user_id    uuid        not null references auth.users (id) on delete cascade,
//     slot       smallint    not null,
//     name       text        not null,
//     class_id   text        not null,
//     level      integer     not null default 1,
//     data       jsonb       not null,
//     updated_at timestamptz not null default now(),
//     constraint characters_pkey primary key (user_id, slot),
//     constraint characters_slot_range check (slot >= 0 and slot <= 2)
//   );
//   alter table public.characters enable row level security;
//   drop policy if exists "own_characters" on public.characters;
//   create policy "own_characters" on public.characters
//     for all to authenticated
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
//   (o user_id é enviado pelo jogo no upsert — por isso a coluna não precisa de default)
//   -------------------------------------------------------------------------
// ============================================================================
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured, type OAuthProvider } from "./supabaseConfig";
import { setActiveBackend, localBackend, type SaveBackend, type CharacterSave, type SaveMeta } from "./save";

const ESM_SUPABASE = "https://esm.sh/@supabase/supabase-js@2";

// tipo mínimo do client que usamos (evita depender do pacote no build)
interface SbClient {
  auth: {
    getSession(): Promise<{ data: { session: unknown | null } }>;
    getUser(): Promise<{ data: { user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null } }>;
    signInWithOAuth(opts: { provider: string; options?: { redirectTo?: string } }): Promise<{ error: unknown }>;
    signInWithPassword(c: { email: string; password: string }): Promise<{ data: { session: unknown; user: { id: string; email?: string } | null }; error: { message?: string } | null }>;
    signUp(c: { email: string; password: string }): Promise<{ data: { session: unknown; user: { id: string; email?: string } | null }; error: { message?: string } | null }>;
    signOut(): Promise<unknown>;
    onAuthStateChange(cb: (event: string, session: unknown) => void): unknown;
  };
  from(table: string): {
    select(cols: string): { order(c: string, o?: { ascending: boolean }): Promise<{ data: unknown[] | null; error: unknown }>; eq(c: string, v: unknown): { maybeSingle(): Promise<{ data: unknown; error: unknown }> } };
    upsert(row: Record<string, unknown>, opts?: { onConflict: string }): Promise<{ error: unknown }>;
    delete(): { eq(c: string, v: unknown): Promise<{ error: unknown }> };
  };
}

let clientPromise: Promise<SbClient> | null = null;
// O co-op (net.ts) precisa do MESMO cliente — criar um segundo deixaria o
// Realtime sem a sessão do login e abriria duas conexões à toa.
export async function getSupabaseClient(): Promise<unknown> { return getClient(); }

async function getClient(): Promise<SbClient> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const mod = (await import(/* @vite-ignore */ ESM_SUPABASE)) as { createClient: (u: string, k: string, o?: unknown) => SbClient };
      return mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      });
    })();
  }
  return clientPromise;
}

// ---- backend de nuvem: uma linha por (user_id, slot), data = o blob CharacterSave ----
class SupabaseBackend implements SaveBackend {
  constructor(private sb: SbClient, private userId: string) {}
  async list(): Promise<SaveMeta[]> {
    const { data } = await this.sb.from("characters").select("slot,name,class_id,level,updated_at").order("slot", { ascending: true });
    return (data ?? []).map((r) => {
      const row = r as { slot: number; name: string; class_id: string; level: number; updated_at: string };
      return { slot: row.slot, name: row.name, classId: row.class_id, level: row.level, savedAt: Date.parse(row.updated_at) || 0 };
    });
  }
  async load(slot: number): Promise<CharacterSave | null> {
    const { data } = await this.sb.from("characters").select("data").eq("slot", slot).maybeSingle();
    const row = data as { data: CharacterSave } | null;
    return row?.data ?? null;
  }
  async save(s: CharacterSave): Promise<void> {
    await this.sb.from("characters").upsert(
      { user_id: this.userId, slot: s.slot, name: s.name, class_id: s.classId, level: s.level, data: s, updated_at: new Date().toISOString() },
      { onConflict: "user_id,slot" },
    );
  }
  async remove(slot: number): Promise<void> { await this.sb.from("characters").delete().eq("slot", slot); }
  lastSlot(): number | null { try { const v = localStorage.getItem("gh-save-last"); return v == null ? null : Number(v); } catch { return null; } }
  setLastSlot(slot: number): void { try { localStorage.setItem("gh-save-last", String(slot)); } catch { /* ignora */ } }
}

export interface CloudUser { id: string; email?: string; name?: string; }

// QUEM ESTÁ LOGADO AGORA (null = Convidado).
// A Companhia precisa saber disso p/ decidir entre mostrar o formulário de
// fundação ou explicar que aquilo pede conta — e precisa saber SEM ida à rede,
// senão a janela abriria errada e se corrigiria meio segundo depois. Por isso o
// valor fica anotado aqui, atualizado nos três pontos que o mudam.
let usuarioAtual: CloudUser | null = null;
export function currentUser(): CloudUser | null { return usuarioAtual; }

// sessão já ativa? (voltou do OAuth ou "lembrar-me"). Se sim, liga o backend de nuvem.
export async function restoreCloudSession(): Promise<CloudUser | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const sb = await getClient();
    const { data: sess } = await sb.auth.getSession();
    if (!sess.session) return null;
    const { data: u } = await sb.auth.getUser();
    if (!u.user) return null;
    setActiveBackend(new SupabaseBackend(sb, u.user.id));
    const meta = u.user.user_metadata ?? {};
    usuarioAtual = { id: u.user.id, email: u.user.email, name: (meta.full_name as string) || (meta.name as string) || u.user.email };
    return usuarioAtual;
  } catch { return null; }
}

// dispara o login social — REDIRECIONA a página; ao voltar, restoreCloudSession pega.
export async function loginWithProvider(provider: OAuthProvider): Promise<void> {
  const sb = await getClient();
  await sb.auth.signInWithOAuth({ provider, options: { redirectTo: location.href.split("#")[0] } });
}

// ---- Email/senha (nativo do Supabase — não precisa configurar provedor) --------
export async function signInWithEmail(email: string, password: string): Promise<CloudUser> {
  const sb = await getClient();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw new Error(error?.message || "E-mail ou senha inválidos.");
  setActiveBackend(new SupabaseBackend(sb, data.user.id));
  usuarioAtual = { id: data.user.id, email: data.user.email };
  return usuarioAtual;
}
// cria a conta. Se a confirmação por e-mail estiver LIGADA no Supabase, não vem
// sessão → o jogador precisa confirmar pelo link. Se estiver DESLIGADA, já loga.
export async function signUpWithEmail(email: string, password: string): Promise<{ user: CloudUser | null; needsConfirm: boolean }> {
  const sb = await getClient();
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw new Error(error.message || "Não foi possível criar a conta.");
  if (data.session && data.user) {
    setActiveBackend(new SupabaseBackend(sb, data.user.id));
    usuarioAtual = { id: data.user.id, email: data.user.email };
    return { user: usuarioAtual, needsConfirm: false };
  }
  return { user: null, needsConfirm: true };
}

export async function signOutCloud(): Promise<void> {
  try { if (isSupabaseConfigured()) { const sb = await getClient(); await sb.auth.signOut(); } } catch { /* ignora */ }
  usuarioAtual = null;
  setActiveBackend(localBackend);
}
