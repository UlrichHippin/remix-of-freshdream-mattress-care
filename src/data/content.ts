import { Bed, Sparkles, Droplets, AlarmClock, Sofa, LucideIcon } from "lucide-react";
import illustGuestReady from "@/assets/illust-guest-ready.png";
import illustDeepClean from "@/assets/illust-deep-clean.png";
import illustMattressCare from "@/assets/illust-mattress-care.png";
import illustHostSupport from "@/assets/illust-host-support.png";
import illustUpholstery from "@/assets/illust-upholstery.png";

export interface ServiceDef {
  slug: string;
  title: string;
  short: string;
  bestFor: string;
  includes: string[];
  expectations: string;
  icon: LucideIcon;
  illustration: string;
  whatsappTemplate: string;
}

export const services: ServiceDef[] = [
  {
    slug: "turnover",
    illustration: illustGuestReady,
    title: "Turnover Freshen-Up",
    short: "Routine refresh between guests — quick, low-moisture, photo-documented.",
    bestFor: "Routine Airbnb turnovers and quick refreshes before the next guest.",
    includes: [
      "Mattress inspection",
      "Dry vacuuming",
      "Light spot treatment",
      "Odor-neutralizing treatment",
      "Low-moisture refresh",
      "After-service photo documentation",
    ],
    expectations:
      "Designed for properties already in good condition. Best results when scheduled regularly between bookings.",
    icon: Sparkles,
    whatsappTemplate:
      "Hello, I would like to book a Turnover Freshen-Up.\nLocation:\nMattress size:\nNext guest check-in time:",
  },
  {
    slug: "deep-clean",
    illustration: illustDeepClean,
    title: "Deep Mattress Clean",
    short: "For visible stains, sweat buildup and heavier use over time.",
    bestFor: "Mattresses with visible stains, sweat buildup, body oils, or heavier use over time.",
    includes: [
      "Full mattress inspection",
      "Dry soil removal",
      "Targeted pre-treatment",
      "Deeper extraction cleaning",
      "Odor-reduction support",
      "After-service photo documentation",
    ],
    expectations:
      "Older or deeper stains may improve significantly without disappearing fully. We share an honest assessment before treatment.",
    icon: Bed,
    whatsappTemplate:
      "Hello, I would like to request a Deep Mattress Clean.\nLocation:\nMattress size:\nPhotos of stains:\nNext guest check-in time:",
  },
  {
    slug: "urine-odor",
    illustration: illustMattressCare,
    title: "Urine & Odor Recovery",
    short: "Targeted treatment for guest accidents and stronger odor concerns.",
    bestFor: "Guest accidents, urine concerns, and stronger odor issues.",
    includes: [
      "Affected-area inspection",
      "Targeted urine and odor treatment",
      "Stain-focused cleaning process",
      "Extraction support",
      "Drying guidance",
      "After-service documentation",
    ],
    expectations:
      "We use honest wording: some older or deeper stains may improve significantly without disappearing completely. Heavily soaked mattresses sometimes need replacement — we will tell you straight.",
    icon: Droplets,
    whatsappTemplate:
      "Hello, I need urgent Urine & Odor Recovery.\nLocation:\nMattress size:\nPhotos:\nWhen did the incident happen:\nNext guest check-in time:",
  },
  {
    slug: "emergency",
    illustration: illustHostSupport,
    title: "Emergency Host Service",
    short: "Urgent support before the next guest check-in.",
    bestFor: "Last-minute stains, odor complaints, urgent guest incidents, and unexpected turnover problems.",
    includes: [
      "Priority response on WhatsApp",
      "Same-day or next-day slot where possible",
      "On-site inspection and triage",
      "Targeted treatment for the issue",
      "Drying guidance for tight turnarounds",
      "Photo proof of the result",
    ],
    expectations:
      "Availability depends on the day's schedule. Send photos and your check-in time and we will tell you honestly what is possible.",
    icon: AlarmClock,
    whatsappTemplate:
      "URGENT — I need Emergency Host Service before my next check-in.\nLocation:\nProperty / unit:\nNext guest check-in time:\nIssue:\nPhotos:",
  },
  {
    slug: "upholstery",
    illustration: illustUpholstery,
    title: "Upholstery & Sofa Cleaning",
    short: "Sofas, cushions and upholstered chairs in short-stay properties.",
    bestFor: "Sofas, cushions, upholstered chairs, and selected soft furnishings in short-stay properties.",
    includes: [
      "Inspection of upholstery and seams",
      "Dry soil and debris removal",
      "Targeted spot treatment",
      "Extraction or low-moisture cleaning where suitable",
      "Drying guidance",
      "Photo documentation",
    ],
    expectations:
      "Some delicate or aged fabrics may have permanent marks. We confirm what is realistic before starting.",
    icon: Sofa,
    whatsappTemplate:
      "Hello, I would like a quote for Upholstery & Sofa Cleaning.\nLocation:\nFurniture type & count:\nPhotos:\nNext guest check-in time:",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "How long does mattress cleaning take?",
    a: "Most single-mattress jobs take about 45–90 minutes depending on the service and the condition. Deeper cleans and urine recovery take longer. We confirm a time estimate when you send photos.",
  },
  {
    q: "How long does drying take?",
    a: "We use a controlled-moisture approach to help reduce drying time. In a well-ventilated room, mattresses are usually touch-dry within a few hours and ready for fresh sheets the same day. Hot, humid or closed rooms take longer — we share specific drying guidance after every job.",
  },
  {
    q: "Do all stains come out completely?",
    a: "Honestly, no. Many stains improve significantly, but older marks, deep urine, ink, dye transfer, mold and some biological stains may not disappear completely. We give you a realistic assessment before we start so you can decide.",
  },
  {
    q: "Do you offer same-day support?",
    a: "Often yes, especially for hosts in our core service areas. Same-day support depends on the day's schedule. WhatsApp us early with photos and your check-in time for the fastest response.",
  },
  {
    q: "Do you work specifically with Airbnb hosts?",
    a: "Yes. We are built around short-stay turnovers — Airbnb hosts, serviced apartments, guesthouses and property managers. We understand check-in deadlines, repeat units and documented service.",
  },
  {
    q: "Can you also clean sofas and upholstered chairs?",
    a: "Yes — Upholstery & Sofa Cleaning is one of our core services. We handle sofas, cushions, upholstered chairs and selected soft furnishings.",
  },
  {
    q: "Do you provide before/after photo proof?",
    a: "Yes. Documented service is part of every job: before/after photos, what was treated, and honest result communication shared with you.",
  },
  {
    q: "Do you offer support for multiple units?",
    a: "Yes. Our Multi-Unit Host Package is designed for property managers and hosts running 3 or more units, with priority scheduling and consistent documentation.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in Roysambu and primarily serve Roysambu, Kasarani, Thome, Mirema, Garden Estate, Zimmerman, Kahawa West, Kahawa Sukari, TRM Drive area, Ridgeways, Ruaraka, Parklands and Westlands. Other Nairobi areas on request.",
  },
  {
    q: "How do I request a quote?",
    a: "WhatsApp is fastest. Send your location, mattress size or furniture type, photos, your next guest check-in time, and any urgency notes. You'll get an estimated price, an available time slot and drying guidance.",
  },
  {
    q: "Do you clean heavily damaged or moldy mattresses?",
    a: "We assess every case honestly. Some moldy or heavily damaged mattresses are not safe to recover and we'll recommend replacement instead of charging for a clean that won't deliver real results.",
  },
];

export const hostPackages = [
  {
    name: "Starter Host Package",
    units: "For 1–2 units",
    summary:
      "Reliable, structured support for solo hosts and small operators who want consistent turnover quality without juggling vendors.",
    bullets: [
      "Priority WhatsApp scheduling",
      "Consistent crew familiar with your unit(s)",
      "Bundled mattress + upholstery care",
      "Documented before/after on every visit",
      "Honest assessment and drying guidance",
    ],
  },
  {
    name: "Multi-Unit Host Package",
    units: "For 3+ units",
    summary:
      "Operational backbone for property managers and multi-unit operators who need predictable, repeatable service across the portfolio.",
    bullets: [
      "Recurring turnover scheduling",
      "Priority emergency response across units",
      "Unit-by-unit service history",
      "Bundled mattress + upholstery care",
      "Custom pricing tailored to your portfolio",
    ],
    featured: true,
  },
];

export const pricingMattress = [
  {
    size: "Single Mattress",
    freshen: "KES 2,000–2,500",
    deep: "KES 3,000–4,000",
  },
  {
    size: "Double / Queen Mattress",
    freshen: "KES 2,500–3,500",
    deep: "KES 4,000–5,500",
    featured: true,
  },
  {
    size: "King Mattress",
    freshen: "KES 3,500–4,500",
    deep: "KES 5,500–7,000",
  },
];

export const pricingAddOns = [
  { t: "Heavy stain treatment", p: "+ KES 500–1,500" },
  { t: "Urine / strong odor treatment", p: "+ KES 1,000–2,500" },
  { t: "Same-day emergency call-out", p: "+ KES 1,000–2,000" },
  { t: "Extra drying support / return check", p: "+ KES 500–1,000" },
];

export const pricingUpholstery = [
  { t: "Pillow cleaning", p: "KES 300–700 each" },
  { t: "Sofa seat / cushion cleaning", p: "KES 500–1,500 per seat" },
  { t: "Dining chair upholstery cleaning", p: "KES 300–800 each" },
  { t: "Small rug / carpet spot cleaning", p: "from KES 1,000" },
];

export const pricingNotes = [
  "Final pricing depends on mattress size, condition, location, and urgency.",
  "Multi-unit discounts may be available.",
  "Same-day support is subject to availability.",
  "Host packages and repeat-property support are quoted individually.",
];
