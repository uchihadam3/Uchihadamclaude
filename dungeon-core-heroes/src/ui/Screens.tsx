import { useState } from 'react';
import type { JSX, CSSProperties } from 'react';
import {
  Store, go, startRun, setVolume, toggleLog, doExport, doImport, hardReset, toast,
  DUNGEONS, DUNGEON_BY_ID, SKILLS_BY_HERO,
} from '../game/store';
import { ENEMIES_BY_DUNGEON } from '../data/enemiesData';
import { ACHIEVEMENTS, evalAchievement } from '../game/achievements';
import { HERO_BY_ID } from '../data/heroesData';
import { EnemyThumb, fmtTime, Glyph, useStore } from './bits';

// ============ RELATÓRIO PÓS-EXPEDIÇÃO ============
export function Report(): JSX.Element {
  useStore();
  const r = Store.report;
  if (!r) return <div className="screen center" style={{ display: 'grid' }}><button className="btn" onClick={() => go('hub')}>Voltar</button></div>;
  const won = r.result === 'vitoria';
  const skills = SKILLS_BY_HERO[r.heroId];
  const maxDmg = Math.max(1, ...r.dmgBySkill.slice(0, 4));
  const d = DUNGEON_BY_ID[r.dungeonId];
  return (
    <div className="screen">
      <div className="topbar"><b className="grow">Relatório da Expedição — {d.nome}</b><button className="btn ghost sm" onClick={() => go('hub')}>Continuar ›</button></div>
      <div className="scroll">
        <div className="report-body">
          <div className={'result-banner ' + (won ? 'win' : 'lose')}>{won ? 'VITÓRIA' : 'DERROTA'}</div>
          {r.firstClear && <div className="rec" style={{ borderColor: 'var(--gold)', background: 'rgba(232,192,64,.12)' }}><Glyph icon="c-crit" size={18} color="#e8c040" /><b>Primeira conquista!</b> +{r.essence} essência de bônus.{r.unlockedDungeon ? ` Dungeon ${r.unlockedDungeon} liberada!` : ''}</div>}
          {!won && r.deathCause && <div className="rec" style={{ borderColor: 'var(--red)', background: 'rgba(224,72,90,.12)' }}>Derrotado por <b>{r.deathCause}</b> — progresso {Math.round(r.progress * 100)}%.</div>}

          <div className="stat-grid">
            <Stat k="Tempo" v={fmtTime(r.timeSec)} />
            <Stat k="Abates" v={String(r.kills)} />
            <Stat k="Elites" v={String(r.eliteKills)} />
            <Stat k="Dano causado" v={fmt(r.dmgDealt)} />
            <Stat k="Dano sofrido" v={fmt(r.dmgTaken)} />
            <Stat k="Curado" v={fmt(r.healed)} />
            <Stat k="Poções" v={String(r.potionsUsed)} />
            <Stat k="Essência" v={'+' + r.essence} gold />
          </div>

          <div className="card-tile">
            <b>Dano por habilidade</b>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {skills.map((sk, i) => (
                <div className="dmg-bar-row" key={sk.id}>
                  <span style={{ width: 130 }} className="tiny">{sk.nome}</span>
                  <div className="dmg-bar"><div style={{ width: `${(r.dmgBySkill[i] / maxDmg) * 100}%` }} /></div>
                  <span className="tiny" style={{ width: 54, textAlign: 'right' }}>{fmt(r.dmgBySkill[i])}</span>
                </div>
              ))}
              <div className="dmg-bar-row"><span style={{ width: 130 }} className="tiny">Ataque básico</span><div className="dmg-bar"><div style={{ width: `${(r.dmgBySkill[4] / maxDmg) * 100}%`, background: 'var(--dim)' }} /></div><span className="tiny" style={{ width: 54, textAlign: 'right' }}>{fmt(r.dmgBySkill[4])}</span></div>
              <div className="dmg-bar-row"><span style={{ width: 130 }} className="tiny">Efeitos/DoT</span><div className="dmg-bar"><div style={{ width: `${(r.dmgBySkill[5] / maxDmg) * 100}%`, background: 'var(--green)' }} /></div><span className="tiny" style={{ width: 54, textAlign: 'right' }}>{fmt(r.dmgBySkill[5])}</span></div>
            </div>
          </div>

          <div className="card-tile">
            <b>Recomendações do Núcleo</b>
            <div className="col" style={{ marginTop: 8 }}>
              {r.recommendations.map((rec, i) => <div className="rec" key={i}><Glyph icon="c-mark" size={16} color="#a878f0" /><span>{rec}</span></div>)}
            </div>
          </div>

          <div className="row wrap" style={{ gap: 10 }}>
            <button className="btn primary" onClick={() => startRun(r.dungeonId)}>Repetir Dungeon {r.dungeonId}</button>
            {won && r.dungeonId < 10 && <button className="btn gold" onClick={() => startRun(Math.min(10, r.dungeonId + 1))}>Próxima Dungeon ›</button>}
            <button className="btn" onClick={() => go('hub')}>Forja do Herói</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function Stat({ k, v, gold }: { k: string; v: string; gold?: boolean }): JSX.Element {
  return <div className="stat-box"><div className="v" style={gold ? { color: 'var(--gold)' } : undefined}>{v}</div><div className="k">{k}</div></div>;
}
function fmt(n: number): string { return n >= 10000 ? (n / 1000).toFixed(1) + 'k' : String(Math.round(n)); }

// ============ BESTIÁRIO ============
export function Bestiary(): JSX.Element {
  useStore();
  const [dg, setDg] = useState(1);
  const list = ENEMIES_BY_DUNGEON[dg] ?? [];
  const d = DUNGEON_BY_ID[dg];
  return (
    <div className="screen">
      <div className="topbar"><button className="btn ghost sm" onClick={() => go(Store.heroId ? 'hub' : 'title')}>‹ Voltar</button><b className="grow">Bestiário</b></div>
      <div className="tabs" style={{ padding: '10px 14px 0', flexWrap: 'wrap' }}>
        {DUNGEONS.map((x) => <button key={x.id} className={'tab' + (dg === x.id ? ' active' : '')} onClick={() => setDg(x.id)} style={{ borderRadius: 10 }}>{x.id}</button>)}
      </div>
      <div className="scroll">
        <div style={{ padding: '10px 16px 0' }}><b style={{ color: d.ambient.glow }}>{d.nome}</b> <span className="tiny">— {d.tema}</span></div>
        <div className="grid-cards">
          {list.map((e) => (
            <div className="bestiary-card" key={e.id}>
              <EnemyThumb enemyId={e.id} />
              <div className="row between"><b style={{ fontSize: 14 }}>{e.nome}</b><span className="tier-tag" style={tierStyle(e.tier)}>{e.tier}</span></div>
              <div className="tiny">Vida {e.hp} · Dano {e.damage} · Def {e.defense}</div>
              {e.special && <div className="tiny" style={{ color: 'var(--purple-l)' }}>{e.special.desc}</div>}
              {(e.resist?.length || e.weak?.length) ? <div className="tiny">{e.resist?.length ? `Resiste: ${e.resist.join(', ')}` : ''} {e.weak?.length ? `· Fraco: ${e.weak.join(', ')}` : ''}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function tierStyle(t: string): CSSProperties {
  const m: Record<string, string> = { comum: '#6f6485', elite: '#b46ef0', subchefe: '#f08838', chefe: '#e0485a' };
  return { background: (m[t] ?? '#666') + '33', color: m[t] ?? '#999' };
}

// ============ CONQUISTAS ============
export function Achievements(): JSX.Element {
  useStore();
  const save = Store.save;
  return (
    <div className="screen">
      <div className="topbar"><button className="btn ghost sm" onClick={() => go(Store.heroId ? 'hub' : 'title')}>‹ Voltar</button><b className="grow">Conquistas</b>
        <span className="pill">{ACHIEVEMENTS.filter((a) => (save.achievements[a.id] ?? 0) >= a.target).length}/{ACHIEVEMENTS.length}</span></div>
      <div className="scroll">
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {ACHIEVEMENTS.map((a) => {
            const done = (save.achievements[a.id] ?? 0) >= a.target;
            const prog = Math.min(a.target, evalAchievement(a.check === a.id ? a.id : a.check, save) || (save.achievements[a.id] ?? 0));
            return (
              <div className={'ach-card' + (done ? '' : ' locked')} key={a.id}>
                <div className="ach-medal"><Glyph icon={a.icon} size={22} color={done ? '#1a1206' : '#6f6485'} /></div>
                <div className="grow">
                  <b>{a.nome}</b>
                  <div className="tiny">{a.desc}</div>
                  {!done && a.target > 1 && <div className="lvl-bar" style={{ marginTop: 5 }}><div className="lvl-fill" style={{ width: `${(prog / a.target) * 100}%` }} /></div>}
                  <div className="tiny" style={{ marginTop: 3, color: 'var(--gold)' }}>{rewardText(a.reward)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function rewardText(r: { essence?: number; rerollRunes?: number; choiceSeals?: number }): string {
  const p: string[] = [];
  if (r.essence) p.push(`${r.essence} essência`);
  if (r.rerollRunes) p.push(`${r.rerollRunes} runa(s)`);
  if (r.choiceSeals) p.push(`${r.choiceSeals} selo(s)`);
  return 'Recompensa: ' + p.join(', ');
}

// ============ AJUSTES ============
export function Settings(): JSX.Element {
  useStore();
  const s = Store.save.settings;
  const [code, setCode] = useState('');
  return (
    <div className="screen">
      <div className="topbar"><button className="btn ghost sm" onClick={() => go(Store.heroId ? 'hub' : 'title')}>‹ Voltar</button><b className="grow">Ajustes</b></div>
      <div className="scroll">
        <div style={{ padding: 18, maxWidth: 640, margin: '0 auto' }} className="col">
          <div className="card-tile">
            <b>Áudio</b>
            <div className="slider-row"><label>Geral</label><input type="range" min={0} max={1} step={0.05} value={s.volMaster} onChange={(e) => setVolume('volMaster', +e.target.value)} /></div>
            <div className="slider-row"><label>Música</label><input type="range" min={0} max={1} step={0.05} value={s.volMusic} onChange={(e) => setVolume('volMusic', +e.target.value)} /></div>
            <div className="slider-row"><label>Efeitos</label><input type="range" min={0} max={1} step={0.05} value={s.volSfx} onChange={(e) => setVolume('volSfx', +e.target.value)} /></div>
            <div className="slider-row"><label>Ambiente</label><input type="range" min={0} max={1} step={0.05} value={s.volAmbient} onChange={(e) => setVolume('volAmbient', +e.target.value)} /></div>
          </div>
          <div className="card-tile row between"><div><b>Registro de combate</b><div className="tiny">Mostrar o log durante as expedições.</div></div><button className="btn sm" onClick={toggleLog}>{s.showLog ? 'Ligado' : 'Desligado'}</button></div>
          <div className="card-tile col">
            <b>Salvar / Carregar</b>
            <button className="btn sm" onClick={() => { const c = doExport(); setCode(c); navigator.clipboard?.writeText(c); toast('Código copiado!', 'good'); }}>Exportar progresso</button>
            <textarea placeholder="Cole aqui um código para importar…" value={code} onChange={(e) => setCode(e.target.value)} />
            <button className="btn sm" onClick={() => { if (doImport(code)) toast('Progresso importado!', 'good'); else toast('Código inválido.', 'danger'); }}>Importar</button>
          </div>
          <div className="card-tile row between"><div><b>Zerar progresso</b><div className="tiny">Apaga tudo permanentemente.</div></div><button className="btn sm" style={{ borderColor: 'var(--red)' }} onClick={() => { if (confirm('Apagar TODO o progresso?')) { hardReset(); go('title'); } }}>Zerar</button></div>
        </div>
      </div>
    </div>
  );
}

// ============ COMO JOGAR ============
export function Help(): JSX.Element {
  return (
    <div className="screen">
      <div className="topbar"><button className="btn ghost sm" onClick={() => go('title')}>‹ Menu</button><b className="grow">Como Jogar</b></div>
      <div className="scroll">
        <div style={{ padding: 20, maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }} className="col">
          <Sec t="A ideia" c="Você não controla o combate diretamente — escolhe um herói, prepara o equipamento e assiste cada expedição se desenrolar. Cada herói luta de um jeito totalmente diferente." />
          <Sec t="Heróis" c="São 10, cada um com 4 habilidades fixas, 6 equipamentos e uma poção de cura automática (usada sozinha quando a vida fica baixa). Ninguém sobe de nível: você evolui habilidades (1→10), equipamentos (1→20) e a poção (1→5)." />
          <Sec t="Cartas de Melhoria" c="Cada evolução oferece 3 cartas para escolher 1, com raridades e sinergias. No nível 5 e 10, as habilidades ganham Mutações e Evoluções que transformam seu comportamento. Use Runas de Reescolha para sortear cartas novas e Selos de Escolha para garantir raridade alta." />
          <Sec t="Dungeons" c="São 10, cada vez mais perigosas. Cada uma tem inimigos comuns, dois subchefes (a 33% e 66%) e um chefe final com fases. Vencer uma dungeon libera a próxima. A Dungeon 1 é vencível por qualquer herói com o kit inicial; as seguintes exigem evoluções." />
          <Sec t="Essência" c="Ganha em cada expedição, é a moeda para todas as evoluções daquele herói. Vitórias inéditas dão bônus generosos." />
          <Sec t="Velocidade" c="Ajuste para 1×, 2× ou 4× a qualquer momento, ou pause. O combate é determinístico: a mesma preparação leva ao mesmo resultado." />
          <div className="tiny" style={{ textAlign: 'center', marginTop: 10 }}>Dungeon Core Heroes — um auto-battler de masmorra. Feito com Canvas + React.</div>
        </div>
      </div>
    </div>
  );
}
function Sec({ t, c }: { t: string; c: string }): JSX.Element {
  return <div className="card-tile"><b style={{ color: 'var(--purple-l)' }}>{t}</b><p className="sub" style={{ margin: '6px 0 0' }}>{c}</p></div>;
}

void HERO_BY_ID;
