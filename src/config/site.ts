// Central site config — update business contact details here.

export const site = {
  name: "FreshDream Mattress Care",
  shortName: "FreshDream",
  tagline: "Mattress Cleaning Nairobi for Airbnb Hosts, Homes & Serviced Apartments",
  base: "Roysambu, Nairobi",
  // Use international format without leading + for wa.me
  whatsappNumber: "254720286682",
  phoneDisplay: "+254 720 286 682",
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

export const defaultWhatsAppMessage = `Hello, I would like to request a mattress cleaning quote.
Location:
Mattress size:
Photos:
Next guest check-in time:
Issue type:`;

export function whatsappLink(message: string = defaultWhatsAppMessage) {
  const text = encodeURIComponent(message).slice(0, 1800);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
