
# FreshDream Mattress Care — Specialist Host-Support Website

A premium, mobile-first, conversion-focused multi-page site for FreshDream Mattress Care (Roysambu, Nairobi) — positioned as a specialist mattress & upholstery cleaning service for Airbnb hosts, serviced apartments, and short-stay property managers. Primary conversion path: WhatsApp. Secondary: structured booking request via calendar with real availability.

## Brand & Design Foundation

- **Palette (HSL tokens in `index.css`):**
  - Background: clean white / light neutral
  - Primary: deep trust blue (navy)
  - Accent: fresh green (cleanliness/freshness)
  - WhatsApp green: reserved exclusively for WhatsApp CTAs
  - Neutral grays for body text and dividers
- **Type:** Modern geometric sans (Inter / Plus Jakarta Sans). Large airy headings, comfortable line-height.
- **UI feel:** Rounded cards, soft shadows, generous whitespace, subtle dividers, lucide icons, no gradients-overload, no clinical/maid-service aesthetic.
- **Sticky header** with logo, nav, and a visible green WhatsApp button (desktop). On mobile: a sticky floating WhatsApp button + bottom-bar "Book on WhatsApp" CTA.
- **Imagery:** clean mattresses, tidy bed corners, short-stay apartment interiors, subtle service imagery. Use only logo/graphic variations that fit; remaining brand assets inform color/tone.

## Site Structure (multi-page, React Router)

Routes: `/`, `/services`, `/host-packages`, `/about`, `/faq`, `/contact` (Book Now). Shared `Header` + `Footer` + sticky mobile WhatsApp button.

### Header
Logo · Home · Services · Host Packages · About · FAQ · Book Now · **WhatsApp CTA (green)**.

### Footer
Business name, short description, quick links, primary service areas, WhatsApp CTA, trust statement, disclaimer:
"Results may vary depending on stain age, depth, mattress material, and room drying conditions."

## Home Page (sections in this exact order)

1. **Hero**
   - H1: "Mattress & Upholstery Cleaning for Airbnb Hosts in Nairobi."
   - Sub: "Fast, professional stain and odor treatment with documented service and guest-ready turnaround."
   - Support: "We help Airbnb hosts, serviced apartments, and short-stay property managers keep mattresses and upholstered furniture clean, fresh, and ready for the next guest."
   - CTAs: **Book on WhatsApp** (green), **View Host Packages**, **Request a Quote**.
2. **Trust Highlights** — 4 chips/icons: Fast WhatsApp response · Before/after photo proof · Same-day or next-day support · Built for Airbnb turnovers.
3. **Why Hosts Choose Us** — 4–6 reasons (hospitality-aware, host-language, not generic).
4. **Services Preview Cards** — 5 cards linking to `/services`.
5. **Host Packages Preview** — Two-card teaser (Starter / Multi-Unit) → `/host-packages`.
6. **Documented Service** — Visual explainer: before/after photos, simple service updates, what was treated, honest result communication, drying guidance.
7. **How It Works** — 4 steps: Send details on WhatsApp → Quote & time slot → On-site service → Photo proof + drying guidance.
8. **Emergency Host Service** — Highlighted band: urgent help before next check-in.
9. **Service Areas** — Pill list of: Roysambu, Kasarani, Thome, Mirema, Garden Estate, Zimmerman, Kahawa West, Kahawa Sukari, TRM Drive, Ridgeways, Ruaraka, Parklands, Westlands, "+ selected Nairobi areas on request".
10. **FAQ Preview** — 4–5 top FAQs with link to full FAQ.
11. **Final CTA** — Strong band: "Get your property guest-ready" + WhatsApp + Book.
12. **Footer**.

## Services Page (`/services`)

Intro + 5 detailed sections, each with what it's for, what's included, and honest expectations:

- **Turnover Freshen-Up** — routine Airbnb turnovers; inspection, dry vacuuming, light spot treatment, odor-neutralizing, low-moisture refresh, after-service photos.
- **Deep Mattress Clean** — visible stains, sweat, body oils; full inspection, dry soil removal, targeted pre-treatment, deeper extraction, odor-reduction, photos.
- **Urine & Odor Recovery** — guest accidents; targeted urine/odor treatment, stain-focused process, extraction, drying guidance, photos. Honest wording: older/deeper stains may improve significantly without disappearing fully.
- **Emergency Host Service** — urgent pre-check-in support: last-minute stains, odor complaints, guest incidents, unexpected turnover problems.
- **Upholstery & Sofa Cleaning** — sofas, cushions, upholstered chairs, selected soft furnishings.

Each card: icon, "Best for", "What's included", "Realistic expectations", WhatsApp CTA.

## Host Packages Page (`/host-packages`)

- Why repeat properties need structured support (repeat turnovers, recurring care, urgent guest incidents, easier planning, multi-unit support, documented repeat visits, bundled mattress + upholstery care).
- **Starter Host Package** — 1–2 units.
- **Multi-Unit Host Package** — 3+ units.
- Custom inquiries instead of rigid public pricing — "Request a tailored package on WhatsApp."
- Trust strip: documented repeat visits, consistent crew, priority scheduling.

## About Page (`/about`)

Short, honest brand story — Roysambu base, hospitality-first focus, why we serve hosts, our standards (controlled-moisture cleaning, honest assessment, documented service). Trust block + CTA.

## FAQ Page (`/faq`)

Accordion covering all required questions:
- Cleaning duration · Drying time · Will all stains come out (honest) · Same-day support · Specifically for Airbnb hosts · Sofas/upholstered chairs · Before/after photo proof · Multi-unit support · Service areas · How to request a quote · Heavily damaged or moldy mattresses (honest decline/advice when appropriate).

## Contact / Book Now Page (`/contact`)

Conversion-focused, WhatsApp-first, with structured booking request as secondary path.

**Top section — WhatsApp-first:**
- Big green "Book on WhatsApp" button with prefilled template:
  ```
  Hello, I would like to request a mattress cleaning quote.
  Location:
  Mattress size:
  Photos:
  Next guest check-in time:
  Issue type:
  ```
- "What to send": location, mattress size or furniture type, photos, next guest check-in time, urgency/notes.
- "What happens next": estimated price, available time slot, drying guidance, same/next-day feasibility.
- Email inquiry link as alternative.

**Booking Calendar (structured request):**
- Premium, simple, mobile-friendly date + time-slot picker that matches the brand.
- Shows available slots in green, blocked/booked slots disabled and visually muted.
- Respects: admin-set availability windows, blocked days/hours, buffer time between jobs, minimum lead time.
- User picks date → sees available time windows for that date → fills brief form (name, phone, WhatsApp, area, property type, mattress size/furniture, service type, notes) → submits.
- Submission stored as **Requested** appointment (not auto-confirmed). Confirmation/rejection happens out-of-band; user is told clearly: "A selected time slot is treated as a requested appointment until confirmed by the business via WhatsApp."
- Success screen offers immediate "Continue on WhatsApp" with their details prefilled.

**Contact form (email inquiry):**
- Validated with `react-hook-form` + `zod` (length limits, email format, phone format, sanitized text).

## Booking System — Backend (Lovable Cloud)

Powering the calendar requires persistence + admin control. Will enable Lovable Cloud and add:

- **Tables**
  - `availability_rules` — weekly recurring open hours per weekday.
  - `blocked_periods` — admin-blocked specific dates / time ranges.
  - `settings` — buffer minutes between jobs, minimum lead-time hours, slot length, daily max jobs.
  - `bookings` — requested appointments (name, phone, whatsapp, area, service, mattress/furniture details, notes, requested start, requested end, status: requested/confirmed/declined/completed/cancelled).
  - `profiles` + `user_roles` (enum: `admin`, `user`) with `has_role()` security-definer function (per security rules).
- **RLS**
  - Public can `INSERT` bookings (rate-limited via simple checks) and `SELECT` only an aggregated/availability view (no PII).
  - Admins can `SELECT/UPDATE/DELETE` bookings, manage availability, blocked periods, and settings.
- **Availability computation**
  - Public RPC / edge function returns free slots for a given date range, computed from availability rules minus blocked periods minus existing requested/confirmed bookings (with buffer + lead-time applied).
- **Admin area** (`/admin`, role-gated)
  - Login (email/password via Lovable Cloud auth, auto-confirm enabled).
  - Calendar of upcoming bookings; confirm / decline / mark complete.
  - Manage weekly availability, block specific days/hours, edit buffer/lead-time/slot length.
  - WhatsApp-link helper to message the requester directly.
- **Notifications (phase 1)**
  - On submission: success toast + "Continue on WhatsApp" with prefilled template containing the requested slot.
  - Optional later: edge function to email the business on new requests.

## Conversion & UX Details

- Sticky mobile bottom bar: "Book on WhatsApp" (green) + "Request a Quote".
- Floating WhatsApp button on every page.
- All WhatsApp links open `wa.me/<number>` with URL-encoded prefilled message; number stored in a single config constant for easy update.
- Smooth scroll, fade-in on scroll, accessible focus states, semantic headings, alt text.
- SEO basics: per-page title/description, Open Graph tags, JSON-LD `LocalBusiness` with Roysambu address and service areas.

## Tone & Copy Guardrails

- Clear, honest, reassuring, hospitality-aware, premium-but-simple.
- No exaggerated claims, no "all-in-one solution", no cheap sales language, no unrealistic stain-removal promises.
- Where relevant, surface honest expectations (urine/odor, old stains, moldy mattresses).

## Technical Notes

- React + Vite + Tailwind + shadcn/ui (Button, Card, Accordion, Dialog, Popover, Calendar, Form, Input, Textarea, Select, Toast, Sheet for mobile nav).
- `react-hook-form` + `zod` for all forms; input length limits and trimming.
- React Router pages under `src/pages/*`; section components under `src/components/sections/*`; shared `Header`, `Footer`, `WhatsAppButton`, `BookingCalendar`.
- Brand tokens in `src/index.css` + `tailwind.config.ts` (HSL only).
- Lovable Cloud for auth, DB, RLS, and availability RPC. `user_roles` table with `has_role()` security-definer (no roles on profiles).
- Single config file for business phone, WhatsApp number, email, address, service areas, and slot/buffer/lead-time defaults (until admin overrides via DB).

## Out of Scope (structured for later, no redesign needed)

- M-Pesa payments / deposits.
- PDF quotes & service summaries (per-job).
- Internal job management dashboard beyond basic booking admin.
- Automated SMS/email reminders.
- Multi-language.
