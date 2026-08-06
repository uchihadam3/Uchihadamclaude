# -*- coding: utf-8 -*-
"""
Fatia as FOLHAS DE ÍCONES da interface (PROMPTS.md §31) em PNGs nomeados.

A folha vem numa grade fixa — 6×4 nos atalhos, 6×3 nos atributos, 6×2 nas missões —
e cada célula
tem um nome combinado de antemão. Por isso o corte não precisa adivinhar nada: a
grade é a mesma que está no prompt, e o mapa de nomes está aqui embaixo.

DUAS COISAS QUE O CORTE FAZ ALÉM DE FATIAR, e que existem por experiência:

 1. APARA a moldura vazia de cada célula. O gerador quase nunca centra o desenho
    com exatidão, e um ícone de 256px com 60px de ar de um lado e 20px do outro
    entra torto no botão. Aparar pelo alfa e recentrar resolve — o que importa é
    o desenho estar no meio, não a célula.

 2. IGUALA o tamanho aparente. Depois de aparar, cada ícone tem um tamanho
    diferente, e uma fileira de botões com símbolos de alturas diferentes parece
    quebrada. Todos são reescalados para a mesma caixa, mantendo a proporção.

O fundo: se a folha vier com alfa de verdade, é só usar. Se vier com o xadrez
pintado por dentro (acontece), passe --xadrez que o recorte do cut_sprite.py roda
antes — é o mesmo problema que ele já resolve, e repetir a heurística aqui seria
manter duas cópias de uma conta difícil.

O `--croma` regula o quanto o recorte considera "cinza demais para ser desenho".
O padrão (22) serve p/ arte saturada, mas a folha de missões tem madeira e pedra
em sombra — cor apagada de verdade — e a 22 o caixote perdia a face direita
inteira. A 12 ele fica inteiro e o xadrez continua saindo.

  python3 scripts/slice_icons.py <folha.png> a|b|c [--xadrez] [--croma 12] [--caixa 200]
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "src", "assets", "ui", "icons")

# ---- os mapas de nome, na MESMA ordem de leitura do prompt (esquerda→direita,
# ---- linha a linha). Mudar um nome aqui sem mudar o prompt desalinha tudo.
FOLHAS = {
    "a": {
        "grade": (6, 4),
        "nomes": [
            "amigos", "companhia", "opcoes", "diario", "chat", "buscar",
            "fechar", "expandir", "equipar", "loja", "missao", "selado",
            "cima", "baixo", "avancar", "voltar", "repetir", "sair",
            "objetivo", "concluido", "lider", "caido", "somar", "ouro",
        ],
    },
    # a folha C é de ÍCONES DE MISSÃO: um por assunto, não por função da tela.
    # Eles são traduzidos em controls.ts (MISSAO_ICO), e não citados direto pelas
    # definições de missão — quem escreve uma missão nova continua escolhendo um
    # emoji, e ele vira arte se houver equivalente.
    "c": {
        "grade": (6, 2),
        "nomes": [
            "bussola", "vilarejo", "lanterna", "onda", "leviata", "caixa",
            "rato", "aranha", "chama", "caneca", "frasco", "bigorna",
        ],
    },
    "b": {
        "grade": (6, 3),
        "nomes": [
            "forca", "destreza", "inteligencia", "dano", "dano_magico", "vida",
            "mana", "defesa", "resist_magica", "precisao", "critico", "dano_critico",
            "vel_ataque", "roubo_vida", "veneno", "regeneracao", "recarga", "bloqueio",
        ],
    },
}


def so_o_dourado(im: Image.Image, croma_min: float = 22.0) -> Image.Image:
    """
    Joga fora os CACOS DE XADREZ que sobraram do recorte, dentro da célula.

    O recorte do cut_sprite.py é feito p/ bichos com aura e, numa folha de
    ícones, deixa passar pedacinhos do quadriculado espalhados entre as células —
    apareceram aos montes na folha de atributos.

    Aqui existe uma regra que não existe lá e resolve sozinha: o prompt pede os
    ícones em METAL DOURADO e o xadrez é CINZA PURO. Então cada mancha isolada é
    julgada pela cor: dourado fica, cinza sai. É melhor que julgar pelo tamanho —
    algumas peças legítimas são pequenas (as quatro setas do "expandir", os cacos
    do "dano crítico"), e um corte por área levaria essas junto.

    O vidro da lupa e a areia da ampulheta são acinzentados, mas vêm GRUDADOS no
    aro dourado: são a mesma mancha, e a mediana dela continua dourada.
    """
    px = np.array(im)
    alfa = px[..., 3] > 24
    if not alfa.any():
        return im
    rgb = px[..., :3].astype(np.float32)
    croma = rgb.max(2) - rgb.min(2)
    ilhas, n = ndimage.label(alfa)
    if n <= 1:
        return im
    fora = np.zeros(n + 1, bool)
    for i in range(1, n + 1):
        m = ilhas == i
        fora[i] = float(np.median(croma[m])) < croma_min
    px[..., 3] = np.where(fora[ilhas], 0, px[..., 3])

    # SEGUNDO PASSE, por PIXEL: às vezes o caco de xadrez encosta no desenho e
    # vira a mesma mancha — aí a mediana dela continua dourada e o teste por ilha
    # não pega (aconteceu com o caixote e com a bigorna). Cinza QUASE PURO é
    # sempre resto de fundo: mesmo as partes pálidas da arte (o vidro da lupa, a
    # areia da ampulheta) têm o tom quente do metal, e só 0,3% dos pixels delas
    # ficam abaixo deste limite — contra 6% da peça contaminada.
    quase_cinza = (croma < 8) & (px[..., 3] > 0)
    px[..., 3] = np.where(quase_cinza, 0, px[..., 3])

    # e agora que os apêndices se soltaram, some com as lascas: o que sobrou de
    # cinza vira ilhas minúsculas ao lado de um desenho grande
    alfa2 = px[..., 3] > 24
    ilhas2, n2 = ndimage.label(alfa2)
    if n2 > 1:
        areas = ndimage.sum(np.ones_like(alfa2, float), ilhas2, range(1, n2 + 1))
        limite = areas.max() * 0.02          # 2% da maior parte do ícone
        # peças legítimas e pequenas existem (as setas do "expandir", os cacos do
        # "dano crítico"), e todas são DOURADAS — por isso o corte por tamanho só
        # vale depois do corte por cor, nunca antes
        mata = np.array([False] + [a < limite for a in areas])
        px[..., 3] = np.where(mata[ilhas2], 0, px[..., 3])
    return Image.fromarray(px)


def apara(im: Image.Image) -> Image.Image | None:
    """
    Corta o ar em volta do desenho, pelo alfa. `None` = célula sem desenho algum.

    Devolver a célula inteira quando ela está vazia (a primeira versão fazia isso)
    engana a checagem lá embaixo: 256px de nada passa por "ícone grande" e vira um
    PNG transparente que só se descobre no jogo, quando o botão fica em branco.
    """
    a = np.array(im)[..., 3]
    ys, xs = np.nonzero(a > 8)
    if not len(ys):
        return None
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def na_caixa(im: Image.Image, lado: int) -> Image.Image:
    """Encaixa o ícone numa caixa quadrada, centrado e sem distorcer."""
    w, h = im.size
    escala = lado / max(w, h)
    novo = im.resize((max(1, round(w * escala)), max(1, round(h * escala))), Image.LANCZOS)
    tela = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    tela.paste(novo, ((lado - novo.width) // 2, (lado - novo.height) // 2))
    return tela


def main() -> None:
    if len(sys.argv) < 3 or sys.argv[2] not in FOLHAS:
        raise SystemExit(__doc__)
    ent, qual = sys.argv[1], sys.argv[2]
    lado = 200
    if "--caixa" in sys.argv:
        lado = int(sys.argv[sys.argv.index("--caixa") + 1])

    im = Image.open(ent).convert("RGBA")
    if "--xadrez" in sys.argv:
        # a folha veio opaca com o quadriculado desenhado: reaproveita o recorte
        # que já existe em vez de reescrever a heurística
        from cut_sprite import recorta  # noqa: PLC0415  (só quando pedido)
        cm = 22.0
        if "--croma" in sys.argv:
            cm = float(sys.argv[sys.argv.index("--croma") + 1])
        rgb = np.array(im)[..., :3]
        im = Image.fromarray(np.dstack([rgb, recorta(rgb, cm)]))

    cols, linhas = FOLHAS[qual]["grade"]
    nomes = FOLHAS[qual]["nomes"]
    if len(nomes) != cols * linhas:
        raise SystemExit(f"mapa da folha {qual}: {len(nomes)} nomes p/ {cols*linhas} células")
    cw, ch = im.width / cols, im.height / linhas
    os.makedirs(SAIDA, exist_ok=True)

    vazias = []
    for i, nome in enumerate(nomes):
        c, r = i % cols, i // cols
        cel = im.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch)))
        cortado = apara(so_o_dourado(cel))
        # célula vazia (ou quase) é ícone que o gerador não desenhou — avisa em
        # vez de gravar um PNG transparente que ninguém nota até estar no jogo
        if cortado is None or cortado.width < cw * 0.12 or cortado.height < ch * 0.12:
            vazias.append(nome)
            continue
        na_caixa(cortado, lado).save(os.path.join(SAIDA, f"ico_{nome}.png"))
        print(f"  ico_{nome}.png  ({cortado.width}x{cortado.height} → {lado}x{lado})")

    print(f"\n{len(nomes) - len(vazias)}/{len(nomes)} em {SAIDA}")
    if vazias:
        print("CÉLULAS VAZIAS (regerar a folha):", ", ".join(vazias))


if __name__ == "__main__":
    main()
