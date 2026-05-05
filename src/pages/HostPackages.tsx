import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import {
  ClipboardCheck, Repeat, ShieldCheck, Building2, AlarmClock, FileText,
  Star, ArrowRight, Camera, CalendarClock, Sparkles, MessageCircle, Bed, Sofa, Droplets,
} from "lucide-react";
import illustPortfolio from "@/assets/illust-portfolio.png";
import EquipmentBadge from "@/components/EquipmentBadge";

const benefits = [
  { i: CalendarClock, t: "Predictable turnaround", d: "Booked-in slots that match your check-in rhythm." },
  { i: Repeat, t: "Easier scheduling", d: "One thread, one team, no weekly vendor hunting." },
  { i: ShieldCheck, t: "Consistent quality", d: "Same standard across every unit in your portfolio." },
  { i: Camera, t: "Photo-documented", d: "Before / after on every visit, kept on file." },
  { i: FileText, t: "Custom pricing", d: "Quoted by frequency, unit count and service depth." },
];

const packages = [
  {
    name: "Starter Host Package",
    forWho: "For 1–2 units",
    icon: Building2,
    summary:
      "For solo hosts who want a reliable partner for routine turnover cleaning.",
    bullets: [
      "Recurring mattress refresh",
      "Spot stain & odor treatment",
      "Before / after photos",
      "Priority WhatsApp scheduling",
    ],
    pricing: "Custom quote",
    featured: false,
  },
  {
    name: "Growth Host Package",
    forWho: "For 3–5 units",
    icon: Sparkles,
    summary:
      "For growing hosts and small operators who need consistent quality across multiple listings.",
    bullets: [
      "Recurring mattress + upholstery care",
      "Stain & odor treatment included",
      "Unit-by-unit service history",
      "Same-day support where possible",
      "One WhatsApp thread for all units",
    ],
    pricing: "Custom quote",
    featured: true,
  },
  {
    name: "Portfolio / Multi-Unit",
    forWho: "For 6+ units",
    icon: Repeat,
    summary:
      "For property managers, serviced apartments and multi-unit portfolios that need a reliable backbone.",
    bullets: [
      "Tailored recurring schedule",
      "Priority emergency response",
      "Bundled mattress + upholstery + odor",
      "Portfolio-wide reporting & photos",
      "Account contact for the team",
    ],
    pricing: "Tailored proposal",
    featured: false,
  },
];

const includes = [
  { i: Bed, t: "Mattress cleaning" },
  { i: Sofa, t: "Upholstery / sofa cleaning" },
  { i: Droplets, t: "Stain & odor treatment" },
  { i: Camera, t: "Before / after photos" },
  { i: CalendarClock, t: "Recurring schedule" },
  { i: AlarmClock, t: "Emergency support before check-in" },
];

function packageMessage(name: string) {
  return `Hello, I'm interested in the ${name}.\nNumber of units:\nLocations / area:\nProperty type:\nPreferred frequency:\nNotes:`;
}

const portfolioMessage = `Hello, I'd like a portfolio quote for host packages.
Name:
Number of units:
Area in Nairobi:
Type of property:
Preferred frequency:
Photos / notes:`;

export default function HostPackages() {
  return (
    <PageLayout
      title="Host Packages — FreshDream Mattress Care"
      description="Custom recurring and multi-unit cleaning plans for Airbnb hosts, serviced apartments and short-stay properties in Nairobi. Tailored quotes, documented service."
    >
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow"><Building2 className="h-3.5 w-3.5" /> Host packages</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Host packages for repeat properties.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Custom cleaning plans for Airbnb hosts, serviced apartments and multi-unit
              portfolios in Nairobi.
            </p>
            <p className="mt-2 max-w-2xl text-sm font-medium text-primary/80">
              Built for recurring bookings, fast turnaround and documented service.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                Request a portfolio quote <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppButton size="lg" label="Book on WhatsApp" message={portfolioMessage} />
            </div>
            <div className="mt-5">
              <EquipmentBadge variant="inline" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <IllustrationFrame
              src={illustPortfolio}
              alt="Multi-unit host portfolio illustration"
              tone="primary"
              badge="Multi-unit ready"
            />
          </div>
        </div>
      </section>

      {/* Why host packages */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Why host packages</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
              Built for hosts who run repeat properties.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {benefits.map((b) => (
              <div key={b.t} className="card-soft p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <b.i className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-primary">{b.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package cards */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><Building2 className="h-3.5 w-3.5" /> Choose your starting point</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
              Three package types, all custom-quoted.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pricing is tailored to your portfolio, frequency and service depth.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`card-soft relative flex flex-col overflow-hidden p-7 ${p.featured ? "ring-2 ring-accent shadow-lift" : ""}`}
              >
                {p.featured && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    <Star className="h-3 w-3" /> Most popular
                  </span>
                )}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft/50" aria-hidden="true" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 text-xl font-bold text-primary">{p.name}</h3>
                <p className="relative mt-1 text-sm font-semibold text-accent">{p.forWho}</p>
                <p className="relative mt-3 text-sm text-muted-foreground">{p.summary}</p>
                <ul className="relative mt-5 flex-1 space-y-2 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-foreground">
                      <ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-6 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pricing</p>
                  <p className="mt-1 text-base font-bold text-primary">{p.pricing}</p>
                  <div className="mt-4">
                    <WhatsAppButton label="Request this package" message={packageMessage(p.name)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What can be included */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><ClipboardCheck className="h-3.5 w-3.5" /> What can be included</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Mix the services your units need.</h2>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((it) => (
              <li
                key={it.t}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <it.i className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-primary">{it.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote request */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="card-soft grid gap-8 overflow-hidden p-7 md:grid-cols-12 md:p-10">
            <div className="md:col-span-7">
              <p className="eyebrow"><MessageCircle className="h-3.5 w-3.5" /> Portfolio quote</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
                Tell us about your portfolio.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Share a few basics and we'll come back with a realistic recurring or multi-unit quote.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground sm:grid-cols-2">
                {[
                  "Your name",
                  "WhatsApp number",
                  "Number of units",
                  "Area in Nairobi",
                  "Type of property",
                  "Preferred frequency",
                  "Short note / photos",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  Open the quote form <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton size="lg" label="WhatsApp now" message={portfolioMessage} />
              </div>
            </div>
            <div className="md:col-span-5">
              <IllustrationFrame
                src={illustPortfolio}
                alt="Portfolio illustration"
                tone="accent"
                badge="Tailored quotes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-10 text-primary-foreground shadow-lift sm:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Let's build the right plan for your units.
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Send your portfolio details and we'll reply with a realistic recurring or
                multi-unit quote.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary shadow-soft hover:bg-primary-foreground/90"
                >
                  Request a portfolio quote
                </Link>
                <WhatsAppButton size="lg" label="WhatsApp now" message={portfolioMessage} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
