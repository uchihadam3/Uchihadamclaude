# -*- coding: utf-8 -*-
"""
Apaga a ESTRELA DE QUATRO PONTAS que o gerador assina no canto das artes.

Num arquivo solto ela é um detalhe. Numa TEXTURA ela é um desastre: a textura é
repetida em cada painel do mapa, então a mesma estrelinha branca reaparece
centenas de vezes ao longo da rua — e uma marca que se repete em intervalos
exatos é justamente o que faz o cenário parecer feito de caixas iguais.

COMO ELA É ACHADA. Não pelo brilho absoluto (a pedra clara da parede é tão clara
quanto ela), mas pelo CONTRASTE LOCAL: a estrela é muito mais clara que os
pixels imediatamente em volta dela, e é COMPACTA. O detector compara cada pixel
com a mediana de uma janela grande à sua volta e fica só com as manchas pequenas
e destacadas.

COMO ELA É APAGADA. Copiando um retalho de outro lugar da MESMA imagem, deslocado
na horizontal — numa parede de tijolo e numa calçada, a fileira vizinha tem a
mesma estrutura, então o remendo não aparece. Borrar seria mais simples e
deixaria um borrão redondo onde antes havia uma estrela redonda.

RODE SEMPRE COM --ver ANTES. O detector acerta a assinatura, mas em arte nervosa
ele ainda aponta falso: numa folha de bicho ele marcou o ombro do carniçal, que
é pedra clara, compacta e uniforme como a estrela. Remendo em cima de arte
legítima é pior que a assinatura — então o olho confere a lista antes de gravar.

  python3 scripts/tira_assinatura.py --ver <arquivo>    # só aponta onde está
  python3 scripts/tira_assinatura.py <arquivo>          # apaga e regrava
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def acha(rgb: np.ndarray, alfa: np.ndarray | None = None) -> list[tuple[int, int, int, int]]:
    """
    Caixas (x, y, w, h) da assinatura.

    A PRIMEIRA VERSÃO era só "mancha clara e compacta", e marcou 25 manchas na
    trepadeira e 25 na Raiz Podre — folha nervosa é cheia de pontinhos claros e
    compactos. Um remendo em cima de arte legítima é pior que a assinatura.

    Quatro condições juntas, e é a soma que separa:
      1. ESTÁ NO CANTO INFERIOR DIREITO. É onde o gerador assina, nas três folhas
         que chegaram. Limitar a região elimina de saída quase todo falso.
      2. É QUASE SEM COR e MUITO mais clara que o entorno. Note o "que o
         entorno": eu tinha exigido luminância alta em termos absolutos e a
         estrela da parede escapou — medida, ela chega a 123 de 255, porque está
         sobre um tijolo escuro. O que a denuncia é o SALTO (71 acima do fundo
         local), não o brilho absoluto.
      3. É UNIFORME por dentro: a assinatura é chapada (desvio-padrão baixo);
         detalhe de arte tem textura. O limite é 30 e não 20 porque a estrela tem
         um degradê suave do miolo p/ as pontas — apertar mais perdia a da parede.
      4. É COMPACTA e quase quadrada.
    """
    H, W = rgb.shape[:2]
    lum = rgb.mean(2)
    croma = rgb.max(2) - rgb.min(2)
    # (1) só o canto inferior direito
    regiao = np.zeros((H, W), bool)
    regiao[int(H * 0.62):, int(W * 0.55):] = True
    # (2) quase branca e quase sem cor
    m = regiao & (lum > 92) & (croma < 34)
    # e MUITO mais clara que o entorno (a pedra clara da parede também é clara)
    # o "fundo local" é uma mediana de janela grande. Calculada na resolução
    # cheia ela leva minutos numa imagem de 1024 — e o que se quer dela é um
    # borrão, não detalhe. Reduzir 6x antes e ampliar depois dá o mesmo número em
    # uma fração do tempo.
    peq = np.array(Image.fromarray(lum.astype(np.uint8)).resize(
        (max(1, W // 6), max(1, H // 6)), Image.BILINEAR))
    fundo = np.array(Image.fromarray(ndimage.median_filter(peq, size=14)).resize(
        (W, H), Image.BILINEAR)).astype(float)
    m &= (lum - fundo) > 45
    m = ndimage.binary_opening(m, np.ones((3, 3)))
    if alfa is not None:
        m &= alfa > 200
    ilhas, n = ndimage.label(m)
    if n == 0:
        return []
    out = []
    for i, (ys, xs) in enumerate(ndimage.find_objects(ilhas)):
        h, w = ys.stop - ys.start, xs.stop - xs.start
        mask = ilhas[ys, xs] == i + 1
        area = int(mask.sum())
        if not (250 < area < 6000 and 18 < w < 110 and 18 < h < 110):
            continue
        if not (0.6 < w / h < 1.7 and area / (w * h) > 0.38):   # (4) compacta
            continue
        if lum[ys, xs][mask].std() > 30:                        # (3) uniforme
            continue
        out.append((xs.start, ys.start, w, h))
    return out


def remenda(rgb: np.ndarray, caixa: tuple[int, int, int, int], folga: int = 10) -> None:
    """
    Cobre a caixa com um retalho da MESMA imagem.

    A primeira versão copiava de um deslocamento fixo (2,5x a largura, p/ o lado)
    e deixava um RETÂNGULO MAIS CLARO no lugar da estrela: numa parede de tijolo,
    dois palmos ao lado é outro tijolo, de outro tom. Trocar uma marca por outra
    não é conserto.

    Agora são duas coisas:
      1. A ORIGEM É ESCOLHIDA, não fixa. Cada candidato é julgado pela MOLDURA:
         compara-se o anel de pixels em volta do retalho com o anel em volta do
         buraco. Quem casa a moldura casa o tom e a fiada do tijolo.
      2. A EMENDA É COSTURADA. O retalho entra com uma máscara suavizada nas
         bordas, então ele se dissolve no que já estava lá em vez de encostar.
    """
    x, y, w, h = caixa
    x0, y0 = max(0, x - folga), max(0, y - folga)
    x1, y1 = min(rgb.shape[1], x + w + folga), min(rgb.shape[0], y + h + folga)
    W, H = x1 - x0, y1 - y0
    anel = np.zeros((H, W), bool)
    anel[:folga] = anel[-folga:] = True
    anel[:, :folga] = anel[:, -folga:] = True
    alvo = rgb[y0:y1, x0:x1].astype(float)

    melhor, custo = None, None
    for dy in range(-3 * H, 3 * H + 1, max(4, H // 3)):
        for dx in range(-6 * W, 6 * W + 1, max(4, W // 3)):
            if abs(dx) < W and abs(dy) < H:
                continue                       # cairia em cima da própria estrela
            sx0, sy0 = x0 + dx, y0 + dy
            if sx0 < 0 or sy0 < 0 or sx0 + W > rgb.shape[1] or sy0 + H > rgb.shape[0]:
                continue
            cand = rgb[sy0:sy0 + H, sx0:sx0 + W].astype(float)
            c = float(np.abs(cand[anel] - alvo[anel]).mean())
            if custo is None or c < custo:
                custo, melhor = c, (sx0, sy0)
    if melhor is None:
        raise SystemExit(f"sem lugar de onde copiar o remendo p/ {caixa}")

    sx0, sy0 = melhor
    retalho = rgb[sy0:sy0 + H, sx0:sx0 + W].astype(float)
    # máscara: 1 no miolo, caindo a zero nas bordas (costura)
    fy = np.minimum(np.arange(H), np.arange(H)[::-1]) / max(1, folga)
    fx = np.minimum(np.arange(W), np.arange(W)[::-1]) / max(1, folga)
    peso = np.clip(np.minimum(fy[:, None], fx[None, :]), 0, 1)[..., None]
    rgb[y0:y1, x0:x1] = (retalho * peso + alvo * (1 - peso)).clip(0, 255).astype(np.uint8)


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    so_ver = "--ver" in sys.argv
    if not args:
        raise SystemExit(__doc__)
    for arq in args:
        im = Image.open(arq)
        tem_alfa = im.mode == "RGBA"
        a = np.array(im.convert("RGBA") if tem_alfa else im.convert("RGB"))
        rgb = a[..., :3].astype(np.uint8).copy()
        caixas = acha(rgb.astype(float), a[..., 3] if tem_alfa else None)
        nome = os.path.basename(arq)
        if not caixas:
            print(f"  {nome}: nada encontrado")
            continue
        print(f"  {nome}: {len(caixas)} mancha(s) -> {caixas}")
        if so_ver:
            continue
        for cx in caixas:
            remenda(rgb, cx)
        if tem_alfa:
            Image.fromarray(np.dstack([rgb, a[..., 3]])).save(arq)
        else:
            Image.fromarray(rgb).save(arq)
        print(f"    limpo e regravado")


if __name__ == "__main__":
    main()
