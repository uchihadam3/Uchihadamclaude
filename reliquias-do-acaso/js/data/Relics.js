// Relics: 100 relíquias passivas. hook = {t:tipo, ...params} — a lógica dos
// tipos vive no Combat/Run (muitas relíquias compartilham o mesmo tipo).
(function () {
  var N = function (pt, en) { return { pt: pt, en: en }; };
  function R(id, name, rarity, desc, hook) {
    return { id: id, name: name, rarity: rarity, desc: desc, hook: hook || {} };
  }
  // raridades: comum, incomum, rara, epica, lendaria, amaldicoada

  var LIST = [
    // ===== as 50 obrigatórias =====
    R('coroaTrincada', N('Coroa Trincada', 'Cracked Crown'), 'rara', N('O primeiro herói que cairia fica com 1 HP.', 'First hero that would fall stays at 1 HP.'), { t: 'preventFirstDown' }),
    R('mesaViciada', N('Mesa Viciada', 'Rigged Table'), 'incomum', N('A 1ª rerrolagem do combate dá +1 a ataques neste turno.', 'First reroll each combat: attacks +1 that turn.'), { t: 'rerollAtkBuff', n: 1 }),
    R('ossosDaSorte', N('Ossos da Sorte', 'Lucky Bones'), 'comum', N('Inimigo morto por veneno concede 2 moedas.', 'Enemies killed by poison grant 2 gold.'), { t: 'poisonKillGold', n: 2 }),
    R('sinoSacrificio', N('Sino do Sacrifício', 'Sacrifice Bell'), 'rara', N('Quando um aliado cai, todos ganham +1 de ataque no turno.', 'When an ally falls, all gain +1 attack that turn.'), { t: 'allyDownAtkBuff', n: 1 }),
    R('luvaTrapaceiro', N('Luva do Trapaceiro', "Cheater's Glove"), 'epica', N('1x por turno, toque num dado para virá-lo ao lado oposto.', 'Once per turn, flip a die to its opposite side.'), { t: 'flipOncePerTurn' }),
    R('dadoVidro', N('Dado de Vidro', 'Glass Die'), 'amaldicoada', N('Todos causam +1 de dano e recebem +1 de dano.', 'Everyone deals +1 and takes +1 damage.'), { t: 'glassDie' }),
    R('coracaoPedra', N('Coração de Pedra', 'Stone Heart'), 'incomum', N('Escudos duram +1 turno.', 'Shields last +1 turn.'), { t: 'shieldPersist' }),
    R('livroFaces', N('Livro das Faces', 'Book of Faces'), 'lendaria', N('Após cada chefe, duplica um lado de dado à sua escolha.', 'After each boss, duplicate a die side of your choice.'), { t: 'bossDupFace' }),
    R('chaveTorre', N('Chave da Torre', 'Tower Key'), 'rara', N('Abre a sala secreta da run.', 'Opens the secret room of the run.'), { t: 'towerKey' }),
    R('medalhaoEco', N('Medalhão do Eco', 'Echo Medallion'), 'rara', N('A 1ª magia de cada combate repete com valor -1.', 'First spell each combat repeats at -1.'), { t: 'echoSpell' }),
    R('relogioPartido', N('Relógio Partido', 'Broken Clock'), 'incomum', N('O primeiro inimigo age depois dos aliados.', 'First enemy acts after your allies.'), { t: 'delayFirstEnemy' }),
    R('olhoVerde', N('Olho Verde', 'Green Eye'), 'incomum', N('Veneno aplica +1.', 'Poison applies +1.'), { t: 'poisonPlus', n: 1 }),
    R('brasaEterna', N('Brasa Eterna', 'Eternal Ember'), 'incomum', N('Queimadura dura +1 turno.', 'Burn lasts +1 turn.'), { t: 'burnLonger' }),
    R('agulhaSangue', N('Agulha de Sangue', 'Blood Needle'), 'incomum', N('Sangramento causa +1.', 'Bleed deals +1.'), { t: 'bleedPlus', n: 1 }),
    R('escamaAntiga', N('Escama Antiga', 'Ancient Scale'), 'rara', N('Reduz 1 de dano vindo de chefes.', 'Take 1 less damage from bosses.'), { t: 'bossDamageDown', n: 1 }),
    R('trombetaPequena', N('Trombeta Pequena', 'Small Trumpet'), 'comum', N('O primeiro buff do combate afeta dois aliados.', 'First buff each combat affects two allies.'), { t: 'firstBuffTwo' }),
    R('mascaraRachada', N('Máscara Rachada', 'Cracked Mask'), 'comum', N('Clones e invocações têm +1 HP.', 'Clones/summons have +1 HP.'), { t: 'summonHpPlus', n: 1 }),
    R('anelMercador', N('Anel do Mercador', "Merchant's Ring"), 'incomum', N('Lojas têm 20% de desconto.', 'Shops 20% off.'), { t: 'shopDiscount', n: 0.2 }),
    R('poteSemFundo', N('Pote Sem Fundo', 'Bottomless Pot'), 'comum', N('Curas de poção +1.', 'Potion healing +1.'), { t: 'potionPlus', n: 1 }),
    R('pedraReforco', N('Pedra de Reforço', 'Reinforcing Stone'), 'incomum', N('O 1º lado trincado usado por combate não gasta uso.', 'First cracked side used each combat costs no use.'), { t: 'crackSaver' }),
    R('facaSilencio', N('Faca do Silêncio', 'Silence Knife'), 'rara', N('O primeiro ataque do combate aplica silêncio.', 'First attack each combat applies silence.'), { t: 'firstAtkSilence' }),
    R('ampulhetaAzul', N('Ampulheta Azul', 'Blue Hourglass'), 'rara', N('Permite guardar 1 dado por combate.', 'Store 1 die per combat.'), { t: 'storeDie' }),
    R('simboloGuerra', N('Símbolo de Guerra', 'War Sigil'), 'incomum', N('3 espadas causam +3 em vez de +2.', '3 swords deal +3 instead of +2.'), { t: 'comboSwordPlus' }),
    R('simboloPaz', N('Símbolo de Paz', 'Peace Sigil'), 'incomum', N('3 corações curam +1.', '3 hearts heal +1.'), { t: 'comboHeartPlus' }),
    R('simboloMuralha', N('Símbolo de Muralha', 'Wall Sigil'), 'incomum', N('3 escudos criam barreira extra de 2.', '3 shields grant +2 barrier.'), { t: 'comboShieldPlus' }),
    R('gemaCaos', N('Gema do Caos', 'Chaos Gem'), 'amaldicoada', N('Dado do Destino tem efeito dobrado, mas também afeta inimigos.', 'Fate Die doubled, but also affects enemies.'), { t: 'chaosFate' }),
    R('runaControle', N('Runa do Controle', 'Control Rune'), 'epica', N('Escolha entre dois resultados do Dado do Destino.', 'Choose between two Fate Die results.'), { t: 'fateChoice' }),
    R('punhoGolem', N('Punho do Golem', 'Golem Fist'), 'incomum', N('Linha de frente causa +1 de dano.', 'Frontline deals +1 damage.'), { t: 'frontAtkPlus', n: 1 }),
    R('capaSombria', N('Capa Sombria', 'Shadow Cloak'), 'incomum', N('Linha de trás recebe -1 de dano.', 'Backline takes -1 damage.'), { t: 'backDefPlus', n: 1 }),
    R('sementeViva', N('Semente Viva', 'Living Seed'), 'rara', N('Cura 1 em todos após cada elite.', 'Heal all by 1 after each elite.'), { t: 'eliteHeal', n: 1 }),
    R('contratoNegro', N('Contrato Negro', 'Black Contract'), 'amaldicoada', N('Ganhe relíquia extra agora; toda batalha começa com maldição 1 num herói.', 'Extra relic now; every battle starts with curse 1 on a hero.'), { t: 'blackContract' }),
    R('reliquiaFaminta', N('Relíquia Faminta', 'Hungry Relic'), 'rara', N('Ao matar inimigo, cura 1 no herói mais ferido.', 'On kill, heal 1 on most wounded hero.'), { t: 'killHealLowest', n: 1 }),
    R('sinoDourado', N('Sino Dourado', 'Golden Bell'), 'comum', N('Combo de 5 símbolos dá 3 moedas.', '5-symbol combo grants 3 gold.'), { t: 'comboGold', n: 3 }),
    R('espelhoQuebrado', N('Espelho Quebrado', 'Broken Mirror'), 'rara', N('Status negativo recebido tem 25% de voltar ao inimigo.', 'Debuffs 25% chance to bounce back.'), { t: 'debuffReflect', n: 0.25 }),
    R('mapaManchado', N('Mapa Manchado', 'Stained Map'), 'incomum', N('Revela salas secretas no mapa.', 'Reveals secret rooms on the map.'), { t: 'revealSecrets' }),
    R('dadoAntigo', N('Dado Antigo', 'Ancient Die'), 'comum', N('Um herói aleatório começa cada combate com inspiração.', 'Random hero starts each combat inspired.'), { t: 'startInspire' }),
    R('pactoForja', N('Pacto da Forja', 'Forge Pact'), 'amaldicoada', N('Faces de ataque ganham +1, mas a loja custa +25%.', 'Attack faces +1, shops cost +25%.'), { t: 'forgePact' }),
    R('veuNevoa', N('Véu de Névoa', 'Mist Veil'), 'rara', N('O 1º ataque contra a linha de trás por combate erra.', 'First attack vs backline each combat misses.'), { t: 'backFirstMiss' }),
    R('circuloGiz', N('Círculo de Giz', 'Chalk Circle'), 'incomum', N('Invocações duram +1 turno e agem +1 vez.', 'Summons last +1 turn.'), { t: 'summonLonger' }),
    R('florOsso', N('Flor de Osso', 'Bone Flower'), 'incomum', N('Mortos-vivos recebem veneno como dano dobrado.', 'Undead take double poison damage.'), { t: 'poisonVsUndead' }),
    R('rodaBronze', N('Roda de Bronze', 'Bronze Wheel'), 'rara', N('Rerrolagem extra a cada 3 turnos.', 'Extra reroll every 3 turns.'), { t: 'rerollEvery3' }),
    R('laminaOportunista', N('Lâmina do Oportunista', 'Opportunist Blade'), 'incomum', N('Ataques contra atordoados causam +2.', 'Attacks vs stunned deal +2.'), { t: 'vsStunnedPlus', n: 2 }),
    R('brasaoCapita', N('Brasão da Capitã', "Captain's Crest"), 'comum', N('Ordens também dão escudo 1.', 'Commands also grant shield 1.'), { t: 'commandShield' }),
    R('caliceVermelho', N('Cálice Vermelho', 'Red Chalice'), 'incomum', N('Dreno cura +1.', 'Drain heals +1.'), { t: 'drainPlus', n: 1 }),
    R('frascoInstavel', N('Frasco Instável', 'Unstable Flask'), 'comum', N('Toda batalha começa com um bônus aleatório pequeno.', 'Every battle starts with a small random boon.'), { t: 'randomStartBoon' }),
    R('totemLobo', N('Totem do Lobo', 'Wolf Totem'), 'incomum', N('Invocações causam +1 de dano.', 'Summons deal +1.'), { t: 'summonDmgPlus', n: 1 }),
    R('livroProfecias', N('Livro de Profecias', 'Prophecy Book'), 'comum', N('Mostra a 1ª intenção do chefe antes da luta.', "Shows boss's first intent before the fight."), { t: 'bossPeek' }),
    R('pedraRetorno', N('Pedra de Retorno', 'Return Stone'), 'rara', N('1x por run, revisite a loja anterior.', 'Once per run, revisit the last shop.'), { t: 'returnShop' }),
    R('moedaSemFace', N('Moeda Sem Face', 'Faceless Coin'), 'incomum', N('Eventos de risco dão recompensas melhores.', 'Risky events give better rewards.'), { t: 'riskierRewards' }),
    R('denteAbismo', N('Dente do Abismo', 'Abyss Tooth'), 'amaldicoada', N('Chefes têm +10% HP, mas dão relíquia lendária extra.', 'Bosses +10% HP, but drop an extra legendary.'), { t: 'abyssTooth' }),

    // ===== +50 relíquias =====
    R('lanternaAcesa', N('Lanterna Acesa', 'Lit Lantern'), 'comum', N('O 1º dado de cada combate ganha +1.', 'First die each combat gets +1.'), { t: 'firstDiePlus', n: 1 }),
    R('luvaFerro', N('Luva de Ferro', 'Iron Glove'), 'comum', N('Contra-ataques causam +1.', 'Counters deal +1.'), { t: 'counterPlus', n: 1 }),
    R('penaLeve', N('Pena Leve', 'Light Feather'), 'comum', N('Esquiva dura +1 turno se não usada.', 'Unused dodge lasts +1 turn.'), { t: 'dodgePersist' }),
    R('elmoRachado', N('Elmo Rachado', 'Cracked Helm'), 'comum', N('O 1º dano recebido em cada combate é reduzido em 2.', 'First damage each combat reduced by 2.'), { t: 'firstDmgDown', n: 2 }),
    R('petalaBranca', N('Pétala Branca', 'White Petal'), 'comum', N('Regeneração cura +1.', 'Regen heals +1.'), { t: 'regenPlus', n: 1 }),
    R('anzolTorto', N('Anzol Torto', 'Bent Hook'), 'comum', N('+1 moeda por batalha vencida.', '+1 gold per battle won.'), { t: 'goldPerWin', n: 1 }),
    R('apitoCao', N('Apito de Cão', 'Dog Whistle'), 'comum', N('Sua 1ª invocação por combate age imediatamente.', 'Your first summon acts immediately.'), { t: 'summonActNow' }),
    R('velaTorta', N('Vela Torta', 'Crooked Candle'), 'comum', N('Vendo a intenção: inimigos marcados mostram o valor exato.', 'Marked enemies show exact intent values.'), { t: 'markedIntentDetail' }),
    R('cintaCouro', N('Cinta de Couro', 'Leather Belt'), 'comum', N('+2 HP máximo para heróis da linha de frente.', 'Frontline heroes +2 max HP.'), { t: 'frontHpPlus', n: 2 }),
    R('oculosLupa', N('Óculos-Lupa', 'Loupe Glasses'), 'comum', N('Tooltips mostram dano final calculado.', 'Tooltips show final calculated damage.'), { t: 'calcTooltips' }),
    R('bolsaDupla', N('Bolsa Dupla', 'Double Pouch'), 'incomum', N('Recompensas de moeda +25%.', 'Gold rewards +25%.'), { t: 'goldPlus', n: 0.25 }),
    R('bandeiraRasgada', N('Bandeira Rasgada', 'Torn Banner'), 'incomum', N('Com 3+ heróis na frente, todos na frente ganham escudo 1 no 1º turno.', 'With 3+ in front, they gain shield 1 on turn 1.'), { t: 'frontFormation' }),
    R('licorAmargo', N('Licor Amargo', 'Bitter Liquor'), 'incomum', N('Curas em si mesmo +1.', 'Self-healing +1.'), { t: 'selfHealPlus', n: 1 }),
    R('dadoDeChumbo', N('Dado de Chumbo', 'Lead Die'), 'incomum', N('Dados travados não podem ser afetados por inimigos.', 'Locked dice cannot be affected by enemies.'), { t: 'lockedProtected' }),
    R('mochilaFunda', N('Mochila Funda', 'Deep Backpack'), 'incomum', N('Pode segurar 2 Faces Rúnicas extras para depois.', 'Hold 2 extra Runic Faces for later.'), { t: 'faceStorage', n: 2 }),
    R('tocaCoruja', N('Toca de Coruja', 'Owl Hood'), 'incomum', N('Cegueira não afeta seus heróis.', 'Your heroes ignore blind.'), { t: 'immuneBlind' }),
    R('grilhaoQuebrado', N('Grilhão Quebrado', 'Broken Shackle'), 'incomum', N('Corrente não afeta seus heróis.', 'Your heroes ignore chained.'), { t: 'immuneChain' }),
    R('cornetaGuerra', N('Corneta de Guerra', 'War Horn'), 'incomum', N('Turno 1: todos os ataques causam +1.', 'Turn 1: all attacks +1.'), { t: 'turn1Atk', n: 1 }),
    R('espinhoRosa', N('Espinho de Rosa', 'Rose Thorn'), 'incomum', N('Ao ser atacado na frente, aplica sangramento 1 no atacante.', 'Front heroes apply bleed 1 to attackers.'), { t: 'frontThorns' }),
    R('lampiaoAzul', N('Lampião Azul', 'Blue Lamp'), 'incomum', N('Magias custam 1 a menos de carga.', 'Spells cost 1 less charge.'), { t: 'chargeCostDown' }),
    R('luneta', N('Luneta', 'Spyglass'), 'incomum', N('Vê a próxima sala do mapa em detalhe.', 'Preview next room in detail.'), { t: 'mapPeek' }),
    R('remedioCaseiro', N('Remédio Caseiro', 'Home Remedy'), 'incomum', N('Ao fim da batalha, remove todos os status negativos.', 'After battle, cleanse all debuffs.'), { t: 'postFightCleanse' }),
    R('dedalOuro', N('Dedal de Ouro', 'Gold Thimble'), 'rara', N('1x por combate: o 1º dado que sair 1 vira 4.', 'Once per combat: first die showing 1 becomes 4.'), { t: 'oneToFour' }),
    R('coracaoCorvo', N('Coração de Corvo', 'Crow Heart'), 'rara', N('Maldição que você aplica +1.', 'Your curses apply +1.'), { t: 'cursePlus', n: 1 }),
    R('tamborProfundo', N('Tambor Profundo', 'Deep Drum'), 'rara', N('A cada 3 dados usados, o próximo ganha +1.', 'Every 3 dice used, next gets +1.'), { t: 'drumBeat' }),
    R('esporaPrata', N('Espora de Prata', 'Silver Spur'), 'rara', N('O 1º herói a agir cada turno ganha +1 no dado.', 'First hero to act each turn: die +1.'), { t: 'firstActPlus' }),
    R('cristalGelo', N('Cristal de Gelo', 'Ice Crystal'), 'rara', N('Congelado que você aplica também reduz ataque em 1.', 'Your freeze also lowers attack by 1.'), { t: 'freezeWeakens' }),
    R('ampolaVerde', N('Ampola Verde', 'Green Vial'), 'rara', N('Veneno não decai no primeiro turno.', "Poison doesn't decay on its first turn."), { t: 'poisonSticky' }),
    R('manoplaTroca', N('Manopla da Troca', 'Swap Gauntlet'), 'rara', N('1x por turno: troque os resultados de dois dados aliados.', 'Once per turn: swap two allied dice results.'), { t: 'swapOncePerTurn' }),
    R('idoloPeixe', N('Ídolo-Peixe', 'Fish Idol'), 'rara', N('Ao vencer sem heróis caídos, +4 moedas.', 'Win with no downed heroes: +4 gold.'), { t: 'cleanWinGold', n: 4 }),
    R('lanternaVaga', N('Lanterna Vaga', 'Wisp Lantern'), 'rara', N('Inimigos invocados nascem com vulnerável 1.', 'Enemy summons spawn with vulnerable 1.'), { t: 'enemySummonVuln' }),
    R('placaBronze', N('Placa de Bronze', 'Bronze Plate'), 'rara', N('Heróis com escudo causam +1 de dano.', 'Shielded heroes deal +1.'), { t: 'shieldedAtkPlus' }),
    R('agulhaOuro', N('Agulha de Ouro', 'Golden Needle'), 'epica', N('A 1ª cura de cada combate também dá escudo igual.', 'First heal each combat also grants equal shield.'), { t: 'healShields' }),
    R('anelDuplo', N('Anel Duplo', 'Double Ring'), 'epica', N('O 1º combo do combate ativa duas vezes.', 'First combo each combat triggers twice.'), { t: 'comboTwice' }),
    R('cuboMemoria', N('Cubo da Memória', 'Memory Cube'), 'epica', N('1x por combate: repita o último dado usado.', 'Once per combat: repeat last die used.'), { t: 'memoryRepeat' }),
    R('manteloEstrelas', N('Manto de Estrelas', 'Starry Mantle'), 'epica', N('Heróis da linha de trás começam com inspiração.', 'Backline heroes start inspired.'), { t: 'backStartInspire' }),
    R('tridenteCoral', N('Tridente de Coral', 'Coral Trident'), 'epica', N('Dano em área atinge +1 vez um alvo aleatório.', 'AoE hits one extra random target.'), { t: 'aoeExtra' }),
    R('olhoDourado', N('Olho Dourado', 'Golden Eye'), 'epica', N('Todo turno, um inimigo aleatório é marcado.', 'Each turn a random enemy is marked.'), { t: 'autoMark' }),
    R('cetroReverso', N('Cetro Reverso', 'Reverse Scepter'), 'epica', N('Fraco em inimigos também os faz receber +1 de dano.', 'Weak on enemies also makes them take +1.'), { t: 'weakAmp' }),
    R('martinete', N('Martinete', 'Pile Driver'), 'epica', N('Quebrar todo o escudo de um inimigo o atordoa.', "Breaking an enemy's full shield stuns it."), { t: 'shieldBreakStun' }),
    R('reliquiaPrimeira', N('Relíquia Primeira', 'First Relic'), 'lendaria', N('+1 rerrolagem máxima por turno.', '+1 max reroll per turn.'), { t: 'maxRollPlus', n: 1 }),
    R('dadoBranco', N('Dado Branco', 'White Die'), 'lendaria', N('1x por combate, escolha o resultado de um dado.', 'Once per combat, choose a die result.'), { t: 'chooseResult' }),
    R('coroaViva', N('Coroa Viva', 'Living Crown'), 'lendaria', N('Heróis caídos revivem com 2 HP após 1 turno.', 'Downed heroes revive at 2 HP after 1 turn.'), { t: 'autoRevive' }),
    R('grimorioSemFim', N('Grimório Sem Fim', 'Endless Grimoire'), 'lendaria', N('Eco Arcano acontece toda batalha (1ª magia repete).', 'Arcane Echo every battle.'), { t: 'alwaysEcho' }),
    R('martePrimeiraFace', N('Martelo da Primeira Face', 'First Face Hammer'), 'lendaria', N('Faces Rúnicas aplicadas ganham +1 de valor.', 'Applied Runic Faces get +1 value.'), { t: 'faceForgePlus' }),
    R('dadoInocente', N('Dado Inocente', 'Innocent Die'), 'lendaria', N('Resultados 1 contam como 3.', 'Results of 1 count as 3.'), { t: 'innocentDie' }),
    R('vidroValente', N('Vidro Valente', 'Brave Glass'), 'lendaria', N('Lados trincados causam +2 e nunca quebram de vez.', 'Cracked sides deal +2 and never fully break.'), { t: 'braveGlass' }),
    R('muralhaViva', N('Muralha Viva', 'Living Wall'), 'lendaria', N('Todo turno, o herói mais ferido ganha escudo 2.', 'Each turn, most wounded hero gains shield 2.'), { t: 'livingWall' }),
    R('anelMeiaNoite', N('Anel da Meia-Noite', 'Midnight Ring'), 'amaldicoada', N('+2 de dano com caveiras; heróis começam com -1 HP máx.', 'Skull faces +2; heroes -1 max HP.'), { t: 'midnightRing' }),
    R('coracaoFaminto', N('Coração Faminto', 'Hungry Heart'), 'amaldicoada', N('Dreno +2, mas curas normais -1.', 'Drain +2, normal heals -1.'), { t: 'hungryHeart' })
  ];

  var byId = {};
  LIST.forEach(function (r) { byId[r.id] = r; });

  RA.data.Relics = {
    list: LIST, byId: byId,
    byRarity: function (rar) { return LIST.filter(function (r) { return r.rarity === rar; }); },
    roll: function (rng, opts) {
      opts = opts || {};
      var pool = LIST.filter(function (r) {
        if (opts.exclude && opts.exclude.indexOf(r.id) >= 0) return false;
        if (opts.rarity) return r.rarity === opts.rarity;
        if (!opts.cursed && r.rarity === 'amaldicoada') return rng.chance(0.25);
        return true;
      });
      return rng.pick(pool);
    }
  };
})();
