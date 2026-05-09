import {
  Wrench, Zap, Maximize2, Flame, ShieldCheck, Activity,
  Wind, Filter, Package as PackageIcon,
} from "lucide-react";
import techDustDetection from "@/assets/tech-dust-detection.webp";
import techHeatedAir from "@/assets/tech-heated-air.webp";
import techUvc from "@/assets/tech-uvc.webp";
import techBrushroll from "@/assets/tech-brushroll.webp";

type Card = {
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
};

const cards: Card[] = [
  {
    title: "700W Power",
    text: "Strong dry suction helps lift dust, hair and fine particles from mattress surfaces.",
    icon: Zap,
  },
  {
    title: "245mm Wide Cleaning Path",
    text: "Covers more mattress surface faster — useful for homes, Airbnb rooms and multiple beds.",
    icon: Maximize2,
  },
  {
    title: "65°C Heated Air",
    text: "Graphene heated air supports a fresh, dry sleeping feel without soaking the mattress.",
    icon: Flame,
    image: techHeatedAir,
  },
  {
    title: "UV-C Hygiene Support",
    text: "UV-C technology supports a more hygienic mattress surface as part of the dry refresh process.",
    icon: ShieldCheck,
    image: techUvc,
  },
  {
    title: "Smart Dust Detection",
    text: "The LED display helps show where more dust is present and when the surface is cleaner.",
    icon: Activity,
    image: techDustDetection,
  },
  {
    title: "Tapping Brushroll",
    text: "The motorized brushroll helps loosen fine dust and particles before suction removes them.",
    icon: Wind,
    image: techBrushroll,
  },
  {
    title: "Dual Cyclone + MIF Filtration",
    text: "Designed to separate dust from airflow and support more consistent suction.",
    icon: Filter,
  },
  {
    title: "0.5L Dust Cup",
    text: "Practical dust capacity for cleaning beds, pillows and fabric surfaces efficiently.",
    icon: PackageIcon,
  },
];

export default function EquipmentProof() {
  return (
    <section id="equipment" className="section bg-surface scroll-mt-24">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <Wrench className="h-3.5 w-3.5" /> Professional equipment
          </p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            <span className="text-gradient-brand">Professional JIMMY BX7 Pro Max Technology</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            FreshDream uses advanced dry mattress hygiene technology to refresh mattresses without soaking them.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">FreshDream</span> remains the service brand. The
            JIMMY BX7 Pro Max is our professional equipment for dry mattress hygiene.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                {c.image ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={c.image}
                      alt={`${c.title} — JIMMY BX7 Pro Max equipment used by FreshDream`}
                      loading="lazy"
                      width={900}
                      height={675}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-soft ring-1 ring-border backdrop-blur">
                      <Icon className="h-3 w-3 text-accent" />
                      Equipment proof
                    </span>
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary-soft to-accent-soft">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-card text-primary shadow-soft">
                      <Icon className="h-8 w-8" />
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-bold text-primary">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          JIMMY BX7 Pro Max is the professional dry mattress hygiene device used by FreshDream Mattress Care.
          Equipment images are provided as technology proof.
        </p>
      </div>
    </section>
  );
}
