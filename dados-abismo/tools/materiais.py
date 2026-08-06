#!/usr/bin/env python3
"""
MATERIAIS — recorta a folha de swatches e prepara as texturas do jogo.

A folha vem do gerador com os cinco quadrados numa linha sobre fundo cinza.
Aqui eles são achados por COLUNA (a que destoa do fundo), recortados com uma
margem para dentro — a borda do swatch costuma trazer sombra do próprio
enquadramento — e reduzidos para 256px, que é o tamanho da célula do atlas
de faces. Maior que isso não aparece: cada face do dado ocupa poucos pixels
na tela.

    python3 tools/materiais.py folha.png arte/mat osso obsidiana ambar metal amaldicoado
    python3 tools/materiais.py folha.png arte/mat --ver     # só lista o que achou

E a MESA, que é outro bicho: precisa fechar consigo mesma nas quatro bordas,
senão a emenda aparece no feltro. `--mesa` faz o espelhamento que garante
isso e grava em 1024.

    python3 tools/materiais.py feltro.png arte/mat --mesa
"""
import sys, os
import numpy as np
from PIL import Image

LADO_MAT  = 256      # célula do atlas de faces
LADO_MESA = 1024
MARGEM    = 0.06     # 6% para dentro: foge da borda enquadrada do swatch


def faixas(v, lim=0.30, minimo=40):
    out, ini = [], None
    for i, x in enumerate(v):
        if x > lim and ini is None: ini = i
        elif x <= lim and ini is not None:
            if i - ini > minimo: out.append((ini, i))
            ini = None
    if ini is not None and len(v) - ini > minimo: out.append((ini, len(v)))
    return out


def achar_swatches(img):
    a = np.asarray(img.convert('RGB')).astype(int)
    fundo = np.median(a.reshape(-1, 3), axis=0)
    dif = np.abs(a - fundo).sum(2) > 28
    return faixas(dif.mean(0)), faixas(dif.mean(1))


def costurar(img, lado):
    """Espelha em quatro para as bordas fecharem, e corta o miolo.

    Um espelho puro deixa uma simetria óbvia; pegando o CENTRO do espelhado,
    a emenda cai fora do recorte e o olho não acha o eixo."""
    g = img.resize((lado, lado), Image.LANCZOS)
    grande = Image.new('RGB', (lado * 2, lado * 2))
    grande.paste(g, (0, 0))
    grande.paste(g.transpose(Image.FLIP_LEFT_RIGHT), (lado, 0))
    grande.paste(g.transpose(Image.FLIP_TOP_BOTTOM), (0, lado))
    grande.paste(g.transpose(Image.ROTATE_180), (lado, lado))
    meio = lado // 2
    return grande.crop((meio, meio, meio + lado, meio + lado))


def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    origem, saida = sys.argv[1], sys.argv[2]
    resto = sys.argv[3:]
    os.makedirs(saida, exist_ok=True)
    img = Image.open(origem).convert('RGB')

    if '--mesa' in resto:
        t = costurar(img, LADO_MESA)
        p = os.path.join(saida, 'mesa.jpg')
        t.save(p, quality=88, optimize=True)
        print(f'mesa → {p}  {t.size[0]}x{t.size[1]}  {os.path.getsize(p)//1024} KB')
        return

    cols, lins = achar_swatches(img)
    if not lins:
        print('não achei os swatches (fundo não destoa o bastante)'); sys.exit(2)
    y0, y1 = lins[0]
    print(f'{len(cols)} swatches, linha y={y0}..{y1}')
    if '--ver' in resto:
        for i, (x0, x1) in enumerate(cols):
            print(f'  {i+1}: x={x0}..{x1}  ({x1-x0}px)')
        return

    nomes = [n for n in resto if not n.startswith('--')]
    for i, (x0, x1) in enumerate(cols):
        mx, my = int((x1 - x0) * MARGEM), int((y1 - y0) * MARGEM)
        rec = img.crop((x0 + mx, y0 + my, x1 - mx, y1 - my))
        t = costurar(rec, LADO_MAT)
        nome = nomes[i] if i < len(nomes) else f'mat{i+1}'
        p = os.path.join(saida, nome + '.jpg')
        t.save(p, quality=90, optimize=True)
        print(f'  {nome:12s} → {p}  {os.path.getsize(p)//1024} KB')


if __name__ == '__main__':
    main()
