# -*- coding: utf-8 -*-
"""
Recorte dos SPRITES cujo "fundo transparente" veio DESENHADO como xadrez.

O gerador entrega o alfa 100% opaco e pinta o quadriculado dentro da própria
imagem. O `prep_city_art.py` já resolvia isso na arte da cidade, mas ele assume o
xadrez CLARO (255/194) que aparecia lá. O roster do Ato II veio com um xadrez
ESCURO (~27/~80) e, com os tons errados, a conta do alfa dava tudo opaco — foi
exatamente o que aconteceu: o Leviatã, o Afogado, o Limo, a Naja, a Aberração e
os cogumelos estavam todos em cena com o quadriculado atrás.

COMO ESTE AQUI DECIDE. Duas tentativas antes desta falharam, e vale registrar
por quê, porque as duas pareciam certas:

 1. Só o DESVIO-PADRÃO local (a conta que funciona na arte da cidade): onde há
    xadrez o valor oscila, onde há sprite não. Aqui a amplitude do xadrez é
    pequena (~25 num fundo escuro) e a pele dos bichos é TEXTURADA — a variação
    da pele passa da amplitude do xadrez, e metade da criatura virava buraco.

 2. Desvio + "colorido é sólido": salva a pele, mas estes bichos têm AURA — um
    halo translúcido pintado por cima do xadrez. Ali o pixel é colorido E é
    fundo, então o halo inteiro virava opaco e o quadriculado voltava num
    retângulo em volta da criatura.

O que resolve é acrescentar CONECTIVIDADE. Fundo é o que parece xadrez E está
LIGADO À BORDA da imagem — porque a borda é fundo por definição e a criatura é
uma mancha fechada no meio. Assim a pele texturada do bicho pode parecer o que
for: ela não alcança a borda sem atravessar tinta opaca. E o halo, que de fato
alcança, é reconhecido como fundo mesmo estando colorido, porque ali o xadrez
continua oscilando por baixo.

Como o material do jogo usa alphaTest, o que importa é uma máscara limpa — não
uma translucidez fiel. Por isso o resultado é binário, com a beirada suavizada.

  python3 scripts/cut_sprite.py <entrada.png> <saida.png> [--croma N] [--bolsao N] [--debug]
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def caixa(x: np.ndarray, k: int) -> np.ndarray:
    """Média em janela (2k+1)² por soma acumulada."""
    p = np.pad(x, k, mode="edge")
    c = p.cumsum(0).cumsum(1)
    c = np.pad(c, ((1, 0), (1, 0)))
    n = 2 * k + 1
    H, W = x.shape
    s = c[n:n + H, n:n + W] - c[0:H, n:n + W] - c[n:n + H, 0:W] + c[0:H, 0:W]
    return s / (n * n)


def tons_do_fundo(v: np.ndarray) -> tuple[float, float]:
    """
    Os dois tons do xadrez, medidos na MOLDURA da imagem.

    A borda é fundo puro (o sprite nunca encosta nos quatro cantos), então o
    histograma dela tem dois picos. Medir em vez de fixar é o que faz o mesmo
    script servir p/ xadrez claro, escuro ou qualquer par de tons.
    """
    b = 10
    borda = np.concatenate([
        v[:b].ravel(), v[-b:].ravel(), v[:, :b].ravel(), v[:, -b:].ravel(),
    ])
    hist, bordas = np.histogram(borda, bins=64, range=(0, 255))
    centros = (bordas[:-1] + bordas[1:]) / 2
    idx = np.flatnonzero(hist > borda.size * 0.02)   # 2%: ignora ruído de anti-alias
    if idx.size < 2:
        raise SystemExit("não achei os dois tons do xadrez na moldura")
    escuro = float(np.average(centros[idx[:3]], weights=hist[idx[:3]]))
    claro = float(np.average(centros[idx[-3:]], weights=hist[idx[-3:]]))
    return claro, escuro


def periodo(v: np.ndarray) -> int:
    """
    Lado do quadrado do xadrez, medido por autocorrelação numa linha da borda.

    Precisa ser MEDIDO e não fixado: cada folha sai do gerador com um lado
    diferente. E é ele que dá o teste decisivo abaixo — sem o período certo, a
    conta da meia-casa vira ruído.
    """
    lin = v[5] - v[5].mean()
    ac = np.correlate(lin, lin, "full")[len(lin) - 1:]
    return int(np.argmax(ac[8:80])) + 8


def recorta(rgb: np.ndarray, croma_max: float = 22.0, bolsao: float = 12.0,
            debug: bool = False) -> np.ndarray:
    v = rgb.astype(np.float32).mean(2)
    claro, escuro = tons_do_fundo(v)
    amp = max(1.0, (claro - escuro) / 2)
    P = periodo(v)
    meio = max(2, P // 2)

    # O TESTE DECISIVO: comparar cada pixel com o que está MEIA CASA ao lado.
    # No fundo, meia casa cai sempre no tom oposto, então a diferença é a
    # amplitude cheia do xadrez — e continua sendo, mesmo sob a aura, só que
    # reduzida. Na pele do bicho, meia casa cai em mais pele: a diferença some.
    # É mais específico que o desvio-padrão porque olha na FREQUÊNCIA certa, e é
    # por isso que a textura da pele (que é irregular) não engana.
    d = np.abs(v[:, :-meio] - v[:, meio:])
    d = np.pad(d, ((0, 0), (0, meio)), mode="edge")
    d = caixa(d, 6)
    # SATURAÇÃO: o xadrez é cinza puro; a criatura é verde-azulada e a aura, um
    # meio-termo. Medida em janela, separa os três com folga.
    croma = caixa(rgb.max(2).astype(np.float32) - rgb.min(2).astype(np.float32), 6)
    if debug:
        print(f"    xadrez: escuro={escuro:.1f} claro={claro:.1f} amp={amp:.1f} lado={P}px")

    def ligado_a_borda(mask: np.ndarray, semente: np.ndarray | None = None) -> np.ndarray:
        """A parte de `mask` que alcança a moldura (ou a semente dada)."""
        m = np.zeros((mask.shape[0] + 2, mask.shape[1] + 2), bool)
        m[1:-1, 1:-1] = mask if semente is None else (mask | semente)
        m[0, :] = m[-1, :] = m[:, 0] = m[:, -1] = True
        rot, _ = ndimage.label(m)
        return (rot[1:-1, 1:-1] == rot[0, 0]) & mask

    # FUNDO = oscila na frequência do xadrez, é POUCO COLORIDO e alcança a
    # moldura. A conectividade é o que separa isso de qualquer trecho do bicho
    # que por acaso passe nos dois primeiros testes: a pele não chega à borda sem
    # atravessar tinta opaca.
    #
    # O limiar de cor é o único parâmetro que às vezes precisa de mão: alguns
    # bichos têm AURA — um halo translúcido pintado por cima do xadrez, colorido
    # o bastante p/ escapar do corte. Tentei crescer automaticamente p/ dentro do
    # halo (segundo passe mais frouxo no croma e mais duro na oscilação) e o
    # resultado foi comer o corpo da criatura: a pele passa nos mesmos limites em
    # boa parte da folha. Um número por peça, conferido a olho, é mais honesto
    # que uma heurística que erra feio de vez em quando.
    fundo = ligado_a_borda((d > amp * 0.85) & (croma < croma_max))
    # BOLSÕES FECHADOS. Nos cogumelos sobrava xadrez ENTRE os chapéus: é fundo,
    # mas não alcança a moldura (as copas fecham o vão), então a conectividade
    # sozinha não pega. Aqui vale afrouxar a exigência de "estar ligado à borda"
    # justamente porque aperto tudo o mais: só sai o que é cinza QUASE PURO e
    # ainda bate na frequência do xadrez. Tinta de bicho não faz as duas coisas.
    fundo = fundo | ((d > amp * 0.9) & (croma < bolsao))
    # o teste da meia-casa falha numa faixa fina em volta do sprite (ali a janela
    # já pega tinta); um fecho generoso encosta o recorte no contorno de verdade
    fundo = ndimage.binary_closing(fundo, np.ones((5, 5)))
    fundo = ndimage.binary_dilation(fundo, np.ones((3, 3)), iterations=2)
    fundo = ndimage.binary_opening(fundo, np.ones((3, 3)))

    # SOBRAS SOLTAS: pedacinhos de xadrez que ficaram ilhados (tracinhos avulsos
    # em volta do sprite) não são parte do bicho. Fica só o corpo — a maior ilha
    # — e o que for grande o bastante p/ ser desenho de verdade.
    ilhas, n = ndimage.label(~fundo)
    if n > 1:
        areas = ndimage.sum(np.ones_like(v), ilhas, range(1, n + 1))
        maior = int(np.argmax(areas)) + 1
        limite = max(400.0, areas[maior - 1] * 0.02)
        manter = np.isin(ilhas, [i + 1 for i, a in enumerate(areas) if a >= limite or i + 1 == maior])
        fundo = ~manter

    alpha = np.where(fundo, 0.0, 1.0)
    alpha = caixa(alpha, 1)      # beirada macia (senão serrilha no jogo)
    alpha[alpha < 0.45] = 0.0
    alpha[alpha > 0.75] = 1.0
    return (alpha * 255).astype(np.uint8)


def main() -> None:
    ent, sai = sys.argv[1], sys.argv[2]
    im = Image.open(ent).convert("RGBA")
    rgb = np.array(im)[..., :3]
    cm = 22.0
    if "--croma" in sys.argv:
        cm = float(sys.argv[sys.argv.index("--croma") + 1])
    bo = 12.0
    if "--bolsao" in sys.argv:
        bo = float(sys.argv[sys.argv.index("--bolsao") + 1])
    alpha = recorta(rgb, cm, bo, "--debug" in sys.argv)
    print(f"    {ent.split('/')[-1]}: {(alpha == 0).mean() * 100:.1f}% transparente, "
          f"{(alpha > 250).mean() * 100:.1f}% opaco")
    Image.fromarray(np.dstack([rgb, alpha])).save(sai)


if __name__ == "__main__":
    main()
