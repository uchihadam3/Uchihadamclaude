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
import { ModesScreen, ModeSetup, Tutorial, TrainingSetup } from './ModesScreens';
import { ProfileScreen, LeaderboardScreen, SeasonScreen, MissionsScreen } from './AccountScreens';
import { SettingsScreen, SettingsPanel } from './SettingsPanel';
import { getSettings } from '../game/settings';
import { loadCampaign, recordClear, CampaignSave } from '../game/campaignSave';
import type { CampaignResult, Orient } from '../game/engine';
import { CAMPAIGN } from '../data/campaignData';
import type { ModeDef } from '../data/modesData';
import { loadProfile, levelInfo, Profile } from '../game/profile';
import { finalizeRun, RunContext, RunOutcome } from '../game/online';
import { countClaimable } from '../game/missions';
import './styles.css';

type Screen = 'menu' | 'hangar' | 'bestiary' | 'campaign' | 'modes' | 'tutorial' | 'training' | 'profile' | 'leaderboard' | 'season' | 'missions' | 'settings';

export default function App(): JSX.Element {
  const [screen, setScreen] = useState<Screen>('menu');
  const [shipId, setShipId] = useState('falcon');
  const profileRef = useRef<Profile>(loadProfile());
  const [, bump] = useState(0);
  const refresh = () => { profileRef.current = loadProfile(); bump((v) => v + 1); };
  // roda a partida pelo motor, credita XP/créditos/ranking/missões e devolve o resumo
  const finalize = (r: CampaignResult, ctx: RunContext): RunOutcome => { const o = finalizeRun(profileRef.current, r, ctx); refresh(); return o; };
  const profile = profileRef.current;

  const isRun = screen === 'campaign' || screen === 'modes' || screen === 'training';
  return (
    <div className="app">
      <div key={screen} className={isRun ? 'screen-run' : 'screen-fade'}>
        {screen === 'menu' && <Menu setScreen={setScreen} profile={profile} />}
        {screen === 'hangar' && <Hangar onBack={() => setScreen('menu')} onPilot={(id) => { resumeAudio(); sfx.start(); setShipId(id); setScreen('training'); }} />}
        {screen === 'bestiary' && <Bestiary onBack={() => setScreen('menu')} />}
        {screen === 'campaign' && <Campaign onBack={() => setScreen('menu')} finalize={finalize} />}
        {screen === 'modes' && <ModesFlow onBack={() => setScreen('menu')} finalize={finalize} />}
        {screen === 'tutorial' && <Tutorial onBack={() => setScreen('menu')} />}
        {screen === 'training' && <TrainingFlow initialShip={shipId} onBack={() => setScreen('menu')} />}
        {screen === 'profile' && <ProfileScreen profile={profile} onChange={refresh} onBack={() => setScreen('menu')} />}
        {screen === 'leaderboard' && <LeaderboardScreen profile={profile} onBack={() => setScreen('menu')} />}
        {screen === 'season' && <SeasonScreen profile={profile} onChange={refresh} onBack={() => setScreen('menu')} />}
        {screen === 'missions' && <MissionsScreen profile={profile} onChange={refresh} onBack={() => setScreen('menu')} />}
        {screen === 'settings' && <SettingsScreen onBack={() => setScreen('menu')} />}
      </div>
    </div>
  );
}

// ============ MODOS ============
function ModesFlow(props: { onBack: () => void; finalize: (r: CampaignResult, ctx: RunContext) => RunOutcome }): JSX.Element {
  const [phase, setPhase] = useState<'list' | 'setup' | 'run' | 'results'>('list');
  const [mode, setMode] = useState<ModeDef | null>(null);
  const [ship, setShip] = useState('falcon');
  const [relics, setRelics] = useState<string[]>([]);
  const [result, setResult] = useState<CampaignResult | null>(null);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [runKey, setRunKey] = useState(0);
  if (phase === 'list') return <ModesScreen onSelect={(m) => { setMode(m); setPhase('setup'); }} onBack={props.onBack} />;
  if (phase === 'setup' && mode) return <ModeSetup mode={mode} onBack={() => setPhase('list')} onLaunch={(s, r) => { setShip(s); setRelics(r); setRunKey((k) => k + 1); setPhase('run'); }} />;
  if (phase === 'run' && mode) return <Demo key={runKey} shipId={ship} mode="endless" onBack={() => setPhase('list')} onRestart={() => setRunKey((k) => k + 1)} config={{ orient: mode.orient, mod: mode.mod, runLives: mode.lives, bossRush: mode.bossRush, relics }} onComplete={(r) => { setResult(r); setOutcome(props.finalize(r, { boardId: mode.id, orient: mode.orient, isBossFight: !!mode.bossRush })); setPhase('results'); }} />;
  if (phase === 'results' && result) return <Results result={result} rewards={outcome ?? undefined} hasNext={false} onRetry={() => setPhase('run')} onMap={() => setPhase('list')} onNext={() => {}} />;
  return <ModesScreen onSelect={(m) => { setMode(m); setPhase('setup'); }} onBack={props.onBack} />;
}

// ============ TREINO ============
function TrainingFlow(props: { initialShip: string; onBack: () => void }): JSX.Element {
  const [phase, setPhase] = useState<'setup' | 'run'>('setup');
  const [ship, setShip] = useState(props.initialShip);
  const [orient, setOrient] = useState<Orient>('vertical');
  const [runKey, setRunKey] = useState(0);
  if (phase === 'setup') return <TrainingSetup onBack={props.onBack} onLaunch={(s, o) => { setShip(s); setOrient(o); setRunKey((k) => k + 1); setPhase('run'); }} />;
  return <Demo key={runKey} shipId={ship} mode="endless" onBack={() => setPhase('setup')} onRestart={() => setRunKey((k) => k + 1)} config={{ orient, runLives: Infinity }} />;
}

// ============ CAMPANHA ============
function Campaign(props: { onBack: () => void; finalize: (r: CampaignResult, ctx: RunContext) => RunOutcome }): JSX.Element {
  const [save, setSave] = useState<CampaignSave>(() => loadCampaign());
  const [phase, setPhase] = useState<'map' | 'intro' | 'run' | 'results'>('map');
  const [sector, setSector] = useState(0);
  const [ship, setShip] = useState('falcon');
  const [result, setResult] = useState<CampaignResult | null>(null);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [runKey, setRunKey] = useState(0);

  if (phase === 'map') return <CampaignMap save={save} onSelect={(i) => { setSector(i); setPhase('intro'); }} onBack={props.onBack} />;
  if (phase === 'intro') return <StoryIntro sector={sector} onBack={() => setPhase('map')} onLaunch={(s) => { setShip(s); setRunKey((k) => k + 1); setPhase('run'); }} />;
  if (phase === 'run') return (
    <Demo key={runKey} shipId={ship} mode="campaign" sector={sector} onBack={() => setPhase('map')} onRestart={() => setRunKey((k) => k + 1)}
      onComplete={(r) => { if (r.success) setSave(recordClear(r.sector, r.medal)); setOutcome(props.finalize(r, { boardId: 'campaign', orient: 'vertical', isBossFight: true })); setResult(r); setPhase('results'); }} />
  );
  if (phase === 'results' && result) return (
    <Results result={result} rewards={outcome ?? undefined} hasNext={result.sector + 1 < CAMPAIGN.length}
      onRetry={() => setPhase('run')} onMap={() => setPhase('map')}
      onNext={() => { setSector(result.sector + 1); setPhase('intro'); }} />
  );
  return <CampaignMap save={save} onSelect={(i) => { setSector(i); setPhase('intro'); }} onBack={props.onBack} />;
}

// ============ MENU (com showcase animado da Falcon-01) ============
function Menu(props: { setScreen: (s: Screen) => void; profile: Profile }): JSX.Element {
  const go = (s: Screen) => { resumeAudio(); sfx.ui(); props.setScreen(s); };
  const li = levelInfo(props.profile.xp);
  const claimable = countClaimable();
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
      <div className="online-bar">
        <button className="pilot-chip" onClick={() => go('profile')}>
          <span className="pilot-lvl">{li.level}</span>
          <span className="pilot-meta">
            <span className="pilot-name">{props.profile.name}</span>
            <span className="pilot-title">{props.profile.title}</span>
          </span>
          <span className="pilot-credits">◈ {props.profile.credits.toLocaleString('pt-BR')}</span>
        </button>
        <div className="online-chips">
          <button className="online-chip" onClick={() => go('leaderboard')}>🏆 Ranking</button>
          <button className="online-chip" onClick={() => go('season')}>◈ Temporada</button>
          <button className="online-chip" onClick={() => go('missions')}>✦ Missões{claimable > 0 && <span className="chip-badge">{claimable}</span>}</button>
          <button className="online-chip icon-chip" onClick={() => go('settings')} aria-label="Configurações">⚙</button>
        </div>
      </div>
      <div className="menu-inner">
        <div className="menu-kicker">Space Shooter Premium</div>
        <h1 className="menu-title"><span className="b">STARFORGE</span><span className="b">ARMADA</span></h1>
        <div className="menu-sub">Uma armada. Infinitas batalhas.</div>
        <div className="menu-tag">
          30 naves pilotáveis, 72 inimigos, chefes de múltiplas fases, campanha com 12 setores
          e 15 modos de jogo — vertical, arena 360° e investida lateral. Bloom, partículas e
          interface sci-fi em cada pixel.
        </div>
        <div className="menu-btns">
          <button className="play-btn" onClick={() => go('campaign')}>Campanha · 12 Setores</button>
          <button className="play-btn" onClick={() => go('modes')}>Modos · 15</button>
          <button className="play-btn ghost" onClick={() => go('hangar')}>Hangar · 30 Naves</button>
          <button className="play-btn ghost" onClick={() => go('bestiary')}>Bestiário · 72 Inimigos</button>
          <button className="play-btn ghost" onClick={() => go('training')}>Sala de Treino</button>
          <button className="play-btn ghost" onClick={() => go('tutorial')}>Como Jogar</button>
        </div>
        <div className="menu-controls">
          <span><kbd>WASD</kbd> mover</span>
          <span><kbd>Shift</kbd> habilidade</span>
          <span><kbd>Espaço</kbd> ultimate</span>
          <span>tiro automático · toque no celular</span>
        </div>
      </div>
      <div className="menu-approve">
        <b>Jogo completo em construção</b> · direção de arte aprovada · Parte 9/10
      </div>
    </div>
  );
}

// ============ RUN (demo endless OU campanha) ============
function Demo(props: { shipId: string; onBack: () => void; onRestart?: () => void; mode?: 'endless' | 'campaign'; sector?: number; config?: Partial<import('../game/engine').EngineOpts>; onComplete?: (r: import('../game/engine').CampaignResult) => void }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const campaign = props.mode === 'campaign';
  const [labels, setLabels] = useState({ ship: 'Falcon-01', ability: 'Míssil', ult: 'Ultimate' });
  const [paused, setPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const livesRef = useRef<HTMLDivElement>(null);
  const fpsRef = useRef<HTMLDivElement>(null);
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
    const eng = new Engine(cv, { shipId: props.shipId, mode: props.mode ?? 'endless', sector: props.sector ?? 0, ...(props.config ?? {}) });
    engineRef.current = eng;
    setLabels(eng.kitLabels());
    let done = false;
    if (props.onComplete) eng.onComplete = (r) => { if (done) return; done = true; props.onComplete!(r); };
    eng.onPauseKey = () => { setShowSettings(false); setPaused((p) => !p); };
    eng.onHud = (h: Hud) => {
      if (fpsRef.current) fpsRef.current.textContent = getSettings().fps ? `${Math.round(h.fps)} FPS` : '';
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

  useEffect(() => { const e = engineRef.current; if (!e) return; if (paused) e.pause(); else e.resume(); }, [paused]);

  return (
    <div className="demo">
      <canvas ref={canvasRef} />
      <div className="hud">
        <div className="hud-fps" ref={fpsRef} />
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
            <button className="pause-btn clickable" onClick={() => { sfx.ui(); setPaused(true); }} aria-label="Pausar">❚❚</button>
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
          <kbd>Shift</kbd> {labels.ability} · <kbd>Espaço</kbd> {labels.ult} · <kbd>Esc</kbd> pausar
        </div>

        {paused && (
          <div className="pause-overlay clickable">
            {showSettings ? (
              <div className="pause-card">
                <div className="pause-title">Configurações</div>
                <SettingsPanel compact />
                <div className="pause-actions"><button className="play-btn" onClick={() => { sfx.ui(); setShowSettings(false); }}>‹ Voltar</button></div>
              </div>
            ) : (
              <div className="pause-card">
                <div className="pause-title">Pausado</div>
                <div className="pause-btns">
                  <button className="play-btn" onClick={() => { sfx.ui(); setPaused(false); }}>▶ Retomar</button>
                  {props.onRestart && <button className="play-btn ghost" onClick={() => { sfx.ui(); props.onRestart!(); }}>↻ Reiniciar</button>}
                  <button className="play-btn ghost" onClick={() => { sfx.ui(); setShowSettings(true); }}>⚙ Configurações</button>
                  <button className="play-btn ghost" onClick={() => { sfx.ui(); props.onBack(); }}>✕ Sair</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
