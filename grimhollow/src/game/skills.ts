// Skill Tree (Habilidades) — 3 ramos por classe, mix de ATIVAS e PASSIVAS, com RANKS.
// Ativas têm arte própria (folhas recortadas). Passivas usam ícones GENÉRICOS por
// tipo de status (arte genérica futura) — por enquanto um placeholder por código.
// As 4 classes já estão preenchidas (Guerreiro, Ladino, Mago, Clérigo), com combate
// (SKILL_COMBAT) e passivas ligadas aos atributos/combate. Faltam só: FX visual de
// algumas ativas (Clérigo) e 2 passivas ainda inertes (aspd, poison).

// fundos das árvores (estilo PoE) — um por classe
import bgGuerreiro from "../assets/ui/skills/bg_guerreiro.jpg";
import bgLadino from "../assets/ui/skills/bg_ladino.jpg";
import bgMago from "../assets/ui/skills/bg_mago.jpg";
import bgClerigo from "../assets/ui/skills/bg_clerigo.jpg";

// mapa de ícones recortados das folhas de ativas (../assets/ui/skills/*.png)
const ICONS = import.meta.glob("../assets/ui/skills/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const ic = (name: string): string | undefined =>
  ICONS[`../assets/ui/skills/${name}.png`];

// ícones GENÉRICOS das passivas (folha única sk_passive_01..16) mapeados por tipo de
// status — na MESMA ordem da folha. "rage" reaproveita o emblema de chama (mdmg).
const PASSIVE_ORDER: StatKey[] = [
  "dmg", "mdmg", "life", "mana", "def", "mres", "prec", "crit",
  "critd", "eva", "aspd", "leech", "poison", "regen", "cdr", "block",
];
export const PASSIVE_ICON: Partial<Record<StatKey, string>> = {};
PASSIVE_ORDER.forEach((k, i) => {
  const url = ic(`sk_passive_${String(i + 1).padStart(2, "0")}`);
  if (url) PASSIVE_ICON[k] = url;
});
PASSIVE_ICON.rage = ic("sk_passive_02"); // Fúria usa o emblema de chama

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

// magnitude POR RANK de cada passiva. Os valores em % são aplicados como
// frações (0.03 = +3%); os planos como inteiros. Só um subconjunto afeta os
// atributos exibidos hoje; o resto fica reservado p/ a barra de ação/skills.
export const PASSIVE_VALUE: Record<StatKey, number> = {
  dmg: 0.03, mdmg: 0.03, life: 0.05, mana: 0.05, def: 2, mres: 2,
  prec: 2, crit: 0.02, critd: 0.06, eva: 0.02, aspd: 0.03, leech: 0.02,
  poison: 0.04, regen: 1, cdr: 0.03, block: 0.02, rage: 0.04,
};

// soma os pontos de cada passiva a partir dos ranks alocados (rank × valor).
export function passiveTotals(
  ranks: Record<string, number>,
): Partial<Record<StatKey, number>> {
  const out: Partial<Record<StatKey, number>> = {};
  for (const tree of Object.values(SKILL_TREES)) {
    if (!tree) continue;
    for (const b of tree.branches)
      for (const sk of b.skills) {
        const rk = ranks[sk.id] || 0;
        if (rk <= 0 || sk.kind !== "passive" || !sk.stat) continue;
        out[sk.stat] = (out[sk.stat] || 0) + rk * PASSIVE_VALUE[sk.stat];
      }
  }
  return out;
}

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
  bg: bgGuerreiro,
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

// -------------------------------------------------------------------- LADINO
const LADINO: ClassTree = {
  classId: "ladino",
  bg: bgLadino,
  branches: [
    {
      id: "assassino", name: "Assassino", color: "#d94c6a",
      skills: [
        A("l_apunhalar", "Apunhalar", "sk_ladino_01", "Golpe pelas costas com dano crítico garantido.", 5),
        P("l_precisao_letal", "Precisão Letal", "crit", "+2% Chance Crítica por rank."),
        A("l_rajada_laminas", "Rajada de Lâminas", "sk_ladino_02", "Vários golpes rápidos em sequência.", 5),
        P("l_execucao", "Execução", "critd", "+8% Dano Crítico por rank."),
        A("l_golpe_sombras", "Golpe nas Sombras", "sk_ladino_03", "Teleporta atrás do alvo e ataca.", 3),
        P("l_ponto_fraco", "Ponto Fraco", "dmg", "+3% Dano em alvos com vida cheia (por rank)."),
        A("l_estocada", "Estocada Perfurante", "sk_ladino_04", "Estocada que ignora parte da defesa.", 3),
        A("l_execucao_a", "Golpe Mortal", "sk_ladino_05", "Executa alvos com pouca vida.", 3),
      ],
    },
    {
      id: "sombra", name: "Sombra", color: "#7fb08a",
      skills: [
        P("l_reflexos", "Reflexos", "eva", "+2% Evasão por rank."),
        A("l_passo_sombrio", "Passo Sombrio", "sk_ladino_06", "Esquiva rápida reposicionando o herói.", 3),
        P("l_lamina_env", "Lâmina Envenenada", "poison", "+3% Dano de Veneno por rank."),
        A("l_bomba_fumaca", "Bomba de Fumaça", "sk_ladino_07", "Solta fumaça e aumenta a evasão.", 3),
        P("l_camuflagem", "Camuflagem", "eva", "+2% Evasão ao ficar parado (por rank)."),
        A("l_nuvem_toxica", "Nuvem Tóxica", "sk_ladino_08", "Nuvem venenosa que fere em área.", 5),
        A("l_desaparecer", "Desaparecer", "sk_ladino_09", "Some por um instante e zera a ameaça.", 3),
        A("l_toxina", "Toxina", "sk_ladino_10", "Aplica um veneno forte no alvo.", 5),
      ],
    },
    {
      id: "precisao", name: "Precisão", color: "#d8c86a",
      skills: [
        P("l_agilidade", "Agilidade", "aspd", "+3% Vel. de Ataque por rank."),
        A("l_rajada_dupla", "Rajada Dupla", "sk_ladino_11", "Dois golpes rápidos num só toque.", 5),
        P("l_maos_rapidas", "Mãos Rápidas", "cdr", "−2% Recarga por rank."),
        A("l_arremesso", "Arremesso de Adaga", "sk_ladino_12", "Lança uma adaga à distância.", 5),
        P("l_passos_leves", "Passos Leves", "eva", "+2% Evasão ao se mover (por rank)."),
        A("l_contra_ataque", "Contra-Ataque", "sk_ladino_13", "Revida ao esquivar de um golpe.", 3),
        P("l_olhar", "Olhar Aguçado", "prec", "+2 Precisão por rank."),
        A("l_danca_laminas", "Dança das Lâminas", "sk_ladino_14", "Gira acertando vários alvos ao redor.", 5),
        A("l_marca_mortal", "Marca Mortal", "sk_ladino_15", "Marca o alvo: ele recebe mais dano.", 3),
      ],
    },
  ],
};

// ---------------------------------------------------------------------- MAGO
const MAGO: ClassTree = {
  classId: "mago",
  bg: bgMago,
  branches: [
    {
      id: "chamas", name: "Chamas", color: "#e0672c",
      skills: [
        A("m_bola_fogo", "Bola de Fogo", "sk_mago_01", "Lança um projétil flamejante no alvo.", 5),
        P("m_piromania", "Piromania", "mdmg", "+3% Dano de Fogo por rank."),
        A("m_explosao_fogo", "Explosão de Fogo", "sk_mago_02", "Explosão que fere em área.", 5),
        P("m_combustao", "Combustão", "crit", "+2% chance de magia crítica por rank."),
        A("m_meteoro", "Meteoro", "sk_mago_03", "Invoca um meteoro devastador em área.", 3),
        P("m_chama_persist", "Chama Persistente", "poison", "+3% Dano de queimadura por rank."),
        A("m_muralha_fogo", "Muralha de Fogo", "sk_mago_04", "Cria uma zona de fogo contínua.", 3),
        A("m_imolacao", "Imolação", "sk_mago_05", "Aura ardente que queima inimigos próximos.", 5),
      ],
    },
    {
      id: "gelo_arcano", name: "Gelo & Arcano", color: "#4f9be0",
      skills: [
        P("m_frieza", "Frieza", "mres", "+2 Resist. Mágica por rank."),
        A("m_nova_gelo", "Nova de Gelo", "sk_mago_06", "Congela os inimigos ao redor.", 5),
        P("m_foco_arcano", "Foco Arcano", "cdr", "−2% Recarga por rank."),
        A("m_lanca_gelo", "Lança de Gelo", "sk_mago_07", "Estilhaço de gelo que perfura.", 5),
        P("m_barreira", "Barreira", "def", "+2 Defesa por rank."),
        A("m_escudo_arcano", "Escudo Arcano", "sk_mago_08", "Escudo que absorve dano por um tempo.", 5),
        A("m_teleporte", "Teleporte", "sk_mago_09", "Reposiciona instantaneamente.", 3),
        A("m_prisao_gelo", "Prisão de Gelo", "sk_mago_10", "Prende o alvo num bloco de gelo.", 3),
      ],
    },
    {
      id: "tempestade", name: "Tempestade", color: "#9a6cff",
      skills: [
        A("m_raio_arcano", "Raio Arcano", "sk_mago_11", "Raio que atinge o alvo em linha.", 5),
        P("m_conducao", "Condução", "mdmg", "+3% Dano de Raio por rank."),
        A("m_corrente", "Corrente", "sk_mago_12", "Raio que salta entre vários inimigos.", 5),
        P("m_estatica", "Estática", "crit", "+2% chance de atordoar por rank."),
        A("m_tempestade", "Tempestade", "sk_mago_13", "Tempestade que fere em área continuamente.", 3),
        P("m_energia", "Energia", "mana", "+5% Mana por rank."),
        A("m_descarga", "Descarga", "sk_mago_14", "Explosão de energia instantânea.", 3),
        A("m_nova_arcana", "Nova Arcana", "sk_mago_15", "Nova arcana que arrasa tudo em volta.", 3),
      ],
    },
  ],
};

// ------------------------------------------------------------------- CLÉRIGO
const CLERIGO: ClassTree = {
  classId: "clerigo",
  bg: bgClerigo,
  branches: [
    {
      id: "luz", name: "Luz", color: "#e6d38a",
      skills: [
        A("c_cura", "Cura", "sk_clerigo_01", "Restaura vida do herói.", 5),
        P("c_fe", "Fé", "regen", "+3% Poder de Cura por rank."),
        A("c_cura_area", "Cura em Área", "sk_clerigo_02", "Cura em volta do herói.", 5),
        P("c_graca", "Graça", "mana", "+4% Regeneração de Mana por rank."),
        A("c_bencao", "Bênção", "sk_clerigo_03", "Abençoa o herói, aumentando atributos.", 3),
        P("c_vigor_divino", "Vigor Divino", "life", "+4% Vida por rank."),
        A("c_aura_protecao", "Aura de Proteção", "sk_clerigo_04", "Reduz o dano recebido por um tempo.", 3),
        A("c_renovacao", "Renovação", "sk_clerigo_05", "Cura contínua ao longo do tempo.", 5),
      ],
    },
    {
      id: "julgamento", name: "Julgamento", color: "#e0a63c",
      skills: [
        A("c_martelo_sagrado", "Martelo Sagrado", "sk_clerigo_06", "Golpe de dano sagrado no alvo.", 5),
        P("c_zelo", "Zelo", "mdmg", "+3% Dano Sagrado por rank."),
        A("c_punicao", "Punição", "sk_clerigo_07", "Fere e reduz a cura do alvo.", 5),
        P("c_conviccao", "Convicção", "dmg", "+3% Dano com a vida cheia (por rank)."),
        A("c_luz_radiante", "Luz Radiante", "sk_clerigo_08", "Explosão de luz que fere em área.", 5),
        P("c_fervor", "Fervor", "aspd", "+3% Vel. de conjuração por rank."),
        A("c_selo_sagrado", "Selo Sagrado", "sk_clerigo_09", "Selo que explode após alguns segundos.", 3),
        A("c_condenacao", "Condenação", "sk_clerigo_10", "Pilar de luz sagrada de grande dano.", 3),
      ],
    },
    {
      id: "fe", name: "Fé", color: "#cbb8e0",
      skills: [
        P("c_devocao", "Devoção", "mres", "+2 Resist. Mágica por rank."),
        A("c_escudo_divino", "Escudo Divino", "sk_clerigo_11", "Fica imune a dano por um breve instante.", 3),
        P("c_perseveranca", "Perseverança", "regen", "+1% Vida regenerada por rank."),
        A("c_repreensao", "Repreensão", "sk_clerigo_12", "Clarão que atordoa os inimigos.", 3),
        P("c_martir", "Mártir", "leech", "+2% do dano causado vira cura (por rank)."),
        A("c_intervencao", "Intervenção", "sk_clerigo_13", "Cura forte + escudo instantâneo.", 3),
        A("c_ressurreicao", "Ressurreição", "sk_clerigo_14", "Revive automaticamente uma vez (recarga longa).", 1),
        A("c_aura_fe", "Aura de Fé", "sk_clerigo_15", "Aura que fortalece o herói continuamente.", 5),
      ],
    },
  ],
};

export const SKILL_TREES: Record<string, ClassTree | undefined> = {
  guerreiro: GUERREIRO,
  ladino: LADINO,
  mago: MAGO,
  clerigo: CLERIGO,
};

// ------------------------------------------------------- COMBATE (ativas)
// Cada ativa tem um perfil de combate: quem recebe, alcance, efeito e custo.
//  - melee  → só ativa "colado" no alvo (distância 1 célula)
//  - ranged → ativa dentro do alcance (em células)
//  - heal/buff → sempre no PRÓPRIO herói (self)
export type SkillEffect = "dmg" | "heal" | "buff";
export interface SkillCombat {
  target: "enemy" | "self";
  melee: boolean;
  range: number; // alcance em células (melee usa 1)
  effect: SkillEffect;
  magic: boolean; // dano mágico/sagrado (escala com mdmg) vs físico (dmg)
  power: number; // base de dano/cura (o rank aumenta)
  mana: number; // custo de mana
  cd: number; // recarga (ms)
  atkMul?: number; // buff: multiplicador de dano temporário
  defReduc?: number; // buff: redução do dano recebido (0..1) temporária
  dur?: number; // buff: duração (ms)
}
// construtores compactos
const mDmg = (power: number, mana: number, cd: number): SkillCombat =>
  ({ target: "enemy", melee: true, range: 1, effect: "dmg", magic: false, power, mana, cd });
const rDmg = (power: number, range: number, mana: number, cd: number, magic = true): SkillCombat =>
  ({ target: "enemy", melee: false, range, effect: "dmg", magic, power, mana, cd });
const heal = (power: number, mana: number, cd: number): SkillCombat =>
  ({ target: "self", melee: false, range: 0, effect: "heal", magic: true, power, mana, cd });
const buff = (o: { atkMul?: number; defReduc?: number; dur: number; mana: number; cd: number }): SkillCombat =>
  ({ target: "self", melee: false, range: 0, effect: "buff", magic: false, power: 0,
     mana: o.mana, cd: o.cd, atkMul: o.atkMul, defReduc: o.defReduc, dur: o.dur });

export const SKILL_COMBAT: Record<string, SkillCombat> = {
  // ---- Guerreiro (físico corpo-a-corpo; alguns buffs/cura) ----
  g_golpe_poderoso: mDmg(16, 12, 4000),
  g_investida: mDmg(12, 10, 6000),
  g_golpe_giratorio: mDmg(16, 14, 6000),
  g_quebra_armadura: mDmg(12, 10, 7000),
  g_decapitar: mDmg(26, 18, 10000),
  g_provocar: buff({ defReduc: 0.25, dur: 6000, mana: 8, cd: 10000 }),
  g_muro_escudo: buff({ defReduc: 0.5, dur: 6000, mana: 14, cd: 14000 }),
  g_reflexao: buff({ defReduc: 0.3, dur: 6000, mana: 12, cd: 12000 }),
  g_aco_absoluto: buff({ defReduc: 0.9, dur: 3000, mana: 20, cd: 20000 }),
  g_ultimo_suspiro: heal(90, 20, 16000),
  g_grito_guerra: buff({ atkMul: 1.5, dur: 8000, mana: 14, cd: 14000 }),
  g_frenesi: buff({ atkMul: 1.35, dur: 8000, mana: 12, cd: 12000 }),
  g_investida_brutal: mDmg(18, 14, 8000),
  g_terremoto: mDmg(24, 18, 11000),
  g_golpe_final: mDmg(40, 30, 18000),
  // ---- Ladino (corpo-a-corpo; arremesso à distância; buffs) ----
  l_apunhalar: mDmg(18, 12, 4000),
  l_rajada_laminas: mDmg(16, 14, 6000),
  l_golpe_sombras: mDmg(18, 14, 7000),
  l_estocada: mDmg(14, 10, 6000),
  l_execucao_a: mDmg(26, 18, 10000),
  l_passo_sombrio: buff({ defReduc: 0.4, dur: 4000, mana: 8, cd: 9000 }),
  l_bomba_fumaca: buff({ defReduc: 0.5, dur: 5000, mana: 12, cd: 12000 }),
  l_nuvem_toxica: rDmg(12, 3, 14, 8000, false),
  l_desaparecer: buff({ defReduc: 0.8, dur: 2500, mana: 16, cd: 16000 }),
  l_toxina: rDmg(10, 2, 10, 7000, false),
  l_rajada_dupla: mDmg(14, 10, 4000),
  l_arremesso: rDmg(16, 4, 12, 5000, false),
  l_contra_ataque: buff({ atkMul: 1.3, dur: 6000, mana: 10, cd: 10000 }),
  l_danca_laminas: mDmg(18, 16, 8000),
  l_marca_mortal: rDmg(10, 4, 10, 9000, false),
  // ---- Mago (mágico à distância; buffs) ----
  m_bola_fogo: rDmg(18, 5, 12, 3500),
  m_explosao_fogo: rDmg(18, 4, 14, 6000),
  m_meteoro: rDmg(40, 5, 30, 16000),
  m_muralha_fogo: rDmg(16, 4, 16, 9000),
  m_imolacao: rDmg(12, 2, 12, 7000),
  m_nova_gelo: rDmg(16, 3, 14, 6000),
  m_lanca_gelo: rDmg(18, 5, 12, 4500),
  m_escudo_arcano: buff({ defReduc: 0.5, dur: 6000, mana: 14, cd: 12000 }),
  m_teleporte: buff({ defReduc: 0.3, dur: 2000, mana: 10, cd: 10000 }),
  m_prisao_gelo: rDmg(12, 4, 12, 9000),
  m_raio_arcano: rDmg(18, 5, 12, 4000),
  m_corrente: rDmg(16, 4, 14, 6000),
  m_tempestade: rDmg(26, 4, 20, 11000),
  m_descarga: rDmg(18, 3, 14, 6000),
  m_nova_arcana: rDmg(40, 4, 30, 16000),
  // ---- Clérigo (Luz: cura/buff · Julgamento: dano sagrado à distância · Fé: buff/cura) ----
  c_cura: heal(50, 12, 6000),
  c_cura_area: heal(70, 18, 9000),
  c_bencao: buff({ atkMul: 1.4, dur: 10000, mana: 14, cd: 14000 }),
  c_aura_protecao: buff({ defReduc: 0.4, dur: 8000, mana: 14, cd: 12000 }),
  c_renovacao: heal(60, 16, 11000),
  c_martelo_sagrado: rDmg(18, 4, 12, 4000),
  c_punicao: rDmg(16, 4, 12, 6000),
  c_luz_radiante: rDmg(18, 3, 14, 6000),
  c_selo_sagrado: rDmg(24, 4, 18, 9000),
  c_condenacao: rDmg(38, 5, 28, 15000),
  c_escudo_divino: buff({ defReduc: 0.9, dur: 3000, mana: 20, cd: 20000 }),
  c_repreensao: rDmg(12, 3, 12, 9000),
  c_intervencao: heal(90, 22, 14000),
  c_ressurreicao: heal(150, 30, 60000),
  c_aura_fe: buff({ atkMul: 1.3, dur: 10000, mana: 14, cd: 12000 }),
};

// perfil de combate de uma ativa (fallback: golpe corpo-a-corpo básico)
export function combatFor(id: string): SkillCombat {
  return SKILL_COMBAT[id] ?? mDmg(12, 8, 4000);
}

// nome legível de uma habilidade (para a barra de conjuração, tooltips, etc.)
export function skillName(id: string): string {
  for (const key in SKILL_TREES) {
    const tree = SKILL_TREES[key];
    if (!tree) continue;
    for (const b of tree.branches)
      for (const sk of b.skills) if (sk.id === id) return sk.name;
  }
  return "";
}

// lista as ATIVAS aprendidas (rank ≥ 1) da classe, em ordem da árvore
export interface ActiveSkill {
  id: string;
  name: string;
  icon?: string;
  rank: number;
  combat: SkillCombat;
}
export function activeSkillsFor(
  classId: string,
  ranks: Record<string, number>,
): ActiveSkill[] {
  const tree = SKILL_TREES[classId];
  if (!tree) return [];
  const out: ActiveSkill[] = [];
  for (const b of tree.branches)
    for (const sk of b.skills) {
      if (sk.kind !== "active") continue;
      const rank = ranks[sk.id] || 0;
      if (rank <= 0) continue;
      out.push({ id: sk.id, name: sk.name, icon: sk.icon, rank, combat: combatFor(sk.id) });
    }
  return out;
}
