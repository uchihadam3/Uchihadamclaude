// 50 eventos com escolhas, risco e recompensa.
// DSL de efeitos executada pelo Run manager (RA.game.Run.applyEventFx):
//  gold(n) healAll(n) healPct(p) dmgAll(n) dmgOne(n) maxHp(n) relic(rarity?) relicId(id)
//  loseRelic sellRelic face(cat?) crack repair curseNext blessNext fight(tier,bonus?)
//  restoreHero mod(id) secretMap unlock(id) fateChoiceNext nothing
//  ch(p, ok[], bad[])  -> chance p de ok, senão bad
// Condições de escolha: cond:{gold:n | relic:true | cracked:true | dead:true}
(function () {
  function fx(k, o) { return Object.assign({ k: k }, o || {}); }
  var gold = function (n) { return fx('gold', { n: n }); };
  var healAll = function (n) { return fx('healAll', { n: n }); };
  var healPct = function (p) { return fx('healPct', { p: p }); };
  var dmgAll = function (n) { return fx('dmgAll', { n: n }); };
  var dmgOne = function (n) { return fx('dmgOne', { n: n }); };
  var maxHp = function (n, all) { return fx('maxHp', { n: n, all: !!all }); };
  var relic = function (r) { return fx('relic', r ? { rarity: r } : null); };
  var relicId = function (id) { return fx('relicId', { id: id }); };
  var face = function (c) { return fx('face', c ? { cat: c } : null); };
  var crack = function () { return fx('crack'); };
  var repair = function () { return fx('repair'); };
  var curseNext = function () { return fx('curseNext'); };
  var blessNext = function () { return fx('blessNext'); };
  var fight = function (tier, bonus) { return fx('fight', { tier: tier || 'common', bonus: !!bonus }); };
  var mod = function (id) { return fx('mod', { id: id }); };
  var ch = function (p, ok, bad) { return fx('ch', { p: p, ok: ok, bad: bad }); };
  var nothing = function () { return fx('nothing'); };

  // E(id, {pt,en}, {pt,en} texto, choices[])
  function E(id, name, text, choices) {
    return { id: id, name: name, text: text, choices: choices };
  }
  function C(label, fxs, result, cond) {
    var c = { label: label, fx: fxs, result: result };
    if (cond) c.cond = cond;
    return c;
  }

  RA.data.Events = [
    E('fonteRachada', { pt: 'Fonte Rachada', en: 'Cracked Fountain' },
      { pt: 'Uma fonte antiga goteja água prateada por uma rachadura. O cheiro é doce demais.', en: 'An ancient fountain drips silver water through a crack. It smells too sweet.' }, [
        C({ pt: 'Beber a água', en: 'Drink the water' }, [ch(0.6, [healAll(4)], [curseNext(), healAll(2)])], { pt: '60%: cura 4 em todos. 40%: cura 2, mas maldição na próxima luta.', en: '60%: heal 4 all. 40%: heal 2 but curse next fight.' }),
        C({ pt: 'Encher um frasco', en: 'Bottle some' }, [mod('frascoFonte')], { pt: 'Cura 3 em um herói, uma vez, quando quiser.', en: 'Heal 3 on one hero, once, anytime.' }),
        C({ pt: 'Seguir em frente', en: 'Walk away' }, [nothing()], { pt: 'Nada acontece.', en: 'Nothing happens.' })
      ]),
    E('mercadorCego', { pt: 'Mercador Cego', en: 'Blind Merchant' },
      { pt: 'Um velho de olhos cobertos vende sacos fechados. "Confie nas mãos, não nos olhos."', en: 'An old man with covered eyes sells sealed bags. "Trust the hands, not the eyes."' }, [
        C({ pt: 'Comprar saco (25 ouro)', en: 'Buy a bag (25 gold)' }, [gold(-25), ch(0.5, [relic()], [face()])], { pt: 'Relíquia ou Face Rúnica aleatória.', en: 'Random relic or rune face.' }, { gold: 25 }),
        C({ pt: 'Comprar saco caro (50 ouro)', en: 'Buy pricey bag (50 gold)' }, [gold(-50), ch(0.7, [relic('rara')], [relic()])], { pt: 'Boa chance de relíquia rara.', en: 'Good chance of a rare relic.' }, { gold: 50 }),
        C({ pt: 'Roubar um saco', en: 'Steal a bag' }, [ch(0.4, [relic()], [fight('elite')])], { pt: '40%: relíquia grátis. 60%: os guardas dele atacam!', en: '40%: free relic. 60%: his guards attack!' })
      ]),
    E('tumbaAntiga', { pt: 'Tumba Antiga', en: 'Ancient Tomb' },
      { pt: 'Uma tumba selada com símbolos de dados. Algo brilha pelas frestas.', en: 'A tomb sealed with dice symbols. Something glints through the cracks.' }, [
        C({ pt: 'Abrir a tumba', en: 'Open the tomb' }, [ch(0.5, [relic(), gold(20)], [fight('common', true), curseNext()])], { pt: '50%: tesouro. 50%: mortos acordam amaldiçoados.', en: '50%: treasure. 50%: cursed dead awaken.' }),
        C({ pt: 'Rezar e deixar oferenda (15 ouro)', en: 'Pray and leave offering (15 gold)' }, [gold(-15), blessNext()], { pt: 'Bênção: escudo 2 em todos na próxima luta.', en: 'Blessing: shield 2 on all next fight.' }, { gold: 15 }),
        C({ pt: 'Ignorar', en: 'Ignore it' }, [nothing()], { pt: 'Os mortos seguem dormindo.', en: 'The dead keep sleeping.' })
      ]),
    E('ferreiroDados', { pt: 'Ferreiro dos Dados', en: 'Dice Smith' },
      { pt: 'Um anão martela um dado incandescente. "Trago faces à vida. Por um preço."', en: 'A dwarf hammers a glowing die. "I bring faces to life. For a price."' }, [
        C({ pt: 'Forjar face (30 ouro)', en: 'Forge a face (30 gold)' }, [gold(-30), face()], { pt: 'Escolha uma Face Rúnica nova.', en: 'Pick a new rune face.' }, { gold: 30 }),
        C({ pt: 'Consertar dados trincados (20 ouro)', en: 'Repair cracked dice (20 gold)' }, [gold(-20), repair()], { pt: 'Todas as faces trincadas são consertadas.', en: 'All cracked faces repaired.' }, { gold: 20, cracked: true }),
        C({ pt: 'Só assistir', en: 'Just watch' }, [mod('inspiradoForja')], { pt: 'Você aprende algo: +1 no primeiro dado da próxima luta.', en: 'You learn something: +1 to first die next fight.' })
      ]),
    E('prisioneiroMisterioso', { pt: 'Prisioneiro Misterioso', en: 'Mysterious Prisoner' },
      { pt: 'Uma jaula pendurada. Dentro, uma figura encapuzada sussurra: "Liberte-me e serei grato."', en: 'A hanging cage. Inside, a hooded figure whispers: "Free me and I will be grateful."' }, [
        C({ pt: 'Libertar', en: 'Free them' }, [ch(0.6, [relic('rara')], [fight('elite')])], { pt: '60%: gratidão valiosa. 40%: era um monstro.', en: '60%: valuable gratitude. 40%: it was a monster.' }),
        C({ pt: 'Interrogar primeiro', en: 'Interrogate first' }, [ch(0.5, [fx('secretMap')], [nothing()])], { pt: '50%: revela uma sala secreta da região.', en: '50%: reveals a secret room.' }),
        C({ pt: 'Deixar preso', en: 'Leave them' }, [nothing()], { pt: 'Os gritos ecoam atrás de você.', en: 'The screams echo behind you.' })
      ]),
    E('mesaDeJogo', { pt: 'Mesa de Jogo', en: 'Gambling Table' },
      { pt: 'Esqueletos jogam dados numa mesa torta. Um assento está vazio.', en: 'Skeletons roll dice at a crooked table. One seat is empty.' }, [
        C({ pt: 'Apostar 20 ouro', en: 'Bet 20 gold' }, [gold(-20), ch(0.5, [gold(50)], [nothing()])], { pt: '50%: ganha 50. 50%: perde tudo.', en: '50%: win 50. 50%: lose it.' }, { gold: 20 }),
        C({ pt: 'Apostar uma relíquia', en: 'Bet a relic' }, [ch(0.5, [relic('rara'), gold(20)], [fx('loseRelic')])], { pt: '50%: relíquia rara + 20 ouro. 50%: perde uma relíquia.', en: '50%: rare relic + 20 gold. 50%: lose a relic.' }, { relic: true }),
        C({ pt: 'Virar a mesa', en: 'Flip the table' }, [gold(15), fight('common')], { pt: 'Pega 15 ouro do pote, mas eles não gostam.', en: 'Grab 15 gold from the pot, but they object.' })
      ]),
    E('criancaPerdida', { pt: 'Criança Perdida', en: 'Lost Child' },
      { pt: 'Uma criança chora numa encruzilhada. Seus olhos refletem números que mudam.', en: 'A child cries at a crossroads. Their eyes reflect shifting numbers.' }, [
        C({ pt: 'Ajudar a criança', en: 'Help the child' }, [ch(0.7, [blessNext(), gold(10)], [curseNext()])], { pt: '70%: ela abençoa vocês. 30%: não era uma criança.', en: '70%: a blessing. 30%: not a child.' }),
        C({ pt: 'Dar comida (10 ouro)', en: 'Give food (10 gold)' }, [gold(-10), mod('sorteCrianca')], { pt: 'Sorte: +1 rerrolagem na próxima luta.', en: 'Luck: +1 reroll next fight.' }, { gold: 10 }),
        C({ pt: 'Passar reto', en: 'Pass by' }, [nothing()], { pt: 'O choro para de repente.', en: 'The crying suddenly stops.' })
      ]),
    E('espelhoSangue', { pt: 'Espelho de Sangue', en: 'Blood Mirror' },
      { pt: 'Um espelho rachado mostra seus heróis mais fortes... e famintos.', en: 'A cracked mirror shows your heroes, stronger... and hungrier.' }, [
        C({ pt: 'Tocar o espelho', en: 'Touch the mirror' }, [dmgAll(2), mod('forcaEspelho')], { pt: 'Todos perdem 2 HP; ataques +1 na próxima luta.', en: 'All lose 2 HP; attacks +1 next fight.' }),
        C({ pt: 'Oferecer sangue de um', en: 'Offer one\'s blood' }, [dmgOne(4), face('ataque')], { pt: 'Um herói perde 4 HP; ganha Face de ataque.', en: 'One hero loses 4 HP; gain attack face.' }),
        C({ pt: 'Quebrar o espelho', en: 'Break the mirror' }, [ch(0.5, [relicId('espelhoQuebrado')], [curseNext()])], { pt: '50%: relíquia Espelho Quebrado. 50%: azar.', en: '50%: Broken Mirror relic. 50%: bad luck.' })
      ]),
    E('altarSorte', { pt: 'Altar da Sorte', en: 'Altar of Luck' },
      { pt: 'Um altar coberto de dados de todos os tamanhos. Uma placa: "UM PEDIDO".', en: 'An altar covered in dice of every size. A sign: "ONE WISH".' }, [
        C({ pt: 'Pedir riqueza', en: 'Wish for wealth' }, [ch(0.65, [gold(40)], [gold(-15)])], { pt: '65%: +40 ouro. 35%: o altar cobra 15.', en: '65%: +40 gold. 35%: altar takes 15.' }),
        C({ pt: 'Pedir poder', en: 'Wish for power' }, [ch(0.5, [face()], [crack()])], { pt: '50%: Face nova. 50%: um dado trinca.', en: '50%: new face. 50%: a die cracks.' }),
        C({ pt: 'Pedir proteção', en: 'Wish for protection' }, [blessNext()], { pt: 'Escudo 2 em todos na próxima luta.', en: 'Shield 2 on all next fight.' })
      ]),
    E('bibliotecaQueimada', { pt: 'Biblioteca Queimada', en: 'Burned Library' },
      { pt: 'Prateleiras carbonizadas. Um único livro intacto pulsa com luz fraca.', en: 'Charred shelves. A single intact book pulses faintly.' }, [
        C({ pt: 'Ler o livro', en: 'Read the book' }, [ch(0.6, [face('magia')], [dmgOne(3), face('magia')])], { pt: 'Face de magia; 40% de queimar as mãos (3 de dano).', en: 'Magic face; 40% to burn hands (3 damage).' }),
        C({ pt: 'Vasculhar as cinzas', en: 'Search the ashes' }, [ch(0.5, [gold(20)], [nothing()])], { pt: '50%: 20 ouro entre os restos.', en: '50%: 20 gold in the remains.' }),
        C({ pt: 'Sair', en: 'Leave' }, [nothing()], { pt: 'O livro suspira quando você sai.', en: 'The book sighs as you leave.' })
      ]),
    E('jardimVenenoso', { pt: 'Jardim Venenoso', en: 'Poison Garden' },
      { pt: 'Flores lindas exalam névoa roxa. Frutos brilham entre os espinhos.', en: 'Beautiful flowers exhale purple mist. Fruit glows among thorns.' }, [
        C({ pt: 'Colher os frutos', en: 'Pick the fruit' }, [dmgAll(1), healPct(0.35)], { pt: 'Todos perdem 1 HP nos espinhos, depois curam 35%.', en: 'All lose 1 HP to thorns, then heal 35%.' }),
        C({ pt: 'Colher só as flores', en: 'Pick only flowers' }, [mod('venenoFlor')], { pt: 'Seus venenos aplicam +1 na próxima luta.', en: 'Your poisons apply +1 next fight.' }),
        C({ pt: 'Queimar o jardim', en: 'Burn the garden' }, [ch(0.5, [gold(25)], [dmgAll(2)])], { pt: '50%: acha 25 ouro. 50%: a fumaça machuca (2 em todos).', en: '50%: find 25 gold. 50%: smoke hurts (2 all).' })
      ]),
    E('pocoSemFundo', { pt: 'Poço sem Fundo', en: 'Bottomless Well' },
      { pt: 'Um poço escuro que engole até o som. Uma corda desce para o nada.', en: 'A dark well that swallows even sound. A rope descends into nothing.' }, [
        C({ pt: 'Jogar 10 ouro', en: 'Throw 10 gold' }, [gold(-10), ch(0.5, [relic()], [nothing()])], { pt: '50%: o poço retribui com relíquia.', en: '50%: the well returns a relic.' }, { gold: 10 }),
        C({ pt: 'Descer pela corda', en: 'Climb down' }, [ch(0.5, [gold(35), face()], [dmgOne(5)])], { pt: '50%: tesouro no fundo. 50%: a corda arrebenta.', en: '50%: treasure below. 50%: the rope snaps.' }),
        C({ pt: 'Gritar no poço', en: 'Shout into it' }, [ch(0.3, [fx('secretMap')], [nothing()])], { pt: '30%: o eco revela uma sala secreta.', en: '30%: the echo reveals a secret room.' })
      ]),
    E('mapaRasgado', { pt: 'Mapa Rasgado', en: 'Torn Map' },
      { pt: 'Metade de um mapa presa numa lança fincada no chão. Marca um "X" borrado.', en: 'Half a map pinned by a spear in the ground. A smudged "X".' }, [
        C({ pt: 'Seguir o mapa', en: 'Follow the map' }, [ch(0.6, [gold(30)], [fight('common')])], { pt: '60%: tesouro. 40%: emboscada.', en: '60%: treasure. 40%: ambush.' }),
        C({ pt: 'Vender a um viajante', en: 'Sell to a traveler' }, [gold(12)], { pt: '+12 ouro garantidos.', en: '+12 gold guaranteed.' })
      ]),
    E('carruagemAbandonada', { pt: 'Carruagem Abandonada', en: 'Abandoned Carriage' },
      { pt: 'Uma carruagem de luxo tombada. As marcas de garras ainda estão frescas.', en: 'A toppled luxury carriage. The claw marks are still fresh.' }, [
        C({ pt: 'Saquear rápido', en: 'Loot quickly' }, [gold(20)], { pt: '+20 ouro sem demora.', en: '+20 gold, no delay.' }),
        C({ pt: 'Vasculhar com calma', en: 'Search thoroughly' }, [ch(0.55, [gold(20), relic()], [gold(20), fight('common')])], { pt: 'Ouro + 55% relíquia, mas 45% de a fera voltar.', en: 'Gold + 55% relic, but 45% the beast returns.' }),
        C({ pt: 'Não mexer', en: 'Leave it' }, [nothing()], { pt: 'Melhor não provocar o destino.', en: 'Better not to tempt fate.' })
      ]),
    E('sapoFalante', { pt: 'Sapo Falante', en: 'Talking Frog' },
      { pt: 'Um sapo de cartola: "Beije-me e eu te darei... bem, algo."', en: 'A frog in a top hat: "Kiss me and I shall grant... well, something."' }, [
        C({ pt: 'Beijar o sapo', en: 'Kiss the frog' }, [ch(0.5, [relic()], [curseNext()])], { pt: '50%: relíquia! 50%: gosto de maldição.', en: '50%: a relic! 50%: tastes like a curse.' }),
        C({ pt: 'Pedir conselho', en: 'Ask for advice' }, [mod('conselhoSapo')], { pt: 'Você vê a intenção do chefe da região com antecedência.', en: 'You preview the region boss\'s intent.' }),
        C({ pt: 'Seguir viagem', en: 'Move along' }, [nothing()], { pt: '"Covarde", coaxa ele.', en: '"Coward," it croaks.' })
      ]),
    E('torrePequena', { pt: 'Torre Pequena', en: 'Tiny Tower' },
      { pt: 'Uma torre em miniatura, perfeita, do tamanho de um joelho. A porta se abre sozinha.', en: 'A perfect miniature tower, knee-high. Its door opens by itself.' }, [
        C({ pt: 'Enfiar a mão', en: 'Reach inside' }, [ch(0.6, [gold(25)], [dmgOne(3)])], { pt: '60%: 25 ouro. 40%: algo morde.', en: '60%: 25 gold. 40%: something bites.' }),
        C({ pt: 'Deixar uma moeda', en: 'Leave a coin' }, [gold(-1), mod('sorteTorre')], { pt: 'Os moradores agradecem: +1 no Dado do Destino.', en: 'The tenants thank you: +1 on the Fate Die.' }, { gold: 1 })
      ]),
    E('relogioParado', { pt: 'Relógio Parado', en: 'Stopped Clock' },
      { pt: 'Um relógio de pé no meio do nada, parado às 11:59. O pêndulo range.', en: 'A grandfather clock in the wild, stopped at 11:59. The pendulum creaks.' }, [
        C({ pt: 'Adiantar o ponteiro', en: 'Push the hand forward' }, [ch(0.5, [blessNext(), healAll(2)], [fight('elite')])], { pt: '50%: o tempo te favorece. 50%: a meia-noite chega com dentes.', en: '50%: time favors you. 50%: midnight arrives with teeth.' }),
        C({ pt: 'Dar corda', en: 'Wind it up' }, [mod('tempoExtra')], { pt: '+1 rerrolagem na próxima luta.', en: '+1 reroll next fight.' }),
        C({ pt: 'Não tocar', en: 'Don\'t touch' }, [nothing()], { pt: 'Tique. Taque. Silêncio.', en: 'Tick. Tock. Silence.' })
      ]),
    E('salaEcos', { pt: 'Sala dos Ecos', en: 'Hall of Echoes' },
      { pt: 'Suas palavras voltam com vozes diferentes. Uma delas oferece um acordo.', en: 'Your words return in different voices. One offers a deal.' }, [
        C({ pt: 'Aceitar o acordo', en: 'Accept the deal' }, [face(), crack()], { pt: 'Face nova, mas um dado trinca.', en: 'New face, but a die cracks.' }),
        C({ pt: 'Ecoar uma canção', en: 'Echo a song' }, [healAll(3)], { pt: 'O eco acalma: cura 3 em todos.', en: 'The echo soothes: heal 3 all.' }),
        C({ pt: 'Sair em silêncio', en: 'Leave in silence' }, [nothing()], { pt: 'O eco te imita saindo.', en: 'The echo mimics your exit.' })
      ]),
    E('pactoBruxa', { pt: 'Pacto da Bruxa', en: 'Witch\'s Pact' },
      { pt: 'Uma bruxa mexe um caldeirão onde flutuam dados. "Poder por sangue. Assine."', en: 'A witch stirs a cauldron of floating dice. "Power for blood. Sign."' }, [
        C({ pt: 'Assinar com sangue', en: 'Sign in blood' }, [maxHp(-2), relic('epica')], { pt: 'Herói perde 2 HP máximo; relíquia épica.', en: 'A hero loses 2 max HP; epic relic.' }),
        C({ pt: 'Negociar', en: 'Haggle' }, [gold(-30), relic()], { pt: '30 ouro por uma relíquia comum.', en: '30 gold for a common relic.' }, { gold: 30 }),
        C({ pt: 'Recusar', en: 'Refuse' }, [ch(0.75, [nothing()], [curseNext()])], { pt: '75%: ela dá de ombros. 25%: ela se ofende.', en: '75%: she shrugs. 25%: she takes offense.' })
      ]),
    E('estatuaHeroi', { pt: 'Estátua do Herói', en: 'Hero\'s Statue' },
      { pt: 'A estátua de um herói esquecido, com a mão estendida como quem pede um dado.', en: 'A forgotten hero\'s statue, hand extended as if asking for a die.' }, [
        C({ pt: 'Colocar um dado na mão', en: 'Place a die in its hand' }, [ch(0.6, [face('defesa')], [crack()])], { pt: '60%: a estátua abençoa a face. 40%: aperta forte demais.', en: '60%: it blesses a face. 40%: it squeezes too hard.' }),
        C({ pt: 'Polir a estátua', en: 'Polish the statue' }, [blessNext()], { pt: 'Escudo 2 em todos na próxima luta.', en: 'Shield 2 on all next fight.' }),
        C({ pt: 'Procurar na base', en: 'Search the base' }, [ch(0.5, [gold(18)], [nothing()])], { pt: '50%: 18 ouro escondidos.', en: '50%: 18 hidden gold.' })
      ]),
    E('gatoTresOlhos', { pt: 'Gato de Três Olhos', en: 'Three-Eyed Cat' },
      { pt: 'Um gato preto com um terceiro olho que gira como um dado. Ele encara.', en: 'A black cat with a third eye spinning like a die. It stares.' }, [
        C({ pt: 'Acariciar', en: 'Pet it' }, [ch(0.7, [mod('sorteGato')], [dmgOne(2)])], { pt: '70%: +1 rerrolagem na próxima luta. 30%: arranhão.', en: '70%: +1 reroll next fight. 30%: a scratch.' }),
        C({ pt: 'Oferecer comida (5 ouro)', en: 'Offer food (5 gold)' }, [gold(-5), fx('fateChoiceNext')], { pt: 'Você escolhe o Dado do Destino na próxima luta.', en: 'You choose the Fate Die next fight.' }, { gold: 5 }),
        C({ pt: 'Encarar de volta', en: 'Stare back' }, [ch(0.5, [face('sombria')], [curseNext()])], { pt: '50%: face sombria. 50%: você pisca primeiro.', en: '50%: dark face. 50%: you blink first.' })
      ]),
    E('portaSeisFechaduras', { pt: 'Porta com 6 Fechaduras', en: 'Door of 6 Locks' },
      { pt: 'Uma porta com seis fechaduras numeradas de 1 a 6. Você tem uma chave torta.', en: 'A door with six locks numbered 1 to 6. You hold one bent key.' }, [
        C({ pt: 'Tentar a fechadura 6', en: 'Try lock 6' }, [ch(0.35, [relic('rara'), gold(20)], [nothing()])], { pt: '35%: grande tesouro. 65%: a chave não gira.', en: '35%: big treasure. 65%: key won\'t turn.' }),
        C({ pt: 'Tentar a fechadura 1', en: 'Try lock 1' }, [ch(0.8, [gold(15)], [nothing()])], { pt: '80%: prêmio modesto.', en: '80%: modest prize.' }),
        C({ pt: 'Arrombar', en: 'Force it' }, [dmgOne(3), gold(25)], { pt: 'Um herói se machuca (3), mas a porta cede: +25 ouro.', en: 'A hero gets hurt (3), door yields: +25 gold.' })
      ]),
    E('cadaverAventureiro', { pt: 'Cadáver do Aventureiro', en: 'Adventurer\'s Corpse' },
      { pt: 'Um aventureiro caído segura um saco de dados. O diário dele está aberto.', en: 'A fallen adventurer clutches a dice bag. Their journal lies open.' }, [
        C({ pt: 'Pegar o saco de dados', en: 'Take the dice bag' }, [ch(0.7, [face()], [curseNext(), face()])], { pt: 'Face nova; 30% de o espírito reclamar.', en: 'New face; 30% the spirit objects.' }),
        C({ pt: 'Ler o diário', en: 'Read the journal' }, [fx('secretMap')], { pt: 'O diário revela uma sala secreta.', en: 'The journal reveals a secret room.' }),
        C({ pt: 'Enterrar com honra', en: 'Bury with honor' }, [blessNext(), gold(5)], { pt: 'Bênção + 5 ouro deixados para você.', en: 'Blessing + 5 gold left for you.' })
      ]),
    E('lojaAfundada', { pt: 'Loja Afundada', en: 'Sunken Shop' },
      { pt: 'Uma loja meio engolida pelo chão. O vendedor, também meio engolido, ainda atende.', en: 'A shop half-swallowed by the ground. The clerk, also half-swallowed, still serves.' }, [
        C({ pt: 'Comprar no escuro (20 ouro)', en: 'Buy blind (20 gold)' }, [gold(-20), ch(0.6, [relic()], [gold(8)])], { pt: '60%: relíquia. 40%: só um troco molhado.', en: '60%: relic. 40%: soggy change.' }, { gold: 20 }),
        C({ pt: 'Ajudar a desenterrar', en: 'Help dig him out' }, [mod('descontoLoja')], { pt: 'Próxima loja com 30% de desconto.', en: 'Next shop 30% off.' }),
        C({ pt: 'Sair de fininho', en: 'Sneak away' }, [nothing()], { pt: '"Volte semp—" e ele afunda mais um pouco.', en: '"Come ba—" he sinks a bit more.' })
      ]),
    E('chuvaDados', { pt: 'Chuva de Dados', en: 'Rain of Dice' },
      { pt: 'Dados de madeira caem do céu como granizo. Um deles brilha ouro.', en: 'Wooden dice fall from the sky like hail. One glints gold.' }, [
        C({ pt: 'Correr para pegar o dourado', en: 'Dash for the gold one' }, [dmgAll(1), ch(0.6, [face()], [gold(20)])], { pt: 'Todos levam 1; 60% face nova, 40% ouro.', en: 'All take 1; 60% new face, 40% gold.' }),
        C({ pt: 'Se abrigar e esperar', en: 'Take cover and wait' }, [gold(10)], { pt: 'Depois da chuva, sobra ouro pelo chão.', en: 'After the rain, gold litters the ground.' })
      ]),
    E('criancaSorte', { pt: 'Criança da Sorte', en: 'Lucky Child' },
      { pt: 'Uma criança sem sombra joga um dado que sempre cai em 6. Ela sorri para você.', en: 'A shadowless child rolls a die that always lands 6. She smiles at you.' }, [
        C({ pt: 'Jogar dados com ela', en: 'Play dice with her' }, [ch(0.5, [mod('bencaoSorte'), fx('unlock', { id: 'vistoCrianca' })], [gold(-10), fx('unlock', { id: 'vistoCrianca' })])], { pt: '50%: bênção rara. 50%: ela ganha seu ouro.', en: '50%: rare blessing. 50%: she wins your gold.' }),
        C({ pt: 'Perguntar o nome dela', en: 'Ask her name' }, [fx('unlock', { id: 'vistoCrianca' }), nothing()], { pt: '"Ainda não tenho um." Algo muda no ar.', en: '"I don\'t have one yet." Something shifts.' }),
        C({ pt: 'Ir embora devagar', en: 'Back away slowly' }, [nothing()], { pt: 'O dado dela cai em 1 pela primeira vez.', en: 'Her die lands on 1 for the first time.' })
      ]),
    E('circuloOssos', { pt: 'Círculo de Ossos', en: 'Circle of Bones' },
      { pt: 'Ossos dispostos em círculo perfeito. No centro, um dado de marfim.', en: 'Bones arranged in a perfect circle. At the center, an ivory die.' }, [
        C({ pt: 'Pegar o dado', en: 'Take the die' }, [ch(0.5, [face('sombria')], [fight('common', true)])], { pt: '50%: face sombria. 50%: os ossos se levantam.', en: '50%: dark face. 50%: the bones rise.' }),
        C({ pt: 'Completar o ritual', en: 'Complete the ritual' }, [dmgOne(3), relic()], { pt: 'Sangue (3 de dano) por uma relíquia.', en: 'Blood (3 damage) for a relic.' }),
        C({ pt: 'Desfazer o círculo', en: 'Scatter the circle' }, [blessNext()], { pt: 'Os espíritos agradecem: bênção.', en: 'The spirits thank you: blessing.' })
      ]),
    E('forjaViva', { pt: 'Forja Viva', en: 'Living Forge' },
      { pt: 'Uma forja que respira. As brasas formam um rosto: "ALIMENTE-ME".', en: 'A breathing forge. The embers form a face: "FEED ME".' }, [
        C({ pt: 'Alimentar com uma relíquia', en: 'Feed it a relic' }, [fx('loseRelic'), face('ataque'), face('defesa')], { pt: 'Perde uma relíquia; ganha 2 faces (ataque e defesa).', en: 'Lose a relic; gain 2 faces (attack, defense).' }, { relic: true }),
        C({ pt: 'Alimentar com ouro (25)', en: 'Feed it gold (25)' }, [gold(-25), face()], { pt: 'Ela cospe uma face nova.', en: 'It spits out a new face.' }, { gold: 25 }),
        C({ pt: 'Apagar com água', en: 'Douse it' }, [ch(0.5, [gold(30)], [dmgAll(2)])], { pt: '50%: acha ouro nas cinzas. 50%: vapor escaldante.', en: '50%: gold in the ash. 50%: scalding steam.' })
      ]),
    E('mascaraChao', { pt: 'Máscara no Chão', en: 'Mask on the Ground' },
      { pt: 'Uma máscara branca sorri no chão. Você jura que ela virou para te olhar.', en: 'A white mask smiles on the ground. You swear it turned to look at you.' }, [
        C({ pt: 'Vestir a máscara', en: 'Wear the mask' }, [ch(0.5, [mod('mascaraBranca')], [curseNext(), dmgOne(2)])], { pt: '50%: inimigos erram mais na próxima luta. 50%: ela morde.', en: '50%: enemies miss more next fight. 50%: it bites.' }),
        C({ pt: 'Vender depois', en: 'Sell it later' }, [gold(15)], { pt: '+15 ouro de um colecionador.', en: '+15 gold from a collector.' }),
        C({ pt: 'Pisar nela', en: 'Step on it' }, [ch(0.7, [nothing()], [fight('common')])], { pt: '70%: craque satisfatório. 30%: o dono aparece.', en: '70%: satisfying crack. 30%: its owner shows up.' })
      ]),
    E('maoParede', { pt: 'Mão Presa na Parede', en: 'Hand in the Wall' },
      { pt: 'Uma mão de pedra sai da parede, palma aberta. Espera alguma coisa.', en: 'A stone hand juts from the wall, palm open. It waits.' }, [
        C({ pt: 'Dar ouro (15)', en: 'Give gold (15)' }, [gold(-15), ch(0.7, [relic()], [nothing()])], { pt: '70%: a parede retribui com relíquia.', en: '70%: the wall returns a relic.' }, { gold: 15 }),
        C({ pt: 'Apertar a mão', en: 'Shake the hand' }, [ch(0.6, [blessNext()], [dmgOne(3)])], { pt: '60%: acordo selado (bênção). 40%: aperto de pedra.', en: '60%: deal sealed (blessing). 40%: stone grip.' }),
        C({ pt: 'Ignorar', en: 'Ignore it' }, [nothing()], { pt: 'A mão faz um gesto rude.', en: 'The hand makes a rude gesture.' })
      ]),
    E('fonteDourada', { pt: 'Fonte Dourada', en: 'Golden Fountain' },
      { pt: 'Uma fonte que jorra ouro líquido. Placas avisam: NÃO TOCAR.', en: 'A fountain of liquid gold. Signs warn: DO NOT TOUCH.' }, [
        C({ pt: 'Encher os bolsos', en: 'Fill your pockets' }, [gold(35), ch(0.4, [fight('elite')], [nothing()])], { pt: '+35 ouro; 40% de o guardião aparecer.', en: '+35 gold; 40% the guardian appears.' }),
        C({ pt: 'Molhar um dado', en: 'Dip a die' }, [ch(0.5, [face('suporte')], [crack()])], { pt: '50%: face dourada de suporte. 50%: o ouro trinca o dado.', en: '50%: golden support face. 50%: gold cracks the die.' }),
        C({ pt: 'Obedecer as placas', en: 'Obey the signs' }, [gold(5)], { pt: 'Você acha 5 moedas respingadas no chão. Legal e seguro.', en: 'You find 5 splashed coins. Legal and safe.' })
      ]),
    E('reliquiaPartida', { pt: 'Relíquia Partida', en: 'Broken Relic' },
      { pt: 'Metade de uma relíquia no chão. A outra metade brilha... dentro de um monstro adormecido.', en: 'Half a relic on the ground. The other half glows... inside a sleeping monster.' }, [
        C({ pt: 'Acordar o monstro', en: 'Wake the monster' }, [fight('elite', true)], { pt: 'Luta de elite; recompensa garantida: relíquia.', en: 'Elite fight; guaranteed relic reward.' }),
        C({ pt: 'Levar só a metade', en: 'Take just the half' }, [gold(18)], { pt: 'Vale 18 ouro como sucata bonita.', en: 'Worth 18 gold as pretty scrap.' }),
        C({ pt: 'Furto silencioso', en: 'Silent theft' }, [ch(0.4, [relic('rara')], [fight('elite')])], { pt: '40%: relíquia inteira sem briga. 60%: ele acorda bravo.', en: '40%: whole relic, no fight. 60%: it wakes angry.' })
      ]),
    E('leilaoSombras', { pt: 'Leilão de Sombras', en: 'Shadow Auction' },
      { pt: 'Vultos leiloam itens que não deviam existir. O martelo bate. Olham para você.', en: 'Shades auction items that shouldn\'t exist. The gavel falls. They look at you.' }, [
        C({ pt: 'Lance alto (40 ouro)', en: 'High bid (40 gold)' }, [gold(-40), relic('epica')], { pt: 'Relíquia épica garantida.', en: 'Guaranteed epic relic.' }, { gold: 40 }),
        C({ pt: 'Lance baixo (15 ouro)', en: 'Low bid (15 gold)' }, [gold(-15), ch(0.5, [relic()], [face('sombria')])], { pt: 'Relíquia comum ou face sombria.', en: 'Common relic or dark face.' }, { gold: 15 }),
        C({ pt: 'Vender sua sombra', en: 'Sell your shadow' }, [curseNext(), gold(45)], { pt: '+45 ouro; maldição na próxima luta.', en: '+45 gold; curse next fight.' })
      ]),
    E('poetaMorto', { pt: 'Poeta Morto', en: 'Dead Poet' },
      { pt: 'Um fantasma recita versos para ninguém. Ele para: "Uma audiência! Fiquem!"', en: 'A ghost recites verse to no one. He stops: "An audience! Stay!"' }, [
        C({ pt: 'Ouvir o poema inteiro', en: 'Hear the whole poem' }, [healAll(2), mod('inspiracaoPoeta')], { pt: 'Cura 2 em todos; inspiração na próxima luta.', en: 'Heal 2 all; inspire next fight.' }),
        C({ pt: 'Pedir um verso de guerra', en: 'Request a war verse' }, [mod('versoGuerra')], { pt: 'Primeiro ataque da próxima luta +2.', en: 'First attack next fight +2.' }),
        C({ pt: 'Aplaudir e sair', en: 'Applaud and leave' }, [gold(8)], { pt: 'Ele joga o chapéu com 8 moedas.', en: 'He tosses a hat with 8 coins.' })
      ]),
    E('arvoreSussurra', { pt: 'Árvore que Sussurra', en: 'Whispering Tree' },
      { pt: 'Uma árvore oca sussurra segredos em línguas mortas. Uma fruta pende ao alcance.', en: 'A hollow tree whispers secrets in dead tongues. One fruit hangs in reach.' }, [
        C({ pt: 'Comer a fruta', en: 'Eat the fruit' }, [ch(0.6, [maxHp(2), healAll(2)], [dmgOne(4)])], { pt: '60%: +2 HP máximo num herói. 40%: veneno.', en: '60%: +2 max HP one hero. 40%: poison.' }),
        C({ pt: 'Ouvir os sussurros', en: 'Listen to the whispers' }, [fx('secretMap')], { pt: 'Um segredo da região é revelado.', en: 'A region secret is revealed.' }),
        C({ pt: 'Cortar um galho', en: 'Cut a branch' }, [ch(0.5, [face('cura')], [curseNext()])], { pt: '50%: face de cura. 50%: a árvore chora maldição.', en: '50%: heal face. 50%: it weeps a curse.' })
      ]),
    E('desafioSilencio', { pt: 'Desafio do Silêncio', en: 'Trial of Silence' },
      { pt: 'Um monge de pedra propõe: "Atravessem meu salão sem que os dados façam som."', en: 'A stone monk offers: "Cross my hall without your dice making a sound."' }, [
        C({ pt: 'Aceitar o desafio', en: 'Accept the trial' }, [ch(0.5, [relic('rara')], [mod('menosReroll')])], { pt: '50%: relíquia rara. 50%: -1 rerrolagem na próxima luta.', en: '50%: rare relic. 50%: -1 reroll next fight.' }),
        C({ pt: 'Subornar o monge (20)', en: 'Bribe the monk (20)' }, [gold(-20), relic()], { pt: 'Ele aceita "doações". Relíquia comum.', en: 'He accepts "donations". Common relic.' }, { gold: 20 }),
        C({ pt: 'Dar a volta', en: 'Go around' }, [nothing()], { pt: 'O caminho longo, mas seguro.', en: 'The long, safe way.' })
      ]),
    E('arenaOpcional', { pt: 'Arena Opcional', en: 'Optional Arena' },
      { pt: 'Uma arena improvisada. A multidão de esqueletos aposta alto em quem entrar.', en: 'A makeshift arena. A skeleton crowd bets big on whoever enters.' }, [
        C({ pt: 'Lutar pelo prêmio', en: 'Fight for the prize' }, [fight('elite', true)], { pt: 'Luta de elite; prêmio: relíquia + ouro.', en: 'Elite fight; prize: relic + gold.' }),
        C({ pt: 'Apostar nos outros (15)', en: 'Bet on others (15)' }, [gold(-15), ch(0.5, [gold(40)], [nothing()])], { pt: '50%: dobra e mais. 50%: seu lutador cai.', en: '50%: big win. 50%: your fighter falls.' }, { gold: 15 }),
        C({ pt: 'Só assistir', en: 'Just watch' }, [mod('estudoArena')], { pt: 'Você estuda golpes: +1 no primeiro ataque da próxima luta.', en: 'You study moves: +1 first attack next fight.' })
      ]),
    E('sacerdoteCego', { pt: 'Sacerdote Cego', en: 'Blind Priest' },
      { pt: 'Um sacerdote de olhos vendados abençoa viajantes. "A fé não precisa ver."', en: 'A blindfolded priest blesses travelers. "Faith needs no sight."' }, [
        C({ pt: 'Receber a bênção', en: 'Receive the blessing' }, [healAll(3), fx('cleanseCurse')], { pt: 'Cura 3 em todos e remove maldições pendentes.', en: 'Heal 3 all and remove pending curses.' }),
        C({ pt: 'Doar (10 ouro)', en: 'Donate (10 gold)' }, [gold(-10), blessNext(), healAll(2)], { pt: 'Cura 2 + bênção na próxima luta.', en: 'Heal 2 + blessing next fight.' }, { gold: 10 }),
        C({ pt: 'Testar se ele vê', en: 'Test if he sees' }, [ch(0.5, [gold(10)], [curseNext()])], { pt: '50%: ele não viu você pegar o cofre. 50%: ele viu.', en: '50%: he didn\'t see you take the box. 50%: he did.' })
      ]),
    E('livroMorde', { pt: 'Livro que Morde', en: 'Biting Book' },
      { pt: 'Um grimório acorrentado rosna. Entre os dentes de papel, uma página dourada.', en: 'A chained grimoire growls. Between paper teeth, a golden page.' }, [
        C({ pt: 'Arrancar a página', en: 'Rip the page out' }, [dmgOne(2), face('magia')], { pt: 'Ele morde (2), mas a página vira face de magia.', en: 'It bites (2), page becomes magic face.' }),
        C({ pt: 'Alimentar com pergaminho (10)', en: 'Feed it parchment (10)' }, [gold(-10), face('magia')], { pt: 'Distraído, ele solta a página.', en: 'Distracted, it drops the page.' }, { gold: 10 }),
        C({ pt: 'Deixar rosnando', en: 'Leave it growling' }, [nothing()], { pt: 'Ele rosna palavrões em latim.', en: 'It growls latin curses.' })
      ]),
    E('ponteOgro', { pt: 'Ponte do Ogro', en: 'Ogre\'s Bridge' },
      { pt: 'Um ogro cobra pedágio: "30 ouro ou um enigma. Errou, apanha."', en: 'An ogre demands toll: "30 gold or a riddle. Fail, and I clobber you."' }, [
        C({ pt: 'Pagar 30 ouro', en: 'Pay 30 gold' }, [gold(-30)], { pt: 'Caro, mas seguro.', en: 'Pricey but safe.' }, { gold: 30 }),
        C({ pt: 'Tentar o enigma', en: 'Try the riddle' }, [ch(0.6, [gold(15), mod('respeitoOgro')], [dmgAll(2)])], { pt: '60%: ele paga VOCÊ. 40%: porrada (2 em todos).', en: '60%: HE pays YOU. 40%: clobbering (2 all).' }),
        C({ pt: 'Atravessar o rio', en: 'Ford the river' }, [dmgOne(2)], { pt: 'Frio e fundo: um herói perde 2 HP.', en: 'Cold and deep: one hero loses 2 HP.' })
      ]),
    E('pocaoSemRotulo', { pt: 'Poção sem Rótulo', en: 'Unlabeled Potion' },
      { pt: 'Uma poção que muda de cor a cada segundo, largada num toco de árvore.', en: 'A potion shifting colors every second, left on a stump.' }, [
        C({ pt: 'Beber tudo', en: 'Drink it all' }, [ch(0.4, [healAll(5)], [ch(0.5, [maxHp(2)], [dmgOne(4)])])], { pt: '40%: cura 5 todos. 30%: +2 HP máx. 30%: veneno.', en: '40%: heal 5 all. 30%: +2 max HP. 30%: poison.' }),
        C({ pt: 'Provar uma gota', en: 'Sip a drop' }, [ch(0.7, [healAll(2)], [dmgOne(1)])], { pt: 'Versão fraca e mais segura.', en: 'Weaker, safer version.' }),
        C({ pt: 'Vender adiante', en: 'Sell it on' }, [gold(12)], { pt: '+12 ouro. O problema é de outro.', en: '+12 gold. Someone else\'s problem.' })
      ]),
    E('dadoEnterrado', { pt: 'Dado Enterrado', en: 'Buried Die' },
      { pt: 'Um canto de dado gigante aflora da terra, como a ponta de um iceberg.', en: 'The corner of a giant die juts from the earth like an iceberg tip.' }, [
        C({ pt: 'Escavar', en: 'Dig it out' }, [ch(0.5, [face(), gold(10)], [fight('common', true)])], { pt: '50%: face + ouro. 50%: era o dente de algo.', en: '50%: face + gold. 50%: it was something\'s tooth.' }),
        C({ pt: 'Marcar no mapa e avisar', en: 'Mark it and report' }, [gold(15)], { pt: 'Um colecionador paga 15 pela dica.', en: 'A collector pays 15 for the tip.' }),
        C({ pt: 'Deixar enterrado', en: 'Leave it buried' }, [nothing()], { pt: 'Algumas coisas devem continuar embaixo.', en: 'Some things should stay down.' })
      ]),
    E('santuarioSol', { pt: 'Santuário do Sol', en: 'Sun Shrine' },
      { pt: 'Um altar dourado onde a luz nunca esfria. Aquece até os ossos.', en: 'A golden altar where light never cools. It warms your bones.' }, [
        C({ pt: 'Descansar na luz', en: 'Rest in the light' }, [healPct(0.4)], { pt: 'Todos curam 40% do HP máximo.', en: 'All heal 40% max HP.' }),
        C({ pt: 'Consagrar um dado', en: 'Consecrate a die' }, [face('cura')], { pt: 'Ganha uma face de cura.', en: 'Gain a heal face.' }),
        C({ pt: 'Ofertar ouro (20)', en: 'Offer gold (20)' }, [gold(-20), blessNext(), healAll(3)], { pt: 'Cura 3 + bênção completa.', en: 'Heal 3 + full blessing.' }, { gold: 20 })
      ]),
    E('santuarioLua', { pt: 'Santuário da Lua', en: 'Moon Shrine' },
      { pt: 'Um altar prateado sob uma lua que não deveria estar visível a esta hora.', en: 'A silver altar under a moon that shouldn\'t be visible now.' }, [
        C({ pt: 'Meditar no escuro', en: 'Meditate in the dark' }, [mod('visaoLua')], { pt: 'Vê intenções detalhadas dos inimigos na próxima luta.', en: 'See detailed enemy intents next fight.' }),
        C({ pt: 'Consagrar um dado', en: 'Consecrate a die' }, [face('sombria')], { pt: 'Ganha uma face sombria.', en: 'Gain a dark face.' }),
        C({ pt: 'Roubar a prata', en: 'Steal the silver' }, [gold(30), curseNext()], { pt: '+30 ouro; a lua não esquece (maldição).', en: '+30 gold; the moon remembers (curse).' })
      ]),
    E('caixaTrancada', { pt: 'Caixa Trancada', en: 'Locked Box' },
      { pt: 'Uma caixa de ferro sem fechadura visível. Algo range lá dentro quando você chacoalha.', en: 'An iron box with no visible lock. Something rattles inside when shaken.' }, [
        C({ pt: 'Quebrar no joelho', en: 'Break it on your knee' }, [dmgOne(2), ch(0.6, [gold(25)], [face('sombria')])], { pt: 'Dói (2); 60% ouro, 40% face sombria.', en: 'It hurts (2); 60% gold, 40% dark face.' }),
        C({ pt: 'Levar para um ferreiro (10)', en: 'Take to a smith (10)' }, [gold(-10), ch(0.8, [gold(30)], [nothing()])], { pt: '80%: ele abre sem estragar: +30.', en: '80%: opened intact: +30.' }, { gold: 10 }),
        C({ pt: 'Deixar fechada', en: 'Leave it shut' }, [nothing()], { pt: 'O rangido fica mais alto quando você sai.', en: 'The rattle grows louder as you leave.' })
      ]),
    E('mensageiroFerido', { pt: 'Mensageiro Ferido', en: 'Wounded Messenger' },
      { pt: 'Um mensageiro sangrando aperta uma carta: "Entregue... na torre... por favor..."', en: 'A bleeding messenger clutches a letter: "Deliver it... to the tower... please..."' }, [
        C({ pt: 'Curá-lo com suprimentos', en: 'Heal him with supplies' }, [gold(-10), relic()],{ pt: 'Custa 10 ouro; ele te dá o anel dele.', en: 'Costs 10 gold; he gives you his ring.' }, { gold: 10 }),
        C({ pt: 'Aceitar a carta', en: 'Take the letter' }, [mod('cartaTorre')], { pt: 'Recompensa te espera na Torre (região final).', en: 'A reward awaits at the Tower (final region).' }),
        C({ pt: 'Ler a carta', en: 'Read the letter' }, [ch(0.5, [fx('secretMap')], [curseNext()])], { pt: '50%: segredo revelado. 50%: era selada com maldição.', en: '50%: secret revealed. 50%: curse-sealed.' })
      ]),
    E('balancaAntiga', { pt: 'Balança Antiga', en: 'Ancient Scales' },
      { pt: 'Uma balança de bronze gigante. Um prato pede OURO; o outro, SANGUE.', en: 'Giant bronze scales. One pan asks GOLD; the other, BLOOD.' }, [
        C({ pt: 'Pesar ouro (25)', en: 'Weigh gold (25)' }, [gold(-25), relic()], { pt: 'A balança desce e entrega uma relíquia.', en: 'The scales dip and yield a relic.' }, { gold: 25 }),
        C({ pt: 'Pesar sangue', en: 'Weigh blood' }, [dmgAll(2), face()], { pt: 'Todos perdem 2 HP; face nova.', en: 'All lose 2 HP; new face.' }),
        C({ pt: 'Equilibrar os dois', en: 'Balance both' }, [gold(-12), dmgOne(2), relic('rara')], { pt: '12 ouro + 2 de dano por uma relíquia rara.', en: '12 gold + 2 damage for a rare relic.' }, { gold: 12 })
      ]),
    E('galeriaFaces', { pt: 'Galeria das Faces', en: 'Gallery of Faces' },
      { pt: 'Um corredor de retratos cujos rostos são faces de dados. Um quadro está vazio.', en: 'A hall of portraits whose faces are die faces. One frame is empty.' }, [
        C({ pt: 'Posar para o quadro', en: 'Pose for the frame' }, [ch(0.6, [face(), face()], [mod('menosReroll')])], { pt: '60%: 2 faces novas. 40%: o quadro rouba sua sorte.', en: '60%: 2 new faces. 40%: it steals your luck.' }),
        C({ pt: 'Estudar os retratos', en: 'Study the portraits' }, [fx('unlock', { id: 'vistoGaleria' }), mod('estudoFaces')], { pt: 'Combos rendem +1 na próxima luta.', en: 'Combos give +1 next fight.' }),
        C({ pt: 'Virar os quadros', en: 'Turn the frames around' }, [nothing()], { pt: 'Você ouve suspiros de alívio.', en: 'You hear sighs of relief.' })
      ]),
    E('ferreiroCegoEv', { pt: 'Ferreiro Cego', en: 'Blind Smith' },
      { pt: 'Um ferreiro sem olhos forja no escuro, sem errar um golpe. "Aproxime-se. Eu sinto seus dados."', en: 'An eyeless smith forges in the dark, never missing. "Come. I feel your dice."' }, [
        C({ pt: 'Deixá-lo reforjar um dado', en: 'Let him reforge a die' }, [repair(), face()], { pt: 'Conserta trincas e adiciona uma face à sua escolha.', en: 'Repairs cracks and adds a face of your choice.' }),
        C({ pt: 'Perguntar sobre o Dado Negro', en: 'Ask about the Black Die' }, [fx('unlock', { id: 'pistaFerreiro' })], { pt: '"Eu o forjei. E posso desfazê-lo." Uma pista se revela.', en: '"I forged it. And I can unmake it." A clue is revealed.' }),
        C({ pt: 'Desafiá-lo', en: 'Challenge him' }, [ch(0.3, [relic('lendaria'), fx('unlock', { id: 'pistaFerreiro' })], [dmgAll(3)])], { pt: '30%: relíquia lendária. 70%: o martelo não erra.', en: '30%: legendary relic. 70%: the hammer never misses.' })
      ]),
    E('portalInstavel', { pt: 'Portal Instável', en: 'Unstable Portal' },
      { pt: 'Um rasgo no ar pisca entre destinos. Cada piscada mostra um lugar diferente.', en: 'A tear in the air flickers between destinations. Each flicker shows somewhere new.' }, [
        C({ pt: 'Pular sem pensar', en: 'Jump without thinking' }, [ch(0.34, [gold(30), relic()], [ch(0.5, [fight('elite')], [dmgAll(2)])])], { pt: '34%: sala de tesouro. 33%: elite. 33%: queda feia.', en: '34%: treasure room. 33%: elite. 33%: nasty fall.' }),
        C({ pt: 'Jogar uma moeda antes', en: 'Toss a coin first' }, [gold(-1), ch(0.6, [gold(25)], [nothing()])], { pt: 'A moeda testa o destino: 60% de sala boa.', en: 'The coin tests fate: 60% good room.' }, { gold: 1 }),
        C({ pt: 'Fechar o portal', en: 'Close the portal' }, [blessNext()], { pt: 'A realidade agradece: bênção.', en: 'Reality thanks you: blessing.' })
      ]),
    E('pocaDeSorte', { pt: 'Poça de Sorte', en: 'Luck Puddle' },
      { pt: 'Uma poça reflete um céu que não existe, cheio de dados-estrelas cadentes.', en: 'A puddle reflects a sky that doesn\'t exist, full of shooting star-dice.' }, [
        C({ pt: 'Fazer um pedido', en: 'Make a wish' }, [fx('fateChoiceNext')], { pt: 'Escolha o Dado do Destino na próxima luta.', en: 'Choose the Fate Die next fight.' }),
        C({ pt: 'Beber da poça', en: 'Drink from it' }, [ch(0.5, [healAll(3)], [dmgOne(2)])], { pt: '50%: cura 3 todos. 50%: gosto de lodo.', en: '50%: heal 3 all. 50%: tastes like sludge.' })
      ]),
    E('velhoJogador', { pt: 'O Velho Jogador', en: 'The Old Gambler' },
      { pt: 'Um veterano de mil runs limpa seus dados: "Dica de velho: nunca aposte o que ama. Agora... apostemos."', en: 'A veteran of a thousand runs polishes his dice: "Old man\'s tip: never bet what you love. Now... let\'s bet."' }, [
        C({ pt: 'Par ou ímpar (10)', en: 'Odds or evens (10)' }, [gold(-10), ch(0.5, [gold(25)], [nothing()])], { pt: 'Clássico e justo.', en: 'Classic and fair.' }, { gold: 10 }),
        C({ pt: 'Ouvir as histórias', en: 'Hear his stories' }, [mod('dicaVelho')], { pt: 'Você aprende: +1 rerrolagem na próxima luta.', en: 'You learn: +1 reroll next fight.' }),
        C({ pt: 'Pedir o dado da sorte dele', en: 'Ask for his lucky die' }, [ch(0.25, [relicId('dadoAntigo')], [nothing()])], { pt: '25%: ele entrega o Dado Antigo. "Cansei de ganhar."', en: '25%: he hands over the Ancient Die. "Tired of winning."' })
      ])
  ];

  var byId = {};
  RA.data.Events.forEach(function (e) { byId[e.id] = e; });
  RA.data.EventsById = byId;
})();
