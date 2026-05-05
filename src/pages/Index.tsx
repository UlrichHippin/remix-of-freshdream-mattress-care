import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, Clock4, ShieldCheck, Wrench, MapPin, AlarmClock,
  PhoneCall, MessageSquareText, Sparkles, ClipboardCheck,
  CalendarClock, FileCheck2, BadgeCheck, Repeat2, Zap, Droplets,
  Send, MessageCircle, Wand2, ImageDown, BedDouble, Sofa, Star,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HostPackagesPreview from "@/components/HostPackagesPreview";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, faqs, hostPackages, pricingMattress } from "@/data/content";
import { site } from "@/config/site";
import heroImg from "@/assets/hero-bed.jpg";
import heroBanner from "@/assets/hero-banner.png";
import hospitalityBedroom from "@/assets/hospitality-bedroom.jpg";
import hospitalityLiving from "@/assets/hospitality-living.jpg";
import hospitalityApartment from "@/assets/hospitality-apartment.jpg";

import logoMark from "@/assets/logo-mark.png";
import logoHorizontal from "@/assets/logo-horizontal.png";
import logoFull from "@/assets/logo-full.png";
import illustHostSupport from "@/assets/illust-host-support.png";
import illustGuestReady from "@/assets/illust-guest-ready.png";
import illustMattressCare from "@/assets/illust-mattress-care.png";
import illustProcessFlow from "@/assets/illust-process-flow.png";
import illustEmergencyResponse from "@/assets/illust-emergency-response.png";
import illustTrustBadges from "@/assets/illust-trust-badges.png";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import EquipmentBadge from "@/components/EquipmentBadge";

export default function Home() {
  return (
    <PageLayout
      title="FreshDream Mattress Care — Mattress & Upholstery Cleaning for Airbnb Hosts in Nairobi"
      description="Specialist mattress and upholstery cleaning for Airbnb hosts and short-stay properties in Nairobi. Documented service, fast WhatsApp booking, guest-ready turnaround. Based in Roysambu."
    >
      {/* Hero — full-width branded banner + real text/CTA */}
      <section className="w-full bg-gradient-to-b from-sky-50 to-background py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <img
            src={heroBanner}
            alt="FreshDream Mattress Care — Professional Mattress Cleaning in Nairobi. Sleep Better. Live Fresher."
            width={1920}
            height={960}
            className="mx-auto block h-auto w-full rounded-2xl object-contain shadow-lift"
          />

          {/* Real, accessible hero content for SEO + responsiveness */}
          <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Roysambu Based · Nairobi
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Professional Mattress Cleaning in Nairobi
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              For Airbnb hosts and serviced apartments in Roysambu & Nairobi. Documented service,
              honest assessments and guest-ready turnaround.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton size="lg" label="Book via WhatsApp" className="w-full sm:w-auto" />
              <Link
                to="/services"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-6 text-base font-semibold text-primary transition-colors hover:bg-primary-soft sm:w-auto"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Documented service</li>
              <li className="inline-flex items-center gap-1.5"><Camera className="h-4 w-4 text-accent" /> Before / after photos</li>
              <li className="inline-flex items-center gap-1.5"><Clock4 className="h-4 w-4 text-accent" /> Same-day where possible</li>
            </ul>

            <div className="mt-6 flex justify-center">
              <EquipmentBadge variant="inline" />
            </div>
          </div>
        </div>
      </section>

      {/* Host support feature — illustrated */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={hospitalityBedroom}
              alt="Neatly made bed in a sunlit short-stay apartment"
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Guest-ready standard
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow"><MessageSquareText className="h-3.5 w-3.5" /> Host support</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              A specialist on WhatsApp — not a call center.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Send a photo, your unit and your check-in time. You get a real person, a realistic
              quote, and an available slot — with documented before/after on every job.
            </p>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              {[
                { i: MessageSquareText, t: "Real WhatsApp replies" },
                { i: Camera, t: "Photo proof on every job" },
                { i: Clock4, t: "Same-day where possible" },
                { i: ShieldCheck, t: "Honest assessments" },
              ].map((it) => (
                <li key={it.t} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-soft">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                    <it.i className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-primary">{it.t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Link to="/host-packages" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary-soft">
                Host packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

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
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
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
            <div className="lg:col-span-5">
              <IllustrationFrame src={illustTrustBadges} alt="Trust and quality badges illustration" tone="primary" badge="What hosts get" />
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Sparkles, t: "Hospitality-aware", d: "We schedule around your check-ins and treat every unit like a guest is arriving tonight." },
              { icon: FileCheck2, t: "Documented service", d: "Before/after photos, what was treated, and clear result communication on every job." },
              { icon: BadgeCheck, t: "Honest expectations", d: "No miracle promises. We tell you straight what stains can realistically improve." },
              { icon: Repeat2, t: "Repeat-property ready", d: "Recurring schedules, consistent crew, and unit-by-unit history." },
              { icon: Zap, t: "Emergency response", d: "Urgent help before next check-in when something goes wrong on turnover day." },
              { icon: Droplets, t: "Controlled-moisture cleaning", d: "Process designed to help reduce drying time so beds get back in service faster." },
            ].map((it) => (
              <div key={it.t} className="card-soft group relative overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-soft/60 transition-transform group-hover:scale-110" aria-hidden="true" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 font-semibold text-primary">{it.t}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitality visual band */}
      <section className="relative">
        <div className="container-tight">
          <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={hospitalityLiving}
              alt="Tidy modern short-stay apartment living area, calm and inviting"
              width={1600}
              height={900}
              loading="lazy"
              className="aspect-[16/7] h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" aria-hidden="true" />
            <figcaption className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center gap-2 p-8 text-primary-foreground sm:p-12">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-primary-foreground/25 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Calm. Polished. Ready.
              </p>
              <p className="text-balance text-xl font-bold leading-tight sm:text-2xl">
                Every unit deserves to feel guest-ready before the door opens.
              </p>
            </figcaption>
          </figure>
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
              <Link key={s.slug} to="/services" className="card-soft group relative flex flex-col overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="relative -mx-6 -mt-6 mb-4 h-32 overflow-hidden bg-gradient-to-br from-primary-soft via-accent-soft to-primary-soft">
                  <div
                    className="absolute inset-0 opacity-30"
                    aria-hidden="true"
                    style={{
                      backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />
                  <img
                    src={s.illustration}
                    alt=""
                    aria-hidden="true"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="relative mx-auto h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-primary">{s.title}</h3>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Starting prices preview */}
      <section className="section">
        <div className="container-tight">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Starting prices</p>
              <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Transparent pricing in KES.</h2>
              <p className="mt-3 text-muted-foreground">
                A quick reference for mattress cleaning. Final pricing depends on size, condition, location, and urgency.
              </p>
            </div>
            <Link to="/pricing" className="text-sm font-semibold text-primary hover:underline">
              View full pricing →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pricingMattress.map((m) => (
              <div
                key={m.size}
                className={`card-soft relative overflow-hidden p-6 ${m.featured ? "ring-2 ring-accent shadow-lift" : ""}`}
              >
                {m.featured && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <BedDouble className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary">{m.size}</h3>
                </div>
                <dl className="mt-5 space-y-3">
                  <div className="flex items-baseline justify-between gap-3 rounded-xl bg-surface px-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Freshen-Up</dt>
                    <dd className="text-base font-bold text-primary">{m.freshen}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 px-4 py-3 text-primary-foreground">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Deep Clean</dt>
                    <dd className="text-base font-bold">{m.deep}</dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {["Stain & odor treatment", "Before/after photos", "Drying guidance"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/pricing" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90">
              View full pricing
            </Link>
            <WhatsAppButton size="lg" />
          </div>
        </div>
      </section>

      <HostPackagesPreview />

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
          <IllustrationFrame
            src={illustGuestReady}
            alt="Guest-ready bedroom illustration"
            tone="primary"
            badge="Documented"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Four simple steps.</h2>
          </div>
          <div className="relative mt-12">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent md:block" aria-hidden="true" />
            <ol className="relative grid gap-6 md:grid-cols-4">
              {[
                { icon: Send, t: "Share the details", d: "WhatsApp us your location, mattress or furniture, photos and the next check-in time." },
                { icon: MessageCircle, t: "Honest quote & slot", d: "You get a realistic price, an available time slot and a clear view of what to expect." },
                { icon: Wand2, t: "Calm on-site service", d: "Inspection and treatment with a controlled-moisture process — quiet, tidy, guest-ready." },
                { icon: ImageDown, t: "Proof & drying guidance", d: "Before/after photos and clear drying steps so the room is ready for the next guest." },
              ].map((s, i) => (
                <li key={s.t} className="relative flex flex-col items-center text-center">
                  <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lift ring-4 ring-background">
                    <s.icon className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground ring-2 ring-background">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-primary">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Process flow illustration */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <IllustrationFrame
                src={illustProcessFlow}
                alt="Four-step process flow illustration: chat, calendar, treatment, photo"
                tone="accent"
                badge="Process at a glance"
              />
            </div>
            <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift lg:col-span-7">
              <img
                src={hospitalityApartment}
                alt="Bright short-stay apartment bedroom prepared to a guest-ready standard"
                width={1600}
                height={900}
                loading="lazy"
                className="aspect-[16/9] h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-6 text-primary-foreground sm:p-8">
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-primary-foreground/25 backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" /> From request to guest-ready
                </p>
                <p className="text-balance text-lg font-bold leading-tight sm:text-xl">
                  A documented process — so every check-in starts calm and on time.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Emergency band */}
      <section className="section bg-gradient-band text-primary-foreground">
        <div className="container-tight grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <AlarmClock className="h-3.5 w-3.5" /> Emergency Host Service
            </p>
            <h2 className="mt-4 text-balance text-2xl font-bold leading-[1.15] hyphens-manual sm:text-3xl lg:text-4xl">
              A guest just checked out<br className="sm:hidden" />
              {" "}and something&rsquo;s wrong?
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Send us photos and your next check-in time. We'll tell you honestly what's possible and
              prioritize you for same-day or next-day support where we can.
            </p>
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-md">
              <WhatsAppButton size="lg" label="WhatsApp now" className="w-full" />
              <a
                href={`tel:${site.phoneDisplay.replace(/\s+/g, "")}`}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90 hover:shadow-card active:scale-[0.98] active:bg-primary-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                <PhoneCall className="h-4 w-4" /> Call us
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-primary-foreground/5 p-6 ring-1 ring-primary-foreground/15 backdrop-blur-sm">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
              <img
                src={illustEmergencyResponse}
                alt="Emergency response illustration: bed with alarm clock"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative mx-auto h-auto w-full max-w-[380px] object-contain"
              />
            </div>
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
          <div className="relative overflow-hidden rounded-2xl bg-primary p-10 text-primary-foreground shadow-lift sm:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-primary-foreground/5 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-primary-foreground px-4 py-2.5 shadow-soft">
                  <img src={logoFull} alt={site.name} className="h-8 w-auto object-contain" />
                </div>
                <h2 className="mt-4 text-balance text-2xl font-bold leading-[1.15] hyphens-manual sm:text-3xl lg:text-4xl">
                  Keep every bed fresh,<br className="sm:hidden" />
                  {" "}clean, and guest-ready.
                </h2>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  Specialist mattress and upholstery cleaning, documented and on schedule.
                  Send photos and your next check-in time — we'll take it from there.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:w-auto lg:flex-col lg:items-stretch">
                <WhatsAppButton size="lg" className="w-full lg:w-auto" />
                <Link to="/contact" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90 hover:shadow-card active:scale-[0.98] active:bg-primary-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 lg:w-auto">
                  Request a Quote
                </Link>
                <Link to="/host-packages" className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/10 active:scale-[0.98] active:bg-primary-foreground/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 lg:w-auto">
                  Host Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
