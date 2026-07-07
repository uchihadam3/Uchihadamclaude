import { useEffect, useReducer, useRef } from 'react';
import type { JSX } from 'react';
import { Store, setSpeed, togglePause, abandonRun, noteRunOverIfNeeded, DUNGEON_BY_ID, SKILLS_BY_HERO } from '../game/store';
import { stepRun } from '../game/combat';
import { drawScene } from '../render/scene';
import { resumeAudio, Sfx } from '../game/audio';
import { fmtTime, Glyph, useStore } from './bits';
import { HERO_BY_ID } from '../data/heroesData';

export function RunScreen(): JSX.Element {
  useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [, force] = useReducer((x) => x + 1, 0);
  const overHold = useRef(0);
  const lastPhase = useRef('');
  const lastLog = useRef(0);

  useEffect(() => {
    resumeAudio();
    const cv = canvasRef.current!, wrap = wrapRef.current!;
    const ctx = cv.getContext('2d')!;
    let raf = 0, prev = performance.now(), hudT = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { cv.width = wrap.clientWidth * dpr; cv.height = wrap.clientHeight * dpr; };
    resize();
    window.addEventListener('resize', resize);

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      const c = Store.ctrl;
      const W = cv.width / dpr, H = cv.height / dpr;
      if (c) {
        const run = c.run;
        // som de transições
        if (run.phase !== lastPhase.current) {
          if (run.phase === 'boss-intro') Sfx.bossPhase();
          lastPhase.current = run.phase;
        }
        // som por eventos do log (fase de chefe, poção)
        if (run.log.length !== lastLog.current) {
          const last = run.log[run.log.length - 1];
          if (last && /fase \d/.test(last.msg)) Sfx.bossPhase();
          lastLog.current = run.log.length;
        }
        // avança a simulação (aceleração = múltiplos passos)
        if (!Store.paused && !run.over) {
          for (let i = 0; i < Store.speed && !run.over; i++) stepRun(c, dt);
        }
        // desenha
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const scrollX = run.roomIndex * 180 + run.hero.x * 22 + run.t * 6;
        drawScene(ctx, W, H, run, DUNGEON_BY_ID[run.dungeonId], run.t, dt * (Store.paused ? 0 : Store.speed), scrollX);
        // fim de expedição — segura a animação e comita
        if (run.over) {
          overHold.current += dt;
          if (overHold.current > 2.4) { overHold.current = 0; noteRunOverIfNeeded(); return; }
        }
        // HUD ~14fps
        hudT += dt; if (hudT > 0.07) { hudT = 0; force(); }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const c = Store.ctrl;
  if (!c) return <div className="screen center" style={{ display: 'grid' }}>...</div>;
  const run = c.run;
  const hero = run.hero;
  const d = DUNGEON_BY_ID[run.dungeonId];
  const skills = SKILLS_BY_HERO[run.heroId];
  const hpPct = Math.max(0, (hero.hp / hero.maxHp) * 100);
  const shieldPct = Math.min(100, (hero.shield / hero.maxHp) * 100);
  const pal = HERO_BY_ID[run.heroId].palette;

  return (
    <div className="screen">
      <div className="run-wrap" ref={wrapRef}>
        <canvas className="run-canvas" ref={canvasRef} />
        {run.phase === 'boss-intro' && <div className="boss-banner">{d.boss ? nomeChefe(run.dungeonId) : 'CHEFE'}</div>}
        <div className="run-hud">
          <div className="hud-top">
            <div className="hero-vitals">
              <div className="row between" style={{ marginBottom: 6 }}>
                <b style={{ color: pal.glow }}>{hero.nome}</b>
                <span className="tiny">{d.nome}</span>
              </div>
              <div className="hp-track">
                <div className="hp-fill" style={{ width: `${hpPct}%` }} />
                <div className="hp-shield" style={{ width: `${shieldPct}%` }} />
                <div className="hp-text">{Math.ceil(hero.hp)} / {hero.maxHp}{hero.shield > 0 ? ` (+${Math.ceil(hero.shield)})` : ''}</div>
              </div>
              <div className="prog-track"><div className="prog-fill" style={{ width: `${run.progress * 100}%` }} /></div>
              <div className="row between tiny" style={{ marginTop: 3 }}>
                <span>Sala {Math.min(run.roomIndex + 1, run.totalRooms)}/{run.totalRooms}</span>
                <span>{fmtTime(run.t)}</span>
              </div>
              <div className="potions" title="Poções de cura">
                {Array.from({ length: run.potion.charges + run.potionsUsed }).map((_, i) => (
                  <div key={i} className={'pot' + (i >= run.potion.charges ? ' spent' : '')} />
                ))}
              </div>
            </div>
            <div className="col" style={{ alignItems: 'flex-end', gap: 8 }}>
              <div className="row" style={{ gap: 6 }}>
                <button className="icon-btn" onClick={togglePause} title="Pausar">{Store.paused ? <Play /> : <Pause />}</button>
                <button className="icon-btn" onClick={() => { if (confirm('Abandonar a expedição?')) abandonRun(); }} title="Abandonar">✕</button>
              </div>
              <div className="skill-pips">
                {skills.map((sk, i) => {
                  const cd = run.skillCds[i]; const max = c.loadout.skills[i].effCooldown;
                  const frac = max > 0 ? Math.max(0, cd / max) : 0;
                  return (
                    <div className="pip" key={sk.id} title={sk.nome}>
                      <Glyph icon={sk.icon} size={24} color={pal.glow} />
                      <div className="cd" style={{ height: `${frac * 100}%` }} />
                      <span className="lv">{c.loadout.skills[i].level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hud-bottom">
            {Store.save.settings.showLog ? (
              <div className="combat-log">
                {run.log.slice(-7).map((l, i) => <div key={i} className={'log-line ' + l.kind}>{l.msg}</div>)}
              </div>
            ) : <div />}
            <div className="speed-row">
              {([1, 2, 4] as const).map((s) => (
                <button key={s} className={'speed-btn' + (Store.speed === s ? ' on' : '')} onClick={() => setSpeed(s)}>{s}×</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function nomeChefe(dungeonId: number): string {
  const d = DUNGEON_BY_ID[dungeonId];
  return d.nome.toUpperCase();
}

function Pause(): JSX.Element { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>; }
function Play(): JSX.Element { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z" /></svg>; }
