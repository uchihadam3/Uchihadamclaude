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

def cor_da_borda(a):
    """A cor-chave desta imagem, lida na moldura de fora.

    Serve para folha que NÃO veio com o magenta pedido — e isso acontece: o
    modelo às vezes pinta um fundo diferente em cada célula. Como o item está
    sempre no meio, a borda é fundo puro, e a cor que mais aparece nela é a
    chave. Moda em vez de média porque média entre dois tons devolve um
    terceiro que não existe em lugar nenhum.
    """
    h, w = a.shape[:2]
    m = max(2, min(h, w) // 40)
    borda = np.concatenate([a[:m].reshape(-1,3), a[-m:].reshape(-1,3),
                            a[:, :m].reshape(-1,3), a[:, -m:].reshape(-1,3)])
    # agrupa em degraus de 8 para o ruído de compressão não virar cor nova
    chaves, contas = np.unique(borda // 8, axis=0, return_counts=True)
    return (chaves[contas.argmax()] * 8 + 4).astype(int)

def alfa_chave(a, k=None):
    """DESMISTURA DE UMA COR-CHAVE QUALQUER, com meio-tom.

    Mesma conta do magenta, escrita para uma chave `k` arbitrária: cada canal
    diz qual é a opacidade MÍNIMA que explica aquele pixel como frente sobre a
    chave, e a maior das três é a resposta.

        canal abaixo da chave:  a ≥ (k−p)/k
        canal acima da chave:   a ≥ (p−k)/(255−k)

    Canal quase saturado na chave só informa para UM lado, e o outro lado tem
    de ser DESCARTADO — não apenas protegido contra divisão por zero. O
    vermelho do magenta vale 252: dividir por (255−252) transforma dois níveis
    de ruído de compressão em 67% de opacidade, e a folha inteira deixa de ser
    fundo. Foi exatamente o que aconteceu: nada era aparado e cada peça saía do
    tamanho da célula. Abaixo de 32 de folga, o lado não é usado.
    """
    if k is None: k = cor_da_borda(a)
    k = np.asarray(k, float)
    p = a[..., :3].astype(np.float32)
    FOLGA = 32.0
    piso = np.zeros(a.shape[:2], np.float32)
    for c in range(3):
        if k[c] >= FOLGA:
            piso = np.maximum(piso, (k[c] - p[..., c]) / k[c])
        if 255.0 - k[c] >= FOLGA:
            piso = np.maximum(piso, (p[..., c] - k[c]) / (255.0 - k[c]))
    piso = np.clip(piso, 0.0, 1.0)

    # fundo sem dúvida: praticamente a chave em cor
    puro = np.abs(p - k).max(axis=2) < 14
    h, w = a.shape[:2]

    # A FRANJA TEM ESPESSURA, E É FINA. O contorno de uma peça desbota contra o
    # fundo em uns poucos pixels — é só essa faixa que pode ter meio-tom. Deixar
    # o alagamento correr livre por tudo que "poderia ser translúcido" foi o que
    # arruinou as molduras das classes: onde o contorno preto afinava um pouco,
    # a inundação entrava e tomava a madeira inteira com 76% de opacidade. A
    # moldura ficava meio transparente e, descontaminada, saía verde.
    FRANJA = 6
    perto = puro.copy()
    fila = deque((y, x, 0) for y, x in zip(*np.where(puro)))
    passavel = piso < 0.985
    while fila:
        y, x, d = fila.popleft()
        if d >= FRANJA: continue
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and passavel[ny, nx] and not perto[ny, nx]:
                perto[ny, nx] = True; fila.append((ny, nx, d+1))

    # Duas portas para ser fundo, e as duas são necessárias. A primeira é estar
    # na franja (acima). A segunda é ser QUASE a chave em cor: uma tira de
    # magenta que sobrou da célula vizinha pode estar longe de qualquer magenta
    # puro desta célula, e sem esta porta ela ficaria opaca — foi o que deixou
    # um risco cor-de-rosa na lateral de metade das classes. Peça nenhuma tem
    # cor perto da chave; é justamente por isso que a chave foi escolhida.
    alfa = np.where(perto | (piso < 0.25), piso, 1.0)
    PE = 0.07
    return np.clip(np.clip((alfa - PE) / (1.0 - PE), 0, 1) * 255.0, 0, 255).astype(np.uint8)

def descontaminar(p, k, alfa):
    """Tira a cor do fundo de dentro da borda da peça.

    O contorno preto não termina no pixel: ele desbota contra o fundo por dois
    ou três pixels. Esses pixels são meio pretos e meio MAGENTA, e continuam
    meio magenta depois de recortados — cada peça fica com uma franja roxa em
    volta, que aparece na hora em que ela é posta sobre o azul do jogo.

    Sabendo o alfa e a chave, a cor de frente sai da mesma equação, ao
    contrário: `f = (p − (1−a)·k) / a`. Onde a peça é opaca isso não muda nada;
    na franja, devolve o preto que estava debaixo do magenta.
    """
    a = (alfa.astype(np.float32) / 255.0)[..., None]
    k = np.asarray(k, np.float32)
    seguro = np.maximum(a, 1/255)
    f = (p.astype(np.float32) - (1 - a) * k) / seguro
    return np.clip(np.where(a > 0.004, f, p), 0, 255).astype(np.uint8)

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

def limpar_sobras(im):
    """Tira o que sobrou da célula vizinha.

    Mesmo com a grade encontrada no degrau certo, um item que passa da própria
    célula deixa uma tira colada na borda da célula do lado. A tira sobrevive
    ao recorte porque não tem a cor de fundo DAQUELA célula, e aí a peça vem
    com um pedaço de outra coisa no canto.

    A regra que separa uma coisa da outra: sobra ENCOSTA na borda e é pequena.
    O item de verdade está no meio. Não vale simplesmente ficar com a maior
    mancha — o frasco de veneno tem uma gota solta no ar, e ela não pode ser
    jogada fora junto.
    """
    a = np.array(im)
    op = a[..., 3] > 24
    if not op.any(): return im
    h, w = a.shape[:2]
    visto = np.zeros((h, w), bool)
    total = op.sum()
    for sy, sx in zip(*np.where(op)):
        if visto[sy, sx]: continue
        pilha = [(sy, sx)]; visto[sy, sx] = True
        mancha = []; encosta = False
        while pilha:
            y, x = pilha.pop()
            mancha.append((y, x))
            if y in (0, h-1) or x in (0, w-1): encosta = True
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y+dy, x+dx
                if 0 <= ny < h and 0 <= nx < w and op[ny, nx] and not visto[ny, nx]:
                    visto[ny, nx] = True; pilha.append((ny, nx))
        if encosta and len(mancha) < total * 0.25:
            for y, x in mancha: a[y, x, 3] = 0
    return Image.fromarray(a, 'RGBA')

def so_a_maior(im):
    """Fica só com a mancha maior — para peça que é UMA coisa inteiriça.

    Os modelos assinam: quase toda folha volta com um brilhinho de quatro
    pontas solto num canto. Numa moldura de carta isso é fatal, porque a
    moldura é oca de propósito e o brilho fica boiando no meio do buraco — a
    carta ganha uma estrelinha rosa que ninguém pediu.

    Não vale como regra geral (o frasco de veneno tem uma gota separada e ela
    é parte do desenho), então quem chama é quem sabe que a peça é inteiriça.
    """
    a = np.array(im)
    op = a[..., 3] > 24
    if not op.any(): return im
    h, w = a.shape[:2]
    visto = np.zeros((h, w), bool)
    maior, manchas = None, []
    for sy, sx in zip(*np.where(op)):
        if visto[sy, sx]: continue
        pilha = [(sy, sx)]; visto[sy, sx] = True; mancha = []
        while pilha:
            y, x = pilha.pop(); mancha.append((y, x))
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y+dy, x+dx
                if 0 <= ny < h and 0 <= nx < w and op[ny, nx] and not visto[ny, nx]:
                    visto[ny, nx] = True; pilha.append((ny, nx))
        manchas.append(mancha)
        if maior is None or len(mancha) > len(maior): maior = mancha
    for m in manchas:
        if m is maior: continue
        for y, x in m: a[y, x, 3] = 0
    return Image.fromarray(a, 'RGBA')

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

def fronteiras(a, n, eixo):
    """Onde a grade REALMENTE corta, em vez de onde a divisão diz que corta.

    A folha nunca volta com a grade no pixel exato: 1456 dividido por 6 dá
    242,67 e o modelo desenhou os cortes em 242, 485, 727, 970, 1212. São dois
    ou três pixels de erro — invisíveis olhando, e o bastante para cada peça
    sair com uma tira da cor da vizinha grudada na borda. Essa tira não é o
    fundo daquela célula, então sobrevive ao recorte, e aí NADA é aparado: a
    peça sai do tamanho da célula inteira, com moldura de lixo.

    Duas folhas pedem dois critérios, e usar um só quebra a outra:

      COM CORREDOR — quase toda folha deixa uma faixa de fundo entre as peças.
      Ali a fronteira é a linha CHAPADA: uma cor só de ponta a ponta. Basta
      achar essa faixa e cortar no meio dela.

      SEM CORREDOR — a folha dos tipos veio com as células coladas, cada uma de
      uma cor. Não há faixa chapada em lugar nenhum, e o que marca a fronteira é
      o DEGRAU de cor entre uma célula e a seguinte.

    Procurar só o degrau parecia bastar, e não bastava: numa folha com corredor,
    o contorno preto de uma peça é um degrau maior que o do fundo, e a grade
    saía deslocada dez pixels — cada classe vinha com uma tira da vizinha
    colada. Por isso o corredor tem a palavra final quando existe.
    """
    lado = a.shape[1] if eixo == 1 else a.shape[0]
    passo = lado / n
    ai = a.astype(int)
    dif = np.abs(np.diff(ai, axis=eixo)).sum(axis=(1-eixo, 2))
    # linha chapada: quase tudo igual à mediana dela mesma
    linhas = ai if eixo == 0 else ai.transpose(1, 0, 2)
    med = np.median(linhas, axis=1, keepdims=True)
    chapada = (np.abs(linhas - med).max(axis=2) < 20).mean(axis=1) > 0.92

    cortes = [0]
    janela = max(3, int(passo * 0.04))
    for i in range(1, n):
        alvo = int(round(i * passo))
        a0, a1 = max(1, alvo - janela), min(lado - 1, alvo + janela + 1)
        faixa = np.where(chapada[a0:a1])[0]
        if len(faixa):
            cortes.append(a0 + int(round(faixa.mean())))
        else:
            cortes.append(a0 + int(np.argmax(dif[a0:a1])) + 1)
    cortes.append(lado)
    return cortes

def celulas_por_fundo(caminho, cols, linhas):
    """CADA CÉLULA COM O SEU PRÓPRIO FUNDO.

    O pedido é sempre fundo magenta chapado, mas o modelo nem sempre obedece:
    a folha dos tipos de carta voltou com uma cor de fundo diferente em cada
    célula — rosa, azul, verde, cinza. Recortar a folha inteira por uma chave
    só apagaria uma célula e deixaria as outras dezessete com o fundo colado.

    Aqui a folha é cortada PRIMEIRO e cada pedaço descobre a sua própria chave
    na borda. Funciona igual quando o fundo é o mesmo em todas.
    """
    a = np.array(Image.open(caminho).convert('RGB'))
    xs = fronteiras(a, cols, 1)
    ys = fronteiras(a, linhas, 0)
    fora = []
    for l in range(linhas):
        for c in range(cols):
            # mais dois pixels para dentro: o degrau em si é meio termo entre
            # as duas cores e não pertence a célula nenhuma
            y0, y1 = ys[l] + 2, ys[l+1] - 2
            x0, x1 = xs[c] + 2, xs[c+1] - 2
            cel = a[y0:y1, x0:x1]
            k = cor_da_borda(cel)
            alfa = alfa_chave(cel, k)
            rgba = np.dstack([descontaminar(cel, k, alfa), alfa])
            fora.append(aparar(limpar_sobras(Image.fromarray(rgba, 'RGBA'))))
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
        print('uso: recortar.py <folha> <magenta|brilho|celula|xadrez|branco> '
              '<colunas> <linhas> <destino> [nomes...]')
        print('  celula = cada célula descobre a própria cor de fundo')
        sys.exit(1)
    folha, metodo, cols, linhas, destino = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
    nomes = sys.argv[6:]
    if metodo == 'celula':
        pecas = celulas_por_fundo(folha, cols, linhas)
    else:
        pecas = celulas(limpar(folha, metodo), cols, linhas)
    d = pathlib.Path(destino)
    for i, p in enumerate(pecas):
        nome = nomes[i] if i < len(nomes) else f'{i:02d}'
        if nome == '-': continue
        if salvar(p, d / f'{nome}.png'):
            print(f'  {nome}.png  {p.size[0]}x{p.size[1]}')
        else:
            print(f'  {nome}: célula vazia')
