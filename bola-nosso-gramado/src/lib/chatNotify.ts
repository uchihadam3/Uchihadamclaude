// Singleton: assina o realtime de chat_messages uma única vez,
// mantém "última vista" em localStorage e expõe contagem de não-lidas
// + toca um "ping" quando chega mensagem nova (respeitando prefs do chat).
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sfx } from "@/lib/sfx";

const LAST_SEEN_KEY = "chat-last-seen-iso";
const LAST_ID_KEY = "chat-last-seen-id";
const RECENT_COUNT_KEY = "chat-recent-count";
const MAX_BADGE = 99;

type Listener = (n: number) => void;
const listeners = new Set<Listener>();
let unread = 0;
let currentUserId: string | null = null;
let channel: ReturnType<typeof supabase.channel> | null = null;
let onChatPage = false;

function getLastSeen(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = localStorage.getItem(LAST_SEEN_KEY);
    return v ? new Date(v).getTime() : 0;
  } catch { return 0; }
}
function saveLastSeen(iso: string, id?: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_SEEN_KEY, iso);
    if (id) localStorage.setItem(LAST_ID_KEY, id);
    localStorage.setItem(RECENT_COUNT_KEY, "0");
  } catch {}
}
function persistCount(n: number) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(RECENT_COUNT_KEY, String(n)); } catch {}
}
function emit() {
  for (const l of listeners) l(unread);
}
function bump(n: number) {
  unread = Math.min(unread + n, MAX_BADGE);
  persistCount(unread);
  emit();
}

export function markChatSeen() {
  unread = 0;
  saveLastSeen(new Date().toISOString());
  emit();
}
export function setOnChatPage(v: boolean) {
  onChatPage = v;
  if (v) markChatSeen();
}
export function getUnread(): number {
  return unread;
}

async function refreshFromServer() {
  const since = getLastSeen();
  if (!since) {
    // Primeira vez: marca como visto para não explodir badge no primeiro login.
    saveLastSeen(new Date().toISOString());
    unread = 0;
    emit();
    return;
  }
  try {
    const { count } = await supabase
      .from("chat_messages")
      .select("id", { count: "exact", head: true })
      .gt("created_at", new Date(since).toISOString())
      .neq("user_id", currentUserId ?? "00000000-0000-0000-0000-000000000000");
    unread = Math.min(count ?? 0, MAX_BADGE);
    persistCount(unread);
    emit();
  } catch {}
}

export function initChatNotify(userId: string | null) {
  currentUserId = userId;
  if (typeof window !== "undefined") {
    try { unread = parseInt(localStorage.getItem(RECENT_COUNT_KEY) || "0", 10) || 0; } catch {}
    emit();
  }
  if (!userId) return;
  if (channel) return; // já inicializado
  refreshFromServer();

  channel = supabase
    .channel("chat_notify_global")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_messages" },
      (payload) => {
        const m = payload.new as { user_id: string; created_at: string; id: string };
        if (m.user_id === currentUserId) return;
        if (onChatPage) {
          // Usuário já está lendo — não notifica.
          saveLastSeen(m.created_at, m.id);
          return;
        }
        bump(1);
        try { sfx.chatPing(); } catch {}
      },
    )
    .subscribe();
}

export function stopChatNotify() {
  if (channel) {
    supabase.removeChannel(channel);
    channel = null;
  }
  currentUserId = null;
  unread = 0;
  emit();
}

export function useChatUnread(): number {
  const [n, setN] = useState<number>(unread);
  useEffect(() => {
    const l: Listener = (x) => setN(x);
    listeners.add(l);
    setN(unread);
    return () => { listeners.delete(l); };
  }, []);
  return n;
}
