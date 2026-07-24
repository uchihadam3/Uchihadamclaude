ALTER TABLE public.save_slots DROP CONSTRAINT IF EXISTS save_slots_mode_check;
ALTER TABLE public.save_slots ADD CONSTRAINT save_slots_mode_check CHECK (mode IN ('casual','classico','hard'));
ALTER TABLE public.save_records_archive DROP CONSTRAINT IF EXISTS save_records_archive_mode_check;
ALTER TABLE public.save_records_archive ADD CONSTRAINT save_records_archive_mode_check CHECK (mode IN ('casual','classico','hard'));