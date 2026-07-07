import type { JSX } from 'react';
import { useMemo, useState } from 'react';
import { G } from '../game/gameState';
import { PLANTS, PLANT_BY_ID } from '../data/plants';
import { SHOPS, SHOP_BY_ID } from '../data/shopsData';
import { NPC_BY_ID } from '../data/npcData';
import { POT_BY_ID } from '../data/potsData';
import { SOIL_MIX_BY_ID, SOIL_COMPONENT_BY_ID } from '../data/soilData';
import { CONSUMABLE_BY_ID, TOOL_BY_ID } from '../data/toolsData';
import { shopStock, buyItem, sellFlower, sellCutting, sellSeeds, sellPlant, plantSaleValue, flowerPrice, cuttingSaleValue, sellArrangement } from '../game/economySystem';
import { COMPETITIONS } from '../data/competitionData';
import { upcomingCompetitions } from '../game/competitionSystem';
import { tr, t, lang } from '../i18n';
import { useGame, useFlash } from './useGame';
import { Btn, Panel, PlantSprite, PotSprite, Icon, Stars, RARITY_COLORS, RARITY_LABEL, LIGHT_LABEL, WATER_LABEL, categoryLabel, NpcPortrait, ToolSprite, SoilSprite, ConsumableSprite, DecorSprite } from './components';
import { isDead } from '../game/gameState';
import { MONTH_NAMES_PT, MONTH_NAMES_EN, seasonNamePT, seasonNameEN } from '../game/gameTime';

// ============ LOJAS ============
type StockItem = ReturnType<typeof shopStock>[number];

function ItemThumb({ item }: { item: StockItem }): JSX.Element {
  const plantDef = (item.kind === 'seed' || item.kind === 'seedling') ? PLANT_BY_ID[item.id] : null;
  if (plantDef) return <PlantSprite plantId={item.id} size={58} />;
  if (item.kind === 'pot') return <PotSprite potId={item.id} size={54} />;
  if (item.kind === 'tool') return <ToolSprite toolId={item.id} size={54} />;
  if (item.kind === 'decor') return <DecorSprite decorId={item.id} size={54} />;
  if (item.kind === 'soil-component' || item.kind === 'soil-mix') return <SoilSprite soilId={item.id} size={54} />;
  if (item.kind === 'consumable') return <ConsumableSprite itemId={item.id} size={54} />;
  return <Icon name="seedbag" size={36} color="#7a6a42" />;
}

export function ShopsScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [shopId, setShopId] = useState<string | null>(null);
  const [flash, setFlash] = useFlash();
  const [pendingBuy, setPendingBuy] = useState<StockItem | null>(null);

  if (!shopId) {
    return (
      <div className="overlay" onClick={props.onClose}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(760px,100%)' }}>
          <Panel title={t('shops')} onClose={props.onClose}>
            <div className="shop-list">
              {SHOPS.map((s) => {
                const isWeekendShop = s.openDays && !s.openDays.includes(G.calendar.weekday);
                const isPlayer = s.id === 'loja-jogador';
                const playerLocked = isPlayer && !G.unlockedAreas.includes('loja');
                return (
                  <div key={s.id} className="shop-tile" style={{ opacity: isWeekendShop || playerLocked ? 0.55 : 1 }}
                    onClick={() => { if (!isWeekendShop && !playerLocked) setShopId(s.id); }}>
                    <Icon name="shop" size={34} color="#7a6a42" />
                    <div>
                      <div className="shop-name">{tr({ pt: s.namePT, en: s.nameEN })}</div>
                      <div className="shop-desc">{tr({ pt: s.descPT, en: s.descEN })}</div>
                      {isWeekendShop && <span className="pill problem">{lang() === 'pt' ? 'Abre sáb/dom' : 'Weekends only'}</span>}
                      {playerLocked && <span className="pill problem">{t('locked')}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  const shop = SHOP_BY_ID[shopId];
  if (shopId === 'loja-jogador') return <PlayerShopScreen onBack={() => setShopId(null)} onClose={props.onClose} />;
  const stock = shopStock(shopId);
  const npc = shop.npcId ? NPC_BY_ID[shop.npcId] : null;

  const confirmBuy = (): void => {
    if (!pendingBuy) return;
    const res = buyItem(pendingBuy);
    setFlash(res.ok ? (lang() === 'pt' ? 'Comprado!' : 'Bought!') : tr(res.msg!));
    setPendingBuy(null);
  };

  return (
    <div className="overlay" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(860px,100%)', maxHeight: '100%' }}>
        {/* o X da loja volta para a lista de lojas (não fecha tudo) */}
        <Panel title={tr({ pt: shop.namePT, en: shop.nameEN })} onClose={() => setShopId(null)} className="wide">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Btn small kind="ghost" onClick={() => setShopId(null)}>{t('back')}</Btn>
            {npc && <><NpcPortrait npc={npc} size={40} /><span className="speech" style={{ flex: 1, margin: 0 }}>{tr(npc.greetings[G.calendar.day % npc.greetings.length])}</span></>}
            <span className="hud-chip" style={{ background: 'rgba(60,50,20,0.85)' }}><Icon name="coin" size={14} />{G.money}</span>
          </div>
          {flash && <div className="pill good" style={{ marginBottom: 6 }}>{flash}</div>}
          <div className="card-grid">
            {stock.map((item) => {
              const plantDef = (item.kind === 'seed' || item.kind === 'seedling') ? PLANT_BY_ID[item.id] : null;
              const affordable = G.money >= item.price;
              return (
                <div key={item.kind + item.id} className={`card ${item.owned ? 'locked' : ''} ${!item.owned && !affordable ? 'poor' : ''}`} onClick={() => {
                  if (item.owned) return;
                  setPendingBuy(item);
                }}>
                  <ItemThumb item={item} />
                  <span className="card-name">{lang() === 'pt' ? item.namePT : item.nameEN}</span>
                  {plantDef && <span className="card-sub">{plantDef.scientificName}</span>}
                  {plantDef && <span className="pill" style={{ background: RARITY_COLORS[plantDef.rarity] + '33', color: '#5a4a2a', fontSize: 9 }}>{tr(RARITY_LABEL[plantDef.rarity])}</span>}
                  {item.owned ? <span className="pill good">{lang() === 'pt' ? 'Adquirida' : 'Owned'}</span>
                    : <span className="card-price"><Icon name="coin" size={13} />{item.price}</span>}
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      {/* confirmação de compra */}
      {pendingBuy && (() => {
        const affordable = G.money >= pendingBuy.price;
        return (
          <div className="overlay confirm-overlay" onClick={(e) => { e.stopPropagation(); setPendingBuy(null); }}>
            <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
              <div className="confirm-art"><ItemThumb item={pendingBuy} /></div>
              <div className="confirm-name">{lang() === 'pt' ? pendingBuy.namePT : pendingBuy.nameEN}</div>
              <div className="confirm-q">{lang() === 'pt' ? 'Confirmar a compra?' : 'Confirm purchase?'}</div>
              <div className="confirm-price"><Icon name="coin" size={16} />{pendingBuy.price}
                <span className="confirm-after">{lang() === 'pt' ? `resta ${Math.max(0, G.money - pendingBuy.price)}` : `left ${Math.max(0, G.money - pendingBuy.price)}`}</span>
              </div>
              {!affordable && <div className="pill problem" style={{ margin: '2px auto 0' }}>{lang() === 'pt' ? 'Moedas insuficientes' : 'Not enough coins'}</div>}
              <div className="confirm-actions">
                <Btn kind="ghost" onClick={() => setPendingBuy(null)}>{lang() === 'pt' ? 'Cancelar' : 'Cancel'}</Btn>
                <Btn kind="primary" disabled={!affordable} onClick={confirmBuy}>{lang() === 'pt' ? 'Comprar' : 'Buy'}</Btn>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ============ LOJA DO JOGADOR (vender) ============
function PlayerShopScreen(props: { onBack: () => void; onClose: () => void }): JSX.Element {
  useGame();
  const [tab, setTab] = useState<'plants' | 'flowers' | 'cuttings' | 'seeds' | 'arrangements'>('plants');
  const alive = G.plants.filter((p) => !isDead(p));

  return (
    <div className="overlay" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(860px,100%)' }}>
        <Panel title={lang() === 'pt' ? 'Sua Loja' : 'Your Shop'} onClose={props.onClose} className="wide">
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center' }}>
            <Btn small kind="ghost" onClick={props.onBack}>{t('back')}</Btn>
            <span className="card-sub">{t('playerShopHint')}</span>
          </div>
          <div className="tabs">
            {(['plants', 'flowers', 'cuttings', 'seeds', 'arrangements'] as const).map((tb) => (
              <button key={tb} className={`tab ${tab === tb ? 'active' : ''}`} onClick={() => setTab(tb)}>
                {tb === 'plants' ? (lang() === 'pt' ? 'Plantas' : 'Plants') : tb === 'flowers' ? t('flowers') : tb === 'cuttings' ? t('cuttings') : tb === 'seeds' ? t('seeds') : t('arrangements')}
              </button>
            ))}
          </div>
          <div className="card-grid">
            {tab === 'plants' && alive.map((p) => {
              const def = PLANT_BY_ID[p.plantId];
              return (
                <div key={p.uid} className="card" onClick={() => sellPlant(p)}>
                  <PlantSprite plantId={p.plantId} size={54} seed={p.variantSeed} />
                  <span className="card-name">{tr({ pt: def.commonNamePT, en: def.commonNameEN })}</span>
                  <span className="card-sub">{t('quality')}: {Math.round(p.quality)}</span>
                  <span className="card-price"><Icon name="coin" size={13} />{plantSaleValue(p)}</span>
                </div>
              );
            })}
            {tab === 'flowers' && Object.entries(G.inventory.flowers).filter(([, q]) => q > 0).map(([id, q]) => (
              <div key={id} className="card" onClick={() => sellFlower(id, 1)}>
                <span className="card-qty">{q}</span>
                <Icon name="flower" size={38} color="#c86888" />
                <span className="card-name">{tr({ pt: PLANT_BY_ID[id].commonNamePT, en: PLANT_BY_ID[id].commonNameEN })}</span>
                <span className="card-price"><Icon name="coin" size={13} />{flowerPrice(id)}</span>
              </div>
            ))}
            {tab === 'cuttings' && Object.entries(G.inventory.cuttings).filter(([, q]) => q > 0).map(([id, q]) => (
              <div key={id} className="card" onClick={() => sellCutting(id, 1)}>
                <span className="card-qty">{q}</span>
                <PlantSprite plantId={id} size={48} stage="mature" />
                <span className="card-name">{tr({ pt: PLANT_BY_ID[id].commonNamePT, en: PLANT_BY_ID[id].commonNameEN })}</span>
                <span className="card-price"><Icon name="coin" size={13} />{cuttingSaleValue(id)}</span>
              </div>
            ))}
            {tab === 'seeds' && Object.entries(G.inventory.seeds).filter(([, q]) => q > 0).map(([id, q]) => (
              <div key={id} className="card" onClick={() => sellSeeds(id, 1)}>
                <span className="card-qty">{q}</span>
                <Icon name="seedbag" size={36} />
                <span className="card-name">{tr({ pt: PLANT_BY_ID[id].commonNamePT, en: PLANT_BY_ID[id].commonNameEN })}</span>
              </div>
            ))}
            {tab === 'arrangements' && G.inventory.arrangements.map((a) => (
              <div key={a.uid} className="card" onClick={() => sellArrangement(a.uid)}>
                <Icon name="flower" size={38} color="#a858a0" />
                <span className="card-name">{a.style}</span>
                <span className="card-sub">{t('quality')}: {a.quality} · {lang() === 'pt' ? 'fresco' : 'fresh'}: {a.freshDays}d</span>
                <span className="card-price"><Icon name="coin" size={13} />{a.value}</span>
              </div>
            ))}
          </div>
          {tab === 'arrangements' && !G.inventory.arrangements.length && <div className="card-sub">{t('arrToSell')}</div>}
        </Panel>
      </div>
    </div>
  );
}

// ============ INVENTÁRIO ============
export function InventoryScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [tab, setTab] = useState<'seeds' | 'plants' | 'pots' | 'soil' | 'tools' | 'consumables' | 'flowers'>('seeds');
  const inv = G.inventory;

  const section = (entries: [string, number][], render: (id: string, q: number) => JSX.Element) => (
    <div className="card-grid small">{entries.filter(([, q]) => q > 0).map(([id, q]) => render(id, q))}</div>
  );

  return (
    <div className="overlay" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(820px,100%)' }}>
        <Panel title={t('inventory')} onClose={props.onClose} className="wide">
          <div className="tabs">
            <button className={`tab ${tab === 'seeds' ? 'active' : ''}`} onClick={() => setTab('seeds')}>{t('seeds')}</button>
            <button className={`tab ${tab === 'plants' ? 'active' : ''}`} onClick={() => setTab('plants')}>{t('seedlings')}</button>
            <button className={`tab ${tab === 'flowers' ? 'active' : ''}`} onClick={() => setTab('flowers')}>{t('flowers')}</button>
            <button className={`tab ${tab === 'pots' ? 'active' : ''}`} onClick={() => setTab('pots')}>{t('pots')}</button>
            <button className={`tab ${tab === 'soil' ? 'active' : ''}`} onClick={() => setTab('soil')}>{t('soilLabel')}</button>
            <button className={`tab ${tab === 'consumables' ? 'active' : ''}`} onClick={() => setTab('consumables')}>{t('fertilizers')}</button>
            <button className={`tab ${tab === 'tools' ? 'active' : ''}`} onClick={() => setTab('tools')}>{t('tools')}</button>
          </div>
          {tab === 'seeds' && section(Object.entries(inv.seeds), (id, q) => (
            <div key={id} className="card"><span className="card-qty">{q}</span><PlantSprite plantId={id} size={50} stage="mature" /><span className="card-name">{tr({ pt: PLANT_BY_ID[id]?.commonNamePT ?? id, en: PLANT_BY_ID[id]?.commonNameEN ?? id })}</span></div>
          ))}
          {tab === 'plants' && (
            <>
              {section(Object.entries(inv.seedlings), (id, q) => (
                <div key={id} className="card"><span className="card-qty">{q}</span><PlantSprite plantId={id} size={50} stage="mature" /><span className="card-name">{tr({ pt: PLANT_BY_ID[id].commonNamePT, en: PLANT_BY_ID[id].commonNameEN })}</span><span className="pill">{t('seedlings')}</span></div>
              ))}
              {section(Object.entries(inv.cuttings), (id, q) => (
                <div key={id} className="card"><span className="card-qty">{q}</span><PlantSprite plantId={id} size={50} stage="mature" /><span className="card-name">{tr({ pt: PLANT_BY_ID[id].commonNamePT, en: PLANT_BY_ID[id].commonNameEN })}</span><span className="pill good">{t('cuttings')}</span></div>
              ))}
            </>
          )}
          {tab === 'flowers' && section(Object.entries(inv.flowers), (id, q) => (
            <div key={id} className="card"><span className="card-qty">{q}</span><Icon name="flower" size={36} color="#c86888" /><span className="card-name">{tr({ pt: PLANT_BY_ID[id].commonNamePT, en: PLANT_BY_ID[id].commonNameEN })}</span></div>
          ))}
          {tab === 'pots' && section(Object.entries(inv.pots), (id, q) => (
            <div key={id} className="card"><span className="card-qty">{q}</span><PotSprite potId={id} size={48} /><span className="card-name">{tr({ pt: POT_BY_ID[id].namePT, en: POT_BY_ID[id].nameEN })}</span></div>
          ))}
          {tab === 'soil' && (
            <>
              {section(Object.entries(inv.soilMixes), (id, q) => {
                const m = SOIL_MIX_BY_ID[id];
                return <div key={id} className="card"><span className="card-qty">{q}</span><Icon name="seedbag" size={34} /><span className="card-name">{m ? tr({ pt: m.namePT, en: m.nameEN }) : id}</span></div>;
              })}
              {section(Object.entries(inv.soilComponents), (id, q) => {
                const c = SOIL_COMPONENT_BY_ID[id];
                return <div key={id} className="card"><span className="card-qty">{q}</span><Icon name="leaf" size={30} /><span className="card-name">{c ? tr({ pt: c.namePT, en: c.nameEN }) : id}</span><span className="pill" style={{ fontSize: 9 }}>{lang() === 'pt' ? 'componente' : 'component'}</span></div>;
              })}
            </>
          )}
          {tab === 'consumables' && (
            <>
              {section(Object.entries(inv.fertilizers), (id, q) => {
                const c = CONSUMABLE_BY_ID[id];
                return <div key={id} className="card"><span className="card-qty">{q}</span><Icon name="sparkle" size={30} /><span className="card-name">{c ? tr({ pt: c.namePT, en: c.nameEN }) : id}</span></div>;
              })}
              {section(Object.entries(inv.treatments), (id, q) => {
                const c = CONSUMABLE_BY_ID[id];
                return <div key={id} className="card"><span className="card-qty">{q}</span><Icon name="drop" size={30} /><span className="card-name">{c ? tr({ pt: c.namePT, en: c.nameEN }) : id}</span></div>;
              })}
            </>
          )}
          {tab === 'tools' && (
            <div className="card-grid small">
              {Object.entries(inv.tools).filter(([, has]) => has).map(([id]) => {
                const tl = TOOL_BY_ID[id];
                return <div key={id} className="card"><Icon name="hammer" size={30} color="#7a6a42" /><span className="card-name">{tl ? tr({ pt: tl.namePT, en: tl.nameEN }) : id}</span>{tl && <span className="card-sub" style={{ fontSize: 9 }}>{tr({ pt: tl.descPT, en: tl.descEN })}</span>}</div>;
              })}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

// ============ PLANTAPÉDIA ============
export function PlantapediaScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const [cat, setCat] = useState<string>('all');
  const [flt, setFlt] = useState<{ light?: string; water?: string; discovered?: boolean }>({});
  const [selId, setSelId] = useState<string | null>(null);

  const list = useMemo(() => PLANTS.filter((p) => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (flt.light && !p.idealLight.includes(flt.light as never)) return false;
    if (flt.water && p.waterNeed !== flt.water) return false;
    if (flt.discovered && !G.plantapedia[p.id]?.discovered) return false;
    return true;
  }), [cat, flt]);

  const discovered = Object.values(G.plantapedia).filter((e) => e.discovered).length;
  const sel = selId ? PLANT_BY_ID[selId] : null;
  const selEntry = selId ? G.plantapedia[selId] : null;
  const CATS = ['all', 'annual', 'perennial', 'bulb', 'rose-shrub', 'tropical', 'orchid', 'succulent', 'herb', 'climber', 'aquatic', 'bonsai-tree', 'carnivorous', 'wildflower'];

  return (
    <div className="overlay" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(980px,100%)', height: 'calc(100% - 20px)' }}>
        <Panel title={`${t('plantapedia')} — ${discovered}/${PLANTS.length} ${t('discovered')}`} onClose={props.onClose} className="wide">
          <div className="filters">
            {CATS.map((c) => (
              <button key={c} className={`filter-chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
                {c === 'all' ? t('filterAll') : tr(categoryLabel(c as never))}
              </button>
            ))}
          </div>
          <div className="filters">
            <button className={`filter-chip ${flt.discovered ? 'on' : ''}`} onClick={() => setFlt({ ...flt, discovered: !flt.discovered })}>{lang() === 'pt' ? 'Só descobertas' : 'Discovered only'}</button>
            {['full-sun', 'part-shade', 'bright-indirect'].map((l) => (
              <button key={l} className={`filter-chip ${flt.light === l ? 'on' : ''}`} onClick={() => setFlt({ ...flt, light: flt.light === l ? undefined : l })}>{tr(LIGHT_LABEL[l])}</button>
            ))}
            {['low', 'moderate', 'high'].map((wl) => (
              <button key={wl} className={`filter-chip ${flt.water === wl ? 'on' : ''}`} onClick={() => setFlt({ ...flt, water: flt.water === wl ? undefined : wl })}>{tr(WATER_LABEL[wl])} <Icon name="drop" size={9} /></button>
            ))}
          </div>
          <div className="pedia-layout">
            <div className="pedia-list">
              <div className="card-grid small">
                {list.map((p) => {
                  const disc = G.plantapedia[p.id]?.discovered;
                  return (
                    <div key={p.id} className={`card ${selId === p.id ? 'selected' : ''} ${!disc ? 'locked' : ''}`} onClick={() => setSelId(p.id)}>
                      <PlantSprite plantId={p.id} size={52} />
                      <span className="card-name">{disc ? tr({ pt: p.commonNamePT, en: p.commonNameEN }) : t('notDiscovered')}</span>
                      {disc && <span className="card-sub" style={{ fontSize: 9 }}>{p.scientificName}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            {sel && (
              <div className="pedia-detail">
                <Panel title={G.plantapedia[sel.id]?.discovered ? tr({ pt: sel.commonNamePT, en: sel.commonNameEN }) : '???'}>
                  <div style={{ textAlign: 'center' }}><PlantSprite plantId={sel.id} size={110} /></div>
                  <div className="card-sub" style={{ textAlign: 'center', marginBottom: 6 }}>{sel.scientificName} · {sel.family}</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
                    <span className="pill" style={{ background: RARITY_COLORS[sel.rarity] + '44' }}>{tr(RARITY_LABEL[sel.rarity])}</span>
                    <span className="pill">{tr(categoryLabel(sel.category))}</span>
                    {sel.toxicToPets && <span className="pill problem">{t('toxic')}</span>}
                    {sel.fragrance && <span className="pill good">{lang() === 'pt' ? 'Perfumada' : 'Fragrant'}</span>}
                  </div>
                  <div className="sheet-row"><b>{t('difficulty')}:</b> <Stars n={sel.difficulty} /></div>
                  <div className="sheet-row"><Icon name="sun" size={13} /><b>{t('light')}:</b> {sel.idealLight.map((l) => tr(LIGHT_LABEL[l])).join(', ')}</div>
                  <div className="sheet-row"><Icon name="drop" size={13} /><b>{t('waterNeedL')}:</b> {tr(WATER_LABEL[sel.waterNeed])}</div>
                  <div className="sheet-row"><b>pH:</b> {sel.pHRange[0]}–{sel.pHRange[1]} · <b>{lang() === 'pt' ? 'Temp' : 'Temp'}:</b> {sel.temperatureRangeC[0]}–{sel.temperatureRangeC[1]}°C</div>
                  <div className="sheet-row"><b>{lang() === 'pt' ? 'Altura' : 'Height'}:</b> {sel.heightCm[0]}–{sel.heightCm[1]} cm</div>
                  {sel.bloomSeasons.length > 0 && <div className="sheet-row"><Icon name="flower" size={13} color="#c86888" /><b>{t('bloom')}:</b> {sel.bloomSeasons.map((s) => lang() === 'pt' ? seasonNamePT(s) : seasonNameEN(s)).join(', ')} ({sel.flowerColors.join(', ')})</div>}
                  {sel.attractsPollinators.length > 0 && <div className="sheet-row"><Icon name="butterfly" size={13} /><b>{t('pollinatorsL')}:</b> {sel.attractsPollinators.join(', ')}</div>}
                  <div className="sheet-row"><b>{lang() === 'pt' ? 'Propagação' : 'Propagation'}:</b> {sel.propagationMethods.slice(0, 4).join(', ')}</div>
                  <div className="sheet-row"><b>{t('origin')}:</b> {tr(sel.origin)}</div>
                  <div className="speech">{tr(sel.careTips)}</div>
                  {selEntry?.discovered && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      <span className="pill">{t('timesGrown')}: {selEntry.timesGrown}×</span>
                      <span className="pill">{t('bloom')}: {selEntry.timesBloomed}×</span>
                      {selEntry.bestQuality > 0 && <span className="pill good">{t('bestQuality')}: {Math.round(selEntry.bestQuality)}</span>}
                    </div>
                  )}
                </Panel>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}

// ============ CALENDÁRIO ============
export function CalendarScreen(props: { onClose: () => void }): JSX.Element {
  useGame();
  const c = G.calendar;
  const months = lang() === 'pt' ? MONTH_NAMES_PT : MONTH_NAMES_EN;
  const upcoming = upcomingCompetitions(28);
  const compByDay: Record<number, string[]> = {};
  for (const u of upcoming) {
    const day = ((c.day - 1 + u.inDays) % 28) + 1;
    if (u.inDays < 28 - c.day + 1) {
      (compByDay[day] ??= []).push(u.comp.id);
    }
  }

  return (
    <div className="overlay" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(680px,100%)' }}>
        <Panel title={`${t('calendar')} — ${months[c.month]}, ${t('year')} ${c.year} (${lang() === 'pt' ? seasonNamePT(c.season) : seasonNameEN(c.season)})`} onClose={props.onClose}>
          <div className="cal-grid">
            {(lang() === 'pt' ? ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S']).map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontWeight: 800, fontSize: 11, color: 'var(--ink-soft)' }}>{d}</div>
            ))}
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1;
              const isToday = day === c.day;
              const comps = compByDay[day];
              return (
                <div key={day} className={`cal-cell ${isToday ? 'today' : ''}`}>
                  {day}
                  {comps && <div className="dot" style={{ background: '#a878d8' }} title={comps.join(', ')} />}
                  {(day === 6 || day === 7 || day === 13 || day === 14 || day === 20 || day === 21 || day === 27 || day === 28) && !comps && (
                    <div className="dot" style={{ background: 'rgba(200,160,64,0.6)' }} />
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10 }}>
            <div className="card-sub" style={{ fontWeight: 800, marginBottom: 4 }}>{t('forecast')}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {G.forecast.map((f, i) => (
                <div key={i} className="pill" style={{ flexDirection: 'column', padding: '6px 10px' }}>
                  <Icon name={f.raining ? 'rain' : f.cloudy ? 'cloud' : 'sun'} size={20} />
                  <span style={{ fontSize: 10 }}>+{i + 1}d · {f.tempMinC}–{f.tempMaxC}°</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div className="card-sub" style={{ fontWeight: 800, marginBottom: 4 }}>{lang() === 'pt' ? 'Próximas competições' : 'Upcoming competitions'}</div>
            {upcoming.slice(0, 5).map((u, i) => (
              <div key={i} className="sheet-row">
                <Icon name="trophy" size={14} />
                <b>{tr({ pt: u.comp.namePT, en: u.comp.nameEN })}</b>
                <span className="pill">{u.inDays === 0 ? t('today') : t('inDays').replace('%', String(u.inDays))}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
