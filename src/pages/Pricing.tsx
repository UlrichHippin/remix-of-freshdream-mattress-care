import { Link } from "react-router-dom";
import { Bed, Sofa, Sparkles, Info, Check, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { pricingMattress, pricingAddOns, pricingUpholstery, pricingNotes } from "@/data/content";

export default function Pricing() {
  return (
    <PageLayout
      title="Pricing — FreshDream Mattress Care"
      description="Transparent mattress and upholstery cleaning prices in KES for Airbnb hosts and short-stay properties in Nairobi. Add-ons, host package quotes and emergency call-out pricing."
    >
      {/* Hero */}
      <section className="border-b border-border bg-gradient-hero">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
            Clear pricing for hosts, serviced apartments, and short-stay properties.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Practical, transparent and easy to understand. Final quotes may vary depending on mattress
            size, condition, location, urgency, and whether the booking includes multiple items or units.
          </p>
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
              <div key={m.size} className={`card-soft p-7 ${m.featured ? "ring-2 ring-accent" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-primary">{m.size}</h3>
                  {m.featured && (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                      Most common
                    </span>
                  )}
                </div>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Freshen-Up</dt>
                    <dd className="mt-1 text-xl font-bold text-primary">{m.freshen}</dd>
                  </div>
                  <div className="border-t border-border pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deep Clean</dt>
                    <dd className="mt-1 text-xl font-bold text-primary">{m.deep}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Special treatment add-ons</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Stain, odor and urgency add-ons.</h2>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {pricingAddOns.map((a) => (
                <li key={a.t} className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm font-medium text-foreground">{a.t}</span>
                  <span className="text-sm font-bold text-primary">{a.p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow"><Sofa className="h-3.5 w-3.5" /> Upholstery / add-ons</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Sofas, pillows and chairs.</h2>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {pricingUpholstery.map((a) => (
                <li key={a.t} className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm font-medium text-foreground">{a.t}</span>
                  <span className="text-sm font-bold text-primary">{a.p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Host package pricing */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow">Host package pricing</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Quoted individually.</h2>
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                {[
                  "Custom pricing available for repeat properties",
                  "Multi-unit rates available on request",
                  "Host packages tailored to number of units, frequency, and service needs",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton label="Ask about host packages" />
              <Link to="/host-packages" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary-soft">
                View packages <ArrowRight className="h-4 w-4" />
              </Link>
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
              <li key={n} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4">
                <Check className="mt-0.5 h-4 w-4 text-accent" /> <span className="text-foreground">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft overflow-hidden bg-primary p-10 text-primary-foreground">
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
      </section>
    </PageLayout>
  );
}
