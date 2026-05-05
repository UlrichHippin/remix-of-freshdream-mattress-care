import { Bed, Sparkles, Droplets, AlarmClock, Sofa, LucideIcon } from "lucide-react";
import illustGuestReady from "@/assets/illust-guest-ready.png";
import illustDeepClean from "@/assets/illust-deep-clean.png";
import illustMattressCare from "@/assets/illust-mattress-care.png";
import illustHostSupport from "@/assets/illust-host-support.png";
import illustUpholstery from "@/assets/illust-upholstery.png";
import photoMattressDetail from "@/assets/mattress-detail.jpg";
import photoHeroBed from "@/assets/hero-bed.jpg";
import photoHospitalityBedroom from "@/assets/hospitality-bedroom.jpg";
import photoUpholstery from "@/assets/upholstery.jpg";
import photoHospitalityApartment from "@/assets/hospitality-apartment.jpg";

export interface ServiceDef {
  slug: string;
  title: string;
  short: string;
  bestFor: string;
  includes: string[];
  expectations: string;
  icon: LucideIcon;
  illustration: string;
  photo: string;
  photoAlt: string;
  whatsappTemplate: string;
}

export const services: ServiceDef[] = [
  {
    slug: "turnover",
    illustration: illustGuestReady,
    photo: photoHospitalityBedroom,
    photoAlt: "Dry mattress refresh for serviced apartments in Nairobi",
    title: "Turnover Freshen-Up",
    short: "Quick refresh between guests — low-moisture, fast re-use, photo-documented.",
    bestFor: "Routine Airbnb turnovers and quick refreshes when the mattress needs to be back in service fast.",
    includes: [
      "Mattress inspection",
      "Dry vacuuming",
      "Light spot treatment",
      "Odor-neutralizing treatment",
      "Low-moisture refresh for faster re-use",
      "After-service photo documentation",
    ],
    expectations:
      "Designed for properties already in good condition. Because it uses a low-moisture process, the mattress can typically be put back into service faster than after a deep wet clean — ideal for tight turnovers with minimal downtime.",
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
      "Deeper dry vacuuming and targeted fabric treatment",
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
    title: "Urine & Odor Reduction Treatment",
    short: "Targeted treatment for guest accidents and stronger odor concerns.",
    bestFor: "Guest accidents, urine concerns, and stronger odor issues.",
    includes: [
      "Affected-area inspection",
      "Targeted urine and odor treatment",
      "Stain-focused cleaning process",
      "Targeted dry stain and odor treatment support",
      "Drying guidance",
      "After-service documentation",
    ],
    expectations:
      "We use honest wording: some older or deeper stains may improve significantly without disappearing completely. Heavily soaked mattresses sometimes need replacement — we will tell you straight.",
    icon: Droplets,
    whatsappTemplate:
      "Hello, I need urgent Urine & Odor Reduction Treatment.\nLocation:\nMattress size:\nPhotos:\nWhen did the incident happen:\nNext guest check-in time:",
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
      "Controlled low-moisture treatment where suitable",
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
    a: "We are based in Roysambu and serve Roysambu, Kasarani, Thika Road, Garden Estate, Parklands, Westlands, Kilimani, Kileleshwa, Lavington, Karen, Runda, Gigiri, South B, South C, CBD, Upper Hill, Ngong Road, Kiambu Road and nearby Nairobi areas.",
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

export const pricingAddOns = [
  { t: "Intensive stain treatment", p: "from KES 4,500" },
  { t: "Urine & odor reduction treatment", p: "from KES 4,500 (quoted)" },
  { t: "Same-day emergency call-out", p: "+ KES 1,000–2,000" },
  { t: "Extra drying support / return check", p: "+ KES 500–1,000" },
];

export const pricingUpholstery = [
  { t: "Pillow cleaning", p: "KES 300–700 each" },
  { t: "Sofa seat / cushion cleaning", p: "KES 500–1,500 per seat" },
  { t: "Dining chair upholstery cleaning", p: "KES 300–800 each" },
  { t: "Small rug refresh and spot support", p: "from KES 1,000" },
];

export const pricingNotes = [
  "M-PESA accepted. Cash also welcome.",
  "Final price depends on size, condition, location and urgency.",
  "Photos help us quote more accurately before arrival.",
  "Multiple items can be bundled for better value.",
  "Host package pricing is custom.",
  "Same-day slots depend on route and availability.",
  "Results depend on stain age, depth, fabric and mattress condition. Some older or deeper stains may improve but not disappear completely.",
];

// Opening / launch offer for first-time customers
export const openingOffer = {
  badge: "Launch Offer",
  headline: "Opening Offer for First-Time Customers",
  text:
    "Start fresh with FreshDream Mattress Care. For a limited time, first-time customers in selected Nairobi areas can book our Freshen Up mattress service at a special launch price.",
  prices: [
    { label: "Single Mattress", price: "KES 1,999" },
    { label: "Double Mattress", price: "KES 2,499" },
    { label: "Queen Mattress", price: "KES 2,999" },
    { label: "King Mattress", price: "KES 3,499" },
  ],
  smallPrint:
    "Limited launch offer for first-time customers only. Available for the first 30 customers or during our launch period only. Available in selected Nairobi areas. Final price may depend on mattress condition, location and urgency.",
  whatsappMessage:
    "Hello, I would like to book the Opening Offer (Freshen Up). My location:\nMattress size:\nFirst-time customer: Yes",
  cta: "Book Opening Offer on WhatsApp",
};

// Airbnb Host Starter Package
export const hostStarter = {
  badge: "Airbnb Host Package",
  headline: "Airbnb Host Starter Package",
  text:
    "Keep your guest rooms fresh, hygienic and review-ready between bookings. Ideal for Airbnb hosts, serviced apartments and short-stay property managers in Nairobi.",
  options: [
    { label: "2 mattresses Freshen Up", price: "from KES 4,999" },
    { label: "3 mattresses Freshen Up", price: "from KES 7,499" },
    { label: "Additional mattress", price: "quoted by size" },
    { label: "Same-day or urgent turnover", price: "subject to availability" },
  ],
  included: [
    "Guest-ready dry refresh",
    "Dust and hair removal",
    "Odor check",
    "UV-C hygiene support where suitable",
    "Hot air refresh",
    "WhatsApp service photos",
    "M-PESA accepted",
    "Same-day support where available",
  ],
  smallPrint:
    "Final price depends on mattress size, location, condition and urgency.",
  whatsappMessage:
    "Hello, I would like to book the Airbnb Host Starter Package.\nNumber of mattresses:\nLocation:\nNext check-in time:",
  cta: "Book Host Package on WhatsApp",
};

// Recurring Host Plans
export const recurringHostPlans = {
  headline: "Recurring Host Plans",
  text:
    "For Airbnb hosts and serviced apartment operators who need regular mattress care, we offer weekly, bi-weekly and monthly service plans.",
  options: [
    "Weekly mattress refresh",
    "Bi-weekly guest-room hygiene service",
    "Monthly deep dry mattress care",
    "Multi-unit pricing available",
  ],
  note:
    "Custom pricing depends on number of units, frequency, mattress sizes and location.",
  whatsappMessage:
    "Hello, I would like a quote for a Recurring Host Plan.\nNumber of units:\nLocation:\nPreferred frequency:",
  cta: "Request Host Plan Quote",
};

// Review & Referral
export const reviewReferral = {
  headline: "Review & Referral Bonus",
  reviewText:
    "Leave an honest review after your first service and receive 10% off your next booking.",
  referralText:
    "Refer another Airbnb host or property owner and both receive KES 500 off the next service.",
};

// Trust points to display near pricing
export const pricingTrustPoints = [
  "WhatsApp booking",
  "M-PESA accepted",
  "Based in Roysambu, Nairobi",
  "Airbnb-ready service",
  "Same-day service where available",
  "Photos help us quote accurately",
  "Final price depends on mattress size, condition, stains, location and urgency",
];

// Pricing FAQ
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "Why is urine or strong odor treatment quoted separately?",
    a: "Urine and strong odor cases vary depending on depth, age of contamination, mattress material and previous cleaning attempts. Photos help us give a fair quote before arrival.",
  },
  {
    q: "Can you guarantee stain removal?",
    a: "No. We provide professional stain treatment and improvement, but final results depend on stain age, fabric, depth and previous cleaning attempts.",
  },
  {
    q: "Do you accept M-PESA?",
    a: "Yes, M-PESA and cash are accepted.",
  },
  {
    q: "Is the Opening Offer permanent?",
    a: "No. The Opening Offer is a limited launch promotion for first-time customers in selected Nairobi areas.",
  },
];
