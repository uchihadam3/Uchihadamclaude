// =============================================================================
// test/sim.js — Simulação HEADLESS de combate (sem navegador, sem DOM).
// Rode com:  node test/sim.js   (a partir da pasta vibe-gambit/)
// Prova que a Engine roda 100% em background e é determinística (seed fixa).
// =============================================================================

import { newGame } from '../src/state.js';
import { SKILLS } from '../src/data.js';
import { Combat, buildParty, buildWave } from '../src/engine.js';

const state   = newGame();
const party   = buildParty(state);
const enemies = buildWave(['goblin', 'goblin', 'slime']);
const combat  = new Combat(party, enemies, { seed: 7 });

const line = u => `${u.name}(HP ${u.hp}/${u.maxHp}${u.maxMp ? `, MP ${u.mp}` : ''})`;

console.log('=== VIBE GAMBIT — simulação de combate (headless) ===');
console.log('Heróis  :', party.map(line).join('  '));
console.log('Inimigos:', enemies.map(line).join('  '));
console.log('----------------------------------------------------');

let guard = 0;
while(!combat.isOver() && guard++ < 200){
  const before = combat.log.length;
  combat.step();
  for(const ev of combat.log.slice(before)){
    const skill = SKILLS[ev.skill]?.name || ev.skill;
    if(ev.type === 'damage')
      console.log(`t${ev.tick}  ${ev.source.name} usa ${skill} em ${ev.target.name}  ->  ${ev.amount}${ev.crit ? ' CRIT' : ''} DMG` + (ev.dead ? '  ☠️' : `  (HP ${ev.target.hp})`));
    else
      console.log(`t${ev.tick}  ${ev.source.name} usa ${skill} em ${ev.target.name}  ->  +${ev.amount} HP  (HP ${ev.target.hp})`);
  }
}

console.log('----------------------------------------------------');
console.log(`RESULTADO: ${combat.outcome()?.toUpperCase()} em ${combat.tick} ticks`);
console.log('Sobreviventes:', combat.party.filter(u => u.hp > 0).map(line).join('  ') || '(nenhum)');
