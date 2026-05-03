import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { hostPackages } from "@/data/content";
import { ClipboardCheck, Repeat, ShieldCheck, Building2, AlarmClock, FileText } from "lucide-react";

export default function HostPackages() {
  return (
    <PageLayout
      title="Host Packages — FreshDream Mattress Care"
      description="Structured mattress and upholstery cleaning packages for Airbnb hosts, serviced apartments, and multi-unit operators in Nairobi. Starter and Multi-Unit options."
    >
      <section className="border-b border-border bg-gradient-hero">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">Host Packages</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
            Predictable, repeat-property support — not one-off cleans.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Repeat properties run on schedules, check-ins and surprises. Our packages are built around
            how hosts and property managers actually operate.
          </p>
          <div className="mt-6"><WhatsAppButton label="Request a tailored package" /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { i: Repeat, t: "Repeat turnovers", d: "Recurring schedules so you stop coordinating cleaners every week." },
              { i: AlarmClock, t: "Urgent guest incidents", d: "Priority response when something goes wrong before check-in." },
              { i: Building2, t: "Multi-unit support", d: "Consistent service across the portfolio with unit-level history." },
              { i: FileText, t: "Documented repeat visits", d: "Photo proof and what-was-treated notes for every visit." },
              { i: ClipboardCheck, t: "Bundled care", d: "Mattress + upholstery handled together — fewer vendors, less hassle." },
              { i: ShieldCheck, t: "Custom inquiries", d: "Tailored quotes instead of rigid public pricing — built around your portfolio." },
            ].map((it) => (
              <div key={it.t} className="card-soft p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><it.i className="h-5 w-5" /></div>
                <h3 className="mt-4 font-semibold text-primary">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-2">
            {hostPackages.map((p) => (
              <div key={p.name} className={`card-soft p-8 ${p.featured ? "ring-2 ring-accent" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-primary">{p.name}</h3>
                  {p.featured && <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Most popular</span>}
                </div>
                <p className="mt-1 text-sm font-semibold text-accent">{p.units}</p>
                <p className="mt-4 text-muted-foreground">{p.summary}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
                  ))}
                </ul>
                <div className="mt-7">
                  <WhatsAppButton
                    label="Discuss this package"
                    message={`Hello, I'm interested in the ${p.name}.\nNumber of units:\nLocations:\nFrequency needed:\nNotes:`}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            We don't publish rigid prices — every host portfolio is different. Send us your details and we'll come back with a tailored proposal.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
