import { Link } from "react-router-dom";
import { Mail, MapPin, BadgeCheck, MessageCircle, Phone } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { site } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";
import logoHorizontal from "@/assets/brand/logo-footer.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container-tight grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link to="/" aria-label={site.name} className="inline-flex items-center">
            <img src={logoHorizontal} alt="FreshDream Mattress Care logo" width={1200} height={400} loading="lazy" className="h-14 w-auto object-contain sm:h-16" />
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Professional mattress hygiene cleaning for Airbnb hosts, serviced apartments and homes — based in Roysambu, Nairobi. Upholstery available on request.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 shrink-0 text-accent" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 shrink-0 text-accent" /> M-PESA accepted
            </li>
            <li>
              <span className="inline-flex items-start gap-2 rounded-2xl border border-accent/40 bg-accent-soft px-3 py-2 text-xs font-medium text-primary shadow-soft">
                <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>
                  Payment instructions are shared on WhatsApp only after booking confirmation. Please only use the official FreshDream payment details we provide on WhatsApp.
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" /> Based in {site.base}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-primary sm:break-words">{site.email}</a>
            </li>
          </ul>
          <div className="mt-5">
            <WhatsAppButton />
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold text-primary">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Prices</Link></li>
            <li><Link to="/technology" className="hover:text-primary">Technology</Link></li>
            <li><Link to="/host-packages" className="hover:text-primary">Hosts</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="text-sm font-semibold text-primary">Service areas</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {site.serviceAreas.slice(0, 12).join(" · ")} · + more on request
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-tight flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link to="/cancellation" className="hover:text-primary">Cancellation</Link></li>
          </ul>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
