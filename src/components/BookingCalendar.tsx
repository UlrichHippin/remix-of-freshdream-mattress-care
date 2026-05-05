import { useEffect, useMemo, useState } from "react";
import { format, addDays, startOfDay, isSameDay, isBefore } from "date-fns";
import { CalendarIcon, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { whatsappLink } from "@/config/site";

type AvRule = { weekday: number; start_minute: number; end_minute: number };
type Block = { starts_at: string; ends_at: string };
type Settings = { slot_minutes: number; buffer_minutes: number; min_lead_hours: number; max_advance_days: number; daily_max_jobs: number };

const ServiceEnum = z.enum(["turnover", "deep_clean", "urine_odor", "emergency", "upholstery", "other"]);

const MATTRESS_SIZES = ["Single (3x6)", "Double (4x6)", "Queen (5x6)", "King (6x6)", "Other / not sure"] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(160).optional().or(z.literal("")),
  area: z.string().trim().min(2, "Please enter the area").max(80),
  property_type: z.string().trim().max(60).optional().or(z.literal("")),
  service: ServiceEnum,
  mattress_size: z.enum(MATTRESS_SIZES, { errorMap: () => ({ message: "Choose a mattress size" }) }),
  mattress_count: z.coerce.number().int().min(1, "At least 1").max(50),
  issue: z.string().trim().max(300).optional().or(z.literal("")),
  details: z.string().trim().max(800).optional().or(z.literal("")),
});
type FormValues = z.infer<typeof formSchema>;

function minutesToLabel(m: number) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${mm.toString().padStart(2, "0")} ${period}`;
}

interface Slot {
  startMin: number;
  endMin: number;
  startsAt: Date;
  endsAt: Date;
  available: boolean;
}

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<Slot | null>(null);
  const [rules, setRules] = useState<AvRule[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [busy, setBusy] = useState<Block[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | { date: Date; slot: Slot; values: FormValues }>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", whatsapp: "", email: "", area: "", property_type: "", service: "turnover", mattress_size: "Queen (5x6)", mattress_count: 1, issue: "", details: "" },
  });

  useEffect(() => {
    (async () => {
      const from = new Date();
      const to = addDays(from, 60);
      const [r1, r2, r3, r4] = await Promise.all([
        supabase.from("availability_rules").select("weekday,start_minute,end_minute"),
        supabase.from("blocked_periods").select("starts_at,ends_at").gte("ends_at", from.toISOString()).lte("starts_at", to.toISOString()),
        supabase.from("booking_settings").select("*").single(),
        supabase.rpc("get_busy_slots", { _from: from.toISOString(), _to: to.toISOString() }),
      ]);
      if (r1.data) setRules(r1.data as AvRule[]);
      if (r2.data) setBlocks(r2.data as Block[]);
      if (r3.data) setSettings(r3.data as Settings);
      if (r4.data) setBusy(r4.data as Block[]);
      setLoading(false);
    })();
  }, []);

  const slots: Slot[] = useMemo(() => {
    if (!date || !settings) return [];
    const day = startOfDay(date);
    const wd = day.getDay();
    const dayRules = rules.filter((r) => r.weekday === wd);
    if (dayRules.length === 0) return [];

    const now = new Date();
    const minStart = new Date(now.getTime() + settings.min_lead_hours * 3600_000);
    const result: Slot[] = [];

    for (const rule of dayRules) {
      for (let m = rule.start_minute; m + settings.slot_minutes <= rule.end_minute; m += settings.slot_minutes) {
        const startsAt = new Date(day);
        startsAt.setMinutes(m);
        const endsAt = new Date(day);
        endsAt.setMinutes(m + settings.slot_minutes);

        let available = true;
        if (isBefore(startsAt, minStart)) available = false;

        const bufMs = settings.buffer_minutes * 60_000;
        for (const b of [...busy, ...blocks]) {
          const bStart = new Date(b.starts_at).getTime() - bufMs;
          const bEnd = new Date(b.ends_at).getTime() + bufMs;
          if (startsAt.getTime() < bEnd && endsAt.getTime() > bStart) {
            available = false;
            break;
          }
        }

        result.push({ startMin: m, endMin: m + settings.slot_minutes, startsAt, endsAt, available });
      }
    }
    return result;
  }, [date, rules, blocks, busy, settings]);

  const dayHasAvailability = (d: Date) => {
    if (!settings) return false;
    const wd = d.getDay();
    return rules.some((r) => r.weekday === wd);
  };

  async function onSubmit(values: FormValues) {
    if (!slot) {
      toast.error("Please choose a time slot");
      return;
    }
    setSubmitting(true);
    const composedDetails = [
      `Mattress size: ${values.mattress_size}`,
      `Number of mattresses: ${values.mattress_count}`,
      values.issue ? `Stain/odor issue: ${values.issue}` : null,
      values.details ? `Notes: ${values.details}` : null,
    ].filter(Boolean).join("\n");
    const { error } = await supabase.from("bookings").insert({
      name: values.name,
      phone: values.phone,
      whatsapp: values.whatsapp || values.phone,
      email: values.email || null,
      area: values.area,
      property_type: values.property_type || null,
      service: values.service,
      details: composedDetails,
      starts_at: slot.startsAt.toISOString(),
      ends_at: slot.endsAt.toISOString(),
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit your request. Please try WhatsApp.");
      return;
    }
    setSuccess({ date: date!, slot, values });
    setBusy((prev) => [...prev, { starts_at: slot.startsAt.toISOString(), ends_at: slot.endsAt.toISOString() }]);
    setSlot(null);
    form.reset();
  }

  if (loading) {
    return (
      <div className="grid place-items-center rounded-2xl border border-border bg-card p-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (success) {
    const msg =
      `Hello, I just submitted a booking request on your website.\n` +
      `Name: ${success.values.name}\nArea: ${success.values.area}\n` +
      `Service: ${success.values.service}\n` +
      `Requested slot: ${format(success.slot.startsAt, "EEE d MMM, h:mm a")} – ${format(success.slot.endsAt, "h:mm a")}`;
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent-soft p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-primary">Request received</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          We will confirm your slot, price and payment details via WhatsApp.
          Your booking is a <strong>request until confirmed via WhatsApp</strong>. Photos help us quote accurately —
          you can send them on WhatsApp after submitting your request.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground hover:bg-whatsapp-hover"
          >
            Continue on WhatsApp
          </a>
          <button
            onClick={() => setSuccess(null)}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pick a date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("mt-2 w-full justify-start gap-2 rounded-xl text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "EEEE, d MMMM yyyy") : "Choose a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { setDate(d); setSlot(null); }}
                disabled={(d) => {
                  if (isBefore(d, startOfDay(new Date()))) return true;
                  if (settings && isBefore(addDays(new Date(), settings.max_advance_days), d)) return true;
                  return !dayHasAvailability(d);
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Available time windows</Label>
          {!date ? (
            <p className="mt-3 text-sm text-muted-foreground">Choose a date to see available windows.</p>
          ) : slots.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No availability on this day. Please pick another date or WhatsApp us.</p>
          ) : (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {slots.map((s, i) => {
                const selected = slot?.startMin === s.startMin && isSameDay(slot?.startsAt, s.startsAt);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!s.available}
                    onClick={() => setSlot(s)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                      s.available
                        ? "border-border bg-background text-foreground hover:border-accent hover:bg-accent-soft"
                        : "cursor-not-allowed border-border bg-muted text-muted-foreground/60 line-through",
                      selected && "border-accent bg-accent text-accent-foreground hover:bg-accent",
                    )}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {minutesToLabel(s.startMin)}
                  </button>
                );
              })}
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-accent align-middle" /> available
            <span className="mx-3 inline-block h-2 w-2 rounded-full bg-muted-foreground/40 align-middle" /> unavailable
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 border-t border-border pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="bk-name">Full name</Label>
            <Input id="bk-name" {...form.register("name")} className="mt-1.5" maxLength={100} />
            {form.formState.errors.name && <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="bk-phone">Phone</Label>
            <Input id="bk-phone" {...form.register("phone")} className="mt-1.5" placeholder="07xx xxx xxx" maxLength={30} />
            {form.formState.errors.phone && <p className="mt-1 text-xs text-destructive">{form.formState.errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="bk-area">Area / suburb</Label>
            <Input id="bk-area" {...form.register("area")} className="mt-1.5" placeholder="e.g. Kasarani" maxLength={80} />
            {form.formState.errors.area && <p className="mt-1 text-xs text-destructive">{form.formState.errors.area.message}</p>}
          </div>
          <div>
            <Label htmlFor="bk-property">Property type (optional)</Label>
            <Input id="bk-property" {...form.register("property_type")} className="mt-1.5" placeholder="Airbnb, serviced apartment…" maxLength={60} />
          </div>
          <div>
            <Label>Service</Label>
            <Select value={form.watch("service")} onValueChange={(v) => form.setValue("service", v as FormValues["service"])}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="turnover">Freshen Up</SelectItem>
                <SelectItem value="deep_clean">Standard Cleaning</SelectItem>
                <SelectItem value="urine_odor">Urine & Odor Reduction Treatment</SelectItem>
                <SelectItem value="emergency">Emergency Host Support</SelectItem>
                <SelectItem value="upholstery">Upholstery & Sofa Refresh</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="bk-email">Email (optional)</Label>
            <Input id="bk-email" type="email" {...form.register("email")} className="mt-1.5" maxLength={160} />
          </div>
          <div>
            <Label>Mattress size</Label>
            <Select value={form.watch("mattress_size")} onValueChange={(v) => form.setValue("mattress_size", v as typeof MATTRESS_SIZES[number])}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {MATTRESS_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            {form.formState.errors.mattress_size && <p className="mt-1 text-xs text-destructive">{form.formState.errors.mattress_size.message}</p>}
          </div>
          <div>
            <Label htmlFor="bk-count">Number of mattresses</Label>
            <Input id="bk-count" type="number" min={1} max={50} {...form.register("mattress_count")} className="mt-1.5" />
            {form.formState.errors.mattress_count && <p className="mt-1 text-xs text-destructive">{form.formState.errors.mattress_count.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="bk-issue">Stain or odor issue (optional)</Label>
          <Input id="bk-issue" {...form.register("issue")} className="mt-1.5" placeholder="e.g. urine spot, coffee stain, musty smell" maxLength={300} />
        </div>
        <div>
          <Label htmlFor="bk-details">Optional notes</Label>
          <Textarea id="bk-details" {...form.register("details")} className="mt-1.5" rows={3} maxLength={800} placeholder="Access, parking, timing…" />
        </div>

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
            <li>Deposit may be requested for emergency or larger host bookings.</li>
          </ul>
          <p className="mt-2 font-medium text-destructive">Do not send payment until your booking and price are confirmed by FreshDream via WhatsApp.</p>
        </div>

        <Button type="submit" disabled={submitting || !slot} size="lg" className="w-full rounded-full sm:w-auto">
          {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Request this slot
        </Button>
      </form>
    </div>
  );
}
