# Prompt — os 4 heróis jogáveis

Uma imagem só, com os 4 personagens. Cole no ChatGPT / gerador de imagem e me
mande o resultado que eu recorto e ponho no jogo.

O que importa tecnicamente (o recortador `tools/fatiar.py` acha cada
personagem por componente conectado): **fundo magenta puro `#FF00FF`**, os
quatro **bem separados**, sem se tocar e sem sombra no chão ligando um ao
outro.

---

## PROMPT (copiar tudo abaixo)

Uma folha de sprites de personagens para um jogo de RPG roguelike sombrio,
com estética de gravura antiga e paleta restrita.

FUNDO: magenta puro absoluto (#FF00FF), totalmente chapado, sem gradiente,
sem textura, sem sombra projetada no chão. Cada personagem completamente
isolado, com uma larga faixa de magenta entre eles — eles NÃO podem se tocar,
encostar ou compartilhar sombra.

COMPOSIÇÃO: os 4 personagens em uma única fileira horizontal, de corpo
inteiro, vistos de frente, em pose parada e imponente, todos com a mesma
altura aproximada e o mesmo nível de detalhe.

ESTILO: ilustração pintada à mão, contornos escuros marcados, luz dura vinda
de cima, sombras profundas. Aparência de carta de baralho antiga, sombria e
solene. Sem texto, sem números, sem moldura, sem interface, sem assinatura.
Paleta reduzida: osso, carvão, pedra fria, mais uma única cor de destaque por
personagem, indicada abaixo.

OS 4 PERSONAGENS, da esquerda para a direita:

1. O CARRASCO — destaque VERMELHO-SANGUE (#c0392b).
   Um carrasco enorme e pesado, ombros largos, avental de couro grosso e
   manchado, capuz de algoz cobrindo o rosto inteiro sem deixar ver os olhos.
   Segura um machado de duas mãos apoiado no chão. Correntes e ganchos de
   açougue pendurados no cinto. Braços grossos e queimados. Postura de quem
   quebra a porta em vez de procurar a chave.

2. A LÂMINA-SOMBRA — destaque ROXO-PROFUNDO (#6c3fa0).
   Figura magra e alta, encapuzada, quase se desfazendo em fumaça roxa da
   cintura para baixo. Rosto na sombra do capuz, só um brilho pálido onde
   estariam os olhos. Dezenas de adagas finas presas em faixas cruzadas no
   peito e nos braços. Frascos de veneno no cinto. As mãos são longas demais.
   Postura de quem já está atrás de você.

3. O ARCANISTA FRATURADO — destaque AZUL-FRIO (#2f7ec4).
   Um mago cujo próprio corpo está rachado como porcelana, com luz azul
   vazando pelas fissuras do rosto, do peito e das mãos. Manto pesado e
   esfarrapado. Ao redor dele flutuam fragmentos geométricos de vidro e
   pedra, parados no ar como se o tempo tivesse parado. Um dos braços está
   parcialmente desintegrado em cacos suspensos. Olhar vazio e paciente.

4. A ORÁCULA DO FIO — destaque DOURADO-VELHO (#b08a2e).
   Uma mulher de vestes longas e bordadas, com os olhos vendados por uma
   faixa de tecido dourado. Entre os dedos das duas mãos correm fios de luz
   dourada muito finos, esticados, como um jogo de cama-de-gato. Mais fios
   saem dela e sobem para fora do quadro. Postura ereta e serena, de quem já
   sabe o resultado. Um pequeno pêndulo pendurado no cinto.

Sem fundo de cenário. Apenas os 4 personagens sobre o magenta chapado.

---

## Depois que você me mandar a imagem

Eu rodo:

    python3 tools/fatiar.py folha_herois.png arte/herois/ carrasco lamina arcanista oracula

e ligo cada um na sua classe.
