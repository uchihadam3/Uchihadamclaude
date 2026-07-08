// UI em DOM sobre o canvas: menu, configuração de partida, HUD da corrida,
// resultados, personalização de tampinhas e ajustes. Grande, mas simples.
import { track, LEVELS, LEVEL_COLORS, TRACKS_PER_LEVEL } from './game/generator';
import { SKINS, skinById, CAP_COLORS, unlockedSkins } from './game/skins';
import { drawCap, RARITY_COLOR, RARITY_LABEL, RARITY_ORDER } from './render/capart';
import { AI_KINDS, AI_LABEL, AIKind } from './game/ai';
import { PlayerDef, GameManager } from './game/manager';
import { CapStats } from './engine/core';
import { Online } from './net/online';
import { save } from './game/save';
import { settings } from './audio';

export type Mode = 'quick' | 'ai' | 'local' | 'champ' | 'daily' | 'online';
export type Pick = 'specific' | 'randlevel' | 'randany';
export interface MatchConfig { level: number; trackIdx: number; pick: Pick; players: PlayerDef[]; mode: Mode; }

export interface UICallbacks {
  start: (cfg: MatchConfig) => void;
  setVols: (music: number, sfx: number, muted: boolean) => void;
  setSkin: (id: string) => void;
  onFlickBtn?: () => void;
}

const AI_NAMES = ['Bolha', 'Zé', 'Nina', 'Tato', 'Duda', 'Chico', 'Lila'];

export class UI {
  root = document.getElementById('ui')!;
  private cb: UICallbacks;
  online: Online;
  // estado de configuração
  cfgLevel = 0; cfgTrack = 0; cfgPick: Pick = 'specific'; cfgMode: Mode = 'quick';
  cfgPlayers: { human: boolean; ai: AIKind; color: number; name: string }[] = [];
  myName = 'Você';
  private toastEl: HTMLElement | null = null; private toastT = 0;

  constructor(cb: UICallbacks, online: Online) { this.cb = cb; this.online = online; this.resetPlayers('quick'); }

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
          <button class="mode-btn" data-m="champ" style="--a:var(--gold)"><span class="mi">🏆</span><b>Campeonato</b><span class="ms">5 pistas, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily" style="--a:var(--pur)"><span class="mi">📅</span><b>Desafio Diário</b><span class="ms">a pista do dia</span></button>
          <button class="mode-btn" data-m="skins" style="--a:var(--orange)"><span class="mi">🎨</span><b>Tampinhas</b><span class="ms">coleção ${unl}/${SKINS.length}</span></button>
          <button class="mode-btn" data-m="help" style="--a:#00b4d8"><span class="mi">📖</span><b>Como Jogar</b><span class="ms">obstáculos &amp; atributos</span></button>
        </div>
      </div>`);
    s.prepend(this.bgFx(9));
    (s.querySelector('#capico') as HTMLElement).appendChild(drawCap(skinById('coca').art, 120));
    this.root.appendChild(s);
    s.querySelectorAll('.mode-btn').forEach(b => b.addEventListener('click', () => {
      const m = (b as HTMLElement).dataset.m!;
      if (m === 'skins') this.showSkins();
      else if (m === 'help') this.showHelp();
      else if (m === 'mp') this.showMultiplayer();
      else this.showSetup(m as Mode);
    }));
    s.querySelector('#cfgBtn')!.addEventListener('click', () => this.showSettings());
  }

  private resetPlayers(mode: Mode): void {
    const yourColor = CAP_COLORS[0];
    this.cfgPlayers = [{ human: true, ai: 'cauteloso', color: 0, name: 'Você' }];
    let opponents = 3;
    if (mode === 'daily') opponents = 0;
    if (mode === 'local') opponents = 1;
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
    const isChamp = this.cfgMode === 'champ';
    const isRandom = this.cfgPick !== 'specific';
    const t = track(this.cfgLevel, this.cfgTrack);
    const canPlayers = !isDaily;
    const title = { quick: 'Corrida Rápida', ai: 'Contra a IA', local: 'Multiplayer Local', champ: 'Campeonato', daily: 'Desafio Diário' }[this.cfgMode];

    // seletor de nível (oculto no diário — a pista do dia é fixa)
    const levelRow = isDaily ? '' : `<div class="lvl-row" id="lvls">
      ${LEVELS.map((n, i) => `<button class="lvl-chip ${i === this.cfgLevel ? 'sel' : ''}" data-l="${i}" style="--lc:${LEVEL_COLORS[i]}"><b>${n}</b><span>${this.levelHint(i)}</span></button>`).join('')}
    </div>`;

    // cartão da pista
    let trackBlock = '';
    if (isChamp) {
      trackBlock = `<div class="champ-note">🏆 Campeonato: <b>5 pistas sorteadas</b> do nível <b style="color:${LEVEL_COLORS[this.cfgLevel]}">${LEVELS[this.cfgLevel]}</b>. Some pontos e seja o campeão!</div>`;
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

    // botões de sorteio (não no diário/campeonato)
    const randRow = (isDaily || isChamp) ? '' : `<div class="rand-row">
      <button class="chip ${this.cfgPick === 'specific' ? 'sel' : ''}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick === 'randlevel' ? 'sel' : ''}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick === 'randany' ? 'sel' : ''}" id="prany">🎲 Qualquer</button>
    </div>`;

    const s = this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${title}</h2><div></div></div>
        ${levelRow}
        ${randRow}
        ${trackBlock}
        ${canPlayers ? `<div class="players" id="players"></div>
        <div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>` : `<div class="daily-note">Pista do dia: <b>${t.name}</b> (${LEVELS[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${save.dailyBest(dailyKey()) ?? '—'}</b></div>`}
        <button class="play-btn" id="play">Jogar ▶</button>
      </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(6));
    const mini = s.querySelector('#mini') as HTMLElement | null;
    if (mini) this.drawMini(mini, t);
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());

    // nível
    s.querySelectorAll('.lvl-chip').forEach(b => b.addEventListener('click', () => { this.cfgLevel = +(b as HTMLElement).dataset.l!; this.cfgTrack = 0; this.renderSetup(); }));
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
    this.cfgPlayers.forEach((p, i) => {
      const isYou = i === 0;
      const row = this.el(`<div class="prow ${isYou ? 'you-row' : ''}">
        ${isYou ? '<span class="pcap-mini" id="ycap"></span>' : `<span class="pdot" style="background:${CAP_COLORS[p.color]}"></span>`}
        <input class="pname" value="${p.name}" ${isYou ? 'readonly' : ''}/>
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
    const players: PlayerDef[] = this.cfgMode === 'daily'
      ? [{ name: 'Você', isAI: false, skin: save.skin() }]
      : this.cfgPlayers.map((p, i) => ({ name: p.name, isAI: !p.human, ai: p.ai, skin: i === 0 ? save.skin() : SKINS[Math.floor(Math.random() * SKINS.length)].id }));
    // resolve o sorteio (o modo escolhido é lembrado p/ a "próxima pista")
    let level = this.cfgLevel, idx = this.cfgTrack;
    if (this.cfgPick === 'randlevel') idx = Math.floor(Math.random() * TRACKS_PER_LEVEL);
    else if (this.cfgPick === 'randany') { level = Math.floor(Math.random() * 5); idx = Math.floor(Math.random() * TRACKS_PER_LEVEL); }
    this.cb.start({ level, trackIdx: idx, pick: this.cfgPick, players, mode: this.cfgMode });
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
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas <span class="cap-count">${unlockedSkins(wins).length}/${SKINS.length}</span></h2><div></div></div>
      <div class="skin-scroll" id="scroll"></div>
    </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(5));
    const scroll = s.querySelector('#scroll') as HTMLElement;
    for (const rar of RARITY_ORDER) {
      const group = SKINS.filter(k => k.rarity === rar);
      const got = group.filter(k => wins >= k.unlock).length;
      const sec = this.el(`<div class="rar-sec">
        <div class="rar-head" style="--rc:${RARITY_COLOR[rar]}"><span class="rar-dot"></span>${RARITY_LABEL[rar]} <b>${got}/${group.length}</b></div>
        <div class="skin-grid"></div></div>`);
      scroll.appendChild(sec);
      const grid = sec.querySelector('.skin-grid') as HTMLElement;
      for (const k of group) {
        const locked = wins < k.unlock;
        const card = this.el(`<button class="skin-card ${cur === k.id ? 'sel' : ''} ${locked ? 'locked' : ''}" style="--rc:${RARITY_COLOR[k.rarity]}">
          <div class="skin-face"></div>
          <div class="skin-name">${k.name}</div>
          <div class="skin-desc">${locked ? '🔒 ' + k.unlock + ' vitórias' : k.desc}</div>
          ${capBars(k.stats)}
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
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);
    this.root.appendChild(s);
    s.prepend(this.bgFx(5));
    const apply = () => this.cb.setVols(+(s.querySelector('#mus') as HTMLInputElement).value, +(s.querySelector('#sfx') as HTMLInputElement).value, settings.muted);
    s.querySelector('#mus')!.addEventListener('input', apply);
    s.querySelector('#sfx')!.addEventListener('input', apply);
    s.querySelector('#mute')!.addEventListener('click', () => { settings.muted = !settings.muted; apply(); (s.querySelector('#mute') as HTMLElement).textContent = settings.muted ? '🔇 Ligado' : '🔊 Desligado'; });
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
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
        <div class="pick-face"></div><div class="pick-name">${k.name}</div>${capBars(k.stats)}</button>`);
      const cv = drawCap(k.art, 96); cv.style.width = '100%'; cv.style.height = 'auto'; cv.style.display = 'block';
      (card.querySelector('.pick-face') as HTMLElement).appendChild(cv);
      card.addEventListener('click', () => { onPick(k.id); close(); });
      grid.appendChild(card);
    }
    box.querySelector('.ov-x')!.addEventListener('click', close);
  }

  // painel detalhado de uma tampinha (usado ao clicar num nome durante a corrida)
  showCapStats(name: string, skinId: string): void {
    const k = skinById(skinId);
    const { box, close } = this.overlay(`
      <div class="ov-head"><b>${name}</b><button class="ov-x">✕</button></div>
      <div class="cs-face" id="csf"></div>
      <div class="cs-name" style="color:${RARITY_COLOR[k.rarity]}">${k.name}</div>
      <div class="rar-head cs-rar" style="--rc:${RARITY_COLOR[k.rarity]};justify-content:center"><span class="rar-dot"></span>${RARITY_LABEL[k.rarity]}</div>
      ${capBars(k.stats, true)}
      <div class="cs-desc">${k.desc}</div>`, 'stats');
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
      ['Peso', '⚖️', 'Empurra as rivais com mais força e resiste a ser empurrada. Mas em <b>areia/lama</b> afunda e freia mais.'],
      ['Desliza', '💨', 'Vai <b>mais longe</b> com o mesmo peteléco. Ótima em calçada/giz; cuidado pra não passar do ponto.'],
      ['Controle', '🎯', 'Freia mais certinho no fim — <b>para onde você mira</b>. Boa pra encaixar em espaço apertado.'],
      ['Quique', '🏀', 'Quica mais nas <b>bordas</b> e pedras, e "tabela" mais forte batendo nas outras tampinhas.'],
      ['Estabil.', '🌀', 'Mantém a linha: <b>roda menos</b> e desvia menos do rumo. Estável = previsível.'],
    ];
    const card = (i: string, t: string, d: string) => `<div class="hc"><div class="hc-ico">${i}</div><div class="hc-tx"><div class="hc-t">${t}</div><div class="hc-d">${d}</div></div></div>`;
    const s = this.el(`<div class="screen help">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Como Jogar</h2><div></div></div>
      <div class="help-scroll">
        <div class="help-intro">Arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. São <b>3 petelecos</b> por vez. A corrida acaba quando o <b>penúltimo</b> chega. Dois dedos giram/aproximam a câmera.</div>
        <h3 class="help-h">🧩 Obstáculos</h3>
        <div class="help-grid">${obst.map(o => card(o[0], o[1], o[2])).join('')}</div>
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
    nameEl.addEventListener('change', () => this.myName = (nameEl.value || 'Você').slice(0, 12));
    codeEl.addEventListener('input', () => codeEl.value = codeEl.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5));
    s.querySelector('#back')!.addEventListener('click', () => { this.online.leave(); this.showMultiplayer(); });
    s.querySelector('#create')!.addEventListener('click', () => { this.myName = (nameEl.value || 'Você').slice(0, 12); this.online.createRoom(this.myName, save.skin()); this.showLobby('Criando sala…'); });
    s.querySelector('#join')!.addEventListener('click', () => {
      const c = codeEl.value.trim(); if (c.length < 4) { this.notify('Digite o código da sala', 'bad'); return; }
      this.myName = (nameEl.value || 'Você').slice(0, 12); this.online.joinRoom(c, this.myName, save.skin()); this.showLobby('Entrando na sala…');
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
      const row = this.el(`<div class="prow lob-seat ${mine ? 'you-row' : ''}"><span class="pcap-mini"></span><span class="ls-name">${st.name}</span><span class="ls-tag">${tag}</span></div>`);
      const cv = drawCap(skinById(st.skin).art, 56); cv.style.width = '100%'; cv.style.height = '100%'; cv.style.display = 'block';
      (row.querySelector('.pcap-mini') as HTMLElement).appendChild(cv);
      if (mine) { row.addEventListener('click', () => this.showCapPicker(o.mySkin, (id) => { this.cb.setSkin(id); o.setMyCap(id); })); (row.querySelector('.pcap-mini') as HTMLElement).classList.add('tap'); }
      seatsEl.appendChild(row);
    });
    // controles
    const ctrl = scr.querySelector('#ctrl') as HTMLElement; ctrl.innerHTML = '';
    if (o.isHost) {
      const lvlChips = LEVELS.map((n, i) => `<button class="lvl-chip mini ${i === o.cfg.level ? 'sel' : ''}" data-l="${i}" style="--lc:${LEVEL_COLORS[i]}"><b>${n}</b></button>`).join('');
      const pickRow = `<div class="rand-row"><button class="chip ${o.cfg.pick === 'specific' ? 'sel' : ''}" data-p="specific">🎯 Escolher</button><button class="chip ${o.cfg.pick === 'randlevel' ? 'sel' : ''}" data-p="randlevel">🎲 Do nível</button><button class="chip ${o.cfg.pick === 'randany' ? 'sel' : ''}" data-p="randany">🎲 Qualquer</button></div>`;
      const tnums = o.cfg.pick === 'specific' ? `<div class="tnum-row">${Array.from({ length: TRACKS_PER_LEVEL }, (_, i) => `<button class="tnum ${i === o.cfg.trackIdx ? 'sel' : ''}" data-i="${i}">${i + 1}</button>`).join('')}</div>` : '';
      ctrl.innerHTML = `<div class="lob-h">Dificuldade &amp; fase</div><div class="lvl-row">${lvlChips}</div>${pickRow}${tnums}
        <div class="lob-total"><button class="chip" id="tless">–</button><span><b>${o.total}</b> corredores <small>(${o.seats.filter(x=>x.kind==='human').length} 👤 + ${o.seats.filter(x=>x.kind==='ai').length} 🤖)</small></span><button class="chip" id="tmore">+</button></div>
        <button class="play-btn" id="startm">🏁 Começar Partida</button>`;
      ctrl.querySelectorAll('.lvl-chip').forEach(b => b.addEventListener('click', () => o.setCfg(+(b as HTMLElement).dataset.l!, 0, o.cfg.pick)));
      ctrl.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => o.setCfg(o.cfg.level, o.cfg.trackIdx, (b as HTMLElement).dataset.p as any)));
      ctrl.querySelectorAll('.tnum').forEach(b => b.addEventListener('click', () => o.setCfg(o.cfg.level, +(b as HTMLElement).dataset.i!, o.cfg.pick)));
      ctrl.querySelector('#tless')!.addEventListener('click', () => o.setTotal(o.total - 1));
      ctrl.querySelector('#tmore')!.addEventListener('click', () => o.setTotal(o.total + 1));
      ctrl.querySelector('#startm')!.addEventListener('click', () => { this.lobbyOpen = false; o.startMatch(); });
    } else {
      ctrl.innerHTML = `<div class="lob-wait">⏳ Aguardando o anfitrião escolher a fase e começar…<br><small>Dificuldade: <b>${LEVELS[o.cfg.level]}</b></small></div>`;
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
      <div class="standings" id="stand"></div>
      <div class="flicks" id="flicks"></div>
      <div class="toast-wrap" id="toasts"></div>
      <div class="hint" id="hint"></div>
      <div class="modal-bg hidden" id="modal"><div class="modal" id="mbox"></div></div>
    </div>`);
    this.root.appendChild(this.hud);
    this.hud.querySelector('#pause')!.addEventListener('click', () => this.onPause?.());
  }
  onPause: (() => void) | null = null;
  onResume: (() => void) | null = null;
  onRestart: (() => void) | null = null;
  onNext: (() => void) | null = null;
  onMenu: (() => void) | null = null;

  updateHUD(m: GameManager, humanTurn: boolean): void {
    if (!this.hud) return;
    const c = m.activeCap();
    const turn = this.hud.querySelector('#turn') as HTMLElement;
    turn.innerHTML = `<span class="tdot" style="background:${skinById(c.skin).top};color:${skinById(c.skin).top}"></span> ${c.finished ? 'Corrida!' : 'Vez de <b>' + c.name + '</b>'} <span class="tzoom">🔍</span>`;
    turn.onclick = () => this.showCapStats(c.name, c.skin);
    // flicks
    const fl = this.hud.querySelector('#flicks') as HTMLElement;
    let dots = ''; const total = Math.max(3, c.flicksLeft);
    for (let i = 0; i < c.flicksLeft; i++) dots += '<span class="fd on"></span>';
    fl.innerHTML = (m.phase === 'aim' && humanTurn ? '<span class="fl-lab">Petelecos</span>' : '') + dots + (c.flicksLeft === 1 ? '<span class="flast">último!</span>' : '');
    fl.style.opacity = (c.isAI || m.phase !== 'aim') ? '0.55' : '1';
    // standings (clique num nome → ficha da tampinha)
    const st = this.hud.querySelector('#stand') as HTMLElement;
    st.innerHTML = m.standings().map((p, i) => `<div class="srow ${p.id === c.id ? 'act' : ''}" data-id="${p.id}"><span class="spos">${i + 1}º</span><span class="sdot" style="background:${skinById(p.skin).top}"></span><span class="sname">${p.name}</span>${p.finished ? '<span class="sfin">🏁</span>' : '<span class="szoom">🔍</span>'}</div>`).join('');
    st.querySelectorAll('.srow').forEach(row => row.addEventListener('click', () => { const cap = m.caps[+(row as HTMLElement).dataset.id!]; if (cap) this.showCapStats(cap.name, cap.skin); }));
    // hint
    const hint = this.hud.querySelector('#hint') as HTMLElement;
    hint.style.display = (humanTurn && m.phase === 'aim') ? 'block' : 'none';
    hint.textContent = 'Arraste a tampinha para trás e solte';
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

  showResults(m: GameManager, mode: Mode, champInfo?: { race: number; total: number; last: boolean; pts: string }): void {
    const modal = this.hud!.querySelector('#modal') as HTMLElement; const box = this.hud!.querySelector('#mbox') as HTMLElement;
    const order = m.standings(); const you = (mode === 'online' && this.online.active) ? m.caps[this.online.mySeatIndex()] : m.caps.find(c => !c.isAI);
    const wonYou = you && you.place === 1;
    box.className = 'modal win';
    const head = mode === 'daily'
      ? `<h3>Chegou! 🏁</h3><div class="big">${m.caps[0].place === 1 ? 'Você completou!' : ''}</div>`
      : `<h3>${wonYou ? 'Você venceu! 🎉' : (you ? you.place + 'º lugar' : 'Fim!')}</h3>`;
    const champLine = champInfo ? `<div class="champ-line">Corrida ${champInfo.race}/${champInfo.total} · ${champInfo.pts}</div>` : '';
    const actions = mode === 'online'
      ? (this.online.isHost
        ? `<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="lob">🔁 Nova partida</button>`
        : `<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>`)
      : `<button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">${champInfo && !champInfo.last ? 'Próxima ▶' : 'Nova pista ▶'}</button>`;
    box.innerHTML = `${head}${champLine}<div class="podium" id="pod"></div><div class="mactions">${actions}</div>`;
    const pod = box.querySelector('#pod') as HTMLElement;
    order.slice(0, Math.min(4, order.length)).forEach((p, i) => {
      const row = this.el(`<div class="prow2 ${i === 0 ? 'p1' : ''}"><span class="pl">${['🥇', '🥈', '🥉', '4º'][i]}</span><span class="pcap"></span><span class="pn">${p.name}</span></div>`);
      (row.querySelector('.pcap') as HTMLElement).appendChild(drawCap(skinById(p.skin).art, 64));
      row.addEventListener('click', () => this.showCapStats(p.name, p.skin));
      pod.appendChild(row);
    });
    modal.classList.remove('hidden');
    if (wonYou || (mode === 'daily' && m.caps[0].place === 1)) this.confetti(box);
    box.querySelector('#mn')!.addEventListener('click', () => { if (mode === 'online') this.online.leave(); this.onMenu?.(); });
    box.querySelector('#re')?.addEventListener('click', () => this.onRestart?.());
    box.querySelector('#nx')?.addEventListener('click', () => this.onNext?.());
    box.querySelector('#lob')?.addEventListener('click', () => { this.hideModal(); this.online.backToLobby(); });
  }
}

// nota 1..99 a partir do atributo (~0.80..1.25) — pra COMPARAR tampinhas de relance
export function statVal(v: number): number { return Math.max(1, Math.min(99, Math.round((v - 0.80) / 0.45 * 99))); }
function statTier(n: number): string { return n >= 74 ? 'hi' : n >= 50 ? 'mid' : 'lo'; }
function bar(label: string, v: number): string {
  const n = statVal(v); const pct = Math.max(8, Math.min(100, Math.round((v - 0.8) / 0.4 * 100)));
  return `<div class="sbar ${statTier(n)}"><span class="sbl">${label}</span><span class="strack"><i style="width:${pct}%"></i></span><b class="sval">${n}</b></div>`;
}
const STAT_DEFS: [string, keyof CapStats][] = [['Desliza', 'slide'], ['Peso', 'weight'], ['Controle', 'control'], ['Quique', 'bounce'], ['Estabil.', 'stability']];
// barras dos atributos (4 nas fichas pequenas, 5 no painel detalhado)
function capBars(st: CapStats, all = false): string {
  const defs = all ? STAT_DEFS : STAT_DEFS.slice(0, 4);
  return `<div class="skin-bars">${defs.map(([l, k]) => bar(l, st[k])).join('')}</div>`;
}
function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
