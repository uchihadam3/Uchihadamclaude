#!/usr/bin/env python3
"""
RECORTAR — transforma as folhas de arte geradas em peças do jogo.

Os modelos de imagem entregam FOLHAS: uma grade de itens numa tela só. Para o
jogo, cada item precisa virar um PNG próprio, com fundo transparente e sem
sobra em volta. Este arquivo faz esse caminho, e faz de um jeito repetível —
quando chegar arte nova, é só rodar de novo.

DOIS FUNDOS APARECEM NA PRÁTICA, e cada um pede um método diferente:

  MAGENTA CHAPADO (#FF00FF) — pedido no prompt justamente por não existir na
  paleta do jogo. Recorte por cor, direto.

  XADREZ DE TRANSPARÊNCIA — quando o modelo devolve PNG transparente mas o
  arquivo chega como JPEG, a transparência vira o xadrez cinza-e-branco
  DESENHADO na imagem. Aí não dá para recortar por cor: branco também existe
  dentro da arte. O jeito certo é ALAGAMENTO a partir das bordas — só o fundo
  que encosta na borda vira transparente, e o branco de dentro da peça fica.

Depois do recorte, cada célula é aparada na caixa do que sobrou, para a peça
não vir com margem morta que estraga o alinhamento na tela.
"""
import sys, pathlib
import numpy as np
from PIL import Image
from collections import deque

# ─────────────────────────── recorte de fundo ───────────────────────────

def alfa_magenta(a):
    """fundo magenta chapado: some quem é rosa-choque e nada mais"""
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    return ~((r > 170) & (b > 170) & (g < 110) & (r - g > 70) & (b - g > 70))

def alfa_magenta_suave(a):
    """MAGENTA COM MEIO-TOM — para brilho, halo, feixe: coisa que não tem borda.

    O recorte por cor devolve alfa de 0 ou 255, e isso destrói justamente a
    arte de EFEITO: um halo que desbota até o nada vira um disco chapado, e foi
    o que apareceu na tela — a carta some atrás de uma bolha.

    A saída é DESMISTURAR. Sabendo que o fundo é magenta puro, todo pixel é
    `p = a·frente + (1−a)·magenta`. Cada canal dá um piso para `a`, e o maior
    deles é a opacidade mínima que explica a cor:

        a ≥ verde/255      (o magenta não tem verde: todo verde veio da frente)
        a ≥ (255−vermelho)/255  e  a ≥ (255−azul)/255

    Só que essa conta subestima cor quente e opaca — dourado sobre magenta é
    igualzinho a amarelo meio transparente, e não há como distinguir. Por isso
    ela vale SÓ onde o fundo realmente está: alaga-se a partir da borda pelo
    magenta chapado, e o meio-tom fica restrito a essa região. Miolo de peça
    não é discutido — é opaco.
    """
    r, g, b = (a[..., i].astype(np.float32) for i in range(3))
    piso = np.maximum(g, np.maximum(255.0 - r, 255.0 - b)) / 255.0

    # Magenta puro é fundo ONDE ESTIVER — inclusive no miolo de um anel, que é
    # cercado por todo lado e nunca encosta na borda da folha. Alagar só a
    # partir da borda deixava esse miolo opaco: o halo saía com um tampão no
    # meio e a carta desaparecia atrás dele.
    puro = (r > 200) & (b > 200) & (g < 60)
    h, w = a.shape[:2]

    # A zona de meio-tom é o que se alcança a partir do fundo andando só por
    # pixels que PODERIAM ser translúcidos. Contorno preto tem piso 1 e barra a
    # passagem — é o que protege o miolo pintado de um selo ou de um X.
    perto = puro.copy()
    fila = deque(zip(*np.where(puro)))
    passavel = piso < 0.985
    while fila:
        y, x = fila.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and passavel[ny, nx] and not perto[ny, nx]:
                perto[ny, nx] = True; fila.append((ny, nx))

    alfa = np.where(perto, piso, 1.0)
    # O magenta que chega não é exato: a folha veio comprimida e (255,0,255)
    # virou (250,8,252) aqui e ali. Isso dá alfa 2 ou 3 no fundo inteiro — quase
    # nada num pixel, um retângulo de névoa quando são cem mil. Corta-se o pé e
    # reestica o que sobrou, para o degradê continuar chegando até o zero.
    PE = 0.07
    alfa = np.clip((alfa - PE) / (1.0 - PE), 0.0, 1.0)
    return np.clip(alfa * 255.0, 0, 255).astype(np.uint8)

def _parece_xadrez(a):
    """claro e sem cor: é o quadriculado que representa transparência"""
    mx = a[..., :3].max(axis=2).astype(int)
    mn = a[..., :3].min(axis=2).astype(int)
    return (mx > 168) & ((mx - mn) < 26)

def alfa_xadrez(a):
    """ALAGAMENTO a partir da borda.

    Recortar por cor apagaria o branco de dentro das peças (e quase toda peça
    tem brilho branco). Só é fundo o que é claro-sem-cor E está ligado à borda
    da imagem por um caminho de pixels também claros-sem-cor.
    """
    h, w = a.shape[:2]
    cand = _parece_xadrez(a)
    fundo = np.zeros((h, w), bool)
    fila = deque()
    for x in range(w):
        for y in (0, h - 1):
            if cand[y, x] and not fundo[y, x]:
                fundo[y, x] = True; fila.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if cand[y, x] and not fundo[y, x]:
                fundo[y, x] = True; fila.append((y, x))
    while fila:
        y, x = fila.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not fundo[ny, nx]:
                fundo[ny, nx] = True; fila.append((ny, nx))
    return ~fundo

def alfa_branco(a):
    """folha de fundo branco liso (não xadrez): mesmo alagamento, limiar alto"""
    h, w = a.shape[:2]
    mn = a[..., :3].min(axis=2).astype(int)
    cand = mn > 224
    fundo = np.zeros((h, w), bool)
    fila = deque()
    for y in range(h):
        for x in range(w):
            if (y in (0, h-1) or x in (0, w-1)) and cand[y, x] and not fundo[y, x]:
                fundo[y, x] = True; fila.append((y, x))
    while fila:
        y, x = fila.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not fundo[ny, nx]:
                fundo[ny, nx] = True; fila.append((ny, nx))
    return ~fundo

METODOS = { 'magenta': alfa_magenta, 'xadrez': alfa_xadrez, 'branco': alfa_branco,
            'brilho': alfa_magenta_suave }

def limpar(caminho, metodo):
    im = Image.open(caminho).convert('RGB')
    a = np.array(im)
    saida = METODOS[metodo](a)
    # os métodos duros devolvem máscara booleana; o suave já devolve o alfa
    alfa = saida if saida.dtype == np.uint8 else np.where(saida, 255, 0).astype(np.uint8)
    rgba = np.dstack([a, alfa])
    return Image.fromarray(rgba, 'RGBA')

# ─────────────────────────── corte em células ───────────────────────────

def aparar(im, folga=3):
    """corta a moldura vazia em volta da peça"""
    a = np.array(im)
    op = a[..., 3] > 24
    if not op.any(): return None
    ys, xs = np.where(op)
    y0, y1 = max(0, ys.min()-folga), min(a.shape[0], ys.max()+1+folga)
    x0, x1 = max(0, xs.min()-folga), min(a.shape[1], xs.max()+1+folga)
    return im.crop((x0, y0, x1, y1))

def celulas(im, cols, linhas):
    """corta a folha numa grade e apara cada peça"""
    w, h = im.size
    cw, ch = w/cols, h/linhas
    fora = []
    for l in range(linhas):
        for c in range(cols):
            cel = im.crop((int(c*cw), int(l*ch), int((c+1)*cw), int((l+1)*ch)))
            fora.append(aparar(cel))
    return fora

def salvar(peca, destino, lado=None):
    if peca is None: return False
    destino.parent.mkdir(parents=True, exist_ok=True)
    if lado:
        p = peca.copy()
        p.thumbnail((lado, lado), Image.LANCZOS)
        quadro = Image.new('RGBA', (lado, lado), (0,0,0,0))
        quadro.paste(p, ((lado-p.width)//2, (lado-p.height)//2))
        peca = quadro
    peca.save(destino)
    return True

# ─────────────────────────── linha de comando ───────────────────────────
if __name__ == '__main__':
    if len(sys.argv) < 6:
        print('uso: recortar.py <folha> <magenta|xadrez|branco> <colunas> <linhas> <destino> [nomes...]')
        sys.exit(1)
    folha, metodo, cols, linhas, destino = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
    nomes = sys.argv[6:]
    im = limpar(folha, metodo)
    pecas = celulas(im, cols, linhas)
    d = pathlib.Path(destino)
    for i, p in enumerate(pecas):
        nome = nomes[i] if i < len(nomes) else f'{i:02d}'
        if nome == '-': continue
        if salvar(p, d / f'{nome}.png'):
            print(f'  {nome}.png  {p.size[0]}x{p.size[1]}')
        else:
            print(f'  {nome}: célula vazia')
