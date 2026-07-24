import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { getMyProfile } from "@/lib/saves";
import { setOnChatPage, markChatSeen } from "@/lib/chatNotify";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat Global — Lendas do Brasileirão" },
      { name: "description", content: "Converse ao vivo com outros técnicos de Lendas do Brasileirão. Comente jogos, tire zoeira e conheça a comunidade." },
      { property: "og:title", content: "Chat Global — Lendas do Brasileirão" },
      { property: "og:description", content: "Converse ao vivo com outros técnicos. Comente, provoque e viva o futebol." },
    ],
  }),
  component: ChatPage,
});

interface Message {
  id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
}

const MAX_LEN = 2000;
const HISTORY_LIMIT = 200;

/** Cor determinística por username — dá "identidade" visual sem foto. */
function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const hue = hashHue(name);
  const letter = (name.trim()[0] ?? "?").toUpperCase();
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-full font-display text-white shadow-lg ring-2 ring-white/10"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, oklch(0.55 0.19 ${hue}), oklch(0.35 0.12 ${(hue + 40) % 360}))`,
        fontSize: size * 0.5,
      }}
      aria-hidden
    >
      {letter}
    </div>
  );
}


function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  if (sameDay) return `${hh}:${mm}`;
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mo} ${hh}:${mm}`;
}

function shouldBreak(prev: Message | undefined, cur: Message): boolean {
  if (!prev) return true;
  if (prev.user_id !== cur.user_id) return true;
  const gap = new Date(cur.created_at).getTime() - new Date(prev.created_at).getTime();
  return gap > 4 * 60 * 1000;
}

function ChatPage() {
  const { session, loading: sessionLoading, userId } = useSession();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState<number>(1);
  const listRef = useRef<HTMLDivElement>(null);
  const wasAtBottomRef = useRef(true);

  // Marca como "na tela do chat" pra suprimir notificações + zerar unread.
  useEffect(() => {
    setOnChatPage(true);
    return () => { setOnChatPage(false); };
  }, []);

  // Redirect to auth if not signed in
  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate({ to: "/auth" });
    }
  }, [sessionLoading, session, navigate]);

  // Load profile
  useEffect(() => {
    if (!userId) return;
    getMyProfile(userId).then((p) => setUsername(p?.username ?? null)).catch(() => {});
  }, [userId]);

  // Initial fetch + realtime subscription
  useEffect(() => {
    if (!userId) return;
    let mounted = true;

    (async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("id,user_id,username,content,created_at")
        .order("created_at", { ascending: false })
        .limit(HISTORY_LIMIT);
      if (!mounted) return;
      if (error) {
        setError(error.message);
      } else if (data) {
        setMessages(data.slice().reverse() as Message[]);
      }
      setLoading(false);
    })();

    const channel = supabase
      .channel("chat_messages_stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          const m = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((x) => x.id === m.id)) return prev;
            const next = [...prev, m];
            if (next.length > HISTORY_LIMIT + 50) next.splice(0, next.length - HISTORY_LIMIT);
            return next;
          });
        },
      )
      .subscribe();

    // Presence channel for "online" count
    const presence = supabase.channel("chat_presence", {
      config: { presence: { key: userId } },
    });
    presence
      .on("presence", { event: "sync" }, () => {
        const state = presence.presenceState();
        setOnline(Object.keys(state).length || 1);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await presence.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
      supabase.removeChannel(presence);
    };
  }, [userId]);

  // Track scroll position (was user at bottom before update?)
  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    wasAtBottomRef.current = dist < 80;
  };

  // Auto-scroll to bottom when new messages arrive (if user was already there)
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (wasAtBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !username) return;
    const content = text.trim();
    if (!content) return;
    if (content.length > MAX_LEN) return;
    setSending(true);
    setError(null);
    wasAtBottomRef.current = true;
    const { error } = await supabase
      .from("chat_messages")
      .insert({ user_id: userId, username, content });
    setSending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setText("");
  };

  if (sessionLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  const remaining = MAX_LEN - text.length;
  const canSend = !!username && !sending && text.trim().length > 0 && text.length <= MAX_LEN;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-3 pt-4 pb-4">
      {/* Header */}
      <header className="mb-3 flex items-center justify-between gap-2">
        <Link
          to="/"
          className="sticker-icon-btn sticker-icon-btn-white"
          aria-label="Voltar"
        >
          ←
        </Link>
        <div className="min-w-0 flex-1 text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Vestiário
          </div>
          <h1 className="cartoon-title text-2xl leading-none">Chat Global</h1>
        </div>
        <div className="chip-outline text-[11px] text-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {online} <span className="hidden xs:inline">on-line</span>
        </div>
      </header>


      {/* Messages panel */}
      <div className="panel-premium relative flex flex-1 flex-col overflow-hidden">
        {/* Field-line decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 28px, oklch(1 0 0) 28px 29px)",
          }}
        />

        <div
          ref={listRef}
          onScroll={onScroll}
          className="relative flex-1 overflow-y-auto px-3 py-4 sm:px-4"
        >
          {loading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Aquecendo o gramado...
            </div>
          )}
          {!loading && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
              <div className="text-5xl">🎙️</div>
              <div className="cartoon-title text-lg">Silêncio no estádio</div>
              <div className="max-w-xs text-xs text-muted-foreground">
                Seja o primeiro a abrir o bate-papo. Mande um "salve" pra galera!
              </div>
            </div>
          )}



          <div className="flex flex-col">
            {messages.map((m, i) => {
              const prev = messages[i - 1];
              const next = messages[i + 1];
              const isMine = m.user_id === userId;
              const showHead = shouldBreak(prev, m);
              const isLastOfGroup = !next || next.user_id !== m.user_id ||
                (new Date(next.created_at).getTime() - new Date(m.created_at).getTime() > 4 * 60 * 1000);
              const hue = hashHue(m.username);
              const time = formatTime(m.created_at);
              return (
                <div
                  key={m.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"} ${showHead ? "mt-2.5" : "mt-0.5"} animate-slide-up`}
                >
                  <div
                    className={`relative max-w-[82%] px-2.5 pt-1.5 pb-1.5 text-sm leading-snug shadow-md whitespace-pre-wrap break-words ${
                      isMine
                        ? "bg-[#005c4b] text-white rounded-2xl"
                        : "bg-[#202c33] text-white rounded-2xl"
                    } ${isLastOfGroup ? (isMine ? "rounded-br-sm" : "rounded-bl-sm") : ""}`}
                    style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                  >
                    {/* WhatsApp-style tail */}
                    {isLastOfGroup && (
                      <span
                        aria-hidden
                        className={`absolute bottom-0 h-3 w-3 ${isMine ? "-right-1" : "-left-1"}`}
                        style={{
                          background: isMine ? "#005c4b" : "#202c33",
                          clipPath: isMine
                            ? "polygon(0 0, 100% 100%, 0 100%)"
                            : "polygon(100% 0, 100% 100%, 0 100%)",
                        }}
                      />
                    )}

                    {!isMine && showHead && (
                      <div
                        className="mb-0.5 font-semibold text-[13px] truncate"
                        style={{ color: `oklch(0.82 0.16 ${hue})` }}
                      >
                        {m.username}
                      </div>
                    )}

                    <span className="pr-12">{m.content}</span>
                    <span className="float-right ml-2 mt-1 select-none text-[10px] leading-none text-white/55 tabular-nums">
                      {time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Composer */}
        <div className="relative border-t border-white/10 bg-black/25 p-2.5 backdrop-blur">
          {!username ? (
            <div className="sticker-card flex items-center justify-between gap-2 p-3 text-xs text-yellow-100">
              <span>Você precisa de um nome de usuário pra falar no chat.</span>
              <Link
                to="/"
                className="sticker-btn sticker-btn-gold text-[11px]"
              >
                Definir
              </Link>
            </div>

          ) : (
            <form onSubmit={send} className="flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (canSend) send(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder="Manda um salve pra galera..."
                  disabled={sending}
                  rows={1}
                  ref={(el) => {
                    if (!el) return;
                    el.style.height = "0px";
                    el.style.height = Math.min(el.scrollHeight, 160) + "px";
                  }}
                  className="block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-14 text-sm leading-snug outline-none transition focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 max-h-40 overflow-y-auto break-words"
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                />
                <span
                  className={`pointer-events-none absolute right-3 bottom-2 text-[10px] tabular-nums ${
                    remaining < 100 ? "text-amber-300" : "text-muted-foreground/70"
                  }`}
                >
                  {remaining}
                </span>
              </div>
              <button
                type="submit"
                disabled={!canSend}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-lg btn-primary disabled:opacity-40"
                aria-label="Enviar"
              >
                {sending ? "…" : "⚽"}
              </button>
            </form>
          )}
          {error && (
            <div className="mt-2 rounded-lg bg-red-500/15 px-3 py-1.5 text-[11px] text-red-300">
              {error}
            </div>
          )}
          <div className="mt-1.5 px-1 text-center text-[10px] text-muted-foreground/70">
            Respeite os outros técnicos. Sem xingamento, spam ou dados pessoais.
          </div>
        </div>
      </div>
    </div>
  );
}
