import { Dice, HandInfo, HandLevels, Activation } from '../types/game';

export function evaluateHand(diceList: Dice[], relics: string[], rollsLeft: number = 2, handLevels: HandLevels, blind: number = 1, bossPhase?: string | null, activeVoidCurses?: Record<string, string>, runCore: string = 'standard', relicDefs: any[] = []): HandInfo {
  const activeDice = diceList.filter(d => !d.destroyed);
  let values = activeDice.map(d => d.value);
  const activations: Activation[] = [];

  // Core Bonus: Alchemist gets +0.5 Mult per pair
  if (runCore === 'alchemist') {
     const tempCounts: Record<number, number> = {};
     values.forEach(v => { tempCounts[v] = (tempCounts[v] || 0) + 1; });
     let pairs = 0;
     for (const val in tempCounts) { if (tempCounts[val] >= 2) pairs++; }
     if (pairs > 0) {
       activations.push({ name: 'Alchemist Core', type: 'mult', value: pairs * 0.5 });
     }
  }

  // Boss Modifier: 1s subtract points!
  if (bossPhase === 'the_void') {
      values = values.map(v => v === 1 ? -1 : v);
  }

  // Apply some relic pre-effects
  if (relics.includes('magnetic_core')) {
    values = values.map(v => (v === 2 || v === 3 ? 4 : v));
  }
  if (relics.includes('rewritten_law')) {
    values = values.map(v => (v === 1 ? 6 : v));
  }
  if (relics.includes('cybernetic_eye')) {
    values = values.map(v => (v === 5 ? 6 : v));
  }

  let text = 'Solo Die';
  let isStraight = false;

  const ObjectCounts: Record<number, number> = {};
  values.forEach(v => {
    ObjectCounts[v] = (ObjectCounts[v] || 0) + 1;
  });

  let pairs = 0, threes = 0, fours = 0, fives = 0;
  for (const val in ObjectCounts) {
    if (ObjectCounts[val] === 2) pairs++;
    if (ObjectCounts[val] === 3) threes++;
    if (ObjectCounts[val] === 4) fours++;
    if (ObjectCounts[val] === 5) fives++;
  }

  const uniqueValues = Object.keys(ObjectCounts).map(Number).sort((a, b) => a - b);
  if (uniqueValues.length === 5) {
    if (uniqueValues[4] - uniqueValues[0] === 4) {
      isStraight = true;
    } else if (JSON.stringify(uniqueValues) === '[1,2,3,4,5]' || JSON.stringify(uniqueValues) === '[2,3,4,5,6]') {
      isStraight = true;
    }
  }

  let involvedDiceIds: string[] = [];

  if (fives > 0) {
    text = 'Pentad';
    involvedDiceIds = activeDice.map(d => d.id);
  }
  else if (fours > 0) {
    text = 'Quad';
    // find the value that has count 4
    const val4 = Object.keys(ObjectCounts).find(v => ObjectCounts[Number(v)] === 4);
    involvedDiceIds = activeDice.filter((d, i) => values[i] === Number(val4)).map(d => d.id);
  }
  else if (isStraight) {
    text = 'Sequence';
    involvedDiceIds = activeDice.map(d => d.id);
  }
  else if (threes > 0 && pairs > 0) {
    text = 'Full Chamber';
    involvedDiceIds = activeDice.map(d => d.id);
  }
  else if (threes > 0) {
    text = 'Triple';
    const val3 = Object.keys(ObjectCounts).find(v => ObjectCounts[Number(v)] === 3);
    involvedDiceIds = activeDice.filter((d, i) => values[i] === Number(val3)).map(d => d.id);
  }
  else if (pairs > 1) {
    text = 'Two Doubles';
    const valPairs = Object.keys(ObjectCounts).filter(v => ObjectCounts[Number(v)] === 2);
    involvedDiceIds = activeDice.filter((d, i) => valPairs.includes(values[i].toString())).map(d => d.id);
  }
  else if (pairs > 0) {
    text = 'Double';
    const valPair = Object.keys(ObjectCounts).find(v => ObjectCounts[Number(v)] === 2);
    involvedDiceIds = activeDice.filter((d, i) => values[i] === Number(valPair)).map(d => d.id);
  } else {
    // Solo Die
    const maxVal = Math.max(...values);
    involvedDiceIds = activeDice.filter((d, i) => values[i] === maxVal).map(d => d.id);
  }

  const levelInfo = handLevels[text];

  let rawBase = values.reduce((sum, v) => sum + v, 0);
  let base = rawBase + levelInfo.basePoints;
  let mult = levelInfo.baseMult;

  activations.push({ name: `Lvl ${levelInfo.level} ${text}`, type: 'base', value: levelInfo.basePoints });
  activations.push({ name: `Lvl ${levelInfo.level} ${text}`, type: 'mult', value: levelInfo.baseMult });

  if (relics.includes('six_shooters')) {
    const sixes = values.filter(v => v === 6).length;
    if (sixes > 0) {
       base += (sixes * 6);
       activations.push({ name: 'Six Shooters', type: 'base', value: sixes * 6 });
    }
  }

  if (relics.includes('blood_diamond')) {
     const corruptedCount = activeDice.filter(d => d.type === 'corrupted' || d.type === 'unstable').length;
     if (corruptedCount > 0) {
         base += corruptedCount * 20;
         activations.push({ name: 'Blood Diamond', type: 'base', value: corruptedCount * 20 });
     }
  }

  if (text === 'Pentad' && relics.includes('grand_slam')) {
      base += 200;
      activations.push({ name: 'Grand Slam', type: 'base', value: 200 });
  }
  if (text === 'Sequence' && relics.includes('golden_fleece')) {
      base += 50;
      activations.push({ name: 'Golden Fleece', type: 'base', value: 50 });
  }
  if (text === 'Sequence' && relics.includes('plasma_blade')) {
      base *= 2;
      activations.push({ name: 'Plasma Blade', type: 'base', value: base / 2 });
  }

  if (relics.includes('sniper_scope') && pairs > 0) {
      base += 100;
      mult *= 0.5;
      activations.push({ name: 'Sniper Scope (+Base)', type: 'base', value: 100 });
      activations.push({ name: 'Sniper Scope (x0.5)', type: 'mult', value: -0.5 });
  }

  if (text === 'Full Chamber' && relics.includes('broken_matrix')) {
      mult *= 6;
      activations.push({ name: 'Broken Matrix', type: 'mult', value: 6 });
  }

  // Handle Dice Modifiers (Foil and Holographic) and Ascended
  for (const d of activeDice) {
      if (d.modifier === 'foil') {
          base += 30;
          activations.push({ name: 'Foil Die', type: 'base', value: 30 });
      } else if (d.modifier === 'holographic') {
          mult += 2;
          activations.push({ name: 'Holographic Die', type: 'mult', value: 2 });
      } else if (d.modifier === 'gold') {
          activations.push({ name: 'Gold Die ($)', type: 'mult', value: 0 }); // Just for visuals during hand, gold added at submit
      }
      if (d.ascended) {
          base += 10;
          mult *= 1.5;
          activations.push({ name: 'Ascended Die (+Base)', type: 'base', value: 10 });
          activations.push({ name: 'Ascended Die (xMult)', type: 'mult', value: 1.5 });
      }

      if (d.material === 'glass' && involvedDiceIds.includes(d.id)) {
          mult += 8;
          activations.push({ name: 'Glass Die (+x8 Mult)', type: 'mult', value: 8 });
      }
      
      if (d.material === 'wood' && involvedDiceIds.includes(d.id)) {
          base += 50;
          activations.push({ name: 'Carved Wood (+50 Base)', type: 'base', value: 50 });
      }

      if (d.material === 'obsidian' && involvedDiceIds.includes(d.id)) {
          mult *= 2;
          activations.push({ name: 'Obsidian Die (x2 Mult)', type: 'mult', value: 2 });
      }

      if (d.material === 'steel' && d.locked) {
          mult *= 1.5;
          activations.push({ name: 'Steel Die Locked (x1.5 Global)', type: 'mult', value: 1.5 });
      }

      if (d.corruption > 75 && relics.includes('corrupted_protocol')) {
          mult *= 2;
          activations.push({ name: 'Corrupted Protocol', type: 'mult', value: 2 });
      }

      // ----------------------------------------------------
      // Dice Seals (Mutações de Face) Validation
      // ----------------------------------------------------
      if (d.seal && involvedDiceIds.includes(d.id)) {
        if (d.seal === 'gold_seal') {
          // Handled later during score submit for actual gold insertion, but we show visual here
          activations.push({ name: 'Gold Seal ($)', type: 'mult', value: 0 });
        } else if (d.seal === 'blood_seal') {
          mult *= 1.5;
          activations.push({ name: 'Blood Seal (x1.5 Mult)', type: 'mult', value: 1.5 });
        } else if (d.seal === 'quantum_seal') {
          base += 100;
          activations.push({ name: 'Quantum Seal (+100 Base)', type: 'base', value: 100 });
        }
      }
  }

  // ----------------------------------------------------
  // Relic Sinergies (Set Bonuses) Validation
  // ----------------------------------------------------
  if (relicDefs && relicDefs.length > 0) {
     const setCounts: Record<string, number> = {};
     relics.forEach(rId => {
       const def = relicDefs.find(r => r.id === rId);
       if (def && def.synergySet) {
          setCounts[def.synergySet] = (setCounts[def.synergySet] || 0) + 1;
       }
     });

     for (const [setName, count] of Object.entries(setCounts)) {
       if (count >= 2) {
         if (setName === 'void_set') {
           mult *= 3;
           activations.push({ name: 'Synergy: Void Trinity (x3 Mult)', type: 'mult', value: 3 });
         } else if (setName === 'alchemist_set') {
           base += 200;
           activations.push({ name: 'Synergy: Grand Work (+200 Base)', type: 'base', value: 200 });
         } else if (setName === 'cyber_set') {
           mult += 5;
           activations.push({ name: 'Synergy: Cyberlink (+5 Mult)', type: 'mult', value: 5 });
         }
       }
     }
  }

  if (text === 'Quad' && relics.includes('weighted_d20')) {
      mult *= 2;
      activations.push({ name: 'Weighted D20', type: 'mult', value: 2 });
  }

  const sixCount = values.filter(v => v === 6).length;

  if (relics.includes('crimson_core') && sixCount > 0) {
    mult += sixCount * 1;
    activations.push({ name: 'Crimson Core', type: 'mult', value: sixCount * 1 });
  }

  if (relics.includes('gamblers_fallacy') && text === 'Solo Die') {
    mult += 4;
    activations.push({ name: "Gambler's Fallacy", type: 'mult', value: 4 });
  }

  if (relics.includes('joker_card') && uniqueValues.length === 5) {
    mult *= 2;
    activations.push({ name: 'The Joker', type: 'mult', value: mult }); // roughly
  }

  if (relics.includes('echo_shard') && pairs > 0) {
    mult += pairs * 0.5;
    activations.push({ name: 'Echo Shard', type: 'mult', value: pairs * 0.5 });
  }

  if (relics.includes('unstable_reactor')) {
    mult += 3;
    activations.push({ name: 'Unstable Reactor', type: 'mult', value: 3 });
  }

  if (relics.includes('chaos_engine')) {
    const chaos = Math.floor(Math.random() * 6) - 1;
    mult += chaos;
    activations.push({ name: 'Chaos Engine', type: 'mult', value: chaos });
  }

  if (relics.includes('pure_heart')) {
    mult = Math.max(0.5, mult - 1);
    activations.push({ name: 'Pure Heart', type: 'mult', value: -1 });
  }

  if (relics.includes('hollow_crown') && rollsLeft === 0) {
    mult += 5;
    activations.push({ name: 'Hollow Crown', type: 'mult', value: 5 });
  }

  if (relics.includes('void_thruster')) {
    base -= 50;
    activations.push({ name: 'Void Thruster Penalty', type: 'base', value: -50 });
  }

  // --- VOID RELICS POSITIVES AND PENALTIES ---

  // 1. Grave Shard Positive (+8x Mult)
  if (relics.includes('void_grave_shard')) {
    mult += 8;
    activations.push({ name: 'Grave Shard Spark (+x8 Mult)', type: 'mult', value: 8 });
  }

  // 1b. Grave Shard Curse: Drain (-60 Base Points)
  if (activeVoidCurses && activeVoidCurses['void_grave_shard'] === 'curse_drain') {
    base -= 60;
    activations.push({ name: 'Curse: Base Points Siphon (-60)', type: 'base', value: -60 });
  }

  // 2. Singularity Eye Positive (+300 Base Points)
  if (relics.includes('void_singularity_eye')) {
    base += 300;
    activations.push({ name: 'Singularity Eye Aura (+300 Base)', type: 'base', value: 300 });
  }

  // 2b. Singularity Eye Curse: Radiation Leak (-x4 Mult on non-sequences)
  if (activeVoidCurses && activeVoidCurses['void_singularity_eye'] === 'curse_leak' && text !== 'Sequence') {
    mult -= 4;
    activations.push({ name: 'Curse: Radiation Leak (-x4 Mult)', type: 'mult', value: -4 });
  }

  // 3. Null Protocol Positive (+4x Mult)
  if (relics.includes('void_null_protocol')) {
    mult += 4;
    activations.push({ name: 'Null Protocol Amplification (+x4 Mult)', type: 'mult', value: 4 });
  }

  // Eclipse Curse was handled. Doubling occurs at final total calculations
  
  // Robust Clamp Guards to prevent negative multipliers or negative base scores
  base = Math.max(1, base);
  mult = Math.max(1, mult);

  let finalTotal = Math.floor(base * mult);

  // Eclipse Double Total Score
  if (relics.includes('void_eclipse_curse')) {
    const sixes = values.filter(v => v === 6).length;
    if (sixes === 2) {
      finalTotal *= 2;
      activations.push({ name: 'Eclipse Alignment (Double Score!)', type: 'mult', value: 2 });
    }
  }

  return {
    base,
    mult,
    text,
    total: finalTotal,
    activations,
    involvedDiceIds
  };
}

export function rollSingleDice(d: Dice, isLoaded: boolean): Dice {
  if (d.locked || d.destroyed) return d;

  let newVal = Math.floor(Math.random() * 6) + 1;

  if (isLoaded) {
    newVal = 6;
  } else {
    // Corruption effect
    const cor = d.corruption;
    if (cor > 75) newVal = 6; // 100% chance
    else if (cor > 50 && Math.random() < 0.3) newVal = 6; // 30%
    else if (cor > 25 && Math.random() < 0.1) newVal = 6; // 10%
  }

  return { ...d, value: newVal };
}
