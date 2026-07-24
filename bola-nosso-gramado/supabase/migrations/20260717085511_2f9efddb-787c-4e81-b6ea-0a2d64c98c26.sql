
CREATE TABLE public.save_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_index INT NOT NULL CHECK (slot_index IN (0, 1, 2)),
  display_name TEXT NOT NULL CHECK (
    length(display_name) BETWEEN 3 AND 20
    AND display_name ~ '^[A-Za-z0-9 _-]+$'
  ),
  team_name TEXT NOT NULL DEFAULT '',
  season INT NOT NULL DEFAULT 1,
  score INT NOT NULL DEFAULT 0,
  stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  game_state JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, slot_index)
);

CREATE UNIQUE INDEX save_slots_display_name_unique_idx
  ON public.save_slots (lower(display_name));

CREATE INDEX save_slots_score_idx ON public.save_slots (score DESC);

GRANT SELECT ON public.save_slots TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.save_slots TO authenticated;
GRANT ALL ON public.save_slots TO service_role;

ALTER TABLE public.save_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view save slots (public ranking)"
  ON public.save_slots FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own save slots"
  ON public.save_slots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own save slots"
  ON public.save_slots FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own save slots"
  ON public.save_slots FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_save_slots_updated_at
  BEFORE UPDATE ON public.save_slots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
