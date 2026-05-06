import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, Clock4, ShieldCheck, Wrench, MapPin, AlarmClock,
  PhoneCall, MessageSquareText, Sparkles, ClipboardCheck,
  FileCheck2, BadgeCheck, Repeat2, Zap, Droplets,
  MessageCircle, BedDouble, Star, Check, Package, Wind, Sun,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HostPackagesPreview from "@/components/HostPackagesPreview";
import BookingSection from "@/components/BookingSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import QuickQuote from "@/components/QuickQuote";
import ProcessTimeline from "@/components/ProcessTimeline";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { whatsappLink } from "@/config/site";
import { faqs, openingOffer, sleepAreaAddOn, freshSleepPackage } from "@/data/content";
import { site } from "@/config/site";
import heroBackground from "@/assets/brand/hero-background.webp";
import logoMark from "@/assets/brand/logo-main.png";

import logoFull from "@/assets/brand/logo-footer.png";

import { packages, STARTING_NOTE, type PackageDef as Pkg } from "@/data/packages";

export default function Home() {
  const [activePkg, setActivePkg] = useState<Pkg | null>(null);

  const multiMattressMessage =
    "Hello FreshDream, I have more than one mattress to clean at the same address. Please send me a multi-mattress price.\nNumber of mattresses:\nMattress sizes:\nLocation:";

  return (
    <PageLayout
      title="Mattress Cleaning Nairobi | Airbnb Mattress Hygiene | FreshDream Mattress Care"
      description="Professional mattress and upholstery care in Nairobi for Airbnb hosts, families and modern homes. Book FreshDream Mattress Care by WhatsApp."
    >
      {/* 1. HERO */}
      <section className="relative overflow-hidden border-b border-border animate-fade-up">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
          role="img"
          aria-label="Mattress cleaning service in Nairobi"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/80 to-background/40 lg:from-background/90 lg:via-background/70 lg:to-background/30" aria-hidden="true" />
        {/* Animated mesh blobs */}
        <div
          className="pointer-events-none absolute -left-32 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-accent/25 blur-3xl"
          style={{ animation: "mesh-drift 14s ease-in-out infinite" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl"
          style={{ animation: "mesh-drift 18s ease-in-out infinite reverse" }}
          aria-hidden="true"
        />
        <div className="container-tight grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> FreshDream Mattress Care
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              Professional{" "}
              <span className="relative inline-block">
                <span className="text-gradient-brand">Mattress &amp; Upholstery Care</span>
                <span
                  className="absolute -bottom-1 left-0 h-[4px] w-full origin-left rounded-full bg-gradient-to-r from-accent via-primary to-accent"
                  style={{ animation: "underline-sweep 1.2s ease-out 0.4s both" }}
                  aria-hidden="true"
                />
              </span>{" "}
              in Nairobi
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Fresh sleep for Airbnb hosts, families and modern homes.
            </p>

            {/* Trust badges in hero */}
            <ul className="mt-5 flex flex-wrap gap-2">
              {[
                "Airbnb Friendly",
                "Same-Day Requests",
                "M-PESA Accepted",
                "Roysambu Based",
                "Nairobi Service Area",
                "No Drying Time (Dry Care)",
              ].map((b, i) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-[11px] font-semibold text-primary shadow-soft ring-1 ring-border backdrop-blur animate-fade-up"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-accent" /> {b}
                </li>
              ))}
            </ul>

            {/* Strong price box */}
            <div className="relative mt-6 max-w-lg overflow-hidden rounded-2xl border-2 border-accent/50 bg-card/95 p-5 shadow-lift backdrop-blur sheen">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Opening Offer</p>
                  <p className="mt-1 text-2xl font-extrabold text-primary nums sm:text-3xl">from KES 1,999</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  <Star className="h-3 w-3" /> First-time
                </span>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent-soft/70 px-3 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4 text-accent animate-sparkle" aria-hidden />
                Add Sleep Area Dust Refresh for only <span className="text-accent nums">KES 300</span>
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(openingOffer.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-whatsapp-foreground shadow-card hover:bg-whatsapp-hover animate-soft-pulse sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" /> Book via WhatsApp
              </a>
              <Link
                to="/services"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-6 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                View Services <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto flex items-center justify-center">
              <span className="absolute inset-6 -z-10 rounded-full bg-accent/25 blur-3xl animate-glow-pulse" aria-hidden />
              <span className="absolute inset-10 -z-10 rounded-full bg-primary/15 blur-3xl" aria-hidden />
              <span
                className="absolute inset-0 -z-10 rounded-full opacity-40"
                style={{
                  background: "conic-gradient(from 0deg, hsl(var(--accent) / 0.25), transparent 40%, hsl(var(--primary) / 0.2), transparent 80%)",
                  animation: "conic-spin 20s linear infinite",
                }}
                aria-hidden
              />

              <img
                src={logoMark}
                alt="FreshDream Mattress Care logo"
                width={920}
                height={920}
                className="relative w-[220px] animate-float object-contain drop-shadow-2xl sm:w-[320px] lg:w-[420px] xl:w-[460px]"
              />
              {/* Reflection */}
              <span
                className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-[50%] bg-primary/20 blur-xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <section className="border-b border-border bg-background">
        <div className="container-tight flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 text-sm text-primary">
          {[
            { i: MessageSquareText, t: "WhatsApp booking" },
            { i: BadgeCheck, t: "M-PESA accepted" },
            { i: MapPin, t: "Based in Roysambu" },
            { i: Droplets, t: "Dry process — no soaking" },
            { i: ShieldCheck, t: "Honest stain assessment" },
            { i: Camera, t: "Before/after photos" },
          ].map((it) => (
            <span key={it.t} className="inline-flex items-center gap-1.5 font-medium">
              <it.i className="h-4 w-4 text-accent" /> {it.t}
            </span>
          ))}
        </div>
      </section>

      {/* 3. OPENING OFFER */}
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
                  First-time customers only. Limited launch period. Selected Nairobi areas. Location fee may apply unless waived by order value and service area.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(openingOffer.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover animate-soft-pulse"
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

      {/* 3b. QUICK QUOTE */}
      <QuickQuote />

      {/* 4. MOST POPULAR + FRESH SLEEP HIGHLIGHT */}
      <section className="section">
        <div className="container-tight grid gap-6 lg:grid-cols-2">
          {/* Most Popular */}
          <div className="card-soft glow-hover relative overflow-hidden border-2 border-accent/50 p-6 sm:p-8 transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
              <Star className="h-3 w-3" /> Most Popular
            </span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Customer Favorite</p>
            <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">Standard Mattress Hygiene</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Best for homes, Airbnb rooms and serviced apartments.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent-soft/60 px-3 py-2 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-accent animate-sparkle" />
              Recommended with Sleep Area Dust Refresh + KES 300.
            </p>
            <a
              href={whatsappLink("Hello, I'd like to book the Most Popular mattress hygiene package.\nMattress size:\nLocation:\nPreferred date:")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
          </div>

          {/* Fresh Sleep Package */}
          <div className="card-soft glow-hover relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-accent-soft/40 to-primary-soft/40 p-6 sm:p-8 transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              <BadgeCheck className="h-3 w-3" /> Fresh Sleep
            </span>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{freshSleepPackage.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Mattress cleaning + Sleep Area Dust Refresh for a cleaner sleeping area and better guest impression.
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {[
                "Mattress hygiene cleaning",
                "Around-bed dust refresh",
                "Reachable under-bed dust",
                "Bed frame/headboard light vacuuming",
              ].map((it) => (
                <li key={it} className="flex items-start gap-2 text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {it}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(freshSleepPackage.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> Book Fresh Sleep Package on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 5. PACKAGES */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Package className="h-3.5 w-3.5" /> Packages</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              <span className="text-gradient-brand">Choose Your Mattress Cleaning Package</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Safe, dry, and hygiene-focused mattress cleaning in Nairobi.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {packages.map((p, i) => (
              <div
                key={p.title}
                className={`card-soft relative flex flex-col p-5 sm:p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${
                  i === 1 ? "ring-2 ring-accent shadow-lift" : ""
                }`}
              >
                {i === 1 && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
                    <Star className="h-2.5 w-2.5" /> Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-bold text-primary max-[380px]:text-base ${i === 1 ? "pr-24" : ""}`}>{p.title}</h3>
                <p className="mt-2 text-2xl font-bold text-primary max-[380px]:text-xl">{p.startingPrice}</p>
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
            <WhatsAppButton size="lg" label="Book a Cleaning" className="w-full sm:w-auto animate-soft-pulse" />
            <p className="text-center text-sm text-muted-foreground">
              Sofa or rug? Available on request after photos on WhatsApp.
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

      {/* 6. SLEEP AREA DUST REFRESH */}
      <section id="sleep-area-add-on" className="section">
        <div className="container-tight grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5 animate-sparkle" /> Optional add-on</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              {sleepAreaAddOn.name} — {sleepAreaAddOn.price}
            </h2>
            <p className="mt-3 text-muted-foreground">
              After mattress cleaning, we can quickly vacuum around the bed area, reachable
              under-bed spaces, floor edges and the bed frame/headboard for a fresher sleeping
              environment.
            </p>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-primary">Included</h3>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {sleepAreaAddOn.included.map((it) => (
                <li key={it} className="flex items-start gap-2 text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> {it}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl border border-accent/40 bg-accent-soft/40 p-4 text-sm text-primary">
              <strong>Important:</strong> {sleepAreaAddOn.note}
            </p>
            <div className="mt-6">
              <a
                href={whatsappLink(`Hello, I would like to add the ${sleepAreaAddOn.name} (${sleepAreaAddOn.price}) to my mattress cleaning booking.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
              >
                <MessageCircle className="h-4 w-4" /> Add to my booking on WhatsApp
              </a>
            </div>
          </div>

          {/* Multi-mattress eyecatcher */}
          <aside className="lg:col-span-5">
            <div className="card-soft border-2 border-primary/20 bg-gradient-to-br from-primary-soft to-accent-soft/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                <Repeat2 className="h-3 w-3" /> Multi-Mattress Deal
              </span>
              <h3 className="mt-3 text-xl font-bold text-primary">Cleaning more than one mattress?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Location fee is charged once per visit, not per mattress. Multiple mattresses at the same address can reduce the total cost per mattress.
              </p>
              <a
                href={whatsappLink(multiMattressMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
              >
                <MessageCircle className="h-4 w-4" /> Ask for multi-mattress price on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* 7. PROCESS TIMELINE */}
      <ProcessTimeline />
      <p className="container-tight -mt-6 mb-6 rounded-xl bg-primary-soft p-4 text-center text-sm font-medium text-primary">
        Booking is only confirmed after FreshDream replies on WhatsApp.
      </p>

      {/* 8. TRANSPORT FEE — TRANSPARENT */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="eyebrow justify-center"><MapPin className="h-3.5 w-3.5" /> Transparent pricing</p>
              <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Transport Fee — Always Confirmed Before Booking</h2>
              <p className="mt-3 text-muted-foreground">
                Service Price <span className="font-semibold text-primary">+</span> Transport Fee <span className="font-semibold text-primary">=</span> Final Confirmed Price
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Transport fees depend on customer location and are always confirmed before booking. Charged once per visit — not per mattress.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { zone: "Roysambu / nearby areas", fee: "Low or no transport fee depending on booking size" },
                { zone: "Kasarani · Garden Estate · Thome · Mirema", fee: "Small transport fee" },
                { zone: "Westlands · Kilimani · Kileleshwa · Lavington", fee: "Medium transport fee" },
                { zone: "Karen · Langata · Runda · Gigiri · Muthaiga", fee: "Higher transport fee depending on distance" },
                { zone: "Outside Nairobi", fee: "Quote on request" },
              ].map((z) => (
                <li key={z.zone} className="card-soft flex items-start gap-3 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-primary">{z.zone}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{z.fee}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-xl bg-primary-soft p-4 text-center text-sm font-medium text-primary">
              Send your location pin on WhatsApp so we can confirm the exact transport fee before booking.
            </p>
          </div>
        </div>
      </section>

      {/* 8b. EASY PAYMENT OPTIONS */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><BadgeCheck className="h-3.5 w-3.5" /> Payment</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Easy Payment Options</h2>
          </div>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { t: "M-PESA accepted", d: "Quick and secure mobile payment." },
              { t: "Cash accepted if needed", d: "Pay on completion at your location." },
              { t: "M-PESA details on booking", d: "Confirmed via WhatsApp once your slot is set." },
              { t: "Receipts on request", d: "Available for Airbnb hosts and business clients." },
            ].map((p) => (
              <li key={p.t} className="card-soft flex items-start gap-3 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary">{p.t}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            Do not send payment until your booking and price are confirmed by FreshDream via WhatsApp.
          </p>
        </div>
      </section>

      {/* 9. AIRBNB MATTRESS CARE */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow"><BedDouble className="h-3.5 w-3.5" /> For Airbnb Hosts</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              Airbnb Mattress Care for Better Guest Reviews
            </h2>
            <p className="mt-3 text-muted-foreground">
              FreshDream Mattress Care helps Airbnb hosts keep mattresses, sofas and sleeping areas fresh, hygienic and guest-ready.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "Better guest experience",
                "Cleaner sleeping environment",
                "Helps reduce dust, hair and allergens",
                "Fast service between bookings",
                "No drying time for dry mattress care",
                "Optional recurring cleaning plans",
                "Photo confirmation after service",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href={whatsappLink("Hello FreshDream, I am an Airbnb host and would like to book Airbnb mattress care.\nNumber of mattresses:\nLocation:\nPreferred date:")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover animate-soft-pulse"
              >
                <MessageCircle className="h-4 w-4" /> Book Airbnb Cleaning via WhatsApp
              </a>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="card-soft border-2 border-accent/30 bg-gradient-to-br from-primary-soft to-accent-soft/40 p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Recurring plan</p>
              <h3 className="mt-2 text-xl font-bold text-primary">Keep every guest stay fresh</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Set up monthly or quarterly mattress hygiene visits to maintain top-rated guest reviews. Send your unit details on WhatsApp.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* 9b. HOSTS PREVIEW */}
      <HostPackagesPreview />

      {/* 10. JIMMY BX7 PRO EQUIPMENT */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Wrench className="h-3.5 w-3.5" /> Professional equipment</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Powered by JIMMY BX7 Pro</h2>
            <p className="mt-3 text-muted-foreground">
              Dry mattress hygiene treatment with suction, vibration, UV-C support and warm-air freshness. No soaking. No water extraction.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Wind, t: "Powerful Suction", d: "Helps remove dust, hair, dander and fine particles from the mattress surface." },
              { i: Zap, t: "Vibration", d: "Loosens trapped dust and debris from inside the mattress." },
              { i: Sun, t: "UV-C Support", d: "Surface hygiene support during the cleaning pass." },
              { i: Droplets, t: "Warm-Air Freshness", d: "Helps freshen the mattress after the cleaning pass." },
            ].map((it) => (
              <div key={it.t} className="card-soft p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <it.i className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold text-primary">{it.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DOCUMENTED SERVICE */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow"><Camera className="h-3.5 w-3.5" /> FreshDream Service Proof</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              What you receive after service
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every job is documented with care. You receive a clear summary on WhatsApp and visual proof of the work — with full customer privacy.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Before/after photos shared on WhatsApp where suitable",
                "WhatsApp service summary of what was treated",
                "Honest result communication — no hype",
                "Customer privacy protected — no addresses, no personal details",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-foreground"><ClipboardCheck className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              { i: Camera, t: "Before/after photos where suitable", d: "Visual proof of the cleaning result." },
              { i: MessageCircle, t: "WhatsApp service summary", d: "Clear written recap of what was treated." },
              { i: ShieldCheck, t: "Privacy-protected documentation", d: "No addresses or personal details shared." },
              { i: BedDouble, t: "Guest-ready room impression", d: "A cleaner, fresher sleep area for your guests." },
            ].map((it) => (
              <li
                key={it.t}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-5 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <it.i className="h-7 w-7 text-accent" />
                <p className="text-sm font-semibold text-primary">{it.t}</p>
                <p className="text-xs text-muted-foreground">{it.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11b. BEFORE / AFTER */}
      <BeforeAfterSlider />

      {/* 12. FAQ */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Quick answers.</h2>
            <Link to="/faq" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              See all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card-soft divide-y divide-border px-6">
            {faqs.slice(0, 5).map((f, i) => (
              <div key={i} className="py-5">
                <h3 className="text-base font-semibold text-primary">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. BOOKING FORM */}
      <BookingSection />

      {/* Emergency band — kept as supporting content */}
      <section className="section bg-gradient-band text-primary-foreground">
        <div className="container-tight grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-12">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <AlarmClock className="h-3.5 w-3.5" /> Emergency Host Support
            </p>
            <h2 className="mt-4 text-balance text-2xl font-bold leading-[1.15] sm:text-3xl lg:text-4xl">
              A guest just checked out and something's wrong?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Send us photos and your next check-in time. We'll tell you honestly what's possible and prioritize you for same-day or next-day support where we can.
            </p>
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-md">
              <WhatsAppButton size="lg" label="WhatsApp now" className="w-full animate-soft-pulse" />
              <a
                href={`tel:${site.phoneDisplay.replace(/\s+/g, "")}`}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90"
              >
                <PhoneCall className="h-4 w-4" /> Call us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FINAL CTA */}
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
                <h2 className="mt-4 text-balance text-2xl font-bold leading-[1.15] sm:text-3xl lg:text-4xl">
                  Keep every bed fresh, clean, and guest-ready.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  Specialist mattress hygiene cleaning in Nairobi from KES 1,999. Send photos and your preferred date — we'll take it from there.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:w-auto lg:flex-col lg:items-stretch">
                <WhatsAppButton size="lg" className="w-full lg:w-auto animate-soft-pulse" />
                <Link to="/contact" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90 lg:w-auto">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
