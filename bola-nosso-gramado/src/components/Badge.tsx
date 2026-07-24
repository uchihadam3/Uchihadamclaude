import type { FormationId, TacticStyle } from "@/lib/formations";
import type { BadgeDef, BadgeKind } from "@/lib/badges";

import bolasParadasBestAsset from "@/assets/badges/bolas-paradas_best.png.asset.json";
import bolasParadasMidAsset from "@/assets/badges/bolas-paradas_mid.png.asset.json";
import bolasParadasWorstAsset from "@/assets/badges/bolas-paradas_worst.png.asset.json";
import cadenciadoBestAsset from "@/assets/badges/cadenciado_best.png.asset.json";
import cadenciadoMidAsset from "@/assets/badges/cadenciado_mid.png.asset.json";
import cadenciadoWorstAsset from "@/assets/badges/cadenciado_worst.png.asset.json";
import contraAtaqueBestAsset from "@/assets/badges/contra-ataque_best.png.asset.json";
import contraAtaqueMidAsset from "@/assets/badges/contra-ataque_mid.png.asset.json";
import contraAtaqueWorstAsset from "@/assets/badges/contra-ataque_worst.png.asset.json";
import defensivoBestAsset from "@/assets/badges/defensivo_best.png.asset.json";
import defensivoMidAsset from "@/assets/badges/defensivo_mid.png.asset.json";
import defensivoWorstAsset from "@/assets/badges/defensivo_worst.png.asset.json";
import equilibradoBestAsset from "@/assets/badges/equilibrado_best.png.asset.json";
import equilibradoMidAsset from "@/assets/badges/equilibrado_mid.png.asset.json";
import equilibradoWorstAsset from "@/assets/badges/equilibrado_worst.png.asset.json";
import ofensivoBestAsset from "@/assets/badges/ofensivo_best.png.asset.json";
import ofensivoMidAsset from "@/assets/badges/ofensivo_mid.png.asset.json";
import ofensivoWorstAsset from "@/assets/badges/ofensivo_worst.png.asset.json";
import posseBestAsset from "@/assets/badges/posse_best.png.asset.json";
import posseMidAsset from "@/assets/badges/posse_mid.png.asset.json";
import posseWorstAsset from "@/assets/badges/posse_worst.png.asset.json";
import pressaoAltaBestAsset from "@/assets/badges/pressao-alta_best.png.asset.json";
import pressaoAltaMidAsset from "@/assets/badges/pressao-alta_mid.png.asset.json";
import pressaoAltaWorstAsset from "@/assets/badges/pressao-alta_worst.png.asset.json";
import retrancaBestAsset from "@/assets/badges/retranca_best.png.asset.json";
import retrancaMidAsset from "@/assets/badges/retranca_mid.png";
import retrancaWorstAsset from "@/assets/badges/retranca_worst.png";

interface Props {
  badge?: BadgeDef;
  style?: TacticStyle;
  formation?: FormationId;
  kind?: BadgeKind;
  size?: number;
  unlocked?: boolean;
  name?: string;
}

type BadgeAsset = string | { url: string };

const BADGE_ART: Record<string, BadgeAsset> = {
  "bolas-paradas_best": bolasParadasBestAsset,
  "bolas-paradas_mid": bolasParadasMidAsset,
  "bolas-paradas_worst": bolasParadasWorstAsset,
  "cadenciado_best": cadenciadoBestAsset,
  "cadenciado_mid": cadenciadoMidAsset,
  "cadenciado_worst": cadenciadoWorstAsset,
  "contra-ataque_best": contraAtaqueBestAsset,
  "contra-ataque_mid": contraAtaqueMidAsset,
  "contra-ataque_worst": contraAtaqueWorstAsset,
  "defensivo_best": defensivoBestAsset,
  "defensivo_mid": defensivoMidAsset,
  "defensivo_worst": defensivoWorstAsset,
  "equilibrado_best": equilibradoBestAsset,
  "equilibrado_mid": equilibradoMidAsset,
  "equilibrado_worst": equilibradoWorstAsset,
  "ofensivo_best": ofensivoBestAsset,
  "ofensivo_mid": ofensivoMidAsset,
  "ofensivo_worst": ofensivoWorstAsset,
  "posse_best": posseBestAsset,
  "posse_mid": posseMidAsset,
  "posse_worst": posseWorstAsset,
  "pressao-alta_best": pressaoAltaBestAsset,
  "pressao-alta_mid": pressaoAltaMidAsset,
  "pressao-alta_worst": pressaoAltaWorstAsset,
  "retranca_best": retrancaBestAsset,
  "retranca_mid": retrancaMidAsset,
  "retranca_worst": retrancaWorstAsset,
};

export function Badge({ badge, style, formation, kind, size = 96, unlocked = true, name }: Props) {
  const artKey = badge?.key ?? (style && kind ? `${style}_${kind}` : undefined);
  const asset = artKey ? BADGE_ART[artKey] : undefined;
  const src = typeof asset === "string" ? asset : asset?.url;
  const alt = name ?? badge?.name ?? artKey ?? "Medalha";

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
        className="select-none"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: unlocked ? "drop-shadow(0 10px 18px rgba(0,0,0,0.28))" : "grayscale(1) saturate(0.15) brightness(0.7) opacity(0.7)",
          transform: unlocked ? "translateZ(0)" : undefined,
        }}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="grid place-items-center rounded-full border border-border bg-secondary/60 text-center text-[10px] font-semibold text-muted-foreground"
      aria-label={alt}
    >
      {badge?.name ?? formation ?? style ?? "Medalha"}
    </div>
  );
}
