// Shared global namespace for all Ashen Kennel modules (classic scripts, no bundler).
window.AK = window.AK || {
  core: {},
  systems: {},
  entities: {},
  world: {},
  ui: {},
  config: {
    // Tunable constants shared across modules.
    PLAYER_WALK_SPEED: 1.85,
    PLAYER_RUN_SPEED: 4.1,
    PLAYER_CROUCH_SPEED: 1.1,
    STAMINA_MAX: 100,
    STAMINA_DRAIN_PER_SEC: 16,
    STAMINA_REGEN_PER_SEC: 11,
    STAMINA_REGEN_DELAY: 0.9,
    FEAR_MAX: 100,
    PS1_INTERNAL_HEIGHT: 240,
  }
};
