import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-105 hover:bg-whatsapp-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp md:grid"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
