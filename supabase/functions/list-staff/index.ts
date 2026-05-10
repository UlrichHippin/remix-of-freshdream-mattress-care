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

    const { data: staff, error: staffErr } = await admin
      .from("staff_members")
      .select("user_id, role, created_at")
      .order("created_at", { ascending: true });
    if (staffErr) return json({ error: staffErr.message }, 500);

    // Build email map by paging auth users
    const emailMap = new Map<string, string>();
    for (let page = 1; page <= 20; page++) {
      const { data: list, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) break;
      for (const u of list.users) if (u.email) emailMap.set(u.id, u.email);
      if (list.users.length < 200) break;
    }

    const result = (staff ?? []).map((s) => ({
      user_id: s.user_id,
      role: s.role,
      created_at: s.created_at,
      email: emailMap.get(s.user_id) ?? null,
    }));

    return json({ staff: result });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
