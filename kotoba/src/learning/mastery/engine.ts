/* ============================================================
   KOTOBA — motor de aprendizado (invisível). O combate só recebe
   um MasteryResult abstrato. FSRS decide quando um Eco reaparece.
   Nada de "estudo": tudo é apresentado como ressonância de Ecos.
   ============================================================ */
import { fsrs, generatorParameters, createEmptyCard, Rating, type Card, type FSRS } from 'ts-fsrs';
import type { MasteryResult } from '../../game/combat/types';
import { JAPANESE_CONTENT, CONTENT_BY_ID } from '../../data/japanese/content';
import type { JapaneseContent } from '../../data/japanese/schema';

export type EcoState = 'fraco' | 'desperto' | 'estavel' | 'ressonante' | 'perfeito';
export const ECO_LABEL: Record<EcoState, string> = {
  fraco: 'Eco fraco', desperto: 'Eco desperto', estavel: 'Eco estável',
  ressonante: 'Eco ressonante', perfeito: 'Eco perfeito',
};

export interface ContentProgress {
  card: Card;
  seen: number;
  correct: number;
  lastResult: MasteryResult;
}

export interface Challenge {
  id: string;
  contentId: string;
  content: JapaneseContent;
  context: 'card_bonus' | 'altar' | 'event';
  prompt: string;              // "Qual o significado?"
  options: { label: string; correct: boolean }[];
  timeMs: number;              // janela sugerida
}

export interface AnswerInput {
  challengeId: string;
  submittedIndex: number;      // -1 = tempo esgotado
  responseTimeMs: number;
  hintsUsed: number;
}

export interface AnswerResult {
  result: MasteryResult;
  correct: boolean;
  content: JapaneseContent;
  ecoState: EcoState;
  firstDiscovery: boolean;
}

let lang: 'pt' | 'en' = 'pt';
export function setLearningLang(l: 'pt' | 'en') { lang = l; }
const meaningOf = (c: JapaneseContent) => (lang === 'pt' ? c.meaningPtBr : c.meaningEn);

export class LearningEngine {
  private f: FSRS;
  private progress = new Map<string, ContentProgress>();
  private challenges = new Map<string, Challenge>();
  private seq = 0;

  constructor() {
    this.f = fsrs(generatorParameters({ enable_fuzz: false }));
  }

  /* ---- persistência leve (serializável p/ Dexie/localStorage depois) ---- */
  export(): Record<string, ContentProgress> {
    return Object.fromEntries(this.progress);
  }
  import(data: Record<string, ContentProgress>): void {
    this.progress = new Map(Object.entries(data ?? {}).map(([k, v]) => [k, { ...v, card: reviveCard(v.card) }]));
  }

  private prog(id: string): ContentProgress {
    let p = this.progress.get(id);
    if (!p) { p = { card: createEmptyCard(new Date()), seen: 0, correct: 0, lastResult: 'none' }; this.progress.set(id, p); }
    return p;
  }

  ecoState(id: string): EcoState {
    const p = this.progress.get(id);
    if (!p || p.seen === 0) return 'fraco';
    const s = p.card.stability;
    if (s < 1.5) return 'desperto';
    if (s < 6) return 'estavel';
    if (s < 20) return 'ressonante';
    return 'perfeito';
  }
  isNew(id: string): boolean { return (this.progress.get(id)?.seen ?? 0) === 0; }

  /* ---- seleção adaptativa 50% revisão / 30% consolidação / 20% novo ---- */
  pickContent(pool: string[]): string {
    const now = Date.now();
    const due: string[] = [], learning: string[] = [], fresh: string[] = [];
    for (const id of pool) {
      const p = this.progress.get(id);
      if (!p || p.seen === 0) fresh.push(id);
      else if (p.card.due.getTime() <= now) due.push(id);
      else learning.push(id);
    }
    const r = Math.random();
    const from = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    if (r < 0.5 && due.length) return from(due);
    if (r < 0.8 && learning.length) return from(learning);
    if (fresh.length) return from(fresh);
    return from(due.length ? due : learning.length ? learning : pool);
  }

  /* ---- criação de desafio contextual (rápido: 1–4s) ---- */
  createContextualChallenge(args: { contentId: string; context: Challenge['context']; difficulty?: number }): Challenge {
    const content = CONTENT_BY_ID.get(args.contentId)!;
    const askMeaning = Math.random() < 0.72 || this.isNew(args.contentId);
    // distratores de conteúdos diferentes (preferindo tags parecidas)
    const others = JAPANESE_CONTENT.filter((c) => c.id !== content.id);
    const sameTag = others.filter((c) => c.tags.some((t) => content.tags.includes(t)));
    const pool = shuffle(sameTag.length >= 3 ? sameTag : others);
    const distract = pool.slice(0, 3);
    const opts = askMeaning
      ? [{ label: meaningOf(content), correct: true }, ...distract.map((c) => ({ label: meaningOf(c), correct: false }))]
      : [{ label: content.japanese, correct: true }, ...distract.map((c) => ({ label: c.japanese, correct: false }))];
    const challenge: Challenge = {
      id: 'ch' + (++this.seq),
      contentId: content.id, content, context: args.context,
      prompt: askMeaning ? 'Qual o significado?' : 'Qual símbolo é este?',
      options: shuffle(opts),
      timeMs: args.context === 'card_bonus' ? 4200 : 8000,
    };
    this.challenges.set(challenge.id, challenge);
    return challenge;
  }

  /* ---- avaliação → MasteryResult + agendamento FSRS ---- */
  evaluateAnswer(input: AnswerInput): AnswerResult {
    const ch = this.challenges.get(input.challengeId);
    if (!ch) throw new Error('challenge inexistente: ' + input.challengeId);
    this.challenges.delete(input.challengeId);
    const content = ch.content;
    const p = this.prog(content.id);
    const firstDiscovery = p.seen === 0;
    p.seen++;

    const correct = input.submittedIndex >= 0 && !!ch.options[input.submittedIndex]?.correct;
    let result: MasteryResult;
    if (!correct) result = 'failed';
    else {
      p.correct++;
      const fast = input.responseTimeMs > 0 && input.responseTimeMs < 1700;
      const slow = input.responseTimeMs > ch.timeMs * 0.8;
      if (input.hintsUsed > 0 || slow) result = 'partial';
      else if (fast && p.correct >= 2) result = 'fluent';
      else result = 'correct';
    }
    p.lastResult = result;

    const rating = result === 'failed' ? Rating.Again : result === 'partial' ? Rating.Hard
      : result === 'fluent' ? Rating.Easy : Rating.Good;
    p.card = this.f.repeat(p.card, new Date())[rating].card;

    return { result, correct, content, ecoState: this.ecoState(content.id), firstDiscovery };
  }

  stats() {
    let discovered = 0, mastered = 0;
    for (const [id, p] of this.progress) { if (p.seen > 0) discovered++; if (this.ecoState(id) === 'perfeito') mastered++; }
    return { discovered, mastered, total: JAPANESE_CONTENT.length };
  }
}

function shuffle<T>(a: T[]): T[] { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function reviveCard(c: Card): Card { return { ...c, due: new Date(c.due), last_review: c.last_review ? new Date(c.last_review) : undefined } as Card; }
