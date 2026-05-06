import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, LogOut, MessageCircle, Trash2, CalendarPlus } from "lucide-react";
import { whatsappLink } from "@/config/site";

interface Booking {
  id: string;
  name: string; phone: string; whatsapp: string | null; email: string | null;
  area: string; property_type: string | null; service: string;
  details: string | null; starts_at: string; ends_at: string; status: string;
  estimated_price_kes: number | null; final_price_kes: number | null;
}
interface Block { id: string; starts_at: string; ends_at: string; reason: string | null; }

export default function Admin() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
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
    const [b1, b2] = await Promise.all([
      supabase.from("bookings").select("*").order("starts_at", { ascending: true }),
      supabase.from("blocked_periods").select("*").order("starts_at", { ascending: true }),
    ]);
    if (b1.data) setBookings(b1.data as Booking[]);
    if (b2.data) setBlocks(b2.data as Block[]);
    setLoading(false);
  }
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  async function setStatus(id: string, status: "requested" | "confirmed" | "declined" | "completed" | "cancelled") {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    load();
  }
  async function savePrice(id: string, field: "estimated_price_kes" | "final_price_kes", raw: string) {
    const value = raw.trim() === "" ? null : Number(raw);
    if (value !== null && (!Number.isFinite(value) || value < 0)) return toast.error("Invalid amount");
    const patch: Record<string, number | null> = field === "estimated_price_kes" ? { estimated_price_kes: value } : { final_price_kes: value };
    const { error } = await supabase.from("bookings").update(patch as never).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Price saved");
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, [field]: value } as Booking : b));
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

  const upcoming = useMemo(() => bookings.filter((b) => new Date(b.ends_at) >= new Date()), [bookings]);

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
          <h2 className="text-lg font-bold text-primary">Bookings</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Each booking is a <strong>request</strong> until confirmed via WhatsApp. Reply to the customer to confirm slot, price and payment details.
          </p>
          <div className="mt-3 rounded-lg border border-dashed border-border bg-surface p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-primary">Workflow</p>
            <ol className="mt-1 list-decimal pl-4">
              <li>Enter an <strong>estimated price</strong> after your first WhatsApp reply.</li>
              <li>Enter the <strong>final price</strong> and click <strong>Confirm</strong> when slot and price are agreed.</li>
              <li>The customer's confirmation page updates live with the final price and payment instructions.</li>
            </ol>
            <p className="mt-2 font-semibold text-primary">Planned enhancements</p>
            <ul className="mt-1 list-disc pl-4">
              <li>Payment method (M-PESA / Cash)</li>
              <li>M-PESA transaction code</li>
              <li>Payment status: unpaid / deposit paid / paid / cancelled</li>
            </ul>
          </div>
          {loading ? <Loader2 className="mt-4 h-5 w-5 animate-spin" /> : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase text-muted-foreground">
                  <tr><th className="py-2 pr-3">When</th><th className="py-2 pr-3">Client</th><th className="py-2 pr-3">Service</th><th className="py-2 pr-3">Area</th><th className="py-2 pr-3">Price (KES)</th><th className="py-2 pr-3">Status</th><th className="py-2 pr-3">Actions</th></tr>
                </thead>
                <tbody>
                  {upcoming.map((b) => (
                    <tr key={b.id} className="border-t border-border align-top">
                      <td className="py-3 pr-3 whitespace-nowrap">
                        <div className="font-medium">{format(new Date(b.starts_at), "EEE d MMM")}</div>
                        <div className="text-muted-foreground">{format(new Date(b.starts_at), "h:mm a")} – {format(new Date(b.ends_at), "h:mm a")}</div>
                      </td>
                      <td className="py-3 pr-3">
                        <div className="font-medium">{b.name}</div>
                        <div className="text-muted-foreground">{b.phone}</div>
                        {b.details && <div className="mt-1 max-w-xs text-xs text-muted-foreground">{b.details}</div>}
                      </td>
                      <td className="py-3 pr-3">{b.service}</td>
                      <td className="py-3 pr-3">{b.area}{b.property_type ? ` · ${b.property_type}` : ""}</td>
                      <td className="py-3 pr-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.status === "confirmed" ? "bg-accent-soft text-accent" : b.status === "declined" || b.status === "cancelled" ? "bg-muted text-muted-foreground" : "bg-primary-soft text-primary"}`}>{b.status}</span>
                      </td>
                      <td className="py-3 pr-3">
                        <div className="flex flex-wrap gap-2">
                          {b.status === "requested" && <>
                            <Button size="sm" onClick={() => setStatus(b.id, "confirmed")}>Confirm</Button>
                            <Button size="sm" variant="outline" onClick={() => setStatus(b.id, "declined")}>Decline</Button>
                          </>}
                          <Button size="sm" variant="outline" onClick={() => setStatus(b.id, "completed")}>Done</Button>
                          <a className="inline-flex h-9 items-center gap-1 rounded-md bg-whatsapp px-3 text-xs font-semibold text-whatsapp-foreground hover:bg-whatsapp-hover"
                             target="_blank" rel="noopener noreferrer"
                             href={whatsappLink(`Hi ${b.name}, regarding your FreshDream booking on ${format(new Date(b.starts_at), "EEE d MMM 'at' h:mm a")}…`)}>
                            <MessageCircle className="h-3 w-3" /> WhatsApp
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {upcoming.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No upcoming bookings.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-primary">Blocked periods</h2>
          <p className="text-sm text-muted-foreground">Mark days or specific hours as unavailable.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Note: the reason field may be visible to other admins. Do not enter private details — use neutral labels like <em>Unavailable</em> or <em>Internal block</em>.
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
                  <div className="font-medium">{format(new Date(b.starts_at), "EEE d MMM, h:mm a")} → {format(new Date(b.ends_at), "EEE d MMM, h:mm a")}</div>
                  {b.reason && <div className="text-muted-foreground">{b.reason}</div>}
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeBlock(b.id)}><Trash2 className="h-4 w-4" /></Button>
              </li>
            ))}
            {blocks.length === 0 && <p className="py-3 text-sm text-muted-foreground">No blocks.</p>}
          </ul>
        </Card>
      </main>
    </div>
  );
}
