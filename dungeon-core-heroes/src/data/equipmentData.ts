import type { EquipDef, EquipSlot, HeroId, Stats } from '../types';

// ============ OS 60 EQUIPAMENTOS FIXOS ============
// perLevel = bônus ganho por nível (nível 1 já aplica 1×)

function E(heroId: HeroId, slot: EquipSlot, id: string, nome: string, desc: string, icon: string, perLevel: Partial<Record<keyof Stats, number>>): EquipDef {
  return { id, heroId, slot, nome, desc, icon, perLevel };
}

export const EQUIPS: EquipDef[] = [
  // ---------------- GUERREIRO ----------------
  E('guerreiro', 'cabeca', 'elmo-muralha', 'Elmo da Muralha', 'Forjado com o ferro do portão que nunca caiu.', 'eq-helm', { hp: 14, defense: 0.7 }),
  E('guerreiro', 'corpo', 'couraca-inabalavel', 'Couraça Inabalável', 'Cada amassado é uma batalha vencida.', 'eq-chest', { hp: 20, defense: 1.1, magicDefense: 0.6 }),
  E('guerreiro', 'arma', 'martelo-bastiao', 'Martelo do Bastião', 'Pesado como a promessa que ele carrega.', 'eq-hammer', { power: 1.5, bossDamage: 0.008 }),
  E('guerreiro', 'botas', 'botas-bastiao', 'Botas do Bastião', 'Firmes como raízes de pedra.', 'eq-boots', { speed: 0.02, defense: 0.5, dodge: 0.002 }),
  E('guerreiro', 'amuleto', 'amuleto-juramento', 'Amuleto do Juramento', 'As palavras gravadas nunca desbotam.', 'eq-amulet', { hp: 10, blockChance: 0.006, shieldPower: 0.02 }),
  E('guerreiro', 'anel', 'anel-guardiao', 'Anel do Guardião', 'Aperta o dedo quando o perigo se aproxima.', 'eq-ring', { defense: 0.5, eliteDamage: 0.008, healBonus: 0.01 }),
  // ---------------- ARQUEIRA ----------------
  E('arqueira', 'cabeca', 'capuz-sombras', 'Capuz das Sombras', 'Costurado com o silêncio da meia-noite.', 'eq-hood', { hp: 9, dodge: 0.004, critChance: 0.002 }),
  E('arqueira', 'corpo', 'tunica-vento', 'Túnica do Vento', 'Leve o bastante para não atrapalhar o vento.', 'eq-tunic', { hp: 13, dodge: 0.004, speed: 0.02 }),
  E('arqueira', 'arma', 'arco-lua-fina', 'Arco da Lua Fina', 'A corda canta uma nota que só os alvos ouvem.', 'eq-bow', { power: 1.6, critChance: 0.004 }),
  E('arqueira', 'botas', 'botas-silenciosas', 'Botas Silenciosas', 'Nem as folhas secas a denunciam.', 'eq-boots', { speed: 0.035, dodge: 0.005 }),
  E('arqueira', 'amuleto', 'amuleto-cacador', 'Amuleto do Caçador', 'Um dente da primeira presa. Nunca erra duas vezes.', 'eq-amulet', { eliteDamage: 0.012, cdr: 0.004 }),
  E('arqueira', 'anel', 'anel-mira', 'Anel da Mira', 'Gira sozinho apontando para o coração do alvo.', 'eq-ring', { critChance: 0.005, critMult: 0.015 }),
  // ---------------- MAGO ----------------
  E('mago', 'cabeca', 'coroa-cinzas', 'Coroa de Cinzas', 'Ainda quente. Sempre quente.', 'eq-crown', { hp: 8, spellPower: 1.1 }),
  E('mago', 'corpo', 'manto-chamuscado', 'Manto Chamuscado', 'O tecido lembra do fogo — e retribui.', 'eq-robe', { hp: 12, magicDefense: 0.9, shieldPower: 0.02 }),
  E('mago', 'arma', 'cajado-brasa', 'Cajado da Brasa', 'No topo, uma brasa que nunca apaga.', 'eq-staff', { power: 1.4, spellPower: 1.3 }),
  E('mago', 'botas', 'sandalias-arcanas', 'Sandálias Arcanas', 'Flutuam um dedo acima do chão queimado.', 'eq-boots', { speed: 0.025, dodge: 0.003, cdr: 0.003 }),
  E('mago', 'amuleto', 'amuleto-fogo-vivo', 'Amuleto do Fogo Vivo', 'Bate como um segundo coração, mais quente.', 'eq-amulet', { dotDamage: 0.015, cdr: 0.004 }),
  E('mago', 'anel', 'anel-faisca', 'Anel da Faísca', 'Solta fagulhas quando o portador se irrita.', 'eq-ring', { critChance: 0.004, areaBonus: 0.008 }),
  // ---------------- LADINO ----------------
  E('ladino', 'cabeca', 'mascara-carmesim', 'Máscara Carmesim', 'Ninguém lembra do rosto. Todos lembram da cor.', 'eq-mask', { hp: 9, critChance: 0.003, dodge: 0.003 }),
  E('ladino', 'corpo', 'jaqueta-vielas', 'Jaqueta das Vielas', 'Tem mais bolsos que a guarda tem perguntas.', 'eq-jacket', { hp: 13, dodge: 0.005, speed: 0.015 }),
  E('ladino', 'arma', 'adagas-gemeas', 'Adagas Gêmeas', 'Uma para a pergunta, outra para a resposta.', 'eq-daggers', { power: 1.3, critMult: 0.02 }),
  E('ladino', 'botas', 'botas-beco', 'Botas do Beco', 'Conhecem cada atalho da cidade baixa.', 'eq-boots', { speed: 0.03, dodge: 0.005 }),
  E('ladino', 'amuleto', 'amuleto-assassino', 'Amuleto do Assassino', 'Fica frio perto de alvos que valem a pena.', 'eq-amulet', { eliteDamage: 0.012, lifesteal: 0.003 }),
  E('ladino', 'anel', 'anel-corte-final', 'Anel do Corte Final', 'O último corte sempre leva a assinatura dele.', 'eq-ring', { critChance: 0.005, dotDamage: 0.012 }),
  // ---------------- CLÉRIGA ----------------
  E('clériga', 'cabeca', 'tiara-solar', 'Tiara Solar', 'Um raio de sol preso em ouro.', 'eq-tiara', { hp: 12, healBonus: 0.012 }),
  E('clériga', 'corpo', 'couraca-aurora', 'Couraça da Aurora', 'Reflete a primeira luz — e devolve a escuridão.', 'eq-chest', { hp: 18, defense: 0.8, magicDefense: 0.8 }),
  E('clériga', 'arma', 'cetro-luminoso', 'Cetro Luminoso', 'Pesa pouco; a fé faz o resto.', 'eq-scepter', { power: 1.2, spellPower: 1.2 }),
  E('clériga', 'botas', 'grevas-douradas', 'Grevas Douradas', 'Cada passo deixa um brilho breve no chão.', 'eq-boots', { speed: 0.02, defense: 0.5 }),
  E('clériga', 'amuleto', 'amuleto-fe', 'Amuleto da Fé', 'Aquece as mãos nas horas mais escuras.', 'eq-amulet', { healBonus: 0.015, shieldPower: 0.02 }),
  E('clériga', 'anel', 'anel-manha', 'Anel da Manhã', 'Promete que o sol sempre volta.', 'eq-ring', { regenPerSec: 0.06, magicDefense: 0.5 }),
  // ---------------- DRUIDA ----------------
  E('druida', 'cabeca', 'coroa-galhos', 'Coroa de Galhos', 'Brota uma folha nova a cada primavera.', 'eq-branch-crown', { hp: 11, dotDamage: 0.01 }),
  E('druida', 'corpo', 'manto-musgo', 'Manto de Musgo', 'Vivo, macio e sempre úmido de orvalho.', 'eq-moss', { hp: 16, regenPerSec: 0.05, defense: 0.5 }),
  E('druida', 'arma', 'cajado-raiz', 'Cajado da Raiz', 'Ainda cresce, devagar, na direção da lua.', 'eq-root-staff', { power: 1.3, spellPower: 1.1 }),
  E('druida', 'botas', 'botas-terra-umida', 'Botas de Terra Úmida', 'A floresta reconhece os passos e abre caminho.', 'eq-boots', { speed: 0.02, dodge: 0.003, regenPerSec: 0.03 }),
  E('druida', 'amuleto', 'amuleto-floresta', 'Amuleto da Floresta', 'Dentro dele, uma semente que sonha.', 'eq-amulet', { summonPower: 0.02, healBonus: 0.01 }),
  E('druida', 'anel', 'anel-seiva', 'Anel da Seiva', 'Pulsa devagar, no ritmo das árvores.', 'eq-ring', { dotDamage: 0.012, cdr: 0.004 }),
  // ---------------- MONGE ----------------
  E('monge', 'cabeca', 'faixa-trovao', 'Faixa do Trovão', 'Tingida pelo clarão de cem tempestades.', 'eq-headband', { hp: 10, dodge: 0.004, moveDamage: 0.004 }),
  E('monge', 'corpo', 'tunica-tempestade', 'Túnica da Tempestade', 'Estala baixinho quando ele se move.', 'eq-tunic', { hp: 14, dodge: 0.005, magicDefense: 0.5 }),
  E('monge', 'arma', 'manoplas-eletricas', 'Manoplas Elétricas', 'Os nós dos dedos faíscam antes do impacto.', 'eq-gauntlets', { power: 1.2, attackInterval: -0.008 }),
  E('monge', 'botas', 'sandalias-relampago', 'Sandálias do Relâmpago', 'Chegam ao destino um instante antes dele.', 'eq-boots', { speed: 0.04, moveDamage: 0.005 }),
  E('monge', 'amuleto', 'amuleto-foco', 'Amuleto do Foco', 'Silencia o mundo; sobra só o próximo golpe.', 'eq-amulet', { cdr: 0.005, healBonus: 0.01 }),
  E('monge', 'anel', 'anel-combo', 'Anel do Combo', 'Esquenta a cada golpe encadeado.', 'eq-ring', { critChance: 0.004, attackInterval: -0.005 }),
  // ---------------- ENGENHEIRA ----------------
  E('engenheira', 'cabeca', 'oculos-runa', 'Óculos de Runa', 'Mostram o mundo em linhas de energia.', 'eq-goggles', { hp: 10, summonPower: 0.015 }),
  E('engenheira', 'corpo', 'casaco-mecanico', 'Casaco Mecânico', 'Metade tecido, metade engrenagem, todo orgulho.', 'eq-coat', { hp: 15, defense: 0.6, shieldPower: 0.02 }),
  E('engenheira', 'arma', 'chave-runica', 'Chave Rúnica', 'Aperta parafusos e crânios com igual precisão.', 'eq-wrench', { power: 1.3, spellPower: 1.0 }),
  E('engenheira', 'botas', 'botas-engrenagem', 'Botas de Engrenagem', 'Sobem qualquer parede com um clique satisfeito.', 'eq-boots', { speed: 0.025, dodge: 0.003 }),
  E('engenheira', 'amuleto', 'amuleto-nucleo', 'Amuleto do Núcleo', 'Um reator em miniatura, quentinho e levemente ilegal.', 'eq-amulet', { summonPower: 0.02, cdr: 0.004 }),
  E('engenheira', 'anel', 'anel-maquina', 'Anel da Máquina', 'Tiquetaqueia junto com o coração dela.', 'eq-ring', { areaBonus: 0.008, critChance: 0.003 }),
  // ---------------- NECROMANTE ----------------
  E('necromante', 'cabeca', 'coroa-palida', 'Coroa Pálida', 'Osso polido de um rei que se recusou a partir.', 'eq-pale-crown', { hp: 9, summonPower: 0.018 }),
  E('necromante', 'corpo', 'manto-tumulo', 'Manto do Túmulo', 'Cheira a terra fria e segredos guardados.', 'eq-shroud', { hp: 13, magicDefense: 0.8, lifesteal: 0.002 }),
  E('necromante', 'arma', 'cetro-ossos', 'Cetro de Ossos', 'Cada vértebra pertenceu a um voluntário. Provavelmente.', 'eq-bone-scepter', { power: 1.3, spellPower: 1.2 }),
  E('necromante', 'botas', 'botas-funerarias', 'Botas Funerárias', 'Andam em silêncio de cortejo.', 'eq-boots', { speed: 0.02, magicDefense: 0.5 }),
  E('necromante', 'amuleto', 'amuleto-mortos', 'Amuleto dos Mortos', 'Sussurra nomes que ninguém mais lembra.', 'eq-amulet', { summonPower: 0.022, lifesteal: 0.003 }),
  E('necromante', 'anel', 'anel-sacrificio', 'Anel do Sacrifício', 'Sempre pede um pouco mais. Sempre entrega.', 'eq-ring', { spellPower: 0.8, dotDamage: 0.01 }),
  // ---------------- ALQUIMISTA ----------------
  E('alquimista', 'cabeca', 'mascara-destilador', 'Máscara do Destilador', 'Filtra venenos e más ideias. Uma das duas funções falha.', 'eq-alch-mask', { hp: 10, dotDamage: 0.012 }),
  E('alquimista', 'corpo', 'casaco-frascos', 'Casaco dos Frascos', 'Tilinta como um brinde a cada passo.', 'eq-flask-coat', { hp: 14, defense: 0.5, magicDefense: 0.5 }),
  E('alquimista', 'arma', 'luvas-reagente', 'Luvas de Reagente', 'Manchadas com cores que não existem mais.', 'eq-gloves', { power: 1.3, dotDamage: 0.012 }),
  E('alquimista', 'botas', 'botas-laboratorio', 'Botas de Laboratório', 'Sola grossa: o chão do laboratório é história viva.', 'eq-boots', { speed: 0.025, dodge: 0.004 }),
  E('alquimista', 'amuleto', 'amuleto-catalisador', 'Amuleto do Catalisador', 'Vibra quando uma reação está prestes a acontecer.', 'eq-amulet', { areaBonus: 0.01, cdr: 0.004 }),
  E('alquimista', 'anel', 'anel-transmutacao', 'Anel da Transmutação', 'Ontem era chumbo. Não pergunte sobre amanhã.', 'eq-ring', { critChance: 0.003, healBonus: 0.012 }),
];

export const EQUIP_BY_ID: Record<string, EquipDef> = {};
export const EQUIPS_BY_HERO: Record<string, EquipDef[]> = {};
for (const e of EQUIPS) {
  EQUIP_BY_ID[e.id] = e;
  (EQUIPS_BY_HERO[e.heroId] ??= []).push(e);
}

// custo de essência por nível de equipamento (1→2 ... 19→20)
export const EQUIP_COSTS = [
  60, 90, 130, 180, 240,          // 1-5: barato/médio
  310, 390, 480, 580, 700,        // 6-10: médio
  850, 1020, 1220, 1450, 1700,    // 11-15: caro
  2000, 2350, 2750, 3200,         // 16-20: muito caro
];

// níveis especiais (bônus grandes via cartas mais raras)
export const EQUIP_MILESTONES = [5, 10, 15, 20];
export const SKILL_MILESTONES = { mutation: 5, evolution: 10 };

// poção
export const POTION_LEVELS = [
  { level: 1, heal: 0.35, charges: 3, cleanse: false, shield: 0, desc: 'Cura 35% da vida. 3 cargas por run.' },
  { level: 2, heal: 0.40, charges: 3, cleanse: false, shield: 0, desc: 'Cura 40% da vida.' },
  { level: 3, heal: 0.40, charges: 3, cleanse: true, shield: 0, desc: 'Também remove veneno, sangramento e queimadura.' },
  { level: 4, heal: 0.40, charges: 3, cleanse: true, shield: 0.15, desc: 'Concede escudo de 15% da vida por 5s.' },
  { level: 5, heal: 0.45, charges: 4, cleanse: true, shield: 0.15, desc: 'Ganha a 4ª carga e cura 45%.' },
];
export const POTION_COSTS = [150, 400, 900, 1800]; // 1→2 ... 4→5
