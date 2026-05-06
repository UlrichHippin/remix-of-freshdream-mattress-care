# Homepage-Aufwertung: Brand-Präsenz & Eyecatcher

Ziel: Sofortige visuelle Wirkung, klare Markenpräsenz mit großem Logo, mehr Vertrauen durch animierte Trust-Elemente — ohne den cleanen Premium-Look zu verlieren.

## 1. Großes Brand-Logo (XXL)

**Hero-Erweiterung:** Das `logoMark` (Square-Logo) wird im Hero auf Desktop rechts neben Headline + Preisbox als großes visuelles Anker-Element eingebaut (ca. 320–380px), mit:
- Sanftem Glow-Halo (radial gradient `bg-accent/20` blur)
- Floating-Animation (subtiles Auf/Ab, 6s ease-in-out infinite)
- Schwebenden Trust-Badges außen herum (M-PESA · JIMMY BX7 · Roysambu)

**Mobile:** Logo zentriert über Headline, ca. 200px, gleiche Glow-Behandlung.

**Neue Brand-Section** (nach Hero, vor Quick Quote):
- Volle Breite, dezenter Gradient-Hintergrund (`--gradient-band` invertiert)
- Logo XXL zentriert (~200px) + Claim „Nairobi's Mattress Hygiene Specialists"
- Drei Trust-Pillars darunter mit Icons (Shield, Star, MapPin)

## 2. Eyecatcher-Pakete (alle vier)

**a) Animated Stat-Counter** — neue Section nach Brand-Section
- 4 Counter mit Count-Up bei Viewport-Eintritt: „500+ Mattresses Cleaned", „4.9★ Rating", „24h WhatsApp Reply", „6 Nairobi Zones"
- Große Zahlen in `text-primary`, Icons darüber, Hover-Lift

**b) Process-Timeline** — ersetzt/ergänzt bestehenden „How it works"
- 4 Schritte horizontal (Desktop) / vertikal (Mobile) mit:
  - Nummerierte Kreise mit Gradient (`primary → accent`)
  - Verbindungslinie (gestrichelt, animiert beim Scroll)
  - Icons: MessageCircle → Calculator → Sparkles → Camera
  - Hover-Scale + sanfter Pulse auf aktivem Schritt

**c) Floating Trust-Badges** im Hero
- 3–4 Pills die um das Logo „schweben" (absolute positioning, leichte float-Animation mit Delay-Versatz)
- Inhalte: „M-PESA Accepted", „JIMMY BX7 Pro", „Based in Roysambu", „4.9★ Hosts"

**d) Before/After-Slider** — neue Section vor Testimonials
- Interaktiver Drag-Slider (vanilla, kein extra package)
- Platzhalter-Bilder zunächst (Hinweis: User kann später echte Fotos einfügen)
- Label-Pills „Before" / „After" auf den Bildern

## 3. Visueller Stil: Mittel & lebendig

Globale Verfeinerungen in `index.css`:
- Neue Keyframes: `float` (translateY 6s), `glow-pulse` (opacity 4s), `count-up`
- Subtile Pattern-Overlays (radial dots) hinter Brand- und Stat-Sections
- Stärkere Gradient-Blobs als Background-Decoration in Hero (zwei große blurred circles in `accent/15` und `primary/10`)
- Card-Hover: leichter Lift (`hover:-translate-y-1`) + Glow-Border auf Package-Cards

## 4. Technische Umsetzung

**Neue Komponenten:**
- `src/components/BrandHero.tsx` — Brand-Section mit XXL-Logo
- `src/components/StatCounter.tsx` — wiederverwendbarer animierter Counter (IntersectionObserver)
- `src/components/StatsBand.tsx` — Section mit 4 StatCountern
- `src/components/ProcessTimeline.tsx` — 4-Schritt-Timeline mit Animationen
- `src/components/BeforeAfterSlider.tsx` — Drag-Vergleichs-Slider
- `src/components/FloatingBadges.tsx` — Hero-Trust-Pills

**Geänderte Dateien:**
- `src/pages/Index.tsx` — neue Sections einfügen, Hero-Layout anpassen für großes Logo
- `tailwind.config.ts` — `float`, `glow-pulse` Keyframes/Animations
- `src/index.css` — Pattern-Utility, Glow-Halo Helper

**Logo-Asset:** Bestehendes `logoMark` aus `src/assets/brand/` wird verwendet (bereits hochauflösend). Kein neues Asset nötig.

## Reihenfolge der Sections (neu)

```text
1. Hero (mit XXL-Logo + Floating Badges)
2. Brand-Section (Logo + Claim + Trust-Pillars)  ← NEU
3. Stats-Band (4 Counter)                         ← NEU
4. Opening Offer
5. Quick Quote
6. Packages
7. Process-Timeline                               ← NEU/ersetzt
8. Equipment
9. Before/After-Slider                            ← NEU
10. Testimonials, FAQ, Booking, Footer
```

## Was bewusst NICHT gemacht wird

- Keine Confetti / Glow-Overkill (bleibt premium)
- Keine echten Before/After-Bilder generiert (Platzhalter, da User echte Kundenfotos hat)
- Keine Logo-Neugenerierung (bestehendes Asset reicht in XXL)
- Keine Änderung an Pricing/Logic/Booking-Flow
