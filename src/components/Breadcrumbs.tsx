import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const labels: Record<string, string> = {
  services: "Services",
  pricing: "Pricing",
  "host-packages": "Host Packages",
  about: "About",
  faq: "FAQ",
  contact: "Book Now",
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-surface/60">
      <ol className="container-tight flex items-center gap-1.5 py-3 text-xs sm:text-sm">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
        </li>
        {parts.map((seg, i) => {
          const to = "/" + parts.slice(0, i + 1).join("/");
          const isLast = i === parts.length - 1;
          const label = labels[seg] ?? seg.replace(/-/g, " ");
          return (
            <li key={to} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
              {isLast ? (
                <span aria-current="page" className="font-semibold capitalize text-accent">{label}</span>
              ) : (
                <Link to={to} className="capitalize text-muted-foreground hover:text-accent">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
