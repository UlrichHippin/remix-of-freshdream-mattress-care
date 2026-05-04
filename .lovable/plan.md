## Was bereits fertig ist
- Edge Function `bootstrap-admin` (erstellt Auth-User + Admin-Rolle, server-seitig gegen Mehrfach-Setup gesperrt)
- Edge Function `check-admin-exists` (prüft, ob bereits ein Admin existiert)

## Was noch fehlt
**`src/pages/AdminLogin.tsx` erweitern** mit einem einmaligen Setup-Bereich:

1. Beim Laden der Seite ruft das Frontend `check-admin-exists` auf
2. Wenn **noch kein Admin** existiert, erscheint unter dem normalen Login-Formular ein Bereich **"Erste Einrichtung"** mit:
   - E-Mail-Feld
   - Passwort-Feld (mind. 8 Zeichen)
   - Passwort-Bestätigung
   - Button **"Ersten Admin-Account erstellen"**
3. Beim Klick:
   - Aufruf von `bootstrap-admin` mit E-Mail + Passwort
   - Bei Erfolg: automatisches `signInWithPassword` → Weiterleitung zu `/admin`
   - Bei Fehler: Toast-Meldung
4. Wenn bereits ein Admin existiert, wird der Setup-Bereich **nicht** angezeigt — nur das normale Login

## Du gibst nur ein
- E-Mail
- Passwort

Keine UUIDs. Die werden automatisch von Lovable Cloud generiert und im Hintergrund verknüpft.

## Sicherheit
- Setup geht **nur einmal** — danach blockiert der Server jede weitere Anfrage (403)
- Service-Role-Key bleibt server-seitig in der Edge Function
- Nach erfolgreicher Einrichtung loggst du dich nur noch über das normale Login-Formular ein