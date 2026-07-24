import { createContext, useContext, useId } from "react";

interface Props {
  colors: [string, string];
  shape?: string;
  short: string;
  name?: string;
  size?: number;
  /** Escudo de time criado pelo jogador — não usa lookup de clube real. */
  player?: boolean;
  /** Override completo do escudo (usado pelo editor de brasão). */
  config?: CrestConfig | null;
}

/** Configuração completa de um escudo desenhado pelo jogador. */
export interface CrestConfig {
  shape: Shape;
  pattern: Pattern;
  primary: string;
  secondary: string;
  accent: string;
  symbol: Symbol;
  symbolColor: string;
  monogramColor: string;
}

/** Contexto que injeta o brasão do jogador em qualquer <Crest player /> descendente. */
const PlayerCrestContext = createContext<CrestConfig | null>(null);
export function PlayerCrestProvider({ config, children }: { config: CrestConfig | null | undefined; children: React.ReactNode }) {
  return <PlayerCrestContext.Provider value={config ?? null}>{children}</PlayerCrestContext.Provider>;
}
export function usePlayerCrestConfig() {
  return useContext(PlayerCrestContext);
}

// Listas exportadas para o CrestBuilder usar como opções.
export const CREST_SHAPES: Shape[] = [
  "shield","round-shield","pointed-shield","chevron-shield","banner","flag",
  "rounded-square","pentagon","hexagon","hexagon-flat","octagon","circle",
  "diamond","kite","star5","gothic","gonfalon","heart","medal","swiss","teardrop",
];
export const CREST_PATTERNS: Pattern[] = [
  "solid","halves-v","halves-h","stripes-v","stripes-h","hoops-h",
  "sash","diagonal","tricolor-v","tricolor-h","cross","quartered",
  "checkers","chevrons","spots","rings","border","gradient-v","starburst","diagonal-stripes",
];
export const CREST_SYMBOLS: Symbol[] = [
  "none","star","lion","bird","wing","bolt","crown","cross","cross-malt",
  "rooster","anchor","ball","palm","fleur","tower","eiffel","ship","devil",
  "sun","moon","flame","leaf","sword","trident","gem","trophy","gear",
  "mountain","wave","compass","helmet","wolf","dragon","skull","heart-sym",
];
export const CREST_COLORS: string[] = [
  // Clássicas
  "#c8102e","#003f87","#006437","#000000","#facc15","#7c3aed","#f97316","#6caedf",
  "#7a1f2b","#0c2340","#059669","#374151","#ffffff","#e11d48","#14b8a6","#78350f",
  // Extras premium
  "#d4af37","#4c1d95","#a3e635","#38bdf8","#f472b6","#fb7185","#0d9488","#4338ca",
  "#65a30d","#cbd5e1","#1e293b","#6ee7b7","#500724","#1e3a8a","#14532d","#9f1239",
  "#fef3c7","#0ea5e9","#a16207","#831843","#7c2d12","#22c55e","#eab308","#020617",
];



type Pattern =
  | "solid" | "halves-v" | "halves-h"
  | "stripes-v" | "stripes-h" | "hoops-h"
  | "sash" | "diagonal" | "tricolor-v" | "tricolor-h"
  | "cross" | "quartered"
  | "checkers" | "chevrons" | "spots" | "rings" | "border"
  | "gradient-v" | "starburst" | "diagonal-stripes";

type Symbol =
  | "none" | "palm" | "star" | "anchor" | "crown" | "cross" | "cross-malt"
  | "rooster" | "bird" | "devil" | "lion" | "ball" | "bolt"
  | "eiffel" | "fleur" | "wing" | "tower" | "ship"
  | "sun" | "moon" | "flame" | "leaf" | "sword" | "trident" | "gem"
  | "trophy" | "gear" | "mountain" | "wave" | "compass" | "helmet"
  | "wolf" | "dragon" | "skull" | "heart-sym";

type Shape =
  | "shield" | "circle" | "diamond" | "round-shield" | "pentagon"
  | "hexagon" | "hexagon-flat" | "octagon" | "banner" | "pointed-shield"
  | "flag" | "star5" | "rounded-square" | "chevron-shield"
  | "kite" | "gothic" | "gonfalon" | "heart" | "medal" | "swiss" | "teardrop";

interface Art {
  pattern: Pattern;
  palette?: string[];      // override the base colors (mantendo a paleta real do clube)
  symbol?: Symbol;
  symbolColor?: string;
  shape?: Shape;
  monogram?: string;       // letras no centro (default: short)
  monogramColor?: string;
}

// Slug helper: lowercases, strips accents and non-letters
function slug(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// -------- Per-club art map. Inspired by real club identities, original artwork. --------
const ART: Record<string, Art> = {
  // ===== Brasil — Rio =====
  flamengo:     { pattern: "hoops-h", palette: ["#c8102e","#1a1a1a"], symbol: "none", shape: "round-shield", monogram: "CRF", monogramColor: "#fff" },
  fluminense:   { pattern: "tricolor-v", palette: ["#7a1f2b","#ffffff","#0a4d2e"], symbol: "none", shape: "round-shield", monogram: "FFC", monogramColor: "#fff" },
  vascodagama:  { pattern: "sash", palette: ["#000","#fff"], symbol: "cross-malt", symbolColor: "#000", shape: "round-shield" },
  botafogo:     { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "star", symbolColor: "#fff", shape: "shield" },

  // ===== Brasil — SP =====
  corinthians:  { pattern: "solid", palette: ["#000","#fff"], symbol: "anchor", symbolColor: "#fff", shape: "round-shield" },
  saopaulo:     { pattern: "tricolor-h", palette: ["#cc0000","#ffffff","#1a1a1a"], symbol: "none", monogram: "SPF", monogramColor: "#cc0000", shape: "shield" },
  palmeiras:    { pattern: "solid", palette: ["#006437","#ffffff"], symbol: "palm", symbolColor: "#fff", shape: "round-shield" },
  santos:       { pattern: "solid", palette: ["#ffffff","#1a1a1a"], symbol: "ball", symbolColor: "#1a1a1a", shape: "round-shield" },
  redbullbragantino: { pattern: "halves-h", palette: ["#ffffff","#cc0000"], symbol: "bolt", symbolColor: "#ffd400", shape: "shield" },
  pontepreta:   { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", shape: "circle", monogram: "AAP", monogramColor: "#fff" },
  guarani:      { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "bird", symbolColor: "#fff", shape: "shield" },
  portuguesa:   { pattern: "halves-h", palette: ["#006437","#cc0000"], symbol: "cross", symbolColor: "#fff", shape: "shield" },
  ituano:       { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "rooster", symbolColor: "#fff", shape: "shield" },
  mirassol:     { pattern: "halves-v", palette: ["#fff200","#006437"], symbol: "lion", symbolColor: "#cc0000", shape: "shield" },
  novorizontino:{ pattern: "halves-v", palette: ["#fff200","#cc0000"], symbol: "lion", symbolColor: "#000", shape: "shield" },
  botafogosp:   { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "star", symbolColor: "#cc0000", shape: "shield" },

  // ===== Brasil — MG =====
  cruzeiro:     { pattern: "solid", palette: ["#003f87","#ffffff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  atleticomineiro: { pattern: "stripes-v", palette: ["#1a1a1a","#fff"], symbol: "none", monogram: "CAM", monogramColor: "#fff", shape: "round-shield" },
  atleticomg:      { pattern: "stripes-v", palette: ["#1a1a1a","#fff"], symbol: "none", monogram: "CAM", monogramColor: "#fff", shape: "round-shield" },
  atleticomgadv:   { pattern: "stripes-v", palette: ["#1a1a1a","#fff"], symbol: "none", monogram: "CAM", monogramColor: "#fff", shape: "round-shield" },
  cam:             { pattern: "stripes-v", palette: ["#1a1a1a","#fff"], symbol: "none", monogram: "CAM", monogramColor: "#fff", shape: "round-shield" },
  americamineiro:{ pattern: "solid", palette: ["#006437","#fff"], symbol: "none", monogram: "AFC", monogramColor: "#fff", shape: "diamond" },

  // ===== Brasil — RS =====
  gremio:       { pattern: "tricolor-v", palette: ["#0d3f8c","#000","#fff"], symbol: "none", monogram: "GRE", monogramColor: "#fff", shape: "round-shield" },
  internacional:{ pattern: "solid", palette: ["#cc0000","#fff"], symbol: "none", monogram: "SCI", monogramColor: "#fff", shape: "circle" },
  juventude:    { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "none", monogram: "EC", monogramColor: "#fff", shape: "shield" },
  caxias:       { pattern: "halves-h", palette: ["#cc0000","#fff"], symbol: "lion", symbolColor: "#fff", shape: "shield" },

  // ===== Brasil — PR =====
  athleticoparanaense: { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "CAP", monogramColor: "#fff", shape: "round-shield" },
  athleticopr:         { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "CAP", monogramColor: "#fff", shape: "round-shield" },
  cap:                 { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "CAP", monogramColor: "#fff", shape: "round-shield" },
  coritiba:     { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "none", monogram: "CFC", monogramColor: "#006437", shape: "round-shield" },
  parana:              { pattern: "diagonal", palette: ["#c8102e","#0a3d91","#ffffff"], symbol: "none", monogram: "PC", monogramColor: "#ffffff", shape: "round-shield" },
  paranaclube:         { pattern: "diagonal", palette: ["#c8102e","#0a3d91","#ffffff"], symbol: "none", monogram: "PC", monogramColor: "#ffffff", shape: "round-shield" },
  operariopr:          { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", monogram: "OFC", monogramColor: "#fff", shape: "shield" },
  operarioferroviario: { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", monogram: "OFC", monogramColor: "#fff", shape: "shield" },
  londrinaec:          { pattern: "halves-h", palette: ["#0066b3","#fff"], symbol: "none", monogram: "LEC", monogramColor: "#fff", shape: "shield" },

  // ===== Brasil — BA / PE / NE =====
  bahia:        { pattern: "tricolor-h", palette: ["#0066b3","#ffffff","#cc0000"], symbol: "ball", symbolColor: "#0066b3", shape: "shield" },
  vitoria:      { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  sportrecife:  { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  nautico:      { pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "ship", symbolColor: "#cc0000", shape: "round-shield" },
  ceara:        { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "star", symbolColor: "#cc0000", shape: "shield" },
  fortaleza:    { pattern: "tricolor-v", palette: ["#0066b3","#fff","#cc0000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },

  // ===== Brasil — SC / GO =====
  avai:         { pattern: "stripes-v", palette: ["#0066b3","#fff"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  figueirense:  { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", monogram: "FFC", monogramColor: "#fff", shape: "diamond" },
  criciuma:     { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "lion", symbolColor: "#000", shape: "shield" },
  chapecoense:  { pattern: "solid", palette: ["#006437","#fff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  goias:        { pattern: "stripes-h", palette: ["#006437","#fff"], symbol: "none", monogram: "GEC", monogramColor: "#fff", shape: "shield" },
  atleticogo:   { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "ACG", monogramColor: "#fff", shape: "shield" },
  vilanova:     { pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "lion", symbolColor: "#000", shape: "shield" },

  // ===== Internacional — Espanha =====
  realmadrid:   { pattern: "solid", palette: ["#fff","#1a4ba0"], symbol: "crown", symbolColor: "#febe10", monogram: "RM", monogramColor: "#1a4ba0", shape: "round-shield" },
  barcelona:    { pattern: "tricolor-v", palette: ["#a50044","#ffd400","#1a4ba0"], symbol: "cross", symbolColor: "#cc0000", shape: "round-shield" },
  atleticomadrid:{ pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "none", monogram: "ATM", monogramColor: "#1a4ba0", shape: "shield" },
  sevilla:      { pattern: "solid", palette: ["#fff","#cc0000"], symbol: "none", monogram: "SFC", monogramColor: "#cc0000", shape: "shield" },
  valencia:     { pattern: "solid", palette: ["#fff","#ff7a00"], symbol: "bird", symbolColor: "#000", shape: "round-shield" },

  // ===== Inglaterra =====
  manchesterunited: { pattern: "solid", palette: ["#cc0000","#febe10"], symbol: "devil", symbolColor: "#febe10", shape: "round-shield" },
  manchestercity:   { pattern: "solid", palette: ["#6caedf","#fff"], symbol: "ship", symbolColor: "#fff", shape: "round-shield" },
  liverpool:    { pattern: "solid", palette: ["#c8102e","#febe10"], symbol: "bird", symbolColor: "#febe10", shape: "round-shield" },
  chelsea:      { pattern: "solid", palette: ["#034694","#febe10"], symbol: "lion", symbolColor: "#febe10", shape: "round-shield" },
  arsenal:      { pattern: "solid", palette: ["#ef0107","#fff"], symbol: "bolt", symbolColor: "#fff", shape: "shield" }, // cannon stylized
  tottenham:    { pattern: "solid", palette: ["#132257","#fff"], symbol: "bird", symbolColor: "#fff", shape: "round-shield" },

  // ===== Itália =====
  juventus:     { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", monogram: "J", monogramColor: "#000", shape: "shield" },
  milan:        { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "devil", symbolColor: "#fff", shape: "round-shield" },
  inter:        { pattern: "stripes-v", palette: ["#1a4ba0","#000"], symbol: "none", monogram: "IM", monogramColor: "#febe10", shape: "circle" },
  internazionale: { pattern: "stripes-v", palette: ["#1a4ba0","#000"], symbol: "none", monogram: "IM", monogramColor: "#febe10", shape: "circle" },
  roma:         { pattern: "halves-h", palette: ["#8e1f2f","#febe10"], symbol: "wing", symbolColor: "#febe10", shape: "round-shield" },
  napoli:       { pattern: "solid", palette: ["#12a0d7","#fff"], symbol: "none", monogram: "N", monogramColor: "#fff", shape: "circle" },

  // ===== Alemanha =====
  bayernmunich: { pattern: "solid", palette: ["#dc052d","#0066b3"], symbol: "none", monogram: "FCB", monogramColor: "#fff", shape: "circle" },
  bayernmunchen:{ pattern: "solid", palette: ["#dc052d","#0066b3"], symbol: "none", monogram: "FCB", monogramColor: "#fff", shape: "circle" },
  borussiadortmund: { pattern: "solid", palette: ["#fde100","#000"], symbol: "none", monogram: "BVB", monogramColor: "#000", shape: "circle" },

  // ===== França =====
  parissaintgermain: { pattern: "solid", palette: ["#004170","#cc0000"], symbol: "eiffel", symbolColor: "#fff", shape: "round-shield" },
  psg:          { pattern: "solid", palette: ["#004170","#cc0000"], symbol: "eiffel", symbolColor: "#fff", shape: "round-shield" },
  marseille:    { pattern: "solid", palette: ["#2faae1","#fff"], symbol: "none", monogram: "OM", monogramColor: "#fff", shape: "shield" },

  // ===== Holanda / Portugal =====
  ajax:         { pattern: "halves-v", palette: ["#fff","#cc0000"], symbol: "none", monogram: "AFC", monogramColor: "#cc0000", shape: "round-shield" },
  benfica:      { pattern: "solid", palette: ["#cc0000","#fff"], symbol: "wing", symbolColor: "#fff", shape: "round-shield" },
  porto:        { pattern: "stripes-v", palette: ["#fff","#0066b3"], symbol: "none", monogram: "FCP", monogramColor: "#0066b3", shape: "shield" },
  sporting:     { pattern: "stripes-h", palette: ["#006437","#fff"], symbol: "lion", symbolColor: "#fff", shape: "shield" },

  // ===== Argentina / Uruguai =====
  boca:         { pattern: "halves-h", palette: ["#003f87","#fdd000"], symbol: "none", monogram: "CABJ", monogramColor: "#fff", shape: "round-shield" },
  bocajuniors:  { pattern: "halves-h", palette: ["#003f87","#fdd000"], symbol: "none", monogram: "CABJ", monogramColor: "#fff", shape: "round-shield" },
  river:        { pattern: "sash", palette: ["#fff","#cc0000"], symbol: "none", monogram: "CARP", monogramColor: "#cc0000", shape: "round-shield" },
  riverplate:   { pattern: "sash", palette: ["#fff","#cc0000"], symbol: "none", monogram: "CARP", monogramColor: "#cc0000", shape: "round-shield" },
  racing:       { pattern: "stripes-v", palette: ["#6caedf","#fff"], symbol: "none", monogram: "RAC", monogramColor: "#6caedf", shape: "shield" },
  independiente:{ pattern: "solid", palette: ["#cc0000","#fff"], symbol: "none", monogram: "CAI", monogramColor: "#fff", shape: "shield" },
  sanlorenzo:   { pattern: "tricolor-v", palette: ["#003f87","#cc0000","#003f87"], symbol: "none", monogram: "CASLA", monogramColor: "#fff", shape: "shield" },
  nacional:     { pattern: "solid", palette: ["#fff","#1a4ba0"], symbol: "none", monogram: "CN", monogramColor: "#1a4ba0", shape: "circle" },
  penarol:      { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "none", monogram: "CAP", monogramColor: "#000", shape: "shield" },

  // ===== América =====
  america:      { pattern: "solid", palette: ["#fff200","#003f87"], symbol: "none", monogram: "CFA", monogramColor: "#003f87", shape: "circle" },
  flamengo2:    { pattern: "hoops-h", palette: ["#c8102e","#000"], shape: "round-shield" },

  // ===== Brasil — Série C =====
  londrina:        { pattern: "halves-h", palette: ["#0066b3","#fff"], symbol: "none", monogram: "LEC", monogramColor: "#fff", shape: "shield" },
  paysandu:        { pattern: "stripes-v", palette: ["#0066b3","#fff"], symbol: "none", monogram: "PSC", monogramColor: "#fff", shape: "round-shield" },
  remo:            { pattern: "halves-v", palette: ["#0066b3","#fff"], symbol: "lion", symbolColor: "#fff", shape: "diamond" },
  abc:             { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", monogram: "ABC", monogramColor: "#fff", shape: "round-shield" },
  americarn:       { pattern: "stripes-h", palette: ["#cc0000","#fff"], symbol: "none", monogram: "ARN", monogramColor: "#fff", shape: "shield" },
  sampaiocorrea:   { pattern: "tricolor-h", palette: ["#cc0000","#fff200","#000"], symbol: "none", monogram: "SCA", monogramColor: "#000", shape: "shield" },
  crb:             { pattern: "halves-v", palette: ["#cc0000","#fff"], symbol: "rooster", symbolColor: "#000", shape: "round-shield" },
  csa:             { pattern: "stripes-h", palette: ["#0066b3","#fff"], symbol: "none", monogram: "CSA", monogramColor: "#fff", shape: "shield" },
  santacruz:       { pattern: "tricolor-h", palette: ["#cc0000","#fff","#000"], symbol: "cross", symbolColor: "#000", shape: "shield" },
  botafogopb:      { pattern: "halves-h", palette: ["#000","#cc0000"], symbol: "star", symbolColor: "#fff", shape: "shield" },
  voltaredonda:    { pattern: "stripes-h", palette: ["#000","#fff200"], symbol: "none", monogram: "VRC", monogramColor: "#fff200", shape: "round-shield" },
  americarj:       { pattern: "diagonal", palette: ["#006437","#fff"], symbol: "none", monogram: "ARJ", monogramColor: "#fff", shape: "shield" },
  bangu:           { pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "none", monogram: "BAC", monogramColor: "#fff", shape: "diamond" },
  tombense:        { pattern: "halves-v", palette: ["#000","#fff"], symbol: "bird", symbolColor: "#cc0000", shape: "shield" },
  villanovamg:     { pattern: "stripes-v", palette: ["#000","#cc0000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  saobernardo:     { pattern: "halves-h", palette: ["#fff200","#000"], symbol: "lion", symbolColor: "#000", shape: "round-shield" },
  ypirangars:      { pattern: "tricolor-h", palette: ["#fff200","#006437","#fff"], symbol: "bird", symbolColor: "#000", shape: "shield" },
  brusque:         { pattern: "quartered", palette: ["#cc0000","#fff"], symbol: "none", monogram: "BFC", monogramColor: "#cc0000", shape: "shield" },
  confianca:       { pattern: "halves-v", palette: ["#0066b3","#cc0000"], symbol: "wing", symbolColor: "#fff", shape: "shield" },
  floresta:        { pattern: "stripes-h", palette: ["#006437","#fff"], symbol: "none", monogram: "FEC", monogramColor: "#fff", shape: "round-shield" },

  // ===== Brasil — Série D =====
  manausfc:        { pattern: "halves-h", palette: ["#cc0000","#fff"], symbol: "bird", symbolColor: "#000", shape: "shield" },
  nacionalam:      { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "none", monogram: "NAM", monogramColor: "#fff", shape: "round-shield" },
  princesadosolimoes:{ pattern: "diagonal", palette: ["#0066b3","#fff"], symbol: "ship", symbolColor: "#fff", shape: "shield" },
  tunaluso:        { pattern: "sash", palette: ["#000","#cc0000"], symbol: "cross-malt", symbolColor: "#fff", shape: "round-shield" },
  trem:            { pattern: "halves-h", palette: ["#fff200","#cc0000"], symbol: "bolt", symbolColor: "#000", shape: "diamond" },
  riobrancoac:     { pattern: "solid", palette: ["#006437","#fff"], symbol: "star", symbolColor: "#fff200", shape: "round-shield" },
  galvez:          { pattern: "tricolor-h", palette: ["#fff200","#cc0000","#000"], symbol: "none", monogram: "GAL", monogramColor: "#000", shape: "shield" },
  roraimaec:       { pattern: "halves-v", palette: ["#cc0000","#fff"], symbol: "none", monogram: "REC", monogramColor: "#000", shape: "shield" },
  asa:             { pattern: "halves-h", palette: ["#000","#fff"], symbol: "wing", symbolColor: "#000", shape: "shield" },
  sergipe:         { pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "none", monogram: "SER", monogramColor: "#000", shape: "round-shield" },
  petrolina:       { pattern: "halves-v", palette: ["#000","#fff200"], symbol: "none", monogram: "PSC", monogramColor: "#fff200", shape: "shield" },
  treze:           { pattern: "diagonal", palette: ["#cc0000","#fff"], symbol: "rooster", symbolColor: "#000", shape: "shield" },
  riverpi:         { pattern: "halves-h", palette: ["#000","#cc0000"], symbol: "rooster", symbolColor: "#fff", shape: "shield" },
  altos:           { pattern: "tricolor-v", palette: ["#fff200","#0066b3","#fff"], symbol: "none", monogram: "AAE", monogramColor: "#0066b3", shape: "shield" },
  "4dejulho":      { pattern: "stripes-h", palette: ["#cc0000","#fff"], symbol: "star", symbolColor: "#cc0000", shape: "diamond" },
  brasiliense:     { pattern: "halves-h", palette: ["#fff200","#0066b3"], symbol: "none", monogram: "BFC", monogramColor: "#0066b3", shape: "round-shield" },
  gama:            { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "bird", symbolColor: "#fff200", shape: "shield" },
  anapolis:        { pattern: "halves-v", palette: ["#cc0000","#fff"], symbol: "rooster", symbolColor: "#000", shape: "shield" },
  urt:             { pattern: "stripes-h", palette: ["#0066b3","#fff"], symbol: "bolt", symbolColor: "#fff200", shape: "round-shield" },
  caldense:        { pattern: "stripes-v", palette: ["#000","#cc0000"], symbol: "none", monogram: "CAL", monogramColor: "#fff", shape: "shield" },

  // ===== Internacional — entradas faltantes =====
  acmilan:         { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "devil", symbolColor: "#fff", shape: "round-shield" },
  interdemilao:    { pattern: "stripes-v", palette: ["#1a4ba0","#000"], symbol: "none", monogram: "IM", monogramColor: "#febe10", shape: "circle" },
  lazio:           { pattern: "solid", palette: ["#87ceeb","#fff"], symbol: "wing", symbolColor: "#fff", shape: "round-shield" },
  bayerleverkusen: { pattern: "halves-h", palette: ["#cc0000","#000"], symbol: "none", monogram: "B04", monogramColor: "#fff", shape: "round-shield" },
  rbleipzig:       { pattern: "halves-h", palette: ["#cc0000","#fff"], symbol: "bolt", symbolColor: "#fff200", shape: "shield" },
  psveindhoven:    { pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "none", monogram: "PSV", monogramColor: "#fff", shape: "shield" },
  asmonaco:        { pattern: "diagonal", palette: ["#cc0000","#fff"], symbol: "crown", symbolColor: "#cc0000", shape: "diamond" },
  olympiquedemarseille:{ pattern: "solid", palette: ["#2faae1","#fff"], symbol: "none", monogram: "OM", monogramColor: "#fff", shape: "shield" },
  colocolo:        { pattern: "sash", palette: ["#fff","#000"], symbol: "none", monogram: "CC", monogramColor: "#000", shape: "round-shield" },
  universidaddechile:{ pattern: "halves-h", palette: ["#003f87","#fff"], symbol: "none", monogram: "U", monogramColor: "#fff", shape: "circle" },
  nacionaluru:     { pattern: "solid", palette: ["#fff","#1a4ba0"], symbol: "none", monogram: "CN", monogramColor: "#1a4ba0", shape: "circle" },

  // ===== Internacional — Libertadores / Sul-Americana (fixos) =====
  olimpia:             { pattern: "stripes-v", palette: ["#fff","#000"], symbol: "none", monogram: "O", monogramColor: "#000", shape: "round-shield" },
  atleticonacional:    { pattern: "stripes-v", palette: ["#006b3f","#fff"], symbol: "none", monogram: "AN", monogramColor: "#006b3f", shape: "round-shield" },
  lduquito:            { pattern: "solid", palette: ["#fff","#0a3d91"], symbol: "none", monogram: "LDU", monogramColor: "#0a3d91", shape: "shield" },
  lanus:               { pattern: "sash", palette: ["#7d0000","#fff"], symbol: "none", monogram: "CAL", monogramColor: "#fff", shape: "round-shield" },
  cerroporteno:        { pattern: "stripes-v", palette: ["#c8102e","#1a4ba0"], symbol: "none", monogram: "CCP", monogramColor: "#fff", shape: "round-shield" },
  defensayjusticia:    { pattern: "halves-h", palette: ["#f6c400","#006b3f"], symbol: "none", monogram: "DYJ", monogramColor: "#000", shape: "shield" },
  universidadcatolica: { pattern: "sash", palette: ["#0a3d91","#fff"], symbol: "cross", symbolColor: "#0a3d91", shape: "round-shield" },
  alianzalima:         { pattern: "sash", palette: ["#0a3d91","#fff"], symbol: "none", monogram: "AL", monogramColor: "#0a3d91", shape: "round-shield" },
  estudiantes:         { pattern: "stripes-v", palette: ["#e30613","#fff"], symbol: "none", monogram: "EDLP", monogramColor: "#fff", shape: "round-shield" },

  // ===== Internacional — FIFA Club World Cup / demais =====
  intermiami:          { pattern: "solid", palette: ["#f4b7c9","#000"], symbol: "sun", symbolColor: "#000", shape: "round-shield" },
  alhilal:             { pattern: "solid", palette: ["#0a3d91","#fff"], symbol: "crown", symbolColor: "#fff", shape: "round-shield" },
  alahly:              { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  aucklandcity:        { pattern: "halves-v", palette: ["#0a3d91","#fff"], symbol: "ship", symbolColor: "#fff", shape: "shield" },

  // ===== Aliases (garantem brasão fixo mesmo com variações de nome) =====
  athletico:           { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "CAP", monogramColor: "#fff", shape: "round-shield" },
  furacao:             { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "CAP", monogramColor: "#fff", shape: "round-shield" },
  atleticogoianiense:  { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "ACG", monogramColor: "#fff", shape: "shield" },
  cuiaba:              { pattern: "stripes-v", palette: ["#fff200","#006437"], symbol: "none", monogram: "CBA", monogramColor: "#006437", shape: "round-shield" },
  cuiabaesporteclube:  { pattern: "stripes-v", palette: ["#fff200","#006437"], symbol: "none", monogram: "CBA", monogramColor: "#006437", shape: "round-shield" },
  rbbragantino:        { pattern: "halves-h", palette: ["#ffffff","#cc0000"], symbol: "bolt", symbolColor: "#ffd400", shape: "shield" },
  bragantino:          { pattern: "halves-h", palette: ["#ffffff","#cc0000"], symbol: "bolt", symbolColor: "#ffd400", shape: "shield" },
  vasco:               { pattern: "sash", palette: ["#000","#fff"], symbol: "cross-malt", symbolColor: "#000", shape: "round-shield" },
  vascodagamacrvg:     { pattern: "sash", palette: ["#000","#fff"], symbol: "cross-malt", symbolColor: "#000", shape: "round-shield" },
  crvascodagama:       { pattern: "sash", palette: ["#000","#fff"], symbol: "cross-malt", symbolColor: "#000", shape: "round-shield" },
  saopaulofc:          { pattern: "tricolor-h", palette: ["#cc0000","#ffffff","#1a1a1a"], symbol: "none", monogram: "SPF", monogramColor: "#cc0000", shape: "shield" },
  spfc:                { pattern: "tricolor-h", palette: ["#cc0000","#ffffff","#1a1a1a"], symbol: "none", monogram: "SPF", monogramColor: "#cc0000", shape: "shield" },
  gremiofoot:          { pattern: "tricolor-v", palette: ["#0d3f8c","#000","#fff"], symbol: "none", monogram: "GRE", monogramColor: "#fff", shape: "round-shield" },
  scinternacional:     { pattern: "solid", palette: ["#cc0000","#fff"], symbol: "none", monogram: "SCI", monogramColor: "#fff", shape: "circle" },
  ecjuventude:         { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "none", monogram: "EC", monogramColor: "#fff", shape: "shield" },
  criciumaec:          { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "lion", symbolColor: "#000", shape: "shield" },
  ecvitoria:           { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  ecbahia:             { pattern: "tricolor-h", palette: ["#0066b3","#ffffff","#cc0000"], symbol: "ball", symbolColor: "#0066b3", shape: "shield" },
  santosfc:            { pattern: "solid", palette: ["#ffffff","#1a1a1a"], symbol: "ball", symbolColor: "#1a1a1a", shape: "round-shield" },
  scpalmeiras:         { pattern: "solid", palette: ["#006437","#ffffff"], symbol: "palm", symbolColor: "#fff", shape: "round-shield" },
  sepalmeiras:         { pattern: "solid", palette: ["#006437","#ffffff"], symbol: "palm", symbolColor: "#fff", shape: "round-shield" },
  sccorinthians:       { pattern: "solid", palette: ["#000","#fff"], symbol: "anchor", symbolColor: "#fff", shape: "round-shield" },
  crflamengo:          { pattern: "hoops-h", palette: ["#c8102e","#1a1a1a"], symbol: "none", shape: "round-shield", monogram: "CRF", monogramColor: "#fff" },
  fluminensefc:        { pattern: "tricolor-v", palette: ["#7a1f2b","#ffffff","#0a4d2e"], symbol: "none", shape: "round-shield", monogram: "FFC", monogramColor: "#fff" },
  botafogofr:          { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "star", symbolColor: "#fff", shape: "shield" },
  ecbotafogo:          { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "star", symbolColor: "#fff", shape: "shield" },
  fortalezaec:         { pattern: "tricolor-v", palette: ["#0066b3","#fff","#cc0000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  cruzeiroec:          { pattern: "solid", palette: ["#003f87","#ffffff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  // internacionais — aliases
  nacionaluruguai:     { pattern: "solid", palette: ["#fff","#1a4ba0"], symbol: "none", monogram: "CN", monogramColor: "#1a4ba0", shape: "circle" },
  clubnacional:        { pattern: "solid", palette: ["#fff","#1a4ba0"], symbol: "none", monogram: "CN", monogramColor: "#1a4ba0", shape: "circle" },
  clubolimpia:         { pattern: "stripes-v", palette: ["#fff","#000"], symbol: "none", monogram: "O", monogramColor: "#000", shape: "round-shield" },
  clubatleticolanus:   { pattern: "sash", palette: ["#7d0000","#fff"], symbol: "none", monogram: "CAL", monogramColor: "#fff", shape: "round-shield" },
  estudiantesdelaplata:{ pattern: "stripes-v", palette: ["#e30613","#fff"], symbol: "none", monogram: "EDLP", monogramColor: "#fff", shape: "round-shield" },
  bayern:              { pattern: "solid", palette: ["#dc052d","#0066b3"], symbol: "none", monogram: "FCB", monogramColor: "#fff", shape: "circle" },
  fcbarcelona:         { pattern: "tricolor-v", palette: ["#a50044","#ffd400","#1a4ba0"], symbol: "cross", symbolColor: "#cc0000", shape: "round-shield" },
  parissg:             { pattern: "solid", palette: ["#004170","#cc0000"], symbol: "eiffel", symbolColor: "#fff", shape: "round-shield" },
  interdemiami:        { pattern: "solid", palette: ["#f4b7c9","#000"], symbol: "sun", symbolColor: "#000", shape: "round-shield" },
  cfmontreal:          { pattern: "solid", palette: ["#003da5","#fff"], symbol: "none", monogram: "MTL", monogramColor: "#fff", shape: "shield" },
  alhilalsfc:          { pattern: "solid", palette: ["#0a3d91","#fff"], symbol: "crown", symbolColor: "#fff", shape: "round-shield" },
  alahlysc:            { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },

  // ===== Brasil — aliases fixos (evita brasão mudar quando o slug bate diferente) =====
  americamg:           { pattern: "solid", palette: ["#006437","#fff"], symbol: "none", monogram: "AFC", monogramColor: "#fff", shape: "diamond" },
  americafc:           { pattern: "solid", palette: ["#006437","#fff"], symbol: "none", monogram: "AFC", monogramColor: "#fff", shape: "diamond" },
  amazonasfc:          { pattern: "solid", palette: ["#006437","#fff200"], symbol: "star", symbolColor: "#fff200", shape: "round-shield" },
  amazonas:            { pattern: "solid", palette: ["#006437","#fff200"], symbol: "star", symbolColor: "#fff200", shape: "round-shield" },
  ferroviaria:         { pattern: "solid", palette: ["#7a1f2b","#fff"], symbol: "none", monogram: "AFE", monogramColor: "#fff", shape: "round-shield" },
  afeferroviaria:      { pattern: "solid", palette: ["#7a1f2b","#fff"], symbol: "none", monogram: "AFE", monogramColor: "#fff", shape: "round-shield" },
  athleticclub:        { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "none", monogram: "ATH", monogramColor: "#fff", shape: "shield" },
  athleticmg:          { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "none", monogram: "ATH", monogramColor: "#fff", shape: "shield" },
  saobernardofc:       { pattern: "halves-h", palette: ["#fff200","#000"], symbol: "lion", symbolColor: "#000", shape: "round-shield" },
  retro:               { pattern: "stripes-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "RET", monogramColor: "#fff", shape: "round-shield" },
  retrofc:             { pattern: "stripes-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "RET", monogramColor: "#fff", shape: "round-shield" },

  // ===== Aliases "(adv)" — mesmo brasão do time original =====
  palmeirasadv:        { pattern: "solid", palette: ["#006437","#ffffff"], symbol: "palm", symbolColor: "#fff", shape: "round-shield" },
  botafogoadv:         { pattern: "stripes-v", palette: ["#000","#fff"], symbol: "star", symbolColor: "#fff", shape: "shield" },
  fluminenseadv:       { pattern: "tricolor-v", palette: ["#7a1f2b","#ffffff","#0a4d2e"], symbol: "none", shape: "round-shield", monogram: "FFC", monogramColor: "#fff" },
  fortalezaadv:        { pattern: "tricolor-v", palette: ["#0066b3","#fff","#cc0000"], symbol: "lion", symbolColor: "#fff", shape: "shield" },
  internacionaladv:    { pattern: "solid", palette: ["#cc0000","#fff"], symbol: "none", monogram: "SCI", monogramColor: "#fff", shape: "circle" },
  saopauloadv:         { pattern: "tricolor-h", palette: ["#cc0000","#ffffff","#1a1a1a"], symbol: "none", monogram: "SPF", monogramColor: "#cc0000", shape: "shield" },
  corinthiansadv:      { pattern: "solid", palette: ["#000","#fff"], symbol: "anchor", symbolColor: "#fff", shape: "round-shield" },
  cruzeiroadv:         { pattern: "solid", palette: ["#003f87","#ffffff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  santosadv:           { pattern: "solid", palette: ["#ffffff","#1a1a1a"], symbol: "ball", symbolColor: "#1a1a1a", shape: "round-shield" },
  gremioadv:           { pattern: "tricolor-v", palette: ["#0d3f8c","#000","#fff"], symbol: "none", monogram: "GRE", monogramColor: "#fff", shape: "round-shield" },
  gremioadvliberta:    { pattern: "tricolor-v", palette: ["#0d3f8c","#000","#fff"], symbol: "none", monogram: "GRE", monogramColor: "#fff", shape: "round-shield" },
  vascoadv:            { pattern: "sash", palette: ["#000","#fff"], symbol: "cross-malt", symbolColor: "#000", shape: "round-shield" },
  vascoadvliberta:     { pattern: "sash", palette: ["#000","#fff"], symbol: "cross-malt", symbolColor: "#000", shape: "round-shield" },
  bragantinoadv:       { pattern: "halves-h", palette: ["#ffffff","#cc0000"], symbol: "bolt", symbolColor: "#ffd400", shape: "shield" },
  athleticopradv:      { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "CAP", monogramColor: "#fff", shape: "round-shield" },
  atleticogoadvsula:   { pattern: "stripes-v", palette: ["#cc0000","#000"], symbol: "none", monogram: "ACG", monogramColor: "#fff", shape: "shield" },
  cuiabaadvsula:       { pattern: "stripes-v", palette: ["#fff200","#006437"], symbol: "none", monogram: "CBA", monogramColor: "#006437", shape: "round-shield" },
  goiasadvsula:        { pattern: "stripes-h", palette: ["#006437","#fff"], symbol: "none", monogram: "GEC", monogramColor: "#fff", shape: "shield" },
  atleticonacionalmundial:{ pattern: "solid", palette: ["#006b3f","#fff"], symbol: "none", monogram: "AN", monogramColor: "#fff", shape: "round-shield" },
  bocajuniorsmundial:  { pattern: "halves-h", palette: ["#003f87","#fdd000"], symbol: "none", monogram: "CABJ", monogramColor: "#fff", shape: "round-shield" },

  // ===== Argentina — clubes fixos =====
  velezsarsfield:      { pattern: "solid", palette: ["#ffffff","#0a3d91"], symbol: "none", monogram: "V", monogramColor: "#0a3d91", shape: "round-shield" },
  racingclub:          { pattern: "stripes-v", palette: ["#7ec1e7","#fff"], symbol: "none", monogram: "RAC", monogramColor: "#0055aa", shape: "shield" },
  racingsegundalinha:  { pattern: "stripes-v", palette: ["#7ec1e7","#fff"], symbol: "none", monogram: "RAC", monogramColor: "#0055aa", shape: "shield" },
  rosariocentral:      { pattern: "stripes-v", palette: ["#0055aa","#fff200"], symbol: "none", monogram: "CARC", monogramColor: "#fff", shape: "round-shield" },
  newellsoldboys:      { pattern: "halves-v", palette: ["#c8102e","#000"], symbol: "none", monogram: "NOB", monogramColor: "#fff", shape: "round-shield" },
  tallerescordoba:     { pattern: "stripes-v", palette: ["#0055aa","#fff"], symbol: "none", monogram: "CAT", monogramColor: "#0055aa", shape: "shield" },
  argentinosjuniors:   { pattern: "stripes-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "AAAJ", monogramColor: "#fff", shape: "round-shield" },
  belgranocordoba:     { pattern: "stripes-v", palette: ["#0a3d91","#fff"], symbol: "none", monogram: "CAB", monogramColor: "#fff", shape: "round-shield" },
  centralcordoba:      { pattern: "halves-h", palette: ["#000","#fff"], symbol: "star", symbolColor: "#fff", shape: "shield" },
  institutocordoba:    { pattern: "halves-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "IAC", monogramColor: "#c8102e", shape: "round-shield" },
  godoycruz:           { pattern: "stripes-v", palette: ["#0a3d91","#fff"], symbol: "none", monogram: "GC", monogramColor: "#fff", shape: "shield" },
  unionsantafe:        { pattern: "sash", palette: ["#fff","#c8102e"], symbol: "none", monogram: "US", monogramColor: "#c8102e", shape: "round-shield" },

  // ===== Uruguai / Bolívia / Chile =====
  liverpooluru:        { pattern: "halves-h", palette: ["#000","#fff"], symbol: "none", monogram: "LFC", monogramColor: "#000", shape: "shield" },
  danubio:             { pattern: "tricolor-v", palette: ["#c8102e","#000","#fff"], symbol: "none", monogram: "DFC", monogramColor: "#fff", shape: "shield" },
  cerrolargo:          { pattern: "halves-h", palette: ["#006437","#fff"], symbol: "none", monogram: "CL", monogramColor: "#006437", shape: "round-shield" },
  racingdemontevideo:  { pattern: "sash", palette: ["#fff","#0a3d91"], symbol: "none", monogram: "RC", monogramColor: "#0a3d91", shape: "shield" },
  bolivar:             { pattern: "solid", palette: ["#0a3d91","#fff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  thestrongest:        { pattern: "stripes-h", palette: ["#fff200","#000"], symbol: "none", monogram: "TS", monogramColor: "#000", shape: "shield" },
  blooming:            { pattern: "solid", palette: ["#0a3d91","#fff"], symbol: "none", monogram: "B", monogramColor: "#fff", shape: "circle" },
  nacionalpotosi:      { pattern: "stripes-v", palette: ["#006437","#fff"], symbol: "none", monogram: "NP", monogramColor: "#fff", shape: "shield" },
  alianzabol:          { pattern: "sash", palette: ["#fff","#0055aa"], symbol: "none", monogram: "AL", monogramColor: "#0055aa", shape: "shield" },
  palestino:           { pattern: "tricolor-h", palette: ["#c8102e","#fff","#000"], symbol: "none", monogram: "P", monogramColor: "#fff", shape: "round-shield" },
  unionespanola:       { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "cross", symbolColor: "#fff", shape: "shield" },
  coquimbounido:       { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "none", monogram: "CU", monogramColor: "#000", shape: "shield" },
  coquimboliberta:     { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "none", monogram: "CU", monogramColor: "#000", shape: "shield" },

  // ===== Peru / Equador / Colombia / Paraguai / Venezuela =====
  sportingcristal:     { pattern: "solid", palette: ["#7ec1e7","#fff"], symbol: "none", monogram: "SC", monogramColor: "#0a3d91", shape: "round-shield" },
  universitario:       { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "none", monogram: "U", monogramColor: "#c8102e", shape: "round-shield" },
  cienciano:           { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "none", monogram: "C", monogramColor: "#fff", shape: "shield" },
  melgar:              { pattern: "halves-h", palette: ["#000","#c8102e"], symbol: "none", monogram: "M", monogramColor: "#fff", shape: "round-shield" },
  sporthuancayo:       { pattern: "stripes-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "SH", monogramColor: "#c8102e", shape: "shield" },
  emelec:              { pattern: "stripes-h", palette: ["#0055aa","#fff"], symbol: "none", monogram: "CSE", monogramColor: "#fff", shape: "round-shield" },
  independientedelvalle:{ pattern: "solid", palette: ["#000","#fff"], symbol: "none", monogram: "IDV", monogramColor: "#fff", shape: "round-shield" },
  deportivocuenca:     { pattern: "stripes-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "DC", monogramColor: "#000", shape: "shield" },
  barcelonasc:         { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "none", monogram: "BSC", monogramColor: "#000", shape: "round-shield" },
  millonarios:         { pattern: "solid", palette: ["#0a3d91","#fff"], symbol: "none", monogram: "M", monogramColor: "#fff", shape: "round-shield" },
  juniorbarranquilla:  { pattern: "stripes-v", palette: ["#c8102e","#fff"], symbol: "none", monogram: "JR", monogramColor: "#000", shape: "shield" },
  deportivocali:       { pattern: "solid", palette: ["#006b3f","#fff"], symbol: "none", monogram: "DC", monogramColor: "#fff", shape: "round-shield" },
  deportivopereira:    { pattern: "stripes-h", palette: ["#c8102e","#fff200"], symbol: "none", monogram: "DP", monogramColor: "#000", shape: "shield" },
  deportestolima:      { pattern: "sash", palette: ["#c8102e","#fff200"], symbol: "none", monogram: "DT", monogramColor: "#000", shape: "shield" },
  oncecaldas:          { pattern: "stripes-v", palette: ["#fff","#000"], symbol: "none", monogram: "OC", monogramColor: "#c8102e", shape: "round-shield" },
  americadecali:       { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "none", monogram: "AC", monogramColor: "#fff", shape: "round-shield" },
  envigado:            { pattern: "solid", palette: ["#fa5a00","#fff"], symbol: "none", monogram: "EFC", monogramColor: "#fff", shape: "shield" },
  aguilasdoradas:      { pattern: "solid", palette: ["#fff200","#000"], symbol: "bird", symbolColor: "#000", shape: "shield" },
  fortalezaceif:       { pattern: "halves-h", palette: ["#fff200","#0055aa"], symbol: "none", monogram: "FCF", monogramColor: "#fff", shape: "shield" },
  alianzapetrolera:    { pattern: "halves-v", palette: ["#fff200","#000"], symbol: "none", monogram: "AP", monogramColor: "#000", shape: "shield" },
  libertad:            { pattern: "stripes-h", palette: ["#000","#fff"], symbol: "none", monogram: "L", monogramColor: "#fff", shape: "round-shield" },
  guaranipar:          { pattern: "stripes-v", palette: ["#000","#c8102e"], symbol: "none", monogram: "GC", monogramColor: "#fff", shape: "shield" },
  nacionalpar:         { pattern: "stripes-v", palette: ["#c8102e","#0a3d91"], symbol: "none", monogram: "CN", monogramColor: "#fff", shape: "round-shield" },
  sportivoluqueno:     { pattern: "stripes-v", palette: ["#fff200","#0a3d91"], symbol: "none", monogram: "SL", monogramColor: "#0a3d91", shape: "shield" },
  deportivotachira:    { pattern: "stripes-v", palette: ["#fff200","#000"], symbol: "none", monogram: "DT", monogramColor: "#000", shape: "round-shield" },

  // ===== Mundial de Clubes =====
  atleticodemadrid:    { pattern: "stripes-v", palette: ["#cc0000","#fff"], symbol: "none", monogram: "ATM", monogramColor: "#1a4ba0", shape: "shield" },
  fcporto:             { pattern: "stripes-v", palette: ["#fff","#0066b3"], symbol: "none", monogram: "FCP", monogramColor: "#0066b3", shape: "shield" },
  redbullsalzburg:     { pattern: "halves-h", palette: ["#c8102e","#fff"], symbol: "bolt", symbolColor: "#fff200", shape: "shield" },
  monterrey:           { pattern: "stripes-v", palette: ["#0a3d91","#fff"], symbol: "none", monogram: "M", monogramColor: "#fff", shape: "round-shield" },
  pachuca:             { pattern: "stripes-v", palette: ["#0055aa","#fff"], symbol: "none", monogram: "P", monogramColor: "#fff", shape: "shield" },
  clubleon:            { pattern: "solid", palette: ["#006437","#fff200"], symbol: "lion", symbolColor: "#fff200", shape: "round-shield" },
  losangelesfc:        { pattern: "solid", palette: ["#000","#c39e6d"], symbol: "none", monogram: "LAFC", monogramColor: "#c39e6d", shape: "shield" },
  seattlesounders:     { pattern: "solid", palette: ["#006437","#0055aa"], symbol: "none", monogram: "SEA", monogramColor: "#fff", shape: "round-shield" },
  alnassr:             { pattern: "solid", palette: ["#fff200","#0055aa"], symbol: "crown", symbolColor: "#0055aa", shape: "round-shield" },
  alittihad:           { pattern: "solid", palette: ["#fff200","#000"], symbol: "star", symbolColor: "#000", shape: "round-shield" },
  alain:               { pattern: "solid", palette: ["#7c2d92","#fff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  ulsanhd:             { pattern: "solid", palette: ["#0a3d91","#fff200"], symbol: "none", monogram: "U", monogramColor: "#fff200", shape: "round-shield" },
  urawareds:           { pattern: "solid", palette: ["#c8102e","#000"], symbol: "none", monogram: "URD", monogramColor: "#fff", shape: "round-shield" },
  mamelodisundowns:    { pattern: "solid", palette: ["#fff200","#0055aa"], symbol: "sun", symbolColor: "#0055aa", shape: "round-shield" },
  wydadcasablanca:     { pattern: "solid", palette: ["#c8102e","#fff"], symbol: "star", symbolColor: "#fff", shape: "round-shield" },
  esperancedetunis:    { pattern: "stripes-v", palette: ["#c8102e","#fff200"], symbol: "none", monogram: "EST", monogramColor: "#000", shape: "shield" },
  colonsf:             { pattern: "stripes-v", palette: ["#c8102e","#000"], symbol: "none", monogram: "CSF", monogramColor: "#fff", shape: "shield" },
};

// Stable hash for deterministic uniqueness on fallback art
function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

// Fallback restrito a formas/símbolos clássicos de futebol — nada de coração,
// pipa, gótico, gonfanão etc. que faz o brasão parecer inventado. USADO SÓ PARA
// times da IA (adversários reais). Times criados pelo jogador usam PLAYER_FALLBACK_*.
const FALLBACK_PATTERNS: Pattern[] = ["solid","stripes-v","stripes-h","halves-h","halves-v","sash","diagonal","hoops-h","tricolor-h","tricolor-v","quartered","cross","border"];
const FALLBACK_SHAPES: Shape[] = ["shield","round-shield","circle","shield","round-shield","circle","diamond","pentagon","hexagon","octagon","pointed-shield","rounded-square"];
const FALLBACK_SYMBOLS: Symbol[] = ["none","none","none","star","lion","bird","wing","cross","rooster","anchor","crown","cross-malt","ship","ball","fleur","tower","sun","flame","leaf"];

// Pools COMPLETOS usados apenas para times criados pelo jogador — pode ter
// dragão, coração, pipa, gótico, o que for. Máxima variedade.
const PLAYER_FALLBACK_PATTERNS: Pattern[] = [
  "solid","halves-v","halves-h","stripes-v","stripes-h","hoops-h",
  "sash","diagonal","tricolor-v","tricolor-h","cross","quartered",
  "checkers","chevrons","spots","rings","border","gradient-v","starburst","diagonal-stripes",
];
const PLAYER_FALLBACK_SHAPES: Shape[] = [
  "shield","round-shield","pointed-shield","chevron-shield","banner","flag",
  "rounded-square","pentagon","hexagon","hexagon-flat","octagon","circle",
  "diamond","kite","star5","gothic","gonfalon","heart","medal","swiss","teardrop",
];
const PLAYER_FALLBACK_SYMBOLS: Symbol[] = [
  "none","star","lion","bird","wing","bolt","crown","cross","cross-malt",
  "rooster","anchor","ball","palm","fleur","tower","eiffel","ship","devil",
  "sun","moon","flame","leaf","sword","trident","gem","trophy","gear",
  "mountain","wave","compass","helmet","wolf","dragon","skull","heart-sym",
];

// Paleta de cores curada e MASSIVA para gerar brasões variados por nome.
const FALLBACK_PALETTES: [string, string, string][] = [
  ["#c8102e","#000000","#ffffff"],
  ["#006437","#ffffff","#000000"],
  ["#003f87","#ffffff","#febe10"],
  ["#fdd000","#000000","#ffffff"],
  ["#7a1f2b","#0a4d2e","#ffffff"],
  ["#0066b3","#ffffff","#cc0000"],
  ["#1a1a1a","#ffffff","#c8102e"],
  ["#8e1f2f","#febe10","#000000"],
  ["#004170","#cc0000","#ffffff"],
  ["#12a0d7","#ffffff","#000000"],
  ["#f97316","#1a1a1a","#ffffff"],
  ["#6d28d9","#fbbf24","#ffffff"],
  ["#0d9488","#f8fafc","#0f172a"],
  ["#dc2626","#facc15","#000000"],
  ["#166534","#fde047","#ffffff"],
  ["#0f172a","#38bdf8","#ffffff"],
  ["#be185d","#ffffff","#000000"],
  ["#3b0764","#ffffff","#f59e0b"],
  ["#065f46","#ffffff","#f97316"],
  ["#78350f","#fef3c7","#000000"],
  ["#1e3a8a","#f59e0b","#ffffff"],
  ["#4c1d95","#a78bfa","#ffffff"],
  ["#7c2d12","#fbbf24","#000000"],
  ["#14532d","#bef264","#000000"],
  ["#0891b2","#fef3c7","#083344"],
  ["#831843","#f9a8d4","#ffffff"],
  ["#052e16","#22c55e","#ffffff"],
  ["#7f1d1d","#ffffff","#fde047"],
  ["#1e40af","#ffffff","#f97316"],
  ["#0c4a6e","#7dd3fc","#ffffff"],
  ["#4a044e","#e879f9","#000000"],
  ["#374151","#f59e0b","#ffffff"],
  ["#991b1b","#000000","#d1d5db"],
  ["#facc15","#0f172a","#ffffff"],
  ["#059669","#000000","#ffffff"],
  ["#2563eb","#f43f5e","#ffffff"],
  ["#0e7490","#fde68a","#000000"],
  ["#a16207","#000000","#ffffff"],
  ["#075985","#facc15","#ffffff"],
  ["#701a75","#f5d0fe","#000000"],
  ["#1c1917","#eab308","#ffffff"],
  ["#84cc16","#1a2e05","#ffffff"],
  ["#ea580c","#083344","#ffffff"],
  ["#3f3f46","#22d3ee","#ffffff"],
  ["#450a0a","#f97316","#ffffff"],
  ["#171717","#ef4444","#facc15"],
  ["#1e293b","#e11d48","#ffffff"],
  ["#155e75","#f97316","#ffffff"],
  ["#4d7c0f","#fef9c3","#000000"],
  ["#312e81","#c7d2fe","#facc15"],
  ["#0a0a0a","#f59e0b","#dc2626"],
  ["#164e63","#a5f3fc","#000000"],
  ["#581c87","#facc15","#ffffff"],
  ["#134e4a","#f0fdfa","#f59e0b"],
  ["#9d174d","#fce7f3","#000000"],
  ["#3730a3","#ffffff","#22c55e"],
  ["#365314","#f59e0b","#ffffff"],
  ["#7c3aed","#ffffff","#0ea5e9"],
];

function fallbackArt(name: string, colors: [string, string]): Art {
  const key = slug(name) || name || "x";
  const h = hashStr(key);
  const h2 = hashStr(key + "#s2");
  const h3 = hashStr(key + "#s3");
  const h4 = hashStr(key + "#s4");
  const h5 = hashStr(key + "#s5");
  const h6 = hashStr(key + "#s6");
  const base = FALLBACK_PALETTES[h % FALLBACK_PALETTES.length];
  const rot = h2 % 3;
  const palette: string[] = [base[rot % 3], base[(rot + 1) % 3], base[(rot + 2) % 3]];
  if (!name) { palette[0] = colors[0]; palette[1] = colors[1] ?? "#ffffff"; }
  // Alterna entre símbolo figurativo e monograma pra dobrar a variedade visual
  const useMonogram = (h5 % 5) === 0;
  const sym: Symbol = useMonogram ? "none" : FALLBACK_SYMBOLS[h3 % FALLBACK_SYMBOLS.length];
  return {
    pattern: FALLBACK_PATTERNS[(h >> 2) % FALLBACK_PATTERNS.length],
    palette,
    shape: FALLBACK_SHAPES[h4 % FALLBACK_SHAPES.length],
    symbol: sym,
    symbolColor: palette[h6 % 3],
    monogramColor: palette[(h6 >> 3) % 3],
  };
}

// Variedade máxima para times criados pelo jogador — usa os pools completos.
function playerFallbackArt(name: string, colors: [string, string]): Art {
  const key = slug(name) || name || "x";
  const h = hashStr(key);
  const h2 = hashStr(key + "#s2");
  const h3 = hashStr(key + "#s3");
  const h4 = hashStr(key + "#s4");
  const h5 = hashStr(key + "#s5");
  const h6 = hashStr(key + "#s6");
  const base = FALLBACK_PALETTES[h % FALLBACK_PALETTES.length];
  const rot = h2 % 3;
  const palette: string[] = [base[rot % 3], base[(rot + 1) % 3], base[(rot + 2) % 3]];
  if (!name) { palette[0] = colors[0]; palette[1] = colors[1] ?? "#ffffff"; }
  const useMonogram = (h5 % 5) === 0;
  const sym: Symbol = useMonogram ? "none" : PLAYER_FALLBACK_SYMBOLS[h3 % PLAYER_FALLBACK_SYMBOLS.length];
  return {
    pattern: PLAYER_FALLBACK_PATTERNS[(h >> 2) % PLAYER_FALLBACK_PATTERNS.length],
    palette,
    shape: PLAYER_FALLBACK_SHAPES[h4 % PLAYER_FALLBACK_SHAPES.length],
    symbol: sym,
    symbolColor: palette[h6 % 3],
    monogramColor: palette[(h6 >> 3) % 3],
  };
}





function getArt(name?: string): Art | null {
  if (!name) return null;
  return ART[slug(name)] ?? null;
}

function initialsFromName(name?: string, fallback = "T") {
  const words = (name ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return fallback.slice(0, 3).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 3);
  return words.slice(0, 3).map((w) => w[0]).join("").slice(0, 3);
}

function contrastText(hex: string) {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(clean)) return "#ffffff";
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.58 ? "#0f172a" : "#ffffff";
}

// Luminância relativa (0..1). Aceita #rgb, #rrggbb, com/sem #.
function relLum(hex: string): number {
  let clean = (hex || "").replace("#", "").trim();
  if (clean.length === 3) clean = clean.split("").map(c => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(clean)) return 0.5;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Retorna cor de contorno ("#000"/"#fff") quando fg tem baixo contraste com bg; null se já contrasta bem. */
function outlineFor(fg: string, bg: string): string | null {
  const lf = relLum(fg);
  const lb = relLum(bg);
  if (Math.abs(lf - lb) >= 0.34) return null;
  // Contorno oposto à cor do símbolo/texto
  return lf > 0.55 ? "#000000" : "#ffffff";
}


// -------- Shape clip path (returns the silhouette outline) --------
function shapePath(shape: Shape): string {
  switch (shape) {
    case "circle":         return "M32,4 a28,28 0 1,1 0,56 a28,28 0 1,1 0,-56";
    case "diamond":        return "M32,3 L61,32 L32,61 L3,32 Z";
    case "round-shield":   return "M10,8 H54 V32 Q54,52 32,60 Q10,52 10,32 Z";
    case "pentagon":       return "M32,4 L60,24 L50,60 L14,60 L4,24 Z";
    case "hexagon":        return "M32,4 L58,18 L58,46 L32,60 L6,46 L6,18 Z";
    case "octagon":        return "M20,4 H44 L60,20 V44 L44,60 H20 L4,44 V20 Z";
    case "banner":         return "M6,10 H58 V46 L32,60 L6,46 Z";
    case "pointed-shield": return "M8,6 H56 V30 Q56,48 32,62 Q8,48 8,30 Z";
    case "flag":           return "M8,6 H56 V54 L44,50 L32,54 L20,50 L8,54 Z";
    case "star5":          return "M32,4 L39,24 L60,24 L43,37 L50,58 L32,45 L14,58 L21,37 L4,24 L25,24 Z";
    case "rounded-square": return "M12,8 H52 Q60,8 60,16 V48 Q60,60 48,60 H16 Q4,60 4,48 V16 Q4,8 12,8 Z";
    case "chevron-shield": return "M8,8 H56 V30 L44,42 L32,30 L20,42 L8,30 Z";
    case "hexagon-flat":   return "M16,6 H48 L60,32 L48,58 H16 L4,32 Z";
    case "kite":           return "M32,2 L56,26 L32,62 L8,26 Z";
    case "gothic":         return "M8,22 Q8,4 32,4 Q56,4 56,22 V38 Q56,54 32,60 Q8,54 8,38 Z";
    case "gonfalon":       return "M8,6 H56 V50 L48,50 L48,60 L38,50 L26,50 L16,60 L16,50 L8,50 Z";
    case "heart":          return "M32,60 C10,44 4,26 14,14 C22,6 32,14 32,22 C32,14 42,6 50,14 C60,26 54,44 32,60 Z";
    case "medal":          return "M26,4 H38 L44,10 H50 V30 Q50,52 32,60 Q14,52 14,30 V10 H20 Z";
    case "swiss":          return "M14,6 H50 Q56,6 56,12 V52 Q56,58 50,58 H14 Q8,58 8,52 V12 Q8,6 14,6 Z";
    case "teardrop":       return "M32,4 Q54,20 54,38 Q54,58 32,60 Q10,58 10,38 Q10,20 32,4 Z";
    case "shield":
    default:               return "M8,8 H56 V34 Q56,52 32,60 Q8,52 8,34 Z";
  }
}


// -------- Pattern fills inside the silhouette --------
function PatternFill({ pattern, colors, id }: { pattern: Pattern; colors: string[]; id: string }) {
  const [a, b, c] = colors;
  switch (pattern) {
    case "solid":
      return <rect width="64" height="64" fill={a} />;
    case "halves-v":
      return <><rect width="32" height="64" fill={a} /><rect x="32" width="32" height="64" fill={b} /></>;
    case "halves-h":
      return <><rect width="64" height="32" fill={a} /><rect y="32" width="64" height="32" fill={b} /></>;
    case "stripes-v":
      return (
        <>
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={i*11} width="11" height="64" fill={i%2 === 0 ? a : b} />
          ))}
        </>
      );
    case "stripes-h":
      return (
        <>
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} y={i*11} width="64" height="11" fill={i%2 === 0 ? a : b} />
          ))}
        </>
      );
    case "hoops-h":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[10, 26, 42].map((y,i) => (
            <rect key={i} y={y} width="64" height="8" fill={b} />
          ))}
        </>
      );
    case "sash":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          <polygon points="0,40 0,52 36,8 24,8" fill={b} />
        </>
      );
    case "diagonal":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          <polygon points="0,64 64,0 64,16 16,64" fill={b} />
        </>
      );
    case "tricolor-v":
      return (
        <>
          <rect x="0"  width="21.3" height="64" fill={a} />
          <rect x="21.3" width="21.3" height="64" fill={b ?? a} />
          <rect x="42.6" width="21.4" height="64" fill={c ?? a} />
        </>
      );
    case "tricolor-h":
      return (
        <>
          <rect y="0"  width="64" height="21.3" fill={a} />
          <rect y="21.3" width="64" height="21.3" fill={b ?? a} />
          <rect y="42.6" width="64" height="21.4" fill={c ?? a} />
        </>
      );
    case "cross":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          <rect x="26" width="12" height="64" fill={b} />
          <rect y="26" width="64" height="12" fill={b} />
        </>
      );
    case "quartered":
      return (
        <>
          <rect width="32" height="32" fill={a} />
          <rect x="32" width="32" height="32" fill={b} />
          <rect y="32" width="32" height="32" fill={b} />
          <rect x="32" y="32" width="32" height="32" fill={a} />
        </>
      );
    case "checkers":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[0,1,2,3,4,5,6,7].map((r) =>
            [0,1,2,3,4,5,6,7].map((cc) => (
              (r + cc) % 2 === 1 ? (
                <rect key={`${r}-${cc}`} x={cc*8} y={r*8} width="8" height="8" fill={b} />
              ) : null
            ))
          )}
        </>
      );
    case "chevrons":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[0,14,28,42,56].map((y, i) => (
            <polyline
              key={i}
              points={`0,${y+10} 32,${y} 64,${y+10}`}
              fill="none"
              stroke={b}
              strokeWidth="6"
              strokeLinejoin="round"
            />
          ))}
        </>
      );
    case "spots":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[[10,12],[26,8],[44,14],[58,10],[8,30],[24,26],[40,30],[56,26],[12,46],[30,42],[46,46],[58,42],[20,58],[40,58]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill={b} />
          ))}
        </>
      );
    case "rings":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[26,20,14,8].map((r,i) => (
            <circle key={i} cx="32" cy="32" r={r} fill="none" stroke={i%2===0 ? b : a} strokeWidth="4" />
          ))}
        </>
      );
    case "border":
      return (
        <>
          <rect width="64" height="64" fill={b} />
          <rect x="6" y="6" width="52" height="52" fill={a} />
        </>
      );
    case "gradient-v":
      return (
        <>
          <defs>
            <linearGradient id={`pg-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={b} />
            </linearGradient>
          </defs>
          <rect width="64" height="64" fill={`url(#pg-${id})`} />
        </>
      );
    case "starburst":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[0,22.5,45,67.5,90,112.5,135,157.5].map((deg,i) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = 32 + Math.cos(rad) * 60;
            const y2 = 32 + Math.sin(rad) * 60;
            const x1 = 32 - Math.cos(rad) * 60;
            const y1 = 32 - Math.sin(rad) * 60;
            return i % 2 === 0 ? (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={b} strokeWidth="6" opacity="0.75" />
            ) : null;
          })}
        </>
      );
    case "diagonal-stripes":
      return (
        <>
          <rect width="64" height="64" fill={a} />
          {[-40,-20,0,20,40,60].map((k,i) => (
            <polygon key={i} points={`${k},64 ${k+10},64 ${k+74},0 ${k+64},0`} fill={b} opacity="0.9" />
          ))}
        </>
      );
    default:
      return <rect width="64" height="64" fill={a} />;
  }
}

// -------- Symbol overlays (centered around 32,34) --------
function SymbolArt({ symbol, color }: { symbol: Symbol; color: string }) {
  const s = color;
  switch (symbol) {
    case "palm":
      return (
        <g fill={s} stroke="rgba(0,0,0,.25)" strokeWidth="0.4">
          <rect x="30" y="32" width="4" height="18" rx="1" />
          <path d="M32,30 C20,28 14,22 12,16 C20,18 28,22 32,28 Z" />
          <path d="M32,30 C44,28 50,22 52,16 C44,18 36,22 32,28 Z" />
          <path d="M32,28 C24,20 24,12 26,6 C30,12 32,20 32,28 Z" />
          <path d="M32,28 C40,20 40,12 38,6 C34,12 32,20 32,28 Z" />
        </g>
      );
    case "star":
      return <polygon points="32,16 36,28 49,28 38,36 42,49 32,41 22,49 26,36 15,28 28,28" fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.5"/>;
    case "anchor":
      return (
        <g fill="none" stroke={s} strokeWidth="3" strokeLinecap="round">
          <circle cx="32" cy="20" r="3" />
          <line x1="32" y1="23" x2="32" y2="48" />
          <line x1="24" y1="30" x2="40" y2="30" />
          <path d="M18,42 Q18,52 32,52 Q46,52 46,42" />
        </g>
      );
    case "crown":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.5">
          <path d="M14,40 L18,22 L26,34 L32,18 L38,34 L46,22 L50,40 Z" />
          <rect x="14" y="42" width="36" height="5" />
          <circle cx="18" cy="22" r="2" /><circle cx="32" cy="18" r="2" /><circle cx="46" cy="22" r="2" />
        </g>
      );
    case "cross-malt":
      return (
        <g fill={s}>
          <polygon points="32,12 28,26 14,26 24,32 14,38 28,38 32,52 36,38 50,38 40,32 50,26 36,26" />
        </g>
      );
    case "rooster":
      // Galo de perfil colorido: crista/barbela vermelhas, bico amarelo, cauda com penas coloridas
      return (
        <g stroke="rgba(0,0,0,.55)" strokeWidth="0.6" strokeLinejoin="round" strokeLinecap="round">
          {/* Crista serrilhada (vermelha) */}
          <path d="M24,18 L26,14 L28,17 L30,13 L32,16 L34,12 L35,18 Z" fill="#e11d2a" />
          {/* Cabeça (cor do time) */}
          <path d="M24,18 Q22,22 24,26 L34,26 Q36,22 35,18 Z" fill={s} />
          {/* Bico amarelo/laranja */}
          <path d="M34,21 L40,22 L34,24 Z" fill="#f5a524" />
          {/* Olho */}
          <circle cx="29" cy="21" r="0.9" fill="#000" stroke="none" />
          {/* Barbela vermelha */}
          <path d="M32,25 Q33,29 30,29 Q29,27 30,25 Z" fill="#e11d2a" />
          {/* Cauda com penas coloridas (verde, azul, roxo) atrás do corpo */}
          <path d="M38,32 Q50,22 50,32 Q48,30 44,32 Z" fill="#0ea15a" />
          <path d="M38,34 Q52,28 50,38 Q46,32 42,34 Z" fill="#1e5fd8" />
          <path d="M38,36 Q48,36 46,42 Q42,36 38,38 Z" fill="#7c3aed" />
          {/* Corpo redondo (cor do time) */}
          <path d="M22,28 Q16,34 22,42 Q28,46 36,44 Q42,40 40,32 Q36,26 28,26 Q24,26 22,28 Z" fill={s} />
          {/* Asa marcada */}
          <path d="M26,32 Q32,30 36,34 Q32,40 26,38 Z" fill="rgba(0,0,0,.22)" stroke="none" />
          {/* Pernas amarelas */}
          <path d="M26,44 L25,50 M24,50 L28,50 M24,50 L22,52 M28,50 L30,52" stroke="#f5a524" strokeWidth="1.3" fill="none" />
          <path d="M32,44 L33,50 M31,50 L35,50 M31,50 L29,52 M35,50 L37,52" stroke="#f5a524" strokeWidth="1.3" fill="none" />
        </g>
      );
    case "bird":
      // Águia estilizada com asas abertas (Benfica/Lazio/Tottenham vibe)
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          {/* Asa esquerda */}
          <path d="M32,30 Q22,22 12,26 Q18,28 22,32 Q16,32 12,36 Q20,36 24,34 Q20,38 16,42 Q24,40 28,36 Z" />
          {/* Asa direita (espelho) */}
          <path d="M32,30 Q42,22 52,26 Q46,28 42,32 Q48,32 52,36 Q44,36 40,34 Q44,38 48,42 Q40,40 36,36 Z" />
          {/* Corpo + cauda */}
          <path d="M30,30 L34,30 L36,42 L32,48 L28,42 Z" />
          {/* Cabeça com bico */}
          <circle cx="32" cy="26" r="3.2" />
          <path d="M32,25 L38,25 L34,28 Z" fill={s} />
          <circle cx="33" cy="25" r="0.7" fill="#000" />
        </g>
      );
    case "devil":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          {/* Chifres */}
          <path d="M21,18 L26,26 L19,26 Z" />
          <path d="M43,18 L45,26 L38,26 Z" />
          {/* Rosto em escudo */}
          <path d="M20,28 Q32,22 44,28 Q46,40 38,50 Q32,54 26,50 Q18,40 20,28 Z" />
          {/* Olhos */}
          <ellipse cx="27" cy="34" rx="1.8" ry="2.2" fill="#000" />
          <ellipse cx="37" cy="34" rx="1.8" ry="2.2" fill="#000" />
          {/* Boca/dente */}
          <path d="M28,42 Q32,46 36,42 L36,44 Q32,48 28,44 Z" fill="#000" />
          {/* Tridente */}
          <path d="M22,52 L24,58 L26,52 M30,52 L32,58 L34,52 M38,52 L40,58 L42,52" stroke={s} strokeWidth="1.4" fill="none" />
        </g>
      );
    case "lion":
      return (
        <g stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          {/* Juba */}
          <g fill={s}>
            <circle cx="32" cy="34" r="14" />
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
              const r1 = 14, r2 = 18;
              const rad = (a * Math.PI) / 180;
              const x1 = 32 + Math.cos(rad) * r1;
              const y1 = 34 + Math.sin(rad) * r1;
              const x2 = 32 + Math.cos(rad) * r2;
              const y2 = 34 + Math.sin(rad) * r2;
              const rad2 = ((a + 15) * Math.PI) / 180;
              const x3 = 32 + Math.cos(rad2) * r1;
              const y3 = 34 + Math.sin(rad2) * r1;
              return <polygon key={a} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} />;
            })}
          </g>
          {/* Focinho */}
          <ellipse cx="32" cy="38" rx="6" ry="5" fill={s === "#fff" ? "#fafafa" : "#fff"} opacity="0.95" />
          <circle cx="29" cy="32" r="1.6" fill="#000" />
          <circle cx="35" cy="32" r="1.6" fill="#000" />
          <ellipse cx="32" cy="37" rx="1.4" ry="1" fill="#000" />
          <path d="M28,40 Q32,44 36,40" stroke="#000" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
        </g>
      );

    case "ball":
      return (
        <g>
          <circle cx="32" cy="34" r="14" fill="#fff" stroke="#000" strokeWidth="1.5" />
          <polygon points="32,28 37,32 35,38 29,38 27,32" fill={s === "#fff" ? "#000" : s} />
          <line x1="32" y1="20" x2="32" y2="28" stroke="#000" strokeWidth="1" />
          <line x1="42" y1="28" x2="37" y2="32" stroke="#000" strokeWidth="1" />
          <line x1="22" y1="28" x2="27" y2="32" stroke="#000" strokeWidth="1" />
          <line x1="26" y1="46" x2="29" y2="38" stroke="#000" strokeWidth="1" />
          <line x1="38" y1="46" x2="35" y2="38" stroke="#000" strokeWidth="1" />
        </g>
      );
    case "bolt":
      return <polygon points="34,14 22,36 30,36 26,50 42,28 34,28 38,14" fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4"/>;
    case "eiffel":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <path d="M30,14 L34,14 L34,22 L38,22 L38,28 L40,28 L42,50 L36,50 L34,40 L30,40 L28,50 L22,50 L24,28 L26,28 L26,22 L30,22 Z" />
        </g>
      );
    case "fleur":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <path d="M32,14 Q28,22 24,26 Q28,28 32,26 Q36,28 40,26 Q36,22 32,14 Z" />
          <rect x="22" y="32" width="20" height="3" />
          <path d="M32,18 L32,50" stroke={s} strokeWidth="3" />
          <path d="M22,38 Q24,48 32,50 Q40,48 42,38 Q32,42 22,38 Z" />
        </g>
      );
    case "wing":
      // Asas heráldicas com penas (Lazio/Roma/Benfica)
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          {/* Asa esquerda — 3 fileiras de penas */}
          <path d="M14,42 Q18,30 30,30 L30,34 Q22,34 18,40 Z" />
          <path d="M16,38 Q20,28 30,28 L30,32 Q22,32 20,36 Z" />
          <path d="M18,34 Q22,26 30,26 L30,30 Q22,30 22,32 Z" />
          {/* Asa direita */}
          <path d="M50,42 Q46,30 34,30 L34,34 Q42,34 46,40 Z" />
          <path d="M48,38 Q44,28 34,28 L34,32 Q42,32 44,36 Z" />
          <path d="M46,34 Q42,26 34,26 L34,30 Q42,30 42,32 Z" />
          {/* Centro/coroa */}
          <ellipse cx="32" cy="34" rx="3.5" ry="4" />
          <circle cx="32" cy="32" r="1.4" fill="#000" />
        </g>
      );

    case "tower":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <rect x="24" y="20" width="16" height="30" />
          <rect x="22" y="16" width="20" height="6" />
          <rect x="28" y="28" width="3" height="5" fill="#000"/>
          <rect x="33" y="28" width="3" height="5" fill="#000"/>
          <rect x="28" y="38" width="3" height="5" fill="#000"/>
          <rect x="33" y="38" width="3" height="5" fill="#000"/>
        </g>
      );
    case "ship":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <path d="M14,42 L50,42 L46,50 L18,50 Z" />
          <rect x="30" y="22" width="4" height="20" />
          <polygon points="34,24 46,30 34,32" />
          <polygon points="30,24 18,30 30,32" />
        </g>
      );
    case "cross":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <rect x="28" y="14" width="8" height="36" />
          <rect x="16" y="28" width="32" height="8" />
        </g>
      );
    case "sun":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <circle cx="32" cy="34" r="8" />
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 32 + Math.cos(rad) * 11;
            const y1 = 34 + Math.sin(rad) * 11;
            const x2 = 32 + Math.cos(rad) * 20;
            const y2 = 34 + Math.sin(rad) * 20;
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s} strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </g>
      );
    case "moon":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <path d="M42,18 A16,16 0 1,0 42,50 A12,12 0 1,1 42,18 Z" />
        </g>
      );
    case "flame":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          <path d="M32,14 C38,22 44,26 44,36 C44,46 38,52 32,52 C26,52 20,46 20,36 C20,28 26,26 28,20 C30,24 32,22 32,14 Z" />
          <path d="M32,28 C34,32 36,34 36,38 C36,44 34,48 32,48 C30,48 28,44 28,38 C28,34 30,32 32,28 Z" fill="rgba(255,255,255,0.35)" stroke="none" />
        </g>
      );
    case "leaf":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          <path d="M18,50 Q14,32 22,20 Q34,10 46,14 Q48,32 40,44 Q30,52 18,50 Z" />
          <path d="M18,50 Q28,38 46,14" stroke={s === "#fff" ? "#000" : "rgba(0,0,0,0.55)"} strokeWidth="1.2" fill="none" />
        </g>
      );
    case "sword":
      return (
        <g stroke={s} strokeWidth="3" strokeLinecap="round" fill="none">
          <line x1="16" y1="16" x2="46" y2="46" />
          <line x1="48" y1="16" x2="18" y2="46" />
          <circle cx="32" cy="32" r="2" fill={s} stroke="none" />
        </g>
      );
    case "trident":
      return (
        <g fill={s} stroke="rgba(0,0,0,.3)" strokeWidth="0.4">
          <path d="M20,14 L20,26 L18,26 L22,32 L22,54 L26,54 L26,32 L30,32 L30,26 L28,26 L28,14 Z" />
          <path d="M36,14 L36,26 L34,26 L38,32 L38,54 L42,54 L42,32 L46,32 L46,26 L44,26 L44,14 Z" />
          <path d="M28,14 L36,14 L36,20 L28,20 Z" />
          <path d="M12,20 L20,20 L20,26 L14,26 Z" />
          <path d="M44,20 L52,20 L50,26 L44,26 Z" />
        </g>
      );
    case "gem":
      return (
        <g fill={s} stroke="rgba(0,0,0,.4)" strokeWidth="0.6" strokeLinejoin="round">
          <polygon points="32,14 46,24 40,50 24,50 18,24" />
          <line x1="24" y1="50" x2="24" y2="24" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <line x1="40" y1="50" x2="40" y2="24" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
          <line x1="18" y1="24" x2="46" y2="24" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
          <polygon points="32,14 24,24 32,32 40,24" fill="rgba(255,255,255,0.28)" stroke="none" />
        </g>
      );
    case "trophy":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.5" strokeLinejoin="round">
          <path d="M22,14 H42 V26 Q42,36 32,38 Q22,36 22,26 Z" />
          <path d="M18,16 Q10,18 12,26 Q14,32 22,32" fill="none" stroke={s} strokeWidth="2" />
          <path d="M46,16 Q54,18 52,26 Q50,32 42,32" fill="none" stroke={s} strokeWidth="2" />
          <rect x="28" y="38" width="8" height="6" />
          <rect x="22" y="44" width="20" height="4" />
          <rect x="18" y="48" width="28" height="4" />
        </g>
      );
    case "gear":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4">
          {[0,45,90,135,180,225,270,315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 32 + Math.cos(rad) * 18;
            const y = 34 + Math.sin(rad) * 18;
            return <rect key={deg} x={x-3} y={y-3} width="6" height="6" transform={`rotate(${deg} ${x} ${y})`} />;
          })}
          <circle cx="32" cy="34" r="13" />
          <circle cx="32" cy="34" r="5" fill={s === "#fff" ? "#111" : "#fff"} />
        </g>
      );
    case "mountain":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.4" strokeLinejoin="round">
          <polygon points="8,50 22,26 32,38 42,20 56,50" />
          <polygon points="18,32 22,26 26,32 22,36" fill="rgba(255,255,255,0.7)" stroke="none" />
          <polygon points="38,26 42,20 46,26 42,30" fill="rgba(255,255,255,0.7)" stroke="none" />
        </g>
      );
    case "wave":
      return (
        <g fill="none" stroke={s} strokeWidth="3" strokeLinecap="round">
          <path d="M10,28 Q18,20 26,28 T42,28 T58,28" />
          <path d="M10,38 Q18,30 26,38 T42,38 T58,38" />
          <path d="M10,48 Q18,40 26,48 T42,48 T58,48" />
        </g>
      );
    case "compass":
      return (
        <g fill={s} stroke="rgba(0,0,0,.4)" strokeWidth="0.5">
          <circle cx="32" cy="34" r="16" fill="none" stroke={s} strokeWidth="2" />
          <polygon points="32,20 36,34 32,48 28,34" />
          <polygon points="32,20 32,34 28,34" fill="rgba(255,255,255,0.35)" stroke="none" />
          <circle cx="32" cy="34" r="1.6" fill="#000" />
        </g>
      );
    case "helmet":
      return (
        <g fill={s} stroke="rgba(0,0,0,.4)" strokeWidth="0.5" strokeLinejoin="round">
          <path d="M16,32 Q16,18 32,18 Q48,18 48,32 V42 H16 Z" />
          <rect x="16" y="34" width="32" height="4" fill="rgba(0,0,0,0.55)" />
          <rect x="22" y="34" width="3" height="4" fill={s} />
          <rect x="30" y="34" width="4" height="4" fill={s} />
          <rect x="39" y="34" width="3" height="4" fill={s} />
          <path d="M16,42 H48 L44,50 H20 Z" />
          <path d="M28,10 Q32,4 36,10 L36,18 L28,18 Z" fill={s} />
        </g>
      );
    case "wolf":
      return (
        <g fill={s} stroke="rgba(0,0,0,.45)" strokeWidth="0.6" strokeLinejoin="round">
          {/* orelhas */}
          <polygon points="16,14 24,24 12,26" />
          <polygon points="48,14 40,24 52,26" />
          {/* interior das orelhas */}
          <polygon points="17,18 22,24 15,24" fill="rgba(0,0,0,.35)" stroke="none" />
          <polygon points="47,18 42,24 49,24" fill="rgba(0,0,0,.35)" stroke="none" />
          {/* cabeça */}
          <path d="M14,26 Q14,20 20,20 L26,22 Q32,18 38,22 L44,20 Q50,20 50,26 L48,38 Q46,44 40,46 L36,50 L32,48 L28,50 L24,46 Q18,44 16,38 Z" />
          {/* olhos (amendoados) */}
          <polygon points="22,30 27,29 25,33" fill="#000" stroke="none" />
          <polygon points="42,30 37,29 39,33" fill="#000" stroke="none" />
          {/* focinho */}
          <path d="M28,36 Q32,34 36,36 L35,42 Q32,44 29,42 Z" fill="rgba(0,0,0,.18)" stroke="none" />
          {/* nariz */}
          <ellipse cx="32" cy="37.5" rx="2" ry="1.4" fill="#000" stroke="none" />
          {/* boca */}
          <path d="M29,42 L32,45 L35,42" stroke="#000" strokeWidth="0.7" fill="none" />
          {/* presas */}
          <polygon points="30,45 31,47 32,45" fill="#fff" stroke="none" />
          <polygon points="32,45 33,47 34,45" fill="#fff" stroke="none" />
        </g>
      );
    case "dragon":
      return (
        <g fill={s} stroke="rgba(0,0,0,.45)" strokeWidth="0.6" strokeLinejoin="round">
          {/* chifres */}
          <polygon points="40,20 46,8 44,22" />
          <polygon points="46,22 54,14 50,24" />
          {/* espinhos da nuca */}
          <polygon points="52,26 60,24 54,32" />
          <polygon points="54,32 60,34 52,36" />
          {/* cabeça de perfil (focinho à esquerda) */}
          <path d="M8,36 Q10,26 20,24 Q28,18 38,22 Q46,22 50,28 Q56,30 54,36 L50,40 Q46,44 40,44 L36,50 L32,46 L26,48 L22,44 Q14,44 8,40 Z" />
          {/* olho felino */}
          <ellipse cx="24" cy="30" rx="2.2" ry="1.6" fill="#fff" stroke="none" />
          <ellipse cx="24" cy="30" rx="0.9" ry="1.5" fill="#000" stroke="none" />
          {/* narina */}
          <ellipse cx="12" cy="33" rx="1.2" ry="0.8" fill="#000" stroke="none" />
          {/* mandíbula aberta */}
          <path d="M9,37 Q14,42 22,42 L22,45 Q14,45 9,41 Z" fill="rgba(0,0,0,.35)" stroke="none" />
          {/* presas */}
          <polygon points="12,37 13,42 14,37" fill="#fff" stroke="none" />
          <polygon points="16,37 17,42 18,37" fill="#fff" stroke="none" />
          <polygon points="12,42 13,45 14,42" fill="#fff" stroke="none" />
          {/* barbela */}
          <path d="M20,44 L18,50 L24,47 Z" />
        </g>
      );
    case "skull":
      return (
        <g fill={s} stroke="rgba(0,0,0,.45)" strokeWidth="0.5" strokeLinejoin="round">
          <path d="M18,30 Q18,16 32,16 Q46,16 46,30 V40 Q46,44 42,44 L40,50 H36 L34,46 H30 L28,50 H24 L22,44 Q18,44 18,40 Z" />
          <ellipse cx="26" cy="32" rx="3" ry="3.5" fill="#000" />
          <ellipse cx="38" cy="32" rx="3" ry="3.5" fill="#000" />
          <path d="M30,40 L32,44 L34,40 Z" fill="#000" />
          <line x1="26" y1="46" x2="26" y2="50" stroke="#000" strokeWidth="1.5" />
          <line x1="30" y1="46" x2="30" y2="50" stroke="#000" strokeWidth="1.5" />
          <line x1="34" y1="46" x2="34" y2="50" stroke="#000" strokeWidth="1.5" />
          <line x1="38" y1="46" x2="38" y2="50" stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case "heart-sym":
      return (
        <g fill={s} stroke="rgba(0,0,0,.35)" strokeWidth="0.5" strokeLinejoin="round">
          <path d="M32,50 C18,40 12,30 18,22 C22,17 30,20 32,26 C34,20 42,17 46,22 C52,30 46,40 32,50 Z" />
        </g>
      );
    case "none":
    default:
      return null;
  }
}

export function Crest({ colors, shape = "shield", short, name, size = 44, player = false, config }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // Se veio um brasão customizado via context (jogador editou o próprio escudo), usa ele.
  const ctxConfig = usePlayerCrestConfig();
  const effectiveConfig = config ?? (player ? ctxConfig : null);
  // Escudo do jogador nunca deve casar com um clube real (ex.: "Milan", "Diego"),
  // mas também não pode virar tudo amarelo/VOC. Gera arte própria pelo nome.
  const explicit = player ? null : getArt(name);
  // AI/times reais usam pool restrito clássico; times do jogador usam pool completo (com formas exóticas).
  const rawFallback = player
    ? playerFallbackArt(name ?? short ?? "x", colors)
    : fallbackArt(name ?? short ?? "x", colors);
  // Para times criados pelo jogador, ~55% vem com um símbolo/logo figurativo
  // e ~45% vem só com o monograma (letras). Decisão determinística pelo nome.
  const playerKey = slug(name ?? short ?? "x") || "x";
  const useSymbol = (hashStr(playerKey + "#psym") % 100) < 55;
  const playerSymbolPool: Symbol[] = ["star","lion","bird","bolt","wing","cross","rooster","anchor","crown","cross-malt","ship","palm","ball","eiffel","fleur","tower","devil","sun","moon","flame","leaf","sword","trident","gem","trophy","gear","mountain","wave","compass","helmet","wolf","dragon","skull","heart-sym"];
  const playerSymbol: Symbol = useSymbol
    ? playerSymbolPool[hashStr(playerKey + "#pick") % playerSymbolPool.length]
    : "none";
  const playerPalette = rawFallback.palette ?? [colors[0], colors[1] ?? "#ffffff"];
  const playerSymbolColor = playerPalette[hashStr(playerKey + "#sc") % playerPalette.length];
  const art: Art = effectiveConfig
    ? {
        pattern: effectiveConfig.pattern,
        palette: [effectiveConfig.primary, effectiveConfig.secondary, effectiveConfig.accent],
        shape: effectiveConfig.shape,
        symbol: effectiveConfig.symbol,
        symbolColor: effectiveConfig.symbolColor,
        monogram: initialsFromName(name, short),
        monogramColor: effectiveConfig.monogramColor,
      }
    : player
    ? {
        ...rawFallback,
        shape: rawFallback.shape ?? "pentagon",
        symbol: playerSymbol,
        symbolColor: playerSymbolColor,
        monogram: initialsFromName(name, short),
        monogramColor: contrastText(playerPalette[0]),
      }
    : explicit ?? rawFallback;

  const palette = art.palette ?? [colors[0], colors[1] ?? colors[0]];
  const pattern: Pattern = art.pattern;
  const finalShape: Shape = (art.shape ?? (
    shape === "circle"  ? "circle"  :
    shape === "diamond" ? "diamond" :
    "shield"
  )) as Shape;
  const id = `cr-${uid}-${slug(name ?? short ?? "x")}`;
  const clipId = `clip-${id}`;
  const monogram = (art.monogram ?? short).slice(0, 4).toUpperCase();
  const monogramColor = art.monogramColor ?? "#ffffff";
  const showMonogram = !art.symbol || art.symbol === "none";

  // --- Contorno automático quando símbolo/texto têm baixo contraste com o fundo ---
  // Usa a primeira cor da paleta (predominante) como referência.
  const bgRef = palette[0] ?? "#000000";
  const symOutline = art.symbol && art.symbol !== "none" ? outlineFor(art.symbolColor ?? "#ffffff", bgRef) : null;
  const monoOutline = outlineFor(monogramColor, bgRef);


  // Viewbox ligeiramente maior pra acomodar a moldura externa sem cortar
  return (
    <svg width={size} height={size} viewBox="-3 -3 70 70" aria-hidden style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={clipId}>
          <path d={shapePath(finalShape)} />
        </clipPath>

        {/* Gloss principal — bisel do topo até a sombra do rodapé */}
        <linearGradient id={`gloss-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.42)" />
          <stop offset="30%"  stopColor="rgba(255,255,255,0.10)" />
          <stop offset="55%"  stopColor="rgba(0,0,0,0.00)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.48)" />
        </linearGradient>

        {/* Realce especular sharp no canto superior esquerdo */}
        <radialGradient id={`spec-${id}`} cx="0.28" cy="0.15" r="0.5">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.75)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Vinheta radial escurecendo as bordas — profundidade */}
        <radialGradient id={`vign-${id}`} cx="0.5" cy="0.5" r="0.72">
          <stop offset="55%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
        </radialGradient>

        {/* Moldura dourada — 5 paradas para efeito metálico refinado */}
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff4c4" />
          <stop offset="22%"  stopColor="#f5d271" />
          <stop offset="48%"  stopColor="#e0a935" />
          <stop offset="72%"  stopColor="#a3721a" />
          <stop offset="100%" stopColor="#5a3d0a" />
        </linearGradient>

        {/* Reflexo diagonal do aro dourado — parece polido */}
        <linearGradient id={`gold-hl-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
          <stop offset="35%"  stopColor="rgba(255,255,255,0.55)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Fill dourado do monograma (quando não há símbolo) */}
        <linearGradient id={`mono-gold-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#fff4c4" />
          <stop offset="50%" stopColor="#f5d271" />
          <stop offset="100%" stopColor="#c78a1b" />
        </linearGradient>

        {/* Textura de fundo — micro-ruído */}
        <pattern id={`grain-${id}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="rgba(0,0,0,0)" />
          <circle cx="1" cy="1" r="0.35" fill="rgba(255,255,255,0.06)" />
          <circle cx="3" cy="3" r="0.35" fill="rgba(0,0,0,0.08)" />
        </pattern>

        {/* Sombra projetada suave sob o escudo */}
        <filter id={`shadow-${id}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" />
          <feOffset dx="0" dy="1.6" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.6" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Drop shadow interno pro símbolo — cria relevo */}
        <filter id={`symsh-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.4" />
          <feOffset dx="0" dy="0.6" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.75" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Contorno automático do símbolo quando contrasta pouco com o fundo */}
        {symOutline && (
          <filter id={`symout-${id}`} x="-25%" y="-25%" width="150%" height="150%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="0.9" result="dil" />
            <feFlood floodColor={symOutline} floodOpacity="0.95" />
            <feComposite in2="dil" operator="in" result="stroke" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.35" result="sh1" />
            <feOffset in="sh1" dx="0" dy="0.5" result="sh2" />
            <feComponentTransfer in="sh2" result="sh3"><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
            <feMerge>
              <feMergeNode in="stroke" />
              <feMergeNode in="sh3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={`url(#shadow-${id})`}>
        {/* Hairline escuro EXTERNO — cravado no fundo */}
        <path d={shapePath(finalShape)} fill="none" stroke="rgba(0,0,0,0.85)" strokeWidth="4.2" strokeLinejoin="round" />

        {/* Aro dourado principal */}
        <path d={shapePath(finalShape)} fill="none" stroke={`url(#gold-${id})`} strokeWidth="3.2" strokeLinejoin="round" />

        {/* Reflexo diagonal cruzando o aro dourado */}
        <path d={shapePath(finalShape)} fill="none" stroke={`url(#gold-hl-${id})`} strokeWidth="3.2" strokeLinejoin="round" opacity="0.9" />

        {/* Padrão clipado dentro do escudo */}
        <g clipPath={`url(#${clipId})`}>
          <PatternFill pattern={pattern} colors={palette} id={id} />

          {/* Textura sutil sobre o padrão */}
          <rect width="64" height="64" fill={`url(#grain-${id})`} />

          {art.symbol && art.symbol !== "none" && (
            <g filter={symOutline ? `url(#symout-${id})` : `url(#symsh-${id})`}>
              <SymbolArt symbol={art.symbol} color={art.symbolColor ?? "#ffffff"} />
            </g>
          )}

          {/* Realce especular sharp topo-esquerdo */}
          <rect width="64" height="64" fill={`url(#spec-${id})`} />

          {/* Gloss vertical (topo claro → base escura) */}
          <rect width="64" height="64" fill={`url(#gloss-${id})`} />

          {/* Vinheta radial escurecendo as bordas — profundidade */}
          <rect width="64" height="64" fill={`url(#vign-${id})`} />

          {/* Hairline claro INTERNO ao aro dourado (bisel superior) */}
          <path d={shapePath(finalShape)} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.7" />
          {/* Hairline escuro INTERNO logo dentro do aro (contra-bisel) */}
          <path d={shapePath(finalShape)} fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.4" opacity="0.55" />
        </g>
      </g>

      {/* Monograma — só quando não há símbolo figurativo */}
      {showMonogram && (() => {
        // Formas que estreitam/entalham no rodapé — sobe o monograma pra não cortar.
        const narrowBottom = finalShape === "banner" || finalShape === "chevron-shield" || finalShape === "flag" || finalShape === "pointed-shield";
        const ty = finalShape === "circle" ? 38 : finalShape === "banner" ? 30 : narrowBottom ? 32 : 40;
        // Se o monograma pediu dourado (cor amarela/ouro), usa gradiente refinado.
        const useGoldFill = /^#(f5d|f1c|fac|ffd|fff4|e0a|d4a)/i.test(monogramColor);
        const finalFill = useGoldFill ? `url(#mono-gold-${id})` : monogramColor;
        // Contorno adaptativo: quando o texto tem baixo contraste com o fundo,
        // engrossa e usa a cor oposta pra garantir legibilidade.
        const needsBoost = monoOutline !== null;
        const strokeCol = needsBoost ? monoOutline! : "rgba(0,0,0,0.75)";
        const strokeW = needsBoost ? 1.6 : 0.7;
        return (
          <>
            {/* Sombra sob o texto para relevo */}
            <text
              x="32" y={ty + 0.6}
              textAnchor="middle"
              fontFamily="Bebas Neue, Oswald, Impact, sans-serif"
              fontSize={monogram.length > 3 ? 12 : 16}
              fontWeight="900"
              fill="rgba(0,0,0,0.55)"
              style={{ letterSpacing: "0.6px" }}
            >{monogram}</text>
            {/* Texto principal com contorno adaptativo — pop premium */}
            <text
              x="32" y={ty}
              textAnchor="middle"
              fontFamily="Bebas Neue, Oswald, Impact, sans-serif"
              fontSize={monogram.length > 3 ? 12 : 16}
              fontWeight="900"
              fill={finalFill}
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinejoin="round"
              paintOrder="stroke"
              style={{ letterSpacing: "0.6px" }}
            >{monogram}</text>
          </>
        );
      })()}
    </svg>
  );

}

