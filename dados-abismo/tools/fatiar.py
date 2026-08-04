#!/usr/bin/env python3
"""
FATIAR — recorta a folha de sprites que veio do gerador de imagem.

Não assume grade fixa: acha cada criatura por COMPONENTE CONECTADO do que
não é magenta. Assim funciona mesmo quando o gerador desalinha as células ou
o chefe ocupa duas colunas (foi o que aconteceu com o OSSÁRIO).

  python3 tools/fatiar.py folha.png saida/ id1 id2 id3 ...

Os ids são atribuídos na ordem de leitura (linha por linha, esquerda→direita).
Passe --ver para só listar o que foi encontrado, sem gravar.
"""
import sys, os
import numpy as np
from PIL import Image

MAGENTA = (255, 0, 255)
TOL      = 70        # distância euclidiana no RGB pra ainda ser "fundo"
MIN_AREA = 0.0025    # componente menor que 0,25% da imagem é sujeira
ALTURA   = 180       # a carta mostra 52px; 180 cobre tela 3x e pesa pouco
CORES    = 128       # paleta reduzida: a arte já é de paleta restrita


def mascara_fundo(rgb):
    """True onde é fundo (magenta), inclusive o halo esbranquiçado da borda."""
    d = np.sqrt(((rgb.astype(np.int32) - np.array(MAGENTA)) ** 2).sum(axis=2))
    return d < TOL


def rotular(obj):
    """Componentes conectados 4-vizinhos, por varredura + union-find.
    (scipy não está instalado aqui, então vai na mão mesmo.)"""
    h, w = obj.shape
    lab = np.zeros((h, w), dtype=np.int32)
    pai = [0]

    def raiz(x):
        while pai[x] != x:
            pai[x] = pai[pai[x]]
            x = pai[x]
        return x

    def unir(a, b):
        ra, rb = raiz(a), raiz(b)
        if ra != rb:
            pai[max(ra, rb)] = min(ra, rb)

    prox = 1
    for y in range(h):
        linha = obj[y]
        for x in np.nonzero(linha)[0]:
            cima = lab[y - 1, x] if y > 0 else 0
            esq  = lab[y, x - 1] if x > 0 else 0
            if cima and esq:
                lab[y, x] = min(cima, esq); unir(cima, esq)
            elif cima:
                lab[y, x] = cima
            elif esq:
                lab[y, x] = esq
            else:
                lab[y, x] = prox; pai.append(prox); prox += 1
    # segunda passada: achata os apelidos
    tabela = np.array([raiz(i) for i in range(prox)], dtype=np.int32)
    return tabela[lab]


def caixas(lab, area_min):
    saida = []
    for i in np.unique(lab):
        if i == 0:
            continue
        ys, xs = np.nonzero(lab == i)
        if len(ys) < area_min:
            continue
        saida.append((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1, len(ys)))
    return saida


def juntar_proximas(cxs, folga, frac_detalhe=0.18):
    """Detalhes soltos (ondas de som, faíscas, fumaça) viram componentes
    separados e precisam voltar pro dono. Mas duas CRIATURAS vizinhas nunca
    podem se fundir — foi o que aconteceu na primeira tentativa, em que a
    fileira inteira virou um blob só.

    Regra: só um componente PEQUENO (menos de `frac_detalhe` da área mediana
    dos grandes) é absorvido, e sempre pelo grande mais próximo."""
    cxs = [list(c) for c in cxs]
    if len(cxs) < 2:
        return cxs
    areas = sorted(c[4] for c in cxs)
    mediana = areas[len(areas) // 2]
    grandes = [c for c in cxs if c[4] >= mediana * frac_detalhe]
    pequenos = [c for c in cxs if c[4] < mediana * frac_detalhe]

    def dist(a, b):
        dx = max(0, max(a[0] - b[2], b[0] - a[2]))
        dy = max(0, max(a[1] - b[3], b[1] - a[3]))
        return (dx * dx + dy * dy) ** 0.5

    for p in pequenos:
        perto = min(grandes, key=lambda g: dist(p, g)) if grandes else None
        if perto is not None and dist(p, perto) <= folga:
            perto[0] = min(perto[0], p[0]); perto[1] = min(perto[1], p[1])
            perto[2] = max(perto[2], p[2]); perto[3] = max(perto[3], p[3])
            perto[4] += p[4]
    return grandes


def ordem_de_leitura(cxs):
    """Linha por linha: agrupa por faixa vertical e ordena da esquerda."""
    if not cxs:
        return []
    alturas = [c[3] - c[1] for c in cxs]
    limiar = np.median(alturas) * 0.55
    restantes = sorted(cxs, key=lambda c: c[1])
    linhas, atual = [], [restantes[0]]
    for c in restantes[1:]:
        if c[1] - atual[0][1] < limiar:
            atual.append(c)
        else:
            linhas.append(atual); atual = [c]
    linhas.append(atual)
    saida = []
    for ln in linhas:
        saida += sorted(ln, key=lambda c: c[0])
    return saida


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    so_ver = '--ver' in sys.argv
    if len(args) < 2:
        print(__doc__); sys.exit(1)
    origem, destino, ids = args[0], args[1], args[2:]

    im = Image.open(origem).convert('RGB')
    rgb = np.asarray(im)
    fundo = mascara_fundo(rgb)
    obj = ~fundo

    lab = rotular(obj)
    area_min = MIN_AREA * rgb.shape[0] * rgb.shape[1]
    cxs = juntar_proximas(caixas(lab, area_min), folga=int(min(im.size) * 0.045))
    cxs = ordem_de_leitura(cxs)

    print(f'{origem}: {len(cxs)} figuras encontradas')
    for k, (x0, y0, x1, y1, area) in enumerate(cxs):
        nome = ids[k] if k < len(ids) else f'sprite{k}'
        print(f'  {k+1:2d}. {nome:18s} {x1-x0:4d}x{y1-y0:4d} em ({x0},{y0})')
    if so_ver:
        return

    os.makedirs(destino, exist_ok=True)
    rgba = np.dstack([rgb, np.where(fundo, 0, 255).astype(np.uint8)])
    for k, (x0, y0, x1, y1, _) in enumerate(cxs):
        if k >= len(ids):
            break
        m = 6                                   # respiro pra não cortar contorno
        rec = rgba[max(0, y0 - m):y1 + m, max(0, x0 - m):x1 + m]
        img = Image.fromarray(rec, 'RGBA')
        esc = ALTURA / img.height
        img = img.resize((max(1, round(img.width * esc)), ALTURA), Image.LANCZOS)
        # paleta reduzida derruba o peso sem estragar arte de contorno chapado
        img = img.quantize(colors=CORES, method=Image.FASTOCTREE)
        cam = os.path.join(destino, ids[k] + '.png')
        img.save(cam, optimize=True)
        print(f'     → {cam} ({img.width}x{img.height})')


if __name__ == '__main__':
    main()
