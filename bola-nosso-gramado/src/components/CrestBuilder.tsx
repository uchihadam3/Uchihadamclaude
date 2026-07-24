import { useState } from "react";
import { Crest, CREST_SHAPES, CREST_PATTERNS, CREST_SYMBOLS, CREST_COLORS, type CrestConfig } from "@/components/Crest";

const SHAPE_LABELS: Record<string, string> = {
  "shield": "Clássico",
  "round-shield": "Arredondado",
  "pointed-shield": "Ponta",
  "chevron-shield": "Chevron",
  "banner": "Bandeirão",
  "flag": "Flâmula",
  "rounded-square": "Quadrado",
  "pentagon": "Pentágono",
  "hexagon": "Hexágono",
  "hexagon-flat": "Hex. deitado",
  "octagon": "Octógono",
  "circle": "Círculo",
  "diamond": "Losango",
  "kite": "Papagaio",
  "star5": "Estrela",
  "gothic": "Gótico",
  "gonfalon": "Gonfalão",
  "heart": "Coração",
  "medal": "Medalha",
  "swiss": "Suíço",
  "teardrop": "Gota",
};

const PATTERN_LABELS: Record<string, string> = {
  "solid": "Sólido",
  "halves-v": "Meia vertical",
  "halves-h": "Meia horizontal",
  "stripes-v": "Listras verticais",
  "stripes-h": "Listras horizontais",
  "hoops-h": "Faixas grossas",
  "sash": "Faixa diagonal",
  "diagonal": "Corte diagonal",
  "tricolor-v": "Tricolor vertical",
  "tricolor-h": "Tricolor horizontal",
  "cross": "Cruz",
  "quartered": "Quartos",
  "checkers": "Xadrez",
  "chevrons": "Chevrons",
  "spots": "Bolinhas",
  "rings": "Anéis",
  "border": "Moldura",
  "gradient-v": "Degradê",
  "starburst": "Raios",
  "diagonal-stripes": "Diagonais",
};

const SYMBOL_LABELS: Record<string, string> = {
  "none": "Sem símbolo",
  "star": "Estrela",
  "lion": "Leão",
  "bird": "Águia",
  "wing": "Asas",
  "bolt": "Raio",
  "crown": "Coroa",
  "cross": "Cruz",
  "cross-malt": "Cruz de Malta",
  "rooster": "Galo",
  "anchor": "Âncora",
  "ball": "Bola",
  "palm": "Palmeira",
  "fleur": "Flor de Lis",
  "tower": "Torre",
  "eiffel": "Eiffel",
  "ship": "Navio",
  "devil": "Diabo",
  "sun": "Sol",
  "moon": "Lua",
  "flame": "Chama",
  "leaf": "Folha",
  "sword": "Espadas",
  "trident": "Tridente",
  "gem": "Diamante",
  "trophy": "Troféu",
  "gear": "Engrenagem",
  "mountain": "Montanha",
  "wave": "Ondas",
  "compass": "Bússola",
  "helmet": "Elmo",
  "wolf": "Lobo",
  "dragon": "Dragão",
  "skull": "Caveira",
  "heart-sym": "Coração",
};

function contrast(hex: string) {
  const c = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(c)) return "#ffffff";
  const r = parseInt(c.slice(0,2),16)/255;
  const g = parseInt(c.slice(2,4),16)/255;
  const b = parseInt(c.slice(4,6),16)/255;
  const lum = 0.2126*r + 0.7152*g + 0.0722*b;
  return lum > 0.58 ? "#0f172a" : "#ffffff";
}

export function defaultCrestConfig(): CrestConfig {
  const primary = CREST_COLORS[Math.floor(Math.random() * CREST_COLORS.length)];
  const rest = CREST_COLORS.filter((c) => c !== primary);
  const secondary = rest[Math.floor(Math.random() * rest.length)];
  const rest2 = rest.filter((c) => c !== secondary);
  const accent = rest2[Math.floor(Math.random() * rest2.length)];
  return {
    shape: CREST_SHAPES[Math.floor(Math.random() * CREST_SHAPES.length)],
    pattern: CREST_PATTERNS[Math.floor(Math.random() * CREST_PATTERNS.length)],
    primary, secondary, accent,
    symbol: CREST_SYMBOLS[Math.floor(Math.random() * CREST_SYMBOLS.length)],
    symbolColor: contrast(primary),
    monogramColor: contrast(primary),
  };
}

interface Props {
  teamName: string;
  initial?: CrestConfig | null;
  onCancel: () => void;
  onDone: (config: CrestConfig) => void;
}

type Step = 0 | 1 | 2 | 3;

const STEP_TITLES = ["Formato", "Cores", "Padrão", "Símbolo"];

export function CrestBuilder({ teamName, initial, onCancel, onDone }: Props) {
  const [config, setConfig] = useState<CrestConfig>(() => initial ?? defaultCrestConfig());
  const [step, setStep] = useState<Step>(0);

  const patch = (p: Partial<CrestConfig>) => setConfig((c) => ({ ...c, ...p }));

  const previewSize = 128;

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-4 py-6 pb-24">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onCancel} className="sticker-btn">← Cancelar</button>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Editor de brasão</div>
        <button
          onClick={() => setConfig(defaultCrestConfig())}
          className="sticker-btn sticker-btn-gold"
          title="Sortear tudo"
        >🎲 Aleatório</button>
      </div>

      {/* Preview */}
      <div className="mb-4 flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-secondary/60 to-secondary/20 p-6 card-glow">
        <Crest
          colors={[config.primary, config.secondary]}
          short={teamName.slice(0,3).toUpperCase() || "VOC"}
          name={teamName}
          size={previewSize}
          player
          config={config}
        />
        <div className="mt-2 font-display text-xl gold-text truncate max-w-full">{teamName}</div>
      </div>

      {/* Step indicator */}
      <div className="mb-3 grid grid-cols-4 gap-1.5">
        {STEP_TITLES.map((t, i) => (
          <button
            key={t}
            onClick={() => setStep(i as Step)}
            className={`rounded-lg px-2 py-2 text-[11px] font-semibold transition ${step === i ? "bg-primary text-primary-foreground" : "bg-secondary/40 text-muted-foreground hover:text-foreground"}`}
          >
            {i + 1}. {t}
          </button>
        ))}
      </div>

      {/* Step body */}
      <div className="rounded-2xl bg-card p-3">
        {step === 0 && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {CREST_SHAPES.map((s) => (
              <button
                key={s}
                onClick={() => patch({ shape: s })}
                className={`flex flex-col items-center gap-1 rounded-xl p-2 transition ${config.shape === s ? "bg-primary/20 ring-2 ring-primary" : "bg-secondary/40 hover:bg-secondary/70"}`}
              >
                <Crest colors={[config.primary, config.secondary]} short="VOC" name={teamName} size={54} player config={{ ...config, shape: s }} />
                <span className="text-[9px] text-muted-foreground">{SHAPE_LABELS[s]}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            {(["primary","secondary","accent"] as const).map((key) => (
              <div key={key}>
                <div className="mb-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {key === "primary" ? "Cor principal" : key === "secondary" ? "Cor secundária" : "Cor de acento (símbolo/monograma)"}
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {CREST_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        const next: Partial<CrestConfig> = { [key]: c } as Partial<CrestConfig>;
                        if (key === "primary") {
                          next.monogramColor = contrast(c);
                          if (config.symbol === "none") next.symbolColor = contrast(c);
                        }
                        if (key === "accent") next.symbolColor = c;
                        patch(next);
                      }}
                      className={`h-8 w-full rounded-md ring-2 ring-transparent transition ${config[key] === c ? "ring-primary scale-110" : "hover:scale-105"}`}
                      style={{ background: c, borderColor: c === "#ffffff" ? "#333" : undefined, borderWidth: c === "#ffffff" ? 1 : 0, borderStyle: "solid" }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {CREST_PATTERNS.map((p) => (
              <button
                key={p}
                onClick={() => patch({ pattern: p })}
                className={`flex flex-col items-center gap-1 rounded-xl p-2 transition ${config.pattern === p ? "bg-primary/20 ring-2 ring-primary" : "bg-secondary/40 hover:bg-secondary/70"}`}
              >
                <Crest colors={[config.primary, config.secondary]} short="VOC" name={teamName} size={54} player config={{ ...config, pattern: p }} />
                <span className="text-[9px] text-muted-foreground text-center">{PATTERN_LABELS[p]}</span>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {CREST_SYMBOLS.map((sy) => (
                <button
                  key={sy}
                  onClick={() => patch({ symbol: sy })}
                  className={`flex flex-col items-center gap-1 rounded-xl p-2 transition ${config.symbol === sy ? "bg-primary/20 ring-2 ring-primary" : "bg-secondary/40 hover:bg-secondary/70"}`}
                >
                  <Crest colors={[config.primary, config.secondary]} short="VOC" name={teamName} size={48} player config={{ ...config, symbol: sy }} />
                  <span className="text-[9px] text-muted-foreground text-center">{SYMBOL_LABELS[sy]}</span>
                </button>
              ))}
            </div>
            {config.symbol !== "none" && (
              <div>
                <div className="mb-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">Cor do símbolo</div>
                <div className="grid grid-cols-8 gap-1.5">
                  {CREST_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => patch({ symbolColor: c })}
                      className={`h-8 w-full rounded-md ring-2 ring-transparent transition ${config.symbolColor === c ? "ring-primary scale-110" : "hover:scale-105"}`}
                      style={{ background: c, borderColor: c === "#ffffff" ? "#333" : undefined, borderWidth: c === "#ffffff" ? 1 : 0, borderStyle: "solid" }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}
          disabled={step === 0}
          className="sticker-btn"
        >← Voltar</button>
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => ((s + 1) as Step))}
            className="sticker-btn sticker-btn-emerald"
          >Próximo →</button>
        ) : (
          <button
            onClick={() => onDone(config)}
            className="sticker-btn sticker-btn-gold"
          >✓ Pronto</button>
        )}
      </div>
    </div>
  );
}
