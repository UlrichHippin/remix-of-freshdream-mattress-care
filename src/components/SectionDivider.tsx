/**
 * Branded SVG separator — soft wave with brand gradient dots.
 * Use between major sections for visual rhythm.
 */
export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative h-12 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${flip ? "rotate-180" : ""}`}
      >
        <defs>
          <linearGradient id="sd-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
          fill="url(#sd-grad)"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="h-1 w-12 rounded-full bg-primary/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="h-1 w-12 rounded-full bg-primary/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
    </div>
  );
}
