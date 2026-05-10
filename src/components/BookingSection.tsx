import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, Send, ShieldCheck, Droplets, Zap, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappLink } from "@/config/site";
import { packageBookingLabels } from "@/data/packages";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type ServiceEnum = "turnover" | "deep_clean" | "urine_odor" | "emergency" | "upholstery" | "other";

function mapPackageToService(pkg: string, item: string): ServiceEnum {
  const p = pkg.toLowerCase();
  if (item.toLowerCase().includes("sofa") || item.toLowerCase().includes("upholstery")) return "upholstery";
  if (p.includes("urine") || p.includes("odor") || p.includes("odour")) return "urine_odor";
  if (p.includes("emergency") || p.includes("host support")) return "emergency";
  if (p.includes("freshen") || p.includes("turnover") || p.includes("opening")) return "turnover";
  if (p.includes("standard") || p.includes("intensive") || p.includes("deep")) return "deep_clean";
  return "other";
}

// Map preferred time slot label to [startHour, endHour]
function timeSlotToHours(time: string): [number, number] {
  if (time.startsWith("Morning")) return [8, 11];
  if (time.startsWith("Midday")) return [11, 14];
  if (time.startsWith("Afternoon")) return [14, 17];
  if (time.startsWith("Evening")) return [17, 19];
  return [9, 17]; // Flexible
}

const PACKAGES = packageBookingLabels as readonly string[];

const ITEM_TYPES = ["Mattress", "Multiple mattresses", "Sofa / upholstery (request via WhatsApp)", "Other / request by WhatsApp"] as const;
const SIZES = [
  "Single (3x6 ft)",
  "Double (4x6 ft)",
  "Queen (5x6 ft)",
  "King (6x6 ft)",
  "Mixed sizes (specify in notes)",
] as const;
const TIMES = ["Morning (8:00–11:00)", "Midday (11:00–14:00)", "Afternoon (14:00–17:00)", "Evening (17:00–19:00)", "Flexible"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid WhatsApp number").max(25),
  pkg: z.string().refine((v) => PACKAGES.includes(v), { message: "Choose a package" }),
  item: z.enum(ITEM_TYPES, { errorMap: () => ({ message: "Choose an item type" }) }),
  size: z.enum(SIZES, { errorMap: () => ({ message: "Choose a size" }) }),
  quantity: z.coerce.number().int().min(1, "At least 1 mattress").max(20, "Max 20 — contact us on WhatsApp for larger jobs"),
  location: z.string().trim().min(2, "Please share your location/area").max(120),
  date: z.date({ required_error: "Pick a preferred date" }),
  time: z.enum(TIMES, { errorMap: () => ({ message: "Choose a preferred time" }) }),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  sleepAreaAddOn: z.boolean().optional(),
});

type FormState = {
  name: string; phone: string; pkg: string; item: string; size: string;
  quantity: number; location: string; date?: Date; time: string; notes: string; sleepAreaAddOn: boolean;
};

const TRUST = [
  { i: Droplets, t: "No soaking" },
  { i: ShieldCheck, t: "Safe dry process" },
  { i: Zap, t: "Quick response" },
  { i: ClipboardCheck, t: "Easy booking" },
];

export default function BookingSection() {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", pkg: "", item: "", size: "", quantity: 1, location: "", date: undefined, time: "", notes: "", sleepAreaAddOn: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please complete the required fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    const d = result.data;

    // Build starts_at / ends_at from the preferred date and time slot
    const [sh, eh] = timeSlotToHours(d.time);
    const startsAt = new Date(d.date);
    startsAt.setHours(sh, 0, 0, 0);
    const endsAt = new Date(d.date);
    endsAt.setHours(eh, 0, 0, 0);

    const composedDetails = [
      `Package: ${d.pkg}`,
      `Item: ${d.item}`,
      `Size: ${d.size}`,
      `Number of mattresses: ${d.quantity}`,
      `Preferred time: ${d.time}`,
      d.sleepAreaAddOn ? `Add-on: Sleep Area Dust Refresh (KES 300)` : null,
      d.notes ? `Special notes: ${d.notes}` : null,
    ].filter(Boolean).join("\n");

    // Save the booking request via secure RPC BEFORE handing over to WhatsApp
    const { data: rpcData, error } = await supabase.rpc("create_booking_request", {
      _name: d.name,
      _phone: d.phone,
      _whatsapp: d.phone,
      _email: null,
      _area: d.location,
      _property_type: null,
      _service: mapPackageToService(d.pkg, d.item),
      _details: composedDetails,
      _starts_at: startsAt.toISOString(),
      _ends_at: endsAt.toISOString(),
    });

    const row = Array.isArray(rpcData) ? rpcData[0] : rpcData;
    const reference: string | undefined = row?.booking_reference;

    if (error || !reference) {
      setSubmitting(false);
      toast.error("Could not save your request. Please try again or contact us on WhatsApp.");
      return;
    }

    const dateStr = format(d.date, "dd.MM.yyyy");
    const message =
      `Hello FreshDream Mattress Care, I would like to confirm my booking request.\n\n` +
      `FreshDream booking reference: ${reference}\n` +
      `Name: ${d.name}\n` +
      `WhatsApp / Phone: ${d.phone}\n` +
      `Service / Package: ${d.pkg}\n` +
      `Item: ${d.item}\n` +
      `Size: ${d.size}\n` +
      `Number of items: ${d.quantity}\n` +
      `Location / estate: ${d.location}\n` +
      `Preferred date: ${dateStr}\n` +
      `Preferred time: ${d.time}\n` +
      (d.sleepAreaAddOn ? `Add-on: Sleep Area Dust Refresh (KES 300)\n` : "") +
      (d.notes ? `Special notes: ${d.notes}\n` : "") +
      `\nPlease confirm availability, final price and payment details. Thank you.`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    toast.success(
      `Request saved. Your FreshDream booking reference is ${reference}. Opening WhatsApp — please send the message so we can confirm.`,
      { duration: 8000 }
    );
    setTimeout(() => setSubmitting(false), 800);
  };

  const quickWaMessage =
    "Hello FreshDream, I would like to request a booking.\n\nPackage:\nMattress size:\nNumber of mattresses:\nLocation pin:\nPreferred date:\nAdd Sleep Area Dust Refresh? Yes/No:\nPhotos:";

  return (
    <section id="book" className="section bg-surface">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center"><Send className="h-3.5 w-3.5" /> Booking</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl"><span className="text-gradient-brand">Request Your FreshDream Booking</span></h2>
          <p className="mt-3 text-muted-foreground">
            Send your mattress and upholstery details — we'll review and confirm before any payment.
          </p>
          <p className="mt-2 text-sm font-semibold text-primary">
            Request only. We review every booking, confirm availability manually and reply on WhatsApp with your FreshDream booking reference, final price, location fee and time slot. Payment instructions are shared only after confirmation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Quick WhatsApp inquiry — not the official booking path */}
          <div className="card-soft flex flex-col p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-whatsapp/10 text-whatsapp">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">Quick WhatsApp Inquiry</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              Just have a question, want to send photos or check pricing? Ask us on WhatsApp. This is a quick chat — it does not create an official booking. For a confirmed booking, please use the form on the right.
            </p>
            <div className="mt-5">
              <WhatsAppButton size="lg" label="Ask on WhatsApp" message={quickWaMessage} className="w-full sm:w-auto" />
            </div>
          </div>

          {/* Official booking request form */}
          <div className="card-soft p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">Official Booking Request Form</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use this form to send an official booking request. We save your request, generate your FreshDream booking reference, and then open WhatsApp so we can confirm availability and final price.
            </p>
            <p className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-border bg-surface p-3 text-xs text-foreground">
              <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-whatsapp" />
              <span>Share your location pin and photos on WhatsApp after submitting so we can confirm the exact location fee with your booking reference.</span>
            </p>

            <form onSubmit={onSubmit} className="mt-5 grid gap-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="bk-name">Full Name *</Label>
                  <Input id="bk-name" value={form.name} maxLength={80}
                    onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="bk-phone">Phone / WhatsApp number *</Label>
                  <Input id="bk-phone" inputMode="tel" placeholder="e.g. +254 7XX XXX XXX" value={form.phone} maxLength={25}
                    onChange={(e) => update("phone", e.target.value)} aria-invalid={!!errors.phone} />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Service Package *</Label>
                  <Select value={form.pkg} onValueChange={(v) => update("pkg", v)}>
                    <SelectTrigger aria-invalid={!!errors.pkg}><SelectValue placeholder="Choose a package" /></SelectTrigger>
                    <SelectContent>
                      {PACKAGES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.pkg && <p className="mt-1 text-xs text-destructive">{errors.pkg}</p>}
                </div>
                <div>
                  <Label>Item Type *</Label>
                  <Select value={form.item} onValueChange={(v) => update("item", v)}>
                    <SelectTrigger aria-invalid={!!errors.item}><SelectValue placeholder="Choose an item" /></SelectTrigger>
                    <SelectContent>
                      {ITEM_TYPES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.item && <p className="mt-1 text-xs text-destructive">{errors.item}</p>}
                  <p className="mt-1.5 text-xs text-muted-foreground">Sofa or rug? Available on request — send photos on WhatsApp.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Size *</Label>
                  <Select value={form.size} onValueChange={(v) => update("size", v)}>
                    <SelectTrigger aria-invalid={!!errors.size}><SelectValue placeholder="Choose a size" /></SelectTrigger>
                    <SelectContent>
                      {SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.size && <p className="mt-1 text-xs text-destructive">{errors.size}</p>}
                  {form.item === "Multiple mattresses" && (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Different sizes? Choose <strong>Mixed sizes</strong> and list each size in Notes.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="bk-qty">Number of mattresses *</Label>
                  <Input
                    id="bk-qty"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={20}
                    value={form.quantity}
                    onChange={(e) => update("quantity", Math.max(1, Math.min(20, parseInt(e.target.value || "1", 10))))}
                    aria-invalid={!!errors.quantity}
                  />
                  {errors.quantity && <p className="mt-1 text-xs text-destructive">{errors.quantity}</p>}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Location Fee is charged once per visit — multiple mattresses reduce cost per mattress.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="bk-loc">Location *</Label>
                  <Input id="bk-loc" placeholder="Area / estate in Nairobi" value={form.location} maxLength={120}
                    onChange={(e) => update("location", e.target.value)} aria-invalid={!!errors.location} />
                  {errors.location && <p className="mt-1 text-xs text-destructive">{errors.location}</p>}
                </div>
                <div className="flex flex-col">
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline"
                        className={cn("justify-start text-left font-normal", !form.date && "text-muted-foreground")}
                        aria-invalid={!!errors.date}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.date ? format(form.date, "dd.MM.yyyy") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={form.date}
                        onSelect={(d) => update("date", d)}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
                </div>
              </div>

              <div>
                <Label>Preferred Time *</Label>
                <Select value={form.time} onValueChange={(v) => update("time", v)}>
                  <SelectTrigger aria-invalid={!!errors.time}><SelectValue placeholder="Choose a time slot" /></SelectTrigger>
                  <SelectContent>
                    {TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
              </div>

              <label className="flex items-start gap-3 rounded-xl border-2 border-accent/40 bg-accent-soft/40 p-4 cursor-pointer transition-colors hover:bg-accent-soft/60">
                <Checkbox
                  id="bk-sleeparea"
                  checked={form.sleepAreaAddOn}
                  onCheckedChange={(v) => update("sleepAreaAddOn", v === true)}
                  className="mt-0.5"
                />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-primary">Add Sleep Area Dust Refresh — KES 300</span>
                  <span className="mt-1 block text-xs text-muted-foreground">Quick hygiene add-on around the sleeping area only. Not full room cleaning.</span>
                </span>
              </label>

              <div>
                <Label htmlFor="bk-notes">Special notes</Label>
                <Textarea id="bk-notes" rows={3} value={form.notes} maxLength={500}
                  placeholder="Anything we should know? (stains, access, timing…)"
                  onChange={(e) => update("notes", e.target.value)} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="sheen inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-whatsapp-foreground shadow-card transition-colors hover:bg-whatsapp-hover disabled:opacity-60 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                {submitting ? "Saving request…" : "Send Official Booking Request"}
              </button>
              <p className="-mt-2 text-xs text-muted-foreground">
                Your WhatsApp message includes your package, mattress size, location and preferred day/time — just press send. We reply with your FreshDream booking reference once reviewed.
              </p>

              <div className="rounded-xl border border-dashed border-border bg-surface p-4 text-xs text-muted-foreground">
                <strong className="text-primary">Photos help us review accurately.</strong> Send photos of the mattress or upholstery on WhatsApp after submitting your request.
              </div>

              <div className="rounded-xl bg-primary-soft p-4 text-xs text-primary">
                Request only: Your booking is confirmed once FreshDream replies on WhatsApp with your booking reference, final price, location fee and time slot. Final pricing or extra treatment may be confirmed after on-site inspection where necessary.
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
                <p className="font-semibold text-primary">Payment</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4">
                  <li>Payment instructions are shared only after your booking is confirmed.</li>
                  <li>Use only the official FreshDream payment details sent with your booking reference.</li>
                  <li>M-PESA and cash accepted. Payment is normally made after service, unless a deposit is requested for same-day, urgent or multi-unit bookings.</li>
                </ul>
                <p className="mt-2 font-medium text-destructive">Do not send any payment before your booking is confirmed by FreshDream via WhatsApp.</p>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Fast response. Dry process. Nairobi and surrounding areas.
        </p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {TRUST.map((t) => (
            <li key={t.t} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-accent">
                <t.i className="h-3.5 w-3.5" />
              </span>
              {t.t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
