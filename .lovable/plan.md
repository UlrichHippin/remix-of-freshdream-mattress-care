## Goal

Persist an estimated and final confirmed price on each booking, let admins enter them, and surface the **final** confirmed price plus M-PESA payment instructions to the customer once the booking is confirmed.

## 1. Database (migration)

Add two nullable columns to `public.bookings`:

- `estimated_price_kes` — `integer`, nullable (admin's initial quote).
- `final_price_kes` — `integer`, nullable (price after confirmation; what customer pays).

No RLS changes needed — existing admin UPDATE policy and public INSERT policy (which only allows `status = 'requested'`) already prevent customers from injecting prices, since the INSERT policy doesn't restrict columns but the form simply won't send these.

Optional safety: keep the public INSERT contract by *not* exposing these in the form — the schema permits null which becomes the default.

## 2. Booking confirmation UI (`src/components/BookingCalendar.tsx`)

After a successful insert, fetch the inserted row's `id` (use `.select().single()` on the insert) and store it in `success` state. Then poll / subscribe so the customer sees the price once admin confirms.

- Use Supabase Realtime on the `bookings` row filtered by id, OR a lightweight refetch on tab focus + every 30s while the success view is open.
- Realtime is cleaner: subscribe to `postgres_changes` on `public.bookings` filtered by `id=eq.<id>`.

Update the success view:

- While `status = 'requested'` and no `final_price_kes`: show current message (request received, will confirm via WhatsApp).
- Once `status = 'confirmed'` and `final_price_kes` is set: show a confirmed card with:
  - "Booking confirmed" headline.
  - **Final price: KES {final_price_kes}**.
  - Payment instructions block:
    - "Pay via M-PESA after service (or cash on completion)."
    - "M-PESA Till / Paybill: <from `src/config/site.ts`>" — if not present, add a `mpesa` field there with a placeholder the user can fill in.
    - "Reference: your name + booking date."
    - Reminder: "Only pay after the technician completes the job, unless a deposit was agreed on WhatsApp."
  - "Continue on WhatsApp" button (existing).

Realtime requires enabling the publication:

```sql
alter publication supabase_realtime add table public.bookings;
```

## 3. Admin UI (`src/pages/Admin.tsx`)

In the bookings table row, add two compact inline number inputs:

- "Est. KES" → writes `estimated_price_kes`.
- "Final KES" → writes `final_price_kes`.

Each input saves on blur (or via a small Save button next to them) by calling `supabase.from('bookings').update({...}).eq('id', b.id)`. Show the saved value persistently.

Workflow guidance shown in the existing helper text:

1. Enter estimated price after first WhatsApp reply.
2. Enter final price + click **Confirm** when slot and price are agreed.
3. Customer's confirmation page (still open or revisited) updates live with the final price and payment instructions.

Update the `Booking` TypeScript interface to include the two new optional number fields.

Remove the "Estimated price & final price" line from the "Planned admin enhancements" list since it's now implemented (keep the rest: payment method, M-PESA code, payment status — still planned).

## 4. Site config (`src/config/site.ts`)

Add (if missing) an `mpesa` object with `tillNumber` / `paybill` / `accountName` placeholders, used by the confirmation UI. If the user already has a payment number elsewhere, reuse it; otherwise leave a clearly marked TODO placeholder for them to fill in.

## Out of scope

- Payment method, M-PESA code, payment status fields (remain in "planned enhancements").
- Automated online payments / STK push.
- Email notifications.

## Files touched

- New migration adding two columns to `bookings` and enabling realtime.
- `src/components/BookingCalendar.tsx` — capture booking id, subscribe to updates, render confirmed-price view with payment instructions.
- `src/pages/Admin.tsx` — inline price inputs + save, updated interface and helper text.
- `src/config/site.ts` — M-PESA payment details (placeholder if not provided).
