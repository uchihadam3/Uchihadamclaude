// UI — menus e HUD com cara de recreio anos 90 (papelão, giz, adesivo).
import { COLECAO, byId, drawTazoFront } from './art';
import { Difficulty } from './ai';

const CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body { height: 100%; overflow: hidden; }
  body { font-family: Verdana, sans-serif; background: #2e2016; touch-action: none; }
  #app { position: fixed; inset: 0; }
  canvas.game { position: absolute; inset: 0; }
  .screen { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 18px; background: radial-gradient(circle at 50% 30%, #5a3d24, #2e2016 75%); z-index: 10; padding: 20px; }
  h1 { color: #ffd94a; font-size: clamp(38px, 9vw, 64px); text-shadow: 0 4px 0 #7a3a10, 0 8px 18px rgba(0,0,0,.5); transform: rotate(-2deg); }
  h1 small { display: block; color: #ffe9a8; font-size: 0.32em; letter-spacing: 3px; transform: rotate(1deg); }
  .btn { background: linear-gradient(#ffce3c, #f2a30e); border: 3px solid #7a3a10; border-radius: 16px;
         padding: 14px 34px; font-size: 20px; font-weight: 900; color: #5a2a08; cursor: pointer;
         box-shadow: 0 5px 0 #7a3a10; font-family: inherit; }
  .btn:active { transform: translateY(4px); box-shadow: 0 1px 0 #7a3a10; }
  .btn.sec { background: linear-gradient(#e8ddc8, #cbbfa4); box-shadow: 0 5px 0 #6a5a40; border-color: #6a5a40; color: #4a3a20; }
  .row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .lbl { color: #ffe9a8; font-weight: 800; font-size: 15px; }
  .pick { background: rgba(0,0,0,.28); border: 2px solid rgba(255,230,160,.35); color: #ffe9a8;
          border-radius: 12px; padding: 10px 18px; font-weight: 900; font-size: 17px; cursor: pointer; font-family: inherit; }
  .pick.sel { background: #ffce3c; color: #5a2a08; border-color: #7a3a10; }
  .hud { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
  .topbar { position: absolute; top: max(10px, env(safe-area-inset-top)); left: 0; right: 0; display: flex; justify-content: center; gap: 10px; }
  .plac { background: rgba(30,18,8,.82); border: 2px solid rgba(255,220,140,.4); color: #ffe9a8;
          border-radius: 14px; padding: 8px 16px; font-weight: 900; font-size: 15px; }
  .plac.on { background: #ffce3c; color: #5a2a08; border-color: #7a3a10; }
  .hint { position: absolute; bottom: max(14px, env(safe-area-inset-bottom)); left: 0; right: 0; text-align: center; }
  .hint span { background: rgba(30,18,8,.82); color: #ffe9a8; border-radius: 14px; padding: 10px 18px; font-weight: 800; font-size: 14px; }
  .pow { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 20px; height: 42%;
         background: rgba(0,0,0,.4); border: 2px solid rgba(255,230,160,.4); border-radius: 12px; overflow: hidden; }
  .pow i { position: absolute; bottom: 0; left: 0; right: 0; height: 0%; background: linear-gradient(#ff4a3c, #ffce3c, #7fd84a); border-radius: 10px; }
  .toast { position: absolute; top: 22%; left: 0; right: 0; text-align: center; pointer-events: none; }
  .toast b { display: inline-block; background: #ffce3c; color: #5a2a08; border: 3px solid #7a3a10; border-radius: 16px;
             padding: 12px 26px; font-size: clamp(20px, 5vw, 32px); transform: rotate(-2deg);
             box-shadow: 0 6px 16px rgba(0,0,0,.4); animation: pop .3s ease-out; }
  @keyframes pop { from { transform: scale(0.4) rotate(-8deg); } }
  .tzrow { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; max-width: 560px; }
  .tz { width: 76px; height: 76px; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,.4); }
  .tz.mini { width: 54px; height: 54px; }
  .endbox { background: rgba(30,18,8,.92); border: 3px solid #ffce3c; border-radius: 22px; padding: 26px 30px;
            display: flex; flex-direction: column; align-items: center; gap: 14px; max-width: 92vw; }
`;

export class UI {
  root: HTMLElement;
  hud: HTMLElement | null = null;
  onStart: ((aposta: number, diff: Difficulty) => void) | null = null;
  onAgain: (() => void) | null = null;

  constructor() {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    this.root = document.getElementById('app')!;
  }
  private el(html: string): HTMLElement { const d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild as HTMLElement; }
  private tazoImg(id: string, cls = 'tz'): string {
    const cv = drawTazoFront(byId(id), 152);
    return `<img class="${cls}" src="${cv.toDataURL()}">`;
  }

  showMenu(): void {
    document.querySelectorAll('.screen').forEach(e => e.remove());
    let aposta = 3; let diff: Difficulty = 'medio';
    const s = this.el(`<div class="screen">
      <h1>BATER TAZO!<small>ANIMAIS EM EXTINÇÃO · 1998</small></h1>
      <div class="tzrow">${['tartaruga', 'arara', 'hipo', 'leao', 'jagua'].map(i => this.tazoImg(i)).join('')}</div>
      <div class="lbl">QUANTOS TAZOS CADA UM CASA?</div>
      <div class="row" id="ap">${[1, 2, 3, 4, 5].map(n => `<button class="pick ${n === 3 ? 'sel' : ''}" data-n="${n}">${n}</button>`).join('')}</div>
      <div class="lbl">ADVERSÁRIO</div>
      <div class="row" id="df">
        <button class="pick" data-d="facil">🙂 Iniciante</button>
        <button class="pick sel" data-d="medio">😏 Malandro</button>
        <button class="pick" data-d="dificil">😈 Mão de Pedra</button>
      </div>
      <button class="btn" id="go">JOGAR! 🖐️</button>
      <div class="lbl" style="opacity:.75">segura no monte, PUXA rápido e SOLTA — força do gesto = força do tapa</div>
    </div>`);
    s.querySelectorAll('#ap .pick').forEach(b => b.addEventListener('click', () => { s.querySelectorAll('#ap .pick').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); aposta = +(b as HTMLElement).dataset.n!; }));
    s.querySelectorAll('#df .pick').forEach(b => b.addEventListener('click', () => { s.querySelectorAll('#df .pick').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); diff = (b as HTMLElement).dataset.d as Difficulty; }));
    s.querySelector('#go')!.addEventListener('click', () => { s.remove(); this.onStart?.(aposta, diff); });
    this.root.appendChild(s);
  }

  showHUD(): void {
    this.hud?.remove();
    this.hud = this.el(`<div class="hud">
      <div class="topbar">
        <div class="plac" id="p0">VOCÊ · 0</div>
        <div class="plac" id="pilha">🥞 0</div>
        <div class="plac" id="p1">RIVAL · 0</div>
      </div>
      <div class="pow"><i id="powfill"></i></div>
      <div class="hint"><span id="hint">…</span></div>
    </div>`);
    this.root.appendChild(this.hud);
  }
  setHUD(you: number, rival: number, pile: number, turn: number): void {
    if (!this.hud) return;
    const p0 = this.hud.querySelector('#p0')!, p1 = this.hud.querySelector('#p1')!;
    p0.textContent = `VOCÊ · ${you}`; p1.textContent = `RIVAL · ${rival}`;
    p0.className = 'plac' + (turn === 0 ? ' on' : ''); p1.className = 'plac' + (turn === 1 ? ' on' : '');
    this.hud.querySelector('#pilha')!.textContent = `🥞 ${pile}`;
  }
  setHint(t: string): void { if (this.hud) this.hud.querySelector('#hint')!.textContent = t; }
  setPower(v: number): void { if (this.hud) (this.hud.querySelector('#powfill') as HTMLElement).style.height = `${Math.round(v * 100)}%`; }

  toast(msg: string, ms = 1400): void {
    const t = this.el(`<div class="toast"><b>${msg}</b></div>`);
    this.root.appendChild(t); setTimeout(() => t.remove(), ms);
  }

  showEnd(win: boolean, youIds: string[], rivalIds: string[]): void {
    const s = this.el(`<div class="screen">
      <div class="endbox">
        <h1 style="font-size:42px">${win ? '🏆 LIMPOU O MONTE!' : '😤 LEVOU A PIOR…'}</h1>
        <div class="lbl">VOCÊ FICOU COM ${youIds.length}:</div>
        <div class="tzrow">${youIds.map(i => this.tazoImg(i, 'tz mini')).join('') || '<span class="lbl">nenhum…</span>'}</div>
        <div class="lbl">O RIVAL LEVOU ${rivalIds.length}:</div>
        <div class="tzrow">${rivalIds.map(i => this.tazoImg(i, 'tz mini')).join('') || '<span class="lbl">nenhum!</span>'}</div>
        <div class="row">
          <button class="btn" id="again">JOGAR DE NOVO</button>
          <button class="btn sec" id="menu">MENU</button>
        </div>
      </div>
    </div>`);
    s.querySelector('#again')!.addEventListener('click', () => { s.remove(); this.onAgain?.(); });
    s.querySelector('#menu')!.addEventListener('click', () => { s.remove(); this.showMenu(); });
    this.root.appendChild(s);
  }
}
