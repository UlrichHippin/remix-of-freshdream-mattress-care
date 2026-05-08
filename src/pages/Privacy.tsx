import LegalPage from "@/components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy | FreshDream Mattress Care"
      description="How FreshDream Mattress Care collects, uses and protects your personal information."
      heading="Privacy Policy"
    >
      <p>We respect your privacy. This page explains what personal information we collect when you contact us or book a service, and how we use it.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Name and phone number you share via WhatsApp or our booking form.</li>
        <li>Service address or area in Nairobi.</li>
        <li>Photos you send to help us quote your job.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and confirm your booking.</li>
        <li>To plan our route and arrive on time.</li>
        <li>To share service photos on request where suitable, plus service summaries with you.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your data. We only share information with our cleaning crew assigned to your job.</p>
      <h2>Contact</h2>
      <p>For privacy questions, contact us via WhatsApp or email shown in the footer.</p>
    </LegalPage>
  );
}
