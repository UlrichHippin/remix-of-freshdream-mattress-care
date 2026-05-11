import LegalPage from "@/components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy | FreshDream Mattress Care"
      description="How FreshDream Mattress Care collects, uses and protects your personal information."
      heading="Privacy Policy"
    >
      <p>We respect your privacy. This page explains what personal information we receive when you contact us or send a booking request, and how we use it.</p>
      <h2>How booking works on this website</h2>
      <p>This website does not store booking data in a database. When you submit the booking form, your details are placed into a prefilled WhatsApp message and opened through WhatsApp. FreshDream only receives the message after you send it in WhatsApp.</p>
      <h2>Information we receive</h2>
      <ul>
        <li>Name and phone / WhatsApp number you share when messaging us.</li>
        <li>Service address or area in Nairobi.</li>
        <li>Photos you choose to send on WhatsApp to help us quote your job.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your message, quote your job and arrange the service.</li>
        <li>To plan our route and arrive on time.</li>
        <li>To share service summaries with you.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your data. We only share information with our cleaning crew assigned to your job.</p>
      <h2>Contact</h2>
      <p>For privacy questions, contact us via WhatsApp or email shown in the footer.</p>
    </LegalPage>
  );
}
