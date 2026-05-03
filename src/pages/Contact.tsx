import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import BookingCalendar from "@/components/BookingCalendar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site, defaultWhatsAppMessage } from "@/config/site";
import { Mail, MapPin, Copy, Check, MessageCircle, Camera, Clock4, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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
      <section className="border-b border-border bg-gradient-hero">
        <div className="container-tight py-16 sm:py-20">
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
      </section>

      <section className="section">
        <div className="container-tight grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">What to send on WhatsApp</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Location (estate / building)",
                "Mattress size or furniture type",
                "Photos of the stain or issue",
                "Your next guest check-in time",
                "Urgency or special notes",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" />{b}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-base font-semibold text-primary">What happens next</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { i: MessageCircle, t: "Estimated price" },
                { i: Clock4, t: "Available time slot" },
                { i: Camera, t: "Drying guidance" },
                { i: ShieldCheck, t: "Same-day or next-day where possible" },
              ].map((it) => (
                <div key={it.t} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium text-primary">
                  <it.i className="h-4 w-4 text-accent" /> {it.t}
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick booking template</p>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-surface p-4 text-sm text-foreground">{template}</pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <WhatsAppButton />
              <button onClick={onCopy} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-primary hover:bg-surface">
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy template"}
              </button>
            </div>

            <div className="mt-6 grid gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Based in {site.base}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="eyebrow">Booking calendar</p>
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
