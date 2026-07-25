import { MOVE_MS } from "./config";
import { STYLES, REST, type Weapon, type Pose } from "./weapons";
import { SKILL_TREES, STAT_META, PASSIVE_ICON, type Skill } from "./skills";
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
import loadSwordUrl from "../assets/ui/load_sword.png";
import mapFrameUrl from "../assets/ui/map_frame.png";
import clockSunUrl from "../assets/ui/clock_sun.png";
import clockMoonUrl from "../assets/ui/clock_moon.png";

// ---- FORJA: animação de encher a espada (lava) + efeitos sonoros -----------
// enche a lâmina de 0→100% em ~1.1s (mesma sensação do loading) e chama onEnd().
function runForge(anvil: HTMLElement, onEnd: () => void) {
  const fill = anvil.querySelector(".gh-sm-sword-fill") as HTMLElement;
  anvil.classList.remove("gh-forge-ok", "gh-forge-fail");
  anvil.classList.add("gh-forging");
  fill.style.transition = "none";
  fill.style.width = "0%";
  const t0 = performance.now();
  const DUR = 1100;
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / DUR);
    fill.style.width = (k * 100).toFixed(1) + "%";
    if (k < 1) requestAnimationFrame(step);
    else onEnd();
  };
  requestAnimationFrame(step);
}

// som via Web Audio (sem assets): acorde ascendente = sucesso; grave grave = falha.
let _forgeAC: AudioContext | null = null;
function playForge(success: boolean) {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    _forgeAC = _forgeAC || new AC();
    const ac = _forgeAC;
    if (ac.state === "suspended") ac.resume();
    const t0 = ac.currentTime;
    const beep = (freq: number, at: number, dur: number, type: OscillatorType, vol: number) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t0 + at);
      g.gain.setValueAtTime(0.0001, t0 + at);
      g.gain.exponentialRampToValueAtTime(vol, t0 + at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
      o.connect(g).connect(ac.destination);
      o.start(t0 + at);
      o.stop(t0 + at + dur + 0.02);
    };
    if (success) {
      // martelada + acorde brilhante subindo (forja concluída)
      beep(180, 0, 0.09, "square", 0.16);
      beep(523.25, 0.08, 0.14, "triangle", 0.2); // C5
      beep(659.25, 0.2, 0.16, "triangle", 0.2); // E5
      beep(987.77, 0.34, 0.32, "triangle", 0.22); // B5
    } else {
      // zumbido grave descendente (falhou)
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(220, t0);
      o.frequency.exponentialRampToValueAtTime(70, t0 + 0.45);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
      o.connect(g).connect(ac.destination);
      o.start(t0);
      o.stop(t0 + 0.52);
    }
  } catch { /* áudio indisponível: silencioso */ }
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
}

export interface HUD {
  setPrompt(text: string | null): void;
  showDialogue(name: string, text: string, portrait?: string | null): void;
  hideDialogue(): void;
  // toca o golpe da arma equipada; retorna o instante (ms) do impacto p/ o dano
  // cair sincronizado, ou -1 se não golpeou (sem arma / em recarga).
  swingWeapon(): number;
  setHealth(frac: number): void; // 0..1 — barra de vida do jogador
  setMana(frac: number): void; // 0..1 — barra de mana do jogador
  flashDamage(): void; // vinheta vermelha ao levar dano
  setStats(s: CharStats): void; // atualiza a janela de equipamentos/atributos
  setInventory(ids: string[]): void; // enche a mochila com esses itens
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
  // barra de conjuração: mostra `name` e enche em `ms`. cancelCast() esconde antes.
  castBar(name: string, ms: number): void;
  cancelCast(): void;
  // FERREIRO: abre/atualiza a janela de aprimoramento (ou fecha)
  openSmith(data: SmithData): void;
  closeSmith(): void;
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

export interface MinimapState {
  cols: number;
  rows: number;
  cells: Uint8Array; // 1 = caminhável, 0 = parede/prédio (comprimento cols*rows)
  col: number;
  row: number;
  dc: number; // vetor da direção que o herói encara (célula)
  dr: number;
}

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
  const MINI_RADIUS = 4; // células visíveis ao redor do jogador (janela 2R+1)

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
  const bigOpen = () => !bigMap.classList.contains("gh-bigmap-hidden");
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
    ctx.beginPath();
    ctx.moveTo(rad, 0);
    ctx.lineTo(-rad * 0.7, rad * 0.62);
    ctx.lineTo(-rad * 0.7, -rad * 0.62);
    ctx.closePath();
    ctx.fillStyle = "#ffd964";
    ctx.shadowColor = "rgba(255,210,90,.9)";
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.restore();
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
    // herói SEMPRE no centro exato da janela (célula central)
    const pc = off + R * cell + Math.floor(cell / 2);
    drawArrow(ctx, pc, pc, Math.max(4, cell * 0.42), Math.atan2(s.dr, s.dc));
  };
  // mapa GRANDE: o local inteiro cabendo na tela (estilo PoE/Diablo)
  const drawBig = (s: MinimapState) => {
    const ctx = bigCtx;
    if (!ctx) return;
    const W = bigCanvas.width, H = bigCanvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0b0d12";
    ctx.fillRect(0, 0, W, H);
    const pad = 12;
    const cell = Math.max(3, Math.floor(Math.min((W - 2 * pad) / s.cols, (H - 2 * pad) / s.rows)));
    const gw = cell * s.cols, gh = cell * s.rows;
    const ox = Math.round((W - gw) / 2), oy = Math.round((H - gh) / 2);
    for (let r = 0; r < s.rows; r++)
      for (let c = 0; c < s.cols; c++) {
        ctx.fillStyle = s.cells[r * s.cols + c] ? "#5a6675" : "#171b22";
        ctx.fillRect(ox + c * cell, oy + r * cell, cell - 1, cell - 1);
      }
    drawArrow(ctx, ox + s.col * cell + cell / 2, oy + s.row * cell + cell / 2, Math.max(6, cell * 0.75), Math.atan2(s.dr, s.dc));
  };
  const openBigMap = () => {
    bigMap.classList.remove("gh-bigmap-hidden");
    if (lastMini) drawBig(lastMini);
  };
  const closeBigMap = () => bigMap.classList.add("gh-bigmap-hidden");
  mapExpand.addEventListener("click", (e) => { e.preventDefault(); openBigMap(); });
  (bigMap.querySelector("#gh-bigmap-close") as HTMLElement).addEventListener("click", (e) => { e.preventDefault(); closeBigMap(); });
  bigMap.addEventListener("click", (e) => { if (e.target === bigMap) closeBigMap(); });
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyM") { e.preventDefault(); bigOpen() ? closeBigMap() : openBigMap(); }
    else if (e.code === "Escape") closeBigMap();
  });

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

  // ---- FERREIRO: janela de aprimoramento (reforço +N) ----
  const sm = document.createElement("div");
  sm.id = "gh-sm";
  sm.className = "gh-eq-hidden";
  sm.innerHTML = '<div id="gh-sm-win"><button id="gh-sm-close" title="Fechar">✕</button><div id="gh-sm-body"></div></div>';
  root.appendChild(sm);
  const smBody = sm.querySelector("#gh-sm-body") as HTMLElement;
  (sm.querySelector("#gh-sm-close") as HTMLElement).addEventListener("click", (e) => {
    e.preventDefault(); sm.classList.add("gh-eq-hidden");
  });
  const renderSmith = (d: SmithData) => {
    // material: slot (só o ícone) + números FORA do container (embaixo)
    const mat = (emoji: string, need: number, have: number, cap: string, gold = false) => {
      const ok = have >= need;
      const inner = gold ? `<img src="${coinUrl}" alt=""/>` : emoji;
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
        '<div class="gh-sm-anvil" id="gh-sm-anvil">' +
        `<img class="gh-sm-sword-base" src="${loadSwordUrl}" alt=""/>` +
        '<div class="gh-sm-sword-fill"><div class="gh-sm-sword-lava"></div></div></div>' +
        '<div class="gh-sm-col"><div class="gh-sm-lbl">RESULTADO</div>' + slot(s.icon, s.lvl + 1, true) +
        `<div class="gh-sm-nm gh-up">${s.name} +${s.lvl + 1}</div><div class="gh-sm-dmg">Dano <span class="gh-g">${n.dmg} ▲</span></div></div>` +
        "</div>" +
        '<div class="gh-sm-mats-h">MATERIAIS NECESSÁRIOS</div><div class="gh-sm-mats">' +
        mat("🪵", n.madeira, d.mats.madeira, "Madeira") +
        mat("🪨", n.minerio, d.mats.minerio, "Minério") +
        mat("🔶", n.reforco, d.mats.reforco, "Pedra de Reforço") +
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
          if (res.success) {
            playForge(true);
            anvil.classList.add("gh-forge-ok");
            setTimeout(() => renderSmith(res.data), 620);
          } else {
            playForge(false);
            anvil.classList.add("gh-forge-fail");
            // a espada volta a ficar escura (esvazia).
            fill.style.transition = "width .4s ease-in";
            fill.style.width = "0%";
            setTimeout(() => renderSmith(res.data), 950);
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
    } else if (e.code === "Escape") {
      closeEq();
    }
  });
  // vinheta vermelha ao levar dano
  const dmgFx = document.createElement("div");
  dmgFx.id = "gh-dmg";
  root.appendChild(dmgFx);

  // toast (mensagem flutuante — ex.: subir de nível)
  const toastEl = document.createElement("div");
  toastEl.id = "gh-toast";
  root.appendChild(toastEl);

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
    '<div class="gh-dlg-hint">toque para continuar ▸</div>' +
    "</div>";
  dlg.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    onAction("interact");
  });
  pad.appendChild(dlg);
  const dlgName = dlg.querySelector(".gh-dlg-name") as HTMLElement;
  const dlgText = dlg.querySelector(".gh-dlg-text") as HTMLElement;
  const dlgPortrait = dlg.querySelector(".gh-dlg-portrait") as HTMLImageElement;

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
    showDialogue(name: string, text: string, portrait?: string | null) {
      dlgName.textContent = name;
      dlgText.textContent = text;
      if (portrait) {
        dlgPortrait.src = portrait;
        dlgPortrait.style.display = "block";
      } else {
        dlgPortrait.removeAttribute("src");
        dlgPortrait.style.display = "none";
      }
      dlg.style.display = "flex";
      prompt.style.display = "none";
    },
    hideDialogue() {
      dlg.style.display = "none";
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
      const sr = (label: string, val: string | number) =>
        `<div class="gh-sec-row"><span>${label}</span><b>${val}</b></div>`;
      eqStats.innerHTML =
        `<div class="gh-eq-lvl">Nível ${s.level}` +
        `<div class="gh-xp"><div class="gh-xp-fill" style="width:${xpFrac * 100}%"></div></div></div>` +
        `<div class="gh-alloc-pts${s.points > 0 ? " gh-pts-on" : ""}">Pontos a distribuir: <b>${s.points}</b></div>` +
        '<div class="gh-prim-box">' +
        prim("Força", "str", s.str, s.strMin) +
        prim("Destreza", "dex", s.dex, s.dexMin) +
        prim("Inteligência", "int", s.int, s.intMin) +
        "</div>" +
        '<div class="gh-sec-blocks">' +
        '<div class="gh-sec-col"><h4>⚔️ Ofensivo</h4>' +
        sr("Atq. Físico", s.atk) +
        sr("Atq. Mágico", s.atkMag) +
        sr("Crítico", s.crit + "%") +
        sr("Dano Crít.", s.critDmg + "%") +
        sr("Precisão", s.precision + "%") +
        "</div>" +
        '<div class="gh-sec-col"><h4>🛡️ Defensivo</h4>' +
        sr("Vida", `${s.hp}/${s.hpMax}`) +
        sr("Defesa", s.def) +
        sr("Res. Mágica", s.magRes) +
        sr("Evasão", s.evasion + "%") +
        "</div>" +
        '<div class="gh-sec-col"><h4>🔷 Recursos</h4>' +
        sr("Mana", `${s.mp}/${s.mpMax}`) +
        sr("Ouro", s.gold) +
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
    position:fixed; right:6%; bottom:-4%;
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
    position:fixed; right:0%; bottom:-6%;
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
  /* NO LUGAR DA SETINHA: a espada do loading, apagada; enche esq→dir ao aprimorar */
  /* margin-top centraliza a espada na ALTURA dos dois slots (rótulo + gap + meio-slot) */
  .gh-sm-anvil { position:relative; align-self:flex-start; flex:0 0 auto; width:clamp(44px,8.6vh,72px); aspect-ratio:332/81;
    margin-top:calc(clamp(10px,1.5vh,12px) + 3px + (clamp(58px,10vh,84px) - clamp(44px,8.6vh,72px) * 0.244) / 2); }
  .gh-sm-sword-base { width:100%; height:100%; display:block; filter:brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000); transition:filter .3s; }
  .gh-sm-sword-fill { position:absolute; left:0; top:0; bottom:0; width:0%; overflow:hidden; }
  .gh-sm-sword-lava {
    position:absolute; left:0; top:0; height:100%; width:clamp(44px,8.6vh,72px);
    -webkit-mask:url(${loadSwordUrl}) left center / 100% 100% no-repeat;
    mask:url(${loadSwordUrl}) left center / 100% 100% no-repeat;
    background:
      radial-gradient(60% 150% at 22% 32%, rgba(255,246,180,.60), transparent 55%),
      radial-gradient(48% 160% at 58% 70%, rgba(255,150,44,.60), transparent 60%),
      radial-gradient(42% 150% at 84% 42%, rgba(255,104,26,.55), transparent 62%),
      linear-gradient(90deg,#5c1604 0,#b8360d 32%,#ee6a1c 60%,#ffab3e 82%,#ffe27f 95%,#fff6cf 100%);
    background-size:170% 210%,200% 240%,220% 200%,100% 100%; background-repeat:no-repeat;
  }
  .gh-sm-anvil.gh-forging, .gh-sm-anvil.gh-forge-ok { animation:gh-smglow 1.2s ease-in-out infinite; }
  .gh-sm-anvil.gh-forging .gh-sm-sword-lava, .gh-sm-anvil.gh-forge-ok .gh-sm-sword-lava { animation:gh-smlava 2.6s ease-in-out infinite; }
  .gh-sm-anvil.gh-forge-ok .gh-sm-sword-base { filter:brightness(1) drop-shadow(0 0 9px rgba(255,196,90,.95)); }
  .gh-sm-anvil.gh-forge-fail { animation:gh-smshake .4s ease-in-out 1; }
  @keyframes gh-smlava {
    0%   { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
    50%  { background-position:46% 66%, 44% 34%, 72% 58%, 0 0; }
    100% { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
  }
  @keyframes gh-smglow {
    0%,100% { filter:drop-shadow(0 0 8px rgba(255,120,32,.8)) drop-shadow(0 0 3px rgba(255,220,120,.85)); }
    50%     { filter:drop-shadow(0 0 14px rgba(255,150,50,.95)) drop-shadow(0 0 6px rgba(255,236,150,1)); }
  }
  @keyframes gh-smshake { 0%,100%{ transform:translateX(0); } 25%{ transform:translateX(-3px); } 75%{ transform:translateX(3px); } }
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
  /* INVENTÁRIO em escala reduzida (20 slots, 5 col) — cabe inteiro, sem rolar.
     gap/fundo mais fortes p/ as SEPARAÇÕES dos slots ficarem nítidas. */
  .gh-sm-sec-inv { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; }
  .gh-sm-bag { grid-template-columns:repeat(5, minmax(0, clamp(36px,7.6vh,58px))); justify-content:center; width:auto; margin:0 auto;
    gap:2px; background:rgba(201,162,39,.34); border-color:rgba(201,162,39,.5); }
  .gh-sm-cell { cursor:pointer; box-shadow:inset 0 0 0 1px rgba(201,162,39,.22); }
  .gh-sm-badge { position:absolute; right:2px; bottom:1px; font-family:"Cinzel",serif; font-size:clamp(9px,1.35vh,12px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:5px; padding:0 4px; line-height:1.25; box-shadow:0 1px 2px #000; }
  .gh-sm-sel { background:rgba(40,32,16,.95); box-shadow:inset 0 0 0 2px #f4d873, 0 0 12px 2px rgba(244,216,115,.7); }
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
  @media (min-width: 900px) {
    .gh-btn { opacity:0.75; }
    .gh-act { opacity:0.5; }
    .gh-act.gh-act-on { opacity:1; }
  }
  `;
  document.head.appendChild(s);
}
