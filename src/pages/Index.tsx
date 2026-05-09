import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, Clock4, ShieldCheck, Wrench, MapPin, AlarmClock,
  PhoneCall, Sparkles,
  BadgeCheck, Zap, Droplets,
  MessageCircle, BedDouble, Star, Check, Package, Wind, Activity, Flame,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import BookingSection from "@/components/BookingSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import QuickQuote from "@/components/QuickQuote";
import ProcessTimeline from "@/components/ProcessTimeline";
import EquipmentProof from "@/components/EquipmentProof";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { whatsappLink } from "@/config/site";
import { faqs } from "@/data/content";
import { site } from "@/config/site";
import heroBackground from "@/assets/brand/hero-background.webp";
import logoMark from "@/assets/brand/logo-main.png";
import jimmyImage from "@/assets/jimmy-bx7-pro-max.jpg";
import heroDevice from "@/assets/hero-jimmy-mattress.webp";

import { packages, type PackageDef as Pkg } from "@/data/packages";
import { locationFee } from "@/data/content";

export default function Home() {
  const [activePkg, setActivePkg] = useState<Pkg | null>(null);

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
              FreshDream Mattress Care provides professional dry mattress hygiene in Nairobi using JIMMY BX7 Pro Max technology: UV-C hygiene support, 65°C heated air, smart dust detection and dry suction — ideal for homes, Airbnb rooms and serviced apartments.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-primary px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-primary-foreground shadow-lift sm:text-sm">
              <Droplets className="h-4 w-4" />
              Dry mattress care · No wet-mattress waiting
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "No wet mattress",
                "Ready to use immediately",
                "UV-C support",
                "65°C heated air",
                "Smart dust detection",
                "M-PESA accepted",
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

            <div className="mt-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
                <Wrench className="h-3.5 w-3.5 text-accent" />
                Powered by JIMMY BX7 Pro Max Technology
              </span>
            </div>

            <div className="relative mt-4 max-w-lg overflow-hidden rounded-2xl border-2 border-accent/50 bg-card/95 px-4 py-3 shadow-lift backdrop-blur sheen">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Opening Offer · First-time customers</p>
                  <p className="mt-0.5 text-xl font-extrabold text-primary nums sm:text-2xl">from KES 1,999</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Single 1,999 · Double 2,499 · Queen 2,999 · King 3,499.</p>
                  <p className="mt-1 text-[11px] font-medium text-primary/80">Opening Offer = discounted Freshen Up for first-time customers.</p>
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
                <MessageCircle className="h-5 w-5" /> Book on WhatsApp
              </a>
              <a
                href="#packages"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-6 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                See Prices <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <MapPin className="h-4 w-4 text-accent" />
              Based in Roysambu · Serving Nairobi · M-PESA accepted
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto">
              <span className="absolute -inset-4 -z-10 rounded-3xl bg-accent/20 blur-3xl animate-glow-pulse" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift ring-1 ring-accent/20">
                <img
                  src={heroDevice}
                  alt="FreshDream Mattress Care — professional dry mattress hygiene with JIMMY BX7 Pro Max in Nairobi"
                  width={1600}
                  height={1067}
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" aria-hidden />
              </div>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-lift ring-1 ring-accent/40 backdrop-blur sm:text-[11px]">
                <Wrench className="h-3.5 w-3.5 text-accent" /> Powered by JIMMY BX7 Pro Max Technology
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT PROOF */}
      <EquipmentProof />

      {/* QUICK QUOTE */}
      <QuickQuote />

      {/* COMPACT PRICING TABLE */}
      <section id="packages" className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Package className="h-3.5 w-3.5" /> Packages & Pricing</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              <span className="text-gradient-brand">Simple, Honest Pricing</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Transparent starting prices by mattress size. No soaking, no wet-mattress waiting.
            </p>
          </div>

          {/* Desktop pricing table */}
          <div className="mx-auto mt-8 hidden max-w-4xl overflow-hidden rounded-2xl border-2 border-accent/30 bg-card shadow-soft sm:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wider sm:px-4">Package</th>
                    <th className="px-2 py-3 text-right text-[11px] font-bold uppercase tracking-wider sm:px-4">Single</th>
                    <th className="px-2 py-3 text-right text-[11px] font-bold uppercase tracking-wider sm:px-4">Double</th>
                    <th className="px-2 py-3 text-right text-[11px] font-bold uppercase tracking-wider sm:px-4">Queen</th>
                    <th className="px-2 py-3 text-right text-[11px] font-bold uppercase tracking-wider sm:px-4">King</th>
                    <th className="hidden px-2 py-3 sm:table-cell sm:px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {packages.map((p, i) => (
                    <tr key={p.title} className={i === 1 ? "bg-accent-soft/40" : "bg-card"}>
                      <td className="px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActivePkg(p)}
                            className="text-left font-bold text-primary hover:underline"
                          >
                            {p.title}
                          </button>
                          {i === 1 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-foreground">
                              <Star className="h-2.5 w-2.5" /> Recommended
                            </span>
                          )}
                        </div>
                      </td>
                      {p.sizes.length === 4 ? (
                        p.sizes.map((s) => (
                          <td key={s.label} className="px-2 py-3 text-right font-semibold text-primary nums sm:px-4">
                            {s.price.replace("KES ", "")}
                          </td>
                        ))
                      ) : (
                        <td colSpan={4} className="px-2 py-3 text-right text-xs font-semibold text-primary sm:px-4">
                          {p.sizes[0].price}
                        </td>
                      )}
                      <td className="hidden px-2 py-3 text-right sm:table-cell sm:px-4">
                        <button
                          type="button"
                          onClick={() => setActivePkg(p)}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border bg-surface px-4 py-3 text-xs text-muted-foreground">
              <p>All prices in KES — regular package rates. <span className="font-semibold text-primary">Sleep Area Dust Refresh +KES 300.</span></p>
              <p className="mt-1"><span className="font-semibold text-accent">Opening Offer:</span> Single 1,999 · Double 2,499 · Queen 2,999 · King 3,499 — first-time customers only.</p>
            </div>
          </div>

          {/* Mobile pricing cards */}
          <div className="mx-auto mt-8 grid max-w-md gap-4 sm:hidden">
            {packages.filter((p) => p.sizes.length === 4).map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setActivePkg(p)}
                className={`rounded-2xl border-2 p-4 text-left shadow-soft transition-all active:scale-[0.99] ${i === 1 ? "border-accent bg-accent-soft/30" : "border-border bg-card"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-primary">{p.title}</h3>
                  {i === 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-foreground">
                      <Star className="h-2.5 w-2.5" /> Recommended
                    </span>
                  )}
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {p.sizes.map((s) => (
                    <li key={s.label} className="flex items-center justify-between rounded-lg bg-background/60 px-2.5 py-1.5">
                      <span className="font-semibold text-muted-foreground">{s.label}</span>
                      <span className="font-bold text-primary nums">{s.price.replace("KES ", "")}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[11px] font-semibold text-accent">Tap for details →</p>
              </button>
            ))}
            <div className="rounded-2xl border border-border bg-surface p-3 text-xs text-muted-foreground">
              <p><span className="font-semibold text-primary">Sleep Area Dust Refresh</span> + KES 300</p>
              <p className="mt-1">Location Fee confirmed after WhatsApp location pin.</p>
              <p className="mt-1">Final price confirmed by WhatsApp before visit.</p>
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-accent/40 bg-accent-soft/30 p-4 shadow-soft">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                <Star className="h-3 w-3" /> Opening Offer
              </p>
              <p className="mt-2 text-sm font-bold text-primary">Single 1,999 · Double 2,499 · Queen 2,999 · King 3,499</p>
              <p className="mt-1 text-xs font-semibold text-primary/80">Opening Offer = discounted Freshen Up for first-time customers.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Same Freshen Up dry process: vacuum, dust &amp; dander removal, UV-C surface hygiene, warm-air freshness.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Limited launch period. Final price confirmed on WhatsApp.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                <BadgeCheck className="h-3 w-3" /> Regular Freshen Up
              </p>
              <p className="mt-2 text-sm font-bold text-primary">Single 2,500 · Double 3,000 · Queen 3,500 · King 4,000</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Standard pricing for repeat bookings and all mattress sizes. Same dry process — vacuum, dust &amp; dander removal, UV-C surface hygiene, warm-air freshness, no soaking.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-2 text-center text-sm font-semibold text-primary">
            <BadgeCheck className="h-4 w-4 text-accent" />
            M-PESA &amp; Cash Accepted · Receipts on request
          </p>

          <div className="mt-8 flex justify-center">
            <WhatsAppButton size="lg" label="Book a Cleaning" className="w-full sm:w-auto animate-soft-pulse" />
          </div>
        </div>
      </section>

      {/* PACKAGE DETAILS DIALOG */}
      <Dialog open={!!activePkg} onOpenChange={(open) => !open && setActivePkg(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {activePkg && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary">{activePkg.title}</DialogTitle>
                <DialogDescription className="mt-2 text-sm italic text-muted-foreground">
                  {activePkg.tagline}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <p className="text-sm text-foreground">{activePkg.description}</p>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Pricing by size</p>
                  <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {activePkg.sizes.map((s) => (
                      <li key={s.label} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
                        <span className="font-medium text-muted-foreground">{s.label}</span>
                        <span className="font-bold text-primary nums">{s.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">What's included</p>
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
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Best for</p>
                  <p className="mt-1 text-sm text-muted-foreground">{activePkg.bestFor.join(" · ")}</p>
                </div>

                <div className="rounded-xl border-l-4 border-accent bg-accent-soft/40 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Realistic expectation</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activePkg.note}</p>
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

      {/* WHY DRY CARE — COMPARISON */}
      <section className="section bg-gradient-hero">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><Wind className="h-3.5 w-3.5" /> The aha moment</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">Why dry mattress care saves time</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              FreshDream dry care does not soak the mattress or use wet extraction, so there is no long wet-mattress drying delay.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              {
                title: "Ordinary home vacuum",
                tone: "muted",
                items: ["Mainly visible dust", "Not mattress-focused", "No hot-air support", "No smart dust guidance"],
              },
              {
                title: "Wet extraction cleaning",
                tone: "muted",
                items: ["Can help selected stain cases", "Leaves fabric damp or wet", "Needs drying time", "Difficult for tight check-in windows"],
              },
              {
                title: "FreshDream dry care",
                tone: "hero",
                items: [
                  "JIMMY BX7 Pro Max mattress-focused device",
                  "No soaking",
                  "No wet extraction",
                  "No long wet-mattress drying delay",
                  "Re-sheet sooner",
                  "Ideal for Airbnb turnover days",
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
                  {isHero && (
                    <span
                      className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-accent/20 blur-2xl animate-glow-pulse"
                      aria-hidden="true"
                    />
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

          {/* Airbnb turnover mini timeline */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-center text-[11px] font-bold uppercase tracking-wider text-accent">
              Example Airbnb turnover flow
            </p>
            <ol className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
              {["Check-out", "Dry care service", "Re-sheet sooner", "Guest-ready room"].map((step, i, arr) => (
                <li key={step} className="flex items-center gap-2 sm:flex-1 sm:flex-col sm:text-center">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-primary">{step}</span>
                  {i < arr.length - 1 && (
                    <ArrowRight className="ml-auto h-4 w-4 text-accent sm:ml-0 sm:hidden" />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Timing depends on booking size, mattress condition and route availability.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <div id="how-it-works" className="scroll-mt-24"><ProcessTimeline /></div>

      {/* LOCATION FEE — COMPACT */}
      <section id="areas" className="section scroll-mt-24">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow justify-center"><MapPin className="h-3.5 w-3.5" /> Transparent pricing</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Location Fee</h2>
              <p className="mt-2 text-sm font-semibold text-primary">
                Location Fee from KES 300 · charged once per visit · confirmed after WhatsApp location pin.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{locationFee.fairness}</p>
            </div>

            <ul className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card text-sm shadow-soft">
              {locationFee.zones.map((z) => (
                <li key={z.area} className="flex items-center justify-between gap-3 px-3 py-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="truncate text-xs font-semibold text-primary sm:text-sm">{z.area}</span>
                  </div>
                  <span className="shrink-0 text-right text-xs font-medium text-muted-foreground">
                    {z.fee}{z.free ? ` · ${z.free}` : ""}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center text-xs text-muted-foreground">{locationFee.bookingHint}</p>
          </div>
        </div>
      </section>

      {/* AIRBNB CTA BANNER */}
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
                  Are you an Airbnb Host?
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  Click here for our specialized turnover packages.
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      {/* JIMMY BX7 PRO MAX EQUIPMENT */}
      <section className="section">
        <div className="container-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow"><Wrench className="h-3.5 w-3.5" /> Professional equipment</p>
              <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
                Powered by JIMMY BX7 Pro Max
              </h2>
              <p className="mt-4 text-muted-foreground">
                FreshDream uses the JIMMY BX7 Pro Max as a mattress-focused dry-care device. In most dry-care cases, fresh sheets can be placed back shortly after service.
              </p>

              <div className="mt-5 rounded-2xl border-l-4 border-accent bg-accent-soft/40 p-5 shadow-soft">
                <p className="text-sm font-bold text-primary">No wet-mattress waiting time</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Because the core process is dry, there is no long drying delay like after wet extraction. Fresh sheets can be placed back shortly after service.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="card-soft relative overflow-hidden p-3">
                <img
                  src={jimmyImage}
                  alt="JIMMY BX7 Pro Max used for dry mattress hygiene cleaning in Nairobi"
                  width={1200}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
                <figcaption className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Activity className="h-3.5 w-3.5 text-accent" /> JIMMY BX7 Pro Max mattress-focused dry-care device
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Feature cards — compact */}
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { i: Flame, t: "65°C Graphene", d: "Hot-air freshness", hero: true },
              { i: Zap, t: "16kPa Suction", d: "Mattress-focused power" },
              { i: ShieldCheck, t: "UV-C Support", d: "Surface hygiene" },
              { i: Clock4, t: "No Wet-Mattress Waiting", d: "No soaking or wet extraction" },
            ].map((it) => (
              <div key={it.t} className={`relative rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lift ${it.hero ? "border-2 border-accent bg-gradient-to-br from-accent-soft/60 to-card shadow-lift" : "card-soft"}`}>
                <div className={`grid h-10 w-10 place-items-center rounded-xl shadow-soft ${it.hero ? "bg-gradient-to-br from-accent to-accent/70 text-accent-foreground" : "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"}`}>
                  <it.i className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-primary">{it.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
            {faqs.slice(0, 4).map((f, i) => (
              <div key={i} className="py-5">
                <h3 className="text-base font-semibold text-primary">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICE PROMISE */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft mx-auto max-w-4xl border-2 border-accent/30 bg-gradient-to-br from-card to-surface p-6 sm:p-8">
            <div className="text-center">
              <p className="eyebrow justify-center"><ShieldCheck className="h-3.5 w-3.5" /> Our Service Promise</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Honest, Documented, Private</h2>
              <p className="mt-2 text-sm text-muted-foreground">Realistic expectations. Service photos on request. Privacy respected.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { i: Camera, t: "Service Photos", d: "Photos on request where suitable" },
                { i: MessageCircle, t: "WhatsApp Summary", d: "Service report after each job" },
                { i: ShieldCheck, t: "100% Private", d: "Your home, fully respected" },
              ].map((it) => (
                <div key={it.t} className="rounded-xl border border-border bg-card p-4 text-center shadow-soft">
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                    <it.i className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-primary">{it.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{it.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <WhatsAppButton size="lg" label="Book on WhatsApp" />
            </div>
          </div>
        </div>
      </section>

      {/* FIRST BOOKING CONFIDENCE */}
      <section className="pt-12 sm:pt-16">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent-soft/40 to-card p-5 shadow-soft sm:p-6">
            <p className="eyebrow"><ShieldCheck className="h-3.5 w-3.5" /> First booking confidence</p>
            <h2 className="mt-3 text-xl font-bold text-primary sm:text-2xl">Confirmed on WhatsApp before your visit</h2>
            <p className="mt-3 text-sm text-foreground">
              Before your visit, we confirm everything on WhatsApp: final price, Location Fee, available time slot, service expectation and M-PESA/cash payment option.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <BookingSection />
    </PageLayout>
  );
}
