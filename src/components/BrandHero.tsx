import { ShieldCheck, Star, MapPin } from "lucide-react";
import logoMark from "@/assets/brand/logo-main.png";

export default function BrandHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary-soft via-background to-accent-soft/40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />

      <div className="container-tight relative py-16 text-center sm:py-20">
        <div className="relative mx-auto inline-flex items-center justify-center">
          <span className="absolute inset-0 -z-10 mx-auto h-full w-full rounded-full bg-accent/20 blur-3xl animate-glow-pulse" aria-hidden />
          <img
            src={logoMark}
            alt="FreshDream Mattress Care"
            width={520}
            height={520}
            className="h-44 w-auto animate-float drop-shadow-2xl sm:h-56 lg:h-64"
          />
        </div>

        <h2 className="mt-8 text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Nairobi's Mattress Hygiene Specialists
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Dry process. Documented results. Honest pricing. Built for Airbnb hosts, homes and serviced apartments.
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            { i: ShieldCheck, t: "Trusted Process", d: "JIMMY BX7 Pro · no soaking" },
            { i: Star, t: "4.9★ Hosts", d: "Real WhatsApp reviews" },
            { i: MapPin, t: "Local in Roysambu", d: "Serving all of Nairobi" },
          ].map((it) => (
            <div
              key={it.t}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-4 text-left shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <it.i className="h-4 w-4" />
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
