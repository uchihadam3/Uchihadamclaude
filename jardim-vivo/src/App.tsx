import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { G, initGame, notify } from './game/gameState';
import { startLoop } from './game/gameLoop';
import { hasSave, loadGame, saveGame, resetGame } from './game/saveSystem';
import { toasts, dismissToast } from './game/progressSystems';
import { startAudio, setVolumes, setSeasonMusic } from './audio/audioEngine';
import { useGame } from './ui/useGame';
import { GardenScreen } from './ui/GardenScreen';
import { ShopsScreen, InventoryScreen, PlantapediaScreen, CalendarScreen } from './ui/screens1';
import { QuestsScreen, NpcsScreen, CompetitionsScreen, BenchScreen, ArrangementsScreen, AreasScreen, HarmonyScreen, JournalScreen, SettingsScreen, MoreScreen } from './ui/screens2';
import { Btn, Icon } from './ui/components';
import { tr, t, lang } from './i18n';
import './ui/styles.css';

// ============ TUTORIAL ============
const TUTORIAL_STEPS: { title: { pt: string; en: string }; body: { pt: string; en: string } }[] = [
  {
    title: { pt: 'Bem-vindo ao Jardim Vivo!', en: 'Welcome to the Living Garden!' },
    body: { pt: 'Este quintal abandonado é seu agora. Toque nos montes de entulho para limpá-los e abrir espaço.', en: 'This abandoned yard is yours now. Tap the debris piles to clear them and make room.' },
  },
  {
    title: { pt: 'Plante a primeira semente', en: 'Plant your first seed' },
    body: { pt: 'Toque num espaço vazio e escolha "Plantar aqui". Você tem sementes de girassol: elas amam SOL PLENO (os tiles mais claros).', en: 'Tap an empty tile and choose "Plant here". You have sunflower seeds: they love FULL SUN (the brighter tiles).' },
  },
  {
    title: { pt: 'A água é vida (na medida)', en: 'Water is life (in measure)' },
    body: { pt: 'Toque numa planta para ver a ficha dela. A gotinha azul flutuando avisa quando ela tem sede. Água demais também mata!', en: 'Tap a plant to open its sheet. The floating blue drop warns when it\'s thirsty. Too much water kills too!' },
  },
  {
    title: { pt: 'O tempo passa', en: 'Time passes' },
    body: { pt: 'Um dia dura ~30 minutos, com calma. Sem pressa? Acelere no botão ×1/×4/×12 no canto superior. Plantas crescem por DIA, com fases visíveis: broto, muda, adulta, flor.', en: 'One day lasts ~30 unhurried minutes. In a rush? Speed up with the ×1/×4/×12 button up top. Plants grow per DAY through visible stages: sprout, seedling, adult, bloom.' },
  },
  {
    title: { pt: 'Aprenda com os vizinhos', en: 'Learn from the neighbors' },
    body: { pt: 'Dona Rosa e os outros dão missões, ensinam segredos e desbloqueiam novas áreas. Vá em "Vizinhos" e converse!', en: 'Mrs. Rosa and the others give quests, teach secrets and unlock new areas. Open "Neighbors" and talk!' },
  },
  {
    title: { pt: 'Seu jardim, sua história', en: 'Your garden, your story' },
    body: { pt: 'Venda flores, vença competições, colecione as 321 espécies da Plantapédia e transforme tudo isto num Jardim Vivo. Boa jardinagem!', en: 'Sell flowers, win competitions, collect all 321 Plantapedia species and turn this into a Living Garden. Happy gardening!' },
  },
];

function TutorialBox(): JSX.Element | null {
  useGame();
  if (!G || G.tutorial.dismissed) return null;
  const step = TUTORIAL_STEPS[G.tutorial.step];
  if (!step) return null;
  return (
    <div className="tutorial-box">
      <h4>{tr(step.title)} ({G.tutorial.step + 1}/{TUTORIAL_STEPS.length})</h4>
      <p>{tr(step.body)}</p>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        <Btn small kind="ghost" onClick={() => { G.tutorial.dismissed = true; notify(); }}>{t('skip')}</Btn>
        <Btn small onClick={() => {
          G.tutorial.step++;
          if (G.tutorial.step >= TUTORIAL_STEPS.length) G.tutorial.dismissed = true;
          notify();
        }}>{t('next')}</Btn>
      </div>
    </div>
  );
}

// ============ TOASTS ============
function Toasts(): JSX.Element {
  useGame();
  return (
    <div className="toasts">
      {toasts.map((to) => (
        <div key={to.id} className={`toast ${to.kind}`} onClick={() => { dismissToast(to.id); notify(); }}>
          <Icon name={to.kind === 'achievement' ? 'trophy' : to.kind === 'bloom' ? 'flower' : to.kind === 'death' ? 'skull' : to.kind === 'warn' ? 'warn' : to.kind === 'quest' ? 'scroll' : to.kind === 'npc' ? 'people' : 'sparkle'} size={16} color="#ecdfc2" />
          {lang() === 'pt' ? to.textPT : to.textEN}
        </div>
      ))}
    </div>
  );
}

// auto-expira toasts
function useToastExpiry(): void {
  useEffect(() => {
    const iv = window.setInterval(() => {
      if (toasts.length > 0) {
        toasts.shift();
        notify();
      }
    }, 4200);
    return () => window.clearInterval(iv);
  }, []);
}

// ============ TÍTULO ============
function TitleScreen(props: { onStart: () => void }): JSX.Element {
  const [saveExists] = useState(hasSave());
  return (
    <div className="title-screen" style={{ background: 'linear-gradient(180deg, #7db3d8 0%, #a8cfa0 45%, #4f7a44 100%)' }}>
      <TitleBackdrop />
      <div className="title-logo">
        <h1>Jardim Vivo</h1>
        <p>Um simulador cozy de jardinagem botânica · 321 plantas reais</p>
      </div>
      <div className="title-buttons">
        {saveExists && (
          <Btn kind="gold" onClick={() => { startAudio(); loadGame(); props.onStart(); }}>
            <Icon name="leaf" size={17} />{t('continue')}
          </Btn>
        )}
        <Btn onClick={() => {
          startAudio();
          if (saveExists && !window.confirm('Começar um jogo novo apaga o save atual. Continuar?')) return;
          resetGame();
          saveGame();
          props.onStart();
        }}>
          <Icon name="sun" size={17} />{t('newGame')}
        </Btn>
      </div>
      <p style={{ color: 'rgba(240,248,230,0.75)', fontSize: 11.5, position: 'absolute', bottom: 12 }}>
        PC: arraste p/ mover · scroll p/ zoom — Celular: toque e arraste
      </p>
    </div>
  );
}

function TitleBackdrop(): JSX.Element {
  // silhuetas de plantas decorativas no rodapé do título
  return (
    <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '30%', pointerEvents: 'none' }} viewBox="0 0 800 200" preserveAspectRatio="xMidYMax slice">
      <g fill="#3c5e33">
        <path d="M40 200 Q45 130 40 110 Q60 125 58 155 Q75 135 72 115 Q85 140 78 170 L74 200 Z" />
        <circle cx="120" cy="120" r="26" />
        <rect x="116" y="130" width="8" height="70" />
        <path d="M200 200 Q195 120 205 90 Q215 120 210 200 Z" />
        <path d="M240 200 Q235 140 248 115 Q258 145 252 200 Z" />
        <path d="M700 200 Q690 100 710 60 Q735 95 720 200 Z" />
        <ellipse cx="760" cy="140" rx="30" ry="45" />
        <rect x="756" y="170" width="8" height="30" />
        <path d="M600 200 L600 120 Q570 110 575 80 Q605 85 605 110 Q610 70 645 75 Q640 110 610 118 L610 200 Z" />
      </g>
      <g fill="#f4c430">
        <circle cx="120" cy="120" r="14" />
      </g>
      <g fill="#5a3a1a"><circle cx="120" cy="120" r="7" /></g>
      <g fill="#c878b8">
        <circle cx="205" cy="82" r="9" /><circle cx="249" cy="108" r="7" />
      </g>
      <g fill="#e86888"><circle cx="712" cy="52" r="11" /></g>
    </svg>
  );
}

// ============ APP ============
export default function App(): JSX.Element {
  const [started, setStarted] = useState(false);
  const [screen, setScreen] = useState<string | null>(null);
  useToastExpiry();

  useEffect(() => {
    initGame();
    startLoop();
  }, []);

  useEffect(() => {
    if (started && G) {
      setVolumes(G.settings.volMaster, G.settings.volMusic, G.settings.volSfx, G.settings.volAmbient);
      setSeasonMusic(G.calendar.season);
    }
  }, [started]);

  // atualiza música por estação
  useGame();
  useEffect(() => {
    if (G) setSeasonMusic(G.calendar.season);
  });

  if (!started) return <div className="app"><TitleScreen onStart={() => setStarted(true)} /></div>;

  return (
    <div className="app">
      <GardenScreen openScreen={setScreen} />
      <Toasts />
      <TutorialBox />
      {screen === 'shops' && <ShopsScreen onClose={() => setScreen(null)} />}
      {screen === 'inventory' && <InventoryScreen onClose={() => setScreen(null)} />}
      {screen === 'plantapedia' && <PlantapediaScreen onClose={() => setScreen(null)} />}
      {screen === 'calendar' && <CalendarScreen onClose={() => setScreen(null)} />}
      {screen === 'quests' && <QuestsScreen onClose={() => setScreen(null)} />}
      {screen === 'npcs' && <NpcsScreen onClose={() => setScreen(null)} />}
      {screen === 'competitions' && <CompetitionsScreen onClose={() => setScreen(null)} />}
      {screen === 'bench' && <BenchScreen onClose={() => setScreen(null)} />}
      {screen === 'arrangements' && <ArrangementsScreen onClose={() => setScreen(null)} />}
      {screen === 'areas' && <AreasScreen onClose={() => setScreen(null)} />}
      {screen === 'harmony' && <HarmonyScreen onClose={() => setScreen(null)} />}
      {screen === 'journal' && <JournalScreen onClose={() => setScreen(null)} />}
      {screen === 'settings' && <SettingsScreen onClose={() => setScreen(null)} />}
      {screen === 'more' && <MoreScreen onClose={() => setScreen(null)} openScreen={setScreen} />}
    </div>
  );
}
