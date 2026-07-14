/* ============================================================
   KOTOBA: Fragmentos de Memória — bootstrap.
   Phaser (cenário/FX) + camada HTML (UI). Fluxo da demo: título →
   combates com recompensas → elite → vitória. Aprendizado invisível.
   ============================================================ */
import './styles/index.css';
import Phaser from 'phaser';
import { BattleScene } from './game/scenes/BattleScene';
import { CombatEngine } from './game/combat/engine';
import { CombatUI } from './ui/combat/CombatUI';
import { LearningEngine } from './learning/mastery/engine';
import { CARDS, CARD_BY_ID, STARTER_DECK } from './data/cards/cards';
import { ENEMIES, ENCOUNTERS } from './data/enemies/enemies';
import { renderMiniCard } from './ui/cards/render';
import { audio } from './game/audio/audio';
import type { CardInstance, Combatant, CardDef } from './game/combat/types';
import { ECO_LABEL } from './learning/mastery/engine';

const uiLayer = document.getElementById('ui-layer')!;
let uid = 0;
const inst = (defId: string): CardInstance => ({ uid: 'c' + (++uid), defId, upgraded: false });

/* ---------- Phaser ---------- */
const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'phaser-layer',
  backgroundColor: '#0e0b09',
  scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
  scene: [BattleScene],
  render: { antialias: true, powerPreference: 'low-power' },
  audio: { noAudio: true },   // usamos WebAudio próprio (audio.ts)
});
const scene = () => game.scene.getScene('battle') as BattleScene;

/* ---------- estado da run ---------- */
interface Run { deck: CardInstance[]; hp: number; maxHp: number; step: number; symbols: number; }
const learn = new LearningEngine();
let run: Run;
const SEQUENCE: { enc: string; mood: 'floresta' | 'cidade' | 'palacio'; kind: 'comum' | 'elite' }[] = [
  { enc: 'comum1', mood: 'floresta', kind: 'comum' },
  { enc: 'comum2', mood: 'floresta', kind: 'comum' },
  { enc: 'elite', mood: 'floresta', kind: 'elite' },
];

function newRun(): void {
  run = { deck: STARTER_DECK.map(inst), hp: 60, maxHp: 60, step: 0, symbols: 0 };
}

/* ---------- telas ---------- */
function clearScreens(): void { uiLayer.querySelectorAll('.screen, .combat-root, .hintline').forEach((e) => e.remove()); }
function screen(html: string, cls = ''): HTMLElement {
  const s = document.createElement('div'); s.className = 'screen ' + cls; s.innerHTML = html;
  uiLayer.appendChild(s); return s;
}

function showTitle(): void {
  clearScreens();
  scene()?.setMood?.('floresta');
  const s = screen(`
    <div class="seal-mark big-seal jp">言</div>
    <div class="title-crest jp">言葉</div>
    <div class="title-name">KOTOBA</div>
    <div class="title-sub">Fragmentos de Memória</div>
    <div class="title-tag">O mundo perdeu seus nomes. Recupere os <b>Ecos</b> — cartas vivas de fogo, água e vento — e devolva a memória ao que se apaga.</div>
    <div class="title-rule"></div>
    <div class="title-actions">
      <button class="btn primary" id="play">Começar a Jornada</button>
      <button class="btn ghost" id="codex">Arquivo dos Ecos</button>
    </div>
    <div class="title-foot">demo · vertical slice</div>`);
  s.querySelector('#play')!.addEventListener('click', () => { audio.resume(); audio.ui(); newRun(); startEncounter(); });
  s.querySelector('#codex')!.addEventListener('click', () => { audio.ui(); showCodex(); });
}

function startEncounter(): void {
  clearScreens();
  const step = SEQUENCE[run.step];
  scene()?.setMood?.(step.mood);
  const engine = new CombatEngine({ getCardDef: (id) => CARD_BY_ID.get(id)! });
  const player: Combatant = { id: 'player', name: 'Portador dos Ecos', hp: run.hp, maxHp: run.maxHp, block: 0, statuses: {}, isPlayer: true };
  const enemyDefs = ENCOUNTERS[step.enc].map((k) => ENEMIES[k]);
  const cui = new CombatUI(engine, scene(), learn, uiLayer);
  cui.onEnd = (result) => {
    run.hp = engine.player.hp;
    cui.destroy();
    if (result === 'won') {
      run.symbols = learn.stats().discovered;
      if (run.step >= SEQUENCE.length - 1) showVictory();
      else showReward();
    } else showGameOver();
  };
  engine.start(run.deck, player, enemyDefs);
  cui.render();
  showHint(step.kind === 'elite'
    ? 'Elite: leia a intenção 攻/守 e prepare a defesa.'
    : 'Arraste... toque numa carta pra usar. Alguns Ecos dão bônus se você reconhecer o símbolo.');
}

function showHint(text: string): void {
  const h = document.createElement('div'); h.className = 'hintline'; h.style.top = '54%'; h.textContent = text;
  uiLayer.appendChild(h);
  setTimeout(() => h.remove(), 5200);
}

function showReward(): void {
  clearScreens();
  run.step++;
  run.hp = Math.min(run.maxHp, run.hp + 8);   // fôlego entre lutas
  const pool = CARDS.filter((c) => c.rarity !== 'comum' || Math.random() < 0.5);
  const picks = shuffle(pool).slice(0, 3);
  const s = screen(`
    <div class="reward-title">Ecos Recuperados</div>
    <div class="reward-sub">Escolha 1 Eco para o seu baralho — ou siga em frente.</div>
    <div class="reward-cards" id="rw"></div>
    <div class="title-actions">
      <button class="btn ghost" id="skip">Seguir sem escolher</button>
      <span style="align-self:center;color:var(--washi-2);font-size:12px">❖ +8 vida recuperada</span>
    </div>`, 'reward');
  const rw = s.querySelector('#rw')!;
  picks.forEach((def: CardDef) => {
    const el = renderMiniCard(def);
    el.addEventListener('click', () => { audio.discover(); run.deck.push(inst(def.id)); startEncounter(); });
    rw.appendChild(el);
  });
  s.querySelector('#skip')!.addEventListener('click', () => { audio.ui(); startEncounter(); });
}

function showVictory(): void {
  clearScreens();
  const st = learn.stats();
  const s = screen(`
    <div class="end-crest win jp">勝</div>
    <div class="title-name" style="font-size:26px">A Floresta Recorda</div>
    <div class="title-tag">Você devolveu os primeiros Ecos ao mundo. O caminho até a Cidade dos Ecos se abre adiante…</div>
    <div class="end-stats">
      <div class="end-stat"><div class="n">${st.discovered}</div><div class="l">Ecos despertos</div></div>
      <div class="end-stat"><div class="n">${run.deck.length}</div><div class="l">Cartas no baralho</div></div>
      <div class="end-stat"><div class="n">${run.hp}</div><div class="l">Vida restante</div></div>
    </div>
    <div class="title-actions"><button class="btn primary" id="again">Nova Jornada</button><button class="btn ghost" id="cx">Arquivo dos Ecos</button></div>`, 'end');
  s.querySelector('#again')!.addEventListener('click', () => { newRun(); startEncounter(); });
  s.querySelector('#cx')!.addEventListener('click', () => showCodex());
}

function showGameOver(): void {
  clearScreens();
  const s = screen(`
    <div class="end-crest lose jp">終</div>
    <div class="title-name" style="font-size:24px">O Eco se apagou</div>
    <div class="title-tag">Mas nenhuma memória se perde para sempre. Tente uma nova travessia.</div>
    <div class="title-actions"><button class="btn primary" id="retry">Tentar de Novo</button><button class="btn ghost" id="menu">Menu</button></div>`, 'end');
  s.querySelector('#retry')!.addEventListener('click', () => { newRun(); startEncounter(); });
  s.querySelector('#menu')!.addEventListener('click', () => showTitle());
}

function showCodex(): void {
  clearScreens();
  const items = CARDS.filter((c) => c.contentId).map((c) => {
    const state = learn.ecoState(c.contentId!);
    const known = !learn.isNew(c.contentId!);
    return `<div style="width:120px;text-align:center;opacity:${known ? 1 : .5}">
      <div class="jp" style="font-size:40px;color:var(--gold-bright)">${c.jp}</div>
      <div style="font-size:11px;color:var(--spirit)">${c.reading}</div>
      <div style="font-size:13px;color:var(--washi-0);font-weight:700">${known ? c.meaning : '???'}</div>
      <div style="font-size:9px;color:var(--washi-2);letter-spacing:.1em">${ECO_LABEL[state]}</div></div>`;
  }).join('');
  const s = screen(`
    <div class="reward-title jp">記 · Arquivo dos Ecos</div>
    <div class="reward-sub">Os símbolos que você já despertou nesta jornada.</div>
    <div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;max-width:720px;margin:16px 0;max-height:56vh;overflow:auto">${items}</div>
    <button class="btn" id="back">Voltar</button>`);
  s.querySelector('#back')!.addEventListener('click', () => run ? showTitle() : showTitle());
}

/* ---------- menu de pausa (acessibilidade + áudio) ---------- */
document.addEventListener('kotoba:menu', () => showMenu());
function showMenu(): void {
  const s = screen(`<div class="panel menu-panel">
    <h2 class="jp">設 · Ajustes</h2>
    <div class="menu-row"><span>Música</span><input type="range" min="0" max="1" step="0.05" value="${audio.vol.music}" data-ch="music"></div>
    <div class="menu-row"><span>Efeitos</span><input type="range" min="0" max="1" step="0.05" value="${audio.vol.sfx}" data-ch="sfx"></div>
    <div class="menu-row"><span>Voz japonesa</span><input type="range" min="0" max="1" step="0.05" value="${audio.vol.voice}" data-ch="voice"></div>
    <div class="menu-row"><span>Reduzir animações</span><div class="seg"><button data-rm="0" class="on">Não</button><button data-rm="1">Sim</button></div></div>
    <div class="menu-row"><span>Mudo</span><div class="seg"><button data-mute="0" class="on">Não</button><button data-mute="1">Sim</button></div></div>
    <button class="btn primary" id="close">Voltar ao combate</button>
    <button class="btn ghost" id="abandon">Abandonar jornada</button>
  </div>`);
  s.style.background = 'rgba(8,6,4,.7)';
  s.querySelectorAll('input[data-ch]').forEach((r) => r.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement; audio.setVol(t.dataset.ch as any, +t.value);
  }));
  s.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', (e) => {
    const on = (e.target as HTMLElement).dataset.rm === '1';
    document.body.classList.toggle('reduce-motion', on);
    s.querySelectorAll('[data-rm]').forEach((x) => x.classList.toggle('on', x === e.target));
  }));
  s.querySelectorAll('[data-mute]').forEach((b) => b.addEventListener('click', (e) => {
    const on = (e.target as HTMLElement).dataset.mute === '1'; audio.setMuted(on);
    s.querySelectorAll('[data-mute]').forEach((x) => x.classList.toggle('on', x === e.target));
  }));
  s.querySelector('#close')!.addEventListener('click', () => s.remove());
  s.querySelector('#abandon')!.addEventListener('click', () => { s.remove(); showTitle(); });
}

function shuffle<T>(a: T[]): T[] { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

/* ---------- start ---------- */
window.addEventListener('pointerdown', () => audio.resume(), { once: true });
game.events.once('ready', showTitle);
setTimeout(() => { if (!uiLayer.querySelector('.screen, .combat-root')) showTitle(); }, 400);
