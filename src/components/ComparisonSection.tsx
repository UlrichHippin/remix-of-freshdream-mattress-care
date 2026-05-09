import { Check, X, Sparkles, Droplets, Zap } from "lucide-react";

type Col = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  points: { text: string; positive: boolean }[];
};

const cols: Col[] = [
  {
    title: "Normal Vacuum",
    icon: Zap,
    points: [
      { text: "Removes visible dust", positive: true },
      { text: "No UV-C support", positive: false },
      { text: "No heated air", positive: false },
      { text: "No smart dust detection", positive: false },
      { text: "Not designed mainly for mattresses", positive: false },
    ],
  },
  {
    title: "Wet Shampoo Cleaning",
    icon: Droplets,
    points: [
      { text: "Useful for heavy stains", positive: true },
      { text: "Mattress gets wet", positive: false },
      { text: "Needs drying time", positive: false },
      { text: "Not ideal for fast Airbnb turnover", positive: false },
    ],
  },
  {
    title: "FreshDream Dry Hygiene Refresh",
    icon: Sparkles,
    highlight: true,
    points: [
      { text: "No wet mattress", positive: true },
      { text: "No drying time", positive: true },
      { text: "UV-C hygiene support", positive: true },
      { text: "65°C heated air", positive: true },
      { text: "Smart dust detection", positive: true },
      { text: "Tapping brushroll + dry suction", positive: true },
      { text: "Fast room turnaround", positive: true },
    ],
  },
];

export default function ComparisonSection() {
  return (
    <section id="comparison" className="section bg-background scroll-mt-24">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <Sparkles className="h-3.5 w-3.5" /> Why FreshDream
          </p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            <span className="text-gradient-brand">More Than a Normal Vacuum</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            FreshDream combines dry suction, tapping, heated air, UV-C support and smart dust detection — without soaking the mattress.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cols.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={
                  c.highlight
                    ? "relative flex flex-col rounded-2xl border-2 border-accent bg-card p-6 shadow-lift ring-2 ring-accent/30"
                    : "flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
                }
              >
                {c.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
                    <Sparkles className="h-3 w-3" /> Recommended
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div
                    className={
                      c.highlight
                        ? "grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"
                        : "grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{c.title}</h3>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {c.points.map((p) => (
                    <li key={p.text} className="flex items-start gap-2.5 text-sm">
                      {p.positive ? (
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check className="h-3 w-3" />
                        </span>
                      ) : (
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                          <X className="h-3 w-3" />
                        </span>
                      )}
                      <span
                        className={
                          p.positive
                            ? c.highlight
                              ? "font-medium text-primary"
                              : "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-surface p-4 text-center text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Honest note:</span> Wet cleaning can be useful for heavy stains.
          FreshDream's dry hygiene refresh is ideal when you need a fast, fresh-feeling mattress without soaking or long drying time.
        </p>
      </div>
    </section>
  );
}
