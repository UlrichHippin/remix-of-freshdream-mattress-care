
-- 1) New staff role enum and table
DO $$ BEGIN
  CREATE TYPE public.staff_role AS ENUM ('owner', 'operator');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.staff_members (
  user_id uuid PRIMARY KEY,
  role public.staff_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

-- 2) Helper functions
CREATE OR REPLACE FUNCTION public.is_owner(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.staff_members WHERE user_id = _uid AND role = 'owner');
$$;

CREATE OR REPLACE FUNCTION public.is_operator(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.staff_members WHERE user_id = _uid AND role = 'operator');
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.staff_members WHERE user_id = _uid);
$$;

-- 3) Seed: every current admin becomes an owner
INSERT INTO public.staff_members (user_id, role)
SELECT DISTINCT user_id, 'owner'::public.staff_role
FROM public.user_roles WHERE role = 'admin'
ON CONFLICT (user_id) DO NOTHING;

-- 4) staff_members policies
DROP POLICY IF EXISTS "Owners manage staff" ON public.staff_members;
CREATE POLICY "Owners manage staff" ON public.staff_members
  FOR ALL TO authenticated
  USING (public.is_owner(auth.uid()))
  WITH CHECK (public.is_owner(auth.uid()));

DROP POLICY IF EXISTS "Staff read own membership" ON public.staff_members;
CREATE POLICY "Staff read own membership" ON public.staff_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 5) Restrict user_roles management to owners only
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners manage user roles" ON public.user_roles;
CREATE POLICY "Owners manage user roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.is_owner(auth.uid()))
  WITH CHECK (public.is_owner(auth.uid()));

-- 6) Bookings: staff (owner+operator) read & update; nobody deletes
DROP POLICY IF EXISTS "Admins read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "Staff read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Staff update bookings" ON public.bookings;

CREATE POLICY "Staff read bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

-- 7) Audit log: staff can read; no client writes/deletes
DROP POLICY IF EXISTS "Admins read audit log" ON public.audit_log;
DROP POLICY IF EXISTS "Staff read audit log" ON public.audit_log;
CREATE POLICY "Staff read audit log" ON public.audit_log
  FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

-- 8) Blocked periods, availability rules, booking settings: owner manages
DROP POLICY IF EXISTS "Admins manage blocks" ON public.blocked_periods;
DROP POLICY IF EXISTS "Owners manage blocks" ON public.blocked_periods;
CREATE POLICY "Owners manage blocks" ON public.blocked_periods
  FOR ALL TO authenticated
  USING (public.is_owner(auth.uid()))
  WITH CHECK (public.is_owner(auth.uid()));

DROP POLICY IF EXISTS "Admins manage availability" ON public.availability_rules;
DROP POLICY IF EXISTS "Owners manage availability" ON public.availability_rules;
CREATE POLICY "Owners manage availability" ON public.availability_rules
  FOR ALL TO authenticated
  USING (public.is_owner(auth.uid()))
  WITH CHECK (public.is_owner(auth.uid()));

DROP POLICY IF EXISTS "Admins manage settings" ON public.booking_settings;
DROP POLICY IF EXISTS "Owners manage settings" ON public.booking_settings;
CREATE POLICY "Owners manage settings" ON public.booking_settings
  FOR ALL TO authenticated
  USING (public.is_owner(auth.uid()))
  WITH CHECK (public.is_owner(auth.uid()));

-- 9) Protect booking_reference and created_at from operator edits
CREATE OR REPLACE FUNCTION public.protect_booking_immutable_fields()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.booking_reference IS DISTINCT FROM OLD.booking_reference
     AND NOT public.is_owner(auth.uid()) THEN
    RAISE EXCEPTION 'Only the owner can change booking_reference';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at
     AND NOT public.is_owner(auth.uid()) THEN
    RAISE EXCEPTION 'created_at is immutable';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_booking_immutable ON public.bookings;
CREATE TRIGGER protect_booking_immutable
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.protect_booking_immutable_fields();

-- 10) Ensure audit logging trigger is attached
DROP TRIGGER IF EXISTS log_booking_change_trigger ON public.bookings;
CREATE TRIGGER log_booking_change_trigger
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.log_booking_change();
