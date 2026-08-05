/* =========================================================================
   GELECA — puzzle-platformer de gosma. Pular custa MASSA: cada pulo solta um
   pedaço que vira bloco sólido. Empilhe torres, reabsorva (E), colete gosmas,
   escale paredes, pegue plataformas móveis. Menu com fases, estrelas e
   progresso salvo. Canvas 2D puro, sem backend.
   ========================================================================= */
"use strict";

// -------------------------------------------------------------------------- FÍSICA
const TILE=32, GRAVITY=1700, MOVE=200, AIR=0.78, JUMP_V=600, CLIMB=150,
      GLOB=26, REABSORB_R=10, MAX_FALL=900, MELT_TIME=0.9, BOUNCE=1000, GEM_REVEAL=26, CLIMB_MELT=1.3,
      COYOTE=0.10, JUMPBUF=0.12, LOOKAHEAD=64;   // game-feel: coyote time, buffer de pulo, câmera look-ahead
let hitStop=0;                                    // micro-pausa nos impactos (hit-stop)
function hitstop(t){ if(t>hitStop)hitStop=t; }

// câmera responsiva com ZOOM: o canvas preenche a tela e mostra ~N tiles (zoom in).
const cam={ x:0, y:0, look:0 };
let zoom=2, camViewW=640, camViewH=384, camSafeBottom=0;   // camViewW/H = px do MUNDO visíveis; camSafeBottom = faixa reservada p/ controles

// temas de cor por "mundo": fundo (parallax) + tiles
// amb = ambiente (partículas): 'spore'(sobe) 'ember'(sobe/fogo) 'snow'(desce) 'spark'(flutua) 'dust'(desce)
// deco = silhueta característica: 'hill' 'peak' 'crystal' 'berg' 'stalac' 'chunk'
const THEMES={
  cave:  { sky0:"#123033", sky1:"#0c2024", mote:"126,224,107", tile:"#274036", tilehi:"#365a48",
           top:"#4a9a5a", top2:"#63c878", far:"#183a34", mid:"#20503f", cloud:"170,220,180", amb:"spore", deco:"stalac", glow:null },
  deep:  { sky0:"#101a34", sky1:"#0a1020", mote:"120,170,255", tile:"#20304f", tilehi:"#2e4470",
           top:"#3a6aa0", top2:"#4f8fd0", far:"#161f3e", mid:"#1e2f5a", cloud:"140,170,230", amb:"spark", deco:"crystal", glow:null },
  forge: { sky0:"#3a1c10", sky1:"#1e0f08", mote:"255,160,80",  tile:"#3a271b", tilehi:"#5a3d28",
           top:"#a05a3a", top2:"#d07a4a", far:"#2a160c", mid:"#41210f", cloud:"230,150,110", amb:"ember", deco:"peak", glow:"255,90,20" },
  ice:   { sky0:"#173846", sky1:"#0e222e", mote:"170,230,255", tile:"#254048", tilehi:"#356470",
           top:"#3f8fa8", top2:"#5fc0d8", far:"#12303c", mid:"#1c4653", cloud:"200,235,255", amb:"snow", deco:"peak", glow:null },
  void:  { sky0:"#1a1030", sky1:"#0a0518", mote:"200,150,255", tile:"#2a1c44", tilehi:"#3d2a63",
           top:"#7a4fd0", top2:"#a06ff0", far:"#160c2c", mid:"#241542", cloud:"180,140,240", amb:"spark", deco:"chunk", glow:"150,90,240" },
  glacier:{ sky0:"#20455c", sky1:"#0f2838", mote:"210,245,255", tile:"#3a5566", tilehi:"#547a90",
           top:"#8fd8ee", top2:"#c0f0ff", far:"#173845", mid:"#245266", cloud:"225,245,255", amb:"snow", deco:"berg", glow:"150,225,255" },
  // MUNDO 1 — Vale Verdejante (tema coeso das 15 primeiras fases)
  grove: { sky0:"#1c3d2a", sky1:"#0a1c14", mote:"170,225,160", tile:"#4a3a26", tilehi:"#6b5334",
           top:"#5ec457", top2:"#8bec7c", far:"#153020", mid:"#1e4a32", cloud:"180,235,185", amb:"fireflies", deco:"grove", glow:"120,190,110", art:"vale" },
};
// ARTE de parallax por IA (Mundo 1 · Vale) — 3 camadas PNG (já com alfa de verdade, transparência
// assada no arquivo). Sem getImageData/runtime — funciona em qualquer host.
const BG={}; ["ceu","montanhas","floresta"].forEach(n=>{ try{ const im=new Image(); im.src=n+".png"; BG[n]=im; }catch(e){} });
function imgOk(im){ return im && im.complete && im.naturalWidth>0; }
function groveArtReady(){ return imgOk(BG.ceu) && imgOk(BG.montanhas) && imgOk(BG.floresta); }

// -------------------------------------------------------------------------- FASES
// #=sólido @=início E=saída ^=espinho o=gosma P=placa D=porta H=calor I=GELO(escorrega)
// *=estrela VISÍVEL (coletável)
// S=parede FANTASMA (parece sólida, atravessa)  g=fantasma COM gema secreta dentro (Fez: invisível até entrar)
// G=gema solta invisível  C=desmorona  T=mola
// movers: plataformas móveis [{x,y,w,axis,dist,speed,phase}] (tiles)
// enemies: [{x,y,type:'patrol'|'chaser'|'boss',dist,speed,axis,range,delay}] — chaser/boss caçam; todos barrados por paredes
// LEVELS com secret:true = fase oculta (só destrava achando TODOS os segredos)
const LEVELS = [
  { name:"1 · Vale", mass:9, max:9, theme:"grove",
    hint:"", rows:[
    "##########################################################",
    "#                                                        #",
    "#                                                        #",
    "#                                                        #",
    "#                                                        #",
    "#                                                        #",
    "#                                                        #",
    "#                                                        #",
    "#                                                        #",
    "# ####                                                   #",
    "##SgSS                          *                        #",
    "##SSSS                        #####                      #",
    "# ####                                                   #",
    "#            ####                                        #",
    "#                   o                         o          #",
    "#@                                                    E  #",
    "########################   #############   ###############",
    "########################   #############   ###############",
    "########################^^^#############^^^###############"]},

  { name:"2 · Colinas", mass:9, max:9, theme:"grove",
    hint:"Suba os morros e cruze a ponte rachada CORRENDO — ela desmorona. O cume do morro talvez tenha uma passagem pra cima.", rows:[
    "################################################################",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                   ###                                        #",
    "#                  #SgS#                                       #",
    "#                  #SSS#                                       #",
    "#                   SSS                                        #",
    "#                                                              #",
    "#                     *                                        #",
    "#               #############                                  #",
    "#             ##             ##                                #",
    "#           ##                 ##                           E  #",
    "# @       ##        o            ##           CCCCCCCCC        #",
    "#       ##                         ##                          #",
    "#########################################    ###################",
    "#########################################    ###################",
    "#########################################^^^^###################"],
    enemies:[{"x":50,"y":16,"dist":4,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"3 · Grutas", mass:10, max:10, theme:"grove",
    hint:"Desça o poço com calma: pule perto da parede e SEGURE contra ela pra grudar e frear. Reabsorva pedaços (PEGAR) pra reabastecer.", rows:[
    "##################################",
    "#                                #",
    "#                                #",
    "#                                #",
    "#                                #",
    "# @                              #",
    "######                           #",
    "#                                #",
    "#                       o        #",
    "#                   ########     #",
    "#                                #",
    "#                                #",
    "#        o                       #",
    "#     #########                  #",
    "#                                #",
    "#                                #",
    "#                     SSS*       #",
    "#                   ##SgS####    #",
    "#                    #SSS#       #",
    "#                     ###        #",
    "#                                #",
    "#     ########                   #",
    "#                                #",
    "#                                #",
    "#                                #",
    "#                                #",
    "#                            E   #",
    "###############     ##############",
    "###############     ##############",
    "###############^^^^^##############"],
    enemies:[{"x":23,"y":26,"dist":5,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"4 · Paredão", mass:11, max:11, theme:"grove",
    hint:"O PAREDÃO: grude e ESCALE (gasta massa aos poucos — reabasteça e não durma na parede). Dica secreta: 4 gelecas num quadrado 2x2 viram um TRAMPOLIM.", rows:[
    "##########################",
    "#                        #",
    "#                        #",
    "#                        #",
    "#                        #",
    "#       E                #",
    "#  ########              #",
    "#                        #",
    "#            #           #",
    "#            #     o     #",
    "#            #  #######  #",
    "#            ####        #",
    "#            SSgS#       #",
    "#     *      SSSS#       #",
    "#     o      ####        #",
    "#  ########  #           #",
    "#            #           #",
    "#            #           #",
    "#            #           #",
    "#            #     o     #",
    "#            #  #######  #",
    "#            #           #",
    "#            #           #",
    "#     o      #           #",
    "#  #######   #           #",
    "#            #           #",
    "# @          #           #",
    "#            #^^^^^^^^^  #",
    "##########################",
    "##########################"],
    movers:[{"x":15,"y":8,"w":3,"axis":"x","dist":4,"speed":0.45,"phase":0}],
    enemies:[{"x":4,"y":23,"dist":4,"speed":0.85,"axis":"x","type":"patrol"}]},

  { name:"5 · A Ponte", mass:6, max:6, theme:"grove",
    hint:"Molas (⇑) te lançam por cima dos abismos e plataformas móveis fazem a travessia. Mire bem os saltos — e olho no que há SOB as plataformas.", rows:[
    "########################################################################",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#              CCCCC             *                                     #",
    "#                                                                      #",
    "#                                                      SSS             #",
    "#                                                     #SgS###          #",
    "#                        o                   o        #SSS#            #",
    "# @                                                    ###           E #",
    "#       T                 # T                 # T                      #",
    "##########               #####               #####             #########",
    "##########               #####               #####             #########",
    "##########^^^^^^^^^^^^^^^#####^^^^^^^^^^^^^^^#####^^^^^^^^^^^^^#########"],
    movers:[{"x":11,"y":14,"w":3,"axis":"x","dist":11,"speed":0.6,"phase":0},{"x":31,"y":14,"w":3,"axis":"x","dist":11,"speed":0.55,"phase":1},{"x":51,"y":13,"w":3,"axis":"x","dist":9,"speed":0.7,"phase":0.4}],
    enemies:[{"x":36,"y":16,"speed":1,"type":"chaser","range":8}]},

  { name:"6 · Forja", mass:8, max:8, theme:"grove",
    hint:"Deixe um pedaço na PLACA pra abrir a PORTA. O 🔥 calor derrete sua massa — atravesse rápido e reabasteça nas gosmas.", rows:[
    "##############################################################",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#  ######  D                            *                    #",
    "#          D                          #####                  #",
    "#          D                                 ###             #",
    "#          D                                #SgS#            #",
    "# @        D      o                  o       SSS  o        E #",
    "#          D         HHHHHHHHHHHHH                           #",
    "######P#####################################   ###############",
    "############################################   ###############",
    "############################################^^^###############"],
    enemies:[{"x":40,"y":15,"dist":4,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"7 · Guarida", mass:7, max:7, theme:"grove",
    hint:"Guardiões patrulham; alguns ACORDAM e te CAÇAM — fuja pra longe pra despistar. Dica secreta: toque numa geleca solta pra TROCAR de corpo com ela e alcançar lugares altos.", rows:[
    "##################################################################",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                             *              ###                 #",
    "#                         #########         #SgS#                #",
    "#                                            SSS                 #",
    "#             o                               o                  #",
    "#         #########                       #########              #",
    "#                                                                #",
    "#                                                                #",
    "# @                                                           E  #",
    "####################    ##############################    ########",
    "####################    ##############################    ########",
    "####################^^^^##############################^^^^########"],
    enemies:[{"x":14,"y":12,"dist":6,"speed":0.9,"axis":"x","type":"patrol"},{"x":46,"y":12,"dist":6,"speed":1,"axis":"x","type":"patrol"},{"x":33,"y":16,"speed":1.15,"type":"chaser","range":9}]},

  { name:"8 · O Ápice", mass:9, max:9, theme:"grove",
    hint:"Metade do caminho! Molas, calor, ponte frágil e guardiões — tudo junto. Talvez haja um mezanino escondido no teto.", rows:[
    "####################################################################################",
    "#                                                                                  #",
    "#                                                                                  #",
    "#                                                                                  #",
    "#                                                                                  #",
    "#                                                                                  #",
    "#                                                     ###                          #",
    "#                                                    #SgS#                         #",
    "#                                                     SSS                          #",
    "#                                                      *                           #",
    "#                                                   #######                        #",
    "#                                                                                  #",
    "#         *                                                                        #",
    "#       #####                                                             #######  #",
    "#                             o                             o                      #",
    "#                                                   CCCCCCC                        #",
    "#                                                                                  #",
    "#                         o                                                        #",
    "# @                 T       HHHHHHHHH        T                    T              E #",
    "################         ###############          ############         #############",
    "################         ###############          ############         #############",
    "################^^^^^^^^^###############^^^^^^^^^^############^^^^^^^^^#############"],
    movers:[{"x":16,"y":17,"w":4,"axis":"x","dist":7,"speed":0.6,"phase":0},{"x":40,"y":17,"w":4,"axis":"x","dist":8,"speed":0.65,"phase":0.5},{"x":62,"y":17,"w":4,"axis":"x","dist":7,"speed":0.7,"phase":0.3}],
    enemies:[{"x":55,"y":9,"dist":3,"speed":1,"axis":"x","type":"patrol"},{"x":30,"y":18,"speed":1.1,"type":"chaser","range":8}]},

  { name:"9 · Clareira", mass:9, max:9, theme:"grove",
    hint:"Uma clareira aberta cortada por um abismo. Pegue CARONA nas plataformas móveis (uma sobe e desce) pra atravessar — pule no tempo certo.", rows:[
    "######################################################################",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                  *                                 #",
    "#                                #####                               #",
    "#                                 ###                                #",
    "#     o #                        #SgS#                       #o      #",
    "#    ######                       SSS                      ######    #",
    "#       #                                                    #       #",
    "#       #                                                    #       #",
    "#       #                                                    #       #",
    "#       #                                                    #       #",
    "# @     #                                                    #     E #",
    "##############                                           #############",
    "##############                                           #############",
    "##############^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^#############"],
    movers:[{"x":14,"y":13,"w":4,"axis":"x","dist":12,"speed":0.55,"phase":0},{"x":40,"y":13,"w":4,"axis":"x","dist":13,"speed":0.6,"phase":0.6},{"x":30,"y":9,"w":3,"axis":"y","dist":5,"speed":0.5,"phase":0}],
    enemies:[{"x":35,"y":16,"speed":1.05,"type":"chaser","range":9}]},

  { name:"10 · Ramagem", mass:7, max:7, theme:"grove",
    hint:"Suba pela COPA quicando nas molas (⇑). Encadeie os saltos e mire as plataformas — a saída fica lá no alto.", rows:[
    "####################################################",
    "#                                                  #",
    "#                                                  #",
    "#                                                  #",
    "#                                                  #",
    "#                                     SSS   E      #",
    "#                                    #SgS######    #",
    "#                            o       #SSS#         #",
    "#                         ########    ###          #",
    "#                                                  #",
    "#                                                  #",
    "#                                                  #",
    "#                  o          T                    #",
    "#               #######                            #",
    "#                                                  #",
    "#                                                  #",
    "#                                                  #",
    "#         *         T                              #",
    "#     #######                                      #",
    "#                                                  #",
    "#                                                  #",
    "# @                                                #",
    "#       T                                          #",
    "########################     #######################",
    "########################     #######################",
    "########################^^^^^#######################"],
    enemies:[{"x":27,"y":7,"dist":4,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"11 · Cipoal", mass:8, max:8, theme:"grove",
    hint:"Cipós! Vá até a parede, GRUDE (segure contra ela) e ESCALE — use as saliências pra descansar e reabastecer. A saída fica no topo, e a parede pode ter uma fresta secreta.", rows:[
    "##################################",
    "#                                #",
    "#                                #",
    "#                                #",
    "#        #                       #",
    "#        #    * E                #",
    "#        ##########              #",
    "#        #                       #",
    "#        #                       #",
    "#        #                       #",
    "#     ####  o                    #",
    "#    #SgSS######                 #",
    "#    #SSSS                       #",
    "#     ####                       #",
    "#        #                       #",
    "#        #  o                    #",
    "#        ######                  #",
    "#        #                       #",
    "#        #                       #",
    "#        #                       #",
    "#        #  o                    #",
    "#        ######                  #",
    "#        #                       #",
    "#        #          @            #",
    "#        #                       #",
    "##################################",
    "##################################",
    "##################################"],
    enemies:[{"x":24,"y":24,"dist":4,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"12 · Abismo", mass:7, max:7, theme:"grove",
    hint:"Abismos enormes. Pegue carona nas plataformas móveis e mire cada salto — sem pressa.", rows:[
    "##############################################################################",
    "#                                                                            #",
    "#                                                                            #",
    "#                                                                            #",
    "#                                                                            #",
    "#                                                                            #",
    "#                                                                            #",
    "#                                                                            #",
    "#                                  *                                         #",
    "#                                #####                                       #",
    "#                                                                            #",
    "#                                                                            #",
    "#     ##                                    CCCCCCC                          #",
    "#    #gS#                                                                    #",
    "#     SS                                                                     #",
    "# @       o                                               o                E #",
    "#                                                                            #",
    "############                   #####                   #####             #####",
    "############                   #####                   #####             #####",
    "############^^^^^^^^^^^^^^^^^^^#####^^^^^^^^^^^^^^^^^^^#####^^^^^^^^^^^^^#####"],
    movers:[{"x":13,"y":14,"w":4,"axis":"x","dist":16,"speed":0.55,"phase":0},{"x":37,"y":14,"w":4,"axis":"x","dist":16,"speed":0.6,"phase":0.7},{"x":61,"y":14,"w":4,"axis":"x","dist":10,"speed":0.65,"phase":0.3}],
    enemies:[{"x":34,"y":8,"dist":3,"speed":1,"axis":"x","type":"patrol"},{"x":48,"y":16,"speed":1.05,"type":"chaser","range":8}]},

  { name:"13 · Caldeira", mass:9, max:9, theme:"grove",
    hint:"Dois mares de 🔥 calor. Abra a porta na PLACA, use as molas e NÃO demore no fogo.", rows:[
    "##################################################################",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#   ###                                                          #",
    "#  #SgS#                                                         #",
    "#   SSS                                                          #",
    "#                               *                                #",
    "#  ######                                                        #",
    "#          D                  CCCCC                              #",
    "#          D                                                     #",
    "#          D                                                     #",
    "#          D          o                     o          o         #",
    "# @        D                                                  E  #",
    "#          D    HHHHHHHHHHH  T        HHHHHHHHHHHHH  T           #",
    "######P###########################################################",
    "##################################################################",
    "##################################################################"],
    enemies:[{"x":44,"y":15,"speed":1.05,"type":"chaser","range":7},{"x":8,"y":15,"dist":4,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"14 · Espinhal", mass:8, max:8, theme:"grove",
    hint:"Um mar de espinhos. As pontes frágeis desmoronam — atravesse com PRECISÃO e deixe blocos pra cobrir os espinhos.", rows:[
    "######################################################################",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                 *                                  #",
    "#                               #####                                #",
    "#                                                                    #",
    "#                                                                    #",
    "#                                                              ##    #",
    "#           CCCCCCC           CCCCCCCCC         CCCCCCCCCCC   #gS#   #",
    "#                                                              SS    #",
    "# @                     o                  o                   o   E #",
    "#                        #                  #                        #",
    "##########             #####             #####               #########",
    "##########             #####             #####               #########",
    "##########^^^^^^^^^^^^^#####^^^^^^^^^^^^^#####^^^^^^^^^^^^^^^#########"],
    enemies:[{"x":34,"y":8,"dist":3,"speed":1,"axis":"x","type":"patrol"},{"x":52,"y":16,"speed":1.1,"type":"chaser","range":8}]},

  { name:"15 · O Precipício", mass:10, max:10, theme:"grove",
    hint:"O GRANDE FINAL do Mundo 1: molas, calor, plataformas móveis e guardiões num só desafio. Prove que domina a gosma!", rows:[
    "############################################################################################",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                     *                                    #",
    "#      ###                                        #########                                #",
    "#     #SgS#                                                                                #",
    "#      SSS                                                                                 #",
    "#         *                                                                                #",
    "#     #####                                                                           ######",
    "#                                                 CCCCCCCCC                                #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                                                                                          #",
    "#                             o                                 o               o          #",
    "#                         o                                                                #",
    "# @         T                   T HHHHHHHHHHHHHHH     T                 T                E #",
    "##############             #######               #######             #####           #######",
    "##############             #######               #######             #####           #######",
    "##############^^^^^^^^^^^^^#######^^^^^^^^^^^^^^^#######^^^^^^^^^^^^^#####^^^^^^^^^^^#######"],
    movers:[{"x":15,"y":17,"w":4,"axis":"x","dist":10,"speed":0.6,"phase":0},{"x":34,"y":17,"w":4,"axis":"x","dist":12,"speed":0.62,"phase":0.3},{"x":57,"y":17,"w":4,"axis":"x","dist":11,"speed":0.6,"phase":0.5},{"x":75,"y":17,"w":4,"axis":"x","dist":9,"speed":0.65,"phase":0.2}],
    enemies:[{"x":54,"y":8,"dist":3,"speed":1,"axis":"x","type":"patrol"},{"x":30,"y":20,"speed":1.1,"type":"chaser","range":8},{"x":70,"y":20,"speed":1.15,"type":"chaser","range":9}]},

  { name:"16 · A Gosma-Mãe", mass:12, max:12, theme:"void", secret:true,
    hint:"A GOSMA-MÃE! NÃO encoste de lado (tira massa). PULE NA CABEÇA dela pra dar dano — 3 acertos e ela cai. Use as plataformas pra ganhar altura; ela fica mais brava a cada golpe.", rows:[
    "##############################################",
    "#                                            #",
    "#                                            #",
    "#                                            #",
    "#                                            #",
    "#                                            #",
    "#                     o                      #",
    "#                  #######                   #",
    "#                                            #",
    "#        #####                  #####        #",
    "#                                            #",
    "#                                            #",
    "#     o                                o     #",
    "#  @                                      E  #",
    "##############################################",
    "##############################################",
    "##############################################"],
    enemies:[{"x":22,"y":13,"speed":0.85,"type":"boss","hp":3}]}

];

// -------------------------------------------------------------------------- PROGRESSO
const SAVE_KEY="geleca_save_v2";
function loadSave(){ try{ const s=JSON.parse(localStorage.getItem(SAVE_KEY))||{}; return {unlocked:s.unlocked||0, stars:s.stars||{}, coins:s.coins||{}, gems:s.gems||{}}; }catch(e){ return {unlocked:0,stars:{},coins:{},gems:{}}; } }
function persist(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(save)); }catch(e){} }
let save = loadSave();
function starsFor(idx, massLeft){
  const L=LEVELS[idx];
  if(massLeft >= Math.ceil(L.mass*0.6)) return 3;
  if(massLeft >= 2) return 2;
  return 1;
}

// -------------------------------------------------------------------------- ESTADO
const canvas=document.getElementById("game"), ctx=canvas.getContext("2d");
const el=id=>document.getElementById(id);
let COLS,ROWS, level, solidTiles,spikes,pickups,plates,doors,heatZones,movers,springs,enemies,gems,stars,fakes,crumbles,iceTiles,exitRect,startPos,theme;
let blob, globs, particles=[], motes=[], rings=[], trail=[], shots=[], levelIndex=0, state="menu"; // menu|play|complete|dead
let tramp=[];   // SEGREDO: trampolins formados por 4 gelecas em 2x2
let levelTime=0, T=0, shake=0, last=0, deaths=0, transition=0;

// entrada
const IN={ kb:{left:false,right:false,down:false}, joyX:0, joyY:0 };
let jumpEdge=false, grabEdge=false;

// -------------------------------------------------------------------------- VALIDAÇÃO
(function(){ LEVELS.forEach((L,i)=>{ const w=L.rows[0].length;
  L.rows.forEach((r,y)=>{ if(r.length!==w) console.error(`LEVEL ${i+1} linha ${y}: ${r.length}≠${w}`); });
  const j=L.rows.join(""); if(!j.includes("@"))console.error(`LEVEL ${i+1} sem @`); if(!j.includes("E"))console.error(`LEVEL ${i+1} sem E`);
}); })();

// -------------------------------------------------------------------------- TOAST
let toastT; function toast(m,k){ /* reservado */ }

// ==========================================================================
// MENU / SELEÇÃO DE FASES
// ==========================================================================
function showMenu(){
  state="menu"; stopMusic(); winTimer=0; winThen=null;
  el("screen-game").classList.remove("active");
  el("screen-menu").classList.add("active");
  buildFireflies();
  buildLevelGrid();
}
// vaga-lumes flutuando ao fundo do menu (clima do Vale Verdejante)
function buildFireflies(){
  const box=el("menu-fireflies"); if(!box || box.childElementCount) return;
  let html="";
  for(let i=0;i<16;i++){ const x=Math.round(Math.random()*100), y=Math.round(Math.random()*100),
    d=(3.5+Math.random()*4).toFixed(1), delay=(-Math.random()*6).toFixed(1),
    s=(2+Math.random()*3).toFixed(1), dx=(Math.random()*40-20).toFixed(0), dy=(Math.random()*40-20).toFixed(0);
    html+=`<i style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;`
      +`--dx:${dx}px;--dy:${dy}px;animation-duration:${d}s;animation-delay:${delay}s"></i>`; }
  box.innerHTML=html;
}
const LV_ICONS=["🌱","⛰️","🕳️","🧗","🌉","🔥","👾","🏔️","❄️","🧊","🥶","🌌","🌋","💠","🏁"];
// TEMPORÁRIO (modo teste): destrava TODAS as fases, inclusive o chefe/secreta, pra testar tudo.
// Voltar pra false pra restaurar a progressão normal.
const UNLOCK_ALL=true;
// Posições dos 15 nós em % da ARTE do mapa (mapa.png) — a mão, encaixados nas
// clareiras abertas do vale, subindo de baixo (fase 1) pro alto (fase 15).
const MAP_SPOTS=[
  {x:30,y:90}, {x:56,y:91}, {x:80,y:82},   // 1-3  base do vale
  {x:78,y:67}, {x:53,y:65}, {x:28,y:69},   // 4-6  cruza o riacho
  {x:22,y:52}, {x:47,y:49}, {x:72,y:51},   // 7-9  campina central
  {x:76,y:36}, {x:51,y:33}, {x:27,y:36},   // 10-12
  {x:31,y:21}, {x:53,y:17}, {x:73,y:20},   // 13-15 alto do vale
];
// A fase SECRETA (16 · Gosma-Mãe) NÃO aparece como nó: fica só um brilho discreto
// escondido no canto, uma "dica" de que há algo ali pra quem reparar.
const SECRET_SPOT={x:76,y:93};
// mini-estrelas (rating) coladas embaixo do nó do mapa
function starRow(st){ let h='<span class="mn-stars">'; for(let k=0;k<3;k++) h+=`<i class="${k<st?"on":""}">★</i>`; return h+"</span>"; }
// SELEÇÃO DE FASE estilo Mario World: um MAPA com caminho serpenteante e nós.
function buildLevelGrid(){
  const map=el("level-grid"); map.innerHTML="";
  const coinsIn=i=>(LEVELS[i].rows.join("").match(/\*/g)||[]).length;      // ⭐ estrelas VISÍVEIS
  const coinGot=i=>Math.min(coinsIn(i), save.coins[i]||0);
  const secretGot=i=>save.gems[i]||0;                                      // 💎 segredos (só o que achou)
  let totalCoins=0, gotCoins=0, foundSecrets=0, ratingSum=0, done=0;
  const NORMAL=LEVELS.filter(L=>!L.secret).length;
  LEVELS.forEach((L,i)=>{ if(L.secret)return; totalCoins+=coinsIn(i); gotCoins+=coinGot(i); foundSecrets+=secretGot(i);
    ratingSum+=(save.stars[i]||0); if((save.stars[i]||0)>0) done++; });
  const totalSecrets=NORMAL, allSecrets=foundSecrets>=totalSecrets;
  // progresso do MUNDO
  const pct=Math.round(done/NORMAL*100);
  const bar=el("world-bar"); if(bar) bar.style.width=pct+"%";
  const pctEl=el("world-pct"); if(pctEl) pctEl.textContent=pct+"%";
  const stats=el("menu-stats");
  if(stats) stats.innerHTML=
    `<span class="chip">✅ ${done}/${NORMAL}</span>`
    + `<span class="chip" style="color:var(--gold)">⭐ ${gotCoins}/${totalCoins}</span>`
    + `<span class="chip" style="color:var(--gold)">★ ${ratingSum}/${NORMAL*3}</span>`
    + (foundSecrets>0 ? `<span class="chip" style="color:var(--purple)">💎 ${foundSecrets}</span>` : "");

  // "próxima" fase NORMAL (primeira desbloqueada e ainda não concluída) — onde a geleca-peão fica
  let nextIdx=-1; for(let i=0;i<NORMAL;i++){ if(i<=save.unlocked && !(save.stars[i]>0)){ nextIdx=i; break; } }
  if(nextIdx<0) nextIdx = NORMAL-1;                                // tudo feito → peão fica no topo

  // --- geometria da arte (mapa.png) ---
  const W=map.clientWidth||420, H=map.clientHeight||Math.round(W/0.5581);

  // --- TRILHA (SVG): pontinhos tipo Mario ligando os 15 nós, subindo o vale ---
  const NS="http://www.w3.org/2000/svg";
  const svg=document.createElementNS(NS,"svg"); svg.setAttribute("class","map-trail");
  svg.setAttribute("viewBox","0 0 "+W+" "+H); svg.setAttribute("preserveAspectRatio","none");
  let d="M "+(MAP_SPOTS[0].x/100*W).toFixed(1)+" "+(MAP_SPOTS[0].y/100*H).toFixed(1);
  for(let k=1;k<NORMAL;k++) d+=" L "+(MAP_SPOTS[k].x/100*W).toFixed(1)+" "+(MAP_SPOTS[k].y/100*H).toFixed(1);
  const base=document.createElementNS(NS,"path"); base.setAttribute("d",d); base.setAttribute("class","trail-base");
  const dash=document.createElementNS(NS,"path"); dash.setAttribute("d",d); dash.setAttribute("class","trail-dash");
  svg.appendChild(base); svg.appendChild(dash); map.appendChild(svg);

  // --- 15 NÓS de fase (o segredo NÃO entra aqui) ---
  for(let i=0;i<NORMAL;i++){
    const L=LEVELS[i], p=MAP_SPOTS[i], st=save.stars[i]||0, nm=(L.name.split("·")[1]||"").trim();
    const locked=!UNLOCK_ALL && i>save.unlocked, sGot=secretGot(i);
    const node=document.createElement("button");
    node.style.left=p.x+"%"; node.style.top=p.y+"%"; node.style.animationDelay=(i*0.04).toFixed(2)+"s";
    node.className="map-node"+(locked?" locked":"")+(st>0?" done":"")+(i===nextIdx?" next":"");
    node.title=nm;
    node.innerHTML = `<b class="mn-num">${i+1}</b>`
      + (locked ? `<span class="mn-ico">🔒</span>`
                : `<span class="mn-ico">${LV_ICONS[i]||"🌿"}</span>`+starRow(st))
      + (sGot>0?`<span class="mn-gem">💎</span>`:"");
    if(!locked) node.addEventListener("click",()=>{ audio(); startGame(i); });
    map.appendChild(node);
  }

  // --- DICA da fase SECRETA: só um brilho discreto no cantinho (nunca um nó rotulado) ---
  const si=LEVELS.findIndex(L=>L.secret);
  if(si>=0){
    const open=allSecrets||UNLOCK_ALL;   // achou TODOS os segredos?
    const hint=document.createElement("button");
    hint.className="map-secret"+(open?" open":"");
    hint.style.left=SECRET_SPOT.x+"%"; hint.style.top=SECRET_SPOT.y+"%";
    hint.title=open?"…?":"";
    hint.setAttribute("aria-label", open?"???":"");
    hint.innerHTML=`<i class="sp sp1">✦</i><i class="sp sp2">✦</i><i class="sp sp3">✧</i>`;
    // clicável só quando desbloqueada (achou tudo) — senão é puro detalhe de cenário
    if(open) hint.addEventListener("click",()=>{ audio(); startGame(si); });
    else hint.disabled=true;
    map.appendChild(hint);
  }

  // --- GELECA-PEÃO no nó atual (quicando) ---
  const pp=MAP_SPOTS[nextIdx]||MAP_SPOTS[0];
  const pawn=document.createElement("div"); pawn.className="map-pawn";
  pawn.style.left=pp.x+"%"; pawn.style.top=pp.y+"%";
  pawn.innerHTML=`<span class="mp-body"><i></i><i></i></span>`;
  map.appendChild(pawn);
}
function startGame(i){
  levelIndex=i;
  el("screen-menu").classList.remove("active");
  el("screen-game").classList.add("active");
  loadLevel(i);
}

// ==========================================================================
// CARREGAR / RESETAR
// ==========================================================================
function loadLevel(idx){
  level=LEVELS[idx]; ROWS=level.rows.length; COLS=level.rows[0].length;
  fitCanvas();                            // dimensiona o canvas à tela e calcula o zoom
  theme=THEMES[level.theme] || THEMES.cave;
  if(musicOn) startMusic(level.theme);    // trilha ambiente do mundo
  // motes de fundo
  motes=[]; for(let i=0;i<26;i++) motes.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    r:1+Math.random()*2.5, s:6+Math.random()*14, ph:Math.random()*6.28 });
  showHint(level.hint);
  levelTime=0; transition=1; resetLevel();
}
// (re)constrói TODAS as entidades a partir do grid — chamado no load E no reinício,
// então coletáveis (gosma extra, estrelas), desmoronáveis, molas e inimigos SEMPRE voltam ao morrer/reiniciar.
function buildEntities(){
  solidTiles=[];spikes=[];pickups=[];plates=[];doors=[];heatZones=[];movers=[];springs=[];enemies=[];gems=[];stars=[];fakes=[];crumbles=[];iceTiles=[];
  for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
    const ch=level.rows[y][x], r={x:x*TILE,y:y*TILE,w:TILE,h:TILE};
    if(ch==="#")solidTiles.push(r);
    else if(ch==="I"){solidTiles.push(r);iceTiles.push(r);}                                 // GELO: sólido porém ESCORREGADIO
    else if(ch==="^")spikes.push(r);
    else if(ch==="o")pickups.push({x:x*TILE+16,y:y*TILE+16,r:9});
    else if(ch==="P"){solidTiles.push(r);plates.push(r);}
    else if(ch==="D")doors.push(r);
    else if(ch==="H")heatZones.push(r);
    else if(ch==="T"){solidTiles.push(r);springs.push({x:r.x,y:r.y,w:TILE,h:TILE,sq:0});}  // mola
    else if(ch==="G")gems.push({x:x*TILE+16,y:y*TILE+16,r:8,got:false,rev:0});               // gema = SEGREDO oculto: INVISÍVEL até você entrar no esconderijo
    else if(ch==="g"){ fakes.push({x:r.x,y:r.y,w:TILE,h:TILE,rev:0});                        // 'g' = parede FANTASMA com gema DENTRO: bloco parece 100% sólido,
      gems.push({x:x*TILE+16,y:y*TILE+16,r:8,got:false,rev:0}); }                             //       a gema só materializa quando você atravessa e entra
    else if(ch==="*")stars.push({x:x*TILE+16,y:y*TILE+16,r:9,got:false});                   // estrela = coletável VISÍVEL
    else if(ch==="S")fakes.push({x:r.x,y:r.y,w:TILE,h:TILE,rev:0});                         // parede FANTASMA: parece sólida, mas você atravessa (some ao entrar)
    else if(ch==="C")crumbles.push({x:r.x,y:r.y,w:TILE,h:TILE,solid:true,t:0,resp:0});     // plataforma que desmorona
    else if(ch==="E")exitRect={x:x*TILE+4,y:y*TILE+2,w:TILE-8,h:TILE-4};
    else if(ch==="@")startPos={x:x*TILE,y:y*TILE};
  }
  (level.movers||[]).forEach(m=>movers.push({
    x0:m.x*TILE, y0:m.y*TILE, w:m.w*TILE, h:GLOB, axis:m.axis,
    dist:m.dist*TILE, speed:m.speed, phase:m.phase||0,
    x:m.x*TILE, y:m.y*TILE, dx:0, dy:0 }));
  (level.enemies||[]).forEach(e=>{
    const boss=e.type==="boss", ew=boss?58:TILE-6, eh=boss?58:TILE-6;
    const ex=e.x*TILE+3, ey=e.y*TILE+3-(eh-(TILE-6));   // alinha a base do inimigo à linha do chão
    enemies.push({ x0:ex, y0:ey, x:ex, y:ey, w:ew, h:eh,
      dist:(e.dist||0)*TILE, speed:e.speed, axis:e.axis||"x",
      type:e.type||"patrol", range:(e.range||7)*TILE, delay:e.delay!==undefined?e.delay:(boss?1.4:0),
      hp:boss?(e.hp||3):0, hitT:0, mad:0, alert:0, dir:1 });
  });
}
function resetLevel(){
  buildEntities();                 // <-- restaura coletáveis e reseta inimigos/desmoronáveis
  globs=[]; particles=[]; rings=[]; trail=[]; shots=[]; tramp=[]; winTimer=0; winThen=null; hitStop=0; cam.look=0;
  blob={ x:startPos.x, y:startPos.y, w:0,h:0, vx:0,vy:0, onGround:false,wall:0,cling:false,
         mass:level.mass, flash:0, clingLock:0, meltAcc:0, climbAcc:0, hurtT:0, melting:false, blink:0, rideMover:null };
  sizeBlob(); blob.y=startPos.y+TILE-blob.h;
  camFollow(true);
  state="play"; hideOverlay(); renderHud();
}
function sizeBlob(){ const s=14+blob.mass*3.0, cx=blob.x+blob.w/2, bt=blob.y+blob.h;
  blob.w=s;blob.h=s; blob.x=cx-s/2; blob.y=bt-s; }

// ==========================================================================
// COLISÃO / FÍSICA
// ==========================================================================
function overlaps(a,b){ return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y; }
function plateOn(){ if(!plates.length)return false;
  for(const p of plates){ const z={x:p.x,y:p.y-6,w:p.w,h:p.h};
    if(overlaps(blob,z))return true; for(const g of globs)if(g.solid&&overlaps(g,z))return true; }
  return false; }
function solidsList(){ const l=solidTiles.slice();
  for(const g of globs)if(g.solid)l.push(g);
  for(const m of movers)l.push({x:m.x,y:m.y,w:m.w,h:m.h});
  for(const c of crumbles)if(c.solid)l.push(c);
  if(doors.length&&!plateOn())for(const d of doors)l.push(d);
  return l; }
function moveAxis(dx,dy){ const list=solidsList();
  blob.x+=dx; for(const s of list)if(overlaps(blob,s)){ if(dx>0){blob.x=s.x-blob.w;blob.wall=1;} else if(dx<0){blob.x=s.x+s.w;blob.wall=-1;} blob.vx=0; }
  // Y: resolve SÓ contra sólidos que o blob de fato "alcançou" nesta passada (vindo de cima ao cair,
  // ou de baixo ao subir). Assim um bloco em que o blob esteja EMBUTIDO (ex.: cresceu dentro, ou pilha
  // encostada) nunca ejeta o personagem pra cima — o bug do "teletransporte pra fora da tela".
  const preTop=blob.y, preBottom=blob.y+blob.h;
  blob.y+=dy;
  if(dy>0){                                        // caindo → pousa no topo MAIS ALTO dentre os que vinham de baixo dos pés
    let landY=null;
    for(const s of list) if(overlaps(blob,s) && preBottom<=s.y+2){ landY = (landY===null)?s.y:Math.min(landY,s.y); }
    if(landY!==null){ blob.y=landY-blob.h; blob.onGround=true; blob.vy=0; }
  } else if(dy<0){                                  // subindo → bate no teto mais baixo dentre os que vinham de cima da cabeça
    let ceilB=null;
    for(const s of list) if(overlaps(blob,s) && preTop>=s.y+s.h-2){ ceilB=(ceilB===null)?s.y+s.h:Math.max(ceilB,s.y+s.h); }
    if(ceilB!==null){ blob.y=ceilB; blob.vy=0; }
  } }

function inputState(){
  let mx=0;
  if(IN.kb.left&&!IN.kb.right)mx=-1; else if(IN.kb.right&&!IN.kb.left)mx=1;
  else if(Math.abs(IN.joyX)>0.25)mx=IN.joyX;
  const down=IN.kb.down||IN.joyY>0.5;
  return { mx, left:mx<-0.25, right:mx>0.25, down };
}

function updateMovers(dt){
  for(const m of movers){
    const off=Math.sin(levelTime*m.speed*Math.PI*2 + m.phase)*(m.dist*0.5) + m.dist*0.5;
    const nx=m.axis==="x"? m.x0+off : m.x0;
    const ny=m.axis==="y"? m.y0+off : m.y0;
    m.dx=nx-m.x; m.dy=ny-m.y; m.x=nx; m.y=ny;
  }
}
// bloqueio por PAREDE: impede o inimigo de atravessar tiles sólidos (bug corrigido).
function enemyBlocked(e,nx){
  const edge = nx>e.x ? nx+e.w : nx;                 // borda de ataque na direção do movimento
  const top=e.y+3, bot=e.y+e.h-3;
  for(const s of solidTiles){
    if(edge>s.x && edge<s.x+s.w && bot>s.y+2 && top<s.y+s.h-2) return true;
  }
  return false;
}
// o RETÂNGULO todo do inimigo na posição nx encostaria numa parede? (usado pela patrulha senoidal)
function enemyRectHitsWall(e,nx){
  const rx=nx+3, rw=e.w-6, ry=e.y+3, rh=e.h-6;
  for(const s of solidTiles){
    if(rx<s.x+s.w && rx+rw>s.x && ry<s.y+s.h && ry+rh>s.y) return true;
  }
  return false;
}
// o blob está pisando num tile de GELO agora? (checa o piso logo abaixo dos pés)
function onIceUnder(){ if(!iceTiles||!iceTiles.length)return false; const fy=blob.y+blob.h;
  for(const t of iceTiles){ if(blob.x+blob.w>t.x+2 && blob.x<t.x+t.w-2 && Math.abs(fy-t.y)<4) return true; }
  return false; }
function updateEnemies(dt){
  const bx=blob?blob.x+blob.w/2:0, by=blob?blob.y+blob.h/2:0;
  for(const e of enemies){
    e.px=e.x;
    if(e.type==="patrol"){
      // PATRULHA: movimento SENOIDAL vai-e-vem (igual v8). Trava só se a posição-alvo bater
      // numa parede sólida (não atravessa mais); em chão aberto é o balanço original.
      const off=Math.sin(levelTime*e.speed*Math.PI*2)*(e.dist*0.5) + e.dist*0.5;
      const nx=e.x0+off;
      if(!enemyRectHitsWall(e,nx)) e.x=nx;   // em chão aberto isto é sempre verdade → movimento v8 puro
      e.y=e.y0;
    } else {
      // PERSEGUIDOR / CHEFE: caça o blob, mas é BARRADO por paredes.
      const boss=e.type==="boss";
      if(boss && levelTime<e.delay){                     // CHEFE acordando: te dá um respiro pra começar a correr
        e.y=e.y0+Math.sin(levelTime*7)*3; e.mad=0; e.alert=Math.min(1,levelTime/e.delay); e.dir=1; continue;
      }
      if(boss && !e.woke){ e.woke=true; sfx("boss"); shake=Math.max(shake,7); }   // RUGIDO ao acordar
      if(boss && e.hitT>0){                              // ATORDOADO após levar pulo na cabeça: recua e pisca
        e.hitT-=dt; const away=Math.sign((e.x+e.w/2)-bx)||1; const nx=e.x+away*150*dt; if(!enemyBlocked(e,nx))e.x=nx;
        e.y=e.y0+Math.sin(levelTime*22)*4; e.dir=away>0?1:-1; e.px=e.x; continue;
      }
      const dx=bx-(e.x+e.w/2), d=Math.hypot(dx, by-(e.y+e.h/2));
      const phase = boss ? (1+(3-(e.hp||3))*0.3) : 1;    // FASE: mais rápido a cada dano (HP 3→2→1)
      if(boss && e.mode==='wind'){                        // ── TELEGRAFA o SALTO-PANCADA (agacha, pisca, treme)
        e.windT-=dt; e.tel=1; shake=Math.max(shake,3);
        if(Math.random()<0.5) burst(e.x+e.w/2,e.y+e.h,2,"#ff4d7e",90);
        if(e.windT<=0){ e.mode='leap'; e.vy=-680; e.vx=Math.max(-300,Math.min(300,dx*1.8)); sfx("jump"); }
      } else if(boss && e.mode==='leap'){                 // ── SALTO em ARCO na direção do jogador
        e.vy+=1600*dt; e.y+=e.vy*dt; const nx=e.x+e.vx*dt; if(!enemyBlocked(e,nx)) e.x=nx;
        if(e.y>=e.y0){ e.y=e.y0; e.mode='chase'; e.tel=0; bossSlam(e); }   // PANCADA no chão ao aterrissar
      } else {                                            // ── CAÇA + CUSPE (padrão)
        e.tel=0;
        const range=boss?1e9:e.range;
        if(d<range){
          const step=Math.sign(dx)*e.speed*(boss?120*phase:98)*dt;
          const nx=e.x+step; if(!enemyBlocked(e,nx)) e.x=nx;
          e.mad=Math.min(1,e.mad+dt*3); e.alert=1;
          if(boss && Math.random()<0.5) burst(e.x+e.w*(dx>0?0:1),e.y+e.h*0.6,1,"#c04a8a",40);
        } else {
          const hx=e.x0-e.x;
          if(Math.abs(hx)>1){ const nx=e.x+Math.sign(hx)*Math.min(Math.abs(hx),e.speed*70*dt); if(!enemyBlocked(e,nx)) e.x=nx; }
          e.mad=Math.max(0,e.mad-dt*1.6); e.alert=Math.max(0,e.alert-dt);
        }
        e.y = e.y0 + Math.sin(levelTime*(4+e.mad*4))*(2+e.mad*2)*(boss?1.6:1);
        if(boss){
          e.leapCD=(e.leapCD==null?4.0:e.leapCD)-dt;                        // agenda o SALTO-PANCADA
          if(e.leapCD<=0 && Math.abs(dx)<600){ e.mode='wind'; e.windT=0.5; e.leapCD=5.5-(3-(e.hp||3))*0.9; }
          else {                                                           // senão, CUSPE gosma em arco
            e.windup=Math.max(0,(e.windup||0)-dt); e.shootT=(e.shootT||2.2)-dt;
            if(e.shootT<=0){ e.shootT=2.6-(3-(e.hp||3))*0.55; e.windup=0.45; }
            if(e.windup>0 && e.windup<=dt+0.001){ const n=1+(3-(e.hp||3)); for(let k=0;k<n;k++) bossShoot(e,(k-(n-1)/2)*90); }
          }
        }
      }
      if(boss) shake=Math.max(shake, Math.max(0, (1-d/360))*3*phase);   // treme quando o chefe se aproxima
    }
    e.dir = e.x>e.px?1:(e.x<e.px?-1:(e.dir||1));
  }
}
function fitCanvas(){
  const stage=el("stage"); if(!stage) return;
  const cw=stage.clientWidth||640, ch=stage.clientHeight||384;
  const dpr=Math.min(2, window.devicePixelRatio||1);
  canvas.width=Math.max(1,Math.round(cw*dpr));
  canvas.height=Math.max(1,Math.round(ch*dpr));
  const portrait = cw<560;
  const targetTiles = portrait ? 12 : 17;        // celular: ~12 tiles (zoom in, personagem grande)
  zoom = canvas.width/(targetTiles*TILE);
  camViewW = canvas.width/zoom; camViewH = canvas.height/zoom;
  // faixa inferior reservada aos controles (pra o personagem NUNCA ficar atrás deles)
  camSafeBottom = (canvas.height * (portrait?0.26:0.10)) / zoom;
}
function camFollow(snap){
  const worldW=COLS*TILE, worldH=ROWS*TILE;
  const usableH = camViewH - camSafeBottom;      // altura útil ACIMA dos controles
  // LOOK-AHEAD: a câmera antecipa na direção do movimento (revela o que vem à frente)
  const dir = blob.vx>40?1:(blob.vx<-40?-1:0);
  const lookTarget = dir*LOOKAHEAD*Math.min(1,Math.abs(blob.vx)/MOVE);
  cam.look = snap ? lookTarget : cam.look + (lookTarget-cam.look)*0.05;
  let tx = worldW<=camViewW ? (worldW-camViewW)/2 : Math.max(0,Math.min(blob.x+blob.w/2 + cam.look - camViewW/2, worldW-camViewW));
  // centraliza o blob na área útil; permite "overscroll" p/ baixo (até camSafeBottom) pra erguer o chão acima dos controles
  const maxTy = worldH - camViewH + camSafeBottom;
  let ty = worldH<=usableH ? (worldH-usableH)/2 : Math.max(0, Math.min(blob.y+blob.h/2 - usableH*0.52, maxTy));
  if(snap){ cam.x=tx; cam.y=ty; } else { cam.x+=(tx-cam.x)*0.14; cam.y+=(ty-cam.y)*0.11; }
}

function update(dt){
  T+=dt;
  if(state!=="play"){ jumpEdge=grabEdge=false; return; }
  if(hitStop>0){ hitStop-=dt; return; }              // HIT-STOP: congela o mundo por instantes no impacto
  levelTime+=dt;
  if(blob.flash>0)blob.flash-=dt; if(blob.clingLock>0)blob.clingLock-=dt; if(blob.hurtT>0)blob.hurtT-=dt;
  blob.blink-=dt; if(blob.blink<-0.15)blob.blink=1.6+Math.random()*2.5;

  if(transition>0) transition=Math.max(0,transition-dt*2.6);
  updateMovers(dt); updateEnemies(dt);
  // carona: se estava sobre um mover, acompanha o deslocamento dele
  if(blob.onGroundPrev && blob.rideMover){ blob.x+=blob.rideMover.dx; blob.y+=blob.rideMover.dy; }

  const {mx,left,right,down}=inputState();
  const onG=blob.onGroundPrev, wall=blob.wallPrev||0;

  let cling=false;
  if(!onG && wall!==0 && blob.clingLock<=0){ if((wall>0&&right)||(wall<0&&left)) cling=true; }
  blob.cling=cling;

  const onIce=blob.onIcePrev;                          // pisando no GELO no frame anterior?
  const ctrl=onG?1:AIR;
  if(cling) blob.vx=0;
  else if(onIce){                                      // GELO: pouca aderência — acelera devagar e DESLIZA
    if(Math.abs(mx)>0.25) blob.vx += (mx*MOVE - blob.vx)*0.05;
    else blob.vx *= 0.99;
  }
  else if(Math.abs(mx)>0.25) blob.vx=mx*MOVE*ctrl;
  else blob.vx*= onG?0.6:0.92;

  if(cling) blob.vy = down?CLIMB:-CLIMB;
  else { blob.vy+=GRAVITY*dt; if(blob.vy>MAX_FALL)blob.vy=MAX_FALL; }

  // JUMP BUFFER: registra a intenção de pulo por uma janelinha (perdoa apertar cedo demais)
  if(jumpEdge){ hideHint(); blob.jumpBuf=JUMPBUF; }
  // COYOTE TIME: dá pra pular por um instante mesmo após sair da borda
  const canJump = onG || cling || (blob.coyote||0)>0;
  if((blob.jumpBuf||0)>0 && canJump && blob.mass>1){
    dropGlob(cling?wall:0); blob.mass-=1; sizeBlob();
    blob.vy=-JUMP_V; if(cling){blob.vx=-wall*MOVE*0.9;blob.clingLock=0.18;}
    burst(blob.x+blob.w/2,blob.y+blob.h,7,"#7ee06b",130);
    ring(blob.x+blob.w/2,blob.y+blob.h,blob.w*0.95,cling?"120,230,220":"126,224,107",3,0.34);  // impulso do salto
    sfx("jump"); renderHud(); blob.jumpBuf=0; blob.coyote=0;
  } else if(jumpEdge && canJump && blob.mass<=1){ blob.flash=0.2; sfx("nope"); blob.jumpBuf=0; }
  if((blob.jumpBuf||0)>0) blob.jumpBuf=Math.max(0,blob.jumpBuf-dt);
  jumpEdge=false;
  if(grabEdge){ reabsorb(); grabEdge=false; }
  if(Math.abs(mx)>0.3) hideHint();

  const preVy=blob.vy, preG=blob.onGroundPrev;
  blob.onGround=false; blob.wall=0;
  moveAxis(blob.vx*dt, blob.vy*dt);
  if(blob.onGround){
    if(!preG&&preVy>260){ const fx=blob.x+blob.w/2, fy=blob.y+blob.h;
      const fallDist=(blob.apexY!=null)? (blob.y-blob.apexY) : 0;   // altura real da descida (do ápice até aqui)
      blob._lastFall=Math.round(fallDist); blob._lastVy=Math.round(preVy);
      // QUEDA ALTA (alto mesmo): baque forte + perde 1 geleca (fica um pedaço no chão).
      // EXCEÇÃO: quedas após mola/trampolim (boosted) ou pouso em superfície elástica NÃO punem.
      if(fallDist>250 && preVy>560 && blob.mass>1 && !blob.boosted && !feetOnBouncy()){
        dropGlob(0); blob.mass-=1; sizeBlob();
        splat(fx,fy,16,240); burst(fx,fy,6,"#5fbf6a",120);
        ring(fx,fy,blob.w*2.4,"120,220,120",4.5,0.5); ring(fx,fy,blob.w*1.5,"210,255,190",3,0.4);  // baque forte
        shake=10; hitstop(0.06); sfx("impact"); renderHud();
      } else { burst(fx,fy,5,"#5fbf6a",95); shake=Math.min(6,preVy/120);
        if(preVy>360) ring(fx,fy,blob.w*1.15,"126,224,107",2.5,0.3);   // poeira do pouso
        if(preVy>420)sfx("land"); }
    }
    blob.apexY=blob.y; blob.boosted=false;                 // no chão: zera ápice e o impulso
  } else {
    blob.apexY = (blob.apexY==null)? blob.y : Math.min(blob.apexY, blob.y);   // no ar: guarda o ponto mais alto
  }
  // coyote time: recarrega no chão, escoa no ar
  if(blob.onGround) blob.coyote=COYOTE; else if((blob.coyote||0)>0) blob.coyote=Math.max(0,blob.coyote-dt);
  blob.onGroundPrev=blob.onGround; blob.wallPrev=blob.wall;
  blob.onIcePrev = blob.onGround && onIceUnder();      // ficou em cima de gelo?

  // qual mover está pisando (pra carona no próximo frame)
  blob.rideMover=null;
  if(blob.onGround) for(const m of movers){
    if(blob.x+blob.w>m.x+2 && blob.x<m.x+m.w-2 && Math.abs((blob.y+blob.h)-m.y)<3){ blob.rideMover=m; break; }
  }
  // mola: impulso pra cima sem gastar massa
  if(blob.onGround && blob.vy>=0) for(const sp of springs){
    if(blob.x+blob.w>sp.x+3 && blob.x<sp.x+sp.w-3 && Math.abs((blob.y+blob.h)-sp.y)<5){
      blob.vy=-BOUNCE; blob.onGround=false; blob.onGroundPrev=false; sp.sq=1; blob.boosted=true; // impulso: sem punição de queda
      burst(sp.x+sp.w/2,sp.y,8,"#9fe8ff",160); ring(sp.x+sp.w/2,sp.y,sp.w*1.3,"159,232,255",3.5,0.4); sfx("spring"); break;
    }
  }
  for(const sp of springs) if(sp.sq>0) sp.sq=Math.max(0,sp.sq-dt*4);

  // SEGREDO 2x2: 4 gelecas encostadas formam TRAMPOLIM — quica ao pisar em cima (sem gastar massa)
  detectTrampolines();
  if(blob.onGround && blob.vy>=0) for(const tp of tramp){
    if(blob.x+blob.w>tp.x+4 && blob.x<tp.x+tp.w-4 && Math.abs((blob.y+blob.h)-tp.y)<6){
      blob.vy=-BOUNCE*1.12; blob.onGround=false; blob.onGroundPrev=false; tp.sq=1; blob.boosted=true; // trampolim: sem punição de queda
      burst(tp.x+tp.w/2,tp.y,12,"#8be9ff",180); sfx("spring"); break;
    }
  }
  for(const tp of tramp) if(tp.sq>0) tp.sq=Math.max(0,tp.sq-dt*4);

  // plataformas que DESMORONAM: pisou → treme e cai; depois respawna
  for(const c of crumbles){
    if(c.solid){
      const on = blob.onGround && blob.x+blob.w>c.x+2 && blob.x<c.x+c.w-2 && Math.abs((blob.y+blob.h)-c.y)<3;
      if(on){ c.t+=dt; if(c.t>=0.55){ c.solid=false; c.resp=2.6; burst(c.x+c.w/2,c.y+c.h/2,8,"#b98a5a",80); sfx("nope"); } }
      else if(c.t>0) c.t=Math.max(0,c.t-dt*2);
    } else { c.resp-=dt; if(c.resp<=0){ c.solid=true; c.t=0; } }
  }

  camFollow(false);   // câmera segue o blob

  // inimigos: contato = morte (exceto o CHEFE, que se combate PULANDO na cabeça)
  for(const e of enemies){
    if(e.type==="boss"){ handleBoss(e,dt); if(state!=="play")return; continue; }
    const ix=e.w*0.16, iy=e.h*0.16;
    if(overlaps(blob,{x:e.x+ix,y:e.y+iy,w:e.w-ix*2,h:e.h-iy*2})){ die(); return; } }
  // paredes FANTASMA: parecem sólidas até você ENTRAR nelas — aí somem (revelam o esconderijo)
  for(const fk of fakes){ if(fk.rev<1 && overlaps(blob,fk)) fk.rev=Math.min(1,fk.rev+dt*5); }
  // gemas INVISÍVEIS (estilo Fez): só materializam quando você já está bem em cima do esconderijo
  const bcx=blob.x+blob.w/2, bcy=blob.y+blob.h/2;
  for(const gm of gems){ if(gm.got)continue;
    if(Math.hypot(bcx-gm.x,bcy-gm.y)<GEM_REVEAL+blob.w*0.4) gm.rev=Math.min(1,gm.rev+dt*5); }

  // estrelas VISÍVEIS (coletável comum)
  for(const st of stars) if(!st.got && overlaps(blob,{x:st.x-st.r,y:st.y-st.r,w:st.r*2,h:st.r*2})){
    st.got=true; burst(st.x,st.y,14,"#ffd24a",150); sfx("star"); shake=Math.max(shake,2);
  }
  // gemas = SEGREDOS ocultos (nunca anunciados; o jogo NÃO avisa que existem)
  for(const gm of gems) if(!gm.got && overlaps(blob,{x:gm.x-gm.r,y:gm.y-gm.r,w:gm.r*2,h:gm.r*2})){
    gm.got=true; burst(gm.x,gm.y,20,"#c9a6ff",180); sfx("secret"); shake=Math.max(shake,4);
    showHint("✨ segredo…");
  }

  // calor
  let inHeat=false; for(const h of heatZones)if(overlaps(blob,h)){inHeat=true;break;}
  blob.melting=inHeat;
  if(inHeat){ blob.meltAcc+=dt; if(blob.meltAcc>=MELT_TIME){ blob.meltAcc-=MELT_TIME;
      burst(blob.x+blob.w/2,blob.y,4,"#ff9a4a",60);
      if(blob.mass>1){ blob.mass--; sizeBlob(); renderHud(); sfx("melt"); } else { die(); return; } } }
  else if(blob.meltAcc>0) blob.meltAcc=Math.max(0,blob.meltAcc-dt*0.5);

  // ESCALAR PAREDE também gasta massa (custo, tipo o calor) — grudar/subir não é mais de graça
  if(blob.cling){ blob.climbAcc=(blob.climbAcc||0)+dt;
    if(blob.climbAcc>=CLIMB_MELT){ blob.climbAcc-=CLIMB_MELT;
      burst(blob.x+blob.w/2,blob.y+blob.h,4,"#9fe0d0",70);
      if(blob.mass>1){ blob.mass--; sizeBlob(); renderHud(); sfx("melt"); } else { die(); return; } } }
  else if(blob.climbAcc>0) blob.climbAcc=Math.max(0,blob.climbAcc-dt*0.6);

  updateParticles(dt); updateRings(dt); updateTrail(dt); updateShots(dt);
  // RASTRO de slime: ao andar no chão, escalar/deslizar na parede, ou voar — mostra que é gosma.
  const moving = Math.abs(blob.vx)>60 || (blob.cling && Math.abs(blob.vy)>40) || (!blob.onGround && Math.abs(blob.vy)>320);
  if(!blob.gone && moving){ blob._trailAcc=(blob._trailAcc||0)+dt; if(blob._trailAcc>=0.028){ blob._trailAcc=0; pushTrail(); } }
  if(shake>0) shake=Math.max(0,shake-dt*24);
  // um pedaço só vira SÓLIDO quando não está sobreposto ao jogador — senão a colisão
  // "ejetaria" o blob pra cima (teletransporte de ~1 geleca). Espera o blob sair de cima.
  const now=performance.now(); for(const g of globs)if(!g.solid&&now>=g.solidAt&&!overlaps(blob,g))g.solid=true;

  for(let i=pickups.length-1;i>=0;i--){ const p=pickups[i];
    if(overlaps(blob,{x:p.x-p.r,y:p.y-p.r,w:p.r*2,h:p.r*2})){
      if(blob.mass<level.max){blob.mass++;sizeBlob();}
      burst(p.x,p.y,9,"#a6f08a",110); sfx("pickup"); pickups.splice(i,1); renderHud(); } }

  for(const s of spikes)if(overlaps(blob,{x:s.x+4,y:s.y+7,w:s.w-8,h:s.h-7})){ die(); return; }
  if(blob.y>ROWS*TILE+80){ die(); return; }
  if(overlaps(blob,exitRect)) win();
}

// pés sobre uma superfície elástica (mola ou trampolim)? — usado pra não punir queda nelas
function feetOnBouncy(){
  const feet=blob.y+blob.h;
  for(const sp of springs){ if(blob.x+blob.w>sp.x+3 && blob.x<sp.x+sp.w-3 && Math.abs(feet-sp.y)<6) return true; }
  for(const tp of tramp){ if(blob.x+blob.w>tp.x+4 && blob.x<tp.x+tp.w-4 && Math.abs(feet-tp.y)<8) return true; }
  return false;
}
function dropGlob(wallSide){
  const now=performance.now();
  const g={x:blob.x+blob.w/2-GLOB/2,y:blob.y+blob.h-GLOB,w:GLOB,h:GLOB,solid:false,solidAt:now+160,born:now,wall:wallSide,tramp:false};
  if(wallSide>0)g.x=blob.x+blob.w-GLOB; else if(wallSide<0)g.x=blob.x;
  globs.push(g);
  slimeSplit(g.x+g.w/2, g.y+g.h*0.35);           // gosma esguicha: um PEDAÇO se desprendeu
}

// SEGREDO — TRAMPOLIM 2x2: 4 gelecas sólidas formando um quadrado FIRME (encostadas e alinhadas).
// Exige espaçamento real de ~GLOB com tolerância apertada, pra NÃO formar trampolim por acidente
// quando pedaços soltos se amontoam (senão o jogador "dá um pulo gigante" sem querer ao coletar).
function detectTrampolines(){
  tramp=[];
  const solid=[]; for(const g of globs){ g.tramp=false; if(g.solid) solid.push(g); }
  if(solid.length<4) return;
  const TOL=8;                                   // alinhamento firme: acidente não vira trampolim
  const near=(v,t)=>Math.abs(v-t)<TOL;
  for(const a of solid){
    if(a.tramp) continue;                        // canto superior-esquerdo
    const b=solid.find(g=>!g.tramp && g!==a && near(g.x,a.x+GLOB) && near(g.y,a.y));         // direita
    const c=solid.find(g=>!g.tramp && g!==a && near(g.x,a.x)      && near(g.y,a.y+GLOB));    // abaixo
    const d=(b&&c)?solid.find(g=>!g.tramp && g!==a&&g!==b&&g!==c && near(g.x,a.x+GLOB) && near(g.y,a.y+GLOB)):null; // diagonal
    if(b&&c&&d){
      a.tramp=b.tramp=c.tramp=d.tramp=true;
      const left=Math.min(a.x,c.x), right=Math.max(b.x,d.x)+GLOB, topY=Math.min(a.y,b.y);
      tramp.push({x:left, y:topY, w:right-left, sq:0});
    }
  }
}

// SEGREDO — TROCAR DE CORPO: toque numa geleca solta e ela vira VOCÊ; onde você estava fica uma geleca.
function tryPossess(clientX,clientY){
  if(state!=="play"||!blob) return false;
  const rect=canvas.getBoundingClientRect();
  const cx=(clientX-rect.left)*(canvas.width/rect.width), cy=(clientY-rect.top)*(canvas.height/rect.height);
  return possessWorld(cx/zoom+cam.x, cy/zoom+cam.y);
}
function possessWorld(wx,wy){
  if(state!=="play"||!blob) return false;
  const pad=10;
  let hit=-1;
  for(let i=0;i<globs.length;i++){ const g=globs[i]; if(!g.solid)continue;
    if(wx>=g.x-pad && wx<=g.x+g.w+pad && wy>=g.y-pad && wy<=g.y+g.h+pad){ hit=i; break; } }
  if(hit<0) return false;
  const g=globs[hit];
  const oldGlob={x:blob.x+blob.w/2-GLOB/2, y:blob.y+blob.h-GLOB, w:GLOB,h:GLOB, solid:true, solidAt:0, wall:0, tramp:false};
  burst(blob.x+blob.w/2,blob.y+blob.h/2,10,"#8be9ff",120);
  blob.x=g.x+g.w/2-blob.w/2; blob.y=g.y+g.h-blob.h; blob.vx=0; blob.vy=0;
  blob.onGround=false; blob.onGroundPrev=false; blob.cling=false;
  globs.splice(hit,1); globs.push(oldGlob);
  resolvePlace();
  burst(blob.x+blob.w/2,blob.y+blob.h/2,16,"#8be9ff",170); sfx("swap");
  return true;
}
function resolvePlace(){ const list=solidsList();
  for(let it=0; it<20; it++){ let ov=0, s2=null;
    for(const s of list){ if(overlaps(blob,s)){ const o=(blob.y+blob.h)-s.y; if(o>ov){ov=o;s2=s;} } }
    if(!s2) break; blob.y=s2.y-blob.h-0.5; }
}
function reabsorb(){ if(blob.mass>=level.max)return;
  let best=-1,bd=1e9; const foot={x:blob.x-REABSORB_R,y:blob.y-REABSORB_R,w:blob.w+REABSORB_R*2,h:blob.h+REABSORB_R*2};
  for(let i=0;i<globs.length;i++){ const g=globs[i]; if(!g.solid)continue;
    if(overlaps(foot,g)){ const dx=(g.x+g.w/2)-(blob.x+blob.w/2),dy=g.y-(blob.y+blob.h),d=dx*dx+dy*dy; if(d<bd){bd=d;best=i;} } }
  if(best>=0){ const g=globs[best]; const gx=g.x+g.w/2, gy=g.y+g.h/2, bx=blob.x+blob.w/2, by=blob.y+blob.h/2;
    // partículas SENDO PUXADAS do pedaço PRA DENTRO do jogador (convergem)
    for(let k=0;k<10;k++){ const t=Math.random(), px=gx+(Math.random()*2-1)*8, py=gy+(Math.random()*2-1)*8;
      particles.push({x:px,y:py,vx:(bx-px)*3.2,vy:(by-py)*3.2,life:0.2+Math.random()*0.12,max:0.34,r:1.6+Math.random()*2,color:"#a6f08a"}); }
    ring(gx,gy,g.w*1.5,"166,240,138",3,0.34,true);        // anel colapsando = absorção
    sfx("absorb");
    globs.splice(best,1); blob.mass++; sizeBlob(); blob.flash=0.12; renderHud(); } }

// LUTA DO CHEFE: pular na CABEÇA dá dano; encostar de lado tira massa (não mata na hora).
function handleBoss(e,dt){
  if(e.hp===undefined) e.hp=3;
  if(e.hitT>0) return;                                  // i-frames do chefe (recuando)
  const box={x:e.x+e.w*0.12,y:e.y+e.h*0.08,w:e.w*0.76,h:e.h*0.84};
  if(!overlaps(blob,box)) return;
  const feet=blob.y+blob.h, headLine=e.y+e.h*0.5;
  if(blob.vy>40 && feet < headLine){                    // PULO NA CABEÇA = dano
    e.hp--; e.hitT=1.0; e.mode='chase'; e.vy=0; e.tel=0; e.y=e.y0;   // interrompe salto/telegrafo ao levar dano
    blob.vy=-BOUNCE*0.7; blob.onGround=false; blob.onGroundPrev=false;   // quica pra cima
    burst(e.x+e.w/2, e.y, 20, "#ff8fae", 220); ring(e.x+e.w/2, e.y, e.w*1.4, "255,143,174", 4, 0.45); shake=9; hitstop(0.09); sfx("bosshit");
    if(e.hp<=0) bossDefeated(e);
    return;
  }
  // senão: DANO no jogador — perde massa + empurrão + piscada de invencibilidade
  if(blob.hurtT>0) return;
  blob.hurtT=1.2; const kb=(blob.x+blob.w/2 < e.x+e.w/2)?-1:1;
  blob.vx=kb*340; blob.vy=-280; blob.onGround=false; blob.onGroundPrev=false; blob.flash=0.5;
  blob.mass=Math.max(0, blob.mass-2); sizeBlob(); renderHud();
  burst(blob.x+blob.w/2,blob.y+blob.h/2,12,"#ff6a6a",190); shake=8; sfx("hurt");
  if(blob.mass<1){ die(); }
}
function bossDefeated(e){
  for(let i=0;i<48;i++) burst(e.x+e.w/2,e.y+e.h/2,1,CONFCOL[i%CONFCOL.length],260);
  const idx=enemies.indexOf(e); if(idx>=0) enemies.splice(idx,1);
  shots=[]; shake=14; sfx("win"); win();                // dispara o final especial da fase secreta
}
// SALTO-PANCADA: onda de choque pelo chão ao aterrissar. Quem está no chão perto leva dano; pular ESCAPA.
function bossSlam(e){
  const cx=e.x+e.w/2, gy=e.y+e.h;
  shake=13; hitstop(0.10); sfx("impact");
  splat(cx,gy,16,180); ring(cx,gy,e.w*1.1,"255,143,174",5,0.42); ring(cx,gy,e.w*2.0,"255,120,150",3,0.5);
  for(let i=0;i<22;i++){ const a=Math.PI+Math.random()*Math.PI, sp=120+Math.random()*180;   // detritos rasteiros
    particles.push({x:cx,y:gy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp*0.5,life:0.3+Math.random()*0.25,max:0.55,r:2+Math.random()*3,color:"#ff8fae"}); }
  if(blob && !blob.gone && blob.hurtT<=0){
    const grounded=blob.onGroundPrev||blob.onGround, near=Math.abs((blob.x+blob.w/2)-cx)<e.w*2.4;
    if(grounded && near){                                // no chão e no alcance da onda = leva a pancada
      blob.hurtT=1.2; const kb=(blob.x+blob.w/2<cx)?-1:1;
      blob.vx=kb*360; blob.vy=-260; blob.onGround=false; blob.onGroundPrev=false; blob.flash=0.5;
      blob.mass=Math.max(0,blob.mass-2); sizeBlob(); renderHud();
      burst(blob.x+blob.w/2,blob.y+blob.h/2,12,"#ff6a6a",190); sfx("hurt");
      if(blob.mass<1){ die(); }
    }
  }
}
// CHEFE cuspe gosma em ARCO no jogador (dodge ou perde massa)
function bossShoot(e, spread){
  const sx=e.x+e.w/2, sy=e.y+e.h*0.28, tx=(blob?blob.x+blob.w/2:sx), ty=(blob?blob.y+blob.h/2:sy);
  const dx=tx-sx, t=Math.max(0.55, Math.min(1.15, Math.abs(dx)/380));
  shots.push({x:sx,y:sy, vx:dx/t+(spread||0), vy:(ty-sy)/t - 0.5*1000*t, r:10, life:3.0});
  burst(sx,sy,7,"#d24a9a",130); sfx("spit");
}
function updateShots(dt){
  for(let i=shots.length-1;i>=0;i--){ const s=shots[i];
    s.vy+=1000*dt; s.x+=s.vx*dt; s.y+=s.vy*dt; s.life-=dt;
    if(s.life<=0 || s.y>ROWS*TILE+40){ shots.splice(i,1); continue; }
    if(isSolidAt(s.x,s.y)){ splat(s.x,s.y,7,150); ring(s.x,s.y,20,"210,90,160",2.5,0.3); shots.splice(i,1); continue; }
    if(blob && !blob.gone && blob.hurtT<=0 && overlaps(blob,{x:s.x-s.r,y:s.y-s.r,w:s.r*2,h:s.r*2})){
      blob.hurtT=1.0; const kb=Math.sign(s.vx)||1; blob.vx=kb*280; blob.vy=-230; blob.flash=0.5; blob.onGround=false; blob.onGroundPrev=false;
      blob.mass=Math.max(0,blob.mass-1); sizeBlob(); renderHud();
      splat(s.x,s.y,6,150); burst(blob.x+blob.w/2,blob.y+blob.h/2,10,"#ff6a6a",170); shake=7; sfx("hurt");
      shots.splice(i,1); if(blob.mass<1){ die(); return; }
    }
  }
}

function die(){ if(state==="dead")return; deaths++;
  const cx=blob.x+blob.w/2, cy=blob.y+blob.h/2;
  splat(cx,cy,30,320); burst(cx,cy,10,"#ff7a6a",200);           // slime se ESPATIFA
  ring(cx,cy,blob.w*2.6,"255,140,120",4,0.5); ring(cx,cy,blob.w*1.6,"255,220,200",2.5,0.4);
  blob.gone=true;                                                // a geleca some (virou respingo)
  sfx("impact"); sfx("die"); shake=12;
  state="dead";
  // deixa o espatifo aparecer antes de mostrar a tela de morte
  deferWin(()=>overlay("💥 Ai!","Espinho, queda ou derreteu.",[
    {t:"Tentar de novo",cb:resetLevel},
    {t:"Menu",ghost:true,cb:showMenu}]), 0.5); }

function win(){ state="complete"; sfx("win"); burst(exitRect.x+exitRect.w/2,exitRect.y+exitRect.h/2,22,"#7ee06b",190);
  const st=starsFor(levelIndex,blob.mass);
  save.stars[levelIndex]=Math.max(save.stars[levelIndex]||0, st);
  // ⭐ estrelas VISÍVEIS: contadas abertamente
  const coinGot=stars.filter(s=>s.got).length, coinTot=stars.length;
  if(coinTot) save.coins[levelIndex]=Math.max(save.coins[levelIndex]||0, coinGot);
  // 💎 SEGREDOS ocultos: guardamos, mas NUNCA revelamos quantos existem
  const secretGot=gems.filter(g=>g.got).length;
  if(secretGot) save.gems[levelIndex]=Math.max(save.gems[levelIndex]||0, secretGot);
  const NORMAL=LEVELS.filter(L=>!L.secret).length;
  // só avança o desbloqueio entre fases NORMAIS — a secreta é destravada por segredos, não por progressão
  if(!level.secret && levelIndex+1<NORMAL && save.unlocked<levelIndex+1) save.unlocked=levelIndex+1;
  persist();

  // === FASE SECRETA: final especial (você derrotou a Gosma-Mãe E descobriu tudo) ===
  if(level.secret){
    confetti(exitRect.x+exitRect.w/2, exitRect.y, 70);
    deferWin(()=>overlay("🏆✨ O VERDADEIRO FIM",
      `<div style="font-size:.9rem;color:#c9a6ff;line-height:1.5">Você escapou da Gosma-Mãe…<br>e descobriu <b>TUDO</b> que o jogo escondia.<br><span style="color:#8fb3a6">Pouquíssimos chegam até aqui. 💎</span></div>`,
      [{t:"Menu",cb:showMenu}], true), 0.9);
    return;
  }
  const isLast=levelIndex>=NORMAL-1;   // última fase NORMAL → conclui o MUNDO

  // === TELA DE CONCLUSÃO DO MUNDO (após a última fase normal) ===
  if(isLast){
    confetti(exitRect.x+exitRect.w/2, exitRect.y, 60);
    let tCoins=0,gCoins=0,fSec=0;
    LEVELS.forEach((L,i)=>{ if(L.secret)return; const c=(L.rows.join("").match(/\*/g)||[]).length;
      tCoins+=c; gCoins+=Math.min(c, save.coins[i]||0); fSec+=save.gems[i]||0; });
    const allSec = fSec>=NORMAL;
    let body=`<div style="font-size:.95rem;line-height:1.7">`
      + `<span style="color:#ffd24a;font-weight:700">⭐ ${gCoins}/${tCoins} estrelas</span>`;
    if(fSec>0) body += `<br><span style="color:#c9a6ff;font-weight:700">💎 ${fSec} segredo${fSec>1?'s':''}</span>`;
    body += `</div>`;
    body += allSec
      ? `<div style="font-size:.82rem;color:#c9a6ff;margin-top:10px">✨ Você desvendou o Vale por inteiro… algo despertou no mapa.</div>`
      : `<div style="font-size:.82rem;color:#8fb3a6;margin-top:10px">Que jornada! 🌿 O Vale ainda guarda mistérios pra quem voltar.</div>`;
    deferWin(()=>overlay("🎉 Mundo 1 Completo!", body, [{t:"Menu",cb:showMenu}], true), 0.9);
    return;
  }

  confetti(exitRect.x+exitRect.w/2, exitRect.y, 24);
  let sub="★".repeat(st)+"☆".repeat(3-st);
  if(coinTot){ sub += `<div style="font-size:.8rem;color:#ffd24a;margin-top:6px">⭐ ${coinGot}/${coinTot}</div>`; }
  // segredo: só reconhece SE você achou algum — e jamais diz o total nem que faltam
  if(secretGot){ sub += `<div style="font-size:.8rem;color:#c9a6ff;margin-top:4px">✨ Você encontrou um segredo…</div>`; }
  deferWin(()=>overlay("✅ Fase completa!", sub,
    [{t:"Próxima ▶",cb:()=>startGame(levelIndex+1)},{t:"Menu",ghost:true,cb:showMenu}], true), 0.45); }

// ==========================================================================
// RENDER
// ==========================================================================
function render(){
  const W=canvas.width,H=canvas.height, th=theme||THEMES.cave;
  ctx.setTransform(1,0,0,1,0,0);
  drawParallax(th);
  // partículas de AMBIENTE por mundo: fagulhas sobem (forge), neve desce (ice/glacier),
  // esporos sobem (cave), brilhos flutuam (deep/void). Dá identidade a cada tema.
  const amb=th.amb||"spore", down = (amb==="snow"||amb==="dust");
  for(const m of motes){
    if(amb==="fireflies"){                              // vaga-lumes: flutuam e pulsam (Mundo 1)
      const xx=m.x+Math.cos(T*0.4+m.ph)*22, yy=(m.y+Math.sin(T*0.5+m.ph)*18)%H, y2=yy<0?yy+H:yy;
      const tw=0.35+0.65*Math.abs(Math.sin(T*2.4+m.ph));
      ctx.save(); ctx.shadowColor=`rgba(${th.mote},.9)`; ctx.shadowBlur=7;
      ctx.fillStyle=`rgba(${th.mote},${0.55*tw})`; ctx.beginPath(); ctx.arc(xx,y2,m.r*0.75,0,7); ctx.fill(); ctx.restore();
      continue;
    }
    let yy = down ? (m.y + T*m.s)%H : (m.y - T*m.s)%H; if(yy<0)yy+=H;
    const drift = (amb==="snow") ? Math.sin(T*0.8+m.ph)*14 : Math.sin(T+m.ph)*6;
    const xx = m.x + drift;
    if(amb==="ember"){ const life=(yy/H); ctx.fillStyle=`rgba(255,${120+Math.floor(life*100)},40,${(1-life)*0.5})`;
      ctx.beginPath(); ctx.arc(xx,yy,m.r*0.9,0,7); ctx.fill(); }
    else if(amb==="snow"){ ctx.fillStyle=`rgba(${th.mote},${0.16+m.r*0.05})`;
      ctx.beginPath(); ctx.arc(xx,yy,m.r*0.9,0,7); ctx.fill(); }
    else if(amb==="spark"){ const tw=0.3+0.7*Math.abs(Math.sin(T*2+m.ph)); ctx.fillStyle=`rgba(${th.mote},${0.14*tw})`;
      ctx.fillRect(xx-m.r*0.6,yy-m.r*0.6,m.r*1.2,m.r*1.2); }
    else { ctx.fillStyle=`rgba(${th.mote},.10)`; ctx.beginPath(); ctx.arc(xx,yy,m.r,0,7); ctx.fill(); }
  }

  // ---- MUNDO: câmera + ZOOM ----
  const sx=shake>0?(Math.random()*2-1)*shake:0, sy=shake>0?(Math.random()*2-1)*shake:0;
  ctx.setTransform(zoom,0,0,zoom, -cam.x*zoom+sx, -cam.y*zoom+sy);
  const minX=cam.x-TILE, maxX=cam.x+camViewW, minY=cam.y-TILE, maxY=cam.y+camViewH;
  const vis = r => r.x<=maxX && r.x+r.w>=minX && r.y<=maxY && r.y+r.h>=minY;
  // preenche ABAIXO do mundo (quando a câmera sobe o chão p/ liberar espaço aos controles) — evita "fase flutuando"
  const worldBottom=ROWS*TILE;
  if(maxY>worldBottom){ ctx.fillStyle=th.tile; ctx.fillRect(minX, worldBottom, (maxX-minX)+TILE, (maxY-worldBottom)+TILE);
    ctx.fillStyle="rgba(0,0,0,.25)"; ctx.fillRect(minX, worldBottom, (maxX-minX)+TILE, 6); }

  // calor (atrás)
  for(const h of heatZones){ if(!vis(h))continue;
    const g=ctx.createLinearGradient(0,h.y,0,h.y+h.h);
    g.addColorStop(0,"rgba(255,120,40,.08)"); g.addColorStop(1,"rgba(255,70,25,.36)");
    ctx.fillStyle=g; ctx.fillRect(h.x,h.y,h.w,h.h);
    ctx.fillStyle="#ff7a2a"; ctx.fillRect(h.x,h.y+h.h-3,h.w,3);
    ctx.fillStyle="rgba(255,170,70,.7)";
    for(let i=0;i<3;i++){ const fx=h.x+7+i*10, fl=5+Math.sin(T*9+i+h.x)*3;
      ctx.beginPath(); ctx.moveTo(fx,h.y+h.h-3); ctx.quadraticCurveTo(fx+3,h.y+h.h-8-fl,fx+5,h.y+h.h-3); ctx.fill(); } }

  // tiles com relevo + topo de grama-gosma (tema)
  function drawTile(s){
    const above=blockedAt(s.x+16,s.y-16) || s.y<TILE;      // tem bloco/rocha ACIMA? (fantasma conta)
    const below=blockedAt(s.x+16,s.y+s.h+16);              // tem bloco ABAIXO?
    // base com leve sobreposição pra NÃO deixar fresta/linha entre blocos vizinhos
    ctx.fillStyle=th.tile; ctx.fillRect(s.x-0.6,s.y-0.6,s.w+1.2,s.h+1.2);
    // grama só no TOPO exposto (superfície)
    if(!above){ ctx.fillStyle=th.top; ctx.fillRect(s.x-0.6,s.y,s.w+1.2,6);
      ctx.fillStyle=th.top2; for(let i=0;i<2;i++){ const dx=s.x+8+i*14; ctx.beginPath();
        ctx.arc(dx,s.y+6,3+(i?1:0),0,Math.PI); ctx.fill(); }
      ctx.fillStyle="rgba(255,255,255,.05)"; ctx.fillRect(s.x+4,s.y+9,2,2); }   // textura só na superfície
    // sombra suave só na BASE exposta — dá volume SEM criar linhas no interior do bloco
    if(!below){ ctx.fillStyle="rgba(0,0,0,.18)"; ctx.fillRect(s.x-0.6,s.y+s.h-3,s.w+1.2,3); }
  }
  for(const s of solidTiles) if(vis(s)) drawTile(s);
  // GELO por cima: brilho gélido azul-claro (avisa visualmente que escorrega)
  for(const t of iceTiles){ if(!vis(t))continue;
    const gg=ctx.createLinearGradient(0,t.y,0,t.y+t.h); gg.addColorStop(0,"rgba(200,240,255,.72)"); gg.addColorStop(1,"rgba(120,190,225,.34)");
    ctx.fillStyle=gg; ctx.fillRect(t.x,t.y,t.w,t.h);
    ctx.fillStyle="rgba(255,255,255,.85)"; ctx.fillRect(t.x,t.y,t.w,2);
    ctx.strokeStyle="rgba(255,255,255,.35)"; ctx.lineWidth=1;          // rachaduras de gelo
    ctx.beginPath(); ctx.moveTo(t.x+7,t.y+4); ctx.lineTo(t.x+12,t.y+15); ctx.moveTo(t.x+22,t.y+6); ctx.lineTo(t.x+18,t.y+20); ctx.stroke(); }
  // paredes FANTASMA: renderizam IDÊNTICAS a um bloco sólido; só somem quando você entra
  for(const s of fakes){ if(!vis(s)||s.rev>=1)continue;
    if(s.rev>0){ ctx.globalAlpha=1-s.rev; drawTile(s); ctx.globalAlpha=1; }
    else drawTile(s); }
  // plataformas que DESMORONAM (rachadas; tremem antes de cair)
  for(const c of crumbles){ if(!vis(c))continue;
    if(c.solid){ const jit=c.t>0?(Math.random()*2-1)*c.t*3:0;
      ctx.save(); ctx.translate(jit,0);
      ctx.fillStyle="#6a5238"; ctx.fillRect(c.x,c.y,c.w,c.h);
      ctx.fillStyle="#8a6a48"; ctx.fillRect(c.x,c.y,c.w,3);
      ctx.strokeStyle="rgba(0,0,0,.4)"; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(c.x+10,c.y); ctx.lineTo(c.x+14,c.y+13); ctx.lineTo(c.x+9,c.y+c.h);
      ctx.moveTo(c.x+22,c.y+4); ctx.lineTo(c.x+18,c.y+18); ctx.stroke(); ctx.restore();
    } else { ctx.globalAlpha=0.16; ctx.fillStyle="#6a5238"; ctx.fillRect(c.x,c.y,c.w,c.h); ctx.globalAlpha=1; }
  }
  // molas (trampolim)
  for(const sp of springs){ const c=sp.sq*6;
    ctx.fillStyle="#2a5a6a"; roundRect(sp.x+3,sp.y+8+c,sp.w-6,sp.h-10-c,5); ctx.fill();
    ctx.fillStyle="#9fe8ff"; roundRect(sp.x+2,sp.y+4+c,sp.w-4,7,4); ctx.fill();
    ctx.strokeStyle="rgba(159,232,255,.5)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(sp.x+7,sp.y+22); ctx.lineTo(sp.x+16,sp.y+13+c); ctx.lineTo(sp.x+25,sp.y+22); ctx.stroke(); }
  // portas / placas
  if(doors.length){ const open=plateOn();
    for(const d of doors){ ctx.fillStyle=open?"rgba(126,224,107,.12)":"#3a2b3a"; ctx.fillRect(d.x,d.y,d.w,d.h);
      if(!open){ctx.strokeStyle="#5a4560";ctx.lineWidth=2;ctx.strokeRect(d.x+2,d.y+2,d.w-4,d.h-4);} } }
  for(const p of plates){ const on=plateOn(); ctx.fillStyle=on?"#7ee06b":"#caa64a";
    ctx.fillRect(p.x+4,p.y+(on?TILE-6:TILE-8),p.w-8,on?4:6);
    ctx.fillStyle="rgba(0,0,0,.25)"; ctx.fillRect(p.x+4,p.y+TILE-2,p.w-8,2); }

  // plataformas móveis (jangada de gosma)
  for(const m of movers){
    const g=ctx.createLinearGradient(0,m.y,0,m.y+m.h);
    g.addColorStop(0,"#7fe0d0"); g.addColorStop(1,"#2f8f86");
    ctx.fillStyle=g; roundRect(m.x,m.y,m.w,m.h,8); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.25)"; roundRect(m.x+4,m.y+3,m.w*0.4,4,3); ctx.fill();
    ctx.fillStyle="#2f8f86"; for(let i=0;i<3;i++){ const dx=m.x+8+i*(m.w-16)/2;
      ctx.beginPath(); ctx.arc(dx,m.y+m.h,3+Math.sin(T*4+i)*1.2,0,Math.PI); ctx.fill(); } }

  // espinhos — lâminas afiadas (cristal/osso) sobre base rochosa, com volume 3D e brilho
  for(const s of spikes){ const bot=s.y+TILE;
    // base rochosa escura de onde nascem os espinhos
    const bg=ctx.createLinearGradient(0,bot-8,0,bot); bg.addColorStop(0,"#432619"); bg.addColorStop(1,"#170b06");
    ctx.fillStyle=bg; roundRect(s.x, bot-7, TILE, 7, 2.5); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.07)"; ctx.fillRect(s.x+1,bot-7,TILE-2,1.4);
    // 3 lâminas (a central mais alta) — desenhadas de trás pra frente
    spikeBlade(s.x+6,  bot-3, s.y+9,  5);
    spikeBlade(s.x+26, bot-3, s.y+9,  5);
    spikeBlade(s.x+16, bot-3, s.y+2,  5.6); }

  // gosmas (bobbing)
  for(const p of pickups){ const by=p.y+Math.sin(T*3+p.x)*3;
    ctx.save(); ctx.shadowColor="#a6f08a"; ctx.shadowBlur=12;
    ctx.fillStyle="#a6f08a"; ctx.beginPath(); ctx.arc(p.x,by,p.r,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle="rgba(255,255,255,.6)"; ctx.beginPath(); ctx.arc(p.x-3,by-3,2.4,0,7); ctx.fill(); }

  // estrelas VISÍVEIS (coletável dourado — o jogador SABE que estão lá)
  for(const st of stars){ if(st.got||!vis({x:st.x-16,y:st.y-16,w:32,h:32}))continue;
    const sy=st.y+Math.sin(T*2.5+st.x)*3;
    ctx.save(); ctx.translate(st.x,sy); ctx.rotate(Math.sin(T*1.2+st.x)*0.18);
    ctx.shadowColor="#ffd24a"; ctx.shadowBlur=16;
    const sg=ctx.createLinearGradient(0,-st.r,0,st.r); sg.addColorStop(0,"#fff0a8"); sg.addColorStop(1,"#f0a83a");
    ctx.fillStyle=sg; ctx.beginPath();
    for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr=i%2?st.r*0.44:st.r*1.08;
      const x=Math.cos(a)*rr, y=Math.sin(a)*rr; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath(); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.85)"; ctx.beginPath(); ctx.arc(-st.r*0.22,-st.r*0.22,st.r*0.24,0,7); ctx.fill();
    ctx.restore(); }

  // gemas = SEGREDOS ocultos: INVISÍVEIS até serem reveladas (gm.rev>0). Estilo Fez —
  // você pode zerar o jogo sem NUNCA ver uma. Só materializa quando você entra no esconderijo.
  for(const gm of gems){ if(gm.got||gm.rev<=0||!vis({x:gm.x-16,y:gm.y-16,w:32,h:32}))continue;
    const gy=gm.y+Math.sin(T*2.5+gm.x)*3, r=gm.r;
    ctx.save(); ctx.globalAlpha=gm.rev; ctx.translate(gm.x,gy); ctx.rotate(Math.sin(T*1.5+gm.x)*0.25);
    ctx.shadowColor="#c9a6ff"; ctx.shadowBlur=16;
    const gg=ctx.createLinearGradient(0,-r,0,r); gg.addColorStop(0,"#efe0ff"); gg.addColorStop(1,"#8a5fd0");
    ctx.fillStyle=gg; ctx.beginPath(); ctx.moveTo(0,-r); ctx.lineTo(r*0.8,0); ctx.lineTo(0,r); ctx.lineTo(-r*0.8,0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,.7)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(-r*0.8,0); ctx.lineTo(r*0.8,0); ctx.stroke();
    ctx.restore(); }

  // inimigos: GUARDIÃO (patrulha = estrela espinhosa) vs PERSEGUIDOR/CHEFE (assombração = fantasma de 1 olho)
  for(const e of enemies){ const cx=e.x+e.w/2, cy=e.y+e.h/2, r=e.w/2, mad=e.mad||0, ed=(e.dir||1);
    if(e.type==="patrol"){
      // GUARDIÃO: estrela espinhosa vermelha (visual ORIGINAL, simples)
      ctx.save(); ctx.shadowColor="rgba(255,90,60,.5)"; ctx.shadowBlur=10; ctx.fillStyle="#e0574b";
      ctx.beginPath(); for(let i=0;i<10;i++){ const rr=r*(i%2?0.72:1.05+Math.sin(T*8+i)*0.06);
        const a=i/10*6.283, x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(cx-4+ed*2,cy-2,2.6,0,7); ctx.arc(cx+5+ed*2,cy-2,2.6,0,7); ctx.fill();
      ctx.fillStyle="#3a0a0a"; ctx.beginPath(); ctx.arc(cx-4+ed*3,cy-2,1.3,0,7); ctx.arc(cx+5+ed*3,cy-2,1.3,0,7); ctx.fill();
      continue;
    }
    // ASSOMBRAÇÃO (perseguidor / chefe): fantasma escuro, translúcido, com UM olho que te segue.
    const boss=e.type==="boss";
    // TELEGRAFO do SALTO-PANCADA: marca vermelha pulsante no chão sob o chefe (avisa pra desviar/pular)
    if(boss && (e.mode==='wind'||e.mode==='leap')){
      const gy=(e.y0!=null?e.y0:e.y)+e.h+2, pw=e.w*(e.mode==='leap'?1.4:1.0)*(0.8+Math.sin(T*18)*0.2);
      ctx.save(); ctx.globalAlpha=0.5+Math.sin(T*18)*0.25;
      ctx.strokeStyle="#ff3b6b"; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(cx,gy,pw,5,0,0,7); ctx.stroke();
      ctx.fillStyle="rgba(255,59,107,.18)"; ctx.beginPath(); ctx.ellipse(cx,gy,pw,5,0,0,7); ctx.fill();
      ctx.restore();
    }
    const hitFlash = boss && e.hitT>0 && Math.floor(e.hitT*18)%2===0;   // pisca branco ao levar dano
    let bodyDark = boss ? (mad>0.1?"#7a1e5e":"#4a1440") : (mad>0.1?"#8a1830":"#5a1428");
    let bodyLite = boss ? (mad>0.1?"#c0246e":"#7a2860") : (mad>0.1?"#d0304a":"#8a2842");
    if(hitFlash){ bodyDark="#ffd0e0"; bodyLite="#ffffff"; }
    ctx.save();
    ctx.shadowColor = mad>0.1? `rgba(255,60,90,${0.45+mad*0.4})` : "rgba(120,40,90,.45)";
    ctx.shadowBlur = (boss?18:11) + mad*12;
    ctx.globalAlpha = 0.9;
    const grd=ctx.createLinearGradient(0,cy-r,0,cy+r*1.2); grd.addColorStop(0,bodyLite); grd.addColorStop(1,bodyDark);
    ctx.fillStyle=grd;
    // corpo: cúpula em cima + base ondulada (cauda de fantasma), balançando
    const baseY=cy+r*1.02;
    ctx.beginPath(); ctx.arc(cx,cy,r,Math.PI,0); ctx.lineTo(cx+r,baseY);
    const humps=boss?5:4;
    for(let i=0;i<humps;i++){ const x2=cx+r-(2*r)*((i+1)/humps), wob=Math.sin(T*6+i*1.3+e.x0)*(r*0.12);
      ctx.quadraticCurveTo(cx+r-(2*r)*((i+0.5)/humps), baseY-r*0.34+wob, x2, baseY-Math.abs(wob)*0.4); }
    ctx.closePath(); ctx.fill();
    // wisps subindo (aura)
    ctx.globalAlpha=0.5*(0.5+mad*0.5);
    for(let i=0;i<3;i++){ const wx=cx+Math.sin(T*2+i*2)*r*0.5, wy=cy-r-6-((T*30+i*22)%26);
      ctx.beginPath(); ctx.arc(wx,wy,2.2-i*0.4,0,7); ctx.fill(); }
    ctx.restore();
    // UM olho grande que segue o jogador (mira no blob)
    const er=r*(boss?0.5:0.56), lx=(blob?blob.x+blob.w/2:cx)-cx, ly=(blob?blob.y+blob.h/2:cy)-cy;
    const ll=Math.hypot(lx,ly)||1, pdx=(lx/ll)*er*0.42, pdy=(ly/ll)*er*0.42;
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(cx,cy-r*0.05,er,0,7); ctx.fill();
    ctx.fillStyle = mad>0.35? "#c00018" : "#2a0812";
    ctx.beginPath(); ctx.arc(cx+pdx,cy-r*0.05+pdy,er*0.52,0,7); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.85)"; ctx.beginPath(); ctx.arc(cx+pdx-er*0.16,cy-r*0.05+pdy-er*0.16,er*0.18,0,7); ctx.fill();
    // "!" ao acordar (só perseguidor)
    if(e.type==="chaser"&&(e.alert||0)>0.05&&mad<0.3){ ctx.fillStyle=`rgba(255,220,120,${e.alert})`;
      ctx.font="bold 12px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("!",cx,cy-r-8); } }

  // portal de saída (anéis pulsantes + estrela)
  drawPortal(exitRect.x+exitRect.w/2, exitRect.y+exitRect.h/2);

  // trampolins 2x2 (superfície elástica — brilho sutil no topo)
  for(const tp of tramp){ const c=tp.sq*7;
    ctx.strokeStyle="rgba(139,233,255,.85)"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(tp.x+4,tp.y+2+c); ctx.quadraticCurveTo(tp.x+tp.w/2,tp.y-6+c*2,tp.x+tp.w-4,tp.y+2+c); ctx.stroke(); }
  // ONDAS de choque (pulo/pouso/impacto/mola/reabsorção)
  for(const r of rings){ const al=Math.max(0,r.life/r.max);
    ctx.globalAlpha=al*0.8; ctx.strokeStyle=`rgba(${r.color},1)`; ctx.lineWidth=r.width*(0.4+al*0.6);
    ctx.beginPath(); ctx.arc(r.x,r.y,r.r,0,7); ctx.stroke(); }
  ctx.globalAlpha=1;
  // pedaços (gelecas soltas) — mini cubinhos de geleia VIVOS: têm mini-olhos (dica leve
  // de que estão vivos e dá pra interagir/tocar). Trampolins ficam azul.
  for(const g of globs){ const solid=g.solid, a=solid?1:0.5, gcx=g.x+g.w/2, gcy=g.y+g.h/2;
    const gx=g.x, gy=g.y, gw=g.w, gh=g.h, rr=Math.min(gw,gh)*0.28;
    const top = g.tramp?"#d2f6ff":"#eaffd2", mid=g.tramp?"#62c8e6":"#7fd06a", ed=g.tramp?"#2f8fb0":"#3d9636";
    // PLOP de nascimento: o pedaço recém-desprendido se "molda" com uma quicada elástica
    ctx.save();
    const gage = g.born ? (performance.now()-g.born)/240 : 2;
    if(gage<1){ const k=1-gage, wob=Math.cos(gage*8);
      const sx=1+0.34*k*wob, sy=1-0.30*k*wob;
      ctx.translate(gcx, gy+gh); ctx.scale(sx,sy); ctx.translate(-gcx, -(gy+gh)); }
    // sombra de contato (só quando já é bloco sólido)
    if(solid){ ctx.fillStyle="rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(gcx,gy+gh+1.5,gw*0.42,3,0,0,7); ctx.fill(); }
    // corpo: mini-cubo de geleia translúcido (mesmo estilo do herói)
    ctx.save(); ctx.globalAlpha=a;
    ctx.shadowColor=g.tramp?"rgba(120,230,255,.5)":"rgba(126,224,107,.42)"; ctx.shadowBlur=solid?8:4;
    const gg=ctx.createLinearGradient(0,gy,0,gy+gh); gg.addColorStop(0,top); gg.addColorStop(0.55,mid); gg.addColorStop(1,ed);
    ctx.fillStyle=gg; roundRect(gx,gy,gw,gh,rr); ctx.fill(); ctx.restore();
    ctx.globalAlpha=a;
    // sombreamento lateral 3D + núcleo interno
    ctx.save(); roundRect(gx,gy,gw,gh,rr); ctx.clip();
    const side=ctx.createLinearGradient(gx,0,gx+gw,0); side.addColorStop(0,"rgba(255,255,255,.10)"); side.addColorStop(0.5,"rgba(0,0,0,0)"); side.addColorStop(1,"rgba(0,30,10,.20)");
    ctx.fillStyle=side; ctx.fillRect(gx,gy,gw,gh);
    ctx.fillStyle="rgba(0,40,12,.12)"; roundRect(gx+gw*0.24,gy+gh*0.44,gw*0.52,gh*0.42,rr*0.5); ctx.fill();
    ctx.restore();
    // face-topo (lid brilhante = leitura de cubo)
    ctx.fillStyle="rgba(255,255,255,.28)"; roundRect(gx+gw*0.16,gy+gh*0.07,gw*0.68,gh*0.22,rr*0.6); ctx.fill();
    // bolhas internas
    ctx.fillStyle="rgba(255,255,255,.34)"; ctx.beginPath();
    ctx.arc(gcx-gw*0.13,gcy+gh*0.10,1.5,0,7); ctx.arc(gcx+gw*0.16,gcy-gh*0.02,1,0,7); ctx.fill();
    // contorno + rim light
    ctx.strokeStyle= g.tramp ? "rgba(150,235,255,.85)" : "rgba(80,170,70,.72)"; ctx.lineWidth=1.4; roundRect(gx+0.7,gy+0.7,gw-1.4,gh-1.4,rr-1); ctx.stroke();
    ctx.strokeStyle="rgba(255,255,255,.5)"; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.arc(gx+rr+1.5,gy+rr+1.5,rr-1,Math.PI,Math.PI*1.5); ctx.stroke();
    ctx.globalAlpha=1;
    // MINI-OLHOS (só nas sólidas — as recém-soltas ainda estão "se formando")
    if(solid){
      const seed=(g.x*0.7+g.y*0.3), blink=Math.sin(T*1.3+seed)>0.93;   // pisca de vez em quando
      const look = blob ? Math.sign((blob.x+blob.w/2)-gcx)*0.8 : 0;      // olha levemente pro jogador
      const ox=g.w*0.16, oy=gcy-1, orr=Math.max(1.6,g.w*0.09);
      if(!blink){ ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(gcx-ox,oy,orr,0,7); ctx.arc(gcx+ox,oy,orr,0,7); ctx.fill();
        ctx.fillStyle="#0a2012"; ctx.beginPath(); ctx.arc(gcx-ox+look,oy,orr*0.55,0,7); ctx.arc(gcx+ox+look,oy,orr*0.55,0,7); ctx.fill(); }
      else { ctx.strokeStyle="#0a2012"; ctx.lineWidth=1.4; ctx.beginPath();
        ctx.moveTo(gcx-ox-orr,oy); ctx.lineTo(gcx-ox+orr,oy); ctx.moveTo(gcx+ox-orr,oy); ctx.lineTo(gcx+ox+orr,oy); ctx.stroke(); }
    }
    ctx.restore();                                        // fecha o PLOP de nascimento
  }

  // RASTRO DE GOSMA — cópias que derretem (achatam e afundam) ao sumir, dão a leitura de slime
  for(const gh of trail){ const k=gh.life/gh.max, al=k*0.34;                 // k: 1→0 conforme some
    const melt=1-k;                                                          // quanto mais velho, mais "derretido"
    const w=gh.w*(1+melt*0.28), h=gh.h*(1-melt*0.45), x=gh.x-(w-gh.w)/2, y=gh.y+(gh.h-h);  // espalha e afunda
    ctx.globalAlpha=al; ctx.fillStyle=gh.cling?"#7fe0d0":(gh.melt?"#ffbe6a":"#8bec7c");
    roundRect(x, y, w, h, Math.min(w,h)*0.4); ctx.fill();
    ctx.globalAlpha=al*0.5; ctx.fillStyle="rgba(255,255,255,.5)";           // brilho úmido no topo
    roundRect(x+w*0.2, y+h*0.12, w*0.6, h*0.28, h*0.2); ctx.fill(); }
  ctx.globalAlpha=1;

  drawBlob();

  // PROJÉTEIS de gosma do chefe (bolhas brilhantes com rastro)
  for(const s of shots){ ctx.save(); ctx.shadowColor="rgba(210,74,154,.75)"; ctx.shadowBlur=13;
    const gg=ctx.createRadialGradient(s.x-2,s.y-3,1,s.x,s.y,s.r); gg.addColorStop(0,"#ffa8d8"); gg.addColorStop(1,"#9c1e66");
    ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle="rgba(255,255,255,.55)"; ctx.beginPath(); ctx.arc(s.x-3,s.y-3,s.r*0.3,0,7); ctx.fill(); }

  for(const p of particles){ ctx.globalAlpha=Math.max(0,p.life/p.max); ctx.fillStyle=p.color;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill(); }
  ctx.globalAlpha=1;

  // vinheta
  ctx.setTransform(1,0,0,1,0,0);
  const vg=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.75);
  vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(0,0,0,.42)");
  ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
  // BARRA DE VIDA DO CHEFE (topo da tela) — durante a luta
  const bossE=enemies&&enemies.find(e=>e.type==="boss");
  if(bossE){ const bw=W*0.6, bh=16*(W/640), bx=(W-bw)/2, byy=18*(W/640), maxHp=3;
    ctx.fillStyle="rgba(0,0,0,.45)"; roundRect(bx-4,byy-4,bw+8,bh+8,8); ctx.fill();
    for(let i=0;i<maxHp;i++){ const seg=bw/maxHp, sx=bx+i*seg;
      ctx.fillStyle = i< (bossE.hp||0) ? (bossE.hitT>0?"#ffffff":"#ff4d7e") : "rgba(255,255,255,.12)";
      roundRect(sx+3,byy,seg-6,bh,5); ctx.fill(); }
    ctx.fillStyle="#ffd0e0"; ctx.font=`bold ${Math.round(12*(W/640))}px sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("A GOSMA-MÃE", W/2, byy+bh/2); }
  // transição de entrada da fase (fade)
  if(transition>0){ ctx.fillStyle=`rgba(0,0,0,${transition})`; ctx.fillRect(0,0,W,H); }
}
function isSolidAt(px,py){ for(const s of solidTiles) if(px>=s.x&&px<s.x+s.w&&py>=s.y&&py<s.y+s.h) return true; return false; }
// parede FANTASMA ainda "cheia" (não atravessada) conta como sólido pra decidir grama/sombra —
// assim o piso de um segredo NÃO ganha grama e não denuncia o esconderijo.
function isFakeAt(px,py){ for(const f of fakes) if(f.rev<1 && px>=f.x&&px<f.x+f.w&&py>=f.y&&py<f.y+f.h) return true; return false; }
function blockedAt(px,py){ return isSolidAt(px,py)||isFakeAt(px,py); }

// ---- fundo em parallax (estilo plataforma) ----
function hillLayer(color, factor, baseY, spacing, height){
  const W=canvas.width, H=canvas.height;
  ctx.fillStyle=color;
  const off=-((cam.x*zoom*factor)%spacing), by=baseY - cam.y*zoom*0.06;
  ctx.beginPath(); ctx.moveTo(-spacing, H+2);
  for(let x=off-spacing; x<W+spacing; x+=spacing)
    ctx.quadraticCurveTo(x+spacing*0.5, by-height, x+spacing, by);
  ctx.lineTo(W+spacing, H+2); ctx.closePath(); ctx.fill();
}
function cloudShape(x,y,r){ ctx.beginPath();
  ctx.arc(x,y,r,0,7); ctx.arc(x+r*0.9,y+4,r*0.7,0,7); ctx.arc(x-r*0.9,y+5,r*0.66,0,7); ctx.arc(x+r*0.25,y-r*0.5,r*0.58,0,7); ctx.fill(); }
function peakLayer(color, factor, baseY, spacing, height){   // montanhas pontudas (silhueta)
  const W=canvas.width, H=canvas.height;
  ctx.fillStyle=color; const off=-((cam.x*zoom*factor)%spacing), by=baseY - cam.y*zoom*0.05;
  ctx.beginPath(); ctx.moveTo(-spacing, H+2);
  for(let x=off-spacing; x<W+spacing; x+=spacing){ ctx.lineTo(x+spacing*0.5, by-height); ctx.lineTo(x+spacing, by); }
  ctx.lineTo(W+spacing, H+2); ctx.closePath(); ctx.fill();
}
// SILHUETA característica de cada mundo (crystal/berg/stalac/chunk/peak)
function decoLayer(th){ const kind=th.deco, W=canvas.width,H=canvas.height,sc=W/640;
  ctx.fillStyle=th.far;
  if(kind==="stalac"){ const sp=150*sc, off=-((cam.x*zoom*0.12)%sp);   // estalactites do teto (caverna)
    ctx.beginPath(); ctx.moveTo(-sp,-2);
    for(let x=off-sp;x<W+sp;x+=sp){ const hh=(55+(Math.abs(x)*7%50))*sc; ctx.lineTo(x+sp*0.5,hh); ctx.lineTo(x+sp,-2); }
    ctx.lineTo(W+sp,-2); ctx.closePath(); ctx.fill();
    peakLayer(th.far,0.10,H*0.66,240*sc,170*sc);
  } else if(kind==="crystal"){ const sp=118*sc, off=-((cam.x*zoom*0.12)%sp), by=H*0.72-cam.y*zoom*0.05;  // cristais (profundezas)
    ctx.beginPath(); ctx.moveTo(-sp,H+2);
    for(let x=off-sp;x<W+sp;x+=sp){ const hh=(170+(Math.abs(x)*13%140))*sc; ctx.lineTo(x+sp*0.42,by-hh); ctx.lineTo(x+sp,by); }
    ctx.lineTo(W+sp,H+2); ctx.closePath(); ctx.fill();
  } else if(kind==="chunk"){ const sp=200*sc, off=-((cam.x*zoom*0.10)%sp);   // pedras flutuantes (vazio)
    for(let x=off-sp;x<W+sp;x+=sp){ const y=(H*0.28+(Math.abs(x)*17%Math.floor(H*0.38)))-cam.y*zoom*0.04, s=(22+(Math.abs(x)*7%20))*sc;
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+s,y-s*0.4); ctx.lineTo(x+s*1.4,y+s*0.3); ctx.lineTo(x+s*0.6,y+s*0.7); ctx.closePath(); ctx.fill(); }
    peakLayer(th.far,0.10,H*0.70,260*sc,120*sc);
  } else if(kind==="berg"){ peakLayer(th.far,0.10,H*0.70,300*sc,140*sc); }  // icebergs largos
  else if(kind==="grove"){                                                    // FLORESTA (Mundo 1)
    const by=H*0.74-cam.y*zoom*0.05;
    // fileira distante de árvores (silhueta)
    const sp=112*sc, off=-((cam.x*zoom*0.13)%sp);
    for(let x=off-sp;x<W+sp;x+=sp){ const tx=x+sp*0.5, r=(32+(Math.abs(Math.round(x))*7%20))*sc, ty=by-r*1.5;
      ctx.fillRect(tx-3*sc,ty,6*sc,(by-ty)+2);
      ctx.beginPath(); ctx.arc(tx,ty,r,0,7); ctx.arc(tx-r*0.62,ty+r*0.32,r*0.66,0,7); ctx.arc(tx+r*0.62,ty+r*0.32,r*0.66,0,7); ctx.arc(tx,ty-r*0.5,r*0.6,0,7); ctx.fill(); }
    hillLayer(th.far,0.10,H*0.78,320*sc,120*sc);
  }
  else { peakLayer(th.far,0.10,H*0.66,240*sc,220*sc); }                       // 'peak' padrão
}
// ---- PARALLAX com ARTE (imagens de IA) — Mundo 1 · Vale ----
function bandLayer(src, factor, baseYf, hf){
  if(!src) return; const iw=src.naturalWidth||src.width, ih=src.naturalHeight||src.height; if(!iw) return;
  const W=canvas.width, H=canvas.height;
  const sw=Math.floor(iw*0.955), sh=ih;               // recorta ~4.5% da direita (marca d'água ✦)
  const dh=H*hf, dw=dh*(sw/sh), y=H*baseYf-dh - cam.y*zoom*0.04;
  let off=-((cam.x*zoom*factor)%dw); if(off>0)off-=dw;
  for(let x=off; x<W; x+=dw) ctx.drawImage(src, 0,0,sw,sh, x,y,dw,dh);
}
function drawValeArt(){
  const W=canvas.width, H=canvas.height, sky=BG.ceu, iw=sky.naturalWidth, ih=sky.naturalHeight;
  const sw=Math.floor(iw*0.955);
  // CÉU (cobre a tela; parallax leve, sem repetir)
  const s=Math.max(W/sw, H/ih)*1.04, dw=sw*s, dh=ih*s;
  const sx=-((cam.x*zoom*0.05)%dw), sy=(H-dh)*0.5 - cam.y*zoom*0.02;
  for(let x=sx-dw; x<W; x+=dw) ctx.drawImage(sky, 0,0,sw,ih, x,sy,dw,dh);
  // NÉVOA DO VALE: preenche do horizonte pra baixo com verde escuro (evita o "vazio" de céu
  // abaixo das copas — a base da floresta nunca fica flutuando sobre o nada).
  const hy=H*0.46 - cam.y*zoom*0.03, hz=ctx.createLinearGradient(0,hy,0,H);
  hz.addColorStop(0,"rgba(20,46,30,0)"); hz.addColorStop(0.4,"#183a25"); hz.addColorStop(1,"#0b2013");
  ctx.fillStyle=hz; ctx.fillRect(0,hy,W,H-hy+2);
  bandLayer(BG.montanhas, 0.12, 0.62, 0.42);          // montanhas distantes (no horizonte)
  bandLayer(BG.floresta,  0.30, 0.78, 0.42);          // floresta média (fundo)
}
function drawParallax(th){
  const W=canvas.width, H=canvas.height, sc=W/640;
  if(th.art==="vale" && groveArtReady()){ drawValeArt(); return; }   // Mundo 1 usa a arte de IA
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,th.sky0); sky.addColorStop(1,th.sky1);
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  // brilho característico no horizonte (lava na forja, aura no gelo/vazio)
  if(th.glow){ const gy=H*0.74 - cam.y*zoom*0.05;
    const gg=ctx.createLinearGradient(0,gy-H*0.24,0,gy+H*0.12);
    gg.addColorStop(0,`rgba(${th.glow},0)`); gg.addColorStop(1,`rgba(${th.glow},.30)`);
    ctx.fillStyle=gg; ctx.fillRect(0,gy-H*0.24,W,H*0.36); }
  // estrelas / brilhos no céu (twinkle)
  for(let i=0;i<46;i++){ let sx=((i*137*sc - cam.x*zoom*0.06)%(W+30)); if(sx<-15)sx+=W+30;
    const y=((i*71)%Math.floor(H*0.66)), tw=0.3+0.7*Math.abs(Math.sin(T*1.6+i*1.3));
    ctx.globalAlpha=tw*0.5; ctx.fillStyle=`rgb(${th.cloud})`; const s=(i%7===0?2:1.2)*sc; ctx.fillRect(sx,y,s,s); }
  ctx.globalAlpha=1;
  // raios de luz suaves descendo (god-rays) — dão vida e volume ao céu
  if(th.glow){ ctx.save(); ctx.globalCompositeOperation="lighter";
    for(let i=0;i<4;i++){ const bx=((i*197*sc + W*0.2 - cam.x*zoom*0.05)%(W+200))-100, sw=(50+i*20)*sc;
      const rg=ctx.createLinearGradient(bx,0,bx+sw,H*0.6); rg.addColorStop(0,`rgba(${th.glow},0)`); rg.addColorStop(0.5,`rgba(${th.glow},.05)`); rg.addColorStop(1,`rgba(${th.glow},0)`);
      ctx.fillStyle=rg; ctx.beginPath(); ctx.moveTo(bx,0); ctx.lineTo(bx+sw,0); ctx.lineTo(bx+sw*2.2,H*0.62); ctx.lineTo(bx+sw*1.1,H*0.62); ctx.closePath(); ctx.fill(); }
    ctx.restore(); }
  // silhueta característica do mundo bem ao fundo
  decoLayer(th);
  // morros arredondados distantes
  hillLayer(th.far, 0.18, H*0.70, 300*sc, 150*sc);
  // nuvens
  ctx.fillStyle=`rgba(${th.cloud},.15)`;
  for(let i=0;i<7;i++){ let x=((i*250*sc - (cam.x*zoom*0.26 + T*9*sc))%(W+340)); if(x<-170)x+=W+340;
    cloudShape(x, (30+(i*53)%130)*sc - cam.y*zoom*0.03, (22+(i%3)*12)*sc); }
  // morros médios
  hillLayer(th.mid, 0.38, H*0.84, 230*sc, 130*sc);
  // morros da frente (mais escuros e rápidos — profundidade)
  hillLayer(th.sky1, 0.62, H*0.98, 180*sc, 90*sc);
  // folhagem de PRIMEIRO PLANO (arbustos escuros na base — enquadra a cena, dá profundidade)
  if(th.deco==="grove"){ ctx.fillStyle=th.sky1; const sp=70*sc, off=-((cam.x*zoom*0.8)%sp), by=H+4;
    for(let x=off-sp;x<W+sp;x+=sp){ const r=(26+(Math.abs(Math.round(x))*5%16))*sc;
      ctx.beginPath(); ctx.arc(x,by,r,Math.PI,0); ctx.arc(x+sp*0.5,by,r*0.8,Math.PI,0); ctx.fill(); } }
}
function drawPortal(cx,cy){
  ctx.save();
  for(let i=0;i<3;i++){ const r=10+i*5+Math.sin(T*2+i)*2, a=0.5-i*0.14;
    ctx.strokeStyle=`rgba(126,224,107,${a})`; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(cx,cy,r,0,7); ctx.stroke(); }
  ctx.shadowColor="#7ee06b"; ctx.shadowBlur=18; ctx.fillStyle="#7ee06b";
  ctx.beginPath(); ctx.arc(cx,cy,7,0,7); ctx.fill(); ctx.restore();
  // sparkles girando
  for(let i=0;i<4;i++){ const a=T*2+i*1.57, r=14; ctx.fillStyle="rgba(182,246,164,.9)";
    ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.6,0,7); ctx.fill(); }
  ctx.fillStyle="#07160e"; ctx.font="bold 13px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText("★",cx,cy+1);
}

// caminho de gosma (blob ondulado)
// uma lâmina de espinho afiada com volume 3D, espinha especular e ponta brilhante
function spikeBlade(cx, baseY, topY, hw){
  // sombra projetada (leve deslocamento pra direita)
  ctx.fillStyle="rgba(0,0,0,.30)";
  ctx.beginPath(); ctx.moveTo(cx-hw+2,baseY); ctx.lineTo(cx+2,topY+3); ctx.lineTo(cx+hw+2,baseY); ctx.closePath(); ctx.fill();
  // corpo com gradiente lateral (quente na esquerda → escuro na direita)
  const g=ctx.createLinearGradient(cx-hw,0,cx+hw,0);
  g.addColorStop(0,"#ffb0b0"); g.addColorStop(0.42,"#e34a3f"); g.addColorStop(1,"#7c1414");
  ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(cx-hw,baseY); ctx.lineTo(cx,topY); ctx.lineTo(cx+hw,baseY); ctx.closePath(); ctx.fill();
  // face esquerda iluminada (leitura de 3D)
  ctx.fillStyle="rgba(255,255,255,.20)"; ctx.beginPath();
  ctx.moveTo(cx-hw,baseY); ctx.lineTo(cx,topY); ctx.lineTo(cx-hw*0.3,baseY); ctx.closePath(); ctx.fill();
  // espinha especular ao longo da aresta
  ctx.strokeStyle="rgba(255,255,255,.55)"; ctx.lineWidth=1.1;
  ctx.beginPath(); ctx.moveTo(cx-hw*0.18,baseY-2); ctx.lineTo(cx,topY+1.5); ctx.stroke();
  // ponta afiada brilhante
  ctx.fillStyle="rgba(255,240,240,.92)"; ctx.beginPath(); ctx.arc(cx,topY+1.4,1.05,0,7); ctx.fill();
}
function slime(cx,cy,rx,ry,amp,seed){
  const N=18; ctx.beginPath();
  for(let i=0;i<=N;i++){ const a=(i/N)*Math.PI*2, w=1+amp*Math.sin(a*3+T*3+seed);
    const x=cx+Math.cos(a)*rx*w, y=cy+Math.sin(a)*ry*w; i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
  ctx.closePath();
}
// personagem: CUBO GELATINOSO estilo RPG (translúcido, face-topo 3D, bolhas, olhos)
function drawBlob(){
  const b=blob; if(b.gone) return;                 // morreu: virou espatifo, não desenha o corpo
  const sq=Math.max(-0.18,Math.min(0.18,b.vy/4000)), jig=Math.sin(T*6)*0.02;
  const w=b.w*(1-sq*0.5+jig), h=b.h*(1+sq-jig);
  const x=b.x+(b.w-w)/2, y=b.y+(b.h-h), cx=x+w/2, r=Math.min(w,h)*0.26;
  const flashing=b.flash>0&&Math.floor(b.flash*20)%2===0;
  let a,bl,ed;                                   // a=topo, bl=base, ed=cor da aresta
  if(flashing){a="#ffd0d0";bl="#ff6a6a";ed="#c83030";}
  else if(b.melting){a="#ffe0a8";bl="#e0842a";ed="#b45a10";}
  else if(b.cling){a="#cffaf0";bl="#33b0a0";ed="#1e7e72";}
  else {a="#e6ffc8";bl="#5ec84a";ed="#2f8f30";}

  // sombra de contato (elíptica)
  ctx.fillStyle="rgba(0,0,0,.30)"; ctx.beginPath(); ctx.ellipse(cx,b.y+b.h+2,w*0.44,5,0,0,7); ctx.fill();

  // ---- CORPO: cubo de geleia translúcido ----
  ctx.save(); ctx.shadowColor=b.melting?"rgba(255,150,70,.55)":(b.cling?"rgba(120,240,220,.5)":"rgba(126,224,107,.5)"); ctx.shadowBlur=14;
  const gr=ctx.createLinearGradient(0,y,0,y+h);
  gr.addColorStop(0,a); gr.addColorStop(0.5,bl); gr.addColorStop(1,ed);
  ctx.globalAlpha=0.9; ctx.fillStyle=gr; roundRect(x,y,w,h,r); ctx.fill(); ctx.globalAlpha=1; ctx.restore();

  // sombreamento das FACES do cubo (lado direito e base mais escuros = volume 3D)
  ctx.save(); roundRect(x,y,w,h,r); ctx.clip();
  const side=ctx.createLinearGradient(x,0,x+w,0); side.addColorStop(0,"rgba(255,255,255,.10)"); side.addColorStop(0.5,"rgba(0,0,0,0)"); side.addColorStop(1,"rgba(0,30,10,.22)");
  ctx.fillStyle=side; ctx.fillRect(x,y,w,h);
  // núcleo interno (volume de geleia, mais escuro no centro-baixo)
  ctx.fillStyle="rgba(0,40,12,.14)"; roundRect(x+w*0.22,y+h*0.40,w*0.56,h*0.46,r*0.5); ctx.fill();
  // refração/cáustica: faixa curva clara atravessando
  ctx.strokeStyle="rgba(255,255,255,.14)"; ctx.lineWidth=Math.max(2,w*0.06);
  ctx.beginPath(); ctx.moveTo(x+w*0.15,y+h*0.62); ctx.quadraticCurveTo(x+w*0.5,y+h*0.5,x+w*0.9,y+h*0.66); ctx.stroke();
  ctx.restore();

  // FACE-TOPO do cubo (lid brilhante = leitura de cubo 3D)
  ctx.fillStyle="rgba(255,255,255,.26)"; roundRect(x+w*0.14,y+h*0.05,w*0.72,h*0.20,r*0.55); ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.14)"; roundRect(x+w*0.14,y+h*0.05,w*0.72,h*0.34,r*0.55); ctx.fill();

  // bolhas internas (mais e com brilho)
  for(let i=0;i<4;i++){ const bx=x+w*(0.28+0.16*i)+Math.sin(T*1.5+i*2)*2, by=y+h*(0.46+0.11*i)+Math.cos(T*1.3+i)*2, br=1.3+((i*7)%3)*0.7;
    ctx.fillStyle="rgba(255,255,255,.34)"; ctx.beginPath(); ctx.arc(bx,by,br,0,7); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.6)"; ctx.beginPath(); ctx.arc(bx-br*0.4,by-br*0.4,br*0.4,0,7); ctx.fill(); }

  // rim light (aresta superior-esquerda acesa)
  ctx.strokeStyle="rgba(255,255,255,.5)"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.arc(x+r+2,y+r+2,r-1,Math.PI,Math.PI*1.5); ctx.stroke();
  // contorno geral sutil
  ctx.strokeStyle="rgba(255,255,255,.22)"; ctx.lineWidth=1.5; roundRect(x+1,y+1,w-2,h-2,r-1); ctx.stroke();
  // specular (brilho principal)
  ctx.fillStyle="rgba(255,255,255,.7)"; ctx.beginPath(); ctx.ellipse(x+w*0.3,y+h*0.2,w*0.14,h*0.08,-0.5,0,7); ctx.fill();

  // ---- OLHOS ----
  const dir=b.vx>12?1:(b.vx<-12?-1:0), ex=w*0.2, ey=y+h*0.5, er=Math.max(2.8,w*0.11);
  const blink=b.blink<0.12;
  if(!blink){ ctx.fillStyle="#fff"; eye(cx-ex,ey,er); eye(cx+ex,ey,er);
    ctx.fillStyle="#0a2012"; pupil(cx-ex+dir*2,ey,er); pupil(cx+ex+dir*2,ey,er);
    ctx.fillStyle="rgba(255,255,255,.95)"; ctx.beginPath(); ctx.arc(cx-ex+dir*2-1,ey-1,er*0.24,0,7); ctx.arc(cx+ex+dir*2-1,ey-1,er*0.24,0,7); ctx.fill(); }
  else { ctx.strokeStyle="#0a2012"; ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(cx-ex-er,ey);ctx.lineTo(cx-ex+er,ey);ctx.moveTo(cx+ex-er,ey);ctx.lineTo(cx+ex+er,ey);ctx.stroke(); }
  function eye(px,py,rr){ ctx.beginPath(); ctx.arc(px,py,rr,0,7); ctx.fill(); }
  function pupil(px,py,rr){ ctx.beginPath(); ctx.arc(px,py,rr*0.52,0,7); ctx.fill(); }
}
function roundRect(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

// ==========================================================================
// PARTÍCULAS / SOM / HUD / OVERLAY / DICA
// ==========================================================================
function burst(x,y,n,color,speed){ for(let i=0;i<n;i++){ const a=Math.random()*6.28,s=speed*(0.4+Math.random()*0.7);
  particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-speed*0.4,life:0.5+Math.random()*0.35,max:0.85,r:2+Math.random()*2.4,color}); }
  if(particles.length>320)particles.splice(0,particles.length-320); }
// ESPATIFO: gotas grandes e gosmentas voando pra fora (usado na morte / queda dura)
const SLIMECOL=["#8bec7c","#5ec84a","#3f9636","#cdf5ab","#2f8f30"];
function splat(x,y,n,power){ for(let i=0;i<n;i++){ const a=Math.random()*6.28, s=power*(0.25+Math.random()*0.95);
  particles.push({x:x+(Math.random()*2-1)*6, y:y+(Math.random()*2-1)*4,
    vx:Math.cos(a)*s, vy:Math.sin(a)*s - power*0.55,
    life:0.5+Math.random()*0.6, max:1.1, r:3+Math.random()*5, color:SLIMECOL[(Math.random()*SLIMECOL.length)|0] }); }
  if(particles.length>380)particles.splice(0,particles.length-380); }
// SEPARAÇÃO: gotas de gosma esguichando pra CIMA quando um pedaço se desprende do jogador
function slimeSplit(x,y){ for(let i=0;i<9;i++){ const a=-Math.PI/2 + (Math.random()*2-1)*1.05, s=90+Math.random()*130;
  particles.push({x:x+(Math.random()*2-1)*7, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s,
    life:0.32+Math.random()*0.3, max:0.62, r:1.6+Math.random()*2.6, color:SLIMECOL[(Math.random()*3)|0] }); }
  if(particles.length>380)particles.splice(0,particles.length-380); }
// ONDA de choque anelar (pulo, pouso, impacto, mola). inward=true → colapsa pra dentro (reabsorção)
function ring(x,y,maxR,color,width,dur,inward){
  rings.push({x,y,r:inward?maxR:2,maxR,color:color||"126,224,107",width:width||3,life:dur||0.42,max:dur||0.42,inward:!!inward});
  if(rings.length>60)rings.shift(); }
function updateRings(dt){ for(let i=rings.length-1;i>=0;i--){ const r=rings[i]; r.life-=dt;
  if(r.life<=0){rings.splice(i,1);continue;} const t=1-r.life/r.max;
  r.r = r.inward ? Math.max(0,r.maxR*(1-t)) : r.maxR*(1-(1-t)*(1-t)); } }   // easeOut na expansão
// RASTRO de gosma: cópias que ficam pra trás e "derretem" (achatam) ao sumir, cara de slime
function pushTrail(){ trail.push({x:blob.x,y:blob.y,w:blob.w,h:blob.h,life:0.30,max:0.30,
  cling:blob.cling,melt:blob.melting}); if(trail.length>22)trail.shift(); }
function updateTrail(dt){ for(let i=trail.length-1;i>=0;i--){ trail[i].life-=dt; if(trail[i].life<=0)trail.splice(i,1); } }
// CONFETE de comemoração (vitória): partículas coloridas subindo e caindo
const CONFCOL=["#7ee06b","#ffd24a","#8be9ff","#ff8fae","#c9a6ff","#a6f08a"];
function confetti(x,y,n){ for(let i=0;i<n;i++){ const a=Math.random()*6.28, s=140+Math.random()*220;
  particles.push({x:x+(Math.random()*2-1)*30,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-260,life:1.1+Math.random()*0.9,max:2.0,r:2+Math.random()*3,color:CONFCOL[i%CONFCOL.length]}); }
  if(particles.length>360)particles.splice(0,particles.length-360); }
function updateParticles(dt){ for(let i=particles.length-1;i>=0;i--){ const p=particles[i];
  p.vy+=620*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.life-=dt; if(p.life<=0)particles.splice(i,1); } }

let actx=null, master=null;
// barramento MESTRE: TODO o áudio (música + efeitos) passa por aqui, então o mudo silencia tudo
function ensureMaster(a){ if(!master && a){ master=a.createGain(); master.gain.value = musicOn?1:0; master.connect(a.destination); } return master; }
function busOut(a){ return master || a.destination; }
// ---- amostras de áudio (arquivos .mp3): pulo e impacto de slime ----
const SFXBUF={}, SFXSRC={jump:"sfx-jump.mp3", impact:"sfx-impact.mp3"};
let sfxLoaded=false;
function loadSamples(a){ if(sfxLoaded||!a)return; sfxLoaded=true;
  for(const k in SFXSRC){ fetch(SFXSRC[k]).then(r=>r.arrayBuffer())
    .then(buf=>new Promise((res,rej)=>a.decodeAudioData(buf,res,rej)))
    .then(dec=>{ SFXBUF[k]=dec; }).catch(e=>{}); } }
function sample(name, vol){ const a=actx; if(!a||!SFXBUF[name])return false;
  try{ const s=a.createBufferSource(); s.buffer=SFXBUF[name];
    const g=a.createGain(); g.gain.value=vol==null?0.7:vol; s.connect(g); g.connect(busOut(a)); s.start();
    return true; }catch(e){ return false; } }
function audio(){ if(!actx){ try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
  if(actx){ if(actx.state==="suspended")actx.resume(); ensureMaster(actx); loadSamples(actx); loadBgm(actx); } return actx; }
function beep(a,f,t,d,ty,v){ const o=a.createOscillator(),g=a.createGain(); o.connect(g);g.connect(busOut(a));
  o.type=ty||"triangle"; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(v||0.06,t); g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.start(t);o.stop(t+d+0.02); }
function slideT(a,f0,f1,t,d,ty,v){ const o=a.createOscillator(),g=a.createGain(); o.connect(g);g.connect(busOut(a));
  o.type=ty||"square"; o.frequency.setValueAtTime(f0,t); o.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t+d);
  g.gain.setValueAtTime(v||0.06,t); g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.start(t);o.stop(t+d+0.02); }
function sfx(type){ const a=actx; if(!a)return; const t=a.currentTime;
  // amostras reais têm prioridade (com fallback sintetizado)
  if(type==="jump"){ if(sample("jump",0.55))return; }
  if(type==="impact"){ if(sample("impact",0.8))return; slideT(a,180,50,t,0.5,"sawtooth",0.07); return; }
  switch(type){ case"jump":slideT(a,520,300,t,0.12,"square",0.05);break;
    case"absorb":slideT(a,300,660,t,0.16,"sine",0.06); beep(a,1180,t+0.09,0.08,"sine",0.03);break;   // sugada gosmenta + brilho
    case"pickup":beep(a,720,t,0.09,"sine",0.06); beep(a,1040,t+0.05,0.10,"sine",0.05);break;          // "blup" macio de bolha
    case"melt":slideT(a,220,150,t,0.10,"sawtooth",0.035);break;
    case"nope":slideT(a,190,120,t,0.11,"triangle",0.045);break;                                       // recusa mais suave
    case"die":slideT(a,220,60,t,0.40,"sawtooth",0.06);break;
    case"spring":slideT(a,320,1000,t,0.18,"sine",0.06); beep(a,1320,t+0.11,0.08,"sine",0.03);break;    // boing + ping
    case"spit":slideT(a,440,150,t,0.2,"sawtooth",0.05);break;                                          // cuspe do chefe
    case"gem":[880,1180,1560].forEach((f,i)=>beep(a,f,t+i*0.06,0.09,"sine",0.05));break;
    case"star":[988,1319,1760].forEach((f,i)=>beep(a,f,t+i*0.05,0.10,"triangle",0.05));break;          // faísca de 3 notas
    case"secret":[523,659,880,1319].forEach((f,i)=>beep(a,f,t+i*0.10,0.16,"sine",0.055));break;   // acorde misterioso
    case"win":[523,659,784,1046].forEach((f,i)=>beep(a,f,t+i*0.09,0.10,"triangle",0.06));break;
    case"boss":[110,98,82].forEach((f,i)=>slideT(a,f,f*0.6,t+i*0.13,0.5,"sawtooth",0.05));break;   // rugido grave
    case"swap":[660,990,1320].forEach((f,i)=>beep(a,f,t+i*0.04,0.08,"sine",0.05));break;              // troca de corpo (whoosh)
    case"land":slideT(a,200,90,t,0.09,"sine",0.045);break;                                            // baque ao pousar
    case"bosshit":[200,300,140].forEach((f,i)=>slideT(a,f*2,f,t+i*0.05,0.14,"square",0.06));break;     // acerto no chefe
    case"hurt":slideT(a,320,120,t,0.18,"sawtooth",0.05);break; } }                                     // levou dano

// ---------------------------------------------------------------- MÚSICA AMBIENTE
let musicOn = true; try{ musicOn = localStorage.getItem("geleca_music")!=="0"; }catch(e){}
let mus=null;
// MUNDO 1 (Vale) — trilha em ARQUIVO (loop). Demais mundos usam a música sintetizada abaixo.
const BGM_THEMES=new Set(["grove"]);          // temas que usam a trilha de arquivo
let bgmBuf=null, bgmLoading=false, pendingBgm=false;
function loadBgm(a){ if(bgmBuf||bgmLoading||!a)return; bgmLoading=true;
  fetch("music-vale.mp3").then(r=>r.arrayBuffer())
    .then(buf=>new Promise((res,rej)=>a.decodeAudioData(buf,res,rej)))
    .then(dec=>{ bgmBuf=dec; bgmLoading=false; if(pendingBgm && musicOn) startBgm(); })
    .catch(e=>{ bgmLoading=false; }); }
function startBgm(){ const a=audio(); if(!a||!bgmBuf) return; stopMusic(); pendingBgm=true;
  const src=a.createBufferSource(); src.buffer=bgmBuf; src.loop=true;
  const g=a.createGain(); g.gain.value=0.42;                 // volume da trilha (ajustável)
  src.connect(g); g.connect(busOut(a)); src.start();
  mus={bgm:src, g}; }
const MUSIC={
  grove: { root:130.81, wave:"triangle", scale:[0,2,4,7,9],  tempo:600, pat:[0,2,4,2,4,3,2,0] }, // MUNDO 1: dó maior, acolhedor
  cave:  { root:130.81, wave:"triangle", scale:[0,3,5,7,10], tempo:660, pat:[0,2,3,2,4,3,2,1] },
  deep:  { root:98.00,  wave:"sine",     scale:[0,2,3,7,8],  tempo:780, pat:[0,1,2,3,2,1,0,2] },
  forge: { root:110.00, wave:"sawtooth", scale:[0,3,5,6,7],  tempo:520, pat:[0,2,4,3,2,4,1,0] },
  ice:   { root:146.83, wave:"triangle", scale:[0,2,4,7,9],  tempo:700, pat:[4,2,0,2,4,3,2,0] },
  void:  { root:73.42,  wave:"sine",     scale:[0,1,5,6,8],  tempo:900, pat:[0,2,1,3,2,4,1,0] },
};
function startMusic(themeName){
  const a=audio(); if(!a) return; stopMusic();
  // MUNDO 1: toca a trilha de arquivo (loop). Se ainda não decodificou, começa assim que carregar.
  if(BGM_THEMES.has(themeName)){ pendingBgm=true; if(bgmBuf) startBgm(); else loadBgm(a); return; }
  const cfg=MUSIC[themeName]||MUSIC.grove;
  const g=a.createGain(); g.gain.value = 0.06;                 // mudo é controlado pelo barramento MESTRE
  const lp=a.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=1750; lp.Q.value=0.6;  // calor
  g.connect(lp); lp.connect(busOut(a));
  const oscs=[];
  // PAD: sub-oitava quente + tônica + quinta + oitava + brilho leve
  [[0.5,0.12,"sine"],[1,0.28,"sine"],[1.5,0.15,"sine"],[2,0.10,"triangle"],[3,0.045,"sine"]].forEach(([mul,vol,ty])=>{
    const o=a.createOscillator(), pg=a.createGain(); o.type=ty; o.frequency.value=cfg.root*mul; pg.gain.value=vol;
    o.connect(pg); pg.connect(g); o.start(); oscs.push(o); });
  const scale=cfg.scale, pat=cfg.pat||[0,2,4,2], barMs=cfg.tempo*4/1000;
  let step=0;
  const timer=setInterval(()=>{ if(!actx||actx.state!=="running"||!musicOn)return;
    const t=actx.currentTime;
    if(step%4===0){                                                    // BAIXO (a cada compasso)
      const bf=cfg.root*0.5*Math.pow(2, scale[(step/4)%scale.length]/12);
      const bo=actx.createOscillator(), bg=actx.createGain(); bo.type="sine"; bo.frequency.value=bf;
      bg.gain.setValueAtTime(0.0001,t); bg.gain.exponentialRampToValueAtTime(0.28,t+0.05); bg.gain.exponentialRampToValueAtTime(0.0001,t+barMs);
      bo.connect(bg); bg.connect(g); bo.start(t); bo.stop(t+barMs+0.05);
    }
    const semi=scale[pat[step%pat.length]%scale.length], oct=(step%16<8)?1:2;   // MELODIA (padrão musical)
    const f=cfg.root*oct*Math.pow(2,semi/12);
    const o=actx.createOscillator(), ng=actx.createGain(); o.type=cfg.wave; o.frequency.value=f;
    ng.gain.setValueAtTime(0.0001,t); ng.gain.exponentialRampToValueAtTime(0.16,t+0.04); ng.gain.exponentialRampToValueAtTime(0.0001,t+0.5);
    o.connect(ng); ng.connect(g); o.start(t); o.stop(t+0.55);
    if(step%2===1){                                                    // FAÍSCA: brilho alto e suave nas contratempos
      const ssemi=scale[pat[(step+2)%pat.length]%scale.length];
      const sf=cfg.root*4*Math.pow(2,ssemi/12);
      const so=actx.createOscillator(), sg=actx.createGain(); so.type="sine"; so.frequency.value=sf;
      sg.gain.setValueAtTime(0.0001,t); sg.gain.exponentialRampToValueAtTime(0.04,t+0.02); sg.gain.exponentialRampToValueAtTime(0.0001,t+0.28);
      so.connect(sg); sg.connect(g); so.start(t); so.stop(t+0.3);
    }
    step++;
  }, cfg.tempo);
  mus={g, lp, oscs, timer};
}
function stopMusic(){ pendingBgm=false; if(!mus)return;
  if(mus.timer) clearInterval(mus.timer);
  if(mus.oscs) mus.oscs.forEach(o=>{ try{o.stop();}catch(e){} });
  if(mus.bgm){ try{mus.bgm.stop();}catch(e){} }
  try{mus.g&&mus.g.disconnect();}catch(e){} try{mus.lp&&mus.lp.disconnect();}catch(e){}
  mus=null; }
function toggleMute(){ musicOn=!musicOn; try{localStorage.setItem("geleca_music",musicOn?"1":"0");}catch(e){}
  // o MESTRE silencia TUDO (música + efeitos), com fade curtinho pra não estalar
  if(master && actx){ const t=actx.currentTime; master.gain.cancelScheduledValues(t); master.gain.setTargetAtTime(musicOn?1:0, t, 0.02); }
  const btn=el("btn-mute"); if(btn) btn.textContent=musicOn?"🔊":"🔇";
  if(musicOn && !mus && state==="play" && level) startMusic(level.theme); }

function renderHud(){ el("level-name").textContent=level.name;
  const p=el("mass-pips"); p.innerHTML="";
  for(let i=0;i<level.max;i++){ const d=document.createElement("span"); d.className="pip"+(i<blob.mass?"":" empty"); p.appendChild(d); } }
function overlay(title,msg,btns,stars){ const o=el("overlay");
  o.innerHTML=`<h2>${title}</h2>${stars?`<div class="stars">${msg}</div>`:`<p>${msg}</p>`}<div class="row"></div>`;
  const row=o.querySelector(".row");
  btns.forEach(b=>{ const el2=document.createElement("button"); el2.textContent=b.t; if(b.ghost)el2.className="ghost";
    el2.addEventListener("click",()=>{audio();b.cb();}); row.appendChild(el2); });
  o.classList.remove("hidden"); }
function hideOverlay(){ el("overlay").classList.add("hidden"); }
// SEM DICAS DE TEXTO: o jogo é um puzzle — o jogador descobre tudo sozinho.
let hintTimer; function showHint(t){ const e=el("hint"); if(e){ e.textContent=""; e.classList.remove("show"); } }
function hideHint(){ const e=el("hint"); if(e)e.classList.remove("show"); clearTimeout(hintTimer); }

// ==========================================================================
// LOOP
// ==========================================================================
function loop(ts){ const dt=Math.min(0.033,(ts-last)/1000||0); last=ts; update(dt);
  // durante a comemoração/morte o jogo pausa, mas partículas e o tremor continuam vivos
  if(state==="complete"||state==="dead"){ updateParticles(dt); updateRings(dt); updateTrail(dt); T+=dt; if(shake>0)shake=Math.max(0,shake-dt*24);
    if(winTimer>0){ winTimer-=dt; if(winTimer<=0&&winThen){ const f=winThen; winThen=null; f(); } } }
  if(state!=="menu") render(); requestAnimationFrame(loop); }
let winTimer=0, winThen=null;
function deferWin(fn,delay){ winThen=fn; winTimer=delay; }

// ==========================================================================
// ENTRADA (teclado + joystick + botões)
// ==========================================================================
const KEYMAP={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowDown:"down",KeyS:"down"};
const JUMPK={Space:1,ArrowUp:1,KeyW:1};
window.addEventListener("keydown",e=>{ if(e.repeat)return; audio();
  if(JUMPK[e.code]){e.preventDefault();jumpEdge=true;return;}
  if(e.code==="KeyE"){grabEdge=true;return;}
  if(e.code==="KeyR"){ if(state==="play"||state==="dead")resetLevel(); return; }
  if(e.code==="KeyM"){ toggleMute(); return; }
  if(e.code==="Escape"){ if(state!=="menu")showMenu(); return; }
  const k=KEYMAP[e.code]; if(k){e.preventDefault();IN.kb[k]=true;} });
window.addEventListener("keyup",e=>{ const k=KEYMAP[e.code]; if(k)IN.kb[k]=false; });
let rzT; window.addEventListener("resize",()=>{ clearTimeout(rzT); rzT=setTimeout(()=>{ if(state!=="menu"){ fitCanvas(); camFollow(true); } },120); });

// joystick
const stick=el("stick"), knob=el("knob"); let stickId=null,scx=0,scy=0; const SR=48;
function stickSet(cx,cy){ let dx=cx-scx,dy=cy-scy; const d=Math.hypot(dx,dy); if(d>SR){dx=dx/d*SR;dy=dy/d*SR;}
  knob.style.transform=`translate(${dx}px,${dy}px)`; IN.joyX=dx/SR; IN.joyY=dy/SR; }
function stickReset(){ stickId=null; IN.joyX=0;IN.joyY=0; knob.style.transform="translate(0,0)"; }
function centerFrom(){ const r=stick.getBoundingClientRect(); scx=r.left+r.width/2; scy=r.top+r.height/2; }
stick.addEventListener("touchstart",e=>{ e.preventDefault(); audio(); centerFrom();
  const t=e.changedTouches[0]; stickId=t.identifier; stickSet(t.clientX,t.clientY); },{passive:false});
stick.addEventListener("touchmove",e=>{ e.preventDefault(); for(const t of e.touches)if(t.identifier===stickId){stickSet(t.clientX,t.clientY);return;} },{passive:false});
stick.addEventListener("touchend",e=>{ e.preventDefault(); for(const t of e.changedTouches)if(t.identifier===stickId){stickReset();return;} },{passive:false});
stick.addEventListener("touchcancel",e=>{ stickReset(); },{passive:false});
stick.addEventListener("mousedown",e=>{ e.preventDefault(); audio(); centerFrom(); stickId="m"; stickSet(e.clientX,e.clientY);
  const mv=ev=>stickSet(ev.clientX,ev.clientY), up=()=>{stickReset();window.removeEventListener("mousemove",mv);window.removeEventListener("mouseup",up);};
  window.addEventListener("mousemove",mv); window.addEventListener("mouseup",up); });

// botões de ação
function bindAct(id,fn){ const b=el(id);
  const d=e=>{e.preventDefault();audio();fn();};
  b.addEventListener("touchstart",d,{passive:false}); b.addEventListener("mousedown",d); }
bindAct("btn-jump",()=>{ jumpEdge=true; });
bindAct("btn-grab",()=>{ grabEdge=true; });
el("btn-reset").addEventListener("click",()=>{ if(state==="play"||state==="dead")resetLevel(); });
el("btn-menu").addEventListener("click",showMenu);
el("btn-mute").addEventListener("click",()=>{ audio(); toggleMute(); });
{ const mb=el("btn-mute"); if(mb) mb.textContent = musicOn?"🔊":"🔇"; }   // reflete estado salvo

// SEGREDO: tocar/clicar numa geleca solta (área do jogo, fora do joystick/botões) TROCA de corpo.
canvas.addEventListener("pointerdown",e=>{ if(state!=="play")return; audio(); tryPossess(e.clientX,e.clientY); });

// ==========================================================================
// BOOT
// ==========================================================================
showMenu();
requestAnimationFrame(loop);

// exposto p/ testes
window.G={ get state(){return state;}, get mass(){return blob?blob.mass:0;}, get globs(){return globs?globs.length:0;},
  get level(){return levelIndex;}, get blob(){return blob;}, get melting(){return !!(blob&&blob.melting);},
  get doorOpen(){return plateOn();}, start:startGame, menu:showMenu,
  get gems(){return gems?gems.length:0;}, get gemsGot(){return gems?gems.filter(g=>g.got).length:0;},
  get stars(){return stars?stars.length:0;}, get starsGot(){return stars?stars.filter(s=>s.got).length:0;},
  get enemies(){return enemies?enemies.length:0;}, get chasers(){return enemies?enemies.filter(e=>e.type==="chaser").length:0;},
  get fakes(){return fakes?fakes.length:0;}, get crumbles(){return crumbles?crumbles.length:0;},
  get pickups(){return pickups?pickups.length:0;}, get boss(){return enemies?enemies.filter(e=>e.type==="boss").length:0;},
  gemPos(){ const gm=gems&&gems.find(g=>!g.got); return gm?{x:gm.x,y:gm.y,rev:gm.rev}:null; },
  gemRev(){ const gm=gems&&gems.find(g=>!g.got); return gm?gm.rev:-1; },
  reset(){ resetLevel(); },
  get music(){ return !!mus; }, get muted(){ return !musicOn; }, muteToggle(){ toggleMute(); },
  enX(i){ return enemies&&enemies[i]?Math.round(enemies[i].x):null; },
  enType(i){ return enemies&&enemies[i]?enemies[i].type:null; },
  get onIce(){ return !!(blob&&blob.onIcePrev); }, get iceCount(){ return iceTiles?iceTiles.length:0; },
  get tramps(){ return tramp?tramp.length:0; }, get trampGlobs(){ return globs?globs.filter(g=>g.tramp).length:0; },
  addGlob(wx,wy){ globs.push({x:wx,y:wy,w:GLOB,h:GLOB,solid:true,solidAt:0,wall:0,tramp:false}); },
  addFormingGlob(wx,wy){ globs.push({x:wx,y:wy,w:GLOB,h:GLOB,solid:false,solidAt:performance.now()+120,born:performance.now(),wall:0,tramp:false}); },
  get solidGlobs(){ return globs?globs.filter(g=>g.solid).length:0; },
  blobPos(){ return blob?{x:Math.round(blob.x),y:Math.round(blob.y)}:null; },
  spikePos(){ const s=spikes&&spikes[0]; return s?{x:s.x,y:s.y}:null; },
  warp(wx,wy){ if(blob){ blob.x=wx; blob.y=wy; blob.vx=0; blob.vy=0; camFollow(true); } },
  get sfxReady(){ return Object.keys(SFXBUF).length; }, kick(){ audio(); },
  get hitStop(){ return Math.round(hitStop*1000); }, get camLook(){ return Math.round(cam.look); },
  get masterGain(){ return master?Math.round(master.gain.value*100):-1; }, get padVoices(){ return mus&&mus.oscs?mus.oscs.length:0; },
  get bgmReady(){ return !!bgmBuf; }, get bgmPlaying(){ return !!(mus&&mus.bgm); }, get trailLen(){ return trail?trail.length:0; },
  lastFall(){ return blob?{d:blob._lastFall,vy:blob._lastVy,apex:Math.round(blob.apexY),y:Math.round(blob.y)}:null; },
  possessAt(cx,cy){ return tryPossess(cx,cy); }, _possess(wx,wy){ return possessWorld(wx,wy); },
  get camSafe(){ return Math.round(camSafeBottom); }, blobScreenBottom(){ return blob?Math.round((blob.y+blob.h-cam.y)*zoom):0; },
  get canvasH(){ return canvas.height; },
  _allSecrets(){ for(let i=0;i<LEVELS.filter(L=>!L.secret).length;i++) save.gems[i]=1; persist(); showMenu(); },
  gotoExit(){ if(blob&&exitRect){ blob.x=exitRect.x; blob.y=exitRect.y; blob.vy=0; } },
  bossHp(){ const e=enemies&&enemies.find(x=>x.type==="boss"); return e?e.hp:-1; },
  bossMode(){ const e=enemies&&enemies.find(x=>x.type==="boss"); return e?(e.mode||'chase'):null; },
  bossPos(){ const e=enemies&&enemies.find(x=>x.type==="boss"); return e?{x:Math.round(e.x),y:Math.round(e.y),y0:Math.round(e.y0)}:null; },
  _forceLeap(){ const e=enemies&&enemies.find(x=>x.type==="boss"); if(e){ e.leapCD=0; e.mode='wind'; e.windT=0.5; } },
  get shotCount(){ return shots?shots.length:0; },
  _stompBoss(){ const e=enemies&&enemies.find(x=>x.type==="boss"); if(e&&blob){ blob.x=e.x+e.w/2-blob.w/2; blob.y=e.y-blob.h+3; blob.vy=260; blob.hurtT=0; e.hitT=0; } },
  get parts(){ return particles?particles.length:0; },
  _setCoins(){ for(let i=0;i<LEVELS.filter(L=>!L.secret).length;i++) save.coins[i]=1; persist(); },
  _demo(){ save.unlocked=6; [3,3,2,3,1].forEach((s,i)=>save.stars[i]=s); save.coins[0]=1;save.coins[1]=1;save.coins[3]=2; save.gems[0]=1;save.gems[2]=1; persist(); showMenu(); },
  collectAt(gx,gy){ if(blob){ blob.x=gx-8; blob.y=gy-8; } } };
