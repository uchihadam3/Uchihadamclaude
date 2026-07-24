// Dados e formatos oficiais das competições continentais e do Mundial.
// - Libertadores: 32 times, 8 grupos de 4 (ida e volta = 6 jogos), oitavas→final ida/volta, final única.
// - Sul-Americana: 32 times, 8 grupos de 4 (ida e volta), 1º direto para oitavas, 2º em playoff.
// - Mundial FIFA (formato 2025): 32 times, 8 grupos de 4 (turno único = 3 jogos), oitavas→final em jogo único.

import { LIBERTADORES_RIVALS, SULAMERICANA_RIVALS, MUNDIAL_RIVALS, TEAMS, type IntlTeam, type Player, type Position } from "./gameData";
import { playerShortFromName, simulateMatch, teamOverall } from "./gameLogic";
import { varianceSeed, teamOvrDelta, applyOvrDelta, seasonGlobalBuff } from "./opponentVariance";

/** Contexto opcional pra aplicar a variância determinística (±3 OVR + buff de
 *  temporada) nos jogos SIMULADOS de competições continentais/mundiais.
 *  Todo time (menos o jogador) recebe o mesmo delta que o HUD já mostra. */
export type VarianceCtx = { teamName?: string; season?: number };

function deltaFor(ctx: VarianceCtx | undefined, teamName: string, isPlayer: boolean): number {
  if (!ctx || isPlayer) return 0;
  return teamOvrDelta(varianceSeed(ctx), teamName) + seasonGlobalBuff(ctx.season);
}


/** helper: cria um IntlTeam com 11 jogadores reais em 4-3-3 (GK, 4 DEF, 3 MID, 3 ATA). */
const T = (
  name: string,
  short: string,
  color: string,
  ovr: number,
  ns: [string, string, string, string, string, string, string, string, string, string, string],
): IntlTeam => {
  // Overall dos times internacionais preservado (sem penalidade) para que a
  // taxa de zebras contra o jogador seja equivalente à do Brasileirão — quanto
  // maior o gap, mais o `limitUnrealisticUpset` protege o favorito.

  const pos: Position[] = ["GOL", "ZAG", "ZAG", "ZAG", "ZAG", "MEI", "MEI", "MEI", "ATA", "ATA", "ATA"];
  // Distribuição realista: 1 craque (+6), quase craques (+3/+4), meio-termo
  // e reservas fracos (-3/-4). Soma = 0 para que a média do XI bata
  // exatamente com o `overall` exibido (evita times internacionais
  // jogarem mais fortes do que aparentam).
  const deltas = [4, 2, 0, -2, -4, 3, 1, -3, 6, -1, -6];
  const microHash = (str: string) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return h >>> 0;
  };
  const micro = (n: string) => Math.round(((microHash(`${n}|${short}`) % 1000) / 1000 * 0.98 - 0.49) * 10) / 10;
  const players: Player[] = ns.map((n, i) => ({ name: n, position: pos[i], overall: Math.max(50, ovr + deltas[i] + micro(n)) }));
  return { name, short, color, overall: ovr, players };
};

/* ===================== COPA LIBERTADORES (32) ===================== */
// Elencos combinam atuais e ídolos históricos ("craques do passado" permitidos pelo usuário).
export const LIBERTADORES_TEAMS: IntlTeam[] = [
  T("River Plate", "RIV", "#c8102e", 87, ["Franco Armani","Paulo Díaz","Germán Pezzella","Marcos Acuña","Gonzalo Montiel","Enzo Pérez","Nacho Fernández","Juan Quintero","Miguel Borja","Sebastián Driussi","Facundo Colidio"]),
  T("Boca Juniors", "BOC", "#0a3d91", 86, ["Sergio Romero","Marcos Rojo","Nicolás Figal","Luis Advíncula","Lautaro Blanco","Ander Herrera","Cristian Medina","Kevin Zenón","Edinson Cavani","Miguel Merentiel","Milton Giménez"]),
  T("Racing Club", "RAC", "#7ec1e7", 84, ["Gabriel Arias","Marco Di Césare","Agustín García Basso","Facundo Mura","Gabriel Rojas","Agustín Almendra","Juan Nardoni","Juanfer Quintero","Adrián Martínez","Maximiliano Salas","Roger Martínez"]),
  T("Estudiantes", "EDL", "#e30613", 83, ["Matías Mansilla","Santiago Núñez","Zaid Romero","Eros Mancuso","Gabriel Neves","Enzo Pérez","Cristian Medina","Alexis Manyoma","Guido Carrillo","Tiago Palacios","Edwuin Cetré"]),
  T("Vélez Sarsfield", "VEL", "#0a3d91", 83, ["Tomás Marchiori","Aarón Quirós","Emanuel Mammana","Elías Gómez","Joaquín García","Claudio Aquino","Agustín Bouzat","Matías Pellegrini","Braian Romero","Michael Santos","Maher Carrizo"]),
  T("Talleres (Córdoba)", "TAL", "#0055aa", 82, ["Guido Herrera","Matías Catalán","Juan Portillo","Miguel Navarro","Ramón Sosa","Rodrigo Villagra","Rubén Botta","Federico Girotti","Nahuel Bustos","Ángelo Martino","Franco Fragapane"]),
  T("Peñarol", "PEN", "#f6c400", 83, ["Washington Aguerre","Nahitan Nández","Guzmán Rodríguez","Javier Méndez","Pedro Milans","Rodrigo Pérez","Leonardo Fernández","Maximiliano Olivera","Diego Rossi","Matías Arezo","David Terans"]),
  T("Nacional (URU)", "NAC", "#0a2a66", 82, ["Sergio Rochet","Sebastián Coates","Nicolás Marichal","Diego Polenta","Emiliano Ancheta","Rodrigo Zalazar","Cristian Oliva","Maximiliano Gómez","Christian Ebere","Gonzalo Carneiro","Juan Ignacio Ramírez"]),
  T("Colo-Colo", "COL", "#111111", 83, ["Brayan Cortés","Maximiliano Falcón","Alan Saldivia","Erick Wiemberg","Óscar Opazo","Esteban Pavez","Arturo Vidal","Vicente Pizarro","Lucas Cepeda","Salomón Rondón","Javier Correa"]),
  T("Universidad de Chile", "UCH", "#0a3d91", 81, ["Cristóbal Campos","Franco Calderón","Fabián Hormazábal","Matías Zaldivia","Marcelo Morales","Marcelo Díaz","Israel Poblete","Nicolás Guerra","Lucas Assadi","Leandro Fernández","Maximiliano Guerrero"]),
  T("Atlético Nacional", "ATN", "#006b3f", 83, ["David Ospina","William Tesillo","Cristian Zapata","Andrés Salazar","Álvaro Angulo","Matheus Uribe","Edwin Cardona","Juan Bauzá","Alfredo Morelos","Marino Hinestroza","Kevin Viveros"]),
  T("Millonarios", "MIL", "#0a3d91", 81, ["Álvaro Montero","Andrés Llinás","Juan Pablo Vargas","Andrés Román","Álex Moreno","Daniel Cataño","Juan Carlos Pereira","Larry Vásquez","Radamel Falcao","Leonardo Castro","Édgar Guerra"]),
  T("Junior (Barranquilla)", "JUN", "#c8102e", 80, ["Santiago Mele","Yeison Suárez","Yeison Guzmán","Emerson Batalla","Yimmi Chará","Didier Moreno","Fabián Sambueza","José Enamorado","Carlos Bacca","Steven Rodríguez","Fabián Ángel"]),
  T("Olimpia", "OLI", "#f0f0f0", 81, ["Gastón Olveira","Iván Torres","Junior Barreto","Rodney Redes","Ricardo Martins","Richard Ortiz","Derlis González","Hugo Quintana","Marcelo Moreno Martins","Guillermo Paiva","Manuel Capasso"]),
  T("Cerro Porteño", "CEP", "#c8102e", 80, ["Jean Fernandes","Fabián Balbuena","Blas Riveros","Robert Piris Da Motta","Cecilio Domínguez","Wilder Viera","Ivan Ramírez","Damián Bobadilla","Sergio Díaz","Diego Churín","Juan Iturbe"]),
  T("Libertad", "LIB", "#000000", 80, ["Martín Silva","Iván Piris","Diego Viera","Alan Benítez","Néstor Giménez","Iván Franco","Jorge Rojas","Óscar Cardozo","Álvaro Campuzano","Diego González","Robert Morales"]),
  T("LDU Quito", "LDU", "#f0f0f0", 81, ["Alexander Domínguez","Ricardo Adé","Facundo Rodríguez","José Quinteros","Ezequiel Piovi","Jhojan Julio","Mauricio Martínez","Óscar Zambrano","Paolo Guerrero","Michael Estrada","Alex Arce"]),
  T("Barcelona SC", "BSC", "#f6c400", 80, ["Javier Burrai","Xavier Arreaga","Christian Vega","Aníbal Chalá","Byron Castillo","Damián Díaz","Michael Hoyos","Miller Bolaños","Janner Corozo","Francisco Fydriszewski","Ismael Blanco"]),
  T("Independiente del Valle", "IDV", "#000000", 82, ["Guido Villar","Richard Schunke","Mateo Carabajal","Kendry Páez","Layan Loor","Junior Sornoza","Cristian Pellerano","Sebastián González","Michael Hoyos","Claudio Spinelli","Jhon Sánchez"]),
  T("Bolívar", "BOL", "#0a3d91", 79, ["Rubén Cordano","José Sagredo","Diego Bejarano","José Carrasco","Erwin Saavedra","Leonel Justiniano","Gabriel Villamíl","Roberto Fernández","Juan Miguel Callejón","Francisco Rodríguez","Ronaldo Sánchez"]),
  T("The Strongest", "TST", "#f6c400", 78, ["Guillermo Viscarra","Adrián Jusino","Ramiro Vaca","Óscar Ribera","Pablo Rojas","José Sagredo","Diego Wayar","Rodrigo Ramallo","Enrique Triverio","Sebastián Reyes","Willy Barbosa"]),
  T("Alianza Lima", "ALI", "#0a3d91", 78, ["Ángelo Campos","Carlos Zambrano","Renzo Garcés","Guillermo Enrique","Miguel Trauco","Christian Cueva","Sebastián Rodríguez","Jesús Castillo","Hernán Barcos","Kevin Quevedo","Cecilio Waterman"]),
  T("Universitario", "UNI", "#e30613", 78, ["Sebastián Britos","Aldo Corzo","Williams Riveros","Matías Di Benedetto","Andy Polo","Rodrigo Ureña","Piero Quispe","Jairo Concha","Alex Valera","Edison Flores","José Rivera"]),
  T("Deportivo Táchira", "TAC", "#f6c400", 77, ["Juan Bolívar","Rafael Castellín","Ronaldo Chacón","Manuel Arteaga","Anthony Uribe","Yohandry Orozco","José Manuel Velázquez","Wilker Ángel","Sergio Herrera","Jhoan Cumana","Anderson Contreras"]),
  T("Deportivo Cali", "CAL", "#006b3f", 78, ["Humberto Acevedo","Jorge Marsiglia","Kevin Andrade","Yeison Guzmán","Aldair Gutiérrez","Jorge Segura","Yeison Suárez","Kevin Velasco","Teófilo Gutiérrez","Michael Ortega","Andrés Colorado"]),
  T("Rosario Central", "ROS", "#0055aa", 80, ["Jorge Broun","Facundo Mallo","Juan Cruz Komar","Agustín Sández","Damián Martínez","Kevin Ortiz","Ignacio Malcorra","Jaminton Campaz","Enzo Copetti","Alejo Véliz","Gastón Ávila"]),
  T("San Lorenzo", "SLO", "#0055aa", 80, ["Facundo Altamirano","Gastón Campi","Federico Gattoni","Jhohan Romaña","Jalil Elías","Malcom Braida","Ivo Mammini","Adam Bareiro","Alexis Cuello","Andrés Vombergar","Nicolás Fernández"]),
  T("Independiente", "IDT", "#c8102e", 80, ["Rodrigo Rey","Sebastián Valdez","Nicolás Freire","Federico Vera","Iván Marcone","Kevin Lomónaco","Diego Tarzia","Federico Mancuello","Gabriel Ávalos","Martín Cauteruccio","Santiago Toloza"]),
  T("Colón (SF)", "CSF", "#c8102e", 77, ["Ignacio Chicco","Facundo Garcés","Sebastián Prediger","Federico Jourdan","Andrew Teuten","Rodrigo Aliendro","Christian Bernardi","Ariel Rojas","Wesley Fraga","Ramón Ábila","Facundo Farías"]),
  T("Danubio", "DAN", "#0a3d91", 76, ["Juan Pablo Duarte","Enzo Bogado","Gabriel Ballay","Nicolás Riveros","Franco Martínez","Iván Álvarez","Fabricio Formiliano","Diego Falero","Damián Suárez","Óscar Correa","Ignacio Ithurralde"]),
  T("Fluminense (adv)", "FLU", "#8f1b3d", 83, ["Fábio","Thiago Silva","Ignácio","Marcelo","Samuel Xavier","André","Paulo Henrique Ganso","Martinelli","Germán Cano","John Kennedy","Jhon Arias"]),
  T("Sporting Cristal", "SCR", "#7ec1e7", 78, ["Diego Enríquez","Nilson Loyola","Rafael Lutiger","Miguel Araujo","Gustavo Cazonatti","Christofer Gonzales","Yoshimar Yotún","Martín Cauteruccio","Irven Ávila","Santiago González","Diego Otoya"]),
  // Times adicionais para variedade entre temporadas
  T("Universidad Católica", "UCA", "#0a3d91", 79, ["Bernardo Cerezo","Alfonso Parot","Daniel González","Branco Ampuero","Nehuén Paz","Marcelino Núñez","Tomás Asta-Buruaga","Fernando Zampedri","Diego Valencia","Alexander Aravena","César Pinares"]),
  T("Coquimbo (Liberta)", "CQL", "#f6c400", 77, ["Diego Sánchez","Nicolás Peña","Alfonso Parot","Bastián Silva","Matías Palavecino","Cristián Zavala","Salvador Sánchez","Facundo Barceló","Rodrigo Holgado","Nicolás Ferreyra","Cristián Suárez"]),
  T("Alianza (BOL)", "ALB", "#f0f0f0", 76, ["José Zúñiga","Juan Godoy","Diego Rodríguez","Efraín Morales","Yomar Rocha","Bruno Miranda","Jean Marco Enríquez","Fernando Marteli","Facundo Suárez","Manuel Serrano","Fernando Saldías"]),
  T("Palmeiras (adv)", "PMV", "#006437", 86, ["Weverton","Gustavo Gómez","Murilo","Piquerez","Marcos Rocha","Raphael Veiga","Richard Ríos","Aníbal Moreno","Estêvão","Flaco López","Dudu"]),
  T("Grêmio (adv Liberta)", "GRL", "#0055aa", 81, ["Marchesín","Kannemann","Rodrigo Ely","Reinaldo","João Pedro","Villasanti","Cristaldo","Pavón","Diego Costa","Suárez","Nathan Fernandes"]),
  T("Vasco (adv Liberta)", "VSL", "#000000", 80, ["Léo Jardim","Maicon","João Victor","Paulinho","Lucas Piton","Puma Rodríguez","Hugo Moura","Payet","Emerson Rodríguez","Vegetti","Rayan"]),
  T("Santos (adv)", "SAN", "#f0f0f0", 82, ["João Paulo","Zé Ivaldo","João Basso","Escobar","JP Chermont","Diego Pituca","Tomás Rincón","Otero","Willian Bigode","Guilherme","Soteldo"]),
  T("Cruzeiro (adv)", "CRU", "#0055aa", 82, ["Cássio","Fabrício Bruno","Villalba","William","Kaio Jorge","Matheus Pereira","Lucas Silva","Christian","Wanderson","Gabigol","Rafa Silva"]),
  T("São Paulo (adv)", "SPT", "#c8102e", 84, ["Rafael","Arboleda","Alan Franco","Wendell","Ferraresi","Alisson","Bobadilla","Luciano","Ferreira","Calleri","Lucas Moura"]),
  T("Internacional (adv)", "INE", "#c8102e", 82, ["Anthoni","Vitão","Mercado","Bernabei","Aguirre","Fernando","Alan Patrick","Bruno Henrique","Wesley","Enner Valencia","Wanderson"]),
  T("Fortaleza (adv)", "FOR", "#0055aa", 80, ["João Ricardo","Titi","Brítez","Bruno Pacheco","Tinga","Rossetto","Pochettino","Kervin Andrade","Lucero","Yago Pikachu","Moisés"]),
  T("Central Córdoba", "CCS", "#000000", 76, ["Alan Aguerre","Rafael Pérez","Nicolás Bazzana","Fernando Juárez","Kevin Retamar","José Florentín","Iván Gómez","Franco Watson","Leonardo Heredia","Gastón Verón","Matías Perelló"]),
  T("Instituto (Córdoba)", "ICO", "#c8102e", 75, ["Manuel Roffo","Alexis Pérez","Fernando Alarcón","Nicolás Watson","Franco Sández","Fernando Alarcón","Ezequiel Parnisari","Damián Puebla","Adrián Martínez","Jonás Aguirre","Álex Luna"]),
];


/* ===================== COPA SUL-AMERICANA (32) ===================== */
export const SULAMERICANA_TEAMS: IntlTeam[] = [
  T("Racing (segunda linha)", "RC2", "#7ec1e7", 78, ["Fernando Muslera","Miguel Vergara","Julián López","Sebastián Sosa","Luca Sosa","Diego Milito","Lisandro López","Ariel Ortega","José Sand","Gabriel Hauche","Diego Buonanotte"]),
  T("Lanús", "LAN", "#7d0000", 80, ["Nahuel Losada","Carlos Izquierdoz","Marcelino Moreno","Sasha Marcich","Julio Soler","Dylan Aquino","Franco Watson","Rodrigo Castillo","Walter Bou","Eduardo Salvio","Alexis Segovia"]),
  T("Argentinos Juniors", "ARG", "#e30613", 78, ["Federico Lanzillotta","Nicolás Diez","Miguel Torrén","Kevin Lomónaco","Luciano Sánchez","Ismael Sosa","Jonathan Gómez","Damián Batallini","Gabriel Ávalos","Federico Redondo","Gastón Verón"]),
  T("Defensa y Justicia", "DEF", "#f6c400", 78, ["Enrique Bologna","Rafael Delgado","Nicolás Tripichio","Alexis Soto","Kevin Gutiérrez","Kevin Solari","Gastón Togni","Juan Miritello","Nicolás Fernández","Abiel Osorio","Julián López"]),
  T("Godoy Cruz", "GOD", "#0055aa", 77, ["Franco Petroli","Diego Rodríguez","César Rigamonti","Néstor Breitenbruch","Bruno Leyes","Nicolás Fernández","Nicolás Domínguez","Guillermo Fernández","Salomón Rodríguez","Hernán López","Facundo Altamira"]),
  T("Newell's Old Boys", "NEW", "#c8102e", 77, ["Ramiro Macagno","Yerson Mosquera","Franco Escobar","Emanuel Aguilera","Mateo Silvetti","Guillermo Ortiz","Éver Banega","Franco Guarnieri","Ignacio Ramírez","Juan Ignacio Manfredini","Facundo Ferreyra"]),
  T("Deportes Tolima", "TOL", "#f6c400", 77, ["William Cuesta","Nicolás Escobar","Juan Guillermo Arboleda","Julián Quiñones","Yohandry Orozco","Kevin Pérez","Juan Fernando Caicedo","Gustavo Ramírez","Yeison Guzmán","Yerson Candelo","Marco Pérez"]),
  T("Once Caldas", "ONC", "#f0f0f0", 76, ["James Aguirre","Kevin Salazar","Luis Sánchez","Andrés Felipe Roa","John García","Dayro Moreno","Elvis Perlaza","Michael Barrios","Yuber Mosquera","Marlon Piedrahita","Alexis Zapata"]),
  T("América de Cali", "AME", "#c8102e", 77, ["Jorge Soto","Kevin Andrade","Marlon Torres","Elvis Mosquera","Andrés Roa","Rodrigo Holgado","Cristian Barrios","Iago Falque","Adrián Ramos","Duván Vergara","Cristian Arrieta"]),
  T("Emelec", "EME", "#0a3d91", 77, ["Pedro Ortiz","Luis Caicedo","Franklin Guerra","José Angulo","Miller Bolaños","Carlos Gruezo","Christian Cueva","Fernando Gaibor","Diego Bayas","Jaime Ayoví","Damián Díaz"]),
  T("Deportivo Cuenca", "CUE", "#c8102e", 76, ["David Cabezas","Fricson Erazo","Alexis Zapata","Miller Castillo","Diego García","Kevin Rendón","Sebastián Rodríguez","Gustavo Cazonatti","Jhon Cifuente","Sebastián Salazar","Cristian Peñailillo"]),
  T("Cerro Largo", "CLG", "#006b3f", 75, ["Guillermo de Amores","Diego Zabala","Franco Nicola","Ignacio Neira","Kevin Rolón","Bruno Silva","Ignacio Álvarez","Franco Fagúndez","Facundo Batista","Camilo Cándido","Álvaro Fernández"]),
  T("Liverpool (URU)", "LFC", "#0a3d91", 77, ["Sebastián Britos","Federico Pereira","Nicolás Milesi","Facundo Milán","Sebastián Cáceres","Cristian Techera","Federico Martínez","Kevin Amaro","Facundo Batista","Thiago Vecino","Juan Cruz Mascia"]),
  T("Cienciano", "CIE", "#c8102e", 76, ["Juan Solórzano","Kevin Cárcamo","Nelinho Quina","Gilbert Álvarez","Alejandro Hohberg","Ronal Huaccha","Beto da Silva","Diego Chávez","Danilo Carando","Christian Neira","Óscar Vílchez"]),
  T("Sport Huancayo", "SPH", "#c8102e", 75, ["Erick Delgado","Junior Ross","Danny Cabanillas","Christian Ortiz","Neri Bandiera","Diego Manicero","Marcos Lliuya","Jonathan Vilca","Alexander Sánchez","Ricardo Salcedo","Cristian Souza"]),
  T("Sportivo Luqueño", "SLQ", "#0a3d91", 74, ["Alfredo Aguilar","Alejandro Villalba","Cristian Núñez","Alcides Colmán","Rodrigo Rojas","Danny Bareiro","Miguel Almirón","Rodrigo Bogarín","Jorge Ortega","Marcelo Vera","Fernando Fernández"]),
  T("Nacional (PAR)", "NPY", "#0a3d91", 75, ["Rodrigo Muñoz","Facundo Mallo","Iván Villalba","Julio González","Diego Duarte","Iván Franco","Marcelo Pérez","Sergio Aquino","Óscar Cardozo","Julián Malatini","Álvaro Rey"]),
  T("Guaraní (PAR)", "GUA", "#c8102e", 76, ["Roberto Junior Fernández","Fernando Amorebieta","Iván Piris","Ronaldo Martínez","Wildo Alonso","Christian Ríos","Diego Torres","Damián Bobadilla","Fernando Fernández","Roberto Ovelar","Julio Enciso"]),
  T("Alianza Petrolera", "ALP", "#e30613", 73, ["Diego Novoa","Yerson Candelo","Fabio Delgado","Yeison Suárez","Luis Casierra","Kelvin Osorio","Andrés Correa","Kevin Salazar","Kevin Viveros","Carlos Sierra","Fabián Sambueza"]),
  T("Envigado", "ENV", "#f6c400", 73, ["Andrés Mosquera","Cristian Blanco","Kevin Andrade","Steven Rodríguez","Jorge Ramos","Édinson Palomino","Alexis Serna","Alexis Manyoma","Neyder Moreno","Miguel Monsalve","Kevin Londoño"]),
  T("Melgar", "MEL", "#e30613", 76, ["Carlos Cáceda","Alexis Arias","Paolo Reyna","Alec Deneumostier","Kenji Cabrera","Christopher Olivares","Bernardo Cuesta","Tomás Martínez","Luis Iberico","Cristian Ceballos","Pablo Lavandeira"]),
  T("Fortaleza CEIF", "FCE", "#f6c400", 74, ["Federico Nicolás","Michael Rangel","Óscar Barreto","John Palacios","Andrés Torres","Marco Pérez","Emilio Aristizábal","Jhon Vásquez","Julián Rodríguez","Kevin Palacios","Yeison Guzmán"]),
  T("Palestino", "PAL", "#006b3f", 75, ["Sergio Vergara","Cristián Suárez","Roberto Cereceda","Bryan Carrasco","Junior Marabel","Bryan Rabello","Iván Román","Fernando Cornejo","Luis Jiménez","Renato Cordero","Bruno Barticciotto"]),
  T("Coquimbo Unido", "CQU", "#f6c400", 75, ["Diego Sánchez","Nicolás Peña","Diego Coelho","Bastián Silva","Matías Palavecino","Nicolás Ferreyra","Alfonso Parot","Cristián Zavala","Salvador Sánchez","Facundo Barceló","Rodrigo Holgado"]),
  T("Águilas Doradas", "AGD", "#f6c400", 74, ["Éder Chaux","Elvis Perlaza","Andrés Correa","Jhon Duque","Jorge Cardona","Sebastián Guzmán","Wilfrido de la Rosa","Jhon Salazar","Sergio Mosquera","Kevin Salazar","Óscar Perea"]),
  T("Botafogo (adv)", "BOT", "#000000", 85, ["John","Bastos","Barboza","Alexander Barboza","Marçal","Marlon Freitas","Gregore","Eduardo","Igor Jesus","Luiz Henrique","Almada"]),
  T("Corinthians (adv)", "COR", "#111111", 81, ["Cássio","Félix Torres","Gustavo Henrique","Fagner","Hugo","Maycon","Raniele","Rodrigo Garro","Yuri Alberto","Memphis Depay","Ángel Romero"]),
  T("Grêmio (adv)", "GRE", "#0055aa", 81, ["Marchesín","Kannemann","Rodrigo Ely","Reinaldo","João Pedro","Villasanti","Cristaldo","Pavón","Diego Costa","Suárez","Nathan Fernandes"]),
  T("Atlético-MG (adv)", "CAM", "#000000", 83, ["Everson","Battaglia","Alonso","Guilherme Arana","Saravia","Alan Franco","Fausto Vera","Bernard","Paulinho","Hulk","Deyverson"]),
  T("Racing de Montevideo", "RMV", "#f0f0f0", 73, ["Rodrigo Formento","Franco Boga","Sergio Blanco","Diego Ifrán","Álvaro Fernández","Marcelo Sarli","Nicolás Correa","Bruno Silva","Facundo Boné","Fernando Rodríguez","Álvaro Rey"]),
  // Times adicionais para variedade entre temporadas
  T("Unión Santa Fe", "UNS", "#c8102e", 74, ["Matías Tagliamonte","Jerónimo Domina","Franco Calderón","Franco Pardo","Emanuel Britez","Franco Fragapane","Kevin Ortiz","Cristian Tarragona","Franco Troyansky","Mauro Luna Diale","Mauro Pittón"]),
  T("Belgrano (Córdoba)", "BEC", "#7ec1e7", 75, ["Ignacio Chicco","Alejandro Rébola","Nahuel Losada","Facundo Quignón","Franco Jara","Bryan Reyna","Lucas Zelarayán","Matías Suárez","Franco Jara","Pablo Vegetti","Pablo Chavarría"]),
  T("Unión Española", "UES", "#c8102e", 73, ["Martín Parra","Rafael Caroca","Álvaro Ramos","Franco Bechtholdt","Sebastián Pol","Bryan Carvallo","Diego Sánchez","César Fuentes","Roberto Gutiérrez","Diego Rojas","Bryan Cortés"]),
  T("Deportivo Pereira", "DPR", "#c8102e", 74, ["Aldair Quintana","Yulián Anchico","Carlos Ramírez","Camilo Ayala","Andrés Correa","Andrés Iván","Ángelo Rodríguez","Yesus Cabrera","Marlon Piedrahíta","Adrián Estacio","Kevin Salazar"]),
  T("Blooming", "BLM", "#7ec1e7", 72, ["Guillermo Viscarra","José Sagredo","Yasmani Duk","Ronaldo Sánchez","Fernando Saldías","Jhasmani Campos","Eduardo Peraza","Nicolás Suárez","Enzo Monteiro","Fernando Marteli","Sergio Jáuregui"]),
  T("Nacional Potosí", "NPS", "#0a3d91", 73, ["Roberto Fernández","Juan Godoy","Ramiro Ballivián","Enrique Flores","Serginho","Ronny Montero","Alejandro Sánchez","Rodrigo Ramallo","Bruno Miranda","Jhasmani Campos","Rodrigo Ríos"]),
  T("Athletico-PR (adv)", "CAP", "#c8102e", 80, ["Bento","Thiago Heleno","Kaique Rocha","Fernando","Léo Godoy","Erick","Fernandinho","Christian","Cuello","Pablo","Vitor Roque"]),
  T("Vasco (adv)", "VAS", "#000000", 80, ["Léo Jardim","Maicon","João Victor","Paulinho","Lucas Piton","Puma Rodríguez","Hugo Moura","Payet","Emerson Rodríguez","Vegetti","Rayan"]),
  T("Bragantino (adv)", "BRA", "#c8102e", 79, ["Cleiton","Léo Ortiz","Eduardo Santos","Juninho Capixaba","Andrés Hurtado","Lucas Evangelista","Matheus Fernandes","Eric Ramires","Vitinho","Helinho","Thiago Borbas"]),
  T("Atlético-GO (adv Sula)", "ACG", "#c8102e", 73, ["Ronaldo","Titi","Ramon Menezes","Alix Vinicius","Guilherme Romão","Baralhas","Rhaldney","Shaylon","Emiliano Rodríguez","Kauan","Emerson"]),
  T("Cuiabá (adv Sula)", "CUI", "#f6c400", 75, ["Walter","Alan Empereur","Marllon","Ramon","Uendel","Fernando Sobral","Denilson","Iván Alonso","Deyverson","Isidro Pitta","Clayson"]),
  T("Goiás (adv Sula)", "GOI", "#006437", 77, ["Tadeu","Reynaldo","Lucas Halter","Sander","Maguinho","Rezende","Willian Oliveira","Marquinhos","Anderson Oliveira","Pedro Raul","Alesson"]),
];


/* ===================== MUNDIAL DE CLUBES FIFA (32) ===================== */
// Times reais da edição 2025 (formato ampliado FIFA).
export const MUNDIAL_TEAMS: IntlTeam[] = [
  T("Real Madrid", "RMA", "#f0f0f0", 93, ["Thibaut Courtois","Antonio Rüdiger","Éder Militão","Ferland Mendy","Dani Carvajal","Federico Valverde","Jude Bellingham","Aurélien Tchouaméni","Vinícius Júnior","Kylian Mbappé","Rodrygo"]),
  T("Manchester City", "MCI", "#7ec1e7", 92, ["Ederson","Rúben Dias","Nathan Aké","Kyle Walker","Joško Gvardiol","Rodri","Kevin De Bruyne","Bernardo Silva","Erling Haaland","Phil Foden","Jérémy Doku"]),
  T("Bayern München", "BAY", "#dc052d", 90, ["Manuel Neuer","Dayot Upamecano","Kim Min-jae","Alphonso Davies","Joshua Kimmich","Leon Goretzka","Jamal Musiala","Leroy Sané","Harry Kane","Serge Gnabry","Kingsley Coman"]),
  T("Paris Saint-Germain", "PSG", "#0a3d91", 89, ["Gianluigi Donnarumma","Marquinhos","Milan Škriniar","Nuno Mendes","Achraf Hakimi","Vitinha","Warren Zaïre-Emery","Fabián Ruiz","Ousmane Dembélé","Bradley Barcola","Gonçalo Ramos"]),
  T("Chelsea", "CHE", "#0a3d91", 88, ["Robert Sánchez","Levi Colwill","Wesley Fofana","Marc Cucurella","Reece James","Enzo Fernández","Moisés Caicedo","Cole Palmer","Nicolas Jackson","Christopher Nkunku","Pedro Neto"]),
  T("Inter", "INT", "#0a3d91", 89, ["Yann Sommer","Alessandro Bastoni","Francesco Acerbi","Federico Dimarco","Matteo Darmian","Nicolò Barella","Hakan Çalhanoğlu","Henrikh Mkhitaryan","Lautaro Martínez","Marcus Thuram","Marko Arnautović"]),
  T("Juventus", "JUV", "#000000", 87, ["Michele Di Gregorio","Federico Gatti","Bremer","Andrea Cambiaso","Danilo","Manuel Locatelli","Weston McKennie","Teun Koopmeiners","Dušan Vlahović","Kenan Yıldız","Randal Kolo Muani"]),
  T("Atlético de Madrid", "ATM", "#c8102e", 88, ["Jan Oblak","José María Giménez","César Azpilicueta","Reinildo Mandava","Nahuel Molina","Rodrigo De Paul","Koke","Pablo Barrios","Antoine Griezmann","Julián Álvarez","Álvaro Morata"]),
  T("FC Porto", "POR", "#0a3d91", 85, ["Diogo Costa","Pepe","Otávio","Wendell","João Mário","Alan Varela","Stephen Eustáquio","Nico González","Galeno","Mehdi Taremi","Evanilson"]),
  T("Benfica", "BEN", "#c8102e", 85, ["Anatoliy Trubin","António Silva","Nicolás Otamendi","Álvaro Carreras","Alexander Bah","João Neves","Fredrik Aursnes","Orkun Kökçü","Ángel Di María","Rafa Silva","Arthur Cabral"]),
  T("Borussia Dortmund", "BVB", "#f6c400", 86, ["Gregor Kobel","Mats Hummels","Niklas Süle","Ian Maatsen","Julian Ryerson","Emre Can","Marcel Sabitzer","Julian Brandt","Karim Adeyemi","Donyell Malen","Niclas Füllkrug"]),
  T("Red Bull Salzburg", "SAL", "#e30613", 81, ["Alexander Schlager","Strahinja Pavlović","Amar Dedić","Aleksa Terzić","Samson Baidoo","Nicolas Seiwald","Maurits Kjærgaard","Óscar Gloukh","Karim Konaté","Roko Šimić","Petar Ratkov"]),
  T("Boca Juniors", "BOC", "#0a3d91", 86, ["Sergio Romero","Marcos Rojo","Nicolás Figal","Luis Advíncula","Lautaro Blanco","Ander Herrera","Cristian Medina","Kevin Zenón","Edinson Cavani","Miguel Merentiel","Milton Giménez"]),
  T("River Plate", "RIV", "#c8102e", 87, ["Franco Armani","Paulo Díaz","Germán Pezzella","Marcos Acuña","Gonzalo Montiel","Enzo Pérez","Nacho Fernández","Juan Quintero","Miguel Borja","Sebastián Driussi","Facundo Colidio"]),
  T("Fluminense", "FLU", "#8f1b3d", 85, ["Fábio","Thiago Silva","Ignácio","Marcelo","Samuel Xavier","André","Paulo Henrique Ganso","Martinelli","Germán Cano","John Kennedy","Jhon Arias"]),
  T("Palmeiras", "PAL", "#006437", 85, ["Weverton","Gustavo Gómez","Murilo","Piquerez","Marcos Rocha","Raphael Veiga","Richard Ríos","Aníbal Moreno","Estêvão","Flaco López","Dudu"]),
  T("Flamengo", "FLA", "#c8102e", 86, ["Rossi","Léo Ortiz","Léo Pereira","Ayrton Lucas","Wesley","Gerson","De Arrascaeta","Erick Pulgar","Bruno Henrique","Pedro","Gabigol"]),
  T("Botafogo", "BOT", "#000000", 85, ["John","Bastos","Alexander Barboza","Marçal","Vitinho","Marlon Freitas","Gregore","Eduardo","Luiz Henrique","Igor Jesus","Almada"]),
  T("Monterrey", "MTY", "#0055aa", 82, ["Esteban Andrada","Sergio Ramos","Héctor Moreno","Gerardo Arteaga","Stefan Medina","Jorge Rodríguez","Maximiliano Meza","Jesús Corona","Germán Berterame","Brandon Vázquez","Rogelio Funes Mori"]),
  T("Club León", "LEO", "#006b3f", 81, ["Rodolfo Cota","Adonis Frías","Stiven Barreiro","Jaine Barreiro","Osvaldo Rodríguez","Fernando Navarro","Salvador Reyes","Lucas Romero","James Rodríguez","Ismael Díaz","Federico Viñas"]),
  T("Al-Hilal", "HIL", "#0a3d91", 87, ["Yassine Bounou","Kalidou Koulibaly","Rúben Neves","João Cancelo","Renan Lodi","Sergej Milinković-Savić","Salem Al-Dawsari","Malcom","Neymar Jr","Aleksandar Mitrović","Marcos Leonardo"]),
  T("Al Ahly", "AHL", "#c8102e", 82, ["Mohamed El Shenawy","Yasser Ibrahim","Rami Rabia","Ali Maâloul","Mohamed Hany","Hamdi Fathi","Aliou Dieng","Mahmoud Kahraba","Percy Tau","Wessam Abou Ali","Hussein El Shahat"]),
  T("Al Ain", "AIN", "#7d0000", 81, ["Khalid Eisa","Kouame Autonne","Erik","Ramy Rabia","Kaku","Yahia Nader","Soufiane Rahimi","Kodjo Laba","Alex Meschini","Matías Palacios","Chadli Amri"]),
  T("Urawa Reds", "URW", "#c8102e", 80, ["Shusaku Nishikawa","Marius Høibraten","Alexander Scholz","Takahiro Sekine","Hiroki Sakai","Ken Iwao","Kaito Yasui","Yoshio Koizumi","Bryan Linssen","Yusuke Matsuo","Shoya Nakajima"]),
  T("Ulsan HD", "ULS", "#0055aa", 79, ["Jo Hyeon-woo","Kim Young-gwon","Trojan","Kim Tae-hwan","Seol Young-woo","Ko Seung-beom","Rubens","Lee Chung-yong","Um Won-sang","Martin Adam","Joo Min-kyu"]),
  T("Wydad Casablanca", "WYD", "#c8102e", 78, ["Mehdi Benabid","Yahya Attiat-Allah","Zouhair El Moutaraji","Mohamed Souboul","Bouly Sambou","Yahya Jabrane","Ayoub El Kaabi","Guy Mbenza","Bilal Ould-Chikh","Reda Jaadi","Bakr El Helali"]),
  T("Espérance de Tunis", "EST", "#c8102e", 77, ["Béchir Ben Saïd","Yassine Meriah","Mohamed Ali Ben Romdhane","Chiheb Jebali","Mohamed Amine Tougai","Ghaïlène Chaâlali","Onuche Ogbelu","Anayo Iwuala","Anice Badri","Rodrigo Rodrigues","Yan Sasse"]),
  T("Mamelodi Sundowns", "SUN", "#f6c400", 78, ["Ronwen Williams","Grant Kekana","Mosa Lebusa","Aubrey Modiba","Khuliso Mudau","Teboho Mokoena","Themba Zwane","Lucas Ribeiro","Peter Shalulile","Iqraam Rayners","Marcelo Allende"]),
  T("Auckland City", "AUK", "#0a3d91", 75, ["Conor Tracey","Adam Mitchell","Nikko Boxall","Michael den Heijer","Dylan Manickum","Jerson Lagos","Christian Gray","Mario Ilich","Angel Berlanga","Myer Bevan","Ryan de Vries"]),
  T("Seattle Sounders", "SEA", "#006b3f", 80, ["Stefan Frei","Yeimar Gómez Andrade","Jackson Ragen","Nouhou","Alex Roldan","Cristian Roldán","Obed Vargas","Albert Rusnák","Jordan Morris","Raúl Ruidíaz","Léo Chú"]),
  T("Pachuca", "PAC", "#000000", 81, ["Carlos Moreno","Sergio Barreto","Gustavo Cabral","Kevin Álvarez","Luis Rodríguez","Pedro Pedraza","Erick Sánchez","Bryan González","Salomón Rondón","Óscar Murillo","Elías Montiel"]),
  T("Inter Miami", "MIA", "#f4b7c9", 85, ["Óscar Ustari","Jordi Alba","Sergio Busquets","Maximiliano Falcón","Marcelo Weigandt","Federico Redondo","Rodrigo De Paul","Tadeo Allende","Lionel Messi","Luis Suárez","Robert Taylor"]),
  // Times europeus/mundiais adicionais para variedade entre temporadas
  T("Barcelona", "BAR", "#c8102e", 90, ["Marc-André ter Stegen","Ronald Araújo","Jules Koundé","Alejandro Balde","João Cancelo","Frenkie de Jong","Pedri","Gavi","Lamine Yamal","Robert Lewandowski","Raphinha"]),
  T("Liverpool", "LIV", "#c8102e", 89, ["Alisson","Virgil van Dijk","Ibrahima Konaté","Andrew Robertson","Trent Alexander-Arnold","Dominik Szoboszlai","Alexis Mac Allister","Ryan Gravenberch","Mohamed Salah","Cody Gakpo","Luis Díaz"]),
  T("Arsenal", "ARS", "#c8102e", 88, ["David Raya","William Saliba","Gabriel Magalhães","Oleksandr Zinchenko","Ben White","Declan Rice","Martin Ødegaard","Kai Havertz","Bukayo Saka","Gabriel Jesus","Gabriel Martinelli"]),
  T("Manchester United", "MUN", "#c8102e", 86, ["André Onana","Lisandro Martínez","Matthijs de Ligt","Luke Shaw","Diogo Dalot","Casemiro","Bruno Fernandes","Kobbie Mainoo","Marcus Rashford","Rasmus Højlund","Alejandro Garnacho"]),
  T("Napoli", "NAP", "#7ec1e7", 86, ["Alex Meret","Amir Rrahmani","Juan Jesus","Mathías Olivera","Giovanni Di Lorenzo","Stanislav Lobotka","André-Frank Zambo Anguissa","Piotr Zieliński","Khvicha Kvaratskhelia","Victor Osimhen","Matteo Politano"]),
  T("Milan", "MIL", "#c8102e", 87, ["Mike Maignan","Fikayo Tomori","Malick Thiaw","Theo Hernández","Davide Calabria","Ismaël Bennacer","Tijjani Reijnders","Ruben Loftus-Cheek","Rafael Leão","Olivier Giroud","Christian Pulisic"]),
  T("Bayer Leverkusen", "BLV", "#c8102e", 87, ["Lukáš Hrádecký","Jonathan Tah","Edmond Tapsoba","Piero Hincapié","Alejandro Grimaldo","Granit Xhaka","Exequiel Palacios","Jeremie Frimpong","Florian Wirtz","Victor Boniface","Amine Adli"]),
  T("Atlético Nacional (Mundial)", "ATM2", "#006b3f", 82, ["David Ospina","William Tesillo","Cristian Zapata","Andrés Salazar","Álvaro Angulo","Matheus Uribe","Edwin Cardona","Juan Bauzá","Alfredo Morelos","Marino Hinestroza","Kevin Viveros"]),
  T("Al-Nassr", "NAS", "#f6c400", 84, ["David Ospina","Aymeric Laporte","Ali Al-Bulaihi","Alex Telles","Sultan Al-Ghannam","Otávio","Marcelo Brozović","Sadio Mané","Cristiano Ronaldo","Anderson Talisca","Salem Al-Dawsari"]),
  T("Al-Ittihad", "ITT", "#f6c400", 83, ["Marcelo Grohe","Jota Silva","Ahmed Hegazi","Muhannad Al-Saad","Hamed Al-Ghamdi","Fabinho","Karim Benzema","N'Golo Kanté","Steven Bergwijn","Houssem Aouar","Moussa Diaby"]),
  T("Los Angeles FC", "LAF", "#000000", 79, ["Hugo Lloris","Aaron Long","Sergi Palencia","Ryan Hollingshead","Denis Bouanga","Igor Jesus","Cengiz Ünder","Mateusz Bogusz","Denis Bouanga","Cristian Olivera","Kei Kamara"]),
  
];

/* ===================== MERGE COM POOLS EXPANDIDOS (RIVALS) =====================
 * Garante que TODOS os times reais definidos em `gameData.ts` (RIVALS) entrem
 * no sorteio de cada competição. Deduplica por nome — o time listado primeiro
 * (aqui em competitions.ts) vence, preservando elencos afinados.
 */
(function mergeRivalPools() {
  const mergeInto = (base: IntlTeam[], extra: IntlTeam[]) => {
    // Deduplica por NOME e por SHORT — evita que o mesmo clube apareça duas
    // vezes só porque a listagem em `gameData.ts` usa uma grafia diferente
    // (ex.: "PSG" vs "Paris Saint-Germain", "AC Milan" vs "Milan").
    const haveName = new Set(base.map((t) => t.name.toLowerCase()));
    const haveShort = new Set(base.map((t) => t.short.toUpperCase()));
    for (const t of extra) {
      const n = t.name.toLowerCase();
      const s = t.short.toUpperCase();
      if (haveName.has(n) || haveShort.has(s)) continue;
      base.push(t);
      haveName.add(n);
      haveShort.add(s);
    }
  };
  mergeInto(LIBERTADORES_TEAMS, LIBERTADORES_RIVALS);
  mergeInto(SULAMERICANA_TEAMS, SULAMERICANA_RIVALS);
  mergeInto(MUNDIAL_TEAMS, MUNDIAL_RIVALS);
})();

/* ===================== BUFF DE TIMES FRACOS NO MUNDIAL =====================
 * Alguns clubes do Mundial (Ásia, Oceania, África) ficam absurdamente fracos
 * depois das penalidades — vira jogo sem competição. Aplicamos um piso
 * mínimo pra que nenhum time do Mundial fique abaixo de OVR 78. O boost
 * é escalonado: quanto mais fraco, maior o empurrão.
 */
(function buffWeakMundialTeams() {
  const FLOOR = 78;
  const CAP = 92; // não vira gigante — só sai do fundo do poço
  const boostFor = (ovr: number) => {
    if (ovr >= FLOOR) return 0;
    // até +8 pros mais fracos, diminuindo conforme sobe.
    return Math.min(8, FLOOR - ovr);
  };
  const bumpTeam = (t: IntlTeam) => {
    const b = boostFor(t.overall);
    if (b <= 0) return;
    t.overall = Math.min(CAP, t.overall + b);
    if (t.players) {
      for (const p of t.players) p.overall = Math.min(CAP, p.overall + b);
    }
  };
  for (const t of MUNDIAL_TEAMS) bumpTeam(t);
  // MUNDIAL_RIVALS também é usado como fonte pra `freshenIntlSquad` — mantém
  // sincronizado pra que saves antigos vejam os mesmos valores.
  for (const t of MUNDIAL_RIVALS) bumpTeam(t);
})();

/* ===================== TIMES BRASILEIROS NAS COPAS =====================
 * O time brasileiro que aparece na Libertadores/Sul-Americana precisa ser
 * exatamente o mesmo adversário do Brasileirão: elenco real sem reservas +3.
 * No Mundial, esse mesmo time recebe só +1 extra: elenco real sem reservas +4.
 * Isso evita empilhamento de bônus e impede casos como Palmeiras ficar 1 ponto
 * acima na Libertadores antes mesmo de chegar ao Mundial.
 */
(function normalizeBrazilianCupTeams() {
  const cleanKey = (name: string) => name
    .replace(/\s+\([^)]*\)$/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const aliases = new Map<string, string>([
    ["bragantino", "rb bragantino"],
  ]);
  const brTeams = new Map(TEAMS.map((t) => [cleanKey(t.name), t]));
  const clamp = (ovr: number) => Math.max(40, Math.min(99, ovr));

  const applyExactBrasileiraoVersion = (pool: IntlTeam[], delta: number) => {
    for (const t of pool) {
      const key = aliases.get(cleanKey(t.name)) ?? cleanKey(t.name);
      const br = brTeams.get(key);
      if (!br) continue;
      const players = br.players
        .filter((p) => p.reserve === undefined)
        .map((p) => ({ ...p, overall: clamp(p.overall + delta) }));
      t.players = players;
      t.overall = teamOverall(players);
      t.short = br.short;
      t.color = br.color;
    }
  };

  applyExactBrasileiraoVersion(LIBERTADORES_TEAMS, 3);
  applyExactBrasileiraoVersion(SULAMERICANA_TEAMS, 3);
  applyExactBrasileiraoVersion(LIBERTADORES_RIVALS, 3);
  applyExactBrasileiraoVersion(SULAMERICANA_RIVALS, 3);
  applyExactBrasileiraoVersion(MUNDIAL_TEAMS, 4);
  applyExactBrasileiraoVersion(MUNDIAL_RIVALS, 4);
})();

/* Buff +3 OVR nos times NÃO brasileiros da Sul-Americana. Os times brasileiros
 * já receberam +3 acima (applyExactBrasileiraoVersion), então ficam de fora pra
 * não empilhar bônus — o objetivo é equiparar os estrangeiros aos brasileiros. */
(function buffSulamericanaTeams() {
  const clamp = (ovr: number) => Math.max(40, Math.min(99, ovr));
  const cleanKey = (name: string) => name
    .replace(/\s+\([^)]*\)$/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const brKeys = new Set(TEAMS.map((t) => cleanKey(t.name)));
  brKeys.add("bragantino");
  const isBrazilian = (t: IntlTeam) => brKeys.has(cleanKey(t.name));
  const bump = (pool: IntlTeam[]) => {
    for (const t of pool) {
      if (isBrazilian(t)) continue;
      if (t.players && t.players.length) {
        t.players = t.players.map((p) => ({ ...p, overall: clamp(p.overall + 3) }));
        t.overall = teamOverall(t.players);
      } else {
        t.overall = clamp(t.overall + 3);
      }
    }
  };
  bump(SULAMERICANA_TEAMS);
  bump(SULAMERICANA_RIVALS);
})();







/* ===================== TIPOS DE FASE ===================== */

export interface GroupTeam {
  key: string; // id único no grupo (index no array de rivais + PLAYER)
  name: string;
  short: string;
  color: string;
  overall: number;
  isPlayer: boolean;
  played: number; wins: number; draws: number; losses: number; gf: number; ga: number; points: number;
}

export interface GroupState {
  teams: GroupTeam[];             // 4 times do meu grupo
  fixtures: { home: string; away: string }[]; // partidas DO JOGADOR por rodada
  otherFixtures: { home: string; away: string }[]; // partida simultânea dos outros 2 na mesma rodada
  round: number;                  // rodada atual (0..fixtures.length)
}

export interface KOMatch {
  rival: IntlTeam;
  round: number;                  // 0=oitavas,1=quartas,2=semi,3=final
  homeGoals?: number; awayGoals?: number; // agregado (para 2 mãos)
  legs?: { home: number; away: number; playerHome?: boolean }[]; // até 2 pernas
  penaltyWin?: boolean;
  advanced?: boolean;
  thirdPlace?: boolean;           // disputa do 3º lugar (sempre jogo único)
  // Persistir disputa de pênaltis para impedir "re-simular ao atualizar a página".
  shootout?: {
    playerKicks: { name: string; scored: boolean }[];
    rivalKicks: { name: string; scored: boolean }[];
    playerWon: boolean;
  };
}

export interface BracketTeam {
  name: string;
  short: string;
  color: string;
  overall: number;
  isPlayer?: boolean;
  players?: Player[];
}
export interface BracketMatch {
  home?: BracketTeam;
  away?: BracketTeam;
  homeGoals?: number;
  awayGoals?: number;
  winner?: "home" | "away";
  isPlayerMatch?: boolean;
  penalty?: boolean;
  homePen?: number;
  awayPen?: number;
}
export interface BracketState {
  rounds: BracketMatch[][]; // [8, 4, 2, 1]
}

export interface CompState {
  kind: "libertadores" | "sulamericana" | "mundial";
  format: "twoLeg" | "single";
  koFormat: "twoLeg" | "single";
  group: GroupState;
  otherGroups: GroupTeam[][];
  otherGroupsFixtures?: { home: string; away: string }[][][];
  bracket?: BracketState;
  phase: "groups" | "roundOf16" | "quarters" | "semis" | "final" | "done";
  koHistory: KOMatch[];
  currentKO: KOMatch | null;
  eliminated: boolean;
  champion: boolean;
}

type CompetitionKind = CompState["kind"];



/* ===================== HELPERS DE MONTAGEM ===================== */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeGroupTeam(key: string, name: string, short: string, color: string, overall: number, isPlayer = false): GroupTeam {
  return { key, name, short, color, overall, isPlayer, played:0,wins:0,draws:0,losses:0,gf:0,ga:0,points:0 };
}

/**
 * Calendário round-robin para 4 times, mantendo o PLAYER (keys[0]) fixo.
 * Retorna N rodadas com 1 jogo do jogador + 1 jogo dos outros dois em paralelo.
 * `twoLeg = true` duplica as rodadas com mando invertido (ida e volta).
 */
function buildGroupSchedule(
  keys: string[],
  twoLeg: boolean,
): { fixtures: { home: string; away: string }[]; otherFixtures: { home: string; away: string }[] } {
  // método do círculo: PLAYER fixo, os outros 3 rotacionam.
  const rotating = keys.slice(1);
  const fixtures: { home: string; away: string }[] = [];
  const otherFixtures: { home: string; away: string }[] = [];
  for (let r = 0; r < rotating.length; r++) {
    const arr = [keys[0], ...rotating];
    // par (0,3) é o jogo do jogador; par (1,2) é o outro.
    const swap = r % 2 === 1;
    fixtures.push(swap ? { home: arr[3], away: arr[0] } : { home: arr[0], away: arr[3] });
    otherFixtures.push(swap ? { home: arr[2], away: arr[1] } : { home: arr[1], away: arr[2] });
    rotating.unshift(rotating.pop()!);
  }
  if (twoLeg) {
    // returno: mesmas partidas com mandos invertidos.
    const nF = fixtures.length;
    for (let i = 0; i < nF; i++) fixtures.push({ home: fixtures[i].away, away: fixtures[i].home });
    for (let i = 0; i < nF; i++) otherFixtures.push({ home: otherFixtures[i].away, away: otherFixtures[i].home });
  }
  return { fixtures, otherFixtures };
}

/** Sorteia rivais de forma realista por competição:
 *  - Libertadores: só times fortes (top do pool) — 1º-6º das ligas.
 *  - Sul-Americana: faixa intermediária — 7º-12º das ligas (exclui gigantes).
 *  - Mundial: elite global (campeões continentais e grandes clubes).
 *  Ainda embaralha dentro da faixa pra variar temporada a temporada.
 */
function draftRivalsFor(
  kind: "libertadores" | "sulamericana" | "mundial",
  pool: IntlTeam[],
  playerOvr: number,
): IntlTeam[] {
  const sorted = [...pool].sort((a, b) => b.overall - a.overall);
  const N = 31;
  if (kind === "libertadores") {
    // Top 45 do pool, embaralha e pega 31 (garante gigantes + variedade).
    const strong = sorted.slice(0, Math.min(45, sorted.length));
    return shuffle(strong).slice(0, N);
  }
  if (kind === "sulamericana") {
    // Pula os 15 mais fortes (esses vão pra Liberta) e pega faixa média.
    // Se o jogador tem OVR alto, alarga a janela pra baixo pra ter mais times.
    const skip = 15;
    const window = sorted.slice(skip, Math.min(skip + 55, sorted.length));
    // Fallback: se pool for pequeno, complementa com mais fracos.
    const pool2 = window.length >= N ? window : [...window, ...sorted.slice(skip + window.length)];
    return shuffle(pool2).slice(0, N);
  }
  // Mundial: só a elite mundial (top 40).
  void playerOvr;
  const elite = sorted.slice(0, Math.min(40, sorted.length));
  return shuffle(elite).slice(0, N);
}

/** monta a fase de grupos: sorteia 8 grupos de 4, jogador entra em um deles. */
export function buildCompetition(
  kind: "libertadores" | "sulamericana" | "mundial",
  playerName: string,
  playerOvr: number,
): CompState {
  const pool =
    kind === "libertadores" ? LIBERTADORES_TEAMS :
    kind === "sulamericana" ? SULAMERICANA_TEAMS :
    MUNDIAL_TEAMS;

  const rivals = draftRivalsFor(kind, pool, playerOvr);
  const format: "twoLeg" | "single" = kind === "mundial" ? "single" : "twoLeg";
  const koFormat: "twoLeg" | "single" = kind === "mundial" ? "single" : "twoLeg";

  // 8 grupos de 4: player + 3 rivais no grupo 0; restante distribuído.
  const groups: GroupTeam[][] = [];
  const playerGroupRivals = rivals.slice(0, 3);
  const others = rivals.slice(3);

  const playerGroup: GroupTeam[] = [
    makeGroupTeam("PLAYER", playerName, playerShortFromName(playerName), "#facc15", playerOvr, true),
    ...playerGroupRivals.map((t, i) => makeGroupTeam(`P${i}`, t.name, t.short, t.color, t.overall)),
  ];
  groups.push(playerGroup);

  for (let g = 0; g < 7; g++) {
    const slice = others.slice(g * 4, g * 4 + 4);
    groups.push(slice.map((t, i) => makeGroupTeam(`G${g}_${i}`, t.name, t.short, t.color, t.overall)));
  }

  const keys = playerGroup.map((t) => t.key);
  const { fixtures, otherFixtures } = buildGroupSchedule(keys, format === "twoLeg");

  // Fixtures completos (2 jogos/rodada) para cada um dos 7 outros grupos.
  const otherGroupsFixtures: { home: string; away: string }[][][] = [];
  for (let g = 0; g < 7; g++) {
    const gKeys = groups[g + 1].map((t) => t.key);
    otherGroupsFixtures.push(buildFullGroupSchedule(gKeys, format === "twoLeg"));
  }

  return {
    kind,
    format,
    koFormat,
    group: { teams: playerGroup, fixtures, otherFixtures, round: 0 },
    otherGroups: groups.slice(1),
    otherGroupsFixtures,
    phase: "groups",
    koHistory: [],
    currentKO: null,
    eliminated: false,
    champion: false,
  };
}

/** calendário round-robin completo para 4 times (2 jogos por rodada). */
function buildFullGroupSchedule(keys: string[], twoLeg: boolean): { home: string; away: string }[][] {
  const rotating = keys.slice(1);
  const rounds: { home: string; away: string }[][] = [];
  for (let r = 0; r < rotating.length; r++) {
    const arr = [keys[0], ...rotating];
    const swap = r % 2 === 1;
    const m1 = swap ? { home: arr[3], away: arr[0] } : { home: arr[0], away: arr[3] };
    const m2 = swap ? { home: arr[2], away: arr[1] } : { home: arr[1], away: arr[2] };
    rounds.push([m1, m2]);
    rotating.unshift(rotating.pop()!);
  }
  if (twoLeg) {
    const n = rounds.length;
    for (let i = 0; i < n; i++) rounds.push(rounds[i].map((m) => ({ home: m.away, away: m.home })));
  }
  return rounds;
}

/** simula uma rodada (2 jogos) em um grupo qualquer e retorna os times atualizados. */
export function simulateOneGroupRound(
  teams: GroupTeam[],
  fixtures: { home: string; away: string }[][],
  round: number,
  kind?: CompetitionKind,
  variance?: VarianceCtx,
): GroupTeam[] {
  const games = fixtures[round];
  if (!games) return teams;
  let out = teams;
  for (const g of games) {
    const home = out.find((t) => t.key === g.home);
    const away = out.find((t) => t.key === g.away);
    if (!home || !away) continue;
    const { hg, ag } = kind ? simulateRealTeamScore(kind, home, away, false, variance) : matchScore(home.overall, away.overall);
    out = out.map((t) => applyMatch(t, home.key, away.key, hg, ag));
  }
  return out;
}

/** avança 1 rodada em todos os 7 outros grupos.
 * Se `otherGroupsFixtures` não existir (save antigo), constrói agora.
 * Se algum grupo estiver atrasado em rodadas (played < round), faz catch-up. */
export function simulateAllOtherGroupsRound(
  comp: CompState,
  round: number,
  variance?: VarianceCtx,
): { otherGroups: GroupTeam[][]; otherGroupsFixtures: { home: string; away: string }[][][] } {
  const twoLeg = comp.format === "twoLeg";
  const fixtures =
    comp.otherGroupsFixtures && comp.otherGroupsFixtures.length === comp.otherGroups.length
      ? comp.otherGroupsFixtures
      : comp.otherGroups.map((g) => buildFullGroupSchedule(g.map((t) => t.key), twoLeg));
  const updated = comp.otherGroups.map((teams, i) => {
    let out = teams;
    // catch-up: simula todas as rodadas 0..round que ainda não foram jogadas.
    const startRound = Math.max(...out.map((t) => t.played), 0);
    for (let r = startRound; r <= round; r++) {
      out = simulateOneGroupRound(out, fixtures[i], r, comp.kind, variance);
    }
    return out;
  });
  return { otherGroups: updated, otherGroupsFixtures: fixtures };
}



/** simula a partida simultânea dos outros dois times do grupo (a que roda em paralelo com a partida do jogador na rodada atual). */
export function simulateGroupOthersRound(group: GroupState, kind?: CompetitionKind, variance?: VarianceCtx): GroupState {
  const cur = group.otherFixtures?.[group.round];
  if (!cur) return group;
  const home = group.teams.find((t) => t.key === cur.home);
  const away = group.teams.find((t) => t.key === cur.away);
  if (!home || !away) return group;
  const { hg, ag } = kind ? simulateRealTeamScore(kind, home, away, false, variance) : matchScore(home.overall, away.overall);
  const teams = group.teams.map((t) => applyMatch(t, home.key, away.key, hg, ag));
  return { ...group, teams };
}

/** aplica placar de um jogo ao registro de um time (se for um dos participantes). */
function applyMatch(t: GroupTeam, homeKey: string, awayKey: string, hg: number, ag: number): GroupTeam {
  if (t.key !== homeKey && t.key !== awayKey) return t;
  const isHome = t.key === homeKey;
  const own = isHome ? hg : ag;
  const opp = isHome ? ag : hg;
  const w = own > opp ? 1 : 0;
  const d = own === opp ? 1 : 0;
  const l = own < opp ? 1 : 0;
  return {
    ...t,
    played: t.played + 1,
    wins: t.wins + w,
    draws: t.draws + d,
    losses: t.losses + l,
    gf: t.gf + own,
    ga: t.ga + opp,
    points: t.points + w * 3 + d,
  };
}

export function applyPlayerMatchToGroup(group: GroupState, playerKey: string, oppKey: string, playerGoals: number, oppGoals: number): GroupState {
  const teams = group.teams.map((t) => applyMatch(t, playerKey, oppKey, playerGoals, oppGoals));
  return { ...group, teams, round: group.round + 1 };
}

/** placar aleatório entre dois overalls (Poisson-like) com trava anti-goleada
 * simétrica: se o favorito (gap ≥ 10) perder, o azarão não pode marcar mais
 * do que placar do favorito + 2 (gap 10-13) ou +1 (gap 14+). Assim, um time
 * 71 pode aprontar contra um 88, mas não vence de 5x0. Favorito goleando
 * (i.e. vencendo) continua livre. */
export function matchScore(homeOvr: number, awayOvr: number, neutral: boolean = false): { hg: number; ag: number } {
  const homeAdv = neutral ? 0 : 1.5;
  // Clamp largo (±25) para que cada ponto entre 70 e 99 realmente pese no lambda.
  const diff = Math.max(-25, Math.min(25, homeOvr + homeAdv - awayOvr));
  // Base simétrica: mando já entra via `diff` (contendo homeAdv). Assimetria
  // extra causava viés pró-mandante mesmo em jogos neutros.
  const homeBase = 1.3 + (neutral ? 0 : 0.1);
  const awayBase = 1.3 - (neutral ? 0 : 0.1);
  const hL = Math.max(0.22, homeBase + diff * 0.065 + (Math.random() - 0.5) * 0.40);
  const aL = Math.max(0.22, awayBase - diff * 0.065 + (Math.random() - 0.5) * 0.40);
  let hg = pois(hL);
  let ag = pois(aL);
  const strengthGap = homeOvr + homeAdv - awayOvr;
  const gap = Math.abs(strengthGap);
  if (gap >= 8) {
    const favHome = strengthGap > 0;
    const favGoals = favHome ? hg : ag;
    const undGoals = favHome ? ag : hg;
    if (undGoals > favGoals) {
      // Margem contínua: cada ponto de gap reduz suavemente a zebra possível.
      const cap = Math.max(1, Math.round(4 - (gap - 8) / 6));
      const capped = Math.min(undGoals, favGoals + cap, 3);
      if (favHome) ag = capped; else hg = capped;
    }
  }
  return { hg, ag };
}
function pois(l: number): number {
  const L = Math.exp(-l);
  let k = 0, p = 1;
  while (p > L && k < 8) { k++; p *= Math.random(); }
  return Math.max(0, k - 1);
}


/** ordena um grupo pelas regras clássicas (pontos → SG → GP). */
export function sortGroup(teams: GroupTeam[]): GroupTeam[] {
  return [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const sd = (b.gf - b.ga) - (a.gf - a.ga);
    if (sd !== 0) return sd;
    return b.gf - a.gf;
  });
}

/** classificação do jogador no grupo (1..4). */
export function playerPositionInGroup(group: GroupState): number {
  const sorted = sortGroup(group.teams);
  return sorted.findIndex((t) => t.isPlayer) + 1;
}

/** true se o jogador se classificou de acordo com o formato (top 2 nos 3 torneios; para Sula, 1º direto e 2º via playoff — aqui exigimos top 2 para prosseguir). */
export function playerAdvancedFromGroups(state: CompState): boolean {
  const pos = playerPositionInGroup(state.group);
  return pos <= 2;
}

/** rótulos das fases de mata-mata. */
export function koLabels(): string[] {
  return ["Oitavas de final", "Quartas de final", "Semifinal", "Final"];
}

function poolFor(kind: CompetitionKind): IntlTeam[] {
  return kind === "libertadores" ? LIBERTADORES_TEAMS : kind === "sulamericana" ? SULAMERICANA_TEAMS : MUNDIAL_TEAMS;
}

function fullIntlTeam(kind: CompetitionKind, name: string): IntlTeam | undefined {
  return poolFor(kind).find((t) => t.name === name);
}

function toBracketTeam(kind: CompetitionKind, t: GroupTeam | IntlTeam): BracketTeam {
  const full = fullIntlTeam(kind, t.name);
  const raw = full?.players ?? ("players" in t ? t.players : undefined);
  // Reservas só existem no draft do jogador; times da IA nunca as usam.
  const players = raw ? raw.filter((p) => p.reserve === undefined) : undefined;
  return {
    name: t.name,
    short: t.short,
    color: t.color,
    overall: t.overall,
    isPlayer: "isPlayer" in t ? t.isPlayer : false,
    players,
  };
}

function simulateRealTeamScore(
  kind: CompetitionKind,
  home: GroupTeam | BracketTeam,
  away: GroupTeam | BracketTeam,
  neutral = false,
  variance?: VarianceCtx,
): { hg: number; ag: number } {
  const homeIsPlayer = "isPlayer" in home && home.isPlayer === true;
  const awayIsPlayer = "isPlayer" in away && away.isPlayer === true;
  let homeSquad = ("players" in home ? home.players : undefined) ?? fullIntlTeam(kind, home.name)?.players;
  let awaySquad = ("players" in away ? away.players : undefined) ?? fullIntlTeam(kind, away.name)?.players;
  const hDelta = deltaFor(variance, home.name, homeIsPlayer);
  const aDelta = deltaFor(variance, away.name, awayIsPlayer);
  if (hDelta && homeSquad) homeSquad = applyOvrDelta(homeSquad, hDelta);
  if (aDelta && awaySquad) awaySquad = applyOvrDelta(awaySquad, aDelta);
  const homeOvr = Math.max(1, Math.min(99, home.overall + hDelta));
  const awayOvr = Math.max(1, Math.min(99, away.overall + aDelta));
  const result = simulateMatch(
    home.name,
    home.short,
    home.color,
    homeOvr,
    away.name,
    away.short,
    away.color,
    awayOvr,
    false,
    homeSquad,
    awaySquad,
    undefined,
    undefined,
    neutral,
  );
  return { hg: result.homeGoals, ag: result.awayGoals };
}

/** Fallback para saves antigos sem chaveamento: define um rival simulando uma mini-chave real. */
export function nextKORival(state: CompState, playerOvr: number, variance?: VarianceCtx): IntlTeam {
  const pool = poolFor(state.kind);
  const usedNames = new Set([
    ...state.group.teams.map((t) => t.name),
    ...state.koHistory.map((k) => k.rival.name),
  ]);
  const remaining = pool.filter((t) => !usedNames.has(t.name));
  if (remaining.length) {
    // Pega até 16 candidatos e deixa eles jogarem entre si; quem chega vivo
    // vira o rival. O OVR nunca é rebaixado/subido artificialmente.
    let bracket = shuffle(remaining).slice(0, Math.min(16, remaining.length));
    while (bracket.length > 1) {
      const winners: IntlTeam[] = [];
      for (let i = 0; i < bracket.length; i += 2) {
        const a = bracket[i];
        const b = bracket[i + 1];
        if (!b) { winners.push(a); continue; }
        const score = simulateRealTeamScore(state.kind, toBracketTeam(state.kind, a), toBracketTeam(state.kind, b), true, variance);
        if (score.hg > score.ag) winners.push(a);
        else if (score.ag > score.hg) winners.push(b);
        else winners.push(resolvePenaltyWinner(toBracketTeam(state.kind, a), toBracketTeam(state.kind, b), state.kind).winner === "home" ? a : b);
      }
      bracket = winners;
    }
    return bracket[0];
  }
  // Fallback extremo: nenhum time restante. Escolhe do pool completo evitando repetir a última rodada.
  const lastRival = state.koHistory[state.koHistory.length - 1]?.rival.name;
  const fallback = pool.filter((t) => t.name !== lastRival);
  return fallback[Math.floor(Math.random() * fallback.length)] ?? pool[0];
}

/* ========== CHAVEAMENTO MATA-MATA (bracket) ========== */

/** simula um confronto real do bracket e propaga o vencedor para o próximo round. */
function simBracketMatch(bracket: BracketState, roundIdx: number, matchIdx: number, koFormat: "twoLeg" | "single", kind: CompetitionKind, variance?: VarianceCtx) {
  const m = bracket.rounds[roundIdx][matchIdx];
  if (!m || !m.home || !m.away || m.winner) return;
  const twoLeg = koFormat === "twoLeg" && roundIdx < 3;
  let hg: number, ag: number;
  if (twoLeg) {
    const l1 = simulateRealTeamScore(kind, m.home, m.away, false, variance);
    const l2 = simulateRealTeamScore(kind, m.away, m.home, false, variance);
    hg = l1.hg + l2.ag;
    ag = l1.ag + l2.hg;
  } else {
    // Jogo único (final de Liberta/Sul, todas as fases do Mundial, disputa 3º lugar): campo neutro.
    const s = simulateRealTeamScore(kind, m.home, m.away, true, variance);
    hg = s.hg; ag = s.ag;
  }
  let winner: "home" | "away";
  let penalty = false;
  let homePen: number | undefined;
  let awayPen: number | undefined;
  if (hg > ag) winner = "home";
  else if (ag > hg) winner = "away";
  else {
    const pens = resolvePenaltyWinner(m.home, m.away, kind);
    winner = pens.winner;
    penalty = true;
    homePen = pens.homePen;
    awayPen = pens.awayPen;
  }
  m.homeGoals = hg;
  m.awayGoals = ag;
  m.winner = winner;
  m.penalty = penalty;
  m.homePen = homePen;
  m.awayPen = awayPen;
  if (roundIdx + 1 < bracket.rounds.length) {
    const nextIdx = Math.floor(matchIdx / 2);
    const slot: "home" | "away" = matchIdx % 2 === 0 ? "home" : "away";
    bracket.rounds[roundIdx + 1][nextIdx][slot] = winner === "home" ? m.home : m.away;
  }
}

function resolvePenaltyWinner(home: BracketTeam, away: BracketTeam, kind: CompetitionKind): { winner: "home" | "away"; homePen: number; awayPen: number } {
  const homeSquad = home.players ?? fullIntlTeam(kind, home.name)?.players ?? [];
  const awaySquad = away.players ?? fullIntlTeam(kind, away.name)?.players ?? [];
  const gk = (squad: Player[], fallback: number) => squad.find((p) => p.position === "GOL")?.overall ?? fallback;
  const kickers = (squad: Player[], fallback: number) => {
    const ks = squad.filter((p) => p.position !== "GOL").sort((a, b) => b.overall - a.overall);
    return ks.length ? ks : [{ name: "Batedor", position: "MEI" as Position, overall: fallback }];
  };
  const prob = (kickerOvr: number, gkOvr: number) => Math.max(0.22, Math.min(0.96, 0.75 + (kickerOvr - 78) * 0.011 - (gkOvr - 78) * 0.013));
  const hk = kickers(homeSquad, home.overall);
  const ak = kickers(awaySquad, away.overall);
  const hGk = gk(homeSquad, home.overall);
  const aGk = gk(awaySquad, away.overall);
  let homePen = 0, awayPen = 0, i = 0;
  while (true) {
    if (Math.random() < prob(hk[i % hk.length].overall, aGk)) homePen++;
    if (i < 5 && awayPen + (5 - i) < homePen) break;
    if (Math.random() < prob(ak[i % ak.length].overall, hGk)) awayPen++;
    if (i < 5 && homePen + (4 - i) < awayPen) break;
    i++;
    if (i >= 5 && homePen !== awayPen) break;
    if (i > 20) break;
  }
  return { winner: homePen >= awayPen ? "home" : "away", homePen, awayPen };
}

/** monta a chave de 16 (top 2 de cada grupo). Jogador sempre no primeiro confronto visual. */
export function buildBracket(
  comp: CompState,
  playerName: string,
  playerShort: string,
  playerColor: string,
  playerOvr: number,
  playerSquad?: Player[],
  variance?: VarianceCtx,
): { bracket: BracketState; firstRival: BracketTeam } {
  const player: BracketTeam = { name: playerName, short: playerShort, color: playerColor, overall: playerOvr, isPlayer: true, players: playerSquad };
  // 1ºs e 2ºs de cada grupo (grupo 0 = do jogador). Evita reencontro na 1ª fase.
  type Seeded = { team: BracketTeam; group: number };
  const firsts: Seeded[] = [];
  const seconds: Seeded[] = [];
  const myGroup = sortGroup(comp.group.teams);
  if (myGroup[0]) firsts.push({ team: myGroup[0].isPlayer ? player : toBracketTeam(comp.kind, myGroup[0]), group: 0 });
  if (myGroup[1]) seconds.push({ team: myGroup[1].isPlayer ? player : toBracketTeam(comp.kind, myGroup[1]), group: 0 });
  comp.otherGroups.forEach((g, idx) => {
    const s = sortGroup(g);
    if (s[0]) firsts.push({ team: toBracketTeam(comp.kind, s[0]), group: idx + 1 });
    if (s[1]) seconds.push({ team: toBracketTeam(comp.kind, s[1]), group: idx + 1 });
  });
  while (firsts.length < 8) firsts.push({ team: { name: `Time ${firsts.length}A`, short: `T${firsts.length}A`, color: "#333", overall: 74 }, group: 90 + firsts.length });
  while (seconds.length < 8) seconds.push({ team: { name: `Time ${seconds.length}B`, short: `T${seconds.length}B`, color: "#333", overall: 74 }, group: 80 + seconds.length });
  // Sorteia vencedores x segundos colocados, sem repetir time do mesmo grupo nas oitavas.
  // Tentativas aleatórias + fallback determinístico para não deixar par inválido.
  let pairs = firsts.map((f, i) => ({ f, s: seconds[i] }));
  for (let attempt = 0; attempt < 80; attempt++) {
    const shuffled = seconds.slice().sort(() => Math.random() - 0.5);
    const candidate = firsts.map((f, i) => ({ f, s: shuffled[i] }));
    if (candidate.every((p) => p.f.group !== p.s.group)) { pairs = candidate; break; }
  }
  if (pairs.some((p) => p.f.group === p.s.group)) {
    const remaining = seconds.slice();
    pairs = firsts.map((f) => {
      let idx = remaining.findIndex((s) => s.group !== f.group);
      if (idx < 0) idx = 0;
      const [s] = remaining.splice(idx, 1);
      return { f, s };
    });
  }
  // Jogador sempre no confronto 0; o restante fica embaralhado.
  const playerPairIdx = pairs.findIndex((p) => p.f.team.isPlayer || p.s.team.isPlayer);
  const [playerPair] = playerPairIdx >= 0 ? pairs.splice(playerPairIdx, 1) : pairs.splice(0, 1);
  const restPairs = pairs.sort(() => Math.random() - 0.5);
  const r16: BracketMatch[] = [];
  {
    const h = Math.random() < 0.5;
    r16.push({ home: h ? playerPair.f.team : playerPair.s.team, away: h ? playerPair.s.team : playerPair.f.team, isPlayerMatch: true });
  }
  for (const p of restPairs) {
    const h = Math.random() < 0.5;
    r16.push({ home: h ? p.f.team : p.s.team, away: h ? p.s.team : p.f.team });
  }
  const bracket: BracketState = {
    rounds: [
      r16,
      Array.from({ length: 4 }, (_, i) => ({ isPlayerMatch: i === 0 } as BracketMatch)),
      Array.from({ length: 2 }, (_, i) => ({ isPlayerMatch: i === 0 } as BracketMatch)),
      [{ isPlayerMatch: true } as BracketMatch],
    ],
  };
  // Pré-simula os outros 7 jogos das oitavas para revelar rivais futuros
  for (let i = 1; i < 8; i++) simBracketMatch(bracket, 0, i, comp.koFormat, comp.kind, variance);
  const firstRival = (r16[0].home?.isPlayer ? r16[0].away : r16[0].home) as BracketTeam;
  return { bracket, firstRival };
}

/** aplica o resultado do jogo do jogador na chave e pré-simula o próximo round. */
export function applyPlayerBracketResult(
  bracket: BracketState,
  roundIdx: number,
  playerAgg: number,
  rivalAgg: number,
  playerWon: boolean,
  penalty: boolean,
  koFormat: "twoLeg" | "single",
  kind: CompetitionKind,
  playerPen?: number,
  rivalPen?: number,
  variance?: VarianceCtx,
): BracketState {
  const b: BracketState = { rounds: bracket.rounds.map((r) => r.map((m) => ({ ...m }))) };
  const m = b.rounds[roundIdx][0];
  const playerSide: "home" | "away" = m.home?.isPlayer ? "home" : m.away?.isPlayer ? "away" : "home";
  const rivalSide: "home" | "away" = playerSide === "home" ? "away" : "home";
  m.homeGoals = playerSide === "home" ? playerAgg : rivalAgg;
  m.awayGoals = playerSide === "away" ? playerAgg : rivalAgg;
  m.winner = playerWon ? playerSide : rivalSide;
  m.penalty = penalty;
  if (penalty && playerPen !== undefined && rivalPen !== undefined) {
    m.homePen = playerSide === "home" ? playerPen : rivalPen;
    m.awayPen = playerSide === "away" ? playerPen : rivalPen;
  }
  if (roundIdx + 1 < b.rounds.length) {
    const winnerTeam = m.winner === "home" ? m.home : m.away;
    b.rounds[roundIdx + 1][0].home = winnerTeam;
    for (let i = 1; i < b.rounds[roundIdx + 1].length; i++) simBracketMatch(b, roundIdx + 1, i, koFormat, kind, variance);
  }
  if (!playerWon) {
    for (let r = roundIdx + 1; r < b.rounds.length; r++) {
      for (let i = 0; i < b.rounds[r].length; i++) simBracketMatch(b, r, i, koFormat, kind, variance);
    }
  }
  return b;
}

/** retorna o rival do jogador para o próximo round, se já definido no bracket. */
export function playerNextBracketRival(bracket: BracketState, nextRound: number): BracketTeam | undefined {
  const m = bracket.rounds[nextRound]?.[0];
  if (!m) return undefined;
  return m.home?.isPlayer ? m.away : m.home;
}

/** retorna o perdedor da OUTRA semifinal (o outro semifinalista eliminado, que enfrentará o jogador no 3º lugar). */
export function otherSemiLoser(bracket: BracketState): BracketTeam | undefined {
  const semi = bracket.rounds[2];
  if (!semi) return undefined;
  // Match idx 0 é do jogador; idx 1 é a outra semi (já pré-simulada).
  const other = semi[1];
  if (!other || !other.winner) return undefined;
  return other.winner === "home" ? other.away : other.home;
}
