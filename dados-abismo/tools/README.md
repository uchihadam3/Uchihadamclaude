# tools/fatiar.py

Recorta a folha de sprites que veio do gerador de imagem (fundo magenta).

Não assume grade: acha cada criatura por componente conectado, junta os
detalhes soltos (fumaça, ondas de som) no dono, ordena em leitura
(linha por linha, esquerda→direita) e grava um PNG com fundo transparente.

    # conferir o que ele achou, sem gravar
    python3 tools/fatiar.py folha_comuns.png arte/inimigos --ver

    # gravar, nomeando na ordem de leitura
    python3 tools/fatiar.py folha_comuns.png arte/inimigos \
      osso_solto cranio_rolante vela_fatua escriba_giz \
      mao_sem_dono coro_mudo ossada_curvada lasca_femur

    python3 tools/fatiar.py folha_chefes.png arte/inimigos \
      sacristao guardiao carrilhao coveiro ossario

`js/sprites.js` usa `arte/inimigos/<id>.png` quando o id está na lista ARTE,
e cai no desenho procedural em canvas para o resto.
