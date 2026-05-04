import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";
import logoHorizontal from "@/assets/logo-horizontal.png";
import logoMark from "@/assets/logo-mark.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/host-packages", label: "Host Packages" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Book Now" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent bg-background/85 backdrop-blur-md transition-all",
        scrolled && "border-border bg-background/95 shadow-soft",
      )}
    >
      <div
        className={cn(
          "container-tight flex items-center justify-between gap-4 transition-all",
          scrolled ? "h-16 sm:h-16" : "h-16 sm:h-20",
        )}
      >
        <Link to="/" className="flex items-center" aria-label={site.name}>
          <img
            src={logoHorizontal}
            alt={site.name}
            width={1200}
            height={400}
            className={cn(
              "w-auto max-w-[60vw] object-contain transition-all",
              scrolled
                ? "h-10 sm:h-11 lg:h-12"
                : "h-11 sm:h-14 lg:h-16",
            )}
          />
        </Link>


        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent-soft hover:text-accent",
                  "after:pointer-events-none after:absolute after:left-1/2 after:-bottom-1 after:h-[3px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-accent after:opacity-0 after:transition-[width,opacity] after:duration-200 after:ease-out hover:after:w-6 hover:after:opacity-70",
                  isActive && "bg-accent-soft font-semibold text-accent after:w-8 after:opacity-100 after:animate-fade-in",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <WhatsAppButton size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-tight flex flex-col py-3" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3 py-3 text-base font-medium text-foreground/80",
                    isActive && "border-l-4 border-accent bg-accent-soft pl-4 font-semibold text-accent",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-3">
              <WhatsAppButton className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
