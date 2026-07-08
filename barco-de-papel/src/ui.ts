// Camada de UI (DOM sobreposto ao canvas): seleção de fases, HUD com
// ferramentas rústicas + controles de fase, e modais de vitória/derrota/pausa.
// Toda a linguagem visual é natural (pergaminho, madeira, pedra).
import { LEVELS } from './game/levels';
import { starsOf, bestOf, unlocked, totalStars } from './game/save';
import { GameManager } from './game/manager';
import type { ToolId } from './game/tools';

export interface UICallbacks {
  pickLevel(id: number): void;
  selectTool(t: ToolId): void;
  cocoMode(m: 'lower' | 'raise'): void;
  startRun(): void;
  backPlanning(): void;
  restart(): void;
  next(): void;
  menu(): void;
  pauseToggle(): void;
  mute(): void;
}

const ICONS: Record<ToolId, string> = {
  coco: `<svg viewBox="0 0 32 32"><path d="M5 16a11 8 0 0 0 22 0z" fill="#6b4626"/><path d="M6 16a10 6 0 0 1 20 0z" fill="#d9c39a"/><circle cx="12" cy="14.5" r="1.4" fill="#5a3d20"/><circle cx="16" cy="15" r="1.4" fill="#5a3d20"/><circle cx="20" cy="14.5" r="1.4" fill="#5a3d20"/></svg>`,
  bambu: `<svg viewBox="0 0 32 32"><rect x="9" y="4" width="6" height="24" rx="3" fill="#9fb163"/><rect x="17" y="4" width="6" height="24" rx="3" fill="#8aa050"/><path d="M9 11h6M9 20h6M17 9h6M17 18h6" stroke="#5f7333" stroke-width="1.6"/></svg>`,
  pedras: `<svg viewBox="0 0 32 32"><ellipse cx="12" cy="20" rx="8" ry="5.5" fill="#c3b795"/><path d="M20 22a6 6 0 0 1 9-4c-2 3-5 4-9 4z" fill="#f0dfc6"/><path d="M23 21l1-4M25 21l1-4" stroke="#caa877" stroke-width="0.9"/></svg>`,
  folha: `<svg viewBox="0 0 32 32"><path d="M16 28C16 16 8 8 4 6c6 0 11 4 12 10C17 10 22 6 28 6c-4 2-12 10-12 22z" fill="#5f9a34"/><path d="M16 28V8" stroke="#3d6b20" stroke-width="1.4"/></svg>`,
};
const TOOL_META: { id: ToolId; name: string; sub: string }[] = [
  { id: 'coco', name: 'Casca de Coco', sub: 'esculpir' },
  { id: 'bambu', name: 'Bambu', sub: 'canal' },
  { id: 'pedras', name: 'Pedras', sub: 'freio' },
  { id: 'folha', name: 'Folha', sub: 'sombra' },
];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const FAIL_TXT: Record<string, string> = {
  destroyed: 'O barco de papel se desfez com o impacto.',
  stuck: 'O barco ficou preso — faltou correnteza para levá-lo.',
  dry: 'A água secou antes de o barco chegar. Cave mais fundo ou dê sombra.',
};

export class UI {
  root: HTMLElement;
  private cb: UICallbacks;
  private _phaseKind = ''; private _modalKey = '';
  constructor(cb: UICallbacks) {
    this.cb = cb;
    this.root = document.getElementById('ui')!;
    this.buildMenu();
    this.buildGame();
  }

  // ---------------- MENU / SELEÇÃO DE FASES ----------------
  private buildMenu(): void {
    const el = document.createElement('div'); el.id = 'menu'; el.className = 'screen';
    el.innerHTML = `
      <div class="menu-head">
        <div class="menu-kicker">Puzzle de Água · Oásis</div>
        <h1 class="menu-title">Oásis do Barco de Papel</h1>
        <div class="menu-stars">✦ <b id="totalStars">0</b> estrelas</div>
      </div>
      <div class="levels" id="levels"></div>
      <div class="menu-foot">Molde a areia, conduza a água e leve o frágil barco de papel até o destino.</div>`;
    this.root.appendChild(el);
    this.refreshLevels();
  }
  refreshLevels(): void {
    const wrap = this.root.querySelector('#levels')!; wrap.innerHTML = '';
    (this.root.querySelector('#totalStars') as HTMLElement).textContent = String(totalStars());
    LEVELS.forEach((lv) => {
      const open = unlocked(lv.id); const st = starsOf(lv.id); const best = bestOf(lv.id);
      const card = document.createElement('button');
      card.className = 'lvl-card' + (open ? '' : ' locked');
      card.innerHTML = `
        <div class="lvl-num">${lv.id + 1}</div>
        <div class="lvl-name">${lv.name}</div>
        <div class="lvl-stars">${[0, 1, 2].map((i) => `<span class="${i < st ? 'on' : ''}">★</span>`).join('')}</div>
        <div class="lvl-best">${open ? (best !== undefined ? 'melhor ' + fmt(best) : 'não concluída') : '🔒 bloqueada'}</div>`;
      if (open) card.onclick = () => this.cb.pickLevel(lv.id);
      wrap.appendChild(card);
    });
  }

  // ---------------- HUD DE JOGO ----------------
  private buildGame(): void {
    const el = document.createElement('div'); el.id = 'game'; el.className = 'screen hidden';
    el.innerHTML = `
      <div class="hud-top">
        <button class="wood-btn" id="btnMenu">‹ Fases</button>
        <div class="hud-info"><div class="hud-level" id="hudLevel"></div><div class="hud-time" id="hudTime">0:00</div></div>
        <div class="hud-top-right">
          <button class="round-btn" id="btnMute" title="Som">♪</button>
          <button class="round-btn" id="btnPause" title="Pausar">❚❚</button>
        </div>
      </div>

      <div class="hud-health hidden" id="healthWrap">
        <span>Barco</span><div class="hp-track"><div class="hp-fill" id="hpFill"></div></div>
      </div>

      <div class="hint-banner" id="hint"></div>

      <div class="dock">
        <div class="tool-shelf" id="toolShelf">
          <div class="shelf-wood"></div>
          <div class="coco-modes" id="cocoModes">
            <button data-m="lower" class="cm active">▼ Rebaixar</button>
            <button data-m="raise" class="cm">▲ Elevar</button>
          </div>
          <div class="tools" id="tools"></div>
        </div>
        <div class="phase-panel" id="phasePanel"></div>
      </div>

      <div class="modal-bg hidden" id="modal"><div class="modal" id="modalBox"></div></div>`;
    this.root.appendChild(el);

    // ferramentas
    const tools = el.querySelector('#tools')!;
    for (const t of TOOL_META) {
      const b = document.createElement('button'); b.className = 'tool'; b.dataset.tool = t.id;
      b.innerHTML = `<span class="tool-badge">${ICONS[t.id]}</span><span class="tool-name">${t.name}</span><span class="tool-sub" data-count>${t.sub}</span>`;
      b.onclick = () => this.cb.selectTool(t.id);
      tools.appendChild(b);
    }
    el.querySelectorAll('.cm').forEach((c) => c.addEventListener('click', () => this.cb.cocoMode((c as HTMLElement).dataset.m as any)));
    el.querySelector('#btnMenu')!.addEventListener('click', () => this.cb.menu());
    el.querySelector('#btnPause')!.addEventListener('click', () => this.cb.pauseToggle());
    el.querySelector('#btnMute')!.addEventListener('click', () => this.cb.mute());
  }

  showMenu(): void { this.refreshLevels(); this.q('#menu').classList.remove('hidden'); this.q('#game').classList.add('hidden'); }
  showGame(): void { this._phaseKind = ''; this._modalKey = ''; this.q('#menu').classList.add('hidden'); this.q('#game').classList.remove('hidden'); }
  setMuted(m: boolean): void { (this.q('#btnMute') as HTMLElement).textContent = m ? '♪̸' : '♪'; }

  // atualiza HUD a partir do estado do jogo
  update(m: GameManager): void {
    if (!m.level) return;               // ainda no menu (nenhuma fase carregada)
    const planning = m.state === 'planning';
    this.q('#hudLevel').textContent = `Fase ${m.levelIndex + 1} · ${m.level.name}`;
    this.q('#hudTime').textContent = fmt(m.timeSec);
    if (planning) this.q('#hint').innerHTML = `<b>Objetivo:</b> leve o barco de papel do <b>Início</b> até a <b>Chegada</b> — molde a areia para a água correr até lá.<div class="hint-sub">${m.level.hint}</div>`;
    (this.q('#hint') as HTMLElement).style.display = planning ? '' : 'none';

    // saúde do barco (na Execução)
    const showHp = m.state === 'running' || m.state === 'paused';
    this.q('#healthWrap').classList.toggle('hidden', !showHp);
    (this.q('#hpFill') as HTMLElement).style.width = `${Math.max(0, m.boat.health)}%`;
    (this.q('#hpFill') as HTMLElement).style.background = m.boat.health > 50 ? 'linear-gradient(90deg,#6fae3c,#a7d24a)' : 'linear-gradient(90deg,#c85a3a,#e6a24a)';

    // ferramentas: ativa + contagens + bloqueio na Execução
    this.q('#toolShelf').classList.toggle('locked', !planning);
    this.q('#cocoModes').classList.toggle('hidden', m.tools.active !== 'coco' || !planning);
    this.root.querySelectorAll('.cm').forEach((c) => c.classList.toggle('active', (c as HTMLElement).dataset.m === m.tools.cocoMode));
    this.root.querySelectorAll('.tool').forEach((tb) => {
      const id = (tb as HTMLElement).dataset.tool as ToolId;
      tb.classList.toggle('active', m.tools.active === id);
      const sub = tb.querySelector('[data-count]') as HTMLElement;
      const meta = TOOL_META.find((x) => x.id === id)!;
      if (id === 'coco') { sub.textContent = meta.sub; tb.classList.remove('empty'); }
      else { const n = m.tools.budget[id]; sub.textContent = `×${n}`; tb.classList.toggle('empty', n <= 0); }
    });

    // painel de fase (rebuild só quando muda de fase)
    const kind = planning ? 'plan' : 'run';
    if (this._phaseKind !== kind) {
      this._phaseKind = kind; const pp = this.q('#phasePanel');
      if (planning) pp.innerHTML = `<button class="run-plaque" id="runBtn"><span>❖ Executar Simulação</span></button>`;
      else pp.innerHTML = `<button class="wood-btn big" id="backBtn">‹ Planejar</button>`;
      pp.querySelector('#runBtn')?.addEventListener('click', () => this.cb.startRun());
      pp.querySelector('#backBtn')?.addEventListener('click', () => this.cb.backPlanning());
    }

    // modais (rebuild só na transição de estado)
    if (this._modalKey !== m.state) {
      this._modalKey = m.state;
      if (m.state === 'victory') this.showVictory(m);
      else if (m.state === 'failure') this.showFailure(m);
      else if (m.state === 'paused') this.showPause();
      else this.q('#modal').classList.add('hidden');
    }
  }

  private showVictory(m: GameManager): void {
    const box = this.q('#modalBox'); const hasNext = m.levelIndex + 1 < LEVELS.length;
    box.className = 'modal win';
    box.innerHTML = `
      <div class="modal-title">Chegou!</div>
      <div class="stars-big">${[0, 1, 2].map((i) => `<span class="${i < m.stars ? 'on' : ''}">★</span>`).join('')}</div>
      <div class="modal-stats"><span>Tempo ${fmt(m.timeSec)}</span><span>Barco ${Math.round(m.boat.health)}%</span></div>
      <div class="modal-actions">
        <button class="wood-btn" id="mMenu">Fases</button>
        <button class="wood-btn" id="mRetry">Repetir</button>
        ${hasNext ? `<button class="run-plaque sm" id="mNext"><span>Próxima ▶</span></button>` : `<button class="run-plaque sm" id="mMenu2"><span>Concluir</span></button>`}
      </div>`;
    this.q('#modal').classList.remove('hidden');
    box.querySelector('#mMenu')?.addEventListener('click', () => this.cb.menu());
    box.querySelector('#mMenu2')?.addEventListener('click', () => this.cb.menu());
    box.querySelector('#mRetry')?.addEventListener('click', () => this.cb.restart());
    box.querySelector('#mNext')?.addEventListener('click', () => this.cb.next());
  }
  private showFailure(m: GameManager): void {
    const box = this.q('#modalBox'); box.className = 'modal fail';
    box.innerHTML = `
      <div class="modal-title">Não foi dessa vez</div>
      <div class="modal-reason">${FAIL_TXT[m.failReason]}</div>
      <div class="modal-actions">
        <button class="wood-btn" id="fMenu">Fases</button>
        <button class="run-plaque sm" id="fRetry"><span>Tentar de novo</span></button>
      </div>`;
    this.q('#modal').classList.remove('hidden');
    box.querySelector('#fMenu')?.addEventListener('click', () => this.cb.menu());
    box.querySelector('#fRetry')?.addEventListener('click', () => this.cb.backPlanning());
  }
  private showPause(): void {
    const box = this.q('#modalBox'); box.className = 'modal';
    box.innerHTML = `
      <div class="modal-title">Pausado</div>
      <div class="modal-actions col">
        <button class="run-plaque sm" id="pResume"><span>▶ Retomar</span></button>
        <button class="wood-btn" id="pRestart">Reiniciar fase</button>
        <button class="wood-btn" id="pMenu">Sair para fases</button>
      </div>`;
    this.q('#modal').classList.remove('hidden');
    box.querySelector('#pResume')?.addEventListener('click', () => this.cb.pauseToggle());
    box.querySelector('#pRestart')?.addEventListener('click', () => this.cb.restart());
    box.querySelector('#pMenu')?.addEventListener('click', () => this.cb.menu());
  }

  private q(sel: string): HTMLElement { return this.root.querySelector(sel) as HTMLElement; }
}
