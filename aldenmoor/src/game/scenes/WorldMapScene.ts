import Phaser from "phaser";
import { WORLD, START_LOCATION_ID } from "../data/world";
import type { LocationType, WorldLocation } from "../types";
import { WorldMapManager, type WorldPoint } from "../systems/WorldMapManager";
import { TimeManager } from "../systems/TimeManager";
import { bus, EVENTS } from "../bus";
import {
  WORLD_W,
  WORLD_H,
  MINUTES_PER_UNIT,
  TRAVEL_PX_PER_SEC,
  pctToWorld,
  INK,
  INK_SOFT,
  SEA,
} from "../config";

const MAX_ZOOM = 2.0;
const CREAM = 0xf4e7c4;
const RED = 0x8f3a2a;
const GOLD = 0xc9a227;

// PRNG determinístico (mulberry32) para espalhar glifos de forma reproduzível.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Contorno do continente (em %), envolvendo todos os locais.
const COAST: [number, number][] = [
  [50, 5], [61, 7], [70, 11], [79, 10], [87, 16], [91, 25], [88, 34],
  [93, 43], [90, 53], [93, 63], [87, 73], [90, 83], [81, 87], [71, 84],
  [63, 90], [51, 93], [41, 90], [33, 92], [25, 86], [17, 89], [11, 80],
  [15, 70], [8, 60], [12, 50], [7, 40], [13, 31], [9, 22], [18, 15],
  [29, 12], [39, 8],
];

export class WorldMapScene extends Phaser.Scene {
  private mgr!: WorldMapManager;
  private gameClock = new TimeManager();

  private currentId: string | null = START_LOCATION_ID; // null = em campo aberto
  private selectedId: string | null = null;
  private inLocation = false;
  // movimentação por joystick
  private moving = false;
  private moveDir = { x: 0, y: 0 };

  private marker!: Phaser.GameObjects.Container;
  private dirArrow!: Phaser.GameObjects.Container;
  private selRing!: Phaser.GameObjects.Arc;
  private overlay!: Phaser.GameObjects.Rectangle;
  private vision!: Phaser.GameObjects.Image;

  // input / câmera
  private minZoom = 0.3;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private dragDist = 0;
  private consumedTap = false;
  private pinchDist = 0;

  private lastClock = "";
  private lastPhase = "";

  constructor() {
    super("world");
  }

  create() {
    this.mgr = new WorldMapManager(WORLD);

    const world = this.add.container(0, 0);
    this.drawSeaAndLand(world);
    this.drawRegions(world);
    this.drawTerrain(world);
    this.drawRivers(world);
    this.drawRoads(world);
    this.drawFrame(world);
    this.drawPois(world);
    this.drawMarker(world);

    // seleção (anel) — acima do mapa
    this.selRing = this.add
      .circle(0, 0, 30)
      .setStrokeStyle(4, GOLD, 0.95)
      .setVisible(false);
    world.add(this.selRing);

    // overlay dia/noite (fixo à tela, abaixo do HUD que é outra cena)
    this.overlay = this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0x0b1636, 0)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(998);

    // holofote de visão (fog-of-war) — acompanha o jogador
    this.vision = this.add
      .image(0, 0, "vision")
      .setScrollFactor(0)
      .setDepth(999);
    this.sizeVision();

    this.setupCamera();
    this.setupInput();

    // estado inicial (adiado para garantir que o HUD já assinou o bus)
    this.time.delayedCall(60, () => {
      const startLoc = this.mgr.location(this.currentId!);
      this.selectLocation(startLoc);
      bus.emit(EVENTS.LOCATION_ARRIVE, startLoc);
      this.emitTime(true);
    });

    // HUD -> mundo
    bus.on(EVENTS.ACTION_TRAVEL, this.onTravelRequest, this);
    bus.on(EVENTS.ACTION_ZOOM, this.onZoomButton, this);
    bus.on(EVENTS.ACTION_ENTER, this.onEnter, this);
    bus.on(EVENTS.ACTION_EXIT, this.onExit, this);
    this.events.once("shutdown", () => {
      bus.off(EVENTS.ACTION_TRAVEL, this.onTravelRequest, this);
      bus.off(EVENTS.ACTION_ZOOM, this.onZoomButton, this);
      bus.off(EVENTS.ACTION_ENTER, this.onEnter, this);
      bus.off(EVENTS.ACTION_EXIT, this.onExit, this);
    });
  }

  private sizeVision() {
    const diag = Math.hypot(this.scale.width, this.scale.height) * 1.18;
    this.vision.setDisplaySize(diag, diag);
  }

  // ---------------------------------------------------------------- desenho
  private drawSeaAndLand(world: Phaser.GameObjects.Container) {
    // fundo de mar
    const sea = this.add.rectangle(0, 0, WORLD_W, WORLD_H, SEA).setOrigin(0);
    world.add(sea);

    // hachura do mar (linhas onduladas) — visível só fora da terra
    const hatch = this.add.graphics();
    hatch.lineStyle(1.5, 0x7a9a90, 0.5);
    for (let y = 20; y < WORLD_H; y += 26) {
      hatch.beginPath();
      for (let x = 0; x <= WORLD_W; x += 24) {
        const yy = y + Math.sin(x * 0.03 + y) * 3;
        if (x === 0) hatch.moveTo(x, yy);
        else hatch.lineTo(x, yy);
      }
      hatch.strokePath();
    }
    world.add(hatch);

    // polígono do continente
    const pts = COAST.map(([xp, yp]) => pctToWorld(xp, yp));

    // pergaminho recortado na terra (máscara geométrica)
    const parchment = this.add.image(0, 0, "parchment").setOrigin(0);
    const maskG = this.make.graphics({ x: 0, y: 0 });
    maskG.fillStyle(0xffffff);
    maskG.beginPath();
    maskG.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p) => maskG.lineTo(p.x, p.y));
    maskG.closePath();
    maskG.fillPath();
    parchment.setMask(maskG.createGeometryMask());
    world.add(parchment);

    // litoral (linha dupla estilo carta antiga)
    const coast = this.add.graphics();
    const drawClosed = (w: number, color: number, alpha: number) => {
      coast.lineStyle(w, color, alpha);
      coast.beginPath();
      coast.moveTo(pts[0].x, pts[0].y);
      pts.forEach((p) => coast.lineTo(p.x, p.y));
      coast.closePath();
      coast.strokePath();
    };
    drawClosed(6, INK, 0.9);
    drawClosed(2, INK_SOFT, 0.7);
    world.add(coast);
  }

  private regionCenters() {
    const map = new Map<string, { x: number; y: number; r: number }>();
    for (const reg of WORLD.regions) {
      const locs = WORLD.locations.filter((l) => l.region === reg.id);
      const pos = locs.map((l) => pctToWorld(l.x, l.y));
      const cx = pos.reduce((s, p) => s + p.x, 0) / pos.length;
      const cy = pos.reduce((s, p) => s + p.y, 0) / pos.length;
      const r =
        Math.max(120, ...pos.map((p) => Math.hypot(p.x - cx, p.y - cy))) + 170;
      map.set(reg.id, { x: cx, y: cy, r });
    }
    return map;
  }

  private drawRegions(world: Phaser.GameObjects.Container) {
    const centers = this.regionCenters();
    for (const reg of WORLD.regions) {
      const c = centers.get(reg.id)!;
      // tom suave da região
      const g = this.add.graphics();
      g.fillStyle(reg.color, 0.13);
      g.fillCircle(c.x, c.y, c.r * 0.9);
      world.add(g);
      // rótulo da região
      const label = this.add
        .text(c.x, c.y - c.r * 0.55, reg.name.toUpperCase(), {
          fontFamily: "Georgia, serif",
          fontSize: "34px",
          color: "#4a3420",
          fontStyle: "italic bold",
        })
        .setOrigin(0.5)
        .setAlpha(0.42);
      world.add(label);
    }
  }

  private drawTerrain(world: Phaser.GameObjects.Container) {
    const centers = this.regionCenters();
    const g = this.add.graphics();
    for (const reg of WORLD.regions) {
      const c = centers.get(reg.id)!;
      const rand = rng(
        reg.id.split("").reduce((s, ch) => s + ch.charCodeAt(0), 0),
      );
      const n = 20;
      for (let i = 0; i < n; i++) {
        const ang = rand() * Math.PI * 2;
        const rad = Math.sqrt(rand()) * c.r * 0.82;
        const x = c.x + Math.cos(ang) * rad;
        const y = c.y + Math.sin(ang) * rad * 0.85;
        const s = 0.8 + rand() * 0.6;
        switch (reg.id) {
          case "picos":
            this.glyphMountain(g, x, y, s);
            break;
          case "floresta":
            this.glyphTree(g, x, y, s);
            break;
          case "ermo":
            this.glyphDune(g, x, y, s);
            break;
          case "costa":
            this.glyphWave(g, x, y, s);
            break;
          default:
            this.glyphGrass(g, x, y, s);
        }
      }
    }
    world.add(g);
  }

  private glyphMountain(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number) {
    const w = 26 * s;
    const h = 22 * s;
    g.fillStyle(0x9a8f7d, 1);
    g.lineStyle(2, INK, 0.8);
    g.fillTriangle(x - w / 2, y + h / 2, x, y - h / 2, x + w / 2, y + h / 2);
    g.strokeTriangle(x - w / 2, y + h / 2, x, y - h / 2, x + w / 2, y + h / 2);
    // capa de neve
    g.fillStyle(0xf3f0ea, 1);
    g.fillTriangle(x - w * 0.16, y - h * 0.18, x, y - h / 2, x + w * 0.16, y - h * 0.18);
  }
  private glyphTree(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number) {
    g.fillStyle(0x5a3a22, 1);
    g.fillRect(x - 1.5 * s, y + 4 * s, 3 * s, 6 * s);
    g.fillStyle(0x3f5c39, 1);
    g.lineStyle(1.5, 0x2c3f28, 0.8);
    for (let k = 0; k < 3; k++) {
      const yy = y + 4 * s - k * 6 * s;
      const w = (14 - k * 3) * s;
      g.fillTriangle(x - w / 2, yy, x, yy - 9 * s, x + w / 2, yy);
    }
  }
  private glyphDune(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number) {
    g.lineStyle(2, 0x9c7f4f, 0.7);
    g.beginPath();
    g.moveTo(x - 12 * s, y);
    g.lineTo(x - 3 * s, y - 5 * s);
    g.lineTo(x + 6 * s, y);
    g.lineTo(x + 13 * s, y - 3 * s);
    g.strokePath();
  }
  private glyphWave(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number) {
    g.lineStyle(2, 0x6b8f92, 0.6);
    g.beginPath();
    g.moveTo(x - 10 * s, y);
    g.lineTo(x - 4 * s, y - 4 * s);
    g.lineTo(x + 2 * s, y);
    g.lineTo(x + 8 * s, y - 4 * s);
    g.strokePath();
  }
  private glyphGrass(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number) {
    g.lineStyle(1.5, 0x6f7a44, 0.6);
    g.lineBetween(x, y, x - 3 * s, y - 6 * s);
    g.lineBetween(x, y, x, y - 7 * s);
    g.lineBetween(x, y, x + 3 * s, y - 6 * s);
  }

  private drawRivers(world: Phaser.GameObjects.Container) {
    const riverPct: [number, number][] = [
      [63, 15], [58, 24], [53, 34], [47, 44], [41, 53], [35, 60], [30, 65],
    ];
    const pts = riverPct.map(([xp, yp]) => pctToWorld(xp, yp));
    const g = this.add.graphics();
    g.lineStyle(7, 0x6f97a6, 0.85);
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p) => g.lineTo(p.x, p.y));
    g.strokePath();
    g.lineStyle(2.5, 0xbfe0e6, 0.5);
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p) => g.lineTo(p.x, p.y));
    g.strokePath();
    world.add(g);
  }

  private drawRoads(world: Phaser.GameObjects.Container) {
    const g = this.add.graphics();
    for (const road of WORLD.roads) {
      const a = this.mgr.pos(road.a);
      const b = this.mgr.pos(road.b);
      const w = road.terrain === "road" ? 4 : road.terrain === "trail" ? 3 : 2.5;
      this.dashedLine(g, a.x, a.y, b.x, b.y, INK_SOFT, w, road.terrain === "wild");
    }
    world.add(g);
  }

  private dashedLine(
    g: Phaser.GameObjects.Graphics,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: number,
    width: number,
    dotted: boolean,
  ) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const dash = dotted ? 4 : 15;
    const gap = dotted ? 9 : 11;
    const steps = Math.floor(len / (dash + gap));
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    g.lineStyle(width, color, 0.85);
    for (let i = 0; i <= steps; i++) {
      const s = i * (dash + gap);
      const e = Math.min(s + dash, len);
      g.lineBetween(x1 + ux * s, y1 + uy * s, x1 + ux * e, y1 + uy * e);
    }
  }

  private drawFrame(world: Phaser.GameObjects.Container) {
    const g = this.add.graphics();
    const m = 26;
    g.lineStyle(6, INK, 0.85);
    g.strokeRect(m, m, WORLD_W - m * 2, WORLD_H - m * 2);
    g.lineStyle(2, INK_SOFT, 0.8);
    g.strokeRect(m + 10, m + 10, WORLD_W - (m + 10) * 2, WORLD_H - (m + 10) * 2);
    world.add(g);

    // rosa dos ventos no canto
    const cx = WORLD_W - 150;
    const cy = 150;
    const r = this.add.graphics();
    r.lineStyle(3, INK, 0.85);
    r.strokeCircle(cx, cy, 54);
    r.lineStyle(2, INK, 0.7);
    r.strokeCircle(cx, cy, 40);
    r.fillStyle(INK, 0.9);
    const pt = (ang: number, rad: number) => ({
      x: cx + Math.cos(ang) * rad,
      y: cy + Math.sin(ang) * rad,
    });
    for (let k = 0; k < 4; k++) {
      const a = (k * Math.PI) / 2 - Math.PI / 2;
      const tip = pt(a, 60);
      const l = pt(a + Math.PI / 2, 10);
      const rr = pt(a - Math.PI / 2, 10);
      r.fillTriangle(tip.x, tip.y, l.x, l.y, rr.x, rr.y);
    }
    world.add(r);
    const nLabel = this.add
      .text(cx, cy - 74, "N", {
        fontFamily: "Georgia, serif",
        fontSize: "26px",
        color: "#3a2a17",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    world.add(nLabel);

    // cartela do título
    const tx = 150;
    const ty = WORLD_H - 120;
    const card = this.add.graphics();
    card.fillStyle(0x3a2a17, 0.12);
    card.fillRoundedRect(tx - 130, ty - 44, 360, 92, 10);
    card.lineStyle(2, INK, 0.6);
    card.strokeRoundedRect(tx - 130, ty - 44, 360, 92, 10);
    world.add(card);
    world.add(
      this.add
        .text(tx + 50, ty - 20, WORLD.name, {
          fontFamily: "Georgia, serif",
          fontSize: "40px",
          color: "#3a2a17",
          fontStyle: "bold",
        })
        .setOrigin(0.5),
    );
    world.add(
      this.add
        .text(tx + 50, ty + 20, WORLD.subtitle, {
          fontFamily: "Georgia, serif",
          fontSize: "20px",
          color: "#5a4326",
          fontStyle: "italic",
        })
        .setOrigin(0.5),
    );
  }

  private drawPois(world: Phaser.GameObjects.Container) {
    for (const loc of WORLD.locations) {
      const p = this.mgr.pos(loc.id);
      const c = this.add.container(p.x, p.y);

      const dot = this.add.circle(0, 0, 3, INK);
      c.add(dot);

      const icon = this.add.graphics();
      this.drawIcon(icon, loc.type);
      c.add(icon);

      const label = this.add
        .text(0, 24, loc.name, {
          fontFamily: "Georgia, serif",
          fontSize: "21px",
          color: "#2a1c0e",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0);
      label.setStroke("#f2e6c4", 5);
      c.add(label);

      const hit = this.add.circle(0, 0, 30, 0xffffff, 0.001).setInteractive();
      hit.on("pointerup", () => {
        if (this.registry.get("uiCapture")) return;
        if (this.dragDist < 12) {
          this.consumedTap = true;
          this.onPoiTap(loc);
        }
      });
      c.add(hit);

      world.add(c);
    }
  }

  private drawIcon(g: Phaser.GameObjects.Graphics, type: LocationType) {
    g.lineStyle(2, INK, 1);
    switch (type) {
      case "city":
        g.fillStyle(CREAM, 1);
        g.fillRect(-14, -2, 28, 12);
        g.strokeRect(-14, -2, 28, 12);
        for (const x of [-14, -8, -2, 4, 10]) {
          g.fillRect(x, -6, 4, 4);
          g.strokeRect(x, -6, 4, 4);
        }
        g.fillRect(-4, -16, 8, 14);
        g.strokeRect(-4, -16, 8, 14);
        g.fillStyle(RED, 1);
        g.fillRect(-4, -19, 3, 3);
        g.fillRect(1, -19, 3, 3);
        break;
      case "village":
        g.fillStyle(CREAM, 1);
        g.fillRect(-8, -2, 16, 12);
        g.strokeRect(-8, -2, 16, 12);
        g.fillStyle(RED, 1);
        g.fillTriangle(-10, -2, 0, -13, 10, -2);
        g.strokeTriangle(-10, -2, 0, -13, 10, -2);
        g.fillStyle(INK, 1);
        g.fillRect(-2, 4, 4, 6);
        break;
      case "castle":
        g.fillStyle(CREAM, 1);
        g.fillRect(-12, -6, 24, 16);
        g.strokeRect(-12, -6, 24, 16);
        g.fillRect(-16, -10, 7, 20);
        g.strokeRect(-16, -10, 7, 20);
        g.fillRect(9, -10, 7, 20);
        g.strokeRect(9, -10, 7, 20);
        g.lineStyle(2, INK, 1);
        g.lineBetween(0, -6, 0, -20);
        g.fillStyle(RED, 1);
        g.fillTriangle(0, -20, 12, -17, 0, -14);
        break;
      case "ruin":
        g.fillStyle(CREAM, 1);
        g.fillRect(-11, -12, 5, 20);
        g.strokeRect(-11, -12, 5, 20);
        g.fillRect(6, -6, 5, 14);
        g.strokeRect(6, -6, 5, 14);
        g.fillRect(-12, -16, 11, 4);
        g.strokeRect(-12, -16, 11, 4);
        g.fillStyle(INK, 0.8);
        g.fillCircle(-1, 10, 2);
        g.fillCircle(4, 11, 1.5);
        break;
      case "dungeon":
        g.fillStyle(0x8f8069, 1);
        g.fillRoundedRect(-14, -10, 28, 20, 5);
        g.strokeRoundedRect(-14, -10, 28, 20, 5);
        g.fillStyle(0x140f0b, 1);
        g.fillRoundedRect(-6, -3, 12, 13, { tl: 6, tr: 6, bl: 0, br: 0 });
        break;
      case "tower":
        g.fillStyle(CREAM, 1);
        g.fillRect(-5, -14, 10, 24);
        g.strokeRect(-5, -14, 10, 24);
        g.fillStyle(0x5a3a7a, 1);
        g.fillTriangle(-8, -14, 0, -26, 8, -14);
        g.strokeTriangle(-8, -14, 0, -26, 8, -14);
        g.fillStyle(GOLD, 1);
        g.fillCircle(0, -3, 2.5);
        break;
      case "port":
        g.lineStyle(3, INK, 1);
        g.strokeCircle(0, -11, 4);
        g.lineBetween(0, -7, 0, 11);
        g.lineBetween(-9, -1, 9, -1);
        g.lineBetween(0, 11, -9, 4);
        g.lineBetween(0, 11, 9, 4);
        g.lineBetween(-9, 4, -11, 8);
        g.lineBetween(9, 4, 11, 8);
        break;
      case "camp":
        // tenda
        g.fillStyle(0xb08a4a, 1);
        g.fillTriangle(-12, 8, 0, -12, 12, 8);
        g.strokeTriangle(-12, 8, 0, -12, 12, 8);
        g.fillStyle(0x2a1c0e, 1);
        g.fillTriangle(-4, 8, 0, -3, 4, 8);
        // fogueira
        g.fillStyle(RED, 1);
        g.fillCircle(10, 8, 2.5);
        break;
      case "shrine":
        // menir / pedra ritual
        g.fillStyle(0xa9a29a, 1);
        g.beginPath();
        g.moveTo(-7, 10);
        g.lineTo(-5, -12);
        g.lineTo(5, -14);
        g.lineTo(7, 10);
        g.closePath();
        g.fillPath();
        g.strokePath();
        g.fillStyle(GOLD, 1);
        g.fillCircle(0, -4, 3);
        break;
      case "mine":
        // entrada de mina com escoras de madeira
        g.fillStyle(0x7a6a52, 1);
        g.fillRoundedRect(-13, -8, 26, 18, 4);
        g.strokeRoundedRect(-13, -8, 26, 18, 4);
        g.fillStyle(0x120d09, 1);
        g.fillRoundedRect(-6, -2, 12, 12, { tl: 6, tr: 6, bl: 0, br: 0 });
        g.fillStyle(0x5a3a22, 1);
        g.fillRect(-8, -4, 3, 14);
        g.fillRect(5, -4, 3, 14);
        g.fillRect(-8, -6, 16, 3);
        break;
    }
  }

  private drawMarker(world: Phaser.GameObjects.Container) {
    const start = this.mgr.pos(this.currentId!);
    const c = this.add.container(start.x, start.y);
    // sombra
    const sh = this.add.ellipse(0, 12, 26, 9, 0x000000, 0.35);
    c.add(sh);
    // base
    const base = this.add.graphics();
    base.fillStyle(0x2a1c10, 1);
    base.fillEllipse(0, 10, 24, 10);
    base.lineStyle(2, GOLD, 0.9);
    base.strokeEllipse(0, 10, 24, 10);
    c.add(base);
    // corpo (peça de tabuleiro)
    const body = this.add.graphics();
    body.fillStyle(RED, 1);
    body.lineStyle(2.5, 0x2a1008, 1);
    body.beginPath();
    body.moveTo(-8, 8);
    body.lineTo(-4, -6);
    body.lineTo(4, -6);
    body.lineTo(8, 8);
    body.closePath();
    body.fillPath();
    body.strokePath();
    body.fillStyle(RED, 1);
    body.fillCircle(0, -12, 7);
    body.lineStyle(2.5, 0x2a1008, 1);
    body.strokeCircle(0, -12, 7);
    // brilho
    body.fillStyle(0xffffff, 0.25);
    body.fillCircle(-2, -14, 2.5);
    c.add(body);
    c.setDepth(500);
    world.add(c);
    this.marker = c;

    // seta/arco de direção (aparece ao mover), aponta para +x por padrão
    const arrow = this.add.container(start.x, start.y).setDepth(499);
    const ag = this.add.graphics();
    ag.fillStyle(GOLD, 0.95);
    ag.lineStyle(2, 0x2a1808, 0.9);
    // arco curvo saindo do personagem
    ag.beginPath();
    ag.arc(0, 0, 34, -0.5, 0.5, false);
    ag.strokePath();
    // ponta da seta
    ag.fillTriangle(30, -14, 46, 0, 30, 14);
    ag.strokeTriangle(30, -14, 46, 0, 30, 14);
    arrow.add(ag);
    arrow.setVisible(false);
    world.add(arrow);
    this.dirArrow = arrow;
  }

  // --------------------------------------------------------------- câmera
  private fitZoom() {
    return Math.min(this.scale.width / WORLD_W, this.scale.height / WORLD_H);
  }

  private coverZoom() {
    return Math.max(this.scale.width / WORLD_W, this.scale.height / WORLD_H);
  }

  private setupCamera() {
    const cam = this.cameras.main;
    cam.setBounds(0, 0, WORLD_W, WORLD_H);
    cam.setBackgroundColor(0x17272a);
    // minZoom = "cover": o mapa SEMPRE preenche a tela (nada de vazio/mancha).
    this.minZoom = this.coverZoom();
    cam.setZoom(Math.min(MAX_ZOOM, this.coverZoom() * 1.8)); // começa mais perto
    const s = this.mgr.pos(this.currentId!);
    cam.centerOn(s.x, s.y);
    // câmera acompanha o personagem o tempo todo
    cam.startFollow(this.marker, false, 0.12, 0.12);

    this.scale.on("resize", (gameSize: Phaser.Structs.Size) => {
      this.minZoom = this.coverZoom();
      if (cam.zoom < this.minZoom) cam.setZoom(this.minZoom);
      this.overlay.setSize(gameSize.width, gameSize.height);
      this.sizeVision();
    });
  }

  private zoomAt(sx: number, sy: number, newZoom: number) {
    const cam = this.cameras.main;
    newZoom = Phaser.Math.Clamp(newZoom, this.minZoom, MAX_ZOOM);
    const before = cam.getWorldPoint(sx, sy);
    cam.setZoom(newZoom);
    const after = cam.getWorldPoint(sx, sy);
    cam.scrollX += before.x - after.x;
    cam.scrollY += before.y - after.y;
  }

  private onZoomButton(dir: number) {
    const cam = this.cameras.main;
    this.zoomAt(
      this.scale.width / 2,
      this.scale.height / 2,
      cam.zoom * (dir > 0 ? 1.25 : 0.8),
    );
  }

  // --------------------------------------------------------------- input
  private setupInput() {
    this.input.addPointer(3);

    // pinça de zoom (dois dedos). O movimento é pelo joystick.
    this.input.on("pointermove", () => {
      const p1 = this.input.pointer1;
      const p2 = this.input.pointer2;
      if (p1.isDown && p2.isDown && !this.registry.get("joyActive")) {
        const d = Phaser.Math.Distance.Between(p1.x, p1.y, p2.x, p2.y);
        if (this.pinchDist > 0) {
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          this.zoomAt(mx, my, this.cameras.main.zoom * (d / this.pinchDist));
        }
        this.pinchDist = d;
      }
    });

    this.input.on("pointerup", () => {
      this.pinchDist = 0;
    });

    this.input.on(
      "wheel",
      (p: Phaser.Input.Pointer, _o: unknown, _dx: number, dy: number) => {
        this.zoomAt(p.x, p.y, this.cameras.main.zoom * (dy > 0 ? 0.88 : 1.12));
      },
    );
  }

  // ------------------------------------------------------------ seleção
  private onPoiTap(loc: WorldLocation) {
    // tocar num local só mostra a ficha (informação); mover é pelo joystick
    this.selectLocation(loc);
  }

  private selectLocation(loc: WorldLocation | null) {
    this.selectedId = loc?.id ?? null;
    if (loc) {
      const p = this.mgr.pos(loc.id);
      this.selRing.setPosition(p.x, p.y).setVisible(true);
    } else {
      this.selRing.setVisible(false);
    }
    bus.emit(EVENTS.LOCATION_SELECT, {
      loc,
      isCurrent: loc?.id === this.currentId,
      traveling: this.moving,
    });
  }

  private onTravelRequest() {
    /* obsoleto: movimento agora é pelo joystick */
  }

  // -------------------------------------------------------- entrar / sair
  private onEnter(locId: string) {
    if (this.inLocation || this.currentId !== locId) return;
    this.inLocation = true;
    const p = this.mgr.pos(locId);
    this.cameras.main.stopFollow();
    this.cameras.main.pan(p.x, p.y, 450, "Sine.easeInOut");
    this.cameras.main.zoomTo(MAX_ZOOM, 550, "Sine.easeInOut");
  }

  private onExit() {
    if (!this.inLocation) return;
    this.inLocation = false;
    this.cameras.main.zoomTo(this.coverZoom() * 1.8, 450, "Sine.easeInOut");
    this.cameras.main.startFollow(this.marker, false, 0.12, 0.12);
  }

  update(_t: number, deltaMs: number) {
    const dt = deltaMs / 1000;

    // ------- movimentação por joystick
    const joy = this.registry.get("joyDir") as
      | { x: number; y: number; mag: number }
      | null
      | undefined;
    if (!this.inLocation && joy && joy.mag > 0.12) {
      const step = TRAVEL_PX_PER_SEC * dt * joy.mag;
      const nx = Phaser.Math.Clamp(this.marker.x + joy.x * step, 60, WORLD_W - 60);
      const ny = Phaser.Math.Clamp(this.marker.y + joy.y * step, 60, WORLD_H - 60);
      const moved = Math.hypot(nx - this.marker.x, ny - this.marker.y);
      this.marker.setPosition(nx, ny);
      this.gameClock.advance(moved * MINUTES_PER_UNIT);
      this.moveDir = { x: joy.x, y: joy.y };
      this.moving = moved > 0.01;
      this.updateNearby();
    } else {
      this.moving = false;
    }

    this.updateArrow();
    this.updateVision();
    this.updateEnvironment();
  }

  // Detecta o local sob o personagem (mostra ficha + habilita "Entrar")
  private updateNearby() {
    let nearId: string | null = null;
    let best = 62; // raio de "estar em cima" do local (mundo)
    for (const loc of WORLD.locations) {
      const p = this.mgr.pos(loc.id);
      const d = Math.hypot(p.x - this.marker.x, p.y - this.marker.y);
      if (d < best) {
        best = d;
        nearId = loc.id;
      }
    }
    if (nearId !== this.currentId) {
      this.currentId = nearId;
      if (nearId) {
        const loc = this.mgr.location(nearId);
        bus.emit(EVENTS.LOCATION_ARRIVE, loc);
        this.selectLocation(loc);
      } else {
        this.selectLocation(null);
      }
    }
  }

  private updateArrow() {
    if (this.moving) {
      this.dirArrow
        .setPosition(this.marker.x, this.marker.y)
        .setRotation(Math.atan2(this.moveDir.y, this.moveDir.x))
        .setVisible(true);
    } else {
      this.dirArrow.setVisible(false);
    }
  }

  private updateVision() {
    const cam = this.cameras.main;
    // posição do jogador na tela (para o holofote acompanhar)
    const sx = (this.marker.x - cam.worldView.x) * cam.zoom;
    const sy = (this.marker.y - cam.worldView.y) * cam.zoom;
    this.vision.setPosition(sx, sy);
  }

  private updateEnvironment() {
    const env = this.gameClock.environment();
    this.overlay.setFillStyle(env.color, env.alpha);
    this.emitTime(false);
  }

  private emitTime(force: boolean) {
    const clock = this.gameClock.clockString();
    const phase = this.gameClock.phase;
    if (!force && clock === this.lastClock && phase === this.lastPhase) return;
    this.lastClock = clock;
    this.lastPhase = phase;
    bus.emit(EVENTS.TIME_UPDATE, {
      day: this.gameClock.day,
      hour: this.gameClock.hour,
      minute: this.gameClock.minute,
      phase,
      phaseName: this.gameClock.phaseName,
    });
  }
}
