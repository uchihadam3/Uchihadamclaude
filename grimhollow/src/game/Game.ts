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
import { COLS, ROWS, cellAt, isWalkable, findStart, MAP } from "./village";
import * as tex from "./textures";
import { setupControls, type Action } from "./controls";

// direções: 0=N,1=E,2=S,3=O  (dcol, drow)
const DIRS: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

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
    const cobbleTex = tex.cobblestone(7);
    cobbleTex.repeat.set(COLS, ROWS);
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

    // chão de pedra (um plano cobrindo o mapa)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(COLS * CELL, ROWS * CELL),
      new THREE.MeshLambertMaterial({ map: cobbleTex }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(
      ((COLS - 1) / 2) * CELL,
      0,
      ((ROWS - 1) / 2) * CELL,
    );
    this.scene.add(floor);

    const boxGeo = new THREE.BoxGeometry(CELL, WALL_H, CELL);
    const hash = (a: number, b: number, s = 0) =>
      (Math.sin(a * 12.9 + b * 78.2 + s * 3.1) * 43758.5) % 1;

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
          if (h < 0.28) this.addDecal(c, r, dc, dr, doorMat, "door");
          else if (h < 0.72) this.addDecal(c, r, dc, dr, winMat, "window");
        }
      }
    }

    // telhados CONTÍNUOS por trecho de parede (evita retalhos soltos)
    this.buildRoofs(thatchMat);

    // barris (pequenos, encostados na parede)
    const barrelGeo = new THREE.CylinderGeometry(0.42, 0.36, 1.1, 12);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (cellAt(c, r) === "barrel") {
          const b = new THREE.Mesh(barrelGeo, barrelMat);
          const near = DIRS.find(([dc, dr]) => cellAt(c + dc, r + dr) === "building");
          const ox = near ? near[0] * (CELL / 2 - 0.6) : 0;
          const oz = near ? near[1] * (CELL / 2 - 0.6) : 0;
          b.position.set(c * CELL + ox, 0.55, r * CELL + oz);
          this.scene.add(b);
        }

    void MAP;
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
    if (!isWalkable(nc, nr)) return;
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
