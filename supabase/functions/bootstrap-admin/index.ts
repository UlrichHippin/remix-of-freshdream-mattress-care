import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Server-side gate: only allow if no admin exists yet
    const { count, error: countErr } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");

    if (countErr) throw countErr;
    if ((count ?? 0) > 0) {
      return new Response(
        JSON.stringify({ error: "Admin existiert bereits. Setup ist gesperrt." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Ungültige E-Mail-Adresse." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    if (password.length < 8) {
      return new Response(JSON.stringify({ error: "Passwort muss mindestens 8 Zeichen haben." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create user (auto-confirmed so login works immediately)
    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createErr || !created.user) {
      return new Response(
        JSON.stringify({ error: createErr?.message ?? "Konnte User nicht erstellen." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 },
      );
    }

    // Assign admin role
    const { error: roleErr } = await supabase
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });

    if (roleErr) {
      // Roll back user creation if role assignment fails
      await supabase.auth.admin.deleteUser(created.user.id);
      return new Response(JSON.stringify({ error: roleErr.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
