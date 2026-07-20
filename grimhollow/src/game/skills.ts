// Skill Tree (Habilidades) — 3 ramos por classe, mix de ATIVAS e PASSIVAS, com RANKS.
// Ativas têm arte própria (folhas recortadas). Passivas usam ícones GENÉRICOS por
// tipo de status (arte genérica futura) — por enquanto um placeholder por código.
// Por ora só o Guerreiro está preenchido; as demais entram conforme a arte chega.

// mapa de ícones recortados das folhas de ativas (../assets/ui/skills/*.png)
const ICONS = import.meta.glob("../assets/ui/skills/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const ic = (name: string): string | undefined =>
  ICONS[`../assets/ui/skills/${name}.png`];

export type SkillKind = "active" | "passive";

// tipos de status das passivas (definem símbolo + cor do placeholder e, no futuro,
// qual ícone genérico usar + o efeito real no combate)
export type StatKey =
  | "dmg" | "mdmg" | "life" | "mana" | "def" | "mres"
  | "prec" | "crit" | "critd" | "eva" | "aspd" | "leech"
  | "poison" | "regen" | "cdr" | "block" | "rage";

export const STAT_META: Record<StatKey, { sym: string; color: string; label: string }> = {
  dmg:   { sym: "⚔", color: "#d9694c", label: "Dano Físico" },
  mdmg:  { sym: "✦", color: "#8a6cff", label: "Dano Mágico" },
  life:  { sym: "❤", color: "#e0564c", label: "Vida" },
  mana:  { sym: "◆", color: "#4f9be0", label: "Mana" },
  def:   { sym: "🛡", color: "#9fb0c4", label: "Defesa" },
  mres:  { sym: "◈", color: "#7fa0d8", label: "Resist. Mágica" },
  prec:  { sym: "◎", color: "#d8c86a", label: "Precisão" },
  crit:  { sym: "✸", color: "#e0b84c", label: "Chance Crítica" },
  critd: { sym: "✷", color: "#e08a3c", label: "Dano Crítico" },
  eva:   { sym: "≈", color: "#9fd8c0", label: "Evasão" },
  aspd:  { sym: "⚡", color: "#e6d24a", label: "Vel. de Ataque" },
  leech: { sym: "❦", color: "#c0463c", label: "Roubo de Vida" },
  poison:{ sym: "☣", color: "#7fc04c", label: "Veneno" },
  regen: { sym: "✚", color: "#7fd08a", label: "Regeneração" },
  cdr:   { sym: "⧗", color: "#c0a0e0", label: "Redução de Recarga" },
  block: { sym: "⬡", color: "#b8c0cc", label: "Bloqueio" },
  rage:  { sym: "🔥", color: "#e06a3c", label: "Fúria" },
};

export interface Skill {
  id: string;
  name: string;
  kind: SkillKind;
  desc: string;
  maxRank: number;
  icon?: string; // ativas: arte recortada
  stat?: StatKey; // passivas: tipo de status
}

export interface Branch {
  id: string;
  name: string;
  color: string; // cor de destaque do ramo (linhas/realces)
  // nós em ordem (topo→baixo); cada nó exige o ANTERIOR (rank ≥ 1) pra desbloquear
  skills: Skill[];
}

export interface ClassTree {
  classId: string;
  branches: Branch[];
  bg?: string; // arte de fundo da árvore (estilo PoE) — futura
}

const A = (id: string, name: string, iconName: string, desc: string, maxRank = 1): Skill => ({
  id, name, kind: "active", desc, maxRank, icon: ic(iconName),
});
const P = (id: string, name: string, stat: StatKey, desc: string, maxRank = 5): Skill => ({
  id, name, kind: "passive", desc, maxRank, stat,
});

// ----------------------------------------------------------------- GUERREIRO
const GUERREIRO: ClassTree = {
  classId: "guerreiro",
  branches: [
    {
      id: "armas", name: "Armas", color: "#d9a34a",
      skills: [
        A("g_golpe_poderoso", "Golpe Poderoso", "sk_guerreiro_01", "Um golpe forte que causa dano bruto no alvo.", 5),
        P("g_afiacao", "Afiação", "dmg", "+3% Dano Físico por rank."),
        A("g_investida", "Investida", "sk_guerreiro_02", "Avança até o inimigo e o atordoa por um instante.", 3),
        P("g_precisao", "Mira de Guerra", "prec", "+2 Precisão por rank."),
        A("g_golpe_giratorio", "Golpe Giratório", "sk_guerreiro_03", "Gira a arma acertando todos ao redor.", 5),
        P("g_gume", "Gume Cruel", "crit", "+2% Chance Crítica por rank."),
        A("g_quebra_armadura", "Quebra-Armadura", "sk_guerreiro_04", "Reduz a defesa do alvo por alguns segundos.", 3),
        P("g_brutalidade", "Brutalidade", "critd", "+8% Dano Crítico por rank."),
        A("g_decapitar", "Decapitar", "sk_guerreiro_05", "Executa alvos com pouca vida, dano massivo.", 3),
      ],
    },
    {
      id: "baluarte", name: "Baluarte", color: "#9fb0c4",
      skills: [
        P("g_pele_ferro", "Pele de Ferro", "def", "+3 Defesa por rank."),
        A("g_provocar", "Provocar", "sk_guerreiro_06", "Força o inimigo a atacar você (aggro).", 3),
        P("g_vigor", "Vigor", "life", "+5% Vida por rank."),
        A("g_muro_escudo", "Muro de Escudo", "sk_guerreiro_07", "Aumenta muito o bloqueio por um tempo.", 5),
        P("g_fortaleza", "Fortaleza", "mres", "+2 Resist. Mágica por rank."),
        A("g_reflexao", "Reflexão", "sk_guerreiro_08", "Ao bloquear, reflete parte do dano.", 3),
        P("g_guarda", "Guarda Firme", "block", "+3% Bloqueio por rank."),
        A("g_aco_absoluto", "Aço Absoluto", "sk_guerreiro_09", "Fica imune a dano por um breve instante.", 3),
        A("g_ultimo_suspiro", "Último Suspiro", "sk_guerreiro_10", "Cura ao chegar perto da morte (com recarga).", 3),
      ],
    },
    {
      id: "furia", name: "Fúria", color: "#e0623c",
      skills: [
        P("g_furia_batalha", "Fúria de Batalha", "rage", "+4% Dano quanto menor a Vida (por rank)."),
        A("g_grito_guerra", "Grito de Guerra", "sk_guerreiro_11", "Grito que aumenta o dano do herói.", 5),
        P("g_sede_sangue", "Sede de Sangue", "leech", "+2% Roubo de Vida por rank."),
        A("g_frenesi", "Frenesi", "sk_guerreiro_12", "Aumenta a velocidade de ataque temporariamente.", 5),
        P("g_adrenalina", "Adrenalina", "aspd", "+3% Vel. de Ataque por rank."),
        A("g_investida_brutal", "Investida Brutal", "sk_guerreiro_13", "Avança causando dano e empurrando o alvo.", 3),
        P("g_folego", "Fôlego", "regen", "+1% Vida regenerada por rank."),
        A("g_terremoto", "Terremoto", "sk_guerreiro_14", "Pisada que atordoa e fere em área.", 3),
        A("g_golpe_final", "Golpe Final", "sk_guerreiro_15", "Golpe devastador de recarga longa.", 3),
      ],
    },
  ],
};

export const SKILL_TREES: Record<string, ClassTree | undefined> = {
  guerreiro: GUERREIRO,
  ladino: undefined,
  mago: undefined,
  clerigo: undefined,
};
