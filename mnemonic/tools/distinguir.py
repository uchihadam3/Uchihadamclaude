#!/usr/bin/env python3
"""
DISTINGUIR — prova que os 18 símbolos de uma família não se confundem.

Este é o único teste que importa para a arte que vai DENTRO da carta. Um
símbolo feio é um problema de gosto; dois símbolos parecidos são um problema
de REGRA: o jogador guarda "aquele triângulo com uma barra", vira a outra
carta, e o par não fecha. Do lado dele isso é indistinguível de trapaça.

Como se mede. Cada peça é composta sobre um cinza médio — porque no jogo ela
vai sobre a cor da família, e o que sobrevive é o contraste, não a cor do PNG
— e reduzida a 24×24 em tons de cinza. Comparar SILHUETA não bastaria: no
Xadrez, o quadrado preto e o quadrado marfim têm exatamente o mesmo contorno e
são a coisa mais fácil de distinguir da folha inteira. O que se compara é a
mancha de luz, que é o que o olho pega de relance num tabuleiro.

A distância é a raiz do erro quadrático médio, de 0 (idênticos) a 255.

    python3 tools/distinguir.py                 # todas as famílias pintadas
    python3 tools/distinguir.py runas espaco    # só estas
"""
import sys, pathlib, itertools
import numpy as np
from PIL import Image

LADO = 24
FUNDO = 128          # o cinza sobre o qual tudo é comparado
PERTO = 26.0         # abaixo disto, o par é perto demais para um jogo de memória

def assinatura(caminho):
    im = Image.open(caminho).convert('RGBA')
    a = np.array(im).astype(float)
    alfa = a[..., 3:4] / 255.0
    # compõe sobre o cinza: o que o jogador vê é a peça POR CIMA de algo
    rgb = a[..., :3] * alfa + FUNDO * (1 - alfa)
    cinza = 0.2126*rgb[...,0] + 0.7152*rgb[...,1] + 0.0722*rgb[...,2]
    p = Image.fromarray(cinza.astype(np.uint8), 'L')
    # enquadra na caixa da peça: dois símbolos não podem se distinguir só por
    # terem sido desenhados em tamanhos diferentes na folha
    op = np.array(im)[..., 3] > 24
    if op.any():
        ys, xs = np.where(op)
        p = p.crop((xs.min(), ys.min(), xs.max()+1, ys.max()+1))
    return np.array(p.resize((LADO, LADO), Image.LANCZOS), float)

def conferir(pasta):
    fs = sorted(pathlib.Path(pasta).glob('*.png'))
    ass = {f.stem: assinatura(f) for f in fs}
    pares = []
    for a, b in itertools.combinations(sorted(ass), 2):
        d = float(np.sqrt(((ass[a] - ass[b]) ** 2).mean()))
        pares.append((d, a, b))
    pares.sort()
    return len(fs), pares

def escolher(pasta, quantos=18):
    """Das N células de uma folha, quais 18 formam o conjunto mais separado.

    As folhas voltam com sobra: pedi 18 e vieram 20, 25, às vezes com a última
    fila repetida. Escolher a dedo é o que eu vinha fazendo, e é ruim por dois
    motivos: eu comparo par a par com o olho, que cansa, e a decisão não fica
    registrada em lugar nenhum — na próxima folha começa do zero.

    Aqui é guloso e explicável: começa pelo par mais distante que existe na
    folha e, a cada rodada, entra a célula que fica MAIS LONGE da mais parecida
    já escolhida. Não é o ótimo global (isso é caro e não vale), mas ataca
    exatamente o que estraga um jogo de memória: o par mais próximo do conjunto.
    """
    fs = sorted(pathlib.Path(pasta).glob('*.png'))
    nomes = [f.stem for f in fs]
    ass = {f.stem: assinatura(f) for f in fs}
    d = {(a, b): float(np.sqrt(((ass[a] - ass[b]) ** 2).mean()))
         for a, b in itertools.permutations(nomes, 2)}
    if len(nomes) <= quantos: return nomes
    a, b = max(itertools.combinations(nomes, 2), key=lambda p: d[p])
    escolhidos = [a, b]
    while len(escolhidos) < quantos:
        resto = [n for n in nomes if n not in escolhidos]
        proximo = max(resto, key=lambda n: min(d[(n, e)] for e in escolhidos))
        escolhidos.append(proximo)
    return sorted(escolhidos)

if __name__ == '__main__':
    if sys.argv[1:2] == ['escolher']:
        for pasta in sys.argv[2:]:
            fora = escolher(pasta)
            n, pares = conferir(pasta)
            print(f'{pathlib.Path(pasta).name}: {" ".join(fora)}')
            sub = [p for p in pares if p[1] in fora and p[2] in fora]
            print(f'   par mais próximo entre os escolhidos: '
                  f'{sub[0][1]} × {sub[0][2]} = {sub[0][0]:.1f}')
        sys.exit(0)
    alvos = sys.argv[1:] or sorted(p.name for p in pathlib.Path('arte/glifo').iterdir() if p.is_dir())
    ruim = 0
    for fam in alvos:
        # aceita o nome de uma família OU o caminho de uma pasta qualquer, para
        # dar para medir uma folha nova antes de decidir se ela substitui a que
        # já está no jogo
        pasta = fam if pathlib.Path(fam).is_dir() else 'arte/glifo/' + fam
        n, pares = conferir(pasta)
        print(f'\n── {pathlib.Path(pasta).name}: {n} símbolos, {len(pares)} pares')
        for d, a, b in pares[:4]:
            marca = '  ✗ PERTO DEMAIS' if d < PERTO else ''
            print(f'   {a} × {b}   {d:6.1f}{marca}')
            if d < PERTO: ruim += 1
        print(f'   mediana {np.median([p[0] for p in pares]):.1f}')
    print('\n' + ('✗ %d par(es) perto demais' % ruim if ruim else '✓ nenhum par confundível'))
    sys.exit(1 if ruim else 0)
