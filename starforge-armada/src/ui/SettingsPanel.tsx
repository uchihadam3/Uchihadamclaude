import type { JSX } from 'react';
import { useState } from 'react';
import { getSettings, setSetting, Settings } from '../game/settings';
import { applyAudioSettings, sfx } from '../game/audio';

function Toggle(props: { on: boolean; onClick: () => void }): JSX.Element {
  return <button className={`switch ${props.on ? 'on' : ''}`} onClick={props.onClick} aria-pressed={props.on}><span className="knob" /></button>;
}

// painel reutilizável de configurações (usado como tela e como modal na pausa)
export function SettingsPanel(props: { compact?: boolean }): JSX.Element {
  const [s, setS] = useState<Settings>(() => ({ ...getSettings() }));
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => { const ns = setSetting(k, v); setS({ ...ns }); applyAudioSettings(); };
  const flip = (k: keyof Settings) => { sfx.ui(); set(k, !s[k] as any); };

  const row = (label: string, desc: string, control: JSX.Element) => (
    <div className="set-row">
      <div className="set-text"><div className="set-label">{label}</div><div className="set-desc">{desc}</div></div>
      <div className="set-ctrl">{control}</div>
    </div>
  );

  return (
    <div className={`settings-panel ${props.compact ? 'compact' : ''}`}>
      {row('Volume', 'Volume mestre de todos os efeitos.',
        <div className="vol-ctrl">
          <input type="range" min={0} max={100} value={Math.round(s.volume * 100)}
            onChange={(e) => set('volume', Number(e.target.value) / 100)} onMouseUp={() => sfx.ui()} onTouchEnd={() => sfx.ui()} />
          <span className="vol-num">{Math.round(s.volume * 100)}</span>
        </div>)}
      {row('Silenciar', 'Corta todo o áudio do jogo.', <Toggle on={s.muted} onClick={() => flip('muted')} />)}
      {row('Tremor de tela', 'Sacode a câmera em impactos e explosões.', <Toggle on={s.shake} onClick={() => flip('shake')} />)}
      {row('Brilho (bloom)', 'Efeito de brilho premium. Desligue em aparelhos fracos.', <Toggle on={s.bloom} onClick={() => flip('bloom')} />)}
      {row('Mostrar FPS', 'Exibe os quadros por segundo no HUD.', <Toggle on={s.fps} onClick={() => flip('fps')} />)}
      {row('Realçar núcleo', 'Marca a pequena hitbox real da nave.', <Toggle on={s.hitbox} onClick={() => flip('hitbox')} />)}
    </div>
  );
}

// versão tela cheia (a partir do menu)
export function SettingsScreen(props: { onBack: () => void }): JSX.Element {
  return (
    <div className="acct">
      <div className="hangar-head">
        <button className="back-btn" onClick={() => { sfx.ui(); props.onBack(); }}>‹ Menu</button>
        <div className="hangar-title">Configurações</div>
        <div className="hangar-count">áudio & efeitos</div>
      </div>
      <div className="acct-body" style={{ maxWidth: 560 }}>
        <SettingsPanel />
      </div>
    </div>
  );
}
