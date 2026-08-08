# COMO PEDIR ARTE PARA O MNEMONIC

Este arquivo existe pelo mesmo motivo que o `tools/distinguir.py escolher`
existe: a decisão que não fica escrita em lugar nenhum precisa ser tomada de
novo do zero na próxima folha. Aqui ficam os pedidos que já funcionaram, com
as regras que foram aprendidas errando.

O prompt vai em **inglês**. Não é preferência: os modelos de imagem obedecem
muito melhor ao vocabulário de estilo em inglês, e é o vocabulário de estilo
que mantém a arte nova parecida com a que já está no jogo.

---

## As regras que valem para TODA folha

Elas entram no fim de cada prompt, sem exceção. Cada uma custou uma folha
jogada fora.

**Fundo magenta puro `#FF00FF`.** Pedido justamente por não existir na paleta
do jogo: `tools/recortar.py` recorta por essa cor. Chapado — sem gradiente,
sem vinheta, sem textura, e **sem sombra projetada no fundo**. Sombra no fundo
vira uma mancha cinza colada na peça depois do recorte.

**Uma peça por célula, inteira dentro da célula, com margem larga.** A folha
do Egito voltou com as dezoito peças estourando a célula e o corte em
retângulo decepou todas — na carta isso aparece como símbolo cortado. Hoje
existe o modo `mancha`, que corta pela silhueta, mas margem continua sendo o
jeito de não precisar dele.

**Sem moldura, sem texto, sem número, sem legenda, sem marca d'água.** O
modelo adora escrever o nome do item embaixo dele.

**Escala igual entre as peças.** Duas peças não podem se distinguir por terem
sido desenhadas em tamanhos diferentes — o jogo as mostra todas no mesmo
quadrado.

**Estilo da casa** (copiar esta frase inteira):

> chunky mobile game icon art, thick uniform charcoal outline, flat cel
> shading with two or three tones per surface, light from the upper left,
> small crisp white specular highlights, saturated colors, clean readable
> silhouette, no gradients, no photorealism, no 3D render, no drop shadow

---

## 1 · Os quatro tipos de carta novos

Vão para `arte/ico/` como `prisma.png`, `amuleto.png`, `tempo.png`,
`maldicao.png`. Ao chegarem, acrescentar os quatro nomes ao vetor `PINTADOS`
em `js/ui/icones.js` — é isso que troca o SVG desenhado pela pintura.

O que cada uma precisa DIZER, e não só mostrar: o Prisma dobra o par
**seguinte** (então tem de haver luz atravessando e saindo do outro lado); o
Tempo **devolve** virada (por isso a areia sobe); a Maldição atrapalha
enquanto está na mesa (tem de dar vontade de tirar da mesa).

```
A 2x2 grid sheet of four fantasy card-game item icons on a flat pure magenta
#FF00FF background.

Top-left: a triangular glass prism, clear cyan-white crystal, catching a thin
white light beam on one face and casting a bright rainbow fan out of the other
side.
Top-right: a small ornate reliquary amulet — a gold locket with a deep violet
gemstone at its center and tiny engraved filigree, hanging from a short chain
loop.
Bottom-left: an hourglass in a brass frame with the sand flowing UPWARD, glowing
pale blue grains rising against gravity, a couple of grains escaping the top.
Bottom-right: a cursed sigil — a cracked obsidian coin-seal with a jagged violet
rune split down the middle, thin purple-black smoke leaking from the crack.

Each icon fully inside its own cell with a wide empty margin, nothing touching a
cell edge, all four at the same scale, centered.

Style: chunky mobile game icon art, thick uniform charcoal outline, flat cel
shading with two or three tones per surface, light from the upper left, small
crisp white specular highlights, saturated colors, clean readable silhouette,
no gradients, no photorealism, no 3D render, no drop shadow.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no texture, no shadow cast on the background. No frames, no borders,
no text, no numbers, no captions, no watermark.
```

Recortar:

```
python3 tools/recortar.py folhas/cartas-novas.png celula 2 2 arte/ico \
        prisma amuleto tempo maldicao
```

---

## 2 · As cinco folhas de glifos

Uma folha por família, **grade de 6 × 3 = 18**, para `arte/glifo/<familia>/`
como `00.png` … `17.png`. Ao chegarem, acrescentar o id da família ao
`FAMILIA_PINTADA` em `js/arte/glifos.js`.

**Uma família entra INTEIRA ou não entra.** Se metade fosse pintada e metade
desenhada, o jogador passaria a distinguir o par pelo estilo em vez de pelo
desenho, e a família deixaria de ser um conjunto.

**O critério de aceitação não é ser bonito, é os dezoito não se confundirem.**
Rodar `python3 tools/distinguir.py <familia>` antes de trocar o que está no
jogo: nenhum par abaixo de 26. A família Espaço voltou com dois sóis quase
iguais e por isso continua desenhada até hoje.

O glifo é lido a quarenta pixels sobre a cor da família. Por isso: **silhueta
antes de detalhe**, nada de traço fino, nada de textura interna.

### Animais — `arte/glifo/animais/`

```
A 6x3 grid sheet of 18 flat game symbols on a flat pure magenta #FF00FF
background.

Row 1, left to right: a cat head with two pointed ears; a rabbit head with two
long upright ears; a bear head with two small round ears; a fox head with a
sharp triangular muzzle; a bull head with wide curved horns; an owl face with
two big round eye discs.
Row 2, left to right: a coiled snake; a fish seen from the side; a turtle shell
with head and four feet; a frog seen from the front; a horse head in profile; a
howling wolf head.
Row 3, left to right: an elephant head with trunk and big ears; a monkey face; a
small bird in profile with a pointed beak; a butterfly with open wings; a
scorpion seen from above; a crab seen from above.

All 18 symbols drawn in the same style: solid warm ivory #F2E9CE fill, thick
charcoal #211C17 outline of uniform weight, one thin inner rim line in #e2843c,
completely flat — no shading, no gradient, no texture inside the shape. Bold
simplified silhouettes that stay readable at 40 pixels. No thin lines, no small
details, no interior hatching.

Each symbol fully inside its own cell with a wide empty margin, nothing touching
or crossing a cell edge, no symbol overlapping another, all at the same scale,
centered in its cell.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames, no borders, no grid
lines, no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/animais.png mancha 6 3 arte/glifo/animais
python3 tools/distinguir.py animais
```

### Piratas — `arte/glifo/piratas/`

```
A 6x3 grid sheet of 18 flat game symbols on a flat pure magenta #FF00FF
background.

Row 1, left to right: an anchor; a skull with two crossed bones below it; a
ship's steering wheel; a sailing ship hull with two triangular sails; a pennant
flag on a pole; an iron hook.
Row 2, left to right: a parrot in profile; a rolled treasure map; a compass
rose; a rum bottle; a closed treasure chest; two crossed cutlasses.
Row 3, left to right: an eye patch with its strap; a tricorn pirate hat; a gold
doubloon coin; a cannon on wheels; a coiled rope with a knot; a lighthouse
tower.

All 18 symbols drawn in the same style: solid warm ivory #F2E9CE fill, thick
charcoal #211C17 outline of uniform weight, one thin inner rim line in #2ec4c4,
completely flat — no shading, no gradient, no texture inside the shape. Bold
simplified silhouettes that stay readable at 40 pixels. No thin lines, no small
details, no interior hatching.

Each symbol fully inside its own cell with a wide empty margin, nothing touching
or crossing a cell edge, no symbol overlapping another, all at the same scale,
centered in its cell.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames, no borders, no grid
lines, no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/piratas.png mancha 6 3 arte/glifo/piratas
python3 tools/distinguir.py piratas
```

### Samurai — `arte/glifo/samurai/`

```
A 6x3 grid sheet of 18 flat game symbols on a flat pure magenta #FF00FF
background.

Row 1, left to right: a katana blade held diagonally; two crossed short swords;
an open folding fan; a kabuto helmet with a crescent crest; a torii gate; a
four-pointed shuriken.
Row 2, left to right: a five-petal family crest flower; a bow with a nocked
arrow; a hanging paper lantern; Mount Fuji with a flat snowy top; a koi fish; a
standing crane bird.
Row 3, left to right: a bamboo stalk with leaves; a taiko drum on a stand; an
oni demon mask; a temple bell; a braided shimenawa rope; an ink brush with a
drop of ink.

All 18 symbols drawn in the same style: solid warm ivory #F2E9CE fill, thick
charcoal #211C17 outline of uniform weight, one thin inner rim line in #ff8fb3,
completely flat — no shading, no gradient, no texture inside the shape. Bold
simplified silhouettes that stay readable at 40 pixels. No thin lines, no small
details, no interior hatching.

Each symbol fully inside its own cell with a wide empty margin, nothing touching
or crossing a cell edge, no symbol overlapping another, all at the same scale,
centered in its cell.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames, no borders, no grid
lines, no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/samurai.png mancha 6 3 arte/glifo/samurai
python3 tools/distinguir.py samurai
```

### Dinossauros — `arte/glifo/dinossauros/`

```
A 6x3 grid sheet of 18 flat game symbols on a flat pure magenta #FF00FF
background.

Row 1, left to right: a tyrannosaurus skull in profile; a stegosaurus with back
plates; a long-necked brachiosaurus; a triceratops head with three horns and a
frill; a three-toed footprint; a cracked egg.
Row 2, left to right: a rib cage with spine; a single curved claw; a single fang
tooth; a pterodactyl in flight; an ankylosaurus tail club; a raptor in profile.
Row 3, left to right: an amber drop with an insect inside; an erupting volcano;
a fern leaf; a falling meteor with a trail; a fossilized feather in stone; a
curved horn.

All 18 symbols drawn in the same style: solid warm ivory #F2E9CE fill, thick
charcoal #211C17 outline of uniform weight, one thin inner rim line in #35a86a,
completely flat — no shading, no gradient, no texture inside the shape. Bold
simplified silhouettes that stay readable at 40 pixels. No thin lines, no small
details, no interior hatching.

Each symbol fully inside its own cell with a wide empty margin, nothing touching
or crossing a cell edge, no symbol overlapping another, all at the same scale,
centered in its cell.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames, no borders, no grid
lines, no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/dinossauros.png mancha 6 3 arte/glifo/dinossauros
python3 tools/distinguir.py dinossauros
```

### Robôs — `arte/glifo/robos/`

```
A 6x3 grid sheet of 18 flat game symbols on a flat pure magenta #FF00FF
background.

Row 1, left to right: a square robot head with an antenna; a toothed gear; a
microchip with side legs; a two-finger mechanical claw; a single glowing lens
eye; a small full-body robot standing.
Row 2, left to right: a battery cell; a power plug; a satellite dish; a circuit
board trace pattern; a coiled spring; a wrench.
Row 3, left to right: a horseshoe magnet; a power button symbol inside a ring; a
quadcopter drone; a tank tread wheel; a hydraulic piston; a loudspeaker cone.

All 18 symbols drawn in the same style: solid warm ivory #F2E9CE fill, thick
charcoal #211C17 outline of uniform weight, one thin inner rim line in #b8d43a,
completely flat — no shading, no gradient, no texture inside the shape. Bold
simplified silhouettes that stay readable at 40 pixels. No thin lines, no small
details, no interior hatching.

Each symbol fully inside its own cell with a wide empty margin, nothing touching
or crossing a cell edge, no symbol overlapping another, all at the same scale,
centered in its cell.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames, no borders, no grid
lines, no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/robos.png mancha 6 3 arte/glifo/robos
python3 tools/distinguir.py robos
```

O modo `mancha` é o seguro para folha de glifo: a grade só agrupa, e cada peça
é cortada pela própria silhueta.

Se a folha voltar com mais de 18 desenhos aproveitáveis, não escolher a dedo:

```
python3 tools/distinguir.py escolher arte/glifo/animais
```

---

## 3 · Os cinco brasões de família

Vão para `arte/fam/`. Enquanto não chegarem, o jogo monta um escudo desenhado
com a gramática da própria família (`js/ui/icones.js`, `brasao`), então isto
é melhoria e não emergência.

O brasão não é o símbolo de uma carta — é o quadro em volta que separa "a
família" de "uma carta da família".

```
A 3x2 grid sheet of five fantasy game faction emblems on a flat pure magenta
#FF00FF background, plus one empty cell.

1. Animals: a heater shield in warm orange #e2843c with a carved animal head
   with pointed ears in the center, worn leather-and-bronze edge.
2. Pirates: a round teal #2ec4c4 medallion shaped like a ship's wheel, with an
   anchor embossed in the middle, wet weathered metal.
3. Samurai: a lacquered rose-pink #ff8fb3 shield with a five-petal crest and a
   thin gold rim, smooth polished lacquer.
4. Dinosaurs: a deep green #35a86a stone shield with a fossil skull relief and
   three chipped claw gouges across it.
5. Robots: a lime #b8d43a metal plate emblem shaped like a gear, with a
   microchip square riveted at the center, brushed steel bolts at the corners.

Each emblem fully inside its own cell with a wide empty margin, all five at the
same scale, centered, seen straight on from the front.

Style: chunky mobile game icon art, thick uniform charcoal outline, flat cel
shading with two or three tones per surface, light from the upper left, small
crisp white specular highlights, saturated colors, clean readable silhouette,
no gradients, no photorealism, no 3D render, no drop shadow.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames, no borders, no text, no
numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/brasoes.png celula 3 2 arte/fam \
        animais piratas samurai dinossauros robos -
```

---

## 4 · As medalhas

Quatro aros, e não vinte e sete medalhas: o desenho da conquista conta O QUE
foi feito e o aro conta O QUANTO custou, e são perguntas diferentes. O miolo
usa o ícone de TRAÇO (`ICO_TRACO`) e não o pintado — a arte pintada de várias
delas veio com placa própria, e quadrado dentro de círculo lê mal; traço
dentro de aro de metal lê como gravado.

```
A 2x2 grid sheet of four empty award medal frames on a flat pure magenta
#FF00FF background.

Top-left: bronze medal frame, dark warm copper #c98a4b, a simple round rim with
a laurel notch at the bottom, hollow center.
Top-right: silver medal frame, cool pale steel #c3ccdd, round rim with two small
side wings, hollow center.
Bottom-left: gold medal frame, rich gold #ffc23c, round rim with a small crown
at the top and a laurel wreath at the bottom, hollow center.
Bottom-right: legendary medal frame, violet #b478ff enamel and dark silver, a
star-shaped rim with eight points and a small gem at the top, hollow center.

The center of every frame is completely empty and transparent-looking (pure
magenta showing through), because another icon will be placed inside it. The
opening is a wide circle in all four.

Each frame fully inside its own cell with a wide empty margin, all four at the
same scale, centered, seen straight on from the front.

Style: chunky mobile game icon art, thick uniform charcoal outline, flat cel
shading with two or three tones per surface, light from the upper left, small
crisp white specular highlights, no gradients, no photorealism, no 3D render,
no drop shadow.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no shadow cast on the background. No frames around the sheet, no
borders, no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/medalhas.png magenta 2 2 arte/medalha \
        bronze prata ouro lenda
```

---

## O que já chegou

Cartas novas ✓ · Animais ✓ · Piratas ✓ · Samurai ✓ · Dinossauros ✓ · Robôs ✓
· Brasões ✓ · Medalhas ✓. Espaço continua desenhada de propósito: a folha dela
voltou com dois sóis quase iguais.

Relíquias ✓ — as 75 estão pintadas. O emblema montado continua no código
como rede para relíquia que nasça sem arte, e hoje não sobra nenhuma.

Medido: par mais próximo 25,3 (Chave Mestra × Fio de Prata — duas peças de
metal claro e fino), mediana 53,4. As vinte e uma do primeiro lote têm 41,7
no pior par, então esse é o único aperto do conjunto; numa relíquia isso pesa
menos que numa carta, porque a ficha traz o nome ao lado do desenho.

## 5 · As 54 relíquias sem pintura

Vinte e uma têm arte; as outras cinquenta e quatro usam um emblema montado
(moldura vazada mais marca). É por isso que a parede de relíquias tem duas
caras — e o emblema é o teto do que um sistema de dois eixos alcança num
quadrado de 24 pixels. **Este é o pedido que acaba com a diferença.**

São TRÊS FOLHAS de 6 × 3 = 18, na mesma pasta das outras (`arte/rel/`), e o
nome de cada arquivo está na linha de recorte. Elas usam o mesmo estilo das
vinte e uma que já estão no jogo: objeto isolado, contorno carvão grosso,
sombreado chapado em dois ou três tons, luz de cima e à esquerda.

### 5a · As dezoito comuns → `arte/rel/`

```
A 6x3 grid sheet of 18 fantasy game item icons on a flat pure magenta #FF00FF
background.

Row 1, left to right: a brass spyglass; a leather bookmark ribbon with a tassel;
a magnifying glass with a cracked lens; a small clay piggy bank with a coin
slot; an hourglass with a wooden frame; a whetstone with a worn groove.
Row 2, left to right: a coiled climbing rope with a steel hook; a round leather
shield with iron studs; a dried four-leaf clover pressed flat; a coin purse with
a hole and one coin falling out; a round blue glass lens; a golden gauntlet.
Row 3, left to right: a short candle stub with a long wick; a needle with a
thread stitching two pieces of cloth; a bone comb; a rolled old map with a torn
corner; a plain iron ring; a chipped ceramic mug.

Each icon fully inside its own cell with a wide empty margin, nothing touching a
cell edge, all at the same scale, centered.

Style: chunky mobile game icon art, thick uniform charcoal outline, flat cel
shading with two or three tones per surface, light from the upper left, small
crisp white specular highlights, saturated colors, clean readable silhouette,
no gradients, no photorealism, no 3D render, no drop shadow.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no texture, no shadow cast on the background. No frames, no borders,
no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/rel-comuns.png magenta 6 3 arte/rel \
  luneta marcador lupa_rachada cofrinho relogio_areia pedra_afiada \
  corda escudo_couro trevo bolsa_furada lente_azul luva_ouro \
  vela linha pente mapa_velho anel_ferro caneca
```

### 5b · As primeiras dezoito raras → `arte/rel/`

```
A 6x3 grid sheet of 18 fantasy game item icons on a flat pure magenta #FF00FF
background.

Row 1, left to right: a pair of reading glasses; a thin silver thread wound in a
figure eight; a war drum with two crossed sticks; a crooked balance scale tipping
to one side; a dagger with two mirrored blades; an ornate master key with a
crown-shaped bow.
Row 2, left to right: a still pool of water in a stone basin, mirror-flat; a
brass ashtray with a curl of smoke; a compass needle floating free, no housing;
a book of grey ash pages; a crown woven from black thorns; a woven market basket
with a cloth over it.
Row 3, left to right: a pane of smoked dark glass in a frame; a worn carved rune
stone; a green circuit board; a blue-and-gold scarab beetle; a jagged meteorite
shard glowing at the crack; a copper alembic still with a curled spout.

Each icon fully inside its own cell with a wide empty margin, nothing touching a
cell edge, all at the same scale, centered.

Style: chunky mobile game icon art, thick uniform charcoal outline, flat cel
shading with two or three tones per surface, light from the upper left, small
crisp white specular highlights, saturated colors, clean readable silhouette,
no gradients, no photorealism, no 3D render, no drop shadow.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no texture, no shadow cast on the background. No frames, no borders,
no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/rel-raras1.png magenta 6 3 arte/rel \
  oculos_leitura fio_prata tambor balanca faca_dupla chave_mestra \
  espelho_agua cinzeiro agulha livro_cinzas coroa_espinhos sacola \
  vidro_fume runa_gasta placa_circuito escaravelho meteorito alambique
```

### 5c · O resto das raras e as dez lendárias → `arte/rel/`

```
A 6x3 grid sheet of 18 fantasy game item icons on a flat pure magenta #FF00FF
background.

Row 1, left to right: an ivory chess pawn; a red dragon scale; a broken lyre with
two snapped strings; a fishing net with a float; a raw uncut crystal cluster; an
iron horseshoe.
Row 2, left to right: a hidden pocket sewn inside a coat flap; a silk blindfold
tied in a bow; a stopwatch with the hands frozen; a floating library of stacked
books with pages turning; a heart carved from grey stone; a brass kaleidoscope.
Row 3, left to right: a glass lens showing a tiny world inside; a gold coin with
a face on both sides; a silver bell with no clapper; a black hourglass with dark
sand; a heavy grimoire clasped shut; a glowing red philosopher's stone.

Each icon fully inside its own cell with a wide empty margin, nothing touching a
cell edge, all at the same scale, centered.

Style: chunky mobile game icon art, thick uniform charcoal outline, flat cel
shading with two or three tones per surface, light from the upper left, small
crisp white specular highlights, saturated colors, clean readable silhouette,
no gradients, no photorealism, no 3D render, no drop shadow.

Flat pure magenta #FF00FF background, absolutely uniform, no gradient, no
vignette, no texture, no shadow cast on the background. No frames, no borders,
no text, no numbers, no captions, no watermark.
```

```
python3 tools/recortar.py folhas/rel-raras2.png magenta 6 3 arte/rel \
  peao escama lira rede cristal_bruto ferradura \
  bolso_secreto venda cronometro biblioteca_perdida coracao \
  caleidoscopio lente_do_mundo moeda_de_ouro sino_mudo ampulheta_negra \
  grimorio pedra_filosofal
```

Depois de recortar, os nomes entram no vetor de `ICO_RELIQUIA` em
`js/ui/icones.js` — é o que faz a pintura entrar por cima do emblema. O teste
`node test/regras.mjs` confere que nenhuma relíquia usa a marca de outra, e
`node test/glifos.mjs` para de medir emblema para as que ganharem arte.

---

## Quando a arte chega

1. `python3 tools/recortar.py …` (acima, por lote)
2. `python3 tools/distinguir.py <familia>` — obrigatório para folha de glifo;
   nenhum par abaixo de 26, nenhuma peça cortada ou torta
3. registrar: `PINTADOS` em `js/ui/icones.js` para ícone de carta,
   `FAMILIA_PINTADA` em `js/arte/glifos.js` para família
4. `python3 -m http.server 8123` e abrir `tools/vitrine-glifos.html` — a peça
   se julga no tamanho em que ela é lida, sobre a cor da família, ao lado das
   dezessete parecidas. Em folha de contato tudo parece nítido.
5. `node test/regras.mjs` — ele confere que toda arte apontada existe no disco
   e que família pintada entrou inteira
