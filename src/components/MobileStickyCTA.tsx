import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 py-2.5 shadow-lift backdrop-blur md:hidden">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
      >
        <MessageCircle className="h-4 w-4" />
        Book via WhatsApp
        <span className="ml-1 text-[11px] font-medium opacity-90">· from KES 1,999</span>
      </a>
    </div>
  );
}
