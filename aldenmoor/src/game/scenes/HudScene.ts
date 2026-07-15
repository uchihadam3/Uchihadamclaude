import Phaser from "phaser";
import { WORLD } from "../data/world";
import type { LocationType, WorldLocation } from "../types";
import { bus, EVENTS, type TimePayload } from "../bus";

const TYPE_PT: Record<LocationType, string> = {
  city: "Cidade",
  village: "Vila",
  castle: "Castelo",
  ruin: "Ruína",
  dungeon: "Masmorra",
  tower: "Torre de Magos",
  port: "Porto",
};

const REGION_NAME = new Map(WORLD.regions.map((r) => [r.id, r.name]));

interface Btn {
  box: Phaser.GameObjects.Container;
  bg: Phaser.GameObjects.Graphics;
  label: Phaser.GameObjects.Text;
  w: number;
  h: number;
  onClick: () => void;
  enabled: boolean;
}

export class HudScene extends Phaser.Scene {
  private clockPanel!: Phaser.GameObjects.Graphics;
  private clockText!: Phaser.GameObjects.Text;
  private clockIcon!: Phaser.GameObjects.Text;

  private card!: Phaser.GameObjects.Container;
  private cardBg!: Phaser.GameObjects.Graphics;
  private cardTitle!: Phaser.GameObjects.Text;
  private cardSub!: Phaser.GameObjects.Text;
  private cardDesc!: Phaser.GameObjects.Text;
  private travelBtn!: Btn;
  private enterBtn!: Btn;

  private zoomIn!: Btn;
  private zoomOut!: Btn;

  private toastText!: Phaser.GameObjects.Text;

  private selected: WorldLocation | null = null;
  private selIsCurrent = false;
  private traveling = false;

  constructor() {
    super("hud");
  }

  create() {
    // ------ relógio / dia-noite (topo direito)
    this.clockPanel = this.add.graphics();
    this.clockIcon = this.add
      .text(0, 0, "☀", { fontFamily: "serif", fontSize: "22px", color: "#f6e6bd" })
      .setOrigin(0.5);
    this.clockText = this.add
      .text(0, 0, "Dia 1 · 08:00 · Dia", {
        fontFamily: "Georgia, serif",
        fontSize: "18px",
        color: "#f6e6bd",
        fontStyle: "bold",
      })
      .setOrigin(0, 0.5);

    // ------ card de local (base)
    this.card = this.add.container(0, 0).setVisible(false);
    this.cardBg = this.add.graphics();
    this.cardTitle = this.add.text(0, 0, "", {
      fontFamily: "Georgia, serif",
      fontSize: "24px",
      color: "#3a2a17",
      fontStyle: "bold",
    });
    this.cardSub = this.add.text(0, 0, "", {
      fontFamily: "Georgia, serif",
      fontSize: "15px",
      color: "#7a5a2e",
      fontStyle: "italic",
    });
    this.cardDesc = this.add.text(0, 0, "", {
      fontFamily: "Georgia, serif",
      fontSize: "16px",
      color: "#4a3826",
      wordWrap: { width: 480 },
    });
    this.travelBtn = this.makeBtn("Viajar", 150, 46, 0x7a2e22, () => {
      if (this.selected && !this.traveling)
        bus.emit(EVENTS.ACTION_TRAVEL, this.selected.id);
    });
    this.enterBtn = this.makeBtn("Entrar", 150, 46, 0x3a5a2e, () => {
      if (this.selected) {
        bus.emit(EVENTS.ACTION_ENTER, this.selected.id);
        this.toast("Mapa local — chega na Etapa 2 ⚔");
      }
    });
    this.card.add([
      this.cardBg,
      this.cardTitle,
      this.cardSub,
      this.cardDesc,
      this.travelBtn.box,
      this.enterBtn.box,
    ]);

    // ------ zoom (base direita)
    this.zoomIn = this.makeBtn("+", 48, 48, 0x4a3620, () =>
      bus.emit(EVENTS.ACTION_ZOOM, 1),
    );
    this.zoomOut = this.makeBtn("−", 48, 48, 0x4a3620, () =>
      bus.emit(EVENTS.ACTION_ZOOM, -1),
    );

    // ------ toast
    this.toastText = this.add
      .text(0, 0, "", {
        fontFamily: "Georgia, serif",
        fontSize: "17px",
        color: "#f6e6bd",
        backgroundColor: "#2a1c0e",
        padding: { x: 14, y: 8 },
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // eventos
    bus.on(EVENTS.TIME_UPDATE, this.onTime, this);
    bus.on(EVENTS.LOCATION_SELECT, this.onSelect, this);
    bus.on(EVENTS.TRAVEL_START, this.onTravelStart, this);
    bus.on(EVENTS.TRAVEL_END, this.onTravelEnd, this);

    this.scale.on("resize", () => this.layout());
    this.events.once("shutdown", () => {
      bus.off(EVENTS.TIME_UPDATE, this.onTime, this);
      bus.off(EVENTS.LOCATION_SELECT, this.onSelect, this);
      bus.off(EVENTS.TRAVEL_START, this.onTravelStart, this);
      bus.off(EVENTS.TRAVEL_END, this.onTravelEnd, this);
    });

    this.layout();
  }

  // -------------------------------------------------------------- botões
  private makeBtn(
    label: string,
    w: number,
    h: number,
    color: number,
    onClick: () => void,
  ): Btn {
    const box = this.add.container(0, 0);
    const bg = this.add.graphics();
    const text = this.add
      .text(0, 0, label, {
        fontFamily: "Georgia, serif",
        fontSize: h > 40 && w > 60 ? "18px" : "24px",
        color: "#f4e7c4",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    box.add([bg, text]);
    const btn: Btn = { box, bg, label: text, w, h, onClick, enabled: true };
    this.paintBtn(btn, color);

    box.setSize(w, h);
    box.setInteractive(
      new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h),
      Phaser.Geom.Rectangle.Contains,
    );
    box.on("pointerdown", () => {
      this.registry.set("uiCapture", true);
      if (btn.enabled) box.setScale(0.94);
    });
    box.on("pointerup", () => {
      box.setScale(1);
      if (btn.enabled) onClick();
      this.time.delayedCall(60, () => this.registry.set("uiCapture", false));
    });
    box.on("pointerout", () => {
      box.setScale(1);
      this.time.delayedCall(60, () => this.registry.set("uiCapture", false));
    });
    (btn as Btn & { color: number }).color = color;
    return btn;
  }

  private paintBtn(btn: Btn, color: number) {
    btn.bg.clear();
    btn.bg.fillStyle(color, btn.enabled ? 1 : 0.35);
    btn.bg.fillRoundedRect(-btn.w / 2, -btn.h / 2, btn.w, btn.h, 8);
    btn.bg.lineStyle(2, 0x2a1c0e, btn.enabled ? 0.9 : 0.4);
    btn.bg.strokeRoundedRect(-btn.w / 2, -btn.h / 2, btn.w, btn.h, 8);
    btn.label.setAlpha(btn.enabled ? 1 : 0.5);
  }

  private setEnabled(btn: Btn, on: boolean) {
    btn.enabled = on;
    this.paintBtn(btn, (btn as Btn & { color: number }).color);
  }

  // -------------------------------------------------------------- eventos
  private onTime(t: TimePayload) {
    const icon = t.phase === "night" ? "☾" : t.phase === "dusk" ? "☾" : "☀";
    this.clockIcon.setText(icon);
    this.clockText.setText(`Dia ${t.day} · ${pad(t.hour)}:${pad(t.minute)} · ${t.phaseName}`);
    this.layoutClock();
  }

  private onSelect(payload: {
    loc: WorldLocation | null;
    isCurrent: boolean;
    traveling: boolean;
  }) {
    this.selected = payload.loc;
    this.selIsCurrent = payload.isCurrent;
    if (!payload.loc) {
      this.card.setVisible(false);
      return;
    }
    const loc = payload.loc;
    this.cardTitle.setText(loc.name);
    this.cardSub.setText(
      `${TYPE_PT[loc.type]} · ${REGION_NAME.get(loc.region) ?? ""} · Nível ${loc.level}`,
    );
    this.cardDesc.setText(loc.desc);
    this.card.setVisible(true);
    this.refreshButtons();
    this.layout();
  }

  private onTravelStart(loc: WorldLocation) {
    this.traveling = true;
    this.selected = loc;
    this.selIsCurrent = false;
    this.cardTitle.setText("Viajando…");
    this.cardSub.setText(`rumo a ${loc.name}`);
    this.cardDesc.setText("O aventureiro cruza as terras de Aldenmoor.");
    this.card.setVisible(true);
    this.refreshButtons();
    this.layout();
  }
  private onTravelEnd() {
    this.traveling = false;
    this.refreshButtons();
  }

  private refreshButtons() {
    if (this.traveling) {
      this.travelBtn.box.setVisible(false);
      this.enterBtn.box.setVisible(false);
      return;
    }
    // Viajar: visível quando o destino não é o local atual
    const canTravel = !!this.selected && !this.selIsCurrent;
    this.travelBtn.box.setVisible(canTravel);
    this.setEnabled(this.travelBtn, canTravel && !this.traveling);
    this.travelBtn.label.setText(this.traveling ? "Viajando…" : "Viajar");

    // Entrar: visível quando é o local atual (e não viajando)
    const canEnter = !!this.selected && this.selIsCurrent && !this.traveling;
    this.enterBtn.box.setVisible(canEnter);
    this.setEnabled(this.enterBtn, canEnter);
  }

  private toast(msg: string) {
    this.toastText.setText(msg).setAlpha(1);
    this.toastText.setPosition(this.scale.width / 2, this.scale.height * 0.35);
    this.tweens.killTweensOf(this.toastText);
    this.tweens.add({
      targets: this.toastText,
      alpha: 0,
      delay: 1400,
      duration: 600,
    });
  }

  // -------------------------------------------------------------- layout
  private layout() {
    this.layoutClock();

    const W = this.scale.width;
    const H = this.scale.height;
    const pad = 14;

    // zoom (meio-direita, longe do card e do relógio)
    this.zoomIn.box.setPosition(W - 40, H * 0.42);
    this.zoomOut.box.setPosition(W - 40, H * 0.42 + 58);

    // card (base, centralizado)
    const cw = Math.min(540, W - 28);
    const cardX = (W - cw) / 2;
    const wrap = cw - 32;
    this.cardDesc.setWordWrapWidth(wrap, true);

    const titleY = 16;
    const subY = 48;
    const descY = 74;
    const descH = this.cardDesc.height;
    const btnRowY = descY + descH + 16;
    const ch = btnRowY + 46 + 16;
    const cardY = H - ch - 12;

    this.card.setPosition(cardX, cardY);
    this.cardBg.clear();
    this.cardBg.fillStyle(0xf2e6c4, 0.97);
    this.cardBg.fillRoundedRect(0, 0, cw, ch, 14);
    this.cardBg.lineStyle(3, 0x3a2a17, 0.9);
    this.cardBg.strokeRoundedRect(0, 0, cw, ch, 14);
    this.cardBg.lineStyle(1.5, 0x8a6a3a, 0.7);
    this.cardBg.strokeRoundedRect(5, 5, cw - 10, ch - 10, 10);

    this.cardTitle.setPosition(16, titleY);
    this.cardSub.setPosition(16, subY);
    this.cardDesc.setPosition(16, descY);
    this.travelBtn.box.setPosition(16 + this.travelBtn.w / 2, btnRowY + 23);
    this.enterBtn.box.setPosition(16 + this.enterBtn.w / 2, btnRowY + 23);
  }

  private layoutClock() {
    const W = this.scale.width;
    const txt = this.clockText.text;
    const tw = this.clockText.width;
    const panelW = 40 + tw + 20;
    const x = W - panelW - 12;
    const y = 14;
    const h = 40;
    this.clockPanel.clear();
    this.clockPanel.fillStyle(0x2a1c0e, 0.82);
    this.clockPanel.fillRoundedRect(x, y, panelW, h, 20);
    this.clockPanel.lineStyle(2, 0xc9a227, 0.7);
    this.clockPanel.strokeRoundedRect(x, y, panelW, h, 20);
    this.clockIcon.setPosition(x + 22, y + h / 2);
    this.clockText.setPosition(x + 40, y + h / 2);
    void txt;
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}
