
# Optische Optimierungen mit WOW-Effekt

Ziel: Mehr Premium-Feeling und visuelle Wirkung — ohne neue Inhalte oder unbelegte Claims hinzuzufügen.

## 1. Hero — mehr Wirkung
- **Animated Mesh-Gradient** statt statischem Foto-Tint: zwei langsam rotierende Blobs (`accent/30`, `primary/20`) mit Blur, dahinter feines Dot-Pattern.
- **Logo-Reflexion**: dezenter Spiegel-Glow unter dem Logo + sanfter Konic-Gradient-Ring (rotierend, 20s).
- **Headline-Akzent**: das Wort *„Mattress & Upholstery Care"* erhält einen animierten Underline-Sweep (Gradient-Linie, die beim Mount einmal durchläuft).
- **Preisbox-Glow**: weiches `accent`-Glow + dünner Gradient-Border (statt simpler border).
- **Trust-Badge-Pulse**: erste drei Badges erhalten gestaffelten Fade-Up (Stagger 80ms).

## 2. Section-Übergänge
- **Wave/Curve-Divider** zwischen Hero → Trust-Strip und Packages → Process (SVG, sehr dezent, in Brand-Farben).
- **Soft Section-Backgrounds**: alternierende Sections bekommen radiale Akzent-Spots (top-right / bottom-left), nicht ganzflächig.

## 3. Karten & Hover (Packages, Fresh Sleep, Most Popular)
- **Glow-on-Hover**: bei Hover erscheint ein weicher `accent`-Glow hinter der Karte (`::before` mit blur + opacity transition).
- **Gradient-Border-Highlight** für „Most Popular" + „Fresh Sleep" (Conic-Gradient-Border statt einfarbig).
- **Icon-Micro-Bounce** beim Hover (scale + rotate auf Lucide-Icons).

## 4. Scroll-Reveals (global)
- Neue `useInView`-Hook + `.reveal` Utility (`opacity-0 translate-y-4 → 1`), automatisch auf Section-Headlines und Cards angewandt.
- Sehr dezent (300ms, einmalig) — kein Overload.

## 5. Trust-Strip (Section 2)
- Aktuell statische Inline-Liste → **horizontal scrollende Marquee** (sehr langsam, 40s) auf Mobile, statisch zentriert auf Desktop.
- Trennstriche zwischen Items als kleine `accent`-Dots.

## 6. WhatsApp-Floating-Button
- Glow-Ring intensivieren (zwei Ring-Pulse mit Versatz).
- Subtle Bounce alle ~6s (auf sich aufmerksam machen, ohne nervig zu werden).

## 7. Typographie-Feinschliff
- Headlines: leichter Letter-Tracking + optionaler Gradient-Text auf H2 („Choose Your Mattress Cleaning Package" etc.) — `bg-clip-text` mit `primary → accent`.
- Preise (`KES 1,999`, `KES 300`) bekommen Tabular-Nums + leichten Glow.

## 8. Bilder/Frames
- Bestehende `IllustrationFrame` bekommt zusätzlich einen rotierenden Conic-Ring an der Außenkante (sehr dezent, nur on hover).
- BeforeAfterSlider-Handle: animierter Pulse-Ring + größerer, runderer Drag-Knopf mit Schatten.

## 9. Mikro-Animationen Booking-Section
- Submit-Button: animierter Sheen (Light-Sweep alle 8s).
- Form-Inputs: Focus-Ring mit Gradient statt Solid.

## Geänderte/neue Dateien

```
src/index.css                   # neue Keyframes (sweep, conic-spin, glow-ring), .reveal utility, gradient-text helper
tailwind.config.ts              # neue animations: 'sweep', 'conic-spin', 'reveal'
src/hooks/use-in-view.ts        # NEU: IntersectionObserver Hook
src/components/SectionDivider.tsx  # erweitern: Wave-Variante
src/pages/Index.tsx             # Hero-Mesh, Underline-Sweep, Section-Akzente, Reveal-Klassen
src/components/FloatingWhatsApp.tsx  # Doppel-Pulse-Ring
src/components/BeforeAfterSlider.tsx # animierter Handle
src/components/QuickQuote.tsx / BookingSection.tsx  # Sheen-Button, Gradient-Focus
src/components/IllustrationFrame.tsx  # optionaler Conic-Ring
```

## Bewusst NICHT
- Keine erfundenen Stats oder Testimonials.
- Keine schweren Libraries (Framer Motion etc.) — alles CSS-basiert.
- Keine Layout-Umstellung, nur Polish.
- Brand-Name bleibt **FreshDream Mattress Care**.

Soll ich loslegen?
