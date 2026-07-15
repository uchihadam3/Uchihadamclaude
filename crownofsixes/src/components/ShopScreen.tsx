import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { RELICS_DB } from '../game/relics';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hexagon, Eye, Scroll, Zap, Heart, Spade, Dices, Copy, Activity,
  Skull, Star, Coins, ArrowUpCircle, RefreshCw, ChevronRight,
  Magnet, Crown, Ghost, Crosshair, Flame, Rocket, Shield, Gem, Sparkles, X
} from 'lucide-react';
import { sfx } from '../utils/sound';

const ICON_MAP: Record<string, any> = {
  Hexagon, Eye, Scroll, Zap, Heart, Spade, Dices, Copy, Activity,
  Skull, Star, Magnet, Crown, Coins, Shield, Ghost, Crosshair, Flame, Rocket, Gem
};

const HAND_PT: Record<string, string> = {
  'Solo Die': 'Dado Solo', Double: 'Par', 'Two Doubles': 'Dois Pares',
  Triple: 'Trinca', Sequence: 'Sequência', 'Full Chamber': 'Câmara Cheia',
  Quad: 'Quadra', Pentad: 'Quinteto',
};

const RAR = {
  common:    { ring: 'ring-zinc-700',   glow: 'rgba(161,161,170,0.25)', text: 'text-zinc-300',   dot: 'bg-zinc-400',   label: 'Comum' },
  rare:      { ring: 'ring-sky-500',    glow: 'rgba(56,189,248,0.35)',  text: 'text-sky-300',    dot: 'bg-sky-400',    label: 'Raro' },
  epic:      { ring: 'ring-fuchsia-500',glow: 'rgba(217,70,239,0.35)',  text: 'text-fuchsia-300',dot: 'bg-fuchsia-400',label: 'Épico' },
  legendary: { ring: 'ring-amber-400',  glow: 'rgba(251,191,36,0.45)',  text: 'text-amber-300',  dot: 'bg-amber-400',  label: 'Lendário' },
} as const;

type TabId = 'relics' | 'dice' | 'hands';

export function ShopScreen() {
  const { state, dispatch } = useGame();
  const [tab, setTab] = useState<TabId>('relics');
  const [showCurses, setShowCurses] = useState(false);

  const gold = state.gold;
  const afford = (c: number) => gold >= c;

  const buyRelic = (id: string, cost: number) => { if (afford(cost)) { sfx.playPowerup(); dispatch({ type: 'BUY_RELIC', id, cost }); } };
  const upgradeHand = (hand: string, cost: number) => { if (afford(cost)) { sfx.playPowerup(); dispatch({ type: 'UPGRADE_HAND', hand, cost }); } };
  const buyMod = (id: any, cost: number) => { if (afford(cost)) { sfx.playPowerup(); dispatch({ type: 'UPGRADE_DICE', modifier: id, cost }); } };
  const buyMat = (id: any, cost: number) => { if (afford(cost)) { sfx.playPowerup(); dispatch({ type: 'UPGRADE_DICE_MATERIAL', material: id, cost }); } };
  const reroll = () => { if (afford(1)) { sfx.playPowerup(); dispatch({ type: 'REROLL_SHOP' }); } };
  const leave = () => { sfx.playPowerup(); dispatch({ type: 'LEAVE_SHOP' }); };

  const rarityCost = (r: string) => (r === 'legendary' ? 6 : r === 'epic' ? 4 : r === 'rare' ? 3 : 2);
  const shopRelics = state.shopItems.map(id => RELICS_DB.find(r => r.id === id)!).filter(r => r && r.rarity !== 'void');

  const DICE_MODS = [
    { id: 'foil',        name: 'Prata',   short: '+30 base fixo',       cost: 3, color: 'text-zinc-200',    ring: 'ring-zinc-600',    icon: Sparkles },
    { id: 'holographic', name: 'Prisma',  short: '+2× mult fixo',       cost: 4, color: 'text-fuchsia-300', ring: 'ring-fuchsia-600', icon: Zap },
    { id: 'gold',        name: 'Midas',   short: '+$2 ao vencer',       cost: 5, color: 'text-amber-300',   ring: 'ring-amber-500',   icon: Coins },
  ];
  const MATERIALS = [
    { id: 'wood',     name: 'Madeira',  short: '+50 base ao pontuar',    cost: 3, color: 'text-orange-300', ring: 'ring-orange-800',  icon: Hexagon },
    { id: 'glass',    name: 'Cristal',  short: '+8 mult · pode quebrar', cost: 4, color: 'text-cyan-300',   ring: 'ring-cyan-600',    icon: Gem },
    { id: 'steel',    name: 'Aço',      short: '×1.5 mult se travado',   cost: 5, color: 'text-zinc-200',   ring: 'ring-zinc-500',    icon: Shield },
    { id: 'obsidian', name: 'Obsidiana',short: '×2 mult ao pontuar',     cost: 6, color: 'text-violet-300', ring: 'ring-violet-600',  icon: Flame },
  ];
  const HANDS = ['Solo Die', 'Double', 'Two Doubles', 'Triple', 'Sequence', 'Full Chamber', 'Quad', 'Pentad'];

  const curseCount = state.activeVoidCurses ? Object.keys(state.activeVoidCurses).length : 0;
  const CURSE_PT: Record<string, string> = {
    curse_lockout: 'Travas de dados desativadas',
    curse_poverty: 'Cada rolagem custa $1',
    curse_drain: '−60 pontos base',
    curse_corrupt_surge: '+20% corrupção nos rerolls',
    curse_leak: 'Multiplicadores enfraquecidos',
  };

  const TABS: Array<{ id: TabId; label: string; icon: any }> = [
    { id: 'relics', label: 'Relíquias', icon: Star },
    { id: 'dice',   label: 'Dados',     icon: Dices },
    { id: 'hands',  label: 'Mãos',      icon: ArrowUpCircle },
  ];

  // ---- Card de custo reutilizável ----
  const CoinBtn = ({ cost, onClick, disabled }: { cost: number; onClick: () => void; disabled: boolean }) => (
    <button
      onMouseEnter={() => sfx.playHover()}
      onClick={onClick}
      disabled={disabled}
      className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg font-black text-sm tabular-nums transition-all cursor-pointer border ${
        disabled
          ? 'bg-black/40 text-zinc-600 border-zinc-800 cursor-not-allowed'
          : 'bg-amber-400 text-black border-amber-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_16px_rgba(251,191,36,0.4)]'
      }`}
    >
      <Coins className="w-3.5 h-3.5" /> {cost}
    </button>
  );

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#070509] text-white font-sans select-none overflow-hidden">
      {/* ambiente */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-amber-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ===== HEADER (fixo) ===== */}
      <header className="shrink-0 relative z-10 flex items-center justify-between px-4 pt-4 pb-3 md:px-8 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center">
            <Crown className="w-5 h-5 text-amber-300" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-black tracking-widest text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.35)]">
            BAZAAR
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-500/40 rounded-2xl px-3.5 py-2 shadow-[0_0_18px_rgba(251,191,36,0.15)]">
          <Coins className="w-5 h-5 text-amber-300" />
          <span className="text-xl md:text-2xl font-black text-amber-300 tabular-nums leading-none">{gold}</span>
        </div>
      </header>

      {/* aviso de cursos (compacto, expansível) */}
      {curseCount > 0 && (
        <div className="shrink-0 relative z-10 px-4 md:px-8 pt-2">
          <button
            onClick={() => { sfx.playClick(); setShowCurses(v => !v); }}
            className="w-full flex items-center gap-2 bg-red-950/30 border border-red-800/40 rounded-xl px-3 py-1.5 text-left cursor-pointer"
          >
            <Skull className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-red-300 flex-1">
              {curseCount} curso{curseCount > 1 ? 's' : ''} do Vazio ativo{curseCount > 1 ? 's' : ''}
            </span>
            <ChevronRight className={`w-4 h-4 text-red-400 transition-transform ${showCurses ? 'rotate-90' : ''}`} />
          </button>
          <AnimatePresence>
            {showCurses && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {Object.entries(state.activeVoidCurses).map(([id, curse]) => (
                    <span key={id} className="px-2 py-0.5 bg-red-950/40 text-red-300 text-[10px] rounded-md border border-red-900/40 font-bold">
                      {CURSE_PT[curse] || curse}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ===== TABS (fixo) ===== */}
      <nav className="shrink-0 relative z-10 flex gap-1.5 px-4 md:px-8 pt-3">
        {TABS.map(t => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onMouseEnter={() => sfx.playHover()}
              onClick={() => { sfx.playClick(); setTab(t.id); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-t-xl font-black uppercase text-[11px] md:text-sm tracking-wider transition-all cursor-pointer border-b-2 ${
                active
                  ? 'bg-white/5 text-amber-300 border-amber-400'
                  : 'text-zinc-500 border-transparent hover:text-zinc-300'
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </nav>

      {/* ===== CONTEÚDO (rola só aqui) ===== */}
      <main className="flex-1 min-h-0 overflow-y-auto relative z-10 px-4 md:px-8 py-4">
        <AnimatePresence mode="wait">
          {/* ---------- RELÍQUIAS ---------- */}
          {tab === 'relics' && (
            <motion.div key="relics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-3xl mx-auto">
              <div className="flex justify-end mb-3">
                <button
                  onMouseEnter={() => sfx.playHover()}
                  onClick={reroll}
                  disabled={!afford(1)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
                    afford(1) ? 'bg-white/5 border-white/15 text-zinc-200 hover:bg-white/10' : 'bg-black/40 border-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Renovar · 1
                </button>
              </div>

              {shopRelics.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl text-zinc-600 uppercase tracking-widest text-xs font-mono">
                  Prateleira vazia
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {shopRelics.map((relic, i) => {
                    const Icon = ICON_MAP[relic.icon] || Hexagon;
                    const cost = rarityCost(relic.rarity);
                    const r = RAR[relic.rarity as keyof typeof RAR] || RAR.common;
                    return (
                      <motion.div
                        key={relic.id}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className={`flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] ring-1 ${r.ring} ring-opacity-40`}
                        style={{ boxShadow: `0 0 18px ${r.glow}` }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-black/50 flex items-center justify-center shrink-0" style={{ boxShadow: `inset 0 0 12px ${r.glow}` }}>
                          <Icon className={`w-6 h-6 ${r.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${r.dot}`} />
                            <h3 className="text-sm font-black text-white truncate">{relic.name}</h3>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2 mt-0.5">{relic.description}</p>
                        </div>
                        <CoinBtn cost={cost} disabled={!afford(cost)} onClick={() => buyRelic(relic.id, cost)} />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* ---------- DADOS (modificadores + materiais) ---------- */}
          {tab === 'dice' && (
            <motion.div key="dice" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-3xl mx-auto space-y-4">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black text-center">Aplica em um dado aleatório</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {[...DICE_MODS, ...MATERIALS].map((m, i) => {
                  const Icon = (m as any).icon;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.03] ring-1 ${m.ring} ring-opacity-40`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-black/50 flex items-center justify-center mb-2">
                        <Icon className={`w-5.5 h-5.5 ${m.color}`} />
                      </div>
                      <span className={`text-xs font-black uppercase tracking-wide ${m.color}`}>{m.name}</span>
                      <span className="text-[10px] text-zinc-400 leading-tight mt-0.5 mb-2.5 h-7 flex items-center">{m.short}</span>
                      <CoinBtn
                        cost={m.cost}
                        disabled={!afford(m.cost)}
                        onClick={() => (('icon' in m && DICE_MODS.some(d => d.id === m.id)) ? buyMod(m.id, m.cost) : buyMat(m.id, m.cost))}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ---------- MÃOS ---------- */}
          {tab === 'hands' && (
            <motion.div key="hands" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-3xl mx-auto">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black text-center mb-3">Sintonize combinações · +15 base / +2 mult por nível</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {HANDS.map((hand, i) => {
                  const info = state.handLevels[hand];
                  const cost = 1;
                  return (
                    <motion.div
                      key={hand}
                      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                      className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/[0.03] ring-1 ring-white/10"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-black text-white truncate">{HAND_PT[hand] || hand}</div>
                        <div className="text-[10px] font-mono font-black text-amber-300 tracking-widest">NÍV {info.level}</div>
                      </div>
                      <CoinBtn cost={cost} disabled={!afford(cost)} onClick={() => upgradeHand(hand, cost)} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ===== FOOTER (fixo) ===== */}
      <footer className="shrink-0 relative z-10 border-t border-white/10 px-4 md:px-8 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/40">
        <button
          onMouseEnter={() => sfx.playHover()}
          onClick={leave}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black uppercase tracking-widest text-sm hover:from-white hover:to-white active:scale-[0.98] transition-all shadow-[0_0_28px_rgba(251,191,36,0.35)]"
        >
          Próximo Blind <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
