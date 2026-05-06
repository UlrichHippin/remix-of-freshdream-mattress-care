import { Wrench, ShieldCheck, Sun, Wind, Sparkles } from "lucide-react";

type Variant = "inline" | "card" | "band";

interface Props {
  variant?: Variant;
  className?: string;
}

/**
 * EquipmentBadge — communicates the JIMMY BX7 Pro as a professional
 * mattress-cleaning setup. Honest, no exaggerated claims.
 */
export default function EquipmentBadge({ variant = "inline", className = "" }: Props) {
  if (variant === "inline") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft ${className}`}
      >
        <Wrench className="h-3.5 w-3.5 text-accent" />
        Powered by JIMMY BX7 Pro
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div className={`card-soft p-6 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
              Professional setup
            </p>
            <h3 className="text-base font-bold text-primary">JIMMY BX7 Pro</h3>
          </div>
        </div>
          <p className="mt-3 text-sm text-muted-foreground">
            We use a specialized mattress-cleaning system designed for mattress
            hygiene and deep cleaning — not a generic home cleaner.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">Coming soon:</span> a BISSELL
            portable deep cleaner — soon part of our inventory for heavy stains
            and upholstery support.
          </p>
        <ul className="mt-4 grid gap-2 text-sm text-foreground sm:grid-cols-2">
          {[
            { i: ShieldCheck, t: "UV-C hygiene support" },
            { i: Wind, t: "Warm-air freshness support" },
            { i: Sparkles, t: "Deep dust & allergen pickup" },
            { i: Sun, t: "Built for mattress care" },
          ].map((it) => (
            <li key={it.t} className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-soft text-primary">
                <it.i className="h-3.5 w-3.5" />
              </span>
              {it.t}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // band
  return (
    <section className={`section bg-surface ${className}`}>
      <div className="container-tight grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow"><Wrench className="h-3.5 w-3.5" /> Professional equipment</p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            Specialized mattress-cleaning setup — JIMMY BX7 Pro.
          </h2>
          <p className="mt-3 text-muted-foreground">
            We invest in equipment built for mattress hygiene, not generic surface cleaning.
            That means better dust and allergen pickup, UV-C hygiene support and warm-air
            freshness support — so your beds get back in service faster and cleaner.
          </p>
          <p className="mt-3 inline-flex items-start gap-2 rounded-xl border border-dashed border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
            <span>
              <span className="font-semibold text-primary">Soon part of our inventory:</span>{" "}
              a BISSELL portable deep cleaner for heavy stain cases, upholstery
              support and more intensive spot treatment.
            </span>
          </p>
          <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {[
              { i: ShieldCheck, t: "UV-C hygiene support" },
              { i: Wind, t: "Hot-air drying support" },
              { i: Sparkles, t: "Deep dust & allergen pickup" },
              { i: Sun, t: "Designed for mattress-focused cleaning" },
            ].map((it) => (
              <li key={it.t} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-soft">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                  <it.i className="h-4 w-4" />
                </span>
                <span className="font-medium text-primary">{it.t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <div className="card-soft relative overflow-hidden p-8 text-center">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/70" aria-hidden="true" />
            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lift">
              <Wrench className="h-10 w-10" />
            </div>
            <p className="relative mt-4 text-[11px] font-bold uppercase tracking-wider text-accent">
              Core equipment
            </p>
            <h3 className="relative mt-1 text-xl font-bold text-primary">JIMMY BX7 Pro</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              A modern, mattress-focused cleaning system as part of our standard kit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
