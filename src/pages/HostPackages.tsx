import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import { hostPackages } from "@/data/content";
import { ClipboardCheck, Repeat, ShieldCheck, Building2, AlarmClock, FileText, Star } from "lucide-react";
import illustMultiUnit from "@/assets/illust-multi-unit.png";
import illustHostSupport from "@/assets/illust-host-support.png";
import hospitalitySuite from "@/assets/hospitality-suite.jpg";

export default function HostPackages() {
  return (
    <PageLayout
      title="Host Packages — FreshDream Mattress Care"
      description="Structured mattress and upholstery cleaning packages for Airbnb hosts, serviced apartments, and multi-unit operators in Nairobi. Starter and Multi-Unit options."
    >
      {/* Hero with illustration */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
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
          <div className="lg:col-span-5">
            <IllustrationFrame src={illustMultiUnit} alt="Multi-unit hosting" tone="primary" badge="Multi-unit ready" />
          </div>
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
              <div key={it.t} className="card-soft group relative overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-soft/60 transition-transform group-hover:scale-110" aria-hidden="true" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <it.i className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 font-semibold text-primary">{it.t}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Visual story block */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <IllustrationFrame src={illustHostSupport} alt="WhatsApp host support" tone="accent" badge="Direct line" />
          <div>
            <p className="eyebrow"><Repeat className="h-3.5 w-3.5" /> How packages help</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              Less vendor juggling. More predictable turnovers.
            </h2>
            <p className="mt-3 text-muted-foreground">
              A host package gives you a single, briefed team that already knows your units, your
              standards, and your check-in rhythm — backed by photo documentation on every visit.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "One WhatsApp thread for all your units",
                "Recurring slots reserved on your schedule",
                "Unit-by-unit history kept on file",
                "Priority emergency response across the portfolio",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-foreground"><ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-2">
            {hostPackages.map((p) => (
              <div key={p.name} className={`card-soft relative overflow-hidden p-8 ${p.featured ? "ring-2 ring-accent shadow-lift" : ""}`}>
                {p.featured && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    <Star className="h-3 w-3" /> Most popular
                  </span>
                )}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft/60" aria-hidden="true" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 text-2xl font-bold text-primary">{p.name}</h3>
                <p className="relative mt-1 text-sm font-semibold text-accent">{p.units}</p>
                <p className="relative mt-4 text-muted-foreground">{p.summary}</p>
                <ul className="relative mt-6 space-y-2.5 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
                  ))}
                </ul>
                <div className="relative mt-7">
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
