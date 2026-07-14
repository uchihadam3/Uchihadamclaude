import React, { useEffect, useState } from 'react';
import { GameProvider, useGame } from './game/GameContext';
import { GameBoard } from './components/GameBoard';
import { ShopScreen } from './components/ShopScreen';
import { MetaMatrixLab } from './components/MetaMatrixLab';
import { CoreSelectScreen } from './components/CoreSelectScreen';
import { EventScreen } from './components/EventScreen';
import { sfx } from './utils/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Volume2, Sparkles, AlertTriangle } from 'lucide-react';

function AppContent() {
  const { state, dispatch } = useGame();
  const [decorParticles, setDecorParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  // Generate floating matrix elements on load
  useEffect(() => {
    const list = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setDecorParticles(list);
  }, []);

  const handleStartGame = () => {
    sfx.playPowerup();
    dispatch({ type: 'START_GAME' });
  };

  // Automated audio triggers on game state transitions
  useEffect(() => {
    if (state.status === 'boss_intro') {
      sfx.playUnstable();
    } else if (state.status === 'gameover') {
      sfx.playUnstable();
    } else if (state.status === 'victory') {
      sfx.playWin();
    }
  }, [state.status]);

  if (state.status === 'publisher') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden cursor-pointer" onClick={() => dispatch({ type: 'SHOW_INTRO' })}>
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }}
           transition={{ duration: 4, times: [0, 0.2, 0.8, 1] }}
           onAnimationComplete={() => dispatch({ type: 'SHOW_INTRO' })}
           className="flex flex-col items-center justify-center gap-6"
        >
          <div className="w-24 h-24 mb-4 opacity-80 mix-blend-screen relative">
             <motion.svg 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
               viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
               className="w-full h-full"
             >
                <path d="M50 10L90 30V70L50 90L10 70V30L50 10Z" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" stroke="zinc-500" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="white" />
             </motion.svg>
          </div>
          <h2 className="text-white text-3xl font-serif tracking-[0.5em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Voidforge
          </h2>
          <p className="text-zinc-600 text-[10px] tracking-widest font-mono uppercase">Interactive Calibration</p>
        </motion.div>
      </div>
    );
  }

  if (state.status === 'intro') {
    return (
       <div className="min-h-screen bg-[#020202] relative flex flex-col items-center justify-center p-6 text-center overflow-hidden cursor-pointer" onClick={() => { sfx.playClick(); dispatch({ type: 'SHOW_LORE' }); }}>
          {/* Subtle noise and scanlines */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="z-20 max-w-2xl flex flex-col items-center"
          >
             <h1 className="text-5xl md:text-8xl font-serif font-black text-g-gold tracking-[0.2em] uppercase mb-4 drop-shadow-[0_2px_15px_rgba(212,175,55,0.45)]">
                INVOCAÇÃO
             </h1>
             <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-12" />
             
             <motion.div
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               className="px-6 py-3 border border-g-gold/30 bg-g-panel/50 rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm"
             >
                 <span className="w-2 h-2 rounded-full bg-g-gold shadow-[0_0_10px_#d4af37]" />
                 <p className="text-g-text font-serif tracking-[0.3em] font-medium text-xs">
                    CLIQUE PARA INICIAR O RITO
                 </p>
             </motion.div>
          </motion.div>
       </div>
    );
  }

  if (state.status === 'lore') {
    return (
       <div className="min-h-screen bg-[#020202] relative flex flex-col items-center justify-center p-6 sm:p-12 text-center md:text-left overflow-hidden cursor-pointer" onClick={() => { sfx.playClick(); dispatch({ type: 'SHOW_MENU' }); }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,10,10,0.1)_0%,rgba(2,2,2,1)_80%)] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="z-20 max-w-3xl w-full bg-black/80 border border-zinc-900 border-l-red-900/60 p-8 md:p-12 rounded-xl shadow-[20px_0_40px_rgba(255,0,0,0.03)] backdrop-blur-md relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-900 to-transparent opacity-50" />
            <p className="text-g-muted font-serif text-[10px] uppercase tracking-[0.4em] mb-8 pb-4 border-b border-g-border/40 flex items-center justify-between font-bold">
              <span>Manuscrito Sacro: Tomo VII</span>
              <span>Origem: Desconhecida</span>
            </p>
            <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.8, duration: 2 }}
               className="text-g-text font-serif text-xl md:text-3xl leading-relaxed mb-8 font-light italic"
            >
               "Nós achávamos que os dados eram meros artefatos do acaso. Estávamos errados. Eles eram chaves de poder."
            </motion.p>
            <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 3, duration: 2 }}
               className="text-g-muted font-serif text-base md:text-lg leading-relaxed mb-12"
            >
               Cada jogada molda os fios do destino. Muitas alinhadas ao caos, e o <span className="text-g-red font-black">Abismo</span> se libertará. Você deve encontrar o equilíbrio e consagrar as runas.
            </motion.p>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 5.5, duration: 1.5 }}
               className="flex justify-start pt-6 border-t border-g-border/30"
            >
               <span className="text-g-muted font-serif text-[10px] tracking-widest uppercase flex items-center gap-3 font-bold">
                 <span className="w-1.5 h-1.5 bg-g-red rounded-full animate-pulse shadow-[0_0_8px_#8b0000]" />
                 Aguardando consagração do rito... clique para prosseguir
               </span>
            </motion.div>
          </motion.div>
       </div>
    );
  }

  if (state.status === 'menu') {
    return (
      <div className="min-h-screen bg-g-bg relative flex flex-col items-center overflow-y-auto p-4 md:p-6 text-center">
        {/* Futuristic Retro Moving Grid Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,rgba(10,10,12,0.95)_75%)] pointer-events-none z-0" />
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 bg-repeat"
          style={{
            backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "perspective(500px) rotateX(60deg) translateY(-30%)"
          }}
        />

        {/* Floating golden cyber particles */}
        {decorParticles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: [0, 0.4, 0.4, 0], y: "-10%" }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: '#d4af37',
              boxShadow: '0 0 10px #d4af37',
              borderRadius: '50%',
              zIndex: 1
            }}
          />
        ))}

        {/* Scanline CRT overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] text-g-muted font-serif tracking-widest z-1 position-absolute select-none font-bold">
          <Volume2 className="w-4 h-4 text-g-gold animate-bounce" />
          ALAÚDE DOS ANCIÕES ATIVO
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 my-auto w-full max-w-xl bg-g-panel/30 border border-g-border/60 hover:border-g-gold/30 p-6 md:p-14 rounded-3xl backdrop-blur-md shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(212,175,55,0.02)] transition-colors relative"
        >
          {/* Top glowing gem visual crown */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="p-1 border border-g-gold/40 rounded-full flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <div className="w-14 h-14 rounded-full border border-dashed border-g-gold/60 flex items-center justify-center bg-black">
                <Sparkles className="w-6 h-6 text-g-gold animate-pulse" />
              </div>
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif italic tracking-widest text-g-gold uppercase mb-4 drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] font-bold">
            Crown of Sixes
          </h1>

          <div className="flex justify-center gap-1.5 mt-1 mb-6 md:mb-8">
            <div className="h-[3px] w-12 bg-g-gold shadow-[0_0_10px_#d4af37]"></div>
            <div className="h-[3px] w-12 bg-g-gold shadow-[0_0_10px_#d4af37]"></div>
            <div className="h-[3px] w-12 bg-g-gold shadow-[0_0_10px_#d4af37]"></div>
            <div className="h-[3px] w-12 bg-zinc-800"></div>
            <div className="h-[3px] w-12 bg-zinc-800"></div>
          </div>

          <p className="text-[11px] md:text-sm text-g-muted max-w-sm mx-auto mb-6 md:mb-10 tracking-[0.2em] md:tracking-[0.25em] leading-relaxed select-none font-serif font-black uppercase text-center">
            Manipule dados antigos. Erga multiplicadores arcanos. Domine o caos antes que ele consuma sua alma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.45)" }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => sfx.playHover()}
              onClick={handleStartGame}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-g-gold text-black font-serif font-black text-base md:text-lg uppercase tracking-widest hover:bg-white transition-colors cursor-pointer border border-transparent rounded-xl"
            >
              Iniciar Caminhada ⚔️
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,0,0,0.45)" }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playPowerup();
                dispatch({ type: 'ENTER_META_LAB' });
              }}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-g-red to-[#5c0000] hover:brightness-110 text-white font-serif font-black text-base md:text-lg uppercase tracking-widest hover:border-g-gold transition-all cursor-pointer border border-g-border rounded-xl shadow-[0_0_20px_rgba(139,0,0,0.3)]"
            >
              Altar Alquímico 🏛️
            </motion.button>
          </div>

          {/* Quick Dice Set Selection in Main Menu */}
          {state.unlockedDiceSets && state.unlockedDiceSets.length > 1 && (
            <div className="mt-8 border-t border-zinc-800/20 pt-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">Conjunto de Dados</span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {[
                  { id: 'default', name: 'Original' },
                  { id: 'synthwave', name: 'Taverna' },
                  { id: 'cyberpunk', name: 'Forjado' },
                  { id: 'alchemist', name: 'Alquimista' },
                  { id: 'cosmic', name: 'Abissal' }
                ].map(set => {
                  const isUnlocked = state.unlockedDiceSets.includes(set.id);
                  if (!isUnlocked) return null;
                  const isSelected = state.selectedDiceSet === set.id;
                  return (
                    <button
                      key={set.id}
                      onClick={() => {
                        sfx.playClick();
                        dispatch({ type: 'SELECT_DICE_SET', id: set.id });
                      }}
                      className={`px-4 py-2 rounded-xl border text-[11px] font-black uppercase tracking-wider font-mono transition-all cursor-pointer ${isSelected ? 'bg-g-gold text-black border-g-gold shadow-md' : 'bg-transparent text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-500'}`}
                    >
                      {set.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  if (state.status === 'meta_lab') {
    return <MetaMatrixLab />;
  }

  return (
    <div className="w-full h-screen bg-[#0a0c10] text-g-text font-sans overflow-hidden flex flex-col">
      <div className="w-full h-full flex flex-col">
        <GameBoard />
      </div>

      {state.status === 'core_select' && <CoreSelectScreen />}
      {state.status === 'event' && <EventScreen />}
      {state.status === 'shop' && <ShopScreen />}
      
      {state.status === 'boss_intro' && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md z-50 p-6 shadow-[inset_0_0_150px_rgba(255,0,0,0.4)]">
            {/* Dark scanlines CRT */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
            <motion.div
               initial={{ opacity: 0, scale: 0.8, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="text-center z-20"
            >
                <Skull className="w-32 h-32 text-g-red mx-auto mb-8 animate-pulse drop-shadow-[0_0_30px_#ff3e3e]" />
                <h2 className="text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.4)]">
                   {state.bossPhase === 'the_void' ? 'THE VOID' : 
                    state.bossPhase === 'the_wall' ? 'THE WALL' : 'THE CHAINS'}
                </h2>
                <p className="text-g-red text-2xl mb-12 font-serif italic max-w-lg mx-auto">
                   {state.bossPhase === 'the_void' ? '1s subtract points instead of adding.' : 
                    state.bossPhase === 'the_wall' ? 'Max 2 rolls per round.' : 'Dice cannot be locked.'}
                </p>
                <button
                   onMouseEnter={() => sfx.playHover()}
                   onClick={() => {
                     sfx.playPowerup();
                     dispatch({ type: 'START_BOSS' });
                   }}
                   className="px-12 py-5 bg-g-red text-black rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,0,0,0.5)] cursor-pointer"
                >
                   Face the Boss 🔥
                </button>
            </motion.div>
         </div>
      )}
       {state.status === 'gameover' && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-g-bg/95 backdrop-blur-md z-50 p-6 shadow-[inset_0_0_100px_rgba(255,62,62,0.2)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
            <div className="z-20 text-center">
              <Skull className="w-24 h-24 text-g-red mx-auto mb-8 animate-bounce" />
              <h2 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">CORRUPTED</h2>
              <p className="text-g-muted text-xl mb-4 font-serif italic">You failed to meet the target score of {state.targetScore}.</p>
              <p className="text-g-red mb-4 font-mono text-xl tracking-wider">FINAL SCORE: {state.totalScore}</p>
              
              <div className="mb-10 p-5 border border-purple-500/30 rounded-2xl bg-purple-950/25 max-w-sm mx-auto">
                 <p className="text-purple-400 font-mono text-[10px] uppercase tracking-widest mb-1">Rendimento de Run</p>
                 <p className="text-white text-lg font-black font-mono">+{Math.floor(state.totalScore / 120) + state.gold} Estilhaços Quânticos</p>
                 <p className="text-[9px] text-zinc-500 font-mono mt-1">Saldo Total Armazenado: {state.metaShards || 0} EQ</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => {
                      sfx.playPowerup();
                      dispatch({ type: 'START_GAME' });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-g-border hover:border-g-red hover:bg-[#1a1b21] hover:text-white rounded-xl font-bold uppercase tracking-widest text-g-muted transition-colors cursor-pointer"
                 >
                    Try Again 🎲
                 </button>
                 <button
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => {
                      sfx.playPowerup();
                      dispatch({ type: 'ENTER_META_LAB' });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-800 to-indigo-800 border bg-purple-950 hover:brightness-110 text-white rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                 >
                    Meta-Lab 🧬
                 </button>
              </div>
            </div>
         </div>
      )}
  
      {state.status === 'victory' && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-g-bg/95 backdrop-blur-md z-50 p-6 shadow-[inset_0_0_100px_rgba(212,175,55,0.2)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
            <div className="z-20 text-center">
              <h2 className="text-6xl font-black text-g-gold mb-4 tracking-tighter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">ASCENDED</h2>
              <p className="text-white text-xl mb-4 font-serif italic">You have mastered the Crown of Sixes.</p>
              <p className="text-g-gold mb-4 font-mono text-xl tracking-wider">FINAL SCORE: {state.totalScore}</p>
              
              <div className="mb-10 p-5 border border-purple-500/30 rounded-2xl bg-purple-950/25 max-w-sm mx-auto">
                 <p className="text-purple-300 font-mono text-[10px] uppercase tracking-widest mb-1">Rendimento de Run</p>
                 <p className="text-white text-lg font-black font-mono">+{Math.floor(state.totalScore / 120) + state.gold + 150} Estilhaços Quânticos</p>
                 <p className="text-[9px] text-zinc-400 font-mono mt-1">Inclusive Bônus de Vitória (+150 EQ)</p>
                 <p className="text-[9px] text-zinc-500 font-mono mt-1">Saldo Total Armazenado: {state.metaShards || 0} EQ</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => {
                      sfx.playPowerup();
                      dispatch({ type: 'START_GAME' });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-g-gold text-g-gold hover:bg-g-gold hover:text-black rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                 >
                    Play Again 🏆
                 </button>
                 <button
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => {
                      sfx.playPowerup();
                      dispatch({ type: 'ENTER_META_LAB' });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-800 to-indigo-800 border bg-purple-950 hover:brightness-110 text-white rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                 >
                    Meta-Lab 🧬
                 </button>
              </div>
            </div>
         </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
