// Shared global namespace for all "Cronicas de Valdren" modules (classic
// scripts, no bundler - same pattern as the other projects in this repo).
window.RPG = window.RPG || {
  core: {},
  gfx: {},
  world: {},
  battle: {},
  data: {},
  ui: {},
  config: {
    TILE: 16,
    // INTERNAL_W/H are recomputed by Canvas.setup()/resize to fill whatever
    // screen shape the player has (tall phone vs. wide desktop) instead of
    // a fixed 256x224 letterboxed into a black frame. These starting
    // values are just the pre-resize default.
    INTERNAL_W: 256,
    INTERNAL_H: 224,
    MIN_TILES_VISIBLE: 9, // smaller screen dimension always shows at least this many tiles
    MAX_SCALE: 6,
    WALK_SPEED: 2.1,   // tiles/sec
    RUN_SPEED: 3.6
  }
};
