// Fluxo de abertura: Título → Criação de personagem → Loading (pré-carrega TODOS
// os assets) → resolve com o personagem escolhido. As telas são overlays em HTML.
import { CLASSES, CLASS_BY_ID, type GameClass, type Character } from "./classes";
import { WEAPON_BY_ID } from "./weapons";
import { derive, START_POINTS, type Primaries } from "./stats";
import { audio } from "./audio";
import { backend as saveBackend, localBackend, setActiveBackend, MAX_SLOTS, type SaveMeta } from "./save";
import { restoreCloudSession, loginWithProvider, signInWithEmail, signUpWithEmail, signOutCloud } from "./cloud";
import { isSupabaseConfigured } from "./supabaseConfig";

// resultado da abertura: um herói NOVO (com o slot de destino) ou CONTINUAR um save.
export type IntroResult =
  | { kind: "new"; character: Character; slot: number }
  | { kind: "load"; slot: number };

const escHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const firstFreeSlot = (metas: SaveMeta[]): number | null => {
  for (let s = 0; s < MAX_SLOTS; s++) if (!metas.some((m) => m.slot === s)) return s;
  return null;
};
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

export function runIntro(root: HTMLElement): Promise<IntroResult> {
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

    let targetSlot = 0; // slot de destino do personagem NOVO (definido antes de criar)
    const finishNew = (char: Character) => {
      stopMusic(); overlay.remove(); resolve({ kind: "new", character: char, slot: targetSlot });
    };
    const finishLoad = (slot: number) => {
      stopMusic(); overlay.remove(); resolve({ kind: "load", slot });
    };
    const toAlloc = (cls: GameClass, name: string) =>
      showAllocate(overlay, cls, name, finishNew, () =>
        showCreate(overlay, toAlloc, cls.id, name),
      );
    const startCreate = (slot: number) => { targetSlot = slot; stopMusic(); showCreate(overlay, toAlloc); };

    // TÍTULO ⇄ SELEÇÃO DE PERSONAGEM (estilo Dark Souls): "Novo Jogo" → criação;
    // "Continuar" → janelas dos personagens salvos → clica → carrega.
    const openMenu = (skipCrawl: boolean) => {
      void saveBackend.list().then((metas) => {
        showOpening(overlay, {
          skipCrawl,
          hasSaves: metas.length > 0,
          onNew: () => { const free = firstFreeSlot(metas); if (free == null) openSelect(); else startCreate(free); },
          onContinue: openSelect,
        });
      });
    };
    const openSelect = () => showCharacterSelect(overlay, {
      onPlay: (slot) => showQuickLoad(overlay, () => finishLoad(slot)), // loading → carrega
      onCreate: (slot) => startCreate(slot),
      onBack: () => openMenu(true),
    });

    // BOOT: pré-carrega tudo → "toque para começar" → LOGIN → menu do título.
    let frac = 0;
    const all = preloadUrls(allAssetUrls(), (f) => (frac = f));
    showLoading(overlay, () => frac, all, 900, async () => {
      startMusic();
      // A tela de login aparece SEMPRE. Se houver sessão lembrada (OAuth/e-mail),
      // ela vira um botão "Continuar como …" no topo — o jogador ainda vê o login,
      // mas não precisa reautenticar; pode trocar de conta em "Sair".
      const user = await restoreCloudSession();
      showLogin(overlay, () => openMenu(false), user);
    });
  });
}

// ------------------------------------------- ABERTURA: crawl vertical → TÍTULO
// Uma arte vertical alta sobe devagar; a narração sobe junto por cima (com a
// música). Ao chegar ao topo, o texto some e o TÍTULO surge (logo + Começar),
// tudo sobre o mesmo fundo — contínuo, estilo Symphony of the Night.
function showOpening(
  overlay: HTMLElement,
  opts: { onNew: () => void; onContinue: () => void; hasSaves: boolean; skipCrawl: boolean },
) {
  const { onNew, onContinue, hasSaves, skipCrawl } = opts;
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
      <div class="gh-ow" id="gh-ow">
        <div class="gh-ow-scene">
          <div class="gh-ow-img" id="gh-ow-img" style="background-image:url(${crawlImg})"></div>
          <div class="gh-ow-titleblock" id="gh-ow-title">
            <img class="gh-logo-img" src="${logoPlateArt}" alt="Nethergloam" />
            <div class="gh-flourish">${flourish}</div>
            <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
            <div class="gh-menu">
              <button class="gh-menu-btn" id="gh-btn-new">Novo Jogo</button>
              ${hasSaves
                ? `<button class="gh-menu-btn" id="gh-btn-cont">Continuar</button>`
                : `<button class="gh-menu-btn gh-disabled" disabled title="Nenhum personagem salvo">Continuar</button>`}
            </div>
          </div>
        </div>
        <div class="gh-ow-void"></div>
      </div>
      <div class="gh-crawl-shade" id="gh-crawl-shade"></div>
      <div class="gh-crawl-textwrap" id="gh-crawl-tw"><div class="gh-crawl-text" id="gh-crawl-text">
        ${paras.map((p) => `<p>${p}</p>`).join("")}
        <div class="gh-crawl-end">⚜</div>
      </div></div>
      <button class="gh-pro-skip" id="gh-pro-skip">Pular ▸</button>
    </div>`;
  // A imagem do título tem 2 telas PRETAS esticadas embaixo. A "câmera" começa lá
  // embaixo (só preto) e SOBE de verdade até a cena — o TÍTULO inteiro (logo +
  // menu) está colado na cena, então sobe junto (nada de fade). A borda de baixo
  // da imagem é IRREGULAR (máscara de ruído) → a cidade "rasga" o preto ao entrar.
  const world = overlay.querySelector("#gh-ow") as HTMLElement;
  const img = overlay.querySelector("#gh-ow-img") as HTMLElement;
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='420' height='260' preserveAspectRatio='none'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#fff' stop-opacity='1'/>" +
    "<stop offset='0.85' stop-color='#fff' stop-opacity='1'/>" +
    "<stop offset='1' stop-color='#fff' stop-opacity='0'/></linearGradient>" +
    "<filter id='t' x='-25%' y='-25%' width='150%' height='150%'>" +
    "<feTurbulence type='fractalNoise' baseFrequency='0.014 0.026' numOctaves='2' seed='6' result='n'/>" +
    "<feDisplacementMap in='SourceGraphic' in2='n' scale='72' xChannelSelector='R' yChannelSelector='G'/>" +
    "</filter></defs><rect width='420' height='260' fill='url(#g)' filter='url(#t)'/></svg>";
  const maskUri = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  img.style.webkitMaskImage = maskUri;
  img.style.maskImage = maskUri;

  const tw = overlay.querySelector("#gh-crawl-tw") as HTMLElement;
  const shade = overlay.querySelector("#gh-crawl-shade") as HTMLElement;
  const titleblock = overlay.querySelector("#gh-ow-title") as HTMLElement;
  const skip = overlay.querySelector("#gh-pro-skip") as HTMLElement;
  let settled = false;
  let timer = 0;
  const settle = () => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timer);
    world.style.animation = "none";              // câmera parada no topo (cena inteira)
    world.style.transform = "translateY(0)";
    img.style.webkitMaskImage = "none";          // imagem sólida e limpa no fim
    img.style.maskImage = "none";
    tw.style.display = "none";                    // texto já subiu tudo
    skip.style.display = "none";
    shade.style.opacity = "0";                   // véu some → imagem nítida
    // 1º fica SÓ a imagem por um instante; DEPOIS o título/logo + botões surgem aos
    // poucos por cima (não vêm "escritos" junto da imagem subindo).
    window.setTimeout(() => {
      titleblock.classList.add("ready");         // logo → flourish → tagline → menu (escalonado)
      (overlay.querySelector("#gh-btn-new") as HTMLElement).addEventListener("click", onNew);
      const cont = overlay.querySelector("#gh-btn-cont") as HTMLElement | null;
      if (cont) cont.addEventListener("click", onContinue);
    }, skipCrawl ? 40 : 950);
  };
  if (skipCrawl) {
    // reentrada (voltar da seleção): sem replay do crawl — vai direto pro menu
    settle();
  } else {
    world.addEventListener("animationend", settle); // fim da subida da câmera
    skip.addEventListener("click", (e) => { e.stopPropagation(); settle(); });
    timer = window.setTimeout(settle, 30000);       // trava de segurança
  }
}

// -------------------------------------------------------------- LOGIN / CONTA
// Google + Discord (Supabase OAuth) + Convidado. O Convidado usa o save LOCAL
// (neste aparelho) — jogar já, sem conta. O social só "liga" com o Supabase
// configurado; enquanto isso, mostra um aviso amigável.
const D_LOGO = '<svg viewBox="0 0 24 24" width="21" height="21" fill="#fff"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.24.5a18 18 0 0 1 4.3 1.4A17.9 17.9 0 0 0 12 4.6a17.9 17.9 0 0 0-7.46 1.3A18 18 0 0 1 8.84 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 .1 13.4.3 17.8a19.9 19.9 0 0 0 6 3l.8-1.2a13 13 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4a13 13 0 0 1-2 1l.8 1.2a19.9 19.9 0 0 0 6-3c.3-5.1-.5-9.5-3.1-13.4zM8.7 15.3c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4zm6.6 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4z"/></svg>';
// LOGIN: Discord (OAuth) + Email/senha (nativo do Supabase) + Convidado (save local).
function showLogin(overlay: HTMLElement, onLoggedIn: () => void, user?: { email?: string; name?: string } | null) {
  const cloud = isSupabaseConfigured();
  const who = user ? (user.name || user.email || "sua conta") : null;
  overlay.innerHTML = `
    <div class="gh-screen gh-login" style="background-image:url(${createBgUrl})">
      <div class="gh-cs-veil"></div>
      <div class="gh-login-wrap">
        <img class="gh-login-logo" src="${logoPlateArt}" alt="Nethergloam" />
        <div class="gh-login-btns">
          ${who ? `<button class="gh-login-btn gh-lg-resume" id="gh-lg-resume">Continuar como <b>${who}</b></button>
          <button class="gh-login-linkbtn" id="gh-lg-switch">Entrar com outra conta</button>
          <div class="gh-login-or"><span>ou</span></div>` : ""}
          <button class="gh-login-btn gh-lg-discord" ${cloud ? "" : "disabled"} data-prov="discord">${D_LOGO}<span>Entrar com Discord</span></button>
          <div class="gh-login-or"><span>e-mail</span></div>
          <input class="gh-login-inp" id="gh-lg-email" type="email" placeholder="Seu e-mail" autocomplete="email" ${cloud ? "" : "disabled"} />
          <input class="gh-login-inp" id="gh-lg-pass" type="password" placeholder="Senha" autocomplete="current-password" ${cloud ? "" : "disabled"} />
          <div class="gh-login-row">
            <button class="gh-login-btn gh-lg-mail" id="gh-lg-signin" ${cloud ? "" : "disabled"}>Entrar</button>
            <button class="gh-login-btn gh-lg-mail gh-lg-alt" id="gh-lg-signup" ${cloud ? "" : "disabled"}>Criar conta</button>
          </div>
          <div class="gh-login-or"><span>ou</span></div>
          <button class="gh-login-btn gh-lg-guest" id="gh-lg-guest">Entrar como Convidado</button>
        </div>
        <p class="gh-login-note" id="gh-login-note">${cloud
          ? "Seu progresso fica salvo na sua conta, em qualquer aparelho. Convidado salva só neste aparelho."
          : "Login em nuvem indisponível — jogue como Convidado (salva neste aparelho)."}</p>
      </div>
    </div>`;
  const noteEl = overlay.querySelector("#gh-login-note") as HTMLElement;
  const emailEl = overlay.querySelector("#gh-lg-email") as HTMLInputElement | null;
  const passEl = overlay.querySelector("#gh-lg-pass") as HTMLInputElement | null;
  const say = (msg: string, warn = true) => { noteEl.textContent = msg; noteEl.classList.toggle("gh-login-warn", warn); };
  const busy = (on: boolean) => overlay.querySelectorAll<HTMLButtonElement>(".gh-login-btn").forEach((b) => (b.disabled = on));

  // sessão lembrada: "Continuar como …" entra direto (backend de nuvem já ativo).
  overlay.querySelector("#gh-lg-resume")?.addEventListener("click", () => onLoggedIn());
  // "Entrar com outra conta": desloga e reabre o login limpo (sem o atalho).
  overlay.querySelector("#gh-lg-switch")?.addEventListener("click", () => {
    void signOutCloud().finally(() => showLogin(overlay, onLoggedIn, null));
  });

  (overlay.querySelector("#gh-lg-guest") as HTMLElement).addEventListener("click", () => {
    setActiveBackend(localBackend); onLoggedIn();
  });
  const disc = overlay.querySelector("[data-prov]") as HTMLElement | null;
  disc?.addEventListener("click", async () => {
    disc.classList.add("gh-lg-busy");
    try { await loginWithProvider("discord"); }
    catch { say("Não foi possível abrir o Discord. Tente de novo."); disc.classList.remove("gh-lg-busy"); }
  });
  const emailFlow = async (mode: "in" | "up") => {
    const email = (emailEl?.value || "").trim(), pass = passEl?.value || "";
    if (!email || !pass) { say("Preencha e-mail e senha."); return; }
    if (mode === "up" && pass.length < 6) { say("A senha precisa de pelo menos 6 caracteres."); return; }
    busy(true); say("Aguarde…", false);
    try {
      if (mode === "in") { await signInWithEmail(email, pass); onLoggedIn(); }
      else {
        const r = await signUpWithEmail(email, pass);
        if (r.needsConfirm) { say("Conta criada! Confirme pelo link no seu e-mail e depois entre.", false); busy(false); }
        else onLoggedIn();
      }
    } catch (e) { say((e as Error).message || "Falha. Tente de novo."); busy(false); }
  };
  overlay.querySelector("#gh-lg-signin")?.addEventListener("click", () => void emailFlow("in"));
  overlay.querySelector("#gh-lg-signup")?.addEventListener("click", () => void emailFlow("up"));
  passEl?.addEventListener("keydown", (e) => { if ((e as KeyboardEvent).key === "Enter") void emailFlow("in"); });
}

// ---------------------------------------- SELEÇÃO DE PERSONAGEM (janelas/slots)
// Estilo Dark Souls: "Continuar" abre esta tela com os personagens salvos em
// cartões. Clicar num cartão → loading → carrega. Cada cartão tem um ✕ (apagar,
// com confirmação inline). Slots vazios viram "+ Criar personagem".
function showCharacterSelect(
  overlay: HTMLElement,
  cbs: { onPlay: (slot: number) => void; onCreate: (slot: number) => void; onBack: () => void },
) {
  let confirmDel = -1; // slot em confirmação de exclusão (-1 = nenhum)
  const render = (metas: SaveMeta[]) => {
    const bySlot = new Map(metas.map((m) => [m.slot, m] as const));
    const card = (slot: number) => {
      const m = bySlot.get(slot);
      if (!m) {
        return `<button class="gh-cs-card gh-cs-empty" data-create="${slot}">
            <div class="gh-cs-plus">+</div><div class="gh-cs-emptytxt">Criar personagem</div></button>`;
      }
      const cls = CLASS_BY_ID[m.classId];
      const port = cls?.portrait ?? "";
      const ico = CLASS_ICON[m.classId] ?? "";
      if (slot === confirmDel) {
        return `<div class="gh-cs-card gh-cs-filled gh-cs-confirm">
            <div class="gh-cs-cfxt">Apagar <b>${escHtml(m.name)}</b>?<br><span>Não dá para desfazer.</span></div>
            <div class="gh-cs-cfrow">
              <button class="gh-cs-cfbtn gh-cs-cfno" data-cancel="1">Não</button>
              <button class="gh-cs-cfbtn gh-cs-cfyes" data-confirm="${slot}">Apagar</button>
            </div></div>`;
      }
      return `<div class="gh-cs-card gh-cs-filled" data-play="${slot}">
          <div class="gh-cs-portrait" style="background-image:url(${port})"></div>
          <button class="gh-cs-del" data-del="${slot}" title="Apagar personagem">✕</button>
          <div class="gh-cs-info">
            <div class="gh-cs-name">${ico ? `<img class="gh-cs-ico" src="${ico}" alt=""/>` : ""}${escHtml(m.name)}</div>
            <div class="gh-cs-sub">Nível ${m.level} · ${cls?.name ?? m.classId}</div>
          </div></div>`;
    };
    overlay.innerHTML = `
      <div class="gh-screen gh-charsel" style="background-image:url(${createBgUrl})">
        <div class="gh-cs-veil"></div>
        <div class="gh-cs-wrap">
          <h2 class="gh-cs-title">Escolha seu Herói</h2>
          <div class="gh-cs-grid">${[0, 1, 2].map(card).join("")}</div>
          <button class="gh-menu-btn gh-menu-btn-sec" id="gh-cs-back">◂ Voltar</button>
        </div>
      </div>`;
    const q = (sel: string) => overlay.querySelectorAll(sel);
    (overlay.querySelector("#gh-cs-back") as HTMLElement).addEventListener("click", cbs.onBack);
    q("[data-play]").forEach((el) => el.addEventListener("click", () => cbs.onPlay(Number(el.getAttribute("data-play")))));
    q("[data-create]").forEach((el) => el.addEventListener("click", () => cbs.onCreate(Number(el.getAttribute("data-create")))));
    q("[data-del]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); confirmDel = Number(el.getAttribute("data-del")); reload(); }));
    q("[data-cancel]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); confirmDel = -1; reload(); }));
    q("[data-confirm]").forEach((el) => el.addEventListener("click", async (e) => {
      e.stopPropagation();
      await saveBackend.remove(Number(el.getAttribute("data-confirm")));
      confirmDel = -1; reload();
    }));
  };
  const reload = () => { void saveBackend.list().then(render); };
  reload();
}

// LOADING breve (espada forjando) que AUTO-avança — sem "toque para começar".
// Usado ao escolher um personagem salvo (dá o "peso" de carregar antes de entrar).
function showQuickLoad(overlay: HTMLElement, onDone: () => void) {
  overlay.innerHTML = `
    <div class="gh-screen gh-boot">
      <div class="gh-boot-corner">
        <div class="gh-boot-sword" id="gh-ql-sword" style="--p:0%">
          <img class="gh-bs-base" src="${loadSwordUrl}" alt="" />
          <div class="gh-bs-fill"><div class="gh-bs-lava"></div></div>
        </div>
        <div class="gh-boot-txt">Carregando…</div>
      </div>
    </div>`;
  const sword = overlay.querySelector("#gh-ql-sword") as HTMLElement;
  const t0 = performance.now();
  const dur = 700;
  const tick = () => {
    const p = Math.min(1, (performance.now() - t0) / dur);
    sword.style.setProperty("--p", Math.round(p * 100) + "%");
    if (p < 1) requestAnimationFrame(tick);
    else window.setTimeout(onDone, 140);
  };
  tick();
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
  /* MUNDO alto: cena do título (1 tela) no TOPO + 2 telas PRETAS esticadas embaixo.
     A "câmera" (translateY) começa lá embaixo (só preto) e SOBE até a cena. Tudo
     que está na cena — imagem E título (logo/menu) — sobe junto, sem fade. */
  #gh-intro .gh-ow {
    position:absolute; left:0; right:0; top:0; width:100%; height:300vh; z-index:0;
    will-change:transform; animation:gh-ow-rise 27s cubic-bezier(.38,0,.5,1) both;
  }
  #gh-intro .gh-ow-scene { position:relative; height:100vh; }
  #gh-intro .gh-ow-img {
    position:absolute; inset:0; background:#0a0b10 center center / cover no-repeat;
    -webkit-mask-size:100% 100%; mask-size:100% 100%;
    -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;
  }
  /* o título (logo + flourish + tagline + menu) fica COLADO na cena, sobre a arte,
     mas ESCONDIDO durante a subida da câmera — só a imagem aparece primeiro. */
  #gh-intro .gh-ow-titleblock {
    position:absolute; inset:0; z-index:1; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:6px; text-align:center; padding:6vh 18px;
    opacity:0; /* invisível até settle() (imagem primeiro) */
  }
  #gh-intro .gh-ow-titleblock.ready { opacity:1; }
  /* cada peça começa apagada e deslocada; ao ficar .ready, surgem ESCALONADAS
     (logo primeiro, depois floreio, tagline e por fim os botões) — "de pouco em
     pouco", nada de aparecer tudo de uma vez. */
  #gh-intro .gh-ow-titleblock .gh-logo-img,
  #gh-intro .gh-ow-titleblock .gh-flourish,
  #gh-intro .gh-ow-titleblock .gh-tagline,
  #gh-intro .gh-ow-titleblock .gh-menu {
    opacity:0; transform:translateY(12px);
  }
  #gh-intro .gh-ow-titleblock.ready .gh-logo-img {
    opacity:1; transform:none; transition:opacity 1.3s ease, transform 1.3s ease;
  }
  #gh-intro .gh-ow-titleblock.ready .gh-flourish {
    opacity:1; transform:none; transition:opacity .9s ease .9s, transform .9s ease .9s;
  }
  #gh-intro .gh-ow-titleblock.ready .gh-tagline {
    opacity:1; transform:none; transition:opacity .9s ease 1.2s, transform .9s ease 1.2s;
  }
  #gh-intro .gh-ow-titleblock .gh-menu { margin-top:14px; pointer-events:none; }
  #gh-intro .gh-ow-titleblock.ready .gh-menu {
    opacity:1; transform:none; pointer-events:auto;
    transition:opacity 1s ease 1.6s, transform 1s ease 1.6s;
  }
  #gh-intro .gh-ow-void { height:200vh; background:#000; }
  /* câmera sobe: começa mostrando o vazio preto (embaixo) e chega na cena (topo) */
  @keyframes gh-ow-rise { from { transform:translateY(-200vh); } to { transform:translateY(0); } }
  #gh-intro .gh-crawl-shade { transition:opacity 1.2s ease-out; }
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
    will-change:transform; animation:gh-crawl-rise 25s linear both;
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
    #gh-intro .gh-crawl-curtain, #gh-intro .gh-crawl-text { animation-duration:6s; }
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
  /* ---------------- SELEÇÃO DE PERSONAGEM ---------------- */
  #gh-intro .gh-charsel { background-size:cover; background-position:center; }
  #gh-intro .gh-cs-veil { position:absolute; inset:0;
    background:radial-gradient(ellipse at center, rgba(6,5,9,.55) 20%, rgba(4,3,6,.86) 100%); }
  #gh-intro .gh-cs-wrap { position:relative; z-index:1; width:min(94vw,860px); display:flex;
    flex-direction:column; align-items:center; gap:22px; animation:gh-fadein .5s ease both; }
  #gh-intro .gh-cs-title { font-family:"Cinzel",serif; font-weight:700; letter-spacing:3px;
    font-size:clamp(20px,3.4vw,30px); color:#e9dcc0; text-shadow:0 2px 10px #000, 0 0 24px rgba(201,162,74,.28); margin:0; }
  #gh-intro .gh-cs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; width:100%; }
  #gh-intro .gh-cs-card { position:relative; aspect-ratio:3/4; border-radius:12px; overflow:hidden;
    border:1px solid rgba(201,162,74,.34); background:rgba(14,12,10,.66);
    box-shadow:inset 0 2px 18px rgba(0,0,0,.6), 0 6px 20px rgba(0,0,0,.45);
    cursor:pointer; transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease;
    display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding:0;
    font-family:"Cinzel",serif; color:#e9dcc0; }
  #gh-intro .gh-cs-card:hover { transform:translateY(-4px); border-color:rgba(240,208,116,.85);
    box-shadow:inset 0 2px 18px rgba(0,0,0,.6), 0 0 22px rgba(240,192,64,.4); }
  #gh-intro .gh-cs-portrait { position:absolute; inset:0; background-size:cover; background-position:center top;
    -webkit-mask:linear-gradient(#000 55%, transparent 96%); mask:linear-gradient(#000 55%, transparent 96%); }
  #gh-intro .gh-cs-info { position:relative; z-index:1; width:100%; padding:10px 8px 12px;
    background:linear-gradient(transparent, rgba(6,5,4,.9) 55%); text-align:center; }
  #gh-intro .gh-cs-name { display:flex; align-items:center; justify-content:center; gap:6px;
    font-size:clamp(13px,1.9vw,17px); font-weight:700; text-shadow:0 2px 6px #000; }
  #gh-intro .gh-cs-ico { width:18px; height:18px; object-fit:contain; filter:drop-shadow(0 1px 2px #000); }
  #gh-intro .gh-cs-sub { margin-top:3px; font-size:clamp(10px,1.4vw,12px); color:#c9a24a; letter-spacing:.5px; }
  #gh-intro .gh-cs-del { position:absolute; top:6px; right:6px; z-index:2; width:26px; height:26px;
    border-radius:50%; border:1px solid rgba(230,120,90,.5); background:rgba(20,10,10,.7); color:#e88a6a;
    font-size:13px; line-height:1; cursor:pointer; opacity:0; transition:opacity .15s ease, background .15s ease; }
  #gh-intro .gh-cs-card:hover .gh-cs-del { opacity:1; }
  #gh-intro .gh-cs-del:hover { background:rgba(150,40,30,.85); color:#fff; }
  #gh-intro .gh-cs-empty { justify-content:center; gap:10px; border-style:dashed; color:#9a8f78; }
  #gh-intro .gh-cs-empty:hover { color:#e9dcc0; }
  #gh-intro .gh-cs-plus { font-size:44px; font-weight:300; line-height:1; color:#c9a24a; text-shadow:0 0 16px rgba(201,162,74,.4); }
  #gh-intro .gh-cs-emptytxt { font-size:clamp(11px,1.6vw,13px); letter-spacing:1px; }
  #gh-intro .gh-cs-confirm { justify-content:center; gap:14px; cursor:default; background:rgba(24,10,10,.82); border-color:rgba(230,120,90,.5); }
  #gh-intro .gh-cs-cfxt { text-align:center; font-size:clamp(12px,1.7vw,15px); line-height:1.4; padding:0 10px; }
  #gh-intro .gh-cs-cfxt span { font-size:.82em; color:#b8a48a; }
  #gh-intro .gh-cs-cfrow { display:flex; gap:10px; }
  #gh-intro .gh-cs-cfbtn { font-family:"Cinzel",serif; padding:8px 16px; border-radius:7px; cursor:pointer; font-size:13px;
    border:1px solid rgba(201,162,74,.4); background:rgba(20,16,12,.8); color:#e9dcc0; }
  #gh-intro .gh-cs-cfyes { border-color:rgba(200,60,40,.7); background:rgba(120,32,24,.7); color:#ffd9cf; }
  #gh-intro .gh-cs-cfyes:hover { background:rgba(160,44,32,.9); }
  #gh-intro .gh-cs-cfno:hover { border-color:rgba(240,208,116,.8); color:#fff; }
  /* ---------------- LOGIN / CONTA ---------------- */
  #gh-intro .gh-login { background-size:cover; background-position:center; }
  #gh-intro .gh-login-wrap { position:relative; z-index:1; width:min(92vw,380px); display:flex;
    flex-direction:column; align-items:center; gap:22px; animation:gh-fadein .5s ease both; }
  #gh-intro .gh-login-logo { width:min(70vw,300px); height:auto; filter:drop-shadow(0 4px 18px rgba(0,0,0,.7)); }
  #gh-intro .gh-login-btns { width:100%; display:flex; flex-direction:column; gap:12px; }
  #gh-intro .gh-login-btn { display:flex; align-items:center; justify-content:center; gap:11px;
    width:100%; padding:13px 16px; border-radius:10px; cursor:pointer; font-family:"Cinzel",serif;
    font-size:15px; font-weight:600; letter-spacing:.3px; border:1px solid rgba(0,0,0,.25);
    transition:transform .14s ease, filter .14s ease, box-shadow .14s ease; box-shadow:0 4px 14px rgba(0,0,0,.4); }
  #gh-intro .gh-login-btn:hover { transform:translateY(-2px); filter:brightness(1.06); }
  #gh-intro .gh-login-btn:active { transform:translateY(0) scale(.99); }
  #gh-intro .gh-login-btn.gh-lg-busy { opacity:.6; pointer-events:none; }
  #gh-intro .gh-lg-google { background:#fff; color:#3c4043; }
  #gh-intro .gh-lg-discord { background:#5865F2; color:#fff; }
  #gh-intro .gh-lg-resume { background:linear-gradient(180deg,#c9a24a,#9c7a2e); color:#1a1408;
    font-weight:700; border:1px solid rgba(240,208,116,.7); box-shadow:0 0 18px rgba(240,192,64,.3); }
  #gh-intro .gh-lg-resume b { font-weight:800; }
  #gh-intro .gh-lg-resume:hover { box-shadow:0 0 24px rgba(240,192,64,.5); }
  #gh-intro .gh-login-linkbtn { background:none; border:none; color:#b7ab90; font-size:12px;
    cursor:pointer; text-decoration:underline; text-underline-offset:3px; padding:2px; align-self:center;
    transition:color .14s ease; }
  #gh-intro .gh-login-linkbtn:hover { color:#f0d074; }
  #gh-intro .gh-lg-guest { background:rgba(20,17,13,.72); color:#e4d7ba; border:1px solid rgba(201,162,74,.45);
    font-weight:500; }
  #gh-intro .gh-lg-guest:hover { border-color:rgba(240,208,116,.85); color:#fff; box-shadow:0 0 16px rgba(240,192,64,.32); }
  #gh-intro .gh-login-or { display:flex; align-items:center; gap:10px; margin:2px 0;
    color:#9a8f78; font-size:11px; letter-spacing:2px; text-transform:uppercase; }
  #gh-intro .gh-login-or::before, #gh-intro .gh-login-or::after { content:""; flex:1; height:1px; background:rgba(201,162,74,.28); }
  #gh-intro .gh-login-note { text-align:center; font-size:12px; line-height:1.5; color:#b7ab90;
    max-width:320px; margin:0; text-shadow:0 1px 3px #000; }
  #gh-intro .gh-login-note.gh-login-warn { color:#e8c06a; }
  #gh-intro .gh-login-inp { width:100%; padding:12px 14px; border-radius:9px; font-family:"Georgia",serif;
    font-size:14px; color:#efe6cf; background:rgba(10,9,7,.72); border:1px solid rgba(201,162,74,.34);
    outline:none; transition:border-color .14s ease, box-shadow .14s ease; }
  #gh-intro .gh-login-inp::placeholder { color:#8c8168; }
  #gh-intro .gh-login-inp:focus { border-color:rgba(240,208,116,.8); box-shadow:0 0 12px rgba(240,192,64,.25); }
  #gh-intro .gh-login-inp:disabled { opacity:.45; }
  #gh-intro .gh-login-row { display:flex; gap:10px; }
  #gh-intro .gh-lg-mail { flex:1; background:rgba(28,22,15,.85); color:#e9dcc0; border:1px solid rgba(201,162,74,.5); }
  #gh-intro .gh-lg-mail:hover:not(:disabled) { border-color:rgba(240,208,116,.9); color:#fff; box-shadow:0 0 14px rgba(240,192,64,.3); }
  #gh-intro .gh-lg-alt { background:rgba(16,14,11,.6); color:#c9bfa4; font-weight:500; }
  #gh-intro .gh-login-btn:disabled { opacity:.5; cursor:default; box-shadow:none; }
  @keyframes gh-fadein { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
  @media (max-width:560px) {
    #gh-intro .gh-cs-grid { gap:10px; }
    #gh-intro .gh-cs-title { letter-spacing:2px; }
  }
  `;
  document.head.appendChild(s);
}
