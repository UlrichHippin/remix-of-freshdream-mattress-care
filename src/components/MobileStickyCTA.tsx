import { MessageCircle, Tag, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { whatsappLink } from "@/config/site";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 py-2 shadow-lift backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <Tag className="h-4 w-4" />
          </span>
          <p className="truncate text-[11px] font-semibold text-primary">
            From KES 1,999
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            to="/#book"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-primary px-3 text-[11px] font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            <Send className="h-3.5 w-3.5" /> Request Booking
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quick WhatsApp inquiry"
            className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-whatsapp px-3 text-[11px] font-semibold text-whatsapp-foreground shadow-soft hover:bg-whatsapp-hover"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Inquiry
          </a>
        </div>
      </div>
    </div>
  );
}
