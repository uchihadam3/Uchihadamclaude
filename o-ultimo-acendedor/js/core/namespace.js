// Namespace global compartilhado por todos os módulos (scripts clássicos,
// sem bundler — mesmo padrão dos outros projetos deste repositório).
window.LK = window.LK || {
  core: {},
  gfx: {},
  world: {},
  entities: {},
  audio: {},
  ui: {},
  config: {
    // Resolução interna adaptativa: recalculada no resize para preencher a
    // tela em qualquer aspecto (lição aprendida no Crônicas de Valdren).
    INTERNAL_H_TARGET: 360,   // altura interna alvo; largura segue o aspecto
    MAX_SCALE: 8,

    // Física do jogador (unidades: px internos / s)
    GRAVITY_RISE: 1500,
    GRAVITY_FALL: 2600,
    MAX_FALL: 620,
    RUN_ACCEL: 3800,
    RUN_DECEL: 4400,
    RUN_MAX: 210,
    JUMP_VEL: 470,
    JUMP_CUT_MULT: 0.42,      // soltar o pulo cedo corta a subida
    COYOTE_TIME: 0.1,
    JUMP_BUFFER: 0.13,
    DASH_SPEED: 560,
    DASH_TIME: 0.16,
    DASH_COOLDOWN: 0.45,

    // Combate
    ATTACK_TIME: 0.22,
    ATTACK_COOLDOWN: 0.32,
    ATTACK_RANGE: 52,
    HIT_PAUSE: 0.055,         // congelamento no impacto (game feel)
    POGO_VEL: 420,
    KNOCKBACK: 260,
    PLAYER_RECOIL: 130,
    INVULN_TIME: 1.1,

    PLAYER_MAX_HP: 5
  }
};
