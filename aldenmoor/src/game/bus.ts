import Phaser from "phaser";
import type { WorldLocation } from "./types";

// Barramento de eventos entre cenas (WorldMap <-> Hud).
export const bus = new Phaser.Events.EventEmitter();

export interface TimePayload {
  day: number;
  hour: number;
  minute: number;
  phase: "dawn" | "day" | "dusk" | "night";
  phaseName: string;
}

export const EVENTS = {
  TIME_UPDATE: "time:update", // TimePayload
  LOCATION_SELECT: "location:select", // WorldLocation | null
  LOCATION_ARRIVE: "location:arrive", // WorldLocation
  TRAVEL_START: "travel:start", // { to: WorldLocation }
  TRAVEL_END: "travel:end", // WorldLocation
  ACTION_TRAVEL: "action:travel", // string (locationId) — HUD -> WorldMap
  ACTION_ENTER: "action:enter", // string (locationId) — HUD -> WorldMap (stub Etapa 2)
  ACTION_ZOOM: "action:zoom", // number (+1/-1) — HUD -> WorldMap
} as const;

export type SelectPayload = WorldLocation | null;
