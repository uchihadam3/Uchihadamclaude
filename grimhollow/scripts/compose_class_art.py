"""Monta o retrato da tela de criação a partir do MESMO recorte usado no jogo.

Personagem recortado + fundo da árvore de habilidades da classe = o herói que
você escolhe na criação é literalmente o mesmo que os amigos veem na praça.
Enquadramento em plano 3/4 (cabeça até ~a coxa), como a arte anterior.
"""
import sys
from PIL import Image, ImageEnhance, ImageFilter

W, H = 896, 1200      # tamanho dos retratos de classe
CORTE = 0.74          # quanto do corpo entra (1 = corpo todo, 0.74 ≈ até a coxa)

def compor(avatar, fundo, dst):
    fig = Image.open(avatar).convert("RGBA")
    fig = fig.crop(fig.getchannel("A").getbbox())          # só o personagem
    fig = fig.crop((0, 0, fig.width, int(fig.height * CORTE)))  # plano 3/4

    bg = Image.open(fundo).convert("RGB")
    # escala o fundo p/ COBRIR o quadro e recorta o centro
    e = max(W / bg.width, H / bg.height)
    bg = bg.resize((int(bg.width * e) + 1, int(bg.height * e) + 1), Image.LANCZOS)
    bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 2,
                  (bg.width - W) // 2 + W, (bg.height - H) // 2 + H))
    # escurece e desfoca de leve → o personagem salta à frente
    bg = ImageEnhance.Brightness(bg).enhance(0.72).filter(ImageFilter.GaussianBlur(1.6))

    # personagem grande, com uma folga acima da cabeça
    esc = min((W * 0.86) / fig.width, (H * 0.94) / fig.height)
    fig = fig.resize((int(fig.width * esc), int(fig.height * esc)), Image.LANCZOS)
    x = (W - fig.width) // 2
    y = int(H * 0.055)
    out = bg.convert("RGBA")
    # sombra de contato atrás do personagem, p/ ele não parecer colado
    sombra = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sombra.paste(Image.new("RGBA", fig.size, (0, 0, 0, 120)), (x, y + 8), fig)
    out = Image.alpha_composite(out, sombra.filter(ImageFilter.GaussianBlur(14)))
    out.paste(fig, (x, y), fig)
    out.convert("RGB").save(dst)
    print(f"  {dst.split('/')[-1]} pronto")

if __name__ == "__main__":
    compor(sys.argv[1], sys.argv[2], sys.argv[3])
