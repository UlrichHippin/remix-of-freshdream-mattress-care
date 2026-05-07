import { MessageCircle, Calculator, Sparkles, Camera } from "lucide-react";

const steps = [
  { i: MessageCircle, t: "Send a WhatsApp", d: "Share mattress size, location pin and preferred date." },
  { i: Calculator, t: "Get your quote", d: "We confirm price, location fee and a slot — fast." },
  { i: Sparkles, t: "Pro cleaning", d: "Dry process with JIMMY BX7 Pro Max. No soaking, no mess." },
  { i: Camera, t: "Photo report", d: "Before/after photos and a clear summary on WhatsApp." },
];

export default function ProcessTimeline() {
  return (
    <section className="section bg-surface">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How it works</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            <span className="text-gradient-brand">From WhatsApp to fresh sleep in 4 steps</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Transparent. Fast. Documented.</p>
        </div>

        <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
          <div
            className="absolute left-6 right-6 top-7 hidden h-0.5 origin-left bg-gradient-to-r from-primary/30 via-accent to-primary/30 md:block animate-progress-line"
            aria-hidden
          />
          {steps.map((s, i) => (
            <li
              key={s.t}
              className="group relative flex flex-col items-center text-center transition-transform hover:-translate-y-1"
            >
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lift ring-4 ring-surface transition-transform group-hover:scale-110 group-hover:rotate-3">
                <span className="absolute inset-0 rounded-2xl ring-2 ring-accent/40 opacity-0 transition-opacity group-hover:opacity-100" style={{ animation: "ring-pulse 2s ease-out infinite" }} aria-hidden />
                <s.i className="relative h-6 w-6" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground ring-2 ring-surface">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-primary">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
