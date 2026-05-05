import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import MobileStickyCTA from "./MobileStickyCTA";
import Breadcrumbs from "./Breadcrumbs";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function PageLayout({ title, description, children }: Props) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", description.slice(0, 158));
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + window.location.pathname);
  }, [title, description]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </div>
  );
}
