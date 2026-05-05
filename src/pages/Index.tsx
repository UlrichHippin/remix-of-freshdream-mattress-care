import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, Clock4, ShieldCheck, Wrench, MapPin, AlarmClock,
  PhoneCall, MessageSquareText, Sparkles, ClipboardCheck,
  CalendarClock, FileCheck2, BadgeCheck, Repeat2, Zap, Droplets,
  Send, MessageCircle, Wand2, ImageDown, BedDouble, Sofa, Star, Check, Package,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HostPackagesPreview from "@/components/HostPackagesPreview";
import BookingSection from "@/components/BookingSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { whatsappLink } from "@/config/site";
import { services, faqs, hostPackages, openingOffer } from "@/data/content";
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

import { packages, STARTING_NOTE, type PackageDef as Pkg } from "@/data/packages";

export default function Home() {
  const [activePkg, setActivePkg] = useState<Pkg | null>(null);
  return (
    <PageLayout
      title="Mattress Cleaning Nairobi | Airbnb & Upholstery Cleaning | FreshDream"
      description="Professional mattress cleaning in Nairobi for Airbnb hosts, homes and serviced apartments. Fast WhatsApp booking, M-PESA accepted, based in Roysambu and serving Nairobi."
    >
      {/* Hero — clean two-column layout */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> Launch Offer
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Mattress Cleaning Nairobi for Airbnb Hosts, Homes &amp; Serviced Apartments
            </h1>
            <p className="mt-3 text-lg font-semibold text-primary">
              Freshen Up from KES 1,999
            </p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">
              First-time customers · Selected Nairobi areas · WhatsApp booking · M-PESA accepted
            </p>

            {/* Trust bullets — cohesive row, wraps cleanly on mobile */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary/90">
              {[
                { i: BadgeCheck, t: "M-PESA accepted" },
                { i: MessageSquareText, t: "WhatsApp booking" },
                { i: Clock4, t: "Same-day" },
                { i: Camera, t: "Before/after" },
                { i: MapPin, t: "Roysambu" },
              ].map((it) => (
                <li key={it.t} className="inline-flex items-center gap-1.5 font-medium">
                  <it.i className="h-4 w-4 text-accent" aria-hidden /> {it.t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(openingOffer.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-whatsapp-foreground shadow-card hover:bg-whatsapp-hover sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" /> Book on WhatsApp
              </a>
              <Link
                to="/services"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-6 text-base font-semibold text-primary transition-colors hover:bg-primary-soft sm:w-auto"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
              <img
                src={heroImg}
                alt="Professional mattress cleaning in Nairobi for Airbnb hosts"
                width={1200}
                height={900}
                loading="eager"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft ring-1 ring-border backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Built for hosts · Roysambu, Nairobi
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Compact trust row */}
      <section className="border-b border-border bg-background">
        <div className="container-tight flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 text-sm text-primary">
          {[
            { i: MessageSquareText, t: "WhatsApp booking" },
            { i: BadgeCheck, t: "M-PESA accepted" },
            { i: MapPin, t: "Based in Roysambu" },
            { i: Sparkles, t: "Airbnb-ready service" },
            { i: ShieldCheck, t: "Honest stain assessment" },
          ].map((it) => (
            <span key={it.t} className="inline-flex items-center gap-1.5 font-medium">
              <it.i className="h-4 w-4 text-accent" /> {it.t}
            </span>
          ))}
        </div>
      </section>

      {/* Opening Offer teaser */}
      <section className="border-b border-border bg-accent-soft/40">
        <div className="container-tight py-10 sm:py-12">
          <div className="card-soft relative overflow-hidden border-2 border-accent/40 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-soft/70" aria-hidden="true" />
            <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  Launch Offer · First-Time Customers
                </span>
                <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
                  Opening Offer: Freshen Up from KES 1,999
                </h2>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Limited launch offer for first-time customers in selected Nairobi areas. Ideal for
                  Airbnb hosts, guest rooms and homes that need a fast dry mattress refresh.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(openingOffer.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
                  >
                    <MessageCircle className="h-4 w-4" /> Book on WhatsApp
                  </a>
                  <Link
                    to="/pricing"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary-soft"
                  >
                    View Prices <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <ul className="md:col-span-4 grid gap-1.5 text-sm">
                {openingOffer.prices.map((p, idx) => (
                  <li
                    key={p.label}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                      idx === 0 ? "bg-primary text-primary-foreground" : "bg-surface"
                    }`}
                  >
                    <span className={`text-xs font-semibold ${idx === 0 ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{p.label}</span>
                    <span className={`text-sm font-bold ${idx === 0 ? "" : "text-primary"}`}>{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
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
            { icon: Droplets, t: "Dry process — no soaking" },
            { icon: ShieldCheck, t: "Safe for mattresses & sofas" },
            { icon: Sparkles, t: "UV-C hygiene & hot air refresh" },
            { icon: MapPin, t: "Nairobi & surrounding areas" },
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

      {/* Professional Dry Cleaning Packages — main offers */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Package className="h-3.5 w-3.5" /> Packages</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              Professional Dry Cleaning Packages
            </h2>
            <p className="mt-3 text-muted-foreground">
              Safe, dry, and hygiene-focused cleaning for mattresses and sofas in Nairobi.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p, i) => (
              <div
                key={p.title}
                className={`card-soft relative flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift ${
                  i === 1 ? "ring-2 ring-accent shadow-lift" : ""
                }`}
              >
                {i === 1 && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-primary">{p.title}</h3>
                <p className="mt-2 text-2xl font-bold text-primary">{p.startingPrice}</p>
                <p className="mt-1 text-xs text-muted-foreground">{STARTING_NOTE}</p>
                <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  <Clock4 className="h-3.5 w-3.5" /> {p.hours}
                </span>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{p.summary}</p>
                <button
                  type="button"
                  onClick={() => setActivePkg(p)}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-1 rounded-full border-2 border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
                >
                  More info <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <WhatsAppButton size="lg" label="Book a Cleaning" />
            <p className="text-center text-sm text-muted-foreground">
              Dry process. No soaking. Nairobi and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={!!activePkg} onOpenChange={(open) => !open && setActivePkg(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {activePkg && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-baseline gap-3">
                  <DialogTitle className="text-2xl text-primary">{activePkg.title}</DialogTitle>
                  <span className="text-xl font-bold text-primary">{activePkg.startingPrice}</span>
                </div>
                <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  <Clock4 className="h-3.5 w-3.5" /> {activePkg.hours}
                </span>
                <DialogDescription className="mt-3 text-sm italic text-muted-foreground">
                  {activePkg.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <p className="text-sm text-foreground">{activePkg.description}</p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Included</h4>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {activePkg.included.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Best for</h4>
                  <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                    {activePkg.bestFor.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Size-based pricing</h4>
                  <ul className="mt-2 divide-y divide-border rounded-xl border border-border bg-surface text-sm">
                    {activePkg.sizes.map((s) => (
                      <li key={s.label} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-foreground">{s.label}</span>
                        <span className="font-semibold text-primary">{s.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-surface p-4 text-sm">
                  <p><span className="font-semibold text-primary">Ready to use again:</span> {activePkg.readyIn}</p>
                  <p className="mt-2 italic text-muted-foreground">{activePkg.note}</p>
                </div>

                <a
                  href={whatsappLink(activePkg.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp text-base font-semibold text-whatsapp-foreground shadow-soft transition-all hover:bg-whatsapp-hover hover:shadow-card"
                >
                  <MessageCircle className="h-4 w-4" /> Book this package on WhatsApp
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Why hosts choose us */}
      <section className="section bg-surface">
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

      <EquipmentBadge variant="band" />


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
          <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={heroImg}
              alt="FreshDream mattress care in Roysambu Nairobi"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <figcaption className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-soft ring-1 ring-border backdrop-blur-sm">
              Documented
            </figcaption>
          </figure>
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
              <AlarmClock className="h-3.5 w-3.5" /> Emergency Host Support
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

      <BookingSection />

      {/* Best for — customer types */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><BadgeCheck className="h-3.5 w-3.5" /> Best for</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Built for hospitality and homes.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { i: BedDouble, t: "Airbnb hosts" },
              { i: Sofa, t: "Serviced apartments" },
              { i: Package, t: "Guest houses" },
              { i: ShieldCheck, t: "Families & homes" },
              { i: Repeat2, t: "Property managers" },
            ].map((c) => (
              <div key={c.t} className="card-soft flex flex-col items-center p-5 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <c.i className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm font-semibold text-primary">{c.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Service Photos Coming Soon */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              <Camera className="h-3.5 w-3.5" /> Coming soon
            </span>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Real Service Photos Coming Soon</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Real FreshDream service photos are coming soon. We only publish real job photos with privacy protection — no addresses, no personal details.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Equipment in action",
              "Before / after examples",
              "Guest-ready Airbnb rooms",
            ].map((label) => (
              <li
                key={label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface p-5 text-center shadow-soft"
              >
                <Camera className="h-7 w-7 text-accent" />
                <p className="text-sm font-semibold text-primary">{label}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Photo coming soon</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton label="Ask us on WhatsApp for recent photos" />
          </div>
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
