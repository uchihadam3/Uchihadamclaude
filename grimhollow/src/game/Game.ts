import * as THREE from "three";
import {
  CELL,
  WALL_H,
  ROOF_H,
  ROOF_OVER,
  FASCIA,
  EYE_H,
  RENDER_H,
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
      antialias: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(1);
    container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(FOG_COLOR);
    this.scene.fog = new THREE.Fog(FOG_COLOR, CELL * 2.2, CELL * 8.5);

    this.camera = new THREE.PerspectiveCamera(72, 1, 0.1, 400);

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
          this.addRoof(c, r, dc, dr, thatchMat);
          // porta/janela deterministicamente
          const h = Math.abs(hash(c, r, dc * 2 + dr));
          if (h < 0.28) this.addDecal(c, r, dc, dr, doorMat, "door");
          else if (h < 0.72) this.addDecal(c, r, dc, dr, winMat, "window");
        }
      }
    }

    // barris (menores, encostados na parede)
    const barrelGeo = new THREE.CylinderGeometry(0.58, 0.5, 1.5, 12);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (cellAt(c, r) === "barrel") {
          const b = new THREE.Mesh(barrelGeo, barrelMat);
          // encosta o barril na parede de casa mais próxima
          const near = DIRS.find(([dc, dr]) => cellAt(c + dc, r + dr) === "building");
          const ox = near ? near[0] * (CELL / 2 - 0.7) : 0;
          const oz = near ? near[1] * (CELL / 2 - 0.7) : 0;
          b.position.set(c * CELL + ox, 0.75, r * CELL + oz);
          this.scene.add(b);
        }

    void MAP;
  }

  private addDecal(
    c: number,
    r: number,
    dc: number,
    dr: number,
    mat: THREE.Material,
    kind: "door" | "window",
  ) {
    const w = kind === "door" ? CELL * 0.5 : CELL * 0.42;
    const h = kind === "door" ? WALL_H * 0.62 : CELL * 0.42;
    const y = kind === "door" ? h / 2 + 0.05 : WALL_H * 0.55;
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

  private addRoof(
    c: number,
    r: number,
    dc: number,
    dr: number,
    mat: THREE.Material,
  ) {
    const cx = c * CELL;
    const cz = r * CELL;
    // frente (beiral, sobre a rua, baixo) e trás (cumeeira, no interior, alto)
    const fx = cx + dc * (CELL / 2 + ROOF_OVER);
    const fz = cz + dr * (CELL / 2 + ROOF_OVER);
    const bx = cx - dc * (CELL / 2);
    const bz = cz - dr * (CELL / 2);
    const px = dr; // perpendicular no plano XZ
    const pz = -dc;
    const half = CELL / 2 + 0.06; // leve sobreposição p/ fechar frestas entre células
    const eaveY = WALL_H - 0.15;
    const ridgeY = WALL_H + ROOF_H;
    // superfície inclinada de palha (topo)
    const a = new THREE.Vector3(fx + px * half, eaveY, fz + pz * half);
    const b = new THREE.Vector3(fx - px * half, eaveY, fz - pz * half);
    const d = new THREE.Vector3(bx + px * half, ridgeY, bz + pz * half);
    const e = new THREE.Vector3(bx - px * half, ridgeY, bz - pz * half);
    this.scene.add(this.quad(a, b, e, d, mat));
    // borda de palha no beiral (dá espessura ao telhado)
    const a2 = new THREE.Vector3(fx + px * half, eaveY - FASCIA, fz + pz * half);
    const b2 = new THREE.Vector3(fx - px * half, eaveY - FASCIA, fz - pz * half);
    this.scene.add(this.quad(a2, b2, b, a, mat));
  }

  private quad(
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    d: THREE.Vector3,
    mat: THREE.Material,
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
        new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
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
    const scale = RENDER_H / h;
    this.renderer.setSize(Math.max(1, Math.round(w * scale)), RENDER_H, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
