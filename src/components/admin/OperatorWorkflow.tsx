import { MessageCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { whatsappLink, site } from "@/config/site";

const NBO = "Africa/Nairobi";
const _date = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, day: "2-digit", month: "2-digit", year: "numeric" });
const _time = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, hour: "2-digit", minute: "2-digit", hour12: false });
const fmtDate = (iso: string) => _date.format(new Date(iso)).replace(/\//g, ".");
const fmtTime = (iso: string) => _time.format(new Date(iso));

export interface WorkflowBooking {
  id: string;
  booking_reference: string | null;
  name: string;
  area: string;
  service: string;
  starts_at: string;
  ends_at: string;
  status: "requested" | "confirmed" | "declined" | "completed" | "cancelled";
  payment_status: "unpaid" | "deposit_paid" | "paid" | "cancelled";
  payment_method: string | null;
  mpesa_receipt_code: string | null;
  amount_paid_kes: number | null;
  payment_receiver: string | null;
  assigned_worker: string | null;
  job_started_at: string | null;
  job_completed_at: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  internal_notes: string | null;
  final_price_kes: number | null;
  estimated_price_kes: number | null;
}

export type WorkflowStage =
  | "ready_to_confirm"
  | "waiting_for_payment"
  | "ready_for_service"
  | "missing_proof"
  | "completed"
  | "cancelled"
  | "declined";

export function getWorkflowStage(b: WorkflowBooking): WorkflowStage {
  if (b.status === "cancelled") return "cancelled";
  if (b.status === "declined") return "declined";
  if (b.status === "requested") return "ready_to_confirm";
  if (b.status === "confirmed") {
    if (b.payment_status === "unpaid" || b.payment_status === "deposit_paid") return "waiting_for_payment";
    return "ready_for_service";
  }
  if (b.status === "completed") {
    if (!b.before_photo_url || !b.after_photo_url || !b.job_completed_at) return "missing_proof";
    return "completed";
  }
  return "completed";
}

const stageStyles: Record<WorkflowStage, { label: string; cls: string }> = {
  ready_to_confirm: { label: "Ready to confirm", cls: "bg-primary text-primary-foreground" },
  waiting_for_payment: { label: "Waiting for payment", cls: "bg-destructive/10 text-destructive" },
  ready_for_service: { label: "Ready for service", cls: "bg-accent-soft text-accent" },
  missing_proof: { label: "Missing completion proof", cls: "bg-destructive/10 text-destructive" },
  completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelled", cls: "bg-muted text-muted-foreground" },
  declined: { label: "Declined", cls: "bg-muted text-muted-foreground" },
};

export function WorkflowStageBadge({ b }: { b: WorkflowBooking }) {
  const s = stageStyles[getWorkflowStage(b)];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${s.cls}`}>
      {s.label}
    </span>
  );
}

function ref(b: WorkflowBooking) {
  return b.booking_reference ?? `#${b.id.slice(0, 8)}`;
}

function priceLine(b: WorkflowBooking) {
  const p = b.final_price_kes ?? b.estimated_price_kes;
  return p ? `Total: KES ${p.toLocaleString()}.` : "Total price will be confirmed before service.";
}

function buildConfirmMsg(b: WorkflowBooking) {
  return [
    `Hello ${b.name}, this is FreshDream Mattress Care.`,
    `We're confirming your booking ${ref(b)}.`,
    `Date: ${fmtDate(b.starts_at)}`,
    `Time: ${fmtTime(b.starts_at)}–${fmtTime(b.ends_at)} (Nairobi time)`,
    `Service: ${b.service}`,
    `Location: ${b.area} (a small location fee may apply for distant areas).`,
    priceLine(b),
    `Payment instructions will be shared after confirmation.`,
    `Please use only the official FreshDream payment details provided together with your booking reference. Thank you!`,
  ].join("\n");
}

function buildPaymentInstructionsMsg(b: WorkflowBooking) {
  const amount = b.final_price_kes ?? b.estimated_price_kes;
  const lines = [
    `Hello ${b.name}, regarding your FreshDream booking ${ref(b)}.`,
    amount ? `Amount due: KES ${amount.toLocaleString()}.` : `The amount due will be shared with you shortly.`,
    `Payment is handled manually. ${site.paymentMethods.join(" or ")} accepted.`,
    `Please use ONLY the official FreshDream payment details we provide together with your booking reference ${ref(b)}.`,
    `After paying, kindly send the M-PESA confirmation message so we can record the receipt code. Thank you!`,
  ];
  return lines.join("\n");
}

function buildPaymentReceivedMsg(b: WorkflowBooking) {
  return [
    `Hello ${b.name}, we've received your payment for booking ${ref(b)}. Thank you!`,
    b.amount_paid_kes ? `Amount received: KES ${b.amount_paid_kes.toLocaleString()}.` : null,
    b.mpesa_receipt_code ? `M-PESA receipt: ${b.mpesa_receipt_code}.` : null,
    `Appointment: ${fmtDate(b.starts_at)} at ${fmtTime(b.starts_at)} (Nairobi time).`,
    `We'll see you then. Reply on this number if anything changes.`,
  ].filter(Boolean).join("\n");
}

function buildCompletionMsg(b: WorkflowBooking) {
  return [
    `Hello ${b.name}, your FreshDream service (${b.service}) for booking ${ref(b)} is complete. Thank you for choosing us!`,
    `We'd love your honest feedback or a short review — it really helps our small team.`,
    `For your next mattress cleaning, sofa care or Airbnb turnover, just message us on this number with your booking reference and preferred date.`,
    `— FreshDream Mattress Care`,
  ].join("\n");
}

function WaButton({ msg, label }: { msg: string; label: string }) {
  return (
    <a
      href={whatsappLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-8 items-center gap-1 rounded-md bg-whatsapp px-2.5 text-[11px] font-semibold text-whatsapp-foreground hover:bg-whatsapp-hover"
    >
      <MessageCircle className="h-3 w-3" /> {label}
    </a>
  );
}

export function QuickWhatsAppActions({ b }: { b: WorkflowBooking }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <WaButton msg={buildConfirmMsg(b)} label="Confirm availability" />
      <WaButton msg={buildPaymentInstructionsMsg(b)} label="Payment instructions" />
      <WaButton msg={buildPaymentReceivedMsg(b)} label="Payment received" />
      <WaButton msg={buildCompletionMsg(b)} label="Job completed" />
    </div>
  );
}

interface ChecklistItem { label: string; ok: boolean; required: boolean; }

export function CompletionChecklist({ b }: { b: WorkflowBooking }) {
  const items: ChecklistItem[] = [
    { label: "Payment status updated", ok: b.payment_status !== "unpaid", required: true },
    {
      label: "M-PESA receipt code entered",
      ok: b.payment_method !== "M-PESA" || !!b.mpesa_receipt_code,
      required: b.payment_method === "M-PESA" && (b.payment_status === "deposit_paid" || b.payment_status === "paid"),
    },
    {
      label: "Payment receiver entered",
      ok: !!b.payment_receiver,
      required: b.payment_status === "deposit_paid" || b.payment_status === "paid",
    },
    { label: "Assigned worker entered", ok: !!b.assigned_worker, required: true },
    { label: "Job started time entered", ok: !!b.job_started_at, required: b.status === "completed" },
    { label: "Job completed time entered", ok: !!b.job_completed_at, required: b.status === "completed" },
    { label: "Before photo URL added", ok: !!b.before_photo_url, required: false },
    { label: "After photo URL added", ok: !!b.after_photo_url, required: false },
    { label: "Internal notes added (if needed)", ok: !!b.internal_notes, required: false },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <h4 className="text-xs font-bold uppercase tracking-wide text-primary">Operator completion checklist</h4>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2 text-[11px]">
            {it.ok ? (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            ) : it.required ? (
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive" />
            ) : (
              <span className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-border" />
            )}
            <span className={it.ok ? "text-foreground" : it.required ? "text-destructive font-semibold" : "text-muted-foreground"}>
              {it.label}
              {!it.ok && it.required && (
                <span className="ml-1 rounded bg-destructive/10 px-1 py-0.5 text-[9px] font-bold uppercase">Missing</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
