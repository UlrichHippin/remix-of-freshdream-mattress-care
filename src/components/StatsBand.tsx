import { BedDouble, Star, Clock4, MapPin } from "lucide-react";
import StatCounter from "./StatCounter";

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-tight relative py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter icon={BedDouble} end={500} suffix="+" label="Mattresses Cleaned" />
          <StatCounter icon={Star} end={4.9} decimals={1} suffix="★" label="Average Rating" />
          <StatCounter icon={Clock4} end={24} suffix="h" label="WhatsApp Reply" />
          <StatCounter icon={MapPin} end={6} label="Nairobi Zones" />
        </div>
      </div>
    </section>
  );
}
