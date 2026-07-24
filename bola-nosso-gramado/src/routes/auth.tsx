import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { isUsernameAvailable, upsertMyProfile, validateUsername } from "@/lib/saves";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Lendas do Brasileirão" },
      { name: "description", content: "Entre ou crie sua conta para jogar Lendas do Brasileirão online e disputar o ranking global." },
      { property: "og:title", content: "Entrar — Lendas do Brasileirão" },
      { property: "og:description", content: "Jogue online e apareça no ranking global." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function translateAuthError(err: unknown, mode: Mode): string {
  const raw = err instanceof Error ? err.message : String(err ?? "");
  const code = (err as { code?: string } | null)?.code?.toLowerCase?.() ?? "";
  const status = (err as { status?: number } | null)?.status;
  const msg = (raw + " " + code).toLowerCase();

  if (msg.includes("invalid login credentials") || msg.includes("invalid_credentials")) {
    return "E-mail ou senha incorretos. Verifique e tente de novo.";
  }
  if (msg.includes("email not confirmed") || msg.includes("email_not_confirmed")) {
    return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada (e o spam).";
  }
  if (
    msg.includes("user already registered") ||
    msg.includes("already registered") ||
    msg.includes("user_already_exists") ||
    msg.includes("email_exists") ||
    msg.includes("already been registered")
  ) {
    return "Este e-mail já está cadastrado. Tente entrar ou use 'Esqueci minha senha'.";
  }
  if (msg.includes("já está em uso")) {
    return raw; // veio do nosso check de username
  }
  if (
    msg.includes("password should be at least") ||
    msg.includes("weak_password") ||
    msg.includes("password is too short") ||
    msg.includes("password is too weak")
  ) {
    return "Senha fraca. Use pelo menos 6 caracteres (misture letras, números e símbolos).";
  }
  if (msg.includes("pwned") || msg.includes("data breach") || msg.includes("has been leaked")) {
    return "Essa senha aparece em vazamentos conhecidos. Escolha outra mais forte.";
  }
  if (
    msg.includes("unable to validate email") ||
    msg.includes("invalid email") ||
    msg.includes("email address is invalid") ||
    msg.includes("email_address_invalid") ||
    msg.includes("validation_failed")
  ) {
    return "E-mail inválido. Confira se digitou corretamente (ex: nome@dominio.com).";
  }
  if (msg.includes("email address") && msg.includes("not authorized")) {
    return "Este domínio de e-mail não é permitido. Tente outro e-mail.";
  }
  if (msg.includes("signup_disabled") || (msg.includes("signup") && (msg.includes("disabled") || msg.includes("not allowed")))) {
    return "Criação de conta está desativada no momento. Tente novamente mais tarde.";
  }
  if (msg.includes("user not found") || msg.includes("user_not_found")) {
    return "Não encontramos uma conta com esse e-mail.";
  }
  if (
    msg.includes("rate limit") ||
    msg.includes("over_email_send_rate_limit") ||
    msg.includes("over_request_rate_limit") ||
    msg.includes("too many requests") ||
    status === 429
  ) {
    return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.";
  }
  if (msg.includes("captcha")) {
    return "Verificação de captcha falhou. Recarregue a página e tente de novo.";
  }
  if (msg.includes("network") || msg.includes("failed to fetch") || msg.includes("networkerror")) {
    return "Falha de conexão. Verifique sua internet e tente novamente.";
  }
  // Fallback: mostra a mensagem crua do servidor pra não esconder o motivo
  const prefix =
    mode === "signup" ? "Não foi possível criar a conta" :
    mode === "forgot" ? "Não foi possível enviar o e-mail" :
    "Não foi possível entrar";
  const detail = raw && raw !== "[object Object]" ? `: ${raw}` : ".";
  return `${prefix}${detail}`;
}

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/" });
  }, [loading, session, navigate]);

  useEffect(() => {
    setError(null);
    setInfo(null);
  }, [mode]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const trimmedEmail = email.trim();
      if (!EMAIL_RE.test(trimmedEmail)) {
        throw new Error("E-mail inválido. Confira se digitou corretamente.");
      }

      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("Enviamos um link de recuperação para seu e-mail. Confira a caixa de entrada (e o spam).");
        return;
      }

      if (mode === "signup") {
        const uErr = validateUsername(username);
        if (uErr) throw new Error(uErr);
        try {
          const ok = await isUsernameAvailable(username);
          if (!ok) throw new Error("Esse nome de usuário já está em uso. Escolha outro.");
        } catch (err) {
          if (err instanceof Error && err.message.includes("já está em uso")) throw err;
          // se a checagem falhar por rede, deixa o insert reclamar depois
        }
        if (password.length < 6) {
          throw new Error("Senha fraca. Use pelo menos 6 caracteres.");
        }
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: { emailRedirectTo: window.location.origin, data: { username: username.trim() } },
        });
        if (error) throw error;
        const uid = data.user?.id ?? data.session?.user?.id;
        if (uid && data.session) {
          try { await upsertMyProfile(uid, username); } catch { /* será tentado depois */ }
        }
        if (!data.session) {
          setInfo("Conta criada! Confirme seu e-mail para entrar.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
        if (error) throw error;
      }
      navigate({ to: "/" });
    } catch (err) {
      setError(translateAuthError(err, mode));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
      <div className="text-center">
        <img
          src="/__l5e/assets-v1/152f827a-abb4-4696-8ccb-ff296d818ef2/mascot-hero.png"
          alt=""
          aria-hidden
          className="mx-auto h-40 w-40 drop-shadow-[0_8px_0_rgba(0,0,0,0.45)]"
        />
        <img
          src="/__l5e/assets-v1/20b356f6-a635-45c2-9a1c-978d868252cd/wordmark.png"
          alt="Lendas do Brasileirão"
          className="mx-auto mt-2 h-auto w-full max-w-[300px] drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]"
        />
        <p className="mt-3 text-sm text-muted-foreground">Entre para salvar seus saves na nuvem e disputar o ranking global.</p>
      </div>

      {mode !== "forgot" && (
        <div className="mt-6 flex rounded-xl bg-secondary p-1">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >Entrar</button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >Criar conta</button>
        </div>
      )}

      {mode === "forgot" && (
        <div className="mt-6 rounded-xl bg-secondary/60 p-3 text-center text-sm">
          <div className="font-semibold">Recuperar senha</div>
          <div className="text-xs text-muted-foreground">Enviaremos um link para redefinir sua senha.</div>
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-3">
        {mode === "signup" && (
          <div>
            <label className="text-xs uppercase text-muted-foreground">Nome de usuário</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-input px-4 py-3 outline-none focus:border-primary"
              placeholder="seu apelido no ranking"
              maxLength={20}
            />
            <div className="mt-1 text-[11px] text-muted-foreground">3–20 caracteres. Aparece no ranking global.</div>
          </div>
        )}
        <div>
          <label className="text-xs uppercase text-muted-foreground">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-input px-4 py-3 outline-none focus:border-primary"
            placeholder="voce@exemplo.com"
          />
        </div>
        {mode !== "forgot" && (
          <div>
            <label className="text-xs uppercase text-muted-foreground">Senha</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-input px-4 py-3 outline-none focus:border-primary"
              placeholder="mínimo 6 caracteres"
            />
          </div>
        )}
        {error && <div className="rounded-lg bg-red-500/15 p-3 text-sm text-red-300">{error}</div>}
        {info && <div className="rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-200">{info}</div>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl px-4 py-3 font-display text-lg btn-primary disabled:opacity-60"
        >
          {busy ? "..." : mode === "signup" ? "Criar conta" : mode === "forgot" ? "Enviar link" : "Entrar"}
        </button>

        {mode === "signin" && (
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="mt-1 w-full text-center text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >Esqueci minha senha</button>
        )}
        {mode === "forgot" && (
          <button
            type="button"
            onClick={() => setMode("signin")}
            className="mt-1 w-full text-center text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >← Voltar para entrar</button>
        )}
      </form>

      <button
        onClick={() => navigate({ to: "/ranking" })}
        className="mt-4 text-center text-sm text-muted-foreground hover:text-foreground"
      >Ver ranking global →</button>
    </div>
  );
}
