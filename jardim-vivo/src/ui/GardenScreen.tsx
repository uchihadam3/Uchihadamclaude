import type { JSX } from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { PlantInstance, PropagationMethod } from '../types';
import { G, plantAt, decorAt, isDead, resolveMix } from '../game/gameState';
import { AREA_BY_ID, tileLight } from '../data/areasData';
import { PLANT_BY_ID } from '../data/plants';
import { POT_BY_ID } from '../data/potsData';
import { SOIL_MIX_BY_ID } from '../data/soilData';
import { DECOR_BY_ID } from '../data/decorData';
import { CONSUMABLE_BY_ID } from '../data/toolsData';
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
import { Btn, Panel, Bar, PlantSprite, PotSprite, Icon, LIGHT_LABEL, STAGE_LABEL, WATER_LABEL, categoryLabel } from './components';
import { fmtClock, seasonNamePT, seasonNameEN, dayPhase } from '../game/gameTime';

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
  const [subMenu, setSubMenu] = useState<'fert' | 'treat' | 'prune' | 'prop' | 'repot' | null>(null);
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
                <Icon name="hammer" size={22} color="#7a6a4a" />
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
function PlantSheet(props: {
  p: PlantInstance; subMenu: string | null; setSubMenu: (s: 'fert' | 'treat' | 'prune' | 'prop' | 'repot' | null) => void;
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
  const msLabel: Record<string, { pt: string; en: string }> = {
    seca: { pt: 'Seca!', en: 'Dry!' }, baixa: { pt: 'Baixa', en: 'Low' }, ideal: { pt: 'Ideal', en: 'Ideal' },
    alta: { pt: 'Alta', en: 'High' }, encharcada: { pt: 'Encharcada!', en: 'Soggy!' },
  };
  const act = (fn: () => { ok: boolean; msg?: { pt: string; en: string } }) => {
    const res = fn();
    if (res.msg) props.flashMsg(tr(res.msg));
  };

  return (
    <Panel title={tr({ pt: def.commonNamePT, en: def.commonNameEN })} onClose={props.onClose}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ background: 'rgba(90,110,70,0.15)', borderRadius: 10, padding: 2 }}>
          <PlantSprite plantId={p.plantId} size={84} stage={p.stage === 'flowering' ? 'flowering' : 'mature'} seed={p.variantSeed} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card-sub">{def.scientificName}</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
            <span className={`pill ${dead ? 'problem' : p.health >= 70 ? 'good' : ''}`}>{tr(hl)}</span>
            <span className="pill">{tr(STAGE_LABEL[p.stage])}</span>
            {p.stage === 'flowering' && <span className="pill good"><Icon name="flower" size={11} color="#c86888" />{t('bloom')}</span>}
          </div>
          <div style={{ marginTop: 6 }}>
            <Bar value={p.health} max={100} color={p.health > 60 ? '#68a858' : p.health > 30 ? '#d8a038' : '#c85848'} label={t('health')} />
            <Bar value={p.moisture} max={100} color="#5aa8d8" label={`${t('moisture')} (${tr(msLabel[ms])})`} />
            <Bar value={(p.nutrients.n + p.nutrients.p + p.nutrients.k) / 3} max={100} color="#a8884a" label={t('nutrients')} />
            <Bar value={p.quality} max={100} color="#c8a040" label={t('quality')} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8, fontSize: 12 }}>
        <span className="pill"><Icon name="sun" size={11} />{tr(LIGHT_LABEL[light])}</span>
        <span className="pill">{pot ? tr({ pt: pot.namePT, en: pot.nameEN }) : t('ground')}</span>
        <span className="pill">{tr({ pt: mix.namePT, en: mix.nameEN })}</span>
        <span className="pill">{t('age')}: {p.ageDays} {t('days')}</span>
      </div>

      {/* problemas */}
      {(p.pests.length > 0 || p.disease || p.stress.length > 0) && !dead && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
          {p.pests.map((pe) => <span key={pe.id} className="pill problem"><Icon name="warn" size={11} />{pestName(pe.id)} ({Math.round(pe.severity)}%)</span>)}
          {p.disease && <span className="pill problem"><Icon name="skull" size={11} />{diseaseName(p.disease.id)} ({Math.round(p.disease.severity)}%)</span>}
          {p.stress.map((s) => <span key={s} className="pill problem">{stressName(s)}</span>)}
        </div>
      )}
      {p.keikiReady && <div className="pill good" style={{ marginTop: 6 }}>{t('keiki')}</div>}

      {/* ações */}
      {dead ? (
        <div className="sheet-actions">
          <Btn kind="danger" onClick={() => { removePlant(p); props.onClose(); }}>{t('removeDead')}</Btn>
        </div>
      ) : (
        <div className="sheet-actions">
          <Btn small onClick={() => act(() => waterPlant(p))}><Icon name="drop" size={13} />{t('water')}</Btn>
          <Btn small kind="ghost" onClick={() => setSubMenu(subMenu === 'fert' ? null : 'fert')}>{t('fertilize')}</Btn>
          <Btn small kind="ghost" onClick={() => setSubMenu(subMenu === 'prune' ? null : 'prune')}><Icon name="scissors" size={13} />{t('prune')}</Btn>
          <Btn small kind="ghost" onClick={() => setSubMenu(subMenu === 'treat' ? null : 'treat')}>{t('treat')}</Btn>
          <Btn small kind="ghost" onClick={() => setSubMenu(subMenu === 'prop' ? null : 'prop')}>{t('propagate')}</Btn>
          <Btn small kind="ghost" onClick={() => setSubMenu(subMenu === 'repot' ? null : 'repot')}>{t('repot')}</Btn>
          {p.stage === 'flowering' && <Btn small kind="gold" onClick={() => act(() => harvestFlower(p))}><Icon name="flower" size={13} color="#a85878" />{lang() === 'pt' ? 'Colher flor' : 'Cut flower'}</Btn>}
          {p.seedsReady && <Btn small kind="gold" onClick={() => act(() => harvestSeeds(p))}>{t('collect')}</Btn>}
          <Btn small kind="ghost" onClick={props.onMove}>{t('move')}</Btn>
          <Btn small kind="gold" onClick={() => { sellPlant(p); props.onClose(); }}><Icon name="coin" size={13} />{t('sell')} ({saleValue})</Btn>
          {(ms === 'encharcada' || ms === 'alta') && p.potId && <Btn small kind="ghost" onClick={() => act(() => drainSaucer(p))}>{lang() === 'pt' ? 'Drenar prato' : 'Drain saucer'}</Btn>}
          <Btn small kind="danger" onClick={() => { removePlant(p); props.onClose(); }}>{t('remove')}</Btn>
        </div>
      )}

      {/* submenus */}
      {subMenu === 'fert' && (
        <div style={{ marginTop: 8 }}>
          {Object.entries(G.inventory.fertilizers).filter(([, q]) => q > 0).map(([id, q]) => (
            <Btn key={id} small kind="ghost" onClick={() => act(() => fertilize(p, id))}>{tr({ pt: CONSUMABLE_BY_ID[id].namePT, en: CONSUMABLE_BY_ID[id].nameEN })} ×{q}</Btn>
          ))}
          {Object.values(G.inventory.fertilizers).every((q) => !q) && <div className="card-sub">{t('emptyInv')}</div>}
        </div>
      )}
      {subMenu === 'treat' && (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Btn small kind="ghost" onClick={() => act(() => removePestByHand(p))}>{lang() === 'pt' ? 'Catar à mão' : 'Pick by hand'}</Btn>
          {Object.entries(G.inventory.treatments).filter(([, q]) => q > 0).map(([id, q]) => (
            <Btn key={id} small kind="ghost" onClick={() => act(() => treatPlant(p, id))}>{tr({ pt: CONSUMABLE_BY_ID[id].namePT, en: CONSUMABLE_BY_ID[id].nameEN })} ×{q}</Btn>
          ))}
        </div>
      )}
      {subMenu === 'prune' && (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Btn small kind="ghost" onClick={() => act(() => prunePlant(p, 'clean'))}>{lang() === 'pt' ? 'Limpar folhas mortas' : 'Remove dead leaves'}</Btn>
          <Btn small kind="ghost" onClick={() => act(() => prunePlant(p, 'deadhead'))}>{lang() === 'pt' ? 'Tirar flores murchas' : 'Deadhead'}</Btn>
          <Btn small kind="ghost" onClick={() => act(() => prunePlant(p, 'shape'))}>{lang() === 'pt' ? 'Poda de formação' : 'Shape pruning'}</Btn>
          {def.category === 'bonsai-tree' && <Btn small kind="ghost" onClick={() => act(() => prunePlant(p, 'root'))}>{lang() === 'pt' ? 'Poda de raiz' : 'Root pruning'}</Btn>}
        </div>
      )}
      {subMenu === 'prop' && (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {def.propagationMethods.filter((m) => m !== 'seed').map((m: PropagationMethod) => (
            <Btn key={m} small kind="ghost" onClick={() => act(() => propagate(p, m))}>{tr(PROP_LABEL[m])}</Btn>
          ))}
          {def.propagationMethods.includes('seed') && <span className="pill">{lang() === 'pt' ? 'Sementes: colha na fase de sementes' : 'Seeds: harvest at seeding stage'}</span>}
        </div>
      )}
      {subMenu === 'repot' && (
        <div style={{ marginTop: 8 }}>
          <div className="card-sub" style={{ marginBottom: 4 }}>{t('choosePot')}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {Object.entries(G.inventory.pots).filter(([, q]) => q > 0).map(([id]) => (
              <Btn key={id} small kind="ghost" onClick={() => act(() => repotPlant(p, id, null))}>{tr({ pt: POT_BY_ID[id].namePT, en: POT_BY_ID[id].nameEN })}</Btn>
            ))}
          </div>
          <div className="card-sub" style={{ margin: '6px 0 4px' }}>{t('chooseSoil')}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {Object.entries(G.inventory.soilMixes).filter(([, q]) => q > 0).map(([id]) => (
              <Btn key={id} small kind="ghost" onClick={() => act(() => repotPlant(p, null, id))}>{tr({ pt: resolveMix(id).namePT, en: resolveMix(id).nameEN })}</Btn>
            ))}
          </div>
        </div>
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
              <Icon name="seedbag" size={38} />
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
