import { ShieldCheck, MapPin, MessageCircle, BedDouble } from "lucide-react";

const items = [
  { i: ShieldCheck, t: "Trusted Process" },
  { i: MapPin, t: "Local in Roysambu" },
  { i: MessageCircle, t: "WhatsApp Reviews" },
  { i: BedDouble, t: "Airbnb Friendly" },
];

export default function BrandHero() {
  return (
    <section className="border-b border-border bg-gradient-to-br from-primary-soft via-background to-accent-soft/40">
      <div className="container-tight py-8 sm:py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.t}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <it.i className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-primary">{it.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
