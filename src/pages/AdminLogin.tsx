import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "claim">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Admin Login | FreshDream";
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    navigate("/admin", { replace: true });
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created. If email confirmation is required, check your inbox.");
    setMode("claim");
  }

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) {
      setBusy(false);
      return toast.error("Sign in first");
    }
    const { error } = await supabase.rpc("claim_owner_role", { _setup_code: setupCode });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Owner role granted");
    navigate("/admin", { replace: true });
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck className="h-5 w-5" />
          <h1 className="text-xl font-bold">FreshDream Admin</h1>
        </div>

        <div className="mt-6 flex gap-2 text-xs">
          <button onClick={() => setMode("signin")} className={`rounded-md px-3 py-1 ${mode === "signin" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>Sign in</button>
          <button onClick={() => setMode("signup")} className={`rounded-md px-3 py-1 ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>Create account</button>
          <button onClick={() => setMode("claim")} className={`rounded-md px-3 py-1 ${mode === "claim" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>Claim owner</button>
        </div>

        {mode === "claim" ? (
          <form onSubmit={handleClaim} className="mt-6 grid gap-3">
            <p className="text-xs text-muted-foreground">Sign in first, then enter the one-time setup code to grant owner access to your account.</p>
            <div>
              <Label htmlFor="code">Setup code</Label>
              <Input id="code" value={setupCode} onChange={(e) => setSetupCode(e.target.value)} required />
            </div>
            <Button type="submit" disabled={busy}>{busy ? "Working..." : "Claim owner role"}</Button>
          </form>
        ) : (
          <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="mt-6 grid gap-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button type="submit" disabled={busy}>
              {busy ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
