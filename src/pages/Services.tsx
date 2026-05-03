import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { services } from "@/data/content";
import { site } from "@/config/site";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <PageLayout
      title="Services — FreshDream Mattress Care"
      description="Turnover Freshen-Up, Deep Mattress Clean, Urine & Odor Recovery, Emergency Host Service, and Upholstery & Sofa Cleaning for Airbnb hosts in Nairobi."
    >
      <section className="border-b border-border bg-gradient-hero">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
            Specialist mattress &amp; upholstery services for short-stay properties.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose the service that fits your situation. Not sure? WhatsApp us with photos and we'll
            recommend the right one — honestly.
          </p>
          <div className="mt-6"><WhatsAppButton /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-6">
          {services.map((s) => (
            <article key={s.slug} id={s.slug} className="card-soft grid gap-6 p-7 md:grid-cols-[auto_1fr] md:p-9">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                <s.icon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.short}</p>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best for</h3>
                    <p className="mt-2 text-sm text-foreground">{s.bestFor}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's included</h3>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {s.includes.map((i) => (
                        <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
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

      <section className="section bg-surface">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Not sure which service fits?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Send a photo on WhatsApp. We'll review it and recommend the right service for your unit
            and your check-in deadline.
          </p>
          <div className="mt-6 flex justify-center"><WhatsAppButton size="lg" /></div>
          <p className="mt-6 text-xs text-muted-foreground">{site.disclaimer}</p>
        </div>
      </section>
    </PageLayout>
  );
}
