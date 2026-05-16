import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { LogOut, RefreshCw, ShieldCheck, MessageCircle } from "lucide-react";

type BookingStatus = "requested" | "confirmed" | "completed" | "declined" | "cancelled";

type ExternalBooking = {
  id: string;
  booking_reference: string | null;
  status: BookingStatus;
  created_at: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  area: string;
  property_type: string | null;
  service: string;
  details: string | null;
  starts_at: string;
  ends_at: string;
};

const STATUSES: BookingStatus[] = ["requested", "confirmed", "completed", "declined", "cancelled"];

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<ExternalBooking[]>([]);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("external-bookings", {
      body: { action: "list" },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data?.error) {
      toast.error(data.error);
      if (data.error === "Forbidden" || data.error === "Unauthorized") {
        navigate("/admin/login", { replace: true });
      }
      return;
    }
    setBookings((data?.bookings ?? []) as ExternalBooking[]);
  }, [navigate]);

  useEffect(() => {
    document.title = "Admin Dashboard | FreshDream";
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      load();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });

    const interval = setInterval(load, 30000);

    return () => {
      sub.subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [navigate, load]);

  async function updateStatus(id: string, status: BookingStatus) {
    const { data, error } = await supabase.functions.invoke("external-bookings", {
      body: { action: "update_status", id, status },
    });
    if (error) return toast.error(error.message);
    if (data?.error) return toast.error(data.error);
    toast.success(`Status set to ${status}`);
    load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  const visible = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const statusBadge: Record<BookingStatus, string> = {
    requested: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-blue-100 text-blue-800",
    declined: "bg-zinc-200 text-zinc-700",
    cancelled: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5" />
            <h1 className="font-bold">FreshDream Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="h-4 w-4" /> Refresh</Button>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select value={filter} onValueChange={(v) => setFilter(v as BookingStatus | "all")}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({bookings.length})</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s} ({bookings.filter(b => b.status === s).length})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <ShieldCheck className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mb-1 text-lg font-semibold">
              {filter === "all" ? "Noch keine Buchungen" : `Keine Buchungen mit Status „${filter}"`}
            </h2>
            <p className="mx-auto mb-4 max-w-md text-sm text-muted-foreground">
              {filter === "all"
                ? "Sobald Kunden über das Buchungsformular eine Anfrage senden, erscheinen sie hier in Echtzeit."
                : "Wechsle den Filter auf „All“, um alle Buchungen zu sehen."}
            </p>
            {filter === "all" ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button asChild size="sm" variant="default">
                  <a href="/#booking" target="_blank" rel="noopener noreferrer">
                    Testbuchung anlegen
                  </a>
                </Button>
                <Button size="sm" variant="outline" onClick={load}>
                  <RefreshCw className="h-4 w-4" /> Aktualisieren
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setFilter("all")}>
                Filter zurücksetzen
              </Button>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Tipp: Öffne das Formular in einem privaten Fenster und sende eine Anfrage — sie erscheint hier innerhalb von ~30 s.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {visible.map((b) => (
              <div key={b.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-sm font-bold text-primary">{b.booking_reference ?? b.id.slice(0, 8)}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge[b.status]}`}>{b.status}</span>
                      <span className="text-xs text-muted-foreground">{format(new Date(b.created_at), "dd MMM yyyy HH:mm")}</span>
                    </div>
                    <p className="mt-1 font-semibold">{b.name} · {b.phone}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.service} · {b.area} · {format(new Date(b.starts_at), "dd MMM, HH:mm")}–{format(new Date(b.ends_at), "HH:mm")}
                    </p>
                    {b.details && <pre className="mt-2 whitespace-pre-wrap rounded bg-muted p-2 text-xs">{b.details}</pre>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={`https://wa.me/${(b.whatsapp || b.phone || "").replace(/[^\d]/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-whatsapp hover:underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                    <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v as BookingStatus)}>
                      <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
