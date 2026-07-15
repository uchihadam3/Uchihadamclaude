import Phaser from "phaser";
import { BootScene } from "./game/scenes/BootScene";
import { WorldMapScene } from "./game/scenes/WorldMapScene";
import { HudScene } from "./game/scenes/HudScene";
import { bus, EVENTS } from "./game/bus";

// Hook de depuração em dev (para testes automatizados / console).
if (import.meta.env.DEV) {
  (window as unknown as { __ald: unknown }).__ald = { bus, EVENTS };
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#0e0b07",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  render: {
    antialias: true,
    roundPixels: false,
    powerPreference: "high-performance",
  },
  scene: [BootScene, WorldMapScene, HudScene],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);
