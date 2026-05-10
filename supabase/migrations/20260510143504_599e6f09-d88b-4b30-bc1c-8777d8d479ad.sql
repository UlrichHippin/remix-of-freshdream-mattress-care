
-- 1. Payment status enum
DO $$ BEGIN
  CREATE TYPE public.payment_status AS ENUM ('unpaid','deposit_paid','paid','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Extend bookings table
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS booking_reference text UNIQUE,
  ADD COLUMN IF NOT EXISTS payment_method text,
  ADD COLUMN IF NOT EXISTS payment_status public.payment_status NOT NULL DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS mpesa_receipt_code text,
  ADD COLUMN IF NOT EXISTS amount_paid_kes integer,
  ADD COLUMN IF NOT EXISTS payment_received_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_receiver text,
  ADD COLUMN IF NOT EXISTS payment_notes text,
  ADD COLUMN IF NOT EXISTS assigned_worker text,
  ADD COLUMN IF NOT EXISTS job_started_at timestamptz,
  ADD COLUMN IF NOT EXISTS job_completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS before_photo_url text,
  ADD COLUMN IF NOT EXISTS after_photo_url text,
  ADD COLUMN IF NOT EXISTS customer_confirmation_note text,
  ADD COLUMN IF NOT EXISTS internal_notes text;

CREATE INDEX IF NOT EXISTS bookings_booking_reference_idx ON public.bookings(booking_reference);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings(status);
CREATE INDEX IF NOT EXISTS bookings_payment_status_idx ON public.bookings(payment_status);

-- 3. Replace anon INSERT policy with RPC-only access
DROP POLICY IF EXISTS "Public can request bookings" ON public.bookings;

-- 4. Booking-reference helper
CREATE OR REPLACE FUNCTION public.next_booking_reference(_for_date date)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _seq int;
  _ref text;
  _prefix text := 'FD-' || to_char(_for_date, 'DDMMYYYY') || '-';
BEGIN
  -- Look at existing references for the same day to pick the next sequence number
  SELECT COALESCE(MAX(substring(booking_reference from '\d+$')::int), 0) + 1
    INTO _seq
  FROM public.bookings
  WHERE booking_reference LIKE _prefix || '%';

  _ref := _prefix || lpad(_seq::text, 4, '0');
  RETURN _ref;
END;
$$;

-- 5. Public RPC to create a booking request
CREATE OR REPLACE FUNCTION public.create_booking_request(
  _name text,
  _phone text,
  _whatsapp text,
  _email text,
  _area text,
  _property_type text,
  _service text,
  _details text,
  _starts_at timestamptz,
  _ends_at timestamptz
)
RETURNS TABLE(id uuid, booking_reference text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _ref text;
  _id uuid;
  _today date := (now() AT TIME ZONE 'Africa/Nairobi')::date;
  _attempts int := 0;
BEGIN
  IF _name IS NULL OR length(trim(_name)) < 2 OR length(_name) > 80 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF _phone IS NULL OR length(trim(_phone)) < 7 OR length(_phone) > 25 THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;
  IF _area IS NULL OR length(trim(_area)) < 2 OR length(_area) > 120 THEN
    RAISE EXCEPTION 'Invalid area';
  END IF;
  IF _starts_at IS NULL OR _ends_at IS NULL OR _ends_at <= _starts_at THEN
    RAISE EXCEPTION 'Invalid time range';
  END IF;

  LOOP
    _attempts := _attempts + 1;
    _ref := public.next_booking_reference(_today);
    BEGIN
      INSERT INTO public.bookings (
        name, phone, whatsapp, email, area, property_type, service, details,
        starts_at, ends_at, status, booking_reference
      ) VALUES (
        trim(_name), trim(_phone), NULLIF(trim(coalesce(_whatsapp,'')), ''),
        NULLIF(trim(coalesce(_email,'')), ''), trim(_area),
        NULLIF(trim(coalesce(_property_type,'')), ''), _service::public.service_type,
        NULLIF(_details, ''), _starts_at, _ends_at, 'requested', _ref
      ) RETURNING bookings.id INTO _id;
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      IF _attempts >= 5 THEN RAISE; END IF;
    END;
  END LOOP;

  RETURN QUERY SELECT _id, _ref;
END;
$$;

REVOKE ALL ON FUNCTION public.create_booking_request(text,text,text,text,text,text,text,text,timestamptz,timestamptz) FROM public;
GRANT EXECUTE ON FUNCTION public.create_booking_request(text,text,text,text,text,text,text,text,timestamptz,timestamptz) TO anon, authenticated;

-- 6. Audit log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  booking_id uuid,
  field text,
  old_value text,
  new_value text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read audit log" ON public.audit_log;
CREATE POLICY "Admins read audit log" ON public.audit_log
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- No INSERT policy: only the SECURITY DEFINER trigger writes.

-- 7. Trigger to log changes to important booking fields
CREATE OR REPLACE FUNCTION public.log_booking_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'status', OLD.status::text, NEW.status::text);
  END IF;
  IF NEW.final_price_kes IS DISTINCT FROM OLD.final_price_kes THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'final_price_kes', OLD.final_price_kes::text, NEW.final_price_kes::text);
  END IF;
  IF NEW.payment_status IS DISTINCT FROM OLD.payment_status THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'payment_status', OLD.payment_status::text, NEW.payment_status::text);
  END IF;
  IF NEW.mpesa_receipt_code IS DISTINCT FROM OLD.mpesa_receipt_code THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'mpesa_receipt_code', OLD.mpesa_receipt_code, NEW.mpesa_receipt_code);
  END IF;
  IF NEW.payment_receiver IS DISTINCT FROM OLD.payment_receiver THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'payment_receiver', OLD.payment_receiver, NEW.payment_receiver);
  END IF;
  IF NEW.assigned_worker IS DISTINCT FROM OLD.assigned_worker THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'assigned_worker', OLD.assigned_worker, NEW.assigned_worker);
  END IF;
  IF NEW.job_completed_at IS DISTINCT FROM OLD.job_completed_at THEN
    INSERT INTO public.audit_log(user_id, action, booking_id, field, old_value, new_value)
    VALUES (_uid, 'booking_update', NEW.id, 'job_completed_at', OLD.job_completed_at::text, NEW.job_completed_at::text);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bookings_audit_trg ON public.bookings;
CREATE TRIGGER bookings_audit_trg
AFTER UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.log_booking_change();
