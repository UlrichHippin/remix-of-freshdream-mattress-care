import { Link } from "react-router-dom";
import { Bed, Sofa, Sparkles, Info, Check, ArrowRight, ShieldCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import { pricingMattress, pricingAddOns, pricingUpholstery, pricingNotes } from "@/data/content";
import illustGuestReady from "@/assets/illust-guest-ready.png";
import illustUpholstery from "@/assets/illust-upholstery.png";
import illustMultiUnit from "@/assets/illust-multi-unit.png";

const sizeIcons: Record<string, string> = {
  "Single Mattress": "S",
  "Double / Queen Mattress": "Q",
  "King Mattress": "K",
};

export default function Pricing() {
  return (
    <PageLayout
      title="Pricing — FreshDream Mattress Care"
      description="Transparent mattress and upholstery cleaning prices in KES for Airbnb hosts and short-stay properties in Nairobi. Add-ons, host package quotes and emergency call-out pricing."
    >
      {/* Hero with illustration */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Clear pricing for hosts, serviced apartments, and short-stay properties.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Practical, transparent and easy to understand. Final quotes may vary depending on mattress
              size, condition, location, urgency, and whether the booking includes multiple items or units.
            </p>
          </div>
          <div className="lg:col-span-5">
            <IllustrationFrame src={illustGuestReady} alt="Guest-ready bedroom" tone="primary" badge="KES · transparent" />
          </div>
        </div>
      </section>

      {/* Mattress cleaning */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><Bed className="h-3.5 w-3.5" /> Mattress cleaning</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Per-mattress pricing.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pricingMattress.map((m) => (
              <div
                key={m.size}
                className={`card-soft relative overflow-hidden p-7 transition-all hover:-translate-y-1 hover:shadow-lift ${m.featured ? "ring-2 ring-accent" : ""}`}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/70" aria-hidden="true" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-2xl font-bold text-primary-foreground shadow-soft">
                      {sizeIcons[m.size]}
                    </div>
                    <h3 className="text-lg font-bold text-primary">{m.size}</h3>
                  </div>
                  {m.featured && (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                      Most common
                    </span>
                  )}
                </div>
                <dl className="relative mt-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-3 rounded-xl bg-surface px-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Freshen-Up</dt>
                    <dd className="text-base font-bold text-primary">{m.freshen}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 px-4 py-3 text-primary-foreground">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Deep Clean</dt>
                    <dd className="text-base font-bold">{m.deep}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Add-ons */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Special treatment add-ons</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Stain, odor and urgency add-ons.</h2>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
              {pricingAddOns.map((a) => (
                <li key={a.t} className="flex items-center justify-between gap-4 p-4">
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    {a.t}
                  </span>
                  <span className="text-sm font-bold text-primary">{a.p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4">
              <IllustrationFrame src={illustUpholstery} alt="Upholstered sofa" tone="accent" className="!p-3" />
            </div>
            <p className="eyebrow"><Sofa className="h-3.5 w-3.5" /> Upholstery / add-ons</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Sofas, pillows and chairs.</h2>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
              {pricingUpholstery.map((a) => (
                <li key={a.t} className="flex items-center justify-between gap-4 p-4">
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
                      <Sofa className="h-4 w-4" />
                    </span>
                    {a.t}
                  </span>
                  <span className="text-sm font-bold text-primary">{a.p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Host package pricing — illustrated */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft grid gap-8 overflow-hidden p-6 md:grid-cols-12 md:p-8">
            <div className="md:col-span-5">
              <IllustrationFrame src={illustMultiUnit} alt="Multi-unit hosting" tone="primary" badge="Host packages" />
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow"><ShieldCheck className="h-3.5 w-3.5" /> Host package pricing</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Quoted individually for your portfolio.</h2>
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                {[
                  "Custom pricing available for repeat properties",
                  "Multi-unit rates available on request",
                  "Host packages tailored to number of units, frequency, and service needs",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton label="Ask about host packages" />
                <Link to="/host-packages" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary-soft">
                  View packages <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="section bg-surface">
        <div className="container-tight max-w-3xl">
          <p className="eyebrow"><Info className="h-3.5 w-3.5" /> Pricing notes</p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {pricingNotes.map((n) => (
              <li key={n} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 shadow-soft">
                <Check className="mt-0.5 h-4 w-4 text-accent" /> <span className="text-foreground">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft relative overflow-hidden bg-gradient-band p-10 text-primary-foreground">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready for a quote?</h2>
              <p className="mt-3 max-w-2xl text-primary-foreground/80">
                Send your location, mattress size, photos and next check-in time. We'll come back with a
                realistic price and an available time slot.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton size="lg" />
                <Link to="/host-packages" className="inline-flex h-12 items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90">
                  Ask about host packages
                </Link>
                <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
