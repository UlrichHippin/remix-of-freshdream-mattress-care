import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink, defaultWhatsAppMessage } from "@/config/site";

interface Props {
  message?: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

export function WhatsAppButton({
  message = defaultWhatsAppMessage,
  label = "Request a Booking",
  className,
  size = "md",
  variant = "solid",
}: Props) {
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  } as const;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold shadow-soft transition-all hover:shadow-card active:scale-[0.98] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp aria-disabled:pointer-events-none aria-disabled:opacity-50 touch-manipulation";

  const variants = {
    solid:
      "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover hover:-translate-y-px active:translate-y-0 active:bg-whatsapp-hover/90",
    outline:
      "border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground hover:-translate-y-px active:translate-y-0 active:bg-whatsapp-hover active:text-whatsapp-foreground",
  } as const;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], variants[variant], className)}
      aria-label={label}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      <span>{label}</span>
    </a>
  );
}
