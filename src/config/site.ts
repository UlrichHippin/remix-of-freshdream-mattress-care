// Central site config — update business contact details here.

export const site = {
  name: "FreshDream Mattress Care",
  shortName: "FreshDream",
  publicUrl: "https://freshdream.co.ke",
  tagline: "Mattress Cleaning Nairobi for Airbnb Hosts, Homes & Serviced Apartments",
  base: "Roysambu, Nairobi",
  // Use international format without leading + for wa.me
  whatsappNumber: "491756233913",
  phoneDisplay: "+49 175 6233913",
  email: "info@freshdream.co.ke",
  serviceAreas: [
    "Westlands", "Kilimani", "Kileleshwa", "Lavington", "Parklands",
    "Karen", "Runda", "Gigiri", "Roysambu", "Kasarani",
    "Thika Road", "Kiambu Road", "Garden Estate", "Ridgeways",
    "Ruaraka", "Thome", "Mirema", "Zimmerman", "Kahawa West",
    "Kahawa Sukari", "TRM Drive", "South B", "South C", "CBD",
    "Upper Hill", "Ngong Road",
  ],
  paymentMethods: ["M-PESA", "Cash"],
  mpesa: {
    // M-PESA Till/Paybill not yet live — details are confirmed on WhatsApp
    tillNumber: "",
    paybill: "",
    accountName: "FreshDream Mattress Care",
  },
  disclaimer:
    "Results depend on stain age, depth, fabric and mattress condition. Some older or deeper stains may improve but not disappear completely.",
};

export const defaultWhatsAppMessage = `Hello FreshDream, I have a quick inquiry about mattress / upholstery care. (To send a full booking request, I will use the booking form on the website — it opens WhatsApp with all my details prefilled.)`;

export function whatsappLink(message: string = defaultWhatsAppMessage) {
  const text = encodeURIComponent(message).slice(0, 1800);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

// Normalize a Kenyan phone/WhatsApp number for use in a wa.me link.
// Returns null if the input cannot be normalized to a plausible KE number.
export function normalizeKenyaPhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  // Strip spaces, plus signs, hyphens, brackets, dots
  let n = String(raw).replace(/[\s+\-().]/g, "");
  if (!n) return null;
  if (!/^\d+$/.test(n)) return null;
  if (n.startsWith("00")) n = n.slice(2);
  if (n.startsWith("0")) n = "254" + n.slice(1);
  else if (/^[71]\d{8}$/.test(n)) n = "254" + n;
  if (!n.startsWith("254")) return null;
  // Kenyan mobile/landline after 254 is 9 digits
  if (n.length !== 12) return null;
  return n;
}

// Build a wa.me link to the customer's number. Returns null if no usable number.
export function customerWhatsAppLink(
  phoneOrWhatsapp: string | null | undefined,
  message: string,
): string | null {
  const num = normalizeKenyaPhone(phoneOrWhatsapp);
  if (!num) return null;
  const text = encodeURIComponent(message).slice(0, 1800);
  return `https://wa.me/${num}?text=${text}`;
}
