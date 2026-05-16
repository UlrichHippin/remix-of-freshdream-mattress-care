## Status

Das SQL ist im externen Supabase-Projekt (`rfcfmslgscpknibjdhkf`) ausgeführt. Der bestehende Code in `src/components/BookingSection.tsx` (Zeilen 201–223) schreibt bereits via `externalSupabase.from("bookings").insert(...)` direkt in die neu angelegte Tabelle. Der externe Client ist in `src/integrations/external-supabase/client.ts` mit URL + Anon Key korrekt konfiguriert.

→ **Keine Datei muss geändert werden.** Das System ist live.

## Was jetzt zu tun ist (kein Code, nur Test)

1. **Buchung im Browser absenden**
   - Auf `/` runter zum Booking-Formular scrollen
   - Alle Pflichtfelder ausfüllen, Datum + Zeitslot wählen
   - „Open WhatsApp with Booking Request" klicken

2. **Erwartetes Verhalten**
   - WhatsApp öffnet mit vorgefülltem Text inkl. `Request ID: FD-DDMMYYYY-XXXX`
   - In Supabase Dashboard → **Table Editor** → `bookings`: neue Zeile sichtbar
   - `booking_reference` wurde vom DB-Trigger gesetzt (Format `FD-16052026-0001`)
   - `status` = `requested`

3. **Falls die Zeile fehlt**
   - Browser DevTools → Console öffnen, nochmal absenden
   - Nach `External Supabase booking insert failed` suchen → Fehlertext kopieren und mir schicken
   - Häufige Ursachen: RLS-Policy für `anon` INSERT fehlt, Enum-Wert (`service`) stimmt nicht, oder Trigger-Validierung schlägt an

## Optional, später

- E-Mail-Benachrichtigung an `bookings@freshdream.co.ke` über Lovable Email (Edge Function `notify-booking`) — kann ich nach erfolgreichem Test bauen, sobald die Email-Domain einmal per DNS verifiziert ist.

## Technische Details

- Insert nutzt clientseitig generierte `booking_reference` als Fallback; der DB-Trigger `set_booking_reference` überschreibt sie ohnehin im korrekten Format.
- `get_busy_slots()` wird aktuell **nicht** vom Formular aufgerufen (kein Verfügbarkeitsblock im UI). Die Funktion existiert für spätere Erweiterung.
- Der interne Lovable-Cloud-Supabase-Client (Admin-Bereich) bleibt unberührt — Buchungen liegen ausschließlich extern.
