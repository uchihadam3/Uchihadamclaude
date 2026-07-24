
CREATE TABLE public.coach_progress (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  unlocked JSONB NOT NULL DEFAULT '[]'::jsonb,
  xp_multiplier NUMERIC NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.coach_progress TO authenticated;
GRANT ALL ON public.coach_progress TO service_role;

ALTER TABLE public.coach_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own coach progress"
  ON public.coach_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER coach_progress_updated_at
  BEFORE UPDATE ON public.coach_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
