
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_key TEXT NOT NULL,
  style TEXT NOT NULL,
  formation TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('best','worst')),
  save_id UUID,
  team_name TEXT,
  season INTEGER,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_key)
);

GRANT SELECT ON public.user_badges TO anon;
GRANT SELECT, INSERT, DELETE ON public.user_badges TO authenticated;
GRANT ALL ON public.user_badges TO service_role;

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges são públicos" ON public.user_badges
  FOR SELECT USING (true);
CREATE POLICY "Usuário insere própria medalha" ON public.user_badges
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuário apaga própria medalha" ON public.user_badges
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX user_badges_user_idx ON public.user_badges(user_id);

CREATE OR REPLACE FUNCTION public.get_badge_ranking(p_limit INTEGER DEFAULT 200)
RETURNS TABLE(user_id UUID, username TEXT, badge_count INTEGER, badges JSONB)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id AS user_id,
    p.username,
    COUNT(b.id)::INTEGER AS badge_count,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'badge_key', b.badge_key,
          'style', b.style,
          'formation', b.formation,
          'kind', b.kind,
          'team_name', b.team_name,
          'season', b.season,
          'unlocked_at', b.unlocked_at
        ) ORDER BY b.unlocked_at
      ) FILTER (WHERE b.id IS NOT NULL),
      '[]'::jsonb
    ) AS badges
  FROM public.profiles p
  LEFT JOIN public.user_badges b ON b.user_id = p.id
  GROUP BY p.id, p.username
  HAVING COUNT(b.id) > 0
  ORDER BY COUNT(b.id) DESC, p.username ASC
  LIMIT GREATEST(COALESCE(p_limit, 200), 1);
$$;

CREATE OR REPLACE FUNCTION public.get_user_badges_by_username(p_username TEXT)
RETURNS TABLE(badge_key TEXT, style TEXT, formation TEXT, kind TEXT, team_name TEXT, season INTEGER, unlocked_at TIMESTAMP WITH TIME ZONE)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.badge_key, b.style, b.formation, b.kind, b.team_name, b.season, b.unlocked_at
  FROM public.user_badges b
  JOIN public.profiles p ON p.id = b.user_id
  WHERE lower(p.username) = lower(trim(p_username))
  ORDER BY b.unlocked_at;
$$;
