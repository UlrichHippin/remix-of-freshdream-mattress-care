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
    title: "Freshen Up",
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
      "Hello, I would like to book a Freshen Up.\nLocation:\nMattress size:\nNext guest check-in time:",
  },
  {
    slug: "deep-clean",
    illustration: illustDeepClean,
    photo: photoMattressDetail,
    photoAlt: "Mattress cleaning Nairobi for Airbnb hosts — detail view",
    title: "Standard Cleaning",
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
      "Hello, I would like to request a Standard Cleaning (with optional Intensive Stain Treatment).\nLocation:\nMattress size:\nPhotos of stains:\nNext guest check-in time:",
  },
  {
    slug: "urine-odor",
    illustration: illustMattressCare,
    photo: photoMattressDetail,
    photoAlt: "Neutral mattress detail — odor and stain treatment service in Nairobi",
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
    photo: photoHospitalityApartment,
    photoAlt: "Airbnb mattress cleaning service Nairobi — emergency host support",
    title: "Emergency Host Support",
    short: "Urgent support before the next guest check-in.",
    bestFor: "Last-minute stains, odor complaints, urgent guest incidents, and unexpected turnover problems.",
    includes: [
      "Priority response on WhatsApp",
      "Same-day or next-day slot where possible",
      "On-site inspection and triage",
      "Targeted treatment for the issue",
      "Drying guidance for tight turnarounds",
      "Service photos on request where suitable",
    ],
    expectations:
      "Availability depends on the day's schedule. Send photos and your check-in time and we will tell you honestly what is possible.",
    icon: AlarmClock,
    whatsappTemplate:
      "URGENT — I need Emergency Host Support before my next check-in.\nLocation:\nProperty / unit:\nNext guest check-in time:\nIssue:\nPhotos:",
  },
  {
    slug: "upholstery",
    illustration: illustUpholstery,
    photo: photoUpholstery,
    photoAlt: "Sofa upholstery cleaning Nairobi",
    title: "Upholstery & Sofa Refresh (Available on request)",
    short: "Available on request alongside a mattress booking — sofas, cushions and upholstered chairs.",
    bestFor: "Available on request — sofas, cushions, upholstered chairs and selected soft furnishings, usually added to a mattress booking.",
    includes: [
      "Inspection of upholstery and seams",
      "Dry soil and debris removal",
      "Targeted spot treatment",
      "Targeted spot support where suitable (no soaking, no water extraction)",
      "Drying guidance",
      "Photo documentation",
    ],
    expectations:
      "Some delicate or aged fabrics may have permanent marks. We confirm what is realistic before starting.",
    icon: Sofa,
    whatsappTemplate:
      "Hello, I would like a quote for Upholstery & Sofa Refresh.\nLocation:\nFurniture type & count:\nPhotos:\nNext guest check-in time:",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "How long until we can sleep on the mattress again?",
    a: "For dry mattress care, there is no wet-mattress drying delay because we do not soak the mattress or use water extraction. In most dry-care cases, fresh sheets can be placed back shortly after service. If targeted stain or odor treatment is applied, we will give separate ventilation guidance.",
  },
  {
    q: "How long does mattress cleaning take?",
    a: "Most single-mattress jobs take about 45–90 minutes depending on the service and the condition. Deeper cleans and urine and odor treatment take longer. We confirm a time estimate when you send photos.",
  },
  {
    q: "How long does the mattress take to dry after cleaning?",
    a: "For our core dry mattress care, there is no wet-mattress drying delay because we do not soak the mattress or use water extraction. In most dry-care cases, fresh sheets can be placed back shortly after service. If targeted stain or odor treatment is applied, we will give separate ventilation guidance.",
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
    a: "Sofas and upholstery cleaning is available on request alongside a mattress booking. Our main focus is professional mattress hygiene cleaning — WhatsApp us with photos for a custom quote.",
  },
  {
    q: "Do you provide service photos?",
    a: "Yes. Service photos can be provided on request where suitable, including photos of the cleaning process, treated areas and final setup.",
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
  {
    q: "Is the KES 300 Sleep Area Dust Refresh full room cleaning?",
    a: "No. It is a quick hygiene add-on around the sleeping area only. It includes vacuuming around the bed, reachable under-bed areas, floor edges near the bed, and light dust removal from the bed frame/headboard. It does not include mopping, full room cleaning, bathroom cleaning, laundry, carpet deep cleaning, stain removal, or moving heavy furniture.",
  },
  {
    q: "Do you charge a location fee?",
    a: "Yes. FreshDream Mattress Care is based in Roysambu, Nairobi. We call it a Location Fee because it depends on your area, distance, traffic, parking and access. The fee is charged once per visit, not per mattress. If several mattresses are cleaned at the same location, only one location fee applies. Nearby areas may qualify for reduced or free location fee depending on the order value. The final fee is always confirmed before booking after receiving your WhatsApp location pin.",
  },
];

// Location Fee — area-based fee, confirmed before booking
export const locationFee = {
  title: "Location Fee",
  intro:
    "FreshDream Mattress Care is based in Roysambu, Nairobi. We call it a Location Fee because it depends on your area, distance, traffic, parking and access. The final location fee is always confirmed before booking after receiving your WhatsApp location pin.",
  fairness:
    "Location fee is charged once per visit, not per mattress. If several mattresses are cleaned at the same location, only one location fee applies.",
  zones: [
    {
      area: "Nearby Roysambu Area",
      examples: "Roysambu, Zimmerman, Kasarani, Mirema, TRM",
      fee: "KES 300",
      free: "Free from KES 2,499 order value",
    },
    {
      area: "North Nairobi",
      examples: "Garden Estate, Ruaraka, Muthaiga North, Kahawa areas",
      fee: "KES 500",
      free: "Free from KES 5,000 order value",
    },
    {
      area: "Central Nairobi",
      examples: "CBD, Parklands, Ngara, Pangani, Eastleigh",
      fee: "KES 800",
      free: "Free from KES 8,000 order value",
    },
    {
      area: "West / Premium Areas",
      examples: "Westlands, Kilimani, Kileleshwa, Lavington, Gigiri, Runda",
      fee: "KES 1,200",
      free: "Discount possible from KES 12,000 order value",
    },
    {
      area: "South / East Nairobi",
      examples: "South B, South C, Donholm, Umoja, Embakasi, Pipeline",
      fee: "KES 1,500",
      free: "Discount possible from KES 12,000 order value",
    },
    {
      area: "Far Nairobi / Outside Nairobi",
      examples: "Karen, Langata, Ruaka, Syokimau, JKIA, Ruiru, Kiambu",
      fee: "Confirmed before booking",
      free: "Custom quote",
    },
  ],
  note:
    "Parking fees, estate entry fees, tolls or special access costs may be added at actual cost.",
  bookingHint:
    "Send your location pin on WhatsApp so we can confirm the exact location fee before booking.",
};

// Centralized numeric location zone data (single source of truth for QuickQuote / forms)
export type LocationZoneData = {
  key: "roysambu" | "north" | "central" | "west" | "south" | "far";
  label: string;
  fee: number;
  waiveAt?: number;
  discountAt?: number;
  custom?: boolean;
};

export const locationZonesData: LocationZoneData[] = [
  { key: "roysambu", label: "Nearby Roysambu Area",          fee: 300,  waiveAt: 2499 },
  { key: "north",    label: "North Nairobi",                 fee: 500,  waiveAt: 5000 },
  { key: "central",  label: "Central Nairobi",               fee: 800,  waiveAt: 8000 },
  { key: "west",     label: "West / Premium Areas",          fee: 1200, discountAt: 12000 },
  { key: "south",    label: "South / East Nairobi",          fee: 1500, discountAt: 12000 },
  { key: "far",      label: "Far Nairobi / Outside Nairobi", fee: 0,    custom: true },
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
      "Bundled mattress hygiene care + optional add-ons",
      "Service photos on request where suitable",
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
      "Bundled mattress hygiene care + optional add-ons",
      "Custom pricing tailored to your portfolio",
    ],
    featured: true,
  },
];

// Sleep Area Dust Refresh — optional hygiene add-on around the sleeping area
export const sleepAreaAddOn = {
  name: "Sleep Area Dust Refresh",
  price: "KES 300",
  priceLabel: "Add Sleep Area Dust Refresh — KES 300",
  included: [
    "Quick vacuuming around the bed area",
    "Floor edges near the bed",
    "Under-bed dust removal where reachable",
    "Light vacuuming of bed frame/headboard",
    "Visible dust reduction around the sleeping area",
  ],
  note:
    "This is a quick hygiene add-on around the sleeping area only. It is not full room cleaning or housekeeping.",
};

// Fresh Sleep Package — mattress hygiene cleaning + Sleep Area Dust Refresh
export const freshSleepPackage = {
  name: "Fresh Sleep Package",
  badge: "Recommended · Best for Airbnb & Homes",
  summary:
    "Fresh Sleep Package = your selected mattress cleaning package + Sleep Area Dust Refresh for KES 300. The mattress cleaning price depends on the package and mattress size you choose; the Sleep Area Dust Refresh is always a flat KES 300 add-on.",
  priceLogic:
    "Total = selected mattress cleaning package + KES 300 Sleep Area Dust Refresh. Opening Offer starts from KES 1,999 where applicable; regular Freshen Up starts from KES 2,500.",
  includes: [
    "Mattress hygiene cleaning (your selected package)",
    "Sleep Area Dust Refresh add-on (KES 300)",
    "Vacuuming around the bed and reachable under-bed areas",
    "Light dust removal from bed frame/headboard",
    "Photo documentation",
  ],
  whatsappMessage:
    "Hello FreshDream, I have a quick inquiry about the Fresh Sleep Package (mattress cleaning + Sleep Area Dust Refresh KES 300).\nLocation:\nMattress size:\nPreferred mattress cleaning package:\n(To send a full booking request, I will use the booking form on the website (it opens WhatsApp with all details prefilled).)",
  cta: "Ask about Fresh Sleep Package on WhatsApp",
};

export const pricingAddOns = [
  { t: "Sleep Area Dust Refresh (around the bed only)", p: "KES 300" },
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
    "First-time customers only. Limited launch period. Selected Nairobi areas. Location fee may apply unless waived by order value and service area. Final price may depend on mattress condition, location and urgency.",
  whatsappMessage:
    "Hello FreshDream, I have a quick inquiry about the Opening Offer (Freshen Up). My location:\nMattress size:\nFirst-time customer: Yes\n(To send a full booking request, I will use the booking form on the website (it opens WhatsApp with all details prefilled).)",
  cta: "Ask about Opening Offer on WhatsApp",
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
    "Warm-air freshness",
    "WhatsApp service photos",
    "M-PESA accepted",
    "Same-day support where available",
  ],
  smallPrint:
    "Final price depends on mattress size, location, condition and urgency.",
  whatsappMessage:
    "Hello FreshDream, I have a quick inquiry about the Airbnb Host Starter Package.\nNumber of mattresses:\nLocation:\nNext check-in time:\n(To send a full booking request, I will use the booking form on the website (it opens WhatsApp with all details prefilled).)",
  cta: "Ask about Host Package on WhatsApp",
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

// Private feedback & Referral
export const reviewReferral = {
  headline: "Private Feedback & Referral Bonus",
  reviewText:
    "Share honest private feedback after your first service and receive 10% off your next booking. Public reviews should always be voluntary and never rewarded.",
  referralText:
    "Refer another Airbnb host or property owner and both receive KES 500 off the next service.",
};

// Trust points to display near pricing
export const pricingTrustPoints = [
  "Official booking request form",
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
