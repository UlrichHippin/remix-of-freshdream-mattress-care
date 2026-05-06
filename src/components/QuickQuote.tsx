import { useMemo, useState } from "react";
import { BedDouble, MapPin, MessageCircle, Calculator, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { whatsappLink } from "@/config/site";

type PackageKey = "freshen" | "standard" | "intensive" | "urine";
type SizeKey = "single" | "double" | "queen" | "king";
type QtyKey = "1" | "2" | "3" | "4+";
type ZoneKey = "roysambu" | "north" | "central" | "west" | "south" | "far";

const PACKAGES: { key: PackageKey; label: string }[] = [
  { key: "freshen", label: "Freshen Up" },
  { key: "standard", label: "Standard Cleaning" },
  { key: "intensive", label: "Intensive Stain Treatment" },
  { key: "urine", label: "Urine & Odor Reduction / quote required" },
];

const SIZES: { key: SizeKey; label: string }[] = [
  { key: "single", label: "Single" },
  { key: "double", label: "Double" },
  { key: "queen", label: "Queen" },
  { key: "king", label: "King" },
];

// Base prices (KES) per package x size — aligned with src/data/packages.ts
const BASE: Record<PackageKey, Record<SizeKey, number>> = {
  freshen:   { single: 2500, double: 3000, queen: 3500, king: 4000 },
  standard:  { single: 3500, double: 4000, queen: 4500, king: 5000 },
  intensive: { single: 4500, double: 5000, queen: 5500, king: 6500 },
  urine:     { single: 4500, double: 4500, queen: 4500, king: 4500 },
};

const QTY_OPTIONS: { key: QtyKey; count: number; label: string }[] = [
  { key: "1", count: 1, label: "1" },
  { key: "2", count: 2, label: "2" },
  { key: "3", count: 3, label: "3" },
  { key: "4+", count: 4, label: "4+" },
];

const ZONES: { key: ZoneKey; label: string; fee: number }[] = [
  { key: "roysambu", label: "Nearby Roysambu Area", fee: 0 },
  { key: "north",    label: "North Nairobi", fee: 500 },
  { key: "central",  label: "Central Nairobi", fee: 800 },
  { key: "west",     label: "West / Premium Areas", fee: 1200 },
  { key: "south",    label: "South / East Nairobi", fee: 1000 },
  { key: "far",      label: "Far Nairobi / Outside Nairobi", fee: 1800 },
];

const ADDON_PRICE = 300;

const fmt = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

export default function QuickQuote() {
  const [pkg, setPkg] = useState<PackageKey | "">("");
  const [size, setSize] = useState<SizeKey | "">("");
  const [qty, setQty] = useState<QtyKey>("1");
  const [addon, setAddon] = useState<"no" | "yes">("no");
  const [zone, setZone] = useState<ZoneKey | "">("");

  const pkgLabel = PACKAGES.find((p) => p.key === pkg)?.label ?? "";
  const sizeLabel = SIZES.find((s) => s.key === size)?.label ?? "";
  const zoneObj = ZONES.find((z) => z.key === zone);
  const qtyObj = QTY_OPTIONS.find((q) => q.key === qty)!;

  const { total, ready } = useMemo(() => {
    if (!pkg || !size || !zone) return { total: 0, ready: false };
    const base = BASE[pkg][size];
    const mattresses = base * qtyObj.count;
    const addonTotal = addon === "yes" ? ADDON_PRICE * qtyObj.count : 0;
    const fee = zoneObj?.fee ?? 0;
    return { total: mattresses + addonTotal + fee, ready: true };
  }, [pkg, size, qty, addon, zone, qtyObj.count, zoneObj?.fee]);

  const isUrine = pkg === "urine";
  const showEstimate = ready && !isUrine && qty !== "4+";

  const totalLabel = !ready
    ? "Choose options above"
    : isUrine
      ? "Quote required — confirmed on WhatsApp"
      : qty === "4+"
        ? "Custom quote on WhatsApp"
        : `from ${fmt(total)}`;

  const message =
    `Hello FreshDream Mattress Care,\n\n` +
    `I would like to request a mattress cleaning quote.\n\n` +
    `Package: ${pkgLabel || "-"}\n` +
    `Mattress size: ${sizeLabel || "-"}\n` +
    `Number of mattresses: ${qtyObj.label}\n` +
    `Sleep Area Dust Refresh: ${addon === "yes" ? "Yes (+ KES 300 each)" : "No"}\n` +
    `Location zone: ${zoneObj?.label || "-"}\n` +
    `Estimated total: ${showEstimate ? `from ${fmt(total)}` : isUrine ? "Quote required" : qty === "4+" ? "Custom quote required" : "-"}\n` +
    `Preferred date:\n` +
    `Location pin:\n` +
    `Photos:\n\n` +
    `Please confirm the final price and available slot.`;

  return (
    <section id="quick-quote" className="section bg-surface">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center"><Calculator className="h-3.5 w-3.5" /> Quick Quote</p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Get a Quick Estimate</h2>
          <p className="mt-3 text-muted-foreground">
            Choose your mattress size, package and area to see an estimated price. Final price is confirmed on WhatsApp after receiving your location pin.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="card-soft border-2 border-accent/40 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-accent" /> Package</Label>
                <Select value={pkg} onValueChange={(v) => setPkg(v as PackageKey)}>
                  <SelectTrigger><SelectValue placeholder="Choose a package" /></SelectTrigger>
                  <SelectContent>
                    {PACKAGES.map((p) => <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5 text-accent" /> Mattress size</Label>
                <Select value={size} onValueChange={(v) => setSize(v as SizeKey)}>
                  <SelectTrigger><SelectValue placeholder="Choose a size" /></SelectTrigger>
                  <SelectContent>
                    {SIZES.map((s) => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Number of mattresses</Label>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {QTY_OPTIONS.map((q) => (
                    <button
                      key={q.key}
                      type="button"
                      onClick={() => setQty(q.key)}
                      className={`h-10 rounded-lg border-2 text-sm font-semibold transition-colors ${
                        qty === q.key
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-card text-primary hover:border-accent/60"
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Add Sleep Area Dust Refresh?</Label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {[
                    { v: "no" as const, l: "No" },
                    { v: "yes" as const, l: "Yes + KES 300" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setAddon(o.v)}
                      className={`h-10 rounded-lg border-2 text-sm font-semibold transition-colors ${
                        addon === o.v
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-card text-primary hover:border-accent/60"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-accent" /> Location zone</Label>
                <Select value={zone} onValueChange={(v) => setZone(v as ZoneKey)}>
                  <SelectTrigger><SelectValue placeholder="Choose your area" /></SelectTrigger>
                  <SelectContent>
                    {ZONES.map((z) => (
                      <SelectItem key={z.key} value={z.key}>
                        {z.label}{z.fee > 0 ? ` (+ ${fmt(z.fee)} location fee)` : " (no extra fee)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Result */}
            <div className="mt-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary-soft to-accent-soft/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Estimated total</p>
                  <p className="mt-1 text-2xl font-extrabold text-primary sm:text-3xl">
                    {ready
                      ? (showEstimate ? `from ${fmt(total)}` : totalLabel)
                      : "Choose options above"}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft">
                  <Calculator className="h-3.5 w-3.5 text-accent" /> KES estimate
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                This is an estimate. Final price, location fee and available slot are confirmed on WhatsApp after receiving your location pin.
              </p>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-whatsapp-foreground shadow-card transition-all hover:bg-whatsapp-hover animate-soft-pulse sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
