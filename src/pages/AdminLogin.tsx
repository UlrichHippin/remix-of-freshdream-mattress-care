import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  // Setup state
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [setupEmail, setSetupEmail] = useState("");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });

    // Check whether an admin exists yet
    supabase.functions.invoke("check-admin-exists").then(({ data, error }) => {
      if (error) {
        console.error("check-admin-exists failed", error);
        setAdminExists(true); // fail closed: hide setup UI
        return;
      }
      setAdminExists(Boolean(data?.exists));
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/admin", { replace: true });
  }

  async function onPasswordReset() {
    if (!email.trim()) {
      toast.error("Bitte zuerst deine Admin-E-Mail eingeben.");
      return;
    }

    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Passwort-Reset-Link wurde gesendet. Bitte prüfe dein E-Mail-Postfach.");
  }

  async function onSetup(e: React.FormEvent) {
    e.preventDefault();
    if (setupPassword.length < 8) {
      toast.error("Passwort muss mindestens 8 Zeichen haben.");
      return;
    }
    if (setupPassword !== setupConfirm) {
      toast.error("Passwörter stimmen nicht überein.");
      return;
    }
    if (!setupCode.trim()) {
      toast.error("Setup-Code ist erforderlich.");
      return;
    }
    setSetupLoading(true);
    const { data, error } = await supabase.functions.invoke("bootstrap-admin", {
      body: { email: setupEmail, password: setupPassword, setupCode },
    });
    if (error || (data && (data as any).error)) {
      setSetupLoading(false);
      toast.error((data as any)?.error ?? error?.message ?? "Setup fehlgeschlagen.");
      return;
    }
    // Auto login
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: setupEmail,
      password: setupPassword,
    });
    setSetupLoading(false);
    if (signInErr) {
      toast.error(signInErr.message);
      return;
    }
    toast.success("Admin-Account erstellt!");
    navigate("/admin", { replace: true });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-primary">Admin login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage bookings and availability.</p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="em">Email</Label>
              <Input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign in
            </Button>
          </form>
          <Button
            type="button"
            variant="link"
            className="mt-3 h-auto px-0 text-sm"
            disabled={resetLoading}
            onClick={onPasswordReset}
          >
            {resetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Passwort vergessen? Reset-Link senden
          </Button>
          <p className="mt-6 text-xs text-muted-foreground">
            Admin access is invitation only. Contact the site owner to receive credentials.
          </p>
        </Card>

        {adminExists === false && (
          <Card className="p-8 border-primary/40">
            <h2 className="text-lg font-bold text-primary">Erste Einrichtung</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Es existiert noch kein Admin. Lege jetzt den ersten Admin-Account an. Diese Option verschwindet danach automatisch.
            </p>
            <form className="mt-6 space-y-4" onSubmit={onSetup}>
              <div>
                <Label htmlFor="sem">E-Mail</Label>
                <Input id="sem" type="email" required value={setupEmail} onChange={(e) => setSetupEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="spw">Passwort (mind. 8 Zeichen)</Label>
                <Input id="spw" type="password" required minLength={8} value={setupPassword} onChange={(e) => setSetupPassword(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="spw2">Passwort bestätigen</Label>
                <Input id="spw2" type="password" required minLength={8} value={setupConfirm} onChange={(e) => setSetupConfirm(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="scode">Setup-Code</Label>
                <Input id="scode" type="password" required value={setupCode} onChange={(e) => setSetupCode(e.target.value)} className="mt-1.5" placeholder="Vom Server-Admin bereitgestellt" />
              </div>
              <Button type="submit" disabled={setupLoading} className="w-full">
                {setupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Ersten Admin-Account erstellen
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
