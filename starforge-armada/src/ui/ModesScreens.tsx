import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { MODES, ModeDef, RELICS } from '../data/modesData';
import { SHIPS } from '../data/shipsData';
import { drawShip } from '../render/shipGen';
import type { Orient } from '../game/engine';
import { sfx } from '../game/audio';

// picker de nave reutilizável (retratos animados)
function ShipPicker(props: { ship: string; onPick: (id: string) => void }): JSX.Element {
  const picks = SHIPS.filter((s) => s.starter);
  const cvs = useRef<Map<string, HTMLCanvasElement>>(new Map());
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      for (const s of picks) { const cv = cvs.current.get(s.id); if (!cv) continue; const ctx = cv.getContext('2d'); if (!ctx) continue; const dpr = Math.min(2, devicePixelRatio || 1); const w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; } ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h); drawShip(ctx, w / 2, h * 0.54, Math.min(w, h) * 0.3, s.design, { tilt: Math.sin(t + s.id.length) * 0.4, thrust: 0.8, t }); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="story-picks">
      {picks.map((s) => (
        <button key={s.id} className={`story-pick ${props.ship === s.id ? 'sel' : ''}`} onClick={() => { sfx.ui(); props.onPick(s.id); }}>
          <canvas ref={(el) => { if (el) cvs.current.set(s.id, el); else cvs.current.delete(s.id); }} />
          <span>{s.name}</span>
        </button>
      ))}
    </div>
  );
}

export function ModesScreen(props: { onSelect: (m: ModeDef) => void; onBack: () => void }): JSX.Element {
  return (
    <div className="hangar">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Modos · <span>{MODES.length}</span></div>
        <div className="hangar-count">arcade & desafios</div>
      </div>
      <div className="modes-grid">
        {MODES.map((m) => (
          <button key={m.id} className="mode-card" style={{ ['--mc' as any]: m.color }} onClick={() => { sfx.ui(); props.onSelect(m); }}>
            <div className="mode-ico" style={{ color: m.color }}>{m.icon}</div>
            <div className="mode-name">{m.name}</div>
            <div className="mode-desc">{m.desc}</div>
            <div className="mode-tags">
              <span className="mtag">{m.orient === 'arena' ? 'Arena 360°' : m.orient === 'horizontal' ? 'Horizontal' : 'Vertical'}</span>
              <span className="mtag">{m.lives === 1 ? '1 vida' : `${m.lives} vidas`}</span>
              {m.bossRush && <span className="mtag">Chefes</span>}
              {m.relics && <span className="mtag">Relíquias</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ModeSetup(props: { mode: ModeDef; onLaunch: (shipId: string, relics: string[]) => void; onBack: () => void }): JSX.Element {
  const [ship, setShip] = useState('falcon');
  const [offer] = useState(() => [...RELICS].sort(() => Math.random() - 0.5).slice(0, 3));
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => { sfx.ui(); setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : p.length < 2 ? [...p, id] : p); };
  return (
    <div className="story-intro">
      <div className="story-box">
        <div className="story-kicker" style={{ color: props.mode.color }}>{props.mode.orient === 'arena' ? 'Arena 360°' : props.mode.orient === 'horizontal' ? 'Rotação Horizontal' : 'Modo'}</div>
        <div className="story-title">{props.mode.name}</div>
        <div className="story-lines"><p>{props.mode.desc}</p></div>
        {props.mode.relics && (
          <>
            <div className="story-pick-label">Escolha até 2 relíquias</div>
            <div className="relic-picks">
              {offer.map((r) => (
                <button key={r.id} className={`relic-card ${picked.includes(r.id) ? 'sel' : ''}`} onClick={() => toggle(r.id)}>
                  <div className="relic-name">{r.name}</div>
                  <div className="relic-desc">{r.desc}</div>
                </button>
              ))}
            </div>
          </>
        )}
        <div className="story-pick-label">Escolha sua nave</div>
        <ShipPicker ship={ship} onPick={setShip} />
        <div className="story-actions">
          <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Modos</button>
          <button className="play-btn" onClick={() => { sfx.start(); props.onLaunch(ship, picked); }}>▶ Lançar</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Tutorial ----------
const STEPS = [
  { t: 'Mover', d: 'Arraste o dedo (celular) ou use WASD/setas (PC) para pilotar. Sua nave inclina ao mover.' },
  { t: 'Tiro automático', d: 'A nave dispara sozinha para frente. Em Arena, ela mira no inimigo mais próximo.' },
  { t: 'Hitbox', d: 'Só o pequeno núcleo brilhante no centro conta como colisão — chegue perto sem medo.' },
  { t: 'Habilidade (Shift)', d: 'Cada nave tem uma habilidade única: dash, míssil, escudo, drones, buraco negro…' },
  { t: 'Ultimate (Espaço)', d: 'Encha a barra derrotando inimigos e solte um golpe devastador.' },
  { t: 'Combo & Pickups', d: 'Mate em sequência para multiplicar o placar. Colete orbes de escudo, cura, ultimate e poder.' },
  { t: 'Chefes', d: 'Chefes têm várias fases e partes destrutíveis. Na última fase o núcleo se expõe: dano dobrado.' },
];
export function Tutorial(props: { onBack: () => void }): JSX.Element {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="story-intro">
      <div className="story-box" style={{ maxWidth: 460 }}>
        <div className="story-kicker">Tutorial · {i + 1}/{STEPS.length}</div>
        <div className="story-title">{s.t}</div>
        <div className="story-lines"><p>{s.d}</p></div>
        <div className="story-actions">
          <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
          {i < STEPS.length - 1
            ? <button className="play-btn" onClick={() => { sfx.ui(); setI(i + 1); }}>Próximo ▶</button>
            : <button className="play-btn" onClick={() => { sfx.start(); props.onBack(); }}>Entendi ✓</button>}
        </div>
      </div>
    </div>
  );
}

// ---------- Treino (escolha nave + orientação, sandbox sem placar) ----------
export function TrainingSetup(props: { onLaunch: (shipId: string, orient: Orient) => void; onBack: () => void }): JSX.Element {
  const [ship, setShip] = useState('falcon');
  const [orient, setOrient] = useState<Orient>('vertical');
  const ors: { id: Orient; label: string }[] = [{ id: 'vertical', label: 'Vertical' }, { id: 'horizontal', label: 'Horizontal' }, { id: 'arena', label: 'Arena 360°' }];
  return (
    <div className="story-intro">
      <div className="story-box">
        <div className="story-kicker">Treino · sem placar</div>
        <div className="story-title">Sala de Treino</div>
        <div className="story-lines"><p>Teste qualquer nave e qualquer orientação à vontade. Vidas infinitas, nada é enviado ao ranking.</p></div>
        <div className="story-pick-label">Orientação</div>
        <div className="orient-picks">
          {ors.map((o) => <button key={o.id} className={`otag ${orient === o.id ? 'sel' : ''}`} onClick={() => { sfx.ui(); setOrient(o.id); }}>{o.label}</button>)}
        </div>
        <div className="story-pick-label">Escolha sua nave</div>
        <ShipPicker ship={ship} onPick={setShip} />
        <div className="story-actions">
          <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
          <button className="play-btn" onClick={() => { sfx.start(); props.onLaunch(ship, orient); }}>▶ Treinar</button>
        </div>
      </div>
    </div>
  );
}
