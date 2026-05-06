import { useRef, useState, useCallback } from "react";
import { Camera } from "lucide-react";

interface Props {
  beforeSrc?: string;
  afterSrc?: string;
}

const placeholderBefore =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%23a89b8a'/><stop offset='1' stop-color='%236b5d4a'/></linearGradient></defs><rect width='800' height='600' fill='url(%23g)'/><text x='50%' y='50%' fill='white' font-family='sans-serif' font-size='38' font-weight='700' text-anchor='middle' opacity='0.7'>Before — dust &amp; stains</text></svg>`,
  );

const placeholderAfter =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%23eaf2f7'/><stop offset='1' stop-color='%23c7e3d6'/></linearGradient></defs><rect width='800' height='600' fill='url(%23g)'/><text x='50%' y='50%' fill='%230F2A4A' font-family='sans-serif' font-size='38' font-weight='700' text-anchor='middle' opacity='0.8'>After — fresh &amp; clean</text></svg>`,
  );

export default function BeforeAfterSlider({ beforeSrc = placeholderBefore, afterSrc = placeholderAfter }: Props) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <section className="section">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center"><Camera className="h-3.5 w-3.5" /> Before &amp; After</p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">See the FreshDream difference</h2>
          <p className="mt-3 text-muted-foreground">Drag the slider to compare. Real photos available on WhatsApp.</p>
        </div>

        <div
          ref={wrapRef}
          className="relative mx-auto mt-10 aspect-[4/3] w-full max-w-3xl select-none overflow-hidden rounded-3xl border border-border shadow-lift"
          onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
          onMouseMove={(e) => { if (dragging.current) updateFromClientX(e.clientX); }}
          onMouseUp={() => { dragging.current = false; }}
          onMouseLeave={() => { dragging.current = false; }}
          onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
          onTouchMove={(e) => { if (dragging.current) updateFromClientX(e.touches[0].clientX); }}
          onTouchEnd={() => { dragging.current = false; }}
        >
          <img src={afterSrc} alt="After cleaning" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={beforeSrc} alt="Before cleaning" className="absolute inset-0 h-full w-full object-cover" />
          </div>

          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-soft">Before</span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">After</span>

          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lift"
            style={{ left: `${pos}%` }}
          >
            <div className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 cursor-ew-resize place-items-center rounded-full bg-white text-primary shadow-lift ring-2 ring-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 6L4 12l5 6" /><path d="M15 6l5 6-5 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
