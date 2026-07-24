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
      COALESCE(c.m1,0)*40 + COALESCE(c.m2,0)*18 + COALESCE(c.m3,0)*7 +
      COALESCE(c.l1,0)*32 + COALESCE(c.l2,0)*14 + COALESCE(c.l3,0)*5 +
      COALESCE(c.b1,0)*26 + COALESCE(c.b2,0)*11 + COALESCE(c.b3,0)*4 +
      COALESCE(c.s1,0)*22 + COALESCE(c.s2,0)*9  + COALESCE(c.s3,0)*3
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