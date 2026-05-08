import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import { MapPin, ShieldCheck, Camera, Droplets, Heart } from "lucide-react";
import illustMattressCare from "@/assets/illust-mattress-care.png";
import illustTrustBadges from "@/assets/illust-trust-badges.png";
import hospitalityLinens from "@/assets/hospitality-linens.jpg";

export default function About() {
  return (
    <PageLayout
      title="About — FreshDream Mattress Care"
      description="A specialist mattress hygiene cleaning brand in Nairobi, built around Airbnb hosts and short-stay properties. Based in Roysambu."
    >
      {/* Hero with illustration */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Built for hosts. Based in Roysambu.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              FreshDream Mattress Care is a specialist support service for Airbnb hosts, serviced
              apartments, guesthouses and short-stay property managers in Nairobi.
            </p>
          </div>
          <div className="lg:col-span-5">
            <IllustrationFrame src={illustMattressCare} alt="Mattress care illustration" tone="primary" badge="Specialist team" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow"><Heart className="h-3.5 w-3.5" /> Why we do this</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Hosts deserve a specialist partner.</h2>
            <p className="mt-4 text-muted-foreground">
              Hosts run on tight check-ins and reputation. A bad mattress photo or a lingering odor
              can cost a review — or a booking. Most cleaning companies aren't built for that
              workflow. We are.
            </p>
            <p className="mt-3 text-muted-foreground">
              We focus on mattress hygiene cleaning — the part of a property that decides whether a
              guest sleeps well — and back every job with photo documentation and honest result
              communication. No exaggerated promises. No generic "all-in-one" pitch.
            </p>
          </div>
          <figure className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={hospitalityLinens}
              alt="Crisp white hotel-quality bedding on a freshly made bed"
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
              <Camera className="h-3.5 w-3.5 text-accent" /> Documented standard
            </figcaption>
          </figure>
        </div>
      </section>

      <SectionDivider />

      <section className="section bg-surface">
        <div className="container-tight grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our standards</p>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">Four things we never cut corners on.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">A small set of non-negotiables that keep every visit calm, documented and guest-ready.</p>
          </div>
          <div className="lg:col-span-5">
            <IllustrationFrame src={illustTrustBadges} alt="Trust badges illustration" tone="primary" badge="Our standards" />
          </div>
        </div>
        <div className="container-tight mt-10">
          <div className="grid gap-5 md:grid-cols-4">
            {[
              { i: MapPin, t: "Roysambu base", d: "Quick coverage across north Nairobi and surrounding hubs." },
              { i: Droplets, t: "Dry hygiene treatment", d: "No soaking. No water extraction. Targeted spot support where suitable." },
              { i: Camera, t: "Documented service", d: "Service photos on request where suitable, with clear treatment notes." },
              { i: ShieldCheck, t: "Honest assessment", d: "Real expectations, not miracle promises." },
            ].map((it) => (
              <div key={it.t} className="card-soft group relative overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-soft/60 transition-transform group-hover:scale-110" aria-hidden="true" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-soft">
                  <it.i className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 font-semibold text-primary">{it.t}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="card-soft relative overflow-hidden bg-gradient-band p-10 text-center text-primary-foreground">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <h2 className="relative text-2xl font-bold sm:text-3xl">Ready to work together?</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
              WhatsApp us — fastest way to get a quote and a slot.
            </p>
            <div className="relative mt-6 flex justify-center"><WhatsAppButton size="lg" /></div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
