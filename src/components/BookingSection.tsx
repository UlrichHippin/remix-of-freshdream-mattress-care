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
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappLink } from "@/config/site";
import { packageBookingLabels } from "@/data/packages";
import { toast } from "sonner";

const PACKAGES = packageBookingLabels as readonly string[];

const ITEM_TYPES = ["Mattress", "Sofa", "Small rug refresh / spot support"] as const;
const SIZES = [
  "Single (3x6 ft)",
  "Double (4x6 ft)",
  "Queen (5x6 ft)",
  "King (6x6 ft)",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(25),
  pkg: z.string().refine((v) => PACKAGES.includes(v), { message: "Choose a package" }),
  item: z.enum(ITEM_TYPES, { errorMap: () => ({ message: "Choose an item type" }) }),
  size: z.enum(SIZES, { errorMap: () => ({ message: "Choose a size" }) }),
  location: z.string().trim().min(2, "Please share your location/area").max(120),
  date: z.date({ required_error: "Pick a preferred date" }),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormState = {
  name: string; phone: string; pkg: string; item: string; size: string;
  location: string; date?: Date; notes: string;
};

const TRUST = [
  { i: Droplets, t: "No soaking" },
  { i: ShieldCheck, t: "Safe dry process" },
  { i: Zap, t: "Quick response" },
  { i: ClipboardCheck, t: "Easy booking" },
];

export default function BookingSection() {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", pkg: "", item: "", size: "", location: "", date: undefined, notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
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
    const message =
      `Hello, I would like to book a cleaning service.\n\n` +
      `Name: ${d.name}\n` +
      `Phone: ${d.phone}\n` +
      `Package: ${d.pkg}\n` +
      `Item: ${d.item}\n` +
      `Size: ${d.size}\n` +
      `Location: ${d.location}\n` +
      `Preferred date: ${format(d.date, "PPP")}\n` +
      (d.notes ? `Notes: ${d.notes}\n` : "");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to send your booking request…");
    setTimeout(() => setSubmitting(false), 800);
  };

  const quickWaMessage =
    "Hello, I would like to book a cleaning service.\n\nPackage:\nItem:\nSize:\nLocation:\nPreferred date:";

  return (
    <section id="book" className="section bg-surface">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center"><Send className="h-3.5 w-3.5" /> Booking</p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Book Your Cleaning</h2>
          <p className="mt-3 text-muted-foreground">
            Choose your package and send us your request in just a few steps.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* WhatsApp option */}
          <div className="card-soft flex flex-col p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-whatsapp/10 text-whatsapp">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">Book on WhatsApp</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              Send us your package, location, and preferred date on WhatsApp for a quick response.
            </p>
            <div className="mt-5">
              <WhatsAppButton size="lg" label="Book on WhatsApp" message={quickWaMessage} className="w-full sm:w-auto" />
            </div>
          </div>

          {/* Form option */}
          <div className="card-soft p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">Request a Booking</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the booking form to send your cleaning request for mattresses, sofas, or small rug refresh / spot support.
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
                  <Label htmlFor="bk-phone">Phone Number *</Label>
                  <Input id="bk-phone" inputMode="tel" value={form.phone} maxLength={25}
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
                    <SelectTrigger aria-invalid={!!errors.item}><SelectValue placeholder="Mattress / Sofa / Small rug refresh" /></SelectTrigger>
                    <SelectContent>
                      {ITEM_TYPES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.item && <p className="mt-1 text-xs text-destructive">{errors.item}</p>}
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
                        {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
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
                <Label htmlFor="bk-notes">Notes</Label>
                <Textarea id="bk-notes" rows={3} value={form.notes} maxLength={500}
                  placeholder="Anything we should know? (stains, access, timing…)"
                  onChange={(e) => update("notes", e.target.value)} />
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Sending…" : "Request a Booking"}
              </Button>

              <div className="rounded-xl border border-dashed border-border bg-surface p-4 text-xs text-muted-foreground">
                <strong className="text-primary">Photos help us quote accurately.</strong> You can send photos directly on WhatsApp after submitting your request.
              </div>

              <div className="rounded-xl bg-primary-soft p-4 text-xs text-primary">
                Your booking is a <strong>request until confirmed via WhatsApp</strong>. We will reply with your slot, price and payment details.
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
                <p className="font-semibold text-primary">Payment</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4">
                  <li>M-PESA and cash accepted.</li>
                  <li>Payment is made after service unless a deposit is requested for same-day, urgent or multi-unit bookings.</li>
                </ul>
                <p className="mt-2 font-medium text-destructive">Do not send payment until your booking and price are confirmed by FreshDream via WhatsApp.</p>
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
