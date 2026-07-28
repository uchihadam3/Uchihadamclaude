import { MOVE_MS } from "./config";
import { STYLES, REST, type Weapon, type Pose } from "./weapons";
import { SKILL_TREES, STAT_META, PASSIVE_ICON, type Skill } from "./skills";
import { CLASS_BY_ID } from "./classes";
import type { Rarity } from "./items";

// linha de atributo do item e delta de comparação (verde/vermelho) ao trocar
export interface TipLine { label: string; value: string; }
export interface TipDelta { label: string; delta: number; pct?: boolean; }
export interface ItemTip {
  name: string;
  icon: string;                // ícone do item (mostrado no cabeçalho do popup)
  rarity: Rarity;
  sub: string;                 // "Mágico · Peitoral" / "Arma"
  lines: TipLine[];            // atributos próprios do item
  compareName?: string;        // nome da peça equipada comparada
  deltas?: TipDelta[];         // ganhos/perdas ao trocar (∅ se nada equipado no slot)
  action: "equip" | "unequip" | "buy" | "pickup"; // o que o botão do popup faz
  price?: number;              // preço (ação "buy")
}
// item da mochila (arma ou armadura) e peça equipada no boneco
export interface BagEntry { kind: "weapon" | "armor"; id: string; icon: string; name: string; rarity?: Rarity; tip: ItemTip; }
export interface EquipSlotView { icon: string; rarity: Rarity; tip: ItemTip; }
export interface EquipUIData { bag: BagEntry[]; armor: Partial<Record<string, EquipSlotView>>; }
import hudPlateUrl from "../assets/ui/hud_plate.png";
import eqFrameUrl from "../assets/ui/eq_frame.png";
import eqSlotUrl from "../assets/ui/eq_slot.png";
import eqContainerUrl from "../assets/ui/eq_container.png";
import btnBaseUrl from "../assets/ui/btn_base.png";
import dpadUrl from "../assets/ui/dpad.png";
import icoAttackUrl from "../assets/ui/ico_attack.png";
import icoActionUrl from "../assets/ui/ico_action.png";
import icoInventoryUrl from "../assets/ui/ico_inventory.png";
import coinUrl from "../assets/ui/coin.png";
import mercadoraUrl from "../assets/npc/mercadora.png";
import taverneiroUrl from "../assets/npc/taverneiro.png";
import icoMadeiraUrl from "../assets/item/madeira.png";
import icoMinerioUrl from "../assets/item/minerio.png";
import icoReforcoUrl from "../assets/item/reforco.png";
import loadSwordUrl from "../assets/ui/load_sword.png";
import mapFrameUrl from "../assets/ui/map_frame.png";
import clockSunUrl from "../assets/ui/clock_sun.png";
import clockMoonUrl from "../assets/ui/clock_moon.png";
import levelupGifUrl from "../assets/ui/levelup.webp";
import forgeFillUrl from "../assets/audio/forge_fill.mp3";
import forgeFailUrl from "../assets/audio/forge_fail.mp3";
import forgeSuccessUrl from "../assets/audio/forge_success.wav";
import sfxSwingUrl from "../assets/audio/sfx_swing.wav";
import sfxHitUrl from "../assets/audio/sfx_hit.wav";
import sfxHurtUrl from "../assets/audio/sfx_hurt.wav";
import sfxCastUrl from "../assets/audio/sfx_cast.wav";
import sfxCoinUrl from "../assets/audio/sfx_coin.mp3";     // moedas: comprar/vender/coletar
import sfxLevelUpUrl from "../assets/audio/sfx_levelup.mp3"; // fanfarra de subir de nível
import { audio } from "./audio";
// medalhões do minimapa (arte própria recortada da folha)
import mmSmith from "../assets/ui/minimap/mm_smith.png";
import mmTavern from "../assets/ui/minimap/mm_tavern.png";
import mmStore from "../assets/ui/minimap/mm_store.png";
import mmAlchemist from "../assets/ui/minimap/mm_alchemist.png";
import mmHome from "../assets/ui/minimap/mm_home.png";
import mmWell from "../assets/ui/minimap/mm_well.png";
import mmForest from "../assets/ui/minimap/mm_forest.png";
import mmNpc from "../assets/ui/minimap/mm_npc.png";
import mmEntrance from "../assets/ui/minimap/mm_entrance.png";
import mmExit from "../assets/ui/minimap/mm_exit.png";
import mmGate from "../assets/ui/minimap/mm_gate.png";
import mmPortal from "../assets/ui/minimap/mm_portal.png";
import mmSanctuary from "../assets/ui/minimap/mm_sanctuary.png";
import mmStatue from "../assets/ui/minimap/mm_statue.png";
import mmSign from "../assets/ui/minimap/mm_sign.png";
import mmChest from "../assets/ui/minimap/mm_chest.png";
import mmStair from "../assets/ui/minimap/mm_stair.png";

// ---- FORJA: efeitos sonoros (arquivos enviados pelo jogador) ----------------
// Registrados no canal SFX do gerenciador de áudio (o volume efetivo respeita a
// barra de "Efeitos Especiais" e o mudo das Opções).
const forgeFillSnd = audio.register(new Audio(forgeFillUrl), "sfx", 0.85); // toca ENQUANTO a espada enche
const forgeFailSnd = audio.register(new Audio(forgeFailUrl), "sfx", 0.9); // aprimoramento falhou
const forgeSuccessSnd = audio.register(new Audio(forgeSuccessUrl), "sfx", 0.9); // aprimoramento deu certo
forgeFillSnd.preload = "auto"; forgeFailSnd.preload = "auto"; forgeSuccessSnd.preload = "auto";
function play(a: HTMLAudioElement) { try { a.currentTime = 0; a.play().catch(() => {}); } catch { /* ignora */ } }
function stopSnd(a: HTMLAudioElement) { try { a.pause(); a.currentTime = 0; } catch { /* ignora */ } }

// ---- EFEITOS de COMBATE (sintetizados): ataque, dano no inimigo, dano no
// jogador e conjuração de skill. Canal SFX (respeitam a barra "Efeitos"). Tocam
// via CLONE p/ permitir sobreposição em golpes rápidos.
const swingSnd = audio.register(new Audio(sfxSwingUrl), "sfx", 0.5);
const hitSnd = audio.register(new Audio(sfxHitUrl), "sfx", 0.55);
const hurtSnd = audio.register(new Audio(sfxHurtUrl), "sfx", 0.7);
const castSnd = audio.register(new Audio(sfxCastUrl), "sfx", 0.6);
const coinSnd = audio.register(new Audio(sfxCoinUrl), "sfx", 0.75);     // comprar/vender/coletar ouro
const levelupSnd = audio.register(new Audio(sfxLevelUpUrl), "sfx", 0.85); // fanfarra de nível
[swingSnd, hitSnd, hurtSnd, castSnd, coinSnd, levelupSnd].forEach((a) => { a.preload = "auto"; });
function playClone(a: HTMLAudioElement) {
  try { const c = a.cloneNode(true) as HTMLAudioElement; c.volume = a.volume; c.play().catch(() => {}); } catch { /* ignora */ }
}
const SFX: Record<string, HTMLAudioElement> = { swing: swingSnd, hit: hitSnd, hurt: hurtSnd, cast: castSnd, coin: coinSnd };

// ---- FORJA: animação de encher a espada (lava), ~6s, bem incandescente ------
// Enche a lâmina de 0→100% com frente derretida, brasas e brilho crescente;
// toca o som de forja durante o processo e chama onEnd() ao completar.
const FORGE_DUR = 6000; // ~6 segundos, como o jogador pediu
function runForge(anvil: HTMLElement, onEnd: () => void) {
  const fill = anvil.querySelector(".gh-sm-sword-fill") as HTMLElement;
  const base = anvil.querySelector(".gh-sm-sword-base") as HTMLElement;
  anvil.classList.remove("gh-forge-ok", "gh-forge-fail");
  anvil.classList.add("gh-forging");
  fill.style.transition = "none";
  fill.style.width = "0%";
  play(forgeFillSnd); // som de aprimoramento durante o enchimento
  const t0 = performance.now();
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / FORGE_DUR);
    // easing suave (começa devagar, acelera no meio) p/ dar peso ao processo
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    fill.style.width = (e * 100).toFixed(2) + "%";
    anvil.style.setProperty("--fk", e.toFixed(3)); // 0→1 p/ o CSS puxar o brilho
    // a lâmina esquenta: escura → alaranjada conforme enche
    base.style.filter = `brightness(${(0.24 + e * 0.5).toFixed(2)}) saturate(${(0.3 + e * 1.4).toFixed(2)}) sepia(${(e * 0.5).toFixed(2)}) drop-shadow(0 2px 4px #000)`;
    if (k < 1) requestAnimationFrame(step);
    else { stopSnd(forgeFillSnd); onEnd(); }
  };
  requestAnimationFrame(step);
}

export type Action =
  | "forward"
  | "back"
  | "turnLeft"
  | "turnRight"
  | "strafeLeft"
  | "strafeRight"
  | "interact"
  | "attack";

// atributos do personagem exibidos na janela de equipamentos
export interface CharStats {
  level: number;
  xp: number;
  xpMax: number;
  hp: number;
  hpMax: number;
  mp: number;
  mpMax: number;
  atk: number; // ataque / dano
  def: number; // defesa / armadura
  str: number; // força
  dex: number; // destreza
  int: number; // inteligência
  gold: number; // ouro
  // distribuição de atributos (3 pontos por nível)
  points: number; // pontos ainda não distribuídos
  strMin: number; // piso de cada primário (não dá pra baixar da base da criação)
  dexMin: number;
  intMin: number;
  // secundários (derivados dos primários) exibidos na aba de atributos
  atkMag: number;
  crit: number; // %
  critDmg: number; // %
  precision: number; // %
  magRes: number;
  evasion: number; // %
  regen: number; // regeneração de vida (HP/s)
  classId: string; // classe (p/ retrato/nome no painel de atributos)
}

// opção num menu de diálogo (estilo WoW): rótulo + nota curta + tipo (p/ estilo)
export interface DialogueChoice {
  id: string;
  label: string;
  primary?: boolean;
  note?: string;                              // chip curto à direita (ex.: "nova missão")
  kind?: "quest" | "shop" | "exit" | "back";  // estilo do botão
}

export interface HUD {
  setPrompt(text: string | null): void;
  showDialogue(name: string, text: string, portrait?: string | null, choices?: DialogueChoice[]): void;
  hideDialogue(): void;
  openJournal(data: JournalData): void;
  // toca o golpe da arma equipada; retorna o instante (ms) do impacto p/ o dano
  // cair sincronizado, ou -1 se não golpeou (sem arma / em recarga).
  swingWeapon(): number;
  setHealth(frac: number): void; // 0..1 — barra de vida do jogador
  setMana(frac: number): void; // 0..1 — barra de mana do jogador
  flashDamage(): void; // vinheta vermelha ao levar dano
  setStats(s: CharStats): void; // atualiza a janela de equipamentos/atributos
  setInventory(ids: string[]): void; // enche a mochila com esses itens
  // mochila (armas + armaduras) + peças equipadas no boneco, com molduras de raridade
  setEquip(data: EquipUIData): void;
  // DROP no chão: abre o popup do item (centralizado) com o botão "Pegar"
  showPickup(tip: ItemTip, onTake: () => void): void;
  equipWeapon(id: string): void; // equipa (troca a arma na mão) e realça o slot
  // minimapa (canto sup. direito): grade da célula atual + posição/direção do herói
  updateMinimap(s: MinimapState): void;
  // relógio dia/noite: fase [0,1) e luz do dia [0,1] (sol acende/lua apaga e vice-versa)
  setClock(phase: number, daylight: number): void;
  // árvore de habilidades: define a classe e quantos pontos o herói tem
  setSkillInfo(classId: string, points: number): void;
  // barra de ação: preenche com as habilidades ATIVAS aprendidas
  setActionBar(items: ActionSkill[]): void;
  // estado da recarga de uma habilidade: frac 1→0 (escurece e vai preenchendo),
  // secs = segundos restantes exibidos no centro (0 = pronta, limpa o overlay)
  setSkillCooldown(id: string, frac: number, secs: number): void;
  // número flutuante do custo de mana perto do slot da habilidade usada
  skillManaFloat(id: string, cost: number): void;
  // número de dano flutuante na tela (x,y em px). kind muda cor/tamanho.
  floatText(x: number, y: number, text: string, kind: "hit" | "crit" | "player" | "heal" | "mana"): void;
  // mensagem flutuante breve (ex.: "Nível 3!")
  toast(msg: string): void;
  // efeito de SUBIR DE NÍVEL: animação (GIF) + "LEVEL UP!" em letras garrafais
  levelUp(level: number): void;
  // barra de conjuração: mostra `name` e enche em `ms`. cancelCast() esconde antes.
  castBar(name: string, ms: number): void;
  cancelCast(): void;
  // FERREIRO: abre/atualiza a janela de aprimoramento (ou fecha)
  openSmith(data: SmithData): void;
  closeSmith(): void;
  // MERCADOR: abre/atualiza a janela de comprar/vender (ou fecha)
  openStore(data: StoreData): void;
  closeStore(): void;
  // toca um efeito sonoro de combate (canal Efeitos)
  playSfx(name: "swing" | "hit" | "hurt" | "cast" | "coin"): void;
  // transição de porta: escurece a tela (a promise resolve no preto total) / clareia
  fadeOut(ms: number): Promise<void>;
  fadeIn(ms: number): void;
  wakeEyelids(vh: number): void;
  // ABERTURA: esconde o HUD (só a visão do jogador) e depois o revela com um fade
  // rápido (a NPC "entrega" a arma → botões surgem).
  hudConceal(): void;
  hudReveal(): void;
  // rastreador de missão (abaixo do minimapa): missão ativa + objetivo; null = some
  setTracker(data: TrackerData | null): void;
  // bandeja de consumíveis do HUD (poção/cerveja) — toque usa o item
  setConsumables(items: ConsumSlot[]): void;
  // TAVERNA: abre/atualiza a janela de descanso + bebidas + missões (ou fecha)
  openTavern(data: TavernData): void;
  closeTavern(): void;
  // BAÚ: abre/atualiza a janela de guardar/retirar (ou fecha)
  openStash(data: StashData): void;
  closeStash(): void;
}

// item da barra de ação (habilidade ativa aprendida)
export interface ActionSkill {
  id: string;
  name: string;
  icon?: string;
  mana: number;
}

// ---- FERREIRO (aprimoramento por reforço +N) ----
export interface SmithItem { id: string; name: string; icon: string; lvl: number; }
// resultado do aprimoramento: se deu certo + o novo estado da janela p/ re-render
export interface SmithUpgradeResult { success: boolean; data: SmithData; }
export interface SmithData {
  gold: number;
  mats: { madeira: number; minerio: number; reforco: number };
  items: SmithItem[]; // itens do inventário que dá p/ aprimorar
  sel: {
    id: string; name: string; icon: string; lvl: number; dmg: number; max: boolean;
    next?: { dmg: number; madeira: number; minerio: number; reforco: number; gold: number };
  } | null;
}

// ---- MERCADOR (comprar / vender com caixa de quantidade) ----
export interface StoreGood {
  id: string;
  name: string;
  icon?: string; // emoji (consumíveis/materiais)
  iconUrl?: string; // imagem (armas)
  price: number; // preço unitário no modo atual (compra ou venda)
  desc: string;
  have: number; // quanto o jogador possui (limite ao vender)
  single?: boolean; // item único (arma): vende 1, sem stepper
  moveMax?: number; // baú: máximo transferível nesta ação (respeita o teto de pilha 99)
  lvl?: number; // baú: nível de reforço da arma (+N), mostrado como selo no slot
  rarity?: Rarity; // equipamento com raridade: pinta a moldura da célula
  tip?: ItemTip; // se houver, clicar abre o POPUP (comparação) em vez da caixa de qtd
}
export interface StoreData {
  gold: number;
  mode: "buy" | "sell";
  goods: StoreGood[];
  title?: string; // nome do vendedor no cabeçalho (padrão: Mercador)
  subtitle?: string; // subtítulo/estabelecimento (padrão: O Empório de Rosa)
  portraitUrl?: string; // retrato do vendedor (padrão: mercadora)
}

// ---- BAÚ / ARMAZÉM (guardar/retirar itens, materiais, armas e ouro) ----
export interface StashData {
  mode: "deposit" | "withdraw";     // guardar (mochila→baú) / retirar (baú→mochila)
  goods: StoreGood[];               // reusa o shape de bem (price é ignorado)
  slots: number;                    // capacidade total do baú (grade de slots)
  gold: number;                     // ouro guardado no baú (para o cabeçalho)
  title?: string; subtitle?: string; portraitUrl?: string;
}

// ---- BANDEJA DE CONSUMÍVEIS (usar item no HUD) ----
export interface ConsumSlot { id: string; icon: string; iconUrl?: string; name: string; count: number; }

// ---- TAVERNA (bebidas + missões) ----
export interface TavernReward { gold?: boolean; iconUrl?: string; label: string; } // moeda ou item
export interface TavernQuest {
  id: string;
  icon: string;
  title: string;
  desc: string;
  reward: TavernReward[]; // recompensas em "chips" (moeda + itens)
  status: "available" | "active" | "ready" | "done";
  progress?: string; // ex.: "3 / 8 esqueletos" (quando ativa)
}
export interface TavernData {
  gold: number;
  drink: StoreGood; // a cerveja (reusa o shape de bem: id/name/icon/price/desc/have)
  quests: TavernQuest[];
}

// ---- DIÁRIO DE MISSÕES ----
export interface JournalEntry {
  icon: string;
  title: string;
  summary: string;
  status: "locked" | "available" | "active" | "done";
  objective?: string;  // objetivo atual (quando ativa)
}
export interface JournalData {
  main: JournalEntry[];  // Linha Principal (capítulos)
  side: JournalEntry[];  // missões secundárias
}

// marcadores no minimapa: lojas, NPCs, saídas, pontos de interesse
export type MiniPoiKind =
  | "smith" | "tavern" | "store" | "alchemist" | "npc"
  | "dungeon" | "forest" | "exit" | "home" | "well"
  | "stair" | "gate" | "sanctuary" | "sign" | "portal" | "statue" | "chest";
export interface MiniPoi { c: number; r: number; kind: MiniPoiKind; label: string; }

export interface MinimapState {
  cols: number;
  rows: number;
  cells: Uint8Array; // 1 = caminhável, 0 = parede/prédio (comprimento cols*rows)
  col: number;
  row: number;
  dc: number; // vetor da direção que o herói encara (célula)
  dr: number;
  pois?: MiniPoi[]; // marcadores (lojas, NPCs, saídas…)
  locName?: string; // nome do local atual (banner no topo do mapa)
  waypoint?: { c: number; r: number }; // destino da missão ativa (marcador-guia)
  drops?: MiniDrop[]; // itens caídos no chão (bolinha colorida por raridade)
}
// item caído no chão marcado no minimapa — cor = raridade (agrupados por célula)
export interface MiniDrop { c: number; r: number; color: string; }

// rastreador de missão (painel abaixo do minimapa): missão ativa + objetivo atual
export interface TrackerData {
  title: string;      // nome da missão ativa
  objective: string;  // resumo do que fazer agora ("Visite Rosa", "8/8 esqueletos"…)
  guideOn: boolean;    // guia/marcador do mapa ligado?
}

// medalhão (arte própria) e cor de destaque de cada tipo de marcador
const POI_SRC: Record<MiniPoiKind, string> = {
  smith: mmSmith, tavern: mmTavern, store: mmStore, alchemist: mmAlchemist, npc: mmNpc,
  dungeon: mmEntrance, forest: mmForest, exit: mmExit, home: mmHome, well: mmWell,
  stair: mmStair, gate: mmGate, sanctuary: mmSanctuary, sign: mmSign, portal: mmPortal, statue: mmStatue,
  chest: mmChest,
};
// pré-carrega os medalhões (uma vez) p/ desenhar no canvas
const POI_IMG: Partial<Record<MiniPoiKind, HTMLImageElement>> = {};
for (const k of Object.keys(POI_SRC) as MiniPoiKind[]) {
  const im = new Image(); im.src = POI_SRC[k]; POI_IMG[k] = im;
}
const POI_COLOR: Record<MiniPoiKind, string> = {
  smith: "#ff9a4d", tavern: "#ffcf5a", store: "#6fd3ff", alchemist: "#b98cff", npc: "#8fe07a",
  dungeon: "#ff6b5a", forest: "#7fd06a", exit: "#ffd964", home: "#d8b06a", well: "#6fb8ff",
  stair: "#ffd964", gate: "#ff8a5a", sanctuary: "#c79bff", sign: "#e8dcc0", portal: "#8fb8ff", statue: "#f0e2b8",
  chest: "#e6b45a",
};
// marcadores que "pulsam" (interativos: valem uma visita)
const POI_PULSE = new Set<MiniPoiKind>(["smith", "tavern", "store", "alchemist", "dungeon", "forest", "exit", "gate", "sanctuary", "npc", "portal", "statue", "stair", "chest"]);
// marcadores "menores" (secundários): NPCs e casas comuns
const miniMinor = (k: MiniPoiKind) => k === "npc" || k === "home";

// Teclado (desktop) + botões na tela (mobile).
export function setupControls(
  root: HTMLElement,
  onAction: (a: Action) => void,
  weaponUrl?: string,
  weaponAtkUrl?: string, // 2º sprite (pose de golpe); opcional
  weapons?: Weapon[], // catálogo p/ inventário + perfis de golpe
  onEquip?: (w: Weapon) => void, // avisa o jogo (dano/cadência/atributos)
  onSkills?: (ranks: Record<string, number>) => void, // ranks das habilidades mudaram
  onSkill?: (id: string) => void, // jogador acionou uma habilidade da barra
  onAttr?: (key: "str" | "dex" | "int", delta: number) => void, // distribuiu atributo
  onSmithSelect?: (id: string) => void, // escolheu um item no ferreiro
  onSmithUpgrade?: () => SmithUpgradeResult | null, // aprimora; devolve sucesso + novo estado
  onStoreMode?: (mode: "buy" | "sell") => void, // trocou aba comprar/vender no mercador
  onStoreTrade?: (id: string, qty: number) => StoreData, // confirmou compra/venda; devolve novo estado
  onStashMode?: (mode: "deposit" | "withdraw") => void, // trocou aba guardar/retirar no baú
  onStashMove?: (id: string, qty: number) => StashData, // confirmou guardar/retirar; devolve novo estado
  onUseItem?: (id: string) => void, // usou um consumível na bandeja do HUD
  onBuyDrink?: (id: string) => TavernData | null, // comprou bebida; devolve novo estado
  onQuest?: (id: string, action: "accept" | "turnin") => TavernData | null, // missão
  onDialogueChoice?: (id: string) => void, // clicou num botão de escolha do diálogo
  onOpenJournal?: () => JournalData | null, // abriu o Diário de Missões (Game monta os dados)
  onToggleGuide?: () => void, // ligou/desligou o guia (marcador) do mapa pelo rastreador
  onEquipArmor?: (uid: string) => void, // clicou numa armadura da mochila (equipar)
  onUnequipArmor?: (slot: string) => void, // clicou numa peça do boneco (desequipar)
): HUD {
  const catalog: Record<string, Weapon> = {};
  for (const w of weapons ?? []) catalog[w.id] = w;
  let current: Weapon | null = null; // arma equipada na mão principal
  // ---- teclado ----
  const keymap: Record<string, Action> = {
    ArrowUp: "forward",
    KeyW: "forward",
    ArrowDown: "back",
    KeyS: "back",
    ArrowLeft: "turnLeft",
    KeyA: "turnLeft",
    ArrowRight: "turnRight",
    KeyD: "turnRight",
    KeyQ: "strafeLeft",
    KeyE: "strafeRight",
    Space: "interact",
    Enter: "interact",
    KeyF: "interact",
    KeyJ: "attack",
    KeyK: "attack",
  };
  window.addEventListener("keydown", (e) => {
    const a = keymap[e.code];
    if (a) {
      e.preventDefault();
      onAction(a);
    }
  });

  // ---- arma em 1ª pessoa (overlay) ----
  // O "rig" é um suporte que agrupa a espada + o rastro de corte. É NELE que a
  // animação do golpe (rotação 3D) é aplicada, então o rastro gira junto com a
  // lâmina — o corte segue a espada de forma travada/sincronizada.
  let weaponRig: HTMLElement | null = null;
  let weapon: HTMLImageElement | null = null; // sprite de descanso
  let weaponAtk: HTMLImageElement | null = null; // sprite de golpe (2º, opcional)
  let slashFx: HTMLElement | null = null;
  let impactFx: HTMLElement | null = null; // clarão de impacto no auge do golpe
  let shockFx: HTMLElement | null = null; // onda de choque (golpes pesados)
  let screenFx: HTMLElement | null = null; // lampejo de tela (pancada rombuda)
  let swinging = false;
  const swingTimers: number[] = [];
  if (weaponUrl) {
    weaponRig = document.createElement("div");
    weaponRig.id = "gh-weapon-rig";
    weapon = document.createElement("img");
    weapon.id = "gh-weapon";
    weapon.src = weaponUrl;
    weapon.alt = "";
    weaponRig.appendChild(weapon);
    // rastro de corte — DENTRO do rig, encostado no fio da lâmina, p/ girar junto
    slashFx = document.createElement("div");
    slashFx.id = "gh-slash";
    slashFx.innerHTML =
      '<svg viewBox="0 0 240 200" preserveAspectRatio="none">' +
      '<defs><linearGradient id="ghslashg" x1="0" y1="0" x2="1" y2="0.5">' +
      '<stop offset="0" stop-color="#ffffff" stop-opacity="0"/>' +
      '<stop offset="0.5" stop-color="#eaf6ff" stop-opacity="0.95"/>' +
      '<stop offset="1" stop-color="#bfe3ff" stop-opacity="0"/>' +
      "</linearGradient></defs>" +
      '<path d="M18,64 C82,20 172,30 226,112 C162,70 92,74 26,90 Z" fill="url(#ghslashg)"/>' +
      '<path d="M28,68 C88,30 168,42 214,104" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/>' +
      "</svg>";
    weaponRig.appendChild(slashFx);
    root.appendChild(weaponRig);
    if (weaponAtkUrl) {
      weaponAtk = document.createElement("img");
      weaponAtk.id = "gh-weapon-atk";
      weaponAtk.src = weaponAtkUrl;
      weaponAtk.alt = "";
      root.appendChild(weaponAtk);
    }
    // clarão radial no ponto de impacto (some rápido)
    impactFx = document.createElement("div");
    impactFx.id = "gh-impact";
    root.appendChild(impactFx);
    // onda de choque (anel) + lampejo de tela — usados só nos golpes pesados
    shockFx = document.createElement("div");
    shockFx.id = "gh-shock";
    root.appendChild(shockFx);
    screenFx = document.createElement("div");
    screenFx.id = "gh-screenflash";
    root.appendChild(screenFx);
  }
  // canvas do jogo (p/ o "tranco" de câmera no impacto); resolvido no 1º golpe
  let canvasEl: HTMLElement | null = null;

  // placa de status (arte) — vida em cima, mana embaixo (canto superior esq.).
  // A placa é a moldura pintada; os preenchimentos vermelho/azul entram por
  // código nos dois encaixes (posições medidas na arte, em % da placa).
  const hudWrap = document.createElement("div");
  hudWrap.id = "gh-hud";
  hudWrap.innerHTML =
    '<div class="gh-hud-bar gh-hud-hp"><div class="gh-hud-fill gh-hud-hp-fill"></div></div>' +
    '<div class="gh-hud-bar gh-hud-mp"><div class="gh-hud-fill gh-hud-mp-fill"></div></div>';
  root.appendChild(hudWrap);
  const hpFill = hudWrap.querySelector(".gh-hud-hp-fill") as HTMLElement;
  const mpFill = hudWrap.querySelector(".gh-hud-mp-fill") as HTMLElement;

  // ---- BARRA DE XP: faixa BEM FINA na base da tela, de ponta a ponta, que enche
  // conforme o XP do nível atual. Um pequeno "Nv X" na ponta esquerda. ----
  const xpbar = document.createElement("div");
  xpbar.id = "gh-xpbar";
  xpbar.innerHTML = '<div id="gh-xpbar-fill"></div><span id="gh-xpbar-lv">Nv 1</span>';
  root.appendChild(xpbar);
  const xpFill = xpbar.querySelector("#gh-xpbar-fill") as HTMLElement;
  const xpLv = xpbar.querySelector("#gh-xpbar-lv") as HTMLElement;
  const setXp = (level: number, xp: number, xpMax: number) => {
    const frac = xpMax > 0 ? Math.max(0, Math.min(1, xp / xpMax)) : (level >= 100 ? 1 : 0);
    xpFill.style.width = (frac * 100).toFixed(2) + "%";
    xpLv.textContent = "Nv " + level;
  };

  // ---- MAPA (canto superior direito): moldura + canvas do minimapa (zoom) ----
  const mapWrap = document.createElement("div");
  mapWrap.id = "gh-map";
  const mapCanvas = document.createElement("canvas");
  mapCanvas.id = "gh-map-canvas";
  mapCanvas.width = 132;
  mapCanvas.height = 132;
  mapWrap.appendChild(mapCanvas);
  // botão de EXPANDIR (abre o mapa grande estilo PoE/Diablo)
  const mapExpand = document.createElement("button");
  mapExpand.id = "gh-map-expand";
  mapExpand.title = "Expandir mapa (M)";
  mapExpand.innerHTML =
    '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  mapWrap.appendChild(mapExpand);
  root.appendChild(mapWrap);
  const mapCtx = mapCanvas.getContext("2d");
  const MINI_RADIUS = 3; // células ao redor do jogador (janela 2R+1=7×7) — mais zoom, ícones maiores

  // ---- RASTREADOR DE MISSÃO (logo abaixo do minimapa) ----
  // Painel discreto: nome da missão ativa + objetivo atual, com um botão que
  // liga/desliga o marcador-guia (no mapa e no mundo).
  const tracker = document.createElement("div");
  tracker.id = "gh-tracker";
  tracker.style.display = "none";
  tracker.innerHTML =
    '<div class="gh-tk-head">' +
    '<span class="gh-tk-title"></span>' +
    '<button class="gh-tk-guide" title="Mostrar/ocultar guia no mapa"><svg viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor" d="M12 3l2.5 5.6L20 9.3l-4 4 1 6-5-2.9L7 19.3l1-6-4-4 5.5-.7z"/></svg></button>' +
    '</div>' +
    '<div class="gh-tk-obj"></div>';
  root.appendChild(tracker);
  const tkTitle = tracker.querySelector(".gh-tk-title") as HTMLElement;
  const tkObj = tracker.querySelector(".gh-tk-obj") as HTMLElement;
  const tkGuide = tracker.querySelector(".gh-tk-guide") as HTMLElement;
  tkGuide.onclick = (e) => { e.preventDefault(); e.stopPropagation(); onToggleGuide?.(); };
  const setTracker = (data: TrackerData | null) => {
    if (!data || !data.title) { tracker.style.display = "none"; return; }
    tracker.style.display = "block";
    tkTitle.textContent = data.title;
    tkObj.textContent = data.objective ? "▸ " + data.objective : "";
    tkGuide.classList.toggle("gh-tk-guide-off", !data.guideOn);
    tkGuide.title = data.guideOn ? "Ocultar guia no mapa" : "Mostrar guia no mapa";
  };

  // ---- MAPA GRANDE (overlay) ----
  const bigMap = document.createElement("div");
  bigMap.id = "gh-bigmap";
  bigMap.className = "gh-bigmap-hidden";
  bigMap.innerHTML =
    '<div id="gh-bigmap-win"><button id="gh-bigmap-close" title="Fechar (Esc/M)">✕</button>' +
    '<canvas id="gh-bigmap-canvas" width="720" height="720"></canvas></div>';
  root.appendChild(bigMap);
  const bigCanvas = bigMap.querySelector("#gh-bigmap-canvas") as HTMLCanvasElement;
  const bigCtx = bigCanvas.getContext("2d");
  let lastMini: MinimapState | null = null;
  let mapPhase = 0; // fase de animação (pulsos) — avança no loop rAF
  const bigOpen = () => !bigMap.classList.contains("gh-bigmap-hidden");
  // marcador do HERÓI: uma "moeda" bronze (combina com os medalhões dos POIs)
  // com uma ponta de seta dourada brilhante que gira p/ a direção que ele encara.
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    px: number,
    py: number,
    rad: number,
    ang: number,
  ) => {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(ang);
    // ponta de seta dourada apontando p/ a direção — SEM moeda/círculo de fundo
    ctx.beginPath();
    ctx.moveTo(rad * 1.3, 0);
    ctx.lineTo(-rad * 0.85, rad * 0.82);
    ctx.lineTo(-rad * 0.38, 0);
    ctx.lineTo(-rad * 0.85, -rad * 0.82);
    ctx.closePath();
    const gold = ctx.createLinearGradient(-rad, -rad, rad * 1.3, rad);
    gold.addColorStop(0, "#fff2b8"); gold.addColorStop(1, "#ffc63e");
    ctx.fillStyle = gold;
    ctx.shadowColor = "rgba(255,214,110,.95)";
    ctx.shadowBlur = rad * 0.85;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = Math.max(0.8, rad * 0.13);
    ctx.strokeStyle = "rgba(92,62,18,.9)";
    ctx.stroke();
    ctx.restore();
  };
  // desenha só o ÍCONE do marcador (o rótulo é um passo à parte, com desvio de
  // colisão — ver placeLabels). Sem medalhão: arte própria discreta.
  const drawPoi = (
    ctx: CanvasRenderingContext2D, x: number, y: number, size: number,
    poi: MiniPoi, _phase: number,
  ) => {
    const col = POI_COLOR[poi.kind] ?? "#e8dcc0";
    const img = POI_IMG[poi.kind];
    const d = size * 1.42;
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,.6)"; ctx.shadowBlur = size * 0.18; ctx.shadowOffsetY = size * 0.04;
      ctx.drawImage(img, x - d / 2, y - d / 2, d, d);
      ctx.restore();
    } else {
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, size * 0.52, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(10,10,14,.85)"; ctx.fill();
      ctx.lineWidth = Math.max(1, size * 0.1); ctx.strokeStyle = col; ctx.stroke();
      ctx.restore();
    }
  };
  // marcador-GUIA da missão ativa: losango dourado com um "!" e um pino/haste,
  // bem destacado sobre os demais ícones, na célula de destino.
  const drawWaypoint = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const s = size * 0.62;
    ctx.save();
    ctx.translate(x, y - size * 0.15);
    // halo suave
    ctx.beginPath(); ctx.arc(0, size * 0.15, s * 1.15, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(244,216,115,.16)"; ctx.fill();
    // haste do pino
    ctx.strokeStyle = "rgba(20,15,6,.85)"; ctx.lineWidth = Math.max(2, s * 0.14);
    ctx.beginPath(); ctx.moveTo(0, s * 0.5); ctx.lineTo(0, size * 0.42); ctx.stroke();
    // losango
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.78); ctx.lineTo(s * 0.62, 0); ctx.lineTo(0, s * 0.78); ctx.lineTo(-s * 0.62, 0); ctx.closePath();
    const g = ctx.createLinearGradient(0, -s, 0, s);
    g.addColorStop(0, "#ffe9a6"); g.addColorStop(1, "#d69a24");
    ctx.fillStyle = g; ctx.fill();
    ctx.lineWidth = Math.max(1.5, s * 0.1); ctx.strokeStyle = "#5a3d0e"; ctx.stroke();
    // "!"
    ctx.fillStyle = "#3a2708"; ctx.font = `700 ${Math.round(s * 0.92)}px "Cinzel",serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("!", 0, -s * 0.04);
    ctx.restore();
  };
  // pinta a "plaquinha" do rótulo (pílula escura + texto) centrada em (cx,cy)
  const drawLabelPill = (
    ctx: CanvasRenderingContext2D, cx: number, cy: number,
    text: string, fs: number, tw: number, color: string,
  ) => {
    const padX = fs * 0.4, ph = fs * 1.24, rw = tw + padX * 2, rr = ph * 0.42;
    const rx = cx - rw / 2, ry = cy - ph / 2;
    ctx.save();
    ctx.font = `600 ${fs}px "Cinzel",serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(8,8,12,.78)";
    ctx.beginPath();
    ctx.moveTo(rx + rr, ry);
    ctx.arcTo(rx + rw, ry, rx + rw, ry + ph, rr);
    ctx.arcTo(rx + rw, ry + ph, rx, ry + ph, rr);
    ctx.arcTo(rx, ry + ph, rx, ry, rr);
    ctx.arcTo(rx, ry, rx + rw, ry, rr);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, cx, cy);
    ctx.restore();
  };
  // rótulos dos NPCs: SEMPRE embaixo do ícone, mas BEM colados (encostados na
  // arte, tucados no vão transparente do próprio ícone) e com fonte pequena, p/
  // o nome caber quase inteiro dentro da célula e não avançar sobre os vizinhos.
  const placeLabels = (
    ctx: CanvasRenderingContext2D,
    items: { x: number; y: number; d: number; label: string; color: string }[],
    fs: number,
  ) => {
    ctx.save();
    ctx.font = `600 ${fs}px "Cinzel",serif`;
    const ph = fs * 1.24;
    for (const it of items) {
      const tw = ctx.measureText(it.label).width;
      // a arte visível ocupa ~0,6·d de meia-altura; o topo da plaquinha encosta aí
      const cy = it.y + it.d * 0.30 + ph / 2;
      drawLabelPill(ctx, it.x, cy, it.label, fs, tw, it.color);
    }
    ctx.restore();
  };
  // faixa com o nome do local + bússola "N" no topo do mapa
  const drawLocBanner = (ctx: CanvasRenderingContext2D, W: number, name: string | undefined, h: number) => {
    ctx.save();
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "rgba(8,8,12,.9)"); g.addColorStop(1, "rgba(8,8,12,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, h);
    if (name) {
      ctx.font = `700 ${Math.round(h * 0.5)}px "Cinzel",serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#f4d873";
      ctx.shadowColor = "#000"; ctx.shadowBlur = 4;
      ctx.fillText(name, W / 2, h * 0.52);
    }
    // "N" (norte = topo, o mapa é fixo)
    ctx.shadowBlur = 0;
    ctx.font = `700 ${Math.round(h * 0.44)}px "Cinzel",serif`;
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#9fb4d6";
    ctx.fillText("N", 5, h * 0.52);
    ctx.restore();
  };
  // agrupa os drops por célula: várias bolinhas no MESMO quadradinho quando há
  // mais de um item caído no mesmo lugar (evita empilhar por cima).
  const groupDrops = (drops: MiniDrop[]) => {
    const by = new Map<string, string[]>();
    for (const d of drops) {
      const k = d.c + "," + d.r;
      (by.get(k) ?? by.set(k, []).get(k)!).push(d.color);
    }
    return by;
  };
  // desenha as bolinhas de um grupo de drops dentro de uma célula (leque compacto)
  const drawDropDots = (ctx: CanvasRenderingContext2D, cx: number, cy: number, cell: number, colors: string[]) => {
    const rad = Math.max(1.6, cell * 0.16);
    const n = Math.min(colors.length, 5); // no máx. 5 bolinhas por célula (legibilidade)
    const spread = cell * 0.2;
    for (let i = 0; i < n; i++) {
      // 1 item = centro; 2+ = leque horizontal pequeno
      const ox = n === 1 ? 0 : (i - (n - 1) / 2) * spread;
      const oy = n <= 2 ? 0 : (i % 2 === 0 ? -spread * 0.5 : spread * 0.5);
      ctx.beginPath();
      ctx.arc(cx + ox, cy + oy, rad, 0, Math.PI * 2);
      ctx.fillStyle = colors[i];
      ctx.shadowColor = colors[i]; ctx.shadowBlur = rad * 1.6;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = Math.max(0.8, rad * 0.32);
      ctx.strokeStyle = "rgba(6,7,10,.85)";
      ctx.stroke();
    }
  };
  // minimapa PEQUENO: janela de (2R+1)² células centrada no herói (zoom local)
  const drawSmall = (s: MinimapState) => {
    const ctx = mapCtx;
    if (!ctx) return;
    // casa a resolução do canvas com o tamanho REAL exibido (nitidez, sem borrar)
    const dpr = window.devicePixelRatio || 1;
    const disp = Math.round(mapCanvas.clientWidth * dpr);
    if (disp > 0 && mapCanvas.width !== disp) {
      mapCanvas.width = disp;
      mapCanvas.height = disp;
    }
    const W = mapCanvas.width, H = mapCanvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0b0d12";
    ctx.fillRect(0, 0, W, H);
    const R = MINI_RADIUS, n = 2 * R + 1;
    const cell = Math.floor(W / n); // célula INTEIRA → grade uniforme (sem gaps tortos)
    const off = Math.floor((W - cell * n) / 2); // centraliza a janela
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const c = s.col + dx, r = s.row + dy;
        const inside = c >= 0 && c < s.cols && r >= 0 && r < s.rows;
        ctx.fillStyle = !inside ? "#0b0d12" : s.cells[r * s.cols + c] ? "#54606f" : "#171b22";
        ctx.fillRect(off + (dx + R) * cell, off + (dy + R) * cell, cell - 1, cell - 1);
      }
    }
    // marcadores dentro da janela (ícones, sem rótulo — o mapa é pequeno).
    // TODOS do mesmo tamanho; locais desenhados por cima em caso de sobreposição.
    if (s.pois) {
      const order = [...s.pois].sort((a, b) => (miniMinor(a.kind) ? 0 : 1) - (miniMinor(b.kind) ? 0 : 1));
      for (const p of order) {
        const dx = p.c - s.col, dy = p.r - s.row;
        if (Math.abs(dx) > R || Math.abs(dy) > R) continue;
        const x = off + (dx + R) * cell + cell / 2;
        const y = off + (dy + R) * cell + cell / 2;
        drawPoi(ctx, x, y, cell * 0.9, p, mapPhase);
      }
    }
    // DROPS: bolinha colorida por raridade na célula do item (agrupadas)
    if (s.drops && s.drops.length) {
      for (const [k, colors] of groupDrops(s.drops)) {
        const [c, r] = k.split(",").map(Number);
        const dx = c - s.col, dy = r - s.row;
        if (Math.abs(dx) > R || Math.abs(dy) > R) continue;
        drawDropDots(ctx, off + (dx + R) * cell + cell / 2, off + (dy + R) * cell + cell / 2, cell, colors);
      }
    }
    // marcador-guia da missão (por cima dos ícones), se estiver na janela
    if (s.waypoint) {
      const dx = s.waypoint.c - s.col, dy = s.waypoint.r - s.row;
      if (Math.abs(dx) <= R && Math.abs(dy) <= R)
        drawWaypoint(ctx, off + (dx + R) * cell + cell / 2, off + (dy + R) * cell + cell / 2, cell * 1.1);
    }
    // herói SEMPRE no centro exato da janela (célula central) — só a seta, sem círculo
    const pc = off + R * cell + Math.floor(cell / 2);
    drawArrow(ctx, pc, pc, Math.max(4, cell * 0.32), Math.atan2(s.dr, s.dc));
    drawLocBanner(ctx, W, s.locName, Math.round(H * 0.16));
  };
  // mapa GRANDE: o local inteiro cabendo na tela (estilo PoE/Diablo)
  const drawBig = (s: MinimapState) => {
    const ctx = bigCtx;
    if (!ctx) return;
    const W = bigCanvas.width, H = bigCanvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0b0d12";
    ctx.fillRect(0, 0, W, H);
    const pad = 40;
    const cell = Math.max(3, Math.floor(Math.min((W - 2 * pad) / s.cols, (H - 2 * pad) / s.rows)));
    const gw = cell * s.cols, gh = cell * s.rows;
    const ox = Math.round((W - gw) / 2), oy = Math.round((H - gh) / 2);
    for (let r = 0; r < s.rows; r++)
      for (let c = 0; c < s.cols; c++) {
        ctx.fillStyle = s.cells[r * s.cols + c] ? "#5a6675" : "#171b22";
        ctx.fillRect(ox + c * cell, oy + r * cell, cell - 1, cell - 1);
      }
    // 1º passo: todos os ÍCONES (NPCs por baixo, locais por cima). 2º passo: os
    // rótulos dos NPCs, cada um desviado p/ o lado que não cobre outro ícone.
    if (s.pois) {
      const base = Math.max(15, cell * 1.15);
      const size = base * 0.72, d = size * 1.42;
      const order = [...s.pois].sort((a, b) => (miniMinor(a.kind) ? 0 : 1) - (miniMinor(b.kind) ? 0 : 1));
      for (const p of order) {
        drawPoi(ctx, ox + p.c * cell + cell / 2, oy + p.r * cell + cell / 2, size, p, mapPhase);
      }
      // rótulos: só NPCs (os locais são óbvios pela arte), sempre embaixo e bem
      // colados ao ícone, com fonte pequena p/ não avançar sobre os vizinhos.
      const labels = order
        .filter((p) => p.kind === "npc" && p.label)
        .map((p) => ({ x: ox + p.c * cell + cell / 2, y: oy + p.r * cell + cell / 2, d, label: p.label, color: "#cbd8ea" }));
      if (labels.length) placeLabels(ctx, labels, Math.max(7, Math.round(size * 0.2)));
    }
    // DROPS: bolinhas coloridas por raridade (agrupadas por célula)
    if (s.drops && s.drops.length) {
      for (const [k, colors] of groupDrops(s.drops)) {
        const [c, r] = k.split(",").map(Number);
        drawDropDots(ctx, ox + c * cell + cell / 2, oy + r * cell + cell / 2, Math.max(10, cell), colors);
      }
    }
    // marcador-guia da missão ativa, por cima de tudo
    if (s.waypoint)
      drawWaypoint(ctx, ox + s.waypoint.c * cell + cell / 2, oy + s.waypoint.r * cell + cell / 2, Math.max(18, cell * 1.35));
    drawArrow(ctx, ox + s.col * cell + cell / 2, oy + s.row * cell + cell / 2, Math.max(8, cell * 0.8), Math.atan2(s.dr, s.dc));
    drawLocBanner(ctx, W, s.locName, 40);
  };
  const openBigMap = () => {
    bigMap.classList.remove("gh-bigmap-hidden");
    if (lastMini) drawBig(lastMini);
  };
  const closeBigMap = () => bigMap.classList.add("gh-bigmap-hidden");
  mapExpand.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); openBigMap(); });
  // clicar em qualquer lugar do minimapa (canvas) também expande
  mapCanvas.addEventListener("click", (e) => { e.preventDefault(); openBigMap(); });
  (bigMap.querySelector("#gh-bigmap-close") as HTMLElement).addEventListener("click", (e) => { e.preventDefault(); closeBigMap(); });
  bigMap.addEventListener("click", (e) => { if (e.target === bigMap) closeBigMap(); });
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyM") { e.preventDefault(); bigOpen() ? closeBigMap() : openBigMap(); }
    else if (e.code === "Escape") closeBigMap();
  });
  // (sem loop de animação: os marcadores não pulsam mais; o mapa é redesenhado
  // a cada movimento via updateMinimap)

  // ---- RELÓGIO dia/noite (sol/lua orbitando) — logo abaixo do mapa ----
  const clock = document.createElement("div");
  clock.id = "gh-clock";
  clock.innerHTML =
    `<img class="gh-sun" src="${clockSunUrl}" alt="" draggable="false"/>` +
    `<img class="gh-moon" src="${clockMoonUrl}" alt="" draggable="false"/>`;
  root.appendChild(clock);
  const sunEl = clock.querySelector(".gh-sun") as HTMLElement;
  const moonEl = clock.querySelector(".gh-moon") as HTMLElement;

  // ---- janela de equipamentos / personagem ----
  // botão de abrir (canto superior direito)
  const charBtn = document.createElement("button");
  charBtn.id = "gh-char-btn";
  charBtn.title = "Personagem (C)";
  charBtn.innerHTML = `<img class="gh-char-ico" src="${icoInventoryUrl}" alt=""/>`;
  root.appendChild(charBtn);

  // ---- botão + janela de OPÇÕES (áudio) ----
  const optBtn = document.createElement("button");
  optBtn.id = "gh-opt-btn";
  optBtn.title = "Opções";
  optBtn.innerHTML = `<span class="gh-opt-gear">⚙</span>`;
  root.appendChild(optBtn);

  const opt = document.createElement("div");
  opt.id = "gh-opt";
  opt.className = "gh-eq-hidden";
  const pct = (v: number) => Math.round(v * 100);
  const sliderRow = (ch: string, label: string, val: number) =>
    `<div class="gh-opt-row"><label>${label}</label>` +
    `<input type="range" min="0" max="100" value="${pct(val)}" class="gh-opt-slider" data-ch="${ch}"/>` +
    `<span class="gh-opt-val" data-for="${ch}">${pct(val)}%</span></div>`;
  opt.innerHTML =
    '<div id="gh-opt-win"><button id="gh-opt-close" title="Fechar">✕</button>' +
    '<div class="gh-opt-title">OPÇÕES</div>' +
    `<div class="gh-opt-sec${audio.muted ? " gh-opt-mutedsec" : ""}" id="gh-opt-audio">` +
    '<div class="gh-opt-sh">ÁUDIO</div>' +
    sliderRow("sfx", "Efeitos", audio.sfx) +
    sliderRow("music", "Música", audio.music) +
    '<div class="gh-opt-row gh-opt-rowmute"><label>Mudo</label>' +
    `<button class="gh-opt-toggle${audio.muted ? " gh-opt-on" : ""}" id="gh-opt-mute" aria-label="Mudo"><span class="gh-opt-knob"></span></button></div>` +
    '</div></div>';
  root.appendChild(opt);
  const optAudioSec = opt.querySelector("#gh-opt-audio") as HTMLElement;
  const muteBtn = opt.querySelector("#gh-opt-mute") as HTMLElement;
  const syncMuteUI = () => {
    optAudioSec.classList.toggle("gh-opt-mutedsec", audio.muted);
    muteBtn.classList.toggle("gh-opt-on", audio.muted);
  };
  opt.querySelectorAll<HTMLInputElement>(".gh-opt-slider").forEach((s) => {
    s.addEventListener("input", () => {
      const v = Number(s.value) / 100;
      if (s.dataset.ch === "sfx") audio.setSfx(v); else audio.setMusic(v);
      const lab = opt.querySelector(`.gh-opt-val[data-for="${s.dataset.ch}"]`);
      if (lab) lab.textContent = `${s.value}%`;
    });
  });
  muteBtn.addEventListener("click", (e) => { e.preventDefault(); audio.setMuted(!audio.muted); syncMuteUI(); });
  optBtn.addEventListener("click", (e) => { e.preventDefault(); opt.classList.toggle("gh-eq-hidden"); });
  (opt.querySelector("#gh-opt-close") as HTMLElement).addEventListener("click", (e) => { e.preventDefault(); opt.classList.add("gh-eq-hidden"); });
  opt.addEventListener("click", (e) => { if (e.target === opt) opt.classList.add("gh-eq-hidden"); });

  // ---- botão + DIÁRIO DE MISSÕES ----
  const jbtn = document.createElement("button");
  jbtn.id = "gh-journal-btn";
  jbtn.title = "Diário de Missões (J)";
  jbtn.innerHTML = `<span class="gh-journal-ico">📜</span>`;
  root.appendChild(jbtn);
  const journal = document.createElement("div");
  journal.id = "gh-journal";
  journal.className = "gh-eq-hidden";
  journal.innerHTML = '<div id="gh-journal-win"><button id="gh-journal-close" title="Fechar">✕</button>' +
    '<div class="gh-jr-title">DIÁRIO DE MISSÕES</div><div id="gh-journal-body"></div></div>';
  root.appendChild(journal);
  const journalBody = journal.querySelector("#gh-journal-body") as HTMLElement;
  const JR_BADGE: Record<string, string> = { done: "Concluída", active: "Em andamento", available: "Disponível", locked: "Selada" };
  const renderJournal = (d: JournalData) => {
    const entry = (e: JournalEntry, chap?: number) => {
      if (e.status === "locked")
        return `<div class="gh-jr-q gh-jr-locked"><div class="gh-jr-ico">🔒</div>` +
          `<div class="gh-jr-txt"><div class="gh-jr-h">${chap ? `Capítulo ${chap}: ` : ""}???</div>` +
          `<div class="gh-jr-d">Ainda não revelada.</div></div></div>`;
      const obj = e.status === "active" && e.objective ? `<div class="gh-jr-obj">◈ ${e.objective}</div>` : "";
      return `<div class="gh-jr-q gh-jr-${e.status}"><div class="gh-jr-ico">${e.icon}</div>` +
        `<div class="gh-jr-txt"><div class="gh-jr-h">${chap ? `Capítulo ${chap}: ` : ""}${e.title}` +
        `<span class="gh-jr-badge gh-jr-b-${e.status}">${JR_BADGE[e.status] ?? ""}</span></div>` +
        `<div class="gh-jr-d">${e.summary}</div>${obj}</div></div>`;
    };
    const mainHtml = d.main.map((e, i) => entry(e, i + 1)).join("");
    const sideHtml = d.side.length ? d.side.map((e) => entry(e)).join("")
      : '<div class="gh-jr-empty">Nenhuma missão secundária no momento.</div>';
    journalBody.innerHTML =
      '<div class="gh-jr-sec"><div class="gh-jr-sh">✦ A Névoa Devoradora <small>Linha Principal</small></div>' +
      `<div class="gh-jr-list">${mainHtml}</div></div>` +
      '<div class="gh-jr-sec"><div class="gh-jr-sh">Missões</div>' +
      `<div class="gh-jr-list">${sideHtml}</div></div>`;
  };
  const showJournal = () => { const d = onOpenJournal?.(); if (d) renderJournal(d); journal.classList.remove("gh-eq-hidden"); };
  jbtn.addEventListener("click", (e) => { e.preventDefault(); if (journal.classList.contains("gh-eq-hidden")) showJournal(); else journal.classList.add("gh-eq-hidden"); });
  (journal.querySelector("#gh-journal-close") as HTMLElement).addEventListener("click", (e) => { e.preventDefault(); journal.classList.add("gh-eq-hidden"); });
  journal.addEventListener("click", (e) => { if (e.target === journal) journal.classList.add("gh-eq-hidden"); });

  // disposição "boneco" estilo Path of Exile numa grade 8×6 (célula quadrada):
  // armas altas (2×4) nas laterais; elmo (2×2) no topo; peitoral (2×3) no centro;
  // amuleto/anéis pequenos (1×1) ao redor; luvas/cinto/botas na base.
  const EQ_SLOTS: { key: string; label: string; gc: string; gr: string }[] = [
    { key: "main", label: "Arma", gc: "1 / 3", gr: "1 / 5" },
    { key: "off", label: "Secundária", gc: "7 / 9", gr: "1 / 5" },
    { key: "head", label: "Elmo", gc: "4 / 6", gr: "1 / 3" },
    { key: "amulet", label: "Amul.", gc: "6 / 7", gr: "2 / 3" },
    { key: "chest", label: "Peitoral", gc: "4 / 6", gr: "3 / 6" },
    { key: "ring1", label: "Anel", gc: "3 / 4", gr: "4 / 5" },
    { key: "ring2", label: "Anel", gc: "6 / 7", gr: "4 / 5" },
    { key: "hands", label: "Luvas", gc: "2 / 4", gr: "5 / 7" },
    { key: "belt", label: "Cinto", gc: "4 / 6", gr: "6 / 7" },
    { key: "feet", label: "Botas", gc: "6 / 8", gr: "5 / 7" },
  ];
  // slots SEM texto (o rótulo fica só nos dados p/ o futuro "destaque" do slot
  // certo ao clicar num item). O que vai dentro é o ícone do item equipado.
  const slotHtml = (s: { key: string; label: string; gc: string; gr: string }) =>
    `<div class="gh-slot" data-slot="${s.key}" title="${s.label}" style="grid-column:${s.gc};grid-row:${s.gr}"></div>`;
  // mochila (grade simples estilo WoW): 20 slots quadrados, reutilizando a MESMA
  // arte do slot (9-slice). Cada slot guarda 1 item; consumíveis empilham (badge).
  const BAG_SLOTS = 20;
  const bagHtml = Array.from(
    { length: BAG_SLOTS },
    (_, i) => `<div class="gh-bag-slot" data-bag="${i}"></div>`,
  ).join("");
  const eq = document.createElement("div");
  eq.id = "gh-eq";
  eq.className = "gh-eq-hidden";
  eq.innerHTML =
    '<div id="gh-eq-win"><button id="gh-eq-close" title="Fechar (Esc)">✕</button>' +
    '<div id="gh-eq-inner">' +
    '<div class="gh-eq-title">Personagem</div>' +
    '<div class="gh-eq-tabs">' +
    '<button class="gh-tab gh-tab-on" data-tab="equip">Equipamento</button>' +
    '<button class="gh-tab" data-tab="stats">Atributos</button>' +
    '<button class="gh-tab" data-tab="skills">Habilidades</button>' +
    "</div>" +
    '<div class="gh-eq-body">' +
    '<div class="gh-tabpane" data-pane="equip">' +
    '<div class="gh-section"><div class="gh-sec-head">Equipamentos</div>' +
    '<div class="gh-eq-doll">' +
    EQ_SLOTS.map(slotHtml).join("") +
    "</div></div>" +
    '<div class="gh-section"><div class="gh-sec-head gh-sec-inv">Inventário' +
    `<span class="gh-gold" id="gh-gold"><img src="${coinUrl}" alt=""/><b>0</b></span></div>` +
    `<div class="gh-bag">${bagHtml}</div></div>` +
    "</div>" +
    '<div class="gh-tabpane gh-pane-hidden" data-pane="stats">' +
    '<div class="gh-eq-stats" id="gh-eq-stats"></div>' +
    "</div>" +
    '<div class="gh-tabpane gh-pane-hidden" data-pane="skills">' +
    '<div id="gh-skills"></div>' +
    "</div>" +
    "</div></div></div>";
  root.appendChild(eq);

  // ---- POPUP DE ITEM (tooltip com comparação verde/vermelho) ----
  const itip = document.createElement("div");
  itip.id = "gh-itip";
  itip.className = "gh-itip-hidden";
  root.appendChild(itip);
  const hideItip = () => itip.classList.add("gh-itip-hidden");
  const actLabel = (tip: ItemTip) =>
    tip.action === "buy" ? `Comprar · ${tip.price ?? 0} ouro`
      : tip.action === "equip" ? "Equipar"
      : tip.action === "pickup" ? "Pegar"
      : "Desequipar";
  const showItemTip = (tip: ItemTip, anchor: DOMRect, doAction: () => void, centered = false) => {
    const dRow = (d: TipDelta) => {
      const s = d.delta > 0 ? "up" : d.delta < 0 ? "down" : "same";
      const sign = d.delta > 0 ? "+" : "";
      return `<div class="gh-itip-d gh-itip-${s}"><span class="gh-itip-k">${d.label}</span><b>${sign}${d.delta}${d.pct ? "%" : ""}</b></div>`;
    };
    const line = (l: TipLine) => `<div class="gh-itip-l"><span class="gh-itip-k">${l.label}</span><b>${l.value}</b></div>`;
    itip.className = "gh-itip gh-rname-" + tip.rarity;
    itip.innerHTML =
      '<div class="gh-itip-top">' +
        `<span class="gh-itip-ic"><img src="${tip.icon}" alt=""/></span>` +
        `<span class="gh-itip-hd"><span class="gh-itip-name">${tip.name}</span><span class="gh-itip-sub">${tip.sub}</span></span>` +
      "</div>" +
      '<div class="gh-itip-rule"></div>' +
      (tip.lines.length ? `<div class="gh-itip-lines">${tip.lines.map(line).join("")}</div>` : "") +
      (tip.deltas && tip.deltas.length
        ? '<div class="gh-itip-rule"></div><div class="gh-itip-cmp">' +
          `<div class="gh-itip-cmph">Ao trocar${tip.compareName ? ` · ${tip.compareName}` : ""}</div>` +
          tip.deltas.map(dRow).join("") + "</div>"
        : "") +
      `<button class="gh-itip-act">${actLabel(tip)}</button>`;
    itip.classList.remove("gh-itip-hidden");
    const w = itip.offsetWidth, h = itip.offsetHeight;
    let x: number, y: number;
    if (centered) {
      // DROP: popup no centro da tela (sem âncora de slot)
      x = Math.round((window.innerWidth - w) / 2);
      y = Math.round(window.innerHeight * 0.5 - h * 0.5);
      if (y < 6) y = 6;
    } else {
      // posiciona ao lado do slot, preso na tela
      x = anchor.right + 8;
      if (x + w > window.innerWidth - 6) x = anchor.left - w - 8;
      if (x < 6) x = Math.max(6, Math.round((window.innerWidth - w) / 2));
      y = anchor.top - 4;
      if (y + h > window.innerHeight - 6) y = window.innerHeight - h - 6;
      if (y < 6) y = 6;
    }
    itip.style.left = x + "px";
    itip.style.top = y + "px";
    (itip.querySelector(".gh-itip-act") as HTMLElement).onclick = (e) => { e.stopPropagation(); hideItip(); doAction(); };
  };
  // DROP: abre o popup do item centralizado, com o botão "Pegar"
  const showPickup = (tip: ItemTip, onTake: () => void) => {
    const r = new DOMRect(window.innerWidth / 2, window.innerHeight / 2, 0, 0);
    showItemTip(tip, r, onTake, true);
  };
  // fecha ao tocar fora do popup (mas o toque no slot reabre)
  document.addEventListener("pointerdown", (e) => {
    if (!itip.classList.contains("gh-itip-hidden") && !itip.contains(e.target as Node)) hideItip();
  }, true);

  // ---- FERREIRO: janela de aprimoramento (reforço +N) ----
  const sm = document.createElement("div");
  sm.id = "gh-sm";
  sm.className = "gh-eq-hidden";
  sm.innerHTML = '<div id="gh-sm-win"><button id="gh-sm-close" title="Fechar">✕</button><div id="gh-sm-body"></div><div id="gh-sm-flash"></div></div>';
  root.appendChild(sm);
  const smBody = sm.querySelector("#gh-sm-body") as HTMLElement;
  const smFlash = sm.querySelector("#gh-sm-flash") as HTMLElement;
  (sm.querySelector("#gh-sm-close") as HTMLElement).addEventListener("click", (e) => {
    e.preventDefault(); sm.classList.add("gh-eq-hidden");
  });
  // grande "SUCESSO!"/"FALHOU!" que aparece brevemente após os 6s de forja
  const showForgeFlash = (text: string, ok: boolean) => {
    smFlash.textContent = text;
    smFlash.className = "";
    void smFlash.offsetWidth; // reinicia a animação
    smFlash.classList.add("gh-flash-show", ok ? "gh-flash-ok" : "gh-flash-fail");
    window.setTimeout(() => { smFlash.className = ""; }, 1600);
  };
  const renderSmith = (d: SmithData) => {
    // material: slot (só o ícone) + números FORA do container (embaixo)
    const mat = (icon: string, need: number, have: number, cap: string, gold = false) => {
      const ok = have >= need;
      const inner = gold ? `<img src="${coinUrl}" alt=""/>` : `<img class="gh-item-ico" src="${icon}" alt=""/>`;
      return `<div class="gh-sm-mat"><div class="gh-sm-mslot${gold ? " gh-sm-mgold" : ""}">${inner}</div>` +
        `<div class="gh-sm-mnum ${ok ? "gh-ok" : "gh-no"}">${need}<span class="gh-sm-mhave">/${have}</span></div>` +
        `<div class="gh-sm-cap">${cap}</div></div>`;
    };
    // slot da forja: o selo +N fica FORA do slot (num wrapper que não corta)
    const slot = (icon: string, lvl: number, res = false) =>
      `<div class="gh-sm-slotwrap"><div class="gh-slot gh-sm-slot${res ? " gh-sm-res" : ""}"><img class="gh-item-ico" src="${icon}"/></div>` +
      `<span class="gh-sm-tier${res ? " gh-sm-tier-up" : ""}">+${lvl}</span></div>`;
    const s = d.sel;
    let forge: string;
    if (!s) {
      forge = '<div class="gh-sm-empty">Escolha um item no inventário abaixo para aprimorar.</div>';
    } else if (s.max || !s.next) {
      forge =
        '<div class="gh-sm-forge"><div class="gh-sm-col"><div class="gh-sm-lbl">ITEM</div>' +
        slot(s.icon, s.lvl) +
        `<div class="gh-sm-nm">${s.name} +${s.lvl}</div><div class="gh-sm-dmg">Dano ${s.dmg}</div></div></div>` +
        '<div class="gh-sm-max">Reforço máximo atingido.</div>';
    } else {
      const n = s.next;
      const gOk = d.gold >= n.gold;
      const can = d.mats.madeira >= n.madeira && d.mats.minerio >= n.minerio && d.mats.reforco >= n.reforco && gOk;
      forge =
        '<div class="gh-sm-forge">' +
        '<div class="gh-sm-col"><div class="gh-sm-lbl">ITEM</div>' + slot(s.icon, s.lvl) +
        `<div class="gh-sm-nm">${s.name}${s.lvl ? " +" + s.lvl : ""}</div><div class="gh-sm-dmg">Dano ${s.dmg}</div></div>` +
        // NO LUGAR DA SETINHA: a espada do loading, apagada. Enche ao aprimorar.
        '<div class="gh-sm-anvil" id="gh-sm-anvil" style="--fk:0">' +
        `<img class="gh-sm-sword-base" src="${loadSwordUrl}" alt=""/>` +
        '<div class="gh-sm-sword-fill"><div class="gh-sm-sword-lava"></div><span class="gh-sm-front"></span></div>' +
        `<img class="gh-sm-sword-glow" src="${loadSwordUrl}" alt=""/>` +
        '<div class="gh-sm-embers"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>' +
        '<div class="gh-sm-col"><div class="gh-sm-lbl">RESULTADO</div>' + slot(s.icon, s.lvl + 1, true) +
        `<div class="gh-sm-nm gh-up">${s.name} +${s.lvl + 1}</div><div class="gh-sm-dmg">Dano <span class="gh-g">${n.dmg} ▲</span></div></div>` +
        "</div>" +
        '<div class="gh-sm-mats-h">MATERIAIS NECESSÁRIOS</div><div class="gh-sm-mats">' +
        mat(icoMadeiraUrl, n.madeira, d.mats.madeira, "Madeira") +
        mat(icoMinerioUrl, n.minerio, d.mats.minerio, "Minério") +
        mat(icoReforcoUrl, n.reforco, d.mats.reforco, "Pedra de Reforço") +
        mat("", n.gold, d.gold, "Ouro", true) +
        "</div>" +
        `<button class="gh-sm-btn${can ? "" : " gh-sm-dim"}" id="gh-sm-up"${can ? "" : " disabled"}>${can ? "APRIMORAR" : "FALTAM MATERIAIS"}</button>`;
    }
    // INVENTÁRIO: mesmo nº de slots do inventário real (BAG_SLOTS), em escala reduzida
    const cells: string[] = [];
    for (let i = 0; i < BAG_SLOTS; i++) {
      const it = d.items[i];
      if (!it) { cells.push('<div class="gh-bag-slot gh-sm-cell"></div>'); continue; }
      cells.push(
        `<div class="gh-bag-slot gh-sm-cell ${s && it.id === s.id ? "gh-sm-sel" : ""}" data-sid="${it.id}">` +
        `<img class="gh-item-ico" src="${it.icon}" title="${it.name}"/>${it.lvl ? `<span class="gh-sm-badge">+${it.lvl}</span>` : ""}</div>`,
      );
    }
    smBody.innerHTML =
      '<div class="gh-eq-title gh-sm-title">Ferreiro — A Bigorna</div>' +
      `<div class="gh-section gh-sm-sec">${forge}</div>` +
      '<div class="gh-section gh-sm-sec gh-sm-sec-inv"><div class="gh-sec-head gh-sec-inv">Inventário' +
      `<span class="gh-gold"><img src="${coinUrl}" alt=""/><b>${d.gold}</b></span></div>` +
      `<div class="gh-bag gh-sm-bag">${cells.join("")}</div></div>`;
    smBody.querySelectorAll<HTMLElement>("[data-sid]").forEach((el) => {
      el.onclick = () => onSmithSelect?.(el.dataset.sid!);
    });
    const up = smBody.querySelector("#gh-sm-up") as HTMLButtonElement | null;
    if (up && !up.disabled) {
      up.onclick = () => {
        const anvil = smBody.querySelector("#gh-sm-anvil") as HTMLElement | null;
        if (!anvil || up.classList.contains("gh-sm-busy")) return;
        up.classList.add("gh-sm-busy");
        // o Game rola o sucesso, gasta os materiais e devolve o novo estado.
        const res = onSmithUpgrade?.();
        if (!res) { up.classList.remove("gh-sm-busy"); return; }
        runForge(anvil, () => {
          const fill = anvil.querySelector(".gh-sm-sword-fill") as HTMLElement;
          const base = anvil.querySelector(".gh-sm-sword-base") as HTMLElement;
          anvil.classList.remove("gh-forging");
          if (res.success) {
            play(forgeSuccessSnd); // som de SUCESSO
            showForgeFlash("SUCESSO!", true); // letreiro garrafal
            base.style.filter = ""; // deixa a regra .gh-forge-ok clarear a lâmina
            anvil.classList.add("gh-forge-ok");
            setTimeout(() => renderSmith(res.data), 1200);
          } else {
            play(forgeFailSnd); // som de FALHA
            showForgeFlash("FALHOU!", false); // letreiro garrafal
            anvil.classList.add("gh-forge-fail");
            // a espada volta a ficar escura (esvazia).
            base.style.filter = "brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000)";
            fill.style.transition = "width .5s ease-in";
            fill.style.width = "0%";
            setTimeout(() => renderSmith(res.data), 1300);
          }
        });
      };
    }
  };
  // troca de abas
  eq.querySelectorAll(".gh-tab").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = (btn as HTMLElement).dataset.tab;
      eq.querySelectorAll(".gh-tab").forEach((b) => b.classList.toggle("gh-tab-on", b === btn));
      eq.querySelectorAll(".gh-tabpane").forEach((p) =>
        p.classList.toggle("gh-pane-hidden", (p as HTMLElement).dataset.pane !== tab),
      );
    }),
  );
  const eqStats = eq.querySelector("#gh-eq-stats") as HTMLElement;
  // distribuição de atributos: delega o clique nos +/- (a aba é re-renderizada
  // a cada setStats, então um único listener no container evita re-anexar)
  eqStats.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest(".gh-pm") as HTMLElement | null;
    if (!btn || btn.hasAttribute("disabled")) return;
    e.preventDefault();
    const key = btn.dataset.attr as "str" | "dex" | "int" | undefined;
    const d = Number(btn.dataset.d || "0");
    if (key && d) onAttr?.(key, d);
  });
  const goldVal = eq.querySelector("#gh-gold b") as HTMLElement;
  const bagSlots = Array.from(eq.querySelectorAll<HTMLElement>(".gh-bag-slot"));

  // ---- árvore de habilidades ----
  const skillsPane = eq.querySelector("#gh-skills") as HTMLElement;
  let skillClassId = "";
  let skillPointsTotal = 0;
  const skillRanks: Record<string, number> = {};
  let skillSelected: string | null = null; // nó selecionado (aguardando confirmação)
  const spentPoints = () =>
    Object.values(skillRanks).reduce((a, b) => a + b, 0);
  // localiza um skill pelo id + seu estado (destravado? no máximo? dá pra comprar?)
  const skillInfo = (id: string) => {
    const tree = SKILL_TREES[skillClassId];
    if (!tree) return null;
    for (const b of tree.branches) {
      const idx = b.skills.findIndex((x) => x.id === id);
      if (idx >= 0) {
        const sk = b.skills[idx];
        const prev = idx > 0 ? b.skills[idx - 1] : null;
        const unlocked = !prev || (skillRanks[prev.id] || 0) >= 1;
        const rank = skillRanks[id] || 0;
        const maxed = rank >= sk.maxRank;
        const avail = skillPointsTotal - spentPoints();
        return { sk, unlocked, rank, maxed, canBuy: unlocked && !maxed && avail > 0 };
      }
    }
    return null;
  };
  const renderSkills = () => {
    const tree = SKILL_TREES[skillClassId];
    if (!tree) {
      skillsPane.innerHTML =
        '<div class="gh-sk-soon">A árvore de habilidades desta classe chega em breve.</div>';
      return;
    }
    const avail = skillPointsTotal - spentPoints();
    const cols = tree.branches
      .map((b) => {
        const nodes = b.skills
          .map((sk, i) => {
            const rank = skillRanks[sk.id] || 0;
            const prev = i > 0 ? b.skills[i - 1] : null;
            const unlocked = !prev || (skillRanks[prev.id] || 0) >= 1;
            const maxed = rank >= sk.maxRank;
            const canBuy = unlocked && !maxed && avail > 0;
            const kindCls = sk.kind === "active" ? "gh-sk-active" : "gh-sk-passive";
            const state = [
              rank > 0 ? "gh-sk-on" : "",
              !unlocked ? "gh-sk-locked" : "",
              canBuy ? "gh-sk-buy" : "",
              sk.id === skillSelected ? "gh-sk-sel" : "",
            ].join(" ");
            const passIcon = sk.stat ? PASSIVE_ICON[sk.stat] : undefined;
            const inner =
              sk.kind === "active" && sk.icon
                ? `<img src="${sk.icon}" alt=""/>`
                : passIcon
                  ? `<img src="${passIcon}" alt=""/>`
                  : `<span class="gh-sk-sym" style="color:${sk.stat ? STAT_META[sk.stat].color : "#ccc"}">${sk.stat ? STAT_META[sk.stat].sym : "?"}</span>`;
            const line = i > 0 ? `<div class="gh-sk-line" style="background:${b.color}"></div>` : "";
            return `${line}<button class="gh-sk-node ${kindCls} ${state}" data-sk="${sk.id}">${inner}<span class="gh-sk-rank">${rank}/${sk.maxRank}</span></button>`;
          })
          .join("");
        return `<div class="gh-sk-branch"><div class="gh-sk-bhead" style="color:${b.color}">${b.name}</div>${nodes}</div>`;
      })
      .join("");
    // painel de detalhe/confirmação (embaixo)
    let tip =
      '<div class="gh-sk-thint">Toque num nó pra ver os detalhes; depois confirme para gastar o ponto.</div>';
    const info = skillSelected ? skillInfo(skillSelected) : null;
    if (info) {
      const { sk, unlocked, rank, maxed, canBuy } = info;
      let btn: string;
      if (maxed) btn = '<span class="gh-sk-cbtn gh-sk-cdim">No máximo</span>';
      else if (!unlocked) btn = '<span class="gh-sk-cbtn gh-sk-cdim">Requer o nó acima</span>';
      else if (!canBuy) btn = '<span class="gh-sk-cbtn gh-sk-cdim">Sem pontos</span>';
      else
        btn = `<button class="gh-sk-cbtn gh-sk-cbuy" id="gh-sk-confirm">${rank > 0 ? `Melhorar → ${rank + 1}/${sk.maxRank}` : "Aprender"} · 1 ponto</button>`;
      tip =
        `<div class="gh-sk-tname"><b>${sk.name}</b> <i>${sk.kind === "active" ? "Ativa" : "Passiva"} · ${rank}/${sk.maxRank}</i></div>` +
        `<div class="gh-sk-tdesc">${sk.desc}</div>${btn}`;
    }
    skillsPane.innerHTML =
      `<div class="gh-sk-top">Pontos: <b class="${avail > 0 ? "gh-sk-pts" : ""}">${avail}</b></div>` +
      `<div class="gh-sk-cols">${cols}</div>` +
      `<div class="gh-sk-tip" id="gh-sk-tip">${tip}</div>`;
    // fundo (estilo PoE) pintado NO PRÓPRIO #gh-skills (não como filho absoluto —
    // senão ele escapa do scroll e cobre as abas). Escurecido pelos gradientes.
    if (tree.bg) {
      skillsPane.style.backgroundImage = `linear-gradient(rgba(7,7,11,.66), rgba(7,7,11,.66)), url(${tree.bg})`;
      skillsPane.style.backgroundSize = "cover";
      skillsPane.style.backgroundPosition = "center top";
      skillsPane.style.backgroundRepeat = "no-repeat";
    } else {
      skillsPane.style.backgroundImage = "";
    }
    // clicar num nó só SELECIONA (mostra detalhes) — não gasta ponto
    skillsPane.querySelectorAll<HTMLElement>(".gh-sk-node").forEach((n) => {
      n.addEventListener("click", () => {
        skillSelected = n.dataset.sk!;
        renderSkills();
      });
    });
    // o botão CONFIRMAR é quem gasta o ponto
    const confirm = skillsPane.querySelector("#gh-sk-confirm");
    if (confirm)
      confirm.addEventListener("click", () => {
        const inf = skillSelected ? skillInfo(skillSelected) : null;
        if (inf && inf.canBuy) {
          skillRanks[inf.sk.id] = inf.rank + 1;
          renderSkills();
          onSkills?.(skillRanks); // avisa o jogo p/ reaplicar passivas nos atributos
        }
      });
  };
  const openEq = () => eq.classList.remove("gh-eq-hidden");
  const closeEq = () => eq.classList.add("gh-eq-hidden");
  const toggleEq = () =>
    eq.classList.contains("gh-eq-hidden") ? openEq() : closeEq();
  charBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleEq();
  });
  (eq.querySelector("#gh-eq-close") as HTMLElement).addEventListener("click", (e) => {
    e.preventDefault();
    closeEq();
  });
  // clicar no fundo escuro (fora da janela) fecha
  eq.addEventListener("click", (e) => {
    if (e.target === eq) closeEq();
  });
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyC") {
      e.preventDefault();
      toggleEq();
    } else if (e.code === "KeyJ") {
      e.preventDefault();
      if (journal.classList.contains("gh-eq-hidden")) showJournal(); else journal.classList.add("gh-eq-hidden");
    } else if (e.code === "Escape") {
      closeEq();
      journal.classList.add("gh-eq-hidden");
    }
  });
  // vinheta vermelha ao levar dano
  const dmgFx = document.createElement("div");
  dmgFx.id = "gh-dmg";
  root.appendChild(dmgFx);

  // véu preto de TRANSIÇÃO de porta (fade in/out ao atravessar)
  const fadeEl = document.createElement("div");
  fadeEl.id = "gh-fade";
  root.appendChild(fadeEl);
  const fadeOut = (ms: number): Promise<void> => new Promise((resolve) => {
    fadeEl.style.pointerEvents = "auto";
    fadeEl.style.opacity = "1"; // estado final (fica preto)
    fadeEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: "ease-in", fill: "forwards" });
    window.setTimeout(resolve, ms);
  });
  const fadeIn = (ms: number): void => {
    fadeEl.style.opacity = "0"; // estado final (transparente)
    fadeEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: "ease-out", fill: "forwards" });
    window.setTimeout(() => { fadeEl.style.pointerEvents = "none"; }, ms);
  };
  // PÁLPEBRAS: duas barras pretas (cima/baixo) que fecham e abrem no centro —
  // usadas na sequência de ACORDAR (jogador piscando). blinkWake() roda uma
  // sequência groggy e resolve quando os olhos ficam abertos.
  const eyelidTop = document.createElement("div");
  eyelidTop.id = "gh-eyelid-top";
  const eyelidBot = document.createElement("div");
  eyelidBot.id = "gh-eyelid-bot";
  root.appendChild(eyelidTop);
  root.appendChild(eyelidBot);
  // pálpebras controladas POR QUADRO pelo jogo (determinístico). vh = quanto cada
  // barra cobre (0 = olhos abertos). O jogo dirige a sequência groggy no tick.
  const wakeEyelids = (vh: number) => {
    if (vh <= 0.1) { eyelidTop.style.display = "none"; eyelidBot.style.display = "none"; return; }
    eyelidTop.style.display = "block"; eyelidBot.style.display = "block";
    eyelidTop.style.height = vh + "vh"; eyelidBot.style.height = vh + "vh";
  };

  // toast (mensagem flutuante — ex.: subir de nível)
  const toastEl = document.createElement("div");
  toastEl.id = "gh-toast";
  root.appendChild(toastEl);
  const showToast = (msg: string) => {
    toastEl.textContent = msg;
    toastEl.style.animation = "none";
    void toastEl.offsetWidth;
    toastEl.style.animation = "gh-toast 1.8s ease-out";
  };

  // ---- SUBIR DE NÍVEL: animação (GIF: seta subindo) + "LEVEL UP!" garrafal ----
  const levelupEl = document.createElement("div");
  levelupEl.id = "gh-levelup";
  levelupEl.innerHTML =
    `<img class="gh-lu-gif" alt="" draggable="false"/>` +
    `<div class="gh-lu-word" data-text="LEVEL UP!">LEVEL UP!</div>` +
    `<div class="gh-lu-sub"></div>`;
  root.appendChild(levelupEl);
  const luGif = levelupEl.querySelector(".gh-lu-gif") as HTMLImageElement;
  const luSub = levelupEl.querySelector(".gh-lu-sub") as HTMLElement;
  let luTimer = 0;
  const showLevelUp = (level: number) => {
    playClone(levelupSnd); // fanfarra junto com a animação
    luSub.textContent = `Nível ${level}`;
    // reinicia o GIF do zero (recarrega a src p/ a animação tocar de novo)
    luGif.src = "";
    luGif.src = levelupGifUrl;
    levelupEl.classList.remove("gh-lu-on");
    void levelupEl.offsetWidth; // força reflow p/ reiniciar as animações CSS
    levelupEl.classList.add("gh-lu-on");
    window.clearTimeout(luTimer);
    luTimer = window.setTimeout(() => levelupEl.classList.remove("gh-lu-on"), 2600);
  };

  // ---- MERCADOR: janela de comprar/vender + caixa de quantidade ----
  const st = document.createElement("div");
  st.id = "gh-st";
  st.className = "gh-eq-hidden";
  st.innerHTML = '<div id="gh-st-win"><button id="gh-st-close" title="Fechar">✕</button><div id="gh-st-body"></div><div id="gh-st-qty" class="gh-st-qty-hidden"></div></div>';
  root.appendChild(st);
  const stBody = st.querySelector("#gh-st-body") as HTMLElement;
  const stQty = st.querySelector("#gh-st-qty") as HTMLElement;
  (st.querySelector("#gh-st-close") as HTMLElement).addEventListener("click", (e) => {
    e.preventDefault(); st.classList.add("gh-eq-hidden");
  });
  let storeMode: "buy" | "sell" = "buy";
  let storeGold = 0;
  let qtyState: { g: StoreGood; qty: number; max: number } | null = null;
  const goodIcon = (g: StoreGood) =>
    g.iconUrl ? `<img class="gh-item-ico" src="${g.iconUrl}"/>` : `<span class="gh-st-emo">${g.icon ?? "•"}</span>`;
  // desenha (ou redesenha) a CAIXA de quantidade
  const renderQty = () => {
    if (!qtyState) return;
    const { g, qty, max } = qtyState;
    const total = qty * g.price;
    const verb = storeMode === "buy" ? "COMPRAR" : "VENDER";
    const head = storeMode === "buy" ? "QUANTAS DESEJA COMPRAR?" : "QUANTAS DESEJA VENDER?";
    stQty.innerHTML =
      '<div class="gh-st-qbox">' +
      `<div class="gh-st-qtop"><div class="gh-slot gh-st-qico">${goodIcon(g)}</div>` +
      `<div class="gh-st-qinfo"><div class="gh-st-qn">${g.name}</div>` +
      `<div class="gh-st-qu"><img src="${coinUrl}" alt=""/>${g.price} cada · ${g.desc}</div>` +
      `<div class="gh-st-qh">${g.single ? "CONFIRMAR VENDA" : head}</div></div></div>` +
      (g.single ? "" :
        '<div class="gh-st-stepper"><button class="gh-st-step" data-d="-1">−</button>' +
        `<span class="gh-st-qnum">${qty}</span>` +
        '<button class="gh-st-step" data-d="1">＋</button></div>' +
        `<button class="gh-st-max">MÁX (${max})</button>`) +
      `<div class="gh-st-total"><span class="gh-st-x">${qty} ×</span><img src="${coinUrl}" alt=""/>${total}</div>` +
      '<div class="gh-st-qbtns"><button class="gh-st-qbtn gh-st-cancel">CANCELAR</button>' +
      `<button class="gh-st-qbtn gh-st-ok">${verb}</button></div></div>`;
    stQty.querySelectorAll<HTMLElement>(".gh-st-step").forEach((b) => {
      b.onclick = () => { qtyState!.qty = Math.min(max, Math.max(1, qtyState!.qty + Number(b.dataset.d))); renderQty(); };
    });
    const mx = stQty.querySelector<HTMLElement>(".gh-st-max");
    if (mx) mx.onclick = () => { qtyState!.qty = max; renderQty(); };
    (stQty.querySelector(".gh-st-cancel") as HTMLElement).onclick = () => { stQty.classList.add("gh-st-qty-hidden"); qtyState = null; };
    (stQty.querySelector(".gh-st-ok") as HTMLElement).onclick = () => {
      const gid = qtyState!.g.id, q = qtyState!.qty;
      stQty.classList.add("gh-st-qty-hidden"); qtyState = null;
      const data = onStoreTrade?.(gid, q);
      if (data) renderStore(data);
    };
  };
  const openQtyBox = (g: StoreGood) => {
    let max = g.single ? 1 : storeMode === "buy" ? Math.min(99, g.price > 0 ? Math.floor(storeGold / g.price) : 0) : g.have;
    if (storeMode === "buy" && max < 1) { showToast("Ouro insuficiente."); return; }
    if (max < 1) return;
    qtyState = { g, qty: 1, max };
    stQty.classList.remove("gh-st-qty-hidden");
    renderQty();
  };
  const renderStore = (d: StoreData) => {
    storeMode = d.mode; storeGold = d.gold;
    const cells = d.goods.length
      ? d.goods.map((g) =>
          `<div class="gh-st-good" data-gid="${g.id}"><div class="gh-slot gh-st-gslot${g.rarity ? " gh-rar-" + g.rarity : ""}">${goodIcon(g)}` +
          `${g.have > 0 && !g.single ? `<span class="gh-count gh-st-cnt">${g.have}</span>` : ""}</div>` +
          `<div class="gh-st-gname">${g.name}</div>` +
          `<div class="gh-st-gprice"><img src="${coinUrl}" alt=""/>${g.price}</div></div>`,
        ).join("")
      : `<div class="gh-st-empty">${d.mode === "sell" ? "Você não tem nada para vender." : "Sem mercadorias."}</div>`;
    stBody.innerHTML =
      '<div class="gh-eq-title gh-st-title"><img class="gh-st-portr" src="' + (d.portraitUrl ?? mercadoraUrl) + '" alt=""/>' +
      '<span class="gh-st-tt">' + (d.title ?? "Mercador") + '<small>' + (d.subtitle ?? "O Empório de Rosa") + '</small></span>' +
      `<span class="gh-gold gh-st-gold"><img src="${coinUrl}" alt=""/><b>${d.gold}</b></span></div>` +
      '<div class="gh-st-tabs">' +
      `<button class="gh-st-tab${d.mode === "buy" ? " gh-st-on" : ""}" data-mode="buy">COMPRAR</button>` +
      `<button class="gh-st-tab${d.mode === "sell" ? " gh-st-on" : ""}" data-mode="sell">VENDER</button></div>` +
      '<div class="gh-section gh-st-sec"><div class="gh-sec-head">' +
      (d.mode === "buy" ? "À VENDA — toque para comprar" : "SEU INVENTÁRIO — toque para vender") +
      `</div><div class="gh-st-shop">${cells}</div></div>`;
    stBody.querySelectorAll<HTMLElement>(".gh-st-tab").forEach((b) => {
      b.onclick = () => { if (b.dataset.mode !== storeMode) onStoreMode?.(b.dataset.mode as "buy" | "sell"); };
    });
    stBody.querySelectorAll<HTMLElement>(".gh-st-good").forEach((el) => {
      const g = d.goods.find((x) => x.id === el.dataset.gid);
      if (!g) return;
      // equipamento com tip → POPUP (mostra atributos + comparação + "Comprar");
      // demais (consumíveis/materiais/armas) → caixa de quantidade normal.
      if (g.tip) el.onclick = () => showItemTip(g.tip!, el.getBoundingClientRect(), () => {
        const nd = onStoreTrade?.(g.id, 1); if (nd) renderStore(nd);
      });
      else el.onclick = () => openQtyBox(g);
    });
  };

  // ---- BAÚ / ARMAZÉM: mesma linguagem visual da loja (classes gh-st-*), mas sem
  // custo — só move itens entre a mochila e o baú (guardar/retirar) ----
  const stash = document.createElement("div");
  stash.id = "gh-stash";
  stash.className = "gh-eq-hidden";
  stash.innerHTML = '<div id="gh-stash-win"><button id="gh-stash-close" title="Fechar">✕</button><div id="gh-stash-body"></div><div id="gh-stash-qty" class="gh-st-qty-hidden"></div></div>';
  root.appendChild(stash);
  const stashBody = stash.querySelector("#gh-stash-body") as HTMLElement;
  const stashQtyEl = stash.querySelector("#gh-stash-qty") as HTMLElement;
  (stash.querySelector("#gh-stash-close") as HTMLElement).addEventListener("click", (e) => {
    e.preventDefault(); stash.classList.add("gh-eq-hidden");
  });
  let stashMode: "deposit" | "withdraw" = "deposit";
  let stashQty: { g: StoreGood; qty: number; max: number } | null = null;
  const stashIcon = (g: StoreGood) => g.id === "gold"
    ? `<img class="gh-item-ico" src="${coinUrl}"/>` : goodIcon(g);
  const renderStashQty = () => {
    if (!stashQty) return;
    const { g, qty, max } = stashQty;
    const verb = stashMode === "deposit" ? "GUARDAR" : "RETIRAR";
    stashQtyEl.innerHTML =
      '<div class="gh-st-qbox">' +
      `<div class="gh-st-qtop"><div class="gh-slot gh-st-qico">${stashIcon(g)}</div>` +
      `<div class="gh-st-qinfo"><div class="gh-st-qn">${g.name}</div>` +
      `<div class="gh-st-qh">${g.single ? "CONFIRMAR" : `QUANTO DESEJA ${verb}?`}</div></div></div>` +
      (g.single ? "" :
        '<div class="gh-st-stepper"><button class="gh-st-step" data-d="-1">−</button>' +
        `<span class="gh-st-qnum">${qty}</span>` +
        '<button class="gh-st-step" data-d="1">＋</button></div>' +
        `<button class="gh-st-max">MÁX (${max})</button>`) +
      '<div class="gh-st-qbtns"><button class="gh-st-qbtn gh-st-cancel">CANCELAR</button>' +
      `<button class="gh-st-qbtn gh-st-ok">${verb}</button></div></div>`;
    stashQtyEl.querySelectorAll<HTMLElement>(".gh-st-step").forEach((b) => {
      b.onclick = () => { stashQty!.qty = Math.min(max, Math.max(1, stashQty!.qty + Number(b.dataset.d))); renderStashQty(); };
    });
    const mx = stashQtyEl.querySelector<HTMLElement>(".gh-st-max");
    if (mx) mx.onclick = () => { stashQty!.qty = max; renderStashQty(); };
    (stashQtyEl.querySelector(".gh-st-cancel") as HTMLElement).onclick = () => { stashQtyEl.classList.add("gh-st-qty-hidden"); stashQty = null; };
    (stashQtyEl.querySelector(".gh-st-ok") as HTMLElement).onclick = () => {
      const gid = stashQty!.g.id, q = stashQty!.qty;
      stashQtyEl.classList.add("gh-st-qty-hidden"); stashQty = null;
      const data = onStashMove?.(gid, q);
      if (data) renderStash(data);
    };
  };
  const openStashQtyBox = (g: StoreGood) => {
    const max = g.single ? 1 : (g.moveMax ?? g.have);
    if (max < 1) return;
    stashQty = { g, qty: 1, max };
    stashQtyEl.classList.remove("gh-st-qty-hidden");
    renderStashQty();
  };
  // BAÚ: grade compacta de slots (como o inventário do ferreiro), sem rótulos —
  // só o ícone + a contagem da pilha (teto de 99). O ouro fica no cabeçalho.
  const renderStash = (d: StashData) => {
    stashMode = d.mode;
    // itens que dá p/ mover no modo atual (mochila no GUARDAR, baú no RETIRAR),
    // fora o ouro (que vira um "slot" fixo no início da grade)
    const items = d.goods.filter((g) => g.id !== "gold");
    const cells: string[] = [];
    // slot de OURO — sempre 1º; mostra a moeda + o total (sem teto de 99)
    const gold = d.goods.find((g) => g.id === "gold");
    const goldHave = gold?.have ?? 0;
    cells.push(
      `<div class="gh-bag-slot gh-stash-cell gh-stash-gold${goldHave > 0 ? "" : " gh-stash-off"}" data-gid="gold" title="Ouro">` +
      `<img class="gh-item-ico" src="${coinUrl}"/><span class="gh-stash-badge gh-stash-goldn">${goldHave}</span></div>`,
    );
    // demais itens (empilháveis + armas), um slot cada, sem nome; a arma leva o
    // selo de reforço (+N) no canto, os empilháveis levam a contagem da pilha
    for (const g of items) {
      const badgeHtml = g.single
        ? (g.lvl ? `<span class="gh-stash-badge gh-stash-lvl">+${g.lvl}</span>` : "")
        : `<span class="gh-stash-badge">${g.have}</span>`;
      cells.push(
        `<div class="gh-bag-slot gh-stash-cell" data-gid="${g.id}" title="${g.name}">` +
        `${stashIcon(g)}${badgeHtml}</div>`,
      );
    }
    // completa a grade com slots vazios até a capacidade do baú
    const filled = cells.length;
    for (let i = filled; i < d.slots; i++) cells.push('<div class="gh-bag-slot gh-stash-cell gh-stash-empty"></div>');
    stashBody.innerHTML =
      `<div class="gh-eq-title gh-st-title"><img class="gh-st-portr" src="${d.portraitUrl ?? mercadoraUrl}" alt=""/>` +
      `<span class="gh-st-tt">${d.title ?? "Baú"}<small>${d.subtitle ?? ""}</small></span></div>` +
      '<div class="gh-st-tabs">' +
      `<button class="gh-st-tab${d.mode === "deposit" ? " gh-st-on" : ""}" data-mode="deposit">GUARDAR</button>` +
      `<button class="gh-st-tab${d.mode === "withdraw" ? " gh-st-on" : ""}" data-mode="withdraw">RETIRAR</button></div>` +
      '<div class="gh-section gh-st-sec gh-stash-sec"><div class="gh-sec-head gh-stash-head">' +
      `<span>${d.mode === "deposit" ? "SUA MOCHILA — toque para guardar" : "NO BAÚ — toque para retirar"}</span>` +
      `<span class="gh-stash-cap">${filled}/${d.slots}</span></div>` +
      `<div class="gh-bag gh-stash-grid">${cells.join("")}</div></div>`;
    stashBody.querySelectorAll<HTMLElement>(".gh-st-tab").forEach((b) => {
      b.onclick = () => { if (b.dataset.mode !== stashMode) onStashMode?.(b.dataset.mode as "deposit" | "withdraw"); };
    });
    stashBody.querySelectorAll<HTMLElement>(".gh-stash-cell[data-gid]").forEach((el) => {
      const g = d.goods.find((x) => x.id === el.dataset.gid);
      if (g) el.onclick = () => openStashQtyBox(g);
    });
  };

  // ---- BANDEJA DE CONSUMÍVEIS (usar item) — canto inf. esquerdo, acima do dpad ----
  const tray = document.createElement("div");
  tray.id = "gh-tray";
  root.appendChild(tray);
  const renderTray = (items: ConsumSlot[]) => {
    if (!items.length) { tray.innerHTML = ""; tray.style.display = "none"; return; }
    tray.style.display = "flex";
    tray.innerHTML = items.map((it) =>
      `<button class="gh-tray-slot" data-id="${it.id}" title="${it.name}">` +
      (it.iconUrl ? `<img class="gh-tray-img" src="${it.iconUrl}" alt=""/>` : `<span class="gh-tray-emo">${it.icon}</span>`) +
      `<span class="gh-tray-cnt">${it.count}</span></button>`,
    ).join("");
    tray.querySelectorAll<HTMLButtonElement>(".gh-tray-slot").forEach((b) => {
      b.addEventListener("pointerdown", (e) => { e.preventDefault(); const id = b.dataset.id; if (id) onUseItem?.(id); });
      b.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  };
  renderTray([]);

  // ---- TAVERNA: janela de descanso + bebidas + missões ----
  const tv = document.createElement("div");
  tv.id = "gh-tv";
  tv.className = "gh-eq-hidden";
  tv.innerHTML = '<div id="gh-tv-win"><button id="gh-tv-close" title="Fechar">✕</button><div id="gh-tv-body"></div></div>';
  root.appendChild(tv);
  const tvBody = tv.querySelector("#gh-tv-body") as HTMLElement;
  (tv.querySelector("#gh-tv-close") as HTMLElement).addEventListener("click", (e) => {
    e.preventDefault(); tv.classList.add("gh-eq-hidden");
  });
  // faixa lateral de status + selo/botão de ação de cada missão
  const questAccent = (q: TavernQuest): string =>
    q.status === "available" ? "gh-tv-q-new" : q.status === "ready" ? "gh-tv-q-ready"
      : q.status === "done" ? "gh-tv-q-done" : "gh-tv-q-active";
  const questRibbon = (q: TavernQuest): string => {
    if (q.status === "available") return `<span class="gh-tv-rib gh-tv-rib-new">NOVA</span>`;
    if (q.status === "ready") return `<span class="gh-tv-rib gh-tv-rib-ready">PRONTA</span>`;
    if (q.status === "done") return `<span class="gh-tv-rib gh-tv-rib-done">CONCLUÍDA</span>`;
    return `<span class="gh-tv-rib gh-tv-rib-active">EM ANDAMENTO</span>`;
  };
  const questBtn = (q: TavernQuest): string => {
    if (q.status === "available") return `<button class="gh-tv-qbtn" data-qid="${q.id}" data-act="accept">ACEITAR</button>`;
    if (q.status === "ready") return `<button class="gh-tv-qbtn gh-tv-qready" data-qid="${q.id}" data-act="turnin">ENTREGAR</button>`;
    return ""; // ativa/concluída: sem botão (o selo já comunica)
  };
  const rewardChip = (r: TavernReward): string =>
    `<span class="gh-tv-rw">` +
    (r.gold ? `<img src="${coinUrl}" alt=""/>` : r.iconUrl ? `<img src="${r.iconUrl}" alt=""/>` : "") +
    `${r.label}</span>`;
  const renderTavern = (d: TavernData) => {
    const quests = d.quests.map((q) =>
      `<div class="gh-tv-quest ${questAccent(q)}"><div class="gh-tv-accent"></div>` +
      `<div class="gh-tv-qic">${q.icon}</div>` +
      `<div class="gh-tv-qbody">` +
      `<div class="gh-tv-qtop"><span class="gh-tv-qtitle">${q.title}</span>${questRibbon(q)}</div>` +
      `<div class="gh-tv-qdesc">${q.desc}</div>` +
      (q.progress ? `<div class="gh-tv-qprog">Progresso: ${q.progress}</div>` : "") +
      `<div class="gh-tv-rewards">${q.reward.map(rewardChip).join("")}</div>` +
      `</div>` +
      (questBtn(q) ? `<div class="gh-tv-qact">${questBtn(q)}</div>` : "") +
      `</div>`,
    ).join("") || `<div class="gh-tv-empty">Nenhuma missão disponível no momento.<br>Volte mais tarde, aventureiro.</div>`;
    tvBody.innerHTML =
      `<div class="gh-eq-title gh-tv-title"><img class="gh-tv-portr" src="${taverneiroUrl}" alt=""/>` +
      `<span class="gh-tv-tt">Taverna do Javali<small>BRUNO, O TAVERNEIRO</small></span>` +
      `<span class="gh-gold gh-tv-gold"><img src="${coinUrl}" alt=""/><b>${d.gold}</b></span></div>` +
      `<div class="gh-tv-rule"><span>◆</span></div>` +
      // BEBIDAS — card compacto
      `<div class="gh-tv-block"><div class="gh-tv-h"><b>NA TORNEIRA</b><i>— bebidas</i></div>` +
      `<div class="gh-tv-drinkcard"><div class="gh-tv-dslot">` +
      `${d.drink.iconUrl ? `<img class="gh-tv-dimg" src="${d.drink.iconUrl}" alt=""/>` : `<span class="gh-tv-demo">${d.drink.icon}</span>`}` +
      `${d.drink.have > 0 ? `<span class="gh-tv-dhave">${d.drink.have}</span>` : ""}</div>` +
      `<div class="gh-tv-dinfo"><div class="gh-tv-dn">${d.drink.name}</div>` +
      `<div class="gh-tv-chip">❤ ${d.drink.desc}</div></div>` +
      `<div class="gh-tv-buywrap"><button class="gh-tv-buybtn" id="gh-tv-buy"><img src="${coinUrl}" alt=""/>${d.drink.price}</button>` +
      `<em>COMPRAR</em></div></div></div>` +
      // MISSÕES — protagonista
      `<div class="gh-tv-board"><div class="gh-tv-h gh-tv-h-c"><b>MURAL DE MISSÕES</b></div>` +
      `<div class="gh-tv-quests">${quests}</div></div>`;
    const bb = tvBody.querySelector<HTMLElement>("#gh-tv-buy");
    if (bb) bb.onclick = () => { const nd = onBuyDrink?.(d.drink.id); if (nd) renderTavern(nd); };
    tvBody.querySelectorAll<HTMLElement>(".gh-tv-qbtn").forEach((b) => {
      b.onclick = () => {
        const nd = onQuest?.(b.dataset.qid!, b.dataset.act as "accept" | "turnin");
        if (nd) renderTavern(nd);
      };
    });
  };

  // barra de CONJURAÇÃO (aparece enquanto a magia "carrega")
  const castEl = document.createElement("div");
  castEl.id = "gh-cast";
  castEl.innerHTML =
    `<span class="gh-cast-name"></span>` +
    `<span class="gh-cast-frame"><span class="gh-cast-track">` +
    `<i class="gh-cast-fill"></i></span></span>`;
  root.appendChild(castEl);
  const castName = castEl.querySelector<HTMLElement>(".gh-cast-name")!;
  const castFill = castEl.querySelector<HTMLElement>(".gh-cast-fill")!;
  let castTimer = 0;

  // camada de DANO FLUTUANTE (números que sobem e somem sobre a cena)
  const floatLayer = document.createElement("div");
  floatLayer.id = "gh-float";
  root.appendChild(floatLayer);

  // ---- botões na tela ----
  const pad = document.createElement("div");
  pad.id = "pad";
  root.appendChild(pad);

  // ícones dos botões de ação = PNGs pintados (recortados em magenta), postos POR
  // CIMA da base redonda. As setas de movimento ficam no D-pad (arte), sem ícone.
  const btnIcon = (url: string) =>
    `<img class="gh-btn-ico" src="${url}" alt="" draggable="false"/>`;

  // segurar pressionado repete a ação (o jogo ignora enquanto anima)
  const holdRepeat = (el: HTMLElement, action: Action) => {
    let iv: number | undefined;
    const start = (e: Event) => {
      e.preventDefault();
      onAction(action);
      iv = window.setInterval(() => onAction(action), MOVE_MS);
    };
    const stop = () => {
      if (iv) window.clearInterval(iv);
      iv = undefined;
    };
    el.addEventListener("pointerdown", start);
    el.addEventListener("pointerup", stop);
    el.addEventListener("pointerleave", stop);
    el.addEventListener("pointercancel", stop);
    el.addEventListener("contextmenu", (e) => e.preventDefault());
  };

  // MOVIMENTO — D-pad em CRUZ (arte única) no canto inferior ESQUERDO. A cruz é o
  // fundo; por cima ficam 4 ZONAS DE TOQUE invisíveis nos braços. cima=frente,
  // baixo=trás, esquerda/direita=virar. O braço pressionado acende (brilho).
  const move = document.createElement("div");
  move.className = "gh-cluster gh-move";
  const mkTap = (action: Action, cls: string) => {
    const z = document.createElement("button");
    z.className = "gh-dtap " + cls;
    holdRepeat(z, action);
    return z;
  };
  move.appendChild(mkTap("forward", "gh-dup"));
  move.appendChild(mkTap("back", "gh-ddown"));
  move.appendChild(mkTap("turnLeft", "gh-dleft"));
  move.appendChild(mkTap("turnRight", "gh-dright"));
  pad.appendChild(move);

  // botão de interação (não repete) — manopla
  const act = document.createElement("button");
  act.className = "gh-btn gh-act";
  act.innerHTML = btnIcon(icoActionUrl);
  const tapAct = (e: Event) => {
    e.preventDefault();
    onAction("interact");
  };
  act.addEventListener("pointerdown", tapAct);
  act.addEventListener("contextmenu", (e) => e.preventDefault());
  pad.appendChild(act);

  // botão de ataque (só aparece quando há arma equipada) — espadas cruzadas
  let atkBtn: HTMLButtonElement | null = null;
  if (weaponUrl) {
    atkBtn = document.createElement("button");
    atkBtn.className = "gh-btn gh-atk";
    atkBtn.innerHTML = btnIcon(icoAttackUrl);
    const tapAtk = (e: Event) => {
      e.preventDefault();
      onAction("attack");
    };
    atkBtn.addEventListener("pointerdown", tapAtk);
    atkBtn.addEventListener("contextmenu", (e) => e.preventDefault());
    pad.appendChild(atkBtn);
  }

  // BARRA DE AÇÃO — habilidades ATIVAS aprendidas em MEIA-LUA ao redor do botão de
  // ataque (mão direita = combate). Cada slot mostra o ícone, o custo de mana e uma
  // "varredura" de recarga por cima quando acionado.
  const actbar = document.createElement("div");
  actbar.id = "gh-actbar";
  pad.appendChild(actbar);
  // dispõe os slots num leque COMPACTO (dois arcos concêntricos de 3) ancorado no
  // botão de ataque (canto inf. direito). Fechado o bastante p/ não subir demais.
  const SLOT = 46; // px
  const ATKx = 47, ATKy = 51; // centro do botão de ataque (dist. do canto)
  const A0 = 116, A1 = 176; // faixa angular (graus) — fan fechado no quadrante sup-esq
  // posições de `count` slots UNIFORMEMENTE distribuídos na faixa [a0,a1], raio R
  const evenArc = (
    count: number, R: number, a0 = A0, a1 = A1,
  ): { right: number; bottom: number }[] => {
    const pos: { right: number; bottom: number }[] = [];
    for (let i = 0; i < count; i++) {
      const a = count === 1 ? (a0 + a1) / 2 : a0 + ((a1 - a0) * i) / (count - 1);
      const ar = (a * Math.PI) / 180;
      const rp = ATKx + R * -Math.cos(ar);
      const bp = ATKy + R * Math.sin(ar);
      pos.push({ right: Math.round(rp - SLOT / 2), bottom: Math.round(bp - SLOT / 2) });
    }
    return pos;
  };
  const arcLayout = (n: number): { right: number; bottom: number }[] => {
    if (n <= 3) return evenArc(n, 118);
    // dois arcos concêntricos alinhados (colunas radiais) — compacto e uniforme
    const inner = Math.ceil(n / 2);
    return [...evenArc(inner, 98), ...evenArc(n - inner, 150)];
  };
  const BASE_SLOTS = 6; // SEMPRE 6 slots — o jogador escolhe quais habilidades usar
  const renderActionBar = (items: ActionSkill[]) => {
    // hotbar fixa de 6: preenche com as aprendidas (as 6 primeiras) + vazios
    const total = BASE_SLOTS;
    const pos = arcLayout(total);
    let html = "";
    for (let i = 0; i < total; i++) {
      const p = pos[i] ?? { right: 47, bottom: 51 };
      const s = items[i];
      if (s) {
        html +=
          `<button class="gh-sslot" data-skill="${s.id}" title="${s.name}" ` +
          `style="right:${p.right}px;bottom:${p.bottom}px">` +
          (s.icon ? `<img src="${s.icon}" alt=""/>` : `<span class="gh-ss-x">✦</span>`) +
          `<span class="gh-ss-cool"></span>` +
          `<span class="gh-ss-cd"></span>` +
          `</button>`;
      } else {
        // slot VAZIO (placeholder) — não clicável, marca o lugar da habilidade
        html +=
          `<span class="gh-sslot gh-ss-empty" style="right:${p.right}px;bottom:${p.bottom}px">` +
          `<span class="gh-ss-rune">◈</span></span>`;
      }
    }
    actbar.innerHTML = html;
    actbar.style.display = "block"; // sempre visível
    actbar.querySelectorAll<HTMLButtonElement>(".gh-sslot[data-skill]").forEach((b) => {
      b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        const id = b.dataset.skill;
        if (id) onSkill?.(id);
      });
      b.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  };
  renderActionBar([]);

  // dica contextual (acima do botão de ação)
  const prompt = document.createElement("div");
  prompt.id = "gh-prompt";
  prompt.style.display = "none";
  pad.appendChild(prompt);

  // caixa de diálogo
  const dlg = document.createElement("div");
  dlg.id = "gh-dialogue";
  dlg.style.display = "none";
  dlg.innerHTML =
    '<img class="gh-dlg-portrait" alt="" />' +
    '<div class="gh-dlg-body">' +
    '<div class="gh-dlg-name"></div>' +
    '<div class="gh-dlg-text"></div>' +
    '<div class="gh-dlg-choices"></div>' +
    '<div class="gh-dlg-hint">toque para continuar ▸</div>' +
    "</div>";
  dlg.addEventListener("pointerdown", (e) => {
    // com escolhas na tela, o toque no fundo NÃO avança — o jogador usa os botões
    if (dlg.dataset.choices === "1") return;
    e.preventDefault();
    onAction("interact");
  });
  pad.appendChild(dlg);
  const dlgName = dlg.querySelector(".gh-dlg-name") as HTMLElement;
  const dlgText = dlg.querySelector(".gh-dlg-text") as HTMLElement;
  const dlgPortrait = dlg.querySelector(".gh-dlg-portrait") as HTMLImageElement;
  const dlgChoices = dlg.querySelector(".gh-dlg-choices") as HTMLElement;
  const dlgHint = dlg.querySelector(".gh-dlg-hint") as HTMLElement;

  injectStyle();

  return {
    setPrompt(text: string | null) {
      if (text) {
        prompt.textContent = text;
        prompt.style.display = "block";
        act.classList.add("gh-act-on");
      } else {
        prompt.style.display = "none";
        act.classList.remove("gh-act-on");
      }
    },
    showDialogue(name: string, text: string, portrait?: string | null, choices?: DialogueChoice[]) {
      dlgName.textContent = name;
      dlgText.textContent = text;
      if (portrait) {
        dlgPortrait.src = portrait;
        dlgPortrait.style.display = "block";
      } else {
        dlgPortrait.removeAttribute("src");
        dlgPortrait.style.display = "none";
      }
      // botões de escolha — só na página final. Com >2 opções vira MENU vertical
      // (estilo WoW): rótulo à esquerda + nota curta à direita, tipos com cor.
      if (choices && choices.length) {
        dlg.dataset.choices = "1";
        dlgHint.style.display = "none";
        dlgChoices.style.display = "flex";
        dlgChoices.className = "gh-dlg-choices" + (choices.length > 2 ? " gh-dlg-menu" : "");
        dlgChoices.innerHTML = choices
          .map((c) => {
            const k = c.kind ? ` gh-dlg-c-${c.kind}` : "";
            const note = c.note ? `<span class="gh-dlg-cnote">${c.note}</span>` : "";
            return `<button class="gh-dlg-choice${c.primary ? " gh-dlg-choice-on" : ""}${k}" data-cid="${c.id}">` +
              `<span class="gh-dlg-clabel">${c.label}</span>${note}</button>`;
          })
          .join("");
        dlgChoices.querySelectorAll<HTMLElement>(".gh-dlg-choice").forEach((b) => {
          b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); onDialogueChoice?.(b.dataset.cid!); };
        });
      } else {
        dlg.dataset.choices = "0";
        dlgChoices.style.display = "none";
        dlgChoices.innerHTML = "";
        dlgHint.style.display = "block";
      }
      dlg.style.display = "flex";
      prompt.style.display = "none";
    },
    hideDialogue() {
      dlg.style.display = "none";
    },
    openJournal(data: JournalData) {
      renderJournal(data);
      journal.classList.remove("gh-eq-hidden");
    },
    setHealth(frac: number) {
      const f = Math.max(0, Math.min(1, frac));
      hpFill.style.width = f * 100 + "%";
      // vermelho vivo cheio → alaranjado/escuro quando a vida cai
      hpFill.style.background =
        f > 0.5
          ? "linear-gradient(#e35d4c,#b3241a)"
          : f > 0.25
            ? "linear-gradient(#e08a2c,#9a4a10)"
            : "linear-gradient(#c23a24,#7a1610)";
    },
    setMana(frac: number) {
      const f = Math.max(0, Math.min(1, frac));
      mpFill.style.width = f * 100 + "%";
    },
    setStats(s: CharStats) {
      if (goldVal) goldVal.textContent = `${s.gold}`;
      setXp(s.level, s.xp, s.xpMax); // barra de XP fina na base da tela
      const xpFrac = s.xpMax > 0 ? Math.max(0, Math.min(1, s.xp / s.xpMax)) : 0;
      // linha de PRIMÁRIO com +/- (distribuição em jogo, 3 pontos por nível)
      const prim = (label: string, key: string, v: number, min: number) => {
        const minus = v <= min || s.points < 0 ? " disabled" : "";
        const plus = s.points <= 0 ? " disabled" : "";
        return `<div class="gh-prow"><span>${label}</span><span class="gh-pstep">` +
          `<button class="gh-pm" data-attr="${key}" data-d="-1"${minus}>−</button>` +
          `<b>${v}</b>` +
          `<button class="gh-pm" data-attr="${key}" data-d="1"${plus}>＋</button>` +
          `</span></div>`;
      };
      const sr = (label: string, val: string | number, hint = "") =>
        `<div class="gh-sr"${hint ? ` title="${hint}"` : ""}><span>${label}</span><b>${val}</b></div>`;
      const cls = CLASS_BY_ID[s.classId];
      const portrait = cls?.portrait ?? "";
      eqStats.innerHTML =
        '<div class="gh-st2">' +
          // cabeçalho: RETRATO da classe (emoldurado) + classe/nível/XP
          '<div class="gh-st2-head">' +
            (portrait ? `<div class="gh-st2-portr"><img src="${portrait}" alt=""/></div>` : "") +
            '<div class="gh-st2-id">' +
              `<div class="gh-st2-cls">${cls?.name ?? "Herói"}</div>` +
              `<div class="gh-st2-lvl">Nível <b>${s.level}</b></div>` +
              `<div class="gh-st2-xp"><i style="width:${(xpFrac * 100).toFixed(1)}%"></i></div>` +
              `<div class="gh-st2-xptxt">${s.xp} / ${s.xpMax} XP</div>` +
            "</div>" +
          "</div>" +
          // atributos primários (com +/-)
          '<div class="gh-st2-panel gh-st2-prim">' +
            `<div class="gh-st2-ph">Atributos<span class="gh-st2-pts${s.points > 0 ? " on" : ""}">${s.points} ${s.points === 1 ? "ponto" : "pontos"}</span></div>` +
            prim("Força", "str", s.str, s.strMin) +
            prim("Destreza", "dex", s.dex, s.dexMin) +
            prim("Inteligência", "int", s.int, s.intMin) +
          "</div>" +
          // secundários em 3 blocos emoldurados
          '<div class="gh-st2-secs">' +
            '<div class="gh-st2-panel gh-st2-sec"><h5>⚔️ Ofensivo</h5>' +
              sr("Atq. Físico", s.atk) + sr("Atq. Mágico", s.atkMag) +
              sr("Crítico", s.crit + "%", "Chance de acerto crítico") +
              sr("Dano Crít.", s.critDmg + "%", "Multiplicador do crítico") +
              sr("Precisão", s.precision + "%", "Acerto vs. Evasão do alvo") +
            "</div>" +
            '<div class="gh-st2-panel gh-st2-sec"><h5>🛡️ Defensivo</h5>' +
              sr("Vida", `${s.hp}/${s.hpMax}`) +
              sr("Regen.", `${s.regen}/s`, "Regeneração de vida por segundo") +
              sr("Defesa", s.def) + sr("Res. Mágica", s.magRes) +
              sr("Evasão", s.evasion + "%", "Chance de esquivar") +
            "</div>" +
            '<div class="gh-st2-panel gh-st2-sec"><h5>🔷 Recursos</h5>' +
              sr("Mana", `${s.mp}/${s.mpMax}`) + sr("Ouro", s.gold) +
            "</div>" +
          "</div>" +
        "</div>";
    },
    flashDamage() {
      dmgFx.style.animation = "none";
      void dmgFx.offsetWidth;
      dmgFx.style.animation = "gh-dmg 360ms ease-out";
    },
    swingWeapon(): number {
      // só golpeia com arma de MÃO PRINCIPAL equipada, e fora da recarga
      if (!weapon || !current || current.slot !== "main" || swinging) return -1;
      swinging = true;
      playClone(swingSnd); // whoosh do golpe
      swingTimers.forEach((t) => window.clearTimeout(t));
      swingTimers.length = 0;
      if (!canvasEl) canvasEl = root.querySelector("canvas");
      const rig = weaponRig!;

      // perfil de golpe da arma atual → poses + tempos + peso do impacto
      const st = STYLES[current.style];
      const total = st.windup + st.strike + st.recover;
      const cd = current.cooldown ?? st.cooldown; // cadência (ms)
      const impactMs = Math.round(st.windup + st.strike * 0.45); // auge do golpe
      const wf = st.windup / total;
      const hf = impactMs / total;
      const ff = (st.windup + st.strike) / total;
      const weight = st.weight;

      const T = (p: Pose) =>
        `perspective(760px) rotateY(${p.ry}deg) rotateX(${p.rx}deg) rotateZ(${p.rz}deg) translate(${p.tx}%,${p.ty}%) scale(${p.s})`;
      const sh = "drop-shadow(-6px 2px 8px rgba(0,0,0,0.45))";
      const filt = (b: number) => `${sh} blur(${b}px)`;

      // 1) a arma inteira faz o arco do golpe (uma animação com as 4 poses)
      rig.getAnimations?.().forEach((a) => a.cancel());
      rig.animate(
        [
          { transform: T(REST), filter: filt(0), offset: 0 },
          { transform: T(st.wind), filter: filt(0), offset: wf },
          { transform: T(st.hit), filter: filt(Math.min(3, 1.6 * weight)), offset: hf },
          { transform: T(st.follow), filter: filt(0.3), offset: ff },
          { transform: T(REST), filter: filt(0), offset: 1 },
        ],
        { duration: total, easing: "ease-out", fill: "both" },
      );

      // 1b) GIRO DE PAPEL: a PRÓPRIA imagem gira no seu eixo vertical (pivô no
      // centro dela, perspectiva própria) — o PNG fica fininho como papel e a
      // cabeça "vira de frente". Independente do movimento do rig (machado/marreta).
      if (st.imgSpin && weapon) {
        weapon.getAnimations?.().forEach((a) => a.cancel());
        const sp = st.imgSpin;
        const iT = (deg: number) => `perspective(620px) rotateY(${deg}deg)`;
        weapon.animate(
          [
            { transform: iT(0), offset: 0 },
            { transform: iT(sp.wind), offset: wf },
            { transform: iT(sp.hit), offset: hf },
            { transform: iT(sp.follow), offset: ff },
            { transform: iT(0), offset: 1 },
          ],
          { duration: total, easing: "ease-out", fill: "both" },
        );
      }

      // 2) no AUGE do golpe: rastro + clarão + onda de choque + tranco de câmera.
      // O visual muda por FAMÍLIA de golpe:
      //   streak    = estocada: risco reto (adaga/rapieira)
      //   arc       = corte: arco fino luminoso (espada/cajado)
      //   arcBig    = machadada: arco GROSSO + onda de choque (machado/maça)
      //   smashwave = pancada rombuda: SEM lâmina, só peso — smear largo,
      //               onda de choque grande, clarão terroso, tremor duplo forte
      //               (espadão/marreta)
      const heavy = st.fx === "arcBig" || st.fx === "smashwave";
      const blunt = st.fx === "smashwave";
      swingTimers.push(
        window.setTimeout(() => {
          if (slashFx) {
            slashFx.getAnimations?.().forEach((a) => a.cancel());
            if (st.fx === "streak") {
              slashFx.animate(
                [
                  { opacity: 0, transform: "rotate(-4deg) scaleX(0.35) scaleY(0.5)" },
                  { opacity: 0.9, transform: "rotate(-4deg) scaleX(1.15) scaleY(0.62)", offset: 0.3 },
                  { opacity: 0, transform: "rotate(-4deg) scaleX(1.35) scaleY(0.66)" },
                ],
                { duration: 190, easing: "ease-out" },
              );
            } else if (blunt) {
              // pancada: em vez de fio luminoso, um borrão largo e mais opaco
              slashFx.animate(
                [
                  { opacity: 0, transform: "rotate(-8deg) scale(0.9)" },
                  { opacity: 0.5, transform: "rotate(-8deg) scale(1.5) translateY(6%)", offset: 0.28 },
                  { opacity: 0, transform: "rotate(-8deg) scale(1.75) translateY(10%)" },
                ],
                { duration: 230, easing: "ease-out" },
              );
            } else {
              const sc = st.fx === "arcBig" ? 1.34 : 1; // machadada = arco mais grosso
              slashFx.animate(
                [
                  { opacity: 0, transform: `rotate(-8deg) scale(${0.7 * sc})` },
                  { opacity: 0.98, transform: `rotate(-8deg) scale(${1.0 * sc})`, offset: 0.26 },
                  { opacity: 0, transform: `rotate(-8deg) scale(${1.14 * sc})` },
                ],
                { duration: 220, easing: "ease-out" },
              );
            }
          }
          // onda de choque (só golpes pesados): anel expandindo no ponto do baque
          if (shockFx && heavy) {
            shockFx.getAnimations?.().forEach((a) => a.cancel());
            const big = blunt ? 1.55 : 1.05;
            shockFx.animate(
              [
                { opacity: 0, transform: "translate(-50%,-50%) scale(0.2)" },
                { opacity: blunt ? 0.95 : 0.8, transform: `translate(-50%,-50%) scale(${0.72 * big})`, offset: 0.22 },
                { opacity: 0, transform: `translate(-50%,-50%) scale(${1.4 * big})` },
              ],
              { duration: Math.round(240 + weight * 80), easing: "ease-out" },
            );
          }
          if (impactFx) {
            impactFx.getAnimations?.().forEach((a) => a.cancel());
            const peak = Math.max(0.85, 0.7 + 0.42 * (weight - 1) + 0.42);
            impactFx.animate(
              [
                { opacity: 0, transform: "scale(0.4)" },
                { opacity: Math.min(1, 0.66 + 0.16 * weight), transform: `scale(${peak})`, offset: 0.26 },
                { opacity: 0, transform: `scale(${1.5 * (0.9 + 0.18 * weight)})` },
              ],
              { duration: Math.round(190 + weight * 60), easing: "ease-out" },
            );
          }
          // pancada rombuda: um lampejo curto na tela inteira reforça o baque
          if (screenFx && blunt) {
            screenFx.getAnimations?.().forEach((a) => a.cancel());
            screenFx.animate(
              [
                { opacity: 0 },
                { opacity: 0.55, offset: 0.18 },
                { opacity: 0 },
              ],
              { duration: 220, easing: "ease-out" },
            );
          }
          if (canvasEl) {
            canvasEl.getAnimations?.().forEach((a) => a.cancel());
            const k = weight;
            if (blunt) {
              // tremor DUPLO (dois solavancos) — sensação de terra tremendo
              canvasEl.animate(
                [
                  { transform: "translate(0,0) scale(1)" },
                  { transform: `translate(${-1.1 * k}%,${1.3 * k}%) scale(${1 + 0.024 * k}) rotate(${-0.6 * k}deg)`, offset: 0.14 },
                  { transform: `translate(${0.7 * k}%,${-0.6 * k}%) scale(${1 + 0.012 * k}) rotate(${0.4 * k}deg)`, offset: 0.34 },
                  { transform: `translate(${-0.5 * k}%,${0.5 * k}%) scale(${1 + 0.006 * k}) rotate(${-0.2 * k}deg)`, offset: 0.56 },
                  { transform: "translate(0,0) scale(1)" },
                ],
                { duration: Math.round(280 + weight * 55), easing: "ease-out" },
              );
            } else {
              canvasEl.animate(
                [
                  { transform: "translate(0,0) scale(1)" },
                  { transform: `translate(${-0.8 * k}%,${1.0 * k}%) scale(${1 + 0.018 * k}) rotate(${-0.45 * k}deg)`, offset: 0.18 },
                  { transform: `translate(${0.45 * k}%,${-0.35 * k}%) scale(${1 + 0.005 * k}) rotate(${0.18 * k}deg)`, offset: 0.46 },
                  { transform: "translate(0,0) scale(1)" },
                ],
                { duration: Math.round(200 + weight * 45), easing: "ease-out" },
              );
            }
          }
        }, impactMs),
      );

      // 3) cadência: só libera o próximo golpe depois do cooldown da arma
      swingTimers.push(window.setTimeout(() => (swinging = false), cd));
      return impactMs;
    },
    setInventory(ids: string[]) {
      bagSlots.forEach((slot, i) => {
        const id = ids[i];
        slot.onclick = null;
        if (id && catalog[id]) {
          slot.dataset.wid = id;
          slot.innerHTML = `<img class="gh-item-ico" src="${catalog[id].url}" alt="" title="${catalog[id].name}"/>`;
          slot.onclick = () => this.equipWeapon(id);
        } else {
          delete slot.dataset.wid;
          slot.innerHTML = "";
        }
      });
    },
    // renderiza a mochila (armas + armaduras) com molduras de raridade + as peças
    // equipadas nos slots do boneco (clicáveis p/ desequipar).
    setEquip(data: EquipUIData) {
      hideItip();
      // MOCHILA — clicar ABRE o popup (com comparação); o botão do popup equipa
      bagSlots.forEach((slot, i) => {
        const e = data.bag[i];
        slot.onclick = null;
        slot.className = "gh-bag-slot";
        delete slot.dataset.wid; delete slot.dataset.uid;
        if (!e) { slot.innerHTML = ""; return; }
        slot.classList.add("gh-rar-" + (e.rarity ?? "comum"));
        slot.innerHTML = `<img class="gh-item-ico" src="${e.icon}" alt=""/>`;
        if (e.kind === "weapon") slot.dataset.wid = e.id; else slot.dataset.uid = e.id;
        slot.onclick = () => showItemTip(e.tip, slot.getBoundingClientRect(), () => {
          if (e.kind === "weapon") this.equipWeapon(e.id); else onEquipArmor?.(e.id);
        });
      });
      // BONECO: peças equipadas — clicar abre o popup (botão: Desequipar)
      for (const key of ["head", "chest", "hands", "feet", "belt"]) {
        const el = eq.querySelector(`.gh-slot[data-slot="${key}"]`) as HTMLElement | null;
        if (!el) continue;
        const a = data.armor[key];
        el.className = "gh-slot";
        el.onclick = null;
        if (a) {
          el.classList.add("gh-slot-eq", "gh-rar-" + a.rarity);
          el.innerHTML = `<img class="gh-item-ico" src="${a.icon}" alt=""/>`;
          el.onclick = () => showItemTip(a.tip, el.getBoundingClientRect(), () => onUnequipArmor?.(key));
        } else {
          el.innerHTML = "";
        }
      }
    },
    showPickup(tip: ItemTip, onTake: () => void) { showPickup(tip, onTake); },
    equipWeapon(id: string) {
      const w = catalog[id];
      if (!w) return;
      const putIcon = (slotKey: string) => {
        const el = eq.querySelector(`.gh-slot[data-slot="${slotKey}"]`) as HTMLElement | null;
        if (el) el.innerHTML = `<img class="gh-item-ico" src="${w.url}" alt="" title="${w.name}"/>`;
      };
      if (w.slot === "off") {
        putIcon("off");
      } else {
        current = w;
        // encerra qualquer golpe/giro em andamento e volta ao repouso
        swinging = false;
        swingTimers.forEach((t) => window.clearTimeout(t));
        swingTimers.length = 0;
        weaponRig?.getAnimations?.().forEach((a) => a.cancel());
        weapon?.getAnimations?.().forEach((a) => a.cancel());
        weapon!.style.transform = "";
        weapon!.src = w.url;
        if (weaponRig) {
          weaponRig.style.height = `${(62 * w.scale).toFixed(1)}vh`;
          weaponRig.style.maxHeight = `${Math.round(640 * w.scale)}px`;
        }
        root.classList.toggle("gh-wpn-arcane", w.tint === "arcane");
        putIcon("main");
        onEquip?.(w);
      }
      // realça (pulsa) o slot da mochila do item selecionado
      bagSlots.forEach((s) => s.classList.remove("gh-slot-pulse"));
      const src = eq.querySelector(`.gh-bag-slot[data-wid="${id}"]`) as HTMLElement | null;
      if (src) {
        src.classList.remove("gh-slot-pulse");
        void src.offsetWidth;
        src.classList.add("gh-slot-pulse");
      }
    },
    openSmith(data: SmithData) {
      renderSmith(data);
      sm.classList.remove("gh-eq-hidden");
    },
    closeSmith() {
      sm.classList.add("gh-eq-hidden");
    },
    openStore(data: StoreData) {
      stQty.classList.add("gh-st-qty-hidden");
      renderStore(data);
      st.classList.remove("gh-eq-hidden");
    },
    closeStore() {
      st.classList.add("gh-eq-hidden");
    },
    openStash(data: StashData) {
      stashQtyEl.classList.add("gh-st-qty-hidden");
      renderStash(data);
      stash.classList.remove("gh-eq-hidden");
    },
    closeStash() {
      stash.classList.add("gh-eq-hidden");
    },
    playSfx(name) {
      const a = SFX[name];
      if (a) playClone(a);
    },
    fadeOut(ms) { return fadeOut(ms); },
    fadeIn(ms) { fadeIn(ms); },
    wakeEyelids(vh) { wakeEyelids(vh); },
    hudConceal() { root.classList.add("gh-preplay"); root.classList.remove("gh-revealing"); },
    hudReveal() {
      if (!root.classList.contains("gh-preplay")) return;
      root.classList.add("gh-revealing");   // dispara o fade de entrada
      root.classList.remove("gh-preplay");
      window.setTimeout(() => root.classList.remove("gh-revealing"), 700);
    },
    setTracker(data: TrackerData | null) { setTracker(data); },
    setConsumables(items: ConsumSlot[]) {
      renderTray(items);
    },
    openTavern(data: TavernData) {
      renderTavern(data);
      tv.classList.remove("gh-eq-hidden");
    },
    closeTavern() {
      tv.classList.add("gh-eq-hidden");
    },
    updateMinimap(s: MinimapState) {
      lastMini = s;
      drawSmall(s); // minimapa pequeno (zoom ao redor do herói)
      if (bigOpen()) drawBig(s); // se o mapa grande estiver aberto, atualiza também
    },
    setSkillInfo(classId: string, points: number) {
      skillClassId = classId;
      skillPointsTotal = points;
      renderSkills();
    },
    setActionBar(items: ActionSkill[]) {
      renderActionBar(items);
    },
    setSkillCooldown(id: string, frac: number, secs: number) {
      const slot = actbar.querySelector<HTMLElement>(`.gh-sslot[data-skill="${id}"]`);
      if (!slot) return;
      const cool = slot.querySelector<HTMLElement>(".gh-ss-cool");
      const cd = slot.querySelector<HTMLElement>(".gh-ss-cd");
      if (frac <= 0) {
        if (cool) { cool.style.opacity = "0"; cool.style.setProperty("--gh-cd", "0deg"); }
        if (cd) cd.textContent = "";
        return;
      }
      // escurece e vai "preenchendo" (o setor escuro encolhe no sentido horário)
      if (cool) {
        cool.style.opacity = "1";
        cool.style.setProperty("--gh-cd", (Math.max(0, Math.min(1, frac)) * 360).toFixed(1) + "deg");
      }
      if (cd) cd.textContent = String(secs); // segundos restantes no centro
    },
    skillManaFloat(id: string, cost: number) {
      const slot = actbar.querySelector<HTMLElement>(`.gh-sslot[data-skill="${id}"]`);
      if (!slot) return;
      const r = slot.getBoundingClientRect();
      // sobe a partir do topo do slot (não fica escondido atrás do ícone)
      this.floatText(r.left + r.width / 2, r.top - 2, `-${cost}`, "mana");
    },
    floatText(x: number, y: number, text: string, kind) {
      const el = document.createElement("div");
      el.className = "gh-float-n gh-fl-" + kind;
      el.textContent = text;
      // leve dispersão horizontal p/ números não se sobreporem
      const jitter = ((Math.abs(x * 7 + y * 13) % 24) - 12) | 0;
      el.style.left = x + jitter + "px";
      el.style.top = y + "px";
      floatLayer.appendChild(el);
      window.setTimeout(() => el.remove(), 1000);
    },
    toast(msg: string) {
      toastEl.textContent = msg;
      toastEl.style.animation = "none";
      void toastEl.offsetWidth;
      toastEl.style.animation = "gh-toast 1.8s ease-out";
    },
    levelUp(level: number) { showLevelUp(level); },
    castBar(name: string, ms: number) {
      if (castTimer) window.clearTimeout(castTimer);
      castName.textContent = name;
      castEl.classList.add("gh-cast-on");
      // reinicia a animação de preenchimento (0 → 100% em `ms`)
      castFill.style.transition = "none";
      castFill.style.width = "0%";
      void castFill.offsetWidth; // força reflow p/ o transition valer
      castFill.style.transition = `width ${ms}ms linear`;
      castFill.style.width = "100%";
      castTimer = window.setTimeout(() => {
        castEl.classList.remove("gh-cast-on");
        castTimer = 0;
      }, ms);
    },
    cancelCast() {
      if (castTimer) window.clearTimeout(castTimer);
      castTimer = 0;
      castEl.classList.remove("gh-cast-on");
    },
    setClock(phase: number, daylight: number) {
      // órbita: sol no TOPO ao meio-dia (fase 0.25). ângulo cresce com o tempo.
      const theta = (phase - 0.25) * Math.PI * 2;
      const R = 33; // % do raio da órbita
      const place = (el: HTMLElement, ang: number) => {
        const x = Math.sin(ang), y = -Math.cos(ang); // ang=0 → topo
        el.style.left = 50 + x * R + "%";
        el.style.top = 50 + y * R + "%";
      };
      place(sunEl, theta);
      place(moonEl, theta + Math.PI);
      const d = Math.max(0, Math.min(1, daylight));
      sunEl.style.opacity = (0.28 + 0.72 * d).toFixed(3);
      moonEl.style.opacity = (0.28 + 0.72 * (1 - d)).toFixed(3);
      sunEl.style.filter = `drop-shadow(0 0 ${(3 + 7 * d).toFixed(1)}px rgba(240,180,70,${(0.5 * d + 0.15).toFixed(2)}))`;
      moonEl.style.filter = `drop-shadow(0 0 ${(3 + 7 * (1 - d)).toFixed(1)}px rgba(150,190,255,${(0.5 * (1 - d) + 0.15).toFixed(2)}))`;
    },
  };
}

function injectStyle() {
  if (document.getElementById("gh-style")) return;
  const s = document.createElement("style");
  s.id = "gh-style";
  s.textContent = `
  /* rig da arma: base à direita, punho no canto inferior. A rotação 3D do golpe
     é aplicada AQUI, e a espada + o rastro de corte (filhos) giram juntos, então
     o corte segue a lâmina de forma travada. perspective() habilita rotação 3D
     (rotateX/Y) — é o que dá a PROFUNDIDADE. */
  #gh-weapon-rig {
    position:fixed; right:12%; bottom:-4%;
    height:62vh; max-height:640px;
    pointer-events:none; z-index:8;
    transform-origin:72% 90%;
    transform:perspective(760px) rotateX(0deg) rotateY(0deg) rotateZ(16deg) translate(0,2%) scale(1); /* REPOUSO */
    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45));
    will-change:transform, filter;
    backface-visibility:hidden;
  }
  #gh-weapon {
    display:block; height:100%; width:auto;
    pointer-events:none;
    /* pivô no CENTRO da imagem: o "giro de papel" (rotateY da própria arte) roda
       em torno da linha vertical central dela, não do punho */
    transform-origin:50% 50%;
    backface-visibility:hidden;
  }
  /* sprite de golpe: já vem na diagonal com o rastro pintado, então tem base
     e pivô próprios (punho no canto inferior-direito), escondido até o golpe */
  #gh-weapon-atk {
    position:fixed; right:6%; bottom:-6%;
    height:72vh; max-height:720px; width:auto;
    pointer-events:none; z-index:9; opacity:0;
    transform-origin:82% 86%;
    transform:translate(0,0) rotate(0deg) scale(1);
    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45));
    will-change:transform, opacity;
  }
  /* O golpe é em 3 fases encadeadas (cada uma começa onde a anterior parou,
     com fill 'forwards'), disparadas por timers no mesmo relógio do corte, do
     clarão e do tranco de câmera. A PROFUNDIDADE vem de 3 coisas juntas:
       (1) rotateY/rotateX 3D — a lâmina gira no espaço em direção à câmera;
       (2) escala: recua encolhendo (longe) e avança crescendo além de 1 (perto);
       (3) borrão de velocidade (blur) no pico do golpe.
     Poses-chave (perspective fixa em 760px):
       REPOUSO   rotY 0   rotX 0    rotZ 16   scale 1     (blur 0)
       ARMAR     rotY -26 rotX 10   rotZ 34   scale 0.82  (recua/afasta)
       ESTOCADA  rotY 30  rotX -14  rotZ -46  scale 1.42  (avança/aproxima, blur)
       SEGUIR    rotY 10  rotX -4   rotZ -26  scale 1.08 */
  @keyframes gh-windup {
    0%   { transform:perspective(760px) rotateY(0deg)   rotateX(0deg)  rotateZ(16deg) translate(0,2%)  scale(1);    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)); }
    100% { transform:perspective(760px) rotateY(-26deg) rotateX(10deg) rotateZ(34deg) translate(11%,9%) scale(0.82); filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)); }
  }
  @keyframes gh-slashonly { /* avança pra dentro da cena, borrando no auge */
    0%   { transform:perspective(760px) rotateY(-26deg) rotateX(10deg)  rotateZ(34deg)  translate(11%,9%)   scale(0.82); filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)) blur(0px); }
    45%  { transform:perspective(760px) rotateY(30deg)  rotateX(-14deg) rotateZ(-46deg) translate(-30%,-8%) scale(1.42); filter:drop-shadow(-10px 4px 12px rgba(0,0,0,0.5)) blur(2.4px); }
    72%  { transform:perspective(760px) rotateY(12deg)  rotateX(-6deg)  rotateZ(-30deg) translate(-18%,4%)  scale(1.14); filter:drop-shadow(-8px 3px 10px rgba(0,0,0,0.48)) blur(0.4px); }
    100% { transform:perspective(760px) rotateY(10deg)  rotateX(-4deg)  rotateZ(-26deg) translate(-14%,6%)  scale(1.08); filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)) blur(0px); }
  }
  @keyframes gh-slashpose { /* 2º sprite (pose já diagonal): estocada rápida */
    0%   { transform:translate(12%,9%)   rotate(10deg)  scale(0.9);  opacity:0.85; }
    40%  { transform:translate(-2%,-2%)  rotate(-4deg)  scale(1.14); opacity:1;    }
    100% { transform:translate(-14%,-7%) rotate(-13deg) scale(1.05); opacity:0.85; }
  }
  @keyframes gh-recover {
    0%   { transform:perspective(760px) rotateY(10deg) rotateX(-4deg) rotateZ(-26deg) translate(-14%,6%) scale(1.08); }
    100% { transform:perspective(760px) rotateY(0deg)  rotateX(0deg)  rotateZ(16deg)  translate(0,2%)    scale(1);    }
  }
  /* tranco de câmera no impacto: o canvas dá um solavanco curto (recua girando
     de leve e volta) — vende o baque do golpe e reforça a profundidade */
  @keyframes gh-kick {
    0%   { transform:translate(0,0)      scale(1);     }
    18%  { transform:translate(-0.9%,1.1%) scale(1.022) rotate(-0.5deg); }
    46%  { transform:translate(0.5%,-0.4%) scale(1.006) rotate(0.2deg);  }
    100% { transform:translate(0,0)      scale(1);     }
  }
  /* clarão radial de impacto no ponto onde a lâmina corta */
  #gh-impact {
    position:fixed; right:26%; top:26%;
    width:30vh; height:30vh; max-width:330px; max-height:330px;
    pointer-events:none; z-index:9; opacity:0;
    border-radius:50%;
    background:radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(210,235,255,0.55) 32%, rgba(180,220,255,0) 70%);
    mix-blend-mode:screen;
  }
  /* onda de choque: anel que estoura no ponto do baque (golpes pesados) */
  #gh-shock {
    position:fixed; left:52%; top:44%;
    width:34vh; height:34vh; max-width:380px; max-height:380px;
    transform:translate(-50%,-50%) scale(0.2);
    pointer-events:none; z-index:9; opacity:0; border-radius:50%;
    border:0.8vh solid rgba(255,238,205,0.92);
    box-shadow:0 0 26px rgba(255,222,170,0.6), inset 0 0 22px rgba(255,222,170,0.45);
    mix-blend-mode:screen;
  }
  /* lampejo curto na tela inteira no impacto rombudo */
  #gh-screenflash {
    position:fixed; inset:0; pointer-events:none; z-index:7; opacity:0;
    background:radial-gradient(circle at 52% 44%, rgba(255,246,225,0.6), rgba(255,240,210,0) 62%);
    mix-blend-mode:screen;
  }
  .gh-wpn-arcane #gh-shock {
    border-color:rgba(214,186,255,0.92);
    box-shadow:0 0 26px rgba(186,150,255,0.6), inset 0 0 22px rgba(186,150,255,0.45);
  }
  @keyframes gh-flash {
    0%   { opacity:0;   transform:scale(0.4); }
    26%  { opacity:0.9; transform:scale(1);   }
    100% { opacity:0;   transform:scale(1.5); }
  }
  /* rastro de corte: fica DENTRO do rig, encostado no fio da lâmina, e por isso
     gira junto com a espada (segue a lâmina). A animação dele é só de opacidade
     (pisca no golpe) + um leve "abrir" — a posição vem do rig. */
  #gh-slash {
    position:absolute;
    left:-118%; top:-16%; width:250%; height:66%;
    pointer-events:none; z-index:2; opacity:0;
    transform-origin:78% 88%; transform:rotate(-8deg) scale(1);
    filter:drop-shadow(0 0 7px rgba(180,225,255,0.9));
  }
  #gh-slash svg { width:100%; height:100%; display:block; }
  @keyframes gh-slash-fade {
    0%   { opacity:0;    transform:rotate(-8deg) scale(0.7); }
    26%  { opacity:0.95; transform:rotate(-8deg) scale(1);   }
    100% { opacity:0;    transform:rotate(-8deg) scale(1.12); }
  }
  /* arma arcana (cajado/orbe): rastro e clarão em tom roxo em vez de branco-azul */
  .gh-wpn-arcane #gh-slash {
    filter:drop-shadow(0 0 8px rgba(196,150,255,0.9)) hue-rotate(212deg) saturate(1.35);
  }
  .gh-wpn-arcane #gh-impact {
    background:radial-gradient(circle, rgba(232,214,255,0.95) 0%, rgba(186,150,255,0.55) 32%, rgba(160,120,255,0) 70%);
  }
  /* placa de status (vida + mana) — arte com encaixes preenchidos por código */
  #gh-hud {
    position:fixed; left:12px; top:10px; z-index:11; pointer-events:none;
    width:min(230px,40vw); aspect-ratio:793 / 336;
    background:url(${hudPlateUrl}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 2px 5px rgba(0,0,0,.55));
  }
  .gh-hud-bar {
    position:absolute; left:19.2%; width:72.2%; overflow:hidden;
    border-radius:999px;
  }
  .gh-hud-hp { top:22.9%; height:17.6%; }
  .gh-hud-mp { top:56.9%; height:17.3%; }
  /* MAPA (canto superior direito): moldura 9-slice + canvas do minimapa no miolo */
  #gh-map {
    position:fixed; right:12px; top:10px; z-index:11; pointer-events:none;
    width:min(118px,27vw); aspect-ratio:1; box-sizing:border-box;
    border:clamp(13px,3.6vw,20px) solid transparent;
    border-image:url(${mapFrameUrl}) 130 repeat;
    filter:drop-shadow(0 2px 6px rgba(0,0,0,.55));
  }
  #gh-map-canvas {
    position:absolute; inset:0; width:100%; height:100%;
    border-radius:2px; image-rendering:auto;
    pointer-events:auto; cursor:pointer; /* clicar no mapa expande */
  }
  /* botão de expandir o mapa (canto inferior direito do minimapa) */
  #gh-map-expand {
    position:absolute; right:2px; bottom:2px; z-index:3; pointer-events:auto;
    width:22px; height:22px; border-radius:6px; cursor:pointer; padding:0;
    display:flex; align-items:center; justify-content:center;
    color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:1.5px solid rgba(201,162,39,.6);
    box-shadow:0 1px 3px rgba(0,0,0,.6);
  }
  #gh-map-expand:hover { color:#fff; border-color:#f4c847; }
  #gh-map-expand:active { transform:scale(.9); }
  /* RASTREADOR DE MISSÃO: painel logo abaixo do minimapa (canto sup. direito) */
  #gh-tracker {
    position:fixed; right:12px; z-index:11; pointer-events:none;
    top:calc(10px + min(118px,27vw) + 6px);
    width:min(198px,46vw); box-sizing:border-box;
    padding:7px 9px 8px; border-radius:8px;
    background:linear-gradient(180deg, rgba(14,12,9,.86), rgba(10,9,7,.8));
    border:1px solid rgba(201,162,39,.42);
    box-shadow:0 2px 8px rgba(0,0,0,.5), inset 0 0 0 1px rgba(0,0,0,.35);
    color:#e9dcbe; font-family:"Trebuchet MS",sans-serif;
  }
  #gh-tracker .gh-tk-head { display:flex; align-items:center; gap:6px; }
  #gh-tracker .gh-tk-title {
    flex:1 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
    font-family:"Cinzel",serif; font-weight:700; font-size:12.5px; color:#f2d891;
    text-shadow:0 1px 2px #000; letter-spacing:.3px;
  }
  #gh-tracker .gh-tk-guide {
    flex:0 0 auto; pointer-events:auto; cursor:pointer; width:22px; height:20px; padding:0;
    display:flex; align-items:center; justify-content:center; border-radius:5px;
    color:#ffd66e; background:rgba(60,44,16,.55); border:1px solid rgba(201,162,39,.55);
    transition:color .12s, border-color .12s, opacity .12s, transform .08s;
  }
  #gh-tracker .gh-tk-guide:hover { color:#fff; border-color:#f4c847; }
  #gh-tracker .gh-tk-guide:active { transform:scale(.9); }
  /* guia DESLIGADO: estrela apagada/vazada */
  #gh-tracker .gh-tk-guide.gh-tk-guide-off { color:#8b7f5f; background:rgba(30,26,18,.5); opacity:.75; }
  #gh-tracker .gh-tk-obj {
    margin-top:3px; font-size:11.5px; line-height:1.32; color:#d7c9a3;
    text-shadow:0 1px 2px #000;
  }
  /* --- ABERTURA: esconder/revelar o HUD (só a visão do jogador no início) --- */
  /* IMPORTANTE: NÃO escondemos o #pad inteiro — a caixa de diálogo (#gh-dialogue)
     e o prompt são filhos dele. Escondendo só os CONTROLES (d-pad/ação/barra), a
     fala da Hedda continua visível e clicável durante a abertura. */
  .gh-preplay #gh-hud, .gh-preplay #gh-map, .gh-preplay #gh-clock,
  .gh-preplay #gh-tracker, .gh-preplay #gh-actbar, .gh-preplay #gh-tray,
  .gh-preplay #gh-char-btn, .gh-preplay #gh-opt-btn, .gh-preplay #gh-journal-btn,
  .gh-preplay #gh-weapon-rig, .gh-preplay #gh-weapon-atk, .gh-preplay #gh-xpbar,
  .gh-preplay .gh-move, .gh-preplay .gh-act, .gh-preplay .gh-atk {
    opacity:0 !important; pointer-events:none !important;
  }
  /* as zonas de toque do d-pad têm pointer-events próprio — desliga o subárvore */
  .gh-preplay .gh-move * { pointer-events:none !important; }
  .gh-revealing #gh-hud, .gh-revealing #gh-map, .gh-revealing #gh-clock,
  .gh-revealing #gh-tracker, .gh-revealing #gh-actbar, .gh-revealing #gh-tray,
  .gh-revealing #gh-char-btn, .gh-revealing #gh-opt-btn, .gh-revealing #gh-journal-btn,
  .gh-revealing #gh-weapon-rig, .gh-revealing #gh-weapon-atk, .gh-revealing #gh-xpbar,
  .gh-revealing .gh-move, .gh-revealing .gh-act, .gh-revealing .gh-atk {
    animation:gh-hud-in .55s ease both;
  }
  @keyframes gh-hud-in { from { opacity:0; } to { opacity:1; } }
  /* mapa GRANDE (overlay estilo PoE/Diablo) */
  #gh-bigmap {
    position:fixed; inset:0; z-index:19; pointer-events:auto;
    display:flex; align-items:center; justify-content:center;
    background:rgba(4,5,9,.72);
  }
  #gh-bigmap.gh-bigmap-hidden { display:none; }
  #gh-bigmap-win {
    position:relative; width:min(88vw,88vh); aspect-ratio:1; box-sizing:border-box;
    border:clamp(20px,6vw,42px) solid transparent;
    border-image:url(${mapFrameUrl}) 130 repeat;
    filter:drop-shadow(0 6px 22px rgba(0,0,0,.7));
  }
  #gh-bigmap-canvas { position:absolute; inset:0; width:100%; height:100%; }
  #gh-bigmap-close {
    position:absolute; top:calc(-8px - clamp(20px,6vw,42px)); right:0; z-index:3; cursor:pointer;
    width:34px; height:34px; border-radius:8px; font-size:17px; line-height:1;
    color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:2px solid rgba(201,162,39,.6); display:flex; align-items:center; justify-content:center;
  }
  #gh-bigmap-close:hover { color:#fff; border-color:#f4c847; }
  /* RELÓGIO dia/noite: só um ANEL FINO desenhado em CSS (sem PNG de fundo), no
     topo-centro colado no limite da tela. Sol e lua orbitam na linha do anel. */
  #gh-clock {
    position:fixed; z-index:12; pointer-events:none;
    top:8px; right:calc(12px + min(118px,27vw) + 8px);
    width:38px; height:38px; border-radius:50%;
    border:1.5px solid rgba(201,162,39,.6);
    background:radial-gradient(circle, rgba(8,9,14,.24), rgba(8,9,14,.08) 72%, rgba(8,9,14,0));
    box-shadow:0 1px 4px rgba(0,0,0,.45);
  }
  #gh-clock .gh-sun, #gh-clock .gh-moon {
    position:absolute; width:46%; height:46%; object-fit:contain;
    transform:translate(-50%,-50%); left:50%; top:50%;
    transition:opacity .5s linear, filter .5s linear;
  }
  .gh-hud-fill {
    height:100%; width:100%;
    transition:width .28s ease, background .28s ease;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.3), inset 0 -3px 5px rgba(0,0,0,.4);
  }
  .gh-hud-hp-fill { background:linear-gradient(#e35d4c,#b3241a); }
  .gh-hud-mp-fill { background:linear-gradient(#57b0e8,#1c5fb3); }
  /* BARRA DE XP: fininha, colada na base da tela, de ponta a ponta */
  #gh-xpbar {
    position:fixed; left:0; right:0; bottom:0; height:6px; z-index:13; pointer-events:none;
    background:rgba(8,6,4,.7); border-top:1px solid rgba(201,162,39,.32);
    box-shadow:0 -1px 4px rgba(0,0,0,.45);
  }
  #gh-xpbar-fill {
    height:100%; width:0%;
    background:linear-gradient(90deg,#a9741f,#f4d074 62%,#fff2cc);
    box-shadow:0 0 8px rgba(244,208,116,.55);
    transition:width .35s ease;
  }
  /* "Nv X" pequeno, centralizado logo acima da barra */
  #gh-xpbar-lv {
    position:absolute; left:50%; bottom:8px; transform:translateX(-50%);
    font-family:"Cinzel",serif; font-weight:700; font-size:11px; letter-spacing:.5px;
    color:#f2d891; white-space:nowrap;
    text-shadow:0 1px 3px #000, 0 0 7px rgba(0,0,0,.9);
  }

  /* botão de abrir a janela de personagem — no lado ESQUERDO, logo abaixo da placa
     de vida/mana (o canto superior direito fica livre p/ o mapa). */
  #gh-char-btn {
    position:fixed; left:14px; top:calc(20px + min(230px, 40vw) * 0.424); z-index:12; pointer-events:auto;
    width:52px; height:52px; border-radius:50%; cursor:pointer;
    background:url(${btnBaseUrl}) no-repeat center / 100% 100%;
    border:none; padding:0;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.55));
    display:flex; align-items:center; justify-content:center;
  }
  .gh-char-ico {
    width:58%; height:58%; object-fit:contain; pointer-events:none;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.7));
  }
  #gh-char-btn:active { transform:scale(.94); filter:brightness(1.25) drop-shadow(0 1px 4px rgba(0,0,0,.6)); }
  /* botão de OPÇÕES (engrenagem, abaixo do botão de personagem) */
  #gh-opt-btn {
    position:fixed; left:14px; top:calc(20px + min(230px, 40vw) * 0.424 + 60px); z-index:12; pointer-events:auto;
    width:52px; height:52px; border-radius:50%; cursor:pointer; padding:0; border:none;
    background:url(${btnBaseUrl}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.55)); display:flex; align-items:center; justify-content:center;
  }
  .gh-opt-gear { font-size:26px; line-height:1; color:#2a1e0e; filter:drop-shadow(0 1px 1px rgba(255,235,180,.4)); }
  #gh-opt-btn:active { transform:scale(.94); filter:brightness(1.15); }
  /* botão do DIÁRIO DE MISSÕES (pergaminho, abaixo da engrenagem) */
  #gh-journal-btn {
    position:fixed; left:14px; top:calc(20px + min(230px, 40vw) * 0.424 + 120px); z-index:12; pointer-events:auto;
    width:52px; height:52px; border-radius:50%; cursor:pointer; padding:0; border:none;
    background:url(${btnBaseUrl}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.55)); display:flex; align-items:center; justify-content:center;
  }
  .gh-journal-ico { font-size:24px; line-height:1; filter:drop-shadow(0 1px 1px rgba(0,0,0,.5)); }
  #gh-journal-btn:active { transform:scale(.94); filter:brightness(1.15); }
  /* janela do DIÁRIO */
  #gh-journal { position:fixed; inset:0; z-index:23; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.62); pointer-events:auto; }
  #gh-journal.gh-eq-hidden { display:none; }
  #gh-journal-win { position:relative; box-sizing:border-box; width:min(560px,94vw); max-height:88vh; overflow-y:auto;
    border:clamp(20px,3vh,30px) solid transparent; border-image:url(${eqFrameUrl}) 90 fill; filter:drop-shadow(0 6px 20px rgba(0,0,0,.6)); padding:2px 10px 14px; color:#e8dcc0; }
  #gh-journal-close { position:absolute; right:8px; top:8px; z-index:9; width:34px; height:34px; border-radius:9px; cursor:pointer;
    font-size:16px; line-height:1; background:rgba(20,16,11,.85); color:#e8d9b0; border:2px solid rgba(232,178,74,.6); box-shadow:0 1px 4px #000; }
  .gh-jr-title { text-align:center; font-family:"Cinzel",serif; font-weight:800; font-size:clamp(18px,2.8vh,22px); letter-spacing:3px; color:#f2e4bf; text-shadow:0 2px 5px #000; margin:2px 0 10px; }
  .gh-jr-sec { margin-bottom:14px; }
  .gh-jr-sh { font-family:"Cinzel",serif; font-weight:700; font-size:15px; letter-spacing:1.5px; color:#e6b45a; border-bottom:1px solid rgba(201,162,39,.35); padding-bottom:5px; margin-bottom:9px; }
  .gh-jr-sh small { font-family:"MedievalSharp",serif; font-weight:400; letter-spacing:2px; color:#a8966a; font-size:11px; margin-left:6px; }
  .gh-jr-list { display:flex; flex-direction:column; gap:8px; }
  .gh-jr-q { display:flex; gap:11px; align-items:flex-start; padding:9px 11px; border-radius:10px; background:rgba(20,15,9,.5); border:1px solid rgba(201,162,39,.22); }
  .gh-jr-q.gh-jr-done { opacity:.62; }
  .gh-jr-q.gh-jr-active { background:rgba(46,36,16,.6); border-color:rgba(230,180,90,.55); }
  .gh-jr-q.gh-jr-locked { opacity:.5; }
  .gh-jr-ico { font-size:26px; line-height:1.1; flex:0 0 auto; width:30px; text-align:center; }
  .gh-jr-txt { flex:1; min-width:0; }
  .gh-jr-h { font-family:"Cinzel",serif; font-weight:700; font-size:14px; color:#f2e4bf; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .gh-jr-badge { font-family:"MedievalSharp",serif; font-weight:400; font-size:10px; letter-spacing:1px; padding:1px 7px; border-radius:6px; }
  .gh-jr-b-done { background:rgba(120,150,110,.3); color:#bcd7ac; }
  .gh-jr-b-active { background:rgba(230,180,90,.28); color:#f2d79a; }
  .gh-jr-b-available { background:rgba(120,150,200,.28); color:#bcd0ea; }
  .gh-jr-b-locked { background:rgba(120,120,120,.25); color:#bbb; }
  .gh-jr-d { font-size:12.5px; line-height:1.4; color:#cdbf9c; margin-top:3px; }
  .gh-jr-obj { font-size:12.5px; line-height:1.35; color:#f2d79a; margin-top:5px; font-weight:600; }
  .gh-jr-empty { font-size:13px; color:#a8966a; padding:8px 4px; }
  /* janela de OPÇÕES */
  #gh-opt { position:fixed; inset:0; z-index:23; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.62); pointer-events:auto; }
  #gh-opt.gh-eq-hidden { display:none; }
  #gh-opt-win { position:relative; box-sizing:border-box; width:min(420px,92vw); max-height:90vh; overflow-y:auto;
    border:clamp(20px,3vh,30px) solid transparent; border-image:url(${eqFrameUrl}) 90 fill; filter:drop-shadow(0 6px 20px rgba(0,0,0,.6)); padding:2px 6px 10px; }
  #gh-opt-close { position:absolute; right:8px; top:8px; z-index:9; width:34px; height:34px; border-radius:9px; cursor:pointer;
    font-size:16px; line-height:1; background:rgba(20,16,11,.85); color:#e8d9b0; border:2px solid rgba(232,178,74,.6); box-shadow:0 1px 4px #000; }
  .gh-opt-title { text-align:center; font-family:"Cinzel",serif; font-weight:800; font-size:clamp(18px,2.8vh,22px); letter-spacing:3px;
    color:#f6e7c2; text-shadow:0 2px 6px #000; padding:6px 40px 10px; }
  .gh-opt-sec { border:clamp(12px,1.9vh,15px) solid transparent; border-image:url(${eqContainerUrl}) 88 fill; padding:4% 6% 6%; }
  .gh-opt-sh { text-align:center; font-family:"Cinzel",serif; font-weight:700; font-size:clamp(12px,1.8vh,14px); color:#e8b24a;
    letter-spacing:2px; text-shadow:0 1px 3px #000; margin-bottom:6%; }
  .gh-opt-row { display:flex; align-items:center; gap:12px; margin:5% 0; }
  .gh-opt-row label { flex:0 0 42%; font-family:"MedievalSharp",serif; font-size:clamp(12px,1.8vh,14px); color:#e8dcc0; }
  .gh-opt-val { flex:0 0 44px; text-align:right; font-family:"Cinzel",serif; font-weight:700; font-size:clamp(12px,1.8vh,14px); color:#f4d074; }
  .gh-opt-slider { flex:1; -webkit-appearance:none; appearance:none; height:7px; border-radius:5px; cursor:pointer;
    background:linear-gradient(#3a2c16,#241a0d); box-shadow:inset 0 0 0 1px rgba(201,162,39,.35); outline:none; }
  .gh-opt-slider::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:19px; height:19px; border-radius:50%;
    background:radial-gradient(circle at 40% 35%, #f6df9a, #c9922a); border:1px solid #8a6a1e; box-shadow:0 1px 3px #000, inset 0 1px 1px rgba(255,255,255,.45); cursor:pointer; }
  .gh-opt-slider::-moz-range-thumb { width:19px; height:19px; border-radius:50%;
    background:radial-gradient(circle at 40% 35%, #f6df9a, #c9922a); border:1px solid #8a6a1e; box-shadow:0 1px 3px #000; cursor:pointer; }
  .gh-opt-rowmute { justify-content:space-between; }
  .gh-opt-rowmute label { flex:0 0 auto; }
  .gh-opt-toggle { width:54px; height:28px; border-radius:16px; position:relative; cursor:pointer; border:none; padding:0;
    background:#241a0d; box-shadow:inset 0 0 0 1.5px rgba(201,162,39,.4); transition:background .15s; }
  .gh-opt-toggle.gh-opt-on { background:#8a2c1e; box-shadow:inset 0 0 0 1.5px rgba(232,120,90,.65); }
  .gh-opt-knob { position:absolute; top:3px; left:3px; width:22px; height:22px; border-radius:50%; transition:left .15s;
    background:radial-gradient(circle at 40% 35%, #f4ecd2, #c9a24f); box-shadow:0 1px 3px #000; }
  .gh-opt-toggle.gh-opt-on .gh-opt-knob { left:29px; }
  .gh-opt-mutedsec .gh-opt-slider, .gh-opt-mutedsec .gh-opt-val,
  .gh-opt-mutedsec .gh-opt-row:not(.gh-opt-rowmute) label { opacity:.45; }
  /* janela de equipamentos */
  #gh-eq {
    position:fixed; inset:0; z-index:20; pointer-events:auto;
    display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,.58);
  }
  #gh-eq.gh-eq-hidden { display:none; }
  /* a moldura vira 9-slice (border-image): cantos fixos, miolo estica — assim a
     janela pode ter QUALQUER tamanho (janela no desktop, tela cheia no celular)
     sem deformar a borda ornamentada. */
  #gh-eq-win {
    position:relative; box-sizing:border-box;
    width:min(58vh,440px); height:min(90vh,780px);
    border:clamp(22px,3.4vh,34px) solid transparent;
    border-image:url(${eqFrameUrl}) 90 fill;
    filter:drop-shadow(0 6px 20px rgba(0,0,0,.6));
  }
  #gh-char-btn { }
  /* celular: inventário em TELA CHEIA (mais espaço, sem rolar) */
  @media (max-width:640px) {
    #gh-eq { padding:0; }
    #gh-eq-win {
      width:100vw; height:100vh; height:100dvh;
      border-width:clamp(15px,2.6vh,24px);
    }
  }
  #gh-eq-close {
    position:absolute; right:6px; top:6px; z-index:2; width:34px; height:34px;
    border-radius:8px; cursor:pointer; font-size:16px; line-height:1;
    background:rgba(20,16,11,.66); color:#e8d9b0; border:2px solid rgba(201,162,39,.55);
  }
  /* ---- FERREIRO (janela de aprimoramento) ---- */
  #gh-sm { position:fixed; inset:0; z-index:21; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.6); pointer-events:auto; }
  #gh-sm.gh-eq-hidden { display:none; }
  #gh-sm-win {
    position:relative; box-sizing:border-box; width:min(58vh,440px); height:min(94vh,820px);
    border:clamp(22px,3.4vh,34px) solid transparent; border-image:url(${eqFrameUrl}) 90 fill;
    filter:drop-shadow(0 6px 20px rgba(0,0,0,.6));
  }
  @media (max-width:640px){ #gh-sm-win { width:100vw; height:100dvh; border-width:clamp(15px,2.6vh,24px); } }
  #gh-sm-close { position:absolute; right:6px; top:6px; z-index:2; width:34px; height:34px; border-radius:8px; cursor:pointer; font-size:16px; background:rgba(20,16,11,.66); color:#e8d9b0; border:2px solid rgba(201,162,39,.55); }
  /* TUDO numa janela só, SEM rolagem (mobile mostra os 20 slots de uma vez) */
  #gh-sm-body { width:100%; height:100%; display:flex; flex-direction:column; gap:1.4%; color:#e8dcc0; overflow:hidden; }
  .gh-sm-title { flex:0 0 auto; position:relative; padding:0 8px; }
  .gh-sm-sec { flex:0 0 auto; padding:2% 3.5% 2.6%; }
  .gh-sm-forge { display:flex; align-items:flex-start; justify-content:center; gap:2%; }
  .gh-sm-col { display:flex; flex-direction:column; align-items:center; gap:3px; width:42%; }
  .gh-sm-lbl { font-size:clamp(10px,1.5vh,12px); letter-spacing:1px; color:#b39a63; font-family:"Cinzel",serif; }
  /* slot da forja num WRAPPER que NÃO corta → o selo +N fica fora, inteiro */
  .gh-sm-slotwrap { position:relative; width:clamp(58px,10vh,84px); height:clamp(58px,10vh,84px); overflow:visible; }
  .gh-sm-slot { width:100%; height:100%; }
  .gh-sm-tier { position:absolute; top:-9px; right:-11px; z-index:3; font-family:"Cinzel",serif; font-size:clamp(11px,1.7vh,14px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:7px; padding:1px 7px; border:1px solid #6b4f18; box-shadow:0 1px 4px #000; }
  .gh-sm-tier-up { background:linear-gradient(#8fe07a,#3f9a2e); border-color:#215016; box-shadow:0 0 8px rgba(120,240,110,.6); }
  .gh-sm-res { box-shadow:0 0 16px 3px rgba(244,216,115,.5); border-radius:8px; }
  .gh-sm-res .gh-item-ico { filter:drop-shadow(0 0 8px rgba(255,224,130,.9)); }
  .gh-sm-nm { font-size:clamp(12px,1.7vh,14px); color:#efe2c0; text-align:center; line-height:1.12; min-height:2.3em; margin-top:6px; }
  .gh-sm-nm.gh-up { color:#f6ead0; }
  .gh-sm-dmg { font-size:clamp(11px,1.6vh,13px); color:#c7b789; }
  .gh-sm-dmg .gh-g { color:#8fdf7a; font-weight:700; }
  /* NO LUGAR DA SETINHA: a espada do loading, apagada; enche esq→dir ao aprimorar.
     Efeito rico: frente derretida, brasas subindo, brilho e lâmina esquentando.
     margin-top centraliza a espada na ALTURA dos dois slots. --fk (0→1) = progresso. */
  .gh-sm-anvil { position:relative; align-self:flex-start; flex:0 0 auto; overflow:visible;
    width:clamp(44px,8.6vh,72px); aspect-ratio:332/81;
    margin-top:calc(clamp(10px,1.5vh,12px) + 3px + (clamp(58px,10vh,84px) - clamp(44px,8.6vh,72px) * 0.244) / 2); }
  .gh-sm-sword-base { position:relative; z-index:1; width:100%; height:100%; display:block; filter:brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000); transition:filter .3s; }
  .gh-sm-sword-fill { position:absolute; left:0; top:0; bottom:0; width:0%; overflow:hidden; z-index:2; }
  .gh-sm-sword-lava {
    position:absolute; left:0; top:0; height:100%; width:clamp(44px,8.6vh,72px);
    -webkit-mask:url(${loadSwordUrl}) left center / 100% 100% no-repeat;
    mask:url(${loadSwordUrl}) left center / 100% 100% no-repeat;
    background:
      radial-gradient(55% 150% at 20% 30%, rgba(255,248,200,.75), transparent 55%),
      radial-gradient(48% 160% at 55% 72%, rgba(255,160,50,.72), transparent 60%),
      radial-gradient(42% 150% at 84% 40%, rgba(255,110,26,.68), transparent 62%),
      linear-gradient(90deg,#5c1604 0,#c23a0c 30%,#f4700f 56%,#ffb23e 78%,#ffe487 92%,#fff8d6 100%);
    background-size:170% 210%,200% 240%,220% 200%,100% 100%; background-repeat:no-repeat;
  }
  /* frente incandescente que viaja com o nível de preenchimento (borda direita) */
  .gh-sm-front { position:absolute; top:0; bottom:0; right:0; width:9px; opacity:0; pointer-events:none;
    background:linear-gradient(90deg, transparent, rgba(255,196,80,.85) 45%, #fff7d6);
    filter:blur(1.5px); }
  /* bloom aditivo sobre a lâmina inteira, cresce com o progresso */
  .gh-sm-sword-glow { position:absolute; inset:0; z-index:3; width:100%; height:100%; pointer-events:none;
    opacity:0; mix-blend-mode:screen;
    filter:brightness(1.7) sepia(1) saturate(6) hue-rotate(-18deg) drop-shadow(0 0 6px rgba(255,150,40,.9)); }
  /* brasas subindo da lâmina */
  .gh-sm-embers { position:absolute; inset:0; z-index:4; pointer-events:none; overflow:visible; opacity:0; }
  .gh-sm-embers i { position:absolute; bottom:34%; width:3px; height:3px; border-radius:50%;
    background:radial-gradient(circle, #fff3c4, #ff8a2b 60%, transparent); opacity:0;
    filter:drop-shadow(0 0 3px rgba(255,150,40,.95)); }
  .gh-sm-embers i:nth-child(1){ left:10%; } .gh-sm-embers i:nth-child(2){ left:26%; }
  .gh-sm-embers i:nth-child(3){ left:42%; } .gh-sm-embers i:nth-child(4){ left:58%; }
  .gh-sm-embers i:nth-child(5){ left:74%; } .gh-sm-embers i:nth-child(6){ left:88%; }
  /* ---- estados ---- */
  .gh-sm-anvil.gh-forging { animation:gh-smpulse 1.1s ease-in-out infinite;
    filter:drop-shadow(0 0 calc(4px + var(--fk,0) * 22px) rgba(255,150,50, calc(.35 + var(--fk,0) * .6)))
           drop-shadow(0 0 calc(2px + var(--fk,0) * 7px) rgba(255,238,150,.95)); }
  .gh-sm-anvil.gh-forging .gh-sm-sword-lava { animation:gh-smlava 1.8s ease-in-out infinite; }
  .gh-sm-anvil.gh-forging .gh-sm-front { opacity:1; }
  .gh-sm-anvil.gh-forging .gh-sm-sword-glow { opacity:calc(var(--fk,0) * .55); }
  .gh-sm-anvil.gh-forging .gh-sm-embers { opacity:1; }
  .gh-sm-anvil.gh-forging .gh-sm-embers i { animation:gh-ember 1.3s ease-out infinite; }
  .gh-sm-embers i:nth-child(1){ animation-delay:0s; } .gh-sm-embers i:nth-child(2){ animation-delay:.5s; }
  .gh-sm-embers i:nth-child(3){ animation-delay:.9s; } .gh-sm-embers i:nth-child(4){ animation-delay:.3s; }
  .gh-sm-embers i:nth-child(5){ animation-delay:1.1s; } .gh-sm-embers i:nth-child(6){ animation-delay:.7s; }
  .gh-sm-anvil.gh-forge-ok { animation:gh-smflash .8s ease-out 1;
    filter:drop-shadow(0 0 20px rgba(255,180,70,1)) drop-shadow(0 0 8px rgba(255,244,170,1)); }
  .gh-sm-anvil.gh-forge-ok .gh-sm-sword-base { filter:brightness(1.05) saturate(1.3) drop-shadow(0 0 9px rgba(255,206,110,.95)); }
  .gh-sm-anvil.gh-forge-fail { animation:gh-smshake .45s ease-in-out 1; }
  @keyframes gh-smlava {
    0%   { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
    50%  { background-position:52% 70%, 40% 30%, 76% 60%, 0 0; }
    100% { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
  }
  @keyframes gh-ember {
    0%   { transform:translate(0,0) scale(.5); opacity:0; }
    18%  { opacity:1; }
    100% { transform:translate(4px,-24px) scale(1.15); opacity:0; }
  }
  @keyframes gh-smpulse { 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.05); } }
  @keyframes gh-smflash { 0%{ transform:scale(1.2); filter:brightness(1.9) drop-shadow(0 0 32px #fff); } 100%{ transform:scale(1); } }
  @keyframes gh-smshake { 0%,100%{ transform:translateX(0); } 20%{ transform:translateX(-3px); } 60%{ transform:translateX(3px); } }
  .gh-sm-mats-h { text-align:center; font-size:clamp(11px,1.5vh,12px); color:#b39a63; letter-spacing:1px; margin:2.6% 0 1.8%; font-family:"Cinzel",serif; border-top:1px solid rgba(201,162,39,.28); padding-top:2.4%; }
  .gh-sm-mats { display:flex; justify-content:center; gap:3%; }
  .gh-sm-mat { width:23%; display:flex; flex-direction:column; align-items:center; gap:2px; }
  .gh-sm-mslot { width:clamp(40px,6.8vh,54px); height:clamp(40px,6.8vh,54px); display:flex; align-items:center; justify-content:center; border:8px solid transparent; border-image:url(${eqSlotUrl}) 89 fill; font-size:clamp(19px,3vh,25px); }
  .gh-sm-mslot img { width:62%; height:62%; }
  /* números FORA do slot: "precisa/tem" (verde ou vermelho) */
  .gh-sm-mnum { font-size:clamp(13px,1.9vh,16px); font-weight:700; font-family:"Cinzel",serif; line-height:1; margin-top:1px; }
  .gh-sm-mhave { font-size:clamp(9px,1.35vh,11px); font-weight:400; color:#a89468; }
  .gh-ok { color:#8fdf7a; } .gh-no { color:#e17b6b; }
  .gh-sm-cap { font-size:clamp(9px,1.25vh,11px); color:#a89468; text-align:center; line-height:1.05; }
  /* BOTÃO = a placa "APRIMORAR" (btn_base), igual ao resto da HUD */
  .gh-sm-btn { display:block; margin:2.8% auto 0.4%; width:78%; max-width:280px; min-height:clamp(42px,6.6vh,52px); cursor:pointer;
    font-family:"Cinzel",serif; font-weight:700; font-size:clamp(15px,2.2vh,19px); letter-spacing:2px; color:#12100a;
    border:clamp(12px,1.9vh,15px) solid transparent; border-image:url(${btnBaseUrl}) 40 fill; background:transparent;
    text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-sm-btn:active { filter:brightness(1.16); transform:scale(.97); }
  .gh-sm-btn.gh-sm-dim { filter:grayscale(.72) brightness(.6); cursor:default; font-size:clamp(11px,1.7vh,13px); letter-spacing:1px; }
  .gh-sm-btn.gh-sm-busy { pointer-events:none; filter:brightness(1.12); }
  .gh-sm-max, .gh-sm-empty { text-align:center; color:#c7b789; padding:6% 4%; font-size:clamp(12px,1.7vh,14px); }
  /* INVENTÁRIO (20 slots, 5 col). Células QUADRADAS de tamanho FIXO (--cell) em
     linha E coluna — não depende de aspect-ratio/flex (que quebrava em alguns
     aparelhos deixando as células "esticadas"). As separações vêm só do "gap"
     dourado. Seletor composto .gh-bag.gh-sm-bag p/ vencer o .gh-bag padrão. */
  .gh-sm-sec-inv { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:flex-start; }
  /* A grade (5×4) escala como UM bloco de proporção 5:4 p/ caber inteira no
     espaço disponível — TODOS os 20 slots sempre visíveis, sem cortar, e as
     células ficam quadradas em qualquer aparelho (largura OU altura manda). */
  .gh-bag.gh-sm-bag {
    grid-template-columns:repeat(5,1fr); grid-template-rows:repeat(4,1fr);
    aspect-ratio:5/4; flex:0 1 auto; min-height:0; min-width:0;
    max-width:100%; max-height:100%; width:auto; height:auto;
    align-self:center; margin-block:auto;
    gap:3px; background:rgba(212,175,55,.7); border:2px solid rgba(212,175,55,.6); }
  .gh-bag.gh-sm-bag .gh-sm-cell { aspect-ratio:auto; width:auto; height:auto; min-width:0; min-height:0; cursor:pointer; }
  .gh-sm-badge { position:absolute; right:2px; bottom:1px; font-family:"Cinzel",serif; font-size:clamp(9px,1.35vh,12px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:5px; padding:0 4px; line-height:1.25; box-shadow:0 1px 2px #000; }
  .gh-sm-sel { background:rgba(40,32,16,.95); box-shadow:inset 0 0 0 2px #f4d873, 0 0 12px 2px rgba(244,216,115,.7); }
  /* LETREIRO garrafal SUCESSO!/FALHOU! após a forja (aparece breve e some) */
  #gh-sm-flash { position:absolute; inset:0; z-index:12; display:flex; align-items:center; justify-content:center;
    pointer-events:none; opacity:0; font-family:"Cinzel",serif; font-weight:700; letter-spacing:2px;
    font-size:clamp(30px,7.6vh,54px); text-transform:uppercase; text-align:center; white-space:nowrap;
    overflow:hidden; -webkit-text-stroke:1.5px rgba(0,0,0,.55); }
  #gh-sm-flash.gh-flash-show { animation:gh-flash-pop 1.6s cubic-bezier(.18,1.3,.32,1) 1; }
  #gh-sm-flash.gh-flash-ok { color:#93ec7c; text-shadow:0 0 24px rgba(120,240,110,.95), 0 0 8px rgba(200,255,180,.9), 0 4px 8px #000; }
  #gh-sm-flash.gh-flash-fail { color:#f56a55; text-shadow:0 0 24px rgba(240,70,50,.95), 0 0 8px rgba(255,150,130,.85), 0 4px 8px #000; }
  @keyframes gh-flash-pop {
    0%   { opacity:0; transform:scale(.35) rotate(-7deg); }
    14%  { opacity:1; transform:scale(1.22) rotate(-2deg); }
    28%  { transform:scale(.96) rotate(0deg); }
    40%  { transform:scale(1.02); }
    72%  { opacity:1; transform:scale(1); }
    100% { opacity:0; transform:scale(1.08); }
  }
  /* ---- MERCADOR (comprar/vender + caixa de quantidade) ---- */
  #gh-st { position:fixed; inset:0; z-index:21; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.6); pointer-events:auto; }
  #gh-st.gh-eq-hidden { display:none; }
  #gh-st-win { position:relative; box-sizing:border-box; width:min(60vh,460px); height:min(94vh,820px);
    border:clamp(22px,3.4vh,34px) solid transparent; border-image:url(${eqFrameUrl}) 90 fill; filter:drop-shadow(0 6px 20px rgba(0,0,0,.6)); }
  @media (max-width:640px){ #gh-st-win { width:100vw; height:100dvh; border-width:clamp(15px,2.6vh,24px); } }
  #gh-st-close { position:absolute; right:10px; top:10px; z-index:9; width:36px; height:36px; border-radius:9px; cursor:pointer;
    font-size:17px; line-height:1; background:rgba(20,16,11,.85); color:#e8d9b0; border:2px solid rgba(201,162,39,.6); box-shadow:0 1px 4px #000; }
  #gh-st-body { width:100%; height:100%; display:flex; flex-direction:column; gap:1.6%; color:#e8dcc0; overflow:hidden; }
  /* BAÚ: reaproveita todo o interior gh-st-*; só os ids externos são próprios */
  #gh-stash { position:fixed; inset:0; z-index:21; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.6); pointer-events:auto; }
  #gh-stash.gh-eq-hidden { display:none; }
  #gh-stash-win { position:relative; box-sizing:border-box; width:min(60vh,460px); height:min(94vh,820px);
    border:clamp(22px,3.4vh,34px) solid transparent; border-image:url(${eqFrameUrl}) 90 fill; filter:drop-shadow(0 6px 20px rgba(0,0,0,.6)); }
  @media (max-width:640px){ #gh-stash-win { width:100vw; height:100dvh; border-width:clamp(15px,2.6vh,24px); } }
  #gh-stash-close { position:absolute; right:10px; top:10px; z-index:9; width:36px; height:36px; border-radius:9px; cursor:pointer;
    font-size:17px; line-height:1; background:rgba(20,16,11,.85); color:#e8d9b0; border:2px solid rgba(201,162,39,.6); box-shadow:0 1px 4px #000; }
  #gh-stash-body { width:100%; height:100%; display:flex; flex-direction:column; gap:1.6%; color:#e8dcc0; overflow:hidden; }
  #gh-stash-qty { position:absolute; inset:0; z-index:8; display:flex; align-items:center; justify-content:center; background:rgba(6,4,2,.72); }
  #gh-stash-qty.gh-st-qty-hidden { display:none; }
  /* BAÚ — grade compacta de slots (espaçoso: mais slots que a mochila, em
     escala menor), rolável quando cheia. Cabeçalho mostra a lotação. */
  .gh-stash-sec { padding:2% 3.5% 3%; }
  .gh-stash-head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .gh-stash-cap { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(10px,1.5vh,12px); color:#d8bd72; letter-spacing:1px; flex:0 0 auto; }
  .gh-bag.gh-stash-grid {
    grid-template-columns:repeat(5,1fr); grid-auto-rows:1fr; gap:5px;
    flex:1 1 auto; min-height:0; overflow-y:auto; overflow-x:hidden; align-content:start;
    padding:6px; background:rgba(20,15,9,.55); border:2px solid rgba(201,162,39,.4);
    border-radius:8px; overscroll-behavior:contain; }
  .gh-stash-cell { position:relative; aspect-ratio:1; width:auto; height:auto; min-width:0; min-height:0;
    display:flex; align-items:center; justify-content:center; cursor:default; }
  .gh-stash-cell[data-gid] { cursor:pointer; }
  .gh-stash-cell[data-gid]:hover { background:rgba(40,32,16,.9); }
  .gh-stash-cell[data-gid]:active { filter:brightness(1.16); }
  .gh-stash-empty { background:rgba(8,6,3,.5); box-shadow:inset 0 0 0 1px rgba(201,162,39,.12); }
  .gh-stash-cell .gh-item-ico { width:82%; height:82%; object-fit:contain; }
  .gh-stash-cell .gh-st-emo { font-size:clamp(18px,3.4vh,26px); line-height:1; }
  .gh-stash-badge { position:absolute; right:2px; bottom:1px; font-family:"Cinzel",serif; font-weight:700;
    font-size:clamp(9px,1.35vh,12px); color:#fff; text-shadow:0 1px 2px #000,0 0 3px #000; pointer-events:none; }
  .gh-stash-lvl { color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:5px; padding:0 4px; line-height:1.25; text-shadow:none; box-shadow:0 1px 2px #000; }
  .gh-stash-gold { background:rgba(48,38,14,.55); box-shadow:inset 0 0 0 1px rgba(201,162,39,.5); }
  .gh-stash-goldn { right:3px; bottom:2px; color:#f4d873; font-size:clamp(9px,1.4vh,12px); }
  .gh-stash-off { opacity:.4; }
  .gh-st-title { display:flex; align-items:center; gap:10px; flex:0 0 auto; padding:0 46px 0 2px; }
  .gh-st-portr { width:clamp(38px,6vh,50px); height:clamp(38px,6vh,50px); border-radius:9px; border:2px solid rgba(201,162,39,.6);
    background:#1a130c; object-fit:cover; object-position:50% 20%; box-shadow:inset 0 0 10px #000; flex:0 0 auto; }
  .gh-st-tt { flex:1; text-align:center; font-family:"Cinzel",serif; font-weight:700; font-size:clamp(17px,2.6vh,23px);
    letter-spacing:2px; color:#f2e4bf; text-shadow:0 2px 5px #000; line-height:1.05; }
  .gh-st-tt small { display:block; font-family:"MedievalSharp",serif; font-weight:400; font-size:clamp(9px,1.3vh,11px); color:#b39a63; letter-spacing:3px; margin-top:1px; }
  .gh-gold.gh-st-gold { position:static; transform:none; flex:0 0 auto; font-size:clamp(13px,2vh,16px); }
  .gh-st-tabs { display:flex; gap:8px; justify-content:center; flex:0 0 auto; }
  .gh-st-tab { flex:1; max-width:170px; min-height:clamp(34px,5vh,42px); cursor:pointer; font-family:"Cinzel",serif; font-weight:700;
    font-size:clamp(13px,2vh,16px); letter-spacing:2px; color:#c9b478; border:clamp(10px,1.6vh,12px) solid transparent;
    border-image:url(${btnBaseUrl}) 40 fill; background:transparent; filter:grayscale(.55) brightness(.7); }
  .gh-st-tab.gh-st-on { color:#12100a; filter:none; text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-st-sec { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; padding:2% 3.5% 3%; }
  .gh-st-shop { flex:1 1 auto; min-height:0; overflow-y:auto; overflow-x:hidden; display:grid; grid-template-columns:repeat(3,1fr);
    gap:8px; align-content:start; padding-right:2px; overscroll-behavior:contain; }
  .gh-st-good { display:flex; flex-direction:column; align-items:center; gap:2px; cursor:pointer; }
  .gh-st-gslot { width:100%; aspect-ratio:1; position:relative; }
  .gh-st-emo { font-size:clamp(22px,4.4vh,34px); line-height:1; }
  .gh-st-cnt { position:absolute; right:2px; bottom:1px; font-family:"Cinzel",serif; font-size:clamp(9px,1.4vh,12px); font-weight:700; color:#fff; text-shadow:0 1px 2px #000,0 0 3px #000; }
  .gh-st-gname { font-size:clamp(9px,1.4vh,11px); color:#efe2c0; text-align:center; line-height:1.05; min-height:2.1em; }
  .gh-st-gprice { display:flex; align-items:center; gap:3px; font-family:"Cinzel",serif; font-size:clamp(11px,1.7vh,13px); color:#f4d873; font-weight:700; }
  .gh-st-gprice img { width:13px; height:13px; }
  .gh-st-good:active .gh-st-gslot { filter:brightness(1.16); }
  .gh-st-empty { grid-column:1/-1; text-align:center; color:#c7b789; padding:14% 6%; font-size:clamp(13px,1.9vh,15px); }
  #gh-st-qty { position:absolute; inset:0; z-index:8; display:flex; align-items:center; justify-content:center; background:rgba(6,4,2,.72); }
  #gh-st-qty.gh-st-qty-hidden { display:none; }
  .gh-st-qbox { width:min(90%,320px); padding:6% 6%; border:clamp(20px,3vh,26px) solid transparent; border-image:url(${eqContainerUrl}) 88 fill;
    display:flex; flex-direction:column; align-items:center; gap:4%; }
  .gh-st-qtop { display:flex; align-items:center; gap:10px; width:100%; }
  .gh-st-qico { width:clamp(48px,8vh,60px); height:clamp(48px,8vh,60px); flex:0 0 auto; }
  .gh-st-qinfo { flex:1; min-width:0; }
  .gh-st-qn { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(14px,2.1vh,16px); color:#f2e4bf; }
  .gh-st-qu { display:flex; align-items:center; gap:4px; font-size:clamp(10px,1.5vh,12px); color:#b39a63; margin-top:2px; }
  .gh-st-qu img { width:12px; height:12px; }
  .gh-st-qh { font-family:"Cinzel",serif; font-size:clamp(10px,1.5vh,12px); color:#c9b478; letter-spacing:1px; margin-top:4px; }
  .gh-st-stepper { display:flex; align-items:center; gap:14px; }
  .gh-st-step { width:clamp(38px,6.4vh,44px); height:clamp(38px,6.4vh,44px); border-radius:9px; cursor:pointer;
    font-size:clamp(22px,3.6vh,26px); font-weight:700; color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:2px solid rgba(201,162,39,.55); box-shadow:0 1px 3px #000; display:flex; align-items:center; justify-content:center; }
  .gh-st-qnum { font-family:"Cinzel",serif; font-size:clamp(26px,5vh,32px); font-weight:700; color:#f7ecc9; min-width:2ch; text-align:center; text-shadow:0 2px 4px #000; }
  .gh-st-max { font-family:"Cinzel",serif; font-size:clamp(10px,1.5vh,12px); letter-spacing:1px; color:#e6d3a0; cursor:pointer;
    padding:4px 14px; border-radius:6px; background:rgba(30,24,14,.85); border:1px solid rgba(201,162,39,.5); }
  .gh-st-total { display:flex; align-items:center; justify-content:center; gap:6px; font-family:"Cinzel",serif;
    font-size:clamp(16px,2.6vh,19px); color:#f4d873; font-weight:700; border-top:1px solid rgba(201,162,39,.28); padding-top:4%; width:100%; }
  .gh-st-total img { width:18px; height:18px; }
  .gh-st-x { color:#b39a63; font-size:clamp(12px,1.7vh,14px); font-weight:400; }
  .gh-st-qbtns { display:flex; gap:10px; width:100%; }
  .gh-st-qbtn { flex:1; min-height:clamp(40px,6vh,46px); cursor:pointer; font-family:"Cinzel",serif; font-weight:700;
    font-size:clamp(13px,2vh,15px); letter-spacing:1px; color:#12100a; border:clamp(11px,1.7vh,13px) solid transparent;
    border-image:url(${btnBaseUrl}) 40 fill; background:transparent; text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-st-qbtn.gh-st-cancel { filter:grayscale(.6) brightness(.72); }
  #gh-eq-inner {
    width:100%; height:100%;
    display:flex; flex-direction:column; gap:1.4%;
    color:#e8dcc0; font-family:inherit; overflow:hidden;
  }
  .gh-eq-title {
    text-align:center; font-family:"Cinzel",serif; font-weight:700;
    font-size:clamp(15px,2.4vh,23px); letter-spacing:1.5px;
    color:#f0e2bd; text-shadow:0 2px 4px rgba(0,0,0,.7);
  }
  /* abas (Equipamento / Atributos) */
  .gh-eq-tabs { display:flex; gap:8px; justify-content:center; }
  .gh-tab {
    padding:4px 15px; cursor:pointer; border-radius:7px;
    font-family:"Cinzel",serif; font-weight:600; letter-spacing:.5px;
    font-size:clamp(11px,1.6vh,14px);
    background:rgba(20,16,11,.5); color:#c9b98c; border:1px solid rgba(201,162,39,.4);
  }
  .gh-tab-on { background:rgba(201,162,39,.24); color:#f6ead0; border-color:rgba(201,162,39,.7); }
  .gh-eq-body { flex:1 1 0; min-height:0; overflow-y:auto; overflow-x:hidden; padding-right:2px; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; touch-action:pan-y; }
  /* título e abas NUNCA rolam (ficam fixos no topo da janela) */
  .gh-eq-title, .gh-eq-tabs { flex:0 0 auto; }
  .gh-tabpane { display:flex; flex-direction:column; gap:2.4%; }
  .gh-pane-hidden { display:none; }
  /* CAIXAS que separam "Equipado" da "Mochila": painel pintado em 9-slice
     (cantos ornamentados fixos, interior de pedra escura esticando). */
  .gh-section {
    border:clamp(13px,2.2vh,24px) solid transparent;
    border-image:url(${eqContainerUrl}) 88 fill;
    box-sizing:border-box; padding:1% 2% 2%;
  }
  .gh-sec-head {
    text-align:center; font-family:"Cinzel",serif; font-weight:600;
    font-size:clamp(12px,1.8vh,16px); color:#e0cf9e;
    letter-spacing:1px; margin:0 0 2.2%; text-shadow:0 1px 3px rgba(0,0,0,.8);
  }
  /* cabeçalho "Inventário" com o saldo de ouro à direita (ícone de moeda) */
  .gh-sec-inv {
    display:flex; align-items:center; justify-content:center; gap:6px; position:relative;
  }
  .gh-gold {
    position:absolute; right:2%; top:50%; transform:translateY(-50%);
    display:inline-flex; align-items:center; gap:4px;
    font-family:"Cinzel",serif; letter-spacing:.5px;
  }
  .gh-gold img { width:clamp(15px,2.2vh,20px); height:auto; filter:drop-shadow(0 1px 2px rgba(0,0,0,.7)); }
  .gh-gold b { color:#f4d873; font-size:clamp(12px,1.7vh,15px); text-shadow:0 1px 3px rgba(0,0,0,.85); }
  /* grade "boneco" 8×6 (célula quadrada via aspect-ratio) — disposição PoE */
  .gh-eq-doll {
    display:grid; grid-template-columns:repeat(8,1fr); grid-template-rows:repeat(6,1fr);
    gap:clamp(3px,0.8vh,6px); width:88%; aspect-ratio:4 / 3; margin:0 auto;
  }
  /* MOCHILA: um ÚNICO container escuro dividido por LINHAS FINAS (sem molduras
     grossas por célula). As linhas são a cor de fundo aparecendo no gap de 1px. */
  .gh-bag {
    display:grid; grid-template-columns:repeat(5,1fr); gap:1px;
    width:100%; margin:0 auto; overflow:hidden;
    background:rgba(201,162,39,.20);           /* cor das linhas (via gap) */
    border:1px solid rgba(201,162,39,.34);
    border-radius:5px; box-shadow:inset 0 2px 12px rgba(0,0,0,.6);
  }
  .gh-bag-slot {
    aspect-ratio:1; position:relative; border:none; border-image:none;
    background:rgba(11,9,6,.72); min-width:0; min-height:0;
    display:flex; align-items:center; justify-content:center; overflow:hidden;
  }
  .gh-bag-slot[data-wid]:hover { background:rgba(34,27,15,.9); filter:none; }
  /* contador de pilha (consumíveis empilhados) — usado quando houver itens */
  .gh-bag-slot .gh-count {
    position:absolute; right:2px; bottom:1px; font-size:clamp(9px,1.4vh,12px);
    color:#fff; font-weight:700; text-shadow:0 1px 2px #000, 0 0 3px #000; line-height:1;
  }
  .gh-slot {
    border:clamp(5px,1.05vh,8px) solid transparent;
    border-image:url(${eqSlotUrl}) 89 fill;
    box-sizing:border-box; min-width:0; min-height:0;
    display:flex; align-items:center; justify-content:center; overflow:hidden;
  }
  /* MOLDURAS DE RARIDADE (mochila + boneco): anel interno colorido + brilho */
  .gh-rar-comum    { box-shadow:inset 0 0 0 1px rgba(185,180,166,.4); }
  .gh-rar-magico   { box-shadow:inset 0 0 0 2px #4a90e2, inset 0 0 8px rgba(74,144,226,.55); }
  .gh-rar-raro     { box-shadow:inset 0 0 0 2px #e8b24a, inset 0 0 9px rgba(232,178,74,.6); }
  .gh-rar-lendario { box-shadow:inset 0 0 0 2px #ff8a2e, inset 0 0 11px rgba(255,138,46,.72); }
  .gh-bag-slot[data-wid], .gh-bag-slot[data-uid], .gh-slot-eq { cursor:pointer; }
  .gh-bag-slot[data-uid]:hover, .gh-slot-eq:hover { filter:brightness(1.15); }
  /* ===== POPUP DE ITEM — moldura de arte (eq_frame), ícone + stats grandes ===== */
  #gh-itip {
    position:fixed; z-index:30; pointer-events:auto; width:min(272px,82vw);
    box-sizing:border-box;
    border:19px solid transparent; border-image:url(${eqFrameUrl}) 92 fill;
    filter:drop-shadow(0 12px 30px rgba(0,0,0,.72));
    color:#e8dcc0; font-family:"Trebuchet MS",sans-serif;
  }
  #gh-itip.gh-itip-hidden { display:none; }
  /* cabeçalho: ícone emoldurado + nome/subtítulo */
  .gh-itip-top { display:flex; gap:10px; align-items:center; }
  .gh-itip-ic {
    flex:0 0 auto; width:48px; height:48px; border-radius:8px; overflow:hidden;
    border:2px solid rgba(201,162,39,.62); background:rgba(6,5,3,.55);
    box-shadow:inset 0 0 8px rgba(0,0,0,.6);
    display:flex; align-items:center; justify-content:center;
  }
  .gh-itip-ic img { width:90%; height:90%; object-fit:contain; filter:drop-shadow(0 1px 2px rgba(0,0,0,.75)); }
  .gh-itip-hd { min-width:0; display:flex; flex-direction:column; }
  .gh-itip-name { font-family:"Cinzel",serif; font-weight:800; font-size:18px; line-height:1.14; text-shadow:0 1px 3px #000; }
  .gh-rname-comum    .gh-itip-name { color:#efe4c8; }
  .gh-rname-magico   .gh-itip-name { color:#7cbaff; text-shadow:0 0 9px rgba(90,150,240,.4), 0 1px 3px #000; }
  .gh-rname-raro     .gh-itip-name { color:#f6d374; text-shadow:0 0 9px rgba(240,200,90,.4), 0 1px 3px #000; }
  .gh-rname-lendario .gh-itip-name { color:#ff9a4a; text-shadow:0 0 11px rgba(255,138,46,.6), 0 1px 3px #000; }
  .gh-itip-sub { font-size:12px; color:#b09c72; font-style:italic; margin-top:2px; }
  /* divisória dourada */
  .gh-itip-rule { height:0; border-top:1px solid rgba(201,162,39,.42); margin:9px 0 8px;
    box-shadow:0 1px 0 rgba(0,0,0,.4); }
  /* linhas de atributo — GRANDES e à mostra */
  .gh-itip-lines, .gh-itip-cmp { display:flex; flex-direction:column; gap:5px; }
  .gh-itip-l, .gh-itip-d { display:flex; justify-content:space-between; align-items:baseline; gap:12px; }
  .gh-itip-k { font-size:14.5px; color:#dcc99a; letter-spacing:.2px; }
  .gh-itip-k::before { content:"◆"; color:#9a7c2e; font-size:8px; margin-right:6px; vertical-align:middle; }
  .gh-itip-l b { font-size:15.5px; color:#ffe9b0; font-weight:700; font-variant-numeric:tabular-nums; text-shadow:0 1px 2px #000; }
  .gh-itip-cmph { font-size:11.5px; color:#b6a877; font-style:italic; margin-bottom:1px; }
  .gh-itip-d b { font-size:15.5px; font-weight:800; font-variant-numeric:tabular-nums; text-shadow:0 1px 2px #000; }
  .gh-itip-up b { color:#77e982; } .gh-itip-up b::after { content:" ▲"; font-size:10px; }
  .gh-itip-down b { color:#f2766c; } .gh-itip-down b::after { content:" ▼"; font-size:10px; }
  .gh-itip-same b { color:#a89873; }
  .gh-itip-act {
    display:block; width:100%; margin-top:12px; cursor:pointer;
    font-family:"Cinzel",serif; font-weight:700; font-size:14px; letter-spacing:.8px;
    color:#12100a; padding:9px 10px; border:none; border-radius:8px;
    background:linear-gradient(#f4d074,#c9922a); box-shadow:0 2px 7px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.4);
  }
  .gh-itip-act:hover { filter:brightness(1.06); }
  .gh-itip-act:active { transform:translateY(1px); }
  /* ícone do item dentro de um slot (equipado ou na mochila) */
  .gh-item-ico {
    max-width:86%; max-height:86%; width:auto; height:auto; object-fit:contain;
    filter:drop-shadow(0 2px 3px rgba(0,0,0,.6)); pointer-events:none;
  }
  .gh-bag-slot[data-wid] { cursor:pointer; }
  .gh-bag-slot[data-wid]:hover { background:rgba(34,27,15,.92); }
  /* item selecionado: o slot pulsa/brilha (dourado) */
  .gh-slot-pulse { animation:gh-slot-pulse 620ms ease-out 1; }
  @keyframes gh-slot-pulse {
    0%   { box-shadow:0 0 0 0 rgba(255,224,130,0); }
    30%  { box-shadow:0 0 14px 3px rgba(255,224,130,.95); }
    100% { box-shadow:0 0 0 0 rgba(255,224,130,0); }
  }
  .gh-eq-stats {
    background:rgba(12,9,6,.5); border:1px solid rgba(201,162,39,.35);
    border-radius:8px; padding:3.5% 5%;
  }
  .gh-eq-lvl {
    text-align:center; font-family:"Cinzel",serif; font-weight:600;
    font-size:clamp(13px,2vh,18px); color:#f0e2bd; margin-bottom:6px;
  }
  .gh-xp {
    height:8px; border-radius:5px; margin-top:4px; overflow:hidden;
    background:rgba(0,0,0,.5); border:1px solid rgba(201,162,39,.4);
  }
  .gh-xp-fill { height:100%; background:linear-gradient(#d8c24a,#8a7016); }
  .gh-stat-cols {
    display:grid; grid-template-columns:1fr 1fr; gap:2px 12px;
    font-size:clamp(10px,1.55vh,14px);
  }
  .gh-stat { display:flex; justify-content:space-between; gap:6px; padding:1px 0; }
  .gh-stat span { color:#bfae82; }
  .gh-stat b { color:#f0e6cc; font-weight:600; }
  /* --- distribuição de atributos (aba Atributos, em jogo) --- */
  .gh-alloc-pts {
    text-align:center; margin:8px 0 6px; font-size:clamp(11px,1.7vh,14px); color:#b6a877;
  }
  .gh-alloc-pts b { color:#8f8262; font-family:"Cinzel",serif; }
  .gh-alloc-pts.gh-pts-on b { color:#ffd964; text-shadow:0 0 8px rgba(240,200,90,.55); }
  .gh-prim-box {
    display:flex; flex-direction:column; gap:5px; margin-bottom:10px;
    padding:8px 10px; border-radius:8px;
    background:rgba(0,0,0,.28); border:1px solid rgba(201,162,39,.28);
  }
  .gh-prow { display:flex; align-items:center; justify-content:space-between; }
  .gh-prow > span { color:#d7c79a; font-size:clamp(11px,1.7vh,14px); }
  .gh-pstep { display:flex; align-items:center; gap:9px; }
  .gh-pstep > b { min-width:22px; text-align:center; color:#f0e6cc; font-weight:700; font-size:clamp(12px,1.9vh,15px); }
  .gh-pm {
    width:26px; height:26px; border-radius:50%; flex:0 0 auto; cursor:pointer;
    border:1px solid rgba(201,162,39,.6); background:linear-gradient(#4a3f28,#2c2519);
    color:#f0d98c; font-size:16px; line-height:1; display:flex; align-items:center; justify-content:center;
    -webkit-tap-highlight-color:transparent;
  }
  .gh-pm:active { transform:scale(.9); filter:brightness(1.2); }
  .gh-pm[disabled] { opacity:.32; cursor:default; }
  .gh-sec-blocks { display:grid; grid-template-columns:1fr 1fr; gap:4px 12px; font-size:clamp(10px,1.5vh,13px); }
  .gh-sec-col:last-child { grid-column:1 / -1; }
  .gh-sec-col h4 {
    margin:4px 0 2px; font-size:clamp(10px,1.5vh,13px); color:#e0cf9e;
    font-family:"Cinzel",serif; font-weight:600; letter-spacing:.5px;
  }
  .gh-sec-row { display:flex; justify-content:space-between; gap:6px; padding:1px 0; }
  .gh-sec-row span { color:#bfae82; }
  .gh-sec-row b { color:#f0e6cc; font-weight:600; }
  /* ===================== ABA ATRIBUTOS (redesenhada) ===================== */
  .gh-st2 { display:flex; flex-direction:column; gap:9px; }
  /* CABEÇALHO — retrato da classe (emoldurado) + classe/nível/XP, num banner ornado */
  .gh-st2-head {
    display:flex; gap:12px; align-items:stretch;
    border:16px solid transparent; border-image:url(${eqFrameUrl}) 90 fill;
    padding:4px 8px;
  }
  .gh-st2-portr {
    flex:0 0 auto; width:clamp(64px,12vh,86px); aspect-ratio:3/4; border-radius:7px; overflow:hidden;
    border:2px solid rgba(201,162,39,.65);
    box-shadow:0 2px 7px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.5);
    background:rgba(8,7,5,.6);
  }
  .gh-st2-portr img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
  .gh-st2-id { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; justify-content:center; gap:3px; }
  .gh-st2-cls {
    font-family:"Cinzel",serif; font-weight:800; letter-spacing:.5px;
    font-size:clamp(17px,3vh,24px); color:#f4dc92; text-shadow:0 2px 5px #000, 0 0 16px rgba(220,160,60,.25);
  }
  .gh-st2-lvl { font-size:clamp(12px,1.8vh,15px); color:#cdbd90; }
  .gh-st2-lvl b { color:#ffe6a6; font-family:"Cinzel",serif; }
  .gh-st2-xp {
    height:9px; border-radius:6px; overflow:hidden; margin-top:3px;
    background:rgba(0,0,0,.55); border:1px solid rgba(201,162,39,.45);
  }
  .gh-st2-xp i { display:block; height:100%; background:linear-gradient(90deg,#a9741f,#f4d074 65%,#fff2cc); box-shadow:0 0 6px rgba(244,208,116,.5); }
  .gh-st2-xptxt { font-size:10.5px; color:#b1a279; text-align:right; font-variant-numeric:tabular-nums; }
  /* PAINÉIS limpos (fundo pergaminho escuro + fio dourado + sombra interna) */
  .gh-st2-panel {
    background:linear-gradient(180deg, rgba(34,27,17,.62), rgba(18,14,9,.62));
    border:1px solid rgba(201,162,39,.32); border-radius:9px; padding:8px 11px;
    box-shadow:inset 0 0 16px rgba(0,0,0,.42), 0 1px 3px rgba(0,0,0,.4);
  }
  .gh-st2-ph {
    display:flex; align-items:center; justify-content:space-between;
    font-family:"Cinzel",serif; font-weight:700; font-size:clamp(13px,2vh,16px); color:#eccf82;
    border-bottom:1px solid rgba(201,162,39,.25); padding-bottom:5px; margin-bottom:6px;
  }
  .gh-st2-pts {
    font-family:"MedievalSharp",serif; font-size:11px; color:#8f8262; padding:2px 9px; border-radius:9px;
    background:rgba(0,0,0,.32); border:1px solid rgba(201,162,39,.25);
  }
  .gh-st2-pts.on { color:#12100a; background:linear-gradient(#f4d074,#c9922a); border-color:#f4d873; text-shadow:0 1px 0 rgba(255,240,200,.5); box-shadow:0 0 9px rgba(240,200,90,.55); }
  .gh-st2-prim { display:flex; flex-direction:column; gap:5px; }
  .gh-st2-secs { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .gh-st2-sec:last-child { grid-column:1 / -1; }
  .gh-st2-sec h5 {
    margin:0 0 5px; font-family:"Cinzel",serif; font-weight:700; letter-spacing:.5px;
    font-size:clamp(12px,1.8vh,15px); color:#e8d199;
    border-bottom:1px solid rgba(201,162,39,.22); padding-bottom:3px;
  }
  .gh-sr {
    display:flex; justify-content:space-between; gap:8px; padding:3px 0;
    font-size:clamp(11px,1.6vh,13.5px); border-bottom:1px dashed rgba(201,162,39,.1);
  }
  .gh-sr:last-child { border-bottom:0; }
  .gh-sr span { color:#c2b184; }
  .gh-sr b { color:#f5ead0; font-weight:700; font-variant-numeric:tabular-nums; }
  /* --- dano flutuante (números que sobem sobre a cena) --- */
  #gh-float { position:fixed; inset:0; pointer-events:none; z-index:11; overflow:hidden; }
  .gh-float-n {
    position:absolute; transform:translate(-50%,-50%);
    font-family:"Cinzel",serif; font-weight:700; white-space:nowrap;
    text-shadow:0 2px 4px rgba(0,0,0,.9), 0 0 6px rgba(0,0,0,.7);
    animation:gh-float-rise 1s ease-out forwards; will-change:transform,opacity;
  }
  .gh-fl-hit  { color:#fbe6b6; font-size:22px; }
  .gh-fl-crit { color:#ff8a3c; font-size:34px; text-shadow:0 2px 5px rgba(0,0,0,.95), 0 0 12px rgba(255,120,40,.7); }
  .gh-fl-player { color:#ff5a4e; font-size:24px; }
  .gh-fl-heal { color:#8ff0a0; font-size:22px; }
  .gh-fl-mana { color:#7fc4ff; font-size:18px; }
  @keyframes gh-float-rise {
    0%   { opacity:0; transform:translate(-50%,-40%) scale(.7); }
    15%  { opacity:1; transform:translate(-50%,-55%) scale(1.08); }
    35%  { transform:translate(-50%,-70%) scale(1); }
    100% { opacity:0; transform:translate(-50%,-135%) scale(1); }
  }
  /* --- árvore de habilidades --- */
  #gh-skills { position:relative; border-radius:8px; padding:8px; }
  .gh-sk-soon { text-align:center; padding:34px 12px; font-style:italic; color:#b6a877; }
  .gh-sk-top { text-align:center; font-size:13px; color:#d7c79a; margin-bottom:8px; }
  .gh-sk-top b { font-family:"Cinzel",serif; font-size:16px; color:#8f8262; padding:0 3px; }
  .gh-sk-top b.gh-sk-pts { color:#ffd964; text-shadow:0 0 8px rgba(240,200,90,.5); }
  .gh-sk-cols { display:flex; gap:6px; justify-content:space-between; align-items:flex-start; }
  .gh-sk-branch { flex:1 1 0; min-width:0; display:flex; flex-direction:column; align-items:center; }
  .gh-sk-bhead {
    font-family:"Cinzel",serif; font-weight:700; font-size:clamp(11px,1.6vh,14px);
    margin-bottom:6px; text-shadow:0 1px 3px #000; text-align:center; letter-spacing:.5px;
  }
  .gh-sk-line { width:3px; height:11px; opacity:.5; border-radius:2px; }
  .gh-sk-node {
    position:relative; border-radius:50%; cursor:pointer; padding:0; flex:0 0 auto;
    background:rgba(10,9,6,.72); display:flex; align-items:center; justify-content:center;
    border:2px solid #6a5a2e; transition:box-shadow .15s, transform .08s, filter .15s;
  }
  .gh-sk-node:active { transform:scale(.92); }
  .gh-sk-active { width:clamp(38px,6.6vh,50px); height:clamp(38px,6.6vh,50px); border-color:#c9a24a; }
  .gh-sk-passive { width:clamp(28px,5vh,38px); height:clamp(28px,5vh,38px); border-color:#9aa2ad; }
  .gh-sk-node img { width:100%; height:100%; object-fit:contain; border-radius:50%; pointer-events:none; }
  .gh-sk-sym { font-size:clamp(13px,2.2vh,18px); line-height:1; pointer-events:none; }
  .gh-sk-node.gh-sk-locked { opacity:.32; filter:grayscale(.65); }
  .gh-sk-node.gh-sk-on { box-shadow:0 0 0 2px rgba(255,215,100,.55), 0 0 10px rgba(255,200,80,.4); }
  .gh-sk-node.gh-sk-sel { border-color:#fff; box-shadow:0 0 0 3px rgba(255,255,255,.85), 0 0 12px rgba(255,240,180,.6); }
  .gh-sk-node.gh-sk-buy { animation:gh-sk-pulse 1.25s ease-in-out infinite; }
  @keyframes gh-sk-pulse { 0%,100%{ box-shadow:0 0 0 0 rgba(255,220,120,0);} 50%{ box-shadow:0 0 11px 2px rgba(255,220,120,.6);} }
  .gh-sk-rank {
    position:absolute; right:-5px; bottom:-5px; background:rgba(8,7,5,.94);
    border:1px solid rgba(201,162,39,.6); border-radius:6px; padding:0 3px;
    font-size:10px; color:#f0dca2; line-height:1.35; font-variant-numeric:tabular-nums;
  }
  .gh-sk-tip {
    margin-top:10px; min-height:40px; padding:9px 12px; font-size:12.5px; line-height:1.4;
    background:rgba(8,7,5,.72); border:1px solid rgba(201,162,39,.3); border-radius:8px; color:#d8cba0;
  }
  .gh-sk-thint { font-style:italic; color:#b6a877; }
  .gh-sk-tname b { color:#f0e2bd; font-family:"Cinzel",serif; font-size:14px; }
  .gh-sk-tname i { color:#c9a84f; font-style:italic; font-size:11.5px; margin-left:4px; }
  .gh-sk-tdesc { margin:4px 0 8px; }
  /* botão de CONFIRMAR a alocação do ponto */
  .gh-sk-cbtn {
    display:inline-block; font-family:"Cinzel",serif; font-size:13px; letter-spacing:.5px;
    padding:8px 18px; border-radius:8px; text-align:center;
  }
  .gh-sk-cbuy {
    cursor:pointer; color:#1c150a; border:none;
    background:linear-gradient(#f4d873,#c99a34); box-shadow:0 2px 6px rgba(0,0,0,.5);
    font-weight:700;
  }
  .gh-sk-cbuy:hover { background:linear-gradient(#ffe98c,#dcae3e); }
  .gh-sk-cbuy:active { transform:translateY(1px) scale(.98); }
  .gh-sk-cdim { color:#9c8f6d; border:1px solid rgba(201,162,39,.3); background:rgba(20,16,11,.6); }
  /* toast (nível/aviso) */
  #gh-toast {
    position:fixed; top:24%; left:50%; transform:translateX(-50%); z-index:14;
    pointer-events:none; opacity:0; text-align:center; white-space:nowrap;
    font-family:"Cinzel",serif; font-weight:700; letter-spacing:1.5px;
    font-size:clamp(22px,5vw,34px);
    color:#ffe089; -webkit-text-stroke:0.6px rgba(60,40,10,.6);
    text-shadow:0 3px 10px #000, 0 0 22px rgba(240,190,70,.6);
  }
  @keyframes gh-toast {
    0% { opacity:0; transform:translate(-50%,10px) scale(.8); }
    18% { opacity:1; transform:translate(-50%,0) scale(1.06); }
    30% { transform:translate(-50%,0) scale(1); }
    78% { opacity:1; }
    100% { opacity:0; transform:translate(-50%,-16px) scale(1); }
  }
  /* --- SUBIR DE NÍVEL: GIF (seta subindo) + "LEVEL UP!" garrafal dourado --- */
  #gh-levelup {
    position:fixed; inset:0; z-index:23; pointer-events:none;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:2px; visibility:hidden;
  }
  #gh-levelup.gh-lu-on { visibility:visible; }
  #gh-levelup .gh-lu-gif {
    position:absolute; left:50%; top:50%; transform:translate(-50%,-54%);
    width:min(340px,72vw); height:auto; opacity:0;
    /* o fundo já foi RECORTADO no arquivo (WebP com alfa): só a seta e os brilhos
       aparecem — sem blend, sem máscara e sem drop-shadow (que criava o "quadrado"). */
  }
  #gh-levelup.gh-lu-on .gh-lu-gif { animation:gh-lu-gif 2.5s ease-out both; }
  @keyframes gh-lu-gif {
    0% { opacity:0; transform:translate(-50%,-40%) scale(.7); }
    16% { opacity:1; transform:translate(-50%,-54%) scale(1); }
    75% { opacity:1; }
    100% { opacity:0; transform:translate(-50%,-60%) scale(1.03); }
  }
  /* palavra garrafal: fonte pesada, contorno escuro grosso + preenchimento dourado */
  #gh-levelup .gh-lu-word {
    position:relative; z-index:1; font-family:"Cinzel",serif; font-weight:900;
    font-size:clamp(34px,10vw,78px); letter-spacing:3px; line-height:1;
    background:linear-gradient(180deg,#fff3c4 0%,#ffd979 32%,#e0a233 60%,#c07f1e 100%);
    -webkit-background-clip:text; background-clip:text;
    color:transparent; -webkit-text-fill-color:transparent;
    -webkit-text-stroke:2.2px #3a2708;
    filter:drop-shadow(0 3px 0 #2a1c06) drop-shadow(0 5px 10px rgba(0,0,0,.85)) drop-shadow(0 0 26px rgba(255,196,80,.75));
    transform:translateY(6px); opacity:0;
  }
  #gh-levelup.gh-lu-on .gh-lu-word { animation:gh-lu-word 2.6s cubic-bezier(.2,1.2,.3,1) both; }
  @keyframes gh-lu-word {
    0% { opacity:0; transform:translateY(30px) scale(.6); }
    22% { opacity:1; transform:translateY(6px) scale(1.14); }
    38% { transform:translateY(6px) scale(1); }
    82% { opacity:1; }
    100% { opacity:0; transform:translateY(-8px) scale(1); }
  }
  #gh-levelup .gh-lu-sub {
    position:relative; z-index:1; margin-top:6px; font-family:"Cinzel",serif; font-weight:700;
    font-size:clamp(15px,3.2vw,22px); letter-spacing:2px; color:#ffe6a6;
    text-shadow:0 2px 5px #000, 0 0 14px rgba(240,190,70,.6); opacity:0;
  }
  #gh-levelup.gh-lu-on .gh-lu-sub { animation:gh-lu-sub 2.6s ease-out both; }
  @keyframes gh-lu-sub {
    0%,14% { opacity:0; }
    30% { opacity:1; } 82% { opacity:1; } 100% { opacity:0; }
  }
  /* barra de conjuração (magias com cast time) — usa a MOLDURA do mapa (9-slice)
     como container, igual ao minimapa, p/ combinar com o resto do HUD. */
  #gh-cast {
    position:fixed; left:50%; bottom:29%; transform:translate(-50%,0);
    z-index:13; pointer-events:none; width:min(300px,58vw);
    display:flex; flex-direction:column; align-items:center; gap:6px;
    opacity:0; transition:opacity .12s ease;
  }
  #gh-cast.gh-cast-on { opacity:1; }
  .gh-cast-name {
    font-family:"Cinzel",serif; font-weight:700; letter-spacing:1px;
    font-size:clamp(13px,3.4vw,17px); color:#f0e6c8;
    text-shadow:0 2px 6px #000, 0 0 12px rgba(120,160,230,.55);
  }
  .gh-cast-frame {
    width:100%; box-sizing:border-box;
    border:clamp(12px,3vw,16px) solid transparent;
    border-image:url(${mapFrameUrl}) 130 repeat;
    background:rgba(6,9,16,.92); background-clip:padding-box;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.6));
  }
  .gh-cast-track {
    display:block; height:clamp(9px,2.3vw,12px); overflow:hidden;
    border-radius:2px; background:rgba(4,6,12,.9);
    box-shadow:inset 0 1px 3px rgba(0,0,0,.85);
  }
  .gh-cast-fill {
    display:block; height:100%; width:0%;
    background:linear-gradient(90deg,#2a6fd0,#69c0ff 60%,#cfeaff);
    box-shadow:0 0 10px rgba(105,192,255,.9), inset 0 1px 0 rgba(255,255,255,.45);
  }
  /* vinheta vermelha ao levar dano */
  #gh-dmg {
    position:fixed; inset:0; z-index:9; pointer-events:none; opacity:0;
    box-shadow:inset 0 0 120px 30px rgba(180,10,10,.85);
    background:radial-gradient(ellipse at center, rgba(150,0,0,0) 45%, rgba(150,0,0,.4) 100%);
  }
  #gh-fade {
    position:fixed; inset:0; z-index:40; pointer-events:none; opacity:0; background:#000;
  }
  /* pálpebras (acordar): barras pretas que fecham/abrem no centro */
  #gh-eyelid-top, #gh-eyelid-bot {
    position:fixed; left:0; right:0; height:0; z-index:41; pointer-events:none; display:none; background:#000;
  }
  #gh-eyelid-top { top:0; box-shadow:0 10px 22px 4px #000; }
  #gh-eyelid-bot { bottom:0; box-shadow:0 -10px 22px 4px #000; }
  @keyframes gh-dmg {
    0% { opacity:0; } 18% { opacity:1; } 100% { opacity:0; }
  }
  #pad { position:fixed; inset:0; pointer-events:none; z-index:10; font-family:inherit; }
  .gh-cluster { position:absolute; pointer-events:none; }
  /* botões: a base é a arte redonda pintada; o ícone (svg) fica por cima */
  .gh-btn {
    pointer-events:auto;
    width:52px; height:52px; border-radius:50%; flex:0 0 auto;
    background:url(${btnBaseUrl}) no-repeat center / 100% 100%;
    border:none; padding:0; color:#ecd9a6;
    display:flex; align-items:center; justify-content:center;
    filter:drop-shadow(0 3px 8px rgba(0,0,0,0.55)); cursor:pointer;
    touch-action:none; -webkit-tap-highlight-color:transparent;
  }
  .gh-btn:active { transform:scale(0.92); filter:drop-shadow(0 1px 4px rgba(0,0,0,.6)) brightness(1.28); }
  .gh-btn-ico {
    width:66%; height:66%; object-fit:contain; display:block; pointer-events:none;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.85));
  }
  /* MOVIMENTO — D-pad de 4 botões no canto inferior ESQUERDO. GRID 3x3 em
     diamante (cima/baixo/esq/dir); cantos e miolo vazios.
              ▲(2,1)
        ⟲(1,2)      ⟳(3,2)
              ▼(2,3)            */
  /* MOVIMENTO — D-pad em CRUZ (arte única). As 4 zonas de toque ficam por cima
     dos braços; a do braço pressionado acende. */
  .gh-move {
    left:16px; bottom:20px; width:124px; height:124px;
    background:url(${dpadUrl}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 3px 9px rgba(0,0,0,0.55));
  }
  .gh-dtap {
    position:absolute; background:transparent; border:none; padding:0;
    pointer-events:auto; cursor:pointer; border-radius:16px;
    -webkit-tap-highlight-color:transparent;
  }
  .gh-dtap:active {
    background:radial-gradient(circle, rgba(255,226,140,0.5) 0%, rgba(255,210,110,0.18) 45%, rgba(255,210,110,0) 70%);
  }
  .gh-dup    { left:30%; top:0;    width:40%; height:44%; }
  .gh-ddown  { left:30%; bottom:0; width:40%; height:44%; }
  .gh-dleft  { left:0;   top:30%;  width:44%; height:40%; }
  .gh-dright { right:0;  top:30%;  width:44%; height:40%; }
  /* AÇÃO — canto inferior DIREITO (perto da arma/polegar): ataque em destaque
     embaixo, interagir logo acima. */
  .gh-atk {
    position:absolute; right:18px; bottom:22px;
    width:58px; height:58px; color:#f0b48a;
    filter:drop-shadow(0 0 12px rgba(200,70,40,0.5)) drop-shadow(0 3px 8px rgba(0,0,0,.55));
  }
  .gh-atk:active { transform:scale(0.9); filter:drop-shadow(0 0 8px rgba(220,90,50,0.75)) brightness(1.15); }
  /* interagir: à ESQUERDA do ataque (lado a lado), um tico menor */
  .gh-act {
    position:absolute; right:88px; bottom:24px;
    width:54px; height:54px;
    opacity:0.5; transition:opacity .15s, filter .15s;
  }
  .gh-act.gh-act-on {
    opacity:1;
    filter:drop-shadow(0 0 12px rgba(240,192,64,0.85)) drop-shadow(0 3px 8px rgba(0,0,0,.55));
  }
  .gh-act:active { transform:scale(0.92); }
  /* BARRA DE AÇÃO — habilidades ativas, faixa central inferior */
  @property --gh-cd { syntax:'<angle>'; inherits:false; initial-value:0deg; }
  /* container passa-cliques; os slots são posicionados em ARCO (meia-lua)
     ao redor do botão de ataque via right/bottom inline. */
  #gh-actbar {
    position:absolute; inset:0; display:none; pointer-events:none;
  }
  .gh-sslot {
    position:absolute;
    width:48px; height:48px; border-radius:50%; padding:0; border:none;
    background:url(${btnBaseUrl}) no-repeat center / 100% 100%;
    display:flex; align-items:center; justify-content:center; cursor:pointer;
    pointer-events:auto;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.6));
    -webkit-tap-highlight-color:transparent; overflow:hidden;
  }
  .gh-sslot:active { transform:scale(0.9); filter:brightness(1.2); }
  .gh-sslot img { width:70%; height:70%; object-fit:contain; pointer-events:none;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.85)); }
  /* slot VAZIO: soquete apagado (marca o lugar da futura habilidade) */
  .gh-ss-empty {
    filter:grayscale(.6) brightness(.5); opacity:.62; cursor:default;
    box-shadow:inset 0 0 8px rgba(0,0,0,.55);
  }
  .gh-ss-empty:active { transform:none; filter:grayscale(.6) brightness(.5); }
  .gh-ss-rune { font-size:18px; color:rgba(220,200,150,.5); pointer-events:none;
    text-shadow:0 1px 2px rgba(0,0,0,.8); }
  .gh-ss-x { font-size:20px; color:#e6d29a; }
  /* recarga: setor escuro (conic) que ENCOLHE conforme --gh-cd (frac×360) cai */
  .gh-ss-cool {
    position:absolute; inset:0; border-radius:50%; pointer-events:none; opacity:0;
    --gh-cd:0deg;
    background:conic-gradient(rgba(6,6,10,.74) var(--gh-cd), transparent 0);
  }
  /* segundos restantes no centro do ícone durante a recarga */
  .gh-ss-cd {
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    pointer-events:none; font-family:"Cinzel",serif; font-weight:700;
    font-size:18px; color:#fff2c8; text-shadow:0 1px 3px rgba(0,0,0,.95);
  }
  #gh-prompt {
    pointer-events:none; position:absolute; left:50%; transform:translateX(-50%);
    bottom:104px; max-width:70%; text-align:center;
    background:rgba(20,16,10,0.82); color:#f0dca2;
    border:1px solid rgba(201,162,39,0.55); border-radius:10px;
    padding:6px 14px; font-size:15px; white-space:nowrap;
  }
  #gh-dialogue {
    pointer-events:auto; position:absolute; left:50%; transform:translateX(-50%);
    bottom:110px; width:min(560px,88%);
    display:flex; align-items:stretch; gap:12px;
    background:rgba(18,14,9,0.92); color:#ece0c4;
    border:2px solid rgba(201,162,39,0.6); border-radius:12px;
    padding:12px 16px 10px; box-shadow:0 6px 22px rgba(0,0,0,0.6);
    cursor:pointer; touch-action:none;
  }
  .gh-dlg-portrait {
    flex:0 0 auto; width:64px; height:64px; border-radius:9px; object-fit:cover;
    object-position:top center; background:rgba(0,0,0,0.35);
    border:2px solid rgba(201,162,39,0.6);
    image-rendering:auto; align-self:flex-start;
  }
  .gh-dlg-body { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; }
  .gh-dlg-name { color:#f0c040; font-family:"Cinzel",serif; font-weight:700; letter-spacing:.5px; font-size:16px; margin-bottom:4px; }
  /* altura fixa do texto: a caixa fica sempre do mesmo tamanho (falas longas
     são paginadas no código, então nunca ultrapassam este espaço) */
  .gh-dlg-text { font-size:16px; line-height:1.35; min-height:66px; }
  .gh-dlg-hint { text-align:right; font-size:12px; color:#a8966a; margin-top:6px; }
  .gh-dlg-choices { display:none; gap:8px; margin-top:8px; flex-wrap:wrap; }
  .gh-dlg-choice { flex:1 1 auto; min-width:120px; cursor:pointer; font-family:"Cinzel",serif; font-weight:700;
    font-size:14px; letter-spacing:1px; color:#c9b478; padding:9px 14px; border-radius:9px;
    background:linear-gradient(#2b2218,#160f08); border:2px solid rgba(201,162,39,.5); box-shadow:0 2px 6px #000; }
  .gh-dlg-choice-on { color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-color:#f4d873; text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-dlg-choice:active { transform:translateY(1px); }
  /* MENU vertical (estilo WoW) quando há mais de 2 opções */
  .gh-dlg-choices.gh-dlg-menu { flex-direction:column; gap:6px; flex-wrap:nowrap; }
  .gh-dlg-menu .gh-dlg-choice { width:100%; min-width:0; display:flex; align-items:center; justify-content:space-between;
    gap:10px; text-align:left; padding:9px 13px; font-size:14px; }
  .gh-dlg-menu .gh-dlg-clabel { flex:1 1 auto; min-width:0; }
  .gh-dlg-cnote { flex:0 0 auto; font-family:"MedievalSharp",serif; font-weight:400; letter-spacing:.5px;
    font-size:11px; color:#12100a; background:rgba(244,216,115,.85); border-radius:6px; padding:1px 7px; }
  /* tipos: missão (dourado, com selo), loja (âmbar), sair (apagado) */
  .gh-dlg-menu .gh-dlg-c-quest { color:#f4d883; border-color:rgba(244,216,115,.65); box-shadow:0 0 10px rgba(240,200,90,.16), 0 2px 6px #000; }
  .gh-dlg-menu .gh-dlg-c-quest .gh-dlg-clabel::before { content:"❕ "; color:#ffd873; }
  .gh-dlg-menu .gh-dlg-c-shop .gh-dlg-clabel::before { content:"🛒 "; }
  .gh-dlg-menu .gh-dlg-c-exit { color:#a2957a; border-color:rgba(150,140,110,.4); }
  .gh-dlg-menu .gh-dlg-c-exit .gh-dlg-clabel::before { content:"↩ "; }
  .gh-dlg-menu .gh-dlg-c-back .gh-dlg-clabel::before { content:"◂ "; }
  @media (min-width: 900px) {
    .gh-btn { opacity:0.75; }
    .gh-act { opacity:0.5; }
    .gh-act.gh-act-on { opacity:1; }
  }

  /* ============================================================= LANDSCAPE
     TERCEIRO layout: celular DEITADO (paisagem). Só ativa em telas BAIXAS e
     largas (altura ≤ 560px) → não afeta desktop (alto) nem o portrait (alto e
     estreito). Reorganiza tudo p/ caber na pouca altura: HUD e mapa menores no
     topo, os 3 botões utilitários numa FILEIRA no topo-centro (longe do d-pad),
     e os controles recuados nos cantos de baixo. */
  @media (orientation: landscape) and (max-height: 500px) {
    #gh-hud { top:6px; left:8px; width:min(188px,30vw); }
    .gh-hud-bar { left:19.2%; width:72.2%; }
    #gh-map {
      top:6px; right:8px; width:min(104px,22vh);
      border-width:clamp(10px,2.6vh,16px);
    }
    #gh-tracker {
      top:calc(6px + min(104px,22vh) + 4px); right:8px; width:min(196px,36vw);
      padding:5px 8px 6px;
    }
    #gh-tracker .gh-tk-title { font-size:11px; }
    #gh-tracker .gh-tk-obj { font-size:10px; margin-top:2px; }
    #gh-clock { display:none; }               /* relógio some no aperto do landscape */
    /* utilitários: fileira horizontal centralizada no TOPO (nunca sobre o d-pad) */
    #gh-char-btn, #gh-opt-btn, #gh-journal-btn { top:6px; width:44px; height:44px; }
    #gh-char-btn    { left:calc(50% - 70px); }
    #gh-opt-btn     { left:calc(50% - 22px); }
    #gh-journal-btn { left:calc(50% + 26px); }
    /* d-pad e ação recuados nos cantos de baixo, um pouco menores */
    .gh-move { left:10px; bottom:10px; width:108px; height:108px; }
    .gh-atk  { right:12px; bottom:12px; width:54px; height:54px; }
    .gh-act  { right:76px; bottom:14px; width:50px; height:50px; }
    /* bandeja de itens logo acima do d-pad */
    #gh-tray { left:10px; bottom:126px; }
    /* caixa de diálogo e dica mais baixas p/ sobrar céu/cena */
    #gh-dialogue { bottom:12px; width:min(620px,66%); }
    #gh-prompt { bottom:92px; }
    .gh-dlg-portrait { width:52px; height:52px; }
    .gh-dlg-text { min-height:44px; font-size:14px; }
  }

  /* ---- BANDEJA DE CONSUMÍVEIS (usar item) ---- */
  #gh-tray { position:fixed; left:16px; bottom:154px; z-index:12; display:none; gap:7px; pointer-events:auto; }
  .gh-tray-slot { position:relative; width:clamp(42px,7vh,50px); height:clamp(42px,7vh,50px); cursor:pointer;
    border:clamp(8px,1.3vh,10px) solid transparent; border-image:url(${eqSlotUrl}) 89 fill; background:transparent;
    display:flex; align-items:center; justify-content:center; padding:0; -webkit-tap-highlight-color:transparent; }
  .gh-tray-slot:active { filter:brightness(1.3); }
  .gh-tray-emo { font-size:clamp(20px,3.4vh,26px); line-height:1; filter:drop-shadow(0 1px 2px #000); }
  .gh-tray-img { width:84%; height:84%; object-fit:contain; filter:drop-shadow(0 1px 2px #000); pointer-events:none; }
  .gh-tray-cnt { position:absolute; right:-3px; bottom:-3px; min-width:16px; height:16px; padding:0 3px; border-radius:8px;
    background:#1a130c; border:1.5px solid rgba(201,162,39,.7); color:#f4e2b0; font-family:"Cinzel",serif; font-weight:700;
    font-size:11px; line-height:14px; text-align:center; box-shadow:0 1px 3px #000; }

  /* ---- TAVERNA (bebidas + missões, tema âmbar) ---- */
  #gh-tv { position:fixed; inset:0; z-index:21; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.62); pointer-events:auto; }
  #gh-tv.gh-eq-hidden { display:none; }
  #gh-tv-win { position:relative; box-sizing:border-box; width:min(60vh,460px); height:min(94vh,820px);
    border:clamp(22px,3.4vh,34px) solid transparent; border-image:url(${eqFrameUrl}) 90 fill; filter:drop-shadow(0 6px 20px rgba(0,0,0,.6)); }
  @media (max-width:640px){ #gh-tv-win { width:100vw; height:100dvh; border-width:clamp(15px,2.6vh,24px); } }
  #gh-tv-close { position:absolute; right:10px; top:10px; z-index:9; width:36px; height:36px; border-radius:9px; cursor:pointer;
    font-size:17px; line-height:1; background:rgba(20,16,11,.85); color:#e8d9b0; border:2px solid rgba(232,178,74,.6); box-shadow:0 1px 4px #000; }
  #gh-tv-body { width:100%; height:100%; display:flex; flex-direction:column; gap:2.2%; color:#e8dcc0; overflow-y:auto; }
  .gh-tv-title { display:flex; align-items:center; gap:11px; flex:0 0 auto; padding:0 46px 0 2px; }
  .gh-tv-portr { width:clamp(40px,6.4vh,52px); height:clamp(40px,6.4vh,52px); border-radius:10px; border:2px solid rgba(232,178,74,.65);
    background:#1a130c; object-fit:cover; object-position:50% 22%; box-shadow:inset 0 0 10px #000, 0 0 12px rgba(232,178,74,.25); flex:0 0 auto; }
  .gh-tv-tt { flex:1; text-align:center; font-family:"Cinzel",serif; font-weight:800; font-size:clamp(15px,2.3vh,20px);
    letter-spacing:1px; color:#f6e7c2; text-shadow:0 2px 6px #000; line-height:1.02; white-space:nowrap; }
  .gh-tv-tt small { display:block; font-family:"MedievalSharp",serif; font-weight:400; font-size:clamp(9px,1.2vh,10.5px); color:#c39a5a; letter-spacing:3px; margin-top:2px; white-space:nowrap; }
  .gh-gold.gh-tv-gold { position:static; transform:none; flex:0 0 auto; font-size:clamp(13px,2vh,16px); }
  .gh-gold.gh-tv-gold b { color:#f4d074; }
  /* divisória ornamental */
  .gh-tv-rule { flex:0 0 auto; display:flex; align-items:center; justify-content:center; gap:8px; color:#9a7c44; margin:-1% 0; }
  .gh-tv-rule::before, .gh-tv-rule::after { content:""; height:1px; flex:1; max-width:150px; background:linear-gradient(90deg,transparent,rgba(232,178,74,.5),transparent); }
  .gh-tv-rule span { font-size:11px; color:#c9a24f; }
  /* cabeçalho de bloco */
  .gh-tv-block { flex:0 0 auto; }
  .gh-tv-h { display:flex; align-items:center; gap:7px; justify-content:center; margin-bottom:2.4%; }
  .gh-tv-h b { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(11px,1.7vh,13px); color:#e8b24a; letter-spacing:2px; text-shadow:0 1px 3px #000; }
  .gh-tv-h i { font-style:normal; color:#8a6f3f; font-size:clamp(10px,1.5vh,12px); }
  /* card da bebida */
  .gh-tv-drinkcard { display:flex; align-items:center; gap:13px; padding:3% 4%; border-radius:12px;
    background:linear-gradient(180deg, rgba(58,42,20,.5), rgba(30,20,10,.45)); box-shadow:inset 0 0 0 1.5px rgba(232,178,74,.32), 0 2px 10px rgba(0,0,0,.4); }
  .gh-tv-dslot { position:relative; width:clamp(60px,10vh,76px); height:clamp(60px,10vh,76px); flex:0 0 auto;
    display:flex; align-items:center; justify-content:center; border:clamp(8px,1.5vh,10px) solid transparent; border-image:url(${eqSlotUrl}) 89 fill;
    box-shadow:0 0 16px 2px rgba(232,178,74,.32); }
  .gh-tv-demo { font-size:clamp(28px,5.4vh,36px); line-height:1; }
  .gh-tv-dimg { width:86%; height:86%; object-fit:contain; filter:drop-shadow(0 2px 3px rgba(0,0,0,.5)); }
  .gh-tv-dhave { position:absolute; right:-4px; bottom:-4px; min-width:18px; height:18px; padding:0 4px; border-radius:9px;
    background:#1a130c; border:1.5px solid rgba(232,178,74,.75); color:#f4e2b0; font-family:"Cinzel",serif; font-weight:700;
    font-size:11px; line-height:15px; text-align:center; box-shadow:0 1px 3px #000; }
  .gh-tv-dinfo { flex:1; min-width:0; }
  .gh-tv-dn { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(15px,2.3vh,17px); color:#f4ebd4; }
  .gh-tv-chip { display:inline-flex; align-items:center; gap:4px; margin-top:6px; padding:3px 10px; border-radius:20px;
    font-size:clamp(10px,1.5vh,11px); background:rgba(90,60,30,.5); color:#f0c98a; box-shadow:inset 0 0 0 1px rgba(232,178,74,.35); }
  .gh-tv-buywrap { flex:0 0 auto; display:flex; flex-direction:column; align-items:center; gap:2px; }
  .gh-tv-buybtn { display:inline-flex; align-items:center; gap:5px; cursor:pointer; padding:9px 15px; font-family:"Cinzel",serif;
    font-weight:700; font-size:clamp(13px,2vh,14px); color:#1a1408; border:clamp(10px,1.7vh,12px) solid transparent;
    border-image:url(${btnBaseUrl}) 40 fill; background:transparent; text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-tv-buybtn img { width:14px; height:14px; }
  .gh-tv-buywrap em { font-style:normal; font-size:clamp(9px,1.3vh,10px); color:#a8905f; font-family:"Cinzel",serif; letter-spacing:1px; }
  /* mural de missões (protagonista) */
  .gh-tv-board { flex:1 1 auto; display:flex; flex-direction:column; padding:3% 3.5% 3.5%;
    border:clamp(13px,2vh,15px) solid transparent; border-image:url(${eqContainerUrl}) 88 fill; }
  .gh-tv-h-c { margin-bottom:3.4%; }
  .gh-tv-quests { display:flex; flex-direction:column; gap:10px; }
  .gh-tv-empty { text-align:center; color:#8a7550; font-size:clamp(11px,1.7vh,13px); line-height:1.6; padding:16% 6%; font-family:"MedievalSharp",serif; }
  .gh-tv-quest { position:relative; display:flex; gap:11px; align-items:stretch; padding:3% 3%; border-radius:11px; overflow:hidden;
    background:linear-gradient(180deg, rgba(40,30,17,.55), rgba(22,15,9,.5)); box-shadow:inset 0 0 0 1.5px rgba(201,162,39,.28); }
  .gh-tv-accent { position:absolute; left:0; top:0; bottom:0; width:4px; }
  .gh-tv-q-new .gh-tv-accent { background:linear-gradient(#7bd06a,#3a7a2a); }
  .gh-tv-q-ready .gh-tv-accent { background:linear-gradient(#f4d074,#c98a2a); }
  .gh-tv-q-active .gh-tv-accent { background:linear-gradient(#c9a24f,#7a5a1e); }
  .gh-tv-q-done .gh-tv-accent { background:linear-gradient(#8aa07a,#4a5a3a); }
  .gh-tv-qic { width:clamp(42px,7vh,48px); height:clamp(42px,7vh,48px); flex:0 0 auto; align-self:center; display:flex; align-items:center; justify-content:center;
    font-size:clamp(23px,4vh,26px); border-radius:9px; background:#0d0a07; box-shadow:inset 0 0 0 1.5px rgba(201,162,39,.35); }
  .gh-tv-qbody { flex:1; min-width:0; }
  .gh-tv-qtop { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .gh-tv-qtitle { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(13px,2.1vh,15px); color:#f4ebd4; }
  .gh-tv-rib { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(8px,1.3vh,9px); letter-spacing:.5px; padding:2px 8px; border-radius:20px; white-space:nowrap; }
  .gh-tv-rib-new { background:#2f4a22; color:#bfe89a; box-shadow:inset 0 0 0 1px rgba(150,220,120,.4); }
  .gh-tv-rib-ready { background:#5a4415; color:#ffd98a; box-shadow:inset 0 0 0 1px rgba(240,200,120,.4); }
  .gh-tv-rib-active { background:#4a3a18; color:#f0d477; box-shadow:inset 0 0 0 1px rgba(201,162,39,.35); }
  .gh-tv-rib-done { background:#3a4a2f; color:#bfe89a; box-shadow:inset 0 0 0 1px rgba(150,200,120,.35); }
  .gh-tv-qdesc { font-size:clamp(10px,1.55vh,11.5px); color:#b6a883; margin-top:3px; line-height:1.3; }
  .gh-tv-qprog { font-size:clamp(10px,1.5vh,11px); color:#9fb98a; margin-top:4px; font-family:"Cinzel",serif; }
  .gh-tv-rewards { display:flex; gap:6px; margin-top:7px; flex-wrap:wrap; }
  .gh-tv-rw { display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:7px; font-size:clamp(10px,1.5vh,11px); color:#e8c56a;
    background:rgba(12,9,6,.6); box-shadow:inset 0 0 0 1px rgba(201,162,39,.3); }
  .gh-tv-rw img { width:15px; height:15px; object-fit:contain; }
  .gh-tv-qact { flex:0 0 auto; align-self:center; }
  .gh-tv-qbtn { cursor:pointer; padding:9px 14px; font-family:"Cinzel",serif; font-weight:700; font-size:clamp(11px,1.7vh,12px);
    color:#1a1408; border:clamp(9px,1.5vh,11px) solid transparent; border-image:url(${btnBaseUrl}) 40 fill; background:transparent; text-shadow:0 1px 0 rgba(255,235,180,.5); }
  .gh-tv-qready { animation:gh-tv-pulse 1.4s ease-in-out infinite; }
  @keyframes gh-tv-pulse { 0%,100%{filter:none} 50%{filter:brightness(1.22)} }
  `;
  document.head.appendChild(s);
}
