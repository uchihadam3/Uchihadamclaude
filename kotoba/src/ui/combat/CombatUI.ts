/* ============================================================
   KOTOBA — CombatUI: liga o motor de combate à camada HTML e aos
   FX do Phaser. Mão, inimigo com intenção, energia, e a integração
   japonesa (bônus de domínio) sem quebrar o ritmo.
   ============================================================ */
import type { CombatEngine, CombatEvent } from '../../game/combat/engine';
import type { BattleScene } from '../../game/scenes/BattleScene';
import type { CardDef, CardInstance, Combatant, Intent, StatusId } from '../../game/combat/types';
import { CARD_BY_ID } from '../../data/cards/cards';
import { STATUS } from '../../game/combat/status';
import { enemyArt } from '../../game/enemies/art';
import { renderCard } from '../cards/render';
import { audio } from '../../game/audio/audio';
import type { LearningEngine } from '../../learning/mastery/engine';
import { ECO_LABEL } from '../../learning/mastery/engine';

const GLOW_INT: Record<string, number> = { fire: 0xe06e3c, water: 0x5aa0f0, wind: 0xbedcc8, wood: 0x82be5a, light: 0xffdc78, dark: 0x966ed2, none: 0xbfead0 };

export class CombatUI {
  private root: HTMLElement;
  private busy = false;              // trava durante desafio/animação de inimigo
  onEnd: (result: 'won' | 'lost') => void = () => {};

  constructor(private engine: CombatEngine, private scene: BattleScene, private learn: LearningEngine, parent: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'combat-root';
    this.root.style.cssText = 'position:absolute;inset:0;';
    parent.appendChild(this.root);
    this.build();
    this.engine.on((e) => this.onEvent(e));
  }

  destroy(): void { this.root.remove(); }

  private build(): void {
    this.root.innerHTML = `
      <div class="combat-top">
        <div class="vitals" id="pl-vitals"></div>
        <button class="btn ghost" id="menu-btn" style="padding:8px 12px;font-size:18px">☰</button>
      </div>
      <div class="enemy-stage" id="enemy-stage"></div>
      <div class="combat-bottom">
        <div style="display:flex;align-items:flex-end;gap:12px">
          <div><div class="energy-orb"><div class="ring"></div><div class="val" id="energy">3<small>/3</small></div></div><div class="energy-label">Energia</div></div>
          <div class="pile"><div class="disc" id="draw-n">0</div><span>Baralho</span></div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:12px">
          <div class="pile"><div class="disc" id="disc-n">0</div><span>Descarte</span></div>
          <button class="end-turn" id="end-turn">Encerrar<br><span class="jp" style="font-size:13px;opacity:.8">終 · Turno</span></button>
        </div>
      </div>
      <div class="hand" id="hand"></div>
      <div class="bonus-challenge" id="bonus"></div>
      <div class="eco-toast" id="eco-toast"></div>
      <div class="tooltip" id="tooltip"></div>`;
    this.$('#end-turn').addEventListener('click', () => this.onEndTurn());
    this.$('#menu-btn').addEventListener('click', () => document.dispatchEvent(new CustomEvent('kotoba:menu')));
    this.render();
  }
  private $(sel: string): HTMLElement { return this.root.querySelector(sel) as HTMLElement; }

  /* ---------------- render de estado ---------------- */
  render(): void {
    const s = this.engine.snapshot();
    this.renderVitals(this.$('#pl-vitals'), s.player, false);
    this.renderEnemies(s.enemies);
    this.$('#energy').innerHTML = `${s.energy}<small>/${s.maxEnergy}</small>`;
    this.$('#draw-n').textContent = String(s.drawCount);
    this.$('#disc-n').textContent = String(s.discardCount);
    this.renderHand(s.hand);
    const et = this.$('#end-turn');
    et.classList.toggle('enemy-turn', s.phase !== 'player' || this.busy);
  }

  private renderVitals(host: HTMLElement, c: Combatant, isEnemy: boolean): void {
    const pct = Math.max(0, (c.hp / c.maxHp) * 100);
    const statuses = (Object.keys(c.statuses) as StatusId[]).filter((k) => (c.statuses[k] ?? 0) !== 0);
    host.innerHTML = `
      <div class="name">${isEnemy ? `<span class="jp">${c.jp ?? ''}</span> ` : '❖ '}${c.name}
        <span class="block-badge ${c.block ? '' : 'zero'}">🛡 ${c.block}</span></div>
      <div class="hpbar"><div class="fill" style="width:${pct}%"></div><div class="txt">${c.hp} / ${c.maxHp}</div></div>
      <div class="status-row">${statuses.map((id) => {
        const d = STATUS[id];
        return `<span class="status-chip ${d.kind}" title="${d.name}: ${d.desc}"><span class="jp">${d.jp}</span> ${c.statuses[id]}</span>`;
      }).join('')}</div>`;
  }

  private renderEnemies(enemies: Combatant[]): void {
    const stage = this.$('#enemy-stage');
    stage.innerHTML = '';
    for (const e of enemies) {
      if (e.hp <= 0) continue;
      const unit = document.createElement('div');
      unit.className = 'enemy-unit';
      unit.dataset.eid = e.id;
      const intent = this.engine.intentOf(e.id);
      unit.innerHTML = `
        ${intent ? this.intentHtml(intent) : ''}
        <div class="vitals enemy-vitals"></div>
        <div class="enemy-body" data-body="${e.id}"></div>`;
      const body = unit.querySelector('.enemy-body') as HTMLElement;
      body.style.backgroundImage = enemyArt(e.id);   // id do inimigo = chave da arte
      this.renderVitals(unit.querySelector('.enemy-vitals') as HTMLElement, e, true);
      // clique no inimigo confirma alvo quando há carta selecionada
      unit.addEventListener('click', () => this.onEnemyClick(e.id));
      stage.appendChild(unit);
    }
  }
  private intentHtml(i: Intent): string {
    const cls = i.kind;
    const amt = i.amount != null ? `<span class="amt">${i.amount}${i.hits && i.hits > 1 ? `×${i.hits}` : ''}</span>` : '';
    return `<div class="intent"><div class="glyph ${cls}">${i.jp}</div><div><div class="lbl">${i.label}</div>${amt}</div></div>`;
  }

  /* ---------------- mão ---------------- */
  private selectedUid: string | null = null;
  private renderHand(hand: CardInstance[]): void {
    const host = this.$('#hand');
    host.innerHTML = '';
    const n = hand.length;
    hand.forEach((inst, i) => {
      const def = CARD_BY_ID.get(inst.defId)!;
      const el = renderCard(inst, def);
      // leque
      const spread = Math.min(9, n) ;
      const mid = (n - 1) / 2;
      const rot = (i - mid) * (spread > 1 ? 3.2 : 0);
      const lift = Math.abs(i - mid) * -5;
      el.style.transform = `translateY(${lift}px) rotate(${rot}deg)`;
      el.style.zIndex = String(10 + i);
      const playable = this.engine.canPlay(inst.uid);
      el.classList.add(playable ? 'playable' : 'unplayable');
      if (this.selectedUid === inst.uid) el.classList.add('selected');
      el.addEventListener('mouseenter', () => { if (!this.busy) audio.hover(); });
      el.addEventListener('click', (ev) => { ev.stopPropagation(); this.onCardClick(inst, def); });
      host.appendChild(el);
    });
  }

  private onCardClick(inst: CardInstance, def: CardDef): void {
    if (this.busy || this.engine.snapshot().phase !== 'player') return;
    if (!this.engine.canPlay(inst.uid)) { audio.soft(); this.pulseEnergy(); return; }
    const enemiesAlive = this.engine.enemies.filter((e) => e.hp > 0);
    if (def.targeting === 'enemy' && enemiesAlive.length > 1 && this.selectedUid !== inst.uid) {
      this.selectedUid = inst.uid; this.render(); audio.ui();
      this.$('#enemy-stage').classList.add('targeting');
      return;
    }
    const targetId = def.targeting === 'enemy' ? enemiesAlive[0]?.id : undefined;
    this.playCard(inst, def, targetId);
  }
  private onEnemyClick(eid: string): void {
    if (!this.selectedUid) return;
    const inst = this.engine.hand.find((h) => h.uid === this.selectedUid);
    if (!inst) { this.selectedUid = null; return; }
    const def = CARD_BY_ID.get(inst.defId)!;
    this.selectedUid = null;
    this.$('#enemy-stage').classList.remove('targeting');
    this.playCard(inst, def, eid);
  }

  private playCard(inst: CardInstance, def: CardDef, targetId?: string): void {
    this.selectedUid = null;
    // anima a carta saindo
    const el = this.$('#hand').querySelector(`[data-uid="${inst.uid}"]`) as HTMLElement | null;
    if (el) el.classList.add('playing');
    audio.cardPlay();
    // resolve a BASE imediatamente (combate nunca trava)
    this.engine.playCard(inst.uid, 'none', targetId);
    this.render();
    // integração japonesa: bônus de domínio (só cartas com conteúdo + bônus)
    const hasBonus = !!def.contentId && !!(inst.upgraded && def.upgrade?.bonusEffects ? def.upgrade.bonusEffects : def.bonusEffects);
    if (hasBonus && def.contentId) {
      if (this.learn.isNew(def.contentId)) this.showDiscovery(def, inst, targetId);
      else this.showChallenge(def, inst, targetId);
    } else {
      this.afterPlayCheck();
    }
  }

  /* ---------------- desafio de bônus (reconhecimento rápido) ---------------- */
  private showChallenge(def: CardDef, inst: CardInstance, targetId?: string): void {
    const ch = this.learn.createContextualChallenge({ contentId: def.contentId!, context: 'card_bonus' });
    audio.speak(def.jp);
    this.busy = true; this.render();
    const box = this.$('#bonus');
    box.innerHTML = `
      <div class="bonus-card">
        <div class="timer" style="width:100%"></div>
        <div class="head">
          <div class="big-jp">${ch.content.japanese}</div>
          <div class="prompt"><div class="q">${ch.prompt}</div><div class="hint">Reconhecer desperta o Eco (bônus)</div></div>
        </div>
        <div class="bonus-opts">${ch.options.map((o, i) => `<button class="bonus-opt" data-i="${i}">${o.label}</button>`).join('')}</div>
      </div>`;
    box.classList.add('show');
    const start = performance.now();
    const timer = box.querySelector('.timer') as HTMLElement;
    requestAnimationFrame(() => { timer.style.transition = `width ${ch.timeMs}ms linear`; timer.style.width = '0%'; });
    let done = false;
    const finish = (idx: number) => {
      if (done) return; done = true;
      clearTimeout(to);
      const res = this.learn.evaluateAnswer({ challengeId: ch.id, submittedIndex: idx, responseTimeMs: performance.now() - start, hintsUsed: 0 });
      const opts = box.querySelectorAll('.bonus-opt');
      const correctIdx = ch.options.findIndex((o) => o.correct);
      opts.forEach((b, i) => { if (i === correctIdx) b.classList.add(res.correct ? 'correct' : 'reveal'); if (i === idx && !res.correct) b.classList.add('wrong'); (b as HTMLButtonElement).disabled = true; });
      if (res.correct) {
        audio.correct();
        this.engine.applyCardBonus(def, inst.upgraded, targetId);
        this.flashBonus(def);
      } else {
        // erro gentil: revela sem punir
        audio.soft();
        box.querySelector('.bonus-card')!.insertAdjacentHTML('beforeend',
          `<div class="bonus-reveal"><span class="jp">${ch.content.japanese}</span> <span class="rd">(${ch.content.reading})</span> — <b>${ch.content.meaningPtBr}</b></div>`);
      }
      setTimeout(() => { box.classList.remove('show'); this.busy = false; this.render(); this.afterPlayCheck(); }, res.correct ? 620 : 1200);
    };
    box.querySelectorAll('.bonus-opt').forEach((b) => b.addEventListener('click', () => finish(Number((b as HTMLElement).dataset.i))));
    const to = setTimeout(() => finish(-1), ch.timeMs + 60);
  }

  // primeira aparição de um Eco: revelação por associação (arte/leitura/áudio),
  // concede o bônus como presente e ensina sem cara de prova
  private showDiscovery(def: CardDef, inst: CardInstance, targetId?: string): void {
    const ch = this.learn.createContextualChallenge({ contentId: def.contentId!, context: 'card_bonus' });
    this.busy = true; this.render();
    audio.discover(); audio.speak(def.jp);
    const box = this.$('#bonus');
    box.innerHTML = `
      <div class="bonus-card" style="text-align:center">
        <div class="head" style="justify-content:center">
          <div class="big-jp" style="font-size:60px">${ch.content.japanese}</div>
        </div>
        <div class="bonus-reveal" style="font-size:14px">
          <div class="rd" style="font-size:13px">${ch.content.reading}</div>
          <div style="font-size:20px;font-weight:700;color:#22190f;margin:2px 0">${ch.content.meaningPtBr}</div>
          <div style="font-size:11px;color:#8a7048">✦ Novo Eco desperto — bônus concedido</div>
        </div>
        <div class="bonus-opts" style="grid-template-columns:1fr"><button class="bonus-opt" id="disc-ok">Absorver o Eco 🔊</button></div>
      </div>`;
    box.classList.add('show');
    // marca como visto (agenda no FSRS como 'correct') e concede bônus
    const correctIdx = ch.options.findIndex((o) => o.correct);
    this.learn.evaluateAnswer({ challengeId: ch.id, submittedIndex: correctIdx, responseTimeMs: 2500, hintsUsed: 0 });
    this.engine.applyCardBonus(def, inst.upgraded, targetId);
    this.flashBonus(def);
    const close = () => { box.classList.remove('show'); this.busy = false; this.render(); this.afterPlayCheck(); };
    (box.querySelector('#disc-ok') as HTMLElement).addEventListener('click', () => { audio.speak(def.jp); this.showEcoToast(def); close(); });
    setTimeout(close, 4200);
  }

  private flashBonus(def: CardDef): void {
    const rect = this.enemyRect(def.targeting === 'self' ? 'player' : undefined);
    this.scene.burst(GLOW_INT[def.element ?? 'none'], rect.fx, rect.fy, 18);
    this.scene.flash(GLOW_INT[def.element ?? 'none'], 90);
  }
  private showEcoToast(def: CardDef): void {
    const t = this.$('#eco-toast');
    const state = this.learn.ecoState(def.contentId!);
    t.innerHTML = `<div class="big-jp jp">${def.jp}</div>
      <div class="lines"><div class="l1">${ECO_LABEL[state]}</div><div class="l2">${def.meaning}</div><div class="l3">${def.reading}</div></div>`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }
  private pulseEnergy(): void { const o = this.$('#energy'); o.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 260 }); }

  /* ---------------- fim de turno / inimigos ---------------- */
  private onEndTurn(): void {
    if (this.busy || this.engine.snapshot().phase !== 'player') return;
    this.selectedUid = null;
    this.engine.endTurn();
  }
  private async runEnemyPhase(): Promise<void> {
    this.busy = true; this.render();
    const enemies = this.engine.enemies.filter((e) => e.hp > 0);
    for (const e of enemies) {
      if (this.engine.snapshot().phase !== 'enemy') break;
      const body = this.$('#enemy-stage').querySelector(`[data-eid="${e.id}"] .enemy-body`) as HTMLElement | null;
      const intent = this.engine.intentOf(e.id);
      if (body && intent?.kind === 'atk') { body.classList.add('attacking'); }
      await wait(280);
      this.engine.runEnemy(e.id);
      this.render();
      if (body) body.classList.remove('attacking');
      await wait(420);
    }
    this.busy = false;
    this.engine.finishEnemyPhase();
    this.render();
  }

  private afterPlayCheck(): void {
    const s = this.engine.snapshot();
    if (s.phase === 'won') { setTimeout(() => this.onEnd('won'), 500); }
    else if (s.phase === 'lost') { setTimeout(() => this.onEnd('lost'), 500); }
  }

  /* ---------------- eventos do motor → FX ---------------- */
  private onEvent(e: CombatEvent): void {
    switch (e.t) {
      case 'turnStart': this.render(); break;
      case 'enemyTurn': this.runEnemyPhase(); break;
      case 'draw': this.render(); break;
      case 'damage': {
        const isPlayer = e.targetId === 'player';
        if (e.amount > 0) {
          if (isPlayer) { audio.hurt(); this.scene.shake(0.006); }
          else { audio.enemyHit(); this.pulseBody(e.targetId); this.scene.shake(0.004); }
          this.floatNumber(e.targetId, `-${e.amount}`, 'dmg');
          const r = this.enemyRect(isPlayer ? 'player' : e.targetId);
          this.scene.burst(isPlayer ? 0xd0432f : 0xffd7a0, r.fx, r.fy, 10);
        } else if (e.blocked > 0) { audio.block(); this.floatNumber(e.targetId, `🛡`, 'block'); }
        break;
      }
      case 'block': audio.block(); this.floatNumber(e.targetId, `+${e.amount}`, 'block'); break;
      case 'heal': audio.heal(); this.floatNumber(e.targetId, `+${e.amount}`, 'heal'); { const r = this.enemyRect('player'); this.scene.burst(0x82be5a, r.fx, r.fy, 10); } break;
      case 'combo': this.comboPop(e.label); break;
      case 'enemyAct': break;
      case 'win': audio.win(); break;
      case 'lose': audio.lose(); break;
    }
  }

  private pulseBody(eid: string): void {
    const body = this.$('#enemy-stage').querySelector(`[data-eid="${eid}"] .enemy-body`) as HTMLElement | null;
    if (body) { body.classList.remove('hurt'); void body.offsetWidth; body.classList.add('hurt'); }
  }
  private enemyRect(which?: string): { fx: number; fy: number } {
    let el: HTMLElement | null = null;
    if (which === 'player') el = this.$('#pl-vitals');
    else if (which) el = this.$('#enemy-stage').querySelector(`[data-eid="${which}"] .enemy-body`) as HTMLElement;
    else el = this.$('#enemy-stage').querySelector('.enemy-body') as HTMLElement;
    if (!el) return { fx: 0.5, fy: 0.4 };
    const r = el.getBoundingClientRect();
    return { fx: (r.left + r.width / 2) / window.innerWidth, fy: (r.top + r.height / 2) / window.innerHeight };
  }
  private floatNumber(targetId: string, text: string, kind: 'dmg' | 'block' | 'heal'): void {
    const r = this.enemyRect(targetId === 'player' ? 'player' : targetId);
    const el = document.createElement('div');
    el.className = `float-num ${kind}`;
    el.textContent = text;
    el.style.left = `${r.fx * 100}%`; el.style.top = `${r.fy * 100}%`;
    this.root.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
  private comboPop(label: string): void {
    const el = document.createElement('div'); el.className = 'combo-pop'; el.textContent = label;
    this.root.appendChild(el); setTimeout(() => el.remove(), 1100);
  }
}

function wait(ms: number): Promise<void> { return new Promise((r) => setTimeout(r, ms)); }
