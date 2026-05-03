import PageLayout from "@/components/PageLayout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import upholstery from "@/assets/upholstery.jpg";
import { MapPin, ShieldCheck, Camera, Droplets } from "lucide-react";

export default function About() {
  return (
    <PageLayout
      title="About — FreshDream Mattress Care"
      description="A specialist mattress and upholstery cleaning brand in Nairobi, built around Airbnb hosts and short-stay properties. Based in Roysambu."
    >
      <section className="border-b border-border bg-gradient-hero">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
            Built for hosts. Based in Roysambu.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            FreshDream Mattress Care is a specialist support service for Airbnb hosts, serviced
            apartments, guesthouses and short-stay property managers in Nairobi.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Why we do this</h2>
            <p className="mt-4 text-muted-foreground">
              Hosts run on tight check-ins and reputation. A bad mattress photo or a lingering odor
              can cost a review — or a booking. Most cleaning companies aren't built for that
              workflow. We are.
            </p>
            <p className="mt-3 text-muted-foreground">
              We focus on mattresses and upholstery — the parts of a property that decide whether a
              guest sleeps well — and back every job with photo documentation and honest result
              communication. No exaggerated promises. No generic "all-in-one" pitch.
            </p>
          </div>
          <img src={upholstery} alt="Clean upholstered sofa in a short-stay apartment" width={1200} height={900} loading="lazy"
               className="rounded-2xl border border-border object-cover shadow-card" />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tight">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Our standards</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              { i: MapPin, t: "Roysambu base", d: "Quick coverage across north Nairobi and surrounding hubs." },
              { i: Droplets, t: "Controlled-moisture", d: "Process designed to help reduce drying time on tight turnovers." },
              { i: Camera, t: "Documented service", d: "Before/after photos and clear treatment notes on every job." },
              { i: ShieldCheck, t: "Honest assessment", d: "Real expectations, not miracle promises." },
            ].map((it) => (
              <div key={it.t} className="card-soft p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><it.i className="h-5 w-5" /></div>
                <h3 className="mt-4 font-semibold text-primary">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Ready to work together?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">WhatsApp us — fastest way to get a quote and a slot.</p>
          <div className="mt-6 flex justify-center"><WhatsAppButton size="lg" /></div>
        </div>
      </section>
    </PageLayout>
  );
}
