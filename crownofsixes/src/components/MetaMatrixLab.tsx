import React, { useState, useEffect, useRef } from 'react';
import { useGame, defaultMetaUpgrades } from '../game/GameContext';
import * as d3 from 'd3';
import { sfx } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowLeft, Cpu, Shield, Zap, Layers, 
  Check, Play, Trash2, Eye, Lock, RefreshCw, Star,
  Scroll, Wand2
} from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'cosmetic' | 'molecular' | 'hack' | 'void';
}

const COSMETICS_LIST = [
  { id: 'synthwave', name: 'Neon Synthwave', description: 'Glow in cyan & pink neon laser frequencies.', cost: 35 },
  { id: 'cyberpunk', name: 'Cyber Grid', description: 'Deep hacker green matrix terminal skin.', cost: 75 },
  { id: 'alchemist', name: 'Crucible Gold', description: 'The polished shine of gold alchemist runes.', cost: 120 },
  { id: 'cosmic', name: 'Deep Nebula', description: 'Cosmic celestial violet stardust casing.', cost: 180 },
];

export function HistoryVictoriesD3() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let rawData = [];
    try {
      const savedHistory = localStorage.getItem('crown_of_sixes_history');
      if (savedHistory) {
        rawData = JSON.parse(savedHistory);
      }
    } catch(e) {
      console.error("Failed to load history data", e);
    }

    // Default historical runs for the parchment style
    if (rawData.length === 0) {
      rawData = [
        { score: 1850, round: 5, status: 'victory', date: '04/06/2026 14:32' },
        { score: 620, round: 3, status: 'corrupted', date: '04/06/2026 15:10' },
        { score: 2430, round: 6, status: 'victory', date: '05/06/2026 18:01' },
        { score: 800, round: 4, status: 'quit', date: '06/06/2026 09:15' }
      ];
    }

    // Sort descending by score
    rawData.sort((a: any, b: any) => b.score - a.score);

    const container = d3.select(containerRef.current);
    container.selectAll('*').remove();

    // Create medieval parchment scroll paper card view
    const paper = container.append('div')
      .attr('class', 'relative p-5 md:p-8 rounded-2xl bg-[#ebdca9] text-[#3e2716] border-[10px] border-[#8b5e3c]/50 shadow-[inset_0_0_50px_rgba(139,94,60,0.4),0_10px_30px_rgba(0,0,0,0.7)] overflow-hidden font-serif');

    // Title banner
    const titleHeader = paper.append('div')
      .attr('class', 'text-center border-b-2 border-dashed border-[#8b5e3c]/30 pb-4 mb-6 relative z-10');

    titleHeader.append('h2')
      .attr('class', 'text-xl md:text-2xl font-black uppercase tracking-widest text-[#5c3a21]')
      .text('📜 Pergaminho Glorioso de Conquistas 📜');

    titleHeader.append('p')
      .attr('class', 'text-[10px] md:text-xs italic text-[#784f33] tracking-wide mt-1')
      .text('Feitos imortalizados nos anais do Altar alquímico de Crowley');

    // Stats Bar
    const statsContainer = paper.append('div')
      .attr('class', 'flex flex-wrap justify-center gap-4 md:gap-8 mb-6 font-serif text-xs font-bold uppercase text-[#5c3a21] relative z-10');

    const totalRuns = rawData.length;
    const victoriesCount = rawData.filter((r: any) => r.status === 'victory').length;
    const highestScore = d3.max(rawData, (r: any) => r.score) || 0;

    const statBox1 = statsContainer.append('div').attr('class', 'bg-[#f5e9c9] border border-[#a27b5c]/30 px-4 py-2 rounded-lg shadow-inner flex flex-col items-center min-w-[100px]');
    statBox1.append('div').attr('class', 'text-[#784f33] text-[9px] tracking-widest font-normal').text('Total de Partidas');
    statBox1.append('div').attr('class', 'text-base font-black text-[#5c3a21] mt-1').text(totalRuns);

    const statBox2 = statsContainer.append('div').attr('class', 'bg-[#f5e9c9] border border-[#a27b5c]/30 px-4 py-2 rounded-lg shadow-inner flex flex-col items-center min-w-[100px]');
    statBox2.append('div').attr('class', 'text-[#784f33] text-[9px] tracking-widest font-normal').text('Vitórias Régias');
    statBox2.append('div').attr('class', 'text-base font-black text-emerald-800 mt-1').text(victoriesCount);

    const statBox3 = statsContainer.append('div').attr('class', 'bg-[#f5e9c9] border border-[#a27b5c]/30 px-4 py-2 rounded-lg shadow-inner flex flex-col items-center min-w-[100px]');
    statBox3.append('div').attr('class', 'text-[#784f33] text-[9px] tracking-widest font-normal').text('Maior Pontuação');
    statBox3.append('div').attr('class', 'text-base font-black text-amber-800 mt-1').text(`${highestScore} pts`);

    // Table view with elegant outline
    const tableContainer = paper.append('div')
      .attr('class', 'relative z-10 overflow-x-auto rounded-xl border border-[#a27b5c]/30 shadow-inner bg-[#fffcf5]/75');

    const table = tableContainer.append('table')
      .attr('class', 'w-full text-left font-serif border-collapse min-w-[450px]');

    const trHeader = table.append('thead')
      .attr('class', 'bg-[#e5d49f] border-b border-[#a27b5c]/40 text-[10px] md:text-xs text-[#3e2716] uppercase font-bold tracking-wider')
      .append('tr');

    const headers = ['Posição', 'Pontuação Máxima', 'Saga / Rodada', 'Rito do Destino', 'Marca Astral'];
    trHeader.selectAll('th')
      .data(headers)
      .enter()
      .append('th')
      .attr('class', 'px-4 py-4 md:px-6')
      .text(d => d);

    const tbody = table.append('tbody')
      .attr('class', 'divide-y divide-[#a27b5c]/25 text-xs md:text-sm text-[#4e3621]');

    const rows = tbody.selectAll('tr')
      .data(rawData)
      .enter()
      .append('tr')
      .attr('class', (d, i) => i % 2 === 0 ? 'bg-[#f4ebd0]/40 hover:bg-[#ebdca9]/60 transition-colors' : 'bg-transparent hover:bg-[#ebdca9]/60 transition-colors');

    // Col 1: Pos rank
    rows.append('td')
      .attr('class', 'px-4 py-3 md:px-6 font-mono text-center font-bold text-[#8b5e3c]')
      .text((d, i) => {
        if (i === 0) return '🏆 I';
        if (i === 1) return '⚔️ II';
        if (i === 2) return '🛡️ III';
        return `${i + 1}º`;
      });

    // Col 2: Score
    rows.append('td')
      .attr('class', 'px-4 py-3 md:px-6 font-black tracking-wide font-serif text-sm md:text-base min-w-[124px] text-stone-850')
      .html((d: any) => `<span>🔮 ${d.score}</span>`);

    // Col 3: Round
    rows.append('td')
      .attr('class', 'px-4 py-3 md:px-6 italic font-medium text-stone-750')
      .text((d: any) => `Rodada ${d.round}`);

    // Col 4: Status / Outcome
    rows.append('td')
      .attr('class', 'px-4 py-3 md:px-6 font-bold uppercase text-[9px] tracking-wider')
      .html((d: any) => {
        if (d.status === 'victory') {
          return '<span class="px-2 py-0.5 bg-emerald-700/10 text-emerald-800 border border-emerald-800/20 rounded font-black">Vitória Plena</span>';
        } else if (d.status === 'quit') {
          return '<span class="px-2 py-0.5 bg-stone-700/15 text-stone-700 border border-[#8c7853]/20 rounded font-black">Retirado</span>';
        } else {
          return '<span class="px-2 py-0.5 bg-red-700/10 text-red-900 border border-red-900/20 rounded font-black">Corrompido</span>';
        }
      });

    // Col 5: Date
    rows.append('td')
      .attr('class', 'px-4 py-3 md:px-6 text-[10px] md:text-xs font-serif text-stone-600')
      .text((d: any) => d.date);

  }, []);

  return (
    <div className="w-full" ref={containerRef} />
  );
}

export function MetaMatrixLab() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab ] = useState<'cosmetics' | 'molecular' | 'hacks' | 'void' | 'history'>('cosmetics');

  const shards = state.metaShards || 0;
  const upgrades = state.metaUpgrades || defaultMetaUpgrades;
  const unlockedSets = state.unlockedDiceSets || ['default'];

  const handleBack = () => {
    sfx.playClick();
    dispatch({ type: 'LEAVE_META_LAB' });
  };

  const buyCosmetic = (id: string, cost: number) => {
    if (shards < cost) {
      sfx.playUnstable();
      return;
    }
    sfx.playPowerup();
    dispatch({ type: 'UNLOCK_META_COSMETIC_SET', setId: id, shardCost: cost });
  };

  const buyMolecular = (key: 'startingSteelDie' | 'startingGlassDie' | 'startingMidasDie', cost: number) => {
    if (shards < cost) {
      sfx.playUnstable();
      return;
    }
    sfx.playPowerup();
    dispatch({
      type: 'BUY_META_UPGRADE',
      upgradesPatch: { [key]: true },
      shardCost: cost
    });
  };

  const buyXpBoost = (cost: number) => {
    if (shards < cost) {
      sfx.playUnstable();
      return;
    }
    sfx.playPowerup();
    dispatch({
      type: 'BUY_META_UPGRADE',
      upgradesPatch: { xpMultiplier: 1.5 },
      shardCost: cost
    });
  };

  const togglePreloadHack = (hackId: string, cost: number) => {
    const preloads = upgrades.startingConsumables || [];
    const isOwned = preloads.includes(hackId);

    if (isOwned) {
      sfx.playClick();
      // Remove it
      const nextPreloads = preloads.filter(id => id !== hackId);
      dispatch({
        type: 'BUY_META_UPGRADE',
        upgradesPatch: { startingConsumables: nextPreloads },
        shardCost: 0
      });
    } else {
      if (shards < cost) {
        sfx.playUnstable();
        return;
      }
      if (preloads.length >= 2) {
        sfx.playUnstable();
        return; // Max 2 preloaded hacks starting buffer limit
      }
      sfx.playPowerup();
      const nextPreloads = [...preloads, hackId];
      dispatch({
        type: 'BUY_META_UPGRADE',
        upgradesPatch: { startingConsumables: nextPreloads },
        shardCost: cost
      });
    }
  };

  const buyVoidBlueprint = (relicId: string, cost: number) => {
    const blueprints = upgrades.unlockedBlueprints || [];
    if (blueprints.includes(relicId)) return;
    if (shards < cost) {
      sfx.playUnstable();
      return;
    }
    sfx.playPowerup();
    const nextBlueprints = [...blueprints, relicId];
    dispatch({
      type: 'BUY_META_UPGRADE',
      upgradesPatch: { unlockedBlueprints: nextBlueprints },
      shardCost: cost
    });
  };

  return (
    <div id="meta_matrix_lab" className="fixed inset-0 z-40 bg-[#040406] text-zinc-100 flex flex-col font-sans select-none overflow-y-auto">
      {/* Sci-fi ambient glow background lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
      
      {/* Outer wrapper max-w-7xl for responsive desktop-first discipline */}
      <div className="w-full max-w-5xl mx-auto flex flex-col min-h-screen px-4 py-6 md:py-10 relative z-10">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-purple-900/30 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <button
              id="lab_back_btn"
              onClick={handleBack}
              onMouseEnter={() => sfx.playHover()}
              className="px-4 py-2 border border-zinc-800 hover:border-purple-500 rounded-xl flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer bg-zinc-950/40"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              MENU
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-black tracking-wider text-g-gold drop-shadow-[0_2px_15px_rgba(212,175,55,0.45)]">
                Altar de Consagração Rúnica
              </h1>
              <p className="text-[10px] font-serif text-g-gold/80 tracking-widest uppercase">
                Poderes e Bênçãos Persistentes para Sempre
              </p>
            </div>
          </div>

          {/* Shard counter */}
          <motion.div 
            layoutId="shard_counter"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-950/40 to-yellow-950/40 border border-g-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          >
            <div className="w-8 h-8 rounded-full bg-g-gold/20 flex items-center justify-center border border-g-gold/40 animate-pulse">
              <Sparkles className="w-4 h-4 text-g-gold" />
            </div>
            <div>
              <div className="text-[10px] font-serif text-g-gold uppercase tracking-widest leading-none font-bold">Estilhaços Arcanos</div>
              <div className="text-xl font-bold text-white font-mono leading-none mt-1">{shards} <span className="text-g-gold text-xs font-normal font-sans">EA</span></div>
            </div>
          </motion.div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-g-border/30 pb-px mb-8 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'cosmetics', name: 'Relíquias Visuais', icon: Layers },
            { id: 'molecular', name: 'Bênçãos Alquímicas', icon: Wand2 },
            { id: 'hacks', name: 'Grimório de Feitiços', icon: Scroll },
            { id: 'void', name: 'Segredos do Abismo', icon: Shield },
            { id: 'history', name: 'Histórico de Vitórias', icon: Star },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={`${tab.id}`}
                onClick={() => { sfx.playClick(); setActiveTab(tab.id as any); }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-5 py-3 text-xs md:text-sm font-serif tracking-wider uppercase border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  active 
                    ? 'border-g-gold text-g-gold bg-amber-950/10 font-bold' 
                    : 'border-transparent text-g-muted hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-g-gold animate-pulse' : 'text-zinc-650'}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* Cosmetics tab */}
            {activeTab === 'cosmetics' && (
              <motion.div
                key="cosm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {COSMETICS_LIST.map(item => {
                  const unlocked = unlockedSets.includes(item.id);
                  const isEquipped = state.selectedDiceSet === item.id;
                  const canBuy = shards >= item.cost;
                  
                  return (
                    <div 
                      key={`${item.id}`}
                      className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden backdrop-blur-sm ${
                        unlocked 
                          ? 'bg-purple-950/5 border-purple-950 hover:border-purple-800' 
                          : 'bg-zinc-950/30 border-zinc-900 hover:border-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <h3 className="text-base font-bold text-zinc-100 font-serif tracking-wide flex items-center gap-2">
                            {item.name}
                            {unlocked && <span className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 text-[9px] text-zinc-400 uppercase rounded font-mono">Disponível</span>}
                          </h3>
                          {!unlocked && (
                            <span className="text-xs font-bold text-purple-400 font-mono bg-purple-950/50 px-2 py-1 rounded border border-purple-900/30">
                              {item.cost} EQ
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                          {item.description}
                        </p>
                      </div>

                      {/* Buy or Equip handles */}
                      <div className="pt-4 border-t border-zinc-900/40 flex items-center justify-between">
                        {unlocked ? (
                          <div className="flex items-center gap-2 w-full">
                            {isEquipped ? (
                              <button
                                disabled
                                className="w-full py-2.5 bg-purple-500/10 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2"
                              >
                                <Check className="w-4 h-4 text-purple-400" />
                                EQUIPADO
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  sfx.playClick();
                                  dispatch({ type: 'SELECT_DICE_SET', id: item.id });
                                }}
                                onMouseEnter={() => sfx.playHover()}
                                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                              >
                                EQUIPAR PELE 🎲
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => buyCosmetic(item.id, item.cost)}
                            disabled={!canBuy}
                            onMouseEnter={() => sfx.playHover()}
                            className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                              canBuy 
                                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                                : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                            DESBLOQUEAR PELE
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Molecular features */}
            {activeTab === 'molecular' && (
              <motion.div
                key="mol"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* 1. Steel Die upgrade */}
                <div className="p-6 rounded-2xl border bg-zinc-950/30 border-zinc-900 hover:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-zinc-100 font-serif flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        Célula de Aço Inicial
                      </h3>
                      {!upgrades.startingSteelDie && (
                        <span className="text-xs font-bold text-purple-400 font-mono bg-purple-950/50 px-2.5 py-1 rounded border border-purple-900/30">
                          60 EQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      O seu primeiro dado da run sempre começará no estado molecular de <b>Aço</b>. Dados de aço são indestrutíveis, perfeitos para blindar contra curses destrutivas.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/40">
                    {upgrades.startingSteelDie ? (
                      <span className="w-full py-2.5 bg-emerald-950/10 border border-emerald-900/40 text-emerald-400 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" /> Ativado Permanente
                      </span>
                    ) : (
                      <button
                        onClick={() => buyMolecular('startingSteelDie', 60)}
                        disabled={shards < 60}
                        onMouseEnter={() => sfx.playHover()}
                        className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                          shards >= 60 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        Ativar Acelerador Molecular
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Glass Die upgrade */}
                <div className="p-6 rounded-2xl border bg-zinc-950/30 border-zinc-900 hover:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-zinc-100 font-serif flex items-center gap-2">
                        <Layers className="w-4 h-4 text-sky-400" />
                        Célula de Vidro Inicial
                      </h3>
                      {!upgrades.startingGlassDie && (
                        <span className="text-xs font-bold text-purple-400 font-mono bg-purple-950/50 px-2.5 py-1 rounded border border-purple-900/30">
                          80 EQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      O seu segundo dado começará no estado molecular de <b>Vidro</b>. Vidro multiplica substancialmente todo o score da mão involvida, mas possui uma chance menor de despedaçar.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/40">
                    {upgrades.startingGlassDie ? (
                      <span className="w-full py-2.5 bg-emerald-950/10 border border-emerald-900/40 text-emerald-400 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" /> Ativado Permanente
                      </span>
                    ) : (
                      <button
                        onClick={() => buyMolecular('startingGlassDie', 80)}
                        disabled={shards < 80}
                        onMouseEnter={() => sfx.playHover()}
                        className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                          shards >= 80 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        Ativar Cristalização Inicial
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Midas Die upgrade */}
                <div className="p-6 rounded-2xl border bg-zinc-950/30 border-zinc-900 hover:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-[#e1af49] font-serif flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Núcleo Alquimista Midas
                      </h3>
                      {!upgrades.startingMidasDie && (
                        <span className="text-xs font-bold text-purple-400 font-mono bg-purple-950/50 px-2.5 py-1 rounded border border-purple-900/30">
                          140 EQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      O seu terceiro dado começará de forma fixa na liga de <b>Midas</b>. Sempre que obtiver um resultado par neste dado, receberá <b>+$1 de Ouro</b> instantaneamente para gastar no Bazaar.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/40">
                    {upgrades.startingMidasDie ? (
                      <span className="w-full py-2.5 bg-emerald-950/10 border border-emerald-900/40 text-emerald-400 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" /> Ativado Permanente
                      </span>
                    ) : (
                      <button
                        onClick={() => buyMolecular('startingMidasDie', 140)}
                        disabled={shards < 140}
                        onMouseEnter={() => sfx.playHover()}
                        className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                          shards >= 140 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        Formatar Liga Alquímica
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. XP boost acceleration */}
                <div className="p-6 rounded-2xl border bg-zinc-950/30 border-zinc-900 hover:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-zinc-100 font-serif flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Ressonador de XP Quântico
                      </h3>
                      {upgrades.xpMultiplier === 1.0 && (
                        <span className="text-xs font-bold text-purple-400 font-mono bg-purple-950/50 px-2.5 py-1 rounded border border-purple-900/30">
                          90 EQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      Aumenta permanentemente em <b>+50%</b> o ganho de XP dos dados em qualquer rodada da run. Excelente para acelerar a subida de níveis e alcançar a ascensão cósmica dos dados mais rapidamente.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/40">
                    {upgrades.xpMultiplier > 1.0 ? (
                      <span className="w-full py-2.5 bg-emerald-950/10 border border-emerald-900/40 text-emerald-400 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" /> Ativado Permanente (+50% XP)
                      </span>
                    ) : (
                      <button
                        onClick={() => buyXpBoost(90)}
                        disabled={shards < 90}
                        onMouseEnter={() => sfx.playHover()}
                        className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                          shards >= 90 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        Sintonizar Acelerador de Frequência
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Starting buffer preloads hacks */}
            {activeTab === 'hacks' && (
              <motion.div
                key="hacks"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="p-4 rounded-xl bg-amber-950/10 border border-g-gold/25">
                  <p className="text-xs text-g-gold font-serif flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-g-gold animate-spin" />
                    <b>CINTURÃO DE PERGAMINHOS:</b> Você pode gastar EA para sintonizar até <b>2 Feitiços</b> iniciais com os quais começará todas as partidas! Sintonize para carregar na sua sacola de ritos ou remova para liberar espaço.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 'hack_rewrite.exe', name: 'Pergaminho de Transmutação', desc: 'Permite reescrever o valor facial de um dado ativo para qualquer número de sua escolha.', cost: 45 },
                    { id: 'overclock.sys', name: 'Poção de Sobrecarregar Runas', desc: 'Aumenta instantaneamente e de forma permanente o nível base de pontuação e base multiplicadora de qualquer jogada de carcaça.', cost: 65 },
                    { id: 'clone_val.bak', name: 'Runa de Replicação Rápida', desc: 'Duplica clones físicos exatos do valor facial de um dado para outro dado selecionado da mesa.', cost: 50 },
                  ].map(hack => {
                    const preloads = upgrades.startingConsumables || [];
                    const selected = preloads.includes(hack.id);
                    const canBuy = shards >= hack.cost;
                    const maxReached = preloads.length >= 2;

                    return (
                      <div 
                        key={`${hack.id}`} 
                        className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                          selected 
                            ? 'bg-amber-950/25 border-g-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                            : 'bg-zinc-950/20 border-zinc-900 hover:border-zinc-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3 border-b border-zinc-900/40 pb-2">
                            <span className="text-xs font-serif font-bold text-zinc-100 flex items-center gap-1.5">
                              <Scroll className={`w-3.5 h-3.5 ${selected ? 'text-g-gold animate-bounce' : 'text-zinc-500'}`} />
                              {hack.name}
                            </span>
                            {!selected && (
                              <span className="text-[10px] font-serif font-bold text-g-gold bg-amber-950/40 px-2 py-0.5 rounded">
                                {hack.cost} EA
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-455 leading-relaxed mb-6 font-serif">
                            {hack.desc}
                          </p>
                        </div>

                        <div>
                          {selected ? (
                            <button
                              onClick={() => togglePreloadHack(hack.id, 0)}
                              onMouseEnter={() => sfx.playHover()}
                              className="w-full py-2 bg-red-950/20 hover:bg-red-950/50 border border-red-900/40 text-red-100 hover:text-red-300 text-[10px] font-serif font-bold uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              REMOVER DO GRIMÓRIO
                            </button>
                          ) : (
                            <button
                              onClick={() => togglePreloadHack(hack.id, hack.cost)}
                              disabled={!selected && (!canBuy || maxReached)}
                              onMouseEnter={() => sfx.playHover()}
                              className={`w-full py-2 rounded-lg font-serif text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                                canBuy && !maxReached
                                  ? 'bg-g-gold hover:bg-yellow-400 text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                                  : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              {maxReached ? 'LIMITADO A 2 SLOTS' : 'CARREGAR NO GRIMÓRIO'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Void blueprints research */}
            {activeTab === 'void' && (
              <motion.div
                key="void"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[
                  { id: 'void_grave_shard', name: 'Freador de Pobreza: Shard Tombal', description: 'Pesquise este blueprint para desbloquear Shard Tombal! Ele se alimenta do ouro dreno, mas concede chance de re-ascensão das almas.', cost: 100 },
                  { id: 'void_singularity_eye', name: 'Freador de Sincronia: Lente Singular', description: 'Modulação de frequência que adiciona o Olho da Singularidade à mesa. Suplica por combos de 6, deitando de forma selvagem os dados.', cost: 120 },
                  { id: 'void_null_protocol', name: 'Pesquisa Neutra: Protocolo Nulo', description: 'Enche o Bazaar com sementes de nulo adicionais para reduzir as restrições mais agressivas.', cost: 120 },
                ].map(item => {
                  const blueprints = upgrades.unlockedBlueprints || [];
                  const researched = blueprints.includes(item.id);
                  const canBuy = shards >= item.cost;

                  return (
                    <div 
                      key={`${item.id}`} 
                      className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                        researched 
                          ? 'bg-purple-950/5 border-purple-500/20' 
                          : 'bg-zinc-950/30 border-zinc-900 hover:border-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900/40">
                          <h3 className="text-sm font-bold font-serif text-white tracking-wide">
                            {item.name}
                          </h3>
                          {!researched && (
                            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded">
                              {item.cost} EQ
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                          {item.description}
                        </p>
                      </div>

                      <div>
                        {researched ? (
                          <span className="w-full py-2 bg-emerald-950/10 border border-emerald-900/40 text-emerald-400 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400" /> PROJETO CONCLUÍDO
                          </span>
                        ) : (
                          <button
                            onClick={() => buyVoidBlueprint(item.id, item.cost)}
                            disabled={!canBuy}
                            onMouseEnter={() => sfx.playHover()}
                            className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                              canBuy 
                                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                                : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                          >
                            <Lock className="w-4 h-4" /> PESQUISAR BLUEPRINT
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* History of Victories tab */}
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <HistoryVictoriesD3 />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
