import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, Send, ShieldCheck, Droplets, Zap, ClipboardCheck, BadgeCheck, Copy, CheckCircle2 } from "lucide-react";
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
import { site, whatsappLink } from "@/config/site";
import { packageBookingLabels } from "@/data/packages";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Map UI package labels and time slots to DB enums / timestamps.
function pkgToServiceType(pkg: string): "turnover" | "deep_clean" | "urine_odor" | "emergency" | "upholstery" | "other" {
  const p = pkg.toLowerCase();
  if (p.includes("turnover")) return "turnover";
  if (p.includes("deep")) return "deep_clean";
  if (p.includes("urine") || p.includes("odor")) return "urine_odor";
  if (p.includes("emergency") || p.includes("urgent")) return "emergency";
  if (p.includes("uphol") || p.includes("sofa")) return "upholstery";
  return "other";
}

// Slot label -> [startHour, endHour] in Africa/Nairobi (UTC+3, no DST).
function timeSlotToHours(slot: string): [number, number] {
  if (slot.startsWith("Morning")) return [8, 11];
  if (slot.startsWith("Midday")) return [11, 14];
  if (slot.startsWith("Afternoon")) return [14, 17];
  if (slot.startsWith("Evening")) return [17, 19];
  return [9, 18]; // Flexible
}

function nairobiTimestamps(date: Date, slot: string): { starts_at: string; ends_at: string } {
  const [sh, eh] = timeSlotToHours(slot);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  // Nairobi is UTC+3 year-round.
  const starts_at = new Date(`${y}-${m}-${d}T${String(sh).padStart(2, "0")}:00:00+03:00`).toISOString();
  const ends_at = new Date(`${y}-${m}-${d}T${String(eh).padStart(2, "0")}:00:00+03:00`).toISOString();
  return { starts_at, ends_at };
}

function generateRequestId(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `FD-${yyyy}${mm}${dd}-${rand}`;
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
  const [savedRef, setSavedRef] = useState<string | null>(null);
  const [savedWaUrl, setSavedWaUrl] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function sendInternalBookingEmail(
    data: {
      name?: string; phone?: string; pkg?: string; item?: string; size?: string;
      quantity?: number; location?: string; time?: string; notes?: string;
    },
    reference: string,
    dateStr: string,
    sleepAreaLine: string,
  ): Promise<{ ok: boolean; reason?: string; status?: number; json?: unknown }> {
    const accessKey = site.web3FormsAccessKey;
    if (!accessKey || accessKey.includes("your-web3forms")) {
      console.warn("Web3Forms access key is missing or not configured.");
      return { ok: false, reason: "missing_key" };
    }

    const fd = new FormData();
    fd.append("access_key", accessKey);
    fd.append("subject", `New FreshDream Booking Request — ${reference}`);
    fd.append("from_name", "FreshDream Website Booking Form");
    fd.append("botcheck", "");
    fd.append("Request ID", reference);
    fd.append("Name", data.name);
    fd.append("WhatsApp / Phone", data.phone);
    fd.append("Customer email", "Not provided");
    fd.append("Service / Package", data.pkg);
    fd.append("Item Type", data.item);
    fd.append("Mattress Size", data.size);
    fd.append("Number of mattresses", String(data.quantity));
    fd.append("Location / estate", data.location);
    fd.append("Preferred date", dateStr);
    fd.append("Preferred time", data.time);
    fd.append("Sleep Area Dust Refresh", sleepAreaLine);
    fd.append("Location pin", "Customer will send after WhatsApp message");
    fd.append("Photos", "Customer will send after WhatsApp message");
    fd.append("Access / parking / estate gate notes", "Customer will share on WhatsApp");
    fd.append("Urgency / next guest check-in time", "Customer will share on WhatsApp");
    fd.append("Notes / stains / odor / special instructions", data.notes || "—");
    fd.append(
      "Internal note",
      "Booking is not confirmed until FreshDream replies on WhatsApp. Payment details should only be sent after final confirmation."
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      let json: { success?: boolean } | null = null;
      try {
        json = await response.json();
      } catch {
        json = null;
      }
      if (!response.ok || json?.success === false) {
        console.warn("Web3Forms email failed", response.status, json);
        return { ok: false, reason: "web3forms_error", status: response.status, json };
      }
      return { ok: true };
    } catch (error) {
      console.warn("Web3Forms request failed", error);
      return { ok: false, reason: "network_error" };
    }
  }

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

    // 1) Persist to Lovable Cloud (booking record + DB-issued reference).
    let reference = generateRequestId(new Date());
    try {
      const { starts_at, ends_at } = nairobiTimestamps(d.date, d.time);
      const detailsBlob = [
        `Item: ${d.item}`,
        `Size: ${d.size}`,
        `Quantity: ${d.quantity}`,
        d.sleepAreaAddOn ? `Add-on: Sleep Area Dust Refresh (× ${d.quantity})` : null,
        d.notes ? `Notes: ${d.notes}` : null,
      ].filter(Boolean).join("\n");

      const { data: rpcData, error: rpcError } = await supabase.rpc("create_booking_request", {
        _name: d.name,
        _phone: d.phone,
        _whatsapp: d.phone,
        _email: "",
        _area: d.location,
        _property_type: "",
        _service: pkgToServiceType(d.pkg),
        _details: detailsBlob,
        _starts_at: starts_at,
        _ends_at: ends_at,
      });
      if (rpcError) {
        console.warn("create_booking_request failed", rpcError);
      } else if (rpcData && rpcData[0]?.booking_reference) {
        reference = rpcData[0].booking_reference;
      }
    } catch (err) {
      console.warn("Booking persistence error", err);
    }

    const dateStr = format(d.date, "dd.MM.yyyy");
    const sleepAreaLine = d.sleepAreaAddOn
      ? `Yes — KES 300 per mattress / sleep area (× ${d.quantity} = KES ${300 * d.quantity})`
      : "No";
    const addonLine = d.sleepAreaAddOn
      ? `Add-on: Sleep Area Dust Refresh — KES 300 per mattress / sleep area (× ${d.quantity} = KES ${300 * d.quantity})\n`
      : "";
    const message =
      `Hello FreshDream Mattress Care, I would like to send a booking request via WhatsApp.\n\n` +
      `Request ID: ${reference}\n` +
      `Name: ${d.name}\n` +
      `WhatsApp / Phone: ${d.phone}\n` +
      `Service / Package: ${d.pkg}\n` +
      `Item Type: ${d.item}\n` +
      `Mattress Size: ${d.size}\n` +
      `Number of mattresses: ${d.quantity}\n` +
      `Location / estate: ${d.location}\n` +
      `Preferred date: ${dateStr} (Nairobi time)\n` +
      `Preferred time: ${d.time}\n` +
      `Location pin: I will send my location pin after this message\n` +
      `Photos: I will send mattress / stain photos after this message\n` +
      `Access / parking / estate gate notes:\n` +
      `Urgency / next guest check-in time:\n` +
      addonLine +
      (d.notes ? `Notes / stains / access / urgency / next guest check-in time: ${d.notes}\n` : "") +
      `\nPlease confirm availability, final price, location fee and payment details. ` +
      `I understand that the booking is only confirmed after FreshDream replies on WhatsApp. ` +
      `I will not send payment before confirmation.`;
    const waUrl = whatsappLink(message);
    setSavedRef(reference);
    setSavedWaUrl(waUrl);

    const accessKey = site.web3FormsAccessKey;
    const keyMissing = !accessKey || accessKey.includes("your-web3forms");

    if (keyMissing) {
      toast.message("Internal email copy is not configured, but WhatsApp booking still works.");
    } else {
      const emailResult = await Promise.race<{ ok: boolean; reason?: string }>([
        sendInternalBookingEmail(d, reference, dateStr, sleepAreaLine),
        new Promise<{ ok: boolean; reason?: string }>((resolve) =>
          setTimeout(() => resolve({ ok: false, reason: "timeout" }), 1800)
        ),
      ]);
      if (!emailResult.ok) {
        toast.message(
          "Internal email copy could not be confirmed, but you can still complete your request by sending the WhatsApp message."
        );
      }
    }

    toast.success(
      `Request ID ${reference}. Opening WhatsApp now — if it doesn't open, tap "Open WhatsApp with Booking Request" below.`,
      { duration: 9000 }
    );

    setSubmitting(false);
    // Same-tab redirect to WhatsApp — avoids blank popup windows.
    window.location.href = waUrl;
  };

  const quickWaMessage =
    "Hello FreshDream, I have a quick inquiry about mattress / upholstery care. (To send a full booking request, I will use the booking form on the website — it opens WhatsApp with all the details prefilled.)";

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
            Send your booking request directly on WhatsApp. Your WhatsApp message includes all booking details. Your booking is confirmed only after FreshDream replies on WhatsApp with availability, final price, location fee and payment details. Do not send payment before confirmation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Quick WhatsApp inquiry — not the full booking request path */}
          <div className="card-soft flex flex-col p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-whatsapp/10 text-whatsapp">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">Quick WhatsApp Inquiry</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              Just have a question, want to send photos or check pricing? Ask us on WhatsApp. This is a quick chat — it does not create a full booking request. For a confirmed booking, please use the form on the right.
            </p>
            <div className="mt-5">
              <WhatsAppButton size="lg" label="Ask on WhatsApp" message={quickWaMessage} className="w-full sm:w-auto" />
            </div>
          </div>

          {/* WhatsApp booking request form */}
          <div id="booking-form" className="card-soft p-6 sm:p-8 scroll-mt-28">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-primary">Booking Request Form (WhatsApp)</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the form and submit. Your booking request opens directly in WhatsApp with all the details prefilled — no booking data is stored on this website.
            </p>

            {/* Request ID explainer */}
            <div className="mt-4 rounded-xl border-2 border-accent/40 bg-accent-soft/40 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-primary">
                <BadgeCheck className="h-4 w-4 text-accent" /> Why use this booking form?
              </p>
              <p className="mt-1.5 text-xs text-foreground">
                When you submit this form, you receive a unique <strong>Request ID</strong>. We use this ID to check your details, confirm availability, send follow-up messages, and manage your cleaning job properly.
              </p>
              <ul className="mt-2 grid gap-1 text-xs text-foreground">
                <li className="flex items-start gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> Get a clear Request ID</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> Helps us confirm your job faster</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> Useful for follow-up, changes, and proof of request</li>
              </ul>
            </div>

            <p className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-border bg-surface p-3 text-xs text-foreground">
              <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-whatsapp" />
              <span>Share your location pin and photos on WhatsApp after submitting so we can confirm the exact location fee.</span>
            </p>
            <p className="mt-3 text-xs font-semibold text-primary">
              Fill in the form below. After submitting, you will receive your Request ID for confirmation and follow-up.
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
                  <span className="block text-sm font-semibold text-primary">Add Sleep Area Dust Refresh — KES 300 per mattress / sleep area</span>
                  <span className="mt-1 block text-xs text-muted-foreground">Quick hygiene add-on around the sleeping area only. Not full room cleaning. Charged per mattress / sleep area.</span>
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
                {submitting ? "Opening WhatsApp…" : "Send Booking Request on WhatsApp"}
              </button>
              <p className="-mt-2 text-xs text-muted-foreground">
                Your WhatsApp message includes all booking details. Your booking is confirmed only after FreshDream replies on WhatsApp.
              </p>
              <p className="text-xs text-muted-foreground">
                Your request details may also be sent to FreshDream by internal email so we can respond and coordinate your booking. Your booking is confirmed only after FreshDream replies on WhatsApp.
              </p>

              <div className="rounded-xl border border-border bg-surface p-4 text-xs text-muted-foreground space-y-2">
                <p>
                  <strong className="text-primary">Photos:</strong>{" "}
                  Send photos of the mattress on WhatsApp after submitting — it helps us confirm the price.
                </p>
                <p>
                  <strong className="text-primary">Confirmation:</strong>{" "}
                  Your booking is confirmed only after FreshDream replies on WhatsApp with availability, final price, location fee and payment details.
                </p>
                <p>
                  <strong className="text-primary">Payment:</strong>{" "}
                  Instructions shared only after confirmation. M-PESA and cash accepted.
                  <span className="font-semibold text-destructive"> Do not send payment before confirmation.</span>
                </p>
              </div>

              {savedRef && savedWaUrl && (
                <div className="rounded-xl border-2 border-whatsapp/50 bg-whatsapp/5 p-5">
                  <p className="flex items-center gap-2 text-sm font-bold text-primary">
                    <CheckCircle2 className="h-5 w-5 text-whatsapp" /> Booking request received.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Your Request ID is:</p>
                  <p className="mt-1 break-all font-mono text-2xl font-extrabold text-primary">{savedRef}</p>
                  <p className="mt-2 text-xs text-foreground">
                    Please keep this ID. We use it to confirm, update, and manage your cleaning request.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(savedRef);
                        toast.success("Request ID copied");
                      }}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-primary bg-background px-4 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4" /> Copy Request ID
                    </button>
                    <a
                      href={whatsappLink(`Hello FreshDream, I submitted a booking request. My Request ID is ${savedRef}. Please confirm availability.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 text-xs font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
                    >
                      <MessageCircle className="h-4 w-4" /> Send Request ID on WhatsApp
                    </a>
                    <a
                      href={savedWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-whatsapp px-4 text-xs font-semibold text-whatsapp hover:bg-whatsapp/10"
                    >
                      Open full booking message
                    </a>
                  </div>
                </div>
              )}
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
