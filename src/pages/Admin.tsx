import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, LogOut, MessageCircle, Trash2, CalendarPlus } from "lucide-react";
import { whatsappLink } from "@/config/site";

type BookingStatus = "requested" | "confirmed" | "declined" | "completed" | "cancelled";
type PaymentStatus = "unpaid" | "deposit_paid" | "paid" | "cancelled";

interface Booking {
  id: string;
  booking_reference: string | null;
  name: string; phone: string; whatsapp: string | null; email: string | null;
  area: string; property_type: string | null; service: string;
  details: string | null; starts_at: string; ends_at: string; status: BookingStatus;
  estimated_price_kes: number | null; final_price_kes: number | null;
  payment_method: string | null;
  payment_status: PaymentStatus;
  mpesa_receipt_code: string | null;
  amount_paid_kes: number | null;
  payment_received_at: string | null;
  payment_receiver: string | null;
  payment_notes: string | null;
  assigned_worker: string | null;
  job_started_at: string | null;
  job_completed_at: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  customer_confirmation_note: string | null;
  internal_notes: string | null;
  created_at: string;
}
interface Block { id: string; starts_at: string; ends_at: string; reason: string | null; }
interface AuditEntry { id: string; user_id: string | null; action: string; booking_id: string | null; field: string | null; old_value: string | null; new_value: string | null; created_at: string; }

// Nairobi timezone helpers — admin views always show Africa/Nairobi time, regardless of browser TZ
const NBO = "Africa/Nairobi";
const _date = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, day: "2-digit", month: "2-digit", year: "numeric" });
const _dateTime = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
const _time = new Intl.DateTimeFormat("en-GB", { timeZone: NBO, hour: "2-digit", minute: "2-digit", hour12: false });
const fmtDate = (iso: string) => _date.format(new Date(iso)).replace(/\//g, ".");
const fmtDateTime = (iso: string) => {
  const parts = _dateTime.formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}.${get("month")}.${get("year")}, ${get("hour")}:${get("minute")} Nairobi time`;
};
const fmtTime = (iso: string) => _time.format(new Date(iso));

type BookingFilter = "all" | BookingStatus | "unpaid" | "deposit_paid" | "paid" | "payment_cancelled";

export default function Admin() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingFilter>("requested");
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login", { replace: true }); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const admin = (roles || []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setChecking(false);
    })();
  }, [navigate]);

  async function load() {
    setLoading(true);
    const [b1, b2, b3] = await Promise.all([
      supabase.from("bookings").select("*").order("starts_at", { ascending: true }),
      supabase.from("blocked_periods").select("*").order("starts_at", { ascending: true }),
      supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(50),
    ]);
    if (b1.data) setBookings(b1.data as unknown as Booking[]);
    if (b2.data) setBlocks(b2.data as Block[]);
    if (b3.data) setAudit(b3.data as AuditEntry[]);
    setLoading(false);
  }
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  async function patchBooking(id: string, patch: Partial<Booking>) {
    const { error } = await supabase.from("bookings").update(patch as never).eq("id", id);
    if (error) { toast.error(error.message); return false; }
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, ...patch } as Booking : b));
    return true;
  }

  async function setStatus(id: string, status: BookingStatus) {
    if (await patchBooking(id, { status })) { toast.success("Status updated"); load(); }
  }
  async function setPaymentStatus(id: string, payment_status: PaymentStatus) {
    if (await patchBooking(id, { payment_status })) { toast.success("Payment status updated"); load(); }
  }

  async function removeBlock(id: string) {
    const { error } = await supabase.from("blocked_periods").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function addBlock() {
    if (!blockStart || !blockEnd) return toast.error("Pick start and end");
    const { error } = await supabase.from("blocked_periods").insert({
      starts_at: new Date(blockStart).toISOString(),
      ends_at: new Date(blockEnd).toISOString(),
      reason: blockReason || null,
    });
    if (error) return toast.error(error.message);
    setBlockStart(""); setBlockEnd(""); setBlockReason("");
    toast.success("Block added");
    load();
  }
  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (filter === "all") return true;
      if (filter === "unpaid" || filter === "deposit_paid" || filter === "paid") return b.payment_status === filter;
      if (filter === "payment_cancelled") return b.payment_status === "cancelled";
      return b.status === filter;
    });
  }, [bookings, filter]);

  if (checking) return <div className="grid min-h-screen place-items-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">No admin access</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Your account is signed in but does not have admin role. Ask the site owner to grant access.
          </p>
          <Button variant="outline" className="mt-6" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
        </div>
      </div>
    );
  }

  const filterChips: { key: BookingFilter; label: string }[] = [
    { key: "requested", label: "Requested" },
    { key: "confirmed", label: "Confirmed" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
    { key: "unpaid", label: "Unpaid" },
    { key: "deposit_paid", label: "Deposit paid" },
    { key: "paid", label: "Paid" },
    { key: "payment_cancelled", label: "Payment cancelled" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container-tight flex h-16 items-center justify-between">
          <h1 className="text-lg font-bold text-primary">Admin · FreshDream</h1>
          <Button variant="outline" size="sm" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
        </div>
      </header>

      <main className="container-tight space-y-8 py-8">
        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-primary">Bookings</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Each booking is a <strong>request</strong> until you confirm it. Reply on WhatsApp to confirm slot, price and payment details.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filterChips.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setFilter(c.key)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filter === c.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? <Loader2 className="mt-4 h-5 w-5 animate-spin" /> : (
            <div className="mt-5 space-y-4">
              {filtered.map((b) => (
                <BookingCard key={b.id} b={b} onPatch={patchBooking} onStatus={setStatus} onPayment={setPaymentStatus} />
              ))}
              {filtered.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No bookings match this filter.</p>}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-primary">Blocked periods</h2>
          <p className="text-sm text-muted-foreground">Mark days or specific hours as unavailable.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Note: the reason field may be visible to other admins. Use neutral labels like <em>Unavailable</em>.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
            <div><Label>Start</Label><Input type="datetime-local" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} className="mt-1.5" /></div>
            <div><Label>End</Label><Input type="datetime-local" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} className="mt-1.5" /></div>
            <div><Label>Reason (optional)</Label><Input value={blockReason} onChange={(e) => setBlockReason(e.target.value)} className="mt-1.5" /></div>
            <div className="flex items-end"><Button onClick={addBlock}><CalendarPlus className="mr-2 h-4 w-4" />Add block</Button></div>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {blocks.map((b) => (
              <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{fmtDateTime(b.starts_at)} → {fmtDateTime(b.ends_at)}</div>
                  {b.reason && <div className="text-muted-foreground">{b.reason}</div>}
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeBlock(b.id)}><Trash2 className="h-4 w-4" /></Button>
              </li>
            ))}
            {blocks.length === 0 && <p className="py-3 text-sm text-muted-foreground">No blocks.</p>}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-primary">Recent audit log</h2>
          <p className="text-xs text-muted-foreground">Latest 50 admin changes (status, price, payment, receiver, worker, completion).</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left uppercase text-muted-foreground">
                <tr><th className="py-2 pr-3">When</th><th className="py-2 pr-3">Field</th><th className="py-2 pr-3">From</th><th className="py-2 pr-3">To</th><th className="py-2 pr-3">Booking</th></tr>
              </thead>
              <tbody>
                {audit.map((a) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="py-2 pr-3 whitespace-nowrap">{fmtDateTime(a.created_at)}</td>
                    <td className="py-2 pr-3">{a.field}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{a.old_value ?? "—"}</td>
                    <td className="py-2 pr-3 font-medium">{a.new_value ?? "—"}</td>
                    <td className="py-2 pr-3 font-mono">{a.booking_id?.slice(0, 8)}</td>
                  </tr>
                ))}
                {audit.length === 0 && <tr><td colSpan={5} className="py-4 text-center text-muted-foreground">No entries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}

function BookingCard({
  b,
  onPatch,
  onStatus,
  onPayment,
}: {
  b: Booking;
  onPatch: (id: string, patch: Partial<Booking>) => Promise<boolean>;
  onStatus: (id: string, s: BookingStatus) => void;
  onPayment: (id: string, s: PaymentStatus) => void;
}) {
  const [open, setOpen] = useState(false);

  const statusChip = (s: BookingStatus) => {
    const map: Record<BookingStatus, string> = {
      requested: "bg-primary-soft text-primary",
      confirmed: "bg-accent-soft text-accent",
      completed: "bg-muted text-foreground",
      declined: "bg-muted text-muted-foreground",
      cancelled: "bg-muted text-muted-foreground",
    };
    return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${map[s]}`}>{s}</span>;
  };
  const paymentChip = (s: PaymentStatus) => {
    const map: Record<PaymentStatus, string> = {
      unpaid: "bg-destructive/10 text-destructive",
      deposit_paid: "bg-accent-soft text-accent",
      paid: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-muted text-muted-foreground",
    };
    return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${map[s]}`}>{s.replace("_", " ")}</span>;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-bold text-primary">{b.booking_reference ?? `#${b.id.slice(0, 8)}`}</span>
            {statusChip(b.status)}
            {paymentChip(b.payment_status)}
          </div>
          <div className="mt-1 text-sm font-semibold text-primary">{b.name} · {b.phone}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {fmtDate(b.starts_at)} · {fmtTime(b.starts_at)}–{fmtTime(b.ends_at)} · {b.service} · {b.area}{b.property_type ? ` · ${b.property_type}` : ""}
          </div>
          {b.details && <div className="mt-2 max-w-2xl whitespace-pre-line rounded-lg bg-surface p-2 text-xs text-muted-foreground">{b.details}</div>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {b.status === "requested" && (
            <>
              <Button size="sm" onClick={() => onStatus(b.id, "confirmed")}>Confirm</Button>
              <Button size="sm" variant="outline" onClick={() => onStatus(b.id, "declined")}>Decline</Button>
            </>
          )}
          {b.status === "confirmed" && (
            <Button size="sm" onClick={() => onStatus(b.id, "completed")}>Mark complete</Button>
          )}
          <a className="inline-flex h-9 items-center gap-1 rounded-md bg-whatsapp px-3 text-xs font-semibold text-whatsapp-foreground hover:bg-whatsapp-hover"
             target="_blank" rel="noopener noreferrer"
             href={whatsappLink(`Hi ${b.name}, regarding your FreshDream booking ${b.booking_reference ?? ""} on ${fmtDate(b.starts_at)} at ${fmtTime(b.starts_at)}…`)}>
            <MessageCircle className="h-3 w-3" /> WhatsApp
          </a>
          <Button size="sm" variant="ghost" onClick={() => setOpen((v) => !v)}>{open ? "Hide" : "Manage"}</Button>
        </div>
      </div>

      {open && (
        <div className="mt-4 grid gap-3 border-t border-border pt-4 md:grid-cols-2 lg:grid-cols-3">
          <Field label="Estimated price (KES)">
            <Input type="number" min={0} defaultValue={b.estimated_price_kes ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() === "" ? null : Number(e.target.value);
              if (v !== b.estimated_price_kes) onPatch(b.id, { estimated_price_kes: v });
            }} />
          </Field>
          <Field label="Final price (KES)">
            <Input type="number" min={0} defaultValue={b.final_price_kes ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() === "" ? null : Number(e.target.value);
              if (v !== b.final_price_kes) onPatch(b.id, { final_price_kes: v });
            }} />
          </Field>
          <Field label="Assigned worker">
            <Input defaultValue={b.assigned_worker ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.assigned_worker) onPatch(b.id, { assigned_worker: v });
            }} />
          </Field>

          <Field label="Payment method">
            <Select defaultValue={b.payment_method ?? ""} onValueChange={(v) => onPatch(b.id, { payment_method: v || null })}>
              <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="M-PESA">M-PESA</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Payment status">
            <Select value={b.payment_status} onValueChange={(v) => onPayment(b.id, v as PaymentStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="deposit_paid">Deposit paid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="M-PESA receipt code">
            <Input defaultValue={b.mpesa_receipt_code ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.mpesa_receipt_code) onPatch(b.id, { mpesa_receipt_code: v });
            }} />
          </Field>

          <Field label="Amount paid (KES)">
            <Input type="number" min={0} defaultValue={b.amount_paid_kes ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() === "" ? null : Number(e.target.value);
              if (v !== b.amount_paid_kes) onPatch(b.id, { amount_paid_kes: v });
            }} />
          </Field>
          <Field label="Payment receiver">
            <Input placeholder="Who received the money" defaultValue={b.payment_receiver ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.payment_receiver) onPatch(b.id, { payment_receiver: v });
            }} />
          </Field>
          <Field label="Payment received at">
            <Input type="datetime-local" defaultValue={b.payment_received_at ? toDtLocal(b.payment_received_at) : ""} onBlur={(e) => {
              const v = e.target.value ? new Date(e.target.value).toISOString() : null;
              if (v !== b.payment_received_at) onPatch(b.id, { payment_received_at: v });
            }} />
            {b.payment_received_at && <p className="mt-1 text-[11px] text-muted-foreground">{fmtDateTime(b.payment_received_at)}</p>}
          </Field>

          <Field label="Job started at">
            <Input type="datetime-local" defaultValue={b.job_started_at ? toDtLocal(b.job_started_at) : ""} onBlur={(e) => {
              const v = e.target.value ? new Date(e.target.value).toISOString() : null;
              if (v !== b.job_started_at) onPatch(b.id, { job_started_at: v });
            }} />
            {b.job_started_at && <p className="mt-1 text-[11px] text-muted-foreground">{fmtDateTime(b.job_started_at)}</p>}
          </Field>
          <Field label="Job completed at">
            <Input type="datetime-local" defaultValue={b.job_completed_at ? toDtLocal(b.job_completed_at) : ""} onBlur={(e) => {
              const v = e.target.value ? new Date(e.target.value).toISOString() : null;
              if (v !== b.job_completed_at) onPatch(b.id, { job_completed_at: v });
            }} />
            {b.job_completed_at && <p className="mt-1 text-[11px] text-muted-foreground">{fmtDateTime(b.job_completed_at)}</p>}
          </Field>
          <Field label="Customer confirmation note">
            <Input defaultValue={b.customer_confirmation_note ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.customer_confirmation_note) onPatch(b.id, { customer_confirmation_note: v });
            }} />
          </Field>

          <Field label="Before photo URL">
            <Input defaultValue={b.before_photo_url ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.before_photo_url) onPatch(b.id, { before_photo_url: v });
            }} />
            {b.before_photo_url && <a className="mt-1 inline-block text-[11px] text-primary underline" href={b.before_photo_url} target="_blank" rel="noopener noreferrer">Open</a>}
          </Field>
          <Field label="After photo URL">
            <Input defaultValue={b.after_photo_url ?? ""} onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.after_photo_url) onPatch(b.id, { after_photo_url: v });
            }} />
            {b.after_photo_url && <a className="mt-1 inline-block text-[11px] text-primary underline" href={b.after_photo_url} target="_blank" rel="noopener noreferrer">Open</a>}
          </Field>
          <div />

          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-xs">Payment notes</Label>
            <Textarea rows={2} defaultValue={b.payment_notes ?? ""} className="mt-1.5" onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.payment_notes) onPatch(b.id, { payment_notes: v });
            }} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-xs">Internal notes</Label>
            <Textarea rows={2} defaultValue={b.internal_notes ?? ""} className="mt-1.5" onBlur={(e) => {
              const v = e.target.value.trim() || null;
              if (v !== b.internal_notes) onPatch(b.id, { internal_notes: v });
            }} />
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex flex-wrap gap-2">
            {b.status !== "cancelled" && <Button size="sm" variant="outline" onClick={() => onStatus(b.id, "cancelled")}>Cancel booking</Button>}
            <span className="ml-auto text-[11px] text-muted-foreground">Created {fmtDateTime(b.created_at)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

// Nairobi is fixed UTC+3 (no DST). Treat datetime-local input as Nairobi wall time.
function toDtLocal(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

// Interpret a "YYYY-MM-DDTHH:mm" value entered by an admin as Nairobi (UTC+3) wall time.
function fromNairobiLocalToISO(value: string): string | null {
  if (!value) return null;
  // Append "+03:00" so the Date constructor anchors it to Nairobi time, not browser local.
  const d = new Date(`${value}:00+03:00`);
  return isNaN(d.getTime()) ? null : d.toISOString();
}
