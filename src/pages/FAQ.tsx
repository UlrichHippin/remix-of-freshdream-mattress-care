import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import IllustrationFrame from "@/components/IllustrationFrame";
import SectionDivider from "@/components/SectionDivider";
import {
  Clock4, Droplets, ShieldCheck, AlarmClock, Building2, Sofa,
  Camera, Layers, MapPin, MessageSquareText, Bed, HelpCircle,
} from "lucide-react";
import illustWhatsAppQuote from "@/assets/illust-whatsapp-quote.png";

const faqIcons = [
  Clock4, Droplets, ShieldCheck, AlarmClock, Building2, Sofa,
  Camera, Layers, MapPin, MessageSquareText, Bed,
];

export default function FAQ() {
  return (
    <PageLayout
      title="FAQ — FreshDream Mattress Care"
      description="Answers about mattress cleaning, drying time, stain expectations, same-day support, multi-unit support, service areas in Nairobi, and more."
    >
      {/* Hero with illustration */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="container-tight grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow"><HelpCircle className="h-3.5 w-3.5" /> FAQ</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
              Honest answers for hosts and property managers.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              No miracle promises. No fine print. Just clear answers about what we do, how long it takes,
              and what hosts can realistically expect.
            </p>
          </div>
          <div className="lg:col-span-5">
            <IllustrationFrame src={illustWhatsAppQuote} alt="WhatsApp quote illustration" tone="accent" badge="Real answers" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => {
              const Icon = faqIcons[i] ?? HelpCircle;
              return (
                <AccordionItem
                  key={i}
                  value={`q${i}`}
                  className="card-soft overflow-hidden border-border px-5"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-primary hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{f.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <SectionDivider />

          <div className="mt-6 card-soft relative overflow-hidden bg-gradient-band p-8 text-center text-primary-foreground">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <h2 className="relative text-xl font-bold">Still have a question?</h2>
            <p className="relative mx-auto mt-2 max-w-md text-primary-foreground/80">
              WhatsApp us with photos — quick honest answer, no pressure.
            </p>
            <div className="relative mt-5 flex justify-center"><WhatsAppButton /></div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
