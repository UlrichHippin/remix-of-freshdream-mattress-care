## Goal

The site already has Home, Services, Host Packages, About, FAQ, and Contact pages with sticky header, mobile menu, WhatsApp CTAs, footer, and Roysambu service-area logic. The main gap vs. the new spec is a dedicated **Pricing** page (in nav and as a standalone route) and a **Starting Prices preview** block on the homepage. A few smaller content gaps on Home and Contact also need filling.

## Changes

### 1. New page: `src/pages/Pricing.tsx`
Mobile-first, matches existing premium card style (`card-soft`, primary/accent tokens, container-tight, section paddings). Sections:

- **Hero** — "Clear Pricing for Hosts, Serviced Apartments, and Short-Stay Properties" + intro paragraph.
- **Mattress Cleaning** — 3 cards (Single / Double-Queen / King) each with Freshen-Up and Deep Clean KES ranges.
- **Special Treatment Add-Ons** — Heavy stain, Urine/odor, Same-day call-out, Extra drying support.
- **Upholstery / Add-Ons** — Pillows, sofa seats, dining chairs, small rug spot cleaning.
- **Host Package Pricing** — Custom-quote messaging (no rigid public prices).
- **Pricing Notes** — size/condition/location/urgency, multi-unit discounts, same-day subject to availability, host packages quoted individually.
- **CTA strip** — Book on WhatsApp / Ask About Host Packages / Request a Quote.

### 2. Wire Pricing into routing & nav
- `src/App.tsx`: add `<Route path="/pricing" element={<Pricing />} />` and import.
- `src/components/Header.tsx`: insert `{ to: "/pricing", label: "Pricing" }` in `nav` between Services and Host Packages (desktop + mobile).
- `src/components/Footer.tsx`: add Pricing to quick links.

### 3. Centralize pricing data
Add a `pricing` export to `src/data/content.ts` (mattress sizes, add-ons, upholstery items, notes) so Home preview and Pricing page share one source.

### 4. Homepage additions (`src/pages/Index.tsx`)
- **Starting Prices preview section** (new, placed after Services preview): compact 3-column card grid for Single / Double-Queen / King with Freshen-Up + Deep Clean ranges; small note ("Final pricing depends on size, condition, location, and urgency"); CTAs **View Full Pricing** (→ `/pricing`) and **Book on WhatsApp**.

### 5. Minor content tightening
- **Contact page** (`src/pages/Contact.tsx`): verify the "What to Send", "What Happens Next", "Quick Booking Template", repeat-properties note, and local service note all exist; add any missing blocks.
- **About page**: confirm sections match spec (What We Do, Who We Serve, Approach, Why It Matters, Local Roots, Brand Positioning) and patch any missing block.
- **Services page**: confirm the comparison/summary block ("which service is right for…") exists; add if missing.

No design-token, schema, auth, or booking-calendar changes — those already match the spec.

## Out of scope
- No image regeneration (existing hero/before-after/upholstery assets are reused).
- No backend or migration changes.
