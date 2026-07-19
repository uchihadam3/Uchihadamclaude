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

export type AtkStyle =
  | "slash"
  | "quickslash"
  | "chop"
  | "smash"
  | "lunge"
  | "swipe"
  | "axeChop"
  | "maulSmash";
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
  // GIRO DE PAPEL (opcional): rotateY aplicado à PRÓPRIA imagem (pivô no centro
  // dela), não ao rig. Faz o PNG girar no próprio eixo — fica fininho como papel
  // (estilo Paper Mario) e a cabeça "vira de frente". graus em cada fase.
  imgSpin?: { wind: number; hit: number; follow: number };
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
  // ADAGA / RAPIEIRA — o MESMO corte da espada (amplitude inteira), porém MUITO
  // mais rápido (~metade do tempo). Ataque veloz que se MOVE de verdade, em vez da
  // estocada que parecia parada.
  quickslash: {
    wind:   { ry: 44,  rx: -8,  rz: 36,  tx: 12,  ty: 4,  s: 0.94 },
    hit:    { ry: -42, rx: 16,  rz: -42, tx: -26, ty: -8, s: 1.16 },
    follow: { ry: -16, rx: 7,   rz: -24, tx: -12, ty: -2, s: 1.00 },
    windup: 45, strike: 100, recover: 95, cooldown: 300, weight: 0.85, fx: "arc",
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
  // RAPIEIRA — ESTOCADA de verdade (NÃO é corte). NADA de varrer em arco: a lâmina
  // AVANÇA reta. Sequência: recua e DESCE na tela pegando impulso (wind ty +17,
  // s 0.80 = retraída/pequena), depois DISPARA pra cima/frente de uma vez (hit
  // ty -16, s 1.46 = estende em direção ao inimigo). A lâmina DEITA PRA FRENTE
  // apontando pro alvo com rotateX forte (rx +42 = tomba pra dentro da cena);
  // rotateZ quase constante (só leve inclinação) p/ NÃO parecer corte/sweep.
  lunge: {
    wind:   { ry: 6,  rx: -10, rz: 4,   tx: 9,   ty: 17,  s: 0.80 },
    hit:    { ry: -4, rx: 42,  rz: -22, tx: -15, ty: -16, s: 1.46 },
    follow: { ry: -2, rx: 24,  rz: -14, tx: -9,  ty: -6,  s: 1.18 },
    windup: 110, strike: 85, recover: 155, cooldown: 420, weight: 0.9, fx: "streak",
  },
  // CAJADO — rodada mágica: giro horizontal largo projetado À FRENTE (rx +12),
  // como se rodopiasse o bastão, com rastro arcano.
  swipe: {
    wind:   { ry: 40,  rx: -8,  rz: 44,  tx: 12,  ty: 4,  s: 0.96 },
    hit:    { ry: -42, rx: 12,  rz: -50, tx: -26, ty: -4, s: 1.16 },
    follow: { ry: -14, rx: 4,   rz: -24, tx: -10, ty: 0,  s: 1.00 },
    windup: 120, strike: 205, recover: 200, cooldown: 640, weight: 1.1, fx: "arc",
  },
  // MACHADO — machadada DE CIMA PRA BAIXO com a lamina VIRANDO DE FRENTE. A
  // trajetoria vertical (ty -22 -> +24) vende o "de cima". O rotateY vira a arte:
  // como o fio aponta pra esquerda, ry NEGATIVO no impacto (+26 -> -50) gira o
  // gume PRA DENTRO DA CENA (de frente pro inimigo), distorcendo o PNG p/ simular
  // o giro 3D. rz pequeno (pouca diagonal) + rx moderado (o "por cima").
  axeChop: {
    wind:   { ry: 6,   rx: -14, rz: 14,  tx: 5,   ty: -22, s: 0.94 },
    hit:    { ry: -12, rx: 22,  rz: -20, tx: -9,  ty: 24,  s: 1.18 },
    follow: { ry: -8,  rx: 14,  rz: -14, tx: -5,  ty: 16,  s: 1.06 },
    windup: 150, strike: 230, recover: 220, cooldown: 820, weight: 1.6, fx: "arcBig",
    imgSpin: { wind: 34, hit: -76, follow: -34 },
  },
  // MARRETA — mesma ideia do machado, porem pesada: derruba DE CIMA PRA BAIXO
  // (ty -24 -> +28) com a cabeca VIRANDO DE FRENTE (ry +24 -> -46), lento e forte.
  maulSmash: {
    wind:   { ry: 6,   rx: -16, rz: 12,  tx: 4,   ty: -24, s: 0.96 },
    hit:    { ry: -12, rx: 24,  rz: -18, tx: -7,  ty: 28,  s: 1.30 },
    follow: { ry: -8,  rx: 15,  rz: -12, tx: -4,  ty: 18,  s: 1.08 },
    windup: 220, strike: 320, recover: 300, cooldown: 1200, weight: 2.4, fx: "smashwave",
    imgSpin: { wind: 30, hit: -56, follow: -26 },
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
  { id: "axe",        name: "Machado",  url: axeUrl,        slot: "main", grip: "1h", style: "axeChop", scale: 1.00, dmg: 2, cls: "Guerreiro" },
  { id: "dagger",     name: "Adaga",    url: daggerUrl,     slot: "main", grip: "1h", style: "quickslash", scale: 0.64, dmg: 1, cls: "Ladino",   cooldown: 280 },
  { id: "rapier",     name: "Rapieira", url: rapierUrl,     slot: "main", grip: "1h", style: "lunge",      scale: 1.05, dmg: 1, cls: "Ladino",   cooldown: 420 },
  { id: "maul",       name: "Marreta",  url: maulUrl,       slot: "main", grip: "2h", style: "maulSmash", scale: 1.12, dmg: 3, cls: "Clérigo",  cooldown: 1260 },
  { id: "mace",       name: "Maça",     url: maceUrl,       slot: "main", grip: "1h", style: "chop",   scale: 0.96, dmg: 2, cls: "Clérigo" },
  { id: "staff",      name: "Cajado",   url: staffUrl,      slot: "main", grip: "2h", style: "swipe",  scale: 1.06, dmg: 1, cls: "Mago",     tint: "arcane" },
  { id: "shield",     name: "Escudo",   url: shieldUrl,     slot: "off",  grip: "1h", style: "slash",  scale: 0.9,  dmg: 0, cls: "Guerreiro" },
  { id: "orb",        name: "Orbe",     url: orbUrl,        slot: "off",  grip: "1h", style: "swipe",  scale: 0.8,  dmg: 0, cls: "Mago",     tint: "arcane" },
];

export const WEAPON_BY_ID: Record<string, Weapon> = Object.fromEntries(
  WEAPONS.map((w) => [w.id, w]),
);
