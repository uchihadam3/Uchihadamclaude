ALTER TABLE public.save_slots DROP CONSTRAINT IF EXISTS save_slots_slot_index_check;
ALTER TABLE public.save_slots ADD CONSTRAINT save_slots_slot_index_check CHECK (slot_index IN (0,1,2,3,4));