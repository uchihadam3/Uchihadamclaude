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
import { setupControls, type Action } from "./controls";

// direções: 0=N,1=E,2=S,3=O  (dcol, drow)
const DIRS: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// pontos de interesse do vilarejo
const WELL = { c: 4, r: 9 }; // poço na praça
const TUNNEL_H = 3.2; // altura do teto do túnel da masmorra

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

  private blocked = new Set<string>(); // células bloqueadas por props (poço)
  private npcs: THREE.Object3D[] = []; // aldeões (billboards)
  private torch?: THREE.PointLight; // luz da masmorra (tremeluz)

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(FOG_COLOR);
    this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 2.6, CELL * 11);

    this.camera = new THREE.PerspectiveCamera(66, 1, 0.05, 400);

    const start = findStart();
    this.col = start.col;
    this.row = start.row;

    this.buildLights();
    this.buildVillage();

    this.camera.position.set(this.col * CELL, EYE_H, this.row * CELL);
    this.camera.rotation.order = "YXZ";
    this.camera.rotation.y = 0; // olhando p/ o norte

    setupControls(container, (a) => this.onAction(a));
    window.addEventListener("resize", () => this.resize());
    this.resize();
    this.renderer.setAnimationLoop((t) => this.tick(t));
  }

  // ------------------------------------------------------------- cena
  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0x8a92a2, 0.75));
    const hemi = new THREE.HemisphereLight(0x9aa6b8, 0x3a2c1c, 0.7);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffe7c0, 0.55);
    dir.position.set(-6, 12, 4);
    this.scene.add(dir);
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
        this.scene.add(t);
      }

    const boxGeo = new THREE.BoxGeometry(CELL, WALL_H, CELL);
    const hash = (a: number, b: number, s = 0) =>
      (Math.sin(a * 12.9 + b * 78.2 + s * 3.1) * 43758.5) % 1;

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
        this.scene.add(box);

        for (const [dc, dr] of streetDirs) {
          // porta/janela deterministicamente (o telhado é feito em trechos)
          const h = Math.abs(hash(c, r, dc * 2 + dr));
          if (h < 0.28) {
            this.addDecal(c, r, dc, dr, doorMat, "door");
            doorFaces.add(`${c},${r},${dc},${dr}`);
          } else if (h < 0.72) {
            this.addDecal(c, r, dc, dr, winMat, "window");
          }
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
    this.buildSigns();
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
        this.scene.add(box);
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
          this.scene.add(chunk);
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
        this.scene.add(grp);
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
    this.scene.add(grp);
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
        this.scene.add(ceil);
        // chão de laje (escada substitui o chão)
        if (!stairs) {
          const fl = new THREE.Mesh(new THREE.PlaneGeometry(CELL, CELL), floorMat);
          fl.rotation.x = -Math.PI / 2;
          fl.position.set(cx, 0.03, cz);
          this.scene.add(fl);
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
        this.scene.add(post);
        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), flameMat);
        flame.position.set(cx + s * (CELL / 2 - 0.25), 2.55, cz);
        this.scene.add(flame);
      }
      const light = new THREE.PointLight(0xffa040, 7, 16, 2);
      light.position.set(cx, 2.4, cz + 0.5);
      this.scene.add(light);
      this.torch = light;
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
    this.scene.add(wall);
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
      this.scene.add(step);
    }
    // base escura do poço
    const base = new THREE.Mesh(
      new THREE.PlaneGeometry(CELL, CELL),
      new THREE.MeshBasicMaterial({ color: 0x050506 }),
    );
    base.rotation.x = -Math.PI / 2;
    base.position.set(cx, bottomY + 0.02, cz);
    this.scene.add(base);
    // luzes quentes iluminando os degraus de cima (revela o vão da escada)
    const g1 = new THREE.PointLight(0xffbf70, 6, 13, 2);
    g1.position.set(cx, 2.6, cz + CELL / 2 - 0.3);
    this.scene.add(g1);
    const g2 = new THREE.PointLight(0xffa050, 3.5, 8, 2);
    g2.position.set(cx, 0.4, cz - 0.6);
    this.scene.add(g2);
  }

  // placas de taverna e loja penduradas nas paredes da rua principal
  private buildSigns() {
    const woodMat = new THREE.MeshLambertMaterial({ map: tex.woodPlanks(5) });
    const mount = (
      c: number,
      r: number,
      dc: number,
      dr: number,
      kind: "tavern" | "shop",
    ) => {
      const grp = new THREE.Group();
      const y = WALL_H * 0.78;
      // suporte de madeira saindo da parede até a placa
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.55), woodMat);
      bracket.position.set(0, y + 0.78, 0.26);
      grp.add(bracket);
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(1.9, 1.45),
        new THREE.MeshLambertMaterial({
          map: tex.sign(kind),
          transparent: true,
          side: THREE.DoubleSide,
        }),
      );
      board.position.set(0, y, 0.45); // pende à frente da parede
      grp.add(board);
      const fx = c * CELL + dc * (CELL / 2 + 0.06);
      const fz = r * CELL + dr * (CELL / 2 + 0.06);
      grp.position.set(fx, 0, fz);
      if (dc === 1) grp.rotation.y = Math.PI / 2;
      else if (dc === -1) grp.rotation.y = -Math.PI / 2;
      else if (dr === 1) grp.rotation.y = 0;
      else grp.rotation.y = Math.PI;
      this.scene.add(grp);
    };
    mount(5, 14, 1, 0, "tavern"); // parede oeste da rua (à esquerda subindo)
    mount(9, 12, -1, 0, "shop"); // parede leste da rua (à direita subindo)
  }

  // aldeões (billboards que sempre encaram a câmera)
  private buildNPCs() {
    const spots: [number, number, number][] = [
      [2, 9, 1],
      [9, 9, 2],
      [7, 13, 3],
      [10, 9, 5],
    ];
    for (const [c, r, seed] of spots) {
      const mat = new THREE.MeshLambertMaterial({
        map: tex.villager(seed),
        transparent: true,
        alphaTest: 0.5,
        side: THREE.DoubleSide,
      });
      const npc = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 2.0), mat);
      npc.position.set(c * CELL, 1.0, r * CELL);
      this.scene.add(npc);
      this.npcs.push(npc);
    }
  }

  private canWalk(c: number, r: number): boolean {
    return isWalkable(c, r) && !this.blocked.has(`${c},${r}`);
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
    this.scene.add(this.quad(s0, s1, k1, k0, mat, len, frontLen));
    this.scene.add(this.quad(k0, k1, b1, b0, mat, len, backLen));
    // tampas de empena (triângulos) nas duas pontas do trecho
    this.scene.add(this.tri(s0, k0, b0, mat));
    this.scene.add(this.tri(s1, b1, k1, mat));
    // borda de palha (beiral frontal) — dá espessura sobre a rua
    const s0d = s0.clone();
    s0d.y -= FASCIA;
    const s1d = s1.clone();
    s1d.y -= FASCIA;
    this.scene.add(this.quad(s0d, s1d, s1, s0, mat, len, 0.3));
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
    this.scene.add(plane);
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
    // tocha da masmorra tremeluz
    if (this.torch)
      this.torch.intensity = 5.2 + Math.sin(now * 0.011) * 0.8 + Math.sin(now * 0.027) * 0.5;
    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
