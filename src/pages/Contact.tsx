import { useState } from "react";
import { z } from "zod";
import PageLayout from "@/components/PageLayout";
import BookingCalendar from "@/components/BookingCalendar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import EquipmentBadge from "@/components/EquipmentBadge";
import { site, whatsappLink } from "@/config/site";
import {
  Mail, MapPin, Copy, Check, MessageCircle, Camera, Clock4,
  ShieldCheck, MessageSquareText, CalendarClock, Loader2, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const SERVICE_OPTIONS = [
  { value: "mattress", label: "Mattress cleaning" },
  { value: "upholstery", label: "Upholstery / sofa cleaning" },
  { value: "host_package", label: "Host package / multi-unit quote" },
  { value: "emergency", label: "Emergency / urgent call-out" },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid WhatsApp / phone number").max(30),
  area: z.string().trim().min(2, "Please enter your area in Nairobi").max(80),
  service: z.string().min(1, "Pick a service type"),
  item: z.string().trim().max(80).optional().or(z.literal("")),
  preferred: z.string().trim().max(80).optional().or(z.literal("")),
  photos: z.string().trim().max(300).optional().or(z.literal("")),
  note: z.string().trim().max(600).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm to continue" }) }),
});

type FormValues = z.input<typeof schema>;
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = {
  name: "", phone: "", area: "", service: "", item: "", preferred: "", photos: "", note: "",
  consent: false as unknown as true,
};

function buildMessage(v: z.output<typeof schema>) {
  const serviceLabel =
    SERVICE_OPTIONS.find((s) => s.value === v.service)?.label ?? v.service;
  return [
    `Hello, I'd like a quote from FreshDream.`,
    `Name: ${v.name}`,
    `WhatsApp/Phone: ${v.phone}`,
    `Location: ${v.area}`,
    `Service type: ${serviceLabel}`,
    v.item ? `Mattress size / item: ${v.item}` : `Mattress size / item:`,
    v.preferred ? `Preferred date/time: ${v.preferred}` : `Preferred date/time:`,
    v.photos ? `Photos: ${v.photos}` : `Photos attached: yes/no`,
    v.note ? `Note: ${v.note}` : null,
  ].filter(Boolean).join("\n");
}

const COPY_TEMPLATE = `Hello, I'd like a quote for mattress cleaning.
Name:
Location:
Service type:
Mattress size / item:
Preferred date/time:
Photos attached: yes/no`;

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(COPY_TEMPLATE);
      setCopied(true);
      toast.success("Template copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy — please copy manually");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);
    try {
      const message = buildMessage(parsed.data);
      // Open WhatsApp in a new tab with the prefilled message
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      setSubmitted(true);
      toast.success("Request prepared — sending you to WhatsApp");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const trustNotes = [
    { i: MapPin, t: "Based in Roysambu" },
    { i: CheckCircle2, t: "M-PESA accepted" },
    { i: Camera, t: "Before / after photos" },
    { i: ShieldCheck, t: "Honest assessments" },
    { i: Clock4, t: "Same-day where possible" },
  ];

  return (
    <PageLayout
      title="Request a Quote — FreshDream Mattress Care"
      description="Send a short request or message us on WhatsApp. We reply with a realistic quote and the next available slot. Mattress and upholstery cleaning in Nairobi."
    >
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><MessageCircle className="h-3.5 w-3.5" /> Contact & booking</p>
            <h1 className="mt-4 text-4xl font-bold text-primary sm:text-5xl">
              Request a quote or book on WhatsApp.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Send your details, photos and preferred time. We'll reply with a realistic quote and
              the next available slot.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton size="lg" label="Message on WhatsApp" />
              <a
                href="#booking-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-6 text-sm font-semibold text-primary hover:bg-primary-soft"
              >
                Submit the form
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
              {trustNotes.map((n) => (
                <li key={n.t} className="inline-flex items-center gap-1.5">
                  <n.i className="h-3.5 w-3.5 text-accent" /> {n.t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <EquipmentBadge variant="inline" />
            </div>
          </div>
        </div>
      </section>

      {/* Form + WhatsApp panel */}
      <section id="booking-form" className="section">
        <div className="container-tight grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Short booking form */}
          <div className="card-soft p-6 sm:p-8">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-primary">We received your request</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                  A WhatsApp window has opened with your details. If it didn't, tap the button below.
                </p>
                <ol className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm text-foreground">
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" /> We review the details.</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" /> We reply on WhatsApp or by phone with a quote and slot.</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" /> Same-day support where possible.</li>
                </ol>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <WhatsAppButton label="Open WhatsApp" />
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setValues(EMPTY); }}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-primary hover:bg-surface"
                  >
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="eyebrow"><MessageSquareText className="h-3.5 w-3.5" /> Short form</p>
                <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">Tell us the basics.</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Just the essentials — we'll handle the rest on WhatsApp.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required error={errors.name} className="sm:col-span-1">
                    <Input
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Wanjiku"
                      autoComplete="name"
                      maxLength={80}
                    />
                  </Field>

                  <Field label="WhatsApp / phone" required error={errors.phone}>
                    <Input
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+254 7xx xxx xxx"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={30}
                    />
                  </Field>

                  <Field label="Location / area in Nairobi" required error={errors.area}>
                    <Input
                      value={values.area}
                      onChange={(e) => set("area", e.target.value)}
                      placeholder="Roysambu, Kasarani, Westlands…"
                      maxLength={80}
                    />
                  </Field>

                  <Field label="Service type" required error={errors.service}>
                    <Select value={values.service} onValueChange={(v) => set("service", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Mattress size or item type" error={errors.item}>
                    <Input
                      value={values.item}
                      onChange={(e) => set("item", e.target.value)}
                      placeholder="Queen mattress, 3-seat sofa…"
                      maxLength={80}
                    />
                  </Field>

                  <Field label="Preferred date / time" error={errors.preferred}>
                    <Input
                      value={values.preferred}
                      onChange={(e) => set("preferred", e.target.value)}
                      placeholder="Sat morning, before 4pm…"
                      maxLength={80}
                    />
                  </Field>

                  <Field label="Photo link (optional)" error={errors.photos} className="sm:col-span-2">
                    <Input
                      value={values.photos}
                      onChange={(e) => set("photos", e.target.value)}
                      placeholder="Paste a Google Drive / image link, or attach on WhatsApp"
                      inputMode="url"
                      maxLength={300}
                    />
                  </Field>

                  <Field label="Short note / urgency" error={errors.note} className="sm:col-span-2">
                    <Textarea
                      value={values.note}
                      onChange={(e) => set("note", e.target.value)}
                      placeholder="E.g. urgent — guest checks in tomorrow at 3pm."
                      rows={3}
                      maxLength={600}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={!!values.consent}
                        onChange={(e) => set("consent", e.target.checked as unknown as true)}
                        className="mt-0.5 h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
                      />
                      <span>
                        I agree that FreshDream may contact me on WhatsApp or by phone about my request.
                        Your details are only used to reply to you.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs font-medium text-destructive">{errors.consent}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground shadow-soft transition-all hover:bg-whatsapp-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                      {submitting ? "Sending…" : "Send via WhatsApp"}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      Required: name, phone, location, service type.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* WhatsApp quick-send panel */}
          <aside className="space-y-6">
            <div className="card-soft relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/60" aria-hidden="true" />
              <p className="relative inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                <MessageSquareText className="h-3 w-3" /> Quick template
              </p>
              <h3 className="relative mt-3 text-lg font-bold text-primary">Prefer to type it yourself?</h3>
              <p className="relative mt-1 text-sm text-muted-foreground">
                Copy this template and send it to us on WhatsApp.
              </p>
              <pre className="relative mt-4 whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-xs text-foreground">{COPY_TEMPLATE}</pre>
              <div className="relative mt-4 flex flex-wrap gap-2">
                <WhatsAppButton size="sm" label="Open WhatsApp" />
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-primary hover:bg-surface"
                >
                  {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy template"}
                </button>
              </div>
            </div>

            <div className="card-soft p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Direct contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-4 w-4 text-accent" /> Based in {site.base}
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <MessageCircle className="h-4 w-4 text-accent" /> {site.phoneDisplay}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Time-slot booking temporarily hidden — WhatsApp booking only for now */}
    </PageLayout>
  );
}

function Field({
  label, required, error, children, className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-sm font-semibold text-primary">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
