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
    hours: "Service time: about 45–90 minutes · No Wet-Mattress Waiting",
    summary: "A quick dry refresh for mattresses, with selected sofa support available on request.",
    tagline: "Instant fresh care with no soaking.",
    description:
      "A professional dry surface refresh using the JIMMY BX7 Pro Max with tapping brushroll, dry suction, UV-C hygiene support, ultrasonic mite-control support and 65°C heated air freshness. Ideal for routine hygiene maintenance between guests — fast, dry and ready to use immediately.",
    included: [
      "High-Frequency Vibration Tapping (45,000 taps/min) to dislodge deep dust and allergens",
      "Dust, hair, and dander removal",
      "Ultrasonic Mite Suppression — disrupts the mite nervous system",
      "UV-C hygiene treatment",
      "65°C Graphene Heat Sterilization — eliminates mites and dehumidifies the mattress in Nairobi's humid climate",
      "Suitable for mattresses (sofa support available on request)",
    ],
    bestFor: ["Light odors", "Dust buildup", "Routine maintenance", "Allergy-sensitive homes"],
    readyIn: "About 45–90 minutes service time",
    note: "Dry process only. No soaking and no wet-mattress waiting.",
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
    hours: "Service time depends on mattress size and condition · No soaking",
    summary: "A deeper dry-cleaning treatment for everyday dirt and odor.",
    tagline: "Deeper freshness for everyday use.",
    description:
      "A deeper dry hygiene refresh with pre-treatment where suitable, tapping brushroll, dry suction, UV-C hygiene support, ultrasonic mite-control support and 65°C heated air freshness — powered by the JIMMY BX7 Pro Max.",
    included: [
      "Pre-treatment with baking soda",
      "High-Frequency Vibration Tapping (45,000 taps/min) for deep dust and allergen release",
      "Ultrasonic Mite Suppression to disrupt the mite nervous system",
      "Dust and odor reduction",
      "UV-C hygiene treatment",
      "65°C Graphene Heat Sterilization — eliminates mites and dehumidifies in Nairobi's humid climate",
    ],
    bestFor: [
      "Sweat and body odor",
      "Dust and dander buildup",
      "General household use",
      "Regular care for frequently used items",
    ],
    readyIn: "Service time depends on mattress size and condition",
    note: "Dry treatment. No soaking; no wet extraction.",
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
    hours: "Service time varies by condition · Spot treatment may need ventilation guidance",
    summary: "Focused treatment for visible stains and stronger dirt buildup.",
    tagline: "Targeted care for visible problem areas.",
    description:
      "This package is designed for customers dealing with stronger stains or visible dirt marks on mattresses (sofa support available on request). We use a focused dry-treatment method with stain-targeting preparation, brushing where needed, followed by deep JIMMY BX7 Pro Max vacuuming and surface hygiene support. Results vary and complete stain removal cannot be guaranteed.",
    included: [
      "Targeted stain pre-treatment",
      "Brushing of affected areas",
      "High-Frequency Vibration Tapping (45,000 taps/min) with deep suction",
      "Ultrasonic Mite Suppression",
      "UV-C hygiene support",
      "65°C Graphene Heat Sterilization — eliminates mites and dehumidifies in Nairobi's humid climate",
    ],
    bestFor: ["Beverage stains", "Food stains", "Vomit stains", "Localized heavy dirt"],
    readyIn: "Service time varies by condition",
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
    hours: "Service time and aftercare depend on odor depth · Ventilation guidance provided",
    summary: "Dry odor-focused treatment for urine accidents and strong odor cases.",
    tagline: "Advanced dry treatment for urine odor and contamination.",
    description:
      "For urine, strong odor or deep contamination cases on mattresses (sofa and selected fabric surfaces available on request). Price depends on severity, mattress size, age of contamination and whether a second treatment is needed. We use a multi-step dry odor-control process with absorption treatment, deep vacuuming, UV-C hygiene treatment and warm-air freshness to reduce odor and restore freshness as much as possible.",
    included: [
      "Urine-focused dry pre-treatment",
      "Odor absorption process",
      "High-Frequency Vibration Tapping (45,000 taps/min) with deep suction",
      "Ultrasonic Mite Suppression",
      "UV-C hygiene support",
      "65°C Graphene Heat Sterilization — eliminates mites and dehumidifies in Nairobi's humid climate",
      "Final inspection",
    ],
    bestFor: [
      "Children's accidents",
      "Pet urine incidents",
      "Strong odor areas",
      "Mattress urine cases (upholstery on request)",
    ],
    readyIn: "Service time and aftercare depend on odor depth and mattress condition",
    note: "No soaking. Ventilation guidance provided if needed. Older or deep urine contamination may improve but may not disappear completely. Severe cases may require follow-up treatment or replacement advice.",
    sizes: [
      { label: "All sizes", price: "From KES 4,500 (quoted)" },
    ],
    whatsappMessage: "Hello, I would like a quote for the Urine & Odor Reduction Treatment. I will share photos and mattress size.",
  },
];

export const packageBookingLabels = [
  "Opening Offer — First-time customer — from KES 1,999",
  ...packages.map((p) => `${p.title} — from ${p.sizes[0].price}`),
];

