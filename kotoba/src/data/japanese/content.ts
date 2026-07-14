import { loadContent } from './schema';

/* Conteúdo japonês introdutório (início do N5): elementos, cores,
   números, natureza, corpo, verbos e alguns kanji-base. Vinculado às
   cartas por id. Áudio: TTS do navegador como fallback (ver audio.ts). */
const RAW = [
  // --- elementos (núcleo do combate) ---
  { id: 'k-fire', type: 'kanji', japanese: '火', reading: 'ひ / か', meaningPtBr: 'fogo', meaningEn: 'fire', element: 'fire', tags: ['elemento', 'natureza'], exampleSentence: '火が つよい。', exampleReading: 'ひが つよい。', exampleTranslationPtBr: 'O fogo é forte.', exampleTranslationEn: 'The fire is strong.' },
  { id: 'k-water', type: 'kanji', japanese: '水', reading: 'みず', meaningPtBr: 'água', meaningEn: 'water', element: 'water', tags: ['elemento', 'natureza'], exampleSentence: '水を のむ。', exampleReading: 'みずを のむ。', exampleTranslationPtBr: 'Beber água.', exampleTranslationEn: 'To drink water.' },
  { id: 'k-wind', type: 'kanji', japanese: '風', reading: 'かぜ', meaningPtBr: 'vento', meaningEn: 'wind', element: 'wind', tags: ['elemento', 'natureza'] },
  { id: 'k-tree', type: 'kanji', japanese: '木', reading: 'き', meaningPtBr: 'árvore', meaningEn: 'tree', element: 'wood', tags: ['elemento', 'natureza'] },
  { id: 'k-light', type: 'kanji', japanese: '光', reading: 'ひかり', meaningPtBr: 'luz', meaningEn: 'light', element: 'light', tags: ['elemento'] },
  { id: 'k-dark', type: 'kanji', japanese: '闇', reading: 'やみ', meaningPtBr: 'escuridão', meaningEn: 'darkness', element: 'dark', tags: ['elemento'] },
  // --- kanji de combate ---
  { id: 'k-power', type: 'kanji', japanese: '力', reading: 'ちから', meaningPtBr: 'força', meaningEn: 'power', tags: ['combate'] },
  { id: 'k-guard', type: 'kanji', japanese: '守', reading: 'まも(る)', meaningPtBr: 'proteger', meaningEn: 'to protect', tags: ['combate'] },
  { id: 'k-heart', type: 'kanji', japanese: '心', reading: 'こころ', meaningPtBr: 'coração', meaningEn: 'heart', tags: ['combate', 'corpo'] },
  { id: 'k-sword', type: 'kanji', japanese: '剣', reading: 'けん', meaningPtBr: 'espada', meaningEn: 'sword', tags: ['combate'] },
  { id: 'k-fast', type: 'kanji', japanese: '速', reading: 'はや(い)', meaningPtBr: 'rápido', meaningEn: 'fast', tags: ['combate'] },
  { id: 'k-big', type: 'kanji', japanese: '大', reading: 'おお(きい)', meaningPtBr: 'grande', meaningEn: 'big', tags: ['tamanho'] },
  { id: 'k-mountain', type: 'kanji', japanese: '山', reading: 'やま', meaningPtBr: 'montanha', meaningEn: 'mountain', tags: ['natureza'] },
  { id: 'k-heal', type: 'kanji', japanese: '癒', reading: 'いや(す)', meaningPtBr: 'curar', meaningEn: 'to heal', tags: ['combate'] },
  { id: 'k-poison', type: 'kanji', japanese: '毒', reading: 'どく', meaningPtBr: 'veneno', meaningEn: 'poison', tags: ['combate'] },
  // --- cores ---
  { id: 'v-red', type: 'vocabulary', japanese: '赤', reading: 'あか', meaningPtBr: 'vermelho', meaningEn: 'red', tags: ['cor'] },
  { id: 'v-blue', type: 'vocabulary', japanese: '青', reading: 'あお', meaningPtBr: 'azul', meaningEn: 'blue', tags: ['cor'] },
  { id: 'v-white', type: 'vocabulary', japanese: '白', reading: 'しろ', meaningPtBr: 'branco', meaningEn: 'white', tags: ['cor'] },
  // --- animais / natureza ---
  { id: 'v-deer', type: 'vocabulary', japanese: '鹿', reading: 'しか', meaningPtBr: 'cervo', meaningEn: 'deer', tags: ['animal'] },
  { id: 'v-bird', type: 'vocabulary', japanese: '鳥', reading: 'とり', meaningPtBr: 'pássaro', meaningEn: 'bird', tags: ['animal'] },
  { id: 'v-flower', type: 'vocabulary', japanese: '花', reading: 'はな', meaningPtBr: 'flor', meaningEn: 'flower', tags: ['natureza'] },
  { id: 'v-stone', type: 'vocabulary', japanese: '石', reading: 'いし', meaningPtBr: 'pedra', meaningEn: 'stone', tags: ['natureza'] },
  // --- números ---
  { id: 'n-1', type: 'vocabulary', japanese: '一', reading: 'いち', meaningPtBr: 'um', meaningEn: 'one', tags: ['numero'] },
  { id: 'n-2', type: 'vocabulary', japanese: '二', reading: 'に', meaningPtBr: 'dois', meaningEn: 'two', tags: ['numero'] },
  { id: 'n-3', type: 'vocabulary', japanese: '三', reading: 'さん', meaningPtBr: 'três', meaningEn: 'three', tags: ['numero'] },
  // --- hiragana base ---
  { id: 'h-a', type: 'kana', japanese: 'あ', reading: 'a', meaningPtBr: 'hiragana “a”', meaningEn: 'hiragana "a"', tags: ['hiragana'] },
  { id: 'h-ka', type: 'kana', japanese: 'か', reading: 'ka', meaningPtBr: 'hiragana “ka”', meaningEn: 'hiragana "ka"', tags: ['hiragana'] },
  { id: 'h-mi', type: 'kana', japanese: 'み', reading: 'mi', meaningPtBr: 'hiragana “mi”', meaningEn: 'hiragana "mi"', tags: ['hiragana'] },
  // --- verbo base ---
  { id: 'v-cut', type: 'vocabulary', japanese: '切る', reading: 'きる', meaningPtBr: 'cortar', meaningEn: 'to cut', tags: ['verbo', 'combate'] },
  { id: 'v-see', type: 'vocabulary', japanese: '見る', reading: 'みる', meaningPtBr: 'ver', meaningEn: 'to see', tags: ['verbo'] },
];

export const JAPANESE_CONTENT = loadContent(RAW);
export const CONTENT_BY_ID = new Map(JAPANESE_CONTENT.map((c) => [c.id, c]));
