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
    VIEW_W_TILES: 16,
    VIEW_H_TILES: 14,
    get INTERNAL_W() { return this.TILE * this.VIEW_W_TILES; }, // 256
    get INTERNAL_H() { return this.TILE * this.VIEW_H_TILES; }, // 224
    WALK_SPEED: 2.1,   // tiles/sec
    RUN_SPEED: 3.6
  }
};
