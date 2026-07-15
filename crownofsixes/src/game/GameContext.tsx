import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Dice, HandInfo, GameStatus, HandLevels, MetaUpgrades, RunCore, DiceSeal } from '../types/game';
import { evaluateHand, rollSingleDice } from './engine';
import { RELICS_DB } from './relics';

const TARGET_SCORES = [150, 450, 1200, 3000, 7500, 18000, 45000, 110000];

export const defaultMetaUpgrades: MetaUpgrades = {
  startingSteelDie: false,
  startingGlassDie: false,
  startingMidasDie: false,
  xpMultiplier: 1.0,
  startingConsumables: [],
  unlockedBlueprints: []
};

export const loadMetaState = () => {
  if (typeof window === 'undefined') return { shards: 0, unlockedDice: ['default'], upgrades: defaultMetaUpgrades };
  try {
    const saved = localStorage.getItem('crown_of_sixes_meta');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        shards: typeof parsed.shards === 'number' ? parsed.shards : 0,
        unlockedDice: Array.isArray(parsed.unlockedDice) ? parsed.unlockedDice : ['default'],
        upgrades: {
          ...defaultMetaUpgrades,
          ...parsed.upgrades
        }
      };
    }
  } catch (e) {
    console.error("Error reading meta state", e);
  }
  return { shards: 0, unlockedDice: ['default'], upgrades: defaultMetaUpgrades };
};

export const saveMetaState = (shards: number, unlockedDice: string[], upgrades: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('crown_of_sixes_meta', JSON.stringify({
      shards,
      unlockedDice,
      upgrades
    }));
  } catch (e) {
    console.error("Error saving meta state", e);
  }
};

type Action =
  | { type: 'SHOW_INTRO' }
  | { type: 'SHOW_LORE' }
  | { type: 'SHOW_MENU' }
  | { type: 'START_GAME' }
  | { type: 'ROLL' }
  | { type: 'TOGGLE_LOCK'; id: string }
  | { type: 'SUBMIT_SCORE' }
  | { type: 'SET_ROLL_RESULTS'; values: number[] }
  | { type: 'ENTER_SHOP' }
  | { type: 'LEAVE_EVENT' }
  | { type: 'CHOOSE_CORE'; core: RunCore }
  | { type: 'LEAVE_SHOP' }
  | { type: 'START_BOSS' }
  | { type: 'BUY_RELIC'; id: string; cost: number }
  | { type: 'APPLY_SEAL'; id: string; seal: DiceSeal }
  | { type: 'MUTATE_GOLD'; amount: number }
  | { type: 'UPGRADE_HAND'; hand: string; cost: number }
  | { type: 'REROLL_SHOP' }
  | { type: 'UPGRADE_DICE'; modifier: 'gold' | 'foil' | 'holographic'; cost: number; diceId?: string }
  | { type: 'UNLOCK_DICE_SET'; id: string; cost: number }
  | { type: 'SELECT_DICE_SET'; id: string }
  | { type: 'BUY_CONSUMABLE'; id: string; cost: number }
  | { type: 'USE_CONSUMABLE'; id: string; targetDieId?: string; chosenValue?: number; targetDieId2?: string }
  | { type: 'UPGRADE_DICE_MATERIAL'; material: 'glass' | 'steel' | 'midas' | 'wood' | 'obsidian'; cost: number; diceId?: string }
  | { type: 'ENTER_META_LAB' }
  | { type: 'LEAVE_META_LAB' }
  | { type: 'BUY_META_UPGRADE'; upgradesPatch: Partial<MetaUpgrades>; shardCost: number }
  | { type: 'UNLOCK_META_COSMETIC_SET'; setId: string; shardCost: number }
  | { type: 'REFRESH_META_FROM_STORAGE' }
  | { type: 'SAVE_AND_QUIT' };

const generateInitialDice = (): Dice[] => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `dice-${i}`,
    value: 1,
    corruption: 0,
    type: 'normal',
    locked: false,
    destroyed: false,
    material: 'normal'
  }));
};

const initialHandLevels: HandLevels = {
  'Solo Die': { level: 1, basePoints: 5, baseMult: 1 },
  'Double': { level: 1, basePoints: 10, baseMult: 2 },
  'Two Doubles': { level: 1, basePoints: 20, baseMult: 2 },
  'Triple': { level: 1, basePoints: 30, baseMult: 3 },
  'Sequence': { level: 1, basePoints: 30, baseMult: 4 },
  'Full Chamber': { level: 1, basePoints: 40, baseMult: 4 },
  'Quad': { level: 1, basePoints: 60, baseMult: 7 },
  'Pentad': { level: 1, basePoints: 120, baseMult: 10 },
};

const initialMeta = loadMetaState();

export const generateDirective = (round: number): NonNullable<GameState['activeDirective']> => {
  const directives = [
    { id: 'seq', text: 'Sintetize uma Sequência', rewardType: 'gold', rewardValue: 6 },
    { id: 'quad', text: 'Sintetize um Quad', rewardType: 'meta_shards', rewardValue: 5 },
    { id: 'score', text: 'Supere a meta primária em +50%', rewardType: 'gold', rewardValue: 5 },
  ];
  const choice = directives[Math.floor(Math.random() * directives.length)];
  return { ...choice, completed: false } as NonNullable<GameState['activeDirective']>;
};

const initialState: GameState = {
  status: 'publisher',
  runCore: 'standard',
  round: 1,
  blind: 1,
  bossPhase: null,
  gold: 0,
  targetScore: TARGET_SCORES[0],
  currentRoundScore: 0,
  totalScore: 0,
  rollsLeft: 4,
  maxRolls: 4,
  activeDirective: null,
  dice: generateInitialDice(),
  relics: [],
  handLevels: initialHandLevels,
  lastHandInfo: null,
  shopItems: [],
  selectedDiceSet: 'default',
  unlockedDiceSets: initialMeta.unlockedDice,
  activeVoidCurses: {},
  consumables: [],
  metaShards: initialMeta.shards,
  metaUpgrades: initialMeta.upgrades
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SHOW_INTRO':
      return { ...state, status: 'intro' };
    case 'SHOW_LORE':
      return { ...state, status: 'lore' };
    case 'SHOW_MENU':
      return { ...state, status: 'menu' };
    case 'START_GAME': {
      return {
        ...state,
        status: 'core_select'
      };
    }
    
    case 'CHOOSE_CORE': {
      const generatedDice = generateInitialDice();
      const upgrades = state.metaUpgrades || defaultMetaUpgrades;
      
      // Apply starting material permanent upgrades
      if (upgrades.startingSteelDie) {
        generatedDice[0].material = 'steel';
      }
      if (upgrades.startingGlassDie) {
        generatedDice[1].material = 'glass';
      }
      if (upgrades.startingMidasDie) {
        generatedDice[2].material = 'midas';
      }

      // Apply Core-specific logic
      if (action.core === 'gambler') {
         generatedDice[0].modifier = 'gold';
         generatedDice[1].modifier = 'gold';
      } else if (action.core === 'void_cultist') {
         generatedDice[0].type = 'corrupted';
         generatedDice[0].corruption = 50;
      }

      // Apply preloaded memory hacks
      const preloadedHacks = [...(upgrades.startingConsumables || [])];

      return {
        ...initialState,
        status: 'playing',
        runCore: action.core,
        round: 1,
        blind: 1,
        bossPhase: null,
        rollsLeft: initialState.maxRolls, 
        activeDirective: generateDirective(1),
        lastHandInfo: null,
        dice: generatedDice,
        consumables: preloadedHacks,
        selectedDiceSet: state.selectedDiceSet || 'default',
        unlockedDiceSets: state.unlockedDiceSets || ['default'],
        metaShards: state.metaShards || 0,
        metaUpgrades: upgrades,
        activeVoidCurses: {}
      };
    }

    case 'ROLL': {
      if (state.rollsLeft <= 0) return state;

      let deductedGold = 0;
      // Grave Shard Poverty curse: lose $1 per roll
      if (state.activeVoidCurses['void_grave_shard'] === 'curse_poverty' && state.gold > 0) {
        deductedGold = 1;
      }

      // Null Protocol Jam curse: locks 1 to 3 random non-locked & non-destroyed dice
      let maybeJamDice = [...state.dice];
      if (state.activeVoidCurses['void_null_protocol'] === 'curse_jam') {
        const nonLockedIndices = maybeJamDice
          .map((d, idx) => ({ d, idx }))
          .filter(item => !item.d.locked && !item.d.destroyed)
          .map(item => item.idx);
        
        if (nonLockedIndices.length > 0) {
          // Lock random 1 to 3 dice
          const numToJam = Math.min(nonLockedIndices.length, Math.floor(Math.random() * 3) + 1);
          const shuffled = nonLockedIndices.sort(() => 0.5 - Math.random());
          for (let k = 0; k < numToJam; k++) {
            maybeJamDice[shuffled[k]] = { ...maybeJamDice[shuffled[k]], locked: true };
          }
        }
      }
      
      const rollingDice = maybeJamDice.map((d, index) => {
         if (d.locked || d.destroyed) return d;
         
         const isLoaded = state.relics.includes('loaded_dice') && index === 0;
         let forceValue: number | undefined = undefined;

         if (isLoaded) {
            forceValue = 6;
         } else {
            const cor = d.corruption;
            if (cor > 75) forceValue = 6;
            else if (cor > 50 && Math.random() < 0.3) forceValue = 6;
            else if (cor > 25 && Math.random() < 0.1) forceValue = 6;
         }
         return { ...d, forceValue }; // add forceValue so 3D scene can read it
      });

      return {
        ...state,
        status: 'rolling',
        dice: rollingDice,
        rollsLeft: state.rollsLeft - 1,
        gold: Math.max(0, state.gold - deductedGold)
      };
    }

    case 'SET_ROLL_RESULTS': {
      // Null Protocol Shatter curse implementation
      const isShatterActive = state.activeVoidCurses['void_null_protocol'] === 'curse_shatter';

      let midasEarnings = 0;
      let taxesDrain = 0;

      const newDiceWithValues = state.dice.map((d, i) => {
        let isDestroyed = d.destroyed;
        const rolledVal = action.values[i];
        const originallyRolled = !d.locked && !d.destroyed;

        if (originallyRolled) {
          // Glass shattering hazard (15% chance to shatter when rolled)
          if (d.material === 'glass' && !isDestroyed) {
            if (Math.random() < 0.15) {
              isDestroyed = true;
            }
          }
          // Original Null Shatter curse
          if (isShatterActive && !isDestroyed && (rolledVal === 1 || rolledVal === 2)) {
            if (Math.random() < 0.12) {
              isDestroyed = true;
            }
          }
          // Midas Die Gold Generation (Even number yields +$1 Gold on roll)
          if (d.material === 'midas' && !isDestroyed && rolledVal % 2 === 0) {
            midasEarnings += 1;
          }
          // The Taxes (Os Impostos) Boss Blind drain (Rerolled odd numbers drain $1)
          if (state.bossPhase === 'the_taxes' && rolledVal % 2 !== 0) {
            taxesDrain += 1;
          }
        }

        return { ...d, value: rolledVal, destroyed: isDestroyed };
      });
      
      const doubleCorrupt = state.relics.includes('unstable_reactor');
      const pureHeart = state.relics.includes('pure_heart');
      const hellfire = state.relics.includes('hellfire_engine');
      const phantomShield = state.relics.includes('phantom_shield');
      const isSurgeActive = state.activeVoidCurses['void_singularity_eye'] === 'curse_corrupt_surge';
      
      let corruptedDice = newDiceWithValues.map(d => {
        if (d.destroyed) return d;
        if (d.locked) return d; 
        
        let gain = 5;
        if (d.value === 6) gain += 5; 
        if (doubleCorrupt) gain *= 2;
        if (hellfire) gain += 50;
        if (phantomShield) gain = Math.max(0, gain - 10);
        if (isSurgeActive) gain += Math.floor(15 + Math.random() * 25); // high feedback surge
        
        let newCorrupt = d.corruption + gain;
        if (pureHeart) newCorrupt -= 10;
        
        const finalCorrupt = Math.max(0, Math.min(100, newCorrupt));
        
        return {
          ...d,
          corruption: finalCorrupt,
          type: (finalCorrupt > 75 ? 'unstable' : finalCorrupt > 25 ? 'corrupted' : 'normal') as 'unstable' | 'corrupted' | 'normal'
        };
      });

      // The Glitch boss randomized locking
      if (state.bossPhase === 'the_glitch') {
        corruptedDice = corruptedDice.map(d => {
          if (d.destroyed) return d;
          return { ...d, locked: Math.random() < 0.5 };
        });
      }

      const hand = evaluateHand(corruptedDice, state.relics, state.rollsLeft, state.handLevels, state.blind, state.bossPhase, state.activeVoidCurses, state.runCore, RELICS_DB);
      const newRoundScore = state.currentRoundScore + hand.total;
      
      let nextMetaShards = state.metaShards || 0;
      let extraGold = 0;
      let newDirective = state.activeDirective;

      if (newDirective && !newDirective.completed) {
        let completed = false;
        if (newDirective.id === 'seq' && hand.text === 'Sequence') completed = true;
        if (newDirective.id === 'quad' && hand.text === 'Quad') completed = true;
        if (newDirective.id === 'full' && hand.text === 'Full Chamber') completed = true;
        if (newDirective.id === 'score' && newRoundScore >= state.targetScore * 1.5) completed = true;

        if (completed) {
          newDirective = { ...newDirective, completed: true };
          if (newDirective.rewardType === 'gold') extraGold += newDirective.rewardValue;
          if (newDirective.rewardType === 'meta_shards') nextMetaShards += newDirective.rewardValue;
        }
      }

      const MAX_XP = 100;
      const hasCatalyst = state.relics.includes('ascension_catalyst');
      const xpMultiplier = state.metaUpgrades?.xpMultiplier || 1.0;
      const finalDice = corruptedDice.map(d => {
        if (hand.involvedDiceIds.includes(d.id)) {
          let gain = hand.total > 500 ? 25 : hand.total > 150 ? 15 : 5;
          if (hasCatalyst) gain *= 3;
          gain = Math.floor(gain * xpMultiplier); // Apply permanent XP boost
          const addedXp = (d.xp || 0) + gain;
          const ascended = addedXp >= MAX_XP ? true : d.ascended;
          return { ...d, xp: Math.min(MAX_XP, addedXp), ascended };
        }
        return d;
      });

      // Determine if they ran out of rolls and didn't meet the target
      let nextStatus: GameStatus = 'playing';
      const finalGold = Math.max(0, state.gold + midasEarnings - taxesDrain) + extraGold;
      
      if (state.rollsLeft <= 0 && newRoundScore < state.targetScore) {
        nextStatus = 'gameover';
        const scoreShards = Math.floor((state.totalScore + hand.total) / 120);
        const goldShards = Math.max(0, finalGold);
        nextMetaShards += (scoreShards + goldShards);
        saveMetaState(nextMetaShards, state.unlockedDiceSets, state.metaUpgrades);
        
        try {
          const savedHistory = localStorage.getItem('crown_of_sixes_history');
          const runs = savedHistory ? JSON.parse(savedHistory) : [];
          runs.push({
            score: state.totalScore + hand.total,
            round: state.round,
            status: 'corrupted',
            date: new Date().toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          });
          localStorage.setItem('crown_of_sixes_history', JSON.stringify(runs));
        } catch (e) {
          console.error("Error logging run history", e);
        }
      }

      return {
         ...state,
         status: nextStatus,
         dice: finalDice,
         currentRoundScore: newRoundScore,
         totalScore: state.totalScore + hand.total,
         lastHandInfo: hand,
         gold: finalGold,
         activeDirective: newDirective,
         metaShards: nextMetaShards
      };
    }

    case 'TOGGLE_LOCK': {
      if (state.bossPhase === 'the_chains') return state; // Chains prevent locking completely
      if (state.activeVoidCurses['void_grave_shard'] === 'curse_lockout') return state; // Lockout curse prevents locks!

      const targetDie = state.dice.find(d => d.id === action.id);
      if (!targetDie) return state;

      let goldCost = 0;
      // Cylinder Jam lock-breaker costs $1 to break
      if (targetDie.locked && state.activeVoidCurses['void_null_protocol'] === 'curse_jam') {
         goldCost = 1;
         if (state.gold < goldCost) return state;
      }

      return {
        ...state,
        gold: Math.max(0, state.gold - goldCost),
        dice: state.dice.map(d => (d.id === action.id ? { ...d, locked: !d.locked } : d))
      };
    }

    case 'SUBMIT_SCORE': {
      let nextStatus = state.status;
      let earnedGold = 0;
      
      if (state.currentRoundScore >= state.targetScore) {
        // Recompensa base mais enxuta (economia apertada no começo)
        earnedGold = 3 + Math.floor(state.rollsLeft / 2);
        
        // Add gold from gold dice
        const activeDice = state.dice.filter(d => !d.destroyed);
        earnedGold += activeDice.filter(d => d.modifier === 'gold').length * 2;
        
        // Add gold from gold_seals that were part of the last hand
        if (state.lastHandInfo) {
           const scoredDice = state.dice.filter(d => state.lastHandInfo!.involvedDiceIds.includes(d.id));
           const goldSeals = scoredDice.filter(d => d.seal === 'gold_seal').length;
           if (goldSeals > 0) {
              earnedGold += goldSeals * 5;
           }
        }

        if (state.relics.includes('golden_ticket')) {
            earnedGold += 2;
        }

        if (state.relics.includes('soul_reaper') && state.currentRoundScore === state.targetScore) {
            earnedGold += 10;
        }

        if (state.round >= TARGET_SCORES.length) {
            nextStatus = 'victory';
        } else {
            nextStatus = Math.random() < 0.40 ? 'event' : 'shop'; // 40% chance of random encounter
        }
      } else {
         nextStatus = 'gameover';
      }

      const resetDice = state.dice.map(d => ({ ...d, locked: false }));

      // Generate shop items
      const shopItems = RELICS_DB.sort(() => 0.5 - Math.random()).slice(0, 3).map(r => r.id);

      let nextMetaShards = state.metaShards || 0;
      const finalGold = state.gold + earnedGold;

      if (nextStatus === 'victory') {
         const scoreShards = Math.floor(state.totalScore / 120);
         const goldShards = Math.max(0, finalGold);
         const victoryBonus = 150;
         nextMetaShards += (scoreShards + goldShards + victoryBonus);
         saveMetaState(nextMetaShards, state.unlockedDiceSets, state.metaUpgrades);

         try {
           const savedHistory = localStorage.getItem('crown_of_sixes_history');
           const runs = savedHistory ? JSON.parse(savedHistory) : [];
           runs.push({
             score: state.totalScore,
             round: state.round,
             status: 'victory',
             date: new Date().toLocaleDateString('pt-BR', {
               day: '2-digit',
               month: '2-digit',
               year: 'numeric',
               hour: '2-digit',
               minute: '2-digit'
             })
           });
           localStorage.setItem('crown_of_sixes_history', JSON.stringify(runs));
         } catch (e) {
           console.error("Error logging run history", e);
         }
      } else if (nextStatus === 'gameover') {
         const scoreShards = Math.floor(state.totalScore / 120);
         const goldShards = Math.max(0, finalGold);
         nextMetaShards += (scoreShards + goldShards);
         saveMetaState(nextMetaShards, state.unlockedDiceSets, state.metaUpgrades);

         try {
           const savedHistory = localStorage.getItem('crown_of_sixes_history');
           const runs = savedHistory ? JSON.parse(savedHistory) : [];
           runs.push({
             score: state.totalScore,
             round: state.round,
             status: 'corrupted',
             date: new Date().toLocaleDateString('pt-BR', {
               day: '2-digit',
               month: '2-digit',
               year: 'numeric',
               hour: '2-digit',
               minute: '2-digit'
             })
           });
           localStorage.setItem('crown_of_sixes_history', JSON.stringify(runs));
         } catch (e) {
           console.error("Error logging run history", e);
         }
      }

      return {
        ...state,
        status: nextStatus as GameStatus,
        dice: resetDice,
        gold: finalGold,
        shopItems,
        metaShards: nextMetaShards
      };
    }

    case 'APPLY_SEAL': {
        return {
           ...state,
           dice: state.dice.map(d => d.id === action.id ? { ...d, seal: action.seal } : d)
        };
    }
    
    case 'MUTATE_GOLD': {
        return {
            ...state,
            gold: Math.max(0, state.gold + action.amount)
        };
    }

    case 'BUY_RELIC': {
      if (state.gold < action.cost || state.relics.includes(action.id)) return state;
      
      let extraRolls = 0;
      let newDice = state.dice;
      if (action.id === 'corrupt_deal') {
         extraRolls += 2;
         newDice = newDice.map(d => ({ ...d, corruption: Math.min(100, d.corruption + 20)}));
      }

      if (state.relics.includes('neon_heart') || action.id === 'neon_heart') {
         newDice = newDice.map(d => ({ ...d, corruption: Math.max(0, d.corruption - 5)}));
      }

      return {
        ...state,
        gold: state.gold - action.cost,
        relics: [...state.relics, action.id],
        shopItems: state.shopItems.filter(id => id !== action.id),
        maxRolls: state.maxRolls + extraRolls,
        dice: newDice
      };
    }

    case 'UPGRADE_HAND': {
      if (state.gold < action.cost) return state;
      const currentLabel = state.handLevels[action.hand];
      if (!currentLabel) return state;

      return {
        ...state,
        gold: state.gold - action.cost,
        handLevels: {
            ...state.handLevels,
            [action.hand]: {
                level: currentLabel.level + 1,
                basePoints: currentLabel.basePoints + 15,
                baseMult: currentLabel.baseMult + 2,
            }
        }
      };
    }

    case 'REROLL_SHOP': {
        if (state.gold < 1) return state;
        const shopItems = RELICS_DB.sort(() => 0.5 - Math.random()).slice(0, 3).map(r => r.id);
        return { ...state, gold: state.gold - 1, shopItems };
    }

    case 'UPGRADE_DICE': {
        if (state.gold < action.cost) return state;
        let targetId = action.diceId;
        if (!targetId) {
          // fallback: dado aleatório sem esse modificador
          const opts = state.dice.filter(d => d.modifier !== action.modifier && !d.destroyed);
          if (opts.length === 0) return state;
          targetId = opts[Math.floor(Math.random() * opts.length)].id;
        } else {
          const t = state.dice.find(d => d.id === targetId);
          if (!t || t.destroyed) return state;
        }
        return {
           ...state,
           gold: state.gold - action.cost,
           // aplicar um modificador substitui o anterior no dado escolhido
           dice: state.dice.map(d => d.id === targetId ? { ...d, modifier: action.modifier } : d)
        };
    }

    case 'LEAVE_EVENT': {
      return {
        ...state,
        status: 'shop'
      };
    }

    case 'LEAVE_SHOP': {
       const hasRiftEye = state.relics.includes('rift_eye');
       const hasVoidThruster = state.relics.includes('void_thruster');
       let totalRolls = state.maxRolls + (hasRiftEye && state.dice.some(d => d.corruption > 50) ? 1 : 0);
       if (hasVoidThruster) totalRolls += 1;

       const nextRound = state.round + 1;
       const nextBlind = ((nextRound - 1) % 3) + 1; // 1 = Small, 2 = Big, 3 = Boss

       let nextStatus: GameStatus = nextBlind === 3 ? 'boss_intro' : 'playing';
       const BOSS_TYPES: import('../types/game').BossPhase[] = ['the_void', 'the_wall', 'the_chains', 'the_needle', 'the_glitch', 'the_black_hole', 'the_taxes'];
       let nextBossPhase = nextBlind === 3 ? BOSS_TYPES[Math.floor(Math.random() * BOSS_TYPES.length)] : null;

       // Randomized curses for Void Relics in ownership!
       const activeVoidCurses: Record<string, string> = {};
       if (state.relics.includes('void_grave_shard')) {
         const pool = ['curse_lockout', 'curse_poverty', 'curse_drain'];
         activeVoidCurses['void_grave_shard'] = pool[Math.floor(Math.random() * pool.length)];
       }
       if (state.relics.includes('void_singularity_eye')) {
         const pool = ['curse_corrupt_surge', 'curse_leak'];
         activeVoidCurses['void_singularity_eye'] = pool[Math.floor(Math.random() * pool.length)];
       }
       if (state.relics.includes('void_null_protocol')) {
         const pool = ['curse_jam', 'curse_shatter'];
         activeVoidCurses['void_null_protocol'] = pool[Math.floor(Math.random() * pool.length)];
       }
       if (state.relics.includes('void_eclipse_curse')) {
         const pool = ['curse_uplift', 'curse_tolls'];
         activeVoidCurses['void_eclipse_curse'] = pool[Math.floor(Math.random() * pool.length)];
       }

       let targetScore = TARGET_SCORES[Math.min(nextRound - 1, TARGET_SCORES.length - 1)];
       if (activeVoidCurses['void_eclipse_curse'] === 'curse_uplift') {
          targetScore = Math.floor(targetScore * (1.35 + Math.random() * 0.25));
       }

       return {
         ...state,
         status: nextStatus,
         round: nextRound,
         blind: nextBlind,
         bossPhase: nextBossPhase,
         targetScore: targetScore,
         currentRoundScore: 0,
         rollsLeft: totalRolls,
         activeDirective: generateDirective(nextRound),
         lastHandInfo: null,
         activeVoidCurses,
         // Resurrect shattered/destroyed dice when starting new round
         dice: state.dice.map((d, idx) => (d.material === 'glass' && d.destroyed ? d : nextBossPhase === 'the_black_hole' && idx === 4 ? { ...d, destroyed: true, locked: false } : { ...d, destroyed: false, locked: false }))
       }
    }

    case 'UNLOCK_DICE_SET': {
       if (state.gold < action.cost || state.unlockedDiceSets.includes(action.id)) return state;
       return {
          ...state,
          gold: state.gold - action.cost,
          unlockedDiceSets: [...state.unlockedDiceSets, action.id]
       };
    }

    case 'SELECT_DICE_SET': {
       if (!state.unlockedDiceSets.includes(action.id)) return state;
       return {
          ...state,
          selectedDiceSet: action.id
       };
    }

    case 'START_BOSS': {
        return { ...state, status: 'playing', rollsLeft: state.bossPhase === 'the_wall' ? Math.min(state.rollsLeft, 2) : state.rollsLeft };
        }
        case 'BUY_CONSUMABLE': {
          if (state.gold < action.cost) return state;
          const currentConsumables = state.consumables || [];
          if (currentConsumables.length >= 2) return state;
          return {
            ...state,
            gold: state.gold - action.cost,
            consumables: [...currentConsumables, action.id]
          };
        }
        case 'USE_CONSUMABLE': {
          const currentConsumables = state.consumables || [];
          if (!currentConsumables.includes(action.id)) return state;
          let updatedDice = state.dice;
          let updatedHandLevels = state.handLevels;
          const idx = currentConsumables.indexOf(action.id);
          const newConsumables = [...currentConsumables];
          if (idx > -1) {
            newConsumables.splice(idx, 1);
          }
          if (action.id === 'hack_rewrite.exe' && action.targetDieId && action.chosenValue) {
            updatedDice = state.dice.map(d => d.id === action.targetDieId ? { ...d, value: action.chosenValue! } : d);
          } 
          else if (action.id === 'overclock.sys' && action.targetDieId) {
            const handName = action.targetDieId;
            const handLvl = state.handLevels[handName];
            if (handLvl) {
              updatedHandLevels = {
                ...state.handLevels,
                [handName]: {
                  level: handLvl.level + 1,
                  basePoints: handLvl.basePoints + 15,
                  baseMult: handLvl.baseMult + 2
                }
              };
            }
          } 
          else if (action.id === 'clone_val.bak' && action.targetDieId && action.targetDieId2) {
            const sourceDie = state.dice.find(d => d.id === action.targetDieId);
            if (sourceDie) {
              updatedDice = state.dice.map(d => d.id === action.targetDieId2 ? { ...d, value: sourceDie.value } : d);
            }
          }
          return {
            ...state,
            dice: updatedDice,
            handLevels: updatedHandLevels,
            consumables: newConsumables
          };
        }
        case 'UPGRADE_DICE_MATERIAL': {
          if (state.gold < action.cost) return state;
          let targetId = action.diceId;
          if (!targetId) {
            const opts = state.dice.filter(d => d.material !== action.material && !d.destroyed);
            if (opts.length === 0) return state;
            targetId = opts[Math.floor(Math.random() * opts.length)].id;
          } else {
            const t = state.dice.find(d => d.id === targetId);
            if (!t || t.destroyed) return state;
          }
          return {
            ...state,
            gold: state.gold - action.cost,
            // aplicar um material substitui o anterior no dado escolhido
            dice: state.dice.map(d => d.id === targetId ? { ...d, material: action.material } : d)
          };
        }

        case 'ENTER_META_LAB': {
          return {
            ...state,
            status: 'meta_lab'
          };
        }

        case 'LEAVE_META_LAB': {
          return {
            ...state,
            status: 'menu'
          };
        }

        case 'BUY_META_UPGRADE': {
          const currentMeta = state.metaShards || 0;
          if (currentMeta < action.shardCost) return state;
          const nextUpgrades = {
            ...(state.metaUpgrades || defaultMetaUpgrades),
            ...action.upgradesPatch
          };
          const nextShards = currentMeta - action.shardCost;
          saveMetaState(nextShards, state.unlockedDiceSets, nextUpgrades);
          return {
            ...state,
            metaShards: nextShards,
            metaUpgrades: nextUpgrades
          };
        }

        case 'UNLOCK_META_COSMETIC_SET': {
          const currentMeta = state.metaShards || 0;
          if (currentMeta < action.shardCost || state.unlockedDiceSets.includes(action.setId)) return state;
          const nextUnlocked = [...state.unlockedDiceSets, action.setId];
          const nextShards = currentMeta - action.shardCost;
          saveMetaState(nextShards, nextUnlocked, state.metaUpgrades || defaultMetaUpgrades);
          return {
            ...state,
            metaShards: nextShards,
            unlockedDiceSets: nextUnlocked
          };
        }

        case 'REFRESH_META_FROM_STORAGE': {
          const reloaded = loadMetaState();
          return {
            ...state,
            metaShards: reloaded.shards,
            unlockedDiceSets: reloaded.unlockedDice,
            metaUpgrades: reloaded.upgrades
          };
        }

        case 'SAVE_AND_QUIT': {
          let nextMetaShards = state.metaShards || 0;
          const scoreShards = Math.floor(state.totalScore / 120);
          const goldShards = Math.max(0, state.gold);
          nextMetaShards += (scoreShards + goldShards);
          
          saveMetaState(nextMetaShards, state.unlockedDiceSets, state.metaUpgrades || defaultMetaUpgrades);

          try {
            const savedHistory = localStorage.getItem('crown_of_sixes_history');
            const runs = savedHistory ? JSON.parse(savedHistory) : [];
            runs.push({
              score: state.totalScore,
              round: state.round,
              status: 'quit',
              date: new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            });
            localStorage.setItem('crown_of_sixes_history', JSON.stringify(runs));
          } catch (e) {
            console.error("Error logging run history", e);
          }

          return {
            ...state,
            status: 'menu',
            metaShards: nextMetaShards,
            // reset status and active variables safely
            currentRoundScore: 0,
            lastHandInfo: null
          };
        }

        default:
          return state;
      }
    }

    const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

    export function GameProvider({ children }: { children: ReactNode }) {
      const [state, dispatch] = useReducer(reducer, null, () => {
        const meta = loadMetaState();
        return {
          ...initialState,
          unlockedDiceSets: meta.unlockedDice,
          metaShards: meta.shards,
          metaUpgrades: meta.upgrades
        };
      });
      return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
    }

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
