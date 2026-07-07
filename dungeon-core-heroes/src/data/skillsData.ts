import type { SkillDef } from '../types';

// ============ AS 40 HABILIDADES (4 por herói) ============

export const SKILLS: SkillDef[] = [
  // ---------------- GUERREIRO ----------------
  {
    id: 'golpe-pesado', heroId: 'guerreiro', nome: 'Golpe Pesado', icon: 'sk-hammer',
    desc: 'Um golpe devastador no alvo mais forte à frente.',
    kind: 'strike', cooldown: 6, mult: 2.6, dmgKind: 'fisico', targeting: 'strongest',
    tags: ['dano', 'alvo-unico', 'fisico', 'chefe'],
  },
  {
    id: 'escudo-erguido', heroId: 'guerreiro', nome: 'Escudo Erguido', icon: 'sk-shield',
    desc: 'Ergue o escudo, reduzindo muito o dano recebido por alguns segundos.',
    kind: 'buff', cooldown: 14, mult: 0, duration: 5, dmgKind: 'fisico', targeting: 'self',
    status: [{ id: 'shieldup', chance: 1, duration: 5, potency: 0.55 }],
    tags: ['defesa', 'reducao-dano', 'sobrevivencia', 'bloqueio'],
  },
  {
    id: 'provocacao-ferro', heroId: 'guerreiro', nome: 'Provocação de Ferro', icon: 'sk-taunt',
    desc: 'Um rugido que enfraquece o ataque de todos os inimigos próximos.',
    kind: 'debuff', cooldown: 12, mult: 0.6, radius: 4, dmgKind: 'fisico', targeting: 'cluster',
    status: [{ id: 'weaken', chance: 1, duration: 6, potency: 0.3 }],
    tags: ['controle', 'debuff', 'area', 'defesa'],
  },
  {
    id: 'martelo-sismico', heroId: 'guerreiro', nome: 'Martelo Sísmico', icon: 'sk-quake',
    desc: 'Esmaga o chão: dano em área com chance de atordoar.',
    kind: 'aoe', cooldown: 11, mult: 1.7, radius: 3, dmgKind: 'fisico', targeting: 'cluster',
    status: [{ id: 'stun', chance: 0.45, duration: 1.4 }],
    tags: ['area', 'atordoamento', 'controle', 'dano'],
  },
  // ---------------- ARQUEIRA ----------------
  {
    id: 'disparo-preciso', heroId: 'arqueira', nome: 'Disparo Preciso', icon: 'sk-arrow',
    desc: 'Flecha certeira no alvo mais perigoso, com alta chance de crítico.',
    kind: 'strike', cooldown: 5, mult: 2.3, dmgKind: 'fisico', targeting: 'elite-first',
    tags: ['dano', 'critico', 'alvo-unico', 'elite'],
  },
  {
    id: 'chuva-flechas', heroId: 'arqueira', nome: 'Chuva de Flechas', icon: 'sk-rain',
    desc: 'Uma saraivada cai sobre o grupo inimigo.',
    kind: 'aoe', cooldown: 10, mult: 1.5, radius: 3.5, dmgKind: 'fisico', targeting: 'cluster',
    tags: ['area', 'dano', 'horda'],
  },
  {
    id: 'recuo-rapido', heroId: 'arqueira', nome: 'Recuo Rápido', icon: 'sk-dash',
    desc: 'Salta para trás, ganhando velocidade e esquiva.',
    kind: 'dash', cooldown: 9, mult: 0.5, dmgKind: 'fisico', targeting: 'self', duration: 3,
    status: [{ id: 'dodgeup', chance: 1, duration: 3, potency: 0.35 }, { id: 'hasteup', chance: 1, duration: 3, potency: 0.3 }],
    tags: ['mobilidade', 'esquiva', 'sobrevivencia'],
  },
  {
    id: 'marca-cacada', heroId: 'arqueira', nome: 'Marca da Caçada', icon: 'sk-mark',
    desc: 'Marca o inimigo mais forte: ele recebe muito mais dano.',
    kind: 'debuff', cooldown: 13, mult: 0.8, dmgKind: 'fisico', targeting: 'strongest',
    status: [{ id: 'mark', chance: 1, duration: 8, potency: 0.3 }],
    tags: ['elite', 'chefe', 'marca', 'amplificar'],
  },
  // ---------------- MAGO ----------------
  {
    id: 'bola-de-fogo', heroId: 'mago', nome: 'Bola de Fogo', icon: 'sk-fireball',
    desc: 'Projétil flamejante que estoura no impacto.',
    kind: 'strike', cooldown: 4.5, mult: 2.0, radius: 1.2, dmgKind: 'fogo', targeting: 'nearest',
    status: [{ id: 'burn', chance: 0.35, duration: 3, potency: 0.16 }],
    tags: ['fogo', 'dano', 'queimadura', 'explosao'],
  },
  {
    id: 'chao-ardente', heroId: 'mago', nome: 'Chão Ardente', icon: 'sk-ground-fire',
    desc: 'Incendeia o solo sob os inimigos, queimando quem pisa.',
    kind: 'dot-aoe', cooldown: 12, mult: 0.5, radius: 3.2, duration: 5, dotDps: 0.42, dmgKind: 'fogo', targeting: 'cluster',
    tags: ['fogo', 'area', 'dot', 'queimadura'],
  },
  {
    id: 'escudo-arcano', heroId: 'mago', nome: 'Escudo Arcano', icon: 'sk-arcane-shield',
    desc: 'Barreira mágica que absorve dano.',
    kind: 'buff', cooldown: 15, mult: 0, shieldMult: 3.2, dmgKind: 'magico', targeting: 'self',
    tags: ['escudo', 'defesa', 'sobrevivencia'],
  },
  {
    id: 'meteoro-menor', heroId: 'mago', nome: 'Meteoro Menor', icon: 'sk-meteor',
    desc: 'Invoca um meteoro: dano enorme em área, recarga longa.',
    kind: 'aoe', cooldown: 22, mult: 4.2, radius: 3.4, dmgKind: 'fogo', targeting: 'cluster',
    status: [{ id: 'burn', chance: 0.6, duration: 3, potency: 0.2 }],
    tags: ['fogo', 'area', 'explosao', 'chefe', 'nuke'],
  },
  // ---------------- LADINO ----------------
  {
    id: 'punhalada-rapida', heroId: 'ladino', nome: 'Punhalada Rápida', icon: 'sk-stab',
    desc: 'Três estocadas velozes com chance crítica aumentada.',
    kind: 'strike', cooldown: 4.5, mult: 0.85, dmgKind: 'fisico', targeting: 'nearest',
    tags: ['dano', 'critico', 'combo', 'alvo-unico'],
  },
  {
    id: 'corte-sangrento', heroId: 'ladino', nome: 'Corte Sangrento', icon: 'sk-bleed',
    desc: 'Abre uma ferida profunda que sangra por vários segundos.',
    kind: 'strike', cooldown: 7, mult: 1.2, dmgKind: 'fisico', targeting: 'strongest',
    status: [{ id: 'bleed', chance: 1, duration: 6, potency: 0.28 }],
    tags: ['sangramento', 'dot', 'elite'],
  },
  {
    id: 'sumir-sombras', heroId: 'ladino', nome: 'Sumir nas Sombras', icon: 'sk-vanish',
    desc: 'Desaparece: esquiva total breve e o próximo golpe é fortalecido.',
    kind: 'buff', cooldown: 13, mult: 0, duration: 2.2, dmgKind: 'sombra', targeting: 'self',
    status: [{ id: 'dodgeup', chance: 1, duration: 2.2, potency: 0.9 }, { id: 'powerup', chance: 1, duration: 4, potency: 0.5 }],
    tags: ['esquiva', 'invisibilidade', 'burst', 'sobrevivencia'],
  },
  {
    id: 'execucao', heroId: 'ladino', nome: 'Execução', icon: 'sk-execute',
    desc: 'Golpe fatal: dano brutal contra inimigos com pouca vida.',
    kind: 'execute', cooldown: 8, mult: 1.6, executeThreshold: 0.35, executeMult: 3.2, dmgKind: 'fisico', targeting: 'lowest-hp',
    tags: ['execucao', 'dano', 'alvo-unico', 'reset'],
  },
  // ---------------- CLÉRIGA ----------------
  {
    id: 'luz-punitiva', heroId: 'clériga', nome: 'Luz Punitiva', icon: 'sk-smite',
    desc: 'Um raio de luz sagrada pune o inimigo mais próximo.',
    kind: 'strike', cooldown: 5, mult: 2.0, dmgKind: 'sagrado', targeting: 'nearest',
    tags: ['sagrado', 'dano', 'anti-morto-vivo'],
  },
  {
    id: 'cura-serena', heroId: 'clériga', nome: 'Cura Serena', icon: 'sk-heal',
    desc: 'Uma prece restaura a vida da heroína.',
    kind: 'heal', cooldown: 11, mult: 0, healMult: 3.4, dmgKind: 'sagrado', targeting: 'self',
    tags: ['cura', 'sobrevivencia', 'regeneracao'],
  },
  {
    id: 'circulo-sagrado', heroId: 'clériga', nome: 'Círculo Sagrado', icon: 'sk-circle',
    desc: 'Consagra o chão: cura a heroína e queima inimigos dentro.',
    kind: 'dot-aoe', cooldown: 14, mult: 0.6, radius: 3, duration: 5, dotDps: 0.3, dmgKind: 'sagrado', targeting: 'cluster',
    healMult: 0.35,
    tags: ['sagrado', 'area', 'cura', 'dot'],
  },
  {
    id: 'bencao-solar', heroId: 'clériga', nome: 'Benção Solar', icon: 'sk-blessing',
    desc: 'Aumenta defesa, cura recebida e dano por um tempo.',
    kind: 'buff', cooldown: 18, mult: 0, duration: 8, dmgKind: 'sagrado', targeting: 'self',
    status: [{ id: 'blessed', chance: 1, duration: 8, potency: 0.3 }],
    tags: ['buff', 'defesa', 'cura', 'duracao'],
  },
  // ---------------- DRUIDA ----------------
  {
    id: 'espinhos-vivos', heroId: 'druida', nome: 'Espinhos Vivos', icon: 'sk-thorns',
    desc: 'Espinhos brotam do chão, ferindo e prendendo por um instante.',
    kind: 'strike', cooldown: 5, mult: 1.7, dmgKind: 'natureza', targeting: 'nearest',
    status: [{ id: 'root', chance: 0.4, duration: 1 }],
    tags: ['natureza', 'dano', 'enraizamento', 'controle'],
  },
  {
    id: 'raizes-prendedoras', heroId: 'druida', nome: 'Raízes Prendedoras', icon: 'sk-roots',
    desc: 'Raízes agarram um grupo inteiro de inimigos.',
    kind: 'debuff', cooldown: 12, mult: 0.7, radius: 3.5, dmgKind: 'natureza', targeting: 'cluster',
    status: [{ id: 'root', chance: 1, duration: 2.6 }],
    tags: ['controle', 'enraizamento', 'area'],
  },
  {
    id: 'semente-curativa', heroId: 'druida', nome: 'Semente Curativa', icon: 'sk-seed',
    desc: 'Planta uma semente que regenera vida gradualmente.',
    kind: 'heal', cooldown: 13, mult: 0, healMult: 0.9, duration: 6, dmgKind: 'natureza', targeting: 'self',
    status: [{ id: 'regen', chance: 1, duration: 6, potency: 0.5 }],
    tags: ['cura', 'regeneracao', 'duracao'],
  },
  {
    id: 'lobo-espiritual', heroId: 'druida', nome: 'Lobo Espiritual', icon: 'sk-wolf',
    desc: 'Invoca um lobo etéreo que luta ao seu lado.',
    kind: 'summon', cooldown: 17, mult: 0, duration: 12, summonId: 'lobo-espiritual', dmgKind: 'natureza', targeting: 'self',
    tags: ['invocacao', 'dano', 'elite'],
  },
  // ---------------- MONGE ----------------
  {
    id: 'punhos-relampago', heroId: 'monge', nome: 'Punhos Relâmpago', icon: 'sk-fists',
    desc: 'Sequência fulminante de golpes que aumenta o combo.',
    kind: 'strike', cooldown: 4, mult: 0.6, dmgKind: 'raio', targeting: 'nearest',
    status: [{ id: 'shock', chance: 0.3, duration: 2, potency: 0.12 }],
    tags: ['combo', 'raio', 'dano', 'choque', 'velocidade'],
  },
  {
    id: 'chute-giratorio', heroId: 'monge', nome: 'Chute Giratório', icon: 'sk-kick',
    desc: 'Giro completo que atinge tudo ao redor.',
    kind: 'aoe', cooldown: 8, mult: 1.4, radius: 2.4, dmgKind: 'fisico', targeting: 'cluster',
    tags: ['area', 'dano', 'combo'],
  },
  {
    id: 'respiracao-focada', heroId: 'monge', nome: 'Respiração Focada', icon: 'sk-breath',
    desc: 'Um instante de foco: cura pequena e esquiva elevada.',
    kind: 'heal', cooldown: 12, mult: 0, healMult: 1.6, duration: 4, dmgKind: 'raio', targeting: 'self',
    status: [{ id: 'dodgeup', chance: 1, duration: 4, potency: 0.3 }],
    tags: ['cura', 'esquiva', 'sobrevivencia'],
  },
  {
    id: 'passo-trovao', heroId: 'monge', nome: 'Passo do Trovão', icon: 'sk-thunder-step',
    desc: 'Avança como um raio através dos inimigos, ferindo todos no caminho.',
    kind: 'dash', cooldown: 10, mult: 1.5, radius: 2.5, dmgKind: 'raio', targeting: 'cluster',
    status: [{ id: 'shock', chance: 0.5, duration: 2, potency: 0.15 }],
    tags: ['mobilidade', 'raio', 'area', 'combo', 'choque'],
  },
  // ---------------- ENGENHEIRA ----------------
  {
    id: 'torre-runica', heroId: 'engenheira', nome: 'Torre Rúnica', icon: 'sk-tower',
    desc: 'Monta uma torre que dispara sozinha nos inimigos.',
    kind: 'summon', cooldown: 15, mult: 0, duration: 12, summonId: 'torre-runica', dmgKind: 'magico', targeting: 'self',
    tags: ['invocacao', 'torre', 'dano', 'tecnologia'],
  },
  {
    id: 'bomba-pulso', heroId: 'engenheira', nome: 'Bomba de Pulso', icon: 'sk-bomb',
    desc: 'Arremessa uma bomba rúnica que explode em área.',
    kind: 'aoe', cooldown: 9, mult: 1.9, radius: 3, dmgKind: 'magico', targeting: 'cluster',
    tags: ['explosao', 'area', 'dano', 'tecnologia'],
  },
  {
    id: 'campo-defensivo', heroId: 'engenheira', nome: 'Campo Defensivo', icon: 'sk-field',
    desc: 'Projeta um campo de força que absorve dano.',
    kind: 'buff', cooldown: 14, mult: 0, shieldMult: 2.8, dmgKind: 'magico', targeting: 'self',
    tags: ['escudo', 'defesa', 'tecnologia'],
  },
  {
    id: 'drone-reparador', heroId: 'engenheira', nome: 'Drone Reparador', icon: 'sk-drone',
    desc: 'Um drone cura a engenheira e recarrega os dispositivos.',
    kind: 'heal', cooldown: 13, mult: 0, healMult: 1.4, duration: 5, dmgKind: 'magico', targeting: 'self',
    status: [{ id: 'regen', chance: 1, duration: 5, potency: 0.4 }],
    tags: ['cura', 'tecnologia', 'invocacao', 'regeneracao'],
  },
  // ---------------- NECROMANTE ----------------
  {
    id: 'toque-sombrio', heroId: 'necromante', nome: 'Toque Sombrio', icon: 'sk-dark-touch',
    desc: 'Drena a vida do inimigo, curando o necromante.',
    kind: 'strike', cooldown: 5, mult: 1.7, dmgKind: 'sombra', targeting: 'nearest',
    healMult: 0.5,
    tags: ['sombra', 'roubo-vida', 'dano', 'cura'],
  },
  {
    id: 'erguer-servo', heroId: 'necromante', nome: 'Erguer Servo', icon: 'sk-skeleton',
    desc: 'Ergue um esqueleto para lutar por você.',
    kind: 'summon', cooldown: 12, mult: 0, duration: 16, summonId: 'servo-esqueleto', dmgKind: 'sombra', targeting: 'self',
    tags: ['invocacao', 'servos', 'sombra'],
  },
  {
    id: 'explodir-servo', heroId: 'necromante', nome: 'Explodir Servo', icon: 'sk-detonate',
    desc: 'Sacrifica um servo numa explosão de ossos e sombra.',
    kind: 'sacrifice', cooldown: 10, mult: 2.6, radius: 3, dmgKind: 'sombra', targeting: 'cluster',
    tags: ['sacrificio', 'explosao', 'area', 'servos'],
  },
  {
    id: 'pacto-palido', heroId: 'necromante', nome: 'Pacto Pálido', icon: 'sk-pact',
    desc: 'Troca parte da vida por poder sombrio temporário.',
    kind: 'buff', cooldown: 16, mult: 0, duration: 7, dmgKind: 'sombra', targeting: 'self',
    status: [{ id: 'powerup', chance: 1, duration: 7, potency: 0.4 }],
    tags: ['sacrificio', 'poder', 'buff', 'risco'],
  },
  // ---------------- ALQUIMISTA ----------------
  {
    id: 'frasco-acido', heroId: 'alquimista', nome: 'Frasco Ácido', icon: 'sk-acid',
    desc: 'Ácido corrói o alvo e derrete sua armadura.',
    kind: 'strike', cooldown: 5, mult: 1.5, dmgKind: 'quimico', targeting: 'strongest',
    status: [{ id: 'acid', chance: 1, duration: 5, potency: 0.14 }, { id: 'armorbreak', chance: 1, duration: 5, potency: 0.4 }],
    tags: ['acido', 'armadura', 'dot', 'debuff'],
  },
  {
    id: 'bomba-toxica', heroId: 'alquimista', nome: 'Bomba Tóxica', icon: 'sk-toxic',
    desc: 'Nuvem de veneno que intoxica um grupo inteiro.',
    kind: 'dot-aoe', cooldown: 10, mult: 0.6, radius: 3.2, duration: 6, dotDps: 0.3, dmgKind: 'quimico', targeting: 'cluster',
    status: [{ id: 'poison', chance: 1, duration: 6, potency: 0.2 }],
    tags: ['veneno', 'area', 'dot'],
  },
  {
    id: 'elixir-instavel', heroId: 'alquimista', nome: 'Elixir Instável', icon: 'sk-elixir',
    desc: 'Bebe um experimento: cura ou proteção, nunca se sabe qual.',
    kind: 'heal', cooldown: 12, mult: 0, healMult: 2.2, shieldMult: 1.6, dmgKind: 'quimico', targeting: 'self',
    tags: ['cura', 'escudo', 'instavel', 'sobrevivencia'],
  },
  {
    id: 'catalisador', heroId: 'alquimista', nome: 'Catalisador', icon: 'sk-catalyst',
    desc: 'Detona todos os venenos e ácidos ativos em dano imediato.',
    kind: 'sacrifice', cooldown: 13, mult: 0.8, radius: 5, dmgKind: 'quimico', targeting: 'cluster',
    tags: ['reacao', 'explosao', 'veneno', 'acido', 'burst'],
  },
];

export const SKILL_BY_ID: Record<string, SkillDef> = {};
export const SKILLS_BY_HERO: Record<string, SkillDef[]> = {};
for (const s of SKILLS) {
  SKILL_BY_ID[s.id] = s;
  (SKILLS_BY_HERO[s.heroId] ??= []).push(s);
}

// custo de essência por nível de habilidade (1→2 ... 9→10)
export const SKILL_COSTS = [100, 180, 300, 500, 800, 1200, 1700, 2300, 3000];

// invocações
export interface SummonDef {
  id: string; nome: string; hp: number; damage: number; attackInterval: number;
  range: number; speed: number; dmgKind: import('../types').DamageKind;
  painter: string; palette: { body: string; accent: string };
}
export const SUMMONS: Record<string, SummonDef> = {
  'lobo-espiritual': { id: 'lobo-espiritual', nome: 'Lobo Espiritual', hp: 120, damage: 14, attackInterval: 1.1, range: 1.2, speed: 3.6, dmgKind: 'natureza', painter: 'wolf', palette: { body: '#7ac088', accent: '#c0f0c8' } },
  'torre-runica': { id: 'torre-runica', nome: 'Torre Rúnica', hp: 90, damage: 12, attackInterval: 0.9, range: 6, speed: 0, dmgKind: 'magico', painter: 'tower', palette: { body: '#8a6a40', accent: '#68b8d8' } },
  'servo-esqueleto': { id: 'servo-esqueleto', nome: 'Servo Esqueleto', hp: 100, damage: 10, attackInterval: 1.3, range: 1.2, speed: 3.0, dmgKind: 'sombra', painter: 'skeleton-servant', palette: { body: '#d8d4c8', accent: '#a8e8b8' } },
};
