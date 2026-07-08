// UI em DOM sobre o canvas: menu, configuração de partida, HUD da corrida,
// resultados, personalização de tampinhas e ajustes. Grande, mas simples.
import { track, LEVELS, LEVEL_COLORS, TRACKS_PER_LEVEL } from './game/generator';
import { SKINS, skinById, CAP_COLORS, unlockedSkins } from './game/skins';
import { drawCap, RARITY_COLOR, RARITY_LABEL, RARITY_ORDER } from './render/capart';
import { AI_KINDS, AI_LABEL, AIKind } from './game/ai';
import { PlayerDef, GameManager } from './game/manager';
import { save } from './game/save';
import { settings } from './audio';

export type Mode = 'quick' | 'ai' | 'local' | 'champ' | 'daily';
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
  // estado de configuração
  cfgLevel = 0; cfgTrack = 0; cfgPick: Pick = 'specific'; cfgMode: Mode = 'quick';
  cfgPlayers: { human: boolean; ai: AIKind; color: number; name: string }[] = [];
  private toastEl: HTMLElement | null = null; private toastT = 0;

  constructor(cb: UICallbacks) { this.cb = cb; this.resetPlayers('quick'); }

  private el(html: string): HTMLElement { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild as HTMLElement; }
  private clear(): void { this.root.querySelectorAll('.screen').forEach(s => s.remove()); }

  // ------------------------------------------------------------------ MENU
  showMenu(): void {
    this.clear();
    const wins = save.wins();
    const s = this.el(`
      <div class="screen menu">
        <div class="logo"><span class="cap-ico"></span><h1>Tampinha <em>Rally</em></h1><div class="tag">corrida de tampinhas · peteléco &amp; caos</div></div>
        <div class="mode-grid">
          <button class="mode-btn" data-m="quick"><b>Corrida Rápida</b><span>você + IA, é só jogar</span></button>
          <button class="mode-btn" data-m="ai"><b>Contra a IA</b><span>escolha rivais e nível</span></button>
          <button class="mode-btn" data-m="local"><b>Multiplayer Local</b><span>2–6 no mesmo aparelho</span></button>
          <button class="mode-btn" data-m="champ"><b>Campeonato</b><span>várias pistas, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily"><b>Desafio Diário</b><span>pista do dia, menos petelecos</span></button>
          <button class="mode-btn ghost" data-m="skins"><b>Tampinhas</b><span>desbloqueadas: ${SKINS.filter(k => wins >= k.unlock).length}/${SKINS.length}</span></button>
        </div>
        <div class="menu-foot"><button class="txt-btn" id="cfgBtn">⚙ Ajustes</button><span>Vitórias: <b>${wins}</b></span></div>
      </div>`);
    this.root.appendChild(s);
    s.querySelectorAll('.mode-btn').forEach(b => b.addEventListener('click', () => {
      const m = (b as HTMLElement).dataset.m!;
      if (m === 'skins') this.showSkins(); else this.showSetup(m as Mode);
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
      const row = this.el(`<div class="prow">
        <span class="pdot" style="background:${CAP_COLORS[p.color]}"></span>
        <input class="pname" value="${p.name}" ${i === 0 ? 'readonly' : ''}/>
        ${i === 0 ? '<span class="ptag you">você</span>' : `<button class="ptype">${p.human ? '👤 Humano' : '🤖 ' + AI_LABEL[p.ai]}</button>`}
      </div>`);
      host.appendChild(row);
      const nameInput = row.querySelector('.pname') as HTMLInputElement;
      nameInput.addEventListener('change', () => p.name = nameInput.value || p.name);
      const dot = row.querySelector('.pdot') as HTMLElement;
      dot.addEventListener('click', () => { p.color = (p.color + 1) % CAP_COLORS.length; dot.style.background = CAP_COLORS[p.color]; });
      const tbtn = row.querySelector('.ptype') as HTMLElement | null;
      if (tbtn) tbtn.addEventListener('click', () => {
        if (this.cfgMode === 'local') { p.human = !p.human; if (!p.human) p.ai = AI_KINDS[i % AI_KINDS.length]; }
        else { const idx = AI_KINDS.indexOf(p.ai); p.ai = AI_KINDS[(idx + 1) % AI_KINDS.length]; p.human = false; }
        this.renderPlayers(host);
      });
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
          <div class="skin-bars">${bar('Desliza', k.stats.slide)}${bar('Peso', k.stats.weight)}${bar('Controle', k.stats.control)}${bar('Quique', k.stats.bounce)}</div>
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
    const apply = () => this.cb.setVols(+(s.querySelector('#mus') as HTMLInputElement).value, +(s.querySelector('#sfx') as HTMLInputElement).value, settings.muted);
    s.querySelector('#mus')!.addEventListener('input', apply);
    s.querySelector('#sfx')!.addEventListener('input', apply);
    s.querySelector('#mute')!.addEventListener('click', () => { settings.muted = !settings.muted; apply(); (s.querySelector('#mute') as HTMLElement).textContent = settings.muted ? '🔇 Ligado' : '🔊 Desligado'; });
    s.querySelector('#back')!.addEventListener('click', () => this.showMenu());
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
    turn.innerHTML = `<span class="tdot" style="background:${skinById(c.skin).top}"></span> ${c.finished ? 'Corrida!' : 'Vez de <b>' + c.name + '</b>'}`;
    // flicks
    const fl = this.hud.querySelector('#flicks') as HTMLElement;
    let dots = ''; const total = Math.max(3, c.flicksLeft);
    for (let i = 0; i < c.flicksLeft; i++) dots += '<span class="fd on"></span>';
    fl.innerHTML = (m.phase === 'aim' && humanTurn ? '<span class="fl-lab">Petelecos</span>' : '') + dots + (c.flicksLeft === 1 ? '<span class="flast">último!</span>' : '');
    fl.style.opacity = (c.isAI || m.phase !== 'aim') ? '0.55' : '1';
    // standings
    const st = this.hud.querySelector('#stand') as HTMLElement;
    st.innerHTML = m.standings().map((p, i) => `<div class="srow ${p.id === c.id ? 'act' : ''}"><span class="spos">${i + 1}º</span><span class="sdot" style="background:${skinById(p.skin).top}"></span><span class="sname">${p.name}</span>${p.finished ? '<span class="sfin">🏁</span>' : ''}</div>`).join('');
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
    const order = m.standings(); const you = m.caps.find(c => !c.isAI);
    const wonYou = you && you.place === 1;
    box.className = 'modal win';
    const podium = order.slice(0, Math.min(4, order.length)).map((p, i) => `<div class="prow2"><span class="pl">${['🥇', '🥈', '🥉', '4º'][i]}</span><span class="sdot" style="background:${skinById(p.skin).top}"></span><span>${p.name}</span></div>`).join('');
    const head = mode === 'daily'
      ? `<h3>Chegou!</h3><div class="big">${m.caps[0].place === 1 ? 'Você completou!' : ''}</div>`
      : `<h3>${wonYou ? 'Você venceu! 🎉' : (you ? you.place + 'º lugar' : 'Fim!')}</h3>`;
    const champLine = champInfo ? `<div class="champ-line">Corrida ${champInfo.race}/${champInfo.total} · ${champInfo.pts}</div>` : '';
    box.innerHTML = `${head}${champLine}<div class="podium">${podium}</div>
      <div class="mactions">
        <button class="chip" id="mn">Menu</button>
        <button class="chip" id="re">↻ Revanche</button>
        <button class="play-btn" id="nx">${champInfo && !champInfo.last ? 'Próxima ▶' : 'Nova pista ▶'}</button>
      </div>`;
    modal.classList.remove('hidden');
    box.querySelector('#mn')!.addEventListener('click', () => this.onMenu?.());
    box.querySelector('#re')!.addEventListener('click', () => this.onRestart?.());
    box.querySelector('#nx')!.addEventListener('click', () => this.onNext?.());
  }
}

function bar(label: string, v: number): string {
  const pct = Math.round((v - 0.8) / 0.4 * 100); return `<div class="sbar"><span>${label}</span><i style="width:${Math.max(8, Math.min(100, pct))}%"></i></div>`;
}
function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
