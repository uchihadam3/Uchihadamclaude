
CREATE TABLE public.save_records_archive (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  save_id UUID UNIQUE,
  display_name TEXT NOT NULL,
  team_name TEXT NOT NULL DEFAULT '',
  season INTEGER NOT NULL DEFAULT 1,
  mode TEXT NOT NULL DEFAULT 'casual',
  score INTEGER NOT NULL DEFAULT 0,
  stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  game_state JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  archived_at TIMESTAMP WITH TIME ZONE
);

GRANT SELECT ON public.save_records_archive TO anon;
GRANT SELECT, INSERT, UPDATE ON public.save_records_archive TO authenticated;
GRANT ALL ON public.save_records_archive TO service_role;

ALTER TABLE public.save_records_archive ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Records are publicly viewable"
  ON public.save_records_archive FOR SELECT
  USING (true);

CREATE POLICY "Users insert own records"
  ON public.save_records_archive FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own records"
  ON public.save_records_archive FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_save_records_archive_user ON public.save_records_archive(user_id);
CREATE INDEX idx_save_records_archive_score ON public.save_records_archive(score DESC);

-- Backfill dos saves atuais.
INSERT INTO public.save_records_archive (user_id, save_id, display_name, team_name, season, mode, score, stats, game_state, created_at, updated_at)
SELECT user_id, id, display_name, team_name, season, mode, score, stats, game_state, created_at, updated_at
FROM public.save_slots
ON CONFLICT (save_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.get_records_ranking(p_limit INTEGER DEFAULT 500)
RETURNS TABLE(
  id UUID,
  display_name TEXT,
  username TEXT,
  team_name TEXT,
  season INTEGER,
  score INTEGER,
  mode TEXT,
  stats JSONB,
  game_state JSONB,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.id, a.display_name, p.username, a.team_name, a.season, a.score, a.mode,
         a.stats, a.game_state, a.updated_at, a.created_at
  FROM public.save_records_archive a
  LEFT JOIN public.profiles p ON p.id = a.user_id
  ORDER BY a.score DESC, a.updated_at ASC
  LIMIT GREATEST(COALESCE(p_limit, 500), 1);
$$;

REVOKE ALL ON FUNCTION public.get_records_ranking(INTEGER) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_records_ranking(INTEGER) TO authenticated, service_role;
