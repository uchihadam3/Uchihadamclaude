
-- profiles table with unique username
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT username_length CHECK (char_length(username) BETWEEN 3 AND 20),
  CONSTRAINT username_charset CHECK (username ~ '^[A-Za-z0-9 _-]{3,20}$')
);

GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE UNIQUE INDEX profiles_username_lower_idx ON public.profiles (lower(username));

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.is_username_taken(p_name TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE lower(username) = lower(trim(p_name))
  );
$$;

-- Replace ranking RPC to include username
DROP FUNCTION IF EXISTS public.get_public_ranking(text, integer);
CREATE OR REPLACE FUNCTION public.get_public_ranking(p_mode TEXT DEFAULT NULL, p_limit INTEGER DEFAULT 500)
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
  updated_at TIMESTAMPTZ
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT s.id, s.display_name, p.username, s.team_name, s.season, s.score, s.mode,
         s.stats, s.game_state, s.updated_at
  FROM public.save_slots s
  LEFT JOIN public.profiles p ON p.id = s.user_id
  WHERE p_mode IS NULL OR s.mode = p_mode
  ORDER BY s.score DESC, s.updated_at ASC
  LIMIT GREATEST(COALESCE(p_limit, 500), 1);
$$;

-- Aggregated ranking per user (sum of all their slots)
CREATE OR REPLACE FUNCTION public.get_user_ranking(p_limit INTEGER DEFAULT 200)
RETURNS TABLE(
  user_id UUID,
  username TEXT,
  total_score BIGINT,
  slot_count INTEGER,
  best_score INTEGER,
  slots JSONB
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    p.id AS user_id,
    p.username,
    COALESCE(SUM(s.score), 0)::BIGINT AS total_score,
    COUNT(s.id)::INTEGER AS slot_count,
    COALESCE(MAX(s.score), 0)::INTEGER AS best_score,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'display_name', s.display_name,
          'team_name', s.team_name,
          'score', s.score,
          'mode', s.mode,
          'season', s.season,
          'stats', s.stats
        ) ORDER BY s.score DESC
      ) FILTER (WHERE s.id IS NOT NULL),
      '[]'::jsonb
    ) AS slots
  FROM public.profiles p
  LEFT JOIN public.save_slots s ON s.user_id = p.id
  GROUP BY p.id, p.username
  HAVING COUNT(s.id) > 0
  ORDER BY total_score DESC, p.username ASC
  LIMIT GREATEST(COALESCE(p_limit, 200), 1);
$$;

GRANT EXECUTE ON FUNCTION public.is_username_taken(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_ranking(TEXT, INTEGER) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_ranking(INTEGER) TO anon, authenticated;
