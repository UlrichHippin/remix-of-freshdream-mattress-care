import { Link } from "react-router-dom";
import {
  Wrench, Flame, ShieldCheck, Activity, Zap, Wind, Clock4,
  ArrowRight, BadgeCheck, Check,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import jimmyImage from "@/assets/jimmy-bx7-pro-max.jpg";

export default function Technology() {
  return (
    <PageLayout
      title="JIMMY BX7 Pro Max Technology | FreshDream Mattress Care Nairobi"
      description="The professional dry mattress hygiene technology behind FreshDream Mattress Care: UV-C support, 65°C heated air, smart dust detection and dry suction."
    >
      {/* HERO */}
      <section className="section bg-surface">
        <div className="container-tight grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow"><Wrench className="h-3.5 w-3.5" /> Professional equipment</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
              The Technology Behind FreshDream
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              FreshDream Mattress Care uses JIMMY BX7 Pro Max — a mattress-focused dry-care device. This page explains the technology used during every service so you know exactly what's happening to your mattress.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft">
              <Wrench className="h-3.5 w-3.5 text-accent" /> Powered by JIMMY BX7 Pro Max Technology
            </span>
          </div>
          <div className="lg:col-span-5">
            <figure className="card-soft relative overflow-hidden p-3">
              <img
                src={jimmyImage}
                alt="JIMMY BX7 Pro Max used by FreshDream for dry mattress hygiene cleaning in Nairobi"
                width={1200}
                height={1024}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <figcaption className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Activity className="h-3.5 w-3.5 text-accent" /> Equipment used by FreshDream
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CORE TECHNOLOGY */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><BadgeCheck className="h-3.5 w-3.5" /> Core technology</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Four pillars of dry mattress hygiene</h2>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            {[
              {
                i: Flame,
                t: "65°C Heated Air",
                d: "Warm air supports a fresh, dry sleeping feel without soaking the mattress. Designed to refresh the surface fibres without long drying time.",
              },
              {
                i: ShieldCheck,
                t: "UV-C Hygiene Support",
                d: "UV-C technology supports a more hygienic mattress surface as part of the dry refresh process. No chemicals, no soaking.",
              },
              {
                i: Activity,
                t: "Smart Dust Detection",
                d: "The LED display helps show where more dust is present and when the surface is cleaner — so we know when each section is properly serviced.",
              },
              {
                i: Zap,
                t: "Tapping Brushroll + Dry Suction",
                d: "The brushroll helps loosen fine dust and particles before suction removes them — ideal for surface debris and embedded dust.",
              },
            ].map((it) => (
              <div key={it.t} className="card-soft p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <it.i className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold text-primary">{it.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow justify-center"><Wrench className="h-3.5 w-3.5" /> Technical specs</p>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">JIMMY BX7 Pro Max</h2>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { t: "700W Power", d: "Strong, efficient suction performance" },
                { t: "245mm Cleaning Path", d: "Wider strokes, faster service" },
                { t: "0.5L Dust Cup", d: "Hygienic, easy-to-empty container" },
                { t: "MIF Filtration", d: "Fine-particle filtration support" },
                { t: "16kPa Suction", d: "Mattress-focused dry suction" },
                { t: "No Wet-Mattress Waiting", d: "No soaking, no wet extraction" },
              ].map((it) => (
                <li key={it.t} className="card-soft flex items-start gap-3 p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-bold text-primary">{it.t}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{it.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent-soft/40 to-card p-6 shadow-soft sm:p-8">
            <p className="eyebrow"><Wind className="h-3.5 w-3.5" /> Why it matters</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">No wet mattress. Ready to use immediately.</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
              Because the process is dry, there is no long drying delay like after wet extraction. Fresh sheets can be placed back shortly after service — ideal for tight Airbnb check-ins and family homes.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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
