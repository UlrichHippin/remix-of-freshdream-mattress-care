import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  tone?: "primary" | "accent" | "neutral";
  badge?: string;
}

const toneMap = {
  primary: "from-primary/10 via-primary-soft to-accent-soft",
  accent: "from-accent-soft via-primary-soft to-accent-soft",
  neutral: "from-surface via-background to-primary-soft",
};

/**
 * Branded illustration container with soft gradient background,
 * decorative dots, and optional badge — for consistent visual frames.
 */
export default function IllustrationFrame({ src, alt, className, tone = "primary", badge }: Props) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br p-6 shadow-soft", toneMap[tone], className)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
      {badge && (
        <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-soft ring-1 ring-border backdrop-blur-sm">
          {badge}
        </span>
      )}
      <img
        src={src}
        alt={alt}
        width={1024}
        height={1024}
        loading="lazy"
        className="relative mx-auto h-auto w-full max-w-[420px] object-contain"
      />
    </div>
  );
}
