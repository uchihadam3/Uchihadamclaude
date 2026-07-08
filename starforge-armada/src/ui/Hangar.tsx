import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { SHIPS, ShipDef } from '../data/shipsData';
import { drawShip } from '../render/shipGen';
import { sfx } from '../game/audio';

// Desenha uma nave animada num canvas (usado nos cards e no detalhe).
function paintShip(cv: HTMLCanvasElement, ship: ShipDef, t: number, big = false): void {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = cv.clientWidth, h = cv.clientHeight;
  if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  // fundo suave do card
  const bg = ctx.createRadialGradient(w / 2, h * 0.42, 4, w / 2, h * 0.5, Math.max(w, h) * 0.7);
  bg.addColorStop(0, 'rgba(60,90,150,0.16)');
  bg.addColorStop(1, 'rgba(8,12,26,0)');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  const S = Math.min(w, h) * (big ? 0.30 : 0.26);
  const tilt = Math.sin(t * 0.9 + ship.id.length) * 0.5;
  drawShip(ctx, w / 2, h * 0.52, S, ship.design, { tilt, thrust: 0.75, t, shield: big ? 0.6 : 0 });
}

export default function Hangar(props: { onBack: () => void }): JSX.Element {
  const [sel, setSel] = useState<ShipDef | null>(null);
  const cards = useRef<Map<string, HTMLCanvasElement>>(new Map());
  const detail = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let raf = 0; const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      for (const s of SHIPS) { const cv = cards.current.get(s.id); if (cv) paintShip(cv, s, t); }
      if (sel && detail.current) paintShip(detail.current, sel, t, true);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [sel]);

  return (
    <div className="hangar">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Hangar · <span>Armada</span></div>
        <div className="hangar-count">{SHIPS.filter(s => s.starter).length}/{SHIPS.length} liberadas</div>
      </div>

      <div className="hangar-grid">
        {SHIPS.map((s, i) => (
          <button key={s.id} className={`ship-card ${s.starter ? '' : 'locked'}`} onClick={() => { sfx.ui(); setSel(s); }}>
            <div className="ship-num">{String(i + 1).padStart(2, '0')}</div>
            {!s.starter && <div className="ship-lock">◈</div>}
            <canvas className="ship-canvas" ref={(el) => { if (el) cards.current.set(s.id, el); else cards.current.delete(s.id); }} />
            <div className="ship-name">{s.name}</div>
            <div className="ship-klass">{s.klass}</div>
            <div className="ship-mastery">{'★'.repeat(s.mastery)}<span>{'★'.repeat(5 - s.mastery)}</span></div>
          </button>
        ))}
      </div>

      {sel && (
        <div className="ship-modal-bg" onClick={() => setSel(null)}>
          <div className="ship-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setSel(null)}>✕</button>
            <div className="modal-stage">
              <canvas ref={detail} className="modal-canvas" />
              {!sel.starter && <div className="modal-locktag">◈ Bloqueada</div>}
            </div>
            <div className="modal-info">
              <div className="modal-name">{sel.name}</div>
              <div className="modal-klass">{sel.klass}</div>
              <div className="modal-bio">{sel.bio}</div>
              <div className="stat-grid">
                <Stat label="Casco" v={sel.stats.hp} max={180} c="#ff7a6a" />
                <Stat label="Escudo" v={sel.stats.shield} max={140} c="#5ad0ff" />
                <Stat label="Velocidade" v={sel.stats.speed} max={100} c="#8af0ff" />
                <Stat label="Potência" v={sel.stats.power} max={100} c="#ffd24a" />
                <Stat label="Manobra" v={sel.stats.handling} max={100} c="#8affc0" />
              </div>
              <div className="skill-list">
                <Sk tag="Primário" name={sel.primary} />
                <Sk tag="Habilidade" name={sel.ability.name} desc={sel.ability.desc} />
                <Sk tag="Ultimate" name={sel.ultimate.name} desc={sel.ultimate.desc} gold />
                <Sk tag="Passiva" name={sel.passive.name} desc={sel.passive.desc} />
              </div>
              <div className={`unlock-line ${sel.starter ? 'ok' : ''}`}>{sel.starter ? '✓ Liberada desde o início' : '◈ ' + sel.unlock}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat(props: { label: string; v: number; max: number; c: string }): JSX.Element {
  return (
    <div className="stat">
      <div className="stat-top"><span>{props.label}</span><span>{props.v}</span></div>
      <div className="stat-track"><div className="stat-fill" style={{ width: `${Math.min(100, (props.v / props.max) * 100)}%`, background: props.c }} /></div>
    </div>
  );
}
function Sk(props: { tag: string; name: string; desc?: string; gold?: boolean }): JSX.Element {
  return (
    <div className={`sk ${props.gold ? 'gold' : ''}`}>
      <span className="sk-tag">{props.tag}</span>
      <div><span className="sk-name">{props.name}</span>{props.desc && <div className="sk-desc">{props.desc}</div>}</div>
    </div>
  );
}
