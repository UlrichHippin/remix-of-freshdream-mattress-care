import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BedDouble, Sofa, Star, BadgeCheck, Sparkles,
  Repeat2, Zap, FileCheck2, AlertTriangle, Building2, Filter,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { hostPackages } from "@/data/content";
import hostPortfolio from "@/assets/host-portfolio.jpg";

type NeedKey = "turnovers" | "incidents" | "multiunit";

const needs: { key: NeedKey; label: string; icon: typeof Repeat2 }[] = [
  { key: "turnovers", label: "Recurring turnovers", icon: Repeat2 },
  { key: "incidents", label: "Guest incidents", icon: AlertTriangle },
  { key: "multiunit", label: "Multi-unit coordination", icon: Building2 },
];

// Map each package to which needs it best serves
const packageMatch: Record<string, Record<NeedKey, number>> = {
  "Starter Host Package": { turnovers: 2, incidents: 1, multiunit: 0 },
  "Multi-Unit Host Package": { turnovers: 2, incidents: 2, multiunit: 3 },
};

export default function HostPackagesPreview() {
  const [selected, setSelected] = useState<Set<NeedKey>>(new Set());

  const toggle = (k: NeedKey) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const recommendedName = useMemo(() => {
    if (selected.size === 0) {
      return hostPackages.find((p) => p.featured)?.name ?? hostPackages[0].name;
    }
    let bestName = hostPackages[0].name;
    let bestScore = -1;
    for (const p of hostPackages) {
      const m = packageMatch[p.name] ?? { turnovers: 0, incidents: 0, multiunit: 0 };
      const score = Array.from(selected).reduce((s, k) => s + (m[k] ?? 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestName = p.name;
      }
    }
    return bestName;
  }, [selected]);

  return (
    <section className="section relative overflow-hidden bg-surface">
      <div className="absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary-soft blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mx-auto"><Sparkles className="h-3.5 w-3.5" /> Host Packages</p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            Choose the right package for your hosting setup.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us what you need most and we'll highlight the best-matching package.
          </p>
        </div>

        {/* Inclusions filter */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary/70">
            <Filter className="h-4 w-4 text-accent" /> What do you need?
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {needs.map((n) => {
              const active = selected.has(n.key);
              return (
                <button
                  key={n.key}
                  type="button"
                  onClick={() => toggle(n.key)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? "border-accent bg-accent text-accent-foreground shadow-soft"
                      : "border-border bg-card text-primary hover:border-primary"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </button>
              );
            })}
            {selected.size > 0 && (
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="ml-auto text-xs font-semibold text-muted-foreground hover:text-primary"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {selected.size === 0
              ? "Select one or more needs to get a recommendation."
              : "Recommended package highlighted below."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {hostPackages.map((p, i) => {
            const isRecommended = p.name === recommendedName;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col overflow-hidden rounded-3xl bg-card p-7 shadow-card ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lift sm:p-9 ${
                  isRecommended ? "ring-2 ring-accent shadow-lift" : ""
                }`}
              >
                {isRecommended && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
                    <Star className="h-3 w-3" /> {selected.size > 0 ? "Recommended" : "Most popular"}
                  </span>
                )}
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-soft/60" aria-hidden="true" />

                <div className="relative">
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl shadow-soft ${
                    isRecommended
                      ? "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground"
                      : "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"
                  }`}>
                    {i % 2 === 0 ? <BedDouble className="h-6 w-6" /> : <Sofa className="h-6 w-6" />}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-primary">{p.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">{p.units}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                </div>

                <div className="relative mt-6 border-t border-border pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary/70">What's included</p>
                  <ul className="mt-4 space-y-3 text-sm">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-foreground">
                        <BadgeCheck className={`mt-0.5 h-5 w-5 shrink-0 ${isRecommended ? "text-accent" : "text-primary"}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-7 flex flex-wrap gap-2.5">
                  <WhatsAppButton className="flex-1" label="Get this package" />
                  <Link
                    to="/host-packages"
                    className="inline-flex h-11 items-center justify-center gap-1 rounded-full border-2 border-border px-4 text-sm font-semibold text-primary transition-colors hover:border-primary"
                  >
                    Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="relative mt-4 text-[11px] font-medium text-muted-foreground">
                  Custom quote based on units, location, and recurrence.
                </p>
              </div>
            );
          })}
        </div>

        {/* Compare strip */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3 sm:p-7">
          {[
            { icon: Repeat2, t: "Recurring scheduling", d: "Lock in regular turnovers." },
            { icon: Zap, t: "Priority response", d: "Faster slots when it matters." },
            { icon: FileCheck2, t: "Documented service", d: "Photo proof on every visit." },
          ].map((it) => (
            <div key={it.t} className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{it.t}</p>
                <p className="text-xs text-muted-foreground">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
