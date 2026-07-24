import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Redefinir senha — Lendas do Brasileirão" },
      { name: "description", content: "Defina uma nova senha para sua conta." },
    ],
  }),
  component: ResetPasswordPage,
});

function translateError(err: unknown): string {
  const msg = (err instanceof Error ? err.message : String(err ?? "")).toLowerCase();
  if (msg.includes("password should be at least") || msg.includes("weak_password")) {
    return "Senha fraca. Use pelo menos 6 caracteres.";
  }
  if (msg.includes("same password") || msg.includes("new password should be different")) {
    return "A nova senha precisa ser diferente da anterior.";
  }
  if (msg.includes("pwned") || msg.includes("has been found in a data breach")) {
    return "Essa senha aparece em vazamentos conhecidos. Escolha outra.";
  }
  if (msg.includes("session") || msg.includes("expired") || msg.includes("invalid")) {
    return "Link de recuperação inválido ou expirado. Solicite um novo.";
  }
  return "Não foi possível redefinir a senha. Tente novamente.";
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    // Supabase redirects with #access_token=...&type=recovery. The client picks it
    // up automatically via detectSessionInUrl and fires PASSWORD_RECOVERY.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password.length < 6) return setError("Senha fraca. Use pelo menos 6 caracteres.");
    if (password !== confirm) return setError("As senhas não coincidem.");
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setInfo("Senha atualizada! Redirecionando...");
      setTimeout(() => navigate({ to: "/" }), 1200);
    } catch (err) {
      setError(translateError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
      <div className="text-center">
        <div className="text-5xl">🔐</div>
        <h1 className="mt-2 font-display text-3xl gold-text">Redefinir senha</h1>
        <p className="mt-2 text-sm text-muted-foreground">Escolha uma nova senha para sua conta.</p>
      </div>

      {!ready ? (
        <div className="mt-6 rounded-lg bg-secondary/60 p-4 text-center text-sm text-muted-foreground">
          Validando link de recuperação...
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label className="text-xs uppercase text-muted-foreground">Nova senha</label>
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
          <div>
            <label className="text-xs uppercase text-muted-foreground">Confirmar senha</label>
            <input
              type="password"
              required
              minLength={6}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-input px-4 py-3 outline-none focus:border-primary"
              placeholder="repita a senha"
            />
          </div>
          {error && <div className="rounded-lg bg-red-500/15 p-3 text-sm text-red-300">{error}</div>}
          {info && <div className="rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-200">{info}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl px-4 py-3 font-display text-lg btn-primary disabled:opacity-60"
          >
            {busy ? "..." : "Salvar nova senha"}
          </button>
        </form>
      )}
    </div>
  );
}
