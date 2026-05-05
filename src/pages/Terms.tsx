import LegalPage from "@/components/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service | FreshDream Mattress Care"
      description="Terms governing the use of FreshDream Mattress Care services in Nairobi."
      heading="Terms of Service"
    >
      <p>By booking a service with FreshDream Mattress Care, you agree to the following terms.</p>
      <h2>Quotes &amp; bookings</h2>
      <ul>
        <li>Quotes are based on the information and photos you provide. Final pricing may be adjusted on-site if conditions differ from what was described.</li>
        <li>A booking is confirmed when we send you a confirmation message.</li>
      </ul>
      <h2>Payment</h2>
      <ul>
        <li>We accept M-PESA and cash on completion of the job.</li>
      </ul>
      <h2>Access</h2>
      <p>You agree to provide safe and reasonable access to the property at the agreed time.</p>
      <h2>Liability</h2>
      <p>We take care to protect your property. We are not liable for pre-existing damage or wear, or for outcomes that depend on the age, condition or material of the item being cleaned.</p>
    </LegalPage>
  );
}
