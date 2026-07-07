import { useEffect } from 'react';
import type { JSX } from 'react';
import type { UpgradeCard } from '../types';
import {
  Store, go, selectHero, initAudioFromSave, pickCard, rerollOffer, sealOffer, cancelOffer,
} from '../game/store';
import { RARITY_COLOR, RARITY_GLOW, RARITY_LABEL } from '../game/cardGenerator';
import { HEROES, HERO_BY_ID } from '../data/heroesData';
import { CoreLogo, Glyph, HeroPortrait, useStore } from './bits';
import { RunScreen } from './RunScreen';
import { Hub } from './Hub';
import { Report, Bestiary, Achievements, Settings, Help } from './Screens';
import { resumeAudio, playMusic } from '../game/audio';

export function App(): JSX.Element {
  useStore();
  useEffect(() => { initAudioFromSave(); const h = () => resumeAudio(); window.addEventListener('pointerdown', h, { once: true }); return () => window.removeEventListener('pointerdown', h); }, []);
  const screen = Store.screen;
  return (
    <div className="app" onPointerDown={() => resumeAudio()}>
      {screen === 'title' && <Title />}
      {screen === 'heroSelect' && <HeroSelect />}
      {screen === 'hub' && <Hub />}
      {screen === 'run' && <RunScreen />}
      {screen === 'report' && <Report />}
      {screen === 'bestiary' && <Bestiary />}
      {screen === 'achievements' && <Achievements />}
      {screen === 'settings' && <Settings />}
      {screen === 'help' && <Help />}
      {Store.offer && <OfferOverlay />}
      {Store.toast && <div className={'toast ' + Store.toast.kind}>{Store.toast.msg}</div>}
    </div>
  );
}

function Title(): JSX.Element {
  useEffect(() => { playMusic(0); }, []);
  return (
    <div className="screen">
      <div className="title-hero">
        <div className="title-core"><CoreLogo size={130} /></div>
        <h1 className="h-title">Dungeon Core Heroes</h1>
        <p className="sub" style={{ maxWidth: 460 }}>Escolha seu herói, forje seu poder e observe cada expedição se desenrolar. A dungeon não perdoa — mas o Coração espera.</p>
        <div className="menu-col">
          <button className="btn primary" onClick={() => { resumeAudio(); go('heroSelect'); }}>Jogar</button>
          <button className="btn" onClick={() => go('achievements')}>Conquistas</button>
          <button className="btn" onClick={() => go('bestiary')}>Bestiário</button>
          <button className="btn" onClick={() => go('settings')}>Ajustes</button>
          <button className="btn ghost" onClick={() => go('help')}>Como jogar</button>
        </div>
        <div className="tiny" style={{ position: 'absolute', bottom: 10 }}>Progresso salvo automaticamente neste navegador.</div>
      </div>
    </div>
  );
}

function HeroSelect(): JSX.Element {
  return (
    <div className="screen">
      <div className="topbar">
        <button className="btn ghost sm" onClick={() => go('title')}>‹ Menu</button>
        <b className="grow">Escolha seu Herói</b>
        <span className="pill"><Glyph icon="p-refill" size={16} color="#e8c040" />{Store.save.globalEssence} total</span>
      </div>
      <div className="scroll">
        <div className="hero-grid">
          {HEROES.map((h) => {
            const p = Store.heroProg(h.id);
            const cleared = p.wins.filter((w) => w > 0).length;
            return (
              <div className="hero-card" key={h.id} onClick={() => selectHero(h.id)}>
                <HeroPortrait heroId={h.id} size={120} />
                <div className="hero-name" style={{ color: h.palette.glow }}>{h.nome}</div>
                <div className="hero-role">{h.funcao}</div>
                <div className="hero-stars">{'◆'.repeat(cleared) + '◇'.repeat(Math.max(0, 10 - cleared))}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OfferOverlay(): JSX.Element {
  const o = Store.offer!;
  const title = o.isMilestone ? (o.kind === 'skill' ? 'Transformação de Habilidade' : 'Efeito de Equipamento') : 'Escolha uma Melhoria';
  return (
    <div className="overlay">
      <div className="overlay-box panel" style={{ padding: 18 }}>
        <div className="row between" style={{ marginBottom: 12 }}>
          <div>
            <h3>{title}</h3>
            <div className="tiny">Custo: {o.cost} essência · escolha 1 das 3 cartas</div>
          </div>
          <button className="btn ghost sm" onClick={cancelOffer}>Cancelar</button>
        </div>
        <div className="offer-cards">
          {o.cards.map((c) => <CardView key={c.uid} card={c} onPick={() => pickCard(c)} />)}
        </div>
        <div className="row between" style={{ marginTop: 14 }}>
          <div className="tiny">Runas: {Store.save.rerollRunes} · Selos: {Store.save.choiceSeals}</div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn sm" disabled={Store.save.rerollRunes <= 0} onClick={rerollOffer} title="Sorteia 3 novas cartas"><Glyph icon="c-reset" size={16} color="#4a9ef0" /> Reescolher</button>
            <button className="btn sm" disabled={Store.save.choiceSeals <= 0} onClick={sealOffer} title="Garante raridade elevada"><Glyph icon="c-crit" size={16} color="#b46ef0" /> Selo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardView({ card, onPick }: { card: UpgradeCard; onPick: () => void }): JSX.Element {
  const col = RARITY_COLOR[card.raridade], glow = RARITY_GLOW[card.raridade];
  return (
    <div className="up-card" style={{ borderColor: col, boxShadow: `0 0 22px ${glow}55` }} onClick={onPick}>
      <span className="rarity-tag" style={{ background: col + '22', color: col }}>{RARITY_LABEL[card.raridade]}</span>
      <div className="card-art" style={{ boxShadow: `inset 0 0 30px ${glow}33` }}><Glyph icon={card.icon} size={46} color={col} /></div>
      <div className="card-name">{card.nome}</div>
      <div className="card-desc">{card.desc}</div>
    </div>
  );
}

export { HERO_BY_ID };
