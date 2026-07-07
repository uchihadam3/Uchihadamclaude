import type { JSX } from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { PlantInstance, PropagationMethod } from '../types';
import { G, plantAt, decorAt, isDead, resolveMix } from '../game/gameState';
import { AREA_BY_ID, tileLight } from '../data/areasData';
import { PLANT_BY_ID } from '../data/plants';
import { POT_BY_ID } from '../data/potsData';
import { SOIL_MIX_BY_ID } from '../data/soilData';
import { DECOR_BY_ID } from '../data/decorData';
import { CONSUMABLE_BY_ID, TOOL_BY_ID } from '../data/toolsData';
import { renderGarden, screenToTile, Camera } from '../rendering/gardenRenderer';
import {
  plantSeed, waterPlant, fertilize, prunePlant, treatPlant, removePestByHand,
  harvestFlower, harvestSeeds, propagate, removePlant, clearDebris, debrisAt,
  placeDecor, removeDecor, repotPlant, drainSaucer, canPlantHere, movePlant,
} from '../game/actions';
import { sellPlant, plantSaleValue } from '../game/economySystem';
import { moistureState, healthLabel, effectiveLight } from '../game/plantSimulation';
import { tr, t, lang } from '../i18n';
import { useGame, useFlash } from './useGame';
import { Btn, Panel, Bar, PlantSprite, PotSprite, Icon, DecorSprite, SoilSprite, ToolSprite, ConsumableSprite, LIGHT_LABEL, STAGE_LABEL, WATER_LABEL, categoryLabel } from './components';
import { fmtClock, seasonNamePT, seasonNameEN, dayPhase } from '../game/gameTime';
import { sfx } from '../audio/audioEngine';

type PlantFlow = { step: 'seed' | 'pot' | 'soil'; kind: 'seed' | 'seedling' | 'cutting'; plantId?: string; potId?: string | null } | null;

const PROP_LABEL: Record<string, { pt: string; en: string }> = {
  'stem-cutting': { pt: 'Estaca de caule', en: 'Stem cutting' },
  'leaf-cutting': { pt: 'Estaca de folha', en: 'Leaf cutting' },
  division: { pt: 'Divisão de touceira', en: 'Division' },
  bulb: { pt: 'Bulbo', en: 'Bulb' }, rhizome: { pt: 'Rizoma', en: 'Rhizome' },
  tuber: { pt: 'Tubérculo', en: 'Tuber' }, offset: { pt: 'Broto lateral', en: 'Offset' },
  runner: { pt: 'Estolho', en: 'Runner' }, 'air-layering': { pt: 'Alporquia', en: 'Air layering' },
  grafting: { pt: 'Enxertia', en: 'Grafting' }, 'water-propagation': { pt: 'Propagação em água', en: 'Water propagation' },
  keiki: { pt: 'Keiki', en: 'Keiki' }, spore: { pt: 'Esporos', en: 'Spores' },
  seed: { pt: 'Sementes', en: 'Seeds' },
};

export function GardenScreen(props: { openScreen: (s: string) => void }): JSX.Element {
  useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camRef = useRef<Camera>({ x: 0, y: 0, zoom: 1 });
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<'view' | 'build'>('view');
  const [plantFlow, setPlantFlow] = useState<PlantFlow>(null);
  const [decorPick, setDecorPick] = useState<string | null>(null);
  const [moving, setMoving] = useState<PlantInstance | null>(null);
  const [subMenu, setSubMenu] = useState<'water' | 'fert' | 'treat' | 'prune' | 'prop' | 'repot' | null>(null);
  const [flash, setFlash] = useFlash();
  const dragRef = useRef<{ sx: number; sy: number; cx: number; cy: number; moved: boolean; pinch?: number } | null>(null);

  const area = AREA_BY_ID[G.currentArea];
  const selPlant = selected ? plantAt(G.currentArea, selected.x, selected.y) : undefined;
  const selDecor = selected ? decorAt(G.currentArea, selected.x, selected.y) : undefined;

  // ---------- loop de desenho ----------
  useEffect(() => {
    let raf = 0;
    const draw = (tms: number) => {
      const cv = canvasRef.current;
      if (cv) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const w = cv.clientWidth, h = cv.clientHeight;
        if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
        const ctx = cv.getContext('2d');
        if (ctx && G) {
          ctx.save();
          ctx.scale(dpr, dpr);
          renderGarden(ctx, w, h, G.currentArea, {
            cam: camRef.current, hover, selected, mode: mode === 'build' ? 'build' : 'view',
            showGrid: G.settings.showGrid, time: tms / 1000,
          });
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [hover, selected, mode]);

  // ---------- interação ----------
  const toTile = useCallback((clientX: number, clientY: number) => {
    const cv = canvasRef.current;
    if (!cv) return { x: -1, y: -1 };
    const rect = cv.getBoundingClientRect();
    return screenToTile(clientX - rect.left, clientY - rect.top, camRef.current, rect.width, rect.height, area.cols, area.rows);
  }, [area]);

  const handleTap = useCallback((clientX: number, clientY: number) => {
    const tile = toTile(clientX, clientY);
    if (tile.x < 0 || tile.x >= area.cols || tile.y < 0 || tile.y >= area.rows) { setSelected(null); setSubMenu(null); return; }
    // mover planta
    if (moving) {
      const res = movePlant(moving, G.currentArea, tile.x, tile.y);
      if (!res.ok && res.msg) setFlash(tr(res.msg));
      else setMoving(null);
      return;
    }
    // limpar entulho direto
    const dIdx = debrisAt(G.currentArea, tile.x, tile.y);
    if (dIdx >= 0) { clearDebris(G.currentArea, dIdx); setFlash(lang() === 'pt' ? 'Entulho limpo! +2 moedas' : 'Debris cleared! +2 coins'); return; }
    // decorar
    if (mode === 'build' && decorPick) {
      const res = placeDecor(decorPick, G.currentArea, tile.x, tile.y);
      if (!res.ok && res.msg) setFlash(tr(res.msg));
      if ((G.inventory.decor[decorPick] ?? 0) <= 0) setDecorPick(null);
      return;
    }
    setSelected({ x: tile.x, y: tile.y });
    setSubMenu(null);
  }, [toTile, area, moving, mode, decorPick, setFlash]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { sx: e.clientX, sy: e.clientY, cx: camRef.current.x, cy: camRef.current.y, moved: false };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const tile = toTile(e.clientX, e.clientY);
    setHover(tile.x >= 0 && tile.x < area.cols && tile.y >= 0 && tile.y < area.rows ? tile : null);
    const d = dragRef.current;
    if (d && (e.buttons & 1)) {
      const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
      if (Math.abs(dx) + Math.abs(dy) > 8) d.moved = true;
      if (d.moved) {
        camRef.current.x = d.cx - dx / camRef.current.zoom;
        camRef.current.y = d.cy - dy / camRef.current.zoom;
      }
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (d && !d.moved) handleTap(e.clientX, e.clientY);
  };
  const onWheel = (e: React.WheelEvent) => {
    const z = camRef.current.zoom * (e.deltaY > 0 ? 0.9 : 1.1);
    camRef.current.zoom = Math.max(0.5, Math.min(2.2, z));
  };

  // ---------- ações rápidas globais ----------
  const waterAllThirsty = () => {
    let n = 0;
    for (const p of G.plants.filter((pp) => pp.areaId === G.currentArea && !isDead(pp))) {
      if (moistureState(p) === 'seca' || moistureState(p) === 'baixa') { waterPlant(p); n++; }
    }
    setFlash(lang() === 'pt' ? `${n} plantas regadas` : `${n} plants watered`);
  };

  const phaseIcons: Record<string, string> = { dawn: 'sun', morning: 'sun', midday: 'sun', afternoon: 'sun', dusk: 'moon', night: 'moon' };
  const phase = dayPhase(G.calendar);
  const monthName = lang() === 'pt'
    ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][G.calendar.month]
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][G.calendar.month];

  return (
    <>
      <canvas
        ref={canvasRef}
        className="garden-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
      />

      {/* HUD topo */}
      <div className="hud-top">
        <div className="hud-chip clickable" onClick={() => props.openScreen('areas')} title={t('areas')}>
          <Icon name="home" size={15} color="#cfe0b0" />
          <div>
            <div>{tr({ pt: area.namePT, en: area.nameEN })}</div>
          </div>
        </div>
        <div className="hud-chip clickable" onClick={() => props.openScreen('calendar')}>
          <Icon name={G.weather.raining ? 'rain' : G.weather.cloudy ? 'cloud' : phaseIcons[phase]} size={16} />
          <div>
            <div>{fmtClock(G.calendar)} · {lang() === 'pt' ? 'Dia' : 'Day'} {G.calendar.day} {monthName}</div>
            <div className="hud-sub">{lang() === 'pt' ? seasonNamePT(G.calendar.season) : seasonNameEN(G.calendar.season)} · {t('year')} {G.calendar.year} · {G.weather.tempMinC}–{G.weather.tempMaxC}°C</div>
          </div>
        </div>
        <div className="hud-chip"><Icon name="coin" size={15} />{G.money}</div>
        <div className="hud-chip" title={t('reputation')}><Icon name="star" size={15} />{G.reputation}</div>
        <div style={{ flex: 1 }} />
        <div className="hud-chip clickable" onClick={() => {
          G.calendar.speed = G.calendar.speed === 0 ? 1 : G.calendar.speed === 1 ? 4 : G.calendar.speed === 4 ? 12 : 0;
        }} title={t('speed')}>
          <Icon name={G.calendar.speed === 0 ? 'pause' : G.calendar.speed === 1 ? 'play1' : 'play2'} size={14} color="#cfe0b0" />
          ×{G.calendar.speed}
        </div>
      </div>

      {/* flash msg */}
      {flash && <div style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 60 }} className="hud-chip">{flash}</div>}
      {moving && <div style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 60 }} className="hud-chip">
        {lang() === 'pt' ? 'Toque no destino…' : 'Tap the destination…'}
        <Btn small kind="ghost" onClick={() => setMoving(null)}>{t('cancel')}</Btn>
      </div>}

      {/* barra inferior de navegação */}
      <div className="hud-bottom">
        <button className={`nav-btn ${mode === 'build' ? 'active' : ''}`} onClick={() => { setMode(mode === 'build' ? 'view' : 'build'); setDecorPick(null); }}>
          <Icon name="hammer" size={19} color="#ecdfc2" /><span>{t('build')}</span>
        </button>
        <button className="nav-btn" onClick={waterAllThirsty}>
          <Icon name="drop" size={19} /><span>{t('waterAll')}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('inventory')}>
          <Icon name="seedbag" size={19} /><span>{t('inventory')}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('shops')}>
          <Icon name="shop" size={19} color="#ecdfc2" /><span>{t('shops')}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('bench')}>
          <Icon name="scissors" size={19} color="#ecdfc2" /><span>{t('bench')}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('quests')} style={{ position: 'relative' }}>
          <Icon name="scroll" size={19} color="#ecdfc2" /><span>{t('quests')}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('npcs')}>
          <Icon name="people" size={19} color="#ecdfc2" /><span>{t('npcs')}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('plantapedia')}>
          <Icon name="book" size={19} /><span>{lang() === 'pt' ? 'Pédia' : 'Pedia'}</span>
        </button>
        <button className="nav-btn" onClick={() => props.openScreen('more')}>
          <Icon name="grid" size={19} color="#ecdfc2" /><span>{lang() === 'pt' ? 'Mais' : 'More'}</span>
        </button>
      </div>

      {/* modo decorar: fita de decorações */}
      {mode === 'build' && (
        <div style={{ position: 'absolute', bottom: 76, left: 8, right: 8, zIndex: 25, display: 'flex', gap: 6, overflowX: 'auto', padding: 4 }}>
          {Object.entries(G.inventory.decor).filter(([, q]) => q > 0).map(([id, q]) => {
            const d = DECOR_BY_ID[id];
            return (
              <div key={id} className={`card ${decorPick === id ? 'selected' : ''}`} style={{ minWidth: 100, flexShrink: 0 }} onClick={() => setDecorPick(decorPick === id ? null : id)}>
                <span className="card-qty">{q}</span>
                <DecorSprite decorId={id} size={46} />
                <span className="card-name">{tr({ pt: d.namePT, en: d.nameEN })}</span>
              </div>
            );
          })}
          {Object.values(G.inventory.decor).every((q) => !q) && (
            <div className="hud-chip">{lang() === 'pt' ? 'Compre decorações nas lojas!' : 'Buy decorations at the shops!'}</div>
          )}
          {selDecor && (
            <Btn kind="danger" small onClick={() => { removeDecor(selDecor.uid); setSelected(null); }}>{t('remove')}</Btn>
          )}
        </div>
      )}

      {/* ficha do tile/planta selecionada */}
      {selected && !plantFlow && (
        <div className="plant-sheet">
          {selPlant ? (
            <PlantSheet
              p={selPlant}
              subMenu={subMenu}
              setSubMenu={setSubMenu}
              onClose={() => { setSelected(null); setSubMenu(null); }}
              onMove={() => setMoving(selPlant)}
              flashMsg={setFlash}
            />
          ) : selDecor ? (
            <Panel title={tr({ pt: DECOR_BY_ID[selDecor.decorId].namePT, en: DECOR_BY_ID[selDecor.decorId].nameEN })} onClose={() => setSelected(null)}>
              <Btn kind="danger" onClick={() => { removeDecor(selDecor.uid); setSelected(null); }}>{t('remove')}</Btn>
            </Panel>
          ) : (
            <Panel title={t('emptyTile')} onClose={() => setSelected(null)}>
              <div className="sheet-row">
                <Icon name="sun" size={15} />
                <b>{t('light')}:</b> {tr(LIGHT_LABEL[String(tileLight(area, selected.x, selected.y))] ?? { pt: String(tileLight(area, selected.x, selected.y)), en: String(tileLight(area, selected.x, selected.y)) })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                <Btn onClick={() => setPlantFlow({ step: 'seed', kind: 'seed' })}><Icon name="leaf" size={15} />{t('plantHere')}</Btn>
              </div>
            </Panel>
          )}
        </div>
      )}

      {/* fluxo de plantio */}
      {plantFlow && selected && (
        <div className="overlay" onClick={() => setPlantFlow(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(700px, 100%)' }}>
            <PlantingFlow
              flow={plantFlow}
              setFlow={setPlantFlow}
              tile={selected}
              onDone={(msg) => { setPlantFlow(null); if (msg) setFlash(msg); }}
            />
          </div>
        </div>
      )}
    </>
  );
}

// ============ FICHA DA PLANTA ============
type WaterMode = 'light' | 'normal' | 'deep' | 'mist' | 'bottom';
const WATER_CANS: { id: string; mode: WaterMode; amt: number; d: { pt: string; en: string } }[] = [
  { id: 'regador-velho', mode: 'normal', amt: 30, d: { pt: 'Rega equilibrada', en: 'Balanced watering' } },
  { id: 'regador-medio', mode: 'deep', amt: 50, d: { pt: 'Enche bem o solo', en: 'Soaks the soil deeply' } },
  { id: 'regador-preciso', mode: 'light', amt: 15, d: { pt: 'Rega leve e precisa', en: 'Light, precise pour' } },
  { id: 'borrifador', mode: 'mist', amt: 8, d: { pt: 'Névoa fina nas folhas', en: 'Fine mist on leaves' } },
];

const PRUNE_KINDS: { kind: 'clean' | 'deadhead' | 'shape' | 'root'; label: { pt: string; en: string }; fx: { pt: string; en: string }; needsShears: boolean; icon: string }[] = [
  { kind: 'clean', label: { pt: 'Limpar folhas mortas', en: 'Remove dead leaves' }, fx: { pt: 'Saúde +3 · menos fungo', en: 'Health +3 · less fungus' }, needsShears: false, icon: 'leaf' },
  { kind: 'deadhead', label: { pt: 'Tirar flores murchas', en: 'Deadhead' }, fx: { pt: 'Qualidade +4 · renova flores', en: 'Quality +4 · fresh blooms' }, needsShears: true, icon: 'flower' },
  { kind: 'shape', label: { pt: 'Poda de formação', en: 'Shape pruning' }, fx: { pt: 'Qualidade +6 · forma bonita', en: 'Quality +6 · nicer shape' }, needsShears: true, icon: 'scissors' },
  { kind: 'root', label: { pt: 'Poda de raiz', en: 'Root pruning' }, fx: { pt: 'Qualidade +10 · custa saúde', en: 'Quality +10 · costs health' }, needsShears: true, icon: 'scissors' },
];

const PROP_CHANCE: Record<string, number> = {
  'stem-cutting': 0.75, 'leaf-cutting': 0.65, division: 0.9, offset: 0.9, runner: 0.9, bulb: 0.85,
  rhizome: 0.85, tuber: 0.85, 'air-layering': 0.7, grafting: 0.5, 'water-propagation': 0.8, keiki: 0.85, spore: 0.5,
};

function fertFxLine(id: string): string {
  const fx = CONSUMABLE_BY_ID[id]?.fx ?? {};
  const parts: string[] = [];
  if (fx.n) parts.push(`N +${fx.n}`);
  if (fx.p) parts.push(`P +${fx.p}`);
  if (fx.k) parts.push(`K +${fx.k}`);
  if (fx.slowRelease) parts.push(lang() === 'pt' ? 'lento' : 'slow');
  return parts.join(' · ');
}
function treatFxLine(id: string): string {
  const fx = CONSUMABLE_BY_ID[id]?.fx ?? {};
  if (fx.healPest) return lang() === 'pt' ? `Pragas −${fx.healPest}%` : `Pests −${fx.healPest}%`;
  if (fx.healFungus) return lang() === 'pt' ? `Fungo −${fx.healFungus}%` : `Fungus −${fx.healFungus}%`;
  return '';
}

// cartão de opção rico (arte + nome + meta + efeito)
function OptCard(props: { art: JSX.Element; name: string; meta?: string; fx?: string; accent?: string; disabled?: boolean; onClick: () => void }): JSX.Element {
  return (
    <button className={`opt-card ${props.disabled ? 'off' : ''}`} disabled={props.disabled} onClick={() => { if (!props.disabled) { sfx('click'); props.onClick(); } }}>
      <span className="opt-art" style={props.accent ? { background: props.accent } : undefined}>{props.art}</span>
      <span className="opt-info">
        <span className="opt-name">{props.name}</span>
        {props.meta && <span className="opt-meta">{props.meta}</span>}
        {props.fx && <span className="opt-fx">{props.fx}</span>}
      </span>
      {!props.disabled && <span className="opt-go"><Icon name="arrow" size={15} /></span>}
    </button>
  );
}

// ladrilho de ação do hub
function ActTile(props: { icon: string; label: string; hint: string; tone?: string; active?: boolean; color?: string; onClick: () => void }): JSX.Element {
  return (
    <button className={`act-tile ${props.tone ?? ''} ${props.active ? 'active' : ''}`} onClick={() => { sfx('click'); props.onClick(); }}>
      <span className="act-ico"><Icon name={props.icon} size={20} color={props.color} /></span>
      <span className="act-txt">
        <span className="act-lab">{props.label}</span>
        <span className="act-hint">{props.hint}</span>
      </span>
    </button>
  );
}

function PlantSheet(props: {
  p: PlantInstance; subMenu: string | null; setSubMenu: (s: 'water' | 'fert' | 'treat' | 'prune' | 'prop' | 'repot' | null) => void;
  onClose: () => void; onMove: () => void; flashMsg: (m: string) => void;
}): JSX.Element {
  const { p, subMenu, setSubMenu } = props;
  const def = PLANT_BY_ID[p.plantId];
  const dead = isDead(p);
  const hl = healthLabel(p);
  const ms = moistureState(p);
  const light = effectiveLight(p);
  const mix = resolveMix(p.soilMixId);
  const pot = p.potId ? POT_BY_ID[p.potId] : null;
  const saleValue = plantSaleValue(p);
  const en = lang() !== 'pt';
  const msLabel: Record<string, { pt: string; en: string }> = {
    seca: { pt: 'Seca!', en: 'Dry!' }, baixa: { pt: 'Baixa', en: 'Low' }, ideal: { pt: 'Ideal', en: 'Ideal' },
    alta: { pt: 'Alta', en: 'High' }, encharcada: { pt: 'Encharcada!', en: 'Soggy!' },
  };
  // executa uma ação e sempre mostra ao jogador o que aconteceu
  const act = (fn: () => { ok: boolean; msg?: { pt: string; en: string } }, confirm?: { pt: string; en: string }) => {
    const res = fn();
    if (res.msg) props.flashMsg(tr(res.msg));
    else if (confirm) props.flashMsg(tr(confirm));
    setSubMenu(null);
  };
  const toggle = (s: 'water' | 'fert' | 'treat' | 'prune' | 'prop' | 'repot') => setSubMenu(subMenu === s ? null : s);

  const nutrAvg = Math.round((p.nutrients.n + p.nutrients.p + p.nutrients.k) / 3);
  const ferts = Object.entries(G.inventory.fertilizers).filter(([, q]) => q > 0);
  const treats = Object.entries(G.inventory.treatments).filter(([, q]) => q > 0);
  const cans = WATER_CANS.filter((c) => G.inventory.tools[c.id]);
  const hasShears = !!G.inventory.tools['tesoura-poda'];
  const hasBonsai = !!G.inventory.tools['tesoura-bonsai'];
  const hasProblem = p.pests.length > 0 || !!p.disease;

  return (
    <Panel title={tr({ pt: def.commonNamePT, en: def.commonNameEN })} onClose={props.onClose} className="care-sheet">
      {/* herói: retrato + identidade + vitais */}
      <div className="care-hero">
        <div className="care-portrait">
          <PlantSprite plantId={p.plantId} size={92} stage="flowering" seed={p.variantSeed} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="care-sci">{def.scientificName}</div>
          <div className="care-badges">
            <span className={`pill ${dead ? 'problem' : p.health >= 70 ? 'good' : ''}`}><Icon name="heart" size={11} />{tr(hl)}</span>
            <span className="pill">{tr(STAGE_LABEL[p.stage])}</span>
            {p.stage === 'flowering' && <span className="pill good"><Icon name="flower" size={11} color="#c86888" />{t('bloom')}</span>}
          </div>
          <div style={{ marginTop: 6 }}>
            <Bar value={p.health} max={100} color={p.health > 60 ? '#68a858' : p.health > 30 ? '#d8a038' : '#c85848'} label={t('health')} icon={<Icon name="heart" size={12} color="#d86878" />} />
            <Bar value={p.moisture} max={100} color="#5aa8d8" label={`${t('moisture')} · ${tr(msLabel[ms])}`} icon={<Icon name="drop" size={12} />} />
            <Bar value={nutrAvg} max={100} color="#a8884a" label={t('nutrients')} icon={<Icon name="leaf" size={12} />} />
            <Bar value={p.quality} max={100} color="#c8a040" label={t('quality')} icon={<Icon name="star" size={12} />} />
          </div>
        </div>
      </div>

      <div className="care-chips">
        <span className="pill"><Icon name="sun" size={11} />{tr(LIGHT_LABEL[light])}</span>
        <span className="pill">{pot ? tr({ pt: pot.namePT, en: pot.nameEN }) : t('ground')}</span>
        <span className="pill">{tr({ pt: mix.namePT, en: mix.nameEN })}</span>
        <span className="pill"><Icon name="clock" size={11} color="#8a7a52" />{p.ageDays} {t('days')}</span>
      </div>

      {/* problemas */}
      {(p.pests.length > 0 || p.disease || p.stress.length > 0) && !dead && (
        <div className="care-chips" style={{ marginTop: 6 }}>
          {p.pests.map((pe) => <span key={pe.id} className="pill problem"><Icon name="warn" size={11} />{pestName(pe.id)} ({Math.round(pe.severity)}%)</span>)}
          {p.disease && <span className="pill problem"><Icon name="skull" size={11} />{diseaseName(p.disease.id)} ({Math.round(p.disease.severity)}%)</span>}
          {p.stress.map((s) => <span key={s} className="pill problem">{stressName(s)}</span>)}
        </div>
      )}
      {p.keikiReady && <div className="pill good" style={{ marginTop: 6 }}>{t('keiki')}</div>}

      {dead ? (
        <div className="sheet-actions" style={{ marginTop: 10 }}>
          <Btn kind="danger" onClick={() => { removePlant(p); props.onClose(); }}>{t('removeDead')}</Btn>
        </div>
      ) : (
        <>
          {/* HUB DE CUIDADOS */}
          <div className="care-sect-title">{en ? 'Daily care' : 'Cuidados'}</div>
          <div className="act-grid">
            <ActTile icon="drop" color="#5aa8d8" label={t('water')} hint={ms === 'seca' || ms === 'baixa' ? (en ? 'Needs water!' : 'Precisa de água!') : `${en ? 'Moisture' : 'Umidade'} ${Math.round(p.moisture)}%`} tone="blue" active={subMenu === 'water'} onClick={() => toggle('water')} />
            <ActTile icon="leaf" color="#8a9a4a" label={t('fertilize')} hint={ferts.length ? `${en ? 'Nutrients' : 'Nutrientes'} ${nutrAvg}%` : (en ? 'No stock' : 'Sem estoque')} tone="green" active={subMenu === 'fert'} onClick={() => toggle('fert')} />
            <ActTile icon="warn" color="#d8a038" label={t('treat')} hint={hasProblem ? (en ? 'Problem here!' : 'Tem problema!') : (en ? 'Healthy' : 'Saudável')} tone={hasProblem ? 'warn' : ''} active={subMenu === 'treat'} onClick={() => toggle('treat')} />
            <ActTile icon="scissors" color="#7a8a6a" label={t('prune')} hint={en ? 'Shape & clean' : 'Formar e limpar'} active={subMenu === 'prune'} onClick={() => toggle('prune')} />
          </div>

          <div className="care-sect-title">{en ? 'Multiply & move' : 'Multiplicar e mover'}</div>
          <div className="act-grid">
            <ActTile icon="seedbag" label={t('propagate')} hint={en ? 'New cuttings' : 'Gerar mudas'} active={subMenu === 'prop'} onClick={() => toggle('prop')} />
            <ActTile icon="grid" label={t('repot')} hint={en ? 'Pot & soil' : 'Vaso e solo'} active={subMenu === 'repot'} onClick={() => toggle('repot')} />
            <ActTile icon="arrow" label={t('move')} hint={en ? 'Change spot' : 'Trocar de lugar'} onClick={props.onMove} />
          </div>

          {(p.stage === 'flowering' || p.seedsReady) && (
            <>
              <div className="care-sect-title">{en ? 'Harvest' : 'Colheita'}</div>
              <div className="act-grid">
                {p.stage === 'flowering' && <ActTile icon="flower" color="#c86888" label={en ? 'Cut flower' : 'Colher flor'} hint={en ? 'Adds to inventory' : 'Vai pro inventário'} tone="gold" onClick={() => act(() => harvestFlower(p), { pt: `Você colheu uma flor de ${def.commonNamePT}.`, en: `You cut a ${def.commonNameEN} flower.` })} />}
                {p.seedsReady && <ActTile icon="seedbag" color="#c8a040" label={t('collect')} hint={en ? 'Collect seeds' : 'Guardar sementes'} tone="gold" onClick={() => act(() => harvestSeeds(p))} />}
              </div>
            </>
          )}

          {/* barra final: vender / drenar / remover */}
          <div className="care-foot">
            <Btn small kind="gold" onClick={() => { sellPlant(p); props.onClose(); }}><Icon name="coin" size={13} />{t('sell')} ({saleValue})</Btn>
            {(ms === 'encharcada' || ms === 'alta') && p.potId && <Btn small kind="ghost" onClick={() => act(() => drainSaucer(p), { pt: 'Você drenou o excesso de água do prato.', en: 'You drained the saucer.' })}>{en ? 'Drain saucer' : 'Drenar prato'}</Btn>}
            <Btn small kind="danger" onClick={() => { removePlant(p); props.onClose(); }}>{t('remove')}</Btn>
          </div>

          {/* ============ FOLHAS DE AÇÃO ============ */}
          {subMenu === 'water' && (
            <div className="act-sheet">
              <div className="act-sheet-head"><Icon name="drop" size={14} />{en ? 'Water with which can?' : 'Regar com qual regador?'}<span className="act-sheet-sub">{en ? 'Moisture now' : 'Umidade agora'}: {Math.round(p.moisture)}%</span></div>
              {cans.map((c) => (
                <OptCard key={c.id} art={<ToolSprite toolId={c.id} size={40} />} accent="#e8f0f6"
                  name={tr({ pt: TOOL_BY_ID[c.id].namePT, en: TOOL_BY_ID[c.id].nameEN })}
                  meta={tr(c.d)} fx={`${en ? 'Moisture' : 'Umidade'} +${c.amt}`}
                  onClick={() => act(() => waterPlant(p, c.mode), { pt: `Você regou com ${TOOL_BY_ID[c.id].namePT} (+${c.amt} de umidade).`, en: `Watered with ${TOOL_BY_ID[c.id].nameEN} (+${c.amt} moisture).` })} />
              ))}
              {G.rainBarrel && G.rainWater > 0 && <div className="act-note"><Icon name="rain" size={12} />{en ? 'Using free rainwater (+3 bonus).' : 'Usando água da chuva grátis (+3 de bônus).'}</div>}
            </div>
          )}

          {subMenu === 'fert' && (
            <div className="act-sheet">
              <div className="act-sheet-head"><Icon name="leaf" size={14} />{en ? 'Feed with which fertilizer?' : 'Adubar com qual fertilizante?'}<span className="act-sheet-sub">{en ? 'Nutrients' : 'Nutrientes'}: {nutrAvg}%</span></div>
              {ferts.map(([id, q]) => (
                <OptCard key={id} art={<ConsumableSprite itemId={id} size={40} />}
                  name={tr({ pt: CONSUMABLE_BY_ID[id].namePT, en: CONSUMABLE_BY_ID[id].nameEN })}
                  meta={`${en ? 'You have' : 'Você tem'} ×${q}`} fx={fertFxLine(id)}
                  onClick={() => act(() => fertilize(p, id), { pt: `Você adubou com ${CONSUMABLE_BY_ID[id].namePT}.`, en: `Fed with ${CONSUMABLE_BY_ID[id].nameEN}.` })} />
              ))}
              {!ferts.length && <div className="act-empty"><Icon name="warn" size={13} />{en ? 'No fertilizer in your bag. Buy some at the shop.' : 'Sem adubo na bolsa. Compre na loja.'}</div>}
            </div>
          )}

          {subMenu === 'treat' && (
            <div className="act-sheet">
              <div className="act-sheet-head"><Icon name="warn" size={14} />{en ? 'How to treat?' : 'Como tratar?'}</div>
              <OptCard art={<Icon name="people" size={26} color="#7a8a5a" />} accent="#eef0e4"
                name={en ? 'Pick by hand' : 'Catar à mão'} meta={en ? 'Free' : 'De graça'} fx={en ? 'Pests −22%' : 'Pragas −22%'}
                disabled={!p.pests.length}
                onClick={() => act(() => removePestByHand(p), { pt: 'Você catou as pragas à mão.', en: 'You picked the pests by hand.' })} />
              {treats.map(([id, q]) => (
                <OptCard key={id} art={<ConsumableSprite itemId={id} size={40} />}
                  name={tr({ pt: CONSUMABLE_BY_ID[id].namePT, en: CONSUMABLE_BY_ID[id].nameEN })}
                  meta={`${en ? 'You have' : 'Você tem'} ×${q}`} fx={treatFxLine(id)}
                  onClick={() => act(() => treatPlant(p, id), { pt: `Você tratou a planta com ${CONSUMABLE_BY_ID[id].namePT}.`, en: `Treated with ${CONSUMABLE_BY_ID[id].nameEN}.` })} />
              ))}
              {!treats.length && <div className="act-note">{en ? 'No sprays in your bag — hand-picking still works.' : 'Sem defensivos na bolsa — catar à mão ainda funciona.'}</div>}
            </div>
          )}

          {subMenu === 'prune' && (
            <div className="act-sheet">
              <div className="act-sheet-head"><Icon name="scissors" size={14} />{en ? 'What to prune?' : 'O que podar?'}</div>
              {PRUNE_KINDS.filter((k) => k.kind !== 'root' || def.category === 'bonsai-tree').map((k) => {
                const locked = (k.needsShears && !hasShears) || (k.kind === 'root' && !hasBonsai);
                return (
                  <OptCard key={k.kind} art={<Icon name={k.icon} size={24} color="#7a8a6a" />} accent="#eef0e4"
                    name={tr(k.label)} meta={locked ? (en ? 'Needs pruning shears' : 'Precisa da tesoura de poda') : undefined} fx={locked ? undefined : tr(k.fx)}
                    disabled={locked}
                    onClick={() => act(() => prunePlant(p, k.kind), { pt: `Você fez: ${k.label.pt.toLowerCase()}.`, en: `Done: ${k.label.en.toLowerCase()}.` })} />
                );
              })}
            </div>
          )}

          {subMenu === 'prop' && (
            <div className="act-sheet">
              <div className="act-sheet-head"><Icon name="seedbag" size={14} />{en ? 'Propagate how?' : 'Propagar como?'}{G.inventory.tools['bandeja-propagacao'] && <span className="act-sheet-sub">{en ? '+15% tray bonus' : '+15% bônus bandeja'}</span>}</div>
              {def.propagationMethods.filter((m) => m !== 'seed').map((m: PropagationMethod) => {
                const base = Math.round((PROP_CHANCE[m] ?? 0.7) * 100 + (G.inventory.tools['bandeja-propagacao'] ? 15 : 0));
                return (
                  <OptCard key={m} art={<Icon name="leaf" size={24} color="#68a858" />} accent="#eaf0e2"
                    name={tr(PROP_LABEL[m] ?? { pt: m, en: m })} meta={`${en ? 'Success' : 'Sucesso'} ~${Math.min(98, base)}%`} fx={en ? 'Costs some health' : 'Custa um pouco de saúde'}
                    onClick={() => act(() => propagate(p, m))} />
                );
              })}
              {def.propagationMethods.includes('seed') && <div className="act-note">{en ? 'Seeds: harvest during the seeding stage.' : 'Sementes: colha na fase de sementes.'}</div>}
            </div>
          )}

          {subMenu === 'repot' && (
            <div className="act-sheet">
              <div className="act-sheet-head"><Icon name="grid" size={14} />{t('choosePot')}</div>
              {Object.entries(G.inventory.pots).filter(([, q]) => q > 0).map(([id, q]) => (
                <OptCard key={id} art={<PotSprite potId={id} size={40} />}
                  name={tr({ pt: POT_BY_ID[id].namePT, en: POT_BY_ID[id].nameEN })} meta={`×${q}`}
                  onClick={() => act(() => repotPlant(p, id, null), { pt: `Você replantou em ${POT_BY_ID[id].namePT}.`, en: `Repotted into ${POT_BY_ID[id].nameEN}.` })} />
              ))}
              <div className="act-sheet-head" style={{ marginTop: 8 }}><Icon name="leaf" size={14} />{t('chooseSoil')}</div>
              {Object.entries(G.inventory.soilMixes).filter(([, q]) => q > 0).map(([id, q]) => (
                <OptCard key={id} art={<SoilSprite soilId={id} size={40} mix />}
                  name={tr({ pt: resolveMix(id).namePT, en: resolveMix(id).nameEN })} meta={`×${q}`}
                  onClick={() => act(() => repotPlant(p, null, id), { pt: `Você trocou o solo por ${resolveMix(id).namePT}.`, en: `Swapped soil for ${resolveMix(id).nameEN}.` })} />
              ))}
              {!Object.values(G.inventory.pots).some((q) => q > 0) && !Object.values(G.inventory.soilMixes).some((q) => q > 0) && <div className="act-empty"><Icon name="warn" size={13} />{en ? 'No pots or soil mixes in stock.' : 'Sem vasos ou misturas de solo em estoque.'}</div>}
            </div>
          )}
        </>
      )}
    </Panel>
  );
}

// ============ FLUXO DE PLANTIO ============
function PlantingFlow(props: {
  flow: NonNullable<PlantFlow>; setFlow: (f: PlantFlow) => void;
  tile: { x: number; y: number };
  onDone: (msg?: string) => void;
}): JSX.Element {
  const { flow, setFlow, tile } = props;

  if (flow.step === 'seed') {
    const groups: { kind: 'seed' | 'seedling' | 'cutting'; label: string; inv: Record<string, number> }[] = [
      { kind: 'seed', label: t('seeds'), inv: G.inventory.seeds },
      { kind: 'seedling', label: t('seedlings'), inv: G.inventory.seedlings },
      { kind: 'cutting', label: t('cuttings'), inv: G.inventory.cuttings },
    ];
    return (
      <Panel title={t('chooseSeed')} onClose={() => props.onDone()}>
        {groups.map((g) => {
          const items = Object.entries(g.inv).filter(([, q]) => q > 0);
          if (!items.length) return null;
          return (
            <div key={g.kind}>
              <div className="card-sub" style={{ margin: '6px 0' }}>{g.label}</div>
              <div className="card-grid small">
                {items.map(([id, q]) => {
                  const def = PLANT_BY_ID[id];
                  if (!def) return null;
                  const check = canPlantHere(id, G.currentArea, tile.x, tile.y, null);
                  return (
                    <div key={id} className="card" onClick={() => setFlow({ step: 'pot', kind: g.kind, plantId: id })}>
                      <span className="card-qty">{q}</span>
                      <PlantSprite plantId={id} size={56} />
                      <span className="card-name">{tr({ pt: def.commonNamePT, en: def.commonNameEN })}</span>
                      {!check.ok && <span className="pill problem" style={{ fontSize: 9 }}>{tr(check.msg!)}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {Object.values(G.inventory.seeds).every((q) => !q) && Object.values(G.inventory.seedlings).every((q) => !q) && Object.values(G.inventory.cuttings).every((q) => !q) && (
          <div className="card-sub">{t('emptyInv')}</div>
        )}
      </Panel>
    );
  }

  if (flow.step === 'pot') {
    const def = PLANT_BY_ID[flow.plantId!];
    const area = AREA_BY_ID[G.currentArea];
    const groundOk = canPlantHere(flow.plantId!, G.currentArea, tile.x, tile.y, null);
    return (
      <Panel title={`${tr({ pt: def.commonNamePT, en: def.commonNameEN })} — ${t('choosePot')}`} onClose={() => props.onDone()}>
        <div className="card-grid small">
          {!area.indoor && (
            <div className={`card ${!groundOk.ok ? 'locked' : ''}`} onClick={() => groundOk.ok && setFlow({ ...flow, step: 'soil', potId: null })}>
              <Icon name="leaf" size={40} />
              <span className="card-name">{t('ground')}</span>
              {!groundOk.ok && <span className="pill problem" style={{ fontSize: 9 }}>{tr(groundOk.msg!)}</span>}
            </div>
          )}
          {Object.entries(G.inventory.pots).filter(([, q]) => q > 0).map(([id, q]) => {
            const pot = POT_BY_ID[id];
            const check = canPlantHere(flow.plantId!, G.currentArea, tile.x, tile.y, id);
            return (
              <div key={id} className={`card ${!check.ok ? 'locked' : ''}`} onClick={() => check.ok && setFlow({ ...flow, step: 'soil', potId: id })}>
                <span className="card-qty">{q}</span>
                <PotSprite potId={id} size={52} />
                <span className="card-name">{tr({ pt: pot.namePT, en: pot.nameEN })}</span>
                {!check.ok && <span className="pill problem" style={{ fontSize: 9 }}>{tr(check.msg!)}</span>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 8 }}>
          <Btn kind="ghost" small onClick={() => setFlow({ ...flow, step: 'seed' })}>{t('back')}</Btn>
        </div>
      </Panel>
    );
  }

  // solo
  const def = PLANT_BY_ID[flow.plantId!];
  return (
    <Panel title={`${tr({ pt: def.commonNamePT, en: def.commonNameEN })} — ${t('chooseSoil')}`} onClose={() => props.onDone()}>
      <div className="card-grid small">
        {Object.entries(G.inventory.soilMixes).filter(([, q]) => q > 0).map(([id, q]) => {
          const mix = resolveMix(id);
          const good = mix.goodFor.includes(def.category);
          return (
            <div key={id} className="card" onClick={() => {
              const res = plantSeed(flow.kind, flow.plantId!, G.currentArea, tile.x, tile.y, flow.potId ?? null, id);
              props.onDone(res.msg ? tr(res.msg) : (lang() === 'pt' ? 'Plantada com carinho!' : 'Planted with care!'));
            }}>
              <span className="card-qty">{q}</span>
              <SoilSprite soilId={id} size={46} mix />
              <span className="card-name">{tr({ pt: mix.namePT, en: mix.nameEN })}</span>
              {good && <span className="pill good" style={{ fontSize: 9 }}>{lang() === 'pt' ? 'Recomendado' : 'Recommended'}</span>}
              <span className="card-sub" style={{ fontSize: 9 }}>pH {mix.pH.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
      {SOIL_MIX_BY_ID && Object.values(G.inventory.soilMixes).every((q) => !q) && <div className="card-sub">{t('emptyInv')}</div>}
      <div style={{ marginTop: 8 }}>
        <Btn kind="ghost" small onClick={() => setFlow({ ...flow, step: 'pot' })}>{t('back')}</Btn>
      </div>
    </Panel>
  );
}

// nomes de pragas/doenças/estresse
export function pestName(id: string): string {
  const M: Record<string, { pt: string; en: string }> = {
    aphids: { pt: 'Pulgões', en: 'Aphids' }, mealybugs: { pt: 'Cochonilhas', en: 'Mealybugs' },
    'spider-mites': { pt: 'Ácaros', en: 'Spider mites' }, whitefly: { pt: 'Mosca-branca', en: 'Whitefly' },
    slugs: { pt: 'Lesmas', en: 'Slugs' }, caterpillars: { pt: 'Lagartas', en: 'Caterpillars' },
    'fungus-gnats': { pt: 'Fungus gnats', en: 'Fungus gnats' }, thrips: { pt: 'Tripes', en: 'Thrips' },
  };
  return tr(M[id] ?? { pt: id, en: id });
}
export function diseaseName(id: string): string {
  const M: Record<string, { pt: string; en: string }> = {
    'powdery-mildew': { pt: 'Oídio', en: 'Powdery mildew' }, 'downy-mildew': { pt: 'Míldio', en: 'Downy mildew' },
    'root-rot': { pt: 'Podridão de raiz', en: 'Root rot' }, 'leaf-spot': { pt: 'Manchas foliares', en: 'Leaf spot' },
    rust: { pt: 'Ferrugem', en: 'Rust' }, 'soil-mold': { pt: 'Mofo no solo', en: 'Soil mold' },
  };
  return tr(M[id] ?? { pt: id, en: id });
}
export function stressName(id: string): string {
  const M: Record<string, { pt: string; en: string }> = {
    overwatering: { pt: 'Encharcada', en: 'Overwatered' }, underwatering: { pt: 'Com sede', en: 'Thirsty' },
    sunburn: { pt: 'Queimada de sol', en: 'Sunburnt' }, etiolation: { pt: 'Estiolada (pouca luz)', en: 'Etiolated (low light)' },
    'nutrient-deficiency': { pt: 'Faltam nutrientes', en: 'Nutrient-poor' },
  };
  return tr(M[id] ?? { pt: id, en: id });
}
