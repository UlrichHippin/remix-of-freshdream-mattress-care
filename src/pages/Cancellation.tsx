import LegalPage from "@/components/LegalPage";

export default function Cancellation() {
  return (
    <LegalPage
      title="Cancellation Policy | FreshDream Mattress Care"
      description="How to cancel or reschedule a cleaning booking with FreshDream Mattress Care."
      heading="Cancellation Policy"
    >
      <p>We understand that plans change. Please let us know as early as possible if you need to cancel or reschedule.</p>
      <h2>Cancellation</h2>
      <ul>
        <li>Free cancellation if you notify us at least 12 hours before the agreed time.</li>
        <li>Cancellations made less than 3 hours before arrival, or call-outs where our team arrives but cannot access the property, may incur a small call-out fee.</li>
      </ul>
      <h2>Rescheduling</h2>
      <p>You can reschedule any booking via WhatsApp at no extra cost, subject to availability.</p>
      <h2>Refunds</h2>
      <p>If you are not satisfied with the service, contact us within 24 hours and we will work with you to make it right.</p>
    </LegalPage>
  );
}
