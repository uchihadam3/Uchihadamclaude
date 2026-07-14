import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/sound';
import { AlertCircle, Zap, ShieldAlert, Star } from 'lucide-react';

type EventAction = 'gold' | 'blood_seal' | 'damage_dice' | 'skip';

export const EventScreen = () => {
  const { state, dispatch } = useGame();
  const [resolved, setResolved] = useState(false);
  const [resolutionText, setResolutionText] = useState('');

  // We could randomly pick from an array of anomalies. For now, let's stick to an archetypal "Mutator" event.
  const handleChoice = (action: EventAction) => {
    sfx.playPowerup();
    if (action === 'gold') {
      dispatch({ type: 'MUTATE_GOLD', amount: 25 } as any);
      setResolutionText('Você aceita o pacto mercenário. +25 Ouro.');
    } else if (action === 'blood_seal') {
       // Find first normal die and modify it
       const targetDie = state.dice.filter(d => !d.locked && !d.destroyed)[0];
       if (targetDie) {
           // We don't have an action directly for 'SEAL'. Let's use TOGGLE_LOCK for now as a placebo, or add a raw action? 
           // Better yet, I'll update GameContext to have an APPLY_SEAL action shortly!
           dispatch({ type: 'APPLY_SEAL', id: targetDie.id, seal: 'blood_seal' } as any);
           setResolutionText('Seu dado mais fraco foi banhado com um Selo de Sangue (+x1.5 Mult).');
       } else {
           setResolutionText('Nenhum dado fraco foi encontrado. O pacto falhou.');
       }
    } else if (action === 'skip') {
       setResolutionText('Você passa silenciosamente pela anomalia. Nada perturbado.');
    }
    
    setResolved(true);
  };

  const handleLeave = () => {
    sfx.playClick();
    dispatch({ type: 'LEAVE_EVENT' });
  };

  return (
    <div className="absolute inset-0 bg-g-bg flex flex-col items-center justify-center p-8 z-50 overflow-hidden text-white font-sans">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-[#0a0a0f] to-black opacity-90" />

      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="choice"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="relative z-10 flex flex-col items-center max-w-2xl text-center"
          >
            <AlertCircle className="w-16 h-16 text-amber-500 mb-6 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
            <h1 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-widest text-amber-400 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Anomalia Detectada
            </h1>
            <p className="text-lg text-zinc-300 font-mono leading-relaxed mb-10">
              Você encontra uma fenda sub-dimensional. O ar parece metálico. Sussurros pedem por um sacrifício ou oferecem fortunas perigosas. 
            </p>

            <div className="flex flex-col w-full gap-4">
               <button 
                 onClick={() => handleChoice('gold')}
                 className="p-5 border border-amber-500/30 bg-amber-950/20 rounded-xl hover:bg-amber-900/40 hover:border-amber-400 transition-all font-mono text-left flex items-center justify-between"
               >
                 <span><span className="font-bold text-amber-300">Aceitar Ouro Corrompido</span><br/><span className="text-xs text-zinc-400">Ganha +25 Ouro, mas arrisca sua bússola moral.</span></span>
                 <Zap className="w-5 h-5 text-amber-400" />
               </button>

               <button 
                 onClick={() => handleChoice('blood_seal')}
                 className="p-5 border border-red-500/30 bg-red-950/20 rounded-xl hover:bg-red-900/40 hover:border-red-400 transition-all font-mono text-left flex items-center justify-between"
               >
                 <span><span className="font-bold text-red-500">Pacto de Sangue</span><br/><span className="text-xs text-zinc-400">Aplica um [Selo de Sangue] em um dado (x1.5 Mult perene).</span></span>
                 <ShieldAlert className="w-5 h-5 text-red-500" />
               </button>

               <button 
                 onClick={() => handleChoice('skip')}
                 className="p-5 border border-zinc-700 bg-zinc-900/50 rounded-xl hover:bg-zinc-800 transition-all font-mono text-left flex items-center justify-between mt-4"
               >
                 <span className="font-bold text-zinc-300">Ignorar Anomalia</span>
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
             key="resolution"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="relative z-10 flex flex-col items-center max-w-2xl text-center"
          >
             <Star className="w-16 h-16 text-zinc-400 mb-6 animate-spin-slow" />
             <p className="text-2xl font-mono text-white mb-10 leading-relaxed font-bold tracking-widest uppercase">
               {resolutionText}
             </p>

             <button
                onClick={handleLeave}
                className="px-8 py-4 border-2 border-white text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all"
             >
                Continuar a Jornada
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
