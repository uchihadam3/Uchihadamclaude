import { MOVE_MS } from "./config";

export type Action =
  | "forward"
  | "back"
  | "turnLeft"
  | "turnRight"
  | "strafeLeft"
  | "strafeRight"
  | "interact"
  | "attack";

export interface HUD {
  setPrompt(text: string | null): void;
  showDialogue(name: string, text: string, portrait?: string | null): void;
  hideDialogue(): void;
  swingWeapon(): void; // toca a animação de golpe da arma
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
  let weapon: HTMLImageElement | null = null; // sprite de descanso
  let weaponAtk: HTMLImageElement | null = null; // sprite de golpe (2º, opcional)
  let slashFx: HTMLElement | null = null;
  let swinging = false;
  const swingTimers: number[] = [];
  if (weaponUrl) {
    weapon = document.createElement("img");
    weapon.id = "gh-weapon";
    weapon.src = weaponUrl;
    weapon.alt = "";
    root.appendChild(weapon);
    if (weaponAtkUrl) {
      weaponAtk = document.createElement("img");
      weaponAtk.id = "gh-weapon-atk";
      weaponAtk.src = weaponAtkUrl;
      weaponAtk.alt = "";
      root.appendChild(weaponAtk);
    }
    // rastro de corte que aparece na ponta da lâmina durante o golpe
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
    root.appendChild(slashFx);
  }

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
      // As 3 fases são disparadas por timers no MESMO relógio, então o arco de
      // corte fica travado no instante exato do golpe (sincronia garantida).
      // Fase 1 (0ms): armar — recua e encolhe
      play(weapon, "gh-windup", 90);
      // Fase 2 (90ms): golpe — troca p/ sprite de golpe (se houver) + arco
      swingTimers.push(
        window.setTimeout(() => {
          if (weaponAtk) {
            weapon!.style.opacity = "0";
            weaponAtk.style.opacity = "1";
            play(weaponAtk, "gh-slashpose", 160);
          } else {
            play(weapon!, "gh-slashonly", 160);
          }
          if (slashFx) play(slashFx, "gh-slash", 150);
        }, 90),
      );
      // Fase 3 (250ms): recolher de volta ao descanso
      swingTimers.push(
        window.setTimeout(() => {
          if (weaponAtk) {
            weaponAtk.style.opacity = "0";
            weapon!.style.opacity = "1";
          }
          play(weapon!, "gh-recover", 180);
        }, 250),
      );
      // Fim (430ms): limpa e libera o cooldown
      swingTimers.push(
        window.setTimeout(() => {
          weapon!.style.animation = "";
          if (weaponAtk) weaponAtk.style.animation = "";
          if (slashFx) slashFx.style.animation = "";
          swinging = false;
        }, 430),
      );
    },
  };
}

function injectStyle() {
  if (document.getElementById("gh-style")) return;
  const s = document.createElement("style");
  s.id = "gh-style";
  s.textContent = `
  /* arma em 1ª pessoa: base à direita, punho no canto inferior */
  #gh-weapon, #gh-weapon-atk {
    position:fixed; right:6%; bottom:-4%;
    height:62vh; max-height:640px; width:auto;
    pointer-events:none; z-index:8;
    transform-origin:72% 92%;
    transform:rotate(16deg) translate(0,2%) scale(1); /* REPOUSO */
    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45));
    will-change:transform, opacity;
  }
  #gh-weapon-atk { z-index:9; opacity:0; } /* sprite de golpe: escondido até o golpe */
  /* O golpe é em 3 fases encadeadas (cada uma começa onde a anterior parou,
     com fill 'forwards'), disparadas por timers no mesmo relógio do arco de
     corte — por isso ficam sincronizadas. Poses de referência:
       REPOUSO  rotate(16)  translate(0,2%)     scale(1)
       ARMAR    rotate(36)  translate(9%,9%)    scale(0.9)
       ESTOCADA rotate(-40) translate(-26%,-7%) scale(1.24)
       SEGUIR   rotate(-24) translate(-14%,6%)  scale(1.06) */
  @keyframes gh-windup {
    0%   { transform:rotate(16deg) translate(0,2%)  scale(1);   }
    100% { transform:rotate(36deg) translate(9%,9%) scale(0.9); }
  }
  @keyframes gh-slashonly { /* sem 2º sprite: gira a mesma espada */
    0%   { transform:rotate(36deg)  translate(9%,9%)    scale(0.9);  }
    55%  { transform:rotate(-40deg) translate(-26%,-7%) scale(1.24); }
    100% { transform:rotate(-24deg) translate(-14%,6%)  scale(1.06); }
  }
  @keyframes gh-slashpose { /* com 2º sprite: varre a pose de golpe pela tela */
    0%   { transform:rotate(24deg)  translate(18%,8%)  scale(1);    opacity:1; }
    45%  { transform:rotate(-12deg) translate(-10%,-4%) scale(1.22); opacity:1; }
    100% { transform:rotate(-34deg) translate(-30%,2%)  scale(1.1);  opacity:0.9; }
  }
  @keyframes gh-recover {
    0%   { transform:rotate(-24deg) translate(-14%,6%) scale(1.06); }
    100% { transform:rotate(16deg)  translate(0,2%)    scale(1);    }
  }
  /* rastro de corte: crescente rápido que pisca junto com a ESTOCADA e
     acompanha a lâmina varrendo p/ a esquerda; vida curta (~150ms) p/ não
     ficar "atrasado" em relação ao golpe */
  #gh-slash {
    position:fixed; right:28%; top:30%;
    width:34vh; height:28vh; max-width:380px; max-height:320px;
    pointer-events:none; z-index:10; opacity:0;
    transform-origin:50% 60%;
    filter:drop-shadow(0 0 7px rgba(180,225,255,0.85));
  }
  #gh-slash svg { width:100%; height:100%; display:block; }
  @keyframes gh-slash {
    0%   { opacity:0;    transform:translate(16%,-8%)  rotate(6deg)  scale(0.55); }
    38%  { opacity:0.95; transform:translate(0,0)      rotate(20deg) scale(1.05); }
    100% { opacity:0;    transform:translate(-20%,10%) rotate(34deg) scale(1.3);  }
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
