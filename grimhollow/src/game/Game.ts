import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import {
  CELL,
  WALL_H,
  ROOF_H,
  ROOF_OVER,
  ROOF_DEPTH,
  FASCIA,
  EYE_H,
  DOOR_W,
  DOOR_H,
  WIN_W,
  WIN_H,
  WIN_Y,
  MOVE_MS,
  TURN_MS,
  FOG_COLOR,
  DAY_MS,
  DAY_START,
} from "./config";
import {
  COLS,
  ROWS,
  cellAt,
  isDungeon,
  isWalkable,
  findStart,
  findForestGate,
  MAP,
} from "./village";
import {
  FOREST_COLS,
  FOREST_ROWS,
  forestCell,
  forestWalkable,
  forestFind,
  forestSignText,
} from "./forest";
import {
  DUNGEON_COLS,
  DUNGEON_ROWS,
  dungeonCell,
  dungeonWalkable,
  dungeonSolidLook,
  dungeonFind,
  dungeonAll,
  setDungeonFloor,
  getDungeonFloor,
  DUNGEON_FLOOR_COUNT,
  DUNGEON_FLOOR_NAMES,
} from "./dungeon";
import {
  STATIONS,
  SHOW_LAST,
  stationPose,
  MOUTH_YAW,
  ENTRY,
  isMouth,
  terraceWalkable,
  terraceCells,
  TERRACE_Y,
  SHOW_STATUE,
  HELIX_CX,
  HELIX_CZ,
  HELIX_RP,
  HELIX_INNER,
  HELIX_OUTER,
  HELIX_STEPS,
  HELIX_TOP,
  CORR_X0,
  CORR_X1,
  CORR_Z,
  SHRINE_CX,
  SHRINE_CZ,
  SHRINE_RADIUS,
  SHOW_STATUE_W,
} from "./showcase";
import * as tex from "./textures";
import { setupControls, type Action, type HUD, type SmithData, type SmithUpgradeResult, type MiniPoi, type MiniDrop, type MiniEnemy, type StoreData, type StoreGood, type TavernData, type TavernQuest, type TavernReward, type ConsumSlot, type StashData, type DialogueChoice, type JournalData, type JournalEntry, type TrackerData, type BagEntry, type EquipUIData, type ItemTip, type TipLine, type TipDelta } from "./controls";
import { audio } from "./audio";
import {
  ROOM,
  ROOM_COLS,
  ROOM_ROWS,
  ESTAB,
  roomFind,
  roomChar,
  roomWalkable,
  type Estab,
} from "./interiors";
import taverneiroUrl from "../assets/npc/taverneiro.png";
import mercadoraUrl from "../assets/npc/mercadora.png";
import ferreiroUrl from "../assets/npc/ferreiro.png";
import alquimistaUrl from "../assets/npc/alquimista.png";
import pipUrl from "../assets/npc/pip.png";
import wilmaUrl from "../assets/npc/wilma.png";
import fazendeiroUrl from "../assets/npc/fazendeiro.png";
import camponesaUrl from "../assets/npc/camponesa.png";
import lenhadorUrl from "../assets/npc/lenhador.png";
import heddaUrl from "../assets/npc/hedda.png";
import costureiraUrl from "../assets/npc/costureira.png";
import guntherUrl from "../assets/npc/gunther.png";
import anselmoUrl from "../assets/npc/anselmo.png";
import tamUrl from "../assets/npc/tam.png";
import lyleUrl from "../assets/npc/lyle.png";
import pine1Url from "../assets/env/pine1.png";
import pine2Url from "../assets/env/pine2.png";
import pine3Url from "../assets/env/pine3.png";
import pine4Url from "../assets/env/pine4.png";
import cluster1Url from "../assets/env/cluster1.png";
import cluster2Url from "../assets/env/cluster2.png";
import signTavernUrl from "../assets/env/sign_tavern.png";
import signStoreUrl from "../assets/env/sign_store.png";
import signSmithUrl from "../assets/env/sign_smith.png";
import signAlchUrl from "../assets/env/sign_alch.png";
// URLs cruas p/ gerar normal maps em runtime (relevo PBR) na masmorra
import texStoneUrl from "../assets/env/tex_stonewall.jpg";
import texCobbleUrl from "../assets/env/tex_cobble.jpg";
import texCaveFloorUrl from "../assets/env/tex_cavefloor.jpg";
import texCaveCeilUrl from "../assets/env/tex_caveceil.jpg";
import propLampUrl from "../assets/env/prop_lamp.png";
import propNoticeUrl from "../assets/env/prop_notice.png";
// FRAGMENT SHADER do céu procedural: gradiente horizonte→zênite + SOL (disco e
// brilho), LUA (disco e halo) e ESTRELAS (hash + cintilar). Cores vêm dos uniforms
// (por etapa do dia). Emite cor linear — o OutputPass tonemapeia e o bloom acende.
const SKY_FRAG = `
  varying vec3 vDir;
  uniform vec3 uTop, uHor, uSun, uSunDir, uMoonDir;
  uniform float uSunI, uStarI, uMoonI, uTime;
  float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  void main(){
    vec3 dir = normalize(vDir);
    float el = dir.y;                                  // elevação (-1..1)
    float g = pow(clamp(el, 0.0, 1.0), 0.55);
    vec3 col = mix(uHor, uTop, g);
    // ---- SOL ---- disco NÍTIDO e grande + brilho amplo + calor no céu perto dele
    float sd = max(dot(dir, normalize(uSunDir)), 0.0);
    float sunGlow = pow(sd, 3.5) * 0.40 + pow(sd, 34.0) * 0.85; // aura
    float sunDisc = smoothstep(0.9958, 0.9974, sd);             // disco (~5°)
    col += uSun * sunGlow * uSunI;
    col = mix(col, uSun * 1.25, sunDisc * uSunI);               // disco sólido por cima
    // ---- LUA ---- disco frio grande + halo (com leve sombreado de "mares")
    float mo = max(dot(dir, normalize(uMoonDir)), 0.0);
    float moonGlow = pow(mo, 24.0) * 0.45;
    float moonDisc = smoothstep(0.9964, 0.9980, mo);            // disco (~5°)
    vec3 moonCol = vec3(0.90, 0.94, 1.0);
    float maria = 0.12 * hash(floor(dir * 700.0));              // manchas sutis
    col += moonCol * moonGlow * uMoonI;
    col = mix(col, moonCol * (1.0 - maria), moonDisc * uMoonI);
    // ESTRELAS: pontos por hash da direção, cintilando, só acima do horizonte
    if (uStarI > 0.01) {
      vec3 sp = floor(dir * 320.0);
      float h = hash(sp);
      float st = smoothstep(0.9968, 1.0, h);
      float tw = 0.55 + 0.45 * sin(uTime * 2.2 + h * 140.0);
      col += vec3(st * uStarI * tw) * smoothstep(0.02, 0.22, el);
    }
    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`;
import bgmVilarejoUrl from "../assets/audio/bgm_vilarejo.mp3";
// ícones dos itens (consumíveis + materiais + cerveja)
import icoPotHpUrl from "../assets/item/pot_hp.png";
import icoPotMpUrl from "../assets/item/pot_mp.png";
import icoBeerUrl from "../assets/item/beer.png";
import icoScrollUrl from "../assets/item/scroll_return.png";
import icoMadeiraUrl from "../assets/item/madeira.png";
import icoMinerioUrl from "../assets/item/minerio.png";
import icoReforcoUrl from "../assets/item/reforco.png";
import enemySkeletonUrl from "../assets/env/enemy_skeleton.png";
import enemyRatoUrl from "../assets/env/enemy_rato.png";
import enemyAranhaUrl from "../assets/env/enemy_aranha.png";
import enemyArqueiroUrl from "../assets/env/enemy_arqueiro.png";
import enemyCarnicalUrl from "../assets/env/enemy_carnical.png";
import enemyCultistaUrl from "../assets/env/enemy_cultista.png";
import enemyBossUrl from "../assets/env/boss_andar3.png";
// ATO II — "As Catacumbas Afogadas" (bioma fúngico afogado, paleta fria)
import enemyAfogadoUrl from "../assets/env/enemy_afogado.png";
import enemyAberracaoUrl from "../assets/env/enemy_aberracao.png";
import enemyLimoUrl from "../assets/env/enemy_limo.png";
import enemyNajaUrl from "../assets/env/enemy_naja.png";
import enemyBossA2Url from "../assets/env/boss_a2.png";
import texA2WallUrl from "../assets/env/tex_a2wall.png";
import texA2FloorUrl from "../assets/env/tex_a2floor.png";
import texA2CeilUrl from "../assets/env/tex_a2ceil.png";
import decMushroomUrl from "../assets/env/dec_mushroom.png";
import portalGifUrl from "../assets/ui/fx/portal.gif";
import deathPoofUrl from "../assets/env/death_poof.png";
// perfis dos inimigos (arte + stats FIXOS + tamanho + alcance de visão).
// arqueiro/cultista ainda atacam corpo-a-corpo (à distância fica p/ depois).
// ai: comportamento ao aggro — "chase" (persegue), "kite" (mantém distância e
// atira), "flee_low" (foge com pouca vida), "relentless" (persegue sem fugir).
// PIRÂMIDE DE LOOT (estilo MMO): a QUANTIDADE e a RARIDADE dependem da FONTE.
//   rar = pesos [Comum, Mágico, Raro, Lendário].  tierB = bônus no tier do item.
//   slots = chances independentes de cada peça (mobs);  min/max = nº fixo (chefe/baús).
// Mobs comuns DESPEJAM muito item, quase tudo Comum; o TOPO (Raro/Lendário) vem
// concentrado em CHEFES e BAÚS ESCONDIDOS — o "chase" do jogo.
type LootProfile = { rar: [number, number, number, number]; tierB: number; slots?: number[]; min?: number; max?: number };
const LOOT_PROFILES: Record<string, LootProfile> = {
  normal: { rar: [82, 16, 2, 0],  tierB: 0, slots: [0.22] },       // raro cair item — comum dá é OURO
  mini:   { rar: [44, 42, 13, 1], tierB: 0, slots: [0.60, 0.15] }, // elite: ~0.75 peça, mix melhor
  boss:   { rar: [0, 36, 49, 15], tierB: 1, min: 3, max: 5 },      // fonte-CHAVE de topo
  chest:  { rar: [24, 46, 24, 6], tierB: 0, slots: [1, 0.45] },    // baú comum: bom
  hidden: { rar: [0, 22, 50, 28], tierB: 1, min: 2, max: 3 },      // BAÚ ESCONDIDO: o melhor loot
};

// spd: ms por passo (rato ágil, carniçal lento). ranged/proj = ataque à distância.
const ENEMY_TYPES: Record<string, {
  art: string; hp: number; atk: number; xp: number; gold: number; vision: number; h: number;
  lvl?: number; // "nível" do inimigo → o XP recebido diminui se o herói o supera muito
  ranged?: boolean; melee?: boolean; range?: number; proj?: string; ai?: string; spd?: number;
  tier?: "normal" | "mini" | "boss";
}> = {
  // BALANCE (Difícil): atk calibrado p/ a mitigação por Defesa/Res.Mág. — o tanque
  // amortece bem, os frágeis precisam esquivar/kitar. rato/aranha são a introdução leve.
  rato:      { art: enemyRatoUrl,     hp: 16, atk: 5,  xp: 12, gold: 4,  vision: 5, h: 1.7, lvl: 1, ai: "flee_low", spd: 600 },
  aranha:    { art: enemyAranhaUrl,   hp: 22, atk: 8,  xp: 16, gold: 5,  vision: 4, h: 2.0, lvl: 1, ai: "chase", spd: 660 },
  esqueleto: { art: enemySkeletonUrl, hp: 30, atk: 11, xp: 22, gold: 6,  vision: 5, h: 2.6, lvl: 2, ai: "chase", spd: 780 },
  // arqueiro: SÓ à distância (flecha). cultista: distância (orbe) E melee (adaga). Ambos "kite".
  // arqueiro anda BEM devagar (não fica correndo p/ manter distância) — spd alto.
  arqueiro:  { art: enemyArqueiroUrl, hp: 26, atk: 10, xp: 24, gold: 7,  vision: 7, h: 2.6, lvl: 2, melee: false, ranged: true, range: 6, proj: "arrow", ai: "kite", spd: 1180 },
  carnical:  { art: enemyCarnicalUrl, hp: 48, atk: 16, xp: 32, gold: 9,  vision: 4, h: 2.8, lvl: 3, ai: "relentless", spd: 900, tier: "mini" },
  // cultista: conjura de longe, mas COLA no herói p/ usar a adaga quando ele chega
  // perto (ai "caster"). Velocidade parecida com a do arqueiro.
  cultista:  { art: enemyCultistaUrl, hp: 34, atk: 14, xp: 34, gold: 11, vision: 7, h: 2.7, lvl: 3, ranged: true, melee: true, range: 6, proj: "orb", ai: "caster", spd: 1150 },
  // CHEFE do 3º andar: grandão, muito HP/dano, IMPLACÁVEL. Visão LONGA (enxerga o
  // herói de dentro do breu) e AVANÇA rápido (charge agressivo). Recompensa gorda.
  // HP alto p/ uma luta longa e "aprende o padrão"; dano punitivo (Difícil).
  boss:      { art: enemyBossUrl,     hp: 320, atk: 30, xp: 340, gold: 150, vision: 13, h: 4.4, lvl: 6, ai: "relentless", spd: 700, tier: "boss" },
  // ===== ATO II — roster afogado/fúngico (andares 4-6; herói ~nv6-10) =====
  // afogado: o "esqueleto" do Ato II — morto-vivo encharcado, avança direto.
  afogado:   { art: enemyAfogadoUrl,  hp: 56, atk: 18, xp: 42, gold: 11, vision: 5, h: 2.8, lvl: 4, ai: "chase", spd: 820 },
  // limo: gosma cáustica — lenta, encalha o herói (tanque leve corpo-a-corpo).
  limo:      { art: enemyLimoUrl,     hp: 68, atk: 15, xp: 40, gold: 9,  vision: 4, h: 1.9, lvl: 4, ai: "chase", spd: 1050 },
  // naja: serpente das profundezas — cospe veneno à distância (kite).
  naja:      { art: enemyNajaUrl,     hp: 46, atk: 17, xp: 50, gold: 13, vision: 7, h: 2.7, lvl: 5, ranged: true, melee: true, range: 6, proj: "orb", ai: "kite", spd: 1120 },
  // aberração: tanque fúngico — muito HP, IMPLACÁVEL (mini-elite do Ato II).
  aberracao: { art: enemyAberracaoUrl, hp: 105, atk: 25, xp: 66, gold: 18, vision: 5, h: 3.1, lvl: 5, ai: "relentless", spd: 880, tier: "mini" },
  // CHEFE do Ato II — o Leviatã Afogado. Maior e mais duro que o do Ato I.
  boss_a2:   { art: enemyBossA2Url,   hp: 520, atk: 40, xp: 640, gold: 280, vision: 13, h: 4.8, lvl: 9, ai: "relentless", spd: 680, tier: "boss" },
};
import decWindowUrl from "../assets/env/dec_window.png";
import decDoorUrl from "../assets/env/dec_door.png";
import decChestUrl from "../assets/env/dec_chest.png";
import decChestOpenUrl from "../assets/env/dec_chest_open.png";
import decTorchUrl from "../assets/env/dec_torch.png";
import decIvyUrl from "../assets/env/dec_ivy.png";
import decBannerUrl from "../assets/env/dec_banner.png";
import decCracksUrl from "../assets/env/dec_cracks.png";
import decGateFrameUrl from "../assets/env/dec_gate_frame.png";
import decGateBarsUrl from "../assets/env/dec_gate_bars.png";
import fxFireballUrl from "../assets/ui/fx/fx_fireball.png";
import fxIceUrl from "../assets/ui/fx/fx_ice.png";
import fxIceLanceUrl from "../assets/ui/fx/fx_ice_lance.png";
import fxRayUrl from "../assets/ui/fx/fx_ray.png";
import fxMeteoroUrl from "../assets/ui/fx/fx_meteoro.png";
import fxMuralhaUrl from "../assets/ui/fx/fx_muralha.png";
import fxImolacaoUrl from "../assets/ui/fx/fx_imolacao.png";
import fxPrisaoUrl from "../assets/ui/fx/fx_prisao.png";
import fxCorrenteUrl from "../assets/ui/fx/fx_corrente.png";
import fxTempestadeUrl from "../assets/ui/fx/fx_tempestade.png";
import fxDescargaUrl from "../assets/ui/fx/fx_descarga.png";
import fxLApunhalarUrl from "../assets/ui/fx/fx_l_apunhalar.png";
import fxLRajadaUrl from "../assets/ui/fx/fx_l_rajada.png";
import fxLSombrasUrl from "../assets/ui/fx/fx_l_sombras.png";
import fxLEstocadaUrl from "../assets/ui/fx/fx_l_estocada.png";
import fxLMortalUrl from "../assets/ui/fx/fx_l_mortal.png";
import fxLDuplaUrl from "../assets/ui/fx/fx_l_dupla.png";
import fxLDancaUrl from "../assets/ui/fx/fx_l_danca.png";
import fxLArremessoUrl from "../assets/ui/fx/fx_l_arremesso.png";
import fxLNuvemUrl from "../assets/ui/fx/fx_l_nuvem.png";
import fxLToxinaUrl from "../assets/ui/fx/fx_l_toxina.png";
import swordUrl from "../assets/env/sword.png";
import { WEAPONS, WEAPON_BY_ID, generateWeapon, type Weapon, type WeaponInstance } from "./weapons";
import { generateArmor, sumBonuses, itemTotal, RARITY_BY_KEY, AFFIXES, ARMOR_SLOTS, reserveItemUid, type ItemInstance, type ArmorSlot, type Rarity, type StatBonus, type AffixKey } from "./items";
import { backend as saveBackend, type CharacterSave } from "./save";
import coinDropUrl from "../assets/ui/coin.png";
import { CLASS_BY_ID, type Character } from "./classes";
import {
  derive,
  POINTS_PER_LEVEL,
  type Primaries,
  type Secondaries,
} from "./stats";
import {
  passiveTotals,
  activeSkillsFor,
  combatFor,
  skillName,
  attrBonus,
  type StatKey,
} from "./skills";
// Só o sprite ESTÁTICO da espada. O motor faz a animação de golpe (gira a
// espada) e o efeito de corte (arco luminoso). O 2º sprite (pose de golpe) foi
// desativado; a arte continua no repo caso a gente queira retomar depois.
const SWORD_ATK_ART: string | null = null;

// artes 2D de árvores (billboards de plano cruzado). O sistema é procedural-
// first: nasce com o pinheiro procedural e troca pela arte quando ela carrega.
const TREE_ART: string[] = [pine1Url, pine2Url, pine4Url]; // pinheiros vivos
const DEAD_TREE_ART: string[] = [pine3Url]; // árvores mortas (raras, clima)
const TREE_ASPECT = 0.625; // largura/altura da arte de árvore (800x1280)
// aglomerados: muralha larga de mata usada como paredão ao fundo (some na névoa)
// cada aglomerado tem seu próprio aspecto (largura/altura), pois variam
const CLUSTER_ART: { url: string; aspect: number }[] = [
  { url: cluster1Url, aspect: 1.96 },
  { url: cluster2Url, aspect: 1.72 },
];
// pano de fundo do vilarejo (visto de fora) p/ a saída da floresta.
// procedural-first: null = usa as casinhas do motor; ao chegar a arte, troca.
const VILLAGE_BACKDROP_ART: string | null = null;

// artes 2D enviadas para atendentes (URL por estabelecimento)
const NPC_ART: Partial<Record<Estab, string>> = {
  tavern: taverneiroUrl,
  store: mercadoraUrl,
  smith: ferreiroUrl,
  alchemist: alquimistaUrl,
};

// placas 2D (PNG) das lojas — procedural-first: enquanto vazio, usa o letreiro
// de texto; ao mapear um id aqui, a placa pintada substitui o texto.
// Proporção esperada da arte da placa: ~2.6:1 (larga, tipo tabuleta pendurada).
const SHOP_SIGN_ART: Partial<Record<Estab, string>> = {
  tavern: signTavernUrl,
  store: signStoreUrl,
  smith: signSmithUrl,
  alchemist: signAlchUrl,
};
const SIGN_ASPECT = 2.6; // largura/altura da placa (usada no plano)

// direções: 0=N,1=E,2=S,3=O  (dcol, drow)
const DIRS: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// pontos de interesse do vilarejo
const WELL = { c: 7, r: 10 }; // poço no centro da praça
const POOF_FRAMES = 10; // quadros do sprite-sheet da explosão de morte

// efeitos de habilidade por TIPO/elemento: um sprite-sheet horizontal (N quadros
// numa linha) que estoura em cima do alvo. Em vez de uma arte por skill, reusamos
// o mesmo efeito para todas as skills do mesmo elemento — assim TODA magia mostra
// um efeito, não só as três que tinham arte própria.
const FX_FIRE = { url: fxFireballUrl, frames: 17 };
const FX_ICE = { url: fxIceUrl, frames: 6 };
const FX_ICE_LANCE = { url: fxIceLanceUrl, frames: 12 }; // arte própria da Lança de Gelo
const FX_ARCANE = { url: fxRayUrl, frames: 16 };
// artes próprias por skill (arquivo + nº de quadros da sprite-sheet)
const FX_METEORO = { url: fxMeteoroUrl, frames: 15 };
const FX_MURALHA = { url: fxMuralhaUrl, frames: 16 };
const FX_IMOLACAO = { url: fxImolacaoUrl, frames: 15 };
const FX_PRISAO = { url: fxPrisaoUrl, frames: 17 };
const FX_CORRENTE = { url: fxCorrenteUrl, frames: 19 };
const FX_TEMPESTADE = { url: fxTempestadeUrl, frames: 20 };
const FX_DESCARGA = { url: fxDescargaUrl, frames: 11 };
// ---- Ladino (arte própria por skill)
const FX_L_APUNHALAR = { url: fxLApunhalarUrl, frames: 5 };
const FX_L_RAJADA = { url: fxLRajadaUrl, frames: 20 };
const FX_L_SOMBRAS = { url: fxLSombrasUrl, frames: 7 };
const FX_L_ESTOCADA = { url: fxLEstocadaUrl, frames: 11 };
const FX_L_MORTAL = { url: fxLMortalUrl, frames: 6 };
const FX_L_DUPLA = { url: fxLDuplaUrl, frames: 8 };
const FX_L_DANCA = { url: fxLDancaUrl, frames: 20 };
const FX_L_ARREMESSO = { url: fxLArremessoUrl, frames: 14 };
const FX_L_NUVEM = { url: fxLNuvemUrl, frames: 7 };
const FX_L_TOXINA = { url: fxLToxinaUrl, frames: 19 };
// magias de FOGO do mago → tocam o som de fogo (as demais magias tocam "cast")
const FIRE_SKILLS = new Set(["m_bola_fogo", "m_explosao_fogo", "m_meteoro", "m_muralha_fogo"]);

const SKILL_FX: Record<string, { url: string; frames: number }> = {
  // ---- Mago: Fogo
  m_bola_fogo: FX_FIRE,
  m_explosao_fogo: FX_FIRE,
  m_meteoro: FX_METEORO,
  m_muralha_fogo: FX_MURALHA,
  m_imolacao: FX_IMOLACAO,
  // ---- Mago: Gelo
  m_nova_gelo: FX_ICE,
  m_lanca_gelo: FX_ICE_LANCE, // estilhaço de gelo (arte própria)
  m_prisao_gelo: FX_PRISAO,
  // ---- Mago: Tempestade / Arcano
  m_raio_arcano: FX_ARCANE,
  m_corrente: FX_CORRENTE,
  m_tempestade: FX_TEMPESTADE,
  m_descarga: FX_DESCARGA,
  m_nova_arcana: FX_ARCANE,
  // ---- Ladino
  l_apunhalar: FX_L_APUNHALAR,
  l_rajada_laminas: FX_L_RAJADA,
  l_golpe_sombras: FX_L_SOMBRAS,
  l_estocada: FX_L_ESTOCADA,
  l_execucao_a: FX_L_MORTAL, // Golpe Mortal
  l_rajada_dupla: FX_L_DUPLA,
  l_danca_laminas: FX_L_DANCA,
  l_arremesso: FX_L_ARREMESSO,
  l_nuvem_toxica: FX_L_NUVEM,
  l_toxina: FX_L_TOXINA,
};
// duração da animação (por skill): ~85ms por quadro, com piso/teto, p/ não soar
// instantâneo. Skills com mais quadros duram mais.
const FX_MS_DEFAULT = 1200;
const fxDurationFor = (id: string): number => {
  const fx = SKILL_FX[id];
  if (!fx) return FX_MS_DEFAULT;
  // ~115ms por quadro (cadenciado). Piso mais baixo p/ golpes curtos (poucos
  // quadros) não ficarem "travados"; magias longas seguem lentas/pesadas.
  return Math.min(2100, Math.max(900, Math.round(fx.frames * 115)));
};
// skills cujo DANO só acontece no ÚLTIMO quadro (a animação "cai" e aí fere)
const FX_IMPACT_END = new Set(["m_meteoro", "m_tempestade", "m_prisao_gelo"]);
// skills desenhadas COLADAS NO CHÃO (base tocando o piso sob o inimigo)
const FX_GROUND = new Set(["m_muralha_fogo", "m_descarga"]);

// TESTE: começa com muitos pontos de habilidade p/ experimentar todas as skills.
// (voltar p/ o nível quando terminar de testar — trocar para false)
const TEST_ALL_SKILLS = true;
const skillPointsFor = (level: number) => (TEST_ALL_SKILLS ? 100 : level);
const POOF_MS = 620; // duração da explosão
const TUNNEL_H = 3.2; // altura do teto do túnel da masmorra

// estabelecimentos: célula da casa + face (dc,dr) com a porta voltada p/ a praça.
// A placa-estaca fica encostada na parede, logo ao lado da porta.
interface EstabDoor {
  c: number;
  r: number;
  dc: number;
  dr: number;
  kind: Estab;
}
// Bens empilháveis não-arma (preço de COMPRA em ouro; venda = metade). Ficam num
// lugar só e cada loja vende um subconjunto — madeira/minério/reforço abastecem a
// forja, o resto são consumíveis.
interface Merch { id: string; name: string; icon: string; iconUrl?: string; price: number; desc: string }
const GOODS: Merch[] = [
  { id: "pot_hp", name: "Poção de Vida", icon: "🧪", iconUrl: icoPotHpUrl, price: 25, desc: "restaura 40% da vida" },
  { id: "pot_mp", name: "Poção de Mana", icon: "🔵", iconUrl: icoPotMpUrl, price: 30, desc: "restaura 40% da mana" },
  { id: "beer", name: "Cerveja do Javali", icon: "🍺", iconUrl: icoBeerUrl, price: 12, desc: "regenera vida por 3 min" },
  { id: "scroll_return", name: "Pergaminho de Retorno", icon: "📜", iconUrl: icoScrollUrl, price: 60, desc: "volta ao vilarejo" },
  { id: "madeira", name: "Madeira", icon: "🪵", iconUrl: icoMadeiraUrl, price: 10, desc: "material de forja" },
  { id: "minerio", name: "Minério", icon: "🪨", iconUrl: icoMinerioUrl, price: 18, desc: "material de forja" },
  { id: "reforco", name: "Pedra de Reforço", icon: "🔶", iconUrl: icoReforcoUrl, price: 40, desc: "material de forja" },
];
const GOODS_BY_ID: Record<string, Merch> = {};
for (const m of GOODS) GOODS_BY_ID[m.id] = m;

// MISSÕES da taverna. "kill" conta abates na masmorra; "delivery" completa ao
// FALAR com o NPC-alvo (ensina onde cada um fica). target casa por SUBSTRING do
// nome do NPC. reward = chips exibidos; grant = o que o jogador recebe de fato.
interface QuestDef {
  id: string; icon: string; title: string; desc: string;
  reward: TavernReward[];
  grant: { gold?: number; xp?: number; items?: [string, number][] };
  kind: "kill" | "delivery";
  goal?: number;                          // kill
  enemyTypes?: string[];                   // kill: typeIds que contam (vazio = qualquer não-chefe)
  unit?: string;                           // kill: substantivo no progresso ("esqueletos")
  repeatable?: boolean;                    // bounty: reabre ao entregar (loop de farm)
  target?: string; targetHint?: string;   // delivery
}
const QUEST_DEFS: QuestDef[] = [
  {
    id: "ossos", icon: "💀", title: "Ossos Inquietos",
    desc: "Os mortos não descansam na masmorra. Elimine 8 esqueletos.",
    reward: [{ gold: true, label: "120" }, { iconUrl: icoBeerUrl, label: "×2" }],
    grant: { gold: 120, items: [["beer", 2]] }, kind: "kill", goal: 8, enemyTypes: ["esqueleto"], unit: "esqueletos",
  },
  {
    id: "entrega_hedda", icon: "📦", title: "Encomenda da Rosa",
    desc: "A mercadora Rosa pediu para levar uma encomenda à Hedda, a matriarca.",
    reward: [{ gold: true, label: "45" }],
    grant: { gold: 45 }, kind: "delivery", target: "Hedda", targetHint: "na casa dela, a oeste da praça",
  },
  {
    id: "entrega_anselmo", icon: "📜", title: "Preces ao Frei",
    desc: "Leve as preces do bardo Lyle ao Frei Anselmo, que vigia a boca da masmorra.",
    reward: [{ gold: true, label: "35" }, { iconUrl: icoPotHpUrl, label: "×1" }],
    grant: { gold: 35, items: [["pot_hp", 1]] }, kind: "delivery", target: "Anselmo", targetHint: "perto da masmorra (noroeste)",
  },
  // ===== BOUNTIES REPETÍVEIS — o loop de farm da taverna. Resetam ao entregar,
  // dão OURO + XP (e às vezes poções) e contam abates por tipo na masmorra. =====
  {
    id: "b_vermes", icon: "🐀", title: "Contrato: Praga dos Túneis", repeatable: true,
    desc: "A masmorra fervilha. Abata 10 criaturas quaisquer lá embaixo.",
    reward: [{ gold: true, label: "90" }, { label: "+70 XP" }],
    grant: { gold: 90, xp: 70 }, kind: "kill", goal: 10, unit: "inimigos",
  },
  {
    id: "b_ossos", icon: "☠️", title: "Contrato: Faxina de Ossos", repeatable: true,
    desc: "Os esqueletos sempre voltam. Reduza 8 deles a pó.",
    reward: [{ gold: true, label: "140" }, { iconUrl: icoPotHpUrl, label: "×1" }, { label: "+110 XP" }],
    grant: { gold: 140, xp: 110, items: [["pot_hp", 1]] }, kind: "kill", goal: 8, enemyTypes: ["esqueleto"], unit: "esqueletos",
  },
  {
    id: "b_teias", icon: "🕷️", title: "Contrato: Ninho de Teias", repeatable: true,
    desc: "As aranhas se multiplicam no breu. Elimine 6 aranhas.",
    reward: [{ gold: true, label: "110" }, { label: "+85 XP" }],
    grant: { gold: 110, xp: 85 }, kind: "kill", goal: 6, enemyTypes: ["aranha"], unit: "aranhas",
  },
  {
    id: "b_hereges", icon: "🔥", title: "Contrato: Caça aos Hereges", repeatable: true,
    desc: "Cultistas e arqueiros espalham a névoa. Silencie 5 deles.",
    reward: [{ gold: true, label: "200" }, { iconUrl: icoPotMpUrl, label: "×1" }, { label: "+160 XP" }],
    grant: { gold: 200, xp: 160, items: [["pot_mp", 1]] }, kind: "kill", goal: 5, enemyTypes: ["cultista", "arqueiro"], unit: "hereges",
  },
];

// ============================ MAIN QUEST LINE ============================
// "A Névoa Devoradora" — a névoa eterna de Grimhollow é uma maldição viva que
// consome a memória e o descanso dos mortos. O herói descobre sua origem nas
// profundezas e precisa romper o Portão Selado p/ libertar o vilarejo.
//
// Cada capítulo tem ETAPAS encadeadas; NPCs-chave têm fala PRÓPRIA (oferta,
// enquanto corre e ao concluir). Gatilhos: falar com alguém, matar N inimigos,
// entregar itens, romper o Portão Selado e entrar num local.
type MQStepKind = "talk" | "kill" | "deliver" | "seal" | "enter" | "visit";
interface MQStep {
  kind: MQStepKind;
  objective: string;                 // objetivo (toast + diário)
  target?: string;                   // NPC-alvo por substring (talk/deliver)
  shop?: "store" | "tavern" | "smith" | "alchemist"; // loja a visitar (visit)
  atLines?: string[];                // fala do alvo ao cumprir a etapa (talk/deliver)
  visitToast?: string;               // aviso curto ao cumprir uma etapa "visit"
  goal?: number;                     // kill: quantos inimigos
  items?: [string, number][];        // deliver: itens exigidos
  location?: string;                 // enter: id do local (ex.: "showcase")
}
// referência dos objetos 3D de um NPC (p/ mover mesh+sombra+plaquinha juntos)
interface NpcRig { mesh: THREE.Object3D; shadow: THREE.Object3D; tag: THREE.Object3D; baseY: number; homeKey: string; }
// opção do menu de conversa (estilo WoW)
interface ConvOption {
  id: string;
  label: string;
  note?: string;
  primary?: boolean;
  kind?: "quest" | "shop" | "exit" | "back";
  run: () => void;
}
interface MainQuestDef {
  id: string;
  order: number;                     // ordem do capítulo (1..N)
  giver?: string;                    // NPC que oferece (substring); ausente => auto-inicia
  icon: string;
  title: string;
  summary: string;                   // resumo p/ o diário
  offer: string[];                   // fala ao OFERECER (antes de aceitar)
  active?: string[];                 // fala do giver enquanto a missão corre
  steps: MQStep[];
  grant: { gold?: number; items?: [string, number][] };
  reward: TavernReward[];            // chips de exibição
  done: string[];                    // fala ao concluir (giver ou narrador)
  flag?: string;                     // marca narrativa ("lantern")
}
const MAIN_QUESTS: MainQuestDef[] = [
  {
    // CAP.1 — introdução: conhecer o vilarejo e seus moradores (auto-inicia).
    // Ensina onde fica cada NPC/loja e conduz o jogador pela praça.
    id: "mq1", order: 1, icon: "🧭",
    title: "Forasteiro em Grimhollow",
    summary: "Você acaba de chegar pela estrada da névoa. Conheça os moradores do vilarejo antes de qualquer coisa.",
    offer: [],
    steps: [
      {
        kind: "visit", shop: "store",
        objective: "Visite Rosa, a mercadora",
        atLines: [
          "Ah — você é o forasteiro que a Hedda tirou da névoa, não é? Rosa, a mercadora, ao seu dispor.",
          "Armas, suprimentos, o que a estrada exigir. Passe aqui quando tiver com que pagar — e boa sorte lá embaixo.",
        ],
      },
      {
        kind: "visit", shop: "alchemist",
        objective: "Visite Isolde, a alquimista",
        atLines: [
          "Então a bruma cuspiu mais um sobrevivente. Isolde, alquimista — cuido das poções e dos reagentes das antigas artes.",
          "Tudo aqui tem seu preço e seu uso. Vai precisar de mim mais cedo do que imagina, viajante.",
        ],
      },
      {
        kind: "visit", shop: "smith",
        objective: "Visite Brandt, o ferreiro",
        atLines: [
          "Hm. Mãos que ainda não calejaram no aço. Brandt, ferreiro de Grimhollow.",
          "Traga-me materiais e a sua arma, e eu a deixo digna do que espreita nas profundezas.",
        ],
      },
      {
        kind: "visit", shop: "tavern",
        objective: "Visite Bruno, o taverneiro",
        atLines: [
          "Sente-se, viajante! Bruno, taverneiro e guardião de toda fofoca de Grimhollow.",
          "Uma caneca para espantar o frio da névoa? E dê uma olhada no mural — sempre há trabalho para quem tem coragem.",
        ],
      },
      {
        kind: "talk", target: "Hedda",
        objective: "Volte a Hedda, a matriarca, na casa dela (oeste da praça)",
        atLines: [
          "De volta, e inteiro. Então já conhece a Rosa, a Isolde, o ferreiro e o Bruno — a nossa pequena Grimhollow.",
          "Bom. Um forasteiro que sabe onde pisar dura mais por estas bandas.",
          "Agora sente-se. Chegou a hora daquela conversa que eu adiei.",
        ],
      },
    ],
    grant: { gold: 40, items: [["pot_hp", 1]] },
    reward: [{ gold: true, label: "40" }, { iconUrl: icoPotHpUrl, label: "×1" }],
    done: [],
  },
  {
    // CAP.2 — a névoa se revela; Hedda envia o herói ao Frei Anselmo.
    id: "mq2", order: 2, giver: "Hedda", icon: "🕯️",
    title: "Sussurros na Névoa",
    summary: "Hedda confia a você o segredo da bruma. Procure Frei Anselmo, na boca da masmorra.",
    offer: [
      "Agora que conhece o vilarejo, ouça o que ninguém repete em voz alta: a névoa está mudando. Mais espessa a cada lua. Mais faminta.",
      "Os velhos acordam chamando por nomes que já não lembram. A bruma não devora apenas o corpo, viajante — devora a memória.",
      "Se veio para ajudar, procure o Frei Anselmo, na boca da masmorra. Ele guarda o que restou das antigas verdades. Fará isso por Grimhollow?",
    ],
    active: ["Procure o Frei Anselmo, criança. Ele mantém vigília na boca da masmorra, a noroeste da praça."],
    steps: [
      {
        kind: "talk", target: "Anselmo",
        objective: "Fale com Frei Anselmo, na boca da masmorra (noroeste)",
        atLines: [
          "A Hedda o enviou? Então ela também sentiu. A névoa não é clima, viajante — é fome.",
          "Há gerações selamos algo lá embaixo, atrás do Portão. Enquanto o selo resistir, a bruma apenas ronda. Mas o selo enfraquece… e os mortos já não dormem.",
          "Se quer compreender o mal, precisa encará-lo. Desça e silencie os mortos-vivos inquietos. Volte quando tiver provas de que enfrentou o que sobe das profundezas.",
        ],
      },
    ],
    grant: { gold: 60, items: [["pot_hp", 1]] },
    reward: [{ gold: true, label: "60" }, { iconUrl: icoPotHpUrl, label: "×1" }],
    done: [],
  },
  {
    // CAP.3 — provar-se contra os mortos-vivos e voltar a Anselmo.
    id: "mq3", order: 3, giver: "Anselmo", icon: "💀",
    title: "Ossos que Não Dormem",
    summary: "Silencie os mortos-vivos que sobem das profundezas e traga provas a Frei Anselmo.",
    offer: [
      "A cada lua que míngua, mais deles sobem. O selo range como madeira velha sob a tempestade.",
      "Desça à masmorra e ponha oito destes mortos de volta ao repouso. Que a luz os alcance onde a minha prece não chega.",
      "Aceita o fardo, viajante?",
    ],
    active: ["Os mortos ainda caminham lá embaixo. Oito deles, de volta ao repouso — e retorne a mim."],
    steps: [
      {
        kind: "kill", goal: 8,
        objective: "Silencie 8 mortos-vivos na masmorra",
      },
      {
        kind: "talk", target: "Anselmo",
        objective: "Volte a Frei Anselmo com as provas",
        atLines: [
          "Eu vi a luz da tua lâmina lá de baixo. Então é verdade — eles cedem, mas voltam. Silenciá-los não basta.",
          "A raiz está além do Portão Selado, no Santuário que enterramos. Somente uma luz forjada pelas antigas artes pode partir aquele selo sem libertar o que ele contém.",
          "Volte à Hedda: ela guarda o rito da Lanterna da Bruma. Reúna com Isolde, a alquimista, os reagentes que a matriarca pedir — e leve-os a Hedda.",
        ],
      },
    ],
    grant: { gold: 120, items: [["pot_hp", 2]] },
    reward: [{ gold: true, label: "120" }, { iconUrl: icoPotHpUrl, label: "×2" }],
    done: [],
  },
  {
    // CAP.4 — forjar a Lanterna da Bruma com Hedda (reagentes de Isolde).
    id: "mq4", order: 4, giver: "Hedda", icon: "🏮",
    title: "A Oferenda à Bruma",
    summary: "Traga a Hedda 6 Minério e 5 Madeira (compre com Isolde) para forjar a Lanterna da Bruma.",
    offer: [
      "Então o Anselmo o mandou de volta. A Lanterna da Bruma… sim, ainda me lembro do rito. Minha avó o cumpria quando a névoa vinha buscar os berços.",
      "Preciso de bastante metal que jamais viu o sol e de lenha vinda do coração da mata. Isolde, a alquimista, guarda esses reagentes — seis de Minério e cinco de Madeira.",
      "Traga-os a mim e forjaremos a luz que a bruma teme. Você o fará?",
    ],
    active: ["Traga-me seis de Minério e cinco de Madeira, criança. Isolde os vende no laboratório dela."],
    steps: [
      {
        kind: "deliver", target: "Hedda", items: [["minerio", 6], ["madeira", 5]],
        objective: "Leve 6 Minério e 5 Madeira a Hedda",
        atLines: [
          "Isto servirá. Afaste-se do fogo, viajante, e não encare a chama enquanto eu recito.",
          "…Está feito. A Lanterna da Bruma arde com uma luz que não projeta sombra. Enquanto ela queimar, a névoa se abrirá diante de você.",
          "Desça uma última vez. Leve a Lanterna ao Portão Selado — e que os antigos tenham piedade do que houver atrás dele.",
        ],
      },
    ],
    grant: { gold: 90, items: [["pot_mp", 1]] },
    reward: [{ gold: true, label: "90" }, { iconUrl: icoPotMpUrl, label: "×1" }],
    done: [], flag: "lantern",
  },
  {
    // CAP.5 — clímax: romper o Portão Selado e alcançar o Santuário (auto-inicia).
    id: "mq5", order: 5, icon: "🌫️",
    title: "O Coração da Névoa",
    summary: "Com a Lanterna da Bruma, rompa o Portão Selado na masmorra e alcance o Santuário.",
    offer: [],
    steps: [
      {
        kind: "seal",
        objective: "Rompa o Portão Selado com a Lanterna da Bruma (masmorra)",
        atLines: [
          "Você ergue a Lanterna da Bruma. A chama sem sombra lambe os selos de ferro…",
          "Um a um, os símbolos se apagam. Uma golfada de ar frio sobe das profundezas — e o Portão cede, rangendo, revelando a escadaria enterrada.",
        ],
      },
      {
        kind: "enter", location: "showcase",
        objective: "Suba ao Santuário, além do Portão",
        atLines: [
          "O Santuário se abre diante de você. Lá no alto, onde a névoa sempre nasceu, a bruma redemoinha em torno de um vazio faminto — o Coração da Névoa.",
          "Você ergue a Lanterna. A luz sem sombra toca o vazio, e a fome cessa. A névoa recua, fiapo a fiapo, e — pela primeira vez em gerações — um raio de céu limpo desce sobre Grimhollow.",
          "O vilarejo lembrará o seu nome, viajante. A bruma foi domada… por ora.",
        ],
      },
    ],
    grant: { gold: 250, items: [["pot_hp", 2], ["scroll_return", 1]] },
    reward: [{ gold: true, label: "250" }, { iconUrl: icoPotHpUrl, label: "×2" }, { iconUrl: icoScrollUrl, label: "×1" }],
    done: [],
  },
];

// Papéis das lojas:
//  MERCADOR — equipamento (ARMAS) + o Pergaminho de Retorno. Não vende poção nem
//    material de forja (isso é da alquimista).
//  ALQUIMISTA (Isolde) — POÇÕES (vida/mana/futuras) + os MATERIAIS BÁSICOS de forja.
//  FERREIRO — não vende nada; apenas aprimora.
const STORE_GOODS = ["scroll_return"];
const ALCH_GOODS = ["pot_hp", "pot_mp", "madeira", "minerio", "reforco"];

const ESTAB_DOORS: EstabDoor[] = [
  { c: 5, r: 5, dc: 0, dr: 1, kind: "tavern" }, // parede norte
  { c: 9, r: 5, dc: 0, dr: 1, kind: "store" }, // parede norte
  { c: 1, r: 9, dc: 1, dr: 0, kind: "smith" }, // parede oeste
  { c: 13, r: 9, dc: -1, dr: 0, kind: "alchemist" }, // parede leste
];

// casas de aldeões (lares, não lojas). Cada uma tem uma porta na parede voltada
// p/ a praça e um interior aconchegante com seus moradores.
type HomeId = "irmaos" | "hedda" | "elspethhome";
interface HomeDoor {
  c: number;
  r: number;
  dc: number;
  dr: number;
  id: HomeId;
}
const HOME_DOORS: HomeDoor[] = [
  { c: 7, r: 5, dc: 0, dr: 1, id: "irmaos" }, // parede norte (entre taverna e loja)
  { c: 1, r: 7, dc: 1, dr: 0, id: "hedda" }, // parede oeste
  { c: 13, r: 11, dc: -1, dr: 0, id: "elspethhome" }, // parede leste
];

// aldeões da vila espalhados pela praça.
// id  -> chave da arte 2D (ver VILLAGER_ART); col/row = célula; seed = sprite
// procedural provisório enquanto a arte não chega; name/lines = diálogo.
interface VillageNPC {
  id: string;
  c: number; // posição/pose de DIA (col) — perto de algo que faz sentido p/ ele
  r: number; // posição/pose de DIA (linha)
  night: [number, number]; // destino NOTURNO (taverna/casa/ronda) — caminha até lá
  seed: number;
  name: string;
  lines: string[];
  scale?: number; // altura relativa (ex.: crianças ~0.7)
  roam?: number; // raio de perambulação DIURNA (células a partir do posto). 0 = fica parado.
}
// Cada aldeão tem um LUGAR DE DIA (ancorado a um ponto que faz sentido: poço,
// loja, casa) e um DESTINO DE NOITE. Ao anoitecer eles CAMINHAM até o destino
// (a maioria se recolhe na taverna ou em casa; o vigia sai em ronda) e ao
// amanhecer voltam ao posto de dia. Praça: colunas 2–12, linhas 6–12; poço em
// (7,10). Taverna à frente em (5,6); casas em (7,6)/(2,7)/(12,11).
// Posições SEMPRE encostadas numa parede/prédio (ninguém fica parado no meio
// do nada). A função wallLean() empurra o billboard p/ a parede vizinha.
const VILLAGE_NPCS: VillageNPC[] = [
  {
    id: "elspeth",
    c: 8, // de dia: encostada na parede norte, perto da loja
    r: 6,
    night: [12, 11], // à noite: recolhe-se em casa (canto sudeste)
    seed: 1,
    name: "Elspeth, a Camponesa",
    lines: [
      "Bom dia! Colhi legumes fresquinhos hoje cedo.",
      "O poço da praça nunca seca, pode beber à vontade.",
    ],
  },
  {
    id: "corvin",
    c: 10, // de dia: parede norte, ao lado da loja (vende lenha)
    r: 6,
    night: [5, 6], // à noite: entra na taverna (porta em (5,6))
    seed: 2,
    name: "Corvin, o Lenhador",
    lines: [
      "Cortar lenha é honesto, mas o bosque anda estranho ultimamente.",
      "Dizem que há algo à espreita naquela montanha ao norte...",
    ],
  },
  {
    id: "wren",
    c: 12, // de dia: encostada na parede leste (ateliê)
    r: 10,
    night: [2, 7], // à noite: recolhe-se em casa (parede oeste)
    seed: 3,
    name: "Wren, a Costureira",
    lines: [
      "Precisa remendar essa capa? Faço um preço justo.",
      "Roupa boa aquece o corpo — e o frio lá embaixo é de rachar.",
    ],
  },
  {
    id: "alard",
    c: 2, // de dia: encostado na parede oeste (perto da ferraria)
    r: 11,
    night: [5, 6], // à noite: entra na taverna (porta em (5,6))
    seed: 5,
    name: "Alard, o Velho Fazendeiro",
    lines: [
      "Cuidado, jovem. A escada sob a montanha leva às profundezas.",
      "Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar.",
    ],
  },
  {
    id: "gunther",
    c: 8, // de dia: GUARDA a entrada sul, encostado na parede do portão
    r: 13,
    night: [11, 7], // à noite: RONDA — cruza a praça e vigia do canto nordeste
    seed: 9,
    roam: 1, // de dia patrulha um trecho curto guardando a entrada
    name: "Gunther, o Vigia",
    lines: [
      "Mantenha a paz por aqui, forasteiro.",
      "Enquanto eu montar guarda, o vilarejo dorme tranquilo.",
    ],
  },
  {
    id: "anselmo",
    c: 3, // de dia: encostado na montanha, na boca da masmorra (noroeste)
    r: 6,
    night: [2, 6], // à noite: vigília de oração na boca do túnel (parede oeste)
    seed: 7,
    roam: 1, // de dia reza perto da boca da masmorra, sem se afastar muito
    name: "Frei Anselmo",
    lines: [
      "Que a luz o acompanhe nas trevas, viajante.",
      "Reze antes de descer àquela masmorra. Vai precisar.",
    ],
  },
  {
    id: "tam",
    c: 9, // de dia: encostado na parede sul, perto da entrada (pede esmola)
    r: 12,
    night: [7, 6], // à noite: recolhe-se na casa dos irmãos (porta em (7,6))
    seed: 10,
    roam: 1, // de dia mendiga perto da entrada, sem perambular muito
    name: "Velho Tam",
    lines: [
      "Uma moedinha para um pobre velho?",
      "Já fui aventureiro como você... até a montanha levar tudo de mim.",
    ],
  },
  {
    id: "lyle",
    c: 2, // de dia: encostado na parede oeste, tocando
    r: 8,
    night: [5, 6], // à noite: toca na taverna (parede norte)
    seed: 12,
    roam: 0, // fica no posto tocando (não perambula)
    name: "Lyle, o Bardo",
    lines: [
      "Ei! Quer ouvir a balada do herói que desceu à masmorra?",
      "Faça feitos grandiosos e eu comporei uma canção sobre você!",
    ],
  },
];

// falas AMBIENTE soltas (balão curto acima da cabeça, de vez em quando)
const NPC_CHATTER: string[] = [
  "Que frio de rachar...",
  "A névoa nunca levanta.",
  "Ouvi barulhos na montanha.",
  "Que os deuses nos guardem.",
  "Mais um dia cinzento.",
  "Preciso de lenha pro fogo.",
  "Algo desperta lá embaixo...",
  "Hoje tranco bem a porta.",
  "O poço anda com gosto estranho.",
  "Reze pelos que desceram.",
  "Dias difíceis, estes.",
  "Sinto cheiro de chuva.",
];
// CONVERSAS em par: falas alternadas (A, B, A, B...) — uma troca rápida e coerente
const NPC_TALKS: string[][] = [
  ["Viu que o forasteiro acordou?", "Vi. Que dure mais que os outros."],
  ["O bosque anda estranho.", "Não é o bosque... é a montanha.", "Melhor calar."],
  ["Rosa recebeu mercadoria nova.", "Com esses preços? Prefiro passar fome."],
  ["Dormiu bem?", "Sonhei com a névoa de novo.", "Todos sonhamos com ela."],
  ["Ouviu os tambores à noite?", "Ouvi. Rezei até calarem."],
  ["Falta pão outra vez.", "A colheita foi fraca. A terra adoeceu."],
  ["A cerveja do Bruno tava aguada.", "Aguada é melhor que nenhuma."],
  ["Cuidado ao anoitecer.", "Sempre. Ninguém anda sozinho aqui."],
  ["Mais um que desceu à masmorra.", "Que a luz o acompanhe. Vai precisar."],
];

// artes 2D dos aldeões (id -> URL importada). Vazio por enquanto: cada aldeão
// usa o sprite procedural até a arte chegar. Ao receber uma imagem, basta
// importá-la e mapear o id aqui — o resto já está pronto.
const VILLAGER_ART: Record<string, string> = {
  pip: pipUrl,
  wilma: wilmaUrl,
  alard: fazendeiroUrl,
  elspeth: camponesaUrl,
  corvin: lenhadorUrl,
  hedda: heddaUrl,
  wren: costureiraUrl,
  gunther: guntherUrl,
  anselmo: anselmoUrl,
  tam: tamUrl,
  lyle: lyleUrl,
};

// aldeões animados por sprite-sheet (id -> tira com N quadros, alinhados).
const VILLAGER_ANIM: Record<string, { url: string; frames: number; fps: number }> = {};

// moradores de cada casa (posicionados no grid da ROOM interna)
interface HomeResident {
  col: number;
  row: number;
  seed: number;
  name: string;
  lines: string[];
  art?: string;
  scale?: number;
}
interface HomeInfo {
  name: string; // letreiro/dica
  residents: HomeResident[];
}
const HOMES: Record<HomeId, HomeInfo> = {
  irmaos: {
    name: "Casa dos Irmãos",
    residents: [
      {
        col: 2,
        row: 2,
        seed: 4,
        scale: 0.7,
        name: "Pip",
        art: pipUrl,
        lines: [
          "Essa é a nossa casa! Eu e a Wilma somos irmãos.",
          "Um dia vou ser aventureiro igual você — a Wilma que fica de babá!",
        ],
      },
      {
        col: 4,
        row: 2,
        seed: 6,
        scale: 0.66,
        name: "Wilma",
        art: wilmaUrl,
        lines: [
          "O Pip vive fugindo pra praça. Alguém tem que cuidar dele!",
          "À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta.",
        ],
      },
    ],
  },
  hedda: {
    name: "Casa de Hedda",
    residents: [
      {
        col: 3,
        row: 2,
        seed: 8,
        name: "Hedda, a Matriarca",
        art: heddaUrl,
        lines: [
          "Entre, entre. Minha casa é modesta, mas aquecida.",
          "Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá.",
        ],
      },
    ],
  },
  elspethhome: {
    name: "Casa de Elspeth",
    residents: [], // Elspeth está na praça de dia; a casa fica dela
  },
};

// tamanho máximo de uma "página" de diálogo (mantém a caixa sempre igual).
// Falas maiores são quebradas em várias páginas ("…" e o jogador continua).
// Faces em PNG de objetos "caixa" (baú etc.). import.meta.glob NÃO quebra o build se
// os arquivos ainda não existem (retorna {}), então o baú usa PNG quando houver e cai
// no baú procedural enquanto não. Basta soltar bau_*.png em assets/env/ que ativa.
const FACE_PNG = import.meta.glob("../assets/env/bau_*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const facePng = (name: string): string | undefined =>
  FACE_PNG[`../assets/env/${name}.png`];

// VARIAÇÕES de parede da masmorra (tex_dwall_1..10). Mesmo esquema: se existirem,
// a masmorra sorteia a rocha por região; se não, cai na caveWall única.
const DWALL_PNG = import.meta.glob("../assets/env/tex_dwall_*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const dwallUrl = (i: number): string | undefined =>
  DWALL_PNG[`../assets/env/tex_dwall_${i}.png`];

// VARIANTES de parede do ATO II (tex_a2wall_1..N). Se o usuário soltar essas artes
// em assets/env/, o Ato II passa a distribuí-las pelos painéis (mais variedade);
// enquanto não houver, usa só a tex_a2wall base (tingida por tons no pool).
const A2WALL_GLOB = import.meta.glob("../assets/env/tex_a2wall_*.png", {
  eager: true, query: "?url", import: "default",
}) as Record<string, string>;
const A2WALL_PNG: string[] = Object.keys(A2WALL_GLOB).sort().map((k) => A2WALL_GLOB[k]);
// texturas OPCIONAIS do Ato II (só ativam quando o usuário soltar o PNG):
//  • tex_a2wall_clean.png → parede CINZA sem musgo (vira o padrão; a com musgo
//    passa a aparecer só às vezes).  • tex_a2ceil_2.png → teto cinza novo.
const A2OPT_GLOB = import.meta.glob("../assets/env/tex_a2{wall_clean,ceil_2}.png", {
  eager: true, query: "?url", import: "default",
}) as Record<string, string>;
const a2OptUrl = (name: string): string | undefined => A2OPT_GLOB[`../assets/env/${name}.png`];

const DLG_MAX = 96;
function paginate(lines: string[], max = DLG_MAX): string[] {
  const pages: string[] = [];
  for (const line of lines) {
    if (line.length <= max) {
      pages.push(line);
      continue;
    }
    const words = line.split(/\s+/);
    let cur = "";
    for (const w of words) {
      if (cur && cur.length + 1 + w.length > max) {
        pages.push(cur + " …");
        cur = w;
      } else {
        cur = cur ? cur + " " + w : w;
      }
    }
    if (cur) pages.push(cur);
  }
  return pages;
}

// alvo que o jogador está encarando ao apertar interagir
type Target =
  | { kind: "enter"; estab: Estab }
  | { kind: "enterhome"; id: HomeId }
  | { kind: "exit" }
  | { kind: "talk"; name: string; lines: string[]; key: string }
  | { kind: "dungeon" }
  | { kind: "descend" } // escada 'D' → desce um andar da masmorra
  | { kind: "ascend" } // escada 'U' (andar 2/3) → sobe um andar
  | { kind: "gate"; key: string }
  | { kind: "lockgate" } // portão selado do santuário (não abre)
  | { kind: "sanctuary" } // entrada do santuário (leva à sala-vitrine)
  | { kind: "smithshop" } // ferreiro (abre a janela de aprimoramento)
  | { kind: "storeshop" } // mercador (abre a janela de comprar/vender)
  | { kind: "alchshop" } // alquimista (loja de poções + materiais de forja)
  | { kind: "tavernshop" } // taverna (descanso + bebidas + missões)
  | { kind: "stash" } // baú da Hedda (guardar/retirar)
  | { kind: "toforest" }
  | { kind: "tovillage" }
  | { kind: "sign"; lines: string[] }
  | { kind: "pickup"; uid: string; name: string } // item caído no chão à frente
  | { kind: "chest"; key: string } // baú da masmorra (chocalha e abre ao interagir)
  | { kind: "waypoint" } // portal FIXO da cidade (arco de pedra) → viaja p/ masmorra
  | { kind: "portalback" } // portal TEMPORÁRIO de retorno → volta ao ponto da masmorra
  | null;

// baú 2D (billboard) da masmorra: estado + refs p/ animar o chocalho e a abertura
type ChestRec = {
  mesh: THREE.Mesh;
  mat: THREE.MeshLambertMaterial;
  openTex?: THREE.Texture;
  cx: number;
  cz: number;
  state: "closed" | "opening" | "open";
  t0: number;
  knocks: number;
  light?: THREE.PointLight;
  hidden?: boolean; // baú ESCONDIDO (atrás de parede secreta/portão) → melhor loot
};

// entrada de diálogo de um aldeão (guardada no npcMap por célula). Os walkers
// carregam a referência da SUA entrada p/ movê-la sem clobber quando se sobrepõem.
interface NpcEntry {
  name: string;
  lines: string[];
  tex: THREE.Texture;
  art: boolean;
  frames?: number;
  portrait?: string | null;
}

// item/ouro caído no chão (estilo WoW): ícone flutuante + facho sutil por raridade.
// NÃO bloqueia a célula — o jogador passa por cima (ouro = auto; item = popup "Pegar").
interface GroundDrop {
  c: number; r: number;
  kind: "item" | "gold";
  item?: ItemInstance;   // se kind === "item" (armadura)
  weapon?: WeaponInstance; // se kind === "item" E é uma ARMA dropada
  gold?: number;         // se kind === "gold"
  color: string;         // cor da raridade (facho + bolinha no minimapa)
  group: THREE.Group;    // container no mundo (ícone + facho)
  icon: THREE.Mesh;      // billboard do ícone (encara a câmera)
  glow: THREE.Sprite;    // facho/halo macio (aditivo, opacidade baixa)
  baseY: number;         // altura-base do ícone (p/ o "flutuar")
  ph: number;            // fase da flutuação (dessincroniza vários drops)
  opened: boolean;       // popup já foi aberto ao pisar nesta célula (evita reabrir por frame)
  bornAt: number;        // instante do drop (leve fade-in / plop)
  dx: number; dz: number; // deslocamento dentro da célula (vários drops no mesmo lugar)
}

type Anim =
  | null
  | {
      kind: "move";
      t0: number;
      fromX: number;
      fromZ: number;
      toX: number;
      toZ: number;
      fromY: number; // altura do piso (níveis/escadas) — a câmera acompanha
      toY: number;
      fromYaw?: number; // rotação da câmera (escada em espiral: gira ao andar)
      toYaw?: number;
    }
  | { kind: "turn"; t0: number; fromY: number; toY: number };

// inimigo billboard com IA (patrulha/visão/perseguição). Vários por mapa.
interface EnemyEnt {
  mesh: THREE.Mesh;
  mat: THREE.MeshLambertMaterial;
  c: number; r: number;        // célula lógica atual
  bx: number; bz: number;      // posição VISUAL no mundo (interpolada no passo)
  hp: number; maxHp: number;
  atk: number;                 // dano do ataque
  xp: number;                  // XP base dropado (escalado pelo nível relativo do herói)
  lvl: number;                 // "nível" do inimigo (p/ a escala de XP anti-farm)
  goldBase: number;            // ouro base dropado
  visionR: number;             // alcance de visão (células)
  homeC: number; homeR: number;// ponto de spawn (âncora da patrulha)
  aggro: boolean;              // já viu/foi atingido → persegue
  ranged: boolean; melee: boolean; // como ataca
  range: number;               // alcance do ataque à distância (células)
  proj: string;                // tipo de projétil ("arrow" | "orb" | "")
  ai: string;                  // comportamento (chase/kite/flee_low/relentless)
  tier: "normal" | "mini" | "boss"; // porte (afeta o tamanho da bolinha no minimapa)
  typeId: string;              // id do tipo (p/ o respawn recriar o mesmo inimigo)
  atkIsRanged: boolean;        // o ataque em curso é à distância?
  hitAt: number; dyingAt: number;
  atkAt: number; hitApplied: boolean; nextAtk: number;
  // passo em grade (interpolação suave entre células)
  stepAt: number; stepDur: number; fx: number; fz: number; tx: number; tz: number;
  nextMove: number;            // instante mínimo do próximo passo
  approach: number;            // +1 se o último passo aproximou do herói, -1 afastou, 0 parado
  hdc: number; hdr: number;    // direção p/ onde o inimigo está "virado" (último passo/rumo)
  faceArrow: THREE.Mesh;       // seta NO CHÃO sob o inimigo, apontando p/ onde ele encara
  bar: THREE.Group; barFill: THREE.Mesh;
}

export class Game {
  private renderer: THREE.WebGLRenderer;
  private composer?: EffectComposer; // pós-processamento (bloom + tone mapping)
  private bloom?: UnrealBloomPass;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private container: HTMLElement;
  private foliageFx?: HTMLDivElement; // vinheta do efeito de roçar folhagem

  private col: number;
  private row: number;
  private facing = 0;
  private anim: Anim = null;
  private showIdx = 0; // posição do jogador ao longo do caminho da sala-vitrine (hélice)
  private stairUp = true; // na escada em espiral: true = encara SUBINDO, false = descendo
  // (forward anda p/ onde o jogador OLHA; virar 180° inverte)
  // p/ onde voltar ao SAIR da sala-vitrine (masmorra, se entrou pelo portal; senão vila)
  private showcaseReturn: { loc: string; col: number; row: number; facing: number } | null = null;

  private world = new THREE.Group(); // tudo do local atual (recriado ao trocar)
  private blocked = new Set<string>(); // células bloqueadas por props/NPCs
  // portões da masmorra FECHADOS: "c,r" → as duas meias-portas (dobradiças).
  // Ao abrir, elas GIRAM (não somem). O portão aberto sai deste mapa.
  private gates = new Map<string, { pivotL: THREE.Object3D; pivotR: THREE.Object3D }>();
  // animações de abertura de portão em curso
  private gateAnims: { pivotL: THREE.Object3D; pivotR: THREE.Object3D; t0: number; dur: number; to: number }[] = [];
  private now = 0; // timestamp do frame atual (p/ animações disparadas fora do tick)
  // partículas flutuantes (poeira/esporos) — cada nuvem sobe devagar e reinicia
  private motes: { pts: THREE.Points; sp: Float32Array; y0: number; y1: number; sway: number }[] = [];
  private moteTexCache?: THREE.Texture;
  // fumaça animada (sprites macios que derivam) — dá vida à névoa
  private fogPuffs: { s: THREE.Sprite; bx: number; bz: number; by: number; ph: number; rad: number; baseOp: number; rotSp: number; rise: number }[] = [];
  private softPuffCache?: THREE.Texture;
  private cloudTexCache?: THREE.Texture;
  private fogDome?: THREE.Mesh; // cúpula do céu (shader procedural por etapa do dia)
  // uniforms do shader do céu (cores/sol/lua/estrelas), atualizados no ciclo
  private skyUniforms?: {
    uTop: { value: THREE.Color }; uHor: { value: THREE.Color }; uSun: { value: THREE.Color };
    uSunDir: { value: THREE.Vector3 }; uMoonDir: { value: THREE.Vector3 };
    uSunI: { value: number }; uStarI: { value: number }; uMoonI: { value: number };
    uTime: { value: number };
  };
  // ETAPAS DO DIA (keyframes por t, 0=meia-noite): cor do zênite/horizonte/sol +
  // intensidade do sol e das estrelas. amanhecer→manhã→tarde→entardecer→anoitecer→noite.
  private static readonly SKY_PHASES: {
    t: number; name: string;
    top: [number, number, number]; hor: [number, number, number]; sun: [number, number, number];
    sunI: number; starI: number;
  }[] = [
    { t: 0.00, name: "noite",      top: [0.02, 0.03, 0.09], hor: [0.05, 0.07, 0.15], sun: [0.6, 0.7, 1.0], sunI: 0.0, starI: 1.0 },
    { t: 0.20, name: "madrugada",  top: [0.03, 0.05, 0.13], hor: [0.08, 0.10, 0.20], sun: [0.9, 0.7, 0.6], sunI: 0.0, starI: 1.0 },
    { t: 0.245, name: "amanhecer", top: [0.13, 0.14, 0.30], hor: [0.50, 0.30, 0.40], sun: [1.0, 0.50, 0.35], sunI: 0.5, starI: 0.35 },
    { t: 0.29, name: "amanhecer",  top: [0.22, 0.30, 0.50], hor: [0.98, 0.58, 0.32], sun: [1.0, 0.66, 0.36], sunI: 1.0, starI: 0.02 },
    { t: 0.36, name: "manhã",      top: [0.26, 0.42, 0.66], hor: [0.72, 0.74, 0.72], sun: [1.0, 0.94, 0.80], sunI: 0.65, starI: 0.0 },
    { t: 0.50, name: "tarde",      top: [0.30, 0.48, 0.72], hor: [0.60, 0.70, 0.78], sun: [1.0, 0.98, 0.90], sunI: 0.5, starI: 0.0 },
    { t: 0.64, name: "tarde",      top: [0.30, 0.44, 0.64], hor: [0.72, 0.66, 0.58], sun: [1.0, 0.88, 0.68], sunI: 0.6, starI: 0.0 },
    { t: 0.71, name: "entardecer", top: [0.24, 0.24, 0.44], hor: [0.96, 0.48, 0.20], sun: [1.0, 0.46, 0.20], sunI: 1.15, starI: 0.02 },
    { t: 0.77, name: "anoitecer",  top: [0.13, 0.13, 0.30], hor: [0.52, 0.26, 0.38], sun: [0.9, 0.40, 0.42], sunI: 0.5, starI: 0.4 },
    { t: 0.84, name: "anoitecer",  top: [0.06, 0.08, 0.19], hor: [0.13, 0.14, 0.28], sun: [0.7, 0.6, 0.9], sunI: 0.0, starI: 0.9 },
    { t: 1.00, name: "noite",      top: [0.02, 0.03, 0.09], hor: [0.05, 0.07, 0.15], sun: [0.6, 0.7, 1.0], sunI: 0.0, starI: 1.0 },
  ];
  private smokeTexes: THREE.Texture[] = []; // texturas de fumaça (mechas por ruído)
  private npcs: THREE.Object3D[] = []; // aldeões (billboards)
  private flames: { light: THREE.PointLight; base: number }[] = []; // luzes que tremem
  private fireFlames: THREE.Mesh[] = []; // línguas de chama animadas (lareira) — tremem e encaram a câmera
  private _fireTex?: THREE.Texture;      // textura de chama (gerada 1×)
  // postes de rua externos: acendem à noite, apagam de dia (ciclo dia/noite)
  private lampFlames: { light: THREE.PointLight; base: number }[] = [];
  private lampGlows: THREE.Sprite[] = []; // halo luminoso da lanterna (só à noite)
  private glowTex?: THREE.Texture; // textura radial do brilho (cache)
  // luzes principais moduladas pelo ciclo dia/noite (ambiente/hemisfério/sol)
  private dayNightLights: {
    light: THREE.Light;
    dayI: number; // intensidade de dia (base)
    dayColor: THREE.Color;
    nightColor: THREE.Color;
    nightMul: number; // fração da intensidade à noite
  }[] = [];
  private outdoor = false; // local atual participa do ciclo dia/noite?
  private _sky = new THREE.Color(); // cor da atmosfera reaproveitada por quadro
  private waterGlint?: THREE.Mesh; // (legado) reflexo da água — poço removido
  // ---- PORTAL / WAYPOINT (estilo PoE/Diablo) ----
  // portal FIXO da cidade (arco de pedra em plataforma elevada). Preenchido pelo GIF
  // quando ATIVO (destrava ao vencer o 1º chefe). Ativo desde já p/ TESTE.
  private cityPortalActive = true;
  private portalTex?: THREE.Texture;        // textura animada do GIF (compartilhada)
  private portalImg?: HTMLImageElement;      // <img> do GIF (anima os frames)
  private portalPlanes: THREE.Mesh[] = [];   // planos do GIF (precisam needsUpdate/tick)
  // portal TEMPORÁRIO de retorno na cidade (aberto por Pergaminho na masmorra; uso único)
  private tempPortal?: THREE.Object3D;
  private tempPortalCell?: { c: number; r: number };
  private dungeonReturn?: { floor: number; col: number; row: number }; // destino do retorno
  private smoke: THREE.Mesh[] = []; // baforadas de fumaça das chaminés
  private billboardProps: THREE.Object3D[] = []; // props 2D (PNG) que encaram a câmera
  // baús 2D (billboard) da masmorra: chocalham ao interagir e depois abrem (troca de
  // frame + luz). Chaveado por "col,row".
  private chests = new Map<string, ChestRec>();
  private static readonly CHEST_W = 1.5; // largura do baú no mundo (os 2 frames a usam → alinham)
  private playerMaxHp = 100;
  private playerHp = 100;
  private playerMaxMp = 100;
  private playerMp = 100;
  private hpRegenAcc = 0;   // acumula a fração de vida regenerada até completar 1 HP
  private lastNow = -1;     // timestamp do quadro anterior (p/ dt da regeneração)
  // atributos exibidos na janela de personagem (valores iniciais; mecânica depois)
  private stats = { level: 1, xp: 0, xpMax: 140, atk: 8, def: 2, str: 5, dex: 5, int: 5, gold: 0 };
  // FERREIRO: nível de reforço (+N) por arma + materiais + item selecionado na janela
  private reinforce: Record<string, number> = {};
  private materials = { madeira: 8, minerio: 5, reforco: 3 };
  private smithSel = "sword";
  private static readonly SMITH_MAX = 10;
  // MERCADOR: consumíveis que o jogador possui, armas possuídas, modo da janela
  private consumables: Record<string, number> = {};
  private ownedWeapons: string[] = [];
  // TAVERNA: estado das missões (ver QUEST_DEFS). status por id + progresso (kill)
  private quests: Record<string, { status: "available" | "active" | "ready" | "done"; progress: number }> =
    Object.fromEntries(QUEST_DEFS.map((d) => [d.id, { status: "available" as const, progress: 0 }]));
  // MAIN QUEST ("A Névoa Devoradora"): estado por capítulo + marcas narrativas.
  // cap.1 começa disponível; os demais destravam quando o anterior conclui.
  private mainQuests: Record<string, { status: "locked" | "available" | "active" | "done"; step: number; progress: number }> = {};
  private mainFlags: Record<string, boolean> = {}; // ex.: lantern = tem a Lanterna da Bruma
  private sealCell: { col: number; row: number } | null = null; // Portão Selado (masmorra)
  private sealBars: THREE.Object3D | null = null;                // grade do Portão (some ao romper)
  // ---- EQUIPAMENTO (armaduras) ----
  private armorInv: ItemInstance[] = [];                          // armaduras na mochila (não equipadas)
  private equippedArmor: Partial<Record<ArmorSlot, ItemInstance>> = {}; // por slot
  private weaponInv: WeaponInstance[] = [];                       // armas DROPADAS na mochila
  private equippedWeaponUid: string | null = null;               // arma-instância equipada (null = arma-base)
  private storeStock: ItemInstance[] = [];                        // estoque rotativo da Rosa
  private storeStockPeriod = -1;                                  // meia-jornada da última rotação
  private drops: GroundDrop[] = [];                               // itens/ouro caídos no chão (estilo WoW)
  private nextMiniRefresh = 0;                                    // throttle do redesenho do minimapa (bolinhas de inimigo)
  private dungeonFloor = 0;                                       // andar atual da masmorra (0..5)
  // ATO do andar atual: 1 = Ato I (andares 0-2), 2 = Ato II afogado (andares 3-5).
  private dungeonAct(): 1 | 2 { return this.dungeonFloor >= 3 ? 2 : 1; }
  private dungeonMaxFloor = 0;                                    // andar MAIS FUNDO já alcançado (checkpoint p/ "continuar")
  private dungeonSession = 0;                                     // muda a cada (re)build → invalida respawns pendentes
  private dropGlowTex?: THREE.Texture;                            // textura do facho sutil (radial macia)
  private beacon: THREE.Group | null = null;                     // marcador-guia da missão (mundo 3D)
  private guideOn = true;                                         // guia/marcador (mapa+mundo) ligado?
  private introShown = false;                                    // narração de abertura (1×)
  private waking = false;                                        // sequência de "acordar" em curso
  private wakeStart = -1;                                        // instante-base (setado no 1º tick)
  private introWalk = false;                                     // Hedda caminhando até o jogador (trava a entrada)
  // referências dos NPCs (mesh+sombra+plaquinha) p/ animar caminhada roteirizada
  private npcRig = new Map<string, NpcRig>();
  // caminhada roteirizada da Hedda ao acordar: pontos (mundo) + índice de tempo
  private wakeWalk: { rig: NpcRig; pts: { x: number; z: number }[]; endCell: string; t0: number; onArrive: () => void } | null = null;
  private static readonly BLINK_MS = 2200;                       // fase 1: deitado piscando
  private static readonly WAKE_MS = 2000;                        // fase 2: levantar (subida da câmera)
  private static readonly LIE_Y = 0.48;                          // altura da câmera "deitado" (no colchão)
  private static readonly LIE_PITCH = 0.82;                      // + = olha p/ CIMA (teto) ao acordar
  private storeMode: "buy" | "sell" = "buy";
  private shopVendor: "store" | "alchemist" = "store"; // qual loja está aberta
  // BAÚ da Hedda: pertences guardados (bens empilháveis, armas c/ reforço, ouro)
  private stash: { goods: Record<string, number>; weapons: string[]; reinforce: Record<string, number>; gold: number } =
    { goods: {}, weapons: [], reinforce: {}, gold: 0 };
  private stashMode: "deposit" | "withdraw" = "deposit";
  private stashCell: { col: number; row: number } | null = null; // célula do baú (só na casa da Hedda)
  private static readonly SELL_RATE = 0.5; // mercador paga metade do preço de compra
  // quanto o jogador TEM de um bem empilhável (roteia p/ materiais ou consumíveis)
  private goodHave(id: string): number {
    if (id === "madeira" || id === "minerio" || id === "reforco") return this.materials[id];
    return this.consumables[id] ?? 0;
  }
  private goodAdd(id: string, n: number): void {
    if (id === "madeira" || id === "minerio" || id === "reforco") this.materials[id] = Math.max(0, this.materials[id] + n);
    else this.consumables[id] = Math.max(0, (this.consumables[id] ?? 0) + n);
  }
  private weaponSell(id: string): number {
    return 35 + (this.reinforce[id] ?? 0) * 20; // reforço agrega valor
  }
  // preço de COMPRA de uma arma no mercador (Tier 1 "básico"): escala com o dano.
  // dano 0 (escudo/orbe) 60 · 1 → 100 · 2 → 140 · 3 → 180
  private weaponBuy(id: string): number {
    const w = WEAPON_BY_ID[id];
    return w ? 60 + w.dmg * 40 : 0;
  }
  // descrição curta da arma na vitrine do mercador
  private weaponDesc(w: Weapon): string {
    const hands = w.grip === "2h" ? "2 mãos" : "1 mão";
    return w.slot === "off" ? `mão secundária · ${w.cls}` : `dano ${w.dmg} · ${hands} · ${w.cls}`;
  }
  // PRIMÁRIOS atuais + piso (base da criação, não dá pra baixar disso) e a base
  // de vida/mana da classe. Os SECUNDÁRIOS são derivados destes.
  private prim: Primaries = { str: 5, dex: 5, int: 5 };
  private baseAttr: Primaries = { str: 5, dex: 5, int: 5 };
  private clsHp = 100;
  private clsMp = 100;
  private sec: Secondaries = derive({ str: 5, dex: 5, int: 5 }, 100, 100);
  private unspent = 0; // pontos de atributo por distribuir (3 por nível)
  // totais acumulados das passivas alocadas na árvore de habilidades
  private passive: Partial<Record<StatKey, number>> = {};
  // ranks das habilidades (cópia local vinda do HUD) p/ acionar as ativas
  private skillRanks: Record<string, number> = {};
  // alvo selecionado (o inimigo escolhido/na mira)
  private target: EnemyEnt | null = null;
  // recarga de cada habilidade: instante (ms) em que fica pronta de novo
  private cooldownUntil: Record<string, number> = {};
  private coolingSkills = new Set<string>(); // ids em recarga (tick atualiza a UI)
  // buff temporário ativo (multiplicador de dano / redução de dano recebido)
  private buff: { atkMul: number; defReduc: number; until: number } | null = null;
  private hpRegenUntil = 0; // cerveja: regenera vida até este instante (ms)
  private reviveUntil = 0; // SELO de Intervenção/Ressurreição: se cair antes disso, revive 1x
  // trilha de fundo do vilarejo (loop); toca na vila e nos interiores.
  // registrada no canal MÚSICA (volume controlado pelas Opções).
  private bgmVillage: HTMLAudioElement = audio.register((() => {
    const a = new Audio(bgmVilarejoUrl);
    a.loop = true; a.preload = "auto";
    return a;
  })(), "music");
  private musicArmed = false; // já há um listener de gesto aguardando p/ religar?
  // retículo de mira (billboard que marca o alvo selecionado)
  private reticle: THREE.Mesh | null = null;
  private raycaster = new THREE.Raycaster();
  private lastTickMs = 0; // p/ regen de mana por segundo
  private buffActive = false; // se havia buff no frame anterior (p/ atualizar UI)
  private currentWeapon: Weapon | null = null; // arma equipada na mão principal
  private playerName = "Herói"; // nome escolhido na criação
  private classId = "guerreiro"; // classe escolhida na criação
  // ---- SAVE (persistência) ----
  private saveSlot = 0;                 // slot de personagem ativo (0..2)
  private saveCreatedAt = 0;            // quando o personagem foi criado
  private saveTimer = 0;                // debounce do auto-save
  private saveReady = false;            // só grava depois que o personagem foi ligado ao slot
  private lastSaveAt = 0;               // p/ garantir gravação periódica em sessão longa
  // inimigos billboard (com IA) — vários por mapa
  private enemies: EnemyEnt[] = [];
  // tocha que acompanha o jogador (ilumina o entorno imediato na masmorra)
  private playerTorch?: THREE.PointLight;
  // projéteis dos inimigos (flecha do arqueiro / orbe do cultista) — voam e dão dano
  private enemyBolts: { spr: THREE.Sprite; kind: string; fx: number; fz: number; tx: number; tz: number; y: number; t0: number; dur: number; dmg: number }[] = [];
  private boltTexCache?: THREE.Texture;
  private arrowTexCache?: THREE.Texture;
  private chevTexCache?: THREE.Texture;
  // temporários reutilizados p/ orientar a flecha (sem alocar por quadro)
  private _boltDir = new THREE.Vector3();
  private _boltInvQ = new THREE.Quaternion();
  // explosão de fumaça (sprite-sheet do GIF) na morte do inimigo
  private poofs: {
    mesh: THREE.Mesh;
    mat: THREE.MeshBasicMaterial;
    tex: THREE.Texture;
    born: number;
  }[] = [];
  private poofTex?: THREE.Texture; // sprite-sheet carregado (10 quadros)
  // projéteis de habilidade (bola de fogo etc.) voando até o alvo
  private projectiles: {
    mesh: THREE.Mesh;
    mat: THREE.MeshBasicMaterial;
    tex: THREE.Texture;
    frames: number;
    born: number;
    ms: number; // duração desta animação (varia por skill)
    fromX: number; fromZ: number; toX: number; toZ: number;
  }[] = [];
  private fxTexCache: Record<string, THREE.Texture> = {};
  private _smokeTex?: THREE.Texture;
  private ui!: HUD;

  private location: "village" | "forest" | "dungeon" | "showcase" | Estab | HomeId = "village";
  private doorMap = new Map<string, Estab>(); // "c,r,dc,dr" -> estabelecimento
  private homeDoorMap = new Map<string, HomeId>(); // "c,r,dc,dr" -> casa de aldeão
  // "c,r" -> NPC (guarda a textura p/ recortar o retrato do diálogo)
  private npcMap = new Map<string, NpcEntry>();
  private returnTo = { col: 0, row: 0, facing: 0 }; // volta ao sair do interior
  private dialogue: {
    name: string;
    lines: string[];
    idx: number;
    portrait?: string | null;
    choices?: DialogueChoice[];              // botões na última página (aceitar/recusar…)
    onChoice?: (id: string) => void;         // resposta ao clicar num botão
    onClose?: () => void;                    // roda ao fechar o diálogo (encadear ofertas)
  } | null = null;
  private lastPrompt = " ";
  private artCache = new Map<string, THREE.Texture>(); // artes 2D já carregadas (por URL)
  private _shadowTex?: THREE.Texture; // sombra de contato dos NPCs (gerada uma vez)
  // texturas de sprite-sheet que animam por UV (offset.x avança pelos quadros)
  private animTex: { tex: THREE.Texture; frames: number; fps: number }[] = [];
  // NPCs que caminham por uma rota (patrulha)
  // aldeões com rotina dia/noite: caminham do posto de dia até o destino noturno
  // (taverna/casa/ronda) e voltam ao amanhecer — passo a passo, sem teletransporte.
  private walkers: {
    mesh: THREE.Mesh;
    shadow: THREE.Mesh;
    tag: THREE.Sprite; // plaquinha de nome (acompanha o NPC ao andar)
    baseY: number;
    cur: { c: number; r: number }; // célula atual
    dayCell: { c: number; r: number };
    nightCell: { c: number; r: number };
    key: string; // célula atual no npcMap
    moving: boolean;
    t0: number;
    from: { c: number; r: number };
    to: { c: number; r: number };
    fromX: number; // interpolação em coords do mundo (p/ encostar na parede)
    fromZ: number;
    toX: number;
    toZ: number;
    waitUntil: number;
    // entrar/sair pela porta ao anoitecer/amanhecer
    inside: boolean; // recolhido dentro do prédio (invisível)
    doorDir: { dc: number; dr: number } | null | undefined; // dir da porta no posto noturno (undefined = não calculado)
    trans: { kind: "enter" | "exit"; t0: number; fromX: number; fromZ: number; toX: number; toZ: number } | null;
    entry: NpcEntry; // entrada de diálogo deste NPC (movida no npcMap ao andar)
    dayGoal: { c: number; r: number }; // destino DIURNO atual (perambulação perto do posto)
    roamRadius: number; // raio de perambulação diurna (0 = fica no posto)
    talking: boolean; // parado num papo com outro aldeão (não perambula)
    talkCooldownUntil: number; // não inicia novo papo/fala antes disto
  }[] = [];
  // balões de fala flutuantes (papo ambiente + conversas em par)
  private bubbles: { spr: THREE.Sprite; follow: THREE.Object3D; offY: number; bornAt: number; ttl: number }[] = [];
  // conversas em andamento entre dois aldeões (troca de falas alternada)
  private convos: { a: Game["walkers"][number]; b: Game["walkers"][number]; lines: string[]; idx: number; nextAt: number }[] = [];
  private nextChatterAt = 0; // próximo instante de fala ambiente solo
  private nextTalkCheckAt = 0; // próximo instante de checar pares p/ conversar
  private npcNight = false; // fase atual da rotina dos aldeões (com histerese)

  private startAt?: string;
  constructor(container: HTMLElement, character?: Character, startAt?: string) {
    this.container = container;
    this.startAt = startAt;
    // aplica a CLASSE escolhida (vida/mana/atributos + arma inicial)
    const cls = character ? CLASS_BY_ID[character.classId] : null;
    if (cls && character) {
      this.playerName = character.name;
      this.classId = cls.id;
      // primários FINAIS (base da classe + pontos distribuídos na criação).
      // A base da criação vira o PISO (não dá pra baixar disso na aba Atributos).
      this.prim = { ...(character.attr ?? cls.attr) };
      this.baseAttr = { ...(character.attr ?? cls.attr) };
      this.clsHp = cls.hp;
      this.clsMp = cls.mp;
      this.sec = derive(this.prim, this.clsHp, this.clsMp);
      this.stats.str = this.prim.str;
      this.stats.dex = this.prim.dex;
      this.stats.int = this.prim.int;
      this.playerMaxHp = this.sec.hp;
      this.playerHp = this.sec.hp;
      this.playerMaxMp = this.sec.mp;
      this.playerMp = this.sec.mp;
    }
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // TONE MAPPING cinematográfico (ACES) — realça brilhos/cor como jogo moderno;
    // vale p/ todas as cenas. Exposição levemente acima de 1 p/ o clima quente.
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.38; // jogo mais claro no geral
    container.appendChild(this.renderer.domElement);

    // overlay p/ o efeito de roçar folhagem (vinheta verde nas bordas)
    const fx = document.createElement("div");
    fx.style.cssText =
      "position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;" +
      "background:radial-gradient(ellipse at center," +
      "rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);";
    if (getComputedStyle(container).position === "static")
      container.style.position = "relative";
    container.appendChild(fx);
    this.foliageFx = fx;

    this.scene.background = new THREE.Color(FOG_COLOR);
    this.camera = new THREE.PerspectiveCamera(84, 1, 0.05, 400); // FOV bem aberto (mais campo de visão lateral; o breu/névoa mantém o suspense ao longe)
    this.camera.rotation.order = "YXZ";
    this.scene.add(this.world);

    // PÓS-PROCESSAMENTO: RenderPass (linear) → BLOOM (glow das luzes/tochas/portais) →
    // OutputPass (aplica tone mapping + sRGB no fim). Bloom sutil: só o bem claro
    // floresce (threshold alto), sem lavar a cena. Fallback: render direto.
    try {
      const w = container.clientWidth || window.innerWidth, h = container.clientHeight || window.innerHeight;
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.72, 0.55, 0.72);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    } catch { this.composer = undefined; }

    this.col = 0;
    this.row = 0;

    this.ui = setupControls(
      container,
      (a) => this.onAction(a),
      swordUrl,
      SWORD_ATK_ART ?? undefined,
      WEAPONS,
      (w, uid) => this.onEquip(w, uid),
      (ranks) => this.applyPassives(ranks),
      (id) => this.useSkill(id),
      (key, delta) => this.allocAttr(key, delta),
      (id) => { this.smithSel = id; this.ui.openSmith(this.buildSmithData()); }, // seleção no ferreiro
      () => this.smithUpgrade(), // apertou "Aprimorar"
      (mode) => this.setStoreMode(mode), // trocou aba comprar/vender
      (id, qty) => this.storeTrade(id, qty), // confirmou compra/venda
      (mode) => this.setStashMode(mode), // trocou aba guardar/retirar no baú
      (id, qty) => this.stashMove(id, qty), // confirmou guardar/retirar
      (id) => this.useConsumable(id), // usou um consumível na bandeja do HUD
      (id) => this.tavernBuyDrink(id), // comprou uma bebida
      (id, action) => this.tavernQuest(id, action), // aceitou/entregou missão
      (id) => this.onDialogueChoice(id), // clicou num botão de escolha do diálogo
      () => this.buildJournalData(), // abriu o Diário de Missões
      () => this.toggleGuide(), // ligou/desligou o guia pelo rastreador de missão
      (uid) => this.equipArmor(uid), // clicou numa armadura da mochila → equipa
      (slot) => this.unequipArmor(slot as ArmorSlot), // clicou no boneco → desequipa
    );
    this.initMainQuests(); // "A Névoa Devoradora": cap.1 disponível, resto trancado
    // seleção de alvo: clicar no esqueleto o coloca na mira (raycast na cena)
    this.renderer.domElement.addEventListener("pointerdown", (e) =>
      this.onCanvasPointer(e),
    );
    // começa APENAS com a arma da classe; as demais se compram no mercador
    const startW = cls?.startWeapon ?? "sword";
    this.ownedWeapons = [startW];
    this.smithSel = startW;
    // KIT INICIAL de armadura (T1) na mochila p/ o jogador já poder se equipar —
    // Comum, exceto um Mágico de brinde. (Fonte definitiva: loja + drops.)
    for (const s of ARMOR_SLOTS) this.giveArmor(s, 1, "comum");
    this.giveArmor("chest", 1, "magico");
    this.pushEquipUI();
    this.ui.equipWeapon(startW);
    this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
    this.ui.setMana(this.playerMp / this.playerMaxMp, this.playerMp, this.playerMaxMp); // mana cheia por enquanto
    // árvore de habilidades: classe + pontos = nível (1 ponto por nível).
    this.ui.setSkillInfo(this.classId, skillPointsFor(this.stats.level));
    this.refreshStats();
    this.refreshConsumables(); // bandeja de itens do HUD (vazia no começo)
    this.preloadFx(); // pré-carrega as folhas de efeito das habilidades
    const start = findStart();
    if (this.startAt === "showcase") {
      // acesso direto à sala-vitrine (?show=1); "sair" volta ao vilarejo
      this.returnTo = { col: start.col, row: start.row, facing: 0 };
      this.enterLocation("showcase", 0, 0, 0);
    } else if (this.startAt === "load") {
      // PERSONAGEM CARREGADO (save): sem a intro de despertar — cai direto na praça,
      // com o HUD já visível. O caller chama loadSave() logo após construir.
      const hd = HOME_DOORS.find((h) => h.id === "hedda")!;
      this.returnTo = { col: hd.c + hd.dc, row: hd.r + hd.dr, facing: 1 };
      this.enterLocation("village", start.col, start.row, 0);
      this.ui.hudReveal();
    } else {
      // ABERTURA: o forasteiro DESPERTA na casa da matriarca Hedda, que o acolheu
      // da névoa. Ao sair, cai na praça, em frente à casa dela.
      const hd = HOME_DOORS.find((h) => h.id === "hedda")!;
      this.returnTo = { col: hd.c + hd.dc, row: hd.r + hd.dr, facing: 1 };
      // acorda DEITADO na cama (parede leste, célula 5,3): a câmera fica na célula
      // ao lado da cama (4,3), voltada p/ o sul — de onde a Hedda vai se aproximar.
      this.enterLocation("hedda", 4, 3, 2);
      this.startWake();
    }

    window.addEventListener("resize", () => this.resize());
    this.resize();
    this.renderer.setAnimationLoop((t) => this.tick(t));

    // as plaquinhas de nome são rasterizadas num canvas; quando a fonte medieval
    // terminar de carregar, redesenha o local ATUAL (sem teletransportar) p/ elas
    // saírem já na fonte certa em vez do fallback.
    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => {
        if (!this.dialogue)
          this.enterLocation(this.location, this.col, this.row, this.facing);
      });
    }
    (window as unknown as { __game?: Game }).__game = this; // DEBUG: acesso p/ teste
  }

  // TRANSIÇÃO DE PORTA: fade preto rápido → constrói o novo cenário no escuro
  // (esconde o "pop-in" do PNG dos NPCs) → clareia. Simula atravessar a porta.
  private async doorTransition(build: () => void) {
    await this.ui.fadeOut(150);
    build();
    // segura o preto um instante p/ a arte do NPC carregar antes de aparecer
    await new Promise<void>((r) => window.setTimeout(r, 150));
    this.ui.fadeIn(260);
  }

  // ---------------------------------------------- troca de local (vila/interior)
  private enterLocation(
    loc: "village" | "forest" | "dungeon" | "showcase" | Estab | HomeId,
    col: number,
    row: number,
    facing: number,
  ) {
    this.clearWorld();
    this.scheduleSave(); // troca de cenário é um bom checkpoint p/ o auto-save
    // fora da masmorra o "andar atual" volta ao 1º (a lógica de missão lê células
    // 'L'/'A' do 1º andar a partir do vilarejo — não pode ficar num andar antigo).
    if (loc !== "dungeon") { this.dungeonFloor = 0; setDungeonFloor(0); }
    this.location = loc;
    this.outdoor = loc === "village" || loc === "forest";
    this.dialogue = null;
    this.stashCell = null; // só a casa da Hedda define o baú (em buildHome)
    this.ui.hideDialogue();
    if (loc === "village") {
      // MEIO-TERMO atmosférico: névoa puxada pra trás o bastante p/ revelar os
      // telhados, os postes, a montanha e o CÉU (contraste com a dungeon fechada),
      // mas ainda com bruma no médio/longo alcance mantendo o mistério grim.
      this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 4, CELL * 21);
      this.scene.background = new THREE.Color(FOG_COLOR);
      this.addVillageLights();
      this.buildVillage();
    } else if (loc === "forest") {
      // a MESMA neblina do mundo cobre a floresta, um pouco mais aberta por ser
      // externa — dá pra ver as copas e o céu por entre as árvores, com bruma ao
      // fundo. Mesma cor/caráter da vila.
      this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 4.5, CELL * 24);
      this.scene.background = new THREE.Color(FOG_COLOR);
      this.addForestLights();
      this.buildForest();
    } else if (loc === "dungeon") {
      // VISÃO LIMITADA porém JOGÁVEL: a tocha do herói ilumina o entorno e a
      // escuridão engole o longe. Claro até ~4 células, some no breu por volta de
      // 8-9 → clima fechado/corredor, mas dá pra ver os inimigos que se aproximam.
      // BIOMA muda no 3º andar (cripta do chefe): névoa/fundo mais quentes e
      // avermelhados, ar mais pesado (névoa um tico mais curta) — clima de perigo.
      // andar de CHEFE: 3º do Ato I (floor 2) e 6º do Ato II (floor 5).
      const boss = this.dungeonFloor === 2 || this.dungeonFloor === 5;
      const a2 = this.dungeonAct() === 2;
      // NÉVOA EXPONENCIAL (FogExp2): a escuridão cresce a cada quadrado — perto nítido
      // (a tocha do herói ilumina), e vai fechando gradualmente até o BREU total lá na
      // frente (~7-8 células). Sem corte seco. O chefe tem o ar um tico mais denso.
      // O ATO II agora é CINZA/neutro (o teal saiu) — só um azul-frio bem sutil pra
      // não ficar idêntico ao Ato I; os cogumelos dão o acento ciano localmente.
      const fogCol2 = a2 ? (boss ? 0x0c1114 : 0x0a0e10) : (boss ? 0x120609 : 0x090c10);
      const bgCol2 = a2 ? (boss ? 0x070b0d : 0x05080a) : (boss ? 0x0c0406 : 0x05070a);
      this.scene.fog = new THREE.FogExp2(fogCol2, boss ? 0.058 : 0.052);
      this.scene.background = new THREE.Color(bgCol2);
      this.addDungeonLights(boss); // iluminação NEUTRA (cinza) nos dois atos
      this.buildDungeon();
    } else if (loc === "showcase") {
      // mini-santuário: NÉVOA volumétrica densa (exponencial) — moody, não "céu".
      // Enche o recinto até o chão e some o topo das paredes. background = MESMA
      // cor da névoa → o vazio acima vira névoa (sem borda de "céu").
      const fogCol = 0x7c8390; // névoa moody (igual à do santuário)
      // névoa CONTÍNUA por distância — sem borda. Densidade média: densa o bastante
      // p/ o clima do santuário no topo (bruma fechada), mas ainda deixa ver a rampa
      // subindo dentro da torre. A névoa por altura esconde o topo das paredes.
      this.scene.fog = new THREE.FogExp2(fogCol, 0.062);
      this.scene.background = new THREE.Color(fogCol);
      this.addShowcaseLights();
      this.buildShowcase();
    } else if (loc in HOMES) {
      this.scene.fog = new THREE.Fog(0x241a10, CELL * 4, CELL * 12);
      this.scene.background = new THREE.Color(0x160f08);
      this.addInteriorLights();
      this.buildHome(loc as HomeId);
    } else {
      this.scene.fog = new THREE.Fog(0x1a140d, CELL * 4, CELL * 12);
      this.scene.background = new THREE.Color(0x120e09);
      this.addInteriorLights();
      this.buildInterior(loc as Estab);
    }
    this.col = col;
    this.row = row;
    this.facing = facing;
    if (this.location === "showcase") {
      // sala-vitrine: movimento por ESTAÇÕES (hélice); a câmera segue o caminho.
      this.showIdx = 0;
      this.stairUp = true; // entra no pé da escada olhando p/ CIMA
      this.applyShowcasePose();
    } else {
      this.camera.position.set(col * CELL, this.floorYAt(col, row) + EYE_H, row * CELL);
      this.camera.rotation.y = -facing * (Math.PI / 2);
    }
    this.anim = null;
    this.lastPrompt = " ";
    this.ui.setPrompt(null); // limpa dica anterior ao trocar de local
    this.buildMiniGrid(); // grade do novo local
    this.pushMinimap();
    this.updateMusic(); // trilha do vilarejo toca na vila e nos interiores
    this.mainQuestOnEnter(loc as string); // etapa "enter" (ex.: Santuário) do capítulo ativo
    this.maybeShowIntro(); // narração de abertura na 1ª vez que a vila carrega
  }
  // (a narração de abertura agora acontece na sequência de ACORDAR, não na vila)
  private maybeShowIntro() { /* substituído por startWake/startWakeDialogue */ }
  // ABERTURA — o forasteiro desperta na casa da Hedda: a câmera sobe de "deitado"
  // até de pé (ver tick), sob um fade-in, e então a narração/fala começa.
  private startWake() {
    this.waking = true;
    this.wakeStart = -1;                        // setado no 1º tick (base de tempo)
    this.introShown = true; // desativa a antiga narração de vila
    this.ui.hudConceal(); // só a VISÃO do jogador: nada de HUD/arma até a Hedda entregar a arma
    const fy = this.floorYAt(this.col, this.row);
    this.camera.position.y = fy + Game.LIE_Y;   // deitado no colchão, câmera baixa
    this.camera.rotation.x = Game.LIE_PITCH;    // olhando reto p/ o teto de vigas
    this.ui.setPrompt(null);
    // a Hedda começa AFASTADA (canto sudoeste) p/ depois caminhar até a cama
    this.moveNpcTo("Hedda", 2, 5);
  }
  // acha o rig de um NPC por trecho do nome
  private findRig(nameSub: string): NpcRig | null {
    for (const [nm, r] of this.npcRig) if (nm.includes(nameSub)) return r;
    return null;
  }
  // reposiciona instantaneamente o rig de um NPC (mesh+sombra+plaquinha) numa célula
  private moveNpcTo(nameSub: string, col: number, row: number) {
    const rig = this.findRig(nameSub);
    if (!rig) return;
    this.setRigXZ(rig, col * CELL, row * CELL);
  }
  private setRigXZ(rig: NpcRig, x: number, z: number) {
    rig.mesh.position.x = x; rig.mesh.position.z = z;
    rig.shadow.position.x = x; rig.shadow.position.z = z;
    rig.tag.position.x = x; rig.tag.position.z = z;
  }
  // cobertura das pálpebras (vh) durante a fase de piscar — groggy: fecha bem,
  // entreabre, pisca, abre mais, pisca rápido, abre de vez. Interpola keyframes.
  private wakeEyelidCover(ms: number): number {
    const kf: [number, number][] = [[0, 52], [340, 12], [600, 46], [900, 6], [1220, 40], [1520, 4], [1820, 30], [2200, 0]];
    for (let i = 1; i < kf.length; i++) {
      if (ms <= kf[i][0]) {
        const [t0, v0] = kf[i - 1], [t1, v1] = kf[i];
        const f = (ms - t0) / (t1 - t0);
        return v0 + (v1 - v0) * f;
      }
    }
    return 0;
  }
  // 1ª parte: narração fria do despertar (sem retrato) → a Hedda CAMINHA até você
  private startWakeDialogue() {
    this.openDialogue("", [
      "Escuro. Frio. Cheiro de fumaça de lenha e de ervas secas.",
      "Você abre os olhos sob um teto de vigas baixas. Está deitado numa cama estranha. Não se lembra de ter se deitado aqui. Não se lembra… de muita coisa.",
      "Do outro lado do cômodo, uma mulher idosa de xale cinzento nota que você despertou. Ela larga o que fazia e vem em sua direção.",
    ], null, { onClose: () => this.startHeddaWalk() });
  }
  // a Hedda caminha (passo a passo, sem atravessar objetos) do canto até a cama
  private static readonly WAKE_STEP_MS = 640; // duração da caminhada por célula
  private startHeddaWalk() {
    const rig = this.findRig("Hedda");
    if (!rig) { this.wakeHeddaDialogue(); return; } // sem rig (fallback): fala direto
    this.introWalk = true; // trava a entrada durante a caminhada (sem diálogo aberto)
    // caminho válido pelo chão: (2,5)→(2,4)→(3,4)→(4,4), ao lado da cama do jogador
    const cells: [number, number][] = [[2, 5], [2, 4], [3, 4], [4, 4]];
    const pts = cells.map(([c, r]) => ({ x: c * CELL, z: r * CELL }));
    this.wakeWalk = { rig, pts, endCell: "4,4", t0: -1, onArrive: () => {} };
    // FAILSAFE (não depende do laço de render): se por qualquer motivo a caminhada
    // não terminar (aba throttled, exceção no quadro, etc.), força a chegada aqui —
    // assim a conversa SEMPRE abre e o jogo NUNCA fica travado na introdução.
    const total = Game.WAKE_STEP_MS * (pts.length - 1) + 500;
    window.setTimeout(() => this.arriveHedda(), total);
  }
  // conclui a chegada da Hedda (idempotente): fixa a posição, reabre a interação e
  // inicia a fala. Chamado tanto pela animação quanto pelo failsafe (o 1º que ocorrer).
  private arriveHedda() {
    if (!this.introWalk) return; // já chegou
    const w = this.wakeWalk;
    if (w) {
      const last = w.pts[w.pts.length - 1];
      this.setRigXZ(w.rig, last.x, last.z);
      w.rig.mesh.position.y = w.rig.baseY;
      // atualiza a chave de interação p/ a célula final (talk por aproximação)
      const entry = this.npcMap.get(w.rig.homeKey);
      if (entry) { this.npcMap.delete(w.rig.homeKey); this.npcMap.set(w.endCell, entry); w.rig.homeKey = w.endCell; }
    }
    this.wakeWalk = null;
    this.introWalk = false;
    this.wakeHeddaDialogue();
  }
  // anima a caminhada roteirizada da Hedda (chamado a cada quadro no tick)
  private updateWakeWalk(now: number) {
    const w = this.wakeWalk;
    if (!w) return;
    const STEP_MS = Game.WAKE_STEP_MS;
    if (w.t0 < 0) w.t0 = now;
    const t = now - w.t0;
    const seg = Math.floor(t / STEP_MS);
    if (seg >= w.pts.length - 1) { this.arriveHedda(); return; }
    const p = (t % STEP_MS) / STEP_MS;
    const e = p * p * (3 - 2 * p);
    const a = w.pts[seg], b = w.pts[seg + 1];
    this.setRigXZ(w.rig, a.x + (b.x - a.x) * e, a.z + (b.z - a.z) * e);
    w.rig.mesh.position.y = w.rig.baseY + Math.sin(p * Math.PI) * 0.05; // leve balanço do passo
  }
  // 2ª parte: a matriarca Hedda explica o resgate, sonda a amnésia e ENTREGA a
  // arma. Ao fechar, o HUD (e a arma na mão) surge com um fade rápido.
  private wakeHeddaDialogue() {
    this.openDialogue("Hedda, a Matriarca", [
      "Ah… os seus olhos voltaram a enxergar. Louvado seja o que ainda vela por este vilarejo.",
      "Fique quieto mais um instante. Encontrei você caído na boca da névoa, roxo de frio, e o arrastei para dentro antes que a bruma fechasse o cerco sobre você. Dormiu dois dias inteiros.",
      "Diga-me: lembra do seu nome? …De como veio parar na estrada? Não. Eu imaginava.",
      "Não se martirize por isso. A névoa cobra esse preço de todos que a atravessam — leva primeiro as lembranças, depois o nome, e por fim a pessoa inteira. Você teve sorte de parar aqui.",
      "Falava enquanto dormia. Nomes, uma estrada longa, um sino tocando ao longe. Guardei cada palavra, para o caso de um dia voltarem a lhe pertencer.",
      "Chega de conversa deitado. Isto aqui estava amarrado às suas costas quando o encontrei — a única coisa que a bruma não lhe tomou. É sua. Segure-a firme: vai precisar dela por estas bandas.",
    ], heddaUrl, { onClose: () => this.finishWakeIntro() });
  }
  // ENTREGA da arma: revela o HUD (arma + botões surgem juntos, fade rápido) e só
  // então aponta o primeiro objetivo — "agora o jogo realmente começou".
  private finishWakeIntro() {
    this.ui.hudReveal();
    const wname = WEAPON_BY_ID[this.ownedWeapons[0]]?.name ?? "sua arma";
    this.ui.toast(`⚔ ${wname} em mãos`);
    window.setTimeout(() => {
      const d = this.mqDef("mq1");
      if (d) this.mqObjectiveToast(d);
      this.pushTracker();
    }, 950);
  }

  // ---- TRILHA DE FUNDO ----
  // A música do vilarejo toca na praça E nos interiores (taverna/lojas/casas);
  // silencia na floresta, na masmorra e na sala-vitrine.
  private updateMusic() {
    const wantVillage = this.location !== "forest" && this.location !== "dungeon" && this.location !== "showcase";
    if (wantVillage) {
      if (this.bgmVillage.paused) this.bgmVillage.play().catch(() => this.armMusicGesture());
    } else if (!this.bgmVillage.paused) {
      this.bgmVillage.pause();
    }
  }
  // navegadores bloqueiam autoplay até um gesto do usuário; se o play() falhar,
  // religa a trilha no primeiro toque/tecla.
  private armMusicGesture() {
    if (this.musicArmed) return;
    this.musicArmed = true;
    const resume = () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      this.musicArmed = false;
      this.updateMusic();
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
  }

  private clearWorld() {
    this.world.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) mat.dispose();
    });
    this.world.clear();
    this.blocked.clear();
    this.gates.clear();
    this.gateAnims = [];
    this.motes = [];
    this.fogPuffs = [];
    this.fogDome = undefined;
    this.skyUniforms = undefined;
    this.npcs = [];
    this.flames = [];
    this.fireFlames = [];
    this.lampFlames = [];
    this.lampGlows = [];
    this.dayNightLights = [];
    this.animTex = [];
    this.walkers = [];
    this.smoke = [];
    this.billboardProps = [];
    this.chests.clear();
    this.enemies = [];
    this.target = null;
    this.playerTorch = undefined; // descartada pelo world.clear(); recriada por local
    this.reticle = null; // foi descartado pelo world.clear(); recria sob demanda
    this.clearTarget();
    this.projectiles = []; // as meshes já saíram no world.clear() acima
    this.enemyBolts = [];
    this.poofs = [];
    this.waterGlint = undefined;
    this.portalPlanes = []; // meshes descartadas pelo world.clear(); zera as refs
    this.doorMap.clear();
    this.homeDoorMap.clear();
    this.npcMap.clear();
    this.npcRig.clear();
    this.wakeWalk = null;
    this.introWalk = false; // nunca deixa a entrada travada ao trocar de local
    this.drops = []; // meshes já saíram no world.clear(); zera a lista lógica
    this.bubbles = []; // balões de fala (sprites já saíram no world.clear())
    this.convos = [];
    this.nextChatterAt = 0;
    this.nextTalkCheckAt = 0;
  }

  private addVillageLights() {
    const amb = new THREE.AmbientLight(0x8a92a2, 0.75);
    const hemi = new THREE.HemisphereLight(0x9aa6b8, 0x3a2c1c, 0.7);
    const dir = new THREE.DirectionalLight(0xffe7c0, 0.55);
    dir.position.set(-6, 12, 4);
    this.world.add(amb);
    this.world.add(hemi);
    this.world.add(dir);
    // moduladas pelo ciclo dia/noite (cor + intensidade de dia → de noite).
    // à noite continua visível (luar azulado) — escuro o bastante p/ os lampiões
    // se destacarem, claro o bastante p/ o jogador enxergar o caminho.
    this.registerDayLight(amb, 0x3a4a6a, 0.46);
    this.registerDayLight(hemi, 0x2c3c5e, 0.5);
    this.registerDayLight(dir, 0x5566a0, 0.14); // vira "luar" fraco à noite
  }

  // registra uma luz p/ o ciclo dia/noite: guarda os valores de dia e a meta noturna
  private registerDayLight(light: THREE.Light, nightHex: number, nightMul: number) {
    this.dayNightLights.push({
      light,
      dayI: light.intensity,
      dayColor: (light.color as THREE.Color).clone(),
      nightColor: new THREE.Color(nightHex),
      nightMul,
    });
  }

  // luminosidade do dia [0,1]: 0 à noite, 1 ao meio-dia (elevação do sol)
  private daylight(t: number): number {
    const elev = Math.sin((t - 0.25) * Math.PI * 2); // +1 ao meio-dia, <0 à noite
    return Math.max(0, Math.min(1, elev * 1.15));
  }

  // avança o ciclo dia/noite e aplica cor/luz (só em locais externos)
  private updateDayNight(now: number) {
    if (!this.outdoor) return;
    const t = (now / DAY_MS + DAY_START) % 1;
    const lum = this.daylight(t);
    // CÉU: cores/sol/lua/estrelas da ETAPA DO DIA vão pro shader da cúpula
    const ph = this.sampleSky(t);
    const u = this.skyUniforms;
    if (u) {
      u.uTop.value.setRGB(ph.top[0], ph.top[1], ph.top[2], THREE.SRGBColorSpace);
      u.uHor.value.setRGB(ph.hor[0], ph.hor[1], ph.hor[2], THREE.SRGBColorSpace);
      u.uSun.value.setRGB(ph.sun[0], ph.sun[1], ph.sun[2], THREE.SRGBColorSpace);
      u.uSunI.value = ph.sunI;
      u.uStarI.value = ph.starI;
      u.uMoonI.value = ph.starI; // a lua acompanha as estrelas (noite)
      u.uTime.value = now * 0.001;
      // SOL e LUA percorrem o céu em ELEVAÇÃO BAIXA (~14°→30°) p/ ficarem sempre
      // VISÍVEIS acima dos telhados (o jogo olha na horizontal). Giram no azimute
      // ao longo do dia; a lua fica no lado oposto ao sol.
      const ang = (t - 0.25) * Math.PI * 2; // 0 no amanhecer
      const s = Math.sin(ang);
      const Es = (14 + 16 * Math.max(0, s)) * (Math.PI / 180);  // elevação do sol
      const Em = (14 + 16 * Math.max(0, -s)) * (Math.PI / 180); // elevação da lua
      const ces = Math.cos(Es), ses = Math.sin(Es);
      const cem = Math.cos(Em), sem = Math.sin(Em);
      u.uSunDir.value.set(ces * Math.sin(ang), ses, ces * Math.cos(ang)).normalize();
      u.uMoonDir.value.set(cem * Math.sin(ang + Math.PI), sem, cem * Math.cos(ang + Math.PI)).normalize();
    }
    // névoa + fundo acompanham a cor do HORIZONTE da etapa (costura com o céu)
    this._sky.setRGB(ph.hor[0], ph.hor[1], ph.hor[2], THREE.SRGBColorSpace);
    if (this.scene.fog) (this.scene.fog as THREE.Fog).color.copy(this._sky);
    (this.scene.background as THREE.Color).copy(this._sky);
    // luzes principais: intensidade e cor de dia → noite
    for (const d of this.dayNightLights) {
      const mul = d.nightMul + (1 - d.nightMul) * lum;
      d.light.intensity = d.dayI * mul;
      (d.light.color as THREE.Color).copy(d.nightColor).lerp(d.dayColor, lum);
    }
    // postes de rua: acendem ao anoitecer (ganho 0 de dia → 1 de noite)
    const lampGain = Math.max(0, Math.min(1, (0.5 - lum) / 0.35));
    for (const f of this.lampFlames) {
      const flick = f.base + Math.sin(now * 0.011 + f.base) * 0.8 + Math.sin(now * 0.027) * 0.5;
      f.light.intensity = Math.max(0, flick) * lampGain;
    }
    // halo da lanterna acompanha o ganho noturno, com leve tremeluzir
    for (const g of this.lampGlows) {
      const flick = 0.88 + Math.sin(now * 0.011) * 0.08 + Math.sin(now * 0.027) * 0.04;
      (g.material as THREE.SpriteMaterial).opacity = lampGain * flick;
    }
  }

  private addInteriorLights() {
    this.world.add(new THREE.AmbientLight(0xc4a870, 1.15));
    this.world.add(new THREE.HemisphereLight(0xa08a60, 0x3a3020, 0.75));
  }

  private buildVillage() {
    const cobbleMat = new THREE.MeshLambertMaterial({ map: tex.cobblestone(7) });
    // PAREDES das casas: PEDRA em tons variados (quebra o cinza monótono) + umas
    // poucas de MADEIRA (casas de taipa). Cada casa sorteia um tom → cidade viva.
    // A cor MULTIPLICA a textura (dá variação sem precisar de mais arte).
    const wallTint = (t: THREE.Texture, hex: number) =>
      new THREE.MeshLambertMaterial({ map: t, color: new THREE.Color(hex) });
    // Paredes das casas: SÓ PEDRA, em cor NATURAL (sem tint, sem madeira). A
    // diferenciação vem das plantas/fissuras/janelas coladas depois.
    // PBR + normal map também nas CASAS (o relevo da alvenaria pega a luz do dia/noite)
    // MESMA alvenaria (tex_stonewall) e MESMA ESCALA da masmorra p/ coesão total:
    // a masmorra tila ~0.25 telha/unidade; a face da casa é 4 (larg) × 3.2 (alt) →
    // repeat (1, 0.8) reproduz exatamente esse tamanho de bloco (nada esticado, nada
    // "resetando"), então dentro e fora e a dungeon parecem a MESMA construção.
    const houseWall = this.pbrStone(texStoneUrl, "vwall", { rough: 0.92, normal: 1.5, repeat: [1, 0.8] });
    const wallMats = [houseWall];
    // TELHADOS de palha em tons variados (uns dourados, uns castanhos, uns velhos).
    const roofMats = [
      wallTint(tex.thatch(3), 0xe9d197),
      wallTint(tex.thatch(3), 0xc3a066),
      wallTint(tex.thatch(3), 0xaa9678),
    ];
    roofMats.forEach((m) => (m.side = THREE.DoubleSide));
    // portas/janelas e adornos: DECALQUES em PNG (arte) colados na parede.
    const doorMat = this.decalMat(decDoorUrl, 0.4);
    const winMat = this.decalMat(decWindowUrl, 0.4);
    const torchMat = this.decalMat(decTorchUrl, 0.1); // chama suave
    const bannerMat = this.decalMat(decBannerUrl, 0.4);
    const ivyMat = this.decalMat(decIvyUrl, 0.4);
    const cracksMat = this.decalMat(decCracksUrl, 0.08); // fissuras finas

    const hash = (a: number, b: number, s = 0) =>
      (Math.sin(a * 12.9 + b * 78.2 + s * 3.1) * 43758.5) % 1;

    // chão de pedra da vila (por célula; NÃO cobre a masmorra p/ não tapar a escada).
    // Rotação de 0/90/180/270° por célula quebra a repetição visível do padrão.
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (isDungeon(c, r)) continue; // o túnel tem chão próprio
        const t = new THREE.Mesh(tileGeo, cobbleMat);
        t.rotation.x = -Math.PI / 2;
        const quarter = Math.floor(Math.abs(hash(c, r, 5)) * 4) % 4;
        t.rotation.z = (quarter * Math.PI) / 2;
        t.position.set(c * CELL, 0, r * CELL);
        this.world.add(t);
      }

    const boxGeo = new THREE.BoxGeometry(CELL, WALL_H, CELL);

    // faces reservadas a portas (lojas E casas): não recebem janela aleatória
    const estabFaces = new Set([
      ...ESTAB_DOORS.map((e) => `${e.c},${e.r},${e.dc},${e.dr}`),
      ...HOME_DOORS.map((e) => `${e.c},${e.r},${e.dc},${e.dr}`),
    ]);

    const doorFaces = new Set<string>();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (cellAt(c, r) !== "building") continue;
        // visível se faz fronteira com rua/barril
        const streetDirs = DIRS.filter(([dc, dr]) => {
          const k = cellAt(c + dc, r + dr);
          return k === "street" || k === "barrel";
        });
        if (streetDirs.length === 0) continue;

        const wm = wallMats[Math.floor(Math.abs(hash(c, r)) * 997) % wallMats.length];
        const box = new THREE.Mesh(boxGeo, wm);
        box.position.set(c * CELL, WALL_H / 2, r * CELL);
        this.world.add(box);

        for (const [dc, dr] of streetDirs) {
          if (estabFaces.has(`${c},${r},${dc},${dr}`)) {
            doorFaces.add(`${c},${r},${dc},${dr}`);
            continue; // porta tratada em buildEstablishments
          }
          // adorno da face: janela (comum) + tocha/bandeira/hera/rachadura sorteados
          // → cada casa fica diferente e a cidade ganha vida.
          const roll = Math.abs(hash(c, r, dc * 7 + dr * 3)) % 1;
          const fx = c * CELL + dc * (CELL / 2 + 0.05);
          const fz = r * CELL + dr * (CELL / 2 + 0.05);
          // Paredes são todas de pedra natural → a diferença vem das plantas e
          // fissuras (mais frequentes). Bandeira é exclusiva das lojas.
          if (roll < 0.4) {
            this.addWallDecal(c, r, dc, dr, winMat, 1.9, 1.9, 1.75);
          } else if (roll < 0.5) {
            this.addWallDecal(c, r, dc, dr, torchMat, 0.95, 1.55, 2.15);
            this.glowLight(fx + dc * 0.25, 2.35, fz + dr * 0.25, 0xffa040, 3.0, 9);
          } else if (roll < 0.71) {
            this.addWallDecal(c, r, dc, dr, ivyMat, 2.3, 1.5, 1.05);
          } else if (roll < 0.87) {
            this.addWallDecal(c, r, dc, dr, cracksMat, 1.8, 1.6, 1.6);
          }
        }
      }
    }

    // telhados CONTÍNUOS por trecho de parede (evita retalhos soltos)
    this.buildRoofs(roofMats);

    void doorFaces; // (barris procedurais removidos — só props em PNG na cidade)

    // montanha no canto + entrada da masmorra (túnel de tiles de dungeon)
    this.addSkyDome(); // céu soturno (gradiente + nuvens) por trás da névoa
    this.buildMountain();
    this.buildTunnel();
    this.buildDungeonEnemy();

    // pontos de interesse
    this.buildWaypoint(); // arco de pedra + plataforma elevada (substitui o poço)
    this.tempPortal = undefined; // mesh foi descartada pelo world.clear()
    if (this.dungeonReturn) this.openTempCityPortal(); // retorno pendente → recria o portal
    // BAÚ de teste na praça, ao lado do poço (WELL em 7,10) → fácil de achar p/ testar
    // o chocalho/abertura do baú sem precisar descer à masmorra.
    this.buildChestBillboard(9 * CELL, 10 * CELL, 9, 10);
    this.buildEstablishments(doorMat, bannerMat);
    this.buildHomes(doorMat);
    this.buildVillageForestGate();
    this.buildVillageProps();
    this.buildPlazaProps(); // barracas/caixotes/feno (bloqueiam a célula)
    this.buildChimneySmoke();
    this.buildNPCs();

    void MAP;
  }

  // adereços da praça — apenas os props em PNG (poste + mural). Os objetos 3D
  // procedurais (lenha, caixotes, floreiras, sacos) foram removidos.
  private buildVillageProps() {
    // POSTES de rua: nas quinas da praça, mas AFASTADOS das paredes p/ o topo
    // (a lanterna) não ficar escondido dentro do beiral do telhado das casas.
    // Formam um retângulo em volta do poço. Sem colisão (dá p/ passar por eles).
    this.addLampPost(4, 7); // NO
    this.addLampPost(10, 7); // NE
    this.addLampPost(4, 11); // SO
    this.addLampPost(10, 11); // SE
    // lampiões extras — AFASTADOS das portas (nunca na célula em frente a uma porta):
    // as portas do norte ficam em (5,6)(7,6)(9,6); a do ferreiro em (2,9); a do
    // alquimista em (12,9). Recuamos um passo p/ dentro da praça p/ não obstruir.
    this.addLampPost(7, 8); // norte-centro, recuado da fileira de portas (era 7,6)
    this.addLampPost(3, 8); // oeste, ao lado da porta do ferreiro (era 2,9)
    this.addLampPost(11, 8); // leste, ao lado da porta do alquimista (era 12,9)
    this.addLampPost(7, 12); // sul (perto do portão)
    // prop FIXO colado na parede, virado p/ a praça: só o mural (parede oeste)
    this.addWallProp(2, 10, propNoticeUrl, 2.7, "W");
  }

  // PROPS de "praça viva": barracas de feira, caixotes, feno e sacos espalhados
  // pelas bordas (dão vida sem parecer vazio). Cada célula ocupada entra em
  // `blocked` → jogador e aldeões desviam (plazaWalkable também respeita blocked).
  private buildPlazaProps() {
    const wood = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const wood2 = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(9), color: new THREE.Color(0xa78a5e) });
    const cloth1 = new THREE.MeshLambertMaterial({ color: 0x8a3b34, side: THREE.DoubleSide }); // faixa vinho
    const cloth2 = new THREE.MeshLambertMaterial({ color: 0xcdbf94, side: THREE.DoubleSide }); // faixa creme
    const hayMat = new THREE.MeshLambertMaterial({ map: tex.thatch(3), color: new THREE.Color(0xd8be77) });
    const sackMat = new THREE.MeshLambertMaterial({ color: 0xb2a17d });
    const crate = (s: number) => new THREE.Mesh(new THREE.BoxGeometry(s, s, s), wood);
    const produceMats = [
      new THREE.MeshLambertMaterial({ color: 0xa8451f }), // maçãs/tomates
      new THREE.MeshLambertMaterial({ color: 0xc79a3a }), // abóboras/pães
      new THREE.MeshLambertMaterial({ color: 0x6f7a3a }), // verduras
    ];

    // BARRACA de feira (maior e mais rica): 4 postes + vigas + toldo listrado com
    // franja + balcão de tábuas + prateleira ao fundo + mercadoria variada.
    const buildStall = () => {
      const g = new THREE.Group();
      const HW = 1.35, DB = -0.75, DF = 0.95, PH = 2.15; // meia-largura, fundo, frente, altura
      // 4 postes
      for (const sx of [-HW, HW]) for (const sz of [DB, DF]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, PH, 0.14), wood2);
        post.position.set(sx, PH / 2, sz); g.add(post);
      }
      // vigas de topo (frente + fundo) ligando os postes
      for (const sz of [DB, DF]) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(HW * 2 + 0.14, 0.12, 0.12), wood2);
        beam.position.set(0, PH, sz); g.add(beam);
      }
      // TOLDO listrado (7 faixas), inclinado p/ a frente, cobrindo além dos postes
      const awn = new THREE.Group();
      awn.position.set(0, PH + 0.14, 0.15); awn.rotation.x = -0.36;
      const stripeW = (HW * 2 + 0.5) / 7, awnLen = 2.05;
      for (let i = 0; i < 7; i++) {
        const st = new THREE.Mesh(new THREE.BoxGeometry(stripeW + 0.01, 0.05, awnLen), i % 2 ? cloth1 : cloth2);
        st.position.set(-(HW + 0.25) + stripeW * (i + 0.5), 0, 0); awn.add(st);
      }
      g.add(awn);
      // FRANJA/babado na beira frontal do toldo (dá o ar de feira)
      for (let i = 0; i < 9; i++) {
        const f = new THREE.Mesh(new THREE.BoxGeometry((HW * 2 + 0.4) / 9 + 0.005, 0.2, 0.04), i % 2 ? cloth2 : cloth1);
        f.position.set(-(HW + 0.18) + ((HW * 2 + 0.4) / 9) * (i + 0.5), PH + 0.42, DF + 0.42);
        g.add(f);
      }
      // BALCÃO (tampo + frente de tábuas)
      const counter = new THREE.Mesh(new THREE.BoxGeometry(HW * 2 + 0.2, 0.16, 0.7), wood);
      counter.position.set(0, 0.92, DF - 0.05); g.add(counter);
      const apron = new THREE.Mesh(new THREE.BoxGeometry(HW * 2 + 0.2, 0.86, 0.08), wood2);
      apron.position.set(0, 0.45, DF + 0.28); g.add(apron);
      // PRATELEIRA ao fundo com sacos
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(HW * 2, 0.1, 0.34), wood);
      shelf.position.set(0, 1.35, DB + 0.2); g.add(shelf);
      for (const x of [-0.7, 0.05, 0.75]) {
        const sk = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), sackMat);
        sk.scale.set(1, 1.25, 1); sk.position.set(x, 1.65, DB + 0.2); g.add(sk);
      }
      // MERCADORIA no balcão: caixotes + montinhos de "frutas" + um saco
      const c1 = crate(0.42); c1.position.set(-HW + 0.45, 1.21, DF - 0.05); g.add(c1);
      const c2 = crate(0.34); c2.position.set(HW - 0.4, 1.17, DF - 0.02); c2.rotation.y = 0.4; g.add(c2);
      // pirâmide de frutas dentro do 1º caixote
      let k = 0;
      for (const [dx, dz] of [[-0.12, -0.1], [0.12, -0.1], [0, 0.12], [0, 0]] as [number, number][]) {
        const fr = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), produceMats[k % 3]);
        fr.position.set(-HW + 0.45 + dx, 1.46 + (k === 3 ? 0.08 : 0), DF - 0.05 + dz); g.add(fr); k++;
      }
      const sk2 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), sackMat);
      sk2.scale.set(1, 1.2, 1); sk2.position.set(0.15, 1.16, DF - 0.02); g.add(sk2);
      return g;
    };
    // pilha de caixotes
    const buildCrates = () => {
      const g = new THREE.Group();
      const a = crate(0.7); a.position.set(-0.35, 0.35, 0); a.rotation.y = 0.2; g.add(a);
      const b = crate(0.62); b.position.set(0.42, 0.31, 0.15); b.rotation.y = -0.3; g.add(b);
      const c = crate(0.55); c.position.set(-0.22, 0.92, 0.02); c.rotation.y = 0.5; g.add(c);
      return g;
    };
    // fardos de feno (cilindros deitados)
    const buildHay = () => {
      const g = new THREE.Group();
      const bale = (x: number, z: number, y: number, rot: number) => {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.92, 12), hayMat);
        b.rotation.z = Math.PI / 2; b.rotation.y = rot; b.position.set(x, y, z); g.add(b);
      };
      bale(-0.4, 0, 0.42, 0); bale(0.5, 0.12, 0.42, 0.3); bale(0.05, -0.05, 1.24, 0.12);
      return g;
    };
    // sacos empilhados + um barril
    const buildSacks = () => {
      const g = new THREE.Group();
      for (const [x, z, s] of [[-0.4, 0, 0.4], [0.2, 0.2, 0.36], [0.5, -0.3, 0.32]] as [number, number, number][]) {
        const sk = new THREE.Mesh(new THREE.SphereGeometry(s, 10, 8), sackMat);
        sk.scale.set(1, 1.3, 1); sk.position.set(x, s * 1.15, z); g.add(sk);
      }
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.34, 1, 12), wood);
      bar.position.set(-0.55, 0.5, 0.5); g.add(bar);
      return g;
    };

    const place = (c: number, r: number, dc: number, dr: number, g: THREE.Group) => {
      g.position.set(c * CELL, 0, r * CELL);
      g.rotation.y = Math.atan2(dc, dr); // "frente" (+Z local) aponta p/ a praça
      this.world.add(g);
      this.blocked.add(`${c},${r}`);
    };
    // células escolhidas p/ NÃO ter poste de rua bem à frente (senão a lanterna
    // corta a barraca no meio). Postes ficam em (4,7)(10,7)(4,11)(10,11)(7,8)…
    place(6, 6, 0, 1, buildStall());     // barraca na borda norte (abre p/ a praça)
    place(8, 12, 0, -1, buildStall());   // barraca na borda sul
    place(12, 7, -1, 0, buildCrates());  // caixotes na parede leste
    place(2, 12, 1, 0, buildHay());      // feno no canto sudoeste
    place(5, 12, 0, -1, buildSacks());   // sacos na borda sul
    place(11, 12, 0, -1, buildCrates()); // caixotes na borda sul-leste
  }

  // textura radial (branco→transparente) p/ o halo luminoso da lanterna (cache)
  private makeGlowTex(): THREE.Texture {
    if (this.glowTex) return this.glowTex;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const g = cv.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,244,214,1)");
    grd.addColorStop(0.28, "rgba(255,207,138,0.72)");
    grd.addColorStop(1, "rgba(255,190,120,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    this.glowTex = new THREE.CanvasTexture(cv);
    return this.glowTex;
  }

  // poste de rua: billboard (encara a câmera) + luz quente forte no topo + halo
  // luminoso na lanterna. dx/dz empurram o poste p/ perto da parede/canto.
  private addLampPost(c: number, r: number, dx = 0, dz = 0) {
    const x = c * CELL + dx, z = r * CELL + dz;
    this.addPropBillboard(c, r, propLampUrl, 3.4, dx, dz);
    const HEAD = 2.95; // altura da lanterna (topo do poste)
    // luz que ilumina de fato o chão e os arredores (piscina de luz quente)
    const light = new THREE.PointLight(0xffcf8a, 4.2, 17, 2);
    light.position.set(x, HEAD, z);
    this.world.add(light);
    // poste externo: tremeluz como vela E acende só à noite (ciclo dia/noite)
    this.lampFlames.push({ light, base: 4.2 });
    // halo luminoso na própria lanterna (senão o topo do PNG fica escuro à noite)
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.makeGlowTex(),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.position.set(x, HEAD, z);
    glow.scale.set(2.6, 2.6, 1);
    this.world.add(glow);
    this.lampGlows.push(glow);
  }

  // prop 2D (PNG recortado) como billboard que ENCARA A CÂMERA (poste). Nasce
  // invisível e aparece ao carregar a arte, base no chão, largura pelo aspecto.
  private addPropBillboard(c: number, r: number, url: string, worldH: number, dx = 0, dz = 0) {
    const mat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0,
      alphaTest: 0.4,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(worldH, worldH), mat);
    mesh.position.set(c * CELL + dx, worldH / 2, r * CELL + dz);
    this.world.add(mesh);
    this.billboardProps.push(mesh);
    // sem colisão: o jogador passa em frente/pelo poste (só decoração)
    this.loadArt(url, (t) => {
      const im = t.image as { width: number; height: number } | undefined;
      const asp = im && im.width && im.height ? im.width / im.height : 1;
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(worldH * asp, worldH);
      mesh.position.y = worldH / 2; // mantém a base no chão
      mat.map = t;
      mat.opacity = 1;
      mat.needsUpdate = true;
    });
  }

  // prop 2D FIXO, colado numa parede e virado numa única direção (não gira).
  // side: N/S/L(leste)/O(oeste) = qual parede ele encosta; a face olha p/ a praça.
  private addWallProp(
    c: number,
    r: number,
    url: string,
    worldH: number,
    side: "N" | "S" | "E" | "W",
  ) {
    const mat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0,
      alphaTest: 0.4,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(worldH, worldH), mat);
    const off = CELL / 2 - 0.2; // encosta na face da parede
    let dx = 0, dz = 0, roty = 0;
    if (side === "N") { roty = 0; dz = -off; } // parede ao norte, olha p/ o sul
    else if (side === "S") { roty = Math.PI; dz = off; }
    else if (side === "W") { roty = Math.PI / 2; dx = -off; } // parede a oeste, olha p/ leste
    else { roty = -Math.PI / 2; dx = off; } // "E": parede a leste, olha p/ oeste
    mesh.rotation.y = roty;
    mesh.position.set(c * CELL + dx, worldH / 2, r * CELL + dz);
    this.world.add(mesh);
    // sem colisão: colado na parede, o jogador passa em frente dele
    this.loadArt(url, (t) => {
      const im = t.image as { width: number; height: number } | undefined;
      const asp = im && im.width && im.height ? im.width / im.height : 1;
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(worldH * asp, worldH);
      mesh.position.y = worldH / 2;
      mat.map = t;
      mat.opacity = 1;
      mat.needsUpdate = true;
    });
  }

  // inimigo billboard no túnel da masmorra: guarda a escada, encara a câmera e
  // leva dano do golpe (3 acertos de perto e de frente e ele tomba).
  private buildDungeonEnemy(c = 2, r = 4, typeId = "esqueleto") {
    // perfil do tipo (arte + stats FIXOS + tamanho) — sem escalar com o herói
    const T = ENEMY_TYPES[typeId] ?? ENEMY_TYPES.esqueleto;
    const HP = T.hp, ATK = T.atk, XP = T.xp, GOLD = T.gold, VISION = T.vision;
    // nível do inimigo = base do tipo + andar da masmorra (fica valendo XP por mais
    // tempo nos andares fundos); fora da masmorra usa a base do tipo.
    const LVL = (T.lvl ?? 1) + (this.location === "dungeon" ? this.dungeonFloor : 0);
    const worldH = T.h; // altura do sprite (rato baixo, carniçal/cultista maiores)
    const mat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0,
      alphaTest: 0.4,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(worldH * 0.47, worldH), mat);
    mesh.position.set(c * CELL, worldH / 2, r * CELL);
    this.world.add(mesh);
    this.billboardProps.push(mesh); // encara a câmera como os aldeões
    this.blocked.add(`${c},${r}`);
    // barra de vida flutuante acima do esqueleto (planos sem luz, sempre visíveis)
    const barW = 1.3;
    const bar = new THREE.Group();
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(barW + 0.12, 0.26),
      new THREE.MeshBasicMaterial({ color: 0x120d0a, transparent: true, opacity: 0.85 }),
    );
    const barFill = new THREE.Mesh(
      new THREE.PlaneGeometry(barW, 0.16),
      new THREE.MeshBasicMaterial({ color: 0xd23a2e }),
    );
    barFill.position.z = 0.01;
    bar.add(bg);
    bar.add(barFill);
    bar.position.set(c * CELL, worldH + 0.45, r * CELL);
    this.world.add(bar);
    this.billboardProps.push(bar); // encara a câmera
    // SETA DE ORIENTAÇÃO no CHÃO sob o inimigo: um plano deitado com uma seta que
    // aponta p/ o lado que ele encara (o último rumo do passo). Como os inimigos são
    // billboards, é assim que dá p/ saber p/ onde ele está virado/indo.
    const faceArrow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({
        map: this.groundArrowTex(), transparent: true, depthWrite: false,
        opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }),
    );
    faceArrow.rotation.order = "YXZ";
    faceArrow.rotation.x = -Math.PI / 2; // deita no chão
    faceArrow.position.set(c * CELL, 0.06, r * CELL);
    faceArrow.renderOrder = 2;
    this.world.add(faceArrow);
    const e: EnemyEnt = {
      mesh, mat, c, r, bx: c * CELL, bz: r * CELL,
      hp: HP, maxHp: HP, atk: ATK, xp: XP, lvl: LVL, goldBase: GOLD, visionR: VISION,
      homeC: c, homeR: r, aggro: false,
      ranged: T.ranged ?? false, melee: T.melee ?? true, range: T.range ?? 1, proj: T.proj ?? "",
      ai: T.ai ?? "chase", tier: T.tier ?? "normal", typeId, approach: 0, hdc: 0, hdr: 1, faceArrow,
      atkIsRanged: false, hitAt: 0, dyingAt: 0,
      atkAt: 0, hitApplied: false, nextAtk: 0,
      stepAt: 0, stepDur: T.spd ?? 780, fx: c * CELL, fz: r * CELL, tx: c * CELL, tz: r * CELL, nextMove: 0,
      bar, barFill,
    };
    this.enemies.push(e);
    // (SEM luz por inimigo: com vários, o total de point lights estourava o limite
    //  de uniforms do shader no mobile → cena PRETA. A tocha do herói já ilumina.)
    // pré-carrega o sprite-sheet da explosão (pronto quando o inimigo morrer)
    if (!this.poofTex) this.loadArt(deathPoofUrl, (t) => (this.poofTex = this.fxFilter(t)));
    this.loadArt(T.art, (t) => {
      const im = t.image as { width: number; height: number } | undefined;
      const asp = im && im.width && im.height ? im.width / im.height : 0.47;
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(worldH * asp, worldH);
      mesh.position.y = worldH / 2;
      mat.map = t;
      mat.opacity = 1;
      mat.needsUpdate = true;
    });
  }

  // aplica um golpe no inimigo se ele estiver na célula à frente do jogador
  // arma equipada trocou (via inventário): guarda o perfil e reflete no ataque
  // equipou uma arma pela mochila: w = arma-base (visual/estilo); uid = instância
  // DROPADA (ou undefined = arma-base do inventário). Define ambos e recalcula.
  private onEquip(w: Weapon, uid?: string) {
    this.currentWeapon = w;
    this.equippedWeaponUid = uid ?? null;
    this.recomputeDerived();
    this.pushEquipUI();
  }
  // tooltip de uma ARMA-instância dropada: dano + afixos + comparação com a atual
  private weaponInstTip(wi: WeaponInstance): ItemTip {
    const bonus: StatBonus = {};
    for (const a of wi.affixes) bonus[a.key] = (bonus[a.key] ?? 0) + a.value;
    const tip: ItemTip = {
      name: wi.name, icon: wi.icon, rarity: wi.rarity,
      sub: `${RARITY_BY_KEY[wi.rarity].label} · Arma`,
      lines: [{ label: "Dano", value: String(wi.dmg) }, ...this.statLines(bonus)],
      action: "equip",
    };
    tip.compareName = this.currentWeapon?.name ?? "atual";
    tip.deltas = [{ label: "Dano", delta: wi.dmg - this.weaponDmg() }];
    return tip;
  }

  // ---- FERREIRO (aprimoramento por reforço +N) ----
  // custo do próximo reforço (nível atual → +1): madeira + minério + pedra + ouro
  // TESTE: aprimorar de graça (sem custo de ouro/materiais). Trocar p/ false
  // depois de testar, que os custos abaixo voltam a valer.
  private static readonly SMITH_FREE = true;
  private smithCost(lvl: number) {
    if (Game.SMITH_FREE) return { madeira: 0, minerio: 0, reforco: 0, gold: 0 };
    return { madeira: 2 + lvl, minerio: 2 + lvl, reforco: 1 + Math.floor(lvl / 3), gold: 80 * (lvl + 1) };
  }
  // "Dano" exibido: o ataque resultante se essa arma nesse reforço estivesse equipada
  private smithDmg(w: Weapon, lvl: number): number {
    return Math.round(this.atkWithBonus(this.sec.atkPhys + w.dmg + lvl) * this.buffAtkMul());
  }
  private buildSmithData(): SmithData {
    // o ferreiro só aprimora as armas que o jogador POSSUI
    const owned = this.ownedWeapons.map((id) => WEAPON_BY_ID[id]).filter(Boolean) as Weapon[];
    if (!owned.some((x) => x.id === this.smithSel)) // seleção saiu do inventário: reancora
      this.smithSel = (this.currentWeapon && this.ownedWeapons.includes(this.currentWeapon.id)
        ? this.currentWeapon.id : owned[0]?.id) ?? this.smithSel;
    const items = owned.map((w) => ({ id: w.id, name: w.name, icon: w.url, lvl: this.reinforce[w.id] ?? 0 }));
    const w = owned.find((x) => x.id === this.smithSel) ?? owned[0] ?? WEAPONS[0];
    const lvl = this.reinforce[w.id] ?? 0;
    const base = { id: w.id, name: w.name, icon: w.url, lvl, dmg: this.smithDmg(w, lvl) };
    const sel = lvl >= Game.SMITH_MAX
      ? { ...base, max: true }
      : { ...base, max: false, next: { dmg: this.smithDmg(w, lvl + 1), ...this.smithCost(lvl) } };
    return { gold: this.stats.gold, mats: { ...this.materials }, items, sel };
  }
  // chance de sucesso do reforço: alta no começo, cai conforme o nível sobe.
  private smithChance(lvl: number): number {
    return Math.max(0.25, Math.min(0.92, 0.92 - lvl * 0.07));
  }
  // Aprimora: gasta os materiais SEMPRE (o risco), rola o sucesso e sobe +1 se
  // deu certo. NÃO re-renderiza aqui — devolve o resultado p/ a HUD animar a
  // espada (enche/acende no sucesso, apaga na falha) e só então re-desenhar.
  private smithUpgrade(): SmithUpgradeResult | null {
    const w = WEAPONS.find((x) => x.id === this.smithSel);
    if (!w) return null;
    const lvl = this.reinforce[w.id] ?? 0;
    if (lvl >= Game.SMITH_MAX) return null;
    const c = this.smithCost(lvl);
    if (this.materials.madeira < c.madeira || this.materials.minerio < c.minerio ||
        this.materials.reforco < c.reforco || this.stats.gold < c.gold) {
      this.ui.toast("Faltam materiais ou ouro."); return null;
    }
    // consome os recursos (mesmo na falha)
    this.materials.madeira -= c.madeira; this.materials.minerio -= c.minerio;
    this.materials.reforco -= c.reforco; this.stats.gold -= c.gold;
    const success = Math.random() < this.smithChance(lvl);
    if (success) {
      this.reinforce[w.id] = lvl + 1;
      if (this.currentWeapon?.id === w.id) this.recomputeDerived(); // dano sobe se equipada
      this.ui.toast(`${w.name} reforçada para +${lvl + 1}!`);
    } else {
      this.ui.toast(Game.SMITH_FREE ? `O reforço de ${w.name} falhou!` : `O reforço de ${w.name} falhou! Materiais perdidos.`);
    }
    return { success, data: this.buildSmithData() };
  }

  // ---- LOJAS (mercador / alquimista — comprar/vender) ----
  // raridade da LOJA: SEM lendário (só drop). Comum comum, Mágico às vezes, Raro difícil.
  private rollStoreRarity(): Rarity {
    const r = Math.random();
    if (r < 0.60) return "comum";
    if (r < 0.88) return "magico";
    return "raro";
  }
  private armorPrice(it: ItemInstance): number {
    const tierBase = [22, 55, 120][it.tier - 1] ?? 22;
    const rarMul: Record<Rarity, number> = { comum: 1, magico: 1.9, raro: 3.4, lendario: 6 };
    return Math.round(tierBase * rarMul[it.rarity]);
  }
  // rotaciona o estoque de equipamento a cada MEIA-JORNADA (dia/noite), pelo relógio
  private refreshStoreStock() {
    const period = Math.floor((this.now / DAY_MS + DAY_START) * 2);
    if (period === this.storeStockPeriod && this.storeStock.length) return;
    this.storeStockPeriod = period;
    const maxTier = this.stats.level >= 10 ? 3 : this.stats.level >= 5 ? 2 : 1;
    const n = 4 + Math.floor(Math.random() * 2); // 4–5 peças por rotação
    this.storeStock = [];
    for (let i = 0; i < n; i++) {
      const slot = ARMOR_SLOTS[Math.floor(Math.random() * ARMOR_SLOTS.length)];
      const tier = 1 + Math.floor(Math.random() * maxTier);
      this.storeStock.push(generateArmor(slot, tier, { rarity: this.rollStoreRarity() }));
    }
  }
  private buildStoreData(): StoreData {
    const goods: StoreGood[] = [];
    const alch = this.shopVendor === "alchemist";
    const goodIds = alch ? ALCH_GOODS : STORE_GOODS; // bens empilháveis dessa loja
    const tradesWeapons = !alch; // só o mercador negocia armas/equipamento
    if (this.storeMode === "buy") {
      // MERCADOR: armas ainda NÃO possuídas (equipamento à venda)
      if (tradesWeapons) for (const w of WEAPONS) {
        if (this.ownedWeapons.includes(w.id)) continue; // já tem essa arma
        goods.push({ id: "w:" + w.id, name: w.name, iconUrl: w.url, price: this.weaponBuy(w.id), desc: this.weaponDesc(w), have: 0, single: true });
      }
      // EQUIPAMENTO ROTATIVO (só o mercador): armaduras com raridade que giram pelo relógio
      if (tradesWeapons) {
        this.refreshStoreStock();
        for (const it of this.storeStock) {
          const price = this.armorPrice(it);
          goods.push({ id: "a:" + it.uid, name: it.name, iconUrl: it.icon, price, desc: RARITY_BY_KEY[it.rarity].label, have: 0, single: true, rarity: it.rarity, tip: this.armorTip(it, "buy", price) });
        }
      }
      for (const id of goodIds) {
        const m = GOODS_BY_ID[id];
        goods.push({ id: m.id, name: m.name, icon: m.icon, iconUrl: m.iconUrl, price: m.price, desc: m.desc, have: this.goodHave(m.id) });
      }
    } else {
      // VENDER: bens empilháveis dessa loja que o jogador possui (>0)...
      for (const id of goodIds) {
        const m = GOODS_BY_ID[id];
        const have = this.goodHave(id);
        if (have > 0) goods.push({ id: m.id, name: m.name, icon: m.icon, iconUrl: m.iconUrl, price: Math.max(1, Math.round(m.price * Game.SELL_RATE)), desc: m.desc, have });
      }
      // ...e, no mercador, as armas possuídas (menos a equipada)
      if (tradesWeapons) for (const id of this.ownedWeapons) {
        if (this.currentWeapon?.id === id) continue; // não vende a arma equipada
        const w = WEAPON_BY_ID[id];
        if (!w) continue;
        const lvl = this.reinforce[id] ?? 0;
        goods.push({ id: "w:" + id, name: w.name + (lvl ? ` +${lvl}` : ""), iconUrl: w.url, price: this.weaponSell(id), desc: "arma", have: 1, single: true });
      }
    }
    const ident = alch
      ? { title: "Alquimista", subtitle: "O Laboratório de Isolde", portraitUrl: alquimistaUrl }
      : {};
    return { gold: this.stats.gold, mode: this.storeMode, goods, ...ident };
  }
  private setStoreMode(mode: "buy" | "sell") {
    this.storeMode = mode;
    this.ui.openStore(this.buildStoreData());
  }
  // compra/venda de `qty` unidades do item `id` no modo atual; devolve novo estado
  private storeTrade(id: string, qty: number): StoreData {
    qty = Math.max(1, Math.floor(qty));
    if (this.storeMode === "buy") {
      if (id.startsWith("a:")) {
        // COMPRA de armadura do estoque rotativo → vai pra mochila
        const uid = id.slice(2);
        const idx = this.storeStock.findIndex((x) => x.uid === uid);
        if (idx >= 0) {
          const it = this.storeStock[idx];
          const price = this.armorPrice(it);
          if (this.stats.gold < price) { this.ui.toast("Ouro insuficiente."); }
          else {
            this.stats.gold -= price;
            this.storeStock.splice(idx, 1);
            this.armorInv.push(it);
            this.refreshStats(); this.pushEquipUI(); this.ui.playSfx("coin");
            this.ui.toast(`Comprou ${it.name}.`);
          }
        }
      } else if (id.startsWith("w:")) {
        // COMPRA de arma (mercador): única, entra no inventário
        const wid = id.slice(2);
        const w = WEAPON_BY_ID[wid];
        if (w && !this.ownedWeapons.includes(wid)) {
          const cost = this.weaponBuy(wid);
          if (this.stats.gold < cost) { this.ui.toast("Ouro insuficiente."); }
          else {
            this.stats.gold -= cost;
            this.ownedWeapons.push(wid);
            this.pushEquipUI();
            this.refreshStats();
            this.ui.toast(`Comprou ${w.name}.`);
            this.ui.playSfx("coin");
          }
        }
      } else {
        const m = GOODS_BY_ID[id];
        if (m) {
          const cost = m.price * qty;
          if (this.stats.gold < cost) { this.ui.toast("Ouro insuficiente."); }
          else { this.stats.gold -= cost; this.goodAdd(id, qty); this.refreshStats(); this.ui.toast(`Comprou ${qty}× ${m.name}.`); this.ui.playSfx("coin"); }
        }
      }
    } else if (id.startsWith("w:")) {
      const wid = id.slice(2);
      const idx = this.ownedWeapons.indexOf(wid);
      if (idx >= 0 && this.currentWeapon?.id !== wid) {
        const val = this.weaponSell(wid);
        this.ownedWeapons.splice(idx, 1);
        delete this.reinforce[wid];
        this.stats.gold += val;
        this.pushEquipUI();
        this.refreshStats();
        this.ui.toast(`Vendeu ${WEAPON_BY_ID[wid]?.name} por ${val} ouro.`);
        this.ui.playSfx("coin");
      }
    } else {
      const m = GOODS_BY_ID[id];
      if (m) {
        qty = Math.min(qty, this.goodHave(id));
        if (qty > 0) {
          const val = Math.max(1, Math.round(m.price * Game.SELL_RATE)) * qty;
          this.goodAdd(id, -qty); this.stats.gold += val; this.refreshStats();
          this.ui.toast(`Vendeu ${qty}× ${m.name} por ${val} ouro.`);
          this.ui.playSfx("coin");
        }
      }
    }
    this.refreshConsumables(); // compra/venda pode mexer nos consumíveis do HUD
    return this.buildStoreData();
  }

  // ---- BAÚ / ARMAZÉM (guardar/retirar) ----
  private static readonly STASH_STACK = ["pot_hp", "pot_mp", "beer", "scroll_return", "madeira", "minerio", "reforco"];
  private static readonly STASH_SLOTS = 40;   // capacidade do baú (grade de slots)
  private static readonly STASH_CAP = 99;     // teto de itens por pilha no baú
  // capacidade da MOCHILA (armas + armaduras) — DEVE bater com BAG_SLOTS na UI (controls.ts)
  private static readonly INV_CAP = 25;
  private buildStashData(): StashData {
    const dep = this.stashMode === "deposit";
    const goods: StoreGood[] = [];
    // OURO (item especial id "gold") — sem teto de pilha
    goods.push({ id: "gold", name: "Ouro", icon: "🪙", price: 0, desc: "", have: dep ? this.stats.gold : this.stash.gold });
    // consumíveis + materiais: na deposição, o teto de 99 do baú limita o quanto
    // ainda cabe na pilha guardada; na retirada, dá p/ tirar tudo.
    for (const id of Game.STASH_STACK) {
      const have = dep ? this.goodHave(id) : (this.stash.goods[id] ?? 0);
      if (have <= 0) continue;
      const m = GOODS_BY_ID[id];
      const moveMax = dep ? Math.min(have, Game.STASH_CAP - (this.stash.goods[id] ?? 0)) : have;
      goods.push({ id, name: m.name, icon: m.icon, iconUrl: m.iconUrl, price: 0, desc: "", have, moveMax });
    }
    // armas (na deposição, menos a equipada) — o nível de reforço vira selo (+N)
    const list = dep ? this.ownedWeapons : this.stash.weapons;
    for (const wid of list) {
      if (dep && this.currentWeapon?.id === wid) continue;
      const w = WEAPON_BY_ID[wid]; if (!w) continue;
      const lvl = (dep ? this.reinforce[wid] : this.stash.reinforce[wid]) ?? 0;
      goods.push({ id: "w:" + wid, name: w.name, iconUrl: w.url, price: 0, desc: "arma", have: 1, single: true, lvl });
    }
    return {
      mode: this.stashMode, goods, slots: Game.STASH_SLOTS, gold: this.stash.gold,
      title: "Baú de Hedda", subtitle: "SEUS PERTENCES GUARDADOS", portraitUrl: heddaUrl,
    };
  }
  private setStashMode(mode: "deposit" | "withdraw"): void {
    this.stashMode = mode;
    this.ui.openStash(this.buildStashData());
  }
  // move `qty` do item `id` entre mochila e baú, no modo atual
  private stashMove(id: string, qty: number): StashData {
    qty = Math.max(1, Math.floor(qty));
    const dep = this.stashMode === "deposit";
    if (id === "gold") {
      qty = Math.min(qty, dep ? this.stats.gold : this.stash.gold);
      if (qty > 0) { if (dep) { this.stats.gold -= qty; this.stash.gold += qty; } else { this.stash.gold -= qty; this.stats.gold += qty; } this.refreshStats(); }
    } else if (id.startsWith("w:")) {
      const wid = id.slice(2);
      if (dep) {
        if (this.currentWeapon?.id === wid) { this.ui.toast("Não dá para guardar a arma equipada."); }
        else {
          const i = this.ownedWeapons.indexOf(wid);
          if (i >= 0) { this.ownedWeapons.splice(i, 1); this.stash.weapons.push(wid); this.stash.reinforce[wid] = this.reinforce[wid] ?? 0; delete this.reinforce[wid]; this.pushEquipUI(); }
        }
      } else {
        const i = this.stash.weapons.indexOf(wid);
        if (i >= 0) { this.stash.weapons.splice(i, 1); this.ownedWeapons.push(wid); this.reinforce[wid] = this.stash.reinforce[wid] ?? 0; delete this.stash.reinforce[wid]; this.pushEquipUI(); }
      }
    } else {
      // bem empilhável; no baú cada pilha respeita o teto de 99
      if (dep) {
        const room = Game.STASH_CAP - (this.stash.goods[id] ?? 0); // vaga na pilha do baú
        qty = Math.min(qty, this.goodHave(id), room);
        if (room <= 0) this.ui.toast("Essa pilha no baú já está cheia (99).");
        if (qty > 0) { this.goodAdd(id, -qty); this.stash.goods[id] = (this.stash.goods[id] ?? 0) + qty; }
      } else {
        qty = Math.min(qty, this.stash.goods[id] ?? 0);
        if (qty > 0) { this.stash.goods[id] -= qty; this.goodAdd(id, qty); }
      }
      this.refreshConsumables();
    }
    return this.buildStashData();
  }

  // ---- TAVERNA (bebidas + missões) ----
  private buildTavernData(): TavernData {
    const beer = GOODS_BY_ID["beer"];
    return {
      gold: this.stats.gold,
      drink: { id: beer.id, name: beer.name, icon: beer.icon, iconUrl: beer.iconUrl, price: beer.price, desc: beer.desc, have: this.goodHave(beer.id) },
      quests: this.buildQuests(),
    };
  }
  private buildQuests(): TavernQuest[] {
    return QUEST_DEFS.map((def) => {
      const q = this.quests[def.id];
      let progress: string | undefined;
      if (def.kind === "kill" && (q.status === "active" || q.status === "ready"))
        progress = `${Math.min(q.progress, def.goal ?? 0)} / ${def.goal} ${def.unit ?? "inimigos"}`;
      else if (def.kind === "delivery" && q.status === "active")
        progress = `Entregar a ${def.target} — ${def.targetHint}`;
      return { id: def.id, icon: def.icon, title: def.title, desc: def.desc, reward: def.reward, status: q.status, progress, repeatable: def.repeatable };
    });
  }
  // dá a recompensa de uma missão (ouro + XP + itens) e avisa
  private grantQuest(def: QuestDef) {
    if (def.grant.gold) this.stats.gold += def.grant.gold;
    for (const [gid, n] of def.grant.items ?? []) this.goodAdd(gid, n);
    this.refreshStats(); this.refreshConsumables();
    const parts: string[] = [];
    if (def.grant.gold) parts.push(`${def.grant.gold} ouro`);
    if (def.grant.xp) parts.push(`${def.grant.xp} XP`);
    for (const [gid, n] of def.grant.items ?? []) parts.push(`${n}× ${GOODS_BY_ID[gid]?.name ?? gid}`);
    this.ui.toast(`Recompensa: ${parts.join(" e ")}.`);
    if (def.grant.xp) this.gainXp(def.grant.xp); // XP por último (pode disparar level-up)
  }
  private tavernBuyDrink(id: string): TavernData {
    const m = GOODS_BY_ID[id];
    if (m) {
      if (this.stats.gold < m.price) this.ui.toast("Ouro insuficiente.");
      else { this.stats.gold -= m.price; this.goodAdd(id, 1); this.refreshStats(); this.refreshConsumables(); this.ui.toast(`Comprou ${m.name}.`); this.ui.playSfx("coin"); }
    }
    return this.buildTavernData();
  }
  private tavernQuest(id: string, action: "accept" | "turnin"): TavernData {
    const q = this.quests[id];
    const def = QUEST_DEFS.find((d) => d.id === id);
    if (q && def) {
      if (action === "accept" && q.status === "available") {
        q.status = "active";
        this.ui.toast(`Missão aceita: ${def.title}.`);
      } else if (action === "turnin" && q.status === "ready") { // só as "kill" chegam a ready
        this.grantQuest(def);
        // bounty: reabre p/ ser pega de novo (loop de farm); missão normal: encerra.
        if (def.repeatable) { q.status = "available"; q.progress = 0; }
        else q.status = "done";
      }
    }
    return this.buildTavernData();
  }
  // conta um abate na masmorra p/ TODA missão/bounty "kill" ativa cujo alvo casa
  // com o tipo do inimigo (enemyTypes vazio = qualquer não-chefe).
  private questOnKill(e: EnemyEnt) {
    if (this.location !== "dungeon" || e.tier === "boss") return;
    for (const def of QUEST_DEFS) {
      if (def.kind !== "kill") continue;
      const q = this.quests[def.id];
      if (!q || q.status !== "active") continue;
      if (def.enemyTypes && def.enemyTypes.length && !def.enemyTypes.includes(e.typeId)) continue;
      const goal = def.goal ?? 1;
      q.progress++;
      const unit = def.unit ?? "inimigos";
      if (q.progress >= goal) {
        q.status = "ready";
        this.ui.questPopup(def.title, "Concluída! Volte ao Bruno.", true);
      } else {
        // POPUP estilo WoW a cada abate que conta pra missão
        this.ui.questPopup(def.title, `${q.progress}/${goal} ${unit}`);
      }
      this.pushTracker(); // atualiza a contagem no rastreador na hora
    }
  }
  // ENTREGA: se algum recado ativo é p/ este NPC, conclui e devolve a fala de
  // agradecimento (senão null → diálogo normal).
  private deliverTo(name: string): string | null {
    for (const def of QUEST_DEFS) {
      if (def.kind !== "delivery" || !def.target) continue;
      const q = this.quests[def.id];
      if (q.status === "active" && name.includes(def.target)) {
        q.status = "done";
        this.grantQuest(def);
        return "Ah, era isto que eu aguardava! Muito obrigado, viajante. Que a estrada te guarde.";
      }
    }
    return null;
  }

  // ======================= MOTOR DA MAIN QUEST =======================
  // inicializa o estado dos capítulos (cap.1 disponível; resto trancado)
  private initMainQuests() {
    for (const def of MAIN_QUESTS)
      // cap.1 já começa ATIVO (auto), p/ o jogador ter guia desde o início
      this.mainQuests[def.id] = { status: def.order === 1 ? "active" : "locked", step: 0, progress: 0 };
  }
  private mqDef(id: string) { return MAIN_QUESTS.find((d) => d.id === id); }
  private mqActive(): MainQuestDef | null {
    for (const def of MAIN_QUESTS) if (this.mainQuests[def.id]?.status === "active") return def;
    return null;
  }
  // destrava o próximo capítulo; auto-inicia os que não têm 'giver'
  private mqUnlockNext(order: number) {
    const next = MAIN_QUESTS.find((d) => d.order === order + 1);
    if (!next) return;
    const st = this.mainQuests[next.id];
    if (st.status !== "locked") return;
    if (next.giver) { st.status = "available"; }
    else { st.status = "active"; st.step = 0; st.progress = 0; this.mqObjectiveToast(next); }
  }
  private mqObjectiveToast(def: MainQuestDef) {
    const step = def.steps[this.mainQuests[def.id].step];
    if (step) this.ui.toast(`◈ ${def.title}: ${step.objective}`);
  }
  // concede a recompensa do capítulo + marca narrativa, e conclui
  private mqComplete(def: MainQuestDef) {
    const st = this.mainQuests[def.id];
    st.status = "done";
    if (def.grant.gold) this.stats.gold += def.grant.gold;
    for (const [gid, n] of def.grant.items ?? []) this.goodAdd(gid, n);
    if (def.flag) this.mainFlags[def.flag] = true;
    this.refreshStats(); this.refreshConsumables();
    const parts: string[] = [];
    if (def.grant.gold) parts.push(`${def.grant.gold} ouro`);
    for (const [gid, n] of def.grant.items ?? []) parts.push(`${n}× ${GOODS_BY_ID[gid]?.name ?? gid}`);
    this.ui.toast(`✦ Capítulo concluído: ${def.title}${parts.length ? ` — ${parts.join(", ")}` : ""}`);
    this.mqUnlockNext(def.order);
  }
  // avança a etapa atual; se era a última, conclui o capítulo
  private mqAdvance(def: MainQuestDef) {
    const st = this.mainQuests[def.id];
    st.step++; st.progress = 0;
    if (st.step >= def.steps.length) this.mqComplete(def);
    else this.mqObjectiveToast(def);
  }
  // ===================== CONVERSA COM NPC (estilo WoW) =====================
  // saudação + FAREWELL por NPC (por substring do nome); genérico se não houver
  private greetingFor(name: string): string {
    if (name.includes("Hedda")) return "Sente-se, criança — o fogo está aceso. Do que deseja falar?";
    if (name.includes("Anselmo")) return "Que a luz o acompanhe nas trevas, viajante. Diga.";
    if (name.includes("Rosa")) return "Bem-vindo ao meu empório. No que posso servir?";
    if (name.includes("Isolde")) return "Procurando algo para as profundezas? Fale.";
    if (name.includes("Brandt")) return "O aço não se tempera sozinho. Diga o que precisa.";
    if (name.includes("Bruno")) return "Sente-se, forasteiro. O que vai ser?";
    return "Sim, viajante? Diga.";
  }
  private farewellFor(name: string): string {
    if (name.includes("Hedda")) return "Vá com cuidado, criança. E volte inteiro.";
    if (name.includes("Anselmo")) return "Que a luz o guarde lá embaixo.";
    if (name.includes("Bruno")) return "Volte sempre — e traga histórias!";
    return "Até logo, viajante.";
  }
  private shopVerb(shop: "store" | "tavern" | "smith" | "alchemist"): string {
    return shop === "store" ? "Ver a mercadoria"
      : shop === "alchemist" ? "Ver poções e materiais"
        : shop === "smith" ? "Abrir a forja (aprimorar)"
          : "Beber e ver o mural";
  }
  private openShopWindow(shop: "store" | "tavern" | "smith" | "alchemist") {
    if (shop === "smith") this.ui.openSmith(this.buildSmithData());
    else if (shop === "store") { this.shopVendor = "store"; this.storeMode = "buy"; this.ui.openStore(this.buildStoreData()); }
    else if (shop === "alchemist") { this.shopVendor = "alchemist"; this.storeMode = "buy"; this.ui.openStore(this.buildStoreData()); }
    else this.ui.openTavern(this.buildTavernData());
  }
  // abre um "nó" de conversa: fala do NPC + menu de opções (na última página)
  private openConvNode(name: string, portrait: string | null, lines: string[], opts: ConvOption[]) {
    this.openDialogue(name, lines, portrait, {
      choices: opts.map((o) => ({ id: o.id, label: o.label, note: o.note, primary: o.primary, kind: o.kind })),
      onChoice: (id) => { const o = opts.find((x) => x.id === id); if (o) o.run(); },
    });
  }
  // ENTRA na conversa com um NPC: monta a saudação + o menu conforme o estado das
  // missões e se ele é atendente de loja. É o coração do sistema robusto.
  private talkNpc(name: string, portrait: string | null, shop?: "store" | "tavern" | "smith" | "alchemist", gossip?: string[]) {
    // saudação SEMPRE genérica; a etapa do TOUR só é cumprida quando o jogador
    // ESCOLHE "Falar sobre a missão" no menu (nunca automaticamente ao chegar).
    const greet = [this.greetingFor(name)];
    const root = () => this.talkNpc(name, portrait, shop, gossip); // usado por "Voltar"
    const opts: ConvOption[] = [];
    // 1) LOJA
    if (shop) opts.push({ id: "shop", kind: "shop", label: this.shopVerb(shop), run: () => { this.closeDialogue(); this.openShopWindow(shop); } });
    // 2) TÓPICOS DA MAIN QUEST relevantes a este NPC
    for (const def of MAIN_QUESTS) {
      const st = this.mainQuests[def.id];
      if (!st) continue;
      if (st.status === "available" && def.giver && name.includes(def.giver)) {
        opts.push({ id: "mq:" + def.id, kind: "quest", primary: true, label: `Falar sobre — ${def.title}`, note: "nova missão", run: () => this.convQuestOffer(def, name, portrait, root) });
      } else if (st.status === "active") {
        const step = def.steps[st.step];
        if (step && step.kind === "visit" && step.shop && step.shop === shop) {
          // TOUR: a etapa "visit" só é cumprida quando o jogador escolhe este tópico
          opts.push({ id: "mq:" + def.id, kind: "quest", primary: true, label: `Falar sobre — ${def.title}`, note: "missão", run: () => this.convQuestVisit(def, name, portrait, root) });
        } else if (step && step.target && name.includes(step.target) && (step.kind === "talk" || step.kind === "deliver")) {
          opts.push({ id: "mq:" + def.id, kind: "quest", primary: true, label: `Sobre — ${def.title}`, note: "em andamento", run: () => this.convQuestStep(def, name, portrait, root) });
        } else if (def.giver && name.includes(def.giver) && def.active?.length) {
          opts.push({ id: "mq:" + def.id, kind: "quest", label: `Sobre — ${def.title}`, note: "em andamento", run: () => this.openConvNode(name, portrait, def.active!, [{ id: "back", kind: "back", label: "Voltar", run: root }]) });
        }
      }
    }
    // 2b) ENTREGA de missão secundária ativa endereçada a este NPC
    for (const def of QUEST_DEFS) {
      if (def.kind === "delivery" && def.target && name.includes(def.target) && this.quests[def.id]?.status === "active") {
        opts.push({ id: "sq:" + def.id, kind: "quest", label: `Entregar — ${def.title}`, note: "encomenda", run: () => {
          const thanks = this.deliverTo(name);
          this.openConvNode(name, portrait, thanks ? [thanks] : ["Obrigado, viajante."], [{ id: "back", kind: "back", label: "Voltar", run: root }]);
        } });
      }
    }
    // 3) CONVERSAR (sabor) — mostra as falas comuns do NPC
    if (gossip?.length) opts.push({ id: "gossip", label: "Conversar", run: () => this.openConvNode(name, portrait, gossip, [{ id: "back", kind: "back", label: "Voltar", run: root }]) });
    // 4) SAIR
    opts.push({ id: "exit", kind: "exit", label: "Sair", run: () => this.openDialogue(name, [this.farewellFor(name)], portrait) });

    // NPC de fundo (sem loja e sem missão): só a fala simples, sem menu
    const hasMenu = !!shop || opts.some((o) => o.kind === "quest");
    if (!hasMenu) { this.openDialogue(name, gossip?.length ? gossip : greet, portrait); return; }
    this.openConvNode(name, portrait, greet, opts);
  }
  // TÓPICO: oferta de um capítulo (descreve + Aceitar/Agora não)
  private convQuestOffer(def: MainQuestDef, name: string, portrait: string | null, root: () => void) {
    this.openConvNode(name, portrait, def.offer, [
      { id: "accept", kind: "quest", primary: true, label: "Aceitar a missão", run: () => {
        const st = this.mainQuests[def.id]; st.status = "active"; st.step = 0; st.progress = 0;
        this.ui.toast(`◈ Missão aceita: ${def.title}`); this.mqObjectiveToast(def); root();
      } },
      { id: "back", kind: "back", label: "Agora não", run: root },
    ]);
  }
  // TÓPICO: etapa "visit" do tour (mq1) — o NPC se apresenta e a etapa avança ao
  // fechar. Só roda quando o jogador ESCOLHE o tópico (corrige o auto-avanço).
  private convQuestVisit(def: MainQuestDef, name: string, portrait: string | null, root: () => void) {
    const st = this.mainQuests[def.id];
    const step = def.steps[st.step];
    this.openDialogue(name, step.atLines ?? ["…"], portrait, { onClose: () => { this.mqAdvance(def); root(); } });
  }
  // TÓPICO: etapa ativa cujo alvo é este NPC (talk/deliver) — cumpre ao conversar
  private convQuestStep(def: MainQuestDef, name: string, portrait: string | null, root: () => void) {
    const st = this.mainQuests[def.id];
    const step = def.steps[st.step];
    if (step.kind === "deliver") {
      const missing = (step.items ?? []).filter(([gid, n]) => this.goodHave(gid) < n);
      if (missing.length) {
        const need = (step.items ?? []).map(([gid, n]) => `${n}× ${GOODS_BY_ID[gid]?.name ?? gid}`).join(" e ");
        this.openConvNode(name, portrait, [`Ainda não trouxe o que preciso. Volte com ${need}.`], [{ id: "back", kind: "back", label: "Voltar", run: root }]);
        return;
      }
      for (const [gid, n] of step.items ?? []) this.goodAdd(gid, -n);
      this.refreshConsumables();
    }
    // fala da etapa; ao fechar, avança o capítulo e reabre o menu (encadeia o próximo)
    this.openDialogue(name, step.atLines ?? ["…"], portrait, { onClose: () => { this.mqAdvance(def); root(); } });
  }
  // um inimigo abatido: alimenta a etapa "kill" do capítulo ativo
  private mainQuestOnKill() {
    const act = this.mqActive();
    if (!act) return;
    const st = this.mainQuests[act.id];
    const step = act.steps[st.step];
    if (!step || step.kind !== "kill" || this.location !== "dungeon") return;
    st.progress++;
    const goal = step.goal ?? 1;
    if (st.progress >= goal) { this.ui.questPopup(act.title, "Objetivo cumprido!", true); this.mqAdvance(act); }
    else this.ui.questPopup(act.title, `${st.progress}/${goal}`);
    this.pushTracker();
  }
  // entrou num local: fecha a etapa "enter" do capítulo ativo (ex.: Santuário)
  private mainQuestOnEnter(loc: string) {
    const act = this.mqActive();
    if (!act) return;
    const st = this.mainQuests[act.id];
    const step = act.steps[st.step];
    if (!step || step.kind !== "enter" || step.location !== loc) return;
    // mostra a fala da etapa (clímax) e conclui ao fechar
    const lines = step.atLines ?? [];
    if (lines.length) this.openDialogue("A Névoa", lines, null, { onClose: () => this.mqAdvance(act) });
    else this.mqAdvance(act);
  }
  // interagiu com o Portão Selado com a etapa "seal" ativa: rompe o selo.
  // Retorna true se tratou (rompeu); false p/ cair na mensagem padrão do portão.
  private mainQuestSeal(): boolean {
    const act = this.mqActive();
    if (!act) return false;
    const st = this.mainQuests[act.id];
    const step = act.steps[st.step];
    if (!step || step.kind !== "seal") return false;
    if (!this.mainFlags["lantern"]) {
      this.openDialogue("Portão Selado", [
        "Os selos de ferro resistem. Sem uma luz forjada pelas antigas artes, não há como parti-los.",
      ], null);
      return true;
    }
    this.openDialogue("Portão Selado", step.atLines ?? ["O selo se rompe."], null, {
      onClose: () => {
        this.mainFlags["seal_broken"] = true; // fica rompido mesmo se reconstruir a masmorra
        if (this.sealCell) { this.blocked.delete(`${this.sealCell.col},${this.sealCell.row}`); }
        if (this.sealBars) { this.sealBars.visible = false; this.sealBars = null; }
        this.mqAdvance(act);
      },
    });
    return true;
  }
  // monta o Diário de Missões: Linha Principal (capítulos) + secundárias (mural)
  private buildJournalData(): JournalData {
    const main: JournalEntry[] = MAIN_QUESTS.map((def) => {
      const st = this.mainQuests[def.id];
      let objective: string | undefined;
      if (st.status === "active") {
        const step = def.steps[st.step];
        objective = step?.objective;
        if (step?.kind === "kill") objective = `${step.objective} (${Math.min(st.progress, step.goal ?? 0)}/${step.goal})`;
      }
      return { icon: def.icon, title: def.title, summary: def.summary, status: st.status, objective };
    });
    // secundárias: reaproveita os QUEST_DEFS do mural (kill/entrega)
    const side: JournalEntry[] = QUEST_DEFS.map((def) => {
      const q = this.quests[def.id];
      const status: JournalEntry["status"] =
        q.status === "done" ? "done" : (q.status === "active" || q.status === "ready") ? "active" : "available";
      let objective: string | undefined;
      if (status === "active") {
        if (def.kind === "kill") objective = `${Math.min(q.progress, def.goal ?? 0)} / ${def.goal} esqueletos`;
        else if (def.kind === "delivery") objective = q.status === "ready" ? "Entregue no mural do Bruno" : `Entregar a ${def.target} — ${def.targetHint}`;
      }
      return { icon: def.icon, title: def.title, summary: def.desc, status, objective };
    });
    return { main, side };
  }

  // ponto de chegada num andar: o bloco LOGO À FRENTE da escada (não distante),
  // encarando "pra dentro" do andar. backDir = direção pra dentro a partir da escada.
  private dungeonEntryAt(stairChar: string, backDir: [number, number]): { col: number; row: number; facing: number } {
    const s = dungeonFind(stairChar);
    const dirIx = (dc: number, dr: number) => (dc === 1 ? 1 : dc === -1 ? 3 : dr === 1 ? 2 : 0);
    const [dc, dr] = backDir;
    if (dungeonWalkable(s.col + dc, s.row + dr))
      return { col: s.col + dc, row: s.row + dr, facing: dirIx(dc, dr) };
    for (const [ddc, ddr] of DIRS)
      if (dungeonWalkable(s.col + ddc, s.row + ddr))
        return { col: s.col + ddc, row: s.row + ddr, facing: dirIx(ddc, ddr) };
    return { col: s.col, row: s.row, facing: 2 };
  }

  // ===================== GUIA / WAYPOINT DE MISSÃO =====================
  // acha a célula de um NPC pelo nome (posição ATUAL, já que eles caminham)
  private npcCellByName(sub: string): { col: number; row: number } | null {
    for (const [key, npc] of this.npcMap)
      if (npc.name.includes(sub)) { const [c, r] = key.split(",").map(Number); return { col: c, row: r }; }
    return null;
  }
  // célula da escada p/ a masmorra no VILAREJO (destino "descer")
  private villageDungeonCell(): { col: number; row: number } | null {
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (cellAt(c, r) === "stairs") return { col: c, row: r };
    return null;
  }
  // ZONA do objetivo atual (main tem prioridade; senão 1ª secundária ativa)
  private objectiveTarget(): { zone: "village" | "dungeon" | "hedda"; npc?: string; shop?: string; cell?: [number, number]; kill?: boolean; killTypes?: string[] } | null {
    const act = this.mqActive();
    if (act) {
      const step = act.steps[this.mainQuests[act.id].step];
      if (step) {
        if (step.kind === "visit" && step.shop) return { zone: "village", shop: step.shop };
        if ((step.kind === "talk" || step.kind === "deliver") && step.target)
          return step.target.includes("Hedda") ? { zone: "hedda" } : { zone: "village", npc: step.target };
        if (step.kind === "kill") return { zone: "dungeon", kill: true }; // qualquer inimigo
        if (step.kind === "seal") { const l = dungeonAll("L")[0]; return { zone: "dungeon", cell: l ? [l.col, l.row] : undefined }; }
        if (step.kind === "enter" && step.location === "showcase") { const a = dungeonAll("A")[0]; return { zone: "dungeon", cell: a ? [a.col, a.row] : undefined }; }
      }
    }
    for (const def of QUEST_DEFS) {
      if (this.quests[def.id]?.status !== "active") continue;
      if (def.kind === "kill") return { zone: "dungeon", kill: true, killTypes: def.enemyTypes };
      if (def.kind === "delivery" && def.target)
        return def.target.includes("Hedda") ? { zone: "hedda" } : { zone: "village", npc: def.target };
    }
    return null;
  }
  // célula do inimigo VIVO mais próximo que casa com `types` (vazio = qualquer) —
  // usado p/ o marcador de objetivo apontar pros alvos das missões de abate.
  private nearestEnemyCell(types?: string[]): { col: number; row: number } | null {
    let best: { col: number; row: number } | null = null, bd = Infinity;
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      if (types && types.length && !types.includes(e.typeId)) continue;
      const d = Math.abs(e.c - this.col) + Math.abs(e.r - this.row);
      if (d < bd) { bd = d; best = { col: e.c, row: e.r }; }
    }
    return best;
  }
  // célula-guia DENTRO do local atual: o destino, ou a transição que leva a ele
  private guideCell(): { col: number; row: number } | null {
    const t = this.objectiveTarget();
    if (!t) return null;
    const L = this.location;
    const interior = L !== "village" && L !== "dungeon" && L !== "forest" && L !== "showcase";
    // objetivo é uma LOJA e o jogador JÁ ESTÁ dentro dela → aponta pro atendente
    // (senão o facho ficava preso na porta/saída). roomFind("N") = balcão.
    if (t.zone === "village" && t.shop && L === t.shop) {
      const n = roomFind("N"); return { col: n.col, row: n.row };
    }
    const inZone = (): { col: number; row: number } | null => {
      if (t.zone === "village") {
        if (t.shop) { const d = ESTAB_DOORS.find((e) => e.kind === t.shop); return d ? { col: d.c + d.dc, row: d.r + d.dr } : null; }
        if (t.npc) return this.npcCellByName(t.npc);
        return null;
      }
      if (t.zone === "hedda") return { col: 3, row: 2 };      // Hedda dentro da casa dela
      if (t.zone === "dungeon") {
        // missão de ABATE → aponta pro inimigo VIVO mais próximo do tipo certo
        if (t.kill) return this.nearestEnemyCell(t.killTypes);
        return t.cell ? { col: t.cell[0], row: t.cell[1] } : null;
      }
      return null;
    };
    const sameZone = (t.zone === "village" && L === "village") || (t.zone === "hedda" && L === "hedda") || (t.zone === "dungeon" && L === "dungeon");
    if (sameZone) return inZone();
    // zonas diferentes → aponta p/ a saída/transição a partir do local atual
    if (L === "village") {
      if (t.zone === "dungeon") return this.villageDungeonCell();
      if (t.zone === "hedda") { const d = HOME_DOORS.find((h) => h.id === "hedda"); return d ? { col: d.c + d.dc, row: d.r + d.dr } : null; }
    } else if (L === "dungeon") {
      const u = dungeonFind("U"); return u ? { col: u.col, row: u.row } : null; // sobe p/ a vila
    } else if (interior) {
      const x = roomFind("X"); return { col: x.col, row: x.row }; // porta de saída
    }
    return null;
  }
  // cria (uma vez) o marcador-guia: um marcador DISCRETO — losango dourado
  // pequeno flutuando + uma seta apontando p/ baixo (sem o antigo pilar de luz
  // gritante). Fica na CENA (não em world), sobrevivendo à troca de local.
  private ensureBeacon(): THREE.Group {
    if (this.beacon) return this.beacon;
    const g = new THREE.Group();
    // losango pequeno (octaedro dourado); depthTest:false p/ ainda ser achável de
    // longe, mas pequeno e suave. fog:false p/ a névoa não lavar a cor.
    const diaMat = new THREE.MeshBasicMaterial({ color: 0xffce5a, transparent: true, opacity: 0.85, depthTest: false, fog: false });
    const dia = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), diaMat);
    dia.position.y = 2.35;
    dia.name = "dia";
    dia.renderOrder = 8;
    g.add(dia);
    // seta (cone) apontando p/ baixo, logo abaixo do losango — "é aqui"
    const tipMat = new THREE.MeshBasicMaterial({ color: 0xffce5a, transparent: true, opacity: 0.7, depthTest: false, fog: false });
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.22, 4), tipMat);
    tip.rotation.x = Math.PI; // ponta p/ baixo
    tip.position.y = 2.02;
    tip.name = "tip";
    tip.renderOrder = 8;
    g.add(tip);
    g.renderOrder = 8;
    g.visible = false;
    this.scene.add(g);
    this.beacon = g;
    return g;
  }
  // posiciona o marcador na célula-guia do local atual; some se não houver guia,
  // durante diálogo, ou se o jogador desligou o guia no rastreador.
  private updateBeacon(now: number) {
    const b = this.ensureBeacon();
    const cell = this.guideOn ? this.guideCell() : null;
    if (!cell || this.dialogue) { b.visible = false; return; }
    b.visible = true;
    b.position.set(cell.col * CELL, 0, cell.row * CELL);
    const bob = Math.sin(now * 0.003) * 0.11;
    const dia = b.getObjectByName("dia");
    if (dia) { dia.rotation.y = now * 0.0016; dia.position.y = 2.35 + bob; }
    const tip = b.getObjectByName("tip");
    if (tip) tip.position.y = 2.02 + bob;
  }

  // ---- USAR ITEM (bandeja de consumíveis do HUD) ----
  private consumableTray(): ConsumSlot[] {
    const out: ConsumSlot[] = [];
    for (const id of ["pot_hp", "pot_mp", "beer"]) {
      const n = this.goodHave(id);
      if (n > 0) { const m = GOODS_BY_ID[id]; out.push({ id, icon: m.icon, iconUrl: m.iconUrl, name: m.name, count: n }); }
    }
    return out;
  }
  private refreshConsumables() { this.ui.setConsumables(this.consumableTray()); }
  private useConsumable(id: string) {
    if (this.goodHave(id) <= 0) return;
    if (id === "pot_hp") {
      if (this.playerHp >= this.playerMaxHp) { this.ui.toast("Vida já está cheia."); return; }
      const amt = Math.round(this.playerMaxHp * 0.4);
      this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amt);
      this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp); this.refreshStats();
      this.ui.floatText(window.innerWidth / 2, window.innerHeight * 0.46, `+${amt}`, "heal");
    } else if (id === "pot_mp") {
      if (this.playerMp >= this.playerMaxMp) { this.ui.toast("Mana já está cheia."); return; }
      const amt = Math.round(this.playerMaxMp * 0.4);
      this.playerMp = Math.min(this.playerMaxMp, this.playerMp + amt);
      this.ui.setMana(this.playerMp / this.playerMaxMp, this.playerMp, this.playerMaxMp);
      this.ui.floatText(window.innerWidth / 2, window.innerHeight * 0.52, `+${amt}`, "mana");
    } else if (id === "beer") {
      this.hpRegenUntil = performance.now() + 180000; // 3 min de regeneração
      this.ui.toast("Você bebe a cerveja — vida se regenera por 3 min!");
    } else if (id === "scroll_return") {
      // PORTAL DE RETORNO (estilo PoE): abre um portal, volta ao vilarejo E deixa
      // lá um portal TEMPORÁRIO de uso único que traz de volta a ESTE ponto da
      // masmorra (dungeon→cidade→dungeon e fecha). Só funciona na masmorra.
      if (this.location !== "dungeon") { this.ui.toast("O pergaminho só se abre nas profundezas."); return; }
      this.goodAdd(id, -1);
      this.refreshConsumables();
      // guarda o ponto exato de retorno (andar + célula atual do herói)
      this.dungeonReturn = { floor: this.dungeonFloor, col: this.col, row: this.row };
      const { col, row, facing } = this.returnTo;
      this.ui.toast("Um portal se abre — de volta ao vilarejo! (o par o traz de volta)");
      void this.doorTransition(() => this.enterLocation("village", col, row, facing));
      return;
    } else return;
    this.goodAdd(id, -1);
    this.refreshConsumables();
  }

  // aplica os bônus percentuais de dano das passivas sobre um ataque base
  private atkWithBonus(base: number): number {
    const pct = (this.passive.dmg ?? 0) + (this.passive.mdmg ?? 0);
    return Math.round(base * (1 + pct));
  }

  // atualiza a cópia local dos ranks + a barra de ação + os totais de passivas,
  // e recalcula os atributos derivados.
  private applyPassives(ranks: Record<string, number>) {
    this.skillRanks = { ...ranks };
    this.refreshActionBar();
    this.passive = passiveTotals(ranks);
    this.recomputeDerived();
  }

  // distribui (ou devolve) 1 ponto num primário. Não baixa do piso da criação.
  private allocAttr(key: keyof Primaries, delta: number) {
    if (delta > 0) {
      if (this.unspent <= 0) return;
      this.prim[key] += 1;
      this.unspent -= 1;
    } else {
      if (this.prim[key] <= this.baseAttr[key]) return;
      this.prim[key] -= 1;
      this.unspent += 1;
    }
    this.recomputeDerived();
  }

  // recalcula TODOS os secundários a partir dos primários + base da classe, e
  // aplica as passivas por cima (vida/mana/defesa/ataque). Preserva a fração de
  // vida/mana ao mudar os tetos. É a fonte única de verdade dos atributos.
  // bônus total das armaduras equipadas (base + afixos) + afixos da ARMA equipada
  private equipBonus(): StatBonus {
    const b = sumBonuses(ARMOR_SLOTS.map((s) => this.equippedArmor[s]));
    const w = this.equippedWeaponInst();
    if (w) for (const a of w.affixes) b[a.key] = (b[a.key] ?? 0) + a.value;
    return b;
  }
  // instância de arma equipada (null = usando a arma-base do inventário id)
  private equippedWeaponInst(): WeaponInstance | null {
    return this.equippedWeaponUid ? (this.weaponInv.find((w) => w.uid === this.equippedWeaponUid) ?? null) : null;
  }
  // dano da ARMA no ataque: instância dropada tem o seu próprio dano; senão base + reforço
  private weaponDmg(): number {
    const w = this.equippedWeaponInst();
    if (w) return w.dmg;
    const rlvl = this.currentWeapon ? (this.reinforce[this.currentWeapon.id] ?? 0) : 0;
    return (this.currentWeapon?.dmg ?? 0) + rlvl;
  }
  private recomputeDerived() {
    const eq = this.equipBonus();
    // 1) primários do equipamento entram ANTES da derivação (alimentam os secundários)
    const p = {
      str: this.prim.str + (eq.str ?? 0),
      dex: this.prim.dex + (eq.dex ?? 0),
      int: this.prim.int + (eq.int ?? 0),
    };
    this.sec = derive(p, this.clsHp, this.clsMp);
    // 2) afixos/base DIRETOS somam por cima dos secundários derivados
    this.sec.hp += eq.hp ?? 0;
    this.sec.def += eq.def ?? 0;
    this.sec.magRes += eq.magRes ?? 0;
    this.sec.crit += eq.crit ?? 0;
    this.sec.critDmg += eq.critDmg ?? 0;
    this.sec.precision = Math.min(99, this.sec.precision + (eq.precision ?? 0));
    this.sec.evasion += eq.evasion ?? 0;
    this.sec.mp += eq.mana ?? 0;
    this.sec.atkPhys += eq.atkPhys ?? 0;
    this.sec.atkMag += eq.atkMag ?? 0;
    // 2b) PASSIVAS da árvore de talentos entram nos secundários (antes eram INERTES:
    // gastar pontos em crítico/evasão/etc. não fazia nada). Valores vêm como fração
    // (0.02 = +2%); crit/critDmg/evasão são percentuais, precisão/regen são planos.
    this.sec.crit += (this.passive.crit ?? 0) * 100;
    this.sec.critDmg += (this.passive.critd ?? 0) * 100;
    this.sec.evasion += (this.passive.eva ?? 0) * 100;
    this.sec.precision = Math.min(99, this.sec.precision + (this.passive.prec ?? 0));
    this.sec.regen += this.passive.regen ?? 0;
    const hpFrac = this.playerMaxHp > 0 ? this.playerHp / this.playerMaxHp : 1;
    const mpFrac = this.playerMaxMp > 0 ? this.playerMp / this.playerMaxMp : 1;
    this.playerMaxHp = Math.round(this.sec.hp * (1 + (this.passive.life ?? 0)));
    this.playerMaxMp = Math.round(this.sec.mp * (1 + (this.passive.mana ?? 0)));
    this.playerHp = Math.max(1, Math.round(this.playerMaxHp * hpFrac));
    this.playerMp = Math.round(this.playerMaxMp * mpFrac);
    this.stats.str = this.prim.str;
    this.stats.dex = this.prim.dex;
    this.stats.int = this.prim.int;
    this.stats.def =
      this.sec.def + Math.round((this.passive.def ?? 0) + (this.passive.mres ?? 0));
    const wdmg = this.weaponDmg(); // arma-instância dropada OU base + reforço
    this.stats.atk = Math.round(this.atkWithBonus(this.sec.atkPhys + wdmg) * this.buffAtkMul());
    this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
    this.ui.setMana(this.playerMp / this.playerMaxMp, this.playerMp, this.playerMaxMp);
    this.refreshStats();
  }

  // ---- EQUIPAR / DESEQUIPAR ARMADURA ----
  // equipa uma peça da mochila no seu slot (a que estava lá volta pra mochila)
  private equipArmor(uid: string) {
    const idx = this.armorInv.findIndex((i) => i.uid === uid);
    if (idx < 0) return;
    const it = this.armorInv.splice(idx, 1)[0];
    const prev = this.equippedArmor[it.slot];
    this.equippedArmor[it.slot] = it;
    if (prev) this.armorInv.push(prev);
    this.recomputeDerived();
    this.pushEquipUI();
  }
  private unequipArmor(slot: ArmorSlot) {
    const it = this.equippedArmor[slot];
    if (!it) return;
    delete this.equippedArmor[slot];
    this.armorInv.push(it);
    this.recomputeDerived();
    this.pushEquipUI();
  }
  // gera uma peça (rola raridade+afixos) e joga na mochila — fonte de teste; os
  // DROPS estilo WoW vão usar o mesmo generateArmor.
  private giveArmor(slot: ArmorSlot, tier: number, rarity?: Rarity): ItemInstance {
    const it = generateArmor(slot, tier, rarity ? { rarity } : undefined);
    this.armorInv.push(it);
    this.pushEquipUI();
    return it;
  }
  private static readonly ARMOR_SLOT_PT: Record<ArmorSlot, string> = { head: "Elmo", chest: "Peitoral", hands: "Luvas", feet: "Botas", belt: "Cinto" };
  private fmtStat(k: AffixKey, v: number): string { return `${v > 0 ? "+" : ""}${v}${AFFIXES[k].pct ? "%" : ""}`; }
  private statLines(t: StatBonus): TipLine[] {
    return (Object.keys(t) as AffixKey[]).map((k) => ({ label: AFFIXES[k].label, value: this.fmtStat(k, t[k] ?? 0) }));
  }
  // tooltip de ARMADURA: atributos próprios + (se equipando) o delta vs. a equipada
  private armorTip(it: ItemInstance, action: "equip" | "unequip" | "buy" | "pickup", price?: number): ItemTip {
    const total = itemTotal(it);
    const tip: ItemTip = {
      name: it.name, icon: it.icon, rarity: it.rarity,
      sub: `${RARITY_BY_KEY[it.rarity].label} · ${Game.ARMOR_SLOT_PT[it.slot]}`,
      lines: this.statLines(total), action, price,
    };
    const cur = this.equippedArmor[it.slot];
    // comparação vs. equipado tanto ao equipar quanto ao comprar (ver antes de gastar)
    if (action !== "unequip" && cur && cur.uid !== it.uid) {
      const old = itemTotal(cur);
      const keys = new Set<AffixKey>([...Object.keys(total), ...Object.keys(old)] as AffixKey[]);
      const deltas: TipDelta[] = [];
      for (const k of keys) {
        const d = (total[k] ?? 0) - (old[k] ?? 0);
        if (d !== 0) deltas.push({ label: AFFIXES[k].label, delta: d, pct: !!AFFIXES[k].pct });
      }
      tip.compareName = cur.name; tip.deltas = deltas;
    }
    return tip;
  }
  // tooltip de ARMA: dano (base + reforço) + (se equipando outra) o delta de dano
  private weaponTip(w: Weapon, action: "equip" | "unequip"): ItemTip {
    const eff = w.dmg + (this.reinforce[w.id] ?? 0);
    const tip: ItemTip = {
      name: w.name, icon: w.url, rarity: "comum",
      sub: `Arma${w.grip === "2h" ? " · 2 mãos" : ""}`,
      lines: [{ label: "Dano", value: String(eff) }], action,
    };
    const cur = this.currentWeapon;
    if (action === "equip" && cur && cur.id !== w.id && w.slot === "main" && cur.slot === "main") {
      const curEff = cur.dmg + (this.reinforce[cur.id] ?? 0);
      tip.compareName = cur.name;
      tip.deltas = [{ label: "Dano", delta: eff - curEff }];
    }
    return tip;
  }
  // monta a mochila (armas + armaduras) + peças equipadas e manda pra UI
  private pushEquipUI() {
    const bag: BagEntry[] = [];
    for (const id of this.ownedWeapons) {
      const w = WEAPON_BY_ID[id]; if (!w) continue;
      bag.push({ kind: "weapon", id, icon: w.url, name: w.name, rarity: "comum", tip: this.weaponTip(w, "equip") });
    }
    // ARMAS DROPADAS (instâncias) — id = arma-base (visual), uid = a instância
    for (const wi of this.weaponInv)
      bag.push({ kind: "weapon", id: wi.base, uid: wi.uid, icon: wi.icon, name: wi.name, rarity: wi.rarity, tip: this.weaponInstTip(wi) });
    for (const it of this.armorInv)
      // MOCHILA usa a arte ORIGINAL (já ficava boa aqui)
      bag.push({ kind: "armor", id: it.uid, icon: it.icon, name: it.name, rarity: it.rarity, tip: this.armorTip(it, "equip") });
    const armor: EquipUIData["armor"] = {};
    for (const s of ARMOR_SLOTS) {
      const it = this.equippedArmor[s];
      // SLOT EQUIPADO usa o ícone recortado, que preenche o formato do slot
      // (ex.: o cinto largo enche o slot achatado); popup segue com o original
      if (it) armor[s] = { icon: it.fitIcon, rarity: it.rarity, tip: this.armorTip(it, "unequip") };
    }
    this.ui.setEquip({ bag, armor });
    this.scheduleSave(); // inventário/equipamento mudou → agenda auto-save
  }

  // ===================== SAVE / PERSISTÊNCIA =====================
  // captura TODO o estado do personagem num blob JSON (o backend serializa).
  private serialize(): CharacterSave {
    return {
      v: 1, slot: this.saveSlot,
      name: this.playerName, classId: this.classId,
      createdAt: this.saveCreatedAt, savedAt: Date.now(),
      level: this.stats.level, xp: this.stats.xp, xpMax: this.stats.xpMax, gold: this.stats.gold,
      prim: { ...this.prim }, baseAttr: { ...this.baseAttr }, unspent: this.unspent,
      hp: Math.round(this.playerHp), mp: Math.round(this.playerMp),
      armorInv: this.armorInv, equippedArmor: this.equippedArmor,
      ownedWeapons: [...this.ownedWeapons], currentWeapon: this.currentWeapon?.id ?? null,
      weaponInv: this.weaponInv, equippedWeaponUid: this.equippedWeaponUid,
      reinforce: { ...this.reinforce }, consumables: { ...this.consumables }, materials: { ...this.materials },
      skillRanks: { ...this.skillRanks },
      mainQuests: this.mainQuests, quests: this.quests, stash: this.stash,
      dungeonMaxFloor: this.dungeonMaxFloor,
    };
  }

  // restaura o personagem a partir de um save (chamado logo após construir com "load").
  public loadSave(s: CharacterSave): void {
    this.saveSlot = s.slot; this.saveCreatedAt = s.createdAt || Date.now();
    this.playerName = s.name; this.classId = s.classId;
    const cls = CLASS_BY_ID[s.classId] ?? CLASS_BY_ID.guerreiro;
    this.clsHp = cls.hp; this.clsMp = cls.mp;
    this.prim = { ...s.prim }; this.baseAttr = { ...s.baseAttr }; this.unspent = s.unspent ?? 0;
    this.stats.level = s.level; this.stats.xp = s.xp; this.stats.xpMax = s.xpMax; this.stats.gold = s.gold;
    this.armorInv = s.armorInv ?? []; this.equippedArmor = s.equippedArmor ?? {};
    this.ownedWeapons = s.ownedWeapons ?? []; this.reinforce = s.reinforce ?? {};
    this.weaponInv = s.weaponInv ?? []; this.equippedWeaponUid = s.equippedWeaponUid ?? null;
    this.consumables = s.consumables ?? {};
    this.materials = { ...this.materials, ...(s.materials ?? {}) } as typeof this.materials;
    this.skillRanks = s.skillRanks ?? {};
    if (s.mainQuests) this.mainQuests = s.mainQuests as typeof this.mainQuests;
    // mescla: mantém os defaults (bounties novas aparecem em saves antigos)
    if (s.quests) this.quests = { ...this.quests, ...(s.quests as typeof this.quests) };
    if (s.stash) this.stash = s.stash;
    this.dungeonMaxFloor = s.dungeonMaxFloor ?? 0;
    this.currentWeapon = s.currentWeapon ? (WEAPON_BY_ID[s.currentWeapon] ?? null) : null;
    // empurra o contador de uid dos itens p/ não colidir com os salvos
    reserveItemUid([
      ...this.armorInv.map((it) => it.uid),
      ...Object.values(this.equippedArmor).filter(Boolean).map((it) => (it as ItemInstance).uid),
      ...this.weaponInv.map((w) => w.uid),
    ]);
    // recalcula passivas + derivados (usa prim/skills/equipamento restaurados)
    this.applyPassives(this.skillRanks);
    this.recomputeDerived();
    this.playerHp = Math.max(1, Math.min(this.playerMaxHp, s.hp || this.playerMaxHp));
    this.playerMp = Math.max(0, Math.min(this.playerMaxMp, s.mp ?? this.playerMaxMp));
    this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
    this.ui.setMana(this.playerMp / this.playerMaxMp, this.playerMp, this.playerMaxMp);
    this.refreshStats(); this.pushEquipUI();
    this.ui.setSkillInfo(this.classId, skillPointsFor(this.stats.level));
    this.saveReady = true; // a partir daqui o auto-save pode gravar
  }

  // liga um personagem NOVO (recém-criado) a um slot e grava o estado inicial.
  public startNewCharacter(slot: number): void {
    this.saveSlot = slot; this.saveCreatedAt = Date.now(); this.saveReady = true;
    void this.saveNow();
  }

  private scheduleSave(): void {
    if (!this.saveReady) return; // não grava durante criação/carregamento nem em ?test
    // em combate o refreshStats dispara sem parar; o debounce só grava quando assenta,
    // mas um teto de 20s garante que sessão longa não fique sem salvar.
    if (Date.now() - this.lastSaveAt > 20000) { void this.saveNow(); return; }
    if (this.saveTimer) window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => { this.saveTimer = 0; void this.saveNow(); }, 1200);
  }
  private async saveNow(): Promise<void> {
    if (!this.saveReady) return;
    this.lastSaveAt = Date.now();
    try { await saveBackend.save(this.serialize()); } catch { /* cota/rede: ignora */ }
  }

  // rola o dano de um golpe: base × passivas(%) × buff, com chance de CRÍTICO
  // (usa a chance/dano crítico dos secundários). Retorna o valor final e se crit.
  private rollDamage(base: number, magic: boolean): { dmg: number; crit: boolean } {
    const pct = magic ? this.passive.mdmg ?? 0 : this.passive.dmg ?? 0;
    let dmg = base * (1 + pct) * this.buffAtkMul();
    // FÚRIA (talento): + dano conforme a vida está baixa (escala com a vida faltante)
    const rage = this.passive.rage ?? 0;
    if (rage > 0) {
      const missing = 1 - this.playerHp / Math.max(1, this.playerMaxHp);
      dmg *= 1 + rage * missing;
    }
    const crit = Math.random() * 100 < this.sec.crit;
    if (crit) dmg *= this.sec.critDmg / 100;
    return { dmg: Math.max(1, Math.round(dmg)), crit };
  }

  // projeta um ponto do mundo p/ pixels de tela (p/ o dano flutuante)
  private projectToScreen(x: number, y: number, z: number): { x: number; y: number } {
    const v = new THREE.Vector3(x, y, z).project(this.camera);
    const rect = this.renderer.domElement.getBoundingClientRect();
    return {
      x: rect.left + ((v.x + 1) / 2) * rect.width,
      y: rect.top + ((1 - v.y) / 2) * rect.height,
    };
  }

  private tryHitEnemy() {
    const [dc, dr] = DIRS[this.facing];
    // acerta o inimigo (vivo) na célula à frente do jogador
    const e = this.enemies.find((x) => !x.dyingAt && x.c === this.col + dc && x.r === this.row + dr);
    if (!e) return;
    // dano do ataque básico = Atq. Físico + arma (instância/base), com chance de crítico
    const base = this.sec.atkPhys + this.weaponDmg();
    const r = this.rollDamage(base, false);
    this.dealDamageToEnemy(e, r.dmg, r.crit);
  }

  // aplica dano a um inimigo, atualiza a barra, mostra o número flutuante e
  // cuida da morte (poof/recompensa). isCrit deixa o número maior e com "!".
  private dealDamageToEnemy(
    e: EnemyEnt,
    amount: number,
    isCrit = false,
  ) {
    if (e.dyingAt) return;
    const dmg = Math.max(1, Math.round(amount));
    e.hp -= dmg;
    e.hitAt = performance.now();
    e.aggro = true; // ao ser atingido (mesmo à distância) ele parte pra cima do herói
    this.ui.playSfx("hit"); // estalo de dano no inimigo
    // ROUBO DE VIDA (talento): cura o herói por uma fração do dano causado
    const leech = this.passive.leech ?? 0;
    if (leech > 0 && this.playerHp < this.playerMaxHp) {
      const h = Math.max(1, Math.round(dmg * leech));
      this.playerHp = Math.min(this.playerMaxHp, this.playerHp + h);
      this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
    }
    const frac = Math.max(0.0001, e.hp / e.maxHp);
    e.barFill.scale.x = frac; // encolhe a barra (ancorada à esquerda)
    e.barFill.position.x = -(1 - frac) * 1.3 / 2;
    // número de dano flutuante sobre o inimigo (crítico = maior + "!")
    const sp = this.projectToScreen(e.bx, 1.8, e.bz);
    this.ui.floatText(sp.x, sp.y, isCrit ? `${dmg}!` : `${dmg}`, isCrit ? "crit" : "hit");
    if (e.hp <= 0) {
      e.dyingAt = e.hitAt; // começa a tombar/sumir
      this.blocked.delete(`${e.c},${e.r}`); // libera a passagem
      this.spawnPoof(e.bx, e.bz);
      if (this.target === e) this.clearTarget();
      // recompensa: ouro base + pequena variação. LOOT estilo WoW cai no CHÃO na célula
      // do inimigo (ouro auto ao pisar; item por popup). A quantidade/qualidade escala
      // com o PORTE (normal < mini < CHEFE).
      const gold = e.goldBase + Math.floor(Math.random() * 5);
      this.rollLoot(e.c, e.r, gold, e.tier);
      // XP com "rating" pelo nível relativo: se o herói supera muito o inimigo, rende
      // menos (evita farmar trivial no respawn); perto/acima do nível dele, rende cheio.
      this.gainXp(this.scaledXp(e.xp, e.lvl));
      this.questOnKill(e); // progresso das missões/bounties de abate
      this.mainQuestOnKill(); // progresso do capítulo ativo da main quest
    }
  }

  // distância em células (Chebyshev) entre o herói e um inimigo
  private cellDist(e: EnemyEnt): number {
    return Math.max(Math.abs(this.col - e.c), Math.abs(this.row - e.r));
  }

  // multiplicador de dano do buff ativo (1 se nenhum)
  private buffAtkMul(): number {
    return this.buff && performance.now() < this.buff.until ? this.buff.atkMul : 1;
  }
  // fração de redução do dano recebido pelo buff ativo (0 se nenhum)
  private buffDefReduc(): number {
    return this.buff && performance.now() < this.buff.until ? this.buff.defReduc : 0;
  }

  // (re)constrói a barra de ação com as ativas aprendidas
  private refreshActionBar() {
    const list = activeSkillsFor(this.classId, this.skillRanks);
    this.ui.setActionBar(
      list.map((s) => ({ id: s.id, name: s.name, icon: s.icon, mana: s.combat.mana })),
    );
  }

  // aciona uma habilidade da barra de ação (respeita mana, alvo, alcance e recarga)
  private useSkill(id: string) {
    const rank = this.skillRanks[id] || 0;
    if (rank <= 0) return;
    const cb = combatFor(id);
    const now = performance.now();
    // recarga
    if ((this.cooldownUntil[id] ?? 0) > now) {
      this.ui.toast("Recarregando…");
      return;
    }
    // mana
    if (this.playerMp < cb.mana) {
      this.ui.toast("Mana insuficiente");
      return;
    }
    // alvo / alcance (habilidades ofensivas)
    if (cb.target === "enemy") {
      // auto-mira: se não há alvo, mira o inimigo VIVO mais próximo
      if (!this.target || this.target.dyingAt) {
        const near = this.nearestEnemy();
        if (near) this.setTarget(near);
      }
      const t = this.target;
      if (!t || t.dyingAt) {
        this.ui.toast("Sem alvo");
        return;
      }
      const dist = this.cellDist(t);
      const reach = cb.melee ? 1 : cb.range;
      if (dist > reach) {
        this.ui.toast(cb.melee ? "Muito longe (corpo-a-corpo)" : "Fora de alcance");
        return;
      }
    }
    // paga o custo (número flutuante de mana perto do slot) e dispara a recarga
    this.playerMp = Math.max(0, this.playerMp - cb.mana);
    this.ui.setMana(this.playerMp / this.playerMaxMp, this.playerMp, this.playerMaxMp);
    this.ui.skillManaFloat(id, cb.mana);
    // REDUÇÃO DE RECARGA (talento): encurta a recarga (teto de 80%)
    const cdr = Math.min(0.8, this.passive.cdr ?? 0);
    this.cooldownUntil[id] = now + cb.cd * (1 - cdr);
    this.coolingSkills.add(id); // o tick atualiza o overlay + contagem regressiva
    // som: skills corpo-a-corpo já tocam o "swing"; magias de FOGO tocam o som de fogo;
    // as demais (magia/buff/cura) tocam "cast"
    if (!cb.melee) this.ui.playSfx(FIRE_SKILLS.has(id) ? "fireMagic" : "cast");
    // efeito
    if (cb.effect === "dmg" && this.target) {
      // guarda alvo/posição ANTES do dano (a morte limpa this.target)
      const tx = this.target.bx, tz = this.target.bz;
      const enemyRef = this.target;
      // dano = base do rank + ESCALONAMENTO por atributo (FOR/DES/INT da classe)
      const base = cb.power * (1 + 0.25 * (rank - 1)) + attrBonus(id, this.classId, this.prim);
      // magias (mago/clérigo) têm um pequeno TEMPO DE CONJURAÇÃO; melee é instantâneo
      const castMs = !cb.melee && cb.magic ? 360 : 0;
      if (castMs > 0) this.ui.castBar(skillName(id), castMs); // barra "conjurando…"
      const fxMs = fxDurationFor(id);
      const impactEnd = FX_IMPACT_END.has(id); // dano só no fim da animação
      const dealDmg = () => {
        if (this.enemies.includes(enemyRef) && !enemyRef.dyingAt) {
          const r = this.rollDamage(base, cb.magic);
          this.dealDamageToEnemy(enemyRef, r.dmg, r.crit);
        }
      };
      const resolve = () => {
        if (SKILL_FX[id]) this.spawnEffect(id, tx, tz); // efeito EM CIMA do alvo
        if (impactEnd) window.setTimeout(dealDmg, fxMs); // espera o efeito "cair"
        else dealDmg();
      };
      if (castMs > 0) window.setTimeout(resolve, castMs);
      else resolve();
      if (cb.melee) this.ui.swingWeapon();
    } else if (cb.effect === "heal") {
      // cura também escala com o atributo (INT do clérigo)
      const amt = Math.round(cb.power * (1 + 0.25 * (rank - 1)) + attrBonus(id, this.classId, this.prim));
      const before = this.playerHp;
      this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amt);
      this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
      this.refreshStats();
      const healed = this.playerHp - before;
      this.ui.floatText(window.innerWidth / 2, window.innerHeight * 0.46, `+${healed}`, "heal");
      this.ui.toast(`+${amt} vida`);
    } else if (cb.effect === "buff") {
      this.buff = {
        atkMul: cb.atkMul ?? 1,
        defReduc: cb.defReduc ?? 0,
        until: now + (cb.dur ?? 6000),
      };
      this.recomputeDerived();
      this.ui.toast("Fortalecido!");
    }
    // SELO DE REVIVER (Clérigo): em party revive um aliado; SOLO sela o próprio herói
    // — se ele cair dentro da janela, revive uma vez com 1 de vida + escudo curto.
    if (id === "c_intervencao" || id === "c_ressurreicao") {
      this.reviveUntil = now + (id === "c_ressurreicao" ? 45000 : 30000);
      this.ui.toast(id === "c_ressurreicao" ? "Selo de Ressurreição!" : "Selo de Intervenção!");
    }
  }

  // ---- seleção de alvo ----
  private setTarget(e: EnemyEnt) {
    this.target = e;
    this.ensureReticle();
    if (this.reticle) this.reticle.visible = true;
  }
  private clearTarget() {
    this.target = null;
    if (this.reticle) this.reticle.visible = false;
  }
  // inimigo vivo mais próximo do herói (por distância em células)
  private nearestEnemy(): EnemyEnt | null {
    let best: EnemyEnt | null = null, bd = Infinity;
    for (const e of this.enemies) {
      if (e.dyingAt) continue;
      const d = Math.abs(e.c - this.col) + Math.abs(e.r - this.row);
      if (d < bd) { bd = d; best = e; }
    }
    return best;
  }

  // cria (uma vez) o marcador de mira: uma seta/chevron discreta que paira sobre
  // o alvo (limpa, nada de molduras grossas).
  private ensureReticle() {
    if (this.reticle) return;
    const cv = document.createElement("canvas");
    cv.width = 128;
    cv.height = 128;
    const g = cv.getContext("2d")!;
    const C = 64;
    // anel FINO (limpo, discreto) + 4 tracinhos curtos nos pontos cardeais
    g.shadowColor = "rgba(0,0,0,.5)";
    g.shadowBlur = 5;
    g.strokeStyle = "rgba(255,228,150,.9)";
    g.lineWidth = 4;
    g.beginPath();
    g.arc(C, C, 50, 0, Math.PI * 2);
    g.stroke();
    g.lineCap = "round";
    g.lineWidth = 5;
    const tick = (ang: number) => {
      const c = Math.cos(ang), s = Math.sin(ang);
      g.beginPath();
      g.moveTo(C + c * 44, C + s * 44);
      g.lineTo(C + c * 56, C + s * 56);
      g.stroke();
    };
    tick(-Math.PI / 2); tick(Math.PI / 2); tick(0); tick(Math.PI);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.9,
      depthTest: true, // ocluído por paredes (não atravessa prédios)
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), mat);
    mesh.renderOrder = 999;
    mesh.visible = false;
    this.reticle = mesh;
    this.world.add(mesh);
    this.billboardProps.push(mesh); // encara a câmera
  }

  // clique na cena: raycast p/ selecionar um inimigo como alvo (o mais próximo da câmera)
  private onCanvasPointer(ev: PointerEvent) {
    const live = this.enemies.filter((x) => !x.dyingAt);
    if (!live.length) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    const hits = this.raycaster.intersectObjects(live.map((x) => x.mesh), false);
    if (!hits.length) return;
    const picked = live.find((x) => x.mesh === hits[0].object);
    if (picked) this.setTarget(picked);
  }

  // explosão de fumaça (sprite-sheet do GIF) na morte do inimigo. 10 quadros
  // 256x192 numa folha 2560x192; o fundo escuro do GIF virou transparente.
  private spawnPoof(bx: number, bz: number) {
    if (!this.poofTex) return; // ainda carregando
    const tex = this.poofTex.clone();
    tex.needsUpdate = true;
    tex.repeat.set(1 / POOF_FRAMES, 1);
    tex.offset.set(0, 0);
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 2.85), mat);
    mesh.position.set(bx, 1.5, bz);
    this.world.add(mesh);
    this.poofs.push({ mesh, mat, tex, born: performance.now() });
  }

  // avança os quadros da explosão (UV) e a remove no fim; encara a câmera
  private updatePoofs(now: number) {
    if (this.poofs.length === 0) return;
    const cx = this.camera.position.x, cz = this.camera.position.z;
    for (let i = this.poofs.length - 1; i >= 0; i--) {
      const pf = this.poofs[i];
      const t = (now - pf.born) / POOF_MS;
      if (t >= 1) {
        this.world.remove(pf.mesh);
        pf.mesh.geometry.dispose();
        pf.mat.dispose();
        pf.tex.dispose();
        this.poofs.splice(i, 1);
        continue;
      }
      const frame = Math.min(POOF_FRAMES - 1, Math.floor(t * POOF_FRAMES));
      pf.tex.offset.x = frame / POOF_FRAMES;
      pf.mesh.rotation.y = Math.atan2(cx - pf.mesh.position.x, cz - pf.mesh.position.z);
    }
  }

  // ============================================================ DROPS (chão)
  // Textura radial macia (branca) p/ o facho/halo — tingida pela cor da raridade.
  private dropGlowTexture(): THREE.Texture {
    if (this.dropGlowTex) return this.dropGlowTex;
    const s = 96;
    const cv = document.createElement("canvas");
    cv.width = cv.height = s;
    const g = cv.getContext("2d")!;
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    this.dropGlowTex = t;
    return t;
  }

  // conta quantos drops já existem na célula (p/ desviar levemente o novo)
  private dropsInCell(c: number, r: number): number {
    let n = 0;
    for (const d of this.drops) if (d.c === c && d.r === r) n++;
    return n;
  }

  // cria o container (ícone billboard + facho macio) de um drop na célula (c,r).
  private makeDrop(c: number, r: number, color: string, iconUrl: string,
    part: Partial<GroundDrop>): GroundDrop {
    const idx = this.dropsInCell(c, r);
    // vários drops na mesma célula → leque pequeno p/ não colar um no outro
    const ang = idx * 2.399; // ângulo áureo
    const rad = idx === 0 ? 0 : 0.34;
    const dx = Math.cos(ang) * rad, dz = Math.sin(ang) * rad;
    const grp = new THREE.Group();
    grp.position.set(c * CELL + dx, 0, r * CELL + dz);
    const baseY = 0.62;
    // FACHO sutil (aditivo, opacidade baixa) — 1ª pessoa: nada de feixe gritante
    const glowMat = new THREE.SpriteMaterial({
      map: this.dropGlowTexture(), color: new THREE.Color(color),
      transparent: true, opacity: 0.26, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(0.6, 0.98, 1);
    glow.position.y = baseY;
    grp.add(glow);
    // ÍCONE do item (billboard) — começa invisível, aparece ao carregar a arte
    const iconMat = new THREE.MeshBasicMaterial({
      transparent: true, opacity: 0, depthWrite: false,
      depthTest: false, side: THREE.DoubleSide, alphaTest: 0.06,
    });
    const icon = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), iconMat);
    icon.position.y = baseY;
    icon.renderOrder = 5;
    grp.add(icon);
    this.loadArt(iconUrl, (t) => {
      const im = t.image as { width: number; height: number } | undefined;
      const asp = im && im.width && im.height ? im.width / im.height : 1;
      const h = 0.6, w = h * asp;
      icon.geometry.dispose();
      icon.geometry = new THREE.PlaneGeometry(w, h);
      iconMat.map = t;
      iconMat.opacity = 1;
      iconMat.needsUpdate = true;
    });
    this.world.add(grp);
    const d: GroundDrop = {
      c, r, color, group: grp, icon, glow, baseY,
      ph: idx * 1.3, opened: false, bornAt: this.now, dx, dz,
      kind: part.kind ?? "item", item: part.item, weapon: part.weapon, gold: part.gold,
    };
    this.drops.push(d);
    this.pushMinimap(); // bolinha aparece no minimapa
    return d;
  }

  // cor viva por raridade p/ o facho e a bolinha do minimapa (Comum = branca)
  private static DROP_COLOR: Record<Rarity, string> = {
    comum: "#eaeaea", magico: "#4a90e2", raro: "#e8b24a", lendario: "#ff8a2e",
  };
  // dropa uma peça de armadura no chão da célula (c,r)
  private spawnItemDrop(c: number, r: number, item: ItemInstance) {
    this.makeDrop(c, r, Game.DROP_COLOR[item.rarity], item.icon, { kind: "item", item });
  }
  // dropa uma sacola de ouro (coin.png) no chão — recolhida ao pisar por cima
  private spawnGoldDrop(c: number, r: number, gold: number) {
    this.makeDrop(c, r, "#f4d873", coinDropUrl, { kind: "gold", gold });
  }

  // remove um drop do mundo (dispose) e da lista lógica
  private removeDrop(d: GroundDrop) {
    const i = this.drops.indexOf(d);
    if (i < 0) return;
    this.drops.splice(i, 1);
    this.world.remove(d.group);
    d.icon.geometry.dispose();
    (d.icon.material as THREE.Material).dispose();
    (d.glow.material as THREE.Material).dispose();
    this.pushMinimap();
  }

  // sorteia loot ao matar um inimigo de nível `lv`: ouro (sacola) + chance de item.
  // XP "com rating": rende cheio perto/abaixo do nível do herói; cai conforme ele
  // supera o inimigo (freia o farm de trivial no respawn). Nunca zera (mínimo 1).
  private scaledXp(baseXp: number, enemyLvl: number): number {
    const diff = this.stats.level - enemyLvl;
    let mul = 1;
    if (diff >= 6) mul = 0.15;         // muito acima → migalha
    else if (diff >= 2) mul = 1 - (diff - 1) * 0.17; // 2→0.83 … 5→0.32
    return Math.max(1, Math.round(baseXp * mul));
  }

  // raridade sorteada pelos PESOS de um perfil [Comum, Mágico, Raro, Lendário].
  private rollRarity(w: [number, number, number, number]): Rarity {
    const keys: Rarity[] = ["comum", "magico", "raro", "lendario"];
    let x = Math.random() * (w[0] + w[1] + w[2] + w[3]);
    for (let i = 0; i < 4; i++) { if (x < w[i]) return keys[i]; x -= w[i]; }
    return "comum";
  }

  // tier do item (1→5) acompanha o NÍVEL do herói e a PROFUNDIDADE da dungeon:
  //   nível → +1 a cada 3 níveis (nv10 ≈ tier 4, nv13+ ≈ tier 5);
  //   andar → +1 a cada 2 andares descidos (loot fundo é melhor);
  //   +bônus do perfil (chefe/baú escondido) e 20% de chance de subir 1.
  // Armas usam o tier cheio (1-5); a armadura é limitada a 3 em dropPiece.
  private dropTier(bonus = 0): number {
    const byLevel = Math.floor((this.stats.level - 1) / 3);
    const byDepth = this.location === "dungeon" ? Math.floor(getDungeonFloor() / 2) : 0;
    const base = 1 + byLevel + byDepth + bonus;
    return Math.max(1, Math.min(5, base + (Math.random() < 0.2 ? 1 : 0)));
  }

  // até `n` células ANDÁVEIS e livres perto de (c,r) (inclui ela mesma) — p/ espalhar
  // o tesouro do chefe sem empilhar tudo no mesmo ponto.
  private freeNearCells(c: number, r: number, n: number): { c: number; r: number }[] {
    const out: { c: number; r: number }[] = [];
    const seen = new Set<string>();
    const ring: [number, number][] = [
      [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1],
      [2, 0], [-2, 0], [0, 2], [0, -2],
    ];
    for (const [dc, dr] of ring) {
      const nc = c + dc, nr = r + dr, k = `${nc},${nr}`;
      if (seen.has(k)) continue;
      const walk = this.location === "dungeon" ? dungeonWalkable(nc, nr) : this.canWalk(nc, nr);
      if (walk && !this.blocked.has(k)) { out.push({ c: nc, r: nr }); seen.add(k); }
      if (out.length >= n) break;
    }
    if (!out.length) out.push({ c, r });
    return out;
  }

  // gera 1 peça de equipamento (arma OU armadura) seguindo um perfil de loot.
  // ~35% das peças são ARMAS (instâncias com dano/afixos), o resto armadura.
  private dropPiece(c: number, r: number, prof: LootProfile) {
    const rarity = this.rollRarity(prof.rar);
    const tier = this.dropTier(prof.tierB);
    if (Math.random() < 0.35) {
      this.spawnWeaponDrop(c, r, generateWeapon(this.classId, tier, { rarity }));
    } else {
      const slot = ARMOR_SLOTS[Math.floor(Math.random() * ARMOR_SLOTS.length)];
      this.spawnItemDrop(c, r, generateArmor(slot, Math.min(3, tier), { rarity }));
    }
  }
  // arma dropada no chão (mesmo pipeline visual dos itens; facho pela raridade)
  private spawnWeaponDrop(c: number, r: number, wi: WeaponInstance) {
    this.makeDrop(c, r, Game.DROP_COLOR[wi.rarity], wi.icon, { kind: "item", weapon: wi });
  }

  // despeja as peças de um perfil, ESPALHADAS pelas células livres em volta de (c,r).
  //   slots → chances independentes (mobs);  min/max → nº fixo (chefe/baús).
  private spawnLootPieces(c: number, r: number, prof: LootProfile) {
    const count = prof.min != null
      ? prof.min + Math.floor(Math.random() * ((prof.max ?? prof.min) - prof.min + 1))
      : (prof.slots ?? []).filter((p) => Math.random() < p).length;
    if (count <= 0) return;
    const cells = this.freeNearCells(c, r, count);
    for (let i = 0; i < count; i++) { const cell = cells[i % cells.length]; this.dropPiece(cell.c, cell.r, prof); }
  }

  // LOOT ao matar: ouro + peças conforme o PERFIL do PORTE (pirâmide MMO).
  //   normal → muito item porém quase tudo Comum.  mini → mix melhor.
  //   CHEFE  → 3–5 peças de raridade ALTA + ouro extra (fonte-chave do topo).
  private rollLoot(c: number, r: number, gold: number, tier: "normal" | "mini" | "boss") {
    const prof = LOOT_PROFILES[tier];
    this.spawnGoldDrop(c, r, tier === "boss" ? gold + 60 + Math.floor(Math.random() * 60) : gold);
    this.spawnLootPieces(c, r, prof);
  }

  // anima os drops (flutuar + facho pulsando) e faz o recolhimento automático do OURO
  private updateDrops(now: number) {
    if (!this.drops.length) return;
    const cx = this.camera.position.x, cz = this.camera.position.z;
    const NEAR = CELL * 2, HIDE = CELL * 8.5; // cheio até 2 células; some além de ~8.5
    for (let i = this.drops.length - 1; i >= 0; i--) {
      const d = this.drops[i];
      // LOD por DISTÂNCIA: o item FICA no chão, mas o ícone ENCOLHE conforme o herói
      // se afasta e SOME de vez ao longe (acompanha a névoa que fecha) — reaparece ao
      // voltar. Sem isso, um ícone brilhante flutuava visível dentro do breu.
      const dist = Math.hypot(cx - d.group.position.x, cz - d.group.position.z);
      if (dist > HIDE) { d.group.visible = false; continue; }
      d.group.visible = true;
      const k = dist <= NEAR ? 0 : (dist - NEAR) / (HIDE - NEAR); // 0 perto → 1 no limite
      d.group.scale.setScalar(1 - k * 0.72);        // encolhe até ~0.28
      const fade = Math.max(0, 1 - k);              // some suave
      // billboard: o ícone encara a câmera
      d.icon.rotation.y = Math.atan2(cx - d.group.position.x, cz - d.group.position.z);
      // flutuar suave
      const bob = Math.sin(now * 0.003 + d.ph) * 0.06;
      d.icon.position.y = d.baseY + bob;
      if (d.icon.material) (d.icon.material as THREE.MeshBasicMaterial).opacity =
        ((d.icon.material as THREE.MeshBasicMaterial).map ? 1 : 0) * fade;
      // facho pulsando de leve (sutil), também esmaecendo com a distância
      const gm = d.glow.material as THREE.SpriteMaterial;
      gm.opacity = (0.2 + (Math.sin(now * 0.0026 + d.ph) + 1) * 0.05) * fade;
      d.glow.position.y = d.baseY - 0.04 + bob * 0.5;
      // OURO: recolhe automático ao pisar na célula
      if (d.kind === "gold" && this.col === d.c && this.row === d.r && !this.anim) {
        this.stats.gold += d.gold ?? 0;
        this.refreshStats();
        this.ui.playSfx("coin");
        this.ui.toast(`+${d.gold} ouro`);
        this.removeDrop(d);
      }
    }
  }

  // item caído na célula (c,r) — o primeiro ainda-não-aberto (p/ o popup)
  private itemDropAt(c: number, r: number): GroundDrop | null {
    for (const d of this.drops) if (d.kind === "item" && d.c === c && d.r === r) return d;
    return null;
  }

  // ao chegar numa célula (fim do passo): abre 1× o popup de item caído aqui.
  private onArriveCell() {
    const d = this.itemDropAt(this.col, this.row);
    if (d && !d.opened) { d.opened = true; this.openDropPopup(d); }
    // se saiu da célula, reseta o "opened" dos itens de outras células
    for (const o of this.drops) if (!(o.c === this.col && o.r === this.row)) o.opened = false;
  }

  // abre o popup "Pegar" de um drop de item (armadura OU arma)
  private openDropPopup(d: GroundDrop) {
    if (d.kind !== "item") return;
    if (d.weapon) this.ui.showPickup(this.weaponInstTip(d.weapon), () => this.takeDrop(d));
    else if (d.item) this.ui.showPickup(this.armorTip(d.item, "pickup"), () => this.takeDrop(d));
  }

  // recolhe o item do chão → mochila (com som + toast)
  private takeDrop(d: GroundDrop) {
    if (d.kind !== "item" || (!d.item && !d.weapon)) return;
    if (!this.drops.includes(d)) return; // já pego
    // TRAVA DE CAPACIDADE: a mochila (armas-base + armaduras + armas dropadas) não é
    // infinita — se estiver cheia, o item FICA no chão (reabre o popup ao liberar espaço).
    if (this.ownedWeapons.length + this.armorInv.length + this.weaponInv.length >= Game.INV_CAP) {
      this.ui.toast("Inventário cheio! Venda ou guarde algo no baú.");
      d.opened = false;
      return;
    }
    if (d.weapon) { this.weaponInv.push(d.weapon); this.ui.toast(`Pegou: ${d.weapon.name}`); }
    else if (d.item) { this.armorInv.push(d.item); this.ui.toast(`Pegou: ${d.item.name}`); }
    this.removeDrop(d);
    this.refreshStats();
    this.pushEquipUI();
  }

  // bolinhas do minimapa: só ITENS (cor = raridade). O ouro se pega andando por
  // cima, então não polui o mapa (e evita conflito com a cor do Raro).
  private buildMiniDrops(): MiniDrop[] {
    return this.drops.filter((d) => d.kind === "item").map((d) => ({ c: d.c, r: d.r, color: d.color }));
  }
  // inimigos vivos p/ o minimapa (bolinha vermelha; tamanho pelo tier)
  private buildMiniEnemies(): MiniEnemy[] {
    return this.enemies
      .filter((e) => !e.dyingAt)
      .map((e) => ({ c: e.c, r: e.r, tier: e.tier }));
  }

  // pré-carrega as folhas de efeito (prontas quando a skill for usada)
  private preloadFx() {
    for (const id in SKILL_FX) {
      const url = SKILL_FX[id].url;
      if (!this.fxTexCache[url]) this.loadArt(url, (t) => (this.fxTexCache[url] = this.fxFilter(t)));
    }
  }

  // Folhas de efeito são sprite-sheets LARGAS. Mipmap faz a média dos quadros e
  // some com conteúdo esparso (o gelo desaparecia) e espalha os brancos do raio
  // num "retângulo branco". Filtragem linear sem mipmap resolve os dois.
  private fxFilter(t: THREE.Texture): THREE.Texture {
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  }

  // toca o EFEITO de uma habilidade EM CIMA do alvo (tx,tz), sem voar — a
  // animação (sprite-sheet) estoura no lugar e some.
  private spawnEffect(skillId: string, tx: number, tz: number) {
    const fx = SKILL_FX[skillId];
    if (!fx) return;
    const base = this.fxTexCache[fx.url];
    if (!base) {
      this.loadArt(fx.url, (t) => (this.fxTexCache[fx.url] = this.fxFilter(t))); // carrega p/ a próxima
      return;
    }
    const FR = fx.frames;
    const tex = base.clone();
    this.fxFilter(tex); // sem mipmap: mantém quadros nítidos e sem "halo" branco
    tex.repeat.set(1 / FR, 1);
    tex.offset.set(0, 0);
    const img = base.image as { width: number; height: number } | undefined;
    const asp = img && img.height ? img.width / FR / img.height : 1;
    // MESMA receita da fumaça de morte (renderiza sempre): alpha normal, no world.
    // depthTest desligado + renderOrder alto → o efeito SEMPRE aparece por cima do
    // inimigo (senão o corpo dele podia esconder o estouro em cima dele).
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });
    const S = 2.8; // encaixa no tamanho do inimigo, mantendo o aspecto
    const w = asp >= 1 ? S : S * asp;
    const h = asp >= 1 ? S / asp : S;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    // efeitos "de chão" (muralha de fogo, descarga) tocam o piso: base no y=0.
    // os demais estouram na altura do corpo do inimigo (igual ao poof).
    const y = FX_GROUND.has(skillId) ? h / 2 : 1.5;
    mesh.position.set(tx, y, tz);
    mesh.renderOrder = 20; // desenha depois do inimigo (fica por cima)
    this.world.add(mesh);
    this.projectiles.push({
      mesh, mat, tex, frames: FR, born: performance.now(), ms: fxDurationFor(skillId),
      fromX: tx, fromZ: tz, toX: tx, toZ: tz,
    });
  }

  // avança os quadros do efeito (parado no alvo) e o remove no fim; encara a câmera
  private updateProjectiles(now: number) {
    if (this.projectiles.length === 0) return;
    const cx = this.camera.position.x, cz = this.camera.position.z;
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      const t = (now - p.born) / p.ms;
      if (t >= 1) {
        this.world.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mat.dispose();
        p.tex.dispose();
        this.projectiles.splice(i, 1);
        continue;
      }
      const frame = Math.min(p.frames - 1, Math.max(0, Math.floor(t * p.frames)));
      p.tex.offset.x = frame / p.frames;
      p.mesh.rotation.y = Math.atan2(cx - p.mesh.position.x, cz - p.mesh.position.z);
    }
  }

  // atualiza a janela de personagem com os atributos + vida/mana atuais
  // XP necessário pra passar do nível atual (curva suave)
  private nextXpMax(level: number): number {
    // curva por FAIXAS (cada nível aplica um fator sobre o custo anterior):
    //   nv1-5  → 1.40  (ritmo original; nv1→2 = 140, nv4→5 ≈ 384)
    //   nv6-10 → 1.20  (mais suave: o começo flui até o nv10)
    //   nv11-49→ 1.30  (progressão normal do meio-jogo)
    //   nv50+  → 1.45  (endgame endurece de verdade)
    const growth = (l: number): number =>
      l <= 5 ? 1.4 : l <= 10 ? 1.2 : l < 50 ? 1.3 : 1.45;
    let xp = 140; // custo de nv1→2
    for (let l = 2; l <= level; l++) xp *= growth(l);
    return Math.round(xp);
  }
  // ganha XP; sobe de nível (1 ponto de habilidade por nível) e recompensa.
  private gainXp(amount: number) {
    if (this.stats.level >= 100) return;
    this.stats.xp += amount;
    let gained = 0;
    while (this.stats.level < 100 && this.stats.xp >= this.stats.xpMax) {
      this.stats.xp -= this.stats.xpMax;
      this.stats.level++;
      this.stats.xpMax = this.nextXpMax(this.stats.level);
      gained++;
    }
    if (this.stats.level >= 100) this.stats.xp = 0;
    if (gained > 0) {
      // recupera vida/mana; concede 1 ponto de habilidade e 3 de atributo por nível
      this.playerHp = this.playerMaxHp;
      this.playerMp = this.playerMaxMp;
      this.unspent += gained * POINTS_PER_LEVEL;
      this.ui.setHealth(1, this.playerHp, this.playerMaxHp);
      this.ui.setMana(1, this.playerMp, this.playerMaxMp);
      this.ui.setSkillInfo(this.classId, skillPointsFor(this.stats.level)); // total = nível
      this.ui.levelUp(this.stats.level); // efeito garrafal "LEVEL UP!" + animação
    }
    this.refreshStats();
  }

  private refreshStats() {
    this.ui.setStats({
      level: this.stats.level,
      xp: this.stats.xp,
      xpMax: this.stats.xpMax,
      hp: this.playerHp,
      hpMax: this.playerMaxHp,
      mp: this.playerMp,
      mpMax: this.playerMaxMp,
      atk: this.stats.atk,
      def: this.stats.def,
      str: this.stats.str,
      dex: this.stats.dex,
      int: this.stats.int,
      gold: this.stats.gold,
      points: this.unspent,
      strMin: this.baseAttr.str,
      dexMin: this.baseAttr.dex,
      intMin: this.baseAttr.int,
      atkMag: this.atkWithBonus(this.sec.atkMag),
      crit: this.sec.crit,
      critDmg: this.sec.critDmg,
      precision: this.sec.precision,
      magRes: this.sec.magRes,
      evasion: this.sec.evasion,
      regen: this.sec.regen,
      classId: this.classId,
    });
    this.scheduleSave(); // nível/xp/ouro/atributos mudaram → agenda auto-save
  }

  // aplica dano ao jogador (o esqueleto revidou). kind: "phys" (golpe/flecha) mitiga
  // pela DEFESA; "mag" (orbe/magia) mitiga pela RESISTÊNCIA MÁGICA.
  private damagePlayer(n: number, kind: "phys" | "mag" = "phys") {
    if (this.playerHp <= 0) return;
    // EVASÃO (talento/atributo): chance de ESQUIVAR o golpe por completo
    if (this.sec.evasion > 0 && Math.random() * 100 < this.sec.evasion) {
      this.ui.floatText(window.innerWidth / 2, window.innerHeight * 0.54, "Esquiva!", "heal");
      return;
    }
    // MITIGAÇÃO por armadura: Defesa (físico) ou Resistência Mágica (mágico), com
    // retornos DECRESCENTES (armor/(armor+30), teto 72%) — recompensa equipamento e
    // builds resistentes sem nunca zerar o dano. Some com os buffs defensivos temporários.
    const armor = kind === "mag" ? this.sec.magRes : this.sec.def;
    const mitigation = Math.min(0.72, armor / (armor + 30));
    let reduced = n * (1 - mitigation) * (1 - this.buffDefReduc());
    // BLOQUEIO (talento): chance de aparar metade do golpe
    if (Math.random() < (this.passive.block ?? 0)) reduced *= 0.5;
    const taken = Math.max(1, Math.round(reduced));
    // SELO DE REVIVER ativo e o golpe seria FATAL → burla a morte uma vez: fica com
    // 1 de vida, ganha um escudo curto e consome o selo (Intervenção/Ressurreição).
    if (this.playerHp - taken <= 0 && performance.now() < this.reviveUntil) {
      this.reviveUntil = 0;
      this.playerHp = 1;
      this.buff = { atkMul: 1, defReduc: 0.7, until: performance.now() + 3000 }; // escudo curto
      this.recomputeDerived();
      this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
      this.refreshStats();
      this.ui.flashDamage();
      this.ui.playSfx("cast");
      this.ui.floatText(window.innerWidth / 2, window.innerHeight * 0.5, "Intervenção Divina!", "heal");
      return;
    }
    this.playerHp = Math.max(0, this.playerHp - taken);
    this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
    this.refreshStats();
    this.ui.flashDamage();
    this.ui.playSfx("hurt"); // baque de dano no jogador
    // dano sofrido pelo jogador: número vermelho no centro-baixo da tela
    this.ui.floatText(window.innerWidth / 2, window.innerHeight * 0.58, `-${taken}`, "player");
    if (this.playerHp <= 0) {
      this.reviveUntil = 0; // morreu de fato → o selo (se houver) já era
      // derrota: recompõe a vida e volta ao início da vila
      window.setTimeout(() => {
        this.playerHp = this.playerMaxHp;
        this.ui.setHealth(1, this.playerHp, this.playerMaxHp);
        this.refreshStats();
        const s = findStart();
        this.enterLocation("village", s.col, s.row, 0);
      }, 800);
    }
  }

  // fumaça saindo das chaminés das casas (planos macios que sobem e somem)
  private buildChimneySmoke() {
    const tex_ = this.smokeTex();
    const cols: [number, number][] = [
      [5, 5],
      [9, 5],
      [1, 9],
      [13, 9],
      [7, 5],
      [1, 7],
    ];
    for (const [c, r] of cols) {
      const puffs: THREE.Mesh[] = [];
      for (let i = 0; i < 4; i++) {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(1.4, 1.4),
          new THREE.MeshBasicMaterial({
            map: tex_,
            transparent: true,
            depthWrite: false,
            opacity: 0.0,
          }),
        );
        m.position.set(c * CELL + 0.4, WALL_H + ROOF_H, r * CELL);
        m.userData = { phase: (c * 3.1 + r * 1.7 + i * 1.3) % 4, baseX: c * CELL + 0.4, baseZ: r * CELL };
        this.world.add(m);
        this.smoke.push(m);
        puffs.push(m);
      }
    }
  }

  private smokeTex(): THREE.Texture {
    if (this._smokeTex) return this._smokeTex;
    const cv = document.createElement("canvas");
    cv.width = 64;
    cv.height = 64;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    g.addColorStop(0, "rgba(220,220,224,0.9)");
    g.addColorStop(1, "rgba(220,220,224,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    this._smokeTex = t;
    return t;
  }

  // portal de madeira que marca a saída do vilarejo rumo à floresta (ao sul)
  private buildVillageForestGate() {
    const g = findForestGate();
    const gx = g.col * CELL;
    const gz = g.row * CELL;
    const woodMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });

    // trilha de terra saindo da praça até o portão (sinaliza o caminho)
    const dirtMat = new THREE.MeshLambertMaterial({ map: tex.dirtPath(63) });
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);
    for (let dr = 0; dr <= 2; dr++) {
      const t = new THREE.Mesh(tileGeo, dirtMat);
      t.rotation.x = -Math.PI / 2;
      t.rotation.z = ((dr % 2) * Math.PI) / 2;
      t.position.set(gx, 0.02, (g.row - dr) * CELL);
      this.world.add(t);
    }

    // arco: dois montantes + travessa
    const grp = new THREE.Group();
    const postGeo = new THREE.BoxGeometry(0.36, 3.4, 0.36);
    for (const s of [-1.5, 1.5]) {
      const p = new THREE.Mesh(postGeo, woodMat);
      p.position.set(s, 1.7, 0);
      grp.add(p);
    }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.36, 0.4), woodMat);
    beam.position.set(0, 3.35, 0);
    grp.add(beam);
    // mãos-francesas (reforços diagonais)
    for (const s of [-1, 1]) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 0.16), woodMat);
      brace.position.set(s * 1.05, 3.0, 0);
      brace.rotation.z = s * (Math.PI / 4);
      grp.add(brace);
    }
    // placa "Floresta" pendurada na travessa
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 0.6),
      new THREE.MeshBasicMaterial({
        map: tex.signText("Floresta"),
        transparent: true,
        side: THREE.DoubleSide,
      }),
    );
    label.position.set(0, 2.72, 0);
    label.rotation.y = Math.PI; // texto virado p/ o vilarejo (quem se aproxima)
    grp.add(label);
    // correntinhas da placa
    const chainMat = new THREE.MeshLambertMaterial({ color: 0x3a3a3a });
    for (const s of [-0.7, 0.7]) {
      const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 5), chainMat);
      ch.position.set(s, 3.05, 0);
      grp.add(ch);
    }
    grp.position.set(gx, 0, gz);
    this.world.add(grp);

    // trilha continua p/ o sul + paredão de árvores ao fundo: dá a perspectiva
    // da floresta pra onde o jogador vai (em vez de só neblina/vazio).
    const grassMat = new THREE.MeshLambertMaterial({ map: tex.grass(61) });
    (grassMat.map as THREE.Texture).repeat.set(8, 5);
    const gpatch = new THREE.Mesh(new THREE.PlaneGeometry(8 * CELL, 5 * CELL), grassMat);
    gpatch.rotation.x = -Math.PI / 2;
    gpatch.position.set(gx, -0.02, (g.row + 2.5) * CELL);
    this.world.add(gpatch);
    for (let ds = 1; ds <= 3; ds++) {
      const t = new THREE.Mesh(tileGeo, dirtMat);
      t.rotation.x = -Math.PI / 2;
      t.rotation.z = ((ds % 2) * Math.PI) / 2;
      t.position.set(gx, 0.02, (g.row + ds) * CELL);
      this.world.add(t);
    }
    this.buildTreelineBackdrop(gx, (g.row + 3.4) * CELL, Math.PI);
  }

  // materiais dos aglomerados (procedural-first: invisível até a arte carregar),
  // cada um com seu aspecto próprio
  private makeClusterMats(): { mat: THREE.MeshLambertMaterial; aspect: number }[] {
    return CLUSTER_ART.map((c) => {
      const mat = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
      this.loadArt(c.url, (t) => {
        mat.map = t;
        mat.alphaTest = 0.35;
        mat.opacity = 1;
        mat.needsUpdate = true;
      });
      return { mat, aspect: c.aspect };
    });
  }

  // paredão de árvores (aglomerado) como pano de fundo, virado p/ o jogador
  private buildTreelineBackdrop(cx: number, z: number, roty: number) {
    if (CLUSTER_ART.length === 0) return;
    const cm = this.makeClusterMats();
    const h = 13;
    let x = cx - h * 1.9; // começa à esquerda e encaixa os aglomerados
    for (let i = 0; i < 3; i++) {
      const pick = cm[i % cm.length];
      const w = h * pick.aspect;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), pick.mat);
      m.position.set(x + w / 2, h / 2 - 1, z);
      m.rotation.y = roty;
      if (i === 1) m.scale.x = -1;
      this.world.add(m);
      x += w * 0.92;
    }
  }

  // ---------------------------------------------- montanha (canto noroeste)
  private buildMountain() {
    // material de ardósia FRIA (tinte azul-acinzentado). Textura tileada p/ mais
    // detalhe nas faces grandes. 3 tons (claro/médio/escuro) p/ quebrar a monotonia.
    const rockTex = tex.rock(41);
    rockTex.wrapS = rockTex.wrapT = THREE.RepeatWrapping;
    const mkRock = (hex: number) => {
      const t = rockTex.clone();
      t.needsUpdate = true;
      t.repeat.set(1.6, 2.2); // tila as bandas de estrato ao longo da face
      // emissivo BAIXO: nunca esmaga p/ preto na sombra (mantém o detalhe de ardósia)
      return new THREE.MeshLambertMaterial({ map: t, color: new THREE.Color(hex), emissive: new THREE.Color(0x1a1e25) });
    };
    const rockMats = [mkRock(0xc2cad8), mkRock(0xa6aebd), mkRock(0x8b93a2)];
    const rockOf = (c: number, r: number) => rockMats[Math.floor(this.mHash(c, r, 9) * rockMats.length) % rockMats.length];
    // canto da montanha (mais alto lá) p/ dar silhueta de morro
    let cornerC = COLS;
    let cornerR = ROWS;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (cellAt(c, r) === "mountain") {
          cornerC = Math.min(cornerC, c);
          cornerR = Math.min(cornerR, r);
        }
    const heightAt = (c: number, r: number) => {
      const dc = c - cornerC;
      const dr = r - cornerR;
      const dist = Math.sqrt(dc * dc + dr * dr);
      return Math.max(WALL_H + 2.5, WALL_H + 11 - dist * 1.7 + this.mHash(c, r) * 2);
    };
    // uma célula "de borda" faz fronteira com a praça (rua) → recebe entulho/lascas
    const bordersStreet = (c: number, r: number) =>
      DIRS.some(([dc, dr]) => cellAt(c + dc, r + dr) === "street");
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const k = cellAt(c, r);
        const dungeon = k === "tunnel" || k === "stairs";
        if (k !== "mountain" && !dungeon) continue;
        const height = heightAt(c, r);
        // a rocha do túnel começa acima do teto (a passagem é escavada na rocha)
        const y0 = dungeon ? TUNNEL_H : 0;
        const bh = height - y0;
        if (bh <= 0.2) continue;
        const mat = rockOf(c, r);
        const box = new THREE.Mesh(new THREE.BoxGeometry(CELL, bh, CELL), mat);
        box.position.set(c * CELL, y0 + bh / 2, r * CELL);
        this.world.add(box);
        // blocos menores no topo p/ contorno irregular (pico)
        if (!dungeon && this.mHash(c, r, 2) > 0.35) {
          const s = 1.6 + this.mHash(c, r, 3) * 1.8;
          const chunk = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), rockOf(c, r));
          chunk.position.set(
            c * CELL + (this.mHash(c, r, 4) - 0.5) * 2.4,
            height + s * 0.25,
            r * CELL + (this.mHash(c, r, 5) - 0.5) * 2.4,
          );
          chunk.rotation.set(this.mHash(c, r, 7) * 0.5, this.mHash(c, r, 6) * Math.PI, this.mHash(c, r, 8) * 0.4);
          this.world.add(chunk);
        }
        // LASCAS protuberantes na FACE voltada p/ a praça — quebram o "slab" chapado.
        // Só nas células de borda (fazem fronteira com a rua).
        if (!dungeon && bordersStreet(c, r)) {
          for (const [dc, dr] of DIRS) {
            if (cellAt(c + dc, r + dr) !== "street") continue;
            const nSlabs = 2 + Math.floor(this.mHash(c, r, dc * 3 + dr) * 2);
            for (let i = 0; i < nSlabs; i++) {
              const h1 = 2 + this.mHash(c, r, i + 20) * (bh * 0.55);
              const w1 = 1 + this.mHash(c, r, i + 30) * 1.4;
              const d1 = 0.7 + this.mHash(c, r, i + 40) * 0.9;
              const slab = new THREE.Mesh(new THREE.BoxGeometry(w1, h1, d1), rockOf(c + i, r));
              // encosta na face + projeta um pouco p/ a rua; espalha ao longo da face
              const along = (this.mHash(c, r, i + 50) - 0.5) * (CELL * 0.7);
              const px = c * CELL + dc * (CELL / 2 + d1 * 0.25) + (dc === 0 ? along : 0);
              const pz = r * CELL + dr * (CELL / 2 + d1 * 0.25) + (dr === 0 ? along : 0);
              slab.position.set(px, h1 / 2, pz);
              slab.rotation.set((this.mHash(c, r, i + 60) - 0.5) * 0.4, this.mHash(c, r, i + 70) * Math.PI, (this.mHash(c, r, i + 80) - 0.5) * 0.5);
              this.world.add(slab);
            }
            // ENTULHO no pé: pedregulhos soltos na beira da praça
            const nRub = 1 + Math.floor(this.mHash(c, r, 90 + dc + dr) * 3);
            for (let i = 0; i < nRub; i++) {
              const rs = 0.32 + this.mHash(c, r, i + 100) * 0.5;
              const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), rockOf(c + i + 1, r));
              const along = (this.mHash(c, r, i + 110) - 0.5) * (CELL * 0.85);
              const out = CELL / 2 + 0.15 + this.mHash(c, r, i + 120) * 0.5;
              const px = c * CELL + dc * out + (dc === 0 ? along : 0);
              const pz = r * CELL + dr * out + (dr === 0 ? along : 0);
              rock.position.set(px, rs * 0.55, pz);
              rock.rotation.set(this.mHash(c, r, i + 130) * Math.PI, this.mHash(c, r, i + 140) * Math.PI, this.mHash(c, r, i + 150) * Math.PI);
              this.world.add(rock);
            }
          }
        }
      }
  }

  private mHash(a: number, b: number, s = 0): number {
    const v = Math.sin(a * 41.3 + b * 17.7 + s * 7.13) * 9871.2;
    return v - Math.floor(v);
  }

  // barris que só decoram: nunca bloqueiam passagem nem ficam na frente de portas
  private buildBarrels(
    mat: THREE.Material,
    doorFaces: Set<string>,
    hash: (a: number, b: number, s?: number) => number,
  ) {
    const geo = new THREE.CylinderGeometry(0.4, 0.34, 1.05, 14);
    const lid = new THREE.CylinderGeometry(0.41, 0.41, 0.08, 14);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (cellAt(c, r) !== "barrel") continue;
        const walls = DIRS.filter(([dc, dr]) => cellAt(c + dc, r + dr) === "building");
        if (walls.length === 0) continue;
        // prefere uma parede sem porta
        const wall =
          walls.find(([dc, dr]) => !doorFaces.has(`${c + dc},${r + dr},${-dc},${-dr}`)) ||
          walls[0];
        const [dc, dr] = wall;
        // recuo perpendicular p/ o canto (encaixa contra outra parede se houver)
        let px = 0;
        let pz = 0;
        const shift = 1.05;
        if (dc !== 0) {
          const zdir =
            cellAt(c, r - 1) === "building" ? -1 : cellAt(c, r + 1) === "building" ? 1 : hash(c, r) > 0 ? 1 : -1;
          pz = zdir * shift;
        } else {
          const xdir =
            cellAt(c - 1, r) === "building" ? -1 : cellAt(c + 1, r) === "building" ? 1 : hash(c, r) > 0 ? 1 : -1;
          px = xdir * shift;
        }
        const bx = c * CELL + dc * (CELL / 2 - 0.5) + px;
        const bz = r * CELL + dr * (CELL / 2 - 0.5) + pz;
        const grp = new THREE.Group();
        const b = new THREE.Mesh(geo, mat);
        b.position.y = 0.52;
        grp.add(b);
        const top = new THREE.Mesh(lid, mat);
        top.position.y = 1.05;
        grp.add(top);
        // às vezes um segundo barril menor ao lado
        if (hash(c, r, 5) > 0.15) {
          const b2 = new THREE.Mesh(geo, mat);
          b2.scale.set(0.82, 0.82, 0.82);
          b2.position.set(-px * 0.5 - dc * 0.1, 0.42, -pz * 0.5 - dr * 0.1);
          grp.add(b2);
        }
        grp.position.set(bx, 0, bz);
        this.world.add(grp);
      }
  }

  // textura ANIMADA do GIF do portal (compartilhada por todos os planos de portal).
  // O <img> do GIF anima os frames em memória; cada tick fazemos needsUpdate → o
  // THREE re-sobe o frame atual. Mistura ADITIVA → o fundo preto do GIF some e só
  // o vórtice roxo brilha.
  private portalTexture(): THREE.Texture {
    if (this.portalTex) return this.portalTex;
    const img = document.createElement("img");
    img.src = portalGifUrl;
    img.decoding = "async";
    img.style.cssText = "position:fixed;left:-20px;top:-20px;width:2px;height:2px;opacity:0.01;pointer-events:none;z-index:-1";
    document.body.appendChild(img); // anexado (oculto) p/ o navegador animar o GIF
    const t = new THREE.Texture(img);
    t.colorSpace = THREE.SRGBColorSpace;
    // GIF 500x375 com fundo TRANSPARENTE: a elipse do portal ocupa ~toda a altura
    // e ~60% da largura (margem transparente só nas laterais). Recorta pra bbox da
    // elipse (UV) p/ ela preencher o plano de borda a borda.
    t.offset.set(0.26, 0.02);
    t.repeat.set(0.48, 0.96);
    img.onload = () => { t.needsUpdate = true; };
    this.portalImg = img; this.portalTex = t;
    return t;
  }
  // plano do vórtice do portal (billboard chapado, vertical), registrado p/ animar.
  // fundo transparente → blending NORMAL (alpha), não aditivo.
  private portalPlane(w = 2.4, h = 3.0): THREE.Mesh {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        map: this.portalTexture(), transparent: true, alphaTest: 0.02,
        depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
      }),
    );
    this.portalPlanes.push(m);
    return m;
  }

  // WAYPOINT da cidade (estilo PoE/Diablo): plataforma de pedra ELEVADA + ARCO de
  // pedra (o mesmo PNG dos portões da masmorra). Quando ATIVO, o vão do arco é
  // preenchido pelo vórtice do portal. Ocupa a antiga célula do poço.
  private buildWaypoint() {
    const wx = WELL.c * CELL, wz = WELL.r * CELL;
    this.blocked.add(`${WELL.c},${WELL.r}`);
    const grp = new THREE.Group();
    const stoneMat = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    const stoneDk = new THREE.MeshLambertMaterial({ map: tex.stone(31), color: new THREE.Color(0x9a9384) });
    // PLATAFORMA elevada em 2 degraus (dais) — o "chão erguido" do waypoint.
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.35, 0.28, 32), stoneDk);
    base.position.y = 0.14; grp.add(base);
    const tier = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.85, 0.26, 32), stoneMat);
    tier.position.y = 0.40; grp.add(tier);
    const rim = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.72, 32),
      new THREE.MeshLambertMaterial({ color: 0x8d8377, side: THREE.DoubleSide }));
    rim.rotation.x = -Math.PI / 2; rim.position.y = 0.54; grp.add(rim);
    // ARCO de pedra SEM as grades (só a moldura dos portões) em pé sobre a
    // plataforma, dupla face — o vão fica livre p/ o vórtice preencher.
    const arch = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 4.1), this.decalMat(decGateFrameUrl, 0.5));
    arch.position.set(0, 0.53 + 4.1 / 2, 0); grp.add(arch);
    // VÓRTICE do portal preenchendo o VÃO do arco: base quase no chão da plataforma,
    // topo na curva do arco, laterais nas bordas internas de pedra.
    if (this.cityPortalActive) {
      const PW = 2.9, PH = 3.5, PB = 0.5; // largura, altura, base (y do pé do portal)
      const vortex = this.portalPlane(PW, PH);
      vortex.position.set(0, PB + PH / 2, 0.04); grp.add(vortex);
      this.glowLight(wx, 2.0, wz, 0x3fa8ff, 2.6, 9); // brilho AZUL do portal
    }
    grp.position.set(wx, 0, wz);
    this.world.add(grp);
  }

  // abre um PORTAL TEMPORÁRIO de retorno na cidade (uso único), perto do waypoint —
  // o par do Pergaminho usado na masmorra. Interagir com ele volta à masmorra.
  private openTempCityPortal() {
    if (this.tempPortal) return;
    // célula livre adjacente ao waypoint (à frente, no eixo sul da praça)
    const cand: [number, number][] = [[WELL.c, WELL.r + 1], [WELL.c - 1, WELL.r], [WELL.c + 1, WELL.r], [WELL.c, WELL.r - 1]];
    const spot = cand.find(([c, r]) => this.canWalk(c, r) && !this.blocked.has(`${c},${r}`)) ?? [WELL.c, WELL.r + 1];
    const [pc, pr] = spot;
    const grp = new THREE.Group();
    const vortex = this.portalPlane(2.1, 2.9);
    vortex.position.y = 0.1 + 2.9 / 2; grp.add(vortex);
    grp.position.set(pc * CELL, 0, pr * CELL);
    this.world.add(grp);
    this.glowLight(pc * CELL, 1.6, pr * CELL, 0x3fa8ff, 2.0, 7);
    this.tempPortal = grp;
    this.tempPortalCell = { c: pc, r: pr };
  }
  // fecha e descarta o portal temporário de retorno.
  private closeTempCityPortal() {
    if (this.tempPortal) { this.world.remove(this.tempPortal); this.tempPortal = undefined; }
    this.tempPortalCell = undefined;
  }

  // túnel da masmorra: chão/paredes/teto — MESMAS texturas de CAVERNA da dungeon
  // (a entrada tem que casar com o interior da masmorra) + escada descendo + tochas
  private buildTunnel() {
    const floorMat = new THREE.MeshLambertMaterial({
      map: tex.caveFloor(),
      side: THREE.DoubleSide,
    });
    const wallMat = new THREE.MeshLambertMaterial({
      map: tex.caveWall(),
      side: THREE.DoubleSide,
      // a parede da montanha (ardósia) é coplanar com a parede do túnel na fronteira
      // das células → z-fighting. polygonOffset puxa a rocha do túnel p/ a frente no
      // z-buffer, então a MESMA rocha da masmorra sempre vence (some a ardósia azulada).
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -2,
    });
    const ceilMat = new THREE.MeshLambertMaterial({
      map: tex.caveCeil(),
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -2,
    });
    // degraus na MESMA rocha do chão da masmorra (caveFloor) — pedra de verdade,
    // não a antiga pedra clara que lembrava madeira.
    const stairMat = new THREE.MeshLambertMaterial({ map: tex.caveFloor() });
    let mouth: [number, number] | null = null;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (!isDungeon(c, r)) continue;
        const cx = c * CELL;
        const cz = r * CELL;
        const stairs = cellAt(c, r) === "stairs";
        // teto e chão de laje — a escada (túnel descendente) cria os SEUS próprios
        if (!stairs) {
          const ceil = new THREE.Mesh(new THREE.PlaneGeometry(CELL, CELL), ceilMat);
          ceil.rotation.x = Math.PI / 2;
          ceil.position.set(cx, TUNNEL_H, cz);
          this.world.add(ceil);
          const fl = new THREE.Mesh(new THREE.PlaneGeometry(CELL, CELL), floorMat);
          fl.rotation.x = -Math.PI / 2;
          fl.position.set(cx, 0.03, cz);
          this.world.add(fl);
        }
        // paredes onde encosta rocha/casa (o poço da escada cria as suas próprias)
        for (const [dc, dr] of DIRS) {
          const k = cellAt(c + dc, r + dr);
          if (k === "street") mouth = [c, r]; // boca do túnel
          else if ((k === "mountain" || k === "building") && !stairs)
            this.addWall(cx, cz, dc, dr, 0, TUNNEL_H, wallMat);
        }
        if (stairs) this.buildStairs(c, r, cx, cz, wallMat, stairMat, ceilMat);
      }
    // tochas na boca + luz quente tremeluzente
    if (mouth) {
      const [mc, mr] = mouth;
      const cx = mc * CELL;
      const cz = mr * CELL;
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb24a });
      for (const s of [-1, 1]) {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 1.1, 8),
          new THREE.MeshLambertMaterial({ color: 0x2a1c10 }),
        );
        post.position.set(cx + s * (CELL / 2 - 0.25), 1.9, cz);
        this.world.add(post);
        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), flameMat);
        flame.position.set(cx + s * (CELL / 2 - 0.25), 2.55, cz);
        this.world.add(flame);
      }
      const light = new THREE.PointLight(0xffa040, 7, 16, 2);
      light.position.set(cx, 2.4, cz + 0.5);
      this.world.add(light);
      this.flames.push({ light, base: 6 });
    }
  }

  // luz da masmorra: bem escura (só ambiente fraco; as tochas fazem o resto)
  private addDungeonLights(boss = false, a2 = false) {
    // masmorra-labirinto é grande e as tochas (limitadas) se espalham → sobe a luz
    // ambiente base p/ os corredores sem tocha não ficarem pretos (visível como o
    // Arcmaze), mantendo a paleta fria/pedra.
    // PBR + normal maps: fill BAIXO (senão o relevo some), hemisfério forte (céu frio /
    // chão quente → sombreia o relevo das pedras) e uma luz-chave quente p/ realces.
    // As tochas (point lights quentes) criam as poças de luz esculpindo a alvenaria.
    // Com tone mapping ACES, as áreas iluminadas ainda "estouram" claras (tipo Arcmaze).
    // near BEM iluminado (o fog escuro é que engole o longe → visão limitada). Ambiente
    // e hemisfério mais altos, sem matar o relevo (o normal map ainda pega o hemisfério
    // e as tochas). Luz-chave quente p/ realces.
    // 3º andar (cripta do chefe): ambiente/hemisfério puxados p/ o VERMELHO-SANGUE,
    // dando o clima de bioma diferente (perigo) sem trocar as texturas.
    // ATO II: ambiente/hemisfério puxados p/ o CIANO-FRIO (bioma fúngico afogado),
    // luz-chave esverdeada — clima de caverna submersa em vez da pedra quente.
    this.world.add(new THREE.AmbientLight(
      a2 ? (boss ? 0x5f9aa0 : 0x6fa6ad) : (boss ? 0xa6707a : 0x8f98a6), boss ? 0.95 : 1.0));
    this.world.add(new THREE.HemisphereLight(
      a2 ? 0x7fd4d0 : (boss ? 0xd89090 : 0xc4ccd8),
      a2 ? 0x14322e : (boss ? 0x4a2016 : 0x52402a), 1.45));
    const key = new THREE.DirectionalLight(
      a2 ? 0x9fe6dc : (boss ? 0xff9a72 : 0xffd7a2), 0.6);
    key.position.set(7, 13, 5);
    this.world.add(key);
    // TOCHA do herói: poça de luz quente que acompanha o jogador (o tick move ela)
    // → o entorno imediato fica sempre visível, mantendo o breu ao longe.
    this.playerTorch = new THREE.PointLight(0xffc07a, 2.6, 17, 2);
    this.playerTorch.position.set(this.col * CELL, EYE_H, this.row * CELL);
    this.world.add(this.playerTorch);
  }

  private addShowcaseLights() {
    // ambiente BAIXO (recinto fechado de rocha) — a luz vem de CIMA (o óculo aberto
    // do terraço) e das tochas da escada.
    this.world.add(new THREE.AmbientLight(0x6a7182, 0.55));
    this.world.add(new THREE.HemisphereLight(0x9fb0c8, 0x2a2620, 0.5));
    // FEIXE de cima sobre o terraço (aberto só no teto): desce reto sobre a estátua
    const beam = new THREE.DirectionalLight(0xdfeaff, 1.3);
    beam.position.set(SHRINE_CX, HELIX_TOP + 30, SHRINE_CZ);
    beam.target.position.set(SHRINE_CX, HELIX_TOP, SHRINE_CZ);
    this.world.add(beam.target);
    this.world.add(beam);
  }

  // textura suave (dot radial) p/ as partículas
  private moteTex(): THREE.Texture {
    if (this.moteTexCache) return this.moteTexCache;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 32;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    const t = new THREE.CanvasTexture(cv);
    this.moteTexCache = t;
    return t;
  }

  // nuvem de partículas flutuantes num volume (poeira/esporos)
  private spawnMotes(
    cx: number, cz: number, rx: number, rz: number,
    y0: number, y1: number, count: number, color: number, size: number, sway = 0.0016,
  ) {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = cx + (Math.random() - 0.5) * rx;
      pos[i * 3 + 1] = y0 + Math.random() * (y1 - y0);
      pos[i * 3 + 2] = cz + (Math.random() - 0.5) * rz;
      sp[i] = 0.12 + Math.random() * 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({
      color, size, map: this.moteTex(), transparent: true, opacity: 0.72,
      depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending,
    });
    const p = new THREE.Points(g, m);
    p.renderOrder = 8;
    this.world.add(p);
    this.motes.push({ pts: p, sp, y0, y1, sway });
  }

  // NÉVOA POR ALTURA (shader): tinge o material p/ a cor da névoa conforme o Y de
  // MUNDO sobe (limpo em yClear, névoa CHEIA em yFull). Assim as paredes se
  // DISSOLVEM totalmente na névoa antes do topo — sem "linha" marcada no fim delas.
  private applyHeightFog(mat: THREE.Material, yClear: number, yFull: number, color: number) {
    const col = new THREE.Color(color);
    (mat as THREE.Material & { onBeforeCompile: (s: THREE.WebGLProgramParametersWithUniforms) => void }).onBeforeCompile = (shader) => {
      shader.uniforms.hfColor = { value: col };
      shader.uniforms.hfClear = { value: yClear };
      shader.uniforms.hfFull = { value: yFull };
      shader.vertexShader = "varying float vWorldY;\n" + shader.vertexShader.replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\n  vWorldY = (modelMatrix * vec4(transformed, 1.0)).y;",
      );
      shader.fragmentShader =
        "uniform vec3 hfColor;\nuniform float hfClear;\nuniform float hfFull;\nvarying float vWorldY;\n" +
        shader.fragmentShader.replace(
          "#include <fog_fragment>",
          "#include <fog_fragment>\n  float hf = clamp((vWorldY - hfClear) / (hfFull - hfClear), 0.0, 1.0);\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, hfColor, hf);",
        );
    };
    mat.needsUpdate = true;
  }

  // textura macia (fumaça) — mancha radial bem difusa
  private softPuffTex(): THREE.Texture {
    if (this.softPuffCache) return this.softPuffCache;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 128;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.5, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(cv);
    this.softPuffCache = t;
    return t;
  }

  // textura da cúpula de névoa: nuvens macias (fbm), OPACAS no zênite e sumindo
  // até transparente no horizonte → vira "céu de fumaça", sem fundo chapado.
  private cloudDomeTex(): THREE.Texture {
    if (this.cloudTexCache) return this.cloudTexCache;
    const W = 512, H = 256;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d")!;
    const img = ctx.createImageData(W, H);
    for (let y = 0; y < H; y++) {
      const v = y / (H - 1); // 0 = topo da imagem (zênite), 1 = base (horizonte)
      const vert = Math.min(1, Math.max(0, (0.7 - v) / 0.7)); // 1 no topo, 0 em v≥0.7
      for (let x = 0; x < W; x++) {
        const n = this.fbm(x * 0.02, y * 0.05, 3.3); // padrão de nuvem macio
        const cloud = Math.min(1, Math.max(0, (n - 0.34) * 2.3));
        let a = vert * (0.4 + 0.6 * cloud);
        if (v < 0.14) a = Math.max(a, (0.14 - v) / 0.14); // zênite bem cheio
        const i = (y * W + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
        img.data[i + 3] = Math.round(Math.min(1, a) * 255);
      }
    }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(cv);
    t.wrapS = THREE.RepeatWrapping;
    t.flipY = false; // topo da imagem (denso) fica no polo de CIMA da esfera
    this.cloudTexCache = t;
    return t;
  }

  // CÉU PROCEDURAL (shader): gradiente por ETAPA DO DIA + sol + lua + estrelas,
  // tudo calculado em GLSL e dirigido por uniforms que mudam com o ciclo. Emite
  // cor LINEAR (o OutputPass faz tonemap/sRGB e o bloom acende sol/lua/estrelas).
  private addSkyDome(cx = WELL.c * CELL, cz = WELL.r * CELL) {
    const geo = new THREE.SphereGeometry(CELL * 24, 48, 32);
    const u = {
      uTop: { value: new THREE.Color(0.05, 0.06, 0.14) },
      uHor: { value: new THREE.Color(0.10, 0.12, 0.22) },
      uSun: { value: new THREE.Color(1.0, 0.7, 0.4) },
      uSunDir: { value: new THREE.Vector3(0, 0.3, -1).normalize() },
      uMoonDir: { value: new THREE.Vector3(0, 0.6, 1).normalize() },
      uSunI: { value: 0.0 },
      uStarI: { value: 1.0 },
      uMoonI: { value: 1.0 },
      uTime: { value: 0.0 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: u,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      toneMapped: true,
      vertexShader:
        "varying vec3 vDir; void main(){ vDir = normalize(position);" +
        " gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: SKY_FRAG,
    });
    const dome = new THREE.Mesh(geo, mat);
    dome.renderOrder = -10; // fundo
    dome.position.set(cx, 0, cz);
    this.world.add(dome);
    this.fogDome = dome;
    this.skyUniforms = u;
  }

  // interpola os keyframes das ETAPAS DO DIA no instante t (0..1)
  private sampleSky(t: number) {
    const P = Game.SKY_PHASES;
    let a = P[0], b = P[P.length - 1];
    for (let i = 0; i < P.length - 1; i++)
      if (t >= P[i].t && t <= P[i + 1].t) { a = P[i]; b = P[i + 1]; break; }
    const f = (t - a.t) / ((b.t - a.t) || 1);
    const L = (x: number[], y: number[]) =>
      [x[0] + (y[0] - x[0]) * f, x[1] + (y[1] - x[1]) * f, x[2] + (y[2] - x[2]) * f] as [number, number, number];
    return {
      top: L(a.top, b.top), hor: L(a.hor, b.hor), sun: L(a.sun, b.sun),
      sunI: a.sunI + (b.sunI - a.sunI) * f, starI: a.starI + (b.starI - a.starI) * f,
      name: f < 0.5 ? a.name : b.name,
    };
  }

  // textura de FUMAÇA real: mechas/tendões irregulares (ruído fbm) com borda macia —
  // parece um chumaço de fumaça, não um borrão redondo. Várias variantes p/ variar.
  private fogSmokeTex(variant: number): THREE.Texture {
    if (this.smokeTexes[variant]) return this.smokeTexes[variant];
    const S = 128;
    const cv = document.createElement("canvas");
    cv.width = cv.height = S;
    const ctx = cv.getContext("2d")!;
    const img = ctx.createImageData(S, S);
    const off = variant * 17.3;
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const nx = x / S - 0.5, ny = y / S - 0.5;
        const d = Math.sqrt(nx * nx + ny * ny) * 2; // 0 centro; 1 no círculo inscrito
        // queda radial FORTE → alpha 0 bem antes da borda quadrada (blob REDONDO,
        // sem cantos): nenhum "quadrado" aparece por baixo do sprite.
        const radial = Math.max(0, 1 - d);
        const soft = radial * radial;
        const n = this.fbm(x * 0.05 + off, y * 0.05 + off, variant * 4.7); // 0..1 mechas suaves
        const a = soft * (0.45 + 0.55 * n);
        const i = (y * S + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
        img.data[i + 3] = Math.round(Math.min(1, a) * 255);
      }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(cv);
    this.smokeTexes[variant] = t;
    return t;
  }

  // FUMAÇA que se MOVE: sprites macios grandes que derivam devagar pelo cenário,
  // dando a sensação de neblina viva (e quebrando qualquer "borda" reta).
  private spawnFogPuffs(
    cx: number, cz: number, count: number, yLo: number, yHi: number, radius: number,
    cLo: number, cHi: number, rMin = 0.3, rMax = 1.1, opBase = 0.16, sizeLo = 8, sizeHi = 18,
  ) {
    const loC = new THREE.Color(cLo), hiC = new THREE.Color(cHi);
    for (let i = 0; i < count; i++) {
      const tint = loC.clone().lerp(hiC, Math.random()); // brilho variado (luz/sombra)
      const m = new THREE.SpriteMaterial({
        map: this.fogSmokeTex(i % 4), color: tint, transparent: true,
        opacity: opBase, depthWrite: false, fog: false, rotation: Math.random() * Math.PI * 2,
      });
      const s = new THREE.Sprite(m);
      const sc = sizeLo + Math.random() * (sizeHi - sizeLo);
      s.scale.set(sc, sc, 1);
      const ang = Math.random() * Math.PI * 2, rr = radius * (rMin + Math.random() * (rMax - rMin));
      const bx = cx + Math.cos(ang) * rr, bz = cz + Math.sin(ang) * rr;
      const by = yLo + Math.random() * (yHi - yLo);
      s.position.set(bx, by, bz);
      s.renderOrder = 9;
      this.world.add(s);
      this.fogPuffs.push({
        s, bx, bz, by, ph: Math.random() * 6.28,
        rad: 1.2 + Math.random() * 2.6, baseOp: opBase * (0.7 + Math.random() * 0.6),
        rotSp: (Math.random() - 0.5) * 0.04, rise: 0.3 + Math.random() * 0.7,
      });
    }
  }

  // constrói a TORRE DA ESPIRAL REDONDA: hélice de pedra subindo em torno de um
  // núcleo → corredor no topo → TERRAÇO ABERTO com grama, estátua e névoa. Tudo em
  // coordenadas de mundo (o movimento aqui é por estações, não em grade).
  private buildShowcase() {
    const CX = HELIX_CX, CZ = HELIX_CZ;
    const RI = HELIX_INNER, RO = HELIX_OUTER;
    const TOP_Y = HELIX_TOP;
    const WALL_H = TOP_Y + 32; // paredes ALTÍSSIMAS → o jogador nunca vê o topo faltando
    const FOGC = 0x7c8390;
    // dissolve BEM alto: as paredes sobem muito e só somem lá em cima na bruma.
    const yClear = TOP_Y + 4, yFull = TOP_Y + 26;

    // materiais de PEDRA LAVRADA (escada)
    const mkStone = (rx: number, ry: number, tint?: number) => {
      const m = tex.stone(31);
      m.wrapS = m.wrapT = THREE.RepeatWrapping;
      m.repeat.set(rx, ry);
      return new THREE.MeshLambertMaterial({ map: m, color: tint ?? 0xffffff, side: THREE.DoubleSide });
    };
    const stepMat = mkStone(1.4, 1.4);
    const riserMat = mkStone(1.4, 0.5, 0xc7c7c7);
    const shellMat = mkStone(1, 1); // UV por mundo (casca construída à mão, com porta)
    const coreMat = mkStone(5, 3, 0xb8b8b8);
    const corrFloorMat = mkStone(2, 2);
    const corrWallMat = mkStone(3, 2);
    // ROCHA de caverna (dungeon) p/ a MURALHA redonda do terraço (UV por mundo)
    const rockMap = tex.caveWall();
    rockMap.wrapS = rockMap.wrapT = THREE.RepeatWrapping;
    rockMap.repeat.set(1, 1); // as UVs já vêm em nº de telhas (mundo/4)
    const rockWallMat = new THREE.MeshLambertMaterial({ map: rockMap, side: THREE.DoubleSide });
    const grassMap = tex.grass(61);
    grassMap.wrapS = grassMap.wrapT = THREE.RepeatWrapping;
    grassMap.repeat.set(4, 4);
    const grassMat = new THREE.MeshLambertMaterial({ map: grassMap, side: THREE.DoubleSide });
    // paredes somem na bruma SÓ lá no alto → sem borda dura, sem topo visível
    for (const m of [shellMat, coreMat, stepMat, riserMat, rockWallMat]) this.applyHeightFog(m, yClear, yFull, FOGC);

    // helper: quad (2 triângulos) num array de posições/uv
    const addQuad = (pos: number[], uv: number[], idx: number[],
      a: number[], b: number[], c: number[], d: number[]) => {
      const n = pos.length / 3;
      pos.push(...a, ...b, ...c, ...d);
      uv.push(0, 0, 1, 0, 1, 1, 0, 1);
      idx.push(n, n + 1, n + 2, n, n + 2, n + 3);
    };

    // ---- HÉLICE: degraus em leque + espelhos (risers) ----
    const helix = STATIONS.slice(0, HELIX_STEPS + 1); // estações da hélice (0..STEPS)
    const ang = (s: { x: number; z: number }) => Math.atan2(s.z - CZ, s.x - CX);
    const dth = ang(helix[1]) - ang(helix[0]);
    const sPos: number[] = [], sUv: number[] = [], sIdx: number[] = [];
    const rPos: number[] = [], rUv: number[] = [], rIdx: number[] = [];
    const P = (th: number, rad: number, y: number) => [CX + rad * Math.cos(th), y, CZ + rad * Math.sin(th)];
    for (let i = 0; i < helix.length; i++) {
      const th = ang(helix[i]), y = helix[i].y;
      const a0 = th - dth / 2, a1 = th + dth / 2;
      // piso do degrau (leque INNER→OUTER)
      addQuad(sPos, sUv, sIdx, P(a0, RI, y), P(a1, RI, y), P(a1, RO, y), P(a0, RO, y));
      // espelho até o degrau anterior (na aresta de trás)
      if (i > 0) {
        const yp = helix[i - 1].y;
        addQuad(rPos, rUv, rIdx, P(a0, RI, yp), P(a0, RO, yp), P(a0, RO, y), P(a0, RI, y));
      }
    }
    const mkMesh = (pos: number[], uv: number[], idx: number[], mat: THREE.Material) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      g.setIndex(idx); g.computeVertexNormals();
      const m = new THREE.Mesh(g, mat); this.world.add(m); return m;
    };
    mkMesh(sPos, sUv, sIdx, stepMat);
    mkMesh(rPos, rUv, rIdx, riserMat);

    // núcleo central (cilindro) + piso da base
    const core = new THREE.Mesh(new THREE.CylinderGeometry(RI, RI, TOP_Y, 32, 1, true), coreMat);
    core.position.set(CX, TOP_Y / 2, CZ); this.world.add(core);
    const base = new THREE.Mesh(new THREE.CircleGeometry(RO, 40), stepMat);
    base.rotation.x = -Math.PI / 2; base.position.set(CX, 0.02, CZ); this.world.add(base);
    // CASCA externa (poço) ALTÍSSIMA, construída à mão com uma PORTA na altura do
    // corredor → a casca alta não fecha mais a passagem que liga a torre ao terraço.
    // Ângulo da porta = onde o corredor (z=CORR_Z) cruza a casca (lado oeste da torre).
    const doorAng = Math.atan2(CORR_Z - CZ, -Math.sqrt(Math.max(0, RO * RO - (CORR_Z - CZ) ** 2)));
    const doorHalf = 0.36, dyLo = TOP_Y - 1, dyHi = TOP_Y + 4.5; // vão só na faixa do corredor
    const angDiff = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
    const sA = 60;
    const bands: [number, number][] = [[0, dyLo], [dyLo, dyHi], [dyHi, WALL_H]];
    const shPos: number[] = [], shUv: number[] = [], shIdx: number[] = [];
    const arcT = (RO * 2 * Math.PI) / sA / 4;
    for (const [yb, yt] of bands) {
      const isDoorBand = yb === dyLo;
      for (let i = 0; i < sA; i++) {
        const a0 = (i / sA) * Math.PI * 2, a1 = ((i + 1) / sA) * Math.PI * 2;
        if (isDoorBand && angDiff((a0 + a1) / 2, doorAng) < doorHalf) continue; // PORTA
        const x0 = CX + RO * Math.cos(a0), z0 = CZ + RO * Math.sin(a0);
        const x1 = CX + RO * Math.cos(a1), z1 = CZ + RO * Math.sin(a1);
        const u0 = i * arcT, u1 = (i + 1) * arcT, n = shPos.length / 3;
        shPos.push(x0, yb, z0, x1, yb, z1, x1, yt, z1, x0, yt, z0);
        shUv.push(u0, yb / 4, u1, yb / 4, u1, yt / 4, u0, yt / 4);
        shIdx.push(n, n + 1, n + 2, n, n + 2, n + 3);
      }
    }
    const shellGeo = new THREE.BufferGeometry();
    shellGeo.setAttribute("position", new THREE.Float32BufferAttribute(shPos, 3));
    shellGeo.setAttribute("uv", new THREE.Float32BufferAttribute(shUv, 2));
    shellGeo.setIndex(shIdx); shellGeo.computeVertexNormals();
    this.world.add(new THREE.Mesh(shellGeo, shellMat));

    // ---- TERRAÇO de ROCHA + CORREDOR que ENCAIXA na muralha (porta) ----
    const SCX = SHRINE_CX, SCZ = SHRINE_CZ;
    const RW = SHRINE_RADIUS + 1.8; // raio da muralha de rocha
    const cw = 2.0, cCeil = 3.4; // corredor: meia-largura e altura do teto
    // CORREDOR (ponte de pedra): da torre até a muralha — termina EXATAMENTE nela
    // (overlap de 0.6 p/ dentro → sem fresta no encaixe), atravessando a porta.
    const cX1 = SCX + RW - 0.2, cLen = CORR_X0 - cX1, cMidX = (CORR_X0 + cX1) / 2;
    const cf = new THREE.Mesh(new THREE.PlaneGeometry(cLen, cw * 2), corrFloorMat);
    cf.rotation.x = -Math.PI / 2; cf.position.set(cMidX, TOP_Y + 0.02, CORR_Z); this.world.add(cf);
    for (const s of [-1, 1]) {
      const wl = new THREE.Mesh(new THREE.PlaneGeometry(cLen, cCeil), corrWallMat);
      wl.position.set(cMidX, TOP_Y + cCeil / 2, CORR_Z + s * cw); this.world.add(wl);
    }
    const cc = new THREE.Mesh(new THREE.PlaneGeometry(cLen, cw * 2), corrWallMat);
    cc.rotation.x = Math.PI / 2; cc.position.set(cMidX, TOP_Y + cCeil, CORR_Z); this.world.add(cc);
    // GRAMA (por célula + disco redondo encostando na muralha)
    const DR = RW;
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);
    for (const [tc, tr] of terraceCells()) {
      const g = new THREE.Mesh(tileGeo, grassMat);
      g.rotation.x = -Math.PI / 2; g.position.set(tc * CELL, TOP_Y + 0.02, tr * CELL); this.world.add(g);
    }
    const disc = new THREE.Mesh(new THREE.CircleGeometry(DR, 44), grassMat);
    disc.rotation.x = -Math.PI / 2; disc.position.set(SCX, TOP_Y + 0.05, SCZ); this.world.add(disc);
    // MURALHA redonda de ROCHA, ALTÍSSIMA, com uma PORTA (leste) que casa com a
    // largura do corredor e SÓ na altura dele (sólida acima → sem fenda por cima).
    const rDoorHalf = Math.asin(Math.min(0.98, cw / RW)) - 0.03; // rocha ENCOSTA nas paredes do corredor (sem fresta)
    const rSegs = 72, rYb = TOP_Y - 2, rDoorTop = TOP_Y + cCeil, rYt = TOP_Y - 2 + WALL_H;
    const arcTile = (RW * 2 * Math.PI) / rSegs / 4;
    const rBands: [number, number, boolean][] = [[rYb, rDoorTop, true], [rDoorTop, rYt, false]];
    const wPos: number[] = [], wUv: number[] = [], wIdx: number[] = [];
    for (const [yb, yt, isDoor] of rBands) {
      for (let i = 0; i < rSegs; i++) {
        const a0 = (i / rSegs) * Math.PI * 2, a1 = ((i + 1) / rSegs) * Math.PI * 2;
        const acN = Math.atan2(Math.sin((a0 + a1) / 2), Math.cos((a0 + a1) / 2));
        if (isDoor && Math.abs(acN) < rDoorHalf) continue; // PORTA (leste), só na altura do corredor
        const x0 = SCX + RW * Math.cos(a0), z0 = SCZ + RW * Math.sin(a0);
        const x1 = SCX + RW * Math.cos(a1), z1 = SCZ + RW * Math.sin(a1);
        const u0 = i * arcTile, u1 = (i + 1) * arcTile, n = wPos.length / 3;
        wPos.push(x0, yb, z0, x1, yb, z1, x1, yt, z1, x0, yt, z0);
        wUv.push(u0, yb / 4, u1, yb / 4, u1, yt / 4, u0, yt / 4);
        wIdx.push(n, n + 1, n + 2, n, n + 2, n + 3);
      }
    }
    const twall = new THREE.BufferGeometry();
    twall.setAttribute("position", new THREE.Float32BufferAttribute(wPos, 3));
    twall.setAttribute("uv", new THREE.Float32BufferAttribute(wUv, 2));
    twall.setIndex(wIdx); twall.computeVertexNormals();
    this.world.add(new THREE.Mesh(twall, rockWallMat));
    this.blocked.add(`${SHOW_STATUE.col},${SHOW_STATUE.row}`); // estátua bloqueia o centro
    // ESTÁTUA (placeholder): pedestal + monólito claro que brilha
    const sx = SHOW_STATUE_W.x, sz = SHOW_STATUE_W.z;
    const pedMat = new THREE.MeshLambertMaterial({ map: tex.caveFloor(), side: THREE.DoubleSide });
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.7, 16), pedMat);
    ped.position.set(sx, TOP_Y + 0.4, sz); this.world.add(ped);
    const paleMat = new THREE.MeshLambertMaterial({ color: 0xd6d9df, emissive: 0x1f2531 });
    const idol = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 2.4, 6), paleMat);
    idol.position.set(sx, TOP_Y + 0.75 + 1.2, sz); this.world.add(idol);
    this.glowLight(sx, TOP_Y + 1.9, sz, 0xcfe6ff, 3.6, 13);
    // FEIXE de luz de cima (o óculo aberto) → foco no altar, luz só do teto
    this.glowLight(SCX, TOP_Y + 13, SCZ, 0xdfeaff, 4.5, 34);

    // TOCHAS espiralando pela casca (luz quente, sobem com a hélice)
    const torchMat = this.decalMat(decTorchUrl, 0.1);
    for (let i = 2; i < helix.length; i += 4) {
      const th = ang(helix[i]), y = helix[i].y + 2.0;
      const tx = CX + (RO - 0.25) * Math.cos(th), tz = CZ + (RO - 0.25) * Math.sin(th);
      const tm = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.4), torchMat);
      tm.position.set(tx, y, tz);
      tm.rotation.y = Math.atan2(CX - tx, CZ - tz); // encara o centro
      this.world.add(tm);
      this.glowLight(tx, y + 0.2, tz, 0xffa040, 5.0, 10);
    }
    // 2 tochas quentes ladeando o altar
    for (const th of [Math.PI * 0.6, Math.PI * 1.4]) {
      this.glowLight(SCX + Math.cos(th) * (DR - 1), TOP_Y + 2.4, SCZ + Math.sin(th) * (DR - 1), 0xffa040, 2.6, 9);
    }

    // NÉVOA do santuário (igual ao de antes): poeira + fumaça densa sobre o terraço.
    this.spawnMotes(SCX, SCZ, DR * 2, DR * 2, TOP_Y + 0.2, TOP_Y + 6, 60, 0xdfe6f2, 0.09, 0.0022);
    this.spawnFogPuffs(SCX, SCZ, 24, TOP_Y + 0.6, TOP_Y + 10, DR * 0.55, 0x707886, 0xaab2c0, 0.0, 1.0, 0.05, 16, 34);
    // um toque de fumaça subindo pelo poço da hélice também
    this.spawnFogPuffs(CX, CZ, 10, 1.0, TOP_Y - 1, RI + 0.5, 0x707886, 0x9aa2b0, 0.0, 0.7, 0.04, 14, 26);
  }

  // ---- relevo de CAVERNA (ruído) ----
  private vnoise(x: number, y: number, z: number): number {
    const h = (a: number, b: number, c: number) => {
      const n = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const s = (t: number) => t * t * (3 - 2 * t);
    const u = s(xf), v = s(yf), w = s(zf);
    const L = (a: number, b: number, t: number) => a + (b - a) * t;
    const x00 = L(h(xi, yi, zi), h(xi + 1, yi, zi), u);
    const x10 = L(h(xi, yi + 1, zi), h(xi + 1, yi + 1, zi), u);
    const x01 = L(h(xi, yi, zi + 1), h(xi + 1, yi, zi + 1), u);
    const x11 = L(h(xi, yi + 1, zi + 1), h(xi + 1, yi + 1, zi + 1), u);
    return L(L(x00, x10, v), L(x01, x11, v), w);
  }
  private fbm(x: number, y: number, z: number): number {
    return (
      this.vnoise(x, y, z) * 0.6 +
      this.vnoise(x * 2.1, y * 2.1, z * 2.1) * 0.3 +
      this.vnoise(x * 4.4, y * 4.4, z * 4.4) * 0.1
    );
  }
  // malha subdividida DESLOCADA por ruído (relevo), em coords de MUNDO. Cada vértice:
  // p = origin + ax*u + ay*v (u,v em [0,1]) deslocado ao longo de `nrm` por ruído.
  // A borda fica plana (taper) → costura estanque entre células vizinhas.
  private caveMesh(
    origin: [number, number, number],
    ax: [number, number, number],
    ay: [number, number, number],
    nrm: [number, number, number],
    su: number, sv: number, amp: number, mat: THREE.Material,
    uRep = 1, vRep = 1,
  ): THREE.Mesh {
    const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    for (let j = 0; j <= sv; j++)
      for (let i = 0; i <= su; i++) {
        const u = i / su, v = j / sv;
        let x = origin[0] + ax[0] * u + ay[0] * v;
        let y = origin[1] + ax[1] * u + ay[1] * v;
        let z = origin[2] + ax[2] * u + ay[2] * v;
        const taper = Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
        const d = amp * (this.fbm(x * 0.32, y * 0.32, z * 0.32) - 0.5) * taper;
        x += nrm[0] * d; y += nrm[1] * d; z += nrm[2] * d;
        pos.push(x, y, z); uv.push(u * uRep, v * vRep);
      }
    for (let j = 0; j < sv; j++)
      for (let i = 0; i < su; i++) {
        const a = j * (su + 1) + i, b = a + 1, cc = a + su + 1, dd = cc + 1;
        idx.push(a, cc, b, b, cc, dd);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); this.world.add(m); return m;
  }
  // formação rochosa (estalagmite/estalactite) — cone irregular deslocado
  private rockSpire(cx: number, cz: number, base: number, top: number, rad: number, mat: THREE.Material) {
    const g = new THREE.ConeGeometry(rad, Math.abs(top - base), 7, 4);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const vx = p.getX(i), vy = p.getY(i), vz = p.getZ(i);
      const n = this.fbm(vx * 2 + cx, vy * 2, vz * 2 + cz) - 0.5;
      p.setXYZ(i, vx + n * rad * 0.7, vy, vz + n * rad * 0.7);
    }
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat);
    m.position.set(cx, (base + top) / 2, cz);
    if (top < base) m.rotation.z = Math.PI; // estalactite (ponta pra baixo)
    this.world.add(m);
    return m;
  }

  // constrói a MASMORRA a partir da grade fixa (dungeon.ts): piso/teto/paredes,
  // tochas, props e a parede ilusória do segredo.
  private buildDungeon() {
    this.dungeonSession++; // nova "sessão" do andar → cancela respawns pendentes do anterior
    const W = DUNGEON_COLS, H = DUNGEON_ROWS, CH = 4.6; // teto BAIXO — masmorra fechada (estilo Arcmaze), não caverna aberta
    const HALF = CELL / 2;
    const hash = (a: number, b: number, s = 0) =>
      Math.abs((Math.sin(a * 12.9 + b * 78.2 + s * 3.1) * 43758.5) % 1);
    // texturas de caverna (PNG). O teto usa a rocha mais escura → sensação de
    // PROFUNDIDADE (o relevo do teto some no escuro lá em cima).
    // PAREDE/CHÃO/TETO da masmorra em PBR (MeshStandard) COM NORMAL MAP gerado em
    // runtime → a luz esculpe o relevo das pedras (o "detalhe" tipo Arcmaze). Alvenaria
    // das casas (tex_stonewall) nas paredes/arcos/escadas.
    void texA2FloorUrl; void texA2CeilUrl; void texCobbleUrl;
    const a2 = this.dungeonAct() === 2;
    // ATO II — PAREDE: cinza LIMPA por padrão (tex_a2wall_clean) e a versão MUSGOSA
    // (tex_a2wall_1) só ÀS VEZES. Enquanto a limpa não existir, usa a musgosa em tudo.
    const a2CleanUrl = a2OptUrl("tex_a2wall_clean");
    const a2MossyUrl = A2WALL_PNG[0] ?? texA2WallUrl; // tex_a2wall_1 (com musgo)
    const rockMat = a2
      ? this.pbrStone(a2CleanUrl ?? a2MossyUrl, "a2clean", { rough: 0.86, normal: 1.5 })
      : this.pbrStone(texStoneUrl, "dwall", { rough: 0.92, normal: 1.6 });
    const rockMatMossy = a2 ? this.pbrStone(a2MossyUrl, "a2mossy", { rough: 0.86, normal: 1.5 }) : rockMat;
    // só mistura a musgosa quando a limpa existe (senão tudo musgoso, como antes)
    const useMossy = (c: number, r: number): boolean => a2 && !!a2CleanUrl && hash(c, r, 4) < 0.18;
    // CHÃO do Ato II: MESMA calçada de pedra da PRAÇA da cidade (cobblestone
    // procedural), com normal map gerado p/ o relevo. Ato I mantém a lajota de caverna.
    let floorMat: THREE.Material;
    if (a2) {
      const cob = tex.cobblestone(7); cob.wrapS = cob.wrapT = THREE.RepeatWrapping;
      const fm = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, map: cob, roughness: 0.92, metalness: 0 });
      const ci = cob.image as HTMLCanvasElement | undefined;
      if (ci) { const nrm = this.normalFromImage(ci, ci.width, ci.height, "a2cobfloor"); if (nrm) { fm.normalMap = nrm; fm.normalScale.set(1.0, 1.0); } }
      floorMat = fm;
    } else {
      floorMat = this.pbrStone(texCaveFloorUrl, "dfloor", { rough: 0.9, normal: 1.1 });
    }
    // TETO do Ato II: usa o teto cinza novo (tex_a2ceil_2) quando existir; senão cai
    // na alvenaria de pedra do Ato I (cinza). Ato I mantém a alvenaria.
    const a2CeilUrl = a2OptUrl("tex_a2ceil_2");
    const ceilMat = a2 && a2CeilUrl
      ? this.pbrStone(a2CeilUrl, "a2ceil2", { rough: 0.92, normal: 1.3 })
      : this.pbrStone(texStoneUrl, "dwall", { rough: 0.95, normal: 1.2 });
    const torchMat = this.decalMat(decTorchUrl, 0.1);
    const crackMat = this.decalMat(decCracksUrl, 0.08);
    const boneMat = new THREE.MeshLambertMaterial({
      map: tex.skullPile(69), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide,
    });
    // ATO II: tufo de cogumelos bioluminescentes (billboard) — pontua os corredores
    // com o brilho frio no lugar das ossadas do Ato I.
    const mushMat = a2 ? this.decalMat(decMushroomUrl, 0.4) : null;
    const woodMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const ironMat = new THREE.MeshLambertMaterial({ color: 0x27231d });

    const isCorr = (c: number, r: number) => {
      const k = dungeonCell(c, r);
      if (k === "wall" || k === "secret") return false;
      return (
        (dungeonSolidLook(c - 1, r) && dungeonSolidLook(c + 1, r)) ||
        (dungeonSolidLook(c, r - 1) && dungeonSolidLook(c, r + 1))
      );
    };
    let torches = 0;

    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) {
        const k = dungeonCell(c, r);
        if (k === "wall") continue;
        const cx = c * CELL, cz = r * CELL;
        const secret = k === "secret";
        // PISO quase liso (chão "clean", só um leve relevo p/ não ficar chapado).
        // A escada de DESCIDA ('down') abre um poço no chão — não desenha piso ali.
        if (k !== "down")
          this.caveMesh([cx - HALF, 0, cz - HALF], [CELL, 0, 0], [0, 0, CELL], [0, 1, 0], 3, 3, 0.12, floorMat, 1, 1);
        // TETO BAIXO quase liso (masmorra fechada) — relevo suave p/ não descer na
        // cara do jogador com o pé-direito reduzido. A escada de DESCIDA ('down') faz o
        // SEU próprio teto em rampa (o vão que desce), então aqui não desenha.
        if (k !== "down")
          this.caveMesh([cx - HALF, CH, cz - HALF], [CELL, 0, 0], [0, 0, CELL], [0, -1, 0], 5, 5, 0.5, ceilMat, 1, 1);
        // paredes de ROCHA com relevo
        for (const [dc, dr] of DIRS) {
          const nk = dungeonCell(c + dc, r + dr);
          // a face NORTE das escadas (U de volta E D de descida) é feita pela escada
          // embutida (arco + degraus na parede) — não renderiza parede/tocha comum aqui.
          if (k === "stairs" && dc === 0 && dr === -1) continue;
          if (k === "down" && dc === 0 && dr === -1) continue;
          const isRock = nk === "wall";
          const illus = secret && nk !== "secret" && isCorr(c + dc, r + dr);
          if (isRock || illus) {
            // face da parede: largura ao longo da tangente, altura em Y, relevo na normal
            const ox = cx + dc * HALF, oz = cz + dr * HALF;
            const tang: [number, number, number] = dc !== 0 ? [0, 0, CELL] : [CELL, 0, 0];
            const org: [number, number, number] = dc !== 0 ? [ox, 0, oz - HALF] : [ox - HALF, 0, oz];
            // parede: Ato II = cinza limpa por padrão, musgosa só às vezes.
            const wallMat = useMossy(c + dc, r + dr) ? rockMatMossy : rockMat;
            this.caveMesh(org, tang, [0, CH, 0], [dc, 0, dr], 4, 6, 0.9, wallMat, 1, 1.2);
            if (illus) this.addWallDecal(c, r, dc, dr, crackMat, 1.9, 1.8, 1.7);
          }
          // tocha esporádica em paredes de rocha (ilumina). LIMITE BAIXO: muitas
          // point lights estouram o shader no mobile (cena preta); a tocha do
          // herói cobre o resto. Mantém só algumas poças de luz de ambiente.
          if (nk === "wall" && !secret && torches < 12 && hash(c, r, dc * 5 + dr) < 0.2) {
            this.addWallDecal(c, r, dc, dr, torchMat, 0.85, 1.4, 2.1);
            this.glowLight(cx + dc * 0.3, 2.3, cz + dr * 0.3, 0xffa040, 4.4, 12);
            torches++;
          }
        }
        // (sem estalagmites/estalactites — chão limpo e teto sem formações)
        // props. NOTA: os BARRIS (k==="barrel") NÃO são mais renderizados dentro da
        // masmorra — eram cilindros 3D que ficavam plantados nos corredores (inclusive
        // um bem em frente à escada de saída) e BLOQUEAVAM a passagem. A célula vira
        // piso livre. As ossadas ('bones') seguem, pois são decalques rentes ao chão
        // (atmosfera) e não bloqueiam.
        if (k === "bones") {
          if (mushMat) {
            // cogumelo bioluminescente em pé (billboard) + brilho ciano frio
            const m = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.1), mushMat);
            m.position.set(cx, 1.02, cz); this.world.add(m);
            this.billboardProps.push(m);
            this.glowLight(cx, 1.0, cz, 0x4fd8c8, 1.6, 6.2);
          } else {
            const b = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.3), boneMat);
            b.rotation.x = -Math.PI / 2; b.position.set(cx, 0.05, cz); this.world.add(b);
          }
        } else if (k === "chest") {
          this.buildChestBillboard(cx, cz, c, r); this.blocked.add(`${c},${r}`);
        } else if (k === "down") {
          // a escadaria de descida (embutida na parede NORTE) é montada fora do laço,
          // via buildDescentStairs(dungeonFind("D")). Aqui só barra a célula: o jogador
          // encara a boca da escada de frente (pelo sul) e desce.
          this.blocked.add(`${c},${r}`);
        }
      }

    // PILASTRAS ENCOSTADAS NA PAREDE (estilo templo/Arcmaze): em vez de COLUNAS SOLTAS
    // no meio da junta (que apareciam plantadas nos corredores e BLOQUEAVAM passagens),
    // agora são NERVURAS finas coladas NA FACE da parede, nas BORDAS de cada painel —
    // "conectando as folhas" das paredes sem invadir o caminho (projetam só ~0.13 pra
    // dentro, contra a parede). Uma nervura por seam (dedup) → o par de painéis divide
    // a mesma pilastra. InstancedMesh → tudo numa só draw call.
    {
      type Rib = { x: number; z: number; axis: 0 | 1 }; // axis: 0=comprida em X, 1=em Z
      const seen = new Set<string>();
      const ribs: Rib[] = [];
      const OUT = 0.13;      // quanto projeta pra DENTRO do corredor (mínimo → nunca bloqueia)
      const DEPTH = 0.26;    // espessura (dir da parede)
      const addRib = (x: number, z: number, axis: 0 | 1) => {
        const key = `${Math.round(x * 2)},${Math.round(z * 2)},${axis}`;
        if (seen.has(key)) return; seen.add(key); ribs.push({ x, z, axis });
      };
      for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
        const k = dungeonCell(c, r);
        if (k === "wall" || k === "secret") continue;            // célula sólida: sem nervura
        if (k === "gate" || k === "lockgate" || k === "sanctuary") continue; // já têm enquadramento
        const cx = c * CELL, cz = r * CELL;
        for (const [dc, dr] of DIRS) {
          if (dungeonCell(c + dc, r + dr) !== "wall") continue;   // só onde há FACE de parede
          if (k === "stairs" && dc === 0 && dr === -1) continue;  // face do arco da escada U
          if (k === "down" && dc === 0 && dr === -1) continue;    // face da boca da escada D
          const fx = cx + dc * HALF, fz = cz + dr * HALF;         // plano da face
          // recuo pra encostar na parede (projeta OUT pra dentro do corredor)
          const rx = fx - dc * (DEPTH / 2 - OUT), rz = fz - dr * (DEPTH / 2 - OUT);
          if (dc !== 0) {
            // parede leste/oeste → nervuras nas duas pontas ao longo de Z (comprida em Z)
            addRib(rx, cz - HALF, 1); addRib(rx, cz + HALF, 1);
          } else {
            // parede norte/sul → nervuras nas duas pontas ao longo de X (comprida em X)
            addRib(cx - HALF, rz, 0); addRib(cx + HALF, rz, 0);
          }
        }
      }
      if (ribs.length) {
        const geoX = new THREE.BoxGeometry(0.52, CH, DEPTH);       // fuste (comprido em X)
        const geoZ = new THREE.BoxGeometry(DEPTH, CH, 0.52);       // fuste (comprido em Z)
        const capX = new THREE.BoxGeometry(0.64, 0.16, DEPTH + 0.06);
        const capZ = new THREE.BoxGeometry(DEPTH + 0.06, 0.16, 0.64);
        const mk = (geo: THREE.BufferGeometry, y: number, axis: 0 | 1) => {
          const list = ribs.filter((rb) => rb.axis === axis);
          if (!list.length) return;
          const inst = new THREE.InstancedMesh(geo, rockMat, list.length);
          const m = new THREE.Matrix4();
          list.forEach((rb, i) => { m.makeTranslation(rb.x, y, rb.z); inst.setMatrixAt(i, m); });
          inst.instanceMatrix.needsUpdate = true; this.world.add(inst);
        };
        mk(geoX, CH / 2, 0); mk(geoZ, CH / 2, 1);                  // fustes
        mk(capX, CH - 0.09, 0); mk(capZ, CH - 0.09, 1);           // capitéis (junto ao teto)
      }
    }

    // PORTÕES (grade) em corredores 1-largura que SELAM a passagem p/ tesouro.
    // A rocha apenas CONTORNA o arco (parede com buraco em arco): veda laterais,
    // cantos e o vão até o teto, mas deixa VER através da grade o que há do outro
    // lado. Bloqueia a passagem até o jogador abri-lo. Cada entrada: [célula, dir->jogador].
    // A moldura de PEDRA é uma camada FIXA; só a GRADE DE AÇO (outra camada) gira.
    const frameMat = this.decalMat(decGateFrameUrl, 0.4);
    const barsMat = this.decalMat(decGateBarsUrl, 0.4);
    const GATE_H = 4.7; // altura do arco
    const HOLE_HW = 1.5; // meia-largura do vão (fica sob a moldura de pedra da grade)
    const HOLE_BASE = 2.6; // altura onde o arco começa a curvar (topo do vão = 4.1)
    // PILASTRAS que ENQUADRAM o arco do portão (como na referência): duas colunas de
    // pedra, uma de cada lado do vão, ligando a parede ao arco — mesma alvenaria.
    const gatePilasters = (gc: number, gr: number, dc: number, dr: number) => {
      const halfW = HOLE_HW + 0.3, px0 = gc * CELL + dc * (CELL / 2), pz0 = gr * CELL + dr * (CELL / 2);
      const geo = new THREE.BoxGeometry(dc !== 0 ? 0.7 : 0.6, GATE_H, dc !== 0 ? 0.6 : 0.7);
      const capGeo = new THREE.BoxGeometry(dc !== 0 ? 0.86 : 0.78, 0.22, dc !== 0 ? 0.78 : 0.86);
      for (const s of [-1, 1]) {
        const ox = px0 + (dc !== 0 ? 0 : s * halfW), oz = pz0 + (dc !== 0 ? s * halfW : 0);
        const col = new THREE.Mesh(geo, rockMat); col.position.set(ox, GATE_H / 2, oz); this.world.add(col);
        const cap = new THREE.Mesh(capGeo, rockMat); cap.position.set(ox, GATE_H - 0.11, oz); this.world.add(cap);
        const base = new THREE.Mesh(capGeo, rockMat); base.position.set(ox, 0.11, oz); this.world.add(base);
      }
    };
    const gates: [number, number, number, number][] = [
      [33, 16, -1, 0], // portão do TESOURO — jogador chega pelo oeste, cofre a leste
    ];
    for (const [gc, gr, gdc, gdr] of gates) {
      if (dungeonCell(gc, gr) !== "gate") continue;
      // rocha contornando o arco (vão aberto no meio → vê-se o outro lado)
      this.addArchWall(gc, gr, gdc, gdr, rockMat, HOLE_HW, HOLE_BASE, CH);
      gatePilasters(gc, gr, gdc, gdr); // colunas que enquadram o arco
      // moldura de pedra FIXA (não se move ao abrir)
      this.addWallDecal(gc, gr, gdc, gdr, frameMat, CELL, GATE_H, GATE_H / 2);
      // só a grade de aço, dividida em duas folhas com DOBRADIÇAS (giram ao abrir)
      const { pivotL, pivotR } = this.buildSwingGate(gc, gr, gdc, gdr, barsMat, CELL, GATE_H);
      // tocha ao lado p/ destacar o portão
      this.glowLight(gc * CELL + gdc * 0.4, 2.4, gr * CELL + gdr * 0.4, 0xffb45a, 3.4, 9);
      // brilho do OUTRO LADO da grade → ilumina a sala além p/ o jogador enxergar
      this.glowLight((gc - gdc) * CELL, 1.8, (gr - gdr) * CELL, 0xffbf72, 2.2, 9);
      this.blocked.add(`${gc},${gr}`); // bloqueia a passagem até abrir
      this.gates.set(`${gc},${gr}`, { pivotL, pivotR });
    }

    // PORTÃO SELADO (não abre) — esconde a ENTRADA DO SANTUÁRIO. O jogador vê o
    // portal brilhando através da grade, mas NÃO consegue passar (por enquanto).
    const lg = dungeonAll("L")[0];
    if (lg) {
      const ldc = -1, ldr = 0; // o jogador chega pelo oeste
      this.addArchWall(lg.col, lg.row, ldc, ldr, rockMat, HOLE_HW, HOLE_BASE, CH);
      gatePilasters(lg.col, lg.row, ldc, ldr); // colunas que enquadram o arco
      this.addWallDecal(lg.col, lg.row, ldc, ldr, frameMat, CELL, GATE_H, GATE_H / 2);
      // grade FIXA — some quando a Lanterna da Bruma romper o selo (cap.4)
      this.sealBars = this.addWallDecal(lg.col, lg.row, ldc, ldr, barsMat, CELL, GATE_H, GATE_H / 2);
      this.glowLight(lg.col * CELL + ldc * 0.4, 2.4, lg.row * CELL, 0xffb45a, 3.0, 8);
      this.sealCell = { col: lg.col, row: lg.row };
      // já rompido numa visita anterior? mantém aberto e sem grade.
      if (this.mainFlags["seal_broken"]) { this.sealBars.visible = false; }
      else { this.blocked.add(`${lg.col},${lg.row}`); } // SELADO até romper (cap.4)
    }
    // ESCADARIA DO SANTUÁRIO subindo atrás do PORTÃO SELADO (L): mesma construção
    // caprichada da escada de volta (degraus recuados, paredes laterais + teto, fundo
    // escuro), agora subindo p/ LESTE e ACOPLADA na parede. Luz ARCANA fria (não é a
    // luz do dia — leva ao santuário). O portão 'L' na frente segue BLOQUEANDO: por
    // enquanto o jogador só VÊ a escada pela grade; o acesso é secreto (cap. futuro).
    const sanc = dungeonAll("A")[0];
    if (sanc) {
      this.buildEmbeddedStairs(sanc, 1, 0, rockMat, CH, {
        arch: false, shaft: true, shaftColor: 0xbfd6ff, light: 0xbcd2ff, lightLow: 0x9fb8e6,
      });
    }

    // ESCADARIA DE VOLTA (U): escada de pedra SUBINDO rumo à superfície, com um
    // facho de LUZ DO DIA quente descendo (contraste com a treva fria da masmorra)
    // — deixa claro que dali se volta ao vilarejo.
    this.buildReturnStairs(dungeonFind("U"), rockMat, CH);

    // ESCADARIA DE DESCIDA (D): escada de pedra DESCENDO, embutida na parede NORTE
    // (igual à entrada da masmorra no vilarejo) — tochas na boca + treva fria lá no
    // fundo. Leva ao próximo andar. Pode não existir (o andar do chefe não tem).
    for (const d of dungeonAll("D"))
      this.buildDescentStairs(d, rockMat, ceilMat, CH);

    // cenografia: salas temáticas (cripta/caverna fúngica) + destroços
    this.buildDungeonDressing(CH);

    this.spawnDungeonEnemies(); // vários inimigos espalhados (com IA de patrulha/visão)
  }

  // ESCADA DE VOLTA (U): NÃO é um bloco solto no corredor — é um vão em ARCO na parede
  // NORTE com os degraus subindo RECUADOS PARA DENTRO da parede (como um túnel que
  // sobe), sumindo na claridade lá em cima. O jogador vê a "porta" na parede e a escada
  // subindo atrás dela.
  private buildReturnStairs(up: { col: number; row: number }, rockMat: THREE.Material, CH: number) {
    // escada de volta ao vilarejo: sobe p/ o NORTE, com facho de LUZ DO DIA quente.
    this.buildEmbeddedStairs(up, 0, -1, rockMat, CH, {
      arch: true, shaft: true, shaftColor: 0xffe2b0, light: 0xffe0a8, lightLow: 0xffcf8a,
    });
  }

  // ESCADARIA DE DESCIDA ('D'): degraus de PEDRA descendo, EMBUTIDOS na parede NORTE
  // (mesma leitura da entrada da masmorra no vilarejo) — teto/paredes em rampa que
  // descem, tochas quentes flanqueando a boca e treva FRIA lá no fundo (o próximo
  // andar). O jogador encara a boca pelo sul e desce.
  private buildDescentStairs(
    cell: { col: number; row: number },
    rockMat: THREE.Material, ceilMat: THREE.Material, CH: number,
  ) {
    const c = cell.col, r = cell.row, cx = c * CELL, cz = r * CELL;
    const N = 6, stepH = 0.55, stepD = CELL / N, HW = CELL / 2;
    const zSouth = cz + HW;          // BOCA (sul), onde o jogador encara
    const zEnd = zSouth - CELL;      // fundo (norte), dentro da parede
    const H = CH, bottomY = -N * stepH;
    const stoneMap = (rockMat as THREE.MeshStandardMaterial).map ?? undefined;
    const ceilMap = (ceilMat as THREE.MeshStandardMaterial).map ?? undefined;
    const rock = (map: THREE.Texture | undefined) =>
      new THREE.MeshLambertMaterial({ map, side: THREE.DoubleSide, emissive: new THREE.Color(0x14130f) });
    const S = 2.6;
    const quad = (a: number[], b: number[], c2: number[], d: number[], mat: THREE.Material, uv: number[][]) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute([...a, ...b, ...c2, ...a, ...c2, ...d], 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute([...uv[0], ...uv[1], ...uv[2], ...uv[0], ...uv[2], ...uv[3]], 2));
      g.computeVertexNormals();
      this.world.add(new THREE.Mesh(g, mat));
    };
    // TETO em rampa reta descendo (H na boca → mais baixo no fundo)
    const yCeil = (z: number) => H + bottomY * ((zSouth - z) / CELL);
    quad(
      [cx - HW, H, zSouth], [cx + HW, H, zSouth],
      [cx + HW, yCeil(zEnd), zEnd], [cx - HW, yCeil(zEnd), zEnd], rock(ceilMap),
      [[0, 0], [CELL / S, 0], [CELL / S, CELL / S], [0, CELL / S]],
    );
    // PAREDES laterais (topo acompanha o teto; base no fundo) — "a parede descendo"
    for (const s of [-1, 1]) {
      const x = cx + s * HW;
      quad(
        [x, H, zSouth], [x, yCeil(zEnd), zEnd], [x, bottomY, zEnd], [x, bottomY, zSouth], rock(stoneMap),
        [[0, (H - bottomY) / S], [CELL / S, (yCeil(zEnd) - bottomY) / S], [CELL / S, 0], [0, 0]],
      );
    }
    // preenchimento escuro sob a escadaria (não vaza o fundo em ângulos rasos)
    const fill = new THREE.Mesh(new THREE.BoxGeometry(CELL - 0.04, 0.4, CELL), new THREE.MeshBasicMaterial({ color: 0x060505 }));
    fill.position.set(cx, bottomY - 0.2, (zSouth + zEnd) / 2); this.world.add(fill);
    // DEGRAUS só no chão, cascateando pro escuro (emissivo esfria descendo)
    const noseMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0c });
    for (let i = 0; i < N; i++) {
      const yTop = -i * stepH, zc = zSouth - (i + 0.5) * stepD, t = 1 - i / N;
      const em = new THREE.Color(0x0b0908).lerp(new THREE.Color(0x5f7482), Math.pow(t, 0.5));
      const step = new THREE.Mesh(new THREE.BoxGeometry(CELL - 0.04, stepH + 0.02, stepD + 0.02), new THREE.MeshLambertMaterial({ map: stoneMap, emissive: em }));
      step.position.set(cx, yTop - stepH / 2, zc); this.world.add(step);
      const nose = new THREE.Mesh(new THREE.BoxGeometry(CELL - 0.02, 0.06, 0.07), noseMat);
      nose.position.set(cx, yTop, zc + stepD / 2); this.world.add(nose);
    }
    // PAREDE do fundo, na treva total
    const back = new THREE.Mesh(new THREE.PlaneGeometry(CELL, H), new THREE.MeshBasicMaterial({ color: 0x04060a }));
    back.position.set(cx, bottomY + H / 2, zEnd + 0.03); this.world.add(back);
    // TOCHAS quentes flanqueando a boca (poste + chama + luz tremeluzente)
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb24a });
    const postMat = new THREE.MeshLambertMaterial({ color: 0x2a1c10 });
    for (const s of [-1, 1]) {
      const px = cx + s * (HW - 0.28), pz = zSouth - 0.25;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 8), postMat);
      post.position.set(px, 1.9, pz); this.world.add(post);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), flameMat);
      flame.position.set(px, 2.5, pz); this.world.add(flame);
      const light = new THREE.PointLight(0xffb055, 4.2, 10, 2);
      light.position.set(px, 2.3, pz); this.world.add(light);
      this.flames.push({ light, base: 4.2 });
    }
    // luz baixa raspando os primeiros degraus + brilho FRIO subindo do próximo andar
    const g2 = new THREE.PointLight(0xffb060, 3.6, 7, 2);
    g2.position.set(cx, -0.5, zSouth - 1.6); this.world.add(g2);
    this.glowLight(cx, bottomY + 0.6, zEnd + 0.6, 0x5fb4e6, 2.6, 8);
  }

  // ESCADARIA embutida na PAREDE (mesma construção da escada de volta): um vão em ARCO
  // (opcional) na face (dc,dr), com os degraus subindo RECUADOS na parede, paredes
  // laterais + teto formando um túnel que sobe, fundo escuro no topo ("continua") e um
  // facho de luz. Serve p/ a escada de volta (norte, luz do dia) E p/ a do santuário
  // (leste, luz arcana), sempre bem ACOPLADA na parede.
  private buildEmbeddedStairs(
    cell: { col: number; row: number }, dc: number, dr: number,
    rockMat: THREE.Material, CH: number,
    opt: { arch: boolean; shaft: boolean; shaftColor: number; light: number; lightLow: number },
  ) {
    const stMat = rockMat; // MESMA alvenaria PBR das paredes (coesão total)
    const cx = cell.col * CELL, cz = cell.row * CELL;
    const HALF = CELL / 2, HW = 1.25;
    const fx = cx + dc * HALF, fz = cz + dr * HALF; // plano da face p/ onde a escada abre
    const alongX = dc !== 0; // eixo do movimento da escada (X ou Z)
    const N = 8, stepH = 0.28, stepD = 0.46, depth = N * stepD;
    // 1) ARCO na face (alvenaria contorna o vão) — opcional (no santuário quem enquadra é o portão)
    if (opt.arch) this.addArchWall(cell.col, cell.row, dc, dr, rockMat, HW, 2.5, CH);
    // 2) DEGRAUS recuados subindo (~31°, piso fundo → lê como escada de verdade, não pilha)
    for (let i = 0; i < N; i++) {
      const boxH = (i + 1) * stepH; // caixa do chão ao topo do degrau (contra-degrau sólido)
      const ad = i * stepD;         // recuo pra dentro da parede
      const px = fx + dc * ad, pz = fz + dr * ad;
      const sx = alongX ? stepD + 0.02 : HW * 2 - 0.1;
      const sz = alongX ? HW * 2 - 0.1 : stepD + 0.02;
      const st = new THREE.Mesh(new THREE.BoxGeometry(sx, boxH, sz), stMat);
      st.position.set(px, boxH / 2, pz); this.world.add(st);
    }
    // 3) PAREDES laterais + TETO do recesso (enquadram o túnel que sobe)
    const midDir = depth / 2 - 0.15;
    for (const s of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.PlaneGeometry(depth + 0.3, CH), rockMat);
      if (alongX) { side.position.set(fx + dc * midDir, CH / 2, fz + s * HW); side.rotation.y = s > 0 ? Math.PI : 0; }
      else { side.position.set(fx + s * HW, CH / 2, fz + dr * midDir); side.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2; }
      this.world.add(side);
    }
    const top = new THREE.Mesh(new THREE.PlaneGeometry(alongX ? depth + 0.3 : HW * 2, alongX ? HW * 2 : depth + 0.3), rockMat);
    top.rotation.x = Math.PI / 2; top.position.set(fx + dc * midDir, CH, fz + dr * midDir); this.world.add(top);
    // 4) FUNDO escuro no topo → a escada "continua" subindo
    const back = new THREE.Mesh(new THREE.PlaneGeometry(HW * 2, CH), new THREE.MeshBasicMaterial({ color: 0x14161c }));
    back.position.set(fx + dc * (depth + 0.05), CH / 2, fz + dr * (depth + 0.05));
    back.rotation.y = alongX ? Math.PI / 2 : 0; this.world.add(back);
    // 5) FACHO de luz descendo pela escada + luzes de preenchimento
    if (opt.shaft) {
      const shaftMat = new THREE.MeshBasicMaterial({
        map: this.dropGlowTexture(), color: new THREE.Color(opt.shaftColor),
        transparent: true, opacity: 0.14, depthWrite: false, side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.2, CH * 0.9, 14, 1, true), shaftMat);
      shaft.position.set(fx + dc * depth * 0.6, CH * 0.5, fz + dr * depth * 0.6); this.world.add(shaft);
    }
    this.glowLight(fx + dc * depth * 0.7, N * stepH + 0.4, fz + dr * depth * 0.7, opt.light, 5.5, 13);
    this.glowLight(fx + dc * 0.3, 1.7, fz + dr * 0.3, opt.lightLow, 2.8, 8);
  }

  // textura de TEIA DE ARANHA (raios + arcos concêntricos a partir de um canto)
  private _webTex?: THREE.Texture;
  private dungeonWebTex(): THREE.Texture {
    if (this._webTex) return this._webTex;
    const S = 128;
    const cv = document.createElement("canvas"); cv.width = cv.height = S;
    const g = cv.getContext("2d")!;
    g.strokeStyle = "rgba(214,220,228,0.6)"; g.lineWidth = 1;
    const spokes = 8;
    for (let i = 0; i <= spokes; i++) {
      const a = (i / spokes) * (Math.PI / 2);
      g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * S * 1.4, Math.sin(a) * S * 1.4); g.stroke();
    }
    for (let rr = S * 0.18; rr < S * 1.25; rr += S * 0.15) {
      g.beginPath();
      for (let i = 0; i <= spokes; i++) {
        const a = (i / spokes) * (Math.PI / 2);
        const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.stroke();
    }
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    this._webTex = t; return t;
  }

  // "cenografia" da masmorra: salas temáticas (CRIPTA com sarcófagos, CAVERNA
  // FÚNGICA com cogumelos brilhantes) + destroços espalhados (pilares quebrados,
  // entulho, teias, correntes penduradas, gaiolas). Tudo por hash determinístico,
  // densidade baixa, só em piso liso e sem estrangular corredores (openN>=3).
  private buildDungeonDressing(CH: number) {
    const hash = (a: number, b: number, s = 0) => Math.abs((Math.sin(a * 12.9 + b * 78.2 + s * 3.1) * 43758.5) % 1);
    const stone = new THREE.MeshLambertMaterial({ map: tex.stone(31), side: THREE.DoubleSide });
    const stoneDk = new THREE.MeshLambertMaterial({ map: tex.stone(31), color: new THREE.Color(0x8a8578) });
    const iron = new THREE.MeshLambertMaterial({ color: 0x2a2620 });
    const mushStem = new THREE.MeshLambertMaterial({ color: 0xd7ddcb });
    const mushCap = new THREE.MeshLambertMaterial({ color: 0x63c98a, emissive: new THREE.Color(0x2f8f52) });
    const webMat = new THREE.MeshBasicMaterial({ map: this.dungeonWebTex(), transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide });
    const boneMat = new THREE.MeshLambertMaterial({ map: tex.skullPile(69), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });

    // ---- builders (só NÃO-bloqueantes; os que plantavam pilar/gaiola/sarcófago no
    // caminho foram removidos p/ não atrapalhar a passagem) ----
    const mush = (cx: number, cz: number) => {
      const n = 3 + Math.floor(hash(cx, cz, 7) * 3);
      for (let i = 0; i < n; i++) {
        const dx = (hash(cx, cz, i + 10) - 0.5) * 1.5, dz = (hash(cx, cz, i + 20) - 0.5) * 1.5;
        const hgt = 0.28 + hash(cx, cz, i + 30) * 0.6;
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, hgt, 8), mushStem);
        stem.position.set(cx + dx, hgt / 2, cz + dz); this.world.add(stem);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.17 + hash(cx, cz, i + 40) * 0.13, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), mushCap);
        cap.position.set(cx + dx, hgt, cz + dz); this.world.add(cap);
      }
      this.glowLight(cx, 0.7, cz, 0x4fc884, 1.7, 6.5); // brilho bioluminescente
    };
    const rubble = (cx: number, cz: number, dc: number, dr: number) => {
      const n = 2 + Math.floor(hash(cx, cz, 5) * 3);
      for (let i = 0; i < n; i++) {
        const s = 0.24 + hash(cx, cz, i + 50) * 0.4;
        const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), stoneDk);
        const along = (hash(cx, cz, i + 60) - 0.5) * (CELL * 0.6);
        const out = CELL / 2 - 0.25 - hash(cx, cz, i + 70) * 0.5;
        rk.position.set(cx + dc * out + (dc ? 0 : along), s * 0.5, cz + dr * out + (dr ? 0 : along));
        rk.rotation.set(hash(cx, cz, i + 80) * 3, hash(cx, cz, i + 90) * 3, hash(cx, cz, i + 100) * 3);
        this.world.add(rk);
      }
    };
    const hangChain = (cx: number, cz: number) => {
      const len = CH * 0.35 + hash(cx, cz, 9) * CH * 0.32;
      const x = cx + (hash(cx, cz, 11) - 0.5) * 1.4, z = cz + (hash(cx, cz, 12) - 0.5) * 1.4;
      const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, len, 6), iron);
      ch.position.set(x, CH - len / 2, z); this.world.add(ch);
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 6, 10), iron);
      hook.position.set(x, CH - len, z); this.world.add(hook);
    };

    const W = DUNGEON_COLS, H = DUNGEON_ROWS;
    const isCorr = (c: number, r: number) =>
      (dungeonSolidLook(c - 1, r) && dungeonSolidLook(c + 1, r)) ||
      (dungeonSolidLook(c, r - 1) && dungeonSolidLook(c, r + 1));
    let pillars = 0, cages = 0, mushN = 0, webs = 0, chains = 0, rubbles = 0, sarcs = 0;
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) {
        if (dungeonCell(c, r) !== "floor") continue; // só piso liso (evita E/C/K/B/S/U/A/G/L/X)
        const cx = c * CELL, cz = r * CELL;
        const wall = DIRS.find(([dc, dr]) => dungeonCell(c + dc, r + dr) === "wall");
        const openN = DIRS.filter(([dc, dr]) => dungeonWalkable(c + dc, r + dr)).length;
        const inCrypt = c >= 4 && c <= 11 && r >= 4 && r <= 8;    // sala CRIPTA (topo-esq)
        const inFungal = c >= 4 && c <= 11 && r >= 21 && r <= 26; // sala FÚNGICA (esq-baixo)
        // (REMOVIDO) props BLOQUEANTES no piso — pilares quebrados, gaiolas e
        // sarcófagos plantados no caminho ficavam ATRAPALHANDO a passagem (um pilar
        // caía bem em frente à escada de saída). Agora a masmorra só recebe cenografia
        // que NÃO bloqueia (entulho rente à parede, cogumelos, teias, correntes altas).
        // NÃO-bloqueantes
        if (inFungal && mushN < 6 && hash(c, r, 2) < 0.3) { mush(cx, cz); mushN++; }
        if (wall && rubbles < 28 && hash(c, r, 3) < 0.13) { rubble(cx, cz, wall[0], wall[1]); rubbles++; }
        for (const [dc, dr] of DIRS)
          if (dungeonCell(c + dc, r + dr) === "wall" && webs < 22 && hash(c, r, dc * 7 + dr + 4) < 0.045) {
            this.addWallDecal(c, r, dc, dr, webMat, 1.6, 1.6, CH - 1.1); webs++;
          }
        if (isCorr(c, r) && chains < 15 && hash(c, r, 6) < 0.06) { hangChain(cx, cz); chains++; }
      }
    // luz fria/pálida na CRIPTA (túmulo) — a névoa esverdeada dos mortos, dá o
    // clima e deixa ver os sarcófagos ao descobrir a sala secreta.
    this.glowLight(6 * CELL, 2.4, 6 * CELL, 0x6f8fb4, 1.7, 10);
    this.glowLight(8 * CELL, 1.8, 5 * CELL, 0x5f7ea6, 1.2, 8);

    // ACENTOS DE COR VIVA (estilo Arcmaze): CRISTAIS/lâmpadas mágicas EMBUTIDAS NO TETO.
    // Gemas com emissivo FORTE → dão BLOOM (halo brilhante) e uma luz colorida descendo
    // sobre o ambiente. Cor CONCENTRADA no foco; o resto segue soturno. (No teto, não no
    // chão — não atrapalha a passagem.)
    const ceilGem = (col: number, row: number, hex: number) => {
      const cx = col * CELL, cz = row * CELL, color = new THREE.Color(hex);
      // soquete de pedra (MESMA alvenaria tex_stonewall) embutido no teto
      const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.68, 0.3, 8), stone);
      socket.position.set(cx, CH - 0.15, cz); this.world.add(socket);
      const gemMat = new THREE.MeshStandardMaterial({ color: hex, emissive: color, emissiveIntensity: 2.9, roughness: 0.16, metalness: 0.0 });
      // gema central pendendo do teto → bloom
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), gemMat);
      gem.position.set(cx, CH - 0.55, cz); gem.scale.y = 1.7; this.world.add(gem);
      const n = 3 + Math.floor(hash(col, row, 3) * 3);
      for (let i = 0; i < n; i++) {
        const a = hash(col, row, i + 9) * Math.PI * 2, rr = 0.18 + hash(col, row, i + 13) * 0.22;
        const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.09 + hash(col, row, i) * 0.06, 0), gemMat);
        shard.position.set(cx + Math.cos(a) * rr, CH - 0.42 - hash(col, row, i + 5) * 0.32, cz + Math.sin(a) * rr);
        shard.scale.y = 1.5; shard.rotation.set(0.3, a, 0.2); this.world.add(shard);
      }
      this.glowLight(cx, CH - 1.0, cz, hex, 3.8, 9.5); // luz colorida descendo do teto
    };
    // acha um PISO (sala embaixo) perto do alvo e pendura a gema no TETO acima
    const placeGem = (col: number, row: number, hex: number) => {
      const around = [[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1],[2,0],[-2,0],[0,2],[0,-2]];
      for (const [dc, dr] of around) {
        const c = col + dc, r = row + dr;
        if (dungeonCell(c, r) === "floor") { ceilGem(c, r, hex); return; }
      }
    };
    placeGem(35, 7, 0x9b5cff);   // NE — violeta arcano
    placeGem(18, 15, 0x35d0ff);  // centro-alto — ciano
    placeGem(28, 23, 0x53e06a);  // dir-baixo — verde
    placeGem(8, 31, 0xff7a3c);   // esq-baixo — âmbar-quente
    // portal do SANTUÁRIO com brilho VIOLETA arcano (acento no ponto-chave)
    const asanc = dungeonAll("A")[0];
    if (asanc) this.glowLight(asanc.col * CELL - 1.2, 1.6, asanc.row * CELL, 0xb060ff, 3.2, 9);
  }

  // BAÚ 2D (billboard, estética geral do jogo): plano que encara a câmera, com o frame
  // FECHADO (dec_chest). Ao interagir, chocalha e troca p/ o frame ABERTO (dec_chest_open)
  // + luz quente. Os 2 frames têm a MESMA largura → a base fica no chão e o corpo não
  // "pula" ao abrir (só a tampa sobe).
  // um baú é ESCONDIDO se, partindo do spawn 'S', só se chega até ele CRUZANDO uma
  // parede ilusória ('X'), portão ('G') ou selo ('L') — i.e., fora da rota livre.
  // Esses guardam o MELHOR loot (o "chase" do jogador).
  private dungeonChestHidden(c: number, r: number): boolean {
    const s = dungeonFind("S");
    const open = (cc: number, rr: number) => {
      const k = dungeonCell(cc, rr);
      return k !== "wall" && k !== "secret" && k !== "gate" && k !== "lockgate";
    };
    const seen = new Set<string>([`${s.col},${s.row}`]);
    const dq: [number, number][] = [[s.col, s.row]];
    while (dq.length) {
      const [cc, rr] = dq.shift()!;
      for (const [dc, dr] of DIRS) {
        const nc = cc + dc, nr = rr + dr, k = `${nc},${nr}`;
        if (seen.has(k) || !open(nc, nr)) continue;
        seen.add(k); dq.push([nc, nr]);
      }
    }
    return !seen.has(`${c},${r}`);
  }

  private buildChestBillboard(cx: number, cz: number, c: number, r: number) {
    const W = Game.CHEST_W;
    const mat = new THREE.MeshLambertMaterial({
      transparent: true, opacity: 0, alphaTest: 0.4, side: THREE.DoubleSide,
      emissive: new THREE.Color(0x241a10), // não fica preto na treva
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, W), mat);
    mesh.position.set(cx, W / 2, cz);
    this.world.add(mesh);
    this.billboardProps.push(mesh); // encara a câmera (billboard no eixo Y)
    // ESCONDIDO se, na masmorra, a célula só é alcançável cruzando parede secreta/portão
    const hidden = this.location === "dungeon" && this.dungeonChestHidden(c, r);
    const rec: ChestRec = { mesh, mat, cx, cz, state: "closed", t0: 0, knocks: 0, hidden };
    // luz quente sutil no baú FECHADO — chama a atenção (e é visível pela grade do tesouro)
    const light = new THREE.PointLight(0xffc367, 1.2, 6.5, 2);
    light.position.set(cx, 0.9, cz); this.world.add(light); rec.light = light;
    this.chests.set(`${c},${r}`, rec);
    // frame FECHADO (dimensiona pelo aspecto real, base no chão)
    this.loadArt(decChestUrl, (t) => {
      const im = t.image as { width: number; height: number } | undefined;
      const asp = im && im.width && im.height ? im.width / im.height : 1;
      const h = W / asp;
      mesh.geometry.dispose(); mesh.geometry = new THREE.PlaneGeometry(W, h);
      mesh.position.y = h / 2;
      mat.map = t; mat.opacity = 1; mat.needsUpdate = true;
    });
    this.loadArt(decChestOpenUrl, (t) => { rec.openTex = t; }); // pré-carrega o ABERTO
  }

  // interagiu de frente com o baú fechado → começa o CHOCALHO (som + tremida)
  private openChestStart(key: string) {
    const rec = this.chests.get(key);
    if (!rec || rec.state !== "closed") return;
    rec.state = "opening"; rec.t0 = this.now; rec.knocks = 0;
    this.ui.playSfx("chestRattle");
  }

  // anima os baús: chocalho (~0.7s tremendo, batidinhas) → abre (troca frame + luz + som)
  private updateChests(now: number) {
    for (const rec of this.chests.values()) {
      if (rec.state !== "opening") continue;
      const e = now - rec.t0;
      const k = Math.min(1, e / 700);
      const amp = 0.11 * (1 - k); // treme cada vez menos até destravar
      rec.mesh.rotation.z = Math.sin(e * 0.05) * amp;
      if (rec.knocks < 3 && e > rec.knocks * 190 + 130) { rec.knocks++; this.ui.playSfx("chestRattle"); }
      if (e >= 700) this.openChestNow(rec);
    }
  }
  private openChestNow(rec: ChestRec) {
    rec.state = "open";
    rec.mesh.rotation.z = 0;
    // troca p/ o frame ABERTO (mais alto): mantém a base no chão (só a tampa sobe)
    if (rec.openTex) {
      const im = rec.openTex.image as { width: number; height: number } | undefined;
      const asp = im && im.width && im.height ? im.width / im.height : 1;
      const h = Game.CHEST_W / asp;
      rec.mesh.geometry.dispose(); rec.mesh.geometry = new THREE.PlaneGeometry(Game.CHEST_W, h);
      rec.mesh.position.y = h / 2;
      rec.mat.map = rec.openTex; rec.mat.needsUpdate = true;
    }
    // reforça a luz quente saindo do baú (casa com o brilho pintado no PNG)
    if (rec.light) {
      rec.light.color.set(0xffdb8a); rec.light.intensity = 3.4;
      rec.light.distance = 8.5; rec.light.position.y = 1.15;
    }
    this.ui.playSfx("chestOpen");
    // TESOURO: a célula do baú é bloqueada → loot cai nas células LIVRES ao redor.
    // Baú ESCONDIDO (atrás de segredo/portão) rende o melhor loot; baú comum, bom.
    const cc = Math.round(rec.cx / CELL), rr = Math.round(rec.cz / CELL);
    const prof = LOOT_PROFILES[rec.hidden ? "hidden" : "chest"];
    const goldCell = this.freeNearCells(cc, rr, 1)[0];
    this.spawnGoldDrop(goldCell.c, goldCell.r,
      rec.hidden ? 60 + Math.floor(Math.random() * 90) : 25 + Math.floor(Math.random() * 45));
    this.spawnLootPieces(cc, rr, prof);
    this.ui.toast(rec.hidden ? "Tesouro escondido!" : "Tesouro!");
  }

  // nasce um inimigo no ponto 'E' mais próximo do jogador (não na célula dele)
  // povoa a masmorra: escolhe pontos 'E' BEM ESPALHADOS (distância mínima entre si
  // e longe do spawn do herói) p/ que os inimigos não se juntem todos de uma vez.
  private spawnDungeonEnemies() {
    let es = dungeonAll("E").filter(
      (e) => Math.abs(e.col - this.col) + Math.abs(e.row - this.row) >= 4, // não em cima do herói
    );
    // seleção gulosa por espaçamento: cada escolhido fica ≥ MINGAP dos já escolhidos.
    // MMO: mais inimigos por área (espaçamento menor + teto maior).
    const MINGAP = 3;
    const CAP = 16;
    const picked: { col: number; row: number }[] = [];
    // embaralha p/ variar a distribuição entre partidas
    es = es.sort(() => Math.random() - 0.5);
    for (const e of es) {
      if (picked.every((p) => Math.abs(p.col - e.col) + Math.abs(p.row - e.row) >= MINGAP)) {
        picked.push(e);
        if (picked.length >= CAP) break; // teto de inimigos por andar
      }
    }
    // variedade de tipos espalhados (mais fracos comuns, tanque/conjurador raros).
    // andares mais fundos → pool mais perigoso. O ATO II (andares 4-6) troca o
    // roster inteiro pelo bioma afogado/fúngico.
    const pool = this.dungeonAct() === 2
      ? (this.dungeonFloor >= 4
          ? ["afogado", "limo", "naja", "aberracao", "afogado", "naja", "aberracao", "limo"]
          : ["afogado", "afogado", "limo", "naja", "afogado", "aberracao", "naja", "limo"])
      : this.dungeonFloor >= 2
        ? ["esqueleto", "aranha", "cultista", "carnical", "esqueleto", "cultista", "carnical", "arqueiro"]
        : this.dungeonFloor === 1
          ? ["rato", "aranha", "esqueleto", "esqueleto", "arqueiro", "carnical", "cultista", "aranha"]
          : ["rato", "rato", "aranha", "esqueleto", "esqueleto", "arqueiro", "carnical", "cultista"];
    picked.forEach((p, i) => {
      const t = pool[(i + Math.floor(Math.random() * pool.length)) % pool.length];
      this.buildDungeonEnemy(p.col, p.row, t);
    });
    // CHEFE: nasce nas células 'Z' — Ato I usa o "boss"; Ato II, o Leviatã (boss_a2).
    const bossType = this.dungeonAct() === 2 ? "boss_a2" : "boss";
    for (const z of dungeonAll("Z")) this.buildDungeonEnemy(z.col, z.row, bossType);
  }

  // ---- IA dos inimigos: visão (linha livre), perseguição e patrulha ----
  // linha de visão: caminha a reta até o herói; parede no meio bloqueia a visão
  private enemyCanSee(e: EnemyEnt): boolean {
    let x0 = e.c, y0 = e.r; const x1 = this.col, y1 = this.row;
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    for (let guard = 0; guard < 64; guard++) {
      if (!(x0 === e.c && y0 === e.r) && !(x0 === x1 && y0 === y1) && !this.canWalk(x0, y0)) return false;
      if (x0 === x1 && y0 === y1) return true;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
    return true;
  }
  // um passo em grade rumo à célula alvo (atualiza ocupação + inicia interpolação)
  private enemyStepTo(e: EnemyEnt, nc: number, nr: number, now: number) {
    // aproxima ou afasta do herói? (p/ tingir a seta de orientação)
    const before = Math.abs(this.col - e.c) + Math.abs(this.row - e.r);
    const after = Math.abs(this.col - nc) + Math.abs(this.row - nr);
    e.approach = after < before ? 1 : after > before ? -1 : 0;
    // rumo do passo = p/ onde o inimigo está "virado" (usado pela seta no chão)
    e.hdc = nc - e.c; e.hdr = nr - e.r;
    this.blocked.delete(`${e.c},${e.r}`);
    e.c = nc; e.r = nr;
    this.blocked.add(`${nc},${nr}`);
    e.fx = e.bx; e.fz = e.bz;
    e.tx = nc * CELL; e.tz = nr * CELL;
    e.stepAt = now;
    e.nextMove = now + e.stepDur + 150; // pausa entre passos → ritmo de espreita, não corrida
  }
  private enemyCellFree(nc: number, nr: number): boolean {
    return this.canWalk(nc, nr) && !this.blocked.has(`${nc},${nr}`) && !(nc === this.col && nr === this.row);
  }
  // perseguição gulosa: anda p/ o vizinho livre que mais aproxima do herói
  private enemyChaseStep(e: EnemyEnt, now: number) {
    const cur = Math.abs(this.col - e.c) + Math.abs(this.row - e.r);
    let best: [number, number] | null = null, bd = cur;
    for (const [dc, dr] of DIRS) {
      const nc = e.c + dc, nr = e.r + dr;
      if (!this.enemyCellFree(nc, nr)) continue;
      const d = Math.abs(this.col - nc) + Math.abs(this.row - nr);
      if (d < bd || (d === bd && Math.random() < 0.35)) { bd = d; best = [nc, nr]; }
    }
    if (best && bd < cur) this.enemyStepTo(e, best[0], best[1], now);
    else e.nextMove = now + 260; // encurralado: espera um tico e tenta de novo
  }
  // FUGA: anda p/ o vizinho livre que mais AFASTA do herói (rato acuado)
  private enemyFleeStep(e: EnemyEnt, now: number) {
    const cur = Math.abs(this.col - e.c) + Math.abs(this.row - e.r);
    let best: [number, number] | null = null, bd = cur;
    for (const [dc, dr] of DIRS) {
      const nc = e.c + dc, nr = e.r + dr;
      if (!this.enemyCellFree(nc, nr)) continue;
      const d = Math.abs(this.col - nc) + Math.abs(this.row - nr);
      if (d > bd || (d === bd && Math.random() < 0.35)) { bd = d; best = [nc, nr]; }
    }
    if (best && bd > cur) this.enemyStepTo(e, best[0], best[1], now);
    else e.nextMove = now + 300; // sem saída: hesita
  }
  // KITE (arqueiro/cultista): muito perto → recua; longe/sem visão → aproxima;
  // na distância boa → segura posição e atira.
  private enemyKiteStep(e: EnemyEnt, now: number, dist: number) {
    // ATIRADOR PLANTADO: fica parado atirando e reposiciona POUCO. Só dá um passo p/
    // trás quando o herói COLA (adjacente), e mesmo assim raramente — a chance de errar
    // já vem da EVASÃO/PRECISÃO. Antes ele fugia a 2 células toda hora e o herói nunca
    // conseguia encostar (pior no celular).
    if (dist <= 1) {
      if (Math.random() < 0.32) this.enemyFleeStep(e, now); // colado: recua de vez em quando
      else e.nextMove = now + 800;                          // senão segura e dispara de perto
    } else if (dist > e.range || !this.enemyCanSee(e)) {
      this.enemyChaseStep(e, now);                          // longe/sem visão: aproxima devagar
    } else {
      e.nextMove = now + 1400;                              // boa distância: segura BEM (atira ~2× antes de mover)
    }
  }
  // CASTER (cultista): magia de longe, mas quando o herói CHEGA PERTO ele tende a
  // colar p/ usar a adaga (melee). Nunca foge — troca o orbe pela lâmina de perto.
  private enemyCasterStep(e: EnemyEnt, now: number, dist: number) {
    if (dist > e.range || !this.enemyCanSee(e)) { this.enemyChaseStep(e, now); return; } // longe/sem visão: aproxima
    if (dist <= 2) {
      // perto: boa chance de COLAR p/ golpear com a adaga (senão segura e conjura)
      if (dist === 2 && Math.random() < 0.6) { this.enemyChaseStep(e, now); return; }
      e.nextMove = now + 850; // segura: adjacente = adaga; a 2 células = orbe
      return;
    }
    e.nextMove = now + 1150; // distância confortável: segura mais tempo e conjura (menos jitter)
  }
  // patrulha: vagueia devagar perto do ponto de spawn (raio 2)
  private enemyPatrolStep(e: EnemyEnt, now: number) {
    if (Math.random() < 0.55) { e.nextMove = now + 900; return; } // fica parado boa parte do tempo
    const opts = DIRS
      .map(([dc, dr]) => [e.c + dc, e.r + dr] as [number, number])
      .filter(([nc, nr]) => this.enemyCellFree(nc, nr) && Math.abs(nc - e.homeC) + Math.abs(nr - e.homeR) <= 2);
    if (opts.length) {
      const [nc, nr] = opts[Math.floor(Math.random() * opts.length)];
      this.enemyStepTo(e, nc, nr, now);
      e.nextMove = now + 1000;
    } else e.nextMove = now + 800;
  }
  // ao remover um inimigo: na VILA repõe o "guarda" da entrada; na masmorra é
  // finito (limpar o andar é o objetivo).
  private onEnemyRemoved() {
    if (this.location === "village") {
      window.setTimeout(() => {
        if (this.location === "village" && !this.enemies.length) this.buildDungeonEnemy();
      }, 6000);
    }
  }

  // textura procedural do ORBE (cultista): brilho radial (tingido pela cor)
  private boltTex(): THREE.Texture {
    if (this.boltTexCache) return this.boltTexCache;
    const S = 64; const cv = document.createElement("canvas"); cv.width = cv.height = S;
    const g = cv.getContext("2d")!;
    const rad = g.createRadialGradient(S / 2, S / 2, 1, S / 2, S / 2, S / 2);
    rad.addColorStop(0, "rgba(255,255,255,1)");
    rad.addColorStop(0.35, "rgba(255,255,255,0.85)");
    rad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rad; g.fillRect(0, 0, S, S);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    this.boltTexCache = t; return t;
  }
  // textura procedural da FLECHA (arqueiro): aponta p/ CIMA — o tick a gira no
  // sentido do voo. Haste de madeira + ponta de metal + penas.
  private arrowTex(): THREE.Texture {
    if (this.arrowTexCache) return this.arrowTexCache;
    const W = 40, H = 128; const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const g = cv.getContext("2d")!; const x = W / 2;
    g.lineCap = "round";
    g.strokeStyle = "#7c5a30"; g.lineWidth = 5; // haste
    g.beginPath(); g.moveTo(x, 22); g.lineTo(x, H - 20); g.stroke();
    g.fillStyle = "#e2e6ec"; // ponta de metal (topo)
    g.beginPath(); g.moveTo(x, 3); g.lineTo(x - 11, 27); g.lineTo(x + 11, 27); g.closePath(); g.fill();
    g.strokeStyle = "#9aa1aa"; g.lineWidth = 1.5; g.stroke();
    g.fillStyle = "#c23a2c"; // penas (base)
    g.beginPath(); g.moveTo(x, H - 34); g.lineTo(x - 12, H - 4); g.lineTo(x - 2, H - 12); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(x, H - 34); g.lineTo(x + 12, H - 4); g.lineTo(x + 2, H - 12); g.closePath(); g.fill();
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    this.arrowTexCache = t; return t;
  }
  // seta de ORIENTAÇÃO no chão: aponta p/ CIMA na textura (topo). Um anel + uma
  // ponta destacada na "frente" — no chão (plano deitado) vira o rumo do inimigo.
  // Tingida pela cor do material (âmbar patrulha / vermelho aggro).
  private groundArrowTex(): THREE.Texture {
    if (this.chevTexCache) return this.chevTexCache;
    const S = 128; const cv = document.createElement("canvas"); cv.width = cv.height = S;
    const g = cv.getContext("2d")!; const c = S / 2;
    // anel de base (leve) — marca a "pegada" do inimigo
    g.lineWidth = 5; g.strokeStyle = "rgba(255,255,255,0.55)";
    g.beginPath(); g.arc(c, c, 40, 0, Math.PI * 2); g.stroke();
    // ponta grande apontando p/ CIMA (frente = topo da textura, y pequeno)
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.moveTo(c, 6);            // ponta
    g.lineTo(c + 30, 52);      // base direita
    g.lineTo(c, 40);           // entalhe
    g.lineTo(c - 30, 52);      // base esquerda
    g.closePath(); g.fill();
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    this.chevTexCache = t; return t;
  }
  // som do ATAQUE corpo-a-corpo do inimigo, por espécie: aranha tem o "bote", os
  // esqueletos (e o chefe morto-vivo) o golpe ósseo. Demais (rato/carniçal/cultista
  // na adaga) seguem sem som próprio de ataque — só o "hurt" do herói ao levar dano.
  private enemyMeleeSfx(e: EnemyEnt) {
    const id = e.typeId;
    if (id.includes("aranha")) this.ui.playSfx("spiderAtk");
    else if (id.includes("esqueleto") || id.includes("arqueiro") || id === "boss")
      this.ui.playSfx("skelMelee");
  }

  // o inimigo à distância dispara um projétil rumo à posição ATUAL do herói
  // (mirando o instante do disparo → dá pra desviar andando).
  private enemyFireProjectile(e: EnemyEnt) {
    const isArrow = e.proj === "arrow";
    const mat = new THREE.SpriteMaterial({
      map: isArrow ? this.arrowTex() : this.boltTex(),
      color: new THREE.Color(isArrow ? 0xffffff : 0xb060ff),
      transparent: true, depthWrite: false,
      blending: isArrow ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const spr = new THREE.Sprite(mat);
    if (isArrow) spr.scale.set(0.42, 1.35, 1); else spr.scale.set(0.9, 0.9, 1); // flecha alongada
    const y = 1.4;
    spr.position.set(e.bx, y, e.bz);
    this.world.add(spr);
    const tx = this.col * CELL, tz = this.row * CELL;
    const dist = Math.hypot(tx - e.bx, tz - e.bz);
    this.enemyBolts.push({
      spr, kind: e.proj, fx: e.bx, fz: e.bz, tx, tz, y, t0: performance.now(),
      dur: Math.max(180, dist / (isArrow ? 20 : 14) * 1000), dmg: e.atk, // flecha mais veloz
    });
    // flecha do arqueiro OU magia do cultista/conjuradores (som próprio enviado pelo jogador)
    this.ui.playSfx(isArrow ? "arrowShot" : "enemyMagic");
  }
  // atualiza os projéteis dos inimigos: voam até o alvo; ao chegar, se o herói
  // ainda está por perto, causa dano (senão desviou). Some com um clarão. A flecha
  // gira p/ apontar no sentido do voo (em espaço de tela).
  private updateEnemyBolts(now: number) {
    const cx = this.camera.position.x, cz = this.camera.position.z;
    // inverso da rotação da câmera (mundo→visão) — calculado 1x por quadro p/ a flecha
    const invCam = this._boltInvQ.copy(this.camera.quaternion).invert();
    for (let i = this.enemyBolts.length - 1; i >= 0; i--) {
      const p = this.enemyBolts[i];
      const t = (now - p.t0) / p.dur;
      if (t >= 1) {
        // flecha = dano FÍSICO (Defesa); orbe/magia = dano MÁGICO (Resistência Mágica)
        if (Math.hypot(cx - p.tx, cz - p.tz) < CELL * 1.3)
          this.damagePlayer(p.dmg, p.kind === "orb" ? "mag" : "phys");
        this.spawnPoof(p.tx, p.tz); // clarão de impacto (reaproveita o poof)
        this.world.remove(p.spr); (p.spr.material as THREE.SpriteMaterial).dispose();
        this.enemyBolts.splice(i, 1);
        continue;
      }
      p.spr.position.set(p.fx + (p.tx - p.fx) * t, p.y - 0.3 * t * t, p.fz + (p.tz - p.fz) * t);
      if (p.kind === "arrow") {
        // gira a flecha p/ apontar SEMPRE no sentido do VOO (ponta p/ o jogador).
        // Usa a DIREÇÃO FIXA do disparo (origem→alvo) levada p/ o espaço da câmera —
        // estável do começo ao fim (o método antigo, posição-atual→alvo, degenerava
        // quando a flecha vinha quase de frente e ela "deitava"). O −0.5 no Y dá o
        // arco (a flecha desce um tico), o que também resolve o caso de frente.
        const d = this._boltDir.set(p.tx - p.fx, -0.5, p.tz - p.fz).applyQuaternion(invCam);
        // espaço da câmera: x p/ a direita, y p/ cima; ponta (rotação 0) aponta p/ cima
        (p.spr.material as THREE.SpriteMaterial).rotation = Math.atan2(d.x, d.y);
      }
    }
  }

  private addWall(
    cx: number,
    cz: number,
    dc: number,
    dr: number,
    y0: number,
    y1: number,
    mat: THREE.Material,
  ) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(CELL, y1 - y0), mat);
    wall.position.set(
      cx + dc * (CELL / 2),
      (y0 + y1) / 2,
      cz + dr * (CELL / 2),
    );
    if (dc === 1) wall.rotation.y = -Math.PI / 2;
    else if (dc === -1) wall.rotation.y = Math.PI / 2;
    else if (dr === 1) wall.rotation.y = Math.PI;
    else wall.rotation.y = 0;
    this.world.add(wall);
    return wall;
  }

  // parede de rocha que CONTORNA um arco: preenche a face toda da célula (largura
  // CELL, do chão a yTop) MENOS um buraco em arco (retângulo + semicírculo no topo).
  // Assim a rocha veda laterais/cantos/topo, mas dá pra VER através do vão (a grade
  // do portão fica na frente e enxerga-se a sala do outro lado pelos vãos das barras).
  private addArchWall(
    gc: number, gr: number, dc: number, dr: number, mat: THREE.Material,
    holeHalfW: number, holeBaseY: number, yTop: number,
  ): THREE.Mesh {
    const HW = CELL / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-HW, 0);
    shape.lineTo(HW, 0);
    shape.lineTo(HW, yTop);
    shape.lineTo(-HW, yTop);
    shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-holeHalfW, 0);
    hole.lineTo(holeHalfW, 0);
    hole.lineTo(holeHalfW, holeBaseY);
    hole.absarc(0, holeBaseY, holeHalfW, 0, Math.PI, false); // semicírculo do topo
    hole.lineTo(-holeHalfW, 0);
    shape.holes.push(hole);
    const geo = new THREE.ShapeGeometry(shape, 20);
    // UVs da ShapeGeometry vêm em unidades de mundo → reduz p/ a rocha não ficar densa
    const uv = geo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.18, uv.getY(i) * 0.18);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(gc * CELL + dc * (CELL / 2), 0, gr * CELL + dr * (CELL / 2));
    if (dc === 1) m.rotation.y = -Math.PI / 2;
    else if (dc === -1) m.rotation.y = Math.PI / 2;
    else if (dr === 1) m.rotation.y = Math.PI;
    else m.rotation.y = 0;
    m.renderOrder = 3; // antes da grade (renderOrder 4)
    this.world.add(m);
    return m;
  }

  // geometria de meia-folha do portão: um plano w×h com UV mapeando METADE da
  // textura (side 0 = metade esquerda 0..0.5; side 1 = metade direita 0.5..1).
  private halfPlaneGeo(w: number, h: number, side: 0 | 1): THREE.PlaneGeometry {
    const g = new THREE.PlaneGeometry(w, h);
    const uv = g.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * 0.5 + side * 0.5);
    return g;
  }

  // portão de DUAS FOLHAS com dobradiças nas bordas: fechado forma a grade inteira;
  // ao abrir, cada folha gira p/ dentro (como porta dupla). Retorna os pivôs p/ animar.
  private buildSwingGate(
    gc: number, gr: number, dc: number, dr: number, mat: THREE.Material, w: number, h: number,
  ): { pivotL: THREE.Object3D; pivotR: THREE.Object3D } {
    const grp = new THREE.Group();
    grp.position.set(gc * CELL + dc * (CELL / 2 + 0.06), 0, gr * CELL + dr * (CELL / 2 + 0.06));
    grp.rotation.y = dc === 1 ? Math.PI / 2 : dc === -1 ? -Math.PI / 2 : dr === 1 ? 0 : Math.PI;
    // folha esquerda: dobradiça na borda esquerda (x = -w/2)
    const pivotL = new THREE.Group();
    pivotL.position.set(-w / 2, 0, 0);
    const planeL = new THREE.Mesh(this.halfPlaneGeo(w / 2, h, 0), mat);
    planeL.position.set(w / 4, h / 2, 0);
    planeL.renderOrder = 4;
    pivotL.add(planeL);
    // folha direita: dobradiça na borda direita (x = +w/2)
    const pivotR = new THREE.Group();
    pivotR.position.set(w / 2, 0, 0);
    const planeR = new THREE.Mesh(this.halfPlaneGeo(w / 2, h, 1), mat);
    planeR.position.set(-w / 4, h / 2, 0);
    planeR.renderOrder = 4;
    pivotR.add(planeR);
    grp.add(pivotL);
    grp.add(pivotR);
    this.world.add(grp);
    return { pivotL, pivotR };
  }

  // TÚNEL DESCENDENTE: o TETO e as PAREDES são planos LISOS descendo (rampa reta,
  // sem degraus) — os degraus ficam SÓ no CHÃO. Usa a MESMA rocha (PNG) da
  // masmorra, sem tingir. Vai escurecendo p/ o fundo (a treva da profundeza).
  private buildStairs(
    c: number,
    r: number,
    cx: number,
    cz: number,
    wallMat: THREE.Material,
    stepMat: THREE.Material,
    ceilMat: THREE.Material,
  ) {
    const N = 6;                    // degraus do chão
    const stepH = 0.55;             // queda por degrau
    const stepD = CELL / N;         // avanço em z por degrau
    const HW = CELL / 2;
    const zSouth = cz + CELL / 2;   // BOCA (sul), onde o jogador entra
    const zEnd = zSouth - CELL;     // fundo (norte)
    const H = TUNNEL_H;             // altura do túnel na boca
    const bottomY = -N * stepH;     // piso do fundo
    const stoneMap = (stepMat as THREE.MeshLambertMaterial).map ?? undefined;
    const wallMap = (wallMat as THREE.MeshLambertMaterial).map ?? undefined;
    const ceilMap = (ceilMat as THREE.MeshLambertMaterial).map ?? undefined;
    // rocha viva da masmorra, SEM tingir (emissivo neutro baixinho só p/ não ficar
    // preto onde a point light não alcança) — mantém a cor/pedra igual à da dungeon.
    const rockMat = (map: THREE.Texture | undefined) =>
      new THREE.MeshLambertMaterial({
        map, side: THREE.DoubleSide, emissive: new THREE.Color(0x14130f),
        // igual ao túnel: vence a ardósia da montanha coplanar no z-buffer
        polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2,
      });
    // quad livre (4 cantos) com UV em escala de mundo (a rocha tila natural)
    const S = 2.6;
    const quad = (a: number[], b: number[], c2: number[], d: number[], mat: THREE.Material, uv: number[][]) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute([...a, ...b, ...c2, ...a, ...c2, ...d], 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute([...uv[0], ...uv[1], ...uv[2], ...uv[0], ...uv[2], ...uv[3]], 2));
      g.computeVertexNormals();
      this.world.add(new THREE.Mesh(g, mat));
    };
    // yTeto(z): teto LISO descendo de H (boca) a bottomY+H (fundo)
    const yCeil = (z: number) => H + bottomY * ((zSouth - z) / CELL);
    // TETO liso (rampa reta) — um único plano descendo
    quad(
      [cx - HW, H, zSouth], [cx + HW, H, zSouth],
      [cx + HW, yCeil(zEnd), zEnd], [cx - HW, yCeil(zEnd), zEnd], rockMat(ceilMap),
      [[0, 0], [CELL / S, 0], [CELL / S, CELL / S], [0, CELL / S]],
    );
    // PAREDES lisas (topo acompanha o teto; base plana no fundo) — "a parede descendo"
    for (const s of [-1, 1]) {
      const x = cx + s * HW;
      quad(
        [x, H, zSouth], [x, yCeil(zEnd), zEnd], [x, bottomY, zEnd], [x, bottomY, zSouth], rockMat(wallMap),
        [[0, (H - bottomY) / S], [CELL / S, (yCeil(zEnd) - bottomY) / S], [CELL / S, 0], [0, 0]],
      );
    }
    // DEGRAUS SÓ NO CHÃO: cada degrau é UM espelho de altura (não um bloco até o
    // fundo) — assim eles CASCATEIAM e todos os tampos aparecem descendo, em vez de
    // a face frontal do 1º degrau virar uma parede que esconde os demais.
    const noseMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0c });
    // preenchimento escuro sob a escadaria p/ não vazar o fundo em ângulos rasos
    const fill = new THREE.Mesh(new THREE.BoxGeometry(CELL - 0.04, 0.4, CELL), new THREE.MeshBasicMaterial({ color: 0x060505 }));
    fill.position.set(cx, bottomY - 0.2, (zSouth + zEnd) / 2); this.world.add(fill);
    for (let i = 0; i < N; i++) {
      const yTop = -i * stepH;
      const zc = zSouth - (i + 0.5) * stepD;
      const t = 1 - i / N;
      // emissivo quente-pedra (NÃO amarelo-madeira) que esmaece devagar: 3-4 degraus
      // lêem como pedra descendo antes de a treva engolir o resto.
      const em = new THREE.Color(0x0b0908).lerp(new THREE.Color(0x8a6c42), Math.pow(t, 0.5));
      const step = new THREE.Mesh(new THREE.BoxGeometry(CELL - 0.04, stepH + 0.02, stepD + 0.02), new THREE.MeshLambertMaterial({ map: stoneMap, emissive: em }));
      step.position.set(cx, yTop - stepH / 2, zc); this.world.add(step);
      const nose = new THREE.Mesh(new THREE.BoxGeometry(CELL - 0.02, 0.06, 0.07), noseMat);
      nose.position.set(cx, yTop, zc + stepD / 2); this.world.add(nose);
    }
    // PAREDE do FUNDO na treva total
    const back = new THREE.Mesh(new THREE.PlaneGeometry(CELL, H), new THREE.MeshBasicMaterial({ color: 0x050507 }));
    back.position.set(cx, bottomY + H / 2, zEnd + 0.03); this.world.add(back);
    // TOCHAS quentes flanqueando a boca (revelam os primeiros degraus) + luz baixa
    const torchMat = this.decalMat(decTorchUrl, 0.1);
    for (const s of [-1, 1]) {
      this.addWallDecal(c, r, s, 0, torchMat, 0.8, 1.3, 2.0);
      this.glowLight(cx + s * (HW - 0.5), 2.1, zSouth - 0.5, 0xffb055, 3.0, 7);
    }
    const g1 = new THREE.PointLight(0xffbf70, 4.5, 11, 2);
    g1.position.set(cx, 2.2, zSouth - 0.6); this.world.add(g1);
    // luz baixa raspando os degraus que descem — revela 2-3 tampos na boca
    const g2 = new THREE.PointLight(0xffb060, 4.5, 8, 2);
    g2.position.set(cx, -0.6, zSouth - 1.9); this.world.add(g2);
  }

  // portas dos estabelecimentos + PLACA-ESTACA encostada na parede ao lado da porta
  private buildEstablishments(doorMat: THREE.Material, bannerMat: THREE.Material) {
    for (const e of ESTAB_DOORS) {
      const { c, r, dc, dr, kind } = e;
      // porta da loja
      this.addDecal(c, r, dc, dr, doorMat, "door");
      this.doorMap.set(`${c},${r},${dc},${dr}`, kind);

      // BANDEIRA heráldica pendurada na fachada da loja (lado OPOSTO à placa),
      // pendendo do alto da parede. Exclusiva das lojas.
      const bx = c * CELL + dc * (CELL / 2 + 0.06);
      const bz = r * CELL + dr * (CELL / 2 + 0.06);
      const banner = new THREE.Mesh(
        new THREE.PlaneGeometry(1.05, 1.75),
        bannerMat,
      );
      banner.position.set(bx - dr * 1.3, 2.05, bz + dc * 1.3);
      banner.rotation.y =
        dc === 1 ? Math.PI / 2 : dc === -1 ? -Math.PI / 2 : dr === 1 ? 0 : Math.PI;
      banner.renderOrder = 4;
      this.world.add(banner);

      // letreiro rente à parede, AO LADO da porta, com folga clara (antes
      // encostava na porta). Menor e recuado o suficiente pra não sobrepor.
      // procedural-first: nasce com o texto e troca pela placa PNG se houver.
      const grp = new THREE.Group();
      const signH = 0.46; // menor que antes (0.62) p/ caber ao lado sem encostar
      const signMat = new THREE.MeshLambertMaterial({
        map: tex.signText(ESTAB[kind].name),
        transparent: true,
        side: THREE.DoubleSide,
      });
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(signH * SIGN_ASPECT, signH),
        signMat,
      );
      // altura da placa: acima do meio da porta, bem abaixo do beiral do telhado
      board.position.set(0, 1.74, 0.03);
      grp.add(board);
      const artUrl = SHOP_SIGN_ART[kind];
      // segunda placa: tabuleta PENDURADA que projeta sobre a rua (perpendicular à
      // parede) — legível de longe enquanto se anda pela praça. Compartilha a arte.
      const hangH = 0.72, hangW0 = hangH * SIGN_ASPECT;
      const hangBoard = new THREE.Mesh(new THREE.PlaneGeometry(hangW0, hangH), signMat);
      if (artUrl)
        this.loadArt(artUrl, (t) => {
          signMat.map = t;
          signMat.needsUpdate = true;
          // ajusta os planos ao aspecto real da arte, mantendo a altura
          const im = t.image as { width: number; height: number } | undefined;
          if (im && im.width && im.height) {
            const asp = im.width / im.height;
            board.geometry.dispose();
            board.geometry = new THREE.PlaneGeometry(signH * asp, signH);
            hangBoard.geometry.dispose();
            hangBoard.geometry = new THREE.PlaneGeometry(hangH * asp, hangH);
          }
        });
      // posição: face da parede + recuo, deslocada 1.5 p/ o lado da porta.
      // porta = 1.2 de largura (borda em 0.6); placa (~1.3 larga) centrada em
      // 1.5 => borda interna ~0.85, folga clara da porta.
      const fx = c * CELL + dc * (CELL / 2 + 0.16);
      const fz = r * CELL + dr * (CELL / 2 + 0.16);
      const px = dr; // perpendicular à normal da porta
      const pz = -dc;
      grp.position.set(fx + px * 1.5, 0, fz + pz * 1.5);
      grp.rotation.y =
        dc === 1 ? Math.PI / 2 : dc === -1 ? -Math.PI / 2 : dr === 1 ? 0 : Math.PI;
      this.world.add(grp);

      // ---- TABULETA PENDURADA (suporte de ferro + placa perpendicular) ----
      // Convenção do grupo (após a rotação abaixo): +Z = normal da parede (aponta
      // p/ a RUA), +X = ao longo da fachada. O braço sai em +Z; a placa pende dele
      // com a face virada p/ os lados da rua (normal ao longo de X) → legível de longe.
      const ironMat = new THREE.MeshLambertMaterial({ color: 0x1c1c22 });
      const hang = new THREE.Group();
      const armLen = 1.4;      // projeção sobre a rua
      const armY = 2.82;       // logo abaixo do beiral (WALL_H=3.2)
      // haste horizontal saindo da parede sobre a rua (ao longo de +Z)
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, armLen), ironMat);
      arm.position.set(0, armY, armLen / 2);
      hang.add(arm);
      // reforço diagonal (plano Y-Z) segurando o braço
      const stay = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.66, 0.06), ironMat);
      stay.position.set(0, armY - 0.24, armLen * 0.34);
      stay.rotation.x = -Math.PI / 4;
      hang.add(stay);
      // a placa pende do braço; normal ao longo de X (faces p/ a rua)
      const boardZ = armLen * 0.56;
      const boardTopY = armY - 0.06;
      hangBoard.rotation.y = Math.PI / 2;
      hangBoard.position.set(0, boardTopY - 0.18 - hangH / 2, boardZ);
      hang.add(hangBoard);
      // duas correntes do braço até o topo da placa (pontas da largura, ao longo de Z)
      for (const dz of [-hangW0 * 0.34, hangW0 * 0.34]) {
        const chain = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.04), ironMat);
        chain.position.set(0, boardTopY - 0.1, boardZ + dz);
        hang.add(chain);
      }
      // ancora na face da parede, sobre a porta; roda igual ao letreiro
      hang.position.set(fx, 0, fz);
      hang.rotation.y =
        dc === 1 ? Math.PI / 2 : dc === -1 ? -Math.PI / 2 : dr === 1 ? 0 : Math.PI;
      this.world.add(hang);
    }
  }

  // portas das casas de aldeões (lares) — sem placa; só a porta na parede
  private buildHomes(doorMat: THREE.Material) {
    for (const e of HOME_DOORS) {
      const { c, r, dc, dr, id } = e;
      this.addDecal(c, r, dc, dr, doorMat, "door");
      this.homeDoorMap.set(`${c},${r},${dc},${dr}`, id);
    }
  }

  // aldeão billboard com colisão e diálogo.
  // Nasce SEMPRE visível com o sprite procedural; se houver arte 2D, ela é
  // carregada em segundo plano e substitui o sprite quando pronta. Se a arte
  // falhar (rede/404), o NPC continua visível (procedural) em vez de sumir.
  private addNPC(
    c: number,
    r: number,
    seed: number,
    name: string,
    lines: string[],
    artUrl?: string,
    scale = 1,
    anim?: { frames: number; fps: number },
    routine?: { day: [number, number]; night: [number, number]; roam?: number },
  ) {
    const proc = tex.villager(seed);
    const hasArt = !!artUrl;
    const mat = new THREE.MeshLambertMaterial({
      map: proc,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    });
    // dimensões do plano: se há arte, já usa o aspecto da arte (848x1264).
    // A arte é reenquadrada com os pés a ~1,5% do fundo do plano; levantamos um
    // pouco (h*0.015 + 0.06) para os pés não serem "engolidos" pelo piso à frente.
    const h = (hasArt ? 2.4 : 2.15) * scale;
    const w = (hasArt ? h * 0.671 : 1.3) * (hasArt ? 1 : scale);
    const y = hasArt ? h / 2 - h * 0.015 + 0.06 : 1.1 * scale;
    // sombra de contato no chão (ancora o NPC e o separa do piso movimentado)
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.95, w * 0.55),
      new THREE.MeshBasicMaterial({
        map: this.shadowTex(),
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      }),
    );
    // encosta o aldeão na parede vizinha (só na vila, quem tem rotina); no
    // interior das lojas o billboard fica centralizado (cellAt é da vila).
    const lean = routine ? this.wallLean(c, r) : { x: 0, z: 0 };
    const px = c * CELL + lean.x, pz = r * CELL + lean.z;
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(px, 0.03, pz);
    shadow.renderOrder = 1;
    this.world.add(shadow);
    const npc = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    npc.position.set(px, y, pz);
    // dados p/ o idle procedural (respiração) — fase varia por célula p/ dessincronizar
    npc.userData = { baseY: y, h, ph: (c * 12.9 + r * 7.3) % (Math.PI * 2) };
    this.world.add(npc);
    // plaquinha de nome (só o nome principal) flutuando acima da cabeça
    const tag = this.makeNameTag(name.split(",")[0].trim());
    tag.position.set(px, y + h / 2 + 0.18, pz);
    this.world.add(tag);
    this.npcs.push(npc);
    // sem colisão de célula: o jogador passa pelos aldeões (conversa é por
    // aproximação/olhar). O grid não permite colisão parcial, então soltamos.
    const key = `${c},${r}`;
    // guarda a REFERÊNCIA da entrada (walkers movem esse objeto entre células)
    const entry = {
      name,
      lines,
      tex: proc as THREE.Texture,
      art: false,
      frames: 1 as number,
      portrait: undefined as string | null | undefined,
    };
    this.npcMap.set(key, entry);
    // guarda o "rig" (mesh+sombra+plaquinha) por nome, p/ caminhada roteirizada
    this.npcRig.set(name, { mesh: npc, shadow, tag, baseY: y, homeKey: key });
    if (artUrl) {
      this.loadArt(artUrl, (t) => {
        if (anim) {
          // sprite-sheet horizontal: mostra 1/frames por vez e anima no tick
          t.repeat.set(1 / anim.frames, 1);
          t.offset.set(0, 0);
          this.animTex.push({ tex: t, frames: anim.frames, fps: anim.fps });
        }
        mat.map = t;
        mat.needsUpdate = true;
        entry.tex = t;
        entry.art = true;
        entry.frames = anim?.frames ?? 1;
        entry.portrait = undefined; // regenera o retrato a partir da arte
      });
    }
    // rotina dia/noite: registra um "walker" que caminha entre o posto de dia e
    // o destino noturno. Nasce onde foi posicionado (c,r = posição da fase atual).
    if (routine) {
      this.walkers.push({
        mesh: npc,
        shadow,
        tag,
        baseY: y,
        cur: { c, r },
        dayCell: { c: routine.day[0], r: routine.day[1] },
        nightCell: { c: routine.night[0], r: routine.night[1] },
        key,
        moving: false,
        t0: 0,
        from: { c, r },
        to: { c, r },
        fromX: px,
        fromZ: pz,
        toX: px,
        toZ: pz,
        waitUntil: 0,
        inside: false,
        doorDir: undefined,
        trans: null,
        entry,
        dayGoal: { c: routine.day[0], r: routine.day[1] },
        roamRadius: routine.roam ?? 0,
        talking: false,
        talkCooldownUntil: 0,
      });
    }
  }

  // plaquinha de nome (sprite que sempre encara a câmera) acima do NPC
  private makeNameTag(text: string): THREE.Sprite {
    const fontPx = 40;
    const pad = 18;
    const font = `bold ${fontPx}px "Cinzel", "MedievalSharp", system-ui, serif`;
    const meas = document.createElement("canvas").getContext("2d")!;
    meas.font = font;
    const tw = Math.ceil(meas.measureText(text).width);
    const W = tw + pad * 2;
    const H = fontPx + pad;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d")!;
    // pílula de fundo
    const rr = H / 2;
    ctx.beginPath();
    ctx.moveTo(rr, 0);
    ctx.arcTo(W, 0, W, H, rr);
    ctx.arcTo(W, H, 0, H, rr);
    ctx.arcTo(0, H, 0, 0, rr);
    ctx.arcTo(0, 0, W, 0, rr);
    ctx.closePath();
    ctx.fillStyle = "rgba(16,12,8,0.74)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(201,162,39,0.7)";
    ctx.stroke();
    // texto com contorno
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0,0,0,0.85)";
    ctx.strokeText(text, W / 2, H / 2 + 1);
    ctx.fillStyle = "#f0dca2";
    ctx.fillText(text, W / 2, H / 2 + 1);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.generateMipmaps = true;
    const spr = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }),
    );
    const hWorld = 0.4;
    spr.scale.set(hWorld * (W / H), hWorld, 1);
    return spr;
  }

  // textura da sombra de contato (gradiente radial escuro -> transparente)
  private shadowTex(): THREE.Texture {
    if (!this._shadowTex) {
      const S = 64;
      const cv = document.createElement("canvas");
      cv.width = S;
      cv.height = S;
      const ctx = cv.getContext("2d")!;
      const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      g.addColorStop(0, "rgba(0,0,0,0.6)");
      g.addColorStop(0.6, "rgba(0,0,0,0.32)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, S, S);
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      this._shadowTex = t;
    }
    return this._shadowTex;
  }

  // carrega uma arte 2D (com cache por URL) e chama onReady quando pronta.
  // Em caso de erro, não faz nada — o NPC permanece com o sprite procedural.
  // NORMAL MAP em runtime a partir do difuso (Sobel na luminância → relevo por pixel).
  // Sem gerar/committar PNG: destrava o "relevo de pedra" que a luz esculpe (PBR).
  private _normalCache = new Map<string, THREE.Texture>();
  private normalFromImage(img: CanvasImageSource, w: number, h: number, key: string, strength = 2.4): THREE.Texture | null {
    const hit = this._normalCache.get(key);
    if (hit) return hit;
    if (!w || !h) return null;
    const S = Math.min(512, w), sh = Math.max(1, Math.round((S * h) / w));
    const c = document.createElement("canvas"); c.width = S; c.height = sh;
    const g = c.getContext("2d"); if (!g) return null;
    g.drawImage(img, 0, 0, S, sh);
    let sd: Uint8ClampedArray;
    try { sd = g.getImageData(0, 0, S, sh).data; } catch { return null; }
    const out = g.createImageData(S, sh), od = out.data;
    const lum = (x: number, y: number) => {
      x = (x + S) % S; y = (y + sh) % sh; const i = (y * S + x) * 4;
      return (sd[i] * 0.299 + sd[i + 1] * 0.587 + sd[i + 2] * 0.114) / 255;
    };
    for (let y = 0; y < sh; y++) for (let x = 0; x < S; x++) {
      const dx = (lum(x - 1, y) - lum(x + 1, y)) * strength;
      const dy = (lum(x, y - 1) - lum(x, y + 1)) * strength;
      const nx = -dx, ny = -dy, nz = 1, len = Math.hypot(nx, ny, nz) || 1;
      const i = (y * S + x) * 4;
      od[i] = (nx / len * 0.5 + 0.5) * 255;
      od[i + 1] = (ny / len * 0.5 + 0.5) * 255;
      od[i + 2] = (nz / len * 0.5 + 0.5) * 255;
      od[i + 3] = 255;
    }
    g.putImageData(out, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.NoColorSpace; // normal map é dado cru (linear), não sRGB
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.needsUpdate = true;
    this._normalCache.set(key, t);
    return t;
  }

  // material PBR de pedra (difuso + normal gerado) — o relevo aparece com a luz.
  private pbrStone(
    url: string,
    key: string,
    opts: { rough?: number; normal?: number; repeat?: [number, number]; tint?: number } = {},
  ): THREE.MeshStandardMaterial {
    const m = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide, color: opts.tint ?? 0xffffff,
      roughness: opts.rough ?? 0.95, metalness: 0.0,
    });
    const rep = opts.repeat;
    this.loadArt(url, (t) => {
      // com repeat próprio, CLONA a textura (a original é cacheada e compartilhada
      // com outros materiais — não podemos mudar seu .repeat globalmente).
      let map = t;
      if (rep) { map = t.clone(); map.needsUpdate = true; }
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      if (rep) map.repeat.set(rep[0], rep[1]);
      m.map = map;
      const im = t.image as { width: number; height: number } | undefined;
      if (im) {
        let nrm = this.normalFromImage(t.image as CanvasImageSource, im.width, im.height, key);
        if (nrm) {
          if (rep) { nrm = nrm.clone(); nrm.needsUpdate = true; nrm.wrapS = nrm.wrapT = THREE.RepeatWrapping; nrm.repeat.set(rep[0], rep[1]); }
          m.normalMap = nrm; m.normalScale.set(opts.normal ?? 1.3, opts.normal ?? 1.3);
        }
      }
      m.needsUpdate = true;
    });
    return m;
  }

  private loadArt(url: string, onReady: (t: THREE.Texture) => void) {
    const cached = this.artCache.get(url);
    if (cached) {
      onReady(cached);
      return;
    }
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.magFilter = THREE.LinearFilter;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.generateMipmaps = true;
        t.anisotropy = 8;
        t.wrapS = THREE.ClampToEdgeWrapping; // segurança p/ textura non-power-of-two
        t.wrapT = THREE.ClampToEdgeWrapping;
        this.artCache.set(url, t);
        onReady(t);
      },
      undefined,
      () => {
        /* falha de carregamento: mantém o sprite procedural (nunca invisível) */
      },
    );
  }

  // aldeões da vila (espalhados pela praça)
  private buildNPCs() {
    // fase atual (dia/noite) p/ nascerem já no lugar certo — se o jogador entra
    // na vila à noite, os aldeões já estão na taverna/casa, sem precisar andar.
    const t = (performance.now() / DAY_MS + DAY_START) % 1;
    this.npcNight = this.daylight(t) < 0.3;
    for (const v of VILLAGE_NPCS) {
      const anim = VILLAGER_ANIM[v.id];
      const url = anim ? anim.url : VILLAGER_ART[v.id];
      const [sc, sr] = this.npcNight ? v.night : [v.c, v.r]; // célula de nascença
      this.addNPC(
        sc,
        sr,
        v.seed,
        v.name,
        v.lines,
        url,
        v.scale ?? 1,
        anim ? { frames: anim.frames, fps: anim.fps } : undefined,
        { day: [v.c, v.r], night: v.night, roam: v.roam ?? 2 },
      );
    }
  }

  // recorta o rosto do NPC para o retrato do diálogo.
  // Detecta a CABEÇA pelo maior trecho contíguo opaco no topo (ignora saliências
  // finas como espadas/cajados) e centraliza nela — funciona p/ adultos e crianças.
  private makePortrait(image: unknown, frames = 1): string | null {
    const im = image as
      | { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number }
      | null;
    if (!im) return null;
    // se for sprite-sheet, analisa/recorta apenas o 1º quadro
    const iw = Math.floor((im.naturalWidth || im.width || 0) / frames);
    const ih = im.naturalHeight || im.height || 0;
    if (!iw || !ih) return null;
    const S = 132;
    const cv = document.createElement("canvas");
    cv.width = S;
    cv.height = S;
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingQuality = "high";

    // enquadramento automático a partir do canal alpha
    let sx = iw * 0.5 - ih * 0.09;
    let sy = ih * 0.05;
    let side = ih * 0.18;
    try {
      const tmp = document.createElement("canvas");
      tmp.width = iw;
      tmp.height = ih;
      const tc = tmp.getContext("2d");
      if (tc) {
        tc.drawImage(image as CanvasImageSource, 0, 0);
        const d = tc.getImageData(0, 0, iw, ih).data;
        const A = 40;
        // maior trecho contíguo opaco de uma linha -> {w, cx}
        const rowRun = (y: number) => {
          let best = 0,
            bs = 0,
            curS = -1;
          for (let x = 0; x <= iw; x++) {
            const op = x < iw && d[(y * iw + x) * 4 + 3] > A;
            if (op) {
              if (curS < 0) curS = x;
            } else if (curS >= 0) {
              const w = x - curS;
              if (w > best) {
                best = w;
                bs = curS;
              }
              curS = -1;
            }
          }
          return { w: best, cx: bs + best / 2 };
        };
        let topY = -1,
          botY = -1;
        for (let y = 0; y < ih && topY < 0; y++)
          for (let x = 0; x < iw; x++)
            if (d[(y * iw + x) * 4 + 3] > A) {
              topY = y;
              break;
            }
        for (let y = ih - 1; y >= 0 && botY < 0; y--)
          for (let x = 0; x < iw; x++)
            if (d[(y * iw + x) * 4 + 3] > A) {
              botY = y;
              break;
            }
        if (topY >= 0 && botY > topY) {
          const figH = botY - topY + 1;
          // topo da cabeça: 1a linha com trecho contíguo largo (pula saliências finas)
          let hY = topY;
          for (let y = topY; y < topY + figH * 0.3; y++)
            if (rowRun(y).w > iw * 0.06) {
              hY = y;
              break;
            }
          // largura/centro da cabeça na faixa logo abaixo do topo
          let headW = 0,
            xc = iw / 2;
          const band = Math.round(figH * 0.14);
          for (let y = hY; y < hY + band; y++) {
            const r = rowRun(y);
            if (r.w > headW) {
              headW = r.w;
              xc = r.cx;
            }
          }
          side = Math.max(figH * 0.13, Math.min(headW * 1.55, figH * 0.3, ih * 0.55));
          sx = xc - side / 2;
          sy = hY - side * 0.12;
        }
      }
    } catch {
      /* imagem "tainted": usa o enquadramento-padrão acima */
    }
    sx = Math.max(0, Math.min(sx, iw - side));
    sy = Math.max(0, Math.min(sy, ih - side));
    side = Math.min(side, iw, ih);
    try {
      ctx.drawImage(image as CanvasImageSource, sx, sy, side, side, 0, 0, S, S);
      return cv.toDataURL("image/png");
    } catch {
      return null;
    }
  }

  // retrato do NPC de uma célula (gera e guarda em cache quando a arte carregar)
  private portraitFor(key: string): string | null {
    const e = this.npcMap.get(key);
    if (!e) return null;
    if (e.portrait !== undefined) return e.portrait;
    const img = e.tex.image as unknown;
    if (!img) return null; // ainda carregando; tenta de novo depois
    const p = this.makePortrait(img, e.frames ?? 1);
    if (p) e.portrait = p; // só guarda em cache quando conseguiu recortar
    return p;
  }

  // ---------------------------------------------- floresta (bioma externo)
  private addForestLights() {
    // luz de dia encoberto/nevoento: fria, difusa, sem sol duro
    const amb = new THREE.AmbientLight(0x9aa4b2, 0.72);
    const hemi = new THREE.HemisphereLight(0x9fabbc, 0x40502e, 0.85);
    const sun = new THREE.DirectionalLight(0xdfe6ec, 0.5);
    sun.position.set(-8, 16, 5);
    this.world.add(amb);
    this.world.add(hemi);
    this.world.add(sun);
    // moduladas pelo ciclo dia/noite (noite visível, mas nítida como noite)
    this.registerDayLight(amb, 0x36486a, 0.44);
    this.registerDayLight(hemi, 0x2c3c5e, 0.5);
    this.registerDayLight(sun, 0x6675ad, 0.14); // luar frio à noite
  }

  private buildForest() {
    const W = FOREST_COLS;
    const H = FOREST_ROWS;
    const welcomeCell = forestFind("s"); // placa de boas-vindas na entrada
    const hash = (a: number, b: number, s = 0) => {
      const v = Math.sin(a * 41.3 + b * 17.7 + s * 7.13) * 4213.1;
      return v - Math.floor(v);
    };

    // chão base de grama cobrindo toda a área + margem (1 tile de grama por célula)
    const grassMat = new THREE.MeshLambertMaterial({ map: tex.grass(61) });
    (grassMat.map as THREE.Texture).repeat.set(W + 10, H + 10);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry((W + 10) * CELL, (H + 10) * CELL),
      grassMat,
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set((W / 2 - 0.5) * CELL, 0, (H / 2 - 0.5) * CELL);
    this.world.add(ground);

    // trilha de terra sobre a grama
    const dirtMat = new THREE.MeshLambertMaterial({ map: tex.dirtPath(63) });
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) {
        const k = forestCell(c, r);
        if (k === "path" || k === "gate" || k === "spawn" || k === "sign") {
          const t = new THREE.Mesh(tileGeo, dirtMat);
          t.rotation.x = -Math.PI / 2;
          t.rotation.z = (Math.floor(hash(c, r, 9) * 4) * Math.PI) / 2;
          t.position.set(c * CELL, 0.02, r * CELL);
          this.world.add(t);
        }
      }

    // materiais de vegetação — pinheiros: procedural-first, trocam pela arte 2D
    const useArt = TREE_ART.length > 0;
    const pineMats = (useArt ? TREE_ART : [65, 66, 67, 71, 79]).map((v, idx) => {
      const mat = new THREE.MeshLambertMaterial({
        map: tex.pineTree(65 + idx * 6),
        transparent: true,
        alphaTest: 0.4,
        side: THREE.DoubleSide,
      });
      if (useArt) this.loadArt(v as string, (t) => {
        mat.map = t;
        mat.needsUpdate = true;
      });
      return mat;
    });
    // árvores mortas (raras) — mesmo esquema procedural-first
    const deadMats = DEAD_TREE_ART.map((url, idx) => {
      const mat = new THREE.MeshLambertMaterial({
        map: tex.pineTree(83 + idx * 4),
        transparent: true,
        alphaTest: 0.4,
        side: THREE.DoubleSide,
      });
      this.loadArt(url, (t) => {
        mat.map = t;
        mat.needsUpdate = true;
      });
      return mat;
    });
    const bushMats = [67, 73].map(
      (s) =>
        new THREE.MeshLambertMaterial({
          map: tex.bush(s),
          transparent: true,
          alphaTest: 0.4,
          side: THREE.DoubleSide,
        }),
    );
    const fernMats = [75, 77].map(
      (s) =>
        new THREE.MeshLambertMaterial({
          map: tex.fern(s),
          transparent: true,
          alphaTest: 0.35,
          side: THREE.DoubleSide,
        }),
    );
    const rockMat = new THREE.MeshLambertMaterial({ map: tex.rock(41) });
    const skullMat = new THREE.MeshLambertMaterial({
      map: tex.skullPile(69),
      transparent: true,
      alphaTest: 0.4,
      side: THREE.DoubleSide,
    });
    const woodMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const barkMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(7) });

    // planos cruzados (dois quads perpendiculares) — dão volume sem billboard
    const addCross = (
      x: number,
      z: number,
      w: number,
      h: number,
      mat: THREE.Material,
      flip = false,
    ) => {
      const g = new THREE.PlaneGeometry(w, h);
      const sx = flip ? -1 : 1;
      const p1 = new THREE.Mesh(g, mat);
      p1.position.set(x, h / 2, z);
      p1.scale.x = sx;
      const p2 = new THREE.Mesh(g, mat);
      p2.position.set(x, h / 2, z);
      p2.rotation.y = Math.PI / 2;
      p2.scale.x = sx;
      this.world.add(p1);
      this.world.add(p2);
    };
    const pineAspect = useArt ? TREE_ASPECT : 0.44;
    const addPine = (x: number, z: number, th: number, c: number, r: number) => {
      // ~12% das árvores são mortas (clima sombrio), o resto são pinheiros vivos
      const dead = deadMats.length > 0 && hash(c, r, 17) < 0.12;
      const pool = dead ? deadMats : pineMats;
      const mat = pool[Math.floor(hash(c, r, 4) * pool.length) % pool.length];
      // espelha metade das árvores p/ quebrar a repetição da arte
      addCross(x, z, th * pineAspect, th, mat, hash(c, r, 16) > 0.5);
    };

    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) {
        const k = forestCell(c, r);
        const x = c * CELL;
        const z = r * CELL;
        if (k === "tree" || k === "edge") {
          const edge = k === "edge";
          const th = (edge ? 8.0 : 5.4) + hash(c, r, 1) * 2.2;
          const jx = (hash(c, r, 2) - 0.5) * CELL * 0.45;
          const jz = (hash(c, r, 3) - 0.5) * CELL * 0.45;
          addPine(x + jx, z + jz, th, c, r);
          // moita de folhagem na base do pinheiro (esconde o "corte" no chão)
          if (hash(c, r, 12) > 0.5)
            addCross(x + jx, z + jz, 2.0, 1.1, fernMats[Math.floor(hash(c, r, 13) * fernMats.length) % fernMats.length]);
          // SÓ a borda (paredão da mata) bloqueia; as árvores do interior são
          // atravessáveis — o jogador serpenteia entre elas (colisão só "no tronco").
          if (edge) this.blocked.add(`${c},${r}`);
        } else if (k === "bush") {
          const bw = 2.4 + hash(c, r, 5) * 0.8;
          const bh = 1.4 + hash(c, r, 6) * 0.5;
          const mat = bushMats[Math.floor(hash(c, r, 7) * bushMats.length) % bushMats.length];
          addCross(x, z, bw, bh, mat);
          this.blocked.add(`${c},${r}`);
        } else if (k === "rock") {
          const s = 1.1 + hash(c, r, 8) * 0.8;
          const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(s), rockMat);
          rk.position.set(x, s * 0.55, z);
          rk.rotation.set(hash(c, r, 9) * 3, hash(c, r, 10) * 3, 0.2);
          rk.scale.y = 0.7;
          this.world.add(rk);
          this.blocked.add(`${c},${r}`);
        } else if (k === "foliage") {
          // samambaia (andável, decoração no chão)
          const fw = 1.8 + hash(c, r, 5) * 0.8;
          const fh = 0.9 + hash(c, r, 6) * 0.5;
          addCross(
            x + (hash(c, r, 2) - 0.5) * CELL * 0.4,
            z + (hash(c, r, 3) - 0.5) * CELL * 0.4,
            fw,
            fh,
            fernMats[Math.floor(hash(c, r, 7) * fernMats.length) % fernMats.length],
          );
        } else if (k === "skull") {
          addCross(x, z, 2.0, 1.4, skullMat);
        } else if (k === "sign") {
          // a placa de boas-vindas encara de frente quem entra (olha p/ o sul);
          // as demais viram-se p/ a trilha vizinha
          const welcome = c === welcomeCell.col && r === welcomeCell.row;
          const dir: [number, number] = welcome ? [0, 1] : this.forestSignFacing(c, r);
          this.buildForestSign(x, z, woodMat, dir);
          this.blocked.add(`${c},${r}`);
        }
        // toco/tronco caído esporádico na grama — SEM colisão (o jogador passa
        // por cima; antes travava a movimentação numa célula que parecia livre)
        if (k === "grass" && hash(c, r, 14) > 0.9) {
          const log = new THREE.Mesh(
            new THREE.CylinderGeometry(0.28, 0.32, 2.4, 8),
            barkMat,
          );
          log.rotation.set(0, hash(c, r, 15) * Math.PI, Math.PI / 2);
          log.position.set(x, 0.28, z);
          this.world.add(log);
        }
      }

    // paredão de mata ao fundo: se houver arte de aglomerado, usa muralhas
    // largas (norte/leste/oeste); senão, cai no anel de pinheiros individuais.
    if (CLUSTER_ART.length > 0) {
      const cm = this.makeClusterMats(); // {mat, aspect} por aglomerado
      const addWall = (x: number, z: number, roty: number, key: number) => {
        const h = 15 + hash(key, 0, 2) * 3;
        const pick = cm[Math.floor(hash(key, 0, 4) * cm.length) % cm.length];
        const w = h * pick.aspect;
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), pick.mat);
        m.position.set(x, h / 2 - 1, z);
        m.rotation.y = roty;
        if (hash(key, 0, 5) > 0.5) m.scale.x = -1;
        this.world.add(m);
      };
      const wcl = 15 * 1.85 * 0.72; // passo com sobreposição
      // muralhas logo atrás da borda (dentro do alcance da névoa, mas ao fundo)
      let key = 0;
      for (let x = -CELL; x <= (W + 1) * CELL; x += wcl) addWall(x, -1.5 * CELL, 0, key++);
      for (let z = -CELL; z <= H * CELL; z += wcl) {
        addWall(-1.5 * CELL, z, Math.PI / 2, key++);
        addWall((W + 0.5) * CELL, z, -Math.PI / 2, key++);
      }
    } else {
      for (let c = -2; c < W + 2; c += 2) addPine(c * CELL + 1, -2 * CELL, 10 + hash(c, -3, 1) * 3, c, -3);
      for (let r = -1; r < H - 2; r += 2) {
        addPine(-2 * CELL, r * CELL, 9 + hash(-3, r, 1) * 3, -3, r);
        addPine((W + 1) * CELL, r * CELL, 9 + hash(W + 2, r, 1) * 3, W + 2, r);
      }
    }

    // céu soturno também na floresta (centrado no meio do mapa) — some o "vazio"
    // chapado ao olhar p/ cima, igual à vila.
    this.addSkyDome((FOREST_COLS / 2) * CELL, (FOREST_ROWS / 2) * CELL);
    this.buildForestBackdrop();
    this.buildForestVillageBackdrop();
    void MAP;
  }

  // Vilarejo visto ao LONGE pela saída da floresta: grama em volta, um caminho
  // de terra levando até a cidade lá no fundo — e só a cidade (pequena, em
  // escala reduzida) tem o chão de pedra, o arco, as casas, o poço e a montanha.
  private buildForestVillageBackdrop() {
    const gate = forestFind("V");
    const cx = gate.col * CELL;
    const gz = gate.row * CELL;
    const zc = gz + 9 * CELL; // cidade bem mais ao fundo
    const S = 0.6; // escala reduzida (parece distante)

    // grama cobrindo o trecho do portão até a cidade (some a névoa ao fundo)
    const grassMat = new THREE.MeshLambertMaterial({ map: tex.grass(61) });
    (grassMat.map as THREE.Texture).repeat.set(20, 16);
    const gp = new THREE.Mesh(new THREE.PlaneGeometry(22 * CELL, 16 * CELL), grassMat);
    gp.rotation.x = -Math.PI / 2;
    gp.position.set(cx, -0.02, gz + 6 * CELL);
    this.world.add(gp);

    // caminho de terra do portão até a cidade
    const dirtMat = new THREE.MeshLambertMaterial({ map: tex.dirtPath(63) });
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);
    for (let z = gz + 1 * CELL; z < zc - 2 * CELL; z += CELL) {
      const t = new THREE.Mesh(tileGeo, dirtMat);
      t.rotation.x = -Math.PI / 2;
      t.rotation.z = (Math.round((z - gz) / CELL) % 2) * (Math.PI / 2);
      t.position.set(cx, 0.02, z);
      this.world.add(t);
    }

    // árvores emoldurando a cidade (laterais + fundo) — tamanho normal
    if (CLUSTER_ART.length > 0) {
      const cm = this.makeClusterMats();
      const h = 13;
      const place = (x: number, z: number, flip: boolean, idx: number) => {
        const pick = cm[idx % cm.length];
        const m = new THREE.Mesh(new THREE.PlaneGeometry(h * pick.aspect, h), pick.mat);
        m.position.set(x, h / 2 - 1, z);
        m.rotation.y = Math.PI;
        if (flip) m.scale.x = -1;
        this.world.add(m);
      };
      place(cx - 13, zc + 2 * CELL, false, 0); // fundo-esquerda
      place(cx + 13, zc + 2 * CELL, true, 1); // fundo-direita
      place(cx - 20, zc - 1 * CELL, false, 1); // lateral esquerda
      place(cx + 20, zc - 1 * CELL, true, 0); // lateral direita
    }

    // --------- a cidade em si, num grupo com escala reduzida (distante) ---------
    const G = new THREE.Group();
    const wallMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(3) });
    const roofMat = new THREE.MeshLambertMaterial({ map: tex.thatch(3), side: THREE.DoubleSide });
    const woodMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const rockMat = new THREE.MeshLambertMaterial({ map: tex.rock(41) });
    const stoneMat = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    const cobbleMat = new THREE.MeshLambertMaterial({ map: tex.cobblestone(7) });
    const dark = new THREE.MeshLambertMaterial({ color: 0x201410 });

    // chão de pedra SÓ da cidade (coords locais do grupo)
    (cobbleMat.map as THREE.Texture).repeat.set(6, 5);
    const cob = new THREE.Mesh(new THREE.PlaneGeometry(24, 18), cobbleMat);
    cob.rotation.x = -Math.PI / 2;
    cob.position.set(0, 0.06, 2);
    G.add(cob);

    // montanha atrás (massa de pedra)
    const mBase = new THREE.Mesh(new THREE.BoxGeometry(34, 9, 7), rockMat);
    mBase.position.set(-2, 3.5, 13);
    G.add(mBase);
    for (const [ox, oz, rad, mh] of [
      [-4, 0, 11, 13], [1, -0.5, 10, 15], [5.5, 0.5, 9, 11], [-9, 0.8, 8, 10],
    ] as [number, number, number, number][]) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(rad, mh, 7), rockMat);
      m.position.set(ox * 1.5, mh / 2 + 1.5, 13 + oz);
      m.rotation.y = ox;
      G.add(m);
    }

    // casa (coords locais) com porta + janelas na face voltada ao pátio
    const house = (x: number, z: number, w: number, h: number, dir: [number, number]) => {
      const wbox = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), wallMat);
      wbox.position.set(x, h / 2, z);
      G.add(wbox);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 0.82, h * 0.6, 4), roofMat);
      roof.position.set(x, h + h * 0.28, z);
      roof.rotation.y = Math.PI / 4;
      G.add(roof);
      const fx = x + dir[0] * (w / 2 + 0.03);
      const fz = z + dir[1] * (w / 2 + 0.03);
      const ry = Math.atan2(dir[0], dir[1]);
      const door = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.26, h * 0.5), dark);
      door.position.set(fx, h * 0.25, fz);
      door.rotation.y = ry;
      G.add(door);
      for (const s of [-1, 1]) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.16, h * 0.2), dark);
        win.position.set(fx + s * dir[1] * w * 0.26, h * 0.62, fz - s * dir[0] * w * 0.26);
        win.rotation.y = ry;
        G.add(win);
      }
    };

    if (VILLAGE_BACKDROP_ART) {
      // arte 2D do vilarejo no lugar das casas (montanha/pedra do grupo ficam)
      const mat = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
      const h = 10;
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(h * 1.9, h), mat);
      plane.position.set(0, h / 2, 4);
      plane.rotation.y = Math.PI;
      G.add(plane);
      this.loadArt(VILLAGE_BACKDROP_ART, (t) => {
        mat.map = t;
        mat.alphaTest = 0.35;
        mat.opacity = 1;
        mat.needsUpdate = true;
        const im = t.image as { width: number; height: number } | undefined;
        if (im && im.width && im.height) {
          plane.geometry.dispose();
          plane.geometry = new THREE.PlaneGeometry(h * (im.width / im.height), h);
        }
      });
    } else {
      // fundo do pátio (virado ao jogador = -z local)
      for (const [dx, w, h] of [[-6, 3.0, 3.2], [-2, 3.2, 3.4], [2, 3.0, 3.1], [6, 3.2, 3.3]] as [number, number, number][])
        house(dx, 7, w, h, [0, -1]);
      for (const dz of [2.5, 5]) house(-8, dz, 3.0, 3.1, [1, 0]); // lateral esq.
      for (const dz of [2.5, 5]) house(8, dz, 3.0, 3.1, [-1, 0]); // lateral dir.
      // poço no centro
      const well = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.0, 16), stoneMat);
      ring.position.y = 0.5;
      well.add(ring);
      for (const s of [-0.75, 0.75]) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.9, 0.14), woodMat);
        p.position.set(s, 1.45, 0);
        well.add(p);
      }
      const wroof = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.7, 4), roofMat);
      wroof.position.y = 2.5;
      wroof.rotation.y = Math.PI / 4;
      well.add(wroof);
      well.position.set(0, 0, 2.5);
      G.add(well);
      // arco de entrada na frente
      const arch = new THREE.Group();
      const postGeo = new THREE.BoxGeometry(0.36, 3.4, 0.36);
      for (const s of [-1.6, 1.6]) {
        const p = new THREE.Mesh(postGeo, woodMat);
        p.position.set(s, 1.7, 0);
        arch.add(p);
      }
      const beam = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.36, 0.4), woodMat);
      beam.position.set(0, 3.35, 0);
      arch.add(beam);
      arch.position.set(0, 0, -3.5);
      G.add(arch);
    }

    G.scale.setScalar(S);
    G.position.set(cx, 0, zc);
    this.world.add(G);
  }

  // direção (dc,dr) para onde a placa deve "olhar" (célula de trilha vizinha)
  private forestSignFacing(c: number, r: number): [number, number] {
    const dirs: [number, number][] = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let best: [number, number] = [0, 1];
    for (const [dc, dr] of dirs) {
      if (forestCell(c + dc, r + dr) === "path") return [dc, dr];
      if (forestWalkable(c + dc, r + dr)) best = [dc, dr];
    }
    return best;
  }

  // placa de madeira: dois postes + tábua, virada p/ quem se aproxima
  private buildForestSign(
    x: number,
    z: number,
    woodMat: THREE.Material,
    dir: [number, number],
  ) {
    const grp = new THREE.Group();
    const postGeo = new THREE.BoxGeometry(0.16, 2.3, 0.16);
    for (const s of [-0.62, 0.62]) {
      const post = new THREE.Mesh(postGeo, woodMat);
      post.position.set(s, 1.15, 0);
      grp.add(post);
    }
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.66, 0.09), woodMat);
    board.position.set(0, 1.78, 0.02);
    grp.add(board);
    // moldura mais escura
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.76, 0.06),
      new THREE.MeshLambertMaterial({ color: 0x2a1c10 }),
    );
    frame.position.set(0, 1.78, -0.01);
    grp.add(frame);
    grp.position.set(x, 0, z);
    grp.rotation.y = Math.atan2(dir[0], dir[1]);
    this.world.add(grp);
  }

  // silhuetas de montanhas: sombras mais escuras que a neblina, dissolvidas nela
  private buildForestBackdrop() {
    const hillMat = new THREE.MeshBasicMaterial({ color: 0x6f7885 });
    const snowMat = new THREE.MeshBasicMaterial({ color: 0xb8c2cf });
    const cx = (FOREST_COLS / 2 - 0.5) * CELL;
    const zBack = -7 * CELL;
    const peaks = [-2.4, -1.2, -0.1, 1.0, 2.2];
    peaks.forEach((f, i) => {
      const h = 30 + ((i * 37) % 13);
      const rad = 17 + ((i * 53) % 8);
      const mx = cx + f * 24;
      const mz = zBack - ((i * 31) % 8);
      const m = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 5), hillMat);
      m.position.set(mx, h / 2 - 3, mz);
      m.rotation.y = i;
      this.world.add(m);
      const cap = new THREE.Mesh(
        new THREE.ConeGeometry(rad * 0.4, h * 0.32, 5),
        snowMat,
      );
      cap.position.set(mx, h - h * 0.18 - 3, mz);
      cap.rotation.y = i;
      this.world.add(cap);
    });
  }

  private canWalk(c: number, r: number): boolean {
    const ok =
      this.location === "village"
        ? isWalkable(c, r)
        : this.location === "forest"
          ? forestWalkable(c, r)
          : this.location === "dungeon"
            ? dungeonWalkable(c, r)
            : this.location === "showcase"
              ? terraceWalkable(c, r) // terraço do topo: movimento NORMAL em grade
              : roomWalkable(c, r);
    return ok && !this.blocked.has(`${c},${r}`);
  }

  // altura (Y) do piso numa célula: a sala-vitrine tem o TERRAÇO plano no topo.
  private floorYAt(_c: number, _r: number): number {
    return this.location === "showcase" ? TERRACE_Y : 0;
  }

  // ---- ESCADA (hélice): movimento por ESTAÇÕES (só frente/trás) ----
  private applyShowcasePose() {
    const s = stationPose(this.showIdx);
    this.camera.position.set(s.x, s.y + EYE_H, s.z);
    this.camera.rotation.y = s.yaw;
  }

  // um passo na escada: a câmera SEMPRE encara a orientação atual do jogador
  // (stairUp), acompanhando a curva da hélice — não a direção do movimento. Assim,
  // olhando p/ cima o jogador SOBE com "frente"; virando 180° ele passa a DESCER com
  // "frente" (a câmera segue pra onde ele olha, não o contrário).
  private stationStep(ni: number) {
    const from = stationPose(this.showIdx), to = stationPose(ni);
    this.showIdx = ni;
    const toYaw = this.stairUp ? to.yaw : to.yaw + Math.PI;
    let fy = this.camera.rotation.y, ty = toYaw;
    while (ty - fy > Math.PI) ty -= Math.PI * 2;
    while (ty - fy < -Math.PI) ty += Math.PI * 2;
    this.anim = {
      kind: "move", t0: performance.now(),
      fromX: from.x, fromZ: from.z, toX: to.x, toZ: to.z,
      fromY: from.y, toY: to.y, fromYaw: fy, toYaw: ty,
    };
    this.pushMinimap();
  }

  private showcaseStationMove(a: Action) {
    // VIRAR na escada (esq/dir) = dar meia-volta: passa a olhar p/ cima<->baixo.
    // Assim o "frente" respeita o EIXO pra onde o jogador está virado.
    if (a === "turnLeft" || a === "turnRight" || a === "back") {
      if (a !== "back") {
        this.stairUp = !this.stairUp;
        const pose = stationPose(this.showIdx);
        const toYaw = this.stairUp ? pose.yaw : pose.yaw + Math.PI;
        let fy = this.camera.rotation.y, ty = toYaw;
        while (ty - fy > Math.PI) ty -= Math.PI * 2;
        while (ty - fy < -Math.PI) ty += Math.PI * 2;
        this.anim = { kind: "turn", t0: performance.now(), fromY: fy, toY: ty };
        return;
      }
    }
    // "frente" sobe/desce conforme a orientação; "trás" faz o oposto (dar ré na escada)
    const goUp = a === "forward" ? this.stairUp : a === "back" ? !this.stairUp : null;
    if (goUp === null) return; // estrafe: sem efeito (a hélice guia)
    if (goUp) {
      if (this.showIdx < SHOW_LAST) this.stationStep(this.showIdx + 1);
      else this.enterTerraceFromStairs(); // topo → terraço (só sobe)
    } else {
      if (this.showIdx > 0) this.stationStep(this.showIdx - 1);
      else this.exitShowcase(); // base → sai (só desce)
    }
  }

  // topo da escada → TERRAÇO: passa pro movimento normal (grade), 1ª célula a oeste.
  private enterTerraceFromStairs() {
    const from = stationPose(SHOW_LAST);
    this.showIdx = -1;
    this.col = ENTRY.c; this.row = ENTRY.r; this.facing = 3; // oeste
    let fy = this.camera.rotation.y, ty = MOUTH_YAW;
    while (ty - fy > Math.PI) ty -= Math.PI * 2;
    while (ty - fy < -Math.PI) ty += Math.PI * 2;
    this.anim = {
      kind: "move", t0: performance.now(),
      fromX: from.x, fromZ: from.z, toX: ENTRY.c * CELL, toZ: ENTRY.r * CELL,
      fromY: from.y, toY: TERRACE_Y, fromYaw: fy, toYaw: ty,
    };
    this.pushMinimap();
  }

  // TERRAÇO → escada: volta pro modo estações na "boca", já virado p/ descer.
  private enterStairsFromTerrace() {
    const to = stationPose(SHOW_LAST);
    this.showIdx = SHOW_LAST;
    this.stairUp = false; // chega no topo olhando p/ BAIXO (descendo)
    let fy = this.camera.rotation.y, ty = MOUTH_YAW + Math.PI; // direção de descida
    while (ty - fy > Math.PI) ty -= Math.PI * 2;
    while (ty - fy < -Math.PI) ty += Math.PI * 2;
    this.anim = {
      kind: "move", t0: performance.now(),
      fromX: this.col * CELL, fromZ: this.row * CELL, toX: to.x, toZ: to.z,
      fromY: TERRACE_Y, toY: to.y, fromYaw: fy, toYaw: ty,
    };
    this.pushMinimap();
  }

  private exitShowcase() {
    const sr = this.showcaseReturn;
    if (sr) { // entrou pelo portal da masmorra → volta pra lá
      this.showcaseReturn = null;
      this.enterLocation(sr.loc as Parameters<typeof this.enterLocation>[0], sr.col, sr.row, sr.facing);
    } else {
      const rt = this.returnTo;
      this.enterLocation("village", rt.col, rt.row, rt.facing);
    }
  }

  // ---- minimapa (HUD) ----
  private miniGrid: { cols: number; rows: number; cells: Uint8Array } | null = null;
  private buildMiniGrid() {
    let cols: number, rows: number, walk: (c: number, r: number) => boolean;
    if (this.location === "village") { cols = COLS; rows = ROWS; walk = isWalkable; }
    else if (this.location === "forest") { cols = FOREST_COLS; rows = FOREST_ROWS; walk = forestWalkable; }
    else if (this.location === "dungeon") { cols = DUNGEON_COLS; rows = DUNGEON_ROWS; walk = dungeonWalkable; }
    else if (this.location === "showcase") { cols = 6; rows = 10; walk = terraceWalkable; }
    else { cols = ROOM_COLS; rows = ROOM_ROWS; walk = roomWalkable; }
    const cells = new Uint8Array(cols * rows);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) cells[r * cols + c] = walk(c, r) ? 1 : 0;
    this.miniGrid = { cols, rows, cells };
  }
  // nome amigável do local atual (banner no minimapa)
  private miniLocName(): string {
    switch (this.location) {
      case "village": return "Vilarejo";
      case "forest": return "Floresta Sussurrante";
      case "dungeon": return DUNGEON_FLOOR_NAMES[this.dungeonFloor] ?? "Masmorra";
      case "showcase": return "Santuário";
      case "tavern": return "Taverna";
      case "store": return "Mercador";
      case "smith": return "Ferreiro";
      case "alchemist": return "Alquimista";
      default: return "Casa";
    }
  }
  // marcadores do minimapa p/ o local atual (lojas, NPCs, saídas, pontos-chave)
  private buildMiniPois(): MiniPoi[] {
    const pois: MiniPoi[] = [];
    const cap = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
    if (this.location === "village") {
      // a porta fica na PAREDE (c,r); o marcador vai p/ a célula da praça em
      // frente à porta (c+dc, r+dr) p/ ficar DENTRO do mapa caminhável.
      for (const e of ESTAB_DOORS) {
        const kind = e.kind === "store" ? "store" : e.kind === "tavern" ? "tavern" : e.kind === "alchemist" ? "alchemist" : "smith";
        pois.push({ c: e.c + e.dc, r: e.r + e.dr, kind, label: cap(ESTAB[e.kind].name) });
      }
      // casas comuns: só o ícone, SEM rótulo "Casa" (evita poluição no mapa).
      // A casa da Hedda guarda o BAÚ — vira um marcador de baú p/ o jogador achar.
      for (const h of HOME_DOORS)
        pois.push({ c: h.c + h.dc, r: h.r + h.dr, kind: h.id === "hedda" ? "chest" : "home", label: h.id === "hedda" ? "Baú" : "" });
      pois.push({ c: WELL.c, r: WELL.r, kind: "well", label: "Poço" });
      // saídas: masmorra (escada) e floresta (trilha)
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          const k = cellAt(c, r);
          if (k === "stairs") pois.push({ c, r, kind: "dungeon", label: "Masmorra" });
          else if (k === "forestgate") pois.push({ c, r, kind: "forest", label: "Floresta" });
        }
      // WAYPOINT (portal fixo) + portal temporário de retorno
      if (this.cityPortalActive) pois.push({ c: WELL.c, r: WELL.r, kind: "portal", label: "Portal" });
      if (this.tempPortalCell) pois.push({ c: this.tempPortalCell.c, r: this.tempPortalCell.r, kind: "portal", label: "Retorno" });
      // NPCs (posição atual — acompanham a rotina dia/noite)
      for (const [key, npc] of this.npcMap) {
        const [c, r] = key.split(",").map(Number);
        pois.push({ c, r, kind: "npc", label: npc.name.split(/[ ,]/)[0] });
      }
    } else if (this.location === "forest") {
      for (let r = 0; r < FOREST_ROWS; r++)
        for (let c = 0; c < FOREST_COLS; c++) {
          const k = forestCell(c, r);
          if (k === "gate") pois.push({ c, r, kind: "exit", label: "Vilarejo" });
          else if (k === "sign") pois.push({ c, r, kind: "sign", label: "Placa" });
        }
    } else if (this.location === "dungeon") {
      // escada de SUBIDA (U): 1º andar volta ao vilarejo; 2/3 sobem um andar
      const upLbl = this.dungeonFloor > 0 ? "Subir um andar" : "Subir ao Vilarejo";
      for (const s of dungeonAll("U")) pois.push({ c: s.col, r: s.row, kind: "stair", label: upLbl });
      // escada de DESCIDA (D): desce pro próximo andar
      for (const s of dungeonAll("D")) pois.push({ c: s.col, r: s.row, kind: "dungeon", label: "Descer" });
      for (const s of dungeonAll("A")) pois.push({ c: s.col, r: s.row, kind: "sanctuary", label: "Escadaria" });
      for (const s of dungeonAll("L")) pois.push({ c: s.col, r: s.row, kind: "gate", label: "Portão Selado" });
      for (const key of this.gates.keys()) {
        const [c, r] = key.split(",").map(Number);
        pois.push({ c, r, kind: "gate", label: "Grade" });
      }
    } else if (this.location !== "showcase") {
      // interiores (loja/casa): atendente + saída
      const n = roomFind("N"), x = roomFind("X");
      const who = (this.location === "tavern" || this.location === "store" || this.location === "smith" || this.location === "alchemist")
        ? ESTAB[this.location].npc.split(/[ ,]/)[0] : "Morador";
      pois.push({ c: n.col, r: n.row, kind: "npc", label: who });
      pois.push({ c: x.col, r: x.row, kind: "exit", label: "Sair" });
      // o baú da Hedda aparece no mapa do interior dela
      if (this.stashCell) pois.push({ c: this.stashCell.col, r: this.stashCell.row, kind: "chest", label: "Baú" });
    }
    return pois;
  }
  private pushMinimap() {
    if (!this.miniGrid) this.buildMiniGrid();
    const g = this.miniGrid!;
    const [dc, dr] = DIRS[this.facing];
    const wp = this.guideOn ? this.guideCell() : null; // guia desligado → sem marcador
    this.ui.updateMinimap({
      cols: g.cols, rows: g.rows, cells: g.cells, col: this.col, row: this.row, dc, dr,
      pois: this.buildMiniPois(), locName: this.miniLocName(),
      waypoint: wp ? { c: wp.col, r: wp.row } : undefined,
      drops: this.buildMiniDrops(),
      enemies: this.buildMiniEnemies(),
    });
    this.pushTracker(); // mantém o rastreador em sincronia com o estado da missão
  }
  // dados do rastreador (missão ativa + objetivo atual); null quando não há missão
  private trackerData(): TrackerData | null {
    const act = this.mqActive();
    if (act) {
      const st = this.mainQuests[act.id];
      const step = act.steps[st.step];
      let objective = step?.objective ?? "";
      if (step?.kind === "kill") objective = `${step.objective} (${Math.min(st.progress, step.goal ?? 0)}/${step.goal})`;
      return { title: act.title, objective, guideOn: this.guideOn };
    }
    // sem capítulo ativo → 1ª missão secundária ativa (mural do Bruno)
    for (const def of QUEST_DEFS) {
      const q = this.quests[def.id];
      if (q?.status === "active" || q?.status === "ready") {
        let objective = "";
        if (def.kind === "kill") objective = q.status === "ready"
          ? `Concluída (${def.goal}/${def.goal} ${def.unit ?? "inimigos"})`
          : `${Math.min(q.progress, def.goal ?? 0)}/${def.goal} ${def.unit ?? "inimigos"}`;
        else if (def.kind === "delivery") objective = q.status === "ready" ? "Entregue no mural do Bruno" : `Entregar a ${def.target}`;
        return { title: def.title, objective, guideOn: this.guideOn };
      }
    }
    return null;
  }
  private pushTracker() { this.ui.setTracker(this.trackerData()); }
  // liga/desliga o guia (marcador no mapa + marcador no mundo), pelo rastreador
  private toggleGuide() {
    this.guideOn = !this.guideOn;
    this.pushMinimap();  // waypoint aparece/some no minimapa (e re-empurra o rastreador)
    this.ui.toast(this.guideOn ? "Guia do mapa: ligado" : "Guia do mapa: desligado");
  }

  // ---------------------------------------------- interação
  private doInteract() {
    const t = this.facingTarget();
    if (!t) return;
    if (t.kind === "enter") {
      // ao sair, o jogador deve olhar p/ fora (oposto à porta que encarou p/ entrar)
      this.returnTo = {
        col: this.col,
        row: this.row,
        facing: (this.facing + 2) % 4,
      };
      const p = roomFind("P");
      void this.doorTransition(() => this.enterLocation(t.estab, p.col, p.row, 0));
    } else if (t.kind === "enterhome") {
      this.returnTo = {
        col: this.col,
        row: this.row,
        facing: (this.facing + 2) % 4,
      };
      const p = roomFind("P");
      void this.doorTransition(() => this.enterLocation(t.id, p.col, p.row, 0));
    } else if (t.kind === "exit") {
      const { col, row, facing } = this.returnTo;
      void this.doorTransition(() => this.enterLocation("village", col, row, facing));
    } else if (t.kind === "talk") {
      const portrait = this.portraitFor(t.key); // gera o retrato só ao conversar
      // CONVERSA estilo WoW: saudação + menu (missões/conversar/sair)
      this.talkNpc(t.name, portrait, undefined, t.lines);
    } else if (t.kind === "portalback") {
      // portal TEMPORÁRIO: volta ao ponto exato da masmorra e FECHA (uso único).
      const ret = this.dungeonReturn;
      this.dungeonReturn = undefined;
      this.closeTempCityPortal();
      this.ui.toast("Você atravessa o portal de volta às profundezas.");
      if (ret) void this.doorTransition(() => this.enterDungeonFloor(ret.floor, ret.col, ret.row));
      else void this.doorTransition(() => this.enterDungeonFloor(this.dungeonMaxFloor));
    } else if (t.kind === "dungeon" || t.kind === "waypoint") {
      // CHECKPOINT: se já desceu além do 1º andar, oferece CONTINUAR do mais fundo
      // (não refazer tudo) ou RECOMEÇAR do 1º. Senão, entra direto no 1º.
      if (this.dungeonMaxFloor > 0) {
        const deep = this.dungeonMaxFloor;
        this.openDialogue("Boca da Masmorra", [
          `A escadaria some no breu. Você já alcançou ${DUNGEON_FLOOR_NAMES[deep]}.`,
          "Deseja continuar de onde parou ou recomeçar do topo?",
        ], null, {
          choices: [
            { id: "cont", label: `Continuar — ${DUNGEON_FLOOR_NAMES[deep]}`, primary: true },
            { id: "restart", label: "Recomeçar do 1º andar" },
          ],
          onChoice: (id) => { this.closeDialogue(); this.enterDungeonFloor(id === "cont" ? deep : 0); },
        });
      } else {
        this.enterDungeonFloor(0);
      }
    } else if (t.kind === "descend") {
      // escada 'D' → desce um andar; surge à frente da escada de SUBIDA (U) do novo andar
      this.dungeonFloor = Math.min(DUNGEON_FLOOR_COUNT - 1, this.dungeonFloor + 1);
      this.dungeonMaxFloor = Math.max(this.dungeonMaxFloor, this.dungeonFloor); // checkpoint
      setDungeonFloor(this.dungeonFloor);
      const p = this.dungeonEntryAt("U", [0, 1]);
      this.ui.toast(DUNGEON_FLOOR_NAMES[this.dungeonFloor]);
      this.enterLocation("dungeon", p.col, p.row, p.facing);
    } else if (t.kind === "ascend") {
      // escada 'U' num andar 2/3 → sobe um andar; surge À FRENTE (ao SUL) da escada de
      // DESCIDA (D), que agora fica embutida na parede norte — encarando a boca dela.
      this.dungeonFloor = Math.max(0, this.dungeonFloor - 1);
      setDungeonFloor(this.dungeonFloor);
      const p = this.dungeonEntryAt("D", [0, 1]);
      this.ui.toast(DUNGEON_FLOOR_NAMES[this.dungeonFloor]);
      this.enterLocation("dungeon", p.col, p.row, p.facing);
    } else if (t.kind === "gate") {
      this.openGate(t.key);
    } else if (t.kind === "lockgate") {
      // MAIN QUEST cap.4: com a Lanterna da Bruma, o selo se rompe aqui
      if (this.mainQuestSeal()) return;
      // senão, portão SELADO — não abre; mostra a mensagem padrão
      this.openDialogue("Portão Selado", [
        "Um portão de ferro antigo, coberto de selos.",
        "Uma força além da tua o mantém trancado. Ainda não há como passar...",
      ], null);
    } else if (t.kind === "sanctuary") {
      // entra no SANTUÁRIO (sala-vitrine); guarda o retorno p/ a masmorra
      this.showcaseReturn = { loc: "dungeon", col: this.col, row: this.row, facing: (this.facing + 2) % 4 };
      this.enterLocation("showcase", 0, 0, 0);
    } else if (t.kind === "smithshop") {
      // FERREIRO: conversa (menu) — "Abrir a forja" + tópicos de missão + Sair
      this.talkNpc(ESTAB.smith.npc, ferreiroUrl, "smith");
    } else if (t.kind === "storeshop") {
      // MERCADOR: conversa (menu) — "Ver a mercadoria" + tópicos + Sair
      this.talkNpc(ESTAB.store.npc, mercadoraUrl, "store");
    } else if (t.kind === "alchshop") {
      // ALQUIMISTA: conversa (menu)
      this.talkNpc(ESTAB.alchemist.npc, alquimistaUrl, "alchemist");
    } else if (t.kind === "tavernshop") {
      // TAVERNA: conversa (menu) — beber/mural + tópicos + Sair
      this.talkNpc(ESTAB.tavern.npc, taverneiroUrl, "tavern");
    } else if (t.kind === "stash") {
      // BAÚ DE HEDDA: guarda/retira itens, materiais, armas e ouro
      this.stashMode = "deposit";
      this.ui.openStash(this.buildStashData());
    } else if (t.kind === "toforest") {
      // ao voltar, o jogador olha p/ dentro do vilarejo (oposto à trilha)
      this.returnTo = {
        col: this.col,
        row: this.row,
        facing: (this.facing + 2) % 4,
      };
      const p = forestFind("P");
      this.enterLocation("forest", p.col, p.row, 0);
    } else if (t.kind === "tovillage") {
      // volta sempre p/ logo dentro do vilarejo, olhando p/ o centro (norte),
      // com o portão às costas (evita reentrar sem querer na floresta)
      const g = findForestGate();
      this.enterLocation("village", g.col, g.row - 1, 0);
    } else if (t.kind === "sign") {
      const pages = paginate(t.lines);
      this.dialogue = { name: "Placa", lines: pages, idx: 0, portrait: null };
      this.ui.showDialogue("Placa", pages[0], null);
    } else if (t.kind === "pickup") {
      // item caído: abre o popup "Pegar" (do item à frente ou sob os pés)
      const d = this.drops.find((x) => x.item?.uid === t.uid || x.weapon?.uid === t.uid);
      if (d) this.openDropPopup(d);
    } else if (t.kind === "chest") {
      this.openChestStart(t.key); // chocalha e abre
    }
  }

  // abre um portão da masmorra: as duas folhas GIRAM nas dobradiças (não somem) e a
  // passagem é liberada. A animação roda no tick a partir de gateAnims.
  private openGate(key: string) {
    const g = this.gates.get(key);
    if (!g) return;
    // abre ~60° (não 90°): as folhas ficam bem VISÍVEIS/escancaradas em ângulo,
    // sem colar de perfil nas paredes (o que as faria "sumir" da vista no corredor).
    this.gateAnims.push({
      pivotL: g.pivotL, pivotR: g.pivotR, t0: this.now, dur: 620, to: 1.05, // ~60°
    });
    this.gates.delete(key); // deixa de ser "portão fechado" (não interage mais)
    this.blocked.delete(key); // agora a célula é andável (atravessa o vão)
  }

  // abre um diálogo (com falas paginadas). opts: botões de escolha na última
  // página, resposta a um botão e/ou callback ao fechar (encadeia ofertas etc.)
  // entra na masmorra num ANDAR específico (0 = 1º). Usado pela boca da masmorra
  // (novo/continuar) — guarda o ponto de volta ao vilarejo e surge à frente da escada.
  private enterDungeonFloor(floor: number, atCol?: number, atRow?: number): void {
    this.returnTo = { col: this.col, row: this.row, facing: (this.facing + 2) % 4 };
    this.dungeonFloor = Math.max(0, Math.min(DUNGEON_FLOOR_COUNT - 1, floor));
    this.dungeonMaxFloor = Math.max(this.dungeonMaxFloor, this.dungeonFloor);
    setDungeonFloor(this.dungeonFloor);
    // portal de retorno cai no ponto EXATO guardado; senão, à frente da escada 'U'.
    const p = (atCol != null && atRow != null)
      ? { col: atCol, row: atRow, facing: this.facing }
      : this.dungeonEntryAt("U", [0, 1]);
    if (this.dungeonFloor > 0) this.ui.toast(DUNGEON_FLOOR_NAMES[this.dungeonFloor]);
    this.enterLocation("dungeon", p.col, p.row, p.facing);
  }

  private openDialogue(
    name: string, rawLines: string[], portrait: string | null,
    opts?: { choices?: DialogueChoice[]; onChoice?: (id: string) => void; onClose?: () => void },
  ) {
    const lines = paginate(rawLines);
    this.dialogue = {
      name, lines, idx: 0, portrait,
      choices: opts?.choices, onChoice: opts?.onChoice, onClose: opts?.onClose,
    };
    this.showDialoguePage();
  }
  // fecha o diálogo atual e dispara o onClose (uma vez)
  private closeDialogue() {
    const d = this.dialogue;
    this.dialogue = null;
    this.ui.hideDialogue();
    d?.onClose?.();
  }
  // desenha a página atual; os botões de escolha só aparecem na ÚLTIMA página
  private showDialoguePage() {
    const d = this.dialogue;
    if (!d) return;
    const last = d.idx >= d.lines.length - 1;
    this.ui.showDialogue(d.name, d.lines[d.idx], d.portrait ?? null, last ? d.choices : undefined);
  }
  private advanceDialogue() {
    if (!this.dialogue) return;
    // com escolhas na última página, o toque não fecha — espera um botão
    const last = this.dialogue.idx >= this.dialogue.lines.length - 1;
    if (last && this.dialogue.choices?.length) return;
    this.dialogue.idx++;
    if (this.dialogue.idx >= this.dialogue.lines.length) this.closeDialogue();
    else this.showDialoguePage();
  }
  // clique num botão de escolha do diálogo
  private onDialogueChoice(id: string) {
    this.dialogue?.onChoice?.(id);
  }

  // ---------------------------------------------- interior de estabelecimento
  private box(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
  ): THREE.Mesh {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    this.world.add(m);
    return m;
  }

  // casca comum de qualquer interior (chão, teto, paredes, porta de saída).
  // floorSeed/wallSeed/ceilColor deixam a casa parecer diferente da loja.
  private buildRoomShell(floorSeed = 9, _wallSeed = 2, ceilColor = 0x4a3826) {
    const CEIL = 3.0;
    // chão de madeira (aconchegante) + PAREDES DE PEDRA com tom quente (parede
    // rebocada) — bem melhor que a madeira repetitiva de antes.
    const floorMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(floorSeed) });
    // PAREDES INTERNAS = MESMA alvenaria (tex_stonewall) e MESMA ESCALA da masmorra e
    // das fachadas → a casa é a mesma construção por dentro e por fora. Face 4×3.0 →
    // repeat (1, 0.75) mantém o mesmo tamanho de bloco (~0.25 telha/unidade).
    const wallMat = this.pbrStone(texStoneUrl, "introom", { rough: 0.92, normal: 1.3, repeat: [1, 0.75] });
    const ceilMat = new THREE.MeshLambertMaterial({ color: ceilColor, side: THREE.DoubleSide });
    // porta de saída = MESMO PNG das portas externas (dec_door.png)
    const doorMat = this.decalMat(decDoorUrl, 0.4);
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);

    for (let r = 0; r < ROOM_ROWS; r++)
      for (let c = 0; c < ROOM_COLS; c++) {
        if (!roomWalkable(c, r)) continue;
        const fl = new THREE.Mesh(tileGeo, floorMat);
        fl.rotation.x = -Math.PI / 2;
        fl.position.set(c * CELL, 0, r * CELL);
        this.world.add(fl);
        const ce = new THREE.Mesh(tileGeo, ceilMat);
        ce.rotation.x = Math.PI / 2;
        ce.position.set(c * CELL, CEIL, r * CELL);
        this.world.add(ce);
        for (const [dc, dr] of DIRS)
          if (roomChar(c + dc, r + dr) === "#")
            this.addWall(c * CELL, r * CELL, dc, dr, 0, CEIL, wallMat);
      }

    // porta de saída na parede sul da célula X (voltada p/ o interior)
    const x = roomFind("X");
    const exit = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_W, DOOR_H), doorMat);
    exit.position.set(x.col * CELL, DOOR_H / 2, x.row * CELL + CELL / 2 - 0.06);
    exit.rotation.y = Math.PI;
    this.world.add(exit);
    const exitSign = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 0.6),
      new THREE.MeshLambertMaterial({
        map: tex.signText("SAÍDA"),
        transparent: true,
        side: THREE.DoubleSide,
      }),
    );
    exitSign.position.set(x.col * CELL, DOOR_H + 0.5, x.row * CELL + CELL / 2 - 0.08);
    exitSign.rotation.y = Math.PI;
    this.world.add(exitSign);
  }

  // interior de uma casa de aldeão: casca + mobília aconchegante + moradores
  private buildHome(id: HomeId) {
    const CEIL = 3.0;
    this.buildRoomShell(9, 6, 0x3c2c1a);
    const wood = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const woodDk = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(7) });
    const stone = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    const cloth = new THREE.MeshLambertMaterial({ color: 0x6d4530 });
    const linen = new THREE.MeshLambertMaterial({ color: 0xcbb489 });

    // lareira acesa (parede oeste, célula 1,3) — coração da casa
    this.wallCell(1, 3, [-1, 0], (x, z) => this.buildHearth(x, z));
    // mesa central + dois bancos (a célula fica com colisão)
    const tcx = 3 * CELL;
    const tcz = 3 * CELL;
    this.blocked.add("3,3");
    this.box(tcx, 0.95, tcz, 1.7, 0.12, 1.1, wood); // tampo
    for (const [ox, oz] of [[-0.7, 0], [0.7, 0], [0, -0.5], [0, 0.5]] as [number, number][])
      this.box(tcx + ox * 0.9, 0.42, tcz + oz, 0.16, 0.84, 0.16, woodDk); // pernas
    this.box(tcx, 0.45, tcz - 0.95, 1.4, 0.12, 0.4, woodDk); // banco
    this.box(tcx, 0.45, tcz + 0.95, 1.4, 0.12, 0.4, woodDk); // banco
    // louça na mesa
    this.box(tcx - 0.4, 1.06, tcz, 0.22, 0.1, 0.22, linen);
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.22, 12), woodDk);
    pot.position.set(tcx + 0.35, 1.11, tcz);
    this.world.add(pot);
    // camas (parede leste)
    const beds = HOMES[id].residents.length >= 2 ? [[5, 2], [5, 4]] : [[5, 3]];
    for (const [bc, br] of beds as [number, number][]) {
      this.wallCell(bc, br, [1, 0], (x, z) => {
        this.box(x, 0.35, z, 0.9, 0.5, 1.9, woodDk); // estrado
        this.box(x, 0.66, z, 0.86, 0.16, 1.8, linen); // colchão
        this.box(x, 0.78, z - 0.7, 0.7, 0.18, 0.4, cloth); // travesseiro
      });
    }
    // prateleira com potes (parede norte)
    this.wallCell(2, 1, [0, -1], (x, z) => {
      this.box(x, 1.7, z, 1.6, 0.1, 0.4, wood);
      for (let i = -1; i <= 1; i++) {
        const j = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.28, 10), i === 0 ? woodDk : linen);
        j.position.set(x + i * 0.45, 1.9, z);
        this.world.add(j);
      }
    });
    // tapete no centro
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.6),
      new THREE.MeshLambertMaterial({ color: 0x7a3b2a }),
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(3 * CELL, 0.02, 3 * CELL + 0.2);
    this.world.add(rug);

    // luz central suave
    const lamp = new THREE.PointLight(0xffe0a8, 5.5, 30, 2);
    lamp.position.set(3 * CELL, CEIL - 0.4, 3 * CELL);
    this.world.add(lamp);

    // BAÚ da Hedda: só na casa dela (parede leste, célula 5,5). Guarda pertences.
    if (id === "hedda") {
      this.stashCell = { col: 5, row: 5 };
      this.blocked.add("5,5");
      const iron = new THREE.MeshLambertMaterial({ color: 0x2e2620 });
      this.wallCell(5, 5, [1, 0], (x, z) => {
        this.box(x, 0.34, z, 0.55, 0.58, 0.95, woodDk);        // corpo
        this.box(x, 0.68, z, 0.6, 0.16, 1.0, wood);            // tampa
        this.box(x, 0.5, z, 0.6, 0.66, 0.12, iron);            // faixa de ferro central
        this.box(x + 0.28, 0.5, z, 0.06, 0.66, 1.02, iron);    // cantoneira frontal
        this.glowLight(x + 0.9, 0.9, z, 0xffcf8a, 1.6, 6);     // leve destaque
      });
    }

    // moradores
    for (const m of HOMES[id].residents)
      this.addNPC(m.col, m.row, m.seed, m.name, m.lines, m.art, m.scale ?? 1);
  }

  private buildInterior(kind: Estab) {
    const CEIL = 3.0;
    const woodDark = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    this.buildRoomShell(9, 2, 0x4a3826);

    // balcão do atendente + atendente
    const n = roomFind("N");
    const cxN = n.col * CELL;
    const czN = n.row * CELL + CELL / 2 + 0.2; // balcão logo à frente do atendente
    this.box(cxN, 0.55, czN, CELL * 2.4, 1.1, 0.7, woodDark);
    this.box(cxN, 1.12, czN, CELL * 2.4 + 0.2, 0.14, 0.95, woodDark); // tampo
    const info = ESTAB[kind];
    this.addNPC(n.col, n.row, info.seed, info.npc, info.lines, NPC_ART[kind]);
    // luz quente sobre o balcão (destaca o atendente)
    const clight = new THREE.PointLight(0xffd49a, 4.5, 15, 2);
    clight.position.set(cxN, 2.5, n.row * CELL + 1.6);
    this.world.add(clight);

    // luz central (lampião)
    const lamp = new THREE.PointLight(0xffe0a8, 8, 34, 2);
    lamp.position.set(3 * CELL, CEIL - 0.3, 3 * CELL);
    this.world.add(lamp);
    this.box(
      3 * CELL,
      CEIL - 0.25,
      3 * CELL,
      0.4,
      0.3,
      0.4,
      new THREE.MeshBasicMaterial({ color: 0xffb85a }),
    );

    if (kind === "tavern") this.propsTavern();
    else if (kind === "store") this.propsStore();
    else if (kind === "smith") this.propsSmith();
    else this.propsAlchemist();
  }

  private glowLight(x: number, y: number, z: number, color: number, base: number, range: number) {
    const l = new THREE.PointLight(color, base, range, 2);
    l.position.set(x, y, z);
    this.world.add(l);
    this.flames.push({ light: l, base });
  }
  // textura de CHAMA (teardrop com gradiente quente e bordas suaves), gerada 1×
  private fireTex(): THREE.Texture {
    if (this._fireTex) return this._fireTex;
    const c = document.createElement("canvas");
    c.width = 64; c.height = 128;
    const g = c.getContext("2d")!;
    g.filter = "blur(3px)"; // bordas macias → cara de fogo no additive
    g.beginPath();
    g.moveTo(32, 6);
    g.bezierCurveTo(58, 52, 56, 112, 32, 124);
    g.bezierCurveTo(8, 112, 6, 52, 32, 6);
    g.closePath();
    const grd = g.createLinearGradient(0, 128, 0, 0);
    grd.addColorStop(0.0, "#fff6cc");
    grd.addColorStop(0.22, "#ffd23a");
    grd.addColorStop(0.5, "#ff7e17");
    grd.addColorStop(0.78, "#dc330a");
    grd.addColorStop(1.0, "rgba(110,8,0,0)");
    g.fillStyle = grd;
    g.fill();
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    this._fireTex = t;
    return t;
  }
  // lareira acesa (parede oeste da casa): pedra + toras + brasa + línguas de chama
  // animadas (aditivas, encaram a câmera) + luz que tremeluz.
  private buildHearth(x: number, z: number) {
    const stone = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    this.box(x, 1.2, z, 0.5, 2.4, 2.0, stone);                                   // corpo de pedra
    this.box(x + 0.3, 0.66, z, 0.14, 1.05, 1.55, new THREE.MeshBasicMaterial({ color: 0x120a05 })); // boca escura
    // toras cruzadas
    const logMat = new THREE.MeshLambertMaterial({ color: 0x2a1a0e });
    for (const rot of [0.6, -0.6]) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.2, 8), logMat);
      log.position.set(x + 0.44, 0.26, z);
      log.rotation.set(0, rot, Math.PI / 2);
      this.world.add(log);
    }
    // brasa: plano quente aditivo rente ao chão
    const ember = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 0.5),
      new THREE.MeshBasicMaterial({ color: 0xff5a12, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    ember.rotation.x = -Math.PI / 2;
    ember.position.set(x + 0.44, 0.14, z);
    this.world.add(ember);
    // línguas de chama (billboard + tremor no tick)
    const ftex = this.fireTex();
    for (const [dx, sc, ph] of [[-0.26, 0.78, 0], [0.02, 1.05, 1.7], [0.28, 0.72, 3.4]] as [number, number, number][]) {
      const fl = new THREE.Mesh(
        new THREE.PlaneGeometry(0.72 * sc, 1.2 * sc),
        new THREE.MeshBasicMaterial({ map: ftex, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
      );
      const baseY = 0.28 + 0.6 * sc;
      fl.position.set(x + 0.44 + dx, baseY, z);
      fl.userData = { phase: ph, baseY, h: 1.2 * sc };
      fl.renderOrder = 5;
      this.world.add(fl);
      this.fireFlames.push(fl);
    }
    this.glowLight(x + 1.2, 1.0, z, 0xff8a2e, 4.4, 11);
  }

  // coloca um prop numa célula encostado numa parede e dá colisão à célula
  private wallCell(
    col: number,
    row: number,
    wall: [number, number],
    make: (x: number, z: number) => void,
  ) {
    const x = col * CELL + wall[0] * (CELL / 2 - 0.75);
    const z = row * CELL + wall[1] * (CELL / 2 - 0.75);
    make(x, z);
    this.blocked.add(`${col},${row}`);
  }

  private propsTavern() {
    const wood = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const stone = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    const barrelMat = new THREE.MeshLambertMaterial({ map: tex.barrel(17) });
    const mug = new THREE.MeshLambertMaterial({ color: 0xcaa24a });
    // lareira (parede oeste)
    this.wallCell(1, 3, [-1, 0], (x, z) => {
      this.box(x, 1.1, z, 0.5, 2.2, 2.2, stone);
      this.box(x + 0.4, 0.6, z, 0.35, 0.8, 1.2, new THREE.MeshBasicMaterial({ color: 0xff7a1e }));
      this.glowLight(x + 1.3, 1.0, z, 0xff8a2e, 5, 11);
    });
    // barril
    this.wallCell(1, 2, [-1, 0], (x, z) => {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.44, 1.3, 14), barrelMat);
      b.position.set(x, 0.65, z);
      this.world.add(b);
    });
    // mesas com caneca (parede leste)
    for (const row of [2, 4])
      this.wallCell(5, row, [1, 0], (x, z) => {
        this.box(x, 0.9, z, 0.2, 1.0, 0.2, wood);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.15, 16), wood);
        top.position.set(x, 1.45, z);
        this.world.add(top);
        const m = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.28, 10), mug);
        m.position.set(x, 1.66, z);
        this.world.add(m);
      });
  }

  private propsStore() {
    const wood = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(3) });
    const goods = [0x8a3a3a, 0x3a5a8a, 0x4f7a3a, 0xb08a30, 0x7a3a7a];
    let k = 0;
    const shelf = (x: number, z: number, wallX: number) => {
      this.box(x, 1.05, z, 0.5, 2.1, 2.4, wood); // armário
      for (const sy of [0.7, 1.4]) // mercadorias em 2 níveis
        for (const dz of [-0.7, 0.7]) {
          const gm = new THREE.MeshLambertMaterial({ color: goods[k++ % goods.length] });
          this.box(x - wallX * 0.35, sy, z + dz, 0.4, 0.5, 0.5, gm);
        }
    };
    for (const row of [2, 3, 4]) this.wallCell(1, row, [-1, 0], (x, z) => shelf(x, z, -1));
    for (const row of [2, 3, 4]) this.wallCell(5, row, [1, 0], (x, z) => shelf(x, z, 1));
  }

  private propsSmith() {
    const iron = new THREE.MeshLambertMaterial({ color: 0x4a4e54 });
    const stone = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    const wood = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const barrelMat = new THREE.MeshLambertMaterial({ map: tex.barrel(17) });
    // fornalha (oeste)
    this.wallCell(1, 3, [-1, 0], (x, z) => {
      this.box(x, 1.0, z, 0.6, 2.0, 2.2, stone);
      this.box(x + 0.45, 1.0, z, 0.35, 0.5, 1.2, new THREE.MeshBasicMaterial({ color: 0xff6a12 }));
      this.glowLight(x + 1.3, 1.1, z, 0xff7a1e, 5.5, 11);
    });
    // bigorna sobre cepo (oeste)
    this.wallCell(1, 4, [-1, 0], (x, z) => {
      this.box(x, 0.45, z, 0.6, 0.9, 0.6, wood);
      this.box(x, 1.05, z, 0.5, 0.35, 1.0, iron);
    });
    // barril d'água (oeste)
    this.wallCell(1, 2, [-1, 0], (x, z) => {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.44, 1.2, 14), barrelMat);
      b.position.set(x, 0.6, z);
      this.world.add(b);
    });
    // suporte de armas (parede leste): lâminas verticais
    for (const row of [2, 3, 4])
      this.wallCell(5, row, [1, 0], (x, z) => {
        this.box(x, 1.0, z, 0.25, 2.0, 1.4, wood);
        for (const dz of [-0.4, 0.4]) {
          const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.5, 0.22), iron);
          blade.position.set(x - 0.2, 1.4, z + dz);
          this.world.add(blade);
        }
      });
  }

  private propsAlchemist() {
    const shelfMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(3) });
    const iron = new THREE.MeshLambertMaterial({ color: 0x3a3e44 });
    const cols = [0x40b070, 0x5060c0, 0xc04070, 0xc0a030, 0x9040c0];
    let k = 0;
    const shelf = (x: number, z: number, wallX: number) => {
      this.box(x, 1.05, z, 0.5, 2.1, 2.4, shelfMat);
      for (const sy of [0.7, 1.35, 2.0])
        for (const dz of [-0.7, 0.0, 0.7]) {
          const gm = new THREE.MeshLambertMaterial({ color: cols[k++ % cols.length] });
          const fr = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.36, 8), gm);
          fr.position.set(x - wallX * 0.32, sy, z + dz);
          this.world.add(fr);
        }
    };
    for (const row of [2, 3]) this.wallCell(1, row, [-1, 0], (x, z) => shelf(x, z, -1));
    for (const row of [2, 3]) this.wallCell(5, row, [1, 0], (x, z) => shelf(x, z, 1));
    // caldeirão borbulhante (canto oeste-fundo)
    this.wallCell(1, 4, [-1, 0], (x, z) => {
      const cauldron = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.48, 0.85, 16), iron);
      cauldron.position.set(x, 0.5, z);
      this.world.add(cauldron);
      const brew = new THREE.Mesh(
        new THREE.CylinderGeometry(0.53, 0.53, 0.1, 16),
        new THREE.MeshBasicMaterial({ color: 0x6bffa0 }),
      );
      brew.position.set(x, 0.92, z);
      this.world.add(brew);
      this.glowLight(x + 0.9, 1.2, z, 0x50ff9a, 3.2, 8);
    });
    // mesa com livros (leste-fundo)
    this.wallCell(5, 4, [1, 0], (x, z) => {
      this.box(x, 0.8, z, 0.9, 0.15, 1.6, shelfMat);
      this.box(x, 0.98, z + 0.3, 0.5, 0.16, 0.6, new THREE.MeshLambertMaterial({ color: 0x6a3a2a }));
    });
  }

  // Detecta sequências contíguas de casas expostas à rua numa direção e faz
  // UM telhado inclinado por sequência (telhado contínuo, sem frestas).
  private buildRoofs(mats: THREE.Material[]) {
    // sorteia um tom de palha por trecho de telhado (variação entre casas)
    const pick = (c: number, r: number) =>
      mats[Math.floor(Math.abs(this.mHash(c, r, 9)) * 997) % mats.length];
    const exposed = (c: number, r: number, dc: number, dr: number) => {
      if (cellAt(c, r) !== "building") return false;
      const k = cellAt(c + dc, r + dr);
      return k === "street" || k === "barrel";
    };
    // faces leste/oeste (dc=±1): trechos verticais (varia a linha)
    for (const dc of [1, -1]) {
      for (let c = 0; c < COLS; c++) {
        let r = 0;
        while (r < ROWS) {
          if (exposed(c, r, dc, 0)) {
            let r1 = r;
            while (r1 + 1 < ROWS && exposed(c, r1 + 1, dc, 0)) r1++;
            let depth = ROOF_DEPTH;
            for (let rr = r; rr <= r1; rr++)
              depth = Math.min(depth, this.depthInto(c, rr, -dc, 0));
            this.addRoofRun(c, r, c, r1, dc, 0, depth, pick(c, r));
            r = r1 + 1;
          } else r++;
        }
      }
    }
    // faces norte/sul (dr=±1): trechos horizontais (varia a coluna)
    for (const dr of [1, -1]) {
      for (let r = 0; r < ROWS; r++) {
        let c = 0;
        while (c < COLS) {
          if (exposed(c, r, 0, dr)) {
            let c1 = c;
            while (c1 + 1 < COLS && exposed(c1 + 1, r, 0, dr)) c1++;
            let depth = ROOF_DEPTH;
            for (let cc = c; cc <= c1; cc++)
              depth = Math.min(depth, this.depthInto(cc, r, 0, -dr));
            this.addRoofRun(c, r, c1, r, 0, dr, depth, pick(c, r));
            c = c1 + 1;
          } else c++;
        }
      }
    }
  }

  // quantas células de casa existem entrando no bloco (limitado a ROOF_DEPTH)
  private depthInto(c: number, r: number, ndc: number, ndr: number): number {
    let n = 0;
    while (n < ROOF_DEPTH && cellAt(c + ndc * n, r + ndr * n) === "building")
      n++;
    return Math.max(1, n);
  }

  private addRoofRun(
    c0: number,
    r0: number,
    c1: number,
    r1: number,
    dc: number,
    dr: number,
    depth: number,
    mat: THREE.Material,
  ) {
    const eaveY = WALL_H - 0.15;
    const ridgeY = WALL_H + ROOF_H;
    // Telhado de DUAS águas (fechado) cobrindo `depth` células p/ dentro da
    // casa: beiral da rua (baixo, com balanço) → cumeeira (alto, no meio da
    // casa) → beiral dos fundos (baixo). As pontas são tampadas por triângulos.
    const s0 = new THREE.Vector3();
    const s1 = new THREE.Vector3();
    const k0 = new THREE.Vector3();
    const k1 = new THREE.Vector3();
    const b0 = new THREE.Vector3();
    const b1 = new THREE.Vector3();
    let len: number;
    let frontLen: number; // comprimento da água frontal (p/ tiling em v)
    let backLen: number;
    // distância do centro da célula da fachada até o fundo coberto do telhado
    const backDist = depth * CELL - CELL / 2;
    if (dc !== 0) {
      // trecho vertical (varia z), inclina no eixo x
      const faceX = c0 * CELL + dc * (CELL / 2); // face externa da parede
      const streetX = faceX + dc * ROOF_OVER; // beiral sobre a rua
      const backX = c0 * CELL - dc * backDist; // beiral dos fundos
      const ridgeX = (streetX + backX) / 2; // cumeeira no meio
      const z0 = r0 * CELL - CELL / 2;
      const z1 = r1 * CELL + CELL / 2;
      s0.set(streetX, eaveY, z0);
      s1.set(streetX, eaveY, z1);
      k0.set(ridgeX, ridgeY, z0);
      k1.set(ridgeX, ridgeY, z1);
      b0.set(backX, eaveY, z0);
      b1.set(backX, eaveY, z1);
      len = r1 - r0 + 1;
      frontLen = Math.abs(streetX - ridgeX) / CELL + 0.5;
      backLen = Math.abs(ridgeX - backX) / CELL + 0.5;
    } else {
      // trecho horizontal (varia x), inclina no eixo z
      const faceZ = r0 * CELL + dr * (CELL / 2);
      const streetZ = faceZ + dr * ROOF_OVER;
      const backZ = r0 * CELL - dr * backDist;
      const ridgeZ = (streetZ + backZ) / 2;
      const x0 = c0 * CELL - CELL / 2;
      const x1 = c1 * CELL + CELL / 2;
      s0.set(x0, eaveY, streetZ);
      s1.set(x1, eaveY, streetZ);
      k0.set(x0, ridgeY, ridgeZ);
      k1.set(x1, ridgeY, ridgeZ);
      b0.set(x0, eaveY, backZ);
      b1.set(x1, eaveY, backZ);
      len = c1 - c0 + 1;
      frontLen = Math.abs(streetZ - ridgeZ) / CELL + 0.5;
      backLen = Math.abs(ridgeZ - backZ) / CELL + 0.5;
    }
    // água frontal (voltada p/ a rua) e água dos fundos
    this.world.add(this.quad(s0, s1, k1, k0, mat, len, frontLen));
    this.world.add(this.quad(k0, k1, b1, b0, mat, len, backLen));
    // tampas de empena (triângulos) nas duas pontas do trecho
    this.world.add(this.tri(s0, k0, b0, mat));
    this.world.add(this.tri(s1, b1, k1, mat));
    // borda de palha (beiral frontal) — dá espessura sobre a rua
    const s0d = s0.clone();
    s0d.y -= FASCIA;
    const s1d = s1.clone();
    s1d.y -= FASCIA;
    this.world.add(this.quad(s0d, s1d, s1, s0, mat, len, 0.3));
  }

  private tri(
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    mat: THREE.Material,
  ): THREE.Mesh {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z]),
        3,
      ),
    );
    g.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0.5, 1]), 2),
    );
    g.setIndex([0, 1, 2]);
    g.computeVertexNormals();
    return new THREE.Mesh(g, mat);
  }

  // material de decalque (PNG transic. c/ alpha) — alphaTest evita halo/ordenação
  private decalMat(url: string, aTest = 0.35): THREE.MeshLambertMaterial {
    const m = new THREE.MeshLambertMaterial({
      transparent: true,
      alphaTest: aTest,
      side: THREE.DoubleSide,
    });
    // invisível (nem cor nem profundidade) até a textura chegar → sem "retângulo
    // branco" enquanto carrega.
    m.colorWrite = false;
    m.depthWrite = false;
    this.loadArt(url, (t) => {
      m.map = t;
      m.colorWrite = true;
      m.depthWrite = true;
      m.needsUpdate = true;
    });
    return m;
  }

  // plano decorativo na face da parede (tamanho/altura livres). encara p/ fora.
  private addWallDecal(
    c: number,
    r: number,
    dc: number,
    dr: number,
    mat: THREE.Material,
    w: number,
    h: number,
    y: number,
  ) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    plane.position.set(
      c * CELL + dc * (CELL / 2 + 0.05),
      y,
      r * CELL + dr * (CELL / 2 + 0.05),
    );
    plane.rotation.y =
      dc === 1 ? Math.PI / 2 : dc === -1 ? -Math.PI / 2 : dr === 1 ? 0 : Math.PI;
    plane.renderOrder = 4; // desenha depois da parede
    this.world.add(plane);
    return plane;
  }

  private addDecal(
    c: number,
    r: number,
    dc: number,
    dr: number,
    mat: THREE.Material,
    kind: "door" | "window",
  ) {
    const w = kind === "door" ? DOOR_W : WIN_W;
    const h = kind === "door" ? DOOR_H : WIN_H;
    const y = kind === "door" ? h / 2 : WIN_Y; // porta encosta o pé no chão (y=0)
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    const fx = c * CELL + dc * (CELL / 2 + 0.04);
    const fz = r * CELL + dr * (CELL / 2 + 0.04);
    plane.position.set(fx, y, fz);
    // orientar a face para fora (normal = dir)
    if (dc === 1) plane.rotation.y = Math.PI / 2;
    else if (dc === -1) plane.rotation.y = -Math.PI / 2;
    else if (dr === 1) plane.rotation.y = 0;
    else plane.rotation.y = Math.PI;
    this.world.add(plane);
  }

  private quad(
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    d: THREE.Vector3,
    mat: THREE.Material,
    uRep = 1,
    vRep = 1,
  ): THREE.Mesh {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array([
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z,
      d.x, d.y, d.z,
    ]);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute(
      "uv",
      new THREE.BufferAttribute(
        new Float32Array([0, 0, uRep, 0, uRep, vRep, 0, vRep]),
        2,
      ),
    );
    g.setIndex([0, 1, 2, 0, 2, 3]);
    g.computeVertexNormals();
    return new THREE.Mesh(g, mat);
  }

  // ------------------------------------------------------------- input
  private onAction(a: Action) {
    if (this.waking || this.introWalk) return; // travado durante o acordar / a Hedda chegar
    // diálogo aberto: interagir avança/fecha; o resto é ignorado
    if (this.dialogue) {
      if (a === "interact") this.advanceDialogue();
      return;
    }
    if (a === "interact") {
      this.doInteract();
      return;
    }
    if (a === "attack") {
      // golpe é independente do movimento (pode golpear andando). Cada arma tem
      // sua cadência/animação; swingWeapon devolve o instante do impacto (ou -1
      // se está em recarga) p/ o dano cair exatamente no auge do golpe.
      const impactMs = this.ui.swingWeapon();
      if (impactMs >= 0) window.setTimeout(() => this.tryHitEnemy(), impactMs);
      return;
    }
    if (this.anim) return; // ignora enquanto anima (o hold-repeat cuida da continuidade)
    // na ESCADA (showIdx>=0): movimento por estações. No TERRAÇO (showIdx<0): cai no
    // movimento NORMAL em grade abaixo (vira, anda livre), com volta pra escada na boca.
    if (this.location === "showcase" && this.showIdx >= 0) { this.showcaseStationMove(a); return; }
    if (a === "turnLeft" || a === "turnRight") {
      const d = a === "turnLeft" ? 1 : -1;
      this.facing = (this.facing + (d === 1 ? 3 : 1)) % 4;
      this.pushMinimap();
      this.anim = {
        kind: "turn",
        t0: performance.now(),
        fromY: this.camera.rotation.y,
        toY: this.camera.rotation.y + (Math.PI / 2) * d,
      };
      return;
    }
    // movimento
    let fi = this.facing;
    if (a === "back") fi = (fi + 2) % 4;
    else if (a === "strafeLeft") fi = (fi + 3) % 4;
    else if (a === "strafeRight") fi = (fi + 1) % 4;
    const [dc, dr] = DIRS[fi];
    const nc = this.col + dc;
    const nr = this.row + dr;
    // terraço: pisar na "boca" (leste) volta pra escada (modo estações, descendo)
    if (this.location === "showcase" && isMouth(nc, nr)) { this.enterStairsFromTerrace(); return; }
    // masmorra: pisar no PÉ DA ESCADARIA → loading → sala-vitrine (ao pé da hélice)
    if (this.location === "dungeon" && dungeonCell(nc, nr) === "sanctuary" && this.canWalk(nc, nr)) {
      this.showcaseReturn = { loc: "dungeon", col: this.col, row: this.row, facing: this.facing };
      this.enterLocation("showcase", 0, 0, 0);
      return;
    }
    if (!this.canWalk(nc, nr)) return;
    this.anim = {
      kind: "move",
      t0: performance.now(),
      fromX: this.col * CELL,
      fromZ: this.row * CELL,
      toX: nc * CELL,
      toZ: nr * CELL,
      fromY: this.floorYAt(this.col, this.row),
      toY: this.floorYAt(nc, nr),
    };
    this.col = nc;
    this.row = nr;
    this.pushMinimap();
    // ao entrar numa célula com árvore, "roça" a folhagem (vinheta esverdeada)
    if (this.location === "forest" && forestCell(nc, nr) === "tree")
      this.brushFoliage();
  }

  // efeito sutil de atravessar a folhagem de uma árvore
  private brushFoliage() {
    const el = this.foliageFx;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "0.55";
    // força reflow p/ o fade valer
    void el.offsetWidth;
    el.style.transition = "opacity 620ms ease-out";
    el.style.opacity = "0";
  }

  // fase da rotina (dia/noite) com histerese: evita ficar oscilando no limiar.
  // Ao anoitecer manda todos p/ o destino noturno; ao amanhecer, de volta ao dia.
  private updateNpcPhase(now: number): boolean {
    const t = (now / DAY_MS + DAY_START) % 1;
    const lum = this.daylight(t);
    if (!this.npcNight && lum < 0.26) {
      this.npcNight = true;
      this.staggerDepart(now); // saem escalonados p/ a taverna/casa/ronda
    } else if (this.npcNight && lum > 0.44) {
      this.npcNight = false;
      this.staggerDepart(now); // voltam escalonados ao posto de dia
    }
    return this.npcNight;
  }

  // faz os aldeões partirem em fila (não todos de uma vez) — movimento harmônico
  private staggerDepart(now: number) {
    this.walkers.forEach((w, i) => {
      w.waitUntil = Math.max(w.waitUntil, now + i * 650);
    });
  }

  // deslocamento p/ ENCOSTAR o aldeão na parede/prédio vizinho (ninguém fica
  // parado no meio do nada). Procura uma casa/montanha adjacente e empurra p/ lá.
  private wallLean(c: number, r: number): { x: number; z: number } {
    const L = 1.3; // quão perto da parede o NPC encosta (unidades)
    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const [dc, dr] of dirs) {
      const k = cellAt(c + dc, r + dr);
      if (k === "building" || k === "mountain")
        return { x: dc * L, z: dr * L };
    }
    return { x: 0, z: 0 };
  }

  // se a célula (posto noturno) fica em frente a uma PORTA (loja ou lar), devolve
  // a direção da porta (do NPC p/ dentro do prédio); senão null (vigia/oração ao
  // relento não têm porta e ficam parados como antes).
  private nightDoorDir(cell: { c: number; r: number }): { dc: number; dr: number } | null {
    const dirs = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
    ];
    for (const [dc, dr] of dirs) {
      const bc = cell.c + dc, br = cell.r + dr;
      if (cellAt(bc, br) !== "building") continue;
      // porta nesse prédio voltada de volta p/ a célula: normal = (-dc,-dr)
      const key = `${bc},${br},${-dc},${-dr}`;
      if (this.doorMap.has(key) || this.homeDoorMap.has(key)) return { dc, dr };
    }
    return null;
  }

  // opacidade do aldeão (mesh + sombra + plaquinha) durante entrar/sair pela porta
  private setWalkerOpacity(
    w: { mesh: THREE.Mesh; shadow: THREE.Mesh; tag: THREE.Sprite },
    op: number,
  ) {
    const m = w.mesh.material as THREE.MeshLambertMaterial;
    // durante o fade baixamos o alphaTest (senão o sprite some de vez em ~0.5)
    const at = op >= 0.99 ? 0.5 : 0.02;
    if (m.alphaTest !== at) {
      m.alphaTest = at;
      m.needsUpdate = true;
    }
    m.opacity = op;
    (w.shadow.material as THREE.MeshBasicMaterial).opacity = 0.55 * op;
    (w.tag.material as THREE.SpriteMaterial).opacity = op;
  }
  private setWalkerVisible(
    w: { mesh: THREE.Mesh; shadow: THREE.Mesh; tag: THREE.Sprite },
    vis: boolean,
  ) {
    w.mesh.visible = vis;
    w.shadow.visible = vis;
    w.tag.visible = vis;
  }

  // célula andável para os aldeões: a praça (cols 2–12 / linhas 6–12, sem o poço)
  // MAIS o corredor da entrada sul (cols 6–8 / linhas 13–14), posto do vigia.
  // Mantém os aldeões na cidade (não sobem o túnel nem saem pela trilha ao sul).
  private plazaWalkable(c: number, r: number): boolean {
    if (c === WELL.c && r === WELL.r) return false;
    if (this.blocked.has(`${c},${r}`)) return false; // poço, props da praça etc.
    const inPlaza = r >= 6 && r <= 12 && c >= 2 && c <= 12;
    const inEntrance = r >= 13 && r <= 14 && c >= 6 && c <= 8;
    if (!inPlaza && !inEntrance) return false;
    return isWalkable(c, r);
  }

  // sorteia o próximo ponto de perambulação DIURNA: às vezes volta ao posto,
  // às vezes uma célula andável perto dele (dentro do raio). Mantém o aldeão na
  // sua "área" (o costureiro perto do ateliê, o vigia perto da entrada etc).
  private pickDayRoam(w: { dayCell: { c: number; r: number }; roamRadius: number }): { c: number; r: number } {
    const R = w.roamRadius;
    if (R <= 0) return { c: w.dayCell.c, r: w.dayCell.r };
    // ~40% das vezes retorna ao posto (não fica só vagando longe)
    if (Math.random() < 0.4) return { c: w.dayCell.c, r: w.dayCell.r };
    for (let tries = 0; tries < 14; tries++) {
      const dc = Math.round((Math.random() * 2 - 1) * R);
      const dr = Math.round((Math.random() * 2 - 1) * R);
      if (dc === 0 && dr === 0) continue;
      const c = w.dayCell.c + dc, r = w.dayCell.r + dr;
      if (this.plazaWalkable(c, r)) return { c, r };
    }
    return { c: w.dayCell.c, r: w.dayCell.r };
  }

  // célula livre p/ o aldeão pisar agora. IMPORTANTE: os aldeões NÃO colidem entre
  // si durante a rotina — vários compartilham o mesmo destino (ex.: 3 vão à porta
  // da taverna) e o BFS ignora a ocupação, então tratar outro NPC como bloqueio
  // fazia dois se esperarem pra sempre (travava a ida pra casa ao anoitecer). Eles
  // passam um pelo outro (aldeões de fundo) — só evitam parede/poço e a câmera do
  // jogador (pra não atravessar a tela em 1ª pessoa).
  private cellFreeForWalker(c: number, r: number, _self: object): boolean {
    if (!this.plazaWalkable(c, r)) return false;
    if (c === this.col && r === this.row) return false;
    return true;
  }

  // BFS na praça: devolve o PRÓXIMO passo de 'from' rumo a 'goal' (ou null).
  private bfsNextStep(
    from: { c: number; r: number },
    goal: { c: number; r: number },
  ): { c: number; r: number } | null {
    const K = (c: number, r: number) => c + "," + r;
    if (from.c === goal.c && from.r === goal.r) return null;
    const prev = new Map<string, { c: number; r: number } | null>();
    prev.set(K(from.c, from.r), null);
    const q: { c: number; r: number }[] = [from];
    let head = 0;
    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];
    let found = false;
    while (head < q.length) {
      const cur = q[head++];
      if (cur.c === goal.c && cur.r === goal.r) {
        found = true;
        break;
      }
      for (const [dc, dr] of dirs) {
        const nc = cur.c + dc, nr = cur.r + dr, k = K(nc, nr);
        if (prev.has(k)) continue;
        const isGoal = nc === goal.c && nr === goal.r;
        if (!isGoal && !this.plazaWalkable(nc, nr)) continue;
        prev.set(k, cur);
        q.push({ c: nc, r: nr });
      }
    }
    if (!found && !prev.has(K(goal.c, goal.r))) return null;
    // reconstrói de trás p/ frente até o passo logo após 'from'
    let node = goal;
    for (let guard = 0; guard < 400; guard++) {
      const p = prev.get(K(node.c, node.r));
      if (!p) return null;
      if (p.c === from.c && p.r === from.r) return node;
      node = p;
    }
    return null;
  }

  // rotina dos aldeões: caminham (passo a passo) do posto de dia ao destino
  // noturno e de volta, conforme a hora. Nunca teletransportam.
  private updateWalkers(now: number) {
    if (this.walkers.length === 0) return;
    if (this.dialogue) return; // parados durante o diálogo
    const WALK_MS = 900;
    const TRANS_MS = 640; // atravessar a porta (entrar/sair)
    const night = this.updateNpcPhase(now);
    for (const w of this.walkers) {
      // transição: atravessando a porta (entra ao anoitecer, sai ao amanhecer)
      if (w.trans) {
        const p = Math.min(1, (now - w.trans.t0) / TRANS_MS);
        const e = p * p * (3 - 2 * p);
        const x = w.trans.fromX + (w.trans.toX - w.trans.fromX) * e;
        const z = w.trans.fromZ + (w.trans.toZ - w.trans.fromZ) * e;
        w.mesh.position.x = x;
        w.mesh.position.z = z;
        w.shadow.position.x = x;
        w.shadow.position.z = z;
        w.tag.position.x = x;
        w.tag.position.z = z;
        this.setWalkerOpacity(w, w.trans.kind === "enter" ? 1 - e : e);
        if (p >= 1) {
          if (w.trans.kind === "enter") {
            w.inside = true;
            this.setWalkerVisible(w, false); // recolhido dentro do prédio
          } else {
            this.setWalkerOpacity(w, 1); // saiu: restaura opacidade/alphaTest
            w.mesh.position.set(w.toX, w.baseY, w.toZ);
            w.shadow.position.set(w.toX, 0.03, w.toZ);
            w.dayGoal = { c: w.dayCell.c, r: w.dayCell.r }; // volta ao posto e então perambula
          }
          w.trans = null;
        }
        continue;
      }
      // recolhido: aguarda o amanhecer p/ sair pela porta
      if (w.inside) {
        if (!night) {
          const dir = w.doorDir ?? this.nightDoorDir(w.nightCell);
          const lean = this.wallLean(w.nightCell.c, w.nightCell.r);
          const nx = w.nightCell.c * CELL + lean.x;
          const nz = w.nightCell.r * CELL + lean.z;
          const doorX = w.nightCell.c * CELL + (dir?.dc ?? 0) * (CELL / 2 + 0.2);
          const doorZ = w.nightCell.r * CELL + (dir?.dr ?? 0) * (CELL / 2 + 0.2);
          this.setWalkerVisible(w, true);
          this.setWalkerOpacity(w, 0);
          w.mesh.position.set(doorX, w.baseY, doorZ);
          w.trans = { kind: "exit", t0: now, fromX: doorX, fromZ: doorZ, toX: nx, toZ: nz };
        }
        continue;
      }
      // parado num papo com outro aldeão: fica no lugar até a conversa acabar
      if (w.talking) continue;
      if (w.moving) {
        const p = Math.min(1, (now - w.t0) / WALK_MS);
        const e = p * p * (3 - 2 * p);
        // interpola em coords do mundo (o destino já traz o "encoste" na parede)
        const x = w.fromX + (w.toX - w.fromX) * e;
        const z = w.fromZ + (w.toZ - w.fromZ) * e;
        w.mesh.position.x = x;
        w.mesh.position.z = z;
        w.mesh.position.y = w.baseY + Math.sin(p * Math.PI) * 0.05; // leve balanço
        w.shadow.position.x = x;
        w.shadow.position.z = z;
        w.tag.position.x = x; // a plaquinha de nome acompanha o NPC
        w.tag.position.z = z;
        if (p >= 1) {
          w.moving = false;
          w.mesh.position.y = w.baseY;
          // pausa curta e variada entre passos (andar humano, não robótico)
          w.waitUntil = now + 240 + ((w.cur.c * 37 + w.cur.r * 17) % 220);
        }
      } else if (now >= w.waitUntil) {
        // à noite o alvo é o destino noturno; de dia é o ponto de perambulação
        const goal = night ? w.nightCell : w.dayGoal;
        if (w.cur.c === goal.c && w.cur.r === goal.r) {
          // chegou ao posto. À noite, se o posto tem PORTA, atravessa e recolhe-se.
          if (night) {
            if (w.doorDir === undefined) w.doorDir = this.nightDoorDir(w.nightCell);
            if (w.doorDir) {
              const doorX = w.nightCell.c * CELL + w.doorDir.dc * (CELL / 2 + 0.2);
              const doorZ = w.nightCell.r * CELL + w.doorDir.dr * (CELL / 2 + 0.2);
              w.trans = {
                kind: "enter", t0: now,
                fromX: w.mesh.position.x, fromZ: w.mesh.position.z,
                toX: doorX, toZ: doorZ,
              };
              continue;
            }
            w.waitUntil = now + 500; // ronda/vigília sem porta: descansa no posto
            continue;
          }
          // DIA: pausa mais longa e variada no ponto, depois sorteia o próximo
          // destino de perambulação perto do posto (dá "vida" sem ser frenético).
          w.dayGoal = this.pickDayRoam(w);
          w.waitUntil = now + 2600 + ((w.cur.c * 53 + w.cur.r * 29) % 3800);
          continue;
        }
        const step = this.bfsNextStep(w.cur, goal);
        if (!step) {
          w.waitUntil = now + 500;
          continue;
        }
        if (!this.cellFreeForWalker(step.c, step.r, w)) {
          w.waitUntil = now + 300; // caminho ocupado: espera e tenta de novo
          continue;
        }
        // move a entrada DESTE walker no npcMap p/ a nova célula (diálogo é por
        // célula). Só apaga a célula de origem se ela ainda aponta p/ a MINHA
        // entrada — quando dois se sobrepõem, não removo a entrada do outro.
        const tk = `${step.c},${step.r}`;
        if (this.npcMap.get(w.key) === w.entry) this.npcMap.delete(w.key);
        this.npcMap.set(tk, w.entry);
        // no ÚLTIMO passo (chegando ao posto) já encosta na parede; nos passos
        // intermediários anda pelo centro das células.
        const isGoal = step.c === goal.c && step.r === goal.r;
        const lean = isGoal ? this.wallLean(step.c, step.r) : { x: 0, z: 0 };
        w.fromX = w.mesh.position.x;
        w.fromZ = w.mesh.position.z;
        w.toX = step.c * CELL + lean.x;
        w.toZ = step.r * CELL + lean.z;
        w.from = { c: w.cur.c, r: w.cur.r };
        w.to = step;
        w.cur = step;
        w.key = tk;
        w.moving = true;
        w.t0 = now;
      }
    }
  }

  // ====================================================== BALÕES DE FALA / PAPO
  // textura de um balão de fala (parchemim escuro + rabicho), com quebra de linha
  private makeBubbleTexture(text: string): { tex: THREE.Texture; w: number; h: number } {
    const fontPx = 34;
    const font = `600 ${fontPx}px "Cinzel", "MedievalSharp", system-ui, serif`;
    const meas = document.createElement("canvas").getContext("2d")!;
    meas.font = font;
    // quebra em linhas de no máx ~15 caracteres (por palavra)
    const words = text.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const t = cur ? cur + " " + w : w;
      if (t.length > 16 && cur) { lines.push(cur); cur = w; } else cur = t;
    }
    if (cur) lines.push(cur);
    const pad = 22, lh = fontPx + 8, tail = 16;
    const tw = Math.max(...lines.map((l) => Math.ceil(meas.measureText(l).width)));
    const W = tw + pad * 2;
    const bodyH = lines.length * lh + pad;
    const H = bodyH + tail;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d")!;
    const rr = 16;
    // corpo (retângulo arredondado)
    ctx.beginPath();
    ctx.moveTo(rr, 0);
    ctx.arcTo(W, 0, W, bodyH, rr);
    ctx.arcTo(W, bodyH, 0, bodyH, rr);
    ctx.arcTo(0, bodyH, 0, 0, rr);
    ctx.arcTo(0, 0, W, 0, rr);
    ctx.closePath();
    // rabicho apontando p/ baixo (em direção ao NPC)
    ctx.moveTo(W / 2 - tail, bodyH - 1);
    ctx.lineTo(W / 2, H);
    ctx.lineTo(W / 2 + tail, bodyH - 1);
    ctx.closePath();
    ctx.fillStyle = "rgba(18,14,10,0.86)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(201,162,39,0.72)";
    ctx.stroke();
    // texto
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    lines.forEach((l, i) => {
      const y = pad / 2 + lh * (i + 0.5);
      ctx.lineWidth = 5; ctx.strokeStyle = "rgba(0,0,0,0.8)";
      ctx.strokeText(l, W / 2, y);
      ctx.fillStyle = "#f2e0ac"; ctx.fillText(l, W / 2, y);
    });
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    return { tex, w: W, h: H };
  }

  // mostra um balão acima de um objeto que o segue (a plaquinha de nome do NPC).
  // Um NPC só exibe um balão por vez (remove o anterior).
  private showBubble(follow: THREE.Object3D, text: string, ttl = 3200) {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      if (this.bubbles[i].follow === follow) {
        this.world.remove(this.bubbles[i].spr);
        (this.bubbles[i].spr.material as THREE.Material).dispose();
        this.bubbles.splice(i, 1);
      }
    }
    const { tex, w, h } = this.makeBubbleTexture(text);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, opacity: 0 }));
    const hWorld = 0.62;
    spr.scale.set(hWorld * (w / h), hWorld, 1);
    spr.renderOrder = 20;
    this.world.add(spr);
    this.bubbles.push({ spr, follow, offY: 0.62, bornAt: this.now, ttl });
  }

  // reposiciona/fade dos balões; remove os vencidos ou de NPCs que sumiram
  private updateBubbles(now: number) {
    if (!this.bubbles.length) return;
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      const age = now - b.bornAt;
      const gone = age >= b.ttl || !b.follow.visible;
      if (gone) {
        this.world.remove(b.spr);
        (b.spr.material as THREE.Material).dispose();
        this.bubbles.splice(i, 1);
        continue;
      }
      b.spr.position.set(b.follow.position.x, b.follow.position.y + b.offY, b.follow.position.z);
      // fade in (180ms) e fade out (últimos 300ms)
      const fin = Math.min(1, age / 180);
      const fout = Math.min(1, (b.ttl - age) / 300);
      (b.spr.material as THREE.SpriteMaterial).opacity = Math.min(fin, fout);
    }
  }

  // papo dos aldeões: progride conversas ativas, forma novos pares e solta falas
  // ambiente soltas. Só de DIA e no vilarejo (à noite estão se recolhendo).
  private updateNpcChatter(now: number) {
    if (this.location !== "village" || this.dialogue) return;
    // 1) progride conversas em andamento (troca de falas alternada)
    for (let i = this.convos.length - 1; i >= 0; i--) {
      const c = this.convos[i];
      if (now < c.nextAt) continue;
      if (c.idx >= c.lines.length) {
        c.a.talking = false; c.b.talking = false;
        c.a.waitUntil = now + 500; c.b.waitUntil = now + 500;
        c.a.talkCooldownUntil = now + 22000; c.b.talkCooldownUntil = now + 22000;
        this.convos.splice(i, 1);
        continue;
      }
      const speaker = c.idx % 2 === 0 ? c.a : c.b;
      const text = c.lines[c.idx];
      const dur = Math.max(2200, text.length * 70);
      this.showBubble(speaker.tag, text, dur + 250);
      c.nextAt = now + dur + 350;
      c.idx++;
    }
    // 2) forma novos pares (dois aldeões próximos e parados começam a conversar)
    if (now >= this.nextTalkCheckAt) {
      this.nextTalkCheckAt = now + 2500;
      this.tryStartConversation(now);
    }
    // 3) fala ambiente solo (de vez em quando, num aldeão visível qualquer)
    if (now >= this.nextChatterAt) {
      this.nextChatterAt = now + 6500 + Math.floor(Math.random() * 7000);
      const avail = this.walkers.filter(
        (w) => !w.inside && !w.talking && w.mesh.visible && now >= w.talkCooldownUntil,
      );
      if (avail.length) {
        const w = avail[Math.floor(Math.random() * avail.length)];
        this.showBubble(w.tag, NPC_CHATTER[Math.floor(Math.random() * NPC_CHATTER.length)]);
        w.talkCooldownUntil = now + 12000;
      }
    }
  }

  // tenta iniciar uma conversa entre dois aldeões adjacentes, parados e livres
  private tryStartConversation(now: number) {
    if (this.convos.length >= 1) return; // uma conversa por vez (não polui a praça)
    const free = this.walkers.filter(
      (w) => !w.inside && !w.talking && !w.moving && w.mesh.visible && now >= w.talkCooldownUntil,
    );
    for (let i = 0; i < free.length; i++)
      for (let j = i + 1; j < free.length; j++) {
        const a = free[i], b = free[j];
        const d = Math.max(Math.abs(a.cur.c - b.cur.c), Math.abs(a.cur.r - b.cur.r));
        if (d > 1) continue;
        if (Math.random() > 0.7) continue; // nem todo encontro vira papo
        a.talking = true; b.talking = true;
        a.moving = false; b.moving = false;
        const lines = NPC_TALKS[Math.floor(Math.random() * NPC_TALKS.length)];
        this.convos.push({ a, b, lines, idx: 0, nextAt: now + 250 });
        return;
      }
  }

  // envelope à prova de falhas: o setAnimationLoop do three.js PARA de agendar o
  // próximo quadro se o callback lançar exceção (o requestAnimationFrame vem
  // DEPOIS da chamada) — ou seja, um erro solto CONGELA o jogo inteiro. Aqui a
  // gente captura, loga uma vez e mantém o laço vivo (ainda renderiza a cena).
  private tick(now: number) {
    try {
      this.frame(now);
    } catch (e) {
      if (!this.tickErrLogged) { this.tickErrLogged = true; console.error("[grimhollow] erro no quadro:", e); }
      try { this.renderScene(); } catch { /* ignora */ }
    }
  }
  // render com pós-processamento (bloom) quando disponível; senão, render direto
  private renderScene() {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }
  private tickErrLogged = false;
  private frame(now: number) {
    this.now = now;
    // SEQUÊNCIA DE ACORDAR (toda por QUADRO): 1) deitado olhando o teto, piscando
    // (pálpebras); 2) levanta (câmera sobe e o olhar baixa do teto p/ a frente).
    if (this.waking) {
      if (this.wakeStart < 0) this.wakeStart = now;
      const el = now - this.wakeStart;
      const fy = this.floorYAt(this.col, this.row);
      if (el < Game.BLINK_MS) {
        // deitado; leve balanço groggy da cabeça + piscar das pálpebras
        this.camera.position.y = fy + Game.LIE_Y + Math.sin(now * 0.0016) * 0.015;
        this.camera.rotation.x = Game.LIE_PITCH + Math.sin(now * 0.0011) * 0.02;
        this.ui.wakeEyelids(this.wakeEyelidCover(el));
      } else if (el < Game.BLINK_MS + Game.WAKE_MS) {
        this.ui.wakeEyelids(0); // olhos abertos
        const p = (el - Game.BLINK_MS) / Game.WAKE_MS;
        const e = p * p * (3 - 2 * p); // smoothstep
        this.camera.position.y = fy + Game.LIE_Y + (EYE_H - Game.LIE_Y) * e;
        this.camera.rotation.x = Game.LIE_PITCH * (1 - e); // baixa o olhar do teto p/ a frente
      } else {
        this.waking = false;
        this.ui.wakeEyelids(0);
        this.camera.position.y = fy + EYE_H;
        this.camera.rotation.x = 0;
        this.startWakeDialogue();
      }
      this.renderScene();
      return;
    }
    // REGENERAÇÃO DE VIDA (baixa): cura um fiapo por segundo fora da luta. Acumula
    // a fração até fechar 1 HP. dt limitado p/ não dar salto após aba em segundo plano.
    if (this.lastNow < 0) this.lastNow = now;
    const dtReg = Math.min(0.1, (now - this.lastNow) / 1000);
    this.lastNow = now;
    if (this.playerHp > 0 && this.playerHp < this.playerMaxHp && this.sec.regen > 0) {
      this.hpRegenAcc += this.sec.regen * dtReg;
      if (this.hpRegenAcc >= 1) {
        const heal = Math.floor(this.hpRegenAcc);
        this.hpRegenAcc -= heal;
        this.playerHp = Math.min(this.playerMaxHp, this.playerHp + heal);
        this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
      }
    }
    const an = this.anim;
    if (an) {
      if (an.kind === "move") {
        const p = Math.min(1, (now - an.t0) / MOVE_MS);
        const e = p * p * (3 - 2 * p); // smoothstep
        this.camera.position.x = an.fromX + (an.toX - an.fromX) * e;
        this.camera.position.z = an.fromZ + (an.toZ - an.fromZ) * e;
        // altura do piso interpola (sobe/desce escadas) + "bob" do passo
        const fy = an.fromY + (an.toY - an.fromY) * e;
        this.camera.position.y = fy + EYE_H + Math.sin(p * Math.PI) * 0.07;
        // hélice: a câmera GIRA acompanhando a curva (yaw interpola junto)
        if (an.fromYaw !== undefined && an.toYaw !== undefined)
          this.camera.rotation.y = an.fromYaw + (an.toYaw - an.fromYaw) * e;
        if (p >= 1) {
          this.camera.position.y = an.toY + EYE_H;
          if (an.toYaw !== undefined) this.camera.rotation.y = an.toYaw;
          this.anim = null;
          this.onArriveCell(); // pisou numa célula: recolhe ouro / abre popup de item caído
        }
      } else {
        const p = Math.min(1, (now - an.t0) / TURN_MS);
        const e = p * p * (3 - 2 * p);
        this.camera.rotation.y = an.fromY + (an.toY - an.fromY) * e;
        if (p >= 1) this.anim = null;
      }
    }
    // aldeões sempre encaram a câmera (billboard no eixo Y) + "respiram"
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    // tocha do herói segue a câmera (leve tremeluzir p/ dar vida à chama)
    if (this.playerTorch) {
      this.playerTorch.position.set(cx, this.camera.position.y + 0.2, cz);
      this.playerTorch.intensity = 2.4 + Math.sin(now * 0.009) * 0.18 + Math.sin(now * 0.021) * 0.1;
    }
    for (const npc of this.npcs) {
      npc.rotation.y = Math.atan2(cx - npc.position.x, cz - npc.position.z);
      const u = npc.userData as { baseY?: number; h?: number; ph?: number };
      if (u && u.h) {
        // respiração: estica/comprime vertical ancorado nos pés (cabeça sobe/desce)
        const sy = 1 + Math.sin(now * 0.0016 + u.ph!) * 0.014;
        npc.scale.y = sy;
        npc.position.y = u.baseY! + ((sy - 1) * u.h) / 2;
        // micro-balanço (leve inclinação, dessincronizado)
        npc.rotation.z = Math.sin(now * 0.0011 + u.ph! * 1.7) * 0.007;
      }
    }
    // props 2D encaram a câmera (billboard no eixo Y), como os aldeões
    for (const b of this.billboardProps)
      b.rotation.y = Math.atan2(cx - b.position.x, cz - b.position.z);
    this.updateChests(now); // baús: chocalho + abertura (roda depois do billboard)
    this.updateWakeWalk(now); // caminhada roteirizada da Hedda ao acordar
    this.updateBeacon(now); // facho-guia da missão sobre a célula de destino
    this.updateDrops(now); // itens/ouro caídos: flutuar + facho + recolher ouro auto
    // retículo de mira segue o alvo selecionado (levemente à frente do sprite,
    // na direção da câmera, p/ não brigar em profundidade com o inimigo)
    if (this.reticle && this.target && !this.target.dyingAt) {
      this.reticle.visible = true;
      // anel no centro do corpo, levemente à frente (evita brigar em profundidade)
      let rx = cx - this.target.bx, rz = cz - this.target.bz;
      const rl = Math.hypot(rx, rz) || 1;
      rx /= rl;
      rz /= rl;
      this.reticle.position.set(
        this.target.bx + rx * 0.3,
        1.35,
        this.target.bz + rz * 0.3,
      );
    } else if (this.reticle) {
      this.reticle.visible = false;
    }
    // regen de mana (~4/s) + expiração de buff
    const dt = this.lastTickMs ? Math.min(0.1, (now - this.lastTickMs) / 1000) : 0;
    this.lastTickMs = now;
    if (dt > 0 && this.playerMp < this.playerMaxMp) {
      this.playerMp = Math.min(this.playerMaxMp, this.playerMp + this.playerMaxMp * 0.03 * dt + 1.5 * dt);
      this.ui.setMana(this.playerMp / this.playerMaxMp, this.playerMp, this.playerMaxMp);
    }
    // CERVEJA: regenera vida gradualmente enquanto o efeito durar (~3 min)
    if (dt > 0 && now < this.hpRegenUntil && this.playerHp < this.playerMaxHp) {
      this.playerHp = Math.min(this.playerMaxHp, this.playerHp + this.playerMaxHp * 0.012 * dt + 2 * dt);
      this.ui.setHealth(this.playerHp / this.playerMaxHp, this.playerHp, this.playerMaxHp);
    }
    const nowBuff = !!this.buff && now < this.buff.until;
    if (this.buffActive && !nowBuff) {
      // buff acabou: reflete no ataque exibido
      this.buff = null;
      this.recomputeDerived();
    }
    this.buffActive = nowBuff;
    // recargas: atualiza o overlay (escurece e preenche) + a contagem regressiva
    if (this.coolingSkills.size) {
      for (const id of this.coolingSkills) {
        const until = this.cooldownUntil[id] ?? 0;
        const remaining = until - now;
        if (remaining <= 0) {
          this.ui.setSkillCooldown(id, 0, 0);
          this.coolingSkills.delete(id);
        } else {
          const total = combatFor(id).cd;
          this.ui.setSkillCooldown(id, remaining / total, Math.ceil(remaining / 1000));
        }
      }
    }
    // ---- INIMIGOS: IA (patrulha / visão / perseguição), ataque, dano, morte ----
    for (let ei = this.enemies.length - 1; ei >= 0; ei--) {
      const e = this.enemies[ei];
      // interpola o passo em grade com EASING (acelera/desacelera) → deslize suave
      if (e.stepAt) {
        const st = Math.min(1, (now - e.stepAt) / e.stepDur);
        const es = st * st * (3 - 2 * st); // smoothstep
        e.bx = e.fx + (e.tx - e.fx) * es;
        e.bz = e.fz + (e.tz - e.fz) * es;
        if (st >= 1) { e.stepAt = 0; e.bx = e.tx; e.bz = e.tz; }
      }
      const h = (e.mesh.geometry as THREE.PlaneGeometry).parameters.height;
      let dx = cx - e.bx, dz = cz - e.bz;
      const L = Math.hypot(dx, dz) || 1; dx /= L; dz /= L;
      let lunge = 0, scale = 1, tiltZ = 0, emisR = 0, emisG = 0, emisB = 0;
      const sinceHit = now - e.hitAt;
      if (e.dyingAt) {
        const t = (now - e.dyingAt) / 650;
        e.mat.opacity = Math.max(0, 1 - t * 3);
        e.mesh.rotation.z = -t * 1.6;
        const sq = Math.max(0.12, 1 - t * 0.55);
        e.mesh.scale.set(1 + t * 0.35, sq, 1);
        e.mesh.position.y = h / 2 - t * 0.75;
        e.bar.visible = false;
        if (t >= 1) {
          for (const o of [e.mesh, e.bar, e.faceArrow]) {
            this.world.remove(o);
            const idx = this.billboardProps.indexOf(o);
            if (idx >= 0) this.billboardProps.splice(idx, 1);
          }
          e.mesh.geometry.dispose(); e.mat.dispose();
          this.blocked.delete(`${e.c},${e.r}`); // libera a célula que o corpo ocupava
          this.enemies.splice(ei, 1);
          this.onEnemyRemoved();
          // MMO: inimigo comum RENASCE ~10s depois (chefe NUNCA renasce sozinho).
          // Só na masmorra e na MESMA sessão de andar em que morreu.
          if (this.location === "dungeon" && e.tier !== "boss") {
            const hc = e.homeC, hr = e.homeR, tp = e.typeId, sess = this.dungeonSession;
            window.setTimeout(() => {
              if (
                this.location === "dungeon" &&
                this.dungeonSession === sess &&
                !(this.col === hc && this.row === hr) &&
                !this.blocked.has(`${hc},${hr}`) &&
                !this.enemies.some((o) => o.homeC === hc && o.homeR === hr) &&
                this.enemies.length < 22
              )
                this.buildDungeonEnemy(hc, hr, tp);
            }, 10000);
          }
        }
        continue;
      }
      // ---- IA ----
      const distCells = Math.abs(this.col - e.c) + Math.abs(this.row - e.r);
      // VISÃO: fica aggro se o herói entra no alcance E há linha de visão livre
      if (!e.aggro && distCells <= e.visionR && this.enemyCanSee(e)) e.aggro = true;
      const adj = distCells === 1;
      // alcance de tiro (à distância): dentro do alcance, ≥2 células e com linha livre
      const inShotRange = e.ranged && distCells >= 2 && distCells <= e.range && this.enemyCanSee(e);
      // MOVIMENTO: comportamento POR TIPO ao aggro (fugir/atirar de longe/perseguir).
      if (!e.atkAt && !e.stepAt && now >= e.nextMove) {
        if (!e.aggro) {
          this.enemyPatrolStep(e, now);
        } else if (e.ai === "flee_low" && e.hp <= e.maxHp * 0.35) {
          // rato acuado: só um ESPASMO de fuga de vez em quando; senão VOLTA pra cima
          // do herói (antes ele fugia sem parar e não dava p/ alcançar).
          if (Math.random() < 0.35) this.enemyFleeStep(e, now);
          else this.enemyChaseStep(e, now);
        } else if (e.ai === "kite" && e.ranged) {
          this.enemyKiteStep(e, now, distCells);   // arqueiro: mantém distância p/ atirar
        } else if (e.ai === "caster" && e.ranged) {
          this.enemyCasterStep(e, now, distCells); // cultista: conjura de longe, adaga de perto
        } else if (!adj) {
          this.enemyChaseStep(e, now);             // perseguidores (esqueleto/aranha/carniçal)
        }
      }
      // ATAQUE: melee (adjacente) OU à distância (no alcance). Adjacente + melee = melee.
      const canMelee = e.melee && adj;
      const canRanged = e.ranged && (inShotRange || (adj && !e.melee)); // arqueiro atira até colado
      if (!e.atkAt && !e.stepAt && now >= e.nextAtk && (canMelee || canRanged)) {
        e.atkAt = now;
        e.atkIsRanged = !canMelee; // se não dá pra golpear agora, é um tiro
        if (!e.atkIsRanged) this.enemyMeleeSfx(e); // grunhido/bote na hora do golpe corpo-a-corpo
      }
      if (e.atkAt) {
        const dur = e.atkIsRanged ? 620 : 700;
        const t = (now - e.atkAt) / dur;
        if (!e.atkIsRanged) {
          if (t < 0.4) { const k = t / 0.4; lunge = -0.35 * k; scale = 1 - 0.05 * k; }
          else if (t < 0.6) { const k = (t - 0.4) / 0.2; lunge = -0.35 + 1.25 * k; scale = 0.95 + 0.27 * k; }
          else { const k = (t - 0.6) / 0.4; lunge = 0.9 * (1 - k); scale = 1.22 - 0.22 * k; }
        } else {
          // conjuração/mira: recua um tico e "carrega" (leve crescer)
          const k = Math.sin(Math.min(1, t) * Math.PI);
          lunge = -0.25 * k; scale = 1 + 0.08 * k;
        }
        if (!e.hitApplied && t > 0.5) {
          e.hitApplied = true;
          if (e.atkIsRanged) this.enemyFireProjectile(e);
          else if (adj) this.damagePlayer(e.atk);
        }
        if (t >= 1) { e.atkAt = 0; e.hitApplied = false; e.nextAtk = now + (e.atkIsRanged ? 1500 : 1100); }
      }
      // reação ao dano: brilho vermelho-branco + recuo elástico
      if (sinceHit < 240) {
        const k = sinceHit / 240; const spring = Math.sin((1 - k) * Math.PI);
        lunge -= spring * 0.6; const g = 1 - k * 0.7;
        emisR = g; emisG = g * 0.2; emisB = g * 0.16; tiltZ = spring * 0.14;
      }
      e.mesh.position.set(e.bx + dx * lunge, h / 2, e.bz + dz * lunge);
      e.mesh.scale.set(scale, scale, 1);
      e.mesh.rotation.z = tiltZ;
      e.bar.position.set(e.bx, h + 0.45, e.bz); // a barra segue o inimigo
      // SETA de ORIENTAÇÃO no chão: aponta p/ o rumo do inimigo (hdc,hdr) — como são
      // billboards, é assim que dá p/ saber p/ que lado ele encara/vai. Mais forte
      // e vermelha quando ele está aggro (te caçando); âmbar suave na patrulha.
      const fm = e.faceArrow.material as THREE.MeshBasicMaterial;
      const target = e.aggro ? 0.9 : (e.stepAt ? 0.55 : 0.32);
      fm.opacity += (target - fm.opacity) * 0.15;
      e.faceArrow.position.set(e.bx, 0.06, e.bz);
      e.faceArrow.rotation.y = Math.atan2(-e.hdc, -e.hdr); // rumo no plano do chão
      fm.color.setHex(e.aggro && e.approach > 0 ? 0xff4530 : e.aggro ? 0xff8a3c : 0xf0b45a);
      e.mat.emissive.setRGB(emisR, emisG, emisB);
    }
    this.updatePoofs(now);
    this.updateProjectiles(now);
    this.updateEnemyBolts(now);
    // atualiza as bolinhas de inimigo no minimapa enquanto eles andam (throttle)
    if (this.enemies.length && now >= this.nextMiniRefresh) {
      this.pushMinimap();
      this.nextMiniRefresh = now + 350;
    }
    // ciclo dia/noite (cor da atmosfera, luzes e postes) — só em locais externos
    this.updateDayNight(now);
    // relógio do HUD (sol/lua orbitando) — anda mesmo em interiores
    const tday = (now / DAY_MS + DAY_START) % 1;
    this.ui.setClock(tday, this.daylight(tday));
    // portões abrindo: as duas folhas giram nas dobradiças (para dentro)
    if (this.gateAnims.length) {
      for (const a of this.gateAnims) {
        const p = Math.min(1, (now - a.t0) / a.dur);
        const e = p * p * (3 - 2 * p); // smoothstep
        a.pivotL.rotation.y = a.to * e;
        a.pivotR.rotation.y = -a.to * e;
      }
      this.gateAnims = this.gateAnims.filter((a) => now - a.t0 < a.dur);
    }
    // partículas flutuantes (poeira/esporos) sobem devagar e reiniciam embaixo
    for (const mo of this.motes) {
      const pos = mo.pts.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < mo.sp.length; i++) {
        let y = arr[i * 3 + 1] + mo.sp[i] * 0.012;
        arr[i * 3] += Math.sin(now * 0.0006 + i * 1.7) * mo.sway;
        if (y > mo.y1) y = mo.y0;
        arr[i * 3 + 1] = y;
      }
      pos.needsUpdate = true;
    }
    // FUMAÇA que se move: deriva em círculos lentos, GIRA (churn), sobe de leve e
    // respira a opacidade → parece fumaça volumétrica viva.
    for (const f of this.fogPuffs) {
      const t = now * 0.00009;
      f.s.position.x = f.bx + Math.cos(t + f.ph) * f.rad;
      f.s.position.z = f.bz + Math.sin(t * 0.8 + f.ph) * f.rad;
      f.s.position.y = f.by + Math.sin(t * 1.1 + f.ph) * f.rise;
      const mat = f.s.material as THREE.SpriteMaterial;
      mat.rotation += f.rotSp * 0.016;
      mat.opacity = f.baseOp * (0.6 + 0.4 * Math.sin(t * 2.0 + f.ph));
    }
    // cúpula de névoa gira devagar → as nuvens "andam" pelo céu
    // a cúpula do céu (shader) não gira — sol/lua se movem por uniform e as
    // estrelas cintilam via uTime (atualizado em updateDayNight)
    // fogo (tochas, fornalha, caldeirão) tremeluz — mas com CULLING por distância:
    // só as N tochas MAIS PRÓXIMAS do herói ficam ativas (as demais ficam invisíveis,
    // fora do shader). Muitas point lights simultâneas estouram o limite de uniforms
    // no mobile e a cena fica PRETA — este orçamento fixo evita isso.
    const FLAME_BUDGET = 7;
    if (this.flames.length > FLAME_BUDGET) {
      this.flames.sort((a, b) => {
        const da = (a.light.position.x - cx) ** 2 + (a.light.position.z - cz) ** 2;
        const db = (b.light.position.x - cx) ** 2 + (b.light.position.z - cz) ** 2;
        return da - db;
      });
    }
    for (let i = 0; i < this.flames.length; i++) {
      const f = this.flames[i];
      const on = i < FLAME_BUDGET; // mantém EXATAMENTE budget acesas → contagem estável (sem recompilar)
      if (f.light.visible !== on) f.light.visible = on;
      if (on) f.light.intensity = f.base + Math.sin(now * 0.011 + f.base) * 0.8 + Math.sin(now * 0.027) * 0.5;
    }
    // línguas de chama da lareira: encaram a câmera + tremem (altura/opacidade)
    for (const fl of this.fireFlames) {
      fl.rotation.y = Math.atan2(cx - fl.position.x, cz - fl.position.z);
      const u = fl.userData as { phase: number; baseY: number; h: number };
      const flick = 0.86 + 0.16 * Math.sin(now * 0.02 + u.phase) + 0.07 * Math.sin(now * 0.041 + u.phase * 1.7);
      fl.scale.set(0.94 + 0.1 * Math.sin(now * 0.033 + u.phase), flick, 1);
      fl.position.y = u.baseY + (flick - 1) * u.h * 0.5; // ancora na base
      (fl.material as THREE.MeshBasicMaterial).opacity = 0.82 + 0.16 * Math.sin(now * 0.028 + u.phase * 1.3);
    }
    // sprite-sheets animam (avança o quadro por UV)
    for (const a of this.animTex)
      a.tex.offset.x = (Math.floor((now / 1000) * a.fps) % a.frames) / a.frames;
    // NPCs que caminham
    this.updateWalkers(now);
    this.updateNpcChatter(now); // papo ambiente + conversas em par (balões)
    this.updateBubbles(now); // segue/fade dos balões de fala
    // fumaça das chaminés: sobe, dilata e some; sempre encara a câmera
    for (const s of this.smoke) {
      const u = s.userData as { phase: number; baseX: number; baseZ: number };
      const t = ((now * 0.00028 + u.phase) % 4) / 4; // 0..1 ao longo do ciclo
      const rise = t * 4.2;
      s.position.set(u.baseX + Math.sin(now * 0.0006 + u.phase) * 0.5, WALL_H + ROOF_H + rise, u.baseZ);
      const sc = 0.6 + t * 1.6;
      s.scale.set(sc, sc, sc);
      (s.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.42;
      s.rotation.y = Math.atan2(cx - s.position.x, cz - s.position.z);
    }
    // PORTAL: re-sobe o frame atual do GIF (vórtice animado) e faz o plano pulsar.
    if (this.portalPlanes.length) {
      if (this.portalTex) this.portalTex.needsUpdate = true;
      const pulse = 1 + Math.sin(now * 0.004) * 0.05;
      for (const pl of this.portalPlanes) pl.scale.set(pulse, pulse, 1);
    }
    // atualiza a dica de interação só quando o jogador não está animando
    if (!this.anim) this.updatePrompt();
    this.renderScene();
  }

  // dica contextual sobre o que está à frente
  private updatePrompt() {
    const t = this.facingTarget();
    let text = " ";
    if (t) {
      if (t.kind === "enter") text = `Entrar — ${ESTAB[t.estab].name}`;
      else if (t.kind === "enterhome") text = "Entrar na casa";
      else if (t.kind === "exit") text = this.location === "dungeon" ? "Subir ao Vilarejo" : "Sair";
      else if (t.kind === "talk") text = `Falar com ${t.name}`;
      else if (t.kind === "dungeon") text = "Descer à masmorra";
      else if (t.kind === "descend") text = "Descer ao próximo andar";
      else if (t.kind === "ascend") text = "Subir um andar";
      else if (t.kind === "toforest") text = "Ir para a Floresta";
      else if (t.kind === "tovillage") text = "Voltar ao Vilarejo";
      else if (t.kind === "sign") text = "Ler a placa";
      else if (t.kind === "lockgate") text = "Portão selado";
      else if (t.kind === "sanctuary") text = "Subir a escadaria";
      else if (t.kind === "smithshop") text = "Ferreiro — Aprimorar";
      else if (t.kind === "storeshop") text = "Mercador — Comprar / Vender";
      else if (t.kind === "alchshop") text = "Alquimista — Poções & Materiais";
      else if (t.kind === "tavernshop") text = "Taverna — Bruno, o Taverneiro";
      else if (t.kind === "stash") text = "Abrir o baú";
      else if (t.kind === "chest") text = "Abrir o baú";
      else if (t.kind === "waypoint") text = "Portal — Viajar";
      else if (t.kind === "portalback") text = "Portal — Voltar à masmorra";
      else if (t.kind === "pickup") text = `Pegar — ${t.name}`;
    }
    if (text !== this.lastPrompt) {
      this.lastPrompt = text;
      this.ui.setPrompt(text === " " ? null : text);
    }
  }

  // o que o jogador encara (célula à frente na direção atual)
  private facingTarget(): Target {
    const [dc, dr] = DIRS[this.facing];
    const fc = this.col + dc;
    const fr = this.row + dr;
    // ITEM caído logo à frente (ou na própria célula) → "Pegar"
    const drop = this.itemDropAt(fc, fr) ?? this.itemDropAt(this.col, this.row);
    const dropIt = drop?.weapon ?? drop?.item; // pode ser arma OU armadura
    if (drop && dropIt) return { kind: "pickup", uid: dropIt.uid, name: dropIt.name };
    // BAÚ da Hedda logo à frente (célula do baú, dentro da casa dela)
    if (this.stashCell && fc === this.stashCell.col && fr === this.stashCell.row)
      return { kind: "stash" };
    // BAÚ 2D (masmorra ou praça) logo à frente e ainda não aberto → chocalha/abre
    const chestT = this.chests.get(`${fc},${fr}`);
    if (chestT && chestT.state !== "open") return { kind: "chest", key: `${fc},${fr}` };
    // NPC logo à frente
    const npc = this.npcMap.get(`${fc},${fr}`);
    // no interior do FERREIRO, falar com o atendente abre a janela de aprimoramento
    if (npc && this.location === "smith") return { kind: "smithshop" };
    // no MERCADOR, falar com a atendente abre a janela de comprar/vender
    if (npc && this.location === "store") return { kind: "storeshop" };
    // na ALQUIMISTA, falar com a Isolde abre a loja de poções + materiais
    if (npc && this.location === "alchemist") return { kind: "alchshop" };
    // na TAVERNA, falar com o Bruno abre descanso + bebidas + missões
    if (npc && this.location === "tavern") return { kind: "tavernshop" };
    if (npc)
      return {
        kind: "talk",
        name: npc.name,
        lines: npc.lines,
        key: `${fc},${fr}`,
      };
    if (this.location === "village") {
      // porta de estabelecimento (na face da casa voltada p/ o jogador)
      const estab = this.doorMap.get(`${fc},${fr},${-dc},${-dr}`);
      if (estab) return { kind: "enter", estab };
      const home = this.homeDoorMap.get(`${fc},${fr},${-dc},${-dr}`);
      if (home) return { kind: "enterhome", id: home };
      if (cellAt(fc, fr) === "stairs") return { kind: "dungeon" };
      // portal TEMPORÁRIO de retorno (à frente ou em cima) → volta à masmorra
      if (this.tempPortalCell && ((fc === this.tempPortalCell.c && fr === this.tempPortalCell.r) ||
        (this.col === this.tempPortalCell.c && this.row === this.tempPortalCell.r)))
        return { kind: "portalback" };
      // portal FIXO do waypoint (a célula do arco) quando ativo
      if (this.cityPortalActive && fc === WELL.c && fr === WELL.r) return { kind: "waypoint" };
      // trilha da floresta: valendo de frente ou já em cima dela
      if (cellAt(fc, fr) === "forestgate" || cellAt(this.col, this.row) === "forestgate")
        return { kind: "toforest" };
    } else if (this.location === "forest") {
      const k = forestCell(fc, fr);
      // portão de volta ao vilarejo (de frente ou em cima dele)
      if (k === "gate" || forestCell(this.col, this.row) === "gate")
        return { kind: "tovillage" };
      if (k === "sign") return { kind: "sign", lines: forestSignText(fc, fr) };
    } else if (this.location === "dungeon") {
      // escada de SUBIDA 'U' (de frente ou em cima): 1º andar volta ao vilarejo;
      // andares 2/3 sobem um andar.
      if (dungeonCell(fc, fr) === "stairs" || dungeonCell(this.col, this.row) === "stairs")
        return this.dungeonFloor > 0 ? { kind: "ascend" } : { kind: "exit" };
      // escada de DESCIDA 'D' → desce um andar
      if (dungeonCell(fc, fr) === "down" || dungeonCell(this.col, this.row) === "down")
        return { kind: "descend" };
      // portão de grade fechado logo à frente → interagir p/ abrir
      const gk = `${fc},${fr}`;
      if (this.gates.has(gk)) return { kind: "gate", key: gk };
      // portão SELADO do santuário logo à frente → não abre (mensagem)
      if (dungeonCell(fc, fr) === "lockgate") return { kind: "lockgate" };
      // portal do santuário (de frente ou em cima dele) → entra na sala-vitrine
      if (dungeonCell(fc, fr) === "sanctuary" || dungeonCell(this.col, this.row) === "sanctuary")
        return { kind: "sanctuary" };
    } else if (this.location === "showcase") {
      // na base da hélice, interagir sai da sala-vitrine (volta de onde veio)
      if (this.showIdx === 0) return { kind: "exit" };
    } else {
      // saída: valendo tanto de frente para a porta quanto encostado nela
      // (em cima da própria célula de saída, onde a célula à frente já é a
      // parede externa e o teste de "célula à frente" falharia).
      if (roomChar(fc, fr) === "X" || roomChar(this.col, this.row) === "X")
        return { kind: "exit" };
    }
    return null;
  }

  private resize() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.composer?.setSize(w, h);
    this.bloom?.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
