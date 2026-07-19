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
// Cada estilo é uma sequência de poses 3D. Dois princípios:
//   (1) VIRADA — rotateY gira a arte plana no eixo vertical (fica de perfil no
//       meio e reaparece do outro lado): giro 3D real.
//   (2) IMPACTO PRA FRENTE — a lâmina fica ACIMA do pivô (punho). Com a
//       perspectiva, rotateX POSITIVO joga a lâmina PRA DENTRO da cena (longe da
//       câmera, na direção do inimigo); rotateX NEGATIVO a traria pro rosto do
//       jogador (parecia "bater em si mesmo"). Então: ARMA com rx negativo (arma
//       recuada/erguida perto) e BATE com rx POSITIVO. Escala do golpe moderada.
export const STYLES: Record<AtkStyle, StyleDef> = {
  // ESPADA — corte diagonal amplo que vira de um lado ao outro, projetado À FRENTE
  // (rx passa de negativo p/ POSITIVO: a lâmina vai pra dentro da cena, não pro rosto)
  slash: {
    wind:   { ry: 44,  rx: -8,  rz: 36,  tx: 12,  ty: 4,  s: 0.96 },
    hit:    { ry: -42, rx: 16,  rz: -42, tx: -26, ty: -8, s: 1.18 },
    follow: { ry: -16, rx: 7,   rz: -24, tx: -12, ty: -2, s: 1.02 },
    windup: 105, strike: 190, recover: 190, cooldown: 560, weight: 1.0, fx: "arc",
  },
  // MACHADO / MAÇA — machadada por cima: ergue atrás/perto (rx -26) e CRAVA pra
  // frente e pra baixo, DENTRO da cena (rx +40).
  chop: {
    wind:   { ry: -22, rx: -26, rz: 22,  tx: 6,   ty: -2, s: 0.96 },
    hit:    { ry: 18,  rx: 40,  rz: -18, tx: -12, ty: 9,  s: 1.22 },
    follow: { ry: 8,   rx: 17,  rz: -10, tx: -6,  ty: 8,  s: 1.05 },
    windup: 150, strike: 230, recover: 220, cooldown: 820, weight: 1.6, fx: "arcBig",
  },
  // ESPADÃO / MARRETA — pancada colossal: heave pra trás/cima (rx -32) e ESMAGA
  // reto pra baixo E pra dentro da cena (rx +50).
  smash: {
    wind:   { ry: -16, rx: -32, rz: 16,  tx: 2,   ty: 0,  s: 0.98 },
    hit:    { ry: 12,  rx: 50,  rz: -6,  tx: -6,  ty: 13, s: 1.36 },
    follow: { ry: 6,   rx: 21,  rz: -2,  tx: -2,  ty: 9,  s: 1.08 },
    windup: 220, strike: 320, recover: 300, cooldown: 1200, weight: 2.4, fx: "smashwave",
  },
  // ADAGA / RAPIEIRA — estocada: recolhe perto (rx -10) e DISPARA a ponta pra
  // DENTRO da cena, na direção do inimigo (rx +12, avança pro centro).
  thrust: {
    wind:   { ry: 24,  rx: -10, rz: 22,  tx: 12,  ty: 6,   s: 0.94 },
    hit:    { ry: -8,  rx: 12,  rz: 10,  tx: -16, ty: -10, s: 1.24 },
    follow: { ry: -2,  rx: 4,   rz: 14,  tx: -8,  ty: -4,  s: 1.04 },
    windup: 75, strike: 145, recover: 150, cooldown: 320, weight: 0.75, fx: "streak",
  },
  // CAJADO — rodada mágica: giro horizontal largo projetado À FRENTE (rx +12),
  // como se rodopiasse o bastão, com rastro arcano.
  swipe: {
    wind:   { ry: 40,  rx: -8,  rz: 44,  tx: 12,  ty: 4,  s: 0.96 },
    hit:    { ry: -42, rx: 12,  rz: -50, tx: -26, ty: -4, s: 1.16 },
    follow: { ry: -14, rx: 4,   rz: -24, tx: -10, ty: 0,  s: 1.00 },
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
