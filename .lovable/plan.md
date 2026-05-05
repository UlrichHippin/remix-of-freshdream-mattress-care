## Goal

Merge the existing homepage "Services preview" and "Starting prices preview" sections into a single, refined offers section presenting the 4 new service packages. Avoid creating a disconnected second sales block.

## Changes (only `src/pages/Index.tsx`)

### Remove
- The "Services preview" section (the cards rendered from `services`).
- The "Starting prices preview" section (the `pricingMattress` cards).

These overlap with the new packages and would duplicate information.

### Add — single new section in their place: "Professional Dry Cleaning Packages"

Layout, compact and on-brand (uses existing `card-soft`, `eyebrow`, `container-tight`, `section bg-surface`, primary/accent colors — no new design tokens):

- Section header: eyebrow "Packages" + title "Professional Dry Cleaning Packages" + subtitle "Safe, dry, and hygiene-focused cleaning for mattresses, sofas, and rugs in Nairobi."
- Grid of 4 package cards (1 col mobile, 2 cols sm, 4 cols lg). Each card shows:
  - Title
  - Price in KES (large, primary color)
  - "Ready in ~X hours" badge (small pill, accent-soft)
  - One-line summary
  - "More info" button (outline, opens Dialog)
- One primary CTA button below grid: "Book a Cleaning" → opens WhatsApp via existing `WhatsAppButton`.
- Trust note line: "Dry process. No soaking. Nairobi and surrounding areas."

### Modal (Dialog) for "More info"

Use existing `@/components/ui/dialog`. One controlled Dialog with state for the active package; clicking any card's "More info" sets the active package and opens it. Modal content per package:
- Title + tagline
- Description paragraph
- "Included" list (check icons)
- "Best for" list
- "Ready to use again" line
- Note line (muted/italic)
- Footer CTA: WhatsApp "Book this package" with prefilled message (e.g. "Hello, I'd like to book the [Package name] package.")

### Data

Define a local `const packages = [...]` array at top of the file with the 4 packages (title, price, hours, summary, tagline, description, included[], bestFor[], readyIn, note, whatsappMessage). Keeps changes self-contained; no edits to `src/data/content.ts`.

### Imports to add
- `useState` from react
- `Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription` from `@/components/ui/dialog`
- `Check, Clock` icons from lucide-react (Clock4 already imported)

### Untouched
- Hero, host support feature, trust highlights, "Why hosts choose us", `EquipmentBadge band`, hospitality banner, host packages preview, FAQ, final CTA, footer.
- Navigation, global styles, brand colors, all other pages.

## Result
One cohesive offers area replaces two overlapping sections. Mobile-friendly, scannable cards with full details one tap away, single strong CTA, consistent with existing card/typography system.