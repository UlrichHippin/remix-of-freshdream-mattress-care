import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Quick WhatsApp inquiry"
      title="Quick WhatsApp inquiry — for a full booking request, use the booking form"
      className="group fixed bottom-5 right-5 z-50 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-110 hover:bg-whatsapp-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp md:grid"
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp"
        style={{ animation: "ring-pulse 2.4s ease-out infinite" }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp"
        style={{ animation: "ring-pulse 2.4s ease-out infinite", animationDelay: "1.2s" }}
        aria-hidden="true"
      />
      <MessageCircle className="relative h-6 w-6 transition-transform group-hover:rotate-[-8deg]" />
      <span className="sr-only">Quick WhatsApp inquiry</span>
    </a>
  );
}
