// Catálogo de armas + PERFIL DE ATAQUE de cada uma.
// Cada arma tem estilo de golpe próprio (poses da animação), cadência (cooldown),
// peso (intensidade do impacto/tranco), tamanho na mão e dano. É isto que faz um
// machado bater diferente de uma espada e de uma adaga.
import swordUrl from "../assets/env/wpn_sword.png";
import greatswordUrl from "../assets/env/wpn_greatsword.png";
import axeUrl from "../assets/env/wpn_axe.png";
import daggerUrl from "../assets/env/wpn_dagger.png";
import rapierUrl from "../assets/env/wpn_rapier.png";
import maulUrl from "../assets/env/wpn_maul.png";
import maceUrl from "../assets/env/wpn_mace.png";
import staffUrl from "../assets/env/wpn_staff.png";
import shieldUrl from "../assets/env/wpn_shield.png";
import orbUrl from "../assets/env/wpn_orb.png";

export type AtkStyle = "slash" | "chop" | "smash" | "thrust" | "swipe";
export type Grip = "1h" | "2h";
export type Slot = "main" | "off";

// uma pose do "rig" da arma em 1ª pessoa (ângulos 3D + deslocamento + escala)
export interface Pose {
  ry: number; rx: number; rz: number; tx: number; ty: number; s: number;
}
// descanso — igual pra todas (é a pose parada no canto inferior-direito)
export const REST: Pose = { ry: 0, rx: 0, rz: 16, tx: 0, ty: 2, s: 1 };

export interface StyleDef {
  wind: Pose; // armar (recua/ergue)
  hit: Pose;  // impacto (auge do golpe)
  follow: Pose; // seguir (logo após o impacto)
  windup: number; strike: number; recover: number; cooldown: number; // ms
  weight: number; // intensidade do clarão + tranco de câmera
  fx: "arc" | "arcBig" | "streak"; // formato do rastro
}

// 5 famílias de golpe. As poses são relativas ao rig (perspective 760px):
//   slash  = corte diagonal (espada)
//   chop   = machadada/pancada de cima (machado, maça)
//   smash  = pancada pesada e lenta de cima (espadão, marreta) — muito impacto
//   thrust = estocada reta pra frente (adaga, rapieira) — rápida, pouca rotação
//   swipe  = rodada horizontal (cajado) — com tom arcano
export const STYLES: Record<AtkStyle, StyleDef> = {
  slash: {
    wind:   { ry: -26, rx: 10,  rz: 34,  tx: 11,  ty: 9,  s: 0.82 },
    hit:    { ry: 30,  rx: -14, rz: -46, tx: -30, ty: -8, s: 1.42 },
    follow: { ry: 10,  rx: -4,  rz: -26, tx: -14, ty: 6,  s: 1.08 },
    windup: 100, strike: 200, recover: 190, cooldown: 560, weight: 1.0, fx: "arc",
  },
  chop: {
    wind:   { ry: -18, rx: 24,  rz: 22,  tx: 6,   ty: -8, s: 0.84 },
    hit:    { ry: 22,  rx: -26, rz: -14, tx: -18, ty: 15, s: 1.40 },
    follow: { ry: 8,   rx: -8,  rz: -8,  tx: -8,  ty: 8,  s: 1.10 },
    windup: 140, strike: 240, recover: 220, cooldown: 840, weight: 1.5, fx: "arc",
  },
  smash: {
    wind:   { ry: -14, rx: 30,  rz: 14,  tx: 2,   ty: -12, s: 0.90 },
    hit:    { ry: 16,  rx: -32, rz: -4,  tx: -8,  ty: 22,  s: 1.55 },
    follow: { ry: 6,   rx: -10, rz: 2,   tx: -2,  ty: 10,  s: 1.16 },
    windup: 210, strike: 320, recover: 280, cooldown: 1200, weight: 2.3, fx: "arcBig",
  },
  thrust: {
    wind:   { ry: -10, rx: 8,   rz: 22,  tx: 12,  ty: 8,  s: 0.84 },
    hit:    { ry: -2,  rx: -10, rz: 12,  tx: -18, ty: -8, s: 1.62 },
    follow: { ry: 2,   rx: -2,  rz: 16,  tx: -6,  ty: 0,  s: 1.14 },
    windup: 75, strike: 150, recover: 150, cooldown: 340, weight: 0.7, fx: "streak",
  },
  swipe: {
    wind:   { ry: -22, rx: 6,   rz: 32,  tx: 10,  ty: 6,  s: 0.88 },
    hit:    { ry: 28,  rx: -8,  rz: -42, tx: -28, ty: -4, s: 1.32 },
    follow: { ry: 8,   rx: -2,  rz: -22, tx: -12, ty: 4,  s: 1.06 },
    windup: 120, strike: 210, recover: 200, cooldown: 660, weight: 1.1, fx: "arc",
  },
};

export interface Weapon {
  id: string;
  name: string;
  url: string;
  slot: Slot;
  grip: Grip;
  style: AtkStyle;
  scale: number; // tamanho na mão (multiplica a altura base do rig)
  dmg: number;
  cls: string; // classe dona (referência; ainda não trava nada)
  cooldown?: number; // sobrescreve a cadência do estilo (ms)
  tint?: "arcane"; // tinge o rastro/clarão (cajado)
}

// Catálogo Tier 1 ("de Madeira/Galho"). Todas entram no inventário pra teste.
export const WEAPONS: Weapon[] = [
  { id: "sword",      name: "Espada",   url: swordUrl,      slot: "main", grip: "1h", style: "slash",  scale: 1.00, dmg: 1, cls: "Guerreiro" },
  { id: "greatsword", name: "Espadão",  url: greatswordUrl, slot: "main", grip: "2h", style: "smash",  scale: 1.20, dmg: 3, cls: "Guerreiro", cooldown: 1150 },
  { id: "axe",        name: "Machado",  url: axeUrl,        slot: "main", grip: "1h", style: "chop",   scale: 1.00, dmg: 2, cls: "Guerreiro" },
  { id: "dagger",     name: "Adaga",    url: daggerUrl,     slot: "main", grip: "1h", style: "thrust", scale: 0.64, dmg: 1, cls: "Ladino",   cooldown: 300 },
  { id: "rapier",     name: "Rapieira", url: rapierUrl,     slot: "main", grip: "1h", style: "thrust", scale: 1.05, dmg: 1, cls: "Ladino",   cooldown: 380 },
  { id: "maul",       name: "Marreta",  url: maulUrl,       slot: "main", grip: "2h", style: "smash",  scale: 1.12, dmg: 3, cls: "Clérigo",  cooldown: 1260 },
  { id: "mace",       name: "Maça",     url: maceUrl,       slot: "main", grip: "1h", style: "chop",   scale: 0.96, dmg: 2, cls: "Clérigo" },
  { id: "staff",      name: "Cajado",   url: staffUrl,      slot: "main", grip: "2h", style: "swipe",  scale: 1.06, dmg: 1, cls: "Mago",     tint: "arcane" },
  { id: "shield",     name: "Escudo",   url: shieldUrl,     slot: "off",  grip: "1h", style: "slash",  scale: 0.9,  dmg: 0, cls: "Guerreiro" },
  { id: "orb",        name: "Orbe",     url: orbUrl,        slot: "off",  grip: "1h", style: "swipe",  scale: 0.8,  dmg: 0, cls: "Mago",     tint: "arcane" },
];

export const WEAPON_BY_ID: Record<string, Weapon> = Object.fromEntries(
  WEAPONS.map((w) => [w.id, w]),
);
