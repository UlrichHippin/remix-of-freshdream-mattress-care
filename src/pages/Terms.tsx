import LegalPage from "@/components/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service | FreshDream Mattress Care"
      description="Terms governing the use of FreshDream Mattress Care services in Nairobi."
      heading="Terms of Service"
    >
      <p>By sending a booking request to FreshDream Mattress Care, you agree to the following terms.</p>
      <h2>How bookings work</h2>
      <ul>
        <li>The booking form on this website does not store data. On submit it opens WhatsApp with your details prefilled — you choose to send the message.</li>
        <li>Your booking is confirmed only after FreshDream replies on WhatsApp with availability, final price, location fee and payment details.</li>
        <li>Quotes are based on the information and photos you share. Final pricing may be adjusted on-site if conditions differ from what was described.</li>
      </ul>
      <h2>Payment</h2>
      <ul>
        <li>We accept M-PESA and cash. Do not send payment before your booking is confirmed on WhatsApp.</li>
      </ul>
      <h2>Access</h2>
      <p>You agree to provide safe and reasonable access to the property at the agreed time.</p>
      <h2>Liability</h2>
      <p>We take care to protect your property. We are not liable for pre-existing damage or wear, or for outcomes that depend on the age, condition or material of the item being cleaned.</p>
    </LegalPage>
  );
}
