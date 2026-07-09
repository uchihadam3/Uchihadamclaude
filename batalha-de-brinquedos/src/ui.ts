// ---------------------------------------------------------------------------
// HUD — interface de brinquedo: cartinhas de tropa embaixo (toque na carta →
// toque na faixa), plaquinhas de ouro/XP em cima, botões de módulo por slot,
// especial redondo com cooldown, modal de evolução de era e telas de início/
// fim. Tudo DOM em cima do canvas (leve e nítido em qualquer tela).
// ---------------------------------------------------------------------------
import { Game } from './sim';
import { UnitKind, Faction } from './toy';
import { statsOf, UNIT_INFO, FACTION_INFO, XP_EVOLVE, SLOT_INFO, SlotKind, SPECIAL_INFO, SPECIAL_CD, BASE_HP } from './units';
import { Difficulty } from './ai';
import { sfx, setMuted, audio } from './audio';

const CSS = `
  #ui { font-family: -apple-system,'Segoe UI',Roboto,sans-serif; color:#3a2c14; }
  .hit { pointer-events:auto; }
  /* ---------- topo: linha 1 (ouro · vidas · som) + linha 2 (XP/era) ---------- */
  .top { position:absolute; top:max(8px,env(safe-area-inset-top)); left:10px; right:10px;
         display:flex; flex-direction:column; gap:5px; }
  .toprow { display:flex; gap:8px; align-items:center; }
  .plq { background:linear-gradient(180deg,#f5e2b8,#e0bd82); border:2px solid #a87c3e; border-radius:12px;
         padding:5px 12px; font-weight:800; font-size:15px; box-shadow:0 3px 0 #8a6230, 0 6px 14px rgba(40,20,5,.3);
         white-space:nowrap; }
  .bb { flex:1; min-width:0; }
  .bb .lab { font-size:9.5px; font-weight:900; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.55); letter-spacing:.4px; }
  .bb .bar { height:11px; background:rgba(20,14,8,.55); border-radius:6px; overflow:hidden; border:1.5px solid rgba(255,255,255,.4); }
  .bb .bar i { display:block; height:100%; border-radius:5px; transition:width .25s; }
  .icobtn { width:38px; height:38px; flex:none; border-radius:12px; background:linear-gradient(180deg,#f5e2b8,#e0bd82);
            border:2px solid #a87c3e; box-shadow:0 3px 0 #8a6230; font-size:17px; display:flex; align-items:center;
            justify-content:center; cursor:pointer; }
  .xprow { display:flex; gap:8px; align-items:center; }
  .xpbar { flex:1; max-width:340px; height:15px; background:#5c4a2c; border-radius:9px; border:2px solid #a87c3e; overflow:hidden;
           box-shadow:0 3px 0 #8a6230; position:relative; }
  .xpbar i { display:block; height:100%; width:0%; background:linear-gradient(90deg,#7ec8ff,#4a9ae8); border-radius:6px; transition:width .3s; }
  .xpbar em { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-style:normal;
              font-size:9.5px; font-weight:900; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.6); white-space:nowrap; }
  .evolve { display:none; flex:none; background:linear-gradient(180deg,#8af0a0,#3fae6a); color:#0c3a1c; border:2px solid #2c7a44;
            border-radius:12px; padding:5px 12px; font-weight:900; font-size:13px; box-shadow:0 3px 0 #205c32; cursor:pointer;
            animation:pulse 1s infinite; }
  @keyframes pulse { 50% { transform:scale(1.06); } }
  /* ---------- cartas de tropa ---------- */
  .deck { position:absolute; bottom:max(10px,env(safe-area-inset-bottom)); left:50%; transform:translateX(-50%);
          display:flex; gap:9px; align-items:flex-end; }
  .card { width:76px; border-radius:14px; background:linear-gradient(180deg,#fdf6e4,#ecd9ae); border:2.5px solid #a87c3e;
          box-shadow:0 4px 0 #8a6230, 0 8px 18px rgba(40,20,5,.35); padding:7px 4px 6px; text-align:center; cursor:pointer;
          transition:transform .12s; position:relative; }
  .card .ico { font-size:25px; line-height:1; }
  .card .nm { font-size:10.5px; font-weight:900; margin-top:2px; }
  .card .tip { font-size:8.5px; color:#7a5c2e; font-weight:700; }
  .card .cost { position:absolute; top:-9px; right:-6px; background:#ffd76a; border:2px solid #a87c3e; border-radius:10px;
                font-size:10.5px; font-weight:900; padding:1px 6px; box-shadow:0 2px 0 #8a6230; }
  .card.poor { filter:grayscale(.75) brightness(.8); }
  .card.sel { transform:translateY(-10px) scale(1.08); outline:3px solid #8af0a0; }
  /* ---------- especial ---------- */
  .spec { position:absolute; right:12px; width:68px; height:68px; border-radius:50%;
          background:radial-gradient(circle at 32% 28%, #ffb84a, #e8641e); border:3px solid #a83c10;
          box-shadow:0 5px 0 #7c2c0c, 0 10px 20px rgba(40,10,0,.4); font-size:28px; display:flex; align-items:center;
          justify-content:center; cursor:pointer; bottom:max(128px,calc(env(safe-area-inset-bottom) + 118px)); }
  .spec .cd { position:absolute; inset:-3px; border-radius:50%; background:conic-gradient(rgba(20,10,4,.72) var(--p), transparent 0); }
  .spec .lab { position:absolute; bottom:-16px; width:120px; left:50%; transform:translateX(-50%); font-size:9.5px; font-weight:800;
               color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.6); text-align:center; }
  /* ---------- slots da base ---------- */
  .slots { position:absolute; left:10px; bottom:max(128px,calc(env(safe-area-inset-bottom) + 118px));
           display:flex; flex-direction:column; gap:6px; }
  .slot { display:flex; align-items:center; gap:6px; }
  .slot button { min-width:44px; height:38px; border-radius:11px; background:linear-gradient(180deg,#f5e2b8,#e0bd82);
                 border:2px solid #a87c3e; box-shadow:0 3px 0 #8a6230; font-size:15px; font-weight:900; cursor:pointer; padding:0 8px; }
  .slot .lane { font-size:10.5px; font-weight:900; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.55); width:42px; }
  .pop { position:absolute; display:none; background:#fdf6e4; border:2.5px solid #a87c3e; border-radius:14px; padding:8px;
         box-shadow:0 8px 24px rgba(40,20,5,.45); z-index:10; }
  .pop button { display:flex; width:180px; align-items:center; gap:8px; background:linear-gradient(180deg,#fff,#f0e2c0);
                border:2px solid #c8a468; border-radius:10px; padding:7px 8px; margin:4px 0; font-weight:800; font-size:13px; cursor:pointer; }
  .pop button small { margin-left:auto; background:#ffd76a; border-radius:8px; padding:1px 6px; font-weight:900; }
  /* ---------- botões de faixa (aparecem ao escolher uma carta) ---------- */
  .lanes { position:absolute; inset:0; display:none; }
  .lanebtn { position:absolute; width:60px; height:60px; border-radius:50%; transform:translate(-50%,-50%);
             background:radial-gradient(circle at 32% 28%, #fff6dd, #dfb571); border:3px solid #3fae6a;
             box-shadow:0 4px 0 #8a6230, 0 0 0 6px rgba(140,230,150,.4), 0 10px 18px rgba(30,15,5,.45);
             font-weight:900; font-size:20px; color:#2c5c1c; display:flex; flex-direction:column; align-items:center;
             justify-content:center; cursor:pointer; line-height:1; gap:1px;
             animation:bpop .3s cubic-bezier(.34,1.56,.64,1); }
  .lanebtn small { font-size:8.5px; font-weight:800; color:#4a7a34; }
  @media (min-aspect-ratio: 1/1) { .lanebtn { width:50px; height:50px; font-size:17px; } }
  .lanebtn:active { transform:translate(-50%,-50%) scale(.92); }
  @keyframes bpop { from { transform:translate(-50%,-50%) scale(.25); } }
  /* ---------- toasts ---------- */
  .toasts { position:absolute; top:24%; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; gap:6px; align-items:center; width:max-content; max-width:92vw; }
  .toast { background:rgba(30,20,8,.82); color:#ffe9c0; font-weight:800; font-size:13.5px; border-radius:12px; padding:7px 16px;
           opacity:0; transition:opacity .25s, transform .25s; transform:translateY(-6px); text-align:center; }
  .toast.show { opacity:1; transform:none; }
  .toast.warn { background:rgba(160,40,20,.9); color:#fff; }
  /* ---------- modais ---------- */
  .modal { position:absolute; inset:0; background:rgba(30,18,8,.55); display:flex; align-items:center; justify-content:center; z-index:20; padding:14px; }
  .box { background:linear-gradient(180deg,#fdf6e4,#f0dcae); border:3px solid #a87c3e; border-radius:22px; padding:20px 20px;
         max-width:min(94vw,560px); text-align:center; box-shadow:0 14px 40px rgba(20,10,0,.5); }
  .box h1 { font-size:24px; margin-bottom:4px; } .box h2 { font-size:19px; margin-bottom:8px; }
  .box p { font-size:13.5px; color:#6a5030; line-height:1.45; }
  .facrow { display:flex; gap:12px; margin:14px 0 6px; }
  .fac { flex:1; background:linear-gradient(180deg,#fff,#f0e2c0); border:2.5px solid #c8a468; border-radius:16px; padding:12px 8px;
         cursor:pointer; transition:transform .12s; }
  .fac:active { transform:scale(1.04); border-color:#3fae6a; }
  .fac .big { font-size:32px; } .fac b { display:block; font-size:14.5px; margin:4px 0 2px; } .fac span { font-size:11px; color:#7a5c2e; }
  .bigbtn { background:linear-gradient(180deg,#8af0a0,#3fae6a); color:#0c3a1c; border:2.5px solid #2c7a44; border-radius:14px;
            padding:10px 26px; font-weight:900; font-size:17px; box-shadow:0 4px 0 #205c32; cursor:pointer; margin-top:12px; }
  .diffrow { display:flex; gap:10px; justify-content:center; margin-top:12px; }
  .diff { background:linear-gradient(180deg,#fff,#f0e2c0); border:2.5px solid #c8a468; border-radius:12px; padding:8px 14px;
          font-weight:900; cursor:pointer; font-size:13.5px; }
  .diff.sel { border-color:#3fae6a; background:linear-gradient(180deg,#d8ffe0,#a8e8b8); }
  /* ---------- telas estreitas: compacto e SEM sobreposição ---------- */
  @media (max-width: 560px) {
    .card { width:20.5vw; max-width:76px; padding:6px 2px 5px; border-radius:12px; }
    .card .ico { font-size:21px; } .card .nm { font-size:9px; } .card .tip { font-size:7.5px; }
    .card .cost { font-size:9.5px; padding:0 5px; top:-8px; }
    .deck { gap:6px; bottom:max(8px,env(safe-area-inset-bottom)); width:max-content; }
    .spec { width:58px; height:58px; font-size:24px; right:8px;
            bottom:max(112px,calc(env(safe-area-inset-bottom) + 102px)); }
    .spec .lab { display:none; }
    .slots { left:8px; bottom:max(112px,calc(env(safe-area-inset-bottom) + 102px)); gap:5px; }
    .slot button { min-width:40px; height:34px; font-size:13px; }
    .slot .lane { font-size:9px; width:34px; }
    .plq { font-size:13px; padding:4px 9px; }
    .icobtn { width:32px; height:32px; font-size:14px; }
  }
`;

export class UI {
  root = document.getElementById('ui')!;
  onPickLane: ((kind: UnitKind, lane: number) => void) | null = null;
  onBuild: ((idx: number, kind: SlotKind) => void) | null = null;
  onUpgrade: ((idx: number) => void) | null = null;
  onSpecial: (() => void) | null = null;
  onEvolve: ((fac: Faction) => void) | null = null;
  onStart: ((diff: Difficulty) => void) | null = null;
  onRestart: (() => void) | null = null;
  private sel: UnitKind | null = null;
  private els: Record<string, HTMLElement> = {};

  constructor() {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  }
  private el(html: string): HTMLElement { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild as HTMLElement; }

  // ------------- tela inicial -------------
  showStart(): void {
    this.root.innerHTML = '';
    let diff: Difficulty = 'medio';
    const m = this.el(`<div class="modal hit"><div class="box">
      <h1>🧸 Batalha de Brinquedos</h1>
      <p>O quarto virou campo de batalha! Treine seus bonequinhos, escolha a FAIXA da mesa onde eles marcham,
      construa módulos na base (torreta, gerador, muralha) e junte XP pra <b>evoluir de era</b>:
      Piratas de Plástico ou Robôs de Corda? E cuidado com a <b>gude gigante</b> que atravessa a mesa!</p>
      <div class="diffrow">
        <button class="diff" data-d="facil">😊 Fácil</button>
        <button class="diff sel" data-d="medio">🙂 Médio</button>
        <button class="diff" data-d="dificil">😈 Difícil</button>
      </div>
      <button class="bigbtn" id="go">▶ BRINCAR</button>
    </div></div>`);
    m.querySelectorAll('.diff').forEach(b => b.addEventListener('click', () => {
      m.querySelectorAll('.diff').forEach(x => x.classList.remove('sel'));
      b.classList.add('sel'); diff = (b as HTMLElement).dataset.d as Difficulty; sfx.ui();
    }));
    m.querySelector('#go')!.addEventListener('click', () => { sfx.ui(); this.root.innerHTML = ''; this.onStart?.(diff); });
    this.root.appendChild(m);
  }

  // ------------- HUD da partida -------------
  showHUD(g: Game): void {
    this.root.innerHTML = `
      <div class="top">
        <div class="toprow">
          <div class="plq">🪙 <span id="gold">0</span></div>
          <div class="bb"><div class="lab">SUA BASE</div><div class="bar"><i id="hpMine" style="background:linear-gradient(90deg,#8af0a0,#3fae6a);width:100%"></i></div></div>
          <div class="bb"><div class="lab">INIMIGO</div><div class="bar"><i id="hpFoe" style="background:linear-gradient(90deg,#ff9a7a,#e8503a);width:100%"></i></div></div>
          <button class="icobtn hit" id="mute">🔊</button>
        </div>
        <div class="xprow">
          <div class="xpbar"><i id="xpf"></i><em id="xplab">Madeirinhas</em></div>
          <button class="evolve hit" id="evolve">⭐ EVOLUIR!</button>
        </div>
      </div>
      <div class="deck" id="deck"></div>
      <button class="spec hit" id="spec"><span id="specIco">🔮</span><div class="cd" id="specCd" style="--p:0deg"></div><div class="lab" id="specLab"></div></button>
      <div class="slots" id="slots"></div>
      <div class="pop hit" id="pop"></div>
      <div class="lanes" id="lanes">
        <button class="lanebtn hit" data-l="0">1<small>aqui!</small></button>
        <button class="lanebtn hit" data-l="1">2<small>aqui!</small></button>
        <button class="lanebtn hit" data-l="2">3<small>aqui!</small></button>
      </div>
      <div class="toasts" id="toasts"></div>`;
    this.els = {};
    for (const id of ['gold', 'xpf', 'xplab', 'evolve', 'hpMine', 'hpFoe', 'deck', 'spec', 'specIco', 'specCd', 'specLab', 'slots', 'pop', 'lanes', 'toasts', 'mute'])
      this.els[id] = this.root.querySelector('#' + id) as HTMLElement;
    this.buildDeck(g);
    this.buildSlots(g);
    this.els.evolve.addEventListener('click', () => this.showEvolve());
    this.els.spec.addEventListener('click', () => { this.onSpecial?.(); });
    this.els.mute.addEventListener('click', () => { setMuted(!audio.muted); this.els.mute.textContent = audio.muted ? '🔇' : '🔊'; sfx.ui(); });
    // faixas
    const lanes = this.els.lanes;
    lanes.querySelectorAll('.lanebtn').forEach(d => d.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (this.sel != null) { this.onPickLane?.(this.sel, +(d as HTMLElement).dataset.l!); }
      this.deselect();
    }));
    // posiciona os botões de faixa sobre o 3D — colunas no retrato, linhas na paisagem
    const zs = lanes.querySelectorAll('.lanebtn');
    const place = () => {
      const H = innerHeight, W = innerWidth;
      const portrait = H > W * 1.05;
      zs.forEach((zEl, i) => {
        const z = zEl as HTMLElement;
        if (portrait) { z.style.left = (19 + i * 31) + '%'; z.style.top = '56%'; }
        else { z.style.left = '20%'; z.style.top = (40 + i * 10.4) + '%'; }
      });
    };
    place(); addEventListener('resize', place);
  }
  private buildDeck(g: Game): void {
    const deck = this.els.deck; deck.innerHTML = '';
    (['espada', 'arco', 'tanque', 'veloz'] as UnitKind[]).forEach(k => {
      const info = UNIT_INFO[k];
      const c = this.el(`<div class="card hit" data-k="${k}">
        <div class="cost" data-cost>?</div>
        <div class="ico">${info.ico}</div><div class="nm">${info.name}</div><div class="tip">${info.tip}</div></div>`);
      c.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        if (this.sel === k) { this.deselect(); return; }
        this.sel = k; sfx.ui();
        deck.querySelectorAll('.card').forEach(x => x.classList.remove('sel'));
        c.classList.add('sel');
        this.els.lanes.style.display = 'block';
      });
      deck.appendChild(c);
    });
  }
  private buildSlots(g: Game): void {
    const wrap = this.els.slots; wrap.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const row = this.el(`<div class="slot"><span class="lane">Faixa ${i + 1}</span><button class="hit" data-i="${i}">＋</button></div>`);
      const btn = row.querySelector('button')!;
      btn.addEventListener('click', (e) => { e.stopPropagation(); this.openPop(g, i, btn as HTMLElement); });
      wrap.appendChild(row);
    }
    document.addEventListener('pointerdown', () => { this.els.pop.style.display = 'none'; });
  }
  private openPop(g: Game, idx: number, anchor: HTMLElement): void {
    sfx.ui();
    const pop = this.els.pop;
    const s = g.slots[0][idx];
    if (!s.kind) {
      pop.innerHTML = (Object.keys(SLOT_INFO) as SlotKind[]).map(k =>
        `<button data-k="${k}">${SLOT_INFO[k].ico} ${SLOT_INFO[k].name} <em style="font-size:10px;font-style:normal;color:#8a6a34">${SLOT_INFO[k].tip}</em><small>🪙${SLOT_INFO[k].cost}</small></button>`).join('');
      pop.querySelectorAll('button').forEach(b => b.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.onBuild?.(idx, (b as HTMLElement).dataset.k as SlotKind);
        pop.style.display = 'none';
      }));
    } else if (s.lvl === 1) {
      pop.innerHTML = `<button data-up>⬆️ Melhorar ${SLOT_INFO[s.kind].name} <small>🪙${SLOT_INFO[s.kind].up}</small></button>`;
      pop.querySelector('button')!.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); this.onUpgrade?.(idx); pop.style.display = 'none';
      });
    } else {
      pop.innerHTML = `<button disabled style="opacity:.6">${SLOT_INFO[s.kind].ico} ${SLOT_INFO[s.kind].name} nível MÁXIMO ⭐</button>`;
    }
    const r = anchor.getBoundingClientRect();
    pop.style.left = r.right + 8 + 'px';
    pop.style.top = Math.max(8, r.top - 40) + 'px';
    pop.style.display = 'block';
  }
  deselect(): void {
    this.sel = null;
    this.els.lanes.style.display = 'none';
    this.els.deck?.querySelectorAll('.card').forEach(x => x.classList.remove('sel'));
  }

  // ------------- atualização por frame -------------
  refresh(g: Game): void {
    if (!this.els.gold) return;
    this.els.gold.textContent = String(Math.floor(g.gold[0]));
    const fac = g.faction[0];
    this.els.xplab.textContent = `${FACTION_INFO[fac].name} · XP ${Math.min(g.xp[0], XP_EVOLVE)}/${XP_EVOLVE}`;
    (this.els.xpf as HTMLElement).style.width = Math.min(100, g.xp[0] / XP_EVOLVE * 100) + '%';
    this.els.evolve.style.display = g.canEvolve(0) ? 'inline-block' : 'none';
    (this.els.hpMine as HTMLElement).style.width = Math.max(0, g.baseHp[0] / BASE_HP * 100) + '%';
    (this.els.hpFoe as HTMLElement).style.width = Math.max(0, g.baseHp[1] / BASE_HP * 100) + '%';
    // cartas: custo + pobre
    this.els.deck.querySelectorAll('.card').forEach(c => {
      const k = (c as HTMLElement).dataset.k as UnitKind;
      const st = statsOf(k, fac);
      (c.querySelector('[data-cost]') as HTMLElement).textContent = '🪙' + st.cost;
      c.classList.toggle('poor', g.gold[0] < st.cost);
    });
    // slots
    this.els.slots.querySelectorAll('button').forEach((b, i) => {
      const s = g.slots[0][i];
      b.textContent = s.kind ? `${SLOT_INFO[s.kind].ico}${s.lvl === 2 ? '⭐' : ''}` : '＋';
    });
    // especial
    const sp = SPECIAL_INFO[fac];
    this.els.specIco.textContent = sp.ico;
    this.els.specLab.textContent = sp.name;
    const p = g.specCd[0] / SPECIAL_CD;
    (this.els.specCd as HTMLElement).style.setProperty('--p', p * 360 + 'deg');
  }

  toast(msg: string, kind = ''): void {
    if (!this.els.toasts) return;
    const t = this.el(`<div class="toast ${kind}">${msg}</div>`);
    this.els.toasts.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2100);
  }

  showEvolve(): void {
    sfx.ui();
    const m = this.el(`<div class="modal hit"><div class="box">
      <h2>⭐ Hora de EVOLUIR!</h2>
      <p>Seus bonequinhos de madeira estão prontos pra virar outra coisa. Escolha com carinho — vale a partida toda!</p>
      <div class="facrow">
        <div class="fac" data-f="pirata"><div class="big">🏴‍☠️</div><b>Piratas de Plástico</b><span>${FACTION_INFO.pirata.desc}</span><br><span>especial: 💣 Canhonada</span></div>
        <div class="fac" data-f="robo"><div class="big">🤖</div><b>Robôs de Corda</b><span>${FACTION_INFO.robo.desc}</span><br><span>especial: 🧲 Ímã Gigante</span></div>
      </div>
    </div></div>`);
    m.querySelectorAll('.fac').forEach(f => f.addEventListener('click', () => {
      this.onEvolve?.((f as HTMLElement).dataset.f as Faction);
      m.remove();
    }));
    this.root.appendChild(m);
  }

  showEnd(won: boolean): void {
    const m = this.el(`<div class="modal hit"><div class="box">
      <h1>${won ? '🏆 VITÓRIA!' : '💔 Derrota…'}</h1>
      <p>${won ? 'A base inimiga virou um monte de pecinhas! O quarto é seu.' : 'Sua base desmontou… mas brinquedo bom volta pra caixa e tenta de novo!'}</p>
      <button class="bigbtn" id="again">↻ Jogar de novo</button>
    </div></div>`);
    m.querySelector('#again')!.addEventListener('click', () => { m.remove(); this.onRestart?.(); });
    this.root.appendChild(m);
  }
}
