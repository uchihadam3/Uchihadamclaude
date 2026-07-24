ALTER TABLE public.save_slots ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'casual';
UPDATE public.save_slots SET mode = COALESCE(NULLIF(game_state->>'mode',''), 'casual');
ALTER TABLE public.save_slots ADD CONSTRAINT save_slots_mode_check CHECK (mode IN ('casual','classico'));
CREATE INDEX IF NOT EXISTS save_slots_mode_score_idx ON public.save_slots (mode, score DESC);