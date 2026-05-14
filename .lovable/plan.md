## Ziel

Das bestehende `BookingSection`-Formular schreibt seine Anfragen künftig in dein **externes** Supabase-Projekt (`rfcfmslgscpknibjdhkf`). Nach jeder Anfrage erhältst du automatisch eine E-Mail an `bookings@freshdream.co.ke` mit allen Details + einem 1-Klick-WhatsApp-Link an `+4915756233913`.

## Architektur

```text
Browser (BookingSection)
   │
   │ 1. INSERT booking → externes Supabase (rfcfmslgscpknibjdhkf)
   │
   │ 2. invoke('notify-booking', { id, ref, ... }) → Lovable Cloud Edge Function
   │                                                       │
   │                                                       └─ sendet E-Mail via Lovable Email
   │                                                          (mit wa.me-Link für 1-Klick-WhatsApp)
```

Warum gemischt: Edge Functions und Lovable Email laufen nur auf der internen Lovable Cloud. Daten liegen aber – wie gewünscht – im externen Supabase. Die beiden Systeme reden nur via HTTPS-Aufruf miteinander, kein Daten-Cross-over.

## Schritte

### 1. Externer Supabase-Client
Neue Datei `src/integrations/external-supabase/client.ts` mit hartcodierter URL + anon key (publishable, darf im Code stehen). Der Lovable-interne Client (`src/integrations/supabase/client.ts`) bleibt unangetastet und wird weiter für Admin/Auth/Edge Functions genutzt.

### 2. Tabelle im externen Supabase anlegen
Du führst dieses SQL einmal im externen Supabase SQL Editor aus (kann ich dir nach Plan-Approval als Copy-Paste-Block geben):

- Tabelle `public.bookings` (id, booking_reference, name, phone, whatsapp, email, area, property_type, service, details, starts_at, ends_at, status, created_at)
- RLS aktiv
- Policy: `anon` darf nur `INSERT`, kein SELECT/UPDATE/DELETE
- Trigger generiert `booking_reference` im Format `FD-DDMMYYYY-0001`

### 3. `BookingSection` umbauen
- Statt `supabase.rpc('create_booking_request', …)` → `externalSupabase.from('bookings').insert(...).select('id, booking_reference').single()`
- Validierung (zod) bleibt clientseitig.
- Slot-Verfügbarkeit (`get_busy_slots`) wird ebenfalls aus dem externen Supabase gelesen – der Trigger oder eine RPC muss dort existieren (im SQL-Block enthalten).

### 4. E-Mail-Benachrichtigung
- Lovable Email Domain einrichten (1× DNS, danach automatisch).
- Edge Function `notify-booking` (auf Lovable Cloud) nimmt die Buchungsdaten entgegen und sendet eine HTML-Mail an `bookings@freshdream.co.ke` mit:
  - Referenz, Name, Telefon, Service, Termin, Adresse, Notizen
  - Button „Per WhatsApp antworten" → `https://wa.me/4915756233913?text=…` mit vorausgefülltem Kundentext
- Wird direkt nach erfolgreichem Insert vom Browser aufgerufen (`supabase.functions.invoke`).

### 5. WhatsApp-Push (optional, später)
Echte WhatsApp-Push-Nachricht an dein Handy benötigt Twilio/WhatsApp Business API + Kosten. Vorerst Lösung via E-Mail mit Klick-zu-WhatsApp-Link, was de facto innerhalb von 1 Sekunde dieselbe Funktion erfüllt. Echte API-Anbindung können wir nachrüsten, wenn gewünscht.

## Was du nach Approval tust
1. SQL-Block im externen Supabase ausführen (gebe ich dir).
2. E-Mail-Domain-Setup-Dialog in Lovable einmal durchklicken (DNS-Records).

Den Rest baue ich.

## Offene Frage
Bist du okay damit, dass der Admin-Bereich (Bookings-Übersicht, Status ändern, Audit-Log) **weiterhin auf Lovable Cloud läuft** und dort eine separate Kopie der Buchungen liegt – oder soll der Admin auch komplett aufs externe Supabase migriert werden? Letzteres bedeutet: kompletter Neuaufbau aller Tabellen, Rollen, RLS-Policies, Setup-Code-Flow im externen Projekt (großer Aufwand, bricht alle bestehenden Funktionen).

Empfehlung: Nur das **öffentliche Buchungsformular** schreibt extern (wie oben). Falls du Admin-Sicht auch extern willst, sag Bescheid und ich erweitere den Plan.
