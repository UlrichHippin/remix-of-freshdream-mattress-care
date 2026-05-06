import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { KeyRound, Loader2 } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const [canReset, setCanReset] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setCanReset(true);
      setChecking(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setCanReset(Boolean(data.session));
      setChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Das Passwort muss mindestens 8 Zeichen haben.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Passwort aktualisiert. Du kannst dich jetzt einloggen.");
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero px-4 py-8">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-3">
          <KeyRound className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Neues Passwort setzen</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Gib ein neues Passwort für deinen Admin-Account ein.
        </p>

        {checking ? (
          <div className="mt-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : canReset ? (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="new-password">Neues Passwort</Label>
              <Input
                id="new-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Passwort bestätigen</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Passwort speichern
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Bitte öffne diese Seite über den Passwort-Reset-Link aus deiner E-Mail.
            </p>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/admin/login")}>
              Zurück zum Admin-Login
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}