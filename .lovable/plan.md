# Equipment & Benefits Section Refresh — JIMMY BX7 Pro Max

All work happens in the existing equipment section in `src/pages/Index.tsx` (section "10. JIMMY BX7 PRO MAX EQUIPMENT", ~lines 554–658). No new files, no manufacturer images, no business-logic changes.

## What changes

### 1. Headline & description (already mostly correct — finalize copy)
- Headline: **Professional Dry Mattress Care with JIMMY BX7 Pro Max**
- Description: exact Microless-sourced wording provided by the user.

### 2. "No wet-mattress waiting time" highlighted block
- Keep the existing card, update copy to the user's exact text including the "re-sheeted shortly after service" line.

### 3. NEW visual block — "Why dry mattress care saves time"
Inserted directly after the headline/description column block, before the equipment feature cards. 4 cards, mobile-friendly grid (`sm:grid-cols-2 lg:grid-cols-4`), each with an icon:
1. **No soaked mattress** — `Droplets` (with slash style via muted color)
2. **No long drying delay** — `Clock4`
3. **Airbnb turnover friendly** — `Repeat2`
4. **Re-sheet sooner** — `BedDouble`

### 4. Equipment feature cards (6 cards)
Update the existing 6-card grid copy to the user's exact text:
1. 700W + 16kPa Suction — `Zap`
2. 65°C Graphene Hot Air — `Flame`
3. No Wet-Mattress Waiting — `Clock4`
4. UV-C + Negative Ion Support — `ShieldCheck`
5. Smart Dust Sensor — `Activity`
6. MIF Filtration + Dual Cyclone — `Wind`

Grid stays `sm:grid-cols-2 lg:grid-cols-3` for clean balance with 6 items.

### 5. "Why this is better than ordinary cleaning" comparison
Expand the existing list to all 7 user-supplied points:
- Not a generic home vacuum
- Designed for mattresses, sofas and fabric surfaces
- Dry process with no soaking
- No wet extraction and no long drying delay
- Strong time-saving benefit for Airbnb turnover days
- Smart dust sensor helps guide extra passes
- Combines suction, tapping, UV-C surface support, hot air, filtration and negative ion support

### 6. Allergy-aware certification wording
Tighten the existing block to the user's exact safer wording:
> The JIMMY BX7 Pro Max device model is manufacturer-listed as Allergy UK Foundation certified. FreshDream Mattress Care itself is not Allergy UK certified.

### 7. Image / device card
The right-column card already shows a neutral premium placeholder (`Wrench` icon + "Real device photo coming soon"). Keep as-is. Confirm no manufacturer image is imported anywhere in the section.

### 8. Safer claim audit
Sweep the section copy to ensure none of the forbidden phrases appear ("99.99%", "sterilizes", "medical-grade", "guaranteed", "completely clean", "FreshDream is Allergy UK certified"). Current copy already complies; verify after edit.

## Out of scope
- No changes to Services, Pricing, FAQ, Footer, or `content.ts` (FAQ already updated previously and uses safe wording).
- No new images generated; user will upload a real device photo later.

## Layout sketch

```text
[ Headline + description + No-wet-waiting block + Allergy note ]   [ Neutral device card ]
─────────────────────────────────────────────────────────────────────────────────────────
            Why dry mattress care saves time  (4 cards)
─────────────────────────────────────────────────────────────────────────────────────────
            Equipment specs  (6 feature cards)
─────────────────────────────────────────────────────────────────────────────────────────
            Why this is better than ordinary cleaning  (7-point list)
─────────────────────────────────────────────────────────────────────────────────────────
                              [ WhatsApp CTA ]
```

## Files touched
- `src/pages/Index.tsx` — only the equipment section (~lines 554–658).
