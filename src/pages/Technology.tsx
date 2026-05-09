import { Link } from "react-router-dom";
import {
  Wrench, ShieldCheck, Activity, Zap, Wind,
  ArrowRight, BadgeCheck, Check, Droplets, AlertCircle, Flame,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import jimmyHero from "@/assets/jimmy/hero-jimmy-bed.jpg";
import jimmyOverview from "@/assets/jimmy/tech-overview.jpg";
import techHeatedAir from "@/assets/jimmy/tech-heated-air.jpg";
import techUvc from "@/assets/jimmy/tech-uvc.jpg";
import techSmartDust from "@/assets/jimmy/tech-smart-dust-sensor.jpg";
import techTapping from "@/assets/jimmy/tech-tapping-brushroll.jpg";

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
              FreshDream uses the JIMMY BX7 Pro Max to support dry mattress hygiene with heated air, UV-C support, smart dust detection, tapping brushroll and mattress-focused suction.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft">
              <Wrench className="h-3.5 w-3.5 text-accent" /> Powered by JIMMY BX7 Pro Max Technology
            </span>
            <div className="mt-5">
              <WhatsAppButton size="lg" label="Book on WhatsApp" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="card-soft relative overflow-hidden p-3">
              <img
                src={jimmyHero}
                alt="JIMMY BX7 Pro Max used by FreshDream for dry mattress hygiene cleaning in Nairobi"
                width={1200}
                height={1024}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
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
            FreshDream's dry process does not soak the mattress and does not use wet extraction. There is no long drying delay — fresh sheets can be placed back shortly after service. Ideal for tight Airbnb check-ins and family homes that need the bed ready the same day.
          </p>
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
                d: "Manufacturer information states that the BX7 Pro Max uses graphene heated air up to 65°C. Temperature may vary depending on surface and conditions.",
              },
              {
                img: techUvc,
                i: ShieldCheck,
                t: "UV-C Hygiene Support",
                d: "UV-C supports surface hygiene as part of the dry refresh process. Avoid medical or absolute sterilization claims.",
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
                d: "The motorized brushroll helps loosen fine dust and particles before suction removes them.",
              },
            ].map((it) => (
              <div key={it.t} className="card-soft overflow-hidden p-0">
                <img
                  src={it.img}
                  alt={`${it.t} — JIMMY BX7 Pro Max manufacturer reference`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                      <it.i className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-bold leading-snug text-primary">{it.t}</h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">{it.d}</p>
                  <p className="mt-2.5 text-[11px] font-semibold uppercase leading-snug tracking-wide text-muted-foreground break-words sm:mt-3 sm:text-[10px]">
                    Manufacturer reference image — JIMMY BX7 Pro Max
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL SPECS */}
      <section className="section">
        <div className="container-tight mx-auto max-w-4xl">
          <div className="text-center">
            <p className="eyebrow justify-center"><Wrench className="h-3.5 w-3.5" /> Technical specs</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">JIMMY BX7 Pro Max</h2>
          </div>

          <figure className="card-soft mx-auto mt-6 max-w-2xl overflow-hidden p-3">
            <img
              src={jimmyOverview}
              alt="JIMMY BX7 Pro Max product overview — manufacturer reference"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <figcaption className="mt-2 px-2 text-center text-[11px] uppercase leading-snug tracking-wide text-muted-foreground break-words sm:text-[10px]">
              Manufacturer reference image — JIMMY BX7 Pro Max
            </figcaption>
          </figure>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "700W Power",
              "245mm Suction Inlet / Cleaning Path",
              "0.5L Dust Cup",
              "MIF Filtration",
              "LED Display",
              "Dust Sensor",
              "UV Lamp",
              "Graphene Heating",
              "65°C Hot Wind Temperature",
              "Negative Ions",
              "3 Modes",
              "5m Power Cord",
            ].map((spec) => (
              <li key={spec} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm shadow-soft">
                <Check className="h-4 w-4 shrink-0 text-accent" />
                <span className="font-medium text-primary">{spec}</span>
              </li>
            ))}
          </ul>
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
