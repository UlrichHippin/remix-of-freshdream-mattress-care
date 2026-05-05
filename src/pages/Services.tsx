import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import EquipmentBadge from "@/components/EquipmentBadge";
import SectionDivider from "@/components/SectionDivider";
import { services } from "@/data/content";
import { site } from "@/config/site";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import illustHostSupport from "@/assets/illust-host-support.png";
import hospitalityBedroom from "@/assets/hospitality-bedroom.jpg";
import illustBeforeAfter from "@/assets/illust-before-after.png";

export default function Services() {
  return (
    <PageLayout
      title="Services — FreshDream Mattress Care"
      description="Freshen Up, Standard Cleaning, Intensive Stain Treatment, Urine & Odor Reduction Treatment, Emergency Host Support, and Upholstery & Sofa Refresh for Airbnb hosts in Nairobi."
    >
      {/* Hero with illustration */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Services</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Specialist mattress &amp; upholstery services for short-stay properties.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose the service that fits your situation. Not sure? WhatsApp us with photos and we'll
              recommend the right one — honestly.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <WhatsAppButton />
              <EquipmentBadge variant="inline" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={hospitalityBedroom}
                alt="Mattress cleaning Nairobi for Airbnb hosts"
                width={1200}
                height={900}
                loading="eager"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <figcaption className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-soft ring-1 ring-border backdrop-blur-sm">
                Built for hosts
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-8">
          {services.map((s, idx) => (
            <article
              key={s.slug}
              id={s.slug}
              className="card-soft grid gap-8 overflow-hidden p-6 md:grid-cols-12 md:p-8"
            >
              <div className={`md:col-span-4 ${idx % 2 === 1 ? "md:order-last" : ""}`}>
                <figure className="relative h-full overflow-hidden rounded-3xl border border-border shadow-soft">
                  <img
                    src={s.photo}
                    alt={s.photoAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                  <figcaption className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-soft ring-1 ring-border backdrop-blur-sm">
                    {`Service 0${idx + 1}`}
                  </figcaption>
                </figure>
              </div>
              <div className="md:col-span-8">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary sm:text-3xl">{s.title}</h2>
                </div>
                <p className="mt-3 text-muted-foreground">{s.short}</p>

                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best for</h3>
                    <p className="mt-2 text-sm text-foreground">{s.bestFor}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's included</h3>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {s.includes.map((i) => (
                        <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Realistic expectations</h3>
                    <p className="mt-2 flex gap-2 text-sm text-foreground"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{s.expectations}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <WhatsAppButton message={s.whatsappTemplate} label={`Book ${s.title}`} />
                  <Link to="/contact" className="inline-flex h-11 items-center justify-center rounded-full border-2 border-primary px-5 text-sm font-semibold text-primary hover:bg-primary-soft">
                    Request a quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Visible results illustration band */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={illustBeforeAfter}
                alt="Example visual of before/after mattress documentation"
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <figcaption className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-soft ring-1 ring-border backdrop-blur-sm">
                Example visual — real service photos coming soon
              </figcaption>
            </figure>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Documented service</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
              Before, after, and an honest update.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every job ends the same way: clear photo proof, a short summary of what was treated,
              and a realistic note on what to expect on the next check-in. Real before/after photos
              from FreshDream jobs are coming soon — ask us on WhatsApp for current examples.
            </p>
          </div>
        </div>
      </section>

      <EquipmentBadge variant="band" />


      <section className="relative">
        <div className="container-tight">
          <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={hospitalityBedroom}
              alt="Neatly made bed in a sunlit short-stay apartment"
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
                A clean mattress is the difference between a 4-star and 5-star review.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <SectionDivider />

      <section className="section bg-surface">
        <div className="container-tight text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Not sure which service?
          </div>
          <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Send a photo on WhatsApp.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We'll review it and recommend the right service for your unit and your check-in deadline.
          </p>
          <div className="mt-6 flex justify-center"><WhatsAppButton size="lg" /></div>
          <p className="mt-6 text-xs text-muted-foreground">{site.disclaimer}</p>
        </div>
      </section>
    </PageLayout>
  );
}
