import { Link } from "react-router-dom";
import { SmartSensorDemo } from "@/components/SmartSensorDemo";
import {
  Wrench, ShieldCheck, Activity, Zap, Wind,
  ArrowRight, BadgeCheck, Check, Droplets, AlertCircle, Flame,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import jimmyHero from "@/assets/jimmy/hero-jimmy-bed.webp";
import jimmyOverview from "@/assets/jimmy/tech-overview.webp";
import techHeatedAir from "@/assets/jimmy/tech-heated-air.webp";
import techUvc from "@/assets/jimmy/tech-uvc.webp";
import techSmartDust from "@/assets/jimmy/tech-smart-dust-sensor.webp";
import techTapping from "@/assets/jimmy/tech-tapping-brushroll.webp";

export default function Technology() {
  return (
    <PageLayout
      title="JIMMY BX7 Pro Max Technology — FreshDream Mattress Care"
      description="The professional equipment behind FreshDream Mattress Care: graphene heated air, UV-C hygiene support, smart dust detection, tapping brushroll and mattress-focused dry suction."
    >
      {/* HERO */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow"><Wrench className="h-3.5 w-3.5" /> Professional equipment</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
              The Technology Behind FreshDream Dry Mattress Hygiene
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              FreshDream uses JIMMY BX7 Pro Max technology to support dry mattress hygiene with ultrasonic mite-control support, UV-C hygiene support, 65°C heated air, smart dust detection, tapping brushroll and strong dry suction.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft">
              <Wrench className="h-3.5 w-3.5 text-accent" /> Powered by JIMMY BX7 Pro Max Technology
            </span>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/#booking-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                Request a Booking <ArrowRight className="h-4 w-4" />
              </a>
              <WhatsAppButton size="lg" label="Quick WhatsApp Inquiry" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="card-soft p-3">
              <img
                src={jimmyHero}
                alt="JIMMY BX7 Pro Max used by FreshDream for dry mattress hygiene cleaning in Nairobi"
                width={1200}
                height={1024}
                loading="lazy"
                className="w-full h-auto rounded-xl object-contain"
              />
              <figcaption className="mt-2.5 flex flex-col items-center gap-0.5 px-2 text-center leading-tight sm:mt-3 sm:gap-1">
                <span className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[12px] font-bold uppercase leading-snug tracking-wide text-primary sm:text-[11px]">
                  <Activity className="h-3.5 w-3.5 text-accent" /> Equipment used by FreshDream
                </span>
                <span className="text-[11px] uppercase leading-snug tracking-wide text-muted-foreground break-words sm:text-[10px]">
                  Manufacturer reference image — JIMMY BX7 Pro Max
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 1. NO WET MATTRESS */}
      <section className="section">
        <div className="container-tight mx-auto max-w-3xl">
          <p className="eyebrow"><Droplets className="h-3.5 w-3.5" /> Dry process</p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">No Wet Mattress, No Drying Time</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
            FreshDream's dry hygiene refresh does not soak the mattress, so there is no long wet-mattress drying delay. Fresh sheets can be placed back shortly after service — ideal for tight Airbnb check-ins and family homes that need the bed ready the same day.
          </p>

          <div className="mt-6 rounded-2xl border-l-4 border-accent bg-accent-soft/40 p-4 shadow-soft sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">700W Power + Up to 16 kPa Suction</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
              Strong dry suction helps lift dust, hair, dander and fine particles from mattress surfaces — without soaking or wet extraction.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border-l-4 border-accent bg-accent-soft/40 p-4 shadow-soft sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">Why Dry Care wins in Nairobi</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
              Unlike wet cleaning, our thermal process leaves no moisture behind, preventing mold growth even during the rainy season. Your bed is ready to use immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 2-5. CORE TECHNOLOGY */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><BadgeCheck className="h-3.5 w-3.5" /> Core technology</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">How the equipment works</h2>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            {[
              {
                img: techHeatedAir,
                i: Flame,
                t: "65°C Graphene Heated Air",
                d: "Graphene heated air supports a fresh, dry sleeping feel and helps reduce damp-feeling bedding — useful in Nairobi's humid climate. Temperature and results may vary by surface and conditions.",
              },
              {
                img: techUvc,
                i: ShieldCheck,
                t: "UV-C Hygiene Support",
                d: "UV-C technology supports surface hygiene as part of the dry refresh process. Manufacturer results may vary depending on surface, use and lab conditions.",
              },
              {
                img: techSmartDust,
                i: Activity,
                t: "Smart Dust Detection",
                d: "The LED display helps show cleaning status and where more dust is present.",
              },
              {
                img: techTapping,
                i: Zap,
                t: "Tapping Brushroll + Dry Suction",
                d: "The composite brushroll helps loosen fine dust, hair and particles, while up to 16 kPa dry suction extracts them from the mattress surface.",
              },
              {
                img: jimmyOverview,
                i: Activity,
                t: "Ultrasonic Mite Control Support",
                d: "Ultrasonic technology supports mite-control during the dry hygiene process. It is part of the combined JIMMY BX7 Pro Max system together with tapping, suction, UV-C support and heated air.",
              },
            ].map((it) => (
              <div key={it.t} className="card-soft p-0">
                <div className="bg-white/80 p-3 sm:p-4">
                  <img
                    src={it.img}
                    alt={`${it.t} — JIMMY BX7 Pro Max manufacturer reference`}
                    loading="lazy"
                    className="w-full max-h-[420px] object-contain rounded-xl"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                      <it.i className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-bold leading-snug text-primary">{it.t}</h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">{it.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Smart Sensor Live Demo */}
          <div className="mx-auto mt-10 max-w-sm">
            <SmartSensorDemo />
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Images and technical references are based on manufacturer material for the JIMMY BX7 Pro Max.
          </p>
        </div>
      </section>

      {/* 6. TECHNICAL SPECS */}
      <section className="section">
        <div className="container-tight mx-auto max-w-4xl">
          <div className="text-center">
            <p className="eyebrow justify-center"><Wrench className="h-3.5 w-3.5" /> Technical specs</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">JIMMY BX7 Pro Max</h2>
          </div>

          <figure className="card-soft mx-auto mt-6 max-w-2xl p-3">
            <img
              src={jimmyOverview}
              alt="JIMMY BX7 Pro Max product overview — manufacturer reference"
              width={1200}
              height={900}
              loading="lazy"
              className="w-full h-auto rounded-xl object-contain"
            />
            <figcaption className="mt-2 px-2 text-center text-[11px] uppercase leading-snug tracking-wide text-muted-foreground break-words sm:text-[10px]">
              Manufacturer reference image — JIMMY BX7 Pro Max
            </figcaption>
          </figure>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "700W Power", icon: Zap },
              { label: "Up to 16 kPa Suction", icon: Wind },
              { label: "245mm Cleaning Path", icon: Wind },
              { label: "0.5L Dust Cup", icon: Check },
              { label: "MIF Filtration", icon: ShieldCheck },
              { label: "LED Display", icon: Activity },
              { label: "Smart Dust Sensor", icon: Activity },
              { label: "UV-C Lamp", icon: ShieldCheck },
              { label: "Graphene Heating", icon: Flame },
              { label: "65°C Hot Air", icon: Flame },
              { label: "Negative Ions", icon: Wind },
              { label: "3 Cleaning Modes", icon: BadgeCheck },
              { label: "5m Power Cord", icon: Check },
              { label: "Ultrasonic Mite Control Support", icon: Activity },
            ].map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-card to-accent-soft/30 px-4 py-3 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lift"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Verified spec</span>
                  <span className="text-sm font-bold leading-tight text-primary">{label}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            Technical data and feature descriptions are based on JIMMY product/manufacturer information. Features may vary by market or exact model version.
          </p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="section bg-surface">
        <div className="container-tight mx-auto max-w-3xl">
          <div className="rounded-2xl border-l-4 border-accent bg-accent-soft/40 p-4 shadow-soft sm:p-5">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-primary sm:text-xs sm:tracking-wider">Honest disclaimer</p>
                <p className="mt-1.5 text-[13px] leading-snug text-foreground sm:mt-2 sm:text-sm sm:leading-relaxed">
                  Technology claims are based on manufacturer information and lab conditions. FreshDream provides a dry mattress hygiene refresh service and does not replace medical treatment, pest control or specialist deep stain removal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent-soft/40 to-card p-6 text-center shadow-soft sm:p-8">
            <p className="eyebrow justify-center"><Wind className="h-3.5 w-3.5" /> Ready when you are</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Book your dry mattress refresh</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Booking request only. Final price, Location Fee and time slot are confirmed on WhatsApp before your visit.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/#booking-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                Request a Booking <ArrowRight className="h-5 w-5" />
              </a>
              <WhatsAppButton size="lg" label="Quick WhatsApp Inquiry" />
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
