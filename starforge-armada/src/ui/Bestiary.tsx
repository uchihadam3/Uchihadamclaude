import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { ENEMIES_BY_SECTOR, SECTORS, EnemyDef } from '../data/enemiesData';
import { drawEnemyGen } from '../render/enemyGen';
import { sfx } from '../game/audio';

function paint(cv: HTMLCanvasElement, e: EnemyDef, t: number): void {
  const ctx = cv.getContext('2d'); if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = cv.clientWidth, h = cv.clientHeight;
  if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
  const S = Math.min(w, h) * (e.elite ? 0.24 : 0.3);
  drawEnemyGen(ctx, e.arch, w / 2, h * 0.5, S, t + e.id.length, 0, e.pal);
}

export default function Bestiary(props: { onBack: () => void }): JSX.Element {
  const cards = useRef<Map<string, HTMLCanvasElement>>(new Map());
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const loop = (now: number) => { const t = (now - start) / 1000; for (const [, cv] of cards.current) { const id = cv.dataset.id!; const e = FIND[id]; if (e) paint(cv, e, t); } raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="hangar">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Bestiário · <span>Setores</span></div>
        <div className="hangar-count">{ENEMIES_BY_SECTOR.flat().length} inimigos</div>
      </div>
      {SECTORS.map((s, si) => (
        <div key={si} className="bestiary-sector">
          <div className="bestiary-sector-name"><span className="bs-num">{String(si + 1).padStart(2, '0')}</span>{s.name}</div>
          <div className="bestiary-grid">
            {ENEMIES_BY_SECTOR[si].map((e) => (
              <div key={e.id} className={`enemy-card ${e.elite ? 'elite' : ''}`}>
                <canvas className="enemy-canvas" data-id={e.id} ref={(el) => { if (el) { el.dataset.id = e.id; cards.current.set(e.id, el); } else cards.current.delete(e.id); }} />
                <div className="enemy-name">{e.name}</div>
                {e.elite && <div className="enemy-tag">Chefe</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const FIND: Record<string, EnemyDef> = {};
for (const e of ENEMIES_BY_SECTOR.flat()) FIND[e.id] = e;
