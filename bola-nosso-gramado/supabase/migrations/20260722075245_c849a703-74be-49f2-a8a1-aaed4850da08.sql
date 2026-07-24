ALTER TABLE public.coach_progress
ADD COLUMN IF NOT EXISTS xp_history jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.coach_progress.xp_history IS 'Permanent coach XP history rows: season/team/save/xp/reasons, preserved after save reset/delete.';