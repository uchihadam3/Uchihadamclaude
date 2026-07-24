import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  listMySlots,
  deleteSlot,
  isNameAvailable,
  validateName,
  getMyProfile,
  upsertMyProfile,
  isUsernameAvailable,
  validateUsername,
  recomputeMyScores,
  type SaveSlot,
} from "@/lib/saves";
import { useChatUnread } from "@/lib/chatNotify";
import { CoachModal } from "@/components/CoachModal";
import { computeCoachState, getCoachEffects, setActiveCoachEffects, computeIdoloOvrBump, bankXPFromSaves } from "@/lib/coach";
import wordmarkAsset from "@/assets/wordmark.png.asset.json";
import mascotAsset from "@/assets/mascot-hero.png.asset.json";

interface Props {
  userId: string;
  userEmail: string;
  onOpen: (slot: SaveSlot) => void;
  onCreate: (slotIndex: number, displayName: string) => void;
}

const SLOT_COUNT = 5;

function UsernameGate({ userId, onDone }: { userId: string; onDone: (username: string) => void }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const v = validateUsername(name);
    if (v) { setErr(v); return; }
    setBusy(true);
    try {
      const ok = await isUsernameAvailable(name);
      if (!ok) { setErr("Esse nome de usuário já está em uso."); setBusy(false); return; }
      const p = await upsertMyProfile(userId, name);
      onDone(p.username);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-card p-5 card-glow">
        <div className="text-center text-4xl">👤</div>
        <h2 className="mt-2 text-center font-display text-2xl gold-text">Escolha seu nome de usuário</h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">Ele aparece no ranking global ao lado dos seus times. Não dá pra mudar depois.</p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="seu apelido"
          className="mt-4 w-full rounded-xl border border-border bg-input px-4 py-3 outline-none focus:border-primary"
        />
        <div className="mt-1 text-[11px] text-muted-foreground">3–20 caracteres. Letras, números, espaço, _ ou -.</div>
        {err && <div className="mt-2 rounded-lg bg-red-500/15 p-2 text-sm text-red-300">{err}</div>}
        <button type="submit" disabled={busy} className="mt-4 w-full rounded-xl px-4 py-3 font-display btn-primary disabled:opacity-60">
          {busy ? "..." : "Confirmar"}
        </button>
      </form>
    </div>
  );
}

export function SlotsScreen({ userId, userEmail, onOpen, onCreate }: Props) {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<SaveSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [profileChecked, setProfileChecked] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [deleting, setDeleting] = useState<SaveSlot | null>(null);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      setSlots(await listMySlots(userId));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try { await recomputeMyScores(userId); } catch { /* noop */ }
      await refresh();
    })();
    getMyProfile(userId).then((p) => {
      setUsername(p?.username ?? null);
      setProfileChecked(true);
    }).catch(() => setProfileChecked(true));
    // eslint-disable-next-line
  }, [userId]);

  // Planta efeitos do técnico assim que os saves chegam.
  useEffect(() => {
    if (!loading) {
      const eff = getCoachEffects(computeCoachState(userId, slots));
      eff.idoloOvrBump = computeIdoloOvrBump(slots, eff.idoloCap);
      setActiveCoachEffects(eff);
    }
  }, [slots, loading, userId]);

  const sortedSlots = [...slots].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const bySlot = new Map(slots.map((s) => [s.slot_index, s]));
  const emptyIndices: number[] = [];
  for (let i = 0; i < SLOT_COUNT; i++) if (!bySlot.has(i)) emptyIndices.push(i);

  const startCreate = (idx: number) => {
    setCreating(idx);
    setNewName("");
    setError(null);
  };

  const confirmCreate = async () => {
    if (creating === null) return;
    const err = validateName(newName);
    if (err) { setError(err); return; }
    setBusy(true);
    setError(null);
    try {
      const ok = await isNameAvailable(newName);
      if (!ok) { setError("Esse nome já está sendo usado no ranking. Escolha outro."); setBusy(false); return; }
      onCreate(creating, newName.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  const remove = (slot: SaveSlot) => {
    setDeleting(slot);
    setDeleteInput("");
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    if (deleteInput.trim().toLowerCase() !== deleting.display_name.trim().toLowerCase()) return;
    setDeleteBusy(true);
    try {
      // Trava o XP ganho no save que será deletado antes de removê-lo.
      try { bankXPFromSaves(userId, [deleting]); } catch { /* noop */ }
      await deleteSlot(deleting.id);
      setDeleting(null);
      setDeleteInput("");
      await refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setDeleteBusy(false);
    }
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8 pb-24">
      {profileChecked && !username && (
        <UsernameGate userId={userId} onDone={setUsername} />
      )}
      <header className="mb-6 flex items-center justify-between">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Conectado</div>
          <div className="truncate font-display text-lg">{username ? `👤 ${username}` : userEmail}</div>
          {username && <div className="truncate text-[11px] text-muted-foreground">{userEmail}</div>}
        </div>
        <div className="flex items-center gap-2">
          <ChatButton />
          <button
            onClick={() => navigate({ to: "/ranking" })}
            className="sticker-icon-btn sticker-icon-btn-gold"
            aria-label="Ranking"
            title="Ranking"
          >🏆</button>
          <button
            onClick={signOut}
            className="sticker-btn sticker-btn-danger"
            aria-label="Sair"
          >Sair</button>
        </div>
      </header>


      {/* Hero brand banner — wordmark + mascot in the badge art style */}
      <div className="relative mb-5 overflow-hidden rounded-3xl border-2 border-black/70 shadow-[0_8px_0_rgba(0,0,0,0.55),0_20px_40px_-12px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-900 to-green-950" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 32px, rgba(255,255,255,0.08) 32px, rgba(255,255,255,0.08) 64px)" }} />
        <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-yellow-400/20 blur-2xl" />
        <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-emerald-300/15 blur-2xl" />
        <div className="relative flex items-center gap-3 p-4">
          <img
            src={mascotAsset.url}
            alt=""
            aria-hidden
            className="h-28 w-28 shrink-0 drop-shadow-[0_6px_0_rgba(0,0,0,0.5)] sm:h-32 sm:w-32"
          />
          <div className="min-w-0 flex-1">
            <img
              src={wordmarkAsset.url}
              alt="Lendas do Brasileirão"
              className="h-auto w-full max-w-[260px] drop-shadow-[0_4px_0_rgba(0,0,0,0.55)]"
            />
            <div className="mt-1.5">
              <span className="ribbon-tag text-[11px]">Monte o time dos sonhos</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate({ to: "/ranking" })}
        className="mb-3 w-full sticker-card px-4 py-3 text-left transition hover:brightness-110 active:translate-y-[3px] active:shadow-[0_2px_0_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-black/70 bg-yellow-400 text-2xl shadow-[0_3px_0_rgba(0,0,0,0.55)]">🏆</div>
          <div className="flex-1">
            <div className="font-display text-base text-yellow-200">Ranking global</div>
            <div className="text-xs text-muted-foreground">Veja sua posição — modos Casual e Clássico</div>
          </div>
          <div className="text-yellow-300">→</div>
        </div>
      </button>

      <button
        onClick={() => navigate({ to: "/badges" })}
        className="mb-3 w-full sticker-card px-4 py-3 text-left transition hover:brightness-110 active:translate-y-[3px] active:shadow-[0_2px_0_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-black/70 bg-gradient-to-br from-orange-400 to-pink-500 text-2xl shadow-[0_3px_0_rgba(0,0,0,0.55)]">🏅</div>
          <div className="flex-1">
            <div className="font-display text-base text-orange-200">Medalhas do Mundial</div>
            <div className="text-xs text-muted-foreground">27 medalhas · cada uma dá +0,1 OVR permanente</div>
          </div>
          <div className="text-orange-300">→</div>
        </div>
      </button>

      <button
        onClick={() => setCoachOpen(true)}
        className="mb-4 w-full sticker-card px-4 py-3 text-left transition hover:brightness-110 active:translate-y-[3px] active:shadow-[0_2px_0_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-black/70 bg-gradient-to-br from-amber-500 to-amber-700 text-2xl shadow-[0_3px_0_rgba(0,0,0,0.55)]">🎓</div>
          <div className="flex-1">
            <div className="font-display text-base text-amber-200">Técnico · Skill Tree</div>
            <div className="text-xs text-muted-foreground">Evolua sua carreira com XP de temporadas e títulos</div>
          </div>
          <div className="text-amber-300">→</div>
        </div>
      </button>

      {coachOpen && (
        <CoachModal
          userId={userId}
          username={username}
          saves={slots}
          onClose={() => setCoachOpen(false)}
        />
      )}

      <div className="mb-2 flex items-end justify-between gap-3">
        <h1 className="cartoon-title text-4xl">Seus saves</h1>
        <span className="ribbon-tag text-[11px]">até {SLOT_COUNT} slots</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Cada nome aparece no ranking global e não pode se repetir.</p>

      {loading && <div className="mt-6 text-muted-foreground">Carregando...</div>}
      {error && <div className="mt-4 rounded-lg bg-red-500/15 p-3 text-sm text-red-300">{error}</div>}

      <div className="mt-4 space-y-3">
        {sortedSlots.map((slot, rank) => (
          <div key={slot.id} className="sticker-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs uppercase text-muted-foreground">
                  {rank === 0 ? "🥇 Melhor pontuação" : rank === 1 ? "🥈 2ª melhor" : rank === 2 ? "🥉 3ª melhor" : `#${rank + 1}`}
                </div>
                <div className="truncate font-display text-2xl gold-text">{slot.display_name}</div>
                <div className="mt-1 truncate text-sm text-muted-foreground">{slot.team_name || "—"} · Temporada {slot.season}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="rounded-lg border-2 border-black/70 bg-yellow-400 px-2 py-0.5 font-display text-black shadow-[0_2px_0_rgba(0,0,0,0.55)]">{slot.score} pts</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => onOpen(slot)} className="sticker-btn sticker-btn-emerald">Continuar</button>
              <button onClick={() => remove(slot)} className="sticker-btn sticker-btn-danger">Excluir</button>
            </div>
          </div>
        ))}
        {emptyIndices.map((i) => (
          <div key={`empty-${i}`} className="rounded-2xl border-2 border-dashed border-yellow-500/40 bg-black/20 p-4">
            <div className="text-xs uppercase text-muted-foreground">Slot vazio</div>
            {creating === i ? (
              <div className="mt-2 space-y-2">
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Seu nome no ranking"
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 outline-none focus:border-primary"
                  maxLength={20}
                />
                <div className="text-xs text-muted-foreground">3–20 caracteres. Letras, números, espaço, _ ou -.</div>
                <div className="flex gap-2">
                  <button
                    onClick={confirmCreate}
                    disabled={busy}
                    className="flex-1 sticker-btn sticker-btn-gold"
                  >{busy ? "..." : "Criar"}</button>
                  <button
                    onClick={() => { setCreating(null); setError(null); }}
                    className="sticker-btn"
                  >Cancelar</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => startCreate(i)}
                className="mt-2 w-full sticker-btn sticker-btn-emerald"
              >+ Criar novo save</button>
            )}
          </div>
        ))}
      </div>

      {deleting && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => !deleteBusy && setDeleting(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-red-500/40 bg-gradient-to-br from-[#1a0808] to-[#0a0505] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center gap-2 font-display text-lg text-red-300">
              <span>⚠️</span> Excluir save?
            </div>
            <p className="text-sm text-red-100/90">
              Você está prestes a excluir <b className="text-white">"{deleting.display_name}"</b>
              {deleting.team_name ? <> (time <b className="text-white">{deleting.team_name}</b>)</> : null}
              {" "}com <b className="text-white">{deleting.score ?? 0}</b> pontos.
            </p>
            <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-100/90">
              <b className="text-red-200">Esta ação é permanente.</b> O save some do ranking e
              <b> não tem como recuperar</b> — nem por suporte, nem por backup. Tudo (elenco, temporadas, títulos, escudo, história) é apagado pra sempre.
            </div>
            <label className="mt-4 block text-xs text-red-100/80">
              Para confirmar, digite o nome do save exatamente: <b className="text-white">{deleting.display_name}</b>
            </label>
            <input
              autoFocus
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder={deleting.display_name}
              className="mt-1 w-full rounded-lg border border-red-500/40 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeleting(null)}
                disabled={deleteBusy}
                className="sticker-btn"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={
                  deleteBusy ||
                  deleteInput.trim().toLowerCase() !== deleting.display_name.trim().toLowerCase()
                }
                className="sticker-btn sticker-btn-danger"
              >
                {deleteBusy ? "Excluindo…" : "Excluir para sempre"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatButton() {
  const navigate = useNavigate();
  const unread = useChatUnread();
  return (
    <button
      onClick={() => navigate({ to: "/chat" })}
      className="sticker-icon-btn sticker-icon-btn-emerald relative"
      aria-label="Chat global"
      title="Chat global"
    >
      💬
      {unread > 0 && (
        <span className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-black bg-red-500 px-1 text-[10px] font-bold text-white shadow-[0_1px_0_#000] animate-pulse">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </button>
  );
}

