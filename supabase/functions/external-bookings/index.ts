import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    // Verify caller via internal Supabase
    const internal = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await internal.auth.getClaims(token);
    if (claimsErr || !claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);

    const uid = claims.claims.sub;
    const { data: isOwner, error: ownerErr } = await internal.rpc("is_owner", { _uid: uid });
    if (ownerErr) return json({ error: ownerErr.message }, 500);
    if (!isOwner) return json({ error: "Forbidden" }, 403);

    // External Supabase client (service role)
    const extUrl = Deno.env.get("EXTERNAL_SUPABASE_URL")?.trim();
    const extKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY")?.trim();
    if (!extUrl || !/^https?:\/\//.test(extUrl)) {
      return json({ error: "EXTERNAL_SUPABASE_URL is missing or invalid (must start with https://)" }, 500);
    }
    if (!extKey) {
      return json({ error: "EXTERNAL_SUPABASE_SERVICE_ROLE_KEY is missing" }, 500);
    }
    const external = createClient(extUrl, extKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const action = body.action ?? "list";

    if (action === "list") {
      const { data, error } = await external
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) return json({ error: error.message }, 500);
      return json({ bookings: data ?? [] });
    }

    if (action === "update_status") {
      const { id, status } = body;
      if (!id || !status) return json({ error: "Missing id or status" }, 400);
      const allowed = ["requested", "confirmed", "completed", "declined", "cancelled"];
      if (!allowed.includes(status)) return json({ error: "Invalid status" }, 400);
      const { error } = await external.from("bookings").update({ status }).eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
