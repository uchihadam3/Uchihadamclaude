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
  fx: "arc" | "arcBig" | "streak" | "smashwave"; // formato do rastro/impacto
}

// 5 famílias de golpe. As poses são relativas ao rig (perspective 760px):
//   slash  = corte diagonal (espada)
//   chop   = machadada/pancada de cima (machado, maça)
//   smash  = pancada pesada e lenta de cima (espadão, marreta) — muito impacto
//   thrust = estocada reta pra frente (adaga, rapieira) — rápida, pouca rotação
//   swipe  = rodada horizontal (cajado) — com tom arcano
// Cada estilo é uma sequência de poses 3D. O segredo da "virada" é o rotateY:
// a arte plana gira em torno do eixo vertical durante o golpe (fica de perfil no
// meio e reaparece do outro lado), vendendo um giro real em 3D. A PROFUNDIDADE
// vem de 3 eixos somados: rotateY (vira/gira), rotateX (levanta e desce por cima),
// e scale (avança/recua em direção à câmera).
export const STYLES: Record<AtkStyle, StyleDef> = {
  // ESPADA — corte diagonal amplo: gira de um lado (ry +48) e varre pro outro
  // (ry -48), a lâmina "vira" atravessando a tela.
  slash: {
    wind:   { ry: 48,  rx: 8,   rz: 40,  tx: 15,  ty: 8,  s: 0.80 },
    hit:    { ry: -50, rx: -16, rz: -52, tx: -32, ty: -6, s: 1.52 },
    follow: { ry: -18, rx: -6,  rz: -30, tx: -15, ty: 6,  s: 1.12 },
    windup: 105, strike: 190, recover: 190, cooldown: 560, weight: 1.0, fx: "arc",
  },
  // MACHADO / MAÇA — machadada por cima: ergue atrás (rx +38) e crava pra frente
  // e pra baixo (rx -44), a cabeça gira e "desce" na direção da câmera.
  chop: {
    wind:   { ry: -26, rx: 38,  rz: 4,   tx: 3,   ty: -15, s: 0.85 },
    hit:    { ry: 22,  rx: -44, rz: -30, tx: -15, ty: 21,  s: 1.50 },
    follow: { ry: 9,   rx: -15, rz: -15, tx: -8,  ty: 10,  s: 1.13 },
    windup: 150, strike: 230, recover: 220, cooldown: 820, weight: 1.6, fx: "arcBig",
  },
  // ESPADÃO / MARRETA — pancada colossal de cima: heave pra trás bem alto (rx +46)
  // e esmaga reto pra baixo pelo centro (rx -52), escala enorme = vem "em cima".
  smash: {
    wind:   { ry: -18, rx: 46,  rz: 6,   tx: 0,   ty: -19, s: 0.92 },
    hit:    { ry: 14,  rx: -52, rz: -6,  tx: -6,  ty: 27,  s: 1.66 },
    follow: { ry: 6,   rx: -19, rz: 0,   tx: -2,  ty: 12,  s: 1.18 },
    windup: 220, strike: 320, recover: 300, cooldown: 1200, weight: 2.4, fx: "smashwave",
  },
  // ADAGA / RAPIEIRA — estocada: recolhe girando (ry +26), depois DISPARA a ponta
  // em direção à câmera (scale 1.75, ry -14) — a profundidade é o avanço reto.
  thrust: {
    wind:   { ry: 26,  rx: 10,  rz: 24,  tx: 13,  ty: 9,   s: 0.82 },
    hit:    { ry: -14, rx: -14, rz: 8,   tx: -20, ty: -10, s: 1.75 },
    follow: { ry: -3,  rx: -4,  rz: 14,  tx: -8,  ty: -2,  s: 1.16 },
    windup: 75, strike: 145, recover: 150, cooldown: 320, weight: 0.75, fx: "streak",
  },
  // CAJADO — rodada mágica: giro horizontal largo (ry +42 → -46, rz +48 → -56),
  // como se rodopiasse o bastão, com rastro arcano.
  swipe: {
    wind:   { ry: 42,  rx: 6,   rz: 48,  tx: 13,  ty: 6,  s: 0.86 },
    hit:    { ry: -46, rx: -10, rz: -56, tx: -30, ty: -2, s: 1.34 },
    follow: { ry: -15, rx: -2,  rz: -26, tx: -12, ty: 4,  s: 1.06 },
    windup: 120, strike: 205, recover: 200, cooldown: 640, weight: 1.1, fx: "arc",
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
