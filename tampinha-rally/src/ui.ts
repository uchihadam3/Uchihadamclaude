// UI em DOM sobre o canvas: menu, configuração de partida, HUD da corrida,
// resultados, personalização de tampinhas e ajustes. Grande, mas simples.
import { track, LEVELS, LEVEL_COLORS, TRACKS_PER_LEVEL, buildCustomTrack } from './game/generator';
import { SKINS, skinById, CAP_COLORS, unlockedSkins } from './game/skins';
import { drawCap, RARITY_COLOR, RARITY_LABEL, RARITY_ORDER } from './render/capart';
import { AI_KINDS, AI_LABEL, AIKind } from './game/ai';
import { PlayerDef, GameManager } from './game/manager';
import { ITEMS } from './game/chaos';
import { CapStats } from './engine/core';
import { Online } from './net/online';
import { save } from './game/save';
import { settings } from './audio';

export type Mode = 'quick' | 'ai' | 'local' | 'champ' | 'daily' | 'online' | 'caos' | 'elim' | 'trial' | 'dupla';
export type Pick = 'specific' | 'randlevel' | 'randany';
export type ChampFmt = 'copa' | 'gp' | 'sprint' | 'maratona';
export interface MatchConfig { level: number; trackIdx: number; pick: Pick; players: PlayerDef[]; mode: Mode; champFmt?: ChampFmt; teamSize?: number; customTrack?: any; }
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
  edTool = 'draw'; edTheme = 0; edHalf = 4.2; edName = 'Minha Pista';
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
          <button class="mode-btn hot" data-m="modes" style="--a:#ff4fa3"><span class="mi">🎡</span><b>Modos de Jogo</b><span class="ms">Caos, Eliminação, Dupla…</span></button>
          <button class="mode-btn" data-m="champ" style="--a:var(--gold)"><span class="mi">🏆</span><b>Campeonato</b><span class="ms">4 formatos, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily" style="--a:var(--pur)"><span class="mi">📅</span><b>Desafio Diário</b><span class="ms">a pista do dia</span></button>
          <button class="mode-btn" data-m="editor" style="--a:#00c2a8"><span class="mi">✏️</span><b>Editor de Pista</b><span class="ms">crie e jogue a sua</span></button>
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
      else if (m === 'modes') this.showModes();
      else if (m === 'editor') this.showEditor();
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

  // -------------------------------------------------------- EDITOR DE PISTA
  private edW = 92; private edH = 62;   // tamanho do "mundo" do editor
  showEditor(): void {
    this.clear();
    const themes = ['Quintal', 'Praia', 'Calçada', 'Garagem', 'Parque', 'Cozinha', 'Jardim', 'Deserto'];
    const tools: [string, string, string][] = [
      ['draw', '✏️', 'Traçar'], ['hole', '⚫', 'Buraco'], ['bomb', '💣', 'Bomba'], ['stone', '🪨', 'Pedra'],
      ['ramp', '🛫', 'Rampa'], ['bonus1', '💎', '+1'], ['bonus3', '🏆', '+3'], ['erase', '🧽', 'Apagar'],
    ];
    const s = this.el(`<div class="screen editor">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>✏️ Editor de Pista</h2><div></div></div>
      <div class="ed-help">Desenhe o <b>traçado</b> arrastando o dedo. Depois escolha uma ferramenta e toque pra colocar obstáculos. 🏁</div>
      <div class="ed-tools" id="tools">${tools.map(t => `<button class="ed-tool ${t[0] === this.edTool ? 'sel' : ''}" data-t="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join('')}</div>
      <div class="ed-canvas-wrap"><canvas id="edcv" class="ed-canvas"></canvas></div>
      <div class="ed-opts">
        <label>Tema</label>
        <select id="edtheme">${themes.map((t, i) => `<option value="${i}" ${i === this.edTheme ? 'selected' : ''}>${t}</option>`).join('')}</select>
        <label>Largura</label>
        <input type="range" id="edhalf" min="3.4" max="6" step="0.2" value="${this.edHalf}">
        <input class="ed-name" id="edname" maxlength="18" value="${this.edName}">
      </div>
      <div class="ed-actions">
        <button class="chip" id="edclear">🗑️ Limpar</button>
        <button class="chip" id="edsave">💾 Salvar</button>
        <button class="chip" id="edload">📂 Minhas</button>
        <button class="play-btn" id="edplay">🏁 Jogar</button>
      </div>
    </div>`);
    this.root.appendChild(s);
    const cv = s.querySelector('#edcv') as HTMLCanvasElement;
    const redraw = () => this.drawEditor(cv);
    const sync = () => { const r = cv.getBoundingClientRect(); cv.width = Math.round(r.width); cv.height = Math.round(r.width * this.edH / this.edW); redraw(); };
    setTimeout(sync, 30); addEventListener('resize', sync);
    // mapeia ponto do canvas → mundo do editor
    const toWorld = (ev: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * this.edW, y: (ev.clientY - r.top) / r.height * this.edH }; };
    let drawing = false;
    cv.addEventListener('pointerdown', (ev) => {
      ev.preventDefault(); (cv as any).setPointerCapture?.(ev.pointerId); const p = toWorld(ev);
      if (this.edTool === 'draw') { drawing = true; this.edPts.push(p); }
      else if (this.edTool === 'erase') { this.edEraseAt(p); }
      else this.edPlaceObs(p);
      redraw();
    });
    cv.addEventListener('pointermove', (ev) => {
      if (!drawing) return; const p = toWorld(ev); const last = this.edPts[this.edPts.length - 1];
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 2) { this.edPts.push(p); redraw(); }
    });
    const end = () => { drawing = false; };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end); cv.addEventListener('pointerleave', end);

    s.querySelectorAll('.ed-tool').forEach(b => b.addEventListener('click', () => { this.edTool = (b as HTMLElement).dataset.t!; s.querySelectorAll('.ed-tool').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); }));
    (s.querySelector('#edtheme') as HTMLSelectElement).addEventListener('change', e => { this.edTheme = +(e.target as HTMLSelectElement).value; redraw(); });
    (s.querySelector('#edhalf') as HTMLInputElement).addEventListener('input', e => { this.edHalf = +(e.target as HTMLInputElement).value; redraw(); });
    (s.querySelector('#edname') as HTMLInputElement).addEventListener('change', e => this.edName = (e.target as HTMLInputElement).value || 'Minha Pista');
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
    s.querySelector('#edclear')!.addEventListener('click', () => { this.edPts = []; this.edObs = []; redraw(); });
    s.querySelector('#edsave')!.addEventListener('click', () => {
      if (this.edPts.length < 3) { this.notify('Trace a pista primeiro!', 'bad'); return; }
      save.saveTrack({ id: 'ct' + Date.now(), name: this.edName, theme: this.edTheme, half: this.edHalf, pts: this.edPts, obstacles: this.edObs });
      this.notify('Pista salva! 💾', 'good');
    });
    s.querySelector('#edload')!.addEventListener('click', () => this.showMyTracks());
    s.querySelector('#edplay')!.addEventListener('click', () => this.playCustom());
  }
  private drawEditor(cv: HTMLCanvasElement): void {
    const c = cv.getContext('2d')!; const W = cv.width, H = cv.height;
    const X = (x: number) => x / this.edW * W, Y = (y: number) => y / this.edH * H;
    c.clearRect(0, 0, W, H); c.fillStyle = '#1a2a24'; c.fillRect(0, 0, W, H);
    // grade
    c.strokeStyle = 'rgba(255,255,255,0.05)'; c.lineWidth = 1;
    for (let gx = 0; gx <= this.edW; gx += 8) { c.beginPath(); c.moveTo(X(gx), 0); c.lineTo(X(gx), H); c.stroke(); }
    for (let gy = 0; gy <= this.edH; gy += 8) { c.beginPath(); c.moveTo(0, Y(gy)); c.lineTo(W, Y(gy)); c.stroke(); }
    // corredor
    if (this.edPts.length > 1) {
      c.strokeStyle = 'rgba(180,220,255,0.22)'; c.lineWidth = Math.max(6, X(this.edHalf * 2)); c.lineCap = 'round'; c.lineJoin = 'round';
      c.beginPath(); this.edPts.forEach((p, i) => { i ? c.lineTo(X(p.x), Y(p.y)) : c.moveTo(X(p.x), Y(p.y)); }); c.stroke();
      c.strokeStyle = '#8fd0ff'; c.lineWidth = 2; c.setLineDash([5, 5]);
      c.beginPath(); this.edPts.forEach((p, i) => { i ? c.lineTo(X(p.x), Y(p.y)) : c.moveTo(X(p.x), Y(p.y)); }); c.stroke(); c.setLineDash([]);
    }
    // obstáculos
    for (const o of this.edObs) {
      c.fillStyle = o.type === 'hole' ? '#100a04' : o.type === 'bomb' ? '#e5484d' : o.type === 'stone' ? '#9a948a' : o.type === 'ramp' ? '#3fae6a' : (o.n && o.n >= 3 ? '#e0a020' : '#2ea44f');
      c.beginPath(); c.arc(X(o.x), Y(o.y), 6, 0, 7); c.fill();
    }
    // largada / chegada
    if (this.edPts.length) { const a = this.edPts[0]; c.fillStyle = '#3fae6a'; c.beginPath(); c.arc(X(a.x), Y(a.y), 8, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = '700 11px sans-serif'; c.textAlign = 'center'; c.fillText('🏁', X(a.x), Y(a.y) + 4); }
    if (this.edPts.length > 1) { const b = this.edPts[this.edPts.length - 1]; c.fillStyle = '#e5484d'; c.beginPath(); c.arc(X(b.x), Y(b.y), 8, 0, 7); c.fill(); }
  }
  private edPlaceObs(p: { x: number; y: number }): void {
    const map: Record<string, { type: string; n?: number }> = { hole: { type: 'hole' }, bomb: { type: 'bomb' }, stone: { type: 'stone' }, ramp: { type: 'ramp' }, bonus1: { type: 'bonus', n: 1 }, bonus3: { type: 'bonus', n: 3 } };
    const m = map[this.edTool]; if (!m) return; this.edObs.push({ type: m.type, x: p.x, y: p.y, n: m.n });
  }
  private edEraseAt(p: { x: number; y: number }): void {
    let bi = -1, bd = 16; this.edObs.forEach((o, i) => { const d = (o.x - p.x) ** 2 + (o.y - p.y) ** 2; if (d < bd) { bd = d; bi = i; } });
    if (bi >= 0) this.edObs.splice(bi, 1);
  }
  private playCustom(): void {
    if (this.edPts.length < 3) { this.notify('Trace a pista primeiro! ✏️', 'bad'); return; }
    const def = buildCustomTrack({ id: 'play', name: this.edName, theme: this.edTheme, half: this.edHalf, pts: this.edPts, obstacles: this.edObs });
    const opp = opponentSkins(save.skin(), 3);
    const players: PlayerDef[] = [{ name: 'Você', isAI: false, skin: save.skin() }, ...opp.map((sk, i) => ({ name: AI_NAMES[i % AI_NAMES.length], isAI: true, ai: AI_KINDS[i % AI_KINDS.length], skin: sk }))];
    this.cb.start({ level: 2, trackIdx: 0, pick: 'specific', players, mode: 'quick', customTrack: def });
  }
  showMyTracks(): void {
    const tracks = save.customTracks();
    const { box, close } = this.overlay(`<div class="ov-head"><b>📂 Minhas Pistas</b><button class="ov-x">✕</button></div>
      <div class="my-tracks" id="mt">${tracks.length ? '' : '<div class="mt-empty">Nenhuma pista salva ainda. Crie a sua! ✏️</div>'}</div>`, 'wide');
    const host = box.querySelector('#mt') as HTMLElement;
    tracks.forEach((t: any) => {
      const row = this.el(`<div class="mt-row"><span class="mt-nm">🏁 ${t.name}</span><span class="mt-acts"><button class="chip mini" data-a="load">Abrir</button><button class="chip mini" data-a="play">Jogar</button><button class="chip mini danger" data-a="del">🗑️</button></span></div>`);
      row.querySelector('[data-a="load"]')!.addEventListener('click', () => { this.edPts = t.pts.slice(); this.edObs = t.obstacles.slice(); this.edTheme = t.theme; this.edHalf = t.half; this.edName = t.name; close(); this.showEditor(); });
      row.querySelector('[data-a="play"]')!.addEventListener('click', () => {
        const def = buildCustomTrack(t); const opp = opponentSkins(save.skin(), 3);
        const players: PlayerDef[] = [{ name: 'Você', isAI: false, skin: save.skin() }, ...opp.map((sk, i) => ({ name: AI_NAMES[i % AI_NAMES.length], isAI: true, ai: AI_KINDS[i % AI_KINDS.length], skin: sk }))];
        close(); this.cb.start({ level: 2, trackIdx: 0, pick: 'specific', players, mode: 'quick', customTrack: def });
      });
      row.querySelector('[data-a="del"]')!.addEventListener('click', () => { save.deleteTrack(t.id); row.remove(); });
      host.appendChild(row);
    });
    box.querySelector('.ov-x')!.addEventListener('click', close);
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
    const isChamp = this.cfgMode === 'champ';
    const isRandom = this.cfgPick !== 'specific';
    const t = track(this.cfgLevel, this.cfgTrack);
    const canPlayers = !isDaily && !isTrial;
    const title = ({ quick: 'Corrida Rápida', ai: 'Contra a IA', local: 'Multiplayer Local', champ: 'Campeonato', daily: 'Desafio Diário', caos: '🌀 Modo Caos', elim: '💀 Eliminação', trial: '⏱️ Contra-Relógio', dupla: '🤝 Corrida de Dupla' } as Record<string, string>)[this.cfgMode];
    const modeBanner = isCaos ? '<div class="mode-banner caos">🌀 <b>Modo Caos:</b> caixas <b>?</b> na pista dão power-ups. Quem está mais atrás pega os melhores (raio, foguete, salto). Toque no item pra usar!</div>'
      : isElim ? '<div class="mode-banner elim">💀 <b>Eliminação:</b> a cada corrida numa pista nova, o <b>último colocado sai</b>. Sobrevive até ser o único!</div>'
      : isTrial ? '<div class="mode-banner trial">⏱️ <b>Contra-Relógio:</b> você sozinho. Leve a tampinha à chegada com o <b>menor número de petelecos</b> possível.</div>'
      : isDupla ? '<div class="mode-banner dupla">🤝 <b>Dupla:</b> dois times. Vence o time com a <b>menor soma de colocações</b>. Ajude o parceiro… ou atrapalhe o rival!</div>'
      : '';

    // seletor de nível (oculto no diário — a pista do dia é fixa)
    const levelRow = isDaily ? '' : `<div class="lvl-row" id="lvls">
      ${LEVELS.map((n, i) => `<button class="lvl-chip ${i === this.cfgLevel ? 'sel' : ''}" data-l="${i}" style="--lc:${LEVEL_COLORS[i]}"><b>${n}</b><span>${this.levelHint(i)}</span></button>`).join('')}
    </div>`;

    // cartão da pista
    let trackBlock = '';
    if (isChamp) {
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

    // botões de sorteio (não no diário/campeonato)
    const randRow = (isDaily || isChamp) ? '' : `<div class="rand-row">
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
        <div class="pick-face"></div><div class="pick-name">${k.name}</div>${capBars(k.stats, true)}</button>`);
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
      const teamB = (o.cfg.roomMode === 'dupla' && st.team != null) ? `<span class="team-badge t${st.team}">${st.team === 0 ? 'A' : 'B'}</span>` : '';
      const row = this.el(`<div class="prow lob-seat ${mine ? 'you-row' : ''} ${o.cfg.roomMode === 'dupla' && st.team != null ? 'team-t' + st.team : ''}"><span class="pcap-mini"></span><span class="ls-name">${st.name}</span>${teamB}<span class="ls-tag">${tag}</span></div>`);
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
      <div class="standings" id="stand"></div>
      <div class="item-slot hidden" id="item"></div>
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
  onUseItem: (() => void) | null = null;

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
    // CAOS: slot de item do jogador da vez (toque pra usar)
    const itemEl = this.hud.querySelector('#item') as HTMLElement;
    if (m.chaos && humanTurn && c.item && m.phase === 'aim') {
      const it = ITEMS[c.item];
      itemEl.classList.remove('hidden');
      itemEl.innerHTML = `<button class="item-btn"><span class="it-ico">${it.ico}</span><span class="it-tx"><b>${it.name}</b><small>${it.desc}</small></span><span class="it-use">USAR</span></button>`;
      (itemEl.querySelector('.item-btn') as HTMLElement).onclick = () => this.onUseItem?.();
    } else { itemEl.classList.add('hidden'); itemEl.innerHTML = ''; }
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

  showResults(m: GameManager, mode: Mode, champInfo?: { race: number; total: number; last: boolean; rows: { name: string; skin: string; pts: number; you: boolean }[]; fmt: string }, teamInfo?: { teams: { label: string; score: number; members: { name: string; skin: string; place: number; you: boolean }[]; win: boolean; you: boolean }[]; won: boolean }): void {
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
    const champStand = champInfo ? `<div class="champ-stand"><div class="cs-title">🏆 Classificação do campeonato</div>${champInfo.rows.map((r, i) => `<div class="cs-row ${r.you ? 'you' : ''} ${i === 0 ? 'lead' : ''}"><span class="cs-pos">${i + 1}º</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts}</b></div>`).join('')}</div>` : '';
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
  const pool = SKINS.filter(s => s.rarity === rar && s.id !== playerId).map(s => s.id);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const out: string[] = [];
  for (let i = 0; i < Math.max(0, n); i++) out.push(pool.length ? pool[i % pool.length] : playerId);
  return out;
}
// nota 1..99 a partir do atributo (~0.80..1.25) — pra COMPARAR tampinhas de relance
export function statVal(v: number): number { return Math.max(1, Math.min(99, Math.round((v - 0.80) / 0.45 * 99))); }
function statTier(n: number): string { return n >= 74 ? 'hi' : n >= 50 ? 'mid' : 'lo'; }
function bar(label: string, v: number): string {
  const n = statVal(v); const pct = Math.max(8, Math.min(100, Math.round((v - 0.8) / 0.4 * 100)));
  return `<div class="sbar ${statTier(n)}"><span class="sbl">${label}</span><span class="strack"><i style="width:${pct}%"></i></span><b class="sval">${n}</b></div>`;
}
const STAT_DEFS: [string, keyof CapStats][] = [['Desliza', 'slide'], ['Peso', 'weight'], ['Controle', 'control'], ['Quique', 'bounce'], ['Estabil.', 'stability'], ['Potência', 'power'], ['Aderência', 'grip']];
// barras dos atributos (4 nas fichas pequenas, 5 no painel detalhado)
function capBars(st: CapStats, all = false): string {
  const defs = all ? STAT_DEFS : STAT_DEFS.slice(0, 4);
  return `<div class="skin-bars">${defs.map(([l, k]) => bar(l, st[k])).join('')}</div>`;
}
function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
