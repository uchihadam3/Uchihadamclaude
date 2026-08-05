import re, io, sys
src = io.open('src/game/interiors.ts', encoding='utf-8').read()
bloco = src[src.index('const SALAS'):src.index('// Sala ATIVA')]
salas = {}
for m in re.finditer(r'(\w+):\s*\[\s*((?:\s*"[^"]*",)+)\s*\],', bloco):
    salas[m.group(1)] = re.findall(r'"([^"]*)"', m.group(2))
EXTRA = {'armory': [(1, 2)]}   # a escada da Armaria bloqueia a célula
ruim = 0
for nome, m in salas.items():
    W, H = len(m[0]), len(m)
    larg_ok = all(len(l) == W for l in m)
    bloq = set(EXTRA.get(nome, []))
    walk = lambda c, r: (0 <= c < W and 0 <= r < H and m[r][c] in '.PX' and (c, r) not in bloq)
    livres = [(c, r) for r in range(H) for c in range(W) if walk(c, r)]
    p = [(c, r) for r in range(H) for c in range(W) if m[r][c] == 'P'][0]
    vis, fila = {p}, [p]
    while fila:
        c, r = fila.pop()
        for dc, dr in ((0,-1),(1,0),(0,1),(-1,0)):
            n = (c+dc, r+dr)
            if n not in vis and walk(*n): vis.add(n); fila.append(n)
    ilhados = [x for x in livres if x not in vis]
    n_pos = [(c, r) for r in range(H) for c in range(W) if m[r][c] == 'N']
    x_pos = [(c, r) for r in range(H) for c in range(W) if m[r][c] == 'X']
    # o atendente tem de ser ALCANÇÁVEL de frente (a célula abaixo dele)
    npc_ok = bool(n_pos) and (n_pos[0][0], n_pos[0][1]+1) in vis
    saida_ok = bool(x_pos) and x_pos[0] in vis
    erros = []
    if not larg_ok: erros.append('linhas de larguras diferentes')
    if ilhados: erros.append(f'chão ilhado: {ilhados}')
    if not npc_ok: erros.append('não dá p/ chegar de frente ao atendente')
    if not saida_ok: erros.append('saída inalcançável')
    ruim += bool(erros)
    print(f"{nome:10s} {W}x{H} livres={len(livres):3d}  " + ('OK' if not erros else ' | '.join(erros)))
sys.exit(1 if ruim else 0)
