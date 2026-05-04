import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";
import logoMark from "@/assets/logo-mark.png";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-surface">
      <div className="container-tight grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" aria-label={site.name} className="inline-flex items-center gap-3">
            <img src={logoMark} alt={site.name} width={512} height={512} loading="lazy" className="h-12 w-12 object-contain" />
            <span className="text-lg font-bold text-primary">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Specialist mattress and upholstery cleaning for Airbnb hosts, serviced apartments, and
            short-stay property managers in Nairobi. Based in {site.base}.
          </p>
          <div className="mt-5">
            <WhatsAppButton />
          </div>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            Documented service · Honest assessment · Built for hosts
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-primary">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link to="/host-packages" className="hover:text-primary">Host Packages</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-primary">Service areas</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {site.serviceAreas.slice(0, 8).join(" · ")} and selected Nairobi areas on request.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> {site.base}</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-tight flex flex-col gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
