// Central site config — update business contact details here.

export const site = {
  name: "FreshDream Mattress Care",
  shortName: "FreshDream",
  tagline: "Mattress & Upholstery Cleaning for Airbnb Hosts in Nairobi",
  base: "Roysambu, Nairobi",
  // Use international format without leading + for wa.me
  whatsappNumber: "254700000000",
  phoneDisplay: "+254 700 000 000",
  email: "hello@freshdream.co.ke",
  serviceAreas: [
    "Roysambu", "Kasarani", "Thome", "Mirema", "Garden Estate",
    "Zimmerman", "Kahawa West", "Kahawa Sukari", "TRM Drive",
    "Ridgeways", "Ruaraka", "Parklands", "Westlands",
  ],
  disclaimer:
    "Results may vary depending on stain age, depth, mattress material, and room drying conditions.",
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
