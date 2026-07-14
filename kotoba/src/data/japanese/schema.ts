import { z } from 'zod';

/* validação de todo conteúdo japonês. Registro inválido é ignorado,
   nunca quebra o jogo (ver loadContent). */
export const JapaneseContentSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['kana', 'vocabulary', 'kanji', 'grammar', 'sentence']),
  japanese: z.string().min(1),
  reading: z.string().default(''),
  meaningPtBr: z.string().min(1),
  meaningEn: z.string().min(1),
  jlptLevel: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']).default('N5'),
  tags: z.array(z.string()).default([]),
  element: z.enum(['fire', 'water', 'wind', 'wood', 'light', 'dark']).optional(),
  exampleSentence: z.string().optional(),
  exampleReading: z.string().optional(),
  exampleTranslationPtBr: z.string().optional(),
  exampleTranslationEn: z.string().optional(),
  audioFile: z.string().optional(),
});
export type JapaneseContent = z.infer<typeof JapaneseContentSchema>;

/** valida uma lista; descarta inválidos e registra aviso (dev) */
export function loadContent(raw: unknown[]): JapaneseContent[] {
  const out: JapaneseContent[] = [];
  for (const r of raw) {
    const parsed = JapaneseContentSchema.safeParse(r);
    if (parsed.success) out.push(parsed.data);
    else if (import.meta.env?.DEV) console.warn('[kotoba] conteúdo japonês inválido, ignorado:', parsed.error.issues[0]?.message, r);
  }
  return out;
}
