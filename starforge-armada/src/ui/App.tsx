import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Engine, Hud } from '../game/engine';
import { Background } from '../render/background';
import { drawFalcon } from '../render/ship';
import { Particles } from '../render/fx';
import { Bloom } from '../render/bloom';
import { initAudio, resumeAudio, sfx } from '../game/audio';
import Hangar from './Hangar';
import Bestiary from './Bestiary';
import { CampaignMap, StoryIntro, Results } from './CampaignScreens';
import { loadCampaign, recordClear, CampaignSave } from '../game/campaignSave';
import type { CampaignResult } from '../game/engine';
import { CAMPAIGN } from '../data/campaignData';
import './styles.css';

export default function App(): JSX.Element {
  const [screen, setScreen] = useState<'menu' | 'demo' | 'hangar' | 'bestiary' | 'campaign'>('menu');
  const [shipId, setShipId] = useState('falcon');
  return (
    <div className="app">
      {screen === 'menu' && <Menu onStart={() => { resumeAudio(); sfx.start(); setShipId('falcon'); setScreen('demo'); }} onHangar={() => { resumeAudio(); sfx.ui(); setScreen('hangar'); }} onBestiary={() => { resumeAudio(); sfx.ui(); setScreen('bestiary'); }} onCampaign={() => { resumeAudio(); sfx.ui(); setScreen('campaign'); }} />}
      {screen === 'demo' && <Demo shipId={shipId} onBack={() => setScreen('menu')} />}
      {screen === 'hangar' && <Hangar onBack={() => setScreen('menu')} onPilot={(id) => { resumeAudio(); sfx.start(); setShipId(id); setScreen('demo'); }} />}
      {screen === 'bestiary' && <Bestiary onBack={() => setScreen('menu')} />}
      {screen === 'campaign' && <Campaign onBack={() => setScreen('menu')} />}
    </div>
  );
}

// ============ CAMPANHA ============
function Campaign(props: { onBack: () => void }): JSX.Element {
  const [save, setSave] = useState<CampaignSave>(() => loadCampaign());
  const [phase, setPhase] = useState<'map' | 'intro' | 'run' | 'results'>('map');
  const [sector, setSector] = useState(0);
  const [ship, setShip] = useState('falcon');
  const [result, setResult] = useState<CampaignResult | null>(null);

  if (phase === 'map') return <CampaignMap save={save} onSelect={(i) => { setSector(i); setPhase('intro'); }} onBack={props.onBack} />;
  if (phase === 'intro') return <StoryIntro sector={sector} onBack={() => setPhase('map')} onLaunch={(s) => { setShip(s); setPhase('run'); }} />;
  if (phase === 'run') return (
    <Demo shipId={ship} mode="campaign" sector={sector} onBack={() => setPhase('map')}
      onComplete={(r) => { if (r.success) setSave(recordClear(r.sector, r.medal)); setResult(r); setPhase('results'); }} />
  );
  if (phase === 'results' && result) return (
    <Results result={result} hasNext={result.sector + 1 < CAMPAIGN.length}
      onRetry={() => setPhase('run')} onMap={() => setPhase('map')}
      onNext={() => { setSector(result.sector + 1); setPhase('intro'); }} />
  );
  return <CampaignMap save={save} onSelect={(i) => { setSector(i); setPhase('intro'); }} onBack={props.onBack} />;
}

// ============ MENU (com showcase animado da Falcon-01) ============
function Menu(props: { onStart: () => void; onHangar: () => void; onBestiary: () => void; onCampaign: () => void }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d', { alpha: false })!;
    const bg = new Background();
    const fx = new Particles();
    const bloom = new Bloom();
    let raf = 0, t = 0, last = performance.now(), muzz = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const r = cv.getBoundingClientRect();
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bg.resize(r.width, r.height);
    };
    resize();
    window.addEventListener('resize', resize);
    const loop = (now: number) => {
      let dt = (now - last) / 1000; last = now; if (dt > 0.05) dt = 0.05;
      t += dt;
      const r = cv.getBoundingClientRect();
      bg.update(dt, 0.5);
      bg.drawBack(ctx);
      const sx = r.width / 2, sy = r.height * 0.6 + Math.sin(t * 0.8) * 10;
      // tiro ocasional só de vitrine
      muzz -= dt;
      if (muzz <= 0) { muzz = 0.16; fx.muzzle(sx, sy - 46, '#7ff0ff'); }
      fx.update(dt);
      drawFalcon(ctx, sx, sy, 46, { tilt: Math.sin(t * 0.6) * 0.5, thrust: 0.85, t });
      fx.draw(ctx);
      bg.drawFront(ctx);
      bloom.apply(ctx, cv, 0.6, 6);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="menu">
      <canvas ref={canvasRef} className="menu-canvas" />
      <div className="menu-inner">
        <div className="menu-kicker">Vertical Slice · Etapa 0</div>
        <h1 className="menu-title"><span className="b">STARFORGE</span><span className="b">ARMADA</span></h1>
        <div className="menu-sub">Demo Visual</div>
        <div className="menu-tag">
          Uma cena semi-jogável para validar a direção artística: a nave Falcon-01, cenário
          espacial com parallax e nebulosa, cinco inimigos, tiros, mísseis, ultimate, explosões,
          partículas e a interface sci-fi.
        </div>
        <div className="menu-btns">
          <button className="play-btn" onClick={props.onCampaign}>Campanha · 12 Setores</button>
          <button className="play-btn ghost" onClick={props.onStart}>Modo Livre</button>
          <button className="play-btn ghost" onClick={props.onHangar}>Hangar · 30 Naves</button>
          <button className="play-btn ghost" onClick={props.onBestiary}>Bestiário · 72 Inimigos</button>
        </div>
        <div className="menu-controls">
          <span><kbd>WASD</kbd> mover</span>
          <span><kbd>Shift</kbd> míssil</span>
          <span><kbd>Espaço</kbd> ultimate</span>
          <span>tiro automático · toque no celular</span>
        </div>
      </div>
      <div className="menu-approve">
        <b>Jogo completo em construção</b> · direção de arte aprovada · Parte 2/10
      </div>
    </div>
  );
}

// ============ RUN (demo endless OU campanha) ============
function Demo(props: { shipId: string; onBack: () => void; mode?: 'endless' | 'campaign'; sector?: number; onComplete?: (r: import('../game/engine').CampaignResult) => void }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const campaign = props.mode === 'campaign';
  const [showBanner, setShowBanner] = useState(!campaign);
  const [labels, setLabels] = useState({ ship: 'Falcon-01', ability: 'Míssil', ult: 'Ultimate' });
  const livesRef = useRef<HTMLDivElement>(null);
  // refs de HUD (atualizados direto no DOM p/ suavidade)
  const hpRef = useRef<HTMLDivElement>(null);
  const shRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const abRef = useRef<HTMLDivElement>(null);
  const abBoxRef = useRef<HTMLButtonElement>(null);
  const ultRef = useRef<HTMLDivElement>(null);
  const ultBoxRef = useRef<HTMLButtonElement>(null);
  const spRef = useRef<HTMLDivElement>(null);
  const bossWrapRef = useRef<HTMLDivElement>(null);
  const bossNameRef = useRef<HTMLDivElement>(null);
  const bossFillRef = useRef<HTMLDivElement>(null);
  const bossPipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initAudio();
    const cv = canvasRef.current!;
    const eng = new Engine(cv, props.shipId, props.mode ?? 'endless', props.sector ?? 0);
    engineRef.current = eng;
    setLabels(eng.kitLabels());
    let done = false;
    if (props.onComplete) eng.onComplete = (r) => { if (done) return; done = true; props.onComplete!(r); };
    eng.onHud = (h: Hud) => {
      if (hpRef.current) hpRef.current.style.width = `${Math.max(0, (h.hp / h.maxHp) * 100)}%`;
      if (shRef.current) shRef.current.style.width = `${Math.max(0, (h.shield / h.maxShield) * 100)}%`;
      if (scoreRef.current) scoreRef.current.textContent = h.score.toLocaleString('pt-BR');
      if (comboRef.current) comboRef.current.textContent = String(h.combo);
      if (waveRef.current) waveRef.current.textContent = h.sector;
      if (abRef.current) abRef.current.style.height = `${(1 - h.ability) * 100}%`;
      if (abBoxRef.current) abBoxRef.current.classList.toggle('ready', h.ability >= 1);
      if (ultRef.current) ultRef.current.style.height = `${(1 - h.ultimate) * 100}%`;
      if (ultBoxRef.current) ultBoxRef.current.classList.toggle('ready', h.ultimate >= 1);
      if (spRef.current) spRef.current.style.width = `${h.speed * 100}%`;
      if (livesRef.current && h.campaign) livesRef.current.textContent = '◆'.repeat(Math.max(0, h.lives)) + '◇'.repeat(Math.max(0, 3 - h.lives));
      if (bossWrapRef.current) bossWrapRef.current.style.opacity = h.bossActive ? '1' : '0';
      if (h.bossActive) {
        if (bossNameRef.current) bossNameRef.current.textContent = h.bossName;
        if (bossFillRef.current) bossFillRef.current.style.width = `${h.bossHp * 100}%`;
        if (bossPipsRef.current && bossPipsRef.current.childElementCount !== h.bossPhases) {
          bossPipsRef.current.innerHTML = '';
          for (let i = 0; i < h.bossPhases; i++) { const d = document.createElement('span'); d.className = 'boss-pip'; bossPipsRef.current.appendChild(d); }
        }
        if (bossPipsRef.current) { const pips = bossPipsRef.current.children; for (let i = 0; i < pips.length; i++) (pips[i] as HTMLElement).classList.toggle('done', i < h.bossPhase); }
      }
    };
    eng.start();
    return () => eng.stop();
  }, []);

  return (
    <div className="demo">
      <canvas ref={canvasRef} />
      <div className="hud">
        <div className="boss-bar" ref={bossWrapRef} style={{ opacity: 0 }}>
          <div className="boss-bar-head">
            <div className="boss-name" ref={bossNameRef} />
            <div className="boss-pips" ref={bossPipsRef} />
          </div>
          <div className="boss-track"><div className="boss-fill" ref={bossFillRef} /></div>
        </div>
        <div className="hud-top">
          <div className="hud-panel">
            <div className="hud-score-label">Pontuação</div>
            <div className="hud-score" ref={scoreRef}>0</div>
          </div>
          <div className="hud-mid-col">
            <button className="back-btn clickable" onClick={() => { sfx.ui(); props.onBack(); }}>{campaign ? '‹ Mapa' : '‹ Menu'}</button>
            {campaign && <div className="hud-lives" ref={livesRef}>◆◆◆</div>}
          </div>
          <div className="hud-panel hud-combo">
            <div className="hud-combo-label">Combo</div>
            <div><span className="hud-combo-x">x</span><span className="hud-combo-num" ref={comboRef}>0</span></div>
            <div className="hud-wave" ref={waveRef}>Onda 1</div>
          </div>
        </div>

        <div className="hud-bars">
          <div className="bar-wrap">
            <div className="bar-head"><span>Casco</span></div>
            <div className="bar-track"><div className="bar-fill hp" ref={hpRef} /></div>
          </div>
          <div className="bar-wrap">
            <div className="bar-head"><span>Escudo</span></div>
            <div className="bar-track"><div className="bar-fill shield" ref={shRef} /></div>
          </div>
        </div>

        <div className="hud-speed">
          <div className="hud-speed-label">Impulso</div>
          <div className="speed-track"><div className="speed-fill" ref={spRef} /></div>
        </div>

        <div className="hud-skills">
          <button className="skill clickable" ref={abBoxRef} onClick={() => engineRef.current?.triggerAbility()}>
            <span className="skill-key">Shift</span>
            <span className="skill-ico" style={{ color: '#ffd27a' }}>➤</span>
            <span className="skill-name">{labels.ability}</span>
            <div className="skill-cd" ref={abRef} style={{ height: '0%' }} />
          </button>
          <button className="skill ult clickable" ref={ultBoxRef} onClick={() => engineRef.current?.triggerUltimate()}>
            <span className="skill-key">Espaço</span>
            <span className="skill-ico" style={{ color: '#8af0ff' }}>✹</span>
            <span className="skill-name">{labels.ult}</span>
            <div className="skill-cd" ref={ultRef} style={{ height: '100%' }} />
          </button>
        </div>

        <div className="controls-hint">
          <b>{labels.ship}</b><br />
          Arraste para mover · tiro automático<br />
          <kbd>Shift</kbd> {labels.ability} · <kbd>Espaço</kbd> {labels.ult}
        </div>

        {showBanner && (
          <div className="approve-banner clickable">
            <div className="approve-text">
              <b>Visual aprovado ✓</b> Jogo completo em construção — bloom, power-ups e as 30 naves já no ar.
            </div>
            <button className="approve-x" onClick={() => setShowBanner(false)}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
}
