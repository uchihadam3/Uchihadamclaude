// Fluxo de abertura: Título → Criação de personagem → Loading (pré-carrega TODOS
// os assets) → resolve com o personagem escolhido. As telas são overlays em HTML.
import { CLASSES, CLASS_BY_ID, type GameClass, type Character } from "./classes";
import { WEAPON_BY_ID } from "./weapons";
import { derive, START_POINTS, type Primaries } from "./stats";
import { audio } from "./audio";
import eqContainerUrl from "../assets/ui/eq_container.png";
// TRILHA DO PRÓLOGO — placeholder silencioso; troque o arquivo por sua música
// (mesmo nome) que ela toca sozinha na abertura. Canal "música" (volume/mudo).
import prologueBgmUrl from "../assets/audio/bgm_prologue.mp3";

// Key art do título (PNG). O logo/menu ficam por cima; a arte é sem texto.
import titleArtUrl from "../assets/ui/title_bg.png";
import createBgUrl from "../assets/ui/create_bg.png";
import menuPlateUrl from "../assets/ui/menu_plate.png";
import logoPlateArt from "../assets/ui/logo_plate.png";
import loadSwordUrl from "../assets/ui/load_sword.png";
import iconGuerreiro from "../assets/ui/class_icon_guerreiro.png";
import iconLadino from "../assets/ui/class_icon_ladino.png";
import iconMago from "../assets/ui/class_icon_mago.png";
import iconClerigo from "../assets/ui/class_icon_clerigo.png";
const TITLE_ART: string | null = titleArtUrl;
// emblema (medalhão) de cada classe — entra nas abas e no nome
const CLASS_ICON: Record<string, string> = {
  guerreiro: iconGuerreiro,
  ladino: iconLadino,
  mago: iconMago,
  clerigo: iconClerigo,
};

export function runIntro(root: HTMLElement): Promise<Character> {
  injectStyle();
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.id = "gh-intro";
    root.appendChild(overlay);

    // TRILHA da abertura (crawl + título) — canal "música"; só toca após um
    // gesto do usuário (o "toque para começar" libera o autoplay do navegador).
    let openBgm: HTMLAudioElement | null = null;
    const startMusic = () => {
      if (openBgm) return;
      openBgm = new Audio(prologueBgmUrl);
      openBgm.loop = true;
      audio.register(openBgm, "music", 0.7);
      openBgm.play().catch(() => { /* autoplay bloqueado: ignora */ });
    };
    const stopMusic = () => {
      if (!openBgm) return;
      try { openBgm.pause(); openBgm.currentTime = 0; } catch { /* ignora */ }
      openBgm = null;
    };

    const finish = (char: Character) => {
      stopMusic();
      overlay.remove();
      resolve(char);
    };
    const toAlloc = (cls: GameClass, name: string) =>
      showAllocate(overlay, cls, name, finish, () =>
        showCreate(overlay, toAlloc, cls.id, name),
      );

    // BOOT (pré-carrega tudo; ao fim, "toque para começar" NA MESMA tela, sobre a
    // espada forjada — o gesto libera a música) → ABERTURA (crawl → título) → Criação.
    let frac = 0;
    const all = preloadUrls(allAssetUrls(), (f) => (frac = f));
    showLoading(overlay, () => frac, all, 900, () => {
      startMusic();
      showOpening(overlay, () => { stopMusic(); showCreate(overlay, toAlloc); });
    });
  });
}

// ------------------------------------------- ABERTURA: crawl vertical → TÍTULO
// Uma arte vertical alta sobe devagar; a narração sobe junto por cima (com a
// música). Ao chegar ao topo, o texto some e o TÍTULO surge (logo + Começar),
// tudo sobre o mesmo fundo — contínuo, estilo Symphony of the Night.
function showOpening(overlay: HTMLElement, onNew: () => void) {
  const paras = [
    "Dizem os anciãos que Grimhollow nem sempre viveu sob a bruma. Houve um tempo em que o sol tocava os telhados e a estrada da montanha fervilhava de vozes e mercadores.",
    "Mas isso foi antes do Selo — antes que os fundadores enterrassem, nas entranhas da montanha, aquilo que nenhuma boca ousa nomear.",
    "O que jaz lá embaixo não é morte; é fome. Chamam-na de Nethergloam — a névoa que devora. Ela rouba o calor, apaga os nomes e não deixa os mortos dormirem.",
    "Enquanto o Selo resistir, a bruma apenas ronda os muros, paciente e faminta. Mas o ferro envelhece, e a cada lua ela conquista mais um palmo de mundo.",
    "Então, pela estrada que ninguém ousa cruzar, chega um forasteiro. Sobreviveu à névoa inteira — mas deixou nela, em algum ponto, pedaços da própria memória.",
  ];
  // arte do crawl — PLACEHOLDER (chave de título) até chegar a peça vertical alta (pro_crawl.png)
  const crawlImg = titleArtUrl;
  const flourish = '<svg viewBox="0 0 260 14" preserveAspectRatio="xMidYMid meet"><g fill="#c9a24a"><circle cx="7" cy="7" r="2.6"/><rect x="15" y="6.1" width="97" height="1.8" rx="0.9"/><path d="M130 1 L138 7 L130 13 L122 7 Z"/><rect x="148" y="6.1" width="97" height="1.8" rx="0.9"/><circle cx="253" cy="7" r="2.6"/></g></svg>';
  overlay.innerHTML = `
    <div class="gh-screen gh-crawl">
      <div class="gh-crawl-bg" id="gh-crawl-bg" style="background-image:url(${crawlImg})"></div>
      <div class="gh-crawl-shade"></div>
      <div class="gh-crawl-textwrap" id="gh-crawl-tw"><div class="gh-crawl-text" id="gh-crawl-text">
        ${paras.map((p) => `<p>${p}</p>`).join("")}
        <div class="gh-crawl-end">⚜</div>
      </div></div>
      <div class="gh-open-title" id="gh-open-title">
        <img class="gh-logo-img" src="${logoPlateArt}" alt="Nethergloam" />
        <div class="gh-flourish">${flourish}</div>
        <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
        <div class="gh-menu">
          <button class="gh-menu-btn" id="gh-btn-new">Começar</button>
          <button class="gh-menu-btn gh-disabled" disabled title="Em breve">Continuar</button>
        </div>
      </div>
      <button class="gh-pro-skip" id="gh-pro-skip">Pular ▸</button>
    </div>`;
  const bg = overlay.querySelector("#gh-crawl-bg") as HTMLElement;
  const text = overlay.querySelector("#gh-crawl-text") as HTMLElement;
  const tw = overlay.querySelector("#gh-crawl-tw") as HTMLElement;
  const titleEl = overlay.querySelector("#gh-open-title") as HTMLElement;
  const skip = overlay.querySelector("#gh-pro-skip") as HTMLElement;
  let revealed = false;
  let timer = 0;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    window.clearTimeout(timer);
    bg.style.animation = "none";                 // congela o fundo no topo da arte
    bg.style.backgroundPosition = "center 0%";
    tw.style.display = "none";                    // some o texto (subiu até o fim)
    skip.style.display = "none";
    titleEl.classList.add("show");               // surge o título (logo + Começar)
    (overlay.querySelector("#gh-btn-new") as HTMLElement).addEventListener("click", onNew);
  };
  text.addEventListener("animationend", reveal); // acabou a subida → revela o título
  skip.addEventListener("click", (e) => { e.stopPropagation(); reveal(); });
  timer = window.setTimeout(reveal, 24000);       // trava de segurança
}

// ------------------------------------------------------ CRIAÇÃO DE PERSONAGEM
// Passo 1: escolha da classe. "Continuar" leva ao passo 2 (distribuição de pontos).
function showCreate(
  overlay: HTMLElement,
  onChosen: (cls: GameClass, name: string) => void,
  initialId?: string,
  initialName?: string,
) {
  let sel: GameClass = (initialId && CLASS_BY_ID[initialId]) || CLASSES[0];
  overlay.innerHTML = `
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${CLASSES.map(
          (c) =>
            `<button class="gh-class-tab${c.id === sel.id ? " on" : ""}" data-id="${c.id}"><img class="gh-tab-ico" src="${CLASS_ICON[c.id]}" alt=""/><span>${c.name}</span></button>`,
        ).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" value="${initialName ? initialName.replace(/"/g, "&quot;") : ""}" />
        <button class="gh-menu-btn" id="gh-btn-start">Continuar ▸</button>
      </div>
    </div>`;
  const main = overlay.querySelector("#gh-class-main") as HTMLElement;
  const render = (c: GameClass) => (main.innerHTML = classCard(c));
  render(sel);

  // PADRONIZA a altura da janela: mede as 4 classes e fixa a MAIOR (Guerreiro) em
  // todas. À prova de fonte/aparelho — mede o layout real renderizado.
  const equalizeHeight = () => {
    main.style.minHeight = "0";
    let max = 0;
    for (const c of CLASSES) {
      main.innerHTML = classCard(c);
      max = Math.max(max, main.getBoundingClientRect().height);
    }
    main.innerHTML = classCard(sel);
    main.style.minHeight = Math.ceil(max) + "px";
  };
  equalizeHeight();
  // remede quando a fonte medieval carregar (muda a quebra de linha) e ao girar a tela
  const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
  if (fonts?.ready) fonts.ready.then(() => { if (main.isConnected) equalizeHeight(); });
  const onResize = () => { if (main.isConnected) equalizeHeight(); };
  window.addEventListener("resize", onResize);
  overlay.querySelectorAll<HTMLElement>(".gh-class-tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      overlay
        .querySelectorAll(".gh-class-tab")
        .forEach((x) => x.classList.toggle("on", x === tab));
      sel = CLASS_BY_ID[tab.dataset.id!];
      render(sel);
    }),
  );
  overlay.querySelector("#gh-btn-start")!.addEventListener("click", () => {
    const nameEl = overlay.querySelector("#gh-name") as HTMLInputElement;
    const name = nameEl.value.trim() || "Herói";
    window.removeEventListener("resize", onResize);
    onChosen(sel, name);
  });
}

// ---------------------------------------- PASSO 2: DISTRIBUIÇÃO DE ATRIBUTOS
// Mesmo enquadramento do cartão de classe (retrato à esquerda), mas o lado direito
// vira a distribuição de pontos com PREVIEW AO VIVO dos secundários.
function showAllocate(
  overlay: HTMLElement,
  cls: GameClass,
  name: string,
  onStart: (c: Character) => void,
  onBack: () => void,
) {
  const base: Primaries = { ...cls.attr };
  const alloc: Primaries = { ...cls.attr };
  overlay.innerHTML = `
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Distribua os Atributos</h2>
      <div class="gh-class-main" id="gh-alloc-main"></div>
      <div class="gh-create-foot">
        <button class="gh-menu-btn gh-menu-btn-sec" id="gh-back">◂ Voltar</button>
        <button class="gh-menu-btn" id="gh-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;
  const main = overlay.querySelector("#gh-alloc-main") as HTMLElement;
  const spent = () =>
    alloc.str - base.str + (alloc.dex - base.dex) + (alloc.int - base.int);
  const renderCard = () => {
    main.innerHTML = allocCard(cls, alloc, base, START_POINTS - spent());
    main.querySelectorAll<HTMLButtonElement>(".gh-pm").forEach((btn) =>
      btn.addEventListener("click", () => {
        const k = btn.dataset.k as keyof Primaries;
        const d = Number(btn.dataset.d);
        if (d < 0 && alloc[k] <= base[k]) return;
        if (d > 0 && spent() >= START_POINTS) return;
        alloc[k] += d;
        renderCard();
      }),
    );
  };
  // TAMANHO FIXO = igual ao painel de seleção de classe. Mede a MAIOR das 4 classes
  // num PROBE fora de tela (com a MESMA largura de moldura e retrato normais, não o
  // retrato estreito do passo de atributos) e trava essa altura no painel.
  const lockToClassHeight = () => {
    const w = main.getBoundingClientRect().width; // largura REAL da moldura (border-box)
    const probe = document.createElement("div");
    probe.className = "gh-class-main";
    probe.style.cssText = `position:absolute; left:-9999px; top:0; visibility:hidden; pointer-events:none; height:auto; width:${w}px;`;
    main.parentElement!.appendChild(probe);
    let mx = 0;
    for (const c of CLASSES) {
      probe.innerHTML = classCard(c);
      mx = Math.max(mx, probe.getBoundingClientRect().height);
    }
    probe.remove();
    main.style.height = Math.ceil(mx) + "px";
    renderCard();
  };
  lockToClassHeight();
  const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
  if (fonts?.ready) fonts.ready.then(() => { if (main.isConnected) lockToClassHeight(); });
  const onResize = () => { if (main.isConnected) lockToClassHeight(); };
  window.addEventListener("resize", onResize);
  overlay.querySelector("#gh-back")!.addEventListener("click", () => {
    window.removeEventListener("resize", onResize);
    onBack();
  });
  overlay.querySelector("#gh-start")!.addEventListener("click", () => {
    window.removeEventListener("resize", onResize);
    onStart({ name, classId: cls.id, attr: { ...alloc } });
  });
}

// cartão da distribuição: retrato + colunas de primários (com +/-) e secundários
function allocCard(
  cls: GameClass,
  alloc: Primaries,
  base: Primaries,
  remaining: number,
): string {
  const art = cls.portrait
    ? `<img class="gh-class-portrait" src="${cls.portrait}" alt="" />`
    : `<div class="gh-class-ph"><div class="gh-ph-emoji">${cls.emoji}</div></div>`;
  const sec = derive(alloc, cls.hp, cls.mp);
  const prim = (label: string, key: keyof Primaries) => {
    const v = alloc[key];
    const up = v - base[key];
    const minus = v <= base[key] ? " disabled" : "";
    const plus = remaining <= 0 ? " disabled" : "";
    return `<div class="gh-prim-row">
      <span class="gh-prim-name">${label}</span>
      <span class="gh-prim-step">
        <button class="gh-pm" data-k="${key}" data-d="-1"${minus}>−</button>
        <b class="gh-prim-val">${v}${up ? `<i class="gh-prim-up">+${up}</i>` : ""}</b>
        <button class="gh-pm" data-k="${key}" data-d="1"${plus}>＋</button>
      </span>
    </div>`;
  };
  const sr = (label: string, val: string | number) =>
    `<div class="gh-sec-row"><span>${label}</span><b>${val}</b></div>`;
  return `
    <div class="gh-class-art">${art}</div>
    <div class="gh-class-info gh-alloc">
      <div class="gh-class-name"><img class="gh-name-ico" src="${CLASS_ICON[cls.id]}" alt=""/>${cls.name}</div>
      <div class="gh-alloc-points">Pontos a distribuir: <b class="${remaining > 0 ? "gh-pts-on" : ""}">${remaining}</b></div>
      <div class="gh-prim">
        ${prim("Força", "str")}
        ${prim("Destreza", "dex")}
        ${prim("Inteligência", "int")}
      </div>
      <div class="gh-sec-blocks">
        <div class="gh-sec-col">
          <h4>⚔️ Ofensivo</h4>
          ${sr("Atq. Físico", sec.atkPhys)}
          ${sr("Atq. Mágico", sec.atkMag)}
          ${sr("Crítico", sec.crit + "%")}
          ${sr("Dano Crít.", sec.critDmg + "%")}
          ${sr("Precisão", sec.precision + "%")}
        </div>
        <div class="gh-sec-col">
          <h4>🛡️ Defensivo</h4>
          ${sr("Vida", sec.hp)}
          ${sr("Defesa", sec.def)}
          ${sr("Res. Mágica", sec.magRes)}
          ${sr("Evasão", sec.evasion + "%")}
        </div>
        <div class="gh-sec-col">
          <h4>🔷 Recursos</h4>
          ${sr("Mana", sec.mp)}
        </div>
      </div>
    </div>`;
}

// cartão da classe (arte + atributos + armas) — a "imagem/png" da classe fica no
// slot .gh-class-art; sem PNG ainda, mostra um placeholder estilizado.
function classCard(c: GameClass): string {
  const art = c.portrait
    ? `<img class="gh-class-portrait" src="${c.portrait}" alt="" />`
    : `<div class="gh-class-ph"><div class="gh-ph-emoji">${c.emoji}</div><div class="gh-ph-txt">arte em breve</div></div>`;
  const bar = (label: string, v: number) =>
    `<div class="gh-attr"><span>${label}</span><div class="gh-attr-bar"><i style="width:${v * 10}%"></i></div><b>${v}</b></div>`;
  const weps = c.weapons
    .map((id) => WEAPON_BY_ID[id]?.name)
    .filter(Boolean)
    .join(" · ");
  return `
    <div class="gh-class-art">${art}</div>
    <div class="gh-class-info">
      <div class="gh-class-name"><img class="gh-name-ico" src="${CLASS_ICON[c.id]}" alt=""/>${c.name}</div>
      <div class="gh-class-tag">${c.tag}</div>
      <p class="gh-class-desc">${c.desc}</p>
      <div class="gh-attrs">
        ${bar("Força", c.attr.str)}
        ${bar("Destreza", c.attr.dex)}
        ${bar("Inteligência", c.attr.int)}
      </div>
      <div class="gh-vitals"><span>❤ Vida ${c.hp}</span><span>✦ Mana ${c.mp}</span></div>
      <div class="gh-class-weapons"><b>Armas:</b> ${weps}</div>
    </div>`;
}

// ------------------------------------------------------------------- BOOT
// Tela preta inicial que pré-carrega TUDO. O indicador é a ESPADA na horizontal
// no canto inferior direito, cujo interior enche de dourado conforme o progresso
// (o PNG da espada vira máscara; um gradiente pinta só o miolo até X%).
// Tela da espada. Enche conforme `getFrac()` e chama `onDone` quando `promise`
// termina (respeitando um tempo mínimo `minMs` p/ não piscar).
function showLoading(
  overlay: HTMLElement,
  getFrac: () => number,
  promise: Promise<void>,
  minMs: number,
  onDone: () => void,
) {
  overlay.innerHTML = `
    <div class="gh-screen gh-boot">
      <div class="gh-boot-corner">
        <div class="gh-boot-sword" id="gh-boot-sword" style="--p:0%">
          <img class="gh-bs-base" src="${loadSwordUrl}" alt="" />
          <div class="gh-bs-fill"><div class="gh-bs-lava"></div></div>
        </div>
        <div class="gh-boot-txt" id="gh-boot-txt">Forjando o mundo… 0%</div>
      </div>
    </div>`;
  const sword = overlay.querySelector("#gh-boot-sword") as HTMLElement;
  const txt = overlay.querySelector("#gh-boot-txt") as HTMLElement;
  const t0 = performance.now();
  let raf = 0;
  const tick = () => {
    const p = Math.round(getFrac() * 100);
    sword.style.setProperty("--p", p + "%");
    txt.textContent = `Forjando o mundo… ${p}%`;
    raf = requestAnimationFrame(tick);
  };
  tick();
  promise.then(async () => {
    const el = performance.now() - t0;
    if (el < minMs) await new Promise((r) => setTimeout(r, minMs - el));
    cancelAnimationFrame(raf);
    sword.style.setProperty("--p", "100%"); // espada 100% forjada (fica brilhando)
    await new Promise((r) => setTimeout(r, 220));
    // "TOQUE PARA COMEÇAR" na MESMA tela, ACIMA da espada forjada (sem trocar de
    // tela). O clique é o gesto que libera o áudio p/ a abertura.
    const corner = overlay.querySelector(".gh-boot-corner") as HTMLElement;
    txt.remove();
    const press = document.createElement("div");
    press.className = "gh-boot-press";
    press.innerHTML = 'TOQUE PARA COMEÇAR <span class="gh-bp-arrow">▸</span>';
    corner.insertBefore(press, corner.firstChild); // acima da espada
    const boot = overlay.querySelector(".gh-boot") as HTMLElement;
    boot.classList.add("gh-boot-ready");
    let began = false;
    boot.addEventListener("click", () => { if (began) return; began = true; onDone(); });
  });
}

// pré-carrega (e decodifica) TODOS os PNG/GIF do bundle antes do jogo montar, p/
// nenhum sprite entrar "faltando". import.meta.glob pega tudo de /assets.
function allAssetUrls(): string[] {
  const mods = import.meta.glob(
    ["../assets/**/*.png", "../assets/**/*.gif", "../assets/**/*.jpg"],
    { eager: true, query: "?url", import: "default" },
  );
  return Array.from(new Set(Object.values(mods) as string[]));
}

async function preloadUrls(
  urls: string[],
  onProgress: (frac: number) => void,
): Promise<void> {
  if (urls.length === 0) {
    onProgress(1);
    return;
  }
  let done = 0;
  await Promise.all(
    urls.map(
      (u) =>
        new Promise<void>((res) => {
          const img = new Image();
          const fin = () => {
            done++;
            onProgress(done / urls.length);
            res();
          };
          img.onload = fin;
          img.onerror = fin;
          img.src = u;
        }),
    ),
  );
}

// --------------------------------------------------------------- ESTILO
function injectStyle() {
  if (document.getElementById("gh-intro-style")) return;
  const s = document.createElement("style");
  s.id = "gh-intro-style";
  s.textContent = `
  #gh-intro {
    position:fixed; inset:0; z-index:60; color:#e9dcbe;
    font-family:"MedievalSharp","Trebuchet MS",serif;
    user-select:none; -webkit-user-select:none;
  }
  #gh-intro .gh-screen {
    position:absolute; inset:0; display:flex; flex-direction:column;
    align-items:center; justify-content:center; padding:16px; overflow:auto;
  }
  /* --- título --- */
  /* título: key art de fundo (cover); logo no topo (céu escuro), menu embaixo */
  #gh-intro .gh-title {
    justify-content:space-between; padding:10vh 18px 8vh;
    background:#0a0b10 center/cover no-repeat;
    background-image:
      radial-gradient(ellipse at 50% 30%, rgba(120,70,30,.2), rgba(10,11,16,0) 60%),
      linear-gradient(#12131a, #05060a);
  }
  /* escurece topo (atrás do logo) e base (atrás do menu) p/ o texto ler bem sobre
     a arte, mantendo o meio (a figura com a lanterna) visível. */
  #gh-intro .gh-veil {
    position:absolute; inset:0; pointer-events:none;
    background:
      linear-gradient(180deg, rgba(4,5,9,.6) 0%, rgba(4,5,9,0) 26%, rgba(4,5,9,0) 56%, rgba(4,5,9,.84) 100%),
      radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 55%, rgba(0,0,0,.4) 100%);
  }
  #gh-intro .gh-title-inner { position:relative; z-index:1; text-align:center; }
  /* wordmark: letras com gradiente metálico dourado (brilho + bevel), borda
     escura gravada e brilho quente — cara de logo de verdade. */
  #gh-intro .gh-logo {
    font-family:"Cinzel",serif; font-weight:700; margin:0; line-height:1.04;
    font-size:clamp(34px,9vw,74px); letter-spacing:2px;
    background:linear-gradient(180deg,#fbefc0 0%,#e9cd72 30%,#b58230 52%,#f3dc8f 68%,#9c6e22 100%);
    -webkit-background-clip:text; background-clip:text;
    color:transparent; -webkit-text-fill-color:transparent;
    -webkit-text-stroke:0.6px rgba(58,38,10,.55);
    filter:drop-shadow(0 2px 2px rgba(0,0,0,.75)) drop-shadow(0 0 24px rgba(220,160,60,.38));
  }
  #gh-intro .gh-logo-sm { font-size:clamp(28px,7vw,50px); }
  /* logo = placa pintada (com o nome já embutido). Encaixa direto, sem recorte de letra. */
  #gh-intro .gh-logo-img {
    display:block; width:min(680px,92vw); height:auto; margin:0 auto;
    filter:drop-shadow(0 5px 14px rgba(0,0,0,.72));
  }
  #gh-intro .gh-logo-img-sm { width:min(440px,78vw); }
  #gh-intro .gh-flourish {
    width:min(320px,74vw); margin:9px auto 6px;
    filter:drop-shadow(0 0 6px rgba(201,162,39,.4));
  }
  #gh-intro .gh-flourish svg { width:100%; height:auto; display:block; }
  #gh-intro .gh-tagline { font-style:italic; opacity:.82; margin:0 0 6px; font-size:clamp(13px,2.4vh,17px); }
  #gh-intro .gh-menu { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; align-items:center; }
  /* botão de menu = placa de pedra (arte PNG) em 9-slice; texto dourado por cima */
  #gh-intro .gh-menu-btn {
    font-family:"Cinzel",serif; font-size:clamp(15px,2.4vh,20px); letter-spacing:1px;
    padding:15px 46px; min-width:236px; color:#f0e0b4; cursor:pointer;
    background:transparent;
    border-style:solid; border-width:17px 28px;
    border-image:url(${menuPlateUrl}) 150 165 fill;
    text-shadow:0 2px 4px #000, 0 0 10px rgba(0,0,0,.6);
    filter:drop-shadow(0 3px 8px rgba(0,0,0,.5));
    transition:filter .15s, color .15s, transform .1s;
  }
  #gh-intro .gh-menu-btn:hover:not(.gh-disabled) { color:#fff; filter:drop-shadow(0 0 14px rgba(240,192,64,.55)); }
  #gh-intro .gh-menu-btn:active:not(.gh-disabled) { transform:translateY(1px) scale(.985); }
  #gh-intro .gh-disabled { opacity:.42; cursor:default; }
  /* --- PRÓLOGO (crawl vertical estilo Symphony of the Night) --- */
  /* UMA arte vertical alta sobe devagar; o texto sobe junto por cima. */
  #gh-intro .gh-crawl { background:#000; overflow:hidden; padding:0; }
  #gh-intro .gh-crawl-bg {
    position:absolute; inset:0; background:#0a0b10 center bottom / cover no-repeat;
    will-change:background-position;
    animation:gh-crawl-pan 22s linear both;
  }
  /* pan vertical: do rodapé da arte (base) até o topo — revela de baixo p/ cima */
  @keyframes gh-crawl-pan { from { background-position:center 100%; } to { background-position:center 0%; } }
  /* véu p/ o texto ler bem + vinheta */
  #gh-intro .gh-crawl-shade {
    position:absolute; inset:0; pointer-events:none;
    background:
      linear-gradient(180deg, rgba(4,5,9,.55) 0%, rgba(4,5,9,.18) 30%, rgba(4,5,9,.34) 68%, rgba(4,5,9,.82) 100%),
      radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 46%, rgba(0,0,0,.5) 100%);
  }
  #gh-intro .gh-crawl-textwrap { position:absolute; inset:0; overflow:hidden; z-index:2; }
  #gh-intro .gh-crawl-text {
    position:absolute; left:0; right:0; margin:0 auto; max-width:680px; padding:0 8vw; text-align:center;
    will-change:transform; animation:gh-crawl-rise 22s linear both;
  }
  /* o bloco de texto sobe da base da tela até sumir no topo */
  @keyframes gh-crawl-rise { from { transform:translateY(98vh); } to { transform:translateY(-165vh); } }
  #gh-intro .gh-crawl-text p {
    color:#f2e6c8; font-family:"MedievalSharp","Trebuchet MS",serif;
    font-size:clamp(17px,3vh,24px); line-height:1.62; margin:0 0 2.3em;
    text-shadow:0 2px 8px #000, 0 0 18px rgba(0,0,0,.92); letter-spacing:.3px;
  }
  #gh-intro .gh-crawl-end { color:#e8b24a; font-size:34px; margin-top:.3em; text-shadow:0 2px 10px #000; }
  #gh-intro .gh-pro-skip {
    position:absolute; top:16px; right:16px; z-index:3; cursor:pointer;
    font-family:"Cinzel",serif; font-size:13px; letter-spacing:1px; color:#d8c48a;
    background:rgba(10,8,5,.55); border:1px solid rgba(201,162,39,.5); border-radius:8px; padding:7px 14px;
    text-shadow:0 1px 3px #000; transition:color .15s, border-color .15s;
  }
  #gh-intro .gh-pro-skip:hover { color:#fff; border-color:#f4c847; }
  #gh-intro .gh-pro-hint { position:absolute; right:20px; bottom:16px; z-index:3; font-size:11px; color:#b6a877; opacity:.7; animation:gh-pro-blink 1.8s ease-in-out infinite; }
  @keyframes gh-pro-blink { 0%,100% { opacity:.35; } 50% { opacity:.8; } }
  @media (prefers-reduced-motion: reduce) {
    #gh-intro .gh-crawl-bg, #gh-intro .gh-crawl-text { animation-duration:6s; }
  }
  /* TÍTULO que surge no fim do crawl (sobre o mesmo fundo, congelado no topo) */
  #gh-intro .gh-open-title {
    position:absolute; inset:0; z-index:4; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:6px; text-align:center; padding:8vh 18px;
    opacity:0; pointer-events:none; transition:opacity 1.1s ease-out;
    background:linear-gradient(180deg, rgba(4,5,9,.5) 0%, rgba(4,5,9,.1) 40%, rgba(4,5,9,.72) 100%);
  }
  #gh-intro .gh-open-title.show { opacity:1; pointer-events:auto; }
  #gh-intro .gh-open-title .gh-menu { margin-top:14px; }
  /* "TOQUE PARA COMEÇAR" na tela de loading, acima da espada forjada */
  #gh-intro .gh-boot-ready { cursor:pointer; }
  #gh-intro .gh-boot-press {
    font-family:"Cinzel",serif; font-weight:700; letter-spacing:2.5px; text-align:right;
    font-size:clamp(13px,1.9vh,17px); color:#f0d68a; margin-bottom:9px;
    text-shadow:0 2px 6px #000, 0 0 14px rgba(240,200,90,.5);
    animation:gh-pro-blink 1.4s ease-in-out infinite;
  }
  #gh-intro .gh-bp-arrow { color:#f4d074; }
  /* --- criação de personagem --- */
  #gh-intro .gh-create { justify-content:flex-start; gap:9px; overflow-y:auto; -webkit-overflow-scrolling:touch; }
  /* fundo (arte da cripta) FIXO atrás da UI + véu p/ o texto ler bem */
  #gh-intro .gh-create::before {
    content:""; position:fixed; inset:0; z-index:0;
    background:#0a0b10 center/cover no-repeat; background-image:url(${createBgUrl});
  }
  #gh-intro .gh-create::after {
    content:""; position:fixed; inset:0; z-index:0; pointer-events:none;
    background:linear-gradient(180deg, rgba(6,7,11,.74) 0%, rgba(6,7,11,.44) 32%, rgba(6,7,11,.5) 68%, rgba(6,7,11,.82) 100%);
  }
  /* NADA encolhe abaixo do conteúdo (senão o rodapé sobrepõe o painel) — a tela
     rola quando precisa; e tudo fica ACIMA do fundo (z-index:1). */
  #gh-intro .gh-create > * { flex:0 0 auto; position:relative; z-index:1; }
  #gh-intro .gh-screen-h {
    font-family:"Cinzel",serif; font-weight:700; color:#eccf82; margin:4px 0 0;
    font-size:clamp(19px,3vh,28px); text-shadow:0 2px 8px #000;
  }
  #gh-intro .gh-class-tabs { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; }
  /* aba = SÓ o ícone clicável (sem caixa/borda). O selecionado brilha; os outros
     ficam mais apagados. */
  #gh-intro .gh-class-tab {
    display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;
    padding:2px 4px; color:#b6a877; font-family:"Cinzel",serif; font-size:13px;
    background:none; border:0; border-radius:0;
    opacity:.6; filter:grayscale(.25); transition:opacity .15s, filter .15s, color .15s, transform .1s;
  }
  #gh-intro .gh-class-tab:hover { opacity:.9; }
  #gh-intro .gh-class-tab:active { transform:scale(.94); }
  #gh-intro .gh-class-tab.on { opacity:1; filter:none; color:#f4d98a; }
  #gh-intro .gh-tab-ico {
    width:52px; height:52px; object-fit:contain; display:block; margin:0 auto;
    filter:drop-shadow(0 2px 3px rgba(0,0,0,.75));
  }
  #gh-intro .gh-class-tab.on .gh-tab-ico {
    filter:drop-shadow(0 0 9px rgba(240,200,90,.75)) drop-shadow(0 2px 3px rgba(0,0,0,.7));
  }
  #gh-intro .gh-class-main {
    display:flex; flex-direction:row; gap:14px; width:min(720px,96%); box-sizing:border-box;
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${eqContainerUrl}) 88 fill;
    padding:6px; align-items:stretch; flex-shrink:0;
  }
  /* a arte ESTICA até a altura da coluna de info (preenche o container, sem vazio
     embaixo); object-fit cover mantém o retrato sem distorcer. */
  #gh-intro .gh-class-art { flex:0 0 auto; width:min(38%,210px); align-self:stretch; min-height:238px; }
  #gh-intro .gh-class-portrait, #gh-intro .gh-class-ph {
    width:100%; height:100%; border-radius:8px; object-fit:cover;
    border:2px solid rgba(201,162,39,.45); background:rgba(8,7,5,.6);
  }
  #gh-intro .gh-class-ph { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
  #gh-intro .gh-ph-emoji { font-size:64px; filter:drop-shadow(0 3px 8px #000); }
  #gh-intro .gh-ph-txt { font-style:italic; opacity:.6; font-size:13px; }
  #gh-intro .gh-class-info { flex:1 1 auto; min-width:0; }
  #gh-intro .gh-class-name { display:flex; align-items:center; gap:8px; font-family:"Cinzel",serif; font-weight:700; font-size:clamp(18px,2.8vh,24px); color:#f0dca2; }
  #gh-intro .gh-name-ico { width:30px; height:30px; object-fit:contain; flex:0 0 auto; filter:drop-shadow(0 1px 2px rgba(0,0,0,.7)); }
  #gh-intro .gh-class-tag { color:#c9a84f; font-style:italic; margin-bottom:6px; font-size:14px; }
  #gh-intro .gh-class-desc { font-size:clamp(13px,1.9vh,15px); line-height:1.4; margin:0 0 10px; color:#ddd0b0; }
  #gh-intro .gh-attrs { display:flex; flex-direction:column; gap:5px; margin-bottom:8px; }
  #gh-intro .gh-attr { display:flex; align-items:center; gap:8px; font-size:13px; }
  #gh-intro .gh-attr > span { width:88px; color:#c6b58a; }
  #gh-intro .gh-attr > b { width:18px; text-align:right; color:#f0dca2; }
  #gh-intro .gh-attr-bar { flex:1; height:9px; background:rgba(0,0,0,.5); border:1px solid rgba(201,162,39,.4); border-radius:6px; overflow:hidden; }
  #gh-intro .gh-attr-bar i { display:block; height:100%; background:linear-gradient(#d8c24a,#8a7016); }
  #gh-intro .gh-vitals { display:flex; gap:16px; font-size:14px; color:#e6d6ac; margin-bottom:6px; }
  #gh-intro .gh-class-weapons { font-size:13px; color:#cbbb8e; }
  #gh-intro .gh-class-weapons b { color:#e6d09a; font-family:"Cinzel",serif; }
  /* --- distribuição de atributos (passo 2) --- */
  /* ocupa toda a altura fixa da moldura; se faltar espaço, rola POR DENTRO (a
     moldura nunca muda de tamanho). */
  #gh-intro .gh-alloc {
    display:flex; flex-direction:column; gap:4px;
    height:100%; min-height:0; overflow-y:auto; overflow-x:hidden; padding-right:4px;
  }
  #gh-intro .gh-alloc-points { font-size:13px; color:#d7c79a; }
  #gh-intro .gh-alloc-points b { font-family:"Cinzel",serif; font-size:15px; color:#8f8262; padding:0 2px; }
  #gh-intro .gh-alloc-points b.gh-pts-on { color:#ffd964; text-shadow:0 0 8px rgba(240,200,90,.5); }
  #gh-intro .gh-prim { display:flex; flex-direction:column; gap:2px; padding:4px 0; border-top:1px solid rgba(201,162,39,.22); border-bottom:1px solid rgba(201,162,39,.22); }
  /* linha do primário: nome ELÁSTICO (encolhe, com reticências) + stepper compacto
     à direita — nunca vaza a moldura. */
  #gh-intro .gh-prim-row { display:flex; align-items:center; gap:8px; }
  #gh-intro .gh-prim-name { flex:1 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-family:"Cinzel",serif; font-size:14px; color:#e7d7a6; }
  #gh-intro .gh-prim-step { flex:0 0 auto; display:flex; align-items:center; gap:6px; }
  #gh-intro .gh-prim-val { min-width:30px; text-align:center; font-size:16px; color:#fff; }
  #gh-intro .gh-prim-up { font-style:normal; font-size:10px; color:#7ee08a; margin-left:2px; vertical-align:super; }
  #gh-intro .gh-pm {
    width:24px; height:24px; flex:0 0 auto; cursor:pointer; font-size:16px; line-height:1;
    color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:2px solid rgba(201,162,39,.6); border-radius:7px;
    display:flex; align-items:center; justify-content:center; padding:0;
    transition:border-color .12s, transform .08s, color .12s;
  }
  #gh-intro .gh-pm:hover:not(:disabled) { border-color:#f4c847; color:#fff; }
  #gh-intro .gh-pm:active:not(:disabled) { transform:scale(.9); }
  #gh-intro .gh-pm:disabled { opacity:.3; cursor:default; }
  /* no passo de atributos o retrato é um pouco mais estreito → sobra largura pros
     números, garantindo 2 colunas na moldura estreita do celular. */
  #gh-intro #gh-alloc-main .gh-class-art { width:min(36%,170px); }
  /* secundários: grade auto-ajustável — 3 colunas nas telas largas (fica baixinho),
     2 colunas no celular (mais alto, mas cabe na moldura travada). */
  #gh-intro .gh-sec-blocks { display:grid; grid-template-columns:repeat(auto-fit, minmax(84px, 1fr)); gap:3px 10px; align-content:start; }
  #gh-intro .gh-sec-col { min-width:0; }
  #gh-intro .gh-sec-col h4 {
    margin:2px 0 3px; font-family:"Cinzel",serif; font-size:12px; color:#eccf82; white-space:nowrap;
    border-bottom:1px solid rgba(201,162,39,.28); padding-bottom:2px;
  }
  #gh-intro .gh-sec-row { display:flex; justify-content:space-between; gap:6px; font-size:12px; color:#cdbd90; padding:0.5px 0; }
  #gh-intro .gh-sec-row span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  #gh-intro .gh-sec-row b { color:#f0e0b0; font-variant-numeric:tabular-nums; flex:0 0 auto; }
  #gh-intro .gh-sec-note { font-size:10.5px; font-style:italic; color:#9c8f6d; margin-top:5px; line-height:1.3; }
  #gh-intro .gh-menu-btn-sec { min-width:120px; padding:15px 22px; opacity:.9; }
  #gh-intro .gh-create-foot { display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:center; margin:2px 0 12px; }
  #gh-intro .gh-name-input {
    font-family:"MedievalSharp",serif; font-size:16px; color:#f0e6c8; text-align:center;
    padding:10px 16px; width:min(260px,70vw); background:rgba(12,9,6,.8);
    border:2px solid rgba(201,162,39,.55); border-radius:9px; outline:none;
  }
  #gh-intro .gh-name-input:focus { border-color:#f4c847; }
  /* só empilha (arte em cima) em telas MUITO estreitas; nos demais fica lado a
     lado (compacto, cabe sem rolar). */
  @media (max-width:380px) {
    #gh-intro .gh-class-main { flex-direction:column; align-items:center; }
    /* empilhado: a arte volta a ter proporção 3:4 (não estica na vertical) */
    #gh-intro .gh-class-art { width:min(58%,170px); align-self:center; min-height:0; }
    #gh-intro .gh-class-portrait, #gh-intro .gh-class-ph { height:auto; aspect-ratio:3/4; }
    #gh-intro .gh-attr > span { width:74px; }
  }
  /* --- boot (tela preta + espada enchendo no canto) --- */
  #gh-intro .gh-boot { background:#000; }
  #gh-intro .gh-boot-corner {
    position:absolute; right:clamp(14px,3vw,34px); bottom:clamp(16px,4vh,36px);
    display:flex; flex-direction:column; align-items:flex-end; gap:8px;
  }
  @property --p { syntax:'<percentage>'; inherits:true; initial-value:0%; }
  #gh-intro .gh-boot-sword {
    position:relative; width:min(300px,60vw); aspect-ratio:332/81;
    transition:--p .3s linear; /* o nível da lava sobe suave a cada passo */
    animation:gh-lavaglow 1.6s ease-in-out infinite; /* brilho quente pulsando */
  }
  /* base = a espada apagada (o "vazio") */
  #gh-intro .gh-bs-base {
    width:100%; height:100%; display:block;
    filter:brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000);
  }
  /* LAVA: fluido incandescente enchendo a lâmina até --p (esq→dir). Recortado
     pela INTERSEÇÃO da silhueta da espada com o nível preenchido, e com blobs
     quentes que se agitam (parece líquido borbulhando). */
  /* CLIPE por LARGURA (overflow hidden) — recorte universal e à prova de GPU.
     A largura é var(--p) do container; o nível da lava sobe esq→dir. */
  #gh-intro .gh-bs-fill {
    position:absolute; left:0; top:0; bottom:0; width:var(--p);
    overflow:hidden;
  }
  /* a LAVA tem SEMPRE a largura da espada (mesma expressão), então o recorte por
     largura do pai revela só a parte cheia, alinhada à silhueta. */
  #gh-intro .gh-bs-lava {
    position:absolute; left:0; top:0; height:100%; width:min(300px,60vw);
    -webkit-mask:url(${loadSwordUrl}) left center / 100% 100% no-repeat;
    mask:url(${loadSwordUrl}) left center / 100% 100% no-repeat;
    background:
      radial-gradient(60% 150% at 22% 32%, rgba(255,246,180,.60), transparent 55%),
      radial-gradient(48% 160% at 58% 70%, rgba(255,150,44,.60), transparent 60%),
      radial-gradient(42% 150% at 84% 42%, rgba(255,104,26,.55), transparent 62%),
      linear-gradient(90deg,#5c1604 0,#b8360d 32%,#ee6a1c 60%,#ffab3e 82%,#ffe27f 95%,#fff6cf 100%);
    background-size:170% 210%,200% 240%,220% 200%,100% 100%;
    background-repeat:no-repeat;
    animation:gh-lava 2.8s ease-in-out infinite; /* blobs quentes se agitam (fluido) */
  }
  @keyframes gh-lava {
    0%   { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
    50%  { background-position:46% 66%, 44% 34%, 72% 58%, 0 0; }
    100% { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
  }
  @keyframes gh-lavaglow {
    0%,100% { filter:drop-shadow(0 0 9px rgba(255,120,32,.8)) drop-shadow(0 0 3px rgba(255,220,120,.85)) brightness(1); }
    50%     { filter:drop-shadow(0 0 15px rgba(255,150,50,.95)) drop-shadow(0 0 6px rgba(255,236,150,1)) brightness(1.14); }
  }
  #gh-intro .gh-boot-txt {
    font-family:"Cinzel",serif; letter-spacing:1px; font-size:12px;
    color:#cbb98a; text-shadow:0 1px 3px #000;
  }
  `;
  document.head.appendChild(s);
}
