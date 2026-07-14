import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/sound';
import { Cpu, Zap, Eye, Coins, Check } from 'lucide-react';
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
    <div className="absolute inset-0 bg-g-bg flex flex-col items-center z-50 text-white font-sans">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0f] to-black opacity-80" />

      {/* Cabeçalho fixo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center text-center shrink-0 px-4 pt-5 pb-3 md:pt-10 md:pb-6"
      >
        <span className="text-[10px] md:text-xl font-mono text-zinc-500 mb-1 md:mb-2 uppercase tracking-[0.25em] md:tracking-[0.3em]">
          Inicialização do Sistema
        </span>
        <h1 className="text-3xl md:text-6xl font-black font-serif tracking-tight uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          Escolha o Núcleo
        </h1>
      </motion.div>

      {/* Área rolável dos cards */}
      <div className="relative z-10 flex-1 min-h-0 w-full overflow-y-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6 w-full max-w-6xl mx-auto pb-4">
          {CORES.map((core, i) => {
            const isSelected = selected === core.id;
            const Icon = core.icon;
            return (
              <motion.button
                key={core.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => {
                  sfx.playClick();
                  setSelected(core.id);
                }}
                className={`relative p-4 md:p-6 rounded-2xl border bg-black/60 backdrop-blur-md transition-all duration-300 text-left flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0 cursor-pointer hover:bg-zinc-900 ${
                  isSelected ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-2 ring-white/50' : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </span>
                )}
                <div className={`shrink-0 p-2.5 md:p-3 rounded-xl bg-zinc-900 lg:mb-4 ${core.color}`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <div className="min-w-0 flex-1 pr-6 lg:pr-0">
                  <h2 className="text-base md:text-xl font-bold font-mono uppercase mb-1 md:mb-2 text-white leading-tight">{core.name}</h2>
                  <p className="text-xs md:text-sm text-zinc-400 font-mono leading-snug md:leading-relaxed">{core.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Botão de confirmação — sempre visível no rodapé */}
      <div className="relative z-10 shrink-0 w-full px-4 pt-3 pb-5 md:pb-8 md:pt-4 bg-gradient-to-t from-black via-black/85 to-transparent flex justify-center">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleStart}
          className="w-full max-w-md px-8 py-4 md:py-5 bg-white text-black font-black uppercase tracking-widest text-base md:text-lg rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95"
        >
          Injetar Sistema ▸
        </motion.button>
      </div>
    </div>
  );
};
