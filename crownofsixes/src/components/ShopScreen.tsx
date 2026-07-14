import React from 'react';
import { useGame } from '../game/GameContext';
import { RELICS_DB } from '../game/relics';
import { motion } from 'framer-motion';
import { 
  Hexagon, Eye, Scroll, Zap, Heart, Spade, Dices, Copy, Activity, 
  Skull, Star, Coins, ArrowUpCircle, Layers, RefreshCw, ChevronRight,
  Magnet, Crown, Ghost, Crosshair, Flame, Rocket, Shield
} from 'lucide-react';
import { sfx } from '../utils/sound';

const ICON_MAP: Record<string, any> = {
  Hexagon, Eye, Scroll, Zap, Heart, Spade, Dices, Copy, Activity, 
  Skull, Star, Magnet, Crown, Coins, Shield, Ghost, Crosshair, Flame, Rocket
};

export function ShopScreen() {
  const { state, dispatch } = useGame();

  const handleBuyRelic = (id: string, cost: number) => {
    if (state.gold >= cost) {
       sfx.playPowerup();
       dispatch({ type: 'BUY_RELIC', id, cost });
    }
  };

  const handleUpgradeHand = (handLabel: string, cost: number) => {
     if (state.gold >= cost) {
       sfx.playPowerup();
       dispatch({ type: 'UPGRADE_HAND', hand: handLabel, cost });
     }
  };

  const handleLeaveShop = () => {
    sfx.playPowerup();
    dispatch({ type: 'LEAVE_SHOP' });
  };

  // Filter regular shop relics to exclude VOID tier
  const shopRelics = state.shopItems
    .map(id => RELICS_DB.find(r => r.id === id)!)
    .filter(r => r && r.rarity !== 'void');

  const getRarityCost = (rarity: string) => {
    switch(rarity) {
        case 'legendary': return 6;
        case 'epic': return 4;
        case 'rare': return 3;
        default: return 2;
    }
  };

  const handsToUpgrade = ['Solo Die', 'Double', 'Two Doubles', 'Triple', 'Sequence', 'Full Chamber', 'Quad', 'Pentad'];

  return (
    <div id="shop_screen_root" className="absolute inset-0 flex flex-col items-center justify-start bg-[#050507]/99 backdrop-blur-3xl z-50 p-4 sm:p-10 overflow-y-auto w-full h-full select-none text-white font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-0" />
      <div className="absolute w-[600px] h-[600px] bg-amber-950/15 rounded-full blur-[150px] pointer-events-none top-[-250px] z-0" />
      
      {/* HEADER HUD BAR */}
      <div className="flex flex-col sm:flex-row justify-between w-full max-w-6xl mb-6 sm:mb-8 items-center border-b border-g-border pb-4 sm:pb-6 z-10 gap-2 sm:gap-4">
        <div>
           <div className="flex items-center gap-2 sm:gap-3">
             <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-g-gold" />
             <h1 className="text-3xl sm:text-4xl font-serif text-g-gold tracking-wider drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] font-black">
               O BAZAAR
             </h1>
           </div>
           <p className="text-xs sm:text-sm text-g-muted mt-1 font-serif font-black uppercase tracking-wide">
             Consagre novas bênçãos e transmute seus dados usando o ouro acumulado das runas.
           </p>
        </div>

        {/* GOLD BALANCE */}
        <div className="flex items-center gap-3 bg-[#160f0a] border border-[#d4af37]/45 px-5 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.12)]">
           <Coins className="w-5.5 h-5.5 text-g-gold animate-pulse" />
           <div className="flex flex-col">
             <span className="text-[9px] font-serif text-g-muted uppercase tracking-widest font-bold leading-none">Ouro Disponível</span>
             <span className="text-lg font-serif text-g-gold font-black mt-0.5">${state.gold}</span>
           </div>
        </div>
      </div>

      {/* DETAILED ACTIVE VOID CURSE ALERTS */}
      <div className="w-full max-w-6xl z-10 mb-4 sm:mb-6">
        {state.activeVoidCurses && Object.keys(state.activeVoidCurses).length > 0 && (
          <div className="bg-[#120005]/80 border border-red-900/40 rounded-2xl p-4 shadow-[0_0_25px_rgba(239,68,68,0.08)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Skull className="w-6 h-6 text-red-500 animate-pulse shrink-0" />
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#ef4444] font-black">CURSOS ATIVOS DO VAZIO</span>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Moduladores do vazio estão penalizando seus resultados nesta partida:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(state.activeVoidCurses).map(([relicId, curseType]) => {
                    let desc = curseType;
                    if (curseType === 'curse_lockout') desc = 'Bloqueio de Trava (Travas de dados desativadas)';
                    if (curseType === 'curse_poverty') desc = 'Dreno Solar (Cada rolo de dados consome $1)';
                    if (curseType === 'curse_drain') desc = 'Seta Gravitacional (-60 Pontos Base de saldo)';
                    if (curseType === 'curse_corrupt_surge') desc = 'Sobrecarga (+20% Radiação média nos rerolls)';
                    if (curseType === 'curse_leak') desc = 'Filtro Frágil (Multiplicadores enfraquecidos)';
                    
                    return (
                      <span key={`str-${relicId}`} className="px-2.5 py-0.5 bg-red-950/20 text-[#ef4444] text-[10px] font-mono rounded border border-red-900/30 font-bold uppercase">
                        {desc}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TWO COLUMN PRODUCTIVE LAYOUT */}
      <div className="w-full max-w-6xl flex gap-8 flex-col lg:flex-row z-10 items-stretch">
          
          {/* LEFT COLUMN: Market Relics & Calibrate Core */}
          <div className="flex-1 space-y-8 flex flex-col justify-start">
              
              {/* BUY RELICS SHELF */}
              <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-sm text-zinc-400 uppercase tracking-widest font-black flex items-center gap-2">
                          <Star className="w-4 h-4 text-g-gold" /> Prateleira de Relíquias
                      </h2>
                      <button
                          onMouseEnter={() => sfx.playHover()}
                          onClick={() => {
                              if (state.gold >= 1) {
                                 sfx.playPowerup();
                                 dispatch({ type: 'REROLL_SHOP' });
                              }
                          }}
                          disabled={state.gold < 1}
                          className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${state.gold >= 1 ? 'bg-[#0d0d12] text-zinc-100 border-zinc-800 hover:bg-zinc-200 hover:text-black hover:border-white shadow-md' : 'bg-transparent text-zinc-700 border-zinc-950 cursor-not-allowed'}`}
                      >
                          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Reroll ($1)
                      </button>
                  </div>

                  <div className="flex flex-col gap-3">
                     {shopRelics.length === 0 && (
                        <div className="text-center py-8 bg-zinc-900/10 rounded-2xl border border-dashed border-zinc-800 flex flex-col items-center justify-center">
                          <Layers className="w-8 h-8 text-zinc-700 mb-2" />
                          <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-mono leading-none">Prateleira Vazia!</p>
                        </div>
                     )}
                     {shopRelics.map((relic, i) => {
                          const Icon = ICON_MAP[relic.icon] || Hexagon;
                          const cost = getRarityCost(relic.rarity);
                          const canAfford = state.gold >= cost;

                          const rarityColors: Record<string, string> = {
                              common: 'border-zinc-900 bg-[#0d0d12]/40 hover:bg-[#12121c]/50',
                              rare: 'border-blue-950 bg-blue-950/5 hover:border-blue-800',
                              epic: 'border-purple-950 bg-purple-950/5 hover:border-purple-800',
                              legendary: 'border-amber-950/70 bg-amber-950/5 hover:border-g-gold text-[#f1c40f]',
                          };

                          const iconColors: Record<string, string> = {
                            common: 'text-zinc-500',
                            rare: 'text-blue-400',
                            epic: 'text-purple-400',
                            legendary: 'text-g-gold'
                          };

                          return (
                              <motion.div
                                  key={`${relic.id}`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 ${rarityColors[relic.rarity]}`}
                              >
                                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-zinc-905 flex items-center justify-center shrink-0 shadow-inner">
                                      <Icon className={`w-4.5 h-4.5 ${iconColors[relic.rarity]}`} />
                                  </div>
                                  <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2">
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">{relic.name}</h3>
                                        <span className="text-[8px] font-mono uppercase tracking-widest px-1 py-0.5 rounded bg-zinc-900 text-zinc-500">
                                          {relic.rarity}
                                        </span>
                                      </div>
                                      <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">{relic.description}</p>
                                  </div>
                                  <button 
                                      onMouseEnter={() => sfx.playHover()}
                                      onClick={() => handleBuyRelic(relic.id, cost)}
                                      disabled={!canAfford}
                                      className={`shrink-0 px-4 py-2 font-black uppercase text-[10px] rounded-lg border transition-all duration-300 cursor-pointer ${canAfford ? 'bg-white text-black hover:bg-g-gold hover:text-black hover:scale-105 border-white' : 'bg-transparent text-zinc-700 border-zinc-950 cursor-not-allowed'}`}
                                  >
                                      ${cost}
                                  </button>
                              </motion.div>
                          )
                     })}
                  </div>
              </div>

              {/* CALIBRATE CORE PIPS */}
              <div>
                  <h2 className="text-sm text-zinc-400 mb-4 uppercase tracking-widest font-black flex items-center gap-2">
                      <Dices className="w-4 h-4 text-zinc-500" /> Alquimia dos Pips (Dado Randômico)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                          { id: 'foil', name: 'Liga de Prata', desc: '+30 pontos base permanentes de bônus na mesa', cost: 3, textColor: 'text-zinc-300', border: 'border-zinc-800 hover:border-zinc-500' },
                          { id: 'holographic', name: 'Espectro Prisma', desc: '+2x multiplicador fixo em todas as combinações', cost: 4, textColor: 'text-purple-400', border: 'border-purple-950 hover:border-purple-500' },
                          { id: 'gold', name: 'Midas Alquimia', desc: 'Concede +$2 de moeda ao vencer o blind atual', cost: 5, textColor: 'text-g-gold', border: 'border-amber-950/40 hover:border-g-gold' },
                      ].map(mod => {
                          const canAfford = state.gold >= mod.cost;
                          return (
                             <div key={`${mod.id}`} className={`p-4 bg-[#0d0d12]/30 border rounded-xl flex flex-col items-center text-center transition-all duration-300 ${mod.border}`}>
                                <span className={`font-black uppercase tracking-wider text-[11px] ${mod.textColor}`}>{mod.name}</span>
                                <span className="text-[10px] text-zinc-400 mt-1 mb-4 h-8 flex items-center leading-relaxed">{mod.desc}</span>
                                <button 
                                   onMouseEnter={() => sfx.playHover()}
                                   onClick={() => {
                                       if (canAfford) {
                                           sfx.playPowerup();
                                           dispatch({ type: 'UPGRADE_DICE', modifier: mod.id as any, cost: mod.cost });
                                       }
                                   }}
                                   disabled={!canAfford}
                                   className={`w-full py-2 font-black text-[9px] uppercase rounded-lg border transition-all duration-300 cursor-pointer ${canAfford ? 'bg-zinc-800 hover:bg-white hover:text-black border-zinc-700' : 'bg-transparent text-zinc-700 border-zinc-950 cursor-not-allowed'}`}
                                >
                                   ${mod.cost}
                                </button>
                             </div>
                          )
                      })}
                  </div>
              </div>

              {/* MATERIAL ENCHANTMENTS */}
              <div className="mt-8">
                  <h2 className="text-sm text-zinc-400 mb-4 uppercase tracking-widest font-black flex items-center gap-2">
                      <Hexagon className="w-4 h-4 text-zinc-500" /> Encantamentos Materiais (Dado Randômico)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                          { id: 'wood', name: 'Madeira Entalhada', desc: '+50 Base quando pontuado', cost: 3, textColor: 'text-[#8b5a2b]', border: 'border-[#8b5a2b]/40 hover:border-[#8b5a2b]' },
                          { id: 'obsidian', name: 'Pedra Obsidiana', desc: 'x2 Mult quando pontuado. Imune à corrupção.', cost: 6, textColor: 'text-violet-400', border: 'border-violet-950/60 hover:border-violet-500' },
                          { id: 'steel', name: 'Aço Forjado', desc: 'x1.5 Mult global enqto mantido (locked)', cost: 5, textColor: 'text-zinc-300', border: 'border-zinc-700/60 hover:border-zinc-400' },
                          { id: 'glass', name: 'Cristal Frágil', desc: '+8 Mult quando pontuado. Pode quebrar', cost: 4, textColor: 'text-cyan-300', border: 'border-cyan-950/60 hover:border-cyan-400' },
                      ].map(mat => {
                          const canAfford = state.gold >= mat.cost;
                          return (
                             <div key={`${mat.id}`} className={`p-4 bg-[#0d0d12]/30 border rounded-xl flex flex-col items-center text-center transition-all duration-300 ${mat.border}`}>
                                <span className={`font-black uppercase tracking-wider text-[11px] ${mat.textColor}`}>{mat.name}</span>
                                <span className="text-[10px] text-zinc-400 mt-1 mb-4 h-8 flex items-center leading-relaxed">{mat.desc}</span>
                                <button 
                                   onMouseEnter={() => sfx.playHover()}
                                   onClick={() => {
                                       if (canAfford) {
                                           sfx.playPowerup();
                                           dispatch({ type: 'UPGRADE_DICE_MATERIAL', material: mat.id as any, cost: mat.cost });
                                       }
                                   }}
                                   disabled={!canAfford}
                                   className={`w-full py-2 font-black text-[9px] uppercase rounded-lg border transition-all duration-300 cursor-pointer ${canAfford ? 'bg-zinc-800 hover:bg-white hover:text-black border-zinc-700' : 'bg-transparent text-zinc-700 border-zinc-950 cursor-not-allowed'}`}
                                >
                                   ${mat.cost}
                                </button>
                             </div>
                          )
                      })}
                  </div>
              </div>

          </div>
          
          {/* RIGHT COLUMN: ATTUNE MATRIX */}
          <div className="flex-1 space-y-8 flex flex-col justify-start">
              <div>
                 <h2 className="text-sm text-zinc-400 mb-4 uppercase tracking-widest font-black flex items-center gap-2">
                     <ArrowUpCircle className="w-4 h-4 text-zinc-500"/> Calibrar Frequências da Matriz (Cartas)
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {handsToUpgrade.map((hand, i) => {
                        const levelInfo = state.handLevels[hand];
                        const cost = 1;
                        const canAfford = state.gold >= cost;

                        return (
                            <motion.div
                                key={`str-${hand}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.04 + 0.08 }}
                                className="flex flex-col items-center bg-[#0d0d12]/30 border border-zinc-800/60 p-4 rounded-xl text-center hover:border-zinc-700/60 transition-colors"
                            >
                                <span className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">{hand}</span>
                                <span className="text-[9px] text-g-gold font-mono font-black uppercase tracking-widest mb-3">LVL {levelInfo.level}</span>
                                
                                <button 
                                    onMouseEnter={() => sfx.playHover()}
                                    onClick={() => handleUpgradeHand(hand, cost)}
                                    disabled={!canAfford}
                                    className={`w-full py-2 font-black uppercase text-[9px] rounded-lg border transition-all duration-300 cursor-pointer ${canAfford ? 'bg-zinc-800 text-white border-zinc-700 hover:bg-g-gold hover:text-black hover:border-g-gold' : 'bg-transparent text-zinc-700 border-zinc-950 cursor-not-allowed'}`}
                                >
                                    Sintonizar (${cost})
                                </button>
                            </motion.div>
                        )
                     })}
                 </div>
              </div>
          </div>
      </div>
      
      {/* LEAVE SHOP TRIGGER */}
      <button 
        onMouseEnter={() => sfx.playHover()}
        onClick={handleLeaveShop}
        className="mt-8 px-12 py-3.5 bg-g-gold text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] rounded-xl cursor-pointer border border-[#ffd700]/30 hover:border-white flex items-center gap-2 group shrink-0"
      >
        PRÓXIMO BLIND <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
      </button>
    </div>
  );
}
