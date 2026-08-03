"""Recorta o fundo das artes de classe e reenquadra p/ o padrão do jogo.

O fundo (xadrez cinza ou branco) foi PINTADO na imagem — não há canal alpha.
Como o personagem tem partes cinzas (armadura!), não dá p/ mascarar só por cor:
o corte é por PREENCHIMENTO a partir das bordas, então só o fundo CONECTADO à
borda sai e o cinza de dentro da silhueta é preservado.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

W, H = 848, 1264          # moldura final (mesma das artes de aldeão)
FEET = 0.985              # pés a ~98,5% da altura

def _cores_do_xadrez(a):
    """As 2 cinzas chapadas mais comuns na BORDA — as cores do xadrez/fundo."""
    from collections import Counter
    h, w = a.shape[:2]
    c = Counter()
    for y in list(range(0, 6)) + list(range(h - 6, h)):
        for x in range(0, w, 3):
            p = a[y, x]
            if int(p.max()) - int(p.min()) <= 4:
                c[int(p.mean())] += 1
    for x in list(range(0, 6)) + list(range(w - 6, w)):
        for y in range(0, h, 3):
            p = a[y, x]
            if int(p.max()) - int(p.min()) <= 4:
                c[int(p.mean())] += 1
    # as duas cores do xadrez são BEM diferentes (ex.: 255 e 207). Pegar só os "2
    # mais comuns" devolvia 255 e 254 — o mesmo branco com anti-aliasing — e o
    # cinza nunca entrava. Então exige tons separados por pelo menos 15.
    escolhidas = []
    for v, _ in c.most_common():
        if all(abs(v - e) > 15 for e in escolhidas):
            escolhidas.append(v)
        if len(escolhidas) == 2:
            break
    return escolhidas


def recortar(src, dst):
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(np.int16)
    # 1) candidato a fundo: cinza NEUTRO (r≈g≈b) — o fundo é sempre neutro
    spread = a.max(axis=2) - a.min(axis=2)
    lum = a.mean(axis=2)
    neutro = (spread <= 16) & (lum >= 85)      # xadrez do ladino começa em ~100
    # 2) só o que está CONECTADO à borda é fundo de verdade
    lbl, n = ndimage.label(neutro)
    bordas = set(lbl[0, :]) | set(lbl[-1, :]) | set(lbl[:, 0]) | set(lbl[:, -1])
    bordas.discard(0)
    fundo = np.isin(lbl, list(bordas))
    # 2b) o xadrez também foi pintado DENTRO de áreas fechadas (o vão da alça da
    # lanterna, o punho fechado) — ali o preenchimento pela borda não chega. Estes
    # pixels são CHAPADOS e exatamente na cor do xadrez, então dá p/ tirá-los pela
    # cor; a arte tem textura, então não é confundida. Só remove manchas grandes.
    cores = _cores_do_xadrez(a)
    # Só remove por COR quando o fundo é CLARO (>=180). Aí ele contrasta forte com a
    # arte sombria e o teste é seguro. Quando o xadrez é cinza ESCURO (o do ladino é
    # 100/151) ele cai na mesma faixa do couro escuro e a remoção começa a furar o
    # personagem — nesse caso fica só o preenchimento pela borda, que nunca erra.
    if cores and min(cores) < 180:
        print(f"    (fundo escuro {cores}: remoção por cor desativada, só borda)")
        cores = []
    if cores:
        # o xadrez nem sempre é perfeitamente neutro (a IA às vezes o tinge de leve:
        # spread até ~18). A ARTE em volta é bem mais colorida (a túnica creme tem
        # spread 36-67), então 22 separa os dois com folga.
        chapado = (spread <= 22)
        igual = np.zeros_like(chapado)
        for c in cores:
            igual |= chapado & (np.abs(lum - c) <= 10)
        # 8-vizinhos: os quadrados do xadrez só se encostam na DIAGONAL, então com
        # 4-vizinhos cada um vira um componente solto e os menores escapavam.
        l2, _ = ndimage.label(igual, structure=np.ones((3, 3), int))
        if l2.max():
            areas = np.bincount(l2.ravel())
            grandes = np.where(areas >= 24)[0]
            grandes = grandes[grandes != 0]
            extra = np.isin(l2, grandes) & ~fundo   # o que ESTA passada tiraria a mais
            # TRAVA: quando o fundo é cinza ESCURO (o do ladino é 100/151) ele se
            # confunde com roupa escura e esta passada começa a furar o personagem.
            # Se ela morder mais que 4% do corpo, é sinal de que está comendo arte —
            # então descarta e fica só com o preenchimento pela borda, que é seguro.
            corpo_area = int((~fundo).sum())
            if corpo_area and extra.sum() / corpo_area <= 0.04:
                fundo |= extra
            else:
                print(f"    (passada interna descartada: morderia "
                      f"{extra.sum() / max(1, corpo_area) * 100:.1f}% do personagem)")
    # 2c) o que sobrou de xadrez fica ILHADO no meio do fundo já removido. Como o
    # personagem é UM bloco só, basta manter o maior componente conectado: todo
    # detrito solto (restos do padrão) some sem precisar acertar pixel a pixel.
    corpo = ~fundo
    l3, k = ndimage.label(corpo, structure=np.ones((3, 3), int))
    if k > 1:
        areas = np.bincount(l3.ravel())
        areas[0] = 0
        fundo = l3 != int(areas.argmax())
    alpha = np.where(fundo, 0, 255).astype(np.uint8)
    # 3) come 1px da franja (resto de anti-aliasing claro na silhueta)
    alpha = ndimage.grey_erosion(alpha, size=(2, 2))
    out = Image.fromarray(np.dstack([np.asarray(im), alpha]), "RGBA")
    # 4) recorta no personagem e reenquadra: centralizado, pés na base
    bbox = out.getchannel("A").getbbox()
    if not bbox:
        raise SystemExit(f"{src}: nada sobrou no recorte")
    fig = out.crop(bbox)
    esc = min((W * 0.92) / fig.width, (H * FEET) / fig.height)
    fig = fig.resize((max(1, int(fig.width * esc)), max(1, int(fig.height * esc))), Image.LANCZOS)
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.paste(fig, ((W - fig.width) // 2, int(H * FEET) - fig.height), fig)
    # suaviza a borda do alpha (sem halo, pro alphaTest do billboard)
    ca = canvas.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
    canvas.putalpha(ca)
    canvas.save(dst)
    op = np.asarray(ca) > 10
    print(f"  {dst.split('/')[-1]}: recorte {bbox[2]-bbox[0]}x{bbox[3]-bbox[1]} -> {W}x{H}, "
          f"{op.mean()*100:.1f}% opaco")

if __name__ == "__main__":
    recortar(sys.argv[1], sys.argv[2])
