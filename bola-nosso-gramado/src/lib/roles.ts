// Sistema de posições refinadas + layouts de campo por formação.
// - Cada Player tem `roles?: Role[]` (1-2 posições específicas). Se faltar,
//   é derivado deterministicamente a partir do nome + posição broad.
// - Cada formação tem 11 SLOTS, cada slot com uma posição preferida (role)
//   + coordenadas (x,y) no campo (0-100). O simulador continua usando a
//   posição broad — os slots refinados são pura camada de UI/gameplay.

import type { Player, PlayerRole, Position } from "./gameData";
import type { FormationId } from "./formations";

export type Role = PlayerRole;

export const ROLE_LABEL: Record<Role, string> = {
  GOL: "Goleiro",
  LAT_D: "Lateral Direito",
  LAT_E: "Lateral Esquerdo",
  ZAG: "Zagueiro",
  VOL: "Volante",
  MEI: "Meio-campo",
  MEC: "Meia-atacante",
  PON_D: "Ponta Direita",
  PON_E: "Ponta Esquerda",
  CA: "Centroavante",
};

export const ROLE_SHORT: Record<Role, string> = {
  GOL: "GOL",
  LAT_D: "LD",
  LAT_E: "LE",
  ZAG: "ZAG",
  VOL: "VOL",
  MEI: "MEI",
  MEC: "MEC",
  PON_D: "PD",
  PON_E: "PE",
  CA: "CA",
};

export function roleToBroad(r: Role): Position {
  if (r === "GOL") return "GOL";
  if (r === "LAT_D" || r === "LAT_E" || r === "ZAG") return "ZAG";
  if (r === "VOL" || r === "MEI" || r === "MEC") return "MEI";
  return "ATA";
}

// Hash determinístico por nome — mesmo nome sempre gera os mesmos roles.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Deriva 1-2 roles a partir do nome + posição broad quando `roles` não vier.
export function deriveRoles(p: Player): Role[] {
  if (p.roles && p.roles.length) return p.roles;
  const h = hash(p.name);
  if (p.position === "GOL") return ["GOL"];
  if (p.position === "ZAG") {
    // 55% zagueiro puro, 22% lateral-D, 22% lateral-E; alguns ganham secundária.
    const m = h % 100;
    if (m < 22) {
      const second: Role[] = (h % 7 === 0) ? ["ZAG"] : [];
      return ["LAT_D", ...second];
    }
    if (m < 44) {
      const second: Role[] = (h % 7 === 0) ? ["ZAG"] : [];
      return ["LAT_E", ...second];
    }
    return ["ZAG"];
  }
  if (p.position === "MEI") {
    // 33% volante, 34% meia-central, 33% meia-atacante.
    const m = h % 3;
    if (m === 0) {
      const second: Role[] = (h % 5 === 0) ? ["MEI"] : [];
      return ["VOL", ...second];
    }
    if (m === 1) {
      const second: Role[] = (h % 6 === 0) ? ["VOL"] : (h % 6 === 1) ? ["MEC"] : [];
      return ["MEI", ...second];
    }
    const second: Role[] = (h % 5 === 0) ? ["MEI"] : (h % 7 === 0) ? ["PON_D"] : [];
    return ["MEC", ...second];
  }
  // ATA: 33% ponta-D, 33% ponta-E, 34% CA
  const m = h % 3;
  if (m === 0) {
    const second: Role[] = (h % 6 === 0) ? ["CA"] : [];
    return ["PON_D", ...second];
  }
  if (m === 1) {
    const second: Role[] = (h % 6 === 0) ? ["CA"] : [];
    return ["PON_E", ...second];
  }
  const second: Role[] = (h % 7 === 0) ? ["MEC"] : [];
  return ["CA", ...second];
}

export interface SlotDef {
  id: string;
  role: Role;
  pos: Position; // broad, derivado do role
  x: number;    // 0-100 (esquerda→direita)
  y: number;    // 0-100 (defesa→ataque)
  label: string; // curto
}

function mk(id: string, role: Role, x: number, y: number): SlotDef {
  return { id, role, pos: roleToBroad(role), x, y, label: ROLE_SHORT[role] };
}

// Layouts das 11 posições por formação. Manter caps = os de formations.ts.
export const FORMATION_LAYOUTS: Record<FormationId, SlotDef[]> = {
  "4-3-3": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 15, 26),
    mk("cb1", "ZAG", 37, 24),
    mk("cb2", "ZAG", 63, 24),
    mk("rb", "LAT_D", 85, 26),
    mk("cm1", "VOL", 50, 46),
    mk("cm2", "MEI", 28, 52),
    mk("cm3", "MEI", 72, 52),
    mk("lw", "PON_E", 18, 82),
    mk("st", "CA", 50, 90),
    mk("rw", "PON_D", 82, 82),
  ],
  "4-4-2": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 15, 26),
    mk("cb1", "ZAG", 37, 24),
    mk("cb2", "ZAG", 63, 24),
    mk("rb", "LAT_D", 85, 26),
    mk("lm", "MEI", 15, 55),
    mk("cm1", "VOL", 38, 52),
    mk("cm2", "MEC", 62, 52),
    mk("rm", "MEI", 85, 55),
    mk("st1", "CA", 38, 85),
    mk("st2", "CA", 62, 85),
  ],
  "4-2-3-1": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 15, 26),
    mk("cb1", "ZAG", 37, 24),
    mk("cb2", "ZAG", 63, 24),
    mk("rb", "LAT_D", 85, 26),
    mk("dm1", "VOL", 35, 45),
    mk("dm2", "VOL", 65, 45),
    mk("am", "MEC", 50, 68),
    mk("lw", "PON_E", 18, 72),
    mk("rw", "PON_D", 82, 72),
    mk("st", "CA", 50, 90),
  ],
  "3-5-2": [
    mk("gk", "GOL", 50, 6),
    mk("cb1", "ZAG", 25, 24),
    mk("cb2", "ZAG", 50, 22),
    mk("cb3", "ZAG", 75, 24),
    mk("lm", "LAT_E", 10, 55),
    mk("cm1", "VOL", 35, 50),
    mk("cm2", "MEI", 50, 55),
    mk("cm3", "MEC", 65, 50),
    mk("rm", "LAT_D", 90, 55),
    mk("st1", "CA", 38, 85),
    mk("st2", "CA", 62, 85),
  ],
  "3-4-3": [
    mk("gk", "GOL", 50, 6),
    mk("cb1", "ZAG", 25, 24),
    mk("cb2", "ZAG", 50, 22),
    mk("cb3", "ZAG", 75, 24),
    mk("lm", "LAT_E", 12, 52),
    mk("cm1", "VOL", 38, 50),
    mk("cm2", "MEI", 62, 50),
    mk("rm", "LAT_D", 88, 52),
    mk("lw", "PON_E", 18, 82),
    mk("st", "CA", 50, 90),
    mk("rw", "PON_D", 82, 82),
  ],
  "4-5-1": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 15, 26),
    mk("cb1", "ZAG", 37, 24),
    mk("cb2", "ZAG", 63, 24),
    mk("rb", "LAT_D", 85, 26),
    mk("lm", "PON_E", 12, 60),
    mk("cm1", "VOL", 35, 50),
    mk("cm2", "MEI", 50, 55),
    mk("cm3", "MEC", 65, 50),
    mk("rm", "PON_D", 88, 60),
    mk("st", "CA", 50, 88),
  ],
  "5-3-2": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 10, 28),
    mk("cb1", "ZAG", 30, 22),
    mk("cb2", "ZAG", 50, 20),
    mk("cb3", "ZAG", 70, 22),
    mk("rb", "LAT_D", 90, 28),
    mk("cm1", "VOL", 30, 52),
    mk("cm2", "MEI", 50, 55),
    mk("cm3", "MEC", 70, 52),
    mk("st1", "CA", 38, 85),
    mk("st2", "CA", 62, 85),
  ],
  "5-4-1": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 10, 28),
    mk("cb1", "ZAG", 30, 22),
    mk("cb2", "ZAG", 50, 20),
    mk("cb3", "ZAG", 70, 22),
    mk("rb", "LAT_D", 90, 28),
    mk("lm", "PON_E", 15, 60),
    mk("cm1", "VOL", 38, 52),
    mk("cm2", "MEI", 62, 52),
    mk("rm", "PON_D", 85, 60),
    mk("st", "CA", 50, 88),
  ],
  "4-1-4-1": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 15, 26),
    mk("cb1", "ZAG", 37, 24),
    mk("cb2", "ZAG", 63, 24),
    mk("rb", "LAT_D", 85, 26),
    mk("dm", "VOL", 50, 42),
    mk("lm", "PON_E", 12, 65),
    mk("cm1", "MEI", 38, 62),
    mk("cm2", "MEC", 62, 62),
    mk("rm", "PON_D", 88, 65),
    mk("st", "CA", 50, 88),
  ],
  "3-6-1": [
    mk("gk", "GOL", 50, 6),
    mk("cb1", "ZAG", 25, 24),
    mk("cb2", "ZAG", 50, 22),
    mk("cb3", "ZAG", 75, 24),
    mk("lm", "LAT_E", 8, 55),
    mk("cm1", "VOL", 32, 48),
    mk("cm2", "MEI", 42, 58),
    mk("cm3", "MEI", 58, 58),
    mk("cm4", "MEC", 68, 48),
    mk("rm", "LAT_D", 92, 55),
    mk("st", "CA", 50, 88),
  ],
  "3-3-4": [
    mk("gk", "GOL", 50, 6),
    mk("cb1", "ZAG", 25, 24),
    mk("cb2", "ZAG", 50, 22),
    mk("cb3", "ZAG", 75, 24),
    mk("dm",  "VOL", 50, 46),
    mk("cm1", "MEI", 30, 52),
    mk("cm2", "MEI", 70, 52),
    mk("lw",  "PON_E", 12, 78),
    mk("st1", "CA", 38, 90),
    mk("st2", "CA", 62, 90),
    mk("rw",  "PON_D", 88, 78),
  ],
  "4-3-2-1": [
    mk("gk", "GOL", 50, 6),
    mk("lb", "LAT_E", 15, 26),
    mk("cb1", "ZAG", 37, 24),
    mk("cb2", "ZAG", 63, 24),
    mk("rb", "LAT_D", 85, 26),
    mk("dm",  "VOL", 50, 42),
    mk("cm1", "MEI", 30, 50),
    mk("cm2", "MEI", 70, 50),
    mk("am1", "MEC", 36, 70),
    mk("am2", "MEC", 64, 70),
    mk("st",  "CA", 50, 90),
  ],
};

export function slotsForFormation(f: FormationId): SlotDef[] {
  return FORMATION_LAYOUTS[f] ?? FORMATION_LAYOUTS["4-3-3"];
}

// Um jogador só cabe em um slot se algum de seus roles refinados bate
// EXATAMENTE com o role do slot. Sem tolerância por posição broad —
// zagueiro puro não vira lateral, ponta não vira centroavante, etc.
export function fitsSlot(player: Player, slot: SlotDef): boolean {
  const rs = deriveRoles(player);
  return rs.includes(slot.role);
}



// "Encaixe perfeito" se algum role do jogador bate com o role específico do slot.
export function perfectFit(player: Player, slot: SlotDef): boolean {
  const rs = deriveRoles(player);
  return rs.includes(slot.role);
}

// Roles do jogador como texto curto ("PD · CA").
export function playerRolesLabel(p: Player): string {
  return deriveRoles(p).map((r) => ROLE_SHORT[r]).join(" · ");
}
