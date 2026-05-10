import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, AlertTriangle, ImageOff, Wallet, ClipboardCheck } from "lucide-react";
import { customerWhatsAppLink } from "@/config/site";

const NBO = "Africa/Nairobi";
const _date = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, day: "2-digit", month: "2-digit", year: "numeric" });
const _dateTime = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
const _time = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, hour: "2-digit", minute: "2-digit", hour12: false });
const fmtDate = (iso: string) => _date.format(new Date(iso)).replace(/\//g, ".");
const fmtTime = (iso: string) => _time.format(new Date(iso));
const fmtDateTime = (iso: string) => {
  const parts = _dateTime.formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}.${get("month")}.${get("year")}, ${get("hour")}:${get("minute")} Nairobi time`;
};

// Returns YYYY-MM-DD of given date in Nairobi
function nairobiDateKey(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: NBO, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

type Range = "today" | "tomorrow" | "week" | "custom";

interface Booking {
  id: string;
  booking_reference: string | null;
  name: string; phone: string; whatsapp: string | null;
  area: string; service: string;
  starts_at: string; ends_at: string;
  status: "requested" | "confirmed" | "declined" | "completed" | "cancelled";
  payment_status: "unpaid" | "deposit_paid" | "paid" | "cancelled";
  payment_method: string | null;
  mpesa_receipt_code: string | null;
  amount_paid_kes: number | null;
  payment_receiver: string | null;
  assigned_worker: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  job_completed_at: string | null;
  created_at: string;
}

interface Props {
  bookings: Booking[];
  isOwner: boolean;
  onManage?: (id: string) => void;
}

export default function DailyControlDashboard({ bookings, isOwner, onManage }: Props) {
  const [range, setRange] = useState<Range>("today");
  const [customDate, setCustomDate] = useState<string>(() => nairobiDateKey(new Date()));

  const { keysInRange, label } = useMemo(() => {
    const now = new Date();
    const today = nairobiDateKey(now);
    if (range === "today") return { keysInRange: new Set([today]), label: `Today · ${today.split("-").reverse().join(".")}` };
    if (range === "tomorrow") {
      const t = new Date(now.getTime() + 24 * 3600 * 1000);
      const k = nairobiDateKey(t);
      return { keysInRange: new Set([k]), label: `Tomorrow · ${k.split("-").reverse().join(".")}` };
    }
    if (range === "week") {
      const set = new Set<string>();
      for (let i = 0; i < 7; i++) set.add(nairobiDateKey(new Date(now.getTime() + i * 24 * 3600 * 1000)));
      return { keysInRange: set, label: "Next 7 days" };
    }
    return { keysInRange: new Set([customDate]), label: `Custom · ${customDate.split("-").reverse().join(".")}` };
  }, [range, customDate]);

  const inRange = useMemo(
    () => bookings.filter((b) => keysInRange.has(nairobiDateKey(new Date(b.starts_at)))),
    [bookings, keysInRange],
  );

  // Counters
  const requestsToday = inRange.filter((b) => b.status === "requested").length;
  const confirmedToday = inRange.filter((b) => b.status === "confirmed").length;
  const completedToday = inRange.filter((b) => b.status === "completed").length;
  const paidToday = inRange.filter((b) => b.payment_status === "paid").length;
  const unpaidPending = inRange.filter((b) => b.payment_status === "unpaid" || b.payment_status === "deposit_paid").length;
  const missingMpesa = inRange.filter(
    (b) => b.payment_method === "M-PESA" && (b.payment_status === "deposit_paid" || b.payment_status === "paid") && !b.mpesa_receipt_code,
  ).length;
  const completedUnpaid = inRange.filter((b) => b.status === "completed" && (b.payment_status === "unpaid" || b.payment_status === "deposit_paid")).length;
  const paidNotCompleted = inRange.filter((b) => b.payment_status === "paid" && b.status !== "completed").length;
  const missingProof = inRange.filter((b) => b.status === "completed" && (!b.before_photo_url || !b.after_photo_url)).length;

  // Warning lists (across all bookings, not just today, so issues don't get lost)
  const paymentProblems = bookings.filter((b) => {
    const completedUnpaid = b.status === "completed" && (b.payment_status === "unpaid" || b.payment_status === "deposit_paid");
    const paidNotComplete = b.payment_status === "paid" && b.status !== "completed" && b.status !== "cancelled";
    const mpesaNoReceipt = b.payment_method === "M-PESA" && (b.payment_status === "deposit_paid" || b.payment_status === "paid") && !b.mpesa_receipt_code;
    const paidNoAmount = b.payment_status === "paid" && (b.amount_paid_kes == null || b.amount_paid_kes <= 0);
    const noReceiver = (b.payment_status === "deposit_paid" || b.payment_status === "paid") && !b.payment_receiver;
    return completedUnpaid || paidNotComplete || mpesaNoReceipt || paidNoAmount || noReceiver;
  });

  const proofProblems = bookings.filter(
    (b) => b.status === "completed" && (!b.before_photo_url || !b.after_photo_url || !b.job_completed_at),
  );

  const todaysConfirmed = inRange
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());

  const recentRequests = bookings
    .filter((b) => b.status === "requested")
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  function problemLabel(b: Booking): string {
    const labels: string[] = [];
    if (b.status === "completed" && (b.payment_status === "unpaid" || b.payment_status === "deposit_paid")) labels.push("Completed but unpaid");
    if (b.payment_status === "paid" && b.status !== "completed" && b.status !== "cancelled") labels.push("Paid but not completed");
    if (b.payment_method === "M-PESA" && (b.payment_status === "deposit_paid" || b.payment_status === "paid") && !b.mpesa_receipt_code) labels.push("Missing M-PESA receipt");
    if (b.payment_status === "paid" && (b.amount_paid_kes == null || b.amount_paid_kes <= 0)) labels.push("Paid amount missing");
    if ((b.payment_status === "deposit_paid" || b.payment_status === "paid") && !b.payment_receiver) labels.push("Payment receiver missing");
    return labels.join(" · ") || "Issue";
  }
  function proofProblemLabel(b: Booking): string {
    const labels: string[] = [];
    if (!b.before_photo_url) labels.push("Missing before photo");
    if (!b.after_photo_url) labels.push("Missing after photo");
    if (!b.job_completed_at) labels.push("Missing completion time");
    return labels.join(" · ") || "Proof issue";
  }

  function scrollToBooking(id: string) {
    if (onManage) { onManage(id); return; }
    const el = document.getElementById(`booking-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-primary");
      setTimeout(() => el.classList.remove("ring-2", "ring-primary"), 2000);
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary">Daily Control Dashboard</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            All times shown as <strong>DD.MM.YYYY, HH:mm Nairobi time</strong>. Range: <strong>{label}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {(["today", "tomorrow", "week", "custom"] as Range[]).map((k) => (
            <button
              key={k}
              onClick={() => setRange(k)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${range === k ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {k === "today" ? "Today" : k === "tomorrow" ? "Tomorrow" : k === "week" ? "This week" : "Custom"}
            </button>
          ))}
          {range === "custom" && (
            <Input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} className="h-8 w-auto text-xs" />
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        <Stat label="Requests" value={requestsToday} tone="primary" />
        <Stat label="Confirmed" value={confirmedToday} tone="accent" />
        <Stat label="Completed" value={completedToday} tone="muted" />
        <Stat label="Paid" value={paidToday} tone="emerald" />
        <Stat label="Unpaid / deposit pending" value={unpaidPending} tone="warn" />
        <Stat label="Missing M-PESA receipt" value={missingMpesa} tone="warn" />
        <Stat label="Completed but unpaid" value={completedUnpaid} tone="warn" />
        <Stat label="Paid but not completed" value={paidNotCompleted} tone="warn" />
        <Stat label="Missing completion proof" value={missingProof} tone="warn" />
      </div>

      {/* Operational notes */}
      <div className="mt-5 grid gap-2 text-xs">
        <p className="rounded-xl border border-accent/40 bg-accent-soft/40 p-3 text-primary">
          <ClipboardCheck className="mr-1 inline h-3.5 w-3.5" /> Every official job must have a FreshDream booking reference, payment status and completion update.
        </p>
        <p className="rounded-xl border border-border bg-surface p-3 text-muted-foreground">
          <Wallet className="mr-1 inline h-3.5 w-3.5" /> Manual payment: record the M-PESA receipt code, amount paid and payment receiver after checking payment.
        </p>
        <p className="rounded-xl border border-border bg-surface p-3 text-muted-foreground">
          <ImageOff className="mr-1 inline h-3.5 w-3.5" /> Completed jobs should include before/after photo links where available.
        </p>
      </div>

      {/* Warning lists */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <WarningList
          icon={<Wallet className="h-4 w-4" />}
          title="Payment problems"
          items={paymentProblems}
          getLabel={problemLabel}
          onOpen={scrollToBooking}
        />
        <WarningList
          icon={<ImageOff className="h-4 w-4" />}
          title="Completion proof problems"
          items={proofProblems}
          getLabel={proofProblemLabel}
          onOpen={scrollToBooking}
        />
      </div>

      {/* Today's confirmed work */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-primary">Confirmed work · {label}</h3>
        {todaysConfirmed.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">No confirmed jobs in this range.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
            {todaysConfirmed.map((b) => (
              <li key={b.id} className="flex flex-wrap items-start justify-between gap-3 p-3 text-xs">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-primary">{b.booking_reference ?? `#${b.id.slice(0, 8)}`}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold uppercase tracking-wide text-[10px]">{b.status}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold uppercase tracking-wide text-[10px]">{b.payment_status.replace("_", " ")}</span>
                  </div>
                  <div className="mt-1 font-semibold text-primary">{b.name} · {b.phone}</div>
                  <div className="text-muted-foreground">
                    {fmtDate(b.starts_at)} · {fmtTime(b.starts_at)}–{fmtTime(b.ends_at)} · {b.service} · {b.area}
                    {b.assigned_worker ? ` · 👷 ${b.assigned_worker}` : " · 👷 unassigned"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const href = customerWhatsAppLink(
                      b.whatsapp || b.phone,
                      `Hi ${b.name}, regarding your FreshDream booking ${b.booking_reference ?? ""} on ${fmtDate(b.starts_at)} at ${fmtTime(b.starts_at)}…`,
                    );
                    return href ? (
                      <a
                        target="_blank" rel="noopener noreferrer"
                        href={href}
                        className="inline-flex h-8 items-center gap-1 rounded-md bg-whatsapp px-2.5 text-[11px] font-semibold text-whatsapp-foreground hover:bg-whatsapp-hover"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                    ) : (
                      <span title="No customer WhatsApp/phone number on this booking." className="inline-flex h-8 cursor-not-allowed items-center gap-1 rounded-md bg-muted px-2.5 text-[11px] font-semibold text-muted-foreground">
                        <MessageCircle className="h-3 w-3" /> WhatsApp (no number)
                      </span>
                    );
                  })()}
                  <Button size="sm" variant="ghost" onClick={() => scrollToBooking(b.id)}>Manage</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent requests */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-primary">Recent requests awaiting confirmation</h3>
        {recentRequests.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">No pending requests.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
            {recentRequests.map((b) => (
              <li key={b.id} className="flex flex-wrap items-start justify-between gap-3 p-3 text-xs">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-primary">{b.booking_reference ?? `#${b.id.slice(0, 8)}`}</span>
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 font-semibold uppercase tracking-wide text-[10px] text-primary">requested</span>
                  </div>
                  <div className="mt-1 font-semibold text-primary">{b.name} · {b.phone}</div>
                  <div className="text-muted-foreground">
                    {fmtDate(b.starts_at)} · {fmtTime(b.starts_at)}–{fmtTime(b.ends_at)} · {b.service} · {b.area}
                  </div>
                  <div className="text-[11px] text-muted-foreground">Submitted {fmtDateTime(b.created_at)}</div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => scrollToBooking(b.id)}>Manage</Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isOwner && (
        <p className="mt-5 rounded-xl border border-border bg-surface p-3 text-[11px] text-muted-foreground">
          Operator view: you can update payment, worker assignment and completion fields. Only the owner can cancel bookings or change roles.
        </p>
      )}
    </Card>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "primary" | "accent" | "muted" | "emerald" | "warn" }) {
  const tones: Record<string, string> = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent",
    muted: "bg-muted text-foreground",
    emerald: "bg-emerald-100 text-emerald-700",
    warn: value > 0 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
  };
  return (
    <div className={`rounded-xl p-3 ${tones[tone]}`}>
      <div className="text-2xl font-extrabold leading-tight">{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">{label}</div>
    </div>
  );
}

function WarningList({
  icon, title, items, getLabel, onOpen,
}: {
  icon: React.ReactNode;
  title: string;
  items: Booking[];
  getLabel: (b: Booking) => string;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="text-destructive">{icon}</span>
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">No issues — all clean.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.slice(0, 10).map((b) => (
            <li key={b.id} className="flex flex-wrap items-start justify-between gap-2 rounded-lg bg-surface p-2 text-xs">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-primary">{b.booking_reference ?? `#${b.id.slice(0, 8)}`}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                    <AlertTriangle className="h-3 w-3" /> {getLabel(b)}
                  </span>
                </div>
                <div className="mt-0.5 font-semibold text-primary">{b.name} · {b.area}</div>
                <div className="text-muted-foreground">{fmtDateTime(b.starts_at)}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => onOpen(b.id)}>Manage</Button>
            </li>
          ))}
          {items.length > 10 && (
            <li className="text-[11px] text-muted-foreground">+ {items.length - 10} more — handle the list above first.</li>
          )}
        </ul>
      )}
    </div>
  );
}
