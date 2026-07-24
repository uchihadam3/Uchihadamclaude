import { Component, type ErrorInfo, type ReactNode, useState, useEffect } from "react";

// Erros assíncronos (fora do ciclo de render do React) não são pegos por
// Error Boundaries. Guardamos o último erro global aqui e disparamos um
// listener para o boundary renderizar a tela amarela.
type GlobalError = { message: string; stack?: string; source?: string };
let globalErr: GlobalError | null = null;
const listeners = new Set<() => void>();
function setGlobalErr(e: GlobalError | null) {
  globalErr = e;
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined" && !(window as any).__crashCatcherInstalled) {
  (window as any).__crashCatcherInstalled = true;
  window.addEventListener("error", (ev) => {
    if (globalErr) return; // já tem um mostrando
    const err = ev.error;
    setGlobalErr({
      message: err?.message || ev.message || "Erro desconhecido",
      stack: err?.stack,
      source: ev.filename ? `${ev.filename}:${ev.lineno}:${ev.colno}` : undefined,
    });
  });
  window.addEventListener("unhandledrejection", (ev) => {
    if (globalErr) return;
    const reason: any = ev.reason;
    setGlobalErr({
      message: reason?.message || String(reason) || "Promise rejection",
      stack: reason?.stack,
      source: "unhandledrejection",
    });
  });
}

function ErrorPanel({ err, onDismiss }: { err: GlobalError; onDismiss: () => void }) {
  const [copied, setCopied] = useState(false);
  const details = [
    `MSG: ${err.message}`,
    err.source ? `SRC: ${err.source}` : "",
    `URL: ${typeof window !== "undefined" ? window.location.href : "?"}`,
    `UA:  ${typeof navigator !== "undefined" ? navigator.userAgent : "?"}`,
    `TIME: ${new Date().toISOString()}`,
    "",
    "STACK:",
    err.stack || "(sem stack)",
  ]
    .filter(Boolean)
    .join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: seleciona o texto do <pre>
      const pre = document.getElementById("crash-details");
      if (pre) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "16px",
        overflow: "auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#fef3c7",
          color: "#111",
          border: "3px solid #000",
          borderRadius: "16px",
          padding: "18px",
          boxShadow: "0 6px 0 #000",
        }}
      >
        <div style={{ fontSize: "22px", fontWeight: 800, marginBottom: "6px" }}>
          ⚠️ O jogo travou
        </div>
        <div style={{ fontSize: "13px", marginBottom: "12px", lineHeight: 1.4 }}>
          Manda um <b>print desta tela</b> pro dono do jogo. Isso ajuda a
          consertar o bug rapidinho. Depois é só voltar ao jogo.
        </div>

        <div
          style={{
            background: "#fff",
            border: "2px solid #000",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "12px",
            fontWeight: 700,
            marginBottom: "10px",
            wordBreak: "break-word",
          }}
        >
          {err.message}
        </div>

        <pre
          id="crash-details"
          style={{
            background: "#111",
            color: "#a7f3d0",
            border: "2px solid #000",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "10.5px",
            lineHeight: 1.35,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            maxHeight: "45vh",
            overflow: "auto",
            margin: 0,
          }}
        >
          {details}
        </pre>

        <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
          <button
            onClick={copy}
            style={{
              flex: 1,
              minWidth: "140px",
              background: "#facc15",
              border: "2px solid #000",
              borderRadius: "10px",
              padding: "10px 14px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 3px 0 #000",
            }}
          >
            {copied ? "✓ Copiado!" : "📋 Copiar detalhes"}
          </button>
          <button
            onClick={onDismiss}
            style={{
              flex: 1,
              minWidth: "140px",
              background: "#fff",
              border: "2px solid #000",
              borderRadius: "10px",
              padding: "10px 14px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 3px 0 #000",
            }}
          >
            ↺ Voltar ao jogo
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              flex: 1,
              minWidth: "140px",
              background: "#fff",
              border: "2px solid #000",
              borderRadius: "10px",
              padding: "10px 14px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 3px 0 #000",
            }}
          >
            🔄 Recarregar
          </button>
        </div>
      </div>
    </div>
  );
}

function GlobalErrorHost() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  if (!globalErr) return null;
  return <ErrorPanel err={globalErr} onDismiss={() => setGlobalErr(null)} />;
}

interface State {
  err: GlobalError | null;
}
export class CrashCatcher extends Component<{ children: ReactNode }, State> {
  state: State = { err: null };
  static getDerivedStateFromError(error: Error): State {
    return { err: { message: error.message, stack: error.stack } };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[CrashCatcher]", error, info);
  }
  render() {
    if (this.state.err) {
      return (
        <ErrorPanel err={this.state.err} onDismiss={() => this.setState({ err: null })} />
      );
    }
    return (
      <>
        {this.props.children}
        <GlobalErrorHost />
      </>
    );
  }
}
