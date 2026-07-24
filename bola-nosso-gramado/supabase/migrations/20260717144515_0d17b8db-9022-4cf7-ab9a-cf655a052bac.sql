-- Drop the SECURITY DEFINER view flagged by the linter.
DROP VIEW IF EXISTS public.public_ranking;

-- Expose the public ranking via a SECURITY DEFINER function. The function
-- returns only the leaderboard-safe columns (no user_id), and runs with
-- owner privileges so it can read the base table while the base table's
-- SELECT policy remains owner-only.
CREATE OR REPLACE FUNCTION public.get_public_ranking(
  p_mode text DEFAULT NULL,
  p_limit int DEFAULT 500
)
RETURNS TABLE (
  id uuid,
  display_name text,
  team_name text,
  season int,
  score int,
  mode text,
  stats jsonb,
  game_state jsonb,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.id, s.display_name, s.team_name, s.season, s.score, s.mode,
         s.stats, s.game_state, s.updated_at
  FROM public.save_slots s
  WHERE p_mode IS NULL OR s.mode = p_mode
  ORDER BY s.score DESC, s.updated_at ASC
  LIMIT GREATEST(COALESCE(p_limit, 500), 1);
$$;

GRANT EXECUTE ON FUNCTION public.get_public_ranking(text, int) TO anon, authenticated;

-- Also expose a name-availability check without leaking rows to anon.
CREATE OR REPLACE FUNCTION public.is_display_name_taken(p_name text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.save_slots
    WHERE lower(display_name) = lower(trim(p_name))
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_display_name_taken(text) TO anon, authenticated;