
-- Sincronização automática do arquivo de recordes: toda vez que save_slots
-- é criado ou atualizado, replicamos o snapshot em save_records_archive.
-- Isso elimina falhas silenciosas de sincronização no cliente e garante
-- que o ranking de Recordes reflita o estado atual em tempo real.

CREATE OR REPLACE FUNCTION public.sync_save_records_archive()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.save_records_archive (
    user_id, save_id, display_name, team_name, season, mode,
    score, stats, game_state, created_at, updated_at, archived_at
  ) VALUES (
    NEW.user_id, NEW.id, NEW.display_name, NEW.team_name, NEW.season, NEW.mode,
    NEW.score, NEW.stats, NEW.game_state, NEW.created_at, NEW.updated_at, NULL
  )
  ON CONFLICT (save_id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    display_name = EXCLUDED.display_name,
    team_name = EXCLUDED.team_name,
    season = EXCLUDED.season,
    mode = EXCLUDED.mode,
    score = EXCLUDED.score,
    stats = EXCLUDED.stats,
    game_state = EXCLUDED.game_state,
    updated_at = EXCLUDED.updated_at,
    archived_at = NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_save_records_archive ON public.save_slots;
CREATE TRIGGER trg_sync_save_records_archive
AFTER INSERT OR UPDATE ON public.save_slots
FOR EACH ROW EXECUTE FUNCTION public.sync_save_records_archive();

-- Backfill: puxa os archives que estão defasados em relação ao slot atual.
INSERT INTO public.save_records_archive (
  user_id, save_id, display_name, team_name, season, mode,
  score, stats, game_state, created_at, updated_at, archived_at
)
SELECT s.user_id, s.id, s.display_name, s.team_name, s.season, s.mode,
       s.score, s.stats, s.game_state, s.created_at, s.updated_at, NULL
FROM public.save_slots s
ON CONFLICT (save_id) DO UPDATE SET
  user_id = EXCLUDED.user_id,
  display_name = EXCLUDED.display_name,
  team_name = EXCLUDED.team_name,
  season = EXCLUDED.season,
  mode = EXCLUDED.mode,
  score = EXCLUDED.score,
  stats = EXCLUDED.stats,
  game_state = EXCLUDED.game_state,
  updated_at = EXCLUDED.updated_at,
  archived_at = NULL;
