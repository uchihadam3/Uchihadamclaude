// RELÍQUIAS DO ACASO — namespace global (scripts clássicos, sem bundler).
window.RA = window.RA || {
  core: {}, gfx: {}, audio: {}, data: {}, game: {}, ui: {},
  config: {
    SAVE_KEY: 'reliquias_do_acaso_v1',
    MAX_ROLLS: 3,
    PARTY_SIZE: 5,
    DOWN_TURNS: 2,     // turnos para reviver herói caído
    DEATHS_PERMANENT: 3 // quedas na run até morte definitiva
  }
};
