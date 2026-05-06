// Single source of truth for service packages and pricing.
// Used by Homepage, Pricing page and Booking form.

export interface PkgSize {
  label: string;
  price: string;
}

export interface PackageDef {
  slug: string;
  title: string;
  startingPrice: string;
  hours: string;
  summary: string;
  tagline: string;
  description: string;
  included: string[];
  bestFor: string[];
  readyIn: string;
  note: string;
  sizes: PkgSize[];
  whatsappMessage: string;
}

export const STARTING_NOTE = "Single mattress (3x6 ft)";

export const packages: PackageDef[] = [
  {
    slug: "freshen-up",
    title: "Freshen Up",
    startingPrice: "Starting from 2,500 KES",
    hours: "Ready in about 2 hours",
    summary: "A quick dry refresh for mattresses, with selected sofa support available on request.",
    tagline: "Instant fresh care with no soaking.",
    description:
      "Our Freshen Up package is perfect for customers who want a fast hygiene and freshness boost without deep stain treatment. We use the JIMMY BX7 Pro to remove dust, hair, dander, and surface debris, while UV-C light and hot air help improve hygiene and freshness.",
    included: [
      "Dry vacuum treatment",
      "Dust, hair, and dander removal",
      "UV-C hygiene treatment",
      "Warm-air freshness treatment",
      "Suitable for mattresses (sofa support available on request)",
    ],
    bestFor: ["Light odors", "Dust buildup", "Routine maintenance", "Allergy-sensitive homes"],
    readyIn: "About 2 hours",
    note: "Dry process only. No soaking.",
    sizes: [
      { label: "Single (3x6 ft)", price: "KES 2,500" },
      { label: "Double (4x6 ft)", price: "KES 3,000" },
      { label: "Queen (5x6 ft)", price: "KES 3,500" },
      { label: "King (6x6 ft)", price: "KES 4,000" },
    ],
    whatsappMessage: "Hello, I would like to book the Freshen Up package (from KES 2,500).",
  },
  {
    slug: "standard",
    title: "Standard Cleaning",
    startingPrice: "Starting from 3,500 KES",
    hours: "Ready in about 4 hours",
    summary: "A deeper dry-cleaning treatment for everyday dirt and odor.",
    tagline: "Deeper freshness for everyday use.",
    description:
      "Our Standard Cleaning package goes beyond surface refreshment. It is ideal for mattresses with sweat buildup, trapped dust, and moderate odor (sofa support available on request). We apply a dry treatment process with baking soda preparation followed by deep vacuuming, UV-C hygiene treatment, and hot air refresh.",
    included: [
      "Pre-treatment with baking soda",
      "Deep dry vacuuming",
      "Dust and odor reduction",
      "UV-C hygiene treatment",
      "Warm-air freshness treatment",
    ],
    bestFor: [
      "Sweat and body odor",
      "Dust and dander buildup",
      "General household use",
      "Regular care for frequently used items",
    ],
    readyIn: "About 4 hours",
    note: "Dry treatment. No water extraction.",
    sizes: [
      { label: "Single (3x6 ft)", price: "KES 3,500" },
      { label: "Double (4x6 ft)", price: "KES 4,000" },
      { label: "Queen (5x6 ft)", price: "KES 4,500" },
      { label: "King (6x6 ft)", price: "KES 5,000" },
    ],
    whatsappMessage: "Hello, I would like to book the Standard Cleaning package (from KES 3,500).",
  },
  {
    slug: "intensive-stain",
    title: "Intensive Stain Treatment",
    startingPrice: "Starting from 4,500 KES",
    hours: "Ready in about 6 hours",
    summary: "Focused treatment for visible stains and stronger dirt buildup.",
    tagline: "Targeted care for visible problem areas.",
    description:
      "This package is designed for customers dealing with stronger stains or visible dirt marks on mattresses (sofa support available on request). We use a focused dry-treatment method with stain-targeting preparation, brushing where needed, followed by deep JIMMY BX7 Pro vacuuming and hygiene treatment.",
    included: [
      "Targeted stain pre-treatment",
      "Brushing of affected areas",
      "Deep vacuum treatment",
      "UV-C hygiene support",
      "Warm-air freshness treatment",
    ],
    bestFor: ["Beverage stains", "Food stains", "Vomit stains", "Localized heavy dirt"],
    readyIn: "About 6 hours",
    note: "Results depend on stain age, depth, fabric and mattress condition. Some older or deeper stains may improve but not disappear completely.",
    sizes: [
      { label: "Single (3x6 ft)", price: "KES 4,500" },
      { label: "Double (4x6 ft)", price: "KES 5,000" },
      { label: "Queen (5x6 ft)", price: "KES 5,500" },
      { label: "King (6x6 ft)", price: "KES 6,500" },
    ],
    whatsappMessage: "Hello, I would like to book the Intensive Stain Treatment package (from KES 4,500).",
  },
  {
    slug: "urine-odor",
    title: "Urine & Odor Reduction Treatment",
    startingPrice: "From KES 4,500 — quoted by photo",
    hours: "Ready in about 8 hours",
    summary: "Dry odor-focused treatment for urine accidents and strong odor cases.",
    tagline: "Advanced dry treatment for urine odor and contamination.",
    description:
      "For urine, strong odor or deep contamination cases on mattresses (sofa and selected fabric surfaces available on request). Price depends on severity, mattress size, age of contamination and whether a second treatment is needed. We use a multi-step dry odor-control process with absorption treatment, deep vacuuming, UV-C hygiene treatment and hot air refresh to reduce odor and restore freshness as much as possible.",
    included: [
      "Urine-focused dry pre-treatment",
      "Odor absorption process",
      "Deep vacuum treatment",
      "UV-C hygiene support",
      "Warm-air freshness treatment",
      "Final inspection",
    ],
    bestFor: [
      "Children's accidents",
      "Pet urine incidents",
      "Strong odor areas",
      "Mattress urine cases (upholstery on request)",
    ],
    readyIn: "About 8 hours",
    note: "Older or deep urine contamination may improve but may not disappear completely. Severe cases may require follow-up treatment or replacement advice.",
    sizes: [
      { label: "All sizes", price: "From KES 4,500 (quoted)" },
    ],
    whatsappMessage: "Hello, I would like a quote for the Urine & Odor Reduction Treatment. I will share photos and mattress size.",
  },
];

export const packageBookingLabels = packages.map(
  (p) => `${p.title} — from ${p.sizes[0].price}`,
);
