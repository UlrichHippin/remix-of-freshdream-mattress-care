import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function FAQ() {
  return (
    <PageLayout
      title="FAQ — FreshDream Mattress Care"
      description="Answers about mattress cleaning, drying time, stain expectations, same-day support, multi-unit support, service areas in Nairobi, and more."
    >
      <section className="border-b border-border bg-gradient-hero">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">FAQ</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary sm:text-5xl">
            Honest answers for hosts and property managers.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-tight max-w-3xl">
          <Accordion type="single" collapsible className="card-soft px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 rounded-2xl bg-primary p-8 text-center text-primary-foreground">
            <h2 className="text-xl font-bold">Still have a question?</h2>
            <p className="mx-auto mt-2 max-w-md text-primary-foreground/80">WhatsApp us with photos — quick honest answer, no pressure.</p>
            <div className="mt-5 flex justify-center"><WhatsAppButton /></div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
