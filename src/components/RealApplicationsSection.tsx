import { BedDouble, Sofa, PawPrint } from "lucide-react";
import realMattress from "@/assets/real-mattress.webp";
import realSofa from "@/assets/real-sofa.webp";
import realPet from "@/assets/real-pet.webp";

const items = [
  {
    icon: BedDouble,
    title: "Mattresses & pillows",
    text: "Dry hygiene refresh for beds and pillows in homes, Airbnbs and serviced apartments.",
    image: realMattress,
    alt: "FreshDream dry mattress hygiene refresh on a clean white bed in Nairobi",
  },
  {
    icon: Sofa,
    title: "Sofas & cushions",
    text: "Same dry process applied to upholstery — fabric sofas, armchairs and cushions.",
    image: realSofa,
    alt: "FreshDream dry hygiene refresh on a fabric sofa cushion",
  },
  {
    icon: PawPrint,
    title: "Pet homes",
    text: "Helps lift pet hair and fine dust from beds and seating in homes with pets.",
    image: realPet,
    alt: "FreshDream dry hygiene refresh in a Nairobi home with a pet",
  },
];

export default function RealApplicationsSection() {
  return (
    <section id="real-applications" className="section bg-background scroll-mt-24">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <BedDouble className="h-3.5 w-3.5" /> Real applications
          </p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            <span className="text-gradient-brand">Where FreshDream Helps Most</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real-life dry hygiene refresh for the surfaces people sleep, sit and rest on every day.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <article
                key={it.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <img
                    src={it.image}
                    alt={it.alt}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" aria-hidden />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-soft ring-1 ring-border backdrop-blur">
                    <Icon className="h-3 w-3 text-accent" /> {it.title}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-primary">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
