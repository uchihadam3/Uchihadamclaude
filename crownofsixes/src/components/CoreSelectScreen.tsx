import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/sound';
import { Cpu, Zap, Eye, Coins } from 'lucide-react';
import { RunCore } from '../types/game';

const CORES: Array<{ id: RunCore, name: string, desc: string, icon: any, color: string }> = [
  {
    id: 'standard',
    name: 'Núcleo Padrão',
    desc: 'Sem vantagens ou desvantagens iniciais. Configuração limpa.',
    icon: Cpu,
    color: 'text-zinc-400'
  },
  {
    id: 'alchemist',
    name: 'Núcleo Alquimista',
    desc: 'Ganha +0.5 de Multiplicador por cada par idêntico jogado. Especialista em conversões de materiais.',
    icon: Zap,
    color: 'text-[#4ade80]'
  },
  {
    id: 'void_cultist',
    name: 'Núcleo do Vazio',
    desc: 'Inicia a run com um dado Corrompido (+50 Corrupção). Alta sinergia com relíquias do Vazio.',
    icon: Eye,
    color: 'text-purple-500'
  },
  {
    id: 'gambler',
    name: 'Núcleo do Apostador',
    desc: 'Gênio do dinheiro. Inicia com dois dados de Ouro ($$), focado num rápido crescimento financeiro.',
    icon: Coins,
    color: 'text-g-gold'
  }
];

export const CoreSelectScreen = () => {
  const { dispatch } = useGame();
  const [selected, setSelected] = useState<RunCore>('standard');

  const handleStart = () => {
    sfx.playPowerup();
    dispatch({ type: 'CHOOSE_CORE', core: selected });
  };

  return (
    <div className="absolute inset-0 bg-g-bg flex flex-col items-center justify-center p-8 z-50 overflow-hidden text-white font-sans">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0f] to-black opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center mb-12"
      >
        <span className="text-xl font-mono text-zinc-500 mb-2 uppercase tracking-[0.3em]">Inicialização do Sistema</span>
        <h1 className="text-5xl md:text-6xl font-black font-serif tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          Escolha o Núcleo
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 w-full max-w-6xl">
        {CORES.map((core, i) => {
          const isSelected = selected === core.id;
          const Icon = core.icon;
          return (
            <motion.button
              key={core.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                sfx.playClick();
                setSelected(core.id);
              }}
              className={`p-6 rounded-2xl border bg-black/60 backdrop-blur-md transition-all duration-300 text-left flex flex-col items-start cursor-pointer hover:bg-zinc-900 ${
                isSelected ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-2 ring-white/50' : 'border-zinc-800 hover:border-zinc-600'
              }`}
            >
              <div className={`p-3 rounded-xl bg-zinc-900 mb-4 ${core.color}`}>
                 <Icon className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold font-mono uppercase mb-2 text-white">{core.name}</h2>
              <p className="text-sm text-zinc-400 font-mono leading-relaxed">{core.desc}</p>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onClick={handleStart}
        className="mt-12 relative z-10 px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-lg rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
      >
        Injetar Sistema
      </motion.button>
    </div>
  );
};
