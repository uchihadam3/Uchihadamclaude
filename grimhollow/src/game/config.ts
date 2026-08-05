// Constantes do mundo do vilarejo.
// Escala aproximada: 1 unidade ≈ 1 metro. Uma pessoa tem ~1.7m de olhos.
export const CELL = 4; // largura de uma célula do grid (rua) em unidades
// Altura das casas da cidade. DOIS PAVIMENTOS: numa cidade de rua estreita é a
// altura que fecha o enquadramento — os telhados convergem e o céu vira uma
// fresta, que é o que faz a rua parecer corredor e não um pátio comprido.
export const WALL_H = 5.6;
// divisa entre o térreo e o andar de cima (onde passa a cinta de enxaimel)
export const ANDAR_H = 2.9;
export const ROOF_H = 2.0; // altura do telhado (do beiral até a cumeeira)
export const EYE_H = 1.7; // altura dos olhos do jogador
export const ROOF_OVER = 0.6; // beiral do telhado sobre a rua
export const ROOF_DEPTH = 2; // quantas células o telhado cobre p/ dentro da casa
export const FASCIA = 0.35; // espessura da borda de palha no beiral

// portas e janelas em tamanho humano (metros)
// o PNG da porta inclui a moldura de pedra, então o decalque é maior que o vão
// A arte da porta (dec_door.png) foi recortada até o conteúdo (sem margem
// transparente) → o quad é a própria porta e ela ENCOSTA no chão. Largura casada
// com a proporção real da arte (~0.80) p/ não esticar.
export const DOOR_W = 2.16;
export const DOOR_H = 2.7;
export const WIN_W = 1.0;
export const WIN_H = 1.0;
export const WIN_Y = 1.85; // altura do centro da janela

// tempos de animação (ms)
export const MOVE_MS = 260;
export const TURN_MS = 210;

// neblina
export const FOG_COLOR = 0x8790a0;

// ciclo dia/noite (só em locais externos: vila e floresta)
// ciclo LONGO (10 min) p/ cada fase — amanhecer, dia, entardecer, anoitecer —
// durar o bastante p/ ser percebida com naturalidade (transição gradual).
export const DAY_MS = 600000; // duração de um ciclo completo dia→noite (10 min)
export const DAY_START = 0.34; // fase inicial do dia [0,1): 0.34 ≈ meio da manhã

/**
 * A célula (col,row) existe numa grade de `cols`×`rows`?
 *
 * Os mapas todos tinham este guarda escrito à mão, e todos com o mesmo furo:
 * `NaN < 0` é falso e `NaN >= rows` também, então uma coordenada não-finita
 * passava pelos quatro testes e ia parar no `MAPA[NaN][NaN]` — que estoura com
 * "Cannot read properties of undefined". Como isso acontece DENTRO do laço de
 * quadro, o efeito é o pior possível: o jogo continua desenhando e para de
 * pensar.
 *
 * `Number.isInteger` fecha os três casos de uma vez — NaN, infinito e fração —,
 * e é exatamente a regra que uma coordenada de grade tem de obedecer.
 */
export function dentroDaGrade(col: number, row: number, cols: number, rows: number): boolean {
  return Number.isInteger(col) && Number.isInteger(row)
    && col >= 0 && col < cols && row >= 0 && row < rows;
}
