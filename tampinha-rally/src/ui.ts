// UI em DOM sobre o canvas: menu, configuração de partida, HUD da corrida,
// resultados, personalização de tampinhas e ajustes. Grande, mas simples.
import { track, LEVELS, LEVEL_COLORS, TRACKS_PER_LEVEL, buildCustomTrack, seededTrack } from './game/generator';
import { TrackModel } from './engine/track';
import { SKINS, skinById, CAP_COLORS, unlockedSkins } from './game/skins';
import { drawCap, RARITY_COLOR, RARITY_LABEL, RARITY_ORDER } from './render/capart';
import { AI_KINDS, AI_LABEL, AIKind } from './game/ai';
import { PlayerDef, GameManager } from './game/manager';
import { ITEMS } from './game/chaos';
import { LIGAS, COMPS, CampComp, compById, campState, saveCamp, campStats, upCost, UP_MAX, UP_STEP, isUnlocked, pickOpponents, CampState, LIGA_PRIZE, ligaGolds } from './game/campaign';
import { RANK_TIERS, RANK_COMPS, RankComp, RankCirc, rankCompById, rankState, saveRank, resetRank, rankTotal, tierGolds, tierDone, rankUnlocked, rankPrizeOf, eligibleCaps, applyRankResult, pickRankOpponents, compMax, RANK_MAX_TOTAL } from './game/ranked';
import { RankNet, RankRow, standings as rankStandings, nameFree, validName, nameKey } from './net/rank';
import { CapStats } from './engine/core';
import { Online } from './net/online';
import { save, capLevel, capLevelProgress } from './game/save';
import { settings } from './audio';
import { getLang, toggleLang } from './i18n';
import { WeatherState, WEATHER_ICO, WEATHER_LABEL } from './game/weather';
import { exportAccount, importAccount } from './game/transfer';
import { Gallery } from './net/gallery';

export type Mode = 'quick' | 'ai' | 'local' | 'champ' | 'daily' | 'online' | 'caos' | 'elim' | 'trial' | 'dupla' | 'camp' | 'rank' | 'batalha';
export type Pick = 'specific' | 'randlevel' | 'randany';
export type ChampFmt = 'copa' | 'gp' | 'sprint' | 'maratona';
export interface MatchConfig { level: number; trackIdx: number; pick: Pick; players: PlayerDef[]; mode: Mode; champFmt?: ChampFmt; teamSize?: number; customTrack?: any; campComp?: string; rankComp?: string; rankCirc?: RankCirc; }
export const CHAMP_FMT: Record<ChampFmt, { name: string; ico: string; races: number; desc: string }> = {
  sprint: { name: 'Sprint', ico: '⚡', races: 3, desc: '3 pistas rápidas' },
  copa: { name: 'Copa', ico: '🏆', races: 5, desc: '5 pistas do nível' },
  maratona: { name: 'Maratona', ico: '🔥', races: 7, desc: '7 pistas, fôlego total' },
  gp: { name: 'Grand Prix', ico: '🌍', races: 5, desc: '1 de cada nível, dificuldade sobe' },
};

export interface UICallbacks {
  start: (cfg: MatchConfig) => void;
  setVols: (music: number, sfx: number, muted: boolean) => void;
  setSkin: (id: string) => void;
  preview?: (def: any) => void;
  onFlickBtn?: () => void;
}

const AI_NAMES = ['Bolha', 'Zé', 'Nina', 'Tato', 'Duda', 'Chico', 'Lila'];

export class UI {
  root = document.getElementById('ui')!;
  private cb: UICallbacks;
  online: Online;
  // estado de configuração
  cfgLevel = 0; cfgTrack = 0; cfgPick: Pick = 'specific'; cfgMode: Mode = 'quick'; cfgChampFmt: ChampFmt = 'copa'; cfgTeamSize = 2;
  cfgPlayers: { human: boolean; ai: AIKind; color: number; name: string }[] = [];
  myName = 'Você';
  // editor de pista
  edPts: { x: number; y: number }[] = []; edObs: { type: string; x: number; y: number; n?: number }[] = [];
  edPatches: { surface: string; x: number; y: number; r?: number }[] = [];
  edTool = 'draw'; edTheme = 0; edHalf = 4.2; edName = 'Minha Pista';
  edProtect = 1; edOpenArcs: number[] = [];   // proteção: fração de muro + trechos apagados à mão
  private edPrevMode: 'view' | 'move' | 'wall' = 'view';
  private edPrevDef: any = null; private edPrevTrack: TrackModel | null = null; private edDragItem: any = null;
  private toastEl: HTMLElement | null = null; private toastT = 0;

  constructor(cb: UICallbacks, online: Online) { this.cb = cb; this.online = online; this.myName = save.name() || 'Você'; this.resetPlayers('quick'); }

  private el(html: string): HTMLElement { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild as HTMLElement; }
  private clear(): void { this.root.querySelectorAll('.screen').forEach(s => s.remove()); }

  // camada de fundo: tampinhas flutuando + bolhas subindo (dá vida às telas)
  private bgFx(n = 8): HTMLElement {
    const layer = this.el('<div class="fxlayer"></div>');
    for (let i = 0; i < n; i++) {
      const sk = SKINS[Math.floor(Math.random() * SKINS.length)];
      const wrap = document.createElement('div'); wrap.className = 'fcap';
      const sz = 30 + Math.random() * 52;
      wrap.style.cssText = `left:${Math.random() * 100}%;width:${sz}px;height:${sz}px;opacity:${(0.1 + Math.random() * 0.16).toFixed(2)};animation-duration:${(16 + Math.random() * 16).toFixed(1)}s;animation-delay:${(-Math.random() * 26).toFixed(1)}s`;
      const cv = drawCap(sk.art, 72); cv.style.width = '100%'; cv.style.height = '100%'; cv.style.display = 'block';
      wrap.appendChild(cv); layer.appendChild(wrap);
    }
    for (let i = 0; i < 10; i++) {
      const b = document.createElement('div'); b.className = 'bub'; const sz = 6 + Math.random() * 18;
      b.style.cssText = `left:${Math.random() * 100}%;width:${sz}px;height:${sz}px;animation-duration:${(10 + Math.random() * 12).toFixed(1)}s;animation-delay:${(-Math.random() * 20).toFixed(1)}s`;
      layer.appendChild(b);
    }
    return layer;
  }
  private confetti(host: HTMLElement): void {
    const cols = ['#f2b100', '#e5484d', '#3b82f6', '#2ea44f', '#a855f7', '#ff8fb0', '#fff'];
    for (let i = 0; i < 46; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.style.cssText = `left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-duration:${(1 + Math.random() * 1.5).toFixed(2)}s;animation-delay:${(Math.random() * 0.5).toFixed(2)}s;transform:rotate(${Math.floor(Math.random() * 360)}deg)`; host.appendChild(c); setTimeout(() => c.remove(), 2800); }
  }

  // ------------------------------------------------------------------ MENU
  showMenu(): void {
    this.clear();
    const wins = save.wins(); const unl = unlockedSkins(wins).length;
    const s = this.el(`
      <div class="screen menu">
        <div class="topbar">
          <div class="coin-pill">🏆 <b>${wins}</b>&nbsp;<span style="font-weight:700;font-size:12px;opacity:.85">vitórias</span></div>
          <button class="lang-btn" id="langBtn" data-notr>${getLang() === 'pt' ? '🇺🇸 English' : '🇧🇷 Português'}</button>
          <button class="icon-btn" id="cfgBtn">⚙</button>
        </div>
        <div class="logo">
          <div class="cap-ico" id="capico"></div>
          <h1>Tampinha <em>Rally</em></h1>
          <div class="tag">CORRIDA DE TAMPINHAS • PETELECO &amp; CAOS</div>
        </div>
        <div class="mode-grid">
          <button class="mode-btn feat" data-m="quick"><span class="mi">🏁</span><b>Jogar Rápido</b><span class="ms">você + IA, é só jogar</span></button>
          <button class="mode-btn" data-m="ai" style="--a:var(--blu)"><span class="mi">🤖</span><b>Contra a IA</b><span class="ms">escolha os rivais</span></button>
          <button class="mode-btn" data-m="mp" style="--a:var(--grn)"><span class="mi">🌐</span><b>Multiplayer</b><span class="ms">local ou online</span></button>
          <button class="mode-btn hot" data-m="camp" style="--a:#c98a00"><span class="mi">🏆</span><b>Campanha</b><span class="ms">${this.campMenuSub()}</span></button>
          <button class="mode-btn hot" data-m="rank" style="--a:#7c3aed"><span class="mi">⚔️</span><b>Ranqueada</b><span class="ms">${this.rankMenuSub()}</span></button>
          <button class="mode-btn" data-m="modes" style="--a:#ff4fa3"><span class="mi">🎡</span><b>Modos de Jogo</b><span class="ms">Caos, Eliminação, Dupla…</span></button>
          <button class="mode-btn" data-m="champ" style="--a:var(--gold)"><span class="mi">🏆</span><b>Campeonato</b><span class="ms">4 formatos, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily" style="--a:var(--pur)"><span class="mi">📅</span><b>Desafio Diário</b><span class="ms">a pista do dia</span></button>
          <button class="mode-btn" data-m="editor" style="--a:#00c2a8"><span class="mi">✏️</span><b>Editor de Pista</b><span class="ms">crie e jogue a sua</span></button>
          <button class="mode-btn" data-m="skins" style="--a:var(--orange)"><span class="mi">🎨</span><b>Tampinhas</b><span class="ms">coleção ${unl}/${SKINS.filter(k => !k.hidden).length}</span></button>
          <button class="mode-btn" data-m="help" style="--a:#00b4d8"><span class="mi">📖</span><b>Como Jogar</b><span class="ms">obstáculos &amp; atributos</span></button>
        </div>
      </div>`);
    s.prepend(this.bgFx(9));
    (s.querySelector('#capico') as HTMLElement).appendChild(drawCap(skinById('coca').art, 120));
    this.root.appendChild(s);
    // idioma: alterna PT ↔ EN ao vivo (o botão mostra pra QUAL língua vai trocar)
    s.querySelector('#langBtn')!.addEventListener('click', () => { toggleLang(); this.showMenu(); });
    s.querySelectorAll('.mode-btn').forEach(b => b.addEventListener('click', () => {
      const m = (b as HTMLElement).dataset.m!;
      if (m === 'skins') this.showSkins();
      else if (m === 'help') this.showHelp();
      else if (m === 'mp') this.showMultiplayer();
      else if (m === 'modes') this.showModes();
      else if (m === 'editor') this.showEditor();
      else if (m === 'camp') this.showCampaign();
      else if (m === 'rank') this.showRanked();
      else this.showSetup(m as Mode);
    }));
    s.querySelector('#cfgBtn')!.addEventListener('click', () => this.showSettings());
  }

  // ------------------------------------------------------------ MODOS DE JOGO
  showModes(): void {
    this.clear();
    const modes: { m: string; ico: string; name: string; sub: string; col: string }[] = [
      { m: 'caos', ico: '🌀', name: 'Modo Caos', sub: 'Power-ups estilo Mario Kart! Quem está atrás pega os melhores itens.', col: '#ff4fa3' },
      { m: 'elim', ico: '💀', name: 'Eliminação', sub: 'Várias pistas: o último de cada corrida é eliminado até sobrar 1.', col: '#e5484d' },
      { m: 'trial', ico: '⏱️', name: 'Contra-Relógio', sub: 'Sozinho contra o cronômetro: chegue com o MENOR número de petelecos.', col: '#3b82f6' },
      { m: 'dupla', ico: '🤝', name: 'Corrida de Dupla', sub: 'Times! 2×2 ou 3×3 — a soma das colocações decide o time campeão.', col: '#2ea44f' },
      { m: 'batalha', ico: '🥊', name: 'Batalha da Mesa', sub: 'Sem corrida: uma mesa redonda que ENCOLHE. Derrube os rivais — o último vivo vence!', col: '#f2b100' },
    ];
    const s = this.el(`<div class="screen setup modes-screen">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Modos de Jogo</h2><div></div></div>
      <div class="modes-note">O jogo <b>comum</b> continua no menu. Aqui são os modos especiais — bem diferentes! 🎉</div>
      <div class="modes-list">
        ${modes.map(x => `<button class="modecard" data-m="${x.m}" style="--mc:${x.col}"><span class="mc-ico">${x.ico}</span><div class="mc-tx"><b>${x.name}</b><span>${x.sub}</span></div><span class="mc-go">▶</span></button>`).join('')}
      </div>
      <div class="modes-hint">🌐 Dupla e Campeonato também dá pra jogar <b>Online</b> (no Multiplayer → Online).</div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(7));
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    s.querySelectorAll('.modecard').forEach(b => b.addEventListener('click', () => this.showSetup((b as HTMLElement).dataset.m as Mode)));
  }

  // ============================================================ CAMPANHA
  campMenuSub(): string {
    const st = campState();
    if (!st.cap) return 'comece do zero, vire lenda';
    if (st.done) return '👑 ZERADA! · reviva a glória';
    const t = Object.values(st.best).filter(p => p <= 3).length;
    return `${t}/${COMPS.length} troféus · continue!`;
  }
  showCampaign(): void {
    const st = campState();
    if (!st.cap) { this.showCampStarterPick(); return; }
    this.clear();
    const trophies = Object.values(st.best).filter(p => p <= 3).length;
    const s = this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>🏆 Campanha</h2><div></div></div>
      <div class="camp-head">
        <div class="camp-face" id="cface"></div>
        <div class="camp-info">
          <b>${skinById(st.cap).name}</b>
          <span>🏅 ${trophies}/${COMPS.length} troféus ${st.done ? '· <b class="camp-done">👑 ZERADA</b>' : ''}</span>
        </div>
        <button class="chip camp-ofi" id="ofi">🔧 Oficina <b>${st.pts}</b></button>
      </div>
      <div class="camp-scroll" id="ligas"></div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(5));
    const cv = drawCap(skinById(st.cap).art, 96); cv.style.width = '100%'; cv.style.height = '100%'; cv.style.display = 'block';
    (s.querySelector('#cface') as HTMLElement).appendChild(cv);
    (s.querySelector('#cface') as HTMLElement).addEventListener('click', () => this.showCampOficina());
    s.querySelector('#ofi')!.addEventListener('click', () => this.showCampOficina());
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    const host = s.querySelector('#ligas') as HTMLElement;
    LIGAS.forEach((lg, li) => {
      const pid = LIGA_PRIZE[li]; const pk = skinById(pid);
      const golds = ligaGolds(st, li);
      const earned = save.hasBonus(pid);
      const sec = this.el(`<div class="camp-liga" style="--lc:${lg.col}">
        <div class="cl-head"><span class="cl-ico">${lg.ico}</span><div class="cl-tx"><b>${lg.name}</b><span>${lg.desc}</span></div></div>
        <button class="cl-prize ${earned ? 'earned' : ''}" style="--rc:${RARITY_COLOR[pk.rarity]}">
          <div class="clp-face"></div>
          <div class="clp-tx">
            <span class="clp-tag">${earned ? '🏆 CONQUISTADA!' : '🎁 PRÊMIO DA LIGA'}</span>
            <b>${pk.name}</b>
            <span class="clp-rar"><i class="rar-dot"></i>${RARITY_LABEL[pk.rarity]} EXCLUSIVA</span>
            <span class="clp-cond">${earned ? 'sua pra sempre — já joga com ela no modo livre!' : 'faça <b>🥇 OURO</b> nas 4 competições da liga'}</span>
            <span class="clp-prog">${'🥇'.repeat(golds)}${'<i class="clp-slot"></i>'.repeat(Math.max(0, 4 - golds))} <em>${golds}/4</em></span>
          </div>
          <span class="clp-zoom">🔍</span>
        </button>
        <div class="cl-comps"></div>
      </div>`);
      const pf = sec.querySelector('.clp-face') as HTMLElement;
      const pcv = drawCap(pk.art, 100); pcv.style.width = '72px'; pcv.style.height = '72px'; pcv.style.display = 'block';
      pf.appendChild(pcv);
      sec.querySelector('.cl-prize')!.addEventListener('click', () => this.showCapStats(pk.name, pid));
      const grid = sec.querySelector('.cl-comps') as HTMLElement;
      COMPS.forEach((c, ci) => {
        if (c.liga !== li) return;
        const unlocked = isUnlocked(st, ci);
        const best = st.best[c.id];
        const trophy = best === 1 ? '🥇' : best === 2 ? '🥈' : best === 3 ? '🥉' : '';
        const card = this.el(`<button class="cc ${unlocked ? '' : 'locked'} ${c.final ? 'final' : ''}">
          <span class="cc-ico">${unlocked ? c.ico : '🔒'}</span>
          <b>${c.name}</b>
          <span class="cc-sub">${c.races} corridas · ${c.nOpp} rivais</span>
          <span class="cc-tro">${trophy || (unlocked ? '▶ JOGAR' : 'vença a anterior')}</span>
        </button>`);
        if (unlocked) card.addEventListener('click', () => this.showCampCompIntro(c));
        grid.appendChild(card);
      });
      host.appendChild(sec);
    });
  }
  // escolha da tampinha inicial (só na primeira vez — é pra vida toda!)
  showCampStarterPick(): void {
    this.clear();
    const starters = SKINS.filter(k => k.hidden);
    const s = this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>🏆 Campanha</h2><div></div></div>
      <div class="camp-story">Você achou <b>três tampinhas velhas</b> no fundo do quintal. Nenhuma parece grande coisa… ainda. Escolha a sua companheira: vocês vão juntas <b>do quintal ao topo do mundo</b> — e ela evolui a cada troféu. <b>Escolha com carinho: é pra sempre!</b></div>
      <div class="camp-pickers" id="pk"></div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(6));
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    const host = s.querySelector('#pk') as HTMLElement;
    for (const k of starters) {
      const card = this.el(`<button class="camp-pick"><div class="cp-face"></div><b>${k.name}</b><span class="cp-desc">${k.desc}</span>${capBars(k.stats, true)}<span class="cp-go">ESCOLHER ▶</span></button>`);
      const cv = drawCap(k.art, 120); cv.style.width = '92px'; cv.style.height = '92px'; cv.style.display = 'block'; cv.style.margin = '0 auto';
      (card.querySelector('.cp-face') as HTMLElement).appendChild(cv);
      card.addEventListener('click', () => {
        const st = campState(); st.cap = k.id; saveCamp(st);
        this.notify(`${k.name} é sua! Boa sorte, campeã! 🍀`, 'good');
        this.showCampaign();
      });
      host.appendChild(card);
    }
  }
  // OFICINA: distribui pontos nos 7 atributos (só valem na campanha)
  showCampOficina(): void {
    this.clear();
    const st = campState(); const sk = skinById(st.cap || 'coca');
    const cur = campStats(st);
    const s = this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Campanha</button><h2>🔧 Oficina</h2><div></div></div>
      <div class="ofi-head">
        <div class="camp-face big" id="oface"></div>
        <div class="ofi-tx"><b>${sk.name}</b><span>Pontos de Oficina: <b class="ofi-pts">${st.pts}</b> ⭐</span><small>Ganhe pontos com troféus e melhore ONDE VOCÊ quiser. Vale só na campanha.</small></div>
      </div>
      <div class="ofi-rows" id="rows"></div>
      <button class="chip" id="reset">↩️ Redistribuir tudo (de graça)</button>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(4));
    const cv = drawCap(sk.art, 120); cv.style.width = '100%'; cv.style.height = '100%'; cv.style.display = 'block';
    (s.querySelector('#oface') as HTMLElement).appendChild(cv);
    s.querySelector('#back')!.addEventListener('click', () => this.showCampaign());
    const rows = s.querySelector('#rows') as HTMLElement;
    const defs: [string, string, keyof CapStats][] = [['💨', 'Desliza', 'slide'], ['⚖️', 'Peso', 'weight'], ['🎯', 'Controle', 'control'], ['🏀', 'Quique', 'bounce'], ['🌀', 'Estabil.', 'stability'], ['💥', 'Potência', 'power'], ['🧲', 'Aderência', 'grip']];
    const render = () => {
      const st2 = campState(); const cur2 = campStats(st2);
      (s.querySelector('.ofi-pts') as HTMLElement).textContent = String(st2.pts);
      rows.innerHTML = '';
      for (const [ico, lab, key] of defs) {
        const lvl = st2.alloc[key] || 0; const cost = upCost(lvl); const maxed = lvl >= UP_MAX;
        const canBuy = !maxed && st2.pts >= cost;
        const pips = Array.from({ length: UP_MAX }, (_, i) => `<i class="${i < lvl ? 'on' : ''}"></i>`).join('');
        const row = this.el(`<div class="ofi-row">
          <span class="or-ico">${ico}</span>
          <div class="or-mid"><div class="or-top"><b>${lab}</b><span class="or-val">${statVal(cur2[key])}</span></div><div class="or-pips">${pips}</div></div>
          <button class="or-plus ${canBuy ? '' : 'off'}" data-k="${key}">${maxed ? 'MAX' : `+1 <small>⭐${cost}</small>`}</button>
        </div>`);
        const btn = row.querySelector('.or-plus') as HTMLElement;
        if (canBuy) btn.addEventListener('click', () => {
          const st3 = campState(); const l = st3.alloc[key] || 0; const cc = upCost(l);
          if (st3.pts < cc || l >= UP_MAX) return;
          st3.pts -= cc; st3.alloc[key] = l + 1; saveCamp(st3); render();
        });
        rows.appendChild(row);
      }
    };
    render();
    s.querySelector('#reset')!.addEventListener('click', () => {
      const st3 = campState(); let refund = 0;
      for (const k of Object.keys(st3.alloc)) { const l = st3.alloc[k]; for (let i = 0; i < l; i++) refund += upCost(i); }
      if (!refund) return;
      st3.pts += refund; st3.alloc = {}; saveCamp(st3); render();
      this.notify(`⭐ ${refund} pontos devolvidos!`, 'good');
    });
  }
  // ficha da competição antes de começar
  showCampCompIntro(c: CampComp): void {
    const st = campState(); const lg = LIGAS[c.liga];
    const rarLab: Record<string, string> = { comum: 'Comuns', rara: 'Raras', epica: 'Épicas', lendaria: 'Lendárias', mitica: 'MÍTICAS' };
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>${c.ico} ${c.name}</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">${lg.ico} ${lg.name} · dificuldade <b>${LEVELS[c.level]}</b></div>
      <div class="cc-detail">
        <div>🏁 <b>${c.races} corridas</b> — pontos por posição, soma tudo</div>
        <div>🥊 <b>${c.nOpp} rivais</b> com tampinhas <b>${c.rarities.map(r => rarLab[r]).join(' e ')}</b></div>
        <div>🏅 Pódio libera a próxima · 🥇 OURO = mais pontos de Oficina</div>
        ${c.final ? '<div class="cc-final-note">👑 A GRANDE FINAL: vença e entre pra história!</div>' : ''}
      </div>
      <div class="mactions"><button class="chip" id="cofi">🔧 Oficina</button><button class="play-btn" id="go">🏁 Começar</button></div>`);
    box.querySelector('.ov-x')!.addEventListener('click', close);
    box.querySelector('#cofi')!.addEventListener('click', () => { close(); this.showCampOficina(); });
    box.querySelector('#go')!.addEventListener('click', () => { close(); this.launchCamp(c); });
  }
  launchCamp(c: CampComp): void {
    const st = campState(); if (!st.cap) return;
    const opp = pickOpponents(c);
    const players: PlayerDef[] = [
      { name: this.myName || 'Você', isAI: false, skin: st.cap, stats: campStats(st) },
      ...opp.map((sk, i) => ({ name: AI_NAMES[i % AI_NAMES.length], isAI: true, ai: c.aiKinds[i % c.aiKinds.length], skin: sk })),
    ];
    this.cb.start({ level: c.level, trackIdx: seededTrack(st.seed, c.id, 0), pick: 'randlevel', players, mode: 'camp', campComp: c.id });
  }
  // resultado da competição (troféu + recompensas)
  onCampBack: (() => void) | null = null;
  onCampRetry: ((compId: string) => void) | null = null;
  onCampFinale: (() => void) | null = null;
  showCampResult(d: { comp: CampComp; place: number; ptsGained: number; winsGained: number; improved: boolean; finished: boolean; rows: { name: string; skin: string; pts: number; you: boolean }[]; hist?: number[]; prize?: string | null }): void {
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    const tro = d.place === 1 ? '🥇' : d.place === 2 ? '🥈' : d.place === 3 ? '🥉' : '😤';
    const head = d.place === 1 ? 'CAMPEÃO!' : d.place === 2 ? 'Prata!' : d.place === 3 ? 'Bronze!' : d.place + 'º lugar';
    const podio = d.place <= 3;
    const rewards = (d.ptsGained || d.winsGained)
      ? `<div class="camp-rw">${d.ptsGained ? `<span class="rw">🔧 +${d.ptsGained} pts de Oficina</span>` : ''}${d.winsGained ? `<span class="rw">🏆 +${d.winsGained} vitórias (modo livre)</span>` : ''}</div>`
      : (podio ? '<div class="camp-rw"><span class="rw dim">troféu já conquistado — melhore pra ganhar mais!</span></div>' : '');
    const pz = d.prize ? skinById(d.prize) : null;
    box.innerHTML = `<div class="camp-tro">${tro}</div><h3>${d.comp.ico} ${d.comp.name}</h3><div class="camp-place">${head}</div>
      ${rewards}
      ${pz ? `<div class="prize-reveal" style="--rc:${RARITY_COLOR[pz.rarity]}">
        <div class="pr-tag">✨ TAMPINHA EXCLUSIVA DESBLOQUEADA ✨</div>
        <div class="pr-face" id="prf"></div>
        <b class="pr-name">${pz.name}</b>
        <span class="pr-rar"><i class="rar-dot"></i>${RARITY_LABEL[pz.rarity]} · OURO nas 4 da liga</span>
        ${capBars(pz.stats, true)}
        <span class="pr-note">já é sua no modo livre! 🎉</span>
      </div>` : ''}
      ${!podio ? '<div class="camp-tip">Precisa de PÓDIO (top 3) pra liberar a próxima. Passa na 🔧 Oficina e tenta de novo!</div>' : ''}
      ${d.hist ? raceStrip(d.hist.length, d.hist.length, d.hist) : ''}
      <div class="champ-stand">${d.rows.map((r, i) => `<div class="cs-row ${r.you ? 'you' : ''} ${i === 0 ? 'lead' : ''}"><span class="cs-pos">${i + 1}º</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts}</b></div>`).join('')}</div>
      <div class="mactions"><button class="chip" id="again">↻ De novo</button><button class="play-btn" id="mapa">${d.finished ? '👑 Ver o FINAL' : 'Campanha ▶'}</button></div>`;
    box.querySelectorAll('.cs-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 44)));
    const prf = box.querySelector('#prf') as HTMLElement | null;
    if (prf && pz) { const pcv = drawCap(pz.art, 150); pcv.style.width = '110px'; pcv.style.height = '110px'; pcv.style.display = 'block'; pcv.style.margin = '0 auto'; prf.appendChild(pcv); }
    modal.classList.remove('hidden');
    if (podio || pz) this.confetti(box);
    box.querySelector('#again')!.addEventListener('click', () => { this.hideModal(); this.onCampRetry?.(d.comp.id); });
    box.querySelector('#mapa')!.addEventListener('click', () => {
      this.hideModal();
      if (d.finished) this.onCampFinale?.(); else this.onCampBack?.();
    });
  }
  // O FINAL — cerimônia de zeramento
  showCampFinale(): void {
    const st = campState(); const sk = skinById(st.cap || 'coca');
    const golds = Object.values(st.best).filter(p => p === 1).length;
    this.clear();
    const s = this.el(`<div class="screen camp-finale">
      <div class="fin-stars"></div>
      <div class="fin-crown">👑</div>
      <h1 class="fin-title">LENDA DAS<br>TAMPINHAS</h1>
      <div class="fin-face" id="ff"></div>
      <div class="fin-cap">${sk.name}</div>
      <div class="fin-story">Ela era só uma tampinha <b>${sk.name.toLowerCase()}</b> achada no quintal.<br>Ninguém apostava nada. Hoje, o mundo inteiro conhece o seu peteleco.</div>
      <div class="fin-stats">
        <div><b>${st.races}</b><span>corridas</span></div>
        <div><b>${golds}</b><span>ouros</span></div>
        <div><b>${Object.values(st.best).filter(p => p <= 3).length}/${COMPS.length}</b><span>troféus</span></div>
      </div>
      <div class="fin-bonus">🎁 Bônus de lenda: <b>+10 vitórias</b> no modo livre e <b>+10 pontos</b> de Oficina!</div>
      <div class="fin-note">A campanha continua aberta: cace os 🥇 que faltam!</div>
      <button class="play-btn" id="fim">✨ Voltar como LENDA</button>
    </div>`);
    this.root.appendChild(s);
    const cv = drawCap(sk.art, 180); cv.style.width = '130px'; cv.style.height = '130px'; cv.style.display = 'block'; cv.style.margin = '0 auto';
    (s.querySelector('#ff') as HTMLElement).appendChild(cv);
    this.confetti(s); setTimeout(() => this.confetti(s), 900); setTimeout(() => this.confetti(s), 1800);
    s.querySelector('#fim')!.addEventListener('click', () => this.showCampaign());
  }

  // ============================================================ RANQUEADA
  // DOIS CIRCUITOS: a clássica (⚔️) e a CAOS (🌀, corridas com power-ups).
  // Mesma escada de 40 competições, mas ranking, nomes, progresso, semente e
  // prêmios TOTALMENTE separados — dá pra ser "Diego" nos dois.
  rankNet = new RankNet();
  rankNetCaos = new RankNet('caos');
  rankCirc: RankCirc = 'normal';
  private rankNetOn = { normal: false, caos: false };
  private rnet(): RankNet { return this.rankCirc === 'caos' ? this.rankNetCaos : this.rankNet; }
  private rkTitle(): string { return this.rankCirc === 'caos' ? '🌀 Ranqueada Caos' : '⚔️ Ranqueada'; }
  private rankCapSel: string | null = null;      // tampinha escolhida pra próxima competição
  onRankBack: (() => void) | null = null;
  onRankRetry: ((compId: string) => void) | null = null;

  rankMenuSub(): string {
    const a = rankState('normal'), b = rankState('caos');
    if (!a.name && !b.name) return 'clássica e Caos · ranking mundial';
    const parts: string[] = [];
    if (a.name) parts.push(`⚔️ ${rankTotal(a)}`);
    if (b.name) parts.push(`🌀 ${rankTotal(b)}`);
    return parts.join(' · ') + ' pts';
  }
  private rankNetStart(): void {
    const circ = this.rankCirc;
    if (this.rankNetOn[circ]) return;
    this.rankNetOn[circ] = true;
    const st = rankState(circ);
    const net = this.rnet();
    net.watch(st.name, st.dev);
    net.onNameLost = (n) => {
      const st2 = rankState(circ); st2.name = null; saveRank(st2, circ);
      this.notify(`⚠️ O nome "${n}" já era de outra pessoa (registro mais antigo). Escolha outro!`, 'bad');
    };
    net.start();
  }
  // minha linha no quadro (score = soma dos melhores; vitrine = última tampinha)
  private myRankRow(): RankRow | null {
    const st = rankState(this.rankCirc); if (!st.name) return null;
    const golds = [0, 1, 2, 3, 4].reduce((s, t) => s + tierGolds(st, t), 0);
    let tier = 0; for (let i = 0; i < RANK_COMPS.length; i++) if (rankUnlocked(st, i)) tier = RANK_COMPS[i].tier;
    return { name: st.name, dev: st.dev, score: rankTotal(st), tier, golds, cap: st.cap, claimTs: st.claimTs, ts: Date.now() };
  }
  private rankSubmit(): void { const r = this.myRankRow(); if (r) this.rnet().submit(r); }
  private rankStatusHtml(): string {
    const s = this.rnet().status;
    return s === 'online' ? '<span class="rk-dot on"></span>AO VIVO' : s === 'hub' ? '<span class="rk-dot on"></span>AO VIVO · você é o servidor' : s === 'connecting' ? '<span class="rk-dot mid"></span>conectando…' : '<span class="rk-dot off"></span>offline · cópia local';
  }
  private myRankPos(): { pos: number; total: number } {
    const rows = rankStandings(this.rnet().board);
    const st = rankState(this.rankCirc);
    const i = rows.findIndex(r => r.dev === st.dev);
    return { pos: i < 0 ? rows.length + 1 : i + 1, total: Math.max(rows.length, i < 0 ? rows.length + 1 : rows.length) };
  }
  // abas ⚔️/🌀 no topo das telas da ranqueada
  private rankTabs(host: HTMLElement): HTMLElement {
    const t = this.el(`<div class="rk-tabs">
      <button class="rk-tab ${this.rankCirc === 'normal' ? 'sel' : ''}" data-c="normal">⚔️ Clássica</button>
      <button class="rk-tab caos ${this.rankCirc === 'caos' ? 'sel' : ''}" data-c="caos">🌀 Caos</button>
    </div>`);
    t.querySelectorAll('.rk-tab').forEach(b => b.addEventListener('click', () => {
      const c = (b as HTMLElement).dataset.c as RankCirc;
      if (c === this.rankCirc) return;
      this.rankCirc = c; this.rankCapSel = null; this.showRanked();
    }));
    host.appendChild(t);
    return t;
  }

  showRanked(circ?: RankCirc): void {
    if (circ) this.rankCirc = circ;
    const st = rankState(this.rankCirc);
    if (!st.name) { this.showRankRegister(); return; }
    this.rankNetStart();
    this.rankSubmit();     // garante que o quadro local (e o hub, se online) tem meu score atual
    this.clear();
    const caos = this.rankCirc === 'caos';
    const total = rankTotal(st);
    const done = Object.values(st.place).filter(p => p <= 3).length;
    const pos = this.myRankPos();
    const prizes = rankPrizeOf(this.rankCirc);
    const s = this.el(`<div class="screen setup camp rank ${caos ? 'rk-caos' : ''}">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>${this.rkTitle()}</h2><div></div></div>
      <div class="rk-tabs-slot"></div>
      <div class="rank-head">
        <div class="camp-face" id="rface"></div>
        <div class="rank-info">
          <b>${st.name}</b>
          <span class="rank-score">⚡ <b>${total}</b> <small>/ ${RANK_MAX_TOTAL} pts</small></span>
          <span class="rank-sub">🏅 ${done}/40 · ${pos.pos > 0 && this.rnet().status !== 'off' ? `🌍 ${pos.pos}º do mundo` : this.rankStatusHtml()}</span>
        </div>
        <button class="chip rank-board-btn" id="board">🌍 Ranking</button>
      </div>
      ${caos ? '<div class="rk-caos-note">🌀 Aqui as corridas têm <b>POWER-UPS</b>: caixinhas na pista, 2 bolsos, raio, furacão, fantasma…</div>' : ''}
      <div class="rank-bar"><i style="width:${Math.min(100, total / RANK_MAX_TOTAL * 100).toFixed(1)}%"></i></div>
      <div class="camp-scroll" id="tiers"></div>
      <button class="rk-del" id="del">🗑️ excluir conta deste ranking</button>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(5));
    this.rankTabs(s.querySelector('.rk-tabs-slot') as HTMLElement);
    const cv = drawCap(skinById(st.cap).art, 96); cv.style.cssText = 'width:100%;height:100%;display:block';
    (s.querySelector('#rface') as HTMLElement).appendChild(cv);
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    s.querySelector('#board')!.addEventListener('click', () => this.showRankBoard());
    s.querySelector('#del')!.addEventListener('click', () => this.showRankDelete());
    const host = s.querySelector('#tiers') as HTMLElement;
    RANK_TIERS.forEach((tg, ti) => {
      const pid = prizes[ti]; const pk = skinById(pid);
      const golds = tierGolds(st, ti);
      const earned = save.hasBonus(pid);
      const dn = tierDone(st, ti);
      const sec = this.el(`<div class="camp-liga rank-tier" style="--lc:${tg.col}">
        <div class="cl-head"><span class="cl-ico">${tg.ico}</span><div class="cl-tx"><b>${tg.name}</b><span>${tg.desc}</span></div><span class="rk-tprog">${dn}/8</span></div>
        <button class="cl-prize ${earned ? 'earned' : ''}" style="--rc:${RARITY_COLOR[pk.rarity]}">
          <div class="clp-face"></div>
          <div class="clp-tx">
            <span class="clp-tag">${earned ? '🏆 CONQUISTADA!' : '👑 PRÊMIO DO TIER'}</span>
            <b>${pk.name}</b>
            <span class="clp-rar"><i class="rar-dot"></i>${RARITY_LABEL[pk.rarity]} EXCLUSIVA · a melhor do jogo</span>
            <span class="clp-cond">${earned ? 'sua pra sempre — joga com ela em tudo!' : 'faça <b>🥇 OURO</b> nas 8 competições do tier'}</span>
            <span class="clp-prog">${'🥇'.repeat(golds)}${'<i class="clp-slot"></i>'.repeat(Math.max(0, 8 - golds))} <em>${golds}/8</em></span>
          </div>
          <span class="clp-zoom">🔍</span>
        </button>
        <div class="cl-comps"></div>
      </div>`);
      const pf = sec.querySelector('.clp-face') as HTMLElement;
      const pcv = drawCap(pk.art, 100); pcv.style.cssText = 'width:72px;height:72px;display:block';
      pf.appendChild(pcv);
      sec.querySelector('.cl-prize')!.addEventListener('click', () => this.showCapStats(pk.name, pid));
      const grid = sec.querySelector('.cl-comps') as HTMLElement;
      RANK_COMPS.forEach((c, ci) => {
        if (c.tier !== ti) return;
        const unlocked = rankUnlocked(st, ci);
        const place = st.place[c.id];
        const trophy = place === 1 ? '🥇' : place === 2 ? '🥈' : place === 3 ? '🥉' : '';
        const best = st.best[c.id] ?? 0;
        const card = this.el(`<button class="cc rk-cc ${unlocked ? '' : 'locked'} ${c.idx === 7 ? 'final' : ''}">
          <span class="cc-ico">${unlocked ? c.ico : '🔒'}</span>
          <b>${c.name}</b>
          <span class="cc-sub">${c.races} corridas · rivais ${c.boost > 0 ? `+${Math.round(c.boost * 100)}% 💪` : 'na base'}</span>
          <span class="rk-pts ${best >= compMax(c) ? 'max' : ''}">${best > 0 ? `⚡ ${best}/${compMax(c)}` : unlocked ? '⚡ 0/' + compMax(c) : ''}</span>
          <span class="cc-tro">${trophy || (unlocked ? '▶ JOGAR' : 'pódio na anterior')}</span>
        </button>`);
        if (unlocked) card.addEventListener('click', () => this.showRankCompIntro(c));
        grid.appendChild(card);
      });
      host.appendChild(sec);
    });
  }

  // primeiro acesso ao CIRCUITO: registrar o nome único DELE
  showRankRegister(): void {
    this.rankNetStart();
    this.clear();
    const caos = this.rankCirc === 'caos';
    const s = this.el(`<div class="screen setup camp rank ${caos ? 'rk-caos' : ''}">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>${this.rkTitle()}</h2><div></div></div>
      <div class="rk-tabs-slot"></div>
      <div class="rank-reg">
        <div class="rk-reg-ico">${caos ? '🌀' : '⚔️'}</div>
        <h3>Escolha seu nome de batalha</h3>
        <p class="rk-reg-p">É o nome que aparece no <b>Ranking ${caos ? 'do CAOS' : 'Mundial'}</b> — e é <b>único aqui</b>: cada circuito tem os próprios nomes${caos ? ' (pode até repetir o da clássica!)' : ''}. Escolha bem: é a sua lenda!</p>
        <div class="rk-input-row"><input id="nm" maxlength="12" placeholder="ex.: Diego" autocomplete="off"><span class="rk-check" id="chk"></span></div>
        <div class="rk-status">${this.rankStatusHtml()}</div>
        <button class="play-btn" id="go">${caos ? '🌀' : '⚔️'} ENTRAR NO RANKING</button>
        <div class="rk-rules">
          ${caos ? '<div>🌀 <b>Corridas com POWER-UPS</b>: caixinhas na pista, 2 bolsos, raio, furacão, fantasma, pancada…</div>' : ''}
          <div>🪜 <b>5 tiers</b> (Normal → Místico) · <b>8 competições</b> cada — 40 no total</div>
          <div>🧢 Você joga com <b>as suas tampinhas</b>: no Normal valem as comuns; cada tier libera a raridade seguinte</div>
          <div>💪 Os rivais <b>ficam mais fortes</b> a cada etapa (até +45% na Grande Final do tier)</div>
          <div>⚡ Cada corrida vale pontos (12·9·7·5·3·1). O <b>melhor resultado</b> de cada competição soma no seu score — dá pra voltar e melhorar!</div>
          <div>👑 <b>OURO nas 8</b> de um tier = tampinha EXCLUSIVA ${caos ? 'do circuito Caos' : ''} (as melhores do jogo)</div>
        </div>
      </div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(6));
    this.rankTabs(s.querySelector('.rk-tabs-slot') as HTMLElement);
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    const inp = s.querySelector('#nm') as HTMLInputElement;
    const chk = s.querySelector('#chk') as HTMLElement;
    const stat = s.querySelector('.rk-status') as HTMLElement;
    const circ = this.rankCirc;
    const st = rankState(circ);
    const net = this.rnet();
    const verify = () => {
      const n = inp.value;
      if (!n.trim()) { chk.textContent = ''; return; }
      const err = validName(n);
      if (err) { chk.textContent = '✕ ' + err; chk.className = 'rk-check bad'; return; }
      if (!nameFree(net.board, n, st.dev)) { chk.textContent = '✕ nome já em uso'; chk.className = 'rk-check bad'; return; }
      chk.textContent = net.status === 'online' || net.status === 'hub' ? '✓ disponível' : '✓ livre por aqui';
      chk.className = 'rk-check ok';
    };
    inp.addEventListener('input', verify);
    net.onChange = () => { stat.innerHTML = this.rankStatusHtml(); verify(); };
    s.querySelector('#go')!.addEventListener('click', () => {
      const n = inp.value.trim().replace(/\s+/g, ' ');
      const err = validName(n);
      if (err) { this.notify('✕ ' + err, 'bad'); return; }
      if (!nameFree(net.board, n, st.dev)) { this.notify(`✕ "${n}" já está em uso neste ranking — escolha outro`, 'bad'); return; }
      const st2 = rankState(circ); st2.name = n; st2.claimTs = Date.now(); saveRank(st2, circ);
      net.watch(n, st2.dev);
      this.rankSubmit();
      if (net.status === 'off' || net.status === 'connecting') this.notify('📡 Sem conexão agora — seu nome será confirmado quando o ranking conectar', 'bad');
      else this.notify(`${circ === 'caos' ? '🌀' : '⚔️'} ${n} entrou pro ranking!`, 'good');
      this.showRanked();
    });
  }

  showRankDelete(): void {
    const circ = this.rankCirc;
    const st = rankState(circ);
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>🗑️ Excluir conta (${circ === 'caos' ? 'Caos' : 'clássica'})</b><button class="ov-x">✕</button></div>
      <div class="cc-detail">
        <div>Isso apaga <b>${st.name}</b> do ranking da ${circ === 'caos' ? 'Ranqueada CAOS' : 'Ranqueada clássica'} e <b>zera todo o progresso</b> desse circuito (as 40 competições).</div>
        <div>O nome <b>fica livre</b> pra qualquer pessoa usar. Tampinhas exclusivas já ganhas <b>continuam suas</b>. ${circ === 'caos' ? 'A Ranqueada clássica NÃO é afetada.' : 'A Ranqueada Caos NÃO é afetada.'}</div>
        <div class="cc-final-note">Não tem volta!</div>
      </div>
      <div class="mactions"><button class="chip" id="no">Cancelar</button><button class="play-btn danger" id="yes">Excluir mesmo</button></div>`);
    box.querySelector('.ov-x')!.addEventListener('click', close);
    box.querySelector('#no')!.addEventListener('click', close);
    box.querySelector('#yes')!.addEventListener('click', () => {
      close();
      if (st.name) this.rnet().submit({ name: st.name, dev: st.dev, score: 0, tier: 0, golds: 0, cap: st.cap, claimTs: st.claimTs, ts: Date.now(), del: Date.now() });
      resetRank(circ);
      this.rnet().watch(null, st.dev);
      this.notify('Conta excluída. O nome ficou livre.', 'good');
      this.showMenu();
    });
  }

  // RANKING MUNDIAL do circuito
  showRankBoard(): void {
    this.rankNetStart();
    this.rankSubmit();
    this.clear();
    const caos = this.rankCirc === 'caos';
    const net = this.rnet();
    const s = this.el(`<div class="screen setup camp rank ${caos ? 'rk-caos' : ''}">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Ranqueada</button><h2>🌍 Ranking ${caos ? 'do Caos' : 'Mundial'}</h2><div></div></div>
      <div class="rk-status center" id="stat">${this.rankStatusHtml()}</div>
      <div class="camp-scroll rk-rows" id="rows"></div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(4));
    s.querySelector('#back')!.addEventListener('click', () => { net.onChange = () => {}; this.showRanked(); });
    const rowsEl = s.querySelector('#rows') as HTMLElement;
    const st = rankState(this.rankCirc);
    const render = () => {
      (s.querySelector('#stat') as HTMLElement).innerHTML = this.rankStatusHtml();
      const rows = rankStandings(net.board);
      rowsEl.innerHTML = '';
      if (!rows.length) { rowsEl.appendChild(this.el('<div class="rk-empty">Ninguém no ranking ainda — seja a primeira lenda! ' + (caos ? '🌀' : '⚔️') + '</div>')); return; }
      rows.slice(0, 100).forEach((r, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`;
        const you = r.dev === st.dev;
        const tg = RANK_TIERS[Math.min(4, r.tier)];
        const row = this.el(`<div class="rk-row ${you ? 'you' : ''} ${i < 3 ? 'top' : ''}">
          <span class="rk-pos">${medal}</span>
          <span class="rk-capface"></span>
          <div class="rk-nm"><b>${r.name}${you ? ' <i>(você)</i>' : ''}</b><small>${tg.ico} ${tg.name}${r.golds ? ` · ${r.golds}🥇` : ''}</small></div>
          <b class="rk-sc">⚡ ${r.score}</b>
        </div>`);
        (row.querySelector('.rk-capface') as HTMLElement).appendChild(drawCap(skinById(r.cap || 'coca').art, 44));
        rowsEl.appendChild(row);
      });
    };
    render();
    net.onChange = render;
    net.refresh();
  }

  // ficha da competição + ESCOLHA DA TAMPINHA (elegível pelo tier)
  showRankCompIntro(c: RankComp): void {
    const st = rankState(this.rankCirc);
    const caos = this.rankCirc === 'caos';
    const tg = RANK_TIERS[c.tier];
    const caps = eligibleCaps(c.tier);
    if (!this.rankCapSel || !caps.some(k => k.id === this.rankCapSel)) this.rankCapSel = caps.some(k => k.id === st.cap) ? st.cap : caps[caps.length - 1]?.id || 'coca';
    const best = st.best[c.id] ?? 0;
    const rarLab = RANK_TIERS.slice(0, c.tier + 1).map(t2 => RARITY_LABEL[t2.rarity as keyof typeof RARITY_LABEL]).join(' · ');
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>${c.ico} ${c.name} <small class="rk-tiertag" style="--lc:${tg.col}">${tg.ico} ${tg.name}</small></b><button class="ov-x">✕</button></div>
      <div class="cc-detail">
        ${caos ? '<div>🌀 <b>MODO CAOS</b>: caixinhas de power-up na pista — 2 bolsos, raio, furacão, fantasma…</div>' : ''}
        <div>🏁 <b>${c.races} corridas</b> · pontos por posição (12·9·7·5·3·1)</div>
        <div>🥊 <b>${c.nOpp} rivais ${RARITY_LABEL[tg.rarity as keyof typeof RARITY_LABEL]}s</b> ${c.boost > 0 ? `<b class="rk-boost">+${Math.round(c.boost * 100)}% mais fortes 💪</b>` : 'na força natural'}</div>
        <div>⚡ Seu melhor aqui: <b>${best}/${compMax(c)}</b> — melhorou, o score sobe junto</div>
        <div>🏅 Pódio libera a próxima · 🥇 ouro conta pro prêmio do tier</div>
      </div>
      <div class="rk-pick-title">🧢 Escolha a tampinha <small>(valem: ${rarLab})</small></div>
      <div class="rk-capdet" id="capdet"></div>
      <div class="rk-pick" id="pick"></div>
      <div class="mactions"><button class="play-btn" id="go">🏁 Começar</button></div>`, 'rk-ov');
    box.querySelector('.ov-x')!.addEventListener('click', close);
    const pick = box.querySelector('#pick') as HTMLElement;
    const det = box.querySelector('#capdet') as HTMLElement;
    // FICHA da escolhida: cara, raridade e os 7 atributos (toca em outra e ela troca)
    const renderDet = () => {
      const k = skinById(this.rankCapSel || 'coca');
      det.style.setProperty('--rc', RARITY_COLOR[k.rarity]);
      det.innerHTML = `<div class="rkd-face"></div>
        <div class="rkd-tx">
          <div class="rkd-top"><b>${k.name}</b><span class="rkd-rar"><i class="rar-dot"></i>${RARITY_LABEL[k.rarity]}${k.prize != null || k.rprize != null ? ' · EXCLUSIVA ✨' : ''}</span></div>
          <span class="rkd-desc">${k.desc}</span>
          ${capBars(k.stats, true)}
        </div>`;
      const fcv = drawCap(k.art, 120); fcv.style.cssText = 'width:100%;height:100%;display:block';
      (det.querySelector('.rkd-face') as HTMLElement).appendChild(fcv);
      det.classList.remove('pop'); void det.offsetWidth; det.classList.add('pop');
    };
    const renderPick = () => {
      pick.innerHTML = '';
      for (const k of caps) {
        const sel = k.id === this.rankCapSel;
        const card = this.el(`<button class="rk-cap ${sel ? 'sel' : ''}" style="--rc:${RARITY_COLOR[k.rarity]}" title="${k.name}"><span class="rk-cap-face"></span></button>`);
        (card.querySelector('.rk-cap-face') as HTMLElement).appendChild(drawCap(k.art, 66));
        card.addEventListener('click', () => { this.rankCapSel = k.id; renderPick(); renderDet(); });
        pick.appendChild(card);
      }
    };
    renderPick(); renderDet();
    box.querySelector('#go')!.addEventListener('click', () => { close(); this.launchRank(c); });
  }
  launchRank(c: RankComp): void {
    const circ = this.rankCirc;
    const capId = this.rankCapSel || 'coca';
    const opp = pickRankOpponents(c);
    const players: PlayerDef[] = [
      { name: rankState(circ).name || 'Você', isAI: false, skin: capId },
      ...opp.map((o, i) => ({ name: AI_NAMES[i % AI_NAMES.length], isAI: true, ai: c.aiKinds[i % c.aiKinds.length], skin: o.skin, stats: o.stats })),
    ];
    this.cb.start({ level: c.level, trackIdx: seededTrack(rankState(circ).seed, c.id, 0), pick: 'randlevel', players, mode: 'rank', rankComp: c.id, rankCirc: circ });
  }

  // resultado da competição ranqueada (pontos + ranking + prêmio)
  showRankResult(d: { comp: RankComp; place: number; pts: number; rows: { name: string; skin: string; pts: number; you: boolean }[]; hist: number[]; capId: string }): void {
    const circ = this.rankCirc;
    const st = rankState(circ);
    const res = applyRankResult(st, d.comp.id, d.place, d.pts, d.capId, circ);
    this.rankNetStart();
    this.rankSubmit();
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    const tro = d.place === 1 ? '🥇' : d.place === 2 ? '🥈' : d.place === 3 ? '🥉' : '😤';
    const head = d.place === 1 ? 'OURO!' : d.place === 2 ? 'Prata!' : d.place === 3 ? 'Bronze!' : d.place + 'º lugar';
    const tg = RANK_TIERS[d.comp.tier];
    const golds = tierGolds(st, d.comp.tier);
    const pz = res.prize ? skinById(res.prize) : null;
    const nextLocked = !res.podium && (st.place[d.comp.id] ?? 99) > 3;
    box.innerHTML = `<div class="camp-tro">${tro}</div><h3>${circ === 'caos' ? '🌀 ' : ''}${d.comp.ico} ${d.comp.name} <small class="rk-tiertag" style="--lc:${tg.col}">${tg.ico} ${tg.name}</small></h3><div class="camp-place">${head}</div>
      <div class="rk-res-pts">
        <div class="rkp"><span>essa rodada</span><b>⚡ ${d.pts}</b></div>
        <div class="rkp ${res.dPts > 0 ? 'up' : ''}"><span>${res.dPts > 0 ? 'score mundial' : 'seu melhor'}</span><b>${res.dPts > 0 ? `+${res.dPts} pts! 📈` : `⚡ ${st.best[d.comp.id] ?? 0}`}</b></div>
        <div class="rkp"><span>score total</span><b>⚡ ${rankTotal(st)}</b></div>
      </div>
      ${pz ? `<div class="prize-reveal" style="--rc:${RARITY_COLOR[pz.rarity]}">
        <div class="pr-tag">✨ TAMPINHA EXCLUSIVA DESBLOQUEADA ✨</div>
        <div class="pr-face" id="prf"></div>
        <b class="pr-name">${pz.name}</b>
        <span class="pr-rar"><i class="rar-dot"></i>${RARITY_LABEL[pz.rarity]} · OURO nas 8 do ${tg.name}${circ === 'caos' ? ' (Caos)' : ''}</span>
        ${capBars(pz.stats, true)}
        <span class="pr-note">a melhor da categoria — sua pra sempre! 🎉</span>
      </div>` : `<div class="rk-goldprog">👑 Prêmio do tier: ${'🥇'.repeat(golds)}${'<i class="clp-slot"></i>'.repeat(Math.max(0, 8 - golds))} <em>${golds}/8 ouros</em></div>`}
      ${nextLocked ? '<div class="camp-tip">Precisa de PÓDIO (top 3) pra liberar a próxima etapa. Troca de tampinha e tenta de novo!</div>' : ''}
      ${raceStrip(d.hist.length, d.hist.length, d.hist)}
      <div class="champ-stand">${d.rows.map((r, i) => `<div class="cs-row ${r.you ? 'you' : ''} ${i === 0 ? 'lead' : ''}"><span class="cs-pos">${i + 1}º</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts}</b></div>`).join('')}</div>
      <div class="mactions"><button class="chip" id="again">↻ De novo</button><button class="play-btn" id="mapa">Ranqueada ▶</button></div>`;
    box.querySelectorAll('.cs-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 44)));
    const prf = box.querySelector('#prf') as HTMLElement | null;
    if (prf && pz) { const pcv = drawCap(pz.art, 150); pcv.style.cssText = 'width:110px;height:110px;display:block;margin:0 auto'; prf.appendChild(pcv); }
    modal.classList.remove('hidden');
    if (res.podium || pz) this.confetti(box);
    box.querySelector('#again')!.addEventListener('click', () => { this.hideModal(); this.onRankRetry?.(d.comp.id); });
    box.querySelector('#mapa')!.addEventListener('click', () => { this.hideModal(); this.onRankBack?.(); });
  }

  // reiniciar no meio de uma COMPETIÇÃO (campanha/ranqueada/campeonato/eliminação):
  // confirma antes, porque volta pra 1ª corrida e zera os pontos da competição toda
  confirmRestartComp(label: string, done: number, total: number, onYes: () => void, onNo?: () => void): void {
    this.hideModal();   // sai do modal de pausa: a pergunta fica sozinha na tela
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>⚠️ Reiniciar ${label}?</b><button class="ov-x">✕</button></div>
      <div class="cc-detail">
        <div>Isso <b>NÃO</b> reinicia só esta corrida: volta pra <b>1ª corrida</b> e <b>zera os pontos</b> de ${label} inteira.</div>
        ${done > 0 ? `<div>Você já completou <b>${done} de ${total}</b> corrida${done > 1 ? 's' : ''} — esse progresso se perde.</div>` : `<div>São <b>${total} corridas</b> no total.</div>`}
        <div class="cc-final-note">Seu melhor resultado já salvo continua valendo.</div>
      </div>
      <div class="mactions"><button class="chip" id="no">Cancelar</button><button class="play-btn danger" id="yes">↻ Reiniciar tudo</button></div>`);
    const no = () => { close(); onNo?.(); };
    box.querySelector('.ov-x')!.addEventListener('click', no);
    box.querySelector('#no')!.addEventListener('click', no);
    box.querySelector('#yes')!.addEventListener('click', () => { close(); onYes(); });
  }

  // -------------------------------------------------------- EDITOR DE PISTA
  private edW = 92; private edH = 62;   // tamanho do "mundo" do editor (como era antes)
  // paleta COMPLETA: tudo que existe na pista do jogo
  private static ED_TOOLS: { t: string; ico: string; lab: string; grp: string; col: string }[] = [
    { t: 'draw', ico: '✏️', lab: 'Traçar', grp: 'p', col: '#8fd0ff' },
    { t: 'move', ico: '✋', lab: 'Mover', grp: 'p', col: '#ffd94a' },
    { t: 'erase', ico: '🧽', lab: 'Apagar', grp: 'p', col: '#ff8a8a' },
    { t: 'hole', ico: '⚫', lab: 'Buraco', grp: 'o', col: '#100a04' },
    { t: 'bomb', ico: '💣', lab: 'Bomba', grp: 'o', col: '#e5484d' },
    { t: 'stone', ico: '🪨', lab: 'Pedra', grp: 'o', col: '#9a948a' },
    { t: 'jump', ico: '🛫', lab: 'Salto', grp: 'o', col: '#c9902e' },
    { t: 'item', ico: '❓', lab: 'Caixa', grp: 'o', col: '#a86bff' },
    { t: 'top', ico: '🪀', lab: 'Pião', grp: 'o', col: '#d84a8a' },
    { t: 'car', ico: '🚗', lab: 'Carrinho', grp: 'o', col: '#f2b13a' },
    { t: 'band', ico: '➰', lab: 'Elástico', grp: 'o', col: '#e5484d' },
    { t: 'mill', ico: '🎡', lab: 'Catavento', grp: 'o', col: '#4a90d8' },
    { t: 'balloon', ico: '🎈', lab: 'Bexiga', grp: 'o', col: '#3f9ae0' },
    { t: 'bonus1', ico: '💎', lab: '+1', grp: 'b', col: '#2ea44f' },
    { t: 'bonus2', ico: '💠', lab: '+2', grp: 'b', col: '#2e9fa4' },
    { t: 'bonus3', ico: '🏆', lab: '+3', grp: 'b', col: '#e0a020' },
    { t: 'ramp', ico: '⏫', lab: 'Impulso', grp: 's', col: '#3fae6a' },
    { t: 'push', ico: '⏬', lab: 'Freio', grp: 's', col: '#e5484d' },
    { t: 'sand', ico: '🟡', lab: 'Areia', grp: 's', col: '#d9b877' },
    { t: 'mud', ico: '🟤', lab: 'Lama', grp: 's', col: '#5c452a' },
    { t: 'water', ico: '💧', lab: 'Água', grp: 's', col: '#4a90b8' },
    { t: 'grass', ico: '🌿', lab: 'Grama', grp: 's', col: '#5f8a36' },
    { t: 'ice', ico: '🧊', lab: 'Gelo', grp: 's', col: '#a8dcf5' },
    { t: 'gum', ico: '🍬', lab: 'Chiclete', grp: 's', col: '#e878b0' },
    { t: 'magnet', ico: '🧲', lab: 'Ímã', grp: 's', col: '#d34a4a' },
    { t: 'vortex', ico: '🌀', lab: 'Redemoinho', grp: 's', col: '#58a8d8' },
  ];
  private static ED_SURF = new Set(['sand', 'mud', 'water', 'grass', 'ice', 'gum', 'magnet', 'vortex', 'ramp', 'push']);
  showEditor(): void {
    this.clear();
    const themes = ['Quintal', 'Praia', 'Calçada', 'Garagem', 'Parque', 'Cozinha', 'Jardim', 'Deserto'];
    // temas novos ficam DEPOIS dos 14 clássicos na lista completa (índices 14..17)
    const themesNew: [number, string][] = [[14, 'Sinuca 🎱'], [15, 'Congelador 🧊'], [16, 'Bancada 🧲'], [17, 'Sala (tapete) 🛋️']];
    const tools = UI.ED_TOOLS;
    const s = this.el(`<div class="screen editor">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>✏️ Editor de Pista</h2><div></div></div>
      <div class="ed-help">1️⃣ <b>Traçar</b>: arraste pra desenhar. 2️⃣ Escolha um item e <b>toque na pista</b> pra colocar. 3️⃣ <b>Mover</b>: arraste um item pro lugar exato. 👁️ Veja em 3D e 🏁 jogue!</div>
      <div class="ed-tools" id="tools">${tools.map(t => `<button class="ed-tool grp-${t.grp} ${t.t === this.edTool ? 'sel' : ''}" data-t="${t.t}" style="--tc:${t.col}"><span>${t.ico}</span><small>${t.lab}</small></button>`).join('')}</div>
      <div class="ed-canvas-wrap"><canvas id="edcv" class="ed-canvas"></canvas><div class="ed-count" id="edcount"></div></div>
      <div class="ed-opts">
        <label>Tema</label>
        <select id="edtheme">${themes.map((t, i) => `<option value="${i}" ${i === this.edTheme ? 'selected' : ''}>${t}</option>`).join('')}${themesNew.map(([v, t]) => `<option value="${v}" ${v === this.edTheme ? 'selected' : ''}>${t}</option>`).join('')}</select>
        <label>Largura</label>
        <input type="range" id="edhalf" min="3.4" max="6" step="0.2" value="${this.edHalf}">
        <input class="ed-name" id="edname" maxlength="18" value="${this.edName}">
      </div>
      <div class="ed-opts prot-row">
        <label>🛡️ Proteção</label>
        ${[[1, 'Cheia'], [0.6, 'Média'], [0.3, 'Pouca'], [0, 'Nenhuma']].map(([v, n]) => `<button class="chip prot ${this.edProtect === v ? 'sel' : ''}" data-pr="${v}">${n}</button>`).join('')}
      </div>
      <div class="ed-actions">
        <button class="chip" id="edclear">🗑️ Limpar</button>
        <button class="chip" id="edsave">💾 Salvar</button>
        <button class="chip" id="edload">📂 Minhas</button>
        <button class="chip" id="edshare">🔗 Compartilhar</button>
        <button class="chip" id="edgal">🌍 Galeria</button>
      </div>
      <div class="ed-actions">
        <button class="chip big" id="edview">👁️ Ver em 3D</button>
        <button class="play-btn" id="edplay">🏁 Jogar</button>
      </div>
    </div>`);
    this.root.appendChild(s);
    const cv = s.querySelector('#edcv') as HTMLCanvasElement;
    const count = s.querySelector('#edcount') as HTMLElement;
    const redraw = () => { this.drawEditor(cv); count.textContent = `${this.edObs.length + this.edPatches.length} itens · ${this.edPts.length} pts`; };
    // tamanho do canvas EXATAMENTE como era: largura = container, altura proporcional
    const sync = () => { const r = cv.getBoundingClientRect(); if (r.width < 4) { requestAnimationFrame(sync); return; } cv.width = Math.round(r.width); cv.height = Math.round(r.width * this.edH / this.edW); redraw(); };
    setTimeout(sync, 30); requestAnimationFrame(sync); addEventListener('resize', sync);
    const toWorld = (ev: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * this.edW, y: (ev.clientY - r.top) / r.height * this.edH }; };
    let drawing = false; let dragging: any = null;
    cv.addEventListener('pointerdown', (ev) => {
      ev.preventDefault(); (cv as any).setPointerCapture?.(ev.pointerId); const p = toWorld(ev);
      if (this.edTool === 'draw') { drawing = true; this.edPts.push(p); }
      else if (this.edTool === 'erase') { this.edEraseAt(p); }
      else if (this.edTool === 'move') { dragging = this.edPickAt(p); }
      else this.edPlaceObs(p);
      redraw();
    });
    cv.addEventListener('pointermove', (ev) => {
      const p = toWorld(ev);
      if (drawing) { const last = this.edPts[this.edPts.length - 1]; if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 2) { this.edPts.push(p); redraw(); } }
      else if (dragging) { dragging.x = p.x; dragging.y = p.y; redraw(); }
    });
    const end = () => { drawing = false; dragging = null; };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end); cv.addEventListener('pointerleave', end);

    s.querySelectorAll('.ed-tool').forEach(b => b.addEventListener('click', () => { this.edTool = (b as HTMLElement).dataset.t!; s.querySelectorAll('.ed-tool').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); }));
    (s.querySelector('#edtheme') as HTMLSelectElement).addEventListener('change', e => { this.edTheme = +(e.target as HTMLSelectElement).value; redraw(); });
    (s.querySelector('#edhalf') as HTMLInputElement).addEventListener('input', e => { this.edHalf = +(e.target as HTMLInputElement).value; redraw(); });
    (s.querySelector('#edname') as HTMLInputElement).addEventListener('change', e => this.edName = (e.target as HTMLInputElement).value || 'Minha Pista');
    s.querySelectorAll('.prot').forEach(b => b.addEventListener('click', () => { this.edProtect = +(b as HTMLElement).dataset.pr!; s.querySelectorAll('.prot').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); }));
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    s.querySelector('#edclear')!.addEventListener('click', () => { if (this.edObs.length + this.edPatches.length + this.edPts.length === 0) return; this.edPts = []; this.edObs = []; this.edPatches = []; this.edOpenArcs = []; redraw(); });
    s.querySelector('#edsave')!.addEventListener('click', () => {
      if (this.edPts.length < 3) { this.notify('Trace a pista primeiro!', 'bad'); return; }
      save.saveTrack(this.edData('ct' + Date.now()));
      this.notify('Pista salva! 💾', 'good');
    });
    s.querySelector('#edload')!.addEventListener('click', () => this.showMyTracks());
    s.querySelector('#edshare')!.addEventListener('click', () => this.shareCustom());
    s.querySelector('#edgal')!.addEventListener('click', () => this.showGallery());
    s.querySelector('#edview')!.addEventListener('click', () => this.previewCustom());
    s.querySelector('#edplay')!.addEventListener('click', () => this.playCustom());
  }
  private edData(id: string): any { return { id, name: this.edName, theme: this.edTheme, half: this.edHalf, pts: this.edPts, obstacles: this.edObs, patches: this.edPatches, protect: this.edProtect, openArcs: this.edOpenArcs }; }
  private themeGround(): { bg: string; corr: string } {
    const g = [['#6f5334', '#7a5a34'], ['#d9b877', '#c9a35f'], ['#9a9488', '#b4ada0'], ['#7d6a4e', '#8a744f'], ['#4f5b3a', '#5f6a44'], ['#c8b48c', '#b8a074'], ['#3f5a2e', '#4f6a3a'], ['#c98f4a', '#b47c3a']][this.edTheme % 8];
    return { bg: g[0], corr: g[1] };
  }
  private drawEditor(cv: HTMLCanvasElement): void {
    const c = cv.getContext('2d')!; const W = cv.width, H = cv.height;
    const X = (x: number) => x / this.edW * W, Y = (y: number) => y / this.edH * H;
    const th = this.themeGround();
    c.clearRect(0, 0, W, H); c.fillStyle = th.bg; c.fillRect(0, 0, W, H);
    // vinheta escura pra dar profundidade
    const vg = c.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, W * 0.75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.35)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
    c.strokeStyle = 'rgba(255,255,255,0.045)'; c.lineWidth = 1;
    for (let gx = 0; gx <= this.edW; gx += 8) { c.beginPath(); c.moveTo(X(gx), 0); c.lineTo(X(gx), H); c.stroke(); }
    for (let gy = 0; gy <= this.edH; gy += 8) { c.beginPath(); c.moveTo(0, Y(gy)); c.lineTo(W, Y(gy)); c.stroke(); }
    const px = W / this.edW;
    // CORREDOR: faixa larga na cor do tema + sombra + muro nas bordas + linha central
    if (this.edPts.length > 1) {
      c.lineCap = 'round'; c.lineJoin = 'round';
      c.strokeStyle = 'rgba(0,0,0,0.28)'; c.lineWidth = (this.edHalf * 2 + 1.2) * px;
      this.strokePath(c, X, Y); // sombra
      c.strokeStyle = th.corr; c.lineWidth = this.edHalf * 2 * px; this.strokePath(c, X, Y);
      c.strokeStyle = 'rgba(255,255,255,0.10)'; c.lineWidth = this.edHalf * 2 * px; this.strokePath(c, X, Y);
      // muro (bordas)
      c.strokeStyle = 'rgba(70,45,20,0.85)'; c.lineWidth = Math.max(2, 0.7 * px);
      this.strokeOffset(c, X, Y, this.edHalf); this.strokeOffset(c, X, Y, -this.edHalf);
      // linha central tracejada
      c.strokeStyle = 'rgba(255,255,255,0.55)'; c.lineWidth = Math.max(1.5, 0.35 * px); c.setLineDash([6, 6]);
      this.strokePath(c, X, Y); c.setLineDash([]);
    }
    // SUPERFÍCIES (blobs coloridos semi-transparentes)
    for (const s of this.edPatches) {
      const col = UI.ED_TOOLS.find(t => t.t === s.surface)?.col || '#888';
      c.fillStyle = col + 'cc'; c.beginPath(); c.arc(X(s.x), Y(s.y), 2.4 * px, 0, 7); c.fill();
      c.fillStyle = '#fff'; c.font = `${Math.round(1.9 * px)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(UI.ED_TOOLS.find(t => t.t === s.surface)?.ico || '', X(s.x), Y(s.y));
    }
    // OBSTÁCULOS (emoji sobre disco colorido)
    for (const o of this.edObs) {
      const tool = UI.ED_TOOLS.find(t => t.t === (o.type === 'bonus' ? 'bonus' + (o.n || 1) : o.type));
      c.fillStyle = 'rgba(0,0,0,0.45)'; c.beginPath(); c.arc(X(o.x), Y(o.y), 2.0 * px, 0, 7); c.fill();
      c.font = `${Math.round(2.4 * px)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(tool?.ico || '⬤', X(o.x), Y(o.y));
    }
    // LARGADA / CHEGADA
    if (this.edPts.length) { const a = this.edPts[0]; c.fillStyle = '#2ea44f'; c.beginPath(); c.arc(X(a.x), Y(a.y), 1.5 * px, 0, 7); c.fill(); c.font = `${Math.round(2.2 * px)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🚦', X(a.x), Y(a.y)); }
    if (this.edPts.length > 1) { const b = this.edPts[this.edPts.length - 1]; c.font = `${Math.round(2.6 * px)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🏁', X(b.x), Y(b.y)); }
    if (this.edPts.length < 2) { c.fillStyle = 'rgba(255,255,255,0.5)'; c.font = `${Math.round(0.03 * W)}px sans-serif`; c.textAlign = 'center'; c.fillText('✏️ arraste aqui pra desenhar a pista', W / 2, H / 2); }
  }
  private strokePath(c: CanvasRenderingContext2D, X: (x: number) => number, Y: (y: number) => number): void {
    c.beginPath(); this.edPts.forEach((p, i) => { i ? c.lineTo(X(p.x), Y(p.y)) : c.moveTo(X(p.x), Y(p.y)); }); c.stroke();
  }
  private strokeOffset(c: CanvasRenderingContext2D, X: (x: number) => number, Y: (y: number) => number, off: number): void {
    const pts = this.edPts; if (pts.length < 2) return; c.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let nx = -(b.y - a.y), ny = (b.x - a.x); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      const x = X(pts[i].x + nx * off), y = Y(pts[i].y + ny * off); i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.stroke();
  }
  private edPlaceObs(p: { x: number; y: number }): void {
    if (this.edPts.length < 2) { this.notify('Trace a pista primeiro! ✏️', 'bad'); return; }
    const t = this.edTool;
    if (UI.ED_SURF.has(t)) { this.edPatches.push({ surface: t, x: p.x, y: p.y, r: 2.4 }); return; }
    const map: Record<string, { type: string; n?: number }> = { hole: { type: 'hole' }, bomb: { type: 'bomb' }, stone: { type: 'stone' }, jump: { type: 'jump' }, item: { type: 'item' }, bonus1: { type: 'bonus', n: 1 }, bonus2: { type: 'bonus', n: 2 }, bonus3: { type: 'bonus', n: 3 } };
    const m = map[t]; if (!m) return; this.edObs.push({ type: m.type, x: p.x, y: p.y, n: m.n });
  }
  private edPickAt(p: { x: number; y: number }): any {
    // raio generoso (dedo gordo): pega o objeto mais próximo dentro de ~6 unidades
    let best: any = null, bd = 36;
    for (const o of this.edObs) { const d = (o.x - p.x) ** 2 + (o.y - p.y) ** 2; if (d < bd) { bd = d; best = o; } }
    for (const s of this.edPatches) { const d = (s.x - p.x) ** 2 + (s.y - p.y) ** 2; if (d < bd) { bd = d; best = s; } }
    return best;
  }
  private edEraseAt(p: { x: number; y: number }): void {
    const it = this.edPickAt(p); if (!it) return;
    const oi = this.edObs.indexOf(it); if (oi >= 0) { this.edObs.splice(oi, 1); return; }
    const si = this.edPatches.indexOf(it); if (si >= 0) this.edPatches.splice(si, 1);
  }
  private aiPlayers(): PlayerDef[] {
    const opp = opponentSkins(save.skin(), 3);
    return [{ name: 'Você', isAI: false, skin: save.skin() }, ...opp.map((sk, i) => ({ name: AI_NAMES[i % AI_NAMES.length], isAI: true, ai: AI_KINDS[i % AI_KINDS.length], skin: sk }))];
  }
  private playCustom(): void {
    if (this.edPts.length < 3) { this.notify('Trace a pista primeiro! ✏️', 'bad'); return; }
    const def = buildCustomTrack(this.edData('play'));
    this.cb.start({ level: 2, trackIdx: 0, pick: 'specific', players: this.aiPlayers(), mode: 'quick', customTrack: def });
  }
  private previewCustom(): void {
    if (this.edPts.length < 3) { this.notify('Trace a pista primeiro! ✏️', 'bad'); return; }
    const def = buildCustomTrack(this.edData('prev'));
    this.setPreviewDef(def);
    this.cb.preview?.(def);
  }
  setPreviewDef(def: any): void { this.edPrevDef = def; try { this.edPrevTrack = new TrackModel(def); } catch { this.edPrevTrack = null; } }
  previewEditMode(): 'off' | 'move' | 'wall' { return this.edPrevMode === 'view' ? 'off' : this.edPrevMode; }
  // interação no EDITOR 3D. Retorna se a maquete precisa ser reconstruída.
  preview3D(phase: 'down' | 'move' | 'up', wx: number, wz: number): boolean {
    const def = this.edPrevDef; if (!def) return false;
    const sh = def._shift || { dx: 0, dy: 0 };
    if (this.edPrevMode === 'move') {
      const ex = wx - sh.dx, ey = wz - sh.dy;
      if (phase === 'down') { this.edDragItem = this.edPickAt({ x: ex, y: ey }); return false; }
      if (phase === 'move' && this.edDragItem) { this.edDragItem.x = ex; this.edDragItem.y = ey; return true; }
      if (phase === 'up') { const had = !!this.edDragItem; this.edDragItem = null; return had; }
    } else if (this.edPrevMode === 'wall' && phase === 'down' && this.edPrevTrack) {
      const arc = this.edPrevTrack.progressOf({ x: wx, y: wz });
      const i = this.edOpenArcs.findIndex(a => Math.abs(a - arc) < 6);
      if (i >= 0) this.edOpenArcs.splice(i, 1); else this.edOpenArcs.push(arc);
      return true;
    }
    return false;
  }
  rebuildPreviewDef(): any { const def = buildCustomTrack(this.edData('prev')); this.setPreviewDef(def); return def; }

  // barra do EDITOR 3D (Ver / Mover / Muro · Editar · Jogar)
  onPreviewBack: (() => void) | null = null;
  onPreviewPlay: (() => void) | null = null;
  showPreviewBar(): void {
    this.clear(); this.edPrevMode = 'view'; this.edDragItem = null;
    const s = this.el(`<div class="screen preview-bar">
      <div class="pv-top"><button class="txt-btn" id="pvback">‹ Editar</button><div class="pv-title">👁️ Ver em 3D</div><div></div></div>
      <div class="pv-modes">
        <button class="chip pv-m sel" data-m="view">👁️ Ver</button>
        <button class="chip pv-m" data-m="move">✋ Mover</button>
        <button class="chip pv-m" data-m="wall">🧱 Muro</button>
      </div>
      <div class="pv-hint" id="pvhint">Um dedo <b>gira</b> · dois dedos dão <b>zoom</b>. Toque numa ferramenta acima pra editar.</div>
      <div class="pv-actions"><button class="play-btn" id="pvplay">🏁 Jogar</button></div>
    </div>`);
    this.root.appendChild(s);
    const hint = s.querySelector('#pvhint') as HTMLElement;
    const setMode = (m: 'view' | 'move' | 'wall') => {
      this.edPrevMode = m;
      s.querySelectorAll('.pv-m').forEach(x => x.classList.toggle('sel', (x as HTMLElement).dataset.m === m));
      hint.innerHTML = m === 'view' ? 'Um dedo <b>gira</b> · dois dedos dão <b>zoom</b>.'
        : m === 'move' ? '✋ <b>Arraste</b> os objetos pro lugar exato. Dois dedos = câmera.'
          : '🧱 <b>Toque no muro</b> pra apagar/pôr a proteção (mais aberto = mais difícil). Dois dedos = câmera.';
    };
    s.querySelectorAll('.pv-m').forEach(b => b.addEventListener('click', () => setMode((b as HTMLElement).dataset.m as any)));
    s.querySelector('#pvback')!.addEventListener('click', () => this.onPreviewBack?.());
    s.querySelector('#pvplay')!.addEventListener('click', () => this.onPreviewPlay?.());
  }
  private shareCustom(): void {
    if (this.edPts.length < 3) { this.notify('Trace a pista primeiro! ✏️', 'bad'); return; }
    try {
      const data = this.edData('sh');
      const json = JSON.stringify(data);
      const b64 = btoa(unescape(encodeURIComponent(json)));
      const url = location.origin + location.pathname + '#p=' + b64;
      const txt = `🏁 Joga a minha pista "${this.edName}" no Tampinha Rally: ${url}`;
      if ((navigator as any).share) (navigator as any).share({ text: txt }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => this.notify('Link copiado! Mande pros amigos 🔗', 'good')).catch(() => this.showShareLink(url));
      else this.showShareLink(url);
    } catch { this.notify('Não deu pra gerar o link', 'bad'); }
  }
  private showShareLink(url: string): void {
    const { box } = this.overlay(`<div class="ov-head"><b>🔗 Compartilhar pista</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">Copie o link e mande pros amigos jogarem a sua pista:</div>
      <textarea class="share-box" readonly>${url}</textarea>`, 'wide');
    (box.querySelector('.share-box') as HTMLTextAreaElement).select();
    box.querySelector('.ov-x')!.addEventListener('click', () => box.closest('.ov-bg')?.remove());
  }
  // importa uma pista compartilhada (chamado pelo main ao abrir com #p=...)
  importSharedTrack(b64: string): boolean {
    try {
      const json = decodeURIComponent(escape(atob(b64)));
      const data = JSON.parse(json);
      if (!data || !Array.isArray(data.pts) || data.pts.length < 2) return false;
      this.edPts = data.pts; this.edObs = data.obstacles || []; this.edPatches = data.patches || [];
      this.edTheme = data.theme || 0; this.edHalf = data.half || 4.2; this.edName = data.name || 'Pista compartilhada';
      this.edProtect = data.protect == null ? 1 : data.protect; this.edOpenArcs = data.openArcs || [];
      const def = buildCustomTrack(this.edData('shared'));
      const { box, close } = this.overlay(`<div class="ov-head"><b>🎁 Pista compartilhada!</b><button class="ov-x">✕</button></div>
        <div class="ov-sub">Alguém te mandou a pista <b>“${this.edName}”</b>. Bora jogar?</div>
        <div class="mactions" style="margin-top:10px"><button class="chip" id="shedit">✏️ Abrir no editor</button><button class="play-btn" id="shplay">🏁 Jogar agora</button></div>`, 'wide');
      box.querySelector('.ov-x')!.addEventListener('click', close);
      box.querySelector('#shedit')!.addEventListener('click', () => { close(); this.showEditor(); });
      box.querySelector('#shplay')!.addEventListener('click', () => { close(); this.cb.start({ level: 2, trackIdx: 0, pick: 'specific', players: this.aiPlayers(), mode: 'quick', customTrack: def }); });
      return true;
    } catch { return false; }
  }
  showMyTracks(): void {
    const tracks = save.customTracks();
    const { box, close } = this.overlay(`<div class="ov-head"><b>📂 Minhas Pistas</b><button class="ov-x">✕</button></div>
      <div class="my-tracks" id="mt">${tracks.length ? '' : '<div class="mt-empty">Nenhuma pista salva ainda. Crie a sua! ✏️</div>'}</div>`, 'wide');
    const host = box.querySelector('#mt') as HTMLElement;
    tracks.forEach((t: any) => {
      const row = this.el(`<div class="mt-row"><span class="mt-nm">🏁 ${t.name}</span><span class="mt-acts"><button class="chip mini" data-a="load">Abrir</button><button class="chip mini" data-a="share">🔗</button><button class="chip mini" data-a="play">Jogar</button><button class="chip mini" data-a="pub">🌍</button><button class="chip mini danger" data-a="del">🗑️</button></span></div>`);
      row.querySelector('[data-a="load"]')!.addEventListener('click', () => { this.edPts = t.pts.slice(); this.edObs = (t.obstacles || []).slice(); this.edPatches = (t.patches || []).slice(); this.edTheme = t.theme; this.edHalf = t.half; this.edName = t.name; this.edProtect = t.protect == null ? 1 : t.protect; this.edOpenArcs = (t.openArcs || []).slice(); close(); this.showEditor(); });
      row.querySelector('[data-a="share"]')!.addEventListener('click', () => { this.edPts = t.pts.slice(); this.edObs = (t.obstacles || []).slice(); this.edPatches = (t.patches || []).slice(); this.edTheme = t.theme; this.edHalf = t.half; this.edName = t.name; this.shareCustom(); });
      row.querySelector('[data-a="play"]')!.addEventListener('click', () => { const def = buildCustomTrack(t); close(); this.cb.start({ level: 2, trackIdx: 0, pick: 'specific', players: this.aiPlayers(), mode: 'quick', customTrack: def }); });
      row.querySelector('[data-a="pub"]')!.addEventListener('click', () => { this.gallery().publish(t, this.galleryAuthor()); this.notify('🌍 Pista publicada na galeria!', 'good'); });
      row.querySelector('[data-a="del"]')!.addEventListener('click', () => { save.deleteTrack(t.id); row.remove(); });
      host.appendChild(row);
    });
    box.querySelector('.ov-x')!.addEventListener('click', close);
  }

  // ------------------------------------------------------- GALERIA DA COMUNIDADE
  private gal: Gallery | null = null;
  private galSort: 'top' | 'new' = 'top';
  private gallery(): Gallery { if (!this.gal) this.gal = new Gallery(); this.gal.start(); return this.gal; }
  private galleryAuthor(): string {
    return rankState().name || rankState('caos').name || save.name() || 'anônimo';
  }
  showGallery(): void {
    this.clear();
    const g = this.gallery();
    const s = this.el(`<div class="screen setup gallery">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Editor</button><h2>🌍 Galeria</h2><div class="rk-live" id="gst"></div></div>
      <div class="modes-note">Pistas criadas por jogadores do <b>mundo inteiro</b>. Jogue, curta ❤️ — e publique a sua no ✏️ Editor → 📂 Minhas → 🌍!</div>
      <div class="rand-row"><button class="chip ${this.galSort === 'top' ? 'sel' : ''}" id="gtop">🔥 Curtidas</button><button class="chip ${this.galSort === 'new' ? 'sel' : ''}" id="gnew">🕐 Novas</button></div>
      <div class="my-tracks" id="glist"></div>
    </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(4));
    const esc = (x: string) => x.replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as any)[ch]);
    const render = () => {
      const host = s.querySelector('#glist') as HTMLElement; if (!host) return;
      const rows = g.list(this.galSort);
      (s.querySelector('#gst') as HTMLElement).textContent = g.status === 'online' ? '🟢 AO VIVO' : g.status === 'connecting' ? '🟡 conectando…' : '';
      host.innerHTML = rows.length ? '' : `<div class="mt-empty">${g.status === 'online' ? 'Nenhuma pista publicada ainda — seja a primeira! ✏️' : 'Procurando pistas pelo mundo… 🌍'}</div>`;
      rows.slice(0, 60).forEach(t => {
        const row = this.el(`<div class="mt-row"><span class="mt-nm">🏁 ${esc(t.name)}<small class="g-author">por ${esc(t.author)}${t.mine ? ' (você)' : ''}</small></span>
          <span class="mt-acts"><button class="chip mini ${t.liked ? 'sel' : ''}" data-a="like">❤️ ${t.likes}</button><button class="chip mini" data-a="play">Jogar</button>${t.mine ? '<button class="chip mini danger" data-a="unpub">🗑️</button>' : ''}</span></div>`);
        row.querySelector('[data-a="like"]')!.addEventListener('click', () => { g.toggleLike(t.key); render(); });
        row.querySelector('[data-a="play"]')!.addEventListener('click', () => {
          try { const def = buildCustomTrack(t.data); this.cb.start({ level: 2, trackIdx: 0, pick: 'specific', players: this.aiPlayers(), mode: 'quick', customTrack: def }); }
          catch { this.notify('Essa pista veio quebrada 😕', 'bad'); }
        });
        row.querySelector('[data-a="unpub"]')?.addEventListener('click', () => { g.unpublish(t.key); render(); });
        host.appendChild(row);
      });
    };
    g.onChange = render; g.onStatus = render;
    render();
    s.querySelector('#back')!.addEventListener('click', () => { g.onChange = () => {}; this.showEditor(); });
    s.querySelector('#gtop')!.addEventListener('click', () => { this.galSort = 'top'; this.showGallery(); });
    s.querySelector('#gnew')!.addEventListener('click', () => { this.galSort = 'new'; this.showGallery(); });
  }

  private resetPlayers(mode: Mode): void {
    const yourColor = CAP_COLORS[0];
    this.cfgPlayers = [{ human: true, ai: 'cauteloso', color: 0, name: 'Você' }];
    let opponents = 3;
    if (mode === 'daily' || mode === 'trial') opponents = 0;
    if (mode === 'local') opponents = 1;
    if (mode === 'elim') opponents = 5;                          // mais corredores → mais eliminações
    if (mode === 'dupla') opponents = this.cfgTeamSize * 2 - 1;  // 2×2 = 3 rivais · 3×3 = 5 rivais
    for (let i = 0; i < opponents; i++) this.cfgPlayers.push({ human: mode === 'local', ai: AI_KINDS[i % AI_KINDS.length], color: (i + 1) % CAP_COLORS.length, name: mode === 'local' ? `Jogador ${i + 2}` : AI_NAMES[i % AI_NAMES.length] });
  }

  // -------------------------------------------------------------- SETUP
  showSetup(mode: Mode): void {
    this.cfgMode = mode; this.resetPlayers(mode);
    this.cfgPick = 'specific';
    if (mode === 'daily') {
      const d = new Date(); const day = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
      this.cfgLevel = day % 5; this.cfgTrack = (Math.floor(day / 5)) % TRACKS_PER_LEVEL;
    }
    this.renderSetup();
  }
  private renderSetup(): void {
    this.clear();
    const isDaily = this.cfgMode === 'daily';
    const isTrial = this.cfgMode === 'trial';
    const isDupla = this.cfgMode === 'dupla';
    const isElim = this.cfgMode === 'elim';
    const isCaos = this.cfgMode === 'caos';
    const isBatalha = this.cfgMode === 'batalha';
    const isChamp = this.cfgMode === 'champ';
    const isRandom = this.cfgPick !== 'specific';
    const t = track(this.cfgLevel, this.cfgTrack);
    const canPlayers = !isDaily && !isTrial;
    const title = ({ quick: 'Corrida Rápida', ai: 'Contra a IA', local: 'Multiplayer Local', champ: 'Campeonato', daily: 'Desafio Diário', caos: '🌀 Modo Caos', elim: '💀 Eliminação', trial: '⏱️ Contra-Relógio', dupla: '🤝 Corrida de Dupla', batalha: '🥊 Batalha da Mesa' } as Record<string, string>)[this.cfgMode];
    const modeBanner = isCaos ? '<div class="mode-banner caos">🌀 <b>Modo Caos:</b> caixas <b>?</b> na pista dão power-ups. Quem está mais atrás pega os melhores (raio, foguete, salto). Toque no item pra usar!</div>'
      : isElim ? '<div class="mode-banner elim">💀 <b>Eliminação:</b> a cada corrida numa pista nova, o <b>último colocado sai</b>. Sobrevive até ser o único!</div>'
      : isTrial ? '<div class="mode-banner trial">⏱️ <b>Contra-Relógio:</b> você sozinho. Leve a tampinha à chegada com o <b>menor número de petelecos</b> possível.</div>'
      : isDupla ? '<div class="mode-banner dupla">🤝 <b>Dupla:</b> dois times. Vence o time com a <b>menor soma de colocações</b>. Ajude o parceiro… ou atrapalhe o rival!</div>'
      : isBatalha ? '<div class="mode-banner elim">🥊 <b>Batalha:</b> mesa redonda, 1 peteleco por vez. Empurre os rivais pra fora — e cuidado: a mesa <b>encolhe</b>! Último vivo vence.</div>'
      : '';

    // seletor de nível (oculto no diário — a pista do dia é fixa — e na batalha)
    const levelRow = (isDaily || isBatalha) ? '' : `<div class="lvl-row" id="lvls">
      ${LEVELS.map((n, i) => `<button class="lvl-chip ${i === this.cfgLevel ? 'sel' : ''}" data-l="${i}" style="--lc:${LEVEL_COLORS[i]}"><b>${n}</b><span>${this.levelHint(i)}</span></button>`).join('')}
    </div>`;

    // cartão da pista
    let trackBlock = '';
    if (isBatalha) {
      trackBlock = `<div class="track-pick"><div class="track-card" style="border-color:#f2b100">
        <div class="track-name">🥊 Mesa surpresa</div>
        <div class="track-sub">uma mesa redonda aleatória — sinuca, cozinha, laje ou bancada</div>
      </div></div>`;
    } else if (isChamp) {
      const f = CHAMP_FMT[this.cfgChampFmt];
      const btns = (Object.keys(CHAMP_FMT) as ChampFmt[]).map(k => `<button class="champ-fmt ${k === this.cfgChampFmt ? 'sel' : ''}" data-f="${k}"><span class="cf-ico">${CHAMP_FMT[k].ico}</span><b>${CHAMP_FMT[k].name}</b><span>${CHAMP_FMT[k].desc}</span></button>`).join('');
      const where = this.cfgChampFmt === 'gp' ? '<b>todos os níveis</b> (Fácil → Extrema)' : `nível <b style="color:${LEVEL_COLORS[this.cfgLevel]}">${LEVELS[this.cfgLevel]}</b>`;
      trackBlock = `<div class="champ-fmts">${btns}</div>
        <div class="champ-note">🏆 <b>${f.races} corridas</b> · ${where}. Pontos por posição em cada corrida — some tudo e seja o <b>campeão</b>! 🏅</div>`;
    } else if (isRandom) {
      trackBlock = `<div class="track-pick">
        <div class="track-card mystery" style="border-color:${this.cfgPick === 'randany' ? '#b98cff' : LEVEL_COLORS[this.cfgLevel]}">
          <div class="track-name">🎲 Surpresa!</div>
          <div class="track-sub">${this.cfgPick === 'randany' ? 'pista aleatória de qualquer nível' : 'pista aleatória do nível ' + LEVELS[this.cfgLevel]}</div>
        </div>
      </div>`;
    } else {
      const nav = !isDaily;   // no diário a pista é a "do dia", fixa
      const chips = Array.from({ length: TRACKS_PER_LEVEL }, (_, i) => `<button class="tnum ${i === this.cfgTrack ? 'sel' : ''}" data-i="${i}">${i + 1}</button>`).join('');
      trackBlock = `<div class="track-pick">
        ${nav ? '<button class="arrow" id="tprev">‹</button>' : ''}
        <div class="track-card" style="border-color:${LEVEL_COLORS[this.cfgLevel]}">
          <div class="track-name">${t.name}</div>
          <div class="track-sub">${t.theme} · ${this.lenLabel(t)}${nav ? ' · pista ' + (this.cfgTrack + 1) + '/' + TRACKS_PER_LEVEL : ' · ' + LEVELS[this.cfgLevel]}</div>
          <div class="track-mini" id="mini"></div>
        </div>
        ${nav ? '<button class="arrow" id="tnext">›</button>' : ''}
      </div>
      ${nav ? `<div class="tnum-row" id="tnums">${chips}</div>` : ''}`;
    }

    // escolha de tamanho de time (só na Dupla): 2×2 ou 3×3
    const teamRow = isDupla ? `<div class="rand-row team-row">
      <button class="chip ${this.cfgTeamSize === 2 ? 'sel' : ''}" data-ts="2">2 × 2</button>
      <button class="chip ${this.cfgTeamSize === 3 ? 'sel' : ''}" data-ts="3">3 × 3</button>
    </div>` : '';

    // botões de sorteio (não no diário/campeonato/batalha)
    const randRow = (isDaily || isChamp || isBatalha) ? '' : `<div class="rand-row">
      <button class="chip ${this.cfgPick === 'specific' ? 'sel' : ''}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick === 'randlevel' ? 'sel' : ''}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick === 'randany' ? 'sel' : ''}" id="prany">🎲 Qualquer</button>
    </div>`;

    // texto quando não há lista de jogadores (diário e contra-relógio são solo)
    const soloNote = isTrial
      ? `<div class="daily-note">⏱️ <b>${t.name}</b> (${LEVELS[this.cfgLevel]}). Você sozinho: chegue com o <b>menor número de petelecos</b>. Recorde nesta pista: <b>${save.trialBest(this.cfgLevel, this.cfgTrack) ?? '—'}</b></div>`
      : `<div class="daily-note">Pista do dia: <b>${t.name}</b> (${LEVELS[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${save.dailyBest(dailyKey()) ?? '—'}</b></div>`;

    const s = this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${title}</h2><div></div></div>
        ${modeBanner}
        ${levelRow}
        ${teamRow}
        ${randRow}
        ${trackBlock}
        ${canPlayers ? `<div class="players" id="players"></div>
        ${isDupla ? '' : `<div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>`}` : soloNote}
        <div class="play-dock"><button class="play-btn" id="play">Jogar ▶</button></div>
      </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(6));
    const mini = s.querySelector('#mini') as HTMLElement | null;
    if (mini) this.drawMini(mini, t);
    const fromModes = ['caos', 'elim', 'trial', 'dupla'].includes(this.cfgMode);
    s.querySelector('#back')!.addEventListener('click', () => fromModes ? this.showModes() : this.showMenu());

    // nível
    s.querySelectorAll('.lvl-chip').forEach(b => b.addEventListener('click', () => { this.cfgLevel = +(b as HTMLElement).dataset.l!; this.cfgTrack = 0; this.renderSetup(); }));
    // formato de campeonato
    s.querySelectorAll('.champ-fmt').forEach(b => b.addEventListener('click', () => { this.cfgChampFmt = (b as HTMLElement).dataset.f as ChampFmt; this.renderSetup(); }));
    // tamanho de time (Dupla)
    s.querySelectorAll('[data-ts]').forEach(b => b.addEventListener('click', () => { this.cfgTeamSize = +(b as HTMLElement).dataset.ts!; this.resetPlayers('dupla'); this.renderSetup(); }));
    // modo de escolha
    s.querySelector('#pspec')?.addEventListener('click', () => { this.cfgPick = 'specific'; this.renderSetup(); });
    s.querySelector('#prlvl')?.addEventListener('click', () => { this.cfgPick = 'randlevel'; this.renderSetup(); });
    s.querySelector('#prany')?.addEventListener('click', () => { this.cfgPick = 'randany'; this.renderSetup(); });
    // navegação de pista
    s.querySelector('#tprev')?.addEventListener('click', () => { this.cfgTrack = (this.cfgTrack + TRACKS_PER_LEVEL - 1) % TRACKS_PER_LEVEL; this.renderSetup(); });
    s.querySelector('#tnext')?.addEventListener('click', () => { this.cfgTrack = (this.cfgTrack + 1) % TRACKS_PER_LEVEL; this.renderSetup(); });
    s.querySelectorAll('.tnum').forEach(b => b.addEventListener('click', () => { this.cfgTrack = +(b as HTMLElement).dataset.i!; this.renderSetup(); }));

    if (canPlayers) {
      this.renderPlayers(s.querySelector('#players') as HTMLElement);
      s.querySelector('#less')!.addEventListener('click', () => { if (this.cfgPlayers.length > 2) { this.cfgPlayers.pop(); this.renderSetup(); } });
      s.querySelector('#more')!.addEventListener('click', () => { if (this.cfgPlayers.length < 6) { const i = this.cfgPlayers.length; this.cfgPlayers.push({ human: this.cfgMode === 'local', ai: AI_KINDS[i % AI_KINDS.length], color: i % CAP_COLORS.length, name: this.cfgMode === 'local' ? `Jogador ${i + 1}` : AI_NAMES[(i - 1) % AI_NAMES.length] }); this.renderSetup(); } });
    }
    s.querySelector('#play')!.addEventListener('click', () => this.launch());
  }
  private levelHint(i: number): string { return ['muito protegida', 'protegida', 'pouca proteção', 'quase sem muro', 'sem muro'][i]; }
  private lenLabel(t: any): string { let a = 0; for (let i = 1; i < t.path.length; i++) a += Math.hypot(t.path[i].x - t.path[i - 1].x, t.path[i].y - t.path[i - 1].y); return a < 320 ? 'curta' : a < 480 ? 'longa' : a < 620 ? 'muito longa' : 'épica'; }
  private renderPlayers(host: HTMLElement): void {
    host.innerHTML = '';
    const dupla = this.cfgMode === 'dupla';
    this.cfgPlayers.forEach((p, i) => {
      const isYou = i === 0;
      const team = dupla ? i % 2 : -1;
      const teamBadge = dupla ? `<span class="team-badge t${team}">Time ${team === 0 ? 'A' : 'B'}</span>` : '';
      const row = this.el(`<div class="prow ${isYou ? 'you-row' : ''} ${dupla ? 'team-t' + team : ''}">
        ${isYou ? '<span class="pcap-mini" id="ycap"></span>' : `<span class="pdot" style="background:${CAP_COLORS[p.color]}"></span>`}
        <input class="pname" value="${p.name}" ${isYou ? 'readonly' : ''}/>
        ${teamBadge}
        ${isYou ? '<button class="ptag you">🎨 trocar</button>' : `<button class="ptype">${p.human ? '👤 Humano' : '🤖 ' + AI_LABEL[p.ai]}</button>`}
      </div>`);
      host.appendChild(row);
      const nameInput = row.querySelector('.pname') as HTMLInputElement;
      nameInput.addEventListener('change', () => p.name = nameInput.value || p.name);
      if (isYou) {
        const face = row.querySelector('#ycap') as HTMLElement;
        const cv = drawCap(skinById(save.skin()).art, 60); cv.style.width = '100%'; cv.style.height = '100%'; cv.style.display = 'block'; face.appendChild(cv);
        const open = () => this.showCapPicker(save.skin(), (id) => { this.cb.setSkin(id); this.renderPlayers(host); });
        face.addEventListener('click', open);
        (row.querySelector('.ptag') as HTMLElement).addEventListener('click', open);
      } else {
        const dot = row.querySelector('.pdot') as HTMLElement;
        dot.addEventListener('click', () => { p.color = (p.color + 1) % CAP_COLORS.length; dot.style.background = CAP_COLORS[p.color]; });
        const tbtn = row.querySelector('.ptype') as HTMLElement | null;
        if (tbtn) tbtn.addEventListener('click', () => {
          if (this.cfgMode === 'local') { p.human = !p.human; if (!p.human) p.ai = AI_KINDS[i % AI_KINDS.length]; }
          else { const idx = AI_KINDS.indexOf(p.ai); p.ai = AI_KINDS[(idx + 1) % AI_KINDS.length]; p.human = false; }
          this.renderPlayers(host);
        });
      }
    });
  }
  private launch(): void {
    const solo = this.cfgMode === 'daily' || this.cfgMode === 'trial';
    const dupla = this.cfgMode === 'dupla';
    // adversários pegam tampinhas da MESMA RARIDADE que a sua (diferentes entre si)
    const opp = opponentSkins(save.skin(), this.cfgPlayers.length - 1);
    const players: PlayerDef[] = solo
      ? [{ name: 'Você', isAI: false, skin: save.skin() }]
      : this.cfgPlayers.map((p, i) => ({ name: p.name, isAI: !p.human, ai: p.ai, skin: i === 0 ? save.skin() : opp[i - 1], team: dupla ? i % 2 : undefined }));
    // resolve o sorteio (o modo escolhido é lembrado p/ a "próxima pista")
    let level = this.cfgLevel, idx = this.cfgTrack;
    if (this.cfgPick === 'randlevel') idx = Math.floor(Math.random() * TRACKS_PER_LEVEL);
    else if (this.cfgPick === 'randany') { level = Math.floor(Math.random() * 5); idx = Math.floor(Math.random() * TRACKS_PER_LEVEL); }
    this.cb.start({ level, trackIdx: idx, pick: this.cfgPick, players, mode: this.cfgMode, champFmt: this.cfgChampFmt, teamSize: this.cfgTeamSize });
  }

  private drawMini(host: HTMLElement, t: any): void {
    const W = 250, H = 156, pad = 10;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const c = cv.getContext('2d')!;
    const sc = Math.min((W - pad * 2) / t.w, (H - pad * 2) / t.h);
    const ox = (W - t.w * sc) / 2, oy = (H - t.h * sc) / 2;
    const X = (x: number) => ox + x * sc, Y = (y: number) => oy + y * sc;
    c.fillStyle = '#0000002e'; c.fillRect(0, 0, W, H);
    // corredor (faixa larga clara)
    c.strokeStyle = 'rgba(255,255,255,0.18)'; c.lineWidth = Math.max(4, 8 * sc); c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath(); t.path.forEach((p: any, i: number) => { const x = X(p.x), y = Y(p.y); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke();
    // bordas (proteção) — quanto mais linhas, mais fácil
    c.strokeStyle = t.wallCol || '#caa'; c.globalAlpha = 0.9; c.lineWidth = 1.3;
    c.beginPath(); for (const w of t.walls) { c.moveTo(X(w.a.x), Y(w.a.y)); c.lineTo(X(w.b.x), Y(w.b.y)); } c.stroke(); c.globalAlpha = 1;
    // linha central tracejada
    c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = 1.4; c.setLineDash([3, 3]);
    c.beginPath(); t.path.forEach((p: any, i: number) => { const x = X(p.x), y = Y(p.y); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); c.setLineDash([]);
    // obstáculos
    for (const o of t.obstacles) {
      const r = Math.max(1.4, o.r * sc);
      c.fillStyle = o.type === 'hole' ? '#120c06' : o.type === 'bomb' ? '#e5484d' : o.type === 'stone' ? '#9a948a' : (o.n >= 3 ? '#e0a020' : o.n === 2 ? '#2e9fa4' : '#2ea44f');
      c.beginPath(); c.arc(X(o.x), Y(o.y), r, 0, 7); c.fill();
    }
    // largada / chegada
    c.fillStyle = '#3fae6a'; c.beginPath(); c.arc(X(t.start.x), Y(t.start.y), 4, 0, 7); c.fill();
    c.fillStyle = '#e5484d'; const f = t.finish[0]; c.beginPath(); c.arc(X(f.x), Y(f.y), 4, 0, 7); c.fill();
    host.innerHTML = ''; host.appendChild(cv);
  }

  // -------------------------------------------------------------- SKINS
  showSkins(): void {
    this.clear();
    const wins = save.wins(); const cur = save.skin();
    const s = this.el(`<div class="screen skins">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas <span class="cap-count">${unlockedSkins(wins).length}/${SKINS.filter(k => !k.hidden).length}</span></h2><div></div></div>
      <div class="skin-scroll" id="scroll"></div>
    </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(5));
    const scroll = s.querySelector('#scroll') as HTMLElement;
    for (const rar of RARITY_ORDER) {
      const group = SKINS.filter(k => k.rarity === rar && !k.hidden);
      const got = group.filter(k => wins >= k.unlock || save.hasBonus(k.id)).length;
      const sec = this.el(`<div class="rar-sec">
        <div class="rar-head" style="--rc:${RARITY_COLOR[rar]}"><span class="rar-dot"></span>${RARITY_LABEL[rar]} <b>${got}/${group.length}</b></div>
        <div class="skin-grid"></div></div>`);
      scroll.appendChild(sec);
      const grid = sec.querySelector('.skin-grid') as HTMLElement;
      for (const k of group) {
        const locked = wins < k.unlock && !save.hasBonus(k.id);
        // CARREIRA da tampinha: nível cosmético (brilho/estrela/coroa) — status intactos
        const lv = capLevel(save.capCareer(k.id));
        const lvBadge = !locked && lv >= 2 ? `<span class="cap-lv ${lv >= 7 ? 'gold' : lv >= 4 ? 'silver' : ''}">${lv >= 10 ? '👑' : lv >= 4 ? '⭐' : ''}Nv ${lv}</span>` : '';
        const card = this.el(`<button class="skin-card ${cur === k.id ? 'sel' : ''} ${locked ? 'locked' : ''} ${!locked && lv >= 4 ? 'lvglow' + (lv >= 7 ? '2' : '') : ''}" style="--rc:${RARITY_COLOR[k.rarity]}">
          ${lvBadge}
          <div class="skin-face"></div>
          <div class="skin-name">${k.name}</div>
          <div class="skin-desc">${locked ? (k.prize != null ? '🏆 OURO nas 4 da ' + LIGAS[k.prize].name : k.rprize != null ? (k.rcaos ? '🌀' : '⚔️') + ' OURO nas 8 do ' + RANK_TIERS[k.rprize].name + ' (Ranqueada' + (k.rcaos ? ' Caos' : '') + ')' : '🔒 ' + k.unlock + ' vitórias') : k.desc}</div>
          ${capBars(k.stats, true)}
        </button>`);
        const face = card.querySelector('.skin-face') as HTMLElement;
        const cv = drawCap(k.art, 132); cv.style.width = '100%'; cv.style.height = 'auto'; cv.style.display = 'block';
        if (locked) cv.style.filter = 'grayscale(1) brightness(0.55)';
        face.appendChild(cv);
        grid.appendChild(card);
        if (!locked) card.addEventListener('click', () => { this.cb.setSkin(k.id); this.showSkins(); });
      }
    }
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
  }

  // -------------------------------------------------------------- SETTINGS
  showSettings(): void {
    this.clear();
    const s = this.el(`<div class="screen settings">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Ajustes</h2><div></div></div>
      <div class="cfg-row"><label>Música</label><input type="range" id="mus" min="0" max="1" step="0.05" value="${settings.music}"></div>
      <div class="cfg-row"><label>Efeitos</label><input type="range" id="sfx" min="0" max="1" step="0.05" value="${settings.sfx}"></div>
      <div class="cfg-row"><label>Mudo</label><button class="chip" id="mute">${settings.muted ? '🔇 Ligado' : '🔊 Desligado'}</button></div>
      <div class="cfg-row"><label>📱 Conta</label><div style="display:flex;gap:8px"><button class="chip" id="txout">📤 Transferir</button><button class="chip" id="txin">📥 Receber</button></div></div>
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(5));
    const apply = () => this.cb.setVols(+(s.querySelector('#mus') as HTMLInputElement).value, +(s.querySelector('#sfx') as HTMLInputElement).value, settings.muted);
    s.querySelector('#mus')!.addEventListener('input', apply);
    s.querySelector('#sfx')!.addEventListener('input', apply);
    s.querySelector('#mute')!.addEventListener('click', () => { settings.muted = !settings.muted; apply(); (s.querySelector('#mute') as HTMLElement).textContent = settings.muted ? '🔇 Ligado' : '🔊 Desligado'; });
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    // TRANSFERÊNCIA DE CONTA: exportar (código) / receber (colar código)
    s.querySelector('#txout')!.addEventListener('click', () => {
      const code = exportAccount();
      const { box, close } = this.overlay(`
        <div class="ov-head"><b>📤 Transferir conta</b><button class="ov-x">✕</button></div>
        <p class="tx-note">Este código carrega <b>TODO o seu progresso</b> — campanha, ranqueadas (com seu nome!), coleção e pistas. No outro celular, abra Ajustes → <b>📥 Receber</b> e cole.</p>
        <textarea class="tx-code" id="txc" readonly>${code}</textarea>
        <div class="mactions"><button class="chip" id="txshare">📲 Enviar</button><button class="play-btn" id="txcopy">📋 Copiar</button></div>`);
      box.querySelector('.ov-x')!.addEventListener('click', close);
      box.querySelector('#txcopy')!.addEventListener('click', async () => { try { await navigator.clipboard.writeText(code); this.notify('Código copiado! 📋', 'good'); } catch { (box.querySelector('#txc') as HTMLTextAreaElement).select(); document.execCommand('copy'); this.notify('Código copiado! 📋', 'good'); } });
      box.querySelector('#txshare')!.addEventListener('click', () => { if (navigator.share) navigator.share({ text: code }).catch(() => {}); else this.notify('Use o Copiar 📋', ''); });
    });
    s.querySelector('#txin')!.addEventListener('click', () => {
      const { box, close } = this.overlay(`
        <div class="ov-head"><b>📥 Receber conta</b><button class="ov-x">✕</button></div>
        <p class="tx-note">Cole aqui o código gerado no outro celular. <b>Atenção:</b> isso <b>substitui</b> todo o progresso DESTE aparelho!</p>
        <textarea class="tx-code" id="txc" placeholder="TMPR1.…"></textarea>
        <div class="mactions"><button class="chip" id="txno">Cancelar</button><button class="play-btn" id="txgo">📥 Importar</button></div>`);
      box.querySelector('.ov-x')!.addEventListener('click', close);
      box.querySelector('#txno')!.addEventListener('click', close);
      box.querySelector('#txgo')!.addEventListener('click', () => {
        const r = importAccount((box.querySelector('#txc') as HTMLTextAreaElement).value);
        if (!r.ok) { this.notify(r.err === 'checksum' ? 'Código incompleto — copie ele INTEIRO' : 'Código inválido', 'bad'); return; }
        this.notify('Conta recebida! Recarregando… 🎉', 'good');
        setTimeout(() => location.reload(), 900);
      });
    });
  }

  // ---------------------------------------------------------- OVERLAYS
  private overlay(inner: string, cls = ''): { box: HTMLElement; close: () => void } {
    const bg = this.el(`<div class="ov-bg"><div class="ov ${cls}">${inner}</div></div>`);
    this.root.appendChild(bg);
    const close = () => bg.remove();
    bg.addEventListener('click', (e) => { if (e.target === bg) close(); });
    return { box: bg.querySelector('.ov') as HTMLElement, close };
  }
  private notify(msg: string, kind = ''): void {
    const n = this.el(`<div class="float-msg ${kind}">${msg}</div>`); this.root.appendChild(n);
    setTimeout(() => n.classList.add('show'), 10);
    setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 300); }, 2400);
  }

  // seletor de tampinha (as que você já tem) — troca sua tampinha
  showCapPicker(currentId: string, onPick: (id: string) => void): void {
    const unl = unlockedSkins(save.wins());
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>🎨 Sua tampinha</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">Você tem ${unl.length} tampinha${unl.length > 1 ? 's' : ''} — toque pra escolher</div>
      <div class="pick-grid" id="pg"></div>`, 'wide');
    const grid = box.querySelector('#pg') as HTMLElement;
    for (const k of unl) {
      const card = this.el(`<button class="pick-card ${k.id === currentId ? 'sel' : ''}" style="--rc:${RARITY_COLOR[k.rarity]}">
        <div class="pick-face"></div><div class="pick-name">${k.name}</div>${capBars(k.stats, true)}</button>`);
      const cv = drawCap(k.art, 96); cv.style.width = '100%'; cv.style.height = 'auto'; cv.style.display = 'block';
      (card.querySelector('.pick-face') as HTMLElement).appendChild(cv);
      card.addEventListener('click', () => { onPick(k.id); close(); });
      grid.appendChild(card);
    }
    box.querySelector('.ov-x')!.addEventListener('click', close);
  }

  // painel detalhado de uma tampinha (usado ao clicar num nome durante a corrida).
  // `stats` = atributos REAIS na partida (campanha: já com a Oficina aplicada) —
  // sem eles, mostra os da skin. Atributo melhorado ganha um ▲ verde.
  showCapStats(name: string, skinId: string, stats?: CapStats): void {
    const k = skinById(skinId);
    const shown = stats || (k.stats as CapStats);
    const upgraded = !!stats && STAT_DEFS.some(([, key]) => (stats as any)[key] > ((k.stats as any)[key] ?? 1) + 1e-6);
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>${name}</b><button class="ov-x">✕</button></div>
      <div class="cs-face" id="csf"></div>
      <div class="cs-name" style="color:${RARITY_COLOR[k.rarity]}">${k.name}</div>
      <div class="rar-head cs-rar" style="--rc:${RARITY_COLOR[k.rarity]};justify-content:center"><span class="rar-dot"></span>${RARITY_LABEL[k.rarity]}</div>
      ${capBars(shown, true, stats ? (k.stats as CapStats) : undefined)}
      ${upgraded ? '<div class="cs-ofi">▲ melhorado na Oficina</div>' : ''}
      <div class="cs-desc">${k.desc}</div>
      ${(() => {
        const cc = save.capCareer(k.id);
        if (!cc.r) return '';
        const pg = capLevelProgress(cc);
        return `<div class="career-box"><div class="career-t">🏁 CARREIRA · ${pg.lv >= 10 ? '👑 ' : ''}Nível ${pg.lv}</div>
          <div class="career-bar"><i style="width:${Math.min(100, Math.round(pg.cur / pg.next * 100))}%"></i></div>
          <div class="career-row"><span>🏁 ${cc.r} corridas</span><span>🥇 ${cc.w} vitórias</span><span>🏅 ${cc.p} pódios</span><span>🕳️ ${cc.q} quedas</span></div></div>`;
      })()}`, 'stats');
    const cv = drawCap(k.art, 160); cv.style.width = '124px'; cv.style.height = '124px'; cv.style.display = 'block'; cv.style.margin = '0 auto';
    (box.querySelector('#csf') as HTMLElement).appendChild(cv);
    box.querySelector('.ov-x')!.addEventListener('click', close);
  }

  // ------------------------------------------------------------- HELP
  showHelp(): void {
    this.clear();
    const obst: [string, string, string][] = [
      ['⚫', 'Buraco', 'Caiu, voltou! Você retorna ao <b>último checkpoint</b> e perde 1 peteléco. Eles ficam fora da linha central — dá pra desviar.'],
      ['💣', 'Bomba (X)', 'Explode e você <b>perde o resto da vez</b>. Passe bem longe.'],
      ['🪨', 'Pedra', 'Sólida: a tampinha <b>quica</b> nela. Dá pra usar de tabela pra fazer curva… ou te atrapalha.'],
      ['🛫', 'Rampa de salto', 'Com <b>velocidade</b> a tampinha decola e <b>voa por cima</b> do buraco na frente. Devagar, ela cai. Chegue com força!'],
      ['⏫', 'Setas verdes', 'Tira de aceleração: dá um <b>impulso</b> no sentido da pista. Passe por cima pra ganhar velocidade.'],
      ['🪵', 'Tábuas (zig-zag)', 'Estreitam a pista de um lado e do outro. Faça o <b>zigue-zague</b> pra passar.'],
      ['💎', 'Bônus +1/+2/+3', 'Petelecos extras! Ficam em lugares <b>arriscados</b>: quanto maior o número, mais perto da beira ou de um buraco. O +3 é pra corajoso.'],
      ['🚩', 'Checkpoint', 'A faixa azul numerada. Ao <b>cruzar</b>, você fica salvo ali — se cair depois, volta pra este ponto (não pro início).'],
      ['🏁', 'Fora da pista', 'Saiu do corredor? Volta pro começo do peteléco. Nas fases difíceis quase não tem muro — cuidado!'],
    ];
    const stats: [string, string, string][] = [
      ['Peso', '⚖️', 'Massa da tampinha. A <b>pesada</b> quase não sai do lugar quando batem nela e <b>empurra</b> as leves pra longe. Só que em areia/lama afunda e freia mais.'],
      ['Desliza', '💨', 'Vai <b>mais longe</b> com o mesmo peteléco. Ótima em calçada/giz; cuidado pra não passar do ponto.'],
      ['Controle', '🎯', 'Freia mais certinho no fim — <b>para onde você mira</b>. Boa pra encaixar em espaço apertado sem passar direto.'],
      ['Quique', '🏀', 'Quica mais nas <b>bordas</b> e pedras, e "tabela" mais forte batendo nas outras tampinhas.'],
      ['Estabil.', '🌀', 'Mantém a linha: <b>roda menos</b> e desvia menos do rumo. Estável = previsível.'],
      ['Potência', '💥', 'Sai com mais <b>força</b>: bate mais forte nas rivais (joga elas longe) e atravessa melhor a <b>lama e a areia</b>. Quem vai mais longe é o Desliza.'],
      ['Aderência', '🧲', 'Firmeza na pista: <b>difícil de te jogarem pra fora</b> quando batem em você. Segura firme na hora do encontrão.'],
    ];
    const card = (i: string, t: string, d: string) => `<div class="hc"><div class="hc-ico">${i}</div><div class="hc-tx"><div class="hc-t">${t}</div><div class="hc-d">${d}</div></div></div>`;
    const s = this.el(`<div class="screen help">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Como Jogar</h2><div></div></div>
      <div class="help-scroll">
        <div class="help-intro">Arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. São <b>3 petelecos</b> por vez. A corrida acaba quando o <b>penúltimo</b> chega. Dois dedos giram/aproximam a câmera.</div>
        <h3 class="help-h">🧩 Obstáculos</h3>
        <div class="help-grid">${obst.map(o => card(o[0], o[1], o[2])).join('')}</div>
        <h3 class="help-h">🌍 Superfícies (cada uma faz uma coisa!)</h3>
        <div class="help-grid">${[
          ['🟡', 'Areia', 'Freia bastante e <b>afunda o pesado</b>. Potência ajuda a atravessar.'],
          ['🌿', 'Grama', 'Freia e o mato <b>PUXA PRO LADO</b> — a tampinha girando desvia da linha. <b>Estabilidade</b> segura firme.'],
          ['🟤', 'Lama', '<b>Prende</b> de verdade. Só muita <b>Potência</b> atravessa.'],
          ['💧', 'Água', 'A <b>correnteza EMPURRA</b> no sentido do fluxo — pode te levar pro lugar errado (ou certo!).'],
          ['🧊', 'Gelo', 'Quase <b>não para</b> — desliza demais. Cuidado pra não passar do ponto!'],
          ['🖍️', 'Giz/Calçada', 'Lisinho: desliza longe, bom pra ganhar distância.'],
        ].map(o => card(o[0], o[1], o[2])).join('')}</div>
        <h3 class="help-h">🏅 Atributos das tampinhas</h3>
        <div class="help-note">Cada tampinha tem notas de <b>0 a 99</b>. Compare as barrinhas e os números pra escolher a sua!</div>
        <div class="help-grid">${stats.map(o => card(o[1], o[0], o[2])).join('')}</div>
      </div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(5));
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
  }

  // ---------------------------------------------------- MULTIPLAYER
  showMultiplayer(): void {
    this.clear();
    const s = this.el(`<div class="screen setup">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Multiplayer</h2><div></div></div>
      <div class="mp-choice">
        <button class="mp-card" id="mlocal"><span class="mp-ico">👥</span><b>Local</b><span>2–6 no mesmo aparelho, revezando</span></button>
        <button class="mp-card on" id="monline"><span class="mp-ico">🌐</span><b>Online</b><span>crie uma sala e jogue com amigos por código</span></button>
      </div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(6));
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    s.querySelector('#mlocal')!.addEventListener('click', () => this.showSetup('local'));
    s.querySelector('#monline')!.addEventListener('click', () => this.showOnlineHome());
  }

  showOnlineHome(): void {
    this.clear();
    const s = this.el(`<div class="screen setup online-home">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Jogar Online</h2><div></div></div>
      <div class="ol-face" id="olface"></div>
      <div class="ol-facelab">sua tampinha (toque pra trocar)</div>
      <div class="ol-namelab">✏️ Seu nome (os outros vão ver assim)</div>
      <input class="ol-name" id="oname" maxlength="12" value="${this.myName}" placeholder="Seu nome"/>
      <button class="play-btn" id="create">➕ Criar sala</button>
      <div class="ol-or"><span>ou entre num código</span></div>
      <div class="ol-join">
        <input class="ol-code" id="ocode" maxlength="5" placeholder="CÓDIGO" autocomplete="off"/>
        <button class="chip big" id="join">Entrar ▶</button>
      </div>
      <div class="ol-tip">Cada um no seu aparelho ou aba. Até <b>6</b> jogadores — complete o resto com <b>IA</b>. Conexão direta P2P.</div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(5));
    const cv = drawCap(skinById(save.skin()).art, 96); cv.style.width = '86px'; cv.style.height = '86px'; cv.style.display = 'block'; cv.style.margin = '0 auto';
    const face = s.querySelector('#olface') as HTMLElement; face.appendChild(cv);
    face.addEventListener('click', () => this.showCapPicker(save.skin(), (id) => { this.cb.setSkin(id); this.showOnlineHome(); }));
    const nameEl = s.querySelector('#oname') as HTMLInputElement;
    const codeEl = s.querySelector('#ocode') as HTMLInputElement;
    const grabName = () => { this.myName = (nameEl.value || 'Você').slice(0, 12); save.setName(this.myName); return this.myName; };
    nameEl.addEventListener('change', grabName);
    codeEl.addEventListener('input', () => codeEl.value = codeEl.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5));
    s.querySelector('#back')!.addEventListener('click', () => { this.online.leave(); this.showMultiplayer(); });
    s.querySelector('#create')!.addEventListener('click', () => { this.online.createRoom(grabName(), save.skin()); this.showLobby('Criando sala…'); });
    s.querySelector('#join')!.addEventListener('click', () => {
      const c = codeEl.value.trim(); if (c.length < 4) { this.notify('Digite o código da sala', 'bad'); return; }
      this.online.joinRoom(c, grabName(), save.skin()); this.showLobby('Entrando na sala…');
    });
  }

  private lobbyOpen = false;
  showLobby(status = ''): void {
    this.clear(); this.lobbyOpen = true;
    const s = this.el(`<div class="screen setup lobby">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Sair</button><h2>Sala Online</h2><div></div></div>
      <div class="lob-code" id="code"></div>
      <div class="lob-status" id="status">${status}</div>
      <div class="lob-seats" id="seats"></div>
      <div class="lob-ctrl" id="ctrl"></div>
    </div>`);
    this.root.appendChild(s); s.prepend(this.bgFx(4));
    s.querySelector('#back')!.addEventListener('click', () => { this.lobbyOpen = false; this.online.leave(); this.showOnlineHome(); });
    // eventos da sala
    this.online.onCode = () => this.renderLobby();
    this.online.onRoster = () => this.renderLobby();
    this.online.onError = (m) => { const st = document.querySelector('.lobby #status') as HTMLElement | null; if (st) { st.textContent = m; st.classList.add('err'); } this.notify(m, 'bad'); };
    this.renderLobby();
  }

  private renderLobby(): void {
    const scr = this.root.querySelector('.lobby'); if (!scr) return;
    const o = this.online;
    (scr.querySelector('#code') as HTMLElement).innerHTML = o.code
      ? `<span class="lc-lab">código</span><span class="lc-val" id="cval">${o.code}</span><button class="chip lc-copy" id="copy">📋 Compartilhar</button>`
      : `<span class="lc-lab">conectando…</span>`;
    const copy = scr.querySelector('#copy'); if (copy) copy.addEventListener('click', () => {
      const txt = 'Bora jogar Tampinha Rally! Código da sala: ' + o.code;
      if ((navigator as any).share) (navigator as any).share({ text: txt }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(o.code).then(() => this.notify('Código copiado!', 'good'));
      else this.notify('Código: ' + o.code);
    });
    // assentos
    const seatsEl = scr.querySelector('#seats') as HTMLElement; seatsEl.innerHTML = '';
    const seats = o.seats.length ? o.seats : [{ name: o.myName, skin: o.mySkin, kind: 'human' as const, owner: 'host' }];
    (scr.querySelector('#status') as HTMLElement).textContent = `${seats.length}/6 na sala`;
    seats.forEach((st) => {
      const mine = st.kind === 'human' && st.owner === o.myId;
      const tag = st.off ? '📴 saiu (IA)' : st.kind === 'ai' ? '🤖 ' + o.aiLabel(st.ai) : st.owner === 'host' ? '👑 anfitrião' : mine ? '⭐ você' : '👤 jogador';
      const teamB = (o.cfg.roomMode === 'dupla' && st.team != null) ? `<span class="team-badge t${st.team}">${st.team === 0 ? 'A' : 'B'}</span>` : '';
      // no SEU assento o nome é editável (os outros veem na hora que você troca)
      const nameEl = mine
        ? `<input class="ls-name-edit" id="myname" maxlength="12" value="${st.name}"/>`
        : `<span class="ls-name">${st.name}</span>`;
      const row = this.el(`<div class="prow lob-seat ${mine ? 'you-row' : ''} ${o.cfg.roomMode === 'dupla' && st.team != null ? 'team-t' + st.team : ''}"><span class="pcap-mini"></span>${nameEl}${teamB}<span class="ls-tag">${tag}</span></div>`);
      const cv = drawCap(skinById(st.skin).art, 56); cv.style.width = '100%'; cv.style.height = '100%'; cv.style.display = 'block';
      (row.querySelector('.pcap-mini') as HTMLElement).appendChild(cv);
      if (mine) {
        const face = row.querySelector('.pcap-mini') as HTMLElement;
        face.classList.add('tap');
        face.addEventListener('click', () => this.showCapPicker(o.mySkin, (id) => { this.cb.setSkin(id); o.setMyCap(id); }));
        const ni = row.querySelector('#myname') as HTMLInputElement;
        const apply = () => { const n = (ni.value || 'Você').slice(0, 12); this.myName = n; save.setName(n); o.setMyName(n); };
        ni.addEventListener('change', apply);
        ni.addEventListener('blur', apply);
      }
      seatsEl.appendChild(row);
    });
    // controles
    const ctrl = scr.querySelector('#ctrl') as HTMLElement; ctrl.innerHTML = '';
    if (o.isHost) {
      const lvlChips = LEVELS.map((n, i) => `<button class="lvl-chip mini ${i === o.cfg.level ? 'sel' : ''}" data-l="${i}" style="--lc:${LEVEL_COLORS[i]}"><b>${n}</b></button>`).join('');
      const pickRow = `<div class="rand-row"><button class="chip ${o.cfg.pick === 'specific' ? 'sel' : ''}" data-p="specific">🎯 Escolher</button><button class="chip ${o.cfg.pick === 'randlevel' ? 'sel' : ''}" data-p="randlevel">🎲 Do nível</button><button class="chip ${o.cfg.pick === 'randany' ? 'sel' : ''}" data-p="randany">🎲 Qualquer</button></div>`;
      const tnums = o.cfg.pick === 'specific' ? `<div class="tnum-row">${Array.from({ length: TRACKS_PER_LEVEL }, (_, i) => `<button class="tnum ${i === o.cfg.trackIdx ? 'sel' : ''}" data-i="${i}">${i + 1}</button>`).join('')}</div>` : '';
      const rm = o.cfg.roomMode;
      const roomRow = `<div class="lob-h">Modo da sala</div><div class="rand-row room-row">
        <button class="chip ${rm === 'normal' ? 'sel' : ''}" data-rm="normal">🏁 Normal</button>
        <button class="chip ${rm === 'dupla' ? 'sel' : ''}" data-rm="dupla">🤝 Dupla</button>
        <button class="chip ${rm === 'champ' ? 'sel' : ''}" data-rm="champ">🏆 Campeonato</button></div>`;
      const extraRow = rm === 'dupla'
        ? `<div class="rand-row"><button class="chip ${o.cfg.teamSize === 2 ? 'sel' : ''}" data-team="2">2 × 2</button><button class="chip ${o.cfg.teamSize === 3 ? 'sel' : ''}" data-team="3">3 × 3</button></div>`
        : rm === 'champ'
          ? `<div class="rand-row">${[3, 5, 7].map(n => `<button class="chip ${o.cfg.champRaces === n ? 'sel' : ''}" data-cr="${n}">${n} corridas</button>`).join('')}</div>`
          : '';
      const totalRow = rm === 'dupla' ? '' : `<div class="lob-total"><button class="chip" id="tless">–</button><span><b>${o.total}</b> corredores <small>(${o.seats.filter(x=>x.kind==='human').length} 👤 + ${o.seats.filter(x=>x.kind==='ai').length} 🤖)</small></span><button class="chip" id="tmore">+</button></div>`;
      ctrl.innerHTML = `${roomRow}${extraRow}<div class="lob-h">Dificuldade &amp; fase</div><div class="lvl-row">${lvlChips}</div>${pickRow}${tnums}
        ${totalRow}
        <button class="play-btn" id="startm">🏁 Começar ${rm === 'champ' ? 'Campeonato' : rm === 'dupla' ? 'Dupla' : 'Partida'}</button>`;
      ctrl.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => o.setRoom((b as HTMLElement).dataset.rm as any)));
      ctrl.querySelectorAll('[data-team]').forEach(b => b.addEventListener('click', () => o.setRoom('dupla', +(b as HTMLElement).dataset.team!)));
      ctrl.querySelectorAll('[data-cr]').forEach(b => b.addEventListener('click', () => o.setRoom('champ', o.cfg.teamSize, +(b as HTMLElement).dataset.cr!)));
      ctrl.querySelectorAll('.lvl-chip').forEach(b => b.addEventListener('click', () => o.setCfg(+(b as HTMLElement).dataset.l!, 0, o.cfg.pick)));
      ctrl.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => o.setCfg(o.cfg.level, o.cfg.trackIdx, (b as HTMLElement).dataset.p as any)));
      ctrl.querySelectorAll('.tnum').forEach(b => b.addEventListener('click', () => o.setCfg(o.cfg.level, +(b as HTMLElement).dataset.i!, o.cfg.pick)));
      ctrl.querySelector('#tless')?.addEventListener('click', () => o.setTotal(o.total - 1));
      ctrl.querySelector('#tmore')?.addEventListener('click', () => o.setTotal(o.total + 1));
      ctrl.querySelector('#startm')!.addEventListener('click', () => { this.lobbyOpen = false; o.startMatch(); });
    } else {
      const rmLab = o.cfg.roomMode === 'dupla' ? `🤝 Dupla ${o.cfg.teamSize}×${o.cfg.teamSize}` : o.cfg.roomMode === 'champ' ? `🏆 Campeonato (${o.cfg.champRaces} corridas)` : '🏁 Normal';
      ctrl.innerHTML = `<div class="lob-wait">⏳ Aguardando o anfitrião começar…<br><small>Modo: <b>${rmLab}</b> · Dificuldade: <b>${LEVELS[o.cfg.level]}</b></small></div>`;
    }
  }

  // -------------------------------------------------------------- HUD
  private hud: HTMLElement | null = null;
  showGame(): void { this.clear(); this.hud = this.el(`
    <div class="screen hud">
      <div class="hud-top">
        <button class="round" id="pause">❚❚</button>
        <div class="turn-banner" id="turn"></div>
        <button class="round" id="cam" title="A câmera segue sozinha">🎯</button>
      </div>
      <button class="round speed" id="speed" title="Velocidade das jogadas da IA">1×</button>
      <div class="standings" id="stand"></div>
      <div class="item-slot hidden" id="item"></div>
      <div class="flicks" id="flicks"></div>
      <div class="toast-wrap" id="toasts"></div>
      <div class="hint" id="hint"></div>
      <div class="modal-bg hidden" id="modal"><div class="modal" id="mbox"></div></div>
    </div>`);
    this.root.appendChild(this.hud);
    this.hud.querySelector('#pause')!.addEventListener('click', () => this.onPause?.());
    // VELOCIDADE da IA (1×/2×/4×): só offline — online todo mundo vê igual, fica 1×
    const spd = this.hud.querySelector('#speed') as HTMLElement;
    if (this.online.active) spd.classList.add('hidden');
    else {
      const paint = () => { spd.textContent = this.speedMul + '×'; spd.classList.toggle('fast', this.speedMul > 1); };
      paint();
      spd.addEventListener('click', () => { this.speedMul = this.speedMul === 1 ? 2 : this.speedMul === 2 ? 4 : 1; paint(); this.onSpeed?.(this.speedMul); });
      this.onSpeed?.(this.speedMul);   // re-aplica a escolha da sessão na corrida nova
    }
  }
  speedMul = 1;
  onSpeed: ((mul: number) => void) | null = null;
  onPause: (() => void) | null = null;
  onResume: (() => void) | null = null;
  onRestart: (() => void) | null = null;
  onNext: (() => void) | null = null;
  onMenu: (() => void) | null = null;
  onUseItem: ((slot: number) => void) | null = null;
  onDropShield: (() => void) | null = null;
  private wx: WeatherState | null = null;
  setWeather(w: WeatherState): void { this.wx = w; }
  private itemPop: number | null = null;   // Caos: bolso com a caixinha de confirmação aberta
  private shieldPop = false;               // Caos: caixinha "quer tirar o escudo?" aberta

  updateHUD(m: GameManager, humanTurn: boolean): void {
    if (!this.hud) return;
    const c = m.activeCap();
    const turn = this.hud.querySelector('#turn') as HTMLElement;
    const wxb = this.wx && this.wx.w !== 'sol' ? `<span class="wxpill" title="${WEATHER_LABEL[this.wx.w]}">${WEATHER_ICO[this.wx.w]}${this.wx.w === 'vento' ? `<i style="display:inline-block;transform:rotate(${Math.atan2(this.wx.windY, this.wx.windX)}rad)">➤</i>` : ''}</span>` : '';
    turn.innerHTML = `<span class="tdot" style="background:${skinById(c.skin).top};color:${skinById(c.skin).top}"></span> ${c.finished ? 'Corrida!' : 'Vez de <b>' + c.name + '</b>'} ${wxb}<span class="tzoom">🔍</span>`;
    turn.onclick = () => this.showCapStats(c.name, c.skin, c.stats);
    // flicks
    const fl = this.hud.querySelector('#flicks') as HTMLElement;
    let dots = ''; const total = Math.max(3, c.flicksLeft);
    for (let i = 0; i < c.flicksLeft; i++) dots += '<span class="fd on"></span>';
    fl.innerHTML = (m.phase === 'aim' && humanTurn ? '<span class="fl-lab">Petelecos</span>' : '') + dots + (c.flicksLeft === 1 ? '<span class="flast">último!</span>' : '');
    fl.style.opacity = (c.isAI || m.phase !== 'aim') ? '0.55' : '1';
    // CAOS: BOLSOS do jogador (coluna de botõezinhos na esquerda, abaixo do 1×/2×/4×).
    // Tocar no item abre a CAIXINHA: mostra o que ele faz e pergunta se quer usar
    const itemEl = this.hud.querySelector('#item') as HTMLElement;
    if (m.chaos && humanTurn && m.phase === 'aim' && (c.items.length || c.shield || c.boostNext > 1 || c.smashNext || c.ghostNext)) {
      itemEl.classList.remove('hidden');
      if (this.itemPop != null && !c.items[this.itemPop]) this.itemPop = null;   // o item de lá já foi
      if (!c.shield) this.shieldPop = false;                                    // escudo já foi/gastou
      let html = '';
      c.items.forEach((id, i) => { const it = ITEMS[id]; html += `<button class="item-mini ${this.itemPop === i ? 'open' : ''}" data-i="${i}"><span class="im-ico">${it.ico}</span><span class="im-lab">${it.name}</span></button>`; });
      const act = this.activeFxHtml(c);
      if (act) html += `<div class="fx-active col">${act}</div>`;
      if (this.itemPop != null && c.items[this.itemPop]) {
        const it = ITEMS[c.items[this.itemPop]];
        html += `<div class="item-pop" style="top:${8 + this.itemPop * 54}px">
          <div class="ip-head"><span class="ip-ico">${it.ico}</span><b>${it.name}</b></div>
          <p class="ip-desc">${it.desc}</p>
          <div class="ip-btns"><button class="ip-keep" id="ipno">✕ Guardar</button><button class="ip-use" id="ipyes">⚡ USAR</button></div>
        </div>`;
      }
      // tocou no escudo ativo → pergunta se quer TIRAR (ele ocupa um bolso!)
      if (this.shieldPop && c.shield) {
        html += `<div class="item-pop" style="top:${8 + c.items.length * 54}px">
          <div class="ip-head"><span class="ip-ico">🛡️</span><b>Escudo ativo</b></div>
          <p class="ip-desc">Ele ocupa um bolso enquanto estiver valendo. Sem perigo por perto? Tira ele e libera espaço pra outra caixinha!</p>
          <div class="ip-btns"><button class="ip-keep" id="spno">✕ Manter</button><button class="ip-use" id="spyes">🗑️ Tirar</button></div>
        </div>`;
      }
      itemEl.innerHTML = html;
      itemEl.querySelectorAll('.item-mini').forEach(btn => btn.addEventListener('click', () => {
        const i = +(btn as HTMLElement).dataset.i!;
        this.itemPop = this.itemPop === i ? null : i;      // toca de novo, fecha
        this.shieldPop = false;
        this.updateHUD(m, humanTurn);
      }));
      itemEl.querySelector('#ipno')?.addEventListener('click', () => { this.itemPop = null; this.updateHUD(m, humanTurn); });
      itemEl.querySelector('#ipyes')?.addEventListener('click', () => { const i = this.itemPop!; this.itemPop = null; this.onUseItem?.(i); });
      itemEl.querySelector('#fxshield')?.addEventListener('click', () => { this.shieldPop = !this.shieldPop; this.itemPop = null; this.updateHUD(m, humanTurn); });
      itemEl.querySelector('#spno')?.addEventListener('click', () => { this.shieldPop = false; this.updateHUD(m, humanTurn); });
      itemEl.querySelector('#spyes')?.addEventListener('click', () => { this.shieldPop = false; this.onDropShield?.(); });
    } else { itemEl.classList.add('hidden'); itemEl.innerHTML = ''; this.itemPop = null; this.shieldPop = false; }
    // standings (clique num nome → ficha da tampinha) + ícones de power-up (Caos)
    const st = this.hud.querySelector('#stand') as HTMLElement;
    st.innerHTML = m.standings().map((p, i) => `<div class="srow ${p.id === c.id ? 'act' : ''}" data-id="${p.id}"><span class="spos">${i + 1}º</span><span class="sdot" style="background:${skinById(p.skin).top}"></span><span class="sname">${p.name}</span>${m.chaos ? this.capFxIcons(p) : ''}${p.finished ? '<span class="sfin">🏁</span>' : '<span class="szoom">🔍</span>'}</div>`).join('');
    st.querySelectorAll('.srow').forEach(row => row.addEventListener('click', () => { const cap = m.caps[+(row as HTMLElement).dataset.id!]; if (cap) this.showCapStats(cap.name, cap.skin, cap.stats); }));
    // hint
    const hint = this.hud.querySelector('#hint') as HTMLElement;
    hint.style.display = (humanTurn && m.phase === 'aim') ? 'block' : 'none';
    hint.textContent = 'Arraste a tampinha para trás e solte';
  }

  // ícones de power-up de uma tampinha na tabela: guardados (esmaecidos) + ativos
  private capFxIcons(c: any): string {
    let out = '';
    for (const id of (c.items || [])) out += `<span class="fx-held" title="guardado">${ITEMS[id].ico}</span>`;
    if (c.shield) out += `<span class="fx-on" title="escudo ativo">🛡️</span>`;
    if (c.boostNext > 1) out += `<span class="fx-on" title="turbo pronto">🚀</span>`;
    if (c.smashNext) out += `<span class="fx-on" title="pancada armada">🥊</span>`;
    if (c.ghostNext) out += `<span class="fx-on" title="fantasma armado">👻</span>`;
    if (c.anchored) out += `<span class="fx-on" title="com âncora">⚓</span>`;
    return out ? `<span class="srow-fx">${out}</span>` : '';
  }
  // efeitos ATIVOS (já usados, valendo até gastar) do jogador da vez
  private activeFxHtml(c: any): string {
    const b: string[] = [];
    if (c.shield) b.push('<button class="fxa shield tap" id="fxshield">🛡️ Escudo</button>');   // clicável: dá pra TIRAR
    if (c.boostNext > 1) b.push('<span class="fxa boost">🚀 Turbo</span>');
    if (c.smashNext) b.push('<span class="fxa boost">🥊 Pancada</span>');
    if (c.ghostNext) b.push('<span class="fxa boost">👻 Fantasma</span>');
    if (c.anchored) b.push('<span class="fxa shield">⚓ Âncora!</span>');
    return b.join('');
  }

  toast(msg: string, kind = ''): void {
    if (!this.hud) return; const w = this.hud.querySelector('#toasts') as HTMLElement;
    const t = this.el(`<div class="toast ${kind}">${msg}</div>`); w.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 1700);
  }

  showPause(): void {
    const modal = this.hud!.querySelector('#modal') as HTMLElement; const box = this.hud!.querySelector('#mbox') as HTMLElement;
    box.className = 'modal'; box.innerHTML = `<h3>Pausado</h3><div class="mactions col">
      <button class="play-btn" id="r">▶ Continuar</button>
      <button class="chip" id="re">↻ Reiniciar</button>
      <button class="chip" id="mn">Sair</button></div>`;
    modal.classList.remove('hidden');
    box.querySelector('#r')!.addEventListener('click', () => this.onResume?.());
    box.querySelector('#re')!.addEventListener('click', () => this.onRestart?.());
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
  }
  hideModal(): void { this.hud?.querySelector('#modal')!.classList.add('hidden'); }

  showResults(m: GameManager, mode: Mode, champInfo?: { race: number; total: number; last: boolean; rows: { name: string; skin: string; pts: number; you: boolean }[]; fmt: string; hist?: number[] }, teamInfo?: { teams: { label: string; score: number; members: { name: string; skin: string; place: number; you: boolean }[]; win: boolean; you: boolean }[]; won: boolean }): void {
    const modal = this.hud!.querySelector('#modal') as HTMLElement; const box = this.hud!.querySelector('#mbox') as HTMLElement;
    const order = m.standings(); const you = (mode === 'online' && this.online.active) ? m.caps[this.online.mySeatIndex()] : m.caps.find(c => !c.isAI);
    const wonYou = teamInfo ? teamInfo.won : (you && you.place === 1);
    box.className = 'modal win';
    const head = mode === 'daily'
      ? `<h3>Chegou! 🏁</h3><div class="big">${m.caps[0].place === 1 ? 'Você completou!' : ''}</div>`
      : teamInfo
        ? `<h3>${teamInfo.won ? 'Seu time venceu! 🎉' : 'Fim de jogo'}</h3>`
        : champInfo
          ? `<h3 style="font-size:22px">Corrida ${champInfo.race}/${champInfo.total} 🏁</h3>`
          : `<h3>${wonYou ? 'Você venceu! 🎉' : (you ? you.place + 'º lugar' : 'Fim!')}</h3>`;
    // no campeonato, mostra a TABELA DE PONTOS ao vivo em vez do pódio
    const champStand = champInfo ? `${raceStrip(champInfo.race, champInfo.total, champInfo.hist)}<div class="champ-stand"><div class="cs-title">🏆 Classificação do campeonato</div>${champInfo.rows.map((r, i) => `<div class="cs-row ${r.you ? 'you' : ''} ${i === 0 ? 'lead' : ''}"><span class="cs-pos">${i + 1}º</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts}</b></div>`).join('')}</div>` : '';
    // dupla online: colunas dos times
    const teamStand = teamInfo ? `<div class="team-cols">${teamInfo.teams.map(t => `<div class="team-col ${t.win ? 'win' : ''} ${t.you ? 'mine' : ''}"><div class="team-h">${t.win ? '🏆 ' : ''}${t.label}</div><div class="team-score">${t.score} <small>pts</small></div>${t.members.slice().sort((a, b) => a.place - b.place).map(mm => `<div class="team-mem"><span class="tm-cap" data-s="${mm.skin}"></span><span class="tm-nm">${mm.name}</span><b>${mm.place}º</b></div>`).join('')}</div>`).join('')}</div>` : '';
    const actions = mode === 'online'
      ? (this.online.isHost
        ? `<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="lob">🔁 Nova partida</button>`
        : `<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>`)
      : champInfo
        ? `<button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${champInfo.last ? '🏆 Ver campeão' : 'Próxima ▶'}</button>`
        : `<button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button>`;
    box.innerHTML = `${head}${teamInfo ? teamStand : champInfo ? champStand : '<div class="podium" id="pod"></div>'}<div class="mactions">${actions}</div>`;
    if (champInfo) box.querySelectorAll('.cs-cap').forEach(el => { el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 44)); });
    if (teamInfo) box.querySelectorAll('.tm-cap').forEach(el => { el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 36)); });
    const pod = box.querySelector('#pod') as HTMLElement | null;
    if (pod) order.slice(0, Math.min(4, order.length)).forEach((p, i) => {
      const row = this.el(`<div class="prow2 ${i === 0 ? 'p1' : ''}"><span class="pl">${['🥇', '🥈', '🥉', '4º'][i]}</span><span class="pcap"></span><span class="pn">${p.name}</span></div>`);
      (row.querySelector('.pcap') as HTMLElement).appendChild(drawCap(skinById(p.skin).art, 64));
      row.addEventListener('click', () => this.showCapStats(p.name, p.skin, p.stats));
      pod.appendChild(row);
    });
    modal.classList.remove('hidden');
    if (wonYou || (mode === 'daily' && m.caps[0].place === 1)) this.confetti(box);
    box.querySelector('#mn')!.addEventListener('click', () => { if (mode === 'online') this.online.leave(); this.onMenu?.(); });
    box.querySelector('#re')?.addEventListener('click', () => this.onRestart?.());
    box.querySelector('#nx')?.addEventListener('click', () => this.onNext?.());
    box.querySelector('#lob')?.addEventListener('click', () => { this.hideModal(); this.online.backToLobby(); });
  }

  // classificação do campeonato ONLINE entre corridas (host avança; cliente aguarda)
  showOnlineChampStanding(rows: { seat: number; name: string; skin: string; pts: number; you: boolean }[], race: number, total: number, last: boolean, isHost: boolean): void {
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    const action = isHost
      ? `<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="nx">${last ? '🏆 Ver campeão' : 'Próxima corrida ▶'}</button>`
      : `<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>`;
    box.innerHTML = `<h3 style="font-size:22px">🏆 Campeonato · Corrida ${race}/${total}</h3>
      <div class="champ-stand"><div class="cs-title">Classificação geral</div>${rows.map((r, i) => `<div class="cs-row ${r.you ? 'you' : ''} ${i === 0 ? 'lead' : ''}"><span class="cs-pos">${i + 1}º</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts}</b></div>`).join('')}</div>
      <div class="mactions">${action}</div>`;
    box.querySelectorAll('.cs-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 44)));
    modal.classList.remove('hidden');
    box.querySelector('#mn')!.addEventListener('click', () => { this.online.leave(); this.onMenu?.(); });
    box.querySelector('#nx')?.addEventListener('click', () => { this.hideModal(); this.online.hostNextChamp(); });
  }

  // ------- resultados dos MODOS especiais -------
  private modalBox(): { modal: HTMLElement; box: HTMLElement } {
    return { modal: this.hud!.querySelector('#modal') as HTMLElement, box: this.hud!.querySelector('#mbox') as HTMLElement };
  }
  showTrialResult(d: { finished: boolean; flicks: number; best?: number; record: boolean }): void {
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    box.innerHTML = `<h3>${d.finished ? (d.record ? 'NOVO RECORDE! 🏆' : 'Chegou! ⏱️') : 'Fim'}</h3>
      <div class="trial-big"><span class="tb-num">${d.flicks}</span><span class="tb-lab">petelecos</span></div>
      <div class="trial-best">🏅 Recorde nesta pista: <b>${d.best ?? d.flicks}</b></div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ De novo</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`;
    modal.classList.remove('hidden'); if (d.record) this.confetti(box);
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
    box.querySelector('#re')!.addEventListener('click', () => this.onRestart?.());
    box.querySelector('#nx')!.addEventListener('click', () => this.onNext?.());
  }
  showTeamResult(d: { teams: { label: string; score: number; members: { name: string; skin: string; place: number; you: boolean }[]; win: boolean; you: boolean }[]; won: boolean }): void {
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    const cols = d.teams.map(t => `<div class="team-col ${t.win ? 'win' : ''} ${t.you ? 'mine' : ''}">
      <div class="team-h">${t.win ? '🏆 ' : ''}${t.label}</div>
      <div class="team-score">${t.score} <small>pts</small></div>
      ${t.members.sort((a, b) => a.place - b.place).map(m => `<div class="team-mem"><span class="tm-cap" data-s="${m.skin}"></span><span class="tm-nm">${m.name}</span><b>${m.place}º</b></div>`).join('')}
    </div>`).join('');
    box.innerHTML = `<h3>${d.won ? 'Seu time venceu! 🎉' : 'Fim de jogo'}</h3>
      <div class="team-cols">${cols}</div>
      <div class="team-note">Vence o time com a <b>menor soma</b> de colocações.</div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`;
    box.querySelectorAll('.tm-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 36)));
    modal.classList.remove('hidden'); if (d.won) this.confetti(box);
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
    box.querySelector('#re')!.addEventListener('click', () => this.onRestart?.());
    box.querySelector('#nx')!.addEventListener('click', () => this.onNext?.());
  }
  showElimResult(d: { loser: { name: string; skin: string }; survivors: { name: string; skin: string; you: boolean }[]; youOut: boolean; last: boolean; championName: string }): void {
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    box.innerHTML = `<h3>${d.last ? 'Última eliminação!' : '💀 Eliminado!'}</h3>
      <div class="elim-loser"><span class="el-cap" id="elc"></span><div><b>${d.loser.name}</b><span> foi eliminado${d.youOut ? ' — era VOCÊ 😵' : ''}</span></div></div>
      <div class="elim-alive"><div class="ea-t">Ainda na disputa (${d.survivors.length})</div>
        ${d.survivors.map((s, i) => `<div class="ea-row ${s.you ? 'you' : ''}"><span class="ea-cap" data-s="${s.skin}"></span><span class="ea-nm">${s.name}</span>${i === 0 ? '<span class="ea-lead">🥇 líder</span>' : ''}</div>`).join('')}</div>
      <div class="mactions"><button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${d.last ? '🏆 Ver campeão' : 'Próxima corrida ▶'}</button></div>`;
    (box.querySelector('#elc') as HTMLElement).appendChild(drawCap(skinById(d.loser.skin).art, 52));
    box.querySelectorAll('.ea-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 36)));
    modal.classList.remove('hidden');
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
    box.querySelector('#nx')!.addEventListener('click', () => this.onNext?.());
  }

  // resultado da BATALHA: quem sobrou na mesa + ordem de queda
  showBattleResult(d: { winner: { name: string; skin: string; you: boolean } | undefined; order: { name: string; skin: string; place: number; you: boolean }[] }): void {
    const { modal, box } = this.modalBox(); box.className = 'modal win';
    box.innerHTML = `<h3>${d.winner?.you ? '🥊 Você dominou a mesa! 🎉' : '🥊 Fim da batalha!'}</h3>
      ${d.winner ? `<div class="elim-loser"><span class="el-cap" id="bwc"></span><div><b>${d.winner.name}</b><span> é quem ficou na mesa! 👑</span></div></div>` : ''}
      <div class="elim-alive"><div class="ea-t">Ordem da batalha</div>
        ${d.order.map(o => `<div class="ea-row ${o.you ? 'you' : ''}"><span class="ea-pos">${o.place === 1 ? '👑' : o.place + 'º'}</span><span class="ea-cap" data-s="${o.skin}"></span><span class="ea-nm">${o.name}</span>${o.place > 1 ? '<span class="ea-lead">💀 caiu</span>' : ''}</div>`).join('')}</div>
      <div class="mactions"><button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">↻ Revanche</button></div>`;
    if (d.winner) (box.querySelector('#bwc') as HTMLElement).appendChild(drawCap(skinById(d.winner.skin).art, 52));
    box.querySelectorAll('.ea-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 36)));
    modal.classList.remove('hidden');
    if (d.winner?.you) this.confetti(box);
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
    box.querySelector('#nx')!.addEventListener('click', () => this.onNext?.());
  }

  // cerimônia do campeão — pódio final com troféu e classificação completa
  showChampion(d: { rows: { name: string; skin: string; pts: number; you: boolean }[]; fmt: string; youWon: boolean; name: string; skin: string }): void {
    const modal = this.hud!.querySelector('#modal') as HTMLElement; const box = this.hud!.querySelector('#mbox') as HTMLElement;
    box.className = 'modal win champ-final';
    const fmtName = d.fmt === 'elim' ? 'Eliminação' : (CHAMP_FMT[d.fmt as ChampFmt]?.name || 'Campeonato');
    box.innerHTML = `
      <div class="cf-crown">👑</div>
      <h3 style="color:#c98a00">${d.youWon ? 'VOCÊ é o campeão! 🎉' : 'Campeão do ' + fmtName}</h3>
      <div class="cf-face" id="cff"></div>
      <div class="cf-name">${d.name} 🏆</div>
      <div class="champ-stand final">${d.rows.map((r, i) => `<div class="cs-row ${r.you ? 'you' : ''} ${i === 0 ? 'lead' : ''}"><span class="cs-pos">${['🥇', '🥈', '🥉'][i] || (i + 1) + 'º'}</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts} pts</b></div>`).join('')}</div>
      <div class="mactions"><button class="play-btn" id="mn">Menu ▶</button></div>`;
    const cv = drawCap(skinById(d.skin).art, 150); cv.style.width = '110px'; cv.style.height = '110px'; cv.style.display = 'block'; cv.style.margin = '0 auto';
    (box.querySelector('#cff') as HTMLElement).appendChild(cv);
    box.querySelectorAll('.cs-cap').forEach(el => el.appendChild(drawCap(skinById((el as HTMLElement).dataset.s!).art, 40)));
    modal.classList.remove('hidden');
    this.confetti(box);
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
  }
}

// escolhe N tampinhas da MESMA raridade que a do jogador, diferentes entre si e
// da dele — assim o campo fica sempre no mesmo nível (comum×comum, mítica×mítica…)
export function opponentSkins(playerId: string, n: number): string[] {
  const rar = skinById(playerId).rarity;
  const pool = SKINS.filter(s => s.rarity === rar && s.id !== playerId && !s.hidden && s.prize == null).map(s => s.id);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const out: string[] = [];
  for (let i = 0; i < Math.max(0, n); i++) out.push(pool.length ? pool[i % pool.length] : playerId);
  return out;
}
// nota 1..99 a partir do atributo (~0.80..1.25) — pra COMPARAR tampinhas de relance
export function statVal(v: number): number { return Math.max(1, Math.min(99, Math.round((v - 0.80) / 0.45 * 99))); }
function statTier(n: number): string { return n >= 74 ? 'hi' : n >= 50 ? 'mid' : 'lo'; }
function bar(label: string, v: number, up = false): string {
  const n = statVal(v); const pct = Math.max(8, Math.min(100, Math.round((v - 0.8) / 0.4 * 100)));
  return `<div class="sbar ${statTier(n)}"><span class="sbl">${label}</span><span class="strack"><i style="width:${pct}%"></i></span><b class="sval">${n}${up ? '<i class="sup">▲</i>' : ''}</b></div>`;
}
const STAT_DEFS: [string, keyof CapStats][] = [['Desliza', 'slide'], ['Peso', 'weight'], ['Controle', 'control'], ['Quique', 'bounce'], ['Estabil.', 'stability'], ['Potência', 'power'], ['Aderência', 'grip']];
// barras dos atributos (4 nas fichas pequenas, 5 no painel detalhado);
// `base` = stats originais da skin, pra marcar com ▲ o que a Oficina melhorou
function capBars(st: CapStats, all = false, base?: CapStats): string {
  const defs = all ? STAT_DEFS : STAT_DEFS.slice(0, 4);
  return `<div class="skin-bars">${defs.map(([l, k]) => bar(l, st[k], !!base && st[k] > ((base as any)[k] ?? 1) + 1e-6)).join('')}</div>`;
}

// régua das corridas de uma competição: feitas (com SUA medalha), próxima e restantes
function raceStrip(done: number, total: number, hist?: number[]): string {
  const med = (p?: number) => p === 1 ? '🥇' : p === 2 ? '🥈' : p === 3 ? '🥉' : p ? p + 'º' : '·';
  let cells = '';
  for (let i = 0; i < total; i++) {
    const isDone = i < done, isNext = i === done;
    cells += `<div class="rs-cell ${isDone ? 'done' : isNext ? 'next' : ''}">
      <span class="rs-flag">${isDone ? '🏁' : isNext ? '▶️' : '🔒'}</span>
      <span class="rs-med">${isDone ? med(hist?.[i]) : isNext ? 'AGORA' : ''}</span>
      <span class="rs-lab">${i + 1}ª</span>
    </div>`;
    if (i < total - 1) cells += `<i class="rs-link ${i < done - 1 || (i === done - 1 && done > 0) ? 'on' : ''}"></i>`;
  }
  const remain = total - done;
  const note = remain === 0 ? '🏆 Competição completa!'
    : remain === 1 ? '🔥 Falta só a ÚLTIMA corrida!'
    : `Faltam <b>${remain}</b> corridas`;
  return `<div class="rstrip">${cells}</div><div class="rs-note">${note}</div>`;
}

function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
