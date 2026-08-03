// ============================================================================
// PLANÍCIE DE ARDEN — a primeira área externa fora do vilarejo/floresta.
//
// Ao contrário da floresta (grande e aberta), esta é um CORREDOR LINEAR: uma
// estrada de terra serpenteando para o NORTE entre campos abertos, apertada por
// escarpas nas laterais. A leitura é sempre "seguir a estrada", e o que dá a
// sensação de mundo grande são as CAMADAS DE HORIZONTE (as montanhas ao fundo,
// que se aproximam devagar conforme você anda — ver buildHorizon no Game).
//
// Ao sul, o portão volta p/ a floresta. Ao norte, o marco 'M' é a boca da
// trilha da MONTANHA (próxima área).
//
//  '.' campo (andável)      '=' estrada de terra (andável)
//  'r' pedra (bloqueia)     'b' arbusto (bloqueia)     'T' árvore (bloqueia)
//  'f' mato/samambaia (decoração no chão, andável)     'k' ossada (decoração)
//  'E' ponto de inimigo     'S' entrada (vindo da floresta)
//  'V' portão de volta à floresta      'M' marco da trilha da Montanha
//  '#' escarpa da borda (bloqueia)
//
// O mapa foi GERADO por script com validação de conectividade: a estrada nunca
// tem "pulo" na diagonal (quando muda de coluna, a linha ganha '==' ligando as
// duas) e o marco da montanha é comprovadamente alcançável a partir da entrada.
export const PLAINS: string[] = [
  "########.########",
  "########.########",
  "########M########",
  "#####...=...#####",
  "#####...=.b.#####",
  "###r....=....r###",
  "###.r.b.=...Tk###",
  "##..b...=......##",
  "##r.r..==..f...##",
  "##.b..==...T..b##",
  "##.Tk.==...E...##",
  "##..b..==....r.##",
  "##......=....k.##",
  "##T...r.=...rEr##",
  "##.f.f..==.rr..##",
  "##.f.....=...T.##",
  "##f.rrrb.=...kr##",
  "##.......=...r.##",
  "##..b....==....##",
  "##f.......=....##",
  "##.bE.....=....##",
  "##.ErE....==.bk##",
  "##fr.......=.rT##",
  "##........==...##",
  "##...bT...=..T.##",
  "##....T.b.=..f.##",
  "##........=...b##",
  "##....frf.=.b.r##",
  "##.f...T..=..E.##",
  "##k.......=..r.##",
  "##..Tfr..==..kf##",
  "##k..T...==..b.##",
  "##rr......=....##",
  "##.ETkb...=....##",
  "##b.TbT.T.=.b..##",
  "##..k...r.=...f##",
  "##.T.T.T..=....##",
  "##b..b...==.T..##",
  "###br.k.==....###",
  "###..b..=...bb###",
  "#####k..=...#####",
  "#####...S...#####",
  "########V########",
  "########.########",
];

export const PLAINS_ROWS = PLAINS.length;
export const PLAINS_COLS = PLAINS[0].length;

export type PlainsCell =
  | "grass" | "road" | "rock" | "bush" | "tree" | "foliage" | "bones"
  | "enemy" | "spawn" | "gate" | "mountain" | "edge";

export function plainsCell(col: number, row: number): PlainsCell {
  if (row < 0 || row >= PLAINS_ROWS || col < 0 || col >= PLAINS_COLS) return "edge";
  switch (PLAINS[row][col]) {
    case ".": return "grass";
    case "=": return "road";
    case "r": return "rock";
    case "b": return "bush";
    case "T": return "tree";
    case "f": return "foliage";
    case "k": return "bones";
    case "E": return "enemy";
    case "S": return "spawn";
    case "V": return "gate";
    case "M": return "mountain";
    default: return "edge";
  }
}

// pedra/arbusto/árvore/escarpa bloqueiam; o resto é caminhável
export function plainsWalkable(col: number, row: number): boolean {
  const k = plainsCell(col, row);
  return k !== "edge" && k !== "rock" && k !== "bush" && k !== "tree";
}

export function plainsFind(ch: string): { col: number; row: number } {
  for (let r = 0; r < PLAINS_ROWS; r++) {
    const c = PLAINS[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 8, row: PLAINS_ROWS - 3 };
}

export function plainsAll(ch: string): { col: number; row: number }[] {
  const out: { col: number; row: number }[] = [];
  for (let r = 0; r < PLAINS_ROWS; r++)
    for (let c = 0; c < PLAINS_COLS; c++)
      if (PLAINS[r][c] === ch) out.push({ col: c, row: r });
  return out;
}
