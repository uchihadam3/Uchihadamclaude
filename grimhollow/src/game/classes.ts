// Classes jogáveis — dados usados na criação de personagem (retrato, atributos,
// armas) e para configurar o jogador ao iniciar. O `portrait` recebe a arte (PNG)
// quando ela for gerada; até lá fica null e a tela mostra um placeholder.

// Artes de retrato das classes (preenchidas quando os PNGs chegarem):
// import guerreiroArt from "../assets/ui/class_guerreiro.png";
// import ladinoArt from "../assets/ui/class_ladino.png";
// import magoArt from "../assets/ui/class_mago.png";
// import clerigoArt from "../assets/ui/class_clerigo.png";

export interface GameClass {
  id: string;
  name: string;
  emoji: string;
  tag: string; // papel curto (ex.: "Tanque / corpo-a-corpo")
  desc: string; // descrição da fantasia da classe
  attr: { str: number; dex: number; int: number };
  hp: number;
  mp: number;
  weapons: string[]; // ids de armas que a classe usa (referência)
  startWeapon: string; // arma equipada ao começar
  portrait: string | null; // arte grande da classe (PNG); null = placeholder
}

export const CLASSES: GameClass[] = [
  {
    id: "guerreiro",
    name: "Guerreiro",
    emoji: "⚔️",
    tag: "Tanque / corpo-a-corpo",
    desc: "Mestre das lâminas. Encara o perigo de frente, com espada e escudo ou uma arma de duas mãos. Muita vida e dano físico.",
    attr: { str: 8, dex: 4, int: 3 },
    hp: 120,
    mp: 40,
    weapons: ["sword", "greatsword", "axe", "shield"],
    startWeapon: "sword",
    portrait: null,
  },
  {
    id: "ladino",
    name: "Ladino",
    emoji: "🗡️",
    tag: "Dano rápido / crítico",
    desc: "Ágil e furtivo. Golpeia rápido com adaga e rapieira, buscando os pontos fracos. Frágil, mas letal e veloz.",
    attr: { str: 4, dex: 8, int: 3 },
    hp: 90,
    mp: 50,
    weapons: ["dagger", "rapier"],
    startWeapon: "dagger",
    portrait: null,
  },
  {
    id: "mago",
    name: "Mago",
    emoji: "🔮",
    tag: "Dano à distância / elemental",
    desc: "Canaliza fogo, gelo e raio pelo cajado e pelo orbe. Devastador à distância, mas de corpo frágil. Muita mana.",
    attr: { str: 3, dex: 4, int: 8 },
    hp: 75,
    mp: 110,
    weapons: ["staff", "orb"],
    startWeapon: "staff",
    portrait: null,
  },
  {
    id: "clerigo",
    name: "Clérigo",
    emoji: "🕯️",
    tag: "Suporte / cura",
    desc: "Fé feita arma. Cura os aliados e esmaga o mal com maça, martelo e escudo. Equilibrado, resistente e devoto.",
    attr: { str: 5, dex: 3, int: 7 },
    hp: 95,
    mp: 90,
    weapons: ["mace", "maul", "shield", "staff"],
    startWeapon: "mace",
    portrait: null,
  },
];

export const CLASS_BY_ID: Record<string, GameClass> = Object.fromEntries(
  CLASSES.map((c) => [c.id, c]),
);

// personagem escolhido na criação (passado ao Game)
export interface Character {
  name: string;
  classId: string;
}
