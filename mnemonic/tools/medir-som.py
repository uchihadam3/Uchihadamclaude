#!/usr/bin/env python3
"""════════════════════════════════════════════════════════════════════════
   MEDIR A TRILHA — "tem reverb demais" vira número.

   O ouvido acerta o diagnóstico e erra o tamanho: "parece uma sala gigante"
   pode ser rabo longo demais, pode ser molhado demais, pode ser o eco. São
   três consertos diferentes, e mexer no errado piora. Aqui saem os três
   separados, do MESMO arquivo que se ouve.

   O QUE CADA NÚMERO DIZ
   ---------------------
   pico / RMS      alto o bastante para o celular na rua, sem ceifar.

   RABO (s)        quanto tempo o som leva para cair 60 dB depois da última
                   nota agendada. É o tamanho da sala. Sala de estar fica
                   perto de 0,4 s; igreja passa de 2 s. Um jogo quer o
                   primeiro.

   VALE (dB)       a distância entre os trechos cheios e os buracos entre as
                   notas, medida em janelas de 30 ms. É ISTO que o ouvido
                   chama de "gostoso" ou de "sopa": num arranjo seco a
                   percussão abre buracos e a música respira; afogada em
                   reverb a curva fica reta e tudo vira uma nuvem só. Abaixo
                   de uns 9 dB já soa lavado.

   CEIFA (%)       amostras coladas no teto. Qualquer coisa acima de 0 é
                   distorção que ninguém pediu.

       python3 tools/medir-som.py /tmp/trilha/*.wav
       python3 tools/medir-som.py /tmp/trilha/mundo0.wav --musica-ate 20
   ═══════════════════════════════════════════════════════════════════════"""
import sys, wave, math
import numpy as np


def ler(caminho):
    with wave.open(caminho, 'rb') as w:
        n, canais, largura, taxa = (w.getnframes(), w.getnchannels(),
                                    w.getsampwidth(), w.getframerate())
        cru = w.readframes(n)
    if largura != 2:
        raise SystemExit(f'{caminho}: só sei ler 16 bits')
    x = np.frombuffer(cru, dtype='<i2').astype(np.float32) / 32768.0
    if canais > 1:
        x = x.reshape(-1, canais).mean(axis=1)
    return x, taxa


def db(v):
    return -120.0 if v <= 1e-6 else 20.0 * math.log10(v)


def envelope(x, taxa, janela_ms=30):
    """RMS em janelas curtas — é a curva que o ouvido segue."""
    j = max(1, int(taxa * janela_ms / 1000))
    sobra = len(x) % j
    if sobra:
        x = x[:-sobra]
    q = x.reshape(-1, j)
    return np.sqrt((q * q).mean(axis=1)), j / taxa


def rabo(x, taxa, corte_s):
    """Quanto tempo o som leva para cair 60 dB DEPOIS da última nota.

    Medir o rabo dentro da música não dá: a nota seguinte tapa o decaimento.
    Por isso a gravação tem de ser mais longa do que o trecho agendado — o
    que sobra no fim é reverb puro, e é ele que se cronometra."""
    i = int(corte_s * taxa)
    if i >= len(x):
        return None, 'sem trecho mudo no fim (use --musica-ate menor que a gravação)'
    cauda = x[i:]
    env, dt = envelope(cauda, taxa, 20)
    if not len(env) or env[0] <= 1e-6:
        return 0.0, 'o rabo já nasce mudo'
    pico = env[:max(1, int(0.05 / dt))].max()
    alvo = pico / 1000.0                       # −60 dB
    abaixo = np.where(env < alvo)[0]
    if not len(abaixo):
        return len(cauda) / taxa, 'ainda soando no fim do arquivo'
    return abaixo[0] * dt, None


def medir(caminho, musica_ate=None):
    x, taxa = ler(caminho)
    dur = len(x) / taxa
    pico = float(np.abs(x).max())
    rms = float(np.sqrt((x * x).mean()))
    ceifa = float((np.abs(x) > 0.995).mean() * 100)

    env, _ = envelope(x, taxa, 30)
    vivo = env[env > env.max() * 0.02]         # fora o silêncio das pontas
    if len(vivo) > 20:
        cheio, buraco = np.percentile(vivo, 90), np.percentile(vivo, 10)
        vale = db(cheio) - db(buraco)
    else:
        vale = 0.0

    linha = (f'{caminho.split("/")[-1]:<14} {dur:5.1f}s  '
             f'pico {pico:5.3f} ({db(pico):6.1f} dB)  '
             f'RMS {db(rms):6.1f} dB  '
             f'vale {vale:5.1f} dB  ceifa {ceifa:5.2f}%')
    if musica_ate is not None:
        t, aviso = rabo(x, taxa, musica_ate)
        linha += f'  rabo {"—" if t is None else f"{t:4.2f}s"}'
        if aviso:
            linha += f'  ({aviso})'
    print(linha)
    return dict(pico=pico, rms=rms, vale=vale, ceifa=ceifa)


if __name__ == '__main__':
    args = [a for a in sys.argv[1:]]
    ate = None
    if '--musica-ate' in args:
        i = args.index('--musica-ate')
        ate = float(args[i + 1])
        del args[i:i + 2]
    if not args:
        raise SystemExit(__doc__)
    print()
    for a in args:
        medir(a, ate)
    print()
