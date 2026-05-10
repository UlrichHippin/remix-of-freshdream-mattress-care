## Goal

Add an Owner-only "Staff Access" panel in the Admin area so the owner can create or invite operator accounts (e.g. Leah) without ever exposing the service-role key in the browser.

## 1. New Edge Function: `create-operator`

Path: `supabase/functions/create-operator/index.ts`

Behavior:

1. CORS preflight + JSON only.
2. Require `Authorization: Bearer <jwt>` from the calling user. Validate via `supabase.auth.getClaims(token)` using the anon key.
3. Verify the caller is an owner by querying `staff_members` with the service-role client: `role = 'owner' AND user_id = caller`. Reject with 403 otherwise.
4. Validate request body:
   - `email` — required, valid format
   - `password` — optional; if present must be ≥ 8 chars
   - `mode` — `"password"` or `"invite"`
5. Action:
   - `mode = "password"`: `auth.admin.createUser({ email, password, email_confirm: true })`. If user already exists, look them up and `updateUserById` with the new password.
   - `mode = "invite"`: `auth.admin.inviteUserByEmail(email)` (sends the standard invite email). If user already exists, just reuse the id.
6. Upsert `staff_members { user_id, role: 'operator' }` with `onConflict: 'user_id'`. Role is hard-coded to `operator` — owner role can never be created here.
7. Return `{ success: true, user_id, mode }` or `{ error }` with the right status code.

Config: rely on default `verify_jwt = false` (we validate in code). No `supabase/config.toml` change needed.

## 2. New Edge Function: `list-staff`

Path: `supabase/functions/list-staff/index.ts`

- Same owner-gate as above.
- Returns `staff_members` joined with auth email/created_at via `auth.admin.listUsers` (paged) for display. Returns `[{ user_id, email, role, created_at }]`.

(Reason: client-side select on `staff_members` only returns the owner's own row under current RLS — owner needs to see all operators with their emails.)

## 3. New helper Edge Function: `update-staff-role`

Path: `supabase/functions/update-staff-role/index.ts`

- Owner-only.
- Body: `{ user_id, action: "remove" | "set_operator" }`.
- Hard-block: never set role to `owner`; never act on the caller's own row; never act on a row whose current role is `owner`.
- `remove` → delete row from `staff_members`.
- `set_operator` → upsert `{ user_id, role: 'operator' }`.

## 4. Admin UI changes

File: `src/pages/Admin.tsx` (owner-gated section only — operator view untouched).

Add a new card "Staff Access / Operators" rendered only when `role === 'owner'`:

- **List** of current staff (from `list-staff`): email, role badge, created_at, plus an action menu for operators only (Remove access). Owner row is read-only.
- **Add operator form**:
  - Email input
  - Toggle: "Set temporary password" vs "Send invite email"
  - Password input (visible only when temp-password mode)
  - Submit calls `create-operator` via `supabase.functions.invoke`
  - Toast on success/error; refresh the list
- All copy in German to match the rest of Admin.tsx.

No other Admin sections, no booking logic, no audit log, no payment logic touched.

## 5. Security / invariants (preserved)

- Service-role key stays in the edge functions only.
- `create-operator` and `update-staff-role` always force `role = 'operator'`.
- Caller identity is re-checked server-side via `staff_members` on every call — client claims alone are not trusted for authorization.
- No DB schema migration needed: existing `staff_members` table, RLS, and `is_owner/is_operator/is_staff` functions already cover access.
- Booking, payment, audit-log, Daily Control Dashboard, Operator Workflow, manual M-PESA flow, booking_reference immutability, cancel rules — all unchanged.

## Files

- new: `supabase/functions/create-operator/index.ts`
- new: `supabase/functions/list-staff/index.ts`
- new: `supabase/functions/update-staff-role/index.ts`
- edit: `src/pages/Admin.tsx` (add owner-only Staff Access card + handlers)

## Out of scope (explicitly not touched)

Homepage, BookingSection, Daily Control Dashboard, Operator Workflow, M-PESA logic, audit log policies, RLS on bookings, booking_reference rules, cancellation rules.
