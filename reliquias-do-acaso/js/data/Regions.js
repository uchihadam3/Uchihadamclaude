// As 8 regiões da campanha. Estrutura de cada região (gerada pelo Run):
// 6 batalhas + 1 evento + 1 loja + 1 elite + 1 sala especial (mini-boss/segredo) + chefe.
(function () {
  RA.data.Regions = [
    {
      id: 'estrada', idx: 0,
      name: { pt: 'Estrada Quebrada', en: 'Broken Road' },
      desc: { pt: 'Uma estrada medieval destruída, tomada por goblins, saqueadores e lobos.', en: 'A ruined medieval road overrun by goblins, raiders and wolves.' },
      boss: 'reiGoblin', elite: 'ogroPonte', music: 'estrada',
      intro: { pt: 'A estrada para a Torre começa onde as carroças morrem.', en: 'The road to the Tower begins where the carts die.' }
    },
    {
      id: 'floresta', idx: 1,
      name: { pt: 'Floresta Podre', en: 'Rotten Forest' },
      desc: { pt: 'Árvores apodrecidas, esporos venenosos e coisas que já foram plantas.', en: 'Rotting trees, poison spores and things that used to be plants.' },
      boss: 'bruxaPantano', elite: 'entApodrecido', music: 'floresta',
      intro: { pt: 'A floresta respira. E o que respira, apodrece.', en: 'The forest breathes. And what breathes, rots.' }
    },
    {
      id: 'cripta', idx: 2,
      name: { pt: 'Cripta dos Ossos', en: 'Crypt of Bones' },
      desc: { pt: 'Corredores góticos onde os mortos jogam dados com os vivos.', en: 'Gothic halls where the dead roll dice with the living.' },
      boss: 'hidraOssos', elite: 'cavaleiroSemNome', music: 'cripta',
      intro: { pt: 'Aqui embaixo, cada osso já foi um jogador.', en: 'Down here, every bone was once a player.' }
    },
    {
      id: 'forja', idx: 3,
      name: { pt: 'Forja Infernal', en: 'Infernal Forge' },
      desc: { pt: 'Engrenagens, lava e construtos que forjam dados que ninguém deveria rolar.', en: 'Gears, lava and constructs forging dice no one should roll.' },
      boss: 'giganteForja', elite: 'colossoBronze', music: 'forja',
      intro: { pt: 'O calor daqui derrete até a sorte.', en: 'The heat here melts even luck.' }
    },
    {
      id: 'mascaras', idx: 4,
      name: { pt: 'Cidade das Máscaras', en: 'City of Masks' },
      desc: { pt: 'Uma cidade decadente onde ninguém mostra o rosto — nem os dados.', en: 'A decadent city where no one shows their face — not even the dice.' },
      boss: 'duqueMascaras', elite: 'bailarinaFacas', music: 'mascaras',
      intro: { pt: 'A valsa nunca para. Os dançarinos, às vezes.', en: 'The waltz never stops. The dancers, sometimes.' }
    },
    {
      id: 'deserto', idx: 5,
      name: { pt: 'Deserto de Vidro', en: 'Glass Desert' },
      desc: { pt: 'Areia vitrificada, miragens e um sol que não pisca.', en: 'Vitrified sand, mirages and a sun that never blinks.' },
      boss: 'rainhaMiragem', elite: 'esfingePartida', music: 'deserto',
      intro: { pt: 'Tudo aqui reflete. Nada aqui é real.', en: 'Everything here reflects. Nothing here is real.' }
    },
    {
      id: 'mar', idx: 6,
      name: { pt: 'Mar Profundo', en: 'Deep Sea' },
      desc: { pt: 'Naufrágios e criaturas que aprenderam a apostar no escuro.', en: 'Shipwrecks and creatures that learned to gamble in the dark.' },
      boss: 'oraculoAfogado', elite: 'leviataJovem', music: 'mar',
      intro: { pt: 'O mar não perdoa. Ele apenas espera.', en: 'The sea does not forgive. It only waits.' }
    },
    {
      id: 'torre', idx: 7,
      name: { pt: 'Torre do Dado Negro', en: 'Tower of the Black Die' },
      desc: { pt: 'A realidade se parte em cacos ao redor da torre onde o destino foi corrompido.', en: 'Reality shatters around the tower where fate itself was corrupted.' },
      boss: 'dadoNegro', elite: 'juizFaces', music: 'torre',
      intro: { pt: 'No topo, o Dado Negro rola. E o mundo obedece.', en: 'At the top, the Black Die rolls. And the world obeys.' }
    }
  ];
  var byId = {};
  RA.data.Regions.forEach(function (r) { byId[r.id] = r; });
  RA.data.RegionsById = byId;
})();
