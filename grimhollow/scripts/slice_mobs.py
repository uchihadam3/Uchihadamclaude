# -*- coding: utf-8 -*-
"""
Fatia uma FOLHA DE CRIATURAS de fundo MAGENTA em PNGs nomeados e transparentes.

POR QUE MAGENTA E NÃO "FUNDO TRANSPARENTE". Pedir transparência ao gerador quase
nunca dá transparência: vem o quadriculado PINTADO por dentro da imagem, ou vem
uma aura larga em volta do bicho que nenhuma heurística de croma separa direito
— foi o que estragou a aberração do Ato II. Magenta puro não existe em pele, em
pelo, em couro nem em metal, então o recorte deixa de ser adivinhação e vira uma
conta de distância de cor.

AS DUAS CONTAS QUE O SCRIPT FAZ:

 1. RECORTE por distância ao magenta. Tudo que está perto de #FF00FF vira alfa 0.
    O limiar é generoso porque o gerador nunca entrega o magenta exato — ele
    entrega uma nuvem em volta dele.

 2. FRANJA, que é a parte que quase todo mundo esquece. O pixel da BORDA do
    desenho sai MISTURADO com o fundo: meio pelo, meio magenta. Zerar só o alfa
    deixa esse rosa grudado no contorno, e ele só aparece depois, no jogo, contra
    um cenário escuro. Aqui o vermelho e o azul de cada pixel de borda são
    puxados de volta para o nível do verde (que o magenta não contamina, porque
    magenta é R e B sem G), e o alfa recebe o quanto de desenho havia ali.

  python3 scripts/slice_mobs.py <folha.png> [--grade 3x2] [--limiar 90] [--caixa 512]
"""
import os
import sys

import numpy as np
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "src", "assets", "env")

# Ordem de leitura da folha (esquerda→direita, linha a linha), igual à tabela do
# PROMPTS.md §34. Mudar um nome aqui sem mudar o prompt desalinha tudo.
NOMES = [
    "enemy_lobo", "enemy_javali", "enemy_salteador",
    "enemy_besteiro", "enemy_corvo", "enemy_raiz",
]


def sem_magenta(cel: np.ndarray, limiar: float) -> np.ndarray:
    """RGBA da célula com o fundo magenta removido e a franja limpa."""
    rgb = cel[..., :3].astype(np.float32)
    R, G, B = rgb[..., 0], rgb[..., 1], rgb[..., 2]

    # "quanto isto é magenta": R e B altos, G baixo. Um pixel de desenho pode ter
    # R e B altos (pele rosada), mas então G também sobe — é o G que separa.
    magenta = np.minimum(R, B) - G
    alfa = np.clip(magenta / limiar, 0.0, 1.0)      # 1 = fundo puro, 0 = desenho
    saida_alfa = (1.0 - alfa) * 255.0

    # DESCONTA A FRANJA: onde havia mistura, R e B carregam magenta emprestado.
    # Puxá-los de volta ao nível do G devolve a cor que o desenho tinha ali.
    mist = (alfa > 0.02) & (alfa < 0.98)
    R = np.where(mist, np.minimum(R, G + (R - G) * (1 - alfa)), R)
    B = np.where(mist, np.minimum(B, G + (B - G) * (1 - alfa)), B)

    out = np.dstack([R, G, B, saida_alfa]).clip(0, 255).astype(np.uint8)
    return out


def apara(im: Image.Image) -> Image.Image | None:
    """Corta o ar em volta pelo alfa. None = célula sem desenho nenhum."""
    a = np.array(im)[..., 3]
    ys, xs = np.nonzero(a > 10)
    if not len(ys):
        return None
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def na_caixa(im: Image.Image, lado: int) -> Image.Image:
    """Encaixa numa caixa quadrada, centrado embaixo e sem distorcer.
    Centrado EMBAIXO e não no meio: o jogo apoia o sprite pelo pé, então o que
    tem de ficar previsível é a linha do chão, não o miolo do desenho."""
    w, h = im.size
    escala = lado / max(w, h)
    novo = im.resize((max(1, round(w * escala)), max(1, round(h * escala))), Image.LANCZOS)
    tela = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    tela.paste(novo, ((lado - novo.width) // 2, lado - novo.height))
    return tela


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    ent = sys.argv[1]
    arg = lambda nome, padrao: (
        sys.argv[sys.argv.index(nome) + 1] if nome in sys.argv else padrao
    )
    cols, linhas = (int(x) for x in str(arg("--grade", "3x2")).split("x"))
    limiar = float(arg("--limiar", 90))
    lado = int(arg("--caixa", 512))

    if len(NOMES) != cols * linhas:
        raise SystemExit(f"mapa de nomes: {len(NOMES)} p/ {cols * linhas} células")

    im = np.array(Image.open(ent).convert("RGB"))
    ch, cw = im.shape[0] / linhas, im.shape[1] / cols
    os.makedirs(SAIDA, exist_ok=True)

    vazias = []
    for i, nome in enumerate(NOMES):
        c, r = i % cols, i // cols
        cel = im[round(r * ch):round((r + 1) * ch), round(c * cw):round((c + 1) * cw)]
        rec = Image.fromarray(sem_magenta(cel, limiar))
        cortado = apara(rec)
        # célula vazia é bicho que o gerador não desenhou — avisa em vez de gravar
        # um PNG transparente, que só se descobre no jogo, com o inimigo invisível
        if cortado is None or cortado.width < cw * 0.15 or cortado.height < ch * 0.15:
            vazias.append(nome)
            continue
        na_caixa(cortado, lado).save(os.path.join(SAIDA, f"{nome}.png"))
        print(f"  {nome}.png  ({cortado.width}x{cortado.height} → {lado}x{lado})")

    print(f"\n{len(NOMES) - len(vazias)}/{len(NOMES)} em {SAIDA}")
    if vazias:
        print("CÉLULAS VAZIAS (regerar a folha):", ", ".join(vazias))
    print("Agora é só apagar o `tint` de cada perfil em ENEMY_TYPES (Game.ts).")


if __name__ == "__main__":
    main()
