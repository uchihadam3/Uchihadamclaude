# -*- coding: utf-8 -*-
"""
Gerador dos mapas EXTERNOS no formato de DUNGEON CRAWLER clássico: só CORREDORES.

Nada de campo aberto — tanto a Mata Sussurrante quanto a Planície de Arden são
labirintos/trilhas de 1 célula de largura, com "paredes" feitas de árvores,
arbustos e escarpas de pedra (todos COM COLISÃO).

  python3 scripts/gen_outdoor.py          # imprime os dois blocos TS
  python3 scripts/gen_outdoor.py --write   # regrava forest.ts e plains.ts

Determinístico (semente fixa): rodar de novo dá exatamente o mesmo mapa.
"""
import random
import re
import sys
from collections import deque
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------- utilidades
def bfs(inicio, andavel, W, H):
    """Distâncias a partir de `inicio` (4-vizinhança)."""
    dist = {inicio: 0}
    fila = deque([inicio])
    while fila:
        c, r = fila.popleft()
        for dc, dr in ((0, -1), (1, 0), (0, 1), (-1, 0)):
            n = (c + dc, r + dr)
            if n in dist or not (0 <= n[0] < W and 0 <= n[1] < H):
                continue
            if not andavel(*n):
                continue
            dist[n] = dist[(c, r)] + 1
            fila.append(n)
    return dist


def caminho(dist, destino, andavel, W, H):
    """Reconstrói o caminho mais curto até `destino` a partir do mapa de distâncias."""
    if destino not in dist:
        return None
    out = [destino]
    atual = destino
    while dist[atual] > 0:
        for dc, dr in ((0, -1), (1, 0), (0, 1), (-1, 0)):
            n = (atual[0] + dc, atual[1] + dr)
            if dist.get(n, 1 << 30) == dist[atual] - 1:
                atual = n
                out.append(n)
                break
        else:
            return None
    return out[::-1]


# =============================================================== FLORESTA ====
# 35x50, LABIRINTO de corredores de 1 célula de largura com PAREDÕES DE ÁRVORE
# de 2 células de espessura (passo 3 na grade) — assim a mata veda de verdade,
# sem "frestas" entre troncos. O labirinto é "trançado" (boa parte dos becos sem
# saída vira atalho), então há vários caminhos: explorar não é sofrer.
FW, FH = 35, 50
F_COLS = list(range(2, 33, 3))   # 11 células: 2,5,...,32 (o 17 é a entrada)
F_ROWS = list(range(2, 48, 3))   # 16 células: 2,5,...,47 (o 47 é o 'P')


# ------------------------------------------------------------ povoar a mata
# A mata era o único lugar do jogo SEM UM ÚNICO INIMIGO: dava p/ atravessar dez
# minutos de labirinto sem nada acontecer, e o resultado é que ela virou só um
# corredor de passagem entre o vilarejo e o resto.
#
# TRÊS REGRAS, e todas são de desenho, não de código:
#
#  1. A TRILHA DE TERRA É QUASE SEGURA. Ela é o fio condutor — quem só quer
#     chegar na encruzilhada consegue com pouca briga. O perigo mora FORA dela,
#     na grama, e é isso que transforma explorar numa decisão em vez de um
#     imposto. Poucos bichos na trilha, e nenhum nas dez primeiras células.
#  2. BECO SEM SAÍDA TEM PRÊMIO. Depois da tranca reduzida sobram becos de
#     verdade; cada um que for fundo o bastante ganha um baú ou uma ossada. Beco
#     vazio ensina o jogador a não entrar em beco nenhum.
#  3. O APODRECIMENTO VEM DO OESTE. O Corvin, o lenhador, já diz na cidade:
#     "corto na encosta oeste, e de uns tempos p/ cá as árvores de lá adoecem do
#     PÉ p/ cima — a copa ainda verde e a raiz podre". As Raízes Podres nascem só
#     na metade oeste do mapa, que é a direção de Vaurstead. O jogador vê a
#     pista antes de ter como entendê-la.
#
#  'm' inimigo   'C' baú   ('E' aqui é o MARCO do leste, não inimigo — por isso
#  o bicho usa 'm'; trocar o marco quebraria a placa que já está escrita)
def povoa_mata(g, rnd, clareiras):
    def livre(c, r):
        return 0 <= c < FW and 0 <= r < FH and g[r][c] in ".fk"

    entrada = (17, FH - 3)
    longe_da_entrada = lambda c, r: abs(c - entrada[0]) + abs(r - entrada[1]) > 10

    # O BAÚ BLOQUEIA A CÉLULA (é assim na masmorra e continua sendo aqui), então
    # ele pode TAPAR UM CORREDOR — e esse defeito não aparece olhando o mapa: só
    # aparece com o jogador encurralado do outro lado. A primeira versão disto
    # ilhou 53 células e foi a validação que avisou.
    # Por isso cada baú é posto EM TESTE: com ele como parede, o mapa inteiro
    # ainda tem de ser alcançável a partir da entrada. Não sendo, ele vira ossada
    # (que é decoração e não bloqueia) e a clareira continua tendo o que mostrar.
    def cabe_bau(c, r):
        antes = g[r][c]
        g[r][c] = "C"
        anda = lambda cc, rr: 0 <= cc < FW and 0 <= rr < FH and g[rr][cc] in ".=fkmVP"
        alc = bfs(entrada, anda, FW, FH)
        total = sum(1 for rr in range(FH) for cc in range(FW) if anda(cc, rr))
        if len(alc) >= total:
            return True
        g[r][c] = antes
        return False

    # --- becos sem saída: célula livre com um único vizinho livre ---
    becos = []
    for r in range(2, FH - 2):
        for c in range(2, FW - 2):
            if g[r][c] != "." or not longe_da_entrada(c, r):
                continue
            viz = sum(1 for dc, dr in ((0, -1), (1, 0), (0, 1), (-1, 0)) if livre(c + dc, r + dr))
            if viz == 1:
                becos.append((c, r))
    rnd.shuffle(becos)
    for i, (c, r) in enumerate(becos[:14]):
        if i % 3 == 0 and cabe_bau(c, r):
            continue
        g[r][c] = "k"

    # --- clareiras: baú / acampamento / bicho grande, em rodízio ---
    for i, (c, r) in enumerate(clareiras):
        if not longe_da_entrada(c, r):
            continue
        vaos = [(c + dc, r + dr) for dc in (0, 1) for dr in (0, 1) if livre(c + dc, r + dr)]
        if len(vaos) < 3:
            continue
        if i % 3 == 0:
            if not cabe_bau(*vaos[0]):
                g[vaos[0][1]][vaos[0][0]] = "k"
            g[vaos[-1][1]][vaos[-1][0]] = "m"
        elif i % 3 == 1:
            g[vaos[0][1]][vaos[0][0]] = "k"
            for cc, rr in vaos[1:3]:
                g[rr][cc] = "m"
        else:
            g[vaos[len(vaos) // 2][1]][vaos[len(vaos) // 2][0]] = "m"

    # --- o resto dos bichos: MUITOS na grama, POUCOS na trilha ---
    grama = [(c, r) for r in range(2, FH - 2) for c in range(2, FW - 2)
             if g[r][c] in ".f" and longe_da_entrada(c, r)]
    trilha = [(c, r) for r in range(2, FH - 2) for c in range(2, FW - 2)
              if g[r][c] == "=" and longe_da_entrada(c, r)]
    rnd.shuffle(grama)
    rnd.shuffle(trilha)
    postos = []
    for lista, quantos, gap in ((grama, 18, 5), (trilha, 5, 9)):
        for c, r in lista:
            # espaçamento mínimo: dois bichos colados viram uma parede de dano,
            # e numa trilha de UMA célula de largura não há como contorná-los
            if all(abs(c - pc) + abs(r - pr) >= gap for pc, pr in postos):
                postos.append((c, r))
                g[r][c] = "m"
                quantos -= 1
                if quantos == 0:
                    break
    return postos


def gera_floresta(semente=20260803):
    rnd = random.Random(semente)
    nc, nr = len(F_COLS), len(F_ROWS)
    # ligações do labirinto: conj. de pares de células vizinhas conectadas
    ligado = set()

    def ligar(a, b):
        ligado.add((a, b))
        ligado.add((b, a))

    # --- DFS aleatório (labirinto perfeito) ---
    visit = {(0, nr - 1)}
    pilha = [(0, nr - 1)]
    # começa no canto, mas o herói entra pelo centro-sul; tanto faz p/ a topologia
    while pilha:
        i, j = pilha[-1]
        viz = [
            (i + di, j + dj)
            for di, dj in ((0, -1), (1, 0), (0, 1), (-1, 0))
            if 0 <= i + di < nc and 0 <= j + dj < nr and (i + di, j + dj) not in visit
        ]
        if not viz:
            pilha.pop()
            continue
        p = rnd.choice(viz)
        ligar((i, j), p)
        visit.add(p)
        pilha.append(p)

    # --- trança: becos sem saída viram atalhos (mata com laços, não um puzzle) ---
    for j in range(nr):
        for i in range(nc):
            grau = sum(1 for d in ((0, -1), (1, 0), (0, 1), (-1, 0)) if ((i, j), (i + d[0], j + d[1])) in ligado)
            if grau <= 1 and rnd.random() < 0.35:
                cand = [
                    (i + di, j + dj)
                    for di, dj in ((0, -1), (1, 0), (0, 1), (-1, 0))
                    if 0 <= i + di < nc and 0 <= j + dj < nr and ((i, j), (i + di, j + dj)) not in ligado
                ]
                if cand:
                    ligar((i, j), rnd.choice(cand))

    # a boca da mata tem que seguir EM FRENTE: quem entra pelo portão do vilarejo
    # dá o primeiro passo p/ o norte, não bate numa árvore e tem que rodear.
    i0, j0 = F_COLS.index(17), nr - 1
    ligar((i0, j0), (i0, j0 - 1))

    # --- pinta a grade ---
    g = [["T"] * FW for _ in range(FH)]
    for r in range(FH):
        for c in range(FW):
            if r < 2 or c < 2 or c > FW - 3 or r > FH - 3:
                g[r][c] = "#"

    def cel(i, j):
        return F_COLS[i], F_ROWS[j]

    for j in range(nr):
        for i in range(nc):
            c, r = cel(i, j)
            g[r][c] = "."
    for (a, b) in ligado:
        (ai, aj), (bi, bj) = a, b
        ac, ar = cel(ai, aj)
        bc, br = cel(bi, bj)
        # a passagem tem 2 células (o paredão é grosso): abre TODAS entre as duas
        for c in range(min(ac, bc), max(ac, bc) + 1):
            for r in range(min(ar, br), max(ar, br) + 1):
                g[r][c] = "."

    # --- clareiras: alarga algumas células p/ quebrar a monotonia do corredor ---
    # Elas nasceram só como alargamento e ficavam VAZIAS. Agora cada uma tem um
    # motivo p/ existir, alternado: baú, acampamento (ossada + dois bichos) ou um
    # bicho grande sozinho. Um vão de 2x2 numa curva sem nada dentro é uma promessa
    # que o mapa não cumpre.
    clareiras = []
    for _ in range(12):
        i, j = rnd.randrange(1, nc - 1), rnd.randrange(1, nr - 1)
        c, r = cel(i, j)
        for dc in (0, 1):
            for dr in (0, 1):
                g[r + dr][c + dc] = "."
        clareiras.append((c, r))

    # --- marcos ---
    pc, pr = F_COLS[F_COLS.index(17)], F_ROWS[-1]   # (17,47) — o mesmo ponto de sempre
    g[FH - 2][17] = "="                      # trecho do portão
    g[FH - 1][17] = "V"

    andavel = lambda c, r: 0 <= c < FW and 0 <= r < FH and g[r][c] in ".=VPsjNEWmC"
    dist = bfs((pc, pr), andavel, FW, FH)

    # pontas das trilhas — posições FIXAS (o mapa muda, os marcos não): norte no
    # meio da borda de cima, leste e oeste em alturas diferentes p/ espalhar.
    n_cel = (17, F_ROWS[0])                 # boca da trilha da Planície
    e_cel = (F_COLS[-1], F_ROWS[5])         # trilha do Charco
    w_cel = (F_COLS[0], F_ROWS[9])          # trilha das Ruínas
    j_cel = (17, F_ROWS[7])                 # encruzilhada no meio do mapa

    # trilha de terra ligando entrada → encruzilhada → cada ponta
    for alvo in (j_cel, n_cel, e_cel, w_cel):
        cam = caminho(dist, alvo, andavel, FW, FH)
        assert cam, f"sem caminho até {alvo}"
        for c, r in cam:
            g[r][c] = "="

    # placas ocupam PAREDE (elas bloqueiam): a face sólida no fim de cada trilha
    def placa(ch, cel_alvo, pref):
        c, r = cel_alvo
        for dc, dr in pref:
            nc_, nr_ = c + dc, r + dr
            if 0 <= nc_ < FW and 0 <= nr_ < FH and g[nr_][nc_] in "T#":
                g[nr_][nc_] = ch
                return (nc_, nr_)
        raise AssertionError(f"sem parede p/ a placa {ch}")

    placa("N", n_cel, [(0, -1), (-1, 0), (1, 0)])
    placa("E", e_cel, [(1, 0), (0, -1), (0, 1)])
    placa("W", w_cel, [(-1, 0), (0, -1), (0, 1)])
    placa("j", j_cel, [(1, 0), (-1, 0), (0, -1), (0, 1)])
    placa("s", (pc, pr - 2), [(1, 0), (-1, 0)])
    g[pr][pc] = "P"

    # --- vegetação/decoração ---
    for r in range(2, FH - 2):
        for c in range(2, FW - 2):
            ch = g[r][c]
            if ch == "T":
                x = rnd.random()
                g[r][c] = "T" if x < 0.86 else ("b" if x < 0.95 else "r")
            elif ch == ".":
                x = rnd.random()
                if x < 0.07:
                    g[r][c] = "f"
                elif x < 0.09:
                    g[r][c] = "k"

    povoa_mata(g, rnd, clareiras)

    linhas = ["".join(l) for l in g]

    # --- validação: tudo que importa continua alcançável a partir do 'P' ---
    # as placas (s/j/N/E/W) BLOQUEIAM: o que precisa ser alcançável é a célula
    # de trilha à frente delas, não a placa em si.
    def anda(c, r):
        # o BAÚ conta como PAREDE aqui de propósito: no jogo ele bloqueia a
        # célula (é assim na masmorra e continua sendo aqui), então validar com
        # ele andável deixaria passar um baú tapando um corredor — e o defeito só
        # apareceria com o jogador encurralado do outro lado.
        return 0 <= c < FW and 0 <= r < FH and linhas[r][c] in ".=fkVPm"

    d2 = bfs((pc, pr), anda, FW, FH)
    for nome, alvo in (("portão", (17, FH - 2)), ("norte", n_cel), ("leste", e_cel),
                       ("oeste", w_cel), ("encruzilhada", j_cel)):
        assert alvo in d2, f"floresta: '{nome}' inalcançável"
    livres = sum(1 for r in range(FH) for c in range(FW) if anda(c, r))
    assert len(d2) >= livres, f"floresta: {livres - len(d2)} células livres isoladas"
    return linhas


# ============================================================== PLANÍCIE =====
# 17x44, CORREDOR único e sinuoso rumo ao norte, entre escarpas. Alguns
# "bolsos" laterais sem saída guardam inimigos e ossadas.
PW, PH = 17, 44


def gera_planicie(semente=771):
    rnd = random.Random(semente)
    livre = set()
    col = 8
    r = 41
    livre.add((col, r))
    while r > 5:
        passo = rnd.randrange(2, 5)
        for _ in range(passo):
            if r <= 5:
                break
            r -= 1
            livre.add((col, r))
        # desvio lateral (o corredor serpenteia)
        if r > 6:
            alvo = max(3, min(13, col + rnd.choice([-4, -3, -2, 2, 3, 4])))
            passo_c = 1 if alvo > col else -1
            while col != alvo:
                col += passo_c
                livre.add((col, r))
    # reta final até o marco da montanha
    while col != 8:
        col += 1 if col < 8 else -1
        livre.add((col, r))
    for rr in range(2, r + 1):
        livre.add((8, rr))

    # alargamentos ocasionais (pequenas clareiras na beira da estrada)
    estrada = sorted(livre)
    for c, rr in estrada:
        if rnd.random() < 0.10:
            d = rnd.choice([-1, 1])
            if 2 <= c + d <= 14:
                livre.add((c + d, rr))

    # bolsos laterais sem saída
    bolsos = []
    for c, rr in estrada:
        if 8 < rr < 39 and rnd.random() < 0.07:
            d = rnd.choice([-1, 1])
            cel = []
            cc = c
            for _ in range(rnd.randrange(2, 4)):
                cc += d
                if not (2 <= cc <= 14):
                    break
                cel.append((cc, rr))
            if len(cel) >= 2:
                livre.update(cel)
                bolsos.append(cel[-1])

    g = [["#"] * PW for _ in range(PH)]
    for c, rr in livre:
        g[rr][c] = "."
    for c, rr in livre:
        if rr >= 2:
            g[rr][c] = "="
    g[41][8] = "S"
    g[42][8] = "V"
    g[2][8] = "M"

    # inimigos: nos bolsos e alguns na própria estrada
    for i, (c, rr) in enumerate(bolsos):
        g[rr][c] = "E" if i % 3 != 2 else "k"
    corredor = [(c, rr) for (c, rr) in sorted(livre) if 6 < rr < 39 and g[rr][c] == "="]
    for c, rr in rnd.sample(corredor, 8):
        g[rr][c] = "E"

    # paredes visíveis: escarpas e árvores até 2 células do corredor; o resto
    # fica '#' (nunca é visto, e economiza malha)
    def perto(c, r, d):
        for dc in range(-d, d + 1):
            for dr in range(-d, d + 1):
                cc, rr = c + dc, r + dr
                if 0 <= cc < PW and 0 <= rr < PH and (cc, rr) in livre:
                    return True
        return False

    for r in range(PH):
        for c in range(PW):
            if g[r][c] != "#" or not perto(c, r, 2):
                continue
            x = rnd.random()
            g[r][c] = "r" if x < 0.55 else ("T" if x < 0.9 else "b")

    # decoração no chão
    for c, rr in sorted(livre):
        if g[rr][c] == "=" and rnd.random() < 0.10:
            g[rr][c] = "f" if rnd.random() < 0.7 else "k"

    linhas = ["".join(l) for l in g]

    def anda(c, r):
        return 0 <= c < PW and 0 <= r < PH and linhas[r][c] in ".=fkESVM"

    d = bfs((8, 41), anda, PW, PH)
    assert (8, 2) in d, "planície: o marco da montanha ficou inalcançável"
    assert (8, 42) in d, "planície: o portão sul ficou inalcançável"
    livres = sum(1 for r in range(PH) for c in range(PW) if anda(c, r))
    assert len(d) >= livres, f"planície: {livres - len(d)} células livres isoladas"
    return linhas


# ================================================================= saída =====
def bloco(linhas):
    return "\n".join(f'  "{l}",' for l in linhas)


def regrava(arquivo, nome_const, linhas):
    p = RAIZ / "src" / "game" / arquivo
    txt = p.read_text(encoding="utf-8")
    novo = f"export const {nome_const}: string[] = [\n{bloco(linhas)}\n];"
    txt2, n = re.subn(
        rf"export const {nome_const}: string\[\] = \[.*?\n\];",
        lambda _m: novo,
        txt,
        count=1,
        flags=re.S,
    )
    assert n == 1, f"não achei a constante {nome_const} em {arquivo}"
    p.write_text(txt2, encoding="utf-8")
    print(f"{arquivo}: {nome_const} regravado ({len(linhas)} linhas)")


if __name__ == "__main__":
    f = gera_floresta()
    p = gera_planicie()
    if "--write" in sys.argv:
        regrava("forest.ts", "FOREST", f)
        regrava("plains.ts", "PLAINS", p)
    else:
        print("FOREST\n" + bloco(f))
        print("\nPLAINS\n" + bloco(p))
