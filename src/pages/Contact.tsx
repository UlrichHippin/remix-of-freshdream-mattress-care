import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import BookingCalendar from "@/components/BookingCalendar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import { site, defaultWhatsAppMessage } from "@/config/site";
import {
  Mail, MapPin, Copy, Check, MessageCircle, Camera, Clock4,
  ShieldCheck, MessageSquareText, ImageDown, CalendarClock,
} from "lucide-react";
import { toast } from "sonner";
import illustWhatsAppQuote from "@/assets/illust-whatsapp-quote.png";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const template = defaultWhatsAppMessage;
  const onCopy = async () => {
    await navigator.clipboard.writeText(template);
    setCopied(true);
    toast.success("Template copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PageLayout
      title="Book Now — FreshDream Mattress Care"
      description="Book mattress and upholstery cleaning in Nairobi via WhatsApp or request a structured time slot. Based in Roysambu, serving Airbnb hosts across the city."
    >
      {/* Hero with illustration */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Book now</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Fastest way to book: WhatsApp.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Send your details and photos — you'll get an estimated price, an available time slot, and
              drying guidance. Same-day or next-day where possible.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" />
              <a href={`mailto:${site.email}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary px-6 text-sm font-semibold text-primary hover:bg-primary-soft">
                <Mail className="h-4 w-4" /> Email instead
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <IllustrationFrame src={illustWhatsAppQuote} alt="WhatsApp quote illustration" tone="accent" badge="Direct WhatsApp" />
          </div>
        </div>
      </section>

      {/* Booking steps — illustrated */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><CalendarClock className="h-3.5 w-3.5" /> 4-step booking</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">From message to guest-ready.</h2>
          </div>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent md:block" aria-hidden="true" />
            <ol className="relative grid gap-6 md:grid-cols-4">
              {[
                { i: MessageSquareText, t: "Send details", d: "Location, mattress size, photos, check-in time." },
                { i: MessageCircle, t: "Quote & slot", d: "Realistic price and available window confirmed." },
                { i: Camera, t: "On-site service", d: "Inspection and treatment with controlled moisture." },
                { i: ImageDown, t: "Photo proof", d: "Before/after photos and drying guidance." },
              ].map((s, i) => (
                <li key={s.t} className="relative flex flex-col items-center text-center">
                  <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lift ring-4 ring-background">
                    <s.i className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground ring-2 ring-background">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-primary">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section bg-surface">
        <div className="container-tight grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What to send</p>
            <h2 className="mt-3 text-2xl font-bold text-primary">Five things to include on WhatsApp</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                { i: MapPin, t: "Location (estate / building)" },
                { i: Camera, t: "Photos of the stain or issue" },
                { i: Clock4, t: "Your next guest check-in time" },
                { i: ShieldCheck, t: "Mattress size or furniture type" },
                { i: MessageSquareText, t: "Urgency or special notes" },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-soft">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <b.i className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{b.t}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-base font-semibold text-primary">What happens next</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { i: MessageCircle, t: "Estimated price" },
                { i: Clock4, t: "Available time slot" },
                { i: Camera, t: "Drying guidance" },
                { i: ShieldCheck, t: "Same-day / next-day" },
              ].map((it) => (
                <div key={it.t} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium text-primary shadow-soft">
                  <it.i className="h-4 w-4 text-accent" /> {it.t}
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft relative overflow-hidden p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/60" aria-hidden="true" />
            <p className="relative inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              <MessageSquareText className="h-3 w-3" /> Quick template
            </p>
            <p className="relative mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Copy & send on WhatsApp</p>
            <pre className="relative mt-3 whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-sm text-foreground">{template}</pre>
            <div className="relative mt-4 flex flex-wrap gap-3">
              <WhatsAppButton />
              <button onClick={onCopy} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-primary hover:bg-surface">
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy template"}
              </button>
            </div>

            <div className="relative mt-6 grid gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Based in {site.base}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow"><CalendarClock className="h-3.5 w-3.5" /> Booking calendar</p>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Or pick a time slot.</h2>
            <p className="mt-3 text-muted-foreground">
              Choose a date and an available window. Your selection is treated as a requested
              appointment until we confirm via WhatsApp.
            </p>
          </div>
          <div className="mt-8">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
