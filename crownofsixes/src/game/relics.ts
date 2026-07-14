import { RelicDef } from '../types/game';

export const RELICS_DB: RelicDef[] = [
  {
    id: 'crimson_core',
    name: 'Crimson Core',
    description: 'Each 6 rolled grants +x1 Multiplier to the final hand score.',
    icon: 'Hexagon', // We will map these string IDs to Lucide icons
    rarity: 'rare',
    synergySet: 'cyber_set'
  },
  {
    id: 'rift_eye',
    name: 'Rift Eye',
    description: 'Start each round with +1 Roll if any die has >50% Corruption.',
    icon: 'Eye',
    rarity: 'rare',
    synergySet: 'cyber_set'
  },
  {
    id: 'rewritten_law',
    name: 'Rewritten Law',
    description: '1s are treated as 6s during scoring.',
    icon: 'Scroll',
    rarity: 'epic',
    synergySet: 'alchemist_set'
  },
  {
    id: 'unstable_reactor',
    name: 'Unstable Reactor',
    description: '+x3 global Multiplier, but dice gain double Corruption per round.',
    icon: 'Zap',
    rarity: 'legendary'
  },
  {
    id: 'pure_heart',
    name: 'Pure Heart',
    description: 'Cleanses 10 Corruption from all dice each round, but -x1 Multiplier.',
    icon: 'Heart',
    rarity: 'common',
    synergySet: 'alchemist_set'
  },
  {
    id: 'gamblers_fallacy',
    name: "Gambler's Fallacy",
    description: 'If your hand is a "Solo Die" (no combos), gain +x4 Multiplier.',
    icon: 'Spade', // Using placeholder string, will map to Lucide
    rarity: 'common'
  },
  {
    id: 'loaded_dice',
    name: 'Loaded Dice',
    description: 'The first die always rolls a 6.',
    icon: 'Dices',
    rarity: 'epic'
  },
  {
    id: 'echo_shard',
    name: 'Echo Shard',
    description: 'Doubles give an extra +x0.5 Multiplier.',
    icon: 'Copy',
    rarity: 'common'
  },
  {
    id: 'chaos_engine',
    name: 'Chaos Engine',
    description: 'Randomly adds between -x1 and +x4 Multiplier to every hand.',
    icon: 'Activity',
    rarity: 'epic'
  },
  {
    id: 'corrupt_deal',
    name: 'Corrupt Deal',
    description: '+2 Rolls per round, but all dice start with +20 Corruption instantly.',
    icon: 'Skull',
    rarity: 'rare'
  },
  {
    id: 'golden_fleece',
    name: 'Golden Fleece',
    description: 'Increases base score by +50 for any Sequence.',
    icon: 'Star',
    rarity: 'rare'
  },
  {
    id: 'blood_diamond',
    name: 'Blood Diamond',
    description: 'Each corrupted or unstable die in the final hand adds +20 Base Score.',
    icon: 'Gem',
    rarity: 'epic'
  },
  {
    id: 'hollow_crown',
    name: 'Hollow Crown',
    description: '+x5 Multiplier if you submit on your very last roll.',
    icon: 'Crown',
    rarity: 'legendary'
  },
  {
    id: 'magnetic_core',
    name: 'Magnetic Core',
    description: 'All 2s and 3s are treated as 4s.',
    icon: 'Magnet',
    rarity: 'epic'
  },
  {
    id: 'six_shooters',
    name: 'Six Shooters',
    description: 'All 6s add their value twice (12 points) to the base score.',
    icon: 'Hexagon',
    rarity: 'rare'
  },
  {
    id: 'joker_card',
    name: 'The Joker',
    description: 'If your hand has no duplicate dice, score Multiplier is doubled.',
    icon: 'Star',
    rarity: 'legendary'
  },
  {
    id: 'grand_slam',
    name: 'Grand Slam',
    description: 'If all dice are the same, Base Score is increased by 200.',
    icon: 'Crown',
    rarity: 'legendary'
  },
  {
    id: 'golden_ticket',
    name: 'Golden Ticket',
    description: 'You get an extra $2 at the end of each round.',
    icon: 'Coins',
    rarity: 'rare'
  },
  {
    id: 'weighted_d20',
    name: 'Weighted D20',
    description: 'Quad gives x2 Multiplier.',
    icon: 'Dices',
    rarity: 'epic'
  },
  {
    id: 'phantom_shield',
    name: 'Phantom Shield',
    description: 'Reduces corruption gained from rolls by 10.',
    icon: 'Shield',
    rarity: 'rare'
  },
  {
    id: 'soul_reaper',
    name: 'Soul Reaper',
    description: 'If you score exactly the required amount, gain $10.',
    icon: 'Ghost',
    rarity: 'epic'
  },
  {
    id: 'sniper_scope',
    name: 'Sniper Scope',
    description: '+100 Base points for any Double, but x0.5 Multiplier.',
    icon: 'Crosshair',
    rarity: 'rare'
  },
  {
    id: 'hellfire_engine',
    name: 'Hellfire Engine',
    description: 'x4 Multiplier, but all dice gain +50 Corruption instantly when rolling.',
    icon: 'Flame',
    rarity: 'legendary'
  },
  {
    id: 'void_thruster',
    name: 'Void Thruster',
    description: 'Start with +1 Roll but -50 Base points to every hand.',
    icon: 'Rocket',
    rarity: 'common'
  },
  {
    id: 'broken_matrix',
    name: 'Broken Matrix',
    description: 'Full Chamber gives insane x6 Multiplier.',
    icon: 'Activity',
    rarity: 'legendary'
  },
  {
    id: 'cybernetic_eye',
    name: 'Cybernetic Eye',
    description: 'All 5s are treated as 6s.',
    icon: 'Eye',
    rarity: 'epic'
  },
  {
    id: 'plasma_blade',
    name: 'Plasma Blade',
    description: 'Sequence pays double Base Score.',
    icon: 'Zap',
    rarity: 'rare'
  },
  {
    id: 'corrupted_protocol',
    name: 'Corrupted Protocol',
    description: 'Unstable Dice (>75 Corruption) give x2 Multiplier instead of being bad.',
    icon: 'Skull',
    rarity: 'epic'
  },
  {
    id: 'ascension_catalyst',
    name: 'Ascension Catalyst',
    description: 'Dice gain experience 3x faster towards Ascension.',
    icon: 'Star',
    rarity: 'rare'
  },
  {
    id: 'neon_heart',
    name: 'Neon Heart',
    description: 'Cleanse 5 Corruption whenever you buy a relic.',
    icon: 'Heart',
    rarity: 'common'
  },
  {
    id: 'void_grave_shard',
    name: 'Grave Shard',
    description: 'Grants colossal +x8 global Mult, but subjects you to a random high-tier curse each round: either unable to lock dice, losing $1 per roll, or -60 base points.',
    icon: 'Skull',
    rarity: 'void',
    synergySet: 'void_set'
  },
  {
    id: 'void_singularity_eye',
    name: 'Singularity Eye',
    description: 'Adds astronomical +300 Base Points to all hands, but triggers a random feedback curse: either high corruption surges (+20% avg) or -x4 Mult on non-sequences.',
    icon: 'Eye',
    rarity: 'void',
    synergySet: 'void_set'
  },
  {
    id: 'void_null_protocol',
    name: 'Null Protocol',
    description: 'Combinations are scored with standard mult augmented by +4x, but causes random dice to jam (lock automatically) OR renders them with a 10% self-destruct rate.',
    icon: 'Zap',
    rarity: 'void',
    synergySet: 'void_set'
  },
  {
    id: 'void_eclipse_curse',
    name: 'Curse of Eclipse',
    description: 'Doubles final hand score if you submit exactly two 6s, but increases the target score of any subsequent blinds by a random +35% to +60%!',
    icon: 'Flame',
    rarity: 'void',
    synergySet: 'void_set'
  }
];

export function getRelicDef(id: string): RelicDef {
  return RELICS_DB.find(r => r.id === id) || RELICS_DB[0];
}
