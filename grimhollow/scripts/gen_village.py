# -*- coding: utf-8 -*-
"""
Planta do VILAREJO DE GRIMHOLLOW — cidade de CORREDOR.

A cidade deixou de ser uma praça larga com lojas na borda e virou uma trama de
RUAS ESTREITAS (1 célula) ligando alguns LARGOS. É o mesmo princípio da mata e do
desfiladeiro: você só vê uma fatia por vez — duas fachadas colando dos lados, uma
faixa de chão e uma fresta de céu — e é isso que faz o detalhe caber na tela.

Os largos são a respiração: a Praça do Portal (o arco), o Largo do Portão (quem
chega) e o Mercado. Todo o resto é rua apertada e beco sem saída terminando numa
porta.

Escrevo a planta de forma DECLARATIVA (trechos de rua + largos + portas) e o
script valida por BFS que dá p/ chegar em tudo: no portão da floresta, na boca da
masmorra e na frente de cada porta.

  python3 scripts/gen_village.py           # imprime o mapa e as constantes
  python3 scripts/gen_village.py --write   # regrava village.ts
"""
import re
import sys
from collections import deque
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
W, H = 21, 27

# --------------------------------------------------------------- traçado ----
# trechos retos de rua: (col0, lin0, col1, lin1) — inclusivos
RUAS = [
    (10, 23, 10, 25),   # Rua do Portão (entrada, sobe do sul)
    (10, 18, 10, 19),   # sobe do Largo do Portão
    (7, 18, 10, 18),    # dobra p/ oeste
    (7, 15, 7, 18),     # sobe rumo à Praça do Portal
    (8, 9, 8, 10),      # sai da praça pelo norte
    (8, 9, 14, 9),      # Rua do Mercado (p/ leste)
    (14, 5, 14, 6),     # sobe do Mercado
    (4, 5, 14, 5),      # Rua Alta (a mais ao norte, corre no pé da montanha)
    (4, 4, 4, 4),       # boca do túnel
    # becos sem saída — cada um morre numa porta
    (12, 21, 13, 21),   # beco da Taverna (leste do Largo do Portão)
    (4, 12, 5, 12),     # beco da Armaria (oeste da Praça do Portal)
    (17, 12, 18, 12),   # beco da Costureira
    (17, 9, 17, 12),    # ...que sobe encostando no Mercado
]
# largos (respiro): (col0, lin0, col1, lin1)
LARGOS = [
    (9, 20, 11, 22),    # Largo do Portão — quem chega da floresta
    (6, 11, 9, 14),     # PRAÇA DO PORTAL — o arco fica no meio
    (13, 7, 16, 9),     # Mercado
]
MONTANHA = (1, 1, 6, 4)          # maciço a noroeste
TUNEL = [(4, 2), (4, 3)]         # túnel de masmorra
ESCADA = (4, 1)                  # 'S' — descida
PORTAO_MATA = (10, 26)           # 'F'
INICIO = (10, 24)                # 'P'

# ----------------------------------------------------------------- portas ---
# (col, lin) = célula do PRÉDIO; (dc, dr) = p/ que lado a porta olha.
# A célula da frente (col+dc, lin+dr) tem de ser rua.
LOJAS = [
    (14, 21, -1, 0, "tavern"),      # Taverna — fim do beco do Largo do Portão
    (8, 21, 1, 0, "store"),         # Armazém — no próprio Largo
    (3, 12, 1, 0, "armory"),        # ARMARIA (2 andares) — fim do beco oeste
    (6, 10, 0, 1, "alchemist"),     # Alquimista — dá na Praça do Portal
    (8, 4, 0, 1, "smith"),          # Ferraria — Rua Alta, sob a montanha
    (12, 4, 0, 1, "temple"),        # Templo da Chama Pálida — Rua Alta
]
CASAS = [
    (9, 19, 0, 1, "hedda"),         # casa da Hedda — dá no Largo do Portão
    (11, 19, 0, 1, "irmaos"),       # casa dos irmãos — do outro lado do Largo
    (19, 12, -1, 0, "elspethhome"), # casa da Elspeth — fim do beco leste
]

# ------------------------------------------------------------------ marcos --
ARCO = (7, 12)      # arco do Portal, dentro da Praça (bloqueia a célula)
BAU = (15, 8)       # baú de teste, no Mercado


def montar():
    g = [["#"] * W for _ in range(H)]
    mc0, mr0, mc1, mr1 = MONTANHA
    for c in range(mc0, mc1 + 1):
        for r in range(mr0, mr1 + 1):
            g[r][c] = "M"
    # a rua vem DEPOIS do maciço: a boca do túnel é justamente um talho na rocha
    for c0, r0, c1, r1 in RUAS + LARGOS:
        for c in range(min(c0, c1), max(c0, c1) + 1):
            for r in range(min(r0, r1), max(r0, r1) + 1):
                g[r][c] = "."
    for c, r in TUNEL:
        g[r][c] = "T"
    g[ESCADA[1]][ESCADA[0]] = "S"
    g[PORTAO_MATA[1]][PORTAO_MATA[0]] = "F"
    g[INICIO[1]][INICIO[0]] = "P"
    return g


def anda(g, c, r):
    return 0 <= c < W and 0 <= r < H and g[r][c] in ".PTSFo"


def valida(g):
    ini = INICIO
    vis = {ini}
    fila = deque([ini])
    while fila:
        c, r = fila.popleft()
        for dc, dr in ((0, -1), (1, 0), (0, 1), (-1, 0)):
            n = (c + dc, r + dr)
            if n in vis or not anda(g, *n):
                continue
            vis.add(n)
            fila.append(n)
    faltou = []
    if PORTAO_MATA not in vis:
        faltou.append("portão da mata")
    if ESCADA not in vis:
        faltou.append("escada da masmorra")
    for c, r, dc, dr, nome in LOJAS + CASAS:
        if g[r][c] != "#":
            faltou.append(f"porta '{nome}' não está num prédio ({c},{r}={g[r][c]})")
        elif (c + dc, r + dr) not in vis:
            faltou.append(f"rua da porta '{nome}' inalcançável")
    livres = [(c, r) for r in range(H) for c in range(W) if anda(g, c, r)]
    ilhadas = [p for p in livres if p not in vis]
    if ilhadas:
        faltou.append(f"{len(ilhadas)} células livres ilhadas: {ilhadas[:6]}")
    assert not faltou, "PLANTA INVÁLIDA:\n  - " + "\n  - ".join(faltou)
    return len(vis)


def bloco(linhas):
    return "\n".join(f'  "{l}",' for l in linhas)


if __name__ == "__main__":
    g = montar()
    n = valida(g)
    linhas = ["".join(l) for l in g]
    print(f"# planta válida — {n} células de rua alcançáveis ({W}x{H})")
    print(bloco(linhas))
    print("\n# ---- constantes p/ o Game.ts ----")
    print("ESTAB_DOORS:")
    for c, r, dc, dr, k in LOJAS:
        print(f'  {{ c: {c}, r: {r}, dc: {dc}, dr: {dr}, kind: "{k}" }},')
    print("HOME_DOORS:")
    for c, r, dc, dr, k in CASAS:
        print(f'  {{ c: {c}, r: {r}, dc: {dc}, dr: {dr}, id: "{k}" }},')
    print(f"WELL (arco do Portal) = {{ c: {ARCO[0]}, r: {ARCO[1]} }}")
    print(f"BAÚ de teste = ({BAU[0]}, {BAU[1]})")

    if "--write" in sys.argv:
        p = RAIZ / "src" / "game" / "village.ts"
        txt = p.read_text(encoding="utf-8")
        novo = f"export const MAP: string[] = [\n{bloco(linhas)}\n];"
        txt2, k = re.subn(r"export const MAP: string\[\] = \[.*?\n\];", lambda _m: novo, txt, count=1, flags=re.S)
        assert k == 1, "não achei a constante MAP em village.ts"
        p.write_text(txt2, encoding="utf-8")
        print(f"\nvillage.ts: MAP regravado ({len(linhas)} linhas)")
