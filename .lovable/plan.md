## Goal

Replace generic photos and text-heavy blocks with a cohesive set of **modern, branded vector-style illustrations** that feel premium, hospitality-focused, and consistent across the site.

## Visual direction

- **Style:** flat / semi-flat vector illustrations with soft gradients in brand colors (primary navy + accent), rounded geometry, subtle shadows, no photo-realism, no clip-art, no people/cleaning crew.
- **Subjects:** beds with linens, pillows, sofas, suitcases, WhatsApp chat bubbles, sparkles, before/after panels, calendars/timeline, small apartment scenes, shield/checkmark badges.
- **Format:** PNG (1024×1024 transparent or soft background) generated via Lovable AI image gateway (`google/gemini-3.1-flash-image-preview`) for pro quality + speed, matching the existing `illust-*.png` look but more refined.

## New illustrations to generate (6)

1. `illust-process-flow.png` — 4-step vector journey (chat → calendar → vacuum/wand → camera) on a soft brand-gradient background.
2. `illust-whatsapp-quote.png` — Stylized phone with WhatsApp bubble, mattress thumbnail, sparkle badge.
3. `illust-emergency-response.png` — Vector alarm-clock + bed + accent burst, conveying urgent guest-ready turnaround.
4. `illust-before-after.png` — Side-by-side mattress panels (stained → clean) with sparkle and check badge — replaces the photo `before-after.jpg` usage.
5. `illust-portfolio.png` — Three small apartment-building/door tiles representing multi-unit, replaces `host-portfolio.jpg` in any text-only block.
6. `illust-trust-badges.png` — Composition of shield, camera, droplet, clipboard icons clustered into a branded badge graphic.

All generated via a small Node script using `LOVABLE_API_KEY` against `ai.gateway.lovable.dev`, decoded from base64 and written to `src/assets/`.

## Placements

**`src/pages/Index.tsx`**
- "How it works" steps: add `illust-process-flow.png` inside `IllustrationFrame` next to or replacing the current apartment photo caption block (keep one hospitality photo, swap the second visual to the illustration for variety).
- WhatsApp/contact band near top or final CTA: add small `illust-whatsapp-quote.png` thumbnail in a `IllustrationFrame`.
- Emergency block: add `illust-emergency-response.png` as a side visual.
- Trust/standards strip: replace plain icon row's intro visual with `illust-trust-badges.png`.

**`src/pages/Services.tsx`**
- Keep existing per-service illustrations; add `illust-before-after.png` in a new compact "Visible results" strip above the hospitality band, replacing reliance on the plain photo.

**`src/pages/HostPackages.tsx`**
- Replace one `IllustrationFrame` (currently `illustHostSupport` unused / `illustMultiUnit`) with `illust-portfolio.png` for the "How packages help" intro side, keeping the suite photo on the other side.

**`src/pages/About.tsx`**
- Add a small `illust-trust-badges.png` `IllustrationFrame` inside the "Four things we never cut corners on" section header, anchoring the standards visually.

**`src/pages/Contact.tsx` / `FAQ.tsx`**
- Add `illust-whatsapp-quote.png` as a hero side visual via `IllustrationFrame` so these pages stop being text-only.

## Consistency rules

- All new illustrations placed inside the existing `IllustrationFrame` component → automatic brand gradient, dotted texture, badge, rounded-3xl, shadow.
- Use existing tone variants (`primary` / `accent`) alternated for rhythm.
- No layout overhauls; only swap/insert visuals into existing grid slots.
- Hospitality photos remain where they reinforce realism (hero, About story, Services band, HostPackages story); illustrations take over explainer/CTA/process areas.

## Technical steps

1. Write `/tmp/gen-illustrations.ts`, loop through 6 prompts, POST to Lovable AI gateway, save base64 PNGs to `src/assets/`.
2. Run with `bun /tmp/gen-illustrations.ts`.
3. Edit the 6 page files to import and place the new illustrations inside `IllustrationFrame` blocks at the locations listed above.
4. Spot-check the preview routes (`/`, `/services`, `/host-packages`, `/about`, `/contact`, `/faq`) for spacing.

## Out of scope

- No new pages, no copy rewrites, no design-token changes, no removal of existing hospitality photos that still serve a purpose.