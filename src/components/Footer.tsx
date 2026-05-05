import { Link, useLocation } from "react-router-dom";
import { Mail, MapPin, MapPinned } from "lucide-react";
import { site } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";
import logoHorizontal from "@/assets/logo-horizontal.png";

const pageLabels: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/pricing": "Pricing",
  "/host-packages": "Host Packages",
  "/about": "About",
  "/faq": "FAQ",
  "/contact": "Book Now",
};

export default function Footer() {
  const { pathname } = useLocation();
  const currentPage = pageLabels[pathname] ?? "This page";
  return (
    <footer className="mt-12 border-t border-border bg-surface">
      <div className="container-tight grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link to="/" aria-label={site.name} className="inline-flex items-center">
            <img src={logoHorizontal} alt={site.name} width={1200} height={400} loading="lazy" className="h-14 w-auto object-contain sm:h-16" />
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

        <div className="lg:col-span-3">
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

        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="text-sm font-semibold text-primary">Service areas</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            {site.serviceAreas.slice(0, 8).map((area) => (
              <li
                key={area}
                className="inline-flex max-w-full items-center whitespace-nowrap rounded-full bg-muted px-2.5 py-1 leading-tight"
              >
                {area}
              </li>
            ))}
            <li className="inline-flex max-w-full items-center whitespace-nowrap rounded-full bg-muted px-2.5 py-1 italic leading-tight">
              + more on request
            </li>
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0 break-words">{site.base}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href={`mailto:${site.email}`}
                className="min-w-0 break-all hover:text-primary sm:break-words"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-tight flex flex-col gap-4 py-6 text-xs text-muted-foreground">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link to="/disclaimer" className="hover:text-primary">Cleaning Disclaimer</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link to="/cancellation" className="hover:text-primary">Cancellation Policy</Link></li>
          </ul>
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                <MapPinned className="h-3.5 w-3.5" /> You are on: {currentPage}
              </span>
            </div>
            <p className="max-w-xl md:text-right">{site.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
