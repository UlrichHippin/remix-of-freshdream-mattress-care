
-- 1) Stop broadcasting bookings via Realtime (admin uses polling)
ALTER PUBLICATION supabase_realtime DROP TABLE public.bookings;

-- 2) Restrict blocked_periods reads to staff (internal reason field)
DROP POLICY IF EXISTS "Anyone reads blocks" ON public.blocked_periods;
CREATE POLICY "Staff read blocks"
  ON public.blocked_periods
  FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

-- 3) Harden claim_owner_role: lock once an owner exists, regardless of code
CREATE OR REPLACE FUNCTION public.claim_owner_role(_setup_code text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _uid uuid := auth.uid();
  _has_owner boolean;
  _expected text := 'FRESHDREAM-SETUP-2026';
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated';
  END IF;

  SELECT EXISTS(SELECT 1 FROM public.staff_members WHERE role = 'owner') INTO _has_owner;

  -- Once an owner exists, the bootstrap RPC is permanently disabled.
  IF _has_owner THEN
    RAISE EXCEPTION 'Owner already configured. Bootstrap RPC is disabled.';
  END IF;

  IF _setup_code IS DISTINCT FROM _expected THEN
    RAISE EXCEPTION 'Invalid setup code';
  END IF;

  INSERT INTO public.staff_members(user_id, role)
  VALUES (_uid, 'owner')
  ON CONFLICT (user_id) DO UPDATE SET role = 'owner';

  RETURN true;
END;
$function$;

-- 4) Lock down SECURITY DEFINER helpers: revoke EXECUTE from anon/authenticated.
--    They are used internally by RLS policies and SECURITY DEFINER functions,
--    which bypass these grants; no client should call them directly.
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.is_operator(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.get_busy_slots(timestamptz, timestamptz) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.next_booking_reference(date) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_booking_change() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.protect_booking_immutable_fields() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.enforce_operator_update_scope() FROM anon, authenticated, public;

-- Keep the two RPCs that are intentionally callable from the client:
GRANT EXECUTE ON FUNCTION public.create_booking_request(text, text, text, text, text, text, text, text, timestamptz, timestamptz) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_owner_role(text) TO authenticated;
