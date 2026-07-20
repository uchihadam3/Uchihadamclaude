import * as THREE from "three";
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
import * as tex from "./textures";
import { setupControls, type Action, type HUD } from "./controls";
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
import propLampUrl from "../assets/env/prop_lamp.png";
import propNoticeUrl from "../assets/env/prop_notice.png";
import enemySkeletonUrl from "../assets/env/enemy_skeleton.png";
import deathPoofUrl from "../assets/env/death_poof.png";
import swordUrl from "../assets/env/sword.png";
import { WEAPONS, type Weapon } from "./weapons";
import { CLASS_BY_ID, type Character } from "./classes";
import { derive } from "./stats";
import {
  passiveTotals,
  activeSkillsFor,
  combatFor,
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
    night: [4, 6], // à noite: taverna (parede norte)
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
    night: [6, 6], // à noite: taverna (parede norte)
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
    night: [8, 6], // à noite: abriga-se junto à taverna (parede norte)
    seed: 10,
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
    name: "Lyle, o Bardo",
    lines: [
      "Ei! Quer ouvir a balada do herói que desceu à masmorra?",
      "Faça feitos grandiosos e eu comporei uma canção sobre você!",
    ],
  },
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
  | { kind: "toforest" }
  | { kind: "tovillage" }
  | { kind: "sign"; lines: string[] }
  | null;

type Anim =
  | null
  | {
      kind: "move";
      t0: number;
      fromX: number;
      fromZ: number;
      toX: number;
      toZ: number;
    }
  | { kind: "turn"; t0: number; fromY: number; toY: number };

export class Game {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private container: HTMLElement;
  private foliageFx?: HTMLDivElement; // vinheta do efeito de roçar folhagem

  private col: number;
  private row: number;
  private facing = 0;
  private anim: Anim = null;

  private world = new THREE.Group(); // tudo do local atual (recriado ao trocar)
  private blocked = new Set<string>(); // células bloqueadas por props/NPCs
  private npcs: THREE.Object3D[] = []; // aldeões (billboards)
  private flames: { light: THREE.PointLight; base: number }[] = []; // luzes que tremem
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
  private _cA = new THREE.Color();
  private _cB = new THREE.Color();
  private waterGlint?: THREE.Mesh; // reflexo da água do poço (cintila)
  private smoke: THREE.Mesh[] = []; // baforadas de fumaça das chaminés
  private billboardProps: THREE.Object3D[] = []; // props 2D (PNG) que encaram a câmera
  private playerMaxHp = 100;
  private playerHp = 100;
  private playerMaxMp = 100;
  private playerMp = 100;
  // atributos exibidos na janela de personagem (valores iniciais; mecânica depois)
  private stats = { level: 1, xp: 0, xpMax: 100, atk: 8, def: 2, str: 5, dex: 5, int: 5, gold: 0 };
  // valores BASE (antes das passivas) — as passivas são reaplicadas sobre eles
  private baseMaxHp = 100;
  private baseMaxMp = 100;
  private baseDef = 2;
  // totais acumulados das passivas alocadas na árvore de habilidades
  private passive: Partial<Record<StatKey, number>> = {};
  // ranks das habilidades (cópia local vinda do HUD) p/ acionar as ativas
  private skillRanks: Record<string, number> = {};
  // alvo selecionado (o esqueleto, quando escolhido/na mira)
  private target: Game["enemy"] = null;
  // recarga de cada habilidade: instante (ms) em que fica pronta de novo
  private cooldownUntil: Record<string, number> = {};
  // buff temporário ativo (multiplicador de dano / redução de dano recebido)
  private buff: { atkMul: number; defReduc: number; until: number } | null = null;
  // retículo de mira (billboard que marca o alvo selecionado)
  private reticle: THREE.Mesh | null = null;
  private raycaster = new THREE.Raycaster();
  private lastTickMs = 0; // p/ regen de mana por segundo
  private buffActive = false; // se havia buff no frame anterior (p/ atualizar UI)
  private currentWeapon: Weapon | null = null; // arma equipada na mão principal
  private playerName = "Herói"; // nome escolhido na criação
  private classId = "guerreiro"; // classe escolhida na criação
  // inimigo billboard (esqueleto da masmorra) — leva dano e revida
  private enemy: {
    mesh: THREE.Mesh;
    mat: THREE.MeshLambertMaterial;
    c: number;
    r: number;
    bx: number; // posição base no mundo (x)
    bz: number; // posição base no mundo (z)
    hp: number;
    maxHp: number;
    elevel: number; // nível do inimigo (escala XP/ouro dropado)
    hitAt: number; // instante do último acerto (flash/recuo)
    dyingAt: number; // instante em que começou a morrer (0 = vivo)
    atkAt: number; // instante em que começou o ataque atual (0 = não atacando)
    hitApplied: boolean; // já aplicou o dano deste ataque?
    nextAtk: number; // instante mínimo do próximo ataque
    bar: THREE.Group; // barra de vida flutuante
    barFill: THREE.Mesh; // preenchimento da barra
  } | null = null;
  // explosão de fumaça (sprite-sheet do GIF) na morte do inimigo
  private poofs: {
    mesh: THREE.Mesh;
    mat: THREE.MeshBasicMaterial;
    tex: THREE.Texture;
    born: number;
  }[] = [];
  private poofTex?: THREE.Texture; // sprite-sheet carregado (10 quadros)
  private _smokeTex?: THREE.Texture;
  private ui!: HUD;

  private location: "village" | "forest" | Estab | HomeId = "village";
  private doorMap = new Map<string, Estab>(); // "c,r,dc,dr" -> estabelecimento
  private homeDoorMap = new Map<string, HomeId>(); // "c,r,dc,dr" -> casa de aldeão
  // "c,r" -> NPC (guarda a textura p/ recortar o retrato do diálogo)
  private npcMap = new Map<
    string,
    {
      name: string;
      lines: string[];
      tex: THREE.Texture;
      art: boolean;
      frames?: number; // >1 se a textura for um sprite-sheet
      portrait?: string | null;
    }
  >();
  private returnTo = { col: 0, row: 0, facing: 0 }; // volta ao sair do interior
  private dialogue: {
    name: string;
    lines: string[];
    idx: number;
    portrait?: string | null;
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
  }[] = [];
  private npcNight = false; // fase atual da rotina dos aldeões (com histerese)

  constructor(container: HTMLElement, character?: Character) {
    this.container = container;
    // aplica a CLASSE escolhida (vida/mana/atributos + arma inicial)
    const cls = character ? CLASS_BY_ID[character.classId] : null;
    if (cls && character) {
      this.playerName = character.name;
      this.classId = cls.id;
      // primários FINAIS (base da classe + pontos distribuídos na criação)
      const prim = character.attr ?? cls.attr;
      const sec = derive(prim, cls.hp, cls.mp);
      this.stats.str = prim.str;
      this.stats.dex = prim.dex;
      this.stats.int = prim.int;
      this.playerMaxHp = sec.hp;
      this.playerHp = sec.hp;
      this.playerMaxMp = sec.mp;
      this.playerMp = sec.mp;
      this.baseMaxHp = sec.hp;
      this.baseMaxMp = sec.mp;
    }
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
    this.camera = new THREE.PerspectiveCamera(78, 1, 0.05, 400);
    this.camera.rotation.order = "YXZ";
    this.scene.add(this.world);

    this.col = 0;
    this.row = 0;

    this.ui = setupControls(
      container,
      (a) => this.onAction(a),
      swordUrl,
      SWORD_ATK_ART ?? undefined,
      WEAPONS,
      (w) => this.onEquip(w),
      (ranks) => this.applyPassives(ranks),
      (id) => this.useSkill(id),
    );
    // seleção de alvo: clicar no esqueleto o coloca na mira (raycast na cena)
    this.renderer.domElement.addEventListener("pointerdown", (e) =>
      this.onCanvasPointer(e),
    );
    // enche a mochila com TODAS as armas (pra testar) e começa com a arma da classe
    this.ui.setInventory(WEAPONS.map((w) => w.id));
    this.ui.equipWeapon(cls?.startWeapon ?? "sword");
    this.ui.setHealth(this.playerHp / this.playerMaxHp);
    this.ui.setMana(this.playerMp / this.playerMaxMp); // mana cheia por enquanto
    // árvore de habilidades: classe + pontos = nível (1 ponto por nível).
    this.ui.setSkillInfo(this.classId, this.stats.level);
    this.refreshStats();
    const start = findStart();
    this.enterLocation("village", start.col, start.row, 0);

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
  }

  // ---------------------------------------------- troca de local (vila/interior)
  private enterLocation(
    loc: "village" | "forest" | Estab | HomeId,
    col: number,
    row: number,
    facing: number,
  ) {
    this.clearWorld();
    this.location = loc;
    this.outdoor = loc === "village" || loc === "forest";
    this.dialogue = null;
    this.ui.hideDialogue();
    if (loc === "village") {
      this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 2.6, CELL * 11);
      this.scene.background = new THREE.Color(FOG_COLOR);
      this.addVillageLights();
      this.buildVillage();
    } else if (loc === "forest") {
      // a MESMA neblina do vilarejo cobre a floresta — a névoa é um elemento
      // constante do mundo (lore). Um pouco mais aberta que na vila, por ser
      // externo, mas com a mesma cor/caráter.
      this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 3.5, CELL * 18);
      this.scene.background = new THREE.Color(FOG_COLOR);
      this.addForestLights();
      this.buildForest();
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
    this.camera.position.set(col * CELL, EYE_H, row * CELL);
    this.camera.rotation.y = -facing * (Math.PI / 2);
    this.anim = null;
    this.lastPrompt = " ";
    this.ui.setPrompt(null); // limpa dica anterior ao trocar de local
    this.buildMiniGrid(); // grade do novo local
    this.pushMinimap();
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
    this.npcs = [];
    this.flames = [];
    this.lampFlames = [];
    this.lampGlows = [];
    this.dayNightLights = [];
    this.animTex = [];
    this.walkers = [];
    this.smoke = [];
    this.billboardProps = [];
    this.enemy = null;
    this.reticle = null; // foi descartado pelo world.clear(); recria sob demanda
    this.clearTarget();
    this.poofs = [];
    this.waterGlint = undefined;
    this.doorMap.clear();
    this.homeDoorMap.clear();
    this.npcMap.clear();
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

  // keyframes da cor da atmosfera (neblina + fundo) ao longo do ciclo [0,1)
  private static readonly SKY_KEYS: [number, number][] = [
    [0.0, 0x121a33], // meia-noite (azul noturno, não preto)
    [0.2, 0x18223e], // madrugada
    [0.25, 0x39395a], // primeira luz
    [0.29, 0xcf8a58], // alvorada (quente)
    [0.37, 0x9199a6], // manhã enevoada
    [0.5, 0x8790a0], // meio-dia (neblina padrão)
    [0.66, 0x949099], // tarde
    [0.72, 0xcd7442], // poente (laranja)
    [0.78, 0x4a3648], // crepúsculo
    [0.85, 0x222c4c], // anoitecer
    [1.0, 0x121a33], // volta à meia-noite
  ];

  // luminosidade do dia [0,1]: 0 à noite, 1 ao meio-dia (elevação do sol)
  private daylight(t: number): number {
    const elev = Math.sin((t - 0.25) * Math.PI * 2); // +1 ao meio-dia, <0 à noite
    return Math.max(0, Math.min(1, elev * 1.15));
  }

  // cor da atmosfera no instante t (interpola entre os keyframes vizinhos)
  private atmosColor(t: number, out: THREE.Color) {
    const keys = Game.SKY_KEYS;
    let a = keys[0], b = keys[keys.length - 1];
    for (let i = 0; i < keys.length - 1; i++)
      if (t >= keys[i][0] && t <= keys[i + 1][0]) { a = keys[i]; b = keys[i + 1]; break; }
    const f = (t - a[0]) / (b[0] - a[0] || 1);
    out.copy(this._cA.set(a[1])).lerp(this._cB.set(b[1]), f);
  }

  // avança o ciclo dia/noite e aplica cor/luz (só em locais externos)
  private updateDayNight(now: number) {
    if (!this.outdoor) return;
    const t = (now / DAY_MS + DAY_START) % 1;
    const lum = this.daylight(t);
    // atmosfera: neblina + fundo acompanham a hora do dia
    this.atmosColor(t, this._sky);
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
    const woods = [tex.woodPlanks(1), tex.woodPlanks(5), tex.woodPlanks(9)];
    const woodMats = woods.map(
      (m) => new THREE.MeshLambertMaterial({ map: m }),
    );
    const cobbleMat = new THREE.MeshLambertMaterial({ map: tex.cobblestone(7) });
    const thatchMat = new THREE.MeshLambertMaterial({
      map: tex.thatch(3),
      side: THREE.DoubleSide,
    });
    const doorMat = new THREE.MeshLambertMaterial({
      map: tex.door(11),
      side: THREE.DoubleSide,
    });
    const winMat = new THREE.MeshLambertMaterial({
      map: tex.window_(13),
      transparent: true,
      side: THREE.DoubleSide,
    });

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

        const wm = woodMats[Math.floor((Math.abs(hash(c, r)) * 3) % 3)];
        const box = new THREE.Mesh(boxGeo, wm);
        box.position.set(c * CELL, WALL_H / 2, r * CELL);
        this.world.add(box);

        for (const [dc, dr] of streetDirs) {
          if (estabFaces.has(`${c},${r},${dc},${dr}`)) {
            doorFaces.add(`${c},${r},${dc},${dr}`);
            continue; // porta tratada em buildEstablishments
          }
          // apenas JANELAS nas casas comuns (nada de portas inacessíveis)
          const h = Math.abs(hash(c, r, dc * 2 + dr));
          if (h < 0.5) this.addDecal(c, r, dc, dr, winMat, "window");
        }
      }
    }

    // telhados CONTÍNUOS por trecho de parede (evita retalhos soltos)
    this.buildRoofs(thatchMat);

    void doorFaces; // (barris procedurais removidos — só props em PNG na cidade)

    // montanha no canto + entrada da masmorra (túnel de tiles de dungeon)
    this.buildMountain();
    this.buildTunnel();
    this.buildDungeonEnemy();

    // pontos de interesse
    this.buildWell();
    this.buildEstablishments(doorMat);
    this.buildHomes(doorMat);
    this.buildVillageForestGate();
    this.buildVillageProps();
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
    // prop FIXO colado na parede, virado p/ a praça: só o mural (parede oeste)
    this.addWallProp(2, 10, propNoticeUrl, 2.7, "W");
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
  private buildDungeonEnemy() {
    // nível do inimigo escala com o do herói (variação -1..+1, mínimo 1). Define
    // a vida e, na morte, o XP e o ouro dropado.
    const elevel = Math.max(1, this.stats.level + (Math.floor(Math.random() * 3) - 1));
    const emaxHp = 8 + (elevel - 1) * 3;
    const c = 2, r = 4, worldH = 2.6; // no túnel, uma célula antes da escada
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
    this.enemy = {
      mesh, mat, c, r, bx: c * CELL, bz: r * CELL,
      hp: emaxHp, maxHp: emaxHp, elevel, hitAt: 0, dyingAt: 0,
      atkAt: 0, hitApplied: false, nextAtk: 0, bar, barFill,
    };
    // luz fria azulada perto dele (atmosfera de cripta)
    const glow = new THREE.PointLight(0x6aa0d0, 0.55, 5, 2);
    glow.position.set(c * CELL, 1.7, r * CELL);
    this.world.add(glow);
    // pré-carrega o sprite-sheet da explosão (pronto quando o inimigo morrer)
    if (!this.poofTex) this.loadArt(deathPoofUrl, (t) => (this.poofTex = t));
    this.loadArt(enemySkeletonUrl, (t) => {
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
  private onEquip(w: Weapon) {
    this.currentWeapon = w;
    // ataque exibido = base + dano da arma + bônus de passivas (%)
    this.stats.atk = this.atkWithBonus(8 + w.dmg);
    this.refreshStats();
  }

  // aplica os bônus percentuais de dano das passivas sobre um ataque base
  private atkWithBonus(base: number): number {
    const pct = (this.passive.dmg ?? 0) + (this.passive.mdmg ?? 0);
    return Math.round(base * (1 + pct));
  }

  // recalcula os atributos a partir dos ranks de passivas alocados na árvore.
  // As passivas são somadas sobre os valores BASE (idempotente ao realocar).
  private applyPassives(ranks: Record<string, number>) {
    this.skillRanks = { ...ranks };
    this.refreshActionBar();
    this.passive = passiveTotals(ranks);
    // guarda a fração atual p/ preservar vida/mana proporcional ao mudar o teto
    const hpFrac = this.playerMaxHp > 0 ? this.playerHp / this.playerMaxHp : 1;
    const mpFrac = this.playerMaxMp > 0 ? this.playerMp / this.playerMaxMp : 1;
    this.playerMaxHp = Math.round(this.baseMaxHp * (1 + (this.passive.life ?? 0)));
    this.playerMaxMp = Math.round(this.baseMaxMp * (1 + (this.passive.mana ?? 0)));
    this.playerHp = Math.max(1, Math.round(this.playerMaxHp * hpFrac));
    this.playerMp = Math.round(this.playerMaxMp * mpFrac);
    this.stats.def =
      this.baseDef + Math.round((this.passive.def ?? 0) + (this.passive.mres ?? 0));
    const wdmg = this.currentWeapon?.dmg ?? 0;
    this.stats.atk = this.atkWithBonus(8 + wdmg);
    this.ui.setHealth(this.playerHp / this.playerMaxHp);
    this.ui.setMana(this.playerMp / this.playerMaxMp);
    this.refreshStats();
  }

  private tryHitEnemy() {
    const e = this.enemy;
    if (!e || e.dyingAt) return;
    const [dc, dr] = DIRS[this.facing];
    if (this.col + dc !== e.c || this.row + dr !== e.r) return; // não está de frente
    this.dealDamageToEnemy(e, this.atkWithBonus(this.currentWeapon?.dmg ?? 1));
  }

  // aplica dano a um inimigo, atualiza a barra e cuida da morte (poof/recompensa).
  private dealDamageToEnemy(e: NonNullable<Game["enemy"]>, amount: number) {
    if (e.dyingAt) return;
    e.hp -= Math.max(1, Math.round(amount));
    e.hitAt = performance.now();
    const frac = Math.max(0.0001, e.hp / e.maxHp);
    e.barFill.scale.x = frac; // encolhe a barra (ancorada à esquerda)
    e.barFill.position.x = -(1 - frac) * 1.3 / 2;
    if (e.hp <= 0) {
      e.dyingAt = e.hitAt; // começa a tombar/sumir
      this.blocked.delete(`${e.c},${e.r}`); // libera a passagem
      this.spawnPoof(e.bx, e.bz);
      if (this.target === e) this.clearTarget();
      // recompensa escala com o nível do inimigo: ouro variável (base + faixa
      // aleatória por nível) e XP proporcional.
      const lv = e.elevel;
      const gold = 4 + lv * 3 + Math.floor(Math.random() * (3 + lv * 2));
      this.stats.gold += gold;
      this.gainXp(30 + lv * 15);
      this.ui.toast(`+${gold} ouro`);
    }
  }

  // distância em células (Chebyshev) entre o herói e um inimigo
  private cellDist(e: NonNullable<Game["enemy"]>): number {
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
      // auto-mira: se não há alvo, mira o inimigo presente
      if ((!this.target || this.target.dyingAt) && this.enemy && !this.enemy.dyingAt)
        this.setTarget(this.enemy);
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
    // paga o custo e dispara a recarga
    this.playerMp = Math.max(0, this.playerMp - cb.mana);
    this.ui.setMana(this.playerMp / this.playerMaxMp);
    this.cooldownUntil[id] = now + cb.cd;
    this.ui.skillCooldown(id, cb.cd);
    // efeito
    if (cb.effect === "dmg" && this.target) {
      const pct = cb.magic ? this.passive.mdmg ?? 0 : this.passive.dmg ?? 0;
      const scaled = cb.power * (1 + 0.25 * (rank - 1)) * (1 + pct) * this.buffAtkMul();
      this.dealDamageToEnemy(this.target, scaled);
      // vira o herói para o alvo (feedback) e balança a arma se for corpo-a-corpo
      if (cb.melee) this.ui.swingWeapon();
    } else if (cb.effect === "heal") {
      const amt = Math.round(cb.power * (1 + 0.25 * (rank - 1)));
      this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amt);
      this.ui.setHealth(this.playerHp / this.playerMaxHp);
      this.refreshStats();
      this.ui.toast(`+${amt} vida`);
    } else if (cb.effect === "buff") {
      this.buff = {
        atkMul: cb.atkMul ?? 1,
        defReduc: cb.defReduc ?? 0,
        until: now + (cb.dur ?? 6000),
      };
      this.stats.atk = this.atkWithBonus(8 + (this.currentWeapon?.dmg ?? 0));
      this.refreshStats();
      this.ui.toast("Fortalecido!");
    }
  }

  // ---- seleção de alvo ----
  private setTarget(e: NonNullable<Game["enemy"]>) {
    this.target = e;
    this.ensureReticle();
    if (this.reticle) this.reticle.visible = true;
  }
  private clearTarget() {
    this.target = null;
    if (this.reticle) this.reticle.visible = false;
  }

  // cria (uma vez) o retículo de mira: um billboard com quatro cantos dourados
  private ensureReticle() {
    if (this.reticle) return;
    const cv = document.createElement("canvas");
    cv.width = 128;
    cv.height = 128;
    const g = cv.getContext("2d")!;
    g.strokeStyle = "#ffd257";
    g.lineWidth = 10;
    g.lineCap = "round";
    g.shadowColor = "rgba(0,0,0,.8)";
    g.shadowBlur = 6;
    const m = 14, L = 34, S = 128;
    const corner = (x: number, y: number, sx: number, sy: number) => {
      g.beginPath();
      g.moveTo(x, y + sy * L);
      g.lineTo(x, y);
      g.lineTo(x + sx * L, y);
      g.stroke();
    };
    corner(m, m, 1, 1);
    corner(S - m, m, -1, 1);
    corner(m, S - m, 1, -1);
    corner(S - m, S - m, -1, -1);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthTest: true, // ocluído por paredes (não aparece atravessando prédios)
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), mat);
    mesh.renderOrder = 999;
    mesh.visible = false;
    this.reticle = mesh;
    this.world.add(mesh);
    this.billboardProps.push(mesh); // encara a câmera
  }

  // clique na cena: raycast p/ selecionar o esqueleto como alvo
  private onCanvasPointer(ev: PointerEvent) {
    const e = this.enemy;
    if (!e || e.dyingAt) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    const hit = this.raycaster.intersectObject(e.mesh, false);
    if (hit.length) this.setTarget(e);
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

  // atualiza a janela de personagem com os atributos + vida/mana atuais
  // XP necessário pra passar do nível atual (curva suave)
  private nextXpMax(level: number): number {
    return Math.round(100 + (level - 1) * 60);
  }
  // ganha XP; sobe de nível (1 ponto de habilidade por nível) e recompensa.
  private gainXp(amount: number) {
    if (this.stats.level >= 100) return;
    this.stats.xp += amount;
    let leveled = false;
    while (this.stats.level < 100 && this.stats.xp >= this.stats.xpMax) {
      this.stats.xp -= this.stats.xpMax;
      this.stats.level++;
      this.stats.xpMax = this.nextXpMax(this.stats.level);
      leveled = true;
    }
    if (this.stats.level >= 100) this.stats.xp = 0;
    if (leveled) {
      // recupera vida/mana e concede pontos de habilidade (1 por nível ganho)
      this.playerHp = this.playerMaxHp;
      this.playerMp = this.playerMaxMp;
      this.ui.setHealth(1);
      this.ui.setMana(1);
      this.ui.setSkillInfo(this.classId, this.stats.level); // total = nível
      this.ui.toast(`Nível ${this.stats.level}!`);
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
    });
  }

  // aplica dano ao jogador (o esqueleto revidou)
  private damagePlayer(n: number) {
    if (this.playerHp <= 0) return;
    // buffs defensivos reduzem o dano recebido; a defesa amortece um pouco
    const reduced = n * (1 - this.buffDefReduc());
    this.playerHp = Math.max(0, this.playerHp - Math.max(1, Math.round(reduced)));
    this.ui.setHealth(this.playerHp / this.playerMaxHp);
    this.refreshStats();
    this.ui.flashDamage();
    if (this.playerHp <= 0) {
      // derrota: recompõe a vida e volta ao início da vila
      window.setTimeout(() => {
        this.playerHp = this.playerMaxHp;
        this.ui.setHealth(1);
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
    const rockMat = new THREE.MeshLambertMaterial({ map: tex.rock(41) });
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
        const box = new THREE.Mesh(new THREE.BoxGeometry(CELL, bh, CELL), rockMat);
        box.position.set(c * CELL, y0 + bh / 2, r * CELL);
        this.world.add(box);
        // blocos menores no topo p/ contorno irregular (pico)
        if (!dungeon && this.mHash(c, r, 2) > 0.35) {
          const s = 1.6 + this.mHash(c, r, 3) * 1.8;
          const chunk = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), rockMat);
          chunk.position.set(
            c * CELL + (this.mHash(c, r, 4) - 0.5) * 2.4,
            height + s * 0.25,
            r * CELL + (this.mHash(c, r, 5) - 0.5) * 2.4,
          );
          chunk.rotation.y = this.mHash(c, r, 6) * Math.PI;
          this.world.add(chunk);
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

  // poço de pedra no centro da praça
  private buildWell() {
    const wx = WELL.c * CELL;
    const wz = WELL.r * CELL;
    this.blocked.add(`${WELL.c},${WELL.r}`);
    const stoneMat = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    const woodMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const thatchMat = new THREE.MeshLambertMaterial({
      map: tex.thatch(3),
      side: THREE.DoubleSide,
    });
    const grp = new THREE.Group();
    // mureta de pedra OCA (parede externa aberta em cima) — deixa ver a água
    const outer = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.25, 1.05, 24, 1, true),
      stoneMat,
    );
    outer.position.y = 0.52;
    grp.add(outer);
    // parede interna escura (o fundo do poço)
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.98, 0.98, 1.05, 24, 1, true),
      new THREE.MeshLambertMaterial({ color: 0x171310, side: THREE.BackSide }),
    );
    shaft.position.y = 0.52;
    grp.add(shaft);
    // borda superior (anel de pedra ligando parede externa e interna)
    const rim = new THREE.Mesh(
      new THREE.RingGeometry(0.98, 1.16, 24),
      new THREE.MeshLambertMaterial({ color: 0x8d8377, side: THREE.DoubleSide }),
    );
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = 1.045;
    grp.add(rim);
    // água azul dentro do poço (visível pela abertura)
    const water = new THREE.Mesh(
      new THREE.CylinderGeometry(0.97, 0.97, 0.05, 28),
      new THREE.MeshPhongMaterial({
        color: 0x2f7288,
        specular: 0xbfeeff,
        shininess: 100,
        transparent: true,
        opacity: 0.95,
      }),
    );
    water.position.y = 0.86;
    grp.add(water);
    // reflexo claro sobre a água (cintila no tick)
    const glint = new THREE.Mesh(
      new THREE.CircleGeometry(0.6, 24),
      new THREE.MeshBasicMaterial({
        color: 0xbfeaf5,
        transparent: true,
        opacity: 0.25,
      }),
    );
    glint.rotation.x = -Math.PI / 2;
    glint.position.set(-0.12, 0.87, -0.08);
    grp.add(glint);
    this.waterGlint = glint;
    // dois postes
    const postGeo = new THREE.BoxGeometry(0.16, 2.0, 0.16);
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(postGeo, woodMat);
      post.position.set(s * 0.95, 1.55, 0);
      grp.add(post);
    }
    // travessa + balde + corda
    const bar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.14), woodMat);
    bar.position.y = 2.5;
    grp.add(bar);
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.72, 6),
      new THREE.MeshLambertMaterial({ color: 0x6b5636 }),
    );
    rope.position.set(0.2, 2.08, 0);
    grp.add(rope);
    const bucket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.2, 0.34, 12),
      woodMat,
    );
    bucket.position.set(0.2, 1.7, 0);
    grp.add(bucket);
    // telhadinho de palha (pirâmide)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.7, 0.95, 4), thatchMat);
    roof.position.y = 3.05;
    roof.rotation.y = Math.PI / 4;
    grp.add(roof);
    grp.position.set(wx, 0, wz);
    this.world.add(grp);
  }

  // túnel da masmorra: chão/paredes/teto de dungeon + escada descendo + tochas
  private buildTunnel() {
    const floorMat = new THREE.MeshLambertMaterial({
      map: tex.dungeonFloor(43),
      side: THREE.DoubleSide,
    });
    const wallMat = new THREE.MeshLambertMaterial({
      map: tex.dungeonWall(47),
      side: THREE.DoubleSide,
    });
    const ceilMat = new THREE.MeshLambertMaterial({
      map: tex.dungeonWall(51),
      side: THREE.DoubleSide,
    });
    // degraus em pedra clara p/ contrastar com as paredes escuras da masmorra
    const stairMat = new THREE.MeshLambertMaterial({ map: tex.stone(31) });
    let mouth: [number, number] | null = null;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (!isDungeon(c, r)) continue;
        const cx = c * CELL;
        const cz = r * CELL;
        const stairs = cellAt(c, r) === "stairs";
        // teto de rocha
        const ceil = new THREE.Mesh(new THREE.PlaneGeometry(CELL, CELL), ceilMat);
        ceil.rotation.x = Math.PI / 2;
        ceil.position.set(cx, TUNNEL_H, cz);
        this.world.add(ceil);
        // chão de laje (escada substitui o chão)
        if (!stairs) {
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
        if (stairs) this.buildStairs(c, r, cx, cz, wallMat, stairMat);
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
  }

  // poço da escada: descendo p/ o norte, paredes vedando os lados até o fundo
  private buildStairs(
    c: number,
    r: number,
    cx: number,
    cz: number,
    wallMat: THREE.Material,
    stepMat: THREE.Material,
  ) {
    const N = 5;
    const stepH = 0.8;
    const zSouth = cz + CELL / 2;
    const stepD = CELL / N;
    const bottomY = -N * stepH;
    // paredes altas (do fundo até o teto) nos lados de rocha, vedando o poço
    for (const [dc, dr] of DIRS) {
      const k = cellAt(c + dc, r + dr);
      if (k === "mountain" || k === "building")
        this.addWall(cx, cz, dc, dr, bottomY, TUNNEL_H, wallMat);
    }
    // degraus (largura total da célula p/ encostar nas paredes)
    for (let i = 0; i < N; i++) {
      const topY = -i * stepH;
      const zc = zSouth - (i + 0.5) * stepD;
      const height = topY - bottomY;
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(CELL, height, stepD + 0.02),
        stepMat,
      );
      step.position.set(cx, topY - height / 2, zc);
      this.world.add(step);
    }
    // base escura do poço
    const base = new THREE.Mesh(
      new THREE.PlaneGeometry(CELL, CELL),
      new THREE.MeshBasicMaterial({ color: 0x050506 }),
    );
    base.rotation.x = -Math.PI / 2;
    base.position.set(cx, bottomY + 0.02, cz);
    this.world.add(base);
    // luzes quentes iluminando os degraus de cima (revela o vão da escada)
    const g1 = new THREE.PointLight(0xffbf70, 6, 13, 2);
    g1.position.set(cx, 2.6, cz + CELL / 2 - 0.3);
    this.world.add(g1);
    const g2 = new THREE.PointLight(0xffa050, 3.5, 8, 2);
    g2.position.set(cx, 0.4, cz - 0.6);
    this.world.add(g2);
  }

  // portas dos estabelecimentos + PLACA-ESTACA encostada na parede ao lado da porta
  private buildEstablishments(doorMat: THREE.Material) {
    for (const e of ESTAB_DOORS) {
      const { c, r, dc, dr, kind } = e;
      // porta da loja
      this.addDecal(c, r, dc, dr, doorMat, "door");
      this.doorMap.set(`${c},${r},${dc},${dr}`, kind);

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
      if (artUrl)
        this.loadArt(artUrl, (t) => {
          signMat.map = t;
          signMat.needsUpdate = true;
          // ajusta o plano ao aspecto real da arte, mantendo a altura
          const im = t.image as { width: number; height: number } | undefined;
          if (im && im.width && im.height) {
            const asp = im.width / im.height;
            board.geometry.dispose();
            board.geometry = new THREE.PlaneGeometry(signH * asp, signH);
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
    routine?: { day: [number, number]; night: [number, number] },
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
        { day: [v.c, v.r], night: v.night },
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
          : roomWalkable(c, r);
    return ok && !this.blocked.has(`${c},${r}`);
  }

  // ---- minimapa (HUD) ----
  private miniGrid: { cols: number; rows: number; cells: Uint8Array } | null = null;
  private buildMiniGrid() {
    let cols: number, rows: number, walk: (c: number, r: number) => boolean;
    if (this.location === "village") { cols = COLS; rows = ROWS; walk = isWalkable; }
    else if (this.location === "forest") { cols = FOREST_COLS; rows = FOREST_ROWS; walk = forestWalkable; }
    else { cols = ROOM_COLS; rows = ROOM_ROWS; walk = roomWalkable; }
    const cells = new Uint8Array(cols * rows);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) cells[r * cols + c] = walk(c, r) ? 1 : 0;
    this.miniGrid = { cols, rows, cells };
  }
  private pushMinimap() {
    if (!this.miniGrid) this.buildMiniGrid();
    const g = this.miniGrid!;
    const [dc, dr] = DIRS[this.facing];
    this.ui.updateMinimap({ cols: g.cols, rows: g.rows, cells: g.cells, col: this.col, row: this.row, dc, dr });
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
      this.enterLocation(t.estab, p.col, p.row, 0);
    } else if (t.kind === "enterhome") {
      this.returnTo = {
        col: this.col,
        row: this.row,
        facing: (this.facing + 2) % 4,
      };
      const p = roomFind("P");
      this.enterLocation(t.id, p.col, p.row, 0);
    } else if (t.kind === "exit") {
      const { col, row, facing } = this.returnTo;
      this.enterLocation("village", col, row, facing);
    } else if (t.kind === "talk") {
      const pages = paginate(t.lines);
      const portrait = this.portraitFor(t.key); // gera o retrato só ao conversar
      this.dialogue = { name: t.name, lines: pages, idx: 0, portrait };
      this.ui.showDialogue(t.name, pages[0], portrait);
    } else if (t.kind === "dungeon") {
      const pages = paginate([
        "A escada de pedra desce para a escuridão.",
        "(Em breve você poderá explorar a masmorra.)",
      ]);
      this.dialogue = { name: "Masmorra", lines: pages, idx: 0, portrait: null };
      this.ui.showDialogue("Masmorra", pages[0], null);
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
    }
  }

  private advanceDialogue() {
    if (!this.dialogue) return;
    this.dialogue.idx++;
    if (this.dialogue.idx >= this.dialogue.lines.length) {
      this.dialogue = null;
      this.ui.hideDialogue();
    } else {
      this.ui.showDialogue(
        this.dialogue.name,
        this.dialogue.lines[this.dialogue.idx],
        this.dialogue.portrait ?? null,
      );
    }
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
  private buildRoomShell(floorSeed = 9, wallSeed = 2, ceilColor = 0x4a3826) {
    const CEIL = 3.0;
    const floorMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(floorSeed) });
    const wallMat = new THREE.MeshLambertMaterial({
      map: tex.woodPlanks(wallSeed),
      side: THREE.DoubleSide,
    });
    const ceilMat = new THREE.MeshLambertMaterial({ color: ceilColor, side: THREE.DoubleSide });
    const doorMat = new THREE.MeshLambertMaterial({
      map: tex.door(11),
      side: THREE.DoubleSide,
    });
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
    this.wallCell(1, 3, [-1, 0], (x, z) => {
      this.box(x, 1.2, z, 0.5, 2.4, 2.0, stone);
      this.box(x + 0.42, 0.55, z, 0.34, 0.7, 1.1, new THREE.MeshBasicMaterial({ color: 0xff7a1e }));
      this.glowLight(x + 1.4, 1.0, z, 0xff8a2e, 4.2, 10);
    });
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
  private buildRoofs(mat: THREE.Material) {
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
            this.addRoofRun(c, r, c, r1, dc, 0, depth, mat);
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
            this.addRoofRun(c, r, c1, r, 0, dr, depth, mat);
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
    const y = kind === "door" ? h / 2 + 0.02 : WIN_Y;
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
    if (!this.canWalk(nc, nr)) return;
    this.anim = {
      kind: "move",
      t0: performance.now(),
      fromX: this.col * CELL,
      fromZ: this.row * CELL,
      toX: nc * CELL,
      toZ: nr * CELL,
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

  // célula andável para os aldeões: a praça (cols 2–12 / linhas 6–12, sem o poço)
  // MAIS o corredor da entrada sul (cols 6–8 / linhas 13–14), posto do vigia.
  // Mantém os aldeões na cidade (não sobem o túnel nem saem pela trilha ao sul).
  private plazaWalkable(c: number, r: number): boolean {
    if (c === WELL.c && r === WELL.r) return false;
    const inPlaza = r >= 6 && r <= 12 && c >= 2 && c <= 12;
    const inEntrance = r >= 13 && r <= 14 && c >= 6 && c <= 8;
    if (!inPlaza && !inEntrance) return false;
    return isWalkable(c, r);
  }

  // célula livre p/ o aldeão pisar agora: andável, sem o jogador e sem outro NPC
  private cellFreeForWalker(c: number, r: number, self: object): boolean {
    if (!this.plazaWalkable(c, r)) return false;
    if (c === this.col && r === this.row) return false;
    for (const o of this.walkers) {
      if (o === self) continue;
      if (o.cur.c === c && o.cur.r === r) return false;
      if (o.moving && o.to.c === c && o.to.r === r) return false;
    }
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
    const night = this.updateNpcPhase(now);
    for (const w of this.walkers) {
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
        const goal = night ? w.nightCell : w.dayCell;
        if (w.cur.c === goal.c && w.cur.r === goal.r) {
          w.waitUntil = now + 500; // chegou: descansa no posto
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
        // move a entrada do npcMap p/ a nova célula (diálogo é por célula)
        const tk = `${step.c},${step.r}`;
        const entry = this.npcMap.get(w.key);
        if (entry) {
          this.npcMap.delete(w.key);
          this.npcMap.set(tk, entry);
        }
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

  private tick(now: number) {
    const an = this.anim;
    if (an) {
      if (an.kind === "move") {
        const p = Math.min(1, (now - an.t0) / MOVE_MS);
        const e = p * p * (3 - 2 * p); // smoothstep
        this.camera.position.x = an.fromX + (an.toX - an.fromX) * e;
        this.camera.position.z = an.fromZ + (an.toZ - an.fromZ) * e;
        this.camera.position.y = EYE_H + Math.sin(p * Math.PI) * 0.07; // bob
        if (p >= 1) {
          this.camera.position.y = EYE_H;
          this.anim = null;
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
    // retículo de mira segue o alvo selecionado (levemente à frente do sprite,
    // na direção da câmera, p/ não brigar em profundidade com o inimigo)
    if (this.reticle && this.target && !this.target.dyingAt) {
      this.reticle.visible = true;
      let rx = cx - this.target.bx, rz = cz - this.target.bz;
      const rl = Math.hypot(rx, rz) || 1;
      rx /= rl;
      rz /= rl;
      this.reticle.position.set(
        this.target.bx + rx * 0.35,
        1.3,
        this.target.bz + rz * 0.35,
      );
    } else if (this.reticle) {
      this.reticle.visible = false;
    }
    // regen de mana (~4/s) + expiração de buff
    const dt = this.lastTickMs ? Math.min(0.1, (now - this.lastTickMs) / 1000) : 0;
    this.lastTickMs = now;
    if (dt > 0 && this.playerMp < this.playerMaxMp) {
      this.playerMp = Math.min(this.playerMaxMp, this.playerMp + this.playerMaxMp * 0.03 * dt + 1.5 * dt);
      this.ui.setMana(this.playerMp / this.playerMaxMp);
    }
    const nowBuff = !!this.buff && now < this.buff.until;
    if (this.buffActive && !nowBuff) {
      // buff acabou: reflete no ataque exibido
      this.buff = null;
      this.stats.atk = this.atkWithBonus(8 + (this.currentWeapon?.dmg ?? 0));
      this.refreshStats();
    }
    this.buffActive = nowBuff;
    // inimigo: ataca (investida), reage ao dano (brilho + recuo) e morre
    const e = this.enemy;
    if (e) {
      const h = (e.mesh.geometry as THREE.PlaneGeometry).parameters.height;
      // direção horizontal do inimigo p/ a câmera (usada na investida e no recuo)
      let dx = cx - e.bx, dz = cz - e.bz;
      const L = Math.hypot(dx, dz) || 1;
      dx /= L;
      dz /= L;
      let lunge = 0, scale = 1, tiltZ = 0;
      let emisR = 0, emisG = 0, emisB = 0;
      const sinceHit = now - e.hitAt;
      if (e.dyingAt) {
        const t = (now - e.dyingAt) / 650;
        e.mat.opacity = Math.max(0, 1 - t * 3); // some rápido: a explosão o engole
        e.mesh.rotation.z = -t * 1.6; // tomba
        const sq = Math.max(0.12, 1 - t * 0.55); // esmaga verticalmente (desmorona)
        e.mesh.scale.set(1 + t * 0.35, sq, 1);
        e.mesh.position.y = h / 2 - t * 0.75;
        e.bar.visible = false;
        const df = Math.max(0, 1 - t * 4); // clarão BRANCO no golpe fatal
        emisR = emisG = emisB = df;
        if (t >= 1) {
          for (const o of [e.mesh, e.bar]) {
            this.world.remove(o);
            const idx = this.billboardProps.indexOf(o);
            if (idx >= 0) this.billboardProps.splice(idx, 1);
          }
          e.mesh.geometry.dispose();
          e.mat.dispose();
          this.enemy = null;
          // renasce depois de um tempo (pra continuar dando XP/loot enquanto testa)
          window.setTimeout(() => {
            if (!this.enemy && this.location === "village") this.buildDungeonEnemy();
          }, 5000);
        }
      } else {
        // IA: ataca quando o jogador está numa célula adjacente
        const adj = Math.abs(this.col - e.c) + Math.abs(this.row - e.r) === 1;
        if (!e.atkAt && adj && now >= e.nextAtk) e.atkAt = now;
        if (e.atkAt) {
          const t = (now - e.atkAt) / 700;
          if (t < 0.4) { const k = t / 0.4; lunge = -0.35 * k; scale = 1 - 0.05 * k; } // arma p/ trás
          else if (t < 0.6) { const k = (t - 0.4) / 0.2; lunge = -0.35 + 1.25 * k; scale = 0.95 + 0.27 * k; } // investe
          else { const k = (t - 0.6) / 0.4; lunge = 0.9 * (1 - k); scale = 1.22 - 0.22 * k; } // recolhe
          if (!e.hitApplied && t > 0.52) { e.hitApplied = true; if (adj) this.damagePlayer(12); }
          if (t >= 1) { e.atkAt = 0; e.hitApplied = false; e.nextAtk = now + 1100; }
        }
        // reação ao dano: brilho vermelho-branco + recuo elástico
        if (sinceHit < 240) {
          const k = sinceHit / 240;
          const spring = Math.sin((1 - k) * Math.PI);
          lunge -= spring * 0.6;
          const g = 1 - k * 0.7;
          emisR = g;
          emisG = g * 0.2;
          emisB = g * 0.16;
          tiltZ = spring * 0.14;
        }
        e.mesh.position.set(e.bx + dx * lunge, h / 2, e.bz + dz * lunge);
        e.mesh.scale.set(scale, scale, 1);
        e.mesh.rotation.z = tiltZ;
      }
      e.mat.emissive.setRGB(emisR, emisG, emisB);
    }
    this.updatePoofs(now);
    // ciclo dia/noite (cor da atmosfera, luzes e postes) — só em locais externos
    this.updateDayNight(now);
    // relógio do HUD (sol/lua orbitando) — anda mesmo em interiores
    const tday = (now / DAY_MS + DAY_START) % 1;
    this.ui.setClock(tday, this.daylight(tday));
    // fogo (tochas, fornalha, caldeirão) tremeluz
    for (const f of this.flames)
      f.light.intensity =
        f.base + Math.sin(now * 0.011 + f.base) * 0.8 + Math.sin(now * 0.027) * 0.5;
    // sprite-sheets animam (avança o quadro por UV)
    for (const a of this.animTex)
      a.tex.offset.x = (Math.floor((now / 1000) * a.fps) % a.frames) / a.frames;
    // NPCs que caminham
    this.updateWalkers(now);
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
    // água do poço cintila suavemente
    if (this.waterGlint) {
      const m = this.waterGlint.material as THREE.MeshBasicMaterial;
      m.opacity = 0.18 + (Math.sin(now * 0.0016) + 1) * 0.11;
      const sc = 1 + Math.sin(now * 0.0013 + 1) * 0.08;
      this.waterGlint.scale.set(sc, sc, sc);
    }
    // atualiza a dica de interação só quando o jogador não está animando
    if (!this.anim) this.updatePrompt();
    this.renderer.render(this.scene, this.camera);
  }

  // dica contextual sobre o que está à frente
  private updatePrompt() {
    const t = this.facingTarget();
    let text = " ";
    if (t) {
      if (t.kind === "enter") text = `Entrar — ${ESTAB[t.estab].name}`;
      else if (t.kind === "enterhome") text = "Entrar na casa";
      else if (t.kind === "exit") text = "Sair";
      else if (t.kind === "talk") text = `Falar com ${t.name}`;
      else if (t.kind === "dungeon") text = "Descer à masmorra";
      else if (t.kind === "toforest") text = "Ir para a Floresta";
      else if (t.kind === "tovillage") text = "Voltar ao Vilarejo";
      else if (t.kind === "sign") text = "Ler a placa";
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
    // NPC logo à frente
    const npc = this.npcMap.get(`${fc},${fr}`);
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
      // trilha da floresta: valendo de frente ou já em cima dela
      if (cellAt(fc, fr) === "forestgate" || cellAt(this.col, this.row) === "forestgate")
        return { kind: "toforest" };
    } else if (this.location === "forest") {
      const k = forestCell(fc, fr);
      // portão de volta ao vilarejo (de frente ou em cima dele)
      if (k === "gate" || forestCell(this.col, this.row) === "gate")
        return { kind: "tovillage" };
      if (k === "sign") return { kind: "sign", lines: forestSignText(fc, fr) };
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
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
