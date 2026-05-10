-- Fix audit_log RLS: restrict read to owner only
DROP POLICY IF EXISTS "Staff read audit log" ON public.audit_log;

CREATE POLICY "Owners read audit log"
ON public.audit_log
FOR SELECT TO authenticated
USING (public.is_owner(auth.uid()));