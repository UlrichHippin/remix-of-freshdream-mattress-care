# Phase 1 — Homepage Conversion Polish

Brand stays exactly: **FreshDream Mattress Care**. No fake reviews/ratings/Superhost claims. All existing strong sections (JIMMY BX7 Pro Max, no-wet-waiting, M-PESA, transport fee, Quick Quote, booking form, Airbnb host) stay intact.

## 1. Hero cleanup (`src/pages/Index.tsx`)

- Reduce trust chips from 4 → 3, in this order:
  1. No wet-mattress waiting
  2. M-PESA accepted
  3. Based in Roysambu
  - (Keep "WhatsApp booking" array entry commented out as optional 4th — disabled by default.)
- Compact the Opening Offer price card:
  - Remove the large "100% Dry Process · Zero Drying Time…" primary chip and the "Limited slots available this week" urgency chip.
  - Keep: "Opening Offer" label, "from KES 1,999", "First-time" star badge, and the Sleep Area Dust Refresh +KES 300 line.
  - Reduce padding (`p-5` → `p-4`), tighter spacing.
- CTA hierarchy (clean two-button row):
  - Primary solid: **Book via WhatsApp** (whatsapp green, current style)
  - Secondary outline: **View Services** → links to `/services` (replaces "View Cleaning Packages" which scrolled to `#packages`)

## 2. Compact homepage pricing table (new section)

Insert a new section right after the hero (before Quick Quote), titled **"Simple, Honest Pricing"**.

Compact card containing a clean table:

```text
Single Mattress   from KES 1,999
Double Mattress   from KES 2,499
Queen Mattress    from KES 2,999
King Mattress     from KES 3,499
```

Add-ons block below:
- Sleep Area Dust Refresh — + KES 300
- Transport fee — confirmed by location

Footnote: *Final price is confirmed by WhatsApp before the visit.*

Use existing `Table` UI primitive, semantic tokens only, mobile-friendly (full width, small text on mobile, single CTA below: "Get exact price on WhatsApp").

## 3. Mobile UX fix

- `src/components/FloatingWhatsApp.tsx`: hide on mobile by adding `hidden md:grid` so it only shows desktop/tablet.
- `src/components/MobileStickyCTA.tsx`: simplify to a single dominant full-width WhatsApp CTA labeled **"Book via WhatsApp"** with the price as a small caption above or inline. Keeps "from KES 1,999" visible but the button is the dominant element.
- Result: mobile = one sticky bottom WhatsApp CTA. Desktop = floating WhatsApp + inline buttons unchanged.

## 4. Service-specific WhatsApp templates

Create new helper `src/config/whatsappTemplates.ts` exporting four prefilled message strings (verbatim from the user spec):

- `mattressCleaningMsg`
- `airbnbMattressMsg`
- `upholsteryMsg`
- `stainOdorMsg`

Wire them into the matching service cards / CTAs:
- Mattress Cleaning card → `mattressCleaningMsg`
- Airbnb host section CTA (`HostPackagesPreview` or its inline buttons in Index) → `airbnbMattressMsg`
- Sofa / Upholstery card → `upholsteryMsg`
- Stain / Odor card or Intensive Stain / Urine package CTAs → `stainOdorMsg`

Will check `src/pages/Services.tsx`, `src/components/HostPackagesPreview.tsx`, and the relevant Index sections to map each card to the right template. Existing generic `whatsappLink()` calls elsewhere are untouched.

## 5. Sections preserved

JIMMY BX7 Pro Max equipment section, "No wet-mattress waiting" messaging, M-PESA payment section, transport fee zones, QuickQuote, BookingSection, HostPackagesPreview — all kept as-is unless touched by item 4 above.

## Files touched

- `src/pages/Index.tsx` — hero chips, price card, CTAs, insert pricing table section, wire service templates
- `src/components/FloatingWhatsApp.tsx` — hide on mobile
- `src/components/MobileStickyCTA.tsx` — single dominant WhatsApp CTA
- `src/config/whatsappTemplates.ts` — new file with 4 templates
- `src/components/HostPackagesPreview.tsx` — use Airbnb template (read first to confirm)

No backend, no schema, no new dependencies.
