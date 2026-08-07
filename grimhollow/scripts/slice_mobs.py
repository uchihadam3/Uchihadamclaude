# -*- coding: utf-8 -*-
"""
Fatia uma FOLHA DE CRIATURAS de fundo MAGENTA em PNGs nomeados e transparentes.

POR QUE MAGENTA E NÃO "FUNDO TRANSPARENTE". Pedir transparência ao gerador quase
nunca dá transparência: vem o quadriculado PINTADO por dentro da imagem, ou uma
aura larga em volta do bicho que nenhuma heurística de croma separa direito — foi
o que estragou a aberração do Ato II. Magenta puro não existe em pele, pelo,
couro nem metal, então o recorte deixa de ser adivinhação e vira uma conta de
distância de cor.

POR QUE NÃO CORTA POR GRADE. A primeira versão cortava em 3x2, como o prompt
pedia. A folha que chegou veio com as peças em posições IRREGULARES e ainda com
um pedaço solto — um busto de besteiro que o gerador começou e não terminou. Uma
grade fixa teria cortado seis retângulos com bicho pela metade em cada um.
Agora o script ACHA cada desenho: separa as ilhas de pixels não-magenta e trata
cada uma como uma peça. A folha pode vir como vier.

AS QUATRO CONTAS:

 1. RECORTE por distância ao magenta (R e B altos com G baixo — é o G que separa
    magenta de pele rosada).
 2. FRANJA, a parte que quase todo mundo esquece: o pixel da BORDA sai MISTURADO
    com o fundo. Zerar só o alfa deixa o rosa grudado no contorno, e ele só
    aparece depois, no jogo, contra cenário escuro. Aqui o R e o B de cada pixel
    de borda são puxados de volta ao nível do G.
 3. SANGRIA: o transparente é preenchido com a cor do opaco mais próximo, senão
    o filtro bilinear da placa de vídeo vai buscar cor lá e ressuscita o magenta
    como franja rosa em volta do desenho — no arquivo não aparece, na tela sim.
 4. ILHAS: dilatação antes de rotular, p/ que respingo de terra e ponta de asa
    soltos entrem na mesma peça do bicho a que pertencem.

  python3 scripts/slice_mobs.py <folha.png> --nomes a,b,c [--pular 3] [--caixa 512]
  python3 scripts/slice_mobs.py <folha.png> --listar     # só mostra o que achou
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "src", "assets", "env")


def sem_magenta(rgb: np.ndarray, limiar: float) -> np.ndarray:
    """RGBA com o fundo magenta removido e a franja descontada."""
    rgb = rgb.astype(np.float32)
    R, G, B = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    # "quanto isto é magenta": R e B altos, G baixo. Pele rosada tem R e B altos
    # TAMBÉM, mas aí o G sobe junto — é o G que separa.
    magenta = np.minimum(R, B) - G
    fundo = np.clip(magenta / limiar, 0.0, 1.0)      # 1 = fundo puro, 0 = desenho
    alfa = (1.0 - fundo) * 255.0
    mist = (fundo > 0.02) & (fundo < 0.98)
    R = np.where(mist, np.minimum(R, G + (R - G) * (1 - fundo)), R)
    B = np.where(mist, np.minimum(B, G + (B - G) * (1 - fundo)), B)
    out = np.dstack([R, G, B, alfa]).clip(0, 255).astype(np.uint8)

    # SANGRIA DA COR PARA O TRANSPARENTE — e sem isto o recorte parece certo no
    # arquivo e sai com FRANJA ROSA no jogo.
    # O motivo: zerar o alfa não apaga a COR do pixel; o transparente continua
    # magenta por baixo. Aí a placa de vídeo gera os mipmaps e faz o filtro
    # bilinear MISTURANDO cor de vizinhos — inclusive a dos transparentes — e o
    # magenta ressurge na borda do desenho. Medi 0,000% de resíduo no PNG e mesmo
    # assim as janelas de Vaurstead saíram com contorno rosa na tela.
    # A correção é encher todo o transparente com a cor do pixel opaco MAIS
    # PRÓXIMO: o alfa continua zero (nada disso é desenhado), mas quando o filtro
    # for buscar cor ali, vai achar a do desenho em vez de magenta.
    op = out[..., 3] > 8
    if op.any() and not op.all():
        _, idx = ndimage.distance_transform_edt(~op, return_indices=True)
        for ch in range(3):
            canal = out[..., ch]
            out[..., ch] = np.where(op, canal, canal[idx[0], idx[1]])
    return out


def achar_pecas(rgba: np.ndarray, minimo: float, cola: int):
    """
    As ilhas de desenho, em ORDEM DE LEITURA (linha a linha, esquerda→direita).

    `cola` é uma dilatação aplicada só p/ AGRUPAR: os respingos de terra sob a
    Raiz Podre e a ponta de uma asa solta são ilhas próprias, e sem ela virariam
    peças separadas (ou seriam descartadas pelo tamanho, deixando o bicho
    incompleto). A dilatação não entra no recorte — serve só p/ decidir quem é
    do mesmo bicho.
    """
    solido = rgba[..., 3] > 24
    junto = ndimage.binary_dilation(solido, iterations=cola)
    ilhas, n = ndimage.label(junto)
    if n == 0:
        return []
    areas = ndimage.sum(solido, ilhas, range(1, n + 1))
    corte = areas.max() * minimo
    caixas = ndimage.find_objects(ilhas)
    achar_pecas.ilhas = ilhas          # p/ o recorte mascarar pela ILHA, não pela caixa
    pecas = []
    for i, (ys, xs) in enumerate(caixas):
        if areas[i] < corte:
            continue
        pecas.append({
            "x0": xs.start, "x1": xs.stop, "y0": ys.start, "y1": ys.stop,
            "area": int(areas[i]), "rot": i + 1,
        })
    # ordem de LEITURA, por faixas horizontais. A faixa sai do CENTRO vertical de
    # cada peça, e o corte entre uma faixa e a seguinte é meia altura MEDIANA —
    # a mediana porque numa folha de bichos as alturas variam muito (um corvo
    # deitado ao lado de um salteador em pé), e usar a altura de cada peça
    # embaralhava as fileiras.
    if not pecas:
        return []
    alt = float(np.median([p["y1"] - p["y0"] for p in pecas]))
    pecas.sort(key=lambda p: (p["y0"] + p["y1"]) / 2)
    faixas, atual, base = [], [], None
    for p in pecas:
        cy = (p["y0"] + p["y1"]) / 2
        if base is None or cy - base <= alt * 0.5:
            atual.append(p)
            base = cy if base is None else base
        else:
            faixas.append(atual); atual = [p]; base = cy
    if atual:
        faixas.append(atual)
    saida = []
    for faixa in faixas:
        saida.extend(sorted(faixa, key=lambda p: p["x0"]))
    return saida


def limita(im: Image.Image, lado: int) -> Image.Image:
    """
    Reduz p/ caber em `lado`, SEM encaixar em quadrado — e isso importa.

    A primeira versão colava cada bicho numa tela quadrada, como o fatiador de
    ÍCONES faz. Ícone precisa disso (uma fileira de botões com símbolos de
    alturas diferentes parece quebrada); sprite de criatura, não: o jogo já
    dimensiona o plano pela PROPORÇÃO DA ARTE (`worldH * asp` por `worldH`).
    Num quadrado a proporção vira 1, e um lobo — que é largo e baixo — passaria a
    ocupar só metade da altura do plano. O resultado é um bicho que aparece
    menor do que o número declarado no perfil, e sem que o número esteja errado.
    """
    w, h = im.size
    if max(w, h) <= lado:
        return im
    escala = lado / max(w, h)
    return im.resize((max(1, round(w * escala)), max(1, round(h * escala))), Image.LANCZOS)


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    ent = sys.argv[1]
    arg = lambda k, p: (sys.argv[sys.argv.index(k) + 1] if k in sys.argv else p)
    limiar = float(arg("--limiar", 90))
    lado = int(arg("--caixa", 512))
    minimo = float(arg("--minimo", 0.02))    # % da maior peça abaixo da qual é lixo
    cola = int(arg("--cola", 6))
    pular = {int(x) for x in str(arg("--pular", "")).split(",") if x.strip()}
    nomes = [x for x in str(arg("--nomes", "")).split(",") if x.strip()]

    rgba = sem_magenta(np.array(Image.open(ent).convert("RGB")), limiar)
    pecas = achar_pecas(rgba, minimo, cola)
    ilhas = achar_pecas.ilhas
    usadas = [p for i, p in enumerate(pecas) if i not in pular]

    print(f"{len(pecas)} peça(s) na folha ({len(pular)} pulada(s)):")
    for i, p in enumerate(pecas):
        marca = "  PULADA" if i in pular else ""
        alvo = ""
        if i not in pular and nomes:
            j = usadas.index(p)
            alvo = f" -> {nomes[j]}" if j < len(nomes) else " -> (sem nome)"
        print(f"  [{i}] {p['x1']-p['x0']:4d}x{p['y1']-p['y0']:4d} em "
              f"({p['x0']},{p['y0']})  area {p['area']:7d}{alvo}{marca}")

    if "--listar" in sys.argv or not nomes:
        return
    if len(nomes) != len(usadas):
        raise SystemExit(f"{len(nomes)} nome(s) p/ {len(usadas)} peça(s) — confira --pular")

    os.makedirs(SAIDA, exist_ok=True)
    for nome, p in zip(nomes, usadas):
        # recorta pelo retângulo E APAGA O QUE FOR DE OUTRA ILHA dentro dele: duas
        # peças vizinhas dividem faixas de pixels sem se tocarem, e recortar só
        # pelo retângulo traria a asa da vizinha junto. A máscara é a ilha, não a
        # caixa. Depois disso o alfa é reaparado, porque tirar o intruso pode ter
        # deixado ar sobrando na borda.
        rec = rgba[p["y0"]:p["y1"], p["x0"]:p["x1"]].copy()
        so_ela = ilhas[p["y0"]:p["y1"], p["x0"]:p["x1"]] == p["rot"]
        rec[..., 3] = np.where(so_ela, rec[..., 3], 0)
        im = Image.fromarray(rec)
        a = np.array(im)[..., 3]
        ys, xs = np.nonzero(a > 10)
        if len(ys):
            im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
        limita(im, lado).save(os.path.join(SAIDA, f"{nome}.png"))
        print(f"  gravado {nome}.png")
    print(f"\n{len(nomes)} em {SAIDA}")


if __name__ == "__main__":
    main()
