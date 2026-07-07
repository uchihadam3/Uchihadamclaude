import type { EquipProc, EquipSlot, Rarity, SkillDef, SkillMods, StatKey, StatusId } from '../types';

// ============ POOLS DE CARTAS DE MELHORIA ============
// Cartas concretas = template × raridade × habilidade/equipamento elegível.
// O total enumerável passa de 1000 (ver countAllCards em game/cardGenerator).
//
// Unidades dos SkillMods gerados aqui:
//   multPct/radiusPct/durationPct/dotPct/vsEliteBoss/lowHpBonus/explodeOnKill/summonBonusPct → pontos percentuais
//   critChance/onKillReset/ignoreDefense → fração 0-1
//   onKillHeal/selfShieldOnCast → % da vida máxima / % do poder
//   hasteOnCast → segundos; ricochet/extraHits/chainCount/extraCharge → inteiros

export const RARITIES: Rarity[] = ['comum', 'incomum', 'rara', 'epica', 'lendaria'];
export const RARITY_SCALE = [1, 1.5, 2.2, 3.2, 4.5];

const tag = (s: SkillDef, ...ts: string[]) => ts.some((t) => s.tags.includes(t));
const dmg = (s: SkillDef) => ['strike', 'aoe', 'dot-aoe', 'dash', 'execute'].includes(s.kind) || tag(s, 'dano');
const pct = (v: number) => `${Math.round(v)}%`;

// ---------- templates de habilidade ----------
export interface SkillTpl {
  id: string;
  nome: string;
  tipo: string;
  icon: string;
  tiers: Rarity[];            // raridades em que a carta existe
  base: number;               // magnitude na raridade comum
  maxStacks: number;          // vezes que pode ser escolhida por habilidade
  weight: number;
  fits: (s: SkillDef) => boolean;
  make: (mag: number, tierIdx: number) => Partial<SkillMods>;
  desc: (mag: number, tierIdx: number, s: SkillDef) => string;
}

const ALL: Rarity[] = ['comum', 'incomum', 'rara', 'epica', 'lendaria'];
const HI: Rarity[] = ['rara', 'epica', 'lendaria'];
const TOP: Rarity[] = ['epica', 'lendaria'];

export const SKILL_TPLS: SkillTpl[] = [
  {
    id: 'potencia', nome: 'Potência Bruta', tipo: 'dano', icon: 'c-power', tiers: ALL, base: 8, maxStacks: 5, weight: 1.4,
    fits: () => true,
    make: (m) => ({ multPct: m }),
    desc: (m, _t, s) => `${s.nome} causa ${pct(m)} a mais de efeito.`,
  },
  {
    id: 'fluidez', nome: 'Fluidez Arcana', tipo: 'recarga', icon: 'c-cd', tiers: ALL, base: 6, maxStacks: 4, weight: 1.3,
    fits: () => true,
    make: (m) => ({ cooldownPct: m }),
    desc: (m, _t, s) => `A recarga de ${s.nome} diminui em ${pct(m)}.`,
  },
  {
    id: 'amplitude', nome: 'Onda Expandida', tipo: 'area', icon: 'c-area', tiers: ALL, base: 10, maxStacks: 3, weight: 1,
    fits: (s) => s.kind === 'aoe' || s.kind === 'dot-aoe' || tag(s, 'area'),
    make: (m) => ({ radiusPct: m }),
    desc: (m, _t, s) => `A área de ${s.nome} cresce ${pct(m)}.`,
  },
  {
    id: 'persistencia', nome: 'Efeito Duradouro', tipo: 'duracao', icon: 'c-time', tiers: ALL, base: 10, maxStacks: 3, weight: 1,
    fits: (s) => s.duration != null || tag(s, 'dot', 'duracao') || s.kind === 'buff' || s.kind === 'summon',
    make: (m) => ({ durationPct: m }),
    desc: (m, _t, s) => `${s.nome} dura ${pct(m)} a mais.`,
  },
  {
    id: 'virulencia', nome: 'Virulência', tipo: 'dot', icon: 'c-dot', tiers: ALL, base: 12, maxStacks: 4, weight: 1.1,
    fits: (s) => tag(s, 'dot', 'queimadura', 'sangramento', 'veneno', 'acido'),
    make: (m) => ({ dotPct: m }),
    desc: (m, _t, s) => `O dano contínuo de ${s.nome} sobe ${pct(m)}.`,
  },
  {
    id: 'precisao', nome: 'Precisão Letal', tipo: 'critico', icon: 'c-crit', tiers: ALL, base: 0.04, maxStacks: 4, weight: 1,
    fits: dmg,
    make: (m) => ({ critChance: m }),
    desc: (m, _t, s) => `${s.nome} ganha ${pct(m * 100)} de chance de crítico.`,
  },
  {
    id: 'ricochete', nome: 'Ricochete', tipo: 'alvos', icon: 'c-bounce', tiers: HI, base: 1, maxStacks: 2, weight: 0.8,
    fits: (s) => s.kind === 'strike' && dmg(s),
    make: (_m, t) => ({ ricochet: [0, 0, 1, 2, 3][t] }),
    desc: (_m, t, s) => `${s.nome} salta para ${[0, 0, 1, 2, 3][t]} alvo(s) extra(s).`,
  },
  {
    id: 'golpe-duplo', nome: 'Golpe Duplo', tipo: 'alvos', icon: 'c-double', tiers: TOP, base: 1, maxStacks: 2, weight: 0.6,
    fits: (s) => s.kind === 'strike' || s.kind === 'dash',
    make: (_m, t) => ({ extraHits: t >= 4 ? 2 : 1 }),
    desc: (_m, t, s) => `${s.nome} golpeia ${t >= 4 ? 'duas vezes' : 'uma vez'} a mais.`,
  },
  {
    id: 'ceifar', nome: 'Ceifar Vigor', tipo: 'sustento', icon: 'c-reap', tiers: ALL, base: 1.5, maxStacks: 3, weight: 0.9,
    fits: dmg,
    make: (m) => ({ onKillHeal: m }),
    desc: (m, _t, s) => `Abater com ${s.nome} restaura ${pct(m)} da vida.`,
  },
  {
    id: 'reinicio', nome: 'Reinício Súbito', tipo: 'recarga', icon: 'c-reset', tiers: HI, base: 0.1, maxStacks: 2, weight: 0.7,
    fits: (s) => (s.kind === 'strike' || s.kind === 'execute') && dmg(s),
    make: (m) => ({ onKillReset: m }),
    desc: (m, _t, s) => `Abater com ${s.nome} tem ${pct(m * 100)} de chance de zerar a recarga.`,
  },
  {
    id: 'contagio', nome: 'Contágio', tipo: 'dot', icon: 'c-spread', tiers: HI, base: 1, maxStacks: 1, weight: 0.7,
    fits: (s) => tag(s, 'dot', 'veneno', 'queimadura', 'sangramento', 'acido'),
    make: () => ({ spreadOnKill: true }),
    desc: (_m, _t, s) => `Alvos mortos por ${s.nome} espalham o efeito contínuo aos vizinhos.`,
  },
  {
    id: 'detonacao', nome: 'Detonação Interna', tipo: 'explosao', icon: 'c-boom', tiers: ALL, base: 25, maxStacks: 3, weight: 0.9,
    fits: (s) => tag(s, 'dot', 'veneno', 'queimadura', 'sangramento', 'acido'),
    make: (m) => ({ explodeOnKill: m }),
    desc: (m, _t, s) => `Alvos com o efeito de ${s.nome} explodem ao morrer, causando ${pct(m)} do poder.`,
  },
  {
    id: 'perfuracao', nome: 'Perfuração', tipo: 'penetracao', icon: 'c-pierce', tiers: ALL, base: 0.08, maxStacks: 3, weight: 0.9,
    fits: (s) => dmg(s) && s.dmgKind === 'fisico',
    make: (m) => ({ ignoreDefense: m }),
    desc: (m, _t, s) => `${s.nome} ignora ${pct(m * 100)} da defesa inimiga.`,
  },
  {
    id: 'cacador', nome: 'Caçador de Gigantes', tipo: 'elite', icon: 'c-giant', tiers: ALL, base: 10, maxStacks: 3, weight: 1,
    fits: dmg,
    make: (m) => ({ vsEliteBoss: m }),
    desc: (m, _t, s) => `${s.nome} causa ${pct(m)} a mais contra elites, subchefes e chefes.`,
  },
  {
    id: 'abutre', nome: 'Instinto de Abutre', tipo: 'execucao', icon: 'c-vulture', tiers: ALL, base: 12, maxStacks: 3, weight: 0.9,
    fits: dmg,
    make: (m) => ({ lowHpBonus: m }),
    desc: (m, _t, s) => `${s.nome} causa ${pct(m)} a mais contra alvos abaixo de 30% de vida.`,
  },
  {
    id: 'egide', nome: 'Égide Reflexa', tipo: 'defesa', icon: 'c-aegis', tiers: ALL, base: 6, maxStacks: 3, weight: 0.8,
    fits: () => true,
    make: (m) => ({ selfShieldOnCast: m }),
    desc: (m, _t, s) => `Usar ${s.nome} concede um escudo de ${pct(m)} do poder.`,
  },
  {
    id: 'impeto', nome: 'Ímpeto', tipo: 'velocidade', icon: 'c-haste', tiers: ALL, base: 0.8, maxStacks: 3, weight: 0.8,
    fits: () => true,
    make: (m) => ({ hasteOnCast: m }),
    desc: (m, _t, s) => `Usar ${s.nome} acelera os ataques por ${m.toFixed(1)}s.`,
  },
  {
    id: 'corrente', nome: 'Corrente Elétrica', tipo: 'alvos', icon: 'c-chain', tiers: HI, base: 1, maxStacks: 2, weight: 0.7,
    fits: (s) => tag(s, 'raio', 'choque'),
    make: (_m, t) => ({ chainCount: [0, 0, 1, 2, 3][t] }),
    desc: (_m, t, s) => `${s.nome} encadeia para ${[0, 0, 1, 2, 3][t]} inimigo(s) próximo(s).`,
  },
  {
    id: 'vinculo', nome: 'Vínculo Fortalecido', tipo: 'invocacao', icon: 'c-bond', tiers: ALL, base: 10, maxStacks: 4, weight: 1,
    fits: (s) => tag(s, 'invocacao', 'torre', 'servos'),
    make: (m) => ({ summonBonusPct: m }),
    desc: (m, _t, s) => `As criaturas de ${s.nome} ganham ${pct(m)} de vida e dano.`,
  },
  {
    id: 'carga', nome: 'Carga Adicional', tipo: 'invocacao', icon: 'c-charge', tiers: TOP, base: 1, maxStacks: 2, weight: 0.6,
    fits: (s) => tag(s, 'invocacao', 'torre', 'servos'),
    make: (_m, t) => ({ extraCharge: t >= 4 ? 2 : 1 }),
    desc: (_m, t, s) => `${s.nome} mantém ${t >= 4 ? 'duas criaturas' : 'uma criatura'} a mais em campo.`,
  },
  // ---- adição de status ----
  {
    id: 'brasas', nome: 'Brasas Persistentes', tipo: 'status', icon: 'c-burn', tiers: ALL, base: 0.15, maxStacks: 2, weight: 0.9,
    fits: (s) => tag(s, 'fogo') && dmg(s),
    make: (m) => ({ extraStatus: [{ id: 'burn' as StatusId, chance: m, duration: 3, potency: 0.12 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de incendiar o alvo.`,
  },
  {
    id: 'serrilhada', nome: 'Lâmina Serrilhada', tipo: 'status', icon: 'c-bleed', tiers: ALL, base: 0.15, maxStacks: 2, weight: 0.9,
    fits: (s) => s.dmgKind === 'fisico' && (s.kind === 'strike' || s.kind === 'dash' || s.kind === 'execute'),
    make: (m) => ({ extraStatus: [{ id: 'bleed' as StatusId, chance: m, duration: 5, potency: 0.18 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de abrir sangramento.`,
  },
  {
    id: 'toxinas', nome: 'Toxinas Refinadas', tipo: 'status', icon: 'c-poison', tiers: ALL, base: 0.15, maxStacks: 2, weight: 0.9,
    fits: (s) => tag(s, 'veneno', 'acido', 'natureza') && dmg(s),
    make: (m) => ({ extraStatus: [{ id: 'poison' as StatusId, chance: m, duration: 4, potency: 0.15 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de envenenar.`,
  },
  {
    id: 'estatica', nome: 'Estática Acumulada', tipo: 'status', icon: 'c-shock', tiers: ALL, base: 0.12, maxStacks: 2, weight: 0.8,
    fits: (s) => tag(s, 'raio', 'choque'),
    make: (m) => ({ extraStatus: [{ id: 'shock' as StatusId, chance: m, duration: 2, potency: 0.1 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de eletrocutar.`,
  },
  {
    id: 'torpor', nome: 'Torpor', tipo: 'controle', icon: 'c-slow', tiers: ALL, base: 0.2, maxStacks: 2, weight: 0.8,
    fits: (s) => (s.kind === 'aoe' || s.kind === 'dot-aoe' || tag(s, 'controle')) && dmg(s),
    make: (m) => ({ extraStatus: [{ id: 'slow' as StatusId, chance: m, duration: 2.5, potency: 0.35 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de retardar os atingidos.`,
  },
  {
    id: 'pancada', nome: 'Pancada Atordoante', tipo: 'controle', icon: 'c-stun', tiers: HI, base: 0.08, maxStacks: 2, weight: 0.6,
    fits: (s) => dmg(s) && (s.kind === 'strike' || s.kind === 'aoe'),
    make: (m) => ({ extraStatus: [{ id: 'stun' as StatusId, chance: m, duration: 1 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de atordoar por 1s.`,
  },
  {
    id: 'desgaste', nome: 'Desgaste', tipo: 'debuff', icon: 'c-weaken', tiers: ALL, base: 0.2, maxStacks: 2, weight: 0.8,
    fits: (s) => tag(s, 'debuff', 'controle') || s.kind === 'debuff',
    make: (m) => ({ extraStatus: [{ id: 'weaken' as StatusId, chance: m, duration: 4, potency: 0.2 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de enfraquecer o dano inimigo.`,
  },
  {
    id: 'alvo-marcado', nome: 'Alvo Marcado', tipo: 'amplificar', icon: 'c-mark', tiers: HI, base: 0.15, maxStacks: 1, weight: 0.7,
    fits: dmg,
    make: (m) => ({ extraStatus: [{ id: 'mark' as StatusId, chance: m, duration: 5, potency: 0.2 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de marcar o alvo, que passa a receber mais dano.`,
  },
  {
    id: 'fenda', nome: 'Fenda na Armadura', tipo: 'debuff', icon: 'c-break', tiers: ALL, base: 0.18, maxStacks: 2, weight: 0.8,
    fits: (s) => dmg(s) && (s.dmgKind === 'fisico' || tag(s, 'acido', 'armadura')),
    make: (m) => ({ extraStatus: [{ id: 'armorbreak' as StatusId, chance: m, duration: 4, potency: 0.25 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de rachar a armadura do alvo.`,
  },
  {
    id: 'exposicao', nome: 'Exposição Mística', tipo: 'amplificar', icon: 'c-expose', tiers: HI, base: 0.15, maxStacks: 1, weight: 0.7,
    fits: (s) => dmg(s) && ['magico', 'sombra', 'sagrado', 'fogo', 'raio'].includes(s.dmgKind),
    make: (m) => ({ extraStatus: [{ id: 'vulnerable' as StatusId, chance: m, duration: 4, potency: 0.2 }] }),
    desc: (m, _t, s) => `${s.nome} tem ${pct(m * 100)} de chance de expor o alvo a dano ampliado.`,
  },
];

// ---------- templates de equipamento (bônus de atributo) ----------
export interface EquipTpl {
  id: string;
  nome: string;
  tipo: string;
  icon: string;
  slots: EquipSlot[];
  tiers: Rarity[];
  base: number;
  maxStacks: number;
  stat: StatKey;
  desc: (v: number) => string;
}

export const EQUIP_TPLS: EquipTpl[] = [
  { id: 'forca', nome: 'Núcleo de Força', tipo: 'dano', icon: 'e-power', slots: ['arma', 'anel'], tiers: ALL, base: 3, maxStacks: 5, stat: 'power', desc: (v) => `Concede ${Math.round(v)} de poder de ataque.` },
  { id: 'vitalidade', nome: 'Coração Robusto', tipo: 'vida', icon: 'e-hp', slots: ['corpo', 'amuleto'], tiers: ALL, base: 30, maxStacks: 5, stat: 'hp', desc: (v) => `Concede ${Math.round(v)} de vida máxima.` },
  { id: 'guarda', nome: 'Placas Reforçadas', tipo: 'defesa', icon: 'e-def', slots: ['corpo', 'cabeca'], tiers: ALL, base: 3, maxStacks: 4, stat: 'defense', desc: (v) => `Concede ${Math.round(v)} de defesa física.` },
  { id: 'barreira', nome: 'Barreira Mental', tipo: 'defesa', icon: 'e-mdef', slots: ['cabeca', 'amuleto'], tiers: ALL, base: 3, maxStacks: 4, stat: 'magicDefense', desc: (v) => `Concede ${Math.round(v)} de defesa mágica.` },
  { id: 'foco', nome: 'Foco Arcano', tipo: 'magia', icon: 'e-spell', slots: ['cabeca', 'arma'], tiers: ALL, base: 5, maxStacks: 5, stat: 'spellPower', desc: (v) => `Concede ${Math.round(v)} de poder de habilidade.` },
  { id: 'celeridade', nome: 'Engrenagem Célere', tipo: 'velocidade', icon: 'e-speed', slots: ['arma', 'botas'], tiers: ALL, base: -0.04, maxStacks: 4, stat: 'attackInterval', desc: (v) => `Ataques ${Math.abs(Math.round(v * 100) / 100)}s mais rápidos.` },
  { id: 'olho-critico', nome: 'Olho Crítico', tipo: 'critico', icon: 'e-crit', slots: ['arma', 'anel'], tiers: ALL, base: 0.02, maxStacks: 4, stat: 'critChance', desc: (v) => `Concede ${pct(v * 100)} de chance de crítico.` },
  { id: 'brutalidade', nome: 'Brutalidade', tipo: 'critico', icon: 'e-critdmg', slots: ['anel', 'arma'], tiers: ALL, base: 0.08, maxStacks: 3, stat: 'critMult', desc: (v) => `Críticos causam ${pct(v * 100)} a mais de dano.` },
  { id: 'evasao', nome: 'Passos Etéreos', tipo: 'esquiva', icon: 'e-dodge', slots: ['botas'], tiers: ALL, base: 0.015, maxStacks: 4, stat: 'dodge', desc: (v) => `Concede ${pct(v * 100)} de chance de esquiva.` },
  { id: 'passada', nome: 'Passada Larga', tipo: 'mobilidade', icon: 'e-move', slots: ['botas'], tiers: ALL, base: 0.15, maxStacks: 3, stat: 'speed', desc: (v) => `Movimento ${(Math.round(v * 100) / 100)} mais rápido.` },
  { id: 'vampirismo', nome: 'Sede Rubra', tipo: 'sustento', icon: 'e-leech', slots: ['arma', 'amuleto'], tiers: HI, base: 0.015, maxStacks: 3, stat: 'lifesteal', desc: (v) => `Converte ${pct(v * 100)} do dano em vida.` },
  { id: 'mente-agil', nome: 'Mente Ágil', tipo: 'recarga', icon: 'e-cdr', slots: ['cabeca', 'anel'], tiers: ALL, base: 0.03, maxStacks: 4, stat: 'cdr', desc: (v) => `Reduz recargas em ${pct(v * 100)}.` },
  { id: 'onda', nome: 'Eco Expansivo', tipo: 'area', icon: 'e-area', slots: ['anel'], tiers: ALL, base: 0.05, maxStacks: 3, stat: 'areaBonus', desc: (v) => `Efeitos em área ${pct(v * 100)} maiores.` },
  { id: 'luz-interior', nome: 'Luz Interior', tipo: 'cura', icon: 'e-heal', slots: ['amuleto'], tiers: ALL, base: 0.06, maxStacks: 3, stat: 'healBonus', desc: (v) => `Curas ${pct(v * 100)} mais fortes.` },
  { id: 'matador', nome: 'Ferro Matador', tipo: 'elite', icon: 'e-elite', slots: ['anel', 'arma'], tiers: ALL, base: 0.06, maxStacks: 3, stat: 'eliteDamage', desc: (v) => `Dano ${pct(v * 100)} maior contra elites e subchefes.` },
  { id: 'carrasco', nome: 'Selo do Carrasco', tipo: 'chefe', icon: 'e-boss', slots: ['anel', 'arma'], tiers: ALL, base: 0.06, maxStacks: 3, stat: 'bossDamage', desc: (v) => `Dano ${pct(v * 100)} maior contra chefes.` },
  { id: 'alquimia', nome: 'Resíduo Alquímico', tipo: 'dot', icon: 'e-dot', slots: ['anel', 'amuleto'], tiers: ALL, base: 0.06, maxStacks: 3, stat: 'dotDamage', desc: (v) => `Dano contínuo ${pct(v * 100)} mais forte.` },
  { id: 'mestre-bestas', nome: 'Voz de Mando', tipo: 'invocacao', icon: 'e-summon', slots: ['amuleto', 'anel'], tiers: ALL, base: 0.06, maxStacks: 3, stat: 'summonPower', desc: (v) => `Invocações ${pct(v * 100)} mais fortes.` },
  { id: 'muralha', nome: 'Tecido de Muralha', tipo: 'escudo', icon: 'e-shield', slots: ['corpo', 'amuleto'], tiers: ALL, base: 0.08, maxStacks: 3, stat: 'shieldPower', desc: (v) => `Escudos ${pct(v * 100)} mais fortes.` },
  { id: 'pele-ferro', nome: 'Pele de Ferro', tipo: 'bloqueio', icon: 'e-block', slots: ['corpo'], tiers: HI, base: 0.015, maxStacks: 3, stat: 'blockChance', desc: (v) => `Concede ${pct(v * 100)} de chance de bloqueio.` },
  { id: 'seiva', nome: 'Seiva Constante', tipo: 'regeneracao', icon: 'e-regen', slots: ['amuleto', 'corpo'], tiers: ALL, base: 0.8, maxStacks: 3, stat: 'regenPerSec', desc: (v) => `Regenera ${(Math.round(v * 10) / 10)} de vida por segundo.` },
  { id: 'frasco-forte', nome: 'Frasco Reforçado', tipo: 'pocao', icon: 'e-potion', slots: ['amuleto'], tiers: ALL, base: 0.08, maxStacks: 3, stat: 'potionPower', desc: (v) => `A poção cura ${pct(v * 100)} a mais.` },
];

// ---------- procs (marcos de equipamento nv 5/10/15/20 e cartas de poção) ----------
export interface ProcTpl {
  id: string;
  nome: string;
  tipo: string;
  icon: string;
  raridade: Rarity;
  proc: EquipProc;
}

export const PROC_TPLS: ProcTpl[] = [
  { id: 'reflexo-frasco', nome: 'Reflexo do Frasco', tipo: 'pocao', icon: 'p-haste', raridade: 'epica',
    proc: { when: 'onPotion', effect: 'haste', amount: 0.35, duration: 3, desc: 'Beber a poção acelera os ataques por 3s.' } },
  { id: 'vigor-frasco', nome: 'Vigor do Frasco', tipo: 'pocao', icon: 'p-power', raridade: 'epica',
    proc: { when: 'onPotion', effect: 'power', amount: 0.3, duration: 5, desc: 'Beber a poção aumenta o poder em 30% por 5s.' } },
  { id: 'purga-frasco', nome: 'Purga do Frasco', tipo: 'pocao', icon: 'p-cleanse', raridade: 'rara',
    proc: { when: 'onPotion', effect: 'cleanse', amount: 1, desc: 'Beber a poção remove venenos, queimaduras e maldições.' } },
  { id: 'casca-emergencia', nome: 'Casca de Emergência', tipo: 'defesa', icon: 'p-shield', raridade: 'lendaria',
    proc: { when: 'onLowHp', effect: 'shield', amount: 0.25, oncePerRun: true, desc: 'Ao cair abaixo de 25% de vida, ganha um escudo de 25% (uma vez por expedição).' } },
  { id: 'ultimo-gole', nome: 'Último Gole', tipo: 'pocao', icon: 'p-refill', raridade: 'lendaria',
    proc: { when: 'onLowHp', effect: 'resetPotion', amount: 1, oncePerRun: true, desc: 'Ao cair abaixo de 25% de vida sem poções, recupera uma carga (uma vez por expedição).' } },
  { id: 'panico-agil', nome: 'Pânico Ágil', tipo: 'esquiva', icon: 'p-dodge', raridade: 'epica',
    proc: { when: 'onLowHp', effect: 'dodgeUp', amount: 0.3, duration: 4, desc: 'Ao ficar em risco, ganha 30% de esquiva por 4s.' } },
  { id: 'sede-batalha', nome: 'Sede de Batalha', tipo: 'sustento', icon: 'p-heal', raridade: 'rara',
    proc: { when: 'onKill', effect: 'heal', amount: 0.02, desc: 'Cada abate restaura 2% da vida.' } },
  { id: 'colheita-ossea', nome: 'Colheita Óssea', tipo: 'escudo', icon: 'p-bone', raridade: 'rara',
    proc: { when: 'onKill', effect: 'shield', amount: 0.03, desc: 'Cada abate concede um pequeno escudo.' } },
  { id: 'contra-ataque', nome: 'Contra-Ataque', tipo: 'bloqueio', icon: 'p-counter', raridade: 'epica',
    proc: { when: 'onBlock', effect: 'power', amount: 0.2, duration: 3, desc: 'Bloquear aumenta o poder em 20% por 3s.' } },
  { id: 'pele-reativa', nome: 'Pele Reativa', tipo: 'defesa', icon: 'p-react', raridade: 'rara',
    proc: { when: 'onHitTaken', effect: 'defense', amount: 0.15, duration: 2.5, chance: 0.25, desc: 'Sofrer dano pode endurecer a pele, aumentando a defesa.' } },
  { id: 'fluxo-critico', nome: 'Fluxo Crítico', tipo: 'critico', icon: 'p-crit', raridade: 'epica',
    proc: { when: 'onCrit', effect: 'haste', amount: 0.25, duration: 2, chance: 0.35, desc: 'Críticos podem acelerar os ataques por 2s.' } },
  { id: 'inicio-blindado', nome: 'Início Blindado', tipo: 'escudo', icon: 'p-start', raridade: 'rara',
    proc: { when: 'fightStart', effect: 'shield', amount: 0.12, desc: 'Começa cada combate com um escudo de 12% da vida.' } },
  { id: 'passo-fantasma', nome: 'Passo Fantasma', tipo: 'esquiva', icon: 'p-ghost', raridade: 'epica',
    proc: { when: 'onDodge', effect: 'power', amount: 0.15, duration: 3, desc: 'Esquivar aumenta o poder em 15% por 3s.' } },
  { id: 'nova-ardente', nome: 'Nova Ardente', tipo: 'explosao', icon: 'p-nova', raridade: 'lendaria',
    proc: { when: 'onCrowded', effect: 'burnNova', amount: 1.2, chance: 0.5, desc: 'Cercado por 3 ou mais inimigos, pode liberar uma explosão flamejante.' } },
];

// ---------- mutações (nível 5) e evoluções (nível 10) ----------
export interface MorphDef {
  id: string;
  skillId: string;
  nome: string;
  desc: string;
  mod: Partial<SkillMods>;
}

const M = (skillId: string, id: string, nome: string, desc: string, mod: Partial<SkillMods>): MorphDef =>
  ({ id, skillId, nome, desc, mod });

export const MUTATIONS: MorphDef[] = [
  // guerreiro
  M('golpe-pesado', 'eco-sismico', 'Eco Sísmico', 'O golpe ecoa e atinge um segundo alvo com força total.', { ricochet: 1, multPct: 10 }),
  M('golpe-pesado', 'quebra-guarda', 'Quebra-Guarda', 'O impacto racha armaduras e ignora parte da defesa.', { ignoreDefense: 0.2, extraStatus: [{ id: 'armorbreak', chance: 0.8, duration: 4, potency: 0.3 }] }),
  M('escudo-erguido', 'baluarte', 'Baluarte', 'O escudo dura muito mais e absorve mais dano.', { durationPct: 50, multPct: 30 }),
  M('escudo-erguido', 'insulto-de-aco', 'Insulto de Aço', 'Erguer o escudo provoca os inimigos a atacar quem aguenta.', { extraStatus: [{ id: 'taunted', chance: 1, duration: 3 }], selfShieldOnCast: 10 }),
  M('provocacao-ferro', 'grito-rachado', 'Grito Rachado', 'A provocação também expõe os inimigos a mais dano.', { extraStatus: [{ id: 'vulnerable', chance: 1, duration: 5, potency: 0.2 }] }),
  M('provocacao-ferro', 'peso-da-culpa', 'Peso da Culpa', 'Inimigos provocados ficam lentos sob o peso do desafio.', { extraStatus: [{ id: 'slow', chance: 1, duration: 4, potency: 0.35 }], durationPct: 30 }),
  M('martelo-sismico', 'falha-tectonica', 'Falha Tectônica', 'A onda sísmica cobre uma área muito maior.', { radiusPct: 45, multPct: 10 }),
  M('martelo-sismico', 'martelo-duplo', 'Martelo Duplo', 'O martelo cai duas vezes seguidas.', { extraHits: 1, cooldownPct: -10 }),
  // arqueira
  M('disparo-preciso', 'flecha-perfurante', 'Flecha Perfurante', 'A flecha atravessa o alvo e acerta quem estiver atrás.', { ricochet: 1, ignoreDefense: 0.15 }),
  M('disparo-preciso', 'ponto-vital', 'Ponto Vital', 'Disparos certeiros quase sempre acertam pontos vitais.', { critChance: 0.25, multPct: 5 }),
  M('chuva-flechas', 'tempestade', 'Tempestade de Farpas', 'A chuva cobre o dobro do céu.', { radiusPct: 50 }),
  M('chuva-flechas', 'pontas-farpadas', 'Pontas Farpadas', 'Cada flecha abre feridas que sangram.', { extraStatus: [{ id: 'bleed', chance: 0.5, duration: 4, potency: 0.15 }] }),
  M('recuo-rapido', 'passo-espelhado', 'Passo Espelhado', 'O recuo deixa uma imagem que confunde: esquiva quase total.', { multPct: 40, durationPct: 30 }),
  M('recuo-rapido', 'flecha-de-despedida', 'Flecha de Despedida', 'Ao recuar, dispara um tiro certeiro de brinde.', { extraHits: 1, hasteOnCast: 1.5 }),
  M('marca-cacada', 'presa-fragil', 'Presa Frágil', 'A marca também corrói a armadura da presa.', { extraStatus: [{ id: 'armorbreak', chance: 1, duration: 8, potency: 0.3 }] }),
  M('marca-cacada', 'cacada-longa', 'Caçada Longa', 'A marca dura muito mais e amplifica ainda mais o dano.', { durationPct: 60, multPct: 20 }),
  // mago
  M('bola-de-fogo', 'nucleo-instavel', 'Núcleo Instável', 'A explosão engole uma área bem maior.', { radiusPct: 40, multPct: 10 }),
  M('bola-de-fogo', 'fogo-pegajoso', 'Fogo Pegajoso', 'As chamas grudam e queimam por muito mais tempo.', { extraStatus: [{ id: 'burn', chance: 0.8, duration: 4, potency: 0.18 }], dotPct: 20 }),
  M('chao-ardente', 'mar-de-brasas', 'Mar de Brasas', 'O incêndio se espalha e dura muito mais.', { radiusPct: 35, durationPct: 40 }),
  M('chao-ardente', 'calor-branco', 'Calor Branco', 'O chão queima com fúria redobrada.', { dotPct: 45 }),
  M('escudo-arcano', 'espelho-arcano', 'Espelho Arcano', 'O escudo devolve o próximo impacto como energia pura.', { multPct: 40, selfShieldOnCast: 10 }),
  M('escudo-arcano', 'sobrecarga-defensiva', 'Sobrecarga Defensiva', 'Conjurar o escudo acelera as próximas magias.', { hasteOnCast: 2.5, cooldownPct: 15 }),
  M('meteoro-menor', 'chuva-de-pedras', 'Chuva de Pedras', 'Dois meteoros menores caem em sequência.', { extraHits: 1, multPct: -15 }),
  M('meteoro-menor', 'impacto-profundo', 'Impacto Profundo', 'O meteoro atordoa todos no epicentro.', { extraStatus: [{ id: 'stun', chance: 0.6, duration: 1.2 }] }),
  // ladino
  M('punhalada-rapida', 'lamina-dupla', 'Lâmina Dupla', 'Cada punhalada vira duas.', { extraHits: 1, multPct: -10 }),
  M('punhalada-rapida', 'veneno-de-vielas', 'Veneno de Vielas', 'As lâminas vêm untadas com toxina barata e eficaz.', { extraStatus: [{ id: 'poison', chance: 0.6, duration: 4, potency: 0.14 }] }),
  M('corte-sangrento', 'hemorragia', 'Hemorragia', 'O sangramento é muito mais violento.', { dotPct: 45 }),
  M('corte-sangrento', 'corte-cruzado', 'Corte Cruzado', 'O corte atinge um segundo alvo próximo.', { ricochet: 1, multPct: 10 }),
  M('sumir-sombras', 'sombra-longa', 'Sombra Longa', 'A invisibilidade dura mais e o bote sai mais forte.', { durationPct: 50, multPct: 25 }),
  M('sumir-sombras', 'adaga-do-nada', 'Adaga do Nada', 'Reaparecer restaura fôlego: recarga muito menor.', { cooldownPct: 25, hasteOnCast: 1.5 }),
  M('execucao', 'sentenca', 'Sentença', 'O limiar de execução sobe: alvos morrem mais cedo.', { lowHpBonus: 40, multPct: 10 }),
  M('execucao', 'cobranca-em-serie', 'Cobrança em Série', 'Executar um alvo reinicia a lâmina imediatamente.', { onKillReset: 0.6 }),
  // clériga
  M('luz-punitiva', 'lanca-do-alvorecer', 'Lança do Alvorecer', 'A luz perfura e atinge um segundo pecador.', { ricochet: 1, multPct: 10 }),
  M('luz-punitiva', 'brilho-cegante', 'Brilho Cegante', 'A punição cega e enfraquece o alvo.', { extraStatus: [{ id: 'weaken', chance: 0.8, duration: 4, potency: 0.25 }] }),
  M('cura-serena', 'aurora-continua', 'Aurora Contínua', 'A cura deixa uma regeneração prolongada.', { extraStatus: [{ id: 'regen', chance: 1, duration: 6, potency: 0.4 }], durationPct: 30 }),
  M('cura-serena', 'graca-eficiente', 'Graça Eficiente', 'A cura retorna muito mais rápido.', { cooldownPct: 25, multPct: 10 }),
  M('circulo-sagrado', 'circulo-amplo', 'Círculo Amplo', 'O círculo abraça um raio muito maior.', { radiusPct: 45 }),
  M('circulo-sagrado', 'solo-consagrado', 'Solo Consagrado', 'Dentro do círculo, a clériga recebe um escudo constante.', { selfShieldOnCast: 20, durationPct: 30 }),
  M('bencao-solar', 'sol-interior', 'Sol Interior', 'A bênção também acelera os golpes.', { hasteOnCast: 3, durationPct: 25 }),
  M('bencao-solar', 'manto-dourado', 'Manto Dourado', 'A bênção concede um escudo generoso.', { selfShieldOnCast: 25, multPct: 15 }),
  // druida
  M('espinhos-vivos', 'espinhos-famintos', 'Espinhos Famintos', 'Os espinhos drenam seiva: cura ao abater.', { onKillHeal: 4, multPct: 10 }),
  M('espinhos-vivos', 'roseira-brava', 'Roseira Brava', 'Os espinhos atingem mais um alvo e prendem melhor.', { ricochet: 1, extraStatus: [{ id: 'root', chance: 0.4, duration: 1.2 }] }),
  M('raizes-prendedoras', 'raizes-profundas', 'Raízes Profundas', 'As raízes seguram por muito mais tempo.', { durationPct: 60 }),
  M('raizes-prendedoras', 'seiva-toxica', 'Seiva Tóxica', 'As raízes envenenam quem tentam segurar.', { extraStatus: [{ id: 'poison', chance: 1, duration: 4, potency: 0.15 }] }),
  M('semente-curativa', 'fruto-maduro', 'Fruto Maduro', 'A semente floresce em cura muito maior.', { multPct: 40 }),
  M('semente-curativa', 'brotos-gemeos', 'Brotos Gêmeos', 'A regeneração dura quase o dobro.', { durationPct: 70 }),
  M('lobo-espiritual', 'alcateia', 'Alcateia', 'Um segundo lobo atende ao chamado.', { extraCharge: 1, summonBonusPct: -10 }),
  M('lobo-espiritual', 'presas-de-inverno', 'Presas de Inverno', 'O lobo morde com frio ancestral e retarda a presa.', { summonBonusPct: 25, extraStatus: [{ id: 'slow', chance: 0.5, duration: 2, potency: 0.3 }] }),
  // monge
  M('punhos-relampago', 'tempestade-de-maos', 'Tempestade de Mãos', 'Cada rajada ganha um golpe extra.', { extraHits: 1, multPct: -10 }),
  M('punhos-relampago', 'condutor-perfeito', 'Condutor Perfeito', 'O choque salta em corrente entre inimigos.', { chainCount: 2 }),
  M('chute-giratorio', 'furacao', 'Furacão', 'O giro cresce e varre uma área muito maior.', { radiusPct: 45, multPct: 10 }),
  M('chute-giratorio', 'giro-ascendente', 'Giro Ascendente', 'O chute arremessa e atordoa os mais leves.', { extraStatus: [{ id: 'stun', chance: 0.45, duration: 1 }] }),
  M('respiracao-focada', 'fluxo-interno', 'Fluxo Interno', 'A respiração também acelera o corpo.', { hasteOnCast: 3, cooldownPct: 15 }),
  M('respiracao-focada', 'pele-de-bronze', 'Pele de Bronze', 'A respiração forja um escudo de disciplina.', { selfShieldOnCast: 25 }),
  M('passo-trovao', 'trovoada-dupla', 'Trovoada Dupla', 'O passo relampeja duas vezes.', { extraHits: 1 }),
  M('passo-trovao', 'eco-eletrico', 'Eco Elétrico', 'O trovão ecoa em corrente pelos inimigos próximos.', { chainCount: 2, multPct: 10 }),
  // engenheira
  M('torre-runica', 'torre-gemea', 'Torre Gêmea', 'Uma segunda torre entra em operação.', { extraCharge: 1, summonBonusPct: -10 }),
  M('torre-runica', 'nucleo-superaquecido', 'Núcleo Superaquecido', 'A torre dispara muito mais forte e incendeia.', { summonBonusPct: 30, extraStatus: [{ id: 'burn', chance: 0.3, duration: 2, potency: 0.1 }] }),
  M('bomba-pulso', 'pulso-expandido', 'Pulso Expandido', 'A onda de choque cobre o dobro da área.', { radiusPct: 50 }),
  M('bomba-pulso', 'estilhacos-runicos', 'Estilhaços Rúnicos', 'A bomba libera estilhaços que rasgam armaduras.', { extraStatus: [{ id: 'armorbreak', chance: 0.7, duration: 4, potency: 0.3 }] }),
  M('campo-defensivo', 'campo-espelhado', 'Campo Espelhado', 'O campo absorve muito mais impacto.', { multPct: 45 }),
  M('campo-defensivo', 'gerador-portatil', 'Gerador Portátil', 'O campo recarrega bem mais rápido.', { cooldownPct: 25 }),
  M('drone-reparador', 'enxame-de-drones', 'Enxame de Drones', 'Um segundo drone acompanha os reparos.', { extraCharge: 1 }),
  M('drone-reparador', 'solda-de-campo', 'Solda de Campo', 'Os reparos são muito mais eficientes.', { multPct: 40, durationPct: 30 }),
  // necromante
  M('toque-sombrio', 'dedos-gelados', 'Dedos Gelados', 'O toque também retarda a vítima.', { extraStatus: [{ id: 'slow', chance: 0.8, duration: 3, potency: 0.35 }] }),
  M('toque-sombrio', 'fome-antiga', 'Fome Antiga', 'O dreno devolve muito mais vida.', { multPct: 30, onKillHeal: 3 }),
  M('erguer-servo', 'fileira-de-ossos', 'Fileira de Ossos', 'Um servo extra se levanta a cada chamado.', { extraCharge: 1, summonBonusPct: -10 }),
  M('erguer-servo', 'ossos-blindados', 'Ossos Blindados', 'Os servos voltam maiores e mais duros.', { summonBonusPct: 30 }),
  M('explodir-servo', 'detonacao-em-cadeia', 'Detonação em Cadeia', 'A explosão cobre uma área bem maior.', { radiusPct: 45 }),
  M('explodir-servo', 'cinzas-uteis', 'Cinzas Úteis', 'Explodir um servo devolve a recarga mais rápido e cura.', { cooldownPct: 25, onKillHeal: 3 }),
  M('pacto-palido', 'pacto-vermelho', 'Pacto Vermelho', 'O pacto rende muito mais poder pelo mesmo preço.', { multPct: 40, durationPct: 20 }),
  M('pacto-palido', 'clausula-oculta', 'Cláusula Oculta', 'O pacto concede um escudo junto do poder.', { selfShieldOnCast: 25 }),
  // alquimista
  M('frasco-acido', 'acido-concentrado', 'Ácido Concentrado', 'A corrosão é muito mais agressiva.', { dotPct: 40, extraStatus: [{ id: 'armorbreak', chance: 0.5, duration: 4, potency: 0.2 }] }),
  M('frasco-acido', 'respingo-largo', 'Respingo Largo', 'O frasco respinga em mais um alvo.', { ricochet: 1 }),
  M('bomba-toxica', 'nevoa-densa', 'Névoa Densa', 'A nuvem tóxica cobre muito mais chão e dura mais.', { radiusPct: 35, durationPct: 35 }),
  M('bomba-toxica', 'toxina-paralisante', 'Toxina Paralisante', 'O veneno também amolece os músculos.', { extraStatus: [{ id: 'slow', chance: 0.8, duration: 3, potency: 0.3 }] }),
  M('elixir-instavel', 'formula-estabilizada', 'Fórmula Estabilizada', 'O elixir sempre rende o efeito máximo.', { multPct: 40 }),
  M('elixir-instavel', 'gole-duplo', 'Gole Duplo', 'O elixir volta a estar pronto muito mais rápido.', { cooldownPct: 28 }),
  M('catalisador', 'reacao-violenta', 'Reação Violenta', 'A reação detona com força brutal.', { multPct: 40 }),
  M('catalisador', 'catalise-continua', 'Catálise Contínua', 'Alvos mortos pela reação espalham os venenos restantes.', { spreadOnKill: true, explodeOnKill: 20 }),
];

export const EVOLUTIONS: MorphDef[] = [
  // guerreiro
  M('golpe-pesado', 'juizo-da-muralha', 'Juízo da Muralha', 'O golpe definitivo: devastador contra tudo que for grande.', { multPct: 50, vsEliteBoss: 30 }),
  M('golpe-pesado', 'avalanche-de-ferro', 'Avalanche de Ferro', 'O golpe cai duas vezes e racha o chão.', { extraHits: 1, multPct: 20, extraStatus: [{ id: 'stun', chance: 0.3, duration: 1 }] }),
  M('escudo-erguido', 'fortaleza-viva', 'Fortaleza Viva', 'Enquanto o escudo durar, Baldur é a própria muralha.', { multPct: 60, durationPct: 40, cooldownPct: 15 }),
  M('escudo-erguido', 'muro-intransponivel', 'Muro Intransponível', 'O escudo devolve provocação e proteção em dobro.', { selfShieldOnCast: 40, extraStatus: [{ id: 'taunted', chance: 1, duration: 4 }] }),
  M('provocacao-ferro', 'ultimato-de-aco', 'Ultimato de Aço', 'A provocação vira sentença: inimigos frágeis e expostos.', { extraStatus: [{ id: 'vulnerable', chance: 1, duration: 6, potency: 0.3 }, { id: 'weaken', chance: 1, duration: 6, potency: 0.3 }] }),
  M('provocacao-ferro', 'chamado-do-abismo', 'Chamado do Abismo', 'O grito alcança a sala inteira e dura uma eternidade.', { radiusPct: 60, durationPct: 60 }),
  M('martelo-sismico', 'terremoto', 'Terremoto', 'A terra inteira responde ao martelo.', { radiusPct: 60, multPct: 30, extraStatus: [{ id: 'slow', chance: 1, duration: 3, potency: 0.4 }] }),
  M('martelo-sismico', 'nucleo-partido', 'Núcleo Partido', 'O martelo abre fendas que engolem a defesa inimiga.', { ignoreDefense: 0.3, multPct: 35 }),
  // arqueira
  M('disparo-preciso', 'olho-da-tempestade', 'Olho da Tempestade', 'Todo disparo é crítico em potencial devastador.', { critChance: 0.35, multPct: 25 }),
  M('disparo-preciso', 'flecha-fantasma', 'Flecha Fantasma', 'A flecha atravessa fileiras inteiras.', { ricochet: 3, ignoreDefense: 0.2 }),
  M('chuva-flechas', 'ceu-negro', 'Céu Negro', 'O céu desaparece; sobram flechas.', { radiusPct: 50, multPct: 35 }),
  M('chuva-flechas', 'monsao-farpada', 'Monção Farpada', 'A chuva sangra e nunca parece acabar.', { extraStatus: [{ id: 'bleed', chance: 0.8, duration: 5, potency: 0.2 }], durationPct: 40 }),
  M('recuo-rapido', 'danca-do-vento', 'Dança do Vento', 'O recuo vira coreografia letal: rápido, protegido, mortal.', { cooldownPct: 30, multPct: 40, hasteOnCast: 2 }),
  M('recuo-rapido', 'sombra-da-cacadora', 'Sombra da Caçadora', 'Recuar apaga Lyra do mundo por um instante precioso.', { durationPct: 60, selfShieldOnCast: 20 }),
  M('marca-cacada', 'sentenca-da-presa', 'Sentença da Presa', 'A presa marcada já está morta; só falta avisar.', { multPct: 40, durationPct: 50 }),
  M('marca-cacada', 'marca-dupla', 'Marca Dupla', 'A marca salta para o próximo alvo ao morrer o primeiro.', { spreadOnKill: true, onKillReset: 0.4 }),
  // mago
  M('bola-de-fogo', 'sol-em-miniatura', 'Sol em Miniatura', 'A bola de fogo vira uma estrela cadente pessoal.', { multPct: 50, radiusPct: 40 }),
  M('bola-de-fogo', 'fenix-encapsulada', 'Fênix Encapsulada', 'A explosão renasce: acertos fatais devolvem a magia.', { onKillReset: 0.5, extraStatus: [{ id: 'burn', chance: 1, duration: 4, potency: 0.2 }] }),
  M('chao-ardente', 'inferno-pessoal', 'Inferno Pessoal', 'O chão vira um mar de lava inescapável.', { dotPct: 60, radiusPct: 40, durationPct: 40 }),
  M('chao-ardente', 'cinzas-que-abracam', 'Cinzas que Abraçam', 'As chamas grudam e seguem os fugitivos.', { extraStatus: [{ id: 'slow', chance: 1, duration: 3, potency: 0.35 }], dotPct: 35 }),
  M('escudo-arcano', 'veu-do-arquimago', 'Véu do Arquimago', 'O escudo definitivo: quase impenetrável e sempre pronto.', { multPct: 70, cooldownPct: 25 }),
  M('escudo-arcano', 'retribuicao-arcana', 'Retribuição Arcana', 'Cada conjuração ergue uma barreira e acelera a próxima.', { selfShieldOnCast: 30, hasteOnCast: 3 }),
  M('meteoro-menor', 'meteoro-maior', 'Meteoro Maior', 'Deixou de ser menor.', { multPct: 60, radiusPct: 45, extraStatus: [{ id: 'stun', chance: 0.5, duration: 1.4 }] }),
  M('meteoro-menor', 'chuva-celeste', 'Chuva Celeste', 'Três impactos consecutivos riscam o céu.', { extraHits: 2, multPct: -20 }),
  // ladino
  M('punhalada-rapida', 'mil-cortes', 'Mil Cortes', 'A lâmina vira um borrão impossível de contar.', { extraHits: 2, multPct: -15, critChance: 0.15 }),
  M('punhalada-rapida', 'beijo-da-viuva', 'Beijo da Viúva', 'Cada punhalada carrega veneno de aranha-viúva.', { extraStatus: [{ id: 'poison', chance: 1, duration: 5, potency: 0.18 }], dotPct: 30 }),
  M('corte-sangrento', 'rio-vermelho', 'Rio Vermelho', 'O sangramento vira hemorragia catastrófica.', { dotPct: 70, durationPct: 40 }),
  M('corte-sangrento', 'colheita-rubra', 'Colheita Rubra', 'Alvos sangrando explodem ao morrer.', { explodeOnKill: 45, spreadOnKill: true }),
  M('sumir-sombras', 'rei-das-vielas', 'Rei das Vielas', 'O bote saído das sombras é simplesmente injusto.', { multPct: 60, critChance: 0.25 }),
  M('sumir-sombras', 'eterno-crepusculo', 'Eterno Crepúsculo', 'As sombras respondem cada vez mais rápido.', { cooldownPct: 35, durationPct: 40 }),
  M('execucao', 'guilhotina', 'Guilhotina', 'Não existe limiar seguro contra a guilhotina.', { lowHpBonus: 70, multPct: 25 }),
  M('execucao', 'divida-quitada', 'Dívida Quitada', 'Cada execução paga a próxima: reset quase garantido.', { onKillReset: 0.8, onKillHeal: 4 }),
  // clériga
  M('luz-punitiva', 'julgamento-solar', 'Julgamento Solar', 'A luz cai como um veredito inapelável.', { multPct: 55, vsEliteBoss: 25 }),
  M('luz-punitiva', 'coluna-do-amanhecer', 'Coluna do Amanhecer', 'A luz perfura a fileira inteira.', { ricochet: 2, extraStatus: [{ id: 'weaken', chance: 0.8, duration: 4, potency: 0.25 }] }),
  M('cura-serena', 'milagre-menor', 'Milagre Menor', 'A cura beira o milagre: enorme e quase constante.', { multPct: 50, cooldownPct: 25 }),
  M('cura-serena', 'fonte-da-vida', 'Fonte da Vida', 'A cura deixa uma regeneração abundante e duradoura.', { extraStatus: [{ id: 'regen', chance: 1, duration: 8, potency: 0.6 }] }),
  M('circulo-sagrado', 'catedral-de-luz', 'Catedral de Luz', 'O círculo vira um templo: imenso e implacável.', { radiusPct: 60, multPct: 35 }),
  M('circulo-sagrado', 'muralha-de-fe', 'Muralha de Fé', 'Dentro do círculo, Seren é intocável.', { selfShieldOnCast: 35, durationPct: 50 }),
  M('bencao-solar', 'avatar-do-sol', 'Avatar do Sol', 'A bênção transforma Seren na própria manhã.', { multPct: 45, durationPct: 45, hasteOnCast: 3 }),
  M('bencao-solar', 'promessa-do-alvorecer', 'Promessa do Alvorecer', 'A bênção retorna quase sem pausa.', { cooldownPct: 35, selfShieldOnCast: 20 }),
  // druida
  M('espinhos-vivos', 'floresta-de-lancas', 'Floresta de Lanças', 'Os espinhos brotam em todos ao redor.', { ricochet: 2, multPct: 30 }),
  M('espinhos-vivos', 'espinho-do-coracao', 'Espinho do Coração', 'O espinho busca o centro: crítico e enraizador.', { critChance: 0.25, extraStatus: [{ id: 'root', chance: 0.6, duration: 1.5 }] }),
  M('raizes-prendedoras', 'abraco-da-terra', 'Abraço da Terra', 'A terra inteira agarra e não devolve.', { radiusPct: 50, durationPct: 60 }),
  M('raizes-prendedoras', 'raiz-carnivora', 'Raiz Carnívora', 'As raízes mastigam o que seguram.', { dotPct: 50, extraStatus: [{ id: 'poison', chance: 1, duration: 5, potency: 0.18 }] }),
  M('semente-curativa', 'coracao-da-floresta', 'Coração da Floresta', 'A semente carrega a vitalidade de um bosque inteiro.', { multPct: 60, durationPct: 50 }),
  M('semente-curativa', 'ciclo-eterno', 'Ciclo Eterno', 'A semente rebrota quase sem intervalo.', { cooldownPct: 35 }),
  M('lobo-espiritual', 'espirito-da-matilha', 'Espírito da Matilha', 'Dois lobos anciões atendem ao chamado.', { extraCharge: 1, summonBonusPct: 20 }),
  M('lobo-espiritual', 'lobo-alfa', 'Lobo Alfa', 'Um único lobo, mas que vale por uma matilha.', { summonBonusPct: 60 }),
  // monge
  M('punhos-relampago', 'furia-da-tormenta', 'Fúria da Tormenta', 'Os punhos viram a própria tempestade.', { extraHits: 1, chainCount: 2, multPct: 15 }),
  M('punhos-relampago', 'punho-do-primeiro-trovao', 'Punho do Primeiro Trovão', 'Cada rajada carrega o trovão original.', { multPct: 50, extraStatus: [{ id: 'shock', chance: 0.6, duration: 2, potency: 0.15 }] }),
  M('chute-giratorio', 'roda-do-destino', 'Roda do Destino', 'O giro não termina até a sala terminar.', { radiusPct: 55, multPct: 35 }),
  M('chute-giratorio', 'tornado-humano', 'Tornado Humano', 'O giro arremessa tudo e atordoa metade.', { extraStatus: [{ id: 'stun', chance: 0.5, duration: 1.2 }], extraHits: 1 }),
  M('respiracao-focada', 'transe-do-trovao', 'Transe do Trovão', 'A respiração vira transe: cura, escudo e velocidade.', { multPct: 40, selfShieldOnCast: 25, hasteOnCast: 3 }),
  M('respiracao-focada', 'sopro-continuo', 'Sopro Contínuo', 'A técnica quase não precisa de pausa.', { cooldownPct: 35, durationPct: 40 }),
  M('passo-trovao', 'relampago-encarnado', 'Relâmpago Encarnado', 'Kaelin deixa de imitar o raio: vira um.', { multPct: 50, chainCount: 3 }),
  M('passo-trovao', 'passo-sem-retorno', 'Passo Sem Retorno', 'Cada passo mata e recarrega o próximo.', { onKillReset: 0.6, extraHits: 1 }),
  // engenheira
  M('torre-runica', 'bateria-completa', 'Bateria Completa', 'Duas torres extras completam a linha de tiro.', { extraCharge: 2, summonBonusPct: -10 }),
  M('torre-runica', 'torre-de-cerco', 'Torre de Cerco', 'Uma única torre, calibre de cerco.', { summonBonusPct: 60 }),
  M('bomba-pulso', 'pulso-singular', 'Pulso Singular', 'A detonação dobra de tamanho e de violência.', { radiusPct: 50, multPct: 45 }),
  M('bomba-pulso', 'bomba-de-fragmentacao', 'Bomba de Fragmentação', 'Uma segunda carga explode logo após a primeira.', { extraHits: 1, extraStatus: [{ id: 'armorbreak', chance: 0.6, duration: 4, potency: 0.3 }] }),
  M('campo-defensivo', 'cupula-de-runas', 'Cúpula de Runas', 'O campo vira uma cúpula quase permanente.', { multPct: 55, durationPct: 50 }),
  M('campo-defensivo', 'reator-de-emergencia', 'Reator de Emergência', 'O campo recarrega num piscar e ainda acelera Runa.', { cooldownPct: 35, hasteOnCast: 2.5 }),
  M('drone-reparador', 'oficina-voadora', 'Oficina Voadora', 'Dois drones extras mantêm Runa de pé.', { extraCharge: 2 }),
  M('drone-reparador', 'protocolo-fenix', 'Protocolo Fênix', 'Os reparos beiram a reconstrução total.', { multPct: 60, durationPct: 40 }),
  // necromante
  M('toque-sombrio', 'abraco-do-tumulo', 'Abraço do Túmulo', 'O toque drena em dobro e congela a alma.', { multPct: 50, extraStatus: [{ id: 'slow', chance: 1, duration: 3, potency: 0.4 }] }),
  M('toque-sombrio', 'sifao-de-almas', 'Sifão de Almas', 'Cada morte pelo toque alimenta Morvane.', { onKillHeal: 6, onKillReset: 0.4 }),
  M('erguer-servo', 'legiao-palida', 'Legião Pálida', 'Dois servos extras marcham junto.', { extraCharge: 2, summonBonusPct: -10 }),
  M('erguer-servo', 'cavaleiro-de-ossos', 'Cavaleiro de Ossos', 'Um servo de elite, blindado e brutal.', { summonBonusPct: 60 }),
  M('explodir-servo', 'requiem-explosivo', 'Réquiem Explosivo', 'A detonação vira um funeral coletivo.', { radiusPct: 50, multPct: 45 }),
  M('explodir-servo', 'reciclagem-eficiente', 'Reciclagem Eficiente', 'Explodir um servo devolve outro quase de graça.', { cooldownPct: 35, onKillHeal: 4 }),
  M('pacto-palido', 'pacto-definitivo', 'Pacto Definitivo', 'O contrato final: poder absurdo, letras miúdas.', { multPct: 60, durationPct: 40 }),
  M('pacto-palido', 'sangue-por-sangue', 'Sangue por Sangue', 'O pacto protege quem assina.', { selfShieldOnCast: 40, hasteOnCast: 2 }),
  // alquimista
  M('frasco-acido', 'acido-real', 'Ácido Real', 'A fórmula final corrói até lembranças.', { dotPct: 60, multPct: 30 }),
  M('frasco-acido', 'chuveiro-corrosivo', 'Chuveiro Corrosivo', 'O frasco cobre a fileira inteira de respingos.', { ricochet: 2, extraStatus: [{ id: 'armorbreak', chance: 0.8, duration: 5, potency: 0.3 }] }),
  M('bomba-toxica', 'praga-engarrafada', 'Praga Engarrafada', 'A nuvem vira epidemia: enorme, densa, eterna.', { radiusPct: 50, durationPct: 50, dotPct: 30 }),
  M('bomba-toxica', 'gas-do-riso-amargo', 'Gás do Riso Amargo', 'O veneno enfraquece e retarda quem respira.', { extraStatus: [{ id: 'weaken', chance: 1, duration: 4, potency: 0.25 }, { id: 'slow', chance: 1, duration: 4, potency: 0.3 }] }),
  M('elixir-instavel', 'panaceia', 'Panaceia', 'O elixir perfeito: cura tudo, sempre, muito.', { multPct: 60, cooldownPct: 25 }),
  M('elixir-instavel', 'formula-do-imortal', 'Fórmula do Imortal', 'O elixir concede um escudo alquímico imenso.', { selfShieldOnCast: 45 }),
  M('catalisador', 'reacao-em-cadeia-perfeita', 'Reação em Cadeia Perfeita', 'Cada morte detona a próxima: química aplicada.', { spreadOnKill: true, explodeOnKill: 45, multPct: 25 }),
  M('catalisador', 'obra-prima', 'Obra-Prima', 'A reação definitiva de Fiora, ensaiada a vida toda.', { multPct: 60, radiusPct: 40 }),
];

export const MUTATIONS_BY_SKILL: Record<string, MorphDef[]> = {};
for (const m of MUTATIONS) (MUTATIONS_BY_SKILL[m.skillId] ??= []).push(m);
export const EVOLUTIONS_BY_SKILL: Record<string, MorphDef[]> = {};
for (const m of EVOLUTIONS) (EVOLUTIONS_BY_SKILL[m.skillId] ??= []).push(m);
