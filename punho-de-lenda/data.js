/* ========================================================================
   PUNHO DE LENDA — dados: estilos, confronto, habilidades, lutadores (reais,
   com notas de JOGO inventadas + caricatura cartunesca), torneios.
   Atributos 0-99. Médias: ATAQUE, DEFESA, GERAL.
   ===================================================================== */
const DATA = (() => {
  // rng seeded (estável por lutador)
  function rng(seed){ let s=(seed>>>0)||1; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return ((s>>>0)%100000)/100000; }; }
  function hash(str){ let h=2166136261; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }

  /* ---- atributos (12) em 3 grupos ---- */
  const OFF=['forca','velocidade','tecnica','precisao'];
  const DEF=['guarda','queixo','reflexo','esquiva'];
  const PHY=['folego','agilidade','qi','coracao'];
  const ALL=[...OFF,...DEF,...PHY];
  const ATTR_NAME={ forca:'Força', velocidade:'Velocidade', tecnica:'Técnica', precisao:'Precisão',
    guarda:'Guarda', queixo:'Queixo', reflexo:'Reflexo', esquiva:'Esquiva',
    folego:'Fôlego', agilidade:'Agilidade', qi:'QI de Luta', coracao:'Coração' };

  /* ---- estilos ---- */
  const STYLES = {
    boxe:      { name:'Boxe',        em:'👊', range:'perto',  bias:{velocidade:6,precisao:6,reflexo:6,esquiva:4,folego:3,tecnica:2}, gear:{gloves:1} },
    muaythai:  { name:'Muay Thai',   em:'🇹🇭', range:'clinch', bias:{forca:5,folego:6,tecnica:4,queixo:5,precisao:3}, gear:{gear:'mongkol',gloves:1} },
    kickboxing:{ name:'Kickboxing',  em:'🥊', range:'medio',  bias:{forca:5,precisao:6,tecnica:5,velocidade:3,guarda:3}, gear:{gloves:1} },
    karate:    { name:'Karatê',      em:'🥋', range:'medio',  bias:{tecnica:6,agilidade:6,reflexo:5,precisao:4,esquiva:4}, gear:{gear:'hachimaki',collar:'gi',beltCol:'#111'} },
    taekwondo: { name:'Taekwondo',   em:'🦵', range:'longe',  bias:{velocidade:6,agilidade:7,tecnica:4,reflexo:4,forca:2}, gear:{collar:'gi',beltCol:'#c0392b'} },
    kungfu:    { name:'Kung Fu',     em:'🐉', range:'medio',  bias:{agilidade:6,tecnica:5,esquiva:5,qi:4,forca:2}, gear:{} },
    jiujitsu:  { name:'Jiu-Jitsu',   em:'🥋', range:'chao',   bias:{tecnica:7,qi:6,folego:5,coracao:4,forca:3}, gear:{collar:'gi',beltCol:'#111'} },
    mma:       { name:'MMA',         em:'🏆', range:'todos',  bias:{forca:4,tecnica:4,folego:4,queixo:3,qi:4,precisao:3}, gear:{} },
  };
  const STYLE_LIST = Object.keys(STYLES);

  /* ---- CONFRONTO DE ESTILOS: MU[A][B] = modificador na eficácia de A vs B ---- */
  const MU = {
    boxe:      { muaythai:-.06, taekwondo:+.06, karate:+.05, kungfu:+.04, jiujitsu:-.07, mma:-.03, kickboxing:-.02 },
    muaythai:  { boxe:+.06, kickboxing:+.03, taekwondo:+.05, karate:+.04, kungfu:+.03, jiujitsu:-.06, mma:-.02 },
    kickboxing:{ boxe:+.02, taekwondo:+.05, karate:+.03, kungfu:+.03, jiujitsu:-.06, mma:-.02, muaythai:-.03 },
    karate:    { taekwondo:+.03, kungfu:+.02, boxe:-.05, muaythai:-.04, jiujitsu:-.06, mma:-.03, kickboxing:-.03 },
    taekwondo: { karate:+.02, kungfu:+.02, boxe:-.06, muaythai:-.05, kickboxing:-.05, jiujitsu:-.07, mma:-.04 },
    kungfu:    { taekwondo:+.02, karate:+.02, boxe:-.04, muaythai:-.03, jiujitsu:-.04, mma:-.03, kickboxing:-.03 },
    jiujitsu:  { boxe:+.09, muaythai:+.07, kickboxing:+.08, karate:+.08, taekwondo:+.09, kungfu:+.06, mma:-.04 },
    mma:       { boxe:+.05, muaythai:+.04, kickboxing:+.05, karate:+.06, taekwondo:+.07, kungfu:+.06, jiujitsu:+.03 },
  };
  function matchup(a,b){ return (MU[a]&&MU[a][b])||0; }

  /* ---- habilidades (o sim usa as tags) ---- */
  const ABIL = {
    nocauteador:  { n:'Nocauteador',      d:'Chance de nocaute muito maior nos golpes limpos de poder.' },
    maos_rapidas: { n:'Mãos Rápidas',     d:'Encaixa combinações extras — mais golpes por troca.' },
    contragolpe:  { n:'Contragolpe',      d:'Pune quem erra: dano extra em cima do ataque falho do rival.' },
    queixo_ferro: { n:'Queixo de Ferro',  d:'Resiste a quedas e nocautes; aguenta o que ninguém aguenta.' },
    faro_final:   { n:'Faro de Finalização',d:'Vai pra cima e causa muito mais dano em rival machucado.' },
    gas_infinito: { n:'Gás Infinito',     d:'Fôlego dura muito mais; não afunda nos rounds finais.' },
    rei_clinch:   { n:'Rei do Clinch',    d:'Domina a distância curta: joelhadas, cotovelos e desgaste.' },
    rasteira:     { n:'Quedas',           d:'Leva a luta ao chão à vontade, anulando o trocação do rival.' },
    guarda_ferro: { n:'Jogo de Chão',     d:'Ameaça de finalização brutal quando a luta vai ao solo.' },
    danca:        { n:'Dança',            d:'Movimentação superior: esquiva de trocas e controla o ringue.' },
    espirito:     { n:'Coração de Leão',  d:'Reage quando está perdendo ou machucado — vira lutas.' },
    pressao:      { n:'Pressão',          d:'Impõe o ritmo e drena o fôlego do adversário.' },
    chute_giratorio:{ n:'Chute Giratório',d:'Golpes rodados espetaculares: alto dano, alta variância.' },
    veterano:     { n:'Veterano',         d:'Leitura de luta impecável: administra rounds e placar.' },
    imprevisivel: { n:'Imprevisível',     d:'Ângulos estranhos: aumenta a variância a seu favor.' },
  };

  /* ---- ROSTER (lutadores reais — notas de jogo + caricatura) ----
     f: highs (atributos fortes), l: lows. spec = retrato. ab = habilidades. */
  const R = [];
  const add=(o)=>{ R.push(o); };
  // ---------- BOXE ----------
  add({ id:'tyson', name:'Mike Tyson', style:'boxe', pais:'🇺🇸', rar:'muitoforte',
    f:['forca','velocidade','queixo'], l:['esquiva'], ab:['nocauteador','maos_rapidas','pressao','faro_final'],
    spec:{skin:'#5a3826',hair:'#0e0a08',hairStyle:'buzz',beard:'none',nose:'flat',eyes:'#1a0f08',expr:'intense',phys:0.95,gap:1,gloveCol:'#111',shirt:'#101014',rim:'#ff8a5a'} });
  add({ id:'ali', name:'Muhammad Ali', style:'boxe', pais:'🇺🇸', rar:'lenda',
    f:['velocidade','tecnica','esquiva','qi','coracao'], l:['forca'], ab:['danca','veterano','maos_rapidas','espirito','imprevisivel'],
    spec:{skin:'#7a4a30',hair:'#161010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'smirk',phys:0.62,gloveCol:'#b01e1e',shirt:'#e8e8e2'} });
  add({ id:'mayweather', name:'Floyd Mayweather', style:'boxe', pais:'🇺🇸', rar:'lenda',
    f:['esquiva','reflexo','guarda','qi','precisao'], l:['forca'], ab:['contragolpe','danca','veterano','maos_rapidas','gas_infinito'],
    spec:{skin:'#6a4028',hair:'#0e0a08',hairStyle:'slick',beard:'mustache',eyes:'#1a0f08',expr:'smirk',phys:0.55,gloveCol:'#d4a017',shirt:'#20202a'} });
  add({ id:'canelo', name:'Canelo Álvarez', style:'boxe', pais:'🇲🇽', rar:'muitoforte',
    f:['forca','precisao','queixo','tecnica'], l:['agilidade'], ab:['contragolpe','nocauteador','queixo_ferro','faro_final'],
    spec:{skin:'#e0b48c',hair:'#b5561f',hairStyle:'short',beard:'full',eyes:'#4a6a3a',expr:'intense',phys:0.72,gloveCol:'#b01e1e',shirt:'#7a1010'} });
  add({ id:'pacquiao', name:'Manny Pacquiao', style:'boxe', pais:'🇵🇭', rar:'muitoforte',
    f:['velocidade','agilidade','forca','coracao'], l:['queixo'], ab:['maos_rapidas','pressao','nocauteador','espirito'],
    spec:{skin:'#b07a4a',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'intense',phys:0.6,gloveCol:'#c8b060',shirt:'#0a3a7a'} });
  // ---------- MUAY THAI ----------
  add({ id:'saenchai', name:'Saenchai', style:'muaythai', pais:'🇹🇭', rar:'lenda',
    f:['tecnica','qi','esquiva','velocidade'], l:['forca'], ab:['rei_clinch','imprevisivel','veterano','danca','chute_giratorio'],
    spec:{skin:'#b07a4a',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'smirk',phys:0.5,gearCol:'#c0392b',shirt:'#8a1010'} });
  add({ id:'buakaw', name:'Buakaw Banchamek', style:'muaythai', pais:'🇹🇭', rar:'muitoforte',
    f:['forca','folego','precisao','queixo'], l:['esquiva'], ab:['pressao','gas_infinito','nocauteador','rei_clinch'],
    spec:{skin:'#a87244',hair:'#100c0a',hairStyle:'buzz',beard:'none',eyes:'#1a0f08',expr:'intense',phys:0.82,gearCol:'#c8b060',shirt:'#141018'} });
  add({ id:'rodtang', name:'Rodtang Jitmuangnon', style:'muaythai', pais:'🇹🇭', rar:'forte',
    f:['queixo','forca','folego','coracao'], l:['esquiva'], ab:['queixo_ferro','pressao','espirito'],
    spec:{skin:'#a87244',hair:'#100c0a',hairStyle:'top',beard:'none',eyes:'#1a0f08',expr:'smirk',phys:0.7,gearCol:'#c0392b',shirt:'#7a1010'} });
  add({ id:'samart', name:'Samart Payakaroon', style:'muaythai', pais:'🇹🇭', rar:'lenda',
    f:['tecnica','precisao','qi','velocidade'], l:['forca'], ab:['contragolpe','veterano','rei_clinch','maos_rapidas','danca'],
    spec:{skin:'#b07a4a',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'calm',phys:0.55,gearCol:'#c8b060',shirt:'#123a7a'} });
  add({ id:'dieselnoi', name:'Dieselnoi', style:'muaythai', pais:'🇹🇭', rar:'muitoforte',
    f:['forca','folego','tecnica','coracao'], l:['velocidade'], ab:['rei_clinch','pressao','gas_infinito','faro_final'],
    spec:{skin:'#a87244',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#1a0f08',expr:'intense',phys:0.78,gearCol:'#c0392b',shirt:'#3a1a5a'} });
  // ---------- KICKBOXING ----------
  add({ id:'hoost', name:'Ernesto Hoost', style:'kickboxing', pais:'🇳🇱', rar:'lenda',
    f:['tecnica','precisao','qi','guarda'], l:['agilidade'], ab:['veterano','contragolpe','nocauteador','gas_infinito','danca'],
    spec:{skin:'#4a3020',hair:'#0a0a0a',hairStyle:'bald',beard:'stubble',eyes:'#160c08',expr:'calm',phys:0.72,gloveCol:'#c00',shirt:'#101014'} });
  add({ id:'schilt', name:'Semmy Schilt', style:'kickboxing', pais:'🇳🇱', rar:'muitoforte',
    f:['forca','precisao','guarda','queixo'], l:['agilidade'], ab:['nocauteador','queixo_ferro','pressao','faro_final'],
    spec:{skin:'#e0c0a0',hair:'#3a2a1a',hairStyle:'bald',beard:'stubble',eyes:'#3a2a1a',expr:'calm',phys:1.0,face:'long',shirt:'#20202a',gloveCol:'#333'} });
  add({ id:'petrosyan', name:'Giorgio Petrosyan', style:'kickboxing', pais:'🇮🇹', rar:'lenda',
    f:['tecnica','reflexo','esquiva','qi'], l:['forca'], ab:['contragolpe','danca','veterano','maos_rapidas','gas_infinito'],
    spec:{skin:'#c88a5a',hair:'#141010',hairStyle:'short',beard:'stubble',eyes:'#241610',expr:'calm',phys:0.58,gloveCol:'#c00',shirt:'#0a2a5a'} });
  add({ id:'badrhari', name:'Badr Hari', style:'kickboxing', pais:'🇲🇦', rar:'forte',
    f:['forca','velocidade','precisao'], l:['qi'], ab:['nocauteador','pressao','maos_rapidas','imprevisivel'],
    spec:{skin:'#b07a4a',hair:'#100c0a',hairStyle:'short',beard:'stubble',eyes:'#1a0f08',expr:'intense',phys:0.85,gloveCol:'#111',shirt:'#101014'} });
  add({ id:'aerts', name:'Peter Aerts', style:'kickboxing', pais:'🇳🇱', rar:'muitoforte',
    f:['forca','precisao','queixo','coracao'], l:['esquiva'], ab:['nocauteador','faro_final','veterano','queixo_ferro'],
    spec:{skin:'#e0c0a0',hair:'#2a1c12',hairStyle:'short',beard:'none',eyes:'#3a2a1a',expr:'intense',phys:0.82,gloveCol:'#c00',shirt:'#7a1010'} });
  // ---------- KARATÊ ----------
  add({ id:'andyhug', name:'Andy Hug', style:'karate', pais:'🇨🇭', rar:'lenda',
    f:['tecnica','forca','agilidade','coracao'], l:['guarda'], ab:['chute_giratorio','espirito','veterano','pressao','imprevisivel'],
    spec:{skin:'#d8b088',hair:'#2a1c12',hairStyle:'mullet',beard:'none',eyes:'#3a2a1a',expr:'intense',phys:0.7,gear:'hachimaki',gearCol:'#fff',collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'machida', name:'Lyoto Machida', style:'karate', pais:'🇧🇷', rar:'muitoforte',
    f:['esquiva','reflexo','tecnica','qi','precisao'], l:['forca'], ab:['contragolpe','danca','imprevisivel','faro_final'],
    spec:{skin:'#d0a878',hair:'#100c0a',hairStyle:'short',beard:'none',eyes:'#1a0f08',expr:'calm',phys:0.6,gear:'hachimaki',gearCol:'#fff',collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'aghayev', name:'Rafael Aghayev', style:'karate', pais:'🇦🇿', rar:'forte',
    f:['velocidade','agilidade','tecnica','reflexo'], l:['forca'], ab:['maos_rapidas','danca','veterano'],
    spec:{skin:'#d8b088',hair:'#141010',hairStyle:'short',beard:'stubble',eyes:'#241610',expr:'intense',phys:0.55,gear:'hachimaki',gearCol:'#c0392b',collar:'gi',beltCol:'#c0392b',shirt:'#e8e8e2'} });
  add({ id:'filho', name:'Francisco Filho', style:'karate', pais:'🇧🇷', rar:'forte',
    f:['forca','queixo','coracao','folego'], l:['esquiva'], ab:['nocauteador','queixo_ferro','espirito'],
    spec:{skin:'#c89060',hair:'#141010',hairStyle:'buzz',beard:'none',eyes:'#1a0f08',expr:'intense',phys:0.8,gear:'hachimaki',gearCol:'#fff',collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'yamaki', name:'Kenji Yamaki', style:'karate', pais:'🇯🇵', rar:'medio',
    f:['queixo','folego','coracao'], l:['velocidade'], ab:['queixo_ferro','espirito'],
    spec:{skin:'#e6c29a',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'calm',phys:0.72,gear:'hachimaki',gearCol:'#fff',collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  // ---------- TAEKWONDO ----------
  add({ id:'slopez', name:'Steven López', style:'taekwondo', pais:'🇺🇸', rar:'lenda',
    f:['velocidade','tecnica','qi','agilidade'], l:['forca'], ab:['chute_giratorio','veterano','danca','maos_rapidas','imprevisivel'],
    spec:{skin:'#c08858',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'calm',phys:0.6,collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'hadisaei', name:'Hadi Saei', style:'taekwondo', pais:'🇮🇷', rar:'muitoforte',
    f:['tecnica','precisao','qi','reflexo'], l:['forca'], ab:['contragolpe','veterano','chute_giratorio','danca'],
    spec:{skin:'#c88a5a',hair:'#141010',hairStyle:'short',beard:'stubble',eyes:'#241610',expr:'intense',phys:0.58,collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'moon', name:'Moon Dae-sung', style:'taekwondo', pais:'🇰🇷', rar:'forte',
    f:['forca','agilidade','velocidade'], l:['guarda'], ab:['chute_giratorio','nocauteador','faro_final'],
    spec:{skin:'#e6c29a',hair:'#100c0a',hairStyle:'short',beard:'none',eyes:'#1a0f08',expr:'intense',phys:0.68,collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'servet', name:'Servet Tazegül', style:'taekwondo', pais:'🇹🇷', rar:'forte',
    f:['velocidade','reflexo','agilidade'], l:['forca'], ab:['danca','maos_rapidas','contragolpe'],
    spec:{skin:'#d0a878',hair:'#141010',hairStyle:'short',beard:'stubble',eyes:'#241610',expr:'smirk',phys:0.55,collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'aaroncook', name:'Aaron Cook', style:'taekwondo', pais:'🇬🇧', rar:'medio',
    f:['agilidade','velocidade'], l:['forca'], ab:['chute_giratorio','danca'],
    spec:{skin:'#e6c29a',hair:'#2a1c12',hairStyle:'short',beard:'none',eyes:'#3a2a1a',expr:'calm',phys:0.55,collar:'gi',beltCol:'#c0392b',shirt:'#e8e8e2'} });
  // ---------- KUNG FU / SANDA ----------
  add({ id:'cungle', name:'Cung Le', style:'kungfu', pais:'🇻🇳', rar:'muitoforte',
    f:['agilidade','forca','tecnica','velocidade'], l:['queixo'], ab:['chute_giratorio','rasteira','imprevisivel','faro_final'],
    spec:{skin:'#d0a878',hair:'#100c0a',hairStyle:'short',beard:'none',eyes:'#1a0f08',expr:'intense',phys:0.72,shirt:'#7a1010'} });
  add({ id:'salikhov', name:'Muslim Salikhov', style:'kungfu', pais:'🇷🇺', rar:'forte',
    f:['forca','tecnica','precisao'], l:['esquiva'], ab:['chute_giratorio','nocauteador','contragolpe'],
    spec:{skin:'#c88a5a',hair:'#141010',hairStyle:'short',beard:'full',eyes:'#241610',expr:'intense',phys:0.75,shirt:'#141018'} });
  add({ id:'yilong', name:'Yi Long', style:'kungfu', pais:'🇨🇳', rar:'medio',
    f:['queixo','coracao','folego'], l:['tecnica'], ab:['queixo_ferro','espirito','pressao'],
    spec:{skin:'#e6c29a',hair:'#0a0a0a',hairStyle:'bald',beard:'none',eyes:'#1a0f08',expr:'calm',phys:0.7,shirt:'#c8a017'} });
  add({ id:'kangle', name:'Kang Le', style:'kungfu', pais:'🇨🇳', rar:'forte',
    f:['tecnica','agilidade','velocidade'], l:['forca'], ab:['rasteira','danca','contragolpe'],
    spec:{skin:'#e6c29a',hair:'#141010',hairStyle:'short',beard:'none',eyes:'#241610',expr:'calm',phys:0.6,shirt:'#7a1010'} });
  add({ id:'baoligao', name:'Bao Ligao', style:'kungfu', pais:'🇨🇳', rar:'medio',
    f:['forca','folego'], l:['esquiva'], ab:['pressao','chute_giratorio'],
    spec:{skin:'#e0bc94',hair:'#141010',hairStyle:'buzz',beard:'none',eyes:'#241610',expr:'intense',phys:0.68,shirt:'#3a1a5a'} });
  // ---------- JIU-JITSU ----------
  add({ id:'rickson', name:'Rickson Gracie', style:'jiujitsu', pais:'🇧🇷', rar:'lenda',
    f:['tecnica','qi','coracao','folego'], l:['velocidade'], ab:['guarda_ferro','rasteira','veterano','espirito','gas_infinito'],
    spec:{skin:'#d8b088',hair:'#8a8078',hairStyle:'short',beard:'none',eyes:'#3a2a1a',expr:'calm',age:0.55,phys:0.68,collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'rogergracie', name:'Roger Gracie', style:'jiujitsu', pais:'🇧🇷', rar:'lenda',
    f:['tecnica','qi','folego','coracao'], l:['velocidade'], ab:['guarda_ferro','rasteira','veterano','faro_final','gas_infinito'],
    spec:{skin:'#e0c0a0',hair:'#2a1c12',hairStyle:'short',beard:'none',eyes:'#3a2a1a',expr:'calm',phys:0.7,face:'long',collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'marcelogarcia', name:'Marcelo Garcia', style:'jiujitsu', pais:'🇧🇷', rar:'muitoforte',
    f:['tecnica','agilidade','qi','coracao'], l:['forca'], ab:['guarda_ferro','rasteira','imprevisivel','espirito'],
    spec:{skin:'#e0bc94',hair:'#2a1c12',hairStyle:'short',beard:'none',eyes:'#3a2a1a',expr:'smirk',phys:0.45,collar:'gi',beltCol:'#111',shirt:'#0a3a7a'} });
  add({ id:'buchecha', name:'Marcus Buchecha', style:'jiujitsu', pais:'🇧🇷', rar:'muitoforte',
    f:['forca','tecnica','queixo','folego'], l:['velocidade'], ab:['guarda_ferro','rasteira','pressao','faro_final'],
    spec:{skin:'#d8b088',hair:'#1a1210',hairStyle:'short',beard:'full',eyes:'#241610',expr:'calm',phys:0.85,collar:'gi',beltCol:'#111',shirt:'#e8e8e2'} });
  add({ id:'gordonryan', name:'Gordon Ryan', style:'jiujitsu', pais:'🇺🇸', rar:'forte',
    f:['tecnica','qi','coracao','forca'], l:['velocidade'], ab:['guarda_ferro','rasteira','veterano','imprevisivel'],
    spec:{skin:'#e6c8a4',hair:'#3a2a1a',hairStyle:'short',beard:'full',eyes:'#4a5a6a',expr:'smirk',phys:0.72,collar:'gi',beltCol:'#111',shirt:'#101014'} });
  // ---------- MMA / VALE-TUDO ----------
  add({ id:'anderson', name:'Anderson Silva', style:'mma', pais:'🇧🇷', rar:'lenda',
    f:['tecnica','precisao','velocidade','reflexo','qi'], l:['coracao'], ab:['nocauteador','contragolpe','danca','imprevisivel','faro_final'],
    spec:{skin:'#8a5a3a',hair:'#0a0a0a',hairStyle:'bald',beard:'goatee',eyes:'#160c08',expr:'smirk',phys:0.6,face:'long',shirt:'#141018'} });
  add({ id:'khabib', name:'Khabib Nurmagomedov', style:'mma', pais:'🇷🇺', rar:'lenda',
    f:['forca','folego','coracao','queixo','qi'], l:['esquiva'], ab:['rasteira','pressao','gas_infinito','guarda_ferro','espirito'],
    spec:{skin:'#c88a5a',hair:'#141010',hairStyle:'short',beard:'full',eyes:'#241610',expr:'intense',phys:0.8,gear:'papakha',gearCol:'#2a2a2a',shirt:'#101014'} });
  add({ id:'jonjones', name:'Jon Jones', style:'mma', pais:'🇺🇸', rar:'lenda',
    f:['tecnica','precisao','qi','velocidade'], l:['queixo'], ab:['rasteira','imprevisivel','veterano','faro_final','danca'],
    spec:{skin:'#8a5a3a',hair:'#0e0a08',hairStyle:'corn',beard:'stubble',eyes:'#160c08',expr:'calm',phys:0.68,face:'long',shirt:'#101014'} });
  add({ id:'fedor', name:'Fedor Emelianenko', style:'mma', pais:'🇷🇺', rar:'lenda',
    f:['forca','queixo','coracao','qi'], l:['agilidade'], ab:['nocauteador','queixo_ferro','rasteira','espirito','gas_infinito'],
    spec:{skin:'#e0bc94',hair:'#8a6a4a',hairStyle:'short',beard:'none',eyes:'#4a6a8a',expr:'calm',phys:0.8,shirt:'#7a1010'} });
  add({ id:'aldo', name:'José Aldo', style:'mma', pais:'🇧🇷', rar:'muitoforte',
    f:['forca','velocidade','precisao','tecnica'], l:['folego'], ab:['nocauteador','contragolpe','pressao','faro_final'],
    spec:{skin:'#a06a44',hair:'#141010',hairStyle:'short',beard:'stubble',eyes:'#1a0f08',expr:'intense',phys:0.7,shirt:'#0a5a3a'} });
  add({ id:'nunes', name:'Amanda Nunes', style:'mma', pais:'🇧🇷', rar:'muitoforte',
    f:['forca','velocidade','precisao','coracao'], l:['esquiva'], ab:['nocauteador','pressao','faro_final','maos_rapidas'],
    spec:{skin:'#a06a44',hair:'#141010',hairStyle:'top',beard:'none',eyes:'#1a0f08',expr:'intense',phys:0.68,shirt:'#7a1010'} });

  /* ---- geração dos 12 atributos por lutador ---- */
  const RAR = { fraco:{base:60,ab:2,c:'#7a5a3a'}, medio:{base:68,ab:2,c:'#8a94a2'}, forte:{base:76,ab:3,c:'#c8912f'},
    muitoforte:{base:84,ab:4,c:'#e8c860'}, lenda:{base:90,ab:5,c:'#a06aff'} };
  const RAR_NAME={ fraco:'Fraco', medio:'Médio', forte:'Forte', muitoforte:'Muito Forte', lenda:'Lenda' };

  function buildAttrs(fr){
    const rn=rng(hash(fr.id)); const base=RAR[fr.rar].base; const bias=STYLES[fr.style].bias;
    const a={};
    ALL.forEach(k=>{ let v=base + Math.round((rn()-0.5)*8) + (bias[k]||0)*0.7;
      if(fr.f&&fr.f.includes(k)) v+=9+Math.round(rn()*4);
      if(fr.l&&fr.l.includes(k)) v-=8+Math.round(rn()*4);
      a[k]=Math.max(42,Math.min(fr.rar==='lenda'?99:95, Math.round(v))); });
    return a;
  }
  function derived(a){
    const m=(arr)=>Math.round(arr.reduce((s,k)=>s+a[k],0)/arr.length);
    const ataque=m(OFF), defesa=m(DEF), fisico=m(PHY);
    const geral=Math.round((ataque*0.36+defesa*0.34+fisico*0.30));
    return { ataque, defesa, fisico, geral };
  }
  // aplica retrato faltante (shirt padrão) + monta objeto lutador completo
  function make(fr){
    const a=buildAttrs(fr); const d=derived(a);
    const spec=Object.assign({}, STYLES[fr.style].gear, fr.spec||{});
    return { ...fr, a, d, spec, rarC:RAR[fr.rar].c, rarName:RAR_NAME[fr.rar],
      styleName:STYLES[fr.style].name, styleEm:STYLES[fr.style].em };
  }
  const FIGHTERS = R.map(make);
  const byId={}; FIGHTERS.forEach(f=>byId[f.id]=f);
  const byStyle={}; STYLE_LIST.forEach(s=>byStyle[s]=FIGHTERS.filter(f=>f.style===s));

  /* ---- oponentes genéricos (preenche brackets) ---- */
  const NAMES=['Costa','Silva','Ivanov','Kim','Tanaka','Nguyen','Diallo','Müller','Rossi','Santos','Okafor','Petrov','Reyes','Haddad','Wong','Berg','Almeida','Sokolov','Park','Cruz','Torres','Novak','Yamada','Kane','Vargas','Duarte','Lima','Boateng','Farah','Cheng'];
  const FIRST=['Rico','Léo','Yuri','Max','Dan','Kai','Bruno','Ivan','Tito','Vlad','Igor','Hugo','Ravi','Omar','Zé','Nando','Aki','Sol','Pavel','Deco'];
  const SKINS=['#e6c29a','#d0a878','#c88a5a','#a06a44','#8a5a3a','#5a3826'];
  const HAIRS=['#141010','#2a1c12','#8a6a4a','#0a0a0a','#4a3020'];
  const HSTY=['buzz','short','bald','slick','corn','top'];
  function genOpponent(seed, targetOvr, styleForce){
    const rn=rng(seed); const style=styleForce||STYLE_LIST[(rn()*STYLE_LIST.length)|0];
    const rar = targetOvr>=84?'muitoforte':targetOvr>=74?'forte':targetOvr>=66?'medio':'fraco';
    // ajusta base para bater o alvo
    const nAb=RAR[rar].ab; const abKeys=Object.keys(ABIL);
    const chosen=[]; while(chosen.length<nAb){ const k=abKeys[(rn()*abKeys.length)|0]; if(!chosen.includes(k))chosen.push(k); }
    const skin=SKINS[(rn()*SKINS.length)|0];
    const spec=Object.assign({}, STYLES[style].gear, { skin, hair:HAIRS[(rn()*HAIRS.length)|0],
      hairStyle:HSTY[(rn()*HSTY.length)|0], beard:rn()<0.4?'stubble':rn()<0.2?'full':'none',
      eyes:'#241610', expr:rn()<0.5?'intense':'calm', phys:0.5+rn()*0.4, shirt:['#101014','#7a1010','#0a3a7a','#3a1a5a','#0a5a3a'][(rn()*5)|0] });
    const fr={ id:'op_'+seed, name:(rn()<0.5?FIRST[(rn()*FIRST.length)|0]+' ':'')+NAMES[(rn()*NAMES.length)|0],
      style, pais:'🏳️', rar, ab:chosen, spec, generic:true };
    // gera atributos centrados no alvo
    const a={}; const bias=STYLES[style].bias;
    ALL.forEach(k=>{ a[k]=Math.max(40,Math.min(94, Math.round(targetOvr+(rn()-0.5)*14+(bias[k]||0)*0.5))); });
    const f=make(fr); f.a=a; f.d=derived(a); return f;
  }

  /* ---- torneios (tiers da carreira) ---- */
  const TIERS=[
    { id:'regional', name:'Torneio Regional',    ovr:[58,68], pts:100,  win:20,  belt:'Cinturão Regional' },
    { id:'estadual', name:'Campeonato Estadual',  ovr:[64,74], pts:200,  win:35,  belt:'Cinturão Estadual' },
    { id:'nacional', name:'Torneio Nacional',     ovr:[70,80], pts:400,  win:55,  belt:'Cinturão Nacional' },
    { id:'continental',name:'Grand Prix Continental',ovr:[76,86],pts:700, win:85, belt:'Cinturão Continental' },
    { id:'mundial',  name:'Campeonato Mundial',   ovr:[84,95], pts:1200, win:130, belt:'Cinturão Mundial' },
  ];

  return { STYLES, STYLE_LIST, MU, matchup, ABIL, FIGHTERS, byId, byStyle, genOpponent, TIERS,
    OFF, DEF, PHY, ALL, ATTR_NAME, RAR, RAR_NAME, derived };
})();
