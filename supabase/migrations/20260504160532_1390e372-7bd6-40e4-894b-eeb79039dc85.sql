-- Restrict public bookings INSERT to status='requested'
DROP POLICY IF EXISTS "Public can request bookings" ON public.bookings;
CREATE POLICY "Public can request bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'requested'::public.booking_status);

-- Revoke direct EXECUTE on has_role from clients; it's still usable inside RLS policies
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
