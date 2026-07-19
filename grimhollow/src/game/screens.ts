// Fluxo de abertura: Título → Criação de personagem → Loading (pré-carrega TODOS
// os assets) → resolve com o personagem escolhido. As telas são overlays em HTML.
import { CLASSES, CLASS_BY_ID, type GameClass, type Character } from "./classes";
import { WEAPON_BY_ID } from "./weapons";
import eqContainerUrl from "../assets/ui/eq_container.png";

// Key art do título (PNG). O logo/menu ficam por cima; a arte é sem texto.
import titleArtUrl from "../assets/ui/title_bg.png";
const TITLE_ART: string | null = titleArtUrl;

export function runIntro(root: HTMLElement): Promise<Character> {
  injectStyle();
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.id = "gh-intro";
    root.appendChild(overlay);
    const start = (char: Character) =>
      showLoading(overlay, () => {
        overlay.remove();
        resolve(char);
      });
    showTitle(overlay, () => showCreate(overlay, start));
  });
}

// ---------------------------------------------------------------- TÍTULO
function showTitle(overlay: HTMLElement, onNew: () => void) {
  overlay.innerHTML = `
    <div class="gh-screen gh-title"${TITLE_ART ? ` style="background-image:url(${TITLE_ART})"` : ""}>
      <div class="gh-veil"></div>
      <div class="gh-title-inner">
        <h1 class="gh-logo">Nethergloam</h1>
        <div class="gh-flourish"><svg viewBox="0 0 260 14" preserveAspectRatio="xMidYMid meet"><g fill="#c9a24a"><circle cx="7" cy="7" r="2.6"/><rect x="15" y="6.1" width="97" height="1.8" rx="0.9"/><path d="M130 1 L138 7 L130 13 L122 7 Z"/><rect x="148" y="6.1" width="97" height="1.8" rx="0.9"/><circle cx="253" cy="7" r="2.6"/></g></svg></div>
        <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
      </div>
      <div class="gh-menu">
        <button class="gh-menu-btn" id="gh-btn-new">⚔ Novo Jogo</button>
        <button class="gh-menu-btn gh-disabled" disabled title="Em breve">Continuar</button>
      </div>
    </div>`;
  overlay.querySelector("#gh-btn-new")!.addEventListener("click", onNew);
}

// ------------------------------------------------------ CRIAÇÃO DE PERSONAGEM
function showCreate(overlay: HTMLElement, onStart: (c: Character) => void) {
  let sel: GameClass = CLASSES[0];
  overlay.innerHTML = `
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${CLASSES.map(
          (c, i) =>
            `<button class="gh-class-tab${i === 0 ? " on" : ""}" data-id="${c.id}"><span class="gh-tab-emoji">${c.emoji}</span><span>${c.name}</span></button>`,
        ).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" />
        <button class="gh-menu-btn" id="gh-btn-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;
  const main = overlay.querySelector("#gh-class-main") as HTMLElement;
  const render = (c: GameClass) => (main.innerHTML = classCard(c));
  render(sel);
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
    onStart({ name, classId: sel.id });
  });
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
      <div class="gh-class-name">${c.emoji} ${c.name}</div>
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

// ---------------------------------------------------------------- LOADING
function showLoading(overlay: HTMLElement, onDone: () => void) {
  overlay.innerHTML = `
    <div class="gh-screen gh-loading">
      <h1 class="gh-logo gh-logo-sm">Nethergloam</h1>
      <div class="gh-load-bar"><div class="gh-load-fill" id="gh-load-fill"></div></div>
      <div class="gh-load-pct" id="gh-load-pct">Forjando o mundo…</div>
    </div>`;
  const fill = overlay.querySelector("#gh-load-fill") as HTMLElement;
  const pct = overlay.querySelector("#gh-load-pct") as HTMLElement;
  const t0 = performance.now();
  preloadAll((f) => {
    const p = Math.round(f * 100);
    fill.style.width = p + "%";
    pct.textContent = `Forjando o mundo… ${p}%`;
  }).then(async () => {
    // tempo mínimo de exibição p/ a barra não "piscar"
    const el = performance.now() - t0;
    if (el < 700) await new Promise((r) => setTimeout(r, 700 - el));
    fill.style.width = "100%";
    onDone();
  });
}

// pré-carrega (e decodifica) TODOS os PNG/GIF do bundle antes do jogo montar, p/
// nenhum sprite entrar "faltando". import.meta.glob pega tudo de /assets.
async function preloadAll(onProgress: (frac: number) => void): Promise<void> {
  const mods = import.meta.glob(["../assets/**/*.png", "../assets/**/*.gif"], {
    eager: true,
    query: "?url",
    import: "default",
  });
  const urls = Array.from(new Set(Object.values(mods) as string[]));
  if (urls.length === 0) return onProgress(1);
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
  #gh-intro .gh-flourish {
    width:min(320px,74vw); margin:9px auto 6px;
    filter:drop-shadow(0 0 6px rgba(201,162,39,.4));
  }
  #gh-intro .gh-flourish svg { width:100%; height:auto; display:block; }
  #gh-intro .gh-tagline { font-style:italic; opacity:.82; margin:0 0 6px; font-size:clamp(13px,2.4vh,17px); }
  #gh-intro .gh-menu { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; align-items:center; }
  #gh-intro .gh-menu-btn {
    font-family:"Cinzel",serif; font-size:clamp(15px,2.4vh,20px); letter-spacing:1px;
    padding:12px 44px; min-width:220px; color:#f0e0b4; cursor:pointer;
    background:linear-gradient(#2b2218,#160f08);
    border:2px solid rgba(201,162,39,.6); border-radius:10px;
    box-shadow:0 3px 10px #0008, inset 0 0 22px rgba(0,0,0,.45);
    transition:border-color .15s, box-shadow .15s, color .15s, transform .1s;
  }
  #gh-intro .gh-menu-btn:hover:not(.gh-disabled) { border-color:#f4c847; color:#fff; box-shadow:0 0 18px rgba(240,192,64,.5); }
  #gh-intro .gh-menu-btn:active:not(.gh-disabled) { transform:translateY(1px) scale(.98); }
  #gh-intro .gh-disabled { opacity:.38; cursor:default; }
  /* --- criação de personagem --- */
  #gh-intro .gh-create { justify-content:flex-start; gap:9px; overflow-y:auto; -webkit-overflow-scrolling:touch; }
  /* NADA encolhe abaixo do conteúdo (senão o rodapé sobrepõe o painel) — a tela
     rola quando precisa. */
  #gh-intro .gh-create > * { flex:0 0 auto; }
  #gh-intro .gh-screen-h {
    font-family:"Cinzel",serif; font-weight:700; color:#eccf82; margin:4px 0 0;
    font-size:clamp(19px,3vh,28px); text-shadow:0 2px 8px #000;
  }
  #gh-intro .gh-class-tabs { display:flex; gap:7px; flex-wrap:wrap; justify-content:center; }
  #gh-intro .gh-class-tab {
    display:flex; flex-direction:column; align-items:center; gap:1px; cursor:pointer;
    padding:7px 15px; color:#d7c69a; font-family:"Cinzel",serif; font-size:13px;
    background:rgba(20,16,11,.72); border:2px solid rgba(201,162,39,.4); border-radius:10px;
    transition:.15s;
  }
  #gh-intro .gh-class-tab.on { border-color:#f4c847; color:#fff; box-shadow:0 0 12px rgba(240,192,64,.4); }
  #gh-intro .gh-tab-emoji { font-size:20px; }
  #gh-intro .gh-class-main {
    display:flex; flex-direction:row; gap:14px; width:min(720px,96%); box-sizing:border-box;
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${eqContainerUrl}) 88 fill;
    padding:6px; align-items:flex-start; flex-shrink:0;
  }
  #gh-intro .gh-class-art { flex:0 0 auto; width:min(38%,210px); }
  #gh-intro .gh-class-portrait, #gh-intro .gh-class-ph {
    width:100%; aspect-ratio:3/4; border-radius:8px; object-fit:cover;
    border:2px solid rgba(201,162,39,.45); background:rgba(8,7,5,.6);
  }
  #gh-intro .gh-class-ph { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
  #gh-intro .gh-ph-emoji { font-size:64px; filter:drop-shadow(0 3px 8px #000); }
  #gh-intro .gh-ph-txt { font-style:italic; opacity:.6; font-size:13px; }
  #gh-intro .gh-class-info { flex:1 1 auto; min-width:0; }
  #gh-intro .gh-class-name { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(18px,2.8vh,24px); color:#f0dca2; }
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
    #gh-intro .gh-class-art { width:min(58%,170px); }
    #gh-intro .gh-attr > span { width:74px; }
  }
  /* --- loading --- */
  #gh-intro .gh-loading { background:#08090d; }
  #gh-intro .gh-load-bar {
    width:min(360px,72vw); height:15px; margin-top:24px; overflow:hidden;
    background:rgba(0,0,0,.55); border:2px solid rgba(201,162,39,.55); border-radius:9px;
    box-shadow:inset 0 0 10px #000;
  }
  #gh-intro .gh-load-fill { width:0; height:100%; background:linear-gradient(#e6cc5c,#8a6c16); transition:width .2s ease-out; }
  #gh-intro .gh-load-pct { margin-top:12px; font-family:"Cinzel",serif; letter-spacing:1px; color:#d9c68e; font-size:14px; }
  `;
  document.head.appendChild(s);
}
