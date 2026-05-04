## Ziel
Auf `/admin/login` einen einmaligen Setup-Flow hinzufügen, mit dem du den **ersten Admin-Account** selbst erstellen kannst — ohne SQL, ohne Migration, direkt über die Website.

## So funktioniert es für dich

1. Du gehst auf `/admin/login`
2. Solange noch **kein Admin** existiert, siehst du unter dem Login-Formular einen Bereich **"Erste Einrichtung"** mit einem Button **"Ersten Admin-Account erstellen"**
3. Du gibst E-Mail + Passwort ein → Klick → Account wird erstellt + Admin-Rolle zugewiesen → automatisch eingeloggt → weitergeleitet zu `/admin`
4. Sobald ein Admin existiert, **verschwindet** der Setup-Bereich automatisch (Sicherheit: niemand sonst kann sich später Admin-Rechte geben)

## Technische Umsetzung

### 1. Edge Function `bootstrap-admin` (neu)
Eine sichere Server-Funktion, die:
- Prüft, ob bereits ein User mit Rolle `admin` in `user_roles` existiert
- Falls **ja** → Fehler "Admin existiert bereits, Setup gesperrt"
- Falls **nein**:
  - Legt neuen Auth-User an (mit `service_role`, E-Mail bereits bestätigt)
  - Fügt Eintrag in `user_roles` mit `role = 'admin'` hinzu
  - Gibt Erfolg zurück

Wird mit `verify_jwt = false` deployed, da der Aufrufer noch nicht eingeloggt ist.

### 2. Edge Function `check-admin-exists` (neu)
Liefert nur `{ exists: boolean }` zurück, damit das Frontend weiß, ob der Setup-Bereich angezeigt werden soll.

### 3. `src/pages/AdminLogin.tsx` erweitern
- Beim Mount: `check-admin-exists` aufrufen
- Wenn `exists === false`: zusätzlichen Bereich **"Erste Einrichtung"** anzeigen
  - Felder: E-Mail, Passwort (min. 8 Zeichen), Passwort bestätigen
  - Button: "Ersten Admin erstellen"
  - On submit → `bootstrap-admin` aufrufen → bei Erfolg automatisch `signInWithPassword` → redirect zu `/admin`
- Wenn `exists === true`: nur das normale Login-Formular zeigen

### 4. Sicherheit
- Bootstrap funktioniert **nur einmal** (server-seitig geprüft, nicht im Client)
- Service-Role-Key bleibt server-seitig (Edge Function), nie im Browser
- Nach erfolgreicher Einrichtung ist der Endpoint praktisch gesperrt

## Dateien
- **Neu:** `supabase/functions/bootstrap-admin/index.ts`
- **Neu:** `supabase/functions/check-admin-exists/index.ts`
- **Neu:** `supabase/config.toml` Einträge für beide Functions (`verify_jwt = false`)
- **Bearbeitet:** `src/pages/AdminLogin.tsx` (Setup-Bereich + Logik)

## Nach der Einrichtung
Du kannst dich ab dann normal über das Login-Formular einloggen und im Admin-Bereich Buchungen + blockierte Zeiten verwalten. Wenn du später weitere Admins brauchst, sag mir Bescheid — dann bauen wir eine "Admin einladen"-Funktion direkt im Admin-Dashboard.
