// Constantes do mundo do vilarejo.
// Escala aproximada: 1 unidade ≈ 1 metro. Uma pessoa tem ~1.7m de olhos.
export const CELL = 4; // largura de uma célula do grid (rua) em unidades
export const WALL_H = 3.2; // altura das paredes (casa de um pavimento)
export const ROOF_H = 2.0; // altura do telhado (do beiral até a cumeeira)
export const EYE_H = 1.7; // altura dos olhos do jogador
export const ROOF_OVER = 0.6; // beiral do telhado sobre a rua
export const ROOF_DEPTH = 2; // quantas células o telhado cobre p/ dentro da casa
export const FASCIA = 0.35; // espessura da borda de palha no beiral

// portas e janelas em tamanho humano (metros)
export const DOOR_W = 1.2;
export const DOOR_H = 2.1;
export const WIN_W = 1.0;
export const WIN_H = 1.0;
export const WIN_Y = 1.85; // altura do centro da janela

// tempos de animação (ms)
export const MOVE_MS = 260;
export const TURN_MS = 210;

// neblina
export const FOG_COLOR = 0x8790a0;

// ciclo dia/noite (só em locais externos: vila e floresta)
export const DAY_MS = 240000; // duração de um ciclo completo dia→noite (4 min)
export const DAY_START = 0.34; // fase inicial do dia [0,1): 0.34 ≈ meio da manhã
