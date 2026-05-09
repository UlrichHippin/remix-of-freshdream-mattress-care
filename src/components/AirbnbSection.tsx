import { Clock4, BedDouble, Activity, MessageCircle, MapPin, Sparkles } from "lucide-react";
import { whatsappLink } from "@/config/site";

const cards = [
  {
    icon: Clock4,
    title: "No Drying Downtime",
    text: "The mattress is not soaked, so the room can be prepared faster.",
  },
  {
    icon: BedDouble,
    title: "Guest-Ready Freshness",
    text: "A fresh-feeling bed helps improve guest confidence and room presentation.",
  },
  {
    icon: Activity,
    title: "Smart Dust Detection",
    text: "Visible dust feedback supports a more controlled cleaning process.",
  },
  {
    icon: MessageCircle,
    title: "Fast WhatsApp Booking",
    text: "Send mattress size, location and preferred time directly on WhatsApp.",
  },
  {
    icon: MapPin,
    title: "Roysambu-Based Nairobi Service",
    text: "Clear service coverage and transparent location fees across Nairobi.",
  },
];

const airbnbMessage =
  "Hello FreshDream, I'd like to book the Airbnb Mattress Refresh. Here is my location pin, mattress size and preferred time:";

export default function AirbnbSection() {
  return (
    <section id="airbnb" className="section bg-surface scroll-mt-24">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <BedDouble className="h-3.5 w-3.5" /> Airbnb & serviced apartments
          </p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            <span className="text-gradient-brand">Perfect for Airbnb Turnover in Nairobi</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fresh mattresses without waiting hours for drying — ideal when the next guest is arriving soon.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </article>
            );
          })}

          <div className="flex flex-col justify-between rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-primary to-primary/85 p-6 text-primary-foreground shadow-lift">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                Hosts in Nairobi
              </p>
              <h3 className="mt-2 text-xl font-bold">Book your Airbnb mattress refresh</h3>
              <p className="mt-2 text-sm text-primary-foreground/85">
                Share mattress size, location and preferred time. Same WhatsApp booking flow — no extra
                steps, no online payment.
              </p>
            </div>
            <a
              href={whatsappLink(airbnbMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-card hover:bg-whatsapp-hover"
            >
              <MessageCircle className="h-4 w-4" /> Book Airbnb Mattress Refresh
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
