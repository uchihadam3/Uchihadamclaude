import type { JSX } from 'react';
import { useState } from 'react';
import { G, isDead, notify } from '../game/gameState';
import { MAIN_QUESTS, SIDE_QUESTS, RESTORATIONS } from '../data/questsData';
import { NPCS, NPC_BY_ID } from '../data/npcData';
import { AREAS, AREA_BY_ID } from '../data/areasData';
import { PLANT_BY_ID } from '../data/plants';
import { SOIL_COMPONENTS, computeMix } from '../data/soilData';
import { ARRANGEMENT_STYLES } from '../data/competitionData';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { todaysCompetitions, upcomingCompetitions, enterCompetition } from '../game/competitionSystem';
import { fulfillRequest, meetNpc, unlockArea, addFriendship } from '../game/progressSystems';
import { previewArrangement, craftArrangement } from '../game/arrangementSystem';
import { saveSoilRecipe } from '../game/actions';
import { computeHarmony } from '../game/gardenScoring';
import { saveGame, exportSave, importSave, resetGame } from '../game/saveSystem';
import { setVolumes } from '../audio/audioEngine';
import { plantSaleValue } from '../game/economySystem';
import { absoluteDay } from '../game/gameTime';
import { tr, t, lang } from '../i18n';
import { useGame, useFlash } from './useGame';
import { Btn, Panel, Bar, PlantSprite, Icon, NpcPortrait, categoryLabel } from './components';

function Overlay(props: { onClose: () => void; children: React.ReactNode; width?: string }): JSX.Element {
  return (
    <div className="overlay" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: props.width ?? 'min(720px,100%)', maxHeight: '100%' }}>{props.children}</div>
    </div>
  );
}

// ============ MISSÕES ============
export function QuestsScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [tab, setTab] = useState<'main' | 'side' | 'done'>('main');
  const goalText = (q: typeof MAIN_QUESTS[0]): string => {
    const g = q.goal as { count?: number; amount?: number; score?: number };
    const target = g.count ?? g.amount ?? g.score ?? 1;
    const st = G.quests[q.id];
    return `${Math.min(st.progress, target)}/${target}`;
  };
  const rows = (list: typeof MAIN_QUESTS, done: boolean) => list
    .filter((q) => (G.quests[q.id]?.status === 'done') === done && G.quests[q.id]?.status !== 'locked')
    .map((q) => (
      <div key={q.id} className="card" style={{ alignItems: 'flex-start', textAlign: 'left', cursor: 'default' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
          <Icon name={done ? 'trophy' : 'scroll'} size={18} color={done ? '#c8a040' : '#7a6a4a'} />
          <b style={{ fontSize: 13 }}>{tr({ pt: q.titlePT, en: q.titleEN })}</b>
          <span style={{ flex: 1 }} />
          {!done && <span className="pill">{goalText(q)}</span>}
        </div>
        <span className="card-sub" style={{ textAlign: 'left' }}>{tr({ pt: q.descPT, en: q.descEN })}</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {q.rewardMoney > 0 && <span className="pill good"><Icon name="coin" size={11} />{q.rewardMoney}</span>}
          {q.rewardRep > 0 && <span className="pill good"><Icon name="star" size={11} />{q.rewardRep}</span>}
          {q.npcId && <span className="pill">{NPC_BY_ID[q.npcId]?.namePT}</span>}
        </div>
      </div>
    ));

  return (
    <Overlay onClose={props.onClose}>
      <Panel title={t('quests')} onClose={props.onClose}>
        <div className="tabs">
          <button className={`tab ${tab === 'main' ? 'active' : ''}`} onClick={() => setTab('main')}>{lang() === 'pt' ? 'Principais' : 'Main'}</button>
          <button className={`tab ${tab === 'side' ? 'active' : ''}`} onClick={() => setTab('side')}>{lang() === 'pt' ? 'Secundárias' : 'Side'}</button>
          <button className={`tab ${tab === 'done' ? 'active' : ''}`} onClick={() => setTab('done')}>{t('done')}</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {tab === 'main' && rows(MAIN_QUESTS, false)}
          {tab === 'side' && rows(SIDE_QUESTS, false)}
          {tab === 'done' && rows([...MAIN_QUESTS, ...SIDE_QUESTS], true)}
        </div>
      </Panel>
    </Overlay>
  );
}

// ============ NPCS ============
export function NpcsScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [selId, setSelId] = useState<string | null>(null);
  const [flash, setFlash] = useFlash();

  if (selId) {
    const npc = NPC_BY_ID[selId];
    const st = G.npcs[selId];
    const req = st.activeRequest ? npc.requestPool.find((r) => r.id === st.activeRequest!.templateId) : null;
    return (
      <Overlay onClose={props.onClose}>
        <Panel title={tr({ pt: npc.namePT, en: npc.nameEN })} onClose={props.onClose}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <NpcPortrait npc={npc} size={84} />
            <div style={{ flex: 1 }}>
              <div className="card-sub">{tr({ pt: npc.rolePT, en: npc.roleEN })}</div>
              <div className="speech">{tr(npc.greetings[G.calendar.day % npc.greetings.length])}</div>
              <div className="sheet-row">
                <b>{t('friendship')}:</b>
                <div className="friend-track">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="friend-heart" viewBox="0 0 24 24">
                      <path d="M12 20S4 14.5 4 9a4.2 4.2 0 018-1.8A4.2 4.2 0 0120 9c0 5.5-8 11-8 11z" fill={i <= st.level ? '#d86878' : 'rgba(120,100,90,0.3)'} />
                    </svg>
                  ))}
                </div>
                <span className="pill">{st.friendship}/100</span>
              </div>
            </div>
          </div>
          {flash && <div className="pill good" style={{ margin: '6px 0' }}>{flash}</div>}
          {req ? (
            <div className="card" style={{ cursor: 'default', alignItems: 'flex-start', textAlign: 'left', marginTop: 8 }}>
              <b style={{ fontSize: 13 }}>{lang() === 'pt' ? 'Pedido' : 'Request'}</b>
              <span style={{ fontSize: 12.5 }}>{tr({ pt: req.textPT, en: req.textEN })}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <span className="pill good"><Icon name="coin" size={11} />{req.rewardMoney}</span>
                <span className="pill good"><Icon name="star" size={11} />{req.rewardRep}</span>
                <span className="pill"><Icon name="heart" size={11} />+{req.rewardFriendship}</span>
              </div>
              <Btn small kind="gold" onClick={() => { const r = fulfillRequest(selId); if (r.msg) setFlash(tr(r.msg)); }}>{t('deliver')}</Btn>
            </div>
          ) : (
            <div className="card-sub" style={{ marginTop: 8 }}>{lang() === 'pt' ? 'Nenhum pedido no momento. Volte amanhã!' : 'No request right now. Come back tomorrow!'}</div>
          )}
          <div style={{ marginTop: 10 }}>
            <div className="card-sub" style={{ fontWeight: 800 }}>{t('rewards')}</div>
            {npc.friendshipRewards.map((r) => (
              <div key={r.level} className="sheet-row">
                <span className={`pill ${st.level >= r.level ? 'good' : ''}`}>Nv {r.level}</span>
                <span style={{ fontSize: 12 }}>{lang() === 'pt' ? r.rewardPT : r.rewardEN}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <Btn small kind="ghost" onClick={() => setSelId(null)}>{t('back')}</Btn>
          </div>
        </Panel>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={props.onClose}>
      <Panel title={t('npcs')} onClose={props.onClose}>
        {NPCS.map((npc) => {
          const st = G.npcs[npc.id];
          return (
            <div key={npc.id} className="npc-row" onClick={() => { meetNpc(npc.id); notify(); setSelId(npc.id); }}>
              <NpcPortrait npc={npc} size={52} />
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: 13.5 }}>{tr({ pt: npc.namePT, en: npc.nameEN })}</b>
                <div className="card-sub">{tr({ pt: npc.rolePT, en: npc.roleEN })}</div>
                <div className="friend-track">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="friend-heart" viewBox="0 0 24 24">
                      <path d="M12 20S4 14.5 4 9a4.2 4.2 0 018-1.8A4.2 4.2 0 0120 9c0 5.5-8 11-8 11z" fill={i <= st.level ? '#d86878' : 'rgba(120,100,90,0.3)'} />
                    </svg>
                  ))}
                </div>
              </div>
              {st.activeRequest && <span className="pill problem">{t('requests')}!</span>}
              {!st.met && <span className="pill">{t('visitToUnlock')}</span>}
            </div>
          );
        })}
      </Panel>
    </Overlay>
  );
}

// ============ COMPETIÇÕES ============
export function CompetitionsScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [flash, setFlash] = useFlash();
  const [result, setResult] = useState<{ placement: number; score: number; prize: number; rivalScores: number[]; special?: string } | null>(null);
  const today = todaysCompetitions();
  const upcoming = upcomingCompetitions(28).filter((u) => u.inDays > 0);

  const tryEnter = (comp: typeof today[0], entry: { areaId?: string; plantUid?: number; arrangementUid?: number }) => {
    const r = enterCompetition(comp, entry);
    if ('error' in r) setFlash(tr(r.error));
    else setResult(r);
  };

  return (
    <Overlay onClose={props.onClose}>
      <Panel title={t('competitions')} onClose={props.onClose}>
        {flash && <div className="pill problem" style={{ marginBottom: 6 }}>{flash}</div>}
        {result && (
          <div className="card" style={{ cursor: 'default', marginBottom: 10, background: result.placement === 1 ? 'linear-gradient(180deg,#f8ecc0,#eeda98)' : undefined }}>
            <Icon name="trophy" size={40} />
            <b style={{ fontSize: 17 }}>{result.placement === 1 ? (lang() === 'pt' ? 'CAMPEÃO!' : 'CHAMPION!') : `${result.placement}º ${lang() === 'pt' ? 'lugar' : 'place'}`}</b>
            <span>{lang() === 'pt' ? 'Sua nota' : 'Your score'}: <b>{result.score}</b> · {lang() === 'pt' ? 'Rivais' : 'Rivals'}: {result.rivalScores.join(', ')}</span>
            {result.prize > 0 && <span className="pill good"><Icon name="coin" size={12} />+{result.prize}</span>}
            {result.special && <span className="pill good">{result.special}</span>}
            <Btn small kind="ghost" onClick={() => setResult(null)}>{t('close')}</Btn>
          </div>
        )}
        <div className="card-sub" style={{ fontWeight: 800, marginBottom: 4 }}>{t('today')}</div>
        {today.length === 0 && <div className="card-sub">{lang() === 'pt' ? 'Nenhuma competição hoje. Veja o calendário!' : 'No competition today. Check the calendar!'}</div>}
        {today.map((comp) => (
          <CompetitionEntry key={comp.id} comp={comp} onEnter={(e) => tryEnter(comp, e)} />
        ))}
        <div className="card-sub" style={{ fontWeight: 800, margin: '10px 0 4px' }}>{lang() === 'pt' ? 'Em breve' : 'Coming up'}</div>
        {upcoming.slice(0, 6).map((u, i) => (
          <div key={i} className="sheet-row">
            <Icon name="trophy" size={14} />
            <span>{tr({ pt: u.comp.namePT, en: u.comp.nameEN })}</span>
            <span className="pill">{t('inDays').replace('%', String(u.inDays))}</span>
            <span className="pill"><Icon name="coin" size={10} />{u.comp.prizeMoney[0]}</span>
          </div>
        ))}
        <div className="card-sub" style={{ fontWeight: 800, margin: '10px 0 4px' }}>{lang() === 'pt' ? 'Histórico' : 'History'}</div>
        {G.competitionHistory.slice(-5).reverse().map((hi, i) => (
          <div key={i} className="sheet-row">
            <span className={`pill ${hi.placement === 1 ? 'good' : ''}`}>{hi.placement > 0 ? `${hi.placement}º` : '—'}</span>
            <span style={{ fontSize: 12 }}>{hi.competitionId}</span>
            <span className="pill">{hi.score} pts</span>
          </div>
        ))}
      </Panel>
    </Overlay>
  );
}

function CompetitionEntry(props: { comp: ReturnType<typeof todaysCompetitions>[0]; onEnter: (e: { areaId?: string; plantUid?: number; arrangementUid?: number }) => void }): JSX.Element {
  const { comp } = props;
  const [pick, setPick] = useState(false);
  const alive = G.plants.filter((p) => !isDead(p));
  return (
    <div className="card" style={{ cursor: 'default', alignItems: 'flex-start', textAlign: 'left', marginBottom: 6 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
        <Icon name="trophy" size={20} />
        <b>{tr({ pt: comp.namePT, en: comp.nameEN })}</b>
        <span style={{ flex: 1 }} />
        <span className="pill good"><Icon name="coin" size={11} />{comp.prizeMoney[0]}</span>
      </div>
      <span className="card-sub" style={{ textAlign: 'left' }}>
        {lang() === 'pt' ? 'Critérios' : 'Criteria'}: {comp.criteria.map((c) => c.criterion).join(', ')}
        {comp.minReputation > 0 && ` · ${t('reputation')} ${comp.minReputation}+`}
      </span>
      {!pick ? (
        <Btn small kind="gold" onClick={() => {
          if (comp.scope === 'garden') props.onEnter({});
          else if (comp.scope === 'area' && comp.themeFilter?.area) props.onEnter({ areaId: comp.themeFilter.area });
          else setPick(true);
        }}>{t('enter')}</Btn>
      ) : comp.scope === 'plant' ? (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {alive.slice(0, 12).map((p) => (
            <div key={p.uid} className="card" style={{ width: 90 }} onClick={() => props.onEnter({ plantUid: p.uid })}>
              <PlantSprite plantId={p.plantId} size={44} seed={p.variantSeed} />
              <span className="card-name" style={{ fontSize: 10 }}>{tr({ pt: PLANT_BY_ID[p.plantId].commonNamePT, en: PLANT_BY_ID[p.plantId].commonNameEN })}</span>
            </div>
          ))}
        </div>
      ) : comp.scope === 'arrangement' ? (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {G.inventory.arrangements.map((a) => (
            <Btn key={a.uid} small kind="ghost" onClick={() => props.onEnter({ arrangementUid: a.uid })}>{a.style} (Q{a.quality})</Btn>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {G.unlockedAreas.map((aid) => (
            <Btn key={aid} small kind="ghost" onClick={() => props.onEnter({ areaId: aid })}>{tr({ pt: AREA_BY_ID[aid].namePT, en: AREA_BY_ID[aid].nameEN })}</Btn>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ BANCADA (mistura de solo) ============
export function BenchScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [mixParts, setMixParts] = useState<Record<string, number>>({});
  const [recipeName, setRecipeName] = useState('');
  const [flash, setFlash] = useFlash();

  const comps = Object.entries(mixParts).filter(([, n]) => n > 0).map(([id, parts]) => ({ id, parts }));
  const attrs = comps.length ? computeMix(comps) : null;

  return (
    <Overlay onClose={props.onClose} width="min(840px,100%)">
      <Panel title={t('mixSoil')} onClose={props.onClose} className="wide">
        <div className="card-sub" style={{ marginBottom: 6 }}>
          {lang() === 'pt' ? 'Combine componentes em partes. A mistura vira uma receita salva com 2 usos.' : 'Combine components by parts. The mix becomes a saved recipe with 2 uses.'}
        </div>
        {flash && <div className="pill good" style={{ marginBottom: 6 }}>{flash}</div>}
        <div className="card-grid small">
          {SOIL_COMPONENTS.filter((c) => (G.inventory.soilComponents[c.id] ?? 0) > 0).map((c) => {
            const have = G.inventory.soilComponents[c.id];
            const used = mixParts[c.id] ?? 0;
            return (
              <div key={c.id} className={`card ${used > 0 ? 'selected' : ''}`} style={{ cursor: 'default' }}>
                <span className="card-qty">{have}</span>
                <Icon name="seedbag" size={30} />
                <span className="card-name">{tr({ pt: c.namePT, en: c.nameEN })}</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <Btn small kind="ghost" onClick={() => setMixParts({ ...mixParts, [c.id]: Math.max(0, used - 1) })}>−</Btn>
                  <b>{used}</b>
                  <Btn small kind="ghost" onClick={() => used < have && setMixParts({ ...mixParts, [c.id]: used + 1 })}>+</Btn>
                </div>
              </div>
            );
          })}
        </div>
        {SOIL_COMPONENTS.every((c) => !(G.inventory.soilComponents[c.id] ?? 0)) && (
          <div className="card-sub">{lang() === 'pt' ? 'Compre componentes no Mercado Verde!' : 'Buy components at the Green Market!'}</div>
        )}
        {attrs && (
          <div style={{ marginTop: 10, background: 'rgba(90,110,70,0.12)', borderRadius: 10, padding: 10 }}>
            <Bar value={attrs.retention} max={10} color="#5aa8d8" label={lang() === 'pt' ? 'Retenção' : 'Retention'} />
            <Bar value={attrs.aeration} max={10} color="#a8c858" label={lang() === 'pt' ? 'Aeração' : 'Aeration'} />
            <Bar value={attrs.fertility} max={10} color="#a8884a" label={lang() === 'pt' ? 'Fertilidade' : 'Fertility'} />
            <div className="sheet-row"><b>pH:</b> {attrs.pH.toFixed(1)} · <b>{lang() === 'pt' ? 'Drenagem' : 'Drainage'}:</b> {attrs.drainage} · <b>M.O.:</b> {attrs.organicMatter}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <input type="text" placeholder={lang() === 'pt' ? 'Nome da receita…' : 'Recipe name…'} value={recipeName} onChange={(e) => setRecipeName(e.target.value)} style={{ flex: 1 }} />
              <Btn kind="gold" onClick={() => {
                const res = saveSoilRecipe(recipeName || (lang() === 'pt' ? 'Minha mistura' : 'My mix'), comps);
                if (res.msg) setFlash(tr(res.msg));
                if (res.ok) { setMixParts({}); setRecipeName(''); }
              }}>{t('saveRecipe')}</Btn>
            </div>
          </div>
        )}
        <div style={{ marginTop: 10 }}>
          <div className="card-sub" style={{ fontWeight: 800 }}>{lang() === 'pt' ? 'Receitas salvas' : 'Saved recipes'}</div>
          {G.savedSoilRecipes.map((r, i) => (
            <div key={i} className="sheet-row">
              <Icon name="seedbag" size={13} /><b>{r.name}</b>
              <span className="pill">{lang() === 'pt' ? 'usos' : 'uses'}: {G.inventory.soilMixes[`custom:${i}`] ?? 0}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Overlay>
  );
}

// ============ ARRANJOS ============
export function ArrangementsScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [styleId, setStyleId] = useState('simples');
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [flash, setFlash] = useFlash();

  const flowerPicks = Object.entries(picks).filter(([, q]) => q > 0).map(([plantId, qty]) => ({ plantId, qty }));
  const pv = previewArrangement(styleId, flowerPicks);
  const style = ARRANGEMENT_STYLES.find((s) => s.id === styleId)!;

  return (
    <Overlay onClose={props.onClose} width="min(840px,100%)">
      <Panel title={t('arrangements')} onClose={props.onClose} className="wide">
        <div className="tabs">
          {ARRANGEMENT_STYLES.map((s) => (
            <button key={s.id} className={`tab ${styleId === s.id ? 'active' : ''}`} onClick={() => setStyleId(s.id)}>{tr({ pt: s.namePT, en: s.nameEN })}</button>
          ))}
        </div>
        <div className="card-sub" style={{ marginBottom: 6 }}>
          {lang() === 'pt' ? `Mínimo ${style.minFlowers} flores` : `Minimum ${style.minFlowers} flowers`}
          {style.needColors && ` · ${lang() === 'pt' ? 'precisa de' : 'needs'}: ${style.needColors.join('/')}`}
          {style.monochrome && ` · ${lang() === 'pt' ? 'uma cor só' : 'single color'}`}
          {style.needFragrance && ` · ${lang() === 'pt' ? 'perfumada' : 'fragrant'}`}
        </div>
        {flash && <div className="pill good" style={{ marginBottom: 6 }}>{flash}</div>}
        <div className="card-grid small">
          {Object.entries(G.inventory.flowers).filter(([, q]) => q > 0).map(([id, q]) => {
            const def = PLANT_BY_ID[id];
            const used = picks[id] ?? 0;
            return (
              <div key={id} className={`card ${used > 0 ? 'selected' : ''}`} style={{ cursor: 'default' }}>
                <span className="card-qty">{q}</span>
                <Icon name="flower" size={32} color="#c86888" />
                <span className="card-name">{tr({ pt: def.commonNamePT, en: def.commonNameEN })}</span>
                <span className="card-sub" style={{ fontSize: 9 }}>{def.flowerColors.join(', ')}{def.fragrance ? ' · ✿' : ''}</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <Btn small kind="ghost" onClick={() => setPicks({ ...picks, [id]: Math.max(0, used - 1) })}>−</Btn>
                  <b>{used}</b>
                  <Btn small kind="ghost" onClick={() => used < q && setPicks({ ...picks, [id]: used + 1 })}>+</Btn>
                </div>
              </div>
            );
          })}
        </div>
        {Object.values(G.inventory.flowers).every((q) => !q) && (
          <div className="card-sub">{lang() === 'pt' ? 'Colha flores no jardim primeiro (plantas floridas).' : 'Cut flowers in the garden first (blooming plants).'}</div>
        )}
        <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
          {pv.ok ? (
            <>
              <span className="pill good">{t('quality')}: {pv.quality}</span>
              <span className="pill good"><Icon name="coin" size={11} />{pv.value}</span>
              <Btn kind="gold" onClick={() => {
                const res = craftArrangement(styleId, flowerPicks);
                if (res.msg) setFlash(tr(res.msg));
                if (res.ok) setPicks({});
              }}>{t('craft')}</Btn>
            </>
          ) : (
            flowerPicks.length > 0 && <span className="pill problem">{lang() === 'pt' ? pv.msgPT : pv.msgEN}</span>
          )}
        </div>
        {G.inventory.arrangements.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div className="card-sub" style={{ fontWeight: 800 }}>{lang() === 'pt' ? 'Prontos' : 'Ready'}</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {G.inventory.arrangements.map((a) => (
                <span key={a.uid} className="pill">{a.style} · Q{a.quality} · <Icon name="coin" size={10} />{a.value}</span>
              ))}
            </div>
          </div>
        )}
      </Panel>
    </Overlay>
  );
}

// ============ ÁREAS ============
export function AreasScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [flash, setFlash] = useFlash();
  return (
    <Overlay onClose={props.onClose} width="min(860px,100%)">
      <Panel title={t('areas')} onClose={props.onClose} className="wide">
        {flash && <div className="pill problem" style={{ marginBottom: 6 }}>{flash}</div>}
        <div className="shop-list">
          {AREAS.map((a) => {
            const unlocked = G.unlockedAreas.includes(a.id);
            const isCurrent = G.currentArea === a.id;
            const nPlants = G.plants.filter((p) => p.areaId === a.id).length;
            return (
              <div key={a.id} className="shop-tile" style={{ borderColor: isCurrent ? 'var(--gold)' : undefined, opacity: unlocked ? 1 : 0.72 }}
                onClick={() => {
                  if (unlocked) { G.currentArea = a.id; notify(); props.onClose(); }
                }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: a.ambientPalette.accent, border: '2px solid rgba(60,50,30,0.4)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="shop-name">{tr({ pt: a.namePT, en: a.nameEN })}</div>
                  <div className="shop-desc">{tr({ pt: a.descPT, en: a.descEN })}</div>
                  {unlocked ? (
                    <span className="pill good">{nPlants} {lang() === 'pt' ? 'plantas' : 'plants'} · {a.cols}×{a.rows}</span>
                  ) : (
                    <div style={{ display: 'flex', gap: 4, marginTop: 3, flexWrap: 'wrap' }}>
                      <span className="pill"><Icon name="coin" size={11} />{a.unlockPrice}</span>
                      <Btn small kind="gold" onClick={() => {
                        const r = unlockArea(a.id);
                        if (r.msg) setFlash(tr(r.msg));
                      }}>{t('unlock')}</Btn>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </Overlay>
  );
}

// ============ HARMONIA ============
export function HarmonyScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const h = computeHarmony();
  const rows: { label: { pt: string; en: string }; v: number; color: string }[] = [
    { label: { pt: 'Saúde das plantas', en: 'Plant health' }, v: h.health, color: '#68a858' },
    { label: { pt: 'Variedade', en: 'Variety' }, v: h.variety, color: '#5aa8d8' },
    { label: { pt: 'Harmonia de cores', en: 'Color harmony' }, v: h.colorHarmony, color: '#c878b8' },
    { label: { pt: 'Camadas de altura', en: 'Height layers' }, v: h.layers, color: '#a8884a' },
    { label: { pt: 'Floração', en: 'Flowering' }, v: h.flowering, color: '#d878a8' },
    { label: { pt: 'Folhagens', en: 'Foliage' }, v: h.foliage, color: '#4a7a44' },
    { label: { pt: 'Polinizadores', en: 'Pollinators' }, v: h.pollinators, color: '#c8a040' },
    { label: { pt: 'Organização', en: 'Organization' }, v: h.organization, color: '#8898a8' },
    { label: { pt: 'Raridade', en: 'Rarity' }, v: h.rarity, color: '#a878d8' },
    { label: { pt: 'Tema coerente', en: 'Theme coherence' }, v: h.theme, color: '#d8a038' },
    { label: { pt: 'Manutenção', en: 'Maintenance' }, v: h.maintenance, color: '#78b078' },
    { label: { pt: 'Decoração', en: 'Decoration' }, v: h.decor, color: '#b08858' },
  ];
  const max = Math.max(30, ...rows.map((r) => r.v));
  return (
    <Overlay onClose={props.onClose}>
      <Panel title={lang() === 'pt' ? 'Harmonia do Jardim' : 'Garden Harmony'} onClose={props.onClose}>
        <div className="harmony-score">{h.total}</div>
        {h.themeName && <div className="pill good" style={{ margin: '0 auto 8px', display: 'flex', width: 'fit-content' }}>{lang() === 'pt' ? 'Tema forte' : 'Strong theme'}: {tr(h.themeName)}</div>}
        {rows.map((r, i) => <Bar key={i} value={r.v} max={max} color={r.color} label={tr(r.label)} />)}
        {h.deadPenalty > 0 && (
          <div className="pill problem" style={{ marginTop: 8 }}>
            <Icon name="skull" size={12} />{lang() === 'pt' ? `Plantas mortas: −${h.deadPenalty} pontos! Remova-as.` : `Dead plants: −${h.deadPenalty} points! Remove them.`}
          </div>
        )}
      </Panel>
    </Overlay>
  );
}

// ============ DIÁRIO / CONQUISTAS / ESTATÍSTICAS ============
export function JournalScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [tab, setTab] = useState<'stats' | 'achievements' | 'restorations'>('stats');
  const s = G.stats;
  const [flash, setFlash] = useFlash();
  const absDay = absoluteDay(G.calendar);

  return (
    <Overlay onClose={props.onClose} width="min(780px,100%)">
      <Panel title={t('journal')} onClose={props.onClose}>
        <div className="tabs">
          <button className={`tab ${tab === 'stats' ? 'active' : ''}`} onClick={() => setTab('stats')}>{t('statistics')}</button>
          <button className={`tab ${tab === 'achievements' ? 'active' : ''}`} onClick={() => setTab('achievements')}>{t('achievements')} ({Object.keys(G.achievements).length}/{ACHIEVEMENTS.length})</button>
          <button className={`tab ${tab === 'restorations' ? 'active' : ''}`} onClick={() => setTab('restorations')}>{t('restorations')}</button>
        </div>
        {tab === 'stats' && (
          <div className="card-grid small">
            {[
              { l: { pt: 'Dias jogados', en: 'Days played' }, v: s.daysPlayed, icon: 'clock' },
              { l: { pt: 'Plantas plantadas', en: 'Plants planted' }, v: s.totalPlanted, icon: 'leaf' },
              { l: { pt: 'Regas', en: 'Waterings' }, v: s.totalWatered, icon: 'drop' },
              { l: { pt: 'Vendas', en: 'Sales' }, v: s.totalSold, icon: 'coin' },
              { l: { pt: 'Total ganho', en: 'Total earned' }, v: s.totalEarned, icon: 'coin' },
              { l: { pt: 'Propagações', en: 'Propagations' }, v: s.totalPropagated, icon: 'scissors' },
              { l: { pt: 'Competições vencidas', en: 'Competitions won' }, v: s.competitionsWon, icon: 'trophy' },
              { l: { pt: 'Arranjos', en: 'Arrangements' }, v: s.arrangementsMade, icon: 'flower' },
              { l: { pt: 'Visitantes', en: 'Visitors' }, v: s.visitorsReceived, icon: 'people' },
              { l: { pt: 'Plantas perdidas', en: 'Plants lost' }, v: s.totalDied, icon: 'skull' },
              { l: { pt: 'Dias sem perdas', en: 'Days no losses' }, v: s.daysWithoutDeadPlants, icon: 'heart' },
              { l: { pt: 'Medalhas', en: 'Medals' }, v: G.medals, icon: 'star' },
            ].map((row, i) => (
              <div key={i} className="card" style={{ cursor: 'default' }}>
                <Icon name={row.icon} size={26} color="#7a6a42" />
                <b style={{ fontSize: 19 }}>{row.v}</b>
                <span className="card-sub">{tr(row.l)}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'achievements' && (
          <div className="card-grid small">
            {ACHIEVEMENTS.map((a) => {
              const got = !!G.achievements[a.id];
              return (
                <div key={a.id} className={`card ${got ? '' : 'locked'}`} style={{ cursor: 'default' }}>
                  <Icon name={got ? 'trophy' : 'star'} size={26} color={got ? '#c8a040' : '#9a9282'} />
                  <span className="card-name">{tr({ pt: a.namePT, en: a.nameEN })}</span>
                  <span className="card-sub" style={{ fontSize: 9.5 }}>{tr({ pt: a.descPT, en: a.descEN })}</span>
                </div>
              );
            })}
          </div>
        )}
        {tab === 'restorations' && (
          <>
            {flash && <div className="pill good" style={{ marginBottom: 6 }}>{flash}</div>}
            <div className="card-sub" style={{ marginBottom: 6 }}>
              {lang() === 'pt' ? 'Restaure jardins do bairro enviando plantas crescidas. Amélia coordena os projetos.' : 'Restore neighborhood gardens by sending grown plants. Amélia runs the projects.'}
            </div>
            {RESTORATIONS.map((r) => {
              const doneKey = `rest-done-${r.id}`;
              const done = !!G.achievements[doneKey];
              const friendOk = (G.npcs['amelia']?.friendship ?? 0) >= r.minFriendshipAmelia;
              const candidates = G.plants.filter((p) => !isDead(p)
                && PLANT_BY_ID[p.plantId].category === r.requiredCategory
                && p.quality >= r.minQuality
                && ['juvenile', 'mature', 'budding', 'flowering', 'seeding'].includes(p.stage));
              return (
                <div key={r.id} className={`card ${done ? 'locked' : ''}`} style={{ cursor: 'default', alignItems: 'flex-start', textAlign: 'left', marginBottom: 6 }}>
                  <b style={{ fontSize: 13 }}>{tr({ pt: r.namePT, en: r.nameEN })} {done && '— ✓'}</b>
                  <span className="card-sub" style={{ textAlign: 'left' }}>{tr({ pt: r.descPT, en: r.descEN })}</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <span className="pill">{t('needs')}: {r.requiredCount}× {tr(categoryLabel(r.requiredCategory!))} (Q{r.minQuality}+)</span>
                    <span className="pill good"><Icon name="coin" size={11} />{r.rewardMoney}</span>
                    <span className="pill good"><Icon name="star" size={11} />{r.rewardRep}</span>
                  </div>
                  {!done && friendOk && (
                    <Btn small kind={candidates.length >= r.requiredCount ? 'gold' : 'ghost'} disabled={candidates.length < r.requiredCount}
                      onClick={() => {
                        candidates.sort((a2, b2) => a2.quality - b2.quality);
                        for (let i = 0; i < r.requiredCount; i++) {
                          const p = candidates[i];
                          const idx = G.plants.indexOf(p);
                          if (p.potId) G.inventory.pots[p.potId] = (G.inventory.pots[p.potId] ?? 0) + 1;
                          if (idx >= 0) G.plants.splice(idx, 1);
                        }
                        G.money += r.rewardMoney;
                        G.reputation += r.rewardRep;
                        G.achievements[doneKey] = absDay;
                        addFriendship('amelia', 10);
                        notify();
                        setFlash(lang() === 'pt' ? 'Jardim restaurado! O bairro agradece.' : 'Garden restored! The neighborhood thanks you.');
                      }}>
                      {t('send')} ({candidates.length}/{r.requiredCount})
                    </Btn>
                  )}
                  {!friendOk && <span className="pill problem">{lang() === 'pt' ? `Amizade com Amélia: ${r.minFriendshipAmelia}+` : `Amélia friendship: ${r.minFriendshipAmelia}+`}</span>}
                </div>
              );
            })}
          </>
        )}
      </Panel>
    </Overlay>
  );
}

// ============ CONFIGURAÇÕES ============
export function SettingsScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [flash, setFlash] = useFlash();
  const st = G.settings;
  const upd = () => {
    setVolumes(st.volMaster, st.volMusic, st.volSfx, st.volAmbient);
    notify();
  };
  return (
    <Overlay onClose={props.onClose} width="min(500px,100%)">
      <Panel title={t('settings')} onClose={props.onClose} className="narrow">
        {flash && <div className="pill good" style={{ marginBottom: 6 }}>{flash}</div>}
        <div className="sheet-row"><b>{t('language')}:</b>
          <select value={st.lang} onChange={(e) => { st.lang = e.target.value as 'pt' | 'en'; notify(); }}>
            <option value="pt">Português (BR)</option>
            <option value="en">English</option>
          </select>
        </div>
        <div style={{ marginTop: 8 }}>
          <div className="card-sub">{t('volume')}: {Math.round(st.volMaster * 100)}%</div>
          <input type="range" min={0} max={1} step={0.05} value={st.volMaster} onChange={(e) => { st.volMaster = +e.target.value; upd(); }} />
          <div className="card-sub">{t('volMusic')}: {Math.round(st.volMusic * 100)}%</div>
          <input type="range" min={0} max={1} step={0.05} value={st.volMusic} onChange={(e) => { st.volMusic = +e.target.value; upd(); }} />
          <div className="card-sub">{t('volSfx')}: {Math.round(st.volSfx * 100)}%</div>
          <input type="range" min={0} max={1} step={0.05} value={st.volSfx} onChange={(e) => { st.volSfx = +e.target.value; upd(); }} />
          <div className="card-sub">{t('volAmbient')}: {Math.round(st.volAmbient * 100)}%</div>
          <input type="range" min={0} max={1} step={0.05} value={st.volAmbient} onChange={(e) => { st.volAmbient = +e.target.value; upd(); }} />
        </div>
        <div className="sheet-row" style={{ marginTop: 8 }}>
          <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
            <input type="checkbox" checked={st.showGrid} onChange={(e) => { st.showGrid = e.target.checked; notify(); }} />
            <b>{t('showGrid')}</b>
          </label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
          <Btn onClick={() => { saveGame(); setFlash(t('saved')); }}>{t('save')}</Btn>
          <Btn kind="ghost" onClick={() => {
            const data = exportSave();
            const blob = new Blob([data], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'jardim-vivo-save.json';
            a.click();
          }}>{t('export')}</Btn>
          <Btn kind="ghost" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = () => {
              const f = input.files?.[0];
              if (!f) return;
              const reader = new FileReader();
              reader.onload = () => {
                const ok = importSave(String(reader.result));
                setFlash(ok ? (lang() === 'pt' ? 'Save importado!' : 'Save imported!') : (lang() === 'pt' ? 'Arquivo inválido.' : 'Invalid file.'));
              };
              reader.readAsText(f);
            };
            input.click();
          }}>{t('import')}</Btn>
          <Btn kind="danger" onClick={() => {
            if (window.confirm(t('resetConfirm'))) { resetGame(); props.onClose(); }
          }}>{t('reset')}</Btn>
        </div>
      </Panel>
    </Overlay>
  );
}

// ============ MENU "MAIS" ============
export function MoreScreen(props: { onClose: () => void; openScreen: (s: string) => void }): JSX.Element {
  useGame();
  const items: { id: string; label: string; icon: string }[] = [
    { id: 'areas', label: t('areas'), icon: 'home' },
    { id: 'harmony', label: t('harmony'), icon: 'sparkle' },
    { id: 'competitions', label: t('competitions'), icon: 'trophy' },
    { id: 'arrangements', label: t('arrangements'), icon: 'flower' },
    { id: 'calendar', label: t('calendar'), icon: 'clock' },
    { id: 'journal', label: t('journal'), icon: 'book' },
    { id: 'settings', label: t('settings'), icon: 'gear' },
  ];
  return (
    <Overlay onClose={props.onClose} width="min(460px,100%)">
      <Panel title={lang() === 'pt' ? 'Mais' : 'More'} onClose={props.onClose} className="narrow">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {items.map((it) => (
            <Btn key={it.id} kind="ghost" onClick={() => { props.onClose(); props.openScreen(it.id); }}>
              <Icon name={it.icon} size={17} color="#5a4a30" />{it.label}
            </Btn>
          ))}
        </div>
      </Panel>
    </Overlay>
  );
}
