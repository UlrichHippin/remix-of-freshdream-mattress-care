
-- Default setup code; owner can change later. Keep secret.
CREATE OR REPLACE FUNCTION public.claim_owner_role(_setup_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _has_owner boolean;
  _expected text := 'FRESHDREAM-SETUP-2026';
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated';
  END IF;

  SELECT EXISTS(SELECT 1 FROM public.staff_members WHERE role = 'owner') INTO _has_owner;

  -- If an owner already exists, require the setup code
  IF _has_owner AND _setup_code IS DISTINCT FROM _expected THEN
    RAISE EXCEPTION 'Invalid setup code';
  END IF;

  -- If no owner yet, also require the setup code (avoid drive-by takeover)
  IF NOT _has_owner AND _setup_code IS DISTINCT FROM _expected THEN
    RAISE EXCEPTION 'Invalid setup code';
  END IF;

  INSERT INTO public.staff_members(user_id, role)
  VALUES (_uid, 'owner')
  ON CONFLICT (user_id) DO UPDATE SET role = 'owner';

  RETURN true;
END;
$$;

-- staff_members may not have a unique constraint on user_id; ensure it
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'staff_members_user_id_key'
  ) THEN
    ALTER TABLE public.staff_members ADD CONSTRAINT staff_members_user_id_key UNIQUE (user_id);
  END IF;
END $$;
