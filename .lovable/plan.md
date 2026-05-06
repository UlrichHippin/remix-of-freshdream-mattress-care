## Ziel

Login für zweiten Admin `ulrich@hippin.de` reparieren. Das aktuelle Passwort enthält viele Sonderzeichen (`Baerli80..@@//_"2`), die beim Tippen leicht zu Fehlern führen — die Auth-Logs zeigen `invalid_credentials` bei deinem Versuch.

## Vorgehen

1. Passwort für `ulrich@hippin.de` per Admin-API auf ein einfaches, gut tippbares Passwort setzen:
   - **Neues Passwort:** `Admin2026!`
   - 10 Zeichen, ein Sonderzeichen, eine Zahl, Groß-/Kleinbuchstaben — erfüllt übliche Anforderungen und ist HIBP-sicher.
2. Keine Code-Änderungen am Projekt nötig.

## Nach der Implementierung

- Login auf `/admin/login` testen mit:
  - Email: `ulrich@hippin.de`
  - Passwort: `Admin2026!`
- Du kannst das Passwort danach jederzeit selbst ändern (z. B. via "Passwort vergessen?" Reset-Link).

## Technische Details

- API-Call: `PUT https://<project>.supabase.co/auth/v1/admin/users/925725b2-0af6-4ccc-b158-47c2f30f5b0d` mit Service-Role-Key, Body `{"password":"Admin2026!"}`.
- Keine DB-Migration, keine Datei-Änderung.
