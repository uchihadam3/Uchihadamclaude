import { useState } from 'react';
import type { JSX } from 'react';
import {
  Store, go, startRun, requestUpgrade, upgradePotion, skillUpgradeCost, equipUpgradeCost, potionUpgradeCost,
  DUNGEONS, SKILLS_BY_HERO, EQUIPS_BY_HERO, POTION_LEVELS,
} from '../game/store';
import { EQUIP_MILESTONES, SKILL_MILESTONES } from '../data/equipmentData';
import { MUTATIONS_BY_SKILL, EVOLUTIONS_BY_SKILL } from '../data/upgradePools';
import { fmtTime, Glyph, HeroPortrait, useStore } from './bits';
import { HERO_BY_ID } from '../data/heroesData';

type Tab = 'dungeons' | 'skills' | 'equip' | 'potion';

export function Hub(): JSX.Element {
  useStore();
  const [tab, setTab] = useState<Tab>('dungeons');
  const heroId = Store.heroId!;
  const hero = HERO_BY_ID[heroId];
  const prog = Store.heroProg(heroId);

  return (
    <div className="screen">
      <div className="topbar">
        <button className="btn ghost sm" onClick={() => go('heroSelect')}>‹ Heróis</button>
        <b style={{ color: hero.palette.glow }}>{hero.nome}</b>
        <span className="tiny grow">{hero.titulo}</span>
        <span className="pill"><Glyph icon="p-refill" size={16} color="#e8c040" />{prog.essence} essência</span>
        <span className="pill" title="Runas de Reescolha"><Glyph icon="c-reset" size={16} color="#4a9ef0" />{Store.save.rerollRunes}</span>
        <span className="pill" title="Selos de Escolha"><Glyph icon="c-crit" size={16} color="#b46ef0" />{Store.save.choiceSeals}</span>
      </div>

      <div className="hub-body">
        <div className="hub-side">
          <div className="hub-portrait">
            <HeroPortrait heroId={heroId} size={190} />
            <b>{hero.nome}</b>
            <div className="tiny" style={{ textAlign: 'center' }}>{hero.funcao}</div>
          </div>
          <div className="card-tile scroll" style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.5 }}>
            <b style={{ color: 'var(--ink)' }}>Estilo</b><br />{hero.estilo}
          </div>
        </div>

        <div className="hub-main">
          <div className="tabs">
            <button className={'tab' + (tab === 'dungeons' ? ' active' : '')} onClick={() => setTab('dungeons')}>Dungeons</button>
            <button className={'tab' + (tab === 'skills' ? ' active' : '')} onClick={() => setTab('skills')}>Habilidades</button>
            <button className={'tab' + (tab === 'equip' ? ' active' : '')} onClick={() => setTab('equip')}>Equipamentos</button>
            <button className={'tab' + (tab === 'potion' ? ' active' : '')} onClick={() => setTab('potion')}>Poção</button>
          </div>
          <div className="scroll grow" style={{ paddingRight: 4 }}>
            {tab === 'dungeons' && <Dungeons />}
            {tab === 'skills' && <Skills />}
            {tab === 'equip' && <Equipment />}
            {tab === 'potion' && <Potion />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dungeons(): JSX.Element {
  const heroId = Store.heroId!; const prog = Store.heroProg(heroId);
  return (
    <div className="dungeon-list">
      {DUNGEONS.map((d) => {
        const locked = d.id > prog.maxDungeon;
        const wins = prog.wins[d.id - 1];
        const best = prog.bestTimes[d.id];
        return (
          <div key={d.id} className={'dungeon-row' + (locked ? ' locked' : wins > 0 ? ' cleared' : '')}>
            <div className="dungeon-num" style={{ color: d.ambient.glow }}>{d.id}</div>
            <div className="grow">
              <div className="row between">
                <b>{d.nome}</b>
                <span className="mult-badge">×{d.multiplier} perigo</span>
              </div>
              <div className="tiny">{d.tema}</div>
              <div className="tiny" style={{ marginTop: 3, color: 'var(--faint)' }}>
                {wins > 0 ? `Vitórias: ${wins}` : 'Nunca conquistada'}{best ? ` · Melhor: ${fmtTime(best)}` : ''}
              </div>
            </div>
            {locked
              ? <span className="pill" style={{ opacity: .8 }}>Bloqueada</span>
              : <button className="btn primary sm" onClick={() => startRun(d.id)}>Entrar</button>}
          </div>
        );
      })}
    </div>
  );
}

function Skills(): JSX.Element {
  const heroId = Store.heroId!; const prog = Store.heroProg(heroId);
  const defs = SKILLS_BY_HERO[heroId];
  return (
    <div className="up-list">
      {defs.map((def) => {
        const s = prog.skills[def.id]; const cost = skillUpgradeCost(def.id);
        const canBuy = cost != null && prog.essence >= cost;
        const nextLv = s.level + 1;
        const nextMile = nextLv === SKILL_MILESTONES.mutation ? 'Mutação' : nextLv === SKILL_MILESTONES.evolution ? 'Evolução' : null;
        const morphName = s.evolution ? EVOLUTIONS_BY_SKILL[def.id]?.find((m) => m.id === s.evolution)?.nome
          : s.mutation ? MUTATIONS_BY_SKILL[def.id]?.find((m) => m.id === s.mutation)?.nome : null;
        return (
          <div className="up-row" key={def.id}>
            <div className="up-icon"><Glyph icon={def.icon} size={26} color={HERO_BY_ID[heroId].palette.accent} /></div>
            <div className="grow">
              <div className="row between">
                <b>{def.nome} <span className="tiny">Nv {s.level}/10</span></b>
                {morphName && <span className="milestone">◆ {morphName}</span>}
              </div>
              <div className="tiny">{def.desc}</div>
              <div className="lvl-bar"><div className="lvl-fill" style={{ width: `${s.level * 10}%` }} /></div>
              {s.cards.length > 0 && <div className="tiny" style={{ marginTop: 3, color: 'var(--faint)' }}>Cartas: {s.cards.slice(-3).map((c) => c.nome).join(', ')}{s.cards.length > 3 ? '…' : ''}</div>}
            </div>
            <div className="col" style={{ alignItems: 'flex-end', gap: 4 }}>
              {cost == null ? <span className="pill">Máx</span> : (
                <>
                  {nextMile && <span className="milestone">{nextMile}!</span>}
                  <button className="btn sm" disabled={!canBuy} onClick={() => requestUpgrade('skill', def.id)}>▲ {cost}</button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const SLOT_NAME: Record<string, string> = { cabeca: 'Cabeça', corpo: 'Corpo', arma: 'Arma', botas: 'Botas', amuleto: 'Amuleto', anel: 'Anel' };

function Equipment(): JSX.Element {
  const heroId = Store.heroId!; const prog = Store.heroProg(heroId);
  const defs = EQUIPS_BY_HERO[heroId];
  return (
    <div className="up-list">
      {defs.map((def) => {
        const e = prog.equips[def.id]; const cost = equipUpgradeCost(def.id);
        const canBuy = cost != null && prog.essence >= cost;
        const nextLv = e.level + 1;
        const nextMile = EQUIP_MILESTONES.includes(nextLv);
        return (
          <div className="up-row" key={def.id}>
            <div className="up-icon"><Glyph icon={def.icon} size={26} color="#88b8e8" /></div>
            <div className="grow">
              <div className="row between">
                <b>{def.nome} <span className="tiny">{SLOT_NAME[def.slot]} · Nv {e.level}/20</span></b>
                {e.procs.length > 0 && <span className="milestone">◆ {e.procs.length} efeito(s)</span>}
              </div>
              <div className="tiny">{def.desc}</div>
              <div className="lvl-bar"><div className="lvl-fill" style={{ width: `${e.level * 5}%` }} /></div>
              {e.procs.length > 0 && <div className="tiny" style={{ marginTop: 3, color: 'var(--green)' }}>{e.procs[e.procs.length - 1].desc}</div>}
            </div>
            <div className="col" style={{ alignItems: 'flex-end', gap: 4 }}>
              {cost == null ? <span className="pill">Máx</span> : (
                <>
                  {nextMile && <span className="milestone">Efeito!</span>}
                  <button className="btn sm" disabled={!canBuy} onClick={() => requestUpgrade('equip', def.id)}>▲ {cost}</button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Potion(): JSX.Element {
  const heroId = Store.heroId!; const prog = Store.heroProg(heroId);
  const cost = potionUpgradeCost();
  const canBuy = cost != null && prog.essence >= cost;
  const cur = POTION_LEVELS[prog.potionLevel - 1];
  return (
    <div className="col" style={{ gap: 12 }}>
      <div className="card-tile">
        <div className="row between">
          <b>Poção de Cura — Nível {prog.potionLevel}/5</b>
          <span className="pill"><Glyph icon="p-heal" size={16} color="#ff88a8" />{cur.charges} cargas</span>
        </div>
        <div className="lvl-bar" style={{ marginTop: 8 }}><div className="lvl-fill" style={{ width: `${prog.potionLevel * 20}%` }} /></div>
        <p className="sub" style={{ marginTop: 8 }}>{cur.desc}</p>
        <p className="tiny">A poção é usada automaticamente quando a vida fica baixa durante a expedição.</p>
      </div>
      {cost == null
        ? <div className="pill center">Poção no nível máximo</div>
        : <div className="card-tile row between">
          <div>
            <b>Próximo nível</b>
            <div className="tiny">{POTION_LEVELS[prog.potionLevel].desc}</div>
          </div>
          <button className="btn gold" disabled={!canBuy} onClick={upgradePotion}>Evoluir · {cost}</button>
        </div>}
    </div>
  );
}
