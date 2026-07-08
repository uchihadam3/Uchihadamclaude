import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { SHIPS, SHIP_BY_ID } from '../data/shipsData';
import { drawShip } from '../render/shipGen';
import { MODES } from '../data/modesData';
import { sfx } from '../game/audio';
import {
  Profile, levelInfo, saveProfile, exportCode, importCode, resetProfile,
} from '../game/profile';
import { leaderboard, playerBest, Entry } from '../game/leaderboard';
import {
  currentSeason, seasonTheme, seasonDaysLeft, SEASON_TIERS, tierProgress, SeasonTier,
} from '../game/season';
import { getMissions, claim, secsToReset, MissionState } from '../game/missions';

// ---------- retrato de nave animado ----------
function ShipAvatar(props: { shipId: string; className?: string }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext('2d'); if (!ctx) return;
    const design = (SHIP_BY_ID[props.shipId] ?? SHIP_BY_ID['falcon']).design;
    let raf = 0; const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const dpr = Math.min(2, devicePixelRatio || 1); const w = cv.clientWidth, h = cv.clientHeight;
      if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      drawShip(ctx, w / 2, h * 0.55, Math.min(w, h) * 0.32, design, { tilt: Math.sin(t) * 0.35, thrust: 0.85, t });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
  }, [props.shipId]);
  return <canvas ref={ref} className={props.className} />;
}

// ===================== PERFIL =====================
export function ProfileScreen(props: { profile: Profile; onChange: () => void; onBack: () => void }): JSX.Element {
  const p = props.profile;
  const li = levelInfo(p.xp);
  const [name, setName] = useState(p.name);
  const [showCode, setShowCode] = useState(false);
  const [importText, setImportText] = useState('');
  const [msg, setMsg] = useState('');

  const commitName = () => { const n = name.trim().slice(0, 16) || p.name; p.name = n; saveProfile(p); props.onChange(); };
  const pickAvatar = (id: string) => { sfx.ui(); p.avatar = id; saveProfile(p); props.onChange(); };
  const equipTitle = (t: string) => { sfx.ui(); p.title = t; saveProfile(p); props.onChange(); };
  const copyCode = async () => { try { await navigator.clipboard.writeText(exportCode(p)); setMsg('Código copiado!'); } catch { setMsg('Copie manualmente abaixo.'); } setTimeout(() => setMsg(''), 2200); };
  const doImport = () => {
    const np = importCode(importText);
    if (!np) { setMsg('Código inválido.'); setTimeout(() => setMsg(''), 2200); return; }
    saveProfile(np); setImportText(''); setMsg('Conta importada!'); sfx.reward(); props.onChange(); setTimeout(() => setMsg(''), 2200);
  };
  const doReset = () => { if (confirm('Apagar este piloto e começar do zero?')) { resetProfile(); sfx.ui(); props.onChange(); } };

  const stat = (label: string, value: string | number) => (
    <div className="rstat"><span>{label}</span><b>{value}</b></div>
  );
  const fmtTime = (s: number) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}h ${m}m` : `${m}m`; };

  return (
    <div className="acct">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Piloto</div>
        <div className="hangar-count">conta local · nível {li.level}</div>
      </div>

      <div className="acct-body">
        <div className="profile-hero">
          <div className="profile-avatar"><ShipAvatar shipId={p.avatar} /></div>
          <div className="profile-info">
            <input className="callsign-input" value={name} maxLength={16}
              onChange={(e) => setName(e.target.value)} onBlur={commitName}
              onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }} />
            <div className="profile-title">{p.title}</div>
            <div className="lvl-row">
              <span className="lvl-badge">Nv {li.level}</span>
              <div className="lvl-track"><div className="lvl-fill" style={{ width: `${(li.into / li.need) * 100}%` }} /></div>
              <span className="lvl-xp">{li.into} / {li.need} XP</span>
            </div>
            <div className="credits-row">◈ <b>{p.credits.toLocaleString('pt-BR')}</b> créditos</div>
          </div>
        </div>

        <div className="acct-section-label">Estatísticas de carreira</div>
        <div className="results-grid profile-stats">
          {stat('Partidas', p.stats.runs)}
          {stat('Vitórias', p.stats.wins)}
          {stat('Inimigos', p.stats.kills.toLocaleString('pt-BR'))}
          {stat('Chefes', p.stats.bosses)}
          {stat('Melhor placar', p.stats.bestScore.toLocaleString('pt-BR'))}
          {stat('Maior combo', 'x' + p.stats.maxCombo)}
          {stat('Tempo em jogo', fmtTime(p.stats.playSec))}
          {stat('Créditos ganhos', p.stats.credits.toLocaleString('pt-BR'))}
        </div>

        {p.titles.length > 1 && <>
          <div className="acct-section-label">Títulos</div>
          <div className="title-picks">
            {p.titles.map((t) => (
              <button key={t} className={`title-chip ${p.title === t ? 'sel' : ''}`} onClick={() => equipTitle(t)}>{t}</button>
            ))}
          </div>
        </>}

        <div className="acct-section-label">Retrato (nave)</div>
        <div className="avatar-row">
          {SHIPS.map((s) => (
            <button key={s.id} className={`avatar-pick ${p.avatar === s.id ? 'sel' : ''}`} onClick={() => pickAvatar(s.id)}>
              <ShipAvatar shipId={s.id} />
            </button>
          ))}
        </div>

        <div className="acct-section-label">Código de Nuvem <span className="hint">— leve sua conta para outro aparelho</span></div>
        <div className="cloud-box">
          <div className="cloud-actions">
            <button className="play-btn ghost" onClick={() => { sfx.ui(); setShowCode((v) => !v); }}>{showCode ? 'Ocultar código' : 'Mostrar meu código'}</button>
            <button className="play-btn ghost" onClick={copyCode}>Copiar código</button>
          </div>
          {showCode && <textarea className="cloud-code" readOnly value={exportCode(p)} onFocus={(e) => e.target.select()} />}
          <div className="cloud-import">
            <input className="cloud-input" placeholder="Cole um código SFA1-… aqui" value={importText} onChange={(e) => setImportText(e.target.value)} />
            <button className="play-btn" onClick={doImport} disabled={!importText.trim()}>Importar</button>
          </div>
          {msg && <div className="cloud-msg">{msg}</div>}
          <button className="danger-btn" onClick={doReset}>Apagar piloto</button>
        </div>
      </div>
    </div>
  );
}

// ===================== RANKING =====================
const RANK_MEDAL = (r: number) => (r === 1 ? 'g' : r === 2 ? 's' : r === 3 ? 'b' : '');

export function LeaderboardScreen(props: { profile: Profile; onBack: () => void }): JSX.Element {
  const season = currentSeason();
  const theme = seasonTheme(season);
  const boards = [
    { id: 'overall', name: 'Geral', color: '#eafcff' },
    { id: 'campaign', name: 'Campanha', color: '#7ff0ff' },
    ...MODES.map((m) => ({ id: m.id, name: m.name, color: m.color })),
  ];
  const [board, setBoard] = useState('overall');
  const { entries, playerRank } = leaderboard(board, props.profile, season);
  const top = entries.slice(0, 25);
  const playerInTop = top.some((e) => e.isPlayer);
  const me = entries.find((e) => e.isPlayer)!;

  const row = (e: Entry) => (
    <div className={`lb-row ${e.isPlayer ? 'me' : ''}`} key={e.rank + e.name}>
      <div className={`lb-rank ${RANK_MEDAL(e.rank)}`}>{e.rank}</div>
      <div className="lb-av"><ShipAvatar shipId={e.avatar} /></div>
      <div className="lb-name">{e.name}{e.isPlayer && <span className="you">VOCÊ</span>}</div>
      <div className="lb-score">{e.score.toLocaleString('pt-BR')}</div>
    </div>
  );

  return (
    <div className="acct">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Ranking</div>
        <div className="hangar-count" style={{ color: theme.color }}>{theme.name} · S{season} · {seasonDaysLeft()}d restantes</div>
      </div>
      <div className="acct-body">
        <div className="board-tabs">
          {boards.map((b) => (
            <button key={b.id} className={`board-tab ${board === b.id ? 'sel' : ''}`} style={{ ['--bc' as any]: b.color }}
              onClick={() => { sfx.ui(); setBoard(b.id); }}>{b.name}</button>
          ))}
        </div>
        <div className="lb-yours">
          <span>Sua melhor pontuação</span>
          <b>{playerBest(board, season).toLocaleString('pt-BR')}</b>
          <span className="lb-yourrank">Posição #{playerRank}</span>
        </div>
        <div className="lb-list">
          {top.map(row)}
          {!playerInTop && <>
            <div className="lb-sep">⋯</div>
            {row(me)}
          </>}
        </div>
      </div>
    </div>
  );
}

// ===================== TEMPORADA (passe) =====================
export function SeasonScreen(props: { profile: Profile; onChange: () => void; onBack: () => void }): JSX.Element {
  const season = currentSeason();
  const theme = seasonTheme(season);
  const sxp = props.profile.seasonXp[season] ?? 0;
  const prog = tierProgress(sxp);
  const claimed = props.profile.claimed[String(season)] ?? [];

  const claimTier = (t: SeasonTier) => {
    if (sxp < t.xp || claimed.includes(t.tier)) return;
    sfx.reward();
    const p = props.profile;
    p.claimed[String(season)] = [...claimed, t.tier];
    const rw = t.reward;
    if (rw.kind === 'credits') p.credits += Number(rw.value);
    if (rw.kind === 'title' && !p.titles.includes(String(rw.value))) p.titles.push(String(rw.value));
    saveProfile(p); props.onChange();
  };

  return (
    <div className="acct">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Temporada</div>
        <div className="hangar-count" style={{ color: theme.color }}>{seasonDaysLeft()} dias restantes</div>
      </div>
      <div className="acct-body">
        <div className="season-hero" style={{ ['--sc' as any]: theme.color }}>
          <div className="season-kicker">Temporada {season}</div>
          <div className="season-name">{theme.name}</div>
          <div className="season-prog">
            <div className="season-track"><div className="season-fill" style={{ width: `${(prog.into / prog.span) * 100}%` }} /></div>
            <div className="season-prog-txt">
              {prog.next ? <>Faixa {prog.current} · {prog.into}/{prog.span} XP para a faixa {prog.next.tier}</> : <>Passe completo! Todas as {SEASON_TIERS.length} faixas alcançadas.</>}
            </div>
          </div>
        </div>

        <div className="tier-track">
          {SEASON_TIERS.map((t) => {
            const reached = sxp >= t.xp;
            const got = claimed.includes(t.tier);
            return (
              <div key={t.tier} className={`tier-card ${reached ? 'reached' : 'locked'} ${got ? 'claimed' : ''}`} style={{ ['--sc' as any]: theme.color }}>
                <div className="tier-num">Faixa {t.tier}</div>
                <div className="tier-ico">{t.reward.icon}</div>
                <div className="tier-label">{t.reward.label}</div>
                <div className="tier-xp">{t.xp.toLocaleString('pt-BR')} XP</div>
                {got ? <div className="tier-done">✓ Resgatado</div>
                  : reached ? <button className="tier-claim" onClick={() => claimTier(t)}>Resgatar</button>
                    : <div className="tier-lock">🔒</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===================== MISSÕES =====================
function fmtCountdown(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h >= 24) { const d = Math.floor(h / 24); return `${d}d ${h % 24}h`; }
  return h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
}

export function MissionsScreen(props: { profile: Profile; onChange: () => void; onBack: () => void }): JSX.Element {
  const [, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick((v) => v + 1), 1000); return () => clearInterval(t); }, []);
  const { daily, weekly } = getMissions();

  const doClaim = (id: string) => {
    const rw = claim(id, props.profile);
    if (rw) { sfx.reward(); props.onChange(); }
  };

  const card = (m: MissionState) => {
    const pct = Math.min(100, (m.progress / m.tpl.target) * 100);
    const shown = m.tpl.acc === 'max' ? Math.min(m.progress, m.tpl.target) : Math.min(m.progress, m.tpl.target);
    return (
      <div key={m.tpl.id} className={`mission-card ${m.done ? 'done' : ''} ${m.claimed ? 'claimed' : ''}`}>
        <div className="mission-ico">{m.tpl.icon}</div>
        <div className="mission-main">
          <div className="mission-text">{m.tpl.text}</div>
          <div className="mission-bar"><div className="mission-fill" style={{ width: `${pct}%` }} /></div>
          <div className="mission-meta">
            <span>{shown.toLocaleString('pt-BR')} / {m.tpl.target.toLocaleString('pt-BR')}</span>
            <span className="mission-reward">+{m.tpl.xp} XP · ◈{m.tpl.credits}</span>
          </div>
        </div>
        <div className="mission-action">
          {m.claimed ? <span className="mission-ok">✓</span>
            : m.done ? <button className="tier-claim" onClick={() => doClaim(m.tpl.id)}>Resgatar</button>
              : <span className="mission-pct">{Math.floor(pct)}%</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="acct">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Missões</div>
        <div className="hangar-count">objetivos com recompensa</div>
      </div>
      <div className="acct-body">
        <div className="mission-group-head"><span>Diárias</span><span className="mission-reset">renova em {fmtCountdown(secsToReset('daily'))}</span></div>
        <div className="mission-list">{daily.map(card)}</div>
        <div className="mission-group-head"><span>Semanais</span><span className="mission-reset">renova em {fmtCountdown(secsToReset('weekly'))}</span></div>
        <div className="mission-list">{weekly.map(card)}</div>
      </div>
    </div>
  );
}
