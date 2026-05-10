import {
  ArrowRight, Clock4, ShieldCheck, Wrench, MapPin,
  Sparkles, BadgeCheck, Zap, Droplets,
  MessageCircle, BedDouble, Star, Check, Wind, Activity, Flame,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import QuickQuote from "@/components/QuickQuote";


import { whatsappLink } from "@/config/site";
import { faqs } from "@/data/content";
import heroBackground from "@/assets/brand/hero-background.webp";
import logoMark from "@/assets/brand/logo-main.png";
import jimmyEquipmentProof from "@/assets/jimmy/hero-jimmy-bed.webp";
import techSmartDust from "@/assets/jimmy/tech-smart-dust-sensor.webp";
import techHeatedAir from "@/assets/jimmy/tech-heated-air.webp";
import techUvc from "@/assets/jimmy/tech-uvc.webp";
import techTapping from "@/assets/jimmy/tech-tapping-brushroll.webp";
import techOverview from "@/assets/jimmy/tech-overview.webp";

import { locationFee } from "@/data/content";

export default function Home() {
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

        <div className="container-tight grid gap-6 py-8 sm:gap-8 sm:py-12 lg:grid-cols-12 lg:items-center lg:py-14">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft sm:px-3.5 sm:py-1.5 sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5" /> FreshDream Mattress Care
            </p>
            <h1
              className="mt-3 text-[1.625rem] font-extrabold leading-[1.15] tracking-tight text-primary sm:mt-3 sm:text-4xl sm:leading-[1.1] lg:text-[2.625rem] lg:leading-[1.05]"
              style={{ textWrap: "balance" as never }}
            >
              <span className="text-gradient-brand">Dry Mattress Hygiene</span>{" "}
              <span className="text-primary">— No Wet Mattress. No Drying Time.</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Specialist mattress and upholstery care in Nairobi for homes, Airbnb hosts and serviced apartments — refreshed and guest-ready without long drying delays.
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "No wet mattress",
                "Guest-ready quickly",
                "Hospitality-aware",
                "Booking reference for every job",
              ].map((b, i) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-[11px] font-semibold text-primary shadow-soft ring-1 ring-border backdrop-blur animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-accent" /> {b}
                </li>
              ))}
            </ul>

            <div className="relative mt-4 max-w-lg overflow-hidden rounded-2xl border-2 border-accent/50 bg-card/95 px-4 py-3 shadow-lift backdrop-blur sheen">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Opening Offer · First-time customers</p>
                  <p className="mt-0.5 text-xl font-extrabold text-primary nums sm:text-2xl">from KES 1,999</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Single 1,999 · Double 2,499 · Queen 2,999 · King 3,499.</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  <Star className="h-3 w-3" /> First-time
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-whatsapp-foreground shadow-card hover:bg-whatsapp-hover animate-soft-pulse sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" /> Request a Booking on WhatsApp
              </a>
              <Link
                to="/pricing"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-6 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                See Prices <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              Based in Roysambu · Serving Nairobi · Payment details shared after booking confirmation
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <figure className="relative mx-auto overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
              <img
                src={jimmyEquipmentProof}
                alt="Professional dry mattress hygiene cleaning by FreshDream using JIMMY BX7 Pro Max"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              {/* Compact FreshDream brand mark badge */}
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-lift ring-1 ring-border backdrop-blur sm:text-[11px]">
                <img src={logoMark} alt="FreshDream" className="h-4 w-4 object-contain" />
                FreshDream
              </span>
              <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-card/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-lift ring-1 ring-accent/40 backdrop-blur sm:text-[11px]">
                <Droplets className="h-3.5 w-3.5 text-accent" /> No wet-mattress waiting
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. JIMMY TECHNOLOGY IMAGE CARDS */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Wrench className="h-3.5 w-3.5" /> Professional equipment</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
              Why FreshDream Uses JIMMY BX7 Pro Max Technology
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Professional dry mattress hygiene equipment — combining heated air, UV-C support, smart dust detection, ultrasonic mite-control support and dry suction.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: techSmartDust,
                t: "Smart Dust Detection",
                d: "The LED display helps show where more dust is present and when the surface is cleaner.",
              },
              {
                img: techHeatedAir,
                t: "65°C Heated Air",
                d: "Graphene heated air supports a fresh, dry sleeping feel without soaking the mattress.",
              },
              {
                img: techUvc,
                t: "UV-C Hygiene Support",
                d: "UV-C technology supports surface hygiene as part of the dry refresh process.",
              },
              {
                img: techTapping,
                t: "Tapping Brushroll + Dry Suction",
                d: "The composite brushroll helps loosen fine dust, hair and particles before suction removes them.",
              },
              {
                img: techOverview,
                t: "Ultrasonic Mite Control Support",
                d: "Ultrasonic technology supports mite-control as part of the combined dry hygiene system.",
              },
            ].map((it) => (
              <div key={it.t} className="card-soft overflow-hidden p-0">
                <div className="aspect-square w-full bg-white/80 p-3 flex items-center justify-center">
                  <img
                    src={it.img}
                    alt={`${it.t} — JIMMY BX7 Pro Max manufacturer reference`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-primary">{it.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs font-semibold uppercase tracking-wider text-primary/80 sm:hidden">
            700W · Up to 16 kPa · 65°C Heat · UV-C · Smart Sensor
          </p>
          <p className="mx-auto mt-6 hidden max-w-3xl text-center text-xs font-semibold uppercase tracking-wider text-primary/80 sm:block">
            700W Power · Up to 16 kPa Suction · 245mm Cleaning Path · 0.5L Dust Cup · MIF Filtration
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-center text-[11px] text-muted-foreground">
            Equipment images and technical claims are based on manufacturer information and lab conditions.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              to="/technology"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              See the Technology <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS — real 4-step process */}
      <section id="how-it-works" className="section bg-surface scroll-mt-24">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><MessageCircle className="h-3.5 w-3.5" /> How It Works</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Booking & How It Works</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Request-first booking. We review your request, confirm availability and share a FreshDream booking reference before your visit — no long drying wait after service.
            </p>
          </div>

          <ol className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: MessageCircle, t: "Send Your Booking Request", d: "Share your mattress size, location and preferred time on WhatsApp." },
              { i: ShieldCheck, t: "We Review & Confirm", d: "We check availability manually to avoid scheduling conflicts and reply with your FreshDream booking reference, final price and location fee." },
              { i: Sparkles, t: "Mattress & Upholstery Care", d: "Our specialist process refreshes your mattress or upholstery without soaking — suitable for homes, Airbnb and serviced apartments." },
              { i: BedDouble, t: "Guest-Ready Without Long Drying", d: "No wet mattress and no long drying delay — re-sheet and prepare the room shortly after the visit. Payment instructions are shared only after booking confirmation." },
            ].map((s, idx) => (
              <li key={s.t} className="card-soft relative p-5">
                <span className="absolute -top-3 left-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground shadow-soft">
                  {idx + 1}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-soft">
                  <s.i className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold text-primary">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex justify-center">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-card hover:bg-whatsapp-hover"
            >
              <MessageCircle className="h-4 w-4" /> Send a Booking Request
            </a>
          </div>
        </div>
      </section>

      {/* 3b. COMPACT COMPARISON */}
      <section className="section bg-gradient-hero">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Wind className="h-3.5 w-3.5" /> The aha moment</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Why Dry Refresh Is Different</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No soaking, no wet extraction, no long drying delay.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              {
                title: "Ordinary home vacuum",
                tone: "muted",
                items: ["Mainly visible dust", "Not mattress-focused", "No hot-air support"],
              },
              {
                title: "Wet extraction cleaning",
                tone: "muted",
                items: ["Leaves fabric damp", "Needs drying time", "Hard for tight check-ins"],
              },
              {
                title: "FreshDream dry refresh",
                tone: "hero",
                items: [
                  "Mattress-focused dry care",
                  "No soaking, no wet extraction",
                  "No wet-mattress waiting",
                  "Re-sheet sooner",
                ],
              },
            ].map((col) => {
              const isHero = col.tone === "hero";
              return (
                <div
                  key={col.title}
                  className={`relative rounded-2xl p-5 shadow-soft transition-all ${
                    isHero
                      ? "border-2 border-accent bg-gradient-to-br from-accent-soft/70 to-card shadow-lift md:-translate-y-2"
                      : "border border-border bg-card"
                  }`}
                >
                  {isHero && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
                      <Star className="h-3 w-3" /> Recommended
                    </span>
                  )}
                  <h3 className={`text-base font-bold ${isHero ? "text-primary" : "text-primary/80"}`}>{col.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {col.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isHero ? "text-accent" : "text-muted-foreground"}`} />
                        <span className={isHero ? "text-foreground" : "text-muted-foreground"}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. COMPACT OPENING OFFER / PRICING TEASER */}
      <section id="packages" className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Sparkles className="h-3.5 w-3.5" /> Opening Offer</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              <span className="text-gradient-brand">Simple, Honest Pricing</span>
            </h2>
          </div>

          <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-accent/40 bg-accent-soft/30 p-5 shadow-soft">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                <Star className="h-3 w-3" /> Opening Offer · First-time
              </p>
              <p className="mt-3 text-lg font-extrabold text-primary nums">from KES 1,999</p>
              <p className="mt-1 text-xs font-semibold text-primary/80">Single 1,999 · Double 2,499 · Queen 2,999 · King 3,499</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Discounted Freshen Up for first-time customers. Same dry process — vacuum, UV-C, warm-air freshness.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                <BadgeCheck className="h-3 w-3" /> Regular Freshen Up
              </p>
              <p className="mt-3 text-lg font-extrabold text-primary nums">from KES 2,500</p>
              <p className="mt-1 text-xs font-semibold text-primary/80">Single 2,500 · Double 3,000 · Queen 3,500 · King 4,000</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Standard rates for all mattress sizes. Sleep Area Dust Refresh +KES 300.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-2 text-center text-sm font-semibold text-primary">
            <BadgeCheck className="h-4 w-4 text-accent" />
            M-PESA &amp; Cash Accepted · Receipts on request
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/pricing"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              See full pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton size="lg" label="Book on WhatsApp" className="animate-soft-pulse" />
          </div>
        </div>
      </section>

      {/* 5. QUICK QUOTE */}
      <QuickQuote />

      {/* 6. COMPACT LOCATION FEE */}
      <section id="areas" className="section scroll-mt-24">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow justify-center"><MapPin className="h-3.5 w-3.5" /> Transparent pricing</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Areas & Location Fees</h2>
              <p className="mt-2 text-sm font-semibold text-primary">
                Transparent location fees from Roysambu across Nairobi — confirmed after your WhatsApp location pin.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{locationFee.fairness}</p>
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {locationFee.zones.map((z) => (
                <li key={z.area} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-primary">{z.area}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{z.examples}</p>
                      <p className="mt-2 text-xs font-semibold text-primary">
                        {z.fee}{z.free ? ` · ${z.free}` : ""}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center text-xs text-muted-foreground">{locationFee.bookingHint}</p>
          </div>
        </div>
      </section>

      {/* 7. AIRBNB CTA */}
      <section className="section bg-surface">
        <div className="container-tight">
          <Link
            to="/host-packages"
            className="group relative mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-hidden rounded-2xl border-2 border-accent/40 bg-gradient-to-r from-primary-soft via-card to-accent-soft/60 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:p-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft sm:h-14 sm:w-14">
                <BedDouble className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent">For Airbnb Hosts</p>
                <h2 className="mt-0.5 text-base font-bold text-primary sm:text-xl">
                  Airbnb Host?
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  Fast dry mattress refresh for turnovers — no wet-mattress waiting before the next guest.
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 8. SHORT FAQ */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Quick answers.</h2>
            <Link to="/faq" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              See all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card-soft divide-y divide-border px-6">
            {(() => {
              const wanted = [
                "How long until we can sleep on the mattress again?",
                "Do all stains come out completely?",
                "Do you offer same-day support?",
                "Do you charge a location fee?",
              ];
              return wanted
                .map((q) => faqs.find((f) => f.q === q))
                .filter((f): f is { q: string; a: string } => Boolean(f));
            })().map((f, i) => (
              <div key={i} className="py-5">
                <h3 className="text-base font-semibold text-primary">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. COMPACT FINAL CTA */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent-soft/40 to-card p-6 text-center shadow-soft sm:p-8">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">Ready to book your dry mattress refresh?</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Send your mattress size, area and preferred time on WhatsApp. Final price, location fee and time slot are confirmed before the visit.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton size="lg" label="Book on WhatsApp" />
              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-6 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                See Prices <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
