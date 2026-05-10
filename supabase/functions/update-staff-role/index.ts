import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const token = authHeader.slice("Bearer ".length);

    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token);
    if (claimsErr || !claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);
    const callerId = claims.claims.sub as string;

    const admin = createClient(url, service);
    const { data: me } = await admin.from("staff_members").select("role").eq("user_id", callerId).maybeSingle();
    if (!me || me.role !== "owner") return json({ error: "Forbidden — owner only" }, 403);

    const body = await req.json().catch(() => ({}));
    const targetId = typeof body.user_id === "string" ? body.user_id : "";
    const action = body.action;

    if (!targetId) return json({ error: "user_id required" }, 400);
    if (targetId === callerId) return json({ error: "Du kannst deinen eigenen Zugang nicht ändern." }, 400);
    if (action !== "remove" && action !== "set_operator") return json({ error: "Invalid action" }, 400);

    // Never act on an existing owner row
    const { data: target } = await admin.from("staff_members").select("role").eq("user_id", targetId).maybeSingle();
    if (target?.role === "owner") return json({ error: "Owner-Zugänge können hier nicht geändert werden." }, 403);

    if (action === "remove") {
      const { error } = await admin.from("staff_members").delete().eq("user_id", targetId);
      if (error) return json({ error: error.message }, 500);
    } else {
      const { error } = await admin
        .from("staff_members")
        .upsert({ user_id: targetId, role: "operator" }, { onConflict: "user_id" });
      if (error) return json({ error: error.message }, 500);
    }

    return json({ success: true });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
