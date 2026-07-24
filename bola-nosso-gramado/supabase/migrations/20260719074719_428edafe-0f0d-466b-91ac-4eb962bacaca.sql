
-- Tabela de eventos de títulos acumulados por conta (persistem após deleção de save)
CREATE TABLE public.user_title_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  save_id UUID,
  season INTEGER NOT NULL,
  competition TEXT NOT NULL CHECK (competition IN ('brasileirao','libertadores','sulamericana','mundial')),
  place SMALLINT NOT NULL CHECK (place BETWEEN 1 AND 3),
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, save_id, season, competition)
);

CREATE INDEX user_title_events_user_idx ON public.user_title_events (user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_title_events TO authenticated;
GRANT ALL ON public.user_title_events TO service_role;

ALTER TABLE public.user_title_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own title events"
  ON public.user_title_events
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Sync idempotente: recebe um array [{save_id, season, competition, place}]
CREATE OR REPLACE FUNCTION public.sync_title_events(p_events JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user UUID := auth.uid();
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  INSERT INTO public.user_title_events (user_id, save_id, season, competition, place)
  SELECT
    v_user,
    NULLIF((e->>'save_id'), '')::UUID,
    (e->>'season')::INTEGER,
    e->>'competition',
    (e->>'place')::SMALLINT
  FROM JSONB_ARRAY_ELEMENTS(COALESCE(p_events, '[]'::JSONB)) e
  ON CONFLICT (user_id, save_id, season, competition)
  DO UPDATE SET
    place = LEAST(EXCLUDED.place, public.user_title_events.place),
    awarded_at = now();
END;
$$;

REVOKE ALL ON FUNCTION public.sync_title_events(JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sync_title_events(JSONB) TO authenticated;

-- Ranking agregado por conta com pesos por título
CREATE OR REPLACE FUNCTION public.get_account_ranking(p_limit INTEGER DEFAULT 200)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  total_score BIGINT,
  mundial_1 INTEGER, mundial_2 INTEGER, mundial_3 INTEGER,
  libertadores_1 INTEGER, libertadores_2 INTEGER, libertadores_3 INTEGER,
  brasileirao_1 INTEGER, brasileirao_2 INTEGER, brasileirao_3 INTEGER,
  sulamericana_1 INTEGER, sulamericana_2 INTEGER, sulamericana_3 INTEGER
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH counts AS (
    SELECT
      e.user_id,
      COUNT(*) FILTER (WHERE competition='mundial'      AND place=1)::INTEGER AS m1,
      COUNT(*) FILTER (WHERE competition='mundial'      AND place=2)::INTEGER AS m2,
      COUNT(*) FILTER (WHERE competition='mundial'      AND place=3)::INTEGER AS m3,
      COUNT(*) FILTER (WHERE competition='libertadores' AND place=1)::INTEGER AS l1,
      COUNT(*) FILTER (WHERE competition='libertadores' AND place=2)::INTEGER AS l2,
      COUNT(*) FILTER (WHERE competition='libertadores' AND place=3)::INTEGER AS l3,
      COUNT(*) FILTER (WHERE competition='brasileirao'  AND place=1)::INTEGER AS b1,
      COUNT(*) FILTER (WHERE competition='brasileirao'  AND place=2)::INTEGER AS b2,
      COUNT(*) FILTER (WHERE competition='brasileirao'  AND place=3)::INTEGER AS b3,
      COUNT(*) FILTER (WHERE competition='sulamericana' AND place=1)::INTEGER AS s1,
      COUNT(*) FILTER (WHERE competition='sulamericana' AND place=2)::INTEGER AS s2,
      COUNT(*) FILTER (WHERE competition='sulamericana' AND place=3)::INTEGER AS s3
    FROM public.user_title_events e
    GROUP BY e.user_id
  )
  SELECT
    p.id AS user_id,
    p.username,
    (
      COALESCE(c.m1,0)*1000 + COALESCE(c.m2,0)*500 + COALESCE(c.m3,0)*250 +
      COALESCE(c.l1,0)*800  + COALESCE(c.l2,0)*400 + COALESCE(c.l3,0)*200 +
      COALESCE(c.b1,0)*700  + COALESCE(c.b2,0)*350 + COALESCE(c.b3,0)*175 +
      COALESCE(c.s1,0)*600  + COALESCE(c.s2,0)*300 + COALESCE(c.s3,0)*150
    )::BIGINT AS total_score,
    COALESCE(c.m1,0), COALESCE(c.m2,0), COALESCE(c.m3,0),
    COALESCE(c.l1,0), COALESCE(c.l2,0), COALESCE(c.l3,0),
    COALESCE(c.b1,0), COALESCE(c.b2,0), COALESCE(c.b3,0),
    COALESCE(c.s1,0), COALESCE(c.s2,0), COALESCE(c.s3,0)
  FROM public.profiles p
  LEFT JOIN counts c ON c.user_id = p.id
  WHERE c.user_id IS NOT NULL
  ORDER BY total_score DESC, p.username ASC
  LIMIT GREATEST(COALESCE(p_limit, 200), 1);
$$;

REVOKE ALL ON FUNCTION public.get_account_ranking(INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_account_ranking(INTEGER) TO anon, authenticated;
