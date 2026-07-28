// Sistema de atributos — números BAIXOS e cadenciados (nada de valores gigantes).
// 3 PRIMÁRIOS (o jogador distribui pontos) alimentam os SECUNDÁRIOS (derivados).
// Roubo de Vida, Redução de Recarga e Bloqueio NÃO vêm dos primários — vêm de
// equipamento/talentos (por isso ficam de fora da derivação-base aqui).

export interface Primaries {
  str: number;
  dex: number;
  int: number;
}

export interface Secondaries {
  atkPhys: number; // Ataque Físico
  atkMag: number; // Ataque Mágico
  crit: number; // Chance Crítica (%)
  critDmg: number; // Dano Crítico (%)
  precision: number; // Precisão (%)  → determina acerto vs Evasão do alvo
  hp: number; // Vida
  def: number; // Defesa / Armadura
  magRes: number; // Resistência Mágica
  evasion: number; // Evasão (%)      → chance de dar Miss no atacante
  mp: number; // Mana
  regen: number; // Regeneração de Vida (HP por segundo) — baixa de propósito
}

export const START_POINTS = 5; // pontos livres pra distribuir na CRIAÇÃO
export const POINTS_PER_LEVEL = 3; // pontos ganhos por nível (referência p/ o futuro)

// Deriva os secundários a partir dos primários + base de vida/mana da classe.
// Coeficientes pequenos de propósito: 1 ponto de atributo dá um ganho perceptível
// mas contido, pra manter os números legíveis.
export function derive(p: Primaries, baseHp: number, baseMp: number): Secondaries {
  return {
    atkPhys: Math.round(2 + p.str * 1.2 + p.dex * 0.6),
    atkMag: Math.round(1 + p.int * 1.4),
    crit: Math.round(3 + p.dex * 0.8),
    critDmg: 150 + Math.round(p.dex * 1),
    precision: Math.min(99, Math.round(85 + p.dex * 0.6)),
    hp: baseHp + p.str * 2,
    def: Math.round(1 + p.str * 0.5),
    magRes: Math.round(p.int * 0.5),
    evasion: Math.round(2 + p.dex * 0.7),
    mp: baseMp + p.int * 3,
    // regeneração BEM baixa: um fiapo de vida por segundo (+ leve escala com FOR).
    // números pequenos de propósito — cura lenta fora de combate, sem substituir poção.
    regen: Math.round((0.4 + p.str * 0.08) * 10) / 10,
  };
}
