# -*- coding: utf-8 -*-
"""
Preparo da arte da CIDADE (§28 do PROMPTS.md) para entrar no jogo.

Duas correções que a arte gerada quase sempre precisa:

1. XADREZ PINTADO (`--prop`). O gerador entrega o "fundo transparente" DESENHADO
   como um xadrez cinza/branco dentro da própria imagem — o alfa vem 100% opaco.
   Recortar por cor não serve aqui: a lanterna tem VIDRO, e o xadrez aparece
   ATRAVÉS dele. Furar ali deixaria buraco no lugar do vidro.

   A saída é que o xadrez é justamente um par de fundos conhecidos alternando a
   cada 20,5 px. Como cada pixel vale  P = α·C + (1-α)·B , comparar a média dos
   quadrados CLAROS com a dos ESCUROS numa vizinhança pequena elimina C:

       média_claro - média_escuro = (1-α)·(255-194)

   e daí sai o α de cada pixel — 1 na madeira, 0 no fundo, e um meio-termo de
   verdade no vidro. Com o α na mão, a cor real é C = (P - (1-α)·B) / α.

2. MARCA D'ÁGUA (`--marca X Y`). Sobra uma "estrelinha" branca de quatro pontas num
   canto. É um borrão PEQUENO e MUITO mais claro que a vizinhança — as duas
   condições juntas (senão o detector come as áreas claras da própria textura,
   como o reboco entre as madeiras da taipa).

  python3 scripts/prep_city_art.py <entrada.png> <saida.png> [--prop] [--marca X Y [R]]
"""
import sys
from collections import deque

import numpy as np
from PIL import Image

PERIODO = 1024 / 50.0   # lado do quadrado do xadrez (medido na arte)
B_CLARO, B_ESCURO = 255.0, 194.0


def caixa(x: np.ndarray, k: int) -> np.ndarray:
    """Média em janela k×k por soma acumulada (rápido e sem dependências)."""
    p = np.pad(x, k, mode="edge")
    c = p.cumsum(0).cumsum(1)
    c = np.pad(c, ((1, 0), (1, 0)))
    n = 2 * k + 1
    H, W = x.shape
    s = c[n:n + H, n:n + W] - c[0:H, n:n + W] - c[n:n + H, 0:W] + c[0:H, 0:W]
    return s / (n * n)


def inunda_da_borda(mask: np.ndarray) -> np.ndarray:
    """Parte de `mask` ligada à borda da imagem (4-vizinhança)."""
    H, W = mask.shape
    fora = np.zeros_like(mask)
    fila = deque()
    for y in range(H):
        for x in (0, W - 1):
            if mask[y, x] and not fora[y, x]:
                fora[y, x] = True; fila.append((y, x))
    for x in range(W):
        for y in (0, H - 1):
            if mask[y, x] and not fora[y, x]:
                fora[y, x] = True; fila.append((y, x))
    while fila:
        y, x = fila.popleft()
        for dy, dx in ((0, 1), (1, 0), (0, -1), (-1, 0)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not fora[ny, nx]:
                fora[ny, nx] = True; fila.append((ny, nx))
    return fora


def recorta_xadrez(rgb: np.ndarray, vidro_direita: bool = False) -> tuple[np.ndarray, np.ndarray]:
    """
    Transforma o xadrez PINTADO em transparência de verdade.

    Já tentei deduzir a grade do xadrez (por divisão e depois lendo a moldura) e
    nas duas vezes ela escapou: o padrão DERIVA ao longo da imagem, então
    qualquer mapa de paridade acerta um trecho e erra o resto.

    O que não depende de grade nenhuma é a AMPLITUDE do xadrez. Num pedaço de
    fundo puro os dois tons se alternam com amplitude (255-192)/2 ≈ 31; onde o
    objeto é sólido, o xadrez não aparece e a amplitude cai a zero. Medindo o
    desvio-padrão local:

        α = 1 - desvio_local / 31

    e a cor real sai da MÉDIA local (que já vem sem a ondulação do xadrez):

        C = (média - (1-α)·média_dos_dois_tons) / α

    Pixels claramente fora da faixa do fundo (escuros, ou coloridos) são objeto
    sólido por definição — isso protege as bordas de alto contraste, que senão
    inflariam o desvio e ficariam meio transparentes.
    """
    v = rgb.astype(np.float32).mean(2)
    vao = None
    b_claro = float(np.median(v[v > 235]))
    b_escuro = float(np.median(v[(v > 165) & (v < 225)]))
    amp = (b_claro - b_escuro) / 2
    b_med = (b_claro + b_escuro) / 2

    k = 20                                   # janela de ~2 quadrados
    lo = caixa(v, k)
    var = np.maximum(0.0, caixa(v * v, k) - lo * lo)
    alpha = np.clip(1.0 - np.sqrt(var) / max(1.0, amp), 0.0, 1.0)

    # o que não pode ser fundo é objeto sólido
    mx = rgb.max(2).astype(np.float32)
    mn = rgb.min(2).astype(np.float32)
    # "colorido" só conta como sólido se também for ESCURO: dentro do vidro da
    # lanterna a luz da vela deixa os quadrados do xadrez amarelados, e sem essa
    # condição eles passavam por objeto e o xadrez reaparecia no vidro.
    solido = (v < b_escuro - 22) | (v > b_claro + 6) | (((mx - mn) > 26) & (v < b_escuro + 6))
    alpha[solido] = 1.0

    alpha = caixa(alpha, 2)
    # No VIDRO o alfa ainda saía com o desenho do xadrez (quadrado sim, quadrado
    # não), o que virava buraco quadriculado na lanterna. Onde o alfa é
    # intermediário — ou seja, justamente o vidro — alisa forte: translucidez
    # UNIFORME é o que o vidro é, e some o quadriculado.
    meio = (alpha > 0.05) & (alpha < 0.95)
    if meio.any():
        alpha = np.where(meio, caixa(alpha, 10), alpha)
    alpha[alpha < 0.16] = 0.0
    alpha[alpha > 0.90] = 1.0

    # VIDRO OPACO — mas só na METADE DIREITA. O xadrez aparece através do vidro no
    # original, e de perto, no jogo, ele lê como um quadriculado dentro da
    # lanterna. Fechar TODO vão interno resolveria o vidro e estragaria o
    # triângulo vazado entre o braço e a mão-francesa, que fica na metade
    # esquerda — daí a divisão. (Só vale p/ arte que tem corpo à direita; sem
    # `--vidro` nada disso roda.)
    if vidro_direita:
        H2, W2 = alpha.shape
        dir_ = np.zeros((H2, W2), bool)
        dir_[:, int(W2 * 0.45):] = True
        # limiar ALTO: o que interessa é tudo que não é ferro maciço, porque o
        # xadrez marcou tanto o alfa quanto a COR — os quadrados claros tinham
        # ficado opacos e continuavam desenhando o quadriculado no vidro.
        quase = alpha < 0.985
        vao = dir_ & quase & ~inunda_da_borda(quase)
        if vao.any():
            print(f"    vidro fechado: {int(vao.sum())} px")
            alpha[vao] = 1.0
    a3 = alpha[..., None]
    base = np.where(a3 > 0.02, (lo[..., None] - (1 - a3) * b_med) / np.maximum(a3, 0.02), 0.0)
    # onde é sólido, a cor é a do próprio pixel (a média local borraria o desenho)
    C = np.where(a3 > 0.93, rgb.astype(np.float32), base)
    # no vidro a cor vem da MÉDIA local, que já é lisa: é ela que apaga a
    # ondulação do xadrez que sobrava desenhada nos quadrados claros
    if vidro_direita and vao is not None and vao.any():
        C = np.where(vao[..., None], lo[..., None] * 0.86, C)
    return np.clip(C, 0, 255).astype(np.uint8), (alpha * 255).astype(np.uint8)


def preenche(rgb: np.ndarray, buraco: np.ndarray, voltas: int = 40) -> np.ndarray:
    out = rgb.astype(np.float32).copy()
    falta = buraco.copy()
    for _ in range(voltas):
        if not falta.any():
            break
        val = ~falta
        soma = np.zeros_like(out)
        cnt = np.zeros(falta.shape, np.float32)
        for dy, dx in ((0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)):
            v = np.roll(np.roll(val, dy, 0), dx, 1)
            o = np.roll(np.roll(out, dy, 0), dx, 1)
            soma += o * v[..., None]
            cnt += v
        pode = falta & (cnt > 0)
        out[pode] = soma[pode] / cnt[pode][..., None]
        falta &= ~pode
    return np.clip(out, 0, 255).astype(np.uint8)


def componentes(mask: np.ndarray):
    """Rótulos das ilhas de `mask` (8-vizinhança), como lista de listas de px."""
    H, W = mask.shape
    visto = np.zeros_like(mask)
    for y in range(H):
        for x in range(W):
            if not mask[y, x] or visto[y, x]:
                continue
            fila, px = deque([(y, x)]), []
            visto[y, x] = True
            while fila:
                cy, cx = fila.popleft()
                px.append((cy, cx))
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not visto[ny, nx]:
                            visto[ny, nx] = True
                            fila.append((ny, nx))
            yield px


def tira_marca(rgb: np.ndarray, centro: tuple[int, int], raio: int = 46) -> np.ndarray:
    """
    Tapa a "estrelinha" de quatro pontas que o gerador carimba na arte.

    Achá-la sozinho não deu certo (ela é macia nas bordas e nem sempre é o ponto
    mais claro do canto — o detector acabava comendo o reboco da textura), então
    recebo o centro, que se localiza a olho em segundos.

    Preencher por média dos vizinhos TAMBÉM não serve: num disco desse tamanho a
    média irradia e deixa um "estrelado" pior que a marca. Como estas texturas
    LADRILHAM, o que funciona é CLONAR um trecho de outro ponto da própria imagem
    (com volta nas bordas) e costurar com máscara suave — o padrão continua e não
    fica emenda.
    """
    H, W = rgb.shape[:2]
    cx, cy = centro
    R = raio + 10
    ys, xs = np.mgrid[0:H, 0:W]
    d = np.sqrt((ys - cy) ** 2 + (xs - cx) ** 2)
    k = np.clip((R - d) / 12.0, 0.0, 1.0)[..., None]   # máscara com borda macia
    # doador: mesmo padrão, longe o bastante p/ não trazer a própria marca
    dx, dy = -int(W * 0.31), -int(H * 0.29)
    doador = np.roll(np.roll(rgb, dy, axis=0), dx, axis=1)
    print(f"    marca d'água: clonado sobre ({cx},{cy}), r={R}")
    return np.clip(rgb * (1 - k) + doador * k, 0, 255).astype(np.uint8)


def main() -> None:
    ent, sai = sys.argv[1], sys.argv[2]
    im = Image.open(ent).convert("RGBA")
    a = np.array(im)
    rgb, alpha = a[..., :3], a[..., 3]

    if "--prop" in sys.argv:
        rgb, alpha = recorta_xadrez(rgb, "--vidro" in sys.argv)
        op = (alpha > 250).mean() * 100
        meio = ((alpha > 20) & (alpha < 235)).mean() * 100
        print(f"    recorte: {(alpha == 0).mean() * 100:.1f}% transparente, "
              f"{op:.1f}% opaco, {meio:.1f}% translúcido (vidro)")
    if "--marca" in sys.argv:
        k = sys.argv.index("--marca")
        cx, cy = int(sys.argv[k + 1]), int(sys.argv[k + 2])
        raio = int(sys.argv[k + 3]) if len(sys.argv) > k + 3 and sys.argv[k + 3].isdigit() else 46
        rgb = tira_marca(rgb, (cx, cy), raio)

    Image.fromarray(np.dstack([rgb, alpha])).save(sai)
    print(f"    → {sai}")


if __name__ == "__main__":
    main()
