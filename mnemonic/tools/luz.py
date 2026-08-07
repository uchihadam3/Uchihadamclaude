#!/usr/bin/env python3
"""
LUZ — mede o quanto cada placa pintada é clara, e grava a medida.

Texto claro sobre placa clara some. Isso já aconteceu duas vezes neste jogo, e
das duas o erro tinha a mesma forma: alguém (eu) OLHOU a arte e escreveu numa
lista quais placas eram claras. Olhar não serve — a placa ouro e a placa roxa
parecem as duas "coloridas", e uma tem 186 de luminância e a outra 141.

Aqui a resposta é medida no miolo do PNG, que é justamente a parte que o
`border-image ... fill` estica atrás do texto. O resultado vai para um arquivo
que o teste lê: a lista do código passa a ser uma afirmação conferível, e não
uma lembrança.

    python3 tools/luz.py            # regrava arte/ui/placas.json
"""
import json, pathlib
import numpy as np
from PIL import Image

# limiar: acima disto, texto branco não tem contraste suficiente (< 3:1)
CLARA = 105.0

def luminancia(caminho):
    im = Image.open(caminho).convert('RGB')
    a = np.array(im, float)
    h, w = a.shape[:2]
    # só o miolo: as bordas do 9-slice não ficam atrás do texto
    m = a[h//3:2*h//3, w//3:2*w//3]
    return float(0.2126*m[...,0].mean() + 0.7152*m[...,1].mean() + 0.0722*m[...,2].mean())

if __name__ == '__main__':
    ui = pathlib.Path('arte/ui')
    fora = {}
    for f in sorted(ui.glob('*.png')):
        L = luminancia(f)
        fora[f.name] = { 'luz': round(L, 1), 'clara': L > CLARA }
        print(f'  {f.name:24s} {L:6.1f}  {"CLARA — texto escuro" if L > CLARA else "escura — texto claro"}')
    fora['_limiar'] = CLARA
    (ui / 'placas.json').write_text(json.dumps(fora, indent=2, ensure_ascii=False) + '\n')
    print('gravado em', ui / 'placas.json')
