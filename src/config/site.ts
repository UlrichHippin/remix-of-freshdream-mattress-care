// Central site config — update business contact details here.

export const site = {
  name: "FreshDream Mattress Care",
  shortName: "FreshDream",
  tagline: "Mattress Cleaning Nairobi for Airbnb Hosts, Homes & Serviced Apartments",
  base: "Roysambu, Nairobi",
  // Use international format without leading + for wa.me
  whatsappNumber: "254700000000",
  phoneDisplay: "+254 700 000 000",
  email: "hello@freshdream.co.ke",
  serviceAreas: [
    "Roysambu", "Kasarani", "Thome", "Mirema", "Garden Estate",
    "Zimmerman", "Kahawa West", "Kahawa Sukari", "TRM Drive",
    "Ridgeways", "Ruaraka", "Parklands", "Westlands",
    "Kilimani", "Kileleshwa", "Lavington", "Karen", "Runda",
    "South B", "South C", "CBD", "Upper Hill", "Ngong Road",
    "Kiambu Road", "Thika Road", "Gigiri",
  ],
  paymentMethods: ["M-PESA", "Cash"],
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
