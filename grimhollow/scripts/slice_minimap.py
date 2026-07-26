#!/usr/bin/env python3
"""Fatia a folha 4x4 de ícones do minimapa: recorta o rótulo de texto, remove o
fundo xadrez (flood-fill a partir das bordas) e centraliza cada ícone num quadro
256x256 transparente. SEM o texto embaixo — só o ícone."""
from PIL import Image
from collections import deque
import os

SRC = "/root/.claude/uploads/85135ce9-0400-5549-a42b-324f4764da02/ebfe2c4b-87230.png"
OUT = "src/assets/ui/minimap"
CELL = 256
MARGIN = 9          # corta a linha preta da grade nas bordas da célula
os.makedirs(OUT, exist_ok=True)

# (linha, coluna) -> nome do arquivo de saída
LAYOUT = [
    [("chest", "CHEST"), ("smith", "ANVIL"), ("alchemist", "FLASKS"), ("store", "POUCH")],
    [("tavern", "BEER"), ("home", "COTTAGE"), ("well", "WELL"), ("forest", "PINES")],
    [("npc", "VILLAGER"), ("entrance", "ARCHWAY"), ("exit", "DOOR"), ("gate", "PORTCULLIS")],
    [("portal", "PORTAL"), ("stair", "STAIRS"), ("statue", "STATUE"), ("sign", "SIGN")],
]

sheet = Image.open(SRC).convert("RGB")
spx = sheet.load()

def is_bg(p):
    r, g, b = p
    return min(p) > 188 and (max(p) - min(p)) < 32   # xadrez claro (cinza/branco)

def is_gridblack(p):
    return max(p) < 42

def find_label_cut(cellpx):
    """acha o topo da faixa do rótulo: 1ª janela de ~12 linhas quase-vazias
    depois de y=165 (o vão entre o ícone e o texto)."""
    ink = []
    for y in range(CELL):
        c = 0
        for x in range(MARGIN, CELL - MARGIN):
            p = cellpx[x, y]
            if not is_bg(p) and not is_gridblack(p):
                c += 1
        ink.append(c)
    for y in range(165, CELL - 12):
        if all(ink[y + k] < 4 for k in range(12)):
            return y
    return 214  # fallback

def slice_cell(cr, cc):
    # extrai a célula como imagem RGBA própria
    cell = Image.new("RGB", (CELL, CELL))
    cell.paste(sheet.crop((cc * CELL, cr * CELL, cc * CELL + CELL, cr * CELL + CELL)), (0, 0))
    cpx = cell.load()
    cut = find_label_cut(cpx)
    img = cell.convert("RGBA")
    px = img.load()
    W = H = CELL
    # 1) zera (transparente) a faixa do rótulo e as bordas da grade
    for y in range(H):
        for x in range(W):
            if y >= cut or x < MARGIN or x >= W - MARGIN or y < MARGIN:
                px[x, y] = (0, 0, 0, 0)
    # 2) flood-fill do fundo xadrez a partir das bordas -> transparente
    seen = [[False] * W for _ in range(H)]
    dq = deque()
    for x in range(W):
        for y in (MARGIN, cut - 1):
            if 0 <= y < H:
                dq.append((x, y))
    for y in range(H):
        for x in (MARGIN, W - MARGIN - 1):
            dq.append((x, y))
    while dq:
        x, y = dq.popleft()
        if x < 0 or y < 0 or x >= W or y >= H or seen[y][x]:
            continue
        seen[y][x] = True
        p = px[x, y]
        if p[3] == 0 or is_bg(p[:3]) or is_gridblack(p[:3]):
            px[x, y] = (0, 0, 0, 0)
            dq.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    # 3) suaviza a franja: pixels de borda muito claros viram semitransparentes
    for y in range(1, H - 1):
        for x in range(1, W - 1):
            p = px[x, y]
            if p[3] == 0:
                continue
            if is_bg(p[:3]):
                # pixel claro ainda opaco encostado no transparente -> alpha parcial
                if any(px[x + dx, y + dy][3] == 0 for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                    px[x, y] = (p[0], p[1], p[2], 90)
    # 4) recorta a bounding box do conteúdo e centraliza em 256x256
    bbox = img.getbbox()
    if bbox:
        icon = img.crop(bbox)
        # escala p/ caber em ~224px mantendo proporção
        maxside = 224
        w, h = icon.size
        s = min(maxside / w, maxside / h, 1.0)
        if s < 1.0:
            icon = icon.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS)
        out = Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
        ox = (CELL - icon.size[0]) // 2
        oy = (CELL - icon.size[1]) // 2
        out.paste(icon, (ox, oy), icon)
    else:
        out = img
    return out

for cr in range(4):
    for cc in range(4):
        name, _label = LAYOUT[cr][cc]
        out = slice_cell(cr, cc)
        path = os.path.join(OUT, f"mm_{name}.png")
        out.save(path)
        print("ok", path, out.size)

# sanctuary reaproveita a escadaria (subir a escadaria = mesma arte)
Image.open(os.path.join(OUT, "mm_stair.png")).save(os.path.join(OUT, "mm_sanctuary.png"))
print("ok mm_sanctuary.png (= escadaria)")
