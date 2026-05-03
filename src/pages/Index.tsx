import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, Clock4, ShieldCheck, Wrench, MapPin, AlarmClock,
  PhoneCall, MessageSquareText, Sparkles, ClipboardCheck,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, faqs, hostPackages } from "@/data/content";
import { site } from "@/config/site";
import heroImg from "@/assets/hero-bed.jpg";
import beforeAfterImg from "@/assets/before-after.jpg";

export default function Home() {
  return (
    <PageLayout
      title="FreshDream Mattress Care — Mattress & Upholstery Cleaning for Airbnb Hosts in Nairobi"
      description="Specialist mattress and upholstery cleaning for Airbnb hosts and short-stay properties in Nairobi. Documented service, fast WhatsApp booking, guest-ready turnaround. Based in Roysambu."
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow"><MapPin className="h-3.5 w-3.5" /> Based in Roysambu, Nairobi</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
              Mattress &amp; Upholstery Cleaning for Airbnb Hosts in Nairobi.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-foreground/80">
              Fast, professional stain and odor treatment with documented service and guest-ready turnaround.
            </p>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              We help Airbnb hosts, serviced apartments, and short-stay property managers keep mattresses
              and upholstered furniture clean, fresh, and ready for the next guest.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" />
              <Link
                to="/host-packages"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
              >
                View Host Packages
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent-soft blur-2xl" />
              <img
                src={heroImg}
                alt="Clean, freshly made bed in a short-stay apartment"
                width={1600}
                height={1100}
                className="rounded-[1.5rem] border border-border object-cover shadow-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust highlights */}
      <section className="border-y border-border bg-surface">
        <div className="container-tight grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MessageSquareText, t: "Fast WhatsApp response" },
            { icon: Camera, t: "Before/after photo proof" },
            { icon: Clock4, t: "Same-day or next-day support" },
            { icon: ShieldCheck, t: "Built for Airbnb turnovers" },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <it.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-primary">{it.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why hosts choose us */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Why hosts choose us</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              Specialist support for short-stay properties — not generic cleaning.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We work the way hosts actually operate: tight check-ins, recurring units, and zero room
              for guesswork. Honest assessments, photo documentation, and controlled-moisture cleaning
              to help reduce drying time.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { t: "Hospitality-aware", d: "We schedule around your check-ins and treat every unit like a guest is arriving tonight." },
              { t: "Documented service", d: "Before/after photos, what was treated, and clear result communication on every job." },
              { t: "Honest expectations", d: "No miracle promises. We tell you straight what stains can realistically improve." },
              { t: "Repeat-property ready", d: "Recurring schedules, consistent crew, and unit-by-unit history." },
              { t: "Emergency response", d: "Urgent help before next check-in when something goes wrong on turnover day." },
              { t: "Controlled-moisture cleaning", d: "Process designed to help reduce drying time so beds get back in service faster." },
            ].map((it) => (
              <div key={it.t} className="card-soft p-6">
                <h3 className="font-semibold text-primary">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow"><Wrench className="h-3.5 w-3.5" /> Services</p>
              <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Built around the host workflow.</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
              See all services →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services" className="card-soft group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Host Packages preview */}
      <section className="section">
        <div className="container-tight">
          <div className="grid items-end justify-between gap-4 md:flex">
            <div className="max-w-2xl">
              <p className="eyebrow">Host Packages</p>
              <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Structured support for repeat properties.</h2>
              <p className="mt-3 text-muted-foreground">
                Recurring turnovers, urgent guest incidents, multi-unit coordination — bundled into a
                package so you stop hunting for cleaners every week.
              </p>
            </div>
            <Link to="/host-packages" className="text-sm font-semibold text-primary hover:underline">
              View packages →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {hostPackages.map((p) => (
              <div key={p.name} className={`card-soft p-7 ${p.featured ? "ring-2 ring-accent" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-primary">{p.name}</h3>
                  {p.featured && <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Most popular</span>}
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{p.units}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documented service */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow"><Camera className="h-3.5 w-3.5" /> Documented service</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              Photo proof on every job. Honest results, every time.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Hosts shouldn't have to take cleaning on faith. After every job we share before/after
              photos, what was treated, and a realistic result update — plus drying guidance to keep
              your turnover on schedule.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Before/after photos shared on WhatsApp",
                "Clear summary of what was treated",
                "Honest result communication — no hype",
                "Drying guidance for tight turnovers",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-foreground"><ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src={beforeAfterImg}
              alt="Before and after documented mattress service"
              width={1200} height={800} loading="lazy"
              className="rounded-2xl border border-border object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Four simple steps.</h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              { t: "Send details on WhatsApp", d: "Location, mattress size or furniture, photos, next check-in time." },
              { t: "Quote &amp; time slot", d: "We confirm a realistic price, an available slot and what to expect." },
              { t: "On-site service", d: "Inspection, treatment and cleaning with controlled-moisture process." },
              { t: "Photo proof &amp; drying guidance", d: "After-service documentation and clear next steps." },
            ].map((s, i) => (
              <li key={s.t} className="card-soft relative p-6">
                <span className="absolute -top-3 left-6 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                <h3 className="mt-2 font-semibold text-primary" dangerouslySetInnerHTML={{ __html: s.t }} />
                <p className="mt-2 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: s.d }} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Emergency band */}
      <section className="section bg-gradient-band text-primary-foreground">
        <div className="container-tight grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <AlarmClock className="h-3.5 w-3.5" /> Emergency Host Service
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A guest just checked out and something's wrong?</h2>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">
              Send us photos and your next check-in time. We'll tell you honestly what's possible and
              prioritize you for same-day or next-day support where we can.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <WhatsAppButton size="lg" label="WhatsApp now" />
            <a
              href={`tel:${site.phoneDisplay.replace(/\s+/g, "")}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90"
            >
              <PhoneCall className="h-4 w-4" /> Call us
            </a>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><MapPin className="h-3.5 w-3.5" /> Service areas</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Covering Roysambu and across Nairobi.</h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {site.serviceAreas.map((a) => (
              <span key={a} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary shadow-soft">
                {a}
              </span>
            ))}
            <span className="rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent">+ selected Nairobi areas on request</span>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Quick answers for hosts.</h2>
            <Link to="/faq" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              See all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Accordion type="single" collapsible className="card-soft px-6">
            {faqs.slice(0, 5).map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft overflow-hidden bg-primary text-primary-foreground">
            <div className="grid gap-6 p-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">Get your property guest-ready.</h2>
                <p className="mt-3 max-w-2xl text-primary-foreground/80">
                  Specialist mattress and upholstery cleaning, documented and on schedule.
                  Send photos and your next check-in time — we'll take it from there.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <WhatsAppButton size="lg" />
                <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90">
                  Book a slot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
