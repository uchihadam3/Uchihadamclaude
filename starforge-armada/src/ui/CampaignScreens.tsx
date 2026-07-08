import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CAMPAIGN } from '../data/campaignData';
import { BOSS_BY_ID } from '../data/bossesData';
import { SHIPS } from '../data/shipsData';
import { drawShip } from '../render/shipGen';
import { CampaignResult } from '../game/engine';
import { CampaignSave } from '../game/campaignSave';
import { sfx } from '../game/audio';

// ---------- Mapa de setores ----------
export function CampaignMap(props: { save: CampaignSave; onSelect: (i: number) => void; onBack: () => void }): JSX.Element {
  return (
    <div className="hangar campaign-map">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Campanha · <span>12 Setores</span></div>
        <div className="hangar-count">{props.save.cleared + 1}/12 concluídos</div>
      </div>
      <div className="map-path">
        {CAMPAIGN.map((s, i) => {
          const done = i <= props.save.cleared;
          const available = i <= props.save.cleared + 1;
          const medal = props.save.medals[i];
          return (
            <div key={i} className={`map-node ${done ? 'done' : available ? 'open' : 'locked'} ${i % 2 ? 'right' : 'left'}`}>
              <div className="map-dot">{done ? '✓' : available ? i + 1 : '◈'}</div>
              <button className="map-card" disabled={!available} onClick={() => { if (available) { sfx.ui(); props.onSelect(i); } }}>
                <div className="map-card-top">
                  <span className="map-sector">Setor {i + 1}</span>
                  {medal && <span className={`map-medal m-${medal.toLowerCase()}`}>{medal}</span>}
                </div>
                <div className="map-name">{s.name}</div>
                <div className="map-boss">Chefe: {BOSS_BY_ID[s.bossId].name}</div>
                {available && !done && <div className="map-go">▶ Iniciar setor</div>}
                {done && <div className="map-go done">Concluído · rejogar</div>}
                {!available && <div className="map-go locked">◈ Vença o setor anterior</div>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Intro de história + escolha de nave ----------
export function StoryIntro(props: { sector: number; onLaunch: (shipId: string) => void; onBack: () => void }): JSX.Element {
  const sec = CAMPAIGN[props.sector];
  const [ship, setShip] = useState('falcon');
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
    <div className="story-intro">
      <div className="story-box">
        <div className="story-kicker">Setor {props.sector + 1}</div>
        <div className="story-title">{sec.name}</div>
        <div className="story-lines">{sec.intro.map((l, i) => <p key={i}>{l}</p>)}</div>
        <div className="story-boss">Chefe do setor: <b>{BOSS_BY_ID[sec.bossId].name}</b></div>
        <div className="story-pick-label">Escolha sua nave</div>
        <div className="story-picks">
          {picks.map((s) => (
            <button key={s.id} className={`story-pick ${ship === s.id ? 'sel' : ''}`} onClick={() => { sfx.ui(); setShip(s.id); }}>
              <canvas ref={(el) => { if (el) cvs.current.set(s.id, el); else cvs.current.delete(s.id); }} />
              <span>{s.name}</span>
            </button>
          ))}
        </div>
        <div className="story-actions">
          <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Mapa</button>
          <button className="play-btn" onClick={() => { sfx.start(); props.onLaunch(ship); }}>▶ Lançar</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Resultado ----------
export function Results(props: { result: CampaignResult; hasNext: boolean; onRetry: () => void; onMap: () => void; onNext: () => void }): JSX.Element {
  const r = props.result;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  return (
    <div className="results-bg">
      <div className={`results ${r.success ? 'win' : 'fail'}`}>
        <div className="results-title">{r.success ? 'Setor Concluído' : 'Missão Falhou'}</div>
        {r.success && <div className={`results-medal m-${r.medal.toLowerCase()}`}>{r.medal}</div>}
        <div className="results-grid">
          <div className="rstat"><span>Pontuação</span><b>{r.score.toLocaleString('pt-BR')}</b></div>
          <div className="rstat"><span>Inimigos</span><b>{r.kills}</b></div>
          <div className="rstat"><span>Tempo</span><b>{fmt(r.timeSec)}</b></div>
          <div className="rstat"><span>Dano sofrido</span><b>{r.dmgTaken}</b></div>
          <div className="rstat"><span>Vidas restantes</span><b>{r.lives}</b></div>
        </div>
        <div className="results-actions">
          <button className="play-btn ghost" onClick={() => { sfx.ui(); props.onMap(); }}>Mapa</button>
          <button className="play-btn ghost" onClick={() => { sfx.ui(); props.onRetry(); }}>Repetir</button>
          {r.success && props.hasNext && <button className="play-btn" onClick={() => { sfx.start(); props.onNext(); }}>Próximo ▶</button>}
        </div>
      </div>
    </div>
  );
}
