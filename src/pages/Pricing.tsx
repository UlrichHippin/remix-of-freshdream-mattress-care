import { Link } from "react-router-dom";
import { Bed, Sofa, Sparkles, Info, Check, ArrowRight, ShieldCheck, MessageCircle, Tag, Building2, Repeat, Droplets, BadgeCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import EquipmentBadge from "@/components/EquipmentBadge";
import {
  pricingAddOns,
  pricingUpholstery,
  pricingNotes,
  openingOffer,
  hostStarter,
  recurringHostPlans,
  reviewReferral,
  pricingTrustPoints,
  pricingFaqs,
  sleepAreaAddOn,
  freshSleepPackage,
} from "@/data/content";
import { packages } from "@/data/packages";
import { whatsappLink } from "@/config/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import upholsteryPhoto from "@/assets/upholstery.jpg";
import hostPortfolio from "@/assets/host-portfolio.jpg";
import heroBed from "@/assets/hero-bed.jpg";

export default function Pricing() {
  const urinePkg = packages.find((p) => p.slug === "urine-odor")!;
  const mainPackages = packages.filter((p) => p.slug !== "urine-odor");

  return (
    <PageLayout
      title="Pricing — FreshDream Mattress Care"
      description="Transparent KES pricing for professional mattress hygiene cleaning in Nairobi. Built for Airbnb hosts, serviced apartments and homes."
    >
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Clear pricing for professional mattress hygiene cleaning and host turnover support.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Transparent KES pricing for homes, Airbnb hosts and serviced apartments in Nairobi.
              Final quotes depend on size, condition, location and urgency.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" label="Book on WhatsApp" />
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-primary px-6 text-sm font-semibold text-primary hover:bg-primary-soft"
              >
                Request a quote
              </Link>
            </div>
            <div className="mt-5">
              <EquipmentBadge variant="inline" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={heroBed}
                alt="Freshly cleaned mattress in a Nairobi short-stay bedroom"
                width={1200}
                height={900}
                loading="eager"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft ring-1 ring-border backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Pricing · Nairobi · Roysambu
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 1. Opening Offer */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft relative overflow-hidden border-2 border-accent/40 p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-soft/60" aria-hidden="true" />
            <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  <Tag className="h-3 w-3" /> {openingOffer.badge} · First-Time Customers
                </span>
                <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">{openingOffer.headline}</h2>
                <p className="mt-3 text-base text-muted-foreground">{openingOffer.text}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(openingOffer.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
                  >
                    <MessageCircle className="h-4 w-4" /> {openingOffer.cta}
                  </a>
                </div>
                <p className="mt-4 text-xs italic text-muted-foreground">{openingOffer.smallPrint}</p>
              </div>
              <div className="md:col-span-5">
                <ul className="grid gap-2">
                  {openingOffer.prices.map((p, idx) => (
                    <li
                      key={p.label}
                      className={`flex items-baseline justify-between rounded-xl px-4 py-3 ${
                        idx === 0 ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground" : "bg-surface"
                      }`}
                    >
                      <span className={`text-sm font-semibold ${idx === 0 ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{p.label}</span>
                      <span className={`text-base font-bold ${idx === 0 ? "" : "text-primary"}`}>{p.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Packages */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><Bed className="h-3.5 w-3.5" /> Main service packages</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Transparent per-package pricing.</h2>
            <p className="mt-3 text-base text-muted-foreground">
              All packages are dry-treatment based and priced by mattress size. Upholstery is available on request.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {mainPackages.map((p, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={p.slug}
                  className={`card-soft relative flex flex-col overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${isPopular ? "ring-2 ring-accent shadow-lift" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute inset-x-0 top-0 flex justify-center">
                      <span className="rounded-b-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/70" aria-hidden="true" />
                  <div className={`relative ${isPopular ? "mt-4" : ""}`}>
                    <h3 className="text-lg font-bold text-primary">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.hours}</p>
                    {isPopular && (
                      <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                        <BadgeCheck className="h-3.5 w-3.5" /> Recommended for Airbnb hosts
                      </p>
                    )}
                  </div>
                  <p className="relative mt-3 text-sm text-muted-foreground">{p.summary}</p>
                  <dl className="relative mt-5 space-y-2">
                    {p.sizes.map((s, idx) => (
                      <div
                        key={s.label}
                        className={`flex items-baseline justify-between gap-3 rounded-xl px-4 py-2.5 ${
                          idx === 0 ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground" : "bg-surface"
                        }`}
                      >
                        <dt className={`text-xs font-semibold ${idx === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.label}</dt>
                        <dd className={`text-sm font-bold ${idx === 0 ? "" : "text-primary"}`}>{s.price}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="relative mt-4 text-xs italic text-muted-foreground">{p.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sleep Area Dust Refresh + Fresh Sleep Package */}
      <section className="section">
        <div className="container-tight grid gap-6 lg:grid-cols-2">
          {/* Add-on box */}
          <div className="card-soft relative overflow-hidden border-2 border-accent/40 p-6 sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
              <Sparkles className="h-3 w-3" /> Optional add-on
            </span>
            <h3 className="mt-3 text-2xl font-bold text-primary">{sleepAreaAddOn.name} — {sleepAreaAddOn.price}</h3>
            <p className="mt-2 text-sm text-muted-foreground">A quick hygiene boost around the sleeping area, added to any mattress cleaning.</p>
            <ul className="mt-4 space-y-2 text-sm">
              {sleepAreaAddOn.included.map((it) => (
                <li key={it} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{it}</span></li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-primary-soft p-3 text-xs font-medium text-primary">
              {sleepAreaAddOn.note}
            </p>
          </div>

          {/* Fresh Sleep Package */}
          <div className="card-soft relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary-soft/40 to-accent-soft/30 p-6 sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              <BadgeCheck className="h-3 w-3" /> {freshSleepPackage.badge}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-primary">{freshSleepPackage.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{freshSleepPackage.summary}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {freshSleepPackage.includes.map((it) => (
                <li key={it} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{it}</span></li>
              ))}
            </ul>
            <div className="mt-5">
              <a
                href={whatsappLink(freshSleepPackage.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
              >
                <MessageCircle className="h-4 w-4" /> {freshSleepPackage.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 3. Airbnb Host Starter Package */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft grid gap-8 overflow-hidden p-7 md:grid-cols-12 md:p-10">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                <Building2 className="h-3 w-3" /> {hostStarter.badge}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">{hostStarter.headline}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{hostStarter.text}</p>

              <ul className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
                {hostStarter.options.map((o) => (
                  <li key={o.label} className="flex items-center justify-between gap-4 p-4">
                    <span className="text-sm font-medium text-foreground">{o.label}</span>
                    <span className="text-sm font-bold text-primary">{o.price}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {hostStarter.included.map((it) => (
                  <div key={it} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" />{it}</div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={whatsappLink(hostStarter.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
                >
                  <MessageCircle className="h-4 w-4" /> {hostStarter.cta}
                </a>
              </div>
            </div>
            <div className="md:col-span-5">
              <IllustrationFrame src={hostPortfolio} alt="Airbnb host package" tone="primary" badge="Airbnb Host Package" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Urine & Odor — quote */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="card-soft relative overflow-hidden p-7 md:p-10">
            <div className="grid gap-6 md:grid-cols-12 md:items-start">
              <div className="md:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow"><Droplets className="h-3.5 w-3.5" /> Quoted treatment</p>
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Quoted after photos
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{urinePkg.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{urinePkg.description}</p>
                <p className="mt-4 text-base font-bold text-primary">{urinePkg.startingPrice}</p>
                <p className="mt-2 text-xs italic text-muted-foreground">{urinePkg.note}</p>
                <div className="mt-5">
                  <a
                    href={whatsappLink(urinePkg.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
                  >
                    <MessageCircle className="h-4 w-4" /> Send photos for a quote
                  </a>
                </div>
              </div>
              <div className="md:col-span-4">
                <ul className="space-y-2 text-sm">
                  {urinePkg.included.map((it) => (
                    <li key={it} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" />{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Add-ons */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Special treatment add-ons</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Stain, odor and urgency add-ons.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Need extra treatment or faster turnaround? Add these only when needed.
            </p>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
              {pricingAddOns.map((a) => (
                <li key={a.t} className="flex items-center justify-between gap-4 p-4">
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    {a.t}
                  </span>
                  <span className="text-sm font-bold text-primary">{a.p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow"><Sofa className="h-3.5 w-3.5" /> Available on request</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Sofas, pillows & rugs.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Upholstery, sofa and rug care is <strong>available on request</strong> alongside a mattress booking.
              Our main focus is mattress hygiene cleaning. WhatsApp us with photos for a custom quote.
            </p>
            <div className="mt-5">
              <WhatsAppButton size="lg" label="Ask about upholstery on WhatsApp" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recurring Host Plans */}
      <section className="section bg-surface">
        <div className="container-tight">
          <div className="card-soft relative overflow-hidden p-7 md:p-10">
            <p className="eyebrow"><Repeat className="h-3.5 w-3.5" /> Recurring service</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{recurringHostPlans.headline}</h2>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{recurringHostPlans.text}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {recurringHostPlans.options.map((o) => (
                <li key={o} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Repeat className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-primary">{o}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">{recurringHostPlans.note}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" label={recurringHostPlans.cta} message={recurringHostPlans.whatsappMessage} />
              <Link to="/host-packages" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary-soft">
                View host packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="section">
        <div className="container-tight">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pricingTrustPoints.map((t) => (
              <li key={t} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 shadow-soft">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Review & Referral */}
      <section className="section bg-surface">
        <div className="container-tight max-w-3xl">
          <div className="card-soft p-7 sm:p-8">
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Loyalty</p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{reviewReferral.headline}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface p-4">
                <p className="text-sm text-foreground">{reviewReferral.reviewText}</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-sm text-foreground">{reviewReferral.referralText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pricing FAQ */}
      <section className="section">
        <div className="container-tight max-w-3xl">
          <p className="eyebrow"><Info className="h-3.5 w-3.5" /> Pricing FAQ</p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Common pricing questions.</h2>
          <Accordion type="single" collapsible className="mt-6">
            {pricingFaqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Notes */}
      <section className="section bg-surface">
        <div className="container-tight max-w-3xl">
          <p className="eyebrow"><Info className="h-3.5 w-3.5" /> Pricing notes</p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {pricingNotes.map((n) => (
              <li key={n} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 shadow-soft">
                <Check className="mt-0.5 h-4 w-4 text-accent" /> <span className="text-foreground">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-tight max-w-3xl">
          <EquipmentBadge variant="card" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-tight">
          <div className="card-soft relative overflow-hidden bg-gradient-band p-10 text-primary-foreground">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready for a quote?</h2>
              <p className="mt-3 max-w-2xl text-primary-foreground/80">
                Send your location, mattress size, photos and next check-in time. We'll reply with a
                realistic price and an available slot.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton size="lg" label="WhatsApp now" />
                <Link to="/host-packages" className="inline-flex h-12 items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90">
                  Ask about host packages
                </Link>
                <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
