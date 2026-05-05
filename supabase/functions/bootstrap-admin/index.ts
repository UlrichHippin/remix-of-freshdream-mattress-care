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

    const expectedCode = Deno.env.get("ADMIN_SETUP_CODE");
    const body = await req.json().catch(() => ({}));
    const setupCode = typeof body.setupCode === "string" ? body.setupCode : "";

    if (!expectedCode || setupCode !== expectedCode) {
      return new Response(
        JSON.stringify({ error: "Ungültiger oder fehlender Setup-Code." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 },
      );
    }

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

    // Try to create user (auto-confirmed). If already exists, look them up and update password.
    let userId: string | null = null;
    let createdNow = false;

    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (created?.user) {
      userId = created.user.id;
      createdNow = true;
    } else if (createErr) {
      const msg = createErr.message?.toLowerCase() ?? "";
      const alreadyExists =
        msg.includes("already been registered") ||
        msg.includes("already registered") ||
        msg.includes("already exists");

      if (!alreadyExists) {
        return new Response(JSON.stringify({ error: createErr.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // User already exists from a previous attempt — find them and reset password
      let foundId: string | null = null;
      for (let page = 1; page <= 10 && !foundId; page++) {
        const { data: list, error: listErr } = await supabase.auth.admin.listUsers({
          page,
          perPage: 200,
        });
        if (listErr) break;
        const match = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
        if (match) foundId = match.id;
        if (list.users.length < 200) break;
      }

      if (!foundId) {
        return new Response(
          JSON.stringify({ error: "User existiert bereits, konnte aber nicht gefunden werden." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
        );
      }

      const { error: updErr } = await supabase.auth.admin.updateUserById(foundId, {
        password,
        email_confirm: true,
      });
      if (updErr) {
        return new Response(JSON.stringify({ error: updErr.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      userId = foundId;
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: "Konnte User nicht erstellen." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Assign admin role
    const { error: roleErr } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (roleErr) {
      if (createdNow) await supabase.auth.admin.deleteUser(userId);
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
