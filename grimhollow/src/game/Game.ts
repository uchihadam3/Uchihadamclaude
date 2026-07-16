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
} from "./config";
import { COLS, ROWS, cellAt, isDungeon, isWalkable, findStart, MAP } from "./village";
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

// artes 2D enviadas para atendentes (URL por estabelecimento)
const NPC_ART: Partial<Record<Estab, string>> = {
  tavern: taverneiroUrl,
  store: mercadoraUrl,
};

// direções: 0=N,1=E,2=S,3=O  (dcol, drow)
const DIRS: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// pontos de interesse do vilarejo
const WELL = { c: 7, r: 10 }; // poço no centro da praça
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

// aldeões da vila espalhados pela praça.
// id  -> chave da arte 2D (ver VILLAGER_ART); col/row = célula; seed = sprite
// procedural provisório enquanto a arte não chega; name/lines = diálogo.
interface VillageNPC {
  id: string;
  c: number;
  r: number;
  seed: number;
  name: string;
  lines: string[];
}
const VILLAGE_NPCS: VillageNPC[] = [
  {
    id: "elspeth",
    c: 3,
    r: 6,
    seed: 1,
    name: "Elspeth, a Camponesa",
    lines: [
      "Bom dia! Colhi legumes fresquinhos hoje cedo.",
      "O poço da praça nunca seca, pode beber à vontade.",
    ],
  },
  {
    id: "pip",
    c: 7,
    r: 6,
    seed: 4,
    name: "Pip",
    lines: [
      "Olha minha espada de madeira! Um dia vou ser aventureiro igual você!",
      "A Wilma disse que viu um fantasma perto da montanha. Eu não tenho medo... quase.",
    ],
  },
  {
    id: "wilma",
    c: 8,
    r: 8,
    seed: 6,
    name: "Wilma",
    lines: [
      "Você viu minha boneca? Ah, está aqui!",
      "Não vá para a montanha, moço. De lá vêm barulhos à noite.",
    ],
  },
  {
    id: "corvin",
    c: 11,
    r: 7,
    seed: 2,
    name: "Corvin, o Lenhador",
    lines: [
      "Cortar lenha é honesto, mas o bosque anda estranho ultimamente.",
      "Dizem que há algo à espreita naquela montanha ao norte...",
    ],
  },
  {
    id: "hedda",
    c: 5,
    r: 9,
    seed: 8,
    name: "Hedda, a Matriarca",
    lines: [
      "Cuide-se por aí, meu jovem. Falta água, deixe-me encher o jarro.",
      "Se precisar de comida quente, a taverna do Bruno é logo ali.",
    ],
  },
  {
    id: "wren",
    c: 9,
    r: 9,
    seed: 3,
    name: "Wren, a Costureira",
    lines: [
      "Precisa remendar essa capa? Faço um preço justo.",
      "Roupa boa aquece o corpo — e o frio lá embaixo é de rachar.",
    ],
  },
  {
    id: "alard",
    c: 3,
    r: 11,
    seed: 5,
    name: "Alard, o Velho Fazendeiro",
    lines: [
      "Cuidado, jovem. A escada sob a montanha leva às profundezas.",
      "Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar.",
    ],
  },
  {
    id: "gunther",
    c: 11,
    r: 11,
    seed: 9,
    name: "Gunther, o Vigia",
    lines: [
      "Mantenha a paz por aqui, forasteiro.",
      "Enquanto eu montar guarda, o vilarejo dorme tranquilo.",
    ],
  },
  {
    id: "anselmo",
    c: 3,
    r: 8,
    seed: 7,
    name: "Frei Anselmo",
    lines: [
      "Que a luz o acompanhe nas trevas, viajante.",
      "Reze antes de descer àquela masmorra. Vai precisar.",
    ],
  },
  {
    id: "tam",
    c: 5,
    r: 12,
    seed: 10,
    name: "Velho Tam",
    lines: [
      "Uma moedinha para um pobre velho?",
      "Já fui aventureiro como você... até a montanha levar tudo de mim.",
    ],
  },
  {
    id: "lyle",
    c: 10,
    r: 12,
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
const VILLAGER_ART: Record<string, string> = {};

// alvo que o jogador está encarando ao apertar interagir
type Target =
  | { kind: "enter"; estab: Estab }
  | { kind: "exit" }
  | { kind: "talk"; name: string; lines: string[]; portrait?: string | null }
  | { kind: "dungeon" }
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

  private col: number;
  private row: number;
  private facing = 0;
  private anim: Anim = null;

  private world = new THREE.Group(); // tudo do local atual (recriado ao trocar)
  private blocked = new Set<string>(); // células bloqueadas por props/NPCs
  private npcs: THREE.Object3D[] = []; // aldeões (billboards)
  private flames: { light: THREE.PointLight; base: number }[] = []; // luzes que tremem
  private ui!: HUD;

  private location: "village" | Estab = "village";
  private doorMap = new Map<string, Estab>(); // "c,r,dc,dr" -> estabelecimento
  // "c,r" -> NPC (guarda a textura p/ recortar o retrato do diálogo)
  private npcMap = new Map<
    string,
    {
      name: string;
      lines: string[];
      tex: THREE.Texture;
      art: boolean;
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
  private npcArt: Partial<Record<Estab, THREE.Texture>> = {}; // cache das artes 2D
  private villagerArt: Record<string, THREE.Texture> = {}; // cache das artes dos aldeões

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(FOG_COLOR);
    this.camera = new THREE.PerspectiveCamera(78, 1, 0.05, 400);
    this.camera.rotation.order = "YXZ";
    this.scene.add(this.world);

    this.col = 0;
    this.row = 0;

    this.ui = setupControls(container, (a) => this.onAction(a));
    const start = findStart();
    this.enterLocation("village", start.col, start.row, 0);

    window.addEventListener("resize", () => this.resize());
    this.resize();
    this.renderer.setAnimationLoop((t) => this.tick(t));
  }

  // ---------------------------------------------- troca de local (vila/interior)
  private enterLocation(
    loc: "village" | Estab,
    col: number,
    row: number,
    facing: number,
  ) {
    this.clearWorld();
    this.location = loc;
    this.dialogue = null;
    this.ui.hideDialogue();
    if (loc === "village") {
      this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 2.6, CELL * 11);
      this.scene.background = new THREE.Color(FOG_COLOR);
      this.addVillageLights();
      this.buildVillage();
    } else {
      this.scene.fog = new THREE.Fog(0x1a140d, CELL * 4, CELL * 12);
      this.scene.background = new THREE.Color(0x120e09);
      this.addInteriorLights();
      this.buildInterior(loc);
    }
    this.col = col;
    this.row = row;
    this.facing = facing;
    this.camera.position.set(col * CELL, EYE_H, row * CELL);
    this.camera.rotation.y = -facing * (Math.PI / 2);
    this.anim = null;
    this.lastPrompt = " ";
    this.ui.setPrompt(null); // limpa dica anterior ao trocar de local
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
    this.doorMap.clear();
    this.npcMap.clear();
  }

  private addVillageLights() {
    this.world.add(new THREE.AmbientLight(0x8a92a2, 0.75));
    this.world.add(new THREE.HemisphereLight(0x9aa6b8, 0x3a2c1c, 0.7));
    const dir = new THREE.DirectionalLight(0xffe7c0, 0.55);
    dir.position.set(-6, 12, 4);
    this.world.add(dir);
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
    const barrelMat = new THREE.MeshLambertMaterial({ map: tex.barrel(17) });

    // chão de pedra da vila (por célula; NÃO cobre a masmorra p/ não tapar a escada)
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (isDungeon(c, r)) continue; // o túnel tem chão próprio
        const t = new THREE.Mesh(tileGeo, cobbleMat);
        t.rotation.x = -Math.PI / 2;
        t.position.set(c * CELL, 0, r * CELL);
        this.world.add(t);
      }

    const boxGeo = new THREE.BoxGeometry(CELL, WALL_H, CELL);
    const hash = (a: number, b: number, s = 0) =>
      (Math.sin(a * 12.9 + b * 78.2 + s * 3.1) * 43758.5) % 1;

    // faces reservadas aos estabelecimentos (não recebem porta/janela aleatória)
    const estabFaces = new Set(
      ESTAB_DOORS.map((e) => `${e.c},${e.r},${e.dc},${e.dr}`),
    );

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

    // barris decorativos: encostados numa parede SEM porta, recuados p/ o canto
    this.buildBarrels(barrelMat, doorFaces, hash);

    // montanha no canto + entrada da masmorra (túnel de tiles de dungeon)
    this.buildMountain();
    this.buildTunnel();

    // pontos de interesse
    this.buildWell();
    this.buildEstablishments(doorMat);
    this.buildNPCs();

    void MAP;
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
    // mureta de pedra
    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.25, 1.05, 20),
      stoneMat,
    );
    ring.position.y = 0.52;
    grp.add(ring);
    // "água" escura no topo
    const water = new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 0.92, 0.06, 20),
      new THREE.MeshBasicMaterial({ color: 0x10171c }),
    );
    water.position.y = 0.95;
    grp.add(water);
    // dois postes
    const postGeo = new THREE.BoxGeometry(0.16, 2.0, 0.16);
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(postGeo, woodMat);
      post.position.set(s * 0.95, 1.55, 0);
      grp.add(post);
    }
    // travessa + balde
    const bar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.14), woodMat);
    bar.position.y = 2.5;
    grp.add(bar);
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
    const postMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    for (const e of ESTAB_DOORS) {
      const { c, r, dc, dr, kind } = e;
      // porta da loja
      this.addDecal(c, r, dc, dr, doorMat, "door");
      this.doorMap.set(`${c},${r},${dc},${dr}`, kind);

      // placa numa estaca curta, rente à parede e deslocada p/ o lado da porta
      const grp = new THREE.Group();
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.2, 0.14), postMat);
      post.position.y = 1.1;
      grp.add(post);
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.62),
        new THREE.MeshLambertMaterial({
          map: tex.signText(ESTAB[kind].name),
          transparent: true,
          side: THREE.DoubleSide,
        }),
      );
      board.position.set(0, 2.05, 0.03);
      grp.add(board);
      // posição: face da parede + pequeno recuo, deslocada 1.2 p/ o lado da porta
      const fx = c * CELL + dc * (CELL / 2 + 0.16);
      const fz = r * CELL + dr * (CELL / 2 + 0.16);
      const px = dr; // perpendicular à normal da porta
      const pz = -dc;
      grp.position.set(fx + px * 1.2, 0, fz + pz * 1.2);
      grp.rotation.y =
        dc === 1 ? Math.PI / 2 : dc === -1 ? -Math.PI / 2 : dr === 1 ? 0 : Math.PI;
      this.world.add(grp);
    }
  }

  // aldeão billboard com colisão e diálogo
  private addNPC(
    c: number,
    r: number,
    seed: number,
    name: string,
    lines: string[],
    img?: THREE.Texture,
  ) {
    // com imagem (arte 2D enviada): usa a textura e a proporção da imagem
    const map = img ?? tex.villager(seed);
    const mat = new THREE.MeshLambertMaterial({
      map,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    });
    const h = img ? 2.4 : 2.15;
    const w = img ? h * 0.671 : 1.3; // aspecto 848x1264
    const y = img ? h / 2 - 0.08 : 1.06;
    const npc = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    npc.position.set(c * CELL, y, r * CELL);
    this.world.add(npc);
    this.npcs.push(npc);
    this.blocked.add(`${c},${r}`);
    this.npcMap.set(`${c},${r}`, { name, lines, tex: map, art: !!img });
  }

  // aldeões da vila (espalhados pela praça)
  private buildNPCs() {
    for (const v of VILLAGE_NPCS) {
      this.addNPC(v.c, v.r, v.seed, v.name, v.lines, this.villagerArtTex(v.id));
    }
  }

  // carrega (uma vez) a arte 2D de um aldeão, se houver
  private villagerArtTex(id: string): THREE.Texture | undefined {
    const url = VILLAGER_ART[id];
    if (!url) return undefined;
    const key = `v:${id}`;
    if (!this.villagerArt[key]) {
      const t = new THREE.TextureLoader().load(url);
      t.colorSpace = THREE.SRGBColorSpace;
      t.magFilter = THREE.LinearFilter;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.generateMipmaps = true;
      t.anisotropy = 8;
      this.villagerArt[key] = t;
    }
    return this.villagerArt[key];
  }

  // recorta o rosto do NPC (topo-centro) para o retrato do diálogo
  private makePortrait(image: unknown, isArt: boolean): string | null {
    const im = image as { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number } | null;
    if (!im) return null;
    const iw = im.naturalWidth || im.width || 0;
    const ih = im.naturalHeight || im.height || 0;
    if (!iw || !ih) return null;
    // fração da altura usada como lado do recorte quadrado (rosto + ombros)
    const sideFrac = isArt ? 0.3 : 0.42;
    const topFrac = isArt ? 0.03 : 0.06;
    let side = ih * sideFrac;
    let sx = iw * 0.5 - side / 2;
    let sy = ih * topFrac;
    sx = Math.max(0, Math.min(sx, iw - side));
    side = Math.min(side, iw, ih - sy);
    const S = 132;
    const cv = document.createElement("canvas");
    cv.width = S;
    cv.height = S;
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingQuality = "high";
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
    const p = this.makePortrait(img, e.art);
    if (p) e.portrait = p; // só guarda em cache quando conseguiu recortar
    return p;
  }

  // carrega (uma vez) a arte 2D de um atendente, se houver
  private npcArtTex(kind: Estab): THREE.Texture | undefined {
    const url = NPC_ART[kind];
    if (!url) return undefined;
    if (!this.npcArt[kind]) {
      const t = new THREE.TextureLoader().load(url);
      t.colorSpace = THREE.SRGBColorSpace;
      t.magFilter = THREE.LinearFilter;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.generateMipmaps = true;
      t.anisotropy = 8;
      this.npcArt[kind] = t;
    }
    return this.npcArt[kind];
  }

  private canWalk(c: number, r: number): boolean {
    const ok =
      this.location === "village" ? isWalkable(c, r) : roomWalkable(c, r);
    return ok && !this.blocked.has(`${c},${r}`);
  }

  // ---------------------------------------------- interação
  private doInteract() {
    const t = this.facingTarget();
    if (!t) return;
    if (t.kind === "enter") {
      this.returnTo = { col: this.col, row: this.row, facing: this.facing };
      const p = roomFind("P");
      this.enterLocation(t.estab, p.col, p.row, 0);
    } else if (t.kind === "exit") {
      const { col, row, facing } = this.returnTo;
      this.enterLocation("village", col, row, facing);
    } else if (t.kind === "talk") {
      this.dialogue = {
        name: t.name,
        lines: t.lines,
        idx: 0,
        portrait: t.portrait ?? null,
      };
      this.ui.showDialogue(t.name, t.lines[0], t.portrait ?? null);
    } else if (t.kind === "dungeon") {
      this.dialogue = {
        name: "Masmorra",
        lines: [
          "A escada de pedra desce para a escuridão.",
          "(Em breve você poderá explorar a masmorra.)",
        ],
        idx: 0,
        portrait: null,
      };
      this.ui.showDialogue("Masmorra", this.dialogue.lines[0], null);
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

  private buildInterior(kind: Estab) {
    const CEIL = 3.0;
    const floorMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(9) });
    const wallMat = new THREE.MeshLambertMaterial({
      map: tex.woodPlanks(2),
      side: THREE.DoubleSide,
    });
    const ceilMat = new THREE.MeshLambertMaterial({ color: 0x4a3826, side: THREE.DoubleSide });
    const woodDark = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const doorMat = new THREE.MeshLambertMaterial({
      map: tex.door(11),
      side: THREE.DoubleSide,
    });
    const tileGeo = new THREE.PlaneGeometry(CELL, CELL);

    // casca: chão + teto + paredes
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

    // balcão do atendente + atendente
    const n = roomFind("N");
    const cxN = n.col * CELL;
    const czN = n.row * CELL + CELL / 2 + 0.2; // balcão logo à frente do atendente
    this.box(cxN, 0.55, czN, CELL * 2.4, 1.1, 0.7, woodDark);
    this.box(cxN, 1.12, czN, CELL * 2.4 + 0.2, 0.14, 0.95, woodDark); // tampo
    const info = ESTAB[kind];
    this.addNPC(n.col, n.row, info.seed, info.npc, info.lines, this.npcArtTex(kind));
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
    if (this.anim) return; // ignora enquanto anima (o hold-repeat cuida da continuidade)
    if (a === "turnLeft" || a === "turnRight") {
      const d = a === "turnLeft" ? 1 : -1;
      this.facing = (this.facing + (d === 1 ? 3 : 1)) % 4;
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
    // aldeões sempre encaram a câmera (billboard no eixo Y)
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    for (const npc of this.npcs)
      npc.rotation.y = Math.atan2(cx - npc.position.x, cz - npc.position.z);
    // fogo (tochas, fornalha, caldeirão) tremeluz
    for (const f of this.flames)
      f.light.intensity =
        f.base + Math.sin(now * 0.011 + f.base) * 0.8 + Math.sin(now * 0.027) * 0.5;
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
      else if (t.kind === "exit") text = "Sair";
      else if (t.kind === "talk") text = `Falar com ${t.name}`;
      else if (t.kind === "dungeon") text = "Descer à masmorra";
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
        portrait: this.portraitFor(`${fc},${fr}`),
      };
    if (this.location === "village") {
      // porta de estabelecimento (na face da casa voltada p/ o jogador)
      const estab = this.doorMap.get(`${fc},${fr},${-dc},${-dr}`);
      if (estab) return { kind: "enter", estab };
      if (cellAt(fc, fr) === "stairs") return { kind: "dungeon" };
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
