# -*- coding: utf-8 -*-
"""
Gera as PLANTAS do ATO III — "As Ruínas de Vaurstead" (andares 7, 8 e 9).

POR QUE UM GERADOR E NÃO ASCII NA MÃO. Os dois primeiros atos são CAVERNA: um
corredor cavado, que se desenha bem à mão porque não tem regra — é irregular de
propósito. O Ato III é uma CIDADE, e cidade tem regra: quarteirões, ruas que se
cruzam, casas com porta p/ a rua. Escrever isso à mão dá um desenho quase certo,
e "quase" numa grade de 44x40 é um beco sem saída que ninguém vê até jogar.

Aqui a regra é o código: as ruas são traçadas, os quarteirões são o que sobra, e
as casas são vazios abertos DENTRO do quarteirão com uma porta p/ a rua. Depois
uma BFS confere que a escada de saída, a de descida, todo inimigo e todo baú são
alcançáveis a partir do ponto onde o herói nasce. Se não forem, o script falha em
vez de gravar um mapa quebrado.

A leitura de "cidade morta" vem justamente de o desenho ser REGULAR e o conteúdo
não: as ruas são retas e limpas, e o que aconteceu ali está nos quarteirões —
uns abertos e vazios, outros desabados e sólidos.

  python3 scripts/gen_ruins.py            # imprime o bloco TS pronto p/ colar
"""
import random
from collections import deque

W, H = 44, 40

# ---- caracteres, os mesmos do dungeon.ts -----------------------------------
#  '#' pedra   '.' chão   'S' onde o herói nasce   'U' saída   'D' descida
#  'E' inimigo   'C' baú   'K' entulho (decalque)  'B' barril (célula livre)
#  'G' portão de grade   'X' parede ilusória   'Z' chefe


def vazio() -> list[list[str]]:
    return [["#"] * W for _ in range(H)]


def texto(g: list[list[str]]) -> list[str]:
    return ["".join(l) for l in g]


def alcancaveis(g: list[list[str]], inicio: tuple[int, int]) -> set[tuple[int, int]]:
    """BFS pelo que é andável. O portão 'G' conta como passagem (ele abre)."""
    vistos = {inicio}
    fila = deque([inicio])
    while fila:
        c, r = fila.popleft()
        for dc, dr in ((0, -1), (1, 0), (0, 1), (-1, 0)):
            nc, nr = c + dc, r + dr
            if not (0 <= nc < W and 0 <= nr < H) or (nc, nr) in vistos:
                continue
            if g[nr][nc] == "#":
                continue
            vistos.add((nc, nr))
            fila.append((nc, nr))
    return vistos


def confere(g: list[list[str]], nome: str) -> None:
    """Falha alto se algo do mapa ficou ilhado — é o que a mão erra e o olho não vê."""
    achar = lambda ch: [(c, r) for r in range(H) for c in range(W) if g[r][c] == ch]
    ini = achar("S")
    if len(ini) != 1:
        raise SystemExit(f"{nome}: precisa de exatamente um 'S' (achei {len(ini)})")
    ok = alcancaveis(g, ini[0])
    faltando = []
    for ch in "UDECGXZ":
        for p in achar(ch):
            if p not in ok:
                faltando.append(f"{ch}@{p}")
    if faltando:
        raise SystemExit(f"{nome}: ilhado -> {', '.join(faltando)}")
    # A DESCIDA ('D') tem a boca desenhada na face NORTE — o Game pula essa face e
    # põe ali o arco da rampa. Se houver chão do outro lado, o arco fica flutuando
    # no meio da rua. Por isso: rocha ao norte do 'D', e chegada pelo SUL.
    for c, r in achar("D"):
        if g[r - 1][c] != "#":
            raise SystemExit(f"{nome}: D@({c},{r}) sem rocha ao norte (o arco da rampa é feito ali)")
        if g[r + 1][c] == "#":
            raise SystemExit(f"{nome}: D@({c},{r}) sem chegada pelo sul")
    print(f"  {nome}: ok — {len(ok)} células andáveis, "
          f"{len(achar('E'))} inimigos, {len(achar('C'))} baús")


# ============================================================================
# A CIDADE — ruas em grade, quarteirões no que sobra, casas dentro deles.
# ============================================================================
def cidade(
    ruas_h: list[int], ruas_v: list[int], borda: tuple[int, int, int, int],
    seed: int, densidade_casa: float, inimigos: int,
) -> list[list[str]]:
    r0, r1, c0, c1 = borda
    rng = random.Random(seed)
    g = vazio()

    # ---- as RUAS. Cada uma é uma faixa contínua de ponta a ponta: é o que
    # ---- garante que a cidade inteira é um só lugar, sem precisar de sorte.
    for r in ruas_h:
        for c in range(c0, c1 + 1):
            g[r][c] = "."
    for c in ruas_v:
        for r in range(r0, r1 + 1):
            g[r][c] = "."

    # ---- os QUARTEIRÕES: o retângulo entre duas ruas seguidas.
    hs = sorted(ruas_h)
    vs = sorted(ruas_v)
    faixas_r = [(hs[i] + 1, hs[i + 1] - 1) for i in range(len(hs) - 1)]
    faixas_c = [(vs[i] + 1, vs[i + 1] - 1) for i in range(len(vs) - 1)]

    casas: list[tuple[int, int, int, int]] = []
    for a, b in faixas_r:
        for x, y in faixas_c:
            if b - a < 2 or y - x < 2:
                continue                       # quarteirão fino demais p/ ter casa
            if rng.random() > densidade_casa:
                continue                       # quarteirão DESABADO: fica sólido
            # o vazio da casa deixa uma parede de 1 célula p/ a rua — é essa
            # parede que faz a porta ser porta, e não um vão qualquer
            ia, ib = a + 1, b - 1
            ix, iy = x + 1, y - 1
            if ib < ia or iy < ix:
                continue
            for r in range(ia, ib + 1):
                for c in range(ix, iy + 1):
                    g[r][c] = "."
            # a PORTA: abre a parede da casa numa das quatro faces, sorteada
            face = rng.choice("NSLO")
            if face == "N":
                g[a][rng.randint(ix, iy)] = "."
            elif face == "S":
                g[b][rng.randint(ix, iy)] = "."
            elif face == "L":
                g[rng.randint(ia, ib)][y] = "."
            else:
                g[rng.randint(ia, ib)][x] = "."
            casas.append((ia, ib, ix, iy))

    # ---- ENTULHO nas ruas ('K' é decalque no chão, não bloqueia)
    livres_rua = [(c, r) for r in range(r0, r1 + 1) for c in range(c0, c1 + 1)
                  if g[r][c] == "." and (r in ruas_h or c in ruas_v)]
    for c, r in rng.sample(livres_rua, min(14, len(livres_rua))):
        g[r][c] = "K"

    return g, casas, rng


def povoa(g, casas, rng, inimigos: int, baus: int, r0, r1, c0, c1) -> None:
    """Espalha inimigos pelas ruas e baús dentro das casas."""
    ruas = [(c, r) for r in range(r0, r1 + 1) for c in range(c0, c1 + 1) if g[r][c] == "."]
    postos: list[tuple[int, int]] = []
    rng.shuffle(ruas)
    for c, r in ruas:
        # espaçamento mínimo: dois inimigos colados viram uma parede de dano
        if all(abs(c - pc) + abs(r - pr) >= 4 for pc, pr in postos):
            postos.append((c, r))
            if len(postos) >= inimigos:
                break
    for c, r in postos:
        g[r][c] = "E"
    # baús: no fundo das casas abertas (recompensa por entrar, não por passar)
    rng.shuffle(casas)
    for ia, ib, ix, iy in casas[:baus]:
        g[ib][iy] = "C"


# ---- ANDAR 7 · a Porta Oeste ------------------------------------------------
# Grade LARGA: avenidas de uma célula e quarteirões grandes. É a primeira coisa
# que o jogador vê do Ato III, e tem de ler como CIDADE à primeira olhada.
def floor7() -> list[str]:
    r0, r1, c0, c1 = 4, 35, 4, 39
    g, casas, rng = cidade(
        ruas_h=[4, 12, 20, 28, 35], ruas_v=[4, 13, 22, 31, 39],
        borda=(r0, r1, c0, c1), seed=703, densidade_casa=0.72, inimigos=0,
    )
    povoa(g, casas, rng, inimigos=15, baus=4, r0=r0, r1=r1, c0=c0, c1=c1)
    # a PORTA NORTE: por onde se entra (vindo da mata ou do portal) e se sai.
    g[4][22] = "U"
    g[5][22] = "S"
    # a DESCIDA: no fundo de uma CISTERNA no quarteirão sudeste. Fica escondida de
    # propósito — a rua principal atravessa a cidade inteira sem passar por ela.
    for c in range(34, 38):
        g[30][c] = "#"                  # a tampa da cisterna: é nela que o arco é feito
    for r in range(31, 35):
        for c in range(34, 38):
            g[r][c] = "."
    g[31][35] = "D"                     # rocha ao norte (g[30][35]) e chegada pelo sul
    g[33][36] = "K"
    porta_cisterna(g, 35, 35)
    limpa_perto(g, [(22, 4), (22, 5), (21, 5), (23, 5), (35, 32), (35, 33)])
    return texto(g)


def porta_cisterna(g, col: int, row_rua: int) -> None:
    """Liga a cisterna à rua logo abaixo dela (a rua já existe; abre a parede)."""
    g[row_rua - 1][col] = "."


def limpa_perto(g, celulas) -> None:
    """Tira inimigo colado em escada/porta — nascer dentro de um golpe é injusto."""
    for c, r in celulas:
        for dc in (-1, 0, 1):
            for dr in (-1, 0, 1):
                if 0 <= r + dr < H and 0 <= c + dc < W and g[r + dr][c + dc] == "E":
                    g[r + dr][c + dc] = "."


# ---- ANDAR 8 · as Ruas de Baixo ---------------------------------------------
# A cidade AFUNDOU: a grade é mais apertada, os quarteirões menores e quase todos
# desabados. Aqui entra o portão de grade e a parede ilusória.
def floor8() -> list[str]:
    r0, r1, c0, c1 = 4, 35, 4, 39
    g, casas, rng = cidade(
        ruas_h=[4, 10, 16, 22, 28, 35], ruas_v=[4, 11, 18, 25, 32, 39],
        borda=(r0, r1, c0, c1), seed=811, densidade_casa=0.55, inimigos=0,
    )
    povoa(g, casas, rng, inimigos=16, baus=3, r0=r0, r1=r1, c0=c0, c1=c1)
    g[4][22] = "U"
    for r in range(5, 10):
        g[r][22] = "."                  # o beco que desce da porta até a primeira rua
    g[5][22] = "S"
    # a DESCIDA p/ o Salão: uma escadaria murada saindo da rua do sul
    for r in range(31, 35):
        for c in range(20, 25):
            g[r][c] = "."
    for r in range(29, 31):
        for c in range(20, 25):
            g[r][c] = "#"
    g[31][22] = "D"
    g[33][21] = "K"
    # ---- o COFRE MURADO: um vão sem porta no canto sudeste, alcançável só pela
    # ---- parede ilusória — e com um portão de grade guardando o outro lado.
    for r in range(30, 34):
        for c in range(34, 39):
            g[r][c] = "#"
    for r in range(31, 33):
        for c in range(35, 38):
            g[r][c] = "."
    g[31][36] = "C"
    g[32][36] = "C"
    g[32][34] = "X"                     # parede ILUSÓRIA: parece rocha, dá passagem
    g[32][33] = "."                     # e o corredor cego que leva até ela
    g[33][33] = "."
    g[34][33] = "."
    g[35][33] = "."                     # desemboca na rua do sul
    # sem portão de grade aqui de propósito: uma segunda entrada faria a parede
    # ilusória virar enfeite — quem achasse a grade nunca procuraria o resto.
    return texto(g)


# ---- ANDAR 9 · o Salão dos Doze ---------------------------------------------
# O chefe. Não é rua: é um SALÃO, com fileiras de colunas quebradas e o trono no
# fundo. Escrito à mão porque aqui a forma é a encenação, não uma regra.
FLOOR9 = [
    "############################################",
    "############################################",
    "############################################",
    "###################......###################",
    "###################..U...###################",
    "###################......###################",
    "###################..S...###################",
    "#####################.######################",
    "#####################.######################",
    "#################.....E....#################",
    "#################.E......E.#################",
    "#################....K.....#################",
    "#################.E......E.#################",
    "#################..........#################",
    "#####################.######################",
    "#######............................#########",
    "#######.##....##....##....##....##.#########",
    "#######.##....##....##....##....##.#########",
    "#######............................#########",
    "#######............................#########",
    "#######.##....##....##....##....##.#########",
    "#######.##....##....##....##....##.#########",
    "#######......K..............K......#########",
    "#######............................#########",
    "#######.##....##....##....##....##.#########",
    "#######.##....##....##....##....##.#########",
    "#######............................#########",
    "#######.............Z..............#########",
    "#######............................#########",
    "#######.##....##....##....##....##.#########",
    "#######.##....##....##....##....##.#########",
    "#######............................#########",
    "#######............................#########",
    "#####################.######################",
    "##################.......###################",
    "##################.C.C.C.###################",
    "##################..###..###################",
    "##################...#...###################",
    "##################.......###################",
    "############################################",
]


def bloco_ts(nome: str, titulo: str, linhas: list[str]) -> str:
    corpo = "\n".join(f'  "{l}",' for l in linhas)
    return f"// {titulo}\nconst {nome}: string[] = [\n{corpo}\n];\n"


def main() -> None:
    print("validando…")
    f7 = floor7()
    f8 = floor8()
    for nome, m in (("FLOOR7", f7), ("FLOOR8", f8), ("FLOOR9", FLOOR9)):
        g = [list(l) for l in m]
        if len(m) != H or any(len(l) != W for l in m):
            raise SystemExit(f"{nome}: dimensão errada ({len(m)}x{len(m[0])}, esperado {H}x{W})")
        confere(g, nome)
    print()
    print(bloco_ts("FLOOR7", "---- ANDAR 7 · Vaurstead, a Porta Oeste ----", f7))
    print(bloco_ts("FLOOR8", "---- ANDAR 8 · As Ruas de Baixo ----", f8))


if __name__ == "__main__":
    main()
