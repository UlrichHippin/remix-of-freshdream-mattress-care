import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export default function StatCounter({ icon: Icon, end, suffix = "", prefix = "", label, decimals = 0 }: Props) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(end * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, started]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString();

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-soft">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
