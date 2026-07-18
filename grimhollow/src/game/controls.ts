import { MOVE_MS } from "./config";
import hudPlateUrl from "../assets/ui/hud_plate.png";
import eqFrameUrl from "../assets/ui/eq_frame.png";
import eqSlotUrl from "../assets/ui/eq_slot.png";

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
}

export interface HUD {
  setPrompt(text: string | null): void;
  showDialogue(name: string, text: string, portrait?: string | null): void;
  hideDialogue(): void;
  swingWeapon(): void; // toca a animação de golpe da arma
  setHealth(frac: number): void; // 0..1 — barra de vida do jogador
  setMana(frac: number): void; // 0..1 — barra de mana do jogador
  flashDamage(): void; // vinheta vermelha ao levar dano
  setStats(s: CharStats): void; // atualiza a janela de equipamentos/atributos
}

// Teclado (desktop) + botões na tela (mobile).
export function setupControls(
  root: HTMLElement,
  onAction: (a: Action) => void,
  weaponUrl?: string,
  weaponAtkUrl?: string, // 2º sprite (pose de golpe); opcional
): HUD {
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

  // ---- janela de equipamentos / personagem ----
  // botão de abrir (canto superior direito)
  const charBtn = document.createElement("button");
  charBtn.id = "gh-char-btn";
  charBtn.title = "Personagem (C)";
  charBtn.textContent = "🛡";
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
  const slotHtml = (s: { key: string; label: string; gc: string; gr: string }) =>
    `<div class="gh-slot" data-slot="${s.key}" style="grid-column:${s.gc};grid-row:${s.gr}">` +
    `<span class="gh-slot-cap">${s.label}</span></div>`;
  // mochila (grade simples estilo WoW): 20 slots quadrados, reutilizando a MESMA
  // arte do slot (9-slice). Cada slot guarda 1 item; consumíveis empilham (badge).
  const BAG_SLOTS = 20;
  const bagHtml = Array.from(
    { length: BAG_SLOTS },
    (_, i) => `<div class="gh-slot gh-bag-slot" data-bag="${i}"></div>`,
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
    "</div>" +
    '<div class="gh-eq-body">' +
    '<div class="gh-tabpane" data-pane="equip">' +
    '<div class="gh-section"><div class="gh-sec-head">Equipado</div>' +
    '<div class="gh-eq-doll">' +
    EQ_SLOTS.map(slotHtml).join("") +
    "</div></div>" +
    '<div class="gh-section"><div class="gh-sec-head">Mochila</div>' +
    `<div class="gh-bag">${bagHtml}</div></div>` +
    "</div>" +
    '<div class="gh-tabpane gh-pane-hidden" data-pane="stats">' +
    '<div class="gh-eq-stats" id="gh-eq-stats"></div>' +
    "</div>" +
    "</div></div></div>";
  root.appendChild(eq);
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

  // ---- botões na tela ----
  const pad = document.createElement("div");
  pad.id = "pad";
  root.appendChild(pad);

  const mkBtn = (label: string, action: Action, cls: string) => {
    const b = document.createElement("button");
    b.className = "gh-btn " + cls;
    b.textContent = label;
    let iv: number | undefined;
    const start = (e: Event) => {
      e.preventDefault();
      onAction(action);
      // manter pressionado repete (o jogo ignora enquanto anima)
      iv = window.setInterval(() => onAction(action), MOVE_MS);
    };
    const stop = () => {
      if (iv) window.clearInterval(iv);
      iv = undefined;
    };
    b.addEventListener("pointerdown", start);
    b.addEventListener("pointerup", stop);
    b.addEventListener("pointerleave", stop);
    b.addEventListener("pointercancel", stop);
    b.addEventListener("contextmenu", (e) => e.preventDefault());
    return b;
  };

  // pad de movimento (direita)
  const move = document.createElement("div");
  move.className = "gh-cluster gh-move";
  move.appendChild(mkBtn("▲", "forward", "gh-fwd"));
  move.appendChild(mkBtn("⟲", "turnLeft", "gh-tl"));
  move.appendChild(mkBtn("▼", "back", "gh-back"));
  move.appendChild(mkBtn("⟳", "turnRight", "gh-tr"));
  pad.appendChild(move);

  // strafe (esquerda)
  const strafe = document.createElement("div");
  strafe.className = "gh-cluster gh-strafe";
  strafe.appendChild(mkBtn("◄", "strafeLeft", "gh-sl"));
  strafe.appendChild(mkBtn("►", "strafeRight", "gh-sr"));
  pad.appendChild(strafe);

  // botão de interação (não repete)
  const act = document.createElement("button");
  act.className = "gh-btn gh-act";
  act.textContent = "✋";
  const tapAct = (e: Event) => {
    e.preventDefault();
    onAction("interact");
  };
  act.addEventListener("pointerdown", tapAct);
  act.addEventListener("contextmenu", (e) => e.preventDefault());
  pad.appendChild(act);

  // botão de ataque (só aparece quando há arma equipada)
  let atkBtn: HTMLButtonElement | null = null;
  if (weaponUrl) {
    atkBtn = document.createElement("button");
    atkBtn.className = "gh-btn gh-atk";
    atkBtn.textContent = "⚔";
    const tapAtk = (e: Event) => {
      e.preventDefault();
      onAction("attack");
    };
    atkBtn.addEventListener("pointerdown", tapAtk);
    atkBtn.addEventListener("contextmenu", (e) => e.preventDefault());
    pad.appendChild(atkBtn);
  }

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
      const xpFrac = s.xpMax > 0 ? Math.max(0, Math.min(1, s.xp / s.xpMax)) : 0;
      const row = (label: string, val: string) =>
        `<div class="gh-stat"><span>${label}</span><b>${val}</b></div>`;
      eqStats.innerHTML =
        `<div class="gh-eq-lvl">Nível ${s.level}` +
        `<div class="gh-xp"><div class="gh-xp-fill" style="width:${xpFrac * 100}%"></div></div></div>` +
        '<div class="gh-stat-cols">' +
        row("Vida", `${s.hp}/${s.hpMax}`) +
        row("Mana", `${s.mp}/${s.mpMax}`) +
        row("Ataque", `${s.atk}`) +
        row("Defesa", `${s.def}`) +
        row("Força", `${s.str}`) +
        row("Destreza", `${s.dex}`) +
        row("Inteligência", `${s.int}`) +
        row("Ouro", `${s.gold}`) +
        "</div>";
    },
    flashDamage() {
      dmgFx.style.animation = "none";
      void dmgFx.offsetWidth;
      dmgFx.style.animation = "gh-dmg 360ms ease-out";
    },
    swingWeapon() {
      if (!weapon || swinging) return; // cooldown: ignora enquanto golpeia
      swinging = true;
      swingTimers.forEach((t) => window.clearTimeout(t));
      swingTimers.length = 0;
      // (re)inicia uma animação CSS num elemento, forçando reflow
      const play = (el: HTMLElement, name: string, ms: number) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = `${name} ${ms}ms ease-out forwards`;
      };
      if (!canvasEl) canvasEl = root.querySelector("canvas");
      const rig = weaponRig!; // recebe a rotação 3D do golpe (o corte vai junto)
      // As 3 fases são disparadas por timers no MESMO relógio, então o corte, o
      // clarão e o tranco de câmera ficam travados no instante exato do golpe.
      // Fase 1 (0ms): armar — recua, encolhe e inclina a lâmina PRA TRÁS (3D)
      play(rig, "gh-windup", 100);
      // Fase 2 (100ms): golpe — a lâmina AVANÇA pra dentro da cena (3D + escala),
      // com borrão de velocidade, arco de corte, clarão e tranco de câmera
      swingTimers.push(
        window.setTimeout(() => {
          if (weaponAtk) {
            weapon!.style.opacity = "0";
            weaponAtk.style.opacity = "1";
            play(weaponAtk, "gh-slashpose", 190);
          } else {
            play(rig, "gh-slashonly", 200);
          }
          // o rastro só pisca (opacidade); a POSIÇÃO dele acompanha a lâmina
          // porque ele está dentro do rig que está girando
          if (slashFx) play(slashFx, "gh-slash-fade", 200);
          if (impactFx) play(impactFx, "gh-flash", 200);
          if (canvasEl) play(canvasEl, "gh-kick", 220);
        }, 100),
      );
      // Fase 3 (290ms): recolher de volta ao descanso
      swingTimers.push(
        window.setTimeout(() => {
          if (weaponAtk) {
            weaponAtk.style.opacity = "0";
            weapon!.style.opacity = "1";
          }
          play(rig, "gh-recover", 190);
        }, 290),
      );
      // Fim da animação (490ms): limpa
      swingTimers.push(
        window.setTimeout(() => {
          rig.style.animation = "";
          if (weaponAtk) weaponAtk.style.animation = "";
          if (slashFx) slashFx.style.animation = "";
          if (impactFx) impactFx.style.animation = "";
          if (canvasEl) canvasEl.style.animation = "";
        }, 490),
      );
      // Cooldown do ataque (mais lento): só libera o próximo golpe aqui
      swingTimers.push(
        window.setTimeout(() => {
          swinging = false;
        }, 820),
      );
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
  /* placa de status (vida + mana) — arte com encaixes preenchidos por código */
  #gh-hud {
    position:fixed; left:12px; top:10px; z-index:11; pointer-events:none;
    width:min(238px,44vw); aspect-ratio:793 / 336;
    background:url(${hudPlateUrl}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 2px 5px rgba(0,0,0,.55));
  }
  .gh-hud-bar {
    position:absolute; left:19.2%; width:72.2%; overflow:hidden;
    border-radius:999px;
  }
  .gh-hud-hp { top:22.9%; height:17.6%; }
  .gh-hud-mp { top:56.9%; height:17.3%; }
  .gh-hud-fill {
    height:100%; width:100%;
    transition:width .28s ease, background .28s ease;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.3), inset 0 -3px 5px rgba(0,0,0,.4);
  }
  .gh-hud-hp-fill { background:linear-gradient(#e35d4c,#b3241a); }
  .gh-hud-mp-fill { background:linear-gradient(#57b0e8,#1c5fb3); }

  /* botão de abrir a janela de personagem */
  #gh-char-btn {
    position:fixed; right:14px; top:12px; z-index:12; pointer-events:auto;
    width:46px; height:46px; border-radius:10px; font-size:22px; cursor:pointer;
    background:rgba(20,16,11,.72); color:#e8d9b0;
    border:2px solid rgba(201,162,39,.6); box-shadow:0 2px 8px rgba(0,0,0,.5);
    display:flex; align-items:center; justify-content:center;
  }
  #gh-char-btn:active { transform:scale(.94); }
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
  #gh-eq-inner {
    width:100%; height:100%;
    display:flex; flex-direction:column; gap:1.4%;
    color:#e8dcc0; font-family:inherit; overflow:hidden;
  }
  .gh-eq-title {
    text-align:center; font-size:clamp(14px,2.2vh,21px); letter-spacing:1px;
    color:#f0e2bd; text-shadow:0 2px 4px rgba(0,0,0,.7);
  }
  /* abas (Equipamento / Atributos) */
  .gh-eq-tabs { display:flex; gap:8px; justify-content:center; }
  .gh-tab {
    padding:4px 14px; cursor:pointer; border-radius:7px;
    font-size:clamp(11px,1.6vh,14px); font-family:inherit;
    background:rgba(20,16,11,.5); color:#c9b98c; border:1px solid rgba(201,162,39,.4);
  }
  .gh-tab-on { background:rgba(201,162,39,.24); color:#f6ead0; border-color:rgba(201,162,39,.7); }
  .gh-eq-body { flex:1; min-height:0; overflow-y:auto; overflow-x:hidden; padding-right:2px; }
  .gh-tabpane { display:flex; flex-direction:column; gap:2.4%; }
  .gh-pane-hidden { display:none; }
  /* CAIXAS que separam "Equipado" da "Mochila" (o jogador distingue as áreas) */
  .gh-section {
    background:rgba(6,4,3,.34); border:1px solid rgba(201,162,39,.3);
    border-radius:11px; padding:2.4% 3% 3.4%;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.05), 0 2px 6px rgba(0,0,0,.35);
  }
  .gh-sec-head {
    text-align:center; font-size:clamp(11px,1.7vh,15px); color:#d8c79a;
    letter-spacing:.5px; margin-bottom:2.4%; text-shadow:0 1px 3px rgba(0,0,0,.6);
  }
  /* grade "boneco" 8×6 (célula quadrada via aspect-ratio) — disposição PoE */
  .gh-eq-doll {
    display:grid; grid-template-columns:repeat(8,1fr); grid-template-rows:repeat(6,1fr);
    gap:clamp(3px,0.8vh,6px); width:88%; aspect-ratio:4 / 3; margin:0 auto;
  }
  /* mochila (grade simples de itens, estilo WoW) — slots um pouco menores */
  .gh-bag {
    display:grid; grid-template-columns:repeat(5,1fr); gap:clamp(3px,0.7vh,5px);
    width:100%; margin:0 auto;
  }
  .gh-bag-slot { aspect-ratio:1; position:relative; border-width:clamp(4px,0.85vh,7px); }
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
  .gh-slot-cap {
    font-size:clamp(7px,1.15vh,11px); color:#c9b98c;
    opacity:.78; line-height:1.05; text-align:center; padding:1px;
  }
  .gh-eq-stats {
    background:rgba(12,9,6,.5); border:1px solid rgba(201,162,39,.35);
    border-radius:8px; padding:3.5% 5%;
  }
  .gh-eq-lvl {
    text-align:center; font-size:clamp(12px,1.9vh,17px); color:#f0e2bd; margin-bottom:6px;
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
  .gh-btn {
    pointer-events:auto; position:absolute;
    width:60px; height:60px; border-radius:12px;
    background:rgba(28,22,16,0.62); color:#e8d9b4;
    border:2px solid rgba(201,162,39,0.5);
    font-size:26px; line-height:1; font-family:inherit;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 3px 10px rgba(0,0,0,0.5); cursor:pointer;
    touch-action:none;
  }
  .gh-btn:active { background:rgba(201,162,39,0.55); transform:scale(0.94); }
  .gh-move { right:20px; bottom:24px; width:190px; height:190px; }
  .gh-fwd  { right:65px; bottom:120px; }
  .gh-back { right:65px; bottom:0px; }
  .gh-tl   { right:130px; bottom:60px; }
  .gh-tr   { right:0px;   bottom:60px; }
  .gh-strafe { left:20px; bottom:24px; width:140px; height:64px; }
  .gh-sl { left:0px; bottom:0px; }
  .gh-sr { left:70px; bottom:0px; }
  .gh-act {
    left:50%; transform:translateX(-50%); bottom:30px;
    width:66px; height:66px; border-radius:50%; font-size:30px;
    opacity:0.45; transition:opacity .15s, box-shadow .15s;
  }
  .gh-act.gh-act-on {
    opacity:1; border-color:#f0c040;
    box-shadow:0 0 16px rgba(240,192,64,0.6);
  }
  .gh-act:active { transform:translateX(-50%) scale(0.94); }
  /* ataque: acima do pad de movimento, à direita */
  .gh-atk {
    right:78px; bottom:220px;
    width:66px; height:66px; border-radius:50%; font-size:30px;
    color:#f2c9a0; border-color:rgba(200,80,50,0.7);
    background:rgba(60,24,16,0.66);
    box-shadow:0 0 14px rgba(200,70,40,0.35);
  }
  .gh-atk:active { transform:scale(0.9); background:rgba(200,80,50,0.6); }
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
  .gh-dlg-name { color:#f0c040; font-weight:bold; font-size:15px; margin-bottom:4px; }
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
